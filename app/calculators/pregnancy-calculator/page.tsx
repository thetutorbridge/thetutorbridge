'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, Baby, Calendar, Heart, Clock, Home, HelpCircle, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const milestones = [
  { week: 4, title: 'Positive Test', description: 'Pregnancy can be detected' },
  { week: 8, title: 'Heartbeat', description: 'Baby\'s heartbeat visible on ultrasound' },
  { week: 12, title: 'End of First Trimester', description: 'Risk of miscarriage decreases significantly' },
  { week: 16, title: 'Gender Reveal', description: 'Sex may be determined via ultrasound' },
  { week: 20, title: 'Halfway Point', description: 'Anatomy scan, feel baby movements' },
  { week: 24, title: 'Viability', description: 'Baby could survive if born early' },
  { week: 28, title: 'Third Trimester', description: 'Final growth phase begins' },
  { week: 32, title: 'Baby Showers', description: 'Most organs fully developed' },
  { week: 37, title: 'Full Term', description: 'Baby is considered full term' },
  { week: 40, title: 'Due Date', description: 'Estimated delivery date' },
];

export default function PregnancyCalculatorPage() {
  const [calculationMethod, setCalculationMethod] = useState<string>('lmp');
  const [lmpDate, setLmpDate] = useState<string>('');
  const [conceptionDate, setConceptionDate] = useState<string>('');
  const [ultrasoundDate, setUltrasoundDate] = useState<string>('');
  const [ultrasoundWeeks, setUltrasoundWeeks] = useState<string>('8');
  const [ultrasoundDays, setUltrasoundDays] = useState<string>('0');
  const [cycleLength, setCycleLength] = useState<string>('28');

  const results = useMemo(() => {
    let dueDate: Date | null = null;
    let conceptionDateCalc: Date | null = null;

    if (calculationMethod === 'lmp' && lmpDate) {
      const lmp = new Date(lmpDate);
      const cycleAdj = (parseInt(cycleLength) - 28);
      // Naegele's Rule: Add 280 days (40 weeks) to LMP, adjust for cycle length
      dueDate = new Date(lmp);
      dueDate.setDate(dueDate.getDate() + 280 + cycleAdj);
      // Conception is approximately 14 days after LMP (adjusted for cycle)
      conceptionDateCalc = new Date(lmp);
      conceptionDateCalc.setDate(conceptionDateCalc.getDate() + 14 + cycleAdj);
    } else if (calculationMethod === 'conception' && conceptionDate) {
      const conception = new Date(conceptionDate);
      conceptionDateCalc = conception;
      // Due date is 266 days (38 weeks) from conception
      dueDate = new Date(conception);
      dueDate.setDate(dueDate.getDate() + 266);
    } else if (calculationMethod === 'ultrasound' && ultrasoundDate) {
      const usDate = new Date(ultrasoundDate);
      const weeksAtUS = parseInt(ultrasoundWeeks) || 0;
      const daysAtUS = parseInt(ultrasoundDays) || 0;
      const totalDaysAtUS = (weeksAtUS * 7) + daysAtUS;
      // Calculate LMP from ultrasound
      const calculatedLMP = new Date(usDate);
      calculatedLMP.setDate(calculatedLMP.getDate() - totalDaysAtUS);
      // Due date is 280 days from calculated LMP
      dueDate = new Date(calculatedLMP);
      dueDate.setDate(dueDate.getDate() + 280);
      // Conception date
      conceptionDateCalc = new Date(calculatedLMP);
      conceptionDateCalc.setDate(conceptionDateCalc.getDate() + 14);
    }

    if (!dueDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    // Calculate current gestational age
    let gestationalStartDate: Date;
    if (calculationMethod === 'conception' && conceptionDateCalc) {
      gestationalStartDate = new Date(conceptionDateCalc);
      gestationalStartDate.setDate(gestationalStartDate.getDate() - 14);
    } else if (calculationMethod === 'lmp' && lmpDate) {
      gestationalStartDate = new Date(lmpDate);
    } else {
      gestationalStartDate = new Date(dueDate);
      gestationalStartDate.setDate(gestationalStartDate.getDate() - 280);
    }

    const daysSinceLMP = Math.floor((today.getTime() - gestationalStartDate.getTime()) / (1000 * 60 * 60 * 24));
    const currentWeeks = Math.floor(daysSinceLMP / 7);
    const currentDays = daysSinceLMP % 7;

    const daysUntilDue = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const weeksUntilDue = Math.floor(daysUntilDue / 7);

    // Trimester
    let trimester = 1;
    if (currentWeeks >= 28) trimester = 3;
    else if (currentWeeks >= 13) trimester = 2;

    // Calculate key dates
    const firstTrimesterEnd = new Date(gestationalStartDate);
    firstTrimesterEnd.setDate(firstTrimesterEnd.getDate() + 12 * 7);

    const secondTrimesterEnd = new Date(gestationalStartDate);
    secondTrimesterEnd.setDate(secondTrimesterEnd.getDate() + 27 * 7);

    // Safe delivery window (37-42 weeks)
    const safeDeliveryStart = new Date(gestationalStartDate);
    safeDeliveryStart.setDate(safeDeliveryStart.getDate() + 37 * 7);

    const safeDeliveryEnd = new Date(gestationalStartDate);
    safeDeliveryEnd.setDate(safeDeliveryEnd.getDate() + 42 * 7);

    // Progress percentage
    const totalDays = 280;
    const progressPercent = Math.min(100, Math.max(0, (daysSinceLMP / totalDays) * 100));

    return {
      dueDate,
      conceptionDate: conceptionDateCalc,
      currentWeeks: Math.max(0, currentWeeks),
      currentDays: Math.max(0, currentDays),
      daysUntilDue: Math.max(0, daysUntilDue),
      weeksUntilDue: Math.max(0, weeksUntilDue),
      trimester,
      firstTrimesterEnd,
      secondTrimesterEnd,
      safeDeliveryStart,
      safeDeliveryEnd,
      progressPercent,
      gestationalStartDate,
    };
  }, [calculationMethod, lmpDate, conceptionDate, ultrasoundDate, ultrasoundWeeks, ultrasoundDays, cycleLength]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatShortDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How is my due date calculated?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Due date is typically calculated using Naegele\'s Rule: add 280 days (40 weeks) to the first day of your last menstrual period (LMP). This assumes a 28-day cycle with ovulation on day 14. Adjustments are made for different cycle lengths.'
                }
              },
              {
                '@type': 'Question',
                name: 'How accurate is a due date calculator?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Only about 5% of babies are born on their exact due date. Most babies are born within 2 weeks before or after. Due dates are estimates, and early ultrasound dating (before 12 weeks) is generally most accurate.'
                }
              },
              {
                '@type': 'Question',
                name: 'What are the three trimesters of pregnancy?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'First trimester: Weeks 1-12 (major organ development). Second trimester: Weeks 13-27 (rapid growth, movement felt). Third trimester: Weeks 28-40 (final development, preparation for birth).'
                }
              },
              {
                '@type': 'Question',
                name: 'When is a baby considered full term?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A baby is considered full term at 39-40 weeks. Early term is 37-38 weeks, late term is 41 weeks, and post-term is 42+ weeks. Most healthy deliveries occur between 37-42 weeks.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is gestational age vs fetal age?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Gestational age is counted from the first day of your last menstrual period (LMP) and is used medically. Fetal age (or conceptional age) is counted from actual conception, which is typically 2 weeks less than gestational age.'
                }
              }
            ]
          })
        }}
      />
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        {/* Breadcrumb */}
        <div className="bg-white/80 backdrop-blur-sm py-3 px-4 shadow-sm">
          <div className="max-w-6xl mx-auto">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-pink-600 hover:text-pink-800 flex items-center">
                <Home className="w-4 h-4 mr-1" />Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/calculators" className="text-pink-600 hover:text-pink-800">Calculators</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 font-medium">Pregnancy Calculator</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Baby className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Pregnancy Calculator</h1>
            </div>
            <p className="text-xl text-pink-100 max-w-3xl mx-auto">
              Calculate your due date, track your pregnancy week by week, and discover important milestones on your journey to motherhood.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-2 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-pink-600" />
                  Calculate Your Due Date
                </h2>

                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">Calculation Method</Label>
                    <Select value={calculationMethod} onValueChange={setCalculationMethod}>
                      <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lmp">Last Menstrual Period (LMP)</SelectItem>
                        <SelectItem value="conception">Conception Date</SelectItem>
                        <SelectItem value="ultrasound">Ultrasound Date</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {calculationMethod === 'lmp' && (
                    <>
                      <div>
                        <Label className="text-base font-semibold text-gray-700 mb-2 block">First Day of Last Period</Label>
                        <Input type="date" value={lmpDate} onChange={(e) => setLmpDate(e.target.value)} className="h-12" />
                      </div>
                      <div>
                        <Label className="text-base font-semibold text-gray-700 mb-2 block">Average Cycle Length (days)</Label>
                        <Input type="number" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} className="h-12" min="20" max="45" />
                        <p className="text-sm text-gray-500 mt-1">Average is 28 days. Enter your typical cycle length.</p>
                      </div>
                    </>
                  )}

                  {calculationMethod === 'conception' && (
                    <div>
                      <Label className="text-base font-semibold text-gray-700 mb-2 block">Date of Conception</Label>
                      <Input type="date" value={conceptionDate} onChange={(e) => setConceptionDate(e.target.value)} className="h-12" />
                      <p className="text-sm text-gray-500 mt-1">The date you believe conception occurred (ovulation/intercourse date)</p>
                    </div>
                  )}

                  {calculationMethod === 'ultrasound' && (
                    <>
                      <div>
                        <Label className="text-base font-semibold text-gray-700 mb-2 block">Ultrasound Date</Label>
                        <Input type="date" value={ultrasoundDate} onChange={(e) => setUltrasoundDate(e.target.value)} className="h-12" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-base font-semibold text-gray-700 mb-2 block">Weeks at Ultrasound</Label>
                          <Input type="number" value={ultrasoundWeeks} onChange={(e) => setUltrasoundWeeks(e.target.value)} className="h-12" min="4" max="42" />
                        </div>
                        <div>
                          <Label className="text-base font-semibold text-gray-700 mb-2 block">Days</Label>
                          <Input type="number" value={ultrasoundDays} onChange={(e) => setUltrasoundDays(e.target.value)} className="h-12" min="0" max="6" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Milestones Timeline */}
              {results && (
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Pregnancy Milestones</h3>
                  <div className="space-y-3">
                    {milestones.map((milestone) => {
                      const milestoneDate = new Date(results.gestationalStartDate);
                      milestoneDate.setDate(milestoneDate.getDate() + milestone.week * 7);
                      const isPast = results.currentWeeks >= milestone.week;
                      const isCurrent = results.currentWeeks === milestone.week;

                      return (
                        <div key={milestone.week} className={`flex items-center p-3 rounded-lg ${isCurrent ? 'bg-pink-100 border-2 border-pink-400' : isPast ? 'bg-green-50' : 'bg-gray-50'}`}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${isPast ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                            {isPast ? <CheckCircle className="w-5 h-5" /> : milestone.week}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800">Week {milestone.week}: {milestone.title}</div>
                            <div className="text-sm text-gray-600">{milestone.description}</div>
                          </div>
                          <div className="text-sm text-gray-500">{formatShortDate(milestoneDate)}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-pink-500 to-purple-500 text-white p-6 md:p-8 rounded-xl shadow-xl sticky top-4">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Heart className="w-6 h-6 mr-2" />
                  Your Pregnancy
                </h2>

                {results ? (
                  <div className="space-y-4">
                    <div className="bg-white/20 backdrop-blur-sm p-5 rounded-lg border-2 border-yellow-300">
                      <p className="text-sm text-pink-200 mb-1">Estimated Due Date</p>
                      <p className="text-2xl font-bold text-yellow-300">{formatShortDate(results.dueDate)}</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <p className="text-sm text-pink-200 mb-1">Current Progress</p>
                      <p className="text-3xl font-bold">{results.currentWeeks}w {results.currentDays}d</p>
                      <div className="mt-2 bg-white/20 rounded-full h-3 overflow-hidden">
                        <div className="bg-yellow-400 h-full transition-all" style={{ width: `${results.progressPercent}%` }} />
                      </div>
                      <p className="text-xs text-pink-200 mt-1">{results.progressPercent.toFixed(0)}% complete</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <p className="text-sm text-pink-200 mb-1">Trimester</p>
                      <p className="text-2xl font-semibold">{results.trimester === 1 ? 'First' : results.trimester === 2 ? 'Second' : 'Third'} Trimester</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <p className="text-sm text-pink-200 mb-1">Time Until Due Date</p>
                      <p className="text-xl font-semibold">{results.weeksUntilDue} weeks, {results.daysUntilDue % 7} days</p>
                    </div>

                    {results.conceptionDate && (
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                        <p className="text-sm text-pink-200 mb-1">Estimated Conception</p>
                        <p className="text-lg font-semibold">{formatShortDate(results.conceptionDate)}</p>
                      </div>
                    )}

                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <p className="text-sm text-pink-200 mb-1">Safe Delivery Window</p>
                      <p className="text-sm font-semibold">{formatShortDate(results.safeDeliveryStart)} - {formatShortDate(results.safeDeliveryEnd)}</p>
                      <p className="text-xs text-pink-200">(37-42 weeks)</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Baby className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-pink-200">Enter your information to calculate your due date</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {[
                { question: 'How is my due date calculated?', answer: 'Due date is calculated using Naegele\'s Rule: add 280 days (40 weeks) to the first day of your last menstrual period. This assumes a 28-day cycle with ovulation on day 14. Adjustments are made for different cycle lengths.' },
                { question: 'How accurate is the due date?', answer: 'Only about 5% of babies are born on their exact due date. Most babies are born within 2 weeks before or after the estimated date. Early ultrasound dating (before 12 weeks) is generally most accurate.' },
                { question: 'What are the three trimesters?', answer: 'First trimester (weeks 1-12): Major organ development. Second trimester (weeks 13-27): Rapid growth, movement felt. Third trimester (weeks 28-40): Final development, preparation for birth.' },
                { question: 'When is a baby full term?', answer: 'A baby is full term at 39-40 weeks. Early term is 37-38 weeks, late term is 41 weeks, and post-term is 42+ weeks. Most healthy deliveries occur between 37-42 weeks.' },
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-start">
                    <HelpCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-pink-600" />{faq.question}
                  </h3>
                  <p className="text-gray-700 ml-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
