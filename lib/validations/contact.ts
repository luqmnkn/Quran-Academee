import { z } from 'zod';

// Regex for international phone numbers (e.g. +1 555 123 4567, +923001234567, 03001234567)
const phoneRegex = /^(\+?\d{1,4}[\s-]?)?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,9}$/;

/**
 * Validation schema for general contact and lead forms
 */
export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, { message: 'Full Name is required' })
    .min(2, { message: 'Full Name must be at least 2 characters' })
    .max(100, { message: 'Full Name must not exceed 100 characters' }),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Please enter a valid email address' })
    .max(150, { message: 'Email must not exceed 150 characters' }),

  phone: z
    .string()
    .trim()
    .min(1, { message: 'Phone number is required' })
    .regex(phoneRegex, { message: 'Please enter a valid phone number (e.g. +1 234 567 8900)' })
    .max(30, { message: 'Phone number must not exceed 30 characters' }),

  country: z
    .string()
    .trim()
    .min(1, { message: 'Country is required' })
    .max(100, { message: 'Country name must not exceed 100 characters' }),

  courseInterest: z
    .string()
    .trim()
    .min(1, { message: 'Please select a course of interest' })
    .max(100, { message: 'Course interest must not exceed 100 characters' }),

  message: z
    .string()
    .trim()
    .max(1000, { message: 'Message must not exceed 1000 characters' })
    .optional()
    .or(z.literal(''))
    .transform((val) => (val === '' ? undefined : val)),

  // Honeypot anti-spam fields (should remain empty on client submission)
  website: z.string().trim().optional().or(z.literal('')),
  botField: z.string().trim().optional().or(z.literal('')),
});

/**
 * Validation schema for audio recitation submissions
 */
export const recitationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: 'Full Name is required' })
    .max(100),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: 'Please enter a valid email address' }),

  phone: z
    .string()
    .trim()
    .regex(phoneRegex, { message: 'Please enter a valid phone number' }),

  country: z
    .string()
    .trim()
    .min(1, { message: 'Country is required' }),

  audio: z
    .string()
    .min(1, { message: 'Recitation audio recording is required' }),

  notes: z
    .string()
    .trim()
    .max(500, { message: 'Notes cannot exceed 500 characters' })
    .optional()
    .or(z.literal(''))
    .transform((val) => (val === '' ? undefined : val)),
});

/**
 * Validation schema for admin/scholar feedback submissions
 */
export const feedbackSchema = z.object({
  recitationId: z.string().min(1, { message: 'Recitation ID is required' }),
  recommendedCourse: z.string().min(1, { message: 'Recommended course is required' }),
  feedbackText: z.string().min(10, { message: 'Feedback text must be at least 10 characters' }),
  token: z.string().min(1, { message: 'Admin authentication token is required' }),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type RecitationInput = z.infer<typeof recitationSchema>;
export type FeedbackInput = z.infer<typeof feedbackSchema>;