import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { DUAS } from '@/lib/quranData';
import ResourceFooter from '@/components/ResourceFooter';
import DuaDetailClient from '@/components/DuaDetailClient';

interface DuaDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return DUAS.map((d) => ({
    id: d.slug,
  }));
}

export async function generateMetadata({ params }: DuaDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const rawId = resolvedParams.id;
  const currentDua = DUAS.find((d) => d.slug === rawId || String(d.id) === String(rawId)) || DUAS[0];

  const pageTitle = `${currentDua.title} (${currentDua.category}) | Masnoon Dua | Quran Academee`;
  const pageDescription = `${currentDua.description} Download printable high-resolution Dua card with clear Arabic script and English translation from authentic Sunnah.`;
  const canonicalUrl = `https://www.quranacademee.com/resources/downloads/dua/${currentDua.slug}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      currentDua.title,
      `${currentDua.category} Dua`,
      'Daily Masnoon Duas',
      'Islamic supplications',
      'Dua card download',
      'Quran Academee Duas',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      type: 'article',
      siteName: 'Quran Academee',
      images: [
        {
          url: currentDua.imagePath,
          width: 800,
          height: 800,
          alt: currentDua.title,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [currentDua.imagePath],
    },
  };
}

export default async function DuaDetailPage({ params }: DuaDetailPageProps) {
  const resolvedParams = await params;
  const rawId = resolvedParams.id;
  const currentDua = DUAS.find((d) => d.slug === rawId || String(d.id) === String(rawId)) || DUAS[0];

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    name: `${currentDua.title} - ${currentDua.category}`,
    description: currentDua.description,
    url: `https://www.quranacademee.com/resources/downloads/dua/${currentDua.slug}`,
    image: `https://www.quranacademee.com${currentDua.imagePath}`,
    inLanguage: ['ar', 'en'],
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Quran Academee',
      url: 'https://www.quranacademee.com',
    },
  };

  const breadcrumbSchemaJsonLd = {
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
        name: 'Resources',
        item: 'https://www.quranacademee.com/resources',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Downloads',
        item: 'https://www.quranacademee.com/resources/downloads',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: currentDua.title,
        item: `https://www.quranacademee.com/resources/downloads/dua/${currentDua.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f0f9ff] to-[#d7effa] text-slate-800 pt-24 pb-16 overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/resources/downloads"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1081b7] hover:text-[#116c9c] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Download Index
          </Link>
          <span className="text-xs text-slate-500 font-medium">
            Daily Masnoon Duas &bull; Dua {currentDua.id} of {DUAS.length}
          </span>
        </div>

        {/* Client Interactive Dua Card */}
        <DuaDetailClient currentDua={currentDua} allDuas={DUAS} />
      </div>

      {/* CTA Footer */}
      <ResourceFooter />
    </div>
  );
}
