import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // make sure this runs on Node, not edge

export async function POST(req: Request) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { name, phone, email, requirement, message } = body;

    // Basic validation
    if (!name || !phone || !requirement) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
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

    // Email to business owner
    await transporter.sendMail({
      from: `"UltronSolar Website" <${process.env.CONTACT_EMAIL}>`,
      to: "ultronvij@gmail.com",
      subject: `New solar lead: ${name} - ${requirement}`,
      text: `
New lead from UltronSolar website:

Name: ${name}
Phone: ${phone}
Email: ${email || "not provided"}
Requirement: ${requirement}

Additional Details/Query:
${message || "None"}

Follow up ASAP.
      `.trim(),
      html: `
        <h3>New Lead from Website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || "not provided"}</p>
        <p><strong>Requirement:</strong> ${requirement}</p>
        <p><strong>Additional Details:</strong><br/>${message ? message.replace(/\n/g, '<br>') : "None"}</p>
      `,
    });

    // Optional: thank-you email to customer
    if (email) {
      try {
        await transporter.sendMail({
          from: `"Ultron Power Systems" <${process.env.CONTACT_EMAIL}>`,
          to: email,
          subject: "Thanks for contacting Ultron Power Systems",
          text: "Thank you for reaching out about a solar solution. Our team will contact you within 24 hours.",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #1e40af;">Thank you for contacting Ultron Power Systems!</h2>
              <p>We have received your inquiry regarding <strong>${requirement}</strong>.</p>
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
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to send message" },
      { status: 500 }
    );
  }
}

