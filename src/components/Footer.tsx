import React from 'react';
import { Phone, Mail, Clock, MessageSquare, ArrowUpRight, Instagram, Linkedin, Facebook, Youtube } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  currentPage?: 'home' | 'pricing';
  onNavigate?: (page: 'home' | 'pricing', sectionId?: string) => void;
}

export default function Footer({ currentPage = 'home', onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    let page: 'home' | 'pricing' = 'home';
    if (id === '#pricing') {
      page = 'pricing';
    }

    if (onNavigate) {
      onNavigate(page, id);
    } else {
      const target = document.querySelector(id);
      if (target) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = target.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <footer className="bg-[#0B3951] text-white pt-16 pb-8 border-t border-[#1C8DC8]/20 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1C8DC8] via-[#3D8DC3] to-[#146299]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-12 mb-10 text-left">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '#home')}
              className="flex items-center group"
            >
              <Logo isDarkBg={true} className="transition-transform duration-300 group-hover:scale-[1.02]" />
            </a>
            
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              An international online Quran academy providing personalized 1-on-1 certified live instruction for children and adults. Helping families master Tajweed and Quran memorization at home.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-4">
              <a
                href="https://www.facebook.com/quranacademee1"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.03] hover:bg-gradient-to-br hover:from-[#1C8DC8] hover:to-[#3D8DC3] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-[#1C8DC8]/40 shadow-md hover:shadow-[0_0_15px_rgba(28,141,200,0.35)] hover:-translate-y-1 transform group"
                aria-label="Facebook"
              >
                <Facebook size={16} className="transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://www.instagram.com/quranacademee/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.03] hover:bg-gradient-to-br hover:from-[#1C8DC8] hover:to-[#3D8DC3] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-[#1C8DC8]/40 shadow-md hover:shadow-[0_0_15px_rgba(28,141,200,0.35)] hover:-translate-y-1 transform group"
                aria-label="Instagram"
              >
                <Instagram size={16} className="transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://www.youtube.com/@quranacademee"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.03] hover:bg-gradient-to-br hover:from-[#1C8DC8] hover:to-[#3D8DC3] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-[#1C8DC8]/40 shadow-md hover:shadow-[0_0_15px_rgba(28,141,200,0.35)] hover:-translate-y-1 transform group"
                aria-label="YouTube"
              >
                <Youtube size={16} className="transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://www.linkedin.com/company/quran-academee"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.03] hover:bg-gradient-to-br hover:from-[#1C8DC8] hover:to-[#3D8DC3] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-[#1C8DC8]/40 shadow-md hover:shadow-[0_0_15px_rgba(28,141,200,0.35)] hover:-translate-y-1 transform group"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} className="transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://www.tiktok.com/@quranacademee"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.03] hover:bg-gradient-to-br hover:from-[#1C8DC8] hover:to-[#3D8DC3] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-[#1C8DC8]/40 shadow-md hover:shadow-[0_0_15px_rgba(28,141,200,0.35)] hover:-translate-y-1 transform group"
                aria-label="TikTok"
              >
                <svg className="w-[16px] h-[16px] fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.62 4.19 1.13 1.25 2.75 1.93 4.39 2.01v3.82c-1.39-.02-2.78-.39-3.97-1.12-.52-.31-.99-.71-1.39-1.17-.03 2.82-.02 5.64-.03 8.46-.05 1.63-.53 3.29-1.47 4.62-1.4 1.95-3.8 3.16-6.21 3.19-2.91.08-5.83-1.49-7.14-4.1-1.41-2.73-.81-6.24 1.43-8.32 1.4-1.3 3.36-1.9 5.25-1.57.01 1.34 0 2.69.01 4.03-.89-.24-1.89-.04-2.58.6-.74.65-1.04 1.74-.75 2.69.3 1.05 1.33 1.79 2.43 1.75 1.21-.01 2.22-1.03 2.22-2.24.01-4.99.01-9.98.01-14.97z"/>
                </svg>
              </a>
              <a
                href="https://www.reddit.com/user/quranacademee"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.03] hover:bg-gradient-to-br hover:from-[#1C8DC8] hover:to-[#3D8DC3] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-[#1C8DC8]/40 shadow-md hover:shadow-[0_0_15px_rgba(28,141,200,0.35)] hover:-translate-y-1 transform group"
                aria-label="Reddit"
              >
                <svg className="w-[16px] h-[16px] fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.29-1.72l1.35-4.24 3.71.79c.08.97.89 1.73 1.88 1.73 1.03 0 1.88-.85 1.88-1.88s-.85-1.88-1.88-1.88c-.88 0-1.62.61-1.81 1.44l-4.11-.88c-.14-.03-.29.04-.35.17l-1.5 4.71C7.79 8.1 5.51 8.75 3.84 9.75c-.56-.76-1.45-1.25-2.42-1.25-1.65 0-3 1.35-3 3 0 1.12.61 2.1 1.53 2.62-.06.44-.09.88-.09 1.33 0 3.86 4.49 7 10 7s10-3.14 10-7c0-.45-.03-.89-.09-1.33.92-.52 1.53-1.5 1.53-2.62zm-18 1c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm11 4.5c-1.77 1.77-5.15 1.77-6.92 0-.2-.2-.2-.51 0-.71.2-.2.51-.2.71 0 1.38 1.38 4.12 1.38 5.5 0 .2-.2.51-.2.71 0 .2.2.2.51 0 .71zm-1.5-3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#1C8DC8]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <a href="/" onClick={(e) => handleLinkClick(e, '#home')} className="hover:text-white hover:underline transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-white hover:underline transition-colors">About Us</a>
              </li>
              <li>
                <a href="#courses" onClick={(e) => handleLinkClick(e, '#courses')} className="hover:text-white hover:underline transition-colors">Programs</a>
              </li>
              <li>
                <a href="/pricing" onClick={(e) => handleLinkClick(e, '#pricing')} className="hover:text-white hover:underline transition-colors">Pricing Plans</a>
              </li>
              <li>
                <a href="#why-us" onClick={(e) => handleLinkClick(e, '#why-us')} className="hover:text-white hover:underline transition-colors">Why Learn Here</a>
              </li>
              <li>
                <a href="#faqs" onClick={(e) => handleLinkClick(e, '#faqs')} className="hover:text-white hover:underline transition-colors">Questions</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#1C8DC8]">
              Our Programs
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1C8DC8] shrink-0"></span>
                <a href="#courses" onClick={(e) => handleLinkClick(e, '#courses')} className="hover:text-white hover:underline transition-colors">Noorani Qaida Basics</a>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1C8DC8] shrink-0"></span>
                <a href="#courses" onClick={(e) => handleLinkClick(e, '#courses')} className="hover:text-white hover:underline transition-colors">Quran Recitation Reading</a>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1C8DC8] shrink-0"></span>
                <a href="#courses" onClick={(e) => handleLinkClick(e, '#courses')} className="hover:text-white hover:underline transition-colors">Master Tajweed Rules</a>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1C8DC8] shrink-0"></span>
                <a href="#courses" onClick={(e) => handleLinkClick(e, '#courses')} className="hover:text-white hover:underline transition-colors">Quran Memorization (Hifz)</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Core */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#1C8DC8]">
              Active Support
            </h4>
            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start space-x-2.5">
                <Phone size={14} className="text-[#1C8DC8] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] block uppercase text-slate-400">WhatsApp Number</span>
                  <a href="https://wa.me/923702680670" target="_blank" rel="noreferrer" className="text-white hover:text-[#1C8DC8] font-semibold block mt-0.5">
                    +92 370 2680670
                  </a>
                </div>
              </li>

              <li className="flex items-start space-x-2.5">
                <Mail size={14} className="text-[#1C8DC8] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] block uppercase text-slate-400">Email Help desk</span>
                  <a href="mailto:contact@quranacademee.com" className="text-white hover:text-[#1C8DC8] font-semibold block mt-0.5">
                    contact@quranacademee.com
                  </a>
                </div>
              </li>

              <li className="flex items-start space-x-2.5">
                <Clock size={14} className="text-[#1C8DC8] shrink-0 mt-0.5" />
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
