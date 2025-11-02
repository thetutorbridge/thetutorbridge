'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Home, Lightbulb, CheckCircle, HelpCircle, Target, BarChart3, PieChart, DollarSign, BookOpen, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SIPCalculatorPage() {
  // Calculator state
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(10);

  // Calculate SIP returns
  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = timePeriod * 12;

    // SIP Formula: M = P × ((1 + i)^n - 1) / i × (1 + i)
    const maturityAmount = monthlyInvestment *
      (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

    const investedAmount = monthlyInvestment * months;
    const estimatedReturns = maturityAmount - investedAmount;

    return {
      investedAmount: Math.round(investedAmount),
      estimatedReturns: Math.round(estimatedReturns),
      totalValue: Math.round(maturityAmount),
    };
  };

  const results = calculateSIP();

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
              <span className="hidden sm:inline">SIP Calculator</span>
              <span className="sm:hidden">SIP</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <TrendingUp className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              SIP Calculator — Calculate Your Mutual Fund Returns in India
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Investing in mutual funds through a Systematic Investment Plan (SIP) is one of the most effective ways to grow your wealth steadily over time. Calculate your potential returns instantly with our free SIP calculator.
          </p>
          <div className="bg-white/10 p-4 rounded-xl mb-8">
            <p className="text-lg italic">
              Start small, dream big, and let compounding work its magic.<br />
              <strong>Plan your financial future with confidence today!</strong>
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

          {/* SIP Calculator Tool */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">

                {/* Left: Calculator Inputs */}
                <div className="p-4 md:p-8 lg:p-10 bg-white">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 md:mb-8 flex items-center">
                    <Calculator className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                    <span className="text-base md:text-2xl lg:text-3xl">Calculate Your SIP Returns</span>
                  </h2>

                  {/* Monthly Investment */}
                  <div className="mb-6 md:mb-8">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <Label htmlFor="monthly-investment" className="text-sm md:text-lg font-semibold text-gray-700 flex-shrink-0">
                        Monthly Investment
                      </Label>
                      <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                        <span className="text-xs md:text-sm text-gray-500">₹</span>
                        <Input
                          id="monthly-investment"
                          type="number"
                          value={monthlyInvestment}
                          onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                          className="w-20 md:w-32 text-right font-bold text-sm md:text-lg border-2 border-[#2BAE66]"
                          min="500"
                          max="1000000"
                        />
                      </div>
                    </div>
                    <Slider
                      value={[monthlyInvestment]}
                      onValueChange={(value) => setMonthlyInvestment(value[0])}
                      min={500}
                      max={100000}
                      step={500}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹500</span>
                      <span>₹1,00,000</span>
                    </div>
                  </div>

                  {/* Expected Return */}
                  <div className="mb-6 md:mb-8">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <Label htmlFor="expected-return" className="text-sm md:text-lg font-semibold text-gray-700 flex-shrink-0">
                        Expected Return (p.a.)
                      </Label>
                      <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                        <Input
                          id="expected-return"
                          type="number"
                          value={expectedReturn}
                          onChange={(e) => setExpectedReturn(Number(e.target.value))}
                          className="w-16 md:w-24 text-right font-bold text-sm md:text-lg border-2 border-[#2BAE66]"
                          min="1"
                          max="30"
                          step="0.1"
                        />
                        <span className="text-xs md:text-sm text-gray-500">%</span>
                      </div>
                    </div>
                    <Slider
                      value={[expectedReturn]}
                      onValueChange={(value) => setExpectedReturn(value[0])}
                      min={1}
                      max={30}
                      step={0.5}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1%</span>
                      <span>30%</span>
                    </div>
                  </div>

                  {/* Time Period */}
                  <div className="mb-6 md:mb-8">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <Label htmlFor="time-period" className="text-sm md:text-lg font-semibold text-gray-700 flex-shrink-0">
                        Time Period
                      </Label>
                      <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                        <Input
                          id="time-period"
                          type="number"
                          value={timePeriod}
                          onChange={(e) => setTimePeriod(Number(e.target.value))}
                          className="w-16 md:w-24 text-right font-bold text-sm md:text-lg border-2 border-[#2BAE66]"
                          min="1"
                          max="40"
                        />
                        <span className="text-xs md:text-sm text-gray-500">Yr</span>
                      </div>
                    </div>
                    <Slider
                      value={[timePeriod]}
                      onValueChange={(value) => setTimePeriod(value[0])}
                      min={1}
                      max={40}
                      step={1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 Yr</span>
                      <span>40 Yr</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <strong className="text-[#1A3D7C]">Note:</strong> Actual returns may vary based on market performance and fund selection. This calculator provides estimated returns based on the expected rate of return you enter.
                    </p>
                  </div>
                </div>

                {/* Right: Results */}
                <div className="p-4 md:p-8 lg:p-10 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 flex items-center">
                    <BarChart3 className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#FFC857]" />
                    <span className="text-base md:text-2xl lg:text-3xl">Your Investment Summary</span>
                  </h2>

                  {/* Results Cards */}
                  <div className="space-y-6">

                    {/* Invested Amount */}
                    <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 text-xs md:text-sm font-medium">Invested Amount</span>
                        <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-[#FFC857]" />
                      </div>
                      <p className="text-xl md:text-3xl lg:text-4xl font-bold text-white break-words">
                        {formatCurrency(results.investedAmount)}
                      </p>
                      <p className="text-xs text-white/60 mt-2">
                        Total contributions over {timePeriod} {timePeriod === 1 ? 'year' : 'years'}
                      </p>
                    </div>

                    {/* Estimated Returns */}
                    <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 text-xs md:text-sm font-medium">Estimated Returns</span>
                        <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-[#FFC857]" />
                      </div>
                      <p className="text-xl md:text-3xl lg:text-4xl font-bold text-[#FFC857] break-words">
                        {formatCurrency(results.estimatedReturns)}
                      </p>
                      <p className="text-xs text-white/60 mt-2">
                        Expected gains at {expectedReturn}% p.a.
                      </p>
                    </div>

                    {/* Total Value */}
                    <div className="bg-[#FFC857] p-4 md:p-6 rounded-xl shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#1A3D7C] text-xs md:text-sm font-medium">Total Value (Maturity)</span>
                        <PieChart className="w-4 h-4 md:w-5 md:h-5 text-[#1A3D7C]" />
                      </div>
                      <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#1A3D7C] break-words">
                        {formatCurrency(results.totalValue)}
                      </p>
                      <p className="text-xs text-[#1A3D7C]/70 mt-2">
                        Your wealth after {timePeriod} {timePeriod === 1 ? 'year' : 'years'}
                      </p>
                    </div>

                  </div>

                  {/* Investment Breakdown */}
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <h3 className="text-lg font-semibold mb-4 text-white">Investment Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm">Monthly Contribution:</span>
                        <span className="text-white font-bold">{formatCurrency(monthlyInvestment)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm">Total Months:</span>
                        <span className="text-white font-bold">{timePeriod * 12} months</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm">Returns Percentage:</span>
                        <span className="text-[#FFC857] font-bold">
                          {((results.estimatedReturns / results.investedAmount) * 100).toFixed(2)}%
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
                Investing in mutual funds through a <strong>Systematic Investment Plan (SIP)</strong> is one of the most effective ways to grow your wealth steadily over time. Unlike a lump-sum investment, SIPs allow you to invest a fixed amount at regular intervals, making it easier to build a disciplined investment habit while leveraging <em>rupee cost averaging</em>.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                With <strong>The Tutor Bridge SIP Calculator</strong>, you can estimate your mutual fund returns instantly. Simply enter your monthly investment, expected rate of return, and investment tenure, and our calculator will provide a clear picture of your estimated maturity amount, total invested amount, and potential gains.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you are a student, a working professional, or a first-time investor in India, this tool helps you plan your financial future with confidence. Start calculating your SIP returns now and make informed investment decisions in INR.
              </p>
            </div>
          </section>

          {/* What is a SIP Calculator */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-[#2BAE66]" />
              What is a SIP Calculator?
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                A <strong>SIP calculator</strong> is a simple online tool designed to help investors estimate returns from mutual fund investments made through systematic contributions. SIPs are not mutual funds themselves—they are a mode of investment. You can invest in equity, debt, or hybrid mutual funds via SIPs.
              </p>

              <h3 className="text-xl font-semibold text-[#1A3D7C] mt-6 mb-4">Why use a SIP calculator?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Get an estimate of your maturity amount</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Understand the total invested amount over time</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>See your expected returns based on realistic annual rates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Compare SIP vs. lump-sum investment outcomes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Plan monthly investments according to your financial goals</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-[#1A3D7C] mt-6 mb-4">How it works:</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The calculator considers three primary inputs:
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li><strong>Monthly Investment (P):</strong> Amount invested every month</li>
                <li><strong>Expected Annual Return (i):</strong> Projected percentage return per year</li>
                <li><strong>Investment Tenure (n):</strong> Total duration of your investment in years or months</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-6">
                The calculator applies monthly compounding to provide an accurate estimate of returns.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-lg font-semibold text-[#1A3D7C] mb-3">Example Calculation:</h4>
                <p className="text-gray-700 mb-4">
                  Invest <strong>₹1,000 per month</strong> for <strong>12 months</strong> at <strong>12% annual return</strong>.
                </p>
                <div className="bg-white p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 mb-2">Using the formula:</p>
                  <p className="text-sm font-mono text-gray-700 mb-2">
                    M = P × [(1 + i)^n - 1] / i × (1 + i)
                  </p>
                  <p className="text-xs text-gray-600">Where:</p>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4">
                    <li>P = ₹1,000</li>
                    <li>i = (1 + 0.12)^(1/12) - 1 ≈ 0.0095 (0.95% per month)</li>
                    <li>n = 12 months</li>
                  </ul>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Maturity Amount</p>
                    <p className="text-lg font-bold text-[#1A3D7C]">₹12,766</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Invested Amount</p>
                    <p className="text-lg font-bold text-[#1A3D7C]">₹12,000</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Estimated Returns</p>
                    <p className="text-lg font-bold text-[#2BAE66]">₹766</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-4 italic">
                  <strong>Note:</strong> Actual returns may vary based on market performance.
                </p>
              </div>
            </div>
          </section>

          {/* How the SIP Calculator Can Help You */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Target className="w-8 h-8 mr-3 text-[#2BAE66]" />
              How the SIP Calculator Can Help You
            </h2>
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <p className="text-lg text-white/90 leading-relaxed mb-6">
                SIPs are considered a disciplined, long-term investment strategy. Using a SIP calculator provides several benefits:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Plan your investment
                  </h3>
                  <p className="text-white/90">Know exactly how much to invest monthly to meet your financial goals.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Estimate potential wealth
                  </h3>
                  <p className="text-white/90">Visualize how your contributions grow over time with compound interest.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Compare investment strategies
                  </h3>
                  <p className="text-white/90">Understand the difference between lump sum and SIP investing approaches.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Stay financially disciplined
                  </h3>
                  <p className="text-white/90">By regularly investing, you develop a habit of saving and investing consistently.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Time-saving
                  </h3>
                  <p className="text-white/90">Avoid manual calculations and get immediate, accurate results.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Student-friendly planning
                  </h3>
                  <p className="text-white/90">Plan for future expenses like higher education, study abroad, or career funds.</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-[#FFC857] text-[#1A3D7C] rounded-lg">
                <p className="font-semibold">
                  💡 Pro Tip: Use the calculator to simulate various scenarios, adjust your monthly contributions, or explore different investment tenures. For students, even small monthly investments can grow significantly over 5–10 years with the power of compounding.
                </p>
              </div>
            </div>
          </section>

          {/* Features of The Tutor Bridge SIP Calculator */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Features of The Tutor Bridge SIP Calculator
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Instant Results</h3>
                </div>
                <p className="text-gray-700">See maturity amount, total invested, and expected returns immediately as you adjust inputs.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Flexible Inputs</h3>
                </div>
                <p className="text-gray-700">Customize monthly investment (₹500 to ₹1,00,000), annual returns (1% to 30%), and duration (1 to 40 years).</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <PieChart className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Visual Breakdown</h3>
                </div>
                <p className="text-gray-700">Clear visualization of invested amount vs. returns, with detailed investment summary.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Accurate Calculations</h3>
                </div>
                <p className="text-gray-700">Handles monthly compounding correctly using proven financial formulas; avoids overestimations.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">📱</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Mobile-Friendly</h3>
                </div>
                <p className="text-gray-700">Fully responsive design works seamlessly on desktops, tablets, and smartphones.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">🇮🇳</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">India-Focused</h3>
                </div>
                <p className="text-gray-700">All calculations in Indian Rupees (INR) with formatting tailored for the Indian market.</p>
              </div>
            </div>
          </section>

          {/* Step-by-Step Guide */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <CheckCircle className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Step-by-Step Guide to Using the SIP Calculator
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-0.5">1</span>
                  <div>
                    <p className="text-gray-700"><strong>Enter your monthly investment amount</strong> (₹) using the slider or input field.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-0.5">2</span>
                  <div>
                    <p className="text-gray-700"><strong>Choose your investment tenure</strong> in years based on your financial goals.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-0.5">3</span>
                  <div>
                    <p className="text-gray-700"><strong>Input your expected annual rate of return</strong> (%) based on historical or projected mutual fund performance.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-0.5">4</span>
                  <div>
                    <p className="text-gray-700"><strong>View results instantly</strong> showing:</p>
                    <ul className="ml-4 mt-2 space-y-1 text-gray-600">
                      <li>• Total invested amount</li>
                      <li>• Estimated returns</li>
                      <li>• Maturity value</li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-0.5">5</span>
                  <div>
                    <p className="text-gray-700"><strong>Adjust parameters</strong> to explore different investment scenarios and find the best plan for your goals.</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* Advantages of Using a SIP Calculator */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Advantages of Using a SIP Calculator
            </h2>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-200">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Plan investments accurately</strong> and meet financial goals with realistic projections.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Save time</strong> compared to manual calculations with complex formulas.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Gain confidence</strong> in investment decisions with realistic return projections.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Understand the impact</strong> of monthly contributions and investment tenure on overall returns.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Perfect for students and beginners</strong> in India to get a practical understanding of wealth creation through SIPs.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Experience the power of compounding:</strong> Even small monthly investments can grow significantly over 5–10 years for young professionals and students.</p>
                </li>
              </ul>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <HelpCircle className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="space-y-4">

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">1. How much can I invest in a SIP in India?</h3>
                <p className="text-gray-700">You can invest as low as <strong>₹500 per month</strong> in most mutual funds. There is no upper limit—you can invest as much as you want based on your financial capacity.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">2. What is the maximum tenure of a SIP?</h3>
                <p className="text-gray-700">There's no fixed maximum tenure. You can invest through SIP for as long as you like—many investors continue SIPs for 10, 20, or even 30+ years to maximize the benefits of compounding.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">3. Can I modify my SIP amount later?</h3>
                <p className="text-gray-700">Yes! Most mutual funds allow you to increase, decrease, or pause your SIP contributions. You can also stop your SIP anytime without penalties (though you should check specific fund terms).</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">4. Are SIPs only for equity mutual funds?</h3>
                <p className="text-gray-700">No! You can invest via SIP in <strong>equity, debt, or hybrid mutual funds</strong>. SIP is simply a method of investment, not a specific type of fund.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">5. What types of SIPs are available in India?</h3>
                <ul className="text-gray-700 space-y-2 mt-2">
                  <li><strong>• Regular SIP:</strong> Fixed amount invested at fixed intervals</li>
                  <li><strong>• Step-up SIP:</strong> Automatic increase in contributions over time</li>
                  <li><strong>• Perpetual SIP:</strong> Invest indefinitely without an end date</li>
                  <li><strong>• Trigger SIP:</strong> Invest based on specific market conditions</li>
                  <li><strong>• Flexible SIP:</strong> Change amounts as per your needs</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">6. How does compounding work in SIPs?</h3>
                <p className="text-gray-700">In SIPs, returns are compounded monthly. This means the returns you earn each month are reinvested, and you earn returns on those returns too. Over time, this compounding effect can significantly boost your wealth—especially for long-term investments.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">7. Is SIP better than lump-sum investment?</h3>
                <p className="text-gray-700"><strong>SIP</strong> is ideal for disciplined investing and rupee cost averaging—it reduces the impact of market volatility. <strong>Lump sum</strong> may be better if markets are down or you have a large amount to invest at once. Both have their benefits depending on your situation and risk appetite.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">8. How to estimate SIP returns accurately?</h3>
                <p className="text-gray-700">Use realistic expected annual returns (typically 8-15% for equity funds, 6-9% for debt funds) and your actual monthly contribution amount. Our SIP calculator provides precise estimates based on monthly compounding, but remember—actual market returns may vary.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">9. Can students start investing in SIPs?</h3>
                <p className="text-gray-700">Absolutely! Students can start with as little as ₹500 per month. Starting early gives you the advantage of time—even small investments can grow substantially over 10-15 years due to compounding. It's a great way to build financial discipline early.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">10. Are SIP returns guaranteed?</h3>
                <p className="text-gray-700">No, SIP returns are <strong>not guaranteed</strong> as they depend on market performance. However, historically, equity mutual funds have delivered good returns over long periods (10+ years). The SIP calculator provides estimates based on the return rate you input.</p>
              </div>

            </div>
          </section>

          {/* Book Your Session CTA Section */}
          <section className="text-center py-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] via-[#2BAE66] to-[#1A3D7C] text-white p-12 rounded-2xl shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-[#FFC857] mr-3" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  Need Help with Financial Mathematics?
                </h2>
              </div>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Our expert tutors can help you understand compound interest, investment calculations, and mathematical concepts behind financial planning. Get personalized guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book-demo-class">
                  <button className="bg-[#FFC857] text-[#1A3D7C] px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#1A3D7C] transition-colors flex items-center justify-center gap-2">
                    Book Your Session
                    <ArrowRight className="w-5 h-5" />
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
