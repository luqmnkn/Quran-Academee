import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data';
import { Star, Quote, Play, Video } from 'lucide-react';
import PremiumCarousel from './PremiumCarousel';

const VIDEO_TESTIMONIALS = [
  {
    id: 'v1',
    studentName: 'Zayd Al-Mansoori',
    age: '9 Years',
    courseName: 'Noorani Qaida Basics',
    duration: '3 Months with Quran Academee',
    snippet: 'Watch Zayd pronouncing complex Arabic letters perfectly with proper Tajweed articulation points (Makharij)!',
    thumbnailGradient: 'from-emerald-500/20 via-[#1C8DC8]/25 to-[#0B3951]/20'
  },
  {
    id: 'v2',
    studentName: 'Amira Yusuf',
    age: '11 Years',
    courseName: 'Quran Memorization (Hifz)',
    duration: '6 Months with Quran Academee',
    snippet: 'Watch Amira reciting her daily Sabaq (new memorization) with beautiful melodious tone and rhythmic rules.',
    thumbnailGradient: 'from-[#1C8DC8]/20 via-[#3D8DC3]/25 to-[#0B3951]/20'
  },
  {
    id: 'v3',
    studentName: 'Yusuf & Omar',
    age: 'Brothers',
    courseName: 'Tajweed al Quran',
    duration: '1 Year with Quran Academee',
    snippet: 'How two brothers interact playfully and constructively with their Arab tutor during live 1-on-1 Quran sessions.',
    thumbnailGradient: 'from-amber-500/10 via-[#1C8DC8]/25 to-[#146299]/20'
  },
  {
    id: 'v4',
    studentName: 'Dr. Farhan',
    age: 'Adult Student',
    courseName: 'Fluent Recitation',
    duration: '5 Months with Quran Academee',
    snippet: 'Reviewing adult Tajweed classes and explaining how flexible schedules accommodated his hospital shift changes.',
    thumbnailGradient: 'from-indigo-500/15 via-[#1C8DC8]/25 to-[#0B3951]/20'
  }
];

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState<'all' | 'Parent' | 'Adult Student'>('all');

  const filtered = activeTab === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.role === activeTab);

  const renderCardContent = (testimonial: typeof TESTIMONIALS[0]) => (
    <div className="bg-white rounded-2xl border border-[#E0F2FE] p-6 sm:p-7 md:p-8 flex flex-col justify-between h-full relative overflow-hidden group hover:border-[#1C8DC8]/40 hover:shadow-[0_15px_35px_rgba(28,141,200,0.06)] transition-all duration-300 text-left min-h-[260px]">
      {/* Decorative styling */}
      <Quote className="absolute -bottom-6 -right-6 w-24 h-24 text-[#1C8DC8]/5 select-none" />

      <div className="space-y-3 relative z-10">
        {/* Five Star rating */}
        <div className="flex items-center space-x-0.5">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={13} className="text-[#1C8DC8] fill-[#1C8DC8]" />
          ))}
        </div>

        {/* Feedback block */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-medium">
          "{testimonial.feedback}"
        </p>
      </div>

      {/* Profile info block */}
      <div className="flex items-center space-x-3 pt-4 border-t border-[#E0F2FE] relative z-10 mt-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B3951] to-[#1C8DC8] text-white flex items-center justify-center font-display font-black text-xs select-none shadow">
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1C8DC8]/3 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Header display segment */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-[#F0F9FF] border border-[#E0F2FE] px-4 py-2 rounded-full shadow-sm">
            <Quote size={14} className="text-[#1C8DC8]" />
            <span className="text-xs font-bold text-[#146299] uppercase tracking-widest font-mono">
              Success Stories
            </span>
          </div>
          
          <h2 className="font-display font-[900] text-3xl sm:text-[45px] lg:text-[64px] text-[#0B3951] tracking-[-0.04em] leading-[1.05]">
            Hear From Our <span className="font-allora text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">Quran Learners</span>
          </h2>
          
          <p className="font-sans font-medium text-[18px] text-slate-600 max-w-lg mx-auto leading-relaxed">
            Discover how school children and adults are improving Arabic letter articulation and Tajweed rules at home.
          </p>

          {/* Filtering tabs */}
          <div className="flex items-center justify-center gap-2 pt-6">
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={testimonial.id}
              >
                {renderCardContent(testimonial)}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 2. MOBILE VIEW: Horizontal Snap-Center Carousel */}
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
            <div className="inline-flex items-center space-x-2 bg-[#F0F9FF] border border-[#E0F2FE] px-3.5 py-1.5 rounded-full shadow-sm">
              <Video size={13} className="text-[#1C8DC8]" />
              <span className="text-[10px] font-bold text-[#146299] uppercase tracking-widest font-mono">
                Student Recitation Videos
              </span>
            </div>
            <h3 className="font-display font-[900] text-2xl sm:text-[34px] text-[#0B3951] tracking-tight leading-none">
              Watch Our Students <span className="font-allora text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] to-[#146299]">Recite In Real-Time</span>
            </h3>
            <p className="font-sans font-medium text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
              Real recordings from 1-on-1 virtual sessions showing progress in Quranic recitation, fluency, and proper Tajweed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {VIDEO_TESTIMONIALS.map((video) => (
              <motion.div
                key={video.id}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl border border-[#E0F2FE] overflow-hidden flex flex-col justify-between h-[310px] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(28,141,200,0.12)] hover:border-[#1C8DC8]/40 relative group text-left cursor-pointer"
              >
                {/* Upper thumbnail with play overlay */}
                <div className={`h-40 relative bg-gradient-to-tr ${video.thumbnailGradient} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#1c8dc8_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
                  
                  {/* Glowing dynamic background pulse */}
                  <div className="absolute w-24 h-24 bg-[#1C8DC8]/10 rounded-full blur-xl group-hover:bg-[#1C8DC8]/20 transition-all duration-500" />

                  {/* Play Button */}
                  <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/50 transition-all duration-300 shadow-lg relative z-10">
                    <Play className="w-5 h-5 text-white fill-current ml-0.5" />
                  </div>

                  {/* Course tag badge */}
                  <span className="absolute top-3 left-3 bg-[#0B3951]/80 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm">
                    {video.courseName}
                  </span>
                </div>

                {/* Lower details segment with transparent dark overlay */}
                <div className="p-4 flex-1 flex flex-col justify-between bg-gradient-to-br from-white via-white to-[#F0F9FF]/30 relative">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-display font-[800] text-xs text-[#0B3951] tracking-wide">
                        {video.studentName}
                      </h4>
                      <span className="text-[8px] font-extrabold uppercase text-[#1C8DC8] bg-[#F0F9FF] px-1.5 py-0.5 rounded border border-[#E0F2FE]">
                        {video.age}
                      </span>
                    </div>
                    <p className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                      {video.duration}
                    </p>
                    <p className="text-[10.5px] text-slate-600 leading-relaxed font-medium line-clamp-3">
                      "{video.snippet}"
                    </p>
                  </div>
                  
                  <div className="text-[9px] font-extrabold text-[#1C8DC8] uppercase tracking-wider flex items-center space-x-1 mt-2">
                    <span>Play Recording</span>
                    <span>➔</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
