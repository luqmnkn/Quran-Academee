import React from 'react';
import Link from 'next/link';
import Logo from './Logo';

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
              <Logo isDarkBg={true} className="transition-transform duration-300 group-hover:scale-[1.02]" />
            </Link>
            
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              An international online Quran academy providing personalized 1-on-1 certified live instruction for children and adults. Helping families master Tajweed and Quran memorization at home.
            </p>
 
            <div className="flex flex-wrap items-center gap-2 pt-4">
              <a
                href="https://www.facebook.com/quranacademee1"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1877F2] text-white flex items-center justify-center transition-all duration-300 border border-transparent shadow-md hover:shadow-[0_0_15px_rgba(24,119,242,0.4)] hover:-translate-y-1 transform group"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f text-base transition-transform duration-300 group-hover:scale-110"></i>
              </a>
              <a
                href="https://www.instagram.com/quranacademee/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FFDC80] via-[#E1306C] to-[#C13584] text-white flex items-center justify-center transition-all duration-300 border border-transparent shadow-md hover:shadow-[0_0_15px_rgba(225,48,108,0.4)] hover:-translate-y-1 transform group"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram text-base transition-transform duration-300 group-hover:scale-110"></i>
              </a>
              <a
                href="https://www.youtube.com/@quranacademee"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#FF0000] text-white flex items-center justify-center transition-all duration-300 border border-transparent shadow-md hover:shadow-[0_0_15px_rgba(255,0,0,0.4)] hover:-translate-y-1 transform group"
                aria-label="YouTube"
              >
                <i className="fa-brands fa-youtube text-base transition-transform duration-300 group-hover:scale-110"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/quran-academee"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center transition-all duration-300 border border-transparent shadow-md hover:shadow-[0_0_15px_rgba(10,102,194,0.4)] hover:-translate-y-1 transform group"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in text-base transition-transform duration-300 group-hover:scale-110"></i>
              </a>
              <a
                href="https://www.tiktok.com/@quranacademee"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#000000] text-white flex items-center justify-center transition-all duration-300 border border-transparent shadow-md hover:shadow-[0_0_15px_rgba(0,0,0,0.4)] hover:-translate-y-1 transform group"
                aria-label="TikTok"
              >
                <i className="fa-brands fa-tiktok text-base transition-transform duration-300 group-hover:scale-110"></i>
              </a>
              <a
                href="https://www.reddit.com/user/quranacademee"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#FF4500] text-white flex items-center justify-center transition-all duration-300 border border-transparent shadow-md hover:shadow-[0_0_15px_rgba(255,69,0,0.4)] hover:-translate-y-1 transform group"
                aria-label="Reddit"
              >
                <i className="fa-brands fa-reddit-alien text-base transition-transform duration-300 group-hover:scale-110"></i>
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
                  <Link href="/#about" className="hover:text-white hover:underline transition-colors">About Us</Link>
                </li>
                <li>
                  <Link href="/#courses" className="hover:text-white hover:underline transition-colors">Programs</Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white hover:underline transition-colors">Pricing Plans</Link>
                </li>
                <li>
                  <Link href="/#why-us" className="hover:text-white hover:underline transition-colors">Why Learn Here</Link>
                </li>
                <li>
                  <Link href="/#faqs" className="hover:text-white hover:underline transition-colors">Questions</Link>
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
                  <Link href="/#courses" className="hover:text-white hover:underline transition-colors">Alqaida Almadania Basics</Link>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C8DC8] shrink-0"></span>
                  <Link href="/#courses" className="hover:text-white hover:underline transition-colors">Quran Recitation & Reading</Link>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C8DC8] shrink-0"></span>
                  <Link href="/#courses" className="hover:text-white hover:underline transition-colors">Tajweed al Quran</Link>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C8DC8] shrink-0"></span>
                  <Link href="/#courses" className="hover:text-white hover:underline transition-colors">Quran Memorization (Hifz)</Link>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C8DC8] shrink-0"></span>
                  <Link href="/#courses" className="hover:text-white hover:underline transition-colors">Islamic Essentials & Duas</Link>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C8DC8] shrink-0"></span>
                  <Link href="/#courses" className="hover:text-white hover:underline transition-colors">Hifz Revision Partner</Link>
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
                  <a href="https://wa.me/923702680670" target="_blank" rel="noreferrer" className="text-white hover:text-[#1C8DC8] font-semibold block mt-0.5">
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

        {/* Brand Bottom line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} Quran Academee. All Rights Reserved. Recite with Beauty.</p>
          <div className="flex items-center space-x-4">
            <span>Designed with complete respect for Quranic learning</span>
          </div>
        </div>

      </div>
    </footer>
  );
}