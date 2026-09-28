import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Download, ArrowLeft, BookOpen, CheckCircle2, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { SURAHS, getSurahSlug } from '@/lib/quranData';
import ResourceFooter from '@/components/ResourceFooter';
import QuranPdfViewer from '@/components/QuranPdfViewerWrapper';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const surah = SURAHS.find((s) => getSurahSlug(s) === id || String(s.id) === String(id)) || SURAHS[0];

  const pageTitle = `Download Surah ${surah.name} (${surah.arabic}) PDF - Chapter ${surah.id} | Quran Academee`;
  const pageDescription = `Download free simple text PDF for Surah ${surah.name} (${surah.transliteration}). Revealed in ${surah.type}, containing ${surah.verses} verses. Theme: ${surah.theme}. Perfect for reading, memorization, and Tajweed revision.`;
  const canonicalUrl = `https://quranacademee.com/resources/downloads/surah/${getSurahSlug(surah)}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      `Surah ${surah.name} PDF`,
      `Surah ${surah.name} download`,
      `Surah ${surah.id} PDF`,
      `Quran Surah ${surah.name} text`,
      `${surah.transliteration} pdf`,
      `Surah ${surah.name} Arabic text`,
      `Quran Academee Surah ${surah.id}`
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

export default async function SurahDownloadDetailPage({ params }: Props) {
  const { id } = await params;
  const surah = SURAHS.find((s) => getSurahSlug(s) === id || String(s.id) === String(id)) || SURAHS[0];

  // Prev / Next Surah calculation
  const prevSurah = SURAHS.find((s) => s.id === (surah.id > 1 ? surah.id - 1 : 114)) || SURAHS[0];
  const nextSurah = SURAHS.find((s) => s.id === (surah.id < 114 ? surah.id + 1 : 1)) || SURAHS[0];

  // Schema.org JSON-LD Structured Data for Search Engines
  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    'name': `Surah ${surah.name} (${surah.arabic}) PDF`,
    'description': `High-quality simple text PDF document for Surah ${surah.name} (${surah.transliteration}), chapter ${surah.id} of the Holy Quran.`,
    'url': `https://quranacademee.com/resources/downloads/surah/${getSurahSlug(surah)}`,
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
        'name': `How many verses (Ayat) are in Surah ${surah.name}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Surah ${surah.name} contains exactly ${surah.verses} verses (Ayat).`
        }
      },
      {
        '@type': 'Question',
        'name': `Was Surah ${surah.name} revealed in Makkah or Madinah?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Surah ${surah.name} is a ${surah.type} Surah.`
        }
      },
      {
        '@type': 'Question',
        'name': `How can I download the PDF for Surah ${surah.name}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `You can click the "Download Surah PDF" button on Quran Academee to save the clean black & white simple text PDF for offline reading and printing.`
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f0f9ff] to-[#d7effa] text-slate-800 pt-24 pb-16">
      {/* Inject JSON-LD for Search Engine Optimization */}
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
            Surah Library &bull; {surah.type} Surah &bull; Chapter {surah.id}
          </span>
        </div>

        {/* Main Surah Card Layout */}
        <div className="bg-[#f0f9ff] rounded-3xl p-6 sm:p-10 shadow-xl border border-[#38aae3]/25 space-y-8">
          {/* Header Title Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#38aae3]/20">
            <div className="flex items-center gap-4">
              <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#116c9c] to-[#1081b7] text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                {surah.id}
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  Surah {surah.name} ({surah.transliteration}) PDF
                </h1>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">
                  Chapter {surah.id} of the Holy Quran &bull; {surah.verses} Verses &bull; {surah.type} Revelation
                </p>
              </div>
            </div>

            <span className="text-3xl font-arabic font-bold text-[#116c9c]">{surah.arabic}</span>
          </div>

          {/* 2 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left Column: Information & Key Attributes */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-xs font-extrabold text-[#116c9c] uppercase tracking-wider">
                  Surah Overview &amp; Core Theme
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  <strong>Surah {surah.name}</strong> ({surah.arabic}) is the {surah.id}th chapter of the Glorious Quran, revealed in {surah.type} containing {surah.verses} verses. Main Theme: {surah.theme}.
                </p>

                <div className="bg-white rounded-2xl p-5 border border-[#38aae3]/20 space-y-3 shadow-sm">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[#1081b7]" /> Key Surah Attributes
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>Total Verses:</strong> {surah.verses} Ayat</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>Revelation Origin:</strong> {surah.type}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>Format:</strong> High Quality Simple Black &amp; White PDF</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>Ideal For:</strong> Nazra reading, Hifz revision &amp; printouts</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-xs text-slate-500 flex items-center gap-2 pt-2">
                <ShieldCheck className="w-4 h-4 text-[#1081b7]" />
                <span>Verified Quranic Script &bull; Official Quran Academee Library</span>
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

                <div className="flex-1 w-full min-h-[300px] rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative">
                  <QuranPdfViewer
                    src={surah.filePath}
                    title={`Surah ${surah.name} PDF Preview`}
                  />
                </div>
              </div>

              <a
                href={surah.filePath}
                download
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-gradient-to-r from-[#1081b7] to-[#116c9c] hover:from-[#116c9c] hover:to-[#1081b7] text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <Download className="w-5 h-5" />
                <span>Download Surah {surah.name} PDF</span>
              </a>
            </div>
          </div>

          {/* SEO Content & Detailed Information Section for Search Engines */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#38aae3]/20 space-y-6">
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#116c9c]">
                About Surah {surah.name} ({surah.transliteration}) — Reading &amp; Benefits
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Reciting Surah {surah.name} daily provides spiritual clarity, immense reward, and protection. Students learning Quran reading (Nazra) or memorizing the Holy Quran (Hifz) benefit greatly from simple black &amp; white PDF scripts that display clear Arabic font without background distractions.
              </p>
            </div>

            {/* Structured FAQ Section for Google Search Snippets */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#1081b7]" /> Frequently Asked Questions (FAQ)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#f0f9ff] p-4 rounded-xl border border-[#38aae3]/15 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">How many verses in Surah {surah.name}?</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Surah {surah.name} contains {surah.verses} verses (Ayat).
                  </p>
                </div>

                <div className="bg-[#f0f9ff] p-4 rounded-xl border border-[#38aae3]/15 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">Where was it revealed?</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Surah {surah.name} is a {surah.type} revelation.
                  </p>
                </div>

                <div className="bg-[#f0f9ff] p-4 rounded-xl border border-[#38aae3]/15 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">Is this PDF free to download?</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Yes, all Surah PDFs on Quran Academee are 100% free for learning and study.
                  </p>
                </div>
              </div>
            </div>

            {/* Prev / Next Surah Links for Search Engine Crawling & Link Equity */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 text-xs font-bold">
              <Link
                href={`/resources/downloads/surah/${getSurahSlug(prevSurah)}`}
                className="inline-flex items-center gap-1.5 text-[#1081b7] hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev: Surah {prevSurah.id}. {prevSurah.name}</span>
              </Link>

              <Link
                href={`/resources/downloads/surah/${getSurahSlug(nextSurah)}`}
                className="inline-flex items-center gap-1.5 text-[#1081b7] hover:underline"
              >
                <span>Next: Surah {nextSurah.id}. {nextSurah.name}</span>
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
