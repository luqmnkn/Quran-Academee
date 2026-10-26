'use client';

import React, { useState, useEffect } from 'react';
import { Star, Quote, Play, X, ChevronLeft, ChevronRight, CheckCircle, Video, Award } from 'lucide-react';
import { TESTIMONIALS, VIDEO_TESTIMONIALS } from '@/data';
import { VideoTestimonial, Testimonial } from '@/types';
import TrialModalButton from './TrialModalButton';

export default function ReviewsClient() {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'Parent' | 'Adult Student'>('all');

  const activeVideo = selectedVideoIndex !== null ? VIDEO_TESTIMONIALS[selectedVideoIndex] : null;

  const filteredTestimonials =
    activeFilter === 'all'
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.role === activeFilter);

  // Keyboard navigation for video review modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedVideoIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedVideoIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedVideoIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : VIDEO_TESTIMONIALS.length - 1
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedVideoIndex((prev) =>
          prev !== null && prev < VIDEO_TESTIMONIALS.length - 1 ? prev + 1 : 0
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideoIndex]);

  return (
    <>
      {/* 1. VIDEO REVIEWS SHOWCASE */}
      <section className="mb-20 sm:mb-28">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#0284C7] bg-[#F0F9FF] px-2.5 py-1 rounded-md border border-sky-100">
            <Video className="w-3.5 h-3.5" />
            <span>Live Recitation Demos</span>
          </div>
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
            Watch Real Students Reciting with Proper Tajweed
          </h2>
          <p className="text-sm text-slate-600">
            Click on any video review below to hear authentic recitation progress recorded live in our 1-on-1 digital classrooms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {VIDEO_TESTIMONIALS.map((video, idx) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideoIndex(idx)}
              className="bg-slate-900 rounded-xl overflow-hidden relative cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 aspect-[4/5] flex flex-col justify-between p-5 group border border-sky-900/40 hover:border-[#1C8DC8]"
            >
              <video
                src={video.videoUrl}
                playsInline
                muted
                loop
                autoPlay
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 pointer-events-none"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

              {/* Play Badge */}
              <div className="relative z-10 flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-white font-bold text-[10px] tracking-wider uppercase border border-white/20">
                  {video.age}
                </span>
                <span className="text-[10px] text-sky-300 font-semibold bg-[#0B3951]/80 px-2 py-0.5 rounded-md">
                  {video.duration}
                </span>
              </div>

              {/* Play Button Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1C8DC8] transition-all shadow-xl">
                  <Play className="w-6 h-6 text-white fill-current ml-0.5" />
                </div>
              </div>

              {/* Bottom Card Meta */}
              <div className="bg-slate-950/80 backdrop-blur-md rounded-lg border border-white/15 p-3.5 relative z-10 text-white">
                <h3 className="font-display font-extrabold text-sm text-white truncate mb-0.5">
                  {video.studentName}
                </h3>
                <span className="text-[11px] text-[#1C8DC8] font-semibold block mb-1">
                  {video.courseName}
                </span>
                <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
                  {video.snippet}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. WRITTEN REVIEWS */}
      <section className="mb-20 sm:mb-28 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#0284C7] bg-[#F0F9FF] px-2.5 py-1 rounded-md border border-sky-100">
            <Star className="w-3.5 h-3.5 fill-[#0284C7] text-[#0284C7]" />
            <span>Verified Student & Parent Feedback</span>
          </div>
          <h2 className="font-display font-[800] text-2xl sm:text-3xl text-[#0B3951] tracking-tight">
            What Families Around the World Say About Quran Academee
          </h2>
          <p className="text-sm text-slate-600">
            Feedback from parents and adult learners in the US, UK, Canada, and Australia.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {(['all', 'Parent', 'Adult Student'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#0B3951] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-[#F0F9FF]'
                }`}
              >
                {filter === 'all' ? 'All Reviews' : `${filter}s`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTestimonials.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl p-6 border border-sky-100/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden"
            >
              <Quote className="absolute top-4 right-4 w-12 h-12 text-[#1C8DC8]/10 pointer-events-none" />

              <div>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-6">
                  &quot;{review.feedback}&quot;
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-extrabold text-xs text-[#0B3951]">
                    {review.name}
                  </h4>
                  <span className="text-[11px] text-slate-400 block">{review.location}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284C7] bg-[#E0F2FE]/70 px-2 py-0.5 rounded">
                  {review.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO LIGHTBOX MODAL */}
      {selectedVideoIndex !== null && activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedVideoIndex(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-slate-950/70 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-sm text-white">
                  {activeVideo.studentName} — {activeVideo.courseName}
                </h3>
                <span className="text-[11px] text-slate-400">{activeVideo.snippet}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVideoIndex(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close video review modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 bg-slate-950/80 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedVideoIndex((prev) =>
                      prev !== null && prev > 0 ? prev - 1 : VIDEO_TESTIMONIALS.length - 1
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center space-x-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedVideoIndex((prev) =>
                      prev !== null && prev < VIDEO_TESTIMONIALS.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center space-x-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <TrialModalButton className="py-2 px-4 rounded-xl text-xs font-bold">
                <span>Book Free Trial</span>
              </TrialModalButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
