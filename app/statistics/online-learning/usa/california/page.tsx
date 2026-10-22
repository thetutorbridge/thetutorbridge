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
  Globe,
  Laptop,
  Brain,
  School,
  Linkedin,
  MapPin,
  Building,
  UserMinus
} from 'lucide-react';

// ============================================================================
// DATA ARRAYS FOR CHARTS
// ============================================================================

const enrollmentTrendData = [
  { year: '2019-20', enrollment: 6.16 },
  { year: '2020-21', enrollment: 6.00 },
  { year: '2021-22', enrollment: 5.89 },
  { year: '2022-23', enrollment: 5.85 },
  { year: '2023-24', enrollment: 5.84 },
  { year: '2024-25', enrollment: 5.81 },
];

const caasppScoresData = [
  { subject: 'ELA', current: 47, prePandemic: 51.7 },
  { subject: 'Math', current: 35.5, prePandemic: 37.1 },
  { subject: 'Science', current: 30.7, prePandemic: 33 },
];

const mathProficiencyByRaceData = [
  { group: 'Asian', proficiency: 70 },
  { group: 'White', proficiency: 50 },
  { group: 'Hispanic', proficiency: 24 },
  { group: 'Black', proficiency: 18 },
];

const communityCollegeOnlineData = [
  { year: '2019', online: 16 },
  { year: '2020', online: 45 },
  { year: '2021', online: 63 },
  { year: '2022', online: 52 },
  { year: '2023', online: 48 },
  { year: '2024', online: 43 },
];

const chronicAbsenteeismData = [
  { year: '2018-19', rate: 12 },
  { year: '2019-20', rate: 14 },
  { year: '2020-21', rate: 22 },
  { year: '2021-22', rate: 30 },
  { year: '2022-23', rate: 26 },
  { year: '2023-24', rate: 22 },
  { year: '2024-25', rate: 19.4 },
];

const studentDemographicsData = [
  { name: 'Hispanic/Latino', value: 55, color: '#f59e0b' },
  { name: 'White', value: 22, color: '#3b82f6' },
  { name: 'Asian', value: 9, color: '#10b981' },
  { name: 'African American', value: 5, color: '#8b5cf6' },
  { name: 'Other', value: 9, color: '#6b7280' },
];

const largestDistrictsData = [
  { district: 'Los Angeles USD', enrollment: 497105 },
  { district: 'San Diego USD', enrollment: 112250 },
  { district: 'Fresno USD', enrollment: 70163 },
  { district: 'Elk Grove USD', enrollment: 65483 },
  { district: 'Long Beach USD', enrollment: 61679 },
];

const teacherCertificationData = [
  { subject: 'Computer Ed', certified: 57 },
  { subject: 'Career Tech', certified: 66 },
  { subject: 'Art', certified: 68 },
  { subject: 'Science', certified: 70 },
  { subject: 'Math', certified: 71 },
  { subject: 'Languages', certified: 71 },
];

const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#6b7280', '#ec4899'];

// ============================================================================
// CITATIONS DATA
// ============================================================================

const citations = [
  { id: 1, name: 'CA Dept of Education - Enrollment Data 2024-25', url: 'https://www.cde.ca.gov/Nr/ne/yr25/yr25rel28.asp' },
  { id: 2, name: 'PPIC - Chronic Absenteeism in California Report', url: 'https://www.ppic.org/publication/chronic-absenteeism-in-california/' },
  { id: 3, name: 'EdSource - California CAASPP Test Scores 2024', url: 'https://edsource.org/2024/state-test-scores-inch-up-but-still-lag-pre-covid-numbers/720392' },
  { id: 4, name: 'Stanford Education Data Archive - CA Recovery Data', url: 'https://edsource.org/2025/stanfords-national-database-adds-a-new-twist-to-californias-pandemic-learning-loss/726637' },
  { id: 5, name: 'CA Community Colleges - Online Education Study Report', url: 'https://cccco.edu/-/media/CCCCO-Website/docs/report/sb117-comprehensive-online-ed-study-report-ada.pdf' },
  { id: 6, name: 'Learning Policy Institute - State Teacher Shortages 2024', url: 'https://learningpolicyinstitute.org/product/state-teacher-shortages-vacancy-resource-tool-2024' },
  { id: 7, name: 'CA Assembly Budget Floor Report 2024-25', url: 'https://abgt.assembly.ca.gov/system/files/2024-06/floor-report-of-the-2024-25-budget-june-22-2024.pdf' },
  { id: 8, name: 'PPIC - CA School Enrollment Decline Analysis', url: 'https://www.ppic.org/blog/unpacking-californias-continued-school-enrollment-decline/' },
  { id: 9, name: 'PPIC - Online Learning at CA Community Colleges', url: 'https://www.ppic.org/blog/online-learning-is-here-to-stay-at-california-community-colleges/' },
  { id: 10, name: 'CSBA - 2023-24 CAASPP Scores and Achievement Gaps', url: 'https://blog.csba.org/caaspp-2023-24-assessment/' },
  { id: 11, name: 'EdPolicyInCA - Chronic Absence Crisis Through 2024-25', url: 'https://edpolicyinca.org/publications/unpacking-californias-chronic-absence-crisis-through-2024-25' },
  { id: 12, name: 'EdSource - CA TK-12 Enrollment 2025', url: 'https://edsource.org/2025/california-school-enrollment-decline/733193' },
  { id: 13, name: 'CA School Dashboard - Academic Engagement Report', url: 'https://www.caschooldashboard.org/reports/ca/2025/academic-engagement' },
  { id: 14, name: 'CAVA - School Accountability Report Card 2024-25', url: 'https://cava.k12.com/wp-content/uploads/sites/20/2026/01/2025_school_accountability_report_card_california_virtual_academy__san_diego.pdf' },
  { id: 15, name: 'CSBA - Chronic Absenteeism 2024-25 Analysis', url: 'https://blog.csba.org/chronic-absenteeism-2024-25/' },
];

// ============================================================================
// FAQ DATA
// ============================================================================

const faqs = [
  {
    question: 'How many students are enrolled in California public schools?',
    answer: 'California has approximately 5.8 million students enrolled in K-12 public schools as of 2024-25, making it the largest public school system in the United States. This represents an 8th consecutive year of enrollment decline, down from about 6.2 million in 2014-15.'
  },
  {
    question: 'What percentage of California students meet state standards in math?',
    answer: 'Only 35.5% of California students met or exceeded state standards in mathematics on the 2023-24 CAASPP assessment. This is still below the pre-pandemic level of 37.1% in 2018-19. There are significant disparities by race: Asian students score 70%, White students 50%, Hispanic students 24%, and Black students 18%.'
  },
  {
    question: 'How many students attend online/virtual schools in California?',
    answer: 'Over 56,000 California students take one or more online classes. The California Virtual Academy (CAVA) network serves approximately 15,000+ students across 9 campuses statewide. Additionally, 93% of California\'s 5.75 million public school students are connected to online educational resources.'
  },
  {
    question: 'What is California\'s chronic absenteeism rate?',
    answer: 'California\'s chronic absenteeism rate is 19% in 2024-25, representing about 1.1 million students. This has decreased from a peak of 30% in 2021-22 but remains above the pre-pandemic rate of 12% in 2018-19. High schoolers have the highest rate at 24%.'
  },
  {
    question: 'How much does California spend per student on education?',
    answer: 'California spends approximately $24,000-$24,600 per pupil in 2024-25 from all sources, including about $18,400 from Proposition 98 funds. The total K-12 education budget is approximately $136 billion from all funding sources.'
  },
  {
    question: 'How severe is California\'s teacher shortage?',
    answer: 'California has over 10,000 unfilled teacher positions and 35,182 teachers who are not fully certified. About 8,000 emergency-style permits were granted in 2024-25, with 51% of new Education Specialist teachers entering on emergency permits. Annual teacher turnover is 14%.'
  },
  {
    question: 'What percentage of California community college classes are online?',
    answer: '43% of California community college instruction is now online, up dramatically from just 6% before the pandemic. The system serves 2.1 million students across 114 colleges, offering over 10,000 online courses, 90 fully online associate degrees, and 80 fully online certificate programs.'
  },
  {
    question: 'How many homeschooled students are in California?',
    answer: 'California has approximately 547,561 homeschooled children as of September 2024, representing 13% of all U.S. homeschoolers—the highest of any state. Private school filings with fewer than 6 students (a homeschool proxy) grew 44% from pre-COVID levels.'
  },
  {
    question: 'What is the largest school district in California?',
    answer: 'Los Angeles Unified School District (LAUSD) is the largest district in California and the second-largest in the nation, with 497,105 students enrolled in 2025-26. The district covers over 700 square miles and serves students who are approximately 90% students of color.'
  },
  {
    question: 'How is California recovering from COVID learning loss?',
    answer: 'Recovery has been slow. Only 10% of California students attend districts that have recovered in both math and reading. The state has a $6 billion Learning Recovery Emergency Block Grant available through 2027-28, but only 30% of districts have spent on tutoring so far.'
  }
];

// ============================================================================
// STAT CARD COMPONENT
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

// ============================================================================
// CHART WRAPPER COMPONENT
// ============================================================================

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
// TABLE OF CONTENTS DATA
// ============================================================================

const tableOfContents = [
  { id: 'key-takeaways', label: 'Key Takeaways', icon: Zap },
  { id: 'enrollment', label: 'K-12 Enrollment', icon: Users },
  { id: 'test-scores', label: 'Test Scores (CAASPP)', icon: Target },
  { id: 'virtual-schools', label: 'Virtual Schools', icon: Laptop },
  { id: 'community-college', label: 'Community College', icon: Building },
  { id: 'chronic-absenteeism', label: 'Chronic Absenteeism', icon: UserMinus },
  { id: 'teacher-shortage', label: 'Teacher Shortage', icon: AlertCircle },
  { id: 'spending', label: 'Education Spending', icon: DollarSign },
  { id: 'demographics', label: 'Demographics', icon: Users },
  { id: 'edtech', label: 'EdTech & Startups', icon: Brain },
  { id: 'faq', label: 'FAQ', icon: BookOpen },
  { id: 'sources', label: 'Sources', icon: ExternalLink },
];

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function CaliforniaStatsPage() {
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
            "headline": "California Online Learning Statistics 2025: 100+ Facts & Data",
            "description": "Comprehensive California online learning and education statistics including K-12 enrollment, test scores, virtual schools, and community college data.",
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
            "datePublished": "2025-01-15",
            "dateModified": new Date().toISOString(),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.thetutorbridge.com/statistics/online-learning/usa/california"
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
            "name": "California Online Learning Statistics 2025",
            "description": "Comprehensive dataset of California education, online learning, and K-12 statistics",
            "url": "https://www.thetutorbridge.com/statistics/online-learning/usa/california",
            "keywords": ["California", "education", "online learning", "K-12", "virtual schools"],
            "creator": {
              "@type": "Organization",
              "name": "The Tutor Bridge"
            },
            "temporalCoverage": "2018/2025",
            "spatialCoverage": "California, United States"
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
              { "@type": "ListItem", "position": 5, "name": "California", "item": "https://www.thetutorbridge.com/statistics/online-learning/usa/california" }
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
            <span className="text-slate-900 font-medium">California</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 50%, #1e3a5f 100%)' }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

        <div className="relative py-16 md:py-24 px-4 sm:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            {/* State Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-sm mb-4">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="text-amber-200 font-medium">State of California</span>
            </div>

            {/* Last Updated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-6 ml-2">
              <Calendar className="w-4 h-4 text-blue-300" />
              <span className="text-gray-200">Last Updated: {lastUpdated}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
              California Online Learning
              <span className="block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #fbbf24, #f59e0b)' }}>
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
                  className="font-semibold text-white hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  Rishabh Jain
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
              Comprehensive education statistics for the <span className="text-white font-semibold">largest K-12 system in the nation</span>.
              <span className="text-amber-400 font-semibold"> 100+ data points</span> from <span className="text-white font-semibold">30+ authoritative sources</span>.
            </p>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-3xl md:text-4xl font-bold text-white">5.8M</div>
                <div className="text-sm text-gray-300 mt-1">K-12 Students</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-3xl md:text-4xl font-bold text-red-400">35.5%</div>
                <div className="text-sm text-gray-300 mt-1">Math Proficiency</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-3xl md:text-4xl font-bold text-amber-400">$24K+</div>
                <div className="text-sm text-gray-300 mt-1">Per Pupil Spending</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-3xl md:text-4xl font-bold text-blue-400">43%</div>
                <div className="text-sm text-gray-300 mt-1">CC Classes Online</div>
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
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-amber-600 bg-gray-50 hover:bg-amber-50 rounded-lg transition-colors border border-gray-100 hover:border-amber-200"
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
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Key California Takeaways</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { stat: '5.8 million', text: 'students in CA public schools - largest in US' },
                  { stat: '8 years', text: 'of consecutive enrollment decline' },
                  { stat: '35.5%', text: 'of students meet math standards (vs 37% pre-COVID)' },
                  { stat: '47%', text: 'of students meet ELA standards' },
                  { stat: '19%', text: 'chronic absenteeism rate (1.1M students)' },
                  { stat: '10,000+', text: 'unfilled teacher positions statewide' },
                  { stat: '$136B', text: 'total K-12 education budget (all sources)' },
                  { stat: '43%', text: 'of community college classes now online' },
                  { stat: '547,561', text: 'homeschooled children (#1 state in US)' },
                  { stat: '145', text: 'EdTech startups in San Francisco alone' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white/60 rounded-xl p-4">
                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
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
              California operates the largest K-12 public school system in the nation, though enrollment has been declining
              for 8 consecutive years due to falling birth rates and migration patterns.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                value="5.81M"
                label="Total Enrollment"
                subtext="2024-25 school year"
                icon={<Users className="w-6 h-6 text-blue-600" />}
                color="bg-blue-100"
                sourceId={1}
              />
              <StatCard
                value="-31,500"
                label="Annual Change"
                subtext="-0.54% from prior year"
                icon={<TrendingDown className="w-6 h-6 text-red-600" />}
                color="bg-red-100"
                sourceId={1}
                trend="down"
              />
              <StatCard
                value="10,303"
                label="Public Schools"
                subtext="Across the state"
                icon={<School className="w-6 h-6 text-emerald-600" />}
                color="bg-emerald-100"
                sourceId={1}
              />
              <StatCard
                value="20.9:1"
                label="Student-Teacher Ratio"
                subtext="State average"
                icon={<GraduationCap className="w-6 h-6 text-violet-600" />}
                color="bg-violet-100"
                sourceId={1}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <ChartWrapper title="California K-12 Enrollment Trend (Millions)" sourceIds={[1, 2]}>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={enrollmentTrendData}>
                    <defs>
                      <linearGradient id="colorEnrollment" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} domain={[5.5, 6.3]} />
                    <Tooltip formatter={(value: number) => [`${value}M`, 'Enrollment']} />
                    <Area type="monotone" dataKey="enrollment" stroke="#3b82f6" fill="url(#colorEnrollment)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartWrapper>

              <ChartWrapper title="Largest School Districts (2025-26)" sourceIds={[1]}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={largestDistrictsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="district" type="category" tick={{ fontSize: 11 }} width={110} />
                    <Tooltip formatter={(value: number) => [value.toLocaleString(), 'Students']} />
                    <Bar dataKey="enrollment" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </div>

            {/* Enrollment Table */}
            <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Enrollment Details</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Metric</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr><td className="px-6 py-4 text-sm">Total K-12 Enrollment (2024-25)</td><td className="px-6 py-4 text-sm font-semibold">5,806,221</td><td className="px-6 py-4 text-sm text-gray-500">8th consecutive decline</td></tr>
                    <tr><td className="px-6 py-4 text-sm">Transitional Kindergarten</td><td className="px-6 py-4 text-sm font-semibold">151,491</td><td className="px-6 py-4 text-sm text-gray-500">Doubled since 2021-22</td></tr>
                    <tr><td className="px-6 py-4 text-sm">Los Angeles Unified</td><td className="px-6 py-4 text-sm font-semibold">497,105</td><td className="px-6 py-4 text-sm text-gray-500">2nd largest in US</td></tr>
                    <tr><td className="px-6 py-4 text-sm">San Diego Unified</td><td className="px-6 py-4 text-sm font-semibold">112,250</td><td className="px-6 py-4 text-sm text-gray-500">2nd largest in CA</td></tr>
                    <tr><td className="px-6 py-4 text-sm">Projected 2034-35</td><td className="px-6 py-4 text-sm font-semibold">5,219,700</td><td className="px-6 py-4 text-sm text-gray-500">-586,500 projected decline</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Test Scores */}
          <section id="test-scores" className="scroll-mt-24 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">CAASPP Test Scores (2024)</h2>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              California students continue to slowly recover from pandemic learning loss, but proficiency rates remain
              below pre-pandemic levels. Significant achievement gaps persist across racial and socioeconomic groups.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <StatCard
                value="47%"
                label="ELA Proficiency"
                subtext="Met/exceeded standard"
                icon={<BookOpen className="w-6 h-6 text-blue-600" />}
                color="bg-blue-100"
                sourceId={1}
              />
              <StatCard
                value="35.5%"
                label="Math Proficiency"
                subtext="Met/exceeded standard"
                icon={<BarChart3 className="w-6 h-6 text-red-600" />}
                color="bg-red-100"
                sourceId={1}
              />
              <StatCard
                value="30.7%"
                label="Science Proficiency"
                subtext="Met/exceeded standard"
                icon={<Brain className="w-6 h-6 text-violet-600" />}
                color="bg-violet-100"
                sourceId={1}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <ChartWrapper title="Current vs Pre-Pandemic Proficiency (%)" sourceIds={[1, 3]}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={caasppScoresData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} domain={[0, 60]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" name="2023-24" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="prePandemic" name="2018-19" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartWrapper>

              <ChartWrapper title="Math Proficiency by Race/Ethnicity (%)" sourceIds={[1, 10]}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mathProficiencyByRaceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="group" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} domain={[0, 80]} />
                    <Tooltip formatter={(value: number) => [`${value}%`, 'Proficiency']} />
                    <Bar dataKey="proficiency" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </div>

            <div className="mt-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
              <h3 className="font-semibold text-gray-900 mb-4">Achievement Gap Highlights</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/60 rounded-xl p-4">
                  <div className="text-red-600 font-semibold mb-2">Widest Gap in Nation</div>
                  <p className="text-sm text-gray-600">California has the widest achievement gap between socioeconomically disadvantaged and affluent students, second only to Massachusetts.</p>
                </div>
                <div className="bg-white/60 rounded-xl p-4">
                  <div className="text-red-600 font-semibold mb-2">11th Grade Crisis</div>
                  <p className="text-sm text-gray-600">Only 27.9% of 11th graders meet math standards. For Latino, Black, and Native American students, it's below 14.1%.</p>
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
              California offers multiple virtual school options through the California Virtual Academy (CAVA) network
              and California Online Public Schools, serving tens of thousands of students statewide.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                value="56,000+"
                label="Online Students"
                subtext="Taking online classes"
                icon={<Laptop className="w-6 h-6 text-violet-600" />}
                color="bg-violet-100"
                sourceId={1}
              />
              <StatCard
                value="93%"
                label="Students Connected"
                subtext="To online resources"
                icon={<Globe className="w-6 h-6 text-blue-600" />}
                color="bg-blue-100"
                sourceId={1}
              />
              <StatCard
                value="9"
                label="CAVA Campuses"
                subtext="Statewide network"
                icon={<School className="w-6 h-6 text-emerald-600" />}
                color="bg-emerald-100"
                sourceId={14}
              />
              <StatCard
                value="5.75M"
                label="Online Resources Users"
                subtext="CA public school students"
                icon={<BookOpen className="w-6 h-6 text-amber-600" />}
                color="bg-amber-100"
                sourceId={1}
              />
            </div>

            {/* CAVA Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-violet-50">
                <h3 className="font-semibold text-gray-900">California Virtual Academy (CAVA) Enrollment</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Campus</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Enrollment</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Counties Served</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr><td className="px-6 py-4 text-sm font-medium">CAVA @ Los Angeles</td><td className="px-6 py-4 text-sm font-semibold">6,157</td><td className="px-6 py-4 text-sm text-gray-500">LA, San Bernardino, Ventura</td></tr>
                    <tr><td className="px-6 py-4 text-sm font-medium">CAVA @ San Diego</td><td className="px-6 py-4 text-sm font-semibold">3,924</td><td className="px-6 py-4 text-sm text-gray-500">Imperial, Orange, Riverside, San Diego</td></tr>
                    <tr><td className="px-6 py-4 text-sm font-medium">CAVA @ San Joaquin</td><td className="px-6 py-4 text-sm font-semibold">3,432</td><td className="px-6 py-4 text-sm text-gray-500">San Joaquin area</td></tr>
                    <tr><td className="px-6 py-4 text-sm font-medium">CAVA @ San Mateo</td><td className="px-6 py-4 text-sm font-semibold">1,136</td><td className="px-6 py-4 text-sm text-gray-500">San Mateo area</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Community College */}
          <section id="community-college" className="scroll-mt-24 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Building className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Community College Online Learning</h2>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              The California Community Colleges system—the largest higher education system in the US—has dramatically
              expanded online offerings since the pandemic, with 43% of instruction now delivered online.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                value="2.1M"
                label="Total Students"
                subtext="Across the system"
                icon={<Users className="w-6 h-6 text-emerald-600" />}
                color="bg-emerald-100"
                sourceId={5}
              />
              <StatCard
                value="114"
                label="Colleges"
                subtext="Statewide"
                icon={<Building className="w-6 h-6 text-blue-600" />}
                color="bg-blue-100"
                sourceId={5}
              />
              <StatCard
                value="10,000+"
                label="Online Courses"
                subtext="Available"
                icon={<Laptop className="w-6 h-6 text-violet-600" />}
                color="bg-violet-100"
                sourceId={5}
              />
              <StatCard
                value="76%"
                label="Want Online"
                subtext="Student preference"
                icon={<Target className="w-6 h-6 text-amber-600" />}
                color="bg-amber-100"
                sourceId={2}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <ChartWrapper title="Online Class Share Over Time (%)" sourceIds={[2, 5]}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={communityCollegeOnlineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} domain={[0, 70]} />
                    <Tooltip formatter={(value: number) => [`${value}%`, 'Online Share']} />
                    <Line type="monotone" dataKey="online" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartWrapper>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                <h3 className="font-semibold text-gray-900 mb-4">Key Online Learning Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-emerald-100">
                    <span className="text-gray-600">Colleges with 40%+ online (2025)</span>
                    <span className="font-bold text-emerald-600">80%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-emerald-100">
                    <span className="text-gray-600">Colleges with 40%+ online (2019)</span>
                    <span className="font-bold text-gray-500">6%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-emerald-100">
                    <span className="text-gray-600">Fully online degree programs</span>
                    <span className="font-bold text-emerald-600">90</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-emerald-100">
                    <span className="text-gray-600">Fully online certificates</span>
                    <span className="font-bold text-emerald-600">80</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Students took online (started 2022)</span>
                    <span className="font-bold text-emerald-600">82%</span>
                  </div>
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
              Chronic absenteeism—missing 10% or more of school days—remains elevated in California, affecting
              over 1.1 million students despite improvements from pandemic peaks.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                value="19%"
                label="Chronic Absenteeism"
                subtext="2024-25 rate"
                icon={<UserMinus className="w-6 h-6 text-red-600" />}
                color="bg-red-100"
                sourceId={10}
              />
              <StatCard
                value="1.1M"
                label="Students Affected"
                subtext="Chronically absent"
                icon={<Users className="w-6 h-6 text-amber-600" />}
                color="bg-amber-100"
                sourceId={11}
              />
              <StatCard
                value="30%"
                label="Peak Rate"
                subtext="2021-22 (pandemic)"
                icon={<TrendingUp className="w-6 h-6 text-red-600" />}
                color="bg-red-100"
                sourceId={2}
              />
              <StatCard
                value="12%"
                label="Pre-Pandemic"
                subtext="2018-19 rate"
                icon={<Target className="w-6 h-6 text-emerald-600" />}
                color="bg-emerald-100"
                sourceId={2}
              />
            </div>

            <ChartWrapper title="Chronic Absenteeism Rate Over Time (%)" sourceIds={[2, 10, 11]}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chronicAbsenteeismData}>
                  <defs>
                    <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, 35]} />
                  <Tooltip formatter={(value: number) => [`${value}%`, 'Rate']} />
                  <Area type="monotone" dataKey="rate" stroke="#ef4444" fill="url(#colorAbsent)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartWrapper>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">By Grade Level (2024-25)</h4>
                <div className="space-y-3">
                  <div className="flex justify-between"><span>High School</span><span className="font-bold text-red-600">24%</span></div>
                  <div className="flex justify-between"><span>TK/Kindergarten</span><span className="font-bold text-red-600">23%</span></div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">By Demographics (2024-25)</h4>
                <div className="space-y-3">
                  <div className="flex justify-between"><span>Foster youth</span><span className="font-bold text-red-600">35-37%</span></div>
                  <div className="flex justify-between"><span>Homeless students</span><span className="font-bold text-red-600">35-37%</span></div>
                  <div className="flex justify-between"><span>Black, Native American, Pacific Islander</span><span className="font-bold text-red-600">~30%</span></div>
                </div>
              </div>
            </div>
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
              California faces a significant teacher shortage with over 10,000 unfilled positions and 35,000+ teachers
              working without full certification, particularly in STEM subjects.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                value="10,000+"
                label="Unfilled Positions"
                subtext="Statewide"
                icon={<AlertCircle className="w-6 h-6 text-amber-600" />}
                color="bg-amber-100"
                sourceId={6}
              />
              <StatCard
                value="35,182"
                label="Not Fully Certified"
                subtext="Teachers"
                icon={<GraduationCap className="w-6 h-6 text-red-600" />}
                color="bg-red-100"
                sourceId={6}
              />
              <StatCard
                value="~8,000"
                label="Emergency Permits"
                subtext="Granted in 2024-25"
                icon={<UserMinus className="w-6 h-6 text-violet-600" />}
                color="bg-violet-100"
                sourceId={6}
              />
              <StatCard
                value="14%"
                label="Annual Turnover"
                subtext="Teacher turnover rate"
                icon={<TrendingDown className="w-6 h-6 text-blue-600" />}
                color="bg-blue-100"
                sourceId={6}
              />
            </div>

            <ChartWrapper title="Teachers Fully Credentialed by Subject (%)" sourceIds={[6]}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={teacherCertificationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[50, 80]} />
                  <Tooltip formatter={(value: number) => [`${value}%`, 'Certified']} />
                  <Bar dataKey="certified" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>

            <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <h3 className="font-semibold text-gray-900 mb-4">New Teacher Entry (2024-25)</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/60 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-amber-600">51%</div>
                  <div className="text-sm text-gray-600 mt-1">Education Specialists on emergency permits</div>
                </div>
                <div className="bg-white/60 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-amber-600">32%</div>
                  <div className="text-sm text-gray-600 mt-1">Multiple Subject teachers on emergency permits</div>
                </div>
                <div className="bg-white/60 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-amber-600">86%</div>
                  <div className="text-sm text-gray-600 mt-1">Of openings from attrition (not growth)</div>
                </div>
              </div>
            </div>
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
              California invests heavily in education with a $136 billion K-12 budget (from all sources) and per-pupil spending that has
              increased 35% over the past five years.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <StatCard
                value="$136B"
                label="Total K-12 Budget"
                subtext="2024-25"
                icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
                color="bg-emerald-100"
                sourceId={7}
              />
              <StatCard
                value="$24,000+"
                label="Per Pupil Spending"
                subtext="From all sources"
                icon={<Users className="w-6 h-6 text-blue-600" />}
                color="bg-blue-100"
                sourceId={7}
              />
              <StatCard
                value="$6B"
                label="Learning Recovery Grant"
                subtext="Available through 2027-28"
                icon={<Target className="w-6 h-6 text-amber-600" />}
                color="bg-amber-100"
                sourceId={3}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">Per-Pupil Spending Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100"><span>Total from all sources</span><span className="font-bold">$24,000-$24,626</span></div>
                  <div className="flex justify-between py-2 border-b border-gray-100"><span>Prop 98 funds only</span><span className="font-bold">$17,502</span></div>
                  <div className="flex justify-between py-2 border-b border-gray-100"><span>5-year increase</span><span className="font-bold text-emerald-600">+35%</span></div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">Equity Premiums</h4>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100"><span>Low-income student premium</span><span className="font-bold text-emerald-600">+$2,700/student</span></div>
                  <div className="flex justify-between py-2 border-b border-gray-100"><span>English Learner premium</span><span className="font-bold text-emerald-600">+$1,200/student</span></div>
                  <div className="flex justify-between py-2"><span>Black/Latino student premium</span><span className="font-bold text-emerald-600">+$3,000/student</span></div>
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
              California's public school system serves an extremely diverse student body, with Hispanic/Latino students
              comprising the majority and approximately 60% of students facing socioeconomic challenges.
            </p>

            <div className="grid lg:grid-cols-2 gap-6">
              <ChartWrapper title="K-12 Student Demographics by Race/Ethnicity" sourceIds={[1, 2]}>
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
                      label={({ name, value }) => `${value}%`}
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

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">Socioeconomic Status</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Free/Reduced Lunch Eligible</span>
                      <span className="font-bold">58%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Socioeconomically Disadvantaged</span>
                      <span className="font-bold">60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500 mb-2">Free Lunch Rate by Locale:</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between"><span>Town</span><span className="font-semibold">67.9%</span></div>
                      <div className="flex justify-between"><span>Rural</span><span className="font-semibold">59.3%</span></div>
                      <div className="flex justify-between"><span>City</span><span className="font-semibold">54.7%</span></div>
                      <div className="flex justify-between"><span>Suburb</span><span className="font-semibold">53.2%</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-4">Homeschool Statistics</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-violet-600">547,561</div>
                  <div className="text-sm text-gray-600 mt-1">Homeschooled children (Sept 2024)</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-violet-600">13%</div>
                  <div className="text-sm text-gray-600 mt-1">Share of all US homeschoolers (#1)</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-violet-600">+44%</div>
                  <div className="text-sm text-gray-600 mt-1">Growth from pre-COVID levels</div>
                </div>
              </div>
            </div>
          </section>

          {/* EdTech */}
          <section id="edtech" className="scroll-mt-24 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Brain className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">EdTech & Silicon Valley</h2>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              California, home to Silicon Valley, is a global hub for education technology innovation with hundreds
              of EdTech startups and billions in funding.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <StatCard
                value="145"
                label="EdTech Startups"
                subtext="In San Francisco alone"
                icon={<Brain className="w-6 h-6 text-purple-600" />}
                color="bg-purple-100"
                sourceId={15}
              />
              <StatCard
                value="$1.7B"
                label="Funding Raised"
                subtext="By SF EdTech startups"
                icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
                color="bg-emerald-100"
                sourceId={15}
              />
              <StatCard
                value="31"
                label="Y Combinator EdTech"
                subtext="Bay Area startups"
                icon={<TrendingUp className="w-6 h-6 text-amber-600" />}
                color="bg-amber-100"
                sourceId={15}
              />
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-100">
              <h3 className="font-semibold text-gray-900 mb-4">Notable California EdTech Companies</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { name: 'ClassDojo', desc: 'Classroom communication' },
                  { name: 'MasterClass', desc: 'Celebrity-taught courses' },
                  { name: 'NoRedInk', desc: 'Writing instruction' },
                  { name: 'Brilliant.org', desc: 'STEM learning' },
                  { name: 'Common Sense Media', desc: 'Digital citizenship' },
                  { name: 'Minerva Project', desc: 'Innovative higher ed' },
                  { name: 'Edmodo', desc: 'Learning platform' },
                  { name: 'Think Academy', desc: 'K-9 math/Chinese' },
                  { name: 'Cognii', desc: 'AI-based education' },
                ].map((company, idx) => (
                  <div key={idx} className="bg-white/60 rounded-lg p-3">
                    <div className="font-medium text-gray-900">{company.name}</div>
                    <div className="text-xs text-gray-500">{company.desc}</div>
                  </div>
                ))}
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
                    expandedFaq === index ? 'border-amber-200 shadow-md' : 'border-gray-100'
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      expandedFaq === index ? 'rotate-180 bg-amber-100' : ''
                    }`}>
                      <ChevronDown className={`w-4 h-4 ${expandedFaq === index ? 'text-amber-600' : 'text-gray-500'}`} />
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
              All statistics on this page are sourced from California government agencies, research institutions, and authoritative education organizations.
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
                    <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 text-sm font-semibold flex items-center justify-center flex-shrink-0">
                      {citation.id}
                    </span>
                    <span className="text-sm text-gray-700 group-hover:text-amber-600 transition-colors">
                      {citation.name}
                    </span>
                    <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-amber-600 ml-auto flex-shrink-0" />
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
                href="/statistics/online-learning/usa/texas"
                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-2xl mb-2">⛤</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">Texas Statistics</h3>
                <p className="text-sm text-gray-500">Coming soon</p>
              </Link>
              <Link
                href="/statistics/online-learning/usa/florida"
                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-2xl mb-2">🌴</div>
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
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Need Help With Your Studies in California?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Get personalized tutoring from expert California tutors. Online or in-person sessions available.
          </p>
          <Link
            href="/tutoring/free-consultation"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-all shadow-xl"
          >
            Get Free Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
