'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Clock, TrendingUp, CheckCircle, HelpCircle, Lightbulb, Home, BookOpen, ArrowRight, Briefcase, Calendar, IndianRupee, ChevronDown, ChevronUp, Users, Target, Award, PiggyBank } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';

interface SalaryResult {
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number;
  biweeklyRate: number;
  monthlyRate: number;
  annualSalary: number;
  totalHoursPerYear: number;
  totalHoursPerMonth: number;
  totalHoursPerWeek: number;
}

export default function SalaryToHourlyCalculatorPage() {
  // Input state
  const [salaryAmount, setSalaryAmount] = useState<string>('');
  const [salaryPeriod, setSalaryPeriod] = useState<string>('annual');
  const [hoursPerWeek, setHoursPerWeek] = useState<string>('40');
  const [weeksPerYear, setWeeksPerYear] = useState<string>('52');
  const [currency, setCurrency] = useState<string>('INR');

  // Results state
  const [result, setResult] = useState<SalaryResult | null>(null);
  const [showOtherIntervals, setShowOtherIntervals] = useState<boolean>(false);

  const currencySymbols: { [key: string]: string } = {
    'INR': '₹',
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
  };

  const calculateSalary = () => {
    const amount = parseFloat(salaryAmount);
    const hrsPerWeek = parseFloat(hoursPerWeek);
    const wksPerYear = parseFloat(weeksPerYear);

    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid salary amount');
      return;
    }

    if (isNaN(hrsPerWeek) || hrsPerWeek <= 0 || hrsPerWeek > 168) {
      alert('Please enter valid hours per week (1-168)');
      return;
    }

    if (isNaN(wksPerYear) || wksPerYear <= 0 || wksPerYear > 52) {
      alert('Please enter valid weeks per year (1-52)');
      return;
    }

    // Calculate total hours
    const totalHoursPerYear = hrsPerWeek * wksPerYear;
    const totalHoursPerMonth = totalHoursPerYear / 12;
    const totalHoursPerWeek = hrsPerWeek;

    // Convert input salary to annual salary first
    let annualSalary: number;
    switch (salaryPeriod) {
      case 'hourly':
        annualSalary = amount * totalHoursPerYear;
        break;
      case 'daily':
        annualSalary = amount * (hrsPerWeek / (hrsPerWeek > 40 ? 5 : hrsPerWeek / 8)) * wksPerYear;
        break;
      case 'weekly':
        annualSalary = amount * wksPerYear;
        break;
      case 'biweekly':
        annualSalary = amount * (wksPerYear / 2);
        break;
      case 'monthly':
        annualSalary = amount * 12;
        break;
      case 'annual':
      default:
        annualSalary = amount;
        break;
    }

    // Calculate all rates from annual salary
    const hourlyRate = annualSalary / totalHoursPerYear;
    const dailyRate = hourlyRate * (hrsPerWeek / 5); // Assuming 5 working days
    const weeklyRate = annualSalary / wksPerYear;
    const biweeklyRate = weeklyRate * 2;
    const monthlyRate = annualSalary / 12;

    setResult({
      hourlyRate,
      dailyRate,
      weeklyRate,
      biweeklyRate,
      monthlyRate,
      annualSalary,
      totalHoursPerYear,
      totalHoursPerMonth,
      totalHoursPerWeek,
    });
  };

  const handleClear = () => {
    setSalaryAmount('');
    setSalaryPeriod('annual');
    setHoursPerWeek('40');
    setWeeksPerYear('52');
    setResult(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    if (salaryAmount && parseFloat(salaryAmount) > 0) {
      calculateSalary();
    }
  }, [salaryAmount, salaryPeriod, hoursPerWeek, weeksPerYear]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto max-w-6xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/calculators" className="text-[#1A3D7C] hover:text-[#2BAE66]">
              Calculators
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Salary to Hourly Calculator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <IndianRupee className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Salary to Hourly Calculator</h1>
            </div>
            <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
              Convert your annual, monthly, or weekly salary to hourly rate. Calculate your wage across different time intervals with precision.
            </p>
          </div>
        </div>

        {/* Main Calculator Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Calculator Card */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-2 border-gray-200 mb-8">
            <div className="bg-[#1A3D7C] text-white p-4 rounded-lg mb-6 flex items-center">
              <Calculator className="w-6 h-6 mr-3" />
              <p className="text-lg">Enter your salary details to calculate hourly rate</p>
            </div>

            <div className="space-y-6">
              {/* Currency Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-lg font-semibold text-gray-700 mb-3 block">
                    Currency
                  </Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">₹ Indian Rupee (INR)</SelectItem>
                      <SelectItem value="USD">$ US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">€ Euro (EUR)</SelectItem>
                      <SelectItem value="GBP">£ British Pound (GBP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-lg font-semibold text-gray-700 mb-3 block">
                    Salary Period
                  </Label>
                  <Select value={salaryPeriod} onValueChange={setSalaryPeriod}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Biweekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Salary Amount */}
              <div>
                <Label className="text-lg font-semibold text-gray-700 mb-3 block">
                  {salaryPeriod.charAt(0).toUpperCase() + salaryPeriod.slice(1)} Salary
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-medium">
                    {currencySymbols[currency]}
                  </span>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={salaryAmount}
                    onChange={(e) => setSalaryAmount(e.target.value)}
                    className="h-14 text-xl pl-10"
                  />
                </div>
              </div>

              {/* Hours and Weeks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-lg font-semibold text-gray-700 mb-3 block">
                    Hours per Week
                  </Label>
                  <Input
                    type="number"
                    placeholder="40"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(e.target.value)}
                    className="h-12 text-lg"
                  />
                  <p className="text-sm text-gray-500 mt-1">Standard: 40 hours/week</p>
                </div>

                <div>
                  <Label className="text-lg font-semibold text-gray-700 mb-3 block">
                    Weeks per Year
                  </Label>
                  <Input
                    type="number"
                    placeholder="52"
                    value={weeksPerYear}
                    onChange={(e) => setWeeksPerYear(e.target.value)}
                    className="h-12 text-lg"
                  />
                  <p className="text-sm text-gray-500 mt-1">Standard: 52 weeks (no vacation)</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button
                  onClick={calculateSalary}
                  className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white px-8 py-6 text-lg font-semibold rounded-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate
                </Button>
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="px-8 py-6 text-lg font-semibold rounded-lg border-gray-400 text-gray-600 hover:bg-gray-100"
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-2 border-[#2BAE66] mb-8">
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-lg mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Your Wage Breakdown
                </h2>
              </div>

              <div className="space-y-6">
                {/* Primary Results - Hourly Rate */}
                <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-[#1A3D7C] mb-4 text-center">Hourly Rate</h3>
                  <div className="text-center">
                    <span className="text-5xl md:text-6xl font-bold text-[#2BAE66]">
                      {currencySymbols[currency]}{formatCurrency(result.hourlyRate)}
                    </span>
                    <span className="text-2xl text-gray-600 ml-2">/hour</span>
                  </div>
                  <div className="mt-4 bg-white p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Formula:</p>
                    <p className="font-mono text-lg">
                      Hourly Rate = Annual Salary ÷ Total Hours/Year
                    </p>
                    <p className="font-mono text-sm text-gray-500 mt-1">
                      = {currencySymbols[currency]}{formatCurrency(result.annualSalary)} ÷ {formatNumber(result.totalHoursPerYear)} hrs
                    </p>
                  </div>
                </div>

                {/* Your Wage As Section */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-[#1A3D7C] mb-4 flex items-center">
                    <ChevronUp className="w-5 h-5 mr-2 text-[#1A3D7C]" />
                    Your wage as:
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600 mb-1">Daily</p>
                      <p className="text-xl font-bold text-[#1A3D7C]">
                        {currencySymbols[currency]}{formatCurrency(result.dailyRate)}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600 mb-1">Weekly</p>
                      <p className="text-xl font-bold text-[#1A3D7C]">
                        {currencySymbols[currency]}{formatCurrency(result.weeklyRate)}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600 mb-1">Biweekly</p>
                      <p className="text-xl font-bold text-[#1A3D7C]">
                        {currencySymbols[currency]}{formatCurrency(result.biweeklyRate)}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600 mb-1">Monthly</p>
                      <p className="text-xl font-bold text-[#1A3D7C]">
                        {currencySymbols[currency]}{formatCurrency(result.monthlyRate)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Other Time Intervals - Collapsible */}
                <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setShowOtherIntervals(!showOtherIntervals)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-xl font-bold text-[#1A3D7C] flex items-center">
                      {showOtherIntervals ? (
                        <ChevronUp className="w-5 h-5 mr-2" />
                      ) : (
                        <ChevronDown className="w-5 h-5 mr-2" />
                      )}
                      Other time intervals
                    </h3>
                  </button>
                  {showOtherIntervals && (
                    <div className="p-6 border-t border-gray-200">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600">Annual Salary</p>
                          <p className="text-2xl font-bold text-[#1A3D7C]">
                            {currencySymbols[currency]}{formatCurrency(result.annualSalary)}
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600">Total Hours/Year</p>
                          <p className="text-2xl font-bold text-[#1A3D7C]">
                            {formatNumber(result.totalHoursPerYear)} hrs
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600">Total Hours/Month</p>
                          <p className="text-2xl font-bold text-[#1A3D7C]">
                            {formatNumber(result.totalHoursPerMonth)} hrs
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600">Hours/Week</p>
                          <p className="text-2xl font-bold text-[#1A3D7C]">
                            {formatNumber(result.totalHoursPerWeek)} hrs
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Calculation Breakdown */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border-2 border-indigo-200">
                  <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">Calculation Breakdown</h3>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="bg-white p-3 rounded">
                      <p className="text-gray-600">Step 1: Calculate total working hours per year</p>
                      <p className="font-semibold">
                        H<sub>year</sub> = {hoursPerWeek} hrs/week × {weeksPerYear} weeks = {formatNumber(result.totalHoursPerYear)} hours
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="text-gray-600">Step 2: Calculate hourly rate</p>
                      <p className="font-semibold">
                        Rate<sub>hourly</sub> = {currencySymbols[currency]}{formatCurrency(result.annualSalary)} ÷ {formatNumber(result.totalHoursPerYear)} = {currencySymbols[currency]}{formatCurrency(result.hourlyRate)}/hr
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="text-gray-600">Step 3: Derive other rates</p>
                      <p className="font-semibold">
                        Rate<sub>daily</sub> = Rate<sub>hourly</sub> × (Hours/Week ÷ 5) = {currencySymbols[currency]}{formatCurrency(result.dailyRate)}
                      </p>
                      <p className="font-semibold">
                        Rate<sub>weekly</sub> = Annual ÷ {weeksPerYear} = {currencySymbols[currency]}{formatCurrency(result.weeklyRate)}
                      </p>
                      <p className="font-semibold">
                        Rate<sub>monthly</sub> = Annual ÷ 12 = {currencySymbols[currency]}{formatCurrency(result.monthlyRate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* What is Salary to Hourly Calculator Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">What is a Salary to Hourly Calculator?</h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p className="text-lg leading-relaxed">
                A <strong>Salary to Hourly Calculator</strong> is a financial tool that converts your salary from one pay period to another, most commonly from annual salary to hourly wage. This conversion is essential for comparing job offers, understanding your true earning rate, budgeting, and negotiating compensation.
              </p>
              <p className="text-lg leading-relaxed">
                The fundamental formula for converting salary to hourly rate is based on the relationship between total compensation and total working hours:
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200 my-4">
                <p className="text-center text-xl font-mono">
                  <strong>Hourly Rate</strong> = <span className="inline-flex flex-col items-center mx-2">
                    <span className="border-b-2 border-gray-800 px-2">Annual Salary</span>
                    <span className="px-2">Hours per Week × Weeks per Year</span>
                  </span>
                </p>
              </div>
              <p className="text-lg leading-relaxed">
                For a standard full-time employee working 40 hours per week for 52 weeks, the total annual hours equal <strong>2,080 hours</strong>. If you take paid vacation, the weeks worked remains 52. If you have unpaid time off, you should adjust the weeks per year accordingly.
              </p>
            </div>
          </div>

          {/* The Mathematics Behind Salary Conversion */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border-2 border-indigo-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">The Mathematics Behind Salary Conversion</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Core Conversion Formulas</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-[#1A3D7C] mb-2">Annual to Hourly:</p>
                    <p className="font-mono text-sm">
                      H<sub>rate</sub> = S<sub>annual</sub> ÷ (H<sub>week</sub> × W<sub>year</sub>)
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-[#1A3D7C] mb-2">Monthly to Hourly:</p>
                    <p className="font-mono text-sm">
                      H<sub>rate</sub> = S<sub>monthly</sub> ÷ (H<sub>week</sub> × 52 ÷ 12)
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-[#1A3D7C] mb-2">Weekly to Hourly:</p>
                    <p className="font-mono text-sm">
                      H<sub>rate</sub> = S<sub>weekly</sub> ÷ H<sub>week</sub>
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-[#1A3D7C] mb-2">Daily to Hourly:</p>
                    <p className="font-mono text-sm">
                      H<sub>rate</sub> = S<sub>daily</sub> ÷ (H<sub>week</sub> ÷ 5)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Standard Working Hours Reference</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#1A3D7C] text-white">
                        <th className="border border-gray-300 px-4 py-2 text-left">Time Period</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Hours (40 hrs/week)</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Formula</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">Per Day</td>
                        <td className="border border-gray-300 px-4 py-2">8 hours</td>
                        <td className="border border-gray-300 px-4 py-2 font-mono text-sm">40 ÷ 5 = 8</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Per Week</td>
                        <td className="border border-gray-300 px-4 py-2">40 hours</td>
                        <td className="border border-gray-300 px-4 py-2 font-mono text-sm">Standard</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">Per Month</td>
                        <td className="border border-gray-300 px-4 py-2">173.33 hours</td>
                        <td className="border border-gray-300 px-4 py-2 font-mono text-sm">40 × 52 ÷ 12</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Per Year</td>
                        <td className="border border-gray-300 px-4 py-2">2,080 hours</td>
                        <td className="border border-gray-300 px-4 py-2 font-mono text-sm">40 × 52</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-xl border-2 border-blue-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">How to Use the Salary to Hourly Calculator</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-[#2BAE66] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Your Currency</h3>
                  <p className="text-gray-700">Choose your currency (INR, USD, EUR, or GBP) from the dropdown menu.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#2BAE66] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Choose Salary Period</h3>
                  <p className="text-gray-700">Select whether your salary is hourly, daily, weekly, biweekly, monthly, or annual.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#2BAE66] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Enter Your Salary Amount</h3>
                  <p className="text-gray-700">Input your salary amount. The calculator will automatically convert it to all other time periods.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#2BAE66] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Adjust Working Hours (Optional)</h3>
                  <p className="text-gray-700">Modify hours per week (default: 40) and weeks per year (default: 52) for accurate calculations based on your actual work schedule.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Practical Examples Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Practical Examples</h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Example 1: Annual Salary to Hourly (India)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
                    <ul className="text-gray-600 space-y-1">
                      <li>Annual Salary: ₹6,00,000</li>
                      <li>Hours per Week: 40</li>
                      <li>Weeks per Year: 52</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Solution:</strong></p>
                    <div className="bg-white p-3 rounded font-mono text-sm">
                      <p>Total Hours = 40 × 52 = 2,080 hrs</p>
                      <p>Hourly Rate = ₹6,00,000 ÷ 2,080</p>
                      <p className="text-[#2BAE66] font-bold">= ₹288.46/hour</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Example 2: Monthly Salary to Hourly (US)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
                    <ul className="text-gray-600 space-y-1">
                      <li>Monthly Salary: $5,000</li>
                      <li>Hours per Week: 40</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Solution:</strong></p>
                    <div className="bg-white p-3 rounded font-mono text-sm">
                      <p>Annual = $5,000 × 12 = $60,000</p>
                      <p>Total Hours = 40 × 52 = 2,080 hrs</p>
                      <p>Hourly = $60,000 ÷ 2,080</p>
                      <p className="text-[#2BAE66] font-bold">= $28.85/hour</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Example 3: Part-Time Worker (35 hrs/week)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
                    <ul className="text-gray-600 space-y-1">
                      <li>Annual Salary: ₹4,20,000</li>
                      <li>Hours per Week: 35</li>
                      <li>Weeks per Year: 48 (4 weeks unpaid leave)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Solution:</strong></p>
                    <div className="bg-white p-3 rounded font-mono text-sm">
                      <p>Total Hours = 35 × 48 = 1,680 hrs</p>
                      <p>Hourly Rate = ₹4,20,000 ÷ 1,680</p>
                      <p className="text-[#2BAE66] font-bold">= ₹250.00/hour</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Salary Conversion Reference Table */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Salary Conversion Quick Reference (₹ INR)</h2>
            <p className="text-gray-600 mb-4">Based on 40 hours/week, 52 weeks/year (2,080 hours annually)</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
                    <th className="border border-gray-300 px-3 py-2">Hourly</th>
                    <th className="border border-gray-300 px-3 py-2">Daily (8hr)</th>
                    <th className="border border-gray-300 px-3 py-2">Weekly</th>
                    <th className="border border-gray-300 px-3 py-2">Monthly</th>
                    <th className="border border-gray-300 px-3 py-2">Annual</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { hourly: 100, daily: 800, weekly: 4000, monthly: 17333, annual: 208000 },
                    { hourly: 200, daily: 1600, weekly: 8000, monthly: 34667, annual: 416000 },
                    { hourly: 300, daily: 2400, weekly: 12000, monthly: 52000, annual: 624000 },
                    { hourly: 400, daily: 3200, weekly: 16000, monthly: 69333, annual: 832000 },
                    { hourly: 500, daily: 4000, weekly: 20000, monthly: 86667, annual: 1040000 },
                    { hourly: 750, daily: 6000, weekly: 30000, monthly: 130000, annual: 1560000 },
                    { hourly: 1000, daily: 8000, weekly: 40000, monthly: 173333, annual: 2080000 },
                    { hourly: 1500, daily: 12000, weekly: 60000, monthly: 260000, annual: 3120000 },
                    { hourly: 2000, daily: 16000, weekly: 80000, monthly: 346667, annual: 4160000 },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="border border-gray-300 px-3 py-2 font-medium">₹{row.hourly}</td>
                      <td className="border border-gray-300 px-3 py-2">₹{row.daily.toLocaleString()}</td>
                      <td className="border border-gray-300 px-3 py-2">₹{row.weekly.toLocaleString()}</td>
                      <td className="border border-gray-300 px-3 py-2">₹{row.monthly.toLocaleString()}</td>
                      <td className="border border-gray-300 px-3 py-2 font-medium">₹{row.annual.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hourly vs Salary: Pros and Cons */}
          <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white p-8 md:p-12 rounded-xl mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
              <Users className="w-8 h-8 mr-3" />
              Hourly vs Salary: Pros and Cons
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-2" />
                  Hourly Employment
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-green-300">Pros:</p>
                    <ul className="text-blue-100 space-y-1 ml-4">
                      <li>• Overtime pay for extra hours</li>
                      <li>• Clear work-life boundaries</li>
                      <li>• Flexibility in scheduling</li>
                      <li>• Paid for every hour worked</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-red-300">Cons:</p>
                    <ul className="text-blue-100 space-y-1 ml-4">
                      <li>• Income varies with hours</li>
                      <li>• May lack benefits</li>
                      <li>• Less job security</li>
                      <li>• No pay for time off</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Briefcase className="w-6 h-6 mr-2" />
                  Salaried Employment
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-green-300">Pros:</p>
                    <ul className="text-blue-100 space-y-1 ml-4">
                      <li>• Consistent, predictable income</li>
                      <li>• Usually includes benefits</li>
                      <li>• Paid vacation and holidays</li>
                      <li>• Career growth opportunities</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-red-300">Cons:</p>
                    <ul className="text-blue-100 space-y-1 ml-4">
                      <li>• Often no overtime pay</li>
                      <li>• May work extra hours unpaid</li>
                      <li>• Less schedule flexibility</li>
                      <li>• True hourly rate may be lower</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-[#1A3D7C] mb-8">
              Why Use a Salary to Hourly Calculator?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Compare Job Offers',
                  description: 'Convert different salary structures to hourly rates for accurate job offer comparisons.',
                  icon: Target,
                },
                {
                  title: 'Budget Planning',
                  description: 'Understand your earning rate to plan expenses and savings effectively.',
                  icon: PiggyBank,
                },
                {
                  title: 'Freelance Pricing',
                  description: 'Set competitive freelance rates based on your desired annual income.',
                  icon: Briefcase,
                },
                {
                  title: 'Overtime Assessment',
                  description: 'Calculate if overtime work is worth the additional compensation.',
                  icon: Clock,
                },
                {
                  title: 'Negotiate Salary',
                  description: 'Use precise figures to negotiate raises or starting salaries confidently.',
                  icon: TrendingUp,
                },
                {
                  title: 'Track True Earnings',
                  description: 'Know your real hourly rate after accounting for all hours worked.',
                  icon: Award,
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200 hover:border-[#2BAE66] transition-all hover:shadow-lg"
                >
                  <div className="flex items-start">
                    <benefit.icon className="w-6 h-6 text-[#2BAE66] mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">{benefit.title}</h3>
                      <p className="text-gray-700">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes to Avoid */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Common Mistakes to Avoid</h2>
            <div className="space-y-4">
              {[
                {
                  mistake: 'Using 50 weeks instead of 52',
                  correct: 'Use 52 weeks if you have paid vacation. Only reduce weeks for unpaid time off.',
                },
                {
                  mistake: 'Forgetting overtime hours',
                  correct: 'If you regularly work more than 40 hours, include those hours for accurate hourly rate.',
                },
                {
                  mistake: 'Ignoring benefits value',
                  correct: 'Remember that salaried positions often include benefits worth 20-30% of base salary.',
                },
                {
                  mistake: 'Not accounting for taxes',
                  correct: 'This calculator shows gross pay. Net (take-home) pay will be lower after taxes.',
                },
                {
                  mistake: 'Assuming all months are equal',
                  correct: 'Monthly hours vary (28-31 days). Annual calculation is most accurate.',
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <div className="flex-1">
                    <p className="font-semibold text-red-700 mb-1">
                      ✗ {item.mistake}
                    </p>
                    <p className="text-gray-700">
                      ✓ <strong>Correct:</strong> {item.correct}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-[#1A3D7C] mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {[
                {
                  question: 'How do I convert my annual salary to hourly rate?',
                  answer: 'Divide your annual salary by the total number of working hours in a year. For a standard 40-hour workweek over 52 weeks, that\'s 2,080 hours. Formula: Hourly Rate = Annual Salary ÷ 2,080. For example, ₹6,00,000 ÷ 2,080 = ₹288.46/hour.',
                },
                {
                  question: 'How do I convert monthly salary to hourly?',
                  answer: 'First, calculate your annual salary (monthly × 12), then divide by total annual hours. Or use: Hourly = Monthly Salary ÷ (Hours/Week × 52 ÷ 12). For 40 hours/week, the average monthly hours is 173.33.',
                },
                {
                  question: 'What if I work more or less than 40 hours per week?',
                  answer: 'Adjust the "Hours per Week" field to match your actual working hours. For part-time (e.g., 20 hours), your hourly rate will be higher for the same annual salary because you\'re earning the same amount in fewer hours.',
                },
                {
                  question: 'Should I include overtime in my calculations?',
                  answer: 'Yes, for accurate calculations. If you regularly work 45-50 hours per week, use that number instead of 40. This gives you your true hourly rate. Many salaried employees discover their effective hourly rate is lower than expected when accounting for overtime.',
                },
                {
                  question: 'How do I account for unpaid leave?',
                  answer: 'Reduce the "Weeks per Year" field. For 2 weeks unpaid vacation, use 50 weeks. For 4 weeks, use 48 weeks. This gives you a more accurate hourly rate based on actual paid working time.',
                },
                {
                  question: 'Is this calculator accurate for India?',
                  answer: 'Yes! The calculator works for any country. The standard assumption is 40 hours/week and 52 weeks/year. In India, many companies use 48 hours/week (6 days × 8 hours), so adjust accordingly.',
                },
                {
                  question: 'How do I compare a salaried job with an hourly job?',
                  answer: 'Convert both to the same basis (hourly is easiest). Remember to factor in: (1) Benefits value for salaried jobs, (2) Overtime pay for hourly jobs, (3) Actual hours you\'ll work. A salaried job at ₹6L/year might seem better than ₹250/hour, but if the salaried job requires 50 hours/week, the hourly job might actually pay more.',
                },
                {
                  question: 'Why is knowing my hourly rate important?',
                  answer: 'It helps you: (1) Negotiate better salaries, (2) Compare job offers fairly, (3) Decide if overtime is worth it, (4) Price freelance work correctly, (5) Calculate if taking a pay cut for better hours is worthwhile, (6) Budget and plan finances accurately.',
                },
                {
                  question: 'What\'s the difference between gross and net hourly rate?',
                  answer: 'Gross hourly rate is before taxes and deductions. Net (take-home) hourly rate is after all deductions. This calculator shows gross rate. To estimate net, subtract approximately 20-30% depending on your tax bracket and deductions.',
                },
                {
                  question: 'How accurate is dividing annual salary by 2,080?',
                  answer: 'The 2,080 figure (40 hrs × 52 weeks) is the standard for full-time employees with paid vacation. If you have unpaid time off, work different hours, or want exact calculations, customize the hours and weeks fields for precision.',
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border-l-4 border-[#2BAE66] shadow-md">
                  <div className="flex items-start">
                    <HelpCircle className="w-6 h-6 text-[#1A3D7C] mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">{faq.question}</h3>
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border-2 border-purple-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Tips for Using This Calculator</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Track Your Actual Hours',
                  tip: 'For most accurate results, track how many hours you actually work, not just your contracted hours.',
                },
                {
                  title: 'Include All Compensation',
                  tip: 'Don\'t forget bonuses, commissions, and benefits when comparing total compensation.',
                },
                {
                  title: 'Consider Cost of Living',
                  tip: 'A higher hourly rate in a high-cost city might be equivalent to a lower rate elsewhere.',
                },
                {
                  title: 'Use for Freelancing',
                  tip: 'Calculate your target annual income and convert to hourly rate, then add 20-30% for taxes and benefits.',
                },
                {
                  title: 'Review Periodically',
                  tip: 'Recalculate your hourly rate after raises or when your working hours change.',
                },
                {
                  title: 'Bookmark for Negotiations',
                  tip: 'Use this calculator during salary negotiations to quickly convert offers to hourly equivalents.',
                },
              ].map((tip, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <Lightbulb className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">{tip.title}</h3>
                      <p className="text-gray-700">{tip.tip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Calculators */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 text-center">Explore More Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/calculators/salary-calculator" className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200 hover:border-[#2BAE66] transition-all hover:shadow-lg">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">Salary Calculator</h3>
                <p className="text-gray-700 text-sm">Calculate in-hand salary from CTC with tax deductions and allowances.</p>
              </Link>
              <Link href="/calculators/income-tax-calculator" className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200 hover:border-[#2BAE66] transition-all hover:shadow-lg">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">Income Tax Calculator</h3>
                <p className="text-gray-700 text-sm">Calculate income tax under old and new tax regimes with deductions.</p>
              </Link>
              <Link href="/calculators/work-hours-calculator" className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200 hover:border-[#2BAE66] transition-all hover:shadow-lg">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">Work Hours Calculator</h3>
                <p className="text-gray-700 text-sm">Calculate total work hours with break time, overtime, and weekly hours.</p>
              </Link>
            </div>
          </div>

          {/* Book Your Session CTA */}
          <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16 rounded-2xl">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center text-white">
                <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  Need Help with Financial Calculations?
                </h2>
                <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                  Our expert tutors can help you master financial mathematics, understand salary structures, and excel in business calculations. Get personalized one-on-one guidance tailored to your learning style.
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
        </div>
      </div>

      <Footer />
    </div>
  );
}
