'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Gamepad2,
  Code,
  Box,
  Palette,
  Zap,
  Users,
  Globe,
  Music,
  Shield,
  Rocket,
  Settings,
  Layers
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
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'Choose a Language',
        description: 'Pick your primary language',
        topics: ['C# (Unity)', 'C++ (Unreal)', 'GDScript (Godot)', 'Language Fundamentals', 'OOP Concepts']
      },
      {
        id: 2,
        title: 'Programming Fundamentals',
        description: 'Core programming skills',
        topics: ['Variables & Types', 'Control Flow', 'Functions', 'Classes & Objects', 'Data Structures']
      },
      {
        id: 3,
        title: 'Game Math',
        description: 'Essential math for games',
        topics: ['Vectors', 'Matrices', 'Trigonometry', 'Linear Algebra', 'Physics Math']
      }
    ],
    milestone: 'You have programming fundamentals!'
  },
  {
    title: 'Game Engine Basics',
    icon: Gamepad2,
    color: 'bg-purple-500',
    steps: [
      {
        id: 4,
        title: 'Choose an Engine',
        description: 'Select your game engine',
        topics: ['Unity', 'Unreal Engine', 'Godot', 'Engine Comparison', 'Installation & Setup']
      },
      {
        id: 5,
        title: 'Engine Fundamentals',
        description: 'Learn engine basics',
        topics: ['Editor Interface', 'Scene Management', 'GameObjects/Actors', 'Components', 'Prefabs']
      },
      {
        id: 6,
        title: 'Scripting',
        description: 'Game logic implementation',
        topics: ['Script Lifecycle', 'Input Handling', 'Game Events', 'Coroutines', 'State Machines']
      }
    ],
    milestone: 'You can use a game engine!'
  },
  {
    title: '2D Game Development',
    icon: Layers,
    color: 'bg-green-500',
    steps: [
      {
        id: 7,
        title: '2D Graphics',
        description: 'Sprites and animations',
        topics: ['Sprites', 'Sprite Sheets', '2D Animation', 'Tilemaps', 'Parallax Scrolling']
      },
      {
        id: 8,
        title: '2D Physics',
        description: '2D game mechanics',
        topics: ['Rigidbody 2D', 'Colliders', 'Raycasting', 'Triggers', 'Physics Materials']
      },
      {
        id: 9,
        title: '2D Game Types',
        description: 'Common 2D genres',
        topics: ['Platformers', 'Top-Down', 'Puzzle Games', 'Endless Runners', 'Fighting Games']
      }
    ],
    milestone: 'You can create 2D games!'
  },
  {
    title: '3D Game Development',
    icon: Box,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 10,
        title: '3D Graphics',
        description: '3D rendering basics',
        topics: ['3D Models', 'Materials', 'Textures', 'Lighting', 'Shaders Basics']
      },
      {
        id: 11,
        title: '3D Physics',
        description: '3D game mechanics',
        topics: ['Rigidbody 3D', '3D Colliders', 'Character Controller', 'Joints', 'Ragdoll']
      },
      {
        id: 12,
        title: 'Camera Systems',
        description: 'Camera control',
        topics: ['Camera Types', 'Follow Camera', 'Cinemachine', 'Camera Effects', 'Multiple Cameras']
      }
    ]
  },
  {
    title: 'Game Design',
    icon: Palette,
    color: 'bg-pink-500',
    steps: [
      {
        id: 13,
        title: 'Game Design Principles',
        description: 'Core design concepts',
        topics: ['Game Loops', 'Player Experience', 'Difficulty Curves', 'Feedback Systems', 'Reward Systems']
      },
      {
        id: 14,
        title: 'Level Design',
        description: 'Create engaging levels',
        topics: ['Level Layout', 'Pacing', 'Environmental Storytelling', 'Tutorials', 'Challenge Design']
      }
    ]
  },
  {
    title: 'UI & UX',
    icon: Settings,
    color: 'bg-orange-500',
    steps: [
      {
        id: 15,
        title: 'Game UI',
        description: 'User interface systems',
        topics: ['HUD Design', 'Menus', 'Inventory Systems', 'Health Bars', 'Dialogue Systems']
      },
      {
        id: 16,
        title: 'Player Experience',
        description: 'Polish and feel',
        topics: ['Screen Shake', 'Particles', 'Visual Feedback', 'Juice', 'Accessibility']
      }
    ],
    milestone: 'You can create polished games!'
  },
  {
    title: 'Audio',
    icon: Music,
    color: 'bg-red-500',
    steps: [
      {
        id: 17,
        title: 'Game Audio',
        description: 'Sound implementation',
        topics: ['Sound Effects', 'Background Music', 'Audio Managers', '3D Audio', 'Audio Mixing']
      }
    ]
  },
  {
    title: 'AI & NPCs',
    icon: Zap,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 18,
        title: 'Game AI',
        description: 'NPC behavior',
        topics: ['State Machines', 'Behavior Trees', 'Pathfinding', 'NavMesh', 'Enemy AI']
      },
      {
        id: 19,
        title: 'Advanced AI',
        description: 'Complex behaviors',
        topics: ['Group AI', 'Steering Behaviors', 'Decision Making', 'AI Optimization']
      }
    ]
  },
  {
    title: 'Multiplayer',
    icon: Users,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 20,
        title: 'Networking Basics',
        description: 'Multiplayer fundamentals',
        topics: ['Client-Server', 'Peer-to-Peer', 'Network Protocols', 'Latency', 'Synchronization']
      },
      {
        id: 21,
        title: 'Multiplayer Implementation',
        description: 'Build multiplayer games',
        topics: ['Photon', 'Mirror', 'Netcode', 'Lobby Systems', 'Matchmaking']
      }
    ]
  },
  {
    title: 'Optimization',
    icon: Shield,
    color: 'bg-teal-500',
    steps: [
      {
        id: 22,
        title: 'Performance',
        description: 'Game optimization',
        topics: ['Profiling', 'Memory Management', 'Draw Calls', 'LOD', 'Object Pooling']
      }
    ]
  },
  {
    title: 'Publishing',
    icon: Rocket,
    color: 'bg-emerald-500',
    steps: [
      {
        id: 23,
        title: 'Platform Publishing',
        description: 'Release your game',
        topics: ['Steam', 'App Store', 'Google Play', 'Console Publishing', 'Build Settings']
      },
      {
        id: 24,
        title: 'Marketing',
        description: 'Promote your game',
        topics: ['Trailers', 'Store Pages', 'Social Media', 'Press Kits', 'Community Building']
      }
    ],
    milestone: 'You are a professional Game Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Junior (0-2 yrs)', range: '$55K - $80K', avg: '$67K' },
  { level: 'Mid (2-5 yrs)', range: '$80K - $120K', avg: '$98K' },
  { level: 'Senior (5-8 yrs)', range: '$120K - $160K', avg: '$138K' },
  { level: 'Lead (8+ yrs)', range: '$150K - $200K+', avg: '$175K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹3L - ₹6L', avg: '₹4.5L' },
  { level: 'Junior (1-3 yrs)', range: '₹5L - ₹10L', avg: '₹7L' },
  { level: 'Mid (3-5 yrs)', range: '₹10L - ₹20L', avg: '₹14L' },
  { level: 'Senior (5+ yrs)', range: '₹20L - ₹40L+', avg: '₹28L' }
];

// Project Ideas
const projects = [
  {
    title: '2D Platformer',
    level: 'Beginner' as const,
    description: 'Classic side-scrolling platform game',
    skills: ['2D Physics', 'Animation', 'Level Design', 'Input']
  },
  {
    title: 'Space Shooter',
    level: 'Beginner' as const,
    description: 'Top-down or side-scrolling shooter',
    skills: ['Enemy AI', 'Spawning', 'Score System', 'Particles']
  },
  {
    title: 'RPG Inventory System',
    level: 'Intermediate' as const,
    description: 'Full inventory and item management',
    skills: ['UI Systems', 'Data Management', 'Drag & Drop', 'Save/Load']
  },
  {
    title: 'First Person Explorer',
    level: 'Intermediate' as const,
    description: '3D exploration game with interactions',
    skills: ['3D Movement', 'Raycasting', 'Interactions', 'Lighting']
  },
  {
    title: 'Multiplayer Arena',
    level: 'Advanced' as const,
    description: 'Online multiplayer combat game',
    skills: ['Networking', 'Synchronization', 'Matchmaking', 'Lag Compensation']
  },
  {
    title: 'Open World Adventure',
    level: 'Advanced' as const,
    description: 'Large-scale open world game',
    skills: ['Streaming', 'Quest Systems', 'NPC AI', 'Optimization']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to become a game developer?',
    answer: 'With 3-4 hours daily, you can make simple games in 2-3 months. Creating polished, complete games takes 6-12 months of practice. Becoming professionally employable typically requires 1-2 years of consistent learning and portfolio building with multiple completed projects.'
  },
  {
    question: 'Unity vs Unreal Engine - which should I learn?',
    answer: 'Unity (C#) is easier to learn, better for 2D and mobile games, and has more beginner resources. Unreal (C++) is preferred for AAA-quality 3D games and has better built-in graphics. Start with Unity if you\'re a beginner, consider Unreal if you\'re targeting high-end 3D games.'
  },
  {
    question: 'Do I need to know art to be a game developer?',
    answer: 'No, many game developers focus purely on programming. You can use free or purchased assets, collaborate with artists, or use procedural generation. However, understanding basic art principles helps with game design. Many studios have separate roles for programmers and artists.'
  },
  {
    question: 'Should I learn C++ or C# for game development?',
    answer: 'Start with C# - it\'s easier and Unity is more beginner-friendly. C++ is required for Unreal Engine and offers better performance, but has a steeper learning curve. Learn C++ later if you want to work at AAA studios or need maximum performance.'
  },
  {
    question: 'How important is math for game development?',
    answer: 'Basic algebra and trigonometry are essential for most games. Vectors and basic linear algebra are crucial for 3D games. You don\'t need to be a math expert, but understanding the basics of game math (vectors, dot products, transformations) is necessary for professional work.'
  },
  {
    question: 'Can I make games solo or do I need a team?',
    answer: 'Solo indie development is very common and many successful games were made by one person. Start solo to learn all aspects, then consider teaming up for larger projects. Use asset stores for art and sound if needed. Many successful indies handle programming while outsourcing other work.'
  },
  {
    question: 'Is game development a good career choice?',
    answer: 'Game development offers creative work but can be competitive and demanding. Salaries are often lower than other software fields. However, passion for games makes it rewarding. Consider mobile, indie, AAA, or gamification of other industries. Skills transfer well to simulation and VR/AR.'
  },
  {
    question: 'How do I build a game development portfolio?',
    answer: 'Complete 3-5 polished games of increasing complexity. Show variety (2D, 3D, different genres). Include playable demos, not just videos. Document your development process. Contribute to game jams. Quality matters more than quantity - one polished game beats ten prototypes.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Frontend Developer',
    description: 'Web UI skills for game UIs',
    href: '/roadmap/frontend-developer',
    icon: Globe,
    color: 'bg-blue-500'
  },
  {
    title: 'Python Developer',
    description: 'Scripting and tools',
    href: '/roadmap/python-developer',
    icon: Code,
    color: 'bg-yellow-500'
  },
  {
    title: 'System Design',
    description: 'Architecture for large games',
    href: '/roadmap/system-design',
    icon: Settings,
    color: 'bg-purple-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Game Developer Roadmap 2026',
  description: 'Complete guide to becoming a Game Developer in 2026',
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

export default function GameDeveloperRoadmapPage() {
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
          title="Game Developer Roadmap"
          description="Master game engines, programming, graphics, physics, AI, and multiplayer. Your complete guide to becoming a professional Game Developer in 2026."
          duration="6-12 Months"
          difficulty="Intermediate"
          accentColor="#9333EA"
        />

        <WhatIsSection
          title="What is a Game Developer?"
          paragraphs={[
            'Game developers create interactive entertainment experiences using game engines, programming, and creative skills. They bring virtual worlds to life, designing gameplay mechanics, implementing graphics, and crafting player experiences.',
            'As a game developer, you will work with game engines like Unity or Unreal, write game logic, implement physics and AI, design levels, and optimize performance to create engaging games for various platforms.'
          ]}
          responsibilities={[
            'Develop game mechanics and systems',
            'Implement graphics and visual effects',
            'Create AI for NPCs and enemies',
            'Build user interfaces and menus',
            'Optimize game performance',
            'Implement multiplayer features',
            'Debug and test gameplay'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#9333EA"
        />

        <SalarySection
          title="Game Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Game developer salaries vary widely by studio type. AAA studios pay more but demand more hours. Indie and mobile game developers have different compensation structures. VR/AR and simulation industries often pay better than traditional gaming."
          gradient="bg-gradient-to-r from-purple-500 to-pink-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Game Development Journey?"
          description="Get personalized guidance from experienced game developers who have shipped successful titles."
          gradient="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
        />
      </main>

      <Footer />
    </>
  );
}
