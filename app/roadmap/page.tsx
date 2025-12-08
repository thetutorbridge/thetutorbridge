'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Server,
  Database,
  Cloud,
  Smartphone,
  Brain,
  Shield,
  TrendingUp,
  Layers,
  Monitor,
  Terminal,
  Cpu,
  Globe,
  Clock,
  Star,
  CheckCircle,
  BarChart3,
  Code,
  Network,
  Coffee,
  Blocks,
  Binary,
  Calculator,
  Bug,
  Sparkles,
  Box,
  Atom,
  Briefcase,
  Gamepad2,
  Palette,
  Table,
  Leaf,
  GraduationCap,
  PieChart,
  Building2,
  Cog,
  MessageSquare,
  FileCode,
  Users
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

// Simplified Roadmap Card Component - Mobile First
const RoadmapCard = ({
  title,
  description,
  icon: Icon,
  href,
  gradient,
  difficulty,
  duration,
  isPopular,
  isAvailable
}: {
  title: string;
  description: string;
  icon: any;
  href: string;
  gradient: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  isPopular?: boolean;
  isAvailable?: boolean;
}) => {
  const difficultyColor = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-blue-100 text-blue-700',
    Advanced: 'bg-purple-100 text-purple-700'
  };

  const CardContent = () => (
    <div className={`bg-white border border-gray-200 rounded-xl p-4 h-full transition-all ${isAvailable ? 'hover:border-gray-300 hover:shadow-md' : 'opacity-60'}`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 ${gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-[#1A3D7C] truncate">{title}</h3>
            {isPopular && (
              <span className="flex-shrink-0 px-1.5 py-0.5 bg-[#2BAE66] text-white text-[10px] font-medium rounded flex items-center gap-0.5">
                <Star className="w-2.5 h-2.5" /> Popular
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{description}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColor[difficulty]}`}>
              {difficulty}
            </span>
            <span className="flex items-center gap-1 text-gray-500 text-xs">
              <Clock className="w-3 h-3" />
              {duration}
            </span>
          </div>
        </div>
        {isAvailable && (
          <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </div>
      {!isAvailable && (
        <div className="mt-3 text-center">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Coming Soon</span>
        </div>
      )}
    </div>
  );

  if (!isAvailable) {
    return <div className="cursor-not-allowed"><CardContent /></div>;
  }

  return (
    <Link href={href} className="block">
      <CardContent />
    </Link>
  );
};

export default function RoadmapIndexPage() {
  const roadmaps = [
    {
      title: 'Full Stack Developer',
      description: 'Master frontend, backend, databases, and DevOps to build complete web applications.',
      icon: Layers,
      href: '/roadmap/full-stack-developer',
      gradient: 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66]',
      difficulty: 'Intermediate' as const,
      duration: '6-12 months',
      isPopular: true,
      isAvailable: true
    },
    {
      title: 'Frontend Developer',
      description: 'Build beautiful, responsive user interfaces with HTML, CSS, JavaScript, and React.',
      icon: Monitor,
      href: '/roadmap/frontend-developer',
      gradient: 'bg-gradient-to-r from-blue-500 to-purple-500',
      difficulty: 'Beginner' as const,
      duration: '4-6 months',
      isAvailable: true
    },
    {
      title: 'Backend Developer',
      description: 'Create powerful server-side applications with Node.js, databases, and APIs.',
      icon: Server,
      href: '/roadmap/backend-developer',
      gradient: 'bg-gradient-to-r from-green-500 to-teal-500',
      difficulty: 'Intermediate' as const,
      duration: '5-8 months',
      isAvailable: true
    },
    {
      title: 'JavaScript Developer',
      description: 'Master JavaScript, ES6+, async programming, DOM, and modern frameworks.',
      icon: Code,
      href: '/roadmap/javascript',
      gradient: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
      difficulty: 'Beginner' as const,
      duration: '4-6 months',
      isPopular: true,
      isAvailable: true
    },
    {
      title: 'Java Developer',
      description: 'Learn core Java, OOP, Spring Boot, databases, and enterprise development.',
      icon: Coffee,
      href: '/roadmap/java',
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500',
      difficulty: 'Beginner' as const,
      duration: '6-9 months',
      isAvailable: true
    },
    {
      title: 'Python Developer',
      description: 'Master Python programming, web frameworks, testing, and automation.',
      icon: Code,
      href: '/roadmap/python-developer',
      gradient: 'bg-gradient-to-r from-yellow-500 to-blue-500',
      difficulty: 'Beginner' as const,
      duration: '4-8 months',
      isAvailable: true
    },
    {
      title: 'Data Analyst',
      description: 'Master Excel, SQL, Python, statistics, and visualization tools like Tableau & Power BI.',
      icon: BarChart3,
      href: '/roadmap/data-analyst',
      gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      difficulty: 'Beginner' as const,
      duration: '4-6 months',
      isPopular: true,
      isAvailable: true
    },
    {
      title: 'AI & Data Scientist',
      description: 'Master mathematics, machine learning, deep learning, and MLOps for AI applications.',
      icon: Calculator,
      href: '/roadmap/ai-data-scientist',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
      difficulty: 'Intermediate' as const,
      duration: '8-12 months',
      isPopular: true,
      isAvailable: true
    },
    {
      title: 'Data Engineer',
      description: 'Build data pipelines, ETL processes, and data infrastructure with modern tools.',
      icon: Database,
      href: '/roadmap/data-engineer',
      gradient: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      difficulty: 'Intermediate' as const,
      duration: '6-10 months',
      isAvailable: true
    },
    {
      title: 'AI Engineer',
      description: 'Build AI applications with LLMs, RAG, vector databases, and AI agents.',
      icon: Cpu,
      href: '/roadmap/ai-engineer',
      gradient: 'bg-gradient-to-r from-violet-500 to-purple-600',
      difficulty: 'Intermediate' as const,
      duration: '3-6 months',
      isAvailable: true
    },
    {
      title: 'Blockchain Developer',
      description: 'Learn Solidity, smart contracts, DeFi, Web3, and decentralized applications.',
      icon: Blocks,
      href: '/roadmap/blockchain',
      gradient: 'bg-gradient-to-r from-indigo-500 to-purple-500',
      difficulty: 'Intermediate' as const,
      duration: '4-6 months',
      isAvailable: true
    },
    {
      title: 'DSA (Data Structures)',
      description: 'Master arrays, linked lists, trees, graphs, and algorithms for coding interviews.',
      icon: Binary,
      href: '/roadmap/dsa',
      gradient: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      difficulty: 'Intermediate' as const,
      duration: '3-6 months',
      isAvailable: true
    },
    {
      title: 'Cyber Security',
      description: 'Learn networking, penetration testing, ethical hacking, and security tools.',
      icon: Shield,
      href: '/roadmap/cyber-security',
      gradient: 'bg-gradient-to-r from-red-500 to-rose-600',
      difficulty: 'Intermediate' as const,
      duration: '6-12 months',
      isAvailable: true
    },
    {
      title: 'DevOps Engineer',
      description: 'Master Docker, Kubernetes, CI/CD pipelines, and cloud infrastructure.',
      icon: Cloud,
      href: '/roadmap/devops',
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500',
      difficulty: 'Intermediate' as const,
      duration: '6-12 months',
      isAvailable: true
    },
    {
      title: 'System Design',
      description: 'Learn scalability, databases, caching, microservices, and distributed systems.',
      icon: Network,
      href: '/roadmap/system-design',
      gradient: 'bg-gradient-to-r from-indigo-500 to-purple-500',
      difficulty: 'Intermediate' as const,
      duration: '6-12 months',
      isAvailable: true
    },
    {
      title: 'Data Scientist',
      description: 'Learn Python, statistics, machine learning, deep learning, and MLOps.',
      icon: Brain,
      href: '/roadmap/data-scientist',
      gradient: 'bg-gradient-to-r from-emerald-500 to-cyan-500',
      difficulty: 'Intermediate' as const,
      duration: '12-18 months',
      isAvailable: true
    },
    {
      title: 'Machine Learning Engineer',
      description: 'Master ML algorithms, deep learning, neural networks, and model deployment.',
      icon: Sparkles,
      href: '/roadmap/machine-learning',
      gradient: 'bg-gradient-to-r from-pink-500 to-rose-600',
      difficulty: 'Intermediate' as const,
      duration: '9-12 months',
      isPopular: true,
      isAvailable: true
    },
    {
      title: 'QA Engineer',
      description: 'Master manual testing, automation, Selenium, Cypress, API testing, and CI/CD.',
      icon: Bug,
      href: '/roadmap/qa',
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-600',
      difficulty: 'Beginner' as const,
      duration: '3-6 months',
      isAvailable: true
    },
    {
      title: 'AWS',
      description: 'Master Amazon Web Services - EC2, S3, Lambda, VPC, and cloud architecture.',
      icon: Cloud,
      href: '/roadmap/aws',
      gradient: 'bg-gradient-to-r from-orange-400 to-orange-600',
      difficulty: 'Intermediate' as const,
      duration: '4-6 months',
      isPopular: true,
      isAvailable: true
    },
    {
      title: 'React Developer',
      description: 'Build modern web apps with React, hooks, state management, and Next.js.',
      icon: Atom,
      href: '/roadmap/react',
      gradient: 'bg-gradient-to-r from-cyan-400 to-blue-500',
      difficulty: 'Beginner' as const,
      duration: '3-5 months',
      isPopular: true,
      isAvailable: true
    },
    {
      title: 'Node.js Developer',
      description: 'Build server-side applications with Node.js, Express, databases, and APIs.',
      icon: Box,
      href: '/roadmap/nodejs',
      gradient: 'bg-gradient-to-r from-green-500 to-green-700',
      difficulty: 'Beginner' as const,
      duration: '3-5 months',
      isAvailable: true
    },
    {
      title: 'Product Manager',
      description: 'Learn product strategy, user research, roadmapping, agile, and stakeholder management.',
      icon: Briefcase,
      href: '/roadmap/product-manager',
      gradient: 'bg-gradient-to-r from-indigo-500 to-purple-600',
      difficulty: 'Intermediate' as const,
      duration: '6-12 months',
      isAvailable: true
    },
    {
      title: 'Android Developer',
      description: 'Build native Android apps with Kotlin, Jetpack Compose, and modern architecture.',
      icon: Smartphone,
      href: '/roadmap/android',
      gradient: 'bg-gradient-to-r from-green-400 to-green-600',
      difficulty: 'Beginner' as const,
      duration: '4-6 months',
      isAvailable: true
    },
    {
      title: 'Game Developer',
      description: 'Create games with Unity, Unreal Engine, graphics, physics, and multiplayer.',
      icon: Gamepad2,
      href: '/roadmap/game-developer',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
      difficulty: 'Intermediate' as const,
      duration: '6-12 months',
      isAvailable: true
    },
    {
      title: 'UX Designer',
      description: 'Master user research, wireframing, prototyping, and design systems with Figma.',
      icon: Palette,
      href: '/roadmap/ux-design',
      gradient: 'bg-gradient-to-r from-pink-500 to-rose-500',
      difficulty: 'Beginner' as const,
      duration: '4-8 months',
      isAvailable: true
    },
    {
      title: 'ASP.NET Core Developer',
      description: 'Build web applications and APIs with C#, .NET, Entity Framework, and Azure.',
      icon: Code,
      href: '/roadmap/aspnet-core',
      gradient: 'bg-gradient-to-r from-purple-600 to-blue-600',
      difficulty: 'Intermediate' as const,
      duration: '4-8 months',
      isAvailable: true
    },
    {
      title: 'Golang Developer',
      description: 'Master Go programming, concurrency, microservices, and cloud-native applications.',
      icon: Terminal,
      href: '/roadmap/golang',
      gradient: 'bg-gradient-to-r from-cyan-500 to-blue-600',
      difficulty: 'Beginner' as const,
      duration: '3-6 months',
      isPopular: true,
      isAvailable: true
    },
    {
      title: 'SQL',
      description: 'Learn database fundamentals, queries, joins, window functions, and optimization.',
      icon: Table,
      href: '/roadmap/sql',
      gradient: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      difficulty: 'Beginner' as const,
      duration: '2-4 months',
      isPopular: true,
      isAvailable: true
    },
    {
      title: 'Flutter Developer',
      description: 'Build cross-platform mobile apps with Dart, widgets, and state management.',
      icon: Smartphone,
      href: '/roadmap/flutter',
      gradient: 'bg-gradient-to-r from-blue-400 to-cyan-500',
      difficulty: 'Beginner' as const,
      duration: '4-6 months',
      isPopular: true,
      isAvailable: true
    },
    {
      title: 'C++ Developer',
      description: 'Master C++ fundamentals, OOP, STL, modern C++, and system programming.',
      icon: Code,
      href: '/roadmap/cpp',
      gradient: 'bg-gradient-to-r from-blue-600 to-indigo-700',
      difficulty: 'Intermediate' as const,
      duration: '6-12 months',
      isAvailable: true
    },
    {
      title: 'Spring Boot Developer',
      description: 'Build enterprise Java applications with Spring, JPA, security, and microservices.',
      icon: Leaf,
      href: '/roadmap/spring-boot',
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-600',
      difficulty: 'Intermediate' as const,
      duration: '5-8 months',
      isAvailable: true
    },
    {
      title: 'Computer Science',
      description: 'Master programming, DSA, OS, databases, networks, and CS fundamentals.',
      icon: GraduationCap,
      href: '/roadmap/computer-science',
      gradient: 'bg-gradient-to-r from-indigo-500 to-purple-600',
      difficulty: 'Intermediate' as const,
      duration: '12-24 months',
      isAvailable: true
    },
    {
      title: 'BI Analyst',
      description: 'Master SQL, Power BI, Tableau, data visualization, and business analytics.',
      icon: PieChart,
      href: '/roadmap/bi-analyst',
      gradient: 'bg-gradient-to-r from-amber-500 to-orange-500',
      difficulty: 'Beginner' as const,
      duration: '4-8 months',
      isAvailable: true
    },
    {
      title: 'iOS Developer',
      description: 'Build native iOS apps with Swift, SwiftUI, UIKit, and App Store deployment.',
      icon: Smartphone,
      href: '/roadmap/ios',
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-600',
      difficulty: 'Intermediate' as const,
      duration: '5-8 months',
      isAvailable: true
    },
    {
      title: 'React Native Developer',
      description: 'Build cross-platform mobile apps with JavaScript, React, and native modules.',
      icon: Smartphone,
      href: '/roadmap/react-native',
      gradient: 'bg-gradient-to-r from-cyan-400 to-blue-500',
      difficulty: 'Intermediate' as const,
      duration: '4-6 months',
      isAvailable: true
    },
    {
      title: 'Software Architect',
      description: 'Master system design, architecture patterns, cloud, and technical leadership.',
      icon: Building2,
      href: '/roadmap/software-architect',
      gradient: 'bg-gradient-to-r from-violet-500 to-purple-600',
      difficulty: 'Advanced' as const,
      duration: '5-10 years',
      isAvailable: true
    },
    {
      title: 'MLOps Engineer',
      description: 'Master ML pipelines, model deployment, CI/CD for ML, and production ML systems.',
      icon: Cog,
      href: '/roadmap/mlops',
      gradient: 'bg-gradient-to-r from-violet-500 to-purple-600',
      difficulty: 'Advanced' as const,
      duration: '6-12 months',
      isAvailable: true
    },
    {
      title: 'Prompt Engineer',
      description: 'Master LLM prompting, RAG systems, AI agents, and production prompt optimization.',
      icon: MessageSquare,
      href: '/roadmap/prompt-engineering',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
      difficulty: 'Beginner' as const,
      duration: '3-6 months',
      isPopular: true,
      isAvailable: true
    },
    {
      title: 'PHP Developer',
      description: 'Build web applications with PHP 8, Laravel, MySQL, and modern development practices.',
      icon: Code,
      href: '/roadmap/php',
      gradient: 'bg-gradient-to-r from-indigo-500 to-purple-600',
      difficulty: 'Beginner' as const,
      duration: '4-6 months',
      isAvailable: true
    },
    {
      title: 'Linux',
      description: 'Master command line, shell scripting, system administration, and DevOps.',
      icon: Terminal,
      href: '/roadmap/linux',
      gradient: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      difficulty: 'Beginner' as const,
      duration: '4-8 months',
      isAvailable: true
    },
    {
      title: 'Angular Developer',
      description: 'Build enterprise apps with TypeScript, RxJS, NgRx, and Angular Material.',
      icon: FileCode,
      href: '/roadmap/angular',
      gradient: 'bg-gradient-to-r from-red-500 to-pink-600',
      difficulty: 'Intermediate' as const,
      duration: '5-8 months',
      isAvailable: true
    },
    {
      title: 'Engineering Manager',
      description: 'Master people management, hiring, performance reviews, and technical leadership.',
      icon: Users,
      href: '/roadmap/engineering-manager',
      gradient: 'bg-gradient-to-r from-indigo-500 to-purple-600',
      difficulty: 'Advanced' as const,
      duration: '2-4 years',
      isAvailable: true
    },
    {
      title: 'Rust Developer',
      description: 'Master ownership, borrowing, async programming, WebAssembly, and systems programming.',
      icon: Cog,
      href: '/roadmap/rust',
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500',
      difficulty: 'Advanced' as const,
      duration: '6-12 months',
      isAvailable: true
    },
    {
      title: 'PostgreSQL DBA',
      description: 'Master performance tuning, replication, backup, security, and high availability.',
      icon: Database,
      href: '/roadmap/postgresql-dba',
      gradient: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      difficulty: 'Intermediate' as const,
      duration: '6-12 months',
      isAvailable: true
    },
    {
      title: 'Mobile App Developer',
      description: 'Build iOS and Android apps with Flutter, React Native, or native development.',
      icon: Smartphone,
      href: '/roadmap/mobile-developer',
      gradient: 'bg-gradient-to-r from-cyan-500 to-blue-500',
      difficulty: 'Intermediate' as const,
      duration: '5-8 months',
      isAvailable: true
    },
    {
      title: 'Cloud Engineer',
      description: 'Master AWS, Azure, GCP, infrastructure as code, and cloud architecture.',
      icon: Cloud,
      href: '/roadmap/cloud-engineer',
      gradient: 'bg-gradient-to-r from-orange-500 to-yellow-500',
      difficulty: 'Intermediate' as const,
      duration: '6-12 months',
      isAvailable: true
    },
    {
      title: 'Site Reliability Engineer',
      description: 'Master SLOs, observability, incident management, and reliability practices.',
      icon: Shield,
      href: '/roadmap/sre',
      gradient: 'bg-gradient-to-r from-indigo-500 to-purple-500',
      difficulty: 'Advanced' as const,
      duration: '8-14 months',
      isAvailable: true
    },
    {
      title: 'Embedded Systems Engineer',
      description: 'Master microcontrollers, RTOS, C/C++, and hardware interfaces.',
      icon: Cpu,
      href: '/roadmap/embedded-systems',
      gradient: 'bg-gradient-to-r from-purple-500 to-indigo-500',
      difficulty: 'Intermediate' as const,
      duration: '8-14 months',
      isAvailable: true
    },
    {
      title: 'Firmware Engineer',
      description: 'Master embedded C, bootloaders, device drivers, and hardware debugging.',
      icon: Cpu,
      href: '/roadmap/firmware-engineer',
      gradient: 'bg-gradient-to-r from-violet-500 to-purple-500',
      difficulty: 'Intermediate' as const,
      duration: '8-14 months',
      isAvailable: true
    },
    {
      title: 'AR/VR Developer',
      description: 'Build immersive experiences with Unity, Unreal, Meta Quest, and Vision Pro.',
      icon: Gamepad2,
      href: '/roadmap/ar-vr-developer',
      gradient: 'bg-gradient-to-r from-cyan-500 to-blue-500',
      difficulty: 'Intermediate' as const,
      duration: '6-10 months',
      isAvailable: true
    },
    {
      title: 'Computer Vision Engineer',
      description: 'Master OpenCV, deep learning, object detection, and visual AI.',
      icon: Brain,
      href: '/roadmap/computer-vision',
      gradient: 'bg-gradient-to-r from-violet-500 to-purple-500',
      difficulty: 'Advanced' as const,
      duration: '8-14 months',
      isAvailable: true
    },
    {
      title: 'NLP Engineer',
      description: 'Master transformers, BERT, GPT, LLMs, RAG, and conversational AI.',
      icon: MessageSquare,
      href: '/roadmap/nlp-engineer',
      gradient: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      difficulty: 'Advanced' as const,
      duration: '8-14 months',
      isAvailable: true
    },
    {
      title: 'Big Data Engineer',
      description: 'Master Apache Spark, Kafka, Hadoop, data lakes, and distributed systems.',
      icon: Database,
      href: '/roadmap/big-data-engineer',
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500',
      difficulty: 'Advanced' as const,
      duration: '8-14 months',
      isAvailable: true
    },
    {
      title: 'Integration Engineer',
      description: 'Master APIs, MuleSoft, enterprise integration patterns, and iPaaS platforms.',
      icon: Network,
      href: '/roadmap/integration-engineer',
      gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      difficulty: 'Intermediate' as const,
      duration: '6-10 months',
      isAvailable: true
    },
    {
      title: 'Cloud Architect',
      description: 'Design cloud solutions on AWS, Azure, and Google Cloud.',
      icon: Globe,
      href: '/roadmap/cloud-architect',
      gradient: 'bg-gradient-to-r from-sky-500 to-cyan-500',
      difficulty: 'Advanced' as const,
      duration: '8-12 months',
      isAvailable: false
    },
    {
      title: 'System Administrator',
      description: 'Learn Linux, networking, and server management.',
      icon: Terminal,
      href: '/roadmap/system-administrator',
      gradient: 'bg-gradient-to-r from-gray-600 to-gray-800',
      difficulty: 'Intermediate' as const,
      duration: '5-7 months',
      isAvailable: false
    }
  ];

  const availableRoadmaps = roadmaps.filter(r => r.isAvailable);
  const comingSoonRoadmaps = roadmaps.filter(r => !r.isAvailable);

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section - Clean white design matching roadmap pages */}
        <section className="bg-white border-b border-gray-200 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-[#2BAE66]/10 text-[#2BAE66] mb-6">
                <Layers className="w-4 h-4" />
                2026 Career Roadmaps
              </span>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A3D7C] mb-4 font-poppins">
                Career Roadmaps
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Step-by-step guides to launch your tech career. Choose your path and start learning today.
              </p>

              {/* Stats */}
              <div className="flex items-center justify-center gap-6 md:gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#2BAE66]/10 flex items-center justify-center">
                    <Layers className="w-4 h-4 text-[#2BAE66]" />
                  </div>
                  <span><strong className="text-[#1A3D7C]">54+</strong> Paths</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#2BAE66]/10 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                  </div>
                  <span><strong className="text-[#1A3D7C]">500+</strong> Skills</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#2BAE66]/10 flex items-center justify-center">
                    <Star className="w-4 h-4 text-[#2BAE66]" />
                  </div>
                  <span><strong className="text-[#1A3D7C]">Free</strong> Forever</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Available Roadmaps */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-8 font-poppins">
              Available Roadmaps
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {availableRoadmaps.map((roadmap, index) => (
                <RoadmapCard key={index} {...roadmap} />
              ))}
            </div>
          </div>
        </section>

        {/* Coming Soon Roadmaps */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-2 font-poppins">
              Coming Soon
            </h2>
            <p className="text-gray-600 mb-8">
              More roadmaps are being developed. Stay tuned!
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {comingSoonRoadmaps.map((roadmap, index) => (
                <RoadmapCard key={index} {...roadmap} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66]">
          <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-poppins">
              Need Personalized Guidance?
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              Get one-on-one mentorship from industry experts who have walked this path.
            </p>
            <Link href="/book-demo-class">
              <Button className="bg-[#FFC857] text-[#1A3D7C] hover:bg-[#FFC857]/90 px-8 py-3 font-semibold rounded-xl text-lg">
                Book Free Session
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
