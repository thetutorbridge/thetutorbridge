'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Car, Home, ArrowRight, Calculator, DollarSign, TrendingDown, BarChart3, Info, PiggyBank, FileText } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PaymentResult {
  monthlyPayment: number;
  totalLoanAmount: number;
  totalInterest: number;
  totalCost: number;
  downPayment: number;
  salesTax: number;
  upfrontCost: number;
  principalPercentage: number;
  interestPercentage: number;
}

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function CarPaymentCalculator() {
  const [carPrice, setCarPrice] = useState<string>('30000');
  const [downPayment, setDownPayment] = useState<string>('6000');
  const [tradeInValue, setTradeInValue] = useState<string>('0');
  const [tradeInOwed, setTradeInOwed] = useState<string>('0');
  const [interestRate, setInterestRate] = useState<string>('5.5');
  const [loanTerm, setLoanTerm] = useState<string>('60');
  const [salesTaxRate, setSalesTaxRate] = useState<string>('7');
  const [otherFees, setOtherFees] = useState<string>('1500');

  const [result, setResult] = useState<PaymentResult | null>(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const calculatePayment = () => {
    setError('');
    setResult(null);
    setAmortizationSchedule([]);

    // Validation
    const price = parseFloat(carPrice);
    const down = parseFloat(downPayment) || 0;
    const tradeIn = parseFloat(tradeInValue) || 0;
    const owed = parseFloat(tradeInOwed) || 0;
    const rate = parseFloat(interestRate);
    const term = parseInt(loanTerm);
    const tax = parseFloat(salesTaxRate) || 0;
    const fees = parseFloat(otherFees) || 0;

    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid car price');
      return;
    }

    if (isNaN(rate) || rate < 0) {
      setError('Please enter a valid interest rate');
      return;
    }

    if (isNaN(term) || term <= 0) {
      setError('Please enter a valid loan term');
      return;
    }

    // Calculate sales tax
    const salesTaxAmount = (price * tax) / 100;

    // Calculate net trade-in value
    const netTradeIn = Math.max(0, tradeIn - owed);

    // Calculate total amount to finance
    const totalCarCost = price + salesTaxAmount + fees;
    const upfront = down + netTradeIn;
    const loanAmount = totalCarCost - upfront;

    if (loanAmount <= 0) {
      setError('Loan amount must be greater than zero. Reduce down payment or trade-in value.');
      return;
    }

    // Calculate monthly payment using standard loan formula
    const monthlyRate = rate / 100 / 12;
    let monthlyPayment: number;
    let totalInterest: number;

    if (rate === 0) {
      monthlyPayment = loanAmount / term;
      totalInterest = 0;
    } else {
      monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
                       (Math.pow(1 + monthlyRate, term) - 1);
      totalInterest = (monthlyPayment * term) - loanAmount;
    }

    const totalCost = totalCarCost + totalInterest;
    const principalPercentage = (loanAmount / (loanAmount + totalInterest)) * 100;
    const interestPercentage = (totalInterest / (loanAmount + totalInterest)) * 100;

    setResult({
      monthlyPayment,
      totalLoanAmount: loanAmount,
      totalInterest,
      totalCost,
      downPayment: upfront,
      salesTax: salesTaxAmount,
      upfrontCost: upfront,
      principalPercentage,
      interestPercentage,
    });

    // Generate amortization schedule
    const schedule: AmortizationRow[] = [];
    let remainingBalance = loanAmount;

    for (let month = 1; month <= term; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingBalance),
      });
    }

    setAmortizationSchedule(schedule);
  };

  const reset = () => {
    setCarPrice('30000');
    setDownPayment('6000');
    setTradeInValue('0');
    setTradeInOwed('0');
    setInterestRate('5.5');
    setLoanTerm('60');
    setSalesTaxRate('7');
    setOtherFees('1500');
    setResult(null);
    setAmortizationSchedule([]);
    setError('');
    setShowAmortization(false);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What\'s a good interest rate for a car loan?","acceptedAnswer":{"@type":"Answer","text":"For new cars, excellent credit (750+) can qualify for 3-5%, good credit (700-749) sees 5-7%, and fair credit (640-699) gets 7-12%. Used car rates are typically 1-2% higher. Rates vary by lender, loan term, and market conditions. Always shop around and compare at least 3 lenders."}},{"@type":"Question","name":"How much should I put down on a car?","acceptedAnswer":{"@type":"Answer","text":"Aim for 20% down on new cars and 10% on used cars. This protects against being \"upside down\" (owing more than the car\'s value), lowers your monthly payment, reduces total interest, and may qualify you for better rates. If you can\'t afford the recommended down payment, consider a less expensive vehicle."}},{"@type":"Question","name":"Should I choose a 72-month loan for lower payments?","acceptedAnswer":{"@type":"Answer","text":"While 72 or 84-month loans offer lower monthly payments, they cost significantly more in interest and keep you in debt longer. You\'re also more likely to be upside down if you need to sell or trade in. A 60-month (5-year) loan is ideal for balancing payment and total cost. If payments are too high, buy a less expensive car rather than extending the term."}},{"@type":"Question","name":"Is it better to finance through the dealer or my bank?","acceptedAnswer":{"@type":"Answer","text":"Get pre-approved from your bank or credit union first to establish a baseline rate and budget. Then let the dealer try to beat it - they may have access to manufacturer incentives or promotional rates. Credit unions often offer the best rates (0.5-1% lower than banks). Never accept the dealer\'s first offer without comparing to your pre-approval."}},{"@type":"Question","name":"Should I pay off my car loan early?","acceptedAnswer":{"@type":"Answer","text":"If your interest rate is above 5-6%, paying off early can save significant interest. However, check for prepayment penalties (rare but possible). If your rate is very low (0-3%), you might get better returns investing extra money elsewhere. Also, prioritize paying off higher-interest debt (credit cards) before your car loan."}},{"@type":"Question","name":"How does my credit score affect my car loan?","acceptedAnswer":{"@type":"Answer","text":"Your credit score dramatically impacts your interest rate. The difference between excellent credit (750+) at 4% and fair credit (650) at 9% is about $2,500 in interest on a $25,000, 5-year loan. Before applying, check your credit report for errors, pay down credit cards, and ensure all bills are current. Even a 50-point score increase can save thousands."}},{"@type":"Question","name":"What if I\'m upside down on my current car loan?","acceptedAnswer":{"@type":"Answer","text":"Being upside down (owing more than the car\'s worth) happens when you have little/no down payment, long loan terms, or rapid depreciation. Options include: 1) Pay down the loan before trading, 2) Make a larger down payment on the new car to cover the gap, or 3) Keep driving the current car until you have equity. Rolling negative equity into a new loan creates a dangerous debt cycle."}},{"@type":"Question","name":"Should I buy gap insurance?","acceptedAnswer":{"@type":"Answer","text":"Gap insurance covers the difference between what you owe and the car\'s value if it\'s totaled. It\'s useful if you: made little/no down payment, have a long loan term (60+ months), or bought a vehicle that depreciates quickly. However, dealers often overcharge ($500-$700). You can usually get the same coverage from your auto insurer for $20-40 per year."}}]}' }}
      />
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              <Home className="h-4 w-4" />
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-blue-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-blue-600 font-medium">Car Payment Calculator</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Car className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Car Payment Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your monthly auto loan payment, total interest, and amortization schedule
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Calculator Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Loan Details</h2>
            </div>

            <div className="space-y-6">
              {/* Car Price */}
              <div>
                <Label htmlFor="carPrice" className="text-base font-semibold text-gray-700 mb-3 block">
                  Car Price ($)
                </Label>
                <Input
                  id="carPrice"
                  type="number"
                  value={carPrice}
                  onChange={(e) => setCarPrice(e.target.value)}
                  placeholder="Enter car price"
                  className="text-lg py-6"
                  step="100"
                />
              </div>

              {/* Loan Term */}
              <div>
                <Label htmlFor="loanTerm" className="text-base font-semibold text-gray-700 mb-3 block">
                  Loan Term (months)
                </Label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[36, 48, 60, 72].map((months) => (
                    <button
                      key={months}
                      onClick={() => setLoanTerm(months.toString())}
                      className={`py-2 px-3 rounded-lg font-medium transition-all text-sm ${
                        loanTerm === months.toString()
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {months}
                    </button>
                  ))}
                </div>
                <Input
                  id="loanTerm"
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  placeholder="Or enter custom term"
                  className="text-lg py-6"
                />
              </div>

              {/* Interest Rate */}
              <div>
                <Label htmlFor="interestRate" className="text-base font-semibold text-gray-700 mb-3 block">
                  Interest Rate (% per year)
                </Label>
                <Input
                  id="interestRate"
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="Enter annual interest rate"
                  className="text-lg py-6"
                  step="0.1"
                />
              </div>

              {/* Down Payment */}
              <div>
                <Label htmlFor="downPayment" className="text-base font-semibold text-gray-700 mb-3 block">
                  Down Payment ($)
                </Label>
                <Input
                  id="downPayment"
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  placeholder="Enter down payment amount"
                  className="text-lg py-6"
                  step="100"
                />
              </div>

              {/* Trade-In Value */}
              <div>
                <Label htmlFor="tradeInValue" className="text-base font-semibold text-gray-700 mb-3 block">
                  Trade-In Value ($)
                </Label>
                <Input
                  id="tradeInValue"
                  type="number"
                  value={tradeInValue}
                  onChange={(e) => setTradeInValue(e.target.value)}
                  placeholder="Value of trade-in vehicle"
                  className="text-lg py-6"
                  step="100"
                />
              </div>

              {/* Amount Owed on Trade-In */}
              <div>
                <Label htmlFor="tradeInOwed" className="text-base font-semibold text-gray-700 mb-3 block">
                  Amount Owed on Trade-In ($)
                </Label>
                <Input
                  id="tradeInOwed"
                  type="number"
                  value={tradeInOwed}
                  onChange={(e) => setTradeInOwed(e.target.value)}
                  placeholder="Loan balance on trade-in"
                  className="text-lg py-6"
                  step="100"
                />
              </div>

              {/* Sales Tax Rate */}
              <div>
                <Label htmlFor="salesTaxRate" className="text-base font-semibold text-gray-700 mb-3 block">
                  Sales Tax Rate (%)
                </Label>
                <Input
                  id="salesTaxRate"
                  type="number"
                  value={salesTaxRate}
                  onChange={(e) => setSalesTaxRate(e.target.value)}
                  placeholder="Enter sales tax percentage"
                  className="text-lg py-6"
                  step="0.1"
                />
              </div>

              {/* Other Fees */}
              <div>
                <Label htmlFor="otherFees" className="text-base font-semibold text-gray-700 mb-3 block">
                  Other Fees ($)
                </Label>
                <Input
                  id="otherFees"
                  type="number"
                  value={otherFees}
                  onChange={(e) => setOtherFees(e.target.value)}
                  placeholder="Title, registration, etc."
                  className="text-lg py-6"
                  step="10"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={calculatePayment}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate
                </Button>
                <Button
                  onClick={reset}
                  variant="outline"
                  className="px-6 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            {result ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Payment Summary</h2>
                </div>

                {/* Monthly Payment */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-center shadow-lg">
                  <p className="text-white text-lg font-semibold mb-2">Monthly Payment</p>
                  <p className="text-white text-5xl font-bold">{formatCurrency(result.monthlyPayment)}</p>
                  <p className="text-blue-100 text-sm mt-2">for {loanTerm} months</p>
                </div>

                {/* Cost Breakdown */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                    <p className="text-green-700 text-sm font-semibold mb-1">Total Loan Amount</p>
                    <p className="text-green-900 text-xl font-bold">{formatCurrency(result.totalLoanAmount)}</p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
                    <p className="text-orange-700 text-sm font-semibold mb-1">Total Interest</p>
                    <p className="text-orange-900 text-xl font-bold">{formatCurrency(result.totalInterest)}</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                    <p className="text-purple-700 text-sm font-semibold mb-1">Down Payment</p>
                    <p className="text-purple-900 text-xl font-bold">{formatCurrency(result.downPayment)}</p>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-4 border-2 border-pink-200">
                    <p className="text-pink-700 text-sm font-semibold mb-1">Sales Tax</p>
                    <p className="text-pink-900 text-xl font-bold">{formatCurrency(result.salesTax)}</p>
                  </div>
                </div>

                {/* Total Cost */}
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-300">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total Cost</span>
                    <span className="text-3xl font-bold text-gray-900">{formatCurrency(result.totalCost)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Price + Tax + Fees + Interest
                  </p>
                </div>

                {/* Principal vs Interest */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Loan Breakdown</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Principal</span>
                        <span className="text-sm font-bold text-gray-900">{result.principalPercentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full"
                          style={{ width: `${result.principalPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Interest</span>
                        <span className="text-sm font-bold text-gray-900">{result.interestPercentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full"
                          style={{ width: `${result.interestPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amortization Button */}
                <Button
                  onClick={() => setShowAmortization(!showAmortization)}
                  variant="outline"
                  className="w-full py-6 text-lg font-semibold rounded-xl border-2 hover:bg-blue-50 hover:border-blue-300"
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  {showAmortization ? 'Hide' : 'Show'} Amortization Schedule
                </Button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mb-6">
                  <Car className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Calculate Your Payment</h3>
                <p className="text-gray-600 max-w-sm">
                  Enter your car loan details to see monthly payments and total costs
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Amortization Schedule */}
        {showAmortization && amortizationSchedule.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Amortization Schedule</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300 bg-gray-50">
                    <th className="text-left py-3 px-4 font-bold text-gray-900">Month</th>
                    <th className="text-right py-3 px-4 font-bold text-gray-900">Payment</th>
                    <th className="text-right py-3 px-4 font-bold text-gray-900">Principal</th>
                    <th className="text-right py-3 px-4 font-bold text-gray-900">Interest</th>
                    <th className="text-right py-3 px-4 font-bold text-gray-900">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {amortizationSchedule.map((row) => (
                    <tr key={row.month} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 font-semibold text-gray-900">{row.month}</td>
                      <td className="text-right py-3 px-4 text-gray-700">{formatCurrency(row.payment)}</td>
                      <td className="text-right py-3 px-4 text-blue-600 font-semibold">{formatCurrency(row.principal)}</td>
                      <td className="text-right py-3 px-4 text-orange-600 font-semibold">{formatCurrency(row.interest)}</td>
                      <td className="text-right py-3 px-4 text-gray-900 font-bold">{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Educational Content - Continuing in next message due to length */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Auto Loans and Car Payments</h2>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">How Car Loans Work</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                An <strong>auto loan</strong> (also called a car loan or vehicle loan) is a secured loan used to purchase a vehicle. When you take out a car loan, the lender provides funds to buy the vehicle, and you agree to repay the amount plus interest over a specified period (the loan term). The vehicle itself serves as collateral, meaning the lender can repossess it if you fail to make payments.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Car loans typically have terms ranging from 24 to 84 months, with 60 months (5 years) being the most common. Interest rates vary based on your credit score, the lender, the loan term, and whether the vehicle is new or used.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Monthly Payment Formula</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Car loan payments are calculated using the standard amortization formula, which ensures you pay off both principal and interest over the loan term:
              </p>

              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200 my-6">
                <p className="font-semibold text-gray-900 mb-4">Monthly Payment Formula:</p>
                <div className="flex items-center justify-center my-4">
                  <div className="inline-flex flex-col items-center">
                    <span className="text-xl font-semibold mb-3">M = </span>
                    <div className="inline-flex flex-col items-center">
                      <span className="text-lg font-semibold px-3 pb-2">P × r × (1 + r)ⁿ</span>
                      <span className="w-full border-t-2 border-gray-900"></span>
                      <span className="text-lg font-semibold px-3 pt-2">(1 + r)ⁿ - 1</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-1 text-sm text-gray-700">
                  <p><strong>M</strong> = Monthly payment</p>
                  <p><strong>P</strong> = Principal loan amount</p>
                  <p><strong>r</strong> = Monthly interest rate (annual rate / 12)</p>
                  <p><strong>n</strong> = Total number of months in loan term</p>
                </div>
              </div>

              <h4 className="text-xl font-bold text-gray-900 mb-3">Example Calculation:</h4>
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200 my-4">
                <p className="font-semibold text-green-900 mb-3">Loan Details:</p>
                <ul className="space-y-1 text-green-800 mb-4">
                  <li>• Loan amount (P) = $24,000</li>
                  <li>• Annual interest rate = 5.5%</li>
                  <li>• Monthly rate (r) = 5.5% / 12 = 0.004583</li>
                  <li>• Loan term (n) = 60 months</li>
                </ul>
                <p className="font-mono text-sm text-green-900 mb-3">
                  M = 24,000 × 0.004583 × (1.004583)⁶⁰ / [(1.004583)⁶⁰ - 1]
                </p>
                <p className="text-xl font-bold text-green-900">
                  Monthly Payment = $456.38
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Factors Affecting Your Car Payment</h3>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Vehicle Price</h4>
                  <p className="text-gray-700 leading-relaxed">
                    The purchase price is the starting point for your loan calculation. Negotiating a lower price or choosing a less expensive vehicle directly reduces your monthly payment and total interest paid.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Down Payment</h4>
                  <p className="text-gray-700 leading-relaxed">
                    A larger down payment reduces the loan amount, lowering monthly payments and interest. Experts recommend putting down at least 20% on new cars and 10% on used cars to avoid being "upside down" on your loan.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Interest Rate</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Your credit score heavily influences your interest rate. Excellent credit (750+) might qualify for rates around 3-5%, while fair credit (640-699) could see rates of 8-12% or higher. Even a 1% difference significantly impacts total cost.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Loan Term</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Longer terms (72-84 months) offer lower monthly payments but cost significantly more in interest. Shorter terms (36-48 months) have higher payments but save thousands in interest and build equity faster.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Trade-In Value</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Trading in your current vehicle provides equity toward the new purchase. However, if you owe more than the trade-in value (negative equity), the difference gets added to your new loan, increasing your payment.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Sales Tax & Fees</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Sales tax (typically 5-10%), title fees, registration, and dealer fees are often rolled into the loan. On a $30,000 car with 7% tax, that's an additional $2,100 to finance, increasing your monthly payment.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Types of Auto Loans</h3>

              <div className="space-y-4 my-6">
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">Direct Lending</h4>
                  <p className="text-blue-800 leading-relaxed mb-3">
                    You obtain financing directly from a bank, credit union, or online lender <em>before</em> shopping for a car. This approach offers several advantages:
                  </p>
                  <ul className="space-y-2 text-blue-800">
                    <li>• <strong>Pre-approval</strong> gives you a concrete budget and bargaining power</li>
                    <li>• <strong>Rate shopping</strong> allows comparison of offers from multiple lenders</li>
                    <li>• <strong>Negotiation leverage</strong> as you're essentially a "cash buyer"</li>
                    <li>• <strong>Credit unions</strong> often offer the best rates (typically 0.5-1% lower than banks)</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                  <h4 className="text-lg font-bold text-purple-900 mb-3">Dealership Financing</h4>
                  <p className="text-purple-800 leading-relaxed mb-3">
                    The dealer arranges financing through their network of lenders. While convenient, this method has considerations:
                  </p>
                  <ul className="space-y-2 text-purple-800">
                    <li>• <strong>Convenience</strong> of one-stop shopping</li>
                    <li>• <strong>Manufacturer incentives</strong> like 0% APR or cash-back offers</li>
                    <li>• <strong>Potential markup</strong> - dealers may add 1-2% to the lender's rate as profit</li>
                    <li>• <strong>Pressure tactics</strong> to upsell extended warranties and add-ons</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                  <h4 className="text-lg font-bold text-green-900 mb-3">Manufacturer Financing</h4>
                  <p className="text-green-800 leading-relaxed mb-3">
                    Automakers' financial arms (like Ford Credit, Toyota Financial Services) offer special promotions:
                  </p>
                  <ul className="space-y-2 text-green-800">
                    <li>• <strong>Promotional rates</strong> (0%, 0.9%, 1.9%) for well-qualified buyers</li>
                    <li>• <strong>Cash rebates</strong> as an alternative to low rates</li>
                    <li>• <strong>Trade-off</strong> - often must choose between low rate OR rebate</li>
                    <li>• <strong>Credit requirements</strong> - best offers require excellent credit (720+)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding the Total Cost of a Car Loan</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your monthly payment is just one component. The <strong>total cost</strong> includes all expenses over the loan's life:
              </p>

              <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200 my-6">
                <h4 className="text-lg font-bold text-orange-900 mb-4">Total Cost Components:</h4>
                <div className="space-y-3 text-orange-800">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold">Vehicle Purchase Price</p>
                      <p className="text-sm">The negotiated price of the car</p>
                    </div>
                    <p className="font-mono font-bold">$30,000</p>
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold">Sales Tax (7%)</p>
                      <p className="text-sm">State and local sales tax</p>
                    </div>
                    <p className="font-mono font-bold">+ $2,100</p>
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold">Title, Registration & Fees</p>
                      <p className="text-sm">DMV and dealer fees</p>
                    </div>
                    <p className="font-mono font-bold">+ $1,500</p>
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold">Down Payment</p>
                      <p className="text-sm">Reduces amount financed</p>
                    </div>
                    <p className="font-mono font-bold">- $6,000</p>
                  </div>
                  <div className="border-t-2 border-orange-400 pt-3 flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold">Amount Financed</p>
                    </div>
                    <p className="font-mono font-bold text-xl">$27,600</p>
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold">Total Interest (5.5% for 60 months)</p>
                      <p className="text-sm">Cost of borrowing</p>
                    </div>
                    <p className="font-mono font-bold">+ $3,983</p>
                  </div>
                  <div className="border-t-2 border-orange-400 pt-3 flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-bold text-lg">TOTAL COST</p>
                    </div>
                    <p className="font-mono font-bold text-2xl">$37,583</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Get the Best Car Loan Rate</h3>

              <div className="space-y-6 my-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Check and Improve Your Credit Score</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Your credit score is the single biggest factor in your interest rate. Get your free credit report from AnnualCreditReport.com and address any errors. Pay down credit card balances, make all payments on time, and avoid opening new credit accounts before applying. Even raising your score from 680 to 720 could save you 1-2% on your rate - that's $1,000+ over a 5-year loan.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Get Pre-Approved Before Shopping</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Apply for pre-approval from your bank, credit union, and 2-3 online lenders. This gives you leverage to negotiate with dealers and ensures you know your budget. Credit unions typically offer rates 0.5-1% lower than banks. Multiple inquiries within 14 days count as a single inquiry on your credit report, so shop around without worry.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Make a Larger Down Payment</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Aim for 20% down on new cars and 10% on used cars. A larger down payment shows financial responsibility and reduces the lender's risk, potentially qualifying you for better rates. It also protects against depreciation - new cars lose 20-30% of value in the first year, and you don't want to owe more than the car is worth.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Choose a Shorter Loan Term</h4>
                    <p className="text-gray-700 leading-relaxed">
                      While 72 and 84-month loans offer lower monthly payments, they come with higher interest rates and you'll pay far more in total interest. A 36 or 48-month loan typically has rates 0.5-1.5% lower than longer terms. If the monthly payment on a shorter term is too high, consider a less expensive vehicle instead of extending the term.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Consider Manufacturer Incentives Carefully</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Automakers often offer either low interest rates (0-2.9%) OR cash rebates ($1,000-$5,000). Use a calculator to determine which saves more money. Generally, if you have excellent credit and qualify for very low rates, take the financing. If rates are moderate, the cash rebate applied to your down payment often saves more in the long run.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">6</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Negotiate the Purchase Price First</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Always negotiate the vehicle's price before discussing financing. Dealers may try to focus on monthly payment instead of total price, which obscures the actual cost. Get the lowest possible purchase price, then discuss financing as a separate transaction. This prevents dealers from inflating the price while offering a "great monthly payment."
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">New vs. Used Car Financing</h3>

              <div className="overflow-x-auto my-6">
                <table className="w-full bg-gray-50 rounded-xl border border-gray-200">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Factor</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">New Car Loan</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Used Car Loan</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Interest Rates</td>
                      <td className="py-3 px-4">Lower (3-6% with good credit)</td>
                      <td className="py-3 px-4">Higher (5-10%+ with good credit)</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Loan Terms Available</td>
                      <td className="py-3 px-4">Up to 84 months common</td>
                      <td className="py-3 px-4">Typically 36-72 months</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Manufacturer Incentives</td>
                      <td className="py-3 px-4">Often available (0% APR, rebates)</td>
                      <td className="py-3 px-4">Rarely available</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Down Payment</td>
                      <td className="py-3 px-4">Recommended 20%</td>
                      <td className="py-3 px-4">Recommended 10%</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Vehicle Depreciation</td>
                      <td className="py-3 px-4">20-30% in first year</td>
                      <td className="py-3 px-4">Slower, already depreciated</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Warranty</td>
                      <td className="py-3 px-4">Full manufacturer warranty</td>
                      <td className="py-3 px-4">May have limited/no warranty</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">Best For</td>
                      <td className="py-3 px-4">Excellent credit, want latest features</td>
                      <td className="py-3 px-4">Budget-conscious, avoid depreciation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Common Car Buying Fees Explained</h3>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 my-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Sales Tax (5-10% of purchase price)</h4>
                    <p className="text-gray-700 text-sm">
                      Varies by state and sometimes county/city. Some states allow trade-in value to reduce taxable amount. Usually rolled into financing.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Title and Registration ($50-$500)</h4>
                    <p className="text-gray-700 text-sm">
                      State DMV fees to transfer ownership and register the vehicle. Includes license plates and title transfer.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Documentation Fee ($75-$700)</h4>
                    <p className="text-gray-700 text-sm">
                      Dealer administrative fee for processing paperwork. Often negotiable, especially if excessive. Some states cap these fees.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Destination Charge ($800-$1,500)</h4>
                    <p className="text-gray-700 text-sm">
                      Manufacturer fee to transport vehicle from factory to dealer. Non-negotiable and already included in MSRP.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Dealer Preparation Fee (Varies)</h4>
                    <p className="text-gray-700 text-sm">
                      Charges for cleaning, inspecting, and preparing vehicle. Often inflated - negotiate or ask for removal.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Extended Warranty (Optional, $1,000-$3,000+)</h4>
                    <p className="text-gray-700 text-sm">
                      Additional coverage beyond manufacturer warranty. High profit for dealers. Research independently and negotiate if desired.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">What's a good interest rate for a car loan?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    For new cars, excellent credit (750+) can qualify for 3-5%, good credit (700-749) sees 5-7%, and fair credit (640-699) gets 7-12%. Used car rates are typically 1-2% higher. Rates vary by lender, loan term, and market conditions. Always shop around and compare at least 3 lenders.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">How much should I put down on a car?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Aim for 20% down on new cars and 10% on used cars. This protects against being "upside down" (owing more than the car's value), lowers your monthly payment, reduces total interest, and may qualify you for better rates. If you can't afford the recommended down payment, consider a less expensive vehicle.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Should I choose a 72-month loan for lower payments?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    While 72 or 84-month loans offer lower monthly payments, they cost significantly more in interest and keep you in debt longer. You're also more likely to be upside down if you need to sell or trade in. A 60-month (5-year) loan is ideal for balancing payment and total cost. If payments are too high, buy a less expensive car rather than extending the term.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Is it better to finance through the dealer or my bank?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Get pre-approved from your bank or credit union first to establish a baseline rate and budget. Then let the dealer try to beat it - they may have access to manufacturer incentives or promotional rates. Credit unions often offer the best rates (0.5-1% lower than banks). Never accept the dealer's first offer without comparing to your pre-approval.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Should I pay off my car loan early?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    If your interest rate is above 5-6%, paying off early can save significant interest. However, check for prepayment penalties (rare but possible). If your rate is very low (0-3%), you might get better returns investing extra money elsewhere. Also, prioritize paying off higher-interest debt (credit cards) before your car loan.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">How does my credit score affect my car loan?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Your credit score dramatically impacts your interest rate. The difference between excellent credit (750+) at 4% and fair credit (650) at 9% is about $2,500 in interest on a $25,000, 5-year loan. Before applying, check your credit report for errors, pay down credit cards, and ensure all bills are current. Even a 50-point score increase can save thousands.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">What if I'm upside down on my current car loan?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Being upside down (owing more than the car's worth) happens when you have little/no down payment, long loan terms, or rapid depreciation. Options include: 1) Pay down the loan before trading, 2) Make a larger down payment on the new car to cover the gap, or 3) Keep driving the current car until you have equity. Rolling negative equity into a new loan creates a dangerous debt cycle.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Should I buy gap insurance?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Gap insurance covers the difference between what you owe and the car's value if it's totaled. It's useful if you: made little/no down payment, have a long loan term (60+ months), or bought a vehicle that depreciates quickly. However, dealers often overcharge ($500-$700). You can usually get the same coverage from your auto insurer for $20-40 per year.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Can I negotiate the interest rate with a dealer?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Yes! Dealers often mark up the interest rate 1-2% above what the lender offers (called "dealer reserve"). Having pre-approval gives you leverage. If the dealer offers financing, ask for the "buy rate" (lender's actual rate). You can negotiate the markup down or eliminate it entirely. Never be afraid to walk away if rates aren't competitive.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">What's the total cost difference between 3%, 5%, and 7% interest?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    On a $25,000 loan for 60 months: At 3%, you pay $1,986 in interest ($449/month). At 5%, you pay $3,307 in interest ($472/month). At 7%, you pay $4,762 in interest ($495/month). The difference between 3% and 7% is $2,776 - that's why shopping for the best rate is crucial. Even half a percent makes a significant difference.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Understanding how car loans work and calculating your payments before visiting a dealership puts you in control of the buying process. Use this calculator to experiment with different scenarios - varying the down payment, loan term, and interest rate - to find the combination that fits your budget while minimizing total cost.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Remember that the lowest monthly payment isn't always the best deal. Consider the total cost over the loan's life, including interest. Get pre-approved, negotiate the purchase price separately from financing, and don't be afraid to walk away if the numbers don't work. A car is one of the largest purchases you'll make - take the time to make an informed decision.
              </p>
            </section>
          </article>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help with Financial Planning?
          </h2>
          <p className="text-xl mb-8 text-blue-50 max-w-3xl mx-auto">
            Our expert tutors can help you understand loans, interest calculations, and make informed financial decisions
          </p>
          <Link href="/tutoring/free-consultation">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Book Your Free Session
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
