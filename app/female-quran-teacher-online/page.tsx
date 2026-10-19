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
  GraduationCap,
  Lock,
} from 'lucide-react';
import TrialModalButton from '@/components/TrialModalButton';

export const metadata: Metadata = {
  title: 'Female Quran Teacher Online | Certified 1-on-1 Classes for Sisters & Kids',
  description:
    'Learn with verified female Quran teachers online. Certified Alimas & Hafizat providing private 1-on-1 Tajweed, Hifz, and Qaida classes for sisters and young children.',
  alternates: {
    canonical: 'https://www.quranacademee.com/female-quran-teacher-online',
  },
  openGraph: {
    title: 'Female Quran Teacher Online | Certified 1-on-1 Classes for Sisters & Kids',
    description:
      'Learn with verified female Quran teachers online. Certified Alimas & Hafizat providing private 1-on-1 Tajweed, Hifz, and Qaida classes for sisters and young children.',
    url: 'https://www.quranacademee.com/female-quran-teacher-online',
    siteName: 'Quran Academee',
    images: [
      {
        url: '/images/link.png',
        width: 1200,
        height: 630,
        alt: 'Female Quran Teacher Online',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function FemaleQuranTeacherPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Female Quran Teacher Online Classes',
    description:
      'Private 1-on-1 online Quran classes led exclusively by certified female scholars, Alimas, and Hafizat. Designed for sisters and young children.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Quran Academee',
      sameAs: 'https://www.quranacademee.com',
    },
    offers: {
      '@type': 'Offer',
      price: '35.00',
      priceCurrency: 'USD',
      category: 'Female Scholar Quran Tuition',
      availability: 'https://schema.org/InStock',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are all classes conducted with complete privacy and comfort for sisters?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100%. All classes are strictly 1-on-1 with a verified female scholar. Sisters can keep their video cameras off or on based on personal preference without any pressure.',
        },
      },
      {
        '@type': 'Question',
        name: 'What qualifications do your female Quran teachers possess?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our female faculty members hold official Shahadat-ul-Alamiya degrees, Hifz certificates, and certified Tajweed qualifications. They are fluent in English and trained in compassionate pedagogy.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can female teachers instruct young boys as well?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our female teachers frequently teach young boys up to 10-12 years old, as their gentle, nurturing approach is particularly effective during early Madani Qaida and reading stages.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I communicate directly with the teacher regarding progress?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Mothers and adult sisters have direct communication channels with their female scholars via WhatsApp and receive formal monthly evaluation summaries.',
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
        name: 'Female Quran Teachers',
        item: 'https://www.quranacademee.com/female-quran-teacher-online',
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
          Online Quran Classes with{' '}
          <span className="font-allura inline-block py-1 text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">
            Female Quran Teachers
          </span>
        </h1>

        {/* 40-60 WORD ANSWER-FIRST SUMMARY BOX */}
        <div className="bg-white border border-rose-200/90 rounded-xl p-6 sm:p-8 shadow-sm text-left mb-8 max-w-3xl mx-auto">
          <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block mb-2 font-mono">
            Overview for Sisters & Mothers
          </span>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            Learn with certified female Quran teachers online in a private, supportive setting. Tailored exclusively for sisters and young children, our verified female scholars and Hafizat provide live 1-on-1 instruction across Madani Qaida, Tajweed recitation, and Hifz memorization with complete comfort. Book your complimentary 3-day trial class today.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <TrialModalButton
            courseName="Female Quran Teacher Classes"
            className="py-4 px-8 rounded-xl font-bold shadow-md"
          >
            <span>Request Female Teacher (3-Day Free Trial)</span>
          </TrialModalButton>
          <Link
            href="/teachers"
            className="inline-flex items-center justify-center font-display font-bold text-xs uppercase tracking-wider bg-white border border-[#1C8DC8]/30 hover:border-[#1C8DC8] text-[#0B3951] hover:text-[#1C8DC8] py-4 px-6 rounded-xl transition-all shadow-sm"
          >
            <span>View Female Teacher Profiles</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </section>

      {/* CORE BENEFITS FOR SISTERS & MOTHERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
            Why Sisters and Mothers Choose Our Female Faculty
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              Complete Modesty & Privacy
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Total comfort in your home. No camera requirements, 100% sister-only classrooms, and total peace of mind for you and your daughters.
            </p>
          </div>

          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              Certified Alimas & Hafizat
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our female educators hold verified degrees in Islamic Studies, certified Tajweed credentials, and extensive teaching experience with young kids.
            </p>
          </div>

          <div className="bg-white rounded-xl p-7 border border-sky-100/90 shadow-sm text-center">
            <div className="w-12 h-12 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B3951] mb-2">
              Gentle, Child-Loving Approach
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Young children quickly build a loving bond with our female tutors, turning Quran class into an inspiring part of their daily routine.
            </p>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="text-center mb-10">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
            Frequently Asked Questions for Sisters and Mothers
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Are all classes conducted with complete privacy and comfort for sisters?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes, 100%. All classes are strictly 1-on-1 with a verified female scholar. Sisters can keep their video cameras off or on based on personal preference without any pressure.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              What qualifications do your female Quran teachers possess?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our female faculty members hold official Shahadat-ul-Alamiya degrees, Hifz certificates, and certified Tajweed qualifications. They are fluent in English and trained in compassionate pedagogy.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Can female teachers instruct young boys as well?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes. Our female teachers frequently teach young boys up to 10-12 years old, as their gentle, nurturing approach is particularly effective during early Madani Qaida and reading stages.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
              Can I communicate directly with the teacher regarding progress?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes. Mothers and adult sisters have direct communication channels with their female scholars via WhatsApp and receive formal monthly evaluation summaries.
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-xl p-8 sm:p-12 shadow-sm">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] mb-3">
            Start Learning with a Dedicated Female Quran Scholar
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mb-6">
            Book your 3-day free trial class today. Enjoy personalized 1-on-1 lessons in complete comfort and privacy with zero obligation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <TrialModalButton
              courseName="Female Teacher Classes"
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
