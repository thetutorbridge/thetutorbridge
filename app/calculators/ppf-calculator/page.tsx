'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Home, Lightbulb, CheckCircle, HelpCircle, Target, BarChart3, PieChart, DollarSign, Percent, Landmark, IndianRupee } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PPFCalculatorPage() {
  // Calculator state
  const [yearlyInvestment, setYearlyInvestment] = useState<number>(10000);
  const [timePeriod, setTimePeriod] = useState<number>(15);
  const [interestRate, setInterestRate] = useState<number>(7.1);

  // Calculate PPF maturity
  const calculatePPF = () => {
    const P = yearlyInvestment;
    const n = timePeriod;
    const r = interestRate / 100;

    // Future Value of Annuity formula: FV = P × [((1 + r)^n - 1) / r]
    // For PPF with yearly compounding
    let maturityValue = 0;

    for (let i = 0; i < n; i++) {
      maturityValue = (maturityValue + P) * (1 + r);
    }

    const investedAmount = P * n;
    const totalInterest = Math.round(maturityValue - investedAmount);

    return {
      investedAmount: investedAmount,
      totalInterest: totalInterest,
      maturityValue: Math.round(maturityValue),
    };
  };

  const results = calculatePPF();

  // Format currency
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

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
            <Link href="/calculators" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center whitespace-nowrap">
              <Calculator className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Calculators</span>
              <span className="sm:hidden">Calc</span>
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 truncate">
              <span className="hidden sm:inline">PPF Calculator</span>
              <span className="sm:hidden">PPF</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Landmark className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              PPF Calculator India 2025 — Public Provident Fund Calculator
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Calculate your PPF maturity amount with our free Public Provident Fund calculator. Plan your tax-saving investments with current interest rate of 7.1% and maximize your returns with India's most trusted savings scheme.
          </p>
          <div className="bg-white/10 p-3 md:p-4 rounded-xl mb-8">
            <p className="text-lg italic">
              Guaranteed returns + Tax benefits + Long-term wealth!<br />
              <strong>Start planning your PPF investments today!</strong>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/calculators">
              <Button size="lg" variant="outline" className="border-2 border-white text-white rounded-xl px-8 py-4 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Calculators
              </Button>
            </Link>
            <Link href="/book-demo-class">
              <Button size="lg" className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-4 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold">
                Book Free Session
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">

          {/* PPF Calculator Tool */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">

                {/* Left: Calculator Inputs */}
                <div className="p-4 md:p-8 lg:p-10 bg-white">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 md:mb-8 flex items-center">
                    <Calculator className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                    Calculate Your PPF Maturity
                  </h2>

                  {/* Yearly Investment */}
                  <div className="mb-6 md:mb-8">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <Label htmlFor="yearly-investment" className="text-sm md:text-base lg:text-lg font-semibold text-gray-700 flex-shrink-0">
                        Yearly Investment
                      </Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <span className="text-xs md:text-sm text-gray-500">₹</span>
                        <Input
                          id="yearly-investment"
                          type="number"
                          value={yearlyInvestment}
                          onChange={(e) => setYearlyInvestment(Number(e.target.value))}
                          className="w-24 md:w-32 lg:w-40 text-right font-bold text-sm md:text-base lg:text-lg border-2 border-[#2BAE66]"
                          min="500"
                          max="150000"
                        />
                      </div>
                    </div>
                    <Slider
                      value={[yearlyInvestment]}
                      onValueChange={(value) => setYearlyInvestment(value[0])}
                      min={500}
                      max={150000}
                      step={500}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹500</span>
                      <span>₹1.5 Lakh</span>
                    </div>
                  </div>

                  {/* Time Period */}
                  <div className="mb-6 md:mb-8">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <Label htmlFor="time-period" className="text-sm md:text-base lg:text-lg font-semibold text-gray-700 flex-shrink-0">
                        Time Period (Years)
                      </Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Input
                          id="time-period"
                          type="number"
                          value={timePeriod}
                          onChange={(e) => setTimePeriod(Number(e.target.value))}
                          className="w-16 md:w-20 lg:w-24 text-right font-bold text-sm md:text-base lg:text-lg border-2 border-[#2BAE66]"
                          min="15"
                          max="50"
                        />
                        <span className="text-xs md:text-sm text-gray-500">Yr</span>
                      </div>
                    </div>
                    <Slider
                      value={[timePeriod]}
                      onValueChange={(value) => setTimePeriod(value[0])}
                      min={15}
                      max={50}
                      step={1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>15 Yr</span>
                      <span>50 Yr</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div className="mb-6 md:mb-8">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <Label htmlFor="interest-rate" className="text-sm md:text-base lg:text-lg font-semibold text-gray-700 flex-shrink-0">
                        Rate of Interest
                      </Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Input
                          id="interest-rate"
                          type="number"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="w-16 md:w-20 lg:w-24 text-right font-bold text-sm md:text-base lg:text-lg border-2 border-[#2BAE66]"
                          min="7"
                          max="9"
                          step="0.1"
                        />
                        <span className="text-xs md:text-sm text-gray-500">%</span>
                      </div>
                    </div>
                    <Slider
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      min={7}
                      max={9}
                      step={0.1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>7%</span>
                      <span>9%</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                      <strong className="text-[#1A3D7C]">Note:</strong> Current PPF interest rate is 7.1% p.a. (Q4 2024-25). Minimum deposit: ₹500/year, Maximum: ₹1.5 lakh/year. Lock-in period: 15 years. Fully exempt under EEE (Exempt-Exempt-Exempt) tax status.
                    </p>
                  </div>
                </div>

                {/* Right: Results */}
                <div className="p-4 md:p-8 lg:p-10 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 flex items-center">
                    <BarChart3 className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#FFC857]" />
                    Your PPF Summary
                  </h2>

                  {/* Results Cards */}
                  <div className="space-y-4 md:space-y-6">

                    {/* Maturity Value */}
                    <div className="bg-[#FFC857] p-4 md:p-6 rounded-xl shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#1A3D7C] text-xs md:text-sm font-medium">Maturity Value</span>
                        <IndianRupee className="w-4 h-4 md:w-5 md:h-5 text-[#1A3D7C]" />
                      </div>
                      <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A3D7C] break-words">
                        {formatCurrency(results.maturityValue)}
                      </p>
                      <p className="text-xs text-[#1A3D7C]/70 mt-2">
                        Amount you'll receive after {timePeriod} years
                      </p>
                    </div>

                    {/* Invested Amount */}
                    <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 text-xs md:text-sm font-medium">Invested Amount</span>
                        <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-[#FFC857]" />
                      </div>
                      <p className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-white">
                        {formatCurrency(results.investedAmount)}
                      </p>
                      <p className="text-xs text-white/60 mt-2">
                        Total contributions over {timePeriod} years
                      </p>
                    </div>

                    {/* Total Interest */}
                    <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 text-xs md:text-sm font-medium">Total Interest</span>
                        <Percent className="w-4 h-4 md:w-5 md:h-5 text-[#FFC857]" />
                      </div>
                      <p className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#FFC857]">
                        {formatCurrency(results.totalInterest)}
                      </p>
                      <p className="text-xs text-white/60 mt-2">
                        Interest earned at {interestRate}% p.a.
                      </p>
                    </div>

                  </div>

                  {/* Breakdown */}
                  <div className="mt-6 md:mt-8 pt-6 border-t border-white/20">
                    <h3 className="text-base md:text-lg font-semibold mb-4 text-white">Investment Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-xs md:text-sm">Annual Deposit:</span>
                        <span className="text-white font-bold text-sm md:text-base">{formatCurrency(yearlyInvestment)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-xs md:text-sm">Interest Earned:</span>
                        <span className="text-[#FFC857] font-bold text-sm md:text-base">
                          {((results.totalInterest / results.investedAmount) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-xs md:text-sm">Growth Multiple:</span>
                        <span className="text-white font-bold text-sm md:text-base">
                          {(results.maturityValue / results.investedAmount).toFixed(2)}x
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Introduction Content */}
          <section className="mb-12">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The <strong>Public Provident Fund (PPF)</strong> is one of India's most popular long-term savings schemes backed by the Government of India. With guaranteed returns, complete tax exemption, and the safety of sovereign backing, PPF is the ideal investment for building a secure financial future.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our <strong>PPF Calculator</strong> helps you instantly calculate your maturity amount based on your yearly investment, tenure, and the current interest rate. Whether you're a student planning for higher education, a professional saving for retirement, or a parent securing your child's future—PPF offers the perfect combination of safety and returns.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                With the current interest rate of <strong>7.1% per annum</strong> (compounded annually), tax-free returns under <strong>EEE status</strong>, and flexible deposit options (₹500 to ₹1.5 lakh per year), PPF remains one of the best tax-saving investment options in India under Section 80C.
              </p>
            </div>
          </section>

          {/* What is PPF */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              What is PPF (Public Provident Fund)?
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Public Provident Fund (PPF)</strong> is a government-backed savings scheme that offers guaranteed returns with complete tax benefits. It was introduced in 1968 to mobilize small savings and provide retirement income to self-employed individuals and workers in the unorganized sector.
              </p>

              <h3 className="text-xl font-semibold text-[#1A3D7C] mt-6 mb-4">Key Features of PPF:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Lock-in Period:</strong> 15 years (can be extended in blocks of 5 years)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Minimum Deposit:</strong> ₹500 per year (12 deposits allowed per year)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Maximum Deposit:</strong> ₹1.5 lakh per financial year</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Interest Rate:</strong> 7.1% p.a. (Q4 2024-25, revised quarterly by Govt)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Tax Benefit:</strong> EEE status - Deposit, Interest, and Maturity all tax-free</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Loan Facility:</strong> Available from 3rd to 6th year</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Partial Withdrawal:</strong> Allowed after 5 years (up to 50% of balance)</span>
                </li>
              </ul>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200 mt-6">
                <h4 className="text-lg font-semibold text-[#1A3D7C] mb-3">PPF Example:</h4>
                <p className="text-gray-700 mb-4">
                  If you invest <strong>₹1,00,000 per year</strong> for <strong>15 years</strong> at <strong>7.1% interest</strong>:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Invested Amount</p>
                    <p className="text-base md:text-lg font-bold text-[#1A3D7C]">₹15,00,000</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Total Interest</p>
                    <p className="text-base md:text-lg font-bold text-[#2BAE66]">₹11,76,571</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center col-span-2 md:col-span-1">
                    <p className="text-xs text-gray-600 mb-1">Maturity Value</p>
                    <p className="text-base md:text-lg font-bold text-[#1A3D7C]">₹26,76,571</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How PPF Calculator Works */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Target className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Benefits of Using PPF Calculator
            </h2>
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <p className="text-lg text-white/90 leading-relaxed mb-6">
                Planning your PPF investments? Our calculator helps you understand your returns and plan better:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Instant Calculations
                  </h3>
                  <p className="text-white/90">Get accurate maturity amount, interest earned, and returns within seconds for any investment amount.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Goal Planning
                  </h3>
                  <p className="text-white/90">Plan for retirement, child's education, or wealth creation by adjusting investment amounts and tenure.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Tax Planning
                  </h3>
                  <p className="text-white/90">Maximize Section 80C benefits by calculating optimal yearly deposits up to ₹1.5 lakh limit.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Compare Scenarios
                  </h3>
                  <p className="text-white/90">Test different investment amounts and tenures to find the best strategy for your financial goals.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Extension Planning
                  </h3>
                  <p className="text-white/90">Calculate returns if you extend PPF beyond 15 years to maximize long-term wealth creation.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Rate Updates
                  </h3>
                  <p className="text-white/90">Calculate with current and historical interest rates to understand how rate changes impact returns.</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-[#FFC857] text-[#1A3D7C] rounded-lg">
                <p className="font-semibold">
                  💡 Pro Tip: Deposit the maximum ₹1.5 lakh before 5th April each year to claim full tax deduction and maximize interest earnings from day one!
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <HelpCircle className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              PPF Calculator FAQs
            </h2>
            <div className="space-y-4">

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">1. What is the current PPF interest rate in 2025?</h3>
                <p className="text-gray-700">The current PPF interest rate is <strong>7.1% per annum</strong> (Q4 2024-25). The government revises PPF rates quarterly. Interest is compounded annually.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">2. What is the minimum and maximum deposit in PPF?</h3>
                <p className="text-gray-700"><strong>Minimum:</strong> ₹500 per year. <strong>Maximum:</strong> ₹1.5 lakh per financial year. You can make up to 12 deposits per year (monthly, quarterly, or lump sum).</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">3. Is PPF completely tax-free?</h3>
                <p className="text-gray-700">Yes! PPF has <strong>EEE (Exempt-Exempt-Exempt)</strong> status. Deposits qualify for deduction under Section 80C (up to ₹1.5L), interest earned is tax-free, and maturity amount is completely tax-free.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">4. Can I withdraw from PPF before 15 years?</h3>
                <p className="text-gray-700">Partial withdrawal is allowed <strong>from the 7th year onwards</strong> (up to 50% of balance at end of 4th year). Premature closure allowed only in specific cases like medical emergency or higher education.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">5. Where can I open a PPF account?</h3>
                <p className="text-gray-700">You can open PPF account at: <strong>Post Offices</strong> (all branches), <strong>Public Sector Banks</strong> (SBI, PNB, etc.), <strong>Private Banks</strong> (ICICI, HDFC, Axis - selected branches), and <strong>Online</strong> (through bank's net banking).</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">6. Can I have multiple PPF accounts?</h3>
                <p className="text-gray-700">No, an individual can have <strong>only ONE PPF account</strong> in their name. However, you can open a PPF account for your minor child (in addition to your own account).</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">7. What happens after 15 years maturity?</h3>
                <p className="text-gray-700">After 15 years: (1) <strong>Withdraw fully</strong> with all interest, (2) <strong>Extend without deposits</strong> - continue earning interest, or (3) <strong>Extend with deposits</strong> - keep contributing for another 5 years (blocks of 5 years).</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">8. Can students open PPF accounts?</h3>
                <p className="text-gray-700">Yes! Any Indian resident can open PPF account, including students. Parents can also open PPF for <strong>minor children</strong>. It's an excellent way to build long-term savings and learn about investments.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">9. Is PPF better than FD or other investments?</h3>
                <p className="text-gray-700">PPF offers: <strong>Higher post-tax returns</strong> than FD (interest taxable in FD), <strong>Government guarantee</strong>, <strong>Complete tax exemption</strong>, and <strong>Lock-in discipline</strong>. Best for long-term, safe, tax-free wealth creation.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">10. What if I don't deposit minimum ₹500 in a year?</h3>
                <p className="text-gray-700">If minimum ₹500 is not deposited, the account becomes <strong>inactive</strong>. You need to pay ₹50 penalty per year + deposit ₹500 to reactivate. No interest earned during inactive period.</p>
              </div>

            </div>
          </section>

          {/* Tips Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Smart Tips for PPF Investors
            </h2>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-200">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Deposit early in the year:</strong> Interest is calculated on the lowest balance between 5th and end of month. Depositing by 5th April maximizes interest for the whole year.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Invest maximum ₹1.5 lakh:</strong> Maximizes tax saving under 80C and compound interest benefits. Even if you can't invest full amount initially, increase gradually.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Start early, stay consistent:</strong> PPF rewards long-term discipline. Starting at 25 vs 35 can mean lakhs more at retirement due to power of compounding.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Consider extension after 15 years:</strong> If you don't need money, extending PPF keeps earning tax-free interest—better than moving to taxable FDs.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Open for your child:</strong> Parents can open PPF for minor children. Great way to build corpus for their higher education or marriage.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Track interest rate changes:</strong> Government revises PPF rates quarterly. Higher rates mean better returns, but PPF remains stable compared to market investments.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>For students:</strong> Start PPF early! Even ₹500/month habit builds to ₹10+ lakhs by the time you're 30, completely tax-free and risk-free.</p>
                </li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Help Planning Your PPF Investment?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Our expert mentors can guide you through PPF planning, tax-saving strategies, and building long-term wealth. Whether you're a student starting your investment journey or planning for retirement—we're here to help!
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
