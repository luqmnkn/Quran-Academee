import React from 'react';
import navbarLogo from '../assets/images/navbarlogo.png';
import footerLogo from '../assets/images/footerLogo.png';

interface LogoProps {
  className?: string;
  isDarkBg?: boolean;
}

export default function Logo({ className = '', isDarkBg = false }: LogoProps) {
  const logoSrc = isDarkBg ? footerLogo : navbarLogo;

  return (
    <div id="zikr-brand-logo" className={`flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="Zikr Academy Logo"
        className="h-9 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
