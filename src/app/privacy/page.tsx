import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Ultron Power Systems",
  description: "Privacy Policy for Ultron Power Systems - Learn how we collect, use, and protect your personal data.",
  alternates: {
    canonical: "https://www.ultronsolar.in/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-dark mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8">
            <em>Last updated: 29 November 2025</em>
          </p>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">
              Ultron Power Systems (&quot;Ultron Solar&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website{" "}
              <strong>https://www.ultronsolar.in/</strong> and provides solar energy consulting,
              installation, and related services in Dhule, Jalgaon, and North Maharashtra, India.
            </p>

            <p className="text-gray-700 leading-relaxed">
              We respect your privacy and are committed to protecting your personal data. This
              Privacy Policy explains what information we collect, how we use it, and what choices
              and rights you have.
            </p>

            <p className="text-gray-700 leading-relaxed">
              If you have any questions, you can contact us using the details in the{" "}
              <strong>Contact Us</strong> section below.
            </p>

            <hr className="my-8 border-gray-300" />

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">1. Who we are</h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <p className="font-semibold text-navy-dark mb-2">Ultron Power Systems</p>
                <p className="text-gray-700 mb-1">Plot No. 4, Survey No. 48/2A/2,</p>
                <p className="text-gray-700 mb-1">Behind Gurudwara, Mohadi Upnagar,</p>
                <p className="text-gray-700 mb-1">Dhule, Maharashtra 424311, India</p>
                <p className="text-gray-700 mb-1">
                  <strong>Website:</strong> https://www.ultronsolar.in/
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Email:</strong> ultronvij@gmail.com
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> +91-94227 87438
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-2">
                This Privacy Policy applies to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Visitors to our website (`ultronsolar.in` and any subdomains), and</li>
                <li>
                  Prospective and existing customers who contact us for quotes, consultations, and
                  installations.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">
                2. What information we collect
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may collect the following categories of information:
              </p>

              <h3 className="text-xl font-semibold text-navy-dark mb-3">
                2.1. Information you provide to us
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                When you use our website or contact us, you may provide:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>
                  <strong>Contact details</strong> – name, phone number, WhatsApp number, email
                  address
                </li>
                <li>
                  <strong>Location details</strong> – city/town, state, pin code, site address
                </li>
                <li>
                  <strong>Project details</strong> – type of property (residential, commercial,
                  industrial, agriculture), roof type, approximate load, last electricity bill
                  details, photos you upload (e.g. meter, rooftop)
                </li>
                <li>
                  <strong>Communication content</strong> – messages you send via contact forms,
                  WhatsApp, email, or chat
                </li>
                <li>
                  <strong>Contract / billing details</strong> – if you become a customer, we may
                  collect PAN, billing address, installation address and basic payment details (via
                  our payment partners).
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-navy-dark mb-3">
                2.2. Information collected automatically
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                When you visit our website, we may automatically collect:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>
                  <strong>Device and usage data</strong> – IP address, browser type, operating
                  system, device type, language settings, referring URLs
                </li>
                <li>
                  <strong>Usage patterns</strong> – pages visited, time spent on pages, clicks,
                  scrolls, and other interaction data
                </li>
                <li>
                  <strong>Cookies and similar technologies</strong> – small files stored on your
                  device to remember preferences, maintain sessions, and (if you consent) for
                  analytics and marketing.
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                This kind of tracking is common and used to understand how websites are used and to
                improve user experience.
              </p>

              <h3 className="text-xl font-semibold text-navy-dark mb-3">
                2.3. Information from third parties
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                We may receive limited information from:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  <strong>Analytics providers</strong> (e.g. Google Analytics) – aggregated usage
                  statistics, if you consent to analytics cookies
                </li>
                <li>
                  <strong>Advertising platforms</strong> (e.g. Google, Meta/Facebook) – campaign
                  performance and conversion data, if you consent to marketing cookies
                </li>
                <li>
                  <strong>Installation or financing partners</strong> – where you are referred to
                  us or we coordinate your project.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">
                3. Why we collect and use your data
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use your information for the following purposes:
              </p>
              <ol className="list-decimal list-inside text-gray-700 space-y-3 ml-4">
                <li>
                  <strong>To respond to enquiries and provide quotes</strong>
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>Answer your questions about rooftop solar systems, solar pumps, batteries, etc.</li>
                    <li>
                      Provide approximate sizing, pricing, and savings estimates based on the
                      information you share.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>To plan and deliver our services</strong>
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>Schedule site visits, surveys, and installations</li>
                    <li>Prepare proposals, agreements, and documentation</li>
                    <li>
                      Coordinate with our engineering, installation, and financing partners.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>To operate and improve our website</strong>
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>Monitor performance, detect errors, and improve navigation</li>
                    <li>
                      Understand which pages are most useful, so we can improve content and user
                      experience.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>To perform analytics and marketing (with your consent)</strong>
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>Measure the effectiveness of our campaigns</li>
                    <li>
                      Understand which channels (Google search, social media, referrals) bring
                      visitors
                    </li>
                    <li>Show relevant ads or information to interested audiences (remarketing).</li>
                  </ul>
                </li>
                <li>
                  <strong>To comply with law and protect our rights</strong>
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>Maintain records as required by Indian law</li>
                    <li>
                      Respond to requests from regulators or law enforcement, where legally required
                    </li>
                    <li>
                      Protect our business, our customers, and our website from fraud, abuse, or
                      security incidents.
                    </li>
                  </ul>
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">
                4. Legal basis for processing
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Because visitors may come from different regions, we align with both Indian law
                (DPDP Act) and international privacy principles such as GDPR.
              </p>

              <h3 className="text-xl font-semibold text-navy-dark mb-3">
                Under India&apos;s Digital Personal Data Protection Act (DPDP Act)
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                The DPDP Act requires that personal data of individuals in India is processed for
                lawful purposes and generally with their{" "}
                <strong>free, informed, specific and unambiguous consent</strong>, except for
                certain legitimate uses.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We rely on:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>
                  <strong>Your consent</strong> – when you submit forms, sign up to receive updates,
                  or allow analytics/marketing cookies
                </li>
                <li>
                  <strong>Legitimate uses / legitimate interests</strong> – such as basic security
                  logging, preventing fraud, or responding to your direct enquiries where separate
                  consent is not required under applicable law.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-navy-dark mb-3">
                Under GDPR (for EU / UK visitors)
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                If you are located in the EU or UK, we process your data under one or more of the
                following lawful bases:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  <strong>Consent</strong> – for analytics and marketing cookies and for optional
                  communications
                </li>
                <li>
                  <strong>Contract</strong> – to take steps at your request prior to entering into a
                  contract (e.g. providing a quote) and to perform a contract with you
                </li>
                <li>
                  <strong>Legitimate interests</strong> – to operate, secure, and improve our site
                  in ways that do not override your fundamental rights and freedoms.
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                You can withdraw your consent at any time (see <strong>Your rights</strong>).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">
                5. Cookies and similar technologies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                We use cookies to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>Keep the site secure and functioning (essential cookies)</li>
                <li>Measure usage and performance (analytics cookies, if you consent)</li>
                <li>
                  Support remarketing and campaign measurement (marketing cookies, if you consent).
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Our cookie categories and consent options are explained in detail in our{" "}
                <strong>Cookie Policy</strong>, which you can read at{" "}
                <a href="/cookies" className="text-solar-red hover:underline">
                  /cookies
                </a>
                . Our cookie banner allows you to <strong>accept all</strong>,{" "}
                <strong>essential only</strong>, or make a <strong>custom</strong> choice before
                non-essential cookies run, in line with modern consent requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">
                6. How we share your information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do <strong>not</strong> sell your personal data.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                We may share limited personal data with:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>
                  <strong>Service providers / processors</strong>
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>Website hosting and infrastructure providers</li>
                    <li>Email, SMS, or WhatsApp communication providers</li>
                    <li>
                      Analytics and marketing tools (e.g. Google, Meta), where you have consented to
                      such use.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Business partners</strong>
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>Installation and engineering partners</li>
                    <li>
                      Financing partners or banks, if you ask us to help with loan/EMI options.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Authorities and regulators</strong>
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>Where required by law, regulation, or legal process</li>
                    <li>
                      To protect our rights, property, or safety, or that of others.
                    </li>
                  </ul>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We require our service providers to handle your data securely and only for the
                purposes we specify.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">
                7. International transfers
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our website infrastructure and some of our service providers may be located outside
                India, including in countries whose data protection laws may differ from those in
                India.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Where required, we take reasonable steps to ensure that appropriate safeguards (such
                as contractual protections) are in place when data is processed in other countries.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">
                8. How long we keep your data
              </h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                We keep personal data only for as long as necessary to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Respond to your enquiry or provide services</li>
                <li>Maintain records for tax, accounting, and legal obligations</li>
                <li>
                  Understand and improve our business and marketing (within reasonable retention
                  periods).
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                After this, we either delete or anonymise the data, unless we are legally required
                to retain it longer.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">
                9. How we protect your data
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We take reasonable technical and organisational measures to protect your personal
                data against loss, misuse, unauthorised access, disclosure, alteration, or
                destruction.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                This includes using reputable hosting providers, restricting internal access on a
                need-to-know basis, and monitoring for suspicious activity. However, no system can
                be 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">10. Your rights</h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                Your rights will depend on where you live, but generally may include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>
                  <strong>Right to access</strong> – ask what personal data we hold about you
                </li>
                <li>
                  <strong>Right to correction</strong> – request that inaccurate or incomplete data
                  be corrected or updated
                </li>
                <li>
                  <strong>Right to deletion / erasure</strong> – ask us to delete your personal data
                  where there is no longer a valid reason to keep it
                </li>
                <li>
                  <strong>Right to withdraw consent</strong> – for example, withdraw consent to
                  analytics/marketing cookies or marketing communications at any time
                </li>
                <li>
                  <strong>Right to complain</strong> – lodge a complaint with a relevant data
                  protection authority.
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-2">
                Under India&apos;s DPDP Act, individuals (Data Principals) have rights to access,
                correction, updating and erasure of their personal data, as well as access to
                grievance redressal mechanisms.
              </p>
              <p className="text-gray-700 leading-relaxed">
                To exercise any of these rights, please contact us using the details below. We may
                need to verify your identity before acting on your request.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">11. Children&apos;s privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website and services are not directed at children under 18. We do not knowingly
                collect personal data from children. If you believe a child has provided us
                personal data, please contact us and we will take steps to delete it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">
                12. Updates to this policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our
                practices, technologies, or legal requirements. When we do, we will update the
                &quot;Last updated&quot; date at the top of this page.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                We encourage you to review this page periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">13. Contact us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions, requests, or concerns about this Privacy Policy or our data
                practices, you can contact:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="font-semibold text-navy-dark mb-2">Ultron Power Systems</p>
                <p className="text-gray-700 mb-1">
                  <strong>Email:</strong> ultronvij@gmail.com
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Phone:</strong> +91-94227 87438
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> Dhule, Maharashtra, India
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

