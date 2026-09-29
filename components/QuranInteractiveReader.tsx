'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Settings,
  X,
  Volume2,
  Play,
  Pause,
  BookOpen,
  Sparkles,
  Languages,
  Check,
  Sun,
  Moon,
  Info,
  ZoomIn,
  ZoomOut,
  ChevronRight,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  getSurahVersesTajweed,
  getSurahVersesMadani,
  getSurahVersesIndopak,
  getSurahTranslation,
  getSurahAudioUrl,
  getJuzVerses,
  VerseItem,
  POPULAR_RECITERS
} from '@/lib/quranApi';
import { SURAHS, JUZ_LIST } from '@/lib/quranData';

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

  // Script type: 'madani' | 'indopak'
  const [scriptType, setScriptType] = useState<'madani' | 'indopak'>('madani');

  // Tajweed toggle: boolean
  const [isTajweedEnabled, setIsTajweedEnabled] = useState<boolean>(true);

  // Translation language: 'none' | 'en' | 'ur'
  const [translationLang, setTranslationLang] = useState<'none' | 'en' | 'ur'>('none');

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
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);

  // Modals & Panels State
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [showTajweedGuide, setShowTajweedGuide] = useState<boolean>(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [targetAyah, setTargetAyah] = useState<string>('');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Determine active view mode based on toggles
  const activeMode =
    translationLang !== 'none'
      ? 'translation'
      : isTajweedEnabled
      ? 'tajweed'
      : scriptType;

  // Load Quran.com API data
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    async function loadData() {
      try {
        let fetchedVerses: VerseItem[] = [];

        if (contentType === 'surah') {
          if (translationLang !== 'none') {
            fetchedVerses = await getSurahTranslation(currentId, translationLang);
          } else if (isTajweedEnabled) {
            fetchedVerses = await getSurahVersesTajweed(currentId);
          } else if (scriptType === 'indopak') {
            fetchedVerses = await getSurahVersesIndopak(currentId);
          } else {
            fetchedVerses = await getSurahVersesMadani(currentId);
          }
        } else {
          // Juz mode
          const mode = isTajweedEnabled ? 'tajweed' : scriptType;
          fetchedVerses = await getJuzVerses(currentId, mode as any);
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
  }, [contentType, currentId, activeMode, translationLang, isTajweedEnabled, scriptType]);

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
          setAudioProgress(0);
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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setAudioProgress(audioRef.current.currentTime);
      setAudioDuration(audioRef.current.duration || 0);
    }
  };

  // Theme styling mapping
  const themeClasses = {
    light: 'bg-white text-slate-900',
    dark: 'bg-[#0f172a] text-slate-100',
    sepia: 'bg-[#fbf0d9] text-[#3d2b1f]'
  }[theme];

  const cardBorderClasses = {
    light: 'border-slate-100 hover:bg-slate-50/60',
    dark: 'border-slate-800/80 hover:bg-slate-800/40',
    sepia: 'border-[#eedfc3] hover:bg-[#f5e5c8]/50'
  }[theme];

  // Search Results
  const filteredSurahs = SURAHS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.arabic.includes(searchQuery) ||
      s.id.toString() === searchQuery.trim()
  );

  const handleJumpToAyah = () => {
    const num = parseInt(targetAyah.trim());
    if (!isNaN(num) && num > 0 && num <= verses.length) {
      const el = document.getElementById(`ayah-${num}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setIsSearchOpen(false);
        setTargetAyah('');
      }
    }
  };

  return (
    <div className={`w-full h-full flex flex-col relative overflow-hidden transition-colors duration-300 ${themeClasses} ${className}`}>
      {/* Hidden Audio Player */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Reader Container Main Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden w-full max-w-full">
        {/* Top Container Header with Search Icon on Left */}
        <div className="flex items-center justify-between px-3 py-2.5 sm:px-6 sm:py-3.5 bg-gradient-to-r from-[#116c9c] via-[#1081b7] to-[#0e94d3] text-white shadow-md select-none shrink-0 w-full max-w-full z-10">
          {/* Top Left Search Icon Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 bg-white/10 hover:bg-white/20 active:scale-95 rounded-xl transition-all flex items-center gap-1.5 text-white"
            title="Advanced Search & Jump to Ayah"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline text-xs font-semibold">Search</span>
          </button>

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

        {/* Main Content Area (Continuous Recitation View vs Verse Translation View) */}
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
          ) : translationLang === 'none' ? (
            /* RECITATION MODE: Continuous Flowing Quranic Text (Physical Mushaf Experience) */
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
              {/* Bismillah Header (Except Surah 9 Taubah) */}
              {contentType === 'surah' && currentId !== 9 && currentId !== 1 && (
                <div className="text-center py-4 sm:py-6 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                  <span className="text-2xl sm:text-3xl font-arabic text-[#116c9c] dark:text-[#38aae3] leading-relaxed">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </span>
                </div>
              )}

              {/* Continuous Text Paragraph */}
              <div
                className="bg-white/80 dark:bg-slate-800/80 rounded-3xl p-5 sm:p-10 shadow-lg border border-slate-200/60 dark:border-slate-700/60 text-right leading-[2.4] sm:leading-[2.8] select-text dir-rtl"
                style={{ fontSize: `${fontSize}px` }}
              >
                {verses.map((verse, idx) => (
                  <React.Fragment key={verse.id || idx}>
                    <span id={`ayah-${verse.verse_number || idx + 1}`} className="inline">
                      {isTajweedEnabled && verse.text_uthmani_tajweed ? (
                        <span
                          dangerouslySetInnerHTML={{ __html: verse.text_uthmani_tajweed }}
                          className="tajweed-text inline"
                        />
                      ) : scriptType === 'indopak' && verse.text_indopak ? (
                        <span className="font-indopak">{verse.text_indopak}</span>
                      ) : (
                        <span className="font-arabic">{verse.text_uthmani || verse.text_indopak}</span>
                      )}
                    </span>
                    {/* Standard Quranic Ayah Symbol with Number ONLY */}
                    <span className="inline-block text-[#1081b7] dark:text-[#38aae3] mx-1.5 sm:mx-2 font-mono font-bold select-none">
                      ۝{verse.verse_number || idx + 1}
                    </span>
                    {' '}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ) : (
            /* TRANSLATION MODE: Line-by-Line / Verse-by-Verse with English or Urdu Translation */
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
              {/* Bismillah Header */}
              {contentType === 'surah' && currentId !== 9 && currentId !== 1 && (
                <div className="text-center py-4 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-slate-200/50 shadow-sm">
                  <span className="text-2xl sm:text-3xl font-arabic text-[#116c9c] dark:text-[#38aae3]">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </span>
                </div>
              )}

              <div className="space-y-4">
                {verses.map((verse, idx) => (
                  <div
                    id={`ayah-${verse.verse_number || idx + 1}`}
                    key={verse.id || idx}
                    className={`p-4 sm:p-6 rounded-2xl border transition-all ${cardBorderClasses}`}
                  >
                    {/* Arabic Text with Ayah End Symbol */}
                    <div
                      className="text-right font-arabic leading-[2.3] text-slate-900 dark:text-slate-100 select-text"
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      <span>{verse.text_uthmani || verse.text_indopak}</span>
                      <span className="inline-block text-[#1081b7] dark:text-[#38aae3] mx-2 font-mono font-bold select-none">
                        ۝{verse.verse_number || idx + 1}
                      </span>
                    </div>

                    {/* Translation Text Below */}
                    {verse.translation && (
                      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                        <p className={translationLang === 'ur' ? 'font-serif text-right text-sm sm:text-base' : 'italic'}>
                          {verse.translation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Floating Bottom Navigation Bar: EXACTLY 3 BUTTONS (Settings | Surah List | Juz List) */}
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

      {/* ADVANCED SEARCH MODAL (Triggered by Top-Left Search Icon) */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in duration-200">
            {/* Search Header */}
            <div className="p-4 bg-gradient-to-r from-[#116c9c] to-[#1081b7] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                <h3 className="font-bold text-sm sm:text-base">Advanced Quran Search</h3>
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto">
              {/* Jump to Specific Ayah */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#1081b7]" /> Jump to Ayah Number in Current Surah:
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={targetAyah}
                    onChange={(e) => setTargetAyah(e.target.value)}
                    placeholder={`Enter Ayah (1 - ${verses.length || 286})...`}
                    className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:border-[#1081b7] focus:outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && handleJumpToAyah()}
                  />
                  <button
                    onClick={handleJumpToAyah}
                    className="px-4 py-2 bg-[#1081b7] text-white text-xs font-bold rounded-xl hover:bg-[#116c9c] transition-colors"
                  >
                    Go
                  </button>
                </div>
              </div>

              {/* Filter Surahs by Name or Number */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Filter Surah by Name or Number:</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type Surah name (e.g. Yaseen, Rahman, 36)..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:border-[#1081b7] focus:outline-none"
                />
              </div>

              {/* Surahs List Results */}
              <div className="space-y-1 max-h-60 overflow-y-auto divide-y divide-slate-100 pr-1">
                {filteredSurahs.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      if (onSelectSurahOrJuz) onSelectSurahOrJuz('surah', s.id);
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-[#1081b7]/10 text-[#1081b7] font-bold text-xs flex items-center justify-center">
                        {s.id}
                      </span>
                      <span className="text-xs font-bold text-slate-800">{s.name}</span>
                    </div>
                    <span className="text-sm font-arabic font-bold text-[#116c9c]">{s.arabic}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS DRAWER / POPOVER (Triggered by Bottom Left Settings Button) */}
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

              {/* 2. Script Type / Font Style (Madani vs IndoPak) */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                  2. Script &amp; Font Style (Mushaf)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setScriptType('madani')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                      scriptType === 'madani'
                        ? 'border-[#1081b7] bg-blue-50 text-[#1081b7] shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                    }`}
                  >
                    <span>Madani Uthmani</span>
                  </button>

                  <button
                    onClick={() => setScriptType('indopak')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                      scriptType === 'indopak'
                        ? 'border-[#1081b7] bg-blue-50 text-[#1081b7] shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                    }`}
                  >
                    <span>IndoPak Script</span>
                  </button>
                </div>
              </div>

              {/* 3. Tajweed Color Rules Toggle */}
              <div className="flex items-center justify-between bg-amber-50 dark:bg-amber-950/30 p-3.5 rounded-2xl border border-amber-200 dark:border-amber-900/50">
                <div className="space-y-0.5">
                  <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Tajweed Color Rules
                  </span>
                  <p className="text-[10px] text-amber-700 dark:text-amber-300">
                    Color-code Ghunna, Ikhfa, Qalqalah, Idgham &amp; Madd.
                  </p>
                </div>
                <button
                  onClick={() => setIsTajweedEnabled(!isTajweedEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    isTajweedEnabled ? 'bg-[#1081b7]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      isTajweedEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 4. Translation Language Selector (Off / English / Urdu) */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                  4. Translation Language
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setTranslationLang('none')}
                    className={`p-2.5 rounded-xl border font-bold text-center transition-all ${
                      translationLang === 'none'
                        ? 'border-[#1081b7] bg-blue-50 text-[#1081b7] shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                    }`}
                  >
                    Off (Recitation)
                  </button>

                  <button
                    onClick={() => setTranslationLang('en')}
                    className={`p-2.5 rounded-xl border font-bold text-center transition-all ${
                      translationLang === 'en'
                        ? 'border-[#1081b7] bg-blue-50 text-[#1081b7] shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                    }`}
                  >
                    English
                  </button>

                  <button
                    onClick={() => setTranslationLang('ur')}
                    className={`p-2.5 rounded-xl border font-bold text-center transition-all ${
                      translationLang === 'ur'
                        ? 'border-[#1081b7] bg-blue-50 text-[#1081b7] shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                    }`}
                  >
                    Urdu (اردو)
                  </button>
                </div>
              </div>

              {/* 5. Font Size / Zoom Controls */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                    5. Arabic Text Font Size (Zoom)
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

              {/* 6. Audio Reciter Selector */}
              {contentType === 'surah' && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                    6. Reciter Voice
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

      {/* Tajweed Color Rules Custom Styling */}
      <style jsx global>{`
        .tajweed-text .tajweed-ghunna,
        .tajweed-text .ghunna {
          color: #ff7e1e !important;
          font-weight: 600;
        }
        .tajweed-text .tajweed-ikhfa,
        .tajweed-text .ikhfa {
          color: #d9383a !important;
          font-weight: 600;
        }
        .tajweed-text .tajweed-idgham,
        .tajweed-text .idgham {
          color: #10b981 !important;
          font-weight: 600;
        }
        .tajweed-text .tajweed-qalqalah,
        .tajweed-text .qalqalah {
          color: #3b82f6 !important;
          font-weight: 700;
        }
        .tajweed-text .tajweed-madd,
        .tajweed-text .madd,
        .tajweed-text .madd_2,
        .tajweed-text .madd_4,
        .tajweed-text .madd_6 {
          color: #9333ea !important;
          font-weight: 700;
        }
        .tajweed-text .tajweed-iqlab,
        .tajweed-text .iqlab {
          color: #db2777 !important;
          font-weight: 600;
        }
        .tajweed-text .tajweed-ham_wasl {
          color: #94a3b8 !important;
        }
        .tajweed-text .tajweed-slnt {
          color: #a1a1aa !important;
        }
      `}</style>
    </div>
  );
}
