'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Home, BookOpen, ArrowRight, GraduationCap, Award, TrendingUp, Plus, X, BookMarked } from 'lucide-react';
import Link from 'next/link';

interface Course {
  name: string;
  grade: string;
  credits: string;
}

const gradePoints: { [key: string]: number } = {
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

export default function CollegeGPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { name: 'Mathematics', grade: 'A', credits: '3' },
    { name: 'English', grade: 'B+', credits: '3' },
    { name: 'Physics', grade: 'A-', credits: '4' },
    { name: 'Chemistry', grade: 'B', credits: '4' },
  ]);

  const [previousGPA, setPreviousGPA] = useState<string>('');
  const [previousCredits, setPreviousCredits] = useState<string>('');
  const [showCumulativeInputs, setShowCumulativeInputs] = useState(false);

  const [result, setResult] = useState<{
    semesterGPA: number;
    totalCredits: number;
    qualityPoints: number;
    cumulativeGPA: number | null;
    totalCumulativeCredits: number | null;
    letterGrade: string;
    standing: string;
  } | null>(null);

  const addCourse = () => {
    setCourses([...courses, { name: '', grade: 'A', credits: '3' }]);
  };

  const removeCourse = (index: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((_, i) => i !== index));
    }
  };

  const updateCourse = (index: number, field: keyof Course, value: string) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
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

  const getAcademicStanding = (gpa: number): string => {
    if (gpa >= 3.9) return 'Summa Cum Laude (Highest Honors)';
    if (gpa >= 3.7) return 'Magna Cum Laude (High Honors)';
    if (gpa >= 3.5) return 'Cum Laude (Honors)';
    if (gpa >= 3.0) return "Dean's List";
    if (gpa >= 2.5) return 'Good Academic Standing';
    if (gpa >= 2.0) return 'Satisfactory';
    if (gpa >= 1.5) return 'Academic Warning';
    return 'Academic Probation';
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

    // Calculate semester GPA
    let totalQualityPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const credits = parseFloat(course.credits);
      const gradePoint = gradePoints[course.grade];
      totalQualityPoints += gradePoint * credits;
      totalCredits += credits;
    });

    const semesterGPA = totalQualityPoints / totalCredits;

    // Calculate cumulative GPA if previous data provided
    let cumulativeGPA: number | null = null;
    let totalCumulativeCredits: number | null = null;

    if (showCumulativeInputs && previousGPA && previousCredits) {
      const prevGPA = parseFloat(previousGPA);
      const prevCredits = parseFloat(previousCredits);

      if (isNaN(prevGPA) || prevGPA < 0 || prevGPA > 4.0) {
        alert('Please enter a valid previous GPA (0.0 - 4.0)');
        return;
      }

      if (isNaN(prevCredits) || prevCredits <= 0) {
        alert('Please enter valid previous credits');
        return;
      }

      const previousQualityPoints = prevGPA * prevCredits;
      const totalCumulativeQualityPoints = previousQualityPoints + totalQualityPoints;
      totalCumulativeCredits = prevCredits + totalCredits;
      cumulativeGPA = totalCumulativeQualityPoints / totalCumulativeCredits;
    }

    setResult({
      semesterGPA: parseFloat(semesterGPA.toFixed(3)),
      totalCredits,
      qualityPoints: parseFloat(totalQualityPoints.toFixed(2)),
      cumulativeGPA: cumulativeGPA ? parseFloat(cumulativeGPA.toFixed(3)) : null,
      totalCumulativeCredits,
      letterGrade: getLetterGrade(cumulativeGPA || semesterGPA),
      standing: getAcademicStanding(cumulativeGPA || semesterGPA),
    });
  };

  const handleReset = () => {
    setCourses([
      { name: 'Mathematics', grade: 'A', credits: '3' },
      { name: 'English', grade: 'B+', credits: '3' },
      { name: 'Physics', grade: 'A-', credits: '4' },
      { name: 'Chemistry', grade: 'B', credits: '4' },
    ]);
    setPreviousGPA('');
    setPreviousCredits('');
    setShowCumulativeInputs(false);
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
            <span className="text-gray-900 font-medium">College GPA Calculator</span>
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
              College GPA Calculator
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Calculate your semester and cumulative GPA with ease. Add your courses, grades, and credit hours to track your academic performance and plan your path to success.
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
                  Enter Your Courses
                </h2>

                <div className="space-y-4 max-h-96 overflow-y-auto pr-2 mb-6">
                  {courses.map((course, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-gray-900">Course {index + 1}</h3>
                        {courses.length > 1 && (
                          <button
                            onClick={() => removeCourse(index)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            aria-label="Remove course"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Course Name (Optional)
                          </label>
                          <Input
                            type="text"
                            placeholder="e.g., Mathematics"
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
                              placeholder="3"
                              value={course.credits}
                              onChange={(e) => updateCourse(index, 'credits', e.target.value)}
                              className="text-center font-medium"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={addCourse}
                  variant="outline"
                  className="w-full mb-6 border-2 border-dashed border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Course
                </Button>

                {/* Cumulative GPA Option */}
                <div className="border-t-2 border-gray-200 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-semibold text-gray-700">
                      Calculate Cumulative GPA?
                    </label>
                    <button
                      onClick={() => setShowCumulativeInputs(!showCumulativeInputs)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        showCumulativeInputs
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {showCumulativeInputs ? 'Yes' : 'No'}
                    </button>
                  </div>

                  {showCumulativeInputs && (
                    <div className="space-y-4 bg-indigo-50 p-4 rounded-lg border-2 border-indigo-200">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Previous Cumulative GPA
                        </label>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          max="4.0"
                          placeholder="3.50"
                          value={previousGPA}
                          onChange={(e) => setPreviousGPA(e.target.value)}
                          className="text-center font-medium"
                        />
                        <p className="text-xs text-gray-600 mt-1">Enter your GPA before this semester (0.0 - 4.0)</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Previous Total Credits
                        </label>
                        <Input
                          type="number"
                          step="1"
                          min="0"
                          placeholder="45"
                          value={previousCredits}
                          onChange={(e) => setPreviousCredits(e.target.value)}
                          className="text-center font-medium"
                        />
                        <p className="text-xs text-gray-600 mt-1">Total credits completed before this semester</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
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
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4">Your GPA Results</h3>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                        <p className="text-sm text-indigo-100 mb-2">Semester GPA</p>
                        <p className="text-4xl font-bold">{result.semesterGPA}</p>
                        <p className="text-sm text-indigo-100 mt-2">{result.totalCredits} credits</p>
                      </div>

                      {result.cumulativeGPA !== null && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                          <p className="text-sm text-indigo-100 mb-2">Cumulative GPA</p>
                          <p className="text-4xl font-bold">{result.cumulativeGPA}</p>
                          <p className="text-sm text-indigo-100 mt-2">{result.totalCumulativeCredits} total credits</p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-sm text-indigo-100">Letter Grade</p>
                        <p className="text-2xl font-bold">{result.letterGrade}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-sm text-indigo-100">Quality Points</p>
                        <p className="text-2xl font-bold">{result.qualityPoints}</p>
                      </div>
                    </div>
                  </div>

                  {/* Academic Standing */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-indigo-600" />
                      Academic Standing
                    </h3>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                      <p className="text-2xl font-bold text-green-700">{result.standing}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Based on {result.cumulativeGPA !== null ? 'cumulative' : 'semester'} GPA of {result.cumulativeGPA || result.semesterGPA}
                      </p>
                    </div>
                  </div>

                  {/* Calculation Breakdown */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-indigo-600" />
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
                            <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Quality Points</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courses.map((course, idx) => {
                            const credits = parseFloat(course.credits);
                            const gradePoint = gradePoints[course.grade];
                            const qualityPts = gradePoint * credits;

                            return (
                              <tr key={idx} className="border-b border-gray-100">
                                <td className="py-3 px-2 text-sm">{course.name || `Course ${idx + 1}`}</td>
                                <td className="py-3 px-2 text-sm text-center font-semibold">{course.grade}</td>
                                <td className="py-3 px-2 text-sm text-center">{credits}</td>
                                <td className="py-3 px-2 text-sm text-center">{gradePoint.toFixed(1)}</td>
                                <td className="py-3 px-2 text-sm text-center font-semibold text-indigo-600">
                                  {qualityPts.toFixed(2)}
                                </td>
                              </tr>
                            );
                          })}
                          <tr className="bg-indigo-50 font-bold">
                            <td className="py-3 px-2 text-sm">Total</td>
                            <td className="py-3 px-2 text-sm text-center">-</td>
                            <td className="py-3 px-2 text-sm text-center">{result.totalCredits}</td>
                            <td className="py-3 px-2 text-sm text-center">-</td>
                            <td className="py-3 px-2 text-sm text-center text-indigo-600">{result.qualityPoints}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200">
                      <h4 className="font-bold text-gray-900 mb-4">GPA Formula:</h4>
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-indigo-700">
                          <span>GPA = </span>
                          <span className="inline-flex flex-col items-center mx-2">
                            <span className="border-b-2 border-gray-900 pb-1 px-3">
                              Total Quality Points
                            </span>
                            <span className="mt-1">Total Credits</span>
                          </span>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <p className="font-semibold text-gray-800 mb-2">Semester GPA Calculation:</p>
                        <p className="text-sm font-mono text-gray-700">
                          GPA = {result.qualityPoints} ÷ {result.totalCredits} = <span className="font-bold text-indigo-600">{result.semesterGPA}</span>
                        </p>

                        {result.cumulativeGPA !== null && (
                          <>
                            <p className="font-semibold text-gray-800 mb-2 mt-4">Cumulative GPA Calculation:</p>
                            <p className="text-sm text-gray-700">
                              Previous Quality Points: {previousGPA} × {previousCredits} = {(parseFloat(previousGPA) * parseFloat(previousCredits)).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-700">
                              Current Quality Points: {result.qualityPoints}
                            </p>
                            <p className="text-sm text-gray-700">
                              Total Quality Points: {((parseFloat(previousGPA) * parseFloat(previousCredits)) + result.qualityPoints).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-700">
                              Total Credits: {result.totalCumulativeCredits}
                            </p>
                            <p className="text-sm font-mono text-gray-700 mt-2">
                              Cumulative GPA = {((parseFloat(previousGPA) * parseFloat(previousCredits)) + result.qualityPoints).toFixed(2)} ÷ {result.totalCumulativeCredits} = <span className="font-bold text-indigo-600">{result.cumulativeGPA}</span>
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* GPA Scale Reference */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">GPA Scale Reference</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(gradePoints).map(([grade, points]) => (
                        <div key={grade} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                          <span className="font-semibold text-gray-900">{grade}</span>
                          <span className="text-indigo-600 font-bold">{points.toFixed(1)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Enter your courses, grades, and credits, then click Calculate to see your GPA
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

            {/* Understanding GPA */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-indigo-600" />
                Understanding College GPA
              </h2>

              <div className="prose max-w-none">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border-2 border-indigo-200">
                  <h3 className="text-2xl font-bold text-indigo-800 mb-4">What is GPA?</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <strong>GPA (Grade Point Average)</strong> is a standardized way of measuring academic achievement in U.S. colleges and universities. It converts letter grades into a numerical scale (typically 0.0 to 4.0) and calculates a weighted average based on credit hours. GPA provides a single number that represents your overall academic performance, making it easy to compare students and track progress over time.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-200">
                  <h3 className="text-2xl font-bold text-purple-800 mb-4">Types of GPA</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h4 className="font-bold text-purple-700 mb-2">Semester GPA</h4>
                      <p className="text-gray-700">
                        Your GPA for a single semester or term. It includes only the courses taken during that specific period and reflects your performance for those few months.
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h4 className="font-bold text-purple-700 mb-2">Cumulative GPA</h4>
                      <p className="text-gray-700">
                        Your overall GPA across all semesters from the beginning of your college career. This is the most important GPA for scholarships, graduate school, and employment.
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h4 className="font-bold text-purple-700 mb-2">Major GPA</h4>
                      <p className="text-gray-700">
                        Your GPA calculated using only courses within your major field of study. Some programs require a minimum major GPA for graduation or continuation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-blue-800 mb-4">Why GPA Matters</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold text-xl">•</span>
                      <div>
                        <strong>Academic Standing:</strong> Determines if you're in good standing, on probation, or eligible for honors
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold text-xl">•</span>
                      <div>
                        <strong>Scholarships:</strong> Many scholarships require maintaining a minimum GPA (typically 3.0-3.5)
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold text-xl">•</span>
                      <div>
                        <strong>Graduate School:</strong> Competitive programs often require GPAs of 3.5+ for admission
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold text-xl">•</span>
                      <div>
                        <strong>Employment:</strong> Some employers set GPA minimums (3.0+) for job applications, especially for entry-level positions
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold text-xl">•</span>
                      <div>
                        <strong>Honors & Recognition:</strong> Latin honors (cum laude, magna cum laude, summa cum laude) are based on GPA
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How to Calculate GPA */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                How to Calculate Your GPA: Step-by-Step
              </h2>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                <ol className="space-y-6">
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      1
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Convert Letter Grades to Grade Points</h3>
                      <p className="text-gray-700 mb-3">
                        Each letter grade corresponds to a numerical value on the 4.0 scale. Use the standard conversion table provided by your institution.
                      </p>
                      <div className="bg-white rounded-lg p-3 border border-blue-200">
                        <p className="text-sm font-mono text-gray-700">
                          A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, etc.
                        </p>
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      2
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Multiply Grade Points by Credit Hours</h3>
                      <p className="text-gray-700 mb-3">
                        For each course, multiply the grade point value by the number of credit hours. This gives you the quality points for that course.
                      </p>
                      <div className="bg-white rounded-lg p-3 border border-blue-200">
                        <p className="text-sm font-mono text-gray-700">
                          Quality Points = Grade Points × Credit Hours
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          Example: A (4.0) in a 3-credit course = 4.0 × 3 = 12 quality points
                        </p>
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      3
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Sum All Quality Points</h3>
                      <p className="text-gray-700 mb-3">
                        Add up the quality points from all your courses to get the total quality points earned.
                      </p>
                      <div className="bg-white rounded-lg p-3 border border-blue-200">
                        <p className="text-sm text-gray-700">
                          If you have 4 courses with quality points of 12, 9.9, 13.2, and 12, your total is 47.1
                        </p>
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      4
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Sum All Credit Hours</h3>
                      <p className="text-gray-700 mb-3">
                        Add up the credit hours from all your courses to get the total credits attempted.
                      </p>
                      <div className="bg-white rounded-lg p-3 border border-blue-200">
                        <p className="text-sm text-gray-700">
                          Courses with 3, 3, 4, and 4 credits = 14 total credits
                        </p>
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      5
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Divide to Get Your GPA</h3>
                      <p className="text-gray-700 mb-3">
                        Divide total quality points by total credits to calculate your GPA.
                      </p>
                      <div className="bg-white rounded-lg p-3 border border-blue-200">
                        <p className="text-sm font-mono text-gray-700">
                          GPA = 47.1 ÷ 14 = <span className="font-bold text-indigo-600">3.36</span>
                        </p>
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* Detailed Examples */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Detailed GPA Calculation Examples
              </h2>

              {/* Example 1: Semester GPA */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8 border-2 border-green-200">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Example 1: Calculating Semester GPA</h3>
                <p className="text-gray-700 mb-4">
                  Sarah is a freshman taking 4 courses this semester. Let's calculate her GPA:
                </p>

                <div className="overflow-x-auto mb-4">
                  <table className="w-full bg-white rounded-lg border border-green-200">
                    <thead className="bg-green-100">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Course</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Grade</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Credits</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Grade Points</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Quality Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-green-100">
                        <td className="py-3 px-4">Mathematics 101</td>
                        <td className="text-center py-3 px-4 font-semibold">A</td>
                        <td className="text-center py-3 px-4">3</td>
                        <td className="text-center py-3 px-4">4.0</td>
                        <td className="text-center py-3 px-4 text-green-700 font-bold">12.0</td>
                      </tr>
                      <tr className="border-b border-green-100">
                        <td className="py-3 px-4">English Composition</td>
                        <td className="text-center py-3 px-4 font-semibold">B+</td>
                        <td className="text-center py-3 px-4">3</td>
                        <td className="text-center py-3 px-4">3.3</td>
                        <td className="text-center py-3 px-4 text-green-700 font-bold">9.9</td>
                      </tr>
                      <tr className="border-b border-green-100">
                        <td className="py-3 px-4">General Physics</td>
                        <td className="text-center py-3 px-4 font-semibold">A-</td>
                        <td className="text-center py-3 px-4">4</td>
                        <td className="text-center py-3 px-4">3.7</td>
                        <td className="text-center py-3 px-4 text-green-700 font-bold">14.8</td>
                      </tr>
                      <tr className="border-b border-green-100">
                        <td className="py-3 px-4">Introduction to Psychology</td>
                        <td className="text-center py-3 px-4 font-semibold">B</td>
                        <td className="text-center py-3 px-4">3</td>
                        <td className="text-center py-3 px-4">3.0</td>
                        <td className="text-center py-3 px-4 text-green-700 font-bold">9.0</td>
                      </tr>
                      <tr className="bg-green-50 font-bold">
                        <td className="py-3 px-4">TOTAL</td>
                        <td className="text-center py-3 px-4">-</td>
                        <td className="text-center py-3 px-4">13</td>
                        <td className="text-center py-3 px-4">-</td>
                        <td className="text-center py-3 px-4 text-green-700">45.7</td>
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
                        <span className="border-b-2 border-gray-900 pb-1 px-3">45.7</span>
                        <span className="mt-1">13</span>
                      </span>
                      <span> = <span className="text-2xl text-green-800">3.52</span></span>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-3">
                    <strong>Result:</strong> Sarah's semester GPA is <strong className="text-green-700">3.52</strong>, which qualifies her for the Dean's List and Cum Laude honors at most universities.
                  </p>
                </div>
              </div>

              {/* Example 2: Cumulative GPA */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">Example 2: Calculating Cumulative GPA</h3>
                <p className="text-gray-700 mb-4">
                  Marcus is a sophomore. He wants to calculate his cumulative GPA after completing his 3rd semester.
                </p>

                <div className="bg-white rounded-lg p-4 mb-4 border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-3">Previous Academic Record:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex justify-between">
                      <span>Semester 1 GPA:</span>
                      <span className="font-semibold">3.40</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Semester 2 GPA:</span>
                      <span className="font-semibold">3.30</span>
                    </li>
                    <li className="flex justify-between border-t pt-2">
                      <span>Total Credits Earned:</span>
                      <span className="font-semibold">30 credits</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Previous Cumulative GPA:</span>
                      <span className="font-semibold text-blue-700">3.35</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 mb-4 border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-3">Semester 3 Courses:</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-blue-50">
                        <tr>
                          <th className="text-left py-2 px-3 text-sm font-semibold">Course</th>
                          <th className="text-center py-2 px-3 text-sm font-semibold">Grade</th>
                          <th className="text-center py-2 px-3 text-sm font-semibold">Credits</th>
                          <th className="text-center py-2 px-3 text-sm font-semibold">Quality Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-3 text-sm">Data Structures</td>
                          <td className="text-center py-2 px-3 text-sm font-semibold">A</td>
                          <td className="text-center py-2 px-3 text-sm">4</td>
                          <td className="text-center py-2 px-3 text-sm text-blue-700 font-bold">16.0</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-3 text-sm">Calculus II</td>
                          <td className="text-center py-2 px-3 text-sm font-semibold">B+</td>
                          <td className="text-center py-2 px-3 text-sm">3</td>
                          <td className="text-center py-2 px-3 text-sm text-blue-700 font-bold">9.9</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-3 text-sm">World History</td>
                          <td className="text-center py-2 px-3 text-sm font-semibold">A-</td>
                          <td className="text-center py-2 px-3 text-sm">3</td>
                          <td className="text-center py-2 px-3 text-sm text-blue-700 font-bold">11.1</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-3 text-sm">Public Speaking</td>
                          <td className="text-center py-2 px-3 text-sm font-semibold">A</td>
                          <td className="text-center py-2 px-3 text-sm">3</td>
                          <td className="text-center py-2 px-3 text-sm text-blue-700 font-bold">12.0</td>
                        </tr>
                        <tr className="bg-blue-50 font-bold">
                          <td className="py-2 px-3 text-sm">Total</td>
                          <td className="text-center py-2 px-3 text-sm">-</td>
                          <td className="text-center py-2 px-3 text-sm">13</td>
                          <td className="text-center py-2 px-3 text-sm text-blue-700">49.0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="font-semibold text-gray-900 mb-3">Step-by-Step Calculation:</p>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Step 1:</strong> Calculate previous quality points</p>
                    <p className="ml-4 font-mono text-sm">3.35 × 30 = 100.5 quality points</p>

                    <p className="mt-3"><strong>Step 2:</strong> Add current semester quality points</p>
                    <p className="ml-4 font-mono text-sm">100.5 + 49.0 = 149.5 total quality points</p>

                    <p className="mt-3"><strong>Step 3:</strong> Add total credits</p>
                    <p className="ml-4 font-mono text-sm">30 + 13 = 43 total credits</p>

                    <p className="mt-3"><strong>Step 4:</strong> Calculate new cumulative GPA</p>
                    <div className="ml-4 text-center my-3">
                      <div className="text-lg font-bold text-blue-700">
                        <span>Cumulative GPA = </span>
                        <span className="inline-flex flex-col items-center mx-2">
                          <span className="border-b-2 border-gray-900 pb-1 px-3">149.5</span>
                          <span className="mt-1">43</span>
                        </span>
                        <span> = <span className="text-xl text-blue-800">3.48</span></span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-4 bg-blue-50 p-3 rounded-lg">
                    <strong>Result:</strong> Marcus improved his cumulative GPA from <strong>3.35</strong> to <strong className="text-blue-700">3.48</strong> - a significant improvement that strengthens his graduate school applications!
                  </p>
                </div>
              </div>

              {/* Example 3: GPA Improvement Planning */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-purple-800 mb-4">Example 3: Planning to Improve GPA</h3>
                <p className="text-gray-700 mb-4">
                  Emma has a 2.85 cumulative GPA with 60 credits completed. She needs a 3.0 GPA to keep her scholarship. Let's see what GPA she needs this semester to reach her goal.
                </p>

                <div className="bg-white rounded-lg p-4 mb-4 border border-purple-200">
                  <h4 className="font-bold text-gray-900 mb-3">Current Status:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>Current Cumulative GPA: <strong>2.85</strong></li>
                    <li>Credits Completed: <strong>60</strong></li>
                    <li>Current Quality Points: 2.85 × 60 = <strong>171</strong></li>
                    <li>Credits This Semester: <strong>15</strong></li>
                    <li>Target Cumulative GPA: <strong>3.0</strong></li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <p className="font-semibold text-gray-900 mb-3">Calculation:</p>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Step 1:</strong> Calculate required total quality points for 3.0 GPA</p>
                    <p className="ml-4 font-mono text-sm">3.0 × (60 + 15) = 3.0 × 75 = 225 quality points needed</p>

                    <p className="mt-3"><strong>Step 2:</strong> Calculate quality points needed this semester</p>
                    <p className="ml-4 font-mono text-sm">225 - 171 = 54 quality points needed</p>

                    <p className="mt-3"><strong>Step 3:</strong> Calculate required semester GPA</p>
                    <p className="ml-4 font-mono text-sm">54 ÷ 15 = 3.6 semester GPA required</p>
                  </div>
                  <div className="mt-4 bg-purple-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Result:</strong> Emma needs a <strong className="text-purple-700">3.6 GPA</strong> this semester (mostly A's and B's) to raise her cumulative GPA to 3.0 and keep her scholarship. This is challenging but achievable with focused effort!
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* GPA Conversion Tables */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                GPA Grading Scales & Conversions
              </h2>

              {/* Standard 4.0 Scale */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 mb-6 border-2 border-indigo-200">
                <h3 className="text-2xl font-bold text-indigo-800 mb-4">Standard 4.0 Scale (Most Common)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white rounded-lg border border-indigo-200">
                    <thead className="bg-indigo-100">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Letter Grade</th>
                        <th className="text-center py-3 px-4 font-semibold">Grade Points</th>
                        <th className="text-center py-3 px-4 font-semibold">Percentage Range</th>
                        <th className="text-left py-3 px-4 font-semibold">Quality</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">A+ / A</td>
                        <td className="text-center py-3 px-4 text-indigo-700 font-bold">4.0</td>
                        <td className="text-center py-3 px-4">93-100%</td>
                        <td className="py-3 px-4">Excellent / Outstanding</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 px-4 font-semibold">A-</td>
                        <td className="text-center py-3 px-4 text-indigo-700 font-bold">3.7</td>
                        <td className="text-center py-3 px-4">90-92%</td>
                        <td className="py-3 px-4">Excellent</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">B+</td>
                        <td className="text-center py-3 px-4 text-indigo-700 font-bold">3.3</td>
                        <td className="text-center py-3 px-4">87-89%</td>
                        <td className="py-3 px-4">Very Good</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 px-4 font-semibold">B</td>
                        <td className="text-center py-3 px-4 text-indigo-700 font-bold">3.0</td>
                        <td className="text-center py-3 px-4">83-86%</td>
                        <td className="py-3 px-4">Good</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">B-</td>
                        <td className="text-center py-3 px-4 text-indigo-700 font-bold">2.7</td>
                        <td className="text-center py-3 px-4">80-82%</td>
                        <td className="py-3 px-4">Good</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 px-4 font-semibold">C+</td>
                        <td className="text-center py-3 px-4 text-indigo-700 font-bold">2.3</td>
                        <td className="text-center py-3 px-4">77-79%</td>
                        <td className="py-3 px-4">Average</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">C</td>
                        <td className="text-center py-3 px-4 text-indigo-700 font-bold">2.0</td>
                        <td className="text-center py-3 px-4">73-76%</td>
                        <td className="py-3 px-4">Average</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 px-4 font-semibold">C-</td>
                        <td className="text-center py-3 px-4 text-indigo-700 font-bold">1.7</td>
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
                        <td className="text-center py-3 px-4">63-66%</td>
                        <td className="py-3 px-4">Poor</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">D-</td>
                        <td className="text-center py-3 px-4 text-orange-600 font-bold">0.7</td>
                        <td className="text-center py-3 px-4">60-62%</td>
                        <td className="py-3 px-4">Poor</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold">F</td>
                        <td className="text-center py-3 px-4 text-red-600 font-bold">0.0</td>
                        <td className="text-center py-3 px-4">Below 60%</td>
                        <td className="py-3 px-4">Failing</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Academic Standing Table */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Academic Standing & Honors</h3>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white rounded-lg border border-green-200">
                    <thead className="bg-green-100">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">GPA Range</th>
                        <th className="text-left py-3 px-4 font-semibold">Academic Standing</th>
                        <th className="text-left py-3 px-4 font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-bold text-green-700">3.90 - 4.00</td>
                        <td className="py-3 px-4 font-semibold">Summa Cum Laude</td>
                        <td className="py-3 px-4">Highest Honors - Top 1-5% of class</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 px-4 font-bold text-green-600">3.70 - 3.89</td>
                        <td className="py-3 px-4 font-semibold">Magna Cum Laude</td>
                        <td className="py-3 px-4">High Honors - Top 5-10% of class</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-bold text-green-600">3.50 - 3.69</td>
                        <td className="py-3 px-4 font-semibold">Cum Laude</td>
                        <td className="py-3 px-4">Honors - Top 10-20% of class</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 px-4 font-bold text-blue-600">3.00 - 3.49</td>
                        <td className="py-3 px-4 font-semibold">Dean's List</td>
                        <td className="py-3 px-4">Good Academic Standing - Merit recognition</td>
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
            </section>

            {/* Tips for Improving GPA */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Tips for Improving Your GPA
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-800 mb-2">Attend Every Class</h3>
                      <p className="text-gray-700">
                        Regular attendance is strongly correlated with higher grades. You'll catch important information, participate in discussions, and show professors you're engaged.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-800 mb-2">Start Assignments Early</h3>
                      <p className="text-gray-700">
                        Don't wait until the last minute. Starting early gives you time to ask questions, get help, revise your work, and avoid stress-induced mistakes.
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
                      <h3 className="text-xl font-bold text-green-800 mb-2">Use Office Hours</h3>
                      <p className="text-gray-700">
                        Professors and TAs hold office hours specifically to help you. Use this free resource to clarify concepts, review assignments, and build relationships.
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
                      <h3 className="text-xl font-bold text-orange-800 mb-2">Form Study Groups</h3>
                      <p className="text-gray-700">
                        Collaborative learning helps you understand material from different perspectives. Explain concepts to others and learn from their insights.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-cyan-800 mb-2">Manage Your Time</h3>
                      <p className="text-gray-700">
                        Use a planner or digital calendar to track assignments, exams, and study time. Break large tasks into smaller, manageable chunks.
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
                      <h3 className="text-xl font-bold text-indigo-800 mb-2">Take Advantage of Tutoring</h3>
                      <p className="text-gray-700">
                        Most colleges offer free tutoring services. Get help before you fall behind - early intervention prevents small problems from becoming major issues.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border-2 border-pink-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                      7
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-pink-800 mb-2">Choose Courses Strategically</h3>
                      <p className="text-gray-700">
                        Balance difficult courses with easier ones. Don't overload yourself with all hard classes in one semester - pace yourself for sustainable success.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6 border-2 border-teal-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                      8
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-teal-800 mb-2">Stay Healthy</h3>
                      <p className="text-gray-700">
                        Get enough sleep, eat well, and exercise regularly. Physical and mental health directly impact your ability to learn and perform academically.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Common Mistakes */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Common GPA Calculation Mistakes to Avoid
              </h2>

              <div className="space-y-4">
                <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-red-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    Not Accounting for Credit Hours
                  </h3>
                  <p className="text-gray-700">
                    <strong>Mistake:</strong> Simply averaging all grades equally without considering credit hours.
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Correct:</strong> A 4-credit A (16 quality points) contributes more to your GPA than a 1-credit A (4 quality points).
                  </p>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
                  <h3 className="text-xl font-bold text-orange-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    Using the Wrong Grade Scale
                  </h3>
                  <p className="text-gray-700">
                    <strong>Mistake:</strong> Using incorrect grade point values (e.g., thinking A- = 3.5 instead of 3.7).
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Correct:</strong> Always verify your institution's specific grading scale as they can vary.
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-500">
                  <h3 className="text-xl font-bold text-yellow-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    Forgetting Pass/Fail Courses
                  </h3>
                  <p className="text-gray-700">
                    <strong>Mistake:</strong> Including P/F courses in GPA calculations when they shouldn't be counted.
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Correct:</strong> Pass/Fail courses typically don't affect GPA - they don't contribute quality points or count in total credits for GPA.
                  </p>
                </div>

                <div className="bg-amber-50 rounded-xl p-6 border-l-4 border-amber-500">
                  <h3 className="text-xl font-bold text-amber-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    Including Non-Credit Courses
                  </h3>
                  <p className="text-gray-700">
                    <strong>Mistake:</strong> Adding 0-credit courses or audit courses to GPA calculations.
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Correct:</strong> Only courses with assigned credit hours that receive letter grades count toward GPA.
                  </p>
                </div>

                <div className="bg-rose-50 rounded-xl p-6 border-l-4 border-rose-500">
                  <h3 className="text-xl font-bold text-rose-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    Rounding Too Early
                  </h3>
                  <p className="text-gray-700">
                    <strong>Mistake:</strong> Rounding quality points or intermediate calculations before final GPA.
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Correct:</strong> Keep full precision (2-3 decimal places) throughout calculations and only round the final GPA.
                  </p>
                </div>

                <div className="bg-pink-50 rounded-xl p-6 border-l-4 border-pink-500">
                  <h3 className="text-xl font-bold text-pink-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    Confusing Semester and Cumulative GPA
                  </h3>
                  <p className="text-gray-700">
                    <strong>Mistake:</strong> Reporting semester GPA when cumulative GPA is requested (or vice versa).
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Correct:</strong> Understand the difference - semester GPA is one term only; cumulative is your entire college career.
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
                <div className="bg-white rounded-xl p-6 border-2 border-indigo-200 hover:border-indigo-400 transition-colors">
                  <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    What is a good college GPA?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    A "good" GPA depends on your goals. Generally: <strong>3.5-4.0</strong> is excellent and competitive for top graduate programs and employers; <strong>3.0-3.49</strong> is good and meets most scholarship and program requirements; <strong>2.5-2.99</strong> is average; and <strong>below 2.0</strong> is typically considered below satisfactory. However, remember that GPA is just one factor - internships, research, and extracurriculars also matter significantly.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-colors">
                  <h3 className="text-xl font-bold text-purple-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    How is GPA different from percentage?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    GPA is a weighted average on a 4.0 scale that accounts for credit hours, while percentage is a simple average of numerical scores. GPA gives more weight to courses with more credits, providing a more accurate picture of overall performance. For example, getting 90% in a 1-credit course and 80% in a 4-credit course would average to 85%, but your GPA would be closer to the 80% course since it represents more work.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-colors">
                  <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    Can I raise a low GPA?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Yes, but it becomes harder as you complete more credits. Early in your college career (first 1-2 years), you can significantly improve your GPA with strong performance. However, if you have 90 credits with a 2.5 GPA, even getting a 4.0 in your remaining 30 credits would only raise your cumulative GPA to about 2.875. The key is to start improving immediately and be realistic about what's achievable. Focus on consistent improvement rather than drastic overnight changes.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-green-200 hover:border-green-400 transition-colors">
                  <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    Do all colleges use the 4.0 scale?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Most U.S. colleges use the 4.0 scale, but there are variations. Some schools use different scales like 5.0 (for weighted GPAs that include honors/AP courses), 4.3 (where A+ = 4.3), or even 12.0 or 100-point scales. Some international institutions use completely different systems. Always check your specific institution's grading policy and use their official scale for calculations.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-yellow-200 hover:border-yellow-400 transition-colors">
                  <h3 className="text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    What happens if I retake a course?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Retake policies vary by institution. Common approaches include: <strong>Replacement:</strong> The new grade completely replaces the old one in GPA calculations (though the original may still appear on your transcript); <strong>Averaging:</strong> Both grades are included in your GPA; <strong>Forgiveness:</strong> The higher grade is used but both appear on transcript. Some schools limit how many courses you can retake or only allow retakes for grades below C. Always check your school's specific retake policy.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-red-200 hover:border-red-400 transition-colors">
                  <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    How does withdrawing from a course affect my GPA?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    A withdrawal (W grade) typically <strong>does not affect your GPA</strong> - it doesn't count as credits attempted or contribute quality points. However, excessive withdrawals can impact financial aid, academic progress, and how graduate schools or employers view your transcript. Some schools distinguish between early withdrawal (no notation) and late withdrawal (W appears on transcript). Check withdrawal deadlines and policies carefully before dropping a course.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-orange-200 hover:border-orange-400 transition-colors">
                  <h3 className="text-xl font-bold text-orange-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    What GPA do I need for graduate school?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Graduate school GPA requirements vary widely by program and competitiveness. General guidelines: <strong>3.0</strong> is typically the minimum for admission consideration; <strong>3.5+</strong> is competitive for most programs; <strong>3.7+</strong> is competitive for top-tier programs (Ivy League, Stanford, MIT, etc.). However, many factors matter beyond GPA including GRE/GMAT scores, research experience, letters of recommendation, personal statements, and relevant work experience. Some programs also weigh your major GPA more heavily than overall GPA.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-teal-200 hover:border-teal-400 transition-colors">
                  <h3 className="text-xl font-bold text-teal-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    How do transfer credits affect my GPA?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Transfer credit policies vary by institution. Most commonly, <strong>transfer credits count toward degree requirements but not GPA</strong> - meaning you get the credits but grades from your previous school don't affect your GPA at the new institution. Your new school calculates GPA based only on courses taken there. However, for graduate school or scholarship applications, you may need to report all GPAs (both schools separately, or a combined GPA).
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-pink-200 hover:border-pink-400 transition-colors">
                  <h3 className="text-xl font-bold text-pink-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    Should I include my GPA on my resume?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Include your GPA on your resume if: <strong>(1)</strong> It's <strong>3.5 or higher</strong> (3.0+ for some fields); <strong>(2)</strong> You're a recent graduate or current student with limited work experience; <strong>(3)</strong> The job posting specifically requests it. You can omit it if it's below 3.0, you've been out of school for several years, or you have significant relevant work experience. You can also list just your major GPA if it's higher than your cumulative GPA.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-indigo-200 hover:border-indigo-400 transition-colors">
                  <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    What is a weighted vs. unweighted GPA?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Unweighted GPA</strong> uses the standard 4.0 scale where all courses are treated equally regardless of difficulty. <strong>Weighted GPA</strong> gives extra points for advanced courses (AP, IB, Honors) - typically on a 5.0 or higher scale. For example, an A in an AP course might be worth 5.0 instead of 4.0. Weighted GPAs are more common in high school; most colleges use unweighted 4.0 scales. This allows college admissions to evaluate all applicants using the same standard.
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Tracking Your Academic Success Today</h2>
                <p className="text-lg text-indigo-100 mb-6 leading-relaxed">
                  Your GPA is an important metric for measuring academic achievement, but it's just one part of your college experience. Use this calculator regularly to track your progress, set realistic goals, and make informed decisions about your coursework. Remember that consistent effort, good study habits, and seeking help when needed are the real keys to academic success.
                </p>
                <p className="text-lg text-indigo-100 leading-relaxed">
                  Whether you're calculating your semester GPA, planning your cumulative GPA improvement, or just exploring different scenarios, our College GPA Calculator provides accurate results with detailed breakdowns to help you understand exactly how your GPA is calculated. Stay motivated, work hard, and watch your academic achievements grow!
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
              Need Help Improving Your GPA?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you excel in challenging courses, develop better study habits, and achieve your academic goals. Get personalized one-on-one guidance tailored to your needs.
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
