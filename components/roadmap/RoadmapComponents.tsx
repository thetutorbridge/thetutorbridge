'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  TrendingUp,
  Target,
  ArrowRight,
  Briefcase,
  Globe,
  Lightbulb,
  LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Types
export interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  topics: string[];
}

export interface RoadmapStage {
  title: string;
  icon: LucideIcon;
  color: string;
  steps: RoadmapStep[];
  milestone?: string;
}

export interface SalaryData {
  level: string;
  range: string;
  avg: string;
}

export interface FAQData {
  question: string;
  answer: string;
}

export interface ProjectIdea {
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  skills: string[];
}

export interface RelatedRoadmap {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
}

// Hero Section Component - Clean, subtle design, centered
export const RoadmapHero = ({
  title,
  description,
  duration,
  difficulty,
  accentColor = '#2BAE66'
}: {
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  gradient?: string; // kept for backwards compatibility but not used
  accentColor?: string;
}) => (
  <section className="bg-white border-b border-gray-200 py-16 md:py-20">
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        {/* Badge */}
        <span
          className="inline-block px-3 py-1 text-sm font-medium rounded-full mb-6 border"
          style={{
            backgroundColor: `${accentColor}10`,
            borderColor: `${accentColor}30`,
            color: accentColor
          }}
        >
          2026 Roadmap
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-5 font-poppins leading-tight text-gray-900">
          {title}
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed mx-auto">
          {description}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <span className="inline-flex items-center gap-2 text-gray-500 text-sm md:text-base">
            <Clock className="w-4 h-4" style={{ color: accentColor }} />
            {duration}
          </span>
          <span className="text-gray-300">•</span>
          <span className="inline-flex items-center gap-2 text-gray-500 text-sm md:text-base">
            <Target className="w-4 h-4" style={{ color: accentColor }} />
            {difficulty}
          </span>
          <span className="text-gray-300">•</span>
          <span className="inline-flex items-center gap-2 text-gray-500 text-sm md:text-base">
            <TrendingUp className="w-4 h-4" style={{ color: accentColor }} />
            High Demand
          </span>
        </div>

        {/* CTA Button */}
        <Link href="#roadmap">
          <Button
            className="rounded-lg font-semibold px-6 py-3 text-base text-white border-0 hover:opacity-90"
            style={{ backgroundColor: accentColor }}
          >
            Start Learning <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

// What is Section
export const WhatIsSection = ({
  title,
  paragraphs,
  responsibilities
}: {
  title: string;
  paragraphs: string[];
  responsibilities: string[];
}) => (
  <section className="py-12 md:py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: Description */}
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1A3D7C] mb-6 font-poppins">
            {title}
          </h2>
          <div className="space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-gray-600 leading-relaxed md:text-lg">{p}</p>
            ))}
          </div>
        </div>

        {/* Right: Responsibilities */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 md:p-8 border border-gray-200">
          <h3 className="font-bold text-[#1A3D7C] mb-6 text-lg md:text-xl">Key Responsibilities</h3>
          <ul className="space-y-4">
            {responsibilities.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// Roadmap Step Item
const RoadmapStepItem = ({
  step,
  isCompleted,
  onToggle,
  color
}: {
  step: RoadmapStep;
  isCompleted: boolean;
  onToggle: () => void;
  color: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative pl-8 pb-6 last:pb-0">
      {/* Vertical line */}
      <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gray-200 last:hidden" />

      {/* Circle indicator */}
      <button
        onClick={onToggle}
        className={`absolute left-0 top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          isCompleted
            ? `${color} border-transparent`
            : 'bg-white border-gray-300 hover:border-gray-400'
        }`}
      >
        {isCompleted && <CheckCircle className="w-4 h-4 text-white" />}
      </button>

      {/* Content */}
      <div
        className={`bg-white border rounded-xl p-4 cursor-pointer transition-all ${
          isCompleted ? 'border-gray-200 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <h4 className={`font-semibold ${isCompleted ? 'text-gray-500' : 'text-[#1A3D7C]'}`}>
            {step.title}
          </h4>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>

        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-gray-600 text-sm mb-3">{step.description}</p>
            <div className="flex flex-wrap gap-2">
              {step.topics.map((topic, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Roadmap Stage Component
const RoadmapStageComponent = ({
  stage,
  stageIndex,
  completedSteps,
  onToggleStep,
  totalStepsBefore
}: {
  stage: RoadmapStage;
  stageIndex: number;
  completedSteps: number[];
  onToggleStep: (stepId: number) => void;
  totalStepsBefore: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(stageIndex === 0);
  const Icon = stage.icon;
  const stageSteps = stage.steps.map((s, i) => ({ ...s, id: totalStepsBefore + i + 1 }));
  const completedInStage = stageSteps.filter(s => completedSteps.includes(s.id)).length;

  return (
    <div className="mb-4">
      {/* Stage Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-all"
      >
        <div className={`w-10 h-10 ${stage.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-bold text-[#1A3D7C]">{stage.title}</h3>
          <p className="text-xs text-gray-500">
            {completedInStage}/{stageSteps.length} completed
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${stage.color} transition-all duration-300`}
              style={{ width: `${(completedInStage / stageSteps.length) * 100}%` }}
            />
          </div>
          <ChevronRight
            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
          />
        </div>
      </button>

      {/* Stage Steps */}
      {isExpanded && (
        <div className="mt-4 ml-4 md:ml-6">
          {stageSteps.map((step) => (
            <RoadmapStepItem
              key={step.id}
              step={step}
              isCompleted={completedSteps.includes(step.id)}
              onToggle={() => onToggleStep(step.id)}
              color={stage.color}
            />
          ))}

          {stage.milestone && (
            <div className="mt-4 p-3 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-xl">
              <p className="text-sm font-medium">{stage.milestone}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Main Roadmap Section
export const RoadmapSection = ({
  stages,
  accentColor
}: {
  stages: RoadmapStage[];
  accentColor: string;
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const totalSteps = stages.reduce((acc, stage) => acc + stage.steps.length, 0);
  const progress = (completedSteps.length / totalSteps) * 100;

  const toggleStep = (stepId: number) => {
    setCompletedSteps(prev =>
      prev.includes(stepId)
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  let stepCounter = 0;

  return (
    <section id="roadmap" className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-[#1A3D7C] mb-3 font-poppins">
            Learning Roadmap
          </h2>
          <p className="text-gray-600 md:text-lg">Click stages to expand, tap circles to mark complete</p>
        </div>

        {/* Progress Bar - Sticky */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-4 md:p-5 rounded-xl border border-gray-200 mb-8 sticky top-0 z-30 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm md:text-base font-medium text-gray-700">Your Progress</span>
              <span className="text-sm md:text-base font-bold" style={{ color: accentColor }}>
                {completedSteps.length}/{totalSteps} steps completed
              </span>
            </div>
            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, backgroundColor: accentColor }}
              />
            </div>
          </div>
        </div>

        {/* Stages - Two column on large screens */}
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
            {stages.map((stage, index) => {
              const component = (
                <RoadmapStageComponent
                  key={index}
                  stage={stage}
                  stageIndex={index}
                  completedSteps={completedSteps}
                  onToggleStep={toggleStep}
                  totalStepsBefore={stepCounter}
                />
              );
              stepCounter += stage.steps.length;
              return component;
            })}
          </div>
        </div>

        {/* Reset Button */}
        {completedSteps.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setCompletedSteps([])}
              className="w-full mt-6 py-3 text-gray-500 text-sm hover:text-gray-700 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-all"
            >
              Reset Progress
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// Salary Section
export const SalarySection = ({
  title,
  usaSalaries,
  indiaSalaries,
  tip,
  gradient
}: {
  title: string;
  usaSalaries: SalaryData[];
  indiaSalaries: SalaryData[];
  tip: string;
  gradient: string;
}) => (
  <section className="py-12 md:py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-8 font-poppins text-center">
        {title}
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* USA */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className={`${gradient} text-white p-4`}>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span className="font-semibold">United States (USD/Year)</span>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {usaSalaries.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-[#1A3D7C] text-sm">{item.level}</p>
                  <p className="text-xs text-gray-500">{item.range}</p>
                </div>
                <p className="font-bold text-[#2BAE66]">{item.avg}</p>
              </div>
            ))}
          </div>
        </div>

        {/* India */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className={`${gradient} text-white p-4`}>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span className="font-semibold">India (INR/Year)</span>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {indiaSalaries.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-[#1A3D7C] text-sm">{item.level}</p>
                  <p className="text-xs text-gray-500">{item.range}</p>
                </div>
                <p className="font-bold text-[#2BAE66]">{item.avg}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tip */}
      <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">{tip}</p>
      </div>
    </div>
  </section>
);

// Projects Section
export const ProjectsSection = ({
  projects
}: {
  projects: ProjectIdea[];
}) => (
  <section className="py-12 md:py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-2 font-poppins text-center">
        Project Ideas
      </h2>
      <p className="text-gray-600 text-center mb-8">Build these to strengthen your portfolio</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-[#1A3D7C]">{project.title}</h3>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                project.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                project.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {project.level}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.skills.map((skill, j) => (
                <span key={j} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// FAQ Section
export const FAQSection = ({
  faqs
}: {
  faqs: FAQData[];
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-bold text-[#1A3D7C] mb-10 font-poppins text-center">
          Frequently Asked Questions
        </h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden h-fit">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium text-[#1A3D7C] pr-4 text-sm md:text-base">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-4 md:px-5 pb-4 md:pb-5">
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Related Roadmaps Section
export const RelatedRoadmapsSection = ({
  roadmaps
}: {
  roadmaps: RelatedRoadmap[];
}) => (
  <section className="py-12 md:py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-8 font-poppins text-center">
        Related Roadmaps
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roadmaps.map((roadmap, i) => {
          const Icon = roadmap.icon;
          return (
            <Link key={i} href={roadmap.href} className="group">
              <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-md transition-all h-full">
                <div className={`w-10 h-10 ${roadmap.color} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-[#1A3D7C] mb-1 group-hover:text-[#2BAE66] transition-colors">
                  {roadmap.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{roadmap.description}</p>
                <span className="inline-flex items-center text-sm font-medium text-[#2BAE66]">
                  View Roadmap <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

// CTA Section
export const CTASection = ({
  title,
  description,
  gradient
}: {
  title: string;
  description: string;
  gradient: string;
}) => (
  <section className={`py-12 md:py-16 ${gradient} text-white`}>
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 font-poppins">{title}</h2>
      <p className="text-white/90 mb-8 md:text-lg">{description}</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/tutoring/free-consultation">
          <Button className="bg-white text-gray-900 hover:bg-white/90 rounded-xl font-semibold w-full sm:w-auto px-8 py-3">
            Book Free Session
          </Button>
        </Link>
        <Link href="/roadmap">
          <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-xl w-full sm:w-auto px-8 py-3">
            All Roadmaps
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

// ==========================================
// VISUAL FLOWCHART ROADMAP (roadmap.sh style)
// ==========================================

export interface FlowchartNode {
  id: string;
  title: string;
  description?: string;
  topics?: string[];
  type: 'main' | 'sub' | 'milestone';
  color?: string;
}

export interface FlowchartStage {
  title: string;
  color: string;
  nodes: FlowchartNode[];
  milestone?: string;
}

// Individual Node Component
const FlowchartNodeItem = ({
  node,
  isCompleted,
  onToggle,
  stageColor
}: {
  node: FlowchartNode;
  isCompleted: boolean;
  onToggle: () => void;
  stageColor: string;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const nodeColors = {
    main: isCompleted ? 'bg-green-500 border-green-600' : `${stageColor} border-gray-300`,
    sub: isCompleted ? 'bg-green-100 border-green-400 text-green-800' : 'bg-white border-gray-300 text-gray-700',
    milestone: 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white border-transparent'
  };

  return (
    <div className="relative group">
      <button
        onClick={onToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          relative px-4 py-2.5 rounded-lg border-2 font-medium text-sm
          transition-all duration-200 hover:shadow-lg hover:scale-105
          ${nodeColors[node.type]}
          ${node.type === 'main' ? 'text-white min-w-[140px]' : ''}
          ${node.type === 'milestone' ? 'min-w-[200px] py-3' : ''}
        `}
      >
        <span className="flex items-center gap-2 justify-center">
          {isCompleted && node.type !== 'milestone' && (
            <CheckCircle className="w-4 h-4" />
          )}
          {node.title}
        </span>
      </button>

      {/* Tooltip with topics */}
      {showTooltip && node.topics && node.topics.length > 0 && (
        <div className="absolute z-50 left-1/2 -translate-x-1/2 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl p-4 min-w-[250px] max-w-[300px]">
          <p className="font-semibold text-[#1A3D7C] mb-2">{node.title}</p>
          {node.description && (
            <p className="text-gray-600 text-xs mb-2">{node.description}</p>
          )}
          <div className="flex flex-wrap gap-1.5">
            {node.topics.map((topic, i) => (
              <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                {topic}
              </span>
            ))}
          </div>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

// Visual Flowchart Section (roadmap.sh style)
export const VisualRoadmapSection = ({
  stages,
  accentColor
}: {
  stages: RoadmapStage[];
  accentColor: string;
}) => {
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);

  // Calculate total nodes
  const totalNodes = stages.reduce((acc, stage) => acc + stage.steps.length, 0);
  const progress = (completedNodes.length / totalNodes) * 100;

  const toggleNode = (nodeId: string) => {
    setCompletedNodes(prev =>
      prev.includes(nodeId)
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  return (
    <section id="roadmap" className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-[#1A3D7C] mb-3 font-poppins">
            Learning Roadmap
          </h2>
          <p className="text-gray-600 md:text-lg mb-6">Click on any topic to mark it as complete</p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Your Progress</span>
              <span className="text-sm font-bold" style={{ color: accentColor }}>
                {completedNodes.length}/{totalNodes} completed
              </span>
            </div>
            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, backgroundColor: accentColor }}
              />
            </div>
          </div>
        </div>

        {/* Visual Flowchart */}
        <div className="relative overflow-x-auto pb-8">
          <div className="min-w-[320px] flex flex-col items-center gap-0">
            {stages.map((stage, stageIndex) => {
              const Icon = stage.icon;
              const stageId = `stage-${stageIndex}`;

              return (
                <div key={stageIndex} className="flex flex-col items-center w-full">
                  {/* Connection Line from previous stage */}
                  {stageIndex > 0 && (
                    <div className="w-1 h-8 bg-gray-300" />
                  )}

                  {/* Stage Header Node */}
                  <div
                    className={`${stage.color} text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm md:text-base">{stage.title}</span>
                  </div>

                  {/* Connection to steps */}
                  <div className="w-1 h-6 bg-gray-300" />

                  {/* Steps Container */}
                  <div className="relative w-full max-w-4xl">
                    {/* Horizontal connecting line */}
                    {stage.steps.length > 1 && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-0.5 bg-gray-300 hidden md:block"
                        style={{ width: `${Math.min(80, stage.steps.length * 20)}%` }}
                      />
                    )}

                    {/* Steps Grid */}
                    <div className={`
                      grid gap-3 md:gap-4 justify-center
                      ${stage.steps.length === 1 ? 'grid-cols-1' : ''}
                      ${stage.steps.length === 2 ? 'grid-cols-1 md:grid-cols-2' : ''}
                      ${stage.steps.length === 3 ? 'grid-cols-1 md:grid-cols-3' : ''}
                      ${stage.steps.length >= 4 ? 'grid-cols-2 md:grid-cols-4' : ''}
                    `}>
                      {stage.steps.map((step, stepIndex) => {
                        const nodeId = `${stageId}-step-${stepIndex}`;
                        const isCompleted = completedNodes.includes(nodeId);

                        return (
                          <div key={stepIndex} className="flex flex-col items-center">
                            {/* Vertical connector on mobile, already have horizontal on desktop */}
                            {stepIndex > 0 && (
                              <div className="w-0.5 h-4 bg-gray-300 md:hidden" />
                            )}

                            <FlowchartNodeItem
                              node={{
                                id: nodeId,
                                title: step.title,
                                description: step.description,
                                topics: step.topics,
                                type: 'sub'
                              }}
                              isCompleted={isCompleted}
                              onToggle={() => toggleNode(nodeId)}
                              stageColor={stage.color}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Milestone */}
                  {stage.milestone && (
                    <>
                      <div className="w-1 h-6 bg-gray-300" />
                      <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white px-6 py-3 rounded-xl text-sm font-medium shadow-lg flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        {stage.milestone}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Reset Button */}
        {completedNodes.length > 0 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setCompletedNodes([])}
              className="px-6 py-2 text-gray-500 text-sm hover:text-gray-700 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-all"
            >
              Reset Progress
            </button>
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
            <span className="text-gray-600">Not Started</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border-2 border-green-400 rounded"></div>
            <span className="text-gray-600">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded"></div>
            <span className="text-gray-600">Milestone</span>
          </div>
        </div>
      </div>
    </section>
  );
};
