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
  title: 'Online Quran Classes in Canada | 1-on-1 Lessons | Quran Academee',
  description:
    'Certified 1-on-1 online Quran classes for Canadian kids and adults. Safe, warm home learning across Toronto, Calgary, Vancouver & Ottawa. Starting from CA$45/month with 3-day free trial.',
  alternates: {
    canonical: 'https://www.quranacademee.com/online-quran-classes-canada',
  },
  openGraph: {
    title: 'Online Quran Classes in Canada | 1-on-1 Lessons | Quran Academee',
    description:
      'Certified 1-on-1 online Quran classes for Canadian kids and adults. Safe, warm home learning across Toronto, Calgary, Vancouver & Ottawa. Starting from CA$45/month with 3-day free trial.',
    url: 'https://www.quranacademee.com/online-quran-classes-canada',
    siteName: 'Quran Academee',
    images: [
      {
        url: '/images/link.png',
        width: 1200,
        height: 630,
        alt: 'Online Quran Classes in Canada',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
};

export default function OnlineQuranClassesCanadaPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Online Quran Classes Canada',
    description:
      'Live 1-on-1 online Quran classes across Toronto, Mississauga, Calgary, Vancouver, Ottawa, and all Canadian provinces. Certified male and female scholars.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Quran Academee',
      sameAs: 'https://www.quranacademee.com',
    },
    offers: {
      '@type': 'Offer',
      price: '45.00',
      priceCurrency: 'CAD',
      category: 'Canada Online Quran Classes',
      availability: 'https://schema.org/InStock',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are class timings coordinated across Canadian time zones?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We support all Canadian time zones—from Eastern Time (Ontario & Quebec) to Mountain Time (Alberta) and Pacific Time (British Columbia). Pick after-school or weekend slots that fit your family routine.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why do Canadian parents prefer online Quran classes over in-person driving?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Canadian winters make traveling in snow and sub-zero temperatures hazardous and stressful. Online 1-on-1 learning allows your child to learn safely, warmly, and consistently at home without missed sessions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can we pay in Canadian Dollars (CAD)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We support Canadian debit and credit cards, and your bank will convert cleanly into CAD with no surprise international fees.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer flexibility during Canadian school winter and March breaks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. You can easily pause, rearrange, or adjust schedules during March break or winter holidays by notifying your coordinator.',
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
        name: 'Canada Classes',
        item: 'https://www.quranacademee.com/online-quran-classes-canada',
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
            Canada
          </span>
        </h1>

        {/* 40-60 WORD ANSWER-FIRST SUMMARY BOX */}
        <div className="bg-white border border-sky-200/90 rounded-xl p-6 sm:p-8 shadow-sm text-left mb-8 max-w-3xl mx-auto">
          <span className="text-[11px] font-bold text-[#0284C7] uppercase tracking-wider block mb-2 font-mono">
            Overview for Canadian Families
          </span>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            Online Quran classes in Canada offer Muslim families safe, warm 1-on-1 tutoring without hazardous winter commutes. Coordinated across Eastern, Mountain, and Pacific time zones, certified male and female scholars guide students from Madani Qaida to fluent Tajweed recitation. Starting from CA$45/month with a complimentary 3-day free trial.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <TrialModalButton
            courseName="Canada Online Quran Classes"
            className="py-4 px-8 rounded-xl font-bold shadow-md"
          >
            <span>Book 3-Day Free Trial (Canada Timezones)</span>
          </TrialModalButton>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center font-display font-bold text-xs uppercase tracking-wider bg-white border border-[#1C8DC8]/30 hover:border-[#1C8DC8] text-[#0B3951] hover:text-[#1C8DC8] py-4 px-6 rounded-xl transition-all shadow-sm"
          >
            <span>View Pricing Plans (CAD)</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </section>

      {/* CANADIAN HIGHLIGHTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-[#F0F9FF] text-[#1C8DC8] flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              Coast-to-Coast Timezones
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Serving Muslim families across Ontario, Quebec, Alberta, British Columbia, and Manitoba with perfectly synchronized slots.
            </p>
          </div>

          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-[#F0F9FF] text-[#1C8DC8] flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              Winter-Safe Learning
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Skip icy highways, blizzards, and freezing parking lots. Your child learns with a dedicated scholar in the comfort of home.
            </p>
          </div>

          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-[#F0F9FF] text-[#1C8DC8] flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              Certified Female Faculty
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Canadian mothers frequently request our dedicated female teachers for young kids and teenage daughters with complete comfort.
            </p>
          </div>
        </div>
      </section>

      {/* CANADIAN FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="text-center mb-10">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
            Frequently Asked Questions for Canadian Families
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Are class timings coordinated across Canadian time zones?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes! We support all Canadian time zones—from Eastern Time (Ontario & Quebec) to Mountain Time (Alberta) and Pacific Time (British Columbia). Pick after-school or weekend slots that fit your family routine.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Why do Canadian parents prefer online Quran classes over in-person driving?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Canadian winters make traveling in snow and sub-zero temperatures hazardous and stressful. Online 1-on-1 learning allows your child to learn safely, warmly, and consistently at home without missed sessions.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Can we pay in Canadian Dollars (CAD)?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes! We support Canadian debit and credit cards, and your bank will convert cleanly into CAD with no surprise international fees.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Do you offer flexibility during Canadian school winter and March breaks?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes. You can easily pause, rearrange, or adjust schedules during March break or winter holidays by notifying your coordinator.
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-xl p-8 sm:p-12 shadow-sm">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] mb-3">
            Start Your Free 3-Day Trial in Canada
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mb-6">
            Join hundreds of Canadian Muslim families learning with Quran Academee from the warm comfort of home.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <TrialModalButton
              courseName="Canada Quran Classes"
              className="py-3.5 px-8 rounded-xl font-bold"
            >
              <span>Book 3-Day Free Trial</span>
            </TrialModalButton>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center font-display font-bold text-xs uppercase tracking-wider bg-white border border-[#1C8DC8]/30 hover:border-[#1C8DC8] text-[#0B3951] hover:text-[#1C8DC8] py-3.5 px-6 rounded-xl transition-all shadow-sm"
            >
              <span>View Tuition Plans (CAD)</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
