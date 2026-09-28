'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../data';
import { Star, Quote, Play, Video, X, ChevronLeft, ChevronRight } from 'lucide-react';
import PremiumCarousel from './PremiumCarousel';

interface VideoTestimonial {
  id: string;
  studentName: string;
  age: string;
  courseName: string;
  duration: string;
  snippet: string;
  thumbnailGradient: string;
  videoUrl: string;
}

const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 'v1',
    studentName: 'Anabia',
    age: 'Young Learner',
    courseName: 'Tajweed & Recitation',
    duration: '6 Months with Quran Academee',
    snippet: 'Anabia reciting Quran with beautiful articulation and proper Makharij rules.',
    thumbnailGradient: 'from-[#1081b7]/30 via-[#38aae3]/20 to-[#116c9c]/40',
    videoUrl: '/video-reviews/Anabia.mp4',
  },
  {
    id: 'v2',
    studentName: 'Khadija',
    age: '1-on-1 Student',
    courseName: 'Quran Recitation Session',
    duration: '4 Months with Quran Academee',
    snippet: 'Live recitation session demonstrating clear pronunciation, confidence, and fluency.',
    thumbnailGradient: 'from-amber-500/20 via-[#1081b7]/25 to-[#0B3951]/20',
    videoUrl: '/video-reviews/khadija.mp4',
  },
  {
    id: 'v3',
    studentName: 'Yusra & Zohaib',
    age: 'Siblings',
    courseName: 'Hifz & Tajweed Practice',
    duration: '1 Year with Quran Academee',
    snippet: 'Interactive recitation practice showing impressive memorization and Tajweed retention.',
    thumbnailGradient: 'from-[#0e94d3]/20 via-[#1081b7]/25 to-[#116c9c]/30',
    videoUrl: '/video-reviews/Yusra Zohaib.mp4',
  },
];

// Component for individual video card on homepage
function VideoCardItem({
  video,
  onClick,
}: {
  video: VideoTestimonial;
  onClick: () => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <motion.div
      ref={containerRef}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={onClick}
      className="shrink-0 snap-center w-[80vw] sm:w-auto aspect-[9/14] sm:aspect-[3/4] bg-slate-900 rounded-[28px] border-2 border-[#1081b7]/30 overflow-hidden relative group cursor-pointer shadow-xl p-4 flex flex-col justify-between select-none"
    >
      {/* Background HTML5 Video Preview */}
      <video
        src={video.videoUrl}
        playsInline
        muted
        loop
        autoPlay
        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
      />

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent z-0" />

      {/* Play Overlay Icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/25 backdrop-blur-md border border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1081b7] transition-all duration-300 shadow-2xl">
          <Play className="w-7 h-7 text-white fill-current ml-1" />
        </div>
      </div>

      <div className="relative z-10 flex justify-between items-center">
        <span className="px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white font-bold text-[10px] tracking-wider uppercase">
          {video.age}
        </span>
      </div>

      {/* Bottom Card Meta Info */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/20 p-3.5 text-left shadow-lg relative z-10 text-white">
        <h4 className="font-display font-black text-sm text-white truncate mb-0.5">
          {video.studentName}
        </h4>
        <p className="text-[11px] text-slate-200 leading-snug line-clamp-2 font-normal">
          {video.snippet}
        </p>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState<'all' | 'Parent' | 'Adult Student'>('all');
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);

  const filtered =
    activeTab === 'all'
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.role === activeTab);

  // Keyboard Navigation for Video Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedVideoIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedVideoIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedVideoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : VIDEO_TESTIMONIALS.length - 1));
      } else if (e.key === 'ArrowRight') {
        setSelectedVideoIndex((prev) => (prev !== null && prev < VIDEO_TESTIMONIALS.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideoIndex]);

  const renderCardContent = (testimonial: (typeof TESTIMONIALS)[0]) => (
    <div className="bg-white rounded-2xl border border-[#E0F2FE] p-6 sm:p-7 md:p-8 flex flex-col justify-between h-full relative overflow-hidden group hover:border-[#1C8DC8]/40 hover:shadow-[0_15px_35px_rgba(28,141,200,0.06)] transition-all duration-300 text-left min-h-[260px]">
      <Quote className="absolute -bottom-6 -right-6 w-24 h-24 text-[#1C8DC8]/5 select-none pointer-events-none" />

      <div className="space-y-3 relative z-10">
        <div className="flex items-center space-x-0.5">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={13} className="text-[#1C8DC8] fill-[#1C8DC8]" />
          ))}
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          {testimonial.feedback}
        </p>
      </div>

      <div className="flex items-center space-x-3 pt-4 border-t border-[#E0F2FE] relative z-10 mt-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B3951] to-[#1C8DC8] text-white flex items-center justify-center font-display font-black text-xs select-none shadow shrink-0">
          {testimonial.avatarInitials}
        </div>
        <div>
          <h4 className="font-display font-[800] text-[#0B3951] text-xs">
            {testimonial.name}
          </h4>
          <p className="text-[9px] font-mono font-bold uppercase text-[#1C8DC8] tracking-wider mt-0.5">
            {testimonial.role} &bull; {testimonial.location}
          </p>
        </div>
      </div>
    </div>
  );

  const activeVideo = selectedVideoIndex !== null ? VIDEO_TESTIMONIALS[selectedVideoIndex] : null;

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white via-[#F0F9FF] to-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1C8DC8]/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header display segment */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-[#F0F9FF] border border-[#E0F2FE] px-4 py-2 shadow-sm">
            <Quote size={14} className="text-[#1C8DC8]" />
            <span className="text-xs font-bold text-[#146299] uppercase tracking-widest font-mono">
              Success Stories
            </span>
          </div>

          <h2 className="font-display font-[900] text-3xl sm:text-[45px] lg:text-[64px] text-[#0B3951] tracking-[-0.04em] leading-[1.05]">
            Hear From Our{' '}
            <span className="font-allura text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">
              Quran Learners
            </span>
          </h2>

          <p className="font-sans font-medium text-[18px] text-slate-600 max-w-lg mx-auto leading-relaxed">
            Discover how kids and adults master Tajweed foundations while discovering deeper meaning and practical life guidance.
          </p>

          {/* Filtering tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {(['all', 'Parent', 'Adult Student'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#0B3951] text-white border-[#0B3951] shadow'
                    : 'bg-white text-slate-600 border-[#E0F2FE] hover:bg-[#F0F9FF]'
                }`}
              >
                {tab === 'all' ? 'All Reviews' : `${tab}s`}
              </button>
            ))}
          </div>
        </div>

        {/* 1. DESKTOP VIEW: Adaptive Grid Layout */}
        <div className="hidden lg:grid grid-cols-2 gap-8 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((testimonial) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={testimonial.id}
              >
                {renderCardContent(testimonial)}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 2. MOBILE VIEW: Horizontal Snap Carousel */}
        <div className="block lg:hidden">
          <PremiumCarousel key={activeTab}>
            {filtered.map((testimonial) => (
              <div key={testimonial.id} className="h-full">
                {renderCardContent(testimonial)}
              </div>
            ))}
          </PremiumCarousel>
        </div>

        {/* Video Reviews Subsection */}
        <div className="mt-24 pt-16 border-t border-[#E0F2FE] relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-[#F0F9FF] border border-[#E0F2FE] px-3.5 py-1.5 shadow-sm">
              <Video size={13} className="text-[#1C8DC8]" />
              <span className="text-[10px] font-bold text-[#146299] uppercase tracking-widest font-mono">
                Student Recitation Videos
              </span>
            </div>
            <h3 className="font-display font-[900] text-2xl sm:text-[34px] text-[#0B3951] tracking-tight leading-none">
              Watch Our Students{' '}
              <span className="font-allura text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] to-[#146299]">
                Recite In Real-Time
              </span>
            </h3>
            <p className="font-sans font-medium text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
              Real recordings from 1-on-1 virtual sessions showing progress in Tajweed recitation, Hifz retention, and active reflection.
            </p>
          </div>

          {/* PORTRAIT VIDEO CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 sm:px-0">
            {VIDEO_TESTIMONIALS.map((video, idx) => (
              <VideoCardItem
                key={video.id}
                video={video}
                onClick={() => setSelectedVideoIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* FULL-SIZE VIDEO MODAL WITH BLURRED BACKDROP & PREV/NEXT CONTROLS */}
      {activeVideo && selectedVideoIndex !== null && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between items-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-2xl transition-all">
          {/* Ambient Video Background Blur (Fills 9:16 Video Empty Space with Vibrant Glow) */}
          <video
            src={activeVideo.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-35 pointer-events-none"
          />

          {/* Top Modal Header Bar */}
          <div className="relative z-10 w-full max-w-4xl flex items-center justify-between pt-2 px-2">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-[#1081b7] text-white font-bold text-xs flex items-center justify-center shadow">
                {selectedVideoIndex + 1}
              </span>
              <div>
                <h3 className="text-white font-bold text-base sm:text-lg leading-snug">
                  {activeVideo.studentName} &bull; Recitation
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  {activeVideo.courseName}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedVideoIndex(null)}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center border border-white/20 transition-all shadow-lg"
              aria-label="Close video reader"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Full-Size Video Container */}
          <div className="relative z-10 my-auto max-w-4xl w-full flex items-center justify-center py-2">
            <video
              key={activeVideo.videoUrl}
              src={activeVideo.videoUrl}
              controls
              autoPlay
              playsInline
              className="max-h-[72vh] w-auto h-auto max-w-full rounded-2xl shadow-2xl object-contain border border-white/25 bg-black/40"
            />
          </div>

          {/* Bottom Control Bar with Previous and Next Buttons */}
          <div className="relative z-10 w-full max-w-xl pb-2">
            <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white/20 p-3 flex items-center justify-between gap-4 shadow-2xl">
              <button
                onClick={() =>
                  setSelectedVideoIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : VIDEO_TESTIMONIALS.length - 1
                  )
                }
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-[#1081b7] text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-xs font-bold text-slate-200 tracking-wider">
                {selectedVideoIndex + 1} of {VIDEO_TESTIMONIALS.length}
              </span>

              <button
                onClick={() =>
                  setSelectedVideoIndex((prev) =>
                    prev !== null && prev < VIDEO_TESTIMONIALS.length - 1 ? prev + 1 : 0
                  )
                }
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-[#1081b7] text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}