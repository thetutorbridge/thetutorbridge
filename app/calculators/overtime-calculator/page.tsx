'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, RotateCcw, Clock, Info, BookOpen, GraduationCap, DollarSign, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

type PayRateUnit = 'hour' | 'day' | 'week' | 'month' | 'year';
type TimeUnit = 'hours' | 'minutes';
type PeriodUnit = 'day' | 'week' | 'month' | 'year';

interface Results {
  regularPay: number;
  overtimePay: number;
  totalPay: number;
  overtimeRate: number;
  effectiveHourlyRate: number;
  breakdown: string[];
}

export default function OvertimeCalculator() {
  // Regular work time
  const [regularPayRate, setRegularPayRate] = useState<string>('');
  const [regularPayUnit, setRegularPayUnit] = useState<PayRateUnit>('hour');
  const [regularWorkTime, setRegularWorkTime] = useState<string>('40');
  const [regularTimeUnit, setRegularTimeUnit] = useState<TimeUnit>('hours');
  const [regularPeriod, setRegularPeriod] = useState<PeriodUnit>('week');
  const [totalRegularPayPeriod, setTotalRegularPayPeriod] = useState<PeriodUnit>('month');

  // Overtime
  const [overtimeMultiplier, setOvertimeMultiplier] = useState<string>('1.5');
  const [overtimeHours, setOvertimeHours] = useState<string>('');
  const [overtimeTimeUnit, setOvertimeTimeUnit] = useState<TimeUnit>('hours');
  const [overtimePeriod, setOvertimePeriod] = useState<PeriodUnit>('month');
  const [totalOvertimePayPeriod, setTotalOvertimePayPeriod] = useState<PeriodUnit>('month');

  // Total
  const [totalPayPeriod, setTotalPayPeriod] = useState<PeriodUnit>('month');

  // Sections visibility
  const [showRegularSection, setShowRegularSection] = useState<boolean>(true);
  const [showOvertimeSection, setShowOvertimeSection] = useState<boolean>(true);

  const [results, setResults] = useState<Results | null>(null);
  const [currency, setCurrency] = useState<string>('Rs');

  // Convert pay rate to hourly
  const convertToHourly = (rate: number, unit: PayRateUnit): number => {
    switch (unit) {
      case 'hour': return rate;
      case 'day': return rate / 8; // Assuming 8-hour workday
      case 'week': return rate / 40; // Assuming 40-hour week
      case 'month': return rate / 160; // Assuming 160 hours/month
      case 'year': return rate / 2080; // Assuming 2080 hours/year
      default: return rate;
    }
  };

  // Convert time to hours
  const convertToHours = (time: number, unit: TimeUnit): number => {
    return unit === 'minutes' ? time / 60 : time;
  };

  // Convert hours to period
  const hoursPerPeriod = (period: PeriodUnit): number => {
    switch (period) {
      case 'day': return 8;
      case 'week': return 40;
      case 'month': return 160; // ~4 weeks
      case 'year': return 2080; // 52 weeks × 40 hours
      default: return 40;
    }
  };

  // Get period multiplier (for converting between periods)
  const getPeriodMultiplier = (from: PeriodUnit, to: PeriodUnit): number => {
    const periods: Record<PeriodUnit, number> = {
      day: 1,
      week: 5,
      month: 20, // ~4 weeks of work days
      year: 260, // ~52 weeks of work days
    };
    return periods[to] / periods[from];
  };

  // Calculate results
  useEffect(() => {
    const rate = parseFloat(regularPayRate);
    const regTime = parseFloat(regularWorkTime) || 0;
    const otHours = parseFloat(overtimeHours) || 0;
    const otMultiplier = parseFloat(overtimeMultiplier) || 1.5;

    if (isNaN(rate) || rate <= 0) {
      setResults(null);
      return;
    }

    // Calculate hourly rate
    const hourlyRate = convertToHourly(rate, regularPayUnit);

    // Calculate regular hours per period (for output)
    const regularHoursInHours = convertToHours(regTime, regularTimeUnit);
    const regularHoursPerOutputPeriod = regularHoursInHours * getPeriodMultiplier(regularPeriod, totalRegularPayPeriod);

    // Calculate overtime hours per period
    const overtimeHoursInHours = convertToHours(otHours, overtimeTimeUnit);
    const overtimeHoursPerOutputPeriod = overtimeHoursInHours * getPeriodMultiplier(overtimePeriod, totalOvertimePayPeriod);

    // Calculate pay
    const regularPay = hourlyRate * regularHoursPerOutputPeriod;
    const overtimeRate = hourlyRate * otMultiplier;
    const overtimePay = overtimeRate * overtimeHoursPerOutputPeriod;

    // For total pay, we need to calculate based on total pay period
    const regularHoursForTotal = regularHoursInHours * getPeriodMultiplier(regularPeriod, totalPayPeriod);
    const overtimeHoursForTotal = overtimeHoursInHours * getPeriodMultiplier(overtimePeriod, totalPayPeriod);
    const regularPayForTotal = hourlyRate * regularHoursForTotal;
    const overtimePayForTotal = overtimeRate * overtimeHoursForTotal;
    const totalPay = regularPayForTotal + overtimePayForTotal;

    // Calculate effective hourly rate
    const totalHoursForTotal = regularHoursForTotal + overtimeHoursForTotal;
    const effectiveHourlyRate = totalHoursForTotal > 0 ? totalPay / totalHoursForTotal : hourlyRate;

    const breakdown: string[] = [];
    breakdown.push(`Regular hourly rate: ${currency}${hourlyRate.toFixed(2)}/hour`);
    breakdown.push(`Regular hours per ${totalRegularPayPeriod}: ${regularHoursPerOutputPeriod.toFixed(1)} hours`);
    breakdown.push(`Regular pay: ${currency}${hourlyRate.toFixed(2)} × ${regularHoursPerOutputPeriod.toFixed(1)} = ${currency}${regularPay.toFixed(2)}`);
    if (otHours && parseFloat(otHours) > 0) {
      breakdown.push(`Overtime rate (${otMultiplier}x): ${currency}${overtimeRate.toFixed(2)}/hour`);
      breakdown.push(`Overtime hours per ${totalOvertimePayPeriod}: ${overtimeHoursPerOutputPeriod.toFixed(1)} hours`);
      breakdown.push(`Overtime pay: ${currency}${overtimeRate.toFixed(2)} × ${overtimeHoursPerOutputPeriod.toFixed(1)} = ${currency}${overtimePay.toFixed(2)}`);
    }

    setResults({
      regularPay,
      overtimePay,
      totalPay,
      overtimeRate,
      effectiveHourlyRate,
      breakdown,
    });
  }, [
    regularPayRate, regularPayUnit, regularWorkTime, regularTimeUnit, regularPeriod, totalRegularPayPeriod,
    overtimeMultiplier, overtimeHours, overtimeTimeUnit, overtimePeriod, totalOvertimePayPeriod,
    totalPayPeriod, currency
  ]);

  const handleReset = () => {
    setRegularPayRate('');
    setRegularPayUnit('hour');
    setRegularWorkTime('40');
    setRegularTimeUnit('hours');
    setRegularPeriod('week');
    setTotalRegularPayPeriod('month');
    setOvertimeMultiplier('1.5');
    setOvertimeHours('');
    setOvertimeTimeUnit('hours');
    setOvertimePeriod('month');
    setTotalOvertimePayPeriod('month');
    setTotalPayPeriod('month');
    setResults(null);
  };

  const formatCurrency = (num: number): string => {
    return num.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  };

  // Common overtime multipliers
  const multiplierPresets = [
    { value: '1.25', label: '1.25x' },
    { value: '1.5', label: '1.5x (Time and a half)' },
    { value: '1.75', label: '1.75x' },
    { value: '2', label: '2x (Double time)' },
    { value: '2.5', label: '2.5x' },
    { value: '3', label: '3x (Triple time)' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm py-3 px-4 sm:px-6 shadow-sm">
        <div className="container mx-auto max-w-4xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/calculators" className="text-blue-600 hover:text-blue-800">
              Calculators
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Overtime Calculator</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
              <Clock className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Overtime Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate your total pay including regular hours and overtime. Supports time and a half (1.5x), double time (2x), and custom overtime multipliers.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
          {/* Currency Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 font-medium"
            >
              <option value="Rs">Rs (INR)</option>
              <option value="$">$ (USD)</option>
              <option value="€">€ (EUR)</option>
              <option value="£">£ (GBP)</option>
              <option value="¥">¥ (JPY)</option>
            </select>
          </div>

          {/* Regular Work Time Section */}
          <div className="mb-6">
            <button
              onClick={() => setShowRegularSection(!showRegularSection)}
              className="flex items-center justify-between w-full p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors border border-blue-200"
            >
              <span className="text-blue-800 font-semibold flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Regular work time
              </span>
              {showRegularSection ? (
                <ChevronUp className="w-5 h-5 text-blue-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-blue-600" />
              )}
            </button>

            {showRegularSection && (
              <div className="mt-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-4">
                {/* Regular Pay */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    Regular pay
                    <span className="ml-2 text-gray-400 cursor-help" title="Your standard hourly, daily, weekly, or monthly pay rate">
                      <Info className="w-4 h-4" />
                    </span>
                  </label>
                  <div className="flex gap-2">
                    <span className="px-3 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium">{currency}</span>
                    <input
                      type="number"
                      value={regularPayRate}
                      onChange={(e) => setRegularPayRate(e.target.value)}
                      placeholder="Enter pay rate"
                      min="0"
                      step="0.01"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    />
                    <span className="px-3 py-3 bg-gray-100 rounded-xl text-gray-500">/</span>
                    <select
                      value={regularPayUnit}
                      onChange={(e) => setRegularPayUnit(e.target.value as PayRateUnit)}
                      className="px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                    >
                      <option value="hour">hour</option>
                      <option value="day">day</option>
                      <option value="week">week</option>
                      <option value="month">month</option>
                      <option value="year">year</option>
                    </select>
                  </div>
                </div>

                {/* Regular Work Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Regular work time</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={regularWorkTime}
                      onChange={(e) => setRegularWorkTime(e.target.value)}
                      placeholder="40"
                      min="0"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    />
                    <select
                      value={regularTimeUnit}
                      onChange={(e) => setRegularTimeUnit(e.target.value as TimeUnit)}
                      className="px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                    >
                      <option value="hours">hours</option>
                      <option value="minutes">minutes</option>
                    </select>
                    <span className="px-3 py-3 bg-gray-100 rounded-xl text-gray-500">/</span>
                    <select
                      value={regularPeriod}
                      onChange={(e) => setRegularPeriod(e.target.value as PeriodUnit)}
                      className="px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                    >
                      <option value="day">day</option>
                      <option value="week">week</option>
                      <option value="month">month</option>
                    </select>
                  </div>
                </div>

                {/* Total Regular Pay */}
                {results && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Total regular pay</label>
                    <div className="flex gap-2">
                      <div className="flex-1 px-4 py-3 bg-blue-100 border-2 border-blue-200 rounded-xl">
                        <span className="text-xl font-bold text-blue-800">
                          {currency}{formatCurrency(results.regularPay)}
                        </span>
                      </div>
                      <span className="px-3 py-3 bg-gray-100 rounded-xl text-gray-500">/</span>
                      <select
                        value={totalRegularPayPeriod}
                        onChange={(e) => setTotalRegularPayPeriod(e.target.value as PeriodUnit)}
                        className="px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                      >
                        <option value="day">day</option>
                        <option value="week">week</option>
                        <option value="month">month</option>
                        <option value="year">year</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Overtime Section */}
          <div className="mb-6">
            <button
              onClick={() => setShowOvertimeSection(!showOvertimeSection)}
              className="flex items-center justify-between w-full p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors border border-orange-200"
            >
              <span className="text-orange-800 font-semibold flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Overtime
              </span>
              {showOvertimeSection ? (
                <ChevronUp className="w-5 h-5 text-orange-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-orange-600" />
              )}
            </button>

            {showOvertimeSection && (
              <div className="mt-4 p-4 bg-orange-50/50 rounded-xl border border-orange-100 space-y-4">
                {/* Overtime Pay Multiplier */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    Overtime pay multiplier
                    <span className="ml-2 text-gray-400 cursor-help" title="How much more you get paid for overtime hours (e.g., 1.5x = time and a half)">
                      <Info className="w-4 h-4" />
                    </span>
                  </label>
                  <input
                    type="number"
                    value={overtimeMultiplier}
                    onChange={(e) => setOvertimeMultiplier(e.target.value)}
                    placeholder="1.5"
                    min="1"
                    step="0.1"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {multiplierPresets.map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => setOvertimeMultiplier(preset.value)}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          overtimeMultiplier === preset.value
                            ? 'bg-orange-600 text-white'
                            : 'bg-orange-100 hover:bg-orange-200 text-orange-700'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Overtime Pay Rate (calculated) */}
                {results && parseFloat(regularPayRate) > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Overtime pay</label>
                    <div className="flex gap-2">
                      <div className="flex-1 px-4 py-3 bg-orange-100 border-2 border-orange-200 rounded-xl">
                        <span className="text-xl font-bold text-orange-800">
                          {currency}{formatCurrency(results.overtimeRate)}
                        </span>
                      </div>
                      <span className="px-3 py-3 bg-gray-100 rounded-xl text-gray-500">/</span>
                      <span className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600">hour</span>
                    </div>
                  </div>
                )}

                {/* Overtime Hours */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Overtime hours</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={overtimeHours}
                      onChange={(e) => setOvertimeHours(e.target.value)}
                      placeholder="Enter overtime hours"
                      min="0"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
                    />
                    <select
                      value={overtimeTimeUnit}
                      onChange={(e) => setOvertimeTimeUnit(e.target.value as TimeUnit)}
                      className="px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-700"
                    >
                      <option value="hours">hours</option>
                      <option value="minutes">minutes</option>
                    </select>
                    <span className="px-3 py-3 bg-gray-100 rounded-xl text-gray-500">/</span>
                    <select
                      value={overtimePeriod}
                      onChange={(e) => setOvertimePeriod(e.target.value as PeriodUnit)}
                      className="px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-700"
                    >
                      <option value="day">day</option>
                      <option value="week">week</option>
                      <option value="month">month</option>
                    </select>
                  </div>
                </div>

                {/* Total Overtime Pay */}
                {results && parseFloat(overtimeHours) > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Total overtime pay</label>
                    <div className="flex gap-2">
                      <div className="flex-1 px-4 py-3 bg-orange-100 border-2 border-orange-200 rounded-xl">
                        <span className="text-xl font-bold text-orange-800">
                          {currency}{formatCurrency(results.overtimePay)}
                        </span>
                      </div>
                      <span className="px-3 py-3 bg-gray-100 rounded-xl text-gray-500">/</span>
                      <select
                        value={totalOvertimePayPeriod}
                        onChange={(e) => setTotalOvertimePayPeriod(e.target.value as PeriodUnit)}
                        className="px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-700"
                      >
                        <option value="day">day</option>
                        <option value="week">week</option>
                        <option value="month">month</option>
                        <option value="year">year</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Total Section */}
          {results && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">In total</h2>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-200">
                <label className="block text-sm font-semibold text-green-800 mb-2">Total pay</label>
                <div className="flex gap-2">
                  <div className="flex-1 px-4 py-3 bg-white border-2 border-green-200 rounded-xl">
                    <span className="text-3xl font-bold text-green-700">
                      {currency}{formatCurrency(results.totalPay)}
                    </span>
                  </div>
                  <span className="px-3 py-3 bg-green-100 rounded-xl text-green-600">/</span>
                  <select
                    value={totalPayPeriod}
                    onChange={(e) => setTotalPayPeriod(e.target.value as PeriodUnit)}
                    className="px-3 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-700"
                  >
                    <option value="day">day</option>
                    <option value="week">week</option>
                    <option value="month">month</option>
                    <option value="year">year</option>
                  </select>
                </div>
                <p className="text-sm text-green-700 mt-2">
                  Effective hourly rate: {currency}{formatCurrency(results.effectiveHourlyRate)}/hour
                </p>
              </div>
            </div>
          )}

          {/* Breakdown */}
          {results && (
            <div className="mb-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-2 text-sm">Calculation Breakdown</h3>
              <div className="space-y-1">
                {results.breakdown.map((line, index) => (
                  <p key={index} className="text-sm text-gray-600">{line}</p>
                ))}
              </div>
            </div>
          )}

          {/* Reset Button */}
          <div className="flex justify-center">
            <button
              onClick={handleReset}
              className="flex items-center px-6 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear all changes
            </button>
          </div>
        </div>

        {/* Formula Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-blue-600" />
            Overtime Pay Formulas
          </h2>

          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Overtime Rate</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-sm mb-2">
                Overtime Rate = Regular Hourly Rate × Overtime Multiplier
              </div>
              <p className="text-sm text-blue-700">
                Example: {currency}100/hour × 1.5 = {currency}150/hour overtime rate
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Total Overtime Pay</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-sm mb-2">
                Overtime Pay = Overtime Rate × Overtime Hours
              </div>
              <p className="text-sm text-green-700">
                Example: {currency}150/hour × 10 hours = {currency}1,500 overtime pay
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">Total Pay</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-sm mb-2">
                Total Pay = Regular Pay + Overtime Pay
              </div>
              <p className="text-sm text-purple-700">
                Example: {currency}16,000 (regular) + {currency}1,500 (OT) = {currency}17,500 total
              </p>
            </div>
          </div>
        </div>

        {/* Understanding Overtime */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-600" />
            Understanding Overtime Pay
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is Overtime?</h3>
              <p className="text-gray-600 leading-relaxed">
                Overtime refers to hours worked beyond the standard work schedule, typically more than
                40 hours per week or 8 hours per day. Employers are often required to pay employees
                at a higher rate for these extra hours as compensation for working beyond normal hours.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Common Overtime Multipliers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                  <p className="font-semibold text-orange-800">Time and a Half (1.5x)</p>
                  <p className="text-sm text-orange-700">
                    Most common. Employee receives 150% of regular hourly rate.
                    Example: {currency}100/hr → {currency}150/hr OT
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                  <p className="font-semibold text-red-800">Double Time (2x)</p>
                  <p className="text-sm text-red-700">
                    For holidays or extended overtime. 200% of regular rate.
                    Example: {currency}100/hr → {currency}200/hr OT
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Standard Work Hours</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-gray-50 p-3 rounded-xl text-center">
                  <p className="text-2xl font-bold text-gray-800">8</p>
                  <p className="text-xs text-gray-600">hours/day</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl text-center">
                  <p className="text-2xl font-bold text-gray-800">40</p>
                  <p className="text-xs text-gray-600">hours/week</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl text-center">
                  <p className="text-2xl font-bold text-gray-800">160</p>
                  <p className="text-xs text-gray-600">hours/month</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl text-center">
                  <p className="text-2xl font-bold text-gray-800">2080</p>
                  <p className="text-xs text-gray-600">hours/year</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Exempt vs Non-Exempt Employees</h3>
              <p className="text-sm text-yellow-700">
                <strong>Non-exempt:</strong> Eligible for overtime pay under labor laws.
                <br />
                <strong>Exempt:</strong> Typically salaried managers, executives, and professionals
                who are not entitled to overtime pay. Check local labor laws for specific criteria.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do I calculate time and a half?</h3>
              <p className="text-gray-600">
                Multiply your regular hourly rate by 1.5 to get your overtime rate. Then multiply
                that by your overtime hours. Example: {currency}100/hour × 1.5 = {currency}150/hour overtime.
                Work 10 overtime hours = {currency}1,500 overtime pay.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">When does overtime start?</h3>
              <p className="text-gray-600">
                In most jurisdictions, overtime begins after 40 hours per week or 8 hours per day.
                However, this varies by country and industry. Some places have daily overtime thresholds,
                while others only consider weekly totals. Check your local labor laws.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Is overtime mandatory?</h3>
              <p className="text-gray-600">
                For non-exempt employees, employers must pay overtime for hours worked beyond the
                threshold—it&apos;s legally required. However, whether employees are required to work
                overtime depends on employment contracts and company policy.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How is monthly overtime calculated?</h3>
              <p className="text-gray-600">
                Monthly overtime = (Overtime hours × Overtime multiplier × Regular hourly rate).
                For salaried employees, first calculate hourly rate: Monthly salary ÷ 160 hours (standard).
                Then apply the overtime multiplier.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is double time?</h3>
              <p className="text-gray-600">
                Double time means being paid twice your regular hourly rate (2x multiplier).
                It&apos;s typically used for working on holidays, Sundays, or extremely long shifts.
                If you earn {currency}100/hour, double time would be {currency}200/hour.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Are salaried employees entitled to overtime?</h3>
              <p className="text-gray-600">
                It depends on their classification. Non-exempt salaried employees are entitled to
                overtime, while exempt employees (usually managers, executives, professionals above
                a certain salary threshold) are not. Classification rules vary by jurisdiction.
              </p>
            </div>
          </div>
        </div>

        {/* Related Calculators */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/calculators/annual-income-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Annual Income Calculator</h3>
              <p className="text-sm text-gray-600">Convert hourly wage to annual salary or vice versa</p>
            </Link>
            <Link
              href="/calculators/hourly-to-salary-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Hourly to Salary Calculator</h3>
              <p className="text-sm text-gray-600">Convert between hourly rate and annual salary</p>
            </Link>
            <Link
              href="/calculators/pay-raise-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Pay Raise Calculator</h3>
              <p className="text-sm text-gray-600">Calculate your new salary after a raise</p>
            </Link>
            <Link
              href="/calculators/time-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Time Calculator</h3>
              <p className="text-sm text-gray-600">Add and subtract hours, minutes, and seconds</p>
            </Link>
          </div>
        </div>

        {/* Book Your Session CTA */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2563eb] rounded-2xl shadow-xl p-6 sm:p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <GraduationCap className="w-12 h-12 text-[#FFC857] mr-4 flex-shrink-0" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Need Help with Financial Calculations?</h2>
                <p className="text-blue-100">
                  Our tutors can help you understand payroll, taxes, and financial concepts.
                </p>
              </div>
            </div>
            <Link
              href="/book-demo-class"
              className="inline-flex items-center px-6 py-3 bg-[#FFC857] text-[#1A3D7C] font-bold rounded-xl hover:bg-yellow-400 transition-colors whitespace-nowrap"
            >
              Book Your Session
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Overtime Calculator",
            "description": "Calculate overtime pay with regular hours, overtime hours, and multipliers. Supports time and a half (1.5x), double time (2x), and custom rates.",
            "url": "https://thetutorbridge.com/calculators/overtime-calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "The Tutor Bridge"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I calculate time and a half?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Multiply your regular hourly rate by 1.5 to get your overtime rate. Then multiply that by your overtime hours."
                }
              },
              {
                "@type": "Question",
                "name": "When does overtime start?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In most jurisdictions, overtime begins after 40 hours per week or 8 hours per day. This varies by country and industry."
                }
              },
              {
                "@type": "Question",
                "name": "What is double time?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Double time means being paid twice your regular hourly rate (2x multiplier). It's typically used for working on holidays, Sundays, or extremely long shifts."
                }
              },
              {
                "@type": "Question",
                "name": "Are salaried employees entitled to overtime?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It depends on their classification. Non-exempt salaried employees are entitled to overtime, while exempt employees (managers, executives, professionals) are not."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
