export interface CurriculumMilestone {
  milestone: string;
  title: string;
  description: string;
  lessons: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  weeklyClasses: number;
  classDuration: string;
  classesPerMonth: number;
  isPopular?: boolean;
  features: string[];
}

export interface CourseDetail {
  slug: string;
  id: string;
  title: string;
  shortTitle: string;
  arabicTitle: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  answerFirstSummary: string;
  category: string;
  ageGroup: string;
  duration: string;
  level: string;
  startingPrice: number;
  currency: string;
  icon: string;
  keyHighlights: string[];
  learningOutcomes: string[];
  curriculumMilestones: CurriculumMilestone[];
  teacherQualifications: string[];
  scheduleOptions: {
    option: string;
    detail: string;
    recommendation: string;
  }[];
  pricingPlans: PricingPlan[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const COURSES_DATA: CourseDetail[] = [
  {
    slug: 'madani-qaida-online',
    id: 'noorani-qaida',
    title: 'Alqaida Almadania Basics (Madani Qaida Online)',
    shortTitle: 'Madani Qaida',
    arabicTitle: 'القاعدة المدنية',
    h1: 'Online Madani Qaida Classes for Kids & Beginners',
    metaTitle: 'Online Madani Qaida Classes for Kids & Adults | Quran Academee',
    metaDescription: 'Learn Madani Qaida online with live 1-on-1 certified Quran tutors. Master Arabic letters, Makharij pronunciation, and reading rules. Book a free trial class today.',
    answerFirstSummary:
      'Online Madani Qaida classes at Quran Academee provide live, 1-on-1 foundational Quran reading instruction for kids and adult beginners. Students learn correct Arabic alphabet pronunciation (Makharij), letter joining, Harakat, and basic phonetic rules through certified scholars, transitioning smoothly from Noorani to Madani script for lifelong Quranic recitation fluency.',
    category: 'Foundations & Reading',
    ageGroup: 'Kids (Ages 4+) & Adults',
    duration: '2–3 Months (Self-Paced)',
    level: 'Absolute Beginner',
    startingPrice: 35,
    currency: 'USD',
    icon: 'menu_book',
    keyHighlights: [
      'Authentic Alqaida Almadania syllabus',
      'Individual 1-on-1 live interactive lessons',
      'Certified native Arabic & bilingual scholars',
      'Smooth transition to the Madinah Mushaf',
      'Free trial class with zero obligation',
    ],
    learningOutcomes: [
      'Recognize and pronounce all 28 Arabic letters in isolated, beginning, middle, and end shapes.',
      'Produce accurate phonetics from primary throat, tongue, and lip articulation points (Makharij).',
      'Master essential Harakat (Fatha, Kasra, Damma), Tanween, and Sukoon.',
      'Connect letters smoothly to read multi-syllable Quranic words effortlessly.',
      'Transition directly into reading full verses from the sacred Madinah Mushaf.',
    ],
    curriculumMilestones: [
      {
        milestone: 'Milestone 1',
        title: 'Alphabet & Articulation Points (Makharij)',
        description: 'Mastering every letter sound with correct tongue and throat positioning to avoid common pronunciation errors.',
        lessons: [
          'Isolated Arabic letters and phonetic characteristics',
          'Throat letters (Huroof Halqiyyah) and guttural sounds',
          'Tongue articulation points (Makharij Al-Lisaan)',
          'Compound joint shapes (Murakkabat) identification',
        ],
      },
      {
        milestone: 'Milestone 2',
        title: 'Short Vowels (Harakat) & Tanween',
        description: 'Learning the core vocalization movements and double-vowel nunation that give words their rhythmic beat.',
        lessons: [
          'Fatha (Zabar), Kasra (Zair), and Damma (Paish) execution',
          'Tanween (Double Fatha, Double Kasra, Double Damma) rules',
          'Rhythmic syllable formation without dragging sounds',
          'Practical recognition drills with beginner words',
        ],
      },
      {
        milestone: 'Milestone 3',
        title: 'Prolongation (Huroof Maddah) & Leen',
        description: 'Understanding how long vowels and soft diphthongs create authentic Quranic cadence.',
        lessons: [
          'Alif Maddah, Waw Maddah, and Yaa Maddah durations (1 Alif)',
          'Standing vowels (Khari Harakat) applications',
          'Huroof Leen (Waw Leen & Yaa Leen) soft pronunciations',
          'Distinguishing between short and prolonged vowels',
        ],
      },
      {
        milestone: 'Milestone 4',
        title: 'Sukoon, Tashdeed & Quranic Word Formation',
        description: 'Connecting syllables, managing doubled letters with emphasis, and reading complete Quranic phrases.',
        lessons: [
          'Sukoon / Jazm rules and sound locking',
          'Tashdeed (doubled consonants) with proper timing (Nabr)',
          'Rules of Qalqalah (echoing letters)',
          'Reading complex multi-letter words directly from Madani script',
        ],
      },
    ],
    teacherQualifications: [
      'Graduates of prestigious Islamic institutions including Madinah University and Al-Azhar.',
      'Holders of verified credentials in Quran recitation and foundational Qaida instruction.',
      'Trained in child psychology and interactive digital pedagogy for young children.',
      '100% background-checked, vetted, and supervised under senior scholar Sheikh Jawwad Musa.',
      'Dedicated female scholars available for sisters and younger children.',
    ],
    scheduleOptions: [
      {
        option: '2 Days / Week',
        detail: '8 sessions per month (30 minutes each)',
        recommendation: 'Ideal for busy school students needing steady, stress-free foundations.',
      },
      {
        option: '3 Days / Week (Recommended)',
        detail: '12 sessions per month (30 minutes each)',
        recommendation: 'Optimal consistency for young kids to retain phonetics between classes.',
      },
      {
        option: '5 Days / Week (Accelerated)',
        detail: '20 sessions per month (30 minutes each)',
        recommendation: 'Best for rapid progress, completing the Qaida in under 6 weeks.',
      },
    ],
    pricingPlans: [
      {
        id: 'qaida-plan-1',
        name: 'Plan 1',
        price: 35,
        originalPrice: 48,
        weeklyClasses: 2,
        classDuration: '30 Minutes',
        classesPerMonth: 8,
        features: [
          'Free Trial Class included',
          '2 Days/Week (30 Mins/Class)',
          '08 Classes per Month',
          'Alqaida Almadania text included',
          'Certified Male/Female Quran teacher',
          'Monthly progress assessment',
        ],
      },
      {
        id: 'qaida-plan-2',
        name: 'Plan 2',
        price: 50,
        originalPrice: 63,
        weeklyClasses: 3,
        classDuration: '30 Minutes',
        classesPerMonth: 12,
        isPopular: true,
        features: [
          'Free Trial Class included',
          '3 Days/Week (30 Mins/Class)',
          '12 Classes per Month',
          'Fluency drills & phonetic tests',
          'Certified expert Quran teacher',
          'Priority makeup class rescheduling',
          'Dedicated parent progress reports',
        ],
      },
      {
        id: 'qaida-plan-3',
        name: 'Plan 3',
        price: 70,
        originalPrice: 78,
        weeklyClasses: 5,
        classDuration: '30 Minutes',
        classesPerMonth: 20,
        features: [
          'Free Trial Class included',
          '5 Days/Week (30 Mins/Class)',
          '20 Classes per Month',
          'Rapid recitation & intensive phonetics',
          'Senior certified Quran scholar',
          'Unlimited makeup rescheduling',
          'Direct academic line counselor access',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between Noorani Qaida and Madani Qaida?',
        answer: 'Both booklets teach Arabic phonetics and reading principles. However, Madani Qaida uses the modern Uthmani (Madinah) script font exactly as printed in King Fahd Complex Mushafs worldwide, allowing children to transition seamlessly to the Holy Quran without confusion over letter fonts.',
      },
      {
        question: 'What is the ideal age to start Madani Qaida?',
        answer: 'Children can start as early as 4 to 5 years old. Our instructors use visual games, color coding, and gentle patience. We also cater to adult beginners who want to learn reading from scratch with complete privacy.',
      },
      {
        question: 'Can I choose a female teacher for my daughter or young son?',
        answer: 'Yes, absolutely. Quran Academee maintains a dedicated roster of certified female scholars available for female students of all ages and young children.',
      },
      {
        question: 'How long does it take to complete the Madani Qaida course?',
        answer: 'Most students attending 3 classes per week complete the entire Qaida within 8 to 12 weeks, graduating directly into reading Juz Amma from the Holy Quran.',
      },
    ],
  },
  {
    slug: 'quran-reading-online',
    id: 'quran-reading',
    title: 'Quran Recitation & Reading Fluency',
    shortTitle: 'Quran Reading',
    arabicTitle: 'تلاوة القرآن الكريم',
    h1: 'Online Quran Reading Classes with Fluency & Tajweed',
    metaTitle: 'Online Quran Reading Classes with Fluency | Quran Academee',
    metaDescription: 'Read the Holy Quran fluently online with certified 1-on-1 scholars. Master smooth Mushaf reading, pause signs, and Tajweed. Book your free trial class today.',
    answerFirstSummary:
      'Online Quran reading classes at Quran Academee offer personalized 1-on-1 lessons designed to help children and adults recite the Holy Quran directly from the Mushaf with ease. Under certified tutors, learners master word-by-word reading, pause signs (Waqf), breath coordination, and foundational Tajweed, bridging fluent recitation with verse comprehension and practical spirituality.',
    category: 'Fluency & Recitation',
    ageGroup: 'Kids (Ages 6+) & Adults',
    duration: '6–12 Months (Ongoing)',
    level: 'Beginner to Intermediate',
    startingPrice: 35,
    currency: 'USD',
    icon: 'chrome_reader_mode',
    keyHighlights: [
      'Direct reading from King Fahd Madinah Mushaf',
      'Systematic progression from short Surahs to long chapters',
      'Breath control and sentence stopping (Waqf) mastery',
      'Taught by certified male and female reciters',
      'Free trial class included with no credit card required',
    ],
    learningOutcomes: [
      'Read Quranic passages directly from the Mushaf at a natural, effortless pace.',
      'Identify and apply all primary sentence pause symbols (Waqf signs) correctly.',
      'Eliminate hesitation, stuttering, and accidental word skipping.',
      'Understand foundational meaning and contextual stories of commonly recited Surahs.',
      'Cultivate devotional mindfulness and spiritual reverence during daily recitation.',
    ],
    curriculumMilestones: [
      {
        milestone: 'Milestone 1',
        title: 'Juz Amma Recitation & Reading Confidence',
        description: 'Focusing on the 30th chapter of the Quran to solidify letter connections and build reading endurance.',
        lessons: [
          'Surah Al-Fatihah word-by-word precision',
          'Recitation of short Surahs (An-Nas to Ad-Duha)',
          'Breath control drills on 1–2 line verses',
          'Pronunciation refinement for difficult Arabic letters',
        ],
      },
      {
        milestone: 'Milestone 2',
        title: 'Medium Surahs & Pause Rules (Waqf)',
        description: 'Reading longer passages in Juz 28 and 29 while mastering pause and restart protocols.',
        lessons: [
          'Surah Al-Mulk, Al-Qalam, and Al-Jumu’ah recitation',
          'Mandatory and prohibited stopping signs (Meem, Laa, Jeem, etc.)',
          'Proper restart methods (Ibtida) when breath runs out',
          'Flow drills for smooth rhythm without robotic pauses',
        ],
      },
      {
        milestone: 'Milestone 3',
        title: 'Major Chapters & Continuous Mushaf Reading',
        description: 'Transitioning to reading complex, continuous pages from Surah Al-Baqarah and central Surahs.',
        lessons: [
          'Navigating multi-verse narratives without stumbling',
          'Handling complex diacritics and silent letter rules',
          'Word-by-word vocabulary highlights of recurring terms',
          'Independent reading validation without tutor prompting',
        ],
      },
      {
        milestone: 'Milestone 4',
        title: 'Complete Mushaf Khatm & Spiritual Reflection',
        description: 'Working toward completing the recitation of all 30 Juz with proper adab and daily application.',
        lessons: [
          'Structured reading schedule for completing a personal Khatm',
          'Sujud At-Tilawah (prostration of recitation) rulings',
          'Connecting recitation with daily living virtues',
          'Final oral reading evaluation and completion certificate',
        ],
      },
    ],
    teacherQualifications: [
      'Certified Qaris holding authentic chains of recitation (Sanad).',
      'Decade-long experience guiding children and adult converts in Mushaf reading.',
      'Proficient in English and Urdu to clearly explain rules and contextual meanings.',
      'Regularly monitored and assessed by academic director Sheikh Jawwad Musa.',
    ],
    scheduleOptions: [
      {
        option: '2 Days / Week',
        detail: '8 sessions per month (30 minutes each)',
        recommendation: 'Perfect for working adults and busy students maintaining steady Quran connection.',
      },
      {
        option: '3 Days / Week (Recommended)',
        detail: '12 sessions per month (30 minutes each)',
        recommendation: 'The most popular track for children transitioning from Qaida to fluent Mushaf reading.',
      },
      {
        option: '5 Days / Week (Intensive)',
        detail: '20 sessions per month (30 minutes each)',
        recommendation: 'Best for learners wishing to complete their first Quran Khatm rapidly.',
      },
    ],
    pricingPlans: [
      {
        id: 'reading-plan-1',
        name: 'Plan 1',
        price: 35,
        originalPrice: 48,
        weeklyClasses: 2,
        classDuration: '30 Minutes',
        classesPerMonth: 8,
        features: [
          'Free Trial Class included',
          '2 Days/Week (30 Mins/Class)',
          '08 Classes per Month',
          'Word-by-word reading checks',
          'Certified Male/Female Quran tutor',
          'Monthly recitation audit',
        ],
      },
      {
        id: 'reading-plan-2',
        name: 'Plan 2',
        price: 50,
        originalPrice: 63,
        weeklyClasses: 3,
        classDuration: '30 Minutes',
        classesPerMonth: 12,
        isPopular: true,
        features: [
          'Free Trial Class included',
          '3 Days/Week (30 Mins/Class)',
          '12 Classes per Month',
          'Fluency drills & breath coordination',
          'Certified expert Quran teacher',
          'Pause & stopping signs (Waqf) focus',
          'Bi-weekly progress sync with parents',
        ],
      },
      {
        id: 'reading-plan-3',
        name: 'Plan 3',
        price: 70,
        originalPrice: 78,
        weeklyClasses: 5,
        classDuration: '30 Minutes',
        classesPerMonth: 20,
        features: [
          'Free Trial Class included',
          '5 Days/Week (30 Mins/Class)',
          '20 Classes per Month',
          'Full Mushaf reading progression',
          'Senior certified Quran scholar',
          'Priority class rescheduling',
          'Khatm-ul-Quran completion tracking',
        ],
      },
    ],
    faqs: [
      {
        question: 'What prerequisites are required before starting this course?',
        answer: 'Students should have completed a basic Qaida (such as Noorani or Madani Qaida) and be able to recognize joined Arabic letters and vowels. If you are unsure, our teacher will evaluate your level during the free trial class.',
      },
      {
        question: 'Can adult students learn at their own pace?',
        answer: 'Yes! All classes are 1-on-1 private sessions. Our instructors adapt to your personal pace, whether you are refreshing childhood reading skills or learning as an adult beginner.',
      },
      {
        question: 'Does this course include basic translation?',
        answer: 'Yes. In addition to teaching smooth recitation, our instructors introduce common recurring Quranic vocabulary and brief reflections so students understand what they recite.',
      },
    ],
  },
  {
    slug: 'online-tajweed-classes',
    id: 'tajweed',
    title: 'Tajweed al Quran Mastery',
    shortTitle: 'Tajweed Classes',
    arabicTitle: 'قواعد التجويد',
    h1: 'Online Tajweed Classes with Certified Quran Scholars',
    metaTitle: 'Online Tajweed Classes with Certified Scholars | Quran Academee',
    metaDescription: 'Master Tajweed rules online with 1-on-1 certified Quran scholars. Learn Tarteel, Noon Sakinah, Mudood, and precise Makharij. Book a free trial class today.',
    answerFirstSummary:
      'Online Tajweed classes at Quran Academee provide rigorous 1-on-1 training in classical Quranic recitation (Tarteel). Guided by certified scholars and expert Tajweed instructors, students master the rules of Noon Sakinah, Meem Sakinah, Mudood, and precise Makharij, eliminating hidden errors and reciting the Holy Quran with divine beauty, precision, and reverent mindfulness.',
    category: 'Advanced Recitation',
    ageGroup: 'Kids (Ages 8+) & Adults',
    duration: '4–6 Months',
    level: 'Intermediate to Advanced',
    startingPrice: 35,
    currency: 'USD',
    icon: 'workspace_premium',
    keyHighlights: [
      'Comprehensive theoretical and practical Tajweed',
      'Classical Tarteel vocal style training',
      'Detailed study of Noon/Meem Sakinah & Mudood',
      'Scholarly corrections on hidden errors (Lahn Khafi)',
      'Certified tutors with recognized Islamic qualifications',
    ],
    learningOutcomes: [
      'Master the classical rules of Tajweed in both theory and real-time application.',
      'Flawlessly execute Izhar, Idghaam, Iqlaab, and Ikhfaa during active recitation.',
      'Accurately calculate and apply all categories of Madd (elongation) counts.',
      'Distinguish heavy letters (Mufakhkham) and light letters (Muraqqaq) across verses.',
      'Recite with classical melodious composure honoring the Sunnah of Tarteel.',
    ],
    curriculumMilestones: [
      {
        milestone: 'Milestone 1',
        title: 'Makharij Refinement & Sifaat (Letter Attributes)',
        description: 'Exhaustive precision on letter origins and intrinsic permanent characteristics.',
        lessons: [
          'Detailed map of the 17 classical articulation points',
          'Sifaat with opposites: Hams vs Jahr, Shiddah vs Rakhawah',
          'Sifaat without opposites: Qalqalah, Safeer, Tafashshi, Istitalah',
          'Heavy and light letter rules (Tafkheem & Tarqeeq) for Ra and Laam',
        ],
      },
      {
        milestone: 'Milestone 2',
        title: 'Rules of Noon Sakinah, Tanween & Meem Sakinah',
        description: 'The foundational rules of nasalization (Ghunnah) and consonant interaction.',
        lessons: [
          'Izhar Halqi: Clear pronunciation conditions',
          'Idghaam with Ghunnah (Yanmoo) and without Ghunnah (Laam & Raa)',
          'Iqlaab: Transforming Noon into Meem with soft lip contact',
          'Ikhfaa Haqiqi: 15 letters of concealment with measured nasal tone',
          'Meem Sakinah rules: Ikhfaa Shafawi, Idghaam Shafawi, Izhar Shafawi',
        ],
      },
      {
        milestone: 'Milestone 3',
        title: 'Mudood (Prolongation Rules & Durations)',
        description: 'Mastering the 2, 4, 5, and 6-count elongation categories.',
        lessons: [
          'Natural Madd (Madd Asli / Tabee’i) 2-count standard',
          'Secondary Madd caused by Hamzah (Madd Muttasil & Madd Munfasil)',
          'Secondary Madd caused by Sukoon (Madd Lazim & Madd Aarid)',
          'Madd Badal, Madd Leen, and Madd Silah rules',
        ],
      },
      {
        milestone: 'Milestone 4',
        title: 'Waqf, Ibtida & Melodious Tarteel Practice',
        description: 'Perfecting stopping protocols and vocal delivery during full-page recitations.',
        lessons: [
          'Categories of Waqf: Taamm, Kaafi, Hasan, Qabeeh',
          'Saktah (breathless pause) locations in the Quran',
          'Eliminating hidden mistakes (Lahn Khafi) during continuous recitation',
          'Comprehensive graduation evaluation and Tajweed certification',
        ],
      },
    ],
    teacherQualifications: [
      'Certified Tajweed scholars specializing in Hafs ‘an ‘Asim recitation.',
      'Graduates trained in classical Tajweed texts such as Tuhfat al-Atfal and Al-Jazariyyah.',
      'Skilled at isolating subtle phonetic defects and providing real-time audio guidance.',
      'Supervised directly by Sheikh Jawwad Musa (Madinah University graduate).',
    ],
    scheduleOptions: [
      {
        option: '2 Days / Week',
        detail: '8 sessions per month (30 minutes each)',
        recommendation: 'Great for students balancing school or work who want focused weekly feedback.',
      },
      {
        option: '3 Days / Week (Recommended)',
        detail: '12 sessions per month (30 minutes each)',
        recommendation: 'Optimal practice frequency to reprogram vocal habits and muscle memory.',
      },
      {
        option: '5 Days / Week (Intensive)',
        detail: '20 sessions per month (30 minutes each)',
        recommendation: 'Designed for aspiring reciters, teachers, and Huffaz seeking perfection.',
      },
    ],
    pricingPlans: [
      {
        id: 'tajweed-plan-1',
        name: 'Plan 1',
        price: 35,
        originalPrice: 48,
        weeklyClasses: 2,
        classDuration: '30 Minutes',
        classesPerMonth: 8,
        features: [
          'Free Trial Class included',
          '2 Days/Week (30 Mins/Class)',
          '08 Classes per Month',
          'Basic Tajweed rules & Makharij check',
          'Certified Male/Female Quran tutor',
          'Monthly diagnostic assessment',
        ],
      },
      {
        id: 'tajweed-plan-2',
        name: 'Plan 2',
        price: 50,
        originalPrice: 63,
        weeklyClasses: 3,
        classDuration: '30 Minutes',
        classesPerMonth: 12,
        isPopular: true,
        features: [
          'Free Trial Class included',
          '3 Days/Week (30 Mins/Class)',
          '12 Classes per Month',
          'Noon/Meem Sakinah & Madd rules',
          'Certified expert Tajweed teacher',
          'Real-time audio correction',
          'Tarteel vocal coaching',
        ],
      },
      {
        id: 'tajweed-plan-3',
        name: 'Plan 3',
        price: 70,
        originalPrice: 78,
        weeklyClasses: 5,
        classDuration: '30 Minutes',
        classesPerMonth: 20,
        features: [
          'Free Trial Class included',
          '5 Days/Week (30 Mins/Class)',
          '20 Classes per Month',
          'Classical Arabic recitation style',
          'Senior certified Quran scholar',
          'Advanced Sifaat & Waqf rules',
          'Advanced Recitation & Mastery track',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why is learning Tajweed obligatory for reciting the Quran?',
        answer: 'Reciting with proper Tajweed preserves the authentic words of Allah as revealed to Prophet Muhammad (PBUH). Incorrect pronunciation can change Arabic word meanings entirely. Learning Tajweed guarantees you recite reverently and accurately.',
      },
      {
        question: 'Can I learn Tajweed even if I am an adult who learned without it?',
        answer: 'Yes! Many of our adult learners learned basic reading earlier in life without formal Tajweed. Our instructors specialize in gently correcting lifelong habits through personalized 1-on-1 drills.',
      },
      {
        question: 'Do you teach both the theoretical rules and practical application?',
        answer: 'Yes. Every class balances clear theoretical explanation (using simplified English terminology) with intensive oral recitation practice directly from the Quran.',
      },
    ],
  },
  {
    slug: 'online-hifz-program',
    id: 'memorization',
    title: 'Quran Memorization (Hifz Program)',
    shortTitle: 'Hifz Program',
    arabicTitle: 'حفظ القرآن الكريم',
    h1: 'Online Quran Memorization (Hifz) Program for Kids & Adults',
    metaTitle: 'Online Quran Memorization (Hifz) Program | Quran Academee',
    metaDescription: 'Memorize the Holy Quran online with live 1-on-1 senior Huffaz. Structured daily Sabaq, Sabqi, and Manzil retention routines. Book a free trial class today.',
    answerFirstSummary:
      'The online Hifz program at Quran Academee offers a structured, individualized memorization journey guided by senior Huffaz and scholars. Students follow a proven three-part daily method—Sabaq (new lesson), Sabqi (recent revision), and Manzil (cumulative retention)—ensuring steady progress, flawless Tajweed, long-term Quran retention, and deep spiritual connection to the memorized verses.',
    category: 'Memorization (Hifz)',
    ageGroup: 'Kids (Ages 6+) & Adults',
    duration: 'Custom (1 to 3 Years)',
    level: 'Intermediate to Advanced',
    startingPrice: 100,
    currency: 'USD',
    icon: 'psychology',
    keyHighlights: [
      'Proven 3-phase Hifz methodology (Sabaq, Sabqi, Manzil)',
      'Dedicated 1-on-1 instruction with senior Huffaz',
      'Personalized memorization timeline planner',
      'Weekly retention checks & bi-weekly oral reviews',
      'Free trial class to assess memorization readiness',
    ],
    learningOutcomes: [
      'Memorize selected Surahs, specific Juzs, or the complete Holy Quran by heart.',
      'Retain memorized portions securely using systematic cumulative revision cycles.',
      'Recite memorized verses fluently with Tajweed precision during daily prayers.',
      'Develop mental focus, memory techniques, and disciplined spiritual habits.',
      'Understand core messages and themes of memorized chapters for living practice.',
    ],
    curriculumMilestones: [
      {
        milestone: 'Milestone 1',
        title: 'Foundation & Juz Amma Memorization',
        description: 'Building memory endurance, rhythm, and establishing the daily three-part memorization habit.',
        lessons: [
          'Readiness assessment and Tajweed fluency validation',
          'Memorization of Surah An-Nas through Surah Ad-Duha',
          'Establishing the daily Sabqi (recent review) protocol',
          'Memorization of Surah An-Naba through Al-Fajr',
        ],
      },
      {
        milestone: 'Milestone 2',
        title: 'Juz Tabarak (29) & Milestone Juzs',
        description: 'Stepping into medium-length Surahs with structured daily page goals and audio check-ins.',
        lessons: [
          'Memorizing Surah Al-Mulk, Al-Qalam, and Al-Haaqqah',
          'Introduction of weekly cumulative Manzil (older review)',
          'Handling verse continuity and contextual cues',
          'Monthly oral Hifz exam with senior academic board',
        ],
      },
      {
        milestone: 'Milestone 3',
        title: 'Major Surahs & Extended Juz Memorization',
        description: 'Systematic progression through primary chapters including Surah Yasin, Al-Kahf, and Al-Baqarah.',
        lessons: [
          'Memorizing quarter, half, or full pages per day based on student capacity',
          'Techniques to eliminate stumbling in long narrative passages',
          'Cross-referencing overlapping verse endings',
          'Conducting full-Juz continuous oral recitations in a single sitting',
        ],
      },
      {
        milestone: 'Milestone 4',
        title: 'Final Khatm & Permanent Manzil Lock',
        description: 'Completing memorization, cementing lifelong retention, and preparing for leading prayers.',
        lessons: [
          'Final 30-Juz cumulative revision and testing cycle',
          'Lead prayer (Imamah and Taraweeh) preparation drills',
          'Long-term sustainable lifelong revision routine (e.g., 1 Juz daily)',
          'Graduation Khatm ceremony and formal Hifz Certificate',
        ],
      },
    ],
    teacherQualifications: [
      'Senior Huffaz who have personally memorized the complete Quran with authentic Sanad.',
      'Years of specialized experience teaching young children and adults via 1-on-1 digital classrooms.',
      'Expertise in memory retention strategies, mnemonic techniques, and Mutashabihat.',
      'Guided under the continuous supervision of Sheikh Jawwad Musa.',
    ],
    scheduleOptions: [
      {
        option: '2 Days / Week',
        detail: '8 sessions per month (40–45 minutes each)',
        recommendation: 'Designed for students memorizing selected Surahs or doing partial Hifz alongside school.',
      },
      {
        option: '3 Days / Week (Recommended)',
        detail: '12 sessions per month (40–45 minutes each)',
        recommendation: 'The gold standard for sustainable steady memorization without burnout.',
      },
      {
        option: '5 Days / Week (Full-Time Track)',
        detail: '20 sessions per month (60 minutes each)',
        recommendation: 'For dedicated full-time students aiming to complete Hifz in 1 to 2 years.',
      },
    ],
    pricingPlans: [
      {
        id: 'hifz-plan-1',
        name: 'Plan 1',
        price: 100,
        originalPrice: 115,
        weeklyClasses: 2,
        classDuration: '40-45 Minutes',
        classesPerMonth: 8,
        features: [
          'Free Trial Class included',
          '2 Days per Week (40-45 Mins)',
          '08 Classes per Month',
          'Customized Hifz memorization planner',
          'Daily testing of new memorization (Sabaq)',
          'Certified senior Hifz tutor',
          'Monthly Hifz progress audit',
        ],
      },
      {
        id: 'hifz-plan-2',
        name: 'Plan 2',
        price: 110,
        originalPrice: 130,
        weeklyClasses: 3,
        classDuration: '40-45 Minutes',
        classesPerMonth: 12,
        isPopular: true,
        features: [
          'Free Trial Class included',
          '3 Days per Week (40-45 Mins)',
          '12 Classes per Month',
          'Revision of old parts (Manzil & Sabqi)',
          'Long-term memory retention strategies',
          'Certified senior Hifz scholar',
          'Priority makeup class rescheduling',
          'Bi-weekly oral evaluation meetings',
        ],
      },
      {
        id: 'hifz-plan-3',
        name: 'Plan 3',
        price: 150,
        originalPrice: 175,
        weeklyClasses: 5,
        classDuration: '1 Hour',
        classesPerMonth: 20,
        features: [
          'Free Trial Class included',
          '5 Days per Week (1 Hour/Class)',
          '20 Classes per Month',
          'Elite Senior Quran Reciters',
          'Daily intensive revision & testing',
          'Personalized long-term Hifz timeline planner',
          'Monthly counselor sync sessions',
          'Priority direct academic line support',
        ],
      },
    ],
    faqs: [
      {
        question: 'How do you prevent students from forgetting what they memorized?',
        answer: 'Our program strictly enforces the classical 3-tier method: Sabaq (new memorization), Sabqi (recent 5–10 pages), and Manzil (systematic daily review of older Juzs). A student is never allowed to progress to new verses until past portions are completely solid.',
      },
      {
        question: 'Can adults with full-time jobs join the Hifz program?',
        answer: 'Yes! We have many adult students who memorize at a manageable pace (e.g., 3 to 5 verses daily) during early mornings or evenings. Our 24/7 flexible scheduling fits any professional routine.',
      },
      {
        question: 'Do you offer a female Hifz tutor for female students?',
        answer: 'Yes, we have certified female Hafizat with authentic credentials ready to mentor female students and young girls in private, comfortable 1-on-1 sessions.',
      },
    ],
  },
  {
    slug: 'hifz-revision-partner',
    id: 'hifz-revision',
    title: 'Hifz Revision & Retention Partner',
    shortTitle: 'Hifz Revision',
    arabicTitle: 'مراجعة وتثبيت الحفظ',
    h1: 'Online Hifz Revision & Retention Partner for Huffaz',
    metaTitle: 'Online Hifz Revision Partner for Huffaz | Quran Academee',
    metaDescription: 'Strengthen and retain your Hifz online with certified scholar partners. Resolve Mutashabihat verses and build lifelong Manzil. Book a free trial class today.',
    answerFirstSummary:
      'The Hifz Revision Partner program at Quran Academee pairs graduates and intermediate Huffaz with certified Quran scholars for 1-on-1 revision sessions. Our mentors identify weak retention points, resolve similar verses (Mutashabihat), and structure sustainable daily Manzil routines, empowering Huffaz to recite effortlessly from memory, lead Taraweeh prayers, and maintain their lifelong Hifz.',
    category: 'Hifz Retention',
    ageGroup: 'Huffaz & Advanced Students',
    duration: 'Ongoing & Flexible',
    level: 'Advanced',
    startingPrice: 100,
    currency: 'USD',
    icon: 'school',
    keyHighlights: [
      'Tailored revision schedules (1–3 Juz per session)',
      'Targeted resolution of look-alike verses (Mutashabihat)',
      'Live listening and instant error correction by senior scholars',
      'Taraweeh prayer and public recitation preparation',
      'Free diagnostic trial class to evaluate current recall',
    ],
    learningOutcomes: [
      'Recite extended portions of the Holy Quran by heart with effortless fluency.',
      'Eliminate hesitation, memory slips, and pronunciation doubts across all 30 Juz.',
      'Master identical and similar verses (Mutashabihat) with contextual cross-referencing.',
      'Establish a lifelong, sustainable daily revision routine that fits your lifestyle.',
      'Confidently lead congregational and Taraweeh prayers without anxiety.',
    ],
    curriculumMilestones: [
      {
        milestone: 'Milestone 1',
        title: 'Diagnostic Audit & Schedule Formulation',
        description: 'Assessing your current retention level across all 30 Juz to identify strong, moderate, and weak areas.',
        lessons: [
          'Comprehensive 30-Juz diagnostic test',
          'Cataloging specific stumbling points and recurring slips',
          'Drafting a custom weekly revision cycle (e.g., 5 Juz per week)',
          'Establishing a sustainable daily recitation timetable',
        ],
      },
      {
        milestone: 'Milestone 2',
        title: 'Mutashabihat (Similar Verses) Mastery',
        description: 'Deep analytical training to distinguish overlapping and similar Quranic verses.',
        lessons: [
          'Mastering similar endings in Surah Al-Baqarah, Al-Imran, and An-Nisa',
          'Contextual cues and grammar markers distinguishing similar verses',
          'Mnemonic techniques for identical ayah transitions',
          'Targeted Mutashabihat oral testing drills',
        ],
      },
      {
        milestone: 'Milestone 3',
        title: 'Endurance Building & Multi-Juz Recitation',
        description: 'Building the physical stamina and mental clarity to recite 2 to 3 Juz in a single continuous session.',
        lessons: [
          'Timed continuous recitation without tutor intervention',
          'Breath management during extended stand-and-recite practice',
          'Eliminating unconscious speed-reading and maintaining pristine Tajweed',
          'Quarterly full-Juz continuous oral examinations',
        ],
      },
      {
        milestone: 'Milestone 4',
        title: 'Taraweeh Readiness & Lifelong Preservation',
        description: 'Final polishing for public leading and cementing a routine that endures for decades.',
        lessons: [
          'Simulated Taraweeh leading sessions with mentor evaluation',
          'Managing performance anxiety and sudden memory pauses',
          'Establishing an independent lifelong Manzil routine',
          'Official Hifz Retention Certification from Quran Academee',
        ],
      },
    ],
    teacherQualifications: [
      'Senior Huffaz and Quran scholars who listen to thousands of Juz annually.',
      'Specialists in Mutashabihat and memory consolidation techniques.',
      'Trained to provide encouraging, constructive correction without judgment.',
      'Supervised by Sheikh Jawwad Musa (Madinah University graduate).',
    ],
    scheduleOptions: [
      {
        option: '2 Days / Week',
        detail: '8 sessions per month (40–45 minutes each)',
        recommendation: 'Ideal for busy professionals who need regular accountability to maintain their Manzil.',
      },
      {
        option: '3 Days / Week (Recommended)',
        detail: '12 sessions per month (40–45 minutes each)',
        recommendation: 'Optimal track for active Huffaz seeking thorough review of 1 to 2 Juz every class.',
      },
      {
        option: '5 Days / Week (Intensive)',
        detail: '20 sessions per month (60 minutes each)',
        recommendation: 'Essential for Huffaz preparing for upcoming Taraweeh or formal Hifz examinations.',
      },
    ],
    pricingPlans: [
      {
        id: 'revision-plan-1',
        name: 'Plan 1',
        price: 100,
        originalPrice: 115,
        weeklyClasses: 2,
        classDuration: '40-45 Minutes',
        classesPerMonth: 8,
        features: [
          'Free Trial Class included',
          '2 Days per Week (40-45 Mins)',
          '08 Classes per Month',
          'Diagnosing weak verses (Mutashabihat)',
          'Interactive custom revision routine',
          'Certified Hifz scholar revision partner',
          'Monthly revision evaluations',
        ],
      },
      {
        id: 'revision-plan-2',
        name: 'Plan 2',
        price: 110,
        originalPrice: 130,
        weeklyClasses: 3,
        classDuration: '40-45 Minutes',
        classesPerMonth: 12,
        isPopular: true,
        features: [
          'Free Trial Class included',
          '3 Days per Week (40-45 Mins)',
          '12 Classes per Month',
          'Mutashabihat cross-reference exercises',
          'Rigorous revision of past memorized Juzs',
          'Certified senior Hifz teacher partner',
          'Priority makeup class rescheduling',
          'Sustainable lifelong Manzil building',
        ],
      },
      {
        id: 'revision-plan-3',
        name: 'Plan 3',
        price: 150,
        originalPrice: 175,
        weeklyClasses: 5,
        classDuration: '1 Hour',
        classesPerMonth: 20,
        features: [
          'Free Trial Class included',
          '5 Days per Week (1 Hour/Class)',
          '20 Classes per Month',
          'Elite Scholar revision checkpoints',
          'Intensive memorization preservation program',
          'Preparation for public prayers & Hifz exams',
          'Counselor revision evaluations',
          'Priority direct helpline support',
        ],
      },
    ],
    faqs: [
      {
        question: 'I memorized the Quran years ago but forgot large parts. Can this program help me?',
        answer: 'Yes! Reclaiming forgotten Hifz is faster than memorizing from scratch because the neural pathways exist. Our teachers specialize in patiently reviewing forgotten chapters and rebuilding your confidence without stress.',
      },
      {
        question: 'How much Quran do we review in each class?',
        answer: 'Depending on your current recall and class duration, students typically recite between half a Juz to 2 full Juz per session to their partner teacher.',
      },
      {
        question: 'Is this program suitable for preparing for Taraweeh prayers?',
        answer: 'Yes, many Huffaz join our intensive 5-day track specifically 2 to 3 months before Ramadan to test their recitation and ensure flaw-free Taraweeh leading.',
      },
    ],
  },
  {
    slug: 'islamic-studies-for-kids',
    id: 'islamic-essentials',
    title: 'Islamic Essentials & Masnoon Duas for Kids',
    shortTitle: 'Islamic Studies',
    arabicTitle: 'الواجبات الإسلامية',
    h1: 'Online Islamic Studies & Masnoon Duas Classes for Kids',
    metaTitle: 'Online Islamic Studies Classes for Kids | Quran Academee',
    metaDescription: 'Interactive online Islamic studies for kids. Learn Salah, Wudu, daily Masnoon Duas, Aqeedah, and Seerah with certified tutors. Book a free trial class today.',
    answerFirstSummary:
      'Online Islamic studies classes at Quran Academee provide engaging, interactive education for children and new Muslims worldwide. Covering core Aqeedah, step-by-step practical Salah and Wudu training, essential daily Masnoon Duas, and inspiring stories of the Prophets (Seerah), this curriculum nurtures strong Islamic identity, noble morals (Akhlaq), and living Quranic character in everyday family life.',
    category: 'Islamic Studies & Character',
    ageGroup: 'Kids (Ages 5+) & Beginners',
    duration: '3–4 Months',
    level: 'Beginner',
    startingPrice: 55,
    currency: 'USD',
    icon: 'explore',
    keyHighlights: [
      'Interactive, age-appropriate digital curriculum',
      'Step-by-step practical training for Wudu & 5 Daily Prayers',
      'Daily Masnoon Duas with authentic Arabic and translation',
      'Inspiring stories of the Prophets (Seerah & Qisas al-Anbiya)',
      'Character building focused on kindness, honesty, and family ethics',
    ],
    learningOutcomes: [
      'Perform Wudu (ablution) and the 5 daily prayers (Salah) correctly with full confidence.',
      'Memorize and apply essential daily Duas for eating, sleeping, travelling, and protection.',
      'Understand the 5 Pillars of Islam and 6 Articles of Faith (Iman) with clarity.',
      'Learn key moral lessons from the life of Prophet Muhammad (PBUH) and other Prophets.',
      'Build strong Muslim identity, respect for parents, and noble moral character (Akhlaq).',
    ],
    curriculumMilestones: [
      {
        milestone: 'Milestone 1',
        title: 'Core Faith (Aqeedah) & Pillars of Islam',
        description: 'Establishing strong foundational beliefs and understanding the obligations of being a Muslim.',
        lessons: [
          'The 5 Pillars of Islam explained through child-friendly stories',
          'The 6 Articles of Faith (Belief in Allah, Angels, Books, Prophets, Day of Judgment, Qadar)',
          'The Beautiful Names of Allah (Asma ul Husna) and their daily meanings',
          'Love for Prophet Muhammad (PBUH) and his Sunnah',
        ],
      },
      {
        milestone: 'Milestone 2',
        title: 'Practical Wudu & Daily Salah Step-by-Step',
        description: 'Interactive visual training ensuring children master proper prayer mechanics and recitation.',
        lessons: [
          'Fara’id and Sunan of Wudu with practical screen demonstrations',
          'Step-by-step movements of the 5 daily prayers (Takbeer to Salam)',
          'Memorization and meaning of Tashahhud, Durood Ibrahim, and Dua Qunoot',
          'Understanding the spiritual benefits of prayer in a child’s routine',
        ],
      },
      {
        milestone: 'Milestone 3',
        title: 'Essential Daily Masnoon Duas & Adhkar',
        description: 'Memorizing practical supplications that connect daily routines with divine remembrance.',
        lessons: [
          'Morning and evening protection Duas',
          'Duas for eating, drinking, leaving/entering home, and sleeping',
          'Duas for entering the Masjid, restroom, and starting studies',
          'Short, memorable Hadiths on truthfulness, clean habits, and kindness',
        ],
      },
      {
        milestone: 'Milestone 4',
        title: 'Prophetic Stories & Islamic Morals (Akhlaq)',
        description: 'Nurturing exemplary character through inspiring stories from the Quran and Seerah.',
        lessons: [
          'Inspiring stories of Prophet Ibrahim, Musa, Isa, and Yusuf (AS)',
          'Key life milestones of Prophet Muhammad (PBUH) in Makkah and Madinah',
          'Islamic manners: Honesty, kindness to parents, respecting elders, avoiding backbiting',
          'Interactive end-of-course quiz, certificate, and presentation project',
        ],
      },
    ],
    teacherQualifications: [
      'Specialized educators with deep experience in children’s Islamic pedagogy and curriculum design.',
      'Bilingual in English and Arabic to connect seamlessly with Western-raised children.',
      'Trained in engaging digital teaching methods, live quizzes, and visual worksheets.',
      'Vetted and supervised by Sheikh Jawwad Musa (Madinah University graduate).',
    ],
    scheduleOptions: [
      {
        option: '2 Days / Week',
        detail: '8 sessions per month (30 minutes each)',
        recommendation: 'Recommended for school-going kids to learn without interfering with homework.',
      },
      {
        option: '3 Days / Week (Recommended)',
        detail: '12 sessions per month (30 minutes each)',
        recommendation: 'Balanced pacing for children to memorize Duas and absorb stories with continuity.',
      },
    ],
    pricingPlans: [
      {
        id: 'islamic-plan-1',
        name: 'Plan 1',
        price: 55,
        originalPrice: 65,
        weeklyClasses: 2,
        classDuration: '30 Minutes',
        classesPerMonth: 8,
        features: [
          'Free Trial Class included',
          '2 Days per Week (30 Mins)',
          '08 Classes / Month',
          'Essential Islamic beliefs (Aqeedah)',
          'Step-by-step practical training for Wudu & Salah',
          'Daily Duas, Adhkar, & moral etiquettes',
          'Certified Islamic Studies instructor',
          'Flexible scheduling / makeup classes',
        ],
      },
      {
        id: 'islamic-plan-2',
        name: 'Plan 2',
        price: 80,
        originalPrice: 95,
        weeklyClasses: 3,
        classDuration: '30 Minutes',
        classesPerMonth: 12,
        isPopular: true,
        features: [
          'Free Trial Class included',
          '3 Days per Week (30 Mins)',
          '12 Classes / Month',
          'Fiqh, Seerah of Prophet Muhammad (PBUH)',
          'Stories of the Prophets & moral etiquettes',
          'Age-appropriate curriculum & live worksheets',
          'Weekly quizzes & academic evaluations',
          'Priority makeup class support',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is this course suitable for children born and raised in Western countries?',
        answer: 'Yes! The curriculum is tailored specifically for English-speaking Muslim kids living in the US, UK, Canada, Australia, and Europe. Our instructors use fluent English and relatable examples.',
      },
      {
        question: 'Can this course be combined with Quran reading or Tajweed?',
        answer: 'Yes! Many families combine 15 minutes of Quran reading with 15 minutes of Islamic studies/Duas during their sessions. Simply notify your coordinator upon enrollment.',
      },
      {
        question: 'Are study materials and worksheets provided?',
        answer: 'Yes, full digital access to illustrated Dua sheets, Wudu guides, and revision worksheets is provided free of charge to all enrolled students.',
      },
    ],
  },
  {
    slug: 'quranic-arabic-online',
    id: 'quranic-arabic',
    title: 'Quranic Arabic Online',
    shortTitle: 'Quranic Arabic',
    arabicTitle: 'العربية القرآنية',
    h1: 'Online Quranic Arabic Classes to Understand the Quran Directly',
    metaTitle: 'Online Quranic Arabic Classes | Understand Quran | Quran Academee',
    metaDescription: 'Learn Quranic Arabic online with certified native scholars. Master grammar (Nahw & Sarf), vocabulary, and direct verse comprehension. Book a free trial class today.',
    answerFirstSummary:
      'Online Quranic Arabic classes at Quran Academee enable students to understand the Holy Quran directly in its original revelation without relying solely on translations. Taught by native Arabic scholars, learners master essential grammar (Nahw and Sarf), high-frequency Quranic root vocabulary, and practical sentence construction to connect deeply with divine revelation during recitation and daily prayer.',
    category: 'Arabic Language',
    ageGroup: 'Teens & Adults (All Levels)',
    duration: 'Ongoing',
    level: 'Beginner to Intermediate',
    startingPrice: 55,
    currency: 'USD',
    icon: 'translate',
    keyHighlights: [
      'Focus on high-frequency Quranic vocabulary (covers 80% of words)',
      'Classical Arabic grammar (Nahw & Sarf) made intuitive',
      'Direct translation exercises on live Quranic passages',
      'Native Arabic scholars proficient in English explanation',
      'Free trial class with personalized language assessment',
    ],
    learningOutcomes: [
      'Understand recurring Quranic vocabulary covering the vast majority of the Holy Quran.',
      'Master the core rules of Arabic grammar (Nahw) and morphological patterns (Sarf).',
      'Translate short Surahs and daily prayer recitations directly without checking a dictionary.',
      'Recognize grammatical sentence structures across the Holy Quran.',
      'Experience deep emotional and intellectual connection while listening to the Quran in prayer.',
    ],
    curriculumMilestones: [
      {
        milestone: 'Milestone 1',
        title: 'Alphabet, Roots & High-Frequency Words',
        description: 'Unlocking the 3-letter root system and learning the 300 most frequent words in the Quran.',
        lessons: [
          'The Arabic tri-literal root system explained simply',
          'High-frequency pronouns, prepositions, and question words',
          'Nouns: Gender, singular, dual, and plural rules',
          'Direct translation exercises on Surah Al-Fatihah and Ayat al-Kursi',
        ],
      },
      {
        milestone: 'Milestone 2',
        title: 'Grammar Foundations (Nahw) & Sentence Structure',
        description: 'Understanding nominal and verbal sentences and how case endings (I’raab) indicate meaning.',
        lessons: [
          'The Nominal Sentence (Jumlah Ismiyyah): Mubtada and Khabar',
          'The Verbal Sentence (Jumlah Fi’liyyah): Verb, subject, and object',
          'Prepositional phrases (Shibh Jumlah) and possessive constructs (Idhafah)',
          'Identifying grammatical roles in short Meccan Surahs',
        ],
      },
      {
        milestone: 'Milestone 3',
        title: 'Morphology (Sarf) & Verb Conjugation Forms',
        description: 'Mastering past, present, and imperative verb forms and their derived patterns.',
        lessons: [
          'Past tense (Madi) conjugations across all pronouns',
          'Present/future tense (Mudari’) markers and prefixes',
          'Command and prohibition verbs (Amr & Nahy)',
          'The 10 major derived verb scales (Awzan) and their nuanced meanings',
        ],
      },
      {
        milestone: 'Milestone 4',
        title: 'Direct Quran Passage Translation',
        description: 'Applying grammar and vocabulary to translate extended passages from the Quran.',
        lessons: [
          'Translating complete passages from Surah Yusuf and Surah Maryam',
          'Recognizing rhetorical beauty and linguistic subtleties in Quranic style',
          'Analyzing complex sentence structures in Juz 30',
          'Final translation examination and Quranic Arabic Certificate',
        ],
      },
    ],
    teacherQualifications: [
      'Native Arabic scholars holding degrees in Arabic Linguistics and Islamic Studies.',
      'Specialized in teaching classical Quranic Arabic to international non-native students.',
      'Fluent in English to explain complex grammatical concepts with ease.',
      'Supervised directly by Sheikh Jawwad Musa (Madinah University graduate).',
    ],
    scheduleOptions: [
      {
        option: '2 Days / Week',
        detail: '8 sessions per month (30 minutes each)',
        recommendation: 'Steady pace for working adults who want to digest grammar concepts weekly.',
      },
      {
        option: '3 Days / Week (Recommended)',
        detail: '12 sessions per month (30 minutes each)',
        recommendation: 'Optimal track combining grammar theory, vocabulary drills, and live translation practice.',
      },
      {
        option: '5 Days / Week (Intensive)',
        detail: '20 sessions per month (30 minutes each)',
        recommendation: 'Immersion program for serious students desiring rapid Quranic comprehension within months.',
      },
    ],
    pricingPlans: [
      {
        id: 'quranic-arabic-plan-1',
        name: 'Plan 1',
        price: 55,
        originalPrice: 65,
        weeklyClasses: 2,
        classDuration: '30 Minutes',
        classesPerMonth: 8,
        features: [
          'Free Trial Class included',
          '2 Days per Week (30 Mins)',
          '08 Classes / Month',
          'Arabic alphabet & root-word basics',
          'Essential Quranic vocabulary',
          'Certified Native Arabic tutor',
          'Flexible scheduling / makeup classes',
        ],
      },
      {
        id: 'quranic-arabic-plan-2',
        name: 'Plan 2',
        price: 80,
        originalPrice: 95,
        weeklyClasses: 3,
        classDuration: '30 Minutes',
        classesPerMonth: 12,
        isPopular: true,
        features: [
          'Free Trial Class included',
          '3 Days per Week (30 Mins)',
          '12 Classes / Month',
          'Grammar (Nahw & Sarf) foundations',
          'Direct Quranic verse translation exercises',
          'Salah & Dua direct comprehension',
          'Certified Native Arabic scholar',
          'Priority makeup class rescheduling',
        ],
      },
      {
        id: 'quranic-arabic-plan-3',
        name: 'Plan 3',
        price: 110,
        originalPrice: 130,
        weeklyClasses: 5,
        classDuration: '30 Minutes',
        classesPerMonth: 20,
        features: [
          'Free Trial Class included',
          '5 Days per Week (30 Mins)',
          '20 Classes / Month',
          'Intensive Quranic Arabic immersion',
          'Complex grammar & classical syntax',
          'Senior Native Arabic Professor',
          'Full Quran passage translation project',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need to speak Arabic before taking Quranic Arabic?',
        answer: 'No! This course starts from foundational basics. The only prerequisite is knowing how to read Arabic letters (e.g. after completing basic Qaida).',
      },
      {
        question: 'How is Quranic Arabic different from Conversational Arabic?',
        answer: 'Quranic Arabic focuses on classical vocabulary, grammar (Nahw & Sarf), and understanding the divine text of the Quran and prayers directly. Conversational Arabic focuses on speaking Modern Standard Arabic (Fusha) for everyday communication, travel, and social dialogue.',
      },
      {
        question: 'How quickly will I start understanding Quranic verses?',
        answer: 'By focusing on high-frequency root words that repeat hundreds of times in the Quran, most students start recognizing word patterns and basic verse meanings within the first 4 to 6 weeks.',
      },
    ],
  },
  {
    slug: 'conversational-arabic-online',
    id: 'conversational-arabic',
    title: 'Conversational Arabic Online',
    shortTitle: 'Conversational Arabic',
    arabicTitle: 'المحادثة العربية',
    h1: 'Online Conversational Arabic Classes for Fluent Daily Speaking',
    metaTitle: 'Online Conversational Arabic Classes | Speak Arabic | Quran Academee',
    metaDescription: 'Learn Conversational Arabic online with certified native Arabic speakers. Master daily dialogues, speaking fluency, and Modern Standard Arabic. Book a free trial today.',
    answerFirstSummary:
      'Online Conversational Arabic classes at Quran Academee teach students to speak Modern Standard Arabic (Fusha) confidently in everyday life. Guided by native Arabic speakers, learners master practical conversational dialogues, contemporary vocabulary, and natural sentence formation for travel, study, business, and social communication.',
    category: 'Arabic Language',
    ageGroup: 'Kids, Teens & Adults',
    duration: 'Ongoing',
    level: 'All Levels (Beginner to Advanced)',
    startingPrice: 55,
    currency: 'USD',
    icon: 'message_circle',
    keyHighlights: [
      '1-on-1 immersive conversation practice with native Arab tutors',
      'Modern Standard Arabic (Fusha) and practical daily idioms',
      'Real-life conversational roleplays (travel, home, shopping, work)',
      'Accent reduction and natural Arabic phonetic fluency',
      'Free trial class with customized speaking level evaluation',
    ],
    learningOutcomes: [
      'Converse confidently in Arabic across diverse real-world daily situations.',
      'Express ideas, opinions, and questions smoothly with natural pronunciation.',
      'Build a rich working vocabulary of modern, high-frequency Arabic expressions.',
      'Understand spoken Arabic from native speakers without translation delays.',
      'Bridge modern conversational fluency with Quranic comprehension.',
    ],
    curriculumMilestones: [
      {
        milestone: 'Milestone 1',
        title: 'Greetings, Introductions & Daily Routines',
        description: 'Mastering foundational dialogues, self-introductions, family, and daily expressions.',
        lessons: [
          'Greeting formulas and polite social interactions',
          'Introducing oneself, family background, and professions',
          'Numbers, time, calendar dates, and days of the week',
          'Everyday home routines and casual family conversations',
        ],
      },
      {
        milestone: 'Milestone 2',
        title: 'Practical Life: Travel, Shopping & Dining',
        description: 'Navigating markets, ordering meals, booking flights, and asking directions.',
        lessons: [
          'Market, shopping, and everyday bargaining expressions',
          'Ordering at restaurants and discussing food preferences',
          'Airport, transit, taxi, and hotel booking conversations',
          'Asking for and following city directions with confidence',
        ],
      },
      {
        milestone: 'Milestone 3',
        title: 'Social Discussions & Storytelling',
        description: 'Expressing feelings, discussing hobbies, describing past events, and future plans.',
        lessons: [
          'Describing personal events across past, present, and future tenses',
          'Expressing opinions, likes, dislikes, and perspectives',
          'Discussing weather, health, doctor visits, and appointments',
          'Conversational narrative building and short impromptu stories',
        ],
      },
      {
        milestone: 'Milestone 4',
        title: 'Advanced Fluency & Cultural Nuances',
        description: 'Engaging in formal discourse, media discussions, and spontaneous debates.',
        lessons: [
          'Formal Arabic (Fusha) in media and professional contexts',
          'Cultural idioms, common proverbs, and spontaneous responses',
          'Constructive debate and expressing nuanced viewpoints',
          'Final speaking proficiency project and certificate',
        ],
      },
    ],
    teacherQualifications: [
      'Native Arabic speakers with formal degrees in Arabic Language and Literature.',
      'Experienced in teaching Arabic as a Foreign Language (TAFL) to international students.',
      'Bilingual tutors fluent in English to support absolute beginners.',
      'Child-safe pedagogical training for teaching young learners and teenagers.',
    ],
    scheduleOptions: [
      {
        option: '2 Days / Week',
        detail: '8 sessions per month (30 minutes each)',
        recommendation: 'Great for steady conversational progress alongside busy work or school.',
      },
      {
        option: '3 Days / Week (Recommended)',
        detail: '12 sessions per month (30 minutes each)',
        recommendation: 'Optimal immersion cadence for developing spoken reflexes and vocabulary retention.',
      },
      {
        option: '5 Days / Week (Intensive)',
        detail: '20 sessions per month (30 minutes each)',
        recommendation: 'Intensive immersion for fast-track fluency before travel, study, or relocation.',
      },
    ],
    pricingPlans: [
      {
        id: 'conv-arabic-plan-1',
        name: 'Plan 1',
        price: 55,
        originalPrice: 68,
        weeklyClasses: 2,
        classDuration: '30 Minutes',
        classesPerMonth: 8,
        features: [
          'Free Trial Class included',
          '2 Days/Week (30 Mins/Class)',
          '08 Classes per Month',
          'Basic spoken dialogues & vocabulary',
          'Native Arabic speaker tutor',
          'Monthly oral progress report',
        ],
      },
      {
        id: 'conv-arabic-plan-2',
        name: 'Plan 2',
        price: 80,
        originalPrice: 95,
        weeklyClasses: 3,
        classDuration: '30 Minutes',
        classesPerMonth: 12,
        isPopular: true,
        features: [
          'Free Trial Class included',
          '3 Days/Week (30 Mins/Class)',
          '12 Classes per Month',
          'Interactive real-life roleplays',
          'Modern Standard Arabic (Fusha)',
          'Spoken fluency & listening drills',
          'Personalized speaking feedback',
        ],
      },
      {
        id: 'conv-arabic-plan-3',
        name: 'Plan 3',
        price: 120,
        originalPrice: 140,
        weeklyClasses: 5,
        classDuration: '30 Minutes',
        classesPerMonth: 20,
        features: [
          'Free Trial Class included',
          '5 Days/Week (30 Mins/Class)',
          '20 Classes per Month',
          'Intensive immersion conversations',
          'Advanced idioms & cultural nuances',
          'Senior native Arabic linguist',
          'Official speaking proficiency certificate',
        ],
      },
    ],
    faqs: [
      {
        question: 'What dialect of Arabic do you teach in Conversational Arabic?',
        answer: 'We teach Modern Standard Arabic (Fusha), which is universally understood across all 22 Arab countries, in media, literature, business, and formal settings. We also introduce students to common everyday expressions.',
      },
      {
        question: 'Do I need to know how to read Arabic before taking Conversational Arabic?',
        answer: 'No prior knowledge is required! We have foundational tracks that introduce basic phonetic speaking through interactive audio-visual methods, alongside reading support if desired.',
      },
      {
        question: 'Are the teachers native Arabic speakers?',
        answer: 'Yes! All our conversational Arabic tutors are native Arabic speakers with formal degrees in Arabic Linguistics and extensive experience teaching non-native speakers worldwide.',
      },
      {
        question: 'Can children and teenagers enroll in Conversational Arabic?',
        answer: 'Absolutely. We offer specialized interactive lessons with visual flashcards, stories, and engaging roleplay tailored specifically for children and teenagers.',
      },
    ],
  },
];

export function getAllCourses(): CourseDetail[] {
  return COURSES_DATA;
}

export function getCourseBySlug(slug: string): CourseDetail | undefined {
  return COURSES_DATA.find((c) => c.slug === slug);
}
