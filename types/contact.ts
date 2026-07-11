export interface ContactSubmission {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  courseInterest: string;
  message?: string;
  website?: string; // Honeypot
  botField?: string; // Honeypot
}

export interface ApiResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}
