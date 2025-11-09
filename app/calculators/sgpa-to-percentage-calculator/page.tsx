'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Home, BookOpen, ArrowRight, Award, TrendingUp, Percent, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function SGPAToPercentageCalculator() {
  const [sgpa, setSgpa] = useState<string>('8.5');
  const [scale, setScale] = useState<string>('10');
  const [conversionMethod, setConversionMethod] = useState<string>('cbse');
  const [result, setResult] = useState<{
    sgpa: number;
    percentage: number;
    scale: number;
    method: string;
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
    const sgpaValue = parseFloat(sgpa);
    const scaleValue = parseFloat(scale);

    if (isNaN(sgpaValue) || sgpaValue < 0) {
      alert('Please enter a valid SGPA value.');
      return;
    }

    if (sgpaValue > scaleValue) {
      alert(`SGPA cannot be greater than the scale (${scaleValue}).`);
      return;
    }

    let percentage: number;
    let methodName: string;

    // Different conversion methods
    if (scaleValue === 10) {
      switch (conversionMethod) {
        case 'cbse':
          // CBSE Formula: Percentage = SGPA × 9.5
          percentage = sgpaValue * 9.5;
          methodName = 'CBSE Formula (SGPA × 9.5)';
          break;
        case 'vtu':
          // VTU Formula: Percentage = (SGPA - 0.75) × 10
          percentage = (sgpaValue - 0.75) * 10;
          methodName = 'VTU Formula ((SGPA - 0.75) × 10)';
          break;
        case 'anna':
          // Anna University: Percentage = SGPA × 10 - 7.5
          percentage = sgpaValue * 10 - 7.5;
          methodName = 'Anna University Formula (SGPA × 10 - 7.5)';
          break;
        case 'mumbai':
          // Mumbai University: Percentage = 7.1 × SGPA + 11
          percentage = 7.1 * sgpaValue + 11;
          methodName = 'Mumbai University Formula (7.1 × SGPA + 11)';
          break;
        case 'generic':
          // Generic: Percentage = (SGPA / 10) × 100
          percentage = (sgpaValue / scaleValue) * 100;
          methodName = 'Generic Formula ((SGPA ÷ 10) × 100)';
          break;
        default:
          percentage = sgpaValue * 9.5;
          methodName = 'CBSE Formula (SGPA × 9.5)';
      }
    } else if (scaleValue === 4) {
      // 4-Point Scale (GPA)
      percentage = (sgpaValue / 4) * 100;
      methodName = '4.0 Scale Formula ((GPA ÷ 4) × 100)';
    } else {
      // Generic formula for any scale
      percentage = (sgpaValue / scaleValue) * 100;
      methodName = `Generic Formula ((SGPA ÷ ${scaleValue}) × 100)`;
    }

    // Cap percentage at 100
    percentage = Math.min(percentage, 100);

    setResult({
      sgpa: sgpaValue,
      percentage: parseFloat(percentage.toFixed(2)),
      scale: scaleValue,
      method: methodName,
      grade: getGrade(percentage),
      classification: getClassification(percentage),
    });
  };

  const handleReset = () => {
    setSgpa('8.5');
    setScale('10');
    setConversionMethod('cbse');
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
            <span className="text-gray-900 font-medium">SGPA to Percentage Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Percent className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              SGPA to Percentage Calculator
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Convert your Semester Grade Point Average (SGPA) to percentage instantly with multiple university-specific formulas. Supports CBSE, VTU, Anna University, Mumbai University, and more.
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
                  Enter Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Your SGPA
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      placeholder="8.5"
                      value={sgpa}
                      onChange={(e) => setSgpa(e.target.value)}
                      className="text-center text-lg font-medium"
                    />
                    <p className="text-xs text-gray-500 mt-2">Enter your semester GPA (0-10)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Grading Scale
                    </label>
                    <Select value={scale} onValueChange={setScale}>
                      <SelectTrigger className="text-center text-lg font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10-Point Scale</SelectItem>
                        <SelectItem value="4">4-Point Scale (GPA)</SelectItem>
                        <SelectItem value="5">5-Point Scale</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-2">Select your university's scale</p>
                  </div>

                  {scale === '10' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Conversion Method
                      </label>
                      <Select value={conversionMethod} onValueChange={setConversionMethod}>
                        <SelectTrigger className="text-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cbse">CBSE (SGPA × 9.5)</SelectItem>
                          <SelectItem value="vtu">VTU ((SGPA - 0.75) × 10)</SelectItem>
                          <SelectItem value="anna">Anna University (SGPA × 10 - 7.5)</SelectItem>
                          <SelectItem value="mumbai">Mumbai University (7.1 × SGPA + 11)</SelectItem>
                          <SelectItem value="generic">Generic ((SGPA ÷ 10) × 100)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500 mt-2">Choose your university's formula</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-8">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate
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
                  {/* Percentage Result Card */}
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4">Your Percentage</h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <p className="text-5xl font-bold text-center">{result.percentage}%</p>
                      <p className="text-center mt-2 text-indigo-100">from SGPA {result.sgpa}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-sm text-indigo-100">Grade</p>
                        <p className="text-lg font-bold">{result.grade}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-sm text-indigo-100">Classification</p>
                        <p className="text-lg font-bold">{result.classification.split(' ').slice(0, 2).join(' ')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Formula Card */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-indigo-600" />
                      Formula Used
                    </h3>
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200">
                      <div className="text-center mb-4">
                        <p className="text-sm font-semibold text-gray-600 mb-2">Method:</p>
                        <p className="text-lg font-bold text-indigo-700">{result.method}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 mt-4">
                        <p className="font-semibold text-gray-800 mb-2">Calculation:</p>
                        {scale === '10' && conversionMethod === 'cbse' && (
                          <div className="space-y-2">
                            <p className="text-sm font-mono text-gray-700">
                              Percentage = SGPA × 9.5
                            </p>
                            <p className="text-sm font-mono text-gray-700">
                              Percentage = {result.sgpa} × 9.5
                            </p>
                            <p className="text-sm font-mono text-indigo-600 font-bold">
                              Percentage = {result.percentage}%
                            </p>
                          </div>
                        )}
                        {scale === '10' && conversionMethod === 'vtu' && (
                          <div className="space-y-2">
                            <p className="text-sm font-mono text-gray-700">
                              Percentage = (SGPA - 0.75) × 10
                            </p>
                            <p className="text-sm font-mono text-gray-700">
                              Percentage = ({result.sgpa} - 0.75) × 10
                            </p>
                            <p className="text-sm font-mono text-indigo-600 font-bold">
                              Percentage = {result.percentage}%
                            </p>
                          </div>
                        )}
                        {scale === '10' && conversionMethod === 'anna' && (
                          <div className="space-y-2">
                            <p className="text-sm font-mono text-gray-700">
                              Percentage = SGPA × 10 - 7.5
                            </p>
                            <p className="text-sm font-mono text-gray-700">
                              Percentage = {result.sgpa} × 10 - 7.5
                            </p>
                            <p className="text-sm font-mono text-indigo-600 font-bold">
                              Percentage = {result.percentage}%
                            </p>
                          </div>
                        )}
                        {scale === '10' && conversionMethod === 'mumbai' && (
                          <div className="space-y-2">
                            <p className="text-sm font-mono text-gray-700">
                              Percentage = 7.1 × SGPA + 11
                            </p>
                            <p className="text-sm font-mono text-gray-700">
                              Percentage = 7.1 × {result.sgpa} + 11
                            </p>
                            <p className="text-sm font-mono text-indigo-600 font-bold">
                              Percentage = {result.percentage}%
                            </p>
                          </div>
                        )}
                        {(scale === '4' || conversionMethod === 'generic') && (
                          <div className="space-y-2">
                            <p className="text-sm font-mono text-gray-700">
                              Percentage = (SGPA ÷ {result.scale}) × 100
                            </p>
                            <p className="text-sm font-mono text-gray-700">
                              Percentage = ({result.sgpa} ÷ {result.scale}) × 100
                            </p>
                            <p className="text-sm font-mono text-indigo-600 font-bold">
                              Percentage = {result.percentage}%
                            </p>
                          </div>
                        )}
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
                          <p className="font-semibold text-gray-900">Identify your SGPA</p>
                          <p className="text-gray-700 mt-1">Your SGPA = {result.sgpa}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                          2
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">Choose the appropriate formula</p>
                          <p className="text-gray-700 mt-1">{result.method}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                          3
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">Apply the formula</p>
                          <p className="text-gray-700 mt-1">
                            Calculate using the selected conversion method for your university
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                          4
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">Get your percentage</p>
                          <p className="text-gray-700 mt-1">
                            Your percentage = <span className="font-bold text-indigo-600">{result.percentage}%</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Indicator */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance Analysis</h3>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200">
                        <p className="text-sm text-gray-600 mb-1">Classification</p>
                        <p className="text-lg font-bold text-green-700">{result.classification}</p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-blue-200">
                        <p className="text-sm text-gray-600 mb-1">Letter Grade</p>
                        <p className="text-lg font-bold text-blue-700">{result.grade}</p>
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-purple-200">
                        <p className="text-sm text-gray-600 mb-1">Academic Standing</p>
                        <p className="text-lg font-bold text-purple-700">
                          {result.percentage >= 75 ? 'Excellent Performance' :
                           result.percentage >= 60 ? 'Good Performance' :
                           result.percentage >= 50 ? 'Average Performance' :
                           result.percentage >= 40 ? 'Below Average' : 'Needs Improvement'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Percent className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Enter your SGPA and select the conversion method to see your percentage
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

            {/* Understanding SGPA */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-indigo-600" />
                Understanding SGPA and Percentage Conversion
              </h2>

              <div className="prose max-w-none">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border-2 border-indigo-200">
                  <h3 className="text-2xl font-bold text-indigo-800 mb-4">What is SGPA?</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <strong>SGPA (Semester Grade Point Average)</strong> is a measure of a student's academic performance for a particular semester. It is calculated by taking the weighted average of grade points earned in all courses during that semester, where the weights are the credit hours of each course. SGPA provides a standardized way to evaluate academic achievement on a numerical scale, typically ranging from 0 to 10 in Indian universities.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-200">
                  <h3 className="text-2xl font-bold text-purple-800 mb-4">Why Convert SGPA to Percentage?</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Converting SGPA to percentage is important for several reasons:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Job Applications:</strong> Many companies require percentage marks instead of SGPA for eligibility criteria</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Higher Education:</strong> Some universities and competitive exams ask for percentage instead of SGPA</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Scholarship Applications:</strong> Percentage-based eligibility is common in scholarship programs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Better Understanding:</strong> Percentage is more familiar and easier to understand for most people</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-blue-800 mb-4">Key Points to Remember</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>Different universities use different conversion formulas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>Always check your university's official conversion method</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>CBSE uses SGPA × 9.5 as the standard formula</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>Conversion is only an approximation, not an exact science</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Conversion Formulas */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                SGPA to Percentage Conversion Formulas
              </h2>

              <div className="space-y-6">
                {/* CBSE Formula */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6">CBSE & Most Indian Universities</h3>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                    <p className="text-sm text-indigo-100 mb-3">Standard Formula:</p>
                    <div className="text-3xl md:text-4xl font-bold mb-4">
                      Percentage = SGPA × 9.5
                    </div>
                    <div className="text-indigo-100 mt-4">
                      <p className="mb-2"><strong>Example:</strong></p>
                      <p>If SGPA = 8.5, then Percentage = 8.5 × 9.5 = <strong>80.75%</strong></p>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-indigo-100">
                    <p><strong>Note:</strong> This is the most commonly used formula in India, recommended by CBSE and adopted by most central universities.</p>
                  </div>
                </div>

                {/* VTU Formula */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <h3 className="text-xl font-bold text-green-800 mb-4">VTU (Visvesvaraya Technological University)</h3>
                  <div className="bg-white rounded-lg p-5 border-2 border-green-300">
                    <div className="text-center mb-4">
                      <p className="text-2xl font-bold text-green-700">
                        Percentage = (SGPA − 0.75) × 10
                      </p>
                    </div>
                    <div className="bg-green-50 rounded p-3 mt-3">
                      <p className="text-sm font-semibold text-gray-800 mb-2">Example:</p>
                      <p className="text-sm text-gray-700">SGPA = 8.5</p>
                      <p className="text-sm text-gray-700">Percentage = (8.5 − 0.75) × 10 = 7.75 × 10 = <strong className="text-green-700">77.5%</strong></p>
                    </div>
                  </div>
                </div>

                {/* Anna University Formula */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">Anna University</h3>
                  <div className="bg-white rounded-lg p-5 border-2 border-blue-300">
                    <div className="text-center mb-4">
                      <p className="text-2xl font-bold text-blue-700">
                        Percentage = SGPA × 10 − 7.5
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded p-3 mt-3">
                      <p className="text-sm font-semibold text-gray-800 mb-2">Example:</p>
                      <p className="text-sm text-gray-700">SGPA = 8.5</p>
                      <p className="text-sm text-gray-700">Percentage = 8.5 × 10 − 7.5 = 85 − 7.5 = <strong className="text-blue-700">77.5%</strong></p>
                    </div>
                  </div>
                </div>

                {/* Mumbai University Formula */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                  <h3 className="text-xl font-bold text-purple-800 mb-4">Mumbai University</h3>
                  <div className="bg-white rounded-lg p-5 border-2 border-purple-300">
                    <div className="text-center mb-4">
                      <p className="text-2xl font-bold text-purple-700">
                        Percentage = 7.1 × SGPA + 11
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded p-3 mt-3">
                      <p className="text-sm font-semibold text-gray-800 mb-2">Example:</p>
                      <p className="text-sm text-gray-700">SGPA = 8.5</p>
                      <p className="text-sm text-gray-700">Percentage = 7.1 × 8.5 + 11 = 60.35 + 11 = <strong className="text-purple-700">71.35%</strong></p>
                    </div>
                  </div>
                </div>

                {/* Generic Formula */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
                  <h3 className="text-xl font-bold text-amber-800 mb-4">Generic Formula (All Scales)</h3>
                  <div className="bg-white rounded-lg p-5 border-2 border-amber-300">
                    <div className="text-center mb-4">
                      <p className="text-2xl font-bold text-amber-700">
                        <span>Percentage = </span>
                        <span className="inline-flex flex-col items-center mx-1">
                          <span className="border-b-2 border-gray-900 pb-1 px-2">SGPA</span>
                          <span className="mt-1">Scale</span>
                        </span>
                        <span> × 100</span>
                      </p>
                    </div>
                    <div className="bg-amber-50 rounded p-3 mt-3">
                      <p className="text-sm font-semibold text-gray-800 mb-2">Example (10-point scale):</p>
                      <p className="text-sm text-gray-700">SGPA = 8.5, Scale = 10</p>
                      <p className="text-sm text-gray-700">Percentage = (8.5 ÷ 10) × 100 = 0.85 × 100 = <strong className="text-amber-700">85%</strong></p>
                    </div>
                    <div className="bg-amber-50 rounded p-3 mt-3">
                      <p className="text-sm font-semibold text-gray-800 mb-2">Example (4-point scale):</p>
                      <p className="text-sm text-gray-700">GPA = 3.5, Scale = 4</p>
                      <p className="text-sm text-gray-700">Percentage = (3.5 ÷ 4) × 100 = 0.875 × 100 = <strong className="text-amber-700">87.5%</strong></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-6 mt-6 border-2 border-red-200">
                <p className="text-red-900 font-semibold mb-2">⚠️ Important Disclaimer:</p>
                <p className="text-red-800">
                  Different universities may have their own specific conversion formulas. The percentages calculated using these formulas are approximations and may vary from your university's official conversion. Always refer to your university's academic regulations for the exact conversion method used in official documents.
                </p>
              </div>
            </section>

            {/* Comprehensive Examples */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Detailed Conversion Examples
              </h2>

              {/* Example 1: CBSE Method */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">Example 1: CBSE Method (Standard)</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Given:</p>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <p>SGPA = 8.2</p>
                      <p>Scale = 10-point</p>
                      <p>University: CBSE/Most Indian Universities</p>
                    </div>
                  </div>

                  <div className="bg-blue-100 rounded-lg p-4">
                    <p className="font-semibold text-blue-900 mb-3">Solution:</p>
                    <div className="space-y-2 text-gray-800">
                      <p className="font-medium">Step 1: Identify the formula</p>
                      <p className="text-sm ml-4">Formula: Percentage = SGPA × 9.5</p>

                      <p className="font-medium mt-3">Step 2: Substitute the values</p>
                      <p className="text-sm ml-4">Percentage = 8.2 × 9.5</p>

                      <p className="font-medium mt-3">Step 3: Calculate</p>
                      <p className="text-sm ml-4">Percentage = 77.9</p>

                      <div className="bg-blue-600 text-white rounded-lg p-3 mt-4">
                        <p className="text-center font-bold text-lg">Final Answer: 77.9%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Example 2: VTU Method */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border-2 border-green-200">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Example 2: VTU Method</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Given:</p>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <p>SGPA = 9.0</p>
                      <p>Scale = 10-point</p>
                      <p>University: VTU (Karnataka)</p>
                    </div>
                  </div>

                  <div className="bg-green-100 rounded-lg p-4">
                    <p className="font-semibold text-green-900 mb-3">Solution:</p>
                    <div className="space-y-2 text-gray-800">
                      <p className="font-medium">Step 1: Use VTU formula</p>
                      <p className="text-sm ml-4">Formula: Percentage = (SGPA − 0.75) × 10</p>

                      <p className="font-medium mt-3">Step 2: Substitute values</p>
                      <p className="text-sm ml-4">Percentage = (9.0 − 0.75) × 10</p>

                      <p className="font-medium mt-3">Step 3: Simplify</p>
                      <p className="text-sm ml-4">Percentage = 8.25 × 10</p>

                      <p className="font-medium mt-3">Step 4: Calculate</p>
                      <p className="text-sm ml-4">Percentage = 82.5</p>

                      <div className="bg-green-600 text-white rounded-lg p-3 mt-4">
                        <p className="text-center font-bold text-lg">Final Answer: 82.5%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Example 3: 4-Point Scale */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-purple-800 mb-4">Example 3: International 4-Point Scale (GPA)</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Given:</p>
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <p>GPA = 3.7</p>
                      <p>Scale = 4-point (US/International)</p>
                    </div>
                  </div>

                  <div className="bg-purple-100 rounded-lg p-4">
                    <p className="font-semibold text-purple-900 mb-3">Solution:</p>
                    <div className="space-y-2 text-gray-800">
                      <p className="font-medium">Step 1: Use generic formula for 4-point scale</p>
                      <p className="text-sm ml-4">Formula: Percentage = (GPA ÷ 4) × 100</p>

                      <p className="font-medium mt-3">Step 2: Substitute values</p>
                      <p className="text-sm ml-4">Percentage = (3.7 ÷ 4) × 100</p>

                      <p className="font-medium mt-3">Step 3: Divide</p>
                      <p className="text-sm ml-4">Percentage = 0.925 × 100</p>

                      <p className="font-medium mt-3">Step 4: Calculate</p>
                      <p className="text-sm ml-4">Percentage = 92.5</p>

                      <div className="bg-purple-600 text-white rounded-lg p-3 mt-4">
                        <p className="text-center font-bold text-lg">Final Answer: 92.5%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Example 4: Mumbai University */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
                <h3 className="text-2xl font-bold text-amber-800 mb-4">Example 4: Mumbai University Method</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Given:</p>
                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                      <p>SGPA = 7.5</p>
                      <p>Scale = 10-point</p>
                      <p>University: Mumbai University</p>
                    </div>
                  </div>

                  <div className="bg-amber-100 rounded-lg p-4">
                    <p className="font-semibold text-amber-900 mb-3">Solution:</p>
                    <div className="space-y-2 text-gray-800">
                      <p className="font-medium">Step 1: Apply Mumbai University formula</p>
                      <p className="text-sm ml-4">Formula: Percentage = 7.1 × SGPA + 11</p>

                      <p className="font-medium mt-3">Step 2: Substitute SGPA value</p>
                      <p className="text-sm ml-4">Percentage = 7.1 × 7.5 + 11</p>

                      <p className="font-medium mt-3">Step 3: Multiply first</p>
                      <p className="text-sm ml-4">Percentage = 53.25 + 11</p>

                      <p className="font-medium mt-3">Step 4: Add</p>
                      <p className="text-sm ml-4">Percentage = 64.25</p>

                      <div className="bg-amber-600 text-white rounded-lg p-3 mt-4">
                        <p className="text-center font-bold text-lg">Final Answer: 64.25%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Conversion Tables */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-indigo-600" />
                SGPA to Percentage Conversion Tables
              </h2>

              {/* CBSE Table */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-indigo-700 mb-4">CBSE & Most Indian Universities (SGPA × 9.5)</h3>
                <div className="overflow-x-auto bg-white rounded-xl shadow-lg border-2 border-indigo-100">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                        <th className="py-3 px-4 text-left">SGPA</th>
                        <th className="py-3 px-4 text-left">Percentage</th>
                        <th className="py-3 px-4 text-left">Grade</th>
                        <th className="py-3 px-4 text-left">Classification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { sgpa: 10.0, pct: 95.0, grade: 'O', class: 'Outstanding' },
                        { sgpa: 9.5, pct: 90.25, grade: 'O', class: 'Outstanding' },
                        { sgpa: 9.0, pct: 85.5, grade: 'A+', class: 'Excellent' },
                        { sgpa: 8.5, pct: 80.75, grade: 'A+', class: 'Excellent' },
                        { sgpa: 8.0, pct: 76.0, grade: 'A', class: 'Very Good' },
                        { sgpa: 7.5, pct: 71.25, grade: 'A', class: 'Very Good' },
                        { sgpa: 7.0, pct: 66.5, grade: 'B+', class: 'Good' },
                        { sgpa: 6.5, pct: 61.75, grade: 'B', class: 'Above Average' },
                        { sgpa: 6.0, pct: 57.0, grade: 'B', class: 'Above Average' },
                        { sgpa: 5.5, pct: 52.25, grade: 'C', class: 'Average' },
                        { sgpa: 5.0, pct: 47.5, grade: 'C', class: 'Average' },
                        { sgpa: 4.5, pct: 42.75, grade: 'D', class: 'Pass' },
                        { sgpa: 4.0, pct: 38.0, grade: 'D', class: 'Pass' },
                      ].map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4 font-bold text-indigo-600">{row.sgpa.toFixed(1)}</td>
                          <td className="py-3 px-4 font-bold text-purple-600">{row.pct.toFixed(2)}%</td>
                          <td className="py-3 px-4 font-semibold">{row.grade}</td>
                          <td className="py-3 px-4">{row.class}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* VTU Table */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-green-700 mb-4">VTU Formula ((SGPA - 0.75) × 10)</h3>
                <div className="overflow-x-auto bg-white rounded-xl shadow-lg border-2 border-green-100">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                        <th className="py-3 px-4 text-left">SGPA</th>
                        <th className="py-3 px-4 text-left">Calculation</th>
                        <th className="py-3 px-4 text-left">Percentage</th>
                        <th className="py-3 px-4 text-left">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { sgpa: 10.0, calc: '(10.0 - 0.75) × 10', pct: 92.5, grade: 'O' },
                        { sgpa: 9.5, calc: '(9.5 - 0.75) × 10', pct: 87.5, grade: 'A+' },
                        { sgpa: 9.0, calc: '(9.0 - 0.75) × 10', pct: 82.5, grade: 'A+' },
                        { sgpa: 8.5, calc: '(8.5 - 0.75) × 10', pct: 77.5, grade: 'A' },
                        { sgpa: 8.0, calc: '(8.0 - 0.75) × 10', pct: 72.5, grade: 'A' },
                        { sgpa: 7.5, calc: '(7.5 - 0.75) × 10', pct: 67.5, grade: 'B+' },
                        { sgpa: 7.0, calc: '(7.0 - 0.75) × 10', pct: 62.5, grade: 'B' },
                        { sgpa: 6.5, calc: '(6.5 - 0.75) × 10', pct: 57.5, grade: 'B' },
                        { sgpa: 6.0, calc: '(6.0 - 0.75) × 10', pct: 52.5, grade: 'C' },
                      ].map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4 font-bold text-green-600">{row.sgpa.toFixed(1)}</td>
                          <td className="py-3 px-4 font-mono text-sm text-gray-600">{row.calc}</td>
                          <td className="py-3 px-4 font-bold text-emerald-600">{row.pct.toFixed(1)}%</td>
                          <td className="py-3 px-4 font-semibold">{row.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4-Point Scale Table */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-purple-700 mb-4">4-Point Scale (GPA ÷ 4) × 100</h3>
                <div className="overflow-x-auto bg-white rounded-xl shadow-lg border-2 border-purple-100">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        <th className="py-3 px-4 text-left">GPA (4.0 Scale)</th>
                        <th className="py-3 px-4 text-left">Percentage</th>
                        <th className="py-3 px-4 text-left">Letter Grade</th>
                        <th className="py-3 px-4 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { gpa: 4.0, pct: 100.0, grade: 'A+', desc: 'Exceptional' },
                        { gpa: 3.9, pct: 97.5, grade: 'A+', desc: 'Outstanding' },
                        { gpa: 3.8, pct: 95.0, grade: 'A', desc: 'Excellent' },
                        { gpa: 3.7, pct: 92.5, grade: 'A', desc: 'Excellent' },
                        { gpa: 3.5, pct: 87.5, grade: 'A-', desc: 'Very Good' },
                        { gpa: 3.3, pct: 82.5, grade: 'B+', desc: 'Good' },
                        { gpa: 3.0, pct: 75.0, grade: 'B', desc: 'Good' },
                        { gpa: 2.7, pct: 67.5, grade: 'B-', desc: 'Above Average' },
                        { gpa: 2.5, pct: 62.5, grade: 'C+', desc: 'Average' },
                        { gpa: 2.0, pct: 50.0, grade: 'C', desc: 'Average' },
                      ].map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4 font-bold text-purple-600">{row.gpa.toFixed(1)}</td>
                          <td className="py-3 px-4 font-bold text-pink-600">{row.pct.toFixed(1)}%</td>
                          <td className="py-3 px-4 font-semibold">{row.grade}</td>
                          <td className="py-3 px-4">{row.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Comparison Table */}
              <div>
                <h3 className="text-2xl font-bold text-blue-700 mb-4">Comparison: Different Conversion Methods</h3>
                <div className="overflow-x-auto bg-white rounded-xl shadow-lg border-2 border-blue-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                        <th className="py-3 px-3 text-left">SGPA</th>
                        <th className="py-3 px-3 text-left">CBSE (%)</th>
                        <th className="py-3 px-3 text-left">VTU (%)</th>
                        <th className="py-3 px-3 text-left">Anna (%)</th>
                        <th className="py-3 px-3 text-left">Mumbai (%)</th>
                        <th className="py-3 px-3 text-left">Generic (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { sgpa: 10.0 },
                        { sgpa: 9.0 },
                        { sgpa: 8.5 },
                        { sgpa: 8.0 },
                        { sgpa: 7.5 },
                        { sgpa: 7.0 },
                        { sgpa: 6.5 },
                        { sgpa: 6.0 },
                      ].map((row, idx) => {
                        const cbse = (row.sgpa * 9.5).toFixed(1);
                        const vtu = ((row.sgpa - 0.75) * 10).toFixed(1);
                        const anna = (row.sgpa * 10 - 7.5).toFixed(1);
                        const mumbai = (7.1 * row.sgpa + 11).toFixed(1);
                        const generic = ((row.sgpa / 10) * 100).toFixed(1);

                        return (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="py-3 px-3 font-bold text-blue-700">{row.sgpa.toFixed(1)}</td>
                            <td className="py-3 px-3">{cbse}%</td>
                            <td className="py-3 px-3">{vtu}%</td>
                            <td className="py-3 px-3">{anna}%</td>
                            <td className="py-3 px-3">{mumbai}%</td>
                            <td className="py-3 px-3">{generic}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-3 italic">
                  Note: Different universities use different formulas. Always check your university's official conversion method.
                </p>
              </div>
            </section>

            {/* Common Mistakes */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Common Mistakes to Avoid
              </h2>

              <div className="space-y-4">
                <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-red-800 mb-3">❌ Mistake 1: Using Wrong Formula</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-red-700 mb-2">Wrong: Using CBSE for VTU</p>
                      <div className="bg-white rounded p-3 text-sm">
                        <p>SGPA = 8.5 (VTU Student)</p>
                        <p className="mt-2 text-red-600 font-bold">Using CBSE: 8.5 × 9.5 = 80.75% ❌</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-green-700 mb-2">Correct: Using VTU Formula</p>
                      <div className="bg-white rounded p-3 text-sm">
                        <p>SGPA = 8.5 (VTU Student)</p>
                        <p className="mt-2 text-green-600 font-bold">Using VTU: (8.5-0.75)×10 = 77.5% ✓</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-3">
                    <strong>Tip:</strong> Always check which formula your university officially uses.
                  </p>
                </div>

                <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-red-800 mb-3">❌ Mistake 2: Confusing SGPA with CGPA</h3>
                  <p className="text-gray-700 mb-3">
                    SGPA is for one semester only, while CGPA is cumulative across all semesters. Make sure you're converting the right value. If you need overall percentage, first calculate CGPA from all SGPAs, then convert to percentage.
                  </p>
                  <div className="bg-white rounded p-3 text-sm">
                    <p className="text-red-600 mb-2">❌ Wrong: Converting each SGPA separately and averaging</p>
                    <p className="text-green-600">✓ Correct: Calculate CGPA first, then convert to percentage</p>
                  </div>
                </div>

                <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-red-800 mb-3">❌ Mistake 3: Exceeding 100%</h3>
                  <p className="text-gray-700 mb-3">
                    Some formulas (like CBSE with high SGPA) can theoretically give >100%. Cap your result at 100%.
                  </p>
                  <div className="bg-white rounded p-3 text-sm">
                    <p>SGPA = 10.0, Using CBSE: 10.0 × 9.5 = 95%</p>
                    <p className="mt-2">Maximum percentage should never exceed 100%</p>
                  </div>
                </div>

                <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-red-800 mb-3">❌ Mistake 4: Not Checking Official Guidelines</h3>
                  <p className="text-gray-700">
                    Universities sometimes update their conversion formulas. What worked for seniors may not be current. Always verify with your current academic regulations or registrar's office before using any conversion for official purposes (job applications, higher studies, etc.).
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
                    Q1: Which SGPA to percentage formula should I use?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Use the formula specified by your university. CBSE and most central universities use SGPA × 9.5. VTU uses (SGPA - 0.75) × 10. Anna University uses SGPA × 10 - 7.5. Mumbai University uses 7.1 × SGPA + 11. If unsure, check your university's academic regulations or ask your academic advisor. For general purposes or international applications, the generic formula (SGPA ÷ Scale) × 100 works universally.
                  </p>
                </div>

                {/* FAQ 2 */}
                <div className="bg-white border-2 border-purple-100 rounded-xl p-6 hover:border-purple-300 transition-colors">
                  <h3 className="text-lg font-bold text-purple-800 mb-3">
                    Q2: Is SGPA to percentage conversion accurate?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    SGPA to percentage conversion is an approximation, not an exact conversion. Different universities use different formulas because SGPA and percentage are fundamentally different grading systems. The conversion is useful for applications and comparisons but may not match your actual marks percentage. For official documents, use your university's official conversion certificate if available.
                  </p>
                </div>

                {/* FAQ 3 */}
                <div className="bg-white border-2 border-green-100 rounded-xl p-6 hover:border-green-300 transition-colors">
                  <h3 className="text-lg font-bold text-green-800 mb-3">
                    Q3: Can I use SGPA × 10 to get percentage?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    No, SGPA × 10 is not the standard formula and will give inflated percentages. For 10-point scale, CBSE recommends SGPA × 9.5, not SGPA × 10. Using SGPA × 10 would mean an SGPA of 9.0 equals 90%, which is higher than the official 85.5%. Always use your university's approved formula. The multiplier of 9.5 was chosen by CBSE after studying the correlation between CGPA and percentage marks.
                  </p>
                </div>

                {/* FAQ 4 */}
                <div className="bg-white border-2 border-blue-100 rounded-xl p-6 hover:border-blue-300 transition-colors">
                  <h3 className="text-lg font-bold text-blue-800 mb-3">
                    Q4: How do I convert 4.0 scale GPA to percentage?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    For 4.0 scale (common in US universities), use the formula: Percentage = (GPA ÷ 4.0) × 100. For example, GPA 3.5 = (3.5 ÷ 4.0) × 100 = 87.5%. This gives you the percentage equivalent. Note that some universities have specific conversion tables, so check if your institution provides one. Indian universities applying abroad often need this conversion for equivalency.
                  </p>
                </div>

                {/* FAQ 5 */}
                <div className="bg-white border-2 border-amber-100 rounded-xl p-6 hover:border-amber-300 transition-colors">
                  <h3 className="text-lg font-bold text-amber-800 mb-3">
                    Q5: What percentage is good for placements?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    For campus placements in India: 75%+ (SGPA 7.9+) is excellent and qualifies for most top companies; 65-74% (SGPA 6.8-7.8) is good and meets most placement criteria; 60-64% (SGPA 6.3-6.7) is acceptable for many companies; 55-59% (SGPA 5.8-6.2) qualifies for several opportunities. Many top-tier companies have cutoffs around 70% (SGPA 7.4). However, cutoffs vary by company, sector, and economic conditions. Skills and projects are increasingly important alongside percentages.
                  </p>
                </div>

                {/* FAQ 6 */}
                <div className="bg-white border-2 border-pink-100 rounded-xl p-6 hover:border-pink-300 transition-colors">
                  <h3 className="text-lg font-bold text-pink-800 mb-3">
                    Q6: Should I convert SGPA or CGPA to percentage?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    For most official purposes (job applications, higher education), convert CGPA (cumulative GPA), not individual semester SGPA. CGPA represents your overall performance across all semesters, which is what employers and universities want to see. Convert individual SGPA to percentage only if specifically asked for a particular semester's performance, such as "Best semester percentage" or for semester-wise transcripts.
                  </p>
                </div>

                {/* FAQ 7 */}
                <div className="bg-white border-2 border-teal-100 rounded-xl p-6 hover:border-teal-300 transition-colors">
                  <h3 className="text-lg font-bold text-teal-800 mb-3">
                    Q7: Do all universities follow the same SGPA scale?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    No. While most Indian universities use a 10-point scale, some use 4-point (like US universities), 5-point, or even 7-point scales. International universities commonly use 4.0 scale (US), 5.0 scale (Germany), or percentage directly (UK). Always confirm your university's scale before conversion. The scale is usually mentioned on your grade card. Also, the same scale (like 10-point) can have different conversion formulas at different universities.
                  </p>
                </div>

                {/* FAQ 8 */}
                <div className="bg-white border-2 border-red-100 rounded-xl p-6 hover:border-red-300 transition-colors">
                  <h3 className="text-lg font-bold text-red-800 mb-3">
                    Q8: Can percentage be higher than SGPA × 10?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    No, percentage cannot legitimately exceed SGPA × 10 for a 10-point scale (which would mean more than 100% for SGPA 10). Standard formulas like CBSE (× 9.5) ensure percentage stays realistic. If any formula gives you >100%, cap it at 100%. Some students mistakenly use SGPA × 10 thinking it gives maximum percentage, but this is incorrect. The CBSE multiplier of 9.5 was specifically chosen to keep maximum percentage around 95% for perfect SGPA of 10.
                  </p>
                </div>

                {/* FAQ 9 */}
                <div className="bg-white border-2 border-cyan-100 rounded-xl p-6 hover:border-cyan-300 transition-colors">
                  <h3 className="text-lg font-bold text-cyan-800 mb-3">
                    Q9: Why do different universities have different formulas?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Different universities developed their own formulas based on their specific grading distributions, difficulty levels, and historical data correlating SGPA with actual percentage marks. There's no universal standard because SGPA and percentage represent different evaluation philosophies. VTU's formula accounts for their specific grading scheme, while CBSE's formula was derived from statistical analysis of their students' performance. Mumbai University's formula is calibrated to their unique credit system and assessment patterns.
                  </p>
                </div>

                {/* FAQ 10 */}
                <div className="bg-white border-2 border-violet-100 rounded-xl p-6 hover:border-violet-300 transition-colors">
                  <h3 className="text-lg font-bold text-violet-800 mb-3">
                    Q10: Is converted percentage accepted for higher studies abroad?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    For international applications, most universities understand CGPA/GPA systems and don't require percentage conversion. However, if conversion is needed, use the standard formula for your university or get an official equivalency certificate from your university's examination department. Many foreign universities have their own conversion scales (like WES evaluation in the US). Some countries/universities require official transcript evaluation by recognized agencies rather than self-calculated percentages. Always check specific university requirements.
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Conclusion</h2>
                <p className="text-lg md:text-xl text-indigo-100 leading-relaxed mb-6">
                  Converting SGPA to percentage is a common requirement for various academic and professional purposes. Understanding your university's specific conversion formula and using it correctly ensures accurate representation of your academic performance.
                </p>
                <p className="text-lg md:text-xl text-indigo-100 leading-relaxed mb-6">
                  Remember that while SGPA provides a standardized measure of semester performance, percentage conversion helps in broader comparisons and applications. Whether you're applying for jobs, higher education, or scholarships, knowing how to accurately convert your SGPA to percentage is essential.
                </p>
                <p className="text-lg md:text-xl text-indigo-100 leading-relaxed">
                  Use our calculator to get instant, accurate conversions based on your university's formula, and always verify with official sources for critical applications. Your academic performance deserves to be represented accurately!
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
              Need Help with Academic Planning & Grade Calculations?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you understand grading systems, improve your academic performance, and plan your educational journey. Get personalized one-on-one guidance tailored to your goals.
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
