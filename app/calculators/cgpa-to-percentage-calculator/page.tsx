'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

export default function CGPAToPercentageCalculator() {
  const [cgpa, setCgpa] = useState<string>('8.5');
  const [scale, setScale] = useState<string>('10');
  const [result, setResult] = useState<{
    cgpa: number;
    percentage: number;
    scale: number;
    grade: string;
    classification: string;
  } | null>(null);

  const getGrade = (percentage: number): string => {
    if (percentage >= 90) return 'O (Outstanding)';
    if (percentage >= 80) return 'A+ (Excellent)';
    if (percentage >= 70) return 'A (Very Good)';
    if (percentage >= 60) return 'B+ (Good)';
    if (percentage >= 50) return 'B (Above Average)';
    if (percentage >= 40) return 'C (Average)';
    if (percentage >= 33) return 'D (Pass)';
    return 'F (Fail)';
  };

  const getClassification = (percentage: number): string => {
    if (percentage >= 75) return 'First Class with Distinction';
    if (percentage >= 60) return 'First Class';
    if (percentage >= 50) return 'Second Class';
    if (percentage >= 40) return 'Third Class';
    if (percentage >= 33) return 'Pass Class';
    return 'Fail';
  };

  const handleCalculate = () => {
    const cgpaValue = parseFloat(cgpa);
    const scaleValue = parseFloat(scale);

    if (isNaN(cgpaValue) || cgpaValue < 0) {
      alert('Please enter a valid CGPA value.');
      return;
    }

    if (cgpaValue > scaleValue) {
      alert(`CGPA cannot be greater than the scale (${scaleValue}).`);
      return;
    }

    // Standard conversion formula: Percentage = CGPA × (100 / Scale)
    // For 10-point scale: Percentage = CGPA × 9.5 (commonly used in India)
    // We'll use the standard formula for accuracy
    let percentage: number;

    if (scaleValue === 10) {
      // For 10-point scale, use the standard CBSE formula
      percentage = cgpaValue * 9.5;
    } else if (scaleValue === 4) {
      // For 4-point scale (GPA), use direct conversion
      percentage = (cgpaValue / 4) * 100;
    } else {
      // Generic formula for other scales
      percentage = (cgpaValue / scaleValue) * 100;
    }

    setResult({
      cgpa: cgpaValue,
      percentage: Math.min(percentage, 100), // Cap at 100%
      scale: scaleValue,
      grade: getGrade(percentage),
      classification: getClassification(percentage),
    });
  };

  const handleClear = () => {
    setCgpa('8.5');
    setScale('10');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I convert my CGPA to percentage?","acceptedAnswer":{"@type":"Answer","text":"The most common method in India is to multiply your CGPA by 9.5. For example, if your CGPA is 8.5, your percentage would be 8.5 × 9.5 = 80.75%. However, different universities may use different formulas, so always check with your institution for the exact conversion method they use."}},{"@type":"Question","name":"Is CGPA better than percentage?","acceptedAnswer":{"@type":"Answer","text":"CGPA and percentage are two different ways to represent academic performance. CGPA reduces competition and stress among students by using a grading scale instead of exact marks. It also accounts for overall performance across subjects. However, percentage gives a more precise representation of marks obtained. Neither is inherently better; they serve different purposes in the education system."}},{"@type":"Question","name":"What is a good CGPA on a 10-point scale?","acceptedAnswer":{"@type":"Answer","text":"On a 10-point scale, a CGPA of 8.0 or above is considered excellent and equivalent to 75%+ percentage. A CGPA of 9.0+ is outstanding (85%+), 7.0-7.9 is very good (66-74%), 6.0-6.9 is good (57-65%), and 5.0-5.9 is above average (47-56%). Anything below 5.0 indicates room for improvement."}},{"@type":"Question","name":"Can I get 100% from a CGPA of 10?","acceptedAnswer":{"@type":"Answer","text":"When using the standard CBSE formula (CGPA × 9.5), a CGPA of 10 converts to 95%, not 100%. This is because a CGPA of 10 represents the grade band of 91-100%, so the conversion uses 9.5 as the multiplier to represent the average of this range. Different universities may have different conversion methods."}},{"@type":"Question","name":"How do I calculate CGPA from individual subject marks?","acceptedAnswer":{"@type":"Answer","text":"First, convert each subject&apos;s marks to grade points using your institution&apos;s grading scale (e.g., 91-100 = 10 GP, 81-90 = 9 GP). Then, add up all the grade points and divide by the number of subjects. For example: If you have 5 subjects with grade points 9, 8, 9, 8, 9, your CGPA = (9+8+9+8+9)/5 = 43/5 = 8.6."}},{"@type":"Question","name":"Why do different universities use different conversion formulas?","acceptedAnswer":{"@type":"Answer","text":"Universities adopt different conversion formulas based on their grading philosophies and the range their grade points represent. For instance, some universities believe their top grade represents a higher percentage range, leading to different multipliers. Anna University and VTU use (CGPA - 0.75) × 10, while Mumbai University uses CGPA × 7.25 + 11. Always use your institution&apos;s official formula for accurate conversion."}},{"@type":"Question","name":"Does CGPA conversion affect college admissions?","acceptedAnswer":{"@type":"Answer","text":"Yes, CGPA conversion is crucial for college admissions, especially when applying to institutions that require percentage-based eligibility. Most colleges accept both CGPA and percentage, but they may convert your CGPA using their own formula. It&apos;s important to know your institution&apos;s official conversion method and carry proper documentation showing how your percentage was calculated from CGPA."}}]}' }}
      />
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-8 mt-20 mb-12 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A3D7C] mb-4">
            CGPA to Percentage Calculator
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Convert your CGPA (Cumulative Grade Point Average) to percentage instantly with comprehensive formulas, step-by-step examples, and grading system explanations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border-t-4 border-blue-700">
            <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white text-center py-3 rounded-lg mb-6">
              <h2 className="text-xl md:text-2xl font-bold">CGPA to % Converter</h2>
            </div>

            <div className="mb-6">
              <label htmlFor="cgpa" className="text-base font-semibold text-gray-700 mb-2 block">
                Enter Your CGPA:
              </label>
              <Input
                id="cgpa"
                type="number"
                step="0.01"
                min="0"
                max={scale}
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                className="text-2xl p-4 border-2 border-gray-300 focus:border-blue-500 text-center font-semibold"
                placeholder="e.g., 8.5"
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
                className="py-6 text-lg font-semibold bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900"
              >
                Calculate
              </Button>
            </div>

            {result && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Result:</h3>
                <div className="space-y-4">
                  <div className="bg-white border-2 border-blue-500 rounded-lg p-5 text-center">
                    <p className="text-sm text-gray-600 mb-2">Your Percentage</p>
                    <p className="text-5xl font-bold text-blue-600">
                      {result.percentage.toFixed(2)}%
                    </p>
                  </div>

                  <div className="bg-white border border-gray-300 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-3 text-base">
                      <div>
                        <p className="text-gray-600">CGPA:</p>
                        <p className="font-bold">{result.cgpa.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Scale:</p>
                        <p className="font-bold">{result.scale} Point</p>
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
                        Percentage = CGPA × 9.5
                      </p>
                      <p className="text-sm text-gray-600">
                        (Standard CBSE/Indian universities formula)
                      </p>
                    </>
                  ) : result.scale === 4 ? (
                    <>
                      <p className="text-base mb-2">
                        Percentage = (CGPA / 4) × 100
                      </p>
                      <p className="text-sm text-gray-600">
                        (International GPA to percentage conversion)
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-base mb-2">
                        Percentage = (CGPA / {result.scale}) × 100
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
                        Percentage = {result.cgpa} × 9.5
                      </p>
                      <p className="text-base font-bold">
                        Percentage = {result.percentage.toFixed(2)}%
                      </p>
                    </>
                  ) : result.scale === 4 ? (
                    <>
                      <p className="text-base mb-1">
                        Percentage = ({result.cgpa} / 4) × 100
                      </p>
                      <p className="text-base mb-1">
                        Percentage = {(result.cgpa / 4).toFixed(4)} × 100
                      </p>
                      <p className="text-base font-bold">
                        Percentage = {result.percentage.toFixed(2)}%
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-base mb-1">
                        Percentage = ({result.cgpa} / {result.scale}) × 100
                      </p>
                      <p className="text-base mb-1">
                        Percentage = {(result.cgpa / result.scale).toFixed(4)} × 100
                      </p>
                      <p className="text-base font-bold">
                        Percentage = {result.percentage.toFixed(2)}%
                      </p>
                    </>
                  )}
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                  <p className="font-semibold mb-2">Interpretation:</p>
                  <p className="text-base">
                    A CGPA of {result.cgpa} on a {result.scale}-point scale is equivalent to {result.percentage.toFixed(2)}% and is classified as &ldquo;{result.classification}&rdquo; with grade &ldquo;{result.grade}&rdquo;.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg">Enter your CGPA and click Calculate to see the conversion</p>
              </div>
            )}
          </div>
        </div>

        {/* Comprehensive CGPA to Percentage Conversion Formulas */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">CGPA to Percentage Conversion Formulas</h2>
          <div className="prose max-w-none text-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">
              Converting CGPA to percentage depends on the grading scale used by your institution. Different countries and universities use different formulas. Here are the most commonly used conversion formulas:
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-6 my-6">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">1. Indian Universities (10-Point Scale)</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-xl font-bold mb-2">Standard CBSE Formula:</p>
                  <p className="text-2xl font-mono bg-gray-100 p-3 rounded">
                    Percentage = CGPA × 9.5
                  </p>
                  <p className="text-base mt-3 text-gray-700">
                    This is the official formula prescribed by CBSE (Central Board of Secondary Education) and is widely used across Indian schools and universities.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-lg font-bold mb-2">Example 1:</p>
                  <div className="space-y-1 font-mono text-base">
                    <p>CGPA = 8.5</p>
                    <p>Percentage = 8.5 × 9.5</p>
                    <p className="font-bold text-green-600">Percentage = 80.75%</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-lg font-bold mb-2">Example 2:</p>
                  <div className="space-y-1 font-mono text-base">
                    <p>CGPA = 9.2</p>
                    <p>Percentage = 9.2 × 9.5</p>
                    <p className="font-bold text-green-600">Percentage = 87.40%</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-lg font-bold mb-2">Example 3:</p>
                  <div className="space-y-1 font-mono text-base">
                    <p>CGPA = 7.8</p>
                    <p>Percentage = 7.8 × 9.5</p>
                    <p className="font-bold text-green-600">Percentage = 74.10%</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="font-semibold text-yellow-800 mb-2">Why 9.5 and not 10?</p>
                <p className="text-base text-gray-700">
                  The multiplier 9.5 is used instead of 10 because in the CBSE grading system, a CGPA of 10 indicates marks between 91-100%, not exactly 100%. This conversion accounts for the grade range and provides a more accurate percentage representation.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-lg p-6 my-6">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">2. International Universities (4-Point GPA Scale)</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
                  <p className="text-xl font-bold mb-2">Standard GPA Formula:</p>
                  <p className="text-2xl font-mono bg-gray-100 p-3 rounded">
                    Percentage = (GPA / 4.0) × 100
                  </p>
                  <p className="text-base mt-3 text-gray-700">
                    This formula is used in the USA, Canada, and many international universities that follow the 4.0 GPA scale.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-lg font-bold mb-2">Example 1:</p>
                  <div className="space-y-1 font-mono text-base">
                    <p>GPA = 3.5</p>
                    <p>Percentage = (3.5 / 4.0) × 100</p>
                    <p>Percentage = 0.875 × 100</p>
                    <p className="font-bold text-green-600">Percentage = 87.50%</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-lg font-bold mb-2">Example 2:</p>
                  <div className="space-y-1 font-mono text-base">
                    <p>GPA = 3.8</p>
                    <p>Percentage = (3.8 / 4.0) × 100</p>
                    <p>Percentage = 0.95 × 100</p>
                    <p className="font-bold text-green-600">Percentage = 95.00%</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-lg font-bold mb-2">Example 3:</p>
                  <div className="space-y-1 font-mono text-base">
                    <p>GPA = 2.7</p>
                    <p>Percentage = (2.7 / 4.0) × 100</p>
                    <p>Percentage = 0.675 × 100</p>
                    <p className="font-bold text-green-600">Percentage = 67.50%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-lg p-6 my-6">
              <h3 className="text-2xl font-bold text-orange-800 mb-4">3. Generic Formula (Any Scale)</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
                  <p className="text-xl font-bold mb-2">Universal Conversion Formula:</p>
                  <p className="text-2xl font-mono bg-gray-100 p-3 rounded">
                    Percentage = (CGPA / Maximum Scale) × 100
                  </p>
                  <p className="text-base mt-3 text-gray-700">
                    This formula works for any grading scale (5-point, 7-point, etc.) and provides a direct proportional conversion.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-lg font-bold mb-2">Example (5-Point Scale):</p>
                  <div className="space-y-1 font-mono text-base">
                    <p>CGPA = 4.2 (out of 5)</p>
                    <p>Percentage = (4.2 / 5.0) × 100</p>
                    <p>Percentage = 0.84 × 100</p>
                    <p className="font-bold text-green-600">Percentage = 84.00%</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-lg font-bold mb-2">Example (7-Point Scale):</p>
                  <div className="space-y-1 font-mono text-base">
                    <p>CGPA = 5.8 (out of 7)</p>
                    <p>Percentage = (5.8 / 7.0) × 100</p>
                    <p>Percentage = 0.8286 × 100</p>
                    <p className="font-bold text-green-600">Percentage = 82.86%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CGPA to Percentage Conversion Table */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">CGPA to Percentage Conversion Table (10-Point Scale)</h2>
          <p className="text-lg text-gray-700 mb-6">
            This comprehensive conversion table shows CGPA to percentage equivalents using the standard CBSE formula (CGPA × 9.5):
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-blue-700 to-blue-800 text-white">
                  <th className="border-2 border-gray-300 p-4">CGPA</th>
                  <th className="border-2 border-gray-300 p-4">Percentage (%)</th>
                  <th className="border-2 border-gray-300 p-4">Grade</th>
                  <th className="border-2 border-gray-300 p-4">Classification</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {[
                  { cgpa: 10.0, percent: 95.0, grade: 'O', class: 'Outstanding' },
                  { cgpa: 9.5, percent: 90.25, grade: 'O', class: 'Outstanding' },
                  { cgpa: 9.0, percent: 85.5, grade: 'A+', class: 'Excellent' },
                  { cgpa: 8.5, percent: 80.75, grade: 'A+', class: 'Excellent' },
                  { cgpa: 8.0, percent: 76.0, grade: 'A', class: 'First Class Distinction' },
                  { cgpa: 7.5, percent: 71.25, grade: 'A', class: 'First Class Distinction' },
                  { cgpa: 7.0, percent: 66.5, grade: 'B+', class: 'First Class' },
                  { cgpa: 6.5, percent: 61.75, grade: 'B+', class: 'First Class' },
                  { cgpa: 6.0, percent: 57.0, grade: 'B', class: 'Second Class' },
                  { cgpa: 5.5, percent: 52.25, grade: 'B', class: 'Second Class' },
                  { cgpa: 5.0, percent: 47.5, grade: 'C', class: 'Third Class' },
                  { cgpa: 4.5, percent: 42.75, grade: 'C', class: 'Third Class' },
                  { cgpa: 4.0, percent: 38.0, grade: 'D', class: 'Pass' },
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border-2 border-gray-300 p-3 font-bold text-center text-lg">
                      {row.cgpa.toFixed(1)}
                    </td>
                    <td className="border-2 border-gray-300 p-3 text-center font-semibold text-blue-600 text-lg">
                      {row.percent.toFixed(2)}%
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

        {/* Understanding CGPA */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">What is CGPA?</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="text-lg leading-relaxed">
              <strong>CGPA (Cumulative Grade Point Average)</strong> is a grading system used to evaluate a student&apos;s overall academic performance across all subjects and semesters. It represents the average of grade points obtained in all subjects, excluding additional subjects as per the scheme of studies.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
              <p className="text-xl font-semibold mb-3">How CGPA is Calculated:</p>
              <div className="space-y-3">
                <p className="text-base">
                  <strong>Step 1:</strong> Calculate Grade Points for each subject based on marks obtained
                </p>
                <p className="text-base">
                  <strong>Step 2:</strong> Find the average of all Grade Points
                </p>
                <p className="text-base">
                  <strong>Step 3:</strong> The result is your CGPA
                </p>
                <div className="mt-4 bg-white p-4 rounded-lg">
                  <p className="font-mono text-lg">
                    CGPA = Sum of Grade Points / Number of Subjects
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6">
              <p className="text-xl font-semibold mb-3">CGPA Calculation Example:</p>
              <p className="text-base mb-3">
                Let&apos;s say a student has the following grade points in 5 subjects:
              </p>
              <div className="bg-white p-4 rounded-lg mb-3">
                <ul className="space-y-2 text-base font-mono">
                  <li>Subject 1: 9 GP</li>
                  <li>Subject 2: 8 GP</li>
                  <li>Subject 3: 9 GP</li>
                  <li>Subject 4: 8 GP</li>
                  <li>Subject 5: 9 GP</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg space-y-2 font-mono">
                <p>CGPA = (9 + 8 + 9 + 8 + 9) / 5</p>
                <p>CGPA = 43 / 5</p>
                <p className="text-xl font-bold text-green-600">CGPA = 8.6</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grade Points to Percentage Mapping */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Grade Points to Percentage Mapping (CBSE)</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-blue-700 to-blue-800 text-white">
                  <th className="border-2 border-gray-300 p-4">Marks Range</th>
                  <th className="border-2 border-gray-300 p-4">Grade Point</th>
                  <th className="border-2 border-gray-300 p-4">Grade</th>
                  <th className="border-2 border-gray-300 p-4">Performance</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-center">
                <tr className="bg-green-50">
                  <td className="border-2 border-gray-300 p-3 font-semibold">91 - 100</td>
                  <td className="border-2 border-gray-300 p-3 font-bold text-xl">10</td>
                  <td className="border-2 border-gray-300 p-3 font-bold">O</td>
                  <td className="border-2 border-gray-300 p-3">Outstanding</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-3 font-semibold">81 - 90</td>
                  <td className="border-2 border-gray-300 p-3 font-bold text-xl">9</td>
                  <td className="border-2 border-gray-300 p-3 font-bold">A+</td>
                  <td className="border-2 border-gray-300 p-3">Excellent</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-3 font-semibold">71 - 80</td>
                  <td className="border-2 border-gray-300 p-3 font-bold text-xl">8</td>
                  <td className="border-2 border-gray-300 p-3 font-bold">A</td>
                  <td className="border-2 border-gray-300 p-3">Very Good</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-3 font-semibold">61 - 70</td>
                  <td className="border-2 border-gray-300 p-3 font-bold text-xl">7</td>
                  <td className="border-2 border-gray-300 p-3 font-bold">B+</td>
                  <td className="border-2 border-gray-300 p-3">Good</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-3 font-semibold">51 - 60</td>
                  <td className="border-2 border-gray-300 p-3 font-bold text-xl">6</td>
                  <td className="border-2 border-gray-300 p-3 font-bold">B</td>
                  <td className="border-2 border-gray-300 p-3">Above Average</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-3 font-semibold">41 - 50</td>
                  <td className="border-2 border-gray-300 p-3 font-bold text-xl">5</td>
                  <td className="border-2 border-gray-300 p-3 font-bold">C</td>
                  <td className="border-2 border-gray-300 p-3">Average</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-3 font-semibold">33 - 40</td>
                  <td className="border-2 border-gray-300 p-3 font-bold text-xl">4</td>
                  <td className="border-2 border-gray-300 p-3 font-bold">D</td>
                  <td className="border-2 border-gray-300 p-3">Pass</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="border-2 border-gray-300 p-3 font-semibold">Below 33</td>
                  <td className="border-2 border-gray-300 p-3 font-bold text-xl">-</td>
                  <td className="border-2 border-gray-300 p-3 font-bold">F</td>
                  <td className="border-2 border-gray-300 p-3">Fail</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Different University Conversion Methods */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">University-Specific CGPA Conversion Methods</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-3">CBSE (India)</h3>
              <p className="text-base mb-3 font-mono bg-white p-3 rounded">
                % = CGPA × 9.5
              </p>
              <ul className="space-y-2 text-base">
                <li>• Most widely used in India</li>
                <li>• Official CBSE formula</li>
                <li>• Used by most schools</li>
                <li>• 10-point grading scale</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-3">ICSE (India)</h3>
              <p className="text-base mb-3 font-mono bg-white p-3 rounded">
                % = CGPA × 9.5
              </p>
              <ul className="space-y-2 text-base">
                <li>• Similar to CBSE</li>
                <li>• 10-point grading scale</li>
                <li>• Standard conversion</li>
                <li>• Accepted nationwide</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
              <h3 className="text-xl font-bold text-purple-800 mb-3">Anna University</h3>
              <p className="text-base mb-3 font-mono bg-white p-3 rounded">
                % = (CGPA - 0.75) × 10
              </p>
              <ul className="space-y-2 text-base">
                <li>• Tamil Nadu, India</li>
                <li>• Engineering colleges</li>
                <li>• 10-point scale with offset</li>
                <li>• Specific calculation method</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border-2 border-orange-200">
              <h3 className="text-xl font-bold text-orange-800 mb-3">VTU (Karnataka)</h3>
              <p className="text-base mb-3 font-mono bg-white p-3 rounded">
                % = (CGPA - 0.75) × 10
              </p>
              <ul className="space-y-2 text-base">
                <li>• Visvesvaraya Technological</li>
                <li>• Karnataka engineering</li>
                <li>• Same as Anna University</li>
                <li>• 10-point scale</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border-2 border-red-200">
              <h3 className="text-xl font-bold text-red-800 mb-3">Mumbai University</h3>
              <p className="text-base mb-3 font-mono bg-white p-3 rounded">
                % = CGPA × 7.25 + 11
              </p>
              <ul className="space-y-2 text-base">
                <li>• Mumbai, Maharashtra</li>
                <li>• Unique formula</li>
                <li>• Different multiplier</li>
                <li>• Institutional standard</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-lg border-2 border-teal-200">
              <h3 className="text-xl font-bold text-teal-800 mb-3">International (4.0 GPA)</h3>
              <p className="text-base mb-3 font-mono bg-white p-3 rounded">
                % = (GPA / 4.0) × 100
              </p>
              <ul className="space-y-2 text-base">
                <li>• USA, Canada, Australia</li>
                <li>• 4-point grading scale</li>
                <li>• Direct proportional</li>
                <li>• Global standard</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How do I convert my CGPA to percentage?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                The most common method in India is to multiply your CGPA by 9.5. For example, if your CGPA is 8.5, your percentage would be 8.5 × 9.5 = 80.75%. However, different universities may use different formulas, so always check with your institution for the exact conversion method they use.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Is CGPA better than percentage?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                CGPA and percentage are two different ways to represent academic performance. CGPA reduces competition and stress among students by using a grading scale instead of exact marks. It also accounts for overall performance across subjects. However, percentage gives a more precise representation of marks obtained. Neither is inherently better; they serve different purposes in the education system.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What is a good CGPA on a 10-point scale?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                On a 10-point scale, a CGPA of 8.0 or above is considered excellent and equivalent to 75%+ percentage. A CGPA of 9.0+ is outstanding (85%+), 7.0-7.9 is very good (66-74%), 6.0-6.9 is good (57-65%), and 5.0-5.9 is above average (47-56%). Anything below 5.0 indicates room for improvement.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Can I get 100% from a CGPA of 10?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                When using the standard CBSE formula (CGPA × 9.5), a CGPA of 10 converts to 95%, not 100%. This is because a CGPA of 10 represents the grade band of 91-100%, so the conversion uses 9.5 as the multiplier to represent the average of this range. Different universities may have different conversion methods.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How do I calculate CGPA from individual subject marks?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                First, convert each subject&apos;s marks to grade points using your institution&apos;s grading scale (e.g., 91-100 = 10 GP, 81-90 = 9 GP). Then, add up all the grade points and divide by the number of subjects. For example: If you have 5 subjects with grade points 9, 8, 9, 8, 9, your CGPA = (9+8+9+8+9)/5 = 43/5 = 8.6.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Why do different universities use different conversion formulas?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Universities adopt different conversion formulas based on their grading philosophies and the range their grade points represent. For instance, some universities believe their top grade represents a higher percentage range, leading to different multipliers. Anna University and VTU use (CGPA - 0.75) × 10, while Mumbai University uses CGPA × 7.25 + 11. Always use your institution&apos;s official formula for accurate conversion.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Does CGPA conversion affect college admissions?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Yes, CGPA conversion is crucial for college admissions, especially when applying to institutions that require percentage-based eligibility. Most colleges accept both CGPA and percentage, but they may convert your CGPA using their own formula. It&apos;s important to know your institution&apos;s official conversion method and carry proper documentation showing how your percentage was calculated from CGPA.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-xl shadow-2xl p-8 md:p-12 text-center text-white mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help with CGPA and Academic Performance?</h2>
          <p className="text-xl mb-6 text-gray-100">
            Our expert tutors can help you improve your grades and understand grading systems
          </p>
          <Link
            href="/tutoring/free-consultation"
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
