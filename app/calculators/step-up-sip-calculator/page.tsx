'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Home, Lightbulb, CheckCircle, HelpCircle, Target, BarChart3, PieChart, DollarSign, Percent, IndianRupee } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function StepUpSipCalculatorPage() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(25000);
  const [annualStepUp, setAnnualStepUp] = useState<number>(10);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(10);

  const calculateStepUpSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    let totalInvested = 0;
    let maturityValue = 0;
    
    for (let year = 0; year < timePeriod; year++) {
      const yearlyAmount = monthlyInvestment * Math.pow(1 + annualStepUp / 100, year);
      const monthsInYear = 12;
      
      for (let month = 0; month < monthsInYear; month++) {
        totalInvested += yearlyAmount;
        const remainingMonths = (timePeriod - year) * 12 - month;
        const futureValue = yearlyAmount * Math.pow(1 + monthlyRate, remainingMonths);
        maturityValue += futureValue;
      }
    }

    return {
      investedAmount: Math.round(totalInvested),
      estimatedReturns: Math.round(maturityValue - totalInvested),
      totalValue: Math.round(maturityValue),
    };
  };

  const results = calculateStepUpSIP();

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
              <span className="hidden sm:inline">Step Up SIP Calculator</span>
              <span className="sm:hidden">Step Up SIP</span>
            </span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <TrendingUp className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              Step Up SIP Calculator India 2025 — Calculate Growing SIP Returns
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Calculate Step Up SIP returns with annual increment. Plan your growing investments that match your rising income and maximize wealth creation with auto-increment feature.
          </p>
          <div className="bg-white/10 p-3 md:p-4 rounded-xl mb-8">
            <p className="text-lg italic">
              Grow your SIP as your income grows!<br />
              <strong>Step Up SIP helps you invest more each year automatically.</strong>
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

      <main className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <section className="mb-16">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-4 md:p-8 lg:p-10 bg-white">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 md:mb-8 flex items-center">
                    <Calculator className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                    Calculate Your Step Up SIP
                  </h2>

                  <div className="mb-6 md:mb-8">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <Label htmlFor="monthly-investment" className="text-sm md:text-base lg:text-lg font-semibold text-gray-700 flex-shrink-0">
                        Monthly Investment
                      </Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <span className="text-xs md:text-sm text-gray-500">₹</span>
                        <Input
                          id="monthly-investment"
                          type="number"
                          value={monthlyInvestment}
                          onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                          className="w-24 md:w-32 lg:w-40 text-right font-bold text-sm md:text-base lg:text-lg border-2 border-[#2BAE66]"
                          min="500"
                          max="100000"
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
                      <span>₹1 Lakh</span>
                    </div>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <Label htmlFor="annual-stepup" className="text-sm md:text-base lg:text-lg font-semibold text-gray-700 flex-shrink-0">
                        Annual Step Up
                      </Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Input
                          id="annual-stepup"
                          type="number"
                          value={annualStepUp}
                          onChange={(e) => setAnnualStepUp(Number(e.target.value))}
                          className="w-16 md:w-20 lg:w-24 text-right font-bold text-sm md:text-base lg:text-lg border-2 border-[#2BAE66]"
                          min="0"
                          max="50"
                        />
                        <span className="text-xs md:text-sm text-gray-500">%</span>
                      </div>
                    </div>
                    <Slider
                      value={[annualStepUp]}
                      onValueChange={(value) => setAnnualStepUp(value[0])}
                      min={0}
                      max={50}
                      step={1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0%</span>
                      <span>50%</span>
                    </div>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <Label htmlFor="expected-return" className="text-sm md:text-base lg:text-lg font-semibold text-gray-700 flex-shrink-0">
                        Expected Return Rate
                      </Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Input
                          id="expected-return"
                          type="number"
                          value={expectedReturn}
                          onChange={(e) => setExpectedReturn(Number(e.target.value))}
                          className="w-16 md:w-20 lg:w-24 text-right font-bold text-sm md:text-base lg:text-lg border-2 border-[#2BAE66]"
                          min="1"
                          max="30"
                          step="0.5"
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

                  <div className="mb-6 md:mb-8">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <Label htmlFor="time-period" className="text-sm md:text-base lg:text-lg font-semibold text-gray-700 flex-shrink-0">
                        Time Period
                      </Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Input
                          id="time-period"
                          type="number"
                          value={timePeriod}
                          onChange={(e) => setTimePeriod(Number(e.target.value))}
                          className="w-16 md:w-20 lg:w-24 text-right font-bold text-sm md:text-base lg:text-lg border-2 border-[#2BAE66]"
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
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                      <strong className="text-[#1A3D7C]">Note:</strong> Step Up SIP automatically increases your monthly investment by the chosen percentage each year, helping you invest more as your income grows.
                    </p>
                  </div>
                </div>

                <div className="p-4 md:p-8 lg:p-10 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 flex items-center">
                    <BarChart3 className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#FFC857]" />
                    Your Step Up SIP Summary
                  </h2>

                  <div className="space-y-4 md:space-y-6">
                    <div className="bg-[#FFC857] p-4 md:p-6 rounded-xl shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#1A3D7C] text-xs md:text-sm font-medium">Total Value</span>
                        <IndianRupee className="w-4 h-4 md:w-5 md:h-5 text-[#1A3D7C]" />
                      </div>
                      <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A3D7C] break-words">
                        {formatCurrency(results.totalValue)}
                      </p>
                      <p className="text-xs text-[#1A3D7C]/70 mt-2">
                        Maturity amount after {timePeriod} years
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 text-xs md:text-sm font-medium">Invested Amount</span>
                        <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-[#FFC857]" />
                      </div>
                      <p className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-white">
                        {formatCurrency(results.investedAmount)}
                      </p>
                      <p className="text-xs text-white/60 mt-2">
                        Total contributions with step-up
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 text-xs md:text-sm font-medium">Est. Returns</span>
                        <Percent className="w-4 h-4 md:w-5 md:h-5 text-[#FFC857]" />
                      </div>
                      <p className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#FFC857]">
                        {formatCurrency(results.estimatedReturns)}
                      </p>
                      <p className="text-xs text-white/60 mt-2">
                        Returns at {expectedReturn}% p.a.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 md:mt-8 pt-6 border-t border-white/20">
                    <h3 className="text-base md:text-lg font-semibold mb-4 text-white">Investment Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-xs md:text-sm">Starting SIP:</span>
                        <span className="text-white font-bold text-sm md:text-base">{formatCurrency(monthlyInvestment)}/mo</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-xs md:text-sm">Annual Increment:</span>
                        <span className="text-[#FFC857] font-bold text-sm md:text-base">{annualStepUp}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-xs md:text-sm">Return Multiple:</span>
                        <span className="text-white font-bold text-sm md:text-base">
                          {(results.totalValue / results.investedAmount).toFixed(2)}x
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>Step Up SIP</strong> (also called Top-Up SIP) is an enhanced version of regular SIP where your monthly investment automatically increases by a fixed percentage every year. This helps you align your investments with your growing income and accelerate wealth creation.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our <strong>Step Up SIP Calculator</strong> helps you understand how much wealth you can create by gradually increasing your SIP amount each year. Perfect for salaried professionals expecting annual increments, business owners with growing income, or anyone planning long-term wealth creation.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                With typical annual salary increments of 10-15%, Step Up SIP ensures your investments grow proportionally, helping you build significantly larger corpus compared to regular fixed SIP.
              </p>
            </div>
          </section>

          <section className="text-center py-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Help Planning Your Step Up SIP?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Our expert mentors can guide you through Step Up SIP planning, mutual fund selection, and creating a systematic investment strategy that grows with your income.
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

      <footer className="bg-[#1A3D7C] text-white py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
                <span className="text-xl font-bold">The TutorBridge</span>
              </div>
              <p className="text-gray-300 mb-4">
                Empowering students with personalized education and career guidance for a brighter future.
              </p>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/study-resources" className="hover:text-[#2BAE66] transition-colors">Study Resources</Link></li>
                <li><Link href="/calculators" className="hover:text-[#2BAE66] transition-colors">Calculators</Link></li>
                <li><Link href="/doubt-solving" className="hover:text-[#2BAE66] transition-colors">Doubt Solving</Link></li>
                <li><Link href="/career-guidance" className="hover:text-[#2BAE66] transition-colors">Career Guidance</Link></li>
              </ul>
            </div>
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
