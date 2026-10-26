export interface TeacherProfile {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  image: string;
  faculty: string;
  title: string;
  experience: string;
  credentials: string[];
  specialties: string[];
  languages: string[];
  bio: string;
  fallbackInitials: string;
}

export const TEACHERS: TeacherProfile[] = [
  {
    id: 'hajar-abdulazeez',
    name: 'Hajar Abdulazeez',
    gender: 'Female',
    image: '/teachers/Hajar Abdulazeez.jpg',
    faculty: 'Faculty of Quran & Advanced Tajweed',
    title: 'Online Quran & Tajweed Specialist',
    experience: '5+ Years Teaching',
    credentials: [
      'Diploma in Quran & Islamic Subjects (Lisaanu Arab Islamic Centre)',
      'Former Tutor at Daarul Arqam, Diyaar & Daarul Maarif Academies',
      'Certified in Interactive Student-Centered Virtual Pedagogy',
    ],
    specialties: ['Noorani Qaida', 'Advanced Tajweed', 'Hifz (Memorization)', 'Fiqh & Seerah', 'Interactive Learning Tools'],
    languages: ['English', 'Arabic'],
    bio: 'Hajar Abdulazeez is an experienced Online Quran and Tajweed tutor holding a Diploma in Quran and Islamic subjects from Lisaanu Arab Islamic Centre. She brings extensive teaching expertise from working with institutions including Daarul Arqam Online Academy, Diyaar Academy, and Daarul Maarif Academy. Her core curriculum covers Noorani Qaida, advanced Tajweed, Hifz, Fiqh, and Seerah for students of all proficiency levels. She utilizes a student-centered approach with modern interactive tools to foster engaging learning, track student progress, and ensure confident recitation.',
    fallbackInitials: 'HA',
  },
  {
    id: 'aaminah-najmudeen',
    name: 'Aaminah Najmudeen',
    gender: 'Female',
    image: '/teachers/Aaminah Najmudeen.jpg',
    faculty: 'Faculty of Hifz & Arabic Reading',
    title: 'Certified Hafidhah & Thanawiyyah Scholar',
    experience: '5 Years Teaching',
    credentials: [
      'Certified Hafidhah of the Holy Quran',
      'Thanawiyyah Graduate in Classical Islamic Sciences',
      'Specialist in Structured Quran Revision & Memorization',
    ],
    specialties: ['Quran Recitation & Hifz', 'Basic Tajweed', 'Arabic Reading & Writing', 'Grammar & Vocabulary', 'Youth Character Building'],
    languages: ['Arabic', 'English', 'Yoruba'],
    bio: 'Aaminah Najmudeen is a certified Hafidhah of the Holy Quran and a Thanawiyyah graduate with five years of experience teaching Quran recitation, memorization, and revision. She specializes in guiding students through basic Tajweed, Arabic reading, writing, vocabulary, and grammar. Fluent in Arabic, English, and Yoruba, she brings strong language skills and a structured teaching methodology. She is dedicated to delivering engaging instruction while fostering discipline, Islamic values, and positive student development.',
    fallbackInitials: 'AN',
  },
  {
    id: 'mutiullah-ayomide',
    name: 'Mutiullah Aishat Ayomide',
    gender: 'Female',
    image: '/teachers/Mutiullah Aishat Ayomide.jpg',
    faculty: 'Faculty of Islamic Studies & Primary Education',
    title: 'Islamic Studies & Primary Pedagogy Specialist',
    experience: '4+ Years Teaching',
    credentials: [
      'As-Shahaadatu-l-Thaanawiyah (Mahd Ahlu AL-Sunnah Wal-Jama\'ah)',
      'SSCE from Ta\'awunu Comprehensive High School',
      'Professional Teaching at Al-Afiyah School & Daaru Al-maarif',
    ],
    specialties: ['Arabic Fluency', 'Basic Islamic Education', 'Virtual Classroom Management', 'Learner-Centered Lesson Design', 'Moral Values (Akhlaq)'],
    languages: ['English', 'Arabic'],
    bio: "Mutiullah Aishat Ayomide holds an As-Shahaadatu-l-Thaanawiyah from Mahd Ahlu AL-Sunnah Wal-Jama'ah alongside her SSCE from Ta'awunu Comprehensive High School. She brings professional teaching experience in Arabic, English, Islamic studies, and basic education across institutions like Al-Afiyah School and Daaru Al-maarif. Skilled in virtual classroom management, she designs structured, learner-centered lesson plans to support language fluency and academic growth. She is dedicated to fostering academic excellence, positive moral values, and discipline for primary and basic-level students.",
    fallbackInitials: 'MA',
  },
  {
    id: 'luqman-khan',
    name: 'Luqman Khan',
    gender: 'Male',
    image: '/teachers/Luqman Khan.jpeg',
    faculty: 'Faculty of Tajweed & Quran Memorization',
    title: 'Certified Hafidh & Senior Tajweed Tutor',
    experience: '6+ Years Teaching',
    credentials: [
      'Completed Hifz ul Quran at Al Safa Institute',
      'Studied Tajweed under Qari Sohaib Ahmed Meer Muhammadi',
      'Islamic Studies & Tajweed from Al Bayan Institute & Quran College Lahore',
      'Bachelor of Commerce (Allama Iqbal Open University)',
    ],
    specialties: ['Advanced Tajweed', 'Quran Memorization (Hifz)', 'Foundational Islamic Essentials', 'Phonetic Articulation (Makharij)', 'Home & Online Tutoring'],
    languages: ['English', 'Urdu', 'Arabic', 'Hindi'],
    bio: 'Luqman Khan is a dedicated Hafidh and certified Quran teacher who completed his Hifz ul Quran at Al Safa Institute and studied Tajweed under the guidance of Qari Sohaib Ahmed Meer Muhammadi. He has built a strong background in Islamic studies and Tajweed through institutions such as Al Bayan Institute and Quran College Lahore. With over six years of teaching experience across home tutoring and online platforms, he specializes in Tajweed, memorization, and foundational Islamic essentials for students of all ages. Proficient in English, Urdu, Arabic, and Hindi, he is also advancing his English communication skills while pursuing his Bachelor of Commerce degree through Allama Iqbal Open University.',
    fallbackInitials: 'LK',
  },
  {
    id: 'khidru-akorede',
    name: 'Khidru Jalaludeen Akorede',
    gender: 'Male',
    image: '/teachers/Khidru Jalaludeen Akorede.jpeg',
    faculty: 'Faculty of Quran Hifz & Shariah Sciences',
    title: 'Certified Hafidh & Shariah Sciences Scholar',
    experience: 'Madrasa & Online Instructor',
    credentials: [
      'Certified Hafidh, Akinola Qur\'an Memorisation Centre',
      'Thanawiyyah Graduate from Umar ibn Al-Khattab School',
      'Deep Foundation in Arabic Language & Islamic Shariah',
      'Undergraduate Studies in Architecture (FUT Minna)',
    ],
    specialties: ['Complete Quran Hifz', 'Arabic Language Basics', 'Islamic Shariah Sciences', 'Beginner-Level Mentorship', 'Interactive Recitation'],
    languages: ['Arabic', 'English', 'Yoruba'],
    bio: "Khidru Jalaludeen Akorede is a certified Hafidh who completed his complete memorization of the Holy Qur'an at the Akinola Qur'an Memorisation Centre. He is a Thanawiyyah graduate from Umar ibn Al-Khattab School with a strong foundation in Arabic language and Islamic Shariah sciences. Having gained practical teaching experience working with beginner-level students at the madrasa, he is dedicated to providing quality online instruction. He is proficient in Arabic, English, and Yoruba while currently pursuing his undergraduate studies in Architecture at the Federal University of Technology, Minna.",
    fallbackInitials: 'KA',
  },
];
