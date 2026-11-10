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
    images: [
      {
        url: '/images/link.png',
        width: 1200,
        height: 630,
        alt: 'Quran Academee Privacy Policy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Quran Academee',
    description:
      'Read the Quran Academee Privacy Policy to understand how we collect, use, and protect your personal information.',
    images: ['/images/link.png'],
  },
};

const LAST_UPDATED = 'October 2024';
const CONTACT_EMAIL = 'contact@quranacademee.com';
const SITE_NAME = 'Quran Academee';
const SITE_URL = 'https://www.quranacademee.com';

const privacySchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.quranacademee.com/privacy-policy#webpage',
      url: 'https://www.quranacademee.com/privacy-policy',
      name: 'Privacy Policy - Quran Academee',
      description:
        'Read the Quran Academee Privacy Policy to understand how we collect, use, and protect your personal information.',
      publisher: {
        '@type': 'EducationalOrganization',
        name: 'Quran Academee',
        url: 'https://www.quranacademee.com',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.quranacademee.com/privacy-policy#breadcrumb',
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
          name: 'Privacy Policy',
          item: 'https://www.quranacademee.com/privacy-policy',
        },
      ],
    },
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f0f9ff] to-white text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
      />
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
                <li><strong>Payment Information:</strong> We do not store payment card details on our servers. Payments are handled securely through third-party processors.</li>
              </ul>
            ),
          },
          {
            title: '2. How We Use Your Information',
            content: (
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                <li>To schedule and coordinate your free trial and ongoing classes.</li>
                <li>To communicate with you regarding schedules, teacher assignments, and course updates.</li>
                <li>To respond to your inquiries and support requests via email or WhatsApp.</li>
                <li>To improve our curriculum, teaching materials, and platform experience.</li>
              </ul>
            ),
          },
          {
            title: '3. Data Sharing & Third Parties',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share information only with trusted service providers (e.g., email delivery, video conferencing tools) strictly to operate our educational services, subject to confidentiality agreements.
              </p>
            ),
          },
          {
            title: '4. Children’s Privacy',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                Many of our students are children. We only collect information about children with the consent of a parent or legal guardian. Parents have the right to review, update, or request the deletion of their child’s personal data at any time by contacting us.
              </p>
            ),
          },
          {
            title: '5. Security',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                We implement industry-standard security measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure, and we encourage you to protect your own credentials.
              </p>
            ),
          },
          {
            title: '6. Cookies & Tracking',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                Our website uses basic functional cookies and analytics tools (such as Google Tag Manager and Google Analytics) to monitor traffic and improve user experience. You may configure your browser to decline cookies, though some features may function less effectively.
              </p>
            ),
          },
          {
            title: '7. Your Rights',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                Depending on your location (e.g., GDPR in the UK/EU), you may have the right to access, correct, or delete personal data we hold about you, or to withdraw consent for specific communications. To exercise any of these rights, contact us at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#1C8DC8] hover:underline font-semibold">
                  {CONTACT_EMAIL}
                </a>.
              </p>
            ),
          },
          {
            title: '8. Changes to This Policy',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. Continued use of our services after updates constitutes acceptance of the revised policy.
              </p>
            ),
          },
          {
            title: '9. Contact Us',
            content: (
              <p className="text-sm text-slate-700 leading-relaxed">
                If you have questions or concerns about this Privacy Policy, please contact us at{' '}
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
