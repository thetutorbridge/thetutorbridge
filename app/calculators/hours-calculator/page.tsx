'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Home, CheckCircle, HelpCircle, Lightbulb, Calendar, Briefcase, Timer, TrendingUp, Target, ArrowRight, BookOpen } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function HoursCalculatorPage() {
  const [clockFormat, setClockFormat] = useState<'12' | '24'>('12');
  const [startTime, setStartTime] = useState('0915');
  const [startPeriod, setStartPeriod] = useState('am');
  const [endTime, setEndTime] = useState('1225');
  const [endPeriod, setEndPeriod] = useState('pm');
  const [breakMinutes, setBreakMinutes] = useState(0);

  const parseTime = (time: string, period: string): { hours: number; minutes: number } => {
    if (!time || time.length < 3) return { hours: 0, minutes: 0 };

    const timeStr = time.padStart(4, '0');
    let hours = parseInt(timeStr.substring(0, 2)) || 0;
    const minutes = parseInt(timeStr.substring(2, 4)) || 0;

    if (clockFormat === '12') {
      if (period === 'pm' && hours !== 12) {
        hours += 12;
      } else if (period === 'am' && hours === 12) {
        hours = 0;
      }
    }

    return { hours, minutes };
  };

  const calculateHours = () => {
    const start = parseTime(startTime, startPeriod);
    const end = parseTime(endTime, endPeriod);

    // Convert to total minutes
    let startMinutes = start.hours * 60 + start.minutes;
    let endMinutes = end.hours * 60 + end.minutes;

    // Handle overnight shifts
    if (endMinutes < startMinutes) {
      endMinutes += 24 * 60;
    }

    // Calculate difference
    let totalMinutes = endMinutes - startMinutes;

    // Deduct breaks
    totalMinutes = Math.max(0, totalMinutes - breakMinutes);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const decimalHours = totalMinutes / 60;

    return {
      totalTime: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`,
      decimalHours: decimalHours.toFixed(2),
      totalMinutes: totalMinutes,
    };
  };

  const results = calculateHours();

  const handleClear = () => {
    setStartTime('');
    setEndTime('');
    setBreakMinutes(0);
    setStartPeriod('am');
    setEndPeriod('pm');
  };

  return (
    <>
      <Navigation />
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-8 md:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <Link
              href="/calculators"
              className="inline-flex items-center text-white/90 hover:text-white mb-4 md:mb-6 transition-colors text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Calculators
            </Link>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                  Hours Calculator — Calculate Time Between Times
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl">
                  Calculate work hours, shift duration, and time difference between two times with break deductions. Get instant results in hours:minutes, decimal hours, and total minutes format.
                </p>
              </div>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {/* Left Column - Calculator */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 lg:p-10">
                <h2 className="text-xl md:text-2xl font-bold text-[#1A3D7C] mb-6 md:mb-8">
                  Calculate Hours Between Times
                </h2>

                <div className="space-y-6 md:space-y-8">
                  {/* Clock Format Selection */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-3 italic">
                      Enter times without the colon: 915, 1225, etc.
                    </p>
                    <RadioGroup
                      defaultValue="12"
                      value={clockFormat}
                      onValueChange={(value) => setClockFormat(value as '12' | '24')}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="12" id="12hour" />
                        <Label htmlFor="12hour" className="cursor-pointer font-semibold">
                          12 hour clock
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="24" id="24hour" />
                        <Label htmlFor="24hour" className="cursor-pointer font-semibold">
                          24 hour clock
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Start Time */}
                  <div>
                    <Label htmlFor="start-time" className="text-gray-700 font-semibold mb-3 block text-sm md:text-base">
                      Start Time:
                    </Label>
                    <div className="flex gap-3 items-center">
                      <Input
                        id="start-time"
                        type="text"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="hhmm"
                        className="flex-1 text-center font-bold text-lg border-2 border-[#2BAE66] focus:ring-2 focus:ring-[#2BAE66]"
                      />
                      {clockFormat === '12' && (
                        <Select value={startPeriod} onValueChange={setStartPeriod}>
                          <SelectTrigger className="w-24 border-2 border-[#2BAE66]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="am">am</SelectItem>
                            <SelectItem value="pm">pm</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>

                  {/* End Time */}
                  <div>
                    <Label htmlFor="end-time" className="text-gray-700 font-semibold mb-3 block text-sm md:text-base">
                      End Time:
                    </Label>
                    <div className="flex gap-3 items-center">
                      <Input
                        id="end-time"
                        type="text"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="hhmm"
                        className="flex-1 text-center font-bold text-lg border-2 border-[#2BAE66] focus:ring-2 focus:ring-[#2BAE66]"
                      />
                      {clockFormat === '12' && (
                        <Select value={endPeriod} onValueChange={setEndPeriod}>
                          <SelectTrigger className="w-24 border-2 border-[#2BAE66]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="am">am</SelectItem>
                            <SelectItem value="pm">pm</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>

                  {/* Break Time */}
                  <div>
                    <Label htmlFor="break-minutes" className="text-gray-700 font-semibold mb-3 block text-sm md:text-base">
                      Deduct breaks:
                    </Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="break-minutes"
                        type="number"
                        value={breakMinutes}
                        onChange={(e) => setBreakMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-32 text-center font-bold text-lg border-2 border-[#2BAE66] focus:ring-2 focus:ring-[#2BAE66]"
                        min="0"
                      />
                      <span className="text-gray-700 font-medium">minutes</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={handleClear}
                      variant="outline"
                      className="flex-1 py-6 text-lg font-semibold border-2 border-gray-300 hover:bg-gray-50"
                    >
                      Clear
                    </Button>
                    <Button
                      onClick={() => {}}
                      className="flex-1 py-6 text-lg font-semibold bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] hover:opacity-90"
                    >
                      Calculate
                    </Button>
                  </div>
                </div>

                {/* Formula/Info Display */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-[#2BAE66]/20">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-base md:text-lg">
                    <Clock className="w-5 h-5 mr-2" />
                    How It Works
                  </h3>
                  <ul className="space-y-2 text-sm md:text-base text-gray-700">
                    <li>• Enter start and end times in hhmm format (e.g., 915 for 9:15)</li>
                    <li>• Choose 12-hour or 24-hour clock format</li>
                    <li>• Add break time to deduct from total hours</li>
                    <li>• Get instant results in multiple formats</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 text-white sticky top-6">
                <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3" />
                  Answer:
                </h2>

                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border-2 border-white/20">
                    <p className="text-white/80 text-xs md:text-sm mb-2">Total time hh:mm</p>
                    <p className="text-3xl md:text-4xl font-bold">
                      {results.totalTime}
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
                    <p className="text-white/80 text-xs md:text-sm mb-2">In decimal hours</p>
                    <p className="text-2xl md:text-3xl font-bold">
                      {results.decimalHours} hours
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
                    <p className="text-white/80 text-xs md:text-sm mb-2">In minutes</p>
                    <p className="text-2xl md:text-3xl font-bold">
                      {results.totalMinutes} minutes
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20 space-y-2 text-xs md:text-sm text-white/80">
                  <p>🕐 Clock Format: {clockFormat} hour</p>
                  <p>☕ Break Time: {breakMinutes} minutes</p>
                  <p>💼 Perfect for timesheet tracking</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="mt-12 md:mt-16 space-y-8 md:space-y-12">
            {/* What is Hours Calculator */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                What is an Hours Calculator?
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  An <strong>hours calculator</strong> is a time calculation tool that helps you determine the exact duration between two times. Whether you're calculating work hours, shift duration, project time, or billable hours, this calculator provides instant accurate results in multiple formats.
                </p>
                <p>
                  Our hours calculator supports both 12-hour (AM/PM) and 24-hour clock formats, allowing you to enter times in the most convenient way. It automatically handles overnight shifts that cross midnight and lets you deduct break times for accurate work hour calculations.
                </p>
                <p>
                  The calculator displays results in three formats: traditional hours:minutes format (e.g., 13:00), decimal hours for payroll calculations (e.g., 13.00 hours), and total minutes for detailed tracking (e.g., 780 minutes). This flexibility makes it perfect for various use cases from employee timesheets to freelance time tracking.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-lg">
                    <Briefcase className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    For Employees
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                    <li>✓ Track daily work hours</li>
                    <li>✓ Calculate overtime</li>
                    <li>✓ Verify timesheet accuracy</li>
                    <li>✓ Log project time</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-lg">
                    <Clock className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    For Employers
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                    <li>✓ Calculate payroll hours</li>
                    <li>✓ Verify shift durations</li>
                    <li>✓ Track attendance</li>
                    <li>✓ Monitor productivity</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-lg">
                    <Timer className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    For Freelancers
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                    <li>✓ Track billable hours</li>
                    <li>✓ Calculate project time</li>
                    <li>✓ Generate invoices</li>
                    <li>✓ Time management</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How to Use */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                How to Use the Hours Calculator
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    Step 1: Choose Clock Format
                  </h3>
                  <p className="text-gray-700">
                    Select between 12-hour (AM/PM) or 24-hour clock format based on your preference. Most people find 12-hour format easier for daily use, while 24-hour format is common in military, medical, and international settings.
                  </p>
                </div>

                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    Step 2: Enter Start Time
                  </h3>
                  <p className="text-gray-700">
                    Enter your start time in <strong>hhmm format without colons</strong>. For example: 915 for 9:15, 1030 for 10:30, or 1430 for 2:30 PM (in 24-hour format). If using 12-hour format, select AM or PM from the dropdown.
                  </p>
                </div>

                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    Step 3: Enter End Time
                  </h3>
                  <p className="text-gray-700">
                    Enter your end time in the same format. For overnight shifts (e.g., 11 PM to 7 AM), just enter the times normally — the calculator automatically handles midnight crossover and calculates the correct duration.
                  </p>
                </div>

                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    Step 4: Add Break Time (Optional)
                  </h3>
                  <p className="text-gray-700">
                    If you took breaks during this period (lunch, coffee breaks, etc.), enter the total break duration in minutes. The calculator will automatically deduct this from your total work hours to give you accurate billable or payable time.
                  </p>
                </div>

                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    Step 5: View Results
                  </h3>
                  <p className="text-gray-700">
                    Get instant results in three formats: Hours:Minutes (13:45), Decimal Hours (13.75) for payroll, and Total Minutes (825) for detailed tracking. Use the format that best suits your needs — no need to do manual conversions!
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <h3 className="font-bold text-[#1A3D7C] mb-3">Quick Examples:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>9:15 AM to 5:30 PM (30 min break):</strong> Enter 915, select AM, then 530, select PM, break = 30 → Result: 8:00 hours</li>
                  <li>• <strong>22:30 to 06:15 (overnight):</strong> Enter 2230, then 615 (24-hour format) → Result: 7:45 hours</li>
                  <li>• <strong>1:00 PM to 9:45 PM (1 hour break):</strong> Enter 100 PM, then 945 PM, break = 60 → Result: 7:45 hours</li>
                </ul>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <Target className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Benefits of Using Hours Calculator
              </h2>
              <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Accurate Payroll Calculations
                    </h3>
                    <p className="text-white/90">
                      Calculate exact work hours for payroll processing. Get decimal hour format (e.g., 7.5 hours) that's directly usable for hourly wage calculations. Eliminate rounding errors and ensure fair compensation.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Timesheet Verification
                    </h3>
                    <p className="text-white/90">
                      Verify timesheet accuracy before submission. Compare calculated hours with your records to catch errors. Perfect for employees who need to confirm their logged hours match actual work time.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Overtime Tracking
                    </h3>
                    <p className="text-white/90">
                      Quickly calculate overtime hours beyond your standard shift. Essential for employees tracking extra hours and employers managing overtime costs. Supports overnight shifts that cross midnight boundaries.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Freelance Time Billing
                    </h3>
                    <p className="text-white/90">
                      Track billable hours for client projects with precision. Convert time to decimal format for invoicing. Ensure you're billing for every minute worked while maintaining professional accuracy.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Break Time Management
                    </h3>
                    <p className="text-white/90">
                      Automatically deduct unpaid breaks from total hours. Whether it's lunch breaks, coffee breaks, or other non-working time, get accurate net working hours for fair time tracking and compensation.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Multiple Time Formats
                    </h3>
                    <p className="text-white/90">
                      Get results in hours:minutes, decimal hours, and total minutes simultaneously. No need for manual conversion — use the format that suits your specific need, whether it's payroll, project management, or billing.
                    </p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-[#FFC857] text-[#1A3D7C] rounded-lg">
                  <p className="font-semibold">
                    💡 Pro Tip: For accurate payroll, always use the decimal hours format (e.g., 7.75 hours instead of 7:45). This eliminates calculation errors when multiplying by hourly rates!
                  </p>
                </div>
              </div>
            </section>

            {/* Real-World Use Cases */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                Real-World Use Cases
              </h2>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    🏢 Office Employee Scenario
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Situation:</strong> Sarah works from 9:00 AM to 6:00 PM with a 1-hour lunch break and two 15-minute coffee breaks (total 90 minutes).
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Calculation:</strong> Enter 900 AM to 600 PM, deduct 90 minutes breaks
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    <strong>Result:</strong> 7 hours 30 minutes (7.5 hours) of actual work time
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    🌙 Night Shift Worker Scenario
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Situation:</strong> Mike works night shift from 11:00 PM to 7:00 AM with a 30-minute break.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Calculation:</strong> Enter 2300 (24-hour) to 700 (crosses midnight), deduct 30 minutes
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    <strong>Result:</strong> 7 hours 30 minutes of overnight shift work
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    💼 Freelancer Billing Scenario
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Situation:</strong> Alex is a freelance designer who worked on a project from 2:30 PM to 9:15 PM with no breaks, billing at $50/hour.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Calculation:</strong> Enter 230 PM to 915 PM
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    <strong>Result:</strong> 6.75 hours × $50 = $337.50 to bill
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    ⏰ Part-Time Student Worker Scenario
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Situation:</strong> Emma works part-time at a cafe from 4:00 PM to 9:30 PM, 3 days a week, with a 20-minute break each day.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Calculation:</strong> Enter 400 PM to 930 PM, deduct 20 minutes
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    <strong>Result:</strong> 5.17 hours/day × 3 days = 15.5 hours/week
                  </p>
                </div>
              </div>
            </section>

            {/* FAQs Section */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How do I calculate hours between two times?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Enter the start time and end time in <strong>hhmm format</strong> (without colons). For example, 9:15 AM = 915, 2:30 PM = 230. Select AM/PM for 12-hour format or use 24-hour format (14:30 = 1430). The calculator instantly shows the time difference in hours:minutes, decimal hours, and total minutes.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Can this calculator handle overnight shifts?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Yes! The calculator automatically handles shifts that cross midnight. For example, if you work from <strong>11:00 PM to 7:00 AM</strong>, enter 2300 and 700 (24-hour format) or 11:00 PM and 7:00 AM (12-hour format). It will correctly calculate 8 hours of work time.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    What is decimal hours and why is it useful?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    <strong>Decimal hours</strong> represent time as a decimal number (e.g., 7.5 hours instead of 7:30). This format is essential for <strong>payroll calculations</strong> — you can directly multiply decimal hours by hourly wage rate. For example: 7.5 hours × $20/hour = $150 (easier than calculating 7:30 × $20).
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How do I deduct break time?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Enter your total break time in <strong>minutes</strong> in the "Deduct breaks" field. For example, if you had a 30-minute lunch and two 15-minute coffee breaks, enter 60 minutes (30+15+15). The calculator automatically subtracts this from your total hours to show net working time.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    What's the difference between 12-hour and 24-hour format?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    <strong>12-hour format</strong> uses AM/PM (9:00 AM, 5:00 PM) — common in USA, Canada, India. <strong>24-hour format</strong> runs 00:00 to 23:59 (09:00, 17:00) — used in military, healthcare, and most of Europe. Choose whichever you're comfortable with; both give identical results.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Can I calculate time for multiple days?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    This calculator works for <strong>single-day calculations</strong> (up to 24 hours). For multi-day periods, calculate each day separately and add the results. For example, if you worked 8 hours Monday, 7.5 hours Tuesday, and 9 hours Wednesday, calculate each day and sum: 8 + 7.5 + 9 = 24.5 hours total.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How accurate is this calculator for payroll?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    The calculator provides <strong>precise time calculations</strong> suitable for payroll processing. However, always verify against your company's official timekeeping system. Different organizations may have specific rounding rules (e.g., round to nearest 15 minutes) or overtime calculation policies.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    What if I enter times in the wrong format?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    The calculator expects <strong>hhmm format without colons</strong> (e.g., 915 not 9:15). If you enter invalid times like 2561 (25 hours, 61 minutes), results may be inaccurate. Always enter: hours (00-23 or 01-12) followed immediately by minutes (00-59). Examples: 900, 1430, 2359.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Can I use this for calculating study hours or workout time?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Absolutely! While designed for work hours, this calculator works for <strong>any time tracking need</strong> — study sessions, gym workouts, project time, gaming sessions, or any activity where you need to track duration. The break deduction feature is perfect for accounting for rest periods.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Is there a mobile app for this calculator?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Our hours calculator is <strong>fully mobile-optimized</strong> — it works perfectly on smartphones and tablets through your web browser. No app download needed! Bookmark this page for quick access anytime you need to calculate hours. Works offline after initial load on most modern browsers.
                  </p>
                </div>
              </div>
            </section>

            {/* Smart Tips Section */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Smart Tips for Time Tracking
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-gray-200">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Round strategically:</strong> Many companies use 15-minute rounding rules. If you clock in at 8:52 AM, it might be rounded to 9:00 AM. Understand your company's policy to avoid losing paid time. Arriving a few minutes early ensures you get credit for full hours.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Track breaks separately:</strong> Keep a note of all break times throughout your shift — lunch, coffee breaks, personal time. It's easier to add them up at the end rather than trying to remember. Many workers lose money by under-reporting breaks.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Use 24-hour format for night shifts:</strong> If you regularly work overnight shifts, 24-hour format (e.g., 23:00 to 07:00) is less error-prone than 12-hour format with AM/PM. It eliminates confusion and makes time tracking across midnight much clearer.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Double-check your timesheet:</strong> Before submitting, calculate your hours independently using this calculator. Compare with your official timesheet to catch data entry errors or system glitches. Even small errors compound over pay periods.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Understand overtime calculations:</strong> Overtime typically starts after 8 hours/day or 40 hours/week (varies by location). Use this calculator to track both regular and overtime hours separately. Overtime hours usually pay 1.5× or 2× regular rate.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>For freelancers: Add buffer time:</strong> When billing clients, consider adding 10-15% buffer for administrative tasks like emails, calls, and project management. If you worked 6.75 hours directly, charging for 7-7.5 hours accounts for indirect project time.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Save your calculations:</strong> Take a screenshot or note down your daily hours. This creates a personal backup record. If there are ever payroll disputes, you'll have independent documentation of hours worked. Especially important for contractors and hourly workers.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Consider productivity: </strong> Track not just hours worked, but productive hours. If you're billing by the hour, clients value focused work time. Use the calculator to track pure work sessions vs. total time at desk to improve your productivity and billing accuracy.
                    </p>
                  </li>
                </ul>
              </div>
            </section>

            {/* Time Conversion Reference */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                Quick Time Conversion Reference
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
                      <th className="border border-gray-300 p-3 text-left">Time Format</th>
                      <th className="border border-gray-300 p-3 text-left">Hours:Minutes</th>
                      <th className="border border-gray-300 p-3 text-left">Decimal Hours</th>
                      <th className="border border-gray-300 p-3 text-left">Total Minutes</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3">15 minutes</td>
                      <td className="border border-gray-300 p-3">00:15</td>
                      <td className="border border-gray-300 p-3">0.25 hours</td>
                      <td className="border border-gray-300 p-3">15 minutes</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3">30 minutes</td>
                      <td className="border border-gray-300 p-3">00:30</td>
                      <td className="border border-gray-300 p-3">0.50 hours</td>
                      <td className="border border-gray-300 p-3">30 minutes</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3">45 minutes</td>
                      <td className="border border-gray-300 p-3">00:45</td>
                      <td className="border border-gray-300 p-3">0.75 hours</td>
                      <td className="border border-gray-300 p-3">45 minutes</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3">1 hour</td>
                      <td className="border border-gray-300 p-3">01:00</td>
                      <td className="border border-gray-300 p-3">1.00 hours</td>
                      <td className="border border-gray-300 p-3">60 minutes</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3">2 hours 15 min</td>
                      <td className="border border-gray-300 p-3">02:15</td>
                      <td className="border border-gray-300 p-3">2.25 hours</td>
                      <td className="border border-gray-300 p-3">135 minutes</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3">4 hours 30 min</td>
                      <td className="border border-gray-300 p-3">04:30</td>
                      <td className="border border-gray-300 p-3">4.50 hours</td>
                      <td className="border border-gray-300 p-3">270 minutes</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3">7 hours 45 min</td>
                      <td className="border border-gray-300 p-3">07:45</td>
                      <td className="border border-gray-300 p-3">7.75 hours</td>
                      <td className="border border-gray-300 p-3">465 minutes</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3">8 hours (standard workday)</td>
                      <td className="border border-gray-300 p-3">08:00</td>
                      <td className="border border-gray-300 p-3">8.00 hours</td>
                      <td className="border border-gray-300 p-3">480 minutes</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3">9 hours 30 min</td>
                      <td className="border border-gray-300 p-3">09:30</td>
                      <td className="border border-gray-300 p-3">9.50 hours</td>
                      <td className="border border-gray-300 p-3">570 minutes</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3">12 hours</td>
                      <td className="border border-gray-300 p-3">12:00</td>
                      <td className="border border-gray-300 p-3">12.00 hours</td>
                      <td className="border border-gray-300 p-3">720 minutes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Quick Formula:</strong> To convert minutes to decimal hours, divide by 60. To convert hours:minutes to decimal: Hours + (Minutes ÷ 60). For example: 7:45 = 7 + (45÷60) = 7 + 0.75 = 7.75 hours.
                </p>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-xl md:rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Explore More Calculators
              </h2>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Check out our financial calculators for SIP, EMI, salary, and more
              </p>
              <Link href="/calculators">
                <Button className="bg-white text-[#1A3D7C] hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
                  View All Calculators
                </Button>
              </Link>
            </section>

            {/* Book Your Session CTA */}
            <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center text-white">
                  <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
                  <h2 className="text-2xl md:text-4xl font-bold mb-4">
                    Need Help with Time Calculations?
                  </h2>
                  <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                    Our expert tutors can help you understand time calculations, work hour management, and mathematical concepts. Get personalized one-on-one guidance tailored to your learning style.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/tutoring/free-consultation">
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

        {/* Footer */}
        <footer className="bg-[#1A3D7C] text-white py-8 md:py-12 mt-12 md:mt-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">The Tutor Bridge</h3>
                <p className="text-white/80 text-sm">
                  Your trusted partner for time tracking and financial calculations.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/calculators" className="text-white/80 hover:text-white transition-colors">
                      All Calculators
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-white/80 hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Disclaimer</h3>
                <p className="text-white/80 text-sm">
                  This calculator provides time calculations for reference. For official payroll and billing, verify with your company's timekeeping system.
                </p>
              </div>
            </div>
            <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
              <p>&copy; 2026 The Tutor Bridge. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
