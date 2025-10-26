'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Wallet, Home, ArrowRight, TrendingDown, Shield, Clock, Calculator, DollarSign } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SWPCalculatorPage() {
  const [totalInvestment, setTotalInvestment] = useState<number>(500000);
  const [withdrawalPerMonth, setWithdrawalPerMonth] = useState<number>(10000);
  const [expectedReturn, setExpectedReturn] = useState<number>(8);
  const [timePeriod, setTimePeriod] = useState<number>(5);

  const calculateSWP = () => {
    let balance = totalInvestment;
    const monthlyReturn = expectedReturn / 12 / 100;
    const months = timePeriod * 12;
    let totalWithdrawal = 0;
    let monthsUntilExhaustion = 0;

    for (let i = 0; i < months; i++) {
      if (balance <= 0) {
        break;
      }

      // Withdraw at the beginning of the month
      const withdrawal = Math.min(withdrawalPerMonth, balance);
      balance -= withdrawal;
      totalWithdrawal += withdrawal;
      monthsUntilExhaustion = i + 1;

      // Apply returns on remaining balance
      if (balance > 0) {
        balance = balance * (1 + monthlyReturn);
      }
    }

    return {
      totalInvestment: totalInvestment,
      totalWithdrawal: Math.round(totalWithdrawal),
      finalValue: Math.round(Math.max(0, balance)),
      monthsUntilExhaustion: monthsUntilExhaustion,
      yearsUntilExhaustion: (monthsUntilExhaustion / 12).toFixed(1),
    };
  };

  const results = calculateSWP();

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
              <span className="hidden sm:inline">SWP Calculator</span>
              <span className="sm:hidden">SWP Calc</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Wallet className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              SWP Calculator
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Calculate Systematic Withdrawal Plan from your mutual fund investments. Plan regular monthly income from your corpus while your investment continues to grow.
          </p>
          <div className="bg-white/10 p-4 rounded-xl mb-8">
            <p className="text-lg italic">
              Generate Regular Income While Your Money Keeps Growing<br />
              <strong>Perfect for Retirement Planning & Financial Independence</strong>
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
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-[#2BAE66]" />
                  Plan Your Withdrawals
                </h2>

                <div className="space-y-6">
                  {/* Total Investment */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label className="text-gray-700 font-semibold">Total Investment</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">₹</span>
                        <Input
                          type="number"
                          value={totalInvestment}
                          onChange={(e) => setTotalInvestment(Number(e.target.value))}
                          className="w-32 text-right"
                        />
                      </div>
                    </div>
                    <Slider
                      value={[totalInvestment]}
                      onValueChange={(value) => setTotalInvestment(value[0])}
                      min={100000}
                      max={10000000}
                      step={10000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹1 Lakh</span>
                      <span>₹1 Cr</span>
                    </div>
                  </div>

                  {/* Withdrawal Per Month */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label className="text-gray-700 font-semibold">Withdrawal per Month</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">₹</span>
                        <Input
                          type="number"
                          value={withdrawalPerMonth}
                          onChange={(e) => setWithdrawalPerMonth(Number(e.target.value))}
                          className="w-32 text-right"
                        />
                      </div>
                    </div>
                    <Slider
                      value={[withdrawalPerMonth]}
                      onValueChange={(value) => setWithdrawalPerMonth(value[0])}
                      min={1000}
                      max={100000}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹1,000</span>
                      <span>₹1,00,000</span>
                    </div>
                  </div>

                  {/* Expected Return Rate */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label className="text-gray-700 font-semibold">Expected Return Rate (p.a)</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={expectedReturn}
                          onChange={(e) => setExpectedReturn(Number(e.target.value))}
                          className="w-24 text-right"
                          step="0.5"
                        />
                        <span className="text-sm text-gray-500">%</span>
                      </div>
                    </div>
                    <Slider
                      value={[expectedReturn]}
                      onValueChange={(value) => setExpectedReturn(value[0])}
                      min={1}
                      max={20}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1%</span>
                      <span>20%</span>
                    </div>
                  </div>

                  {/* Time Period */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label className="text-gray-700 font-semibold">Time Period</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={timePeriod}
                          onChange={(e) => setTimePeriod(Number(e.target.value))}
                          className="w-24 text-right"
                        />
                        <span className="text-sm text-gray-500">Years</span>
                      </div>
                    </div>
                    <Slider
                      value={[timePeriod]}
                      onValueChange={(value) => setTimePeriod(value[0])}
                      min={1}
                      max={30}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 Year</span>
                      <span>30 Years</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] p-8 rounded-2xl shadow-xl text-white">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <TrendingDown className="w-6 h-6 mr-2 text-[#FFC857]" />
                  Your SWP Results
                </h2>

                <div className="space-y-4">
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur">
                    <p className="text-sm text-white/80 mb-1">Total Investment</p>
                    <p className="text-2xl font-bold text-[#FFC857]">
                      {formatCurrency(results.totalInvestment)}
                    </p>
                    <p className="text-xs text-white/70 mt-1">
                      Initial corpus amount
                    </p>
                  </div>

                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur">
                    <p className="text-sm text-white/80 mb-1">Total Withdrawal</p>
                    <p className="text-2xl font-bold text-[#FFC857]">
                      {formatCurrency(results.totalWithdrawal)}
                    </p>
                    <p className="text-xs text-white/70 mt-1">
                      ₹{withdrawalPerMonth.toLocaleString('en-IN')}/month for {results.yearsUntilExhaustion} years
                    </p>
                  </div>

                  <div className="bg-white/20 p-6 rounded-xl backdrop-blur border-2 border-[#FFC857]">
                    <p className="text-sm text-white/80 mb-1">Final Value</p>
                    <p className="text-4xl font-bold text-[#FFC857]">
                      {formatCurrency(results.finalValue)}
                    </p>
                    <p className="text-xs text-white/70 mt-2">
                      Remaining corpus after {timePeriod} years
                    </p>
                  </div>

                  {results.finalValue === 0 && (
                    <div className="bg-red-500/20 p-4 rounded-xl backdrop-blur border border-red-300">
                      <p className="text-sm font-semibold text-red-100 mb-1">
                        ⚠️ Corpus Exhausted!
                      </p>
                      <p className="text-xs text-red-100">
                        Your corpus will be depleted in {results.yearsUntilExhaustion} years ({results.monthsUntilExhaustion} months). Consider reducing monthly withdrawal or increasing expected returns.
                      </p>
                    </div>
                  )}

                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur">
                    <p className="text-xs text-white/70">
                      <strong>Note:</strong> Returns are calculated monthly and compounded. Actual returns may vary based on market conditions and fund performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What is SWP Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-[#1A3D7C]/5 to-[#2BAE66]/5 p-8 rounded-2xl border border-[#2BAE66]/20">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                What is a Systematic Withdrawal Plan (SWP)?
              </h2>
              <div className="prose max-w-none text-gray-700 space-y-4">
                <p className="text-lg leading-relaxed">
                  A Systematic Withdrawal Plan (SWP) is a mutual fund facility that allows investors to withdraw a fixed amount at regular intervals (monthly, quarterly, or annually) from their mutual fund investments. It's the opposite of a Systematic Investment Plan (SIP), where you invest regularly.
                </p>
                <p className="text-lg leading-relaxed">
                  With SWP, you can generate a regular income stream from your accumulated corpus while the remaining amount continues to stay invested and earn returns. This makes it an ideal tool for retirees who need regular income, or anyone looking for financial independence without liquidating their entire investment.
                </p>
                <p className="text-lg leading-relaxed">
                  The key benefit of SWP is that your remaining corpus continues to grow based on market performance, potentially extending the life of your investment beyond what you'd get from a simple withdrawal strategy.
                </p>
              </div>
            </div>
          </section>

          {/* How SWP Works */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
              How Does SWP Work?
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">Invest Your Corpus</h3>
                <p className="text-gray-700">
                  Start by investing a lump sum amount in a mutual fund scheme of your choice. This forms your corpus for regular withdrawals.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">Set Withdrawal Amount</h3>
                <p className="text-gray-700">
                  Specify the fixed amount you want to withdraw regularly (monthly/quarterly) and the frequency of withdrawals.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">Regular Withdrawals</h3>
                <p className="text-gray-700">
                  The specified amount is automatically credited to your bank account at regular intervals as per your instruction.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">Corpus Keeps Growing</h3>
                <p className="text-gray-700">
                  The remaining amount continues to stay invested and earn returns, potentially growing your corpus even while withdrawing.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Benefits of Systematic Withdrawal Plan
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <DollarSign className="w-8 h-8 text-[#FFC857] flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#FFC857] mb-2 text-lg">Regular Income Stream</h3>
                    <p className="text-white/90">
                      Generate a fixed monthly income from your investments, perfect for retirees, homemakers, or anyone needing regular cash flow without a fixed salary.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <TrendingDown className="w-8 h-8 text-[#FFC857] flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#FFC857] mb-2 text-lg">Tax Efficiency</h3>
                    <p className="text-white/90">
                      SWP is more tax-efficient than bank FD interest. Only capital gains are taxed, not the entire withdrawal amount. Long-term gains get indexation benefits.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Shield className="w-8 h-8 text-[#FFC857] flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#FFC857] mb-2 text-lg">Flexibility & Control</h3>
                    <p className="text-white/90">
                      Change withdrawal amount, pause withdrawals, or stop anytime. You have complete control over your money unlike fixed annuity plans.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="w-8 h-8 text-[#FFC857] flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#FFC857] mb-2 text-lg">Corpus Growth Potential</h3>
                    <p className="text-white/90">
                      Your remaining investment continues to earn market-linked returns, potentially growing your corpus even while you withdraw regularly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SWP vs Other Options */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
              SWP vs Other Income Options
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">💰 SWP from Mutual Funds</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-green-600 font-semibold">✓ Advantages:</p>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Tax-efficient (only gains taxed)</li>
                    <li>• Flexible withdrawal amounts</li>
                    <li>• Corpus continues to grow</li>
                    <li>• Can be paused/stopped anytime</li>
                  </ul>
                  <p className="text-red-600 font-semibold mt-3">✗ Disadvantages:</p>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Returns not guaranteed</li>
                    <li>• Market risk involved</li>
                    <li>• Corpus may deplete faster in bad markets</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">🏦 Bank FD Interest</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-green-600 font-semibold">✓ Advantages:</p>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Guaranteed returns</li>
                    <li>• No market risk</li>
                    <li>• Capital protection</li>
                    <li>• Easy to understand</li>
                  </ul>
                  <p className="text-red-600 font-semibold mt-3">✗ Disadvantages:</p>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Lower returns (5-7%)</li>
                    <li>• Full interest taxable as income</li>
                    <li>• Principal remains locked</li>
                    <li>• No growth potential</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">📊 Annuity Plans</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-green-600 font-semibold">✓ Advantages:</p>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Guaranteed lifetime income</li>
                    <li>• No management needed</li>
                    <li>• Fixed regular payout</li>
                    <li>• Suitable for risk-averse</li>
                  </ul>
                  <p className="text-red-600 font-semibold mt-3">✗ Disadvantages:</p>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Very low returns (4-6%)</li>
                    <li>• No flexibility once started</li>
                    <li>• Principal cannot be withdrawn</li>
                    <li>• No inflation protection</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Smart Tips Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
              Smart Tips for Using SWP
            </h2>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-1">Choose the Right Fund</h3>
                      <p className="text-gray-700 text-sm">
                        For SWP, balanced/hybrid funds or conservative equity funds work best. They provide steady returns with lower volatility compared to pure equity funds.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-1">Keep Withdrawal Rate Sustainable</h3>
                      <p className="text-gray-700 text-sm">
                        A good rule of thumb is to withdraw 4-6% of your corpus annually (0.33-0.5% monthly) to ensure your money lasts 20-25 years.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-1">Time Your Entry Wisely</h3>
                      <p className="text-gray-700 text-sm">
                        Start SWP when markets are doing well. Avoid starting during market lows as you'll redeem more units for the same withdrawal amount.
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
                      <h3 className="font-semibold text-[#1A3D7C] mb-1">Review and Rebalance</h3>
                      <p className="text-gray-700 text-sm">
                        Monitor your SWP performance annually. If corpus is depleting faster than expected, reduce withdrawal amount or shift to safer funds.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-1">Tax Planning Matters</h3>
                      <p className="text-gray-700 text-sm">
                        SWP after 1 year qualifies for long-term capital gains with indexation benefits (debt funds) or lower LTCG tax rates (equity funds).
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-1">Have an Emergency Buffer</h3>
                      <p className="text-gray-700 text-sm">
                        Keep 6-12 months of expenses in liquid funds or savings account separately. Don't rely solely on SWP for emergency needs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  1. What is the difference between SWP and dividend plans?
                </h3>
                <p className="text-gray-700">
                  In SWP, you decide the withdrawal amount and frequency - it's guaranteed and regular. Dividend plans pay dividends only when the fund declares them, which is uncertain and irregular. SWP provides predictable cash flow and is more tax-efficient as you're redeeming your own units (capital gains tax) versus receiving dividends (taxed as income).
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  2. How is SWP taxed?
                </h3>
                <p className="text-gray-700">
                  SWP taxation depends on the fund type and holding period. For equity funds: LTCG (>1 year) is taxed at 10% on gains above ₹1 lakh; STCG at 15%. For debt funds: LTCG (>3 years) gets indexation benefit, taxed at 20%; STCG taxed as per your slab. Only the capital gains portion is taxed, not the entire withdrawal amount, making it very tax-efficient.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  3. What is the ideal withdrawal rate for SWP?
                </h3>
                <p className="text-gray-700">
                  Financial experts recommend the "4% rule" - withdraw 4% of your initial corpus annually (0.33% monthly). This ensures your money lasts 25-30 years with moderate growth. Conservative investors can use 3-3.5%, while aggressive investors with higher expected returns can go up to 5-6%. Always factor in inflation and adjust withdrawal amounts periodically.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  4. Can I change my SWP amount or stop it?
                </h3>
                <p className="text-gray-700">
                  Yes, SWP offers complete flexibility. You can increase/decrease withdrawal amount, change frequency (monthly to quarterly), pause temporarily, or stop permanently anytime. Simply submit a request to your fund house or AMC. Changes typically take effect from the next withdrawal cycle. This flexibility makes SWP far superior to fixed annuity plans.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  5. Which mutual funds are best for SWP?
                </h3>
                <p className="text-gray-700">
                  Balanced/Hybrid funds (60-70% equity, 30-40% debt) are ideal for SWP as they provide stability with growth. Alternatives: Conservative Hybrid Funds (75-90% debt), Equity Savings Funds, or Balanced Advantage Funds. Avoid pure equity funds for SWP due to high volatility. For very conservative investors, short-duration or corporate bond funds work well but with lower returns.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  6. What happens if my SWP corpus gets exhausted?
                </h3>
                <p className="text-gray-700">
                  If withdrawals exceed returns consistently, your corpus will eventually deplete. The AMC will continue withdrawals until the balance becomes zero or falls below the withdrawal amount. You'll receive communication when balance is low. To prevent this: reduce withdrawal amount, choose funds with better returns, or top up your corpus periodically.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  7. Is SWP safe for retirees?
                </h3>
                <p className="text-gray-700">
                  SWP can be safe for retirees if done correctly. Choose low-volatility funds (balanced/hybrid), keep withdrawal rate conservative (3-4%), maintain emergency funds separately, and diversify across 2-3 fund categories. SWP is safer than relying solely on equity funds but carries more risk than bank FDs. It's best suited for retirees with moderate risk appetite seeking tax-efficient regular income.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  8. Should I start SWP immediately after retirement?
                </h3>
                <p className="text-gray-700">
                  Not necessarily. If markets are down during your retirement, wait for recovery before starting SWP. Meanwhile, use liquid funds or FDs for expenses. Starting SWP at market lows means redeeming more units per withdrawal, depleting corpus faster. Ideally, accumulate corpus 1-2 years before retirement and start SWP when NAV is reasonably high.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  9. Can I have multiple SWPs from different funds?
                </h3>
                <p className="text-gray-700">
                  Yes, you can set up multiple SWPs across different mutual funds and AMCs. This is actually a good diversification strategy. For example: ₹10,000/month from equity hybrid fund, ₹10,000 from debt fund, ₹5,000 from liquid fund. This diversification reduces risk and provides stability. Each SWP can have different withdrawal amounts and frequencies.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  10. How much corpus do I need to start SWP?
                </h3>
                <p className="text-gray-700">
                  There's no fixed minimum, but for effective SWP, you need a substantial corpus. If you need ₹25,000/month, you should have at least ₹50-75 lakhs corpus (using 4-6% annual withdrawal rate). For ₹50,000/month, aim for ₹1-1.5 crore. Smaller corpus means faster depletion. Calculate backward from your monthly needs using the 4% rule to determine required corpus.
                </p>
              </div>

            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Help Planning Your Financial Independence?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Our expert financial mentors can help you design the perfect SWP strategy for your retirement and income goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book-demo-class">
                  <button className="bg-[#FFC857] text-[#1A3D7C] px-8 py-3 rounded-xl font-semibold hover:bg-[#FFC857]/90 transition-colors">
                    Book Free Consultation
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
