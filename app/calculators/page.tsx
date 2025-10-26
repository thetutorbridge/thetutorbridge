import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, TrendingUp, Home, ArrowRight, CreditCard, Car, Building2, PiggyBank, Baby, Wallet, Landmark } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Financial Calculators - SIP, EMI, Loan & Investment Calculator',
  description: 'Free online financial calculators for students and professionals. Calculate SIP returns, loan EMI, investment growth, and plan your financial future with The Tutor Bridge.',
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
              Financial Calculators
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Plan your financial future with our free online calculators. Whether you're a student planning for your education, a professional managing investments, or someone looking to understand financial growth, we've got you covered.
          </p>
          <div className="bg-white/10 p-4 rounded-xl mb-8">
            <p className="text-lg italic">
              Smart financial planning starts with understanding your numbers.<br />
              <strong>Calculate, Plan, and Achieve Your Financial Goals</strong>
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
              <h2 className="text-2xl font-bold mb-6">Why Use Our Financial Calculators?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-[#FFC857] mb-2">🎯 Accurate Calculations</h3>
                  <p className="text-white/90">Get precise calculations based on proven financial formulas and monthly compounding.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#FFC857] mb-2">⚡ Instant Results</h3>
                  <p className="text-white/90">See your investment projections immediately without any waiting time.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#FFC857] mb-2">📱 Mobile Friendly</h3>
                  <p className="text-white/90">Use our calculators on any device - desktop, tablet, or smartphone.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#FFC857] mb-2">📊 Visual Insights</h3>
                  <p className="text-white/90">Understand your investments with clear breakdowns and visual representations.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Help with Financial Planning?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Our expert mentors can help you understand investments, plan your financial goals, and make informed decisions about your future.
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
