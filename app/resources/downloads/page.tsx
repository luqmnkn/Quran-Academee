'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Sparkles, ArrowLeft, Download, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SURAHS, JUZ_LIST, DUAS, getJuzSlug, getJuzParaName, getSurahSlug } from '@/lib/quranData';
import ResourceFooter from '@/components/ResourceFooter';
import QuranPdfViewer from '@/components/QuranPdfViewerWrapper';

export default function DownloadableResourcesPage() {
  const [resourceCategory, setResourceCategory] = useState<'surahs' | 'juz' | 'duas'>('surahs');
  const [selectedId, setSelectedId] = useState<number>(1);

  // Selected item object based on active category and selected ID
  const selectedSurah = SURAHS.find((s) => s.id === selectedId) || SURAHS[0];
  const selectedJuz = JUZ_LIST.find((j) => j.id === selectedId) || JUZ_LIST[0];
  const selectedDua = DUAS.find((d) => d.id === selectedId) || DUAS[0];

  const currentTitle =
    resourceCategory === 'surahs'
      ? `Surah ${selectedSurah.id}: ${selectedSurah.name}`
      : resourceCategory === 'juz'
      ? `Para ${selectedJuz.id}: ${getJuzParaName(selectedJuz)}`
      : `${selectedDua.title}`;

  const currentArabic =
    resourceCategory === 'surahs'
      ? selectedSurah.arabic
      : resourceCategory === 'juz'
      ? selectedJuz.arabic
      : selectedDua.category;

  const currentFilePath =
    resourceCategory === 'surahs'
      ? selectedSurah.filePath
      : resourceCategory === 'juz'
      ? selectedJuz.filePath
      : selectedDua.imagePath;

  const currentDetailUrl =
    resourceCategory === 'surahs'
      ? `/resources/downloads/surah/${getSurahSlug(selectedSurah)}`
      : resourceCategory === 'juz'
      ? `/resources/downloads/juz/${getJuzSlug(selectedJuz)}`
      : `/resources/downloads/dua/${selectedDua.slug}`;

  // Switch category and reset selected id
  const handleCategoryChange = (cat: 'surahs' | 'juz' | 'duas') => {
    setResourceCategory(cat);
    setSelectedId(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f0f9ff] to-[#d7effa] text-slate-800 pt-20 sm:pt-24 pb-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#116c9c] tracking-tight">
            Quran Surah &amp; Para PDF Downloads
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Select any Surah, Para (Juz), or Daily Dua from the left dropdown menu to instantly view its PDF page 1 preview on the right and download.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 bg-[#f0f9ff] p-1.5 rounded-2xl shadow-md border border-[#38aae3]/25">
            <button
              onClick={() => handleCategoryChange('surahs')}
              className={`px-5 sm:px-7 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                resourceCategory === 'surahs'
                  ? 'bg-[#1081b7] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#1081b7]'
              }`}
            >
              <span>114 Surahs</span>
            </button>
            <button
              onClick={() => handleCategoryChange('juz')}
              className={`px-5 sm:px-7 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                resourceCategory === 'juz'
                  ? 'bg-[#1081b7] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#1081b7]'
              }`}
            >
              <span>30 Paras (Juz)</span>
            </button>
            <button
              onClick={() => handleCategoryChange('duas')}
              className={`px-5 sm:px-7 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                resourceCategory === 'duas'
                  ? 'bg-[#1081b7] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#1081b7]'
              }`}
            >
              <span>28 Daily Duas</span>
            </button>
          </div>
        </div>

        {/* Revamped 2-Column Interface: Dropdown on Left & Live PDF Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols): Dropdown Selector & Details */}
          <div className="lg:col-span-12">
            <div className="space-y-2 w-5/6 sm:w-4/6 lg:w-3/6 max-w-md mx-auto">


              {/* Styled Dropdown Menu */}
              <div className="relative">
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(Number(e.target.value))}
                  className="w-full bg-white text-slate-900 font-bold text-sm sm:text-base rounded-2xl px-4 py-3.5 border-2 border-[#38aae3]/30 focus:border-[#1081b7] focus:outline-none shadow-md cursor-pointer appearance-none transition-all"
                >
                  {resourceCategory === 'surahs' &&
                    SURAHS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.id}. {s.name} ({s.arabic}) &bull; {s.verses} Verses
                      </option>
                    ))}

                  {resourceCategory === 'juz' &&
                    JUZ_LIST.map((j) => (
                      <option key={j.id} value={j.id}>
                        Para {j.id}: {getJuzParaName(j)} ({j.arabic})
                      </option>
                    ))}

                  {resourceCategory === 'duas' &&
                    DUAS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.id}. {d.title}
                      </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#1081b7]">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Dynamic PDF First Page Preview Box */}
          <div className="lg:col-span-12">
            <div className="flex items-center justify-between border-b border-[#38aae3]/20 pb-3">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {currentTitle}
                </h2>
              </div>

              <a
                href={currentFilePath}
                download
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1081b7] hover:bg-[#116c9c] text-white text-xs font-bold shadow transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>

            {/* Dynamic PDF / Image Viewer Container */}
            <div className={`w-full rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-inner relative flex items-center justify-center ${resourceCategory === 'duas' ? 'aspect-[4/1] bg-slate-100' : 'h-[520px]'}`}>
              {resourceCategory === 'duas' ? (
                <div className="relative w-full h-full p-2 flex items-center justify-center">
                  <Image
                    src={currentFilePath}
                    alt={currentTitle}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              ) : (
                <QuranPdfViewer
                  key={`${resourceCategory}-${selectedId}`}
                  src={currentFilePath}
                  title={`${currentTitle} PDF Preview`}
                />
              )}
            </div>

          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <ResourceFooter />
    </div>
  );
}
