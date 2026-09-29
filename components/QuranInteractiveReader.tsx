'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Settings,
  X,
  Play,
  Pause,
  BookOpen,
  Sun,
  Moon,
  Info,
  ZoomIn,
  ZoomOut,
  Layers
} from 'lucide-react';
import {
  getSurahVersesMadani,
  getSurahAudioUrl,
  getJuzVerses,
  VerseItem,
  POPULAR_RECITERS
} from '@/lib/quranApi';

interface QuranInteractiveReaderProps {
  contentType: 'surah' | 'juz';
  currentId: number;
  currentTitle: string;
  currentFilePath: string;
  onSelectSurahOrJuz?: (type: 'surah' | 'juz', id: number) => void;
  onOpenDrawer?: (type: 'surah' | 'juz') => void;
  className?: string;
}

export default function QuranInteractiveReader({
  contentType,
  currentId,
  currentTitle,
  currentFilePath,
  onSelectSurahOrJuz,
  onOpenDrawer,
  className = ''
}: QuranInteractiveReaderProps) {
  // Theme state: 'light' | 'dark' | 'sepia'
  const [theme, setTheme] = useState<'light' | 'dark' | 'sepia'>('light');

  // Font Size in pixels
  const [fontSize, setFontSize] = useState<number>(32);

  // Verses & Loading State
  const [verses, setVerses] = useState<VerseItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Audio State
  const [selectedReciter, setSelectedReciter] = useState<number>(7); // Mishary Rashid Alafasy
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Modals & Panels State
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load Quran.com API data
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    async function loadData() {
      try {
        let fetchedVerses: VerseItem[] = [];

        if (contentType === 'surah') {
          fetchedVerses = await getSurahVersesMadani(currentId);
        } else {
          fetchedVerses = await getJuzVerses(currentId, 'madani');
        }

        if (isMounted) {
          setVerses(fetchedVerses);
          setIsLoading(false);
        }
      } catch (err: any) {
        console.error('Quran API Error:', err);
        if (isMounted) {
          setError('Unable to load verses. Please check your internet connection.');
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [contentType, currentId]);

  // Load Audio Recitation for Surah
  useEffect(() => {
    if (contentType !== 'surah') {
      setAudioUrl(null);
      return;
    }

    let isMounted = true;
    getSurahAudioUrl(currentId, selectedReciter)
      .then((url) => {
        if (isMounted && url) {
          setAudioUrl(url);
          setIsPlaying(false);
        }
      })
      .catch((err) => console.error('Audio fetch error:', err));

    return () => {
      isMounted = false;
    };
  }, [contentType, currentId, selectedReciter]);

  // Audio Handlers
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((e) => console.error('Audio play error:', e));
      setIsPlaying(true);
    }
  };

  // Theme styling mapping
  const themeClasses = {
    light: 'bg-[#f8fafc] text-slate-900',
    dark: 'bg-[#0f172a] text-slate-100',
    sepia: 'bg-[#f8f1e1] text-[#3d2b1f]'
  }[theme];

  const cardThemeClasses = {
    light: 'bg-white text-slate-900 border-slate-200/80 shadow-md',
    dark: 'bg-[#1e293b] text-slate-100 border-slate-700/80 shadow-xl',
    sepia: 'bg-[#fbf5e6] text-[#3d2b1f] border-[#e2d5b6] shadow-md'
  }[theme];

  const bismillahThemeClasses = {
    light: 'bg-white/70 border-slate-200/60 text-[#116c9c]',
    dark: 'bg-slate-800/70 border-slate-700/60 text-[#38aae3]',
    sepia: 'bg-[#f5e7cb]/80 border-[#e2d5b6] text-amber-900'
  }[theme];

  return (
    <div className={`w-full h-full flex flex-col relative overflow-hidden transition-colors duration-300 ${themeClasses} ${className}`}>
      {/* Hidden Audio Player */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Reader Container Main Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden w-full max-w-full">
        {/* Top Header */}
        <div className="flex items-center justify-between px-3 py-2.5 sm:px-6 sm:py-3.5 bg-gradient-to-r from-[#116c9c] via-[#1081b7] to-[#0e94d3] text-white shadow-md select-none shrink-0 w-full max-w-full z-10">
          <div className="w-8" />

          {/* Centered Title */}
          <div className="flex items-center gap-2 max-w-full truncate px-2">
            <h2 className="text-sm sm:text-lg font-bold tracking-tight truncate leading-tight text-center">
              {currentTitle}
            </h2>
          </div>

          {/* Top Right Quick Reciter Play Button (if audio available) */}
          {contentType === 'surah' && audioUrl ? (
            <button
              onClick={togglePlay}
              className="p-2 bg-white/10 hover:bg-white/20 active:scale-95 rounded-xl transition-all flex items-center gap-1.5 text-white"
              title={isPlaying ? 'Pause Audio' : 'Play Audio'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="hidden sm:inline text-xs font-semibold">
                {isPlaying ? 'Pause' : 'Play Audio'}
              </span>
            </button>
          ) : (
            <div className="w-8" />
          )}
        </div>

        {/* Main Content Area: Centered Ayah lines */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-8 relative w-full scroll-smooth">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-[#1081b7] p-8">
              <div className="w-8 h-8 border-3 border-[#1081b7] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs sm:text-sm font-semibold">Loading Sacred Text...</span>
            </div>
          ) : error ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center max-w-md mx-auto">
              <Info className="w-8 h-8 text-amber-500" />
              <p className="text-xs sm:text-sm font-semibold">{error}</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
              {/* Bismillah Header (Except Surah 9 Taubah) */}
              {contentType === 'surah' && currentId !== 9 && (
                <div className={`text-center py-4 sm:py-6 rounded-2xl border shadow-sm ${bismillahThemeClasses}`}>
                  <h2 className="text-2xl sm:text-3xl font-quran-madani leading-relaxed font-bold">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </h2>
                </div>
              )}

              {/* Quran Text Container: One Ayah per Line & Centered */}
              <div className={`${cardThemeClasses} rounded-3xl p-5 sm:p-10 transition-colors duration-300`}>
                {verses.map((verse, idx) => (
                  <div
                    key={verse.id || idx}
                    id={`ayah-${verse.verse_number || idx + 1}`}
                    className="w-full text-center py-3 sm:py-5 border-b border-slate-100/30 dark:border-slate-800/40 last:border-none leading-[2.4] sm:leading-[2.8] select-text"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    <span className="font-quran-madani text-center inline">
                      {verse.text_uthmani || verse.text_indopak}
                    </span>
                    <span className="inline-block text-[#1081b7] dark:text-[#38aae3] mx-2.5 text-xl font-bold select-none">
                      ۝
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Floating Bottom Navigation Bar (Settings | Surah List | Juz List) */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md p-1.5 sm:p-2 rounded-full border border-white/20 shadow-2xl max-w-[calc(100vw-32px)]">
          {/* Button 1: Settings (Left Side) */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white touch-manipulation"
            title="Reader Settings"
          >
            <Settings className="w-4 h-4 text-amber-400" />
            <span className="text-[11px] sm:text-xs">Settings</span>
          </button>

          {/* Button 2: Surah List (1-114) */}
          <button
            onClick={() => onOpenDrawer && onOpenDrawer('surah')}
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap touch-manipulation ${
              contentType === 'surah'
                ? 'bg-gradient-to-r from-[#1081b7] to-[#38aae3] text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Surah List (1-114)</span>
          </button>

          {/* Button 3: Juz List (1-30) */}
          <button
            onClick={() => onOpenDrawer && onOpenDrawer('juz')}
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap touch-manipulation ${
              contentType === 'juz'
                ? 'bg-gradient-to-r from-[#1081b7] to-[#38aae3] text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Juz List (1-30)</span>
          </button>
        </div>
      </div>

      {/* SETTINGS DRAWER / POPOVER */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-2 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom duration-200">
            {/* Settings Header */}
            <div className="p-4 bg-gradient-to-r from-[#116c9c] to-[#1081b7] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-sm sm:text-base">Reader Preferences &amp; Settings</h3>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-6 overflow-y-auto text-xs text-slate-800 dark:text-slate-100">
              {/* 1. Theme Selection (Light / Dark / Sepia) */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                  1. Reader Theme
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setTheme('light')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                      theme === 'light'
                        ? 'border-[#1081b7] bg-blue-50 text-[#1081b7] shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span>Light</span>
                  </button>

                  <button
                    onClick={() => setTheme('dark')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                      theme === 'dark'
                        ? 'border-[#1081b7] bg-slate-800 text-blue-400 shadow-sm'
                        : 'border-slate-700 bg-slate-900 text-slate-300'
                    }`}
                  >
                    <Moon className="w-4 h-4 text-blue-400" />
                    <span>Dark</span>
                  </button>

                  <button
                    onClick={() => setTheme('sepia')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                      theme === 'sepia'
                        ? 'border-amber-700 bg-[#f7e8c8] text-amber-900 shadow-sm'
                        : 'border-[#ebd6af] bg-[#fbf0d9] text-amber-800'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 text-amber-700" />
                    <span>Sepia</span>
                  </button>
                </div>
              </div>

              {/* 2. Font Size / Zoom Controls */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                    2. Arabic Text Font Size (Zoom)
                  </label>
                  <span className="font-mono font-bold text-[#1081b7]">{fontSize}px</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setFontSize((f) => Math.max(f - 3, 20))}
                    className="p-2 bg-white dark:bg-slate-700 hover:bg-slate-100 rounded-xl font-bold shadow-sm"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>

                  <input
                    type="range"
                    min="20"
                    max="52"
                    step="2"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="flex-1 accent-[#1081b7] cursor-pointer"
                  />

                  <button
                    onClick={() => setFontSize((f) => Math.min(f + 3, 52))}
                    className="p-2 bg-white dark:bg-slate-700 hover:bg-slate-100 rounded-xl font-bold shadow-sm"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3. Audio Reciter Selector */}
              {contentType === 'surah' && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                    3. Reciter Voice
                  </label>
                  <select
                    value={selectedReciter}
                    onChange={(e) => setSelectedReciter(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold rounded-xl px-3 py-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#1081b7]"
                  >
                    {POPULAR_RECITERS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Universal Quranic Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Noto+Naskh+Arabic:wght@400;600;700&family=Scheherazade+New:wght@400;600;700&display=swap');

        .font-quran-madani {
          font-family: 'Amiri Quran', 'Scheherazade New', 'Noto Naskh Arabic', 'Traditional Arabic', serif;
        }
      `}</style>
    </div>
  );
}
