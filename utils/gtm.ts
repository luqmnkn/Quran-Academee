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

export function trackLeadSubmission(data: LeadData) {
  if (typeof window !== 'undefined') {
    const dataLayer = (window as any).dataLayer || [];
    dataLayer.push({
      event: 'lead_submission',
      leadData: data,
    });
    (window as any).dataLayer = dataLayer;
  }
}
