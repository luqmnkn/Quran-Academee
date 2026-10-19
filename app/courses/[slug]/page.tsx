import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  Check,
  ChevronRight,
  ShieldCheck,
  GraduationCap,
  DollarSign,
} from 'lucide-react';
import {
  COURSES_DATA,
  getAllCourses,
  getCourseBySlug,
  CourseDetail,
} from '@/lib/coursesData';
import TrialModalButton from '@/components/TrialModalButton';
import ThreeEasySteps from '@/components/ThreeEasySteps';
import CourseCtaCard from '@/components/CourseCtaCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all 7 core courses at build time (SSG/ISR)
export function generateStaticParams() {
  return COURSES_DATA.map((course) => ({
    slug: course.slug,
  }));
}

// Dynamic SEO metadata per course
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      title: 'Course Not Found | Quran Academee',
      description: 'The requested Quran course could not be found.',
    };
  }

  const canonicalUrl = `https://www.quranacademee.com/courses/${course.slug}`;

  return {
    title: course.metaTitle,
    description: course.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: course.metaTitle,
      description: course.metaDescription,
      url: canonicalUrl,
      siteName: 'Quran Academee',
      images: [
        {
          url: '/images/link.png',
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
  };
}

export default async function CourseDetailPage(props: PageProps) {
  const { slug } = await props.params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  // Schema.org Course + Offer Structured Data
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.answerFirstSummary,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Quran Academee',
      sameAs: 'https://www.quranacademee.com',
    },
    offers: {
      '@type': 'Offer',
      price: `${course.startingPrice}.00`,
      priceCurrency: 'USD',
      category: 'Online Quran Tuition',
      availability: 'https://schema.org/InStock',
      url: `https://www.quranacademee.com/courses/${course.slug}`,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: course.duration,
      instructor: {
        '@type': 'Person',
        name: 'Certified Male & Female Quran Scholars',
      },
    },
  };

  // Schema.org FAQPage Structured Data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: course.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // Schema.org BreadcrumbList Structured Data
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
        name: 'Courses',
        item: 'https://www.quranacademee.com/courses',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: course.title,
        item: `https://www.quranacademee.com/courses/${course.slug}`,
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
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-[#116c9c]/5 rounded-full blur-[140px] pointer-events-none" />



      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Arabic Calligraphy Header */}
          <div className="font-arabic text-3xl sm:text-4xl text-[#1C8DC8] mb-2 tracking-wide select-none">
            {course.arabicTitle}
          </div>

          {/* Course Name Bold Identifier */}
          <div className="font-display font-black text-base sm:text-lg text-[#1C8DC8] uppercase tracking-wider mb-2 font-bold">
            {course.title}
          </div>

          {/* Single Optimized H1 */}
          <h1 className="font-display font-black font-bold text-3xl sm:text-4xl md:text-5xl text-[#0B3951] tracking-tight leading-[1.15] mb-6">
            {course.h1.includes(':') ? (
              <>
                {course.h1.split(':')[0]}:{' '}
                <span className="font-allura inline-block py-1 text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">
                  {course.h1.split(':')[1]}
                </span>
              </>
            ) : course.h1.includes(' for ') ? (
              <>
                {course.h1.split(' for ')[0]} for{' '}
                <span className="font-allura inline-block py-1 text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">
                  {course.h1.split(' for ')[1]}
                </span>
              </>
            ) : (
              <span>{course.h1}</span>
            )}
          </h1>

          {/* 40-60 WORD ANSWER-FIRST INTRODUCTORY SUMMARY BOX */}
          <div className="bg-white border border-sky-200/90 rounded-xl p-6 sm:p-8 shadow-sm text-left mb-8 relative">
            <span className="text-[11px] font-bold text-[#0284C7] uppercase tracking-wider block mb-2 font-mono">
              Course Overview
            </span>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              {course.answerFirstSummary}
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <div className="bg-white border border-sky-100 rounded-xl p-4 text-center shadow-sm">
              <GraduationCap className="w-5 h-5 text-[#1C8DC8] mx-auto mb-1.5" />
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Class Level
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[#0B3951]">
                {course.level}
              </span>
            </div>
            <div className="bg-white border border-sky-100 rounded-xl p-4 text-center shadow-sm">
              <DollarSign className="w-5 h-5 text-[#1C8DC8] mx-auto mb-1.5" />
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Tuition Starting
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[#0B3951]">
                ${course.startingPrice} / month
              </span>
            </div>
            <div className="bg-white border border-sky-100 rounded-xl p-4 text-center shadow-sm">
              <ShieldCheck className="w-5 h-5 text-[#1C8DC8] mx-auto mb-1.5" />
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Trial Policy
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[#0284C7]">
                3-Day Free Trial
              </span>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <TrialModalButton
              courseName={course.title}
              className="py-4 px-8 rounded-xl font-bold shadow-md"
            >
              <span>Book 3-Day Free Trial</span>
            </TrialModalButton>
            <a
              href="#pricing-plans"
              className="inline-flex items-center justify-center font-display font-bold text-xs uppercase tracking-wider bg-white border border-[#1C8DC8]/30 hover:border-[#1C8DC8] text-[#0B3951] hover:text-[#1C8DC8] py-4 px-6 rounded-xl transition-all shadow-sm"
            >
              <span>View Pricing Plans</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* 3 EASY STEPS ONBOARDING (REPLACING HOW LEARNING WORKS) */}
      <div className="mb-20 sm:mb-28">
        <ThreeEasySteps />
      </div>



      {/* 6. TRANSPARENT PRICING PLANS TABLE */}
      <section
        id="pricing-plans"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28"
      >
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
            Transparent Pricing Plans for {course.shortTitle}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            All plans include a 3-day free trial class, certified 1-on-1 scholars, and no long-term contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {course.pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl p-7 border transition-all duration-300 flex flex-col justify-between relative ${
                plan.isPopular
                  ? 'border-[#1C8DC8] shadow-[0_8px_30px_rgba(28,141,200,0.12)] ring-1 ring-[#1C8DC8]'
                  : 'border-sky-100/90 shadow-sm hover:shadow-md'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1C8DC8] text-white font-display font-bold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-md shadow-sm">
                  Most Popular Choice
                </div>
              )}

              <div>
                <div className="mb-4">
                  <h3 className="font-display font-extrabold text-xl text-[#0B3951]">
                    {plan.name}
                  </h3>
                  <span className="text-xs text-slate-500">
                    {plan.weeklyClasses} Classes/Week • {plan.classDuration}
                  </span>
                </div>

                <div className="flex items-baseline space-x-2 mb-6">
                  <span className="text-4xl font-display font-black text-[#0B3951]">
                    ${plan.price}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 uppercase">
                    / Month
                  </span>
                  {plan.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      ${plan.originalPrice}
                    </span>
                  )}
                </div>

                <div className="space-y-2.5 border-t border-slate-100 pt-5 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-2 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-[#1C8DC8] shrink-0 mt-0.5" />
                      <span className="leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <TrialModalButton
                courseName={`${course.title} - ${plan.name} ($${plan.price}/mo)`}
                variant={plan.isPopular ? 'primary' : 'outline'}
                className="w-full py-3.5 px-4 rounded-xl text-center font-bold"
              >
                <span>Select {plan.name}</span>
              </TrialModalButton>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQS SECTION (SERVER-RENDERED FOR SEARCH ENGINES & LLMS) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="text-center mb-10">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
            Frequently Asked Questions: {course.shortTitle}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Answers to common questions about prerequisites, tutors, and learning expectations.
          </p>
        </div>

        <div className="space-y-4">
          {course.faqs.map((faq, fIdx) => (
            <div
              key={fIdx}
              className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm"
            >
              <h3 className="font-display font-bold text-sm sm:text-base text-[#0B3951] mb-2">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CTA CARD */}
      <CourseCtaCard courseName={course.title} className="mb-8" />
    </main>
  );
}
