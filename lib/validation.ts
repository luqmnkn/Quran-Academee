import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z.string()
    .trim()
    .min(1, { message: 'Full Name is required' })
    .min(2, { message: 'Full Name must be at least 2 characters' })
    .max(100, { message: 'Full Name must not exceed 100 characters' }),
  email: z.string()
    .trim()
    .toLowerCase()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please provide a valid email address' })
    .max(150, { message: 'Email must not exceed 150 characters' }),
  phone: z.string()
    .trim()
    .min(1, { message: 'Phone number is required' })
    .max(30, { message: 'Phone number must not exceed 30 characters' }),
  country: z.string()
    .trim()
    .min(1, { message: 'Country is required' })
    .max(100, { message: 'Country must not exceed 100 characters' }),
  courseInterest: z.string()
    .trim()
    .min(1, { message: 'Course interest is required' })
    .max(100, { message: 'Course interest must not exceed 100 characters' }),
  message: z.string()
    .trim()
    .max(1000, { message: 'Message must not exceed 1000 characters' })
    .optional()
    .or(z.literal('')),
  website: z.string().trim().optional().or(z.literal('')),
  botField: z.string().trim().optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;
