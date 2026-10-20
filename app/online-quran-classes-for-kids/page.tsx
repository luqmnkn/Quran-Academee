import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Award,
  CheckCircle,
  Users,
  Clock,
  ShieldCheck,
  Heart,
  BookOpen,
  Calendar,
  HelpCircle,
  ChevronRight,
  Smile,
  GraduationCap,
} from 'lucide-react';
import TrialModalButton from '@/components/TrialModalButton';

export const metadata: Metadata = {
  title: 'Online Quran Classes for Kids | Fun & Certified 1-on-1 Lessons',
  description:
    'Interactive online Quran classes for kids aged 4-15. Learn Madani Qaida, Tajweed, and Hifz with patient, background-checked male & female tutors. Book a 3-day free trial.',
  alternates: {
    canonical: 'https://www.quranacademee.com/online-quran-classes-for-kids',
  },
  openGraph: {
    title: 'Online Quran Classes for Kids | Fun & Certified 1-on-1 Lessons',
    description:
      'Interactive online Quran classes for kids aged 4-15. Learn Madani Qaida, Tajweed, and Hifz with patient, background-checked male & female tutors. Book a 3-day free trial.',
    url: 'https://www.quranacademee.com/online-quran-classes-for-kids',
    siteName: 'Quran Academee',
    images: [
      {
        url: '/images/link.png',
        width: 1200,
        height: 630,
        alt: 'Online Quran Classes for Kids',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function QuranClassesForKidsPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Online Quran Classes for Kids',
    description:
      'Interactive, child-friendly online Quran classes designed for children aged 4 to 15. Covers Madani Qaida, Tajweed, memorization, and daily Islamic manners with certified tutors.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Quran Academee',
      sameAs: 'https://www.quranacademee.com',
    },
    offers: {
      '@type': 'Offer',
      price: '35.00',
      priceCurrency: 'USD',
      category: 'Kids Online Quran Tuition',
      availability: 'https://schema.org/InStock',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best age for my child to begin online Quran classes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Children can start as early as 4 to 5 years old with our introductory Madani Qaida program. Lessons for younger kids are structured in 30-minute interactive blocks with digital games and colorful visual slides to keep them joyful and engaged.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I request a female Quran teacher for my child?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We have an experienced roster of certified female scholars who specialize in early childhood Quran education. You can easily specify female teacher preference during registration.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do parents need to sit beside the child during every lesson?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For kids aged 4-6, we recommend a parent stays nearby during the first 1-2 classes to help with headphones and setup. Once the child is comfortable with their tutor, our teachers manage the full session independently.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you prevent screen fatigue during online classes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our lessons are capped at 30 minutes, featuring interactive letter tracing, reward badges, and vocal repetition drills that prevent passive screen fatigue and maintain high enthusiasm.',
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
        name: 'Classes for Kids',
        item: 'https://www.quranacademee.com/online-quran-classes-for-kids',
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
          Online Quran Classes for{' '}
          <span className="font-allura inline-block py-1 text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">
            Kids & Children
          </span>
        </h1>

        {/* 40-60 WORD ANSWER-FIRST SUMMARY BOX */}
        <div className="bg-white border border-sky-200/90 rounded-xl p-6 sm:p-8 shadow-sm text-left mb-8 max-w-3xl mx-auto">
          <span className="text-[11px] font-bold text-[#0284C7] uppercase tracking-wider block mb-2 font-mono">
            Overview for Parents
          </span>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            Online Quran classes for kids provide interactive, child-safe 1-on-1 lessons designed to make Arabic reading and Tajweed enjoyable. Guided by patient, background-checked male and female scholars, children master foundational phonetics, Quran recitation, and daily Islamic manners without screen fatigue. Start with a complimentary 3-day free trial.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <TrialModalButton
            courseName="Online Quran Classes for Kids"
            className="py-4 px-8 rounded-xl font-bold shadow-md"
          >
            <span>Book 3-Day Free Trial for Kids</span>
          </TrialModalButton>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center font-display font-bold text-xs uppercase tracking-wider bg-white border border-[#1C8DC8]/30 hover:border-[#1C8DC8] text-[#0B3951] hover:text-[#1C8DC8] py-4 px-6 rounded-xl transition-all shadow-sm"
          >
            <span>View Family Pricing Plans</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </section>

      {/* WHY PARENTS TRUST QURAN ACADEMEE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
            Why Parents Choose Our Kids Quran Program
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            We understand the challenges of raising confident Muslim children in the West.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-[#F0F9FF] text-[#1C8DC8] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              Gentle, Patient Teaching
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No harsh reprimands or rigid rote drills. Our tutors specialize in positive reinforcement, celebratory badges, and playful encouragement.
            </p>
          </div>

          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-[#F0F9FF] text-[#1C8DC8] flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              Dedicated Female Teachers
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Young children and daughters often thrive best with nurturing female scholars. You can request a qualified sister with zero extra fee.
            </p>
          </div>

          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-[#F0F9FF] text-[#1C8DC8] flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              Monthly Progress Report Cards
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Stay fully informed with monthly evaluation audits detailing mastered Makharij rules, Surah memorization, and teacher notes sent to your WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* LEARNING ROADMAP FOR KIDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="bg-gradient-to-br from-[#0B3951] via-[#0D4B6C] to-[#146299] rounded-xl p-8 sm:p-12 text-white shadow-lg relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-300">
              Structured Milestones
            </span>
            <h2 className="font-display font-[900] text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mt-2">
              The Child’s Quranic Growth Pathway
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/15">
              <span className="text-sky-300 font-display font-black text-xs block mb-1">
                STAGE 1
              </span>
              <h3 className="font-display font-bold text-base text-white mb-2">
                Madani Qaida Basics
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Letter shapes, vowel marks (Harakat), joint letters, and correct mouth articulation.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/15">
              <span className="text-sky-300 font-display font-black text-xs block mb-1">
                STAGE 2
              </span>
              <h3 className="font-display font-bold text-base text-white mb-2">
                Quran Recitation
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Reading directly from Juz Amma, applying stop signs, and achieving fluent verse flow.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/15">
              <span className="text-sky-300 font-display font-black text-xs block mb-1">
                STAGE 3
              </span>
              <h3 className="font-display font-bold text-base text-white mb-2">
                Tajweed & Melodic Art
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Noon Sakinah, Ghunnah, and Madd rules practiced until pronunciation is pure and melodic.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/15">
              <span className="text-sky-300 font-display font-black text-xs block mb-1">
                STAGE 4
              </span>
              <h3 className="font-display font-bold text-base text-white mb-2">
                Hifz & Character
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Memorizing daily Surahs, Salah prayers, Masnoon duas, and loving Islamic manners (Akhlaq).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="text-center mb-10">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
            Frequently Asked Questions for Parents
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              What is the best age for my child to begin online Quran classes?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Children can start as early as 4 to 5 years old with our introductory Madani Qaida program. Lessons for younger kids are structured in 30-minute interactive blocks with digital games and colorful visual slides to keep them joyful and engaged.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Can I request a female Quran teacher for my child?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes! We have an experienced roster of certified female scholars who specialize in early childhood Quran education. You can easily specify female teacher preference during registration.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Do parents need to sit beside the child during every lesson?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              For kids aged 4-6, we recommend a parent stays nearby during the first 1-2 classes to help with headphones and setup. Once the child is comfortable with their tutor, our teachers manage the full session independently.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              How do you prevent screen fatigue during online classes?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our lessons are capped at 30 minutes, featuring interactive letter tracing, reward badges, and vocal repetition drills that prevent passive screen fatigue and maintain high enthusiasm.
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-xl p-8 sm:p-12 shadow-sm">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] mb-3">
            Inspire Your Child’s Love for the Holy Quran
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mb-6">
            Book a 3-day free trial today. Watch how quickly your child bonds with a certified tutor in a fun, positive learning atmosphere.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <TrialModalButton
              courseName="Kids Quran Classes"
              className="py-3.5 px-8 rounded-xl font-bold"
            >
              <span>Book 3-Day Free Trial</span>
            </TrialModalButton>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center font-display font-bold text-xs uppercase tracking-wider bg-white border border-[#1C8DC8]/30 hover:border-[#1C8DC8] text-[#0B3951] hover:text-[#1C8DC8] py-3.5 px-6 rounded-xl transition-all shadow-sm"
            >
              <span>View Tuition Plans</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
