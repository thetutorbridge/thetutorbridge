'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calculator, Home, BookOpen, ArrowRight, GraduationCap, Award, TrendingUp, Plus, X } from 'lucide-react';
import Link from 'next/link';

interface SemesterData {
  sgpa: string;
  credits: string;
}

export default function SGPAToCGPACalculator() {
  const [semesters, setSemesters] = useState<SemesterData[]>([
    { sgpa: '8.5', credits: '20' },
    { sgpa: '8.2', credits: '22' },
    { sgpa: '8.7', credits: '24' },
    { sgpa: '8.4', credits: '23' },
  ]);
  const [result, setResult] = useState<{
    cgpa: number;
    totalCredits: number;
    weightedSum: number;
    percentage: number;
    grade: string;
    classification: string;
  } | null>(null);

  const addSemester = () => {
    setSemesters([...semesters, { sgpa: '', credits: '' }]);
  };

  const removeSemester = (index: number) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((_, i) => i !== index));
    }
  };

  const updateSemester = (index: number, field: 'sgpa' | 'credits', value: string) => {
    const newSemesters = [...semesters];
    newSemesters[index][field] = value;
    setSemesters(newSemesters);
  };

  const getGrade = (cgpa: number): string => {
    if (cgpa >= 9.0) return 'O (Outstanding)';
    if (cgpa >= 8.0) return 'A+ (Excellent)';
    if (cgpa >= 7.0) return 'A (Very Good)';
    if (cgpa >= 6.0) return 'B+ (Good)';
    if (cgpa >= 5.0) return 'B (Above Average)';
    if (cgpa >= 4.0) return 'C (Average)';
    return 'F (Fail)';
  };

  const getClassification = (cgpa: number): string => {
    if (cgpa >= 7.5) return 'First Class with Distinction';
    if (cgpa >= 6.0) return 'First Class';
    if (cgpa >= 5.0) return 'Second Class';
    if (cgpa >= 4.0) return 'Pass Class';
    return 'Fail';
  };

  const handleCalculate = () => {
    // Validate inputs
    for (let i = 0; i < semesters.length; i++) {
      const sgpaVal = parseFloat(semesters[i].sgpa);
      const creditsVal = parseFloat(semesters[i].credits);

      if (isNaN(sgpaVal) || sgpaVal < 0 || sgpaVal > 10) {
        alert(`Please enter a valid SGPA (0-10) for Semester ${i + 1}`);
        return;
      }

      if (isNaN(creditsVal) || creditsVal <= 0) {
        alert(`Please enter valid credits for Semester ${i + 1}`);
        return;
      }
    }

    // Calculate weighted sum and total credits
    let weightedSum = 0;
    let totalCredits = 0;

    semesters.forEach((sem) => {
      const sgpaVal = parseFloat(sem.sgpa);
      const creditsVal = parseFloat(sem.credits);
      weightedSum += sgpaVal * creditsVal;
      totalCredits += creditsVal;
    });

    // Calculate CGPA
    const cgpa = weightedSum / totalCredits;

    // Convert to percentage (for 10-point scale)
    const percentage = cgpa * 9.5;

    setResult({
      cgpa: parseFloat(cgpa.toFixed(2)),
      totalCredits,
      weightedSum: parseFloat(weightedSum.toFixed(2)),
      percentage: parseFloat(percentage.toFixed(2)),
      grade: getGrade(cgpa),
      classification: getClassification(cgpa),
    });
  };

  const handleReset = () => {
    setSemesters([
      { sgpa: '8.5', credits: '20' },
      { sgpa: '8.2', credits: '22' },
      { sgpa: '8.7', credits: '24' },
      { sgpa: '8.4', credits: '23' },
    ]);
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-indigo-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-indigo-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">SGPA to CGPA Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <GraduationCap className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              SGPA to CGPA Calculator
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Convert your Semester Grade Point Average (SGPA) to Cumulative Grade Point Average (CGPA) with credit-weighted calculations, step-by-step solutions, and comprehensive grading information.
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Input Section (Left Side - 2 columns) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-indigo-600" />
                  Enter Semester Data
                </h2>

                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {semesters.map((semester, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-gray-900">Semester {index + 1}</h3>
                        {semesters.length > 1 && (
                          <button
                            onClick={() => removeSemester(index)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            aria-label="Remove semester"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            SGPA
                          </label>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            max="10"
                            placeholder="8.5"
                            value={semester.sgpa}
                            onChange={(e) => updateSemester(index, 'sgpa', e.target.value)}
                            className="text-center font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Credits
                          </label>
                          <Input
                            type="number"
                            step="1"
                            min="1"
                            placeholder="20"
                            value={semester.credits}
                            onChange={(e) => updateSemester(index, 'credits', e.target.value)}
                            className="text-center font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={addSemester}
                  variant="outline"
                  className="w-full mt-4 border-2 border-dashed border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Semester
                </Button>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate CGPA
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="px-6 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Section (Right Side - 3 columns) */}
            <div className="lg:col-span-3">
              {result ? (
                <div className="space-y-6">
                  {/* CGPA Result Card */}
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4">Your Cumulative GPA (CGPA)</h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <p className="text-5xl font-bold text-center">{result.cgpa}</p>
                      <p className="text-center mt-2 text-indigo-100">out of 10.0</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-sm text-indigo-100">Grade</p>
                        <p className="text-lg font-bold">{result.grade}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-sm text-indigo-100">Percentage</p>
                        <p className="text-lg font-bold">{result.percentage}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Calculation Breakdown */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-indigo-600" />
                      Calculation Breakdown
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-indigo-50 rounded-xl p-4 border-2 border-indigo-100">
                        <p className="text-sm text-gray-600 mb-1">Total Credits</p>
                        <p className="text-2xl font-bold text-indigo-600">{result.totalCredits}</p>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-100">
                        <p className="text-sm text-gray-600 mb-1">Weighted Sum (SGPA × Credits)</p>
                        <p className="text-2xl font-bold text-purple-600">{result.weightedSum}</p>
                      </div>
                      <div className="bg-green-50 rounded-xl p-4 border-2 border-green-100">
                        <p className="text-sm text-gray-600 mb-1">Classification</p>
                        <p className="text-lg font-bold text-green-600">{result.classification}</p>
                      </div>
                    </div>
                  </div>

                  {/* Formula Card */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Formula Used</h3>
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200">
                      <div className="text-center mb-4">
                        <p className="text-lg font-bold text-gray-800 mb-4">CGPA Formula:</p>
                        <div className="text-2xl font-bold text-indigo-700 mb-2">
                          <span>CGPA = </span>
                          <span className="inline-flex flex-col items-center mx-2">
                            <span className="border-b-2 border-gray-900 pb-1 px-2">
                              Σ(SGPA<sub>i</sub> × Credits<sub>i</sub>)
                            </span>
                            <span className="mt-1">Σ Credits<sub>i</sub></span>
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-4">Where Σ (sigma) means "sum of all"</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 mt-4">
                        <p className="font-semibold text-gray-800 mb-2">For your semesters:</p>
                        <p className="text-sm font-mono text-gray-700">
                          CGPA = {result.weightedSum} ÷ {result.totalCredits} = {result.cgpa}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step-by-Step Solution */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Step-by-Step Calculation
                    </h3>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                          1
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">Multiply each SGPA by its credits</p>
                          <div className="mt-2 space-y-1 text-sm text-gray-700">
                            {semesters.map((sem, idx) => {
                              const sgpaVal = parseFloat(sem.sgpa);
                              const creditsVal = parseFloat(sem.credits);
                              const product = sgpaVal * creditsVal;
                              return (
                                <p key={idx}>
                                  Semester {idx + 1}: {sgpaVal} × {creditsVal} = {product.toFixed(2)}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                          2
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">Add all products (Weighted Sum)</p>
                          <p className="mt-2 text-sm text-gray-700">
                            {semesters.map((sem, idx) => {
                              const sgpaVal = parseFloat(sem.sgpa);
                              const creditsVal = parseFloat(sem.credits);
                              return (sgpaVal * creditsVal).toFixed(2);
                            }).join(' + ')} = {result.weightedSum}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                          3
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">Add all credits (Total Credits)</p>
                          <p className="mt-2 text-sm text-gray-700">
                            {semesters.map((sem) => sem.credits).join(' + ')} = {result.totalCredits}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                          4
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">Divide Weighted Sum by Total Credits</p>
                          <p className="mt-2 text-sm text-gray-700">
                            CGPA = {result.weightedSum} ÷ {result.totalCredits} = <span className="font-bold text-indigo-600">{result.cgpa}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Enter your semester SGPAs and credits, then click Calculate to see your CGPA
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Understanding SGPA and CGPA */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-indigo-600" />
                Understanding SGPA and CGPA
              </h2>

              <div className="prose max-w-none">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border-2 border-indigo-200">
                  <h3 className="text-2xl font-bold text-indigo-800 mb-4">What is SGPA?</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <strong>SGPA (Semester Grade Point Average)</strong> is the average of grade points obtained in all courses during a particular semester. It represents your academic performance for that specific semester only. SGPA is calculated by taking the weighted average of grade points, where the weights are the credit hours of each course.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-200">
                  <h3 className="text-2xl font-bold text-purple-800 mb-4">What is CGPA?</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <strong>CGPA (Cumulative Grade Point Average)</strong> is the overall average of grade points obtained across all semesters from the beginning of your academic program. It represents your cumulative academic performance throughout your entire course duration. CGPA gives a comprehensive view of a student's overall academic achievement.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-blue-800 mb-4">Key Difference</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    The main difference is that <strong>SGPA</strong> is calculated for each semester individually, while <strong>CGPA</strong> is the weighted average of all semester SGPAs, taking into account the credits of each semester. CGPA provides a holistic picture of your academic journey, while SGPA shows your performance in a specific semester.
                  </p>
                </div>
              </div>
            </section>

            {/* Formula and Calculation Method */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                SGPA to CGPA Conversion Formula
              </h2>

              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-8 mb-6">
                <h3 className="text-2xl font-bold mb-6 text-center">Credit-Weighted CGPA Formula</h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-4">
                    <span>CGPA = </span>
                    <span className="inline-flex flex-col items-center mx-2">
                      <span className="border-b-2 border-white pb-2 px-4">
                        (SGPA<sub>1</sub> × C<sub>1</sub>) + (SGPA<sub>2</sub> × C<sub>2</sub>) + ... + (SGPA<sub>n</sub> × C<sub>n</sub>)
                      </span>
                      <span className="mt-2">C<sub>1</sub> + C<sub>2</sub> + ... + C<sub>n</sub></span>
                    </span>
                  </div>
                  <div className="text-indigo-100 space-y-2 mt-6">
                    <p><strong>Where:</strong></p>
                    <p>SGPA<sub>1</sub>, SGPA<sub>2</sub>, ..., SGPA<sub>n</sub> = SGPA of each semester</p>
                    <p>C<sub>1</sub>, C<sub>2</sub>, ..., C<sub>n</sub> = Total credits of each semester</p>
                    <p>n = Total number of semesters</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Simplified Formula (Equal Credits)</h3>
                <p className="text-gray-700 mb-4">
                  If all semesters have the <strong>same number of credits</strong>, you can use this simplified formula:
                </p>
                <div className="bg-white rounded-lg p-4 border-2 border-indigo-200 text-center">
                  <p className="text-2xl font-bold text-indigo-700">
                    <span>CGPA = </span>
                    <span className="inline-flex flex-col items-center mx-2">
                      <span className="border-b-2 border-gray-900 pb-1 px-3">
                        SGPA<sub>1</sub> + SGPA<sub>2</sub> + ... + SGPA<sub>n</sub>
                      </span>
                      <span className="mt-1">n</span>
                    </span>
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-4 italic">
                  Note: This simplified formula only works when all semesters have identical credit hours. Always use the credit-weighted formula for accurate results when credits vary.
                </p>
              </div>
            </section>

            {/* How to Calculate CGPA from SGPA */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                How to Calculate CGPA from SGPA: Step-by-Step Guide
              </h2>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                <ol className="space-y-6">
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      1
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Collect All Semester Data</h3>
                      <p className="text-gray-700">
                        Gather the SGPA and total credits for each semester you want to include in the CGPA calculation. Make sure you have accurate values from your academic records or grade sheets.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      2
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Multiply SGPA by Credits</h3>
                      <p className="text-gray-700 mb-3">
                        For each semester, multiply the SGPA by the number of credits for that semester. This gives you the weighted grade points for each semester.
                      </p>
                      <div className="bg-white rounded-lg p-3 border border-blue-200">
                        <p className="text-sm font-mono text-gray-700">
                          Weighted Points<sub>semester</sub> = SGPA<sub>semester</sub> × Credits<sub>semester</sub>
                        </p>
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      3
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Sum All Weighted Points</h3>
                      <p className="text-gray-700">
                        Add up all the weighted points from step 2 to get the total weighted sum. This represents your cumulative weighted performance across all semesters.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      4
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Sum All Credits</h3>
                      <p className="text-gray-700">
                        Add up the total credits from all semesters. This is the total credit hours you've completed.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      5
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Divide to Get CGPA</h3>
                      <p className="text-gray-700 mb-3">
                        Divide the total weighted sum (from step 3) by the total credits (from step 4). The result is your CGPA.
                      </p>
                      <div className="bg-white rounded-lg p-3 border border-blue-200">
                        <p className="text-sm font-mono text-gray-700">
                          CGPA = Total Weighted Sum ÷ Total Credits
                        </p>
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* Comprehensive Examples */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Detailed Examples with Solutions
              </h2>

              {/* Example 1: 4 Semesters with Different Credits */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">Example 1: Four Semesters with Different Credits</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900 mb-3">Given Data:</p>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Semester</th>
                            <th className="text-center py-2">SGPA</th>
                            <th className="text-center py-2">Credits</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">Semester 1</td>
                            <td className="text-center py-2">8.5</td>
                            <td className="text-center py-2">20</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Semester 2</td>
                            <td className="text-center py-2">8.2</td>
                            <td className="text-center py-2">22</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Semester 3</td>
                            <td className="text-center py-2">8.7</td>
                            <td className="text-center py-2">24</td>
                          </tr>
                          <tr>
                            <td className="py-2">Semester 4</td>
                            <td className="text-center py-2">8.4</td>
                            <td className="text-center py-2">23</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-blue-100 rounded-lg p-4">
                    <p className="font-semibold text-blue-900 mb-3">Solution:</p>
                    <div className="space-y-3 text-gray-800">
                      <div>
                        <p className="font-medium mb-1">Step 1: Calculate weighted points for each semester</p>
                        <p className="text-sm font-mono ml-4">Sem 1: 8.5 × 20 = 170.0</p>
                        <p className="text-sm font-mono ml-4">Sem 2: 8.2 × 22 = 180.4</p>
                        <p className="text-sm font-mono ml-4">Sem 3: 8.7 × 24 = 208.8</p>
                        <p className="text-sm font-mono ml-4">Sem 4: 8.4 × 23 = 193.2</p>
                      </div>

                      <div>
                        <p className="font-medium mb-1">Step 2: Sum all weighted points</p>
                        <p className="text-sm font-mono ml-4">Total = 170.0 + 180.4 + 208.8 + 193.2 = 752.4</p>
                      </div>

                      <div>
                        <p className="font-medium mb-1">Step 3: Sum all credits</p>
                        <p className="text-sm font-mono ml-4">Total Credits = 20 + 22 + 24 + 23 = 89</p>
                      </div>

                      <div>
                        <p className="font-medium mb-1">Step 4: Calculate CGPA</p>
                        <p className="text-sm font-mono ml-4">CGPA = 752.4 ÷ 89 = 8.45</p>
                      </div>

                      <div className="bg-blue-600 text-white rounded-lg p-3 mt-4">
                        <p className="text-lg font-bold text-center">Final Answer: CGPA = 8.45</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Example 2: 6 Semesters (Full BTech) */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border-2 border-green-200">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Example 2: Complete BTech Program (6 Semesters)</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900 mb-3">Given Data:</p>
                    <div className="bg-white rounded-lg p-4 border border-green-200 overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-green-100">
                            <th className="text-left py-2 px-3">Semester</th>
                            <th className="text-center py-2 px-3">SGPA</th>
                            <th className="text-center py-2 px-3">Credits</th>
                            <th className="text-center py-2 px-3">Weighted Points</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { sem: 1, sgpa: 7.8, credits: 22, weighted: 171.6 },
                            { sem: 2, sgpa: 8.2, credits: 24, weighted: 196.8 },
                            { sem: 3, sgpa: 8.5, credits: 26, weighted: 221.0 },
                            { sem: 4, sgpa: 8.9, credits: 25, weighted: 222.5 },
                            { sem: 5, sgpa: 9.1, credits: 24, weighted: 218.4 },
                            { sem: 6, sgpa: 8.7, credits: 23, weighted: 200.1 },
                          ].map((row, idx) => (
                            <tr key={idx} className="border-b">
                              <td className="py-2 px-3">Semester {row.sem}</td>
                              <td className="text-center py-2 px-3">{row.sgpa}</td>
                              <td className="text-center py-2 px-3">{row.credits}</td>
                              <td className="text-center py-2 px-3 font-mono">{row.weighted}</td>
                            </tr>
                          ))}
                          <tr className="font-bold bg-green-50">
                            <td className="py-2 px-3">Total</td>
                            <td className="text-center py-2 px-3">-</td>
                            <td className="text-center py-2 px-3">144</td>
                            <td className="text-center py-2 px-3 font-mono">1230.4</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-green-100 rounded-lg p-4">
                    <p className="font-semibold text-green-900 mb-3">Calculation:</p>
                    <div className="space-y-2 text-gray-800">
                      <p className="text-sm font-mono">CGPA = Total Weighted Points ÷ Total Credits</p>
                      <p className="text-sm font-mono">CGPA = 1230.4 ÷ 144</p>
                      <p className="text-sm font-mono">CGPA = 8.54</p>

                      <div className="bg-green-600 text-white rounded-lg p-3 mt-4">
                        <p className="text-lg font-bold text-center">Final CGPA = 8.54</p>
                        <p className="text-center text-sm text-green-100 mt-1">
                          (Percentage ≈ 8.54 × 9.5 = 81.13%)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Example 3: Equal Credits Scenario */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-purple-800 mb-4">Example 3: Equal Credits (Simplified Calculation)</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900 mb-3">Given: All semesters have 20 credits each</p>
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <p className="mb-2">SGPA values: 7.5, 8.0, 8.5, 8.2</p>
                      <p>Credits per semester: 20 (all equal)</p>
                    </div>
                  </div>

                  <div className="bg-purple-100 rounded-lg p-4">
                    <p className="font-semibold text-purple-900 mb-3">Since credits are equal, use simplified formula:</p>
                    <div className="space-y-2 text-gray-800">
                      <p className="text-sm font-mono">CGPA = (7.5 + 8.0 + 8.5 + 8.2) ÷ 4</p>
                      <p className="text-sm font-mono">CGPA = 32.2 ÷ 4</p>
                      <p className="text-sm font-mono">CGPA = 8.05</p>

                      <div className="bg-white rounded-lg p-3 mt-3 border border-purple-300">
                        <p className="text-xs text-gray-600 mb-2">Verification with weighted formula:</p>
                        <p className="text-xs font-mono">= (7.5×20 + 8.0×20 + 8.5×20 + 8.2×20) ÷ (20+20+20+20)</p>
                        <p className="text-xs font-mono">= (150 + 160 + 170 + 164) ÷ 80</p>
                        <p className="text-xs font-mono">= 644 ÷ 80 = 8.05 ✓</p>
                      </div>

                      <div className="bg-purple-600 text-white rounded-lg p-3 mt-4">
                        <p className="text-lg font-bold text-center">CGPA = 8.05</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Example 4: 8 Semesters (Complete BTech) */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
                <h3 className="text-2xl font-bold text-amber-800 mb-4">Example 4: Full 8-Semester Engineering Degree</h3>
                <div className="space-y-4">
                  <p className="font-semibold text-gray-900">Calculate final CGPA for a complete 4-year BTech program:</p>

                  <div className="bg-white rounded-lg p-4 border border-amber-200 overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b bg-amber-100">
                          <th className="text-left py-2 px-2">Sem</th>
                          <th className="text-center py-2 px-2">SGPA</th>
                          <th className="text-center py-2 px-2">Credits</th>
                          <th className="text-center py-2 px-2">SGPA × Credits</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { sem: 1, sgpa: 7.6, credits: 21 },
                          { sem: 2, sgpa: 8.1, credits: 23 },
                          { sem: 3, sgpa: 8.4, credits: 24 },
                          { sem: 4, sgpa: 8.7, credits: 26 },
                          { sem: 5, sgpa: 8.9, credits: 25 },
                          { sem: 6, sgpa: 9.0, credits: 24 },
                          { sem: 7, sgpa: 8.8, credits: 22 },
                          { sem: 8, sgpa: 9.2, credits: 20 },
                        ].map((row, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="py-2 px-2">{row.sem}</td>
                            <td className="text-center py-2 px-2">{row.sgpa}</td>
                            <td className="text-center py-2 px-2">{row.credits}</td>
                            <td className="text-center py-2 px-2 font-mono">{(row.sgpa * row.credits).toFixed(1)}</td>
                          </tr>
                        ))}
                        <tr className="font-bold bg-amber-50">
                          <td className="py-2 px-2" colSpan={2}>Total</td>
                          <td className="text-center py-2 px-2">185</td>
                          <td className="text-center py-2 px-2 font-mono">1603.8</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-amber-100 rounded-lg p-4">
                    <p className="font-semibold text-amber-900 mb-2">Final Calculation:</p>
                    <p className="text-sm font-mono text-gray-800">CGPA = 1603.8 ÷ 185 = <span className="font-bold text-amber-700">8.67</span></p>
                    <div className="bg-amber-600 text-white rounded-lg p-3 mt-3">
                      <p className="text-center font-bold">Overall CGPA = 8.67</p>
                      <p className="text-center text-sm text-amber-100 mt-1">Grade: A+ (Excellent)</p>
                      <p className="text-center text-sm text-amber-100">Percentage ≈ 82.37%</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Conversion Tables */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-indigo-600" />
                SGPA to CGPA Conversion Tables
              </h2>

              {/* 2 Semesters Table */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-indigo-700 mb-4">2 Semesters (20 Credits Each)</h3>
                <div className="overflow-x-auto bg-white rounded-xl shadow-lg border-2 border-indigo-100">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                        <th className="py-3 px-4 text-left">Sem 1 SGPA</th>
                        <th className="py-3 px-4 text-left">Sem 2 SGPA</th>
                        <th className="py-3 px-4 text-left">CGPA</th>
                        <th className="py-3 px-4 text-left">Grade</th>
                        <th className="py-3 px-4 text-left">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { s1: 9.0, s2: 9.0, cgpa: 9.00, grade: 'O', pct: 85.5 },
                        { s1: 8.5, s2: 8.5, cgpa: 8.50, grade: 'A+', pct: 80.75 },
                        { s1: 8.0, s2: 8.2, cgpa: 8.10, grade: 'A+', pct: 76.95 },
                        { s1: 7.5, s2: 8.0, cgpa: 7.75, grade: 'A', pct: 73.63 },
                        { s1: 7.0, s2: 7.5, cgpa: 7.25, grade: 'A', pct: 68.88 },
                        { s1: 6.5, s2: 7.0, cgpa: 6.75, grade: 'B+', pct: 64.13 },
                        { s1: 6.0, s2: 6.5, cgpa: 6.25, grade: 'B+', pct: 59.38 },
                      ].map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4">{row.s1}</td>
                          <td className="py-3 px-4">{row.s2}</td>
                          <td className="py-3 px-4 font-bold text-indigo-600">{row.cgpa.toFixed(2)}</td>
                          <td className="py-3 px-4 font-semibold">{row.grade}</td>
                          <td className="py-3 px-4">{row.pct}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4 Semesters Table */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-purple-700 mb-4">4 Semesters (Variable Credits)</h3>
                <div className="overflow-x-auto bg-white rounded-xl shadow-lg border-2 border-purple-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        <th className="py-3 px-3 text-left">S1 (20c)</th>
                        <th className="py-3 px-3 text-left">S2 (22c)</th>
                        <th className="py-3 px-3 text-left">S3 (24c)</th>
                        <th className="py-3 px-3 text-left">S4 (23c)</th>
                        <th className="py-3 px-3 text-left">CGPA</th>
                        <th className="py-3 px-3 text-left">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { s1: 9.0, s2: 9.0, s3: 9.0, s4: 9.0, cgpa: 9.00 },
                        { s1: 8.5, s2: 8.7, s3: 8.9, s4: 8.6, cgpa: 8.68 },
                        { s1: 8.0, s2: 8.3, s3: 8.5, s4: 8.2, cgpa: 8.25 },
                        { s1: 7.5, s2: 7.8, s3: 8.0, s4: 7.7, cgpa: 7.75 },
                        { s1: 7.0, s2: 7.3, s3: 7.5, s4: 7.2, cgpa: 7.25 },
                      ].map((row, idx) => {
                        const totalCredits = 20 + 22 + 24 + 23;
                        const weightedSum = (row.s1 * 20) + (row.s2 * 22) + (row.s3 * 24) + (row.s4 * 23);
                        const actualCgpa = weightedSum / totalCredits;
                        const grade = actualCgpa >= 9.0 ? 'O' : actualCgpa >= 8.0 ? 'A+' : actualCgpa >= 7.0 ? 'A' : 'B+';

                        return (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="py-3 px-3">{row.s1}</td>
                            <td className="py-3 px-3">{row.s2}</td>
                            <td className="py-3 px-3">{row.s3}</td>
                            <td className="py-3 px-3">{row.s4}</td>
                            <td className="py-3 px-3 font-bold text-purple-600">{actualCgpa.toFixed(2)}</td>
                            <td className="py-3 px-3 font-semibold">{grade}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-3 italic">Note: 'c' denotes credits per semester</p>
              </div>

              {/* Quick Reference Table */}
              <div>
                <h3 className="text-2xl font-bold text-green-700 mb-4">Quick Reference: CGPA to Grade & Percentage</h3>
                <div className="overflow-x-auto bg-white rounded-xl shadow-lg border-2 border-green-100">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                        <th className="py-3 px-4 text-left">CGPA Range</th>
                        <th className="py-3 px-4 text-left">Grade</th>
                        <th className="py-3 px-4 text-left">Description</th>
                        <th className="py-3 px-4 text-left">Percentage Range</th>
                        <th className="py-3 px-4 text-left">Classification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { cgpa: '9.0 - 10.0', grade: 'O', desc: 'Outstanding', pct: '85.5% - 95%', class: 'First Class with Distinction' },
                        { cgpa: '8.0 - 8.9', grade: 'A+', desc: 'Excellent', pct: '76% - 85.4%', class: 'First Class with Distinction' },
                        { cgpa: '7.0 - 7.9', grade: 'A', desc: 'Very Good', pct: '66.5% - 75.9%', class: 'First Class' },
                        { cgpa: '6.0 - 6.9', grade: 'B+', desc: 'Good', pct: '57% - 66.4%', class: 'Second Class' },
                        { cgpa: '5.0 - 5.9', grade: 'B', desc: 'Above Average', pct: '47.5% - 56.9%', class: 'Second Class' },
                        { cgpa: '4.0 - 4.9', grade: 'C', desc: 'Average', pct: '38% - 47.4%', class: 'Pass Class' },
                        { cgpa: 'Below 4.0', grade: 'F', desc: 'Fail', pct: 'Below 38%', class: 'Fail' },
                      ].map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4 font-bold text-green-700">{row.cgpa}</td>
                          <td className="py-3 px-4 font-semibold">{row.grade}</td>
                          <td className="py-3 px-4">{row.desc}</td>
                          <td className="py-3 px-4">{row.pct}</td>
                          <td className="py-3 px-4 text-sm">{row.class}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* CGPA to Percentage Conversion */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Converting CGPA to Percentage
              </h2>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200 mb-6">
                <h3 className="text-2xl font-bold text-indigo-800 mb-4">Standard Conversion Formulas</h3>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-5 border-2 border-indigo-200">
                    <h4 className="font-bold text-lg text-gray-900 mb-3">For 10-Point Scale (CBSE, Most Indian Universities):</h4>
                    <div className="text-center bg-indigo-100 rounded-lg p-4">
                      <p className="text-2xl font-bold text-indigo-700">
                        Percentage = CGPA × 9.5
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      Example: CGPA 8.5 = 8.5 × 9.5 = 80.75%
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border-2 border-purple-200">
                    <h4 className="font-bold text-lg text-gray-900 mb-3">For 4-Point Scale (GPA - International):</h4>
                    <div className="text-center bg-purple-100 rounded-lg p-4">
                      <p className="text-2xl font-bold text-purple-700">
                        <span>Percentage = </span>
                        <span className="inline-flex flex-col items-center mx-1">
                          <span className="border-b-2 border-gray-900 pb-1 px-2">GPA</span>
                          <span className="mt-1">4.0</span>
                        </span>
                        <span> × 100</span>
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      Example: GPA 3.5 = (3.5 ÷ 4.0) × 100 = 87.5%
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border-2 border-blue-200">
                    <h4 className="font-bold text-lg text-gray-900 mb-3">Alternative Formula (Some Universities):</h4>
                    <div className="text-center bg-blue-100 rounded-lg p-4">
                      <p className="text-2xl font-bold text-blue-700">
                        Percentage = (CGPA − 0.5) × 10
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      Example: CGPA 8.5 = (8.5 − 0.5) × 10 = 80%
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-lg p-4 mt-6 border-2 border-amber-200">
                  <p className="text-sm text-amber-900">
                    <strong>⚠️ Important:</strong> Different universities may use different conversion formulas. Always check with your university's official guidelines for the most accurate conversion method.
                  </p>
                </div>
              </div>
            </section>

            {/* Different Grading Systems */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                University-Specific Grading Systems
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* CBSE/VTU System */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">CBSE / VTU (10-Point Scale)</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span>9.0 - 10.0</span>
                      <span className="font-bold">O (Outstanding)</span>
                    </div>
                    <div className="flex justify-between bg-blue-50 p-2 rounded">
                      <span>8.0 - 8.9</span>
                      <span className="font-bold">A+ (Excellent)</span>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span>7.0 - 7.9</span>
                      <span className="font-bold">A (Very Good)</span>
                    </div>
                    <div className="flex justify-between bg-blue-50 p-2 rounded">
                      <span>6.0 - 6.9</span>
                      <span className="font-bold">B+ (Good)</span>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span>5.0 - 5.9</span>
                      <span className="font-bold">B (Above Avg)</span>
                    </div>
                    <div className="flex justify-between bg-blue-50 p-2 rounded">
                      <span>4.0 - 4.9</span>
                      <span className="font-bold">C (Average)</span>
                    </div>
                  </div>
                </div>

                {/* Anna University System */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <h3 className="text-xl font-bold text-green-800 mb-4">Anna University (10-Point Scale)</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span>9.0 - 10.0</span>
                      <span className="font-bold">S (Outstanding)</span>
                    </div>
                    <div className="flex justify-between bg-green-50 p-2 rounded">
                      <span>8.5 - 8.9</span>
                      <span className="font-bold">A+ (Excellent)</span>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span>7.5 - 8.4</span>
                      <span className="font-bold">A (Very Good)</span>
                    </div>
                    <div className="flex justify-between bg-green-50 p-2 rounded">
                      <span>6.5 - 7.4</span>
                      <span className="font-bold">B+ (Good)</span>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span>6.0 - 6.4</span>
                      <span className="font-bold">B (Above Avg)</span>
                    </div>
                    <div className="flex justify-between bg-green-50 p-2 rounded">
                      <span>5.5 - 5.9</span>
                      <span className="font-bold">C (Average)</span>
                    </div>
                  </div>
                </div>

                {/* IIT System */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                  <h3 className="text-xl font-bold text-purple-800 mb-4">IIT (10-Point Scale)</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span>9.0 - 10.0</span>
                      <span className="font-bold">A+ (Excellent)</span>
                    </div>
                    <div className="flex justify-between bg-purple-50 p-2 rounded">
                      <span>8.0 - 8.9</span>
                      <span className="font-bold">A (Very Good)</span>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span>7.0 - 7.9</span>
                      <span className="font-bold">B+ (Good)</span>
                    </div>
                    <div className="flex justify-between bg-purple-50 p-2 rounded">
                      <span>6.0 - 6.9</span>
                      <span className="font-bold">B (Fair)</span>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span>5.0 - 5.9</span>
                      <span className="font-bold">C (Satisfactory)</span>
                    </div>
                    <div className="flex justify-between bg-purple-50 p-2 rounded">
                      <span>4.0 - 4.9</span>
                      <span className="font-bold">D (Pass)</span>
                    </div>
                  </div>
                </div>

                {/* International GPA System */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
                  <h3 className="text-xl font-bold text-amber-800 mb-4">US Universities (4.0 Scale)</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span>3.7 - 4.0</span>
                      <span className="font-bold">A (Excellent)</span>
                    </div>
                    <div className="flex justify-between bg-amber-50 p-2 rounded">
                      <span>3.3 - 3.6</span>
                      <span className="font-bold">A- (Very Good)</span>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span>3.0 - 3.2</span>
                      <span className="font-bold">B+ (Good)</span>
                    </div>
                    <div className="flex justify-between bg-amber-50 p-2 rounded">
                      <span>2.7 - 2.9</span>
                      <span className="font-bold">B (Above Avg)</span>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span>2.3 - 2.6</span>
                      <span className="font-bold">B- (Average)</span>
                    </div>
                    <div className="flex justify-between bg-amber-50 p-2 rounded">
                      <span>2.0 - 2.2</span>
                      <span className="font-bold">C+ (Fair)</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Common Mistakes */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Common Mistakes to Avoid
              </h2>

              <div className="space-y-4">
                <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-red-800 mb-3">❌ Mistake 1: Ignoring Credit Weights</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-red-700 mb-2">Wrong: Simple Average</p>
                      <div className="bg-white rounded p-3 text-sm">
                        <p>Sem 1: 8.0 (20 credits)</p>
                        <p>Sem 2: 9.0 (24 credits)</p>
                        <p className="mt-2 text-red-600 font-bold">CGPA = (8.0 + 9.0) ÷ 2 = 8.5 ❌</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-green-700 mb-2">Correct: Weighted Average</p>
                      <div className="bg-white rounded p-3 text-sm">
                        <p>Weighted sum = (8.0×20) + (9.0×24) = 376</p>
                        <p>Total credits = 20 + 24 = 44</p>
                        <p className="mt-2 text-green-600 font-bold">CGPA = 376 ÷ 44 = 8.55 ✓</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-red-800 mb-3">❌ Mistake 2: Wrong Percentage Conversion</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-red-700 mb-2">Wrong Formula</p>
                      <div className="bg-white rounded p-3 text-sm">
                        <p>CGPA = 8.5</p>
                        <p className="mt-2 text-red-600 font-bold">Percentage = 8.5 × 10 = 85% ❌</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-green-700 mb-2">Correct Formula</p>
                      <div className="bg-white rounded p-3 text-sm">
                        <p>CGPA = 8.5</p>
                        <p className="mt-2 text-green-600 font-bold">Percentage = 8.5 × 9.5 = 80.75% ✓</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-red-800 mb-3">❌ Mistake 3: Including Failed Semesters Incorrectly</h3>
                  <p className="text-gray-700 mb-3">
                    If you failed a semester and repeated it, you should only include the SGPA from the semester you passed (usually the better grade). Don't average both attempts.
                  </p>
                  <div className="bg-white rounded p-3 text-sm">
                    <p className="text-red-600">❌ Wrong: Including both 2.5 (failed) and 7.0 (passed)</p>
                    <p className="text-green-600 mt-2">✓ Correct: Use only 7.0 (the passing attempt)</p>
                  </div>
                </div>

                <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-red-800 mb-3">❌ Mistake 4: Rounding Too Early</h3>
                  <p className="text-gray-700 mb-3">
                    Don't round intermediate calculations. Only round the final CGPA result.
                  </p>
                  <div className="bg-white rounded p-3 text-sm">
                    <p className="text-red-600">❌ Wrong: Rounding weighted sums before division</p>
                    <p className="text-green-600 mt-2">✓ Correct: Keep full precision until the final step</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Tips for Improving CGPA */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Tips for Improving Your CGPA
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-3">Focus on High-Credit Courses</h3>
                  <p className="text-gray-700">
                    Courses with more credits have a greater impact on your CGPA. Prioritize studying for these subjects to maximize your grade improvement.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-800 mb-3">Consistent Performance</h3>
                  <p className="text-gray-700">
                    Maintaining steady grades across all semesters is better than excelling in one semester and performing poorly in another.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-purple-800 mb-3">Early Improvement</h3>
                  <p className="text-gray-700">
                    CGPA is cumulative, so improving your grades in earlier semesters has more impact than in later semesters. Start strong!
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
                  <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold">4</span>
                  </div>
                  <h3 className="text-xl font-bold text-amber-800 mb-3">Retake if Possible</h3>
                  <p className="text-gray-700">
                    If your university allows, consider retaking courses where you scored poorly. The improved grade can significantly boost your CGPA.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions (FAQs)
              </h2>

              <div className="space-y-4">
                {/* FAQ 1 */}
                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6 hover:border-indigo-300 transition-colors">
                  <h3 className="text-lg font-bold text-indigo-800 mb-3">
                    Q1: What is the difference between SGPA and CGPA?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    SGPA (Semester Grade Point Average) is the average grade point for a single semester, while CGPA (Cumulative Grade Point Average) is the overall average of all semesters combined. SGPA measures performance for one semester, whereas CGPA represents your entire academic performance from the start of your program.
                  </p>
                </div>

                {/* FAQ 2 */}
                <div className="bg-white border-2 border-purple-100 rounded-xl p-6 hover:border-purple-300 transition-colors">
                  <h3 className="text-lg font-bold text-purple-800 mb-3">
                    Q2: How is CGPA calculated from SGPA?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    CGPA is calculated using a credit-weighted average. Multiply each semester's SGPA by its total credits, sum all these products, then divide by the total credits of all semesters. Formula: CGPA = Σ(SGPA × Credits) ÷ Σ(Credits). This ensures that semesters with more credits have proportionally more impact on your CGPA.
                  </p>
                </div>

                {/* FAQ 3 */}
                <div className="bg-white border-2 border-green-100 rounded-xl p-6 hover:border-green-300 transition-colors">
                  <h3 className="text-lg font-bold text-green-800 mb-3">
                    Q3: Can I calculate CGPA by simply averaging all SGPAs?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Only if all semesters have the exact same number of credits. If credits vary between semesters (which is common), you must use the weighted formula. Simply averaging SGPAs will give an incorrect result when credit hours differ. Always use the credit-weighted calculation for accuracy.
                  </p>
                </div>

                {/* FAQ 4 */}
                <div className="bg-white border-2 border-blue-100 rounded-xl p-6 hover:border-blue-300 transition-colors">
                  <h3 className="text-lg font-bold text-blue-800 mb-3">
                    Q4: How do I convert CGPA to percentage?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    For most Indian universities using a 10-point scale, use the formula: Percentage = CGPA × 9.5. For example, a CGPA of 8.0 equals 76%. However, conversion formulas can vary by university - CBSE uses ×9.5, some universities use (CGPA-0.5)×10, and international 4.0 scale uses (GPA÷4.0)×100. Always check your institution's official conversion method.
                  </p>
                </div>

                {/* FAQ 5 */}
                <div className="bg-white border-2 border-amber-100 rounded-xl p-6 hover:border-amber-300 transition-colors">
                  <h3 className="text-lg font-bold text-amber-800 mb-3">
                    Q5: What is a good CGPA for engineering students?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    For engineering students in India: 9.0+ is outstanding and opens doors to top companies and higher education; 8.0-8.9 is excellent and highly competitive for good placements; 7.0-7.9 is very good and acceptable for most companies; 6.0-6.9 is good and meets most placement criteria; 5.0-5.9 is average. Most reputed companies have a cutoff around 6.5-7.0 CGPA.
                  </p>
                </div>

                {/* FAQ 6 */}
                <div className="bg-white border-2 border-pink-100 rounded-xl p-6 hover:border-pink-300 transition-colors">
                  <h3 className="text-lg font-bold text-pink-800 mb-3">
                    Q6: Does CGPA matter for higher studies and jobs?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Yes, significantly. For higher studies (MS, MBA, PhD), universities often have minimum CGPA requirements (typically 7.0-8.0 for good programs). For campus placements, many companies set CGPA cutoffs (usually 6.0-7.5). However, CGPA is just one factor - projects, internships, skills, and interviews are equally important. A lower CGPA can be compensated with strong practical experience and skills.
                  </p>
                </div>

                {/* FAQ 7 */}
                <div className="bg-white border-2 border-teal-100 rounded-xl p-6 hover:border-teal-300 transition-colors">
                  <h3 className="text-lg font-bold text-teal-800 mb-3">
                    Q7: How can I improve my CGPA in later semesters?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    While it's harder to significantly improve CGPA in later semesters (since more credits are already counted), you can: 1) Score high in high-credit courses, 2) Maintain consistent 9.0+ SGPAs in remaining semesters, 3) Check if your university allows course retakes to replace poor grades, 4) Focus on core subjects with more credits, 5) Consider taking additional electives if it helps your average. Even small improvements compound over time.
                  </p>
                </div>

                {/* FAQ 8 */}
                <div className="bg-white border-2 border-red-100 rounded-xl p-6 hover:border-red-300 transition-colors">
                  <h3 className="text-lg font-bold text-red-800 mb-3">
                    Q8: What happens to CGPA if I fail a subject?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    If you fail a subject, it typically receives 0 grade points, which significantly impacts your SGPA for that semester and consequently your CGPA. When you retake and pass the course, universities usually either: 1) Replace the F grade with your new grade, or 2) Average both attempts. Check your university's policy. To minimize damage, retake failed courses as soon as possible and aim for the highest grade you can achieve.
                  </p>
                </div>

                {/* FAQ 9 */}
                <div className="bg-white border-2 border-cyan-100 rounded-xl p-6 hover:border-cyan-300 transition-colors">
                  <h3 className="text-lg font-bold text-cyan-800 mb-3">
                    Q9: Are credits the same as credit hours?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Yes, "credits" and "credit hours" are generally the same and used interchangeably in most universities. They represent the weightage or importance of a course, typically based on the number of hours of instruction per week. A 3-credit course usually means 3 hours of class per week. Some universities also use "credit points" or "units" - these all refer to the same concept for CGPA calculation purposes.
                  </p>
                </div>

                {/* FAQ 10 */}
                <div className="bg-white border-2 border-violet-100 rounded-xl p-6 hover:border-violet-300 transition-colors">
                  <h3 className="text-lg font-bold text-violet-800 mb-3">
                    Q10: How do backlog subjects affect CGPA calculation?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Backlogs (failed subjects carried forward) affect CGPA by contributing 0 grade points until cleared. Once you pass the backlog subject in a later semester: 1) The 0 is usually replaced with your passing grade, 2) Your CGPA is recalculated with the new grade, 3) Some universities count the credits in the semester you cleared it, not the original semester. This can improve your CGPA. Having active backlogs also often disqualifies you from campus placements regardless of CGPA.
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Conclusion</h2>
                <p className="text-lg md:text-xl text-indigo-100 leading-relaxed mb-6">
                  Understanding how to calculate CGPA from SGPA is essential for tracking your academic progress throughout your college or university journey. The credit-weighted formula ensures that each semester contributes proportionally to your overall performance, giving you an accurate representation of your cumulative achievement.
                </p>
                <p className="text-lg md:text-xl text-indigo-100 leading-relaxed mb-6">
                  Remember that CGPA is more than just a number - it reflects your dedication, consistency, and academic growth over time. Use our SGPA to CGPA calculator to plan your academic goals, track your progress, and understand how your performance in each semester affects your overall standing.
                </p>
                <p className="text-lg md:text-xl text-indigo-100 leading-relaxed">
                  Whether you're aiming for top placements, higher education abroad, or simply want to monitor your academic performance, this calculator and comprehensive guide provide all the tools and knowledge you need to succeed. Keep striving for excellence!
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Book Your Session CTA */}
      <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Need Help with Academic Planning & Grade Improvement?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you understand CGPA calculations, improve your grades, and develop effective study strategies. Get personalized one-on-one guidance tailored to your academic goals.
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

      <Footer />
    </div>
  );
}
