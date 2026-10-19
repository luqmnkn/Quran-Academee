'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface TrialModalButtonProps {
  courseName?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
}

export default function TrialModalButton({
  courseName,
  className = '',
  children,
  variant = 'primary',
}: TrialModalButtonProps) {
  const handleOpen = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.set('trial', 'true');
      if (courseName) {
        params.set('plan', courseName);
        params.set('course', courseName);
      }
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, '', newUrl);
      window.dispatchEvent(new Event('open-trial-modal'));
    }
  };

  const baseStyle =
    'inline-flex items-center justify-center font-display font-extrabold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer select-none';

  let variantStyle =
    'bg-gradient-to-r from-[#1C8DC8] via-[#3D8DC3] to-[#146299] hover:from-[#146299] hover:to-[#1C8DC8] text-white shadow-[0_10px_25px_rgba(28,141,200,0.25)] hover:shadow-[0_14px_35px_rgba(28,141,200,0.35)] hover:-translate-y-0.5 active:translate-y-0';

  if (variant === 'secondary') {
    variantStyle =
      'bg-[#0B3951] hover:bg-[#1C8DC8] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5';
  } else if (variant === 'outline') {
    variantStyle =
      'border border-[#1C8DC8]/40 hover:border-[#1C8DC8] text-[#146299] bg-white/90 hover:bg-[#F0F9FF] shadow-sm';
  } else if (variant === 'white') {
    variantStyle =
      'bg-white text-[#0B3951] hover:bg-slate-100 shadow-lg hover:-translate-y-0.5';
  }

  return (
    <button
      type="button"
      onClick={handleOpen}
      className={`${baseStyle} ${variantStyle} ${className}`}
    >
      {children || (
        <>
          <span>Book Free Trial Class</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </>
      )}
    </button>
  );
}
