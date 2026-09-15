import { Course, Testimonial, TrustStat } from './types';

export const COURSES: Course[] = [
  {
    id: 'noorani-qaida',
    title: 'Alqaida Almadania Basics',
    arabicTitle: 'القاعدة المدنية',
    shortDescription: 'The foundational gateway for beginners to learn Arabic letters, correct pronunciation (Makharij), and sacred reading rules.',
    fullDescription: 'This course is the essential gateway to reading the Quran with reverence. Designed for children starting from scratch and adults refining pronunciation, using Alqaida Almadania we teach letter shapes, articulation points (Makharij), and phonetic rules. Mastering reading serves as the vital springboard for understanding and living the divine message.',
    icon: 'BookOpen',
    ageGroup: 'Kids (4+) & Adults',
    duration: '2-3 Months (Based on pace)',
    level: 'Beginner',
    learningOutcomes: [
      'Recognize and pronounce all 28 Arabic letters in individual and compound forms.',
      'Master the correct articulation points (Makharij) of each sound.',
      'Understand essential vowel signs, Harakat, Tanween, and Madd.',
      'Join letters seamlessly to build fluent Quranic word recognition.',
      'Develop reading precision, establishing a strong foundation for Quranic comprehension.'
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
    shortDescription: 'Read the Holy Quran fluently with proper Tajweed, building a strong connection that leads directly to understanding.',
    fullDescription: 'For students with basic reading skills, this course guides you step-by-step through reading the actual Mushaf text. Our scholars honor proper recitation as the sacred starting point, helping you navigate every Surah smoothly as you prepare to comprehend and embody its divine wisdom.',
    icon: 'Book',
    ageGroup: 'All age groups',
    duration: '6-12 Months (Ongoing)',
    level: 'Intermediate',
    learningOutcomes: [
      'Read Quranic verses directly from the Mushaf at a comfortable, natural pace.',
      'Apply primary reading connectors and sentence pause signs (Waqf) correctly.',
      'Build vocabulary of high-frequency Quranic terms to aid understanding.',
      'Read Surahs with correct posture, respect, and devotional mindfulness.',
      'Eliminate hesitations, paving the way for translation and daily application.'
    ],
    curriculum: [
      'Recitation of Juz Amma (30th Chapter) with continuous assessment',
      'Special focus on transition words and complex phonetic combinations',
      'Systematic progression into longer chapters (Surah Al-Baqarah, etc.)',
      'Practical training on stopping rules and breath management during recitation',
      'Connecting fluent reading with basic verse meanings and daily reflection'
    ]
  },
  {
    id: 'tajweed',
    title: 'Tajweed al Quran',
    arabicTitle: 'قواعد التجويد',
    shortDescription: 'Master the sacred rules of Tajweed to recite the Holy Quran with classical precision, honoring every letter revealed.',
    fullDescription: 'Tajweed grants each letter its proper rights and characteristics. This advanced course details rules like Noon Sakinah & Tanween, Meem Sakinah, Mudood (elongation), and heavy/light letters. We uphold flawless Tajweed as a vital gateway, enabling students to recite with beauty while connecting divine words to character.',
    icon: 'Award',
    ageGroup: 'Ages 8+ to Adults',
    duration: '4-6 Months',
    level: 'Advanced',
    learningOutcomes: [
      'Understand the semantic and physical rules of Tajweed theoretically and practically.',
      'Correctly apply Izhar, Idghaam, Iqlaab, and Ikhfaa during active recitation.',
      'Master the types of Madd (Elongations) and calculate their respective lengths.',
      'Read with authentic classical Arabic vocal style (Tarteel).',
      'Connect Tajweed precision with reverent reflection and practical living.'
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
    shortDescription: 'A structured Hifz plan to memorize the Quran with expert guidance, systematic revision, and spiritual connection.',
    fullDescription: 'Become a Hafiz of the Quran under the systematic instruction of our teachers. Every session is split into three phases: Sabaq (new memorization), Sabqi (recent revision), and Manzil (old revision). We preserve Hifz as a sacred foundation while guiding students to reflect on verses and apply them in daily life.',
    icon: 'Brain',
    ageGroup: 'Ages 6+ & Adults',
    duration: 'Custom (1 to 3 Years)',
    level: 'All Levels',
    learningOutcomes: [
      'Memorize selected Surahs, particular Juzs, or the complete Quran.',
      'Establish a resilient retaining circle (Manzil) to prevent forgetting past lessons.',
      'Build mental discipline, focus, and memory structures for lifelong retention.',
      'Understand core themes and spiritual guidance of memorized Surahs.',
      'Recite memorized verses fluently by heart with Tajweed precision and devotion.'
    ],
    curriculum: [
      'Sabaq: Daily recitation and memorization of a designated number of new verses',
      'Sabqi: Daily review of recent lessons memorized to cement recall',
      'Manzil: Daily systematic review of older chapters supporting retention',
      'Monthly revision exams and live recitation evaluation',
      'Spiritual mentorship on sincerity, patience, and living Quranic guidance'
    ]
  },
  {
    id: 'islamic-essentials',
    title: 'Islamic Essentials & Duas',
    arabicTitle: 'الواجبات الإسلامية',
    shortDescription: 'Learn essential Islamic knowledge, Salah steps, daily Duas, translation basics, and moral character development.',
    fullDescription: 'Connecting sacred recitation with real-world practice, this course covers daily Salah, essential Duas, core faith, and Islamic character (Akhlaq). Students learn to bridge divine guidance with daily actions, bringing the light of the Quran into their homes and communities.',
    icon: 'Sparkles',
    ageGroup: 'Kids (5+) & New Muslims',
    duration: '3-4 Months',
    level: 'Beginner',
    learningOutcomes: [
      'Master practical steps of Wudu (ablution) and daily Salah (prayer).',
      'Memorize and understand essential daily Duas for sleeping, eating, and entering home.',
      'Learn the 5 pillars of Islam and 6 articles of faith (Iman).',
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
    shortDescription: 'Dedicated revision program for Huffaz to cement memorization, refine Tajweed, and maintain a lifelong connection.',
    fullDescription: 'Are you a Hafiz who wants to strengthen your memorization? Or did you memorize parts of the Quran but find it hard to retain? This program pairs you with a certified scholar partner. We reinforce weak verses (Mutashabihat) and construct a sustainable Manzil routine, protecting your sacred Hifz while helping you live its purpose.',
    icon: 'GraduationCap',
    ageGroup: 'Huffaz & Advanced Students',
    duration: 'Ongoing (Flexible)',
    level: 'Advanced',
    learningOutcomes: [
      'Recite long portions of the Quran by heart with supreme fluency.',
      'Eliminate hesitation and pronunciation errors in memorized chapters.',
      'Master identical verses (Mutashabihat) and recognize contextual overlaps.',
      'Establish a lifelong daily revision routine (Manzil) for retention.',
      'Prepare for official Hifz evaluations, lead prayers, and practical implementation.'
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
    feedback: 'my kids started qaida here from scratch and they read so smoothly now love how patient the teachers are with them',
    rating: 5,
    location: 'Houston, USA',
    avatarInitials: 'AS'
  },
  {
    id: 't2',
    name: 'Rayyan Khan',
    role: 'Adult Student',
    feedback: 'perfect for busy schedules the one on one sessions helped my tajweed and understanding improve so fast in two months',
    rating: 5,
    location: 'Birmingham, UK',
    avatarInitials: 'RK'
  },
  {
    id: 't3',
    name: 'Nadia Ahmed',
    role: 'Parent',
    feedback: 'highly recommend the hifz program my daughter female tutor is so patient and helps her understand the verses she memorizes',
    rating: 5,
    location: 'Toronto, Canada',
    avatarInitials: 'NA'
  },
  {
    id: 't4',
    name: 'Zayd Malik',
    role: 'Adult Student',
    feedback: 'really good academy the tutors explain the meanings while correcting makharij so you actually learn how to live by it',
    rating: 5,
    location: 'Sydney, Australia',
    avatarInitials: 'ZM'
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Certified Expert Tutors',
    description: 'Learn from highly qualified educators who honor sacred Tajweed foundations while guiding students toward deep understanding and real-world action.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Live 1-on-1 Sessions',
    description: 'Get focused attention with personal classes customized around your reading speed, memorization pace, and personal character development.',
    icon: 'UserCheck'
  },
  {
    title: 'Flexible scheduling 24/7',
    description: 'Pick your preferred days and timings. Change or reschedule classes seamlessly to coordinate elegantly with busy school, work, or family schedules.',
    icon: 'CalendarDays'
  },
  {
    title: 'Male & Female Teachers',
    description: 'We prioritize comfort and ease by offering children and adults the choice between dedicated male and experienced female Quran scholars.',
    icon: 'Users'
  },
  {
    title: 'Affordable & High Quality',
    description: 'No hidden registration fees or long commitments. Transparent, competitive packages structured to keep Quran recitation and understanding accessible.',
    icon: 'CheckCircle'
  },
  {
    title: 'Personalized Study Plans',
    description: 'We craft structured learning pathways bridging foundational Tajweed and Hifz with translation, meaning, and practical daily living.',
    icon: 'GraduationCap'
  }
];

export const FAQS = [
  {
    question: 'How do the live classes work?',
    answer: 'Classes are conducted live over secure video platforms like Zoom and Microsoft Teams. In a 1-on-1 virtual classroom, certified scholars guide students step-by-step from proper reading and Tajweed to understanding and practical application.'
  },
  {
    question: 'Are there separate female teachers for girls and female students?',
    answer: 'Yes, absolutely. We have a dedicated roster of highly qualified female Quran scholars. Female students of all ages can request a female teacher when booking their free trial.'
  },
  {
    question: 'What are the required ages to start learning?',
    answer: 'We accept young students starting from 4 years old (for basic Alqaida Almadania lessons) up to adults of any age. Content and training methodologies are carefully tailored for kids versus adults.'
  },
  {
    question: 'Can I choose my own schedule/timings?',
    answer: 'Yes! That is one of our primary value propositions. You can select your preferred days (weekday or weekend slots) and times. Our global instructors operate 24/7 in any time zone.'
  },
  {
    question: 'How long are the online classes?',
    answer: 'Standard sessions are 30 minutes long to keep kids fully engaged without fatigue. However, adults or advanced students can opt for longer 45-minute or 60-minute classes based on interest.'
  },
  {
    question: 'How do I start the Free Trial class?',
    answer: "It is simple! Just fill out the Inquiry / Free Trial form on our website. Our coordinator will contact you via WhatsApp or Email within 24 hours to schedule your student's first free trial lesson at a convenient time."
  }
];

export const TRUST_STATS: TrustStat[] = [
  { value: '10+', label: 'Years Experience', description: 'Delivering exceptional Quranic recitation, Tajweed, and translation instruction globally.' },
  { value: '15,000+', label: 'Classes Completed', description: 'Successful live 1-on-1 sessions bridging sacred reading with real-life understanding.' },
  { value: '98%', label: 'Student Satisfaction', description: 'Loved and recommended by international parents, children, and adult learners.' },
  { value: '100%', label: 'Certified Educators', description: 'Instructors holding verified general degrees, Hifz certificates, and academic credentials.' }
];
