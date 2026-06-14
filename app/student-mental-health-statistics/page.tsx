import Link from 'next/link';
import {
  Heart,
  Home,
  BookOpen,
  Brain,
  TrendingUp,
  TrendingDown,
  Users,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Phone,
  MessageCircle,
  School,
  Activity,
  Clock,
  Shield
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

export default function StudentMentalHealthStatisticsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
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
                "name": "How common is anxiety among college students?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "According to the 2024-2025 Healthy Minds Study, 40% of college students have received a lifetime diagnosis of anxiety. More than one in three students report experiencing moderate to severe anxiety. The good news is that anxiety rates have been declining for three consecutive years, from 44% in 2022 to 37% in 2025."
                }
              },
              {
                "@type": "Question",
                "name": "What percentage of high school students experience depression?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "About 40% of high school students report persistent feelings of sadness or hopelessness according to CDC data. Among adolescents aged 12-17, major depressive episode rates have improved from 20.8% in 2021 to 15.4% in 2024—the most significant improvement in over a decade. Severe depression among college students dropped from 23% in 2022 to 18% in 2025."
                }
              },
              {
                "@type": "Question",
                "name": "How many students are not getting mental health treatment?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "60% of depressed teens get no treatment for their mental health condition. There is only one school psychologist for every 1,127 students—far above the recommended ratio of 1:500. This leaves over 15 million children without adequate access to school-based mental health services."
                }
              },
              {
                "@type": "Question",
                "name": "What is causing the student mental health crisis?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Key factors include academic pressure and heavy workloads, social media use (average 4.8 hours/day for teens), financial insecurity, social isolation, bullying, and residual effects from pandemic disruptions. Academic stress is the most frequently cited stressor, with nearly 70% of teens experiencing it."
                }
              },
              {
                "@type": "Question",
                "name": "What percentage of students experience academic burnout?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The prevalence of burnout among university students ranges from 38% to over 60%. Nearly 70% of teens experience academic stress. 44.5% of college students say procrastination negatively impacted their academic performance in the past year—a core burnout mechanism."
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
            "headline": "Student Mental Health Statistics 2026: Anxiety, Depression & Stress Data",
            "description": "Comprehensive mental health statistics for students including anxiety, depression, academic stress, and treatment gap data.",
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
            <Link href="/" className="hover:text-violet-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Student Mental Health Statistics</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Heart className="w-10 h-10" />
            </div>
            <div className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
              Updated June 2026
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Student Mental Health Statistics 2026
            </h1>
            <p className="text-xl md:text-2xl text-violet-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Comprehensive data on anxiety, depression, academic stress, and mental health support gaps among students. Understanding the crisis is the first step toward solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-bold">84,000+</span> Students Surveyed
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-bold">CDC</span> & NIH Data
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-bold">2026</span> Latest Research
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Crisis Helpline Banner */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">If you or someone you know needs help:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:988" className="bg-white/20 hover:bg-white/30 px-4 py-1 rounded-full font-bold transition-colors">
                988 Suicide & Crisis Lifeline
              </a>
              <a href="sms:741741" className="bg-white/20 hover:bg-white/30 px-4 py-1 rounded-full font-bold transition-colors">
                Text HOME to 741741
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Key Stats Banner */}
      <div className="bg-white border-b-2 border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-violet-600 mb-1">40%</div>
              <div className="text-sm text-gray-600">Students with Anxiety Diagnosis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-1">37%</div>
              <div className="text-sm text-gray-600">Report Depression Symptoms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-1">60%</div>
              <div className="text-sm text-gray-600">Depressed Teens Untreated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-1">-5%</div>
              <div className="text-sm text-gray-600">Depression Drop (2022-25)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-violet-50 rounded-2xl p-6 md:p-8 border border-violet-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-violet-600" />
              Table of Contents
            </h2>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <a href="#college-mental-health" className="flex items-center gap-2 text-gray-700 hover:text-violet-600 transition-colors p-2 rounded-lg hover:bg-white">
                <School className="w-4 h-4" />
                College Student Mental Health
              </a>
              <a href="#teen-mental-health" className="flex items-center gap-2 text-gray-700 hover:text-violet-600 transition-colors p-2 rounded-lg hover:bg-white">
                <Users className="w-4 h-4" />
                Teen & High School Statistics
              </a>
              <a href="#academic-stress" className="flex items-center gap-2 text-gray-700 hover:text-violet-600 transition-colors p-2 rounded-lg hover:bg-white">
                <Brain className="w-4 h-4" />
                Academic Stress & Burnout
              </a>
              <a href="#treatment-gap" className="flex items-center gap-2 text-gray-700 hover:text-violet-600 transition-colors p-2 rounded-lg hover:bg-white">
                <AlertTriangle className="w-4 h-4" />
                Treatment Gap & Access
              </a>
              <a href="#positive-trends" className="flex items-center gap-2 text-gray-700 hover:text-violet-600 transition-colors p-2 rounded-lg hover:bg-white">
                <TrendingUp className="w-4 h-4" />
                Signs of Progress
              </a>
              <a href="#resources" className="flex items-center gap-2 text-gray-700 hover:text-violet-600 transition-colors p-2 rounded-lg hover:bg-white">
                <Heart className="w-4 h-4" />
                Resources & Support
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Section 1: College Student Mental Health */}
          <section id="college-mental-health" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                <School className="w-6 h-6 text-violet-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                College Student Mental Health Statistics
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The 2024-2025 Healthy Minds Study surveyed over 84,000 students from 135 colleges and universities, providing the most comprehensive picture of college student mental health to date.
            </p>

            {/* Key Stats Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white">
                <div className="text-5xl font-bold mb-2">40%</div>
                <div className="text-lg font-semibold">Lifetime Anxiety Diagnosis</div>
                <p className="text-violet-100 text-sm mt-2">The most frequently diagnosed mental health condition among college students</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl p-6 text-white">
                <div className="text-5xl font-bold mb-2">35%</div>
                <div className="text-lg font-semibold">Lifetime Depression Diagnosis</div>
                <p className="text-purple-100 text-sm mt-2">More than one in three students report experiencing depression</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-xl p-6 border-l-4 border-violet-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-violet-600">36%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Students "Thriving"</p>
                    <p className="text-gray-600 text-sm mt-1">Only 36% of college students report high levels of success in relationships, self-esteem, purpose, and optimism—down from 38% the previous year.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-red-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-red-600">80%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Declare Mental Health Crisis</p>
                    <p className="text-gray-600 text-sm mt-1">Four out of five students declare a mental health crisis on campus, emphasizing the urgent need for improved mental health support and resources.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-amber-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-amber-600">38%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Screen Positive for Depression (PHQ-9)</p>
                    <p className="text-gray-600 text-sm mt-1">38% of U.S. college students screened positive for moderate or severe depression using clinical instruments—meeting clinical threshold beyond "feeling stressed."</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Suicide Statistics */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                Critical Statistic
              </h3>
              <p className="text-lg mb-4">
                <strong>Suicide is the second-leading cause of death among college students</strong>, with around 1,100 students losing their lives each year.
              </p>
              <p className="text-gray-300 text-sm">
                Suicidal thoughts have decreased from 15% in 2022 to 11% in 2025, showing progress but highlighting continued need for support.
              </p>
              <p className="text-xs mt-4 opacity-75">Source: Healthy Minds Study, UCLA Research 2025</p>
            </div>
          </section>

          {/* Section 2: Teen Mental Health */}
          <section id="teen-mental-health" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Teen & High School Mental Health Statistics
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Teen mental health has been in crisis, but recent data shows the first significant improvements in over a decade. Here's what the numbers reveal.
            </p>

            {/* Key Teen Stats */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">High School Student Mental Health (CDC Data)</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-40 text-sm font-medium text-gray-700">Persistent Sadness</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-400 to-violet-500 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '40%' }}>
                      <span className="text-white text-sm font-bold">40%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-40 text-sm font-medium text-gray-700">Poor Mental Health</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-400 to-purple-500 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '33%' }}>
                      <span className="text-white text-sm font-bold">1 in 3</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-40 text-sm font-medium text-gray-700">Considered Suicide</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-400 to-red-500 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '20%' }}>
                      <span className="text-white text-sm font-bold">20%</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">Source: CDC Youth Risk Behavior Survey</p>
            </div>

            {/* Major Depressive Episode Improvement */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                Historic Improvement in Teen Depression
              </h3>
              <p className="text-lg mb-4">
                The rate of major depressive episodes among adolescents aged 12-17 fell from <strong>20.8% to 15.4%</strong> between 2021 and 2024.
              </p>
              <p className="text-green-100">
                This is the <strong>most significant improvement in this metric in over a decade</strong>, according to 2026 analysis of SAMHSA and CDC trend data.
              </p>
              <p className="text-xs mt-4 opacity-75">Source: Medical Daily, SAMHSA 2026</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-4">Contributing Factors</h4>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
                    <span><strong>4.8 hours/day</strong> average social media use among teens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Activity className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Teens who vape daily are <strong>2.4x more likely</strong> to report depression symptoms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Brain className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span>Academic pressure and heavy workloads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Social isolation and bullying</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-4">Gender Differences</h4>
                <p className="text-gray-700 text-sm mb-4">
                  While <strong>teen girls show higher rates of reported distress</strong>, boys are significantly less likely to seek help.
                </p>
                <p className="text-gray-700 text-sm">
                  Boys are far more likely to act out behaviorally rather than report internal symptoms, meaning their mental health crisis often goes unnoticed longer.
                </p>
                <p className="text-xs text-gray-500 mt-4">Source: SAMHSA Teen Behavior Analytics 2026</p>
              </div>
            </div>
          </section>

          {/* Section 3: Academic Stress & Burnout */}
          <section id="academic-stress" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Academic Stress & Burnout Statistics
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Academic stress is the most frequently cited stressor among students. The pressure to perform academically, combined with heavy workloads, is taking a significant toll on student wellbeing.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white text-center">
                <div className="text-4xl font-bold mb-2">38-60%</div>
                <div className="text-amber-100">University Students Experience Burnout</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white text-center">
                <div className="text-4xl font-bold mb-2">70%</div>
                <div className="text-orange-100">Teens Experience Academic Stress</div>
              </div>
              <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl p-6 text-white text-center">
                <div className="text-4xl font-bold mb-2">44.5%</div>
                <div className="text-red-100">Report Procrastination Issues</div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-xl p-6 border-l-4 border-amber-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-amber-600">1 in 5</div>
                  <div>
                    <p className="text-gray-800 font-medium">Teens Develop Depression from Academic Pressure</p>
                    <p className="text-gray-600 text-sm mt-1">The pressure to meet academic standards creates depression in one out of five teenagers who face this challenge.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-orange-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-orange-600">13.1%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Career Anxiety Harms Performance</p>
                    <p className="text-gray-600 text-sm mt-1">Uncertainty about post-graduation outcomes weakens motivation and confidence, impacting academic performance.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-red-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-red-600">73.2%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Experience Moderate to High Stress</p>
                    <p className="text-gray-600 text-sm mt-1">Only 26.8% of students report "low" subjective stress levels. Women experience significantly higher stress levels than men across all fields of study.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Stressors */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
              <h3 className="font-bold text-gray-900 mb-4">Common Academic Stressors</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Heavy workload and high study demands</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Constant pressure to achieve</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Exam and grade anxiety</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Prolonged study hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Financial insecurity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Balancing work and studies</span>
                  </li>
                </ul>
              </div>
              <p className="text-xs text-gray-500 mt-4">Source: Research.com Student Stress Statistics 2026, Frontiers in Psychology</p>
            </div>
          </section>

          {/* Section 4: Treatment Gap */}
          <section id="treatment-gap" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                The Treatment Gap Crisis
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Despite the high prevalence of mental health issues among students, a significant treatment gap remains. Many students who need help are not receiving it.
            </p>

            <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-6 md:p-8 text-white mb-8">
              <h3 className="text-xl font-bold mb-6">Treatment Gap Statistics</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">60%</div>
                  <div className="text-red-100">Depressed Teens Get No Treatment</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">3 in 5</div>
                  <div className="text-red-100">With Major Depression Untreated</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">15M+</div>
                  <div className="text-red-100">Children Lack Adequate Access</div>
                </div>
              </div>
              <p className="text-xs mt-6 opacity-75">Source: SAMHSA, National Association of School Psychologists</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-xl p-6 border-l-4 border-red-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-red-600">1:1,127</div>
                  <div>
                    <p className="text-gray-800 font-medium">School Psychologist to Student Ratio</p>
                    <p className="text-gray-600 text-sm mt-1">There is only one school psychologist for every 1,127 students—far above the recommended ratio of 1:500.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-amber-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-amber-600">$280M</div>
                  <div>
                    <p className="text-gray-800 font-medium">Federal Investment (2025)</p>
                    <p className="text-gray-600 text-sm mt-1">The U.S. Department of Education allocated $280 million in 2025 grants for school-based mental health services—but significant gaps remain.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-blue-600">160K+</div>
                  <div>
                    <p className="text-gray-800 font-medium">Students Seeking Treatment (CCMH)</p>
                    <p className="text-gray-600 text-sm mt-1">Data from 209 colleges describes over 160,000 students actively seeking mental health treatment—a positive sign of help-seeking behavior.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Positive Note */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Signs of Improvement in Access
              </h3>
              <p className="text-gray-700">
                Students are accessing an <strong>increasingly diverse array of resources</strong>, with digital and mobile mental health services evolving rapidly and becoming popular among students. This is helping bridge some of the treatment gap.
              </p>
            </div>
          </section>

          {/* Section 5: Positive Trends */}
          <section id="positive-trends" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Signs of Progress (2022-2025)
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              For the first time in over a decade, key mental health metrics are improving among students. Here's what's getting better.
            </p>

            {/* Improvement Chart */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Three-Year Improvement Trends (Healthy Minds Study)</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-700">Severe Depression</span>
                    <span className="text-green-600 font-bold">23% → 18%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-400 to-green-500 h-full rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">5 percentage point improvement</p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-700">Moderate+ Depression Symptoms</span>
                    <span className="text-green-600 font-bold">44% → 37%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full rounded-full" style={{ width: '84%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">7 percentage point improvement</p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-700">Suicidal Thoughts</span>
                    <span className="text-green-600 font-bold">15% → 11%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-400 to-teal-500 h-full rounded-full" style={{ width: '73%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">4 percentage point improvement</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-6">Source: UCLA Healthy Minds Study 2024-2025</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  What's Working
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Increased mental health awareness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Reduced stigma around seeking help</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Digital/mobile mental health tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Expanded campus counseling services</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                <h4 className="font-bold text-amber-700 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Still Needs Improvement
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Treatment access gap remains large</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>School psychologist shortage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Minority student thriving rates lower</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Financial insecurity link to distress</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6: Resources */}
          <section id="resources" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Mental Health Resources & Support
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              If you or someone you know is struggling, help is available. Here are resources for students seeking mental health support.
            </p>

            {/* Crisis Resources */}
            <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-6 md:p-8 text-white mb-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Crisis Hotlines (24/7)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="font-bold text-lg">988 Suicide & Crisis Lifeline</p>
                  <p className="text-red-100">Call or text <strong>988</strong></p>
                  <p className="text-xs text-red-200 mt-2">Free, confidential, 24/7</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="font-bold text-lg">Crisis Text Line</p>
                  <p className="text-red-100">Text <strong>HOME</strong> to <strong>741741</strong></p>
                  <p className="text-xs text-red-200 mt-2">Free, confidential text support</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="font-bold text-lg">National Suicide Prevention</p>
                  <p className="text-red-100">1-800-273-8255</p>
                  <p className="text-xs text-red-200 mt-2">Available 24/7</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="font-bold text-lg">Trevor Project (LGBTQ+)</p>
                  <p className="text-red-100">1-866-488-7386</p>
                  <p className="text-xs text-red-200 mt-2">For LGBTQ+ young people</p>
                </div>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <School className="w-5 h-5 text-blue-500" />
                  On-Campus Resources
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Student counseling center</li>
                  <li>• Campus health services</li>
                  <li>• Peer support programs</li>
                  <li>• Resident advisors (RAs)</li>
                  <li>• Academic advisors</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-purple-500" />
                  Online Resources
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <a href="https://www.nami.org" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">NAMI (National Alliance on Mental Illness)</a></li>
                  <li>• <a href="https://www.activeminds.org" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">Active Minds</a></li>
                  <li>• <a href="https://www.jedfoundation.org" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">The Jed Foundation</a></li>
                  <li>• <a href="https://www.samhsa.gov" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">SAMHSA</a></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Sources */}
          <section className="mb-16">
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Sources & References</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Primary Research</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><a href="https://newsroom.ucla.edu/releases/college-students-mental-health-report-ucla" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">UCLA - Healthy Minds Study 2024-2025</a></li>
                    <li><a href="https://www.insidehighered.com/news/student-success/health-wellness/2025/09/11/college-student-mental-health-remains-poor-minority" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">Inside Higher Ed - Student Mental Health</a></li>
                    <li><a href="https://research.com/education/student-stress-statistics" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">Research.com - Student Stress Statistics</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Teen Mental Health</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><a href="http://www.medicaldaily.com/teen-mental-health-2026-depression-anxiety-treatment-gap-475564" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">Medical Daily - Teen Mental Health 2026</a></li>
                    <li><a href="https://mhstats.org/populations/teens/" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">Mental Health Stats - Teens Statistics</a></li>
                    <li><a href="https://www.theglobalstatistics.com/youth-mental-health-statistics-in-us/" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">Global Statistics - Youth Mental Health</a></li>
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
            <Shield className="w-16 h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Support Your Learning Journey
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              Academic stress can be overwhelming. Our free study tools and resources are designed to help you learn more effectively and reduce stress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/study-resources">
                <Button className="bg-[#FFC857] hover:bg-[#FFC857]/90 text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                  Study Resources
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/brain-games">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl transition-all duration-200">
                  Brain Games
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
