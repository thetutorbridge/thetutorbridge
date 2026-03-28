'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Calendar, Cake, Copy, Check } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
    nextBirthday: string;
    daysUntilBirthday: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculateAge = () => {
    if (!birthDate) {
      alert('Please select your birth date');
      return;
    }

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (birth > target) {
      alert('Birth date cannot be in the future!');
      return;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total values
    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    // Calculate next birthday
    const nextBirthYear = target.getFullYear() + (target.getMonth() > birth.getMonth() ||
      (target.getMonth() === birth.getMonth() && target.getDate() >= birth.getDate()) ? 1 : 0);
    const nextBirth = new Date(nextBirthYear, birth.getMonth(), birth.getDate());
    const daysUntilBirthday = Math.floor((nextBirth.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    const nextBirthdayString = nextBirth.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    setAge({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      nextBirthday: nextBirthdayString,
      daysUntilBirthday,
    });
  };

  const copyToClipboard = () => {
    if (!age) return;
    const text = `Age: ${age.years} years, ${age.months} months, ${age.days} days\nTotal: ${age.totalDays.toLocaleString()} days\nNext Birthday: ${age.nextBirthday}`;
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
            <span className="text-gray-600">Age Calculator</span>
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
                Age Calculator
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Calculate your exact age in years, months, days, and more - Free online age calculator
            </p>
          </div>

          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  <Cake className="w-5 h-5 inline-block mr-2 text-[#2BAE66]" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-lg"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  <Calendar className="w-5 h-5 inline-block mr-2 text-[#1A3D7C]" />
                  Calculate Age On
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-lg"
                />
              </div>
            </div>

            <button
              onClick={calculateAge}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg"
            >
              Calculate Age
            </button>
          </div>

          {/* Results */}
          {age && (
            <>
              <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-2xl shadow-2xl p-8 mb-6 text-white">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold">Your Age</h2>
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-white text-[#1A3D7C] rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div className="text-6xl font-bold mb-2">{age.years}</div>
                    <div className="text-xl font-semibold opacity-90">Years</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div className="text-6xl font-bold mb-2">{age.months}</div>
                    <div className="text-xl font-semibold opacity-90">Months</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div className="text-6xl font-bold mb-2">{age.days}</div>
                    <div className="text-xl font-semibold opacity-90">Days</div>
                  </div>
                </div>

                <div className="text-center text-2xl font-semibold">
                  {age.years} years, {age.months} months, and {age.days} days old
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Breakdown</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border-2 border-blue-200">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Total Days</div>
                    <div className="text-4xl font-bold text-blue-600">
                      {age.totalDays.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">days since birth</div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-6 border-2 border-green-200">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Total Weeks</div>
                    <div className="text-4xl font-bold text-green-600">
                      {age.totalWeeks.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">weeks since birth</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Total Months</div>
                    <div className="text-4xl font-bold text-purple-600">
                      {age.totalMonths.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">months since birth</div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border-2 border-orange-200">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Total Hours</div>
                    <div className="text-4xl font-bold text-orange-600">
                      {(age.totalDays * 24).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">hours since birth</div>
                  </div>
                </div>
              </div>

              {/* Next Birthday */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200 mb-6">
                <div className="flex items-start gap-4">
                  <Cake className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Next Birthday</h3>
                    <p className="text-lg text-gray-700 mb-1">
                      <strong>{age.nextBirthday}</strong>
                    </p>
                    <p className="text-gray-600">
                      {age.daysUntilBirthday === 0 ? (
                        <span className="text-green-600 font-bold">🎉 Happy Birthday! 🎉</span>
                      ) : (
                        <span>
                          Your next birthday is in <strong>{age.daysUntilBirthday}</strong> days
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How Age is Calculated</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Age is calculated by finding the difference between your birth date and the target date. The calculator accounts for leap years and varying month lengths to give you the exact age.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Years: Complete years lived</li>
                <li>• Months: Additional months after years</li>
                <li>• Days: Additional days after months</li>
                <li>• Total values show cumulative time</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Uses</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Calculate exact age for documents</li>
                <li>• Find age on a specific date</li>
                <li>• Calculate retirement eligibility</li>
                <li>• Determine age milestones</li>
                <li>• Calculate days until birthday</li>
                <li>• Baby age tracking in days/weeks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
