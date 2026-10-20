import React from 'react';
import type { Metadata } from 'next';
import InquiryForm from '@/components/InquiryForm';

export const metadata: Metadata = {
  title: 'Book 3-Day Free Trial Class | Online Quran Classes | Quran Academee',
  description:
    'Claim your 3-day free online Quran trial class with certified 1-on-1 scholars. No credit card required. Flexible schedules for kids and adults worldwide.',
  alternates: {
    canonical: 'https://www.quranacademee.com/free-trial',
  },
  openGraph: {
    title: 'Book 3-Day Free Trial Class | Online Quran Classes | Quran Academee',
    description:
      'Claim your 3-day free online Quran trial class with certified 1-on-1 scholars. No credit card required. Flexible schedules for kids and adults worldwide.',
    url: 'https://www.quranacademee.com/free-trial',
    siteName: 'Quran Academee',
    images: [
      {
        url: '/images/link.png',
        width: 1200,
        height: 630,
        alt: 'Quran Academee 3-Day Free Trial',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function FreeTrialPage() {
  const trialSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Book a 3-Day Free Online Quran Trial Class',
    description:
      'Register for 3 complimentary 1-on-1 online Quran classes with certified male or female tutors. No credit card required.',
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Quran Academee',
      url: 'https://www.quranacademee.com',
    },
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
      description: '3-Day Free Trial Class with certified 1-on-1 scholar',
      availability: 'https://schema.org/InStock',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is the 3-day trial genuinely 100% free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! There are zero hidden fees, and no credit card or payment information is required to start. You receive 3 full 1-on-1 classes completely free.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I request a female teacher for my daughter or myself?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, absolutely. We have dedicated certified female scholars available for sisters and young children.',
        },
      },
      {
        '@type': 'Question',
        name: 'What software or device do I need?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You only need a laptop, tablet, or smartphone with an internet connection. Classes take place via Zoom or Google Meet with interactive screen-sharing.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens after the 3 trial classes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If you love the teacher and experience, you can choose a monthly plan starting at $35/month. If not, there is never any obligation to continue.',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
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
        name: 'Free Trial',
        item: 'https://www.quranacademee.com/free-trial',
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50/50 text-[#0B3951] pt-24 sm:pt-28 pb-20 relative overflow-hidden">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(trialSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Background Glow Accents */}
      <div className="absolute top-0 right-1/4 w-[650px] h-[650px] bg-[#1C8DC8]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[550px] h-[550px] bg-[#116c9c]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* 1. BOOK YOUR 3-DAY FREE TRIAL CLASS (INQUIRY FORM SECTION LIKE HOMEPAGE) */}
      <InquiryForm
        title="Book Your 3-Day Free Trial Class"
        asH1={true}
        sectionClassName="w-full py-6 lg:py-10 bg-transparent flex items-center justify-center overflow-hidden mb-12 sm:mb-16"
      />

      {/* 3-STEP TIMELINE: WHAT HAPPENS NEXT */}
      <section className="bg-white border-y border-sky-100 py-16 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
              What Happens Next?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-[#1C8DC8] text-white font-display font-black text-lg flex items-center justify-center mx-auto shadow-sm">
                1
              </div>
              <h3 className="font-display font-bold text-base text-[#0B3951]">
                Submit Your Request
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                Enter your contact info and select the course interest. It takes less than 60 seconds.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-[#0B3951] text-white font-display font-black text-lg flex items-center justify-center mx-auto shadow-sm">
                2
              </div>
              <h3 className="font-display font-bold text-base text-[#0B3951]">
                WhatsApp Confirmation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                Our coordinator reaches out to confirm your preferred time slot and pair you with a certified tutor.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#1C8DC8] to-[#146299] text-white font-display font-black text-lg flex items-center justify-center mx-auto shadow-sm">
                3
              </div>
              <h3 className="font-display font-bold text-base text-[#0B3951]">
                Attend 1-on-1 Class
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                Connect via Zoom or Google Meet. Experience real personalized instruction with zero pressure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
            Frequently Asked Questions About the Free Trial
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 border border-sky-100 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Is the 3-day trial genuinely 100% free?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes! There are zero hidden fees, and no credit card or payment information is required to start. You receive 3 full 1-on-1 classes completely free.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Can I request a female teacher for my daughter or myself?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes, absolutely. We have dedicated certified female scholars available for sisters and young children.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              What software or device do I need?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              You only need a laptop, tablet, or smartphone with an internet connection. Classes take place via Zoom or Google Meet with interactive screen-sharing.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              What happens after the 3 trial classes?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              If you love the teacher and experience, you can choose a monthly plan starting at $35/month. If not, there is never any obligation to continue.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
