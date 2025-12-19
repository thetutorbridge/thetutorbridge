'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calculator, RotateCcw, DollarSign, Clock, Calendar, TrendingUp, Info } from 'lucide-react';
import Link from 'next/link';

type Currency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'CAD' | 'AUD';

interface CurrencyInfo {
  symbol: string;
  name: string;
}

const currencies: Record<Currency, CurrencyInfo> = {
  USD: { symbol: '$', name: 'US Dollar' },
  EUR: { symbol: '€', name: 'Euro' },
  GBP: { symbol: '£', name: 'British Pound' },
  INR: { symbol: '₹', name: 'Indian Rupee' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar' },
  AUD: { symbol: 'A$', name: 'Australian Dollar' },
};

export default function AnnualIncomeCalculatorPage() {
  // Input states
  const [hoursPerWeek, setHoursPerWeek] = useState<string>('40');
  const [weeksPerYear, setWeeksPerYear] = useState<string>('52');
  const [hourlyWage, setHourlyWage] = useState<string>('');
  const [annualIncome, setAnnualIncome] = useState<string>('');
  const [taxRate, setTaxRate] = useState<string>('');
  const [currency, setCurrency] = useState<Currency>('USD');

  // Calculated results
  const [netHourlyWage, setNetHourlyWage] = useState<number | null>(null);
  const [netAnnualIncome, setNetAnnualIncome] = useState<number | null>(null);
  const [monthlyIncome, setMonthlyIncome] = useState<number | null>(null);
  const [weeklyIncome, setWeeklyIncome] = useState<number | null>(null);
  const [dailyIncome, setDailyIncome] = useState<number | null>(null);

  // Track which field was last changed for auto-calculation
  const [lastChanged, setLastChanged] = useState<'hourly' | 'annual' | null>(null);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const calculateFromHourly = () => {
    const hours = parseFloat(hoursPerWeek);
    const weeks = parseFloat(weeksPerYear);
    const wage = parseFloat(hourlyWage);
    const tax = parseFloat(taxRate) || 0;

    if (!isNaN(hours) && !isNaN(weeks) && !isNaN(wage) && hours > 0 && weeks > 0 && wage > 0) {
      const grossAnnual = wage * hours * weeks;
      const netAnnual = grossAnnual * (1 - tax / 100);
      const netHourly = wage * (1 - tax / 100);

      setAnnualIncome(grossAnnual.toFixed(2));
      setNetAnnualIncome(netAnnual);
      setNetHourlyWage(netHourly);
      setMonthlyIncome(grossAnnual / 12);
      setWeeklyIncome(grossAnnual / weeks);
      setDailyIncome(grossAnnual / (weeks * 5)); // Assuming 5-day work week
    }
  };

  const calculateFromAnnual = () => {
    const hours = parseFloat(hoursPerWeek);
    const weeks = parseFloat(weeksPerYear);
    const annual = parseFloat(annualIncome);
    const tax = parseFloat(taxRate) || 0;

    if (!isNaN(hours) && !isNaN(weeks) && !isNaN(annual) && hours > 0 && weeks > 0 && annual > 0) {
      const totalHours = hours * weeks;
      const hourly = annual / totalHours;
      const netAnnual = annual * (1 - tax / 100);
      const netHourly = hourly * (1 - tax / 100);

      setHourlyWage(hourly.toFixed(2));
      setNetAnnualIncome(netAnnual);
      setNetHourlyWage(netHourly);
      setMonthlyIncome(annual / 12);
      setWeeklyIncome(annual / weeks);
      setDailyIncome(annual / (weeks * 5));
    }
  };

  useEffect(() => {
    if (lastChanged === 'hourly') {
      calculateFromHourly();
    } else if (lastChanged === 'annual') {
      calculateFromAnnual();
    }
  }, [hoursPerWeek, weeksPerYear, hourlyWage, annualIncome, taxRate, lastChanged]);

  const handleHourlyChange = (value: string) => {
    setHourlyWage(value);
    setLastChanged('hourly');
  };

  const handleAnnualChange = (value: string) => {
    setAnnualIncome(value);
    setLastChanged('annual');
  };

  const handleReset = () => {
    setHoursPerWeek('40');
    setWeeksPerYear('52');
    setHourlyWage('');
    setAnnualIncome('');
    setTaxRate('');
    setNetHourlyWage(null);
    setNetAnnualIncome(null);
    setMonthlyIncome(null);
    setWeeklyIncome(null);
    setDailyIncome(null);
    setLastChanged(null);
  };

  const currencySymbol = currencies[currency].symbol;

  // Quick presets for common scenarios
  const hourlyPresets = [
    { label: 'Minimum Wage (US)', value: '7.25' },
    { label: '$15/hour', value: '15' },
    { label: '$25/hour', value: '25' },
    { label: '$50/hour', value: '50' },
    { label: '$100/hour', value: '100' },
  ];

  const annualPresets = [
    { label: '$30,000', value: '30000' },
    { label: '$50,000', value: '50000' },
    { label: '$75,000', value: '75000' },
    { label: '$100,000', value: '100000' },
    { label: '$150,000', value: '150000' },
  ];

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Annual Income Calculator',
    description: 'Free annual income calculator to convert hourly wage to yearly salary and vice versa. Calculate gross and net income with tax deductions.',
    url: 'https://www.thetutorbridge.com/calculators/annual-income-calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'The Tutor Bridge',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I calculate annual income from hourly wage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To calculate annual income from hourly wage, multiply your hourly rate by the number of hours you work per week, then multiply by the number of weeks you work per year. Formula: Annual Income = Hourly Wage × Hours per Week × Weeks per Year. For example, $20/hour × 40 hours × 52 weeks = $41,600 per year.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between gross and net annual income?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Gross annual income is your total earnings before any deductions like taxes, insurance, or retirement contributions. Net annual income (take-home pay) is what you actually receive after all deductions. Net Income = Gross Income × (1 - Tax Rate).',
        },
      },
      {
        '@type': 'Question',
        name: 'How much is $20 an hour annually?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If you work full-time (40 hours per week, 52 weeks per year), $20 per hour equals $41,600 per year before taxes. With a 22% tax rate, your net annual income would be approximately $32,448.',
        },
      },
      {
        '@type': 'Question',
        name: 'What hourly wage do I need to make $100,000 a year?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To earn $100,000 per year working full-time (40 hours/week, 52 weeks/year), you need an hourly wage of approximately $48.08. This is calculated by dividing $100,000 by 2,080 total working hours per year.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-[#1A3D7C] to-[#2563eb]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Annual Income Calculator
              </h1>
              <p className="text-lg md:text-xl text-blue-100">
                Convert hourly wage to annual salary or calculate hourly rate from yearly income. Include tax deductions to see your net take-home pay.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Panel */}
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[#1A3D7C]" />
                    Income Details
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset
                  </Button>
                </div>

                {/* Currency Selection */}
                <div className="mb-6">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Currency
                  </Label>
                  <Select value={currency} onValueChange={(v) => setCurrency(v as Currency)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(currencies).map(([code, info]) => (
                        <SelectItem key={code} value={code}>
                          {info.symbol} - {info.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Working Hours Section */}
                <div className="p-4 bg-blue-50 rounded-xl mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#1A3D7C]" />
                    Working Hours
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Hours per Week
                      </Label>
                      <Input
                        type="number"
                        value={hoursPerWeek}
                        onChange={(e) => setHoursPerWeek(e.target.value)}
                        placeholder="40"
                        min="1"
                        max="168"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Weeks per Year
                      </Label>
                      <Input
                        type="number"
                        value={weeksPerYear}
                        onChange={(e) => setWeeksPerYear(e.target.value)}
                        placeholder="52"
                        min="1"
                        max="52"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Total hours/year: {(parseFloat(hoursPerWeek) * parseFloat(weeksPerYear)).toLocaleString() || 0}
                  </p>
                </div>

                {/* Hourly Wage Input */}
                <div className="mb-6">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Hourly Wage
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      {currencySymbol}
                    </span>
                    <Input
                      type="number"
                      value={hourlyWage}
                      onChange={(e) => handleHourlyChange(e.target.value)}
                      placeholder="Enter hourly rate"
                      className="pl-8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {hourlyPresets.map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => handleHourlyChange(preset.value)}
                        className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Annual Income Input */}
                <div className="mb-6">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Annual Income (Gross)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      {currencySymbol}
                    </span>
                    <Input
                      type="number"
                      value={annualIncome}
                      onChange={(e) => handleAnnualChange(e.target.value)}
                      placeholder="Enter annual salary"
                      className="pl-8"
                      min="0"
                      step="100"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {annualPresets.map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => handleAnnualChange(preset.value)}
                        className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tax Rate Section */}
                <div className="p-4 bg-orange-50 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                    Net Salary (After Tax)
                  </h3>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Tax Rate (%)
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={taxRate}
                        onChange={(e) => setTaxRate(e.target.value)}
                        placeholder="Enter tax percentage"
                        className="pr-8"
                        min="0"
                        max="100"
                        step="0.1"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        %
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[10, 15, 22, 24, 30, 35].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => setTaxRate(rate.toString())}
                          className="text-xs px-2 py-1 bg-orange-100 hover:bg-orange-200 rounded-full text-orange-700 transition-colors"
                        >
                          {rate}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Panel */}
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#2BAE66]" />
                  Income Breakdown
                </h2>

                {(hourlyWage || annualIncome) && parseFloat(hourlyWage) > 0 ? (
                  <div className="space-y-6">
                    {/* Gross Income Summary */}
                    <div className="p-5 bg-gradient-to-br from-[#1A3D7C]/5 to-[#2BAE66]/5 rounded-xl border-2 border-[#1A3D7C]/20">
                      <h3 className="text-sm font-medium text-gray-600 mb-1">Gross Annual Income</h3>
                      <p className="text-3xl font-bold text-[#1A3D7C]">
                        {currencySymbol}{formatCurrency(parseFloat(annualIncome) || 0)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {currencySymbol}{formatCurrency(parseFloat(hourlyWage) || 0)}/hour
                      </p>
                    </div>

                    {/* Income Breakdown Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <p className="text-xs text-gray-500 mb-1">Monthly</p>
                        <p className="text-lg font-bold text-gray-800">
                          {currencySymbol}{formatCurrency(monthlyIncome || 0)}
                        </p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <p className="text-xs text-gray-500 mb-1">Weekly</p>
                        <p className="text-lg font-bold text-gray-800">
                          {currencySymbol}{formatCurrency(weeklyIncome || 0)}
                        </p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <p className="text-xs text-gray-500 mb-1">Daily (5-day week)</p>
                        <p className="text-lg font-bold text-gray-800">
                          {currencySymbol}{formatCurrency(dailyIncome || 0)}
                        </p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <p className="text-xs text-gray-500 mb-1">Hourly</p>
                        <p className="text-lg font-bold text-gray-800">
                          {currencySymbol}{formatCurrency(parseFloat(hourlyWage) || 0)}
                        </p>
                      </div>
                    </div>

                    {/* Net Income (After Tax) */}
                    {taxRate && parseFloat(taxRate) > 0 && (
                      <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                        <h3 className="text-sm font-medium text-gray-600 mb-1">Net Annual Income (After {taxRate}% Tax)</h3>
                        <p className="text-3xl font-bold text-green-600">
                          {currencySymbol}{formatCurrency(netAnnualIncome || 0)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {currencySymbol}{formatCurrency(netHourlyWage || 0)}/hour net
                        </p>
                        <div className="mt-3 pt-3 border-t border-green-200">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tax Deducted:</span>
                            <span className="font-semibold text-red-600">
                              -{currencySymbol}{formatCurrency((parseFloat(annualIncome) || 0) - (netAnnualIncome || 0))}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm mt-1">
                            <span className="text-gray-600">Monthly Take-Home:</span>
                            <span className="font-semibold text-green-600">
                              {currencySymbol}{formatCurrency((netAnnualIncome || 0) / 12)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Calculation Formula */}
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        Calculation
                      </h4>
                      <p className="text-sm text-gray-600 font-mono bg-white p-2 rounded">
                        {currencySymbol}{formatCurrency(parseFloat(hourlyWage) || 0)} × {hoursPerWeek} hrs × {weeksPerYear} weeks = {currencySymbol}{formatCurrency(parseFloat(annualIncome) || 0)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">💰</div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Enter Your Income Details
                    </h3>
                    <p className="text-gray-500">
                      Enter either your hourly wage or annual income to see the full breakdown of your earnings.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Salary Comparison Table */}
            <div className="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Hourly to Annual Salary Conversion Table
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Hourly Wage</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Weekly (40hrs)</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Monthly</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Annual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[7.25, 10, 15, 20, 25, 30, 40, 50, 75, 100].map((rate) => {
                      const weekly = rate * 40;
                      const annual = rate * 40 * 52;
                      const monthly = annual / 12;
                      return (
                        <tr key={rate} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{currencySymbol}{rate.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right">{currencySymbol}{formatCurrency(weekly)}</td>
                          <td className="py-3 px-4 text-right">{currencySymbol}{formatCurrency(monthly)}</td>
                          <td className="py-3 px-4 text-right font-semibold">{currencySymbol}{formatCurrency(annual)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Content */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              Understanding Annual Income
            </h2>

            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">
                  How to Calculate Annual Income
                </h3>
                <p className="text-gray-700 mb-4">
                  The formula to calculate annual income from an hourly wage is straightforward:
                </p>
                <div className="p-4 bg-blue-50 rounded-lg mb-4">
                  <p className="font-mono text-center text-lg font-semibold text-[#1A3D7C]">
                    Annual Income = Hourly Wage × Hours per Week × Weeks per Year
                  </p>
                </div>
                <p className="text-gray-700">
                  For a standard full-time employee working 40 hours per week for 52 weeks, the formula simplifies to: <strong>Annual Income = Hourly Wage × 2,080</strong>
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">
                  Gross vs. Net Income
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Gross Income</h4>
                    <p className="text-gray-700 text-sm">
                      Your total earnings before any deductions. This is your &quot;on paper&quot; salary that includes all compensation before taxes, insurance, and retirement contributions are taken out.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Net Income (Take-Home Pay)</h4>
                    <p className="text-gray-700 text-sm">
                      The amount you actually receive after all deductions. This is what gets deposited into your bank account and represents your true spending power.
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                  <p className="text-gray-700 text-sm">
                    <strong>Net Income Formula:</strong> Net Income = Gross Income × (1 - Tax Rate)
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">
                  Common Questions Answered
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">How much is $15 an hour annually?</h4>
                    <p className="text-gray-700 text-sm">
                      At $15/hour working full-time (40 hours/week, 52 weeks/year): $15 × 40 × 52 = <strong>$31,200 per year</strong> before taxes.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">What hourly wage equals $100,000 a year?</h4>
                    <p className="text-gray-700 text-sm">
                      $100,000 ÷ 2,080 hours = <strong>$48.08 per hour</strong> for full-time work.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">How do I account for unpaid time off?</h4>
                    <p className="text-gray-700 text-sm">
                      Reduce the &quot;weeks per year&quot; value. For example, if you take 2 weeks unpaid vacation, use 50 weeks instead of 52 in your calculation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">
                  Tips for Using This Calculator
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><strong>Part-time workers:</strong> Adjust hours per week to match your actual schedule</li>
                  <li><strong>Contract workers:</strong> Reduce weeks per year to account for gaps between contracts</li>
                  <li><strong>Overtime:</strong> Calculate regular and overtime hours separately, then add the results</li>
                  <li><strong>Multiple jobs:</strong> Calculate each job separately and sum the totals</li>
                  <li><strong>Tax estimation:</strong> Use your marginal tax bracket for a rough estimate of net income</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'How do I calculate annual income from hourly wage?',
                  a: 'Multiply your hourly rate by the number of hours you work per week, then multiply by the number of weeks you work per year. For full-time work: Hourly Rate × 40 hours × 52 weeks = Annual Income.',
                },
                {
                  q: 'What is the difference between gross and net annual income?',
                  a: 'Gross annual income is your total earnings before deductions (taxes, insurance, retirement). Net annual income is your take-home pay after all deductions are subtracted.',
                },
                {
                  q: 'How many work hours are in a year?',
                  a: 'A standard full-time work year has 2,080 hours (40 hours per week × 52 weeks). After accounting for holidays and vacation (typically 10-15 days), actual working hours are usually around 1,920-2,000.',
                },
                {
                  q: 'Should I include overtime in my annual income calculation?',
                  a: 'Yes, if you regularly work overtime. Calculate your regular hours at standard pay, then add overtime hours at 1.5x (or your overtime rate) separately.',
                },
                {
                  q: 'How do I calculate my hourly rate from a salary?',
                  a: 'Divide your annual salary by the total number of hours you work per year. For full-time: Annual Salary ÷ 2,080 = Hourly Rate.',
                },
                {
                  q: 'What is a good annual income?',
                  a: 'This depends on your location, lifestyle, and family size. In the US, the median household income is around $70,000. A "good" income is one that comfortably covers your expenses and allows for savings.',
                },
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Book Your Session CTA */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-[#1A3D7C] to-[#2563eb]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Need Help with Financial Planning?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Our expert tutors can help you understand personal finance, budgeting, and investment concepts. Book a personalized session today!
            </p>
            <Link href="/book-demo-class">
              <Button size="lg" className="bg-[#FFC857] hover:bg-[#ffb627] text-gray-900 font-semibold px-8">
                Book Your Session
              </Button>
            </Link>
          </div>
        </section>

        {/* Related Calculators */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Related Calculators
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/calculators/compound-interest-calculator"
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <h3 className="font-semibold text-[#1A3D7C] mb-1">Compound Interest Calculator</h3>
                <p className="text-sm text-gray-600">Calculate investment growth over time</p>
              </Link>
              <Link
                href="/calculators/emi-calculator"
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <h3 className="font-semibold text-[#1A3D7C] mb-1">EMI Calculator</h3>
                <p className="text-sm text-gray-600">Calculate loan monthly payments</p>
              </Link>
              <Link
                href="/calculators/percentage-calculator"
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <h3 className="font-semibold text-[#1A3D7C] mb-1">Percentage Calculator</h3>
                <p className="text-sm text-gray-600">Calculate percentages easily</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
