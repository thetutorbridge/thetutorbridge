'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

export default function PercentageToCGPACalculator() {
  const [percentage, setPercentage] = useState<string>('85');
  const [scale, setScale] = useState<string>('10');
  const [result, setResult] = useState<{
    percentage: number;
    cgpa: number;
    scale: number;
    grade: string;
    gradePoint: number;
    classification: string;
  } | null>(null);

  const getGradeAndPoint = (percent: number): { grade: string; point: number } => {
    if (percent >= 91) return { grade: 'O (Outstanding)', point: 10 };
    if (percent >= 81) return { grade: 'A+ (Excellent)', point: 9 };
    if (percent >= 71) return { grade: 'A (Very Good)', point: 8 };
    if (percent >= 61) return { grade: 'B+ (Good)', point: 7 };
    if (percent >= 51) return { grade: 'B (Above Average)', point: 6 };
    if (percent >= 41) return { grade: 'C (Average)', point: 5 };
    if (percent >= 33) return { grade: 'D (Pass)', point: 4 };
    return { grade: 'F (Fail)', point: 0 };
  };

  const getClassification = (percent: number): string => {
    if (percent >= 75) return 'First Class with Distinction';
    if (percent >= 60) return 'First Class';
    if (percent >= 50) return 'Second Class';
    if (percent >= 40) return 'Third Class';
    if (percent >= 33) return 'Pass Class';
    return 'Fail';
  };

  const handleCalculate = () => {
    const percentValue = parseFloat(percentage);
    const scaleValue = parseFloat(scale);

    if (isNaN(percentValue) || percentValue < 0 || percentValue > 100) {
      alert('Please enter a valid percentage between 0 and 100.');
      return;
    }

    let cgpa: number;

    if (scaleValue === 10) {
      // For 10-point scale, use the inverse of CBSE formula
      cgpa = percentValue / 9.5;
    } else if (scaleValue === 4) {
      // For 4-point scale (GPA)
      cgpa = (percentValue / 100) * 4;
    } else {
      // Generic formula for other scales
      cgpa = (percentValue / 100) * scaleValue;
    }

    const gradeInfo = getGradeAndPoint(percentValue);

    setResult({
      percentage: percentValue,
      cgpa: Math.min(cgpa, scaleValue), // Cap at maximum scale
      scale: scaleValue,
      grade: gradeInfo.grade,
      gradePoint: gradeInfo.point,
      classification: getClassification(percentValue),
    });
  };

  const handleClear = () => {
    setPercentage('85');
    setScale('10');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-8 mt-20 mb-12 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A3D7C] mb-4">
            Percentage to CGPA Calculator
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Convert your percentage to CGPA (Cumulative Grade Point Average) instantly with comprehensive formulas, step-by-step examples, and grading system explanations for all major universities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border-t-4 border-purple-700">
            <div className="bg-gradient-to-r from-purple-700 to-purple-800 text-white text-center py-3 rounded-lg mb-6">
              <h2 className="text-xl md:text-2xl font-bold">% to CGPA Converter</h2>
            </div>

            <div className="mb-6">
              <label htmlFor="percentage" className="text-base font-semibold text-gray-700 mb-2 block">
                Enter Your Percentage:
              </label>
              <Input
                id="percentage"
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="text-2xl p-4 border-2 border-gray-300 focus:border-purple-500 text-center font-semibold"
                placeholder="e.g., 85"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="scale" className="text-base font-semibold text-gray-700 mb-2 block">
                Select CGPA Scale:
              </label>
              <Select value={scale} onValueChange={setScale}>
                <SelectTrigger className="text-xl p-4 border-2 border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 Point Scale (India - CBSE, ICSE)</SelectItem>
                  <SelectItem value="4">4 Point Scale (GPA - International)</SelectItem>
                  <SelectItem value="5">5 Point Scale</SelectItem>
                  <SelectItem value="7">7 Point Scale</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button
                onClick={handleClear}
                variant="outline"
                className="py-6 text-lg font-semibold border-2 border-gray-300 hover:bg-gray-100"
              >
                Clear
              </Button>
              <Button
                onClick={handleCalculate}
                className="py-6 text-lg font-semibold bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-800 hover:to-purple-900"
              >
                Calculate
              </Button>
            </div>

            {result && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Result:</h3>
                <div className="space-y-4">
                  <div className="bg-white border-2 border-purple-500 rounded-lg p-5 text-center">
                    <p className="text-sm text-gray-600 mb-2">Your CGPA</p>
                    <p className="text-5xl font-bold text-purple-600">
                      {result.cgpa.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">out of {result.scale}</p>
                  </div>

                  <div className="bg-white border border-gray-300 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-3 text-base">
                      <div>
                        <p className="text-gray-600">Percentage:</p>
                        <p className="font-bold">{result.percentage.toFixed(2)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Grade Point:</p>
                        <p className="font-bold">{result.gradePoint}/10</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-600">Grade:</p>
                        <p className="font-bold text-green-600">{result.grade}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-600">Classification:</p>
                        <p className="font-bold text-purple-600">{result.classification}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
            <h3 className="text-2xl font-bold text-[#1A3D7C] mb-6 pb-3 border-b-2 border-gray-200">
              Conversion Formula:
            </h3>

            {result ? (
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <p className="font-semibold mb-2">Formula Used:</p>
                  {result.scale === 10 ? (
                    <>
                      <p className="text-base mb-2">
                        CGPA = Percentage / 9.5
                      </p>
                      <p className="text-sm text-gray-600">
                        (Standard CBSE/Indian universities formula)
                      </p>
                    </>
                  ) : result.scale === 4 ? (
                    <>
                      <p className="text-base mb-2">
                        CGPA = (Percentage / 100) × 4
                      </p>
                      <p className="text-sm text-gray-600">
                        (International GPA conversion)
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-base mb-2">
                        CGPA = (Percentage / 100) × {result.scale}
                      </p>
                      <p className="text-sm text-gray-600">
                        (Generic scale conversion formula)
                      </p>
                    </>
                  )}
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <p className="font-semibold mb-2">Step-by-Step Calculation:</p>
                  {result.scale === 10 ? (
                    <>
                      <p className="text-base mb-1">
                        CGPA = {result.percentage} / 9.5
                      </p>
                      <p className="text-base font-bold">
                        CGPA = {result.cgpa.toFixed(2)}
                      </p>
                    </>
                  ) : result.scale === 4 ? (
                    <>
                      <p className="text-base mb-1">
                        CGPA = ({result.percentage} / 100) × 4
                      </p>
                      <p className="text-base mb-1">
                        CGPA = {(result.percentage / 100).toFixed(4)} × 4
                      </p>
                      <p className="text-base font-bold">
                        CGPA = {result.cgpa.toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-base mb-1">
                        CGPA = ({result.percentage} / 100) × {result.scale}
                      </p>
                      <p className="text-base mb-1">
                        CGPA = {(result.percentage / 100).toFixed(4)} × {result.scale}
                      </p>
                      <p className="text-base font-bold">
                        CGPA = {result.cgpa.toFixed(2)}
                      </p>
                    </>
                  )}
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                  <p className="font-semibold mb-2">Interpretation:</p>
                  <p className="text-base">
                    A percentage of {result.percentage.toFixed(2)}% is equivalent to a CGPA of {result.cgpa.toFixed(2)} on a {result.scale}-point scale and is classified as &ldquo;{result.classification}&rdquo; with grade &ldquo;{result.grade}&rdquo;.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg">Enter your percentage and click Calculate to see the conversion</p>
              </div>
            )}
          </div>
        </div>

        {/* Comprehensive Percentage to CGPA Conversion Formulas */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Percentage to CGPA Conversion Formulas</h2>
          <div className="prose max-w-none text-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">
              Converting percentage to CGPA depends on the grading scale used by your institution. Different countries and universities use different conversion formulas. Here are the most commonly used methods with detailed examples:
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-6 my-6">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">1. Indian Universities (10-Point Scale)</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-xl font-bold mb-2">Standard CBSE Formula:</p>
                  <p className="text-2xl font-mono bg-gray-100 p-3 rounded">
                    CGPA = Percentage / 9.5
                  </p>
                  <p className="text-base mt-3 text-gray-700">
                    This is the reverse of the official CBSE formula and is widely used to convert percentage marks back to CGPA across Indian schools and universities.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-lg font-bold mb-2">Example 1:</p>
                  <div className="space-y-1 font-mono text-base">
                    <p>Percentage = 85%</p>
                    <p>CGPA = 85 / 9.5</p>
                    <p className="font-bold text-green-600">CGPA = 8.95 ≈ 8.9</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    85% marks corresponds to a CGPA of approximately 8.9 on a 10-point scale.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-lg font-bold mb-2">Example 2:</p>
                  <div className="space-y-1 font-mono text-base">
                    <p>Percentage = 92%</p>
                    <p>CGPA = 92 / 9.5</p>
                    <p className="font-bold text-green-600">CGPA = 9.68 ≈ 9.7</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    92% marks corresponds to a CGPA of approximately 9.7, indicating outstanding performance.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-lg font-bold mb-2">Example 3:</p>
                  <div className="space-y-1 font-mono text-base">
                    <p>Percentage = 75%</p>
                    <p>CGPA = 75 / 9.5</p>
                    <p className="font-bold text-green-600">CGPA = 7.89 ≈ 7.9</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    75% marks corresponds to a CGPA of approximately 7.9, indicating first class with distinction.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-lg font-bold mb-2">Example 4:</p>
                  <div className="space-y-1 font-mono text-base">
                    <p>Percentage = 68%</p>
                    <p>CGPA = 68 / 9.5</p>
                    <p className="font-bold text-green-600">CGPA = 7.16 ≈ 7.2</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    68% marks corresponds to a CGPA of approximately 7.2, indicating first class.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-lg p-6 my-6">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">2. International Universities (4-Point GPA Scale)</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
                  <p className="text-xl font-bold mb-2">Standard GPA Formula:</p>
                  <p className="text-2xl font-mono bg-gray-100 p-3 rounded">
                    GPA = (Percentage / 100) × 4.0
                  </p>
                  <p className="text-base mt-3 text-gray-700">
                    This formula converts percentage to the 4.0 GPA scale used in the USA, Canada, and many international universities.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-lg font-bold mb-2">Example 1:</p>
                  <div className="space-y-1 font-mono text-base">
                    <p>Percentage = 90%</p>
                    <p>GPA = (90 / 100) × 4.0</p>
                    <p>GPA = 0.90 × 4.0</p>
                    <p className="font-bold text-green-600">GPA = 3.60</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    90% corresponds to a GPA of 3.6, which is excellent on the 4.0 scale.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-lg font-bold mb-2">Example 2:</p>
                  <div className="space-y-1 font-mono text-base">
                    <p>Percentage = 95%</p>
                    <p>GPA = (95 / 100) × 4.0</p>
                    <p>GPA = 0.95 × 4.0</p>
                    <p className="font-bold text-green-600">GPA = 3.80</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    95% corresponds to a GPA of 3.8, which is outstanding.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-lg font-bold mb-2">Example 3:</p>
                  <div className="space-y-1 font-mono text-base">
                    <p>Percentage = 75%</p>
                    <p>GPA = (75 / 100) × 4.0</p>
                    <p>GPA = 0.75 × 4.0</p>
                    <p className="font-bold text-green-600">GPA = 3.00</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    75% corresponds to a GPA of 3.0, which is a B grade.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-lg p-6 my-6">
              <h3 className="text-2xl font-bold text-orange-800 mb-4">3. Alternative Method (Grade Point Based)</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
                  <p className="text-xl font-bold mb-2">Grade Point Method:</p>
                  <p className="text-base mb-3 text-gray-700">
                    First convert percentage to grade points, then the grade points become your CGPA (for single subject) or average of grade points (for multiple subjects).
                  </p>
                  <div className="bg-gray-100 p-3 rounded font-mono text-sm space-y-1">
                    <p>91-100% → Grade Point 10</p>
                    <p>81-90% → Grade Point 9</p>
                    <p>71-80% → Grade Point 8</p>
                    <p>61-70% → Grade Point 7</p>
                    <p>51-60% → Grade Point 6</p>
                    <p>41-50% → Grade Point 5</p>
                    <p>33-40% → Grade Point 4</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-lg font-bold mb-2">Example 1 (Single Subject):</p>
                  <div className="space-y-1 font-mono text-base">
                    <p>Percentage = 88%</p>
                    <p>Grade Point = 9 (falls in 81-90% range)</p>
                    <p className="font-bold text-green-600">CGPA = 9.0</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-lg font-bold mb-2">Example 2 (Multiple Subjects):</p>
                  <div className="space-y-1 font-mono text-sm">
                    <p>Math: 92% → Grade Point 10</p>
                    <p>Science: 85% → Grade Point 9</p>
                    <p>English: 78% → Grade Point 8</p>
                    <p>Social: 88% → Grade Point 9</p>
                    <p>Hindi: 82% → Grade Point 9</p>
                    <p className="pt-2">CGPA = (10 + 9 + 8 + 9 + 9) / 5</p>
                    <p>CGPA = 45 / 5</p>
                    <p className="font-bold text-green-600">CGPA = 9.0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Percentage to CGPA Conversion Table */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Percentage to CGPA Conversion Table (10-Point Scale)</h2>
          <p className="text-lg text-gray-700 mb-6">
            This comprehensive conversion table shows percentage to CGPA equivalents using the standard CBSE formula (Percentage / 9.5):
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-purple-700 to-purple-800 text-white">
                  <th className="border-2 border-gray-300 p-4">Percentage (%)</th>
                  <th className="border-2 border-gray-300 p-4">CGPA</th>
                  <th className="border-2 border-gray-300 p-4">Grade Point</th>
                  <th className="border-2 border-gray-300 p-4">Grade</th>
                  <th className="border-2 border-gray-300 p-4">Classification</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {[
                  { percent: 95, cgpa: 10.0, gp: 10, grade: 'O', class: 'Outstanding' },
                  { percent: 90, cgpa: 9.47, gp: 9, grade: 'A+', class: 'Excellent' },
                  { percent: 85, cgpa: 8.95, gp: 9, grade: 'A+', class: 'Excellent' },
                  { percent: 80, cgpa: 8.42, gp: 8, grade: 'A', class: 'First Class Dist.' },
                  { percent: 75, cgpa: 7.89, gp: 8, grade: 'A', class: 'First Class Dist.' },
                  { percent: 70, cgpa: 7.37, gp: 7, grade: 'B+', class: 'First Class' },
                  { percent: 65, cgpa: 6.84, gp: 7, grade: 'B+', class: 'First Class' },
                  { percent: 60, cgpa: 6.32, gp: 6, grade: 'B', class: 'First Class' },
                  { percent: 55, cgpa: 5.79, gp: 6, grade: 'B', class: 'Second Class' },
                  { percent: 50, cgpa: 5.26, gp: 5, grade: 'C', class: 'Second Class' },
                  { percent: 45, cgpa: 4.74, gp: 5, grade: 'C', class: 'Third Class' },
                  { percent: 40, cgpa: 4.21, gp: 4, grade: 'D', class: 'Third Class' },
                  { percent: 35, cgpa: 3.68, gp: 4, grade: 'D', class: 'Pass' },
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border-2 border-gray-300 p-3 text-center font-bold text-lg">
                      {row.percent}%
                    </td>
                    <td className="border-2 border-gray-300 p-3 text-center font-semibold text-purple-600 text-lg">
                      {row.cgpa.toFixed(2)}
                    </td>
                    <td className="border-2 border-gray-300 p-3 text-center font-semibold">
                      {row.gp}
                    </td>
                    <td className="border-2 border-gray-300 p-3 text-center font-semibold">
                      {row.grade}
                    </td>
                    <td className="border-2 border-gray-300 p-3 text-center">
                      {row.class}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Percentage Ranges to CGPA */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Detailed Percentage Ranges to CGPA Mapping</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-purple-700 to-purple-800 text-white">
                  <th className="border-2 border-gray-300 p-4">Percentage Range</th>
                  <th className="border-2 border-gray-300 p-4">Grade Point</th>
                  <th className="border-2 border-gray-300 p-4">CGPA Range</th>
                  <th className="border-2 border-gray-300 p-4">Grade</th>
                  <th className="border-2 border-gray-300 p-4">Performance Level</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-center">
                <tr className="bg-green-50">
                  <td className="border-2 border-gray-300 p-3 font-semibold">91 - 100%</td>
                  <td className="border-2 border-gray-300 p-3 font-bold text-xl">10</td>
                  <td className="border-2 border-gray-300 p-3 font-semibold text-purple-600">9.6 - 10.0</td>
                  <td className="border-2 border-gray-300 p-3 font-bold">O</td>
                  <td className="border-2 border-gray-300 p-3">Outstanding</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-3 font-semibold">81 - 90%</td>
                  <td className="border-2 border-gray-300 p-3 font-bold text-xl">9</td>
                  <td className="border-2 border-gray-300 p-3 font-semibold text-purple-600">8.5 - 9.5</td>
                  <td className="border-2 border-gray-300 p-3 font-bold">A+</td>
                  <td className="border-2 border-gray-300 p-3">Excellent</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-3 font-semibold">71 - 80%</td>
                  <td className="border-2 border-gray-300 p-3 font-bold text-xl">8</td>
                  <td className="border-2 border-gray-300 p-3 font-semibold text-purple-600">7.5 - 8.4</td>
                  <td className="border-2 border-gray-300 p-3 font-bold">A</td>
                  <td className="border-2 border-gray-300 p-3">Very Good</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-3 font-semibold">61 - 70%</td>
                  <td className="border-2 border-gray-300 p-3 font-bold text-xl">7</td>
                  <td className="border-2 border-gray-300 p-3 font-semibold text-purple-600">6.4 - 7.4</td>
                  <td className="border-2 border-gray-300 p-3 font-bold">B+</td>
                  <td className="border-2 border-gray-300 p-3">Good</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-3 font-semibold">51 - 60%</td>
                  <td className="border-2 border-gray-300 p-3 font-bold text-xl">6</td>
                  <td className="border-2 border-gray-300 p-3 font-semibold text-purple-600">5.4 - 6.3</td>
                  <td className="border-2 border-gray-300 p-3 font-bold">B</td>
                  <td className="border-2 border-gray-300 p-3">Above Average</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-3 font-semibold">41 - 50%</td>
                  <td className="border-2 border-gray-300 p-3 font-bold text-xl">5</td>
                  <td className="border-2 border-gray-300 p-3 font-semibold text-purple-600">4.3 - 5.3</td>
                  <td className="border-2 border-gray-300 p-3 font-bold">C</td>
                  <td className="border-2 border-gray-300 p-3">Average</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-3 font-semibold">33 - 40%</td>
                  <td className="border-2 border-gray-300 p-3 font-bold text-xl">4</td>
                  <td className="border-2 border-gray-300 p-3 font-semibold text-purple-600">3.5 - 4.2</td>
                  <td className="border-2 border-gray-300 p-3 font-bold">D</td>
                  <td className="border-2 border-gray-300 p-3">Pass</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="border-2 border-gray-300 p-3 font-semibold">Below 33%</td>
                  <td className="border-2 border-gray-300 p-3 font-bold text-xl">0</td>
                  <td className="border-2 border-gray-300 p-3 font-semibold text-red-600">Below 3.5</td>
                  <td className="border-2 border-gray-300 p-3 font-bold">F</td>
                  <td className="border-2 border-gray-300 p-3">Fail</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* University-Specific Conversion Methods */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">University-Specific Percentage to CGPA Conversion Methods</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-3">CBSE/ICSE (India)</h3>
              <p className="text-base mb-3 font-mono bg-white p-3 rounded">
                CGPA = % / 9.5
              </p>
              <div className="space-y-2 text-base">
                <p><strong>Example:</strong></p>
                <p className="font-mono">85% → 85/9.5 = 8.95</p>
                <p className="text-sm text-gray-600">Standard formula used across India</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-3">Anna University</h3>
              <p className="text-base mb-3 font-mono bg-white p-3 rounded">
                CGPA = (% / 10) + 0.75
              </p>
              <div className="space-y-2 text-base">
                <p><strong>Example:</strong></p>
                <p className="font-mono">75% → (75/10) + 0.75 = 8.25</p>
                <p className="text-sm text-gray-600">Tamil Nadu engineering colleges</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
              <h3 className="text-xl font-bold text-purple-800 mb-3">Mumbai University</h3>
              <p className="text-base mb-3 font-mono bg-white p-3 rounded">
                CGPA = (% - 11) / 7.25
              </p>
              <div className="space-y-2 text-base">
                <p><strong>Example:</strong></p>
                <p className="font-mono">75% → (75-11) / 7.25 = 8.83</p>
                <p className="text-sm text-gray-600">Maharashtra universities</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border-2 border-orange-200">
              <h3 className="text-xl font-bold text-orange-800 mb-3">VTU (Karnataka)</h3>
              <p className="text-base mb-3 font-mono bg-white p-3 rounded">
                CGPA = (% / 10) + 0.75
              </p>
              <div className="space-y-2 text-base">
                <p><strong>Example:</strong></p>
                <p className="font-mono">80% → (80/10) + 0.75 = 8.75</p>
                <p className="text-sm text-gray-600">Visvesvaraya Technological University</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border-2 border-red-200">
              <h3 className="text-xl font-bold text-red-800 mb-3">MAKAUT (West Bengal)</h3>
              <p className="text-base mb-3 font-mono bg-white p-3 rounded">
                CGPA = % / 10
              </p>
              <div className="space-y-2 text-base">
                <p><strong>Example:</strong></p>
                <p className="font-mono">82% → 82 / 10 = 8.2</p>
                <p className="text-sm text-gray-600">Maulana Abul Kalam Azad University</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-lg border-2 border-teal-200">
              <h3 className="text-xl font-bold text-teal-800 mb-3">International (4.0 GPA)</h3>
              <p className="text-base mb-3 font-mono bg-white p-3 rounded">
                GPA = (% / 100) × 4.0
              </p>
              <div className="space-y-2 text-base">
                <p><strong>Example:</strong></p>
                <p className="font-mono">90% → (90/100) × 4 = 3.6</p>
                <p className="text-sm text-gray-600">USA, Canada, Australia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How do I convert my percentage to CGPA?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                The most common method in India is to divide your percentage by 9.5. For example, if your percentage is 85%, your CGPA would be 85 / 9.5 = 8.95 ≈ 8.9. However, different universities may use different formulas, so always check with your institution for the exact conversion method they use.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What CGPA is 75 percentage?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Using the standard CBSE formula, 75% converts to a CGPA of 7.89 (75 / 9.5 = 7.89). This is typically rounded to 7.9 and falls in the &apos;A&apos; grade category with &apos;First Class with Distinction&apos; classification. This is considered a very good academic performance.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What percentage is 9.5 CGPA?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                A CGPA of 9.5 on a 10-point scale is equivalent to 90.25% (9.5 × 9.5 = 90.25%). This falls in the &apos;Outstanding&apos; or &apos;A+&apos; grade category and represents excellent academic achievement. Students with this CGPA are typically in the top percentile of their class.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Is 8.5 CGPA good in engineering?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Yes, 8.5 CGPA is considered very good in engineering. It is equivalent to approximately 80.75% (8.5 × 9.5), which falls in the &apos;A+&apos; or &apos;Excellent&apos; grade category. This CGPA makes you eligible for most placements, higher studies, and scholarships. It demonstrates strong understanding and consistent performance in technical subjects.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Can I get into IIT with 70 percentage?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                70% converts to approximately 7.37 CGPA (70 / 9.5), which is a good score. For IIT admissions through JEE Advanced, your 12th board percentage/CGPA matters for eligibility. Most IITs require a minimum of 75% (65% for SC/ST/PwD) aggregate in 12th boards or be in the top 20 percentile of their board. So 70% might not meet the eligibility criteria for general category students, but check specific IIT requirements as rules can vary.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What is the difference between GPA and CGPA?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                GPA (Grade Point Average) typically refers to your grade point average for a single semester or term, while CGPA (Cumulative Grade Point Average) is the average of all your GPAs across all semesters. CGPA represents your overall academic performance throughout your course duration, whereas GPA shows performance in a specific period. Both use similar calculation methods but cover different time spans.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Why do different universities have different conversion formulas?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Universities adopt different conversion formulas based on their grading philosophies, difficulty levels, and the percentage ranges their grade points represent. Some universities believe their grading system requires different weightage, leading to formulas like (% / 10) + 0.75 for Anna University or (% - 11) / 7.25 for Mumbai University. These variations account for institutional differences in assessment patterns and grading standards.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How do employers view CGPA vs percentage?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Most employers accept both CGPA and percentage as valid measures of academic performance. However, many prefer percentage as it&apos;s more precise and easier to compare across institutions. When applying for jobs, you can mention both - for example, &quot;CGPA: 8.5/10 (80.75%)&quot;. Some companies have minimum cutoffs specified in percentage, so knowing how to convert your CGPA is important for job applications.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-xl shadow-2xl p-8 md:p-12 text-center text-white mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help Improving Your Academic Performance?</h2>
          <p className="text-xl mb-6 text-gray-100">
            Our expert tutors can help you achieve higher grades and better understand your subjects
          </p>
          <Link
            href="/book-demo-class"
            className="inline-block bg-white text-[#1A3D7C] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Book Your Free Demo Session
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
