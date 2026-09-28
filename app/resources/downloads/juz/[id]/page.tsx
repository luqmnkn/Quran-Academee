import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Download, ArrowLeft, Layers, CheckCircle2, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { JUZ_LIST, getJuzSlug, getJuzParaName } from '@/lib/quranData';
import ResourceFooter from '@/components/ResourceFooter';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const juz = JUZ_LIST.find((j) => getJuzSlug(j) === id || String(j.id) === String(id)) || JUZ_LIST[0];
  const paraName = getJuzParaName(juz);

  const pageTitle = `Download Para ${juz.id} ${paraName} (${juz.name}) PDF - Quran Juz ${juz.id} | Quran Academee`;
  const pageDescription = `Download free simple text PDF for Para ${juz.id} (${paraName} / ${juz.name}). Spans ${juz.startSurah}. High quality script for daily Quran reading, Tajweed practice, and Hifz revision.`;
  const canonicalUrl = `https://quranacademee.com/resources/downloads/juz/${getJuzSlug(juz)}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      `Para ${juz.id} PDF`,
      `Juz ${juz.id} PDF download`,
      `Para ${juz.id} ${paraName} PDF`,
      `${paraName} pdf download`,
      `Juz ${juz.name} simple text pdf`,
      `Quran Para ${juz.id} text`,
      `Quran Academee Para ${juz.id}`
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
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
    },
  };
}

export default async function JuzDownloadDetailPage({ params }: Props) {
  const { id } = await params;
  const juz = JUZ_LIST.find((j) => getJuzSlug(j) === id || String(j.id) === String(id)) || JUZ_LIST[0];
  const paraName = getJuzParaName(juz);

  const prevJuz = JUZ_LIST.find((j) => j.id === (juz.id > 1 ? juz.id - 1 : 30)) || JUZ_LIST[0];
  const nextJuz = JUZ_LIST.find((j) => j.id === (juz.id < 30 ? juz.id + 1 : 1)) || JUZ_LIST[0];

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    'name': `Para ${juz.id} ${paraName} (${juz.name}) PDF`,
    'description': `High-quality simple text PDF document for Para ${juz.id} (${paraName}), covering ${juz.startSurah} of the Holy Quran.`,
    'url': `https://quranacademee.com/resources/downloads/juz/${getJuzSlug(juz)}`,
    'encodingFormat': 'application/pdf',
    'inLanguage': 'ar',
    'publisher': {
      '@type': 'Organization',
      'name': 'Quran Academee',
      'url': 'https://quranacademee.com'
    }
  };

  const faqSchemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': `What Surahs are included in Para ${juz.id}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Para ${juz.id} (${paraName}) spans ${juz.startSurah}.`
        }
      },
      {
        '@type': 'Question',
        'name': `What is the name of Para ${juz.id}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Para ${juz.id} is titled "${paraName}" (${juz.arabic}).`
        }
      },
      {
        '@type': 'Question',
        'name': `How can I download the PDF for Para ${juz.id}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Click the "Download Para ${juz.id} PDF" button on Quran Academee to save the complete black & white PDF.`
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f0f9ff] to-[#d7effa] text-slate-800 pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaJsonLd) }}
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
            Juz / Para Library &bull; Para {juz.id}: {paraName}
          </span>
        </div>

        {/* Main Card */}
        <div className="bg-[#f0f9ff] rounded-3xl p-6 sm:p-10 shadow-xl border border-[#38aae3]/25 space-y-8">
          {/* Header Title Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#38aae3]/20">
            <div className="flex items-center gap-4">
              <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1081b7] to-[#0e94d3] text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                J{juz.id}
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  Para {juz.id}: {paraName} ({juz.name}) PDF
                </h1>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">
                  Spans {juz.startSurah} &bull; Quran Juz {juz.id}
                </p>
              </div>
            </div>

            <span className="text-3xl font-arabic font-bold text-[#116c9c]">{juz.arabic}</span>
          </div>

          {/* 2 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left Column */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-xs font-extrabold text-[#116c9c] uppercase tracking-wider">
                  Para Overview &amp; Core Themes
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  <strong>Para {juz.id} ({paraName})</strong> covers {juz.startSurah}. Main Focus: {juz.theme}.
                </p>

                <div className="bg-white rounded-2xl p-5 border border-[#38aae3]/20 space-y-3 shadow-sm">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#1081b7]" /> Key Attributes
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>Surah Range:</strong> {juz.startSurah}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>Content Focus:</strong> {juz.versesSpan}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>Format:</strong> High Quality Simple Black &amp; White Text PDF</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-xs text-slate-500 flex items-center gap-2 pt-2">
                <ShieldCheck className="w-4 h-4 text-[#1081b7]" />
                <span>Verified Quranic Script &bull; Direct Download</span>
              </div>
            </div>

            {/* Right Column: PDF Preview Frame & Download CTA */}
            <div className="bg-white rounded-2xl p-5 border border-[#38aae3]/20 flex flex-col justify-between space-y-5 shadow-sm min-h-[420px]">
              <div className="space-y-3 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1081b7] uppercase tracking-wider">
                    First Page PDF Preview
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    PDF Document
                  </span>
                </div>

                <div className="flex-1 w-full min-h-[300px] rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                  <iframe
                    src={`${juz.filePath}#toolbar=0&navpanes=0`}
                    title={`Para ${juz.id} PDF Preview`}
                    className="w-full h-full border-none bg-white"
                  />
                </div>
              </div>

              <a
                href={juz.filePath}
                download
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-gradient-to-r from-[#1081b7] to-[#116c9c] hover:from-[#116c9c] hover:to-[#1081b7] text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <Download className="w-5 h-5" />
                <span>Download Para {juz.id} PDF</span>
              </a>
            </div>
          </div>

          {/* SEO Content Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#38aae3]/20 space-y-6">
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#116c9c]">
                About Para {juz.id}: {paraName} ({juz.arabic}) — Recitation &amp; Hifz
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Reading Para {juz.id} ({paraName}) daily helps build steady Quranic recitation speed and strong retention for Huffaz. The simple black &amp; white text PDF ensures clear font readability without eye strain or printing issues.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#1081b7]" /> Frequently Asked Questions (FAQ)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#f0f9ff] p-4 rounded-xl border border-[#38aae3]/15 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">What Surahs are in Para {juz.id}?</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Para {juz.id} covers {juz.startSurah}.
                  </p>
                </div>

                <div className="bg-[#f0f9ff] p-4 rounded-xl border border-[#38aae3]/15 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">What is the Arabic name of Para {juz.id}?</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    It is titled {juz.arabic} ({paraName}).
                  </p>
                </div>

                <div className="bg-[#f0f9ff] p-4 rounded-xl border border-[#38aae3]/15 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">Is this Para PDF free?</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Yes, 100% free for all students, parents, and teachers.
                  </p>
                </div>
              </div>
            </div>

            {/* Prev / Next Para Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 text-xs font-bold">
              <Link
                href={`/resources/downloads/juz/${getJuzSlug(prevJuz)}`}
                className="inline-flex items-center gap-1.5 text-[#1081b7] hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev: Para {prevJuz.id} ({getJuzParaName(prevJuz)})</span>
              </Link>

              <Link
                href={`/resources/downloads/juz/${getJuzSlug(nextJuz)}`}
                className="inline-flex items-center gap-1.5 text-[#1081b7] hover:underline"
              >
                <span>Next: Para {nextJuz.id} ({getJuzParaName(nextJuz)})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ResourceFooter />
    </div>
  );
}
