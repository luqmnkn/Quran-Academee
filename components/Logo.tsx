import React from 'react';
import navbarLogo from '../public/images/navbarlogo.png';
import footerLogo from '../public/images/footerLogo.png';

interface LogoProps {
  className?: string;
  isDarkBg?: boolean;
  sizeClass?: string;
  priority?: boolean;
}

export default function Logo({
  className = '',
  isDarkBg = false,
  sizeClass = '',
  priority = false,
}: LogoProps) {
  // Select dynamic logo asset based on background contrast
  const logoSrc = isDarkBg ? footerLogo : navbarLogo;

  // Default dimensions optimized for navbar and footer clarity
  const finalSizeClass =
    sizeClass || (isDarkBg ? 'h-14 sm:h-16 md:h-20' : 'h-6 sm:h-7.5 md:h-8');

  return (
    <div
      id="quran-academee-brand-logo"
      className={`inline-flex items-center shrink-0 select-none ${className}`}
    >
      <img
        src={typeof logoSrc === 'string' ? logoSrc : (logoSrc as any)?.src || logoSrc}
        alt="Quran Academee Logo"
        className={`${finalSizeClass} w-auto object-contain transition-all duration-300 hover:scale-[1.02]`}
        loading={priority || !isDarkBg ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}