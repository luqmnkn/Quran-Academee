import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../data';
import { Star, Quote, Play, Video } from 'lucide-react';
import PremiumCarousel from './PremiumCarousel';

interface VideoTestimonial {
  id: string;
  studentName: string;
  age: string;
  courseName: string;
  duration: string;
  snippet: string;
  thumbnailGradient: string;
  videoUrl?: string; // Optional: Add video source URLs here
}

const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 'v1',
    studentName: 'Zayd Al-Mansoori',
    age: '9 Years',
    courseName: 'Noorani Qaida Basics',
    duration: '3 Months with Quran Academee',
    snippet: 'Zayd pronouncing complex Arabic letters perfectly with Tajweed.',
    thumbnailGradient: 'from-emerald-500/20 via-[#1C8DC8]/25 to-[#0B3951]/20',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-child-reading-a-book-in-bed-41551-large.mp4'
  },
  {
    id: 'v2',
    studentName: 'Amira Yusuf',
    age: '11 Years',
    courseName: 'Quran Memorization (Hifz)',
    duration: '6 Months with Quran Academee',
    snippet: 'Amira reciting her daily Sabaq with melodious tone & rhythm.',
    thumbnailGradient: 'from-[#1C8DC8]/20 via-[#3D8DC3]/25 to-[#0B3951]/20',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-studying-with-a-laptop-42938-large.mp4'
  },
  {
    id: 'v3',
    studentName: 'Yusuf & Omar',
    age: 'Brothers',
    courseName: 'Tajweed al Quran',
    duration: '1 Year with Quran Academee',
    snippet: 'Brothers interacting playfully with their Arab tutor in live session.',
    thumbnailGradient: 'from-amber-500/10 via-[#1C8DC8]/25 to-[#146299]/20',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-children-playing-together-in-a-park-41549-large.mp4'
  },
  {
    id: 'v4',
    studentName: 'Dr. Farhan',
    age: 'Adult Student',
    courseName: 'Fluent Recitation',
    duration: '5 Months with Quran Academee',
    snippet: 'Adult Tajweed review and flexible schedule feedback.',
    thumbnailGradient: 'from-indigo-500/15 via-[#1C8DC8]/25 to-[#0B3951]/20',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-book-and-reading-41546-large.mp4'
  }
];

// Component for individual inline-playing video card
function VideoCardItem({ video }: { video: VideoTestimonial }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Stop video when scrolled out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && isPlaying) {
            if (videoRef.current) {
              videoRef.current.pause();
            }
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.6 } // Auto-stop when 60% of card is scrolled out
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isPlaying]);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      whileHover={{ y: -6 }}
      onClick={handleTogglePlay}
      className="shrink-0 snap-center w-[72vw] sm:w-auto aspect-[9/14] sm:aspect-[3/4] bg-gradient-to-tr rounded-[28px] border-2 border-[#0B3951]/10 overflow-hidden relative group cursor-pointer shadow-lg p-3 flex flex-col justify-between select-none"
      style={{
        backgroundImage: `linear-gradient(to top right, var(--tw-gradient-stops))`
      }}
    >
      {/* HTML5 Video Element inside Card Frame */}
      {video.videoUrl && (
        <video
          ref={videoRef}
          src={video.videoUrl}
          playsInline
          loop
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isPlaying ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        />
      )}

      {/* Fallback Cover Thumbnail */}
      <div className={`absolute inset-0 bg-gradient-to-tr ${video.thumbnailGradient} -z-10`} />
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#1c8dc8_1.5px,transparent_1.5px)] [background-size:16px_16px] -z-10" />

      {/* Center Play/Pause Overlay Icon */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-opacity duration-300 ${
        isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
      }`}>
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/40 transition-all duration-300 shadow-xl">
          <Play className={`w-6 h-6 text-white fill-current ${isPlaying ? '' : 'ml-1'}`} />
        </div>
      </div>

      <div />

      {/* Bottom Information Bar */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/60 p-3 text-left shadow-sm relative z-10">
        <h4 className="font-display font-extrabold text-xs text-[#0B3951] truncate mb-0.5">
          {video.studentName}
        </h4>
        <p className="text-[10px] text-slate-700 leading-snug font-medium line-clamp-2">
          {video.snippet}
        </p>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState<'all' | 'Parent' | 'Adult Student'>('all');

  const filtered = activeTab === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.role === activeTab);

  const renderCardContent = (testimonial: typeof TESTIMONIALS[0]) => (
    <div className="bg-white rounded-2xl border border-[#E0F2FE] p-6 sm:p-7 md:p-8 flex flex-col justify-between h-full relative overflow-hidden group hover:border-[#1C8DC8]/40 hover:shadow-[0_15px_35px_rgba(28,141,200,0.06)] transition-all duration-300 text-left min-h-[260px]">
      <Quote className="absolute -bottom-6 -right-6 w-24 h-24 text-[#1C8DC8]/5 select-none pointer-events-none" />

      <div className="space-y-3 relative z-10">
        <div className="flex items-center space-x-0.5">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={13} className="text-[#1C8DC8] fill-[#1C8DC8]" />
          ))}
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-medium">
          "{testimonial.feedback}"
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
            {testimonial.role} • {testimonial.location}
          </p>
        </div>
      </div>
    </div>
  );

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
            Hear From Our <span className="font-allura text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">Quran Learners</span>
          </h2>
          
          <p className="font-sans font-medium text-[18px] text-slate-600 max-w-lg mx-auto leading-relaxed">
            Discover how school children and adults are improving Arabic letter articulation and Tajweed rules at home.
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
              Watch Our Students <span className="font-allura text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] to-[#146299]">Recite In Real-Time</span>
            </h3>
            <p className="font-sans font-medium text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
              Real recordings from 1-on-1 virtual sessions showing progress in Quranic recitation, fluency, and proper Tajweed.
            </p>
          </div>

          {/* PORTRAIT VIDEO CARDS CONTAINER */}
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none max-w-6xl mx-auto px-4 sm:px-0 -mx-4 sm:mx-0 pb-4">
            {VIDEO_TESTIMONIALS.map((video) => (
              <VideoCardItem key={video.id} video={video} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}