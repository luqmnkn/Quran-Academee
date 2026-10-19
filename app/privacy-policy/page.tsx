import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - Quran Academee',
  description:
    'Read the Quran Academee Privacy Policy to understand how we collect, use, and protect your personal information when you use our online Quran learning services.',
  alternates: {
    canonical: 'https://www.quranacademee.com/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy - Quran Academee',
    description:
      'Read the Quran Academee Privacy Policy to understand how we collect, use, and protect your personal information.',
    url: 'https://www.quranacademee.com/privacy-policy',
    siteName: 'Quran Academee',
    locale: 'en_US',
    type: 'website',
  },
};

const LAST_UPDATED = 'October 2024';
const CONTACT_EMAIL = 'contact@quranacademee.com';
const SITE_NAME = 'Quran Academee';
const SITE_URL = 'https://www.quranacademee.com';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f0f9ff] to-white text-slate-800">
      {/* Hero Banner */}
      <div className="bg-[#0B3951] text-white py-16 px-4 text-center">
        <p className="text-xs uppercase tracking-widest text-[#1C8DC8] mb-3 font-semibold">Legal</p>
        <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-slate-300 max-w-lg mx-auto">
          Last updated: {LAST_UPDATED}
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-10">

        {/* Intro */}
        <div className="bg-[#E0F2FE]/40 border border-[#BAE6FD] rounded-2xl p-6 text-sm text-slate-700 leading-relaxed">
          <p>
            At <strong>{SITE_NAME}</strong> (<a href={SITE_URL} className="text-[#1C8DC8] hover:underline">{SITE_URL}</a>), we are committed to protecting your privacy. This Privacy Policy explains what information we collect, why we collect it, and how we use it when you access or use our website and services.
          </p>
          <p className="mt-3">
            By using our website, you agree to the collection and use of information as described in this policy.
          </p>
        </div>

        {[
          {
            title: '1. Information We Collect',
            content: (
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                <li><strong>Contact Information:</strong> When you fill out our inquiry or free trial form, we collect your name, email address, WhatsApp or phone number, and any message you provide.</li>
                <li><strong>Usage Data:</strong> We may collect anonymised analytics data (e.g., pages visited, session duration) via tools such as Google Analytics to help us improve our website.</li>
                <li><strong>Cookies:</strong> Our website uses cookies to enhance your browsing experience. You can disable cookies in your browser settings, though some features may be affected.</li>
              </ul>
            ),
          },
          {
            title: '2. How We Use Your Information',
            content: (
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                <li>To respond to your inquiry and schedule a free trial session.</li>
                <li>To send relevant communications about our services, schedule, or updates (you may opt out at any time).</li>
                <li>To improve and personalise your experience on our website.</li>
                <li>To comply with legal obligations.</li>
              </ul>
            ),
          },
          {
            title: '3. Sharing Your Information',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                We do <strong>not</strong> sell, trade, or rent your personal information to third parties. We may share information with trusted service providers (e.g., Google Analytics, email tools) solely to operate our services, and only under strict confidentiality agreements. We may disclose information if required by law.
              </p>
            ),
          },
          {
            title: '4. Data Retention',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                We retain personal data only as long as necessary to fulfil the purposes described in this policy, or as required by law. Inquiry submissions are kept for up to 12 months unless you request earlier deletion.
              </p>
            ),
          },
          {
            title: '5. Your Rights',
            content: (
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                <li>Access and receive a copy of your personal data.</li>
                <li>Request correction of inaccurate data.</li>
                <li>Request deletion of your data.</li>
                <li>Opt out of marketing communications at any time.</li>
              </ul>
            ),
          },
          {
            title: '6. Third-Party Links',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their own privacy policies.
              </p>
            ),
          },
          {
            title: '7. Children&apos;s Privacy',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                Our services are used by students of all ages, including children. We do not knowingly collect personal information from children under 13 without verifiable parental consent. If you believe we have collected such data, please contact us immediately.
              </p>
            ),
          },
          {
            title: '8. Security',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                We implement industry-standard technical and organisational measures to protect your personal data. However, no method of internet transmission is 100% secure and we cannot guarantee absolute security.
              </p>
            ),
          },
          {
            title: '9. Changes to This Policy',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the top will reflect the most recent revision. Continued use of our website after changes constitutes your acceptance of the updated policy.
              </p>
            ),
          },
          {
            title: '10. Contact Us',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                For questions or concerns about this Privacy Policy or your personal data, please contact us at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#1C8DC8] hover:underline font-semibold">
                  {CONTACT_EMAIL}
                </a>{' '}
                or via WhatsApp at{' '}
                <a href="https://wa.me/923702680670" target="_blank" rel="noreferrer" className="text-[#1C8DC8] hover:underline font-semibold">
                  +92 370 2680670
                </a>.
              </p>
            ),
          },
        ].map(({ title, content }) => (
          <section key={title}>
            <h2 className="font-display font-bold text-lg text-[#0B3951] mb-3 pb-2 border-b border-[#E0F2FE]">
              {title}
            </h2>
            {content}
          </section>
        ))}

        {/* Footer Nav */}
        <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200 text-xs text-slate-500">
          <Link href="/terms" className="hover:text-[#1C8DC8] hover:underline transition-colors">Terms of Service</Link>
          <Link href="/refund-policy" className="hover:text-[#1C8DC8] hover:underline transition-colors">Refund Policy</Link>
          <Link href="/" className="hover:text-[#1C8DC8] hover:underline transition-colors">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
