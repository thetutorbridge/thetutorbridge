'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Clock } from 'lucide-react';

interface CalculationResult {
  hours: number;
  minutes: number;
  seconds: number;
  decimalHours: number;
  decimalMinutes: number;
  decimalSeconds: number;
  formattedTime: string;
}

export default function TimeToDecimalCalculator() {
  const [hours, setHours] = useState('2');
  const [minutes, setMinutes] = useState('45');
  const [seconds, setSeconds] = useState('45');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateDecimal = () => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const s = parseInt(seconds) || 0;

    // Calculate decimal hours
    const decimalHours = h + (m / 60) + (s / 3600);

    // Calculate decimal minutes
    const decimalMinutes = (h * 60) + m + (s / 60);

    // Calculate decimal seconds
    const decimalSeconds = (h * 3600) + (m * 60) + s;

    // Format time
    const formattedTime = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

    setResult({
      hours: h,
      minutes: m,
      seconds: s,
      decimalHours,
      decimalMinutes,
      decimalSeconds,
      formattedTime,
    });
  };

  const handleClear = () => {
    setHours('');
    setMinutes('');
    setSeconds('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8 mt-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl mb-6 shadow-lg">
            <Clock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Time to Decimal Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Convert hours, minutes, and seconds to decimal format with step-by-step mathematical solutions
          </p>
        </div>

        {/* Calculator Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="bg-gradient-to-r from-red-700 to-orange-700 text-white text-center py-4 rounded-xl mb-6">
              <h2 className="text-2xl font-bold">Time to Decimal Calculator</h2>
            </div>

            {/* Time Input */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-4">
                {/* Hours */}
                <div className="flex flex-col items-center">
                  <Label htmlFor="hours" className="text-lg font-semibold mb-2">
                    hh
                  </Label>
                  <Input
                    id="hours"
                    type="number"
                    min="0"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-24 text-center text-2xl py-6"
                    placeholder="0"
                  />
                </div>

                <span className="text-3xl font-bold mt-8">:</span>

                {/* Minutes */}
                <div className="flex flex-col items-center">
                  <Label htmlFor="minutes" className="text-lg font-semibold mb-2">
                    mm
                  </Label>
                  <Input
                    id="minutes"
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    className="w-24 text-center text-2xl py-6"
                    placeholder="0"
                  />
                </div>

                <span className="text-3xl font-bold mt-8">:</span>

                {/* Seconds */}
                <div className="flex flex-col items-center">
                  <Label htmlFor="seconds" className="text-lg font-semibold mb-2">
                    ss
                  </Label>
                  <Input
                    id="seconds"
                    type="number"
                    min="0"
                    max="59"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    className="w-24 text-center text-2xl py-6"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                onClick={handleClear}
                variant="outline"
                className="flex-1 py-6 text-lg font-semibold border-2 hover:bg-gray-100"
              >
                Clear
              </Button>
              <Button
                onClick={calculateDecimal}
                className="flex-1 py-6 text-lg font-semibold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
              >
                Calculate
              </Button>
            </div>

            {/* Answer Section */}
            {result && (
              <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
                <h3 className="text-xl font-bold mb-6">Answer:</h3>

                <div className="space-y-4 text-center">
                  <div className="text-2xl">
                    = <span className="font-bold">{result.decimalHours.toFixed(4)}</span> hours
                  </div>

                  <div className="text-2xl">
                    = <span className="font-bold">{result.decimalMinutes.toFixed(2)}</span> minutes
                  </div>

                  <div className="text-2xl">
                    = <span className="font-bold">{result.decimalSeconds}</span> seconds
                  </div>

                  <div className="border-t-2 border-gray-300 pt-6 mt-6">
                    <p className="text-lg mb-2">For the entered time</p>
                    <p className="text-3xl font-bold text-red-700 mb-2">{result.formattedTime}</p>
                    <p className="text-lg italic text-gray-600">
                      {result.hours} {result.hours === 1 ? 'hour' : 'hours'}{' '}
                      {result.minutes} {result.minutes === 1 ? 'minute' : 'minutes'}{' '}
                      {result.seconds} {result.seconds === 1 ? 'second' : 'seconds'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Steps Section */}
            {result && (
              <div className="mt-8 space-y-8">
                {/* Steps to Calculate Hours */}
                <div className="border-2 border-gray-300 rounded-lg p-6 bg-white">
                  <h3 className="text-2xl font-bold mb-6 text-center">Steps to Calculate Hours</h3>

                  <div className="space-y-6">
                    {/* Formula */}
                    <div className="bg-blue-50 rounded-lg p-6">
                      <div className="text-xl flex items-center justify-center gap-2 flex-wrap">
                        <span>{result.hours} <i>hr</i> + {result.minutes} <i>min</i> × </span>
                        <div className="inline-flex flex-col items-center mx-1">
                          <span className="px-3 font-semibold">1 <i>hr</i></span>
                          <span className="w-full border-t-2 border-gray-900"></span>
                          <span className="px-3 font-semibold">60 <i>min</i></span>
                        </div>
                        <span> + {result.seconds} <i>s</i> × </span>
                        <div className="inline-flex flex-col items-center mx-1">
                          <span className="px-3 font-semibold">1 <i>hr</i></span>
                          <span className="w-full border-t-2 border-gray-900"></span>
                          <span className="px-3 font-semibold">3600 <i>s</i></span>
                        </div>
                      </div>
                    </div>

                    {/* Step 1 */}
                    <div className="bg-green-50 rounded-lg p-6">
                      <div className="text-xl text-center">
                        = {result.hours} <i>hr</i> + {(result.minutes / 60).toFixed(4)} <i>hr</i> + {(result.seconds / 3600).toFixed(4)} <i>hr</i>
                      </div>
                    </div>

                    {/* Final Answer */}
                    <div className="bg-yellow-50 rounded-lg p-6">
                      <div className="text-2xl text-center font-bold">
                        = {result.decimalHours.toFixed(4)} <i>hr</i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Steps to Calculate Minutes */}
                <div className="border-2 border-gray-300 rounded-lg p-6 bg-white">
                  <h3 className="text-2xl font-bold mb-6 text-center">Steps to Calculate Minutes</h3>

                  <div className="space-y-6">
                    {/* Formula */}
                    <div className="bg-blue-50 rounded-lg p-6">
                      <div className="text-xl flex items-center justify-center gap-2 flex-wrap">
                        <span>{result.hours} <i>hr</i> × </span>
                        <div className="inline-flex flex-col items-center mx-1">
                          <span className="px-3 font-semibold">60 <i>min</i></span>
                          <span className="w-full border-t-2 border-gray-900"></span>
                          <span className="px-3 font-semibold">1 <i>hr</i></span>
                        </div>
                        <span> + {result.minutes} <i>min</i> + {result.seconds} <i>s</i> × </span>
                        <div className="inline-flex flex-col items-center mx-1">
                          <span className="px-3 font-semibold">1 <i>min</i></span>
                          <span className="w-full border-t-2 border-gray-900"></span>
                          <span className="px-3 font-semibold">60 <i>s</i></span>
                        </div>
                      </div>
                    </div>

                    {/* Step 1 */}
                    <div className="bg-green-50 rounded-lg p-6">
                      <div className="text-xl text-center">
                        = {result.hours * 60} <i>min</i> + {result.minutes} <i>min</i> + {(result.seconds / 60).toFixed(2)} <i>min</i>
                      </div>
                    </div>

                    {/* Final Answer */}
                    <div className="bg-yellow-50 rounded-lg p-6">
                      <div className="text-2xl text-center font-bold">
                        = {result.decimalMinutes.toFixed(2)} <i>min</i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Steps to Calculate Seconds */}
                <div className="border-2 border-gray-300 rounded-lg p-6 bg-white">
                  <h3 className="text-2xl font-bold mb-6 text-center">Steps to Calculate Seconds</h3>

                  <div className="space-y-6">
                    {/* Formula */}
                    <div className="bg-blue-50 rounded-lg p-6">
                      <div className="text-xl flex items-center justify-center gap-2 flex-wrap">
                        <span>{result.hours} <i>hr</i> × </span>
                        <div className="inline-flex flex-col items-center mx-1">
                          <span className="px-3 font-semibold">3600 <i>s</i></span>
                          <span className="w-full border-t-2 border-gray-900"></span>
                          <span className="px-3 font-semibold">1 <i>hr</i></span>
                        </div>
                        <span> + {result.minutes} <i>min</i> × </span>
                        <div className="inline-flex flex-col items-center mx-1">
                          <span className="px-3 font-semibold">60 <i>s</i></span>
                          <span className="w-full border-t-2 border-gray-900"></span>
                          <span className="px-3 font-semibold">1 <i>min</i></span>
                        </div>
                        <span> + {result.seconds} <i>s</i></span>
                      </div>
                    </div>

                    {/* Step 1 */}
                    <div className="bg-green-50 rounded-lg p-6">
                      <div className="text-xl text-center">
                        = {result.hours * 3600} <i>s</i> + {result.minutes * 60} <i>s</i> + {result.seconds} <i>s</i>
                      </div>
                    </div>

                    {/* Final Answer */}
                    <div className="bg-yellow-50 rounded-lg p-6">
                      <div className="text-2xl text-center font-bold">
                        = {result.decimalSeconds} <i>s</i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="max-w-4xl mx-auto space-y-8 mb-12">
          {/* What is Time to Decimal Conversion */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Time to Decimal Conversion?</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Time to decimal conversion is the process of transforming time expressed in hours, minutes, and seconds (HH:MM:SS format) into a decimal representation. This conversion is essential in many professional contexts, particularly in payroll management, project tracking, billing systems, and time-based calculations where mathematical operations need to be performed on time values.
              </p>
              <p>
                In the standard time format, an hour is divided into 60 minutes, and each minute is divided into 60 seconds. However, for many calculations—especially in business and accounting—it's more practical to express time as a decimal number. For example, 2 hours and 30 minutes is more easily multiplied by an hourly wage when expressed as 2.5 hours rather than 2:30.
              </p>
              <p>
                Decimal time representation allows for straightforward arithmetic operations. You can easily add, subtract, multiply, and divide time values without worrying about carrying over minutes to hours or seconds to minutes. This simplification makes decimal time ideal for calculating billable hours, determining project costs, computing average times, and processing payroll.
              </p>
              <p>
                The conversion process involves understanding the relationships between time units: 1 hour = 60 minutes = 3600 seconds. To convert to decimal hours, you express minutes as fractions of an hour (divide by 60) and seconds as fractions of an hour (divide by 3600), then add all components together. Our calculator automates this process and shows you the complete mathematical steps.
              </p>
            </div>
          </section>

          {/* How to Convert Time to Decimal */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Convert Time to Decimal</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Converting time to decimal format involves a systematic approach based on the relationships between hours, minutes, and seconds. Here's how to perform each type of conversion:
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Converting to Decimal Hours</h3>
              <p>
                To convert a time value to decimal hours, use this formula:
              </p>
              <div className="bg-gray-100 p-6 rounded-lg my-4">
                <p className="text-xl font-mono text-center">
                  Decimal Hours = Hours + (Minutes ÷ 60) + (Seconds ÷ 3600)
                </p>
              </div>
              <p>
                <strong>Example:</strong> Convert 2 hours, 45 minutes, 45 seconds to decimal hours:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hours component: 2 hours = 2.0000</li>
                <li>Minutes component: 45 ÷ 60 = 0.7500 hours</li>
                <li>Seconds component: 45 ÷ 3600 = 0.0125 hours</li>
                <li>Total: 2.0000 + 0.7500 + 0.0125 = 2.7625 decimal hours</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Converting to Decimal Minutes</h3>
              <p>
                To convert time to decimal minutes, use this formula:
              </p>
              <div className="bg-gray-100 p-6 rounded-lg my-4">
                <p className="text-xl font-mono text-center">
                  Decimal Minutes = (Hours × 60) + Minutes + (Seconds ÷ 60)
                </p>
              </div>
              <p>
                <strong>Example:</strong> Convert 2 hours, 45 minutes, 45 seconds to decimal minutes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hours to minutes: 2 × 60 = 120 minutes</li>
                <li>Minutes component: 45 minutes</li>
                <li>Seconds to minutes: 45 ÷ 60 = 0.75 minutes</li>
                <li>Total: 120 + 45 + 0.75 = 165.75 decimal minutes</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Converting to Decimal Seconds</h3>
              <p>
                To convert time to decimal seconds (total seconds), use this formula:
              </p>
              <div className="bg-gray-100 p-6 rounded-lg my-4">
                <p className="text-xl font-mono text-center">
                  Decimal Seconds = (Hours × 3600) + (Minutes × 60) + Seconds
                </p>
              </div>
              <p>
                <strong>Example:</strong> Convert 2 hours, 45 minutes, 45 seconds to decimal seconds:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hours to seconds: 2 × 3600 = 7200 seconds</li>
                <li>Minutes to seconds: 45 × 60 = 2700 seconds</li>
                <li>Seconds component: 45 seconds</li>
                <li>Total: 7200 + 2700 + 45 = 9945 decimal seconds</li>
              </ul>

              <p className="mt-6">
                Understanding these conversion formulas helps you verify calculations, work without a calculator when needed, and better understand how time units relate to each other in decimal format.
              </p>
            </div>
          </section>

          {/* Practical Applications */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Practical Applications of Time to Decimal Conversion</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Time to decimal conversion is used extensively across various industries and situations. Here are the most common practical applications:
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Payroll and Human Resources</h3>
              <p>
                Payroll systems rely heavily on decimal time conversion:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Timesheet Processing:</strong> Employees clock in at 8:15 AM and out at 5:45 PM. The time worked (9 hours 30 minutes) converts to 9.5 decimal hours for easy wage calculation.
                </li>
                <li>
                  <strong>Overtime Calculations:</strong> If an employee works 8 hours 45 minutes (8.75 hours) and regular time is 8 hours, overtime is simply 8.75 - 8.00 = 0.75 hours (45 minutes).
                </li>
                <li>
                  <strong>Wage Computation:</strong> An employee earning $25/hour who works 7 hours 36 minutes (7.6 hours) earns 7.6 × $25 = $190.
                </li>
                <li>
                  <strong>Time-off Tracking:</strong> Vacation, sick leave, and PTO are easier to track and calculate in decimal format.
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Billing and Invoicing</h3>
              <p>
                Professional services use decimal hours for client billing:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Legal Services:</strong> Attorneys bill in 6-minute increments (0.1 hours). A task taking 18 minutes = 0.3 hours × hourly rate.
                </li>
                <li>
                  <strong>Consulting:</strong> Consultants track project time in decimal hours for accurate invoicing and profitability analysis.
                </li>
                <li>
                  <strong>Freelance Work:</strong> Freelancers convert tracked time to decimal format for client invoices and project budgeting.
                </li>
                <li>
                  <strong>Contract Work:</strong> Independent contractors use decimal time to bill clients based on hourly or daily rates.
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Project Management</h3>
              <p>
                Project managers use decimal time for planning and tracking:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Time Estimation:</strong> Estimating task duration in decimal hours (e.g., 2.5 hours instead of 2:30) simplifies scheduling.
                </li>
                <li>
                  <strong>Resource Allocation:</strong> Calculating total project hours across team members for budget planning.
                </li>
                <li>
                  <strong>Progress Tracking:</strong> Comparing estimated vs. actual time spent on tasks using decimal values.
                </li>
                <li>
                  <strong>Productivity Analysis:</strong> Averaging task completion times across multiple iterations.
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Scientific and Engineering Calculations</h3>
              <p>
                Technical fields require decimal time for precision:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Experiment Duration:</strong> Recording and analyzing experiment times in decimal format for statistical analysis.
                </li>
                <li>
                  <strong>Manufacturing:</strong> Calculating cycle times, production rates, and efficiency metrics.
                </li>
                <li>
                  <strong>Data Logging:</strong> Converting timestamp data to decimal format for mathematical modeling.
                </li>
                <li>
                  <strong>Process Optimization:</strong> Analyzing time-based performance metrics in decimal form.
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Education and Training</h3>
              <p>
                Educational institutions use decimal time for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Credit Hours:</strong> Converting classroom time to academic credit hours.
                </li>
                <li>
                  <strong>Study Time Tracking:</strong> Students monitoring study hours for effective time management.
                </li>
                <li>
                  <strong>Course Planning:</strong> Calculating total instructional time for curriculum development.
                </li>
                <li>
                  <strong>Professional Development:</strong> Tracking continuing education hours for certification requirements.
                </li>
              </ul>

              <p className="mt-6">
                In all these applications, decimal time simplifies calculations, reduces errors, and provides a standardized format for time-based computations across different systems and platforms.
              </p>
            </div>
          </section>

          {/* Common Time Conversions */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Time to Decimal Conversions</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Here's a quick reference table for frequently used time to decimal hour conversions:
              </p>

              <div className="overflow-x-auto mt-6">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-red-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">Minutes</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">Decimal Hours</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">Common Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">6 minutes</td>
                      <td className="border border-gray-300 px-4 py-2">0.1 hours</td>
                      <td className="border border-gray-300 px-4 py-2">Legal billing increment</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">15 minutes</td>
                      <td className="border border-gray-300 px-4 py-2">0.25 hours</td>
                      <td className="border border-gray-300 px-4 py-2">Quarter hour</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">30 minutes</td>
                      <td className="border border-gray-300 px-4 py-2">0.5 hours</td>
                      <td className="border border-gray-300 px-4 py-2">Half hour</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">45 minutes</td>
                      <td className="border border-gray-300 px-4 py-2">0.75 hours</td>
                      <td className="border border-gray-300 px-4 py-2">Three quarters hour</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">1 hour</td>
                      <td className="border border-gray-300 px-4 py-2">1.0 hours</td>
                      <td className="border border-gray-300 px-4 py-2">Full hour</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">1 hour 30 min</td>
                      <td className="border border-gray-300 px-4 py-2">1.5 hours</td>
                      <td className="border border-gray-300 px-4 py-2">Standard meeting length</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">2 hours</td>
                      <td className="border border-gray-300 px-4 py-2">2.0 hours</td>
                      <td className="border border-gray-300 px-4 py-2">Extended session</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">8 hours</td>
                      <td className="border border-gray-300 px-4 py-2">8.0 hours</td>
                      <td className="border border-gray-300 px-4 py-2">Standard workday</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">8 hours 30 min</td>
                      <td className="border border-gray-300 px-4 py-2">8.5 hours</td>
                      <td className="border border-gray-300 px-4 py-2">Workday with 30-min lunch</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Minute-to-Decimal Quick Reference</h3>
              <p>
                For quick mental conversions, memorize these common minute values:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>10 minutes = 0.167 hours (approximately 1/6 hour)</li>
                <li>12 minutes = 0.2 hours (exactly 1/5 hour)</li>
                <li>15 minutes = 0.25 hours (exactly 1/4 hour)</li>
                <li>20 minutes = 0.333 hours (approximately 1/3 hour)</li>
                <li>30 minutes = 0.5 hours (exactly 1/2 hour)</li>
                <li>36 minutes = 0.6 hours (exactly 3/5 hour)</li>
                <li>45 minutes = 0.75 hours (exactly 3/4 hour)</li>
              </ul>

              <p className="mt-6">
                Understanding these common conversions helps you quickly estimate decimal time values without a calculator and verify that automated calculations are correct.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-red-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Why convert time to decimal format?</h3>
                <p className="text-gray-700">
                  Decimal time format simplifies mathematical operations on time values. You can easily multiply, divide, add, and subtract without worrying about carrying over minutes and seconds. This is especially useful for payroll calculations, billing, and project time tracking where you need to multiply hours by rates or add up multiple time entries.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How do I convert 30 minutes to decimal hours?</h3>
                <p className="text-gray-700">
                  To convert 30 minutes to decimal hours, divide 30 by 60: 30 ÷ 60 = 0.5 hours. This is because there are 60 minutes in an hour, so 30 minutes is half an hour (0.5). Similarly, 15 minutes = 0.25 hours, 45 minutes = 0.75 hours, and so on.
                </p>
              </div>

              <div className="border-l-4 border-red-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What is 8 hours and 15 minutes in decimal?</h3>
                <p className="text-gray-700">
                  8 hours and 15 minutes in decimal format is 8.25 hours. The hours stay the same (8), and the minutes are converted by dividing by 60: 15 ÷ 60 = 0.25. Add them together: 8 + 0.25 = 8.25 decimal hours. This is a common calculation for payroll when an employee works from 8:00 AM to 4:15 PM with no breaks.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How many decimal hours is a 40-hour work week?</h3>
                <p className="text-gray-700">
                  A standard 40-hour work week is exactly 40.0 decimal hours. If there are no overtime hours or partial hours worked, the conversion is straightforward because 40 hours contains no minutes or seconds to convert. However, if an employee works 40 hours and 30 minutes, that would be 40.5 decimal hours.
                </p>
              </div>

              <div className="border-l-4 border-red-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Can I convert decimal hours back to hours and minutes?</h3>
                <p className="text-gray-700">
                  Yes! To convert decimal hours back to hours and minutes: take the whole number as hours, then multiply the decimal part by 60 to get minutes. For example, 2.75 hours = 2 hours + (0.75 × 60) minutes = 2 hours 45 minutes. For 3.333 hours = 3 hours + (0.333 × 60) minutes = 3 hours 20 minutes (approximately).
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How do payroll systems use decimal time?</h3>
                <p className="text-gray-700">
                  Payroll systems convert all time entries to decimal hours, then multiply by the hourly wage. For example, if an employee clocks in at 8:00 AM and out at 5:30 PM (with a 1-hour lunch break), they worked 8 hours 30 minutes = 8.5 decimal hours. At $20/hour, their gross pay is 8.5 × $20 = $170. This automated conversion ensures accurate wage calculations.
                </p>
              </div>

              <div className="border-l-4 border-red-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What rounding should I use for decimal hours?</h3>
                <p className="text-gray-700">
                  The appropriate rounding depends on your use case. For payroll and billing, most systems round to 2 decimal places (0.01 hours = 0.6 minutes). Some legal and consulting firms use 0.1 hour increments (6-minute intervals). Always check your organization's rounding policy. When in doubt, maintain more precision during calculations and only round the final result.
                </p>
              </div>
            </div>
          </section>

          {/* Book Your Session CTA */}
          <section className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl shadow-2xl p-8 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Help with Time Calculations or Math?
            </h2>
            <p className="text-xl mb-8 text-red-50">
              Our expert tutors can help you master time conversions, decimal calculations, and all mathematical concepts with personalized one-on-one sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/tutoring/free-consultation"
                className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition-colors shadow-lg hover:shadow-xl inline-block"
              >
                Book a Free Demo Class
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-red-600 transition-colors inline-block"
              >
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
