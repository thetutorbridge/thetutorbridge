'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PiggyBank, Home, ArrowRight, TrendingUp, Shield, Clock, Calculator } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function FDCalculatorPage() {
  const [totalInvestment, setTotalInvestment] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(7);
  const [years, setYears] = useState<number>(5);
  const [months, setMonths] = useState<number>(0);
  const [days, setDays] = useState<number>(0);

  const calculateFD = () => {
    const principal = totalInvestment;
    const rate = interestRate / 100;
    // Convert years, months, days to total time in years
    const time = years + (months / 12) + (days / 365);
    const n = 4; // Quarterly compounding (standard for FDs in India)

    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const maturityAmount = principal * Math.pow(1 + rate / n, n * time);
    const interestEarned = maturityAmount - principal;

    return {
      investedAmount: principal,
      estimatedReturns: Math.round(interestEarned),
      totalValue: Math.round(maturityAmount),
    };
  };

  const results = calculateFD();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
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
            <Link href="/calculators" className="text-[#1A3D7C] hover:text-[#2BAE66] whitespace-nowrap">
              Calculators
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 truncate">
              <span className="hidden sm:inline">FD Calculator</span>
              <span className="sm:hidden">FD Calc</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <PiggyBank className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              FD Calculator
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Calculate your Fixed Deposit returns with our free FD calculator. Get instant maturity amount and interest calculations with quarterly compounding for accurate financial planning.
          </p>
          <div className="bg-white/10 p-3 md:p-4 rounded-xl mb-8">
            <p className="text-lg italic">
              Fixed Deposits offer guaranteed returns and capital protection.<br />
              <strong>Plan Your Safe Investment Journey Today</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">

          {/* Calculator Section */}
          <section className="mb-12">
            <div className="grid lg:grid-cols-2 gap-8">

              {/* Input Section */}
              <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-xl md:text-xl md:text-2xl font-bold break-words text-[#1A3D7C] mb-6 flex items-center">
                  <Calculator className="w-5 h-5 md:w-6 md:h-6 mr-2 text-[#2BAE66]" />
                  Calculate Your FD Returns
                </h2>

                <div className="space-y-6">
                  {/* Total Investment */}
                  <div>
                    <div className="flex justify-between items-center mb-3 gap-2">
                      <Label className="text-sm md:text-base font-semibold text-gray-700 flex-shrink-0">Total Investment</Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <span className="text-xs md:text-sm text-gray-500">₹</span>
                        <Input
                          type="number"
                          value={totalInvestment}
                          onChange={(e) => setTotalInvestment(Number(e.target.value))}
                          className="w-20 md:w-32 text-right text-sm md:text-base"
                        />
                      </div>
                    </div>
                    <Slider
                      value={[totalInvestment]}
                      onValueChange={(value) => setTotalInvestment(value[0])}
                      min={1000}
                      max={10000000}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹1,000</span>
                      <span>₹1 Cr</span>
                    </div>
                  </div>

                  {/* Rate of Interest */}
                  <div>
                    <div className="flex justify-between items-center mb-3 gap-2">
                      <Label className="text-sm md:text-base font-semibold text-gray-700 flex-shrink-0">Rate of Interest (p.a.)</Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Input
                          type="number"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="w-16 md:w-24 text-right text-sm md:text-base"
                          step="0.1"
                        />
                        <span className="text-xs md:text-sm text-gray-500">%</span>
                      </div>
                    </div>
                    <Slider
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      min={3}
                      max={12}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>3%</span>
                      <span>12%</span>
                    </div>
                  </div>

                  {/* Time Period - Years */}
                  <div>
                    <div className="flex justify-between items-center mb-3 gap-2">
                      <Label className="text-sm md:text-base font-semibold text-gray-700 flex-shrink-0">Time Period - Years</Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Input
                          type="number"
                          value={years}
                          onChange={(e) => setYears(Number(e.target.value))}
                          className="w-16 md:w-24 text-right text-sm md:text-base"
                        />
                        <span className="text-xs md:text-sm text-gray-500">Years</span>
                      </div>
                    </div>
                    <Slider
                      value={[years]}
                      onValueChange={(value) => setYears(value[0])}
                      min={0}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0 Years</span>
                      <span>10 Years</span>
                    </div>
                  </div>

                  {/* Time Period - Months */}
                  <div>
                    <div className="flex justify-between items-center mb-3 gap-2">
                      <Label className="text-sm md:text-base font-semibold text-gray-700 flex-shrink-0">Time Period - Months</Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Input
                          type="number"
                          value={months}
                          onChange={(e) => setMonths(Number(e.target.value))}
                          className="w-16 md:w-24 text-right text-sm md:text-base"
                          min="0"
                          max="11"
                        />
                        <span className="text-xs md:text-sm text-gray-500">Months</span>
                      </div>
                    </div>
                    <Slider
                      value={[months]}
                      onValueChange={(value) => setMonths(value[0])}
                      min={0}
                      max={11}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0 Months</span>
                      <span>11 Months</span>
                    </div>
                  </div>

                  {/* Time Period - Days */}
                  <div>
                    <div className="flex justify-between items-center mb-3 gap-2">
                      <Label className="text-sm md:text-base font-semibold text-gray-700 flex-shrink-0">Time Period - Days</Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Input
                          type="number"
                          value={days}
                          onChange={(e) => setDays(Number(e.target.value))}
                          className="w-16 md:w-24 text-right text-sm md:text-base"
                          min="0"
                          max="30"
                        />
                        <span className="text-xs md:text-sm text-gray-500">Days</span>
                      </div>
                    </div>
                    <Slider
                      value={[days]}
                      onValueChange={(value) => setDays(value[0])}
                      min={0}
                      max={30}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0 Days</span>
                      <span>30 Days</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] p-4 md:p-8 rounded-2xl shadow-xl text-white">
                <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6 mr-2 text-[#FFC857]" />
                  Your FD Returns
                </h2>

                <div className="space-y-6">
                  <div className="bg-white/10 p-3 md:p-4 rounded-xl backdrop-blur">
                    <p className="text-sm text-white/80 mb-1">Invested Amount</p>
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#FFC857]">
                      {formatCurrency(results.investedAmount)}
                    </p>
                  </div>

                  <div className="bg-white/10 p-3 md:p-4 rounded-xl backdrop-blur">
                    <p className="text-sm text-white/80 mb-1">Estimated Returns</p>
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#FFC857]">
                      {formatCurrency(results.estimatedReturns)}
                    </p>
                  </div>

                  <div className="bg-white/20 p-4 md:p-6 rounded-xl backdrop-blur border-2 border-[#FFC857]">
                    <p className="text-sm text-white/80 mb-1">Total Maturity Value</p>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold break-words text-[#FFC857]">
                      {formatCurrency(results.totalValue)}
                    </p>
                  </div>

                  <div className="bg-white/10 p-3 md:p-4 rounded-xl backdrop-blur">
                    <p className="text-xs text-white/70 mb-2">
                      <strong>Note:</strong> Calculations are based on quarterly compounding, which is standard for most FDs in India.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What is FD Calculator Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-[#1A3D7C]/5 to-[#2BAE66]/5 p-8 rounded-2xl border border-[#2BAE66]/20">
              <h2 className="text-xl md:text-2xl lg:text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6">
                What is an FD Calculator?
              </h2>
              <div className="prose max-w-none text-gray-700 space-y-4">
                <p className="text-lg leading-relaxed">
                  An FD (Fixed Deposit) Calculator is a powerful financial tool that helps you calculate the maturity amount and interest earned on your fixed deposit investments. It uses the compound interest formula with quarterly compounding to provide accurate projections of your FD returns.
                </p>
                <p className="text-lg leading-relaxed">
                  Whether you're planning to invest in bank FDs, post office FDs, or corporate FDs, our calculator helps you understand exactly how much your investment will grow over time, making financial planning easier and more transparent.
                </p>
              </div>
            </div>
          </section>

          {/* How FD Calculator Works */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6">
              How Does the FD Calculator Work?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3 gap-2">Enter FD Details</h3>
                <p className="text-gray-700">
                  Input your total investment amount, expected interest rate (p.a.), and investment tenure in years.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3 gap-2">Instant Calculation</h3>
                <p className="text-gray-700">
                  The calculator uses quarterly compounding formula: A = P(1 + r/n)^(nt) to compute your returns instantly.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3 gap-2">View Results</h3>
                <p className="text-gray-700">
                  Get a clear breakdown of invested amount, interest earned, and total maturity value at a glance.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose FD Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Why Choose Fixed Deposits?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <Shield className="w-8 h-8 text-[#FFC857] flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#FFC857] mb-2 text-lg">Capital Protection</h3>
                    <p className="text-white/90">
                      FDs offer guaranteed returns with complete capital protection, making them one of the safest investment options available.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <TrendingUp className="w-8 h-8 text-[#FFC857] flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#FFC857] mb-2 text-lg">Fixed Returns</h3>
                    <p className="text-white/90">
                      Lock in your interest rate at the time of booking and enjoy predictable, stable returns regardless of market fluctuations.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="w-8 h-8 text-[#FFC857] flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#FFC857] mb-2 text-lg">Flexible Tenure</h3>
                    <p className="text-white/90">
                      Choose from a wide range of tenures from 7 days to 10 years to match your financial goals and liquidity needs.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <PiggyBank className="w-8 h-8 text-[#FFC857] flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#FFC857] mb-2 text-lg">Loan Facility</h3>
                    <p className="text-white/90">
                      Get loans against your FD up to 90% of the deposit value in case of emergency without breaking the FD.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Types of FDs Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6">
              Types of Fixed Deposits in India
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3 gap-2">🏦 Bank Fixed Deposits</h3>
                <p className="text-gray-700 mb-3 gap-2">
                  Offered by nationalized and private banks with interest rates ranging from 3% to 7.5% p.a. Insured by DICGC up to ₹5 lakhs.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Best for:</strong> Risk-averse investors seeking capital protection and guaranteed returns.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3 gap-2">📮 Post Office FDs (Time Deposits)</h3>
                <p className="text-gray-700 mb-3 gap-2">
                  Government-backed fixed deposits with competitive interest rates and tax benefits under Section 80C (for 5-year TD).
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Best for:</strong> Conservative investors who prefer government-backed schemes with tax benefits.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3 gap-2">🏢 Corporate Fixed Deposits</h3>
                <p className="text-gray-700 mb-3 gap-2">
                  Offered by companies and NBFCs with higher interest rates (7% to 9% p.a.) but carry higher risk compared to bank FDs.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Best for:</strong> Investors seeking higher returns and willing to take moderate risk with AAA-rated companies.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3 gap-2">👴 Senior Citizen FDs</h3>
                <p className="text-gray-700 mb-3 gap-2">
                  Special FD schemes for senior citizens (60+ years) offering 0.25% to 0.75% higher interest rates than regular FDs.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Best for:</strong> Senior citizens looking for stable income and better returns on their retirement corpus.
                </p>
              </div>
            </div>
          </section>

          {/* Smart Tips Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6">
              Smart Tips for FD Investments
            </h2>
            <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-1">Laddering Strategy</h3>
                      <p className="text-gray-700 text-sm">
                        Split your investment across multiple FDs with different maturity periods to ensure liquidity and better rate management.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-1">Compare Interest Rates</h3>
                      <p className="text-gray-700 text-sm">
                        Different banks offer different rates. Always compare before investing to maximize your returns.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-1">Consider Tax Implications</h3>
                      <p className="text-gray-700 text-sm">
                        Interest earned on FDs is taxable. For amounts above ₹40,000 (₹50,000 for senior citizens), TDS is deducted at 10%.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-1">Choose Cumulative FDs</h3>
                      <p className="text-gray-700 text-sm">
                        Cumulative FDs (where interest is compounded) give higher returns than non-cumulative ones (regular payout).
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-1">Auto-Renewal Facility</h3>
                      <p className="text-gray-700 text-sm">
                        Enable auto-renewal to avoid missing out on interest during the gap between maturity and reinvestment.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-1">Avoid Premature Withdrawal</h3>
                      <p className="text-gray-700 text-sm">
                        Breaking an FD before maturity results in penalty and reduced interest. Plan your liquidity needs in advance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  1. What is the minimum and maximum amount for FD investment?
                </h3>
                <p className="text-gray-700">
                  The minimum FD amount varies by bank, typically ranging from ₹1,000 to ₹10,000. There is usually no maximum limit, though banks may have special schemes for high-value deposits. Senior citizens and NRIs may have different limits and rates.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  2. What is the difference between cumulative and non-cumulative FD?
                </h3>
                <p className="text-gray-700">
                  In a cumulative FD, the interest is compounded quarterly and paid at maturity along with the principal, resulting in higher returns. In a non-cumulative FD, interest is paid out at regular intervals (monthly, quarterly, or annually), providing regular income but lower overall returns.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  3. Is the interest earned on FD taxable?
                </h3>
                <p className="text-gray-700">
                  Yes, interest earned on FDs is fully taxable as per your income tax slab. Banks deduct TDS at 10% if total interest exceeds ₹40,000 per year (₹50,000 for senior citizens). However, 5-year tax-saving FDs qualify for deduction under Section 80C up to ₹1.5 lakhs.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  4. Can I break my FD before maturity?
                </h3>
                <p className="text-gray-700">
                  Yes, premature withdrawal is allowed but attracts a penalty of 0.5% to 1% on the interest rate. The interest is recalculated based on the actual deposit period at a reduced rate. Tax-saving FDs (5-year lock-in) cannot be withdrawn before maturity.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  5. What happens to my FD after maturity?
                </h3>
                <p className="text-gray-700">
                  After maturity, if you don't provide instructions, most banks auto-renew the FD for the same tenure at prevailing interest rates. You can also choose to withdraw the amount or transfer it to your savings account. Some banks offer a grace period of 7-14 days post maturity.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  6. Can I get a loan against my FD?
                </h3>
                <p className="text-gray-700">
                  Yes, most banks offer loans against FDs up to 75-90% of the deposit value at interest rates typically 1-2% higher than the FD rate. This is a good emergency funding option as you continue earning interest on your FD while using the loan facility.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  7. How is FD interest rate calculated?
                </h3>
                <p className="text-gray-700">
                  FD interest is calculated using the compound interest formula: A = P(1 + r/n)^(nt), where P is principal, r is annual rate, n is compounding frequency (usually 4 for quarterly), and t is time in years. Our calculator uses this exact formula for accurate results.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  8. Are bank FDs safe and insured?
                </h3>
                <p className="text-gray-700">
                  Yes, bank FDs are very safe and insured by the Deposit Insurance and Credit Guarantee Corporation (DICGC) up to ₹5 lakhs per depositor per bank. This includes both principal and interest. Post Office FDs are backed by the Government of India, making them extremely secure.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  9. What is a tax-saving FD (5-year FD)?
                </h3>
                <p className="text-gray-700">
                  A 5-year tax-saving FD qualifies for income tax deduction under Section 80C up to ₹1.5 lakhs. However, it has a mandatory 5-year lock-in period with no premature withdrawal allowed. The interest earned is still taxable. Senior citizens get an additional 0.5% interest on these FDs.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  10. Which is better: FD or Recurring Deposit (RD)?
                </h3>
                <p className="text-gray-700">
                  FD is a lump-sum investment ideal for those with surplus funds, offering slightly higher interest rates. RD requires monthly deposits and is perfect for building savings discipline with small amounts. FD gives better returns on large amounts, while RD is ideal for systematic saving. Choose based on your liquidity and saving pattern.
                </p>
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
                Our expert mentors can help you understand FD investments, compare different schemes, and make informed decisions for secure financial growth.
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
