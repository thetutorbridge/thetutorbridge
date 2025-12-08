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
    title: 'JavaScript Fundamentals',
    icon: Code,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 1,
        title: 'JavaScript Basics',
        description: 'Core JavaScript knowledge',
        topics: ['Variables', 'Functions', 'Arrays', 'Objects', 'ES6+', 'Async/Await']
      },
      {
        id: 2,
        title: 'TypeScript',
        description: 'Type-safe JavaScript',
        topics: ['Types', 'Interfaces', 'Generics', 'Type Guards', 'React with TS']
      }
    ],
    milestone: 'You know JavaScript!'
  },
  {
    title: 'React Fundamentals',
    icon: Layers,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 3,
        title: 'React Basics',
        description: 'Core React concepts',
        topics: ['JSX', 'Components', 'Props', 'State', 'Hooks', 'Lifecycle']
      },
      {
        id: 4,
        title: 'Advanced React',
        description: 'Advanced patterns',
        topics: ['Context', 'useReducer', 'Custom Hooks', 'Performance', 'Error Boundaries']
      }
    ]
  },
  {
    title: 'React Native Basics',
    icon: Smartphone,
    color: 'bg-blue-500',
    steps: [
      {
        id: 5,
        title: 'Getting Started',
        description: 'React Native setup',
        topics: ['Expo', 'React Native CLI', 'Project Structure', 'Metro Bundler', 'Debugging']
      },
      {
        id: 6,
        title: 'Core Components',
        description: 'Built-in components',
        topics: ['View', 'Text', 'Image', 'ScrollView', 'FlatList', 'TouchableOpacity']
      },
      {
        id: 7,
        title: 'Styling',
        description: 'Style your apps',
        topics: ['StyleSheet', 'Flexbox', 'Platform-specific', 'Responsive Design', 'Styled Components']
      }
    ],
    milestone: 'You can create React Native apps!'
  },
  {
    title: 'Navigation',
    icon: Settings,
    color: 'bg-green-500',
    steps: [
      {
        id: 8,
        title: 'React Navigation',
        description: 'App navigation',
        topics: ['Stack Navigator', 'Tab Navigator', 'Drawer', 'Deep Linking', 'Navigation State']
      },
      {
        id: 9,
        title: 'Advanced Navigation',
        description: 'Complex patterns',
        topics: ['Nested Navigators', 'Authentication Flow', 'Params', 'Custom Navigators']
      }
    ]
  },
  {
    title: 'State Management',
    icon: Zap,
    color: 'bg-purple-500',
    steps: [
      {
        id: 10,
        title: 'Local State',
        description: 'Component state',
        topics: ['useState', 'useReducer', 'Context', 'Prop Drilling', 'State Lifting']
      },
      {
        id: 11,
        title: 'Global State',
        description: 'App-wide state',
        topics: ['Redux Toolkit', 'Zustand', 'Jotai', 'MobX', 'React Query']
      }
    ]
  },
  {
    title: 'Networking',
    icon: Globe,
    color: 'bg-red-500',
    steps: [
      {
        id: 12,
        title: 'API Integration',
        description: 'Connect to backends',
        topics: ['Fetch', 'Axios', 'REST APIs', 'Error Handling', 'Loading States']
      },
      {
        id: 13,
        title: 'Advanced Networking',
        description: 'Complex scenarios',
        topics: ['React Query', 'SWR', 'WebSockets', 'GraphQL', 'Offline Support']
      }
    ],
    milestone: 'You can build data-driven apps!'
  },
  {
    title: 'Data Persistence',
    icon: Database,
    color: 'bg-orange-500',
    steps: [
      {
        id: 14,
        title: 'Local Storage',
        description: 'Store data locally',
        topics: ['AsyncStorage', 'MMKV', 'SQLite', 'Realm', 'Secure Storage']
      }
    ]
  },
  {
    title: 'Native Modules',
    icon: Box,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 15,
        title: 'Native Integration',
        description: 'Bridge to native',
        topics: ['Native Modules', 'Native UI Components', 'Turbo Modules', 'Fabric']
      },
      {
        id: 16,
        title: 'Device Features',
        description: 'Access device APIs',
        topics: ['Camera', 'Location', 'Push Notifications', 'Biometrics', 'Sensors']
      }
    ]
  },
  {
    title: 'UI & Animations',
    icon: Palette,
    color: 'bg-pink-500',
    steps: [
      {
        id: 17,
        title: 'Animations',
        description: 'Smooth animations',
        topics: ['Animated API', 'Reanimated', 'Gesture Handler', 'Layout Animations', 'Lottie']
      },
      {
        id: 18,
        title: 'UI Libraries',
        description: 'Component libraries',
        topics: ['React Native Paper', 'NativeBase', 'Tamagui', 'Custom Components']
      }
    ]
  },
  {
    title: 'Testing',
    icon: TestTube,
    color: 'bg-teal-500',
    steps: [
      {
        id: 19,
        title: 'Testing RN Apps',
        description: 'Test your apps',
        topics: ['Jest', 'React Testing Library', 'Detox', 'E2E Testing', 'Snapshot Testing']
      }
    ]
  },
  {
    title: 'Deployment',
    icon: Rocket,
    color: 'bg-emerald-500',
    steps: [
      {
        id: 20,
        title: 'App Publishing',
        description: 'Release your apps',
        topics: ['App Signing', 'Play Store', 'App Store', 'EAS Build', 'Fastlane']
      },
      {
        id: 21,
        title: 'CI/CD & Updates',
        description: 'Automated workflows',
        topics: ['EAS Update', 'CodePush', 'GitHub Actions', 'App Center']
      }
    ],
    milestone: 'You are a professional React Native Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$70K - $100K', avg: '$85K' },
  { level: 'Mid (2-5 yrs)', range: '$100K - $145K', avg: '$120K' },
  { level: 'Senior (5-8 yrs)', range: '$145K - $190K', avg: '$165K' },
  { level: 'Lead (8+ yrs)', range: '$180K - $250K+', avg: '$210K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹4L - ₹9L', avg: '₹6L' },
  { level: 'Junior (1-3 yrs)', range: '₹8L - ₹16L', avg: '₹12L' },
  { level: 'Mid (3-5 yrs)', range: '₹16L - ₹30L', avg: '₹22L' },
  { level: 'Senior (5+ yrs)', range: '₹28L - ₹50L+', avg: '₹38L' }
];

// Project Ideas
const projects = [
  {
    title: 'Todo App',
    level: 'Beginner' as const,
    description: 'Task manager with local storage',
    skills: ['Core Components', 'State', 'AsyncStorage', 'CRUD']
  },
  {
    title: 'Weather App',
    level: 'Beginner' as const,
    description: 'Weather data from API',
    skills: ['Networking', 'Location', 'UI', 'Loading States']
  },
  {
    title: 'E-commerce App',
    level: 'Intermediate' as const,
    description: 'Shopping app with cart',
    skills: ['Navigation', 'Redux', 'API', 'Animations']
  },
  {
    title: 'Chat Application',
    level: 'Intermediate' as const,
    description: 'Real-time messaging',
    skills: ['Firebase', 'WebSockets', 'Push Notifications', 'Media']
  },
  {
    title: 'Social Media App',
    level: 'Advanced' as const,
    description: 'Feed, stories, messaging',
    skills: ['Complex State', 'Performance', 'Native Modules', 'Animations']
  },
  {
    title: 'Fintech App',
    level: 'Advanced' as const,
    description: 'Banking or payment app',
    skills: ['Security', 'Biometrics', 'Charts', 'Offline Support']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to learn React Native?',
    answer: 'If you know React, you can learn React Native basics in 2-4 weeks. Without React knowledge, add 1-2 months for React fundamentals. Building production apps takes 3-4 months. Mastering navigation, state management, and native modules takes 6-9 months.'
  },
  {
    question: 'React Native vs Flutter - which is better?',
    answer: 'React Native is better if you know JavaScript/React and want web-mobile code sharing. Flutter offers better performance and more consistent UI. React Native has a larger ecosystem; Flutter has better documentation. Both are production-ready.'
  },
  {
    question: 'Expo vs React Native CLI - which should I use?',
    answer: 'Start with Expo - it\'s simpler and handles native configuration. Use Expo Go for quick iteration. Eject or use bare workflow when you need custom native modules. Many production apps use Expo. CLI is only needed for complex native integrations.'
  },
  {
    question: 'Is React Native still relevant in 2026?',
    answer: 'Yes, React Native powers apps for Meta, Microsoft, Shopify, and thousands of companies. The New Architecture (Fabric, Turbo Modules) improves performance significantly. JavaScript ecosystem advantages and web-mobile code sharing keep it relevant.'
  },
  {
    question: 'Can I share code between React Native and React web?',
    answer: 'Yes, business logic, hooks, and state management can be shared. UI components need platform-specific implementations. Tools like React Native Web allow more code sharing. Many teams share 60-80% of code between platforms.'
  },
  {
    question: 'Do I need to know native iOS/Android development?',
    answer: 'Not required for most apps. However, native knowledge helps when debugging, optimizing performance, or integrating native modules. Learn React Native first, add native skills as needed. Many React Native developers don\'t know native.'
  },
  {
    question: 'Which state management should I use?',
    answer: 'Start with React Context for simple apps. Use Redux Toolkit or Zustand for complex state. React Query for server state. Jotai for atomic state. Most teams use a combination. Redux is still most requested in job postings.'
  },
  {
    question: 'How do I get a React Native job?',
    answer: 'Build 3-5 apps showing different skills (API, navigation, animations). Publish at least one to app stores. Know React fundamentals well. Understand the bridge and performance optimization. Show TypeScript proficiency.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'React Developer',
    description: 'Foundation for RN',
    href: '/roadmap/react',
    icon: Layers,
    color: 'bg-cyan-500'
  },
  {
    title: 'Flutter Developer',
    description: 'Alternative cross-platform',
    href: '/roadmap/flutter',
    icon: Smartphone,
    color: 'bg-blue-500'
  },
  {
    title: 'JavaScript Developer',
    description: 'JS fundamentals',
    href: '/roadmap/javascript',
    icon: Code,
    color: 'bg-yellow-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'React Native Developer Roadmap 2026',
  description: 'Complete guide to becoming a React Native Developer in 2026',
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

export default function ReactNativeRoadmapPage() {
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
          title="React Native Developer Roadmap"
          description="Master JavaScript, React, navigation, state management, and cross-platform mobile development. Your complete guide to becoming a professional React Native Developer in 2026."
          duration="4-6 Months"
          difficulty="Intermediate"
          accentColor="#61DAFB"
        />

        <WhatIsSection
          title="What is a React Native Developer?"
          paragraphs={[
            'React Native developers build cross-platform mobile applications using JavaScript and React. They create apps that run on both iOS and Android from a single codebase, leveraging React\'s component-based architecture for mobile development.',
            'As a React Native developer, you will build mobile UIs, manage app state, integrate APIs, handle navigation, work with native modules, and deploy apps to both app stores.'
          ]}
          responsibilities={[
            'Build cross-platform mobile applications',
            'Design responsive mobile UIs',
            'Implement navigation and state management',
            'Integrate REST APIs and databases',
            'Work with native modules when needed',
            'Write unit and integration tests',
            'Deploy to App Store and Play Store'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#61DAFB"
        />

        <SalarySection
          title="React Native Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Full-stack JavaScript developers (React + React Native + Node.js) are highly valued. Companies appreciate developers who can work across web and mobile. Remote positions at US companies offer excellent compensation."
          gradient="bg-gradient-to-r from-cyan-500 to-blue-500"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your React Native Journey?"
          description="Get personalized guidance from experienced React Native developers who have built successful mobile apps."
          gradient="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500"
        />
      </main>

      <Footer />
    </>
  );
}
