'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Play, X } from 'lucide-react';
import imghero from '../public/images/imghero.png';
import imgheroMobile from '../public/images/imgheroMobile.png';
import { VIDEO_TESTIMONIALS } from '../data';
import { VideoTestimonial } from '../types';

interface HeroProps {
  onSubmitInquiry: (data: { fullName: string; email: string; phone: string; country: string; courseInterest: string; message: string }) => void;
  onOpenTrialModal: () => void;
}

function SheikhJawwadSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex items-center gap-4 sm:gap-6 text-left py-2 w-full max-w-xl"
    >
      {/* Bigger picture on the Left Side - enlarged further, completely borderless and without shades */}
      <div className="relative shrink-0">
        <div className="w-28 h-28 xs:w-32 xs:h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden">
          <Image
            src="/images/shiekhJawwad.png"
            alt="Sheikh Jawwad Musa"
            width={240}
            height={240}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Information on the Right Side */}
      <div className="space-y-1 sm:space-y-1.5 text-left min-w-0">
        <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#0B3951] block">
          Under the supervision of
        </span>
        <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-[#0B3951] leading-tight">
          Sheikh Jawwad Musa
        </h3>
        <p className="font-sans text-xs sm:text-base text-slate-600 leading-snug">
          Graduated from Madinah University
        </p>
      </div>
    </motion.div>
  );
}

function HeroVideoReviews({
  videos,
  onSelectVideo,
}: {
  videos: VideoTestimonial[];
  onSelectVideo: (index: number) => void;
}) {
  return (
    <div className="w-full flex justify-center items-center py-2 sm:py-3 overflow-hidden">
      <div className="flex items-start justify-center gap-3.5 sm:gap-5 overflow-x-auto max-w-full py-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {videos.map((video, idx) => (
          <motion.div
            key={video.id || idx}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectVideo(idx)}
            className="flex flex-col items-center cursor-pointer group select-none shrink-0"
          >
            {/* Pure Video Card: Increased size, simple, completely borderless, and without shades */}
            <div className="w-[120px] xs:w-[135px] sm:w-[155px] md:w-[170px] aspect-[9/14] rounded-2xl sm:rounded-3xl overflow-hidden relative bg-slate-100 transition-transform duration-300">
              <video
                src={video.videoUrl}
                playsInline
                muted
                loop
                autoPlay
                preload="metadata"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Minimal Clean White Play Icon Button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-[#1081b7] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1081b7] group-hover:text-white transition-all duration-200">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                </div>
              </div>
            </div>

            {/* Student Name */}
            <span className="text-xs sm:text-sm md:text-base font-bold text-[#0B3951] mt-2 text-center leading-tight truncate max-w-[120px] xs:max-w-[135px] sm:max-w-[155px] md:max-w-[170px]">
              {video.studentName}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


export default function Hero({ onSubmitInquiry, onOpenTrialModal }: HeroProps) {
  const [videoList, setVideoList] = useState<VideoTestimonial[]>(VIDEO_TESTIMONIALS);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);

  // Automatically fetch video reviews from public/video-reviews directory
  useEffect(() => {
    fetch('/api/video-reviews')
      .then((res) => {
        if (!res.ok) throw new Error('API response error');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setVideoList(data);
        }
      })
      .catch((err) => {
        console.log('Using default video reviews list:', err);
      });
  }, []);

  const activeVideo = selectedVideoIndex !== null ? videoList[selectedVideoIndex] : null;

  // Keyboard navigation for video reader modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedVideoIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedVideoIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedVideoIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : videoList.length - 1
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedVideoIndex((prev) =>
          prev !== null && prev < videoList.length - 1 ? prev + 1 : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideoIndex]);

  // Lock scroll when video modal is open
  useEffect(() => {
    if (selectedVideoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedVideoIndex]);

  const handleScrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[110vh] md:min-h-screen bg-gradient-to-b from-[#F0F9FF] via-white to-white text-[#0B3951] pt-24 sm:pt-32 pb-16 sm:pb-24 md:pb-28 mb-10 sm:mb-16 md:mb-20 overflow-hidden flex flex-col justify-between"
    >
      {/* Background radial effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(61,141,195,0.06),transparent_45%)]" />
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#3D8DC3]/5 rounded-full blur-3xl" />
      <div className="absolute right-0 top-0 bottom-0 w-1/2 md:w-1/3 bg-gradient-to-l from-[#1C8DC8]/12 via-[#3D8DC3]/4 to-transparent pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-between md:flex md:flex-col md:justify-center my-auto">
        
        {/* DESKTOP LAYOUT (Visible only on desktop md and up) */}
        <div className="hidden md:grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center relative w-full h-full my-auto">
          
          {/* Left Copy Container */}
          <div className="relative bottom-auto left-auto z-30 col-span-12 md:col-span-7 lg:col-span-6 flex flex-col space-y-4 sm:space-y-5 text-left py-4 sm:py-6 w-full justify-center">
            <div className="space-y-2 sm:space-y-4">
              {/* Main Heading title block (Two lines static for Desktop) */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display font-semibold text-[28px] xs:text-[32px] sm:text-4xl lg:text-5xl xl:text-6xl text-[#0B3951] tracking-tight leading-[1.2] md:leading-[1.15]"
              >
                <span className="block">Start Your Quran Journey</span>
                <span className="block font-allura text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#3D8DC3] to-[#146299]">With Quran Academee</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[#146299] text-base sm:text-lg lg:text-xl max-w-xl font-medium leading-relaxed"
              >
                Begin a complete Quranic journey starting with sacred recitation, Tajweed, and Hifz as vital foundations, moving directly into translation, deep understanding, and purposeful daily action.
              </motion.p>
            </div>

            {/* CTAs (Two Buttons) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-row items-center gap-3 pt-1 relative z-10"
            >
              <button
                onClick={onOpenTrialModal}
                className="bg-gradient-to-r from-[#1C8DC8] via-[#3D8DC3] to-[#146299] hover:from-[#146299] hover:to-[#1C8DC8] text-white font-extrabold text-xs sm:text-base px-6 sm:px-9 py-4 sm:py-4.5 rounded-none transition-all duration-300 shadow-[0_12px_32px_rgba(28,141,200,0.25)] hover:shadow-[0_16px_40px_rgba(28,141,200,0.38)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap group"
              >
                <span>Start Free Trial</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => window.location.href = '/pricing'}
                className="bg-white/80 backdrop-blur-md border border-[#1C8DC8]/30 hover:border-[#1C8DC8] text-[#146299] font-extrabold text-xs sm:text-base px-6 sm:px-8 py-4 sm:py-4.5 rounded-none transition-all duration-300 shadow-[0_8px_24px_rgba(28,141,200,0.08)] hover:shadow-[0_12px_32px_rgba(28,141,200,0.18)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center cursor-pointer whitespace-nowrap"
              >
                Choose Plan
              </button>
            </motion.div>

            {/* Sheikh Jawwad Section (after two buttons) */}
            <SheikhJawwadSection />
          </div>

          {/* Right Portrait */}
          <div className="col-span-12 md:col-span-5 lg:col-span-6 relative flex justify-center lg:justify-end items-center self-center h-full z-10">
            {/* Ambient Radial Aura expanding behind students */}
            <div className="absolute w-[110%] aspect-square bg-gradient-to-tr from-[#3D8DC3]/16 to-[#1C8DC8]/6 rounded-full blur-3xl -z-10 animate-pulse duration-[8000ms] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            
            {/* Cleanly Framed Students Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-[460px] md:max-w-[500px] lg:max-w-[580px] xl:max-w-[640px] h-[58vh] md:h-[68vh] lg:h-[78vh] xl:h-[84vh] flex items-end justify-center lg:justify-end select-none transition-all duration-300 self-center origin-center pointer-events-none"
              style={{
                maskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)'
              }}
            >
              <Image
                src={imghero}
                alt="Quran Academee Students"
                priority
                className="h-full w-auto object-contain object-bottom drop-shadow-[0_16px_36px_rgba(28,141,200,0.15)] filter contrast-[1.02] block select-none pointer-events-none"
              />

              {/* Bottom Soft Mask Blend Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-16 lg:h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-20" />
            </motion.div>
          </div>

        </div>

        {/* MOBILE LAYOUT (Visible only on mobile md and below) */}
        <div className="flex md:hidden flex-col gap-4 items-center relative w-full h-full">
          
          {/* Heading Container */}
          <div className="flex flex-col space-y-3 text-center w-full">
            <div className="space-y-2">
              {/* Main Heading title block (Centered three lines for Mobile) */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display font-semibold text-[28px] xs:text-[32px] sm:text-4xl text-[#0B3951] tracking-tight leading-[1.2]"
              >
                <span className="block">Start Your Journey</span>
                <span className="block text-xs sm:text-sm uppercase tracking-widest text-[#146299] opacity-80 my-1">With</span>
                <span className="block font-allura text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#3D8DC3] to-[#146299] py-1">Quran Academee</span>
              </motion.h1>
            </div>
          </div>

          {/* Image Container (Mobile Full Width) */}
          <div className="relative flex justify-center items-end w-full h-[45vh] xs:h-[48vh] sm:h-[54vh] max-h-[460px] z-10">
            <div className="absolute w-[95%] aspect-square bg-gradient-to-tr from-[#3D8DC3]/15 to-[#1C8DC8]/5 rounded-full blur-3xl -z-10 bottom-0" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="relative w-full h-full flex items-end justify-center select-none origin-bottom"
              style={{
                maskImage: 'linear-gradient(to bottom, black 84%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 84%, transparent 100%)'
              }}
            >
              <Image
                src={imgheroMobile}
                alt="Quran Academee Students"
                priority
                className="h-full w-auto object-contain object-bottom drop-shadow-[0_8px_18px_rgba(28,141,200,0.12)] block z-20 select-none"
              />

              {/* Reduced Height Soft Bottom Fade Mask */}
              <div className="absolute inset-x-0 bottom-0 h-10 sm:h-14 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-30" />
            </motion.div>
          </div>

          {/* Action Buttons (Mobile only bottom CTAs) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-row items-stretch gap-2.5 w-full relative z-30 pt-2 pb-2 px-1"
          >
            <button
              onClick={onOpenTrialModal}
              className="w-1/2 bg-gradient-to-r from-[#1C8DC8] via-[#3D8DC3] to-[#146299] text-white font-extrabold text-xs py-3.5 rounded-none shadow-[0_12px_28px_rgba(28,141,200,0.25)] hover:shadow-[0_16px_36px_rgba(28,141,200,0.35)] flex items-center justify-center space-x-1 cursor-pointer whitespace-nowrap active:scale-98"
            >
              <span>Free Trial</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => window.location.href = '/pricing'}
              className="w-1/2 border border-[#1C8DC8]/30 text-[#146299] bg-white/80 backdrop-blur font-bold text-xs py-3.5 rounded-none shadow-[0_8px_20px_rgba(28,141,200,0.08)] flex items-center justify-center cursor-pointer whitespace-nowrap active:scale-98"
            >
              Choose Plan
            </button>
          </motion.div>

          {/* Sheikh Jawwad Section (after two buttons and before review cards) */}
          <SheikhJawwadSection />

          {/* Student Video Reviews (Clean, Borderless & Shadeless Centered Cards) */}
          <HeroVideoReviews videos={videoList} onSelectVideo={(idx) => setSelectedVideoIndex(idx)} />
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg className="relative block w-full h-[30px] sm:h-[40px] md:h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M0,0 C150,90 350,120 600,100 C850,80 1050,90 1200,120 L1200,120 L0,120 Z" 
            className="fill-[#F0F9FF]"
          />
        </svg>
      </div>

      {/* Soft Ambient Canvas Blend at Section Bottom */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />

      {/* FULL-SIZE VIDEO MODAL WITH BLURRED BACKDROP & PREV/NEXT CONTROLS */}
      {activeVideo && selectedVideoIndex !== null && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between items-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-2xl transition-all">
          {/* Ambient Video Background Blur */}
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
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center border border-white/20 transition-all shadow-lg cursor-pointer"
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
                    prev !== null && prev > 0 ? prev - 1 : videoList.length - 1
                  )
                }
                className="px-4 py-2.5 rounded-none bg-white/10 hover:bg-[#1081b7] text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-xs font-bold text-slate-200 tracking-wider">
                {selectedVideoIndex + 1} of {videoList.length}
              </span>

              <button
                onClick={() =>
                  setSelectedVideoIndex((prev) =>
                    prev !== null && prev < videoList.length - 1 ? prev + 1 : 0
                  )
                }
                className="px-4 py-2.5 rounded-none bg-white/10 hover:bg-[#1081b7] text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
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