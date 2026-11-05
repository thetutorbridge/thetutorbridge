'use client';

import React from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import {
  Home,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Target,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Star,
  ChevronRight,
  ExternalLink,
  TrendingUp,
  Settings,
  Rocket,
  Heart,
  Cpu,
  GraduationCap,
  Share2,
  Bookmark
} from 'lucide-react';
import {
  GTMTerm,
  GTMCategory,
  GTM_CATEGORIES,
  getRelatedTerms,
  getNextTerm,
  getPreviousTerm,
  getCategoryInfo,
  DifficultyLevel
} from '@/lib/learning-gtm-data';
import { getGTMMarketingResources } from '@/lib/content-relationships';
import { CategoryIllustration } from './gtm-illustrations';

interface GTMLessonContentProps {
  term: GTMTerm;
}

const categoryIcons: Record<GTMCategory, React.ElementType> = {
  'fundamentals': Target,
  'sales': TrendingUp,
  'revenue-ops': Settings,
  'growth': Rocket,
  'customer-success': Heart,
  'modern-gtm': Cpu
};

const difficultyConfig: Record<DifficultyLevel, { bg: string; text: string; label: string; description: string }> = {
  beginner: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    label: 'Beginner',
    description: 'Great starting point for GTM learning'
  },
  intermediate: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    label: 'Intermediate',
    description: 'Builds on foundational concepts'
  },
  advanced: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    label: 'Advanced',
    description: 'Deep expertise required'
  }
};

export default function GTMLessonContent({ term }: GTMLessonContentProps) {
  const categoryInfo = getCategoryInfo(term.category);
  const CategoryIcon = categoryIcons[term.category];
  const relatedTerms = getRelatedTerms(term);
  const nextTerm = getNextTerm(term.slug);
  const previousTerm = getPreviousTerm(term.slug);
  const difficulty = difficultyConfig[term.difficulty];
  const marketingResources = getGTMMarketingResources(term.slug);

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${term.term}${term.abbreviation ? ` (${term.abbreviation})` : ''} - GTM Term Explained`,
    description: term.meaning,
    author: {
      '@type': 'Organization',
      name: 'The Tutor Bridge'
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Tutor Bridge',
      url: 'https://thetutorbridge.com'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://thetutorbridge.com/learning-gtm/${term.slug}`
    },
    articleSection: categoryInfo?.name,
    keywords: [term.term, term.abbreviation, 'GTM', 'go-to-market', categoryInfo?.name].filter(Boolean).join(', ')
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 overflow-x-auto">
            <Link href="/" className="hover:text-[#1A3D7C] flex items-center flex-shrink-0">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <Link href="/learning-gtm" className="hover:text-[#1A3D7C] flex-shrink-0">
              Learning GTM
            </Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <span className="text-gray-900 font-medium truncate">{term.term}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section
        className="py-12 md:py-16 px-4 sm:px-6"
        style={{
          background: `linear-gradient(135deg, ${categoryInfo?.color}15 0%, ${categoryInfo?.color}05 100%)`
        }}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Text content */}
            <div>
              {/* Category and badges */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Link
                  href={`/learning-gtm?category=${term.category}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition hover:opacity-80"
                  style={{ backgroundColor: `${categoryInfo?.color}20`, color: categoryInfo?.color }}
                >
                  <CategoryIcon className="w-4 h-4" />
                  {categoryInfo?.name}
                </Link>
                <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${difficulty.bg} ${difficulty.text}`}>
                  <GraduationCap className="w-4 h-4 inline mr-1" />
                  {difficulty.label}
                </span>
                {term.isPriority && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-amber-100 text-amber-700">
                    <Star className="w-4 h-4 fill-amber-400" />
                    Must Know
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {term.term}
                {term.abbreviation && (
                  <span className="text-gray-400 font-normal ml-3">({term.abbreviation})</span>
                )}
              </h1>

              {/* Quick definition */}
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                {term.meaning}
              </p>

              {/* Quick actions */}
              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={() => {
                    navigator.share?.({
                      title: `${term.term} - GTM Term`,
                      url: window.location.href
                    });
                  }}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
                  <Bookmark className="w-4 h-4" />
                  Bookmark
                </button>
              </div>
            </div>

            {/* Illustration */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-3xl blur-3xl opacity-20"
                  style={{ backgroundColor: categoryInfo?.color }}
                />
                <CategoryIllustration
                  category={term.category}
                  className="w-64 h-64 relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content - 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key Points */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${categoryInfo?.color}15` }}
                  >
                    <CheckCircle className="w-5 h-5" style={{ color: categoryInfo?.color }} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Key Points to Remember</h2>
                </div>
                <ul className="space-y-4">
                  {term.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: `${categoryInfo?.color}15` }}
                      >
                        <span className="text-xs font-bold" style={{ color: categoryInfo?.color }}>
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-gray-700">{point}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Real-World Example */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 md:p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                  </div>
                  <h2 className="text-xl font-bold">Real-World Example</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">{term.example}</p>
              </div>

              {/* Common Mistakes (if available) */}
              {term.commonMistakes && term.commonMistakes.length > 0 && (
                <div className="bg-red-50 rounded-2xl p-6 md:p-8 border border-red-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Common Mistakes to Avoid</h2>
                  </div>
                  <ul className="space-y-3">
                    {term.commonMistakes.map((mistake, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-red-500 mt-1">✕</span>
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Navigation between terms */}
              <div className="flex flex-col sm:flex-row gap-4">
                {previousTerm && (
                  <Link
                    href={`/learning-gtm/${previousTerm.slug}`}
                    className="flex-1 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition group"
                  >
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <ArrowLeft className="w-4 h-4" />
                      Previous Term
                    </div>
                    <div className="font-semibold text-gray-900 group-hover:text-[#1A3D7C]">
                      {previousTerm.term}
                    </div>
                  </Link>
                )}
                {nextTerm && (
                  <Link
                    href={`/learning-gtm/${nextTerm.slug}`}
                    className="flex-1 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition group text-right"
                  >
                    <div className="flex items-center justify-end gap-2 text-sm text-gray-500 mb-1">
                      Next Term
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <div className="font-semibold text-gray-900 group-hover:text-[#1A3D7C]">
                      {nextTerm.term}
                    </div>
                  </Link>
                )}
              </div>
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-6">
              {/* Difficulty Info */}
              <div className={`rounded-2xl p-5 ${difficulty.bg}`}>
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className={`w-5 h-5 ${difficulty.text}`} />
                  <span className={`font-semibold ${difficulty.text}`}>{difficulty.label} Level</span>
                </div>
                <p className={`text-sm ${difficulty.text} opacity-80`}>{difficulty.description}</p>
              </div>

              {/* Related Terms */}
              {relatedTerms.length > 0 && (
                <div className="bg-white rounded-2xl p-5 border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-gray-400" />
                    Related Terms
                  </h3>
                  <div className="space-y-3">
                    {relatedTerms.slice(0, 6).map((related) => {
                      const relatedCategoryInfo = getCategoryInfo(related.category);
                      const RelatedIcon = categoryIcons[related.category];
                      return (
                        <Link
                          key={related.slug}
                          href={`/learning-gtm/${related.slug}`}
                          className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition group"
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${relatedCategoryInfo?.color}15` }}
                          >
                            <RelatedIcon className="w-4 h-4" style={{ color: relatedCategoryInfo?.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 group-hover:text-[#1A3D7C] truncate">
                              {related.term}
                              {related.abbreviation && (
                                <span className="text-gray-400 font-normal ml-1">({related.abbreviation})</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">{relatedCategoryInfo?.name}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#1A3D7C] flex-shrink-0" />
                        </Link>
                      );
                    })}
                  </div>
                  {relatedTerms.length > 6 && (
                    <Link
                      href={`/learning-gtm?search=${term.term}`}
                      className="block text-center text-sm text-[#1A3D7C] font-medium mt-4 hover:underline"
                    >
                      View all related terms →
                    </Link>
                  )}
                </div>
              )}

              {/* Marketing Resources (if available) */}
              {marketingResources.length > 0 && (
                <div className="bg-white rounded-2xl p-5 border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-gray-400" />
                    Marketing Resources
                  </h3>
                  <div className="space-y-3">
                    {marketingResources.map((resource, index) => (
                      <Link
                        key={index}
                        href={resource.href}
                        className="block p-3 -mx-1 rounded-lg hover:bg-gray-50 transition group"
                      >
                        <div className="font-medium text-gray-900 group-hover:text-[#1A3D7C] mb-1">
                          {resource.title}
                        </div>
                        <p className="text-xs text-gray-500">{resource.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Info */}
              <div
                className="rounded-2xl p-5"
                style={{ backgroundColor: `${categoryInfo?.color}10` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${categoryInfo?.color}20` }}
                  >
                    <CategoryIcon className="w-5 h-5" style={{ color: categoryInfo?.color }} />
                  </div>
                  <span className="font-bold text-gray-900">{categoryInfo?.name}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{categoryInfo?.description}</p>
                <Link
                  href={`/learning-gtm?category=${term.category}`}
                  className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                  style={{ color: categoryInfo?.color }}
                >
                  Explore {categoryInfo?.termCount} terms in this category
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>

              {/* Back to Hub */}
              <Link
                href="/learning-gtm"
                className="block w-full p-4 bg-white rounded-xl border border-gray-200 text-center font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition"
              >
                ← Back to All GTM Terms
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 sm:px-6 bg-white border-t">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Continue Your GTM Education
          </h2>
          <p className="text-gray-600 mb-6">
            Master all 100 GTM terms to become a go-to-market expert. Each term includes real-world examples and connects to related concepts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {nextTerm && (
              <Link
                href={`/learning-gtm/${nextTerm.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A3D7C] text-white rounded-xl font-semibold hover:bg-[#15325f] transition"
              >
                Next: {nextTerm.term}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Link
              href="/learning-gtm"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              <BookOpen className="w-4 h-4" />
              Browse All Terms
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
