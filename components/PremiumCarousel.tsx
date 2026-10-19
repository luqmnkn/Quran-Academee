'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface PremiumCarouselProps {
  children: React.ReactNode;
}

export default function PremiumCarousel({ children }: PremiumCarouselProps) {
  // Convert children to a safe array format - render each item exactly once
  const rawChildren = useMemo(() => React.Children.toArray(children), [children]);
  const uniqueCount = rawChildren.length;

  // Configure Embla with continuous autoplay and native looping
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'center',
      loop: uniqueCount > 2,
      skipSnaps: false,
    },
    [
      Autoplay({
        delay: 2500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = (index: number) => {
    if (!emblaApi || uniqueCount === 0) return;
    emblaApi.scrollTo(index);
  };

  if (uniqueCount === 0) return null;

  const activeDotIndex = selectedIndex % uniqueCount;

  return (
    <div className="relative w-full overflow-hidden py-6 animate-fade-in">
      {/* Viewport container */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
        ref={emblaRef}
      >
        <div className="flex touch-pan-y">
          {rawChildren.map((child, idx) => {
            const isSlideActive = idx === activeDotIndex;

            return (
              <div
                key={`embla-slide-${idx}`}
                className="w-[85%] sm:w-[50%] lg:w-[33.333%] shrink-0 px-3"
              >
                <div
                  className="w-full h-full transition-all duration-500 ease-out"
                  style={{
                    transform: isSlideActive ? 'scale(1.02)' : 'scale(0.95)',
                    opacity: isSlideActive ? 1 : 0.65,
                  }}
                >
                  <div
                    className={`w-full h-full rounded-[30px] transition-all duration-500 overflow-hidden ${
                      isSlideActive
                        ? 'shadow-[0_16px_40px_rgba(200,162,74,0.18)] border-[#C8A24A]/40 ring-1 ring-[#C8A24A]/20'
                        : 'shadow-md border-transparent'
                    }`}
                  >
                    {child}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="flex items-center justify-center gap-2.5 mt-8">
        {Array.from({ length: uniqueCount }).map((_, index) => (
          <button
            key={`dot-${index}`}
            type="button"
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
              index === activeDotIndex
                ? 'w-6 bg-[#C8A24A]'
                : 'w-2 bg-[#89A296]/35 hover:bg-[#89A296]'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}