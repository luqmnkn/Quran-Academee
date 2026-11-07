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
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - Quran Academee',
    description:
      'Read the Quran Academee Terms of Service including enrolment, payment, and usage conditions.',
    images: ['/images/link.png'],
  },
};

const LAST_UPDATED = 'October 2024';
const CONTACT_EMAIL = 'contact@quranacademee.com';
const SITE_NAME = 'Quran Academee';
const SITE_URL = 'https://www.quranacademee.com';

const termsSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.quranacademee.com/terms#webpage',
      url: 'https://www.quranacademee.com/terms',
      name: 'Terms of Service - Quran Academee',
      description:
        'Read the Quran Academee Terms of Service including enrolment, payment, and usage conditions.',
      publisher: {
        '@type': 'EducationalOrganization',
        name: 'Quran Academee',
        url: 'https://www.quranacademee.com',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.quranacademee.com/terms#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.quranacademee.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Terms of Service',
          item: 'https://www.quranacademee.com/terms',
        },
      ],
    },
  ],
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f0f9ff] to-white text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsSchema) }}
      />
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
            Welcome to <strong>{SITE_NAME}</strong> (<a href={SITE_URL} className="text-[#1C8DC8] hover:underline">{SITE_URL}</a>). By enrolling in our courses, using our website, or communicating with our staff and teachers, you agree to comply with and be bound by the following Terms of Service. Please read them carefully.
          </p>
          <p className="mt-3">
            If you do not agree to these Terms, please do not use our services.
          </p>
        </div>

        {[
          {
            title: '1. Services Offered',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                Quran Academee provides online one-on-one and group Quran, Tajweed, Hifz, Islamic Studies, and Arabic language instruction for children and adults. Classes are delivered via video conferencing tools such as Zoom or Google Meet.
              </p>
            ),
          },
          {
            title: '2. Enrolment & Free Trial',
            content: (
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                <li>New students may request a free 3-day trial class with no financial commitment.</li>
                <li>Trial classes are subject to tutor availability and scheduling confirmation.</li>
                <li>Following the trial, continuation requires enrolment in a monthly tuition plan.</li>
              </ul>
            ),
          },
          {
            title: '3. Tuition & Payments',
            content: (
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                <li>Tuition fees are billed monthly in advance based on the selected package and schedule.</li>
                <li>Payments must be settled before the start of each monthly billing cycle.</li>
                <li>We reserve the right to pause classes if payment is not received within 7 days of the invoice date.</li>
                <li>There are no registration fees or hidden charges.</li>
              </ul>
            ),
          },
          {
            title: '4. Attendance, Rescheduling & Make-Up Classes',
            content: (
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                <li>Students are expected to attend scheduled classes punctually.</li>
                <li>If a student needs to reschedule, at least <strong>4 hours advance notice</strong> must be provided to the coordinator or teacher.</li>
                <li>With timely notice, we will do our best to arrange a make-up class within the same billing month, subject to tutor availability.</li>
                <li>Unannounced absences (no-shows) are non-refundable and not eligible for make-up sessions.</li>
                <li>If a teacher is unable to attend, a make-up class or substitute qualified teacher will always be provided.</li>
              </ul>
            ),
          },
          {
            title: '5. Student Conduct & Code of Ethics',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                Students and parents are expected to treat teachers with respect, Islamic courtesy, and dignity at all times. Inappropriate, offensive, or disruptive behavior will not be tolerated and may result in immediate termination of classes without refund.
              </p>
            ),
          },
          {
            title: '6. Direct Contact with Teachers',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                All scheduling, payment, and administrative communications must go through the official Quran Academee administration. Direct financial arrangements or private tutoring solicitations with our teachers outside our platform are strictly prohibited.
              </p>
            ),
          },
          {
            title: '7. Cancellation & Pausing Enrolment',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                You may pause or cancel your subscription at any time by giving written notice to our administration before the next billing cycle. No long-term contracts bind you.
              </p>
            ),
          },
          {
            title: '8. Intellectual Property',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                All original curriculum content, guides, worksheets, PDFs, and website materials produced by Quran Academee remain the intellectual property of Quran Academee. They may not be reproduced or distributed for commercial purposes without written consent.
              </p>
            ),
          },
          {
            title: '9. Limitation of Liability',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                Quran Academee is not liable for technical issues arising from your internet connection, hardware malfunctions, or third-party software (such as Zoom or Google Meet). We will, however, work with you in good faith to resolve scheduling disruptions caused by technical failures.
              </p>
            ),
          },
          {
            title: '10. Amendments',
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
