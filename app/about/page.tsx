import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import TeamMarquee from '@/components/TeamMarquee';
import CourseCtaCard from '@/components/CourseCtaCard';

export const metadata: Metadata = {
  title: 'About Quran Academee | Story, Faculty & Scholarly Supervision',
  description:
    'Learn about Quran Academee, our Madinah University scholarly supervision under Sheikh Jawwad Musa, authentic 1-on-1 methodology, and certified faculty teaching worldwide.',
  alternates: {
    canonical: 'https://www.quranacademee.com/about',
  },
  openGraph: {
    title: 'About Quran Academee | Story, Faculty & Scholarly Supervision',
    description:
      'Learn about Quran Academee, our Madinah University scholarly supervision under Sheikh Jawwad Musa, authentic 1-on-1 methodology, and certified faculty teaching worldwide.',
    url: 'https://www.quranacademee.com/about',
    siteName: 'Quran Academee',
    images: [
      {
        url: '/images/link.png',
        width: 1200,
        height: 630,
        alt: 'About Quran Academee',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Quran Academee',
    description:
      'The story, scholarly leadership, and pedagogical methodology of Quran Academee, under the academic supervision of Sheikh Jawwad Musa.',
    mainEntity: {
      '@type': 'EducationalOrganization',
      name: 'Quran Academee',
      url: 'https://www.quranacademee.com',
      logo: 'https://www.quranacademee.com/images/favicon.png',
      description:
        'An international online Quran academy guiding students from foundational reading and Hifz to deep translation and practical daily Islamic life under scholarly supervision.',
      founder: {
        '@type': 'Person',
        name: 'Sheikh Jawwad Musa',
        jobTitle: 'Head of Academic & Scholarly Supervision',
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Islamic University of Madinah',
        },
        description:
          'Graduate of the prestigious Islamic University of Madinah, overseeing Quran Academee’s course design, teacher accreditation, and pedagogical integrity.',
      },
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        value: 50,
      },
    },
  };

  return (
    <main className="min-h-screen bg-slate-50/50 text-[#0B3951] pt-24 sm:pt-28 pb-20 relative overflow-hidden">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      {/* Background Glow Accents */}
      <div className="absolute top-0 right-1/4 w-[650px] h-[650px] bg-[#1C8DC8]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[550px] h-[550px] bg-[#116c9c]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 sm:mb-20">
        <h1 className="font-display font-[900] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0B3951] tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
          Recite with{' '}
          <span className="font-allura inline-block py-1 text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">
            Beauty
          </span>
          , Understand with{' '}
          <span className="font-allura inline-block py-1 text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">
            Depth
          </span>
          , Live with{' '}
          <span className="font-allura inline-block py-1 text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">
            Purpose
          </span>
        </h1>

        <p className="font-sans text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Quran Academee was founded to bridge the gap between mechanical recitation and living Islamic character. Guided by authentic scholars, we provide personalized 1-on-1 Quran education to Muslim families worldwide.
        </p>
      </section>

      {/* SECTION 1: WHY WE BUILT QURAN ACADEMEE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: 3 Problems + Solution (Pure white background, no cards) */}
          <div className="lg:col-span-7 order-2 lg:order-1 bg-white rounded-2xl sm:rounded-3xl border border-sky-100/90 p-6 sm:p-8 lg:p-10 shadow-sm flex flex-col justify-center">
            <div className="space-y-6">
              <div>
                <span className="text-lg font-bold uppercase tracking-wider text-[#0284C7] px-3 py-1  inline-block mb-4">
                  The Core Challenges in Islamic Education
                </span>

                <div className="space-y-4">
                  {/* Problem 1 */}
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#0B3951] mb-1">
                      1. Inauthentic Teaching &amp; Lack of Scholarly Supervision
                    </h3>
                  </div>

                  {/* Problem 2 */}
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#0B3951] mb-1">
                      2. Mechanical Recitation Without Understanding or Connection
                    </h3>
                  </div>

                  {/* Problem 3 */}
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#0B3951] mb-1">
                      3. Fragmented Learning Missing Duas, Namaz, and Living Ethics
                    </h3>
                  </div>
                </div>
              </div>

              {/* Solution Paragraph */}
              <div className="pt-5 border-t border-slate-100">
                <h4 className="font-display font-bold text-sm uppercase tracking-wider text-[#1C8DC8] mb-2">
                  How Quran Academee Solves This
                </h4>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                  Under the direct supervision of graduates from the Islamic University of Madinah, Quran Academee provides a complete, structured developmental lifecycle for every student. From a child&apos;s very first Arabic letter in Qaida to our comprehensive Islamic Essentials program, we guide students through accurate recitation with Tajweed, daily prayers (Salah/Namaz), authentic Duas, and Quranic translation—transforming recitation into a living bond with Allah and building strong Islamic character.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Blue Background Card matching form section */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center bg-[#0B3951] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl relative overflow-hidden min-h-[15x0px] lg:min-h-[420px]">
            {/* Background Decorative Lines & Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-50 80 C120 20, 220 180, 450 60" stroke="#1C8DC8" strokeWidth="2.5" strokeDasharray="6 6" strokeLinecap="round" />
                <path d="M-50 180 C100 120, 260 260, 450 140" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M-50 280 C140 200, 210 340, 450 240" stroke="#1C8DC8" strokeWidth="2.5" strokeDasharray="4 4" strokeLinecap="round" />
                <circle cx="340" cy="70" r="110" stroke="white" strokeWidth="2" />
                <circle cx="60" cy="330" r="85" stroke="#1C8DC8" strokeWidth="2" />
              </svg>
            </div>

            <div className="relative z-10 my-auto">
              <div className="relative inline-block">
                <h2 className="relative z-10 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-extrabold text-white leading-tight tracking-tight">
                  Why We Built Quran Academee<span className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#1C8DC8] font-black inline-block ml-0.5 leading-none">.</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LEARN TO RECITE, UNDERSTAND, AND LIVE BY THE QURAN */}
      <section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden mb-20 sm:mb-28">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#1C8DC8]/3 rounded-full blur-[130px] -translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 items-center text-left">
            {/* Left Column: Learning visual display */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-6 -left-6 w-80 h-80 bg-[#1C8DC8]/5 blur-3xl pointer-events-none" />
              <div className="w-full h-full flex flex-col items-center justify-center">
                <Image
                  src="/images/footerLogo.png"
                  alt="Quran Academee logo"
                  width={500}
                  height={400}
                  priority
                  className="w-[200px] h-[200px] md:w-full md:h-auto object-cover md:object-contain mx-auto"
                />
              </div>
            </div>

            {/* Right Column: Mission */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left mt-8 lg:mt-0">
              <h2 className="font-display font-[900] text-2xl sm:text-3xl lg:text-[38px] xl:text-[42px] text-[#0B3951] tracking-[-0.040em] leading-[1.15]">
                Learn to Recite, Understand, and{' '}
                <span className="font-allura text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">
                  Live by the Quran
                </span>
              </h2>

              <p className="font-sans font-medium text-[17px] sm:text-[18px] text-slate-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                At <strong>Quran Academee</strong>, our main purpose is helping students learn how to live according to the Quran in their daily choices, character, and family life.
              </p>

              <p className="font-sans font-medium text-[15px] sm:text-[16px] text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                While we offer essential courses in reading, Tajweed, and memorization as foundational starting steps, our focus goes further—guiding learners to understand divine translation and apply Quranic values every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SCHOLARLY SUPERVISION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28 text-center">
        <div className=" rounded-2xl sm:rounded-3xl  p-8 sm:p-12 ">
          {/* Big Picture on Top (remains on top on both desktop & mobile) */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 mx-auto rounded-full overflow-hidden shadow-md border-4 border-sky-100 bg-slate-50 mb-6">
            <Image
              src="/images/shiekhJawwad.png"
              alt="Sheikh Jawwad Moosa"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Sheikh Name & Credentials */}
          <div className="space-y-2 mb-5">
            <h2 className="font-display font-[900] text-2xl sm:text-3xl md:text-4xl text-[#0B3951] tracking-tight">
              Supervised by Sheikh Jawwad Moosa
            </h2>
            <p className="text-xs sm:text-sm text-sky-700 font-bold">
              Graduate, Islamic University of Madinah
            </p>
          </div>

          {/* Short Para About Sheikh & Supervision */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
            All curriculum standards, pedagogical methodology, and faculty accreditations at Quran Academee are supervised under the direct guidance of Sheikh Jawwad Musa, ensuring authentic classical tradition is faithfully preserved in every 1-on-1 virtual classroom.
          </p>

        </div>
      </section>

      {/* SECTION 4: OUR TEAM (7 CARDS MOVING LEFT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight mt-2">
            Meet Our Dedicated Teaching Team
          </h2>
        </div>

        <TeamMarquee />
      </section>

      {/* SECTION 5: UNIFIED CTA CARD */}
      <CourseCtaCard className="mb-8" />
    </main>
  );
}
