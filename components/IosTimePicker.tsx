'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Clock, X } from 'lucide-react';

interface IosTimePickerProps {
  value: string;
  onChange: (newTime: string) => void;
  label?: string;
}

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
const PERIODS = ['AM', 'PM'];

const ITEM_HEIGHT = 40; // Height of each row in px
const VISIBLE_COUNT = 5; // 2 above, 1 selected in center, 2 below
const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_COUNT; // 200px
const PADDING_Y = ITEM_HEIGHT * 2; // 80px top and bottom offset so index 0 centers at scrollTop 0

interface WheelColumnProps {
  items: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}

function WheelColumn({ items, selectedIndex, onSelect, className = '' }: WheelColumnProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  // Sync internal active index when prop changes
  useEffect(() => {
    setActiveIndex(selectedIndex);
  }, [selectedIndex]);

  // Scroll to selected position
  const scrollToSelected = useCallback(
    (index: number, smooth = true) => {
      if (!containerRef.current) return;
      const targetScroll = index * ITEM_HEIGHT;
      if (Math.abs(containerRef.current.scrollTop - targetScroll) > 1) {
        containerRef.current.scrollTo({
          top: targetScroll,
          behavior: smooth ? 'smooth' : 'auto',
        });
      }
    },
    []
  );

  // Initial scroll position on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToSelected(selectedIndex, false);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll events with debounce to snap and select
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const rawIndex = Math.round(scrollTop / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(rawIndex, items.length - 1));

    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
    }

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      onSelect(clampedIndex);
      scrollToSelected(clampedIndex, true);
    }, 120);
  };

  // Mouse Drag support for desktop
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startScrollTopRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    startScrollTopRef.current = containerRef.current.scrollTop;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const deltaY = e.clientY - startYRef.current;
    containerRef.current.scrollTop = startScrollTopRef.current - deltaY;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDraggingRef.current || !containerRef.current) return;
    isDraggingRef.current = false;
    const rawIndex = Math.round(containerRef.current.scrollTop / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(rawIndex, items.length - 1));
    onSelect(clampedIndex);
    scrollToSelected(clampedIndex, true);
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      className={`relative h-[200px] overflow-y-scroll overflow-x-hidden snap-y snap-mandatory select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${className}`}
      style={{
        paddingTop: `${PADDING_Y}px`,
        paddingBottom: `${PADDING_Y}px`,
        cursor: 'grab',
      }}
    >
      {items.map((item, index) => {
        const distance = Math.abs(index - activeIndex);

        // iOS wheel 3D scale and opacity calculation
        let textStyle = 'text-[#D0D0D2] text-sm opacity-40 font-normal';
        if (distance === 0) {
          textStyle = 'text-[#292929] text-xl font-bold opacity-100 scale-100';
        } else if (distance === 1) {
          textStyle = 'text-[#A0A0A0] text-base font-medium opacity-70 scale-95';
        } else if (distance === 2) {
          textStyle = 'text-[#C4C4C4] text-sm font-normal opacity-40 scale-90';
        } else {
          textStyle = 'text-[#E0E0E0] text-xs font-normal opacity-15 scale-85';
        }

        return (
          <div
            key={`${item}-${index}`}
            onClick={() => {
              onSelect(index);
              scrollToSelected(index, true);
            }}
            className={`h-[40px] flex items-center justify-center snap-center transition-all duration-150 cursor-pointer ${textStyle}`}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

export default function IosTimePicker({ value, onChange, label = 'Preferred Class Time' }: IosTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Parse initial value (e.g., "4:00 PM" or "Flexible / Any Time")
  const parseTime = (timeStr: string) => {
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (match) {
      let h = match[1];
      const m = match[2];
      const p = match[3].toUpperCase();
      // Ensure hour is within 1-12
      const numH = parseInt(h, 10);
      if (numH >= 1 && numH <= 12) {
        h = String(numH);
      } else {
        h = '4';
      }
      return { hour: h, minute: m, period: p };
    }
    return { hour: '4', minute: '00', period: 'PM' };
  };

  const initial = parseTime(value);

  // Temporary picker states (committed only on "Done")
  const [selectedHour, setSelectedHour] = useState(initial.hour);
  const [selectedMinute, setSelectedMinute] = useState(initial.minute);
  const [selectedPeriod, setSelectedPeriod] = useState(initial.period);

  // Re-sync picker when value prop changes or modal opens
  useEffect(() => {
    const parsed = parseTime(value);
    setSelectedHour(parsed.hour);
    setSelectedMinute(parsed.minute);
    setSelectedPeriod(parsed.period);
  }, [value, isOpen]);

  // Indices for wheel columns
  const hourIndex = Math.max(0, HOURS.indexOf(selectedHour));
  const minuteIndex = Math.max(0, MINUTES.indexOf(selectedMinute));
  const periodIndex = Math.max(0, PERIODS.indexOf(selectedPeriod));

  // Current preview string inside picker
  const currentPreviewTime = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;

  // Commit on "Done"
  const handleDone = () => {
    onChange(currentPreviewTime);
    setIsOpen(false);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#0B3951] mb-1">
          {label}
        </label>
      )}

      {/* Trigger Row: Left label "Time", Right value "4:00 PM" with chevron */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full bg-[#F0F9FF] border border-[#E0F2FE] hover:border-[#1C8DC8] focus:border-[#1C8DC8] rounded-lg px-3.5 py-2.5 text-xs outline-none transition-all cursor-pointer flex items-center justify-between group text-left"
      >
        <span className="font-semibold text-slate-700 flex items-center gap-1.5">
          <Clock size={13} className="text-[#1C8DC8]" />
          <span>Time</span>
        </span>
        <span className="font-bold text-[#0B3951] group-hover:text-[#6542E8] flex items-center gap-1.5 transition-colors">
          <span>{value || '4:00 PM'}</span>
          <ChevronRight size={14} className="text-slate-400 group-hover:text-[#6542E8] transition-colors" />
        </span>
      </button>

      {/* iOS Time Picker Modal / Bottom Sheet */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Surface (Bottom sheet on mobile, centered modal on desktop) */}
            <motion.div
              initial={{ y: '100%', opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full sm:max-w-[360px] bg-white rounded-t-[32px] sm:rounded-[28px] shadow-2xl p-6 sm:p-7 z-10 select-none pb-8 sm:pb-7 cursor-default"
            >
              {/* Header: Centered "Select Time", Top-right purple "Done" */}
              <div className="flex items-center justify-between relative mb-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                  Cancel
                </button>

                <h3 className="font-display font-bold text-base text-[#292929] absolute left-1/2 -translate-x-1/2">
                  Select Time
                </h3>

                <button
                  type="button"
                  onClick={handleDone}
                  className="text-sm font-bold text-[#6542E8] hover:opacity-85 active:scale-95 transition-all p-1 cursor-pointer"
                >
                  Done
                </button>
              </div>

              {/* Time Display Row (Matches the reference screenshot: Time on left, value on right) */}
              <div className="flex items-center justify-between py-2.5 px-3 bg-slate-50 rounded-xl mb-4 text-xs">
                <span className="font-medium text-slate-500">Selected</span>
                <span className="font-extrabold text-[#292929] text-sm tracking-wide">
                  {currentPreviewTime}
                </span>
              </div>

              {/* 3-Column iOS Wheel Picker Container */}
              <div className="relative bg-white rounded-2xl overflow-hidden py-1">
                {/* Horizontal Center Selection Highlight Bar (12px rounded, light gray #F0F0F2) */}
                <div
                  className="absolute top-[80px] left-2 right-2 h-[40px] bg-[#F0F0F2] rounded-xl pointer-events-none -z-0"
                  style={{ borderRadius: '12px' }}
                />

                {/* Top and Bottom Fading Gradient Overlays (Simulates iOS 3D cylindrical glass reflection) */}
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />

                {/* 3 Wheel Columns: Hours (1-12), Minutes (00-59), Period (AM/PM) */}
                <div className="grid grid-cols-3 relative z-0 items-center text-center">
                  {/* Hours */}
                  <WheelColumn
                    items={HOURS}
                    selectedIndex={hourIndex}
                    onSelect={(idx) => setSelectedHour(HOURS[idx])}
                  />

                  {/* Minutes */}
                  <WheelColumn
                    items={MINUTES}
                    selectedIndex={minuteIndex}
                    onSelect={(idx) => setSelectedMinute(MINUTES[idx])}
                  />

                  {/* Period (AM/PM) */}
                  <WheelColumn
                    items={PERIODS}
                    selectedIndex={periodIndex}
                    onSelect={(idx) => setSelectedPeriod(PERIODS[idx])}
                  />
                </div>
              </div>

              {/* Quick Preset: Flexible / Any Time button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Can't decide exact time?</span>
                <button
                  type="button"
                  onClick={() => {
                    onChange('Flexible / Any Time');
                    setIsOpen(false);
                  }}
                  className="font-bold text-[#1C8DC8] hover:text-[#0B3951] transition-colors cursor-pointer"
                >
                  Set as Flexible
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
