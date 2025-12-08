'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Smartphone,
  Code,
  Layers,
  Database,
  Globe,
  Zap,
  Settings,
  TestTube,
  Rocket,
  Palette,
  Shield,
  Box
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

const roadmapStages: RoadmapStage[] = [
  {
    title: 'Programming Fundamentals',
    icon: Code,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'Core Programming',
        description: 'Essential programming concepts',
        topics: ['Variables & Data Types', 'Control Flow', 'Functions', 'OOP Concepts', 'Data Structures', 'Algorithms']
      },
      {
        id: 2,
        title: 'Language Choice',
        description: 'Pick your path',
        topics: ['JavaScript/TypeScript (React Native)', 'Dart (Flutter)', 'Kotlin (Android)', 'Swift (iOS)', 'Kotlin Multiplatform']
      }
    ],
    milestone: 'You have programming foundation!'
  },
  {
    title: 'Mobile Platform Basics',
    icon: Smartphone,
    color: 'bg-green-500',
    steps: [
      {
        id: 3,
        title: 'Platform Understanding',
        description: 'Know the ecosystems',
        topics: ['iOS vs Android', 'App Lifecycle', 'Platform Guidelines', 'App Store Rules', 'Device Fragmentation']
      },
      {
        id: 4,
        title: 'Development Environment',
        description: 'Set up your tools',
        topics: ['IDE Setup', 'Emulators/Simulators', 'Device Testing', 'Debug Tools', 'Hot Reload']
      }
    ]
  },
  {
    title: 'Cross-Platform Frameworks',
    icon: Layers,
    color: 'bg-purple-500',
    steps: [
      {
        id: 5,
        title: 'Flutter',
        description: 'Google\'s UI toolkit',
        topics: ['Dart Language', 'Widgets', 'State Management', 'Material/Cupertino', 'Platform Channels']
      },
      {
        id: 6,
        title: 'React Native',
        description: 'JavaScript framework',
        topics: ['React Fundamentals', 'Native Components', 'Navigation', 'Expo', 'Native Modules']
      },
      {
        id: 7,
        title: 'Kotlin Multiplatform',
        description: 'Shared business logic',
        topics: ['KMP Basics', 'Shared Code', 'Platform-Specific', 'Compose Multiplatform', 'Native UI Integration']
      }
    ],
    milestone: 'You can build cross-platform apps!'
  },
  {
    title: 'UI/UX Development',
    icon: Palette,
    color: 'bg-pink-500',
    steps: [
      {
        id: 8,
        title: 'Mobile UI Design',
        description: 'Build beautiful interfaces',
        topics: ['Responsive Layouts', 'Platform Conventions', 'Material Design', 'Human Interface Guidelines', 'Animations']
      },
      {
        id: 9,
        title: 'Navigation Patterns',
        description: 'App navigation',
        topics: ['Stack Navigation', 'Tab Navigation', 'Drawer', 'Deep Linking', 'Navigation State']
      }
    ]
  },
  {
    title: 'State Management',
    icon: Zap,
    color: 'bg-orange-500',
    steps: [
      {
        id: 10,
        title: 'State Solutions',
        description: 'Manage app state',
        topics: ['Local State', 'Global State', 'Provider/Riverpod', 'Redux/Zustand', 'BLoC Pattern']
      }
    ]
  },
  {
    title: 'Data & Networking',
    icon: Database,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 11,
        title: 'API Integration',
        description: 'Connect to backends',
        topics: ['REST APIs', 'GraphQL', 'WebSockets', 'Error Handling', 'Caching']
      },
      {
        id: 12,
        title: 'Local Storage',
        description: 'Store data locally',
        topics: ['SQLite', 'SharedPreferences', 'Secure Storage', 'File System', 'Offline Support']
      }
    ],
    milestone: 'You can build data-driven apps!'
  },
  {
    title: 'Native Features',
    icon: Settings,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 13,
        title: 'Device Features',
        description: 'Access native APIs',
        topics: ['Camera', 'Location', 'Push Notifications', 'Biometrics', 'Sensors', 'Bluetooth']
      },
      {
        id: 14,
        title: 'Platform Integration',
        description: 'Native capabilities',
        topics: ['Background Tasks', 'Widgets', 'App Extensions', 'Share Extensions', 'Siri/Google Assistant']
      }
    ]
  },
  {
    title: 'Testing & Quality',
    icon: TestTube,
    color: 'bg-teal-500',
    steps: [
      {
        id: 15,
        title: 'Mobile Testing',
        description: 'Test your apps',
        topics: ['Unit Testing', 'Widget Tests', 'Integration Tests', 'E2E Testing', 'Device Testing']
      },
      {
        id: 16,
        title: 'Performance',
        description: 'Optimize apps',
        topics: ['Profiling', 'Memory Management', 'Battery Optimization', 'App Size', 'Launch Time']
      }
    ]
  },
  {
    title: 'Security',
    icon: Shield,
    color: 'bg-red-500',
    steps: [
      {
        id: 17,
        title: 'App Security',
        description: 'Secure your apps',
        topics: ['Secure Storage', 'SSL Pinning', 'Code Obfuscation', 'Authentication', 'Data Encryption']
      }
    ]
  },
  {
    title: 'Deployment & CI/CD',
    icon: Rocket,
    color: 'bg-emerald-500',
    steps: [
      {
        id: 18,
        title: 'App Publishing',
        description: 'Release your apps',
        topics: ['App Signing', 'Play Store', 'App Store', 'Beta Testing', 'App Review Process']
      },
      {
        id: 19,
        title: 'CI/CD & Updates',
        description: 'Automated workflows',
        topics: ['Fastlane', 'GitHub Actions', 'CodePush', 'OTA Updates', 'Crash Reporting']
      }
    ],
    milestone: 'You are a Mobile App Developer!'
  }
];

const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$70K - $95K', avg: '$82K' },
  { level: 'Mid (2-5 yrs)', range: '$95K - $140K', avg: '$115K' },
  { level: 'Senior (5-8 yrs)', range: '$135K - $180K', avg: '$155K' },
  { level: 'Lead (8+ yrs)', range: '$170K - $230K+', avg: '$195K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹4L - ₹8L', avg: '₹6L' },
  { level: 'Junior (1-3 yrs)', range: '₹8L - ₹15L', avg: '₹11L' },
  { level: 'Mid (3-5 yrs)', range: '₹15L - ₹28L', avg: '₹20L' },
  { level: 'Senior (5+ yrs)', range: '₹28L - ₹50L+', avg: '₹38L' }
];

const projects = [
  { title: 'Todo App', level: 'Beginner' as const, description: 'Task manager with local storage', skills: ['UI Basics', 'State', 'Storage', 'CRUD'] },
  { title: 'Weather App', level: 'Beginner' as const, description: 'Weather data from API', skills: ['API Integration', 'Location', 'UI Design', 'Async'] },
  { title: 'E-commerce App', level: 'Intermediate' as const, description: 'Shopping experience', skills: ['Navigation', 'Cart', 'Payments', 'Authentication'] },
  { title: 'Social Media App', level: 'Intermediate' as const, description: 'Feed, profiles, messaging', skills: ['Real-time', 'Media Upload', 'Push Notifications'] },
  { title: 'Fintech App', level: 'Advanced' as const, description: 'Banking or payments', skills: ['Security', 'Biometrics', 'Offline', 'Encryption'] },
  { title: 'Health & Fitness', level: 'Advanced' as const, description: 'Health tracking app', skills: ['Sensors', 'Background Tasks', 'HealthKit/Fit', 'Charts'] }
];

const faqs = [
  {
    question: 'Flutter vs React Native - which should I learn?',
    answer: 'Both are excellent choices. Flutter offers better performance and consistent UI across platforms. React Native leverages JavaScript knowledge and has a larger ecosystem. Flutter is growing faster; React Native has more job listings currently. Choose based on your background - JavaScript developers may prefer React Native.'
  },
  {
    question: 'Should I learn native iOS/Android development?',
    answer: 'Cross-platform frameworks handle 90% of use cases. Native development is valuable for performance-critical apps, complex native integrations, or if you want to specialize in one platform. Many teams use cross-platform for most features and native for specific components.'
  },
  {
    question: 'How long does it take to become a mobile developer?',
    answer: 'With programming experience, 3-4 months for basic app development. Building production-quality apps takes 6-9 months. Mastering platform specifics, performance optimization, and deployment takes 1-2 years. Cross-platform skills transfer between frameworks.'
  },
  {
    question: 'Is mobile development a good career in 2026?',
    answer: 'Excellent career choice. Mobile usage continues growing, and every company needs mobile apps. Cross-platform development makes teams more efficient. The rise of Kotlin Multiplatform adds more options. Demand remains strong for skilled mobile developers.'
  },
  {
    question: 'Do I need a Mac for mobile development?',
    answer: 'For iOS development and App Store publishing, yes - Xcode only runs on macOS. For Android-only or React Native Android, you can use Windows/Linux. Flutter development works on any platform but iOS builds require a Mac. Consider cloud Mac services if needed.'
  },
  {
    question: 'What about PWAs vs native apps?',
    answer: 'PWAs are improving but native apps still offer better performance, offline capabilities, and access to device features. PWAs work well for simpler use cases. Most serious applications still require native/cross-platform development for full functionality.'
  },
  {
    question: 'How important is UI/UX knowledge?',
    answer: 'Critical. Mobile apps live or die by user experience. Understand platform conventions (Material Design, Human Interface Guidelines). Users expect polished, intuitive apps. Basic design skills differentiate good mobile developers from great ones.'
  },
  {
    question: 'How do I build a mobile developer portfolio?',
    answer: 'Publish 2-3 apps to app stores - even simple ones show you understand the full lifecycle. Include diverse projects showing different skills. Document your process and challenges solved. Open-source your code on GitHub. Show both iOS and Android versions.'
  }
];

const relatedRoadmaps = [
  { title: 'Flutter Developer', description: 'Cross-platform with Dart', href: '/roadmap/flutter', icon: Smartphone, color: 'bg-blue-500' },
  { title: 'React Native', description: 'JavaScript cross-platform', href: '/roadmap/react-native', icon: Layers, color: 'bg-cyan-500' },
  { title: 'iOS Developer', description: 'Native iOS development', href: '/roadmap/ios', icon: Smartphone, color: 'bg-gray-700' }
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Mobile App Developer Roadmap 2026',
  description: 'Complete guide to becoming a Mobile App Developer in 2026',
  author: { '@type': 'Organization', name: 'The Tutor Bridge' },
  publisher: { '@type': 'Organization', name: 'The Tutor Bridge' }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } }))
};

export default function MobileDeveloperRoadmapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <RoadmapHero
          title="Mobile App Developer Roadmap"
          description="Master Flutter, React Native, native development, cross-platform frameworks, and app deployment. Your complete guide to becoming a Mobile App Developer in 2026."
          duration="5-8 Months"
          difficulty="Intermediate"
          accentColor="#10B981"
        />
        <WhatIsSection
          title="What is a Mobile App Developer?"
          paragraphs={[
            'Mobile App Developers create applications for smartphones and tablets, building for iOS, Android, or both platforms using native or cross-platform technologies. They deliver engaging user experiences optimized for mobile devices.',
            'As a Mobile App Developer, you will design UIs, implement features, integrate APIs, handle data storage, optimize performance, and deploy apps to the App Store and Play Store.'
          ]}
          responsibilities={[
            'Build cross-platform or native mobile apps',
            'Design responsive and intuitive UIs',
            'Integrate REST APIs and backend services',
            'Implement local storage and offline support',
            'Handle push notifications and deep linking',
            'Optimize app performance and battery usage',
            'Deploy and maintain apps on app stores'
          ]}
        />
        <VisualRoadmapSection stages={roadmapStages} accentColor="#10B981" />
        <SalarySection
          title="Mobile App Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Cross-platform developers who can deliver iOS and Android apps from a single codebase are highly valued. Flutter and React Native skills are in high demand. Full-stack mobile developers who can also handle backend services command premium salaries."
          gradient="bg-gradient-to-r from-green-500 to-teal-500"
        />
        <ProjectsSection projects={projects} />
        <FAQSection faqs={faqs} />
        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />
        <CTASection
          title="Ready to Start Your Mobile Development Journey?"
          description="Get personalized guidance from experienced mobile developers who have built successful apps."
          gradient="bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500"
        />
      </main>
      <Footer />
    </>
  );
}
