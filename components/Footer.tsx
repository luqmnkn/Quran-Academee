'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { trackWhatsAppClick } from '@/utils/gtm';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B3951] text-white pt-20 pb-8 relative overflow-hidden">
      {/* Soft Gradient Canvas Entry Blend */}
      <div className="absolute -top-12 inset-x-0 h-12 bg-gradient-to-b from-white via-white/50 to-transparent pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#0B3951]/40 via-[#0B3951]/80 to-[#0B3951] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-12 mb-10 text-left">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <Link
              href="/"
              className="flex items-center group"
            >
              <Logo isDarkBg={true} sizeClass="h-20 sm:h-24 md:h-28 lg:h-32" className="transition-transform duration-300 group-hover:scale-[1.02]" />
            </Link>
            
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              An international Quran academy guiding students from proper reading and Hifz to deep translation, character building, and daily life application.
            </p>
 
            <div className="flex flex-wrap items-center gap-2 pt-4">
              <a
                href="https://www.facebook.com/quranacademee1"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1877F2] text-white flex items-center justify-center transition-all duration-300 border border-transparent shadow-md hover:shadow-[0_0_15px_rgba(24,119,242,0.4)] hover:-translate-y-1 transform group"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/quranacademee/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FFDC80] via-[#E1306C] to-[#C13584] text-white flex items-center justify-center transition-all duration-300 border border-transparent shadow-md hover:shadow-[0_0_15px_rgba(225,48,108,0.4)] hover:-translate-y-1 transform group"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@quranacademee"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#FF0000] text-white flex items-center justify-center transition-all duration-300 border border-transparent shadow-md hover:shadow-[0_0_15px_rgba(255,0,0,0.4)] hover:-translate-y-1 transform group"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/quran-academee"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center transition-all duration-300 border border-transparent shadow-md hover:shadow-[0_0_15px_rgba(10,102,194,0.4)] hover:-translate-y-1 transform group"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@quranacademee"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#000000] text-white flex items-center justify-center transition-all duration-300 border border-transparent shadow-md hover:shadow-[0_0_15px_rgba(0,0,0,0.4)] hover:-translate-y-1 transform group"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a
                href="https://www.reddit.com/user/quranacademee"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#FF4500] text-white flex items-center justify-center transition-all duration-300 border border-transparent shadow-md hover:shadow-[0_0_15px_rgba(255,69,0,0.4)] hover:-translate-y-1 transform group"
                aria-label="Reddit"
              >
                <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Columns 2 & 3: Quick Links & Programs side-by-side on mobile, grouped on desktop */}
          <div className="md:col-span-5 grid grid-cols-2 gap-6">
            {/* Column 2: Quick Navigation */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#1C8DC8]">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
                <li>
                  <Link href="/" className="hover:text-white hover:underline transition-colors">Home</Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white hover:underline transition-colors">About Us</Link>
                </li>
                <li>
                  <Link href="/teachers" className="hover:text-white hover:underline transition-colors">Our Teachers</Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-white hover:underline transition-colors">Programs</Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white hover:underline transition-colors">Pricing Plans</Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-white hover:underline transition-colors">Free Resources</Link>
                </li>
                <li>
                  <Link href="/reviews" className="hover:text-white hover:underline transition-colors">Student Reviews</Link>
                </li>
                <li>
                  <Link href="/free-trial" className="hover:text-white hover:underline transition-colors">Free Trial</Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Programs */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#1C8DC8]">
                Our Programs
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C8DC8] shrink-0"></span>
                  <Link href="/courses/madani-qaida-online" className="hover:text-white hover:underline transition-colors">Alqaida Almadania Basics</Link>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C8DC8] shrink-0"></span>
                  <Link href="/courses/quran-reading-online" className="hover:text-white hover:underline transition-colors">Quran Recitation & Reading</Link>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C8DC8] shrink-0"></span>
                  <Link href="/courses/online-tajweed-classes" className="hover:text-white hover:underline transition-colors">Tajweed al Quran</Link>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C8DC8] shrink-0"></span>
                  <Link href="/courses/online-hifz-program" className="hover:text-white hover:underline transition-colors">Quran Memorization (Hifz)</Link>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C8DC8] shrink-0"></span>
                  <Link href="/courses/hifz-revision-partner" className="hover:text-white hover:underline transition-colors">Hifz Revision Partner</Link>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C8DC8] shrink-0"></span>
                  <Link href="/courses/islamic-studies-for-kids" className="hover:text-white hover:underline transition-colors">Islamic Essentials & Duas</Link>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C8DC8] shrink-0"></span>
                  <Link href="/courses/quranic-arabic-online" className="hover:text-white hover:underline transition-colors">Quranic Arabic Online</Link>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C8DC8] shrink-0"></span>
                  <Link href="/courses/conversational-arabic-online" className="hover:text-white hover:underline transition-colors">Conversational Arabic Online</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Contact Core */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#1C8DC8]">
              Active Support
            </h4>
            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start space-x-2.5">
                <span className="material-symbols-outlined text-[16px] leading-none select-none text-[#1C8DC8] shrink-0 mt-0.5">phone</span>
                <div>
                  <span className="text-[10px] block uppercase text-slate-400">WhatsApp Number</span>
                  <a
                    href="https://wa.me/923702680670"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackWhatsAppClick('footer_link')}
                    className="text-white hover:text-[#1C8DC8] font-semibold block mt-0.5"
                  >
                    +92 370 2680670
                  </a>
                </div>
              </li>

              <li className="flex items-start space-x-2.5">
                <span className="material-symbols-outlined text-[16px] leading-none select-none text-[#1C8DC8] shrink-0 mt-0.5">mail</span>
                <div>
                  <span className="text-[10px] block uppercase text-slate-400">Email Help desk</span>
                  <a href="mailto:contact@quranacademee.com" className="text-white hover:text-[#1C8DC8] font-semibold block mt-0.5">
                    contact@quranacademee.com
                  </a>
                </div>
              </li>

              <li className="flex items-start space-x-2.5">
                <span className="material-symbols-outlined text-[16px] leading-none select-none text-[#1C8DC8] shrink-0 mt-0.5">schedule</span>
                <div>
                  <span className="text-[10px] block uppercase text-slate-400">School Timing</span>
                  <p className="text-white font-medium mt-0.5">24/7 (Flexible Custom Hours)</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Audience & Global Locations Bar */}
        <div className="border-t border-white/10 pt-6 pb-6 mb-6 text-xs text-slate-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <span className="text-[#1C8DC8] font-bold uppercase tracking-wider text-[11px]">Specialized:</span>
              <Link href="/online-quran-classes-for-kids" className="hover:text-white hover:underline transition-colors">Classes for Kids</Link>
              <span className="opacity-30">·</span>
              <Link href="/learn-quran-online-for-adults" className="hover:text-white hover:underline transition-colors">Classes for Adults</Link>
              <span className="opacity-30">·</span>
              <Link href="/female-quran-teacher-online" className="hover:text-white hover:underline transition-colors">Female Quran Teachers</Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <span className="text-[#1C8DC8] font-bold uppercase tracking-wider text-[11px]">Worldwide:</span>
              <Link href="/online-quran-classes-uk" className="hover:text-white hover:underline transition-colors">United Kingdom</Link>
              <span className="opacity-30">·</span>
              <Link href="/online-quran-classes-usa" className="hover:text-white hover:underline transition-colors">United States</Link>
              <span className="opacity-30">·</span>
              <Link href="/online-quran-classes-canada" className="hover:text-white hover:underline transition-colors">Canada</Link>
              <span className="opacity-30">·</span>
              <Link href="/online-quran-classes-australia" className="hover:text-white hover:underline transition-colors">Australia</Link>
            </div>
          </div>
        </div>

        {/* Brand Bottom line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {currentYear} Quran Academee. All Rights Reserved.</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1" aria-label="Legal navigation">
            <Link href="/privacy-policy" className="hover:text-white hover:underline transition-colors">Privacy Policy</Link>
            <span className="hidden sm:inline opacity-30">·</span>
            <Link href="/terms" className="hover:text-white hover:underline transition-colors">Terms of Service</Link>
            <span className="hidden sm:inline opacity-30">·</span>
            <Link href="/refund-policy" className="hover:text-white hover:underline transition-colors">Refund Policy</Link>
          </nav>
        </div>

      </div>
    </footer>
  );
}
