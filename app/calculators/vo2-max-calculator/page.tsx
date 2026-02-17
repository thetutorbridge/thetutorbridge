'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, ChevronRight, Info, ChevronDown, ChevronUp, GraduationCap, Activity, Heart, Timer, Footprints } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

type TestMethod = 'resting_hr' | 'walking' | 'stepping' | 'walk_run' | 'rowing';
type Sex = 'male' | 'female';
type WeightUnit = 'kg' | 'lb';

interface TestMethodInfo {
  label: string;
  description: string;
  icon: string;
}

const testMethods: Record<TestMethod, TestMethodInfo> = {
  resting_hr: { label: 'Resting Heart Rate', description: 'Quick estimation using resting HR', icon: '💓' },
  walking: { label: 'Walking - 1 Mile Walk Test', description: 'Rockport 1-mile walk test', icon: '🚶' },
  stepping: { label: 'Stepping - 3 Minutes Step Test', description: "Queen's College step test", icon: '🪜' },
  walk_run: { label: 'Walk/Run - 1.5 Mile Test', description: 'Cooper 1.5-mile run/walk test', icon: '🏃' },
  rowing: { label: 'Rowing - Best 2000m Time', description: 'Indoor rowing 2000m test', icon: '🚣' },
};

// VO2 Max classification tables based on Cooper Institute standards
const getVO2Classification = (vo2max: number, age: number, sex: Sex): { category: string; color: string } => {
  // Simplified classification based on age and sex
  if (sex === 'male') {
    if (age < 30) {
      if (vo2max >= 55) return { category: 'Superior', color: 'text-emerald-600' };
      if (vo2max >= 49) return { category: 'Excellent', color: 'text-green-600' };
      if (vo2max >= 43) return { category: 'Good', color: 'text-blue-600' };
      if (vo2max >= 37) return { category: 'Fair', color: 'text-yellow-600' };
      if (vo2max >= 30) return { category: 'Poor', color: 'text-orange-600' };
      return { category: 'Very Poor', color: 'text-red-600' };
    } else if (age < 40) {
      if (vo2max >= 52) return { category: 'Superior', color: 'text-emerald-600' };
      if (vo2max >= 46) return { category: 'Excellent', color: 'text-green-600' };
      if (vo2max >= 40) return { category: 'Good', color: 'text-blue-600' };
      if (vo2max >= 34) return { category: 'Fair', color: 'text-yellow-600' };
      if (vo2max >= 27) return { category: 'Poor', color: 'text-orange-600' };
      return { category: 'Very Poor', color: 'text-red-600' };
    } else if (age < 50) {
      if (vo2max >= 49) return { category: 'Superior', color: 'text-emerald-600' };
      if (vo2max >= 43) return { category: 'Excellent', color: 'text-green-600' };
      if (vo2max >= 37) return { category: 'Good', color: 'text-blue-600' };
      if (vo2max >= 31) return { category: 'Fair', color: 'text-yellow-600' };
      if (vo2max >= 24) return { category: 'Poor', color: 'text-orange-600' };
      return { category: 'Very Poor', color: 'text-red-600' };
    } else if (age < 60) {
      if (vo2max >= 45) return { category: 'Superior', color: 'text-emerald-600' };
      if (vo2max >= 39) return { category: 'Excellent', color: 'text-green-600' };
      if (vo2max >= 33) return { category: 'Good', color: 'text-blue-600' };
      if (vo2max >= 27) return { category: 'Fair', color: 'text-yellow-600' };
      if (vo2max >= 21) return { category: 'Poor', color: 'text-orange-600' };
      return { category: 'Very Poor', color: 'text-red-600' };
    } else {
      if (vo2max >= 41) return { category: 'Superior', color: 'text-emerald-600' };
      if (vo2max >= 35) return { category: 'Excellent', color: 'text-green-600' };
      if (vo2max >= 29) return { category: 'Good', color: 'text-blue-600' };
      if (vo2max >= 23) return { category: 'Fair', color: 'text-yellow-600' };
      if (vo2max >= 17) return { category: 'Poor', color: 'text-orange-600' };
      return { category: 'Very Poor', color: 'text-red-600' };
    }
  } else {
    // Female
    if (age < 30) {
      if (vo2max >= 49) return { category: 'Superior', color: 'text-emerald-600' };
      if (vo2max >= 43) return { category: 'Excellent', color: 'text-green-600' };
      if (vo2max >= 37) return { category: 'Good', color: 'text-blue-600' };
      if (vo2max >= 31) return { category: 'Fair', color: 'text-yellow-600' };
      if (vo2max >= 24) return { category: 'Poor', color: 'text-orange-600' };
      return { category: 'Very Poor', color: 'text-red-600' };
    } else if (age < 40) {
      if (vo2max >= 46) return { category: 'Superior', color: 'text-emerald-600' };
      if (vo2max >= 40) return { category: 'Excellent', color: 'text-green-600' };
      if (vo2max >= 34) return { category: 'Good', color: 'text-blue-600' };
      if (vo2max >= 28) return { category: 'Fair', color: 'text-yellow-600' };
      if (vo2max >= 21) return { category: 'Poor', color: 'text-orange-600' };
      return { category: 'Very Poor', color: 'text-red-600' };
    } else if (age < 50) {
      if (vo2max >= 43) return { category: 'Superior', color: 'text-emerald-600' };
      if (vo2max >= 37) return { category: 'Excellent', color: 'text-green-600' };
      if (vo2max >= 31) return { category: 'Good', color: 'text-blue-600' };
      if (vo2max >= 25) return { category: 'Fair', color: 'text-yellow-600' };
      if (vo2max >= 18) return { category: 'Poor', color: 'text-orange-600' };
      return { category: 'Very Poor', color: 'text-red-600' };
    } else if (age < 60) {
      if (vo2max >= 39) return { category: 'Superior', color: 'text-emerald-600' };
      if (vo2max >= 33) return { category: 'Excellent', color: 'text-green-600' };
      if (vo2max >= 27) return { category: 'Good', color: 'text-blue-600' };
      if (vo2max >= 21) return { category: 'Fair', color: 'text-yellow-600' };
      if (vo2max >= 15) return { category: 'Poor', color: 'text-orange-600' };
      return { category: 'Very Poor', color: 'text-red-600' };
    } else {
      if (vo2max >= 35) return { category: 'Superior', color: 'text-emerald-600' };
      if (vo2max >= 29) return { category: 'Excellent', color: 'text-green-600' };
      if (vo2max >= 23) return { category: 'Good', color: 'text-blue-600' };
      if (vo2max >= 17) return { category: 'Fair', color: 'text-yellow-600' };
      if (vo2max >= 11) return { category: 'Poor', color: 'text-orange-600' };
      return { category: 'Very Poor', color: 'text-red-600' };
    }
  }
};

export default function VO2MaxCalculator() {
  const [testMethod, setTestMethod] = useState<TestMethod>('resting_hr');
  const [sex, setSex] = useState<Sex>('male');
  const [age, setAge] = useState<string>('30');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [weight, setWeight] = useState<string>('70');

  // Resting HR inputs
  const [restingHR, setRestingHR] = useState<string>('20'); // beats per 20 seconds

  // Walking test inputs
  const [walkTime, setWalkTime] = useState<string>('15'); // minutes
  const [walkTimeSeconds, setWalkTimeSeconds] = useState<string>('0');
  const [walkHR, setWalkHR] = useState<string>('140'); // bpm at end of walk

  // Step test inputs
  const [stepHR, setStepHR] = useState<string>('25'); // beats per 15 seconds (measured 5-20 sec after stopping)

  // 1.5 mile run inputs
  const [runTime, setRunTime] = useState<string>('12'); // minutes
  const [runTimeSeconds, setRunTimeSeconds] = useState<string>('0');

  // Rowing inputs
  const [rowTime, setRowTime] = useState<string>('7'); // minutes
  const [rowTimeSeconds, setRowTimeSeconds] = useState<string>('30');

  const [vo2max, setVO2max] = useState<number | null>(null);
  const [maxHR, setMaxHR] = useState<number | null>(null);
  const [classification, setClassification] = useState<{ category: string; color: string } | null>(null);

  const [showMethodDropdown, setShowMethodDropdown] = useState(false);
  const [showTestMethod, setShowTestMethod] = useState(true);
  const [showPersonalData, setShowPersonalData] = useState(true);
  const [showFormula, setShowFormula] = useState(false);
  const [showClassificationTable, setShowClassificationTable] = useState(false);

  // Convert weight to kg
  const getWeightInKg = (): number => {
    const w = parseFloat(weight) || 0;
    return weightUnit === 'lb' ? w * 0.453592 : w;
  };

  // Convert weight to lbs
  const getWeightInLbs = (): number => {
    const w = parseFloat(weight) || 0;
    return weightUnit === 'kg' ? w * 2.20462 : w;
  };

  // Calculate VO2 max based on test method
  useEffect(() => {
    const ageNum = parseInt(age) || 0;

    if (ageNum <= 0) {
      setVO2max(null);
      setClassification(null);
      return;
    }

    let calculatedVO2: number | null = null;
    let calculatedMaxHR: number | null = null;

    switch (testMethod) {
      case 'resting_hr': {
        // Uth formula: VO2max = 15.3 × (MHR / RHR)
        // MHR = 208 - (0.7 × age)
        const rhr20 = parseFloat(restingHR) || 0;
        if (rhr20 <= 0) break;

        const rhrBpm = rhr20 * 3; // Convert 20-sec count to bpm
        calculatedMaxHR = 208 - (0.7 * ageNum);
        calculatedVO2 = 15.3 * (calculatedMaxHR / rhrBpm);
        break;
      }

      case 'walking': {
        // Rockport 1-Mile Walk Test
        // VO2max = 132.853 - 0.0769×weight(lb) - 0.3877×age + 6.315×sex - 3.2649×time(min) - 0.1565×HR
        // sex: 1 for male, 0 for female
        const timeMin = parseFloat(walkTime) || 0;
        const timeSec = parseFloat(walkTimeSeconds) || 0;
        const hr = parseFloat(walkHR) || 0;
        const weightLbs = getWeightInLbs();

        if (timeMin <= 0 || hr <= 0 || weightLbs <= 0) break;

        const totalTime = timeMin + (timeSec / 60);
        const sexValue = sex === 'male' ? 1 : 0;

        calculatedVO2 = 132.853 - (0.0769 * weightLbs) - (0.3877 * ageNum) + (6.315 * sexValue) - (3.2649 * totalTime) - (0.1565 * hr);

        // Age correction for 18-24 year olds
        if (ageNum >= 18 && ageNum <= 24) {
          calculatedVO2 -= 6;
        }
        break;
      }

      case 'stepping': {
        // Queen's College Step Test
        // Men: VO2max = 111.33 - 0.42 × HR (HR from 15-sec count × 4)
        // Women: VO2max = 65.81 - 0.1847 × HR
        const hr15 = parseFloat(stepHR) || 0;
        if (hr15 <= 0) break;

        const hrBpm = hr15 * 4;

        if (sex === 'male') {
          calculatedVO2 = 111.33 - (0.42 * hrBpm);
        } else {
          calculatedVO2 = 65.81 - (0.1847 * hrBpm);
        }
        break;
      }

      case 'walk_run': {
        // Cooper 1.5-Mile Run Test
        // VO2max = 483 / time(min) + 3.5
        const timeMin = parseFloat(runTime) || 0;
        const timeSec = parseFloat(runTimeSeconds) || 0;

        if (timeMin <= 0 && timeSec <= 0) break;

        const totalTime = timeMin + (timeSec / 60);
        if (totalTime <= 0) break;

        calculatedVO2 = (483 / totalTime) + 3.5;
        break;
      }

      case 'rowing': {
        // 2000m Rowing Test
        // Calculate average power from 500m pace, then estimate VO2
        // Pace = total time / 4 (for 500m splits)
        // Power (W) = 2.80 / (pace/500)^3
        // VO2 = (power / body mass × 10.1) + 7
        const timeMin = parseFloat(rowTime) || 0;
        const timeSec = parseFloat(rowTimeSeconds) || 0;
        const weightKg = getWeightInKg();

        if ((timeMin <= 0 && timeSec <= 0) || weightKg <= 0) break;

        const totalTimeSec = (timeMin * 60) + timeSec;
        const paceSeconds = totalTimeSec / 4; // 500m pace in seconds

        // Power calculation using standard C2 formula: P = 2.80 / (t/500)^3 where t is pace in seconds
        const power = 2.80 / Math.pow(paceSeconds / 500, 3);

        // VO2 estimation: relative VO2 = (Power/mass × 10.1) + 7
        calculatedVO2 = (power / weightKg * 10.1) + 7;
        break;
      }
    }

    if (calculatedVO2 !== null && calculatedVO2 > 0) {
      setVO2max(Math.round(calculatedVO2 * 10) / 10);
      setMaxHR(calculatedMaxHR);
      setClassification(getVO2Classification(calculatedVO2, ageNum, sex));
    } else {
      setVO2max(null);
      setMaxHR(null);
      setClassification(null);
    }
  }, [testMethod, sex, age, weight, weightUnit, restingHR, walkTime, walkTimeSeconds, walkHR, stepHR, runTime, runTimeSeconds, rowTime, rowTimeSeconds]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Which VO2 max test method is most accurate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The gold standard is a lab test with gas analysis during maximal exercise. Among field tests, the 1.5-mile run test is most accurate for active individuals, while the walking test is better for beginners or older adults. The resting heart rate method is least accurate but most convenient."
          }
        }
      ]
    }) }}
      />
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/calculators" className="text-blue-600 hover:text-blue-800">
              Calculators
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">VO2 Max Calculator</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white mb-4 shadow-lg">
            <Activity className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            VO2 Max Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate your aerobic capacity (VO2 max) using 5 different test methods. VO2 max measures the maximum amount of oxygen your body can use during intense exercise.
          </p>
        </div>

        {/* Test Method Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
          <button
            onClick={() => setShowTestMethod(!showTestMethod)}
            className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
          >
            <h2 className="text-xl font-semibold flex items-center">
              <Timer className="w-5 h-5 mr-2" />
              Test Method
            </h2>
            {showTestMethod ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {showTestMethod && (
            <div className="p-6 space-y-5">
              {/* Method Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  Method
                  <span className="ml-2 text-gray-400 cursor-help" title="Choose a test method based on your fitness level and available equipment">
                    <Info className="w-4 h-4" />
                  </span>
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowMethodDropdown(!showMethodDropdown)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-all flex items-center justify-between bg-gray-50"
                  >
                    <div className="text-left flex items-center">
                      <span className="text-xl mr-3">{testMethods[testMethod].icon}</span>
                      <span className="font-medium text-gray-700">{testMethods[testMethod].label}</span>
                    </div>
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </button>
                  {showMethodDropdown && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                      {(Object.keys(testMethods) as TestMethod[]).map((method) => (
                        <button
                          key={method}
                          onClick={() => {
                            setTestMethod(method);
                            setShowMethodDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center ${
                            testMethod === method ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                          }`}
                        >
                          <span className="text-xl mr-3">{testMethods[method].icon}</span>
                          <div>
                            <div className="font-medium">{testMethods[method].label}</div>
                            <div className="text-sm text-gray-500">{testMethods[method].description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Personal Data Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
          <button
            onClick={() => setShowPersonalData(!showPersonalData)}
            className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
          >
            <h2 className="text-xl font-semibold flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              Personal Data
            </h2>
            {showPersonalData ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {showPersonalData && (
            <div className="p-6 space-y-5">
              {/* Age - always shown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Age"
                    min="1"
                    max="100"
                  />
                  <span className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium">years</span>
                </div>
              </div>

              {/* Sex - shown for walking and step tests */}
              {(testMethod === 'walking' || testMethod === 'stepping') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setSex('male')}
                      className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                        sex === 'male'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 text-gray-600 hover:border-blue-300'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      onClick={() => setSex('female')}
                      className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                        sex === 'female'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 text-gray-600 hover:border-blue-300'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>
              )}

              {/* Weight - shown for walking and rowing tests */}
              {(testMethod === 'walking' || testMethod === 'rowing') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Weight"
                      min="0"
                      step="0.1"
                    />
                    <select
                      value={weightUnit}
                      onChange={(e) => setWeightUnit(e.target.value as WeightUnit)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-gray-50"
                    >
                      <option value="kg">kg</option>
                      <option value="lb">lb</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Resting Heart Rate Method */}
              {testMethod === 'resting_hr' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    Resting Heart Rate
                    <span className="ml-2 text-gray-400 cursor-help" title="Count your pulse for 20 seconds while at complete rest">
                      <Info className="w-4 h-4" />
                    </span>
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={restingHR}
                      onChange={(e) => setRestingHR(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Heart rate"
                      min="5"
                      max="50"
                    />
                    <span className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium whitespace-nowrap">beats / 20 sec</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Tip: Measure first thing in the morning while lying down for best accuracy.
                  </p>
                </div>
              )}

              {/* Walking Test Inputs */}
              {testMethod === 'walking' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">1-Mile Walk Time</label>
                    <div className="flex gap-3">
                      <div className="flex-1 flex gap-2">
                        <input
                          type="number"
                          value={walkTime}
                          onChange={(e) => setWalkTime(e.target.value)}
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          placeholder="Min"
                          min="0"
                        />
                        <span className="px-3 py-3 text-gray-500">:</span>
                        <input
                          type="number"
                          value={walkTimeSeconds}
                          onChange={(e) => setWalkTimeSeconds(e.target.value)}
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          placeholder="Sec"
                          min="0"
                          max="59"
                        />
                      </div>
                      <span className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium">min:sec</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Heart Rate (at end of walk)</label>
                    <div className="flex gap-3">
                      <input
                        type="number"
                        value={walkHR}
                        onChange={(e) => setWalkHR(e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="Heart rate"
                        min="60"
                        max="220"
                      />
                      <span className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium">bpm</span>
                    </div>
                  </div>
                </>
              )}

              {/* Step Test Inputs */}
              {testMethod === 'stepping' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    Heart Rate (5-20 sec after stepping)
                    <span className="ml-2 text-gray-400 cursor-help" title="Count pulse for 15 seconds, 5-20 seconds after completing 3 min of stepping">
                      <Info className="w-4 h-4" />
                    </span>
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={stepHR}
                      onChange={(e) => setStepHR(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Heart rate"
                      min="10"
                      max="60"
                    />
                    <span className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium whitespace-nowrap">beats / 15 sec</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Step on a 16.25-inch (41.3 cm) bench for 3 minutes at a rate of 24 steps/min (men) or 22 steps/min (women).
                  </p>
                </div>
              )}

              {/* 1.5 Mile Run Inputs */}
              {testMethod === 'walk_run' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">1.5-Mile Run/Walk Time</label>
                  <div className="flex gap-3">
                    <div className="flex-1 flex gap-2">
                      <input
                        type="number"
                        value={runTime}
                        onChange={(e) => setRunTime(e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="Min"
                        min="0"
                      />
                      <span className="px-3 py-3 text-gray-500">:</span>
                      <input
                        type="number"
                        value={runTimeSeconds}
                        onChange={(e) => setRunTimeSeconds(e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="Sec"
                        min="0"
                        max="59"
                      />
                    </div>
                    <span className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium">min:sec</span>
                  </div>
                </div>
              )}

              {/* Rowing Test Inputs */}
              {testMethod === 'rowing' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">2000m Rowing Time</label>
                  <div className="flex gap-3">
                    <div className="flex-1 flex gap-2">
                      <input
                        type="number"
                        value={rowTime}
                        onChange={(e) => setRowTime(e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="Min"
                        min="0"
                      />
                      <span className="px-3 py-3 text-gray-500">:</span>
                      <input
                        type="number"
                        value={rowTimeSeconds}
                        onChange={(e) => setRowTimeSeconds(e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="Sec"
                        min="0"
                        max="59"
                      />
                    </div>
                    <span className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium">min:sec</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
          <div className="px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Aerobic Capacity
            </h2>
          </div>

          <div className="p-6">
            {vo2max !== null ? (
              <div className="space-y-4">
                {/* Main Result */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">VO2 Max</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-bold text-blue-700">{vo2max}</p>
                    <span className="text-lg text-gray-600">ml/kg/min</span>
                  </div>
                  {classification && (
                    <p className={`text-lg font-semibold mt-2 ${classification.color}`}>
                      {classification.category} Fitness Level
                    </p>
                  )}
                </div>

                {/* Max HR (only for resting HR method) */}
                {maxHR && testMethod === 'resting_hr' && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-600">Estimated Max Heart Rate</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">{Math.round(maxHR)} bpm</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Heart className="w-4 h-4 text-pink-500" />
                        <span className="text-sm text-gray-600">Resting Heart Rate</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">{(parseFloat(restingHR) || 0) * 3} bpm</p>
                    </div>
                  </div>
                )}

                {/* Interpretation */}
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">What This Means</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    {vo2max >= 50 && <li>Your aerobic capacity is excellent! You have athlete-level cardiovascular fitness.</li>}
                    {vo2max >= 40 && vo2max < 50 && <li>Your aerobic capacity is good. You have above-average cardiovascular health.</li>}
                    {vo2max >= 30 && vo2max < 40 && <li>Your aerobic capacity is average. Regular cardio exercise can help improve it.</li>}
                    {vo2max < 30 && <li>Your aerobic capacity has room for improvement. Consider starting a cardio exercise program.</li>}
                    <li>Each 1-unit increase in VO2 max is associated with a ~3% decrease in cardiovascular disease risk.</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-500">
                <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Enter your data above to calculate your VO2 max</p>
              </div>
            )}
          </div>
        </div>

        {/* Classification Table Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <button
            onClick={() => setShowClassificationTable(!showClassificationTable)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Footprints className="w-5 h-5 mr-2 text-blue-600" />
              VO2 Max Classification by Age
            </h3>
            {showClassificationTable ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {showClassificationTable && (
            <div className="px-6 pb-6">
              <p className="text-sm text-gray-600 mb-4">
                VO2 max values (ml/kg/min) classified by age and fitness level. Based on Cooper Institute standards.
              </p>

              {/* Male Table */}
              <h4 className="font-semibold text-gray-700 mb-2">Men</h4>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-blue-50">
                      <th className="text-left py-2 px-2 font-semibold text-gray-700">Age</th>
                      <th className="text-center py-2 px-2 font-semibold text-red-600">Very Poor</th>
                      <th className="text-center py-2 px-2 font-semibold text-orange-600">Poor</th>
                      <th className="text-center py-2 px-2 font-semibold text-yellow-600">Fair</th>
                      <th className="text-center py-2 px-2 font-semibold text-blue-600">Good</th>
                      <th className="text-center py-2 px-2 font-semibold text-green-600">Excellent</th>
                      <th className="text-center py-2 px-2 font-semibold text-emerald-600">Superior</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-2 font-medium">20-29</td>
                      <td className="text-center py-2 px-2">&lt;30</td>
                      <td className="text-center py-2 px-2">30-36</td>
                      <td className="text-center py-2 px-2">37-42</td>
                      <td className="text-center py-2 px-2">43-48</td>
                      <td className="text-center py-2 px-2">49-54</td>
                      <td className="text-center py-2 px-2">&gt;55</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-2 font-medium">30-39</td>
                      <td className="text-center py-2 px-2">&lt;27</td>
                      <td className="text-center py-2 px-2">27-33</td>
                      <td className="text-center py-2 px-2">34-39</td>
                      <td className="text-center py-2 px-2">40-45</td>
                      <td className="text-center py-2 px-2">46-51</td>
                      <td className="text-center py-2 px-2">&gt;52</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-2 font-medium">40-49</td>
                      <td className="text-center py-2 px-2">&lt;24</td>
                      <td className="text-center py-2 px-2">24-30</td>
                      <td className="text-center py-2 px-2">31-36</td>
                      <td className="text-center py-2 px-2">37-42</td>
                      <td className="text-center py-2 px-2">43-48</td>
                      <td className="text-center py-2 px-2">&gt;49</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-2 font-medium">50-59</td>
                      <td className="text-center py-2 px-2">&lt;21</td>
                      <td className="text-center py-2 px-2">21-26</td>
                      <td className="text-center py-2 px-2">27-32</td>
                      <td className="text-center py-2 px-2">33-38</td>
                      <td className="text-center py-2 px-2">39-44</td>
                      <td className="text-center py-2 px-2">&gt;45</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2 font-medium">60+</td>
                      <td className="text-center py-2 px-2">&lt;17</td>
                      <td className="text-center py-2 px-2">17-22</td>
                      <td className="text-center py-2 px-2">23-28</td>
                      <td className="text-center py-2 px-2">29-34</td>
                      <td className="text-center py-2 px-2">35-40</td>
                      <td className="text-center py-2 px-2">&gt;41</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Female Table */}
              <h4 className="font-semibold text-gray-700 mb-2">Women</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-pink-50">
                      <th className="text-left py-2 px-2 font-semibold text-gray-700">Age</th>
                      <th className="text-center py-2 px-2 font-semibold text-red-600">Very Poor</th>
                      <th className="text-center py-2 px-2 font-semibold text-orange-600">Poor</th>
                      <th className="text-center py-2 px-2 font-semibold text-yellow-600">Fair</th>
                      <th className="text-center py-2 px-2 font-semibold text-blue-600">Good</th>
                      <th className="text-center py-2 px-2 font-semibold text-green-600">Excellent</th>
                      <th className="text-center py-2 px-2 font-semibold text-emerald-600">Superior</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-2 font-medium">20-29</td>
                      <td className="text-center py-2 px-2">&lt;24</td>
                      <td className="text-center py-2 px-2">24-30</td>
                      <td className="text-center py-2 px-2">31-36</td>
                      <td className="text-center py-2 px-2">37-42</td>
                      <td className="text-center py-2 px-2">43-48</td>
                      <td className="text-center py-2 px-2">&gt;49</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-2 font-medium">30-39</td>
                      <td className="text-center py-2 px-2">&lt;21</td>
                      <td className="text-center py-2 px-2">21-27</td>
                      <td className="text-center py-2 px-2">28-33</td>
                      <td className="text-center py-2 px-2">34-39</td>
                      <td className="text-center py-2 px-2">40-45</td>
                      <td className="text-center py-2 px-2">&gt;46</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-2 font-medium">40-49</td>
                      <td className="text-center py-2 px-2">&lt;18</td>
                      <td className="text-center py-2 px-2">18-24</td>
                      <td className="text-center py-2 px-2">25-30</td>
                      <td className="text-center py-2 px-2">31-36</td>
                      <td className="text-center py-2 px-2">37-42</td>
                      <td className="text-center py-2 px-2">&gt;43</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-2 font-medium">50-59</td>
                      <td className="text-center py-2 px-2">&lt;15</td>
                      <td className="text-center py-2 px-2">15-20</td>
                      <td className="text-center py-2 px-2">21-26</td>
                      <td className="text-center py-2 px-2">27-32</td>
                      <td className="text-center py-2 px-2">33-38</td>
                      <td className="text-center py-2 px-2">&gt;39</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2 font-medium">60+</td>
                      <td className="text-center py-2 px-2">&lt;11</td>
                      <td className="text-center py-2 px-2">11-16</td>
                      <td className="text-center py-2 px-2">17-22</td>
                      <td className="text-center py-2 px-2">23-28</td>
                      <td className="text-center py-2 px-2">29-34</td>
                      <td className="text-center py-2 px-2">&gt;35</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Formula Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <button
            onClick={() => setShowFormula(!showFormula)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              Formulas & Methods
            </h3>
            {showFormula ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {showFormula && (
            <div className="px-6 pb-6 space-y-4">
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">1. Resting Heart Rate Method (Uth Formula)</h4>
                <div className="bg-white rounded-lg p-3 font-mono text-sm">
                  <p>Max HR = 208 - (0.7 × age)</p>
                  <p className="mt-1">VO2 max = 15.3 × (Max HR ÷ Resting HR)</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">Quick estimation requiring only resting heart rate.</p>
              </div>

              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">2. 1-Mile Walk Test (Rockport)</h4>
                <div className="bg-white rounded-lg p-3 font-mono text-sm text-xs">
                  <p>VO2 max = 132.853 - (0.0769 × weight<sub>lb</sub>) - (0.3877 × age)</p>
                  <p className="mt-1">+ (6.315 × sex) - (3.2649 × time<sub>min</sub>) - (0.1565 × HR)</p>
                  <p className="mt-1 text-gray-500">sex: 1 = male, 0 = female</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">Good for beginners and older adults. Walk 1 mile as fast as possible.</p>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">3. 3-Minute Step Test (Queen&apos;s College)</h4>
                <div className="bg-white rounded-lg p-3 font-mono text-sm">
                  <p><strong>Men:</strong> VO2 max = 111.33 - (0.42 × HR)</p>
                  <p className="mt-1"><strong>Women:</strong> VO2 max = 65.81 - (0.1847 × HR)</p>
                  <p className="mt-1 text-gray-500">HR = 15-sec count × 4</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">Step on a 16.25&quot; bench for 3 minutes at a consistent pace.</p>
              </div>

              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">4. 1.5-Mile Run Test (Cooper)</h4>
                <div className="bg-white rounded-lg p-3 font-mono text-sm">
                  <p>VO2 max = (483 ÷ time<sub>min</sub>) + 3.5</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">Run or walk 1.5 miles as fast as possible. Best for active individuals.</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">5. 2000m Rowing Test</h4>
                <div className="bg-white rounded-lg p-3 font-mono text-sm">
                  <p>500m Pace = Total Time ÷ 4</p>
                  <p className="mt-1">Power (W) = 2.80 ÷ (pace/500)³</p>
                  <p className="mt-1">VO2 max = (Power ÷ body mass × 10.1) + 7</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">For experienced rowers. Row 2000m on an ergometer at maximum effort.</p>
              </div>
            </div>
          )}
        </div>

        {/* Educational Content */}
        <div className="prose prose-gray max-w-none">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Activity className="w-6 h-6 mr-2 text-blue-600" />
              Understanding VO2 Max
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">What is VO2 Max?</h3>
                <p>
                  <strong>VO2 max</strong> (maximal oxygen uptake) is the maximum rate at which your body can absorb and use oxygen during intense exercise. It&apos;s measured in milliliters of oxygen per kilogram of body weight per minute (ml/kg/min) and is considered the gold standard for measuring aerobic fitness.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Why Does VO2 Max Matter?</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Cardiovascular Health:</strong> Higher VO2 max is associated with lower risk of heart disease and all-cause mortality</li>
                  <li><strong>Endurance Performance:</strong> Elite endurance athletes typically have VO2 max values of 70-85 ml/kg/min</li>
                  <li><strong>Longevity:</strong> Studies show each 1 MET (~3.5 ml/kg/min) increase correlates with 13% lower mortality risk</li>
                  <li><strong>Fitness Tracking:</strong> VO2 max is an objective measure to track fitness improvements over time</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">How to Improve VO2 Max</h3>
                <div className="grid sm:grid-cols-2 gap-4 mt-3">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-800">High-Intensity Interval Training (HIIT)</h4>
                    <p className="text-sm text-gray-600 mt-1">Short bursts of intense exercise followed by rest periods. Most effective for improving VO2 max.</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-800">Long Steady-State Cardio</h4>
                    <p className="text-sm text-gray-600 mt-1">30-60 minutes of continuous moderate-intensity exercise like jogging, cycling, or swimming.</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-800">Tempo Training</h4>
                    <p className="text-sm text-gray-600 mt-1">Exercise at 80-90% of max HR for extended periods to push your aerobic threshold.</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-800">Consistency</h4>
                    <p className="text-sm text-gray-600 mt-1">Train 3-5 times per week. Improvements of 5-20% are possible within 3-6 months.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Factors Affecting VO2 Max</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Age:</strong> VO2 max typically declines ~1% per year after age 25</li>
                  <li><strong>Sex:</strong> Men generally have 10-15% higher VO2 max than women due to body composition</li>
                  <li><strong>Genetics:</strong> Up to 50% of VO2 max potential may be hereditary</li>
                  <li><strong>Training Status:</strong> Regular exercise can improve VO2 max by 15-30%</li>
                  <li><strong>Altitude:</strong> Living/training at altitude can increase oxygen-carrying capacity</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: 'Which VO2 max test method is most accurate?',
                a: 'The gold standard is a lab test with gas analysis during maximal exercise. Among field tests, the 1.5-mile run test is most accurate for active individuals, while the walking test is better for beginners or older adults. The resting heart rate method is least accurate but most convenient.'
              },
              {
                q: 'What is a good VO2 max score?',
                a: 'For men, a "good" VO2 max ranges from 40-50 ml/kg/min depending on age. For women, 35-45 ml/kg/min is considered good. Elite endurance athletes can reach 70-85+ ml/kg/min. However, even modest improvements in VO2 max provide significant health benefits.'
              },
              {
                q: 'How often should I test my VO2 max?',
                a: 'Every 4-8 weeks is reasonable if you\'re actively training to improve it. For general fitness monitoring, every 3-6 months is sufficient. Significant improvements typically require at least 6-12 weeks of consistent training.'
              },
              {
                q: 'Can I improve my VO2 max at any age?',
                a: 'Yes! While VO2 max naturally declines with age, people of all ages can improve their aerobic capacity through training. Studies show seniors can improve VO2 max by 10-30% with proper exercise programs. Active older adults often have VO2 max levels similar to sedentary young adults.'
              },
              {
                q: 'Why is my VO2 max estimate different from my fitness watch?',
                a: 'Fitness watches use algorithms based on heart rate data and movement patterns, which are indirect measurements. Field tests like this calculator use exercise performance data. Lab tests with gas analysis are most accurate. Different methods can yield variations of 5-15%.'
              },
              {
                q: 'How does HIIT compare to steady-state cardio for improving VO2 max?',
                a: 'Research shows HIIT can be more time-efficient for improving VO2 max, often producing similar or greater improvements with less total training time. However, both methods are effective, and a combination of HIIT and steady-state cardio often produces the best results.'
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                <h3 className="font-semibold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Calculators */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-blue-100 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'BMR Calculator', href: '/calculators/bmr-calculator', desc: 'Calculate metabolic rate' },
              { name: 'Calorie Calculator', href: '/calculators/calorie-calculator', desc: 'Daily calorie needs' },
              { name: 'Calories Burned Walking', href: '/calculators/calories-burned-walking-calculator', desc: 'Exercise calorie burn' },
              { name: 'Steps to Calories', href: '/calculators/steps-to-calories-calculator', desc: 'Calories from steps' },
              { name: 'BMI Calculator', href: '/calculators/bmi-calculator', desc: 'Body mass index' },
              { name: 'Body Shape Calculator', href: '/calculators/body-shape-calculator', desc: 'Find your body type' },
            ].map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {calc.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{calc.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 text-blue-200" />
          <h2 className="text-2xl font-bold mb-3">Need Help with Fitness & Health?</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Our expert tutors can help you understand exercise science, physiology, and develop effective training programs!
          </p>
          <Link
            href="/tutoring/free-consultation"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Book Your Free Session
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </main>

      <Footer />

      {/* Click outside to close dropdowns */}
      {showMethodDropdown && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowMethodDropdown(false)}
        />
      )}

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'VO2 Max Calculator',
            description: 'Free VO2 max calculator to measure aerobic capacity using 5 different test methods. Get your fitness classification and tips to improve cardiovascular health.',
            url: 'https://www.thetutorbridge.com/calculators/vo2-max-calculator',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Any',
            permissions: 'browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />
    </div>
  );
}
