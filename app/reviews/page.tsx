import React from 'react';
import type { Metadata } from 'next';
import { VIDEO_TESTIMONIALS, TESTIMONIALS } from '@/data';
import TrustCredibility from '@/components/TrustCredibility';
import Testimonials from '@/components/Testimonials';
import CourseCtaCard from '@/components/CourseCtaCard';

export const metadata: Metadata = {
  title: 'Student & Parent Reviews | Video Testimonials | Quran Academee',
  description:
    'Watch real student video recitations and read verified parent reviews for Quran Academee. Rated 4.9/5 for 1-on-1 Tajweed, Hifz, and Qaida classes worldwide.',
  alternates: {
    canonical: 'https://www.quranacademee.com/reviews',
  },
  openGraph: {
    title: 'Student & Parent Reviews | Video Testimonials | Quran Academee',
    description:
      'Watch real student video recitations and read verified parent reviews for Quran Academee. Rated 4.9/5 for 1-on-1 Tajweed, Hifz, and Qaida classes worldwide.',
    url: 'https://www.quranacademee.com/reviews',
    siteName: 'Quran Academee',
    images: [
      {
        url: '/images/link.png',
        width: 1200,
        height: 630,
        alt: 'Quran Academee Student Reviews and Video Testimonials',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function ReviewsPage() {
  // Schema.org VideoObject for each video testimonial
  const videoObjectSchemas = VIDEO_TESTIMONIALS.map((video) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: `${video.studentName} — ${video.courseName} Student Recitation Review`,
    description: video.snippet,
    thumbnailUrl: 'https://www.quranacademee.com/images/link.png',
    uploadDate: '2026-01-15T08:00:00+00:00',
    contentUrl: `https://www.quranacademee.com${video.videoUrl}`,
    embedUrl: `https://www.quranacademee.com${video.videoUrl}`,
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Quran Academee',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.quranacademee.com/images/favicon.png',
      },
    },
  }));

  // Schema.org AggregateRating and Review Schema
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Quran Academee',
    url: 'https://www.quranacademee.com',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '185',
      reviewCount: '142',
    },
    review: TESTIMONIALS.map((t) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: t.name,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: t.rating.toString(),
        bestRating: '5',
      },
      reviewBody: t.feedback,
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
        name: 'Reviews',
        item: 'https://www.quranacademee.com/reviews',
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50/50 text-[#0B3951] pt-24 sm:pt-28 pb-20 relative overflow-hidden">
      {/* Schema.org Scripts */}
      {videoObjectSchemas.map((vSchema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(vSchema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Background Glow Accents */}
      <div className="absolute top-0 right-1/4 w-[650px] h-[650px] bg-[#1C8DC8]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[550px] h-[550px] bg-[#116c9c]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-12">
        <h1 className="font-display font-[900] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0B3951] tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
          Real Results, Real Recitation:{' '}
          <span className="font-allura inline-block py-1 text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">
            Verified Student Reviews
          </span>
        </h1>

        <p className="font-sans text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Hear directly from parents and adult students experiencing the difference of 1-on-1 scholarly instruction. Watch real recitation progress videos and read unedited testimonials.
        </p>
      </section>

      {/* 1. AN INTERNATIONAL ACADEMY BUILT ON FAITH & PURPOSE (HOMEPAGE SECTION) */}
      <TrustCredibility />

      {/* 2 & 3. WATCH OUR STUDENTS RECITE IN REAL-TIME & HEAR FROM OUR QURAN LEARNERS */}
      <Testimonials videoFirst={true} />

      {/* 4. UNIFIED CONVERSION CTA CARD */}
      <CourseCtaCard className="mt-12 mb-8" />
    </main>
  );
}
