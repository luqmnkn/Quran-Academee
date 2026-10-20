'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { trackWhatsAppClick } from '@/utils/gtm';

interface WhatsAppCtaLinkProps {
  message?: string;
  source?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function WhatsAppCtaLink({
  message = 'Assalamu Alaikum, I would like to book a 3-day free trial class.',
  source = 'cta_button',
  className = '',
  children,
}: WhatsAppCtaLinkProps) {
  const url = `https://wa.me/923702680670?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(source)}
      className={className}
    >
      {children || (
        <>
          <MessageCircle className="w-4 h-4 mr-1.5" />
          <span>WhatsApp</span>
        </>
      )}
    </a>
  );
}
