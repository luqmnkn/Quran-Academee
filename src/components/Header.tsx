import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

interface HeaderProps {
  onOpenTrialModal: () => void;
}

export default function Header({ onOpenTrialModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: '/', hash: '' },
    { name: 'Course', to: '/#courses', hash: '#courses' },
    { name: 'Pricing', to: '/pricing', hash: '' },
    { name: 'About Us', to: '/#about', hash: '#about' },
  ];

  const isLinkActive = (link: typeof navLinks[0]) => {
    if (link.to === '/pricing') {
      return location.pathname === '/pricing';
    }
    if (location.pathname === '/') {
      if (link.hash) {
        return location.hash === link.hash;
      } else {
        return location.hash === '' || location.hash === '#home';
      }
    }
    return false;
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const getHeaderClass = () => {
    if (isScrolled) {
      if (isMobileMenuOpen) {
        // Scrolled and mobile menu is open: full-width, no rounding, solid white background
        return 'top-0 w-full rounded-none bg-white border-b border-[#E0F2FE]/60 shadow-[0_4px_20px_rgba(0,0,0,0.05)] px-4 sm:px-8 py-2.5';
      } else {
        // Scrolled and menu is closed: rounded and elegant, backdrop-blur only on desktop (not mobile)
        return 'top-2 w-[92%] max-w-6xl rounded-[24px] bg-white md:bg-white/85 border border-[#E0F2FE] shadow-[0_4px_20px_rgba(0,0,0,0.05)] md:shadow-[0_15px_45px_rgba(28,141,200,0.12)] md:backdrop-blur-lg px-4 sm:px-8 py-2 md:py-1.5';
      }
    } else {
      // Not scrolled: transparent background, full-width
      return 'top-0 w-full max-w-[1920px] rounded-none bg-transparent border-transparent shadow-none backdrop-blur-none px-4 sm:px-8 py-2 sm:py-3';
    }
  };

  return (
    <header 
      id="main-navigation-header"
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${getHeaderClass()}`}
    >
      <div className="w-full flex items-center justify-between">
        {/* Left Side: Quran Academee Brand Logo */}
        <Link
          to="/"
          onClick={handleLinkClick}
          className="flex items-center shrink-0"
        >
          <Logo isDarkBg={false} />
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link);
            return (
              <Link
                key={link.name}
                to={link.to + (link.hash || '')}
                onClick={handleLinkClick}
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
            className="bg-[#1C8DC8] hover:bg-[#3D8DC3] text-white font-bold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:scale-102 active:scale-98 cursor-pointer uppercase tracking-wide"
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
                const isActive = isLinkActive(link);
                return (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={link.name}
                  >
                    <Link
                      to={link.to + (link.hash || '')}
                      onClick={handleLinkClick}
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