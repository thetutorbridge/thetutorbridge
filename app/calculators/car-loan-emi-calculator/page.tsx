'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Home, Lightbulb, CheckCircle, HelpCircle, Target, BarChart3, PieChart, DollarSign, Percent, Car, IndianRupee, BookOpen, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CarLoanEMICalculatorPage() {
  // Calculator state
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [loanTenure, setLoanTenure] = useState<number>(5);

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
              <span className="hidden sm:inline">Car Loan EMI Calculator</span>
              <span className="sm:hidden">Car EMI</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Car className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              Car Loan EMI Calculator — Calculate Your Auto Loan in India
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Planning to buy your dream car? Use our free car loan EMI calculator to estimate monthly payments for new and used car loans. Calculate EMI, total interest, and down payment requirements instantly.
          </p>
          <div className="bg-white/10 p-3 md:p-4 rounded-xl mb-8">
            <p className="text-lg italic">
              Your dream car is closer than you think!<br />
              <strong>Calculate your car loan EMI and drive away with confidence.</strong>
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

          {/* Car Loan EMI Calculator Tool */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">

                {/* Left: Calculator Inputs */}
                <div className="p-8 lg:p-10 bg-white">
                  <h2 className="text-xl md:text-2xl lg:text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-8 flex items-center">
                    <Calculator className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                    Calculate Your Car Loan EMI
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
                          min="50000"
                          max="10000000"
                        />
                      </div>
                    </div>
                    <Slider
                      value={[loanAmount]}
                      onValueChange={(value) => setLoanAmount(value[0])}
                      min={50000}
                      max={5000000}
                      step={10000}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹50K</span>
                      <span>₹50 Lakh</span>
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
                          max="18"
                          step="0.1"
                        />
                        <span className="text-xs md:text-sm text-gray-500">%</span>
                      </div>
                    </div>
                    <Slider
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      min={6}
                      max={18}
                      step={0.1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>6%</span>
                      <span>18%</span>
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
                          max="7"
                        />
                        <span className="text-xs md:text-sm text-gray-500">Yr</span>
                      </div>
                    </div>
                    <Slider
                      value={[loanTenure]}
                      onValueChange={(value) => setLoanTenure(value[0])}
                      min={1}
                      max={7}
                      step={1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 Yr</span>
                      <span>7 Yr</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <strong className="text-[#1A3D7C]">Note:</strong> This calculator provides estimated EMI for car loans. Actual EMI may vary based on the lender's terms, processing fees, and your credit score. Interest rates typically range from 7-15% for new cars and 9-16% for used cars.
                    </p>
                  </div>
                </div>

                {/* Right: Results */}
                <div className="p-8 lg:p-10 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center">
                    <BarChart3 className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#FFC857]" />
                    Your Car Loan Summary
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
                        Loan amount for your car
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
                Buying a car is one of the most significant financial decisions you'll make. Whether you're planning to purchase a new car or a used vehicle, a <strong>car loan EMI calculator</strong> helps you understand exactly how much you'll pay each month, making budgeting and financial planning easier.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                With <strong>The Tutor Bridge Car Loan EMI Calculator</strong>, you can instantly calculate monthly installments for your dream car. Simply enter the loan amount, interest rate, and repayment tenure to get a complete breakdown of your car loan—including monthly EMI, total interest, and overall cost.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Perfect for students planning their first car purchase, young professionals upgrading their ride, or families buying a new vehicle—our calculator provides accurate estimates in INR based on current market rates from major Indian banks and NBFCs.
              </p>
            </div>
          </section>

          {/* What is a Car Loan EMI Calculator */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              What is a Car Loan EMI Calculator?
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                A <strong>car loan EMI calculator</strong> is an online tool specifically designed to help you calculate the monthly installment (EMI) for auto loans. It considers the loan amount, interest rate, and tenure to give you an accurate estimate of your car loan repayment.
              </p>

              <h3 className="text-xl font-semibold text-[#1A3D7C] mt-6 mb-4">Why use a car loan EMI calculator?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Know your exact monthly payment before visiting the dealership</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Compare loan offers from different banks and NBFCs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Understand total interest cost on your car loan</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Plan your budget to ensure affordable EMI payments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Decide between new car and used car financing options</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Determine the optimal down payment for lower EMI</span>
                </li>
              </ul>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200 mt-6">
                <h4 className="text-lg font-semibold text-[#1A3D7C] mb-3 gap-2">Car Loan Example:</h4>
                <p className="text-gray-700 mb-4">
                  You want to buy a car worth <strong>₹8,00,000</strong>. You pay <strong>₹2,00,000 as down payment</strong>, so you need a loan of <strong>₹6,00,000</strong> at <strong>9% interest</strong> for <strong>5 years</strong>.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Monthly EMI</p>
                    <p className="text-lg font-bold text-[#1A3D7C]">₹12,455</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Principal</p>
                    <p className="text-lg font-bold text-[#1A3D7C]">₹6,00,000</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Total Interest</p>
                    <p className="text-lg font-bold text-[#2BAE66]">₹1,47,304</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Total Amount</p>
                    <p className="text-lg font-bold text-[#1A3D7C]">₹7,47,304</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Car Loan Types */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6 flex items-center">
              <Car className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Types of Car Loans in India
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3 gap-2">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">🚗</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">New Car Loan</h3>
                </div>
                <p className="text-gray-700 mb-2">Finance a brand new car from showrooms and authorized dealers.</p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Interest: 7-11% p.a.</li>
                  <li>• Tenure: 1-7 years</li>
                  <li>• Loan up to 90% of car value</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3 gap-2">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">🔄</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Used Car Loan</h3>
                </div>
                <p className="text-gray-700 mb-2">Buy a pre-owned car from dealers or private sellers.</p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Interest: 9-16% p.a.</li>
                  <li>• Tenure: 1-5 years</li>
                  <li>• Loan up to 80% of car value</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3 gap-2">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">⚡</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Electric Vehicle (EV) Loan</h3>
                </div>
                <p className="text-gray-700 mb-2">Special financing for electric cars with subsidized rates.</p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Interest: 6-10% p.a.</li>
                  <li>• Government subsidies available</li>
                  <li>• Lower interest than regular cars</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3 gap-2">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">🔁</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Refinance Car Loan</h3>
                </div>
                <p className="text-gray-700 mb-2">Refinance existing car loan for better interest rates.</p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Lower EMI or tenure</li>
                  <li>• Switch lenders for better terms</li>
                  <li>• Prepayment of existing loan</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How to Get Best Car Loan */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6 flex items-center">
              <Target className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              How to Get the Best Car Loan Deal
            </h2>
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Improve Your Credit Score
                  </h3>
                  <p className="text-white/90">A credit score of 750+ gets you the lowest interest rates. Pay bills on time and reduce credit card balances.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Higher Down Payment
                  </h3>
                  <p className="text-white/90">Pay 20-30% down payment to reduce loan amount, lower EMI, and get better interest rates.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Compare Multiple Lenders
                  </h3>
                  <p className="text-white/90">Banks, NBFCs, and dealer financing—compare all options. Even 0.5% difference saves thousands.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Choose Right Tenure
                  </h3>
                  <p className="text-white/90">Shorter tenure means higher EMI but lower total interest. Balance affordability with cost savings.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Consider Total Cost
                  </h3>
                  <p className="text-white/90">Look beyond EMI—factor in processing fees, insurance, maintenance, and fuel costs.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Prepayment Options
                  </h3>
                  <p className="text-white/90">Choose loans with no prepayment penalty so you can pay off early and save on interest.</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-[#FFC857] text-[#1A3D7C] rounded-lg">
                <p className="font-semibold">
                  💡 Pro Tip: Use our calculator to compare different down payment and tenure scenarios. A ₹1 lakh higher down payment can save you ₹20,000+ in interest over 5 years!
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6 flex items-center">
              <HelpCircle className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Car Loan FAQs
            </h2>
            <div className="space-y-4">

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">1. What is the typical down payment for a car loan in India?</h3>
                <p className="text-gray-700">Most lenders require <strong>10-20% down payment</strong> for new cars and <strong>20-25%</strong> for used cars. Higher down payment means lower EMI and better interest rates.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">2. What is the maximum car loan tenure available?</h3>
                <p className="text-gray-700">New car loans can have tenure up to <strong>7 years (84 months)</strong>, while used car loans typically go up to <strong>5 years (60 months)</strong>. Longer tenure reduces EMI but increases total interest.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">3. How is car loan interest calculated?</h3>
                <p className="text-gray-700">Car loans use the <strong>reducing balance method</strong> where interest is calculated on the outstanding principal. As you pay EMI, the principal reduces, so interest decreases over time.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">4. Can students get car loans in India?</h3>
                <p className="text-gray-700">Yes, students with income proof (part-time job, internship) or a co-applicant (parent/guardian) can get car loans. Some banks offer special student car loan schemes with flexible terms.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">5. Should I take loan from bank or car dealership?</h3>
                <p className="text-gray-700"><strong>Banks/NBFCs:</strong> Usually lower interest but stricter eligibility. <strong>Dealer financing:</strong> Quick approval, may include freebies, but often higher rates. Compare both before deciding.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">6. What documents are needed for car loan?</h3>
                <p className="text-gray-700"><strong>Documents required:</strong> ID proof, address proof, income proof (salary slips/bank statements), passport photos, car quotation/invoice. Self-employed individuals need ITR and business proof.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">7. Can I prepay my car loan without penalty?</h3>
                <p className="text-gray-700">Most banks allow <strong>part or full prepayment after 6-12 months</strong> without penalty. Check loan terms before applying. Prepaying saves significant interest costs.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">8. Does car insurance affect my loan EMI?</h3>
                <p className="text-gray-700">Insurance is mandatory and separate from EMI. However, some lenders offer to <strong>club insurance premium</strong> with the loan, slightly increasing EMI but removing upfront insurance cost.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">9. New car vs used car loan - which is better?</h3>
                <p className="text-gray-700"><strong>New car:</strong> Lower interest (7-11%), longer tenure, full warranty. <strong>Used car:</strong> Higher interest (9-16%), shorter tenure, lower loan amount. Choose based on budget and needs.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">10. What is the processing fee for car loans?</h3>
                <p className="text-gray-700">Processing fees range from <strong>0.5% to 2% of loan amount</strong> (usually ₹2,000 to ₹10,000). Some lenders waive it during festive seasons or for premium customers.</p>
              </div>

            </div>
          </section>

          {/* Tips Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Smart Tips for Car Loan Buyers
            </h2>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-200">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Budget for total cost:</strong> EMI + insurance + fuel + maintenance should not exceed 15-20% of your monthly income.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Negotiate the car price first:</strong> Get the best deal on car price before discussing financing. A 5% discount saves more than 1% interest rate reduction.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Read the fine print:</strong> Check for hidden charges, prepayment penalties, late payment fees, and bounce charges.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Consider resale value:</strong> Popular car models have better resale value and easier loan approval for the next buyer if you sell.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Opt for comprehensive insurance:</strong> Third-party alone is cheaper but comprehensive protects your loan investment better.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Don't max out loan amount:</strong> Keep some savings for emergencies. Car depreciation means you shouldn't be overleveraged.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>For students:</strong> Consider waiting until you have stable income or get parents as co-applicants for better rates.</p>
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
                  Need Help with Financial Mathematics?
                </h2>
              </div>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Our expert tutors can help you master loan calculations, understand interest rates, and excel in financial mathematics. Get personalized one-on-one guidance.
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
                <span className="text-xl font-bold">The Tutor Bridge</span>
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
            <p>&copy; 2026 The Tutor Bridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
