'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Home, Calculator, DollarSign, TrendingUp, Calendar, PiggyBank, ArrowRight, BookOpen, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AmortizationEntry {
  month: number;
  date: string;
  payment: number;
  principal: number;
  interest: number;
  extraPayment: number;
  balance: number;
  totalPrincipal: number;
  totalInterest: number;
}

interface YearlyAmortizationEntry {
  year: number;
  beginningBalance: number;
  payment: number;
  principal: number;
  interest: number;
  extraPayment: number;
  endingBalance: number;
}

interface ExtraPayment {
  id: number;
  type: 'monthly' | 'yearly' | 'onetime';
  amount: string;
  startMonth?: string;
  date?: string;
}

export default function AmortizationCalculatorPage() {
  // Basic loan inputs
  const [loanAmount, setLoanAmount] = useState<string>('200000');
  const [loanTermYears, setLoanTermYears] = useState<string>('30');
  const [loanTermMonths, setLoanTermMonths] = useState<string>('0');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [startMonth, setStartMonth] = useState<string>('1');
  const [startYear, setStartYear] = useState<string>('2025');

  // Extra payments
  const [showExtraPayments, setShowExtraPayments] = useState<boolean>(false);
  const [extraPayments, setExtraPayments] = useState<ExtraPayment[]>([]);
  const [nextId, setNextId] = useState<number>(1);

  // Results
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalExtraPayments, setTotalExtraPayments] = useState<number | null>(null);
  const [payoffDate, setPayoffDate] = useState<string | null>(null);
  const [amortization, setAmortization] = useState<AmortizationEntry[]>([]);
  const [yearlyAmortization, setYearlyAmortization] = useState<YearlyAmortizationEntry[]>([]);
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');

  const addExtraPayment = (type: 'monthly' | 'yearly' | 'onetime') => {
    setExtraPayments([
      ...extraPayments,
      {
        id: nextId,
        type,
        amount: '',
        startMonth: type !== 'onetime' ? '1' : undefined,
        date: type === 'onetime' ? '2025-01' : undefined,
      }
    ]);
    setNextId(nextId + 1);
  };

  const removeExtraPayment = (id: number) => {
    setExtraPayments(extraPayments.filter(ep => ep.id !== id));
  };

  const updateExtraPayment = (id: number, field: string, value: string) => {
    setExtraPayments(extraPayments.map(ep =>
      ep.id === id ? { ...ep, [field]: value } : ep
    ));
  };

  const calculateAmortization = () => {
    const principal = parseFloat(loanAmount) || 0;
    const yearsVal = parseInt(loanTermYears) || 0;
    const monthsVal = parseInt(loanTermMonths) || 0;
    const rate = parseFloat(interestRate) || 0;
    const startMonthVal = parseInt(startMonth) || 1;
    const startYearVal = parseInt(startYear) || 2025;

    if (principal <= 0 || (yearsVal === 0 && monthsVal === 0) || rate < 0) {
      alert('Please enter valid values');
      return;
    }

    const totalMonths = yearsVal * 12 + monthsVal;
    const monthlyRate = rate / 100 / 12;

    // Calculate base monthly payment
    let monthlyPmt: number;
    if (rate === 0) {
      monthlyPmt = principal / totalMonths;
    } else {
      monthlyPmt = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
                    (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    setMonthlyPayment(monthlyPmt);

    // Build extra payment schedule
    const extraPaymentSchedule: { [key: string]: number } = {};

    extraPayments.forEach(ep => {
      const amount = parseFloat(ep.amount) || 0;
      if (amount <= 0) return;

      if (ep.type === 'monthly' && ep.startMonth) {
        const startIdx = parseInt(ep.startMonth);
        for (let i = startIdx - 1; i < totalMonths; i++) {
          const date = getMonthKey(startMonthVal, startYearVal, i);
          extraPaymentSchedule[date] = (extraPaymentSchedule[date] || 0) + amount;
        }
      } else if (ep.type === 'yearly' && ep.startMonth) {
        const startIdx = parseInt(ep.startMonth);
        for (let i = startIdx - 1; i < totalMonths; i += 12) {
          const date = getMonthKey(startMonthVal, startYearVal, i);
          extraPaymentSchedule[date] = (extraPaymentSchedule[date] || 0) + amount;
        }
      } else if (ep.type === 'onetime' && ep.date) {
        extraPaymentSchedule[ep.date] = (extraPaymentSchedule[ep.date] || 0) + amount;
      }
    });

    // Generate amortization schedule
    const schedule: AmortizationEntry[] = [];
    let remainingBalance = principal;
    let cumulativePrincipal = 0;
    let cumulativeInterest = 0;
    let cumulativeExtra = 0;
    let actualMonth = 0;

    for (let month = 1; month <= totalMonths && remainingBalance > 0.01; month++) {
      actualMonth = month;
      const dateKey = getMonthKey(startMonthVal, startYearVal, month - 1);
      const dateDisplay = getMonthDisplay(startMonthVal, startYearVal, month - 1);

      const interestPayment = remainingBalance * monthlyRate;
      let principalPayment = Math.min(monthlyPmt - interestPayment, remainingBalance);

      // Add extra payment
      const extra = extraPaymentSchedule[dateKey] || 0;
      principalPayment = Math.min(principalPayment + extra, remainingBalance);

      remainingBalance -= principalPayment;
      cumulativePrincipal += principalPayment - extra;
      cumulativeInterest += interestPayment;
      cumulativeExtra += extra;

      schedule.push({
        month,
        date: dateDisplay,
        payment: monthlyPmt,
        principal: principalPayment - extra,
        interest: interestPayment,
        extraPayment: extra,
        balance: Math.max(0, remainingBalance),
        totalPrincipal: cumulativePrincipal,
        totalInterest: cumulativeInterest,
      });

      if (remainingBalance < 0.01) break;
    }

    setAmortization(schedule);

    // Calculate yearly summary
    const yearlySchedule: YearlyAmortizationEntry[] = [];
    let currentYear = startYearVal;
    let yearIndex = 0;

    while (yearIndex * 12 < schedule.length) {
      const yearEntries = schedule.slice(yearIndex * 12, (yearIndex + 1) * 12);
      if (yearEntries.length === 0) break;

      const beginningBalance = yearIndex === 0 ? principal : yearlySchedule[yearIndex - 1].endingBalance;
      const totalPayment = yearEntries.reduce((sum, e) => sum + e.payment, 0);
      const totalPrincipal = yearEntries.reduce((sum, e) => sum + e.principal, 0);
      const totalInterest = yearEntries.reduce((sum, e) => sum + e.interest, 0);
      const totalExtra = yearEntries.reduce((sum, e) => sum + e.extraPayment, 0);
      const endingBalance = yearEntries[yearEntries.length - 1].balance;

      yearlySchedule.push({
        year: currentYear + yearIndex,
        beginningBalance,
        payment: totalPayment,
        principal: totalPrincipal,
        interest: totalInterest,
        extraPayment: totalExtra,
        endingBalance,
      });

      yearIndex++;
      if (endingBalance < 0.01) break;
    }

    setYearlyAmortization(yearlySchedule);

    // Calculate totals
    const totalInt = schedule.reduce((sum, entry) => sum + entry.interest, 0);
    const totalExtra = schedule.reduce((sum, entry) => sum + entry.extraPayment, 0);
    const totalPmt = (monthlyPmt * actualMonth) + totalExtra;

    setTotalInterest(totalInt);
    setTotalExtraPayments(totalExtra);
    setTotalPayment(totalPmt);

    // Calculate payoff date
    if (schedule.length > 0) {
      const lastEntry = schedule[schedule.length - 1];
      setPayoffDate(lastEntry.date);
    }
  };

  const getMonthKey = (startMonth: number, startYear: number, offset: number): string => {
    const totalMonths = startMonth + offset;
    const year = startYear + Math.floor((totalMonths - 1) / 12);
    const month = ((totalMonths - 1) % 12) + 1;
    return `${year}-${month.toString().padStart(2, '0')}`;
  };

  const getMonthDisplay = (startMonth: number, startYear: number, offset: number): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const totalMonths = startMonth + offset;
    const year = startYear + Math.floor((totalMonths - 1) / 12);
    const month = ((totalMonths - 1) % 12);
    return `${months[month]} ${year}`;
  };

  const reset = () => {
    setLoanAmount('200000');
    setLoanTermYears('30');
    setLoanTermMonths('0');
    setInterestRate('6.5');
    setStartMonth('1');
    setStartYear('2025');
    setExtraPayments([]);
    setMonthlyPayment(null);
    setTotalPayment(null);
    setTotalInterest(null);
    setTotalExtraPayments(null);
    setPayoffDate(null);
    setAmortization([]);
    setYearlyAmortization([]);
    setShowExtraPayments(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

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
            <span className="text-gray-900 font-medium">Amortization Calculator</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-20 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Calendar className="w-16 h-16 text-blue-200 mr-4" />
            <h1 className="text-5xl font-bold">Amortization Calculator</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Create detailed loan amortization schedules with monthly and yearly views.
            Calculate total interest, add extra payments, and see how to pay off loans faster.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Input Section */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-blue-600" />
                  Loan Details
                </h2>

                {/* Loan Amount */}
                <div className="mb-4">
                  <Label htmlFor="loanAmount" className="text-gray-700 font-medium">
                    Loan Amount ($)
                  </Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="mt-1"
                    placeholder="200000"
                  />
                </div>

                {/* Loan Term */}
                <div className="mb-4">
                  <Label className="text-gray-700 font-medium">Loan Term</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div>
                      <Input
                        type="number"
                        value={loanTermYears}
                        onChange={(e) => setLoanTermYears(e.target.value)}
                        placeholder="Years"
                      />
                      <p className="text-xs text-gray-500 mt-1">Years</p>
                    </div>
                    <div>
                      <Input
                        type="number"
                        value={loanTermMonths}
                        onChange={(e) => setLoanTermMonths(e.target.value)}
                        placeholder="Months"
                      />
                      <p className="text-xs text-gray-500 mt-1">Months</p>
                    </div>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="mb-4">
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

                {/* Start Date */}
                <div className="mb-6">
                  <Label className="text-gray-700 font-medium">Loan Start Date</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div>
                      <Select value={startMonth} onValueChange={setStartMonth}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">January</SelectItem>
                          <SelectItem value="2">February</SelectItem>
                          <SelectItem value="3">March</SelectItem>
                          <SelectItem value="4">April</SelectItem>
                          <SelectItem value="5">May</SelectItem>
                          <SelectItem value="6">June</SelectItem>
                          <SelectItem value="7">July</SelectItem>
                          <SelectItem value="8">August</SelectItem>
                          <SelectItem value="9">September</SelectItem>
                          <SelectItem value="10">October</SelectItem>
                          <SelectItem value="11">November</SelectItem>
                          <SelectItem value="12">December</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Input
                        type="number"
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                        placeholder="2025"
                      />
                    </div>
                  </div>
                </div>

                {/* Extra Payments Toggle */}
                <div className="mb-4">
                  <Button
                    onClick={() => setShowExtraPayments(!showExtraPayments)}
                    variant="outline"
                    className="w-full"
                  >
                    {showExtraPayments ? <Minus className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                    {showExtraPayments ? 'Hide' : 'Add'} Extra Payments
                  </Button>
                </div>

                {/* Extra Payments Section */}
                {showExtraPayments && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Extra Payments</h3>

                    {extraPayments.map((ep) => (
                      <div key={ep.id} className="mb-3 p-3 bg-white rounded border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-medium text-gray-600">
                            {ep.type === 'monthly' ? 'Monthly Extra' : ep.type === 'yearly' ? 'Yearly Extra' : 'One-time'}
                          </span>
                          <button
                            onClick={() => removeExtraPayment(ep.id)}
                            className="text-red-500 hover:text-red-700 text-xs"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="space-y-2">
                          <Input
                            type="number"
                            value={ep.amount}
                            onChange={(e) => updateExtraPayment(ep.id, 'amount', e.target.value)}
                            placeholder="Amount ($)"
                            className="text-sm"
                          />
                          {ep.type !== 'onetime' && (
                            <Input
                              type="number"
                              value={ep.startMonth}
                              onChange={(e) => updateExtraPayment(ep.id, 'startMonth', e.target.value)}
                              placeholder="Start at month #"
                              className="text-sm"
                            />
                          )}
                          {ep.type === 'onetime' && (
                            <Input
                              type="month"
                              value={ep.date}
                              onChange={(e) => updateExtraPayment(ep.id, 'date', e.target.value)}
                              className="text-sm"
                            />
                          )}
                        </div>
                      </div>
                    ))}

                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <Button
                        onClick={() => addExtraPayment('monthly')}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        + Monthly
                      </Button>
                      <Button
                        onClick={() => addExtraPayment('yearly')}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        + Yearly
                      </Button>
                      <Button
                        onClick={() => addExtraPayment('onetime')}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        + One-time
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4">
                  <Button
                    onClick={calculateAmortization}
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
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                  Results
                </h2>

                {monthlyPayment !== null ? (
                  <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                        <div className="text-sm text-gray-600 mb-1">Monthly Payment</div>
                        <div className="text-3xl font-bold text-blue-600">
                          {formatCurrency(monthlyPayment)}
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                        <div className="text-sm text-gray-600 mb-1">Total Interest</div>
                        <div className="text-3xl font-bold text-red-600">
                          {formatCurrency(totalInterest || 0)}
                        </div>
                      </div>
                    </div>

                    {/* Detailed Summary */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Loan Amount:</span>
                          <span className="font-semibold text-gray-800">
                            {formatCurrency(parseFloat(loanAmount) || 0)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Payment:</span>
                          <span className="font-semibold text-gray-800">
                            {formatCurrency(totalPayment || 0)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Interest:</span>
                          <span className="font-semibold text-red-600">
                            {formatCurrency(totalInterest || 0)}
                          </span>
                        </div>
                        {totalExtraPayments && totalExtraPayments > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Extra Payments:</span>
                            <span className="font-semibold text-green-600">
                              {formatCurrency(totalExtraPayments)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between border-t border-gray-300 pt-3">
                          <span className="text-gray-600">Payoff Date:</span>
                          <span className="font-bold text-gray-900">
                            {payoffDate || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Breakdown */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="text-sm font-semibold text-gray-700 mb-4">Payment Breakdown</div>
                      {loanAmount && totalInterest && (
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Principal ({((parseFloat(loanAmount) / (parseFloat(loanAmount) + totalInterest)) * 100).toFixed(1)}%)</span>
                              <span>{formatCurrency(parseFloat(loanAmount))}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-blue-500 h-3 rounded-full"
                                style={{ width: `${(parseFloat(loanAmount) / (parseFloat(loanAmount) + totalInterest)) * 100}%` }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Interest ({((totalInterest / (parseFloat(loanAmount) + totalInterest)) * 100).toFixed(1)}%)</span>
                              <span>{formatCurrency(totalInterest)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-red-500 h-3 rounded-full"
                                style={{ width: `${(totalInterest / (parseFloat(loanAmount) + totalInterest)) * 100}%` }}
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
                      Enter your loan details and click Calculate to see results
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Amortization Schedule */}
            {amortization.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                    Amortization Schedule
                  </h3>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setViewMode('monthly')}
                      variant={viewMode === 'monthly' ? 'default' : 'outline'}
                      size="sm"
                    >
                      Monthly
                    </Button>
                    <Button
                      onClick={() => setViewMode('yearly')}
                      variant={viewMode === 'yearly' ? 'default' : 'outline'}
                      size="sm"
                    >
                      Yearly
                    </Button>
                  </div>
                </div>

                {viewMode === 'monthly' ? (
                  <div className="overflow-x-auto">
                    <div className="max-h-96 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100 sticky top-0">
                          <tr>
                            <th className="px-4 py-2 text-left">Month</th>
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-right">Payment</th>
                            <th className="px-4 py-2 text-right">Principal</th>
                            <th className="px-4 py-2 text-right">Interest</th>
                            {totalExtraPayments && totalExtraPayments > 0 && (
                              <th className="px-4 py-2 text-right">Extra</th>
                            )}
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
                              <td className="px-4 py-2 text-gray-700">{entry.date}</td>
                              <td className="px-4 py-2 text-right text-gray-700">
                                {formatCurrency(entry.payment)}
                              </td>
                              <td className="px-4 py-2 text-right text-blue-600">
                                {formatCurrency(entry.principal)}
                              </td>
                              <td className="px-4 py-2 text-right text-red-600">
                                {formatCurrency(entry.interest)}
                              </td>
                              {totalExtraPayments && totalExtraPayments > 0 && (
                                <td className="px-4 py-2 text-right text-green-600">
                                  {entry.extraPayment > 0 ? formatCurrency(entry.extraPayment) : '-'}
                                </td>
                              )}
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
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left">Year</th>
                          <th className="px-4 py-2 text-right">Beginning Balance</th>
                          <th className="px-4 py-2 text-right">Total Payment</th>
                          <th className="px-4 py-2 text-right">Principal</th>
                          <th className="px-4 py-2 text-right">Interest</th>
                          {totalExtraPayments && totalExtraPayments > 0 && (
                            <th className="px-4 py-2 text-right">Extra Payments</th>
                          )}
                          <th className="px-4 py-2 text-right">Ending Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {yearlyAmortization.map((entry, index) => (
                          <tr
                            key={index}
                            className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                          >
                            <td className="px-4 py-2 text-gray-700 font-semibold">{entry.year}</td>
                            <td className="px-4 py-2 text-right text-gray-700">
                              {formatCurrency(entry.beginningBalance)}
                            </td>
                            <td className="px-4 py-2 text-right text-gray-700">
                              {formatCurrency(entry.payment)}
                            </td>
                            <td className="px-4 py-2 text-right text-blue-600">
                              {formatCurrency(entry.principal)}
                            </td>
                            <td className="px-4 py-2 text-right text-red-600">
                              {formatCurrency(entry.interest)}
                            </td>
                            {totalExtraPayments && totalExtraPayments > 0 && (
                              <td className="px-4 py-2 text-right text-green-600">
                                {entry.extraPayment > 0 ? formatCurrency(entry.extraPayment) : '-'}
                              </td>
                            )}
                            <td className="px-4 py-2 text-right text-gray-700">
                              {formatCurrency(entry.endingBalance)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Loan Amortization</h2>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">What is Amortization?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Amortization</strong> is the process of paying off a debt (such as a loan or mortgage) through
              regular, scheduled payments over a specific period. Each payment consists of two components:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>Principal:</strong> The portion that reduces the outstanding loan balance</li>
              <li><strong>Interest:</strong> The cost of borrowing the money, calculated on the remaining balance</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              An <strong>amortization schedule</strong> is a detailed table showing every payment throughout the life
              of the loan, breaking down exactly how much of each payment goes toward principal versus interest.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Amortization Formula</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The monthly payment for an amortized loan is calculated using the following formula:
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
                  <div><strong>M</strong> = Monthly payment</div>
                  <div><strong>P</strong> = Principal loan amount</div>
                  <div><strong>r</strong> = Monthly interest rate (annual rate ÷ 12)</div>
                  <div><strong>n</strong> = Total number of payments (years × 12)</div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">How Interest is Calculated Each Month</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              For each payment period, the interest and principal portions are calculated as follows:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-4 space-y-3">
              <div className="font-semibold text-gray-800">Monthly Interest Payment:</div>
              <div className="font-mono text-sm bg-white p-3 rounded border-l-4 border-red-500">
                Interest = Remaining Balance × Monthly Interest Rate
              </div>
              <div className="font-semibold text-gray-800 mt-4">Monthly Principal Payment:</div>
              <div className="font-mono text-sm bg-white p-3 rounded border-l-4 border-blue-500">
                Principal = Monthly Payment − Interest
              </div>
              <div className="font-semibold text-gray-800 mt-4">New Balance:</div>
              <div className="font-mono text-sm bg-white p-3 rounded border-l-4 border-green-500">
                New Balance = Previous Balance − Principal
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Example Calculation</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Let's calculate the amortization for a $200,000 loan at 6.5% annual interest for 30 years:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-4 space-y-3">
              <div><strong>Given:</strong></div>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Principal (P) = $200,000</li>
                <li>Annual Interest Rate = 6.5%</li>
                <li>Loan Term = 30 years = 360 months</li>
              </ul>
              <div className="mt-4"><strong>Calculate Monthly Payment:</strong></div>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Monthly rate (r) = 6.5% ÷ 12 = 0.065 ÷ 12 = 0.00542</li>
                <li>Number of payments (n) = 30 × 12 = 360</li>
              </ul>
              <div className="mt-4"><strong>Solution:</strong></div>
              <div className="bg-white p-4 rounded border-l-4 border-green-500 text-gray-700">
                <div>M = 200,000 × [0.00542(1.00542)<sup>360</sup>] / [(1.00542)<sup>360</sup> − 1]</div>
                <div className="mt-2">M = 200,000 × 0.00632 / 1.166</div>
                <div className="mt-2 text-lg font-bold text-green-700">M = $1,264.14</div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl my-6 border-l-4 border-blue-500">
              <h4 className="font-semibold text-gray-800 mb-3">First Few Months Breakdown:</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="border border-blue-200 px-3 py-2 text-left">Month</th>
                      <th className="border border-blue-200 px-3 py-2 text-right">Payment</th>
                      <th className="border border-blue-200 px-3 py-2 text-right">Principal</th>
                      <th className="border border-blue-200 px-3 py-2 text-right">Interest</th>
                      <th className="border border-blue-200 px-3 py-2 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr>
                      <td className="border border-blue-200 px-3 py-2">1</td>
                      <td className="border border-blue-200 px-3 py-2 text-right">$1,264.14</td>
                      <td className="border border-blue-200 px-3 py-2 text-right text-blue-600">$180.81</td>
                      <td className="border border-blue-200 px-3 py-2 text-right text-red-600">$1,083.33</td>
                      <td className="border border-blue-200 px-3 py-2 text-right">$199,819.19</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-blue-200 px-3 py-2">2</td>
                      <td className="border border-blue-200 px-3 py-2 text-right">$1,264.14</td>
                      <td className="border border-blue-200 px-3 py-2 text-right text-blue-600">$181.79</td>
                      <td className="border border-blue-200 px-3 py-2 text-right text-red-600">$1,082.35</td>
                      <td className="border border-blue-200 px-3 py-2 text-right">$199,637.40</td>
                    </tr>
                    <tr>
                      <td className="border border-blue-200 px-3 py-2">3</td>
                      <td className="border border-blue-200 px-3 py-2 text-right">$1,264.14</td>
                      <td className="border border-blue-200 px-3 py-2 text-right text-blue-600">$182.78</td>
                      <td className="border border-blue-200 px-3 py-2 text-right text-red-600">$1,081.36</td>
                      <td className="border border-blue-200 px-3 py-2 text-right">$199,454.62</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Notice how the interest portion starts high ($1,083.33) and the principal portion starts low ($180.81).
                Over time, these proportions reverse as the balance decreases.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Types of Amortized Loans</h3>

            <div className="space-y-4 my-6">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-800 mb-2">1. Mortgages (Home Loans)</h4>
                <p className="text-gray-700 text-sm">
                  Home mortgages are typically amortized over 15 or 30 years. A 30-year mortgage has lower monthly
                  payments but costs significantly more in total interest. A 15-year mortgage has higher monthly
                  payments but saves substantial interest over the life of the loan.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-800 mb-2">2. Auto Loans</h4>
                <p className="text-gray-700 text-sm">
                  Car loans are usually amortized over 3-7 years. Shorter terms mean higher monthly payments but
                  less total interest paid. Auto loans typically have lower interest rates than personal loans
                  because the vehicle serves as collateral.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-semibold text-gray-800 mb-2">3. Personal Loans</h4>
                <p className="text-gray-700 text-sm">
                  Personal loans are commonly amortized over 2-5 years. These unsecured loans typically have
                  higher interest rates than secured loans. The fixed payment schedule makes budgeting easier
                  compared to revolving credit like credit cards.
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-5 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-semibold text-gray-800 mb-2">4. Student Loans</h4>
                <p className="text-gray-700 text-sm">
                  Student loans are often amortized over 10-25 years. Federal student loans offer standard 10-year
                  repayment plans, but extended and income-driven plans can stretch to 20-25 years. Longer terms
                  reduce monthly payments but increase total interest significantly.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Benefits of Extra Payments</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Making extra payments toward your loan principal can result in substantial savings:
            </p>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl my-6 border-l-4 border-green-500">
              <h4 className="font-semibold text-gray-800 mb-3">Example: Impact of $200 Extra Monthly Payment</h4>
              <p className="text-sm text-gray-700 mb-3">
                Consider a $200,000 loan at 6.5% for 30 years (monthly payment = $1,264.14):
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-green-100">
                    <tr>
                      <th className="border border-green-200 px-3 py-2 text-left">Scenario</th>
                      <th className="border border-green-200 px-3 py-2 text-right">Payoff Time</th>
                      <th className="border border-green-200 px-3 py-2 text-right">Total Interest</th>
                      <th className="border border-green-200 px-3 py-2 text-right">Savings</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr>
                      <td className="border border-green-200 px-3 py-2">No extra payment</td>
                      <td className="border border-green-200 px-3 py-2 text-right">30 years</td>
                      <td className="border border-green-200 px-3 py-2 text-right">$255,088</td>
                      <td className="border border-green-200 px-3 py-2 text-right">—</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-green-200 px-3 py-2 font-semibold">$200 extra/month</td>
                      <td className="border border-green-200 px-3 py-2 text-right font-semibold">21.5 years</td>
                      <td className="border border-green-200 px-3 py-2 text-right font-semibold">$178,468</td>
                      <td className="border border-green-200 px-3 py-2 text-right text-green-700 font-bold">$76,620</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-green-700 font-semibold mt-3">
                Result: Save $76,620 in interest and pay off 8.5 years earlier!
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Amortization vs. Other Payment Methods</h3>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Payment Structure</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Amortized Loan</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Fixed payments, principal increases over time, interest decreases
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Mortgages, auto loans, personal loans
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Interest-Only Loan</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Pay only interest initially, principal due later or in balloon payment
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Some mortgages, business loans
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Revolving Credit</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Variable payments based on balance, can borrow repeatedly up to limit
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Credit cards, lines of credit
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Balloon Loan</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Small regular payments with large final payment
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Some commercial real estate loans
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Reading an Amortization Schedule</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              An amortization schedule typically includes the following columns:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>Payment Number/Date:</strong> Sequential payment identifier or date</li>
              <li><strong>Payment Amount:</strong> Total payment due (usually fixed)</li>
              <li><strong>Principal:</strong> Amount reducing the loan balance</li>
              <li><strong>Interest:</strong> Cost of borrowing for that period</li>
              <li><strong>Remaining Balance:</strong> Loan amount still owed after payment</li>
              <li><strong>Cumulative Interest:</strong> Total interest paid to date</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Strategies to Pay Off Loans Faster</h3>

            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <PiggyBank className="w-5 h-5 mr-2 text-blue-600" />
                  1. Round Up Payments
                </h4>
                <p className="text-gray-700 text-sm">
                  Round your monthly payment to the nearest $50 or $100. For example, if your payment is $1,264,
                  pay $1,300. This small increase adds up significantly over the loan term.
                </p>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-800 mb-2">2. Make Bi-weekly Payments</h4>
                <p className="text-gray-700 text-sm">
                  Pay half your monthly payment every two weeks. This results in 26 half-payments (13 full payments)
                  per year instead of 12, effectively making one extra payment annually.
                </p>
              </div>

              <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-semibold text-gray-800 mb-2">3. Apply Windfalls to Principal</h4>
                <p className="text-gray-700 text-sm">
                  Use bonuses, tax refunds, or other unexpected income to make lump-sum principal payments.
                  Always specify these are principal-only payments to ensure they reduce your balance.
                </p>
              </div>

              <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-semibold text-gray-800 mb-2">4. Refinance to Shorter Term</h4>
                <p className="text-gray-700 text-sm">
                  If you can afford higher payments, refinance from a 30-year to a 15-year loan. You'll typically
                  get a lower interest rate and save dramatically on total interest paid.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Frequently Asked Questions</h3>

            <div className="space-y-6 my-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">1. What is negative amortization?</h4>
                <p className="text-gray-700 text-sm">
                  Negative amortization occurs when your monthly payment doesn't cover the interest due, causing
                  the unpaid interest to be added to the principal balance. This increases your loan balance over
                  time instead of decreasing it. This can happen with certain adjustable-rate mortgages or
                  payment-option loans.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">2. How is amortization different from depreciation?</h4>
                <p className="text-gray-700 text-sm">
                  <strong>Amortization</strong> applies to paying off debts or allocating the cost of intangible assets
                  (like patents) over time. <strong>Depreciation</strong> applies to allocating the cost of tangible
                  assets (like equipment or vehicles) over their useful life. Both are accounting methods to spread
                  costs over time.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">3. Do all loans have amortization schedules?</h4>
                <p className="text-gray-700 text-sm">
                  No. Only installment loans with fixed payments have traditional amortization schedules. Credit cards,
                  lines of credit, and interest-only loans don't follow standard amortization. Balloon loans have
                  modified amortization with a large final payment.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">4. Can I get a copy of my loan's amortization schedule?</h4>
                <p className="text-gray-700 text-sm">
                  Yes. Your lender should provide an amortization schedule when you close on the loan. You can also
                  request one at any time or use an amortization calculator with your loan terms to generate one
                  yourself. The schedule may change if you make extra payments or refinance.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">5. Will extra payments always reduce my loan term?</h4>
                <p className="text-gray-700 text-sm">
                  Extra payments reduce the principal balance, which reduces future interest charges. However, you
                  must specify that extra payments go toward principal, not future payments. Some lenders may apply
                  extra payments to future scheduled payments instead, which doesn't reduce your loan term or save
                  interest. Always confirm with your lender.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">6. What is an amortization period vs. loan term?</h4>
                <p className="text-gray-700 text-sm">
                  The <strong>amortization period</strong> is the time it would take to fully pay off the loan through
                  regular payments. The <strong>loan term</strong> is the actual length of the loan contract. In some
                  cases (like balloon loans), these differ—the loan may be amortized over 30 years but have a 5-year
                  term requiring refinancing or a balloon payment.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">7. How do prepayment penalties work?</h4>
                <p className="text-gray-700 text-sm">
                  Some loans charge a fee if you pay off the loan early or make extra payments beyond a certain limit.
                  Prepayment penalties protect lenders from losing expected interest income. Always check your loan
                  agreement for prepayment terms. Many mortgages no longer have these penalties, but some commercial
                  and auto loans do.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">8. What happens if I miss a payment?</h4>
                <p className="text-gray-700 text-sm">
                  Missing a payment doesn't change your amortization schedule—it adds late fees and damages your
                  credit score. The unpaid payment accrues additional interest. After 30 days, it's reported to
                  credit bureaus. Multiple missed payments can lead to default and foreclosure (for secured loans)
                  or collections (for unsecured loans).
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">9. Should I pay off my loan early or invest the money?</h4>
                <p className="text-gray-700 text-sm">
                  This depends on your loan's interest rate versus potential investment returns. If your loan has a
                  high interest rate (above 6-7%), paying it off early often makes sense. If your loan has a low rate
                  (below 4%), investing may yield better returns. Consider your risk tolerance, emergency fund needs,
                  and tax implications (mortgage interest is sometimes tax-deductible).
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">10. How does refinancing affect my amortization?</h4>
                <p className="text-gray-700 text-sm">
                  Refinancing creates a new loan with a new amortization schedule. Even if you refinance the same
                  balance for the same term, the "clock resets"—you start over with high-interest, low-principal
                  payments. This is why refinancing to a shorter term (e.g., 30-year to 15-year) or refinancing
                  for a lower rate makes more financial sense than repeatedly refinancing to 30 years.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl p-8 my-12">
              <div className="text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                <h3 className="text-2xl font-bold mb-4">Need Help with Loan Calculations?</h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Our expert tutors can help you understand amortization, financial mathematics,
                  and loan analysis. Book a personalized session today!
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
