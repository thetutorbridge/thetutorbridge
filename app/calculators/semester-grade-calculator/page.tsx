'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, BookOpen, ArrowRight, GraduationCap, Plus, Trash2, Award, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface GradePeriod {
  id: string;
  name: string;
  grade: string;
  weight: string;
}

interface SemesterResult {
  semesterGrade: number;
  letterGrade: string;
  steps: string[];
  formula: string;
  weightedBreakdown: { period: string; grade: number; weight: number; contribution: number }[];
  totalWeight: number;
}

export default function SemesterGradeCalculator() {
  const [gradePeriods, setGradePeriods] = useState<GradePeriod[]>([
    { id: '1', name: 'Quarter 1 (Q1)', grade: '', weight: '40' },
    { id: '2', name: 'Quarter 2 (Q2)', grade: '', weight: '40' },
    { id: '3', name: 'Final Exam', grade: '', weight: '20' },
  ]);

  const [result, setResult] = useState<SemesterResult | null>(null);

  const getLetterGrade = (percentage: number): string => {
    if (percentage >= 97) return 'A+';
    if (percentage >= 93) return 'A';
    if (percentage >= 90) return 'A-';
    if (percentage >= 87) return 'B+';
    if (percentage >= 83) return 'B';
    if (percentage >= 80) return 'B-';
    if (percentage >= 77) return 'C+';
    if (percentage >= 73) return 'C';
    if (percentage >= 70) return 'C-';
    if (percentage >= 67) return 'D+';
    if (percentage >= 63) return 'D';
    if (percentage >= 60) return 'D-';
    return 'F';
  };

  const handleCalculate = () => {
    // Validation
    let hasError = false;
    let errorMessage = '';

    for (const period of gradePeriods) {
      const grade = parseFloat(period.grade);
      const weight = parseFloat(period.weight);

      if (period.grade && isNaN(grade)) {
        hasError = true;
        errorMessage = `Invalid grade for ${period.name}. Please enter a valid number.`;
        break;
      }

      if (period.grade && (grade < 0 || grade > 100)) {
        hasError = true;
        errorMessage = `Grade for ${period.name} must be between 0 and 100.`;
        break;
      }

      if (isNaN(weight) || weight < 0 || weight > 100) {
        hasError = true;
        errorMessage = `Weight for ${period.name} must be between 0 and 100.`;
        break;
      }
    }

    if (hasError) {
      alert(errorMessage);
      return;
    }

    // Check if at least one grade is entered
    const hasAtLeastOneGrade = gradePeriods.some(p => p.grade.trim() !== '');
    if (!hasAtLeastOneGrade) {
      alert('Please enter at least one grade.');
      return;
    }

    // Calculate total weight
    const totalWeight = gradePeriods.reduce((sum, period) => {
      if (period.grade.trim() !== '') {
        return sum + parseFloat(period.weight);
      }
      return sum;
    }, 0);

    if (totalWeight === 0) {
      alert('Total weight must be greater than 0.');
      return;
    }

    // Calculate weighted semester grade
    let weightedSum = 0;
    const breakdown: { period: string; grade: number; weight: number; contribution: number }[] = [];
    const steps: string[] = [];

    steps.push('**Step 1:** Convert percentage weights to decimal form (divide by 100)');
    steps.push('');

    gradePeriods.forEach((period, index) => {
      if (period.grade.trim() !== '') {
        const grade = parseFloat(period.grade);
        const weight = parseFloat(period.weight);
        const weightDecimal = weight / 100;
        const contribution = grade * weightDecimal;

        weightedSum += contribution;
        breakdown.push({
          period: period.name,
          grade,
          weight,
          contribution,
        });

        steps.push(`**${period.name}:**`);
        steps.push(`- Grade: ${grade}%`);
        steps.push(`- Weight: ${weight}% = ${weightDecimal.toFixed(2)}`);
        steps.push(`- Contribution: ${grade} × ${weightDecimal.toFixed(2)} = ${contribution.toFixed(2)}`);
        steps.push('');
      }
    });

    steps.push('**Step 2:** Add all weighted contributions');
    steps.push('');

    const contributionStrings = breakdown.map(b => `${b.contribution.toFixed(2)}`).join(' + ');
    steps.push(`Semester Grade = ${contributionStrings}`);
    steps.push(`Semester Grade = ${weightedSum.toFixed(2)}%`);

    // If weights don't add up to 100%, normalize
    let finalGrade = weightedSum;
    if (Math.abs(totalWeight - 100) > 0.01) {
      finalGrade = (weightedSum / totalWeight) * 100;
      steps.push('');
      steps.push(`**Step 3:** Normalize grade (weights don't sum to 100%)`);
      steps.push(`Normalized Grade = (${weightedSum.toFixed(2)} ÷ ${totalWeight}) × 100 = ${finalGrade.toFixed(2)}%`);
    }

    const letterGrade = getLetterGrade(finalGrade);

    // Generate formula
    const formulaParts = breakdown.map(b =>
      `(${b.grade} × ${(b.weight / 100).toFixed(2)})`
    );
    const formula = formulaParts.join(' + ');

    setResult({
      semesterGrade: parseFloat(finalGrade.toFixed(2)),
      letterGrade,
      steps,
      formula: totalWeight === 100 ? formula : `(${formula}) ÷ ${totalWeight / 100}`,
      weightedBreakdown: breakdown,
      totalWeight,
    });
  };

  const handleClear = () => {
    setGradePeriods([
      { id: '1', name: 'Quarter 1 (Q1)', grade: '', weight: '40' },
      { id: '2', name: 'Quarter 2 (Q2)', grade: '', weight: '40' },
      { id: '3', name: 'Final Exam', grade: '', weight: '20' },
    ]);
    setResult(null);
  };

  const addGradePeriod = () => {
    const newId = (Math.max(...gradePeriods.map(p => parseInt(p.id))) + 1).toString();
    setGradePeriods([
      ...gradePeriods,
      { id: newId, name: `Period ${newId}`, grade: '', weight: '0' },
    ]);
  };

  const removeGradePeriod = (id: string) => {
    if (gradePeriods.length > 2) {
      setGradePeriods(gradePeriods.filter(p => p.id !== id));
    } else {
      alert('You must have at least 2 grading periods.');
    }
  };

  const updateGradePeriod = (id: string, field: 'name' | 'grade' | 'weight', value: string) => {
    setGradePeriods(gradePeriods.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do you calculate a semester grade with quarters and finals?","acceptedAnswer":{"@type":"Answer","text":"To calculate a semester grade with quarters and finals, multiply each grade by its weight (as a decimal), then sum all the weighted values. For example, with Q1=85% (40%), Q2=90% (40%), and Final=80% (20%): (85×0.40) + (90×0.40) + (80×0.20) = 34 + 36 + 16 = 86% semester grade."}},{"@type":"Question","name":"What if my weights don\'t add up to 100%?","acceptedAnswer":{"@type":"Answer","text":"Our calculator automatically normalizes your grade when weights don\'t sum to 100%. It divides the weighted sum by the total weight, then multiplies by 100 to give you an accurate percentage. For example, if weights total 80%, the calculator adjusts accordingly."}},{"@type":"Question","name":"Can I calculate my semester grade with missing assignments?","acceptedAnswer":{"@type":"Answer","text":"Yes! Simply leave the grade field blank for any incomplete periods. The calculator will compute your semester grade based only on completed work. This is useful for predicting your current standing or calculating what you need on remaining assessments."}},{"@type":"Question","name":"What\'s the difference between a semester grade and semester GPA?","acceptedAnswer":{"@type":"Answer","text":"A semester grade is the percentage or letter grade you receive in a single course (e.g., 86% or B+). Semester GPA is the average of all your course grades for that semester, calculated by converting letter grades to GPA points (e.g., A=4.0, B=3.0) and averaging them with credit hour weighting."}},{"@type":"Question","name":"How do I find out the weight of each grading period?","acceptedAnswer":{"@type":"Answer","text":"Check your course syllabus, which typically lists the weight distribution for quarters, exams, projects, and participation. You can also ask your teacher or check the online gradebook, which often displays percentage weights. Common distributions are 40-40-20 or 45-45-10 for two-quarter systems."}},{"@type":"Question","name":"Can this calculator be used for trimester systems?","acceptedAnswer":{"@type":"Answer","text":"Absolutely! Click \'Add Another Period\' to include additional grading periods for trimester, quarter, or any custom grading system. The calculator supports unlimited periods with flexible weight distributions to accommodate any academic schedule."}},{"@type":"Question","name":"What grade do I need on my final exam to get an A in the class?","acceptedAnswer":{"@type":"Answer","text":"Enter your current quarter grades and their weights, then set different final exam scores until your semester grade reaches your target (typically 90% or 93% for an A). Our step-by-step solution will show you the exact calculation. For precise \'what-if\' scenarios, try different values systematically."}},{"@type":"Question","name":"Is this calculator accurate for college courses?","acceptedAnswer":{"@type":"Answer","text":"Yes, this semester grade calculator works for all educational levels—high school, college, graduate school, and professional programs. The weighted average formula is universal. Just ensure you input the correct weights as specified in your course syllabus."}}]}' }}
      />
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
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
            <span className="text-gray-900 font-medium">Semester Grade Calculator</span>
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
              Semester Grade Calculator
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Calculate your semester grade using quarterly grades, final exam scores, and customizable weights with step-by-step solutions.
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
                  Enter Grades & Weights
                </h2>

                {/* Grade Periods */}
                <div className="space-y-4 mb-6">
                  {gradePeriods.map((period, index) => (
                    <div key={period.id} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border-2 border-indigo-100">
                      <div className="flex items-center justify-between mb-3">
                        <Input
                          type="text"
                          value={period.name}
                          onChange={(e) => updateGradePeriod(period.id, 'name', e.target.value)}
                          className="font-semibold text-sm flex-1 mr-2 bg-white"
                          placeholder="Period name"
                        />
                        {gradePeriods.length > 2 && (
                          <Button
                            onClick={() => removeGradePeriod(period.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor={`grade-${period.id}`} className="text-xs text-gray-600 mb-1 block">
                            Grade (%)
                          </Label>
                          <Input
                            id={`grade-${period.id}`}
                            type="number"
                            placeholder="0-100"
                            value={period.grade}
                            onChange={(e) => updateGradePeriod(period.id, 'grade', e.target.value)}
                            className="text-center font-medium"
                            min="0"
                            max="100"
                            step="0.01"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`weight-${period.id}`} className="text-xs text-gray-600 mb-1 block">
                            Weight (%)
                          </Label>
                          <Input
                            id={`weight-${period.id}`}
                            type="number"
                            placeholder="0-100"
                            value={period.weight}
                            onChange={(e) => updateGradePeriod(period.id, 'weight', e.target.value)}
                            className="text-center font-medium"
                            min="0"
                            max="100"
                            step="1"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Period Button */}
                <Button
                  onClick={addGradePeriod}
                  variant="outline"
                  className="w-full mb-6 border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Period
                </Button>

                {/* Total Weight Display */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Total Weight:</span>
                    <span className={`text-lg font-bold ${
                      gradePeriods.reduce((sum, p) => sum + (parseFloat(p.weight) || 0), 0) === 100
                        ? 'text-green-600'
                        : 'text-amber-600'
                    }`}>
                      {gradePeriods.reduce((sum, p) => sum + (parseFloat(p.weight) || 0), 0).toFixed(0)}%
                    </span>
                  </div>
                  {gradePeriods.reduce((sum, p) => sum + (parseFloat(p.weight) || 0), 0) !== 100 && (
                    <p className="text-xs text-amber-600 mt-2 flex items-start gap-1">
                      <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>Weights don't sum to 100%. Grade will be normalized.</span>
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Calculate
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
                  {/* Answer Card */}
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Award className="w-6 h-6" />
                      Your Semester Grade
                    </h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
                      <div className="text-center">
                        <p className="text-5xl md:text-6xl font-bold">{result.semesterGrade}%</p>
                        <p className="text-2xl md:text-3xl font-semibold mt-2 text-indigo-100">
                          Letter Grade: {result.letterGrade}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Weighted Breakdown */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-indigo-600" />
                      Weighted Breakdown
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Period</th>
                            <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Grade</th>
                            <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Weight</th>
                            <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Contribution</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.weightedBreakdown.map((item, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-indigo-50 transition-colors">
                              <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.period}</td>
                              <td className="py-3 px-4 text-sm text-center text-gray-700">{item.grade}%</td>
                              <td className="py-3 px-4 text-sm text-center text-gray-700">{item.weight}%</td>
                              <td className="py-3 px-4 text-sm text-center font-semibold text-indigo-600">
                                {item.contribution.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-indigo-50 font-bold">
                            <td className="py-3 px-4 text-sm text-gray-900">Total</td>
                            <td className="py-3 px-4 text-sm text-center">—</td>
                            <td className="py-3 px-4 text-sm text-center text-gray-900">{result.totalWeight}%</td>
                            <td className="py-3 px-4 text-sm text-center text-indigo-600">
                              {result.semesterGrade}%
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Step-by-Step Solution */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                      Solution with Steps
                    </h3>
                    <div className="space-y-2 prose prose-sm max-w-none">
                      {result.steps.map((step, index) => (
                        <div key={index}>
                          {step.startsWith('**') ? (
                            <p className="text-gray-900 font-semibold mt-3 mb-1">
                              {step.replace(/\*\*/g, '')}
                            </p>
                          ) : step.startsWith('-') ? (
                            <p className="text-gray-700 ml-4">{step}</p>
                          ) : step === '' ? (
                            <div className="h-2" />
                          ) : (
                            <p className="text-gray-700 leading-relaxed">{step}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Formula Section */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Formula Used
                    </h3>
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                      <p className="text-sm text-gray-600 mb-3">Weighted Average Formula:</p>
                      <div className="bg-white rounded-lg p-4 font-mono text-sm md:text-base text-gray-800 overflow-x-auto">
                        <p className="mb-2">Semester Grade = {result.formula}</p>
                      </div>
                      <p className="text-xs text-gray-600 mt-3">
                        where each grade is multiplied by its weight (as a decimal) and then summed
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Enter your grades and weights, then click Calculate to see your semester grade
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

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What is a Semester Grade Calculator?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                A <strong>semester grade calculator</strong> is an essential academic tool that helps students calculate their final semester grade based on multiple grading periods such as quarters, midterms, and final exams. This calculator uses a weighted average formula where each component (quarters, exams, projects) is assigned a specific percentage weight that determines its contribution to the overall semester grade.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Unlike a simple average, a semester grade calculator accounts for the varying importance of different assessment periods. For example, final exams might count for 20% of your grade while each quarter counts for 40%. This weighted approach provides a more accurate reflection of your academic performance throughout the semester.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our free semester grade calculator supports unlimited grading periods, automatically normalizes weights if they don't sum to 100%, and provides detailed step-by-step solutions showing exactly how your semester grade is calculated. Whether you're in high school, college, or graduate school, this tool helps you track your academic progress and plan for success.
              </p>
            </section>

            {/* How It Works */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Use This Semester Grade Calculator
              </h2>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 md:p-8">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Enter Your Grades:</strong>
                      <p className="text-gray-700 mt-1">Input the percentage grades you've earned for each grading period (e.g., Quarter 1: 85%, Quarter 2: 92%). Leave blank if you haven't completed a period yet.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Set Weight Percentages:</strong>
                      <p className="text-gray-700 mt-1">Assign the weight (importance) of each grading period. Common distributions are 40%-40%-20% (two quarters + final exam) or 45%-45%-10% for different grading systems.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Add Custom Periods (Optional):</strong>
                      <p className="text-gray-700 mt-1">Click "Add Another Period" to include additional grading components like projects, participation, or midterm exams that contribute to your semester grade.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong className="text-gray-900">Calculate Your Semester Grade:</strong>
                      <p className="text-gray-700 mt-1">Click the "Calculate" button to see your weighted semester grade, letter grade, detailed breakdown, and step-by-step solution.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
                    <div>
                      <strong className="text-gray-900">Review the Results:</strong>
                      <p className="text-gray-700 mt-1">Examine the weighted breakdown table to understand how each period contributes to your final grade. Use this insight to identify areas for improvement.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* Understanding the Formula */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Understanding the Weighted Average Formula
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The semester grade calculator uses a <strong>weighted average formula</strong> to calculate your final grade. Here's the mathematical representation:
              </p>
              <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl p-6 md:p-8 mb-6">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 mb-2">General Formula:</p>
                  <div className="inline-flex flex-col items-center justify-center">
                    <span className="text-xl md:text-2xl font-semibold px-3 pb-2">
                      (G₁ × W₁) + (G₂ × W₂) + ... + (Gₙ × Wₙ)
                    </span>
                    <span className="w-full border-t-2 border-gray-900 my-1"></span>
                    <span className="text-xl md:text-2xl font-semibold px-3 pt-2">
                      Total Weight
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1 mt-4">
                  <p><strong>Where:</strong></p>
                  <p>• G₁, G₂, ..., Gₙ = Individual period grades (as percentages)</p>
                  <p>• W₁, W₂, ..., Wₙ = Weights for each period (as decimals, e.g., 0.40 for 40%)</p>
                  <p>• n = Number of grading periods</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Step-by-Step Calculation Example:</h3>
              <div className="bg-white border-2 border-indigo-100 rounded-xl p-6">
                <p className="text-gray-700 mb-3"><strong>Given:</strong></p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Quarter 1 Grade: 85% (Weight: 40%)</li>
                  <li>Quarter 2 Grade: 92% (Weight: 40%)</li>
                  <li>Final Exam: 78% (Weight: 20%)</li>
                </ul>

                <p className="text-gray-700 mb-3"><strong>Solution:</strong></p>
                <div className="space-y-2 text-gray-700 font-mono text-sm md:text-base bg-gray-50 p-4 rounded-lg">
                  <p><strong>Step 1:</strong> Convert weights to decimals</p>
                  <p className="ml-4">W₁ = 40% = 0.40</p>
                  <p className="ml-4">W₂ = 40% = 0.40</p>
                  <p className="ml-4">W₃ = 20% = 0.20</p>

                  <p className="mt-3"><strong>Step 2:</strong> Multiply each grade by its weight</p>
                  <p className="ml-4">Q1 Contribution = 85 × 0.40 = 34.00</p>
                  <p className="ml-4">Q2 Contribution = 92 × 0.40 = 36.80</p>
                  <p className="ml-4">Final Contribution = 78 × 0.20 = 15.60</p>

                  <p className="mt-3"><strong>Step 3:</strong> Add all contributions</p>
                  <p className="ml-4">Semester Grade = 34.00 + 36.80 + 15.60</p>
                  <p className="ml-4 text-indigo-600 font-bold">Semester Grade = 86.40%</p>
                </div>
              </div>
            </section>

            {/* Common Grading Systems */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Semester Grading Systems
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-indigo-600 mb-3">Two-Quarter System (40-40-20)</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Quarter 1: 40%</li>
                    <li>• Quarter 2: 40%</li>
                    <li>• Final Exam: 20%</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3">
                    Most common in high schools and undergraduate courses. Emphasizes continuous performance over two quarters with a final exam.
                  </p>
                </div>

                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">Three-Quarter System (30-30-30-10)</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Quarter 1: 30%</li>
                    <li>• Quarter 2: 30%</li>
                    <li>• Quarter 3: 30%</li>
                    <li>• Final Exam: 10%</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3">
                    Used in trimester systems where continuous assessment is prioritized over final exams.
                  </p>
                </div>

                <div className="bg-white border-2 border-blue-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-3">Equal Weight System (25-25-25-25)</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Quarter 1: 25%</li>
                    <li>• Quarter 2: 25%</li>
                    <li>• Midterm: 25%</li>
                    <li>• Final Exam: 25%</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3">
                    Distributes weight equally across all assessment periods, common in college courses.
                  </p>
                </div>

                <div className="bg-white border-2 border-teal-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-teal-600 mb-3">Project-Based System (30-30-20-20)</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Quarter 1: 30%</li>
                    <li>• Quarter 2: 30%</li>
                    <li>• Major Project: 20%</li>
                    <li>• Final Exam: 20%</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3">
                    Includes significant project work alongside traditional assessments, common in STEM courses.
                  </p>
                </div>
              </div>
            </section>

            {/* Letter Grade Scale */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Standard Letter Grade Scale
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our calculator uses the standard 4.0 GPA letter grade scale used by most high schools and colleges in the United States:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <tr>
                      <th className="py-3 px-4 text-left">Letter Grade</th>
                      <th className="py-3 px-4 text-center">Percentage Range</th>
                      <th className="py-3 px-4 text-center">GPA Equivalent</th>
                      <th className="py-3 px-4 text-left">Performance Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-green-50">
                      <td className="py-3 px-4 font-bold text-green-700">A+</td>
                      <td className="py-3 px-4 text-center">97-100%</td>
                      <td className="py-3 px-4 text-center">4.0</td>
                      <td className="py-3 px-4">Outstanding</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="py-3 px-4 font-bold text-green-600">A</td>
                      <td className="py-3 px-4 text-center">93-96%</td>
                      <td className="py-3 px-4 text-center">4.0</td>
                      <td className="py-3 px-4">Excellent</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="py-3 px-4 font-bold text-green-500">A-</td>
                      <td className="py-3 px-4 text-center">90-92%</td>
                      <td className="py-3 px-4 text-center">3.7</td>
                      <td className="py-3 px-4">Excellent</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="py-3 px-4 font-bold text-blue-600">B+</td>
                      <td className="py-3 px-4 text-center">87-89%</td>
                      <td className="py-3 px-4 text-center">3.3</td>
                      <td className="py-3 px-4">Very Good</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="py-3 px-4 font-bold text-blue-600">B</td>
                      <td className="py-3 px-4 text-center">83-86%</td>
                      <td className="py-3 px-4 text-center">3.0</td>
                      <td className="py-3 px-4">Good</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="py-3 px-4 font-bold text-blue-500">B-</td>
                      <td className="py-3 px-4 text-center">80-82%</td>
                      <td className="py-3 px-4 text-center">2.7</td>
                      <td className="py-3 px-4">Good</td>
                    </tr>
                    <tr className="hover:bg-yellow-50">
                      <td className="py-3 px-4 font-bold text-yellow-700">C+</td>
                      <td className="py-3 px-4 text-center">77-79%</td>
                      <td className="py-3 px-4 text-center">2.3</td>
                      <td className="py-3 px-4">Satisfactory</td>
                    </tr>
                    <tr className="hover:bg-yellow-50">
                      <td className="py-3 px-4 font-bold text-yellow-700">C</td>
                      <td className="py-3 px-4 text-center">73-76%</td>
                      <td className="py-3 px-4 text-center">2.0</td>
                      <td className="py-3 px-4">Satisfactory</td>
                    </tr>
                    <tr className="hover:bg-yellow-50">
                      <td className="py-3 px-4 font-bold text-yellow-600">C-</td>
                      <td className="py-3 px-4 text-center">70-72%</td>
                      <td className="py-3 px-4 text-center">1.7</td>
                      <td className="py-3 px-4">Satisfactory</td>
                    </tr>
                    <tr className="hover:bg-orange-50">
                      <td className="py-3 px-4 font-bold text-orange-600">D+</td>
                      <td className="py-3 px-4 text-center">67-69%</td>
                      <td className="py-3 px-4 text-center">1.3</td>
                      <td className="py-3 px-4">Below Average</td>
                    </tr>
                    <tr className="hover:bg-orange-50">
                      <td className="py-3 px-4 font-bold text-orange-600">D</td>
                      <td className="py-3 px-4 text-center">63-66%</td>
                      <td className="py-3 px-4 text-center">1.0</td>
                      <td className="py-3 px-4">Below Average</td>
                    </tr>
                    <tr className="hover:bg-orange-50">
                      <td className="py-3 px-4 font-bold text-orange-500">D-</td>
                      <td className="py-3 px-4 text-center">60-62%</td>
                      <td className="py-3 px-4 text-center">0.7</td>
                      <td className="py-3 px-4">Poor</td>
                    </tr>
                    <tr className="hover:bg-red-50">
                      <td className="py-3 px-4 font-bold text-red-600">F</td>
                      <td className="py-3 px-4 text-center">0-59%</td>
                      <td className="py-3 px-4 text-center">0.0</td>
                      <td className="py-3 px-4">Failing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Applications
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-indigo-600 mb-3">📚 Academic Planning</h3>
                  <p className="text-gray-700">
                    Students use semester grade calculators to track their progress throughout the term, identify which courses need more attention, and calculate what scores they need on final exams to achieve their target grades. This helps in prioritizing study time effectively.
                  </p>
                </div>

                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">🎯 GPA Management</h3>
                  <p className="text-gray-700">
                    College students maintain their cumulative GPA by calculating semester grades in advance. This is crucial for maintaining scholarships, academic standing, honor roll eligibility, and admission to competitive programs or graduate schools.
                  </p>
                </div>

                <div className="bg-white border-2 border-blue-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-3">📊 Parent-Teacher Communication</h3>
                  <p className="text-gray-700">
                    Parents and teachers use semester grade calculators during conferences to explain how different assessment components contribute to final grades, helping families understand academic performance and set realistic improvement goals.
                  </p>
                </div>

                <div className="bg-white border-2 border-teal-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-teal-600 mb-3">✅ Course Withdrawal Decisions</h3>
                  <p className="text-gray-700">
                    Students deciding whether to withdraw from a challenging course use semester calculators to determine if passing is still achievable. This helps avoid unnecessary W grades on transcripts while making informed academic decisions.
                  </p>
                </div>

                <div className="bg-white border-2 border-amber-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-amber-600 mb-3">🏆 Scholarship Eligibility</h3>
                  <p className="text-gray-700">
                    Students on academic scholarships that require minimum GPA thresholds use semester calculators to ensure they maintain eligibility. Early calculation allows time to improve grades before the semester ends.
                  </p>
                </div>

                <div className="bg-white border-2 border-rose-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-rose-600 mb-3">🎓 Graduation Planning</h3>
                  <p className="text-gray-700">
                    Seniors calculate semester grades to ensure they meet graduation requirements and maintain the GPA needed for honors distinctions like cum laude, magna cum laude, or summa cum laude at commencement.
                  </p>
                </div>
              </div>
            </section>

            {/* Tips for Better Grades */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Tips for Improving Your Semester Grade
              </h2>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 md:p-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Calculate Your Required Score</h3>
                      <p className="text-gray-700">
                        Use the calculator to work backwards - if you have a target semester grade, calculate what score you need on your final exam or remaining assignments to achieve it.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Focus on High-Weight Components</h3>
                      <p className="text-gray-700">
                        Prioritize studying for assessments with higher weights. A 5-point improvement on a 40% weighted component has more impact than the same improvement on a 10% component.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Track Progress Weekly</h3>
                      <p className="text-gray-700">
                        Recalculate your semester grade after each major assessment. Early detection of grade drops gives you more time to implement improvements.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Leverage Extra Credit Opportunities</h3>
                      <p className="text-gray-700">
                        Even small extra credit points can significantly impact your semester grade. Always complete optional assignments when your grade is borderline.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">5</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Communicate with Your Instructor</h3>
                      <p className="text-gray-700">
                        If you're struggling, discuss your semester grade calculation with your teacher. They may offer study resources, tutoring, or alternative assessment options.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">6</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Create a Study Schedule</h3>
                      <p className="text-gray-700">
                        Based on your required scores, allocate study time proportionally to each subject. Courses where you need higher improvement should receive more attention.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do you calculate a semester grade with quarters and finals?
                  </h3>
                  <p className="text-gray-700">
                    To calculate a semester grade with quarters and finals, multiply each grade by its weight (as a decimal), then sum all the weighted values. For example, with Q1=85% (40%), Q2=90% (40%), and Final=80% (20%): (85×0.40) + (90×0.40) + (80×0.20) = 34 + 36 + 16 = 86% semester grade.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What if my weights don't add up to 100%?
                  </h3>
                  <p className="text-gray-700">
                    Our calculator automatically normalizes your grade when weights don't sum to 100%. It divides the weighted sum by the total weight, then multiplies by 100 to give you an accurate percentage. For example, if weights total 80%, the calculator adjusts accordingly.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can I calculate my semester grade with missing assignments?
                  </h3>
                  <p className="text-gray-700">
                    Yes! Simply leave the grade field blank for any incomplete periods. The calculator will compute your semester grade based only on completed work. This is useful for predicting your current standing or calculating what you need on remaining assessments.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What's the difference between a semester grade and semester GPA?
                  </h3>
                  <p className="text-gray-700">
                    A semester grade is the percentage or letter grade you receive in a single course (e.g., 86% or B+). Semester GPA is the average of all your course grades for that semester, calculated by converting letter grades to GPA points (e.g., A=4.0, B=3.0) and averaging them with credit hour weighting.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do I find out the weight of each grading period?
                  </h3>
                  <p className="text-gray-700">
                    Check your course syllabus, which typically lists the weight distribution for quarters, exams, projects, and participation. You can also ask your teacher or check the online gradebook, which often displays percentage weights. Common distributions are 40-40-20 or 45-45-10 for two-quarter systems.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can this calculator be used for trimester systems?
                  </h3>
                  <p className="text-gray-700">
                    Absolutely! Click "Add Another Period" to include additional grading periods for trimester, quarter, or any custom grading system. The calculator supports unlimited periods with flexible weight distributions to accommodate any academic schedule.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What grade do I need on my final exam to get an A in the class?
                  </h3>
                  <p className="text-gray-700">
                    Enter your current quarter grades and their weights, then set different final exam scores until your semester grade reaches your target (typically 90% or 93% for an A). Our step-by-step solution will show you the exact calculation. For precise "what-if" scenarios, try different values systematically.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Is this calculator accurate for college courses?
                  </h3>
                  <p className="text-gray-700">
                    Yes, this semester grade calculator works for all educational levels—high school, college, graduate school, and professional programs. The weighted average formula is universal. Just ensure you input the correct weights as specified in your course syllabus.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do semester grades affect my cumulative GPA?
                  </h3>
                  <p className="text-gray-700">
                    Each semester grade (converted to GPA points) contributes to your cumulative GPA based on the course's credit hours. Higher credit courses have more impact. For example, a 4-credit course affects your GPA more than a 1-credit course. Calculate individual semester grades first, then use a cumulative GPA calculator.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can I save my semester grade calculations?
                  </h3>
                  <p className="text-gray-700">
                    Currently, the calculator doesn't save data automatically. We recommend taking a screenshot of your results or writing down your calculation for reference. For ongoing tracking, recalculate after each major assessment to monitor your academic progress throughout the semester.
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Take Control of Your Academic Success
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Understanding how your semester grade is calculated empowers you to make informed decisions about your academic future. Our free <strong>semester grade calculator</strong> provides transparent, accurate calculations with detailed step-by-step solutions so you can see exactly how each assessment period contributes to your final grade.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Whether you're planning for final exams, tracking progress towards academic goals, or exploring "what-if" scenarios to improve your grades, this calculator gives you the insights you need. The weighted breakdown table shows the precise impact of each grading period, helping you prioritize your study efforts effectively.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Remember that academic success isn't just about the final number—it's about understanding your strengths, identifying areas for improvement, and developing effective study strategies. Use this calculator as a tool for self-awareness and academic planning, not just grade prediction.
              </p>
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 md:p-8 text-white">
                <h3 className="text-xl font-bold mb-3">Start Calculating Now!</h3>
                <p className="mb-4">
                  Bookmark this page and use our semester grade calculator throughout the term to stay on track with your academic goals. Regular monitoring leads to better outcomes!
                </p>
                <Link href="#calculator">
                  <Button className="bg-white text-indigo-600 hover:bg-gray-100 font-bold">
                    Calculate Your Semester Grade
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
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
              Need Help Improving Your Grades?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you improve your academic performance, develop effective study strategies, and achieve your target semester grades. Get personalized one-on-one guidance tailored to your learning style.
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
