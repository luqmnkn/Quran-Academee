import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';
import imghero from '../assets/images/imghero.png';

interface VideoReview {
  id: string;
  studentName: string;
  age?: string;
  courseName: string;
  duration: string;
  snippet: string;
  thumbnailGradient: string;
}

const VIDEO_REVIEWS: VideoReview[] = [
  {
    id: 'v1',
    studentName: 'Zayd Al-Mansoori',
    age: '9 Years',
    courseName: 'Noorani Qaida Basics',
    duration: '3 Mos',
    snippet: 'Zayd pronouncing complex Arabic letters perfectly with proper Tajweed articulation points (Makharij)!',
    thumbnailGradient: 'from-emerald-500/25 via-[#1C8DC8]/20 to-[#0B3951]/20'
  },
  {
    id: 'v2',
    studentName: 'Amira Yusuf',
    age: '11 Years',
    courseName: 'Quran Memorization (Hifz)',
    duration: '6 Mos',
    snippet: 'Amira reciting her daily Sabaq (new memorization) with beautiful melodious tone and rhythmic rules.',
    thumbnailGradient: 'from-[#1C8DC8]/25 via-[#3D8DC3]/20 to-[#0B3951]/20'
  },
  {
    id: 'v3',
    studentName: 'Yusuf & Omar',
    age: 'Brothers',
    courseName: 'Tajweed al Quran',
    duration: '1 Year',
    snippet: 'How two brothers interact playfully and constructively with their Arab tutor during live 1-on-1 Quran sessions.',
    thumbnailGradient: 'from-amber-500/15 via-[#1C8DC8]/20 to-[#146299]/20'
  },
  {
    id: 'v4',
    studentName: 'Dr. Farhan',
    age: 'Adult',
    courseName: 'Fluent Recitation',
    duration: '5 Mos',
    snippet: 'Reviewing adult Tajweed classes and explaining how flexible schedules accommodated his hospital shift changes.',
    thumbnailGradient: 'from-indigo-500/20 via-[#1C8DC8]/20 to-[#0B3951]/20'
  }
];

interface HeroProps {
  onSubmitInquiry: (data: { fullName: string; email: string; phone: string; country: string; courseInterest: string; message: string }) => void;
  onOpenTrialModal: () => void;
}

export default function Hero({ onSubmitInquiry, onOpenTrialModal }: HeroProps) {
  const [wordIdx, setWordIdx] = useState(0);
  const words = ["Noorani Qaida", "Tajweed Rules", "Fluent Recitation", "Quran Reading"];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Smooth scroll helper
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
      className="relative min-h-[85vh] sm:min-h-screen bg-gradient-to-br from-[#F0F9FF] via-white to-[#E0F2FE] text-[#0B3951] pt-24 sm:pt-32 pb-0 overflow-hidden flex flex-col justify-between"
    >
      {/* Subtle geometric background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(61,141,195,0.06),transparent_45%)]" />
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#3D8DC3]/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-auto">
        <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-end">
          
          {/* Left Side: Premium Copy & CTAs */}
          <div className="col-span-7 lg:col-span-6 flex flex-col space-y-4 sm:space-y-6 lg:space-y-8 text-left pb-6 sm:pb-12 lg:pb-16 relative z-10">
            <div className="space-y-3 sm:space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-sans font-black text-xl xs:text-2xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#0B3951] tracking-tight leading-[1.15]"
              >
                From{' '}
                <span className="relative inline-block text-[#1C8DC8] text-left">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[wordIdx]}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute left-0 top-0 whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]"
                    >
                      {words[wordIdx]}
                    </motion.span>
                  </AnimatePresence>
                  {/* Invisible text reserves exact space needed dynamically */}
                  <span className="opacity-0 select-none pointer-events-none whitespace-nowrap">{words[wordIdx]}</span>
                </span>{' '}
                to Hifz, We're With You Every Step.
              </motion.h1>

              {/* Subheading hidden on mobile as requested */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden md:block text-[#146299] text-base sm:text-lg lg:text-xl max-w-xl font-medium leading-relaxed"
              >
                Begin your journey of Quran learning with Zikr, a trusted online platform designed to make recitation, Tajweed, and understanding the Quran easier for everyone.
              </motion.p>
            </div>

            {/* Interactive bullets hidden on mobile as requested */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg pt-2 text-sm sm:text-base text-slate-700 font-medium"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-[#1C8DC8] shrink-0" />
                <span>1-on-1 Certified Native Arab Tutors</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-[#1C8DC8] shrink-0" />
                <span>Customized Interactive Syllabuses</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-[#1C8DC8] shrink-0" />
                <span>Super Flexible 24/7 Scheduling</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-[#1C8DC8] shrink-0" />
                <span>Female Tutors Available for Sisters</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 sm:pt-2 relative z-10"
            >
              <button
                onClick={onOpenTrialModal}
                className="bg-gradient-to-r from-[#1C8DC8] via-[#3D8DC3] to-[#146299] hover:from-[#146299] hover:to-[#1C8DC8] text-white font-extrabold text-[10px] xs:text-xs sm:text-base px-3 xs:px-5 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 shadow-[0_12px_24px_rgba(28,141,200,0.18)] hover:shadow-[0_16px_32px_rgba(28,141,200,0.3)] hover:scale-103 active:scale-98 flex items-center justify-center space-x-1 sm:space-x-2 cursor-pointer whitespace-nowrap"
              >
                <span>Start Free Trial</span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={() => handleScrollToSection('#courses')}
                className="hidden sm:flex border-2 border-[#1C8DC8]/20 hover:border-[#1C8DC8] text-[#146299] font-bold text-xs sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:bg-[#1C8DC8]/5 hover:scale-103 active:scale-98 items-center justify-center cursor-pointer whitespace-nowrap"
              >
                Explore Courses
              </button>
            </motion.div>
          </div>

          {/* Right Side: Portrait Image & Glass Badges (Overlap left side & touch baseline) */}
          <div className="col-span-5 lg:col-span-6 relative flex justify-center items-end self-end h-full z-20 -ml-8 sm:-ml-12 md:-ml-16 lg:-ml-24 xl:-ml-32">
            
            {/* Visual Backdrops */}
            <div className="absolute w-[95%] aspect-square bg-gradient-to-tr from-[#3D8DC3]/15 to-[#1C8DC8]/5 rounded-full blur-3xl -z-10 animate-pulse duration-[8000ms] bottom-0" />
            
            {/* Main Portrait Frame with significantly larger max width & negative margins on desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[550px] lg:max-w-none lg:scale-110 xl:scale-115 transition-transform duration-500 self-end flex items-end"
            >
              <img
                src={imghero}
                alt="Zikr Online Quran Academy Student"
                className="w-full h-auto object-contain rounded-t-[32px] rounded-b-none drop-shadow-[0_15px_35px_rgba(28,141,200,0.14)] filter contrast-[1.01] block align-bottom"
                style={{ marginBottom: '-2px' }}
                referrerPolicy="no-referrer"
              />

              {/* FLOATING WIDGET 1: 5.0 Rating (Repositioned lower & hidden on mobile as requested) */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute top-20 sm:top-28 md:top-36 -right-2 sm:-right-4 bg-gradient-to-br from-white/98 to-[#F0F9FF]/98 backdrop-blur-xl border border-[#3D8DC3]/20 p-4 rounded-2xl shadow-[0_15px_30px_rgba(11,57,81,0.08)] max-w-[180px] xs:max-w-[200px] z-30 hidden md:block"
              >
                <div className="flex items-center space-x-1 mb-1">
                  <span className="font-sans font-black text-xl text-[#1C8DC8]">5.0</span>
                  <div className="flex text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-700 leading-tight font-medium text-left">
                  Trusted by 12,000+ happy Muslim families worldwide.
                </p>

                {/* Thicker, longer Arrow pointing near the child's shoulder */}
                <div className="absolute -left-20 bottom-[-55px] hidden lg:block z-30">
                  <svg className="w-24 h-24 text-[#1C8DC8] transform -rotate-[12deg] drop-shadow-sm" fill="none" viewBox="0 0 100 100">
                    <path 
                      d="M90,15 C65,25 35,50 15,85 M15,85 L35,82 M15,85 L22,65" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </div>
              </motion.div>

              {/* FLOATING WIDGET 2: Pure Guided (Repositioned & hidden on mobile as requested) */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-8 sm:bottom-12 -right-4 sm:-right-6 bg-gradient-to-br from-white/98 to-[#F0F9FF]/98 backdrop-blur-xl border border-[#3D8DC3]/20 p-4 rounded-2xl shadow-[0_20px_40px_rgba(11,57,81,0.08)] flex items-center space-x-3.5 max-w-[240px] sm:max-w-[280px] z-30 hidden md:block"
              >
                <div className="text-left flex-1">
                  <h4 className="font-sans font-extrabold text-xs sm:text-sm text-[#0B3951] leading-tight">
                    Pure, guided Qur'an education.
                  </h4>
                  <p className="text-[10px] sm:text-xs text-[#146299] mt-1 leading-normal font-medium">
                    Learn recitation, Tajweed & Hifz with native Arabic speaking tutors.
                  </p>
                </div>
                <div className="bg-[#1C8DC8]/10 p-2 rounded-xl shrink-0">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#1C8DC8]" />
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Mobile-Only Horizontally Scrollable Video Reviews Cards */}
      <div className="block md:hidden w-full px-5 pt-3 pb-8 relative z-30">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex flex-col">
            <span className="text-[9px] font-extrabold text-[#1C8DC8] uppercase tracking-widest font-mono">
              Live Classes in Action
            </span>
            <h3 className="font-display font-[800] text-sm text-[#0B3951]">
              Student Video Reviews
            </h3>
          </div>
          <span className="text-[9px] font-extrabold text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-full uppercase tracking-widest">
            Swipe ➜
          </span>
        </div>
        
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-none scroll-smooth">
          {VIDEO_REVIEWS.map((review) => (
            <motion.div
              key={review.id}
              whileTap={{ scale: 0.98 }}
              className="snap-center shrink-0 w-[265px] aspect-[4/3] rounded-2xl border border-[#E0F2FE] relative overflow-hidden bg-[#0B3951] shadow-[0_12px_28px_rgba(28,141,200,0.12)] group cursor-pointer"
            >
              {/* Thumbnail Gradient and illustration backdrop */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${review.thumbnailGradient} flex items-center justify-center`}>
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1c8dc8_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
                
                {/* Play Button */}
                <div className="w-11 h-11 rounded-full bg-white/25 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/35 transition-transform duration-300 shadow-md">
                  <svg className="w-4 h-4 text-white fill-current ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Tag indicator */}
              <div className="absolute top-3 left-3 bg-[#1C8DC8]/90 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm">
                Video Review
              </div>

              {/* Transparent Dark Bottom with details of video */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-3.5 pt-8 text-left text-white flex flex-col justify-end">
                <div className="flex items-center justify-between mb-0.5">
                  <h4 className="font-display font-[800] text-xs text-white tracking-wide">
                    {review.studentName}
                  </h4>
                  {review.age && (
                    <span className="text-[8px] font-extrabold uppercase text-[#1C8DC8] bg-[#1C8DC8]/10 px-1.5 py-0.5 rounded border border-[#1C8DC8]/20">
                      {review.age}
                    </span>
                  )}
                </div>
                <p className="text-[8px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1">
                  {review.courseName} • {review.duration}
                </p>
                <p className="text-[9.5px] text-slate-200 leading-tight line-clamp-2">
                  "{review.snippet}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Wave Bottom Curve to slide into the next section */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg className="relative block w-full h-[30px] sm:h-[40px] md:h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M0,0 C150,90 350,120 600,100 C850,80 1050,90 1200,120 L1200,120 L0,120 Z" 
            className="fill-[#F0F9FF]"
          />
        </svg>
      </div>
    </section>
  );
}
