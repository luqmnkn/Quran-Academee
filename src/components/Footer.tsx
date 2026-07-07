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

            <div className="flex items-center space-x-3.5 pt-4">
              <a
                href="https://www.facebook.com/share/1AjoSTvuiw/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.03] hover:bg-gradient-to-br hover:from-[#1C8DC8] hover:to-[#3D8DC3] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-[#1C8DC8]/40 shadow-md hover:shadow-[0_0_15px_rgba(28,141,200,0.35)] hover:-translate-y-1 transform group"
                aria-label="Facebook"
              >
                <Facebook size={18} className="transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://www.instagram.com/zikr_academy"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.03] hover:bg-gradient-to-br hover:from-[#1C8DC8] hover:to-[#3D8DC3] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-[#1C8DC8]/40 shadow-md hover:shadow-[0_0_15px_rgba(28,141,200,0.35)] hover:-translate-y-1 transform group"
                aria-label="Instagram"
              >
                <Instagram size={18} className="transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://youtube.com/@zikr_academy"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.03] hover:bg-gradient-to-br hover:from-[#1C8DC8] hover:to-[#3D8DC3] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-[#1C8DC8]/40 shadow-md hover:shadow-[0_0_15px_rgba(28,141,200,0.35)] hover:-translate-y-1 transform group"
                aria-label="YouTube"
              >
                <Youtube size={18} className="transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://www.linkedin.com/company/zikr-academy/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.03] hover:bg-gradient-to-br hover:from-[#1C8DC8] hover:to-[#3D8DC3] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-[#1C8DC8]/40 shadow-md hover:shadow-[0_0_15px_rgba(28,141,200,0.35)] hover:-translate-y-1 transform group"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="transition-transform duration-300 group-hover:scale-110" />
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
                  <a href="https://wa.me/18186509752" target="_blank" rel="noreferrer" className="text-white hover:text-[#1C8DC8] font-semibold block mt-0.5">
                    +1 (818) 650-9752
                  </a>
                </div>
              </li>

              <li className="flex items-start space-x-2.5">
                <Mail size={14} className="text-[#1C8DC8] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] block uppercase text-slate-400">Email Help desk</span>
                  <a href="mailto:support@zikr.academy" className="text-white hover:text-[#1C8DC8] font-semibold block mt-0.5">
                    support@zikr.academy
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
          <p>© {currentYear} Zikr Online Quran Academy. All Rights Reserved. Recite with Beauty.</p>
          <div className="flex items-center space-x-4">
            <span>Designed with complete respect for Quranic learning</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
