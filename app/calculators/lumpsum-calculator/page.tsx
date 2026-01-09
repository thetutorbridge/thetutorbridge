'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Home, Target, CheckCircle, HelpCircle, Lightbulb, IndianRupee, PieChart, BarChart3, BookOpen, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LumpsumCalculatorPage() {
  const [totalInvestment, setTotalInvestment] = useState<number>(100000);
  const [returnRate, setReturnRate] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(10);

  // Calculate Lumpsum Returns using Compound Interest Formula
  // A = P (1 + r/n)^(nt)
  // For annual compounding: A = P (1 + r)^t
  const calculateLumpsum = () => {
    const principal = totalInvestment;
    const rate = returnRate / 100;
    const time = timePeriod;

    // Future Value = P * (1 + r)^t
    const futureValue = principal * Math.pow(1 + rate, time);
    const totalReturns = futureValue - principal;

    return {
      investedAmount: principal,
      estimatedReturns: Math.round(totalReturns),
      totalValue: Math.round(futureValue),
    };
  };

  const results = calculateLumpsum();

  // Format currency
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <>
      <Navigation />
      <div className="bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-8 md:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <Link
              href="/calculators"
              className="inline-flex items-center text-white/90 hover:text-white mb-4 md:mb-6 transition-colors text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Calculators
            </Link>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4">
                  Lumpsum Calculator
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl">
                  Calculate returns on your one-time investment with our free lumpsum calculator. Estimate future value based on expected returns and investment duration.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <PieChart className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#FFC857]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          {/* Main Calculator */}
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {/* Input Section */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-[#2BAE66]" />
                  Investment Details
                </h2>

                {/* Total Investment */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <Label className="text-base font-semibold text-gray-700">Total Investment</Label>
                    <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                      <IndianRupee className="w-4 h-4 text-gray-600 mr-1" />
                      <Input
                        type="number"
                        value={totalInvestment}
                        onChange={(e) => setTotalInvestment(Number(e.target.value))}
                        className="w-32 border-0 bg-transparent p-0 text-right font-semibold text-[#2BAE66] focus-visible:ring-0"
                      />
                    </div>
                  </div>
                  <Slider
                    value={[totalInvestment]}
                    onValueChange={(value) => setTotalInvestment(value[0])}
                    min={1000}
                    max={10000000}
                    step={1000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹1,000</span>
                    <span>₹1 Cr</span>
                  </div>
                </div>

                {/* Expected Return Rate */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <Label className="text-base font-semibold text-gray-700">Expected Return Rate (p.a)</Label>
                    <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                      <Input
                        type="number"
                        value={returnRate}
                        onChange={(e) => setReturnRate(Number(e.target.value))}
                        className="w-20 border-0 bg-transparent p-0 text-right font-semibold text-[#2BAE66] focus-visible:ring-0"
                        step="0.1"
                      />
                      <span className="ml-1 text-gray-600 font-semibold">%</span>
                    </div>
                  </div>
                  <Slider
                    value={[returnRate]}
                    onValueChange={(value) => setReturnRate(value[0])}
                    min={1}
                    max={30}
                    step={0.5}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1%</span>
                    <span>30%</span>
                  </div>
                </div>

                {/* Time Period */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <Label className="text-base font-semibold text-gray-700">Time Period</Label>
                    <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                      <Input
                        type="number"
                        value={timePeriod}
                        onChange={(e) => setTimePeriod(Number(e.target.value))}
                        className="w-20 border-0 bg-transparent p-0 text-right font-semibold text-[#2BAE66] focus-visible:ring-0"
                      />
                      <span className="ml-1 text-gray-600 font-semibold">Yr</span>
                    </div>
                  </div>
                  <Slider
                    value={[timePeriod]}
                    onValueChange={(value) => setTimePeriod(value[0])}
                    min={1}
                    max={40}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 Year</span>
                    <span>40 Years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-6">
                <h3 className="text-lg font-bold text-[#1A3D7C] mb-6 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-[#2BAE66]" />
                  Investment Summary
                </h3>

                {/* Results */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Invested Amount</span>
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(results.investedAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Est. Returns</span>
                    <span className="text-lg font-bold text-[#2BAE66]">{formatCurrency(results.estimatedReturns)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-base font-semibold text-gray-700">Total Value</span>
                    <span className="text-2xl font-bold text-[#1A3D7C]">{formatCurrency(results.totalValue)}</span>
                  </div>
                </div>

                {/* Pie Chart Visual Representation */}
                <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-48 h-48">
                      <svg viewBox="0 0 100 100" className="transform -rotate-90">
                        {/* Invested Amount (Principal) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#1A3D7C"
                          strokeWidth="20"
                          strokeDasharray={`${(results.investedAmount / results.totalValue) * 251.2} 251.2`}
                        />
                        {/* Returns */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#2BAE66"
                          strokeWidth="20"
                          strokeDasharray={`${(results.estimatedReturns / results.totalValue) * 251.2} 251.2`}
                          strokeDashoffset={`-${(results.investedAmount / results.totalValue) * 251.2}`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xs text-gray-600">Total</div>
                          <div className="text-sm font-bold text-[#1A3D7C]">
                            {formatCurrency(results.totalValue)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#1A3D7C] mr-2"></div>
                        <span className="text-xs text-gray-600">Invested</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-900">
                        {((results.investedAmount / results.totalValue) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#2BAE66] mr-2"></div>
                        <span className="text-xs text-gray-600">Returns</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-900">
                        {((results.estimatedReturns / results.totalValue) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <p className="text-xs text-gray-600 text-center mb-3">
                    Ready to start your investment journey?
                  </p>
                  <Link href="/calculators">
                    <Button className="w-full bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] hover:opacity-90 text-white font-semibold py-6">
                      Explore More Calculators
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Target className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Benefits of Lumpsum Calculator
            </h2>
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Quick Investment Planning
                  </h3>
                  <p className="text-white/90">
                    Instantly calculate potential returns on your one-time investment. Perfect for planning windfall investments like bonuses, inheritance, or maturity proceeds.
                  </p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Compare with SIP Returns
                  </h3>
                  <p className="text-white/90">
                    Understand whether lumpsum or SIP works better for your financial goals. Make informed decisions based on your available capital and investment horizon.
                  </p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Power of Compounding
                  </h3>
                  <p className="text-white/90">
                    Visualize how compound interest works over time. See your money grow exponentially as returns generate more returns, accelerating wealth creation.
                  </p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Goal-Based Investing
                  </h3>
                  <p className="text-white/90">
                    Plan for specific financial goals like retirement, children's education, or dream vacation. Calculate how much to invest today to reach your target amount.
                  </p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Scenario Analysis
                  </h3>
                  <p className="text-white/90">
                    Test different return rates and time periods to see how they impact your final corpus. Adjust sliders to find the optimal investment strategy for your risk appetite.
                  </p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Visual Investment Breakdown
                  </h3>
                  <p className="text-white/90">
                    Interactive pie chart shows the proportion of principal vs returns. Easily understand how much wealth is created through compounding over your investment period.
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-[#FFC857] text-[#1A3D7C] rounded-lg">
                <p className="font-semibold">
                  💡 Pro Tip: Lumpsum investments work best when markets are at lower levels. Consider investing during market corrections for potentially higher returns!
                </p>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <HelpCircle className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  What is a lumpsum investment?
                </h3>
                <p className="text-gray-700 pl-6">
                  A lumpsum investment is a <strong>one-time investment</strong> where you invest a large amount of money at once, rather than investing smaller amounts regularly. Examples include investing bonus money, inheritance, maturity proceeds from FD/insurance, or sale proceeds from property/assets.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  How does the lumpsum calculator work?
                </h3>
                <p className="text-gray-700 pl-6">
                  The calculator uses the <strong>compound interest formula: A = P(1 + r)^t</strong>, where A is final amount, P is principal (your investment), r is annual return rate, and t is time period in years. For example, ₹1 lakh at 12% for 10 years grows to ₹3,10,585.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  Lumpsum vs SIP - which is better?
                </h3>
                <p className="text-gray-700 pl-6">
                  Both have advantages. <strong>Lumpsum works best</strong> when markets are at lower levels or during corrections, potentially giving higher returns. <strong>SIP works best</strong> for regular salaried investors and provides rupee cost averaging, reducing timing risk. Choose based on your available capital and market conditions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  What is a good return rate for lumpsum investments?
                </h3>
                <p className="text-gray-700 pl-6">
                  Expected returns vary by asset class: <strong>Equity mutual funds: 10-15%</strong>, Debt funds: 6-8%, Hybrid funds: 8-12%, Fixed deposits: 5-7%. Equity investments carry higher risk but potentially higher returns over long term (10+ years). Always diversify your portfolio.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  What is the minimum lumpsum investment amount?
                </h3>
                <p className="text-gray-700 pl-6">
                  Minimum amounts vary by instrument. <strong>Mutual funds: ₹500-₹5,000</strong>, Stocks: No minimum (one share), PPF: ₹500, NSC/KVP: ₹1,000, Fixed Deposits: ₹1,000-₹10,000. Our calculator works for any amount from ₹1,000 to ₹10 crore.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  Can I withdraw my lumpsum investment anytime?
                </h3>
                <p className="text-gray-700 pl-6">
                  <strong>It depends on the investment type.</strong> Mutual funds (open-ended): Usually yes, with possible exit load if redeemed before 1 year. Fixed deposits: Yes, with penalty. PPF: Partial withdrawals after 7 years. ELSS: 3-year lock-in. Stocks: Anytime during market hours. Always check lock-in periods before investing.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  Are lumpsum returns guaranteed?
                </h3>
                <p className="text-gray-700 pl-6">
                  <strong>Only for certain instruments.</strong> Guaranteed returns: Fixed deposits, PPF, NSC, government bonds. Market-linked returns: Mutual funds, stocks, ETFs - these can fluctuate. The calculator shows estimated returns based on assumed rate; actual returns may vary based on market performance.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  What is the ideal time period for lumpsum investment?
                </h3>
                <p className="text-gray-700 pl-6">
                  For <strong>equity investments, minimum 5-7 years</strong> recommended to ride out market volatility and benefit from compounding. For <strong>debt/fixed income, 1-3 years</strong> works well. Longer time periods significantly amplify returns - ₹1L at 12% grows to ₹3.1L in 10 years but ₹9.6L in 20 years!
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  Should I invest lumpsum during market highs?
                </h3>
                <p className="text-gray-700 pl-6">
                  <strong>Generally not recommended.</strong> Consider <strong>Systematic Transfer Plan (STP)</strong> - park lumpsum in debt fund and transfer to equity systematically over 6-12 months. This provides rupee cost averaging like SIP while keeping your money invested. Alternatively, split into multiple tranches and invest during dips.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  How is lumpsum different from recurring deposit?
                </h3>
                <p className="text-gray-700 pl-6">
                  <strong>Lumpsum = One-time big investment.</strong> Recurring Deposit (RD) = Regular monthly investments of fixed amount, like SIP. RD/SIP good for salaried individuals with monthly surplus. Lumpsum good when you have large capital available (bonus, inheritance, etc.). Both use compounding but differently.
                </p>
              </div>
            </div>
          </section>

          {/* Smart Tips Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Smart Tips for Lumpsum Investing
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl border border-gray-200">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Time the market wisely:</strong> While timing the market perfectly is impossible, investing during market corrections or consolidations can enhance returns. Use market PE ratios and index levels as indicators. During significant dips (10-20% corrections), lumpsum investments historically perform well.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Diversify across asset classes:</strong> Don't put all your lumpsum in one basket. Spread across equity (60%), debt (30%), and gold/others (10%) based on risk appetite. Within equity, diversify across large-cap, mid-cap, and international funds for better risk-adjusted returns.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Use STP for risk mitigation:</strong> If markets are at highs, use Systematic Transfer Plan (STP). Park lumpsum in liquid/debt fund and transfer ₹10-50K monthly to equity funds over 6-12 months. This averages your entry price while keeping money invested.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Match investment to time horizon:</strong> For goals under 3 years, use debt/hybrid funds or FDs. For 3-5 years, consider balanced advantage or hybrid funds. For 5+ years, equity funds offer best wealth creation. Never invest emergency funds or short-term needs in equity.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Consider tax implications:</strong> LTCG on equity >₹1.25L taxed at 12.5%. Debt funds taxed as per slab. ELSS provides Section 80C deduction up to ₹1.5L. PPF is EEE (exempt-exempt-exempt). Choose tax-efficient instruments based on your income tax bracket.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Rebalance portfolio annually:</strong> Market movements change your asset allocation. If equity grows to 80% from 60%, book some profits and rebalance back to original allocation. This ensures disciplined profit-booking and maintains your desired risk level.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Stay invested for long term:</strong> Lumpsum investments need patience. Markets can be volatile short-term but historically deliver 12-15% over 10+ years. Avoid panic selling during corrections. Use our calculator to see how time dramatically amplifies returns through compounding.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* Book Your Session CTA Section */}
          <section className="text-center mb-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] via-[#2BAE66] to-[#1A3D7C] text-white p-12 rounded-2xl shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-[#FFC857] mr-3" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  Need Help with Investment Mathematics?
                </h2>
              </div>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Our expert tutors can help you understand investment calculations, compound interest, and financial planning concepts. Get personalized one-on-one guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tutoring/free-consultation">
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
      </div>

      {/* Footer */}
      <footer className="bg-[#1A3D7C] text-white py-8 md:py-12 mt-12 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">The Tutor Bridge</h3>
              <p className="text-white/80 text-sm">
                Your trusted partner for financial planning and investment calculations.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/calculators" className="text-white/80 hover:text-white transition-colors">
                    All Calculators
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-white/80 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Disclaimer</h3>
              <p className="text-white/80 text-sm">
                This calculator provides estimates only. Actual returns may vary based on market conditions. Consult a financial advisor for personalized investment advice.
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
            <p>&copy; 2026 The Tutor Bridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
