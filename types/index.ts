// types/index.ts

export interface Course {
  id: string;
  title: string;
  arabicTitle: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  ageGroup: string;
  duration: string;
  level: string;
  learningOutcomes: string[];
  curriculum: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  feedback: string;
  rating: number;
  location: string;
  avatarInitials: string;
}

export interface TrustStat {
  value: string;
  label: string;
  description: string;
}
