import React from 'react';
import Link from 'next/link';
import { Award, Users, Clock, ShieldCheck } from 'lucide-react';
import { getAllCourses } from '@/lib/coursesData';
import ThreeEasySteps from '@/components/ThreeEasySteps';
import CoursesCarousel from '@/components/CoursesCarousel';
import CourseCtaCard from '@/components/CourseCtaCard';

export default function CoursesPage() {
  const courses = getAllCourses();

  // ItemList structured data schema for course hub
  const courseHubSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Quran Academee Online Quran Courses & Programs',
    description:
      'Comprehensive catalog of live 1-on-1 online Quran, Tajweed, Hifz, Islamic Studies, and Arabic courses for kids and adults worldwide.',
    numberOfItems: courses.length,
    itemListElement: courses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: course.title,
      url: `https://www.quranacademee.com/courses/${course.slug}`,
      description: course.answerFirstSummary,
    })),
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
        name: 'Courses',
        item: 'https://www.quranacademee.com/courses',
      },
    ],
  };

  const hubFaqs = [
    {
      question: 'How do 1-on-1 online Quran classes work?',
      answer:
        'Classes are conducted live over interactive digital classrooms (such as Zoom or Google Meet). Your dedicated teacher shares interactive digital Mushaf pages, monitors pronunciation in real time, and provides personalized corrections suited to your learning pace.',
    },
    {
      question: 'Can I choose between male and female Quran teachers?',
      answer:
        'Yes. We have certified male and female Quran teachers available 24/7. Sisters and young children can be paired with qualified female tutors upon request.',
    },
    {
      question: 'What happens during the 3-day free trial?',
      answer:
        'During the 3-day free trial, you or your child will attend real 1-on-1 classes with a certified tutor. The teacher assesses current recitation levels, tests pronunciation, and establishes a tailored learning plan—with zero financial commitment.',
    },
    {
      question: 'Are class timings flexible for students in different time zones?',
      answer:
        'Absolutely. Our tutors teach across US, Canadian, UK, European, Australian, and Gulf time zones. You choose the days and hours that fit your family schedule.',
    },
    {
      question: 'What is the starting tuition fee for courses?',
      answer:
        'Tuition begins at $35 per month for 2 classes per week (8 classes monthly). We offer flexible 2, 3, 4, and 5-day weekly plans with family discounts and no long-term contracts.',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50/50 text-[#0B3951] pt-24 sm:pt-28 pb-20 relative overflow-hidden">
      {/* Schema.org ItemList & Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseHubSchema) }}
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
        <h1 className="font-display font-[900] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0B3951] tracking-tight leading-[1.15] mb-6 max-w-4xl mx-auto">
          Online Quran Courses & Programs for{' '}
          <span className="font-allura inline-block py-1 text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">
            Kids & Adults
          </span>
        </h1>

        <p className="font-sans text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          From foundational Arabic letter phonetics in Madani Qaida to advanced Tajweed, full Quran memorization (Hifz), and Quranic Arabic. Learn live 1-on-1 with certified Quran scholars and educators from the comfort of your home.
        </p>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-2">
          <div className="bg-white border border-sky-100 rounded-xl p-3.5 text-center shadow-sm">
            <Users className="w-5 h-5 text-[#1C8DC8] mx-auto mb-1.5" />
            <span className="block text-xs font-bold text-[#0B3951]">1-on-1 Private Live</span>
            <span className="text-[11px] text-slate-500">Personalized pace</span>
          </div>
          <div className="bg-white border border-sky-100 rounded-xl p-3.5 text-center shadow-sm">
            <Award className="w-5 h-5 text-[#1C8DC8] mx-auto mb-1.5" />
            <span className="block text-xs font-bold text-[#0B3951]">Certified Scholars</span>
            <span className="text-[11px] text-slate-500">Male & female tutors</span>
          </div>
          <div className="bg-white border border-sky-100 rounded-xl p-3.5 text-center shadow-sm">
            <Clock className="w-5 h-5 text-[#1C8DC8] mx-auto mb-1.5" />
            <span className="block text-xs font-bold text-[#0B3951]">Flexible 24/7 Hours</span>
            <span className="text-[11px] text-slate-500">All global timezones</span>
          </div>
          <div className="bg-white border border-sky-100 rounded-xl p-3.5 text-center shadow-sm">
            <ShieldCheck className="w-5 h-5 text-[#1C8DC8] mx-auto mb-1.5" />
            <span className="block text-xs font-bold text-[#0B3951]">3-Day Free Trial</span>
            <span className="text-[11px] text-slate-500">No card required</span>
          </div>
        </div>
      </section>

      {/* COURSE CATALOG GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="text-center mb-12">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
            Explore Our Dedicated Quran Courses
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto">
            Choose a dedicated program tailored for your child or yourself. Every course includes structured milestones, custom schedules, and certified instruction.
          </p>
        </div>

        <CoursesCarousel courses={courses} />
      </section>

      {/* 3 EASY STEPS ONBOARDING (REPLACING HOW LEARNING WORKS) */}
      <div className="mb-20 sm:mb-28">
        <ThreeEasySteps />
      </div>

      {/* CTA CARD */}
      <CourseCtaCard className="mb-20 sm:mb-28" />

      {/* FAQ SECTION (SERVER-RENDERED FOR CRAWLERS) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="text-center mb-10">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
            Frequently Asked Questions About Our Online Quran Courses
          </h2>
        </div>

        <div className="space-y-4">
          {hubFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-sky-100/80 shadow-sm"
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
    </main>
  );
}
