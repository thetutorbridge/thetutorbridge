'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Plus, Trash2, GraduationCap, TrendingUp, Award, BookOpen, FileText, Home, Info, School, Star, Target } from 'lucide-react';
import Link from 'next/link';

interface Course {
  id: string;
  name: string;
  grade: string;
}

export default function MiddleSchoolGPACalculatorPage() {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Math', grade: '' },
    { id: '2', name: 'English', grade: '' },
    { id: '3', name: 'Science', grade: '' },
    { id: '4', name: 'Social Studies', grade: '' },
  ]);

  const [calculationResult, setCalculationResult] = useState<{
    gpa: number;
    letterGrade: string;
    totalCourses: number;
    breakdown: { grade: string; count: number; points: number }[];
  } | null>(null);

  // Middle school GPA typically uses 4.0 scale without weighted courses
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

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: '',
      grade: '',
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const getLetterGradeFromGPA = (gpa: number): string => {
    if (gpa >= 3.85) return 'A+';
    if (gpa >= 3.5) return 'A';
    if (gpa >= 3.15) return 'A-';
    if (gpa >= 2.85) return 'B+';
    if (gpa >= 2.5) return 'B';
    if (gpa >= 2.15) return 'B-';
    if (gpa >= 1.85) return 'C+';
    if (gpa >= 1.5) return 'C';
    if (gpa >= 1.15) return 'C-';
    if (gpa >= 0.85) return 'D+';
    if (gpa >= 0.5) return 'D';
    if (gpa >= 0.35) return 'D-';
    return 'F';
  };

  const getGradeColor = (grade: string): string => {
    if (grade.startsWith('A')) return 'text-green-700 bg-green-100';
    if (grade.startsWith('B')) return 'text-blue-700 bg-blue-100';
    if (grade.startsWith('C')) return 'text-yellow-700 bg-yellow-100';
    if (grade.startsWith('D')) return 'text-orange-700 bg-orange-100';
    return 'text-red-700 bg-red-100';
  };

  const calculateGPA = () => {
    const validCourses = courses.filter(course => course.grade && gradePoints[course.grade] !== undefined);

    if (validCourses.length === 0) {
      alert('Please enter at least one course with a grade.');
      return;
    }

    let totalPoints = 0;
    const gradeCount: { [key: string]: number } = {};

    validCourses.forEach(course => {
      const points = gradePoints[course.grade];
      totalPoints += points;
      gradeCount[course.grade] = (gradeCount[course.grade] || 0) + 1;
    });

    const gpa = totalPoints / validCourses.length;
    const letterGrade = getLetterGradeFromGPA(gpa);

    const breakdown = Object.entries(gradeCount).map(([grade, count]) => ({
      grade,
      count,
      points: gradePoints[grade],
    })).sort((a, b) => b.points - a.points);

    setCalculationResult({
      gpa,
      letterGrade,
      totalCourses: validCourses.length,
      breakdown,
    });
  };

  const resetCalculator = () => {
    setCourses([
      { id: '1', name: 'Math', grade: '' },
      { id: '2', name: 'English', grade: '' },
      { id: '3', name: 'Science', grade: '' },
      { id: '4', name: 'Social Studies', grade: '' },
    ]);
    setCalculationResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Q: Does middle school GPA affect college admissions?","acceptedAnswer":{"@type":"Answer","text":"A: No, colleges do not see or consider middle school GPA in admissions decisions. However, middle school performance is important because it: (1) builds foundational academic skills, (2) may determine high school course placement (honors vs. regular), and (3) develops study habits that affect high school GPA, which colleges do review."}},{"@type":"Question","name":"Q: How is middle school GPA different from high school GPA?","acceptedAnswer":{"@type":"Answer","text":"A: The main differences are: (1) Weighting - Middle school uses unweighted 4.0 scale only, while high school may use weighted scales for AP/Honors courses. (2) Stakes - High school GPA impacts college admissions, while middle school GPA primarily affects high school placement. (3) Calculation - Both use similar formulas, but high school often includes more complex credit-based calculations."}},{"@type":"Question","name":"Q: Do all courses count equally in middle school GPA?","acceptedAnswer":{"@type":"Answer","text":"A: Yes, in most middle schools, all courses count equally regardless of subject. A grade in PE counts the same as Math or English. Some schools may have exceptions for pass/fail courses or certain electives - check with your school counselor to understand your specific school&apos;s policy."}},{"@type":"Question","name":"Q: What&apos;s a good middle school GPA for honors classes in high school?","acceptedAnswer":{"@type":"Answer","text":"A: Requirements vary by school, but generally: 3.5+ GPA qualifies for most honors programs, 3.0-3.49 may qualify with teacher recommendation, and Below 3.0 typically requires significant improvement or exceptional performance in specific subjects. Some schools also consider standardized test scores and teacher recommendations."}},{"@type":"Question","name":"Q: Can I improve my GPA if I had a bad first semester?","acceptedAnswer":{"@type":"Answer","text":"A: Absolutely! Since GPA is cumulative, strong performance in later semesters will pull your overall GPA up. For example, if you had a 2.5 GPA first semester but earn a 3.5 second semester, your year-end GPA would be 3.0. The more semesters of improvement you have, the more your GPA will rise. It&apos;s never too late to turn things around!"}},{"@type":"Question","name":"Q: Should I calculate GPA by semester or by year?","acceptedAnswer":{"@type":"Answer","text":"A: Both are useful! Semester GPA helps you track immediate progress and identify trends. Cumulative (yearly or multi-year) GPA gives the overall picture schools use for placement decisions. Calculate both to understand short-term performance and long-term trajectory."}},{"@type":"Question","name":"Q: Do plus and minus grades matter in middle school?","acceptedAnswer":{"@type":"Answer","text":"A: Yes, plus and minus grades affect your GPA. An A (4.0) is worth more than an A- (3.7), and a B+ (3.3) is worth more than a B (3.0). These small differences can add up across all your courses. However, some schools use a simpler system where A = 4.0, B = 3.0, C = 2.0, etc., without plus/minus distinctions."}},{"@type":"Question","name":"Q: What if my school uses percentages instead of letter grades?","acceptedAnswer":{"@type":"Answer","text":"A: You can convert percentages to letter grades using this standard scale: A (93-100), A- (90-92), B+ (87-89), B (83-86), B- (80-82), C+ (77-79), C (73-76), C- (70-72), D+ (67-69), D (63-66), D- (60-62), F (below 60). Once converted to letter grades, calculate GPA using the point values in our calculator."}}]}' }}
      />
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm py-3 px-6 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-cyan-600 hover:text-cyan-800 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/calculators" className="text-cyan-600 hover:text-cyan-800">
              Calculators
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Middle School GPA Calculator</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 text-white py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mr-4">
              <School className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Middle School GPA Calculator</h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Calculate your junior high GPA for 6th, 7th, and 8th grade on a 4.0 scale. Track your academic progress, understand your grades, and prepare for high school success.
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
                  <GraduationCap className="w-6 h-6 mr-3 text-cyan-600" />
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

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 flex items-start">
                  <Info className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    Middle school GPA uses a standard 4.0 scale. Enter all your courses and their letter grades to calculate your Grade Point Average.
                  </span>
                </p>
              </div>

              <div className="space-y-4 mb-6">
                {/* Header Row */}
                <div className="grid grid-cols-12 gap-3 text-sm font-semibold text-gray-600 mb-2">
                  <div className="col-span-6">Course Name</div>
                  <div className="col-span-5">Letter Grade</div>
                  <div className="col-span-1"></div>
                </div>

                {/* Course Rows */}
                {courses.map((course, index) => (
                  <div key={course.id} className="grid grid-cols-12 gap-3 items-center bg-gray-50 p-4 rounded-lg">
                    <div className="col-span-6">
                      <Input
                        type="text"
                        value={course.name}
                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                        placeholder="e.g., Math, English, Science"
                        className="w-full"
                      />
                    </div>
                    <div className="col-span-5">
                      <Select
                        value={course.grade}
                        onValueChange={(value) => updateCourse(course.id, 'grade', value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select grade" />
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
                    <div className="col-span-1 flex justify-center">
                      <Button
                        onClick={() => removeCourse(course.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        disabled={courses.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={addCourse}
                  variant="outline"
                  className="flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Course
                </Button>
                <Button
                  onClick={calculateGPA}
                  className="flex items-center bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate GPA
                </Button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3 text-cyan-600" />
                Your GPA
              </h2>

              {calculationResult ? (
                <div className="space-y-6">
                  {/* GPA Display */}
                  <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
                    <p className="text-sm text-gray-600 mb-2">Grade Point Average</p>
                    <div className="text-6xl font-bold text-cyan-600 mb-3">
                      {calculationResult.gpa.toFixed(2)}
                    </div>
                    <div className={`text-2xl font-bold px-6 py-2 rounded-lg inline-block ${getGradeColor(calculationResult.letterGrade)}`}>
                      {calculationResult.letterGrade}
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      Based on {calculationResult.totalCourses} course{calculationResult.totalCourses !== 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* Grade Breakdown */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-cyan-600" />
                      Grade Distribution
                    </h3>
                    <div className="space-y-2">
                      {calculationResult.breakdown.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center">
                            <span className={`text-sm font-bold px-3 py-1 rounded ${getGradeColor(item.grade)}`}>
                              {item.grade}
                            </span>
                            <span className="text-xs text-gray-500 ml-2">
                              ({item.points.toFixed(1)} points)
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-gray-700">
                            {item.count} course{item.count !== 1 ? 's' : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Academic Standing */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
                      <Star className="w-4 h-4 mr-2 text-blue-600" />
                      Academic Standing
                    </h3>
                    <p className="text-sm text-gray-700">
                      {calculationResult.gpa >= 3.5 ? (
                        <span className="text-green-700 font-semibold">
                          Excellent! You&apos;re on track for high school honors programs.
                        </span>
                      ) : calculationResult.gpa >= 3.0 ? (
                        <span className="text-blue-700 font-semibold">
                          Great work! Keep up the strong academic performance.
                        </span>
                      ) : calculationResult.gpa >= 2.5 ? (
                        <span className="text-yellow-700 font-semibold">
                          Good progress. Focus on improving weak areas.
                        </span>
                      ) : calculationResult.gpa >= 2.0 ? (
                        <span className="text-orange-700 font-semibold">
                          Work on raising your grades. Consider extra help.
                        </span>
                      ) : (
                        <span className="text-red-700 font-semibold">
                          Immediate attention needed. Talk to your teachers and counselor.
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <School className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">
                    Enter your course grades and click &quot;Calculate GPA&quot; to see your results
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Formula Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <BookOpen className="w-6 h-6 mr-3 text-cyan-600" />
            How Middle School GPA is Calculated
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">GPA Formula (4.0 Scale)</h3>
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl border border-cyan-200">
                <div className="flex items-center justify-center flex-wrap gap-2 text-lg">
                  <span className="font-semibold text-gray-800">GPA =</span>
                  <div className="inline-flex flex-col items-center mx-2">
                    <span className="border-b-2 border-gray-800 pb-1 px-3 text-center">
                      Sum of All Grade Points
                    </span>
                    <span className="mt-1">Number of Courses</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Each letter grade corresponds to a point value. Add all points and divide by the number of courses.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Example Calculation</h3>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <div className="space-y-3 text-sm">
                  <p className="font-semibold text-gray-800">If you have these grades:</p>
                  <div className="bg-white p-4 rounded-lg">
                    <p>• Math: A (4.0 points)</p>
                    <p>• English: B+ (3.3 points)</p>
                    <p>• Science: A- (3.7 points)</p>
                    <p>• Social Studies: B (3.0 points)</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold mb-2">Calculation:</p>
                    <p>Sum of points: 4.0 + 3.3 + 3.7 + 3.0 = 14.0</p>
                    <p>Number of courses: 4</p>
                    <p className="font-bold text-green-700 mt-2">GPA = 14.0 ÷ 4 = 3.50 (A)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Content Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <FileText className="w-7 h-7 mr-3 text-cyan-600" />
            Complete Guide to Middle School GPA
          </h2>

          {/* What is Middle School GPA */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is Middle School GPA?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Middle School GPA (Grade Point Average)</strong> is a numerical representation of a student&apos;s academic performance in junior high school, typically covering 6th, 7th, and 8th grades. While middle school GPA doesn&apos;t usually impact college admissions directly, it serves several important purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li><strong>Academic Foundation:</strong> Establishes good study habits and academic discipline for high school</li>
              <li><strong>High School Placement:</strong> May influence placement in honors or advanced courses in 9th grade</li>
              <li><strong>Scholarship Eligibility:</strong> Some private high schools consider middle school GPA for merit scholarships</li>
              <li><strong>Progress Tracking:</strong> Helps students, parents, and teachers monitor academic development</li>
              <li><strong>Goal Setting:</strong> Teaches students to set and achieve academic goals early</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Middle school GPA is typically calculated on a standard <strong>4.0 scale</strong> without the weighted bonuses used in high school for AP, IB, or Honors courses. This simpler system helps younger students understand grading while building a foundation for the more complex GPA calculations they&apos;ll encounter in high school.
            </p>
          </section>

          {/* GPA Scale Table */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Middle School GPA Scale (4.0)</h3>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                  <tr>
                    <th className="text-left p-3 border-r border-cyan-500">Letter Grade</th>
                    <th className="text-left p-3 border-r border-cyan-500">GPA Points</th>
                    <th className="text-left p-3 border-r border-cyan-500">Percentage Range</th>
                    <th className="text-left p-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50">
                    <td className="p-3 border font-semibold">A+ / A</td>
                    <td className="p-3 border">4.0</td>
                    <td className="p-3 border">93-100%</td>
                    <td className="p-3 border">Excellent</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="p-3 border font-semibold">A-</td>
                    <td className="p-3 border">3.7</td>
                    <td className="p-3 border">90-92%</td>
                    <td className="p-3 border">Excellent</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="p-3 border font-semibold">B+</td>
                    <td className="p-3 border">3.3</td>
                    <td className="p-3 border">87-89%</td>
                    <td className="p-3 border">Above Average</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="p-3 border font-semibold">B</td>
                    <td className="p-3 border">3.0</td>
                    <td className="p-3 border">83-86%</td>
                    <td className="p-3 border">Good</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="p-3 border font-semibold">B-</td>
                    <td className="p-3 border">2.7</td>
                    <td className="p-3 border">80-82%</td>
                    <td className="p-3 border">Good</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="p-3 border font-semibold">C+</td>
                    <td className="p-3 border">2.3</td>
                    <td className="p-3 border">77-79%</td>
                    <td className="p-3 border">Average</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="p-3 border font-semibold">C</td>
                    <td className="p-3 border">2.0</td>
                    <td className="p-3 border">73-76%</td>
                    <td className="p-3 border">Average</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="p-3 border font-semibold">C-</td>
                    <td className="p-3 border">1.7</td>
                    <td className="p-3 border">70-72%</td>
                    <td className="p-3 border">Below Average</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="p-3 border font-semibold">D+</td>
                    <td className="p-3 border">1.3</td>
                    <td className="p-3 border">67-69%</td>
                    <td className="p-3 border">Poor</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="p-3 border font-semibold">D</td>
                    <td className="p-3 border">1.0</td>
                    <td className="p-3 border">63-66%</td>
                    <td className="p-3 border">Poor</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="p-3 border font-semibold">D-</td>
                    <td className="p-3 border">0.7</td>
                    <td className="p-3 border">60-62%</td>
                    <td className="p-3 border">Very Poor</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="p-3 border font-semibold">F</td>
                    <td className="p-3 border">0.0</td>
                    <td className="p-3 border">0-59%</td>
                    <td className="p-3 border">Failing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Detailed Examples */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Detailed GPA Calculation Examples</h3>

            {/* Example 1 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-green-600 text-white w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">1</span>
                6th Grade First Semester
              </h4>
              <p className="text-gray-700 mb-4">
                <strong>Scenario:</strong> Alex is a 6th grader with the following semester grades:
              </p>
              <div className="bg-white p-4 rounded-lg mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-2 border">Course</th>
                      <th className="text-left p-2 border">Letter Grade</th>
                      <th className="text-left p-2 border">Grade Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border">Math</td>
                      <td className="p-2 border font-semibold">B+</td>
                      <td className="p-2 border">3.3</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">English</td>
                      <td className="p-2 border font-semibold">A</td>
                      <td className="p-2 border">4.0</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">Science</td>
                      <td className="p-2 border font-semibold">B</td>
                      <td className="p-2 border">3.0</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">Social Studies</td>
                      <td className="p-2 border font-semibold">A-</td>
                      <td className="p-2 border">3.7</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">PE</td>
                      <td className="p-2 border font-semibold">A</td>
                      <td className="p-2 border">4.0</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">Art</td>
                      <td className="p-2 border font-semibold">B+</td>
                      <td className="p-2 border">3.3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-800 mb-2">Calculation:</p>
                <div className="space-y-2 text-gray-700 text-sm">
                  <p>Sum of grade points: 3.3 + 4.0 + 3.0 + 3.7 + 4.0 + 3.3 = 21.3</p>
                  <p>Number of courses: 6</p>
                  <div className="bg-gray-50 p-3 rounded my-2">
                    <p className="font-mono">GPA = 21.3 ÷ 6 = 3.55</p>
                  </div>
                  <p className="border-t pt-2 font-bold text-green-700">
                    Final GPA: 3.55 (A) - Excellent work for 6th grade!
                  </p>
                </div>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">2</span>
                7th Grade Full Year Average
              </h4>
              <p className="text-gray-700 mb-4">
                <strong>Scenario:</strong> Jordan wants to calculate their cumulative 7th grade GPA across both semesters:
              </p>
              <div className="bg-white p-4 rounded-lg mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold mb-2 text-sm text-gray-600">Fall Semester:</p>
                    <table className="w-full text-xs">
                      <tbody>
                        <tr>
                          <td className="p-1 border">Math</td>
                          <td className="p-1 border">B (3.0)</td>
                        </tr>
                        <tr>
                          <td className="p-1 border">English</td>
                          <td className="p-1 border">B+ (3.3)</td>
                        </tr>
                        <tr>
                          <td className="p-1 border">Science</td>
                          <td className="p-1 border">A- (3.7)</td>
                        </tr>
                        <tr>
                          <td className="p-1 border">History</td>
                          <td className="p-1 border">B (3.0)</td>
                        </tr>
                        <tr>
                          <td className="p-1 border">Spanish</td>
                          <td className="p-1 border">C+ (2.3)</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="text-xs mt-2 font-semibold">Fall GPA: 3.06</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2 text-sm text-gray-600">Spring Semester:</p>
                    <table className="w-full text-xs">
                      <tbody>
                        <tr>
                          <td className="p-1 border">Math</td>
                          <td className="p-1 border">B+ (3.3)</td>
                        </tr>
                        <tr>
                          <td className="p-1 border">English</td>
                          <td className="p-1 border">A- (3.7)</td>
                        </tr>
                        <tr>
                          <td className="p-1 border">Science</td>
                          <td className="p-1 border">A (4.0)</td>
                        </tr>
                        <tr>
                          <td className="p-1 border">History</td>
                          <td className="p-1 border">B+ (3.3)</td>
                        </tr>
                        <tr>
                          <td className="p-1 border">Spanish</td>
                          <td className="p-1 border">B (3.0)</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="text-xs mt-2 font-semibold">Spring GPA: 3.46</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-800 mb-2">Full Year Calculation:</p>
                <div className="space-y-2 text-gray-700 text-sm">
                  <p>Total courses: 10 (5 fall + 5 spring)</p>
                  <p>Total grade points: 15.3 + 17.3 = 32.6</p>
                  <div className="bg-gray-50 p-3 rounded my-2">
                    <p className="font-mono">Full Year GPA = 32.6 ÷ 10 = 3.26</p>
                  </div>
                  <p className="border-t pt-2 font-bold text-blue-700">
                    7th Grade GPA: 3.26 (B+) - Jordan showed improvement from fall to spring!
                  </p>
                </div>
              </div>
            </div>

            {/* Example 3 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">3</span>
                8th Grade Cumulative Middle School GPA
              </h4>
              <p className="text-gray-700 mb-4">
                <strong>Scenario:</strong> Taylor is calculating their cumulative GPA across all three middle school years for high school placement:
              </p>
              <div className="bg-white p-4 rounded-lg mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-2 border">Grade Level</th>
                      <th className="text-left p-2 border">Year GPA</th>
                      <th className="text-left p-2 border">Courses Taken</th>
                      <th className="text-left p-2 border">Total Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border">6th Grade</td>
                      <td className="p-2 border font-semibold">3.40</td>
                      <td className="p-2 border">12</td>
                      <td className="p-2 border">40.8</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">7th Grade</td>
                      <td className="p-2 border font-semibold">3.55</td>
                      <td className="p-2 border">10</td>
                      <td className="p-2 border">35.5</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">8th Grade</td>
                      <td className="p-2 border font-semibold">3.70</td>
                      <td className="p-2 border">10</td>
                      <td className="p-2 border">37.0</td>
                    </tr>
                    <tr className="bg-gray-50 font-semibold">
                      <td className="p-2 border">TOTAL</td>
                      <td className="p-2 border">-</td>
                      <td className="p-2 border">32</td>
                      <td className="p-2 border">113.3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-800 mb-2">Cumulative Middle School GPA:</p>
                <div className="space-y-2 text-gray-700 text-sm">
                  <p>Total grade points across all 3 years: 113.3</p>
                  <p>Total courses across all 3 years: 32</p>
                  <div className="bg-gray-50 p-3 rounded my-2">
                    <p className="font-mono">Cumulative GPA = 113.3 ÷ 32 = 3.54</p>
                  </div>
                  <p className="border-t pt-2 font-bold text-purple-700">
                    Cumulative Middle School GPA: 3.54 (A-) - Taylor&apos;s upward trend shows strong preparation for high school honors courses!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* GPA Ranges and Meanings */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">What Different GPAs Mean</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-green-600" />
                  GPA 3.5 - 4.0 (A Range)
                </h4>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Excellent Performance</strong>
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                  <li>Strong candidate for high school honors/AP courses</li>
                  <li>Eligible for academic awards and recognition</li>
                  <li>Demonstrates mastery of core subjects</li>
                  <li>Well-prepared for high school rigor</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  GPA 3.0 - 3.49 (B Range)
                </h4>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Good Performance</strong>
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                  <li>Solid academic foundation</li>
                  <li>May qualify for some honors courses</li>
                  <li>Good preparation for standard high school courses</li>
                  <li>Room for improvement in specific subjects</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-5 rounded-xl border border-yellow-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-yellow-600" />
                  GPA 2.0 - 2.99 (C Range)
                </h4>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Average Performance</strong>
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                  <li>Meeting basic academic requirements</li>
                  <li>May need extra support in certain subjects</li>
                  <li>Focus on study skills and time management</li>
                  <li>Opportunity for improvement before high school</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-pink-50 p-5 rounded-xl border border-red-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-red-600" />
                  GPA Below 2.0 (D/F Range)
                </h4>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Needs Immediate Attention</strong>
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                  <li>Meet with teachers and school counselor</li>
                  <li>Consider tutoring or academic support programs</li>
                  <li>Identify learning challenges or obstacles</li>
                  <li>Develop intervention plan for improvement</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tips for Improving Your Middle School GPA</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200">
                <div className="flex items-start">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Stay Organized</h4>
                    <p className="text-sm text-gray-700">
                      Use a planner or digital calendar to track assignments, tests, and projects. Turn in all homework on time and keep your materials organized by subject.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-200">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Ask for Help Early</h4>
                    <p className="text-sm text-gray-700">
                      Don&apos;t wait until you&apos;re failing. Ask teachers questions during class or office hours. Many schools offer free tutoring or study groups.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-200">
                <div className="flex items-start">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Develop Study Routines</h4>
                    <p className="text-sm text-gray-700">
                      Set aside dedicated time each day for homework and studying. Find a quiet place free from distractions. Review notes regularly, not just before tests.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-5 rounded-xl border border-yellow-200">
                <div className="flex items-start">
                  <div className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Participate in Class</h4>
                    <p className="text-sm text-gray-700">
                      Active participation improves understanding and engagement. Ask questions, contribute to discussions, and show teachers you&apos;re invested in learning.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-200">
                <div className="flex items-start">
                  <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="font-bold text-sm">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Take Care of Yourself</h4>
                    <p className="text-sm text-gray-700">
                      Get enough sleep (8-10 hours), eat healthy meals, and exercise regularly. A healthy body supports a healthy mind and better academic performance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-pink-50 p-5 rounded-xl border border-red-200">
                <div className="flex items-start">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="font-bold text-sm">6</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Set Realistic Goals</h4>
                    <p className="text-sm text-gray-700">
                      Aim to improve gradually. If you have a C, work toward a B- first. Celebrate small victories and track your progress throughout the semester.
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
                  <span className="text-cyan-600 mr-2">Q:</span>
                  Does middle school GPA affect college admissions?
                </h4>
                <p className="text-gray-700 text-sm ml-6">
                  <span className="text-cyan-600 font-semibold">A:</span> No, colleges do not see or consider middle school GPA in admissions decisions. However, middle school performance is important because it: (1) builds foundational academic skills, (2) may determine high school course placement (honors vs. regular), and (3) develops study habits that affect high school GPA, which colleges do review.
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-cyan-600 mr-2">Q:</span>
                  How is middle school GPA different from high school GPA?
                </h4>
                <p className="text-gray-700 text-sm ml-6">
                  <span className="text-cyan-600 font-semibold">A:</span> The main differences are: (1) <strong>Weighting</strong> - Middle school uses unweighted 4.0 scale only, while high school may use weighted scales for AP/Honors courses. (2) <strong>Stakes</strong> - High school GPA impacts college admissions, while middle school GPA primarily affects high school placement. (3) <strong>Calculation</strong> - Both use similar formulas, but high school often includes more complex credit-based calculations.
                </p>
              </div>

              {/* FAQ 3 */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-cyan-600 mr-2">Q:</span>
                  Do all courses count equally in middle school GPA?
                </h4>
                <p className="text-gray-700 text-sm ml-6">
                  <span className="text-cyan-600 font-semibold">A:</span> Yes, in most middle schools, all courses count equally regardless of subject. A grade in PE counts the same as Math or English. Some schools may have exceptions for pass/fail courses or certain electives - check with your school counselor to understand your specific school&apos;s policy.
                </p>
              </div>

              {/* FAQ 4 */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-cyan-600 mr-2">Q:</span>
                  What&apos;s a good middle school GPA for honors classes in high school?
                </h4>
                <p className="text-gray-700 text-sm ml-6">
                  <span className="text-cyan-600 font-semibold">A:</span> Requirements vary by school, but generally: <strong>3.5+ GPA</strong> qualifies for most honors programs, <strong>3.0-3.49</strong> may qualify with teacher recommendation, and <strong>Below 3.0</strong> typically requires significant improvement or exceptional performance in specific subjects. Some schools also consider standardized test scores and teacher recommendations.
                </p>
              </div>

              {/* FAQ 5 */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-cyan-600 mr-2">Q:</span>
                  Can I improve my GPA if I had a bad first semester?
                </h4>
                <p className="text-gray-700 text-sm ml-6">
                  <span className="text-cyan-600 font-semibold">A:</span> Absolutely! Since GPA is cumulative, strong performance in later semesters will pull your overall GPA up. For example, if you had a 2.5 GPA first semester but earn a 3.5 second semester, your year-end GPA would be 3.0. The more semesters of improvement you have, the more your GPA will rise. It&apos;s never too late to turn things around!
                </p>
              </div>

              {/* FAQ 6 */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-cyan-600 mr-2">Q:</span>
                  Should I calculate GPA by semester or by year?
                </h4>
                <p className="text-gray-700 text-sm ml-6">
                  <span className="text-cyan-600 font-semibold">A:</span> Both are useful! <strong>Semester GPA</strong> helps you track immediate progress and identify trends. <strong>Cumulative (yearly or multi-year) GPA</strong> gives the overall picture schools use for placement decisions. Calculate both to understand short-term performance and long-term trajectory.
                </p>
              </div>

              {/* FAQ 7 */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-cyan-600 mr-2">Q:</span>
                  Do plus and minus grades matter in middle school?
                </h4>
                <p className="text-gray-700 text-sm ml-6">
                  <span className="text-cyan-600 font-semibold">A:</span> Yes, plus and minus grades affect your GPA. An A (4.0) is worth more than an A- (3.7), and a B+ (3.3) is worth more than a B (3.0). These small differences can add up across all your courses. However, some schools use a simpler system where A = 4.0, B = 3.0, C = 2.0, etc., without plus/minus distinctions.
                </p>
              </div>

              {/* FAQ 8 */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-cyan-600 mr-2">Q:</span>
                  What if my school uses percentages instead of letter grades?
                </h4>
                <p className="text-gray-700 text-sm ml-6">
                  <span className="text-cyan-600 font-semibold">A:</span> You can convert percentages to letter grades using this standard scale: A (93-100), A- (90-92), B+ (87-89), B (83-86), B- (80-82), C+ (77-79), C (73-76), C- (70-72), D+ (67-69), D (63-66), D- (60-62), F (below 60). Once converted to letter grades, calculate GPA using the point values in our calculator.
                </p>
              </div>

              {/* FAQ 9 */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-cyan-600 mr-2">Q:</span>
                  How often should I calculate my GPA?
                </h4>
                <p className="text-gray-700 text-sm ml-6">
                  <span className="text-cyan-600 font-semibold">A:</span> Calculate your GPA at the end of each grading period (quarter, trimester, or semester). This helps you: (1) Track progress toward goals, (2) Identify subjects needing more attention, (3) Celebrate improvements, (4) Make informed decisions about study strategies. Avoid calculating too frequently (like after every test) as GPA is designed to reflect overall performance over time.
                </p>
              </div>

              {/* FAQ 10 */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-cyan-600 mr-2">Q:</span>
                  Does this calculator work for homeschooled students?
                </h4>
                <p className="text-gray-700 text-sm ml-6">
                  <span className="text-cyan-600 font-semibold">A:</span> Yes! Homeschooled students can use this calculator the same way. Enter each subject area as a separate course with its corresponding letter grade. If you use percentage-based grading, convert to letter grades first. This calculator helps homeschool families maintain transcripts and prepare for high school placement or private school applications.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Conclusion</h3>
            <div className="bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50 p-6 rounded-xl border border-cyan-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                Your <strong>middle school GPA</strong> is more than just a number—it&apos;s a reflection of your growing academic skills, work ethic, and preparation for high school. While it won&apos;t directly impact college admissions, these formative years in 6th, 7th, and 8th grade are crucial for building the foundation of academic success you&apos;ll need throughout your educational journey.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Use this calculator regularly to track your progress, set realistic goals, and stay motivated. Remember that improvement is always possible—every grading period is a new opportunity to raise your GPA through hard work and dedication. Whether you&apos;re aiming for honors courses, building strong study habits, or simply trying to pass your classes, understanding your GPA empowers you to take control of your academic future.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Parents and teachers:</strong> This calculator is a valuable tool for helping middle school students understand academic expectations, develop goal-setting skills, and prepare for the increased rigor of high school. Use it as a teaching moment to discuss growth mindset, resilience, and the importance of consistent effort over time.
              </p>
            </div>
          </section>

          {/* Related Calculators */}
          <section>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Related Calculators</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/calculators/high-school-gpa-calculator" className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-purple-600" />
                  High School GPA Calculator
                </h4>
                <p className="text-sm text-gray-700">
                  Calculate weighted and unweighted high school GPA with AP, IB, and Honors course bonuses on 4.0 and 5.0 scales.
                </p>
              </Link>

              <Link href="/calculators/college-gpa-calculator" className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-blue-600" />
                  College GPA Calculator
                </h4>
                <p className="text-sm text-gray-700">
                  Calculate your cumulative college GPA with credit weighting across multiple semesters and courses.
                </p>
              </Link>

              <Link href="/calculators/grade-calculator" className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-200 hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-indigo-600" />
                  Grade Calculator
                </h4>
                <p className="text-sm text-gray-700">
                  Calculate your final course grade and find out what score you need on your final exam to achieve your desired grade.
                </p>
              </Link>

              <Link href="/calculators/percentage-calculator" className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200 hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-green-600" />
                  Percentage Calculator
                </h4>
                <p className="text-sm text-gray-700">
                  Convert test scores and grades to percentages, calculate percentage changes, and understand grade percentages.
                </p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
