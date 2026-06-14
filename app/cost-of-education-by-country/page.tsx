import Link from 'next/link';
import {
  DollarSign,
  Home,
  BookOpen,
  GraduationCap,
  Globe,
  TrendingUp,
  Building2,
  Plane,
  PiggyBank,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  MapPin,
  Calculator
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

export default function CostOfEducationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
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
                "name": "Which country has the most expensive university education?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The United States has the most expensive university education for students, with average annual tuition at public universities around $9,596 for in-state students and $25,000-$45,000 for out-of-state. Private universities can cost $50,000-$60,000 per year. England has the highest tuition fees at the bachelor level according to OECD data, surpassing the US by 37% when adjusted for cost of living."
                }
              },
              {
                "@type": "Question",
                "name": "Which countries offer free university education?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Germany offers free tuition at public universities for all students, including international students. Nordic countries including Norway, Sweden, Denmark, and Finland offer free tuition for EU/EEA students. Austria and France have very low tuition fees (under €500/year for EU students). Some of these countries may charge fees for non-EU international students."
                }
              },
              {
                "@type": "Question",
                "name": "What is the average ROI on a college degree?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "According to Federal Reserve research (2025), the average ROI for a college degree is 12.5%. However, this varies significantly by major: engineering, math, and computer science degrees earn 18% median ROI, while education degrees earn less than 6%. About 1 in 4 graduates may not see meaningful financial return. At age 55, college-educated workers earn 60% more than those without degrees."
                }
              },
              {
                "@type": "Question",
                "name": "How much do international students pay compared to domestic students?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "International students typically pay significantly more. In Canada, international undergraduate fees average $41,746/year vs $7,734 for domestic students (5x more). In Australia, international students pay $22,359/year vs $5,108 for domestic students. In the UK, international fees range from £12,000-£40,000+ compared to £9,250 for domestic students. About 58.8% of countries charge international students more than nationals."
                }
              },
              {
                "@type": "Question",
                "name": "What are the cheapest countries to study abroad in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Germany and France are the cheapest developed countries to study abroad in 2026, with total annual costs (including living expenses) under $13,000. Germany offers free tuition at public universities. Other affordable options include Poland, Hungary, Czech Republic, and Portugal in Europe, plus Malaysia, Taiwan, and South Korea in Asia with relatively lower costs than Western countries."
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
            "headline": "Cost of Education by Country 2026: Tuition Fees, Living Costs & ROI Comparison",
            "description": "Comprehensive comparison of education costs across 50+ countries including tuition fees, living expenses, and return on investment.",
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
            <Link href="/" className="hover:text-emerald-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Cost of Education by Country</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <DollarSign className="w-10 h-10" />
            </div>
            <div className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
              Updated June 2026
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Cost of Education by Country
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Complete comparison of tuition fees, living costs, and ROI across 50+ countries. Make informed decisions about your education investment.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-bold">50+</span> Countries Covered
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-bold">2026</span> Updated Data
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-bold">ROI</span> Analysis Included
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
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-1">$51,896</div>
              <div className="text-sm text-gray-600">Avg. US Master's Cost</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-1">$0</div>
              <div className="text-sm text-gray-600">Germany Public Tuition</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cyan-600 mb-1">12.5%</div>
              <div className="text-sm text-gray-600">Avg. Degree ROI (US)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">60%</div>
              <div className="text-sm text-gray-600">Earnings Premium at 55</div>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-emerald-50 rounded-2xl p-6 md:p-8 border border-emerald-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              Table of Contents
            </h2>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <a href="#overview" className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors p-2 rounded-lg hover:bg-white">
                <Globe className="w-4 h-4" />
                Global Education Costs Overview
              </a>
              <a href="#tuition-comparison" className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors p-2 rounded-lg hover:bg-white">
                <GraduationCap className="w-4 h-4" />
                Tuition Fees by Country
              </a>
              <a href="#living-costs" className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors p-2 rounded-lg hover:bg-white">
                <Building2 className="w-4 h-4" />
                Student Living Costs
              </a>
              <a href="#international" className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors p-2 rounded-lg hover:bg-white">
                <Plane className="w-4 h-4" />
                International Student Costs
              </a>
              <a href="#free-education" className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors p-2 rounded-lg hover:bg-white">
                <PiggyBank className="w-4 h-4" />
                Countries with Free Education
              </a>
              <a href="#roi" className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors p-2 rounded-lg hover:bg-white">
                <TrendingUp className="w-4 h-4" />
                Education ROI Analysis
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Section 1: Overview */}
          <section id="overview" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Global Education Costs Overview
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Education costs vary dramatically around the world. While some countries offer free university education, others require students to invest over $200,000 for a four-year degree. Understanding these costs is crucial for making informed decisions about where to study.
            </p>

            {/* Most Expensive vs Most Affordable */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
                <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Most Expensive Countries
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">United States</span>
                    <span className="font-bold text-red-600">$35,852/yr (private)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">England (UK)</span>
                    <span className="font-bold text-red-600">£9,250+/yr</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">Australia</span>
                    <span className="font-bold text-red-600">$22,359/yr (intl)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">Canada</span>
                    <span className="font-bold text-red-600">$41,746/yr (intl)</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Most Affordable Countries
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">Germany</span>
                    <span className="font-bold text-green-600">$0-$400/yr</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">Norway</span>
                    <span className="font-bold text-green-600">Free (EU/EEA)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">France</span>
                    <span className="font-bold text-green-600">~€170/yr (public)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">Poland</span>
                    <span className="font-bold text-green-600">€2,000-4,000/yr</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Stat */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="text-5xl font-bold">$31,000+</div>
                <div>
                  <p className="text-lg font-semibold">Luxembourg spends per student</p>
                  <p className="text-emerald-100 text-sm">Highest government education spending globally, nearly $9,000 more than second-place Norway</p>
                </div>
              </div>
              <p className="text-xs mt-4 opacity-75">Source: Visual Capitalist, OECD 2025</p>
            </div>
          </section>

          {/* Section 2: Tuition Fees Comparison */}
          <section id="tuition-comparison" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Tuition Fees by Country (2025-2026)
              </h2>
            </div>

            {/* Comprehensive Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
                    <tr>
                      <th className="py-4 px-4 text-left font-semibold">Country</th>
                      <th className="py-4 px-4 text-left font-semibold">Domestic (Bachelor's)</th>
                      <th className="py-4 px-4 text-left font-semibold">International</th>
                      <th className="py-4 px-4 text-left font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇺🇸</span> United States
                      </td>
                      <td className="py-4 px-4">$9,596/yr (public)</td>
                      <td className="py-4 px-4 text-red-600 font-semibold">$25,000-$45,000/yr</td>
                      <td className="py-4 px-4 text-gray-600 text-xs">Private: up to $60,000/yr</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇬🇧</span> United Kingdom
                      </td>
                      <td className="py-4 px-4">£9,250/yr</td>
                      <td className="py-4 px-4 text-red-600 font-semibold">£12,000-£40,000/yr</td>
                      <td className="py-4 px-4 text-gray-600 text-xs">Highest bachelor fees (OECD)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇨🇦</span> Canada
                      </td>
                      <td className="py-4 px-4">$7,734/yr</td>
                      <td className="py-4 px-4 text-red-600 font-semibold">$41,746/yr</td>
                      <td className="py-4 px-4 text-gray-600 text-xs">5x more for international</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇦🇺</span> Australia
                      </td>
                      <td className="py-4 px-4">$5,108/yr</td>
                      <td className="py-4 px-4 text-red-600 font-semibold">$22,359/yr</td>
                      <td className="py-4 px-4 text-gray-600 text-xs">High student debt levels</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇩🇪</span> Germany
                      </td>
                      <td className="py-4 px-4 text-green-600 font-semibold">Free</td>
                      <td className="py-4 px-4 text-green-600 font-semibold">Free (public)</td>
                      <td className="py-4 px-4 text-gray-600 text-xs">€100-400 semester fees</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇫🇷</span> France
                      </td>
                      <td className="py-4 px-4 text-green-600 font-semibold">~€170/yr</td>
                      <td className="py-4 px-4">€2,770/yr</td>
                      <td className="py-4 px-4 text-gray-600 text-xs">EU students: same as domestic</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇳🇴</span> Norway
                      </td>
                      <td className="py-4 px-4 text-green-600 font-semibold">Free</td>
                      <td className="py-4 px-4 text-green-600 font-semibold">Free</td>
                      <td className="py-4 px-4 text-gray-600 text-xs">All students, including intl</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇸🇪</span> Sweden
                      </td>
                      <td className="py-4 px-4 text-green-600 font-semibold">Free</td>
                      <td className="py-4 px-4">SEK 80,000-295,000/yr</td>
                      <td className="py-4 px-4 text-gray-600 text-xs">Free for EU/EEA only</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇳🇱</span> Netherlands
                      </td>
                      <td className="py-4 px-4">€2,530/yr</td>
                      <td className="py-4 px-4">€8,000-20,000/yr</td>
                      <td className="py-4 px-4 text-gray-600 text-xs">EU rate for EU students</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇦🇹</span> Austria
                      </td>
                      <td className="py-4 px-4 text-green-600 font-semibold">€363/semester</td>
                      <td className="py-4 px-4">€6,000-15,000/yr</td>
                      <td className="py-4 px-4 text-gray-600 text-xs">Public unis: €726/yr for EU</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇩🇰</span> Denmark
                      </td>
                      <td className="py-4 px-4 text-green-600 font-semibold">Free</td>
                      <td className="py-4 px-4">€6,000-16,000/yr</td>
                      <td className="py-4 px-4 text-gray-600 text-xs">Free for EU/EEA/Swiss</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇯🇵</span> Japan
                      </td>
                      <td className="py-4 px-4">¥535,800/yr (~$3,600)</td>
                      <td className="py-4 px-4">Similar to domestic</td>
                      <td className="py-4 px-4 text-gray-600 text-xs">National universities</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇰🇷</span> South Korea
                      </td>
                      <td className="py-4 px-4">$4,000-8,000/yr</td>
                      <td className="py-4 px-4">$5,000-15,000/yr</td>
                      <td className="py-4 px-4 text-gray-600 text-xs">Many scholarships available</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium flex items-center gap-2">
                        <span className="text-xl">🇮🇳</span> India
                      </td>
                      <td className="py-4 px-4 text-green-600 font-semibold">$500-5,000/yr</td>
                      <td className="py-4 px-4">$3,000-10,000/yr</td>
                      <td className="py-4 px-4 text-gray-600 text-xs">Highly variable by institution</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-gray-50 text-xs text-gray-500">
                Sources: Education Data Initiative, OECD Education at a Glance 2025, Mastersportal, StatCan
              </div>
            </div>

            {/* Key Insight */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                Key Finding
              </h3>
              <p className="text-gray-700">
                <strong>England has the highest university tuition fees in the world at the bachelor level</strong> according to the OECD. When adjusted for cost of living, English university fees surpass even the United States by 37%.
              </p>
              <p className="text-xs text-gray-500 mt-2">Source: OECD Education at a Glance 2025</p>
            </div>
          </section>

          {/* Section 3: Living Costs */}
          <section id="living-costs" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-cyan-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Student Living Costs by Country
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Living costs often exceed tuition fees, especially in countries with free education. Here's what students need to budget for accommodation, food, and daily expenses.
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-xl p-6 border-l-4 border-cyan-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🇦🇺</span>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">Australia</p>
                    <p className="text-2xl font-bold text-cyan-600 my-1">AUD 29,710/year minimum</p>
                    <p className="text-gray-600 text-sm">Required proof of funds for student visa. Sydney: AUD 1,500+/month rent (shared). Melbourne slightly cheaper. Brisbane & Adelaide: AUD 1,000-1,300/month.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-red-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🇬🇧</span>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">United Kingdom</p>
                    <p className="text-2xl font-bold text-red-600 my-1">£1,483/month (London) | £1,136/month (outside)</p>
                    <p className="text-gray-600 text-sm">Visa requirement: Must prove funds for up to 9 months. London costs 30% more than other UK cities.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🇨🇦</span>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">Canada</p>
                    <p className="text-2xl font-bold text-blue-600 my-1">CAD 22,895/year ($17,171)</p>
                    <p className="text-gray-600 text-sm">Toronto/Vancouver: CAD 2,000+/month rent. Montreal, Halifax, Winnipeg: 40-50% cheaper than major cities.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-green-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🇩🇪</span>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">Germany</p>
                    <p className="text-2xl font-bold text-green-600 my-1">€934/month (~$11,200/year)</p>
                    <p className="text-gray-600 text-sm">Blocked account requirement for student visa. Munich most expensive; East German cities more affordable.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-purple-500 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🇰🇷</span>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">South Korea</p>
                    <p className="text-2xl font-bold text-purple-600 my-1">₩1.2-2.5 million/month ($900-1,900)</p>
                    <p className="text-gray-600 text-sm">Cost of living 215% higher than India (excluding rent). Seoul most expensive; regional cities offer savings.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Cost Comparison */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Total Annual Cost (Tuition + Living) - International Students</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium text-gray-700">USA (Private)</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '100%' }}>
                      <span className="text-white text-sm font-bold">$70,000+</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium text-gray-700">UK (London)</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-400 to-red-500 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '75%' }}>
                      <span className="text-white text-sm font-bold">$50,000+</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium text-gray-700">Canada</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '70%' }}>
                      <span className="text-white text-sm font-bold">$45,000+</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium text-gray-700">Australia</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '65%' }}>
                      <span className="text-white text-sm font-bold">$40,000+</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium text-gray-700">Germany</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-400 to-green-500 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '20%' }}>
                      <span className="text-white text-sm font-bold">$13,000</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium text-gray-700">France</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '22%' }}>
                      <span className="text-white text-sm font-bold">$14,000</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">Note: Estimates include tuition + average living costs. Actual costs vary by city and lifestyle.</p>
            </div>
          </section>

          {/* Section 4: International Student Costs */}
          <section id="international" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Plane className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                International Student Premium
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              International students often face significantly higher tuition fees than domestic students. Here's how much more international students pay around the world.
            </p>

            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 md:p-8 text-white mb-8">
              <h3 className="text-xl font-bold mb-4">Key Statistic</h3>
              <div className="text-5xl font-bold mb-2">58.8%</div>
              <p className="text-lg text-blue-100">of surveyed countries charge international students more than nationals for master's degree programs</p>
              <p className="text-xs mt-4 opacity-75">Source: Education Data Initiative, 2025</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🇨🇦</span> Canada: 5.4x Premium
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Domestic Undergrad</span>
                    <span className="font-semibold">$7,734/year</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>International Undergrad</span>
                    <span className="font-bold">$41,746/year</span>
                  </div>
                  <div className="pt-2 border-t">
                    <span className="text-sm text-gray-500">International students pay 5.4x more</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🇦🇺</span> Australia: 4.4x Premium
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Domestic Bachelor's</span>
                    <span className="font-semibold">$5,108/year</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>International Bachelor's</span>
                    <span className="font-bold">$22,359/year</span>
                  </div>
                  <div className="pt-2 border-t">
                    <span className="text-sm text-gray-500">International students pay 4.4x more</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Countries with Equal Fees */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Countries with Equal/Low Fees for International Students
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <span className="text-2xl block mb-2">🇩🇪</span>
                  <p className="font-semibold">Germany</p>
                  <p className="text-sm text-gray-600">Free tuition for all at public universities</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <span className="text-2xl block mb-2">🇳🇴</span>
                  <p className="font-semibold">Norway</p>
                  <p className="text-sm text-gray-600">Free tuition for all students</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <span className="text-2xl block mb-2">🇯🇵</span>
                  <p className="font-semibold">Japan</p>
                  <p className="text-sm text-gray-600">Similar fees for all at national universities</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Free Education Countries */}
          <section id="free-education" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <PiggyBank className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Countries with Free or Nearly Free Education
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Several countries offer free or heavily subsidized university education. Here's a complete breakdown of your options for low-cost quality education.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Fully Free */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200">
                <h3 className="text-lg font-bold text-green-700 mb-4">Free for All Students</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🇩🇪</span>
                    <div>
                      <p className="font-semibold">Germany</p>
                      <p className="text-sm text-gray-600">No tuition at public universities. Only €100-400 semester fees. Programs in English available.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🇳🇴</span>
                    <div>
                      <p className="font-semibold">Norway</p>
                      <p className="text-sm text-gray-600">Free for all nationalities. High living costs (~$15,000/yr). Many English programs.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Free for EU/EEA */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
                <h3 className="text-lg font-bold text-blue-700 mb-4">Free for EU/EEA Students</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🇸🇪</span>
                    <div>
                      <p className="font-semibold">Sweden</p>
                      <p className="text-sm text-gray-600">Free for EU/EEA. Non-EU: SEK 80,000-295,000/yr.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🇫🇮</span>
                    <div>
                      <p className="font-semibold">Finland</p>
                      <p className="text-sm text-gray-600">Free for EU/EEA. Non-EU: €4,000-18,000/yr.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🇩🇰</span>
                    <div>
                      <p className="font-semibold">Denmark</p>
                      <p className="text-sm text-gray-600">Free for EU/EEA/Swiss. Non-EU: €6,000-16,000/yr.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Low-Cost Options */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Very Low-Cost Options (Under €3,000/year)</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-2xl block mb-2">🇫🇷</span>
                  <p className="font-semibold">France</p>
                  <p className="text-sm text-gray-600">€170/yr public (EU), €2,770/yr (non-EU)</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-2xl block mb-2">🇦🇹</span>
                  <p className="font-semibold">Austria</p>
                  <p className="text-sm text-gray-600">€726/yr for EU students</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-2xl block mb-2">🇧🇪</span>
                  <p className="font-semibold">Belgium</p>
                  <p className="text-sm text-gray-600">€835-4,175/yr depending on income</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-2xl block mb-2">🇵🇱</span>
                  <p className="font-semibold">Poland</p>
                  <p className="text-sm text-gray-600">€2,000-4,000/yr for international</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-2xl block mb-2">🇨🇿</span>
                  <p className="font-semibold">Czech Republic</p>
                  <p className="text-sm text-gray-600">Free in Czech, €2,000-15,000 in English</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-2xl block mb-2">🇭🇺</span>
                  <p className="font-semibold">Hungary</p>
                  <p className="text-sm text-gray-600">€1,500-6,000/yr for international</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: ROI Analysis */}
          <section id="roi" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Education ROI Analysis
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Is a college degree worth the investment? Here's what the latest research reveals about the return on investment for higher education.
            </p>

            {/* Key ROI Stats */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 md:p-8 text-white mb-8">
              <h3 className="text-xl font-bold mb-6">US College Degree ROI (Federal Reserve Research, 2025)</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">12.5%</div>
                  <div className="text-purple-200">Average ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">18%</div>
                  <div className="text-purple-200">STEM Fields ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">1 in 4</div>
                  <div className="text-purple-200">Grads see no return</div>
                </div>
              </div>
              <p className="text-xs mt-6 opacity-75">Source: Federal Reserve Bank of New York, CNBC, 2025</p>
            </div>

            {/* ROI by Major */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Lifetime ROI by Field of Study</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-40 text-sm font-medium text-gray-700">Agriculture/Agribusiness</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '100%' }}>
                      <span className="text-white text-sm font-bold">+301%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-40 text-sm font-medium text-gray-700">Engineering/CS/Math</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '60%' }}>
                      <span className="text-white text-sm font-bold">+18% median</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-40 text-sm font-medium text-gray-700">Education</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '20%' }}>
                      <span className="text-white text-sm font-bold">{`<6%`}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-40 text-sm font-medium text-gray-700">Liberal Arts</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-400 to-red-500 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '30%' }}>
                      <span className="text-white text-sm font-bold">-94%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-40 text-sm font-medium text-gray-700">Psychology</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '40%' }}>
                      <span className="text-white text-sm font-bold">-123%</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">Source: Education Data Initiative - lifetime ROI accounting for opportunity cost</p>
            </div>

            {/* Earnings Premium */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h4 className="font-bold text-gray-900 mb-4">Earnings Premium Over Time</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">At age 25</span>
                    <span className="text-2xl font-bold text-green-600">+27%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">At age 55</span>
                    <span className="text-2xl font-bold text-green-600">+60%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">vs. workers without a degree (NBER, 2023)</p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                <h4 className="font-bold text-gray-900 mb-4">Time to Graduate Matters</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">4 years</span>
                    <span className="text-2xl font-bold text-green-600">12.5% ROI</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">5 years</span>
                    <span className="text-2xl font-bold text-amber-600">9.3% ROI</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">6 years</span>
                    <span className="text-2xl font-bold text-red-600">7% ROI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Debt */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                Student Debt Warning
              </h3>
              <p className="text-gray-700 mb-4">
                Average debt per borrower exceeds <strong>$20,000</strong> in Australia, England (UK), and the United States. Student loan debt is common among graduates in these countries due to high education costs.
              </p>
              <p className="text-sm text-gray-600">
                Consider studying in countries with lower costs or free education to minimize debt burden and maximize your ROI.
              </p>
            </div>
          </section>

          {/* Sources */}
          <section className="mb-16">
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Sources & References</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Tuition & Costs Data</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><a href="https://educationdata.org/average-cost-of-college-by-country" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">Education Data Initiative - Cost by Country</a></li>
                    <li><a href="https://research.com/universities-colleges/how-much-does-college-cost" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">Research.com - College Cost Breakdown</a></li>
                    <li><a href="https://www.mastersportal.com/articles/405/tuition-fees-at-universities-in-europe-overview-and-comparison.html" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">Mastersportal - European Tuition Fees</a></li>
                    <li><a href="https://www.oecd.org/en/publications/education-at-a-glance-2025_1c0d9c79-en/full-report/how-is-tertiary-education-financed_2845d742.html" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">OECD Education at a Glance 2025</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">ROI & Living Costs</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><a href="https://www.cnbc.com/2025/04/18/median-return-on-investment-for-a-college-degree.html" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">CNBC - Federal Reserve ROI Research</a></li>
                    <li><a href="https://educationdata.org/college-degree-roi" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">Education Data - College Degree ROI</a></li>
                    <li><a href="https://www.numbeo.com/cost-of-living/rankings_by_country.jsp" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">Numbeo - Cost of Living Index 2026</a></li>
                    <li><a href="https://www.visualcapitalist.com/ranked-education-spending-per-student-by-country/" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">Visual Capitalist - Education Spending</a></li>
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
            <Calculator className="w-16 h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Plan Your Education Budget
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              Use our free calculators to plan your education costs, compare loans, and make informed financial decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculators/student-loan-calculator">
                <Button className="bg-[#FFC857] hover:bg-[#FFC857]/90 text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                  Student Loan Calculator
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/calculators/currency-converter">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl transition-all duration-200">
                  Currency Converter
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
