'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface FloatingControlsProps {
  onOpenTrialModal: () => void;
}

export default function FloatingControls({ onOpenTrialModal }: FloatingControlsProps) {
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal floating controls only after scrolling past the main hero fold (400px)
      setShowControls(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showControls && (
        <>
          {/* ================= DESKTOP VIEW ================= */}
          {/* Desktop FAB in the bottom left to avoid overlapping the WhatsApp chat trigger */}
          <motion.button
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 120 }}
            onClick={onOpenTrialModal}
            aria-label="Book Free Trial"
            className="hidden md:flex fixed bottom-8 left-8 z-40 h-[52px] pl-5 pr-6 bg-gradient-to-r from-[#1C8DC8] to-[#3D8DC3] hover:from-[#146299] hover:to-[#1C8DC8] text-white font-display font-black text-xs uppercase tracking-widest rounded-full items-center space-x-2.5 shadow-[0_12px_36px_rgba(28,141,200,0.3)] hover:scale-[1.03] transition-all cursor-pointer border border-sky-200/30"
          >
            <Calendar size={15} className="animate-pulse" />
            <span>Book Free Trial</span>
          </motion.button>

          {/* ================= MOBILE VIEW ================= */}
          {/* Mobile Sticky CTA Trigger (Positioned at bottom center) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 20, stiffness: 120 }}
            className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] z-40 text-center"
          >
            <button
              onClick={onOpenTrialModal}
              aria-label="Book Free Trial Now"
              className="w-full h-12 bg-gradient-to-r from-[#1C8DC8] to-[#3D8DC3] text-white font-display font-black text-xs uppercase tracking-widest rounded-full flex items-center justify-center space-x-2 shadow-[0_10px_30px_rgba(28,141,200,0.35)] border border-sky-200/30 active:scale-[0.98] transition-transform cursor-pointer"
            >
              <Calendar size={15} className="animate-pulse" />
              <span>Book Free Trial Now</span>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}