import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Award,
  CheckCircle,
  Users,
  Clock,
  ShieldCheck,
  BookOpen,
  Calendar,
  HelpCircle,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import TrialModalButton from '@/components/TrialModalButton';

export const metadata: Metadata = {
  title: 'Online Quran Classes USA | 1-on-1 Lessons in US Timezones | Quran Academee',
  description:
    'Live 1-on-1 online Quran classes for kids and adults across the USA. Flexible EST, CST, MST & PST schedules, certified male & female scholars. From $35/mo with a 3-day free trial.',
  alternates: {
    canonical: 'https://www.quranacademee.com/online-quran-classes-usa',
  },
  openGraph: {
    title: 'Online Quran Classes USA | 1-on-1 Lessons in US Timezones | Quran Academee',
    description:
      'Live 1-on-1 online Quran classes for kids and adults across the USA. Flexible EST, CST, MST & PST schedules, certified male & female scholars. From $35/mo with a 3-day free trial.',
    url: 'https://www.quranacademee.com/online-quran-classes-usa',
    siteName: 'Quran Academee',
    images: [
      {
        url: '/images/link.png',
        width: 1200,
        height: 630,
        alt: 'Online Quran Classes in the USA',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function OnlineQuranClassesUSAPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Online Quran Classes USA',
    description:
      'Certified 1-on-1 online Quran classes for American Muslim kids and adults across New York, Texas, California, Illinois, and nationwide. Flexible EST, CST, and PST scheduling.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Quran Academee',
      sameAs: 'https://www.quranacademee.com',
    },
    offers: {
      '@type': 'Offer',
      price: '35.00',
      priceCurrency: 'USD',
      category: 'USA Online Quran Classes',
      availability: 'https://schema.org/InStock',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do you offer class times across Eastern, Central, and Pacific time zones?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our tutors operate 24/7, providing after-school and evening slots across EST (New York, Florida), CST (Texas, Illinois), MST (Colorado), and PST (California, Washington).',
        },
      },
      {
        '@type': 'Question',
        name: 'How do online classes compare to local weekend Islamic school?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Local Sunday schools often have 15-20 students per class, meaning your child only recites for 3-5 minutes. Our 1-on-1 classes give your child 100% of the scholar’s attention for the entire 30-45 minutes without highway commutes.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer multi-child family discounts for American families?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer custom family package discounts when two or more siblings enroll together. Inquire during your free trial consultation for details.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can we pay with standard US credit cards and PayPal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We accept all major US debit and credit cards (Visa, Mastercard, Amex, Discover) with transparent monthly billing and no long-term contracts.',
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
        name: 'USA Classes',
        item: 'https://www.quranacademee.com/online-quran-classes-usa',
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
          Online Quran Classes in the{' '}
          <span className="font-allura inline-block py-1 text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">
            United States
          </span>
        </h1>

        {/* 40-60 WORD ANSWER-FIRST SUMMARY BOX */}
        <div className="bg-white border border-sky-200/90 rounded-xl p-6 sm:p-8 shadow-sm text-left mb-8 max-w-3xl mx-auto">
          <span className="text-[11px] font-bold text-[#0284C7] uppercase tracking-wider block mb-2 font-mono">
            Overview for US Families
          </span>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            Online Quran classes in the USA deliver personalized 1-on-1 instruction across Eastern, Central, Mountain, and Pacific time zones. Guided by verified male and female scholars fluent in English, American Muslim kids and adults master Tajweed, reading, and Hifz without traffic commutes. Starting at $35/month with a 3-day free trial.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <TrialModalButton
            courseName="USA Online Quran Classes"
            className="py-4 px-8 rounded-xl font-bold shadow-md"
          >
            <span>Book 3-Day Free Trial (US Timezones)</span>
          </TrialModalButton>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center font-display font-bold text-xs uppercase tracking-wider bg-white border border-[#1C8DC8]/30 hover:border-[#1C8DC8] text-[#0B3951] hover:text-[#1C8DC8] py-4 px-6 rounded-xl transition-all shadow-sm"
          >
            <span>View Pricing Plans (USD)</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </section>

      {/* USA BENEFITS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-[#F0F9FF] text-[#1C8DC8] flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              EST, CST & PST Coordination
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No matter what coast or state you live in, choose convenient slots after school, football practice, or workday routines.
            </p>
          </div>

          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-[#F0F9FF] text-[#1C8DC8] flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              Bilingual English Fluency
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our scholars communicate with neutral, clear English accents that American children understand effortlessly.
            </p>
          </div>

          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-[#F0F9FF] text-[#1C8DC8] flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              No Commute, Pure Focus
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Save hours of rush-hour driving to distant Islamic centers. Learn safely and comfortably from your living room or study.
            </p>
          </div>
        </div>
      </section>

      {/* USA FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="text-center mb-10">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
            Frequently Asked Questions for American Families
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Do you offer class times across Eastern, Central, and Pacific time zones?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes! Our tutors operate 24/7, providing after-school and evening slots across EST (New York, Florida), CST (Texas, Illinois), MST (Colorado), and PST (California, Washington).
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              How do online classes compare to local weekend Islamic school?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Local Sunday schools often have 15-20 students per class, meaning your child only recites for 3-5 minutes. Our 1-on-1 classes give your child 100% of the scholar’s attention for the entire 30-45 minutes without highway commutes.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Do you offer multi-child family discounts for American families?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes, we offer custom family package discounts when two or more siblings enroll together. Inquire during your free trial consultation for details.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Can we pay with standard US credit cards and PayPal?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes. We accept all major US debit and credit cards (Visa, Mastercard, Amex, Discover) with transparent monthly billing and no long-term contracts.
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-xl p-8 sm:p-12 shadow-sm">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] mb-3">
            Start Your Free 3-Day Trial in the USA
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mb-6">
            Join Muslim families learning with Quran Academee across all 50 states. Experience real 1-on-1 progress with zero commitment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <TrialModalButton
              courseName="USA Quran Classes"
              className="py-3.5 px-8 rounded-xl font-bold"
            >
              <span>Book 3-Day Free Trial</span>
            </TrialModalButton>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center font-display font-bold text-xs uppercase tracking-wider bg-white border border-[#1C8DC8]/30 hover:border-[#1C8DC8] text-[#0B3951] hover:text-[#1C8DC8] py-3.5 px-6 rounded-xl transition-all shadow-sm"
            >
              <span>View Pricing Plans (USD)</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
