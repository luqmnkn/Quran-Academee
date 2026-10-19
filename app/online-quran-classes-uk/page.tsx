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
  title: 'Online Quran Classes UK | 1-on-1 Lessons in British Time | Quran Academee',
  description:
    'Certified 1-on-1 online Quran classes for UK kids and adults. Convenient GMT/BST timings (4pm-8pm), certified male & female scholars, from £28/month. Book a 3-day free trial.',
  alternates: {
    canonical: 'https://www.quranacademee.com/online-quran-classes-uk',
  },
  openGraph: {
    title: 'Online Quran Classes UK | 1-on-1 Lessons in British Time | Quran Academee',
    description:
      'Certified 1-on-1 online Quran classes for UK kids and adults. Convenient GMT/BST timings (4pm-8pm), certified male & female scholars, from £28/month. Book a 3-day free trial.',
    url: 'https://www.quranacademee.com/online-quran-classes-uk',
    siteName: 'Quran Academee',
    images: [
      {
        url: '/images/link.png',
        width: 1200,
        height: 630,
        alt: 'Online Quran Classes in the UK',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
};

export default function OnlineQuranClassesUKPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Online Quran Classes UK',
    description:
      'Live 1-on-1 online Quran tutoring across London, Birmingham, Manchester, and the UK. British GMT/BST schedule, certified male and female scholars, and Tajweed mastery.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Quran Academee',
      sameAs: 'https://www.quranacademee.com',
    },
    offers: {
      '@type': 'Offer',
      price: '28.00',
      priceCurrency: 'GBP',
      category: 'UK Online Quran Classes',
      availability: 'https://schema.org/InStock',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are class timings coordinated with UK school hours (GMT/BST)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We offer dedicated UK slots between 4:00 PM and 8:30 PM on weekdays, as well as morning and afternoon slots on Saturdays and Sundays to seamlessly fit British school schedules.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can we pay tuition in British Pounds (GBP)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We accept direct payments in GBP via UK debit/credit cards or secure international bank transfers without foreign transaction surcharges.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you ensure child safety during online sessions in the UK?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All instructors undergo rigorous identity verification, background vetting, and child-safe online conduct training aligned with UK safeguarding expectations. Parents can monitor classes anytime.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer classes during UK half-term and summer holidays?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our classes run year-round with total schedule flexibility. You can pause, adjust, or reschedule lessons during UK school holidays without penalty.',
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
        name: 'UK Classes',
        item: 'https://www.quranacademee.com/online-quran-classes-uk',
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
            United Kingdom
          </span>
        </h1>

        {/* 40-60 WORD ANSWER-FIRST SUMMARY BOX */}
        <div className="bg-white border border-sky-200/90 rounded-xl p-6 sm:p-8 shadow-sm text-left mb-8 max-w-3xl mx-auto">
          <span className="text-[11px] font-bold text-[#0284C7] uppercase tracking-wider block mb-2 font-mono">
            Overview for UK Families
          </span>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            Online Quran classes in the UK provide British Muslim families with certified 1-on-1 tutoring scheduled conveniently in GMT/BST timezones (4:00 PM – 8:30 PM). With verified male and female scholars, students master Madani Qaida, Tajweed, and Hifz from home starting from £28/month. Book your complimentary 3-day trial class today.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <TrialModalButton
            courseName="UK Online Quran Classes"
            className="py-4 px-8 rounded-xl font-bold shadow-md"
          >
            <span>Book 3-Day Free Trial (UK GMT/BST)</span>
          </TrialModalButton>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center font-display font-bold text-xs uppercase tracking-wider bg-white border border-[#1C8DC8]/30 hover:border-[#1C8DC8] text-[#0B3951] hover:text-[#1C8DC8] py-4 px-6 rounded-xl transition-all shadow-sm"
          >
            <span>View UK Tuition Plans (£)</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </section>

      {/* UK HIGHLIGHTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-[#F0F9FF] text-[#1C8DC8] flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              GMT & BST Timezone Slots
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prime after-school slots (4:00pm - 8:30pm) and weekend morning slots designed specifically for UK children and working adults.
            </p>
          </div>

          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-[#F0F9FF] text-[#1C8DC8] flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              British Cultural Fluency
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our instructors speak fluent, articulate English and relate naturally to young Muslims growing up in British society.
            </p>
          </div>

          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-[#F0F9FF] text-[#1C8DC8] flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              Fair Pricing from £28/Month
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Significantly more affordable than UK private in-person tutors (£20-£30/hour), with superior 1-on-1 scholarly rigor.
            </p>
          </div>
        </div>
      </section>

      {/* UK FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="text-center mb-10">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
            Frequently Asked Questions for UK Families
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Are class timings coordinated with UK school hours (GMT/BST)?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes! We offer dedicated UK slots between 4:00 PM and 8:30 PM on weekdays, as well as morning and afternoon slots on Saturdays and Sundays to seamlessly fit British school schedules.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Can we pay tuition in British Pounds (GBP)?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes. We accept direct payments in GBP via UK debit/credit cards or secure international bank transfers without foreign transaction surcharges.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              How do you ensure child safety during online sessions in the UK?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              All instructors undergo rigorous identity verification, background vetting, and child-safe online conduct training aligned with UK safeguarding expectations. Parents can monitor classes anytime.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Do you offer classes during UK half-term and summer holidays?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes, our classes run year-round with total schedule flexibility. You can pause, adjust, or reschedule lessons during UK school holidays without penalty.
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-xl p-8 sm:p-12 shadow-sm">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] mb-3">
            Start Your UK Free 3-Day Trial Today
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mb-6">
            Join hundreds of British Muslim families learning with Quran Academee across England, Scotland, Wales, and Northern Ireland.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <TrialModalButton
              courseName="UK Quran Classes"
              className="py-3.5 px-8 rounded-xl font-bold"
            >
              <span>Book 3-Day Free Trial</span>
            </TrialModalButton>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center font-display font-bold text-xs uppercase tracking-wider bg-white border border-[#1C8DC8]/30 hover:border-[#1C8DC8] text-[#0B3951] hover:text-[#1C8DC8] py-3.5 px-6 rounded-xl transition-all shadow-sm"
            >
              <span>View Tuition Plans (£)</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
