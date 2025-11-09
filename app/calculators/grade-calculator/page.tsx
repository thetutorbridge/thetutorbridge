'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calculator, Plus, Trash2, BarChart3, Target, TrendingUp, Award, BookOpen, FileText, AlertCircle, CheckCircle, Info, Home, GraduationCap } from 'lucide-react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  weight: string;
  earnedPoints: string;
  totalPoints: string;
}

export default function GradeCalculatorPage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Assignments', weight: '20', earnedPoints: '', totalPoints: '' },
    { id: '2', name: 'Quizzes', weight: '20', earnedPoints: '', totalPoints: '' },
    { id: '3', name: 'Tests', weight: '40', earnedPoints: '', totalPoints: '' },
    { id: '4', name: 'Final Exam', weight: '20', earnedPoints: '', totalPoints: '' },
  ]);

  const [calculationResult, setCalculationResult] = useState<{
    currentGrade: number;
    weightedGrade: number;
    letterGrade: string;
    breakdown: { category: string; percentage: number; weighted: number }[];
    totalWeightUsed: number;
    missingCategories: string[];
  } | null>(null);

  const [desiredGrade, setDesiredGrade] = useState('');
  const [finalExamWeight, setFinalExamWeight] = useState('');
  const [requiredGrade, setRequiredGrade] = useState<{
    neededPercentage: number;
    possible: boolean;
    currentWithoutFinal: number;
  } | null>(null);

  const addCategory = () => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name: '',
      weight: '',
      earnedPoints: '',
      totalPoints: '',
    };
    setCategories([...categories, newCategory]);
  };

  const removeCategory = (id: string) => {
    if (categories.length > 1) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const updateCategory = (id: string, field: keyof Category, value: string) => {
    setCategories(categories.map(cat =>
      cat.id === id ? { ...cat, [field]: value } : cat
    ));
  };

  const getLetterGrade = (percentage: number): string => {
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

  const getGradeColor = (grade: string): string => {
    if (grade.startsWith('A')) return 'text-green-700 bg-green-100';
    if (grade.startsWith('B')) return 'text-blue-700 bg-blue-100';
    if (grade.startsWith('C')) return 'text-yellow-700 bg-yellow-100';
    if (grade.startsWith('D')) return 'text-orange-700 bg-orange-100';
    return 'text-red-700 bg-red-100';
  };

  const calculateGrade = () => {
    let totalWeightedPoints = 0;
    let totalWeight = 0;
    const breakdown: { category: string; percentage: number; weighted: number }[] = [];
    const missingCategories: string[] = [];

    categories.forEach(cat => {
      const weight = parseFloat(cat.weight);
      const earned = parseFloat(cat.earnedPoints);
      const total = parseFloat(cat.totalPoints);

      if (isNaN(weight) || weight < 0) return;

      if (!isNaN(earned) && !isNaN(total) && total > 0) {
        const percentage = (earned / total) * 100;
        const weightedContribution = (percentage * weight) / 100;
        totalWeightedPoints += weightedContribution;
        totalWeight += weight;

        breakdown.push({
          category: cat.name || 'Unnamed',
          percentage: percentage,
          weighted: weightedContribution,
        });
      } else if (cat.name && weight > 0) {
        missingCategories.push(cat.name);
      }
    });

    if (breakdown.length === 0) {
      alert('Please enter at least one complete category with earned points, total points, and weight.');
      return;
    }

    const weightedGrade = totalWeight > 0 ? totalWeightedPoints : 0;
    const currentGrade = totalWeight > 0 ? (totalWeightedPoints / totalWeight) * 100 : 0;
    const letterGrade = getLetterGrade(weightedGrade);

    setCalculationResult({
      currentGrade,
      weightedGrade,
      letterGrade,
      breakdown,
      totalWeightUsed: totalWeight,
      missingCategories,
    });

    setRequiredGrade(null);
  };

  const calculateRequiredGrade = () => {
    const desired = parseFloat(desiredGrade);
    const finalWeight = parseFloat(finalExamWeight);

    if (isNaN(desired) || isNaN(finalWeight) || finalWeight <= 0 || finalWeight > 100) {
      alert('Please enter valid desired grade and final exam weight (0-100).');
      return;
    }

    let currentWeightedPoints = 0;
    let currentWeight = 0;

    categories.forEach(cat => {
      const weight = parseFloat(cat.weight);
      const earned = parseFloat(cat.earnedPoints);
      const total = parseFloat(cat.totalPoints);

      if (!isNaN(weight) && !isNaN(earned) && !isNaN(total) && total > 0) {
        const percentage = (earned / total) * 100;
        const weightedContribution = (percentage * weight) / 100;
        currentWeightedPoints += weightedContribution;
        currentWeight += weight;
      }
    });

    const remainingWeight = 100 - currentWeight;

    if (finalWeight > remainingWeight) {
      alert(`Final exam weight (${finalWeight}%) exceeds remaining weight (${remainingWeight}%). Please adjust your category weights.`);
      return;
    }

    // Formula: desired = (currentWeightedPoints + (neededPercentage * finalWeight / 100))
    // Solving for neededPercentage:
    // neededPercentage = (desired - currentWeightedPoints) * 100 / finalWeight

    const neededPercentage = ((desired - currentWeightedPoints) * 100) / finalWeight;
    const possible = neededPercentage <= 100 && neededPercentage >= 0;
    const currentWithoutFinal = currentWeightedPoints;

    setRequiredGrade({
      neededPercentage,
      possible,
      currentWithoutFinal,
    });
  };

  const resetCalculator = () => {
    setCategories([
      { id: '1', name: 'Assignments', weight: '20', earnedPoints: '', totalPoints: '' },
      { id: '2', name: 'Quizzes', weight: '20', earnedPoints: '', totalPoints: '' },
      { id: '3', name: 'Tests', weight: '40', earnedPoints: '', totalPoints: '' },
      { id: '4', name: 'Final Exam', weight: '20', earnedPoints: '', totalPoints: '' },
    ]);
    setCalculationResult(null);
    setDesiredGrade('');
    setFinalExamWeight('');
    setRequiredGrade(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm py-3 px-6 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-indigo-600 hover:text-indigo-800 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/calculators" className="text-indigo-600 hover:text-indigo-800">
              Calculators
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Grade Calculator</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mr-4">
              <Calculator className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Grade Calculator</h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Calculate your current course grade, final grade, and find out what score you need on your final exam to achieve your desired grade. Supports weighted categories for accurate grade calculation.
          </p>
        </div>
      </section>

      {/* Main Calculator */}
      <main className="container mx-auto max-w-6xl px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Calculator Input Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-3 text-indigo-600" />
                  Enter Your Grades
                </h2>
                <Button
                  onClick={resetCalculator}
                  variant="outline"
                  className="text-sm"
                >
                  Reset All
                </Button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Header Row */}
                <div className="grid grid-cols-12 gap-2 text-sm font-semibold text-gray-600 mb-2">
                  <div className="col-span-3">Category Name</div>
                  <div className="col-span-2">Weight (%)</div>
                  <div className="col-span-3">Earned Points</div>
                  <div className="col-span-3">Total Points</div>
                  <div className="col-span-1"></div>
                </div>

                {/* Category Rows */}
                {categories.map((cat, index) => (
                  <div key={cat.id} className="grid grid-cols-12 gap-2 items-center bg-gray-50 p-3 rounded-lg">
                    <div className="col-span-3">
                      <Input
                        type="text"
                        value={cat.name}
                        onChange={(e) => updateCategory(cat.id, 'name', e.target.value)}
                        placeholder="e.g., Homework"
                        className="w-full"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        value={cat.weight}
                        onChange={(e) => updateCategory(cat.id, 'weight', e.target.value)}
                        placeholder="20"
                        min="0"
                        max="100"
                        step="0.1"
                        className="w-full"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        type="number"
                        value={cat.earnedPoints}
                        onChange={(e) => updateCategory(cat.id, 'earnedPoints', e.target.value)}
                        placeholder="85"
                        min="0"
                        step="0.01"
                        className="w-full"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        type="number"
                        value={cat.totalPoints}
                        onChange={(e) => updateCategory(cat.id, 'totalPoints', e.target.value)}
                        placeholder="100"
                        min="0"
                        step="0.01"
                        className="w-full"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <Button
                        onClick={() => removeCategory(cat.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        disabled={categories.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mb-6">
                <Button
                  onClick={addCategory}
                  variant="outline"
                  className="flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
                <Button
                  onClick={calculateGrade}
                  className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate Grade
                </Button>
              </div>

              {/* Total Weight Indicator */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Total Weight:</span>
                  <span className={`text-lg font-bold ${
                    categories.reduce((sum, cat) => sum + (parseFloat(cat.weight) || 0), 0) === 100
                      ? 'text-green-600'
                      : 'text-orange-600'
                  }`}>
                    {categories.reduce((sum, cat) => sum + (parseFloat(cat.weight) || 0), 0).toFixed(1)}%
                  </span>
                </div>
                {categories.reduce((sum, cat) => sum + (parseFloat(cat.weight) || 0), 0) !== 100 && (
                  <p className="text-xs text-orange-600 mt-2">
                    <Info className="w-3 h-3 inline mr-1" />
                    Tip: Weights should total 100% for accurate calculation
                  </p>
                )}
              </div>
            </div>

            {/* "What Grade Do I Need?" Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mt-8">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
                <Target className="w-6 h-6 mr-3 text-purple-600" />
                What Grade Do I Need?
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Final Grade (%)
                  </label>
                  <Input
                    type="number"
                    value={desiredGrade}
                    onChange={(e) => setDesiredGrade(e.target.value)}
                    placeholder="e.g., 90"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Final Exam Weight (%)
                  </label>
                  <Input
                    type="number"
                    value={finalExamWeight}
                    onChange={(e) => setFinalExamWeight(e.target.value)}
                    placeholder="e.g., 20"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full"
                  />
                </div>

                <Button
                  onClick={calculateRequiredGrade}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Calculate Required Grade
                </Button>
              </div>

              {/* Required Grade Result */}
              {requiredGrade && (
                <div className={`mt-6 p-6 rounded-xl border-2 ${
                  requiredGrade.possible
                    ? 'bg-green-50 border-green-300'
                    : 'bg-red-50 border-red-300'
                }`}>
                  <div className="flex items-center mb-4">
                    {requiredGrade.possible ? (
                      <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-red-600 mr-2" />
                    )}
                    <h3 className="text-lg font-bold text-gray-800">
                      {requiredGrade.possible ? 'Goal Achievable!' : 'Goal Not Achievable'}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Current Grade (without final):</span>
                      <span className="text-lg font-bold text-gray-800">
                        {requiredGrade.currentWithoutFinal.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Desired Final Grade:</span>
                      <span className="text-lg font-bold text-gray-800">{desiredGrade}%</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-3">
                      <span className="text-sm font-medium text-gray-700">Grade Needed on Final Exam:</span>
                      <span className={`text-2xl font-bold ${
                        requiredGrade.possible ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {requiredGrade.neededPercentage.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {!requiredGrade.possible && (
                    <p className="text-sm text-red-700 mt-4">
                      {requiredGrade.neededPercentage > 100
                        ? `You would need ${requiredGrade.neededPercentage.toFixed(2)}% on the final exam, which exceeds the maximum possible score of 100%.`
                        : `The required grade is below 0%, which means your desired grade is already exceeded.`
                      }
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3 text-indigo-600" />
                Your Grade
              </h2>

              {calculationResult ? (
                <div className="space-y-6">
                  {/* Letter Grade Display */}
                  <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                    <p className="text-sm text-gray-600 mb-2">Current Grade</p>
                    <div className={`text-6xl font-bold mb-2 px-6 py-3 rounded-lg inline-block ${getGradeColor(calculationResult.letterGrade)}`}>
                      {calculationResult.letterGrade}
                    </div>
                    <p className="text-3xl font-bold text-gray-800 mt-3">
                      {calculationResult.weightedGrade.toFixed(2)}%
                    </p>
                  </div>

                  {/* Grade Breakdown */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
                      Category Breakdown
                    </h3>
                    <div className="space-y-3">
                      {calculationResult.breakdown.map((item, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">{item.category}</span>
                            <span className="text-sm font-bold text-indigo-600">
                              {item.percentage.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>Weighted Contribution:</span>
                            <span className="font-semibold">{item.weighted.toFixed(2)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Weight Summary */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Total Weight Used:</span>
                      <span className="text-lg font-bold text-blue-600">
                        {calculationResult.totalWeightUsed.toFixed(1)}%
                      </span>
                    </div>
                    {calculationResult.totalWeightUsed < 100 && (
                      <p className="text-xs text-blue-700">
                        <Info className="w-3 h-3 inline mr-1" />
                        {(100 - calculationResult.totalWeightUsed).toFixed(1)}% of weight not yet graded
                      </p>
                    )}
                  </div>

                  {/* Missing Categories Alert */}
                  {calculationResult.missingCategories.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm font-medium text-yellow-800 mb-2">
                        <AlertCircle className="w-4 h-4 inline mr-1" />
                        Incomplete Categories:
                      </p>
                      <ul className="text-xs text-yellow-700 list-disc list-inside">
                        {calculationResult.missingCategories.map((cat, idx) => (
                          <li key={idx}>{cat}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Enter your grades and click &quot;Calculate Grade&quot; to see your results
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Formula Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <BookOpen className="w-6 h-6 mr-3 text-indigo-600" />
            Grade Calculation Formula
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Weighted Grade Formula</h3>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                <div className="flex items-center justify-center flex-wrap gap-2 text-lg">
                  <span className="font-semibold text-gray-800">Final Grade =</span>
                  <div className="inline-flex flex-col items-center mx-2">
                    <span className="border-b-2 border-gray-800 pb-1 px-3 text-center">
                      (Category1% × Weight1) + (Category2% × Weight2) + ...
                    </span>
                    <span className="mt-1">100</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Each category percentage is multiplied by its weight, then summed and divided by 100
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Category Percentage Formula</h3>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <div className="flex items-center justify-center flex-wrap gap-2 text-lg">
                  <span className="font-semibold text-gray-800">Category % =</span>
                  <div className="inline-flex flex-col items-center mx-2">
                    <span className="border-b-2 border-gray-800 pb-1 px-3">
                      Points Earned
                    </span>
                    <span className="mt-1">Total Possible Points</span>
                  </div>
                  <span className="font-semibold text-gray-800">× 100</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Required Final Exam Grade Formula</h3>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                <div className="flex items-center justify-center flex-wrap gap-2 text-lg">
                  <span className="font-semibold text-gray-800">Grade Needed =</span>
                  <div className="inline-flex flex-col items-center mx-2">
                    <span className="border-b-2 border-gray-800 pb-1 px-3 text-center">
                      (Desired Grade - Current Weighted Grade)
                    </span>
                    <span className="mt-1">Final Exam Weight ÷ 100</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  This calculates what percentage you need on the final exam to achieve your desired grade
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Content Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <FileText className="w-7 h-7 mr-3 text-indigo-600" />
            Complete Guide to Grade Calculation
          </h2>

          {/* What is a Grade Calculator */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is a Grade Calculator?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              A <strong>grade calculator</strong> is an essential academic tool that helps students calculate their current course grade, predict their final grade, and determine what scores they need on upcoming assignments or exams to achieve their desired grade. Unlike simple average calculators, a weighted grade calculator accounts for the different importance (weight) of various assignment categories such as homework, quizzes, tests, projects, and final exams.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This calculator is particularly valuable for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Students:</strong> Track academic progress, set realistic goals, and plan study strategies</li>
              <li><strong>Parents:</strong> Monitor their children&apos;s academic performance and identify areas needing improvement</li>
              <li><strong>Teachers:</strong> Demonstrate grading systems and help students understand grade calculations</li>
              <li><strong>College Applicants:</strong> Calculate GPAs and understand how grades impact academic standing</li>
            </ul>
          </section>

          {/* How to Use */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">How to Use the Grade Calculator</h3>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 mb-4">
              <h4 className="font-semibold text-gray-800 mb-3">Step-by-Step Instructions:</h4>
              <ol className="list-decimal list-inside text-gray-700 space-y-3 ml-2">
                <li>
                  <strong>Enter Category Names:</strong> Input the names of your grade categories (e.g., Homework, Quizzes, Tests, Final Exam)
                </li>
                <li>
                  <strong>Set Category Weights:</strong> Enter the percentage weight for each category. These should total 100% (e.g., Homework 20%, Quizzes 20%, Tests 40%, Final 20%)
                </li>
                <li>
                  <strong>Input Earned Points:</strong> Enter the points you&apos;ve earned in each category so far
                </li>
                <li>
                  <strong>Input Total Points:</strong> Enter the maximum possible points for each category
                </li>
                <li>
                  <strong>Calculate Grade:</strong> Click &quot;Calculate Grade&quot; to see your current weighted grade and letter grade
                </li>
                <li>
                  <strong>Calculate Required Grade (Optional):</strong> Enter your desired final grade and final exam weight to see what score you need on the final exam
                </li>
              </ol>
            </div>
          </section>

          {/* Detailed Examples */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Detailed Calculation Examples</h3>

            {/* Example 1 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-green-600 text-white w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">1</span>
                Basic Weighted Grade Calculation
              </h4>
              <p className="text-gray-700 mb-4">
                <strong>Scenario:</strong> Sarah is taking a Biology class with the following grading structure:
              </p>
              <div className="bg-white p-4 rounded-lg mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-2 border">Category</th>
                      <th className="text-left p-2 border">Weight</th>
                      <th className="text-left p-2 border">Earned</th>
                      <th className="text-left p-2 border">Total</th>
                      <th className="text-left p-2 border">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border">Homework</td>
                      <td className="p-2 border">15%</td>
                      <td className="p-2 border">285</td>
                      <td className="p-2 border">300</td>
                      <td className="p-2 border font-semibold">95%</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">Quizzes</td>
                      <td className="p-2 border">25%</td>
                      <td className="p-2 border">200</td>
                      <td className="p-2 border">250</td>
                      <td className="p-2 border font-semibold">80%</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">Tests</td>
                      <td className="p-2 border">40%</td>
                      <td className="p-2 border">340</td>
                      <td className="p-2 border">400</td>
                      <td className="p-2 border font-semibold">85%</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">Final Exam</td>
                      <td className="p-2 border">20%</td>
                      <td className="p-2 border">88</td>
                      <td className="p-2 border">100</td>
                      <td className="p-2 border font-semibold">88%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-800 mb-2">Calculation Steps:</p>
                <div className="space-y-2 text-gray-700 text-sm">
                  <p>• Homework contribution: 95% × 0.15 = 14.25%</p>
                  <p>• Quizzes contribution: 80% × 0.25 = 20.00%</p>
                  <p>• Tests contribution: 85% × 0.40 = 34.00%</p>
                  <p>• Final Exam contribution: 88% × 0.20 = 17.60%</p>
                  <p className="border-t pt-2 font-bold text-green-700">
                    Final Grade = 14.25 + 20.00 + 34.00 + 17.60 = 85.85% (B)
                  </p>
                </div>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">2</span>
                Calculating Required Final Exam Grade
              </h4>
              <p className="text-gray-700 mb-4">
                <strong>Scenario:</strong> Marcus wants to get an A (90%) in his Math class. The final exam is worth 25% of his grade. His current grades are:
              </p>
              <div className="bg-white p-4 rounded-lg mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-2 border">Category</th>
                      <th className="text-left p-2 border">Weight</th>
                      <th className="text-left p-2 border">Grade</th>
                      <th className="text-left p-2 border">Contribution</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border">Homework</td>
                      <td className="p-2 border">20%</td>
                      <td className="p-2 border">92%</td>
                      <td className="p-2 border">18.4%</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">Quizzes</td>
                      <td className="p-2 border">25%</td>
                      <td className="p-2 border">88%</td>
                      <td className="p-2 border">22.0%</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">Tests</td>
                      <td className="p-2 border">30%</td>
                      <td className="p-2 border">85%</td>
                      <td className="p-2 border">25.5%</td>
                    </tr>
                    <tr>
                      <td className="p-2 border font-semibold">Current Total</td>
                      <td className="p-2 border font-semibold">75%</td>
                      <td className="p-2 border font-semibold">-</td>
                      <td className="p-2 border font-semibold">65.9%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-800 mb-2">Calculation:</p>
                <div className="space-y-2 text-gray-700 text-sm">
                  <p>• Current weighted grade (without final): 65.9%</p>
                  <p>• Desired final grade: 90%</p>
                  <p>• Final exam weight: 25%</p>
                  <p className="mt-3">Using the formula:</p>
                  <div className="bg-gray-50 p-3 rounded my-2 font-mono text-xs">
                    Grade Needed = (90 - 65.9) ÷ (25 ÷ 100) = 24.1 ÷ 0.25 = 96.4%
                  </div>
                  <p className="border-t pt-2 font-bold text-blue-700">
                    Marcus needs to score 96.4% on the final exam to achieve a 90% final grade.
                  </p>
                </div>
              </div>
            </div>

            {/* Example 3 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">3</span>
                Partial Grade Calculation (Mid-Semester)
              </h4>
              <p className="text-gray-700 mb-4">
                <strong>Scenario:</strong> Emma wants to check her current standing in English class mid-semester. Not all categories have been graded yet:
              </p>
              <div className="bg-white p-4 rounded-lg mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-2 border">Category</th>
                      <th className="text-left p-2 border">Weight</th>
                      <th className="text-left p-2 border">Current Grade</th>
                      <th className="text-left p-2 border">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border">Participation</td>
                      <td className="p-2 border">10%</td>
                      <td className="p-2 border">100%</td>
                      <td className="p-2 border text-green-600">Graded</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">Essays</td>
                      <td className="p-2 border">30%</td>
                      <td className="p-2 border">87%</td>
                      <td className="p-2 border text-green-600">Graded</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">Midterm</td>
                      <td className="p-2 border">25%</td>
                      <td className="p-2 border">-</td>
                      <td className="p-2 border text-orange-600">Not yet graded</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">Final Project</td>
                      <td className="p-2 border">35%</td>
                      <td className="p-2 border">-</td>
                      <td className="p-2 border text-orange-600">Not yet graded</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-800 mb-2">Current Grade Calculation:</p>
                <div className="space-y-2 text-gray-700 text-sm">
                  <p>• Participation: 100% × 0.10 = 10.0%</p>
                  <p>• Essays: 87% × 0.30 = 26.1%</p>
                  <p className="border-t pt-2">
                    • Current weighted grade: 36.1% (out of 40% graded so far)
                  </p>
                  <p className="font-bold text-purple-700">
                    Emma&apos;s current performance is 90.25% (36.1 ÷ 40 × 100)
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    Note: 60% of the course weight is still ungraded. Final grade depends on performance in remaining categories.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Grading Scales Table */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Letter Grade Scales</h3>
            <p className="text-gray-700 mb-4">
              Different institutions use different grading scales. Here are the most common systems:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Standard Scale */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3">
                  <h4 className="font-semibold">Standard Scale (Most Common)</h4>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-2 border">Letter</th>
                      <th className="text-left p-2 border">Percentage</th>
                      <th className="text-left p-2 border">GPA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-50">
                      <td className="p-2 border font-semibold">A</td>
                      <td className="p-2 border">93-100%</td>
                      <td className="p-2 border">4.0</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="p-2 border font-semibold">A-</td>
                      <td className="p-2 border">90-92%</td>
                      <td className="p-2 border">3.7</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="p-2 border font-semibold">B+</td>
                      <td className="p-2 border">87-89%</td>
                      <td className="p-2 border">3.3</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="p-2 border font-semibold">B</td>
                      <td className="p-2 border">83-86%</td>
                      <td className="p-2 border">3.0</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="p-2 border font-semibold">B-</td>
                      <td className="p-2 border">80-82%</td>
                      <td className="p-2 border">2.7</td>
                    </tr>
                    <tr className="bg-yellow-50">
                      <td className="p-2 border font-semibold">C+</td>
                      <td className="p-2 border">77-79%</td>
                      <td className="p-2 border">2.3</td>
                    </tr>
                    <tr className="bg-yellow-50">
                      <td className="p-2 border font-semibold">C</td>
                      <td className="p-2 border">73-76%</td>
                      <td className="p-2 border">2.0</td>
                    </tr>
                    <tr className="bg-yellow-50">
                      <td className="p-2 border font-semibold">C-</td>
                      <td className="p-2 border">70-72%</td>
                      <td className="p-2 border">1.7</td>
                    </tr>
                    <tr className="bg-orange-50">
                      <td className="p-2 border font-semibold">D+</td>
                      <td className="p-2 border">67-69%</td>
                      <td className="p-2 border">1.3</td>
                    </tr>
                    <tr className="bg-orange-50">
                      <td className="p-2 border font-semibold">D</td>
                      <td className="p-2 border">63-66%</td>
                      <td className="p-2 border">1.0</td>
                    </tr>
                    <tr className="bg-orange-50">
                      <td className="p-2 border font-semibold">D-</td>
                      <td className="p-2 border">60-62%</td>
                      <td className="p-2 border">0.7</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="p-2 border font-semibold">F</td>
                      <td className="p-2 border">0-59%</td>
                      <td className="p-2 border">0.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Alternative Scale */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-3">
                  <h4 className="font-semibold">Alternative Scale (Some Schools)</h4>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-2 border">Letter</th>
                      <th className="text-left p-2 border">Percentage</th>
                      <th className="text-left p-2 border">GPA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-50">
                      <td className="p-2 border font-semibold">A</td>
                      <td className="p-2 border">90-100%</td>
                      <td className="p-2 border">4.0</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="p-2 border font-semibold">B</td>
                      <td className="p-2 border">80-89%</td>
                      <td className="p-2 border">3.0</td>
                    </tr>
                    <tr className="bg-yellow-50">
                      <td className="p-2 border font-semibold">C</td>
                      <td className="p-2 border">70-79%</td>
                      <td className="p-2 border">2.0</td>
                    </tr>
                    <tr className="bg-orange-50">
                      <td className="p-2 border font-semibold">D</td>
                      <td className="p-2 border">60-69%</td>
                      <td className="p-2 border">1.0</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="p-2 border font-semibold">F</td>
                      <td className="p-2 border">0-59%</td>
                      <td className="p-2 border">0.0</td>
                    </tr>
                  </tbody>
                </table>
                <div className="p-3 bg-gray-50 text-xs text-gray-600">
                  <p><strong>Note:</strong> This simpler scale is often used in elementary and some high schools. Always check your institution&apos;s specific grading policy.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Common Category Weights */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Typical Course Category Weights</h3>
            <p className="text-gray-700 mb-4">
              While every course is different, here are common weight distributions for various types of classes:
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Standard Course */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-800 mb-3">Standard Course</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Homework:</span>
                    <span className="font-semibold">15-20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quizzes:</span>
                    <span className="font-semibold">20-25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tests:</span>
                    <span className="font-semibold">35-40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Final Exam:</span>
                    <span className="font-semibold">20-25%</span>
                  </div>
                </div>
              </div>

              {/* Lab Science */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-gray-800 mb-3">Lab Science Course</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Lab Work:</span>
                    <span className="font-semibold">25-30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Homework:</span>
                    <span className="font-semibold">10-15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tests:</span>
                    <span className="font-semibold">35-40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Final Exam:</span>
                    <span className="font-semibold">20-25%</span>
                  </div>
                </div>
              </div>

              {/* Writing Course */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-gray-800 mb-3">Writing/Humanities</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Participation:</span>
                    <span className="font-semibold">10-15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Essays:</span>
                    <span className="font-semibold">40-50%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Midterm:</span>
                    <span className="font-semibold">15-20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Final Project:</span>
                    <span className="font-semibold">25-30%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tips for Managing Your Grades</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200">
                <div className="flex items-start">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Track Regularly</h4>
                    <p className="text-sm text-gray-700">
                      Update your grade calculator after each assignment is returned. This helps you catch problems early and adjust your study strategy before it&apos;s too late.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-200">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Set Realistic Goals</h4>
                    <p className="text-sm text-gray-700">
                      Use the &quot;What Grade Do I Need?&quot; feature to set achievable targets. If you need 98% on the final to pass, you may need to reconsider your study approach or seek extra help.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-200">
                <div className="flex items-start">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Focus on High-Weight Categories</h4>
                    <p className="text-sm text-gray-700">
                      Prioritize studying for categories with higher weights. A 5% improvement on a 40% weighted test has more impact than a 10% improvement on a 10% weighted homework assignment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-5 rounded-xl border border-yellow-200">
                <div className="flex items-start">
                  <div className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Verify Syllabus Weights</h4>
                    <p className="text-sm text-gray-700">
                      Always double-check your course syllabus for the exact category weights. Some instructors may adjust weights during the semester, so stay informed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-200">
                <div className="flex items-start">
                  <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Plan Ahead</h4>
                    <p className="text-sm text-gray-700">
                      Use grade calculations to plan your semester strategy. Know which assignments you can afford to score lower on and which ones require maximum effort.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-pink-50 p-5 rounded-xl border border-red-200">
                <div className="flex items-start">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Don&apos;t Neglect &quot;Easy&quot; Points</h4>
                    <p className="text-sm text-gray-700">
                      Even low-weight categories matter. Consistently good performance on homework and participation can provide a cushion for more challenging tests and exams.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {/* FAQ 1 */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-indigo-600 mr-2">Q:</span>
                  How accurate is this grade calculator?
                </h4>
                <p className="text-gray-700 text-sm ml-6">
                  <span className="text-indigo-600 font-semibold">A:</span> This calculator is 100% accurate when you input the correct information. It uses standard weighted average formulas that are universally accepted in education. However, your actual grade depends on your instructor entering the same data correctly into their gradebook. Always verify with your official course grade.
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-indigo-600 mr-2">Q:</span>
                  What if my category weights don&apos;t add up to 100%?
                </h4>
                <p className="text-gray-700 text-sm ml-6">
                  <span className="text-indigo-600 font-semibold">A:</span> The calculator will still work, but for the most accurate results, weights should total 100%. If you&apos;re mid-semester and haven&apos;t completed all categories, only enter weights for graded categories. The calculator shows what percentage of the total grade has been calculated.
                </p>
              </div>

              {/* FAQ 3 */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-indigo-600 mr-2">Q:</span>
                  Can I use this calculator for college and high school?
                </h4>
                <p className="text-gray-700 text-sm ml-6">
                  <span className="text-indigo-600 font-semibold">A:</span> Yes! This grade calculator works for any educational level - elementary school, middle school, high school, college, university, or graduate programs. The weighted average calculation method is the same across all education levels.
                </p>
              </div>

              {/* FAQ 4 */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-indigo-600 mr-2">Q:</span>
                  What&apos;s the difference between weighted and unweighted grades?
                </h4>
                <p className="text-gray-700 text-sm ml-6">
                  <span className="text-indigo-600 font-semibold">A:</span> An <strong>unweighted grade</strong> treats all assignments equally (simple average). A <strong>weighted grade</strong> gives different importance to different categories - for example, tests might count for 40% while homework counts for 20%. Most courses use weighted grades because not all assignments should have equal impact.
                </p>
              </div>

              {/* FAQ 5 */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-indigo-600 mr-2">Q:</span>
                  How do I find my course category weights?
                </h4>
                <p className="text-gray-700 text-sm ml-6">
                  <span className="text-indigo-600 font-semibold">A:</span> Check your course syllabus - it should list the grading breakdown. You can also find this information in your school&apos;s online portal, ask your instructor directly, or check any grading policy documents provided at the start of the course.
                </p>
              </div>

              {/* FAQ 6 */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-indigo-600 mr-2">Q:</span>
                  Can I calculate multiple courses at once?
                </h4>
                <p className="text-gray-700 text-sm ml-6">
                  <span className="text-indigo-600 font-semibold">A:</span> This calculator focuses on one course at a time for detailed accuracy. For GPA calculations across multiple courses, use our <Link href="/calculators/college-gpa-calculator" className="text-indigo-600 hover:underline">College GPA Calculator</Link> or <Link href="/calculators/high-school-gpa-calculator" className="text-indigo-600 hover:underline">High School GPA Calculator</Link>.
                </p>
              </div>

              {/* FAQ 7 */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-indigo-600 mr-2">Q:</span>
                  What if I get a negative result for &quot;What Grade Do I Need?&quot;
                </h4>
                <p className="text-gray-700 text-sm ml-6">
                  <span className="text-indigo-600 font-semibold">A:</span> A negative result means you&apos;ve already exceeded your desired grade! You could theoretically score 0% on the final exam and still achieve your target. However, it&apos;s still wise to study and perform well to maintain your strong grade.
                </p>
              </div>

              {/* FAQ 8 */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-indigo-600 mr-2">Q:</span>
                  Does this calculator account for extra credit?
                </h4>
                <p className="text-gray-700 text-sm ml-6">
                  <span className="text-indigo-600 font-semibold">A:</span> Yes! If you&apos;ve earned extra credit, add those points to your &quot;Earned Points&quot; for the relevant category. For example, if you earned 105 out of 100 possible homework points (including extra credit), enter 105 in the earned points field.
                </p>
              </div>

              {/* FAQ 9 */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-indigo-600 mr-2">Q:</span>
                  Why is my calculated grade different from what my teacher shows?
                </h4>
                <p className="text-gray-700 text-sm ml-6">
                  <span className="text-indigo-600 font-semibold">A:</span> Differences can occur due to: (1) Dropped lowest scores that you haven&apos;t accounted for, (2) Rounding differences in how grades are calculated, (3) Extra credit or bonus points, (4) Curve adjustments, or (5) Data entry errors on either end. Always verify your numbers match what&apos;s in the official gradebook.
                </p>
              </div>

              {/* FAQ 10 */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-indigo-600 mr-2">Q:</span>
                  Is my grade information saved or shared?
                </h4>
                <p className="text-gray-700 text-sm ml-6">
                  <span className="text-indigo-600 font-semibold">A:</span> No. This calculator runs entirely in your browser and does not save, store, or transmit your grade information anywhere. Your data is completely private and disappears when you close or refresh the page.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Conclusion</h3>
            <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-6 rounded-xl border border-indigo-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                The <strong>Grade Calculator</strong> is an essential tool for academic success. Whether you&apos;re a student tracking your progress, planning your study strategy, or calculating what you need on a final exam, this calculator provides accurate, instant results. Understanding how weighted grades work empowers you to make informed decisions about where to focus your academic efforts.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Remember that while grades are important, they&apos;re just one measure of learning. Use this calculator as a planning tool to reduce stress and maintain awareness of your academic standing, but don&apos;t let grade anxiety overshadow the joy of learning and intellectual growth.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Pro Tip:</strong> Bookmark this page and use it throughout the semester. Regular grade tracking helps you stay on top of your coursework, identify areas needing improvement, and avoid unpleasant surprises at semester&apos;s end. Academic success is about consistent effort and strategic planning - this calculator helps with both!
              </p>
            </div>
          </section>

          {/* Related Calculators */}
          <section>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Related Calculators</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/calculators/college-gpa-calculator" className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                  College GPA Calculator
                </h4>
                <p className="text-sm text-gray-700">
                  Calculate your cumulative GPA across multiple courses with credit weighting on a 4.0 scale.
                </p>
              </Link>

              <Link href="/calculators/high-school-gpa-calculator" className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-purple-600" />
                  High School GPA Calculator
                </h4>
                <p className="text-sm text-gray-700">
                  Calculate weighted and unweighted high school GPA with AP, IB, and Honors class bonuses.
                </p>
              </Link>

              <Link href="/calculators/ez-grader" className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200 hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  EZ Grader
                </h4>
                <p className="text-sm text-gray-700">
                  Quick grading tool for teachers to convert test scores to letter grades with printable charts.
                </p>
              </Link>

              <Link href="/calculators/percentage-calculator" className="bg-gradient-to-br from-yellow-50 to-orange-50 p-5 rounded-xl border border-yellow-200 hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-yellow-600" />
                  Percentage Calculator
                </h4>
                <p className="text-sm text-gray-700">
                  Calculate percentages, percentage changes, and percentage differences for any values.
                </p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
