'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  DollarSign,
  TrendingUp,
  Calculator,
  ChevronDown,
  ChevronUp,
  Percent,
  Clock,
  Calendar,
  Info
} from 'lucide-react';

type PayPeriod = 'hourly' | 'weekly' | 'monthly' | 'annual';

interface SalaryBreakdown {
  hourly: number;
  weekly: number;
  monthly: number;
  annual: number;
}

export default function PayRaiseCalculator() {
  // Input state
  const [hoursPerWeek, setHoursPerWeek] = useState<string>('40');
  const [raisePercentage, setRaisePercentage] = useState<string>('');

  // Pay before raise - user can input any one
  const [beforeHourly, setBeforeHourly] = useState<string>('');
  const [beforeWeekly, setBeforeWeekly] = useState<string>('');
  const [beforeMonthly, setBeforeMonthly] = useState<string>('');
  const [beforeAnnual, setBeforeAnnual] = useState<string>('');
  const [beforeInputField, setBeforeInputField] = useState<PayPeriod | null>(null);

  // Raise amounts
  const [raiseHourly, setRaiseHourly] = useState<string>('');
  const [raiseWeekly, setRaiseWeekly] = useState<string>('');
  const [raiseMonthly, setRaiseMonthly] = useState<string>('');
  const [raiseAnnual, setRaiseAnnual] = useState<string>('');
  const [raiseInputField, setRaiseInputField] = useState<PayPeriod | null>(null);

  // Pay after raise
  const [afterSalary, setAfterSalary] = useState<SalaryBreakdown | null>(null);

  // Collapsible sections
  const [beforeExpanded, setBeforeExpanded] = useState(true);
  const [raiseExpanded, setRaiseExpanded] = useState(true);
  const [afterExpanded, setAfterExpanded] = useState(true);
  const [showFAQ, setShowFAQ] = useState<number | null>(null);

  // Calculate all periods from one input
  const calculateAllPeriods = (value: number, inputPeriod: PayPeriod, hours: number): SalaryBreakdown => {
    let hourlyRate: number;
    const weeksPerYear = 52;
    const monthsPerYear = 12;

    switch (inputPeriod) {
      case 'hourly':
        hourlyRate = value;
        break;
      case 'weekly':
        hourlyRate = value / hours;
        break;
      case 'monthly':
        hourlyRate = (value * monthsPerYear) / (weeksPerYear * hours);
        break;
      case 'annual':
        hourlyRate = value / (weeksPerYear * hours);
        break;
    }

    return {
      hourly: hourlyRate,
      weekly: hourlyRate * hours,
      monthly: (hourlyRate * hours * weeksPerYear) / monthsPerYear,
      annual: hourlyRate * hours * weeksPerYear
    };
  };

  // Handle before salary input
  const handleBeforeInput = (value: string, period: PayPeriod) => {
    const hours = parseFloat(hoursPerWeek) || 40;

    // Update the input field
    switch (period) {
      case 'hourly':
        setBeforeHourly(value);
        break;
      case 'weekly':
        setBeforeWeekly(value);
        break;
      case 'monthly':
        setBeforeMonthly(value);
        break;
      case 'annual':
        setBeforeAnnual(value);
        break;
    }

    setBeforeInputField(period);

    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      const breakdown = calculateAllPeriods(numValue, period, hours);

      // Update all fields except the one being edited
      if (period !== 'hourly') setBeforeHourly(breakdown.hourly.toFixed(2));
      if (period !== 'weekly') setBeforeWeekly(breakdown.weekly.toFixed(2));
      if (period !== 'monthly') setBeforeMonthly(breakdown.monthly.toFixed(2));
      if (period !== 'annual') setBeforeAnnual(breakdown.annual.toFixed(2));
    }
  };

  // Handle raise amount input
  const handleRaiseAmountInput = (value: string, period: PayPeriod) => {
    const hours = parseFloat(hoursPerWeek) || 40;

    switch (period) {
      case 'hourly':
        setRaiseHourly(value);
        break;
      case 'weekly':
        setRaiseWeekly(value);
        break;
      case 'monthly':
        setRaiseMonthly(value);
        break;
      case 'annual':
        setRaiseAnnual(value);
        break;
    }

    setRaiseInputField(period);

    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      const breakdown = calculateAllPeriods(numValue, period, hours);

      if (period !== 'hourly') setRaiseHourly(breakdown.hourly.toFixed(2));
      if (period !== 'weekly') setRaiseWeekly(breakdown.weekly.toFixed(2));
      if (period !== 'monthly') setRaiseMonthly(breakdown.monthly.toFixed(2));
      if (period !== 'annual') setRaiseAnnual(breakdown.annual.toFixed(2));

      // Calculate percentage if before salary exists
      const beforeValue = parseFloat(beforeAnnual);
      if (!isNaN(beforeValue) && beforeValue > 0) {
        const percentage = (breakdown.annual / beforeValue) * 100;
        setRaisePercentage(percentage.toFixed(2));
      }
    }
  };

  // Main calculation effect
  useEffect(() => {
    const hours = parseFloat(hoursPerWeek) || 40;
    const percentage = parseFloat(raisePercentage);
    const beforeValue = parseFloat(beforeAnnual);

    if (!isNaN(beforeValue) && beforeValue > 0) {
      // If percentage is entered, calculate raise amounts and after salary
      if (!isNaN(percentage) && percentage > 0 && !raiseInputField) {
        const raiseAmount = beforeValue * (percentage / 100);
        const raiseBreakdown = calculateAllPeriods(raiseAmount, 'annual', hours);

        setRaiseHourly(raiseBreakdown.hourly.toFixed(2));
        setRaiseWeekly(raiseBreakdown.weekly.toFixed(2));
        setRaiseMonthly(raiseBreakdown.monthly.toFixed(2));
        setRaiseAnnual(raiseBreakdown.annual.toFixed(2));

        const newSalary = beforeValue + raiseAmount;
        setAfterSalary(calculateAllPeriods(newSalary, 'annual', hours));
      } else if (raiseInputField) {
        // Calculate after salary from raise amount
        const raiseValue = parseFloat(raiseAnnual);
        if (!isNaN(raiseValue) && raiseValue > 0) {
          const newSalary = beforeValue + raiseValue;
          setAfterSalary(calculateAllPeriods(newSalary, 'annual', hours));
        }
      }
    }
  }, [raisePercentage, beforeAnnual, raiseAnnual, hoursPerWeek, raiseInputField]);

  // Handle percentage input
  const handlePercentageInput = (value: string) => {
    setRaisePercentage(value);
    setRaiseInputField(null); // Reset raise input field when percentage is manually entered
  };

  // Recalculate when hours change
  useEffect(() => {
    if (beforeInputField) {
      const currentValue = (() => {
        switch (beforeInputField) {
          case 'hourly': return beforeHourly;
          case 'weekly': return beforeWeekly;
          case 'monthly': return beforeMonthly;
          case 'annual': return beforeAnnual;
        }
      })();
      handleBeforeInput(currentValue, beforeInputField);
    }
  }, [hoursPerWeek]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const faqs = [
    {
      question: "How do I calculate my pay after a raise?",
      answer: "To calculate your pay after a raise, use this formula: New Salary = Old Salary + (Old Salary × Raise Percentage / 100). For example, if you earn $50,000 annually and receive a 5% raise, your new salary would be $50,000 + ($50,000 × 0.05) = $52,500."
    },
    {
      question: "What is a good pay raise percentage?",
      answer: "A typical annual raise ranges from 3-5% to keep pace with inflation and cost of living. A 5-10% raise is considered good, especially for promotions or taking on additional responsibilities. Raises above 10% are excellent and typically come with significant role changes or job switches."
    },
    {
      question: "How do I negotiate a higher salary raise?",
      answer: "To negotiate a higher raise: 1) Research market rates for your position, 2) Document your achievements and contributions, 3) Choose the right timing (after completing a major project), 4) Practice your pitch, 5) Be specific about the raise you're requesting, and 6) Be prepared to discuss non-salary benefits if the raise isn't possible."
    },
    {
      question: "Is a 10% raise the same hourly, weekly, monthly, and annually?",
      answer: "Yes! A 10% raise is equivalent across all pay periods. Whether you calculate it hourly, weekly, monthly, or annually, the percentage increase remains the same. If you earn $20/hour and get a 10% raise, your new rate is $22/hour - and your annual salary also increases by exactly 10%."
    },
    {
      question: "What percentage raise equals one extra month's salary?",
      answer: "To earn one extra month's salary per year, you need approximately an 8.33% raise (1/12 = 0.0833 or 8.33%). This means by year's end, your total compensation will be equivalent to 13 months of your previous salary."
    },
    {
      question: "How do I convert hourly wage to annual salary?",
      answer: "To convert hourly wage to annual salary: Annual Salary = Hourly Rate × Hours per Week × 52 weeks. For example, $25/hour at 40 hours/week = $25 × 40 × 52 = $52,000 annually."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Pay Raise Calculator",
    "description": "Free pay raise calculator to compute your new salary after a raise. Enter your current pay and raise percentage to see hourly, weekly, monthly, and annual breakdowns.",
    "url": "https://www.thetutorbridge.com/calculators/pay-raise-calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "The Tutor Bridge"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
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
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1A3D7C]/10 mb-4">
              <TrendingUp className="w-8 h-8 text-[#1A3D7C]" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Pay Raise Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Calculate your new salary after a raise. See the difference in hourly, weekly, monthly, and annual pay.
            </p>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            {/* Hours per Week */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours per week
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent transition-all"
                  placeholder="40"
                />
              </div>
            </div>

            {/* Pay Before Raise Section */}
            <div className="mb-6 border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setBeforeExpanded(!beforeExpanded)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {beforeExpanded ? <ChevronUp className="w-5 h-5 text-[#1A3D7C]" /> : <ChevronDown className="w-5 h-5 text-[#1A3D7C]" />}
                  <span className="font-semibold text-gray-900">Pay before raise</span>
                </div>
              </button>

              {beforeExpanded && (
                <div className="p-4 space-y-4">
                  {/* Hourly */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Hourly</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        value={beforeHourly}
                        onChange={(e) => handleBeforeInput(e.target.value, 'hourly')}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Weekly */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Weekly</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        value={beforeWeekly}
                        onChange={(e) => handleBeforeInput(e.target.value, 'weekly')}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Monthly */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Monthly</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        value={beforeMonthly}
                        onChange={(e) => handleBeforeInput(e.target.value, 'monthly')}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Annual */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Annual</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        value={beforeAnnual}
                        onChange={(e) => handleBeforeInput(e.target.value, 'annual')}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Raise Section */}
            <div className="mb-6 border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setRaiseExpanded(!raiseExpanded)}
                className="w-full flex items-center justify-between p-4 bg-[#2BAE66]/10 hover:bg-[#2BAE66]/20 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {raiseExpanded ? <ChevronUp className="w-5 h-5 text-[#2BAE66]" /> : <ChevronDown className="w-5 h-5 text-[#2BAE66]" />}
                  <span className="font-semibold text-gray-900">Raise</span>
                </div>
              </button>

              {raiseExpanded && (
                <div className="p-4 space-y-4">
                  {/* Percentage */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Percentage</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={raisePercentage}
                        onChange={(e) => handlePercentageInput(e.target.value)}
                        className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent"
                        placeholder="0"
                      />
                      <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Raise Hourly */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Hourly</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        value={raiseHourly}
                        onChange={(e) => handleRaiseAmountInput(e.target.value, 'hourly')}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Raise Weekly */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Weekly</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        value={raiseWeekly}
                        onChange={(e) => handleRaiseAmountInput(e.target.value, 'weekly')}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Raise Monthly */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Monthly</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        value={raiseMonthly}
                        onChange={(e) => handleRaiseAmountInput(e.target.value, 'monthly')}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Raise Annual */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Annual</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        value={raiseAnnual}
                        onChange={(e) => handleRaiseAmountInput(e.target.value, 'annual')}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pay After Raise Section */}
            <div className="mb-6 border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setAfterExpanded(!afterExpanded)}
                className="w-full flex items-center justify-between p-4 bg-[#1A3D7C]/10 hover:bg-[#1A3D7C]/20 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {afterExpanded ? <ChevronUp className="w-5 h-5 text-[#1A3D7C]" /> : <ChevronDown className="w-5 h-5 text-[#1A3D7C]" />}
                  <span className="font-semibold text-gray-900">Pay after raise</span>
                </div>
              </button>

              {afterExpanded && (
                <div className="p-4 space-y-4">
                  {/* After Hourly */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Hourly</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={afterSalary ? afterSalary.hourly.toFixed(2) : ''}
                        readOnly
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                        placeholder="—"
                      />
                    </div>
                  </div>

                  {/* After Weekly */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Weekly</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={afterSalary ? afterSalary.weekly.toFixed(2) : ''}
                        readOnly
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                        placeholder="—"
                      />
                    </div>
                  </div>

                  {/* After Monthly */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Monthly</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={afterSalary ? afterSalary.monthly.toFixed(2) : ''}
                        readOnly
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                        placeholder="—"
                      />
                    </div>
                  </div>

                  {/* After Annual */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Annual</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={afterSalary ? afterSalary.annual.toFixed(2) : ''}
                        readOnly
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                        placeholder="—"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results Summary */}
            {afterSalary && parseFloat(beforeAnnual) > 0 && (
              <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Your Raise Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <p className="text-sm opacity-80">Raise %</p>
                    <p className="text-xl font-bold">{raisePercentage}%</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <p className="text-sm opacity-80">Annual Increase</p>
                    <p className="text-xl font-bold">{formatCurrency(parseFloat(raiseAnnual) || 0)}</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <p className="text-sm opacity-80">Monthly Increase</p>
                    <p className="text-xl font-bold">{formatCurrency(parseFloat(raiseMonthly) || 0)}</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <p className="text-sm opacity-80">New Annual</p>
                    <p className="text-xl font-bold">{formatCurrency(afterSalary.annual)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* How to Use */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-[#1A3D7C]" />
              How to Use the Pay Raise Calculator
            </h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center font-bold">1</span>
                <p><strong>Enter your current pay:</strong> Input your current salary in any field (hourly, weekly, monthly, or annual). The other fields will auto-calculate.</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center font-bold">2</span>
                <p><strong>Enter your raise:</strong> Input either the raise percentage OR the raise amount in dollars. The calculator will compute the other values.</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center font-bold">3</span>
                <p><strong>View your new salary:</strong> See your pay after the raise broken down by hourly, weekly, monthly, and annual amounts.</p>
              </div>
            </div>
          </div>

          {/* Pay Raise Formula */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pay Raise Formula</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <p className="text-center text-lg font-mono text-[#1A3D7C]">
                New Salary = Old Salary + (Old Salary × Raise %)
              </p>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-[#2BAE66] pl-4">
                <h3 className="font-semibold text-gray-900">Example Calculation</h3>
                <p className="text-gray-600 mt-2">
                  If your current annual salary is <strong>$50,000</strong> and you receive a <strong>5% raise</strong>:
                </p>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li>• Raise amount = $50,000 × 0.05 = <strong>$2,500</strong></li>
                  <li>• New salary = $50,000 + $2,500 = <strong>$52,500</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Common Raise Percentages */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Raise Percentages</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Raise Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Typical Range</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 px-4">Cost of Living Adjustment</td>
                    <td className="py-3 px-4 text-[#2BAE66] font-medium">2-3%</td>
                    <td className="py-3 px-4 text-gray-600">Matches inflation</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Merit Increase</td>
                    <td className="py-3 px-4 text-[#2BAE66] font-medium">3-5%</td>
                    <td className="py-3 px-4 text-gray-600">Based on performance</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Promotion</td>
                    <td className="py-3 px-4 text-[#2BAE66] font-medium">10-15%</td>
                    <td className="py-3 px-4 text-gray-600">New responsibilities</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Job Change</td>
                    <td className="py-3 px-4 text-[#2BAE66] font-medium">10-20%</td>
                    <td className="py-3 px-4 text-gray-600">New employer</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">One Extra Month Annually</td>
                    <td className="py-3 px-4 text-[#2BAE66] font-medium">8.33%</td>
                    <td className="py-3 px-4 text-gray-600">1/12 = 8.33%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-[#1A3D7C]/5 rounded-2xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Info className="w-6 h-6 text-[#1A3D7C]" />
              Tips for Negotiating Your Raise
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-[#1A3D7C] mb-2">Do Your Research</h3>
                <p className="text-gray-600 text-sm">Know the market rate for your position using sites like Glassdoor, LinkedIn, or PayScale.</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-[#1A3D7C] mb-2">Document Achievements</h3>
                <p className="text-gray-600 text-sm">Keep a record of your accomplishments, positive feedback, and contributions to the company.</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-[#1A3D7C] mb-2">Time It Right</h3>
                <p className="text-gray-600 text-sm">Ask after completing a major project or during annual review cycles.</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-[#1A3D7C] mb-2">Be Specific</h3>
                <p className="text-gray-600 text-sm">Come prepared with a specific number or range based on your research and value.</p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowFAQ(showFAQ === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {showFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-[#1A3D7C]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#1A3D7C]" />
                    )}
                  </button>
                  {showFAQ === index && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Need Help With Financial Planning?</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Our expert tutors can help you understand budgeting, salary negotiations, and financial literacy. Book a session today!
            </p>
            <a
              href="/book-session"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1A3D7C] font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Book Your Session
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
