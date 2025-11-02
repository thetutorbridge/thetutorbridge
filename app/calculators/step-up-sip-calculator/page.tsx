'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Home, Lightbulb, CheckCircle, HelpCircle, Target, BarChart3, PieChart, DollarSign, Percent, IndianRupee, ArrowRight, BookOpen } from 'lucide-react';
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

          {/* Benefits Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Target className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Benefits of Step Up SIP Calculator
            </h2>
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <p className="text-lg text-white/90 leading-relaxed mb-6">
                Step Up SIP is a powerful wealth creation strategy that grows with your income. Our calculator helps you plan systematic investments that match your career growth:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Accelerated Wealth Creation
                  </h3>
                  <p className="text-white/90">Build significantly larger corpus compared to regular SIP. With 10% annual step-up, you can accumulate 30-40% more wealth over 20 years.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Inflation-Adjusted Investing
                  </h3>
                  <p className="text-white/90">Your investments grow with inflation and salary increments, maintaining purchasing power and ensuring real wealth accumulation.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Disciplined Saving Habit
                  </h3>
                  <p className="text-white/90">Automatically increase your savings as income grows. Perfect for maintaining a consistent savings rate throughout your career.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Goal-Based Planning
                  </h3>
                  <p className="text-white/90">Calculate exact step-up percentage needed to reach retirement, child education, or home purchase goals with growing SIP amounts.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Compare Scenarios
                  </h3>
                  <p className="text-white/90">Test different step-up percentages (5%, 10%, 15%) to find the optimal balance between current affordability and future wealth.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Flexible Strategy
                  </h3>
                  <p className="text-white/90">Start small and grow big. Begin with ₹5,000/month and let it grow to ₹20,000+ over 10 years with 15% annual step-up.</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-[#FFC857] text-[#1A3D7C] rounded-lg">
                <p className="font-semibold">
                  💡 Pro Tip: Match your step-up percentage with your expected annual increment. If you get 10-12% salary hike, set 10% step-up to maintain the same financial impact!
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <HelpCircle className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Step Up SIP Calculator FAQs
            </h2>
            <div className="space-y-4">

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">1. What is Step Up SIP or Top Up SIP?</h3>
                <p className="text-gray-700">Step Up SIP (also called Top-Up SIP) is a mutual fund investment where your <strong>monthly SIP amount automatically increases by a fixed percentage every year</strong>. For example, if you start with ₹5,000/month with 10% annual step-up, it becomes ₹5,500 in year 2, ₹6,050 in year 3, and so on.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">2. How much more wealth can I create with Step Up SIP vs Regular SIP?</h3>
                <p className="text-gray-700">Step Up SIP can help you accumulate <strong>30-50% more wealth</strong> compared to regular SIP over 15-20 years. Example: ₹10,000/month for 20 years at 12% return gives ₹99 lakhs with regular SIP, but ₹1.35 crores with 10% annual step-up—36% more!</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">3. What should be the ideal step-up percentage?</h3>
                <p className="text-gray-700"><strong>10-15% annual step-up is ideal</strong> for most investors. Match it with your expected salary increment. Conservative: 5-7%, Moderate: 10-12%, Aggressive: 15-20%. Higher step-up creates more wealth but ensure it remains affordable as amounts increase.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">4. Which mutual funds offer Step Up SIP facility?</h3>
                <p className="text-gray-700">Most major mutual funds in India offer Step Up SIP: <strong>SBI, HDFC, ICICI Prudential, Axis, Kotak, Nippon India, Mirae Asset</strong>, and others. You can set it up through their websites, apps, or investment platforms like Groww, Zerodha Coin, Paytm Money.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">5. Can I change the step-up percentage later?</h3>
                <p className="text-gray-700">Yes, but you need to <strong>cancel the existing SIP and start a new one</strong> with different step-up percentage. Some AMCs allow modification through customer service. Plan carefully to avoid frequent changes as it affects rupee cost averaging.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">6. When does the step-up happen—monthly or yearly?</h3>
                <p className="text-gray-700">Step-up happens <strong>yearly (12 months after SIP start date)</strong>. If you start ₹10,000/month SIP on 5th Jan 2025 with 10% step-up, it increases to ₹11,000 from 5th Jan 2026. The amount remains same for all 12 months of each year.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">7. Is Step Up SIP better for students or working professionals?</h3>
                <p className="text-gray-700">Step Up SIP is <strong>perfect for working professionals</strong> with annual increments. Students can start regular SIP and convert to step-up once employed. Salaried professionals benefit most as SIP grows with salary, maintaining same financial impact.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">8. Can I skip or stop the step-up increase in any year?</h3>
                <p className="text-gray-700">Most AMCs <strong>don't allow pausing step-up for specific years</strong>. You can stop the entire SIP, reduce the amount manually, or let it continue. If facing financial difficulty, consider reducing step-up percentage or converting to regular fixed SIP.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">9. What are the tax benefits of Step Up SIP?</h3>
                <p className="text-gray-700">Same as regular SIP: <strong>ELSS funds qualify for Section 80C deduction</strong> (up to ₹1.5L). Long-term capital gains (LTCG) above ₹1.25L taxed at 12.5%, short-term at 20%. Step-up doesn't change tax treatment but creates more wealth to optimize tax planning.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">10. Can I do Step Up SIP in multiple funds simultaneously?</h3>
                <p className="text-gray-700">Yes! You can set up <strong>Step Up SIP in multiple mutual funds</strong> with different step-up percentages. For example: 10% step-up in equity fund, 5% in hybrid fund. Diversify across large-cap, mid-cap, and hybrid funds for balanced portfolio growth.</p>
              </div>

            </div>
          </section>

          {/* Tips Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Smart Tips for Step Up SIP Investors
            </h2>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-200">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Match step-up with salary growth:</strong> If you get 10% annual increment, set 10% step-up. This maintains the same financial impact while building wealth as your income grows.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Start conservative, scale gradually:</strong> Begin with 5-7% step-up if unsure. You can always start a new SIP with higher step-up later. It's better to continue than stop due to unaffordable amounts.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Calculate final SIP amount beforehand:</strong> ₹10,000/month with 15% step-up becomes ₹40,000+ after 10 years. Ensure this remains affordable based on expected income growth.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Combine with regular SIP:</strong> Keep 70% in regular SIP (stable commitment) and 30% in step-up SIP (growth component). This balances affordability with wealth acceleration.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Use for long-term goals (10+ years):</strong> Step Up SIP works best for retirement, child's higher education, or wealth creation goals at least 10-15 years away. Short-term goals need predictable amounts.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Review annually after increment:</strong> After each salary hike, review if step-up % still aligns with your goals. You can start additional step-up SIPs if you receive bonuses or promotions.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>For students & early professionals:</strong> Start regular SIP while studying, convert to step-up SIP once you join work. This builds early investing habit and accelerates wealth when income grows.</p>
                </li>
              </ul>
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

      {/* Book Your Session CTA */}
      <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Need Help with Investment Calculations?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you understand step-up SIP calculations, compound interest, and investment mathematics. Get personalized one-on-one guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-demo-class">
                <Button className="bg-[#FFC857] hover:bg-[#FFC857]/90 text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                  Book Free Demo Class
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl transition-all duration-200">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
