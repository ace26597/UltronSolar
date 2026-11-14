import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getTranslations } from "@/lib/translations";
import { clientIp, rateLimit, takeToken } from "@/lib/server/rateLimit";
import {
  cleanLine,
  cleanText,
  escapeHtml,
  isPlainEmailAddress,
  readJsonBody,
} from "@/lib/server/requestGuards";

export const runtime = "nodejs"; // make sure this runs on Node, not edge

// ---------------------------------------------------------------------------
// Abuse limits. This route is public: it sends mail from the business Gmail
// account and creates a CRM lead, so every field is bounded and the only mail
// that goes to a visitor-supplied address is a fixed-text acknowledgement to
// exactly one validated recipient.
// ---------------------------------------------------------------------------

const MAX_BODY_BYTES = 20_000;
const MAX_NAME_CHARS = 100;
const MAX_CITY_CHARS = 100;
const MAX_REQUIREMENT_CHARS = 120;
const MAX_MESSAGE_CHARS = 3000;

/** One acknowledgement per address in this window, however many forms name it. */
const AUTO_REPLY_PER_ADDRESS = { limit: 1, windowMs: 60 * 60_000 };

/**
 * The requirement labels the contact form offers, in every site language.
 * The acknowledgement email quotes the requirement back only when it is one
 * of these, so a caller cannot use the business mailbox to deliver their own
 * text to someone else's inbox.
 */
const KNOWN_REQUIREMENTS = new Set(
  (["en", "mr", "hi"] as const).flatMap((lang) => getTranslations(lang).contact.requirements)
);

/** Marathi/Hindi keyboards can produce Devanagari digits; treat them as 0-9. */
function normalizeDigits(value: string): string {
  return value.replace(/[०-९]/g, (digit) => String(digit.charCodeAt(0) - 0x0966));
}

function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

export async function POST(req: Request) {
  const limited = rateLimit(req, "contact", { limit: 8, windowMs: 10 * 60_000 });
  if (limited) return limited;

  try {
    const parsed = await readJsonBody(req, MAX_BODY_BYTES);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: parsed.status });
    }
    const body = parsed.data;

    const name = cleanLine(body.name);
    const phone = normalizeDigits(cleanLine(body.phone));
    const email = cleanLine(body.email);
    const city = cleanLine(body.city);
    const requirement = cleanLine(body.requirement);
    const message = cleanText(body.message);

    // Basic validation
    if (!name || !phone || !requirement) {
      return badRequest("Missing required fields");
    }

    if (
      name.length > MAX_NAME_CHARS ||
      city.length > MAX_CITY_CHARS ||
      requirement.length > MAX_REQUIREMENT_CHARS
    ) {
      return badRequest("One of the fields is too long. Please shorten it and try again.");
    }

    if (message.length > MAX_MESSAGE_CHARS) {
      return badRequest(`Message is too long. Please keep it under ${MAX_MESSAGE_CHARS} characters.`);
    }

    // A phone number: digits with the usual separators, 7 to 15 digits in all.
    const phoneDigits = phone.replace(/\D/g, "");
    if (
      phone.length > 25 ||
      !/^[+\d][\d\s().-]*$/.test(phone) ||
      phoneDigits.length < 7 ||
      phoneDigits.length > 15
    ) {
      return badRequest("Please enter a valid phone number.");
    }

    // Check environment variables
    if (!process.env.CONTACT_EMAIL || !process.env.CONTACT_EMAIL_APP_PASS) {
      console.error("Missing email configuration environment variables");
      return NextResponse.json(
        { error: "Email service not configured. Please contact support." },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_EMAIL_APP_PASS,
      },
    });

    // Email to business owner. Everything the visitor typed is escaped in the
    // HTML part, and the single-line fields above cannot contain line breaks.
    await transporter.sendMail({
      from: { name: "UltronSolar Website", address: process.env.CONTACT_EMAIL },
      to: { name: "", address: "ultronvij@gmail.com" },
      maxRecipients: 1,
      subject: `New solar lead: ${name} - ${requirement}`,
      text: `
New lead from UltronSolar website:

Name: ${name}
Phone: ${phone}
Email: ${email || "not provided"}
City: ${city || "not provided"}
Requirement: ${requirement}

Additional Details/Query:
${message || "None"}

Follow up ASAP.
      `.trim(),
      html: `
        <h3>New Lead from Website</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${email ? escapeHtml(email) : "not provided"}</p>
        <p><strong>City:</strong> ${city ? escapeHtml(city) : "not provided"}</p>
        <p><strong>Requirement:</strong> ${escapeHtml(requirement)}</p>
        <p><strong>Additional Details:</strong><br/>${message ? escapeHtml(message).replace(/\n/g, '<br>') : "None"}</p>
      `,
    });

    // Optional: thank-you email to customer.
    //
    // Sent only when the address is one plain mailbox (no lists, display
    // names, comments or quoting), and at most once per address per hour.
    // The address is passed to nodemailer as an object, so it is never run
    // through the address-list parser, and maxRecipients makes the library
    // refuse the message if it would still resolve to more than one recipient.
    // A lead with an unusable address is still delivered to the business
    // above; only the acknowledgement is skipped.
    if (email && isPlainEmailAddress(email)) {
      const allowance = takeToken("contact-auto-reply", email.toLowerCase(), AUTO_REPLY_PER_ADDRESS);

      if (allowance.allowed) {
        // Quote the requirement back only if it is one of the form's own options.
        const regarding = KNOWN_REQUIREMENTS.has(requirement)
          ? ` regarding <strong>${escapeHtml(requirement)}</strong>`
          : "";

        try {
          await transporter.sendMail({
            from: { name: "Ultron Power Systems", address: process.env.CONTACT_EMAIL },
            to: { name: "", address: email },
            maxRecipients: 1,
            subject: "Thanks for contacting Ultron Power Systems",
            text: "Thank you for reaching out about a solar solution. Our team will contact you within 24 hours.",
            html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #1e40af;">Thank you for contacting Ultron Power Systems!</h2>
              <p>We have received your inquiry${regarding}.</p>
              <p>Our team will review your requirements and get back to you within 24 hours.</p>
              <p>For immediate assistance, you can call us at <a href="tel:+919422787438" style="color: #16a34a; font-weight: bold;">+91 9422787438</a>.</p>
              <br>
              <p>Best Regards,<br><strong>Ultron Power Systems Team</strong></p>
            </div>
          `,
          });
        } catch (emailError) {
          console.error("Failed to send auto-reply:", emailError);
          // Don't fail the request if auto-reply fails
        }
      } else {
        console.warn("Auto-reply skipped: this address was already sent one recently", {
          ip: clientIp(req),
        });
      }
    } else if (email) {
      console.warn("Auto-reply skipped: address did not pass validation");
    }

    // Also create CRM lead (fire-and-forget)
    try {
      await fetch('https://api-crm.acesolartech.com/api/leads/public/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          address: city || '',
          message: `[${requirement}] ${message || ''}`.trim(),
          business: 'ultronpower',
          source: 'website',
        }),
      });
    } catch {
      // Don't fail the form if CRM is unreachable
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Detail stays in the server log; SMTP error text is not returned to callers.
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please call us or try again in a few minutes." },
      { status: 500 }
    );
  }
}
