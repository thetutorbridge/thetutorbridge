'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Home, Lightbulb, CheckCircle, HelpCircle, Target, BarChart3, PieChart, DollarSign, Percent, CreditCard, IndianRupee, BookOpen, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function EMICalculatorPage() {
  // Calculator state
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(10);

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
              <span className="hidden sm:inline">EMI Calculator</span>
              <span className="sm:hidden">EMI</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <CreditCard className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              EMI Calculator — Calculate Your Loan EMI & Interest in India
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Plan your loan repayment with our free EMI calculator. Whether it's a home loan, car loan, personal loan, or education loan—calculate your monthly installments, total interest, and repayment amount instantly.
          </p>
          <div className="bg-white/10 p-3 md:p-4 rounded-xl mb-8">
            <p className="text-lg italic">
              Smart borrowing starts with knowing your numbers.<br />
              <strong>Calculate your EMI and plan your finances wisely!</strong>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/calculators">
              <Button size="lg" variant="outline" className="border-2 border-white text-white rounded-xl px-8 py-4 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Calculators
              </Button>
            </Link>
            <Link href="/tutoring/free-consultation">
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

          {/* EMI Calculator Tool */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">

                {/* Left: Calculator Inputs */}
                <div className="p-8 lg:p-10 bg-white">
                  <h2 className="text-xl md:text-2xl lg:text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-8 flex items-center">
                    <Calculator className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                    Calculate Your EMI
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
                          min="10000"
                          max="100000000"
                        />
                      </div>
                    </div>
                    <Slider
                      value={[loanAmount]}
                      onValueChange={(value) => setLoanAmount(value[0])}
                      min={10000}
                      max={10000000}
                      step={10000}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹10K</span>
                      <span>₹1 Cr</span>
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
                          min="1"
                          max="30"
                        />
                        <span className="text-xs md:text-sm text-gray-500">Yr</span>
                      </div>
                    </div>
                    <Slider
                      value={[loanTenure]}
                      onValueChange={(value) => setLoanTenure(value[0])}
                      min={1}
                      max={30}
                      step={1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 Yr</span>
                      <span>30 Yr</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <strong className="text-[#1A3D7C]">Note:</strong> This calculator provides estimated EMI based on the loan amount, interest rate, and tenure you enter. Actual EMI may vary based on the lending institution's terms and conditions.
                    </p>
                  </div>
                </div>

                {/* Right: Results */}
                <div className="p-8 lg:p-10 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center">
                    <BarChart3 className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#FFC857]" />
                    Your Loan Summary
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
                        Original loan amount
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
                        <span className="text-white/80 text-sm">Principal/Total Ratio:</span>
                        <span className="text-white font-bold">
                          {((results.principalAmount / results.totalAmount) * 100).toFixed(1)}% / {((results.totalInterest / results.totalAmount) * 100).toFixed(1)}%
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
                An <strong>Equated Monthly Installment (EMI)</strong> is a fixed payment amount made by a borrower to a lender at a specified date each month. EMIs are used to pay off both the principal and interest on a loan over a set period, making loan repayment predictable and manageable.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                With <strong>The Tutor Bridge EMI Calculator</strong>, you can instantly calculate your monthly loan payments for various types of loans including home loans, car loans, personal loans, and education loans. Simply enter your loan amount, interest rate, and repayment tenure to get a complete breakdown of your EMI, total interest payable, and overall loan cost.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you're a student planning for education loans, a professional buying a home or car, or anyone considering a personal loan—our EMI calculator helps you make informed financial decisions with confidence. All calculations are in INR and follow the standard EMI formula used by banks and financial institutions in India.
              </p>
            </div>
          </section>

          {/* What is an EMI Calculator */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              What is an EMI Calculator?
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                An <strong>EMI calculator</strong> is a digital tool that helps you calculate the monthly installment you need to pay for a loan. It takes into account the loan amount (principal), the interest rate, and the loan tenure to compute your exact monthly payment.
              </p>

              <h3 className="text-xl font-semibold text-[#1A3D7C] mt-6 mb-4">Why use an EMI calculator?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Know your exact monthly payment before taking a loan</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Understand the total interest you'll pay over the loan tenure</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Compare different loan offers from various lenders</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Plan your monthly budget with accurate EMI estimates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Decide on the optimal loan tenure based on your repayment capacity</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-[#1A3D7C] mt-6 mb-4">How it works:</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The EMI calculator uses the following inputs:
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li><strong>Loan Amount (P):</strong> The principal amount you borrow</li>
                <li><strong>Interest Rate (R):</strong> Annual interest rate charged by the lender</li>
                <li><strong>Loan Tenure (N):</strong> Duration over which you'll repay the loan (in years)</li>
              </ul>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-lg font-semibold text-[#1A3D7C] mb-3 gap-2">EMI Formula:</h4>
                <div className="bg-white p-4 rounded-lg mb-4">
                  <p className="text-sm font-mono text-gray-700 mb-2">
                    EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
                  </p>
                  <p className="text-xs text-gray-600">Where:</p>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4">
                    <li>P = Principal loan amount</li>
                    <li>R = Monthly interest rate (Annual Rate / 12 / 100)</li>
                    <li>N = Loan tenure in months</li>
                  </ul>
                </div>

                <h4 className="text-lg font-semibold text-[#1A3D7C] mb-3 gap-2">Example Calculation:</h4>
                <p className="text-gray-700 mb-4">
                  Loan: <strong>₹10,00,000</strong> | Interest: <strong>8.5% p.a.</strong> | Tenure: <strong>10 years</strong>
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Monthly EMI</p>
                    <p className="text-lg font-bold text-[#1A3D7C]">₹12,384</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Principal</p>
                    <p className="text-lg font-bold text-[#1A3D7C]">₹10,00,000</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Total Interest</p>
                    <p className="text-lg font-bold text-[#2BAE66]">₹4,86,084</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Total Amount</p>
                    <p className="text-lg font-bold text-[#1A3D7C]">₹14,86,084</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How the EMI Calculator Can Help You */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6 flex items-center">
              <Target className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              How the EMI Calculator Can Help You
            </h2>
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <p className="text-lg text-white/90 leading-relaxed mb-6">
                Planning to take a loan? Our EMI calculator is an essential tool for smart borrowing. Here's how it helps:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Budget Planning
                  </h3>
                  <p className="text-white/90">Know your exact monthly obligation before committing to a loan, ensuring it fits your budget.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Loan Comparison
                  </h3>
                  <p className="text-white/90">Compare offers from different banks and choose the one with the lowest EMI or interest cost.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Tenure Optimization
                  </h3>
                  <p className="text-white/90">Experiment with different tenures to find the right balance between EMI amount and total interest.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Interest Transparency
                  </h3>
                  <p className="text-white/90">See exactly how much interest you'll pay over the loan period—no hidden surprises.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Education Loan Planning
                  </h3>
                  <p className="text-white/90">Students can plan their education loans for studying in India or abroad with accurate repayment estimates.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Financial Discipline
                  </h3>
                  <p className="text-white/90">Understanding EMI helps you borrow responsibly within your repayment capacity.</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-[#FFC857] text-[#1A3D7C] rounded-lg">
                <p className="font-semibold">
                  💡 Pro Tip: A shorter loan tenure means higher EMI but lower total interest. A longer tenure reduces EMI but increases overall interest cost. Choose based on your monthly budget and long-term financial goals.
                </p>
              </div>
            </div>
          </section>

          {/* Types of Loans in India */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6 flex items-center">
              <CreditCard className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Types of Loans You Can Calculate
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3 gap-2">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">🏠</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Home Loan</h3>
                </div>
                <p className="text-gray-700">Calculate EMI for home purchase or construction loans. Typical tenure: 10-30 years, Interest: 8-10% p.a.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3 gap-2">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">🚗</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Car Loan</h3>
                </div>
                <p className="text-gray-700">Plan your vehicle purchase with accurate EMI calculations. Typical tenure: 1-7 years, Interest: 7-12% p.a.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3 gap-2">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">💼</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Personal Loan</h3>
                </div>
                <p className="text-gray-700">Unsecured loans for various personal needs. Typical tenure: 1-5 years, Interest: 10-18% p.a.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3 gap-2">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">🎓</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Education Loan</h3>
                </div>
                <p className="text-gray-700">Fund your higher education in India or abroad. Typical tenure: 5-15 years, Interest: 8-14% p.a.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3 gap-2">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">🏢</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Business Loan</h3>
                </div>
                <p className="text-gray-700">Finance your business needs or expansion plans. Typical tenure: 1-10 years, Interest: 10-20% p.a.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3 gap-2">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">🏍️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Two-Wheeler Loan</h3>
                </div>
                <p className="text-gray-700">Finance bikes and scooters with affordable EMIs. Typical tenure: 1-5 years, Interest: 9-15% p.a.</p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Features of The Tutor Bridge EMI Calculator
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3 gap-2">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Instant Results</h3>
                </div>
                <p className="text-gray-700">Get EMI, interest, and total payment calculations instantly as you adjust the inputs.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3 gap-2">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Flexible Inputs</h3>
                </div>
                <p className="text-gray-700">Adjust loan amount (₹10K to ₹1 Cr), interest rate (1-30%), and tenure (1-30 years) with ease.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3 gap-2">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <PieChart className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Detailed Breakdown</h3>
                </div>
                <p className="text-gray-700">View principal amount, total interest, total payable amount, and principal-to-interest ratio clearly.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3 gap-2">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Accurate Formula</h3>
                </div>
                <p className="text-gray-700">Uses the standard EMI formula followed by all Indian banks and financial institutions.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3 gap-2">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">📱</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Mobile Responsive</h3>
                </div>
                <p className="text-gray-700">Calculate EMI on any device—desktop, tablet, or smartphone with seamless experience.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3 gap-2">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">🇮🇳</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">India-Specific</h3>
                </div>
                <p className="text-gray-700">All calculations in Indian Rupees (INR) tailored for the Indian lending market.</p>
              </div>
            </div>
          </section>

          {/* Step-by-Step Guide */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              How to Use the EMI Calculator
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-0.5">1</span>
                  <div>
                    <p className="text-gray-700"><strong>Enter the loan amount</strong> (₹) you wish to borrow using the slider or input field.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-0.5">2</span>
                  <div>
                    <p className="text-gray-700"><strong>Set the annual interest rate</strong> (%) offered by your lender. Check with your bank for current rates.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-0.5">3</span>
                  <div>
                    <p className="text-gray-700"><strong>Choose your loan tenure</strong> in years (how long you want to repay the loan).</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-0.5">4</span>
                  <div>
                    <p className="text-gray-700"><strong>View instant results</strong> showing:</p>
                    <ul className="ml-4 mt-2 space-y-1 text-gray-600">
                      <li>• Monthly EMI amount</li>
                      <li>• Principal loan amount</li>
                      <li>• Total interest payable</li>
                      <li>• Total amount to be repaid</li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-0.5">5</span>
                  <div>
                    <p className="text-gray-700"><strong>Experiment with different values</strong> to find the EMI that fits your budget and financial goals.</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6 flex items-center">
              <HelpCircle className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="space-y-4">

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">1. What is EMI in simple terms?</h3>
                <p className="text-gray-700">EMI stands for <strong>Equated Monthly Installment</strong>. It's a fixed amount you pay every month to repay a loan, including both principal and interest.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">2. How is EMI calculated?</h3>
                <p className="text-gray-700">EMI is calculated using the formula: <strong>EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]</strong>, where P is principal, R is monthly interest rate, and N is tenure in months.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">3. Does EMI include both principal and interest?</h3>
                <p className="text-gray-700">Yes, each EMI payment includes both principal repayment and interest charges. Initially, a larger portion goes toward interest, and gradually more goes toward the principal.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">4. What happens if I miss an EMI payment?</h3>
                <p className="text-gray-700">Missing EMI payments can result in <strong>late payment fees, penalty charges, negative impact on credit score,</strong> and in extreme cases, legal action by the lender. Always pay EMIs on time.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">5. Can I prepay my loan to reduce EMI burden?</h3>
                <p className="text-gray-700">Yes, most loans allow partial or full prepayment. Prepaying reduces your outstanding principal, which can either <strong>reduce your EMI or shorten the loan tenure</strong>. Check with your lender about prepayment charges.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">6. What is a good EMI-to-income ratio?</h3>
                <p className="text-gray-700">Financial experts recommend keeping your total EMI (all loans combined) below <strong>40-50% of your monthly income</strong> to maintain financial stability and avoid over-leverage.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">7. Should I choose a longer or shorter loan tenure?</h3>
                <p className="text-gray-700"><strong>Shorter tenure:</strong> Higher EMI but lower total interest. <strong>Longer tenure:</strong> Lower EMI but higher total interest. Choose based on your monthly budget and long-term financial goals.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">8. Are education loan EMIs different?</h3>
                <p className="text-gray-700">Education loans often have a <strong>moratorium period</strong> (during study + grace period) where you don't pay EMIs. EMI repayment typically starts after you complete your course and the grace period ends.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">9. Can EMI change during the loan tenure?</h3>
                <p className="text-gray-700">For <strong>fixed-rate loans</strong>, EMI remains constant. For <strong>floating-rate loans</strong>, EMI can change when the interest rate changes based on market conditions.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">10. Is this EMI calculator accurate?</h3>
                <p className="text-gray-700">Yes, our calculator uses the standard EMI formula followed by all Indian banks and NBFCs. However, actual EMI may vary slightly based on the lender's specific terms, processing fees, and other charges.</p>
              </div>

            </div>
          </section>

          {/* Tips Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Smart Tips for Managing Your Loan EMI
            </h2>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-200">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Borrow what you need:</strong> Don't over-borrow. Calculate your actual requirement and borrow only that amount.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Compare lenders:</strong> Different banks offer different interest rates. Use this calculator to compare offers and save on interest.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Maintain good credit score:</strong> A higher credit score (750+) can help you get lower interest rates and better loan terms.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Set up auto-debit:</strong> Automate EMI payments to avoid missing due dates and penalty charges.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Consider prepayment:</strong> Use bonuses or extra income to prepay and reduce your loan burden faster.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Read the fine print:</strong> Understand processing fees, prepayment charges, and other terms before signing the loan agreement.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>For students:</strong> Explore education loans with subsidized interest or government schemes that offer better terms for higher education.</p>
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
                  Need Help with Financial Calculations?
                </h2>
              </div>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Our expert tutors can help you master EMI calculations, understand interest rates, and excel in financial mathematics. Get personalized one-on-one guidance.
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
                <li><Link href="/homework-help" className="hover:text-[#2BAE66] transition-colors">Doubt Solving</Link></li>
                <li><Link href="/career-guidance" className="hover:text-[#2BAE66] transition-colors">Career Guidance</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p>info@thetutorbridge.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2026 The TutorBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
