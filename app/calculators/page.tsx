import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, TrendingUp, Home, ArrowRight, CreditCard, Car, Building2, PiggyBank, Baby, Wallet, Landmark, Percent, BarChart3, ArrowUpCircle, FileText, Award, Calendar, Clock, Type, Divide, Ruler, Sparkles, RotateCw, Shuffle, History, Binary, GitMerge, Thermometer, Scale, DollarSign, Atom, Gauge, Receipt } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Free Online Calculators - Financial, Educational & Practical Tools',
  description: 'Free online calculators for students, professionals & everyone. Calculate age, work hours, convert numbers to words, mixed numbers & fractions, SIP returns, loan EMI, income tax, investment growth, and more with The TutorBridge.',
};

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto">
            <Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center whitespace-nowrap">
              <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 truncate">
              <span className="hidden sm:inline">Calculators</span>
              <span className="sm:hidden">Calc</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Calculator className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              Free Online Calculators
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Comprehensive collection of calculators for students, professionals, and everyone. From financial planning and investment calculations to age verification and educational tools - everything you need in one place.
          </p>
          <div className="bg-white/10 p-4 rounded-xl mb-8">
            <p className="text-lg italic">
              Smart planning starts with accurate calculations.<br />
              <strong>Calculate, Plan, and Achieve Your Goals</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12 px-6">
        <div className="container mx-auto max-w-5xl">

          {/* Available Calculators */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Available Calculators
            </h2>
            <div className="grid md:grid-cols-2 gap-6">

              {/* Square Footage Calculator Card */}
              <Link href="/calculators/square-footage-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Ruler className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Square Footage Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate area in sq ft, sq in, sq yd, sq m, and acres for any shape. Includes waste factor and material cost estimation for flooring, painting, roofing, and construction projects.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Multiple Shapes</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Cost Estimator</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Unit Converter</span>
                  </div>
                </div>
              </Link>

              {/* Feet and Inches Calculator Card */}
              <Link href="/calculators/feet-and-inches-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-700 to-red-700 text-white rounded-full flex items-center justify-center">
                      <Ruler className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Feet and Inches Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Add, subtract, multiply, or divide feet and inches with fractions and decimals. Perfect for construction, carpentry, and home improvement projects with step-by-step solutions.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Construction</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Fractions</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Carpentry</span>
                  </div>
                </div>
              </Link>

              {/* Tank Volume Calculator Card */}
              <Link href="/calculators/tank-volume-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 text-white rounded-full flex items-center justify-center">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Tank Volume Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate tank capacity and fill volume for all shapes including horizontal/vertical cylinders, rectangles, ovals, capsules, and elliptical tanks. Get results in gallons, liters, cubic feet, and cubic meters.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">All Tank Shapes</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Multiple Units</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Fill Calculator</span>
                  </div>
                </div>
              </Link>

              {/* Cubic Yards Calculator Card */}
              <Link href="/calculators/cubic-yards-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-700 to-orange-700 text-white rounded-full flex items-center justify-center">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Cubic Yards Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate cubic yards, cubic feet, and cubic meters for all shapes. Perfect for concrete, mulch, gravel, and soil with optional cost calculator. Supports rectangle, circle, triangle, and more.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">All Shapes</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Cost Calculator</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Construction</span>
                  </div>
                </div>
              </Link>

              {/* Work Hours Calculator Card */}
              <Link href="/calculators/work-hours-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Work Hours Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate total work hours, breaks, and overtime for the week. Track time with automatic regular/overtime separation, break deductions, and printable time cards for payroll.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Overtime Tracking</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Time Cards</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Payroll Ready</span>
                  </div>
                </div>
              </Link>

              {/* Basic Calculator Card */}
              <Link href="/calculators/basic-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Basic Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Free online calculator with scientific functions including memory, square root, percentage, and power operations. Perfect for students, homework, and everyday calculations.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Scientific Functions</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Memory Storage</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Free Tool</span>
                  </div>
                </div>
              </Link>

              {/* Age Calculator Card */}
              <Link href="/calculators/age-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Age Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate exact age or time interval between two dates. Get precise results in years, months, weeks, days, hours, minutes, and seconds - perfect for students and professionals.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Date Calculation</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Age Verification</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Educational Tool</span>
                  </div>
                </div>
              </Link>

              {/* Hours Calculator Card */}
              <Link href="/calculators/hours-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Hours Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate time difference between two times with break deductions. Perfect for work hours, shift calculations, and time tracking with results in hours:minutes, decimal, and total minutes.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Work Hours</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Time Tracking</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Payroll Helper</span>
                  </div>
                </div>
              </Link>

              {/* Time to Decimal Calculator Card */}
              <Link href="/calculators/time-to-decimal-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 text-white rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Time to Decimal Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Convert hours, minutes, and seconds to decimal hours, minutes, and seconds with step-by-step mathematical solutions. Perfect for payroll, billing, and time tracking applications.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Decimal Hours</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Step-by-Step</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Payroll Ready</span>
                  </div>
                </div>
              </Link>

              {/* Military Time Converter Card */}
              <Link href="/calculators/military-time-converter" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-700 to-red-700 text-white rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Military Time Converter</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Convert between 24-hour military time and 12-hour regular time with AM/PM. Perfect for understanding military, aviation, and international time formats with comprehensive conversion chart.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">24-Hour Clock</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Military Time</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Time Zones</span>
                  </div>
                </div>
              </Link>

              {/* Numbers to Words Converter Card */}
              <Link href="/calculators/numbers-to-words-converter" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Type className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Numbers to Words Converter</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Convert numbers to written words instantly. Perfect for writing checks, invoices, and legal documents. Supports currency format, check writing, and multiple letter cases.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Check Writing</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Currency Format</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Legal Docs</span>
                  </div>
                </div>
              </Link>

              {/* Roman Numeral Converter Card */}
              <Link href="/calculators/roman-numeral-converter" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <History className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Roman Numeral Converter</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Convert between numbers (1-3999) and Roman numerals instantly. Bi-directional converter with step-by-step explanations, symbol breakdowns, and comprehensive rules guide.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Bi-Directional</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Step-by-Step</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Historical</span>
                  </div>
                </div>
              </Link>

              {/* Mixed Numbers Calculator Card */}
              <Link href="/calculators/mixed-numbers-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Divide className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Mixed Numbers Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Add, subtract, multiply, and divide mixed numbers, fractions, and whole numbers with step-by-step solutions. Perfect for students learning fractions with detailed solving methods.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Fraction Math</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Step-by-Step</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Educational</span>
                  </div>
                </div>
              </Link>

              {/* Quadratic Formula Calculator Card */}
              <Link href="/calculators/quadratic-formula-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Quadratic Formula Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Solve quadratic equations (ax² + bx + c = 0) with step-by-step solutions. Get exact radical forms, decimal approximations, discriminant analysis, and complex roots. Perfect for algebra students.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Quadratic Solver</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Step-by-Step</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Complex Roots</span>
                  </div>
                </div>
              </Link>

              {/* Cube Root Calculator Card */}
              <Link href="/calculators/cube-root-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-700 to-red-700 text-white rounded-full flex items-center justify-center">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Cube Root Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate principal real cube root and all complex cube roots (∛x) with step-by-step solutions. Includes perfect cube checker and proper mathematical notation for algebra and calculus.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Real & Complex Roots</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Perfect Cubes</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">∛ Notation</span>
                  </div>
                </div>
              </Link>

              {/* Percentage Calculator Card */}
              <Link href="/calculators/percentage-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Percent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Percentage Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Free percentage calculator with 3 quick solutions. Calculate what is X% of Y, X is what % of Y, and X is Y% of what. Perfect for students, business, and everyday calculations with step-by-step solutions.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Quick Solutions</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">3 Calculators</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Step-by-Step</span>
                  </div>
                </div>
              </Link>

              {/* Percent Error Calculator Card */}
              <Link href="/calculators/percent-error-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 text-white rounded-full flex items-center justify-center">
                      <Percent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Percent Error Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate percentage error between experimental and theoretical values with step-by-step solutions. Perfect for chemistry labs, physics experiments, and scientific research. Includes absolute and relative error calculations.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Lab Reports</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Error Analysis</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Scientific</span>
                  </div>
                </div>
              </Link>

              {/* Margin Calculator Card */}
              <Link href="/calculators/margin-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Margin Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate profit margin, markup percentage, and profit with step-by-step solutions. Includes support for tax, VAT, and GST calculations. Perfect for business owners, retailers, and financial analysis.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Margin & Markup</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Tax Support</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Business Tool</span>
                  </div>
                </div>
              </Link>

              {/* Profit Margin Calculator Card */}
              <Link href="/calculators/profit-margin-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Profit Margin Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate net profit margin, net profit, and profit percentage from cost and revenue with step-by-step solutions. Simplified interface for quick business profitability analysis and financial planning.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Net Profit Margin</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Profitability</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Business Metrics</span>
                  </div>
                </div>
              </Link>

              {/* Percentage Increase Calculator Card */}
              <Link href="/calculators/percentage-increase-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Percent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Percentage Increase Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate percentage increase or decrease between two values with step-by-step solutions. Perfect for price changes, salary raises, growth rates, and business analysis with proper mathematical notation.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">% Change</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Growth Rate</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Math Steps</span>
                  </div>
                </div>
              </Link>

              {/* Percentage Change Calculator Card */}
              <Link href="/calculators/percentage-change-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Percentage Change Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate percentage change between any two values with detailed mathematical solutions. Understand increases, decreases, and growth rates with V₁ to V₂ notation. Perfect for statistics and data analysis.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">V₁ to V₂</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Statistical</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Detailed Steps</span>
                  </div>
                </div>
              </Link>

              {/* Fractions Calculator Card */}
              <Link href="/calculators/fractions-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Divide className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Fractions Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Add, subtract, multiply, and divide fractions with step-by-step solutions. Calculate LCD, simplify fractions, and convert to mixed numbers with proper mathematical notation. Perfect for students and educators.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">LCD Calculator</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Simplify Fractions</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Mixed Numbers</span>
                  </div>
                </div>
              </Link>

              {/* Simplifying Fractions Calculator Card */}
              <Link href="/calculators/simplifying-fractions-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Divide className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Simplifying Fractions Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Reduce fractions to simplest form with step-by-step GCF method. Shows all factors, common factors, and converts improper fractions to mixed numbers. Perfect for learning fraction simplification.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">GCF Method</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Lowest Terms</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Mixed Numbers</span>
                  </div>
                </div>
              </Link>

              {/* Decimal to Fraction Calculator Card */}
              <Link href="/calculators/decimal-to-fraction-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Divide className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Decimal to Fraction Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Convert decimals to fractions or mixed numbers with complete step-by-step solutions. Shows GCF reduction and simplification process. Perfect for students learning fraction conversion.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">GCF Reduction</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Mixed Numbers</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Step-by-Step</span>
                  </div>
                </div>
              </Link>

              {/* Fraction to Decimal Calculator Card */}
              <Link href="/calculators/fraction-to-decimal-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Divide className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Fraction to Decimal Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Convert any fraction to decimal with step-by-step solutions. Shows GCF reduction, long division explanation, and decimal precision selection (1-10 places). Perfect for learning decimal conversion.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">GCF Reduction</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Long Division</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Precision Control</span>
                  </div>
                </div>
              </Link>

              {/* Fraction to Percent Calculator Card */}
              <Link href="/calculators/fraction-to-percent-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Percent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Fraction to Percent Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Convert fractions to percentages with step-by-step solutions. Shows decimal conversion, multiplication by 100, and customizable rounding options. Perfect for students learning percentage conversion.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Decimal Conversion</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Rounding Options</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Step-by-Step</span>
                  </div>
                </div>
              </Link>

              {/* Rounding Numbers Calculator Card */}
              <Link href="/calculators/rounding-numbers-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <RotateCw className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Rounding Numbers Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Round any number to the nearest whole number, tenth, hundredth, or any decimal place. Get instant results with visual digit highlighting and step-by-step explanations of rounding rules.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Visual Highlighting</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Place Values</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Step-by-Step</span>
                  </div>
                </div>
              </Link>

              {/* Long Division Calculator Card */}
              <Link href="/calculators/long-division-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Divide className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Long Division Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Divide any numbers with complete step-by-step visual solution grid. See the entire working process including quotient, remainder, and verification formula. Perfect for students learning division.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Visual Grid</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Step-by-Step</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Quotient & Remainder</span>
                  </div>
                </div>
              </Link>

              {/* Modulo Calculator Card */}
              <Link href="/calculators/modulo-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Percent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Modulo Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate modulo operation (a mod b) with remainder division and verification. Get quotient, remainder, and complete proof with step-by-step solutions. Perfect for programming and number theory.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Mod Operation</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Verification Proof</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Number Theory</span>
                  </div>
                </div>
              </Link>

              {/* LCM Calculator Card */}
              <Link href="/calculators/lcm-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Binary className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">LCM Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Find the Least Common Multiple (LCM) of 2-10 numbers with three calculation methods. Shows prime factorization, listing multiples, and formula methods with complete step-by-step solutions.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">3 Methods</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Prime Factorization</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Multiple Numbers</span>
                  </div>
                </div>
              </Link>

              {/* Percentage Difference Calculator Card */}
              <Link href="/calculators/percentage-difference-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Percent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Percentage Difference Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate the symmetric percentage difference between two values with proper mathematical notation. Perfect for comparing measurements, data analysis, and scientific research with complete step-by-step solutions.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Symmetric Formula</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Step-by-Step</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Math Notation</span>
                  </div>
                </div>
              </Link>

              {/* Factoring Calculator Card */}
              <Link href="/calculators/factoring-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-700 to-red-700 text-white rounded-full flex items-center justify-center">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Factoring Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Find all factors and factor pairs of any number with step-by-step solutions. Shows complete factor list, divisibility testing, and multiplication pairs. Perfect for homework and learning number theory.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">All Factors</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Factor Pairs</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Divisibility</span>
                  </div>
                </div>
              </Link>

              {/* GCF Calculator Card */}
              <Link href="/calculators/gcf-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <GitMerge className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">GCF Calculator (HCF, GCD)</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Find the Greatest Common Factor (GCF, HCF, GCD) of 2-10 numbers with three methods. Shows prime factorization, listing factors, and Euclidean algorithm with complete step-by-step solutions.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">3 Methods</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Prime Factorization</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Simplify Fractions</span>
                  </div>
                </div>
              </Link>

              {/* Combinations Calculator Card */}
              <Link href="/calculators/combinations-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Shuffle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Combinations Calculator (nCr)</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate combinations (nCr) and permutations (nPr) with detailed step-by-step solutions. Perfect for probability, statistics, and combinatorics with complete mathematical notation.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">nCr & nPr</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Factorial Display</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Probability</span>
                  </div>
                </div>
              </Link>

              {/* Celsius to Fahrenheit Converter Card */}
              <Link href="/calculators/celsius-to-fahrenheit-converter" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Thermometer className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Celsius to Fahrenheit Converter</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Convert temperature between Celsius (°C) and Fahrenheit (°F) with bidirectional conversion. Shows conversion formulas and step-by-step solutions for accurate temperature conversion.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Converter</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Bidirectional</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">With Formula</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Step-by-Step</span>
                  </div>
                </div>
              </Link>

              {/* Slope Calculator Card */}
              <Link href="/calculators/slope-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Slope Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate slope between two points with interactive graph visualization. Shows slope formula, point-slope form, slope-intercept form, and intercepts with complete step-by-step solutions.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Graph Visualization</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">All Equation Forms</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Step-by-Step</span>
                  </div>
                </div>
              </Link>

              {/* Fahrenheit to Celsius Converter Card */}
              <Link href="/calculators/fahrenheit-to-celsius-converter" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Thermometer className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Fahrenheit to Celsius Converter</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Convert temperature between Fahrenheit (°F) and Celsius (°C) with bidirectional conversion. Shows conversion formulas and step-by-step solutions for accurate temperature conversion.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Converter</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Bidirectional</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">With Formula</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Step-by-Step</span>
                  </div>
                </div>
              </Link>

              {/* Ratio Calculator Card */}
              <Link href="/calculators/ratio-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Scale className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Ratio Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Solve and verify ratios A:B = C:D with cross multiplication. Check if ratios are equal, simplify ratios to lowest terms, and get complete step-by-step solutions.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Ratio Verification</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Simplify Ratios</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Step-by-Step</span>
                  </div>
                </div>
              </Link>

              {/* Money Calculator Card */}
              <Link href="/calculators/money-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Money Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Count and calculate total value of banknotes, coins, and rolled coins with detailed denomination breakdown. Perfect for cash management, retail, and bank deposits.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Cash Counter</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Denomination Breakdown</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Bills & Coins</span>
                  </div>
                </div>
              </Link>

              {/* Scientific Notation Converter Card */}
              <Link href="/calculators/scientific-notation-converter" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Atom className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Scientific Notation Converter</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Convert numbers between scientific notation, standard form, e-notation, and engineering notation. Get order of magnitude and word form with comprehensive explanations.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Scientific Notation</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">E-notation</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Engineering Form</span>
                  </div>
                </div>
              </Link>

              {/* Speed Distance Time Calculator Card */}
              <Link href="/calculators/speed-distance-time-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Gauge className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Speed Distance Time Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate speed, distance, or time using the formula speed = distance/time. Solve motion problems with multiple unit conversions and step-by-step solutions.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Speed Formula</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Unit Conversion</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Travel Time</span>
                  </div>
                </div>
              </Link>

              {/* Simple Interest Calculator Card */}
              <Link href="/calculators/simple-interest-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Receipt className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Simple Interest Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate simple interest, principal, rate, time, or total amount using the formula A = P(1 + rt). Get step-by-step solutions for interest calculations.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Interest Formula</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Financial Math</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Loan Interest</span>
                  </div>
                </div>
              </Link>

              {/* Mean Median Mode Calculator Card */}
              <Link href="/calculators/mean-mode-median-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Mean Median Mode Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate mean, median, mode, range, quartiles, and identify outliers with complete statistical analysis. Perfect for students learning descriptive statistics with instant results.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Mean & Average</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Quartiles & IQR</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Outlier Detection</span>
                  </div>
                </div>
              </Link>

              {/* Variance Calculator Card */}
              <Link href="/calculators/variance-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Variance Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate sample and population variance with standard deviation, mean, and sum of squares. Complete statistical analysis with step-by-step solutions and deviation breakdown.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Sample & Population</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Std Deviation</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Statistical Analysis</span>
                  </div>
                </div>
              </Link>

              {/* Standard Deviation Calculator Card */}
              <Link href="/calculators/standard-deviation-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-full flex items-center justify-center">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Standard Deviation Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate sample and population standard deviation with variance, mean, and sum of squares. Detailed step-by-step solutions with proper mathematical notation and deviation table.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Sample & Population</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Variance & SD</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Full Analysis</span>
                  </div>
                </div>
              </Link>

              {/* Quartile Calculator Card */}
              <Link href="/calculators/quartile-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-800 to-red-900 text-white rounded-full flex items-center justify-center">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Quartile Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate Q₁, Q₂, Q₃, IQR, median, min, max, and range with step-by-step solutions. Includes five-number summary and complete quartile statistics for data analysis.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Q₁ Q₂ Q₃</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">IQR Analysis</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Box Plot Data</span>
                  </div>
                </div>
              </Link>

              {/* Percentile Calculator Card */}
              <Link href="/calculators/percentile-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-700 to-red-800 text-white rounded-full flex items-center justify-center">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Percentile Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate any percentile (1st-99th) from datasets with step-by-step solutions. Display every nth percentile option for comprehensive statistical analysis and data ranking.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Any Percentile</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Every Nth</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">P₁-P₉₉</span>
                  </div>
                </div>
              </Link>

              {/* Random Number Generator Card */}
              <Link href="/calculators/random-number-generator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Shuffle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Random Number Generator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Generate random numbers with custom range, control duplicates, and sorting options. Perfect for games, lottery picks, passwords, and random selection with instant results.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Custom Range</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">No Duplicates</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Sort Options</span>
                  </div>
                </div>
              </Link>

              {/* SIP Calculator Card */}
              <Link href="/calculators/sip-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">SIP Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate your mutual fund returns through Systematic Investment Plans. Estimate maturity amount, total investment, and expected returns with monthly compounding.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Monthly Investment</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Returns Estimation</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Wealth Planning</span>
                  </div>
                </div>
              </Link>

              {/* SSY Calculator Card */}
              <Link href="/calculators/sukanya-samriddhi-yojana-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Baby className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Sukanya Samriddhi Yojana</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate SSY maturity amount for your daughter's future. Government scheme with 8.2% interest rate and complete tax benefits under Section 80C.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Girl Child Scheme</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Tax Free Returns</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">8.2% Interest</span>
                  </div>
                </div>
              </Link>

              {/* SWP Calculator Card */}
              <Link href="/calculators/swp-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Wallet className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">SWP Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate Systematic Withdrawal Plan from mutual funds. Plan regular monthly income from your corpus while investment continues to grow - perfect for retirement.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Regular Income</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Retirement Planning</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Tax Efficient</span>
                  </div>
                </div>
              </Link>

              {/* FD Calculator Card */}
              <Link href="/calculators/fd-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <PiggyBank className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">FD Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate fixed deposit returns and maturity amount with quarterly compounding. Plan your safe investments with guaranteed returns for bank and post office FDs.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Fixed Deposits</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Guaranteed Returns</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Safe Investment</span>
                  </div>
                </div>
              </Link>

              {/* PPF Calculator Card */}
              <Link href="/calculators/ppf-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Landmark className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">PPF Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate Public Provident Fund maturity with 7.1% interest. Government-backed scheme with EEE tax benefits, 15-year lock-in, and completely tax-free returns.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Tax Free</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">7.1% Interest</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Govt Backed</span>
                  </div>
                </div>
              </Link>

              {/* Step Up SIP Calculator Card */}
              <Link href="/calculators/step-up-sip-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <ArrowUpCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Step Up SIP Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate SIP returns with annual step-up increases. Boost your wealth creation by increasing your monthly SIP amount each year to match salary hikes.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Annual Increase</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Wealth Growth</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Smart Investing</span>
                  </div>
                </div>
              </Link>

              {/* Compound Interest Calculator Card */}
              <Link href="/calculators/compound-interest-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Compound Interest Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate compound interest on investments with multiple compounding frequencies. See how your money grows with yearly, half-yearly, quarterly, or monthly compounding.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Compounding</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Interest Growth</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Investment Planning</span>
                  </div>
                </div>
              </Link>

              {/* Stock Average Calculator Card */}
              <Link href="/calculators/stock-average-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Stock Average Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate your average purchase price across multiple stock transactions. Perfect for averaging down or tracking your portfolio cost basis for tax purposes.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Averaging Down</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Cost Tracking</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Portfolio Analysis</span>
                  </div>
                </div>
              </Link>

              {/* Simple Interest Calculator Card */}
              <Link href="/calculators/simple-interest-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Percent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Simple Interest Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate simple interest on loans, deposits, and investments. Quick and accurate SI calculations with instant results for financial planning.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Simple Interest</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Loan Calculator</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Deposit Planning</span>
                  </div>
                </div>
              </Link>

              {/* SBI SIP Calculator Card */}
              <Link href="/calculators/sbi-sip-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">SBI SIP Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Official SBI mutual fund SIP calculator. Calculate returns for SBI Bluechip, Small Cap, and other SBI MF schemes with accurate projections.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">SBI Funds</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Mutual Fund SIP</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Investment Planning</span>
                  </div>
                </div>
              </Link>

              {/* Income Tax Calculator Card */}
              <Link href="/calculators/income-tax-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Income Tax Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate income tax for FY 2025-26 under Old & New tax regime. Compare both regimes, HRA exemption, Section 80C/80D deductions for maximum savings.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Tax Planning</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Old vs New Regime</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">HRA Calculation</span>
                  </div>
                </div>
              </Link>

              {/* Lumpsum Calculator Card */}
              <Link href="/calculators/lumpsum-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <PiggyBank className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Lumpsum Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate returns on one-time investments. Estimate future value with compound interest, visualize wealth growth with interactive charts and projections.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">One-time Investment</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Compound Interest</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Wealth Growth</span>
                  </div>
                </div>
              </Link>

              {/* Gratuity Calculator Card */}
              <Link href="/calculators/gratuity-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Gratuity Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate gratuity amount as per Payment of Gratuity Act 1972. Instant calculation for employees with 5+ years service. Plan retirement corpus effectively.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Retirement Benefit</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Service Years</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Tax Exempt</span>
                  </div>
                </div>
              </Link>

              {/* Salary Calculator Card */}
              <Link href="/calculators/salary-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Wallet className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Salary Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate take-home salary from CTC with detailed breakdown. Factor in PF, professional tax, bonus, and deductions to know your actual in-hand salary.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">CTC Breakdown</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">In-hand Salary</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Job Comparison</span>
                  </div>
                </div>
              </Link>

              {/* EMI Calculator Card */}
              <Link href="/calculators/emi-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">EMI Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate monthly loan payments for home, car, personal, and education loans. Get instant EMI, interest, and total payment breakdowns in INR.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Loan EMI</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Interest Calculation</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Loan Planning</span>
                  </div>
                </div>
              </Link>

              {/* Personal Loan EMI Calculator Card */}
              <Link href="/calculators/personal-loan-emi-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Wallet className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Personal Loan EMI Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate monthly payments for unsecured personal loans. Perfect for medical emergencies, weddings, education, travel, or debt consolidation with instant approval.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Instant Approval</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Flexible Use</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Quick Disbursal</span>
                  </div>
                </div>
              </Link>

              {/* Car Loan EMI Calculator Card */}
              <Link href="/calculators/car-loan-emi-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Car className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Car Loan EMI Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate monthly payments for new and used car loans. Plan your dream car purchase with accurate EMI estimates and interest calculations.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Auto Loan</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Vehicle Finance</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Car EMI</span>
                  </div>
                </div>
              </Link>

              {/* Home Loan EMI Calculator Card */}
              <Link href="/calculators/home-loan-emi-calculator" className="block h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all hover:shadow-xl group h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] ml-4">Home Loan EMI Calculator</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Calculate mortgage payments for housing loans. Plan your dream home purchase with detailed EMI breakdowns and affordability estimates.
                  </p>
                  <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform mb-4">
                    <span>Use Calculator</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Housing Loan</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Mortgage EMI</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Home Finance</span>
                  </div>
                </div>
              </Link>

            </div>
          </section>

          {/* Why Use Our Calculators */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Why Use Our Calculators?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-[#FFC857] mb-2">🎯 Accurate Calculations</h3>
                  <p className="text-white/90">Get precise calculations based on proven formulas and industry standards for all your needs.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#FFC857] mb-2">⚡ Instant Results</h3>
                  <p className="text-white/90">See your results immediately without any waiting time - calculate as many times as you need.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#FFC857] mb-2">📱 Mobile Friendly</h3>
                  <p className="text-white/90">Use our calculators on any device - desktop, tablet, or smartphone with responsive design.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#FFC857] mb-2">🎓 Educational & Practical</h3>
                  <p className="text-white/90">Perfect for students, professionals, and everyone with comprehensive tools for learning and planning.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Academic or Career Guidance?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Our expert mentors can help you with academics, financial planning, career guidance, and make informed decisions about your future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book-demo-class">
                  <button className="bg-[#FFC857] text-[#1A3D7C] px-8 py-3 rounded-xl font-semibold hover:bg-[#FFC857]/90 transition-colors">
                    Book Free Session
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#1A3D7C] transition-colors">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A3D7C] text-white py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
                <span className="text-xl font-bold">The TutorBridge</span>
              </div>
              <p className="text-gray-300 mb-4">
                Empowering students with personalized education and career guidance for a brighter future.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/study-resources" className="hover:text-[#2BAE66] transition-colors">Study Resources</Link></li>
                <li><Link href="/calculators" className="hover:text-[#2BAE66] transition-colors">Calculators</Link></li>
                <li><Link href="/doubt-solving" className="hover:text-[#2BAE66] transition-colors">Doubt Solving</Link></li>
                <li><Link href="/career-guidance" className="hover:text-[#2BAE66] transition-colors">Career Guidance</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p>+91 9310096171</p>
                <p>info@thetutorbridge.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 The TutorBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
