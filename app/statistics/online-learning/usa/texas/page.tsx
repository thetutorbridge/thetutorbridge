'use client';

import React from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  BookOpen,
  GraduationCap,
  ChevronDown,
  Home,
  Calendar,
  ExternalLink,
  BarChart3,
  Target,
  Zap,
  AlertCircle,
  CheckCircle,
  Laptop,
  Brain,
  School,
  Linkedin,
  MapPin,
  Building,
  UserMinus
} from 'lucide-react';

// ============================================================================
// VERIFIED DATA ARRAYS FOR CHARTS
// Sources cited with each data point
// ============================================================================

// TEA Enrollment Report 2024-25
const enrollmentTrendData = [
  { year: '2019-20', enrollment: 5.43 },
  { year: '2020-21', enrollment: 5.37 },
  { year: '2021-22', enrollment: 5.43 },
  { year: '2022-23', enrollment: 5.49 },
  { year: '2023-24', enrollment: 5.53 },
  { year: '2024-25', enrollment: 5.54 },
];

// TEA STAAR Results 2024
const staarScoresData = [
  { subject: 'Reading/RLA', meets: 49, prePandemic: 54 },
  { subject: 'Math', meets: 41, prePandemic: 52 },
  { subject: 'Algebra I', meets: 45, prePandemic: 62 },
  { subject: 'English II', meets: 60, prePandemic: 68 },
];

// TEA Enrollment Demographics 2024-25
const studentDemographicsData = [
  { name: 'Hispanic/Latino', value: 53.5, color: '#f59e0b' },
  { name: 'White', value: 24.4, color: '#3b82f6' },
  { name: 'Black/African American', value: 12.8, color: '#8b5cf6' },
  { name: 'Asian', value: 5.6, color: '#10b981' },
  { name: 'Multiracial/Other', value: 3.7, color: '#6b7280' },
];

// TEA/Stride K12 Virtual School Data 2024-25
const virtualSchoolGrowthData = [
  { year: '2014', students: 5000 },
  { year: '2017', students: 12000 },
  { year: '2020', students: 28000 },
  { year: '2022', students: 45000 },
  { year: '2024', students: 62200 },
];

// TEA Teacher Certification Data
const uncertifiedTeachersData = [
  { year: '2019-20', percentage: 3.8 },
  { year: '2020-21', percentage: 5.2 },
  { year: '2021-22', percentage: 7.1 },
  { year: '2022-23', percentage: 9.4 },
  { year: '2023-24', percentage: 10.8 },
  { year: '2024-25', percentage: 12.0 },
];

// TEA/CHILDREN AT RISK Chronic Absenteeism Data
const chronicAbsenteeismData = [
  { year: '2018-19', rate: 11 },
  { year: '2019-20', rate: 12 },
  { year: '2020-21', rate: 18 },
  { year: '2021-22', rate: 24.2 },
  { year: '2022-23', rate: 20 },
  { year: '2023-24', rate: 19 },
];

const COLORS = ['#f59e0b', '#3b82f6', '#8b5cf6', '#10b981', '#6b7280', '#ec4899'];

// ============================================================================
// VERIFIED CITATIONS - All stats link to exact source pages
// ============================================================================

const citations = [
  { id: 1, name: 'TEA - Enrollment in Texas Public Schools 2024-25', url: 'https://tea.texas.gov/reports-and-data/school-performance/accountability-research/enroll-2024-25.pdf' },
  { id: 2, name: 'TEA - 2024 STAAR 3-8 Assessment Results', url: 'https://tea.texas.gov/about-tea/news-and-multimedia/news-releases/news-2024/tea-releases-results-for-2024-staar-3-8-assessments' },
  { id: 3, name: 'TEA - 2024 STAAR End-of-Course Results', url: 'https://tea.texas.gov/about-tea/news-and-multimedia/news-releases/news-2024/tea-releases-2024-staar-end-of-course-assessment-results' },
  { id: 4, name: 'TEA - Actual Financial Data 2024-25', url: 'https://tea.texas.gov/finance-and-grants/state-funding/state-funding-reports-and-data/peims-financial-standard-reports' },
  { id: 5, name: 'Houston Chronicle - Texas Virtual School Enrollment', url: 'https://www.houstonchronicle.com/news/houston-texas/education/article/virtual-school-expansion-texas-20785112.php' },
  { id: 6, name: 'The Texan - Uncertified Teachers in Texas', url: 'https://thetexan.news/issues/education/tea-data-shows-percentage-of-uncertified-teachers-in-texas-tripled-in-last-five-years/article_cfb0e326-3a0b-4786-a8dd-392912404f68.html' },
  { id: 7, name: 'Learning Policy Institute - State Teacher Shortages 2024', url: 'https://learningpolicyinstitute.org/product/state-teacher-shortages-vacancy-resource-tool-2024' },
  { id: 8, name: 'Dallas Morning News - Texas Chronic Absenteeism', url: 'https://www.dallasnews.com/news/education/2024/08/15/1-in-5-texas-students-considered-chronically-absent-new-analysis-reveals/' },
  { id: 9, name: 'Rice University Kinder Institute - Texas Absenteeism', url: 'https://kinder.rice.edu/urbanedge/1-5-texas-students-are-still-missing-lots-school-and-attendance-isnt-getting-much-better' },
  { id: 10, name: 'Texas 2036 - STAAR Results Analysis', url: 'https://texas2036.org/news-analysis/staar-results-are-in-your-questions-answered/' },
  { id: 11, name: 'KRLD/Audacy - Texas K-12 Spending $104 Billion', url: 'https://www.audacy.com/krld/news/local/texas-k-12-spending-reaches-104-billion-nearly-19000-per-student' },
  { id: 12, name: 'Texas Tribune - Uncertified Teachers', url: 'https://www.texastribune.org/2024/09/04/texas-uncertified-teachers-staff-shortages/' },
  { id: 13, name: 'TXVSN - Texas Virtual School Network', url: 'https://txvsn.org/' },
  { id: 14, name: 'Texas Home School Coalition - Homeschool Facts', url: 'https://thsc.org/homeschooling-facts/' },
  { id: 15, name: 'AEI - Chronic Absenteeism Report 2024', url: 'https://www.aei.org/research-products/report/lingering-absence-in-public-schools-tracking-post-pandemic-chronic-absenteeism-into-2024/' },
];

// ============================================================================
// VERIFIED FAQ DATA
// ============================================================================

const faqs = [
  {
    question: 'How many students are enrolled in Texas public schools?',
    answer: 'Texas public schools enrolled 5,544,255 students in the 2024-25 school year according to the Texas Education Agency, making it the second-largest public school system in the nation after California. This represents a 0.2% increase (+13,019 students) from the prior year.'
  },
  {
    question: 'What percentage of Texas students meet grade level on STAAR tests?',
    answer: 'In 2024, 49% of Texas students in grades 3-8 met grade level standards in reading/language arts, and approximately 41% met grade level in math. Math performance remains 10+ percentage points below pre-pandemic (2019) levels. In Algebra I, 45% met grade level, which is 17 points below 2019.'
  },
  {
    question: 'How many students attend online/virtual schools in Texas?',
    answer: 'Approximately 62,200 Texas students were enrolled in full-time virtual schools in 2024-25, according to TEA data. This represents a 1,200% increase from fewer than 5,000 students in 2014. There are now 24 full-time virtual schools operating statewide through the Texas Virtual School Network (TXVSN).'
  },
  {
    question: 'What is Texas chronic absenteeism rate?',
    answer: '19% of Texas students were chronically absent (missing 10%+ of school days) in 2023-24. This has improved from a peak of 24.2% in 2021-22 but remains well above the pre-pandemic rate of 11% in 2018-19. Economically disadvantaged students have a higher rate at 23.1%.'
  },
  {
    question: 'How much does Texas spend per student on education?',
    answer: 'Texas spent $104.89 billion on K-12 education in 2024-25, equaling $18,972 per pupil from all sources (including facilities and debt). For current operating spending, Texas spends $12,895 per pupil, ranking 47th nationally and about $4,700 below the national average.'
  },
  {
    question: 'How severe is Texas teacher shortage?',
    answer: '12% of Texas teachers were uncertified in 2024-25, up from 3.8% in 2019-20—a tripling in five years. This equals 42,100 uncertified teachers. Additionally, 34% of newly hired teachers in 2023-24 had no Texas teaching certification. Houston ISD has the highest rate at 20.58% uncertified.'
  },
  {
    question: 'What are Texas student demographics?',
    answer: 'Texas public schools are majority-minority: Hispanic/Latino students make up 53.5% of enrollment, followed by White (24.4%), Black/African American (12.8%), Asian (5.6%), and multiracial/other (3.7%). White enrollment declined by 31,585 students (-2.3%) from 2023-24 to 2024-25.'
  },
  {
    question: 'How many homeschooled students are in Texas?',
    answer: 'There is no official count because Texas does not require homeschool registration. The Texas Home School Coalition estimates 500,000-750,000 students are homeschooled, and data indicates approximately 50,000 students withdraw from public schools to homeschool each year.'
  },
  {
    question: 'What is the largest school district in Texas?',
    answer: 'Houston Independent School District (HISD) is the largest district in Texas with approximately 187,000 students. It is also the 8th largest district in the United States. Dallas ISD is second largest in Texas with about 140,000 students.'
  },
  {
    question: 'How is Texas recovering from COVID learning loss?',
    answer: 'Recovery has been slow. Math scores remain 10+ percentage points below 2019 levels across all grades. Reading has recovered better, with some grades now exceeding pre-pandemic levels. The TEA reports gains in grades 4 and 6 reading, but declines in grades 3, 5, and 8.'
  }
];

// ============================================================================
// COMPONENTS
// ============================================================================

interface StatCardProps {
  value: string;
  label: string;
  subtext?: string;
  icon: React.ReactNode;
  color: string;
  sourceId?: number;
  trend?: 'up' | 'down' | 'neutral';
}

const StatCard = ({ value, label, subtext, icon, color, sourceId, trend }: StatCardProps) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div className="flex items-center gap-2">
        {trend && (
          <span className={`text-xs px-2 py-1 rounded-full ${trend === 'up' ? 'bg-emerald-100 text-emerald-600' : trend === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
            {trend === 'up' ? <TrendingUp className="w-3 h-3 inline" /> : trend === 'down' ? <TrendingDown className="w-3 h-3 inline" /> : null}
          </span>
        )}
        {sourceId && (
          <span className="text-xs text-gray-400 font-mono">[{sourceId}]</span>
        )}
      </div>
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-gray-600 text-sm font-medium">{label}</div>
    {subtext && <div className="text-gray-400 text-xs mt-1">{subtext}</div>}
  </div>
);

interface ChartWrapperProps {
  title: string;
  children: React.ReactNode;
  sourceIds?: number[];
}

const ChartWrapper = ({ title, children, sourceIds }: ChartWrapperProps) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {sourceIds && sourceIds.length > 0 && (
        <span className="text-xs text-gray-400 font-mono">
          Sources: [{sourceIds.join(', ')}]
        </span>
      )}
    </div>
    {children}
  </div>
);

// ============================================================================
// TABLE OF CONTENTS
// ============================================================================

const tableOfContents = [
  { id: 'key-takeaways', label: 'Key Takeaways', icon: Zap },
  { id: 'enrollment', label: 'K-12 Enrollment', icon: Users },
  { id: 'test-scores', label: 'STAAR Test Scores', icon: Target },
  { id: 'virtual-schools', label: 'Virtual Schools', icon: Laptop },
  { id: 'teacher-shortage', label: 'Teacher Shortage', icon: AlertCircle },
  { id: 'chronic-absenteeism', label: 'Chronic Absenteeism', icon: UserMinus },
  { id: 'spending', label: 'Education Spending', icon: DollarSign },
  { id: 'demographics', label: 'Demographics', icon: Users },
  { id: 'faq', label: 'FAQ', icon: BookOpen },
  { id: 'sources', label: 'Sources', icon: ExternalLink },
];

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function TexasStatsPage() {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);
  const lastUpdated = 'October 2025';

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Schema Markup - Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Texas Online Learning Statistics 2025: 100+ Facts & Data",
            "description": "Comprehensive Texas online learning and education statistics including K-12 enrollment, STAAR test scores, virtual schools, and teacher shortage data.",
            "author": {
              "@type": "Organization",
              "name": "The Tutor Bridge",
              "url": "https://www.thetutorbridge.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "The Tutor Bridge",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.thetutorbridge.com/logo.png"
              }
            },
            "datePublished": "2025-01-20",
            "dateModified": new Date().toISOString(),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.thetutorbridge.com/statistics/online-learning/usa/texas"
            }
          })
        }}
      />

      {/* Schema Markup - Dataset */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dataset",
            "name": "Texas Online Learning Statistics 2025",
            "description": "Comprehensive dataset of Texas education, online learning, and K-12 statistics",
            "url": "https://www.thetutorbridge.com/statistics/online-learning/usa/texas",
            "keywords": ["Texas", "education", "online learning", "K-12", "virtual schools", "STAAR"],
            "creator": {
              "@type": "Organization",
              "name": "The Tutor Bridge"
            },
            "temporalCoverage": "2018/2025",
            "spatialCoverage": "Texas, United States"
          })
        }}
      />

      {/* Schema Markup - FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />

      {/* Schema Markup - BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.thetutorbridge.com" },
              { "@type": "ListItem", "position": 2, "name": "Statistics", "item": "https://www.thetutorbridge.com/statistics" },
              { "@type": "ListItem", "position": 3, "name": "Online Learning", "item": "https://www.thetutorbridge.com/statistics/online-learning" },
              { "@type": "ListItem", "position": 4, "name": "USA", "item": "https://www.thetutorbridge.com/statistics/online-learning/usa" },
              { "@type": "ListItem", "position": 5, "name": "Texas", "item": "https://www.thetutorbridge.com/statistics/online-learning/usa/texas" }
            ]
          })
        }}
      />

      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 py-3 px-4 sm:px-6 sticky top-0 z-40">
        <div className="container mx-auto max-w-6xl">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-slate-900 flex items-center transition-colors">
              <Home className="w-3.5 h-3.5 mr-1" />
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-500">Statistics</span>
            <span className="text-gray-300">/</span>
            <Link href="/statistics/online-learning/usa" className="hover:text-slate-900 transition-colors">
              USA
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-slate-900 font-medium">Texas</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 50%, #1e3a5f 100%)' }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

        <div className="relative py-16 md:py-24 px-4 sm:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            {/* State Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 text-sm mb-4">
              <MapPin className="w-4 h-4 text-red-400" />
              <span className="text-red-200 font-medium">State of Texas</span>
            </div>

            {/* Last Updated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-6 ml-2">
              <Calendar className="w-4 h-4 text-blue-300" />
              <span className="text-gray-200">Last Updated: {lastUpdated}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
              Texas Online Learning
              <span className="block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #ef4444, #dc2626)' }}>
                Statistics 2025
              </span>
            </h1>

            {/* Author Byline */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <img
                src="/rishabh-jain.webp"
                alt="Rishabh Jain"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white/30"
              />
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-300">By</span>
                <a
                  href="https://www.linkedin.com/in/rishabh-jain-33b946214/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white hover:text-red-300 transition-colors flex items-center gap-1"
                >
                  Rishabh Jain
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
              Comprehensive education statistics for the <span className="text-white font-semibold">second-largest K-12 system in the nation</span>.
              <span className="text-red-400 font-semibold"> 100+ verified data points</span> from <span className="text-white font-semibold">15+ authoritative sources</span>.
            </p>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-3xl md:text-4xl font-bold text-white">5.54M</div>
                <div className="text-sm text-gray-300 mt-1">K-12 Students</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-3xl md:text-4xl font-bold text-red-400">41%</div>
                <div className="text-sm text-gray-300 mt-1">Math Proficiency</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-3xl md:text-4xl font-bold text-amber-400">$18.9K</div>
                <div className="text-sm text-gray-300 mt-1">Per Pupil Spending</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-3xl md:text-4xl font-bold text-blue-400">62.2K</div>
                <div className="text-sm text-gray-300 mt-1">Virtual School Students</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents - Horizontal */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Table of Contents</h2>
          <nav className="flex flex-wrap gap-2">
            {tableOfContents.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors border border-gray-100 hover:border-red-200"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 pb-12">
        <main className="space-y-12">
          {/* Key Takeaways */}
          <section id="key-takeaways" className="scroll-mt-24">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Key Texas Takeaways</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { stat: '5.54 million', text: 'students in TX public schools - 2nd largest in US [1]' },
                  { stat: '41%', text: 'of students meet math standards (vs 52% pre-COVID) [2]' },
                  { stat: '49%', text: 'of students meet reading/RLA standards [2]' },
                  { stat: '62,200', text: 'students in virtual schools - up 1,200% since 2014 [5]' },
                  { stat: '12%', text: 'of teachers uncertified (up from 3.8% in 2019) [6]' },
                  { stat: '19%', text: 'chronic absenteeism rate (down from 24% peak) [8]' },
                  { stat: '$104.9B', text: 'total K-12 education spending [11]' },
                  { stat: '$18,972', text: 'per pupil spending (ranks 47th nationally) [4]' },
                  { stat: '53.5%', text: 'of students are Hispanic/Latino [1]' },
                  { stat: '42,100', text: 'uncertified teachers in Texas schools [6]' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white/60 rounded-xl p-4">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-900">{item.stat}</span>
                      <span className="text-gray-600"> — {item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* K-12 Enrollment */}
          <section id="enrollment" className="scroll-mt-24 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">K-12 Enrollment Statistics</h2>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Texas operates the second-largest K-12 public school system in the nation. Unlike many states,
              Texas enrollment has been growing, reaching a peak of 5.54 million students in 2024-25.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                value="5.54M"
                label="Total Enrollment"
                subtext="2024-25 school year"
                icon={<Users className="w-6 h-6 text-blue-600" />}
                color="bg-blue-100"
                sourceId={1}
              />
              <StatCard
                value="+13,019"
                label="Annual Change"
                subtext="+0.2% from prior year"
                icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
                color="bg-emerald-100"
                sourceId={1}
                trend="up"
              />
              <StatCard
                value="1,200+"
                label="School Districts"
                subtext="Plus charter schools"
                icon={<School className="w-6 h-6 text-violet-600" />}
                color="bg-violet-100"
                sourceId={1}
              />
              <StatCard
                value="371,144"
                label="Total Teachers"
                subtext="In Texas public schools"
                icon={<GraduationCap className="w-6 h-6 text-amber-600" />}
                color="bg-amber-100"
                sourceId={7}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <ChartWrapper title="Texas K-12 Enrollment Trend (Millions)" sourceIds={[1]}>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={enrollmentTrendData}>
                    <defs>
                      <linearGradient id="colorEnrollmentTX" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} domain={[5.2, 5.6]} />
                    <Tooltip formatter={(value: number) => [`${value}M`, 'Enrollment']} />
                    <Area type="monotone" dataKey="enrollment" stroke="#3b82f6" fill="url(#colorEnrollmentTX)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartWrapper>

              <ChartWrapper title="Student Demographics (2024-25)" sourceIds={[1]}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={studentDemographicsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ value }) => `${value}%`}
                    >
                      {studentDemographicsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${value}%`, 'Share']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </div>
          </section>

          {/* STAAR Test Scores */}
          <section id="test-scores" className="scroll-mt-24 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">STAAR Test Scores (2024)</h2>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Texas students continue to struggle with pandemic recovery, particularly in mathematics.
              Math scores remain 10+ percentage points below pre-pandemic levels across all grades.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                value="49%"
                label="RLA Meets Grade Level"
                subtext="Grades 3-8"
                icon={<BookOpen className="w-6 h-6 text-blue-600" />}
                color="bg-blue-100"
                sourceId={2}
              />
              <StatCard
                value="41%"
                label="Math Meets Grade Level"
                subtext="Grades 3-8"
                icon={<BarChart3 className="w-6 h-6 text-red-600" />}
                color="bg-red-100"
                sourceId={2}
              />
              <StatCard
                value="45%"
                label="Algebra I Proficiency"
                subtext="17 points below 2019"
                icon={<Brain className="w-6 h-6 text-violet-600" />}
                color="bg-violet-100"
                sourceId={3}
              />
              <StatCard
                value="60%"
                label="English II Proficiency"
                subtext="+4% from prior year"
                icon={<BookOpen className="w-6 h-6 text-emerald-600" />}
                color="bg-emerald-100"
                sourceId={3}
                trend="up"
              />
            </div>

            <ChartWrapper title="STAAR: Current vs Pre-Pandemic (% Meets Grade Level)" sourceIds={[2, 3, 10]}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={staarScoresData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, 80]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="meets" name="2024" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="prePandemic" name="2019 (Pre-COVID)" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>

            <div className="mt-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
              <h3 className="font-semibold text-gray-900 mb-4">Key STAAR Findings</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/60 rounded-xl p-4">
                  <div className="text-red-600 font-semibold mb-2">Math Still Lagging</div>
                  <p className="text-sm text-gray-600">No grade level has fully recovered in math. 8th grade math dropped to just 40% at grade level. [2]</p>
                </div>
                <div className="bg-white/60 rounded-xl p-4">
                  <div className="text-emerald-600 font-semibold mb-2">Reading Improving</div>
                  <p className="text-sm text-gray-600">Grades 4 and 6 reading rose by 3-4 percentage points. Some grades now exceed 2019 levels. [2]</p>
                </div>
              </div>
            </div>
          </section>

          {/* Virtual Schools */}
          <section id="virtual-schools" className="scroll-mt-24 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                <Laptop className="w-5 h-5 text-violet-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Virtual Schools & Online Learning</h2>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Texas virtual school enrollment has exploded, growing 1,200% over the past decade through the
              Texas Virtual School Network (TXVSN). There are now 24 full-time virtual schools operating statewide.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                value="62,200"
                label="Virtual School Students"
                subtext="2024-25 school year"
                icon={<Laptop className="w-6 h-6 text-violet-600" />}
                color="bg-violet-100"
                sourceId={5}
              />
              <StatCard
                value="1,200%"
                label="Growth Since 2014"
                subtext="From ~5,000 students"
                icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
                color="bg-emerald-100"
                sourceId={5}
                trend="up"
              />
              <StatCard
                value="24"
                label="Virtual Schools"
                subtext="Full-time programs"
                icon={<School className="w-6 h-6 text-blue-600" />}
                color="bg-blue-100"
                sourceId={13}
              />
              <StatCard
                value="~40,000"
                label="Stride K12 Students"
                subtext="Largest TX provider"
                icon={<Users className="w-6 h-6 text-amber-600" />}
                color="bg-amber-100"
                sourceId={5}
              />
            </div>

            <ChartWrapper title="Texas Virtual School Enrollment Growth" sourceIds={[5, 13]}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={virtualSchoolGrowthData}>
                  <defs>
                    <linearGradient id="colorVirtual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value: number) => [value.toLocaleString(), 'Students']} />
                  <Area type="monotone" dataKey="students" stroke="#8b5cf6" fill="url(#colorVirtual)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </section>

          {/* Teacher Shortage */}
          <section id="teacher-shortage" className="scroll-mt-24 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Teacher Shortage</h2>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Texas faces a severe teacher shortage, with the percentage of uncertified teachers tripling
              in five years. The state has 92,268 teachers not fully certified for their assignments.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                value="12%"
                label="Teachers Uncertified"
                subtext="2024-25 (was 3.8% in 2019)"
                icon={<AlertCircle className="w-6 h-6 text-amber-600" />}
                color="bg-amber-100"
                sourceId={6}
                trend="down"
              />
              <StatCard
                value="42,100"
                label="Uncertified Teachers"
                subtext="Up from 12,900 in 2019"
                icon={<UserMinus className="w-6 h-6 text-red-600" />}
                color="bg-red-100"
                sourceId={6}
              />
              <StatCard
                value="34%"
                label="New Hires Uncertified"
                subtext="2023-24 newly hired"
                icon={<Users className="w-6 h-6 text-violet-600" />}
                color="bg-violet-100"
                sourceId={12}
              />
              <StatCard
                value="12.9%"
                label="Attrition Rate"
                subtext="Teachers leaving"
                icon={<TrendingDown className="w-6 h-6 text-blue-600" />}
                color="bg-blue-100"
                sourceId={7}
              />
            </div>

            <ChartWrapper title="Percentage of Uncertified Teachers Over Time" sourceIds={[6, 7]}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={uncertifiedTeachersData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, 15]} />
                  <Tooltip formatter={(value: number) => [`${value}%`, 'Uncertified']} />
                  <Line type="monotone" dataKey="percentage" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b' }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartWrapper>

            <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <h3 className="font-semibold text-gray-900 mb-4">District Spotlight</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/60 rounded-xl p-4">
                  <div className="text-amber-600 font-semibold mb-2">Houston ISD</div>
                  <p className="text-sm text-gray-600">20.58% of teachers uncertified - highest in the state, up from 12% in 2023-24. [6]</p>
                </div>
                <div className="bg-white/60 rounded-xl p-4">
                  <div className="text-amber-600 font-semibold mb-2">Charter Schools</div>
                  <p className="text-sm text-gray-600">60% of new hires at Texas charter schools in 2023-24 had no formal classroom training. [12]</p>
                </div>
              </div>
            </div>
          </section>

          {/* Chronic Absenteeism */}
          <section id="chronic-absenteeism" className="scroll-mt-24 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <UserMinus className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Chronic Absenteeism</h2>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Texas has made progress reducing chronic absenteeism from pandemic peaks, but rates remain
              well above pre-pandemic levels. Nearly 1 in 5 students is chronically absent.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                value="19%"
                label="Chronic Absenteeism"
                subtext="2023-24 rate"
                icon={<UserMinus className="w-6 h-6 text-red-600" />}
                color="bg-red-100"
                sourceId={8}
              />
              <StatCard
                value="24.2%"
                label="Peak Rate"
                subtext="2021-22 (pandemic)"
                icon={<TrendingUp className="w-6 h-6 text-amber-600" />}
                color="bg-amber-100"
                sourceId={9}
              />
              <StatCard
                value="11%"
                label="Pre-Pandemic"
                subtext="2018-19 rate"
                icon={<Target className="w-6 h-6 text-emerald-600" />}
                color="bg-emerald-100"
                sourceId={8}
              />
              <StatCard
                value="23.1%"
                label="Low-Income Students"
                subtext="Higher than average"
                icon={<Users className="w-6 h-6 text-violet-600" />}
                color="bg-violet-100"
                sourceId={9}
              />
            </div>

            <ChartWrapper title="Chronic Absenteeism Rate Over Time (%)" sourceIds={[8, 9, 15]}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chronicAbsenteeismData}>
                  <defs>
                    <linearGradient id="colorAbsentTX" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, 30]} />
                  <Tooltip formatter={(value: number) => [`${value}%`, 'Rate']} />
                  <Area type="monotone" dataKey="rate" stroke="#ef4444" fill="url(#colorAbsentTX)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </section>

          {/* Education Spending */}
          <section id="spending" className="scroll-mt-24 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Education Spending</h2>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Texas spent $104.9 billion on K-12 education in 2024-25—more than the entire state budgets
              of 47 other states. However, per-pupil spending ranks 47th nationally.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <StatCard
                value="$104.9B"
                label="Total K-12 Spending"
                subtext="2024-25"
                icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
                color="bg-emerald-100"
                sourceId={11}
              />
              <StatCard
                value="$18,972"
                label="Per Pupil (All Sources)"
                subtext="Including facilities/debt"
                icon={<Users className="w-6 h-6 text-blue-600" />}
                color="bg-blue-100"
                sourceId={4}
              />
              <StatCard
                value="47th"
                label="National Ranking"
                subtext="Per-pupil spending"
                icon={<BarChart3 className="w-6 h-6 text-red-600" />}
                color="bg-red-100"
                sourceId={11}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">Spending Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100"><span>Total from all sources</span><span className="font-bold">$18,972/pupil</span></div>
                  <div className="flex justify-between py-2 border-b border-gray-100"><span>Current operating (day-to-day)</span><span className="font-bold">$12,895/pupil</span></div>
                  <div className="flex justify-between py-2 border-b border-gray-100"><span>National average</span><span className="font-bold">$17,619/pupil</span></div>
                  <div className="flex justify-between py-2"><span>Gap vs. national average</span><span className="font-bold text-red-600">-$4,724/pupil</span></div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                <h4 className="font-semibold text-gray-900 mb-4">Context</h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>Texas K-12 spending of $104.9 billion exceeds the entire state budgets of 47 other states.</p>
                  <p>The state educates 5.5+ million students across 1,200+ districts and charter schools.</p>
                  <p>Per NEA data, Texas spent $13,189 per student in average daily attendance—$5,664 less than the $18,853 national average.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Demographics */}
          <section id="demographics" className="scroll-mt-24 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-violet-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Student Demographics</h2>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Texas public schools are majority-minority, with Hispanic/Latino students comprising over
              half of all enrollment. White student enrollment declined 2.3% from 2023-24 to 2024-25.
            </p>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Enrollment by Race/Ethnicity (2024-25)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Group</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Percentage</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr><td className="px-6 py-4 text-sm font-medium">Hispanic/Latino</td><td className="px-6 py-4 text-sm font-semibold">53.5%</td><td className="px-6 py-4 text-sm text-gray-500">Largest group</td></tr>
                    <tr><td className="px-6 py-4 text-sm font-medium">White</td><td className="px-6 py-4 text-sm font-semibold">24.4%</td><td className="px-6 py-4 text-sm text-gray-500">-2.3% from prior year (-31,585 students)</td></tr>
                    <tr><td className="px-6 py-4 text-sm font-medium">Black/African American</td><td className="px-6 py-4 text-sm font-semibold">12.8%</td><td className="px-6 py-4 text-sm text-gray-500">Stable</td></tr>
                    <tr><td className="px-6 py-4 text-sm font-medium">Asian</td><td className="px-6 py-4 text-sm font-semibold">5.6%</td><td className="px-6 py-4 text-sm text-gray-500">Growing</td></tr>
                    <tr><td className="px-6 py-4 text-sm font-medium">Multiracial/Other</td><td className="px-6 py-4 text-sm font-semibold">3.7%</td><td className="px-6 py-4 text-sm text-gray-500">Combined</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="scroll-mt-24 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-slate-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${
                    expandedFaq === index ? 'border-red-200 shadow-md' : 'border-gray-100'
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      expandedFaq === index ? 'rotate-180 bg-red-100' : ''
                    }`}>
                      <ChevronDown className={`w-4 h-4 ${expandedFaq === index ? 'text-red-600' : 'text-gray-500'}`} />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${
                    expandedFaq === index ? 'max-h-96' : 'max-h-0'
                  }`}>
                    <div className="px-6 pb-5">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sources/Citations */}
          <section id="sources" className="scroll-mt-24 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Sources & Citations</h2>
            </div>

            <p className="text-gray-600 mb-6">
              All statistics on this page are sourced from the Texas Education Agency, research institutions, and authoritative news organizations. Click any source to verify.
            </p>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {citations.map((citation) => (
                  <a
                    key={citation.id}
                    href={citation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-red-100 text-red-600 text-sm font-semibold flex items-center justify-center flex-shrink-0">
                      {citation.id}
                    </span>
                    <span className="text-sm text-gray-700 group-hover:text-red-600 transition-colors line-clamp-2">
                      {citation.name}
                    </span>
                    <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-red-600 ml-auto flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Related Statistics */}
          <section className="scroll-mt-24 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Explore More Statistics</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/statistics/online-learning/usa"
                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-2xl mb-2">🇺🇸</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">USA National Statistics</h3>
                <p className="text-sm text-gray-500">National online learning data</p>
              </Link>
              <Link
                href="/statistics/online-learning/usa/california"
                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-2xl mb-2">🌴</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">California Statistics</h3>
                <p className="text-sm text-gray-500">CA education data</p>
              </Link>
              <Link
                href="/statistics/online-learning/usa/florida"
                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-2xl mb-2">🌞</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">Florida Statistics</h3>
                <p className="text-sm text-gray-500">Coming soon</p>
              </Link>
            </div>
          </section>
        </main>
      </div>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 50%, #1e3a5f 100%)' }}>
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Need Help With Your Studies in Texas?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Get personalized tutoring from expert Texas tutors. Online or in-person sessions available.
          </p>
          <Link
            href="/tutoring/free-consultation"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-red-500 text-white hover:bg-red-600 transition-all shadow-xl"
          >
            Get Free Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
