'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Home, Percent, IndianRupee, Clock } from 'lucide-react';
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

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-xl md:rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Try Our Other Calculators
              </h2>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Explore compound interest, EMI, SIP, and more financial calculators
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
