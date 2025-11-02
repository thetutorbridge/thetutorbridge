'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Home, Percent, IndianRupee, Clock, Target, CheckCircle, HelpCircle, Lightbulb, BookOpen, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SimpleInterestCalculatorPage() {
  const [principalAmount, setPrincipalAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(6);
  const [timePeriod, setTimePeriod] = useState<number>(3);

  const calculateSimpleInterest = () => {
    const P = principalAmount;
    const R = interestRate;
    const T = timePeriod;

    // SI = (P × R × T) / 100
    const simpleInterest = (P * R * T) / 100;
    const totalAmount = P + simpleInterest;

    return {
      principalAmount: P,
      simpleInterest: Math.round(simpleInterest),
      totalAmount: Math.round(totalAmount),
    };
  };

  const results = calculateSimpleInterest();

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
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                  Simple Interest Calculator India
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl">
                  Calculate simple interest on loans, deposits, and investments. Get instant results with our free SI calculator.
                </p>
              </div>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                <Calculator className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {/* Left Column - Calculator */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 lg:p-10">
                <h2 className="text-xl md:text-2xl font-bold text-[#1A3D7C] mb-6 md:mb-8">
                  Calculate Simple Interest
                </h2>

                <div className="space-y-6 md:space-y-8">
                  {/* Principal Amount */}
                  <div>
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <Label htmlFor="principal-amount" className="text-gray-700 font-semibold flex-shrink-0 text-sm md:text-base">
                        Principal Amount (₹)
                      </Label>
                      <Input
                        id="principal-amount"
                        type="number"
                        value={principalAmount}
                        onChange={(e) => setPrincipalAmount(Number(e.target.value))}
                        className="w-24 md:w-32 lg:w-40 text-right font-bold text-sm md:text-base lg:text-lg border-2 border-[#2BAE66]"
                      />
                    </div>
                    <Slider
                      value={[principalAmount]}
                      onValueChange={(value) => setPrincipalAmount(value[0])}
                      min={1000}
                      max={10000000}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-xs md:text-sm text-gray-600">
                      <span>₹1,000</span>
                      <span>₹1 Cr</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <Label htmlFor="interest-rate" className="text-gray-700 font-semibold flex-shrink-0 text-sm md:text-base">
                        Interest Rate (% p.a.)
                      </Label>
                      <Input
                        id="interest-rate"
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-16 md:w-20 lg:w-24 text-right font-bold text-sm md:text-base lg:text-lg border-2 border-[#2BAE66]"
                        step="0.1"
                      />
                    </div>
                    <Slider
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      min={1}
                      max={20}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-xs md:text-sm text-gray-600">
                      <span>1%</span>
                      <span>20%</span>
                    </div>
                  </div>

                  {/* Time Period */}
                  <div>
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <Label htmlFor="time-period" className="text-gray-700 font-semibold flex-shrink-0 text-sm md:text-base">
                        Time Period (Years)
                      </Label>
                      <Input
                        id="time-period"
                        type="number"
                        value={timePeriod}
                        onChange={(e) => setTimePeriod(Number(e.target.value))}
                        className="w-16 md:w-20 lg:w-24 text-right font-bold text-sm md:text-base lg:text-lg border-2 border-[#2BAE66]"
                      />
                    </div>
                    <Slider
                      value={[timePeriod]}
                      onValueChange={(value) => setTimePeriod(value[0])}
                      min={1}
                      max={30}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-xs md:text-sm text-gray-600">
                      <span>1 Year</span>
                      <span>30 Years</span>
                    </div>
                  </div>
                </div>

                {/* Formula Display */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border-2 border-[#2BAE66]/20">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-base md:text-lg">
                    <Calculator className="w-5 h-5 mr-2" />
                    Simple Interest Formula
                  </h3>
                  <div className="bg-white p-4 rounded border border-gray-200 font-mono text-sm md:text-base text-center">
                    SI = (P × R × T) / 100
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 mt-3">
                    Where P = Principal, R = Rate (% per annum), T = Time (years)
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 text-white sticky top-6">
                <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3" />
                  Results
                </h2>

                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
                    <p className="text-white/80 text-xs md:text-sm mb-2">Principal Amount</p>
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold break-words">
                      {formatCurrency(results.principalAmount)}
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
                    <p className="text-white/80 text-xs md:text-sm mb-2">Simple Interest</p>
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold break-words">
                      {formatCurrency(results.simpleInterest)}
                    </p>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 md:p-6 border-2 border-white/30">
                    <p className="text-white/90 text-xs md:text-sm mb-2 font-semibold">Total Amount</p>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold break-words">
                      {formatCurrency(results.totalAmount)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20 space-y-2 text-xs md:text-sm text-white/80">
                  <p>💰 Principal + Interest = Total Amount</p>
                  <p>📊 Interest Rate: {interestRate}% per annum</p>
                  <p>⏱️ Time Period: {timePeriod} {timePeriod === 1 ? 'year' : 'years'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="mt-12 md:mt-16 space-y-8 md:space-y-12">
            {/* What is Simple Interest */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                What is Simple Interest?
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  Simple Interest (SI) is a method of calculating interest on the original principal amount only. Unlike compound interest, simple interest does not include interest on accumulated interest from previous periods.
                </p>
                <p>
                  The formula for simple interest is straightforward: <strong>SI = (P × R × T) / 100</strong>, where P is the principal amount, R is the annual interest rate, and T is the time period in years.
                </p>
                <p>
                  Simple interest is commonly used for short-term loans, certain types of deposits, and educational calculations. It's easier to understand and calculate compared to compound interest.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-lg">
                    <IndianRupee className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    When is SI Used?
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                    <li>✓ Personal loans (short-term)</li>
                    <li>✓ Car loans (some banks)</li>
                    <li>✓ Education loans</li>
                    <li>✓ Fixed deposits (simple)</li>
                    <li>✓ Business credit lines</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-lg">
                    <Percent className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    SI vs Compound Interest
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                    <li>✓ SI: Interest on principal only</li>
                    <li>✓ CI: Interest on interest too</li>
                    <li>✓ SI: Lower total interest</li>
                    <li>✓ CI: Higher returns/payments</li>
                    <li>✓ SI: Simpler calculation</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-8">
                Simple Interest FAQs
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    How to calculate simple interest?
                  </h3>
                  <p className="text-gray-700">
                    Use the formula: SI = (P × R × T) / 100. For example, on ₹1,00,000 at 6% for 3 years: SI = (100000 × 6 × 3) / 100 = ₹18,000. Total amount = ₹1,00,000 + ₹18,000 = ₹1,18,000.
                  </p>
                </div>

                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    What is the difference between simple and compound interest?
                  </h3>
                  <p className="text-gray-700">
                    Simple interest is calculated only on the principal amount throughout the loan period. Compound interest is calculated on the principal plus accumulated interest, resulting in higher total interest over time.
                  </p>
                </div>

                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    Which loans use simple interest in India?
                  </h3>
                  <p className="text-gray-700">
                    Some education loans, short-term personal loans, and certain business loans use simple interest. However, most home loans, car loans, and credit cards use compound interest (reducing balance method).
                  </p>
                </div>

                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    Can I use this for monthly calculations?
                  </h3>
                  <p className="text-gray-700">
                    Yes! Convert time to years: For 6 months, use T = 0.5 years. For monthly rate, use R/12 and T in months. Example: 6% annual = 0.5% monthly.
                  </p>
                </div>

                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    Is simple interest better than compound interest?
                  </h3>
                  <p className="text-gray-700">
                    For borrowers, simple interest is better as total interest paid is less. For investors/savers, compound interest is better as it generates higher returns. The choice depends on whether you're lending or borrowing.
                  </p>
                </div>
              </div>
            </section>

            {/* Book Your Session CTA Section */}
            <section className="bg-gradient-to-r from-[#1A3D7C] via-[#2BAE66] to-[#1A3D7C] rounded-xl md:rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
              <div className="flex items-center justify-center mb-6">
                <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-[#FFC857] mr-3" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  Need Help with Interest Calculations?
                </h2>
              </div>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Our expert tutors can help you master simple interest, percentage calculations, and financial mathematics. Get personalized one-on-one guidance tailored to your learning style.
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
            </section>

            {/* Benefits Section */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <Target className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Benefits of Simple Interest Calculator
              </h2>
              <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Quick Loan Calculations
                    </h3>
                    <p className="text-white/90">
                      Instantly calculate interest on personal loans, car loans, or short-term borrowings. Perfect for understanding the true cost of borrowing before taking a loan.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Fixed Deposit Planning
                    </h3>
                    <p className="text-white/90">
                      Estimate returns on bank FDs, corporate deposits, or short-term investment instruments that use simple interest calculations for accurate financial planning.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Education Loan Analysis
                    </h3>
                    <p className="text-white/90">
                      Calculate interest during moratorium periods on education loans. Understand how much interest accumulates while you're still studying before repayment begins.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Business Cash Flow
                    </h3>
                    <p className="text-white/90">
                      For businesses offering credit terms to customers or taking short-term working capital loans. Calculate interest for accurate cash flow projections.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Transparent Calculations
                    </h3>
                    <p className="text-white/90">
                      Unlike compound interest, simple interest is straightforward and easy to understand. See exactly how your interest is calculated with no hidden complexities.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Compare Loan Offers
                    </h3>
                    <p className="text-white/90">
                      Evaluate different loan offers side by side. Compare interest rates, terms, and total interest amounts to make the most cost-effective borrowing decision.
                    </p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-[#FFC857] text-[#1A3D7C] rounded-lg">
                  <p className="font-semibold">
                    💡 Pro Tip: Simple interest is commonly used for car loans, personal loans, and short-term deposits. For long-term investments, compound interest typically offers better returns!
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
                    What is simple interest and how is it calculated?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Simple interest is calculated on the <strong>principal amount only</strong>, not on accumulated interest. The formula is: <strong>Interest = (Principal × Rate × Time) / 100</strong>. For example, ₹10,000 at 8% for 2 years gives ₹1,600 interest (10,000 × 8 × 2 / 100).
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How is simple interest different from compound interest?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    <strong>Simple interest</strong> is calculated only on the principal amount throughout the loan/investment period. <strong>Compound interest</strong> is calculated on principal plus accumulated interest. For example, ₹1 lakh at 10% for 3 years: Simple Interest = ₹30,000, Compound Interest = ₹33,100. The difference increases with time.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Which types of loans use simple interest?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    <strong>Car loans, personal loans, and some education loans</strong> often use simple interest calculations. Many short-term business loans, payday loans, and installment loans also use simple interest. However, always verify with your lender as calculation methods can vary.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Are bank fixed deposits calculated using simple interest?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Most bank FDs use <strong>compound interest</strong> (quarterly compounding), not simple interest. However, some <strong>short-term company deposits or specific FD schemes</strong> might use simple interest. Always check the terms before investing. Our calculator helps estimate returns for simple interest instruments.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Can I calculate interest for less than one year?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Yes! Enter the time in decimal format. For example: <strong>6 months = 0.5 years</strong>, 3 months = 0.25 years, 18 months = 1.5 years. The calculator works for any time period, whether days, months, or years - just convert to years.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    What's the formula to calculate principal if I know the interest?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    If you know the interest amount, rate, and time, you can find the principal using: <strong>Principal = (Interest × 100) / (Rate × Time)</strong>. For example, if you earned ₹5,000 interest at 10% for 2 years, the principal was ₹25,000.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How do I calculate the interest rate if I know principal and interest?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Use the formula: <strong>Rate = (Interest × 100) / (Principal × Time)</strong>. For example, if you paid ₹12,000 interest on a ₹1 lakh loan over 3 years, the interest rate was 4% per annum [(12,000 × 100) / (100,000 × 3) = 4%].
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Is simple interest better for borrowers or lenders?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    <strong>Simple interest is generally better for borrowers</strong> compared to compound interest, as you pay less total interest over time. For lenders/investors, compound interest yields better returns. That's why loans often use compound interest while some deposits use simple interest.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Does this calculator account for taxes on interest earned?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    No, this calculator shows <strong>gross interest before taxes</strong>. Interest earned on deposits is taxable as per your income tax slab. Banks deduct TDS if annual interest exceeds ₹40,000 (₹50,000 for senior citizens). Consult a tax advisor for post-tax calculations.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Can I use this for EMI calculations?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    This calculator is <strong>not designed for EMI loans</strong>. Most EMI loans (home, car, personal) use the reducing balance method with compound interest. For EMI calculations, you need a dedicated EMI calculator that factors in monthly payments and reducing principal balance.
                  </p>
                </div>
              </div>
            </section>

            {/* Smart Tips Section */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Smart Tips for Using Simple Interest
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl border border-gray-200">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Understand your loan type:</strong> Before using this calculator, confirm with your lender whether your loan uses simple or compound interest. Most home loans and credit cards use compound interest, while many car loans use simple interest.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Convert time periods correctly:</strong> Always convert months or days to years for accurate calculations. Remember: 1 month ≈ 0.0833 years, 6 months = 0.5 years, 90 days ≈ 0.25 years. This ensures your interest calculations are precise.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Compare before borrowing:</strong> Use this calculator to compare multiple loan offers. Even a 1% difference in interest rate can save thousands over the loan term. Always calculate total payable amount (principal + interest) before deciding.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Plan early repayment:</strong> With simple interest loans, paying off principal early can significantly reduce total interest. Since interest is calculated only on principal, reducing it sooner means less interest overall.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Factor in processing fees:</strong> While this calculator shows pure interest, real loans have processing fees, GST, and other charges. Add these to get the true cost of borrowing. Sometimes a slightly higher interest rate with lower fees is better.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Use for financial planning:</strong> When planning short-term investments or deposits, this calculator helps set realistic return expectations. For long-term goals, consider compound interest instruments for exponentially better returns.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Remember tax implications:</strong> Interest paid on certain loans (like home loans) offers tax benefits under Section 24 and 80EE. Interest earned on deposits is taxable. Factor in these tax considerations for accurate financial planning.
                    </p>
                  </li>
                </ul>
              </div>
            </section>

            {/* Related Calculators Section */}
            <section className="text-center mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-4">
                Explore More Calculators
              </h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Try our other financial calculators for comprehensive investment and loan planning
              </p>
              <Link href="/calculators">
                <Button className="bg-white text-[#1A3D7C] hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
                  View All Calculators
                </Button>
              </Link>
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
                  This calculator provides estimates only. Actual interest may vary based on lender terms. Consult a financial advisor for accurate information.
                </p>
              </div>
            </div>
            <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
              <p>&copy; 2025 The Tutor Bridge. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
