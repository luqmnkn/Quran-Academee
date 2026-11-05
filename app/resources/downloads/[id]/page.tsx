import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Download, ArrowLeft, FileText, CheckCircle2, BookOpen, ShieldCheck } from 'lucide-react';
import { DOWNLOADABLE_RESOURCES } from '@/lib/quranData';
import ResourceFooter from '@/components/ResourceFooter';

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return DOWNLOADABLE_RESOURCES.map((r) => ({
    id: r.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const resource = DOWNLOADABLE_RESOURCES.find((r) => r.id === id);

  if (!resource) {
    return {
      title: 'Resource Not Found | Quran Academee',
      description: 'The requested educational resource could not be found.',
    };
  }

  const pageTitle = `${resource.title} (${resource.category}) Free PDF Download | Quran Academee`;
  const pageDescription = `${resource.description} Download the verified, printable ${resource.format} guide (${resource.fileSize}, ${resource.pages} pages) under scholarly supervision.`;
  const canonicalUrl = `https://www.quranacademee.com/resources/downloads/${resource.id}`;

  return {
    title: pageTitle,
    description: pageDescription,
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
          url: resource.thumbnail,
          width: 600,
          height: 800,
          alt: resource.title,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [resource.thumbnail],
    },
  };
}

export default async function BookletDetailPage({ params }: Props) {
  const { id } = await params;
  const resource = DOWNLOADABLE_RESOURCES.find((r) => r.id === id);

  if (!resource) {
    notFound();
  }

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    name: resource.title,
    description: resource.description,
    url: `https://www.quranacademee.com/resources/downloads/${resource.id}`,
    image: `https://www.quranacademee.com${resource.thumbnail}`,
    encodingFormat: 'application/pdf',
    numberOfPages: resource.pages,
    inLanguage: ['en', 'ar'],
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
        name: resource.title,
        item: `https://www.quranacademee.com/resources/downloads/${resource.id}`,
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/resources/downloads"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1081b7] hover:text-[#116c9c] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Download Index
          </Link>
          <span className="text-xs text-slate-500 font-medium">
            Resource Library &bull; {resource.category}
          </span>
        </div>

        {/* Main Document Showcase Card */}
        <div className="bg-[#f0f9ff] rounded-none p-6 sm:p-10 shadow-xl border border-[#38aae3]/25 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Large Cover Page Thumbnail */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm h-80 sm:h-96 bg-white rounded-none p-4 shadow-lg border border-[#38aae3]/20 flex items-center justify-center overflow-hidden">
              <Image
                src={resource.thumbnail}
                alt={resource.title}
                width={280}
                height={340}
                className="object-contain max-h-full rounded-none shadow"
                priority
              />
              {resource.badge && (
                <span className="absolute top-4 right-4 px-3.5 py-1 bg-[#1081b7] text-white text-xs font-bold rounded-none shadow-md">
                  {resource.badge}
                </span>
              )}
            </div>
          </div>

          {/* Right: Essential Information & Outlines */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#1081b7] uppercase tracking-wider">
                {resource.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight mt-1">
                {resource.title}
              </h1>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {resource.fullDescription || resource.description}
            </p>

            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600 pt-1">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-white border border-[#38aae3]/20">
                <FileText className="w-4 h-4 text-[#1081b7]" /> {resource.pages} Pages
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-white border border-[#38aae3]/20">
                Format: {resource.format} ({resource.fileSize})
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-white border border-[#38aae3]/20 text-[#1081b7]">
                <ShieldCheck className="w-4 h-4" /> Authentic Scholar Guide
              </span>
            </div>

            {/* Chapter Outlines & Takeaways */}
            {resource.outlines && resource.outlines.length > 0 && (
              <div className="bg-white rounded-none p-5 border border-[#38aae3]/20 space-y-3 shadow-sm">
                <h3 className="text-xs font-extrabold text-[#116c9c] uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> What You Will Learn & Key Contents
                </h3>
                <ul className="space-y-2">
                  {resource.outlines.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Download CTA Action */}
            <div className="pt-2">
              <a
                href={resource.downloadPath}
                download
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-none bg-[#1081b7] hover:bg-[#116c9c] text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF Resource ({resource.fileSize})</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <ResourceFooter />
    </div>
  );
}
