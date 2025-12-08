'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Cpu,
  CircuitBoard,
  Code,
  Zap,
  Radio,
  Settings,
  Clock,
  Shield,
  Wifi,
  Server,
  TestTube,
  Wrench
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
        title: 'C Programming',
        description: 'Master the core language',
        topics: ['Pointers & Memory', 'Bit Manipulation', 'Structs & Unions', 'Function Pointers', 'Volatile/Const', 'Memory Layout']
      },
      {
        id: 2,
        title: 'C++ for Embedded',
        description: 'Modern embedded C++',
        topics: ['Classes & Objects', 'Templates', 'RAII', 'constexpr', 'Embedded C++ Best Practices', 'No Dynamic Memory']
      }
    ],
    milestone: 'You have programming foundation!'
  },
  {
    title: 'Electronics Basics',
    icon: CircuitBoard,
    color: 'bg-green-500',
    steps: [
      {
        id: 3,
        title: 'Digital Electronics',
        description: 'Understand hardware',
        topics: ['Logic Gates', 'Boolean Algebra', 'Flip-Flops', 'Registers', 'Digital Circuits', 'Timing Diagrams']
      },
      {
        id: 4,
        title: 'Basic Circuits',
        description: 'Electronics fundamentals',
        topics: ['Voltage/Current', 'Resistors/Capacitors', 'Oscilloscope', 'Multimeter', 'Reading Schematics', 'Datasheets']
      }
    ]
  },
  {
    title: 'Microcontroller Fundamentals',
    icon: Cpu,
    color: 'bg-purple-500',
    steps: [
      {
        id: 5,
        title: 'MCU Architecture',
        description: 'How microcontrollers work',
        topics: ['CPU Architecture', 'Memory Map', 'Registers', 'Clock System', 'Reset & Startup', 'ARM Cortex-M']
      },
      {
        id: 6,
        title: 'Development Environment',
        description: 'Set up your tools',
        topics: ['IDEs (Keil, STM32CubeIDE)', 'Toolchains (GCC)', 'Debuggers (J-Link)', 'Makefiles/CMake', 'Version Control']
      }
    ],
    milestone: 'You understand microcontrollers!'
  },
  {
    title: 'Peripheral Interfaces',
    icon: Zap,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 7,
        title: 'GPIO & Basic Peripherals',
        description: 'Digital I/O',
        topics: ['GPIO Configuration', 'Interrupts', 'Timers/Counters', 'PWM', 'ADC/DAC', 'Watchdog']
      },
      {
        id: 8,
        title: 'Communication Protocols',
        description: 'Interface with devices',
        topics: ['UART/USART', 'SPI', 'I2C', 'CAN', 'USB', 'Ethernet Basics']
      }
    ]
  },
  {
    title: 'Real-Time Operating Systems',
    icon: Clock,
    color: 'bg-orange-500',
    steps: [
      {
        id: 9,
        title: 'RTOS Concepts',
        description: 'Real-time fundamentals',
        topics: ['Tasks & Scheduling', 'Priorities', 'Context Switching', 'Semaphores', 'Mutexes', 'Queues']
      },
      {
        id: 10,
        title: 'RTOS in Practice',
        description: 'Working with RTOS',
        topics: ['FreeRTOS', 'Zephyr', 'Task Design', 'Deadlock Prevention', 'Memory Management', 'Debugging RTOS']
      }
    ],
    milestone: 'You can build real-time systems!'
  },
  {
    title: 'Embedded Linux',
    icon: Server,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 11,
        title: 'Linux Basics',
        description: 'Linux for embedded',
        topics: ['Linux Kernel', 'Device Trees', 'Bootloaders', 'Root Filesystem', 'Cross Compilation', 'Buildroot/Yocto']
      },
      {
        id: 12,
        title: 'Linux Drivers',
        description: 'Kernel development',
        topics: ['Character Drivers', 'Platform Drivers', 'GPIO Subsystem', 'I2C/SPI Drivers', 'Interrupt Handling', 'DMA']
      }
    ]
  },
  {
    title: 'Connectivity & IoT',
    icon: Wifi,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 13,
        title: 'Wireless Protocols',
        description: 'Connect your devices',
        topics: ['WiFi', 'Bluetooth/BLE', 'Zigbee', 'LoRa', 'NFC', 'Cellular (LTE-M, NB-IoT)']
      },
      {
        id: 14,
        title: 'IoT Protocols',
        description: 'IoT communication',
        topics: ['MQTT', 'CoAP', 'HTTP/REST', 'WebSockets', 'Cloud Integration', 'OTA Updates']
      }
    ],
    milestone: 'You can build connected devices!'
  },
  {
    title: 'Power & Optimization',
    icon: Radio,
    color: 'bg-emerald-500',
    steps: [
      {
        id: 15,
        title: 'Power Management',
        description: 'Battery-powered design',
        topics: ['Sleep Modes', 'Power Profiling', 'Clock Gating', 'Peripheral Power', 'Battery Management', 'Energy Harvesting']
      },
      {
        id: 16,
        title: 'Optimization',
        description: 'Efficient code',
        topics: ['Memory Optimization', 'Code Size', 'Execution Speed', 'Cache Utilization', 'Profiling Tools', 'Compiler Optimization']
      }
    ]
  },
  {
    title: 'Testing & Debugging',
    icon: TestTube,
    color: 'bg-teal-500',
    steps: [
      {
        id: 17,
        title: 'Debugging Techniques',
        description: 'Find and fix bugs',
        topics: ['JTAG/SWD', 'Printf Debugging', 'Logic Analyzers', 'Memory Issues', 'Stack Overflow', 'Hard Faults']
      },
      {
        id: 18,
        title: 'Testing',
        description: 'Embedded testing',
        topics: ['Unit Testing', 'HIL Testing', 'Integration Testing', 'Static Analysis', 'Code Coverage', 'CI/CD for Embedded']
      }
    ]
  },
  {
    title: 'Safety & Security',
    icon: Shield,
    color: 'bg-red-500',
    steps: [
      {
        id: 19,
        title: 'Embedded Security',
        description: 'Secure your devices',
        topics: ['Secure Boot', 'Encryption', 'Authentication', 'Secure Storage', 'Tamper Detection', 'Security Updates']
      },
      {
        id: 20,
        title: 'Functional Safety',
        description: 'Safety-critical systems',
        topics: ['IEC 61508', 'ISO 26262', 'MISRA C', 'Safety Analysis', 'Redundancy', 'Fail-Safe Design']
      }
    ],
    milestone: 'You are an Embedded Systems Engineer!'
  }
];

const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$70K - $95K', avg: '$82K' },
  { level: 'Mid (2-5 yrs)', range: '$90K - $130K', avg: '$110K' },
  { level: 'Senior (5-8 yrs)', range: '$125K - $170K', avg: '$145K' },
  { level: 'Principal (8+ yrs)', range: '$160K - $220K+', avg: '$185K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹4L - ₹8L', avg: '₹6L' },
  { level: 'Junior (1-3 yrs)', range: '₹8L - ₹15L', avg: '₹11L' },
  { level: 'Mid (3-5 yrs)', range: '₹15L - ₹28L', avg: '₹20L' },
  { level: 'Senior (5+ yrs)', range: '₹25L - ₹45L+', avg: '₹35L' }
];

const projects = [
  { title: 'LED Blink (Bare Metal)', level: 'Beginner' as const, description: 'GPIO without libraries', skills: ['Registers', 'Memory Mapping', 'Startup Code', 'Linker Scripts'] },
  { title: 'UART Driver', level: 'Beginner' as const, description: 'Serial communication', skills: ['UART Protocol', 'Interrupts', 'Ring Buffer', 'Printf Redirect'] },
  { title: 'Sensor Hub', level: 'Intermediate' as const, description: 'Multi-sensor system', skills: ['I2C', 'SPI', 'FreeRTOS', 'Data Processing'] },
  { title: 'Motor Controller', level: 'Intermediate' as const, description: 'PWM motor control', skills: ['PWM', 'ADC', 'PID Control', 'Feedback Systems'] },
  { title: 'IoT Weather Station', level: 'Advanced' as const, description: 'Cloud-connected device', skills: ['WiFi', 'MQTT', 'Low Power', 'OTA Updates'] },
  { title: 'Custom RTOS', level: 'Advanced' as const, description: 'Build your own RTOS', skills: ['Scheduling', 'Context Switch', 'IPC', 'Memory Management'] }
];

const faqs = [
  {
    question: 'What programming language is used in embedded systems?',
    answer: 'C is dominant (90%+ of embedded code). C++ is growing for complex projects. Assembly for critical sections. Python/MicroPython for prototyping. Rust is emerging for safety-critical applications. Start with C - it\'s essential.'
  },
  {
    question: 'How long does it take to become an embedded systems engineer?',
    answer: 'With programming background, 6-12 months for basic embedded skills. Understanding RTOS, protocols, and hardware takes 1-2 years. Expert level (Linux kernel, safety-critical) requires 3-5+ years. The field is deep and continuously evolving.'
  },
  {
    question: 'Do I need an EE degree for embedded systems?',
    answer: 'Not required but helpful. CS/IT graduates successfully transition with self-study in electronics. Understanding basic circuits, reading datasheets, and using test equipment is essential. Many companies train motivated software engineers.'
  },
  {
    question: 'Is embedded systems a good career in 2026?',
    answer: 'Excellent career prospects. IoT, automotive, medical devices, and consumer electronics drive demand. Embedded skills are specialized and harder to outsource. AI at the edge is creating new opportunities. Shortage of experienced engineers continues.'
  },
  {
    question: 'What development board should I start with?',
    answer: 'STM32 Nucleo or Discovery boards are ideal - professional-grade with great documentation. Arduino for absolute beginners, but transition quickly. ESP32 for IoT projects. Raspberry Pi for embedded Linux. Avoid staying in Arduino ecosystem too long.'
  },
  {
    question: 'What\'s the difference between embedded and firmware engineering?',
    answer: 'Significant overlap - terms often used interchangeably. Firmware traditionally refers to code burned into ROM/flash. Embedded systems is broader, including RTOS, drivers, and application code. Firmware engineer often implies more hardware-focused work.'
  },
  {
    question: 'How important is RTOS knowledge?',
    answer: 'Very important for professional work. Most commercial products use RTOS. FreeRTOS is most popular and free. Understanding scheduling, synchronization, and real-time constraints is essential. Start with bare-metal, then learn RTOS concepts.'
  },
  {
    question: 'How do I prepare for embedded systems interviews?',
    answer: 'Know C deeply - pointers, bit manipulation, volatile keyword. Understand memory layout, stack vs heap. Practice explaining communication protocols (I2C, SPI, UART). Prepare for debugging scenarios. Show projects on GitHub with clean code.'
  }
];

const relatedRoadmaps = [
  { title: 'Firmware Engineer', description: 'Low-level programming', href: '/roadmap/firmware-engineer', icon: Cpu, color: 'bg-purple-500' },
  { title: 'C++', description: 'Systems programming', href: '/roadmap/cpp', icon: Code, color: 'bg-blue-500' },
  { title: 'IoT Developer', description: 'Connected devices', href: '/roadmap/mobile-developer', icon: Wifi, color: 'bg-green-500' }
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Embedded Systems Engineer Roadmap 2026',
  description: 'Complete guide to becoming an Embedded Systems Engineer in 2026',
  author: { '@type': 'Organization', name: 'The Tutor Bridge' },
  publisher: { '@type': 'Organization', name: 'The Tutor Bridge' }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } }))
};

export default function EmbeddedSystemsRoadmapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <RoadmapHero
          title="Embedded Systems Engineer Roadmap"
          description="Master C/C++, microcontrollers, RTOS, communication protocols, embedded Linux, and IoT. Your complete guide to becoming an Embedded Systems Engineer in 2026."
          duration="8-14 Months"
          difficulty="Intermediate"
          accentColor="#8B5CF6"
        />
        <WhatIsSection
          title="What is an Embedded Systems Engineer?"
          paragraphs={[
            'Embedded Systems Engineers develop software for specialized hardware systems - from microcontrollers to complex embedded computers. They work at the intersection of hardware and software, building systems that power everything from IoT devices to automotive systems.',
            'As an Embedded Systems Engineer, you will write low-level code, interface with hardware peripherals, implement communication protocols, optimize for resource constraints, and ensure real-time performance.'
          ]}
          responsibilities={[
            'Write firmware in C/C++ for microcontrollers',
            'Interface with sensors, actuators, and peripherals',
            'Implement communication protocols (UART, SPI, I2C, CAN)',
            'Develop and debug RTOS-based applications',
            'Optimize code for memory and performance',
            'Work with embedded Linux and device drivers',
            'Ensure system reliability and safety'
          ]}
        />
        <VisualRoadmapSection stages={roadmapStages} accentColor="#8B5CF6" />
        <SalarySection
          title="Embedded Systems Engineer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Automotive and medical device sectors pay premium salaries due to safety requirements. RTOS and Linux kernel experience significantly boost compensation. Security expertise is increasingly valued. Contract rates for experienced engineers are excellent."
          gradient="bg-gradient-to-r from-purple-500 to-indigo-500"
        />
        <ProjectsSection projects={projects} />
        <FAQSection faqs={faqs} />
        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />
        <CTASection
          title="Ready to Start Your Embedded Systems Journey?"
          description="Get personalized guidance from experienced embedded engineers who have built production systems."
          gradient="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"
        />
      </main>
      <Footer />
    </>
  );
}
