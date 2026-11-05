'use client';

import React, { useState, useMemo } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import {
  Home,
  ArrowRight,
  Search,
  Target,
  TrendingUp,
  Settings,
  Rocket,
  Heart,
  Cpu,
  BookOpen,
  Star,
  Filter,
  GraduationCap,
  Layers,
  Zap,
  Users,
  BarChart3,
  Lightbulb
} from 'lucide-react';
import {
  GTM_TERMS,
  GTM_CATEGORIES,
  GTMCategory,
  DifficultyLevel,
  getPriorityTerms,
  getTermsByCategory
} from '@/lib/learning-gtm-data';

const categoryIcons: Record<GTMCategory, React.ElementType> = {
  'fundamentals': Target,
  'sales': TrendingUp,
  'revenue-ops': Settings,
  'growth': Rocket,
  'customer-success': Heart,
  'modern-gtm': Cpu
};

const difficultyColors: Record<DifficultyLevel, { bg: string; text: string; label: string }> = {
  beginner: { bg: 'bg-green-100', text: 'text-green-700', label: 'Beginner' },
  intermediate: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Intermediate' },
  advanced: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Advanced' }
};

export default function LearningGTMPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GTMCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [showPriorityOnly, setShowPriorityOnly] = useState(false);

  const filteredTerms = useMemo(() => {
    return GTM_TERMS.filter(term => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          term.term.toLowerCase().includes(query) ||
          term.meaning.toLowerCase().includes(query) ||
          (term.abbreviation && term.abbreviation.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && term.category !== selectedCategory) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && term.difficulty !== selectedDifficulty) {
        return false;
      }

      // Priority filter
      if (showPriorityOnly && !term.isPriority) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, showPriorityOnly]);

  const priorityTerms = getPriorityTerms();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#1A3D7C] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Learning GTM</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] via-[#2563eb] to-[#2BAE66] text-white py-16 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm mb-6">
            <BookOpen className="w-4 h-4" />
            <span>100 Essential GTM Terms</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Master Go-To-Market Strategy
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Learn 100 essential GTM terms with real-world examples. From ICP and pipeline generation to RevOps and AI-driven selling.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">100</div>
              <div className="text-blue-200 text-sm">GTM Terms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">6</div>
              <div className="text-blue-200 text-sm">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">15</div>
              <div className="text-blue-200 text-sm">Priority Terms</div>
            </div>
          </div>
        </div>
      </section>

      {/* Priority Terms Section */}
      <section className="py-12 px-4 sm:px-6 bg-white border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">15 Terms You Must Know</h2>
              <p className="text-gray-600">Start with these foundational concepts</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {priorityTerms.map((term) => {
              const CategoryIcon = categoryIcons[term.category];
              const categoryInfo = GTM_CATEGORIES.find(c => c.slug === term.category);
              return (
                <Link
                  key={term.slug}
                  href={`/learning-gtm/${term.slug}`}
                  className="group p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg border border-transparent hover:border-gray-200 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${categoryInfo?.color}20` }}
                    >
                      <CategoryIcon className="w-3.5 h-3.5" style={{ color: categoryInfo?.color }} />
                    </div>
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#1A3D7C] transition text-sm leading-tight">
                    {term.abbreviation ? term.abbreviation : term.term}
                  </h3>
                  {term.abbreviation && (
                    <p className="text-xs text-gray-500 mt-0.5">{term.term}</p>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GTM_CATEGORIES.map((category) => {
              const IconComponent = categoryIcons[category.slug];
              const termsInCategory = getTermsByCategory(category.slug);
              return (
                <button
                  key={category.slug}
                  onClick={() => {
                    setSelectedCategory(category.slug);
                    setSearchQuery('');
                    setSelectedDifficulty('all');
                    setShowPriorityOnly(false);
                    document.getElementById('all-terms')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group p-5 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all text-left"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: category.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-gray-900 group-hover:text-[#1A3D7C] transition">
                          {category.name}
                        </h3>
                        <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                          {termsInCategory.length}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section id="all-terms" className="py-8 px-4 sm:px-6 bg-white border-y">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search GTM terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as GTMCategory | 'all')}
                  className="appearance-none pl-4 pr-10 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#1A3D7C] cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  {GTM_CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Difficulty Filter */}
              <div className="relative">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value as DifficultyLevel | 'all')}
                  className="appearance-none pl-4 pr-10 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#1A3D7C] cursor-pointer"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <GraduationCap className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Priority Toggle */}
              <button
                onClick={() => setShowPriorityOnly(!showPriorityOnly)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition ${
                  showPriorityOnly
                    ? 'bg-amber-50 border-amber-200 text-amber-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <Star className={`w-4 h-4 ${showPriorityOnly ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span className="text-sm font-medium">Priority Only</span>
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredTerms.length} of {GTM_TERMS.length} terms
            {selectedCategory !== 'all' && (
              <span> in <strong>{GTM_CATEGORIES.find(c => c.slug === selectedCategory)?.name}</strong></span>
            )}
            {selectedDifficulty !== 'all' && (
              <span> ({selectedDifficulty} level)</span>
            )}
          </div>
        </div>
      </section>

      {/* All Terms Grid */}
      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No terms found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                  setShowPriorityOnly(false);
                }}
                className="mt-4 text-[#1A3D7C] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTerms.map((term) => {
                const CategoryIcon = categoryIcons[term.category];
                const categoryInfo = GTM_CATEGORIES.find(c => c.slug === term.category);
                const difficulty = difficultyColors[term.difficulty];

                return (
                  <Link
                    key={term.slug}
                    href={`/learning-gtm/${term.slug}`}
                    className="group bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${categoryInfo?.color}15` }}
                        >
                          <CategoryIcon className="w-4 h-4" style={{ color: categoryInfo?.color }} />
                        </div>
                        {term.isPriority && (
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        )}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${difficulty.bg} ${difficulty.text}`}>
                        {difficulty.label}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 group-hover:text-[#1A3D7C] transition mb-1">
                      {term.term}
                      {term.abbreviation && (
                        <span className="text-gray-400 font-normal ml-2">({term.abbreviation})</span>
                      )}
                    </h3>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {term.meaning}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500" style={{ color: categoryInfo?.color }}>
                        {categoryInfo?.name}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#1A3D7C] group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Learning Path Suggestion */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm mb-4">
              <Lightbulb className="w-4 h-4" />
              <span>Recommended Learning Path</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">New to GTM? Start Here</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Follow this sequence to build a solid foundation in go-to-market strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Target, title: 'Start with GTM Basics', terms: ['Go-To-Market', 'GTM Motion', 'ICP'], color: '#1A3D7C' },
              { icon: Users, title: 'Understand Your Market', terms: ['TAM/SAM/SOM', 'Positioning', 'Buyer Persona'], color: '#2BAE66' },
              { icon: TrendingUp, title: 'Learn Pipeline', terms: ['Pipeline', 'Lead Generation', 'MQL vs SQL'], color: '#6366f1' },
              { icon: BarChart3, title: 'Master Metrics', terms: ['CAC', 'LTV', 'NRR', 'Churn'], color: '#f59e0b' }
            ].map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 -right-3 w-6 h-0.5 bg-gray-600" />
                  )}
                  <div className="bg-white/5 backdrop-blur rounded-2xl p-5 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${step.color}30` }}
                      >
                        <IconComponent className="w-5 h-5" style={{ color: step.color }} />
                      </div>
                      <span className="text-sm text-gray-400">Step {index + 1}</span>
                    </div>
                    <h3 className="font-semibold mb-3">{step.title}</h3>
                    <div className="space-y-2">
                      {step.terms.map((termName, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                          {termName}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/learning-gtm/go-to-market-gtm"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Start Learning
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to become a GTM expert?
          </h2>
          <p className="text-gray-600 mb-8">
            Bookmark this page and use it as your go-to reference for GTM terminology. Each term includes real-world examples and links to related concepts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/learning-gtm/go-to-market-gtm"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A3D7C] text-white rounded-xl font-semibold hover:bg-[#15325f] transition"
            >
              <BookOpen className="w-4 h-4" />
              Start with GTM Basics
            </Link>
            <Link
              href="/marketing"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              <Layers className="w-4 h-4" />
              Explore Marketing Tools
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
