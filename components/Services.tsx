'use client';

import React from 'react';
import { COURSES } from '../data';
import { Course } from '../types';
import PremiumCarousel from './PremiumCarousel';

interface ServicesProps {
  onSelectCourse: (courseName: string) => void;
  onOpenTrialModal?: () => void;
}

export default function Services({ onSelectCourse }: ServicesProps) {
  const handleBookNow = (courseTitle: string) => {
    onSelectCourse(courseTitle);
  };

  const renderCardContent = (course: Course) => (
    <div className="bg-gradient-to-br from-[#f0f9ff]/70 via-white to-[#e0f2fe]/30 border border-[#38aae3]/20 rounded-3xl p-6 sm:p-7 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-[0_12px_30px_rgba(28,141,200,0.08)] hover:border-[#1081b7]/40 hover:-translate-y-1 group relative text-left min-h-[260px]">
      <div className="space-y-3 flex-1 flex flex-col">
        {/* Course Names: Bigger English Name, then Arabic */}
        <div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0B3951] tracking-tight leading-snug group-hover:text-[#1C8DC8] transition-colors">
            {course.title}
          </h3>
          <span className="font-arabic text-lg sm:text-xl font-bold text-[#1C8DC8]/90 block mt-1 select-none">
            {course.arabicTitle}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm font-sans font-medium text-slate-600 leading-relaxed mt-2 line-clamp-3 flex-1">
          {course.shortDescription}
        </p>
      </div>

      {/* Footer with Book Class button aligned to the right */}
      <div className="mt-5 pt-4 border-t border-[#F0F9FF] flex items-center justify-end">
        <button
          onClick={() => handleBookNow(course.title)}
          className="bg-gradient-to-r from-[#1C8DC8] via-[#3D8DC3] to-[#146299] hover:from-[#146299] hover:to-[#1C8DC8] text-white rounded-none px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-extrabold tracking-wide uppercase transition-all duration-300 shadow-[0_6px_20px_rgba(28,141,200,0.22)] hover:shadow-[0_10px_28px_rgba(28,141,200,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap"
        >
          Book Class
        </button>
      </div>
    </div>
  );

  return (
    <section 
      id="courses" 
      className="bg-gradient-to-b from-white via-[#F0F9FF] to-white relative overflow-hidden py-12 sm:py-16"
    >
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#1C8DC8]/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-6">
          <h2 className="font-display font-[900] text-3xl sm:text-[45px] lg:text-[64px] text-[#0B3951] tracking-[-0.04em] leading-[1.05] filter drop-shadow-sm">
            Targeted Courses for Your <span className="font-allura text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">Quranic Journey</span>
          </h2>

          <p className="font-sans font-medium text-[18px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Explore our individual 1-on-1 courses designed for every step—from foundational reading and Tajweed to translation, Arabic, and living by the Quran.
          </p>
        </div>

        {/* Course Cards Carousel */}
        <div className="w-full py-4 px-2">
          <PremiumCarousel>
            {COURSES.map((course) => (
              <div key={course.id} className="h-full">
                {renderCardContent(course)}
              </div>
            ))}
          </PremiumCarousel>
        </div>
      </div>
    </section>
  );
}