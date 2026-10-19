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
  GraduationCap,
  Lock,
} from 'lucide-react';
import TrialModalButton from '@/components/TrialModalButton';

export const metadata: Metadata = {
  title: 'Learn Quran Online for Adults | Private 1-on-1 Classes | Quran Academee',
  description:
    'Private, judgment-free online Quran classes for adults. Learn Tajweed, reading, and Quranic Arabic at your own pace with certified scholars. 24/7 flexible hours.',
  alternates: {
    canonical: 'https://www.quranacademee.com/learn-quran-online-for-adults',
  },
  openGraph: {
    title: 'Learn Quran Online for Adults | Private 1-on-1 Classes | Quran Academee',
    description:
      'Private, judgment-free online Quran classes for adults. Learn Tajweed, reading, and Quranic Arabic at your own pace with certified scholars. 24/7 flexible hours.',
    url: 'https://www.quranacademee.com/learn-quran-online-for-adults',
    siteName: 'Quran Academee',
    images: [
      {
        url: '/images/link.png',
        width: 1200,
        height: 630,
        alt: 'Learn Quran Online for Adults',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function LearnQuranForAdultsPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Learn Quran Online for Adults',
    description:
      'Private, judgment-free 1-on-1 online Quran classes tailored for adult beginners, professionals, and reverts. Master Tajweed, reading fluency, and Quranic Arabic.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Quran Academee',
      sameAs: 'https://www.quranacademee.com',
    },
    offers: {
      '@type': 'Offer',
      price: '35.00',
      priceCurrency: 'USD',
      category: 'Adult Online Quran Tuition',
      availability: 'https://schema.org/InStock',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is it too late for an adult to learn Quran from the beginning?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It is never too late! Many of our most successful adult students started from zero Arabic knowledge in their 30s, 50s, or 60s. The Prophet ﷺ praised those who struggle to recite, noting they receive double the reward.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are classes completely private and judgment-free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Every session is 100% private 1-on-1 with your dedicated scholar. There are no other students watching, ensuring complete comfort, confidentiality, and peace of mind.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I balance lessons with a demanding full-time job or shift work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our global faculty operates 24 hours a day, 7 days a week. You can book classes early morning before work, late evening after family dinner, or on weekends, with easy rescheduling.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can adult sisters learn with female Quran scholars?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We have an extensive roster of certified female scholars and Alimas, providing complete privacy and comfort for sisters.',
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
        name: 'Classes for Adults',
        item: 'https://www.quranacademee.com/learn-quran-online-for-adults',
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
          Learn Quran Online for{' '}
          <span className="font-allura inline-block py-1 text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">
            Adults & Beginners
          </span>
        </h1>

        {/* 40-60 WORD ANSWER-FIRST SUMMARY BOX */}
        <div className="bg-white border border-sky-200/90 rounded-xl p-6 sm:p-8 shadow-sm text-left mb-8 max-w-3xl mx-auto">
          <span className="text-[11px] font-bold text-[#0284C7] uppercase tracking-wider block mb-2 font-mono">
            Overview for Adults
          </span>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            Learn Quran online for adults through private, judgment-free 1-on-1 instruction tailored to busy schedules. Guided by certified male and female scholars, adult beginners and reverts master Tajweed phonetics, fluent Mushaf reading, and Quranic Arabic translation at their personal pace. Flexible 24/7 hours with a 3-day free trial.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <TrialModalButton
            courseName="Learn Quran Online for Adults"
            className="py-4 px-8 rounded-xl font-bold shadow-md"
          >
            <span>Book 3-Day Free Trial for Adults</span>
          </TrialModalButton>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center font-display font-bold text-xs uppercase tracking-wider bg-white border border-[#1C8DC8]/30 hover:border-[#1C8DC8] text-[#0B3951] hover:text-[#1C8DC8] py-4 px-6 rounded-xl transition-all shadow-sm"
          >
            <span>View Flexible Tuition Plans</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </section>

      {/* TAILORED ADULT LEARNING PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
            Why Adults Flourish with Our Methodology
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Adult learners require respectful communication, schedule autonomy, and mature pedagogical pacing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-[#F0F9FF] text-[#1C8DC8] flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              Complete Privacy
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No awkward group classes or being tested in front of others. Learn privately in your home with an understanding, dignified scholar.
            </p>
          </div>

          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-[#F0F9FF] text-[#1C8DC8] flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              24/7 Schedule Autonomy
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Schedule sessions around morning routines, lunch breaks, or evening family quiet time. Need to reschedule a busy day? Do it easily.
            </p>
          </div>

          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-[#F0F9FF] text-[#1C8DC8] flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              Beyond Pronunciation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Adults want to understand what they recite. We incorporate word-for-word translation, Quranic Arabic grammar, and real-life reflection.
            </p>
          </div>
        </div>
      </section>

      {/* ADULT COURSE TRACKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="bg-gradient-to-br from-[#0B3951] via-[#0D4B6C] to-[#146299] rounded-xl p-8 sm:p-12 text-white shadow-lg relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-300">
              Personalized Programs
            </span>
            <h2 className="font-display font-[900] text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mt-2">
              Select Your Adult Learning Track
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/15">
              <span className="text-sky-300 font-display font-black text-xs block mb-1">
                TRACK 1
              </span>
              <h3 className="font-display font-bold text-base text-white mb-2">
                Absolute Beginners
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                For reverts or adults starting from zero. Learn Arabic alphabet recognition, Makharij rules, and basic reading without embarrassment.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/15">
              <span className="text-sky-300 font-display font-black text-xs block mb-1">
                TRACK 2
              </span>
              <h3 className="font-display font-bold text-base text-white mb-2">
                Tajweed Remediation
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Already read but suspect pronunciation mistakes? We fix deeply rooted phonetic habits and instill classical recitation rules.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/15">
              <span className="text-sky-300 font-display font-black text-xs block mb-1">
                TRACK 3
              </span>
              <h3 className="font-display font-bold text-base text-white mb-2">
                Quranic Arabic
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Learn high-frequency root words and essential syntax (Nahw & Sarf) to comprehend verses directly during Salah.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/15">
              <span className="text-sky-300 font-display font-black text-xs block mb-1">
                TRACK 4
              </span>
              <h3 className="font-display font-bold text-base text-white mb-2">
                Adult Memorization
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Targeted Hifz of Surah Al-Mulk, Surah Al-Kahf, Juz Amma, or the full Quran with systematic long-term retention routines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ADULT FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="text-center mb-10">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
            Frequently Asked Questions by Adult Learners
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Is it too late for an adult to learn Quran from the beginning?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              It is never too late! Many of our most successful adult students started from zero Arabic knowledge in their 30s, 50s, or 60s. The Prophet ﷺ praised those who struggle to recite, noting they receive double the reward.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Are classes completely private and judgment-free?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes. Every session is 100% private 1-on-1 with your dedicated scholar. There are no other students watching, ensuring complete comfort, confidentiality, and peace of mind.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              How do I balance lessons with a demanding full-time job or shift work?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our global faculty operates 24 hours a day, 7 days a week. You can book classes early morning before work, late evening after family dinner, or on weekends, with easy rescheduling.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Can adult sisters learn with female Quran scholars?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes! We have an extensive roster of certified female scholars and Alimas, providing complete privacy and comfort for sisters.
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-xl p-8 sm:p-12 shadow-sm">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] mb-3">
            Begin Your Sacred Journey with Zero Embarrassment
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mb-6">
            Book your 3-day free trial session today. Meet a patient, certified scholar who will meet you exactly where you are and outline a realistic, motivating roadmap.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <TrialModalButton
              courseName="Adult Quran Classes"
              className="py-3.5 px-8 rounded-xl font-bold"
            >
              <span>Book 3-Day Free Trial</span>
            </TrialModalButton>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center font-display font-bold text-xs uppercase tracking-wider bg-white border border-[#1C8DC8]/30 hover:border-[#1C8DC8] text-[#0B3951] hover:text-[#1C8DC8] py-3.5 px-6 rounded-xl transition-all shadow-sm"
            >
              <span>View Adult Pricing Plans</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
