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
    locale: 'en_US',
    type: 'website',
  },
};

const LAST_UPDATED = 'October 2024';
const CONTACT_EMAIL = 'contact@quranacademee.com';
const SITE_NAME = 'Quran Academee';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f0f9ff] to-white text-slate-800">
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
            At <strong>{SITE_NAME}</strong>, we are committed to ensuring you are satisfied with our Quran education services. This Refund Policy outlines the conditions under which refunds may be granted.
          </p>
          <p className="mt-3">
            By enrolling in our services, you acknowledge and agree to the terms set out below.
          </p>
        </div>

        {[
          {
            title: '1. Free Trial Guarantee',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                All new students are entitled to a <strong>free trial class</strong> with no payment required. This allows you to evaluate the teaching quality and approach before committing to a paid plan. No refund is applicable to the free trial as no charge is made.
              </p>
            ),
          },
          {
            title: '2. Monthly Subscription Refunds',
            content: (
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                <li>
                  <strong>Within 7 days of payment:</strong> If you have not attended any paid classes and request a cancellation within 7 days of payment, you are entitled to a full refund.
                </li>
                <li>
                  <strong>After classes have commenced:</strong> A pro-rated refund will be issued for any unused, prepaid classes remaining at the time of cancellation.
                </li>
                <li>
                  <strong>After the billing period ends:</strong> No refund will be issued for past months already delivered.
                </li>
              </ul>
            ),
          },
          {
            title: '3. Missed Classes (Student-Initiated)',
            content: (
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                <li>Classes missed by the student without at least 12 hours&apos; advance notice are considered completed and are <strong>not eligible for a refund or make-up session</strong>.</li>
                <li>Classes rescheduled with adequate notice will be accommodated based on teacher and student availability.</li>
              </ul>
            ),
          },
          {
            title: '4. Missed Classes (Teacher-Initiated)',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                If a class is missed due to teacher unavailability, {SITE_NAME} will either reschedule the class at no additional cost or credit the class to your next billing cycle.
              </p>
            ),
          },
          {
            title: '5. Dissatisfaction with Service Quality',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                If you are unsatisfied with the quality of instruction, please contact us within 3 days of the relevant class. We will review the situation and, at our discretion, offer a replacement session with a different teacher, a make-up class, or a partial refund.
              </p>
            ),
          },
          {
            title: '6. Non-Refundable Items',
            content: (
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                <li>Classes already delivered and attended.</li>
                <li>Discounted or promotional pricing once the promotion period has passed.</li>
                <li>Any administrative or registration fees (if applicable).</li>
              </ul>
            ),
          },
          {
            title: '7. How to Request a Refund',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                To request a refund, please contact us at{' '}
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
