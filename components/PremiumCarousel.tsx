import React, { useState, useEffect, useCallback, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface PremiumCarouselProps {
  children: React.ReactNode;
}

export default function PremiumCarousel({ children }: PremiumCarouselProps) {
  // Convert children to a safe array format
  const rawChildren = useMemo(() => React.Children.toArray(children), [children]);
  const uniqueCount = rawChildren.length;

  // Duplicate slides seamlessly for infinite looping without visual whitespace
  const multipliedChildren = useMemo(() => {
    if (uniqueCount === 0) return [];

    // Ensure a minimum of 24 items for uninterrupted loop wrapping
    const repeatCount = uniqueCount < 24 ? Math.ceil(24 / uniqueCount) : 2;
    const items: React.ReactNode[] = [];

    for (let cycle = 0; cycle < repeatCount; cycle++) {
      rawChildren.forEach((child, childIdx) => {
        if (React.isValidElement(child)) {
          items.push(
            React.cloneElement(child, {
              key: `slide-${child.key || childIdx}-cycle-${cycle}`,
            } as any)
          );
        } else {
          items.push(child);
        }
      });
    }

    return items;
  }, [rawChildren, uniqueCount]);

  // Configure Embla with continuous autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'center',
      loop: true,
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

    const currentSnap = emblaApi.selectedScrollSnap();
    const slidesLength = multipliedChildren.length;

    // Calculate nearest slide occurrence to prevent long slide jumps across loops
    const currentCycle = Math.floor(currentSnap / uniqueCount);
    let targetIdx = currentCycle * uniqueCount + index;

    if (targetIdx >= slidesLength) {
      targetIdx = index;
    }

    emblaApi.scrollTo(targetIdx);
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
          {multipliedChildren.map((child, idx) => {
            const isSlideActive = idx % uniqueCount === activeDotIndex;

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