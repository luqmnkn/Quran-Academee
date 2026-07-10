import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COURSES } from '../data';
import { Course } from '../types';
import IconRenderer from './IconRenderer';
import PremiumCarousel from './PremiumCarousel';
import { ArrowRight, BookOpen, Clock, Users, GraduationCap, X, CheckCircle2, Sparkles, Star } from 'lucide-react';

interface ServicesProps {
  onSelectCourse: (courseName: string) => void;
  onOpenTrialModal: () => void;
}

export default function Services({ onSelectCourse, onOpenTrialModal }: ServicesProps) {
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  const handleBookNow = (courseTitle: string) => {
    setActiveCourse(null);
    onSelectCourse(courseTitle);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 16 }
    }
  };

  const renderCardContent = (course: Course) => (
    <div className="bg-gradient-to-br from-white via-white to-[#F0F9FF]/60 rounded-2xl border border-[#E0F2FE] p-5 sm:p-6 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-[0_15px_35px_rgba(28,141,200,0.08),_0_2px_8px_rgba(0,0,0,0.01)] hover:border-[#1C8DC8]/40 hover:-translate-y-1.5 group relative overflow-hidden text-left min-h-[330px]">
      {/* Top light-blue indicator */}
      <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#1C8DC8] to-[#146299] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

      <div className="space-y-4">
        {/* Card Header */}
        <div className="flex items-center justify-between">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] text-[#0B3951] flex items-center justify-center group-hover:from-[#1C8DC8] group-hover:to-[#146299] group-hover:text-white transition-all duration-300 shadow-inner">
            <IconRenderer name={course.icon} className="w-5.5 h-5.5 stroke-[2]" />
          </div>
          <span className="font-arabic text-xl sm:text-2xl font-black text-[#1C8DC8]/85 group-hover:text-[#146299] select-none transition-colors duration-300">
            {course.arabicTitle}
          </span>
        </div>

        {/* Title & Age information */}
        <div className="space-y-1.5">
          <h3 className="font-display font-[800] text-base text-[#0B3951] tracking-tight group-hover:text-[#1C8DC8] transition-colors leading-snug">
            {course.title}
          </h3>
          <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-bold font-mono">
            <span className="text-[#146299] bg-[#E0F2FE]/60 px-2 py-0.5 rounded-md">{course.ageGroup}</span>
            <span className="w-1 h-1 rounded-full bg-slate-200"></span>
            <span className="text-slate-500 uppercase tracking-widest">{course.level}</span>
          </div>
        </div>

        {/* Description line */}
        <p className="text-[11px] font-sans font-medium text-[#0A1A14]/70 leading-relaxed line-clamp-3">
          {course.shortDescription}
        </p>
      </div>

      {/* Footer operations */}
      <div className="mt-5 pt-3.5 border-t border-[#F0F9FF] flex items-center justify-between gap-1">
        <button
          onClick={() => setActiveCourse(course)}
          className="text-[9px] font-black text-[#146299] hover:text-[#1C8DC8] transition-colors flex items-center space-x-0.5 uppercase tracking-wider font-mono cursor-pointer"
        >
          <span>Syllabus</span>
          <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
        
        <button
          onClick={() => handleBookNow(course.title)}
          className="bg-gradient-to-r from-[#0B3951] to-[#146299] hover:from-[#1C8DC8] hover:to-[#146299] text-white rounded-md px-3.5 py-1.5 text-[9px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer border border-[#E0F2FE] shadow-md hover:shadow-lg whitespace-nowrap"
        >
          Book Class
        </button>
      </div>
    </div>
  );

  return (
    <section 
      id="courses" 
      className="py-[100px] md:py-[140px] lg:py-[180px] bg-gradient-to-b from-white via-[#F0F9FF] to-white relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#F0F9FF] via-[#1C8DC8] to-[#F0F9FF]"></div>
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#1C8DC8]/5 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header with Elite Spacing & Typography */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h2 className="font-display font-[900] text-3xl sm:text-[45px] lg:text-[64px] text-[#0B3951] tracking-[-0.04em] leading-[1.05] filter drop-shadow-sm">
            Our Elite Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">Quran Academy</span> Programs
          </h2>
          
          <p className="font-sans font-medium text-[18px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Each course syllabus is masterfully optimized for youngsters, school children, and remote beginners, ensuring beautiful Arabic recitation with expert live focus.
          </p>
        </div>

        {/* 1. DESKTOP VIEW: Adaptive Grid Layout */}
        <div className="hidden lg:grid grid-cols-4 gap-6 xl:gap-8">
          {COURSES.map((course) => (
            <div key={course.id}>
              {renderCardContent(course)}
            </div>
          ))}
        </div>

        {/* 2. MOBILE VIEW: Horizontal Snap-Center Carousel */}
        <div className="block lg:hidden">
          <PremiumCarousel>
            {COURSES.map((course) => (
              <div key={course.id} className="h-full">
                {renderCardContent(course)}
              </div>
            ))}
          </PremiumCarousel>
        </div>

        {/* Sub-Academy Proposal Box styled to Stripe standard */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-gradient-to-br from-white via-white to-[#F0F9FF]/80 rounded-[32px] border border-[#E0F2FE] p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left shadow-[0_15px_35px_rgba(28,141,200,0.05)]"
        >
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] rounded-2xl flex items-center justify-center text-[#1C8DC8] shrink-0 shadow-inner border border-[#E0F2FE]">
              <BookOpen size={26} className="stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-display font-[900] text-xl text-[#0B3951] leading-tight">
                Evaluating where to begin Tajweed education?
              </h4>
              <p className="font-sans text-[15px] font-medium text-slate-600 mt-2 max-w-xl">
                 Sign up for a risk-free 3-day class evaluation. Our advisor maps individual recitation errors and proposes a specialized custom pathway.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectCourse('Assessed Program')}
            className="w-full md:w-auto bg-gradient-to-r from-[#1C8DC8] via-[#3D8DC3] to-[#146299] hover:from-[#146299] hover:to-[#1C8DC8] text-white font-display font-black text-xs uppercase tracking-widest py-4.5 px-9 rounded-xl shrink-0 transition-all hover:scale-[1.02] shadow-lg shadow-sky-500/15 cursor-pointer border border-[#E0F2FE]/50"
          >
            Get Expert Proposal
          </button>
        </motion.div>

      </div>

      {/* Detail Syllabus Modal */}
      <AnimatePresence>
        {activeCourse && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-white rounded-[32px] max-w-2xl w-full shadow-[0_24px_60px_rgba(11,57,81,0.2)] overflow-hidden relative border border-[#E0F2FE] flex flex-col max-h-[90vh]"
            >
              <div className="bg-[#0B3951] text-white p-8 relative overflow-hidden text-left">
                <div className="absolute right-0 top-0 w-44 h-44 bg-[#1C8DC8]/10 rounded-full blur-2xl"></div>
                <div className="relative flex items-start justify-between">
                  <div>
                    <span className="font-arabic text-3xl text-[#1C8DC8] font-semibold block mb-1">
                      {activeCourse.arabicTitle}
                    </span>
                    <h3 className="font-display font-[900] text-2xl tracking-tight leading-none text-white">
                      {activeCourse.title}
                    </h3>
                    <p className="text-xs text-[#E0F2FE] mt-3 font-bold uppercase tracking-wider font-mono">
                      {activeCourse.level} • {activeCourse.ageGroup} • {activeCourse.duration}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveCourse(null)}
                    className="text-white hover:text-[#1C8DC8] p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-8 overflow-y-auto space-y-8 flex-1 text-left">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#146299] font-mono">
                    Course Summary & Vision
                  </h4>
                  <p className="text-sm text-slate-700 leading-[1.6]">
                    {activeCourse.fullDescription}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#146299] font-mono">
                    Key Mastery Competencies
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeCourse.learningOutcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-sm text-slate-700 bg-[#F0F9FF] p-3 rounded-xl border border-[#E0F2FE]">
                        <CheckCircle2 size={16} className="text-[#1C8DC8] shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#146299] font-mono">
                    Syllabus Milestones
                  </h4>
                  <div className="space-y-3 bg-[#F0F9FF] rounded-2xl p-5 border border-[#E0F2FE]">
                    {activeCourse.curriculum.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-3 text-sm">
                        <span className="w-6 h-6 rounded-lg bg-[#0B3951] text-[#1C8DC8] flex items-center justify-center font-display font-extrabold text-xs shrink-0 select-none">
                          {idx + 1}
                        </span>
                        <p className="text-[#0B3951] font-semibold leading-normal mt-0.5">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#E0F2FE] p-6 bg-[#F0F9FF] flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                <div className="flex items-center space-x-2 text-xs text-slate-600">
                  <Clock size={15} className="text-[#1C8DC8]" />
                  <span>Personalized 1-on-1 virtual classrooms</span>
                </div>
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveCourse(null)}
                    className="flex-1 sm:flex-none border border-[#E0F2FE] text-slate-700 font-extrabold px-5 py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer bg-white"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleBookNow(activeCourse.title)}
                    className="flex-1 sm:flex-none bg-gradient-to-r from-[#1C8DC8] to-[#3D8DC3] text-white font-display font-black text-xs uppercase tracking-widest py-3.5 px-6 rounded-xl transition-all hover:scale-[1.02] cursor-pointer border border-[#E0F2FE]/50 shadow-md"
                  >
                    Request Course
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
