'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Calendar, Copy, Check, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function DaysBetweenDatesPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<{
    totalDays: number;
    years: number;
    months: number;
    days: number;
    weeks: number;
    hours: number;
    minutes: number;
    weekdays: number;
    weekends: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculateDays = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      alert('Start date must be before end date');
      return;
    }

    // Calculate difference
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const hours = totalDays * 24;
    const minutes = hours * 60;

    // Calculate years, months, days
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate weekdays and weekends
    let weekdays = 0;
    let weekends = 0;
    const currentDate = new Date(start);

    while (currentDate <= end) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekends++;
      } else {
        weekdays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setResult({
      totalDays,
      years,
      months,
      days,
      weeks,
      hours,
      minutes,
      weekdays,
      weekends,
    });
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `Days Between Dates: ${result.totalDays.toLocaleString()} days\n${result.years} years, ${result.months} months, ${result.days} days\nWeekdays: ${result.weekdays} | Weekends: ${result.weekends}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <span className="text-gray-600">Days Between Dates</span>
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
                Days Between Dates
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Calculate the exact number of days between two dates - Free date difference calculator
            </p>
          </div>

          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  <Calendar className="w-5 h-5 inline-block mr-2 text-[#1A3D7C]" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-lg"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  <Calendar className="w-5 h-5 inline-block mr-2 text-[#2BAE66]" />
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-lg"
                />
              </div>
            </div>

            <button
              onClick={calculateDays}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Calculate Days
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Results */}
          {result && (
            <>
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

                <div className="text-center mb-6">
                  <div className="text-7xl font-bold mb-4">{result.totalDays.toLocaleString()}</div>
                  <div className="text-2xl font-semibold opacity-90">Total Days</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-xl font-semibold">
                    {result.years} year{result.years !== 1 ? 's' : ''}, {result.months} month{result.months !== 1 ? 's' : ''}, and {result.days} day{result.days !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Breakdown</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border-2 border-blue-200">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Total Weeks</div>
                    <div className="text-4xl font-bold text-blue-600">
                      {result.weeks.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">weeks</div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-6 border-2 border-green-200">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Total Hours</div>
                    <div className="text-4xl font-bold text-green-600">
                      {result.hours.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">hours</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Total Minutes</div>
                    <div className="text-4xl font-bold text-purple-600">
                      {result.minutes.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">minutes</div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border-2 border-orange-200">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Total Seconds</div>
                    <div className="text-4xl font-bold text-orange-600">
                      {(result.minutes * 60).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">seconds</div>
                  </div>
                </div>
              </div>

              {/* Weekday Analysis */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekday Analysis</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-blue-600 mb-2">
                        {result.weekdays.toLocaleString()}
                      </div>
                      <div className="text-lg font-semibold text-gray-700">Weekdays</div>
                      <div className="text-sm text-gray-600 mt-1">Monday - Friday</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-6 border-2 border-orange-200">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-orange-600 mb-2">
                        {result.weekends.toLocaleString()}
                      </div>
                      <div className="text-lg font-semibold text-gray-700">Weekend Days</div>
                      <div className="text-sm text-gray-600 mt-1">Saturday & Sunday</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Uses</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Calculate relationship duration</li>
                <li>• Find project timeline length</li>
                <li>• Calculate employment duration</li>
                <li>• Determine contract length</li>
                <li>• Track pregnancy progress</li>
                <li>• Calculate days until retirement</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About This Tool</h3>
              <p className="text-gray-700 leading-relaxed">
                This date difference calculator finds the exact number of days between two dates, including weekdays and weekend days. Perfect for project planning, event countdowns, and calculating durations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
