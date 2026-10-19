// utils/gtm.ts

export interface LeadData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  courseInterest: string;
  message: string;
  plan: string;
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Tracks lead form submission in GA4 and GTM dataLayer
 */
export function trackLeadSubmission(data: LeadData) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'lead_submission',
      event_category: 'Lead',
      event_label: data.courseInterest || data.plan || 'Free Trial Inquiry',
      leadData: data,
    });

    // GA4 standard recommended conversion event: generate_lead
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        event_category: 'Lead',
        event_label: data.courseInterest || data.plan || 'Free Trial Inquiry',
        currency: 'USD',
        value: 1,
        course_interest: data.courseInterest,
        country: data.country,
        plan_selected: data.plan || 'None',
      });
    }
  }
}

/**
 * Tracks WhatsApp button and link clicks in GA4 and GTM dataLayer
 */
export function trackWhatsAppClick(location: string = 'floating_button') {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'whatsapp_click',
      event_category: 'Contact',
      event_label: location,
      method: 'whatsapp',
    });

    // GA4 standard recommended events for lead engagement & contact
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        event_category: 'Lead',
        event_label: `WhatsApp - ${location}`,
        lead_source: 'whatsapp',
        method: 'whatsapp',
        click_location: location,
      });

      window.gtag('event', 'contact', {
        method: 'whatsapp',
        event_category: 'Contact',
        event_label: location,
      });
    }
  }
}
