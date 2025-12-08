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
  Settings,
  TestTube,
  Rocket,
  Box,
  Shield
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
    title: 'Dart Fundamentals',
    icon: Code,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'Dart Basics',
        description: 'Learn the Dart language',
        topics: ['Variables', 'Data Types', 'Functions', 'Control Flow', 'Collections', 'Null Safety']
      },
      {
        id: 2,
        title: 'Object-Oriented Dart',
        description: 'OOP concepts in Dart',
        topics: ['Classes', 'Inheritance', 'Interfaces', 'Mixins', 'Extensions', 'Generics']
      },
      {
        id: 3,
        title: 'Async Programming',
        description: 'Handle async operations',
        topics: ['Futures', 'async/await', 'Streams', 'Isolates', 'Error Handling']
      }
    ],
    milestone: 'You know Dart!'
  },
  {
    title: 'Flutter Basics',
    icon: Smartphone,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 4,
        title: 'Flutter Setup',
        description: 'Development environment',
        topics: ['Flutter SDK', 'IDE Setup', 'Emulators', 'Project Structure', 'Hot Reload']
      },
      {
        id: 5,
        title: 'Widget Fundamentals',
        description: 'Understanding widgets',
        topics: ['Widget Tree', 'Stateless Widgets', 'Stateful Widgets', 'BuildContext', 'Keys']
      },
      {
        id: 6,
        title: 'Basic Widgets',
        description: 'Essential Flutter widgets',
        topics: ['Text', 'Container', 'Row/Column', 'Stack', 'ListView', 'Image']
      }
    ],
    milestone: 'You can create Flutter apps!'
  },
  {
    title: 'UI Development',
    icon: Palette,
    color: 'bg-purple-500',
    steps: [
      {
        id: 7,
        title: 'Layouts',
        description: 'Build complex layouts',
        topics: ['Flex', 'Expanded', 'SizedBox', 'Padding', 'Align', 'LayoutBuilder']
      },
      {
        id: 8,
        title: 'Material & Cupertino',
        description: 'Platform-specific design',
        topics: ['Material Design', 'Cupertino Widgets', 'Themes', 'Dark Mode', 'Adaptive Widgets']
      },
      {
        id: 9,
        title: 'Custom Widgets',
        description: 'Build reusable components',
        topics: ['Custom Widgets', 'Composition', 'InheritedWidget', 'Widget Testing']
      }
    ]
  },
  {
    title: 'Navigation',
    icon: Layers,
    color: 'bg-green-500',
    steps: [
      {
        id: 10,
        title: 'Navigation Basics',
        description: 'Screen navigation',
        topics: ['Navigator', 'Routes', 'Named Routes', 'Arguments', 'Return Data']
      },
      {
        id: 11,
        title: 'Advanced Navigation',
        description: 'Complex navigation patterns',
        topics: ['go_router', 'Deep Linking', 'Nested Navigation', 'Tab Navigation', 'Drawer']
      }
    ],
    milestone: 'You can build multi-screen apps!'
  },
  {
    title: 'State Management',
    icon: Zap,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 12,
        title: 'setState & Basics',
        description: 'Basic state management',
        topics: ['setState', 'Lifting State', 'InheritedWidget', 'State Lifecycle']
      },
      {
        id: 13,
        title: 'Provider',
        description: 'Popular state solution',
        topics: ['ChangeNotifier', 'Provider', 'Consumer', 'Selector', 'MultiProvider']
      },
      {
        id: 14,
        title: 'Advanced State',
        description: 'Other state solutions',
        topics: ['Riverpod', 'BLoC', 'GetX', 'MobX', 'State Architecture']
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
        title: 'HTTP & APIs',
        description: 'Fetch data from APIs',
        topics: ['http Package', 'Dio', 'REST APIs', 'JSON Serialization', 'Error Handling']
      },
      {
        id: 16,
        title: 'Advanced Networking',
        description: 'Complex scenarios',
        topics: ['Interceptors', 'Caching', 'Offline Support', 'WebSockets', 'GraphQL']
      }
    ]
  },
  {
    title: 'Local Storage',
    icon: Database,
    color: 'bg-orange-500',
    steps: [
      {
        id: 17,
        title: 'Data Persistence',
        description: 'Store data locally',
        topics: ['SharedPreferences', 'Hive', 'SQLite', 'Drift', 'File Storage']
      }
    ]
  },
  {
    title: 'Firebase',
    icon: Shield,
    color: 'bg-amber-500',
    steps: [
      {
        id: 18,
        title: 'Firebase Integration',
        description: 'Backend services',
        topics: ['Firebase Auth', 'Firestore', 'Cloud Storage', 'Push Notifications', 'Analytics']
      }
    ],
    milestone: 'You can build full-featured apps!'
  },
  {
    title: 'Animations',
    icon: Box,
    color: 'bg-pink-500',
    steps: [
      {
        id: 19,
        title: 'Flutter Animations',
        description: 'Create smooth animations',
        topics: ['Implicit Animations', 'Explicit Animations', 'AnimationController', 'Curves', 'Hero']
      },
      {
        id: 20,
        title: 'Advanced Animations',
        description: 'Complex animations',
        topics: ['CustomPainter', 'Rive', 'Lottie', 'Page Transitions', 'Physics Animations']
      }
    ]
  },
  {
    title: 'Testing',
    icon: TestTube,
    color: 'bg-teal-500',
    steps: [
      {
        id: 21,
        title: 'Flutter Testing',
        description: 'Test your apps',
        topics: ['Unit Tests', 'Widget Tests', 'Integration Tests', 'Mocking', 'Golden Tests']
      }
    ]
  },
  {
    title: 'Deployment',
    icon: Rocket,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 22,
        title: 'App Publishing',
        description: 'Release your apps',
        topics: ['App Signing', 'Play Store', 'App Store', 'CI/CD', 'Fastlane']
      },
      {
        id: 23,
        title: 'Production Ready',
        description: 'Polish for production',
        topics: ['Performance', 'App Size', 'Crashlytics', 'Analytics', 'Updates']
      }
    ],
    milestone: 'You are a professional Flutter Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$70K - $95K', avg: '$82K' },
  { level: 'Mid (2-5 yrs)', range: '$95K - $140K', avg: '$115K' },
  { level: 'Senior (5-8 yrs)', range: '$140K - $180K', avg: '$158K' },
  { level: 'Lead (8+ yrs)', range: '$180K - $230K+', avg: '$200K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹4L - ₹8L', avg: '₹6L' },
  { level: 'Junior (1-3 yrs)', range: '₹7L - ₹14L', avg: '₹10L' },
  { level: 'Mid (3-5 yrs)', range: '₹14L - ₹26L', avg: '₹19L' },
  { level: 'Senior (5+ yrs)', range: '₹26L - ₹50L+', avg: '₹35L' }
];

// Project Ideas
const projects = [
  {
    title: 'Todo App',
    level: 'Beginner' as const,
    description: 'Task manager with local storage',
    skills: ['Widgets', 'State', 'Hive', 'CRUD']
  },
  {
    title: 'Weather App',
    level: 'Beginner' as const,
    description: 'Fetch and display weather data',
    skills: ['HTTP', 'JSON', 'Location', 'UI']
  },
  {
    title: 'E-commerce App',
    level: 'Intermediate' as const,
    description: 'Shopping app with cart',
    skills: ['Provider', 'Navigation', 'API', 'Animations']
  },
  {
    title: 'Chat Application',
    level: 'Intermediate' as const,
    description: 'Real-time chat with Firebase',
    skills: ['Firebase', 'Auth', 'Firestore', 'Push Notifications']
  },
  {
    title: 'Social Media App',
    level: 'Advanced' as const,
    description: 'Feed, profiles, and messaging',
    skills: ['Complex State', 'Caching', 'Image Upload', 'Real-time']
  },
  {
    title: 'Fintech App',
    level: 'Advanced' as const,
    description: 'Banking or payment app',
    skills: ['Security', 'Biometrics', 'Charts', 'Animations']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to learn Flutter?',
    answer: 'With 3-4 hours daily, you can learn Flutter basics in 1-2 months. Building production-quality apps takes 3-4 months. Mastering state management, animations, and platform-specific features takes 6-9 months. Prior programming experience, especially with React, speeds up learning.'
  },
  {
    question: 'Flutter vs React Native - which should I learn?',
    answer: 'Flutter offers better performance and consistent UI across platforms. React Native has a larger ecosystem and is better if you know JavaScript/React. Flutter is growing faster and preferred for new cross-platform projects. Choose Flutter for performance, React Native for JavaScript familiarity.'
  },
  {
    question: 'Is Flutter good for production apps?',
    answer: 'Yes, Flutter is production-ready and used by Google, Alibaba, BMW, and thousands of companies. It offers excellent performance, beautiful UIs, and a single codebase for iOS and Android. The ecosystem is mature with packages for most needs.'
  },
  {
    question: 'Do I need to learn native iOS/Android development?',
    answer: 'Not required for most apps, but helpful. Understanding platform basics helps with native integrations, debugging, and performance optimization. Many Flutter apps need some platform-specific code. Learn Flutter first, then add native knowledge as needed.'
  },
  {
    question: 'Which state management should I learn?',
    answer: 'Start with Provider - it\'s simple and officially recommended. Then learn Riverpod (modern, type-safe) or BLoC (enterprise, scalable). GetX is popular but controversial. Most jobs accept any solution. Understanding state concepts matters more than the specific library.'
  },
  {
    question: 'Can Flutter be used for web and desktop?',
    answer: 'Yes, Flutter supports web, Windows, macOS, and Linux. However, web support is still maturing - consider alternatives for web-heavy apps. Desktop support is good for internal tools. Mobile remains Flutter\'s strongest platform.'
  },
  {
    question: 'Is Flutter in demand for jobs?',
    answer: 'Flutter demand is growing rapidly. Many companies prefer one codebase for mobile apps. Startups especially favor Flutter for speed. Salaries are competitive with native development. The job market is strong and expanding.'
  },
  {
    question: 'How do I get my first Flutter job?',
    answer: 'Build 3-5 apps showing different skills (API integration, state management, animations). Publish at least one to app stores. Use clean architecture. Write tests. Know Provider or Riverpod well. Prepare for questions on widgets, state, and Dart.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Android Developer',
    description: 'Native Android skills',
    href: '/roadmap/android',
    icon: Smartphone,
    color: 'bg-green-500'
  },
  {
    title: 'React Native',
    description: 'Alternative cross-platform',
    href: '/roadmap/react-native',
    icon: Code,
    color: 'bg-cyan-500'
  },
  {
    title: 'iOS Developer',
    description: 'Native iOS skills',
    href: '/roadmap/ios',
    icon: Smartphone,
    color: 'bg-gray-700'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Flutter Developer Roadmap 2026',
  description: 'Complete guide to becoming a Flutter Developer in 2026',
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

export default function FlutterRoadmapPage() {
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
          title="Flutter Developer Roadmap"
          description="Master Dart, widgets, state management, animations, Firebase, and app deployment. Your complete guide to becoming a professional Flutter Developer in 2026."
          duration="4-6 Months"
          difficulty="Beginner Friendly"
          accentColor="#02569B"
        />

        <WhatIsSection
          title="What is a Flutter Developer?"
          paragraphs={[
            'Flutter developers build cross-platform mobile applications using Google\'s Flutter framework and Dart programming language. They create beautiful, natively compiled apps for iOS and Android from a single codebase.',
            'As a Flutter developer, you will design responsive UIs, implement state management, integrate APIs and Firebase, handle animations, and deploy apps to both app stores.'
          ]}
          responsibilities={[
            'Build cross-platform mobile applications',
            'Design responsive and beautiful UIs',
            'Implement state management solutions',
            'Integrate REST APIs and Firebase',
            'Create smooth animations',
            'Write unit and widget tests',
            'Deploy to App Store and Play Store'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#02569B"
        />

        <SalarySection
          title="Flutter Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Flutter developers who can also work with native code (Kotlin/Swift) command higher salaries. Startups heavily favor Flutter for rapid development. Remote positions at US/EU companies offer excellent compensation."
          gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Flutter Journey?"
          description="Get personalized guidance from experienced Flutter developers who have built successful mobile apps."
          gradient="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500"
        />
      </main>

      <Footer />
    </>
  );
}
