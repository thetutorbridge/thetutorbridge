'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calculator,
  Home,
  ArrowRight,
  GraduationCap,
  Award,
  TrendingUp,
  Plus,
  X,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  Target,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Grade point scales
const gradeScales = {
  standard: {
    name: 'Standard 4.0 Scale',
    grades: {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'D-': 0.7,
      'F': 0.0
    }
  },
  plusMinus: {
    name: '4.0 Scale (A+ = 4.0)',
    grades: {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'D-': 0.7,
      'F': 0.0
    }
  },
  weighted: {
    name: 'Weighted 5.0 Scale (Honors/AP)',
    grades: {
      'A+': 5.0, 'A': 5.0, 'A-': 4.7,
      'B+': 4.3, 'B': 4.0, 'B-': 3.7,
      'C+': 3.3, 'C': 3.0, 'C-': 2.7,
      'D+': 2.3, 'D': 2.0, 'D-': 1.7,
      'F': 0.0
    }
  },
  simple: {
    name: 'Simple 4.0 Scale (No +/-)',
    grades: {
      'A': 4.0,
      'B': 3.0,
      'C': 2.0,
      'D': 1.0,
      'F': 0.0
    }
  }
};

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: string;
  isHonors: boolean;
}

export default function GPACalculatorPage() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', grade: 'A', credits: '3', isHonors: false },
    { id: 2, name: '', grade: 'B+', credits: '3', isHonors: false },
    { id: 3, name: '', grade: 'A-', credits: '4', isHonors: false },
    { id: 4, name: '', grade: 'B', credits: '3', isHonors: false },
  ]);
  const [nextId, setNextId] = useState(5);
  const [selectedScale, setSelectedScale] = useState<keyof typeof gradeScales>('standard');
  const [showCumulative, setShowCumulative] = useState(false);
  const [previousGPA, setPreviousGPA] = useState('');
  const [previousCredits, setPreviousCredits] = useState('');
  const [useWeightedBonus, setUseWeightedBonus] = useState(false);
  const [calculated, setCalculated] = useState(false);

  // Result state
  const [result, setResult] = useState<{
    semesterGPA: number;
    cumulativeGPA: number | null;
    totalCredits: number;
    totalCumulativeCredits: number | null;
    totalQualityPoints: number;
    letterGrade: string;
    standing: string;
    percentile: string;
  } | null>(null);

  const addCourse = () => {
    setCourses([...courses, { id: nextId, name: '', grade: 'A', credits: '3', isHonors: false }]);
    setNextId(nextId + 1);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const updateCourse = (id: number, field: keyof Course, value: string | boolean) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const getGradePoint = (grade: string, isHonors: boolean): number => {
    const scale = gradeScales[selectedScale];
    let points = scale.grades[grade as keyof typeof scale.grades] || 0;

    // Add honors bonus if applicable
    if (useWeightedBonus && isHonors && selectedScale !== 'weighted') {
      points = Math.min(points + 1.0, 5.0);
    }

    return points;
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

  const getAcademicStanding = (gpa: number): string => {
    if (gpa >= 3.9) return 'Summa Cum Laude';
    if (gpa >= 3.7) return 'Magna Cum Laude';
    if (gpa >= 3.5) return 'Cum Laude';
    if (gpa >= 3.0) return "Dean's List";
    if (gpa >= 2.5) return 'Good Standing';
    if (gpa >= 2.0) return 'Satisfactory';
    if (gpa >= 1.5) return 'Academic Warning';
    return 'Academic Probation';
  };

  const getPercentile = (gpa: number): string => {
    if (gpa >= 3.9) return 'Top 5%';
    if (gpa >= 3.7) return 'Top 10%';
    if (gpa >= 3.5) return 'Top 15%';
    if (gpa >= 3.3) return 'Top 20%';
    if (gpa >= 3.0) return 'Top 30%';
    if (gpa >= 2.7) return 'Top 40%';
    if (gpa >= 2.5) return 'Top 50%';
    if (gpa >= 2.0) return 'Top 65%';
    return 'Below Average';
  };

  const calculateGPA = () => {
    // Validate courses
    let totalQualityPoints = 0;
    let totalCredits = 0;

    for (const course of courses) {
      const credits = parseFloat(course.credits);
      if (isNaN(credits) || credits <= 0) {
        alert('Please enter valid credit hours for all courses');
        return;
      }
      const gradePoint = getGradePoint(course.grade, course.isHonors);
      totalQualityPoints += gradePoint * credits;
      totalCredits += credits;
    }

    const semesterGPA = totalQualityPoints / totalCredits;

    // Calculate cumulative if enabled
    let cumulativeGPA: number | null = null;
    let totalCumulativeCredits: number | null = null;

    if (showCumulative && previousGPA && previousCredits) {
      const prevGPA = parseFloat(previousGPA);
      const prevCredits = parseFloat(previousCredits);

      if (isNaN(prevGPA) || prevGPA < 0 || prevGPA > 5.0) {
        alert('Please enter a valid previous GPA (0.0 - 5.0)');
        return;
      }
      if (isNaN(prevCredits) || prevCredits <= 0) {
        alert('Please enter valid previous credits');
        return;
      }

      const prevQualityPoints = prevGPA * prevCredits;
      totalCumulativeCredits = prevCredits + totalCredits;
      cumulativeGPA = (prevQualityPoints + totalQualityPoints) / totalCumulativeCredits;
    }

    const finalGPA = cumulativeGPA || semesterGPA;

    setResult({
      semesterGPA: parseFloat(semesterGPA.toFixed(3)),
      cumulativeGPA: cumulativeGPA ? parseFloat(cumulativeGPA.toFixed(3)) : null,
      totalCredits,
      totalCumulativeCredits,
      totalQualityPoints: parseFloat(totalQualityPoints.toFixed(2)),
      letterGrade: getLetterGrade(finalGPA),
      standing: getAcademicStanding(finalGPA),
      percentile: getPercentile(finalGPA)
    });
    setCalculated(true);
  };

  const resetCalculator = () => {
    setCourses([
      { id: 1, name: '', grade: 'A', credits: '3', isHonors: false },
      { id: 2, name: '', grade: 'B+', credits: '3', isHonors: false },
      { id: 3, name: '', grade: 'A-', credits: '4', isHonors: false },
      { id: 4, name: '', grade: 'B', credits: '3', isHonors: false },
    ]);
    setNextId(5);
    setPreviousGPA('');
    setPreviousCredits('');
    setShowCumulative(false);
    setResult(null);
    setCalculated(false);
  };

  const currentScale = gradeScales[selectedScale];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/calculators" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <Calculator className="w-4 h-4 mr-1" />
              Calculators
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">GPA Calculator</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-bold">
              GPA Calculator
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Calculate your Grade Point Average instantly. Supports multiple grading scales including
            standard 4.0, weighted 5.0 for Honors/AP courses, and cumulative GPA calculations.
          </p>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
            <p className="text-lg italic">
              Perfect for high school students, college students, and anyone tracking academic performance!
            </p>
          </div>
        </div>
      </section>

      {/* Main Calculator */}
      <main className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Input Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-[#2BAE66]" />
                  Enter Your Grades
                </h2>

                {/* Scale Selection */}
                <div className="mb-6">
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Grading Scale
                  </Label>
                  <Select value={selectedScale} onValueChange={(v) => setSelectedScale(v as keyof typeof gradeScales)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(gradeScales).map(([key, scale]) => (
                        <SelectItem key={key} value={key}>{scale.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Weighted Bonus Toggle */}
                {selectedScale !== 'weighted' && (
                  <div className="mb-6 flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Add Honors/AP Bonus?</p>
                      <p className="text-xs text-gray-500">+1.0 points for honors courses</p>
                    </div>
                    <button
                      onClick={() => setUseWeightedBonus(!useWeightedBonus)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        useWeightedBonus
                          ? 'bg-[#2BAE66] text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {useWeightedBonus ? 'Yes' : 'No'}
                    </button>
                  </div>
                )}

                {/* Course List */}
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2 mb-6">
                  {courses.map((course, index) => (
                    <div key={course.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-gray-700">Course {index + 1}</span>
                        {courses.length > 1 && (
                          <button
                            onClick={() => removeCourse(course.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Input
                          type="text"
                          placeholder="Course name (optional)"
                          value={course.name}
                          onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                          className="text-sm"
                        />

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs text-gray-600 mb-1 block">Grade</Label>
                            <Select
                              value={course.grade}
                              onValueChange={(v) => updateCourse(course.id, 'grade', v)}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(currentScale.grades).map(([grade, points]) => (
                                  <SelectItem key={grade} value={grade}>
                                    {grade} ({points.toFixed(1)})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 mb-1 block">Credits</Label>
                            <Input
                              type="number"
                              min="0.5"
                              step="0.5"
                              value={course.credits}
                              onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                              className="text-center"
                            />
                          </div>
                        </div>

                        {useWeightedBonus && (
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={course.isHonors}
                              onChange={(e) => updateCourse(course.id, 'isHonors', e.target.checked)}
                              className="w-4 h-4 text-[#2BAE66] rounded"
                            />
                            <span className="text-sm text-gray-600">Honors/AP Course (+1.0)</span>
                          </label>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={addCourse}
                  variant="outline"
                  className="w-full mb-6 border-2 border-dashed border-[#2BAE66] text-[#2BAE66] hover:bg-green-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Course
                </Button>

                {/* Cumulative GPA Option */}
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Calculate Cumulative GPA?</p>
                      <p className="text-xs text-gray-500">Include previous semesters</p>
                    </div>
                    <button
                      onClick={() => setShowCumulative(!showCumulative)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        showCumulative
                          ? 'bg-[#1A3D7C] text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {showCumulative ? 'Yes' : 'No'}
                    </button>
                  </div>

                  {showCumulative && (
                    <div className="space-y-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-1 block">
                          Previous Cumulative GPA
                        </Label>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          max="5"
                          placeholder="e.g., 3.50"
                          value={previousGPA}
                          onChange={(e) => setPreviousGPA(e.target.value)}
                          className="text-center"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-1 block">
                          Previous Total Credits
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          placeholder="e.g., 45"
                          value={previousCredits}
                          onChange={(e) => setPreviousCredits(e.target.value)}
                          className="text-center"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={calculateGPA}
                    className="flex-1 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] hover:opacity-90 text-white py-6 text-lg font-semibold"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate GPA
                  </Button>
                  <Button
                    onClick={resetCalculator}
                    variant="outline"
                    className="px-6 py-6 border-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3">
              {result ? (
                <div className="space-y-6">
                  {/* Main Result Card */}
                  <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-2xl shadow-xl p-8 text-white">
                    <h3 className="text-xl font-semibold mb-6 flex items-center">
                      <Award className="w-6 h-6 mr-2 text-[#FFC857]" />
                      Your GPA Results
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                        <p className="text-sm text-white/80 mb-2">Semester GPA</p>
                        <p className="text-5xl font-bold text-[#FFC857]">{result.semesterGPA}</p>
                        <p className="text-sm text-white/80 mt-2">{result.totalCredits} credits</p>
                      </div>

                      {result.cumulativeGPA !== null && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-[#FFC857]">
                          <p className="text-sm text-white/80 mb-2">Cumulative GPA</p>
                          <p className="text-5xl font-bold text-[#FFC857]">{result.cumulativeGPA}</p>
                          <p className="text-sm text-white/80 mt-2">{result.totalCumulativeCredits} total credits</p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                        <p className="text-sm text-white/80">Letter Grade</p>
                        <p className="text-2xl font-bold">{result.letterGrade}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                        <p className="text-sm text-white/80">Quality Points</p>
                        <p className="text-2xl font-bold">{result.totalQualityPoints}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                        <p className="text-sm text-white/80">Percentile</p>
                        <p className="text-2xl font-bold">{result.percentile}</p>
                      </div>
                    </div>
                  </div>

                  {/* Academic Standing */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <h3 className="text-xl font-bold text-[#1A3D7C] mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-[#2BAE66]" />
                      Academic Standing
                    </h3>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                      <p className="text-2xl font-bold text-green-700">{result.standing}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Based on your {result.cumulativeGPA !== null ? 'cumulative' : 'semester'} GPA of {result.cumulativeGPA || result.semesterGPA}
                      </p>
                    </div>
                  </div>

                  {/* Calculation Breakdown */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <h3 className="text-xl font-bold text-[#1A3D7C] mb-4 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-[#2BAE66]" />
                      Calculation Breakdown
                    </h3>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Course</th>
                            <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Grade</th>
                            <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Credits</th>
                            <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Points</th>
                            <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Quality Pts</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courses.map((course, idx) => {
                            const credits = parseFloat(course.credits);
                            const gradePoint = getGradePoint(course.grade, course.isHonors);
                            const qualityPts = gradePoint * credits;

                            return (
                              <tr key={course.id} className="border-b border-gray-100">
                                <td className="py-3 px-2 text-sm">
                                  {course.name || `Course ${idx + 1}`}
                                  {course.isHonors && useWeightedBonus && (
                                    <span className="ml-1 text-xs bg-blue-100 text-blue-700 px-1 rounded">H</span>
                                  )}
                                </td>
                                <td className="py-3 px-2 text-sm text-center font-semibold">{course.grade}</td>
                                <td className="py-3 px-2 text-sm text-center">{credits}</td>
                                <td className="py-3 px-2 text-sm text-center">{gradePoint.toFixed(1)}</td>
                                <td className="py-3 px-2 text-sm text-center font-semibold text-[#2BAE66]">
                                  {qualityPts.toFixed(2)}
                                </td>
                              </tr>
                            );
                          })}
                          <tr className="bg-gray-50 font-bold">
                            <td className="py-3 px-2 text-sm">Total</td>
                            <td className="py-3 px-2 text-sm text-center">-</td>
                            <td className="py-3 px-2 text-sm text-center">{result.totalCredits}</td>
                            <td className="py-3 px-2 text-sm text-center">-</td>
                            <td className="py-3 px-2 text-sm text-center text-[#2BAE66]">{result.totalQualityPoints}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Formula */}
                    <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                      <h4 className="font-bold text-[#1A3D7C] mb-3">GPA Formula:</h4>
                      <div className="text-center mb-4">
                        <div className="text-xl font-bold text-[#1A3D7C]">
                          GPA = Total Quality Points ÷ Total Credits
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm font-mono text-gray-700">
                          GPA = {result.totalQualityPoints} ÷ {result.totalCredits} = <span className="font-bold text-[#2BAE66]">{result.semesterGPA}</span>
                        </p>
                        {result.cumulativeGPA !== null && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-sm text-gray-600 mb-1">Cumulative Calculation:</p>
                            <p className="text-sm font-mono text-gray-700">
                              ({previousGPA} × {previousCredits} + {result.totalQualityPoints}) ÷ {result.totalCumulativeCredits} = <span className="font-bold text-[#2BAE66]">{result.cumulativeGPA}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Grade Scale Reference */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">
                      {currentScale.name} Reference
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.entries(currentScale.grades).map(([grade, points]) => (
                        <div key={grade} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                          <span className="font-semibold text-gray-900">{grade}</span>
                          <span className="text-[#2BAE66] font-bold">{points.toFixed(1)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
                  <GraduationCap className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Enter Your Courses</h3>
                  <p className="text-gray-500">
                    Add your courses, select grades, and enter credit hours, then click Calculate to see your GPA results.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      {/* Educational Content */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="container mx-auto max-w-5xl">

          {/* What is GPA */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-[#2BAE66]" />
              What is GPA (Grade Point Average)?
            </h2>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>GPA (Grade Point Average)</strong> is a standardized numerical representation of your academic performance. It converts letter grades (A, B, C, D, F) into numerical values on a scale, typically 4.0 in the United States, and calculates a weighted average based on credit hours. GPA is used by schools, colleges, universities, employers, and scholarship committees to evaluate academic achievement.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-xl font-bold text-[#1A3D7C] mb-3">Why GPA Matters</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 mt-0.5 flex-shrink-0" />
                      <span>College admissions decisions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 mt-0.5 flex-shrink-0" />
                      <span>Scholarship eligibility</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 mt-0.5 flex-shrink-0" />
                      <span>Graduate school applications</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 mt-0.5 flex-shrink-0" />
                      <span>Job applications (entry-level)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 mt-0.5 flex-shrink-0" />
                      <span>Academic honors and awards</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <h3 className="text-xl font-bold text-[#1A3D7C] mb-3">Types of GPA</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Semester GPA:</strong> Single term performance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Cumulative GPA:</strong> Overall academic career</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Major GPA:</strong> Courses in your major only</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Weighted GPA:</strong> Includes honors bonus</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Unweighted GPA:</strong> Standard 4.0 scale</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* How to Calculate GPA */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-[#2BAE66]" />
              How to Calculate GPA Step-by-Step
            </h2>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1A3D7C] mb-2">Convert Letter Grades to Grade Points</h3>
                    <p className="text-gray-700 mb-2">Each letter grade has a corresponding numerical value. On the standard 4.0 scale:</p>
                    <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm">
                      A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, F = 0.0
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1A3D7C] mb-2">Calculate Quality Points for Each Course</h3>
                    <p className="text-gray-700 mb-2">Multiply each course's grade points by its credit hours:</p>
                    <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm">
                      Quality Points = Grade Points × Credit Hours<br />
                      Example: A (4.0) in a 3-credit course = 4.0 × 3 = 12 quality points
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1A3D7C] mb-2">Sum All Quality Points and Credits</h3>
                    <p className="text-gray-700 mb-2">Add up all quality points and all credit hours separately:</p>
                    <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm">
                      Total Quality Points = Sum of (Grade Points × Credits) for all courses<br />
                      Total Credits = Sum of all credit hours
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1A3D7C] mb-2">Divide to Get Your GPA</h3>
                    <p className="text-gray-700 mb-2">Divide total quality points by total credits:</p>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="font-mono text-lg text-center">
                        <strong>GPA = Total Quality Points ÷ Total Credits</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Example Calculation */}
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h4 className="text-xl font-bold text-[#1A3D7C] mb-4">Example Calculation</h4>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full bg-white rounded-lg">
                    <thead className="bg-[#1A3D7C] text-white">
                      <tr>
                        <th className="py-2 px-3 text-left text-sm">Course</th>
                        <th className="py-2 px-3 text-center text-sm">Grade</th>
                        <th className="py-2 px-3 text-center text-sm">Credits</th>
                        <th className="py-2 px-3 text-center text-sm">Points</th>
                        <th className="py-2 px-3 text-center text-sm">Quality Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-3 text-sm">Mathematics</td>
                        <td className="py-2 px-3 text-center text-sm font-semibold">A</td>
                        <td className="py-2 px-3 text-center text-sm">3</td>
                        <td className="py-2 px-3 text-center text-sm">4.0</td>
                        <td className="py-2 px-3 text-center text-sm font-bold text-[#2BAE66]">12.0</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-2 px-3 text-sm">English</td>
                        <td className="py-2 px-3 text-center text-sm font-semibold">B+</td>
                        <td className="py-2 px-3 text-center text-sm">3</td>
                        <td className="py-2 px-3 text-center text-sm">3.3</td>
                        <td className="py-2 px-3 text-center text-sm font-bold text-[#2BAE66]">9.9</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-3 text-sm">Physics</td>
                        <td className="py-2 px-3 text-center text-sm font-semibold">A-</td>
                        <td className="py-2 px-3 text-center text-sm">4</td>
                        <td className="py-2 px-3 text-center text-sm">3.7</td>
                        <td className="py-2 px-3 text-center text-sm font-bold text-[#2BAE66]">14.8</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-2 px-3 text-sm">History</td>
                        <td className="py-2 px-3 text-center text-sm font-semibold">B</td>
                        <td className="py-2 px-3 text-center text-sm">3</td>
                        <td className="py-2 px-3 text-center text-sm">3.0</td>
                        <td className="py-2 px-3 text-center text-sm font-bold text-[#2BAE66]">9.0</td>
                      </tr>
                      <tr className="bg-[#1A3D7C]/10 font-bold">
                        <td className="py-2 px-3 text-sm">TOTAL</td>
                        <td className="py-2 px-3 text-center text-sm">-</td>
                        <td className="py-2 px-3 text-center text-sm">13</td>
                        <td className="py-2 px-3 text-center text-sm">-</td>
                        <td className="py-2 px-3 text-center text-sm text-[#2BAE66]">45.7</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <p className="font-mono text-lg">
                    GPA = 45.7 ÷ 13 = <strong className="text-[#2BAE66] text-2xl">3.52</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* GPA Grading Scales */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3 text-[#2BAE66]" />
              GPA Grading Scales
            </h2>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#1A3D7C] text-white">
                    <tr>
                      <th className="py-3 px-4 text-left">Letter Grade</th>
                      <th className="py-3 px-4 text-center">Standard 4.0</th>
                      <th className="py-3 px-4 text-center">Weighted 5.0</th>
                      <th className="py-3 px-4 text-center">Percentage</th>
                      <th className="py-3 px-4 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-semibold">A+ / A</td>
                      <td className="py-3 px-4 text-center font-bold text-[#2BAE66]">4.0</td>
                      <td className="py-3 px-4 text-center font-bold text-blue-600">5.0</td>
                      <td className="py-3 px-4 text-center">93-100%</td>
                      <td className="py-3 px-4">Excellent</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="py-3 px-4 font-semibold">A-</td>
                      <td className="py-3 px-4 text-center font-bold text-[#2BAE66]">3.7</td>
                      <td className="py-3 px-4 text-center font-bold text-blue-600">4.7</td>
                      <td className="py-3 px-4 text-center">90-92%</td>
                      <td className="py-3 px-4">Excellent</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-semibold">B+</td>
                      <td className="py-3 px-4 text-center font-bold text-[#2BAE66]">3.3</td>
                      <td className="py-3 px-4 text-center font-bold text-blue-600">4.3</td>
                      <td className="py-3 px-4 text-center">87-89%</td>
                      <td className="py-3 px-4">Very Good</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="py-3 px-4 font-semibold">B</td>
                      <td className="py-3 px-4 text-center font-bold text-[#2BAE66]">3.0</td>
                      <td className="py-3 px-4 text-center font-bold text-blue-600">4.0</td>
                      <td className="py-3 px-4 text-center">83-86%</td>
                      <td className="py-3 px-4">Good</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-semibold">B-</td>
                      <td className="py-3 px-4 text-center font-bold text-[#2BAE66]">2.7</td>
                      <td className="py-3 px-4 text-center font-bold text-blue-600">3.7</td>
                      <td className="py-3 px-4 text-center">80-82%</td>
                      <td className="py-3 px-4">Good</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="py-3 px-4 font-semibold">C+</td>
                      <td className="py-3 px-4 text-center font-bold text-[#2BAE66]">2.3</td>
                      <td className="py-3 px-4 text-center font-bold text-blue-600">3.3</td>
                      <td className="py-3 px-4 text-center">77-79%</td>
                      <td className="py-3 px-4">Average</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-semibold">C</td>
                      <td className="py-3 px-4 text-center font-bold text-[#2BAE66]">2.0</td>
                      <td className="py-3 px-4 text-center font-bold text-blue-600">3.0</td>
                      <td className="py-3 px-4 text-center">73-76%</td>
                      <td className="py-3 px-4">Average</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="py-3 px-4 font-semibold">C-</td>
                      <td className="py-3 px-4 text-center font-bold text-[#2BAE66]">1.7</td>
                      <td className="py-3 px-4 text-center font-bold text-blue-600">2.7</td>
                      <td className="py-3 px-4 text-center">70-72%</td>
                      <td className="py-3 px-4">Below Average</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-semibold">D+</td>
                      <td className="py-3 px-4 text-center font-bold text-orange-600">1.3</td>
                      <td className="py-3 px-4 text-center font-bold text-orange-600">2.3</td>
                      <td className="py-3 px-4 text-center">67-69%</td>
                      <td className="py-3 px-4">Poor</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="py-3 px-4 font-semibold">D</td>
                      <td className="py-3 px-4 text-center font-bold text-orange-600">1.0</td>
                      <td className="py-3 px-4 text-center font-bold text-orange-600">2.0</td>
                      <td className="py-3 px-4 text-center">63-66%</td>
                      <td className="py-3 px-4">Poor</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">F</td>
                      <td className="py-3 px-4 text-center font-bold text-red-600">0.0</td>
                      <td className="py-3 px-4 text-center font-bold text-red-600">0.0</td>
                      <td className="py-3 px-4 text-center">Below 60%</td>
                      <td className="py-3 px-4">Failing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Academic Standing */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Award className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Academic Standing & Honors
            </h2>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
                    <tr>
                      <th className="py-3 px-4 text-left">GPA Range</th>
                      <th className="py-3 px-4 text-left">Academic Standing</th>
                      <th className="py-3 px-4 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-bold text-[#2BAE66]">3.90 - 4.00</td>
                      <td className="py-3 px-4 font-semibold">Summa Cum Laude</td>
                      <td className="py-3 px-4">Highest Honors - Top 1-5% of graduating class</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="py-3 px-4 font-bold text-[#2BAE66]">3.70 - 3.89</td>
                      <td className="py-3 px-4 font-semibold">Magna Cum Laude</td>
                      <td className="py-3 px-4">High Honors - Top 5-10% of graduating class</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-bold text-[#2BAE66]">3.50 - 3.69</td>
                      <td className="py-3 px-4 font-semibold">Cum Laude</td>
                      <td className="py-3 px-4">Honors - Top 10-20% of graduating class</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="py-3 px-4 font-bold text-blue-600">3.00 - 3.49</td>
                      <td className="py-3 px-4 font-semibold">Dean's List</td>
                      <td className="py-3 px-4">Good academic standing, merit recognition</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-bold">2.50 - 2.99</td>
                      <td className="py-3 px-4 font-semibold">Good Standing</td>
                      <td className="py-3 px-4">Satisfactory academic progress</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="py-3 px-4 font-bold">2.00 - 2.49</td>
                      <td className="py-3 px-4 font-semibold">Satisfactory</td>
                      <td className="py-3 px-4">Meeting minimum requirements</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-bold text-orange-600">1.50 - 1.99</td>
                      <td className="py-3 px-4 font-semibold">Academic Warning</td>
                      <td className="py-3 px-4">Below satisfactory - improvement required</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-red-600">Below 1.50</td>
                      <td className="py-3 px-4 font-semibold">Academic Probation</td>
                      <td className="py-3 px-4">Risk of suspension - immediate action needed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Tips for Improving GPA */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Tips for Improving Your GPA
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1A3D7C] mb-2">Attend Every Class</h3>
                    <p className="text-gray-700">Regular attendance is strongly correlated with better grades. You'll catch important information and participate in discussions.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1A3D7C] mb-2">Start Assignments Early</h3>
                    <p className="text-gray-700">Starting early gives you time to ask questions, seek help, revise your work, and avoid stress-induced mistakes.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1A3D7C] mb-2">Use Office Hours</h3>
                    <p className="text-gray-700">Professors and TAs hold office hours specifically to help you. Use this free resource to clarify concepts and build relationships.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1A3D7C] mb-2">Form Study Groups</h3>
                    <p className="text-gray-700">Collaborative learning helps you understand material from different perspectives. Explain concepts to others and learn from their insights.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">5</div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1A3D7C] mb-2">Get Tutoring Help</h3>
                    <p className="text-gray-700">Most schools offer free tutoring services. Get help early before small problems become major issues affecting your grade.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">6</div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1A3D7C] mb-2">Balance Your Courses</h3>
                    <p className="text-gray-700">Don't overload with all difficult courses in one semester. Balance challenging classes with lighter ones for sustainable success.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <HelpCircle className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-[#1A3D7C] mb-2">What is considered a good GPA?</h3>
                <p className="text-gray-700">A "good" GPA depends on your goals. Generally: <strong>3.5-4.0</strong> is excellent and competitive for top graduate programs; <strong>3.0-3.49</strong> is good and meets most scholarship requirements; <strong>2.5-2.99</strong> is average; below <strong>2.0</strong> is typically below satisfactory. Remember that GPA is just one factor - internships, research, and extracurriculars also matter.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-[#1A3D7C] mb-2">What is the difference between weighted and unweighted GPA?</h3>
                <p className="text-gray-700"><strong>Unweighted GPA</strong> uses the standard 4.0 scale where all courses are treated equally regardless of difficulty. <strong>Weighted GPA</strong> gives extra points for advanced courses (AP, IB, Honors) - typically on a 5.0 scale. For example, an A in an AP course might be worth 5.0 instead of 4.0. Weighted GPAs are more common in high school; most colleges use unweighted 4.0 scales.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-[#1A3D7C] mb-2">How do I calculate cumulative GPA?</h3>
                <p className="text-gray-700">To calculate cumulative GPA: (1) Multiply your previous GPA by previous total credits to get previous quality points. (2) Add your new semester's quality points. (3) Divide total quality points by total credits. Formula: Cumulative GPA = (Previous GPA × Previous Credits + New Quality Points) ÷ Total Credits.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-[#1A3D7C] mb-2">Can I raise a low GPA?</h3>
                <p className="text-gray-700">Yes, but it becomes harder as you complete more credits. Early in your academic career (first 1-2 years), you can significantly improve your GPA with strong performance. The key is to start improving immediately and be realistic about what's achievable. Focus on consistent improvement rather than drastic overnight changes.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-[#1A3D7C] mb-2">Do Pass/Fail courses affect my GPA?</h3>
                <p className="text-gray-700">Pass/Fail (P/F) courses typically <strong>do not affect your GPA</strong> - they don't contribute quality points or count in total credits for GPA calculation. However, taking too many P/F courses can impact financial aid, academic progress, and how graduate schools view your transcript. Check your school's specific policy.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-[#1A3D7C] mb-2">What happens if I retake a course?</h3>
                <p className="text-gray-700">Retake policies vary by institution. Common approaches include: <strong>Replacement</strong> (new grade replaces old in GPA), <strong>Averaging</strong> (both grades count), or <strong>Forgiveness</strong> (higher grade used). Some schools limit how many courses you can retake or only allow retakes for grades below C. Always check your school's specific retake policy.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-[#1A3D7C] mb-2">Should I include GPA on my resume?</h3>
                <p className="text-gray-700">Include your GPA if: (1) It's 3.5 or higher (3.0+ for some fields); (2) You're a recent graduate or student; (3) The job posting requests it. Omit it if it's below 3.0, you've been out of school for years, or you have significant work experience. You can list just your major GPA if it's higher than cumulative.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-[#1A3D7C] mb-2">What GPA do I need for graduate school?</h3>
                <p className="text-gray-700">Graduate school requirements vary: <strong>3.0</strong> is typically the minimum for admission consideration; <strong>3.5+</strong> is competitive for most programs; <strong>3.7+</strong> is competitive for top-tier programs (Ivy League, Stanford, MIT). However, factors beyond GPA matter including test scores, research experience, recommendations, and personal statements.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Related Articles Section */}
      <section className="bg-white py-12 px-6 border-t border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-[#1A3D7C] mb-6 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-[#2BAE66]" />
            Related Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/blog/20-reasons-why-education-is-important" className="group">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-[#2BAE66] hover:shadow-lg transition-all">
                <h3 className="font-semibold text-[#1A3D7C] group-hover:text-[#2BAE66] mb-2 line-clamp-2">
                  20 Reasons Why Education Is Important
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  Discover why education matters for lifelong success and how GPA reflects academic achievement.
                </p>
              </div>
            </Link>
            <Link href="/blog/what-is-competency-based-education" className="group">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-[#2BAE66] hover:shadow-lg transition-all">
                <h3 className="font-semibold text-[#1A3D7C] group-hover:text-[#2BAE66] mb-2 line-clamp-2">
                  What Is Competency-Based Education?
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  Learn about mastery-based learning approaches beyond traditional GPA grading systems.
                </p>
              </div>
            </Link>
            <Link href="/blog/what-country-has-the-best-education" className="group">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-[#2BAE66] hover:shadow-lg transition-all">
                <h3 className="font-semibold text-[#1A3D7C] group-hover:text-[#2BAE66] mb-2 line-clamp-2">
                  What Country Has the Best Education?
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  Compare global education systems and understand how different countries evaluate student performance.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#1A3D7C] via-[#2BAE66] to-[#1A3D7C] text-white py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <BookOpen className="w-12 h-12 text-[#FFC857] mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help Improving Your GPA?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Our expert tutors can help you excel in challenging courses, develop better study habits, and achieve your academic goals. Get personalized one-on-one guidance tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-demo-class">
              <Button className="bg-[#FFC857] text-[#1A3D7C] px-8 py-6 text-lg font-semibold hover:bg-white hover:text-[#1A3D7C] transition-colors">
                Book Free Demo Class
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-2 border-white text-white px-8 py-6 text-lg font-semibold hover:bg-white hover:text-[#1A3D7C] transition-colors">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A3D7C] text-white py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
                <span className="text-xl font-bold">The TutorBridge</span>
              </div>
              <p className="text-gray-300 mb-4">
                Empowering students with personalized education and career guidance for a brighter future.
              </p>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/study-resources" className="hover:text-[#2BAE66] transition-colors">Study Resources</Link></li>
                <li><Link href="/calculators" className="hover:text-[#2BAE66] transition-colors">Calculators</Link></li>
                <li><Link href="/doubt-solving" className="hover:text-[#2BAE66] transition-colors">Doubt Solving</Link></li>
                <li><Link href="/career-guidance" className="hover:text-[#2BAE66] transition-colors">Career Guidance</Link></li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p>+91 9310096171</p>
                <p>info@thetutorbridge.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 The TutorBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
