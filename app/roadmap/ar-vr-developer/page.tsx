'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Glasses,
  Gamepad2,
  Box,
  Move3d,
  Headphones,
  Smartphone,
  Code,
  Palette,
  Cpu,
  Zap,
  Users,
  Globe
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
    title: 'Programming Foundation',
    icon: Code,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'Core Programming',
        description: 'Essential skills',
        topics: ['C# Fundamentals', 'Object-Oriented Programming', 'Data Structures', 'Design Patterns', 'Version Control']
      },
      {
        id: 2,
        title: '3D Math',
        description: 'Mathematical foundations',
        topics: ['Vectors & Matrices', 'Quaternions', 'Transformations', 'Coordinate Systems', 'Linear Algebra']
      }
    ],
    milestone: 'You have programming foundation!'
  },
  {
    title: '3D Development Basics',
    icon: Box,
    color: 'bg-purple-500',
    steps: [
      {
        id: 3,
        title: '3D Concepts',
        description: 'Understand 3D space',
        topics: ['3D Modeling Basics', 'Meshes & Textures', 'Materials & Shaders', 'Lighting', 'Cameras', 'Scene Hierarchy']
      },
      {
        id: 4,
        title: 'Physics & Animation',
        description: 'Movement and interaction',
        topics: ['Rigidbodies', 'Colliders', 'Raycasting', 'Keyframe Animation', 'Blend Trees', 'IK Systems']
      }
    ]
  },
  {
    title: 'Game Engine - Unity',
    icon: Gamepad2,
    color: 'bg-green-500',
    steps: [
      {
        id: 5,
        title: 'Unity Fundamentals',
        description: 'Most popular XR engine',
        topics: ['Unity Editor', 'GameObjects', 'Components', 'Prefabs', 'UI System', 'Input System']
      },
      {
        id: 6,
        title: 'Unity XR',
        description: 'XR development in Unity',
        topics: ['XR Interaction Toolkit', 'XR Plugin Management', 'OpenXR', 'Hand Tracking', 'Controller Input', 'Spatial Anchors']
      }
    ],
    milestone: 'You can build Unity XR apps!'
  },
  {
    title: 'Game Engine - Unreal',
    icon: Cpu,
    color: 'bg-orange-500',
    steps: [
      {
        id: 7,
        title: 'Unreal Engine Basics',
        description: 'High-fidelity graphics',
        topics: ['Unreal Editor', 'Blueprints', 'C++ Basics', 'Materials', 'Lighting', 'Landscape']
      },
      {
        id: 8,
        title: 'Unreal VR',
        description: 'VR in Unreal Engine',
        topics: ['VR Template', 'Motion Controllers', 'VR Locomotion', 'Interactions', 'Optimization', 'Packaging']
      }
    ]
  },
  {
    title: 'VR Development',
    icon: Glasses,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 9,
        title: 'VR Fundamentals',
        description: 'Core VR concepts',
        topics: ['VR Hardware', 'Tracking Systems', 'Field of View', 'Refresh Rates', 'Latency', 'Comfort & Safety']
      },
      {
        id: 10,
        title: 'VR Interaction Design',
        description: 'VR user experience',
        topics: ['Locomotion Methods', 'Grabbing & Throwing', 'UI in VR', 'Haptic Feedback', 'Gaze Interaction', 'Gesture Recognition']
      }
    ],
    milestone: 'You can build VR experiences!'
  },
  {
    title: 'AR Development',
    icon: Smartphone,
    color: 'bg-pink-500',
    steps: [
      {
        id: 11,
        title: 'Mobile AR',
        description: 'AR on phones',
        topics: ['ARKit (iOS)', 'ARCore (Android)', 'Plane Detection', 'Image Tracking', 'Object Detection', 'Light Estimation']
      },
      {
        id: 12,
        title: 'AR Features',
        description: 'Advanced AR',
        topics: ['Cloud Anchors', 'Persistent AR', 'Face Tracking', 'Body Tracking', 'Depth API', 'Geospatial API']
      }
    ]
  },
  {
    title: 'Platform Development',
    icon: Move3d,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 13,
        title: 'Meta Quest',
        description: 'Standalone VR',
        topics: ['Quest SDK', 'Hand Tracking', 'Passthrough', 'Mixed Reality', 'App Lab', 'Performance Optimization']
      },
      {
        id: 14,
        title: 'Apple Vision Pro',
        description: 'Spatial computing',
        topics: ['visionOS', 'RealityKit', 'SwiftUI 3D', 'Spatial Personas', 'SharePlay', 'Enterprise Features']
      }
    ],
    milestone: 'You know major platforms!'
  },
  {
    title: 'Spatial Audio & UX',
    icon: Headphones,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 15,
        title: 'Spatial Audio',
        description: '3D sound design',
        topics: ['3D Sound Positioning', 'HRTF', 'Room Acoustics', 'Ambisonic Audio', 'Audio Middleware', 'Voice Integration']
      },
      {
        id: 16,
        title: 'XR UX Design',
        description: 'Design for immersion',
        topics: ['Spatial UI', 'Comfort Guidelines', 'Accessibility', 'User Testing', 'Motion Sickness Prevention', 'Best Practices']
      }
    ]
  },
  {
    title: 'Performance & Optimization',
    icon: Zap,
    color: 'bg-red-500',
    steps: [
      {
        id: 17,
        title: 'Graphics Optimization',
        description: 'Maintain frame rate',
        topics: ['Draw Calls', 'Occlusion Culling', 'LOD Systems', 'Texture Atlasing', 'Shader Optimization', 'Baked Lighting']
      },
      {
        id: 18,
        title: 'Platform Optimization',
        description: 'Device-specific tuning',
        topics: ['Mobile GPU', 'Fixed Foveated Rendering', 'Dynamic Resolution', 'Memory Management', 'Thermal Throttling', 'Profiling Tools']
      }
    ]
  },
  {
    title: 'Multiplayer & Web XR',
    icon: Globe,
    color: 'bg-emerald-500',
    steps: [
      {
        id: 19,
        title: 'Multiplayer XR',
        description: 'Social experiences',
        topics: ['Networking Basics', 'Photon/Mirror', 'Avatar Systems', 'Voice Chat', 'Shared Spaces', 'Synchronization']
      },
      {
        id: 20,
        title: 'WebXR',
        description: 'Browser-based XR',
        topics: ['WebXR API', 'Three.js', 'A-Frame', 'Babylon.js', 'Web AR', 'Progressive Enhancement']
      }
    ],
    milestone: 'You are an AR/VR Developer!'
  }
];

const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$70K - $100K', avg: '$85K' },
  { level: 'Mid (2-5 yrs)', range: '$95K - $140K', avg: '$115K' },
  { level: 'Senior (5-8 yrs)', range: '$130K - $180K', avg: '$155K' },
  { level: 'Lead/Principal (8+ yrs)', range: '$170K - $250K+', avg: '$200K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹4L - ₹8L', avg: '₹6L' },
  { level: 'Junior (1-3 yrs)', range: '₹8L - ₹16L', avg: '₹12L' },
  { level: 'Mid (3-5 yrs)', range: '₹15L - ₹28L', avg: '₹20L' },
  { level: 'Senior (5+ yrs)', range: '₹25L - ₹50L+', avg: '₹36L' }
];

const projects = [
  { title: 'VR Room Escape', level: 'Beginner' as const, description: 'Simple puzzle room', skills: ['Grabbing', 'Teleportation', 'Triggers', 'UI'] },
  { title: 'AR Business Card', level: 'Beginner' as const, description: 'Image tracking demo', skills: ['ARCore/ARKit', 'Image Tracking', '3D Models', 'Animation'] },
  { title: 'VR Shooter', level: 'Intermediate' as const, description: 'Wave-based game', skills: ['Physics', 'AI', 'Haptics', 'Audio'] },
  { title: 'AR Interior Design', level: 'Intermediate' as const, description: 'Place furniture in AR', skills: ['Plane Detection', 'Object Placement', 'Scaling', 'Persistence'] },
  { title: 'Multiplayer VR Space', level: 'Advanced' as const, description: 'Social VR experience', skills: ['Networking', 'Avatars', 'Voice Chat', 'Synchronization'] },
  { title: 'Mixed Reality App', level: 'Advanced' as const, description: 'Quest passthrough experience', skills: ['Passthrough', 'Hand Tracking', 'Spatial Anchors', 'Scene Understanding'] }
];

const faqs = [
  {
    question: 'Unity or Unreal Engine for AR/VR development?',
    answer: 'Unity is more popular for XR (70%+ market share) with better mobile AR support and larger community. Unreal excels in high-fidelity graphics for PC VR and enterprise. Start with Unity - skills transfer to Unreal. Many studios use both.'
  },
  {
    question: 'How long does it take to become an AR/VR developer?',
    answer: 'With programming background, 4-6 months for basic XR development. Building polished experiences takes 9-12 months. Mastering optimization and platform-specific features takes 2+ years. The field evolves rapidly, requiring continuous learning.'
  },
  {
    question: 'Do I need a VR headset to learn VR development?',
    answer: 'Highly recommended but not strictly required initially. Start with simulators and 2D mode. Meta Quest 3 is excellent value for development. Eventually, you must test on real hardware - VR feel can\'t be simulated accurately.'
  },
  {
    question: 'Is AR/VR development a good career in 2026?',
    answer: 'Growing field with increasing opportunities. Apple Vision Pro validates spatial computing. Enterprise VR (training, collaboration) is expanding. AR in e-commerce and navigation is mainstream. Competition is lower than traditional development.'
  },
  {
    question: 'Should I focus on AR or VR?',
    answer: 'Learn both - skills overlap significantly. VR is more mature with established design patterns. AR has larger potential market (every smartphone). Mixed Reality (Quest, Vision Pro) blends both. Specializing comes later.'
  },
  {
    question: 'What programming languages do AR/VR developers use?',
    answer: 'C# (Unity) is most common. C++ for Unreal Engine. Swift for Apple platforms. JavaScript for WebXR. Some studios use Python for tools. Start with C# in Unity - it\'s the most versatile path.'
  },
  {
    question: 'How important is 3D art for AR/VR development?',
    answer: 'Understanding 3D concepts is essential. Creating professional art isn\'t required - many teams have dedicated artists. Learn to use asset stores and optimize models. Basic Blender skills help. Focus on interaction and programming.'
  },
  {
    question: 'How do I build an AR/VR portfolio?',
    answer: 'Publish to Meta App Lab, SideQuest, or itch.io. Record videos of your experiences. Document your process. Contribute to open-source XR projects. Show variety: games, tools, experiences. Quality over quantity - polish 2-3 projects well.'
  }
];

const relatedRoadmaps = [
  { title: 'Game Developer', description: 'Game development skills', href: '/roadmap/game-developer', icon: Gamepad2, color: 'bg-purple-500' },
  { title: 'Computer Vision', description: 'Visual AI for AR', href: '/roadmap/computer-vision', icon: Glasses, color: 'bg-cyan-500' },
  { title: 'Mobile Developer', description: 'AR on mobile', href: '/roadmap/mobile-developer', icon: Smartphone, color: 'bg-green-500' }
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AR/VR Developer Roadmap 2026',
  description: 'Complete guide to becoming an AR/VR Developer in 2026',
  author: { '@type': 'Organization', name: 'The Tutor Bridge' },
  publisher: { '@type': 'Organization', name: 'The Tutor Bridge' }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } }))
};

export default function ARVRDeveloperRoadmapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <RoadmapHero
          title="AR/VR Developer Roadmap"
          description="Master Unity, Unreal Engine, Meta Quest, Apple Vision Pro, spatial computing, and immersive experiences. Your complete guide to becoming an AR/VR Developer in 2026."
          duration="6-10 Months"
          difficulty="Intermediate"
          accentColor="#06B6D4"
        />
        <WhatIsSection
          title="What is an AR/VR Developer?"
          paragraphs={[
            'AR/VR Developers create immersive experiences using augmented and virtual reality technologies. They build applications for headsets like Meta Quest and Vision Pro, as well as mobile AR experiences for smartphones.',
            'As an AR/VR Developer, you will design 3D interactions, optimize for performance, implement spatial UI, and create engaging experiences that blend digital content with the real or virtual world.'
          ]}
          responsibilities={[
            'Build VR applications and games',
            'Create mobile AR experiences (ARKit/ARCore)',
            'Develop for Meta Quest and Apple Vision Pro',
            'Design spatial interactions and UI',
            'Optimize 3D performance for XR devices',
            'Implement hand tracking and gesture controls',
            'Create multiplayer XR experiences'
          ]}
        />
        <VisualRoadmapSection stages={roadmapStages} accentColor="#06B6D4" />
        <SalarySection
          title="AR/VR Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Enterprise XR (training, simulation) often pays higher than gaming. Apple Vision Pro expertise commands premium rates in 2026. Full-stack XR developers who can handle both Unity and web technologies are highly valued. Remote opportunities are common."
          gradient="bg-gradient-to-r from-cyan-500 to-blue-500"
        />
        <ProjectsSection projects={projects} />
        <FAQSection faqs={faqs} />
        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />
        <CTASection
          title="Ready to Start Your AR/VR Development Journey?"
          description="Get personalized guidance from experienced XR developers who have built immersive experiences."
          gradient="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
        />
      </main>
      <Footer />
    </>
  );
}
