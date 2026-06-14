import Link from 'next/link';
import {
  DollarSign,
  Home,
  BookOpen,
  GraduationCap,
  Globe,
  TrendingUp,
  TrendingDown,
  Users,
  MapPin,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Building2,
  Award,
  BarChart3
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

export default function TeacherSalaryStatisticsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
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
                "name": "What is the average teacher salary in the US in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The national average teacher salary in the US is $74,495 for 2024-25, representing a 3.5% increase from the previous year. The NEA reports an average of $74,200. Starting salaries average $46,526 nationally. However, salaries vary significantly by state, ranging from $53,700 in Mississippi to $101,100 in California."
                }
              },
              {
                "@type": "Question",
                "name": "Which US state pays teachers the most?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "California pays teachers the most with an average salary of $101,084, making it the first state to surpass the $100,000 mark. New York follows at $95,600, Massachusetts at $92,100, Washington at $91,700, and the District of Columbia at $86,700. These high-paying states typically have higher costs of living and stronger teacher unions."
                }
              },
              {
                "@type": "Question",
                "name": "Which country pays teachers the highest salary?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Luxembourg pays teachers the highest salaries globally, with starting salaries near $100,000 and experienced teachers earning $137,418 after 15 years. Top earners can make over $173,000 annually. Germany and Switzerland also offer competitive salaries with six-figure peak earnings. The OECD average for experienced teachers is $57,399."
                }
              },
              {
                "@type": "Question",
                "name": "How severe is the teacher shortage in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The teacher shortage remains severe with over 411,500 impacted positions nationwide—approximately 1 in 8 teaching roles. About 56,000 positions remain vacant and 350,000 are filled by underqualified teachers. Special education, science, and mathematics face the worst shortages. Teacher turnover rates have risen to 14-16%, about 2 percentage points higher than pre-pandemic levels."
                }
              },
              {
                "@type": "Question",
                "name": "Do teachers with unions earn more?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, teachers in states with strong collective bargaining rights earn, on average, 24% more than those in states without such protections. Union membership provides teachers with stronger negotiating power for salaries, benefits, and working conditions."
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
            "headline": "Teacher Salary Statistics 2026: Pay by State, Country & Subject Area",
            "description": "Comprehensive teacher salary data including pay by state, international comparisons, and teacher shortage statistics.",
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
            <Link href="/" className="hover:text-amber-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Teacher Salary Statistics</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <GraduationCap className="w-10 h-10" />
            </div>
            <div className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
              Updated June 2026
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Teacher Salary Statistics 2026
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Complete salary data for teachers by state, country, and subject area. Plus insights on the teacher shortage crisis and what it means for education.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-bold">50</span> US States Ranked
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-bold">40+</span> Countries Compared
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-bold">NEA</span> & OECD Data
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
              <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-1">$74,495</div>
              <div className="text-sm text-gray-600">US National Average</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-1">$101K</div>
              <div className="text-sm text-gray-600">California (Highest)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-1">411K+</div>
              <div className="text-sm text-gray-600">Shortage Positions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">$137K</div>
              <div className="text-sm text-gray-600">Luxembourg (Global #1)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-amber-50 rounded-2xl p-6 md:p-8 border border-amber-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              Table of Contents
            </h2>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <a href="#us-overview" className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors p-2 rounded-lg hover:bg-white">
                <DollarSign className="w-4 h-4" />
                US Teacher Salary Overview
              </a>
              <a href="#by-state" className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors p-2 rounded-lg hover:bg-white">
                <MapPin className="w-4 h-4" />
                Salary by State (All 50)
              </a>
              <a href="#by-country" className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors p-2 rounded-lg hover:bg-white">
                <Globe className="w-4 h-4" />
                International Comparison
              </a>
              <a href="#shortage" className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors p-2 rounded-lg hover:bg-white">
                <AlertTriangle className="w-4 h-4" />
                Teacher Shortage Crisis
              </a>
              <a href="#factors" className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors p-2 rounded-lg hover:bg-white">
                <BarChart3 className="w-4 h-4" />
                Factors Affecting Pay
              </a>
              <a href="#trends" className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors p-2 rounded-lg hover:bg-white">
                <TrendingUp className="w-4 h-4" />
                Salary Trends
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Section 1: US Overview */}
          <section id="us-overview" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                US Teacher Salary Overview 2026
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The teaching profession in the United States shows significant variation in compensation, with salaries ranging from under $54,000 to over $101,000 depending on location, experience, and specialization.
            </p>

            {/* Key National Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white text-center">
                <div className="text-4xl font-bold mb-2">$74,495</div>
                <div className="text-amber-100">National Average (2024-25)</div>
                <div className="text-sm mt-2 bg-white/20 rounded-full px-3 py-1 inline-block">+3.5% YoY</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white text-center">
                <div className="text-4xl font-bold mb-2">$46,526</div>
                <div className="text-green-100">Avg. Starting Salary</div>
                <div className="text-sm mt-2 bg-white/20 rounded-full px-3 py-1 inline-block">Entry Level</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-6 text-white text-center">
                <div className="text-4xl font-bold mb-2">$61,350</div>
                <div className="text-blue-100">National Median</div>
                <div className="text-sm mt-2 bg-white/20 rounded-full px-3 py-1 inline-block">BLS 2026</div>
              </div>
            </div>

            {/* Salary by Level */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Average Salary by Teaching Level</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-36 text-sm font-medium text-gray-700">Elementary School</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-10 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-full rounded-full flex items-center justify-end pr-4" style={{ width: '70%' }}>
                      <span className="text-white font-bold">~$70,000</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-36 text-sm font-medium text-gray-700">Middle School</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-10 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-400 to-purple-500 h-full rounded-full flex items-center justify-end pr-4" style={{ width: '73%' }}>
                      <span className="text-white font-bold">~$73,000</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-36 text-sm font-medium text-gray-700">High School</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-10 overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full flex items-center justify-end pr-4" style={{ width: '76%' }}>
                      <span className="text-white font-bold">~$76,000</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">High school teachers earn more on average due to subject specialization requirements, especially in STEM fields.</p>
            </div>

            {/* Public vs Private */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Public School Teachers
                </h4>
                <div className="text-3xl font-bold text-green-600 mb-2">+$6,400</div>
                <p className="text-sm text-gray-700">Public school teachers earn about $6,400 more than private school teachers on average, reflecting stronger collective bargaining power.</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                <h4 className="font-bold text-amber-700 mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Union Advantage
                </h4>
                <div className="text-3xl font-bold text-amber-600 mb-2">+24%</div>
                <p className="text-sm text-gray-700">Teachers in states with strong collective bargaining rights earn 24% more than those in states without such protections.</p>
              </div>
            </div>
          </section>

          {/* Section 2: Salary by State */}
          <section id="by-state" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Teacher Salary by State 2026
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Teacher salaries vary dramatically across the United States. A teacher in New York earns nearly twice as much as one in Mississippi. Here's the complete state-by-state breakdown.
            </p>

            {/* Top & Bottom States */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Top 10 Highest-Paying States
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <span className="font-medium">1. California</span>
                    <span className="font-bold text-green-600">$101,084</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <span className="font-medium">2. New York</span>
                    <span className="font-bold text-green-600">$95,600</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <span className="font-medium">3. Massachusetts</span>
                    <span className="font-bold text-green-600">$92,100</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <span className="font-medium">4. Washington</span>
                    <span className="font-bold text-green-600">$91,700</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <span className="font-medium">5. District of Columbia</span>
                    <span className="font-bold text-green-600">$86,700</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                    <span className="font-medium">6. Connecticut</span>
                    <span className="font-bold text-green-600">$83,500</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                    <span className="font-medium">7. New Jersey</span>
                    <span className="font-bold text-green-600">$82,200</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                    <span className="font-medium">8. Maryland</span>
                    <span className="font-bold text-green-600">$79,800</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                    <span className="font-medium">9. Oregon</span>
                    <span className="font-bold text-green-600">$78,500</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                    <span className="font-medium">10. Alaska</span>
                    <span className="font-bold text-green-600">$77,900</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-200">
                <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5" />
                  10 Lowest-Paying States
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <span className="font-medium">50. Mississippi</span>
                    <span className="font-bold text-red-600">$53,700</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <span className="font-medium">49. West Virginia</span>
                    <span className="font-bold text-red-600">$54,200</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <span className="font-medium">48. South Dakota</span>
                    <span className="font-bold text-red-600">$54,800</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <span className="font-medium">47. Arkansas</span>
                    <span className="font-bold text-red-600">$55,100</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <span className="font-medium">46. Oklahoma</span>
                    <span className="font-bold text-red-600">$55,600</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                    <span className="font-medium">45. New Mexico</span>
                    <span className="font-bold text-red-600">$56,200</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                    <span className="font-medium">44. Florida</span>
                    <span className="font-bold text-red-600">$57,100</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                    <span className="font-medium">43. North Carolina</span>
                    <span className="font-bold text-red-600">$57,800</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                    <span className="font-medium">42. Idaho</span>
                    <span className="font-bold text-red-600">$58,200</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                    <span className="font-medium">41. Missouri</span>
                    <span className="font-bold text-red-600">$58,600</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Insight */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">The Pay Gap is Massive</h3>
              <p className="text-lg text-blue-100">
                A teacher in <strong>California ($101K)</strong> earns nearly <strong>double</strong> what a teacher in <strong>Mississippi ($54K)</strong> makes. The $47,000+ difference highlights stark regional disparities in how educators are valued and compensated.
              </p>
              <p className="text-xs mt-4 opacity-75">Sources: NEA Educator Pay Data 2026, World Population Review</p>
            </div>
          </section>

          {/* Section 3: International Comparison */}
          <section id="by-country" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Teacher Salaries by Country (OECD Data)
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              How do teacher salaries compare globally? OECD data reveals significant disparities, with some countries paying teachers more than double the average.
            </p>

            {/* Top Paying Countries */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    <tr>
                      <th className="py-4 px-4 text-left font-semibold">Country</th>
                      <th className="py-4 px-4 text-left font-semibold">Starting Salary</th>
                      <th className="py-4 px-4 text-left font-semibold">After 15 Years</th>
                      <th className="py-4 px-4 text-left font-semibold">Top Salary</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-yellow-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇱🇺</span> Luxembourg
                        <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">#1</span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-green-600">~$100,000</td>
                      <td className="py-4 px-4 font-semibold text-green-600">$137,418</td>
                      <td className="py-4 px-4 font-semibold text-green-600">$173,165</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇩🇪</span> Germany
                      </td>
                      <td className="py-4 px-4">$63,000</td>
                      <td className="py-4 px-4">$82,000</td>
                      <td className="py-4 px-4">$95,000+</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇨🇭</span> Switzerland
                      </td>
                      <td className="py-4 px-4">$70,000</td>
                      <td className="py-4 px-4">$90,000</td>
                      <td className="py-4 px-4">$110,000+</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇺🇸</span> United States
                      </td>
                      <td className="py-4 px-4">$52,893</td>
                      <td className="py-4 px-4">$76,442</td>
                      <td className="py-4 px-4">$83,410</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇳🇱</span> Netherlands
                      </td>
                      <td className="py-4 px-4">$48,000</td>
                      <td className="py-4 px-4">$68,000</td>
                      <td className="py-4 px-4">$82,000</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇦🇺</span> Australia
                      </td>
                      <td className="py-4 px-4">$50,000</td>
                      <td className="py-4 px-4">$65,000</td>
                      <td className="py-4 px-4">$75,000</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2 text-gray-600">
                        OECD Average
                      </td>
                      <td className="py-4 px-4 text-gray-600">$38,000</td>
                      <td className="py-4 px-4 text-gray-600">$57,399</td>
                      <td className="py-4 px-4 text-gray-600">$76,000</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇬🇷</span> Greece
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">Lowest</span>
                      </td>
                      <td className="py-4 px-4 text-red-600">$23,363</td>
                      <td className="py-4 px-4 text-red-600">$30,627</td>
                      <td className="py-4 px-4 text-red-600">$45,153</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇭🇺</span> Hungary
                      </td>
                      <td className="py-4 px-4 text-red-600">$16,137</td>
                      <td className="py-4 px-4 text-red-600">$22,000</td>
                      <td className="py-4 px-4 text-red-600">$28,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-gray-50 text-xs text-gray-500">
                Sources: OECD Education at a Glance 2025, World Population Review, Visual Capitalist
              </div>
            </div>

            {/* Global Insight */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
              <h3 className="font-bold text-gray-900 mb-3">Key Global Insight</h3>
              <p className="text-gray-700 mb-3">
                The highest-paid teachers (Luxembourg at $173K) earn more than <strong>double</strong> the OECD average top salary of ~$76,000, highlighting how wide the global pay gap can be.
              </p>
              <p className="text-gray-700">
                Between 2015 and 2023, teacher salaries in primary education increased in <strong>three-quarters of OECD countries</strong>, by 7% in real terms on average.
              </p>
            </div>
          </section>

          {/* Section 4: Teacher Shortage */}
          <section id="shortage" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Teacher Shortage Crisis 2026
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The United States faces a severe teacher shortage that continues to worsen. Low pay relative to other professions, challenging working conditions, and burnout are driving educators out of the field.
            </p>

            {/* Shortage Stats */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 md:p-8 text-white mb-8">
              <h3 className="text-xl font-bold mb-6">The Numbers Are Alarming</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">411,500+</div>
                  <div className="text-red-100">Impacted Positions</div>
                  <div className="text-sm mt-1 opacity-80">1 in 8 teaching roles</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">56,000</div>
                  <div className="text-red-100">Vacant Positions</div>
                  <div className="text-sm mt-1 opacity-80">Completely unfilled</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">350,000</div>
                  <div className="text-red-100">Underqualified Teachers</div>
                  <div className="text-sm mt-1 opacity-80">Not fully certified</div>
                </div>
              </div>
              <p className="text-xs mt-6 opacity-75">Source: Learning Policy Institute, 2025</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-xl p-6 border-l-4 border-red-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-red-600">14-16%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Annual Teacher Turnover Rate</p>
                    <p className="text-gray-600 text-sm mt-1">Turnover rates jumped to 14-16% in 2023-24, about 2 percentage points higher than pre-pandemic years. In Mississippi, turnover exceeded 23%.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-amber-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-amber-600">74%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Districts Struggled to Fill Positions</p>
                    <p className="text-gray-600 text-sm mt-1">74% of districts had trouble filling open positions for 2024-25. Special education, science, and foreign language positions are hardest to fill.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-purple-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-purple-600">40%+</div>
                  <div>
                    <p className="text-gray-800 font-medium">Schools Hiring Underqualified Teachers</p>
                    <p className="text-gray-600 text-sm mt-1">More than 40% of schools report having to hire underqualified teachers. Nearly 30% have increased class sizes, and 25% have cut course offerings.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-blue-600">90%</div>
                  <div>
                    <p className="text-gray-800 font-medium">Of Demand Comes from Attrition</p>
                    <p className="text-gray-600 text-sm mt-1">Teacher attrition accounts for approximately 90% of annual demand for new teachers. Most openings are from teachers leaving, not enrollment growth.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shortage Areas */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
              <h3 className="font-bold text-gray-900 mb-4">Worst Shortage Areas</h3>
              <p className="text-gray-700 mb-4">Every state and DC reported shortages in multiple subject areas. The most commonly cited shortages:</p>
              <div className="grid md:grid-cols-4 gap-3">
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🎓</div>
                  <p className="font-semibold text-sm">Special Education</p>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🔬</div>
                  <p className="font-semibold text-sm">Science</p>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">📐</div>
                  <p className="font-semibold text-sm">Mathematics</p>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🌍</div>
                  <p className="font-semibold text-sm">Foreign Languages</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Factors Affecting Pay */}
          <section id="factors" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Factors Affecting Teacher Pay
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-4">State & Local Budgets</h4>
                <p className="text-gray-700 text-sm">Teacher salaries are primarily determined by state and local education budgets funded through tax revenue. Wealthier states and districts can afford higher salaries.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-4">Cost of Living</h4>
                <p className="text-gray-700 text-sm">High-salary states like California and New York also have higher costs of living. Adjusted for purchasing power, the salary gap narrows somewhat.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-4">Union Strength</h4>
                <p className="text-gray-700 text-sm">States with strong teacher unions and collective bargaining rights consistently pay teachers 24% more than states without such protections.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-4">Subject Specialization</h4>
                <p className="text-gray-700 text-sm">STEM teachers and those with specialized credentials often earn more. Districts compete aggressively for qualified science and math teachers.</p>
              </div>
            </div>
          </section>

          {/* Section 6: Trends */}
          <section id="trends" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Teacher Salary Trends
              </h2>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200 mb-8">
              <h3 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                The Inflation Reality
              </h3>
              <p className="text-gray-700 text-lg mb-4">
                <strong>Adjusted for inflation, today's average teacher earns roughly 5.1% less than in 2015-16.</strong>
              </p>
              <p className="text-gray-600">
                A decade of annual raises, and purchasing power still went backward. The nominal gains are real; the real gains are not. While salaries have increased numerically, teachers can buy less today than they could 10 years ago.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-green-500">
                <h4 className="font-bold text-green-600 mb-3">Recent Positive Trends</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>3.5-4.1% annual increases (2024-25)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>California crossed $100K average</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Some states raising minimum teacher pay</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-red-500">
                <h4 className="font-bold text-red-600 mb-3">Ongoing Challenges</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Inflation eroding real wage gains</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Teacher prep program enrollment down</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>51% of departing teachers resign (OECD)</span>
                  </li>
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
                  <h3 className="font-semibold text-gray-800 mb-3">US Salary Data</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><a href="https://www.nea.org/resource-library/educator-pay-and-student-spending-how-does-your-state-rank" className="text-amber-600 hover:underline" target="_blank" rel="noopener noreferrer">NEA - Educator Pay Data 2026</a></li>
                    <li><a href="https://worldpopulationreview.com/state-rankings/teacher-pay-by-state" className="text-amber-600 hover:underline" target="_blank" rel="noopener noreferrer">World Population Review - Teacher Pay by State</a></li>
                    <li><a href="https://www.zeneducate.com/us/resources/careers-in-education/average-teacher-salary-usa-2025-2026/" className="text-amber-600 hover:underline" target="_blank" rel="noopener noreferrer">Zen Educate - Teacher Pay Scales 2025-26</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">International & Shortage Data</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><a href="https://www.oecd.org/en/publications/education-at-a-glance-2025_1c0d9c79-en/full-report/how-much-are-teachers-and-school-heads-paid_5daf5678.html" className="text-amber-600 hover:underline" target="_blank" rel="noopener noreferrer">OECD - Education at a Glance 2025</a></li>
                    <li><a href="https://learningpolicyinstitute.org/blog/2025-update-latest-national-scan-shows-teacher-shortages-persist" className="text-amber-600 hover:underline" target="_blank" rel="noopener noreferrer">Learning Policy Institute - Teacher Shortages 2025</a></li>
                    <li><a href="https://www.visualcapitalist.com/ranked-teacher-salaries-around-the-world/" className="text-amber-600 hover:underline" target="_blank" rel="noopener noreferrer">Visual Capitalist - Global Teacher Salaries</a></li>
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
            <GraduationCap className="w-16 h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Considering a Career in Teaching?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              Explore our career roadmaps and educational resources to help you succeed in your teaching journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/roadmap">
                <Button className="bg-[#FFC857] hover:bg-[#FFC857]/90 text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                  Explore Career Paths
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/calculators/salary-calculator">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl transition-all duration-200">
                  Salary Calculator
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
