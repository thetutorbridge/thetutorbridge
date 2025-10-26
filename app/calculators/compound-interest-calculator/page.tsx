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

          <section className="mb-12">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>Compound Interest</strong> is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest which is calculated only on principal, compound interest grows exponentially as interest earns interest.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our <strong>Compound Interest Calculator</strong> helps you see how your money grows with different compounding frequencies. The more frequently interest is compounded, the faster your money grows—this is the true power of compounding!
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Albert Einstein reportedly called compound interest "the eighth wonder of the world," saying "he who understands it, earns it; he who doesn't, pays it." Start understanding and earning it today!
              </p>
            </div>
          </section>

          <section className="text-center py-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Want to Learn More About Compounding?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Our expert mentors can teach you about the power of compounding, investment strategies, and how to make your money work harder for you through smart financial planning.
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
