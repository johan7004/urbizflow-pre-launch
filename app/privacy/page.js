export const metadata = {
  title: "Privacy Policy — UrbizFlow",
  description:
    "Learn how UrbizFlow collects, uses, and protects your information. This policy covers our waitlist form and related services.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://urbizflow.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0b0d13] text-white antialiased">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold">Privacy Policy</h1>
          <p className="text-white/70 mt-2">
            Effective date: <span className="text-white">8 Oct 2025</span>
          </p>
        </header>

        <div className="space-y-8 text-sm leading-6 text-white/80">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="mb-3">
              This Privacy Policy explains how{" "}
              <span className="text-white">UrbizFlow</span> (“we,” “us,” or
              “our”) collects, uses, discloses, and protects personal
              information when you visit our website and join our pre-launch
              waitlist (the “Services”).
            </p>
            <p className="mb-0">
              By using the Services, you agree to this Policy. If you do not
              agree, please do not use the Services.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold mb-2">
              1) Information We Collect
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="text-white">
                  Waitlist details you provide:
                </span>{" "}
                name, email address, and optional role/company (“work”).
              </li>
              <li>
                <span className="text-white">
                  Automatic site data (limited):
                </span>{" "}
                basic logs such as pages visited, timestamps, and device
                information used for security and performance.
              </li>
              <li>
                We do not knowingly collect sensitive categories (e.g., health,
                precise location) via the waitlist.
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold mb-2">
              2) How We Use Information
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                To manage the waitlist and contact you about early access,
                updates, and product information.
              </li>
              <li>
                To operate, maintain, and improve the website and Services.
              </li>
              <li>
                To prevent abuse, secure the Services, and comply with legal
                obligations.
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold mb-2">
              3) Legal Bases (EEA/UK)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="text-white">Consent</span> — contacting you
                after you join the waitlist.
              </li>
              <li>
                <span className="text-white">Legitimate interests</span> —
                securing and improving the Services.
              </li>
              <li>
                <span className="text-white">Legal obligation</span> —
                responding to lawful requests and enforcing rights.
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold mb-2">
              4) Sharing & Service Providers
            </h2>
            <p className="mb-3">
              We do not sell your personal information. We share it only with
              service providers who process it on our behalf under contracts
              that require appropriate protections.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="text-white">Cloud database & hosting:</span>{" "}
                Google Firebase / Firestore (Google LLC) for storing waitlist
                entries and operating infrastructure.
              </li>
              <li>
                <span className="text-white">Analytics & security:</span> basic
                server and application logs to help keep the Services reliable
                and secure.
              </li>
            </ul>
            <p className="mt-3">
              We may also disclose information if required by law, to protect
              our rights or users, or during a business transaction (e.g.,
              merger or acquisition) where protections will apply.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold mb-2">
              5) International Transfers
            </h2>
            <p>
              We may process and store information in the United States and
              other countries. When transferring data from the UK/EEA, we rely
              on appropriate safeguards such as Standard Contractual Clauses or
              equivalent mechanisms.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold mb-2">6) Data Retention</h2>
            <p>
              We keep waitlist information until we finish our pre-launch
              process or you ask us to delete it, unless a longer period is
              required by law or necessary for dispute resolution and security.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold mb-2">7) Your Rights</h2>
            <p className="mb-3">
              Depending on your location, you may have rights to access,
              correct, delete, or receive a copy of your personal information,
              and to withdraw consent or object to certain uses.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="text-white">EEA/UK:</span> rights under GDPR/UK
                GDPR (access, rectification, erasure, restriction, portability,
                objection).
              </li>
              <li>
                <span className="text-white">California:</span> rights under
                CCPA/CPRA (know, delete, correct, opt-out of “sale/share”). We
                don’t “sell” or “share” personal information as defined by CPRA.
              </li>
            </ul>
            <p className="mt-3">
              To make a request, contact us at{" "}
              <a
                href="mailto:privacy@urbizflow.com"
                className="text-blue-300 underline"
              >
                privacy@urbizflow.com
              </a>
              . We may need to verify your identity. You can also unsubscribe
              from emails via any message you receive.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold mb-2">
              8) Cookies & Tracking
            </h2>
            <p>
              We currently use only minimal, essential cookies/technologies
              needed to operate and secure the website. If we add analytics or
              advertising cookies in the future, we will update this Policy and
              (where required) request your consent.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold mb-2">9) Security</h2>
            <p>
              We use reasonable technical and organizational measures to protect
              personal information. No internet-based service can be 100%
              secure, so we cannot guarantee absolute security.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold mb-2">
              10) Children’s Privacy
            </h2>
            <p>
              The Services are not directed to children under 13 (or the age
              required by local law). We do not knowingly collect personal
              information from children. If you believe a child has provided
              information, contact us to delete it.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold mb-2">
              11) Changes to This Policy
            </h2>
            <p>
              We may update this Policy from time to time. We will post the new
              Policy here and update the “Effective date” above. If changes are
              material, we will provide additional notice where required.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold mb-2">12) Contact Us</h2>
            <p>
              Questions or requests about this Policy can be sent to{" "}
              <a
                href="mailto:privacy@urbizflow.com"
                className="text-blue-300 underline"
              >
                privacy@urbizflow.com
              </a>
              . You may also write to: UrbizFlow, 123 Example Street, London,
              UK.
            </p>
          </section>

          <p className="text-xs text-white/60">
            This template is provided for informational purposes only and does
            not constitute legal advice. Please consult a qualified lawyer to
            adapt it to your specific operations and jurisdictions.
          </p>
        </div>
      </div>
    </main>
  );
}
