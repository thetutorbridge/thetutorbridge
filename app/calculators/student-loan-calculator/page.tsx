'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, GraduationCap, DollarSign, Calendar, TrendingDown, PiggyBank, Home, HelpCircle, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function StudentLoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<string>('50000');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [loanTerm, setLoanTerm] = useState<string>('10');
  const [extraPayment, setExtraPayment] = useState<string>('0');
  const [currency, setCurrency] = useState<string>('USD');

  const currencySymbols: Record<string, string> = {
    USD: '$',
    INR: '₹',
    GBP: '£',
    EUR: '€',
    CAD: 'C$',
    AUD: 'A$',
  };

  const results = useMemo(() => {
    const principal = parseFloat(loanAmount) || 0;
    const annualRate = parseFloat(interestRate) || 0;
    const years = parseFloat(loanTerm) || 0;
    const extra = parseFloat(extraPayment) || 0;

    if (principal <= 0 || annualRate <= 0 || years <= 0) return null;

    const monthlyRate = annualRate / 100 / 12;
    const totalPayments = years * 12;

    // Standard monthly payment (no extra payments)
    const standardMonthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);

    // Calculate with extra payments
    const actualMonthlyPayment = standardMonthlyPayment + extra;

    // Calculate payoff with extra payments
    let balance = principal;
    let months = 0;
    let totalInterestWithExtra = 0;
    const amortization: { month: number; payment: number; principal: number; interest: number; balance: number }[] = [];

    while (balance > 0 && months < 600) { // Max 50 years
      months++;
      const interestPayment = balance * monthlyRate;
      let principalPayment = actualMonthlyPayment - interestPayment;

      if (principalPayment > balance) {
        principalPayment = balance;
      }

      totalInterestWithExtra += interestPayment;
      balance -= principalPayment;

      if (balance < 0) balance = 0;

      // Store first 12 months and every 12th month after
      if (months <= 12 || months % 12 === 0) {
        amortization.push({
          month: months,
          payment: principalPayment + interestPayment,
          principal: principalPayment,
          interest: interestPayment,
          balance: balance,
        });
      }
    }

    // Calculate standard totals (no extra payments)
    const totalPaidStandard = standardMonthlyPayment * totalPayments;
    const totalInterestStandard = totalPaidStandard - principal;

    // Calculate savings from extra payments
    const actualTotalPaid = totalInterestWithExtra + principal;
    const interestSavings = totalInterestStandard - totalInterestWithExtra;
    const monthsSaved = totalPayments - months;
    const yearsSaved = Math.floor(monthsSaved / 12);
    const remainingMonthsSaved = monthsSaved % 12;

    return {
      monthlyPayment: standardMonthlyPayment,
      actualMonthlyPayment,
      totalPayments,
      totalPaidStandard,
      totalInterestStandard,
      actualTotalPaid,
      totalInterestWithExtra,
      interestSavings,
      monthsSaved,
      yearsSaved,
      remainingMonthsSaved,
      payoffMonths: months,
      payoffYears: Math.floor(months / 12),
      payoffRemainingMonths: months % 12,
      amortization,
    };
  }, [loanAmount, interestRate, loanTerm, extraPayment]);

  const formatCurrency = (amount: number) => {
    const symbol = currencySymbols[currency] || '$';
    if (currency === 'INR' && amount >= 100000) {
      return `${symbol}${(amount / 100000).toFixed(2)}L`;
    }
    return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How is student loan payment calculated?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Monthly student loan payments are calculated using the standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1], where M is monthly payment, P is principal, r is monthly interest rate, and n is number of payments.'
                }
              },
              {
                '@type': 'Question',
                name: 'How can I pay off my student loans faster?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can pay off student loans faster by: making extra payments toward principal, paying bi-weekly instead of monthly, refinancing to a lower interest rate, or using windfalls (tax refunds, bonuses) for lump sum payments.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is student loan forgiveness?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Student loan forgiveness programs cancel some or all of your student debt. Public Service Loan Forgiveness (PSLF) forgives remaining debt after 120 qualifying payments while working for qualifying employers. Income-driven repayment plans offer forgiveness after 20-25 years.'
                }
              },
              {
                '@type': 'Question',
                name: 'Should I refinance my student loans?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Refinancing makes sense if you can get a significantly lower interest rate and have stable income. However, refinancing federal loans into private loans means losing access to federal benefits like income-driven repayment and loan forgiveness programs.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is the average student loan interest rate?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Federal student loan rates vary by year and loan type. As of 2024, undergraduate Direct Loans are around 5.5%, graduate Direct Loans around 7%, and PLUS loans around 8%. Private loan rates vary widely based on creditworthiness, typically 4-14%.'
                }
              }
            ]
          })
        }}
      />
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        {/* Breadcrumb */}
        <div className="bg-white/80 backdrop-blur-sm py-3 px-4 shadow-sm">
          <div className="max-w-6xl mx-auto">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-indigo-600 hover:text-indigo-800 flex items-center">
                <Home className="w-4 h-4 mr-1" />Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/calculators" className="text-indigo-600 hover:text-indigo-800">Calculators</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 font-medium">Student Loan Calculator</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Student Loan Calculator</h1>
            </div>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Calculate your student loan payments, see how extra payments can save you money, and plan your path to being debt-free.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-2 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-indigo-600" />
                  Loan Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">Total Loan Amount</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currencySymbols[currency]}</span>
                        <Input
                          type="number"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(e.target.value)}
                          className="h-12 pl-8"
                          min="0"
                        />
                      </div>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger className="w-24 h-12"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="INR">INR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="CAD">CAD</SelectItem>
                          <SelectItem value="AUD">AUD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">Interest Rate (%)</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        className="h-12 pr-8"
                        step="0.1"
                        min="0"
                        max="30"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">Loan Term</Label>
                    <Select value={loanTerm} onValueChange={setLoanTerm}>
                      <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 years</SelectItem>
                        <SelectItem value="10">10 years (Standard)</SelectItem>
                        <SelectItem value="15">15 years</SelectItem>
                        <SelectItem value="20">20 years</SelectItem>
                        <SelectItem value="25">25 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">Extra Monthly Payment (Optional)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currencySymbols[currency]}</span>
                      <Input
                        type="number"
                        value={extraPayment}
                        onChange={(e) => setExtraPayment(e.target.value)}
                        className="h-12 pl-8"
                        min="0"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">See how extra payments can save you money</p>
                  </div>
                </div>
              </div>

              {/* Amortization Preview */}
              {results && (
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Schedule Preview</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-3 px-2 font-semibold text-gray-600">Month</th>
                          <th className="text-right py-3 px-2 font-semibold text-gray-600">Payment</th>
                          <th className="text-right py-3 px-2 font-semibold text-gray-600">Principal</th>
                          <th className="text-right py-3 px-2 font-semibold text-gray-600">Interest</th>
                          <th className="text-right py-3 px-2 font-semibold text-gray-600">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.amortization.slice(0, 12).map((row) => (
                          <tr key={row.month} className="border-b border-gray-100">
                            <td className="py-2 px-2">{row.month}</td>
                            <td className="py-2 px-2 text-right">{formatCurrency(row.payment)}</td>
                            <td className="py-2 px-2 text-right text-green-600">{formatCurrency(row.principal)}</td>
                            <td className="py-2 px-2 text-right text-red-600">{formatCurrency(row.interest)}</td>
                            <td className="py-2 px-2 text-right font-medium">{formatCurrency(row.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white p-6 md:p-8 rounded-xl shadow-xl sticky top-4">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <DollarSign className="w-6 h-6 mr-2" />
                  Loan Summary
                </h2>

                {results ? (
                  <div className="space-y-4">
                    <div className="bg-white/20 backdrop-blur-sm p-5 rounded-lg border-2 border-yellow-300">
                      <p className="text-sm text-indigo-200 mb-1">Monthly Payment</p>
                      <p className="text-3xl font-bold text-yellow-300">{formatCurrency(results.actualMonthlyPayment)}</p>
                      {parseFloat(extraPayment) > 0 && (
                        <p className="text-xs text-indigo-200">({formatCurrency(results.monthlyPayment)} + {formatCurrency(parseFloat(extraPayment))} extra)</p>
                      )}
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <p className="text-sm text-indigo-200 mb-1">Total Amount Paid</p>
                      <p className="text-xl font-semibold">{formatCurrency(results.actualTotalPaid)}</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <p className="text-sm text-indigo-200 mb-1">Total Interest Paid</p>
                      <p className="text-xl font-semibold text-red-300">{formatCurrency(results.totalInterestWithExtra)}</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        <p className="text-sm text-indigo-200">Payoff Time</p>
                      </div>
                      <p className="text-xl font-semibold">
                        {results.payoffYears > 0 && `${results.payoffYears} years`}
                        {results.payoffYears > 0 && results.payoffRemainingMonths > 0 && ', '}
                        {results.payoffRemainingMonths > 0 && `${results.payoffRemainingMonths} months`}
                      </p>
                    </div>

                    {parseFloat(extraPayment) > 0 && results.interestSavings > 0 && (
                      <div className="bg-green-500/80 backdrop-blur-sm p-4 rounded-lg">
                        <div className="flex items-center">
                          <PiggyBank className="w-5 h-5 mr-2" />
                          <p className="text-sm font-medium">Your Savings!</p>
                        </div>
                        <p className="text-lg font-bold mt-1">{formatCurrency(results.interestSavings)} saved</p>
                        <p className="text-sm">
                          {results.yearsSaved > 0 && `${results.yearsSaved}y `}
                          {results.remainingMonthsSaved > 0 && `${results.remainingMonthsSaved}m `}
                          earlier payoff
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <GraduationCap className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-indigo-200">Enter your loan details to see your payment summary</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {[
                { question: 'How is my monthly payment calculated?', answer: 'Monthly payments use the standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1]. P is principal, r is monthly interest rate, n is number of payments. This ensures equal payments that fully pay off the loan by the end of the term.' },
                { question: 'How can I pay off loans faster?', answer: 'Make extra payments toward principal, pay bi-weekly instead of monthly, refinance to a lower rate, or use windfalls (tax refunds, bonuses) for lump sum payments. Even small extra payments can save thousands in interest.' },
                { question: 'What is student loan forgiveness?', answer: 'Programs like Public Service Loan Forgiveness (PSLF) cancel remaining debt after 120 qualifying payments while working for qualifying employers. Income-driven plans offer forgiveness after 20-25 years of payments.' },
                { question: 'Should I refinance my student loans?', answer: 'Refinancing can lower your rate if you have good credit and stable income. But refinancing federal loans into private loans means losing federal benefits like income-driven repayment and forgiveness programs.' },
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-start">
                    <HelpCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-indigo-600" />{faq.question}
                  </h3>
                  <p className="text-gray-700 ml-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Calculators */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Related Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'EMI Calculator', href: '/calculators/emi-calculator', description: 'Calculate loan EMI payments' },
                { name: 'Compound Interest', href: '/calculators/compound-interest-calculator', description: 'See how interest compounds' },
                { name: 'Salary Calculator', href: '/calculators/salary-calculator', description: 'Calculate take-home salary' },
                { name: 'GPA Calculator', href: '/calculators/gpa-calculator', description: 'Calculate your GPA' },
              ].map((calc) => (
                <Link key={calc.href} href={calc.href} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all group">
                  <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 mb-1">{calc.name}</h3>
                  <p className="text-sm text-gray-600">{calc.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
