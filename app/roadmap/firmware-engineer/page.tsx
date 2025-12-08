'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Cpu,
  HardDrive,
  Code,
  Zap,
  Layers,
  Settings,
  Shield,
  RefreshCw,
  TestTube,
  Wrench,
  Binary,
  CircuitBoard
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
        title: 'Embedded C Mastery',
        description: 'The core language',
        topics: ['Pointers & Arrays', 'Bit Operations', 'Volatile & Const', 'Memory Models', 'Inline Assembly', 'Compiler Behavior']
      },
      {
        id: 2,
        title: 'Low-Level Concepts',
        description: 'Understand the machine',
        topics: ['Stack & Heap', 'Memory Layout', 'Calling Conventions', 'ABI', 'Endianness', 'Alignment']
      }
    ],
    milestone: 'You have C mastery!'
  },
  {
    title: 'Hardware Understanding',
    icon: CircuitBoard,
    color: 'bg-green-500',
    steps: [
      {
        id: 3,
        title: 'Digital Electronics',
        description: 'Hardware basics',
        topics: ['Logic Levels', 'Timing Analysis', 'Pull-up/Pull-down', 'Decoupling', 'Signal Integrity', 'Reading Schematics']
      },
      {
        id: 4,
        title: 'MCU Architecture',
        description: 'Processor internals',
        topics: ['CPU Pipeline', 'Bus Architecture', 'Memory Types', 'Clock Tree', 'Reset Circuit', 'Power Domains']
      }
    ]
  },
  {
    title: 'Startup & Bootloader',
    icon: HardDrive,
    color: 'bg-purple-500',
    steps: [
      {
        id: 5,
        title: 'Startup Code',
        description: 'Boot sequence',
        topics: ['Reset Vector', 'Stack Setup', 'BSS/Data Init', 'Linker Scripts', 'Scatter Loading', 'C Runtime']
      },
      {
        id: 6,
        title: 'Bootloader Development',
        description: 'Build bootloaders',
        topics: ['Bootloader Architecture', 'Memory Partitioning', 'Image Verification', 'Jump to App', 'Dual Bank', 'Recovery Mode']
      }
    ],
    milestone: 'You understand boot process!'
  },
  {
    title: 'Peripheral Drivers',
    icon: Zap,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 7,
        title: 'Register-Level Programming',
        description: 'Direct hardware access',
        topics: ['Memory-Mapped I/O', 'Register Access', 'Bit-Band', 'Hardware Abstraction', 'Driver Architecture', 'ISR Design']
      },
      {
        id: 8,
        title: 'Communication Peripherals',
        description: 'Interface protocols',
        topics: ['UART Driver', 'SPI Master/Slave', 'I2C Implementation', 'DMA Transfers', 'CAN Stack', 'USB Device']
      }
    ]
  },
  {
    title: 'Hardware Abstraction Layer',
    icon: Layers,
    color: 'bg-orange-500',
    steps: [
      {
        id: 9,
        title: 'HAL Design',
        description: 'Portable firmware',
        topics: ['Abstraction Patterns', 'API Design', 'Platform Independence', 'Configuration', 'Dependency Injection', 'Callbacks']
      },
      {
        id: 10,
        title: 'BSP Development',
        description: 'Board support packages',
        topics: ['BSP Architecture', 'Pin Multiplexing', 'Clock Configuration', 'Power Management', 'Board Init', 'Factory Defaults']
      }
    ],
    milestone: 'You can build portable firmware!'
  },
  {
    title: 'Interrupt & Timing',
    icon: Settings,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 11,
        title: 'Interrupt Handling',
        description: 'Real-time response',
        topics: ['NVIC Configuration', 'Priority Schemes', 'Nested Interrupts', 'Critical Sections', 'Deferred Processing', 'ISR Best Practices']
      },
      {
        id: 12,
        title: 'Timing Systems',
        description: 'Time management',
        topics: ['Timer Configuration', 'Tick Systems', 'PWM Generation', 'Input Capture', 'Watchdog', 'RTC']
      }
    ]
  },
  {
    title: 'Memory Management',
    icon: Binary,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 13,
        title: 'Memory Optimization',
        description: 'Efficient memory use',
        topics: ['Memory Pools', 'Static Allocation', 'Fragmentation', 'Memory Protection', 'MPU Configuration', 'Stack Monitoring']
      },
      {
        id: 14,
        title: 'Flash Programming',
        description: 'Non-volatile storage',
        topics: ['Flash Architecture', 'Wear Leveling', 'Flash File Systems', 'EEPROM Emulation', 'Checksum/CRC', 'Data Integrity']
      }
    ]
  },
  {
    title: 'Firmware Update',
    icon: RefreshCw,
    color: 'bg-pink-500',
    steps: [
      {
        id: 15,
        title: 'OTA Updates',
        description: 'Over-the-air updates',
        topics: ['Update Architecture', 'Image Download', 'Verification', 'Rollback', 'Delta Updates', 'Version Management']
      },
      {
        id: 16,
        title: 'Update Security',
        description: 'Secure updates',
        topics: ['Code Signing', 'Encryption', 'Secure Boot Chain', 'Anti-Rollback', 'Key Management', 'Provisioning']
      }
    ],
    milestone: 'You can build update systems!'
  },
  {
    title: 'Testing & Debugging',
    icon: TestTube,
    color: 'bg-teal-500',
    steps: [
      {
        id: 17,
        title: 'Debugging Techniques',
        description: 'Find bugs efficiently',
        topics: ['JTAG/SWD', 'Trace (ETM/ITM)', 'printf Debugging', 'Logic Analyzer', 'Hard Fault Analysis', 'Memory Corruption']
      },
      {
        id: 18,
        title: 'Firmware Testing',
        description: 'Quality assurance',
        topics: ['Unit Testing', 'Mocking Hardware', 'Integration Testing', 'Static Analysis', 'Code Review', 'CI/CD']
      }
    ]
  },
  {
    title: 'Security & Compliance',
    icon: Shield,
    color: 'bg-red-500',
    steps: [
      {
        id: 19,
        title: 'Firmware Security',
        description: 'Secure firmware',
        topics: ['Secure Boot', 'TrustZone', 'Hardware Security', 'Secure Storage', 'Side-Channel Attacks', 'Tamper Protection']
      },
      {
        id: 20,
        title: 'Industry Standards',
        description: 'Compliance & quality',
        topics: ['MISRA C', 'ISO 26262', 'IEC 62443', 'DO-178C', 'Medical Standards', 'Documentation']
      }
    ],
    milestone: 'You are a Firmware Engineer!'
  }
];

const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$75K - $100K', avg: '$87K' },
  { level: 'Mid (2-5 yrs)', range: '$95K - $135K', avg: '$115K' },
  { level: 'Senior (5-8 yrs)', range: '$130K - $175K', avg: '$150K' },
  { level: 'Principal (8+ yrs)', range: '$165K - $220K+', avg: '$190K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹4L - ₹8L', avg: '₹6L' },
  { level: 'Junior (1-3 yrs)', range: '₹8L - ₹16L', avg: '₹12L' },
  { level: 'Mid (3-5 yrs)', range: '₹16L - ₹30L', avg: '₹22L' },
  { level: 'Senior (5+ yrs)', range: '₹28L - ₹50L+', avg: '₹38L' }
];

const projects = [
  { title: 'Bare Metal Blinky', level: 'Beginner' as const, description: 'LED without HAL libraries', skills: ['Registers', 'Linker Scripts', 'Startup', 'Makefile'] },
  { title: 'Custom UART Driver', level: 'Beginner' as const, description: 'Full UART implementation', skills: ['UART Protocol', 'Interrupts', 'Ring Buffer', 'DMA'] },
  { title: 'Bootloader', level: 'Intermediate' as const, description: 'Custom bootloader with update', skills: ['Flash Programming', 'Image Verification', 'Jump Code', 'Dual Bank'] },
  { title: 'USB Device Stack', level: 'Intermediate' as const, description: 'USB CDC implementation', skills: ['USB Protocol', 'Descriptors', 'Endpoints', 'Enumeration'] },
  { title: 'Secure OTA System', level: 'Advanced' as const, description: 'Encrypted firmware updates', skills: ['Cryptography', 'Secure Boot', 'Rollback', 'Delta Updates'] },
  { title: 'RTOS Port', level: 'Advanced' as const, description: 'Port FreeRTOS to new MCU', skills: ['Context Switch', 'Tick Handler', 'MPU', 'HAL Integration'] }
];

const faqs = [
  {
    question: 'What is the difference between firmware and embedded software?',
    answer: 'Firmware traditionally refers to low-level code stored in flash/ROM that interfaces directly with hardware. Embedded software is broader, including applications running on embedded systems. In practice, terms overlap significantly. Firmware implies more hardware-focused, lower-level work.'
  },
  {
    question: 'How long does it take to become a firmware engineer?',
    answer: 'With programming background, 6-12 months for basic firmware skills. Deep expertise in bootloaders, security, and compliance takes 2-3 years. Mastering specific domains (automotive, medical) adds another 1-2 years. Continuous learning is essential as hardware evolves.'
  },
  {
    question: 'Is firmware engineering harder than software engineering?',
    answer: 'Different challenges, not necessarily harder. Firmware requires understanding hardware, timing constraints, and limited resources. Debugging is more complex. However, systems are typically smaller and more deterministic. Both require solid engineering skills.'
  },
  {
    question: 'What MCU should I learn for firmware development?',
    answer: 'ARM Cortex-M family is most common (STM32, NXP). Start with STM32F4 - excellent documentation and community. ESP32 for IoT projects. AVR is simpler for beginners. Eventually learn multiple architectures as jobs vary.'
  },
  {
    question: 'Do firmware engineers need to know assembly?',
    answer: 'Basic assembly is valuable for debugging and startup code. You won\'t write much assembly but must read it to understand compiler output, optimize critical sections, and debug hard faults. ARM assembly is most relevant today.'
  },
  {
    question: 'Is firmware engineering a good career in 2026?',
    answer: 'Excellent career. IoT, automotive (EVs, ADAS), medical devices, and consumer electronics drive demand. Firmware skills are specialized and harder to offshore. Security requirements create new opportunities. Shortage of experienced engineers continues.'
  },
  {
    question: 'What tools do firmware engineers use?',
    answer: 'IDEs (Keil, IAR, STM32CubeIDE), debuggers (J-Link, ST-Link), oscilloscopes, logic analyzers, version control (Git), static analyzers (PC-lint, Polyspace), and build systems (Make, CMake). Specific tools vary by company and project.'
  },
  {
    question: 'How do I transition from software to firmware engineering?',
    answer: 'Learn C deeply - especially pointers and memory. Get a development board (STM32 Nucleo). Study MCU architecture and peripherals. Practice register-level programming. Build projects without HAL libraries. Read datasheets. The transition takes 6-12 months of dedicated practice.'
  }
];

const relatedRoadmaps = [
  { title: 'Embedded Systems', description: 'Broader embedded focus', href: '/roadmap/embedded-systems', icon: Cpu, color: 'bg-purple-500' },
  { title: 'C++', description: 'Systems programming', href: '/roadmap/cpp', icon: Code, color: 'bg-blue-500' },
  { title: 'Linux', description: 'Linux internals', href: '/roadmap/linux', icon: Settings, color: 'bg-gray-700' }
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Firmware Engineer Roadmap 2026',
  description: 'Complete guide to becoming a Firmware Engineer in 2026',
  author: { '@type': 'Organization', name: 'The Tutor Bridge' },
  publisher: { '@type': 'Organization', name: 'The Tutor Bridge' }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } }))
};

export default function FirmwareEngineerRoadmapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <RoadmapHero
          title="Firmware Engineer Roadmap"
          description="Master embedded C, microcontroller architecture, bootloaders, device drivers, and firmware security. Your complete guide to becoming a Firmware Engineer in 2026."
          duration="8-14 Months"
          difficulty="Intermediate"
          accentColor="#7C3AED"
        />
        <WhatIsSection
          title="What is a Firmware Engineer?"
          paragraphs={[
            'Firmware Engineers develop low-level software that runs directly on hardware, controlling microcontrollers and embedded processors. They write the code that brings hardware to life, from boot sequences to device drivers.',
            'As a Firmware Engineer, you will write register-level code, develop bootloaders, create device drivers, implement communication protocols, and ensure reliable operation of embedded systems.'
          ]}
          responsibilities={[
            'Write low-level C code for microcontrollers',
            'Develop and maintain bootloaders',
            'Create device drivers and HAL layers',
            'Implement firmware update mechanisms',
            'Debug hardware/software interfaces',
            'Optimize for memory and performance',
            'Ensure firmware security and reliability'
          ]}
        />
        <VisualRoadmapSection stages={roadmapStages} accentColor="#7C3AED" />
        <SalarySection
          title="Firmware Engineer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Automotive and aerospace firmware engineers command premium salaries due to safety-critical requirements. Security expertise adds significant value. Contract rates for firmware consultants are excellent. Silicon Valley and automotive hubs pay highest."
          gradient="bg-gradient-to-r from-violet-500 to-purple-500"
        />
        <ProjectsSection projects={projects} />
        <FAQSection faqs={faqs} />
        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />
        <CTASection
          title="Ready to Start Your Firmware Engineering Journey?"
          description="Get personalized guidance from experienced firmware engineers who have built production systems."
          gradient="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"
        />
      </main>
      <Footer />
    </>
  );
}
