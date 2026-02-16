'use client';

import Link from 'next/link';
import {
  FileText,
  Download,
  CheckCircle,
  Clock,
  Eye,
  Star,
  ArrowRight,
  Play,
  BookOpen,
  Printer,
  Users,
  MessageCircle
} from 'lucide-react';

// Types
export interface WorksheetTopic {
  id: string;
  title: string;
  slug: string;
  description: string;
  worksheetCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  downloads: string;
  rating: number;
  hasVideo?: boolean;
  hasInteractive?: boolean;
  prerequisites?: string[];
  tags?: string[];
}

export interface WorksheetCategory {
  name: string;
  slug: string;
  description: string;
  topics: WorksheetTopic[];
  icon?: React.ComponentType<{ className?: string }>;
  color: string;
}

// Difficulty Badge Component
export function DifficultyBadge({
  difficulty,
  size = 'sm'
}: {
  difficulty: 'Easy' | 'Medium' | 'Hard';
  size?: 'sm' | 'md' | 'lg';
}) {
  const colors = {
    Easy: 'bg-green-100 text-green-700 border-green-200',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Hard: 'bg-red-100 text-red-700 border-red-200',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <span className={`rounded-full border font-medium ${colors[difficulty]} ${sizes[size]}`}>
      {difficulty}
    </span>
  );
}

// Time Badge Component
export function TimeBadge({ time }: { time: string }) {
  return (
    <span className="inline-flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
      <Clock className="w-3 h-3 mr-1" />
      {time}
    </span>
  );
}

// Rating Display Component
export function RatingDisplay({ rating, reviews }: { rating: number; reviews?: number }) {
  return (
    <div className="flex items-center">
      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
      <span className="font-medium text-gray-800">{rating.toFixed(1)}</span>
      {reviews && (
        <span className="text-gray-400 text-sm ml-1">({reviews})</span>
      )}
    </div>
  );
}

// Worksheet Topic Card Component
export function WorksheetTopicCard({
  topic,
  grade,
  subject,
  basePath
}: {
  topic: WorksheetTopic;
  grade: number;
  subject: string;
  basePath: string;
}) {
  return (
    <Link
      href={`${basePath}/${topic.slug}`}
      className="group bg-white rounded-xl p-5 border-2 border-gray-100 hover:border-blue-500 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              {topic.title}
            </h3>
            <p className="text-xs text-gray-500">{topic.worksheetCount} worksheets</p>
          </div>
        </div>
        <DifficultyBadge difficulty={topic.difficulty} />
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{topic.description}</p>

      {/* Tags */}
      {topic.tags && topic.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {topic.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Features */}
      <div className="flex items-center gap-3 mb-3">
        <TimeBadge time={topic.estimatedTime} />
        {topic.hasVideo && (
          <span className="inline-flex items-center text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
            <Play className="w-3 h-3 mr-1" /> Video
          </span>
        )}
        {topic.hasInteractive && (
          <span className="inline-flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <CheckCircle className="w-3 h-3 mr-1" /> Interactive
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-500">
          <Download className="w-4 h-4 mr-1" />
          <span>{topic.downloads}</span>
        </div>
        <RatingDisplay rating={topic.rating} />
      </div>
    </Link>
  );
}

// Worksheet Category Section Component
export function WorksheetCategorySection({
  category,
  grade,
  basePath
}: {
  category: WorksheetCategory;
  grade: number;
  basePath: string;
}) {
  return (
    <section className="mb-12">
      <div className="flex items-center mb-6">
        <div className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mr-3`}>
          {category.icon && <category.icon className="w-5 h-5 text-white" />}
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{category.name}</h2>
          <p className="text-sm text-gray-500">{category.description}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {category.topics.map((topic) => (
          <WorksheetTopicCard
            key={topic.id}
            topic={topic}
            grade={grade}
            subject={category.slug}
            basePath={basePath}
          />
        ))}
      </div>
    </section>
  );
}

// Quick Actions Bar Component
export function QuickActionsBar({
  downloadAllHref,
  practiceHref,
  tutorialHref
}: {
  downloadAllHref?: string;
  practiceHref?: string;
  tutorialHref?: string;
}) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-8 border border-blue-100">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {downloadAllHref && (
          <Link
            href={downloadAllHref}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4 mr-2" />
            Download All PDFs
          </Link>
        )}
        {practiceHref && (
          <Link
            href={practiceHref}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            <Play className="w-4 h-4 mr-2" />
            Practice Online
          </Link>
        )}
        {tutorialHref && (
          <Link
            href={tutorialHref}
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Watch Tutorials
          </Link>
        )}
      </div>
    </div>
  );
}

// Stats Banner Component
export function StatsBanner({
  totalWorksheets,
  totalDownloads,
  averageRating
}: {
  totalWorksheets: number;
  totalDownloads: string;
  averageRating: number;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
        <FileText className="w-6 h-6 text-blue-600 mx-auto mb-2" />
        <p className="text-2xl font-bold text-gray-800">{totalWorksheets}</p>
        <p className="text-xs text-gray-500">Worksheets</p>
      </div>
      <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
        <Download className="w-6 h-6 text-green-600 mx-auto mb-2" />
        <p className="text-2xl font-bold text-gray-800">{totalDownloads}</p>
        <p className="text-xs text-gray-500">Downloads</p>
      </div>
      <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
        <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
        <p className="text-2xl font-bold text-gray-800">{averageRating.toFixed(1)}</p>
        <p className="text-xs text-gray-500">Avg Rating</p>
      </div>
    </div>
  );
}

// Tutor Help CTA Component
export function TutorHelpCTA() {
  return (
    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 sm:p-8 text-white text-center my-8">
      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
        <MessageCircle className="w-7 h-7" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold mb-3">Need Help with These Topics?</h3>
      <p className="text-white/90 mb-6 max-w-xl mx-auto">
        Our expert tutors can explain concepts, solve problems with you, and help you master these worksheets.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/tutoring/free-consultation"
          className="inline-flex items-center justify-center px-6 py-3 bg-white text-green-600 rounded-xl hover:bg-green-50 transition-all font-semibold"
        >
          Get Free Help
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
        <Link
          href="/homework-help"
          className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white border-2 border-white/30 rounded-xl hover:bg-white/20 transition-all font-semibold"
        >
          Homework Help
        </Link>
      </div>
    </div>
  );
}

// Prerequisite Notice Component
export function PrerequisiteNotice({ prerequisites }: { prerequisites: string[] }) {
  if (!prerequisites || prerequisites.length === 0) return null;

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
      <div className="flex items-start">
        <BookOpen className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
        <div>
          <p className="font-medium text-yellow-800 mb-2">Before you start, make sure you know:</p>
          <div className="flex flex-wrap gap-2">
            {prerequisites.map((prereq) => (
              <span key={prereq} className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                {prereq}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Grade Navigation Component
export function GradeNavigation({
  currentGrade,
  basePath = '/worksheets/grade-'
}: {
  currentGrade: number;
  basePath?: string;
}) {
  const grades = [6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
      {grades.map((grade) => (
        <Link
          key={grade}
          href={`${basePath}${grade}`}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
            grade === currentGrade
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Grade {grade}
        </Link>
      ))}
    </div>
  );
}

// Download Button Component
export function DownloadButton({
  href,
  label = 'Download PDF',
  variant = 'primary'
}: {
  href: string;
  label?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}) {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    outline: 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50',
  };

  return (
    <Link
      href={href}
      className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all ${variants[variant]}`}
    >
      <Download className="w-4 h-4 mr-2" />
      {label}
    </Link>
  );
}

// Related Worksheets Component
export function RelatedWorksheets({
  worksheets
}: {
  worksheets: { title: string; href: string; grade: number }[]
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 mt-8">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-blue-600" />
        Related Worksheets
      </h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {worksheets.map((worksheet, index) => (
          <Link
            key={index}
            href={worksheet.href}
            className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-sm transition-all"
          >
            <span className="text-sm text-gray-700">{worksheet.title}</span>
            <span className="text-xs text-gray-400">Grade {worksheet.grade}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
