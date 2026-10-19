import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - Quran Academee',
  description:
    'Read the Quran Academee Terms of Service. Learn about acceptable use, enrolment conditions, payment obligations, and our commitment to quality Quran education.',
  alternates: {
    canonical: 'https://www.quranacademee.com/terms',
  },
  openGraph: {
    title: 'Terms of Service - Quran Academee',
    description:
      'Read the Quran Academee Terms of Service including enrolment, payment, and usage conditions.',
    url: 'https://www.quranacademee.com/terms',
    siteName: 'Quran Academee',
    locale: 'en_US',
    type: 'website',
  },
};

const LAST_UPDATED = 'October 2024';
const CONTACT_EMAIL = 'contact@quranacademee.com';
const SITE_NAME = 'Quran Academee';
const SITE_URL = 'https://www.quranacademee.com';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f0f9ff] to-white text-slate-800">
      {/* Hero Banner */}
      <div className="bg-[#0B3951] text-white py-16 px-4 text-center">
        <p className="text-xs uppercase tracking-widest text-[#1C8DC8] mb-3 font-semibold">Legal</p>
        <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight">
          Terms of Service
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
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of{' '}
            <strong>{SITE_NAME}</strong> (<a href={SITE_URL} className="text-[#1C8DC8] hover:underline">{SITE_URL}</a>) and the online Quran education services we provide. By enrolling or using our services, you agree to be bound by these Terms.
          </p>
          <p className="mt-3">
            If you are enrolling on behalf of a minor, you (the parent or guardian) accept these Terms on their behalf and take responsibility for their participation.
          </p>
        </div>

        {[
          {
            title: '1. Services',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                {SITE_NAME} provides live one-on-one online Quran classes covering Tajweed, Quran Recitation &amp; Reading, Quran Memorisation (Hifz), Alqaida Almadania Basics, Islamic Essentials &amp; Duas, and Hifz Revision. Class schedules, duration, and frequency are agreed upon at the time of enrolment.
              </p>
            ),
          },
          {
            title: '2. Enrolment & Free Trial',
            content: (
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                <li>A free trial class is available to all new students. No payment is required for the trial.</li>
                <li>Enrolment is confirmed upon receipt of the first payment.</li>
                <li>We reserve the right to decline or terminate enrolment if conduct is deemed inappropriate.</li>
              </ul>
            ),
          },
          {
            title: '3. Payments',
            content: (
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                <li>Fees are charged on a monthly basis and are due at the beginning of each month.</li>
                <li>All fees are stated in USD and may be converted to your local currency at current rates.</li>
                <li>Late payment may result in suspension of classes until payment is received.</li>
                <li>Pricing may be revised with reasonable notice (minimum 30 days). Current students will be informed before any change takes effect.</li>
              </ul>
            ),
          },
          {
            title: '4. Scheduling & Cancellations',
            content: (
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                <li>Students must give at least 12 hours&apos; advance notice to cancel or reschedule a class.</li>
                <li>Classes cancelled without adequate notice are considered completed and will not be made up.</li>
                <li>We will make reasonable efforts to reschedule classes missed due to teacher unavailability.</li>
              </ul>
            ),
          },
          {
            title: '5. Student Conduct',
            content: (
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                <li>Students and their guardians are expected to behave respectfully toward teachers and staff at all times.</li>
                <li>Recording of live sessions is prohibited without explicit written consent from {SITE_NAME}.</li>
                <li>Sharing login credentials or reselling our resources is strictly prohibited.</li>
              </ul>
            ),
          },
          {
            title: '6. Intellectual Property',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                All content on this website — including text, images, downloadable resources, and course materials — is the intellectual property of {SITE_NAME} or its licensors. You may not reproduce, distribute, or create derivative works without prior written permission.
              </p>
            ),
          },
          {
            title: '7. Limitation of Liability',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                To the fullest extent permitted by law, {SITE_NAME} shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services. Our total liability for any claim shall not exceed the fees paid by you in the preceding 30 days.
              </p>
            ),
          },
          {
            title: '8. Termination',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                Either party may terminate the service relationship with 7 days&apos; written notice. Upon termination, any unused prepaid classes will be refunded on a pro-rated basis, subject to our{' '}
                <Link href="/refund-policy" className="text-[#1C8DC8] hover:underline">Refund Policy</Link>.
              </p>
            ),
          },
          {
            title: '9. Governing Law',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                These Terms are governed by applicable international law as relevant to the services provided online. Any disputes will be resolved through good-faith negotiation or, if necessary, binding arbitration.
              </p>
            ),
          },
          {
            title: '10. Changes to These Terms',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                We may update these Terms periodically. Continued use of our services after notification of changes constitutes acceptance of the updated Terms.
              </p>
            ),
          },
          {
            title: '11. Contact Us',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                If you have any questions about these Terms, please contact us at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#1C8DC8] hover:underline font-semibold">
                  {CONTACT_EMAIL}
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
          <Link href="/privacy-policy" className="hover:text-[#1C8DC8] hover:underline transition-colors">Privacy Policy</Link>
          <Link href="/refund-policy" className="hover:text-[#1C8DC8] hover:underline transition-colors">Refund Policy</Link>
          <Link href="/" className="hover:text-[#1C8DC8] hover:underline transition-colors">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
