'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Home, Lightbulb, Building2, IndianRupee, Percent, ArrowRight, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SbiSipCalculatorPage() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(10);

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = timePeriod * 12;

    // FV = P × [(1 + r)^n - 1] / r × (1 + r)
    const futureValue =
      monthlyInvestment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);

    const investedAmount = monthlyInvestment * months;
    const estimatedReturns = futureValue - investedAmount;

    return {
      investedAmount: Math.round(investedAmount),
      estimatedReturns: Math.round(estimatedReturns),
      totalValue: Math.round(futureValue),
    };
  };

  const results = calculateSIP();

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
                <div className="flex items-center mb-3">
                  <Building2 className="w-8 h-8 md:w-10 md:h-10 mr-3 text-white/90" />
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                    SBI SIP Calculator 2025
                  </h1>
                </div>
                <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl">
                  Calculate SIP and lumpsum returns for SBI mutual funds. Official SBI MF calculator for investment planning.
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
                <h2 className="text-xl md:text-2xl font-bold text-[#1A3D7C] mb-6 md:mb-8 flex items-center">
                  <Building2 className="w-6 h-6 mr-3 text-[#2BAE66]" />
                  SBI Mutual Fund SIP Calculator
                </h2>

                <div className="space-y-6 md:space-y-8">
                  {/* Monthly Investment */}
                  <div>
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <Label htmlFor="monthly-investment" className="text-gray-700 font-semibold flex-shrink-0 text-sm md:text-base">
                        Monthly SIP Amount (₹)
                      </Label>
                      <Input
                        id="monthly-investment"
                        type="number"
                        value={monthlyInvestment}
                        onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                        className="w-24 md:w-32 lg:w-40 text-right font-bold text-sm md:text-base lg:text-lg border-2 border-[#2BAE66]"
                      />
                    </div>
                    <Slider
                      value={[monthlyInvestment]}
                      onValueChange={(value) => setMonthlyInvestment(value[0])}
                      min={500}
                      max={100000}
                      step={500}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-xs md:text-sm text-gray-600">
                      <span>₹500</span>
                      <span>₹1,00,000</span>
                    </div>
                  </div>

                  {/* Expected Return */}
                  <div>
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <Label htmlFor="expected-return" className="text-gray-700 font-semibold flex-shrink-0 text-sm md:text-base">
                        Expected Return Rate (% p.a.)
                      </Label>
                      <Input
                        id="expected-return"
                        type="number"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(Number(e.target.value))}
                        className="w-16 md:w-20 lg:w-24 text-right font-bold text-sm md:text-base lg:text-lg border-2 border-[#2BAE66]"
                        step="0.1"
                      />
                    </div>
                    <Slider
                      value={[expectedReturn]}
                      onValueChange={(value) => setExpectedReturn(value[0])}
                      min={1}
                      max={30}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-xs md:text-sm text-gray-600">
                      <span>1%</span>
                      <span>30%</span>
                    </div>
                  </div>

                  {/* Time Period */}
                  <div>
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <Label htmlFor="time-period" className="text-gray-700 font-semibold flex-shrink-0 text-sm md:text-base">
                        Investment Period (Years)
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
                      max={40}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-xs md:text-sm text-gray-600">
                      <span>1 Year</span>
                      <span>40 Years</span>
                    </div>
                  </div>
                </div>

                {/* Popular SBI Funds */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border-2 border-[#2BAE66]/20">
                  <h3 className="font-bold text-[#1A3D7C] mb-4 flex items-center text-base md:text-lg">
                    <Building2 className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    Popular SBI Mutual Funds
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <p className="font-semibold">SBI Bluechip Fund</p>
                      <p className="text-xs text-gray-600">Large Cap Fund</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <p className="font-semibold">SBI Small Cap Fund</p>
                      <p className="text-xs text-gray-600">Small Cap Fund</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <p className="font-semibold">SBI Equity Hybrid Fund</p>
                      <p className="text-xs text-gray-600">Balanced Advantage</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <p className="font-semibold">SBI Technology Fund</p>
                      <p className="text-xs text-gray-600">Sectoral Fund</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 text-white sticky top-6">
                <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3" />
                  SBI SIP Returns
                </h2>

                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
                    <p className="text-white/80 text-xs md:text-sm mb-2">Total Investment</p>
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold break-words">
                      {formatCurrency(results.investedAmount)}
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
                    <p className="text-white/80 text-xs md:text-sm mb-2">Estimated Returns</p>
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-green-300">
                      {formatCurrency(results.estimatedReturns)}
                    </p>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 md:p-6 border-2 border-white/30">
                    <p className="text-white/90 text-xs md:text-sm mb-2 font-semibold">Total Value</p>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold break-words">
                      {formatCurrency(results.totalValue)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20 space-y-2 text-xs md:text-sm text-white/80">
                  <p>💰 Monthly SIP: {formatCurrency(monthlyInvestment)}</p>
                  <p>📈 Expected Return: {expectedReturn}% p.a.</p>
                  <p>⏱️ Investment Period: {timePeriod} {timePeriod === 1 ? 'year' : 'years'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="mt-12 md:mt-16 space-y-8 md:space-y-12">
            {/* About SBI Mutual Funds */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                About SBI Mutual Fund
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  SBI Mutual Fund is one of India's largest and most trusted mutual fund houses, managed by SBI Funds Management Private Limited. With a strong track record and wide range of investment options, SBI MF has been a preferred choice for millions of Indian investors.
                </p>
                <p>
                  SBI offers various mutual fund schemes including equity funds, debt funds, hybrid funds, and sectoral funds. Their funds are known for professional fund management, transparency, and competitive returns.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-lg">
                    <Building2 className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    Why SBI MF?
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                    <li>✓ Trusted brand with SBI backing</li>
                    <li>✓ Wide range of fund options</li>
                    <li>✓ Professional fund management</li>
                    <li>✓ Transparent operations</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-lg">
                    <IndianRupee className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    Investment Benefits
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                    <li>✓ Start SIP from ₹500/month</li>
                    <li>✓ Tax benefits under 80C (ELSS)</li>
                    <li>✓ Power of compounding</li>
                    <li>✓ Easy online investment</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-lg">
                    <TrendingUp className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    Fund Categories
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                    <li>✓ Equity Funds (Growth)</li>
                    <li>✓ Debt Funds (Stability)</li>
                    <li>✓ Hybrid Funds (Balanced)</li>
                    <li>✓ Tax Saver (ELSS)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-8">
                SBI SIP Calculator FAQs
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    What is the minimum SIP amount in SBI mutual funds?
                  </h3>
                  <p className="text-gray-700">
                    You can start a SIP in SBI mutual funds with as low as ₹500 per month. However, for better wealth creation, it's recommended to invest at least ₹1,000-₹5,000 per month based on your financial goals.
                  </p>
                </div>

                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    How to start SBI SIP online?
                  </h3>
                  <p className="text-gray-700">
                    You can start SBI SIP online through the SBI MF website, their mobile app, or through online investment platforms like Groww, Zerodha Coin, or Paytm Money. Complete your KYC, select your fund, and set up auto-debit for monthly SIP.
                  </p>
                </div>

                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    Which is the best SBI mutual fund for SIP?
                  </h3>
                  <p className="text-gray-700">
                    The best SBI fund depends on your risk profile and goals. For long-term growth, consider SBI Bluechip Fund (large cap) or SBI Small Cap Fund. For balanced approach, SBI Equity Hybrid Fund is good. For tax saving, opt for SBI Tax Advantage Fund (ELSS).
                  </p>
                </div>

                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    What returns can I expect from SBI SIP?
                  </h3>
                  <p className="text-gray-700">
                    Historical returns vary by fund type. SBI equity funds have delivered 10-15% average annual returns over long periods, while debt funds give 6-8%. However, past performance doesn't guarantee future returns. Always invest based on your goals and risk appetite.
                  </p>
                </div>

                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    Can I stop or pause my SBI SIP?
                  </h3>
                  <p className="text-gray-700">
                    Yes, you can pause or stop your SBI SIP anytime without penalty. You can also modify the SIP amount, change the date, or increase/decrease the installment. SIPs offer complete flexibility unlike traditional fixed deposits or insurance policies.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-xl md:rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Explore More Investment Calculators
              </h2>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Plan your investments with our comprehensive suite of financial calculators
              </p>
              <Link href="/calculators">
                <Button className="bg-white text-[#1A3D7C] hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
                  View All Calculators
                </Button>
              </Link>
            </section>
          </div>
        </div>

        {/* Book Your Session CTA */}
        <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Need Help with SIP & Investment Mathematics?
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                Our expert tutors can help you understand SIP calculations, compound interest, and investment planning concepts. Get personalized one-on-one guidance tailored to your learning style.
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
                  This calculator provides estimates only. Mutual fund investments are subject to market risks. Please read scheme documents carefully before investing.
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
