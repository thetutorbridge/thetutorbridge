'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Calculator, Award, BookOpen, GraduationCap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export function MarksPercentageCalculator() {
  const [marksObtained, setMarksObtained] = useState('432');
  const [totalMarks, setTotalMarks] = useState('500');
  const [percentage, setPercentage] = useState<number | null>(null);
  const [grade, setGrade] = useState('');
  const [division, setDivision] = useState('');

  const calculatePercentage = () => {
    const obtained = parseFloat(marksObtained);
    const total = parseFloat(totalMarks);

    if (isNaN(obtained) || isNaN(total) || total === 0) {
      alert('Please enter valid marks');
      return;
    }

    if (obtained > total) {
      alert('Marks obtained cannot be greater than total marks');
      return;
    }

    if (obtained < 0 || total < 0) {
      alert('Marks cannot be negative');
      return;
    }

    // Calculate percentage: (Marks Obtained / Total Marks) × 100
    const percent = (obtained / total) * 100;
    setPercentage(percent);

    // Determine grade based on percentage
    let calculatedGrade = '';
    let calculatedDivision = '';

    if (percent >= 90) {
      calculatedGrade = 'A+';
      calculatedDivision = 'First Division with Distinction';
    } else if (percent >= 80) {
      calculatedGrade = 'A';
      calculatedDivision = 'First Division';
    } else if (percent >= 70) {
      calculatedGrade = 'B+';
      calculatedDivision = 'First Division';
    } else if (percent >= 60) {
      calculatedGrade = 'B';
      calculatedDivision = 'Second Division';
    } else if (percent >= 50) {
      calculatedGrade = 'C';
      calculatedDivision = 'Second Division';
    } else if (percent >= 40) {
      calculatedGrade = 'D';
      calculatedDivision = 'Third Division';
    } else if (percent >= 33) {
      calculatedGrade = 'E';
      calculatedDivision = 'Pass';
    } else {
      calculatedGrade = 'F';
      calculatedDivision = 'Fail';
    }

    setGrade(calculatedGrade);
    setDivision(calculatedDivision);
  };

  const handleReset = () => {
    setMarksObtained('432');
    setTotalMarks('500');
    setPercentage(null);
    setGrade('');
    setDivision('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      <main className="container mx-auto px-4 py-8 mt-16">
        {/* Back Button */}
        <Link
          href="/calculators"
          className="inline-flex items-center text-[#2BAE66] hover:text-[#1A3D7C] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Calculators
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-full flex items-center justify-center mr-4">
              <Calculator className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-bold text-[#1A3D7C]">Marks Percentage Calculator</h1>
          </div>
          <p className="text-lg text-gray-700">
            Calculate your exam percentage instantly from marks obtained and total marks. Get detailed grade classifications and division information.
          </p>
        </div>

        {/* Calculator Section */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-12 border-2 border-gray-200">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div>
              <h2 className="text-2xl font-semibold text-[#1A3D7C] mb-6">Enter Your Marks</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marks Obtained
                  </label>
                  <Input
                    type="number"
                    value={marksObtained}
                    onChange={(e) => setMarksObtained(e.target.value)}
                    placeholder="Enter marks obtained"
                    className="w-full text-lg"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Marks
                  </label>
                  <Input
                    type="number"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(e.target.value)}
                    placeholder="Enter total marks"
                    className="w-full text-lg"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={calculatePercentage}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white text-lg py-6"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate Percentage
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="px-6 py-6"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>

            {/* Result Section */}
            <div>
              <h2 className="text-2xl font-semibold text-[#1A3D7C] mb-6">Result</h2>

              {percentage !== null ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
                    <div className="text-sm text-gray-600 mb-2">Your Percentage</div>
                    <div className="text-4xl font-bold text-green-700">
                      {percentage.toFixed(2)}%
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-sm text-gray-600">Grade</div>
                    <div className="text-2xl font-bold text-blue-700">{grade}</div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="text-sm text-gray-600">Division</div>
                    <div className="text-xl font-semibold text-purple-700">{division}</div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Calculation:</div>
                    <div className="text-sm text-gray-600 font-mono">
                      Percentage = ({marksObtained} ÷ {totalMarks}) × 100
                    </div>
                    <div className="text-sm text-gray-600 font-mono mt-1">
                      Percentage = {percentage.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg border-2 border-dashed border-gray-300 text-center">
                  <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Enter your marks and click calculate to see your percentage</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="space-y-12">
          {/* What is Marks Percentage */}
          <section className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-600">
            <div className="flex items-center mb-6">
              <BookOpen className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-3xl font-bold text-[#1A3D7C]">What is Marks Percentage?</h2>
            </div>
            <div className="prose max-w-none text-gray-700">
              <p className="text-lg leading-relaxed mb-4">
                <strong>Marks percentage</strong> is a way to express your academic performance as a proportion of the total marks available. It shows how much you scored out of 100, making it easy to compare performance across different subjects or exams with different total marks.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                The percentage is calculated using the formula:
              </p>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200 my-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-800 mb-2">Marks Percentage Formula</div>
                  <div className="text-3xl font-bold text-green-700">
                    Percentage = <span className="text-blue-700">(Marks Obtained / Total Marks)</span> × <span className="text-purple-700">100</span>
                  </div>
                </div>
              </div>
              <p className="text-lg leading-relaxed">
                For example, if you scored 432 marks out of 500, your percentage would be (432 ÷ 500) × 100 = 86.4%. This means you achieved 86.4% of the total possible marks.
              </p>
            </div>
          </section>

          {/* How to Calculate Marks Percentage */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <GraduationCap className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-3xl font-bold text-[#1A3D7C]">How to Calculate Marks Percentage</h2>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-green-700 mb-4">Step-by-Step Calculation Process</h3>
                <ol className="space-y-4 text-gray-700">
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</span>
                    <div>
                      <strong>Identify Marks Obtained:</strong> This is the total marks you scored in the exam or subject.
                    </div>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</span>
                    <div>
                      <strong>Identify Total Marks:</strong> This is the maximum marks possible in the exam or subject.
                    </div>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</span>
                    <div>
                      <strong>Divide Obtained by Total:</strong> Divide your marks obtained by the total marks.
                    </div>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">4</span>
                    <div>
                      <strong>Multiply by 100:</strong> Multiply the result by 100 to get the percentage.
                    </div>
                  </li>
                </ol>
              </div>

              {/* Example 1 */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200">
                <h4 className="text-xl font-bold text-blue-800 mb-4">Example 1: Single Subject Percentage</h4>
                <div className="space-y-3 text-gray-800">
                  <p><strong>Problem:</strong> A student scored 85 marks out of 100 in Mathematics. Calculate the percentage.</p>
                  <div className="bg-white p-4 rounded-lg border border-blue-300">
                    <p className="font-semibold mb-2">Solution:</p>
                    <p>Marks Obtained = 85</p>
                    <p>Total Marks = 100</p>
                    <p className="mt-3 font-mono">Percentage = (85 ÷ 100) × 100</p>
                    <p className="font-mono">Percentage = 0.85 × 100</p>
                    <p className="mt-2 text-xl font-bold text-blue-700">Percentage = 85%</p>
                  </div>
                  <p className="text-sm italic">The student scored 85% in Mathematics.</p>
                </div>
              </div>

              {/* Example 2 */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
                <h4 className="text-xl font-bold text-green-800 mb-4">Example 2: Multiple Subjects Combined</h4>
                <div className="space-y-3 text-gray-800">
                  <p><strong>Problem:</strong> A student scored the following marks:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>English: 72/100</li>
                    <li>Mathematics: 88/100</li>
                    <li>Science: 76/100</li>
                    <li>Social Studies: 81/100</li>
                    <li>Hindi: 65/100</li>
                  </ul>
                  <p>Calculate the overall percentage.</p>
                  <div className="bg-white p-4 rounded-lg border border-green-300">
                    <p className="font-semibold mb-2">Solution:</p>
                    <p>Total Marks Obtained = 72 + 88 + 76 + 81 + 65 = 382</p>
                    <p>Total Marks Possible = 100 + 100 + 100 + 100 + 100 = 500</p>
                    <p className="mt-3 font-mono">Percentage = (382 ÷ 500) × 100</p>
                    <p className="font-mono">Percentage = 0.764 × 100</p>
                    <p className="mt-2 text-xl font-bold text-green-700">Percentage = 76.4%</p>
                  </div>
                  <p className="text-sm italic">The student's overall percentage is 76.4%, which falls in the First Division category.</p>
                </div>
              </div>

              {/* Example 3 */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
                <h4 className="text-xl font-bold text-purple-800 mb-4">Example 3: Subjects with Different Total Marks</h4>
                <div className="space-y-3 text-gray-800">
                  <p><strong>Problem:</strong> Calculate percentage when subjects have different maximum marks:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Theory (75 marks): Scored 63</li>
                    <li>Practical (25 marks): Scored 22</li>
                  </ul>
                  <div className="bg-white p-4 rounded-lg border border-purple-300">
                    <p className="font-semibold mb-2">Solution:</p>
                    <p>Total Marks Obtained = 63 + 22 = 85</p>
                    <p>Total Marks Possible = 75 + 25 = 100</p>
                    <p className="mt-3 font-mono">Percentage = (85 ÷ 100) × 100</p>
                    <p className="mt-2 text-xl font-bold text-purple-700">Percentage = 85%</p>
                  </div>
                </div>
              </div>

              {/* Example 4 */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg border-2 border-amber-200">
                <h4 className="text-xl font-bold text-amber-800 mb-4">Example 4: Decimal Marks</h4>
                <div className="space-y-3 text-gray-800">
                  <p><strong>Problem:</strong> A student scored 432.5 marks out of 500. Calculate the percentage.</p>
                  <div className="bg-white p-4 rounded-lg border border-amber-300">
                    <p className="font-semibold mb-2">Solution:</p>
                    <p>Marks Obtained = 432.5</p>
                    <p>Total Marks = 500</p>
                    <p className="mt-3 font-mono">Percentage = (432.5 ÷ 500) × 100</p>
                    <p className="font-mono">Percentage = 0.865 × 100</p>
                    <p className="mt-2 text-xl font-bold text-amber-700">Percentage = 86.5%</p>
                  </div>
                  <p className="text-sm italic">Many boards and universities now give decimal marks, especially after re-evaluation or grace marks.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Marks to Percentage Conversion Table */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-3xl font-bold text-[#1A3D7C]">Marks to Percentage Conversion Tables</h2>
            </div>

            {/* Table 1: Out of 100 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">Marks Out of 100</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2 border-gray-300">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
                      <th className="border border-gray-300 px-4 py-3 text-left">Marks Obtained</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Total Marks</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Percentage</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Grade</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Division</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { marks: 95, total: 100, percent: 95, grade: 'A+', division: 'First with Distinction' },
                      { marks: 90, total: 100, percent: 90, grade: 'A+', division: 'First with Distinction' },
                      { marks: 85, total: 100, percent: 85, grade: 'A', division: 'First Division' },
                      { marks: 80, total: 100, percent: 80, grade: 'A', division: 'First Division' },
                      { marks: 75, total: 100, percent: 75, grade: 'B+', division: 'First Division' },
                      { marks: 70, total: 100, percent: 70, grade: 'B+', division: 'First Division' },
                      { marks: 65, total: 100, percent: 65, grade: 'B', division: 'Second Division' },
                      { marks: 60, total: 100, percent: 60, grade: 'B', division: 'Second Division' },
                      { marks: 55, total: 100, percent: 55, grade: 'C', division: 'Second Division' },
                      { marks: 50, total: 100, percent: 50, grade: 'C', division: 'Second Division' },
                      { marks: 45, total: 100, percent: 45, grade: 'D', division: 'Third Division' },
                      { marks: 40, total: 100, percent: 40, grade: 'D', division: 'Third Division' },
                      { marks: 35, total: 100, percent: 35, grade: 'E', division: 'Pass' },
                      { marks: 33, total: 100, percent: 33, grade: 'E', division: 'Pass' },
                    ].map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="border border-gray-300 px-4 py-2">{row.marks}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.total}</td>
                        <td className="border border-gray-300 px-4 py-2 font-bold text-green-700">{row.percent}%</td>
                        <td className="border border-gray-300 px-4 py-2 font-semibold">{row.grade}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.division}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2: Out of 500 (Board Exam Pattern) */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">Marks Out of 500 (Board Exam Pattern)</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2 border-gray-300">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                      <th className="border border-gray-300 px-4 py-3 text-left">Marks Obtained</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Total Marks</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Percentage</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Grade</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Classification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { marks: 475, total: 500, percent: 95, grade: 'A+', classification: 'Outstanding' },
                      { marks: 450, total: 500, percent: 90, grade: 'A+', classification: 'Excellent' },
                      { marks: 425, total: 500, percent: 85, grade: 'A', classification: 'Very Good' },
                      { marks: 400, total: 500, percent: 80, grade: 'A', classification: 'Good' },
                      { marks: 375, total: 500, percent: 75, grade: 'B+', classification: 'Above Average' },
                      { marks: 350, total: 500, percent: 70, grade: 'B+', classification: 'Above Average' },
                      { marks: 325, total: 500, percent: 65, grade: 'B', classification: 'Average' },
                      { marks: 300, total: 500, percent: 60, grade: 'B', classification: 'Average' },
                      { marks: 275, total: 500, percent: 55, grade: 'C', classification: 'Below Average' },
                      { marks: 250, total: 500, percent: 50, grade: 'C', classification: 'Pass' },
                      { marks: 225, total: 500, percent: 45, grade: 'D', classification: 'Pass' },
                      { marks: 200, total: 500, percent: 40, grade: 'D', classification: 'Pass' },
                      { marks: 165, total: 500, percent: 33, grade: 'E', classification: 'Just Pass' },
                    ].map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="border border-gray-300 px-4 py-2">{row.marks}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.total}</td>
                        <td className="border border-gray-300 px-4 py-2 font-bold text-blue-700">{row.percent}%</td>
                        <td className="border border-gray-300 px-4 py-2 font-semibold">{row.grade}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.classification}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 3: Common Total Marks Patterns */}
            <div>
              <h3 className="text-2xl font-semibold text-green-700 mb-4">Quick Reference: Common Patterns</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2 border-gray-300">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-600 to-pink-700 text-white">
                      <th className="border border-gray-300 px-4 py-3 text-left">Total Marks</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">90% Marks</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">80% Marks</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">75% Marks</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">60% Marks</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">50% Marks</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">33% Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { total: 100, m90: 90, m80: 80, m75: 75, m60: 60, m50: 50, m33: 33 },
                      { total: 200, m90: 180, m80: 160, m75: 150, m60: 120, m50: 100, m33: 66 },
                      { total: 300, m90: 270, m80: 240, m75: 225, m60: 180, m50: 150, m33: 99 },
                      { total: 400, m90: 360, m80: 320, m75: 300, m60: 240, m50: 200, m33: 132 },
                      { total: 500, m90: 450, m80: 400, m75: 375, m60: 300, m50: 250, m33: 165 },
                      { total: 600, m90: 540, m80: 480, m75: 450, m60: 360, m50: 300, m33: 198 },
                      { total: 700, m90: 630, m80: 560, m75: 525, m60: 420, m50: 350, m33: 231 },
                      { total: 800, m90: 720, m80: 640, m75: 600, m60: 480, m50: 400, m33: 264 },
                      { total: 1000, m90: 900, m80: 800, m75: 750, m60: 600, m50: 500, m33: 330 },
                    ].map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="border border-gray-300 px-4 py-2 font-bold">{row.total}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.m90}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.m80}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.m75}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.m60}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.m50}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.m33}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Grading Systems */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Understanding Grading Systems in India</h2>

            <div className="space-y-6">
              {/* CBSE Grading System */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">CBSE Grading System (Classes 10 & 12)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-blue-300">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="border border-blue-300 px-4 py-2">Marks Range</th>
                        <th className="border border-blue-300 px-4 py-2">Grade</th>
                        <th className="border border-blue-300 px-4 py-2">Grade Point</th>
                        <th className="border border-blue-300 px-4 py-2">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr><td className="border border-blue-300 px-4 py-2">91-100%</td><td className="border border-blue-300 px-4 py-2 font-bold">A1</td><td className="border border-blue-300 px-4 py-2">10.0</td><td className="border border-blue-300 px-4 py-2">Outstanding</td></tr>
                      <tr className="bg-blue-50"><td className="border border-blue-300 px-4 py-2">81-90%</td><td className="border border-blue-300 px-4 py-2 font-bold">A2</td><td className="border border-blue-300 px-4 py-2">9.0</td><td className="border border-blue-300 px-4 py-2">Excellent</td></tr>
                      <tr><td className="border border-blue-300 px-4 py-2">71-80%</td><td className="border border-blue-300 px-4 py-2 font-bold">B1</td><td className="border border-blue-300 px-4 py-2">8.0</td><td className="border border-blue-300 px-4 py-2">Very Good</td></tr>
                      <tr className="bg-blue-50"><td className="border border-blue-300 px-4 py-2">61-70%</td><td className="border border-blue-300 px-4 py-2 font-bold">B2</td><td className="border border-blue-300 px-4 py-2">7.0</td><td className="border border-blue-300 px-4 py-2">Good</td></tr>
                      <tr><td className="border border-blue-300 px-4 py-2">51-60%</td><td className="border border-blue-300 px-4 py-2 font-bold">C1</td><td className="border border-blue-300 px-4 py-2">6.0</td><td className="border border-blue-300 px-4 py-2">Fair</td></tr>
                      <tr className="bg-blue-50"><td className="border border-blue-300 px-4 py-2">41-50%</td><td className="border border-blue-300 px-4 py-2 font-bold">C2</td><td className="border border-blue-300 px-4 py-2">5.0</td><td className="border border-blue-300 px-4 py-2">Average</td></tr>
                      <tr><td className="border border-blue-300 px-4 py-2">33-40%</td><td className="border border-blue-300 px-4 py-2 font-bold">D</td><td className="border border-blue-300 px-4 py-2">4.0</td><td className="border border-blue-300 px-4 py-2">Pass</td></tr>
                      <tr className="bg-blue-50"><td className="border border-blue-300 px-4 py-2">21-32%</td><td className="border border-blue-300 px-4 py-2 font-bold">E1</td><td className="border border-blue-300 px-4 py-2">-</td><td className="border border-blue-300 px-4 py-2">Needs Improvement</td></tr>
                      <tr><td className="border border-blue-300 px-4 py-2">0-20%</td><td className="border border-blue-300 px-4 py-2 font-bold">E2</td><td className="border border-blue-300 px-4 py-2">-</td><td className="border border-blue-300 px-4 py-2">Needs Improvement</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Traditional Division System */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Traditional Division System (State Boards)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-green-300">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="border border-green-300 px-4 py-2">Percentage Range</th>
                        <th className="border border-green-300 px-4 py-2">Division</th>
                        <th className="border border-green-300 px-4 py-2">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr><td className="border border-green-300 px-4 py-2">75% and above</td><td className="border border-green-300 px-4 py-2 font-bold">First Division with Distinction</td><td className="border border-green-300 px-4 py-2">Exceptional Performance</td></tr>
                      <tr className="bg-green-50"><td className="border border-green-300 px-4 py-2">60% - 74.9%</td><td className="border border-green-300 px-4 py-2 font-bold">First Division</td><td className="border border-green-300 px-4 py-2">Very Good Performance</td></tr>
                      <tr><td className="border border-green-300 px-4 py-2">48% - 59.9%</td><td className="border border-green-300 px-4 py-2 font-bold">Second Division</td><td className="border border-green-300 px-4 py-2">Good Performance</td></tr>
                      <tr className="bg-green-50"><td className="border border-green-300 px-4 py-2">33% - 47.9%</td><td className="border border-green-300 px-4 py-2 font-bold">Third Division</td><td className="border border-green-300 px-4 py-2">Pass</td></tr>
                      <tr><td className="border border-green-300 px-4 py-2">Below 33%</td><td className="border border-green-300 px-4 py-2 font-bold">Fail</td><td className="border border-green-300 px-4 py-2">Did not meet minimum requirement</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-4 italic">Note: The exact division cutoffs may vary slightly between different state boards. Some boards use 60% for first division, while others use 65%.</p>
              </div>
            </div>
          </section>

          {/* Different Scenarios */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Calculating Percentage in Different Scenarios</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Scenario 1 */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-300">
                <h3 className="text-xl font-bold text-blue-800 mb-3">Semester/Term Percentage</h3>
                <p className="text-gray-700 mb-3">When you have multiple subjects in a semester:</p>
                <div className="bg-white p-4 rounded border border-blue-200 text-sm">
                  <p className="font-semibold mb-2">Example:</p>
                  <p>Subject 1: 85/100</p>
                  <p>Subject 2: 78/100</p>
                  <p>Subject 3: 92/100</p>
                  <p className="mt-2 font-mono">Total: (85+78+92) = 255</p>
                  <p className="font-mono">Out of: 300</p>
                  <p className="mt-2 font-bold text-blue-700">Percentage = (255/300) × 100 = 85%</p>
                </div>
              </div>

              {/* Scenario 2 */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-300">
                <h3 className="text-xl font-bold text-green-800 mb-3">Weighted Subjects</h3>
                <p className="text-gray-700 mb-3">When subjects have different weights/credits:</p>
                <div className="bg-white p-4 rounded border border-green-200 text-sm">
                  <p className="font-semibold mb-2">Example:</p>
                  <p>Math (150 marks): 120</p>
                  <p>Science (150 marks): 135</p>
                  <p>English (100 marks): 80</p>
                  <p className="mt-2 font-mono">Total: 120+135+80 = 335</p>
                  <p className="font-mono">Out of: 150+150+100 = 400</p>
                  <p className="mt-2 font-bold text-green-700">Percentage = (335/400) × 100 = 83.75%</p>
                </div>
              </div>

              {/* Scenario 3 */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-300">
                <h3 className="text-xl font-bold text-purple-800 mb-3">Theory + Practical Combined</h3>
                <p className="text-gray-700 mb-3">When subjects have both theory and practical:</p>
                <div className="bg-white p-4 rounded border border-purple-200 text-sm">
                  <p className="font-semibold mb-2">Example (Chemistry):</p>
                  <p>Theory (70 marks): 58</p>
                  <p>Practical (30 marks): 27</p>
                  <p className="mt-2 font-mono">Total: 58+27 = 85</p>
                  <p className="font-mono">Out of: 100</p>
                  <p className="mt-2 font-bold text-purple-700">Percentage = (85/100) × 100 = 85%</p>
                </div>
              </div>

              {/* Scenario 4 */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border-2 border-orange-300">
                <h3 className="text-xl font-bold text-orange-800 mb-3">Annual Percentage (Both Terms)</h3>
                <p className="text-gray-700 mb-3">Combining multiple terms/semesters:</p>
                <div className="bg-white p-4 rounded border border-orange-200 text-sm">
                  <p className="font-semibold mb-2">Example:</p>
                  <p>Term 1: 380/500</p>
                  <p>Term 2: 420/500</p>
                  <p className="mt-2 font-mono">Total: 380+420 = 800</p>
                  <p className="font-mono">Out of: 500+500 = 1000</p>
                  <p className="mt-2 font-bold text-orange-700">Percentage = (800/1000) × 100 = 80%</p>
                </div>
              </div>
            </div>
          </section>

          {/* Tips and Important Points */}
          <section className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg shadow-lg p-8 border-2 border-amber-300">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Important Tips for Percentage Calculation</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-amber-800 mb-4">✓ Do's</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 text-xl">✓</span>
                    <span>Always add up all marks obtained across all subjects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 text-xl">✓</span>
                    <span>Include all subjects, even if some have different maximum marks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 text-xl">✓</span>
                    <span>Double-check your total marks calculation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 text-xl">✓</span>
                    <span>Round to 2 decimal places for accuracy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 text-xl">✓</span>
                    <span>Verify the grading system used by your board/university</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-red-800 mb-4">✗ Don'ts</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 text-xl">✗</span>
                    <span>Don't calculate percentage for each subject and then average them</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 text-xl">✗</span>
                    <span>Don't forget to include practical marks if applicable</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 text-xl">✗</span>
                    <span>Don't mix up marks obtained with total marks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 text-xl">✗</span>
                    <span>Don't assume all subjects have equal maximum marks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 text-xl">✗</span>
                    <span>Don't forget to multiply by 100 in the final step</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-red-500">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Common Mistakes to Avoid</h2>

            <div className="space-y-6">
              {/* Mistake 1 */}
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h3 className="text-xl font-bold text-red-800 mb-3">❌ Mistake 1: Averaging Subject Percentages</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-red-700 mb-2">Wrong Method:</p>
                    <div className="bg-white p-3 rounded border border-red-300 text-sm">
                      <p>English: 80/100 = 80%</p>
                      <p>Math: 75/100 = 75%</p>
                      <p>Science: 70/100 = 70%</p>
                      <p className="mt-2 font-bold text-red-600">Average = (80+75+70)/3 = 75% ❌</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-green-700 mb-2">Correct Method:</p>
                    <div className="bg-white p-3 rounded border border-green-300 text-sm">
                      <p>Total Obtained: 80+75+70 = 225</p>
                      <p>Total Marks: 100+100+100 = 300</p>
                      <p className="mt-2 font-bold text-green-600">Percentage = (225/300) × 100 = 75% ✓</p>
                      <p className="text-xs text-gray-600 mt-2">(In this case both give same result, but won't when marks are different)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mistake 2 */}
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h3 className="text-xl font-bold text-red-800 mb-3">❌ Mistake 2: Ignoring Different Maximum Marks</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-red-700 mb-2">Wrong Assumption:</p>
                    <div className="bg-white p-3 rounded border border-red-300 text-sm">
                      <p>Subject A: 80/100</p>
                      <p>Subject B: 90/150</p>
                      <p className="mt-2 text-red-600">Assuming both out of 100 ❌</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-green-700 mb-2">Correct Approach:</p>
                    <div className="bg-white p-3 rounded border border-green-300 text-sm">
                      <p>Total: 80+90 = 170</p>
                      <p>Out of: 100+150 = 250</p>
                      <p className="mt-2 font-bold text-green-600">Percentage = (170/250) × 100 = 68% ✓</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mistake 3 */}
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h3 className="text-xl font-bold text-red-800 mb-3">❌ Mistake 3: Forgetting to Multiply by 100</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-red-700 mb-2">Incomplete Calculation:</p>
                    <div className="bg-white p-3 rounded border border-red-300 text-sm">
                      <p>Marks: 432/500</p>
                      <p className="mt-2">432 ÷ 500 = 0.864</p>
                      <p className="mt-2 font-bold text-red-600">Answer: 0.864 ❌</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-green-700 mb-2">Complete Calculation:</p>
                    <div className="bg-white p-3 rounded border border-green-300 text-sm">
                      <p>Marks: 432/500</p>
                      <p className="mt-2">432 ÷ 500 = 0.864</p>
                      <p className="mt-2 font-bold text-green-600">0.864 × 100 = 86.4% ✓</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Frequently Asked Questions (FAQs)</h2>
            <div className="space-y-6">
              {/* FAQ 1 */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-blue-800 mb-3">Q1: How do I calculate percentage if I have marks in different subjects with different maximum marks?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Add up all the marks you obtained across all subjects to get total marks obtained. Then add up all the maximum marks of all subjects to get total marks. Use the formula: Percentage = (Total Marks Obtained / Total Maximum Marks) × 100. For example, if you scored 85/100 in English, 120/150 in Math, and 40/50 in Science, then Total Obtained = 85+120+40 = 245, Total Maximum = 100+150+50 = 300, Percentage = (245/300) × 100 = 81.67%.
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-green-800 mb-3">Q2: What is the passing percentage in most Indian boards?</h3>
                <p className="text-gray-700 leading-relaxed">
                  In most Indian education boards (CBSE, ICSE, and state boards), the minimum passing percentage is 33%. However, some boards and universities have a higher passing threshold of 35% or 40%. Additionally, students often need to score a minimum percentage in each subject individually (usually 33%) to pass overall. Always check your specific board's requirements.
                </p>
              </div>

              {/* FAQ 3 */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-l-4 border-purple-600">
                <h3 className="text-xl font-bold text-purple-800 mb-3">Q3: How is percentage different from CGPA or GPA?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Percentage is calculated as (Marks Obtained / Total Marks) × 100 and ranges from 0 to 100. CGPA (Cumulative Grade Point Average) is calculated on a scale (usually 10 or 4 points) based on grade points assigned to percentage ranges. To convert CBSE percentage to CGPA (10-point scale), divide by 9.5. To convert CGPA to percentage, multiply by 9.5. For example, 85% = 85/9.5 ≈ 8.95 CGPA, and 9.0 CGPA = 9.0 × 9.5 = 85.5%.
                </p>
              </div>

              {/* FAQ 4 */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg border-l-4 border-amber-600">
                <h3 className="text-xl font-bold text-amber-800 mb-3">Q4: Can I calculate percentage by averaging individual subject percentages?</h3>
                <p className="text-gray-700 leading-relaxed">
                  No, this is a common mistake! You should NOT calculate each subject's percentage and then average them. Instead, add all marks obtained and all total marks, then calculate percentage once. For example, if you scored 80/100 in Subject A and 60/100 in Subject B: WRONG method = (80% + 60%)/2 = 70%. CORRECT method = (80+60)/(100+100) × 100 = 70%. While both give the same answer here, they will differ when subjects have different maximum marks.
                </p>
              </div>

              {/* FAQ 5 */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-lg border-l-4 border-red-600">
                <h3 className="text-xl font-bold text-red-800 mb-3">Q5: What percentage is considered good for college admissions?</h3>
                <p className="text-gray-700 leading-relaxed">
                  For top Indian universities and colleges, 90% and above is considered excellent and highly competitive. 80-89% is very good and qualifies you for most good colleges. 75-79% is above average and acceptable for many colleges. 60-74% is considered average. However, cutoffs vary significantly by course, college, and category (General/OBC/SC/ST). Engineering colleges typically require 75-90%+, medical colleges require 90-95%+, and top commerce/arts colleges require 85-95%+ for admission.
                </p>
              </div>

              {/* FAQ 6 */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg border-l-4 border-teal-600">
                <h3 className="text-xl font-bold text-teal-800 mb-3">Q6: How do I calculate semester percentage or annual percentage?</h3>
                <p className="text-gray-700 leading-relaxed">
                  For semester percentage, add all marks obtained in that semester across all subjects, divide by total maximum marks for that semester, and multiply by 100. For annual percentage combining multiple semesters, add marks obtained in ALL semesters, divide by total maximum marks of ALL semesters combined, and multiply by 100. For example, Semester 1: 400/500, Semester 2: 450/500. Annual = (400+450)/(500+500) × 100 = 850/1000 × 100 = 85%.
                </p>
              </div>

              {/* FAQ 7 */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border-l-4 border-indigo-600">
                <h3 className="text-xl font-bold text-indigo-800 mb-3">Q7: What if my marks include decimal points or grace marks?</h3>
                <p className="text-gray-700 leading-relaxed">
                  The calculation remains exactly the same! Many boards now award decimal marks (like 87.5 or 92.25) especially after re-evaluation or when grace marks are added. Simply use these decimal values in your calculation. For example, if you scored 432.5 out of 500, your percentage = (432.5/500) × 100 = 86.5%. Always include grace marks in your total marks obtained if they've been officially added to your marksheet.
                </p>
              </div>

              {/* FAQ 8 */}
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-lg border-l-4 border-violet-600">
                <h3 className="text-xl font-bold text-violet-800 mb-3">Q8: How do I calculate aggregate percentage for subjects with practical exams?</h3>
                <p className="text-gray-700 leading-relaxed">
                  For subjects with both theory and practical components (like Science subjects), add the theory marks and practical marks together for that subject. For example, if Chemistry has Theory (70 marks) and Practical (30 marks), and you scored 58 in theory and 27 in practical, your total Chemistry marks = 58+27 = 85 out of 100. Then combine this with other subjects to calculate overall percentage. Theory and practical are treated as one combined subject total.
                </p>
              </div>
            </div>
          </section>

          {/* Why Use This Calculator */}
          <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Why Use Our Marks Percentage Calculator?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Instant Results</h3>
                <p className="text-green-50">Get your percentage calculated immediately with just marks obtained and total marks.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Grade Classification</h3>
                <p className="text-green-50">Automatically see your grade (A+, A, B, etc.) and division based on your percentage.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Educational Content</h3>
                <p className="text-green-50">Learn with comprehensive examples, tables, and step-by-step explanations.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Page() {
  return <MarksPercentageCalculator />;
}
