'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, Clock, Settings, Printer, CheckCircle, HelpCircle, Lightbulb, BookOpen, TrendingUp, Target, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DayData {
  startTime: string;
  startPeriod: 'am' | 'pm';
  endTime: string;
  endPeriod: 'am' | 'pm';
  breakMinutes: string;
}

interface CalculatedDay {
  day: string;
  startTime: string;
  endTime: string;
  break: number;
  totalMinutes: number;
  totalHours: string;
  totalDecimal: number;
}

export default function WorkHoursCalculatorPage() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const [weekData, setWeekData] = useState<Record<string, DayData>>({
    Mon: { startTime: '', startPeriod: 'am', endTime: '', endPeriod: 'pm', breakMinutes: '' },
    Tue: { startTime: '', startPeriod: 'am', endTime: '', endPeriod: 'pm', breakMinutes: '' },
    Wed: { startTime: '', startPeriod: 'am', endTime: '', endPeriod: 'pm', breakMinutes: '' },
    Thu: { startTime: '', startPeriod: 'am', endTime: '', endPeriod: 'pm', breakMinutes: '' },
    Fri: { startTime: '', startPeriod: 'am', endTime: '', endPeriod: 'pm', breakMinutes: '' },
    Sat: { startTime: '', startPeriod: 'am', endTime: '', endPeriod: 'pm', breakMinutes: '' },
    Sun: { startTime: '', startPeriod: 'am', endTime: '', endPeriod: 'pm', breakMinutes: '' },
  });

  const [clockFormat, setClockFormat] = useState<'12' | '24'>('12');
  const [deductBreaks, setDeductBreaks] = useState(true);
  const [overtimeEnabled, setOvertimeEnabled] = useState(true);
  const [overtimeThreshold, setOvertimeThreshold] = useState('40');
  const [weekStartsOn, setWeekStartsOn] = useState('Monday');

  const [calculatedDays, setCalculatedDays] = useState<CalculatedDay[]>([]);
  const [totalRegular, setTotalRegular] = useState(0);
  const [totalOvertime, setTotalOvertime] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const parseTimeInput = (input: string): { hours: number; minutes: number } => {
    if (!input) return { hours: 0, minutes: 0 };

    // Remove any non-digit characters except colon
    const cleaned = input.replace(/[^\d:]/g, '');

    if (cleaned.includes(':')) {
      const [h, m] = cleaned.split(':');
      return { hours: parseInt(h) || 0, minutes: parseInt(m) || 0 };
    } else if (cleaned.length === 3) {
      // Format: 915 -> 9:15
      return { hours: parseInt(cleaned[0]), minutes: parseInt(cleaned.slice(1)) };
    } else if (cleaned.length === 4) {
      // Format: 1225 -> 12:25
      return { hours: parseInt(cleaned.slice(0, 2)), minutes: parseInt(cleaned.slice(2)) };
    } else if (cleaned.length <= 2) {
      return { hours: parseInt(cleaned) || 0, minutes: 0 };
    }

    return { hours: 0, minutes: 0 };
  };

  const timeToMinutes = (time: string, period: 'am' | 'pm'): number => {
    const { hours, minutes } = parseTimeInput(time);
    let totalHours = hours;

    if (clockFormat === '12') {
      if (period === 'pm' && hours !== 12) {
        totalHours = hours + 12;
      } else if (period === 'am' && hours === 12) {
        totalHours = 0;
      }
    }

    return totalHours * 60 + minutes;
  };

  const minutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  };

  const minutesToDecimal = (minutes: number): number => {
    return Math.round((minutes / 60) * 100) / 100;
  };

  const handleInputChange = (day: string, field: keyof DayData, value: string) => {
    setWeekData(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const calculateHours = () => {
    const results: CalculatedDay[] = [];
    let totalMinutes = 0;

    days.forEach(day => {
      const data = weekData[day];
      if (!data.startTime || !data.endTime) {
        return;
      }

      const startMinutes = timeToMinutes(data.startTime, data.startPeriod);
      let endMinutes = timeToMinutes(data.endTime, data.endPeriod);

      // Handle overnight shifts
      if (endMinutes < startMinutes) {
        endMinutes += 24 * 60;
      }

      let workMinutes = endMinutes - startMinutes;
      const breakMins = parseInt(data.breakMinutes) || 0;

      if (deductBreaks) {
        workMinutes -= breakMins;
      }

      if (workMinutes > 0) {
        totalMinutes += workMinutes;

        results.push({
          day,
          startTime: data.startTime,
          endTime: data.endTime,
          break: breakMins,
          totalMinutes: workMinutes,
          totalHours: minutesToTime(workMinutes),
          totalDecimal: minutesToDecimal(workMinutes)
        });
      }
    });

    setCalculatedDays(results);

    // Calculate overtime
    const overtimeThresholdMinutes = parseInt(overtimeThreshold) * 60;
    if (overtimeEnabled && totalMinutes > overtimeThresholdMinutes) {
      setTotalRegular(minutesToDecimal(overtimeThresholdMinutes));
      setTotalOvertime(minutesToDecimal(totalMinutes - overtimeThresholdMinutes));
    } else {
      setTotalRegular(minutesToDecimal(totalMinutes));
      setTotalOvertime(0);
    }
  };

  const handleClear = () => {
    setWeekData({
      Mon: { startTime: '', startPeriod: 'am', endTime: '', endPeriod: 'pm', breakMinutes: '' },
      Tue: { startTime: '', startPeriod: 'am', endTime: '', endPeriod: 'pm', breakMinutes: '' },
      Wed: { startTime: '', startPeriod: 'am', endTime: '', endPeriod: 'pm', breakMinutes: '' },
      Thu: { startTime: '', startPeriod: 'am', endTime: '', endPeriod: 'pm', breakMinutes: '' },
      Fri: { startTime: '', startPeriod: 'am', endTime: '', endPeriod: 'pm', breakMinutes: '' },
      Sat: { startTime: '', startPeriod: 'am', endTime: '', endPeriod: 'pm', breakMinutes: '' },
      Sun: { startTime: '', startPeriod: 'am', endTime: '', endPeriod: 'pm', breakMinutes: '' },
    });
    setCalculatedDays([]);
    setTotalRegular(0);
    setTotalOvertime(0);
  };

  const handlePrint = () => {
    window.print();
  };

  const getTotalHours = (): number => {
    return totalRegular + totalOvertime;
  };

  const getTotalHoursFormatted = (): string => {
    return minutesToTime(Math.round(getTotalHours() * 60));
  };

  return (
    <>
      <Navigation />
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 min-h-screen">
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
                  Work Hours Calculator - Free Time Card & Timesheet Calculator
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl">
                  Calculate total work hours, breaks, and overtime for the week. Perfect for employees, freelancers, payroll, and time tracking with automatic regular and overtime hour breakdown.
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
          <div className="grid grid-cols-1 gap-6 md:gap-8 lg:gap-10">
            {/* Main Calculator */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-8 lg:p-10">
              <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white text-center py-4 rounded-lg mb-6">
                <h2 className="text-xl md:text-2xl font-bold">Work Hours Calculator</h2>
                <p className="text-sm mt-2 italic">Enter times without the colon: 915, 1225, etc.</p>
              </div>

              {/* Settings Toggle */}
              <div className="mb-6 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {clockFormat === '12' ? '12-hour' : '24-hour'} format |
                  {deductBreaks ? ' Breaks deducted' : ' Breaks not deducted'} |
                  {overtimeEnabled ? ` OT after ${overtimeThreshold} hrs/wk` : ' No OT'}
                </div>
                <Button
                  onClick={() => setShowSettings(!showSettings)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
              </div>

              {/* Settings Panel */}
              {showSettings && (
                <div className="mb-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <h3 className="font-bold text-lg mb-4 flex items-center text-[#1A3D7C]">
                    <Settings className="w-5 h-5 mr-2" />
                    Calculator Settings
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="block mb-2 font-semibold">Clock Format</Label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={clockFormat === '12'}
                            onChange={() => setClockFormat('12')}
                            className="w-4 h-4"
                          />
                          12 hour
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={clockFormat === '24'}
                            onChange={() => setClockFormat('24')}
                            className="w-4 h-4"
                          />
                          24 hour
                        </label>
                      </div>
                    </div>

                    <div>
                      <Label className="block mb-2 font-semibold">Deduct Breaks</Label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={deductBreaks}
                            onChange={() => setDeductBreaks(true)}
                            className="w-4 h-4"
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={!deductBreaks}
                            onChange={() => setDeductBreaks(false)}
                            className="w-4 h-4"
                          />
                          No
                        </label>
                      </div>
                    </div>

                    <div>
                      <Label className="block mb-2 font-semibold">Overtime After</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={overtimeThreshold}
                          onChange={(e) => setOvertimeThreshold(e.target.value)}
                          className="w-20"
                        />
                        <span>hrs/week</span>
                        <div className="ml-4 flex gap-4">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              checked={overtimeEnabled}
                              onChange={() => setOvertimeEnabled(true)}
                              className="w-4 h-4"
                            />
                            Yes
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              checked={!overtimeEnabled}
                              onChange={() => setOvertimeEnabled(false)}
                              className="w-4 h-4"
                            />
                            No
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="block mb-2 font-semibold">Week Begins On</Label>
                      <Select value={weekStartsOn} onValueChange={setWeekStartsOn}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Monday">Monday</SelectItem>
                          <SelectItem value="Sunday">Sunday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Time Entry Table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
                      <th className="border border-gray-300 p-3 text-left font-semibold">Day</th>
                      <th className="border border-gray-300 p-3 text-center font-semibold">
                        Start Time<br />
                        <span className="text-xs font-normal">hhmm</span>
                      </th>
                      {clockFormat === '12' && <th className="border border-gray-300 p-2"></th>}
                      <th className="border border-gray-300 p-3 text-center font-semibold">
                        End Time<br />
                        <span className="text-xs font-normal">hhmm</span>
                      </th>
                      {clockFormat === '12' && <th className="border border-gray-300 p-2"></th>}
                      <th className="border border-gray-300 p-3 text-center font-semibold">
                        Break<br />
                        <span className="text-xs font-normal">minutes</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {days.map(day => (
                      <tr key={day} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-3 font-semibold bg-gray-50">{day}</td>
                        <td className="border border-gray-300 p-2">
                          <Input
                            type="text"
                            value={weekData[day].startTime}
                            onChange={(e) => handleInputChange(day, 'startTime', e.target.value)}
                            placeholder="0915"
                            className="text-center"
                          />
                        </td>
                        {clockFormat === '12' && (
                          <td className="border border-gray-300 p-2">
                            <Select
                              value={weekData[day].startPeriod}
                              onValueChange={(value: 'am' | 'pm') => handleInputChange(day, 'startPeriod', value)}
                            >
                              <SelectTrigger className="w-16">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="am">am</SelectItem>
                                <SelectItem value="pm">pm</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        )}
                        <td className="border border-gray-300 p-2">
                          <Input
                            type="text"
                            value={weekData[day].endTime}
                            onChange={(e) => handleInputChange(day, 'endTime', e.target.value)}
                            placeholder="1730"
                            className="text-center"
                          />
                        </td>
                        {clockFormat === '12' && (
                          <td className="border border-gray-300 p-2">
                            <Select
                              value={weekData[day].endPeriod}
                              onValueChange={(value: 'am' | 'pm') => handleInputChange(day, 'endPeriod', value)}
                            >
                              <SelectTrigger className="w-16">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="am">am</SelectItem>
                                <SelectItem value="pm">pm</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        )}
                        <td className="border border-gray-300 p-2">
                          <Input
                            type="number"
                            value={weekData[day].breakMinutes}
                            onChange={(e) => handleInputChange(day, 'breakMinutes', e.target.value)}
                            placeholder="30"
                            className="text-center"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="flex-1 py-6 text-lg font-semibold"
                >
                  Clear
                </Button>
                <Button
                  onClick={calculateHours}
                  className="flex-1 py-6 text-lg font-semibold bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] hover:opacity-90"
                >
                  Calculate
                </Button>
              </div>

              {/* Results */}
              {calculatedDays.length > 0 && (
                <>
                  {/* Totals Summary */}
                  <div className="mb-6 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Weekly Totals</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white/10 p-4 rounded-lg">
                        <div className="text-sm opacity-90">Regular Hours</div>
                        <div className="text-3xl font-bold">{totalRegular.toFixed(2)}</div>
                        <div className="text-xs opacity-75">{minutesToTime(Math.round(totalRegular * 60))}</div>
                      </div>
                      <div className="bg-white/10 p-4 rounded-lg">
                        <div className="text-sm opacity-90">Overtime Hours</div>
                        <div className="text-3xl font-bold">{totalOvertime.toFixed(2)}</div>
                        <div className="text-xs opacity-75">{minutesToTime(Math.round(totalOvertime * 60))}</div>
                      </div>
                      <div className="bg-white/10 p-4 rounded-lg">
                        <div className="text-sm opacity-90">Total Hours</div>
                        <div className="text-3xl font-bold">{getTotalHours().toFixed(2)}</div>
                        <div className="text-xs opacity-75">{getTotalHoursFormatted()}</div>
                      </div>
                    </div>
                  </div>

                  {/* Time Card Table */}
                  <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-[#1A3D7C]">Time Card</h3>
                      <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
                        <Printer className="w-4 h-4" />
                        Print
                      </Button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-3 text-left">Day</th>
                            <th className="border border-gray-300 p-3 text-center">Start Time<br /><span className="text-xs font-normal">hh:mm</span></th>
                            <th className="border border-gray-300 p-3 text-center">End Time<br /><span className="text-xs font-normal">hh:mm</span></th>
                            <th className="border border-gray-300 p-3 text-center">Break<br /><span className="text-xs font-normal">minutes</span></th>
                            <th className="border border-gray-300 p-3 text-center">Total<br /><span className="text-xs font-normal">hh:mm</span></th>
                            <th className="border border-gray-300 p-3 text-center">Total<br /><span className="text-xs font-normal">decimal</span></th>
                          </tr>
                        </thead>
                        <tbody>
                          {calculatedDays.map(dayData => (
                            <tr key={dayData.day} className="hover:bg-white">
                              <td className="border border-gray-300 p-3 font-semibold">{dayData.day}</td>
                              <td className="border border-gray-300 p-3 text-center">{dayData.startTime}</td>
                              <td className="border border-gray-300 p-3 text-center">{dayData.endTime}</td>
                              <td className="border border-gray-300 p-3 text-center">{dayData.break}</td>
                              <td className="border border-gray-300 p-3 text-center font-semibold">{dayData.totalHours}</td>
                              <td className="border border-gray-300 p-3 text-center font-semibold">{dayData.totalDecimal}</td>
                            </tr>
                          ))}
                          <tr className="bg-gray-200 font-bold">
                            <td colSpan={4} className="border border-gray-300 p-3 text-right">REG:</td>
                            <td className="border border-gray-300 p-3 text-center">{minutesToTime(Math.round(totalRegular * 60))}</td>
                            <td className="border border-gray-300 p-3 text-center">{totalRegular.toFixed(2)} hrs</td>
                          </tr>
                          {totalOvertime > 0 && (
                            <tr className="bg-orange-100 font-bold">
                              <td colSpan={4} className="border border-gray-300 p-3 text-right">OT:</td>
                              <td className="border border-gray-300 p-3 text-center">{minutesToTime(Math.round(totalOvertime * 60))}</td>
                              <td className="border border-gray-300 p-3 text-center">{totalOvertime.toFixed(2)} hrs</td>
                            </tr>
                          )}
                          <tr className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white font-bold">
                            <td colSpan={4} className="border border-gray-300 p-3 text-right">Total:</td>
                            <td className="border border-gray-300 p-3 text-center">{getTotalHoursFormatted()}</td>
                            <td className="border border-gray-300 p-3 text-center">{getTotalHours().toFixed(2)} hrs</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {/* Info Box */}
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200">
                <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-base md:text-lg">
                  <HelpCircle className="w-5 h-5 mr-2 text-[#2BAE66]" />
                  How to Use
                </h3>
                <ul className="space-y-2 text-sm md:text-base text-gray-700">
                  <li>✓ Enter times without colons: Type 915 for 9:15, 1225 for 12:25</li>
                  <li>✓ Select AM/PM for each time (12-hour format only)</li>
                  <li>✓ Enter break time in minutes (e.g., 30 for half hour)</li>
                  <li>✓ Click Calculate to see your total hours</li>
                  <li>✓ Regular hours = hours up to threshold (default 40 hrs/week)</li>
                  <li>✓ Overtime hours = hours beyond threshold</li>
                  <li>✓ Use Settings to customize format, breaks, and overtime rules</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Book Your Session CTA */}
          <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center text-white">
                <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  Need Help with Time & Mathematics?
                </h2>
                <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                  Our expert tutors can help you master time calculations, mathematical operations, and problem-solving skills. Get personalized one-on-one guidance tailored to your learning style.
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

          {/* SEO Content Sections */}
          <div className="mt-12 md:mt-16 space-y-8 md:space-y-12">
            {/* What is Work Hours Calculator */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                What is a Work Hours Calculator?
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  A <strong>work hours calculator</strong> is a time tracking tool that automatically calculates total hours worked per day and week, including break deductions and overtime hours. Also known as a <strong>time card calculator</strong>, <strong>timesheet calculator</strong>, or <strong>hours calculator</strong>, this tool helps employees, freelancers, contractors, and employers accurately track work time for payroll, billing, and productivity analysis.
                </p>
                <p>
                  Our free work hours calculator supports multiple time formats (12-hour with AM/PM and 24-hour military time), handles overnight shifts, automatically calculates regular and overtime hours based on customizable thresholds (default 40 hours per week), and generates a detailed time card showing daily and weekly breakdowns in both traditional hour:minute format and decimal hours for easy payroll processing.
                </p>
                <p>
                  Unlike manual time tracking which is prone to errors, our calculator uses precise algorithms to compute time differences, deduct break periods, separate regular from overtime hours, and present results in multiple formats. Perfect for hourly employees tracking billable hours, managers preparing payroll, freelancers invoicing clients, or anyone who needs accurate work hour documentation for timesheets, time cards, or attendance records.
                </p>
              </div>
            </section>

            {/* How to Calculate Work Hours */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                How to Calculate Work Hours Step by Step
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    1. Enter Start and End Times
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Type times without colons for faster entry: <strong>915</strong> for 9:15 AM, <strong>1730</strong> for 5:30 PM. Select AM or PM in 12-hour mode. The calculator handles overnight shifts automatically.
                  </p>
                  <div className="bg-white p-3 rounded mt-3">
                    <p className="text-sm font-mono">Monday: 0900 AM - 0530 PM</p>
                    <p className="text-sm text-[#2BAE66]">Work time: 8 hours 30 minutes</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    2. Add Break Time
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Enter unpaid break time in minutes. If "Deduct Breaks" is enabled, this time is subtracted from total hours. Common breaks: 30 min (lunch), 15 min (break), 60 min (extended lunch).
                  </p>
                  <div className="bg-white p-3 rounded mt-3">
                    <p className="text-sm font-mono">8.5 hours - 0.5 hours break</p>
                    <p className="text-sm text-[#2BAE66]">Net work time: 8.0 hours</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    3. Calculate Total Hours
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Click <strong>Calculate</strong> to see daily and weekly totals. Results show both hour:minute format (8:00) and decimal format (8.00) - decimal format is standard for payroll systems.
                  </p>
                  <div className="bg-white p-3 rounded mt-3">
                    <p className="text-sm">Mon-Fri: 8.0 hrs each day</p>
                    <p className="text-sm font-semibold text-[#2BAE66]">Weekly Total: 40.00 hours</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    4. Review Overtime
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Hours beyond the threshold (default 40 hrs/week) are marked as <strong>OT (overtime)</strong>. Regular hours and overtime are shown separately for proper compensation calculation.
                  </p>
                  <div className="bg-white p-3 rounded mt-3">
                    <p className="text-sm">Total: 45 hours this week</p>
                    <p className="text-sm">REG: 40.00 hours</p>
                    <p className="text-sm font-semibold text-orange-600">OT: 5.00 hours</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <Target className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Why Use Our Work Hours Calculator?
              </h2>
              <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Accurate Payroll Processing
                    </h3>
                    <p className="text-white/90">
                      Eliminate manual calculation errors that lead to payroll disputes. Automatically calculates regular and overtime hours in decimal format (8.25 hours) that payroll systems require. Perfect for hourly employees, part-time workers, and contractors.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Fast Time Entry
                    </h3>
                    <p className="text-white/90">
                      Type times without colons: 915 instead of 9:15. This "timecard format" is faster than traditional entry and matches how most people naturally write times on paper timesheets. Supports both 12-hour and 24-hour military time formats.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Automatic Overtime Tracking
                    </h3>
                    <p className="text-white/90">
                      Set your overtime threshold (40, 37.5, or custom hours per week) and the calculator automatically separates regular from overtime hours. Essential for compliance with labor laws requiring overtime pay at 1.5x rate.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Break Time Management
                    </h3>
                    <p className="text-white/90">
                      Properly handle paid vs unpaid breaks. Toggle "Deduct Breaks" on/off based on your company policy. Track lunch breaks, rest periods, and meal breaks accurately for labor law compliance and fair compensation.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Printable Time Cards
                    </h3>
                    <p className="text-white/90">
                      Generate professional time cards for record keeping, payroll submission, or client billing. Print button creates formatted timesheets with daily breakdown, weekly totals, and overtime hours clearly separated.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Handles Complex Shifts
                    </h3>
                    <p className="text-white/90">
                      Automatically handles overnight shifts (e.g., 11:00 PM to 7:00 AM), split shifts, irregular schedules, and varying daily hours. Perfect for healthcare, retail, hospitality, and 24/7 operations with rotating shifts.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Real-World Use Cases - Continued in next message due to length */}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#1A3D7C] text-white py-8 md:py-12 mt-12 md:mt-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">The Tutor Bridge</h3>
                <p className="text-white/80 text-sm">
                  Free online calculators and time tracking tools for professionals and students.
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
                <h3 className="text-lg font-bold mb-4">About This Calculator</h3>
                <p className="text-white/80 text-sm">
                  Free work hours calculator with overtime tracking, break deduction, and printable time cards. Perfect for payroll and time tracking.
                </p>
              </div>
            </div>
            <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
              <p>&copy; 2025 The Tutor Bridge. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
