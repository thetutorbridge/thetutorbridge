'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Home, Calculator, DollarSign, TrendingUp, Calendar, PiggyBank, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  totalInterest: number;
}

export default function MortgageCalculatorPage() {
  // Basic mortgage inputs
  const [homePrice, setHomePrice] = useState<string>('300000');
  const [downPayment, setDownPayment] = useState<string>('60000');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [interestRate, setInterestRate] = useState<string>('6.5');

  // Additional costs
  const [propertyTax, setPropertyTax] = useState<string>('3600');
  const [homeInsurance, setHomeInsurance] = useState<string>('1200');
  const [pmi, setPmi] = useState<string>('0');
  const [hoaFees, setHoaFees] = useState<string>('0');

  // Results
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [principalInterest, setPrincipalInterest] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [loanAmount, setLoanAmount] = useState<number | null>(null);
  const [amortization, setAmortization] = useState<AmortizationEntry[]>([]);

  const calculateMortgage = () => {
    const price = parseFloat(homePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const term = parseInt(loanTerm) || 30;
    const rate = parseFloat(interestRate) || 0;
    const tax = parseFloat(propertyTax) || 0;
    const insurance = parseFloat(homeInsurance) || 0;
    const pmiAmount = parseFloat(pmi) || 0;
    const hoa = parseFloat(hoaFees) || 0;

    if (price <= 0 || down < 0 || term <= 0 || rate < 0) {
      alert('Please enter valid values');
      return;
    }

    const principal = price - down;
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = term * 12;

    // Calculate monthly principal & interest using amortization formula
    // M = P × r × (1 + r)ⁿ / [(1 + r)ⁿ - 1]
    let monthlyPI: number;
    let totalInt: number;

    if (rate === 0) {
      monthlyPI = principal / numberOfPayments;
      totalInt = 0;
    } else {
      monthlyPI = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                  (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      totalInt = (monthlyPI * numberOfPayments) - principal;
    }

    // Calculate additional monthly costs
    const monthlyTax = tax / 12;
    const monthlyInsurance = insurance / 12;
    const monthlyPMI = pmiAmount / 12;
    const monthlyHOA = hoa / 12;

    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI + monthlyHOA;
    const totalPaymentAmount = (monthlyPI * numberOfPayments) +
                                (monthlyTax * numberOfPayments) +
                                (monthlyInsurance * numberOfPayments) +
                                (monthlyPMI * numberOfPayments) +
                                (monthlyHOA * numberOfPayments);

    setLoanAmount(principal);
    setPrincipalInterest(monthlyPI);
    setMonthlyPayment(totalMonthly);
    setTotalPayment(totalPaymentAmount);
    setTotalInterest(totalInt);

    // Generate amortization schedule
    const schedule: AmortizationEntry[] = [];
    let remainingBalance = principal;
    let cumulativeInterest = 0;

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPI - interestPayment;
      remainingBalance -= principalPayment;
      cumulativeInterest += interestPayment;

      schedule.push({
        month,
        payment: monthlyPI,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingBalance),
        totalInterest: cumulativeInterest,
      });
    }

    setAmortization(schedule);
  };

  const reset = () => {
    setHomePrice('300000');
    setDownPayment('60000');
    setLoanTerm('30');
    setInterestRate('6.5');
    setPropertyTax('3600');
    setHomeInsurance('1200');
    setPmi('0');
    setHoaFees('0');
    setMonthlyPayment(null);
    setPrincipalInterest(null);
    setTotalPayment(null);
    setTotalInterest(null);
    setLoanAmount(null);
    setAmortization([]);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const downPaymentPercent = homePrice && downPayment
    ? ((parseFloat(downPayment) / parseFloat(homePrice)) * 100).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm py-3 px-4 sm:px-6 shadow-sm">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-blue-600">Calculators</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Mortgage Calculator</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-20 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Home className="w-16 h-16 text-blue-200 mr-4" />
            <h1 className="text-5xl font-bold">Mortgage Calculator</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Calculate your monthly mortgage payment with taxes, insurance, PMI, and HOA fees.
            Get detailed amortization schedule and total interest breakdown.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Input Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-blue-600" />
                  Mortgage Details
                </h2>

                {/* Home Price */}
                <div className="mb-4">
                  <Label htmlFor="homePrice" className="text-gray-700 font-medium">
                    Home Price ($)
                  </Label>
                  <Input
                    id="homePrice"
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(e.target.value)}
                    className="mt-1"
                    placeholder="300000"
                  />
                </div>

                {/* Down Payment */}
                <div className="mb-4">
                  <Label htmlFor="downPayment" className="text-gray-700 font-medium">
                    Down Payment ($) - {downPaymentPercent}%
                  </Label>
                  <Input
                    id="downPayment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className="mt-1"
                    placeholder="60000"
                  />
                </div>

                {/* Loan Term */}
                <div className="mb-4">
                  <Label htmlFor="loanTerm" className="text-gray-700 font-medium">
                    Loan Term (years)
                  </Label>
                  <Input
                    id="loanTerm"
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="mt-1"
                    placeholder="30"
                  />
                </div>

                {/* Interest Rate */}
                <div className="mb-6">
                  <Label htmlFor="interestRate" className="text-gray-700 font-medium">
                    Interest Rate (% per year)
                  </Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="mt-1"
                    placeholder="6.5"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-6">Additional Costs (Annual)</h3>

                {/* Property Tax */}
                <div className="mb-4">
                  <Label htmlFor="propertyTax" className="text-gray-700 font-medium">
                    Property Tax ($/year)
                  </Label>
                  <Input
                    id="propertyTax"
                    type="number"
                    value={propertyTax}
                    onChange={(e) => setPropertyTax(e.target.value)}
                    className="mt-1"
                    placeholder="3600"
                  />
                </div>

                {/* Home Insurance */}
                <div className="mb-4">
                  <Label htmlFor="homeInsurance" className="text-gray-700 font-medium">
                    Home Insurance ($/year)
                  </Label>
                  <Input
                    id="homeInsurance"
                    type="number"
                    value={homeInsurance}
                    onChange={(e) => setHomeInsurance(e.target.value)}
                    className="mt-1"
                    placeholder="1200"
                  />
                </div>

                {/* PMI */}
                <div className="mb-4">
                  <Label htmlFor="pmi" className="text-gray-700 font-medium">
                    PMI ($/year)
                  </Label>
                  <Input
                    id="pmi"
                    type="number"
                    value={pmi}
                    onChange={(e) => setPmi(e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Required if down payment &lt; 20%
                  </p>
                </div>

                {/* HOA Fees */}
                <div className="mb-6">
                  <Label htmlFor="hoaFees" className="text-gray-700 font-medium">
                    HOA Fees ($/year)
                  </Label>
                  <Input
                    id="hoaFees"
                    type="number"
                    value={hoaFees}
                    onChange={(e) => setHoaFees(e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={calculateMortgage}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate
                  </Button>
                  <Button
                    onClick={reset}
                    variant="outline"
                    className="flex-1"
                  >
                    Reset
                  </Button>
                </div>
              </div>

              {/* Results Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                  Results
                </h2>

                {monthlyPayment !== null ? (
                  <div className="space-y-4">
                    {/* Monthly Payment */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                      <div className="text-sm text-gray-600 mb-1">Monthly Payment</div>
                      <div className="text-3xl font-bold text-blue-600">
                        {formatCurrency(monthlyPayment)}
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">Principal & Interest</div>
                        <div className="text-lg font-semibold text-gray-800">
                          {formatCurrency(principalInterest || 0)}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">Property Tax</div>
                        <div className="text-lg font-semibold text-gray-800">
                          {formatCurrency(parseFloat(propertyTax || '0') / 12)}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">Home Insurance</div>
                        <div className="text-lg font-semibold text-gray-800">
                          {formatCurrency(parseFloat(homeInsurance || '0') / 12)}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">PMI</div>
                        <div className="text-lg font-semibold text-gray-800">
                          {formatCurrency(parseFloat(pmi || '0') / 12)}
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Loan Amount:</span>
                          <span className="font-semibold text-gray-800">
                            {formatCurrency(loanAmount || 0)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Interest:</span>
                          <span className="font-semibold text-red-600">
                            {formatCurrency(totalInterest || 0)}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-green-300 pt-2">
                          <span className="text-gray-600">Total Payment:</span>
                          <span className="font-bold text-gray-900">
                            {formatCurrency(totalPayment || 0)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Breakdown Chart */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-semibold text-gray-700 mb-3">Payment Breakdown</div>
                      {loanAmount && totalInterest && (
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Principal</span>
                              <span>{formatCurrency(loanAmount)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${(loanAmount / (loanAmount + totalInterest)) * 100}%` }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Interest</span>
                              <span>{formatCurrency(totalInterest)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-red-500 h-2 rounded-full"
                                style={{ width: `${(totalInterest / (loanAmount + totalInterest)) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-12 text-center">
                    <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Enter your mortgage details and click Calculate to see results
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Amortization Schedule */}
            {amortization.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                  Amortization Schedule
                </h3>
                <div className="overflow-x-auto">
                  <div className="max-h-96 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100 sticky top-0">
                        <tr>
                          <th className="px-4 py-2 text-left">Month</th>
                          <th className="px-4 py-2 text-right">Payment</th>
                          <th className="px-4 py-2 text-right">Principal</th>
                          <th className="px-4 py-2 text-right">Interest</th>
                          <th className="px-4 py-2 text-right">Balance</th>
                          <th className="px-4 py-2 text-right">Total Interest</th>
                        </tr>
                      </thead>
                      <tbody>
                        {amortization.map((entry, index) => (
                          <tr
                            key={index}
                            className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                          >
                            <td className="px-4 py-2 text-gray-700">{entry.month}</td>
                            <td className="px-4 py-2 text-right text-gray-700">
                              {formatCurrency(entry.payment)}
                            </td>
                            <td className="px-4 py-2 text-right text-blue-600">
                              {formatCurrency(entry.principal)}
                            </td>
                            <td className="px-4 py-2 text-right text-red-600">
                              {formatCurrency(entry.interest)}
                            </td>
                            <td className="px-4 py-2 text-right text-gray-700">
                              {formatCurrency(entry.balance)}
                            </td>
                            <td className="px-4 py-2 text-right text-orange-600">
                              {formatCurrency(entry.totalInterest)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Mortgage Calculations</h2>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">What is a Mortgage?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              A <strong>mortgage</strong> is a loan specifically used to purchase real estate property. The property
              itself serves as collateral for the loan. When you take out a mortgage, you agree to pay back the
              borrowed amount (principal) plus interest over a specified period (loan term), typically 15 or 30 years.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Monthly Mortgage Payment Formula</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The monthly payment for a fixed-rate mortgage is calculated using the following formula:
            </p>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl my-6 border-l-4 border-blue-500">
              <div className="text-center space-y-4">
                <div className="text-lg font-semibold text-gray-800">Monthly Payment Formula:</div>
                <div className="text-xl">
                  <span className="font-mono">M = P × </span>
                  <span className="inline-block border-t-2 border-gray-800 px-2">
                    r(1 + r)<sup>n</sup>
                  </span>
                  <span className="font-mono"> / </span>
                  <span className="inline-block border-t-2 border-gray-800 px-2">
                    (1 + r)<sup>n</sup> − 1
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div><strong>M</strong> = Monthly payment (principal & interest)</div>
                  <div><strong>P</strong> = Principal loan amount</div>
                  <div><strong>r</strong> = Monthly interest rate (annual rate ÷ 12)</div>
                  <div><strong>n</strong> = Total number of payments (years × 12)</div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Example Calculation</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Let's calculate the monthly payment for a $240,000 loan at 6.5% annual interest for 30 years:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-4 space-y-3">
              <div><strong>Given:</strong></div>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Principal (P) = $240,000</li>
                <li>Annual Interest Rate = 6.5%</li>
                <li>Loan Term = 30 years</li>
              </ul>
              <div className="mt-4"><strong>Calculate:</strong></div>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Monthly rate (r) = 6.5% ÷ 12 = 0.065 ÷ 12 = 0.00542</li>
                <li>Number of payments (n) = 30 × 12 = 360 months</li>
              </ul>
              <div className="mt-4"><strong>Solution:</strong></div>
              <div className="bg-white p-4 rounded border-l-4 border-green-500 text-gray-700">
                <div>M = 240,000 × [0.00542(1.00542)<sup>360</sup>] / [(1.00542)<sup>360</sup> − 1]</div>
                <div className="mt-2">M = 240,000 × [0.00542 × 7.176] / [7.176 − 1]</div>
                <div className="mt-2">M = 240,000 × 0.03889 / 6.176</div>
                <div className="mt-2 text-lg font-bold text-green-700">M = $1,517.02</div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Key Mortgage Components</h3>

            <div className="space-y-6 my-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">1. Principal</h4>
                <p className="text-gray-700">
                  The principal is the original loan amount borrowed. It's calculated as:
                </p>
                <div className="bg-gray-50 p-3 rounded mt-2 font-mono text-sm">
                  Principal = Home Price − Down Payment
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">2. Interest Rate</h4>
                <p className="text-gray-700">
                  The interest rate is the cost of borrowing money, expressed as an annual percentage. It's
                  determined by market conditions, your credit score, loan type, and down payment amount.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">3. Loan Term</h4>
                <p className="text-gray-700">
                  The loan term is the length of time you have to repay the loan. Common terms are:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                  <li><strong>15 years:</strong> Higher monthly payments, less total interest</li>
                  <li><strong>30 years:</strong> Lower monthly payments, more total interest</li>
                </ul>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">4. Down Payment</h4>
                <p className="text-gray-700">
                  The down payment is the upfront cash payment you make toward the home purchase. Standard
                  down payment percentages:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                  <li><strong>20% or more:</strong> Typically no PMI required</li>
                  <li><strong>10-19%:</strong> PMI required, better rates</li>
                  <li><strong>3-9%:</strong> PMI required, higher rates</li>
                  <li><strong>0%:</strong> VA loans, USDA loans (special programs)</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Additional Monthly Costs</h3>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Cost</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Typical Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Property Tax</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Annual tax on property value assessed by local government
                    </td>
                    <td className="border border-gray-300 px-4 py-2">1-2% of home value/year</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Home Insurance</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Protects against damage, theft, and liability
                    </td>
                    <td className="border border-gray-300 px-4 py-2">$1,000-$2,000/year</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">PMI</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Private Mortgage Insurance (if down payment &lt; 20%)
                    </td>
                    <td className="border border-gray-300 px-4 py-2">0.5-1.5% of loan/year</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">HOA Fees</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Homeowners Association fees for shared amenities
                    </td>
                    <td className="border border-gray-300 px-4 py-2">$200-$400/month</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Types of Mortgages</h3>

            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                <h4 className="text-lg font-bold text-blue-900 mb-3">Fixed-Rate Mortgage</h4>
                <p className="text-gray-700 text-sm mb-3">
                  Interest rate remains constant throughout the entire loan term.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Predictable monthly payments</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Protection from rate increases</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span className="text-gray-700">Higher initial rates than ARMs</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                <h4 className="text-lg font-bold text-purple-900 mb-3">Adjustable-Rate Mortgage (ARM)</h4>
                <p className="text-gray-700 text-sm mb-3">
                  Interest rate can change periodically based on market conditions.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Lower initial interest rates</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Can benefit if rates decrease</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span className="text-gray-700">Payment uncertainty</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <h4 className="text-lg font-bold text-green-900 mb-3">FHA Loan</h4>
                <p className="text-gray-700 text-sm mb-3">
                  Federal Housing Administration insured loan for first-time buyers.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Low down payment (3.5%)</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Lower credit score requirements</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span className="text-gray-700">Mortgage insurance required</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200">
                <h4 className="text-lg font-bold text-orange-900 mb-3">VA Loan</h4>
                <p className="text-gray-700 text-sm mb-3">
                  Department of Veterans Affairs loan for eligible military members.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">No down payment required</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">No PMI required</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span className="text-gray-700">Limited to eligible veterans</span>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Understanding Amortization</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Amortization</strong> is the process of paying off a loan through regular, scheduled payments.
              Each payment consists of two parts:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>Principal:</strong> The portion that reduces your loan balance</li>
              <li><strong>Interest:</strong> The cost of borrowing the money</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Early in the loan, most of your payment goes toward interest. As you pay down the principal,
              more of each payment goes toward the principal itself. This is because interest is calculated
              on the remaining balance.
            </p>

            <div className="bg-blue-50 p-6 rounded-xl my-6 border-l-4 border-blue-500">
              <h4 className="font-semibold text-gray-800 mb-3">Amortization Example</h4>
              <p className="text-gray-700 text-sm mb-3">
                For a $240,000 loan at 6.5% for 30 years (monthly payment = $1,517.02):
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="border border-blue-200 px-3 py-2 text-left">Payment #</th>
                      <th className="border border-blue-200 px-3 py-2 text-right">Payment</th>
                      <th className="border border-blue-200 px-3 py-2 text-right">Principal</th>
                      <th className="border border-blue-200 px-3 py-2 text-right">Interest</th>
                      <th className="border border-blue-200 px-3 py-2 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr>
                      <td className="border border-blue-200 px-3 py-2">1</td>
                      <td className="border border-blue-200 px-3 py-2 text-right">$1,517.02</td>
                      <td className="border border-blue-200 px-3 py-2 text-right text-blue-600">$217.02</td>
                      <td className="border border-blue-200 px-3 py-2 text-right text-red-600">$1,300.00</td>
                      <td className="border border-blue-200 px-3 py-2 text-right">$239,782.98</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-blue-200 px-3 py-2">2</td>
                      <td className="border border-blue-200 px-3 py-2 text-right">$1,517.02</td>
                      <td className="border border-blue-200 px-3 py-2 text-right text-blue-600">$218.20</td>
                      <td className="border border-blue-200 px-3 py-2 text-right text-red-600">$1,298.82</td>
                      <td className="border border-blue-200 px-3 py-2 text-right">$239,564.78</td>
                    </tr>
                    <tr>
                      <td className="border border-blue-200 px-3 py-2">180</td>
                      <td className="border border-blue-200 px-3 py-2 text-right">$1,517.02</td>
                      <td className="border border-blue-200 px-3 py-2 text-right text-blue-600">$758.51</td>
                      <td className="border border-blue-200 px-3 py-2 text-right text-red-600">$758.51</td>
                      <td className="border border-blue-200 px-3 py-2 text-right">$139,847.29</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-blue-200 px-3 py-2">360</td>
                      <td className="border border-blue-200 px-3 py-2 text-right">$1,517.02</td>
                      <td className="border border-blue-200 px-3 py-2 text-right text-blue-600">$1,508.85</td>
                      <td className="border border-blue-200 px-3 py-2 text-right text-red-600">$8.17</td>
                      <td className="border border-blue-200 px-3 py-2 text-right">$0.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Strategies to Save on Your Mortgage</h3>

            <div className="space-y-4 my-6">
              <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <PiggyBank className="w-5 h-5 mr-2 text-green-600" />
                  1. Make a Larger Down Payment
                </h4>
                <p className="text-gray-700 text-sm">
                  Putting down 20% or more eliminates PMI and reduces your loan amount, saving thousands
                  in interest over the life of the loan. Every additional dollar down reduces the principal
                  and the total interest paid.
                </p>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  2. Choose a Shorter Loan Term
                </h4>
                <p className="text-gray-700 text-sm">
                  A 15-year mortgage has higher monthly payments but significantly lower total interest.
                  For example, on a $240,000 loan at 6%, you'll pay about $146,000 less in interest with
                  a 15-year term compared to 30 years.
                </p>
              </div>

              <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-purple-600" />
                  3. Make Extra Principal Payments
                </h4>
                <p className="text-gray-700 text-sm">
                  Even small extra payments toward principal can save thousands. Paying just $100 extra
                  per month on a $240,000, 30-year loan at 6.5% can save over $44,000 in interest and
                  shave 5 years off your loan term.
                </p>
              </div>

              <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                  4. Refinance When Rates Drop
                </h4>
                <p className="text-gray-700 text-sm">
                  If interest rates fall significantly (typically 0.5-1% or more), refinancing can lower
                  your monthly payment and total interest. However, factor in closing costs (2-5% of loan)
                  and ensure you'll stay in the home long enough to recoup these costs.
                </p>
              </div>

              <div className="bg-pink-50 p-5 rounded-lg border-l-4 border-pink-500">
                <h4 className="font-semibold text-gray-800 mb-2">5. Improve Your Credit Score</h4>
                <p className="text-gray-700 text-sm">
                  A higher credit score qualifies you for better interest rates. Improving your score from
                  680 to 760 could reduce your rate by 0.5-1%, saving tens of thousands over a 30-year loan.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">15-Year vs 30-Year Mortgage Comparison</h3>
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Factor</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">15-Year</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">30-Year</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Loan Amount</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">$240,000</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">$240,000</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Interest Rate</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">5.5%</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">6.5%</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Monthly Payment</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-orange-600">$1,961.63</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-green-600">$1,517.02</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Total Interest Paid</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-green-600">$113,093</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-red-600">$306,125</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Total Paid</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">$353,093</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">$546,125</td>
                  </tr>
                  <tr className="bg-green-100">
                    <td className="border border-gray-300 px-4 py-2 font-bold">Interest Savings</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-green-700 font-bold">$193,032</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Frequently Asked Questions</h3>

            <div className="space-y-6 my-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">1. What is PMI and when is it required?</h4>
                <p className="text-gray-700 text-sm">
                  Private Mortgage Insurance (PMI) is required when your down payment is less than 20%
                  of the home's value. It protects the lender if you default on the loan. PMI typically
                  costs 0.5-1.5% of the loan amount annually and can be removed once you reach 20% equity.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">2. How much house can I afford?</h4>
                <p className="text-gray-700 text-sm">
                  A general rule is the <strong>28/36 rule</strong>: your monthly housing costs shouldn't
                  exceed 28% of gross monthly income, and total debt payments shouldn't exceed 36%. For
                  example, with $6,000 monthly income, aim for housing costs under $1,680 and total debt
                  under $2,160.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">3. Should I pay points to lower my interest rate?</h4>
                <p className="text-gray-700 text-sm">
                  Discount points let you pay upfront to reduce your interest rate (typically 1 point =
                  1% of loan = 0.25% rate reduction). This makes sense if you plan to stay in the home
                  long enough to recoup the cost through monthly savings (usually 5-7 years).
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">4. What are closing costs?</h4>
                <p className="text-gray-700 text-sm">
                  Closing costs are fees due when finalizing your mortgage, typically 2-5% of the loan
                  amount. They include appraisal fees, title insurance, origination fees, attorney fees,
                  and prepaid items like property taxes and insurance. On a $240,000 loan, expect
                  $4,800-$12,000 in closing costs.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">5. Is it better to pay off my mortgage early?</h4>
                <p className="text-gray-700 text-sm">
                  It depends on your situation. Benefits include interest savings and debt-free homeownership.
                  However, if your mortgage rate is low (below 4-5%), you might earn better returns investing
                  extra money elsewhere. Also consider tax deductions on mortgage interest and maintaining
                  emergency savings.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">6. What is escrow?</h4>
                <p className="text-gray-700 text-sm">
                  An escrow account holds funds for property taxes and insurance. Your lender collects
                  1/12 of annual costs each month and pays these bills when due. This ensures taxes and
                  insurance stay current, protecting both you and the lender.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">7. How does my credit score affect my mortgage?</h4>
                <p className="text-gray-700 text-sm">
                  Credit score heavily influences your interest rate and loan approval:
                </p>
                <ul className="list-disc list-inside mt-2 text-sm text-gray-700 space-y-1">
                  <li><strong>760+:</strong> Best rates available</li>
                  <li><strong>700-759:</strong> Good rates, typically 0.25% higher</li>
                  <li><strong>660-699:</strong> Fair rates, 0.5-0.75% higher</li>
                  <li><strong>620-659:</strong> Higher rates, 1-1.5% higher</li>
                  <li><strong>Below 620:</strong> Difficult to qualify for conventional loans</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">8. What is the difference between pre-qualification and pre-approval?</h4>
                <p className="text-gray-700 text-sm">
                  <strong>Pre-qualification</strong> is an informal estimate based on self-reported financial
                  information. <strong>Pre-approval</strong> involves verification of income, assets, and credit,
                  resulting in a conditional commitment from the lender. Pre-approval carries more weight when
                  making offers.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">9. Can I change from an ARM to a fixed-rate mortgage?</h4>
                <p className="text-gray-700 text-sm">
                  Yes, through refinancing. If you have an adjustable-rate mortgage (ARM) and want the
                  stability of a fixed rate, you can refinance. Consider refinancing before your ARM
                  adjusts upward, but factor in closing costs and how long you plan to stay in the home.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">10. What happens if I miss a mortgage payment?</h4>
                <p className="text-gray-700 text-sm">
                  Missing one payment results in late fees (typically 4-5% of payment) and credit score damage.
                  After 30 days, it's reported to credit bureaus. Multiple missed payments lead to default,
                  and eventually foreclosure. Contact your lender immediately if you're struggling—they often
                  have hardship programs, forbearance, or loan modification options.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl p-8 my-12">
              <div className="text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                <h3 className="text-2xl font-bold mb-4">Need Help Understanding Mortgages?</h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Our expert tutors can help you understand mortgage calculations, financial planning,
                  and real estate mathematics. Book a personalized session today!
                </p>
                <Link href="/book-demo-class">
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3">
                    Book Your Session
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
