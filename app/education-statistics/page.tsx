import Link from 'next/link';
import {
  BarChart3,
  Home,
  BookOpen,
  GraduationCap,
  Globe,
  Smartphone,
  Clock,
  TrendingUp,
  Users,
  Brain,
  Monitor,
  DollarSign,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Target
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

export default function EducationStatisticsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How many hours do students study per day on average?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "According to OECD data, students attend an average of 4.3 hours of instruction per day in primary school, 5.0 hours in lower secondary, and 5.2 hours in upper secondary. Homework time varies significantly by country, with Chinese students spending 13.8 hours per week on homework compared to just 2.8 hours in Finland and South Korea."
                }
              },
              {
                "@type": "Question",
                "name": "Is online learning more effective than classroom learning?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Research shows mixed results. Studies suggest students retain 25-60% of material learned online versus 8-10% in traditional settings. A 2025 UK survey found 71% of students find online learning more effective for exam preparation, with 77% reporting improved grades. However, 43% of students found online instruction worse than in-person, and 60% of new online learners reported boredom and lack of motivation."
                }
              },
              {
                "@type": "Question",
                "name": "How does screen time affect academic performance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Research shows a nuanced relationship: academic screen time correlates positively with exam performance, while non-academic screen time has negative effects. A 2025 study of medical students found academic screen time correlated positively with exam marks (r=0.541), while recreational use had negative impacts. Studies of 17,150 Chinese students found screen time negatively correlated with all academic scores."
                }
              },
              {
                "@type": "Question",
                "name": "What percentage of students use AI for studying?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "AI adoption among students has surged dramatically. According to HEPI's 2025 survey, 92% of students now use AI tools (up from 66% in 2024), and 88% use generative AI for assessments. Among high school students, 84% use AI for schoolwork, with 69% specifically using ChatGPT. Approximately 90% of students using AI find it more beneficial than traditional tutoring."
                }
              },
              {
                "@type": "Question",
                "name": "How big is the global e-learning market?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The global e-learning market is valued between $293-439 billion in 2025 depending on the research source, with projections reaching $808 billion to over $2 trillion by 2033-2035. The market is growing at 13-20% annually, driven by AI adoption, corporate upskilling demands, and post-pandemic structural changes in education."
                }
              }
            ]
          })
        }}
      />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Education Statistics 2026: 100+ Facts on Learning, Screen Time & Study Habits",
            "description": "Comprehensive education statistics covering global study habits, online learning effectiveness, screen time impact, AI adoption, and tutoring industry trends.",
            "author": {
              "@type": "Organization",
              "name": "The Tutor Bridge"
            },
            "publisher": {
              "@type": "Organization",
              "name": "The Tutor Bridge",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.thetutorbridge.com/TheTutorBridge Logo New.png"
              }
            },
            "datePublished": "2026-01-15",
            "dateModified": "2026-06-13"
          })
        }}
      />

      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-indigo-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Education Statistics</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <BarChart3 className="w-10 h-10" />
            </div>
            <div className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
              Updated June 2026
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Education Statistics 2026
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed mb-8">
              100+ comprehensive statistics on global study habits, online learning trends, screen time impact, AI in education, and the future of learning.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-bold">50+</span> Research Sources
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-bold">100+</span> Statistics
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-bold">30+</span> Countries Covered
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Stats Banner */}
      <div className="bg-white border-b-2 border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-1">92%</div>
              <div className="text-sm text-gray-600">Students use AI tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-1">$325B</div>
              <div className="text-sm text-gray-600">E-learning market (2025)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-1">13.8 hrs</div>
              <div className="text-sm text-gray-600">Weekly homework (China)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-1">88%</div>
              <div className="text-sm text-gray-600">Global adult literacy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl p-6 md:p-8 border border-indigo-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Table of Contents
            </h2>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <a href="#study-habits" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-white">
                <Clock className="w-4 h-4" />
                Global Study Habits Statistics
              </a>
              <a href="#online-vs-classroom" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-white">
                <Monitor className="w-4 h-4" />
                Online vs Classroom Learning
              </a>
              <a href="#screen-time" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-white">
                <Smartphone className="w-4 h-4" />
                Screen Time & Academic Performance
              </a>
              <a href="#study-hours" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-white">
                <Globe className="w-4 h-4" />
                Study Hours by Country
              </a>
              <a href="#ai-education" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-white">
                <Brain className="w-4 h-4" />
                AI in Education Statistics
              </a>
              <a href="#elearning-market" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-white">
                <TrendingUp className="w-4 h-4" />
                E-Learning Market Statistics
              </a>
              <a href="#literacy" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-white">
                <GraduationCap className="w-4 h-4" />
                Global Literacy & Education Rates
              </a>
              <a href="#tutoring" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-white">
                <Users className="w-4 h-4" />
                Tutoring Industry Statistics
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Section 1: Global Study Habits */}
          <section id="study-habits" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Global Student Study Habits Statistics
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Understanding how students study across the globe reveals fascinating patterns in learning behavior, time management, and academic achievement. Here are the latest statistics on student study habits from 2025-2026 research.
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-xl p-6 border-l-4 border-indigo-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-indigo-600">60%+</div>
                  <div>
                    <p className="text-gray-800 font-medium">Active Recall Sessions</p>
                    <p className="text-gray-600 text-sm mt-1">Students who dedicate over 60% of their study sessions to active recall demonstrate significantly higher exam scores than passive learners.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: Research.com, 2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-purple-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-purple-600">5-6 hrs</div>
                  <div>
                    <p className="text-gray-800 font-medium">Daily Deep Work Sessions</p>
                    <p className="text-gray-600 text-sm mt-1">High-performing students maintain daily deep work sessions of 5-6 hours, utilizing AI-driven time management and digital focus modes to eliminate interruptions.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: Chen et al., 2025 Longitudinal Study</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-teal-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-teal-600">#1</div>
                  <div>
                    <p className="text-gray-800 font-medium">School as Primary Stressor</p>
                    <p className="text-gray-600 text-sm mt-1">School is the biggest source of stress among students globally. Students are prone to setting objectives but lack time management skills to achieve them.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: Hamilton & Zhou, 2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-orange-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-orange-600">43%</div>
                  <div>
                    <p className="text-gray-800 font-medium">International Students Using Support Services</p>
                    <p className="text-gray-600 text-sm mt-1">43% of international students rely on at least one academic support service during their first year abroad, including tutoring, writing assistance, or language programs.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: WritePaper Research, 2025</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Key Study Habit Insights
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Students using <strong>retrieval-based techniques</strong> (at least 5 methods) show significantly higher exam performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Quality and intensity</strong> of engagement are better predictors of success than total weeks spent studying</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Peer-to-peer reciprocal teaching</strong> is among the top study habits of high achievers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Micro-goal setting</strong> helps students prioritize tasks effectively</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: Online vs Classroom Learning */}
          <section id="online-vs-classroom" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Monitor className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Online Learning vs Classroom Learning Statistics
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The debate between online and traditional classroom learning continues to evolve. Here's what the latest research reveals about effectiveness, retention, and student preferences.
            </p>

            {/* Retention Comparison */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Knowledge Retention Comparison</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 text-center">
                  <div className="text-5xl font-bold text-purple-600 mb-2">25-60%</div>
                  <div className="text-lg font-semibold text-gray-800">Online Learning</div>
                  <div className="text-sm text-gray-600 mt-2">Retention rate</div>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-xl p-6 text-center">
                  <div className="text-5xl font-bold text-gray-600 mb-2">8-10%</div>
                  <div className="text-lg font-semibold text-gray-800">Traditional Learning</div>
                  <div className="text-sm text-gray-600 mt-2">Retention rate</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">Source: Multiple studies compiled by Research.com, 2026</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-xl p-6 border-l-4 border-green-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-green-600">71%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Students Find Online Learning More Effective for Exams</p>
                    <p className="text-gray-600 text-sm mt-1">According to a 2025 survey of UK students, 71% find online learning more effective than classroom learning for exam preparation.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: SaveMyExams Survey, 2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-blue-600">77%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Report Grade Improvement</p>
                    <p className="text-gray-600 text-sm mt-1">77% of students report that online learning has improved their grades by at least one level.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: SaveMyExams Survey, 2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-indigo-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-indigo-600">70%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Students Prefer Online Learning Advantages</p>
                    <p className="text-gray-600 text-sm mt-1">70% of students believe online learning offers advantages over traditional classrooms, citing flexibility and personalized learning pace as key benefits.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: Online Learning Statistics 2026</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-amber-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-amber-600">45%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Graduate Students in Fully Online Programs</p>
                    <p className="text-gray-600 text-sm mt-1">Graduate enrollment in fully online study reached 45% in 2024-2025, outpacing traditional classroom formats.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: Research.com, 2026</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenges */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Online Learning Challenges
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl font-bold text-amber-600">43%</div>
                  <p className="text-sm text-gray-700">of college students believe online instruction was worse than in-person</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl font-bold text-amber-600">60%</div>
                  <p className="text-sm text-gray-700">of students new to online learning found it boring and lacked motivation</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Screen Time */}
          <section id="screen-time" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Screen Time & Academic Performance Statistics
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The relationship between screen time and academic performance is nuanced. Research shows that the <em>type</em> of screen time matters significantly more than total hours.
            </p>

            {/* Key Finding Highlight */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-6 md:p-8 text-white mb-8">
              <h3 className="text-xl font-bold mb-4">Key Research Finding</h3>
              <p className="text-lg mb-4">
                A prospective study among 102 MBBS students found that <strong>academic screen time correlates positively with exam marks</strong> (r = 0.541, p {"<"} 0.001), while non-academic screen time has negative effects.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/20 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">2.9 hrs</div>
                  <div className="text-sm opacity-90">Academic screen time/day</div>
                </div>
                <div className="bg-white/20 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">3.0 hrs</div>
                  <div className="text-sm opacity-90">Non-academic screen time/day</div>
                </div>
              </div>
              <p className="text-xs mt-4 opacity-75">Source: Cureus Journal, January 2026</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-xl p-6 border-l-4 border-red-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-red-600">4%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Can Study for an Hour Without Checking Phone</p>
                    <p className="text-gray-600 text-sm mt-1">Less than 1 in 25 students (4%) can study for an hour without picking up their phone, with roughly 40% checking every 5-10 minutes.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: The Boar, July 2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-purple-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-purple-600">94%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Students Want to Reduce Phone Time</p>
                    <p className="text-gray-600 text-sm mt-1">94% of university students want to reduce time spent on their phones, with 96% believing it will improve wellbeing and 92% expecting improved academic performance.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: The Boar Study, 2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-orange-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-orange-600">25 yrs</div>
                  <div>
                    <p className="text-gray-800 font-medium">Lifetime Scrolling Risk</p>
                    <p className="text-gray-600 text-sm mt-1">Students risk spending the equivalent of 25 years of their life scrolling on devices at current usage rates.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: The Boar Research, 2025</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chinese Students Study */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Large-Scale Study: 17,150 Chinese Students</h3>
              <p className="text-gray-700 mb-4">A comprehensive study using multiple linear regression analysis found significant negative correlations between screen time and academic scores:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left font-semibold">Subject</th>
                      <th className="py-3 px-4 text-left font-semibold">Correlation (β)</th>
                      <th className="py-3 px-4 text-left font-semibold">Significance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4">Chinese Language</td>
                      <td className="py-3 px-4 text-red-600 font-semibold">-0.022</td>
                      <td className="py-3 px-4">p {"<"} 0.01</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Mathematics</td>
                      <td className="py-3 px-4 text-red-600 font-semibold">-0.048</td>
                      <td className="py-3 px-4">p {"<"} 0.01</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">English</td>
                      <td className="py-3 px-4 text-red-600 font-semibold">-0.043</td>
                      <td className="py-3 px-4">p {"<"} 0.01</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="py-3 px-4 font-semibold">Total Scores</td>
                      <td className="py-3 px-4 text-red-600 font-bold">-0.113</td>
                      <td className="py-3 px-4">p {"<"} 0.01</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-4">Source: Frontiers in Public Health, 2025</p>
            </div>
          </section>

          {/* Section 4: Study Hours by Country */}
          <section id="study-hours" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Average Study Hours by Country
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Study time varies dramatically across countries. OECD data reveals interesting patterns between homework hours and academic achievement.
            </p>

            {/* Classroom Instruction Time */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Average Classroom Instruction Time (OECD)</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">4.3 hrs</div>
                  <div className="text-sm text-gray-700">Primary School</div>
                  <div className="text-xs text-gray-500 mt-1">Per day</div>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">5.0 hrs</div>
                  <div className="text-sm text-gray-700">Lower Secondary</div>
                  <div className="text-xs text-gray-500 mt-1">Per day</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">5.2 hrs</div>
                  <div className="text-sm text-gray-700">Upper Secondary</div>
                  <div className="text-xs text-gray-500 mt-1">Per day</div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-700">
                  <strong>Total Compulsory Instruction:</strong> Students receive an average of 7,642 hours of instruction across primary and lower secondary education (9 years). This ranges from 5,304 hours in Poland to 11,000 hours in Australia.
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-4">Source: OECD Education at a Glance, 2025</p>
            </div>

            {/* Homework by Country */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Homework Hours by Country (15-year-olds)</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700">China</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '100%' }}>
                      <span className="text-white text-sm font-bold">13.8 hrs</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700">Russia</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '70%' }}>
                      <span className="text-white text-sm font-bold">9.7 hrs</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700">Singapore</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '68%' }}>
                      <span className="text-white text-sm font-bold">9.4 hrs</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700">OECD Avg</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-500 to-gray-600 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '35%' }}>
                      <span className="text-white text-sm font-bold">4.9 hrs</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700">S. Korea</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '20%' }}>
                      <span className="text-white text-sm font-bold">2.8 hrs</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700">Finland</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '20%' }}>
                      <span className="text-white text-sm font-bold">2.8 hrs</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-6">Source: OECD PISA Study, World Atlas</p>
            </div>

            {/* Key Insight */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Surprising Insight: Less Homework, Better Results?
              </h3>
              <p className="text-gray-700 mb-4">
                Countries like <strong>Finland, South Korea, Japan, and Germany</strong> score at or above OECD average in science, yet students don't spend long hours learning at school and studying after school.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>South Korea Example:</strong> Students spend only ~3 hours on homework weekly, but supplement with 1.4 hours of personal tutoring and 3.6 hours in after-school classes. Despite minimal homework, South Korea ranks #1 globally in education.
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Economic disparity:</strong> Advantaged students spend an average of 1.6 hours more on homework per week than disadvantaged students.
              </p>
            </div>
          </section>

          {/* Section 5: AI in Education */}
          <section id="ai-education" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-violet-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                AI in Education Statistics 2026
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              AI adoption in education has exploded since ChatGPT's release. Here are the latest statistics on how students and teachers are using AI tools.
            </p>

            {/* Student AI Adoption */}
            <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white mb-8">
              <h3 className="text-xl font-bold mb-6">Student AI Adoption Surge (2024 → 2025)</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm opacity-80 mb-2">Any AI Tool Usage</div>
                  <div className="flex items-end gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">66%</div>
                      <div className="text-xs opacity-70">2024</div>
                    </div>
                    <div className="text-2xl">→</div>
                    <div className="text-center">
                      <div className="text-5xl font-bold">92%</div>
                      <div className="text-xs opacity-70">2025</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm opacity-80 mb-2">AI for Assessments</div>
                  <div className="flex items-end gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">53%</div>
                      <div className="text-xs opacity-70">2024</div>
                    </div>
                    <div className="text-2xl">→</div>
                    <div className="text-center">
                      <div className="text-5xl font-bold">88%</div>
                      <div className="text-xs opacity-70">2025</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs mt-6 opacity-75">Source: HEPI Student Generative AI Survey, 2025</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-xl p-6 border-l-4 border-violet-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-violet-600">97%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Higher Ed Students Use AI</p>
                    <p className="text-gray-600 text-sm mt-1">Approximately 97% of students in higher education institutions use AI-powered tools to enhance their learning.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: AI in Education Statistics, 2026</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-blue-600">89%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Students Use ChatGPT for Homework</p>
                    <p className="text-gray-600 text-sm mt-1">89% of students admit to using ChatGPT for homework, with approximately 90% finding it more beneficial than using a traditional tutor.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: DemandSage, 2026</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-green-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-green-600">84%</div>
                  <div>
                    <p className="text-gray-800 font-medium">High School Students Use AI for Schoolwork</p>
                    <p className="text-gray-600 text-sm mt-1">The percentage of high school students using GenAI tools for schoolwork grew from 79% to 84% between January and May 2025.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: College Board Research, 2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-amber-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-amber-600">60%</div>
                  <div>
                    <p className="text-gray-800 font-medium">K-12 Teachers Used AI (2024-2025)</p>
                    <p className="text-gray-600 text-sm mt-1">A Gallup survey found 60% of K-12 public school teachers used AI tools during 2024-2025, with 32% using them weekly and 38% allowing student use of ChatGPT.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: Gallup Survey, 2025</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Most Popular AI Tools */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Most Popular AI Tools for Students</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-gray-700">ChatGPT</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '66%' }}>
                      <span className="text-white text-sm font-bold">66%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-gray-700">Grammarly</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-500 to-purple-500 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '25%' }}>
                      <span className="text-white text-sm font-bold">25%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-gray-700">Microsoft Copilot</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '25%' }}>
                      <span className="text-white text-sm font-bold">25%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Most common uses:</strong> Explaining concepts, summarizing articles, suggesting research ideas, brainstorming, and editing/revising essays.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: E-Learning Market */}
          <section id="elearning-market" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                E-Learning Market Statistics 2026
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The global e-learning market has experienced explosive growth since 2020. Here are the latest market size estimates and projections.
            </p>

            {/* Market Size Card */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 md:p-8 text-white mb-8">
              <h3 className="text-xl font-bold mb-4">Global E-Learning Market Size</h3>
              <div className="text-6xl font-bold mb-2">$325B</div>
              <div className="text-lg opacity-90 mb-6">Estimated market size in 2025</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">$417B</div>
                  <div className="text-xs opacity-80">Projected 2026</div>
                </div>
                <div className="bg-white/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">$665B</div>
                  <div className="text-xs opacity-80">Projected 2031</div>
                </div>
                <div className="bg-white/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">13-20%</div>
                  <div className="text-xs opacity-80">Annual CAGR</div>
                </div>
              </div>
              <p className="text-xs mt-6 opacity-75">Sources: SkyQuest, Arizton, Grand View Research, 2025-2026</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-xl p-6 border-l-4 border-emerald-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-emerald-600">900%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Market Growth Since 2000</p>
                    <p className="text-gray-600 text-sm mt-1">Since its inception in 2000, the online learning market has expanded by an astounding 900%.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: Research.com, 2026</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-blue-600">57M</div>
                  <div>
                    <p className="text-gray-800 font-medium">Expected Online Learning Users by 2027</p>
                    <p className="text-gray-600 text-sm mt-1">The number of online learning users is expected to increase to 57 million by 2027.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: E-Learning Market Statistics, 2026</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-purple-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-purple-600">80%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Businesses Offer Online Learning</p>
                    <p className="text-gray-600 text-sm mt-1">80% of businesses now offer online learning or training solutions to their employees.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: Coursmos, 2026</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Breakdown */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Regional Market Breakdown (2025)</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">$116B</div>
                  <div className="text-sm font-semibold text-gray-800">North America</div>
                  <div className="text-xs text-gray-500 mt-1">36% market share</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">€111B</div>
                  <div className="text-sm font-semibold text-gray-800">Europe</div>
                  <div className="text-xs text-gray-500 mt-1">~30% market share</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">$99.8B</div>
                  <div className="text-sm font-semibold text-gray-800">United States</div>
                  <div className="text-xs text-gray-500 mt-1">Largest single market</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>China:</strong> Revenue of $45.35 billion projected in 2026, making it the second-largest e-learning market globally.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Global Literacy */}
          <section id="literacy" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Global Literacy & Education Rates
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Global literacy has improved dramatically over the past century, but significant disparities remain between regions.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                <div className="text-5xl font-bold mb-2">93%</div>
                <div className="text-lg font-semibold">Global Youth Literacy</div>
                <div className="text-sm opacity-80 mt-2">Ages 15-24</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
                <div className="text-5xl font-bold mb-2">88%</div>
                <div className="text-lg font-semibold">Global Adult Literacy</div>
                <div className="text-sm opacity-80 mt-2">Ages 15+</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Literacy Rates: Top & Bottom Countries</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-green-600 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Highest Literacy Rates
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Uzbekistan</span>
                      <span className="font-bold text-green-600">100%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">North Korea</span>
                      <span className="font-bold text-green-600">100%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Norway</span>
                      <span className="font-bold text-green-600">100%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Lowest Literacy Rates
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium">Mali</span>
                      <span className="font-bold text-red-600">35.47%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium">Chad</span>
                      <span className="font-bold text-red-600">30.63%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium">South Sudan</span>
                      <span className="font-bold text-red-600">26.83%</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-6">Source: World Population Review, UNESCO UIS, 2026</p>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 border-l-4 border-amber-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-amber-600">29%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Upper Secondary Completion in Sub-Saharan Africa</p>
                    <p className="text-gray-600 text-sm mt-1">In Sub-Saharan Africa, only 29% of young people complete upper secondary education, compared to 62% globally.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: UNESCO UIS, 2026</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-blue-600">50%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Primary Students at Minimum Reading Proficiency</p>
                    <p className="text-gray-600 text-sm mt-1">At the age when they should have completed primary school, only about half of students globally reach minimum proficiency in reading.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: UNESCO, 2026</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-purple-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-purple-600">8.26M</div>
                  <div>
                    <p className="text-gray-800 font-medium">UNESCO Education Data Points</p>
                    <p className="text-gray-600 text-sm mt-1">UNESCO's latest update brings total published education datapoints for countries to over 8.26 million, an increase of nearly 100,000 since September 2025.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: UNESCO Institute for Statistics, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Tutoring Industry */}
          <section id="tutoring" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-rose-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Private Tutoring Industry Statistics
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The private tutoring industry continues to grow rapidly, driven by increasing academic competition and the expansion of online tutoring platforms.
            </p>

            {/* Market Size */}
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 md:p-8 text-white mb-8">
              <h3 className="text-xl font-bold mb-4">Global Private Tutoring Market</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-5xl font-bold mb-2">$131B</div>
                  <div className="text-lg opacity-90">Market Size (2025)</div>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">$209B</div>
                  <div className="text-lg opacity-90">Projected by 2030</div>
                </div>
              </div>
              <div className="mt-6 bg-white/20 rounded-xl p-4">
                <div className="text-center">
                  <span className="text-3xl font-bold">9.9%</span>
                  <span className="text-lg ml-2">CAGR (2025-2030)</span>
                </div>
              </div>
              <p className="text-xs mt-4 opacity-75">Sources: Business Research Company, IMARC Group, 2026</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-xl p-6 border-l-4 border-rose-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-rose-600">60.85%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Asia Pacific Market Share</p>
                    <p className="text-gray-600 text-sm mt-1">Asia Pacific dominated the private tutoring market with a 60.85% share in 2025, driven by strong supplementary coaching culture in Japan, South Korea, and Southeast Asia.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: Fortune Business Insights, 2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-blue-600">87%</div>
                  <div>
                    <p className="text-gray-800 font-medium">US Public Schools Providing Tutoring</p>
                    <p className="text-gray-600 text-sm mt-1">In 2023-24, 87% of public schools in the US provided tutoring, with 46% offering high-dosage tutoring and 66% standard tutoring.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: National Center for Education Statistics, 2024</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-purple-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-purple-600">55.3%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Online Tutoring Market Share</p>
                    <p className="text-gray-600 text-sm mt-1">Online tutoring is expected to dominate with a 55.3% market share, while K-12 leads the application segment with 48.7%.</p>
                    <p className="text-xs text-gray-400 mt-2">Source: Grand View Research, 2026</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Drivers */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-rose-600" />
                Key Growth Drivers
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Increasing academic competition among students</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Rising parental spending on education</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Expansion of standardized testing systems</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Adoption of digital and hybrid tutoring formats</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Integration of adaptive learning technologies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Growing demand for exam-oriented learning</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Sources Section */}
          <section className="mb-16">
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Sources & References</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Study Habits & Learning</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><a href="https://research.com/education/habits-of-highly-effective-students" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">Research.com - Habits of Effective Students</a></li>
                    <li><a href="https://www.oecd.org/en/publications/education-at-a-glance-2025_c58fc9ae.html" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">OECD Education at a Glance 2025</a></li>
                    <li><a href="https://www.savemyexams.com/learning-hub/insights/online-learning-vs-classroom-statistics/" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">SaveMyExams - Online Learning Statistics 2025</a></li>
                    <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12896668/" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">NIH - Screen Time and Academic Performance</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">AI & E-Learning</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><a href="https://www.hepi.ac.uk/reports/student-generative-ai-survey-2025/" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">HEPI - Student AI Survey 2025</a></li>
                    <li><a href="https://newsroom.collegeboard.org/new-research-majority-high-school-students-use-generative-ai-schoolwork" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">College Board - GenAI Research 2025</a></li>
                    <li><a href="https://www.demandsage.com/ai-in-education-statistics/" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">DemandSage - AI in Education Statistics</a></li>
                    <li><a href="https://research.com/education/online-education-statistics" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">Research.com - Online Education Statistics</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Literacy & Global Education</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><a href="https://www.uis.unesco.org/en/2026-education-data-refresh" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">UNESCO UIS - 2026 Education Data</a></li>
                    <li><a href="https://worldpopulationreview.com/country-rankings/literacy-rate-by-country" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">World Population Review - Literacy Rates</a></li>
                    <li><a href="https://ourworldindata.org/grapher/cross-country-literacy-rates" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">Our World in Data - Literacy Rates</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Market Research</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><a href="https://www.arizton.com/market-reports/e-learning-market-size-2025" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">Arizton - E-Learning Market Report</a></li>
                    <li><a href="https://www.grandviewresearch.com/industry-analysis/private-tutoring-market-report" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">Grand View Research - Tutoring Market</a></li>
                    <li><a href="https://www.fortunebusinessinsights.com/private-tutoring-market-104753" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">Fortune Business Insights - Tutoring Market</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Improve Your Study Habits?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              Join thousands of students using The Tutor Bridge's free learning tools, calculators, and study resources to achieve academic success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculators">
                <Button className="bg-[#FFC857] hover:bg-[#FFC857]/90 text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                  Explore Free Tools
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/study-resources">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl transition-all duration-200">
                  Study Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
