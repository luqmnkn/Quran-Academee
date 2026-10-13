'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f0f9ff] to-[#d7effa] text-slate-800 pt-20 sm:pt-24 pb-16 overflow-x-clip">
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
          <div className="flex flex-wrap items-center justify-center gap-2 bg-[#f0f9ff] p-1.5 rounded-none shadow-md border border-[#38aae3]/25">
            <button
              onClick={() => handleCategoryChange('surahs')}
              className={`px-5 sm:px-7 py-2.5 rounded-none text-xs font-bold transition-all flex items-center gap-2 ${
                resourceCategory === 'surahs'
                  ? 'bg-[#1081b7] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#1081b7]'
              }`}
            >
              <span>114 Surahs</span>
            </button>
            <button
              onClick={() => handleCategoryChange('juz')}
              className={`px-5 sm:px-7 py-2.5 rounded-none text-xs font-bold transition-all flex items-center gap-2 ${
                resourceCategory === 'juz'
                  ? 'bg-[#1081b7] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#1081b7]'
              }`}
            >
              <span>30 Paras (Juz)</span>
            </button>
            <button
              onClick={() => handleCategoryChange('duas')}
              className={`px-5 sm:px-7 py-2.5 rounded-none text-xs font-bold transition-all flex items-center gap-2 ${
                resourceCategory === 'duas'
                  ? 'bg-[#1081b7] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#1081b7]'
              }`}
            >
              <span>28 Daily Duas</span>
            </button>
          </div>
        </div>

        {/* Clean 2-Column Interface: Selector & Info on Left, Live Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols): Selector, Attributes & Direct Download */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-[#38aae3]/25 shadow-md rounded-none space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1081b7] uppercase tracking-wider">
                Select {resourceCategory === 'surahs' ? 'Surah' : resourceCategory === 'juz' ? 'Para (Juz)' : 'Daily Dua'}
              </label>

              {/* Styled Dropdown Menu */}
              <div className="relative">
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(Number(e.target.value))}
                  className="w-full bg-white text-slate-900 font-bold text-sm sm:text-base rounded-none px-4 py-3.5 border-2 border-[#38aae3]/30 focus:border-[#1081b7] focus:outline-none shadow-sm cursor-pointer appearance-none transition-all pr-10"
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

            {/* Quick Details Card */}
            <div className="p-4 bg-[#f0f9ff] border border-[#38aae3]/20 space-y-3 text-xs rounded-none">
              <div className="flex items-center justify-between pb-2 border-b border-[#38aae3]/15">
                <span className="font-bold text-slate-900 text-sm">{currentTitle}</span>
                <span className="font-arabic font-bold text-lg text-[#116c9c]">{currentArabic}</span>
              </div>

              {resourceCategory === 'surahs' && (
                <div className="space-y-1.5 text-slate-600">
                  <p><strong>Total Verses:</strong> {selectedSurah.verses} Ayat</p>
                  <p><strong>Revelation:</strong> {selectedSurah.type}</p>
                  <p><strong>Theme:</strong> {selectedSurah.theme}</p>
                </div>
              )}

              {resourceCategory === 'juz' && (
                <div className="space-y-1.5 text-slate-600">
                  <p><strong>Surah Range:</strong> {selectedJuz.startSurah}</p>
                  <p><strong>Verses Span:</strong> {selectedJuz.versesSpan}</p>
                  <p><strong>Core Focus:</strong> {selectedJuz.theme}</p>
                </div>
              )}

              {resourceCategory === 'duas' && (
                <div className="space-y-1.5 text-slate-600">
                  <p><strong>Category:</strong> {selectedDua.category}</p>
                  <p>{selectedDua.description}</p>
                </div>
              )}

              <div className="pt-2">
                <Link
                  href={currentDetailUrl}
                  className="text-[#1081b7] hover:underline font-bold inline-flex items-center gap-1 text-[11px]"
                >
                  View full dedicated page &amp; details &rarr;
                </Link>
              </div>
            </div>

            {/* Main Download CTA Button */}
            <a
              href={currentFilePath}
              download
              className="w-full py-4 px-6 rounded-none bg-gradient-to-r from-[#1081b7] to-[#116c9c] hover:from-[#116c9c] hover:to-[#1081b7] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download {resourceCategory === 'duas' ? 'Dua Image' : 'PDF Document'}</span>
            </a>
          </div>

          {/* Right Column (7 Cols): Live Preview */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-[#38aae3]/25 shadow-md rounded-none space-y-4">
            <div className="flex items-center justify-between border-b border-[#38aae3]/20 pb-3">
              <div>
                <span className="text-[11px] font-bold text-[#1081b7] uppercase tracking-wider block">
                  {resourceCategory === 'duas' ? 'Card Preview' : 'First Page Preview'}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {currentTitle}
                </h2>
              </div>

              <a
                href={currentFilePath}
                download
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-none bg-[#1081b7] hover:bg-[#116c9c] text-white text-xs font-bold shadow transition-all shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>

            {/* Preview Box */}
            <div className="w-full rounded-none overflow-hidden border border-slate-200 bg-slate-50 relative flex items-center justify-center min-h-[350px]">
              {resourceCategory === 'duas' ? (
                <div className="relative w-full h-[320px] sm:h-[400px] p-4 flex items-center justify-center bg-white">
                  <Image
                    src={currentFilePath}
                    alt={currentTitle}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              ) : (
                <div className="w-full flex items-center justify-center py-2">
                  <QuranPdfViewer
                    key={`${resourceCategory}-${selectedId}`}
                    src={currentFilePath}
                    title={`${currentTitle} PDF Preview`}
                  />
                </div>
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
