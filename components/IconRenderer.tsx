import React from 'react';

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

// Map Lucide/custom icon names (normalized to lowercase) to Font Awesome classes
const FONT_AWESOME_MAP: Record<string, string> = {
  bookopen: 'fa-solid fa-book-open',
  book: 'fa-solid fa-book',
  award: 'fa-solid fa-award',
  brain: 'fa-solid fa-brain',
  sparkles: 'fa-solid fa-wand-magic-sparkles',
  graduationcap: 'fa-solid fa-graduation-cap',
  shieldcheck: 'fa-solid fa-shield-halved',
  usercheck: 'fa-solid fa-user-check',
  calendardays: 'fa-solid fa-calendar-days',
  calendar: 'fa-solid fa-calendar-days',
  users: 'fa-solid fa-users',
  checkcircle: 'fa-solid fa-circle-check',
  checkcircle2: 'fa-solid fa-circle-check',
  check: 'fa-solid fa-check',
  star: 'fa-solid fa-star',
  chevronright: 'fa-solid fa-chevron-right',
  play: 'fa-solid fa-play',
};

export default function IconRenderer({ name, className = '', size = 24 }: IconRendererProps) {
  // Normalize the input name (remove dashes/underscores & lower-case)
  const normalizedKey = name.replace(/[-_]/g, '').toLowerCase();
  
  const faClass = FONT_AWESOME_MAP[normalizedKey] || 'fa-solid fa-book';

  return (
    <i
      className={`${faClass} ${className}`}
      aria-hidden="true"
      style={{
        fontSize: `${size}px`,
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
      }}
    />
  );
}