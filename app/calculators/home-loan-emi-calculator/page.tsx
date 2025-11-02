'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Home, Lightbulb, CheckCircle, HelpCircle, Target, BarChart3, PieChart, DollarSign, Percent, Building2, IndianRupee, BookOpen, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function HomeLoanEMICalculatorPage() {
  // Calculator state
  const [loanAmount, setLoanAmount] = useState<number>(2500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);

  // Calculate EMI
  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure * 12;

    // EMI Formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                (Math.pow(1 + monthlyRate, months) - 1);

    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;

    return {
      monthlyEMI: Math.round(emi),
      principalAmount: principal,
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
    };
  };

  const results = calculateEMI();

  // Format currency
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

      {/* Breadcrumb Navigation */}
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
              <span className="hidden sm:inline">Home Loan EMI Calculator</span>
              <span className="sm:hidden">Home EMI</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Building2 className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              Home Loan EMI Calculator — Calculate Your Housing Loan in India
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Planning to buy your dream home? Use our free home loan EMI calculator to estimate monthly payments for housing loans. Calculate EMI, total interest, and affordability instantly for apartments, villas, and plots.
          </p>
          <div className="bg-white/10 p-3 md:p-4 rounded-xl mb-8">
            <p className="text-lg italic">
              Owning a home is a dream come true!<br />
              <strong>Calculate your home loan EMI and make it a reality.</strong>
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

      {/* Main Content */}
      <main className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">

          {/* Home Loan EMI Calculator Tool */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">

                {/* Left: Calculator Inputs */}
                <div className="p-8 lg:p-10 bg-white">
                  <h2 className="text-xl md:text-2xl lg:text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-8 flex items-center">
                    <Calculator className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                    Calculate Your Home Loan EMI
                  </h2>

                  {/* Loan Amount */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <Label htmlFor="loan-amount" className="text-lg font-semibold text-gray-700">
                        Loan Amount
                      </Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <span className="text-xs md:text-sm text-gray-500">₹</span>
                        <Input
                          id="loan-amount"
                          type="number"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(Number(e.target.value))}
                          className="w-24 md:w-32 lg:w-40 text-right font-bold text-sm md:text-base lg:text-lg border-2 border-[#2BAE66]"
                          min="100000"
                          max="50000000"
                        />
                      </div>
                    </div>
                    <Slider
                      value={[loanAmount]}
                      onValueChange={(value) => setLoanAmount(value[0])}
                      min={100000}
                      max={10000000}
                      step={50000}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹1 Lakh</span>
                      <span>₹1 Crore</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <Label htmlFor="interest-rate" className="text-lg font-semibold text-gray-700">
                        Rate of Interest (p.a.)
                      </Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Input
                          id="interest-rate"
                          type="number"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="w-16 md:w-20 lg:w-24 text-right font-bold text-sm md:text-base lg:text-lg border-2 border-[#2BAE66]"
                          min="6"
                          max="15"
                          step="0.1"
                        />
                        <span className="text-xs md:text-sm text-gray-500">%</span>
                      </div>
                    </div>
                    <Slider
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      min={6}
                      max={15}
                      step={0.1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>6%</span>
                      <span>15%</span>
                    </div>
                  </div>

                  {/* Loan Tenure */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <Label htmlFor="loan-tenure" className="text-lg font-semibold text-gray-700">
                        Loan Tenure
                      </Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Input
                          id="loan-tenure"
                          type="number"
                          value={loanTenure}
                          onChange={(e) => setLoanTenure(Number(e.target.value))}
                          className="w-16 md:w-20 lg:w-24 text-right font-bold text-sm md:text-base lg:text-lg border-2 border-[#2BAE66]"
                          min="5"
                          max="30"
                        />
                        <span className="text-xs md:text-sm text-gray-500">Yr</span>
                      </div>
                    </div>
                    <Slider
                      value={[loanTenure]}
                      onValueChange={(value) => setLoanTenure(value[0])}
                      min={5}
                      max={30}
                      step={1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5 Yr</span>
                      <span>30 Yr</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <strong className="text-[#1A3D7C]">Note:</strong> This calculator provides estimated EMI for home loans. Actual EMI may vary based on the lender's terms, processing fees, and your credit score. Interest rates typically range from 8-11% for home loans.
                    </p>
                  </div>
                </div>

                {/* Right: Results */}
                <div className="p-8 lg:p-10 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center">
                    <BarChart3 className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#FFC857]" />
                    Your Home Loan Summary
                  </h2>

                  {/* Results Cards */}
                  <div className="space-y-6">

                    {/* Monthly EMI */}
                    <div className="bg-[#FFC857] p-6 rounded-xl shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#1A3D7C] text-sm font-medium">Monthly EMI</span>
                        <IndianRupee className="w-5 h-5 text-[#1A3D7C]" />
                      </div>
                      <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A3D7C] break-words">
                        {formatCurrency(results.monthlyEMI)}
                      </p>
                      <p className="text-xs text-[#1A3D7C]/70 mt-2">
                        Pay this amount every month for {loanTenure * 12} months
                      </p>
                    </div>

                    {/* Principal Amount */}
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 text-sm font-medium">Principal Amount</span>
                        <DollarSign className="w-5 h-5 text-[#FFC857]" />
                      </div>
                      <p className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-white">
                        {formatCurrency(results.principalAmount)}
                      </p>
                      <p className="text-xs text-white/60 mt-2">
                        Loan amount for your home
                      </p>
                    </div>

                    {/* Total Interest */}
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 text-sm font-medium">Total Interest</span>
                        <Percent className="w-5 h-5 text-[#FFC857]" />
                      </div>
                      <p className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#FFC857]">
                        {formatCurrency(results.totalInterest)}
                      </p>
                      <p className="text-xs text-white/60 mt-2">
                        Interest payable over {loanTenure} {loanTenure === 1 ? 'year' : 'years'}
                      </p>
                    </div>

                    {/* Total Amount */}
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 text-sm font-medium">Total Amount Payable</span>
                        <PieChart className="w-5 h-5 text-[#FFC857]" />
                      </div>
                      <p className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-white">
                        {formatCurrency(results.totalAmount)}
                      </p>
                      <p className="text-xs text-white/60 mt-2">
                        Principal + Interest
                      </p>
                    </div>

                  </div>

                  {/* Loan Breakdown */}
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <h3 className="text-lg font-semibold mb-4 text-white">Loan Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm">Total Months:</span>
                        <span className="text-white font-bold">{loanTenure * 12} months</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm">Interest Percentage:</span>
                        <span className="text-[#FFC857] font-bold">
                          {((results.totalInterest / results.principalAmount) * 100).toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm">EMI/Loan Ratio:</span>
                        <span className="text-white font-bold">
                          {((results.monthlyEMI / results.principalAmount) * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Introduction Content */}
          <section className="mb-12">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Purchasing a home is one of the biggest financial milestones in life. Whether you're planning to buy your first apartment, a villa, or investing in property, a <strong>home loan EMI calculator</strong> helps you understand exactly how much you'll pay each month, making budgeting and financial planning easier.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                With <strong>The Tutor Bridge Home Loan EMI Calculator</strong>, you can instantly calculate monthly installments for your dream home. Simply enter the loan amount, interest rate, and repayment tenure to get a complete breakdown of your home loan—including monthly EMI, total interest, and overall cost.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Perfect for students planning their future investment, young professionals buying their first home, or families upgrading to a bigger property—our calculator provides accurate estimates in INR based on current market rates from major Indian banks and housing finance companies.
              </p>
            </div>
          </section>

          {/* What is a Home Loan EMI Calculator */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              What is a Home Loan EMI Calculator?
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                A <strong>home loan EMI calculator</strong> is an online tool specifically designed to help you calculate the monthly installment (EMI) for housing loans. It considers the loan amount, interest rate, and tenure to give you an accurate estimate of your home loan repayment.
              </p>

              <h3 className="text-xl font-semibold text-[#1A3D7C] mt-6 mb-4">Why use a home loan EMI calculator?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Know your exact monthly payment before committing to a property</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Compare loan offers from different banks and housing finance companies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Understand total interest cost on your housing loan</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Plan your budget to ensure affordable EMI payments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Decide on the optimal loan tenure and down payment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Check eligibility based on your monthly income</span>
                </li>
              </ul>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200 mt-6">
                <h4 className="text-lg font-semibold text-[#1A3D7C] mb-3">Home Loan Example:</h4>
                <p className="text-gray-700 mb-4">
                  You want to buy a home worth <strong>₹50,00,000</strong>. You pay <strong>₹10,00,000 as down payment</strong>, so you need a loan of <strong>₹40,00,000</strong> at <strong>8.5% interest</strong> for <strong>20 years</strong>.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Monthly EMI</p>
                    <p className="text-base md:text-lg font-bold text-[#1A3D7C]">₹34,699</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Principal</p>
                    <p className="text-base md:text-lg font-bold text-[#1A3D7C]">₹40,00,000</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Total Interest</p>
                    <p className="text-base md:text-lg font-bold text-[#2BAE66]">₹43,27,624</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Total Amount</p>
                    <p className="text-base md:text-lg font-bold text-[#1A3D7C]">₹83,27,624</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How the Calculator Can Help */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Target className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              How to Get the Best Home Loan Deal
            </h2>
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Improve Your Credit Score
                  </h3>
                  <p className="text-white/90">A credit score of 750+ gets you the lowest interest rates. Pay bills on time and reduce outstanding debts.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Higher Down Payment
                  </h3>
                  <p className="text-white/90">Pay at least 20% down payment to reduce loan amount, lower EMI, and get better interest rates.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Compare Multiple Lenders
                  </h3>
                  <p className="text-white/90">Banks, NBFCs, and housing finance companies—compare all options. Even 0.25% difference saves lakhs over 20 years.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Choose Right Tenure
                  </h3>
                  <p className="text-white/90">Shorter tenure means higher EMI but lower total interest. Balance monthly affordability with long-term savings.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Fixed vs Floating Rate
                  </h3>
                  <p className="text-white/90">Fixed rates provide stability; floating rates can be lower but vary. Choose based on your risk appetite.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Tax Benefits
                  </h3>
                  <p className="text-white/90">Claim deductions under Section 80C (principal) and Section 24 (interest) to reduce your tax burden significantly.</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-[#FFC857] text-[#1A3D7C] rounded-lg">
                <p className="font-semibold">
                  💡 Pro Tip: Use our calculator to compare different down payment and tenure scenarios. A ₹5 lakh higher down payment on ₹40L loan can save you ₹5-7 lakhs in interest over 20 years!
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <HelpCircle className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Home Loan FAQs
            </h2>
            <div className="space-y-4">

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">1. What is the typical down payment for home loans in India?</h3>
                <p className="text-gray-700">Most lenders require <strong>10-20% down payment</strong> of the property value. LTV (Loan-to-Value) ratio is typically 75-90%. Higher down payment means lower EMI and better interest rates.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">2. What is the maximum home loan tenure available?</h3>
                <p className="text-gray-700">Home loans can have tenure up to <strong>30 years (360 months)</strong>. Some lenders may limit based on your age at loan maturity (typically 60-70 years).</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">3. What are the current home loan interest rates in India?</h3>
                <p className="text-gray-700">Interest rates typically range from <strong>8% to 11% per annum</strong>. Rates vary based on lender, credit score, loan amount, and type (fixed vs floating).</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">4. Can I get home loan tax benefits?</h3>
                <p className="text-gray-700">Yes! Claim deductions: <strong>Section 80C</strong> (up to ₹1.5L on principal), <strong>Section 24</strong> (up to ₹2L on interest for self-occupied, unlimited for rented property).</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">5. What documents are needed for home loan?</h3>
                <p className="text-gray-700"><strong>Documents required:</strong> ID proof, address proof, income proof (salary slips/ITR), bank statements, property documents, passport photos. Self-employed need business proof and ITR.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">6. Should I choose fixed or floating interest rate?</h3>
                <p className="text-gray-700"><strong>Fixed rate:</strong> EMI remains constant, suitable if rates are expected to rise. <strong>Floating rate:</strong> EMI changes with market rates, generally 0.5-1% lower initially.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">7. Can I prepay my home loan without penalty?</h3>
                <p className="text-gray-700">For <strong>floating rate loans</strong>, prepayment is allowed without penalty. For <strong>fixed rate loans</strong>, prepayment charges may apply (typically 2-3%).</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">8. What is home loan eligibility criteria?</h3>
                <p className="text-gray-700">Key factors: <strong>Age</strong> (21-65 years), <strong>Income</strong> (minimum ₹25,000/month), <strong>Credit score</strong> (750+), <strong>Employment</strong> (salaried/self-employed), and <strong>existing debts</strong>.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">9. Can students or first-time buyers get home loans?</h3>
                <p className="text-gray-700">Yes! First-time buyers often get <strong>0.05-0.25% interest rate concession</strong>. Students with job offers or income proof can apply. Co-applicant (parent) improves eligibility.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">10. What are the processing fees for home loans?</h3>
                <p className="text-gray-700">Processing fees range from <strong>0.25% to 1% of loan amount</strong> (usually ₹10,000 to ₹50,000). Some lenders waive it during festive offers.</p>
              </div>

            </div>
          </section>

          {/* Tips Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Smart Tips for Home Loan Borrowers
            </h2>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-200">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Check total cost, not just EMI:</strong> Lower EMI with longer tenure means much higher total interest. Calculate total cost before deciding.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Start with higher down payment:</strong> Every ₹1 lakh extra down payment saves ₹1-1.5 lakhs in interest over 20 years.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Prepay regularly:</strong> Even ₹10,000-20,000 annual prepayment can reduce tenure by 3-5 years and save lakhs in interest.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Compare EMI-to-income ratio:</strong> Keep total EMIs (all loans) below 50% of monthly income for financial stability.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Read the fine print:</strong> Check for hidden charges—processing fees, legal fees, prepayment penalties, late payment charges.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Get property verified:</strong> Ensure clear title, approved construction, no legal disputes before finalizing the loan.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>For students/first-time buyers:</strong> Build credit score early, maintain stable employment, consider joint application with parents for better rates.</p>
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
                  Need Help with Loan Calculations?
                </h2>
              </div>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Our expert tutors can help you understand EMI calculations, interest rates, and financial mathematics. Get personalized one-on-one guidance tailored to your learning style.
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
