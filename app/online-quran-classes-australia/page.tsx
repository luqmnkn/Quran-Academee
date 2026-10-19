import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Users,
  Clock,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import TrialModalButton from '@/components/TrialModalButton';

export const metadata: Metadata = {
  title: 'Online Quran Classes Australia | 1-on-1 AEST Lessons | Quran Academee',
  description:
    'Certified 1-on-1 online Quran classes for Australian kids and adults in Sydney, Melbourne, Brisbane & Perth. AEST/AWST timings from A$50/mo. Book a 3-day free trial.',
  alternates: {
    canonical: 'https://www.quranacademee.com/online-quran-classes-australia',
  },
  openGraph: {
    title: 'Online Quran Classes Australia | 1-on-1 AEST Lessons | Quran Academee',
    description:
      'Certified 1-on-1 online Quran classes for Australian kids and adults in Sydney, Melbourne, Brisbane & Perth. AEST/AWST timings from A$50/mo. Book a 3-day free trial.',
    url: 'https://www.quranacademee.com/online-quran-classes-australia',
    siteName: 'Quran Academee',
    images: [
      {
        url: '/images/link.png',
        width: 1200,
        height: 630,
        alt: 'Online Quran Classes in Australia',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
};

export default function OnlineQuranClassesAustraliaPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Online Quran Classes Australia',
    description:
      'Live 1-on-1 online Quran tutoring across Sydney, Melbourne, Brisbane, Perth, Adelaide, and regional Australia. Synchronized AEST and AWST timezones.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Quran Academee',
      sameAs: 'https://www.quranacademee.com',
    },
    offers: {
      '@type': 'Offer',
      price: '50.00',
      priceCurrency: 'AUD',
      category: 'Australia Online Quran Classes',
      availability: 'https://schema.org/InStock',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are class timings matched with Australian Eastern (AEST) and Western (AWST) hours?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our tutors operate 24/7 and provide prime afternoon after-school slots (4:00 PM – 8:00 PM) and weekend morning sessions across Sydney, Melbourne, Brisbane (AEST), and Perth (AWST).',
        },
      },
      {
        '@type': 'Question',
        name: 'Can we pay in Australian Dollars (AUD)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We support Australian bank cards and international payment methods. Pricing converts cleanly into AUD with transparent monthly billing.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you coordinate with Australian school terms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our flexible system allows Australian parents to adjust schedules or take pauses during term breaks (Terms 1 to 4) without losing their assigned tutor.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can we request a female Quran teacher in Australia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We have certified female scholars available during Australian peak daytime and evening hours for sisters and young children.',
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
        name: 'Australia Classes',
        item: 'https://www.quranacademee.com/online-quran-classes-australia',
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50/50 text-[#0B3951] pt-24 sm:pt-28 pb-20 relative overflow-hidden">
      {/* Schema.org Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
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

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 sm:mb-20">
        <h1 className="font-display font-[900] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0B3951] tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
          Online Quran Classes in{' '}
          <span className="font-allura inline-block py-1 text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">
            Australia
          </span>
        </h1>

        {/* 40-60 WORD ANSWER-FIRST SUMMARY BOX */}
        <div className="bg-white border border-sky-200/90 rounded-xl p-6 sm:p-8 shadow-sm text-left mb-8 max-w-3xl mx-auto">
          <span className="text-[11px] font-bold text-[#0284C7] uppercase tracking-wider block mb-2 font-mono">
            Overview for Australian Families
          </span>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            Online Quran classes in Australia provide personalized 1-on-1 tutoring synchronized with AEST and AWST timezones (4:00 PM – 8:00 PM). Led by verified male and female scholars fluent in English, students across Sydney, Melbourne, and regional Australia master Tajweed and Hifz from A$50/month. Book your complimentary 3-day trial class today.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <TrialModalButton
            courseName="Australia Online Quran Classes"
            className="py-4 px-8 rounded-xl font-bold shadow-md"
          >
            <span>Book 3-Day Free Trial (AEST/AWST)</span>
          </TrialModalButton>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center font-display font-bold text-xs uppercase tracking-wider bg-white border border-[#1C8DC8]/30 hover:border-[#1C8DC8] text-[#0B3951] hover:text-[#1C8DC8] py-4 px-6 rounded-xl transition-all shadow-sm"
          >
            <span>View Pricing Plans (AUD)</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </section>

      {/* AUSTRALIA BENEFITS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-[#F0F9FF] text-[#1C8DC8] flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              AEST & AWST Coordination
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prime afternoon slots tailored around Australian school dismissal and weekend sports commitments.
            </p>
          </div>

          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-[#F0F9FF] text-[#1C8DC8] flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              Serving Metro & Regional Australia
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bringing elite certified scholars to Muslim families in regional NSW, Queensland, Victoria, and WA who lack local madrasahs.
            </p>
          </div>

          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-[#F0F9FF] text-[#1C8DC8] flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              Term Break Adaptability
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Flexible scheduling that harmonizes smoothly with Australian state school terms 1, 2, 3, and 4.
            </p>
          </div>
        </div>
      </section>

      {/* AUSTRALIA FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="text-center mb-10">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
            Frequently Asked Questions for Australian Families
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Are class timings matched with Australian Eastern (AEST) and Western (AWST) hours?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes! Our tutors operate 24/7 and provide prime afternoon after-school slots (4:00 PM – 8:00 PM) and weekend morning sessions across Sydney, Melbourne, Brisbane (AEST), and Perth (AWST).
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Can we pay in Australian Dollars (AUD)?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes. We support Australian bank cards and international payment methods. Pricing converts cleanly into AUD with transparent monthly billing.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              How do you coordinate with Australian school terms?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our flexible system allows Australian parents to adjust schedules or take pauses during term breaks (Terms 1 to 4) without losing their assigned tutor.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Can we request a female Quran teacher in Australia?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes! We have certified female scholars available during Australian peak daytime and evening hours for sisters and young children.
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-xl p-8 sm:p-12 shadow-sm">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] mb-3">
            Start Your Free 3-Day Trial in Australia
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mb-6">
            Join hundreds of Australian Muslim families learning with Quran Academee across NSW, Victoria, Queensland, and WA.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <TrialModalButton
              courseName="Australia Quran Classes"
              className="py-3.5 px-8 rounded-xl font-bold"
            >
              <span>Book 3-Day Free Trial</span>
            </TrialModalButton>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center font-display font-bold text-xs uppercase tracking-wider bg-white border border-[#1C8DC8]/30 hover:border-[#1C8DC8] text-[#0B3951] hover:text-[#1C8DC8] py-3.5 px-6 rounded-xl transition-all shadow-sm"
            >
              <span>View Tuition Plans (AUD)</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
