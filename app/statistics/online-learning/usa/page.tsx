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
  Users,
  DollarSign,
  BookOpen,
  GraduationCap,
  ChevronDown,
  Home,
  Calendar,
  ExternalLink,
  BarChart3,
  PieChartIcon,
  Target,
  Zap,
  AlertCircle,
  CheckCircle,
  Globe,
  Laptop,
  Brain,
  School,
  Linkedin
} from 'lucide-react';

// ============================================================================
// DATA ARRAYS FOR CHARTS
// ============================================================================

const marketGrowthData = [
  { year: '2018', value: 7.2 },
  { year: '2019', value: 7.8 },
  { year: '2020', value: 9.1 },
  { year: '2021', value: 10.5 },
  { year: '2022', value: 11.2 },
  { year: '2023', value: 9.1 },
  { year: '2024', value: 4.33 },
  { year: '2025', value: 4.78 },
  { year: '2030 (Proj.)', value: 8.09 },
];

const onlineVsInPersonData = [
  { name: 'Online', value: 64, color: '#3b82f6' },
  { name: 'In-Person', value: 36, color: '#94a3b8' },
];

const subjectDemandData = [
  { subject: 'Math', percentage: 41 },
  { subject: 'Reading/ELA', percentage: 28 },
  { subject: 'Test Prep', percentage: 22 },
  { subject: 'Science', percentage: 17 },
  { subject: 'Languages', percentage: 12 },
];

const demographicsIncomeData = [
  { income: '$100K+', percentage: 55 },
  { income: '$75-100K', percentage: 20 },
  { income: '$50-75K', percentage: 15 },
  { income: 'Under $50K', percentage: 10 },
];

const gradeDistributionData = [
  { name: 'K-8', value: 53, color: '#10b981' },
  { name: 'High School', value: 47, color: '#6366f1' },
];

const learningRecoveryData = [
  { category: 'Recovered Both', percentage: 14 },
  { category: 'Recovered Reading', percentage: 11 },
  { category: 'Recovered Math', percentage: 17 },
  { category: 'Still Behind', percentage: 58 },
];

const deviceUsageData = [
  { name: 'Desktop', value: 35, color: '#3b82f6' },
  { name: 'Tablet', value: 30, color: '#10b981' },
  { name: 'Mobile', value: 25, color: '#f59e0b' },
  { name: 'Laptop', value: 10, color: '#8b5cf6' },
];

const aiTutoringGrowthData = [
  { year: '2024', value: 3.15 },
  { year: '2025', value: 3.55 },
  { year: '2027 (Proj.)', value: 4.51 },
  { year: '2030 (Proj.)', value: 6.45 },
];

const edtechAdoptionData = [
  { year: '2018-19', tools: 841 },
  { year: '2019-20', tools: 1200 },
  { year: '2020-21', tools: 1800 },
  { year: '2021-22', tools: 2100 },
  { year: '2022-23', tools: 2534 },
  { year: '2024-25', tools: 2739 },
];

const tutorWorkforceData = [
  { year: '2018', tutors: 194029 },
  { year: '2020', tutors: 190000 },
  { year: '2022', tutors: 182700 },
  { year: '2024', tutors: 185176 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

// ============================================================================
// CITATIONS DATA
// ============================================================================

const citations = [
  { id: 1, name: 'Grand View Research - U.S. Online Private Tutoring Market Report', url: 'https://www.grandviewresearch.com/industry-analysis/us-online-private-tutoring-market-report' },
  { id: 2, name: 'IBISWorld - Online Tutoring Services Market Size', url: 'https://www.ibisworld.com/united-states/market-size/online-tutoring-services/6038/' },
  { id: 3, name: 'Research and Markets - U.S. Online Private Tutoring Market Size', url: 'https://www.researchandmarkets.com/reports/6098224/u-s-online-private-tutoring-market-size-share' },
  { id: 4, name: 'ConsumerAffairs - Tutoring Statistics 2026', url: 'https://www.consumeraffairs.com/education/tutoring-statistics.html' },
  { id: 5, name: 'EdChoice - A Kaleidoscope View of K-12 Tutoring in America', url: 'https://www.edchoice.org/2025-a-kaleidoscope-view-of-k12-tutoring-in-america/' },
  { id: 6, name: 'Gitnux - Tutoring Industry Statistics 2026', url: 'https://gitnux.org/tutoring-industry-statistics/' },
  { id: 7, name: 'TutorBase - Tutoring Industry Statistics 2026', url: 'https://tutorbase.com/statistics/tutoring-industry' },
  { id: 8, name: 'NWEA - Recovery Still Elusive: 2023-24 Student Achievement Report', url: 'https://www.nwea.org/research/publication/recovery-still-elusive-2023-24-student-achievement-highlights-persistent-achievement-gaps-and-a-long-road-ahead/' },
  { id: 9, name: 'Education Recovery Scorecard - Harvard/Stanford District-Level Analysis', url: 'https://educationscorecard.org/2025/02/11/although-no-state-improved-in-both-math-and-reading-on-the-naep-the-education-recovery-scorecard-highlights-the-work-of-over-100-districts-performing-above-pre-pandemic-levels-in-both-math-and-readin/' },
  { id: 10, name: 'Stanford Ed Data Archive - Educational Opportunity Project', url: 'https://edopportunity.org/recovery/about/' },
  { id: 11, name: 'DemandSage - AI in Education Statistics', url: 'https://www.demandsage.com/ai-in-education-statistics/' },
  { id: 12, name: 'Zippia - Tutor Demographics and Statistics 2025', url: 'https://www.zippia.com/tutor-jobs/demographics/' },
  { id: 13, name: 'DataUSA - Tutors Employment Profile', url: 'https://datausa.io/profile/soc/tutors' },
  { id: 14, name: 'Florida Virtual School - Graduation Rate Report 2026', url: 'https://www.flvs.net/about-us/who-we-are/newsroom/news-releases/2026/01/23/florida-virtual-school-graduation-rate-climbs-to-all-time-high-of-97' },
  { id: 15, name: 'Legacy Online School - K-12 Online School Statistics 2025', url: 'https://legacyonlineschool.com/blog/k-12-and-higher-education-online-schools-statistics-in-the-us-2025.html' },
  { id: 16, name: 'Education Endowment Foundation - Online Tutoring Evaluation', url: 'https://educationendowmentfoundation.org.uk/news/eef-publishes-findings-from-independent-evaluation-of-national-online-tutoring-pilot' },
  { id: 17, name: 'ScienceDirect - Economic Impact of Tutoring Research', url: 'https://www.sciencedirect.com/science/article/pii/S0047272724000185' },
  { id: 18, name: 'The 74 Million - Pandemic Recovery Data Analysis', url: 'https://www.the74million.org/article/national-state-data-point-to-slow-pace-of-pandemic-recovery/' },
  { id: 19, name: 'NWEA - From Loss to Recovery Research Brief', url: 'https://www.nwea.org/uploads/From-loss-to-recovery-diverring-paths-and-uneven-gains-across-schools_NWEA_researchBrief.pdf' },
  { id: 20, name: 'Mordor Intelligence - AI Tutors Market Report 2025-2030', url: 'https://www.mordorintelligence.com/industry-reports/ai-tutors-market' },
];

// ============================================================================
// FAQ DATA
// ============================================================================

const faqs = [
  {
    question: 'What is the size of the online tutoring market in the USA?',
    answer: 'The U.S. online tutoring market was valued at approximately $4.33 billion in 2024, according to Grand View Research. The market is projected to grow at a CAGR of 11.1% from 2025 to 2030, reaching an estimated $8.09 billion by 2030.'
  },
  {
    question: 'What percentage of tutoring is now online vs in-person?',
    answer: 'As of 2024, approximately 64% of tutoring sessions are conducted online, while 36% remain in-person. The shift to online tutoring accelerated significantly during the COVID-19 pandemic and has remained the dominant delivery method.'
  },
  {
    question: 'Is online tutoring as effective as in-person tutoring?',
    answer: 'Research from the Education Endowment Foundation shows that online tutoring produces identical academic outcomes to in-person tutoring, with both methods delivering an average of 5 months of additional learning progress. Studies from Brown University\'s Annenberg Institute found effect sizes of 0.1 to 0.4 standard deviations for high-dosage tutoring regardless of delivery method.'
  },
  {
    question: 'What is the most tutored subject in the USA?',
    answer: 'Math is the most tutored subject, accounting for 32-41% of all tutoring requests. Reading/ELA comes second at 17-28%, followed by test preparation at 22%. Within math, algebra is the most commonly requested topic.'
  },
  {
    question: 'How much do parents spend on tutoring annually?',
    answer: 'The typical U.S. family with school-age children spends $500-$2,000 per year on tutoring. Among families who actively use tutoring services, median annual spending is $1,400-$2,100. High-income families may spend up to $9,000 annually on tutoring and supplementary education.'
  },
  {
    question: 'What percentage of students use online tutoring?',
    answer: 'Approximately 21% of students in the U.S. receive some form of private tutoring. In 2023, 68% of parents with school-age children reported using tutoring services, with 44% starting tutoring for the first time after 2020.'
  },
  {
    question: 'How has COVID-19 affected online learning and tutoring?',
    answer: 'The COVID-19 pandemic dramatically accelerated online tutoring adoption. As of 2024, American students remain half a grade level behind pre-pandemic achievement levels. Only 14% of schools have fully recovered in both math and reading. High-income districts are 4x more likely to have recovered than low-income districts.'
  },
  {
    question: 'What is the average cost of online tutoring per hour?',
    answer: 'Online tutoring typically costs $30-$80 per hour, compared to $40-$90 for in-person tutoring. Test preparation services average $80/hour, while elite tutoring services can exceed $120/hour. In-person tutoring typically charges a 20-30% premium over online options.'
  },
  {
    question: 'How big is the AI tutoring market?',
    answer: 'The AI tutoring market is estimated at $3.55 billion in 2025 and is projected to reach $6.45 billion by 2030, growing at a CAGR of 12.69% according to Mordor Intelligence. Cloud-based AI tutors dominate with 71% market share, and K-12 institutions account for 46% of market spend.'
  },
  {
    question: 'What is the largest online school in the United States?',
    answer: 'Florida Virtual School (FLVS) is the largest virtual school in the United States, serving over 250,000 students during the 2024-25 school year. FLVS has a graduation rate of 92.6-97% and serves students in both part-time and full-time capacities.'
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
}

const StatCard = ({ value, label, subtext, icon, color, sourceId }: StatCardProps) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      {sourceId && (
        <span className="text-xs text-gray-400 font-mono">[{sourceId}]</span>
      )}
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
  { id: 'market-size', label: 'Market Size & Growth', icon: TrendingUp },
  { id: 'demographics', label: 'Demographics', icon: Users },
  { id: 'cost-spending', label: 'Cost & Spending', icon: DollarSign },
  { id: 'subjects', label: 'Most Tutored Subjects', icon: BookOpen },
  { id: 'effectiveness', label: 'Effectiveness', icon: Target },
  { id: 'k12-edtech', label: 'K-12 & EdTech', icon: School },
  { id: 'covid-impact', label: 'COVID Impact & Recovery', icon: AlertCircle },
  { id: 'ai-tutoring', label: 'AI Tutoring', icon: Brain },
  { id: 'workforce', label: 'Tutor Workforce', icon: GraduationCap },
  { id: 'florida', label: 'Florida Statistics', icon: Globe },
  { id: 'faq', label: 'FAQ', icon: BookOpen },
  { id: 'sources', label: 'Sources', icon: ExternalLink },
];

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function OnlineLearningUSAPage() {
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
            "headline": "Online Learning Statistics USA 2025: 100+ Facts & Data",
            "description": "Comprehensive online learning and tutoring statistics for the United States including market size, demographics, effectiveness data, and state-by-state analysis.",
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
              "@id": "https://www.thetutorbridge.com/statistics/online-learning/usa"
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
            "name": "Online Learning Statistics USA 2025",
            "description": "Comprehensive dataset of online learning, tutoring, and e-learning statistics for the United States",
            "url": "https://www.thetutorbridge.com/statistics/online-learning/usa",
            "keywords": ["online learning", "tutoring", "e-learning", "education statistics", "USA"],
            "creator": {
              "@type": "Organization",
              "name": "The Tutor Bridge"
            },
            "temporalCoverage": "2018/2025",
            "spatialCoverage": "United States"
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
              { "@type": "ListItem", "position": 4, "name": "USA", "item": "https://www.thetutorbridge.com/statistics/online-learning/usa" }
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
            <span className="text-gray-500">Online Learning</span>
            <span className="text-gray-300">/</span>
            <span className="text-slate-900 font-medium">USA</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)' }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

        <div className="relative py-16 md:py-24 px-4 sm:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-6">
              <Calendar className="w-4 h-4 text-blue-300" />
              <span className="text-gray-200">Last Updated: {lastUpdated}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
              Online Learning Statistics
              <span className="block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #60a5fa, #34d399)' }}>
                USA 2025
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
                  className="font-semibold text-white hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  Rishabh Jain
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
              The most comprehensive collection of online tutoring and e-learning statistics for the United States.
              <span className="text-white font-semibold"> 100+ data points</span> from <span className="text-white font-semibold">40+ authoritative sources</span>.
            </p>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-3xl md:text-4xl font-bold text-white">$4.3B</div>
                <div className="text-sm text-gray-300 mt-1">Market Size 2024</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-3xl md:text-4xl font-bold text-emerald-400">64%</div>
                <div className="text-sm text-gray-300 mt-1">Sessions Online</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-3xl md:text-4xl font-bold text-amber-400">68%</div>
                <div className="text-sm text-gray-300 mt-1">Parents Using Tutoring</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-3xl md:text-4xl font-bold text-blue-400">11.1%</div>
                <div className="text-sm text-gray-300 mt-1">CAGR 2025-2030</div>
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
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors border border-gray-100 hover:border-blue-200"
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
          {/* Main Content Area */}
          <main className="space-y-12">
            {/* Key Takeaways */}
            <section id="key-takeaways" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Key Takeaways</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { stat: '$4.33 billion', text: 'US online tutoring market size in 2024' },
                    { stat: '68%', text: 'of US parents used tutoring in 2023' },
                    { stat: '64%', text: 'of tutoring sessions are now online' },
                    { stat: '41%', text: 'of tutoring demand is for math' },
                    { stat: '5 months', text: 'additional learning from tutoring (avg)' },
                    { stat: '11.1%', text: 'projected CAGR through 2030' },
                    { stat: '14%', text: 'of schools recovered from COVID learning loss' },
                    { stat: '250,000+', text: 'students at Florida Virtual School' },
                    { stat: '$6.45B', text: 'projected AI tutoring market by 2030' },
                    { stat: '185,000', text: 'tutors working in the USA' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white/60 rounded-xl p-4">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-900">{item.stat}</span>
                        <span className="text-gray-600"> — {item.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Market Size & Growth */}
            <section id="market-size" className="scroll-mt-24 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Market Size & Growth</h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                The United States online tutoring market has experienced significant growth, accelerated by the COVID-19 pandemic.
                The market is projected to continue expanding as digital learning becomes increasingly mainstream.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <StatCard
                  value="$4.33B"
                  label="Market Size (2024)"
                  subtext="US online tutoring market"
                  icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
                  color="bg-emerald-100"
                  sourceId={1}
                />
                <StatCard
                  value="$8.09B"
                  label="Projected by 2030"
                  subtext="Expected market value"
                  icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
                  color="bg-blue-100"
                  sourceId={1}
                />
                <StatCard
                  value="11.1%"
                  label="CAGR (2025-2030)"
                  subtext="Compound annual growth rate"
                  icon={<BarChart3 className="w-6 h-6 text-violet-600" />}
                  color="bg-violet-100"
                  sourceId={3}
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <ChartWrapper title="US Tutoring Market Size Over Time ($ Billions)" sourceIds={[1, 2, 6]}>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={marketGrowthData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                        formatter={(value: number) => [`$${value}B`, 'Market Size']}
                      />
                      <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#colorValue)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartWrapper>

                <ChartWrapper title="Online vs In-Person Tutoring (2024)" sourceIds={[5]}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={onlineVsInPersonData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {onlineVsInPersonData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`${value}%`, 'Share']} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartWrapper>
              </div>

              {/* Market Statistics Table */}
              <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Market Size Estimates by Source</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Metric</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Value</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Source</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr><td className="px-6 py-4 text-sm">Online tutoring market (2024)</td><td className="px-6 py-4 text-sm font-semibold">$4.33 billion</td><td className="px-6 py-4 text-sm text-gray-500">Grand View Research</td></tr>
                      <tr><td className="px-6 py-4 text-sm">Market size - conservative (2024)</td><td className="px-6 py-4 text-sm font-semibold">$1.8 billion</td><td className="px-6 py-4 text-sm text-gray-500">IBISWorld</td></tr>
                      <tr><td className="px-6 py-4 text-sm">Projected market (2030)</td><td className="px-6 py-4 text-sm font-semibold">$8.09 billion</td><td className="px-6 py-4 text-sm text-gray-500">Grand View Research</td></tr>
                      <tr><td className="px-6 py-4 text-sm">Total US tutoring spend (2023)</td><td className="px-6 py-4 text-sm font-semibold">$9.1 billion</td><td className="px-6 py-4 text-sm text-gray-500">Gitnux</td></tr>
                      <tr><td className="px-6 py-4 text-sm">SAT/ACT prep revenue (2023)</td><td className="px-6 py-4 text-sm font-semibold">$1.5 billion</td><td className="px-6 py-4 text-sm text-gray-500">TutorBase</td></tr>
                      <tr><td className="px-6 py-4 text-sm">Test prep CAGR (2025-2030)</td><td className="px-6 py-4 text-sm font-semibold">12.5%</td><td className="px-6 py-4 text-sm text-gray-500">Technavio</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Demographics */}
            <section id="demographics" className="scroll-mt-24 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-violet-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Who Uses Online Tutoring</h2>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Online tutoring usage spans across income levels, grade levels, and demographics.
                Higher-income families are more likely to use tutoring services, and the majority of demand comes from K-12 students.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                  value="68%"
                  label="Parents Using Tutoring"
                  subtext="In 2023"
                  icon={<Users className="w-6 h-6 text-violet-600" />}
                  color="bg-violet-100"
                  sourceId={5}
                />
                <StatCard
                  value="21%"
                  label="Students Receiving Tutoring"
                  subtext="US average"
                  icon={<GraduationCap className="w-6 h-6 text-blue-600" />}
                  color="bg-blue-100"
                  sourceId={4}
                />
                <StatCard
                  value="44%"
                  label="Started Post-2020"
                  subtext="New tutoring users"
                  icon={<Calendar className="w-6 h-6 text-emerald-600" />}
                  color="bg-emerald-100"
                  sourceId={5}
                />
                <StatCard
                  value="75%"
                  label="Asian-American Usage"
                  subtext="3x national average"
                  icon={<Target className="w-6 h-6 text-amber-600" />}
                  color="bg-amber-100"
                  sourceId={6}
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <ChartWrapper title="Tutoring Consumers by Household Income" sourceIds={[6]}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={demographicsIncomeData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" tick={{ fontSize: 12 }} domain={[0, 60]} />
                      <YAxis dataKey="income" type="category" tick={{ fontSize: 12 }} width={100} />
                      <Tooltip formatter={(value: number) => [`${value}%`, 'Share']} />
                      <Bar dataKey="percentage" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartWrapper>

                <ChartWrapper title="Tutoring Demand by Grade Level" sourceIds={[7]}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={gradeDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {gradeDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`${value}%`, 'Share']} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartWrapper>
              </div>

              {/* Demographics Table */}
              <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Detailed Demographics Data</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Demographic</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Statistic</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Source</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr><td className="px-6 py-4 text-sm">Households earning $100K+</td><td className="px-6 py-4 text-sm font-semibold">55% of consumers</td><td className="px-6 py-4 text-sm text-gray-500">Gitnux</td></tr>
                      <tr><td className="px-6 py-4 text-sm">Working parents (dual-income)</td><td className="px-6 py-4 text-sm font-semibold">67% of spenders</td><td className="px-6 py-4 text-sm text-gray-500">Gitnux</td></tr>
                      <tr><td className="px-6 py-4 text-sm">Students in grades 6-12</td><td className="px-6 py-4 text-sm font-semibold">48% of online users</td><td className="px-6 py-4 text-sm text-gray-500">Gitnux</td></tr>
                      <tr><td className="px-6 py-4 text-sm">High schoolers for SAT/ACT</td><td className="px-6 py-4 text-sm font-semibold">42% of demand</td><td className="px-6 py-4 text-sm text-gray-500">TutorBase</td></tr>
                      <tr><td className="px-6 py-4 text-sm">Women (online tutoring users)</td><td className="px-6 py-4 text-sm font-semibold">58%</td><td className="px-6 py-4 text-sm text-gray-500">Gitnux</td></tr>
                      <tr><td className="px-6 py-4 text-sm">Urban vs rural usage</td><td className="px-6 py-4 text-sm font-semibold">60% higher in urban</td><td className="px-6 py-4 text-sm text-gray-500">Gitnux</td></tr>
                      <tr><td className="px-6 py-4 text-sm">Students with IEPs</td><td className="px-6 py-4 text-sm font-semibold">18% of tutoring students</td><td className="px-6 py-4 text-sm text-gray-500">Gitnux</td></tr>
                      <tr><td className="px-6 py-4 text-sm">Homeschooled receiving tutoring</td><td className="px-6 py-4 text-sm font-semibold">65%</td><td className="px-6 py-4 text-sm text-gray-500">Gitnux</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Cost & Spending */}
            <section id="cost-spending" className="scroll-mt-24 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Cost & Spending Data</h2>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                What parents spend on tutoring varies significantly by income level and tutoring type.
                Online tutoring typically costs 20-30% less than in-person alternatives.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <StatCard
                  value="$500-$2,000"
                  label="Typical Annual Spend"
                  subtext="Per family with students"
                  icon={<DollarSign className="w-6 h-6 text-amber-600" />}
                  color="bg-amber-100"
                />
                <StatCard
                  value="$30-$80/hr"
                  label="Online Tutoring Rate"
                  subtext="Average hourly cost"
                  icon={<Laptop className="w-6 h-6 text-blue-600" />}
                  color="bg-blue-100"
                />
                <StatCard
                  value="$9,000/yr"
                  label="High-Income Spending"
                  subtext="Top earners annual"
                  icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
                  color="bg-emerald-100"
                />
              </div>

              {/* Cost Tables */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 bg-amber-50">
                    <h3 className="font-semibold text-gray-900">Annual Spending by Income</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    <div className="px-6 py-4 flex justify-between"><span>Typical family</span><span className="font-semibold">$500-$2,000/year</span></div>
                    <div className="px-6 py-4 flex justify-between"><span>Median (tutoring users)</span><span className="font-semibold">$1,400-$2,100/year</span></div>
                    <div className="px-6 py-4 flex justify-between"><span>Highest income quartile</span><span className="font-semibold">$3,200-$4,800/year</span></div>
                    <div className="px-6 py-4 flex justify-between"><span>Top 10% families</span><span className="font-semibold">$6,000-$12,000/year</span></div>
                    <div className="px-6 py-4 flex justify-between"><span>Low-income families</span><span className="font-semibold">~$1,300/year</span></div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 bg-blue-50">
                    <h3 className="font-semibold text-gray-900">Hourly Rates by Type</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    <div className="px-6 py-4 flex justify-between"><span>General online tutoring</span><span className="font-semibold">$30-$80/hour</span></div>
                    <div className="px-6 py-4 flex justify-between"><span>In-person tutoring</span><span className="font-semibold">$40-$90/hour</span></div>
                    <div className="px-6 py-4 flex justify-between"><span>Tutoring centers</span><span className="font-semibold">$25-$75/hour</span></div>
                    <div className="px-6 py-4 flex justify-between"><span>Test prep average</span><span className="font-semibold">$80/hour</span></div>
                    <div className="px-6 py-4 flex justify-between"><span>Elite services</span><span className="font-semibold">$120+/hour</span></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Most Tutored Subjects */}
            <section id="subjects" className="scroll-mt-24 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Most Tutored Subjects</h2>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Mathematics dominates tutoring demand, followed by reading/ELA and test preparation.
                Within math, algebra is the most requested topic due to its foundational importance.
              </p>

              <div className="grid lg:grid-cols-2 gap-6">
                <ChartWrapper title="Tutoring Demand by Subject (%)" sourceIds={[4, 7]}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={subjectDemandData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip formatter={(value: number) => [`${value}%`, 'Demand Share']} />
                      <Bar dataKey="percentage" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartWrapper>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Subject Breakdown Details</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    <div className="px-6 py-4">
                      <div className="font-semibold text-gray-900 mb-2">Math (32-41%)</div>
                      <div className="text-sm text-gray-500">Algebra (7.7%), Calculus (3.7%), Statistics (2.3%), Geometry (2%)</div>
                    </div>
                    <div className="px-6 py-4">
                      <div className="font-semibold text-gray-900 mb-2">Reading/ELA (17-28%)</div>
                      <div className="text-sm text-gray-500">Reading comprehension, writing, grammar, essay help</div>
                    </div>
                    <div className="px-6 py-4">
                      <div className="font-semibold text-gray-900 mb-2">Science (17%)</div>
                      <div className="text-sm text-gray-500">Chemistry (6.1%), Physics (~5%), Biology (~5%)</div>
                    </div>
                    <div className="px-6 py-4">
                      <div className="font-semibold text-gray-900 mb-2">Test Prep (22%)</div>
                      <div className="text-sm text-gray-500">SAT, ACT, AP exams, college entrance</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Effectiveness */}
            <section id="effectiveness" className="scroll-mt-24 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Effectiveness & Outcomes</h2>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Research consistently shows that online tutoring is equally effective as in-person tutoring.
                High-dosage tutoring programs show the strongest academic gains.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <StatCard
                  value="5 months"
                  label="Additional Learning"
                  subtext="Average progress from tutoring"
                  icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
                  color="bg-emerald-100"
                  sourceId={16}
                />
                <StatCard
                  value="0.2-0.4 SD"
                  label="Effect Size"
                  subtext="High-dosage tutoring impact"
                  icon={<BarChart3 className="w-6 h-6 text-blue-600" />}
                  color="bg-blue-100"
                  sourceId={10}
                />
                <StatCard
                  value="72%"
                  label="Parents Agree"
                  subtext="Online = in-person effectiveness"
                  icon={<CheckCircle className="w-6 h-6 text-violet-600" />}
                  color="bg-violet-100"
                  sourceId={5}
                />
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Research Findings on Tutoring Effectiveness</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/60 rounded-xl p-5">
                    <div className="text-emerald-600 font-semibold mb-2">Education Endowment Foundation</div>
                    <p className="text-gray-600 text-sm">Online and in-person tutoring produce <strong>identical academic outcomes</strong>, with both delivering an average of 5 months additional progress.</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-5">
                    <div className="text-emerald-600 font-semibold mb-2">Annenberg Institute (Brown)</div>
                    <p className="text-gray-600 text-sm">High-dosage tutoring produces effect sizes of <strong>0.1-0.4 standard deviations</strong>, equivalent to 3-15 months of additional learning.</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-5">
                    <div className="text-emerald-600 font-semibold mb-2">ScienceDirect Study</div>
                    <p className="text-gray-600 text-sm">Online tutoring program reduced likelihood of grade repetition by <strong>74%</strong> for disadvantaged students.</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-5">
                    <div className="text-emerald-600 font-semibold mb-2">Completion Rates</div>
                    <p className="text-gray-600 text-sm">Tutoring with feedback achieves <strong>41% completion rates</strong> vs 18.5% for traditional MOOCs without support.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* K-12 & EdTech */}
            <section id="k12-edtech" className="scroll-mt-24 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <School className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">K-12 & EdTech Statistics</h2>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Digital learning has become ubiquitous in K-12 education, with most schools now offering 1-to-1 computing programs
                and teachers increasingly adopting AI tools.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                  value="88%"
                  label="Schools with 1:1 Computing"
                  icon={<Laptop className="w-6 h-6 text-blue-600" />}
                  color="bg-blue-100"
                  sourceId={15}
                />
                <StatCard
                  value="85%"
                  label="Teachers Using LMS"
                  icon={<School className="w-6 h-6 text-emerald-600" />}
                  color="bg-emerald-100"
                  sourceId={15}
                />
                <StatCard
                  value="60%"
                  label="Teachers Using AI"
                  icon={<Brain className="w-6 h-6 text-violet-600" />}
                  color="bg-violet-100"
                  sourceId={15}
                />
                <StatCard
                  value="2,739"
                  label="EdTech Tools/District"
                  subtext="Up 8% YoY"
                  icon={<BarChart3 className="w-6 h-6 text-amber-600" />}
                  color="bg-amber-100"
                  sourceId={15}
                />
              </div>

              <ChartWrapper title="EdTech Tools Accessed Per School District" sourceIds={[15]}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={edtechAdoptionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value: number) => [value.toLocaleString(), 'EdTech Tools']} />
                    <Line type="monotone" dataKey="tools" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6' }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartWrapper>

              <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">K-12 Digital Learning Statistics</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Metric</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr><td className="px-6 py-4 text-sm">K-12 online learning growth since 2000</td><td className="px-6 py-4 text-sm font-semibold">900%</td></tr>
                      <tr><td className="px-6 py-4 text-sm">Students engaging in online learning daily</td><td className="px-6 py-4 text-sm font-semibold">63%</td></tr>
                      <tr><td className="px-6 py-4 text-sm">Students wanting to continue online classes</td><td className="px-6 py-4 text-sm font-semibold">73%</td></tr>
                      <tr><td className="px-6 py-4 text-sm">Schools with high-speed internet</td><td className="px-6 py-4 text-sm font-semibold">77%</td></tr>
                      <tr><td className="px-6 py-4 text-sm">US homeschool rate (2024-25)</td><td className="px-6 py-4 text-sm font-semibold">5.2-5.4% (3M+ children)</td></tr>
                      <tr><td className="px-6 py-4 text-sm">Teachers using AI weekly</td><td className="px-6 py-4 text-sm font-semibold">32%</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* COVID Impact */}
            <section id="covid-impact" className="scroll-mt-24 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">COVID-19 Impact & Learning Recovery</h2>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                The COVID-19 pandemic caused significant learning loss that students are still recovering from.
                High-income districts have recovered at 4x the rate of low-income districts.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <StatCard
                  value="½ Grade Level"
                  label="Students Behind"
                  subtext="Pre-pandemic achievement"
                  icon={<AlertCircle className="w-6 h-6 text-red-600" />}
                  color="bg-red-100"
                  sourceId={9}
                />
                <StatCard
                  value="14%"
                  label="Schools Fully Recovered"
                  subtext="Both math & reading"
                  icon={<CheckCircle className="w-6 h-6 text-emerald-600" />}
                  color="bg-emerald-100"
                  sourceId={8}
                />
                <StatCard
                  value="4x"
                  label="High vs Low Income"
                  subtext="Recovery rate difference"
                  icon={<TrendingUp className="w-6 h-6 text-amber-600" />}
                  color="bg-amber-100"
                  sourceId={18}
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <ChartWrapper title="School Recovery Status (%)" sourceIds={[8]}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={learningRecoveryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="percentage"
                        label={({ category, percentage }) => `${percentage}%`}
                      >
                        {learningRecoveryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`${value}%`, 'Schools']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartWrapper>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 bg-red-50">
                    <h3 className="font-semibold text-gray-900">Learning Loss Statistics</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    <div className="px-6 py-4 flex justify-between"><span>Additional reading schooling needed</span><span className="font-semibold">4.8 months</span></div>
                    <div className="px-6 py-4 flex justify-between"><span>Additional math schooling needed</span><span className="font-semibold">4.4 months</span></div>
                    <div className="px-6 py-4 flex justify-between"><span>Seniors proficient in math (2024)</span><span className="font-semibold">22% (down from 24%)</span></div>
                    <div className="px-6 py-4 flex justify-between"><span>Seniors proficient in reading (2024)</span><span className="font-semibold">35% (down from 37%)</span></div>
                    <div className="px-6 py-4 flex justify-between"><span>Chronic absenteeism (2022)</span><span className="font-semibold">29% (up from 15%)</span></div>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Tutoring */}
            <section id="ai-tutoring" className="scroll-mt-24 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">AI Tutoring Market</h2>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                AI-powered tutoring is the fastest-growing segment of the education technology market,
                with tools like Khan Academy's Khanmigo seeing explosive adoption.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <StatCard
                  value="$3.55B"
                  label="AI Tutors Market (2025)"
                  icon={<Brain className="w-6 h-6 text-purple-600" />}
                  color="bg-purple-100"
                  sourceId={20}
                />
                <StatCard
                  value="$6.45B"
                  label="Projected by 2030"
                  icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
                  color="bg-emerald-100"
                  sourceId={20}
                />
                <StatCard
                  value="12.69%"
                  label="AI Tutoring CAGR"
                  icon={<BarChart3 className="w-6 h-6 text-blue-600" />}
                  color="bg-blue-100"
                  sourceId={20}
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <ChartWrapper title="AI in Education Market Growth ($ Billions)" sourceIds={[11]}>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={aiTutoringGrowthData}>
                      <defs>
                        <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip formatter={(value: number) => [`$${value}B`, 'Market Size']} />
                      <Area type="monotone" dataKey="value" stroke="#8b5cf6" fill="url(#colorAI)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartWrapper>

                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Tutoring Highlights</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Khan Academy Khanmigo</div>
                        <div className="text-sm text-gray-600">Grew from 68K to 1.4M users in one year; 380+ district partners</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <School className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">K-12 AI Adoption</div>
                        <div className="text-sm text-gray-600">45.62% of K-12 institutions use AI tutoring tools</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">North America Share</div>
                        <div className="text-sm text-gray-600">38% of global AI education market revenue</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tutor Workforce */}
            <section id="workforce" className="scroll-mt-24 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Tutor Workforce Statistics</h2>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                The tutoring workforce has been declining despite increased demand, creating a significant gap between
                students who need tutoring and available tutors.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                  value="185,000"
                  label="Tutors in USA"
                  subtext="As of 2024"
                  icon={<Users className="w-6 h-6 text-teal-600" />}
                  color="bg-teal-100"
                  sourceId={13}
                />
                <StatCard
                  value="40%"
                  label="Schools Struggle to Hire"
                  icon={<AlertCircle className="w-6 h-6 text-red-600" />}
                  color="bg-red-100"
                  sourceId={19}
                />
                <StatCard
                  value="66%"
                  label="Female Tutors"
                  icon={<Users className="w-6 h-6 text-pink-600" />}
                  color="bg-pink-100"
                  sourceId={12}
                />
                <StatCard
                  value="$21.50"
                  label="Median Hourly Wage"
                  icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
                  color="bg-emerald-100"
                  sourceId={4}
                />
              </div>

              <ChartWrapper title="US Tutor Workforce Over Time" sourceIds={[12, 13]}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={tutorWorkforceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} domain={[170000, 200000]} />
                    <Tooltip formatter={(value: number) => [value.toLocaleString(), 'Tutors']} />
                    <Bar dataKey="tutors" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartWrapper>

              <div className="mt-8 grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Tutor Demographics</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    <div className="px-6 py-4 flex justify-between"><span>Ages 16-29</span><span className="font-semibold">66.5% of workforce</span></div>
                    <div className="px-6 py-4 flex justify-between"><span>White</span><span className="font-semibold">56.8%</span></div>
                    <div className="px-6 py-4 flex justify-between"><span>Hispanic/Latino</span><span className="font-semibold">15.4%</span></div>
                    <div className="px-6 py-4 flex justify-between"><span>Asian</span><span className="font-semibold">11.5%</span></div>
                    <div className="px-6 py-4 flex justify-between"><span>Black/African American</span><span className="font-semibold">9.9%</span></div>
                    <div className="px-6 py-4 flex justify-between"><span>Part-time tutors</span><span className="font-semibold">65%</span></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">The Tutor Shortage</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span><strong>16 million</strong> students need individualized support but can't access it</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>Less than <strong>1 in 6</strong> American students receives any tutoring</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>Less than <strong>1 in 50</strong> receives high-quality tutoring</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span><strong>300,000</strong> new tutor jobs projected by 2030</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Florida Statistics */}
            <section id="florida" className="scroll-mt-24 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Florida Virtual School Statistics</h2>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Florida Virtual School (FLVS) is the largest and most established virtual school in the United States,
                serving over 250,000 students annually with high graduation rates.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                  value="250,000+"
                  label="Students Served"
                  subtext="2024-25 school year"
                  icon={<Users className="w-6 h-6 text-orange-600" />}
                  color="bg-orange-100"
                  sourceId={14}
                />
                <StatCard
                  value="92.6-97%"
                  label="Graduation Rate"
                  icon={<GraduationCap className="w-6 h-6 text-emerald-600" />}
                  color="bg-emerald-100"
                  sourceId={14}
                />
                <StatCard
                  value="222"
                  label="Virtual Schools"
                  subtext="Highest in US (2019-20)"
                  icon={<School className="w-6 h-6 text-blue-600" />}
                  color="bg-blue-100"
                  sourceId={4}
                />
                <StatCard
                  value="1,100+"
                  label="2024 Graduates"
                  icon={<CheckCircle className="w-6 h-6 text-violet-600" />}
                  color="bg-violet-100"
                  sourceId={14}
                />
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-orange-50">
                  <h3 className="font-semibold text-gray-900">FLVS Detailed Statistics</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Metric</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr><td className="px-6 py-4 text-sm">Full-time enrolled students</td><td className="px-6 py-4 text-sm font-semibold">~9,000</td></tr>
                      <tr><td className="px-6 py-4 text-sm">High school enrollment (9-12)</td><td className="px-6 py-4 text-sm font-semibold">4,331</td></tr>
                      <tr><td className="px-6 py-4 text-sm">Student-teacher ratio</td><td className="px-6 py-4 text-sm font-semibold">27-29:1</td></tr>
                      <tr><td className="px-6 py-4 text-sm">AP participation rate</td><td className="px-6 py-4 text-sm font-semibold">21%</td></tr>
                      <tr><td className="px-6 py-4 text-sm">Minority enrollment</td><td className="px-6 py-4 text-sm font-semibold">60%</td></tr>
                      <tr><td className="px-6 py-4 text-sm">Economically disadvantaged</td><td className="px-6 py-4 text-sm font-semibold">18.6%</td></tr>
                      <tr><td className="px-6 py-4 text-sm">Female students</td><td className="px-6 py-4 text-sm font-semibold">54%</td></tr>
                      <tr><td className="px-6 py-4 text-sm">Hispanic/Latino students</td><td className="px-6 py-4 text-sm font-semibold">31.9%</td></tr>
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
                      expandedFaq === index ? 'border-blue-200 shadow-md' : 'border-gray-100'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                      <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                        expandedFaq === index ? 'rotate-180 bg-blue-100' : ''
                      }`}>
                        <ChevronDown className={`w-4 h-4 ${expandedFaq === index ? 'text-blue-600' : 'text-gray-500'}`} />
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
                All statistics on this page are sourced from reputable research organizations, government agencies, and industry reports.
                Click on any source to verify the data.
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
                      <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-sm font-semibold flex items-center justify-center flex-shrink-0">
                        {citation.id}
                      </span>
                      <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                        {citation.name}
                      </span>
                      <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-blue-600 ml-auto flex-shrink-0" />
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
                  href="/statistics/online-learning/usa/florida"
                  className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-2xl mb-2">🌴</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">Florida Statistics</h3>
                  <p className="text-sm text-gray-500">Detailed Florida online learning data</p>
                </Link>
                <Link
                  href="/statistics/online-learning/usa/california"
                  className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-2xl mb-2">☀️</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">California Statistics</h3>
                  <p className="text-sm text-gray-500">Coming soon</p>
                </Link>
                <Link
                  href="/statistics/online-learning/usa/texas"
                  className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-2xl mb-2">⭐</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">Texas Statistics</h3>
                  <p className="text-sm text-gray-500">Coming soon</p>
                </Link>
              </div>
            </section>
          </main>
      </div>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)' }}>
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Need Help With Your Studies?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Get personalized tutoring from expert tutors. Online or in-person sessions available.
          </p>
          <Link
            href="/tutoring/free-consultation"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-white text-slate-900 hover:bg-gray-100 transition-all shadow-xl"
          >
            Get Free Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
