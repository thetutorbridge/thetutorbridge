'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Home, Lightbulb, CheckCircle, HelpCircle, Target, BarChart3, PieChart, DollarSign, Percent, IndianRupee, BookOpen, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CompoundInterestCalculatorPage() {
  const [principalAmount, setPrincipalAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(6);
  const [timePeriod, setTimePeriod] = useState<number>(5);
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>('yearly');

  const calculateCompoundInterest = () => {
    const P = principalAmount;
    const r = interestRate / 100;
    const t = timePeriod;
    
    let n = 1; // compounding frequency
    switch (compoundingFrequency) {
      case 'monthly': n = 12; break;
      case 'quarterly': n = 4; break;
      case 'halfyearly': n = 2; break;
      case 'yearly': n = 1; break;
    }

    // A = P(1 + r/n)^(nt)
    const totalAmount = P * Math.pow(1 + r / n, n * t);
    const totalInterest = totalAmount - P;

    return {
      principalAmount: P,
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
    };
  };

  const results = calculateCompoundInterest();

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
              <span className="hidden sm:inline">Compound Interest Calculator</span>
              <span className="sm:hidden">Compound Interest</span>
            </span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Calculator className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              Compound Interest Calculator India — Calculate CI with Different Frequencies
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Calculate compound interest with monthly, quarterly, half-yearly, and yearly compounding. See the power of compounding and how your money grows exponentially over time.
          </p>
          <div className="bg-white/10 p-3 md:p-4 rounded-xl mb-8">
            <p className="text-lg italic">
              Compound interest is the 8th wonder of the world!<br />
              <strong>Those who understand it, earn it. Those who don't, pay it.</strong>
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
                    Compound Interest Calculator
                  </h2>

                  <div className="mb-6 md:mb-8">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <Label htmlFor="principal-amount" className="text-sm md:text-base lg:text-lg font-semibold text-gray-700 flex-shrink-0">
                        Principal Amount
                      </Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <span className="text-xs md:text-sm text-gray-500">₹</span>
                        <Input
                          id="principal-amount"
                          type="number"
                          value={principalAmount}
                          onChange={(e) => setPrincipalAmount(Number(e.target.value))}
                          className="w-24 md:w-32 lg:w-40 text-right font-bold text-sm md:text-base lg:text-lg border-2 border-[#2BAE66]"
                          min="1000"
                          max="10000000"
                        />
                      </div>
                    </div>
                    <Slider
                      value={[principalAmount]}
                      onValueChange={(value) => setPrincipalAmount(value[0])}
                      min={1000}
                      max={1000000}
                      step={1000}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹1K</span>
                      <span>₹10 Lakh</span>
                    </div>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <Label htmlFor="interest-rate" className="text-sm md:text-base lg:text-lg font-semibold text-gray-700 flex-shrink-0">
                        Rate of Interest (p.a)
                      </Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Input
                          id="interest-rate"
                          type="number"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="w-16 md:w-20 lg:w-24 text-right font-bold text-sm md:text-base lg:text-lg border-2 border-[#2BAE66]"
                          min="1"
                          max="30"
                          step="0.1"
                        />
                        <span className="text-xs md:text-sm text-gray-500">%</span>
                      </div>
                    </div>
                    <Slider
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      min={1}
                      max={30}
                      step={0.1}
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
                          max="50"
                        />
                        <span className="text-xs md:text-sm text-gray-500">Yr</span>
                      </div>
                    </div>
                    <Slider
                      value={[timePeriod]}
                      onValueChange={(value) => setTimePeriod(value[0])}
                      min={1}
                      max={50}
                      step={1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 Yr</span>
                      <span>50 Yr</span>
                    </div>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <Label className="text-sm md:text-base lg:text-lg font-semibold text-gray-700 mb-3 block">
                      Compounding Frequency
                    </Label>
                    <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                      <SelectTrigger className="w-full border-2 border-[#2BAE66] text-sm md:text-base">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yearly">Yearly</SelectItem>
                        <SelectItem value="halfyearly">Half-Yearly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                      <strong className="text-[#1A3D7C]">Note:</strong> More frequent compounding results in higher returns. Monthly compounding gives better returns than yearly compounding at the same interest rate.
                    </p>
                  </div>
                </div>

                <div className="p-4 md:p-8 lg:p-10 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 flex items-center">
                    <BarChart3 className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#FFC857]" />
                    Your Investment Summary
                  </h2>

                  <div className="space-y-4 md:space-y-6">
                    <div className="bg-[#FFC857] p-4 md:p-6 rounded-xl shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#1A3D7C] text-xs md:text-sm font-medium">Total Amount</span>
                        <IndianRupee className="w-4 h-4 md:w-5 md:h-5 text-[#1A3D7C]" />
                      </div>
                      <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A3D7C] break-words">
                        {formatCurrency(results.totalAmount)}
                      </p>
                      <p className="text-xs text-[#1A3D7C]/70 mt-2">
                        Maturity value after {timePeriod} years
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 text-xs md:text-sm font-medium">Principal Amount</span>
                        <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-[#FFC857]" />
                      </div>
                      <p className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-white">
                        {formatCurrency(results.principalAmount)}
                      </p>
                      <p className="text-xs text-white/60 mt-2">
                        Your initial investment
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 text-xs md:text-sm font-medium">Total Interest</span>
                        <Percent className="w-4 h-4 md:w-5 md:h-5 text-[#FFC857]" />
                      </div>
                      <p className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#FFC857]">
                        {formatCurrency(results.totalInterest)}
                      </p>
                      <p className="text-xs text-white/60 mt-2">
                        Interest earned via {compoundingFrequency} compounding
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 md:mt-8 pt-6 border-t border-white/20">
                    <h3 className="text-base md:text-lg font-semibold mb-4 text-white">Investment Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-xs md:text-sm">Interest Rate:</span>
                        <span className="text-white font-bold text-sm md:text-base">{interestRate}% p.a.</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-xs md:text-sm">Return Gained:</span>
                        <span className="text-[#FFC857] font-bold text-sm md:text-base">
                          {((results.totalInterest / results.principalAmount) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-xs md:text-sm">Growth Multiple:</span>
                        <span className="text-white font-bold text-sm md:text-base">
                          {(results.totalAmount / results.principalAmount).toFixed(2)}x
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
              Benefits of Compound Interest Calculator
            </h2>
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <p className="text-lg text-white/90 leading-relaxed mb-6">
                Understanding compound interest is the foundation of wealth creation. Our calculator helps you visualize how your money grows exponentially when interest earns interest:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Exponential Growth Visualization
                  </h3>
                  <p className="text-white/90">See how compound interest creates exponential growth compared to simple interest. Over 20 years at 8%, ₹1L grows to ₹4.66L with compounding vs ₹2.6L with simple interest.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Compare Compounding Frequencies
                  </h3>
                  <p className="text-white/90">Understand the impact of yearly, half-yearly, quarterly, and monthly compounding. Higher frequency means faster growth and better returns on investments.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Investment Planning
                  </h3>
                  <p className="text-white/90">Plan fixed deposits, bonds, debt funds, and other compound interest investments. Calculate exact maturity amounts for different time periods and rates.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Loan Cost Understanding
                  </h3>
                  <p className="text-white/90">Understand true cost of loans with compound interest. Credit cards, personal loans compound monthly—see how quickly debt grows if unpaid.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Time Value of Money
                  </h3>
                  <p className="text-white/90">Calculate how long it takes to double your money at different interest rates. Apply Rule of 72 (Years to double = 72/Interest Rate) and verify with calculator.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Financial Literacy Tool
                  </h3>
                  <p className="text-white/90">Perfect for students learning about compound interest in mathematics or economics. Visualize abstract concepts with real money examples.</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-[#FFC857] text-[#1A3D7C] rounded-lg">
                <p className="font-semibold">
                  💡 Pro Tip: Albert Einstein called compound interest "the eighth wonder of the world"—those who understand it earn it, those who don't pay it! Start early to maximize exponential growth.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <HelpCircle className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Compound Interest Calculator FAQs
            </h2>
            <div className="space-y-4">

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">1. What is compound interest and how is it different from simple interest?</h3>
                <p className="text-gray-700">Compound interest is interest calculated on <strong>principal + accumulated interest</strong>, while simple interest is calculated only on principal. Formula: A = P(1 + r/n)^(nt). Example: ₹10,000 at 10% for 5 years gives ₹15,000 (simple) vs ₹16,105 (compound annually)—₹1,105 extra!</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">2. How does compounding frequency affect returns?</h3>
                <p className="text-gray-700"><strong>Higher frequency = better returns.</strong> ₹1L at 12% for 10 years: Yearly compounding = ₹3.11L, Quarterly = ₹3.26L, Monthly = ₹3.30L. Monthly compounding gives ₹19,000 more than yearly! Banks/FDs usually compound quarterly.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">3. What is the Rule of 72 in compound interest?</h3>
                <p className="text-gray-700">Quick formula to estimate doubling time: <strong>Years to double = 72 ÷ Interest Rate</strong>. At 8% rate, money doubles in 72/8 = 9 years. At 12%, it doubles in 6 years. Useful mental math for comparing investments!</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">4. Which investments use compound interest in India?</h3>
                <p className="text-gray-700"><strong>Investments:</strong> Fixed Deposits (quarterly), PPF (yearly), Debt Mutual Funds, Bonds, RDs. <strong>Loans:</strong> Credit cards (monthly), personal loans, home loans (reducing balance = compound-like). Most interest-bearing products use compounding.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">5. Can compound interest work against me?</h3>
                <p className="text-gray-700">Yes! With debt. <strong>Credit card debt compounds monthly</strong> at 36-42% annually. ₹50,000 unpaid becomes ₹73,000 in just 1 year with 3% monthly compounding. This is why minimum payment traps are dangerous—interest compounds on interest!</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">6. What's the power of starting early with compound interest?</h3>
                <p className="text-gray-700"><strong>Time is more powerful than amount!</strong> Investing ₹5,000/month from age 25-35 (₹6L invested) beats ₹5,000/month from 35-60 (₹15L invested) at 12% return. Starting 10 years early creates ₹1+ crore difference! Start young, let compounding work magic.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">7. How do banks calculate FD interest—simple or compound?</h3>
                <p className="text-gray-700">Banks use <strong>compound interest with quarterly compounding</strong> for most FDs. Some offer monthly interest payouts (like simple interest for cashflow) vs cumulative FDs (quarterly compounding for growth). Cumulative FDs give higher returns due to compounding.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">8. What is continuous compounding?</h3>
                <p className="text-gray-700">Theoretical maximum compounding where interest is calculated <strong>every instant (infinite frequency)</strong>. Formula: A = Pe^(rt). Used in advanced finance but rare in real investments. Monthly compounding is close enough for practical purposes.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">9. Does inflation reduce compound interest benefits?</h3>
                <p className="text-gray-700">Yes. Calculate <strong>real return = nominal return - inflation</strong>. If FD gives 7% compound interest but inflation is 6%, real growth is only 1%. Choose investments with returns beating inflation (8-10%+ for equity, 6-7% for debt).</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">10. Can I use this calculator for SIP or recurring investments?</h3>
                <p className="text-gray-700">No. This calculator is for <strong>one-time lump sum investments</strong> only. For monthly SIPs, use SIP Calculator which accounts for recurring deposits. Compound interest calculator assumes entire principal is invested upfront and compounds over time.</p>
              </div>

            </div>
          </section>

          {/* Tips Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Smart Tips for Maximizing Compound Interest
            </h2>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-200">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Start as early as possible:</strong> Time is the most powerful factor in compounding. Starting at 25 vs 35 can mean 2-3x more wealth at retirement, even with same monthly investment amount.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Choose higher compounding frequency:</strong> When comparing FDs/bonds, choose monthly or quarterly compounding over yearly. The difference grows significantly over 5-10 years.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Reinvest dividends and interest:</strong> Don't withdraw interest earned. Let it compound. Choose growth/cumulative options over dividend/interest payout options for maximum compounding benefit.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Focus on rate of return:</strong> 2-3% higher return rate has massive long-term impact. 10% vs 12% on ₹10L for 20 years = ₹67L vs ₹96L—₹29L difference just from 2% more!</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Avoid breaking investments early:</strong> Early withdrawal kills compounding. Last 5 years of 20-year investment generate more returns than first 10 years combined due to exponential growth.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Pay off high-interest debt first:</strong> Compound interest works against you in debt. Paying 18% credit card interest is worse than missing 8% FD returns. Always prioritize debt clearance.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>For students:</strong> Even small amounts compound to large sums. ₹1,000/month from age 20-30 at 12% becomes ₹2.3L. Leave it till 60 without adding more = ₹52L! Start your compounding journey early.</p>
                </li>
              </ul>
            </div>
          </section>

          {/* Book Your Session CTA Section */}
          <section className="text-center py-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] via-[#2BAE66] to-[#1A3D7C] text-white p-12 rounded-2xl shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-[#FFC857] mr-3" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  Need Help with Compound Interest?
                </h2>
              </div>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Our expert tutors can help you understand compound interest, exponential growth, and financial mathematics. Get personalized one-on-one guidance tailored to your learning style.
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
