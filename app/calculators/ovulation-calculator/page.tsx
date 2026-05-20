'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, Home, Calendar, Heart, Baby, Info, Clock, Target, Sparkles, AlertCircle, ChevronRight, Star } from 'lucide-react';
import { Navigation } from '@/components/navigation';

interface CycleDay {
  date: Date;
  dayNumber: number;
  phase: 'menstruation' | 'follicular' | 'ovulation' | 'luteal';
  fertility: 'low' | 'medium' | 'high' | 'peak' | 'none';
  isOvulationDay: boolean;
  isPeriodDay: boolean;
}

export default function OvulationCalculatorPage() {
  const [lastPeriodDate, setLastPeriodDate] = useState<string>('');
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodLength, setPeriodLength] = useState<number>(5);
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (!lastPeriodDate) return null;

    const lmpDate = new Date(lastPeriodDate);

    // Ovulation typically occurs 14 days before the next period
    const lutealPhase = 14;
    const ovulationDay = cycleLength - lutealPhase;

    // Calculate ovulation date
    const ovulationDate = new Date(lmpDate);
    ovulationDate.setDate(ovulationDate.getDate() + ovulationDay);

    // Fertile window: 5 days before ovulation + ovulation day + 1 day after
    const fertileWindowStart = new Date(ovulationDate);
    fertileWindowStart.setDate(fertileWindowStart.getDate() - 5);

    const fertileWindowEnd = new Date(ovulationDate);
    fertileWindowEnd.setDate(fertileWindowEnd.getDate() + 1);

    // Peak fertility: 2 days before ovulation + ovulation day
    const peakFertilityStart = new Date(ovulationDate);
    peakFertilityStart.setDate(peakFertilityStart.getDate() - 2);

    // Next period date
    const nextPeriodDate = new Date(lmpDate);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);

    // Expected due date if conception occurs (280 days from LMP)
    const expectedDueDate = new Date(lmpDate);
    expectedDueDate.setDate(expectedDueDate.getDate() + 280);

    // Generate calendar for current and next month
    const calendarDays: CycleDay[] = [];
    for (let i = 0; i < cycleLength + 7; i++) {
      const date = new Date(lmpDate);
      date.setDate(date.getDate() + i);

      let phase: CycleDay['phase'] = 'luteal';
      let fertility: CycleDay['fertility'] = 'low';
      let isOvulationDay = false;
      let isPeriodDay = false;

      const dayNumber = i + 1;

      // Period days
      if (dayNumber <= periodLength) {
        phase = 'menstruation';
        fertility = 'none';
        isPeriodDay = true;
      }
      // Follicular phase (after period, before fertile window)
      else if (dayNumber < ovulationDay - 5) {
        phase = 'follicular';
        fertility = 'low';
      }
      // Fertile window
      else if (dayNumber >= ovulationDay - 5 && dayNumber <= ovulationDay + 1) {
        phase = dayNumber === ovulationDay ? 'ovulation' : 'follicular';

        if (dayNumber === ovulationDay) {
          fertility = 'peak';
          isOvulationDay = true;
        } else if (dayNumber >= ovulationDay - 2) {
          fertility = 'high';
        } else {
          fertility = 'medium';
        }
      }
      // Luteal phase
      else {
        phase = 'luteal';
        fertility = 'low';
      }

      calendarDays.push({
        date,
        dayNumber,
        phase,
        fertility,
        isOvulationDay,
        isPeriodDay
      });
    }

    // Calculate next 3 cycles
    const upcomingCycles = [];
    for (let cycle = 0; cycle < 3; cycle++) {
      const cycleStartDate = new Date(lmpDate);
      cycleStartDate.setDate(cycleStartDate.getDate() + (cycleLength * cycle));

      const cycleOvulationDate = new Date(cycleStartDate);
      cycleOvulationDate.setDate(cycleOvulationDate.getDate() + ovulationDay);

      const cycleFertileStart = new Date(cycleOvulationDate);
      cycleFertileStart.setDate(cycleFertileStart.getDate() - 5);

      const cycleFertileEnd = new Date(cycleOvulationDate);
      cycleFertileEnd.setDate(cycleFertileEnd.getDate() + 1);

      upcomingCycles.push({
        cycleNumber: cycle + 1,
        periodStart: cycleStartDate,
        ovulationDate: cycleOvulationDate,
        fertileWindowStart: cycleFertileStart,
        fertileWindowEnd: cycleFertileEnd
      });
    }

    return {
      ovulationDate,
      fertileWindowStart,
      fertileWindowEnd,
      peakFertilityStart,
      nextPeriodDate,
      expectedDueDate,
      ovulationDay,
      calendarDays,
      upcomingCycles
    };
  }, [lastPeriodDate, cycleLength, periodLength]);

  const handleCalculate = () => {
    if (lastPeriodDate) {
      setShowResults(true);
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatShortDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getFertilityColor = (fertility: CycleDay['fertility']): string => {
    switch (fertility) {
      case 'peak': return 'bg-pink-500 text-white';
      case 'high': return 'bg-pink-400 text-white';
      case 'medium': return 'bg-pink-200 text-pink-800';
      case 'low': return 'bg-gray-100 text-gray-600';
      case 'none': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // JSON-LD Schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "When do I ovulate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ovulation typically occurs 14 days before your next period. For a 28-day cycle, this is usually around day 14. For longer or shorter cycles, ovulation occurs 14 days before your expected period date."
        }
      },
      {
        "@type": "Question",
        "name": "What is the fertile window?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The fertile window is the 6-day period ending on ovulation day when pregnancy is possible. This includes 5 days before ovulation (sperm can survive up to 5 days) and the ovulation day itself (egg survives 12-24 hours)."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate is an ovulation calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ovulation calculators provide estimates based on average cycle patterns. For more accuracy, combine with ovulation predictor kits (OPKs), basal body temperature tracking, or monitoring cervical mucus changes."
        }
      },
      {
        "@type": "Question",
        "name": "What are signs of ovulation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Common ovulation signs include: clear, stretchy cervical mucus (like egg whites), slight rise in basal body temperature, mild pelvic pain or cramping (mittelschmerz), increased sex drive, and breast tenderness."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get pregnant outside my fertile window?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pregnancy is highly unlikely outside the fertile window. The egg only survives 12-24 hours after ovulation, and sperm can survive up to 5 days in the reproductive tract. Conception typically requires intercourse within this 6-day fertile window."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Navigation />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-pink-600 hover:text-pink-800 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/calculators" className="text-pink-600 hover:text-pink-800">
              Calculators
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 font-medium">Ovulation Calculator</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 text-white py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-12 h-12 text-pink-200 mr-3" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Ovulation Calculator
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-pink-100 max-w-2xl mx-auto">
            Find your most fertile days and maximize your chances of getting pregnant.
            Track your cycle and predict ovulation with our free fertility calculator.
          </p>
        </div>
      </section>

      <main className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-pink-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Calendar className="w-6 h-6 text-pink-500 mr-2" />
                Calculate Your Fertile Days
              </h2>

              <div className="space-y-6">
                {/* Last Period Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Day of Your Last Period
                  </label>
                  <input
                    type="date"
                    value={lastPeriodDate}
                    onChange={(e) => setLastPeriodDate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all text-lg"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Select the first day of your most recent menstrual period
                  </p>
                </div>

                {/* Cycle Length */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Average Cycle Length: <span className="text-pink-600">{cycleLength} days</span>
                  </label>
                  <input
                    type="range"
                    min="21"
                    max="40"
                    value={cycleLength}
                    onChange={(e) => setCycleLength(parseInt(e.target.value))}
                    className="w-full h-3 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>21 days</span>
                    <span>28 days (average)</span>
                    <span>40 days</span>
                  </div>
                </div>

                {/* Period Length */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Period Length: <span className="text-pink-600">{periodLength} days</span>
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    value={periodLength}
                    onChange={(e) => setPeriodLength(parseInt(e.target.value))}
                    className="w-full h-3 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>2 days</span>
                    <span>5 days (average)</span>
                    <span>10 days</span>
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  disabled={!lastPeriodDate}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  <Sparkles className="w-5 h-5 inline mr-2" />
                  Calculate My Fertile Days
                </button>
              </div>

              {/* Results */}
              {showResults && results && (
                <div className="mt-8 space-y-6">
                  {/* Key Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-pink-500 to-rose-500 text-white p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <Target className="w-5 h-5 mr-2" />
                        <span className="text-pink-100 text-sm font-medium">Ovulation Day</span>
                      </div>
                      <p className="text-2xl font-bold">{formatDate(results.ovulationDate)}</p>
                      <p className="text-pink-100 text-sm mt-1">Day {results.ovulationDay} of your cycle</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <Heart className="w-5 h-5 mr-2" />
                        <span className="text-purple-100 text-sm font-medium">Fertile Window</span>
                      </div>
                      <p className="text-2xl font-bold">
                        {formatShortDate(results.fertileWindowStart)} - {formatShortDate(results.fertileWindowEnd)}
                      </p>
                      <p className="text-purple-100 text-sm mt-1">7 days of fertility</p>
                    </div>

                    <div className="bg-gradient-to-br from-rose-400 to-pink-400 text-white p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <Star className="w-5 h-5 mr-2" />
                        <span className="text-rose-100 text-sm font-medium">Peak Fertility</span>
                      </div>
                      <p className="text-2xl font-bold">
                        {formatShortDate(results.peakFertilityStart)} - {formatShortDate(results.ovulationDate)}
                      </p>
                      <p className="text-rose-100 text-sm mt-1">Best days to conceive</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 mr-2" />
                        <span className="text-blue-100 text-sm font-medium">Next Period</span>
                      </div>
                      <p className="text-2xl font-bold">{formatDate(results.nextPeriodDate)}</p>
                      <p className="text-blue-100 text-sm mt-1">Expected start date</p>
                    </div>
                  </div>

                  {/* If Conception Occurs */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-5 rounded-xl">
                    <div className="flex items-start">
                      <Baby className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-green-800">If You Conceive This Cycle</h3>
                        <p className="text-green-700 mt-1">
                          Your estimated due date would be <span className="font-bold">{formatDate(results.expectedDueDate)}</span>
                        </p>
                        <Link
                          href="/calculators/pregnancy-calculator"
                          className="inline-flex items-center text-green-600 hover:text-green-800 text-sm mt-2 font-medium"
                        >
                          Use our Pregnancy Calculator for detailed tracking
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Fertility Calendar */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Your Fertility Calendar</h3>
                    <div className="bg-gray-50 rounded-xl p-4 overflow-x-auto">
                      <div className="grid grid-cols-7 gap-1 min-w-[500px]">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                          <div key={day} className="text-center text-xs font-semibold text-gray-500 p-2">
                            {day}
                          </div>
                        ))}

                        {/* Add empty cells for alignment */}
                        {results.calendarDays.length > 0 &&
                          Array(results.calendarDays[0].date.getDay()).fill(null).map((_, i) => (
                            <div key={`empty-${i}`} className="p-2"></div>
                          ))
                        }

                        {results.calendarDays.slice(0, 35).map((day, index) => (
                          <div
                            key={index}
                            className={`p-2 rounded-lg text-center relative ${getFertilityColor(day.fertility)} ${
                              day.isOvulationDay ? 'ring-2 ring-pink-600 ring-offset-1' : ''
                            }`}
                          >
                            <div className="text-xs font-medium">
                              {day.date.getDate()}
                            </div>
                            <div className="text-[10px] opacity-75">
                              Day {day.dayNumber}
                            </div>
                            {day.isOvulationDay && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-[8px]">O</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Legend */}
                      <div className="flex flex-wrap gap-3 mt-4 text-xs">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-red-100 rounded mr-1"></div>
                          <span>Period</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-pink-200 rounded mr-1"></div>
                          <span>Fertile</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-pink-400 rounded mr-1"></div>
                          <span>High Fertility</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-pink-500 rounded mr-1"></div>
                          <span>Peak (Ovulation)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-gray-100 rounded mr-1"></div>
                          <span>Low Fertility</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Cycles */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Upcoming Cycles (3 Months)</h3>
                    <div className="space-y-3">
                      {results.upcomingCycles.map((cycle) => (
                        <div key={cycle.cycleNumber} className="bg-white border border-gray-200 rounded-xl p-4">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className="font-semibold text-gray-700">Cycle {cycle.cycleNumber}</span>
                            <div className="flex flex-wrap gap-3 text-sm">
                              <span className="text-red-600">
                                Period: {formatShortDate(cycle.periodStart)}
                              </span>
                              <span className="text-pink-600 font-medium">
                                Fertile: {formatShortDate(cycle.fertileWindowStart)} - {formatShortDate(cycle.fertileWindowEnd)}
                              </span>
                              <span className="text-purple-600">
                                Ovulation: {formatShortDate(cycle.ovulationDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Educational Content */}
            <div className="mt-8 space-y-6">
              {/* How Ovulation Works */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">How Ovulation Works</h2>
                <div className="prose prose-pink max-w-none text-gray-600">
                  <p>
                    Ovulation is the release of a mature egg from your ovary. It typically occurs once per menstrual cycle,
                    about <strong>14 days before your next period</strong>. Understanding your ovulation cycle is key to maximizing
                    your chances of conceiving.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">The Four Phases of Your Cycle</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-700">1. Menstruation (Days 1-5)</h4>
                      <p className="text-sm text-red-600">Your period. The uterine lining sheds.</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-700">2. Follicular Phase (Days 1-13)</h4>
                      <p className="text-sm text-yellow-600">Eggs mature in follicles. Estrogen rises.</p>
                    </div>
                    <div className="bg-pink-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-pink-700">3. Ovulation (Day 14)</h4>
                      <p className="text-sm text-pink-600">Egg is released. Peak fertility!</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-700">4. Luteal Phase (Days 15-28)</h4>
                      <p className="text-sm text-purple-600">Progesterone rises. Implantation may occur.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ovulation Signs */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Signs You&apos;re Ovulating</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start p-4 bg-pink-50 rounded-lg">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                      <span className="text-pink-600 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Cervical Mucus Changes</h3>
                      <p className="text-sm text-gray-600">Becomes clear, stretchy, and slippery like raw egg whites.</p>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-rose-50 rounded-lg">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                      <span className="text-rose-600 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Basal Body Temperature Rise</h3>
                      <p className="text-sm text-gray-600">Slight increase (0.5-1 degree) after ovulation.</p>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-purple-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                      <span className="text-purple-600 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Mittelschmerz (Ovulation Pain)</h3>
                      <p className="text-sm text-gray-600">Mild cramping or twinge on one side of lower abdomen.</p>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-indigo-50 rounded-lg">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                      <span className="text-indigo-600 font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Increased Libido</h3>
                      <p className="text-sm text-gray-600">Natural increase in desire around ovulation time.</p>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-fuchsia-50 rounded-lg">
                    <div className="w-10 h-10 bg-fuchsia-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                      <span className="text-fuchsia-600 font-bold">5</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Positive OPK Test</h3>
                      <p className="text-sm text-gray-600">Ovulation predictor kit detects LH surge 24-36 hours before ovulation.</p>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-cyan-50 rounded-lg">
                    <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                      <span className="text-cyan-600 font-bold">6</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Breast Tenderness</h3>
                      <p className="text-sm text-gray-600">Hormonal changes may cause sensitivity.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Conception */}
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow-lg p-6 sm:p-8 border border-pink-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Tips for Maximizing Conception Chances</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 font-bold text-sm">1</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Time Intercourse Right</h3>
                      <p className="text-gray-600">Have sex every 1-2 days during your fertile window, especially the 2-3 days before ovulation.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 font-bold text-sm">2</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Track Multiple Signs</h3>
                      <p className="text-gray-600">Combine this calculator with OPKs, BBT tracking, and cervical mucus monitoring for best results.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 font-bold text-sm">3</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Maintain a Healthy Lifestyle</h3>
                      <p className="text-gray-600">Eat well, exercise moderately, limit alcohol, quit smoking, and manage stress.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 font-bold text-sm">4</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Take Prenatal Vitamins</h3>
                      <p className="text-gray-600">Start folic acid at least 1 month before trying to conceive to prevent neural tube defects.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <details className="group border border-gray-200 rounded-lg">
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-semibold text-gray-800">
                      When do I ovulate if my cycle is irregular?
                      <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-4 pb-4 text-gray-600">
                      With irregular cycles, ovulation timing varies. Use ovulation predictor kits (OPKs) to detect your LH surge,
                      track basal body temperature, and monitor cervical mucus. These methods can help identify ovulation regardless
                      of cycle length.
                    </div>
                  </details>

                  <details className="group border border-gray-200 rounded-lg">
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-semibold text-gray-800">
                      How long does the egg survive after ovulation?
                      <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-4 pb-4 text-gray-600">
                      The egg survives only 12-24 hours after ovulation. This is why timing is crucial - sperm need to be waiting
                      in the fallopian tubes when the egg is released. Sperm can survive up to 5 days, so having sex before
                      ovulation is often more effective.
                    </div>
                  </details>

                  <details className="group border border-gray-200 rounded-lg">
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-semibold text-gray-800">
                      Can I ovulate more than once per cycle?
                      <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-4 pb-4 text-gray-600">
                      Multiple ovulation can occur, but only within a 24-hour window. This is how fraternal twins are conceived.
                      You cannot ovulate again later in the same cycle once the luteal phase has begun.
                    </div>
                  </details>

                  <details className="group border border-gray-200 rounded-lg">
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-semibold text-gray-800">
                      What affects ovulation timing?
                      <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-4 pb-4 text-gray-600">
                      Stress, illness, travel, weight changes, excessive exercise, and hormonal imbalances can all affect when
                      you ovulate. Some medications, including hormonal birth control, can also impact ovulation.
                    </div>
                  </details>

                  <details className="group border border-gray-200 rounded-lg">
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-semibold text-gray-800">
                      How accurate is this ovulation calculator?
                      <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-4 pb-4 text-gray-600">
                      This calculator provides estimates based on average cycle patterns (assuming a 14-day luteal phase).
                      For the most accurate predictions, combine this with ovulation predictor kits, basal body temperature
                      tracking, and cervical mucus observation. Consult a healthcare provider if you have concerns.
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Info className="w-5 h-5 text-pink-500 mr-2" />
                Quick Facts
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-600">
                    <strong>Fertile Window:</strong> 6 days (5 days before + ovulation day)
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-600">
                    <strong>Egg Lifespan:</strong> 12-24 hours after ovulation
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-600">
                    <strong>Sperm Lifespan:</strong> Up to 5 days in reproductive tract
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-600">
                    <strong>Best Time:</strong> 1-2 days before ovulation
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-600">
                    <strong>Average Cycle:</strong> 28 days (21-40 normal)
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-700">
                    This calculator provides estimates only. Consult a healthcare provider for fertility concerns or if trying
                    to conceive for more than 12 months (or 6 months if over 35).
                  </p>
                </div>
              </div>
            </div>

            {/* Related Calculators */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Related Calculators</h3>
              <div className="space-y-3">
                <Link href="/calculators/pregnancy-calculator" className="block p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors">
                  <div className="flex items-center">
                    <Baby className="w-8 h-8 text-pink-500 mr-3" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Pregnancy Calculator</h4>
                      <p className="text-sm text-gray-600">Calculate due date & track milestones</p>
                    </div>
                  </div>
                </Link>
                <Link href="/calculators/bmi-calculator" className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="flex items-center">
                    <Calculator className="w-8 h-8 text-green-500 mr-3" />
                    <div>
                      <h4 className="font-semibold text-gray-800">BMI Calculator</h4>
                      <p className="text-sm text-gray-600">Check your body mass index</p>
                    </div>
                  </div>
                </Link>
                <Link href="/calculators/age-calculator" className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <div className="flex items-center">
                    <Clock className="w-8 h-8 text-purple-500 mr-3" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Age Calculator</h4>
                      <p className="text-sm text-gray-600">Calculate exact age</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
