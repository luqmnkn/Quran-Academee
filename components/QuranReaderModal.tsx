'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, BookOpen, Layers, ChevronLeft, ChevronRight, Maximize2, Minimize2, Loader2 } from 'lucide-react';
import { SURAHS, JUZ_LIST } from '@/lib/quranData';
import Logo from './Logo';
import dynamic from 'next/dynamic';

const QuranPdfViewer = dynamic(() => import('@/components/QuranPdfViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center w-full h-full bg-slate-100 text-[#1081b7] gap-3">
      <div className="w-6 h-6 border-2 border-[#1081b7] border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-semibold">Loading Quran...</span>
    </div>
  ),
});

interface QuranReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType: 'surah' | 'juz';
  initialId: number;
}

export default function QuranReaderModal({
  isOpen,
  onClose,
  initialType,
  initialId,
}: QuranReaderModalProps) {
  const [contentType, setContentType] = useState<'surah' | 'juz'>(initialType);
  const [currentId, setCurrentId] = useState<number>(initialId);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync state if initial props change while open
  useEffect(() => {
    setContentType(initialType);
    setCurrentId(initialId);
  }, [initialType, initialId]);

  const currentSurah = SURAHS.find((s) => s.id === currentId) || SURAHS[0];
  const currentJuz = JUZ_LIST.find((j) => j.id === currentId) || JUZ_LIST[0];
  const currentFilePath = contentType === 'surah' ? currentSurah.filePath : currentJuz.filePath;

  // Extract pure Quran images from Surah HTML files to load cleanly without script errors
  useEffect(() => {
    if (!isOpen || contentType !== 'surah') {
      setHtmlContent('');
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    fetch(currentFilePath)
      .then((res) => res.text())
      .then((text) => {
        if (!isMounted) return;

        // Match surah_images container
        const imagesMatch = text.match(/<div class="surah_images">([\s\S]*?)<\/div>/i);
        let extractedImages = '';

        if (imagesMatch && imagesMatch[1]) {
          extractedImages = imagesMatch[1];
        } else {
          // Fallback: extract all img tags with surah-images
          const imgRegex = /<img[^>]+src=["']([^"']*surah-images[^"']*)["'][^>]*>/gi;
          const matches = [...text.matchAll(imgRegex)];
          extractedImages = matches.map((m) => m[0]).join('\n');
        }

        if (extractedImages) {
          const cleanDoc = `
            <!DOCTYPE html>
            <html lang="ar">
              <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <style>
                  * { box-sizing: border-box; }
                  body {
                    margin: 0;
                    padding: 24px 16px;
                    background-color: #f8fafc;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 24px;
                    font-family: system-ui, -apple-system, sans-serif;
                  }
                  .surah-container {
                    width: 100%;
                    max-width: 850px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 24px;
                  }
                  img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 16px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
                    border: 1px solid #e2e8f0;
                    background: #ffffff;
                    display: block;
                  }
                </style>
              </head>
              <body>
                <div class="surah-container">
                  ${extractedImages}
                </div>
              </body>
            </html>
          `;
          setHtmlContent(cleanDoc);
        } else {
          // Fallback if no surah_images matched
          const sanitized = text
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/header/gi, 'div')
            .replace(/footer/gi, 'div');
          setHtmlContent(sanitized);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching Surah HTML:', err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, contentType, currentFilePath]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (contentType === 'surah') {
      if (currentId < 114) setCurrentId(currentId + 1);
    } else {
      if (currentId < 30) setCurrentId(currentId + 1);
    }
  };

  const handlePrev = () => {
    if (contentType === 'surah') {
      if (currentId > 1) setCurrentId(currentId - 1);
    } else {
      if (currentId > 1) setCurrentId(currentId - 1);
    }
  };

  const currentTitle =
    contentType === 'surah'
      ? `${currentSurah.id}. ${currentSurah.name}`
      : `${currentJuz.name}`;

  const currentArabic = contentType === 'surah' ? currentSurah.arabic : currentJuz.arabic;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-2 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
            isFullscreen
              ? 'w-full h-full rounded-none'
              : 'w-full max-w-5xl h-[92vh] border border-[#38aae3]/20'
          }`}
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-gradient-to-r from-[#116c9c] via-[#1081b7] to-[#0e94d3] text-white shadow-md">
            {/* Left: Brand Logo & Type Switcher */}
            <div className="flex items-center gap-3">
              <Logo isDarkBg={true} sizeClass="h-7 sm:h-8" />

              <div className="hidden sm:flex items-center gap-1 bg-white/10 rounded-lg p-1 border border-white/20">
                <button
                  onClick={() => setContentType('surah')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    contentType === 'surah'
                      ? 'bg-white text-[#116c9c] shadow-sm'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <BookOpen className="inline-block w-3.5 h-3.5 mr-1" />
                  Surah
                </button>
                <button
                  onClick={() => setContentType('juz')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    contentType === 'juz'
                      ? 'bg-white text-[#116c9c] shadow-sm'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <Layers className="inline-block w-3.5 h-3.5 mr-1" />
                  Juz
                </button>
              </div>

              {/* Selector Dropdown */}
              <select
                value={currentId}
                onChange={(e) => setCurrentId(Number(e.target.value))}
                className="bg-white/10 text-white font-medium text-xs sm:text-sm rounded-lg px-2.5 py-1.5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer"
              >
                {contentType === 'surah'
                  ? SURAHS.map((s) => (
                      <option key={s.id} value={s.id} className="text-slate-900 font-sans">
                        {s.id}. {s.name} ({s.arabic})
                      </option>
                    ))
                  : JUZ_LIST.map((j) => (
                      <option key={j.id} value={j.id} className="text-slate-900 font-sans">
                        {j.name} ({j.arabic})
                      </option>
                    ))}
              </select>
            </div>

            {/* Middle Title */}
            <div className="hidden md:flex items-center gap-2 text-center">
              <span className="font-bold text-sm tracking-wide">{currentTitle}</span>
              <span className="text-base font-arabic text-amber-200">{currentArabic}</span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1 border border-white/20">
                <button
                  onClick={handlePrev}
                  disabled={currentId <= 1}
                  className="p-1 hover:bg-white/20 rounded disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs px-1 font-mono font-bold">{currentId}</span>
                <button
                  onClick={handleNext}
                  disabled={
                    contentType === 'surah' ? currentId >= 114 : currentId >= 30
                  }
                  className="p-1 hover:bg-white/20 rounded disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <a
                href={currentFilePath}
                download
                className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
                title="Download PDF / File"
              >
                <Download className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="hidden sm:block p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={onClose}
                className="p-2 bg-white/10 hover:bg-red-500/80 rounded-lg transition-colors text-white ml-1"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Viewer Frame */}
          <div className="flex-1 bg-slate-100 relative overflow-hidden flex items-center justify-center">
            {isLoading ? (
              <div className="flex flex-col items-center gap-3 text-[#1081b7]">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="text-xs font-semibold">Loading Quran Recitation Script...</span>
              </div>
            ) : contentType === 'surah' ? (
              <iframe
                srcDoc={htmlContent}
                title={currentTitle}
                className="w-full h-full border-none bg-[#f8fafc]"
              />
            ) : (
              <QuranPdfViewer
                src={currentFilePath}
                title={currentTitle}
              />
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
