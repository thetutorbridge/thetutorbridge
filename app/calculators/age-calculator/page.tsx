'use client';

import React, { useState } from 'react';
import { Calendar, Clock, TrendingUp, CheckCircle, HelpCircle, Lightbulb, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';

export default function AgeCalculatorPage() {
  // Date of Birth state
  const [dobMonth, setDobMonth] = useState<string>('1');
  const [dobDay, setDobDay] = useState<string>('1');
  const [dobYear, setDobYear] = useState<string>('2000');

  // Age at Date state
  const [ageMonth, setAgeMonth] = useState<string>(String(new Date().getMonth() + 1));
  const [ageDay, setAgeDay] = useState<string>(String(new Date().getDate()));
  const [ageYear, setAgeYear] = useState<string>(String(new Date().getFullYear()));

  const [showResults, setShowResults] = useState(false);

  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const generateDays = (month: string, year: string) => {
    const daysInMonth = getDaysInMonth(parseInt(month), parseInt(year));
    return Array.from({ length: daysInMonth }, (_, i) => ({
      value: String(i + 1),
      label: String(i + 1),
    }));
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 150 }, (_, i) => ({
      value: String(currentYear - i),
      label: String(currentYear - i),
    }));
  };

  const calculateAge = () => {
    const birthDate = new Date(parseInt(dobYear), parseInt(dobMonth) - 1, parseInt(dobDay));
    const targetDate = new Date(parseInt(ageYear), parseInt(ageMonth) - 1, parseInt(ageDay));

    if (targetDate < birthDate) {
      alert('Age at date cannot be before date of birth!');
      return null;
    }

    // Calculate detailed age
    let years = targetDate.getFullYear() - birthDate.getFullYear();
    let months = targetDate.getMonth() - birthDate.getMonth();
    let days = targetDate.getDate() - birthDate.getDate();

    // Adjust for negative days
    if (days < 0) {
      months--;
      const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
      days += prevMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total in different units
    const totalMilliseconds = targetDate.getTime() - birthDate.getTime();
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    return {
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      birthDate,
      targetDate,
    };
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const results = showResults ? calculateAge() : null;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

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
            <span className="text-gray-600">Age Calculator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Age Calculator</h1>
            </div>
            <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
              Calculate your exact age or time interval between two dates. Get precise age in years, months, weeks, days, hours, minutes, and seconds instantly.
            </p>
          </div>
        </div>

        {/* Main Calculator Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Calculator Card */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-2 border-gray-200 mb-8">
            <div className="bg-[#1A3D7C] text-white p-4 rounded-lg mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-3" />
              <p className="text-lg">Modify the values and click the Calculate button to use</p>
            </div>

            <div className="space-y-6">
              {/* Date of Birth */}
              <div>
                <Label className="text-lg font-semibold text-gray-700 mb-3 block">
                  Date of Birth
                </Label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Month</Label>
                    <Select value={dobMonth} onValueChange={setDobMonth}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Day</Label>
                    <Select value={dobDay} onValueChange={setDobDay}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {generateDays(dobMonth, dobYear).map((day) => (
                          <SelectItem key={day.value} value={day.value}>
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Year</Label>
                    <Select value={dobYear} onValueChange={setDobYear}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {generateYears().map((year) => (
                          <SelectItem key={year.value} value={year.value}>
                            {year.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Age at Date */}
              <div>
                <Label className="text-lg font-semibold text-gray-700 mb-3 block">
                  Age at the Date of
                </Label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Month</Label>
                    <Select value={ageMonth} onValueChange={setAgeMonth}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Day</Label>
                    <Select value={ageDay} onValueChange={setAgeDay}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {generateDays(ageMonth, ageYear).map((day) => (
                          <SelectItem key={day.value} value={day.value}>
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Year</Label>
                    <Select value={ageYear} onValueChange={setAgeYear}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {generateYears().map((year) => (
                          <SelectItem key={year.value} value={year.value}>
                            {year.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleCalculate}
                  className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white px-12 py-6 text-lg font-semibold rounded-lg hover:shadow-xl transition-all"
                >
                  Calculate
                </Button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {showResults && results && (
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-2 border-[#2BAE66] mb-8">
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-lg mb-6">
                <h2 className="text-2xl font-bold">Result</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">Age:</h3>
                  <div className="space-y-2 text-lg">
                    <p className="font-semibold text-gray-800">
                      {results.years} years {results.months} months {results.days} days
                    </p>
                    <p className="text-gray-700">or {formatNumber(results.totalMonths)} months {results.days} days</p>
                    <p className="text-gray-700">or {formatNumber(results.totalWeeks)} weeks {results.days % 7} days</p>
                    <p className="text-gray-700">or {formatNumber(results.totalDays)} days</p>
                    <p className="text-gray-700">or {formatNumber(results.totalHours)} hours</p>
                    <p className="text-gray-700">or {formatNumber(results.totalMinutes)} minutes</p>
                    <p className="text-gray-700">or {formatNumber(results.totalSeconds)} seconds</p>
                  </div>
                </div>

                {/* Next Birthday */}
                {showResults && (
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
                    <h3 className="text-xl font-bold text-[#1A3D7C] mb-2">Date Information:</h3>
                    <p className="text-gray-700">
                      <strong>From:</strong> {results.birthDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-gray-700">
                      <strong>To:</strong> {results.targetDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* What is Age Calculator Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">What is an Age Calculator?</h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p className="text-lg leading-relaxed">
                An <strong>Age Calculator</strong> is a simple yet powerful tool that helps you determine the exact age or time interval between two dates. Whether you want to know your precise age in years, months, and days, or calculate the duration between two historical events, this calculator provides instant and accurate results.
              </p>
              <p className="text-lg leading-relaxed">
                Beyond just calculating years, our age calculator breaks down the time difference into multiple units including months, weeks, days, hours, minutes, and even seconds. This makes it perfect for various scenarios - from calculating ages for official documents to planning events or tracking milestones.
              </p>
              <p className="text-lg leading-relaxed">
                The calculator is especially useful for students, parents tracking child development milestones, HR professionals managing employee records, medical professionals calculating patient ages, and anyone who needs precise date calculations for legal, educational, or personal purposes.
              </p>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-xl border-2 border-blue-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">How to Use the Age Calculator</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-[#2BAE66] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Enter Date of Birth</h3>
                  <p className="text-gray-700">Select the month, day, and year of the birth date or starting date you want to calculate from.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#2BAE66] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Enter Target Date</h3>
                  <p className="text-gray-700">Select the date you want to calculate the age at. This defaults to today's date but can be any future or past date.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#2BAE66] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Click Calculate</h3>
                  <p className="text-gray-700">Press the Calculate button to instantly see the age or time interval in multiple formats - years, months, weeks, days, hours, minutes, and seconds.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-[#1A3D7C] mb-8">
              Benefits of Using Our Age Calculator
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Instant & Accurate',
                  description: 'Get precise age calculations in seconds with support for leap years and varying month lengths.',
                },
                {
                  title: 'Multiple Time Units',
                  description: 'View your age in years, months, weeks, days, hours, minutes, and seconds simultaneously.',
                },
                {
                  title: 'Easy to Use',
                  description: 'Simple dropdown interface for selecting dates - no typing required, just select and calculate.',
                },
                {
                  title: 'Mobile Friendly',
                  description: 'Fully responsive design works perfectly on smartphones, tablets, and desktop computers.',
                },
                {
                  title: 'No Registration',
                  description: 'Completely free to use with no sign-up, registration, or personal information required.',
                },
                {
                  title: 'Educational Tool',
                  description: 'Perfect for students learning about date calculations, time intervals, and calendar mathematics.',
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200 hover:border-[#2BAE66] transition-all hover:shadow-lg"
                >
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">{benefit.title}</h3>
                      <p className="text-gray-700">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white p-8 md:p-12 rounded-xl mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
              <Lightbulb className="w-8 h-8 mr-3" />
              Common Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: 'Age Verification',
                  description: 'Calculate exact age for school admissions, job applications, government IDs, and legal documents.',
                },
                {
                  title: 'Event Planning',
                  description: 'Plan milestone birthdays, anniversaries, and count down to special occasions with precise date calculations.',
                },
                {
                  title: 'Medical Records',
                  description: 'Doctors and healthcare providers use age calculators for pediatric development tracking and geriatric assessments.',
                },
                {
                  title: 'HR & Payroll',
                  description: 'Calculate employee age for benefits eligibility, retirement planning, and service duration tracking.',
                },
                {
                  title: 'Education',
                  description: 'Teachers and students use it for age-appropriate grade placement and developmental milestone studies.',
                },
                {
                  title: 'Historical Research',
                  description: 'Calculate time intervals between historical events or determine ages of historical figures.',
                },
                {
                  title: 'Insurance & Finance',
                  description: 'Insurance companies and financial advisors use age calculations for policy eligibility and premium calculations.',
                },
                {
                  title: 'Astrology & Horoscope',
                  description: 'Calculate exact age in days for astrological predictions, birth chart analysis, and zodiac compatibility.',
                },
              ].map((useCase, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border-2 border-white/30">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-300 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                      <p className="text-blue-100">{useCase.description}</p>
                    </div>
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
                  question: 'How accurate is the age calculator?',
                  answer: 'Our age calculator is 100% accurate. It accounts for leap years, varying month lengths (28-31 days), and calculates down to the exact second. The calculations are based on the Gregorian calendar system used worldwide.',
                },
                {
                  question: 'Can I calculate age for future dates?',
                  answer: 'Yes! You can set the "Age at the Date of" field to any future date to calculate how old someone will be on that specific date. This is useful for planning milestone birthdays or checking age eligibility for future events.',
                },
                {
                  question: 'Why do I need to know age in different units?',
                  answer: 'Different situations require different units. Medical professionals often need age in months for infants, legal documents may require exact days, event planners count down in weeks, and some scientific calculations need precision in hours or seconds.',
                },
                {
                  question: 'How does the calculator handle leap years?',
                  answer: 'The calculator automatically accounts for leap years (years divisible by 4, except century years unless divisible by 400). This ensures accurate day counts for people born on or around February 29.',
                },
                {
                  question: 'What if someone was born on February 29?',
                  answer: 'People born on February 29 (leap day) technically have a birthday every 4 years. The calculator accurately handles this by calculating exact days, and for non-leap years, their age increases on February 28 or March 1 depending on convention.',
                },
                {
                  question: 'Can I calculate time between two historical events?',
                  answer: 'Absolutely! Just enter the start event date as "Date of Birth" and the end event date as "Age at the Date of". The calculator works for any two dates, not just for calculating human ages.',
                },
                {
                  question: 'Is my date of birth stored or shared?',
                  answer: 'No! All calculations happen in your browser (client-side). We do not store, track, or transmit any personal information or dates you enter. Your privacy is completely protected.',
                },
                {
                  question: 'Why is age calculation important for students?',
                  answer: 'Age determines grade eligibility, exam eligibility (like JEE, NEET, CUET), scholarship applications, and age-specific educational programs. Accurate age calculation ensures students meet admission criteria and apply to appropriate opportunities.',
                },
                {
                  question: 'How do I calculate my exact age for job applications?',
                  answer: 'Enter your date of birth and set the target date to the job application deadline or joining date. Many government jobs and entrance exams have strict age limits that require precise calculation.',
                },
                {
                  question: 'Can teachers use this for classroom activities?',
                  answer: 'Yes! Teachers can use this calculator for math lessons about time, calendars, and arithmetic. It\'s perfect for teaching concepts like leap years, date differences, and time unit conversions in an interactive way.',
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

          {/* Understanding Age Calculation */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Understanding Age Calculation</h2>
            <div className="prose max-w-none text-gray-700 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">How Age is Calculated</h3>
                <p className="leading-relaxed">
                  Age calculation involves finding the time difference between two dates. The calculator subtracts the birth date from the target date and breaks it down into years, months, and days. The process accounts for:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li><strong>Varying Month Lengths:</strong> Months have 28, 29, 30, or 31 days</li>
                  <li><strong>Leap Years:</strong> Every 4 years (except century years not divisible by 400)</li>
                  <li><strong>Calendar Changes:</strong> The Gregorian calendar system used globally</li>
                  <li><strong>Time Zones:</strong> Calculations use the date without timezone considerations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">Age Calculation Formula</h3>
                <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200">
                  <p className="font-mono text-sm mb-2"><strong>Years</strong> = Target Year - Birth Year (adjusted for months and days)</p>
                  <p className="font-mono text-sm mb-2"><strong>Months</strong> = Target Month - Birth Month (adjusted for days)</p>
                  <p className="font-mono text-sm mb-2"><strong>Days</strong> = Target Day - Birth Day (adjusted for month lengths)</p>
                  <p className="font-mono text-sm mt-4"><strong>Total Days</strong> = (Target Date - Birth Date) / milliseconds per day</p>
                  <p className="font-mono text-sm"><strong>Total Hours</strong> = Total Days × 24</p>
                  <p className="font-mono text-sm"><strong>Total Minutes</strong> = Total Hours × 60</p>
                  <p className="font-mono text-sm"><strong>Total Seconds</strong> = Total Minutes × 60</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">Example Calculation</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="mb-2"><strong>Birth Date:</strong> January 15, 2000</p>
                  <p className="mb-4"><strong>Target Date:</strong> October 28, 2025</p>
                  <p className="mb-2"><strong>Result:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>25 years, 9 months, 13 days</li>
                    <li>Or 309 months, 13 days</li>
                    <li>Or approximately 9,417 days</li>
                    <li>Or approximately 226,008 hours</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border-2 border-purple-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Tips for Using the Age Calculator</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Double-Check Dates',
                  tip: 'Always verify the month, day, and year before calculating, especially for official documents or legal purposes.',
                },
                {
                  title: 'Save Important Results',
                  tip: 'Take a screenshot of the results if you need them for applications or records.',
                },
                {
                  title: 'Future Date Planning',
                  tip: 'Use future dates to plan when someone will reach a milestone age for college admissions or retirement.',
                },
                {
                  title: 'Historical Context',
                  tip: 'Calculate ages of historical figures at the time of major events to understand historical context better.',
                },
                {
                  title: 'Multiple Calculations',
                  tip: 'Compare ages of siblings, family members, or historical figures by running multiple calculations.',
                },
                {
                  title: 'Educational Use',
                  tip: 'Teachers can create worksheets asking students to verify age calculations for math practice.',
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
              <Link href="/calculators/sip-calculator" className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200 hover:border-[#2BAE66] transition-all hover:shadow-lg">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">SIP Calculator</h3>
                <p className="text-gray-700 text-sm">Calculate mutual fund returns with systematic investment plans</p>
              </Link>
              <Link href="/calculators/emi-calculator" className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200 hover:border-[#2BAE66] transition-all hover:shadow-lg">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">EMI Calculator</h3>
                <p className="text-gray-700 text-sm">Calculate monthly loan payments for education and other loans</p>
              </Link>
              <Link href="/calculators/income-tax-calculator" className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200 hover:border-[#2BAE66] transition-all hover:shadow-lg">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">Income Tax Calculator</h3>
                <p className="text-gray-700 text-sm">Calculate income tax for FY 2025-26 with deductions</p>
              </Link>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Academic Guidance?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                The TutorBridge offers personalized tutoring for students of all ages. Get expert help in math, science, and all subjects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tutoring/free-consultation">
                  <button className="bg-[#FFC857] text-[#1A3D7C] px-8 py-3 rounded-xl font-semibold hover:bg-[#FFC857]/90 transition-colors">
                    Book Free Demo Class
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#1A3D7C] transition-colors">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
