import { Course, Testimonial, TrustStat } from './types';

export const COURSES: Course[] = [
  {
    id: 'noorani-qaida',
    title: 'Noorani Qaida Basics',
    arabicTitle: 'القاعدة النورانية',
    shortDescription: 'The foundational course for beginners to learn Arabic letters, correct pronunciation (Makharij), and basic reading rules.',
    fullDescription: 'This course is the gateway to reading the Quran. Designed for children who are starting from scratch and adults who want to correct their pronunciation. Using the world-renowned Noorani Qaida syllabus, we teach you letter shapes, connections, vowel sounds (Harakat), and the foundational phonetic elements needed to recite Quranic verses with confidence.',
    icon: 'BookOpen',
    ageGroup: 'Kids (4+) & Adults',
    duration: '2-3 Months (Based on pace)',
    level: 'Beginner',
    learningOutcomes: [
      'Recognize and pronounce all 28 Arabic letters in their individual and compound forms.',
      'Master the correct articulation points (Makharij) of each sound.',
      'Understand basic signs like Fatha, Kasra, Damma, Tanween, and Madd.',
      'Learn how to join letters to form correct words and short phrases.',
      'Develop reading speed, rhythm, and structural word recognition.'
    ],
    curriculum: [
      'Lesson 1-5: Alphabet, Makharij, and Letter Shapes',
      'Lesson 6-9: Vowels (Harakat) and Tanween (Double Vowels)',
      'Lesson 10-12: Standing Vowels (Maddah) and Joint Letters',
      'Lesson 13-15: Jazm, Tashdeed (Doubled Letters), and Silent Letters',
      'Lesson 16-17: Comprehensive exercises reading actual Quranic phrases'
    ]
  },
  {
    id: 'quran-reading',
    title: 'Quran Recitation & Reading',
    arabicTitle: 'تلاوة القرآن الكريم',
    shortDescription: 'Learn to read the Holy Quran fluently and smoothly. Ideal for students who finished Qaida and want to read the entire Quran.',
    fullDescription: 'For those who have completed the Noorani Qaida or possess basic reading skills, this course guides students step-by-step through reading the actual Quranic text. Our teachers observe your reading, gently pointing out pronunciation gaps, pacing issues, and grammatical pauses, molding your recitation until you can navigate any Surah independently and beautifully.',
    icon: 'Book',
    ageGroup: 'All age groups',
    duration: '6-12 Months (Ongoing)',
    level: 'Intermediate',
    learningOutcomes: [
      'Read Quranic verses directly from the Mushaf at a comfortable, natural pace.',
      'Apply primary reading connectors, sentence pause signs (Waqf) correctly.',
      'Build vocabulary of high-frequency Quranic terms and expressions.',
      'Read Surahs with correct posture, respect, and devotional mindfulness.',
      'Eliminate stuttering and hesitations by developing natural word recognition.'
    ],
    curriculum: [
      'Recitation of Juz Amma (30th Chapter) with continuous assessment',
      'Special focus on transition words and complex phonetic combinations',
      'Systematic progression into longer chapters (Surah Al-Baqarah, etc.)',
      'Practical training on stopping rules and breath management during recitation',
      'Daily feedback log specifying words practiced and verses assigned'
    ]
  },
  {
    id: 'tajweed',
    title: 'Tajweed al Quran',
    arabicTitle: 'قواعد التجويد',
    shortDescription: 'Master the rules of Tajweed to recite the Holy Quran exactly the way it was revealed to Prophet Muhammad (PBUH).',
    fullDescription: 'Tajweed refers to pronouncing each letter with its proper rights and characteristics. This advanced course details rules like Noon Sakinah & Tanween, Meem Sakinah, Mudood (elongation), and heavy/light letters. Highly recommended for students who can already read the Quran but want to bring professional melody, precision, and excellence to their recitation.',
    icon: 'Award',
    ageGroup: 'Ages 8+ to Adults',
    duration: '4-6 Months',
    level: 'Advanced',
    learningOutcomes: [
      'Understand the semantic and physical rules of Tajweed theoretically and practically.',
      'Correctly apply Izhar, Idghaam, Iqlaab, and Ikhfaa during active recitation.',
      'Master the types of Madd (Elongations) and calculate their respective lengths.',
      'Read with authentic classical Arabic vocal style (Tarteel).',
      'Differentiate between soft-sounding and deep-resonant (Tafkheem/Tarqeeq) letters.'
    ],
    curriculum: [
      'Module 1: Definition of Tajweed, Makharij refresher, and Sifaat (Attributes)',
      'Module 2: Rules of Noon Sakinah, Tanween, and Meem Sakinah',
      'Module 3: Rules of Laam, Idghaam types, and Ghunnah features',
      'Module 4: Mudood (Elongations) and its 6 major sub-categories',
      'Module 5: Stop signs (Waqf), starting rules, and final validation projects'
    ]
  },
  {
    id: 'memorization',
    title: 'Quran Memorization (Hifz)',
    arabicTitle: 'حفظ القرآن الكريم',
    shortDescription: 'A structured, personalized plan to memorize the Quran with expert guidance, periodic revision, and spiritual support.',
    fullDescription: 'Become a Hafiz of the Quran under the systematic instruction of our teachers. We build a highly individualized daily Hifz schedule. Every session is split into three phases: Sabaq (new memorization), Sabqi (recent revision to reinforce short-term memory), and Manzil (old revision to guard long-term retention). We keep classes encouraging and structured to avoid mental fatigue.',
    icon: 'Brain',
    ageGroup: 'Ages 6+ & Adults',
    duration: 'Custom (1 to 3 Years)',
    level: 'All Levels',
    learningOutcomes: [
      'Memorize selected Surahs, particular Juzs, or the complete Quran.',
      'Establish a resilient retaining circle (Manzil) to prevent forgetting past lessons.',
      'Build supreme mental discipline, focus, and memory structures.',
      'Understand the general themes and spiritual rewards of the Surahs memorized.',
      'Recite memorized verses fluently by heart without looking at the Mushaf.'
    ],
    curriculum: [
      'Sabaq: Daily recitation and memorization of a designated number of new verses',
      'Sabqi: Daily review of the past 10-15 lessons memorized to cement recall',
      'Manzil: Daily massive review of older memorized chapters supporting retention',
      'Monthly revision exams and live recitation evaluation',
      'Spiritual mentorship lessons on patience, sincerity, and applying Quranic life lessons'
    ]
  },
  {
    id: 'islamic-essentials',
    title: 'Islamic Essentials & Duas',
    arabicTitle: 'الواجبات الإسلامية',
    shortDescription: 'Learn essential Islamic knowledge, including Salah steps, daily Duas, Islamic history, and moral character development.',
    fullDescription: 'Perfect for children and new Muslims, this course covers the absolute essentials of daily Islamic practice. Students learn the proper way to perform Wudu (ablution) and Salah (prayer), memorize everyday prophetic prayers (Duas), study the inspiring stories of the Prophets, and learn about the beautiful manners (Akhlaq) and character of a Muslim.',
    icon: 'Sparkles',
    ageGroup: 'Kids (5+) & New Muslims',
    duration: '3-4 Months',
    level: 'Beginner',
    learningOutcomes: [
      'Master the practical steps of Wudu (ablution) and daily Salah (prayer).',
      'Memorize and understand essential daily Duas for sleeping, eating, and entering the home.',
      'Learn the 5 pillars of Islam and the 6 articles of faith (Iman).',
      'Study key historical events from the life of Prophet Muhammad (PBUH).',
      'Develop beautiful Islamic manners (Akhlaq) like honesty, kindness, and respect.'
    ],
    curriculum: [
      'Module 1: Pillars of Islam & Articles of Faith',
      'Module 2: Practical guide to Wudu and 5 Daily Prayers',
      'Module 3: Memorization of daily prayers (Duas) and short Hadiths',
      'Module 4: Seerah (Prophet’s biography) and Stories of the Prophets',
      'Module 5: Character building (Adab and Akhlaq in daily life)'
    ]
  },
  {
    id: 'hifz-revision',
    title: 'Hifz Revision Partner',
    arabicTitle: 'مراجعة وتثبيت الحفظ',
    shortDescription: 'Dedicated revision program for Huffaz to cement their memorization, correct loose verses, and maintain a lifelong retaining cycle.',
    fullDescription: 'Are you a Hafiz who wants to strengthen your memorization? Or did you memorize parts of the Quran but find it hard to retain? This program pairs you with a certified, top-tier Huffaz scholar who will serve as your dedicated revision partner. We listen to your daily recitation, target your weak verses (Mutashabihat), and construct a rigorous, sustainable Manzil routine to ensure your memorization remains rock-solid for life.',
    icon: 'GraduationCap',
    ageGroup: 'Huffaz & Advanced Students',
    duration: 'Ongoing (Flexible)',
    level: 'Advanced',
    learningOutcomes: [
      'Recite long portions of the Quran by heart with supreme fluency.',
      'Eliminate hesitation and pronunciation errors in memorized chapters.',
      'Master the identical verses (Mutashabihat) and recognize contextual overlaps.',
      'Establish a lifelong daily or weekly revision routine (Manzil).',
      'Prepare for official Hifz certification exams and public prayers (Tarawih).'
    ],
    curriculum: [
      'Diagnostic Assessment: Identifying weak and strong chapters of your Hifz',
      'Syllabus Mapping: Creating a custom weekly revision schedule (e.g., 1 Juz/day)',
      'Interactive Revision: Tutors listen to your recitation and correct memory slips',
      'Mutashabihat Analysis: Training to differentiate look-alike verses across chapters',
      'Simulation Drills: Simulating lead-prayer scenarios and continuous testing'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Amara Sheikh',
    role: 'Parent',
    feedback: 'Outstanding teachers! My kids started Qaida from scratch and can now read basic verses easily. The lessons are so interactive and fun.',
    rating: 5,
    location: 'Houston, USA',
    avatarInitials: 'AS'
  },
  {
    id: 't2',
    name: 'Rayyan Khan',
    role: 'Adult Student',
    feedback: 'Perfect for busy professionals. The 1-on-1 sessions are high-yield, and my Tajweed has improved significantly in just two months.',
    rating: 5,
    location: 'Birmingham, UK',
    avatarInitials: 'RK'
  },
  {
    id: 't3',
    name: 'Nadia Ahmed',
    role: 'Parent',
    feedback: 'Highly recommend the Hifz program. My daughter\'s female tutor is incredibly encouraging, patient, and uses fantastic memorization techniques.',
    rating: 5,
    location: 'Toronto, Canada',
    avatarInitials: 'NA'
  },
  {
    id: 't4',
    name: 'Zayd Malik',
    role: 'Adult Student',
    feedback: 'Exceptional academy. The tutors are highly qualified scholars who correct your Makharij patiently. Flexible timing makes it very convenient.',
    rating: 5,
    location: 'Sydney, Australia',
    avatarInitials: 'ZM'
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Certified Expert Tutors',
    description: 'Learn from highly qualified, certified educators who have graduated from prestigious Islamic institutions and hold verified academic credentials.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Live 1-on-1 Sessions',
    description: 'Get focused attention with personal classes customized around your learning speed, unique strengths, and continuous educational goals.',
    icon: 'UserCheck'
  },
  {
    title: 'Flexible scheduling 24/7',
    description: 'Pick your preferred days and timings. Change or reschedule classes to coordinate elegantly with busy school, work, or family schedules.',
    icon: 'CalendarDays'
  },
  {
    title: 'Male & Female Teachers',
    description: 'We prioritize comfort and ease by offering children and adults the choice between dedicated male and experienced female Quran tutors.',
    icon: 'Users'
  },
  {
    title: 'Affordable & High Quality',
    description: 'No hidden registration fees or long commitments. Transparent, competitive packages structured to keep online Quran studies accessible to everyone.',
    icon: 'CheckCircle'
  },
  {
    title: 'Personalized Study Plans',
    description: 'We craft structured, customized learning pathways designed for individual student goals, ensuring comfort, optimal progress, and deep retention.',
    icon: 'GraduationCap'
  }
];

export const FAQS = [
  {
    question: 'How do the live classes work?',
    answer: 'Classes are conducted live over secure, stable video platforms like Zoom and Microsoft Teams. It is a one-on-one virtual classroom containing only the student and the certified tutor. The teacher shares screens to trace lessons, speaks clearly, and observes correct articulation live.'
  },
  {
    question: 'Are there separate female teachers for girls and female students?',
    answer: 'Yes, absolutely. We have a dedicated roster of highly qualified, certified female Quran teachers. Female students of all ages can request a female teacher when booking their free trial.'
  },
  {
    question: 'What are the required ages to start learning?',
    answer: 'We accept young students starting from 4 years old (for basic Noorani Qaida lessons) up to adults of any age. Content and training methodologies are carefully tailored for kids versus adults.'
  },
  {
    question: 'Can I choose my own schedule/timings?',
    answer: 'Yes! That is one of our primary value propositions. You can select your preferred days (weekday or weekend slots) and times. Our global instructors operate around the clock, so we can support lessons smoothly in any time zone.'
  },
  {
    question: 'How long are the online classes?',
    answer: 'Standard sessions are 30 minutes long. This keeps kids fully engaged without fatigue. However, adults or advanced students can opt for longer 45-minute or 60-minute classes based on interest.'
  },
  {
    question: 'How do I start the Free Trial class?',
    answer: "It is simple! Just fill out the Inquiry / Free Trial form on our website with your contact info. Our coordinator will contact you via WhatsApp or Email within 24 hours to schedule your student's first free trial lesson at a convenient time."
  }
];

export const TRUST_STATS: TrustStat[] = [
  { value: '10+', label: 'Years Experience', description: 'Delivering exceptional Islamic and Qur’anic teaching to international students.' },
  { value: '15,000+', label: 'Classes Completed', description: 'Successful live one-on-one sessions taught by our top-ranking certified tutors.' },
  { value: '98%', label: 'Student Satisfaction', description: 'Loved and recommended by international parents, children, and adult scholars.' },
  { value: '100%', label: 'Certified Educators', description: 'Instructors holding legitimate general degrees, Hifz certificates, and verified academic credentials.' }
];
