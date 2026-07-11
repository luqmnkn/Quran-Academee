import React from 'react';
import navbarLogo from '../assets/images/navbarlogo.png';
import footerLogo from '../assets/images/footerLogo.png';

interface LogoProps {
  className?: string;
  isDarkBg?: boolean;
  sizeClass?: string;
}

export default function Logo({ className = '', isDarkBg = false, sizeClass = '' }: LogoProps) {
  const logoSrc = isDarkBg ? footerLogo : navbarLogo;
  const finalSizeClass = sizeClass || (isDarkBg ? "h-14 sm:h-16 md:h-20" : "h-6 sm:h-7.5 md:h-8");

  return (
    <div id="quran-academee-brand-logo" className={`flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="Quran Academee Logo"
        className={`${finalSizeClass} w-auto object-contain transition-all duration-300 hover:scale-[1.03]`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
