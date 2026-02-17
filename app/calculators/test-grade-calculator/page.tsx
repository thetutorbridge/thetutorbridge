'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, BookOpen, ArrowRight, CheckCircle2, XCircle, Percent, HelpCircle, Award, Target, FileText, Lightbulb, AlertTriangle, GraduationCap, BarChart3 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type GradingScale = 'standard' | 'plus-minus' | 'ten-point' | 'seven-point' | 'pass-fail';

interface GradingScaleConfig {
  name: string;
  description: string;
  grades: { letter: string; min: number; max: number; color: string; bgColor: string }[];
}

const gradingScales: Record<GradingScale, GradingScaleConfig> = {
  'standard': {
    name: 'Standard (A-F)',
    description: '10-point scale commonly used in US schools',
    grades: [
      { letter: 'A', min: 90, max: 100, color: 'text-green-700', bgColor: 'bg-green-100' },
      { letter: 'B', min: 80, max: 89.99, color: 'text-blue-700', bgColor: 'bg-blue-100' },
      { letter: 'C', min: 70, max: 79.99, color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
      { letter: 'D', min: 60, max: 69.99, color: 'text-orange-700', bgColor: 'bg-orange-100' },
      { letter: 'F', min: 0, max: 59.99, color: 'text-red-700', bgColor: 'bg-red-100' },
    ]
  },
  'plus-minus': {
    name: 'Plus/Minus (A+ to F)',
    description: 'Detailed scale with +/- modifiers',
    grades: [
      { letter: 'A+', min: 97, max: 100, color: 'text-green-700', bgColor: 'bg-green-100' },
      { letter: 'A', min: 93, max: 96.99, color: 'text-green-700', bgColor: 'bg-green-100' },
      { letter: 'A-', min: 90, max: 92.99, color: 'text-green-600', bgColor: 'bg-green-50' },
      { letter: 'B+', min: 87, max: 89.99, color: 'text-blue-700', bgColor: 'bg-blue-100' },
      { letter: 'B', min: 83, max: 86.99, color: 'text-blue-700', bgColor: 'bg-blue-100' },
      { letter: 'B-', min: 80, max: 82.99, color: 'text-blue-600', bgColor: 'bg-blue-50' },
      { letter: 'C+', min: 77, max: 79.99, color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
      { letter: 'C', min: 73, max: 76.99, color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
      { letter: 'C-', min: 70, max: 72.99, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
      { letter: 'D+', min: 67, max: 69.99, color: 'text-orange-700', bgColor: 'bg-orange-100' },
      { letter: 'D', min: 63, max: 66.99, color: 'text-orange-700', bgColor: 'bg-orange-100' },
      { letter: 'D-', min: 60, max: 62.99, color: 'text-orange-600', bgColor: 'bg-orange-50' },
      { letter: 'F', min: 0, max: 59.99, color: 'text-red-700', bgColor: 'bg-red-100' },
    ]
  },
  'ten-point': {
    name: '10-Point Scale',
    description: 'Equal 10-point intervals',
    grades: [
      { letter: 'A', min: 90, max: 100, color: 'text-green-700', bgColor: 'bg-green-100' },
      { letter: 'B', min: 80, max: 89.99, color: 'text-blue-700', bgColor: 'bg-blue-100' },
      { letter: 'C', min: 70, max: 79.99, color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
      { letter: 'D', min: 60, max: 69.99, color: 'text-orange-700', bgColor: 'bg-orange-100' },
      { letter: 'F', min: 0, max: 59.99, color: 'text-red-700', bgColor: 'bg-red-100' },
    ]
  },
  'seven-point': {
    name: '7-Point Scale',
    description: 'Stricter scale (A starts at 93%)',
    grades: [
      { letter: 'A', min: 93, max: 100, color: 'text-green-700', bgColor: 'bg-green-100' },
      { letter: 'B', min: 85, max: 92.99, color: 'text-blue-700', bgColor: 'bg-blue-100' },
      { letter: 'C', min: 77, max: 84.99, color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
      { letter: 'D', min: 70, max: 76.99, color: 'text-orange-700', bgColor: 'bg-orange-100' },
      { letter: 'F', min: 0, max: 69.99, color: 'text-red-700', bgColor: 'bg-red-100' },
    ]
  },
  'pass-fail': {
    name: 'Pass/Fail',
    description: 'Simple pass or fail (60% passing)',
    grades: [
      { letter: 'Pass', min: 60, max: 100, color: 'text-green-700', bgColor: 'bg-green-100' },
      { letter: 'Fail', min: 0, max: 59.99, color: 'text-red-700', bgColor: 'bg-red-100' },
    ]
  },
};

interface TestResult {
  totalQuestions: number;
  numberWrong: number;
  numberCorrect: number;
  percentage: number;
  letterGrade: string;
  gradeColor: string;
  gradeBgColor: string;
  pointsEarned: number;
  pointsPossible: number;
  isPassing: boolean;
}

export default function TestGradeCalculator() {
  const [mode, setMode] = useState<'wrong' | 'correct' | 'points'>('wrong');
  const [totalQuestions, setTotalQuestions] = useState<string>('');
  const [numberWrong, setNumberWrong] = useState<string>('');
  const [numberCorrect, setNumberCorrect] = useState<string>('');
  const [pointsEarned, setPointsEarned] = useState<string>('');
  const [pointsPossible, setPointsPossible] = useState<string>('');
  const [gradingScale, setGradingScale] = useState<GradingScale>('standard');
  const [result, setResult] = useState<TestResult | null>(null);

  const getLetterGrade = (percentage: number, scale: GradingScale): { letter: string; color: string; bgColor: string } => {
    const config = gradingScales[scale];
    for (const grade of config.grades) {
      if (percentage >= grade.min && percentage <= grade.max) {
        return { letter: grade.letter, color: grade.color, bgColor: grade.bgColor };
      }
    }
    return { letter: 'F', color: 'text-red-700', bgColor: 'bg-red-100' };
  };

  const calculateGrade = () => {
    let total: number;
    let wrong: number;
    let correct: number;
    let percentage: number;
    let ptsEarned: number;
    let ptsPossible: number;

    if (mode === 'wrong') {
      total = parseFloat(totalQuestions);
      wrong = parseFloat(numberWrong);

      if (isNaN(total) || total <= 0) {
        alert('Please enter a valid total number of questions');
        return;
      }

      if (isNaN(wrong) || wrong < 0) {
        alert('Please enter a valid number of wrong answers');
        return;
      }

      if (wrong > total) {
        alert('Number wrong cannot exceed total questions');
        return;
      }

      correct = total - wrong;
      percentage = (correct / total) * 100;
      ptsEarned = correct;
      ptsPossible = total;

    } else if (mode === 'correct') {
      total = parseFloat(totalQuestions);
      correct = parseFloat(numberCorrect);

      if (isNaN(total) || total <= 0) {
        alert('Please enter a valid total number of questions');
        return;
      }

      if (isNaN(correct) || correct < 0) {
        alert('Please enter a valid number of correct answers');
        return;
      }

      if (correct > total) {
        alert('Number correct cannot exceed total questions');
        return;
      }

      wrong = total - correct;
      percentage = (correct / total) * 100;
      ptsEarned = correct;
      ptsPossible = total;

    } else {
      ptsEarned = parseFloat(pointsEarned);
      ptsPossible = parseFloat(pointsPossible);

      if (isNaN(ptsPossible) || ptsPossible <= 0) {
        alert('Please enter valid total points possible');
        return;
      }

      if (isNaN(ptsEarned) || ptsEarned < 0) {
        alert('Please enter valid points earned');
        return;
      }

      if (ptsEarned > ptsPossible) {
        alert('Points earned cannot exceed total points possible');
        return;
      }

      percentage = (ptsEarned / ptsPossible) * 100;
      total = ptsPossible;
      correct = ptsEarned;
      wrong = ptsPossible - ptsEarned;
    }

    const gradeInfo = getLetterGrade(percentage, gradingScale);
    const isPassing = percentage >= 60;

    setResult({
      totalQuestions: total,
      numberWrong: wrong,
      numberCorrect: correct,
      percentage,
      letterGrade: gradeInfo.letter,
      gradeColor: gradeInfo.color,
      gradeBgColor: gradeInfo.bgColor,
      pointsEarned: ptsEarned,
      pointsPossible: ptsPossible,
      isPassing,
    });
  };

  const handleClear = () => {
    setTotalQuestions('');
    setNumberWrong('');
    setNumberCorrect('');
    setPointsEarned('');
    setPointsPossible('');
    setResult(null);
  };

  // Render fraction component
  const renderFraction = (numerator: string | number, denominator: string | number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-lg',
      lg: 'text-2xl',
    };
    return (
      <span className={`inline-flex flex-col items-center justify-center mx-1 ${sizeClasses[size]}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"HelpCircle className=\"w-5 h-5 text-indigo-600\" />\n                    What percentage is needed to pass a test?","acceptedAnswer":{"@type":"Answer","text":"In most U.S. schools, 60% is the minimum passing grade, corresponding to a D. However, some schools or courses may require 65% or 70% to pass. College courses often require a C (70-73%) minimum. Always check your course syllabus for specific requirements."}}]}' }}
      />
        <span className="font-semibold px-2">{numerator}</span>
        <span className="w-full border-t-2 border-current"></span>
        <span className="font-semibold px-2">{denominator}</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
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
            <span className="text-gray-900 font-medium">Test Grade Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <GraduationCap className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Test Grade Calculator
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Instantly calculate your test score, percentage, and letter grade. Enter total questions and wrong answers, or use points earned. Supports multiple grading scales including standard, plus/minus, and pass/fail.
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
                  Enter Test Information
                </h2>

                {/* Input Mode Selection */}
                <div className="mb-6">
                  <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                    Calculation Mode
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setMode('wrong')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        mode === 'wrong'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <XCircle className="w-4 h-4 mx-auto mb-1" />
                      # Wrong
                    </button>
                    <button
                      onClick={() => setMode('correct')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        mode === 'correct'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 mx-auto mb-1" />
                      # Correct
                    </button>
                    <button
                      onClick={() => setMode('points')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        mode === 'points'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Percent className="w-4 h-4 mx-auto mb-1" />
                      Points
                    </button>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Mode-specific inputs */}
                  {mode === 'wrong' && (
                    <>
                      <div>
                        <Label htmlFor="totalQuestions" className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                          <HelpCircle className="w-4 h-4 mr-1 text-indigo-500" />
                          Number of Points / Questions
                        </Label>
                        <Input
                          id="totalQuestions"
                          type="number"
                          min="1"
                          step="1"
                          placeholder="e.g., 40"
                          value={totalQuestions}
                          onChange={(e) => setTotalQuestions(e.target.value)}
                          className="text-center text-lg font-semibold"
                        />
                      </div>
                      <div>
                        <Label htmlFor="numberWrong" className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                          <XCircle className="w-4 h-4 mr-1 text-red-500" />
                          Number Wrong
                        </Label>
                        <Input
                          id="numberWrong"
                          type="number"
                          min="0"
                          step="1"
                          placeholder="e.g., 7"
                          value={numberWrong}
                          onChange={(e) => setNumberWrong(e.target.value)}
                          className="text-center text-lg font-semibold"
                        />
                      </div>
                    </>
                  )}

                  {mode === 'correct' && (
                    <>
                      <div>
                        <Label htmlFor="totalQuestions2" className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                          <HelpCircle className="w-4 h-4 mr-1 text-indigo-500" />
                          Number of Points / Questions
                        </Label>
                        <Input
                          id="totalQuestions2"
                          type="number"
                          min="1"
                          step="1"
                          placeholder="e.g., 40"
                          value={totalQuestions}
                          onChange={(e) => setTotalQuestions(e.target.value)}
                          className="text-center text-lg font-semibold"
                        />
                      </div>
                      <div>
                        <Label htmlFor="numberCorrect" className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />
                          Number Correct
                        </Label>
                        <Input
                          id="numberCorrect"
                          type="number"
                          min="0"
                          step="1"
                          placeholder="e.g., 33"
                          value={numberCorrect}
                          onChange={(e) => setNumberCorrect(e.target.value)}
                          className="text-center text-lg font-semibold"
                        />
                      </div>
                    </>
                  )}

                  {mode === 'points' && (
                    <>
                      <div>
                        <Label htmlFor="pointsEarned" className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />
                          Points Earned
                        </Label>
                        <Input
                          id="pointsEarned"
                          type="number"
                          min="0"
                          step="0.5"
                          placeholder="e.g., 85"
                          value={pointsEarned}
                          onChange={(e) => setPointsEarned(e.target.value)}
                          className="text-center text-lg font-semibold"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pointsPossible" className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                          <Target className="w-4 h-4 mr-1 text-indigo-500" />
                          Points Possible (Total)
                        </Label>
                        <Input
                          id="pointsPossible"
                          type="number"
                          min="1"
                          step="0.5"
                          placeholder="e.g., 100"
                          value={pointsPossible}
                          onChange={(e) => setPointsPossible(e.target.value)}
                          className="text-center text-lg font-semibold"
                        />
                      </div>
                    </>
                  )}

                  {/* Grading Scale Selection */}
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                      <BarChart3 className="w-4 h-4 mr-1 text-purple-500" />
                      Grade Scale
                    </Label>
                    <Select value={gradingScale} onValueChange={(value: GradingScale) => setGradingScale(value)}>
                      <SelectTrigger className="font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(gradingScales).map(([key, scale]) => (
                          <SelectItem key={key} value={key}>
                            {scale.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">{gradingScales[gradingScale].description}</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={calculateGrade}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate Grade
                  </Button>
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="px-6 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50"
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Section (Right Side - 3 columns) */}
            <div className="lg:col-span-3">
              {result ? (
                <div className="space-y-6">
                  {/* Main Grade Display */}
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-6 text-center">Your Test Grade</h3>
                    <div className="grid grid-cols-2 gap-6">
                      {/* Percentage */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                        <p className="text-indigo-200 text-sm mb-2">Percentage</p>
                        <p className="text-5xl font-bold">{result.percentage.toFixed(1)}%</p>
                      </div>
                      {/* Letter Grade */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                        <p className="text-indigo-200 text-sm mb-2">Letter Grade</p>
                        <p className={`text-5xl font-bold ${result.gradeBgColor} ${result.gradeColor} px-4 py-2 rounded-lg inline-block`}>
                          {result.letterGrade}
                        </p>
                      </div>
                    </div>
                    {/* Score Summary */}
                    <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-indigo-200 text-xs mb-1">Correct</p>
                        <p className="text-2xl font-bold text-green-300">{result.numberCorrect}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-indigo-200 text-xs mb-1">Wrong</p>
                        <p className="text-2xl font-bold text-red-300">{result.numberWrong}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-indigo-200 text-xs mb-1">Total</p>
                        <p className="text-2xl font-bold">{result.totalQuestions}</p>
                      </div>
                    </div>
                    {/* Pass/Fail Indicator */}
                    <div className={`mt-6 p-4 rounded-xl text-center ${result.isPassing ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      <p className="text-lg font-semibold flex items-center justify-center gap-2">
                        {result.isPassing ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-green-300" />
                            <span className="text-green-200">Passing Grade</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-red-300" />
                            <span className="text-red-200">Below Passing (60%)</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Step-by-Step Solution */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-indigo-600" />
                      Step-by-Step Calculation
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-3 items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                          1
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 font-medium">Identify the values:</p>
                          <div className="bg-gray-50 rounded-lg p-4 mt-2">
                            <p className="text-gray-600">
                              Total questions/points = <strong>{result.totalQuestions}</strong>
                            </p>
                            <p className="text-gray-600">
                              Correct answers = <strong className="text-green-600">{result.numberCorrect}</strong>
                            </p>
                            <p className="text-gray-600">
                              Wrong answers = <strong className="text-red-600">{result.numberWrong}</strong>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                          2
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 font-medium">Apply the percentage formula:</p>
                          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mt-2 border border-indigo-100">
                            <div className="flex items-center justify-center flex-wrap gap-2 text-lg">
                              <span className="text-gray-700">Percentage =</span>
                              {renderFraction('Correct Answers', 'Total Questions', 'md')}
                              <span className="text-gray-700">× 100</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                          3
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 font-medium">Substitute the values:</p>
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mt-2 border border-green-200">
                            <div className="flex items-center justify-center flex-wrap gap-2 text-lg">
                              <span className="text-gray-700">Percentage =</span>
                              {renderFraction(result.numberCorrect, result.totalQuestions, 'md')}
                              <span className="text-gray-700">× 100</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                          4
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 font-medium">Calculate the result:</p>
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mt-2 border border-purple-200">
                            <p className="text-center text-lg">
                              Percentage = {(result.numberCorrect / result.totalQuestions).toFixed(4)} × 100 = <strong className="text-2xl text-purple-700">{result.percentage.toFixed(2)}%</strong>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                          5
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 font-medium">Determine letter grade ({gradingScales[gradingScale].name}):</p>
                          <div className="bg-gray-50 rounded-lg p-4 mt-2">
                            <p className="text-gray-600">
                              {result.percentage.toFixed(2)}% falls in the range for grade <span className={`font-bold text-xl ${result.gradeBgColor} ${result.gradeColor} px-3 py-1 rounded`}>{result.letterGrade}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grading Scale Reference */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                      {gradingScales[gradingScale].name} Grading Scale
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {gradingScales[gradingScale].grades.map((grade, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg text-center border-2 ${
                            result.letterGrade === grade.letter
                              ? 'border-indigo-500 ring-2 ring-indigo-200'
                              : 'border-gray-100'
                          } ${grade.bgColor}`}
                        >
                          <p className={`text-2xl font-bold ${grade.color}`}>{grade.letter}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            {grade.min}% - {grade.max === 100 ? '100%' : `${grade.max.toFixed(0)}%`}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    Enter your test information to calculate your grade
                  </p>
                  <p className="text-gray-400 text-sm">
                    Choose calculation mode: # Wrong, # Correct, or Points
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

            {/* What is a Test Grade Calculator */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-indigo-600" />
                What is a Test Grade Calculator?
              </h2>

              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  A <strong>test grade calculator</strong> is an essential academic tool that converts raw test scores into percentages and letter grades. Whether you&apos;re a student wanting to quickly check your grade or a teacher grading dozens of papers, this calculator provides instant, accurate results using the standard grading formula.
                </p>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border-2 border-indigo-200">
                  <h3 className="text-2xl font-bold text-indigo-800 mb-4">The Test Grade Formula</h3>
                  <div className="bg-white rounded-lg p-6 border border-indigo-100">
                    <div className="flex items-center justify-center flex-wrap gap-3 text-xl">
                      <span className="font-semibold text-gray-800">Percentage Score =</span>
                      <span className="inline-flex flex-col items-center">
                        <span className="border-b-2 border-gray-800 pb-1 px-4 font-semibold">
                          Points Earned
                        </span>
                        <span className="mt-1 font-semibold">Total Points</span>
                      </span>
                      <span className="font-semibold text-gray-800">× 100</span>
                    </div>
                    <p className="text-center text-gray-600 mt-4">
                      Or equivalently: <strong>Percentage = (Correct ÷ Total) × 100</strong>
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 mb-6">
                  <h3 className="text-2xl font-bold text-green-800 mb-4">Alternative Formula (Using Wrong Answers)</h3>
                  <div className="bg-white rounded-lg p-6 border border-green-100">
                    <div className="flex items-center justify-center flex-wrap gap-3 text-xl">
                      <span className="font-semibold text-gray-800">Percentage =</span>
                      <span className="inline-flex flex-col items-center">
                        <span className="border-b-2 border-gray-800 pb-1 px-4 font-semibold">
                          (Total − Wrong)
                        </span>
                        <span className="mt-1 font-semibold">Total</span>
                      </span>
                      <span className="font-semibold text-gray-800">× 100</span>
                    </div>
                    <p className="text-center text-gray-600 mt-4">
                      This is useful when you only know the number of incorrect answers.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Use */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                How to Use the Test Grade Calculator
              </h2>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                <ol className="space-y-4">
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900 text-lg">Choose Your Calculation Mode</strong>
                      <p className="text-gray-700 mt-1">Select whether you want to enter number wrong, number correct, or points earned.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900 text-lg">Enter Total Questions/Points</strong>
                      <p className="text-gray-700 mt-1">Input the total number of questions or maximum possible points on the test.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900 text-lg">Enter Your Score</strong>
                      <p className="text-gray-700 mt-1">Input the number wrong, number correct, or points earned depending on your chosen mode.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong className="text-gray-900 text-lg">Select Grading Scale</strong>
                      <p className="text-gray-700 mt-1">Choose from Standard (A-F), Plus/Minus, 7-Point, 10-Point, or Pass/Fail scales.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
                    <div>
                      <strong className="text-gray-900 text-lg">Get Your Results</strong>
                      <p className="text-gray-700 mt-1">Click Calculate to see your percentage, letter grade, and step-by-step solution.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* Detailed Examples */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Test Grade Calculation Examples
              </h2>

              {/* Example 1 */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border-2 border-green-200">
                <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                  40-Question Test with 7 Wrong
                </h3>
                <p className="text-gray-700 mb-4">
                  A student takes a 40-question test and answers 7 questions incorrectly. What is their grade?
                </p>

                <div className="bg-white rounded-lg p-6 border border-green-200 mb-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Given Information:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>Total questions = <strong>40</strong></li>
                        <li>Wrong answers = <strong className="text-red-600">7</strong></li>
                        <li>Correct answers = 40 − 7 = <strong className="text-green-600">33</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Calculation:</h4>
                      <div className="space-y-2 text-gray-700">
                        <div className="flex items-center gap-2">
                          <span>Percentage =</span>
                          {renderFraction(33, 40, 'sm')}
                          <span>× 100</span>
                        </div>
                        <p>Percentage = 0.825 × 100 = <strong className="text-green-700 text-xl">82.5%</strong></p>
                        <p className="mt-3">Letter Grade: <strong className="text-blue-700 bg-blue-100 px-3 py-1 rounded text-xl">B</strong></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Result:</strong> With 33 correct out of 40 questions, the student earns <strong className="text-green-700">82.5%</strong>, which is a <strong className="text-blue-700">B grade</strong> on the standard scale (or B- on the plus/minus scale).
                  </p>
                </div>
              </div>

              {/* Example 2 */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                  Points-Based Test (85/100)
                </h3>
                <p className="text-gray-700 mb-4">
                  A student earns 85 points out of 100 possible points on a midterm exam. Calculate their grade.
                </p>

                <div className="bg-white rounded-lg p-6 border border-blue-200 mb-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Given Information:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>Points earned = <strong className="text-green-600">85</strong></li>
                        <li>Points possible = <strong>100</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Calculation:</h4>
                      <div className="space-y-2 text-gray-700">
                        <div className="flex items-center gap-2">
                          <span>Percentage =</span>
                          {renderFraction(85, 100, 'sm')}
                          <span>× 100</span>
                        </div>
                        <p>Percentage = 0.85 × 100 = <strong className="text-blue-700 text-xl">85%</strong></p>
                        <p className="mt-3">Letter Grade: <strong className="text-blue-700 bg-blue-100 px-3 py-1 rounded text-xl">B</strong></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-100 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Result:</strong> The student earns <strong className="text-blue-700">85%</strong>, which is a solid <strong className="text-blue-700">B grade</strong>.
                  </p>
                </div>
              </div>

              {/* Example 3 */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
                  25-Question Quiz with 2 Wrong
                </h3>
                <p className="text-gray-700 mb-4">
                  A student answers 2 questions wrong on a 25-question pop quiz. What percentage and letter grade do they receive?
                </p>

                <div className="bg-white rounded-lg p-6 border border-purple-200 mb-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Given Information:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>Total questions = <strong>25</strong></li>
                        <li>Wrong answers = <strong className="text-red-600">2</strong></li>
                        <li>Correct answers = 25 − 2 = <strong className="text-green-600">23</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Calculation:</h4>
                      <div className="space-y-2 text-gray-700">
                        <div className="flex items-center gap-2">
                          <span>Percentage =</span>
                          {renderFraction(23, 25, 'sm')}
                          <span>× 100</span>
                        </div>
                        <p>Percentage = 0.92 × 100 = <strong className="text-green-700 text-xl">92%</strong></p>
                        <p className="mt-3">Letter Grade: <strong className="text-green-700 bg-green-100 px-3 py-1 rounded text-xl">A- / A</strong></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-100 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Result:</strong> With only 2 wrong, the student scores <strong className="text-green-700">92%</strong> - an <strong className="text-green-700">A-</strong> on the plus/minus scale or <strong className="text-green-700">A</strong> on the standard scale!
                  </p>
                </div>
              </div>

              {/* Example 4 - Borderline */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
                <h3 className="text-2xl font-bold text-orange-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
                  Borderline Pass/Fail Scenario
                </h3>
                <p className="text-gray-700 mb-4">
                  A student gets 12 out of 20 questions correct on a final exam. Did they pass (60% required)?
                </p>

                <div className="bg-white rounded-lg p-6 border border-orange-200 mb-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Given Information:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>Total questions = <strong>20</strong></li>
                        <li>Correct answers = <strong className="text-green-600">12</strong></li>
                        <li>Passing threshold = <strong>60%</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Calculation:</h4>
                      <div className="space-y-2 text-gray-700">
                        <div className="flex items-center gap-2">
                          <span>Percentage =</span>
                          {renderFraction(12, 20, 'sm')}
                          <span>× 100</span>
                        </div>
                        <p>Percentage = 0.60 × 100 = <strong className="text-orange-700 text-xl">60%</strong></p>
                        <p className="mt-3">Letter Grade: <strong className="text-orange-700 bg-orange-100 px-3 py-1 rounded text-xl">D</strong></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-100 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Result:</strong> The student scores exactly <strong className="text-orange-700">60%</strong>, which is a <strong className="text-orange-700">D grade</strong> - just barely passing! One more wrong answer would have resulted in failing.
                  </p>
                </div>
              </div>
            </section>

            {/* Grading Scales Comparison */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Understanding Different Grading Scales
              </h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                  <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <tr>
                      <th className="text-left py-4 px-4 font-semibold">Grade</th>
                      <th className="text-center py-4 px-4 font-semibold">Standard (10-Point)</th>
                      <th className="text-center py-4 px-4 font-semibold">Plus/Minus</th>
                      <th className="text-center py-4 px-4 font-semibold">7-Point (Strict)</th>
                      <th className="text-center py-4 px-4 font-semibold">GPA Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-green-50">
                      <td className="py-3 px-4 font-bold text-green-700 text-lg">A+</td>
                      <td className="text-center py-3 px-4 text-gray-700">-</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">97-100%</td>
                      <td className="text-center py-3 px-4 text-gray-700">-</td>
                      <td className="text-center py-3 px-4 font-semibold text-green-700">4.0</td>
                    </tr>
                    <tr className="border-b bg-green-50">
                      <td className="py-3 px-4 font-bold text-green-700 text-lg">A</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">90-100%</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">93-96%</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">93-100%</td>
                      <td className="text-center py-3 px-4 font-semibold text-green-700">4.0</td>
                    </tr>
                    <tr className="border-b bg-green-50/50">
                      <td className="py-3 px-4 font-bold text-green-600 text-lg">A-</td>
                      <td className="text-center py-3 px-4 text-gray-700">-</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">90-92%</td>
                      <td className="text-center py-3 px-4 text-gray-700">-</td>
                      <td className="text-center py-3 px-4 font-semibold text-green-600">3.7</td>
                    </tr>
                    <tr className="border-b bg-blue-50">
                      <td className="py-3 px-4 font-bold text-blue-700 text-lg">B+</td>
                      <td className="text-center py-3 px-4 text-gray-700">-</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">87-89%</td>
                      <td className="text-center py-3 px-4 text-gray-700">-</td>
                      <td className="text-center py-3 px-4 font-semibold text-blue-700">3.3</td>
                    </tr>
                    <tr className="border-b bg-blue-50">
                      <td className="py-3 px-4 font-bold text-blue-700 text-lg">B</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">80-89%</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">83-86%</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">85-92%</td>
                      <td className="text-center py-3 px-4 font-semibold text-blue-700">3.0</td>
                    </tr>
                    <tr className="border-b bg-blue-50/50">
                      <td className="py-3 px-4 font-bold text-blue-600 text-lg">B-</td>
                      <td className="text-center py-3 px-4 text-gray-700">-</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">80-82%</td>
                      <td className="text-center py-3 px-4 text-gray-700">-</td>
                      <td className="text-center py-3 px-4 font-semibold text-blue-600">2.7</td>
                    </tr>
                    <tr className="border-b bg-yellow-50">
                      <td className="py-3 px-4 font-bold text-yellow-700 text-lg">C+</td>
                      <td className="text-center py-3 px-4 text-gray-700">-</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">77-79%</td>
                      <td className="text-center py-3 px-4 text-gray-700">-</td>
                      <td className="text-center py-3 px-4 font-semibold text-yellow-700">2.3</td>
                    </tr>
                    <tr className="border-b bg-yellow-50">
                      <td className="py-3 px-4 font-bold text-yellow-700 text-lg">C</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">70-79%</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">73-76%</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">77-84%</td>
                      <td className="text-center py-3 px-4 font-semibold text-yellow-700">2.0</td>
                    </tr>
                    <tr className="border-b bg-yellow-50/50">
                      <td className="py-3 px-4 font-bold text-yellow-600 text-lg">C-</td>
                      <td className="text-center py-3 px-4 text-gray-700">-</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">70-72%</td>
                      <td className="text-center py-3 px-4 text-gray-700">-</td>
                      <td className="text-center py-3 px-4 font-semibold text-yellow-600">1.7</td>
                    </tr>
                    <tr className="border-b bg-orange-50">
                      <td className="py-3 px-4 font-bold text-orange-700 text-lg">D</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">60-69%</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">60-69%</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">70-76%</td>
                      <td className="text-center py-3 px-4 font-semibold text-orange-700">1.0</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="py-3 px-4 font-bold text-red-700 text-lg">F</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">0-59%</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">0-59%</td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">0-69%</td>
                      <td className="text-center py-3 px-4 font-semibold text-red-700">0.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-3 text-xl flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Standard 10-Point Scale
                  </h4>
                  <p className="text-gray-700 mb-3">
                    The most common grading scale in U.S. education. Each 10-percentage-point range corresponds to one letter grade.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>A: 90-100% (Excellent)</li>
                    <li>B: 80-89% (Above Average)</li>
                    <li>C: 70-79% (Average)</li>
                    <li>D: 60-69% (Below Average, Passing)</li>
                    <li>F: Below 60% (Failing)</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                  <h4 className="font-bold text-purple-800 mb-3 text-xl flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    7-Point Scale (Strict)
                  </h4>
                  <p className="text-gray-700 mb-3">
                    A more rigorous scale often used in competitive academic environments. An A requires 93% or higher.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>A: 93-100% (Excellent)</li>
                    <li>B: 85-92% (Above Average)</li>
                    <li>C: 77-84% (Average)</li>
                    <li>D: 70-76% (Below Average)</li>
                    <li>F: Below 70% (Failing)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Quick Reference Charts */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Quick Reference: Common Test Sizes
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 10-Question Test */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-200">
                  <h3 className="text-lg font-bold text-green-800 mb-3">10 Questions</h3>
                  <p className="text-xs text-gray-600 mb-3">Each question = 10%</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span>0 wrong:</span><span className="font-bold text-green-700">100% (A)</span></div>
                    <div className="flex justify-between"><span>1 wrong:</span><span className="font-bold text-green-700">90% (A)</span></div>
                    <div className="flex justify-between"><span>2 wrong:</span><span className="font-bold text-blue-700">80% (B)</span></div>
                    <div className="flex justify-between"><span>3 wrong:</span><span className="font-bold text-yellow-700">70% (C)</span></div>
                    <div className="flex justify-between"><span>4 wrong:</span><span className="font-bold text-orange-700">60% (D)</span></div>
                  </div>
                </div>

                {/* 20-Question Test */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border-2 border-blue-200">
                  <h3 className="text-lg font-bold text-blue-800 mb-3">20 Questions</h3>
                  <p className="text-xs text-gray-600 mb-3">Each question = 5%</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span>0 wrong:</span><span className="font-bold text-green-700">100% (A)</span></div>
                    <div className="flex justify-between"><span>2 wrong:</span><span className="font-bold text-green-700">90% (A)</span></div>
                    <div className="flex justify-between"><span>4 wrong:</span><span className="font-bold text-blue-700">80% (B)</span></div>
                    <div className="flex justify-between"><span>6 wrong:</span><span className="font-bold text-yellow-700">70% (C)</span></div>
                    <div className="flex justify-between"><span>8 wrong:</span><span className="font-bold text-orange-700">60% (D)</span></div>
                  </div>
                </div>

                {/* 25-Question Test */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border-2 border-purple-200">
                  <h3 className="text-lg font-bold text-purple-800 mb-3">25 Questions</h3>
                  <p className="text-xs text-gray-600 mb-3">Each question = 4%</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span>0 wrong:</span><span className="font-bold text-green-700">100% (A)</span></div>
                    <div className="flex justify-between"><span>2 wrong:</span><span className="font-bold text-green-700">92% (A)</span></div>
                    <div className="flex justify-between"><span>5 wrong:</span><span className="font-bold text-blue-700">80% (B)</span></div>
                    <div className="flex justify-between"><span>7 wrong:</span><span className="font-bold text-yellow-700">72% (C)</span></div>
                    <div className="flex justify-between"><span>10 wrong:</span><span className="font-bold text-orange-700">60% (D)</span></div>
                  </div>
                </div>

                {/* 50-Question Test */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 border-2 border-orange-200">
                  <h3 className="text-lg font-bold text-orange-800 mb-3">50 Questions</h3>
                  <p className="text-xs text-gray-600 mb-3">Each question = 2%</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span>0 wrong:</span><span className="font-bold text-green-700">100% (A)</span></div>
                    <div className="flex justify-between"><span>5 wrong:</span><span className="font-bold text-green-700">90% (A)</span></div>
                    <div className="flex justify-between"><span>10 wrong:</span><span className="font-bold text-blue-700">80% (B)</span></div>
                    <div className="flex justify-between"><span>15 wrong:</span><span className="font-bold text-yellow-700">70% (C)</span></div>
                    <div className="flex justify-between"><span>20 wrong:</span><span className="font-bold text-orange-700">60% (D)</span></div>
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
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-red-800 mb-2">Confusing # Wrong with # Correct</h4>
                      <p className="text-gray-700">
                        Double-check whether you&apos;re entering the number of wrong answers or correct answers. Getting 7 wrong on a 40-question test (82.5%) is very different from getting 7 correct (17.5%).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-orange-800 mb-2">Forgetting About Partial Credit</h4>
                      <p className="text-gray-700">
                        Some tests award partial credit. If your test has partial credit, use the &quot;Points&quot; mode instead of counting questions as fully correct or wrong.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-500">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-yellow-800 mb-2">Using the Wrong Grading Scale</h4>
                      <p className="text-gray-700">
                        Always check your syllabus or ask your teacher which grading scale they use. An 89% might be an A- on some scales but a B+ on others.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-blue-800 mb-2">Not Accounting for Extra Credit</h4>
                      <p className="text-gray-700">
                        If your test includes extra credit questions, your total points possible should include only the regular questions unless the extra credit is mandatory.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tips for Better Test Performance */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Tips for Improving Test Grades
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-green-800 mb-2">Know Your Target</h4>
                      <p className="text-gray-700 text-sm">
                        Before the test, calculate how many questions you can miss and still get your desired grade. For a 20-question test, missing 2 still gets you 90% (A).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-blue-800 mb-2">Review Wrong Answers</h4>
                      <p className="text-gray-700 text-sm">
                        After getting your test back, analyze your mistakes. Understanding why you got answers wrong helps prevent similar errors in the future.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-purple-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-purple-800 mb-2">Time Management</h4>
                      <p className="text-gray-700 text-sm">
                        Divide your test time by the number of questions. If you have 60 minutes for 40 questions, spend about 1.5 minutes per question.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-orange-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-orange-800 mb-2">Answer Every Question</h4>
                      <p className="text-gray-700 text-sm">
                        Unless there&apos;s a penalty for guessing, never leave questions blank. A guess gives you a chance; a blank answer is automatically wrong.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    What percentage is needed to pass a test?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    In most U.S. schools, 60% is the minimum passing grade, corresponding to a D. However, some schools or courses may require 65% or 70% to pass. College courses often require a C (70-73%) minimum. Always check your course syllabus for specific requirements.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    How do I calculate my grade if questions have different point values?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Use the &quot;Points&quot; mode instead of &quot;# Wrong&quot; or &quot;# Correct.&quot; Enter your total points earned and total points possible. For example, if you earned 78 out of 100 possible points (with some questions worth more than others), enter 78 as points earned and 100 as points possible.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    Is an 89.5% an A or a B?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    It depends on your teacher&apos;s rounding policy. Some teachers round 89.5% up to 90% (A), while others keep it at 89% (B+). On the standard scale without plus/minus grades, 89.5% would round to 90% and be an A. Check with your teacher about their specific rounding policy.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    How many questions can I miss and still get an A?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    For an A (90%+) on a standard scale: On a 10-question test, miss 1; on a 20-question test, miss 2; on a 25-question test, miss 2; on a 50-question test, miss 5; on a 100-question test, miss 10. Use our calculator to find exact thresholds for any test size.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    What&apos;s the difference between weighted and unweighted grades?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    This test grade calculator calculates <strong>unweighted grades</strong> - each question has equal value. <strong>Weighted grades</strong> give different values to different assignment types (e.g., tests worth 40%, homework worth 20%). For weighted grade calculations, use our <Link href="/calculators/grade-calculator" className="text-indigo-600 hover:underline">Grade Calculator</Link>.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    Can I use this for weighted tests where some questions count more?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Yes! Switch to &quot;Points&quot; mode and enter your points earned and total points possible. For example, if a test has 20 multiple choice (1 point each = 20 points) and 4 essays (5 points each = 20 points), the total is 40 points. Enter your total points earned out of 40.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    How do I calculate my grade with extra credit?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Extra credit can push your score above 100%. Use &quot;Points&quot; mode: enter your total points (including extra credit) as &quot;Points Earned&quot; and the original maximum as &quot;Points Possible.&quot; For example, 105 points earned out of 100 possible = 105%.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    What is a good test grade?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    A &quot;good&quot; grade is subjective and depends on context. Generally: <strong>90%+ (A)</strong> is excellent, <strong>80-89% (B)</strong> is above average, <strong>70-79% (C)</strong> is average/satisfactory. For college applications, aim for A&apos;s and high B&apos;s. For graduate school, mostly A&apos;s are expected.
                  </p>
                </div>
              </div>
            </section>

            {/* Related Calculators */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Related Calculators
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/calculators/grade-calculator" className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border-2 border-indigo-200 hover:border-indigo-400 transition-colors group">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center group-hover:text-indigo-700">
                    <Calculator className="w-5 h-5 mr-2 text-indigo-600" />
                    Grade Calculator
                  </h4>
                  <p className="text-sm text-gray-600">
                    Calculate your final course grade with weighted categories. Find out what you need on the final exam.
                  </p>
                </Link>

                <Link href="/calculators/ez-grader" className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border-2 border-green-200 hover:border-green-400 transition-colors group">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center group-hover:text-green-700">
                    <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" />
                    EZ Grader
                  </h4>
                  <p className="text-sm text-gray-600">
                    Quick grading tool for teachers. Generate complete grading charts for any test size.
                  </p>
                </Link>

                <Link href="/calculators/college-gpa-calculator" className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-colors group">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center group-hover:text-blue-700">
                    <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                    College GPA Calculator
                  </h4>
                  <p className="text-sm text-gray-600">
                    Calculate your cumulative college GPA with credit weighting on a 4.0 scale.
                  </p>
                </Link>

                <Link href="/calculators/percentage-calculator" className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-colors group">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center group-hover:text-purple-700">
                    <Percent className="w-5 h-5 mr-2 text-purple-600" />
                    Percentage Calculator
                  </h4>
                  <p className="text-sm text-gray-600">
                    Calculate percentages of any values with step-by-step solutions.
                  </p>
                </Link>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Calculate Your Grade Instantly</h2>
                <p className="text-lg text-indigo-100 mb-6 leading-relaxed">
                  Our Test Grade Calculator makes it easy to convert your test scores into percentages and letter grades. Whether you just finished a quiz and want to know your grade before the teacher posts it, or you&apos;re a teacher grading papers, this tool provides instant, accurate results with multiple grading scale options.
                </p>
                <p className="text-lg text-indigo-100 leading-relaxed">
                  Remember: a single test grade is just one measure of your learning. Use this calculator to track your progress, but focus on understanding the material rather than just the numbers. Consistent effort and learning from mistakes will lead to better grades over time.
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
              Need Help Improving Your Test Scores?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master any subject, develop better study habits, and improve your test-taking strategies. Get personalized one-on-one guidance tailored to your learning style.
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
