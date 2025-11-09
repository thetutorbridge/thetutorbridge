'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Home, BookOpen, ArrowRight, GraduationCap, Award, TrendingUp, Plus, X, BookMarked, Star } from 'lucide-react';
import Link from 'next/link';

interface Course {
  name: string;
  grade: string;
  courseType: 'regular' | 'honors' | 'ap';
  credits: string;
}

const regularGradePoints: { [key: string]: number } = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'D-': 0.7,
  'F': 0.0,
};

const getWeightedGradePoints = (grade: string, courseType: 'regular' | 'honors' | 'ap'): number => {
  const basePoints = regularGradePoints[grade];

  if (courseType === 'ap') {
    // AP/IB classes get +1.0 bonus
    return Math.min(basePoints + 1.0, 5.0);
  } else if (courseType === 'honors') {
    // Honors classes get +0.5 bonus
    return Math.min(basePoints + 0.5, 4.5);
  }

  return basePoints;
};

export default function HighSchoolGPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { name: 'AP Calculus AB', grade: 'A', courseType: 'ap', credits: '1' },
    { name: 'Honors English', grade: 'B+', courseType: 'honors', credits: '1' },
    { name: 'Chemistry', grade: 'A-', courseType: 'regular', credits: '1' },
    { name: 'World History', grade: 'B', courseType: 'regular', credits: '1' },
  ]);

  const [calculationType, setCalculationType] = useState<'both' | 'weighted' | 'unweighted'>('both');

  const [result, setResult] = useState<{
    unweightedGPA: number;
    weightedGPA: number;
    totalCredits: number;
    unweightedQualityPoints: number;
    weightedQualityPoints: number;
    letterGrade: string;
    classRankEstimate: string;
    collegeAdmissionsOutlook: string;
  } | null>(null);

  const addCourse = () => {
    setCourses([...courses, { name: '', grade: 'A', courseType: 'regular', credits: '1' }]);
  };

  const removeCourse = (index: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((_, i) => i !== index));
    }
  };

  const updateCourse = (index: number, field: keyof Course, value: string) => {
    const newCourses = [...courses];
    newCourses[index][field] = value as any;
    setCourses(newCourses);
  };

  const getLetterGrade = (gpa: number): string => {
    if (gpa >= 4.0) return 'A';
    if (gpa >= 3.7) return 'A-';
    if (gpa >= 3.3) return 'B+';
    if (gpa >= 3.0) return 'B';
    if (gpa >= 2.7) return 'B-';
    if (gpa >= 2.3) return 'C+';
    if (gpa >= 2.0) return 'C';
    if (gpa >= 1.7) return 'C-';
    if (gpa >= 1.3) return 'D+';
    if (gpa >= 1.0) return 'D';
    return 'F';
  };

  const getClassRankEstimate = (weightedGPA: number): string => {
    if (weightedGPA >= 4.5) return 'Top 1-5% (Valedictorian/Salutatorian Range)';
    if (weightedGPA >= 4.0) return 'Top 5-10% (Excellent Standing)';
    if (weightedGPA >= 3.5) return 'Top 10-25% (High Honor Roll)';
    if (weightedGPA >= 3.0) return 'Top 25-50% (Honor Roll)';
    if (weightedGPA >= 2.5) return 'Top 50-75% (Good Standing)';
    return 'Bottom 25-50% (Needs Improvement)';
  };

  const getCollegeAdmissionsOutlook = (unweightedGPA: number): string => {
    if (unweightedGPA >= 3.8) return 'Highly Competitive (Ivy League, Top 20)';
    if (unweightedGPA >= 3.5) return 'Competitive (Top 50 Universities)';
    if (unweightedGPA >= 3.0) return 'Good (Most State Universities)';
    if (unweightedGPA >= 2.5) return 'Fair (Community Colleges, Some 4-Year)';
    if (unweightedGPA >= 2.0) return 'Limited (Community Colleges)';
    return 'Very Limited Options';
  };

  const handleCalculate = () => {
    // Validate all courses
    for (let i = 0; i < courses.length; i++) {
      const credits = parseFloat(courses[i].credits);
      if (isNaN(credits) || credits <= 0) {
        alert(`Please enter valid credits for ${courses[i].name || `Course ${i + 1}`}`);
        return;
      }
    }

    // Calculate unweighted GPA
    let unweightedQualityPoints = 0;
    let weightedQualityPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const credits = parseFloat(course.credits);
      const unweightedPoints = regularGradePoints[course.grade];
      const weightedPoints = getWeightedGradePoints(course.grade, course.courseType);

      unweightedQualityPoints += unweightedPoints * credits;
      weightedQualityPoints += weightedPoints * credits;
      totalCredits += credits;
    });

    const unweightedGPA = unweightedQualityPoints / totalCredits;
    const weightedGPA = weightedQualityPoints / totalCredits;

    setResult({
      unweightedGPA: parseFloat(unweightedGPA.toFixed(3)),
      weightedGPA: parseFloat(weightedGPA.toFixed(3)),
      totalCredits,
      unweightedQualityPoints: parseFloat(unweightedQualityPoints.toFixed(2)),
      weightedQualityPoints: parseFloat(weightedQualityPoints.toFixed(2)),
      letterGrade: getLetterGrade(unweightedGPA),
      classRankEstimate: getClassRankEstimate(weightedGPA),
      collegeAdmissionsOutlook: getCollegeAdmissionsOutlook(unweightedGPA),
    });
  };

  const handleReset = () => {
    setCourses([
      { name: 'AP Calculus AB', grade: 'A', courseType: 'ap', credits: '1' },
      { name: 'Honors English', grade: 'B+', courseType: 'honors', credits: '1' },
      { name: 'Chemistry', grade: 'A-', courseType: 'regular', credits: '1' },
      { name: 'World History', grade: 'B', courseType: 'regular', credits: '1' },
    ]);
    setCalculationType('both');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-purple-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-purple-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">High School GPA Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <GraduationCap className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              High School GPA Calculator
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
              Calculate your weighted and unweighted GPA with support for AP, IB, and honors classes. Track your academic progress and plan for college admissions with accurate GPA calculations on 4.0 and 5.0 scales.
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
                  <Calculator className="w-6 h-6 text-purple-600" />
                  Enter Your Classes
                </h2>

                {/* Calculation Type Selector */}
                <div className="mb-6 bg-purple-50 p-4 rounded-xl border-2 border-purple-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Calculation Type
                  </label>
                  <Select value={calculationType} onValueChange={(value: any) => setCalculationType(value)}>
                    <SelectTrigger className="font-medium">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="both">Both Weighted & Unweighted</SelectItem>
                      <SelectItem value="weighted">Weighted Only (AP/Honors bonus)</SelectItem>
                      <SelectItem value="unweighted">Unweighted Only (4.0 scale)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-600 mt-2">
                    Weighted GPA accounts for course difficulty (AP/IB/Honors)
                  </p>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto pr-2 mb-6">
                  {courses.map((course, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-gray-900">Class {index + 1}</h3>
                        {courses.length > 1 && (
                          <button
                            onClick={() => removeCourse(index)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            aria-label="Remove class"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Class Name (Optional)
                          </label>
                          <Input
                            type="text"
                            placeholder="e.g., AP Calculus"
                            value={course.name}
                            onChange={(e) => updateCourse(index, 'name', e.target.value)}
                            className="font-medium"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Grade
                            </label>
                            <Select
                              value={course.grade}
                              onValueChange={(value) => updateCourse(index, 'grade', value)}
                            >
                              <SelectTrigger className="font-medium">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="A+">A+ (4.0)</SelectItem>
                                <SelectItem value="A">A (4.0)</SelectItem>
                                <SelectItem value="A-">A- (3.7)</SelectItem>
                                <SelectItem value="B+">B+ (3.3)</SelectItem>
                                <SelectItem value="B">B (3.0)</SelectItem>
                                <SelectItem value="B-">B- (2.7)</SelectItem>
                                <SelectItem value="C+">C+ (2.3)</SelectItem>
                                <SelectItem value="C">C (2.0)</SelectItem>
                                <SelectItem value="C-">C- (1.7)</SelectItem>
                                <SelectItem value="D+">D+ (1.3)</SelectItem>
                                <SelectItem value="D">D (1.0)</SelectItem>
                                <SelectItem value="D-">D- (0.7)</SelectItem>
                                <SelectItem value="F">F (0.0)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Credits
                            </label>
                            <Input
                              type="number"
                              step="0.5"
                              min="0"
                              placeholder="1"
                              value={course.credits}
                              onChange={(e) => updateCourse(index, 'credits', e.target.value)}
                              className="text-center font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Class Type
                          </label>
                          <Select
                            value={course.courseType}
                            onValueChange={(value: any) => updateCourse(index, 'courseType', value)}
                          >
                            <SelectTrigger className="font-medium">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="regular">Regular</SelectItem>
                              <SelectItem value="honors">Honors (+0.5)</SelectItem>
                              <SelectItem value="ap">AP/IB (+1.0)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={addCourse}
                  variant="outline"
                  className="w-full mb-6 border-2 border-dashed border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Class
                </Button>

                <div className="flex gap-3">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate GPA
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
                  {/* GPA Result Card */}
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4">Your GPA Results</h3>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      {(calculationType === 'both' || calculationType === 'unweighted') && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                          <p className="text-sm text-purple-100 mb-2">Unweighted GPA</p>
                          <p className="text-4xl font-bold">{result.unweightedGPA}</p>
                          <p className="text-sm text-purple-100 mt-2">4.0 Scale (No Bonus)</p>
                        </div>
                      )}

                      {(calculationType === 'both' || calculationType === 'weighted') && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                          <p className="text-sm text-purple-100 mb-2 flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            Weighted GPA
                          </p>
                          <p className="text-4xl font-bold">{result.weightedGPA}</p>
                          <p className="text-sm text-purple-100 mt-2">5.0 Scale (AP/Honors Bonus)</p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-sm text-purple-100">Letter Grade</p>
                        <p className="text-2xl font-bold">{result.letterGrade}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-sm text-purple-100">Total Credits</p>
                        <p className="text-2xl font-bold">{result.totalCredits}</p>
                      </div>
                    </div>
                  </div>

                  {/* Class Rank Estimate */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-purple-600" />
                      Class Rank Estimate
                    </h3>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                      <p className="text-2xl font-bold text-purple-700">{result.classRankEstimate}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Based on weighted GPA of {result.weightedGPA}
                      </p>
                    </div>
                  </div>

                  {/* College Admissions Outlook */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-purple-600" />
                      College Admissions Outlook
                    </h3>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                      <p className="text-2xl font-bold text-blue-700">{result.collegeAdmissionsOutlook}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Based on unweighted GPA of {result.unweightedGPA}
                      </p>
                      <p className="text-xs text-gray-500 mt-3">
                        Note: College admissions consider many factors beyond GPA including test scores, extracurriculars, essays, and recommendations.
                      </p>
                    </div>
                  </div>

                  {/* Calculation Breakdown */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      Calculation Breakdown
                    </h3>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Class</th>
                            <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Type</th>
                            <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Grade</th>
                            <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Credits</th>
                            <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Unweighted</th>
                            <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Weighted</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courses.map((course, idx) => {
                            const credits = parseFloat(course.credits);
                            const unweightedPoints = regularGradePoints[course.grade];
                            const weightedPoints = getWeightedGradePoints(course.grade, course.courseType);
                            const unweightedQP = unweightedPoints * credits;
                            const weightedQP = weightedPoints * credits;

                            return (
                              <tr key={idx} className="border-b border-gray-100">
                                <td className="py-3 px-2 text-sm">{course.name || `Class ${idx + 1}`}</td>
                                <td className="py-3 px-2 text-sm text-center">
                                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    course.courseType === 'ap' ? 'bg-purple-100 text-purple-700' :
                                    course.courseType === 'honors' ? 'bg-blue-100 text-blue-700' :
                                    'bg-gray-100 text-gray-700'
                                  }`}>
                                    {course.courseType === 'ap' ? 'AP/IB' : course.courseType === 'honors' ? 'Honors' : 'Regular'}
                                  </span>
                                </td>
                                <td className="py-3 px-2 text-sm text-center font-semibold">{course.grade}</td>
                                <td className="py-3 px-2 text-sm text-center">{credits}</td>
                                <td className="py-3 px-2 text-sm text-center font-semibold text-blue-600">
                                  {unweightedQP.toFixed(2)}
                                </td>
                                <td className="py-3 px-2 text-sm text-center font-semibold text-purple-600">
                                  {weightedQP.toFixed(2)}
                                </td>
                              </tr>
                            );
                          })}
                          <tr className="bg-purple-50 font-bold">
                            <td className="py-3 px-2 text-sm" colSpan={3}>Total</td>
                            <td className="py-3 px-2 text-sm text-center">{result.totalCredits}</td>
                            <td className="py-3 px-2 text-sm text-center text-blue-600">{result.unweightedQualityPoints}</td>
                            <td className="py-3 px-2 text-sm text-center text-purple-600">{result.weightedQualityPoints}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                      <h4 className="font-bold text-gray-900 mb-4">GPA Formulas:</h4>

                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border border-purple-200">
                          <p className="font-semibold text-gray-800 mb-2">Unweighted GPA (4.0 Scale):</p>
                          <div className="text-center mb-3">
                            <div className="text-xl font-bold text-blue-700">
                              <span>GPA = </span>
                              <span className="inline-flex flex-col items-center mx-2">
                                <span className="border-b-2 border-gray-900 pb-1 px-3">
                                  Total Unweighted Points
                                </span>
                                <span className="mt-1">Total Credits</span>
                              </span>
                            </div>
                          </div>
                          <p className="text-sm font-mono text-gray-700">
                            GPA = {result.unweightedQualityPoints} ÷ {result.totalCredits} = <span className="font-bold text-blue-600">{result.unweightedGPA}</span>
                          </p>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-purple-200">
                          <p className="font-semibold text-gray-800 mb-2">Weighted GPA (5.0 Scale):</p>
                          <div className="text-center mb-3">
                            <div className="text-xl font-bold text-purple-700">
                              <span>GPA = </span>
                              <span className="inline-flex flex-col items-center mx-2">
                                <span className="border-b-2 border-gray-900 pb-1 px-3">
                                  Total Weighted Points
                                </span>
                                <span className="mt-1">Total Credits</span>
                              </span>
                            </div>
                          </div>
                          <p className="text-sm font-mono text-gray-700">
                            GPA = {result.weightedQualityPoints} ÷ {result.totalCredits} = <span className="font-bold text-purple-600">{result.weightedGPA}</span>
                          </p>
                          <p className="text-xs text-gray-600 mt-2">
                            AP/IB classes: +1.0 bonus | Honors classes: +0.5 bonus
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* GPA Scale Reference */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Reference: Course Type Bonuses</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-2">Regular Classes</h4>
                        <p className="text-sm text-gray-700 mb-2">No bonus points</p>
                        <p className="text-2xl font-bold text-gray-700">4.0 max</p>
                        <p className="text-xs text-gray-600 mt-2">Standard high school courses</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300">
                        <h4 className="font-bold text-blue-900 mb-2">Honors Classes</h4>
                        <p className="text-sm text-blue-700 mb-2">+0.5 bonus points</p>
                        <p className="text-2xl font-bold text-blue-700">4.5 max</p>
                        <p className="text-xs text-blue-600 mt-2">Advanced difficulty courses</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-300">
                        <h4 className="font-bold text-purple-900 mb-2">AP/IB Classes</h4>
                        <p className="text-sm text-purple-700 mb-2">+1.0 bonus points</p>
                        <p className="text-2xl font-bold text-purple-700">5.0 max</p>
                        <p className="text-xs text-purple-600 mt-2">College-level courses</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Enter your classes, grades, and class types, then click Calculate to see your weighted and unweighted GPA
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

            {/* Understanding High School GPA */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-purple-600" />
                Understanding High School GPA
              </h2>

              <div className="prose max-w-none">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-200">
                  <h3 className="text-2xl font-bold text-purple-800 mb-4">What is High School GPA?</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <strong>High School GPA (Grade Point Average)</strong> is a numerical representation of your academic performance throughout high school. It converts letter grades into numbers (typically on a 4.0 or 5.0 scale) and calculates a weighted average based on credit hours. GPA is one of the most important factors for college admissions, scholarships, and academic honors like valedictorian or salutatorian.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-blue-800 mb-4">Weighted vs. Unweighted GPA</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <h4 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                        📊 Unweighted GPA (4.0 Scale)
                      </h4>
                      <p className="text-gray-700 mb-2">
                        Treats all classes equally regardless of difficulty. An A is always worth 4.0 points, whether it's in regular PE or AP Calculus.
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Used by:</strong> Most colleges for standardized comparison across all applicants
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <h4 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                        ⭐ Weighted GPA (5.0 Scale)
                      </h4>
                      <p className="text-gray-700 mb-2">
                        Gives extra points for advanced courses. AP/IB classes receive a +1.0 bonus, and Honors classes receive a +0.5 bonus, recognizing the increased difficulty.
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Used by:</strong> High schools for class rank, honors, and internal recognition
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <h3 className="text-2xl font-bold text-green-800 mb-4">Why High School GPA Matters</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold text-xl">•</span>
                      <div>
                        <strong>College Admissions:</strong> GPA is the #1 factor colleges consider - even above test scores
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold text-xl">•</span>
                      <div>
                        <strong>Scholarships:</strong> Many merit scholarships require minimum GPAs (3.0-3.5+ typically)
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold text-xl">•</span>
                      <div>
                        <strong>Class Rank:</strong> Weighted GPA typically determines valedictorian, salutatorian, and top 10%
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold text-xl">•</span>
                      <div>
                        <strong>Honors & Recognition:</strong> Honor roll, National Honor Society, and graduation honors based on GPA
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold text-xl">•</span>
                      <div>
                        <strong>NCAA Eligibility:</strong> Division I/II athletes must maintain minimum GPAs for eligibility
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How to Calculate GPA */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                How to Calculate Your High School GPA
              </h2>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 mb-6">
                <h3 className="text-2xl font-bold text-purple-800 mb-4">Unweighted GPA Calculation</h3>
                <ol className="space-y-6">
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      1
                    </span>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Convert Grades to Points</h4>
                      <p className="text-gray-700 mb-3">
                        Use the standard 4.0 scale: A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      2
                    </span>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Multiply by Credits</h4>
                      <p className="text-gray-700 mb-3">
                        Multiply each grade's point value by the number of credits (usually 1 credit per class)
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      3
                    </span>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Add All Points</h4>
                      <p className="text-gray-700 mb-3">
                        Sum all quality points from all classes
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      4
                    </span>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Divide by Total Credits</h4>
                      <p className="text-gray-700 mb-3">
                        Divide total points by total credits to get your unweighted GPA
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">Weighted GPA Calculation</h3>
                <p className="text-gray-700 mb-4">
                  Follow the same steps as unweighted GPA, but add bonus points based on course difficulty:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-2">Regular Classes</h4>
                    <p className="text-3xl font-bold text-gray-700 mb-2">+0.0</p>
                    <p className="text-sm text-gray-600">No additional points</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-300">
                    <h4 className="font-bold text-blue-900 mb-2">Honors Classes</h4>
                    <p className="text-3xl font-bold text-blue-700 mb-2">+0.5</p>
                    <p className="text-sm text-blue-600">Half point bonus</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-300">
                    <h4 className="font-bold text-purple-900 mb-2">AP/IB Classes</h4>
                    <p className="text-3xl font-bold text-purple-700 mb-2">+1.0</p>
                    <p className="text-sm text-purple-600">Full point bonus</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Detailed Examples */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Detailed GPA Calculation Examples
              </h2>

              {/* Example 1: Freshman Year */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8 border-2 border-green-200">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Example 1: Freshman Year - Unweighted GPA</h3>
                <p className="text-gray-700 mb-4">
                  Alex is a freshman with the following grades in 6 classes (all regular classes):
                </p>

                <div className="overflow-x-auto mb-4">
                  <table className="w-full bg-white rounded-lg border border-green-200">
                    <thead className="bg-green-100">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Class</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Grade</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Credits</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Points</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Quality Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-green-100">
                        <td className="py-3 px-4">English 9</td>
                        <td className="text-center py-3 px-4 font-semibold">A</td>
                        <td className="text-center py-3 px-4">1</td>
                        <td className="text-center py-3 px-4">4.0</td>
                        <td className="text-center py-3 px-4 text-green-700 font-bold">4.0</td>
                      </tr>
                      <tr className="border-b border-green-100">
                        <td className="py-3 px-4">Algebra I</td>
                        <td className="text-center py-3 px-4 font-semibold">B+</td>
                        <td className="text-center py-3 px-4">1</td>
                        <td className="text-center py-3 px-4">3.3</td>
                        <td className="text-center py-3 px-4 text-green-700 font-bold">3.3</td>
                      </tr>
                      <tr className="border-b border-green-100">
                        <td className="py-3 px-4">Biology</td>
                        <td className="text-center py-3 px-4 font-semibold">A-</td>
                        <td className="text-center py-3 px-4">1</td>
                        <td className="text-center py-3 px-4">3.7</td>
                        <td className="text-center py-3 px-4 text-green-700 font-bold">3.7</td>
                      </tr>
                      <tr className="border-b border-green-100">
                        <td className="py-3 px-4">World History</td>
                        <td className="text-center py-3 px-4 font-semibold">B</td>
                        <td className="text-center py-3 px-4">1</td>
                        <td className="text-center py-3 px-4">3.0</td>
                        <td className="text-center py-3 px-4 text-green-700 font-bold">3.0</td>
                      </tr>
                      <tr className="border-b border-green-100">
                        <td className="py-3 px-4">Spanish I</td>
                        <td className="text-center py-3 px-4 font-semibold">A</td>
                        <td className="text-center py-3 px-4">1</td>
                        <td className="text-center py-3 px-4">4.0</td>
                        <td className="text-center py-3 px-4 text-green-700 font-bold">4.0</td>
                      </tr>
                      <tr className="border-b border-green-100">
                        <td className="py-3 px-4">PE</td>
                        <td className="text-center py-3 px-4 font-semibold">A</td>
                        <td className="text-center py-3 px-4">1</td>
                        <td className="text-center py-3 px-4">4.0</td>
                        <td className="text-center py-3 px-4 text-green-700 font-bold">4.0</td>
                      </tr>
                      <tr className="bg-green-50 font-bold">
                        <td className="py-3 px-4">TOTAL</td>
                        <td className="text-center py-3 px-4">-</td>
                        <td className="text-center py-3 px-4">6</td>
                        <td className="text-center py-3 px-4">-</td>
                        <td className="text-center py-3 px-4 text-green-700">22.0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <p className="font-semibold text-gray-900 mb-2">Calculation:</p>
                  <div className="text-center my-4">
                    <div className="text-xl font-bold text-green-700">
                      <span>GPA = </span>
                      <span className="inline-flex flex-col items-center mx-2">
                        <span className="border-b-2 border-gray-900 pb-1 px-3">22.0</span>
                        <span className="mt-1">6</span>
                      </span>
                      <span> = <span className="text-2xl text-green-800">3.67</span></span>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-3">
                    <strong>Result:</strong> Alex's unweighted GPA is <strong className="text-green-700">3.67</strong> - a strong start to high school!
                  </p>
                </div>
              </div>

              {/* Example 2: Junior Year with AP/Honors */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-8 border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-purple-800 mb-4">Example 2: Junior Year - Weighted vs. Unweighted GPA</h3>
                <p className="text-gray-700 mb-4">
                  Maya is a junior taking a rigorous course load with AP and Honors classes:
                </p>

                <div className="overflow-x-auto mb-4">
                  <table className="w-full bg-white rounded-lg border border-purple-200">
                    <thead className="bg-purple-100">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Class</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Type</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Grade</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Unweighted</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Weighted</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-purple-100">
                        <td className="py-3 px-4">AP English Language</td>
                        <td className="text-center py-3 px-4">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">AP</span>
                        </td>
                        <td className="text-center py-3 px-4 font-semibold">A</td>
                        <td className="text-center py-3 px-4 text-blue-700 font-bold">4.0</td>
                        <td className="text-center py-3 px-4 text-purple-700 font-bold">5.0</td>
                      </tr>
                      <tr className="border-b border-purple-100">
                        <td className="py-3 px-4">AP Calculus AB</td>
                        <td className="text-center py-3 px-4">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">AP</span>
                        </td>
                        <td className="text-center py-3 px-4 font-semibold">B+</td>
                        <td className="text-center py-3 px-4 text-blue-700 font-bold">3.3</td>
                        <td className="text-center py-3 px-4 text-purple-700 font-bold">4.3</td>
                      </tr>
                      <tr className="border-b border-purple-100">
                        <td className="py-3 px-4">Honors Chemistry</td>
                        <td className="text-center py-3 px-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Honors</span>
                        </td>
                        <td className="text-center py-3 px-4 font-semibold">A-</td>
                        <td className="text-center py-3 px-4 text-blue-700 font-bold">3.7</td>
                        <td className="text-center py-3 px-4 text-purple-700 font-bold">4.2</td>
                      </tr>
                      <tr className="border-b border-purple-100">
                        <td className="py-3 px-4">AP US History</td>
                        <td className="text-center py-3 px-4">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">AP</span>
                        </td>
                        <td className="text-center py-3 px-4 font-semibold">A</td>
                        <td className="text-center py-3 px-4 text-blue-700 font-bold">4.0</td>
                        <td className="text-center py-3 px-4 text-purple-700 font-bold">5.0</td>
                      </tr>
                      <tr className="border-b border-purple-100">
                        <td className="py-3 px-4">Spanish III</td>
                        <td className="text-center py-3 px-4">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">Regular</span>
                        </td>
                        <td className="text-center py-3 px-4 font-semibold">B</td>
                        <td className="text-center py-3 px-4 text-blue-700 font-bold">3.0</td>
                        <td className="text-center py-3 px-4 text-purple-700 font-bold">3.0</td>
                      </tr>
                      <tr className="border-b border-purple-100">
                        <td className="py-3 px-4">Band</td>
                        <td className="text-center py-3 px-4">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">Regular</span>
                        </td>
                        <td className="text-center py-3 px-4 font-semibold">A</td>
                        <td className="text-center py-3 px-4 text-blue-700 font-bold">4.0</td>
                        <td className="text-center py-3 px-4 text-purple-700 font-bold">4.0</td>
                      </tr>
                      <tr className="bg-purple-50 font-bold">
                        <td className="py-3 px-4" colSpan={3}>TOTAL</td>
                        <td className="text-center py-3 px-4 text-blue-700">22.0</td>
                        <td className="text-center py-3 px-4 text-purple-700">25.5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="font-semibold text-blue-800 mb-2">Unweighted GPA:</p>
                    <div className="text-center my-3">
                      <div className="text-lg font-bold text-blue-700">
                        22.0 ÷ 6 = <span className="text-2xl">3.67</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">4.0 scale - for college admissions</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <p className="font-semibold text-purple-800 mb-2">Weighted GPA:</p>
                    <div className="text-center my-3">
                      <div className="text-lg font-bold text-purple-700">
                        25.5 ÷ 6 = <span className="text-2xl">4.25</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">5.0 scale - for class rank</p>
                  </div>
                </div>

                <div className="mt-4 bg-white rounded-lg p-4 border border-purple-200">
                  <p className="text-gray-700">
                    <strong>Result:</strong> Maya's unweighted GPA is <strong className="text-blue-700">3.67</strong>, but her weighted GPA is <strong className="text-purple-700">4.25</strong> because she's taking challenging AP and Honors courses. The weighted GPA rewards her course rigor!
                  </p>
                </div>
              </div>

              {/* Example 3: Cumulative GPA */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">Example 3: Cumulative GPA Over Four Years</h3>
                <p className="text-gray-700 mb-4">
                  Jordan wants to calculate their cumulative GPA after 4 years of high school:
                </p>

                <div className="overflow-x-auto mb-4">
                  <table className="w-full bg-white rounded-lg border border-blue-200">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Year</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Classes</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Credits</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Quality Points</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Year GPA</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">Freshman</td>
                        <td className="text-center py-3 px-4">6</td>
                        <td className="text-center py-3 px-4">6</td>
                        <td className="text-center py-3 px-4 text-blue-700 font-bold">21.0</td>
                        <td className="text-center py-3 px-4">3.50</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">Sophomore</td>
                        <td className="text-center py-3 px-4">6</td>
                        <td className="text-center py-3 px-4">6</td>
                        <td className="text-center py-3 px-4 text-blue-700 font-bold">22.2</td>
                        <td className="text-center py-3 px-4">3.70</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">Junior</td>
                        <td className="text-center py-3 px-4">6</td>
                        <td className="text-center py-3 px-4">6</td>
                        <td className="text-center py-3 px-4 text-blue-700 font-bold">22.8</td>
                        <td className="text-center py-3 px-4">3.80</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">Senior (1st Sem)</td>
                        <td className="text-center py-3 px-4">6</td>
                        <td className="text-center py-3 px-4">6</td>
                        <td className="text-center py-3 px-4 text-blue-700 font-bold">23.4</td>
                        <td className="text-center py-3 px-4">3.90</td>
                      </tr>
                      <tr className="bg-blue-50 font-bold">
                        <td className="py-3 px-4">TOTAL</td>
                        <td className="text-center py-3 px-4">24</td>
                        <td className="text-center py-3 px-4">24</td>
                        <td className="text-center py-3 px-4 text-blue-700">89.4</td>
                        <td className="text-center py-3 px-4">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="font-semibold text-gray-900 mb-3">Cumulative GPA Calculation:</p>
                  <div className="text-center my-4">
                    <div className="text-xl font-bold text-blue-700">
                      <span>Cumulative GPA = </span>
                      <span className="inline-flex flex-col items-center mx-2">
                        <span className="border-b-2 border-gray-900 pb-1 px-3">89.4</span>
                        <span className="mt-1">24</span>
                      </span>
                      <span> = <span className="text-2xl text-blue-800">3.73</span></span>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-3">
                    <strong>Result:</strong> Jordan's cumulative GPA is <strong className="text-blue-700">3.73</strong> - competitive for most colleges! Notice how Jordan improved each year, showing strong academic growth.
                  </p>
                </div>
              </div>
            </section>

            {/* GPA Conversion Tables */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                GPA Grading Scales & Conversion Tables
              </h2>

              {/* Unweighted Scale */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">Unweighted GPA Scale (4.0)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white rounded-lg border border-blue-200">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Letter Grade</th>
                        <th className="text-center py-3 px-4 font-semibold">Grade Points</th>
                        <th className="text-center py-3 px-4 font-semibold">Percentage</th>
                        <th className="text-left py-3 px-4 font-semibold">Quality</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">A+ / A</td>
                        <td className="text-center py-3 px-4 text-blue-700 font-bold">4.0</td>
                        <td className="text-center py-3 px-4">93-100%</td>
                        <td className="py-3 px-4">Excellent</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 px-4 font-semibold">A-</td>
                        <td className="text-center py-3 px-4 text-blue-700 font-bold">3.7</td>
                        <td className="text-center py-3 px-4">90-92%</td>
                        <td className="py-3 px-4">Excellent</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">B+</td>
                        <td className="text-center py-3 px-4 text-blue-700 font-bold">3.3</td>
                        <td className="text-center py-3 px-4">87-89%</td>
                        <td className="py-3 px-4">Very Good</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 px-4 font-semibold">B</td>
                        <td className="text-center py-3 px-4 text-blue-700 font-bold">3.0</td>
                        <td className="text-center py-3 px-4">83-86%</td>
                        <td className="py-3 px-4">Good</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">B-</td>
                        <td className="text-center py-3 px-4 text-blue-700 font-bold">2.7</td>
                        <td className="text-center py-3 px-4">80-82%</td>
                        <td className="py-3 px-4">Good</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 px-4 font-semibold">C+</td>
                        <td className="text-center py-3 px-4 text-blue-700 font-bold">2.3</td>
                        <td className="text-center py-3 px-4">77-79%</td>
                        <td className="py-3 px-4">Average</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">C</td>
                        <td className="text-center py-3 px-4 text-blue-700 font-bold">2.0</td>
                        <td className="text-center py-3 px-4">73-76%</td>
                        <td className="py-3 px-4">Average</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 px-4 font-semibold">C-</td>
                        <td className="text-center py-3 px-4 text-blue-700 font-bold">1.7</td>
                        <td className="text-center py-3 px-4">70-72%</td>
                        <td className="py-3 px-4">Below Average</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">D+</td>
                        <td className="text-center py-3 px-4 text-orange-600 font-bold">1.3</td>
                        <td className="text-center py-3 px-4">67-69%</td>
                        <td className="py-3 px-4">Poor</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 px-4 font-semibold">D</td>
                        <td className="text-center py-3 px-4 text-orange-600 font-bold">1.0</td>
                        <td className="text-center py-3 px-4">65-66%</td>
                        <td className="py-3 px-4">Poor</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold">F</td>
                        <td className="text-center py-3 px-4 text-red-600 font-bold">0.0</td>
                        <td className="text-center py-3 px-4">Below 65%</td>
                        <td className="py-3 px-4">Failing</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Weighted Scale Comparison */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-purple-800 mb-4">Weighted GPA Scale Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white rounded-lg border border-purple-200">
                    <thead className="bg-purple-100">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Letter Grade</th>
                        <th className="text-center py-3 px-4 font-semibold">Regular</th>
                        <th className="text-center py-3 px-4 font-semibold">Honors (+0.5)</th>
                        <th className="text-center py-3 px-4 font-semibold">AP/IB (+1.0)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">A</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">4.0</td>
                        <td className="text-center py-3 px-4 font-bold text-blue-700">4.5</td>
                        <td className="text-center py-3 px-4 font-bold text-purple-700">5.0</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 px-4 font-semibold">A-</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">3.7</td>
                        <td className="text-center py-3 px-4 font-bold text-blue-700">4.2</td>
                        <td className="text-center py-3 px-4 font-bold text-purple-700">4.7</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">B+</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">3.3</td>
                        <td className="text-center py-3 px-4 font-bold text-blue-700">3.8</td>
                        <td className="text-center py-3 px-4 font-bold text-purple-700">4.3</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 px-4 font-semibold">B</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">3.0</td>
                        <td className="text-center py-3 px-4 font-bold text-blue-700">3.5</td>
                        <td className="text-center py-3 px-4 font-bold text-purple-700">4.0</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">B-</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">2.7</td>
                        <td className="text-center py-3 px-4 font-bold text-blue-700">3.2</td>
                        <td className="text-center py-3 px-4 font-bold text-purple-700">3.7</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 px-4 font-semibold">C+</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">2.3</td>
                        <td className="text-center py-3 px-4 font-bold text-blue-700">2.8</td>
                        <td className="text-center py-3 px-4 font-bold text-purple-700">3.3</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">C</td>
                        <td className="text-center py-3 px-4 font-bold text-gray-700">2.0</td>
                        <td className="text-center py-3 px-4 font-bold text-blue-700">2.5</td>
                        <td className="text-center py-3 px-4 font-bold text-purple-700">3.0</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold">D or F</td>
                        <td className="text-center py-3 px-4 font-bold text-red-600">≤ 1.0</td>
                        <td className="text-center py-3 px-4 font-bold text-red-600">≤ 1.5</td>
                        <td className="text-center py-3 px-4 font-bold text-red-600">≤ 2.0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Note:</strong> Some schools cap weighted GPAs at 5.0, meaning any weighted score above 5.0 is recorded as 5.0.
                </p>
              </div>

              {/* College Admissions GPA Ranges */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-2xl font-bold text-green-800 mb-4">College Admissions GPA Benchmarks</h3>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white rounded-lg border border-green-200">
                    <thead className="bg-green-100">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">GPA Range</th>
                        <th className="text-left py-3 px-4 font-semibold">College Tier</th>
                        <th className="text-left py-3 px-4 font-semibold">Examples</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-bold text-green-700">3.9 - 4.0</td>
                        <td className="py-3 px-4 font-semibold">Elite / Ivy League</td>
                        <td className="py-3 px-4 text-sm">Harvard, Stanford, MIT, Yale, Princeton</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 px-4 font-bold text-green-600">3.7 - 3.89</td>
                        <td className="py-3 px-4 font-semibold">Highly Competitive</td>
                        <td className="py-3 px-4 text-sm">Top 20 universities, UC Berkeley, UCLA, UMich</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-bold text-green-600">3.5 - 3.69</td>
                        <td className="py-3 px-4 font-semibold">Competitive</td>
                        <td className="py-3 px-4 text-sm">Top 50 universities, Penn State, BU, Northeastern</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 px-4 font-bold text-blue-600">3.0 - 3.49</td>
                        <td className="py-3 px-4 font-semibold">Moderately Competitive</td>
                        <td className="py-3 px-4 text-sm">State universities, regional universities</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-bold text-yellow-600">2.5 - 2.99</td>
                        <td className="py-3 px-4 font-semibold">Less Competitive</td>
                        <td className="py-3 px-4 text-sm">Many state schools, private colleges</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-orange-600">2.0 - 2.49</td>
                        <td className="py-3 px-4 font-semibold">Open Enrollment</td>
                        <td className="py-3 px-4 text-sm">Community colleges, some 4-year schools</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Important:</strong> These are general guidelines. Colleges consider many factors beyond GPA including test scores, extracurriculars, essays, and recommendations.
                </p>
              </div>
            </section>

            {/* Tips for Improving GPA */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Tips for Improving Your High School GPA
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-800 mb-2">Take Rigorous Courses</h3>
                      <p className="text-gray-700">
                        Challenge yourself with AP, IB, and Honors classes. Not only do they boost your weighted GPA, but colleges also value course rigor highly in admissions decisions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-800 mb-2">Start Strong Freshman Year</h3>
                      <p className="text-gray-700">
                        Your freshman grades count! Build a strong foundation early - it's much easier to maintain a high GPA than to raise a low one later.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-800 mb-2">Develop Strong Study Habits</h3>
                      <p className="text-gray-700">
                        Create a consistent study schedule, find effective study methods, and stay organized with assignments and deadlines.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-orange-800 mb-2">Get Help When Needed</h3>
                      <p className="text-gray-700">
                        Don't wait until you're failing - seek help from teachers, tutors, or study groups at the first sign of struggle.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border-2 border-pink-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-pink-800 mb-2">Balance Your Schedule</h3>
                      <p className="text-gray-700">
                        Don't overload with too many difficult classes at once. Mix challenging courses with subjects you excel in for sustainable success.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                      6
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-indigo-800 mb-2">Participate Actively in Class</h3>
                      <p className="text-gray-700">
                        Ask questions, contribute to discussions, and show engagement. Teachers notice effort, which can help with participation grades and recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Common Mistakes */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Common GPA Mistakes to Avoid
              </h2>

              <div className="space-y-4">
                <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-red-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    Ignoring Weighted vs. Unweighted Difference
                  </h3>
                  <p className="text-gray-700">
                    <strong>Mistake:</strong> Confusing weighted and unweighted GPA when reporting to colleges.
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Correct:</strong> Most colleges recalculate your GPA using their own method. Report both weighted and unweighted, and let them use what they need.
                  </p>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
                  <h3 className="text-xl font-bold text-orange-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    Taking Easy Classes for High GPA
                  </h3>
                  <p className="text-gray-700">
                    <strong>Mistake:</strong> Avoiding challenging courses to maintain a 4.0 unweighted GPA.
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Correct:</strong> Colleges prefer a 3.7 GPA with rigorous AP/IB courses over a 4.0 with all regular classes. Course rigor matters!
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-500">
                  <h3 className="text-xl font-bold text-yellow-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    Not Understanding Class Rank
                  </h3>
                  <p className="text-gray-700">
                    <strong>Mistake:</strong> Assuming unweighted GPA determines class rank.
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Correct:</strong> Most schools use weighted GPA for class rank. Taking advanced courses helps you compete for valedictorian/salutatorian.
                  </p>
                </div>

                <div className="bg-amber-50 rounded-xl p-6 border-l-4 border-amber-500">
                  <h3 className="text-xl font-bold text-amber-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    Giving Up After Freshman Year
                  </h3>
                  <p className="text-gray-700">
                    <strong>Mistake:</strong> Getting a low GPA freshman year and thinking it's too late to improve.
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Correct:</strong> Colleges love upward trends! Strong improvement from freshman to senior year demonstrates growth and maturity.
                  </p>
                </div>

                <div className="bg-rose-50 rounded-xl p-6 border-l-4 border-rose-500">
                  <h3 className="text-xl font-bold text-rose-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    Not Knowing Your School's Grading Scale
                  </h3>
                  <p className="text-gray-700">
                    <strong>Mistake:</strong> Assuming all schools use the same grading scale and weighting system.
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Correct:</strong> Check your school's specific policies. Some schools cap weighted GPAs at 5.0, others at 6.0. Know your system!
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
                <div className="bg-white rounded-xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-colors">
                  <h3 className="text-xl font-bold text-purple-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    What's more important: weighted or unweighted GPA?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Both matter, but for different purposes.</strong> Colleges primarily look at your <strong>unweighted GPA</strong> (4.0 scale) to compare all applicants fairly, regardless of which school they attended. However, they also review your <strong>course rigor</strong> - the difficulty of classes you took. Your high school uses <strong>weighted GPA</strong> (5.0 scale) for class rank and honors. The best strategy: take challenging courses (boosting weighted GPA) while earning strong grades (maintaining unweighted GPA).
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-colors">
                  <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    How much can I raise my GPA in one semester?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    It depends on how many semesters you've completed. <strong>Freshman year:</strong> You can raise your GPA significantly (0.3-0.5 points) with one strong semester. <strong>Junior/Senior year:</strong> It's harder - even straight A's might only raise your cumulative GPA by 0.1-0.2 points because you have more credits weighing it down. This is why starting strong matters! Example: A freshman with a 3.0 (6 credits) who gets a 4.0 next semester (6 more credits) will have a 3.5 cumulative GPA. A junior with a 3.0 (18 credits) who gets a 4.0 next semester (6 credits) will only reach a 3.25 cumulative GPA.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-green-200 hover:border-green-400 transition-colors">
                  <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    Do colleges see all my semester GPAs or just cumulative?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Colleges see your <strong>entire transcript</strong> with grades for every individual class, plus your cumulative GPA. They notice trends - <strong>upward trends are good</strong> (showing improvement and maturity), while <strong>downward trends are concerning</strong>. Senior year grades still matter! Many colleges require mid-year reports showing your senior fall semester grades, and they can <strong>rescind acceptances</strong> if senior spring grades drop significantly.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-yellow-200 hover:border-yellow-400 transition-colors">
                  <h3 className="text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    Does a B in an AP class look better than an A in regular class?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Yes, in most cases.</strong> Selective colleges prefer students who challenge themselves with rigorous courses, even if it means slightly lower grades. A <strong>B in AP Calculus</strong> demonstrates you're ready for college-level work, while an <strong>A in regular Math</strong> might suggest you're avoiding challenges. However, there's a limit - a C or D in an AP class is concerning. The sweet spot: <strong>Take the hardest courses you can handle while maintaining B's or better.</strong> An all-AP schedule with C's is worse than a balanced schedule with A's and B's.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-red-200 hover:border-red-400 transition-colors">
                  <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    What GPA do I need to be valedictorian?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    It varies by school, but typically <strong>4.3-4.7 weighted GPA</strong> is competitive for valedictorian. This usually requires taking mostly AP/Honors classes and earning A's in them. Some competitive high schools have multiple students with perfect weighted GPAs above 5.0! Class rank is based on <strong>weighted GPA</strong>, so taking advanced courses is essential. <strong>Note:</strong> Some schools name multiple valedictorians if students tie, while others use additional criteria (test scores, essays) to break ties.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-pink-200 hover:border-pink-400 transition-colors">
                  <h3 className="text-xl font-bold text-pink-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    How do colleges recalculate my GPA?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Many colleges <strong>recalculate your GPA using their own method</strong> to ensure fair comparison. Common practices: <strong>(1)</strong> Use only core academic classes (exclude PE, art, electives); <strong>(2)</strong> Apply their own weighting system for AP/Honors; <strong>(3)</strong> Convert your school's grading scale to their standard 4.0 scale; <strong>(4)</strong> Sometimes exclude freshman year. The UC system, for example, uses only sophomore and junior year grades in specific courses and applies their own +1.0 bonus for approved honors courses (capped at 8 semesters).
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-indigo-200 hover:border-indigo-400 transition-colors">
                  <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    Can I retake classes to improve my GPA?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>It depends on your school's policy.</strong> Some high schools allow you to retake a failed class and replace the grade, while others average both attempts or show both on your transcript. <strong>Summer school</strong> and <strong>credit recovery programs</strong> are common options for retaking failed classes. However, most schools <strong>won't let you retake a class you passed</strong> just to improve from a B to an A. Check with your guidance counselor about your school's specific retake policy and how it affects transcripts.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-teal-200 hover:border-teal-400 transition-colors">
                  <h3 className="text-xl font-bold text-teal-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    Do colleges care about weighted or unweighted GPA more?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Colleges care about <strong>both your grades AND course rigor</strong>. They typically focus on your <strong>unweighted GPA</strong> to evaluate your actual academic performance on a standardized scale, but they <strong>heavily consider</strong> whether you challenged yourself with AP/IB/Honors courses. Admissions officers review your transcript in context with what was available at your school. Taking 2 AP classes looks great at a school offering only 3, but might seem minimal at a school offering 25. Most competitive colleges want to see you took the "most rigorous" curriculum available.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-orange-200 hover:border-orange-400 transition-colors">
                  <h3 className="text-xl font-bold text-orange-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    What's a good GPA for college scholarships?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Most merit scholarships require <strong>minimum 3.0-3.5 GPA</strong> (unweighted). Here's a general breakdown: <strong>3.0-3.4:</strong> Qualifies for basic academic scholarships; <strong>3.5-3.7:</strong> Competitive for many merit scholarships; <strong>3.8-4.0:</strong> Eligible for prestigious scholarships, full-tuition awards, and honors programs. However, GPA is just one factor - many scholarships also consider test scores (SAT/ACT), leadership, community service, and essays. Some schools offer automatic scholarships based solely on GPA/test score combinations.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-colors">
                  <h3 className="text-xl font-bold text-purple-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    Should I take an AP class if I might get a B or C?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>A B in an AP class is generally fine and shows rigor.</strong> A <strong>C is borderline</strong> - it might still be worth it if it's in an area you're passionate about or plan to major in. <strong>D or F in an AP class is worse than an A in regular</strong> - avoid setting yourself up for failure. Consider: <strong>(1)</strong> Is this subject important for your intended major? <strong>(2)</strong> How many other AP classes are you taking? <strong>(3)</strong> Do you have time for the workload? Better strategy: Take a mix of AP and Honors courses where you can earn A's and B's rather than all AP courses with C's.
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 rounded-2xl p-8 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Take Control of Your Academic Future</h2>
                <p className="text-lg text-purple-100 mb-6 leading-relaxed">
                  Your high school GPA is one of the most important factors in college admissions, scholarships, and academic honors. Use this calculator regularly to track both your weighted and unweighted GPA, understand how AP/IB/Honors classes affect your standing, and plan strategically for your goals. Remember: it's not just about the numbers - course rigor, upward trends, and consistent effort matter too!
                </p>
                <p className="text-lg text-purple-100 leading-relaxed">
                  Whether you're a freshman starting your high school journey, a junior preparing college applications, or a senior monitoring your final semester, our High School GPA Calculator provides accurate calculations with detailed breakdowns. Stay motivated, challenge yourself with rigorous courses, seek help when needed, and watch your academic achievements grow!
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
              Need Help Boosting Your High School GPA?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you excel in AP, IB, and honors classes. Get personalized guidance to improve your grades, master challenging subjects, and achieve your college admission goals.
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
