'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import type { CourseDetail } from '@/lib/coursesData';
import TrialModalButton from '@/components/TrialModalButton';

interface CoursesCarouselProps {
  courses: CourseDetail[];
}

export default function CoursesCarousel({ courses }: CoursesCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      loop: true,
      skipSnaps: false,
    },
    [
      Autoplay({
        delay: 4500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(true);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <div className="relative w-full">
      {/* Top Header Controls (Prev / Next Buttons) */}
      <div className="flex items-center justify-between mb-6 px-2">
        <p className="text-xs text-slate-500 font-medium">
          Swipe or use arrows to view all {courses.length} courses
        </p>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous Course"
            className="w-10 h-10 rounded-xl bg-white border border-sky-100 text-[#0B3951] hover:text-[#1C8DC8] hover:border-sky-300 flex items-center justify-center shadow-sm hover:shadow transition-all duration-200 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next Course"
            className="w-10 h-10 rounded-xl bg-white border border-sky-100 text-[#0B3951] hover:text-[#1C8DC8] hover:border-sky-300 flex items-center justify-center shadow-sm hover:shadow transition-all duration-200 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Embla Viewport */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing select-none -mx-3 px-3 py-2"
        ref={emblaRef}
      >
        <div className="flex touch-pan-y -ml-4">
          {courses.map((course) => (
            <div
              key={course.slug}
              className="pl-4 basis-[88%] sm:basis-1/2 lg:basis-1/3 shrink-0"
            >
              <div className="bg-white rounded-xl border border-sky-100/90 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_32px_rgba(28,141,200,0.10)] hover:border-sky-200 transition-all duration-300 flex flex-col justify-between overflow-hidden group text-center p-6 sm:p-8 h-full">
                <div className="flex flex-col items-center">
                  {/* 1. Clear Name of Course in English */}
                  <h3 className="font-display font-[900] text-xl sm:text-2xl text-[#0B3951] leading-snug group-hover:text-[#1C8DC8] transition-colors">
                    <Link href={`/courses/${course.slug}`}>{course.title}</Link>
                  </h3>

                  {/* 2. Next Line in Arabic */}
                  <span className="font-arabic text-2xl sm:text-3xl text-[#1C8DC8] block mt-1.5 opacity-90 select-none">
                    {course.arabicTitle}
                  </span>

                  {/* 3. Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4 max-w-sm mx-auto min-h-[60px]">
                    {course.answerFirstSummary}
                  </p>

                  {/* 4. What You Will Learn */}
                  <div className="w-full border-t border-slate-100 pt-5 mt-5 mb-5 text-center">
                    <span className="text-[11px] font-bold text-[#0B3951] uppercase tracking-wider block mb-3 font-display">
                      What You Will Learn
                    </span>
                    <div className="space-y-2 max-w-sm mx-auto text-left inline-block">
                      {course.keyHighlights.slice(0, 3).map((hl, i) => (
                        <div
                          key={i}
                          className="flex items-start space-x-2 text-xs text-slate-700"
                        >
                          <Check className="w-4 h-4 text-[#1C8DC8] shrink-0 mt-0.5" />
                          <span className="leading-tight">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. Price & 6. Large Button */}
                <div className="w-full pt-4 border-t border-slate-100 flex flex-col items-center mt-auto">
                  <div className="mb-4 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Starting Tuition
                    </span>
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-3xl font-display font-black text-[#0B3951]">
                        ${course.startingPrice}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        /month
                      </span>
                    </div>
                  </div>

                  <TrialModalButton
                    courseName={course.title}
                    className="w-full py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg"
                  >
                    <span>Book 3-Day Free Trial</span>
                  </TrialModalButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center space-x-2 mt-8">
        {courses.map((_, dotIdx) => {
          const isActive = dotIdx === selectedIndex % courses.length;
          return (
            <button
              key={dotIdx}
              type="button"
              onClick={() => scrollTo(dotIdx)}
              aria-label={`Go to course ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-7 bg-[#1C8DC8]'
                  : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
