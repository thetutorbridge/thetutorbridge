'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Smartphone,
  Code,
  Palette,
  Layers,
  Database,
  Globe,
  Zap,
  Shield,
  Settings,
  GitBranch,
  Package,
  Play
} from 'lucide-react';
import {
  RoadmapHero,
  WhatIsSection,
  VisualRoadmapSection,
  SalarySection,
  ProjectsSection,
  FAQSection,
  RelatedRoadmapsSection,
  CTASection,
  RoadmapStage
} from '@/components/roadmap/RoadmapComponents';

// Roadmap Stages Data
const roadmapStages: RoadmapStage[] = [
  {
    title: 'Programming Foundation',
    icon: Code,
    color: 'bg-purple-500',
    steps: [
      {
        id: 1,
        title: 'Kotlin Fundamentals',
        description: 'Learn the primary Android language',
        topics: ['Syntax', 'Variables', 'Functions', 'Classes', 'Null Safety', 'Collections']
      },
      {
        id: 2,
        title: 'Object-Oriented Programming',
        description: 'Master OOP concepts',
        topics: ['Classes & Objects', 'Inheritance', 'Interfaces', 'Data Classes', 'Sealed Classes']
      },
      {
        id: 3,
        title: 'Kotlin Advanced',
        description: 'Advanced Kotlin features',
        topics: ['Coroutines', 'Flow', 'Extensions', 'Lambdas', 'Scope Functions']
      }
    ],
    milestone: 'You know Kotlin!'
  },
  {
    title: 'Android Fundamentals',
    icon: Smartphone,
    color: 'bg-green-500',
    steps: [
      {
        id: 4,
        title: 'Android Studio & Setup',
        description: 'Set up development environment',
        topics: ['Android Studio', 'SDK Manager', 'AVD', 'Project Structure', 'Gradle Basics']
      },
      {
        id: 5,
        title: 'App Components',
        description: 'Core Android building blocks',
        topics: ['Activities', 'Fragments', 'Services', 'Broadcast Receivers', 'Content Providers']
      },
      {
        id: 6,
        title: 'Activity Lifecycle',
        description: 'Understand app lifecycle',
        topics: ['Lifecycle States', 'Configuration Changes', 'State Restoration', 'ViewModel']
      }
    ],
    milestone: 'You understand Android basics!'
  },
  {
    title: 'UI Development',
    icon: Palette,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 7,
        title: 'Jetpack Compose',
        description: 'Modern declarative UI',
        topics: ['Composables', 'State', 'Modifiers', 'Layouts', 'Theming', 'Material 3']
      },
      {
        id: 8,
        title: 'Advanced Compose',
        description: 'Complex UI patterns',
        topics: ['Side Effects', 'State Hoisting', 'Animations', 'Custom Layouts', 'Performance']
      },
      {
        id: 9,
        title: 'Navigation',
        description: 'App navigation patterns',
        topics: ['Navigation Component', 'Arguments', 'Deep Links', 'Bottom Navigation', 'Nested Nav']
      }
    ],
    milestone: 'You can build Android UIs!'
  },
  {
    title: 'Architecture',
    icon: Layers,
    color: 'bg-blue-500',
    steps: [
      {
        id: 10,
        title: 'MVVM Architecture',
        description: 'Clean architecture pattern',
        topics: ['Model', 'View', 'ViewModel', 'Repository', 'Use Cases']
      },
      {
        id: 11,
        title: 'Dependency Injection',
        description: 'Manage dependencies',
        topics: ['Hilt', 'Dagger', 'Modules', 'Scopes', 'ViewModels with DI']
      },
      {
        id: 12,
        title: 'Clean Architecture',
        description: 'Scalable app architecture',
        topics: ['Layers', 'Domain Layer', 'Data Layer', 'Presentation Layer', 'Separation of Concerns']
      }
    ]
  },
  {
    title: 'Data & Storage',
    icon: Database,
    color: 'bg-orange-500',
    steps: [
      {
        id: 13,
        title: 'Local Storage',
        description: 'Store data locally',
        topics: ['SharedPreferences', 'DataStore', 'Room Database', 'SQLite', 'Migrations']
      },
      {
        id: 14,
        title: 'Room Database',
        description: 'SQLite abstraction',
        topics: ['Entities', 'DAOs', 'Database', 'Queries', 'Relations', 'TypeConverters']
      }
    ]
  },
  {
    title: 'Networking',
    icon: Globe,
    color: 'bg-red-500',
    steps: [
      {
        id: 15,
        title: 'REST APIs',
        description: 'Fetch data from APIs',
        topics: ['Retrofit', 'OkHttp', 'Serialization', 'Interceptors', 'Error Handling']
      },
      {
        id: 16,
        title: 'Advanced Networking',
        description: 'Complex networking scenarios',
        topics: ['Caching', 'Pagination', 'Image Loading', 'WebSockets', 'GraphQL']
      }
    ],
    milestone: 'You can build data-driven apps!'
  },
  {
    title: 'Async Programming',
    icon: Zap,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 17,
        title: 'Coroutines',
        description: 'Kotlin async programming',
        topics: ['Suspend Functions', 'Dispatchers', 'Scopes', 'Exception Handling', 'Cancellation']
      },
      {
        id: 18,
        title: 'Flow',
        description: 'Reactive streams',
        topics: ['Cold vs Hot', 'StateFlow', 'SharedFlow', 'Operators', 'Collecting']
      }
    ]
  },
  {
    title: 'Testing',
    icon: Shield,
    color: 'bg-teal-500',
    steps: [
      {
        id: 19,
        title: 'Unit Testing',
        description: 'Test business logic',
        topics: ['JUnit', 'MockK', 'Test Doubles', 'ViewModel Tests', 'Repository Tests']
      },
      {
        id: 20,
        title: 'UI Testing',
        description: 'Test the UI',
        topics: ['Compose Testing', 'Espresso', 'UI Automator', 'Screenshot Tests']
      }
    ]
  },
  {
    title: 'Firebase & Services',
    icon: Settings,
    color: 'bg-amber-500',
    steps: [
      {
        id: 21,
        title: 'Firebase',
        description: 'Backend services',
        topics: ['Authentication', 'Firestore', 'Cloud Messaging', 'Crashlytics', 'Analytics']
      },
      {
        id: 22,
        title: 'Google Services',
        description: 'Google integrations',
        topics: ['Google Maps', 'Google Sign-In', 'Play Services', 'Location', 'Billing']
      }
    ]
  },
  {
    title: 'Publishing',
    icon: Play,
    color: 'bg-green-600',
    steps: [
      {
        id: 23,
        title: 'App Release',
        description: 'Publish to Play Store',
        topics: ['Signed APK/AAB', 'ProGuard/R8', 'App Bundle', 'Release Tracks', 'Store Listing']
      },
      {
        id: 24,
        title: 'CI/CD',
        description: 'Automate releases',
        topics: ['GitHub Actions', 'Fastlane', 'Firebase Distribution', 'Automated Testing']
      }
    ],
    milestone: 'You are a professional Android Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$70K - $95K', avg: '$82K' },
  { level: 'Mid (2-5 yrs)', range: '$95K - $140K', avg: '$115K' },
  { level: 'Senior (5-8 yrs)', range: '$140K - $185K', avg: '$160K' },
  { level: 'Lead (8+ yrs)', range: '$185K - $250K+', avg: '$210K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹4L - ₹8L', avg: '₹6L' },
  { level: 'Junior (1-3 yrs)', range: '₹7L - ₹14L', avg: '₹10L' },
  { level: 'Mid (3-5 yrs)', range: '₹14L - ₹28L', avg: '₹20L' },
  { level: 'Senior (5+ yrs)', range: '₹28L - ₹50L+', avg: '₹38L' }
];

// Project Ideas
const projects = [
  {
    title: 'Todo App',
    level: 'Beginner' as const,
    description: 'Task manager with Room database',
    skills: ['Compose', 'Room', 'MVVM', 'Navigation']
  },
  {
    title: 'Weather App',
    level: 'Beginner' as const,
    description: 'Fetch and display weather data',
    skills: ['Retrofit', 'Coroutines', 'Compose', 'API']
  },
  {
    title: 'News Reader',
    level: 'Intermediate' as const,
    description: 'News app with pagination',
    skills: ['Paging 3', 'Room', 'Retrofit', 'Clean Architecture']
  },
  {
    title: 'Chat Application',
    level: 'Intermediate' as const,
    description: 'Real-time chat with Firebase',
    skills: ['Firebase', 'Authentication', 'Firestore', 'FCM']
  },
  {
    title: 'E-Commerce App',
    level: 'Advanced' as const,
    description: 'Full shopping experience',
    skills: ['Multi-module', 'Payments', 'Maps', 'Notifications']
  },
  {
    title: 'Social Media App',
    level: 'Advanced' as const,
    description: 'Feed, profiles, and messaging',
    skills: ['Clean Architecture', 'Image Loading', 'Offline-First', 'Testing']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to become an Android developer?',
    answer: 'With 3-4 hours of daily practice, you can learn Android basics in 2-3 months. Becoming job-ready with architecture patterns, networking, and testing takes 4-6 months. Mastering advanced topics and publishing apps takes 8-12 months of consistent practice.'
  },
  {
    question: 'Should I learn Kotlin or Java for Android?',
    answer: 'Learn Kotlin. Google declared Kotlin the preferred language for Android in 2019. All new Android documentation and features prioritize Kotlin. Java knowledge helps with legacy code, but start with Kotlin - it\'s more modern, concise, and has better null safety.'
  },
  {
    question: 'Is Jetpack Compose replacing XML layouts?',
    answer: 'Yes, Jetpack Compose is the future of Android UI. Google recommends Compose for new projects. While XML layouts won\'t disappear immediately (legacy apps need maintenance), all new Android development should use Compose. It\'s simpler, more powerful, and actively developed.'
  },
  {
    question: 'Android Native vs Flutter vs React Native?',
    answer: 'Native Android (Kotlin) offers the best performance, full API access, and is preferred for complex apps. Flutter is excellent for cross-platform with near-native performance. React Native is good for web developers. For career opportunities, native Android skills are always valuable.'
  },
  {
    question: 'Do I need to learn architecture patterns?',
    answer: 'Yes, understanding MVVM and Clean Architecture is essential for professional Android development. All serious Android jobs expect knowledge of architecture patterns. They make apps maintainable, testable, and scalable. Start with MVVM, then learn Clean Architecture.'
  },
  {
    question: 'Is Android development still in demand?',
    answer: 'Yes, Android has 70%+ global mobile market share. Every company needs mobile apps, and Android skills remain highly sought after. The ecosystem continues growing with new Jetpack libraries, Compose, and Kotlin features. Career opportunities are excellent.'
  },
  {
    question: 'Should I learn iOS development too?',
    answer: 'Focus on Android first until you\'re proficient. Learning both platforms takes time but makes you more valuable. If you want cross-platform, consider Kotlin Multiplatform (KMP) which shares business logic between Android and iOS while using native UIs.'
  },
  {
    question: 'How do I get my first Android job?',
    answer: 'Publish 2-3 apps to the Play Store demonstrating different skills. Use modern stack: Kotlin, Compose, MVVM, Coroutines, Hilt. Write tests. Open-source your code on GitHub. Contribute to Android libraries. Prepare for interviews covering Android lifecycle, Compose, and architecture.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Java Developer',
    description: 'Java programming skills',
    href: '/roadmap/java',
    icon: Code,
    color: 'bg-orange-500'
  },
  {
    title: 'Full Stack Developer',
    description: 'Backend for mobile apps',
    href: '/roadmap/full-stack-developer',
    icon: Layers,
    color: 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66]'
  },
  {
    title: 'System Design',
    description: 'Design scalable systems',
    href: '/roadmap/system-design',
    icon: Settings,
    color: 'bg-purple-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Android Developer Roadmap 2026',
  description: 'Complete guide to becoming an Android developer in 2026',
  author: { '@type': 'Organization', name: 'The Tutor Bridge' },
  publisher: { '@type': 'Organization', name: 'The Tutor Bridge' }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer }
  }))
};

export default function AndroidRoadmapPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navigation />

      <main className="min-h-screen bg-gray-50">
        <RoadmapHero
          title="Android Developer Roadmap"
          description="Master Kotlin, Jetpack Compose, Android architecture, networking, and app publishing. Your complete guide to becoming a professional Android developer in 2026."
          duration="4-6 Months"
          difficulty="Beginner Friendly"
          accentColor="#3DDC84"
        />

        <WhatIsSection
          title="What is an Android Developer?"
          paragraphs={[
            'Android developers create mobile applications for devices running the Android operating system. They use Kotlin and modern tools like Jetpack Compose to build responsive, user-friendly apps that millions of people use daily.',
            'As an Android developer, you will design app architectures, build beautiful UIs, integrate APIs, manage data persistence, and publish apps to the Google Play Store.'
          ]}
          responsibilities={[
            'Build native Android applications with Kotlin',
            'Design UI with Jetpack Compose',
            'Implement MVVM and Clean Architecture',
            'Integrate REST APIs and handle networking',
            'Manage local data with Room database',
            'Write unit and UI tests',
            'Publish and maintain apps on Play Store'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#3DDC84"
        />

        <SalarySection
          title="Android Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Android developers with Jetpack Compose and Clean Architecture skills are highly sought after. Senior roles at top companies offer excellent compensation. Remote positions at US companies provide premium salaries for Indian developers."
          gradient="bg-gradient-to-r from-green-500 to-emerald-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Android Journey?"
          description="Get personalized guidance from experienced Android developers who have built successful apps."
          gradient="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"
        />
      </main>

      <Footer />
    </>
  );
}
