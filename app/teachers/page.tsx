import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Award,
  CheckCircle,
  GraduationCap,
  ShieldCheck,
  Star,
  Users,
  Globe,
  BookOpen,
  ChevronRight,
} from 'lucide-react';
import TrialModalButton from '@/components/TrialModalButton';
import TeamMarquee from '@/components/TeamMarquee';

export const metadata: Metadata = {
  title: 'Our Certified Quran Teachers & Scholars | Quran Academee',
  description:
    'Meet verified male and female online Quran teachers at Quran Academee. University-certified scholars, Al-Azhar & Madinah trained, fluent in English, and background checked.',
  alternates: {
    canonical: 'https://www.quranacademee.com/teachers',
  },
  openGraph: {
    title: 'Our Certified Quran Teachers & Scholars | Quran Academee',
    description:
      'Meet verified male and female online Quran teachers at Quran Academee. University-certified scholars, Al-Azhar & Madinah trained, fluent in English, and background checked.',
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

interface TeacherProfile {
  id: string;
  name: string;
  title: string;
  gender: 'Male' | 'Female';
  experience: string;
  credentials: string[];
  specialties: string[];
  bio: string;
  languages: string[];
}

const TEACHERS: TeacherProfile[] = [
  {
    id: 'bilal-ahmed',
    name: 'Qari Bilal Ahmed',
    title: 'Senior Tajweed & Qira’at Instructor',
    gender: 'Male',
    experience: '12+ Years Teaching',
    credentials: [
      'Certified Qari in Hafs \'an \'Asim Recitation',
      'Shahadat-ul-Alamiya (Master in Islamic Studies)',
      'Former Judge in National Qira\'at Competitions',
    ],
    specialties: ['Advanced Tajweed', 'Quran Reading', 'Qira\'at Rules', 'Adult Beginners'],
    bio: 'Qari Bilal has guided hundreds of international students from introductory Qaida to full Mushaf mastery. He specializes in precise articulation (Makharij) and cultivating classical melodic recitation (Tarteel).',
    languages: ['English', 'Arabic', 'Urdu'],
  },
  {
    id: 'maryam-fatima',
    name: 'Ustadha Maryam Fatima',
    title: 'Lead Female Faculty & Hifz Mentor',
    gender: 'Female',
    experience: '9+ Years Teaching',
    credentials: [
      'Certified Hafiza of the Holy Quran',
      'Certified Scholar in Tajweed & Recitation',
      'Child Psychology & Online Pedagogy Certification',
    ],
    specialties: ['Quran for Young Kids', 'Hifz for Sisters', 'Masnoon Duas', 'Madani Qaida'],
    bio: 'A compassionate educator who creates a warm, encouraging classroom for sisters and young children. Ustadha Maryam excels at breaking complex phonetic rules into playful, memorable milestones for kids.',
    languages: ['English', 'Urdu'],
  },
  {
    id: 'hamza-tariq',
    name: 'Sheikh Hafiz Hamza',
    title: 'Hifz Program Coordinator & Scholar',
    gender: 'Male',
    experience: '10+ Years Teaching',
    credentials: [
      'Hafiz al-Quran at Age 11',
      'Graduate of Classical Dars-e-Nizami',
      'Specialist in Mutashabihat (Similar Verses)',
    ],
    specialties: ['Full Quran Hifz', 'Hifz Revision (Manzil)', 'Mutashabihat Mastery', 'Salah Coaching'],
    bio: 'Sheikh Hamza has mentored over 40 Huffaz to completion. His systematic 3-tier revision method (Sabaq, Sabqi, Manzil) guarantees long-term retention and confidence during prayer leadership.',
    languages: ['English', 'Arabic', 'Urdu'],
  },
  {
    id: 'aisha-siddiqa',
    name: 'Ustadha Aisha Siddiqa',
    title: 'Senior Islamic Studies & Arabic Tutor',
    gender: 'Female',
    experience: '8+ Years Teaching',
    credentials: [
      'Bachelor in Arabic & Islamic Studies',
      'Certified Alima with Sanad in Hadith',
      'Specialist in Youth Islamic Mentorship',
    ],
    specialties: ['Islamic Studies for Kids', 'Quranic Arabic', 'Daily Duas & Akhlaq', 'Seerah Stories'],
    bio: 'Ustadha Aisha blends classical Islamic scholarship with relatable everyday discussions for young Muslims living in the West, helping them develop strong moral values and Muslim identity.',
    languages: ['English', 'Arabic', 'Urdu'],
  },
  {
    id: 'muhammad-zubair',
    name: 'Qari Muhammad Zubair',
    title: 'Senior Quranic Arabic & Recitation Instructor',
    gender: 'Male',
    experience: '11+ Years Teaching',
    credentials: [
      'Specialist in Classical Qira’at Styles',
      'Master in Classical Arabic Linguistics (Nahw & Sarf)',
      'Author of Applied Tajweed Workbooks',
    ],
    specialties: ['Quranic Arabic Grammar', 'Classical Tajweed', 'Mushaf Recitation', 'Adults & Reverts'],
    bio: 'Qari Zubair is celebrated for his patient, judgment-free approach with adult learners and reverts, guiding students to read and comprehend the Quran without linguistic intimidation.',
    languages: ['English', 'Arabic', 'Urdu'],
  },
  {
    id: 'zainab-noor',
    name: 'Ustadha Zainab Noor',
    title: 'Certified Hafiza & Early Childhood Quran Tutor',
    gender: 'Female',
    experience: '7+ Years Teaching',
    credentials: [
      'Hafiza of the Holy Quran',
      'Diploma in Montessori & Digital Early Education',
      'Certified in Noorani & Madani Qaida Methodologies',
    ],
    specialties: ['Toddler & Early Reader Qaida', 'Letter Jointing', 'Short Surahs Memorization', 'Duas'],
    bio: 'Known for her radiant patience and creative screen-sharing games, Ustadha Zainab turns early Arabic reading into an exciting daily highlight for children as young as 4 years old.',
    languages: ['English', 'Urdu'],
  },
];

export default function TeachersPage() {
  const teacherSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Quran Academee Certified Faculty',
    description: 'Verified male and female online Quran scholars, Huffaz, and Tajweed educators.',
    itemListElement: TEACHERS.map((teacher, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: teacher.name,
        jobTitle: teacher.title,
        description: teacher.bio,
        gender: teacher.gender,
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
      <div className="absolute top-1/2 left-0 w-[550px] h-[550px] bg-[#116c9c]/5 Z blur-[140px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 sm:mb-20">
        <h1 className="font-display font-[900] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0B3951] tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
          Meet Our Certified{' '}
          <span className="font-allura inline-block py-1 text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">
            Quran Teachers & Scholars
          </span>
        </h1>

        <p className="font-sans text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Every tutor at Quran Academee is a verified graduate holding formal Islamic university degrees and pedagogical training. We provide dedicated female teachers for sisters and young kids, and experienced male scholars for brothers.
        </p>

        {/* 4 Trust Signals Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="bg-white border border-sky-100/90 p-3.5 text-center shadow-sm">
            <Award className="w-5 h-5 text-[#1C8DC8] mx-auto mb-1" />
            <span className="block text-xs font-bold text-[#0B3951]">Verified Scholars</span>
            <span className="text-[11px] text-slate-500">Certified Faculty</span>
          </div>

          <div className="bg-white border border-sky-100/90 p-3.5 text-center shadow-sm">
            <Users className="w-5 h-5 text-[#1C8DC8] mx-auto mb-1" />
            <span className="block text-xs font-bold text-[#0B3951]">Male & Female Faculty</span>
            <span className="text-[11px] text-slate-500">Dedicated sisters roster</span>
          </div>

          <div className="bg-white border border-sky-100/90 p-3.5 text-center shadow-sm">
            <Globe className="w-5 h-5 text-[#1C8DC8] mx-auto mb-1" />
            <span className="block text-xs font-bold text-[#0B3951]">Fluent English</span>
            <span className="text-[11px] text-slate-500">Clear communication</span>
          </div>

          <div className="bg-white border border-sky-100/90 p-3.5 text-center shadow-sm">
            <ShieldCheck className="w-5 h-5 text-[#1C8DC8] mx-auto mb-1" />
            <span className="block text-xs font-bold text-[#0B3951]">Background Checked</span>
            <span className="text-[11px] text-slate-500">Child-safe online policy</span>
          </div>
        </div>
      </section>

      {/* TEACHER VETTING & STANDARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className=" p-8 sm:p-12">
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
                Auditing Shahadat-ul-Alamiya and Hifz certifications.
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
                Training in patience, digital whiteboards, and games.
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

      {/* OUR FACULTY / DEDICATED TEACHING TEAM (MATCHING ABOUT PAGE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight mt-2">
            Meet Our Dedicated Teaching Team
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            7 certified scholars and educators dedicated to 1-on-1 personalized mentorship.
          </p>
        </div>

        <TeamMarquee />
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#F0F9FF] border  p-8 sm:p-12 shadow-sm">
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
