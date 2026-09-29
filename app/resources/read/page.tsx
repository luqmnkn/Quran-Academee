'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, ArrowLeft, Download, X, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { SURAHS, JUZ_LIST } from '@/lib/quranData';
import ResourceFooter from '@/components/ResourceFooter';
import QuranInteractiveReader from '@/components/QuranInteractiveReader';

export default function OnlineReaderPage() {
  const [contentType, setContentType] = useState<'surah' | 'juz'>('surah');
  const [currentId, setCurrentId] = useState<number>(1);
  const [isListDrawerOpen, setIsListDrawerOpen] = useState<boolean>(false);
  const [drawerType, setDrawerType] = useState<'surah' | 'juz'>('surah');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentSurah = SURAHS.find((s) => s.id === currentId) || SURAHS[0];
  const currentJuz = JUZ_LIST.find((j) => j.id === currentId) || JUZ_LIST[0];

  const currentTitle =
    contentType === 'surah'
      ? `${currentSurah.name}`
      : `${currentJuz.name}`;


  const currentFilePath = contentType === 'surah' ? currentSurah.filePath : currentJuz.filePath;


  const openDrawer = (type: 'surah' | 'juz') => {
    setDrawerType(type);
    setIsListDrawerOpen(true);
    setSearchQuery('');
  };

  const filteredSurahs = SURAHS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.arabic.includes(searchQuery) ||
      s.id.toString() === searchQuery.trim()
  );

  const filteredJuz = JUZ_LIST.filter(
    (j) =>
      j.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.arabic.includes(searchQuery) ||
      j.id.toString() === searchQuery.trim()
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f0f9ff] to-[#d7effa] text-slate-800 pt-20 sm:pt-24 pb-12 sm:pb-16 px-2 sm:px-4 overflow-x-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto space-y-3 sm:space-y-4 w-full overflow-x-hidden">

        {/* Reader Container */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#38aae3]/25 overflow-hidden flex flex-col h-[calc(100vh-125px)] sm:h-[84vh] relative w-full max-w-full">
          <QuranInteractiveReader
            contentType={contentType}
            currentId={currentId}
            currentTitle={currentTitle}
            currentFilePath={currentFilePath}
            onOpenDrawer={openDrawer}
            onSelectSurahOrJuz={(type, id) => {
              setContentType(type);
              setCurrentId(id);
            }}
            className="w-full h-full border-none max-w-full"
          />
        </div>
      </div>

      {/* Slide-over Selection Drawer Modal */}
      <AnimatePresence>
        {isListDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-5 bg-gradient-to-r from-[#116c9c] to-[#1081b7] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                 
                 
                </div>
                <button
                  onClick={() => setIsListDrawerOpen(false)}
                  className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Search Filter Input */}
              <div className="p-4 border-b border-slate-100 bg-slate-50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1081b7]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      drawerType === 'surah'
                        ? 'Filter Surah by name or number...'
                        : 'Filter Juz by number...'
                    }
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:border-[#1081b7] focus:outline-none"
                  />
                </div>
              </div>

              {/* Drawer List Content */}
              <div className="flex-1 overflow-y-auto p-3 space-y-1.5 divide-y divide-slate-100">
                {drawerType === 'surah'
                  ? filteredSurahs.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setContentType('surah');
                          setCurrentId(s.id);
                          setIsListDrawerOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                          contentType === 'surah' && currentId === s.id
                            ? 'bg-[#f0f9ff] text-[#1081b7] font-bold border border-[#38aae3]/30 shadow-sm'
                            : 'hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-[#1081b7]/10 text-[#1081b7] font-bold text-xs flex items-center justify-center">
                            {s.id}
                          </span>
                          <span className="text-xs font-semibold">{s.name}</span>
                        </div>
                        <span className="text-base font-arabic font-bold text-[#116c9c]">{s.arabic}</span>
                      </button>
                    ))
                  : filteredJuz.map((j) => (
                      <button
                        key={j.id}
                        onClick={() => {
                          setContentType('juz');
                          setCurrentId(j.id);
                          setIsListDrawerOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                          contentType === 'juz' && currentId === j.id
                            ? 'bg-[#f0f9ff] text-[#1081b7] font-bold border border-[#38aae3]/30 shadow-sm'
                            : 'hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-[#1081b7]/10 text-[#1081b7] font-bold text-xs flex items-center justify-center">
                            J{j.id}
                          </span>
                          <span className="text-xs font-semibold">{j.name}</span>
                        </div>
                        <span className="text-base font-arabic font-bold text-[#116c9c]">{j.arabic}</span>
                      </button>
                    ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CTA Footer */}
      <ResourceFooter />
    </div>
  );
}
