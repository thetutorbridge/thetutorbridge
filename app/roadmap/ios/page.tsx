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
  TestTube,
  Rocket,
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

// Roadmap Stages Data
const roadmapStages: RoadmapStage[] = [
  {
    title: 'Swift Fundamentals',
    icon: Code,
    color: 'bg-orange-500',
    steps: [
      {
        id: 1,
        title: 'Swift Basics',
        description: 'Learn the Swift language',
        topics: ['Variables', 'Types', 'Control Flow', 'Functions', 'Optionals', 'Collections']
      },
      {
        id: 2,
        title: 'Object-Oriented Swift',
        description: 'OOP in Swift',
        topics: ['Classes', 'Structs', 'Enums', 'Protocols', 'Extensions', 'Generics']
      },
      {
        id: 3,
        title: 'Advanced Swift',
        description: 'Advanced language features',
        topics: ['Closures', 'Error Handling', 'Memory Management', 'ARC', 'Property Wrappers']
      }
    ],
    milestone: 'You know Swift!'
  },
  {
    title: 'iOS Fundamentals',
    icon: Smartphone,
    color: 'bg-blue-500',
    steps: [
      {
        id: 4,
        title: 'Xcode & Setup',
        description: 'Development environment',
        topics: ['Xcode', 'Simulator', 'Project Structure', 'Build Settings', 'Debugging']
      },
      {
        id: 5,
        title: 'App Lifecycle',
        description: 'Understand iOS apps',
        topics: ['App States', 'Scene Lifecycle', 'View Lifecycle', 'Background Modes']
      }
    ]
  },
  {
    title: 'SwiftUI',
    icon: Palette,
    color: 'bg-purple-500',
    steps: [
      {
        id: 6,
        title: 'SwiftUI Basics',
        description: 'Declarative UI framework',
        topics: ['Views', 'Modifiers', 'Stacks', 'State', '@Binding', 'Preview']
      },
      {
        id: 7,
        title: 'SwiftUI Layouts',
        description: 'Complex layouts',
        topics: ['GeometryReader', 'LazyStacks', 'Grids', 'ScrollView', 'Custom Layouts']
      },
      {
        id: 8,
        title: 'SwiftUI Advanced',
        description: 'Advanced SwiftUI patterns',
        topics: ['@StateObject', '@ObservedObject', '@EnvironmentObject', 'Preferences', 'ViewBuilder']
      }
    ],
    milestone: 'You can build SwiftUI apps!'
  },
  {
    title: 'UIKit',
    icon: Layers,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 9,
        title: 'UIKit Fundamentals',
        description: 'Traditional iOS UI',
        topics: ['UIViewController', 'UIView', 'Storyboards', 'Auto Layout', 'UITableView']
      },
      {
        id: 10,
        title: 'UIKit Advanced',
        description: 'Complex UIKit patterns',
        topics: ['UICollectionView', 'Custom Views', 'Animations', 'Gestures', 'UIKit + SwiftUI']
      }
    ]
  },
  {
    title: 'Navigation',
    icon: Settings,
    color: 'bg-green-500',
    steps: [
      {
        id: 11,
        title: 'Navigation Patterns',
        description: 'App navigation',
        topics: ['NavigationStack', 'TabView', 'Sheet', 'Deep Links', 'Coordinator Pattern']
      }
    ]
  },
  {
    title: 'Data & State',
    icon: Database,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 12,
        title: 'Data Persistence',
        description: 'Store data locally',
        topics: ['UserDefaults', 'File System', 'Core Data', 'SwiftData', 'Keychain']
      },
      {
        id: 13,
        title: 'State Management',
        description: 'Manage app state',
        topics: ['Combine', 'Observation', 'MVVM', 'TCA', 'Redux-like Patterns']
      }
    ]
  },
  {
    title: 'Networking',
    icon: Globe,
    color: 'bg-red-500',
    steps: [
      {
        id: 14,
        title: 'Networking',
        description: 'API integration',
        topics: ['URLSession', 'Async/Await', 'JSON Decoding', 'Error Handling', 'Alamofire']
      },
      {
        id: 15,
        title: 'Advanced Networking',
        description: 'Complex scenarios',
        topics: ['Caching', 'Image Loading', 'WebSockets', 'Background Downloads']
      }
    ],
    milestone: 'You can build data-driven apps!'
  },
  {
    title: 'Concurrency',
    icon: Zap,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 16,
        title: 'Swift Concurrency',
        description: 'Modern async programming',
        topics: ['async/await', 'Tasks', 'Actors', 'MainActor', 'TaskGroups']
      },
      {
        id: 17,
        title: 'Combine Framework',
        description: 'Reactive programming',
        topics: ['Publishers', 'Subscribers', 'Operators', 'Subjects', 'Combine with SwiftUI']
      }
    ]
  },
  {
    title: 'Testing',
    icon: TestTube,
    color: 'bg-teal-500',
    steps: [
      {
        id: 18,
        title: 'iOS Testing',
        description: 'Test your apps',
        topics: ['XCTest', 'Unit Testing', 'UI Testing', 'Mocking', 'TDD']
      }
    ]
  },
  {
    title: 'App Store & DevOps',
    icon: Rocket,
    color: 'bg-pink-500',
    steps: [
      {
        id: 19,
        title: 'App Distribution',
        description: 'Release your apps',
        topics: ['Certificates', 'Provisioning', 'TestFlight', 'App Store Connect', 'App Review']
      },
      {
        id: 20,
        title: 'CI/CD',
        description: 'Automated workflows',
        topics: ['Fastlane', 'GitHub Actions', 'Xcode Cloud', 'Automated Testing']
      }
    ],
    milestone: 'You are a professional iOS Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$80K - $110K', avg: '$95K' },
  { level: 'Mid (2-5 yrs)', range: '$110K - $160K', avg: '$135K' },
  { level: 'Senior (5-8 yrs)', range: '$160K - $210K', avg: '$182K' },
  { level: 'Lead (8+ yrs)', range: '$200K - $280K+', avg: '$235K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹5L - ₹10L', avg: '₹7L' },
  { level: 'Junior (1-3 yrs)', range: '₹10L - ₹18L', avg: '₹13L' },
  { level: 'Mid (3-5 yrs)', range: '₹18L - ₹32L', avg: '₹24L' },
  { level: 'Senior (5+ yrs)', range: '₹32L - ₹55L+', avg: '₹42L' }
];

// Project Ideas
const projects = [
  {
    title: 'Todo App',
    level: 'Beginner' as const,
    description: 'Task manager with SwiftUI',
    skills: ['SwiftUI', 'State', 'Core Data', 'CRUD']
  },
  {
    title: 'Weather App',
    level: 'Beginner' as const,
    description: 'Weather data from API',
    skills: ['Networking', 'JSON', 'Location', 'UI']
  },
  {
    title: 'Social Media App',
    level: 'Intermediate' as const,
    description: 'Feed, profiles, posts',
    skills: ['Firebase', 'Authentication', 'Image Upload', 'Real-time']
  },
  {
    title: 'E-commerce App',
    level: 'Intermediate' as const,
    description: 'Shopping experience',
    skills: ['Navigation', 'Cart', 'Payments', 'Animations']
  },
  {
    title: 'Fitness Tracker',
    level: 'Advanced' as const,
    description: 'Health and fitness app',
    skills: ['HealthKit', 'Charts', 'Widgets', 'Notifications']
  },
  {
    title: 'Productivity Suite',
    level: 'Advanced' as const,
    description: 'Notes, calendar, tasks',
    skills: ['CloudKit', 'Sync', 'Extensions', 'Siri Shortcuts']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to learn iOS development?',
    answer: 'With 3-4 hours daily, you can learn Swift and SwiftUI basics in 2-3 months. Building production-quality apps takes 4-6 months. Mastering both SwiftUI and UIKit, plus architecture patterns, takes 8-12 months of practice.'
  },
  {
    question: 'SwiftUI vs UIKit - which should I learn first?',
    answer: 'Start with SwiftUI - it\'s the future of iOS development and easier to learn. However, UIKit knowledge is still valuable for existing codebases and certain complex UIs. Learn SwiftUI first, then add UIKit for career versatility.'
  },
  {
    question: 'Do I need a Mac for iOS development?',
    answer: 'Yes, Xcode only runs on macOS. You need a Mac (MacBook, iMac, Mac mini) to develop iOS apps. Hackintosh is possible but not recommended. Consider a used Mac or Mac mini for budget options. No Windows alternatives exist.'
  },
  {
    question: 'Is iOS development in demand?',
    answer: 'Yes, iOS developers are well-compensated and in demand. While Android has more users globally, iOS users spend more on apps. Companies need iOS apps, especially in US/EU markets. Demand remains strong despite cross-platform options.'
  },
  {
    question: 'iOS vs cross-platform (Flutter/React Native)?',
    answer: 'Native iOS offers best performance, full API access, and latest features first. Cross-platform is more efficient for teams with limited resources. Learn native iOS for career depth; add cross-platform optionally. Native skills are always valuable.'
  },
  {
    question: 'Do I need to pay $99/year to learn iOS?',
    answer: 'No, you can learn and test on simulator for free. The $99/year Apple Developer Program is only required to publish to App Store or test on physical devices. You can develop extensively before needing to pay.'
  },
  {
    question: 'What architecture should I use?',
    answer: 'Start with MVVM - it\'s most common and works well with SwiftUI. Consider TCA (The Composable Architecture) for complex apps. MVC is fine for simple apps but doesn\'t scale well. Learn MVVM thoroughly before exploring alternatives.'
  },
  {
    question: 'How do I get my first iOS job?',
    answer: 'Build 3-5 published apps demonstrating different skills. Show SwiftUI, networking, and persistence. Know both SwiftUI and UIKit. Understand app lifecycle and memory management. Prepare for coding challenges in Swift during interviews.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Android Developer',
    description: 'Other mobile platform',
    href: '/roadmap/android',
    icon: Smartphone,
    color: 'bg-green-500'
  },
  {
    title: 'Flutter Developer',
    description: 'Cross-platform option',
    href: '/roadmap/flutter',
    icon: Code,
    color: 'bg-cyan-500'
  },
  {
    title: 'React Native',
    description: 'JavaScript cross-platform',
    href: '/roadmap/react-native',
    icon: Layers,
    color: 'bg-blue-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'iOS Developer Roadmap 2026',
  description: 'Complete guide to becoming an iOS Developer in 2026',
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

export default function IOSRoadmapPage() {
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
          title="iOS Developer Roadmap"
          description="Master Swift, SwiftUI, UIKit, Core Data, networking, and App Store deployment. Your complete guide to becoming a professional iOS Developer in 2026."
          duration="5-8 Months"
          difficulty="Intermediate"
          accentColor="#147EFB"
        />

        <WhatIsSection
          title="What is an iOS Developer?"
          paragraphs={[
            'iOS developers create applications for Apple\'s iPhone and iPad using Swift and Apple\'s development frameworks. They build native apps that integrate seamlessly with Apple\'s ecosystem, providing users with premium mobile experiences.',
            'As an iOS developer, you will design UIs with SwiftUI, handle data persistence with Core Data, integrate APIs, implement authentication, and publish apps to the App Store.'
          ]}
          responsibilities={[
            'Build native iOS applications with Swift',
            'Design UIs with SwiftUI and UIKit',
            'Implement data persistence and networking',
            'Integrate Apple frameworks (HealthKit, CloudKit)',
            'Write unit and UI tests',
            'Optimize app performance',
            'Publish and maintain apps on App Store'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#147EFB"
        />

        <SalarySection
          title="iOS Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="iOS developers typically earn more than Android developers due to smaller talent pool and high-value user base. FAANG companies and fintech pay premium salaries. Remote positions at US companies offer excellent compensation."
          gradient="bg-gradient-to-r from-blue-500 to-indigo-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your iOS Journey?"
          description="Get personalized guidance from experienced iOS developers who have built successful App Store apps."
          gradient="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
        />
      </main>

      <Footer />
    </>
  );
}
