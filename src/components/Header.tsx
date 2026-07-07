import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, LogIn } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onOpenTrialModal: () => void;
  currentPage: 'home' | 'pricing';
  activeSection: 'home' | 'pricing' | 'courses';
  onNavigate: (page: 'home' | 'pricing', sectionId?: string) => void;
}

export default function Header({ onOpenTrialModal, currentPage, activeSection, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', page: 'home' as const, activeKey: 'home' as const, href: '#home' },
    { name: 'Course', page: 'home' as const, activeKey: 'courses' as const, href: '#courses' },
    { name: 'Class', page: 'pricing' as const, activeKey: 'pricing' as const, href: '#pricing' },
    { name: 'About Us', page: 'home' as const, activeKey: 'about' as const, href: '#about' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, page: 'home' | 'pricing', href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (href === '#home' || href === '#courses' || href === '#about') {
      onNavigate('home', href);
    } else if (href === '#pricing') {
      onNavigate('pricing');
    }
  };

  return (
    <header 
      id="main-navigation-header"
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-[750ms] ease-[cubic-bezier(0.25,1,0.5,1)] delay-[50ms] ${
        isScrolled 
          ? 'top-3 w-[92%] max-w-6xl rounded-2xl md:rounded-full bg-white/95 border border-[#E0F2FE] shadow-[0_15px_45px_rgba(28,141,200,0.12)] backdrop-blur-lg px-4 sm:px-8 py-2.5 sm:py-3' 
          : 'top-0 w-full rounded-none bg-white/90 border-b border-[#E0F2FE]/60 backdrop-blur-md px-4 sm:px-8 py-4 sm:py-5.5'
      }`}
    >
      <div className="w-full flex items-center justify-between">
        {/* Left Side: ZIKR Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, 'home', '#home')}
          className="flex items-center shrink-0"
        >
          <Logo isDarkBg={false} />
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {navLinks.map((link) => {
            const isActive = activeSection === link.activeKey;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.page, link.href)}
                className={`text-sm tracking-wide font-medium transition-all duration-200 uppercase relative py-1 ${
                  isActive
                    ? 'text-[#0B3951] font-semibold'
                    : 'text-slate-600 hover:text-[#1C8DC8]'
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#1C8DC8] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Side: Log In, Register, and Mobile Toggle */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenTrialModal();
            }}
            className="hidden xs:block text-sm font-semibold text-[#0B3951] hover:text-[#1C8DC8] transition-colors duration-200 uppercase tracking-wide cursor-pointer"
          >
            Log In
          </button>
          
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenTrialModal();
            }}
            className="bg-[#1C8DC8] hover:bg-[#3D8DC3] text-white font-bold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:scale-102 active:scale-98 cursor-pointer"
          >
            Register
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#0B3951] hover:text-[#1C8DC8] p-2 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Responsive Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-gradient-to-br from-white via-white to-[#F0F9FF]/95 border border-[#E0F2FE] mt-4 mx-2 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(28,141,200,0.18)] backdrop-blur-xl relative"
          >
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1C8DC8]/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="px-5 py-6 space-y-3.5 flex flex-col relative z-10">
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#146299]/60 px-3 pb-1 border-b border-[#E0F2FE]/50">
                Navigation
              </div>
              
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.activeKey;
                return (
                  <motion.a
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.page, link.href)}
                    className={`text-base font-bold py-3 px-4 rounded-xl transition-all uppercase tracking-wider flex items-center justify-between ${
                      isActive
                        ? 'bg-gradient-to-r from-[#F0F9FF] to-[#E0F2FE] text-[#1C8DC8] border border-[#E0F2FE] shadow-sm'
                        : 'text-slate-600 hover:bg-[#F0F9FF]/60 hover:text-[#1C8DC8]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className={`w-1.5 h-1.5 rounded-full bg-[#1C8DC8] transition-transform duration-300 ${isActive ? 'scale-100' : 'scale-0'}`} />
                  </motion.a>
                );
              })}
              <div className="pt-4 mt-2 border-t border-[#E0F2FE] flex flex-col space-y-3 px-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenTrialModal();
                  }}
                  className="w-full text-center py-3.5 rounded-xl bg-gradient-to-r from-[#0B3951] to-[#146299] hover:from-[#1C8DC8] hover:to-[#146299] text-white text-sm font-extrabold uppercase tracking-wider cursor-pointer shadow-md transition-all active:scale-98"
                >
                  Log In / Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
