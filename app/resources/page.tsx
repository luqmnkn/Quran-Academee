'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { DOWNLOADABLE_RESOURCES, DUAS } from '@/lib/quranData';
import QuranReaderModal from '@/components/QuranReaderModal';
import ResourceFooter from '@/components/ResourceFooter';
import PremiumCarousel from '@/components/PremiumCarousel';

export default function ResourcesHubPage() {
  const [modalState, setModalState] = useState<{ isOpen: boolean; type: 'surah' | 'juz'; id: number }>({
    isOpen: false,
    type: 'surah',
    id: 1,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f0f9ff] to-[#d7effa] text-slate-800 pt-24 pb-16 overflow-x-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-[900] text-3xl sm:text-5xl text-[#0B3951] tracking-[-0.03em] leading-tight"
          >
            Explore Divine Guidance <br />
            <span className="font-allura text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951] font-normal">
              &amp; Educational Resources
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed"
          >
            Access our complete online Quran reader containing all 114 Surahs and 30 Juz with authentic translations, alongside daily authentic supplications (Duas) for daily Islamic living.
          </motion.p>
        </div>

        {/* Core Hub Modules Grid (2 Cards with Custom Images) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Card 1: Read Quran (Full BG Image with White Shade Gradient Overlay & White Text) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-3xl shadow-xl border border-slate-700/30 flex flex-col justify-between relative overflow-hidden group min-h-[260px]"
          >
            {/* Background Image */}
            <Image
              src="/images/readingicon.png"
              alt="Read Quran Online"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* White Shade Gradient Overlay: Dark cyan on text side to white glow shade on right side */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B3951]/95 via-[#1081b7]/75 to-white/40 z-0" />

            <div className="p-8 space-y-3 relative z-10 text-white w-full sm:w-[75%] max-w-[75%]">
              <h3 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">Read Quran</h3>
              <p className="text-white text-sm leading-relaxed drop-shadow-sm font-normal">
                Read all 114 Surahs and 30 Juz with authentic translations and clear formatting directly inside your browser. Search, jump, and study effortlessly.
              </p>
            </div>

            <div className="p-8 pt-0 relative z-10">
              <Link
                href="/resources/read"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-[#1C8DC8] to-[#146299] hover:from-[#146299] hover:to-[#1C8DC8] text-white font-bold text-sm transition-all shadow-lg text-center inline-block"
              >
                Read Quran
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Download Quran (Light Blue BG with 75% Text Width & PDF Icon on Right Side) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#f0f9ff] rounded-3xl p-8 shadow-xl border border-[#38aae3]/25 flex flex-col justify-between relative overflow-hidden group min-h-[260px]"
          >
            {/* PDF Icon Graphic aligned to Right Side */}
            <div className="absolute right-4 bottom-4 w-36 h-36 sm:w-44 sm:h-44 opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all pointer-events-none">
              <Image
                src="/images/pdficon.png"
                alt="Download Quran PDFs"
                width={176}
                height={176}
                className="object-contain"
              />
            </div>

            <div className="space-y-3 relative z-10 w-full sm:w-[75%] max-w-[75%]">
              <h3 className="text-2xl font-bold text-[#116c9c]">Download Quran &amp; Duas</h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                Download clear black &amp; white simple text PDFs for all 114 Surahs, 30 Juz, and authentic daily supplications (Duas) for offline reading and practice.
              </p>
            </div>

            <div className="pt-8 relative z-10">
              <Link
                href="/resources/downloads"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#1081b7] hover:bg-[#116c9c] text-white font-bold text-sm transition-colors shadow-md text-center inline-block"
              >
                Download Quran &amp; Duas
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Essential Daily Masnoon Duas Guide Showcase (Left Description & Right Document Preview) */}
        <div className="mt-16 bg-[#f0f9ff] rounded-3xl p-6 sm:p-10 border border-[#38aae3]/25 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Side: Rich Detailed Description */}
            <div className="lg:col-span-7 space-y-5">


              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B3951] leading-tight">
                Essential Daily Masnoon Duas Guide
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                This authentic educational resource provides essential daily supplications (Masnoon Duas) derived directly from Sahih Sunnah for every aspect of daily life — including morning and evening Adhkar, entering and leaving home, meals, travel, and protection against harm.
              </p>


              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href={`/resources/downloads/dua/${DUAS[0]?.slug || 'dua-when-starting-any-good-task'}`}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#1081b7] to-[#116c9c] hover:from-[#116c9c] hover:to-[#1081b7] text-white font-extrabold text-sm shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <span>Download Dua Cards</span>
                </Link>

                <Link
                  href="/resources/downloads"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#1081b7] border border-[#38aae3]/30 font-bold text-sm shadow-sm transition-all inline-flex items-center gap-2"
                >
                  <span>Explore All 28 Duas</span>
                </Link>
              </div>
            </div>

            {/* Right Side: Single Document Preview Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden group">
                <div className="relative h-72 sm:h-80 w-full rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src="/images/dua.jpg"
                    alt="Essential Daily Masnoon Duas Guide"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="pt-4 space-y-2 text-center">
                  <h3 className="text-base font-bold text-slate-900">
                    Masnoon Duas Handbook
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

       
      </div>

      {/* Reusable Footer CTA */}
      <ResourceFooter />

      {/* Reader Modal */}
      <QuranReaderModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        initialType={modalState.type}
        initialId={modalState.id}
      />
    </div>
  );
}
