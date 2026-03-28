'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Calendar, Plus, Minus, Copy, Check } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function DateCalculatorPage() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const calculateDate = () => {
    const date = new Date(startDate);

    if (operation === 'add') {
      date.setFullYear(date.getFullYear() + years);
      date.setMonth(date.getMonth() + months);
      date.setDate(date.getDate() + days);
    } else {
      date.setFullYear(date.getFullYear() - years);
      date.setMonth(date.getMonth() - months);
      date.setDate(date.getDate() - days);
    }

    const resultString = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    setResult(resultString);
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickCalculate = (type: string) => {
    const date = new Date(startDate);
    switch (type) {
      case '+1day':
        date.setDate(date.getDate() + 1);
        break;
      case '-1day':
        date.setDate(date.getDate() - 1);
        break;
      case '+1week':
        date.setDate(date.getDate() + 7);
        break;
      case '-1week':
        date.setDate(date.getDate() - 7);
        break;
      case '+1month':
        date.setMonth(date.getMonth() + 1);
        break;
      case '-1month':
        date.setMonth(date.getMonth() - 1);
        break;
      case '+1year':
        date.setFullYear(date.getFullYear() + 1);
        break;
      case '-1year':
        date.setFullYear(date.getFullYear() - 1);
        break;
    }
    const resultString = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setResult(resultString);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/tools" className="text-[#1A3D7C] hover:text-[#2BAE66]">
              Tools
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Date Calculator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Date Calculator
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Add or subtract days, weeks, months, and years from any date - Free date calculator
            </p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Calculate</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => quickCalculate('+1day')}
                className="px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md"
              >
                +1 Day
              </button>
              <button
                onClick={() => quickCalculate('-1day')}
                className="px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-md"
              >
                -1 Day
              </button>
              <button
                onClick={() => quickCalculate('+1week')}
                className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
              >
                +1 Week
              </button>
              <button
                onClick={() => quickCalculate('-1week')}
                className="px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md"
              >
                -1 Week
              </button>
              <button
                onClick={() => quickCalculate('+1month')}
                className="px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-md"
              >
                +1 Month
              </button>
              <button
                onClick={() => quickCalculate('-1month')}
                className="px-4 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 transition-all shadow-md"
              >
                -1 Month
              </button>
              <button
                onClick={() => quickCalculate('+1year')}
                className="px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all shadow-md"
              >
                +1 Year
              </button>
              <button
                onClick={() => quickCalculate('-1year')}
                className="px-4 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-md"
              >
                -1 Year
              </button>
            </div>
          </div>

          {/* Custom Calculation */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Custom Date Calculation</h2>

            {/* Start Date */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                <Calendar className="w-5 h-5 inline-block mr-2 text-[#1A3D7C]" />
                Starting Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-lg"
              />
            </div>

            {/* Operation Selection */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">Operation</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setOperation('add')}
                  className={`flex-1 px-6 py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    operation === 'add'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Plus className="w-5 h-5" />
                  Add Time
                </button>
                <button
                  onClick={() => setOperation('subtract')}
                  className={`flex-1 px-6 py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    operation === 'subtract'
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Minus className="w-5 h-5" />
                  Subtract Time
                </button>
              </div>
            </div>

            {/* Time Inputs */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Years</label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Months</label>
                <input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Days</label>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                />
              </div>
            </div>

            <button
              onClick={calculateDate}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg"
            >
              Calculate Date
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-2xl shadow-2xl p-8 mb-6 text-white">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold">Result</h2>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-white text-[#1A3D7C] rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-4">{result}</div>
                <div className="text-xl opacity-90">
                  {years > 0 && `${years} year${years > 1 ? 's' : ''} `}
                  {months > 0 && `${months} month${months > 1 ? 's' : ''} `}
                  {days > 0 && `${days} day${days > 1 ? 's' : ''} `}
                  {operation === 'add' ? 'after' : 'before'} {new Date(startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>
          )}

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Uses</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Calculate project deadlines</li>
                <li>• Find contract expiration dates</li>
                <li>• Determine payment due dates</li>
                <li>• Calculate age on future date</li>
                <li>• Plan events and milestones</li>
                <li>• Track pregnancy due dates</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                The date calculator adds or subtracts the specified time period from your starting date. It automatically handles leap years, varying month lengths, and other calendar complexities.
              </p>
              <p className="text-gray-600 text-sm">
                Results are displayed in full date format with day of week for easy reference.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
