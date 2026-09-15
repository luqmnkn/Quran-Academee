'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onOpenTrialModal: () => void;
}

export default function Header({ onOpenTrialModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver & scroll position
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection('home');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && window.scrollY >= 120) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const sections = ['home', 'courses', 'about'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Course', href: '/#courses' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About Us', href: '/#about' },
  ];

  const isLinkActive = (linkHref: string) => {
    if (pathname === '/pricing') {
      return linkHref === '/pricing';
    }
    if (pathname === '/') {
      if (linkHref === '/pricing') return false;
      if (linkHref === '/') {
        return activeSection === 'home' || activeSection === '';
      }
      if (linkHref === '/#courses') {
        return activeSection === 'courses';
      }
      if (linkHref === '/#about') {
        return activeSection === 'about';
      }
    }
    return false;
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    setIsMobileMenuOpen(false);
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash) {
        window.history.pushState(null, '', window.location.pathname);
      }
      setActiveSection('home');
    }
  };

  const getHeaderClass = () => {
    if (isScrolled) {
      if (isMobileMenuOpen) {
        return 'top-0 w-full rounded-none bg-white border-b border-[#E0F2FE]/60 shadow-[0_4px_20px_rgba(0,0,0,0.05)] px-4 sm:px-8 py-2.5';
      } else {
        return 'top-3 w-[92%] max-w-6xl rounded-[28px] bg-white/90 border border-[#E0F2FE] shadow-[0_12px_40px_rgba(28,141,200,0.12)] backdrop-blur-xl px-5 sm:px-8 py-2 md:py-1.5';
      }
    } else {
      return 'top-0 w-full max-w-[1920px] rounded-none bg-transparent border-transparent shadow-none backdrop-blur-none px-4 sm:px-8 py-2 sm:py-3';
    }
  };

  return (
    <header 
      id="main-navigation-header"
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${getHeaderClass()}`}
    >
      <div className="w-full flex items-center justify-between">
        {/* Left Side: Quran Academee Brand Logo */}
        <Link
          href="/"
          onClick={handleHomeClick}
          className="flex items-center shrink-0"
        >
          <Logo isDarkBg={false} />
        </Link>

        {/* Center: Desktop Navigation Links (Removed div background and border) */}
        <nav className="hidden md:flex items-center space-x-1.5 p-1.5">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={link.href === '/' ? handleHomeClick : handleLinkClick}
                className={`text-xs tracking-wider font-extrabold uppercase px-4.5 py-2 transition-all duration-300 relative flex items-center justify-center cursor-pointer select-none ${
                  isActive
                    ? 'text-[#1C8DC8]'
                    : 'text-slate-600 hover:text-[#1C8DC8]'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {/* Active indicator: Soft & Light Bottom Line */}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#1C8DC8]/60 rounded-full z-0"
                    transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.8 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Book Free Trial and Mobile Toggle */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenTrialModal();
            }}
            className="bg-gradient-to-r from-[#1C8DC8] via-[#3D8DC3] to-[#146299] hover:from-[#146299] hover:to-[#1C8DC8] text-white font-extrabold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-2.5 rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(28,141,200,0.22)] hover:shadow-[0_12px_28px_rgba(28,141,200,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer uppercase tracking-wide"
          >
            Enroll
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
            className="md:hidden bg-white border border-[#E0F2FE] mt-4 mx-2 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(28,141,200,0.18)] relative"
          >
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1C8DC8]/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="px-5 py-6 space-y-3.5 flex flex-col relative z-10">
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#146299]/60 px-3 pb-1 border-b border-[#E0F2FE]/50">
                Navigation
              </div>
              
              {navLinks.map((link, i) => {
                const isActive = isLinkActive(link.href);
                return (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={link.name}
                  >
                    <Link
                      href={link.href}
                      onClick={link.href === '/' ? handleHomeClick : handleLinkClick}
                      className={`text-base font-bold py-3 px-4 rounded-xl transition-all uppercase tracking-wider flex items-center justify-between ${
                        isActive
                          ? 'bg-[#F0F9FF] text-[#1C8DC8] border border-[#E0F2FE] shadow-sm'
                          : 'text-slate-600 hover:bg-[#F0F9FF]/60 hover:text-[#1C8DC8]'
                      }`}
                    >
                      <span>{link.name}</span>
                      <span className={`w-1.5 h-1.5 rounded-full bg-[#1C8DC8] transition-transform duration-300 ${isActive ? 'scale-100' : 'scale-0'}`} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}