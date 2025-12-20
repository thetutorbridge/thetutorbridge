'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Home, BookOpen, ArrowRight, CheckCircle2, XCircle, Percent, BookMarked, FileText, Printer } from 'lucide-react';
import Link from 'next/link';

type GradingScale = 'standard' | 'strict' | 'lenient';

interface GradingScaleConfig {
  A: number;
  B: number;
  C: number;
  D: number;
  F: number;
}

const gradingScales: Record<GradingScale, GradingScaleConfig> = {
  standard: { A: 90, B: 80, C: 70, D: 60, F: 0 },
  strict: { A: 93, B: 85, C: 77, D: 70, F: 0 },
  lenient: { A: 88, B: 78, C: 68, D: 58, F: 0 },
};

export default function EZGrader() {
  const [totalQuestions, setTotalQuestions] = useState<string>('20');
  const [wrongAnswers, setWrongAnswers] = useState<string>('0');
  const [gradingScale, setGradingScale] = useState<GradingScale>('standard');
  const [gradingChart, setGradingChart] = useState<Array<{
    wrong: number;
    correct: number;
    percentage: number;
    grade: string;
  }>>([]);

  const getLetterGrade = (percentage: number, scale: GradingScale): string => {
    const config = gradingScales[scale];
    if (percentage >= config.A) return 'A';
    if (percentage >= config.B) return 'B';
    if (percentage >= config.C) return 'C';
    if (percentage >= config.D) return 'D';
    return 'F';
  };

  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case 'A':
        return 'text-green-700 bg-green-100';
      case 'B':
        return 'text-blue-700 bg-blue-100';
      case 'C':
        return 'text-yellow-700 bg-yellow-100';
      case 'D':
        return 'text-orange-700 bg-orange-100';
      case 'F':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const generateGradingChart = () => {
    const total = parseInt(totalQuestions);
    if (isNaN(total) || total <= 0) {
      alert('Please enter a valid number of questions');
      return;
    }

    const chart = [];
    for (let wrong = 0; wrong <= total; wrong++) {
      const correct = total - wrong;
      const percentage = total > 0 ? (correct / total) * 100 : 0;
      const grade = getLetterGrade(percentage, gradingScale);
      chart.push({ wrong, correct, percentage, grade });
    }

    setGradingChart(chart);
  };

  const calculateGrade = () => {
    const total = parseInt(totalQuestions);
    const wrong = parseInt(wrongAnswers);

    if (isNaN(total) || total <= 0) {
      alert('Please enter a valid number of total questions');
      return;
    }

    if (isNaN(wrong) || wrong < 0 || wrong > total) {
      alert('Please enter a valid number of wrong answers (0 to ' + total + ')');
      return;
    }

    generateGradingChart();
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    // Generate chart on initial load
    if (totalQuestions && !isNaN(parseInt(totalQuestions)) && parseInt(totalQuestions) > 0) {
      generateGradingChart();
    }
  }, [gradingScale]);

  const currentResult = (() => {
    const total = parseInt(totalQuestions);
    const wrong = parseInt(wrongAnswers);
    if (isNaN(total) || isNaN(wrong) || total <= 0) return null;

    const correct = total - wrong;
    const percentage = (correct / total) * 100;
    const grade = getLetterGrade(percentage, gradingScale);

    return { correct, percentage, grade };
  })();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-green-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">EZ Grader</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              EZ Grader - Easy Grade Calculator
            </h1>
            <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
              Grade papers in seconds! Enter the number of questions and wrong answers to instantly calculate scores, percentages, and letter grades. Generate complete grading charts for any test size with customizable grading scales.
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Input Section (Left Side - 1 column) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-green-600" />
                  Grade Calculator
                </h2>

                <div className="space-y-6">
                  {/* Total Questions */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Total Number of Questions
                    </label>
                    <Input
                      type="number"
                      min="1"
                      step="1"
                      placeholder="20"
                      value={totalQuestions}
                      onChange={(e) => setTotalQuestions(e.target.value)}
                      className="text-center text-lg font-semibold"
                    />
                    <p className="text-xs text-gray-600 mt-1">Enter total questions on test/quiz</p>
                  </div>

                  {/* Wrong Answers */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Number of Wrong Answers
                    </label>
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0"
                      value={wrongAnswers}
                      onChange={(e) => setWrongAnswers(e.target.value)}
                      className="text-center text-lg font-semibold"
                    />
                    <p className="text-xs text-gray-600 mt-1">Questions answered incorrectly</p>
                  </div>

                  {/* Grading Scale */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Grading Scale
                    </label>
                    <Select value={gradingScale} onValueChange={(value: GradingScale) => setGradingScale(value)}>
                      <SelectTrigger className="font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard (A: 90%, B: 80%, C: 70%, D: 60%)</SelectItem>
                        <SelectItem value="strict">Strict (A: 93%, B: 85%, C: 77%, D: 70%)</SelectItem>
                        <SelectItem value="lenient">Lenient (A: 88%, B: 78%, C: 68%, D: 58%)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-600 mt-1">Choose your grading scale</p>
                  </div>

                  {/* Calculate Button */}
                  <Button
                    onClick={calculateGrade}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate Grade
                  </Button>

                  {/* Current Result Display */}
                  {currentResult && (
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 mt-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Current Score</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Correct Answers:</span>
                          <span className="text-2xl font-bold text-green-700">{currentResult.correct}/{totalQuestions}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Percentage:</span>
                          <span className="text-2xl font-bold text-green-700">{currentResult.percentage.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Letter Grade:</span>
                          <span className={`text-3xl font-bold px-4 py-2 rounded-lg ${getGradeColor(currentResult.grade)}`}>
                            {currentResult.grade}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Print Button */}
                  {gradingChart.length > 0 && (
                    <Button
                      onClick={handlePrint}
                      variant="outline"
                      className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 py-6 text-lg font-semibold rounded-xl print:hidden"
                    >
                      <Printer className="w-5 h-5 mr-2" />
                      Print Grading Chart
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Grading Chart Section (Right Side - 2 columns) */}
            <div className="lg:col-span-2">
              {gradingChart.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                  <div className="flex justify-between items-center mb-6 print:mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <FileText className="w-6 h-6 text-green-600" />
                      Complete Grading Chart
                    </h2>
                    <div className="text-sm text-gray-600 print:hidden">
                      {totalQuestions} Questions - {gradingScale.charAt(0).toUpperCase() + gradingScale.slice(1)} Scale
                    </div>
                  </div>

                  {/* Grading Scale Legend */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border-2 border-green-200 print:mb-4 print:p-2">
                    <h3 className="font-bold text-gray-900 mb-2 print:text-sm">Grading Scale:</h3>
                    <div className="grid grid-cols-5 gap-2 text-center print:gap-1">
                      <div className="bg-green-100 text-green-700 px-3 py-2 rounded-lg font-semibold print:px-1 print:py-1 print:text-xs">
                        A: ≥{gradingScales[gradingScale].A}%
                      </div>
                      <div className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg font-semibold print:px-1 print:py-1 print:text-xs">
                        B: ≥{gradingScales[gradingScale].B}%
                      </div>
                      <div className="bg-yellow-100 text-yellow-700 px-3 py-2 rounded-lg font-semibold print:px-1 print:py-1 print:text-xs">
                        C: ≥{gradingScales[gradingScale].C}%
                      </div>
                      <div className="bg-orange-100 text-orange-700 px-3 py-2 rounded-lg font-semibold print:px-1 print:py-1 print:text-xs">
                        D: ≥{gradingScales[gradingScale].D}%
                      </div>
                      <div className="bg-red-100 text-red-700 px-3 py-2 rounded-lg font-semibold print:px-1 print:py-1 print:text-xs">
                        F: &lt;{gradingScales[gradingScale].D}%
                      </div>
                    </div>
                  </div>

                  {/* Grading Chart Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse print:text-sm">
                      <thead>
                        <tr className="bg-gradient-to-r from-green-100 to-emerald-100 border-b-2 border-green-300">
                          <th className="text-left py-3 px-4 font-bold text-gray-900 print:py-1 print:px-2">Wrong</th>
                          <th className="text-left py-3 px-4 font-bold text-gray-900 print:py-1 print:px-2">Correct</th>
                          <th className="text-left py-3 px-4 font-bold text-gray-900 print:py-1 print:px-2">Score</th>
                          <th className="text-left py-3 px-4 font-bold text-gray-900 print:py-1 print:px-2">Percentage</th>
                          <th className="text-center py-3 px-4 font-bold text-gray-900 print:py-1 print:px-2">Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gradingChart.map((row, idx) => {
                          const isCurrentScore = parseInt(wrongAnswers) === row.wrong && wrongAnswers !== '';
                          return (
                            <tr
                              key={idx}
                              className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                                isCurrentScore ? 'bg-green-100 font-semibold' : ''
                              } print:hover:bg-white`}
                            >
                              <td className="py-3 px-4 print:py-1 print:px-2">
                                <div className="flex items-center gap-2">
                                  <XCircle className="w-4 h-4 text-red-500 print:hidden" />
                                  <span>{row.wrong}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 print:py-1 print:px-2">
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 print:hidden" />
                                  <span>{row.correct}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 font-semibold print:py-1 print:px-2">
                                {row.correct}/{parseInt(totalQuestions)}
                              </td>
                              <td className="py-3 px-4 font-semibold print:py-1 print:px-2">
                                <div className="flex items-center gap-2">
                                  <Percent className="w-4 h-4 text-gray-500 print:hidden" />
                                  <span>{row.percentage.toFixed(1)}%</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-center print:py-1 print:px-2">
                                <span className={`px-3 py-1 rounded-lg font-bold text-lg ${getGradeColor(row.grade)} print:text-sm print:px-2`}>
                                  {row.grade}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Chart Info */}
                  <div className="mt-6 bg-gray-50 rounded-lg p-4 print:hidden">
                    <p className="text-sm text-gray-600">
                      <strong>Tip:</strong> This grading chart shows all possible scores for a {totalQuestions}-question test.
                      Your current selection {wrongAnswers && parseInt(wrongAnswers) >= 0 ? `(${wrongAnswers} wrong)` : ''} is highlighted in green.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center print:hidden">
                  <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Enter the total number of questions and click Calculate to see the complete grading chart
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="bg-white py-12 md:py-16 print:hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* What is EZ Grader */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-green-600" />
                What is an EZ Grader?
              </h2>

              <div className="prose max-w-none">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border-2 border-green-200">
                  <h3 className="text-2xl font-bold text-green-800 mb-4">The Original Teacher's Time-Saver</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    An <strong>EZ Grader</strong> (Easy Grader) is a simple tool that teachers use to quickly convert test scores into letter grades and percentages. Originally a physical grading wheel or slide chart, EZ Graders have been helping teachers grade papers efficiently for decades. Our online version provides the same instant grading capability with additional features like customizable grading scales and printable charts.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                    <h4 className="font-bold text-blue-800 mb-3 text-xl">📚 For Teachers</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Grade papers in seconds, not minutes</li>
                      <li>• Eliminate calculation errors</li>
                      <li>• Generate grading charts for any test size</li>
                      <li>• Print reference charts for quick grading</li>
                      <li>• Customize grading scales to your standards</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                    <h4 className="font-bold text-purple-800 mb-3 text-xl">🎓 For Students</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Understand how your score translates to grades</li>
                      <li>• Calculate what you need on upcoming tests</li>
                      <li>• Track your test performance</li>
                      <li>• See grading scales and percentages</li>
                      <li>• Estimate final grades</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200">
                  <h3 className="text-2xl font-bold text-yellow-800 mb-4">How to Use the EZ Grader</h3>
                  <ol className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </span>
                      <div className="flex-1">
                        <strong>Enter Total Questions:</strong> Input how many questions are on the test or quiz
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">
                        2
                      </span>
                      <div className="flex-1">
                        <strong>Enter Wrong Answers:</strong> Count how many questions were answered incorrectly
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">
                        3
                      </span>
                      <div className="flex-1">
                        <strong>Select Grading Scale:</strong> Choose Standard, Strict, or Lenient based on your requirements
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">
                        4
                      </span>
                      <div className="flex-1">
                        <strong>Get Instant Results:</strong> See the percentage, letter grade, and complete grading chart
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Grading Examples */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Grading Examples with EZ Grader
              </h2>

              {/* Example 1: 20-Question Quiz */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8 border-2 border-green-200">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Example 1: 20-Question Quiz (Standard Scale)</h3>
                <p className="text-gray-700 mb-4">
                  A student takes a 20-question quiz and gets 3 questions wrong. Let's calculate their grade:
                </p>

                <div className="bg-white rounded-lg p-6 mb-4 border border-green-200">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Given Information:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Total Questions: <strong>20</strong></li>
                        <li>• Wrong Answers: <strong>3</strong></li>
                        <li>• Correct Answers: <strong>20 - 3 = 17</strong></li>
                        <li>• Grading Scale: <strong>Standard</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Calculation:</h4>
                      <div className="space-y-2 text-gray-700">
                        <p className="font-mono text-sm">
                          Percentage = <span className="inline-flex flex-col items-center mx-1">
                            <span className="border-b border-gray-900">17</span>
                            <span>20</span>
                          </span> × 100
                        </p>
                        <p className="font-mono text-sm">Percentage = 0.85 × 100 = <strong className="text-green-700">85%</strong></p>
                        <p className="mt-4">Grade: <strong className="text-xl text-blue-700 bg-blue-100 px-3 py-1 rounded-lg">B</strong></p>
                        <p className="text-sm text-gray-600">(85% falls in the B range: 80-89%)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Result:</strong> With 17 correct out of 20 questions, the student scores <strong className="text-green-700">85%</strong> and earns a <strong className="text-blue-700">B grade</strong>.
                  </p>
                </div>
              </div>

              {/* Example 2: 50-Question Test */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">Example 2: 50-Question Test (Strict Scale)</h3>
                <p className="text-gray-700 mb-4">
                  A teacher uses a strict grading scale for a 50-question test. A student misses 8 questions:
                </p>

                <div className="bg-white rounded-lg p-6 mb-4 border border-blue-200">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Given Information:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Total Questions: <strong>50</strong></li>
                        <li>• Wrong Answers: <strong>8</strong></li>
                        <li>• Correct Answers: <strong>50 - 8 = 42</strong></li>
                        <li>• Grading Scale: <strong>Strict (A≥93%, B≥85%, C≥77%, D≥70%)</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Calculation:</h4>
                      <div className="space-y-2 text-gray-700">
                        <p className="font-mono text-sm">
                          Percentage = <span className="inline-flex flex-col items-center mx-1">
                            <span className="border-b border-gray-900">42</span>
                            <span>50</span>
                          </span> × 100
                        </p>
                        <p className="font-mono text-sm">Percentage = 0.84 × 100 = <strong className="text-blue-700">84%</strong></p>
                        <p className="mt-4">Grade: <strong className="text-xl text-yellow-700 bg-yellow-100 px-3 py-1 rounded-lg">C</strong></p>
                        <p className="text-sm text-gray-600">(84% falls in the C range on strict scale: 77-84%)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-100 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Result:</strong> With 42 correct out of 50 questions, the student scores <strong className="text-blue-700">84%</strong>. On a strict grading scale, this earns a <strong className="text-yellow-700">C grade</strong> (Note: this would be a B on a standard scale).
                  </p>
                </div>
              </div>

              {/* Example 3: Perfect Score */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-purple-800 mb-4">Example 3: Perfect Score - 35 Questions</h3>
                <p className="text-gray-700 mb-4">
                  A student aces a 35-question exam with zero wrong answers:
                </p>

                <div className="bg-white rounded-lg p-6 mb-4 border border-purple-200">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Given Information:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Total Questions: <strong>35</strong></li>
                        <li>• Wrong Answers: <strong>0</strong></li>
                        <li>• Correct Answers: <strong>35 - 0 = 35</strong></li>
                        <li>• Grading Scale: <strong>Any</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Calculation:</h4>
                      <div className="space-y-2 text-gray-700">
                        <p className="font-mono text-sm">
                          Percentage = <span className="inline-flex flex-col items-center mx-1">
                            <span className="border-b border-gray-900">35</span>
                            <span>35</span>
                          </span> × 100
                        </p>
                        <p className="font-mono text-sm">Percentage = 1.00 × 100 = <strong className="text-green-700">100%</strong></p>
                        <p className="mt-4">Grade: <strong className="text-2xl text-green-700 bg-green-100 px-4 py-2 rounded-lg">A</strong></p>
                        <p className="text-sm text-gray-600">(Perfect score on any grading scale!)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-100 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Result:</strong> With all 35 questions correct, the student achieves a perfect <strong className="text-green-700">100%</strong> and earns an <strong className="text-green-700">A grade</strong> - excellent work!
                  </p>
                </div>
              </div>
            </section>

            {/* Grading Scale Comparison */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Grading Scale Comparison
              </h2>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200">
                <h3 className="text-2xl font-bold text-indigo-800 mb-4">Standard vs. Strict vs. Lenient Scales</h3>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white rounded-lg border border-indigo-200">
                    <thead className="bg-indigo-100">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Grade</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Standard Scale</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Strict Scale</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Lenient Scale</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold text-green-700 text-lg">A</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">90-100%</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">93-100%</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">88-100%</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-blue-700 text-lg">B</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">80-89%</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">85-92%</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">78-87%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold text-yellow-700 text-lg">C</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">70-79%</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">77-84%</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">68-77%</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-orange-700 text-lg">D</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">60-69%</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">70-76%</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">58-67%</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-red-700 text-lg">F</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">Below 60%</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">Below 70%</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">Below 58%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-3 text-xl">📘 Standard Scale</h4>
                  <p className="text-gray-700 mb-3">
                    The most commonly used grading scale in U.S. schools. Balanced and fair for most situations.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Used by majority of schools</li>
                    <li>• Widely recognized standard</li>
                    <li>• Good for general education</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                  <h4 className="font-bold text-purple-800 mb-3 text-xl">📕 Strict Scale</h4>
                  <p className="text-gray-700 mb-3">
                    Higher standards requiring better performance for each grade. Often used in honors or AP courses.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Challenging standards</li>
                    <li>• College prep courses</li>
                    <li>• Encourages excellence</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                  <h4 className="font-bold text-green-800 mb-3 text-xl">📗 Lenient Scale</h4>
                  <p className="text-gray-700 mb-3">
                    More forgiving standards, allowing students to achieve higher grades with lower percentages.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Lower thresholds</li>
                    <li>• Encourages participation</li>
                    <li>• Good for difficult subjects</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Common Test Sizes Chart */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Common Test Sizes - Quick Reference
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
                  <h3 className="text-xl font-bold text-orange-800 mb-4">10-Question Quiz</h3>
                  <p className="text-sm text-gray-600 mb-3">Each question worth 10%</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span>0 wrong:</span>
                      <span className="font-bold text-green-700">100% (A)</span>
                    </div>
                    <div className="flex justify-between bg-gray-50 p-2 rounded">
                      <span>1 wrong:</span>
                      <span className="font-bold text-green-700">90% (A)</span>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span>2 wrong:</span>
                      <span className="font-bold text-blue-700">80% (B)</span>
                    </div>
                    <div className="flex justify-between bg-gray-50 p-2 rounded">
                      <span>3 wrong:</span>
                      <span className="font-bold text-yellow-700">70% (C)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <h3 className="text-xl font-bold text-green-800 mb-4">20-Question Test</h3>
                  <p className="text-sm text-gray-600 mb-3">Each question worth 5%</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span>0 wrong:</span>
                      <span className="font-bold text-green-700">100% (A)</span>
                    </div>
                    <div className="flex justify-between bg-gray-50 p-2 rounded">
                      <span>2 wrong:</span>
                      <span className="font-bold text-green-700">90% (A)</span>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span>4 wrong:</span>
                      <span className="font-bold text-blue-700">80% (B)</span>
                    </div>
                    <div className="flex justify-between bg-gray-50 p-2 rounded">
                      <span>6 wrong:</span>
                      <span className="font-bold text-yellow-700">70% (C)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">25-Question Test</h3>
                  <p className="text-sm text-gray-600 mb-3">Each question worth 4%</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span>0 wrong:</span>
                      <span className="font-bold text-green-700">100% (A)</span>
                    </div>
                    <div className="flex justify-between bg-gray-50 p-2 rounded">
                      <span>2 wrong:</span>
                      <span className="font-bold text-green-700">92% (A)</span>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span>5 wrong:</span>
                      <span className="font-bold text-blue-700">80% (B)</span>
                    </div>
                    <div className="flex justify-between bg-gray-50 p-2 rounded">
                      <span>7 wrong:</span>
                      <span className="font-bold text-yellow-700">72% (C)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                  <h3 className="text-xl font-bold text-purple-800 mb-4">50-Question Exam</h3>
                  <p className="text-sm text-gray-600 mb-3">Each question worth 2%</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span>0 wrong:</span>
                      <span className="font-bold text-green-700">100% (A)</span>
                    </div>
                    <div className="flex justify-between bg-gray-50 p-2 rounded">
                      <span>5 wrong:</span>
                      <span className="font-bold text-green-700">90% (A)</span>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span>10 wrong:</span>
                      <span className="font-bold text-blue-700">80% (B)</span>
                    </div>
                    <div className="flex justify-between bg-gray-50 p-2 rounded">
                      <span>15 wrong:</span>
                      <span className="font-bold text-yellow-700">70% (C)</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tips for Teachers */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Tips for Using EZ Grader Effectively
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <h3 className="text-xl font-bold text-green-800 mb-3">✓ Print Grading Charts</h3>
                  <p className="text-gray-700">
                    Generate and print grading charts for your most common test sizes. Keep them at your desk for instant reference while grading papers.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-blue-800 mb-3">✓ Choose the Right Scale</h3>
                  <p className="text-gray-700">
                    Match your grading scale to course difficulty. Use strict scales for advanced courses and lenient scales for challenging new material.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                  <h3 className="text-xl font-bold text-purple-800 mb-3">✓ Mark Wrong Answers</h3>
                  <p className="text-gray-700">
                    When grading, mark only incorrect answers. Then simply count the X's and use the EZ Grader - faster than counting correct answers!
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
                  <h3 className="text-xl font-bold text-orange-800 mb-3">✓ Double-Check Math</h3>
                  <p className="text-gray-700">
                    While EZ Grader is accurate, always verify your count of wrong answers. A simple miscount can affect the grade significantly.
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
                <div className="bg-white rounded-xl p-6 border-2 border-green-200 hover:border-green-400 transition-colors">
                  <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    How accurate is the EZ Grader calculator?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our EZ Grader is <strong>100% accurate</strong> for all calculations. It uses precise mathematical formulas to convert scores to percentages and applies the selected grading scale consistently. The calculator eliminates human error in calculations, though you should still verify your count of wrong answers to ensure accuracy.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-colors">
                  <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    Can I use this for tests with weighted questions?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    This EZ Grader assumes all questions are worth equal points. If your test has weighted questions (some worth more points than others), you'll need to <strong>calculate based on total points</strong> rather than number of questions. For example, if a test has 80 total points, treat it as 80 "questions" and count how many points were lost as "wrong answers."
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-colors">
                  <h3 className="text-xl font-bold text-purple-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    What's the difference between the grading scales?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Standard scale (A≥90%):</strong> Most common in U.S. schools; <strong>Strict scale (A≥93%):</strong> Higher standards, often used in honors/AP courses or colleges; <strong>Lenient scale (A≥88%):</strong> More forgiving, good for difficult subjects or younger students. The scale you choose depends on your school's policy, course difficulty, and educational philosophy.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-yellow-200 hover:border-yellow-400 transition-colors">
                  <h3 className="text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    Can I print the grading chart?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Yes!</strong> Click the "Print Grading Chart" button to print a reference chart for your test. The printed version includes the grading scale legend and complete chart showing all possible scores. Many teachers print charts for common test sizes (10, 20, 25, 50 questions) and keep them handy for quick grading.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-red-200 hover:border-red-400 transition-colors">
                  <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    What if my school uses +/- grading (A+, A, A-)?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    This EZ Grader shows basic letter grades (A, B, C, D, F). If your school uses <strong>plus/minus grading</strong>, you can still use the percentage to determine the specific grade. Common plus/minus breakdowns: <strong>A (93-100%), A- (90-92%), B+ (87-89%), B (83-86%), B- (80-82%)</strong>, and so on. Check your school's specific grading policy for exact ranges.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-orange-200 hover:border-orange-400 transition-colors">
                  <h3 className="text-xl font-bold text-orange-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    How do I grade a test with partial credit?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    For tests with <strong>partial credit</strong>, calculate the total points earned vs. total points possible, then use those numbers as your inputs. For example, if a student earned 73 out of 85 points, treat it as 85 "total questions" with 12 "wrong" (85-73=12). The EZ Grader will calculate the percentage: 73/85 = 85.9%.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-teal-200 hover:border-teal-400 transition-colors">
                  <h3 className="text-xl font-bold text-teal-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    Is there a mobile app version?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our EZ Grader is a <strong>web-based calculator</strong> that works perfectly on mobile devices, tablets, and computers. You don't need to download an app - simply bookmark this page on your phone for instant access. The responsive design ensures it works smoothly on screens of all sizes.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-indigo-200 hover:border-indigo-400 transition-colors">
                  <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    Can students use this to check their grades?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Absolutely!</strong> Students can use the EZ Grader to: <strong>(1)</strong> Understand how their test score translates to a grade; <strong>(2)</strong> Calculate what they need on future tests; <strong>(3)</strong> See how one wrong answer affects their grade; <strong>(4)</strong> Verify their teacher's grading (though teachers are usually correct!). It's a great tool for students to understand grading and take ownership of their learning.
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Grade Faster, Teach Better</h2>
                <p className="text-lg text-green-100 mb-6 leading-relaxed">
                  The EZ Grader is more than just a calculator - it's a time-saving tool that lets teachers focus on what matters most: teaching. By eliminating tedious grade calculations and reducing errors, you can spend more time providing meaningful feedback to students and less time crunching numbers.
                </p>
                <p className="text-lg text-green-100 leading-relaxed">
                  Whether you're grading a quick 10-question quiz or a comprehensive 100-question final exam, our EZ Grader provides instant, accurate results with printable charts for reference. Bookmark this page, share it with fellow educators, and make grading the easiest part of your day!
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Book Your Session CTA */}
      <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16 print:hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Need Help Improving Your Test Scores?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master any subject, develop better test-taking strategies, and boost your academic performance. Get personalized one-on-one guidance tailored to your learning style.
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

      <Footer />
    </div>
  );
}
