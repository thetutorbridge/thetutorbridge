'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calculator, Calendar, Clock, Timer, Target, CheckCircle, HelpCircle, Lightbulb, Home, BookOpen, ArrowRight, Play, Pause, RotateCcw, Share2, Bell, Gift, Plane, Heart, GraduationCap, Briefcase, PartyPopper, Sun, Moon, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';

interface TimeUntilResult {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  totalWeeks: number;
  totalMonths: number;
  isPast: boolean;
  targetDate: Date;
  fromDate: Date;
}

export default function TimeUntilCalculatorPage() {
  // From Date state (defaults to current date/time)
  const [fromMonth, setFromMonth] = useState<string>(String(new Date().getMonth() + 1));
  const [fromDay, setFromDay] = useState<string>(String(new Date().getDate()));
  const [fromYear, setFromYear] = useState<string>(String(new Date().getFullYear()));
  const [fromHour, setFromHour] = useState<string>(String(new Date().getHours()));
  const [fromMinute, setFromMinute] = useState<string>(String(new Date().getMinutes()));

  // To Date state
  const [toMonth, setToMonth] = useState<string>('12');
  const [toDay, setToDay] = useState<string>('25');
  const [toYear, setToYear] = useState<string>(String(new Date().getFullYear()));
  const [toHour, setToHour] = useState<string>('0');
  const [toMinute, setToMinute] = useState<string>('0');

  const [showResults, setShowResults] = useState(false);
  const [isLiveCountdown, setIsLiveCountdown] = useState(false);
  const [liveResult, setLiveResult] = useState<TimeUntilResult | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
    return Array.from({ length: 100 }, (_, i) => ({
      value: String(currentYear - 10 + i),
      label: String(currentYear - 10 + i),
    }));
  };

  const generateHours = () => {
    return Array.from({ length: 24 }, (_, i) => ({
      value: String(i),
      label: String(i).padStart(2, '0'),
    }));
  };

  const generateMinutes = () => {
    return Array.from({ length: 60 }, (_, i) => ({
      value: String(i),
      label: String(i).padStart(2, '0'),
    }));
  };

  const calculateTimeUntil = (useCurrentTime: boolean = false): TimeUntilResult | null => {
    let fromDate: Date;

    if (useCurrentTime) {
      fromDate = new Date();
    } else {
      fromDate = new Date(
        parseInt(fromYear),
        parseInt(fromMonth) - 1,
        parseInt(fromDay),
        parseInt(fromHour),
        parseInt(fromMinute),
        0
      );
    }

    const targetDate = new Date(
      parseInt(toYear),
      parseInt(toMonth) - 1,
      parseInt(toDay),
      parseInt(toHour),
      parseInt(toMinute),
      0
    );

    const isPast = targetDate < fromDate;
    const diffMs = Math.abs(targetDate.getTime() - fromDate.getTime());

    // Calculate total units
    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalWeeks = Math.floor(totalDays / 7);

    // Calculate breakdown
    let tempDate = new Date(isPast ? targetDate : fromDate);
    const endDate = new Date(isPast ? fromDate : targetDate);

    let years = endDate.getFullYear() - tempDate.getFullYear();
    let months = endDate.getMonth() - tempDate.getMonth();
    let days = endDate.getDate() - tempDate.getDate();

    // Adjust for negative days
    if (days < 0) {
      months--;
      const prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
      days += prevMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate weeks from remaining days
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;

    // Calculate hours, minutes, seconds from remaining time
    const remainingMs = diffMs % (24 * 60 * 60 * 1000);
    const hours = Math.floor(remainingMs / (60 * 60 * 1000));
    const minutes = Math.floor((remainingMs % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((remainingMs % (60 * 1000)) / 1000);

    // Calculate approximate total months
    const totalMonths = years * 12 + months;

    return {
      years,
      months,
      weeks,
      days: remainingDays,
      hours,
      minutes,
      seconds,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      totalWeeks,
      totalMonths,
      isPast,
      targetDate,
      fromDate,
    };
  };

  const handleCalculate = () => {
    setShowResults(true);
    setIsLiveCountdown(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleStartLiveCountdown = () => {
    setShowResults(true);
    setIsLiveCountdown(true);
  };

  const handleStopCountdown = () => {
    setIsLiveCountdown(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleClear = () => {
    const now = new Date();
    setFromMonth(String(now.getMonth() + 1));
    setFromDay(String(now.getDate()));
    setFromYear(String(now.getFullYear()));
    setFromHour(String(now.getHours()));
    setFromMinute(String(now.getMinutes()));
    setToMonth('12');
    setToDay('25');
    setToYear(String(now.getFullYear()));
    setToHour('0');
    setToMinute('0');
    setShowResults(false);
    setIsLiveCountdown(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleSetNow = () => {
    const now = new Date();
    setFromMonth(String(now.getMonth() + 1));
    setFromDay(String(now.getDate()));
    setFromYear(String(now.getFullYear()));
    setFromHour(String(now.getHours()));
    setFromMinute(String(now.getMinutes()));
  };

  // Preset events
  const presetEvents = [
    { name: 'Christmas', month: '12', day: '25', icon: Gift },
    { name: 'New Year', month: '1', day: '1', icon: PartyPopper },
    { name: "Valentine's Day", month: '2', day: '14', icon: Heart },
    { name: 'Halloween', month: '10', day: '31', icon: Moon },
    { name: 'Independence Day (US)', month: '7', day: '4', icon: Star },
    { name: 'Independence Day (India)', month: '8', day: '15', icon: Sun },
  ];

  const handlePresetEvent = (month: string, day: string) => {
    const now = new Date();
    let year = now.getFullYear();
    const eventDate = new Date(year, parseInt(month) - 1, parseInt(day));
    if (eventDate < now) {
      year++;
    }
    setToMonth(month);
    setToDay(day);
    setToYear(String(year));
    setToHour('0');
    setToMinute('0');
  };

  // Live countdown effect
  useEffect(() => {
    if (isLiveCountdown) {
      intervalRef.current = setInterval(() => {
        const result = calculateTimeUntil(true);
        setLiveResult(result);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLiveCountdown, toYear, toMonth, toDay, toHour, toMinute]);

  const results = showResults ? (isLiveCountdown ? liveResult : calculateTimeUntil(false)) : null;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
            <span className="text-gray-600">Time Until Calculator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Timer className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Time Until Calculator</h1>
            </div>
            <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
              Calculate the precise time remaining until any future date or event. Get countdown in years, months, weeks, days, hours, minutes, and seconds with live updates.
            </p>
          </div>
        </div>

        {/* Main Calculator Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Calculator Card */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-2 border-gray-200 mb-8">
            <div className="bg-[#1A3D7C] text-white p-4 rounded-lg mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-3" />
              <p className="text-lg">Set your dates and times to calculate the countdown</p>
            </div>

            {/* Quick Preset Events */}
            <div className="mb-6">
              <Label className="text-lg font-semibold text-gray-700 mb-3 block">
                Quick Presets (Upcoming Events)
              </Label>
              <div className="flex flex-wrap gap-2">
                {presetEvents.map((event, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handlePresetEvent(event.month, event.day)}
                    className="flex items-center gap-2 hover:bg-[#2BAE66] hover:text-white hover:border-[#2BAE66]"
                  >
                    <event.icon className="w-4 h-4" />
                    {event.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* From Date */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-lg font-semibold text-gray-700 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-[#1A3D7C]" />
                    From (Start Date & Time)
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSetNow}
                    className="text-[#1A3D7C] hover:bg-[#1A3D7C] hover:text-white"
                  >
                    Set to Now
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Month</Label>
                    <Select value={fromMonth} onValueChange={setFromMonth}>
                      <SelectTrigger className="h-12 bg-white">
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
                    <Select value={fromDay} onValueChange={setFromDay}>
                      <SelectTrigger className="h-12 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {generateDays(fromMonth, fromYear).map((day) => (
                          <SelectItem key={day.value} value={day.value}>
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Year</Label>
                    <Select value={fromYear} onValueChange={setFromYear}>
                      <SelectTrigger className="h-12 bg-white">
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
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Hour (24h)</Label>
                    <Select value={fromHour} onValueChange={setFromHour}>
                      <SelectTrigger className="h-12 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {generateHours().map((hour) => (
                          <SelectItem key={hour.value} value={hour.value}>
                            {hour.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Minute</Label>
                    <Select value={fromMinute} onValueChange={setFromMinute}>
                      <SelectTrigger className="h-12 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {generateMinutes().map((minute) => (
                          <SelectItem key={minute.value} value={minute.value}>
                            {minute.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* To Date */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <Label className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-[#2BAE66]" />
                  To (Target Date & Time)
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Month</Label>
                    <Select value={toMonth} onValueChange={setToMonth}>
                      <SelectTrigger className="h-12 bg-white">
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
                    <Select value={toDay} onValueChange={setToDay}>
                      <SelectTrigger className="h-12 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {generateDays(toMonth, toYear).map((day) => (
                          <SelectItem key={day.value} value={day.value}>
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Year</Label>
                    <Select value={toYear} onValueChange={setToYear}>
                      <SelectTrigger className="h-12 bg-white">
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
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Hour (24h)</Label>
                    <Select value={toHour} onValueChange={setToHour}>
                      <SelectTrigger className="h-12 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {generateHours().map((hour) => (
                          <SelectItem key={hour.value} value={hour.value}>
                            {hour.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Minute</Label>
                    <Select value={toMinute} onValueChange={setToMinute}>
                      <SelectTrigger className="h-12 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {generateMinutes().map((minute) => (
                          <SelectItem key={minute.value} value={minute.value}>
                            {minute.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button
                  onClick={handleCalculate}
                  className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white px-8 py-6 text-lg font-semibold rounded-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate
                </Button>
                <Button
                  onClick={isLiveCountdown ? handleStopCountdown : handleStartLiveCountdown}
                  variant="outline"
                  className={`px-8 py-6 text-lg font-semibold rounded-lg flex items-center gap-2 ${
                    isLiveCountdown
                      ? 'bg-red-100 border-red-500 text-red-600 hover:bg-red-200'
                      : 'border-[#2BAE66] text-[#2BAE66] hover:bg-[#2BAE66] hover:text-white'
                  }`}
                >
                  {isLiveCountdown ? (
                    <>
                      <Pause className="w-5 h-5" />
                      Stop Live
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Live Countdown
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="px-8 py-6 text-lg font-semibold rounded-lg border-gray-400 text-gray-600 hover:bg-gray-100 flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {showResults && results && (
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-2 border-[#2BAE66] mb-8">
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-lg mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Timer className="w-6 h-6" />
                  {results.isPast ? 'Time Since' : 'Time Until'}
                  {isLiveCountdown && (
                    <span className="ml-2 text-sm bg-white/20 px-2 py-1 rounded animate-pulse">
                      LIVE
                    </span>
                  )}
                </h2>
              </div>

              <div className="space-y-6">
                {/* Main Countdown Display */}
                <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-[#1A3D7C] mb-4 text-center">
                    {results.isPast ? 'Time Elapsed:' : 'Countdown:'}
                  </h3>

                  {/* Large Countdown Display */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
                    {[
                      { value: results.years, label: 'Years', symbol: 'Y' },
                      { value: results.months, label: 'Months', symbol: 'M' },
                      { value: results.weeks, label: 'Weeks', symbol: 'W' },
                      { value: results.days, label: 'Days', symbol: 'D' },
                      { value: results.hours, label: 'Hours', symbol: 'h' },
                      { value: results.minutes, label: 'Minutes', symbol: 'm' },
                      { value: results.seconds, label: 'Seconds', symbol: 's' },
                    ].map((unit, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-md text-center border-2 border-gray-100"
                      >
                        <div className="text-3xl md:text-4xl font-bold text-[#1A3D7C]">
                          {unit.value}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{unit.label}</div>
                        <div className="text-xs text-gray-400">({unit.symbol})</div>
                      </div>
                    ))}
                  </div>

                  {/* Mathematical Expression */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <p className="text-sm text-gray-600 mb-2">Mathematical Expression:</p>
                    <p className="font-mono text-lg text-gray-800">
                      <span className="text-[#1A3D7C] font-bold">t</span> =
                      {results.years > 0 && <span> {results.years}<sub>y</sub> +</span>}
                      {results.months > 0 && <span> {results.months}<sub>m</sub> +</span>}
                      {results.weeks > 0 && <span> {results.weeks}<sub>w</sub> +</span>}
                      <span> {results.days}<sub>d</sub> +</span>
                      <span> {results.hours}<sub>h</sub> +</span>
                      <span> {results.minutes}<sub>min</sub> +</span>
                      <span> {results.seconds}<sub>s</sub></span>
                    </p>
                  </div>
                </div>

                {/* Total Time in Different Units */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
                  <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">Total Time in Different Units:</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-600">Total Months</div>
                      <div className="text-2xl font-bold text-[#1A3D7C]">{formatNumber(results.totalMonths)}</div>
                      <div className="text-xs text-gray-400">T<sub>months</sub> = {results.totalMonths}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-600">Total Weeks</div>
                      <div className="text-2xl font-bold text-[#1A3D7C]">{formatNumber(results.totalWeeks)}</div>
                      <div className="text-xs text-gray-400">T<sub>weeks</sub> = {results.totalWeeks}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-600">Total Days</div>
                      <div className="text-2xl font-bold text-[#1A3D7C]">{formatNumber(results.totalDays)}</div>
                      <div className="text-xs text-gray-400">T<sub>days</sub> = {results.totalDays}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-600">Total Hours</div>
                      <div className="text-2xl font-bold text-[#1A3D7C]">{formatNumber(results.totalHours)}</div>
                      <div className="text-xs text-gray-400">T<sub>hours</sub> = {results.totalHours}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-600">Total Minutes</div>
                      <div className="text-2xl font-bold text-[#1A3D7C]">{formatNumber(results.totalMinutes)}</div>
                      <div className="text-xs text-gray-400">T<sub>min</sub> = {results.totalMinutes}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-600">Total Seconds</div>
                      <div className="text-2xl font-bold text-[#1A3D7C]">{formatNumber(results.totalSeconds)}</div>
                      <div className="text-xs text-gray-400">T<sub>sec</sub> = {results.totalSeconds}</div>
                    </div>
                  </div>
                </div>

                {/* Date Information */}
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-lg border-2 border-orange-200">
                  <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">Date Information:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">From:</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {formatDate(results.fromDate)}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">To:</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {formatDate(results.targetDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* What is Time Until Calculator Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">What is a Time Until Calculator?</h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p className="text-lg leading-relaxed">
                A <strong>Time Until Calculator</strong> (also known as a <strong>countdown calculator</strong> or <strong>date duration calculator</strong>) is a powerful tool that calculates the exact time remaining from one date to another. It provides precise measurements in multiple units including years, months, weeks, days, hours, minutes, and seconds.
              </p>
              <p className="text-lg leading-relaxed">
                The mathematical principle behind this calculator is based on computing the difference between two temporal points. Given a start time <strong>t<sub>1</sub></strong> and an end time <strong>t<sub>2</sub></strong>, the time until is calculated as:
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200 my-4">
                <p className="text-center text-xl font-mono">
                  <strong>Time Until</strong> = t<sub>2</sub> - t<sub>1</sub>
                </p>
                <p className="text-center mt-2 text-gray-600">
                  where t<sub>2</sub> &gt; t<sub>1</sub> for future events
                </p>
              </div>
              <p className="text-lg leading-relaxed">
                This calculator is invaluable for students planning exam dates, professionals tracking project deadlines, event planners counting down to special occasions, and anyone who needs to manage time effectively. Whether you're counting down to a birthday, wedding, vacation, or important milestone, this tool provides instant and accurate results.
              </p>
            </div>
          </div>

          {/* The Mathematics Behind Time Calculations */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border-2 border-indigo-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">The Mathematics Behind Time Calculations</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Time Difference Formula</h3>
                <p className="text-gray-700 mb-4">
                  The core calculation involves finding the absolute difference between two timestamps:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-center">
                  <p className="text-lg">
                    <strong>&#916;t</strong> = |t<sub>target</sub> - t<sub>start</sub>|
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    where &#916;t represents the time duration in milliseconds
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Unit Conversion Formulas</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-mono text-sm">
                      <strong>Total Seconds:</strong><br />
                      T<sub>sec</sub> = &#916;t &#247; 1000
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-mono text-sm">
                      <strong>Total Minutes:</strong><br />
                      T<sub>min</sub> = T<sub>sec</sub> &#247; 60
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-mono text-sm">
                      <strong>Total Hours:</strong><br />
                      T<sub>hours</sub> = T<sub>min</sub> &#247; 60
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-mono text-sm">
                      <strong>Total Days:</strong><br />
                      T<sub>days</sub> = T<sub>hours</sub> &#247; 24
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-mono text-sm">
                      <strong>Total Weeks:</strong><br />
                      T<sub>weeks</sub> = &#8970;T<sub>days</sub> &#247; 7&#8971;
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-mono text-sm">
                      <strong>Remaining Days:</strong><br />
                      D<sub>rem</sub> = T<sub>days</sub> mod 7
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Accounting for Calendar Variations</h3>
                <p className="text-gray-700 mb-4">
                  The calculator accurately handles various calendar complexities:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 flex-shrink-0 mt-1" />
                    <span><strong>Leap Years:</strong> Years divisible by 4, except century years not divisible by 400 (366 days)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 flex-shrink-0 mt-1" />
                    <span><strong>Variable Month Lengths:</strong> 28, 29, 30, or 31 days per month</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 flex-shrink-0 mt-1" />
                    <span><strong>Time Precision:</strong> Calculations accurate to the second level</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-xl border-2 border-blue-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">How to Use the Time Until Calculator</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-[#2BAE66] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Set the Start Date & Time</h3>
                  <p className="text-gray-700">Select the "From" date and time. Click "Set to Now" to use the current date and time, or manually select a different starting point.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#2BAE66] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Set the Target Date & Time</h3>
                  <p className="text-gray-700">Select the "To" date and time for your countdown. Use quick presets for popular events like Christmas, New Year, or manually enter any future date.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#2BAE66] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Calculate or Start Live Countdown</h3>
                  <p className="text-gray-700">Click "Calculate" for a one-time calculation, or "Live Countdown" to see the timer update in real-time every second.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#2BAE66] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">View Results</h3>
                  <p className="text-gray-700">See the countdown displayed in years, months, weeks, days, hours, minutes, and seconds. Also view total time in each individual unit.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Practical Examples Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Practical Examples</h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Example 1: Days Until Christmas</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
                    <ul className="text-gray-600 space-y-1">
                      <li>Start Date: October 31, 2025 (Halloween)</li>
                      <li>Target Date: December 25, 2025 (Christmas)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Solution:</strong></p>
                    <div className="bg-white p-3 rounded font-mono text-sm">
                      <p>&#916;t = Dec 25 - Oct 31</p>
                      <p>= <strong>55 days</strong></p>
                      <p>= 7 weeks + 6 days</p>
                      <p>= 1,320 hours</p>
                      <p>= 79,200 minutes</p>
                      <p>= 4,752,000 seconds</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Example 2: Time Until New Year</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
                    <ul className="text-gray-600 space-y-1">
                      <li>Start Date: December 1, 2025, 12:00 PM</li>
                      <li>Target Date: January 1, 2026, 12:00 AM</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Solution:</strong></p>
                    <div className="bg-white p-3 rounded font-mono text-sm">
                      <p>&#916;t = Jan 1, 00:00 - Dec 1, 12:00</p>
                      <p>= <strong>30 days, 12 hours</strong></p>
                      <p>= 4 weeks + 2 days + 12 hours</p>
                      <p>= 732 hours</p>
                      <p>= 43,920 minutes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Example 3: Project Deadline Countdown</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Scenario:</strong></p>
                    <p className="text-gray-600">A student needs to submit their thesis in exactly 6 months.</p>
                    <ul className="text-gray-600 space-y-1 mt-2">
                      <li>Start Date: June 15, 2025</li>
                      <li>Target Date: December 15, 2025</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Time Remaining:</strong></p>
                    <div className="bg-white p-3 rounded font-mono text-sm">
                      <p>= 6 months = 183 days</p>
                      <p>= 26 weeks + 1 day</p>
                      <p>= 4,392 hours</p>
                      <p>= 263,520 minutes</p>
                      <p>= 15,811,200 seconds</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Time Unit Conversion Table */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Time Unit Conversion Reference</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
                    <th className="border border-gray-300 px-4 py-3 text-left">Unit</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Equivalent</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Formula</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">1 Minute</td>
                    <td className="border border-gray-300 px-4 py-3">60 Seconds</td>
                    <td className="border border-gray-300 px-4 py-3 font-mono text-sm">1 min = 60 s</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">1 Hour</td>
                    <td className="border border-gray-300 px-4 py-3">60 Minutes / 3,600 Seconds</td>
                    <td className="border border-gray-300 px-4 py-3 font-mono text-sm">1 h = 60 min = 3,600 s</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">1 Day</td>
                    <td className="border border-gray-300 px-4 py-3">24 Hours / 1,440 Minutes</td>
                    <td className="border border-gray-300 px-4 py-3 font-mono text-sm">1 d = 24 h = 86,400 s</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">1 Week</td>
                    <td className="border border-gray-300 px-4 py-3">7 Days / 168 Hours</td>
                    <td className="border border-gray-300 px-4 py-3 font-mono text-sm">1 w = 7 d = 604,800 s</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">1 Month (avg)</td>
                    <td className="border border-gray-300 px-4 py-3">30.44 Days / 730.5 Hours</td>
                    <td className="border border-gray-300 px-4 py-3 font-mono text-sm">1 mo &#8776; 30.44 d</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">1 Year</td>
                    <td className="border border-gray-300 px-4 py-3">365.25 Days / 52.18 Weeks</td>
                    <td className="border border-gray-300 px-4 py-3 font-mono text-sm">1 y = 365.25 d = 31,557,600 s</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">1 Leap Year</td>
                    <td className="border border-gray-300 px-4 py-3">366 Days</td>
                    <td className="border border-gray-300 px-4 py-3 font-mono text-sm">1 leap y = 366 d = 31,622,400 s</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-[#1A3D7C] mb-8">
              Benefits of Using Our Time Until Calculator
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Live Countdown',
                  description: 'Watch the countdown update in real-time, second by second. Perfect for event displays and presentations.',
                  icon: Play,
                },
                {
                  title: 'Multiple Time Units',
                  description: 'View results in years, months, weeks, days, hours, minutes, and seconds simultaneously.',
                  icon: Clock,
                },
                {
                  title: 'Quick Presets',
                  description: 'Instantly set countdowns for popular holidays and events with one click.',
                  icon: Star,
                },
                {
                  title: 'Accurate Calculations',
                  description: 'Accounts for leap years, varying month lengths, and precise time down to seconds.',
                  icon: Target,
                },
                {
                  title: 'Fully Responsive',
                  description: 'Works perfectly on smartphones, tablets, and desktop computers for access anywhere.',
                  icon: Timer,
                },
                {
                  title: 'No Registration',
                  description: 'Completely free with no sign-up required. Your privacy is protected.',
                  icon: CheckCircle,
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

          {/* Use Cases Section */}
          <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white p-8 md:p-12 rounded-xl mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
              <Lightbulb className="w-8 h-8 mr-3" />
              Common Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: 'Event Countdowns',
                  description: 'Count down to birthdays, weddings, anniversaries, holidays, concerts, and special celebrations.',
                  icon: PartyPopper,
                },
                {
                  title: 'Project Deadlines',
                  description: 'Track time remaining for work projects, assignments, thesis submissions, and professional milestones.',
                  icon: Briefcase,
                },
                {
                  title: 'Travel Planning',
                  description: 'Count down to your next vacation, flight departure, or cruise departure date.',
                  icon: Plane,
                },
                {
                  title: 'Academic Schedules',
                  description: 'Track time until exams, semester ends, graduation day, or application deadlines.',
                  icon: GraduationCap,
                },
                {
                  title: 'Goal Tracking',
                  description: 'Set target dates for personal goals, fitness milestones, or habit-forming challenges.',
                  icon: Target,
                },
                {
                  title: 'Product Launches',
                  description: 'Display countdown timers for product releases, website launches, or marketing campaigns.',
                  icon: Bell,
                },
                {
                  title: 'Retirement Planning',
                  description: 'Calculate exactly how much time remains until your retirement date.',
                  icon: Sun,
                },
                {
                  title: 'Special Occasions',
                  description: 'Track time until Valentine\'s Day, Mother\'s Day, Father\'s Day, and other special moments.',
                  icon: Heart,
                },
              ].map((useCase, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border-2 border-white/30">
                  <div className="flex items-start">
                    <useCase.icon className="w-6 h-6 text-green-300 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                      <p className="text-blue-100">{useCase.description}</p>
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
                  mistake: 'Ignoring Time Zones',
                  correct: 'This calculator uses your local time zone. For international events, convert to your local time first.',
                },
                {
                  mistake: 'Forgetting Leap Years',
                  correct: 'Our calculator automatically accounts for leap years (366 days) when calculating time differences.',
                },
                {
                  mistake: 'Wrong Date Order',
                  correct: 'For "time until" calculations, ensure the target date is in the future. For "time since," put the past date as the start.',
                },
                {
                  mistake: 'Ignoring Time of Day',
                  correct: 'For precise countdowns, always set both the date AND time for accurate results.',
                },
                {
                  mistake: 'Manual Unit Conversion Errors',
                  correct: 'Use our calculator to avoid errors. Remember: 1 year &#8800; 365 days exactly (leap years vary).',
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <div className="flex-1">
                    <p className="font-semibold text-red-700 mb-1">
                      &#10060; {item.mistake}
                    </p>
                    <p className="text-gray-700">
                      &#10004; <strong>Correct:</strong> {item.correct}
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
                  question: 'How accurate is the time until calculator?',
                  answer: 'Our calculator is 100% accurate. It accounts for leap years, varying month lengths (28-31 days), and calculates down to the exact second. The calculations use JavaScript\'s built-in Date object which follows the Gregorian calendar system.',
                },
                {
                  question: 'Can I calculate time between past dates?',
                  answer: 'Yes! The calculator works for both future and past dates. If the target date is before the start date, it will show "Time Since" instead of "Time Until" and display the elapsed time.',
                },
                {
                  question: 'What is the live countdown feature?',
                  answer: 'The live countdown feature updates every second, showing you a real-time countdown to your target date. It automatically uses your current time as the starting point and refreshes the display continuously.',
                },
                {
                  question: 'How does the calculator handle leap years?',
                  answer: 'The calculator automatically accounts for leap years (years divisible by 4, except century years not divisible by 400). February has 29 days in leap years, and this is reflected in all calculations.',
                },
                {
                  question: 'Can I use this for different time zones?',
                  answer: 'The calculator uses your local browser time zone. For events in different time zones, you should first convert the target time to your local time zone before entering it.',
                },
                {
                  question: 'How is "months" calculated in the breakdown?',
                  answer: 'Months are calculated by counting complete calendar months between dates. Since months have varying lengths (28-31 days), we calculate the actual number of complete months that have passed, not a fixed 30-day approximation.',
                },
                {
                  question: 'What are the quick preset events?',
                  answer: 'Quick presets are popular holidays and events pre-configured for easy access. Clicking a preset automatically sets the target date to the next occurrence of that event from today.',
                },
                {
                  question: 'Can I share my countdown with others?',
                  answer: 'Currently, you can take a screenshot of your countdown results to share. We recommend using the one-time calculation for sharing static countdowns.',
                },
                {
                  question: 'Is my data stored or tracked?',
                  answer: 'No! All calculations happen in your browser (client-side). We do not store, track, or transmit any dates you enter. Your privacy is completely protected.',
                },
                {
                  question: 'Why would I need to know time in different units?',
                  answer: 'Different contexts require different units. Event planners might need weeks, project managers often work in days, medical professionals might need hours, and scientists may require seconds for precise measurements.',
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
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Tips for Using the Time Until Calculator</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Use Live Countdown for Events',
                  tip: 'Display the live countdown on a big screen at parties or events for an engaging countdown experience.',
                },
                {
                  title: 'Plan Milestones',
                  tip: 'Break down long-term goals by calculating time until intermediate milestones, not just the final deadline.',
                },
                {
                  title: 'Include Time, Not Just Date',
                  tip: 'For precise countdowns (like New Year), always set the exact target time (e.g., midnight) for accuracy.',
                },
                {
                  title: 'Use Multiple Unit Views',
                  tip: 'Sometimes seeing "52 weeks" is more meaningful than "1 year" for planning purposes.',
                },
                {
                  title: 'Check Regularly',
                  tip: 'For important deadlines, bookmark this page and check your countdown regularly to stay on track.',
                },
                {
                  title: 'Educational Use',
                  tip: 'Teachers can use this to help students understand time calculations, unit conversions, and calendar mathematics.',
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
              <Link href="/calculators/age-calculator" className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200 hover:border-[#2BAE66] transition-all hover:shadow-lg">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">Age Calculator</h3>
                <p className="text-gray-700 text-sm">Calculate exact age in years, months, days, hours, minutes, and seconds.</p>
              </Link>
              <Link href="/calculators/hours-calculator" className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200 hover:border-[#2BAE66] transition-all hover:shadow-lg">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">Hours Calculator</h3>
                <p className="text-gray-700 text-sm">Calculate hours between times or add/subtract hours from a time.</p>
              </Link>
              <Link href="/calculators/work-hours-calculator" className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200 hover:border-[#2BAE66] transition-all hover:shadow-lg">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">Work Hours Calculator</h3>
                <p className="text-gray-700 text-sm">Calculate work hours, overtime, and payroll with breaks.</p>
              </Link>
            </div>
          </div>

          {/* Book Your Session CTA */}
          <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16 rounded-2xl">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center text-white">
                <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  Need Help with Time & Date Calculations?
                </h2>
                <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                  Our expert tutors can help you master time calculations, understand calendar mathematics, and excel in problem-solving. Get personalized one-on-one guidance tailored to your learning style.
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
