import Link from 'next/link';
import {
  GraduationCap,
  Home,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Users,
  School,
  Award,
  DollarSign,
  Globe,
  BarChart3,
  Target,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Calendar,
  FileText,
  Star
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

export default function CollegeAcceptanceRatesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50">
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
                "name": "What are the Ivy League acceptance rates for 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ivy League acceptance rates for Class of 2029 (2025-2026 admissions) are at historic lows: Harvard 3.6%, Columbia 3.7%, Princeton 4.0%, Yale 3.9%, Brown 5.0%, Penn 5.4%, Dartmouth 5.5%, and Cornell 7.8%. These rates include both early decision and regular decision applicants."
                }
              },
              {
                "@type": "Question",
                "name": "Which college has the lowest acceptance rate in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Harvard has the lowest acceptance rate among major universities at 3.6% for the Class of 2029. However, some specialized programs like Juilliard Drama (acceptance rate ~2%) and Curtis Institute of Music (~4%) have even lower rates. Among research universities, MIT (4.0%), Stanford (3.9%), and CalTech (3.0%) also have extremely competitive admissions."
                }
              },
              {
                "@type": "Question",
                "name": "Does applying Early Decision increase my chances of acceptance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Early Decision (ED) acceptance rates are typically 1.5-3x higher than Regular Decision rates. For example, Cornell's ED rate is ~23% vs ~7.8% overall. Brown's ED rate is ~14% vs ~5% overall. However, ED is binding, meaning you must attend if accepted. Early Action (non-binding) also offers advantages but to a lesser degree."
                }
              },
              {
                "@type": "Question",
                "name": "What SAT score do I need for Ivy League schools?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ivy League schools typically admit students with SAT scores in the 1500-1600 range (25th-75th percentile). For Harvard, the middle 50% SAT range is 1510-1580. MIT's range is 1520-1580. However, test scores are just one factor - many Ivies are now test-optional or test-flexible, and holistic review considers essays, activities, recommendations, and more."
                }
              },
              {
                "@type": "Question",
                "name": "What is the average cost of attending a top university?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The total cost of attendance (tuition, room, board, fees) at top private universities averages $85,000-$95,000 per year in 2026. However, top schools offer generous financial aid: Harvard, Yale, and Princeton cover 100% of demonstrated need, and families earning under $75,000-$100,000 typically pay nothing. Public flagships cost $25,000-$40,000 for in-state students."
                }
              }
            ]
          })
        }}
      />

      {/* Dataset Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dataset",
            "name": "College Acceptance Rates Database 2026",
            "description": "Comprehensive database of acceptance rates, SAT scores, and tuition costs for top 100 US universities",
            "creator": {
              "@type": "Organization",
              "name": "The Tutor Bridge"
            },
            "datePublished": "2026-01-15",
            "dateModified": "2026-06-14",
            "license": "https://creativecommons.org/licenses/by/4.0/",
            "variableMeasured": [
              "Acceptance Rate",
              "SAT Score Range",
              "ACT Score Range",
              "Tuition Cost",
              "Early Decision Rate"
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
            "headline": "College Acceptance Rates 2026: Top 100 Universities Data & Statistics",
            "description": "Comprehensive college acceptance rates database including Ivy League, top 100 universities, SAT scores, costs, and admission statistics.",
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
            "dateModified": "2026-06-14"
          })
        }}
      />

      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">College Acceptance Rates</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <GraduationCap className="w-10 h-10" />
            </div>
            <div className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
              Updated June 2026
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              College Acceptance Rates 2026
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Complete database of acceptance rates, SAT scores, and costs for 100+ top universities. Ivy League to public flagships - all the data you need to plan your college journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-bold">100+</span> Universities
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-bold">2026</span> Updated Data
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-bold">ED/RD</span> Rates Included
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
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">3.6%</div>
              <div className="text-sm text-gray-600">Harvard (Lowest Ivy)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-1">4.0%</div>
              <div className="text-sm text-gray-600">MIT Overall Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-violet-600 mb-1">1520+</div>
              <div className="text-sm text-gray-600">Median SAT (Top 20)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-1">$91K</div>
              <div className="text-sm text-gray-600">Avg. Cost of Attendance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 md:p-8 border border-blue-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Table of Contents
            </h2>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <a href="#ivy-league" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-white">
                <Star className="w-4 h-4" />
                Ivy League Acceptance Rates
              </a>
              <a href="#top-20" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-white">
                <Award className="w-4 h-4" />
                Top 20 Universities
              </a>
              <a href="#top-50" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-white">
                <School className="w-4 h-4" />
                Top 50 Universities
              </a>
              <a href="#early-decision" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-white">
                <Calendar className="w-4 h-4" />
                Early Decision Rates
              </a>
              <a href="#public-universities" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-white">
                <Globe className="w-4 h-4" />
                Top Public Universities
              </a>
              <a href="#costs" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-white">
                <DollarSign className="w-4 h-4" />
                Tuition & Financial Aid
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Section 1: Ivy League */}
          <section id="ivy-league" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Ivy League Acceptance Rates 2026
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The eight Ivy League schools continue to see record-low acceptance rates. For the Class of 2029 (2025-2026 admissions cycle), competition has never been fiercer. Here's the complete breakdown.
            </p>

            {/* Ivy League Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
                    <tr>
                      <th className="py-4 px-4 text-left font-semibold">University</th>
                      <th className="py-4 px-4 text-center font-semibold">Overall Rate</th>
                      <th className="py-4 px-4 text-center font-semibold">ED/REA Rate</th>
                      <th className="py-4 px-4 text-center font-semibold">SAT Range</th>
                      <th className="py-4 px-4 text-center font-semibold">Applications</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-yellow-50">
                      <td className="py-4 px-4 font-medium">
                        <div className="flex items-center gap-2">
                          Harvard University
                          <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">#1</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-red-600">3.6%</td>
                      <td className="py-4 px-4 text-center text-green-600 font-semibold">7.6%</td>
                      <td className="py-4 px-4 text-center">1510-1580</td>
                      <td className="py-4 px-4 text-center">54,008</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium">Columbia University</td>
                      <td className="py-4 px-4 text-center font-bold text-red-600">3.7%</td>
                      <td className="py-4 px-4 text-center text-green-600 font-semibold">10.5%</td>
                      <td className="py-4 px-4 text-center">1510-1570</td>
                      <td className="py-4 px-4 text-center">57,129</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium">Yale University</td>
                      <td className="py-4 px-4 text-center font-bold text-red-600">3.9%</td>
                      <td className="py-4 px-4 text-center text-green-600 font-semibold">10.9%</td>
                      <td className="py-4 px-4 text-center">1510-1570</td>
                      <td className="py-4 px-4 text-center">52,250</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium">Princeton University</td>
                      <td className="py-4 px-4 text-center font-bold text-red-600">4.0%</td>
                      <td className="py-4 px-4 text-center text-green-600 font-semibold">13.6%</td>
                      <td className="py-4 px-4 text-center">1510-1580</td>
                      <td className="py-4 px-4 text-center">39,644</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium">Brown University</td>
                      <td className="py-4 px-4 text-center font-bold text-orange-600">5.0%</td>
                      <td className="py-4 px-4 text-center text-green-600 font-semibold">14.0%</td>
                      <td className="py-4 px-4 text-center">1500-1570</td>
                      <td className="py-4 px-4 text-center">51,302</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium">UPenn (Pennsylvania)</td>
                      <td className="py-4 px-4 text-center font-bold text-orange-600">5.4%</td>
                      <td className="py-4 px-4 text-center text-green-600 font-semibold">15.2%</td>
                      <td className="py-4 px-4 text-center">1500-1570</td>
                      <td className="py-4 px-4 text-center">59,465</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium">Dartmouth College</td>
                      <td className="py-4 px-4 text-center font-bold text-orange-600">5.5%</td>
                      <td className="py-4 px-4 text-center text-green-600 font-semibold">18.5%</td>
                      <td className="py-4 px-4 text-center">1490-1570</td>
                      <td className="py-4 px-4 text-center">31,656</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium">Cornell University</td>
                      <td className="py-4 px-4 text-center font-bold text-amber-600">7.8%</td>
                      <td className="py-4 px-4 text-center text-green-600 font-semibold">22.6%</td>
                      <td className="py-4 px-4 text-center">1470-1560</td>
                      <td className="py-4 px-4 text-center">67,380</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-gray-50 text-xs text-gray-500">
                Sources: Official university admissions data, Common Data Set 2025-2026. ED = Early Decision, REA = Restrictive Early Action.
              </div>
            </div>

            {/* Key Insight */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Key Insight</h3>
              <p className="text-lg text-blue-100">
                Ivy League acceptance rates have dropped <strong>over 50%</strong> in the past decade. In 2015, Harvard's rate was 5.3% - today it's 3.6%. The rise of the Common App and increased international applications have driven this trend.
              </p>
              <p className="text-xs mt-4 opacity-75">Source: Historical admissions data analysis</p>
            </div>
          </section>

          {/* Section 2: Top 20 Universities */}
          <section id="top-20" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Top 20 National Universities (2026)
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Beyond the Ivy League, these elite universities also have extremely competitive admissions. Here's the complete Top 20 with acceptance rates and key statistics.
            </p>

            {/* Top 20 Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                    <tr>
                      <th className="py-4 px-4 text-left font-semibold">Rank</th>
                      <th className="py-4 px-4 text-left font-semibold">University</th>
                      <th className="py-4 px-4 text-center font-semibold">Accept Rate</th>
                      <th className="py-4 px-4 text-center font-semibold">SAT (Mid 50%)</th>
                      <th className="py-4 px-4 text-center font-semibold">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-indigo-600">1</td>
                      <td className="py-3 px-4 font-medium">Princeton University</td>
                      <td className="py-3 px-4 text-center text-red-600 font-semibold">4.0%</td>
                      <td className="py-3 px-4 text-center">1510-1580</td>
                      <td className="py-3 px-4 text-center">$87,910</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-indigo-600">2</td>
                      <td className="py-3 px-4 font-medium">MIT</td>
                      <td className="py-3 px-4 text-center text-red-600 font-semibold">4.0%</td>
                      <td className="py-3 px-4 text-center">1520-1580</td>
                      <td className="py-3 px-4 text-center">$85,960</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-indigo-600">3</td>
                      <td className="py-3 px-4 font-medium">Harvard University</td>
                      <td className="py-3 px-4 text-center text-red-600 font-semibold">3.6%</td>
                      <td className="py-3 px-4 text-center">1510-1580</td>
                      <td className="py-3 px-4 text-center">$90,754</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-indigo-600">4</td>
                      <td className="py-3 px-4 font-medium">Stanford University</td>
                      <td className="py-3 px-4 text-center text-red-600 font-semibold">3.9%</td>
                      <td className="py-3 px-4 text-center">1510-1580</td>
                      <td className="py-3 px-4 text-center">$90,402</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-indigo-600">5</td>
                      <td className="py-3 px-4 font-medium">Yale University</td>
                      <td className="py-3 px-4 text-center text-red-600 font-semibold">3.9%</td>
                      <td className="py-3 px-4 text-center">1510-1570</td>
                      <td className="py-3 px-4 text-center">$89,270</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-indigo-600">6</td>
                      <td className="py-3 px-4 font-medium">Caltech</td>
                      <td className="py-3 px-4 text-center text-red-600 font-semibold">3.0%</td>
                      <td className="py-3 px-4 text-center">1530-1580</td>
                      <td className="py-3 px-4 text-center">$86,886</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-indigo-600">7</td>
                      <td className="py-3 px-4 font-medium">Duke University</td>
                      <td className="py-3 px-4 text-center text-orange-600 font-semibold">5.5%</td>
                      <td className="py-3 px-4 text-center">1510-1570</td>
                      <td className="py-3 px-4 text-center">$91,274</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-indigo-600">8</td>
                      <td className="py-3 px-4 font-medium">Johns Hopkins</td>
                      <td className="py-3 px-4 text-center text-orange-600 font-semibold">6.5%</td>
                      <td className="py-3 px-4 text-center">1510-1570</td>
                      <td className="py-3 px-4 text-center">$87,272</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-indigo-600">9</td>
                      <td className="py-3 px-4 font-medium">Northwestern</td>
                      <td className="py-3 px-4 text-center text-orange-600 font-semibold">6.0%</td>
                      <td className="py-3 px-4 text-center">1500-1570</td>
                      <td className="py-3 px-4 text-center">$89,883</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-indigo-600">10</td>
                      <td className="py-3 px-4 font-medium">UChicago</td>
                      <td className="py-3 px-4 text-center text-orange-600 font-semibold">5.4%</td>
                      <td className="py-3 px-4 text-center">1510-1570</td>
                      <td className="py-3 px-4 text-center">$92,169</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-indigo-600">11</td>
                      <td className="py-3 px-4 font-medium">Columbia University</td>
                      <td className="py-3 px-4 text-center text-red-600 font-semibold">3.7%</td>
                      <td className="py-3 px-4 text-center">1510-1570</td>
                      <td className="py-3 px-4 text-center">$93,504</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-indigo-600">12</td>
                      <td className="py-3 px-4 font-medium">UPenn</td>
                      <td className="py-3 px-4 text-center text-orange-600 font-semibold">5.4%</td>
                      <td className="py-3 px-4 text-center">1500-1570</td>
                      <td className="py-3 px-4 text-center">$90,572</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-indigo-600">13</td>
                      <td className="py-3 px-4 font-medium">Brown University</td>
                      <td className="py-3 px-4 text-center text-orange-600 font-semibold">5.0%</td>
                      <td className="py-3 px-4 text-center">1500-1570</td>
                      <td className="py-3 px-4 text-center">$88,708</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-indigo-600">14</td>
                      <td className="py-3 px-4 font-medium">Dartmouth College</td>
                      <td className="py-3 px-4 text-center text-orange-600 font-semibold">5.5%</td>
                      <td className="py-3 px-4 text-center">1490-1570</td>
                      <td className="py-3 px-4 text-center">$88,878</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-indigo-600">15</td>
                      <td className="py-3 px-4 font-medium">Vanderbilt</td>
                      <td className="py-3 px-4 text-center text-orange-600 font-semibold">5.1%</td>
                      <td className="py-3 px-4 text-center">1500-1570</td>
                      <td className="py-3 px-4 text-center">$88,692</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-indigo-600">16</td>
                      <td className="py-3 px-4 font-medium">Rice University</td>
                      <td className="py-3 px-4 text-center text-amber-600 font-semibold">7.7%</td>
                      <td className="py-3 px-4 text-center">1500-1570</td>
                      <td className="py-3 px-4 text-center">$80,760</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-indigo-600">17</td>
                      <td className="py-3 px-4 font-medium">Notre Dame</td>
                      <td className="py-3 px-4 text-center text-amber-600 font-semibold">12.0%</td>
                      <td className="py-3 px-4 text-center">1450-1550</td>
                      <td className="py-3 px-4 text-center">$85,644</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-indigo-600">18</td>
                      <td className="py-3 px-4 font-medium">Cornell University</td>
                      <td className="py-3 px-4 text-center text-amber-600 font-semibold">7.8%</td>
                      <td className="py-3 px-4 text-center">1470-1560</td>
                      <td className="py-3 px-4 text-center">$87,738</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-indigo-600">19</td>
                      <td className="py-3 px-4 font-medium">Georgetown</td>
                      <td className="py-3 px-4 text-center text-amber-600 font-semibold">12.0%</td>
                      <td className="py-3 px-4 text-center">1440-1540</td>
                      <td className="py-3 px-4 text-center">$87,912</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-indigo-600">20</td>
                      <td className="py-3 px-4 font-medium">UC Berkeley</td>
                      <td className="py-3 px-4 text-center text-amber-600 font-semibold">11.4%</td>
                      <td className="py-3 px-4 text-center">1400-1540</td>
                      <td className="py-3 px-4 text-center">$48,465 (IS) / $83,199 (OOS)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-gray-50 text-xs text-gray-500">
                Sources: US News & World Report 2026 Rankings, Common Data Set 2025-2026. IS = In-State, OOS = Out-of-State.
              </div>
            </div>

            {/* Visual breakdown */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl p-6 text-white text-center">
                <div className="text-4xl font-bold mb-2">{`<5%`}</div>
                <div className="text-red-100">Extremely Selective</div>
                <div className="text-sm mt-2 bg-white/20 rounded px-2 py-1">10 schools</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 text-white text-center">
                <div className="text-4xl font-bold mb-2">5-10%</div>
                <div className="text-orange-100">Highly Selective</div>
                <div className="text-sm mt-2 bg-white/20 rounded px-2 py-1">7 schools</div>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl p-6 text-white text-center">
                <div className="text-4xl font-bold mb-2">10-15%</div>
                <div className="text-amber-100">Very Selective</div>
                <div className="text-sm mt-2 bg-white/20 rounded px-2 py-1">3 schools</div>
              </div>
            </div>
          </section>

          {/* Section 3: Top 50 */}
          <section id="top-50" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                <School className="w-6 h-6 text-violet-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Top 21-50 Universities (2026)
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              These excellent universities offer outstanding education with slightly higher acceptance rates. Many students find their perfect fit in this tier.
            </p>

            {/* Top 21-50 Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-violet-600 to-purple-600 text-white">
                    <tr>
                      <th className="py-4 px-4 text-left font-semibold">Rank</th>
                      <th className="py-4 px-4 text-left font-semibold">University</th>
                      <th className="py-4 px-4 text-center font-semibold">Accept Rate</th>
                      <th className="py-4 px-4 text-center font-semibold">SAT Range</th>
                      <th className="py-4 px-4 text-center font-semibold">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-violet-600">21</td>
                      <td className="py-3 px-4 font-medium">UCLA</td>
                      <td className="py-3 px-4 text-center text-amber-600 font-semibold">8.6%</td>
                      <td className="py-3 px-4 text-center">1400-1530</td>
                      <td className="py-3 px-4 text-center"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">Public</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-violet-600">22</td>
                      <td className="py-3 px-4 font-medium">Emory University</td>
                      <td className="py-3 px-4 text-center text-amber-600 font-semibold">11.4%</td>
                      <td className="py-3 px-4 text-center">1430-1540</td>
                      <td className="py-3 px-4 text-center"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">Private</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-violet-600">23</td>
                      <td className="py-3 px-4 font-medium">Carnegie Mellon</td>
                      <td className="py-3 px-4 text-center text-amber-600 font-semibold">11.0%</td>
                      <td className="py-3 px-4 text-center">1490-1560</td>
                      <td className="py-3 px-4 text-center"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">Private</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-violet-600">24</td>
                      <td className="py-3 px-4 font-medium">UVA</td>
                      <td className="py-3 px-4 text-center text-green-600 font-semibold">18.6%</td>
                      <td className="py-3 px-4 text-center">1390-1520</td>
                      <td className="py-3 px-4 text-center"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">Public</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-violet-600">25</td>
                      <td className="py-3 px-4 font-medium">USC</td>
                      <td className="py-3 px-4 text-center text-amber-600 font-semibold">9.2%</td>
                      <td className="py-3 px-4 text-center">1440-1540</td>
                      <td className="py-3 px-4 text-center"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">Private</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-violet-600">26</td>
                      <td className="py-3 px-4 font-medium">University of Michigan</td>
                      <td className="py-3 px-4 text-center text-green-600 font-semibold">17.7%</td>
                      <td className="py-3 px-4 text-center">1380-1540</td>
                      <td className="py-3 px-4 text-center"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">Public</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-violet-600">27</td>
                      <td className="py-3 px-4 font-medium">Washington U St. Louis</td>
                      <td className="py-3 px-4 text-center text-amber-600 font-semibold">11.0%</td>
                      <td className="py-3 px-4 text-center">1480-1570</td>
                      <td className="py-3 px-4 text-center"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">Private</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-violet-600">28</td>
                      <td className="py-3 px-4 font-medium">NYU</td>
                      <td className="py-3 px-4 text-center text-amber-600 font-semibold">8.0%</td>
                      <td className="py-3 px-4 text-center">1450-1550</td>
                      <td className="py-3 px-4 text-center"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">Private</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-violet-600">29</td>
                      <td className="py-3 px-4 font-medium">UNC Chapel Hill</td>
                      <td className="py-3 px-4 text-center text-green-600 font-semibold">16.9%</td>
                      <td className="py-3 px-4 text-center">1350-1510</td>
                      <td className="py-3 px-4 text-center"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">Public</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-violet-600">30</td>
                      <td className="py-3 px-4 font-medium">Georgia Tech</td>
                      <td className="py-3 px-4 text-center text-green-600 font-semibold">16.0%</td>
                      <td className="py-3 px-4 text-center">1410-1540</td>
                      <td className="py-3 px-4 text-center"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">Public</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-violet-600">31-35</td>
                      <td className="py-3 px-4 font-medium text-gray-600">Wake Forest, Tufts, Boston College, UF, UCSD</td>
                      <td className="py-3 px-4 text-center text-green-600 font-semibold">15-25%</td>
                      <td className="py-3 px-4 text-center">1350-1520</td>
                      <td className="py-3 px-4 text-center"><span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">Mixed</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-violet-600">36-40</td>
                      <td className="py-3 px-4 font-medium text-gray-600">Rochester, Case Western, UT Austin, UC Davis, UC Irvine</td>
                      <td className="py-3 px-4 text-center text-green-600 font-semibold">20-30%</td>
                      <td className="py-3 px-4 text-center">1320-1500</td>
                      <td className="py-3 px-4 text-center"><span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">Mixed</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-violet-600">41-50</td>
                      <td className="py-3 px-4 font-medium text-gray-600">Brandeis, Wisconsin, Illinois, Ohio State, Purdue, others</td>
                      <td className="py-3 px-4 text-center text-green-600 font-semibold">25-55%</td>
                      <td className="py-3 px-4 text-center">1300-1480</td>
                      <td className="py-3 px-4 text-center"><span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">Mixed</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-gray-50 text-xs text-gray-500">
                Sources: US News & World Report 2026 Rankings, Common Data Set 2025-2026
              </div>
            </div>
          </section>

          {/* Section 4: Early Decision */}
          <section id="early-decision" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Early Decision vs Regular Decision
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Early Decision (ED) and Early Action (EA) applicants often see significantly higher acceptance rates. Here's the data on how much ED can boost your chances.
            </p>

            {/* ED Advantage Chart */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Early Decision Advantage</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-gray-700">Cornell</div>
                  <div className="flex-1 flex gap-2">
                    <div className="bg-green-500 h-8 rounded-l-full flex items-center px-3" style={{ width: '55%' }}>
                      <span className="text-white text-xs font-bold">ED: 22.6%</span>
                    </div>
                    <div className="bg-red-500 h-8 rounded-r-full flex items-center px-3" style={{ width: '20%' }}>
                      <span className="text-white text-xs font-bold">RD: 5.8%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-gray-700">Duke</div>
                  <div className="flex-1 flex gap-2">
                    <div className="bg-green-500 h-8 rounded-l-full flex items-center px-3" style={{ width: '45%' }}>
                      <span className="text-white text-xs font-bold">ED: 16.5%</span>
                    </div>
                    <div className="bg-red-500 h-8 rounded-r-full flex items-center px-3" style={{ width: '18%' }}>
                      <span className="text-white text-xs font-bold">RD: 4.3%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-gray-700">Northwestern</div>
                  <div className="flex-1 flex gap-2">
                    <div className="bg-green-500 h-8 rounded-l-full flex items-center px-3" style={{ width: '50%' }}>
                      <span className="text-white text-xs font-bold">ED: 20.8%</span>
                    </div>
                    <div className="bg-red-500 h-8 rounded-r-full flex items-center px-3" style={{ width: '15%' }}>
                      <span className="text-white text-xs font-bold">RD: 3.9%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-gray-700">Dartmouth</div>
                  <div className="flex-1 flex gap-2">
                    <div className="bg-green-500 h-8 rounded-l-full flex items-center px-3" style={{ width: '48%' }}>
                      <span className="text-white text-xs font-bold">ED: 18.5%</span>
                    </div>
                    <div className="bg-red-500 h-8 rounded-r-full flex items-center px-3" style={{ width: '15%' }}>
                      <span className="text-white text-xs font-bold">RD: 3.4%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-gray-700">Brown</div>
                  <div className="flex-1 flex gap-2">
                    <div className="bg-green-500 h-8 rounded-l-full flex items-center px-3" style={{ width: '40%' }}>
                      <span className="text-white text-xs font-bold">ED: 14.0%</span>
                    </div>
                    <div className="bg-red-500 h-8 rounded-r-full flex items-center px-3" style={{ width: '13%' }}>
                      <span className="text-white text-xs font-bold">RD: 3.4%</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-6">Note: ED is binding - you must attend if accepted. Green = ED rate, Red = RD rate</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Early Decision Benefits
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>1.5x to 4x higher acceptance rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Shows demonstrated interest</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Decision by mid-December</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Reduces application stress</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                <h4 className="font-bold text-amber-700 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  ED Considerations
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Binding commitment (must attend)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Can't compare financial aid offers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Only apply if it's your top choice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Withdraw all other apps if accepted</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* REA Note */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Restrictive Early Action (REA)
              </h4>
              <p className="text-gray-700">
                Harvard, Yale, Princeton, and Stanford offer REA instead of ED. REA is <strong>non-binding</strong> but restricts other early applications. Acceptance rates for REA are typically 10-15% - higher than regular decision but without the binding commitment.
              </p>
            </div>
          </section>

          {/* Section 5: Public Universities */}
          <section id="public-universities" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-cyan-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Top Public Universities Acceptance Rates
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Public flagship universities offer excellent education at lower costs, especially for in-state students. However, many have become highly competitive.
            </p>

            {/* Public Universities Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                    <tr>
                      <th className="py-4 px-4 text-left font-semibold">University</th>
                      <th className="py-4 px-4 text-center font-semibold">Overall Rate</th>
                      <th className="py-4 px-4 text-center font-semibold">In-State Cost</th>
                      <th className="py-4 px-4 text-center font-semibold">Out-of-State Cost</th>
                      <th className="py-4 px-4 text-center font-semibold">SAT Range</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">UCLA</td>
                      <td className="py-3 px-4 text-center text-amber-600 font-semibold">8.6%</td>
                      <td className="py-3 px-4 text-center text-green-600">$35,584</td>
                      <td className="py-3 px-4 text-center">$68,474</td>
                      <td className="py-3 px-4 text-center">1400-1530</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">UC Berkeley</td>
                      <td className="py-3 px-4 text-center text-amber-600 font-semibold">11.4%</td>
                      <td className="py-3 px-4 text-center text-green-600">$48,465</td>
                      <td className="py-3 px-4 text-center">$83,199</td>
                      <td className="py-3 px-4 text-center">1400-1540</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">UVA</td>
                      <td className="py-3 px-4 text-center text-green-600 font-semibold">18.6%</td>
                      <td className="py-3 px-4 text-center text-green-600">$36,018</td>
                      <td className="py-3 px-4 text-center">$72,870</td>
                      <td className="py-3 px-4 text-center">1390-1520</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">University of Michigan</td>
                      <td className="py-3 px-4 text-center text-green-600 font-semibold">17.7%</td>
                      <td className="py-3 px-4 text-center text-green-600">$33,288</td>
                      <td className="py-3 px-4 text-center">$73,938</td>
                      <td className="py-3 px-4 text-center">1380-1540</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">UNC Chapel Hill</td>
                      <td className="py-3 px-4 text-center text-green-600 font-semibold">16.9%</td>
                      <td className="py-3 px-4 text-center text-green-600">$24,894</td>
                      <td className="py-3 px-4 text-center">$57,642</td>
                      <td className="py-3 px-4 text-center">1350-1510</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">Georgia Tech</td>
                      <td className="py-3 px-4 text-center text-green-600 font-semibold">16.0%</td>
                      <td className="py-3 px-4 text-center text-green-600">$29,832</td>
                      <td className="py-3 px-4 text-center">$52,166</td>
                      <td className="py-3 px-4 text-center">1410-1540</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">UT Austin</td>
                      <td className="py-3 px-4 text-center text-green-600 font-semibold">29.0%</td>
                      <td className="py-3 px-4 text-center text-green-600">$29,890</td>
                      <td className="py-3 px-4 text-center">$61,634</td>
                      <td className="py-3 px-4 text-center">1300-1480</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">U of Florida</td>
                      <td className="py-3 px-4 text-center text-green-600 font-semibold">23.4%</td>
                      <td className="py-3 px-4 text-center text-green-600">$22,276</td>
                      <td className="py-3 px-4 text-center">$43,858</td>
                      <td className="py-3 px-4 text-center">1350-1510</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">U of Wisconsin</td>
                      <td className="py-3 px-4 text-center text-blue-600 font-semibold">49.2%</td>
                      <td className="py-3 px-4 text-center text-green-600">$26,660</td>
                      <td className="py-3 px-4 text-center">$58,618</td>
                      <td className="py-3 px-4 text-center">1330-1480</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">Ohio State</td>
                      <td className="py-3 px-4 text-center text-blue-600 font-semibold">53.0%</td>
                      <td className="py-3 px-4 text-center text-green-600">$27,192</td>
                      <td className="py-3 px-4 text-center">$52,476</td>
                      <td className="py-3 px-4 text-center">1290-1450</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-gray-50 text-xs text-gray-500">
                Sources: Common Data Set 2025-2026, College Navigator. Costs include tuition, fees, room & board.
              </div>
            </div>

            {/* UC System Note */}
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">UC System: Now More Selective Than Most Ivies</h3>
              <p className="text-amber-100 text-lg">
                UCLA (8.6%) and UC Berkeley (11.4%) are now <strong>harder to get into than several Ivy League schools</strong> for out-of-state and international students. The UC system received over 200,000 applications for Fall 2026.
              </p>
              <p className="text-xs mt-4 opacity-75">Source: UC Office of the President, 2026</p>
            </div>
          </section>

          {/* Section 6: Costs & Financial Aid */}
          <section id="costs" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Tuition Costs & Financial Aid
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The sticker price shouldn't discourage you - many top schools meet 100% of demonstrated financial need. Here's what you need to know about costs and aid.
            </p>

            {/* Cost Breakdown */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl p-6 text-white">
                <h4 className="text-lg font-bold mb-4">Average Sticker Price (2026)</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Top Private Universities</span>
                    <span className="font-bold">$90,000+/yr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Public (In-State)</span>
                    <span className="font-bold">$25,000-35,000/yr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Public (Out-of-State)</span>
                    <span className="font-bold">$50,000-75,000/yr</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
                <h4 className="text-lg font-bold mb-4">Actual Cost After Aid</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Income under $75K</span>
                    <span className="font-bold">$0-5,000/yr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Income $75K-150K</span>
                    <span className="font-bold">$5,000-25,000/yr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Income over $200K</span>
                    <span className="font-bold">Full price</span>
                  </div>
                </div>
                <p className="text-xs mt-3 opacity-80">*At top schools with generous aid</p>
              </div>
            </div>

            {/* No-Loan Schools */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Schools with No-Loan Financial Aid Policies</h3>
              <p className="text-gray-700 mb-4">These schools meet 100% of demonstrated need with grants and scholarships only - no loans required:</p>
              <div className="grid md:grid-cols-4 gap-3">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="font-semibold text-blue-700">Harvard</p>
                  <p className="text-xs text-gray-600">{`<$85K = free`}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="font-semibold text-blue-700">Yale</p>
                  <p className="text-xs text-gray-600">{`<$75K = free`}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="font-semibold text-blue-700">Princeton</p>
                  <p className="text-xs text-gray-600">{`<$100K = free`}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="font-semibold text-blue-700">Stanford</p>
                  <p className="text-xs text-gray-600">{`<$100K = free`}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="font-semibold text-blue-700">MIT</p>
                  <p className="text-xs text-gray-600">{`<$75K = free`}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="font-semibold text-blue-700">Duke</p>
                  <p className="text-xs text-gray-600">100% need met</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="font-semibold text-blue-700">Brown</p>
                  <p className="text-xs text-gray-600">100% need met</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="font-semibold text-blue-700">Rice</p>
                  <p className="text-xs text-gray-600">{`<$75K = free`}</p>
                </div>
              </div>
            </div>

            {/* Advice Box */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
              <h4 className="font-bold text-emerald-700 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Financial Aid Advice
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Don't rule out expensive schools</strong> - they often have the most generous aid</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Use Net Price Calculators</strong> on each school's website for estimates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><strong>File FAFSA early</strong> - opens October 1st, some aid is first-come</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Apply to schools with strong aid</strong> even if sticker price seems high</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Historical Trends */}
          <section className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Historical Acceptance Rate Trends
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Acceptance rates have declined dramatically over the past two decades. Here's how competitive admissions have become.
            </p>

            {/* Historical Data */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Harvard Acceptance Rate Over Time</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium text-gray-600">2000</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-400 to-green-500 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '55%' }}>
                      <span className="text-white text-xs font-bold">10.9%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium text-gray-600">2010</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '35%' }}>
                      <span className="text-white text-xs font-bold">6.9%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium text-gray-600">2020</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '25%' }}>
                      <span className="text-white text-xs font-bold">4.9%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium text-gray-600">2026</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full flex items-center justify-end pr-3" style={{ width: '18%' }}>
                      <span className="text-white text-xs font-bold">3.6%</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">Harvard's acceptance rate has dropped 67% since 2000</p>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Why Are Rates Dropping?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Increased Applications</h4>
                  <ul className="text-sm text-purple-100 space-y-1">
                    <li>• Common App made applying easier</li>
                    <li>• More international applicants</li>
                    <li>• Test-optional policies increased volume</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Limited Seats</h4>
                  <ul className="text-sm text-purple-100 space-y-1">
                    <li>• Class sizes haven't grown much</li>
                    <li>• Legacy, athlete, donor preferences</li>
                    <li>• More qualified applicants competing</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Sources */}
          <section className="mb-16">
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Sources & References</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Official Data Sources</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><a href="https://www.usnews.com/best-colleges" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">US News & World Report - College Rankings 2026</a></li>
                    <li><a href="https://nces.ed.gov/collegenavigator/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">NCES College Navigator</a></li>
                    <li><a href="https://www.commonapp.org" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Common Application Data</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">University Admissions Offices</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><a href="https://college.harvard.edu/admissions" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Harvard Admissions Statistics</a></li>
                    <li><a href="https://admission.stanford.edu" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Stanford Admissions Data</a></li>
                    <li><a href="https://mitadmissions.org" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">MIT Admissions Statistics</a></li>
                    <li>Common Data Set Reports 2025-2026</li>
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
            <Target className="w-16 h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prepare for College Admissions Success
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              Use our free tools and resources to boost your test scores, improve your essays, and plan your college journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/study-resources">
                <Button className="bg-[#FFC857] hover:bg-[#FFC857]/90 text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                  Study Resources
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/cost-of-education-by-country">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl transition-all duration-200">
                  Education Costs by Country
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
