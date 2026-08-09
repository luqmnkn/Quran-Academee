import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show Tooltip bubble after 5 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);

    // Hide tooltip after 15 total seconds
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const whatsappMessage = encodeURIComponent(
    "Assalamu Alaikum, I would like to learn Quran online. Please share details about your courses and free trial classes."
  );

  return (
    <div className="fixed bottom-20 md:bottom-6 right-5 sm:right-6 z-40 flex items-center group">
      
      {/* Speech Bubble Tooltip */}
      {showTooltip && (
        <div 
          role="tooltip"
          className="absolute right-16 bottom-1 bg-white text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-2xl shadow-xl border border-[#E0F2FE] whitespace-nowrap flex items-center gap-2 animate-in fade-in slide-in-from-right-3 duration-300 transition-all"
        >
          <span>Chat with us on WhatsApp 👋</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-full"
            aria-label="Close tooltip"
          >
            <X size={12} />
          </button>
          
          {/* Caret arrow */}
          <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-[#E0F2FE] rotate-45 pointer-events-none" />
        </div>
      )}

      {/* Main floating button */}
      <a
        href={`https://wa.me/923702680670?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-lg hover:shadow-green-500/25 hover:scale-110 active:scale-95 transition-all duration-300 relative"
        aria-label="Contact support on WhatsApp"
        id="whatsapp-floater"
      >
        {/* Pulsing ring indicator */}
        <span className="absolute inset-0 rounded-full border-2 border-[#25D366] inline-flex animate-ping opacity-75 pointer-events-none" />
        
        {/* Online Status Dot */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full z-20" />
        
        {/* WhatsApp Icon */}
        <svg 
          viewBox="0 0 24 24" 
          className="w-7 h-7 fill-white z-10" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.012 2C6.48 2 1.98 6.5 1.98 12c0 1.81.48 3.51 1.32 5l-1.31 4.77 4.9-1.28c1.43.78 3.06 1.21 4.79 1.21 5.53 0 10.03-4.5 10.03-10S17.542 2 12.012 2zm0 1.83c4.52 0 8.2 3.68 8.2 8.17 0 4.5-3.68 8.17-8.2 8.17-1.57 0-3.04-.45-4.3-1.24l-.31-.19-2.91.76.78-2.83-.21-.33c-.87-1.38-1.34-3-1.34-4.7 0-4.49 3.68-8.17 8.2-8.17zm-3.66 3.19c-.2 0-.41.05-.58.15-.36.21-.62.59-.72 1-.16.59.04 1.37.52 2.33.68 1.34 1.63 2.5 2.76 3.42.92.76 1.93 1.33 2.99 1.69.4.14.77.16 1.12.09.34-.07.72-.34.88-.73.16-.4.16-.76.11-.83-.05-.07-.18-.11-.38-.2l-1.83-.87c-.18-.08-.34-.03-.46.12l-.65.81c-.13.16-.31.18-.51.08-.43-.22-.92-.51-1.38-.93-.45-.4-.81-.88-1.07-1.38-.1-.19-.07-.34.05-.48l.58-.69c.1-.13.13-.26.07-.39l-.88-2.09c-.08-.22-.24-.26-.41-.26z" />
        </svg>
      </a>
    </div>
  );
}