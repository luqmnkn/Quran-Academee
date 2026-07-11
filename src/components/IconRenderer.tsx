import React from 'react';

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export default function IconRenderer({ name, className = '', size = 24 }: IconRendererProps) {
  // Map Lucide names to Font Awesome classes
  const fontAwesomeMap: Record<string, string> = {
    BookOpen: 'fa-solid fa-book-open',
    Book: 'fa-solid fa-book',
    Award: 'fa-solid fa-award',
    Brain: 'fa-solid fa-brain',
    Sparkles: 'fa-solid fa-wand-magic-sparkles',
    GraduationCap: 'fa-solid fa-graduation-cap',
    ShieldCheck: 'fa-solid fa-shield-halved',
    UserCheck: 'fa-solid fa-user-check',
    CalendarDays: 'fa-solid fa-calendar-days',
    Users: 'fa-solid fa-users',
    CheckCircle: 'fa-solid fa-circle-check',
  };

  const faClass = fontAwesomeMap[name] || 'fa-solid fa-book';

  return (
    <i 
      className={`${faClass} ${className}`} 
      style={{ fontSize: `${size}px`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} 
    />
  );
}
