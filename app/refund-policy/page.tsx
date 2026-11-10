import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund Policy - Quran Academee',
  description:
    'Read the Quran Academee Refund Policy. Understand our fair refund and cancellation process for online Quran classes and subscription plans.',
  alternates: {
    canonical: 'https://www.quranacademee.com/refund-policy',
  },
  openGraph: {
    title: 'Refund Policy - Quran Academee',
    description:
      'Understand the Quran Academee fair refund and cancellation process for online Quran classes.',
    url: 'https://www.quranacademee.com/refund-policy',
    siteName: 'Quran Academee',
    images: [
      {
        url: '/images/link.png',
        width: 1200,
        height: 630,
        alt: 'Quran Academee Refund Policy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refund Policy - Quran Academee',
    description:
      'Understand the Quran Academee fair refund and cancellation process for online Quran classes.',
    images: ['/images/link.png'],
  },
};

const LAST_UPDATED = 'October 2024';
const CONTACT_EMAIL = 'contact@quranacademee.com';
const SITE_NAME = 'Quran Academee';

const refundSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.quranacademee.com/refund-policy#webpage',
      url: 'https://www.quranacademee.com/refund-policy',
      name: 'Refund Policy - Quran Academee',
      description:
        'Understand the Quran Academee fair refund and cancellation process for online Quran classes.',
      publisher: {
        '@type': 'EducationalOrganization',
        name: 'Quran Academee',
        url: 'https://www.quranacademee.com',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.quranacademee.com/refund-policy#breadcrumb',
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
          name: 'Refund Policy',
          item: 'https://www.quranacademee.com/refund-policy',
        },
      ],
    },
  ],
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f0f9ff] to-white text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(refundSchema) }}
      />
      {/* Hero Banner */}
      <div className="bg-[#0B3951] text-white py-16 px-4 text-center">
        <p className="text-xs uppercase tracking-widest text-[#1C8DC8] mb-3 font-semibold">Legal</p>
        <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight">
          Refund Policy
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
            At <strong>{SITE_NAME}</strong>, we are dedicated to providing high-quality, authentic Quran and Islamic education. We want you to be completely satisfied with your learning experience. This Refund Policy outlines the terms and conditions under which refunds and fee adjustments are provided.
          </p>
          <p className="mt-3">
            By enrolling in a monthly tuition plan, you acknowledge and agree to the terms below.
          </p>
        </div>

        {[
          {
            title: '1. Free 3-Day Trial Period',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                We strongly encourage all prospective students to take advantage of our free 3-day trial class before paying tuition. No payment details are collected for the trial, and there is zero obligation to continue. This allows you to evaluate your assigned teacher, curriculum fit, and learning schedule risk-free.
              </p>
            ),
          },
          {
            title: '2. Monthly Tuition Payments',
            content: (
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                <li>Tuition is billed on a monthly cycle in advance of classes being delivered.</li>
                <li>Because teacher time slots are reserved exclusively for each student, monthly tuition payments are generally <strong>non-refundable</strong> once the billing cycle has begun.</li>
              </ul>
            ),
          },
          {
            title: '3. Prorated Refunds for Unused Classes',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                If you choose to discontinue classes mid-month due to unavoidable personal circumstances, you may request a prorated refund for all classes that have <strong>not yet occurred</strong>, subject to a minimum of <strong>48 hours notice</strong> prior to the next scheduled lesson. Classes that have already taken place are non-refundable.
              </p>
            ),
          },
          {
            title: '4. Academy-Initiated Cancellations',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                In the rare event that Quran Academee is unable to deliver your scheduled classes (for example, due to tutor illness or academy scheduling disruptions) and a suitable make-up session or qualified substitute cannot be arranged within 30 days, you are entitled to a full refund for the affected session(s).
              </p>
            ),
          },
          {
            title: '5. Student Absences & No-Shows',
            content: (
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                <li>Classes missed by a student with at least <strong>4 hours advance notice</strong> are eligible for a make-up class within the same billing month, subject to teacher availability.</li>
                <li>Missed classes where no advance notice was given (unannounced no-shows) are non-refundable and will not be rescheduled.</li>
              </ul>
            ),
          },
          {
            title: '6. Switching Teachers',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                If you are not satisfied with your current teacher for any reason, please let us know immediately. We will assign you a new teacher at no extra charge. A teacher mismatch is treated as a priority reassignment rather than a cause for cancellation.
              </p>
            ),
          },
          {
            title: '7. How to Request a Refund',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                To request a refund, please contact our support team at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#1C8DC8] hover:underline font-semibold">
                  {CONTACT_EMAIL}
                </a>{' '}
                or via WhatsApp at{' '}
                <a href="https://wa.me/923702680670" target="_blank" rel="noreferrer" className="text-[#1C8DC8] hover:underline font-semibold">
                  +92 370 2680670
                </a>{' '}
                with your name, the date of your original payment, and the reason for your request. We aim to process all refund requests within 5–7 business days.
              </p>
            ),
          },
          {
            title: '8. Changes to This Policy',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                We reserve the right to update this Refund Policy at any time. Changes will be posted on this page with a revised &ldquo;Last updated&rdquo; date. Continued use of our services constitutes acceptance of the updated policy.
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
          <Link href="/terms" className="hover:text-[#1C8DC8] hover:underline transition-colors">Terms of Service</Link>
          <Link href="/" className="hover:text-[#1C8DC8] hover:underline transition-colors">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
