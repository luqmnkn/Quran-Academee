import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  Award,
  ShieldCheck,
  Users,
  Globe,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import TrialModalButton from '@/components/TrialModalButton';
import TeamMarquee from '@/components/TeamMarquee';
import { TEACHERS } from '@/lib/teachersData';

export const metadata: Metadata = {
  title: 'Our Certified Quran Teachers & Scholars | Quran Academee',
  description:
    'Meet verified online Quran teachers at Quran Academee. Certified scholars, Huffaz, and Tajweed educators fluent in English with child-centered pedagogy.',
  alternates: {
    canonical: 'https://www.quranacademee.com/teachers',
  },
  openGraph: {
    title: 'Our Certified Quran Teachers & Scholars | Quran Academee',
    description:
      'Meet verified online Quran teachers at Quran Academee. Certified scholars, Huffaz, and Tajweed educators fluent in English with child-centered pedagogy.',
    url: 'https://www.quranacademee.com/teachers',
    siteName: 'Quran Academee',
    images: [
      {
        url: '/images/link.png',
        width: 1200,
        height: 630,
        alt: 'Quran Academee Faculty and Teachers',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function TeachersPage() {
  const teacherSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Quran Academee Certified Faculty',
    description: 'Verified online Quran scholars, Huffaz, and Tajweed educators.',
    itemListElement: TEACHERS.map((teacher, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: teacher.name,
        jobTitle: teacher.title,
        description: teacher.bio,
        image: `https://www.quranacademee.com${teacher.image}`,
        knowsLanguage: teacher.languages,
        worksFor: {
          '@type': 'EducationalOrganization',
          name: 'Quran Academee',
          url: 'https://www.quranacademee.com',
        },
      },
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
        name: 'Teachers',
        item: 'https://www.quranacademee.com/teachers',
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50/50 text-[#0B3951] pt-24 sm:pt-28 pb-20 relative overflow-hidden">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teacherSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Background Glow Accents */}
      <div className="absolute top-0 right-1/4 w-[650px] h-[650px] bg-[#1C8DC8]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[550px] h-[550px] bg-[#116c9c]/5 blur-[140px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 sm:mb-20">
        <h1 className="font-display font-[900] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0B3951] tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
          Meet Our Certified{' '}
          <span className="font-allura inline-block py-1 text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">
            Quran Teachers & Scholars
          </span>
        </h1>

        <p className="font-sans text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Every tutor at Quran Academee is a verified graduate holding formal Islamic institution credentials and pedagogical training, dedicated to patient and inspiring 1-on-1 mentorship.
        </p>

        {/* 4 Trust Signals Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="bg-white border border-sky-100/90 p-3.5 text-center shadow-sm rounded-xl">
            <Award className="w-5 h-5 text-[#1C8DC8] mx-auto mb-1" />
            <span className="block text-xs font-bold text-[#0B3951]">Verified Scholars</span>
            <span className="text-[11px] text-slate-500">Certified Faculty</span>
          </div>

          <div className="bg-white border border-sky-100/90 p-3.5 text-center shadow-sm rounded-xl">
            <Users className="w-5 h-5 text-[#1C8DC8] mx-auto mb-1" />
            <span className="block text-xs font-bold text-[#0B3951]">Dedicated Faculty</span>
            <span className="text-[11px] text-slate-500">1-on-1 Mentorship</span>
          </div>

          <div className="bg-white border border-sky-100/90 p-3.5 text-center shadow-sm rounded-xl">
            <Globe className="w-5 h-5 text-[#1C8DC8] mx-auto mb-1" />
            <span className="block text-xs font-bold text-[#0B3951]">Fluent English</span>
            <span className="text-[11px] text-slate-500">Clear communication</span>
          </div>

          <div className="bg-white border border-sky-100/90 p-3.5 text-center shadow-sm rounded-xl">
            <ShieldCheck className="w-5 h-5 text-[#1C8DC8] mx-auto mb-1" />
            <span className="block text-xs font-bold text-[#0B3951]">Background Checked</span>
            <span className="text-[11px] text-slate-500">Child-safe online policy</span>
          </div>
        </div>
      </section>

      {/* TEACHER VETTING & STANDARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-sky-100 p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl mx-auto text-center mb-10 space-y-3">
            <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
              How We Select and Train Our Scholars
            </h2>
            <p className="text-sm text-slate-600">
              Our 5-stage qualification process ensures only the most knowledgeable, patient, and engaging educators teach your family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
              <span className="w-8 h-8 rounded-lg bg-[#1C8DC8] text-white flex items-center justify-center font-black text-xs mx-auto mb-2">
                1
              </span>
              <h3 className="font-display font-bold text-xs text-[#0B3951] mb-1">
                Degree Verification
              </h3>
              <p className="text-[11px] text-slate-500">
                Auditing Diplomas, Thanawiyyah & Hifz certifications.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
              <span className="w-8 h-8 rounded-lg bg-[#1C8DC8] text-white flex items-center justify-center font-black text-xs mx-auto mb-2">
                2
              </span>
              <h3 className="font-display font-bold text-xs text-[#0B3951] mb-1">
                Tajweed Audition
              </h3>
              <p className="text-[11px] text-slate-500">
                Live recitation evaluation under senior scholars.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
              <span className="w-8 h-8 rounded-lg bg-[#1C8DC8] text-white flex items-center justify-center font-black text-xs mx-auto mb-2">
                3
              </span>
              <h3 className="font-display font-bold text-xs text-[#0B3951] mb-1">
                English Fluency
              </h3>
              <p className="text-[11px] text-slate-500">
                Verifying articulate communication for Western students.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
              <span className="w-8 h-8 rounded-lg bg-[#1C8DC8] text-white flex items-center justify-center font-black text-xs mx-auto mb-2">
                4
              </span>
              <h3 className="font-display font-bold text-xs text-[#0B3951] mb-1">
                Child Pedagogy
              </h3>
              <p className="text-[11px] text-slate-500">
                Training in patience, digital tools, and active engagement.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
              <span className="w-8 h-8 rounded-lg bg-[#0B3951] text-white flex items-center justify-center font-black text-xs mx-auto mb-2">
                5
              </span>
              <h3 className="font-display font-bold text-xs text-[#0B3951] mb-1">
                Continuous Audits
              </h3>
              <p className="text-[11px] text-slate-500">
                Regular supervised session reviews for quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTINUOUS MARQUEE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-24">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#1C8DC8] bg-sky-50 px-3 py-1 rounded-full border border-sky-100 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Faculty Roster</span>
          </div>
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
            Meet Our Dedicated Teaching Team
          </h2>
        </div>

        <TeamMarquee />
      </section>

      {/* DETAILED TEACHER PROFILES SECTION (BIG CARDS: PIC, NAME, DESCRIPTION ONLY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
            Our Certified Instructors
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Meet our dedicated scholars and educators bringing authentic Quranic learning and Tajweed to students worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEACHERS.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-3xl border border-sky-100 p-8 sm:p-10 shadow-[0_4px_24px_rgba(15,23,42,0.04)] text-center flex flex-col items-center justify-start select-text"
            >
              {/* Bigger Teacher Photo */}
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-2 border-sky-200/90 shadow-md mb-6 bg-slate-100 shrink-0">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  width={208}
                  height={208}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Teacher Name */}
              <h3 className="font-display font-[800] text-2xl text-[#0B3951] mb-4">
                {teacher.name}
              </h3>

              {/* Teacher Description: Just a clean paragraph, no points, no icons */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans text-center">
                {teacher.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#F0F9FF] border border-sky-200/60 p-8 sm:p-12 shadow-sm rounded-2xl">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] mb-3">
            Learn with a Teacher Who Inspires Your Child
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mb-6">
            Get matched with our certified educators for a 3-day free trial. If you ever feel another tutor would be a better fit, we switch teachers immediately with zero hassle.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <TrialModalButton className="py-3.5 px-8 rounded-xl font-bold">
              <span>Book 3-Day Free Trial</span>
            </TrialModalButton>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center font-display font-bold text-xs uppercase tracking-wider bg-white border border-[#1C8DC8]/30 hover:border-[#1C8DC8] text-[#0B3951] hover:text-[#1C8DC8] py-3.5 px-6 rounded-xl transition-all shadow-sm"
            >
              <span>View Pricing Plans</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
