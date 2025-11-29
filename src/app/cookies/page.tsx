import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy | Ultron Power Systems",
  description: "Cookie Policy for Ultron Power Systems - Learn about how we use cookies and similar technologies.",
  alternates: {
    canonical: "https://www.ultronsolar.in/cookies",
  },
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-dark mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-600 mb-8">
            <em>Last updated: 29 November 2025</em>
          </p>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">
              This Cookie Policy explains how <strong>Ultron Power Systems</strong> (&quot;Ultron
              Solar&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) uses cookies and similar technologies on{" "}
              <strong>https://www.ultronsolar.in/</strong>.
            </p>

            <p className="text-gray-700 leading-relaxed">
              It should be read together with our{" "}
              <a href="/privacy" className="text-solar-red hover:underline">
                Privacy Policy
              </a>
              , which explains how we use personal data more generally.
            </p>

            <hr className="my-8 border-gray-300" />

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">1. What are cookies?</h2>
              <p className="text-gray-700 leading-relaxed">
                Cookies are small text files that are stored on your device (computer, mobile
                phone, tablet) when you visit a website. They help websites remember your actions
                and preferences, and they can also be used for analytics and advertising.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                We also use similar technologies like local storage and pixels that work in a
                comparable way.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">2. Why we use cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                We use cookies for several reasons:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>To make the website work properly and securely</li>
                <li>To remember your cookie preferences</li>
                <li>To understand how visitors use our site and which pages are most useful</li>
                <li>To measure and improve our marketing campaigns (if you consent).</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Under laws such as the EU&apos;s GDPR and ePrivacy Directive, and India&apos;s Digital
                Personal Data Protection Act (DPDP), consent is typically required for cookies that
                are <strong>not strictly necessary</strong> and that process personal data, such as
                analytics and marketing cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">
                3. Types of cookies we use
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For simplicity, we group our cookies into three categories that match the choices in
                our cookie banner:
              </p>

              <h3 className="text-xl font-semibold text-navy-dark mb-3">
                3.1. Essential cookies (always on)
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                These cookies are required for the website to function and cannot be switched off in
                our systems. They are usually only set in response to actions you take, such as:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>Navigating between pages</li>
                <li>Submitting forms</li>
                <li>Maintaining a secure session</li>
                <li>Remembering your cookie consent choices.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-2">
                Without these cookies, parts of the site may not work properly. Because they are
                strictly necessary, we generally do <strong>not</strong> ask for your consent for
                essential cookies, but we still tell you about them here.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong>Examples:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>A cookie that stores your cookie consent settings</li>
                <li>
                  Session cookies that keep you logged in to protected areas (if any)
                </li>
                <li>Security cookies used to detect and prevent abuse.</li>
              </ul>

              <h3 className="text-xl font-semibold text-navy-dark mb-3 mt-6">
                3.2. Analytics cookies (optional)
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Analytics cookies help us understand how visitors interact with our website, so we
                can improve content and user experience. They may collect information such as:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>Pages you visit and how long you spend on them</li>
                <li>Which links you click</li>
                <li>The device and browser you use</li>
                <li>Approximate geographic region (based on IP) in aggregated form.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-2">
                We may use tools like <strong>Google Analytics</strong> or similar services. Where
                possible, we configure these services to reduce the amount of personal data
                processed (for example, IP anonymisation or aggregated reporting). Even so, they are
                treated as <strong>non-essential</strong> and only used if you consent.
              </p>

              <h3 className="text-xl font-semibold text-navy-dark mb-3 mt-6">
                3.3. Marketing cookies (optional)
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Marketing cookies are used to measure and improve our advertising and to show more
                relevant ads to people who are interested in solar power. These may be set by us
                or by our advertising partners (e.g. Google Ads, Meta/Facebook Pixel) when you
                visit our site.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">They can:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>Track that you visited our website</li>
                <li>Help us measure which ads or campaigns led you to us</li>
                <li>
                  Support remarketing (showing follow-up ads about solar to interested users).
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Because marketing cookies can track behaviour across sites and may involve
                profiling, they are <strong>strictly optional</strong> and only used if you give
                explicit consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">
                4. How our cookie banner and preferences work
              </h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                When you first visit our site, you will see a cookie banner at the bottom of the
                page. This banner:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>
                  Explains in simple language that we use <strong>essential</strong>,{" "}
                  <strong>analytics</strong>, and <strong>marketing</strong> cookies
                </li>
                <li>
                  Allows you to:
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>
                      <strong>Accept all</strong> cookies
                    </li>
                    <li>Choose <strong>Essential only</strong></li>
                    <li>
                      <strong>Customise</strong> and enable/disable analytics and marketing cookies
                      separately.
                    </li>
                  </ul>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-2">
                We <strong>do not</strong> load analytics or marketing scripts until you have opted
                in to those categories, in line with modern consent requirements (e.g.
                GDPR/ePrivacy and DPDP guidance).
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                Your choices are stored (for example, in local storage or an essential cookie) so
                we remember your selection on future visits from the same device and browser.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                You can change your preferences at any time by:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  Clicking a link such as <strong>"Privacy & Cookie Settings"</strong> in the
                  footer (we will add this and reopen the banner), or
                </li>
                <li>Clearing cookies in your browser and revisiting the site.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">
                5. Managing cookies in your browser
              </h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                In addition to our banner, you can control cookies through your browser settings.
                Most browsers allow you to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>View which cookies are stored</li>
                <li>Delete cookies</li>
                <li>Block cookies from specific sites</li>
                <li>Block third-party cookies</li>
                <li>Clear cookies when you close your browser.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Please note that blocking or deleting certain cookies may affect how our website
                functions.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                For more detailed guidance, refer to your browser's help pages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">
                6. Third-party cookies we may use
              </h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                Depending on the features enabled on our site, we may use third-party services that
                set their own cookies, such as:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>
                  <strong>Google Analytics</strong> – website analytics and performance
                  measurement
                </li>
                <li>
                  <strong>Google Ads</strong> – campaign measurement and remarketing
                </li>
                <li>
                  <strong>Meta (Facebook) Pixel</strong> – campaign measurement and remarketing
                </li>
                <li>
                  <strong>Embedded content</strong> – such as YouTube videos or maps, which may set
                  cookies from those providers.
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                These third parties are responsible for their own privacy and cookie practices. We
                encourage you to review their policies directly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">
                7. Cookies and personal data under Indian DPDP Act
              </h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act) applies when cookies
                collect or relate to personal data of individuals in India. The Act generally
                requires <strong>free, informed, and unambiguous consent</strong> before processing
                such data, except for certain legitimate uses.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">In practice, this means that:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  Essential cookies used purely for security and core functionality may be used
                  without separate consent, but still must be handled securely and transparently.
                </li>
                <li>
                  Analytics and marketing cookies that collect or enable the collection of personal
                  data (e.g. IP addresses, online identifiers, behavioural profiles) will typically
                  only be used when you have given consent via our cookie banner.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">
                8. Changes to this Cookie Policy
              </h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                We may update this Cookie Policy from time to time, for example if we:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>Add or remove tools or services that use cookies</li>
                <li>Change how we categorise or use cookies</li>
                <li>Need to reflect changes in law or guidance.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                When we do, we will update the &quot;Last updated&quot; date at the top. We encourage you to
                check this page periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-dark mb-4">9. Contact us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Cookie Policy or our use of cookies and
                similar technologies, you can reach us at:
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

