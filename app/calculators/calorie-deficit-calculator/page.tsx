'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, ChevronRight, Info, Scale, ChevronDown, ChevronUp, GraduationCap, Target, Calendar, Activity, Flame } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

type Sex = 'female' | 'male';
type HeightUnit = 'cm' | 'm' | 'in' | 'ft' | 'ft_in' | 'm_cm';
type WeightUnit = 'kg' | 'lb' | 'st';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active' | 'extra_active';

interface Results {
  bmr: number;
  tdee: number;
  dailyCalories: number;
  weeklyDeficit: number;
  dailyDeficit: number;
  weightToLose: number;
  daysToGoal: number;
  weeksToGoal: number;
  poundsPerWeek: number;
  isSafe: boolean;
  warning: string | null;
}

const activityLevels: Record<ActivityLevel, { label: string; multiplier: number; description: string }> = {
  sedentary: { label: 'Sedentary', multiplier: 1.2, description: 'Little or no exercise, desk job' },
  light: { label: 'Lightly Active', multiplier: 1.375, description: 'Light exercise 1-3 days/week' },
  moderate: { label: 'Moderately Active', multiplier: 1.55, description: 'Moderate exercise 3-5 days/week' },
  active: { label: 'Active', multiplier: 1.725, description: 'Hard exercise 6-7 days/week' },
  very_active: { label: 'Very Active', multiplier: 1.9, description: 'Hard daily exercise + physical job' },
  extra_active: { label: 'Extra Active', multiplier: 2.0, description: 'Athlete or very hard physical job' },
};

const heightUnitLabels: Record<HeightUnit, string> = {
  cm: 'cm',
  m: 'm',
  in: 'in',
  ft: 'ft',
  ft_in: 'ft / in',
  m_cm: 'm / cm',
};

const weightUnitLabels: Record<WeightUnit, string> = {
  kg: 'kg',
  lb: 'lb',
  st: 'st',
};

export default function CalorieDeficitCalculator() {
  const [sex, setSex] = useState<Sex>('female');
  const [age, setAge] = useState<string>('30');
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm');
  const [height, setHeight] = useState<string>('165');
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('5');
  const [heightM, setHeightM] = useState<string>('1');
  const [heightCm, setHeightCm] = useState<string>('65');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [currentWeight, setCurrentWeight] = useState<string>('70');
  const [targetWeight, setTargetWeight] = useState<string>('65');
  const [targetDate, setTargetDate] = useState<string>(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    return date.toISOString().split('T')[0];
  });
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('sedentary');
  const [results, setResults] = useState<Results | null>(null);
  const [showHeightDropdown, setShowHeightDropdown] = useState(false);
  const [showWeightDropdown, setShowWeightDropdown] = useState(false);
  const [showActivityDropdown, setShowActivityDropdown] = useState(false);
  const [showPersonalDetails, setShowPersonalDetails] = useState(true);
  const [showCaloriePlan, setShowCaloriePlan] = useState(true);
  const [showFormula, setShowFormula] = useState(false);

  // Convert height to cm
  const getHeightInCm = (): number => {
    switch (heightUnit) {
      case 'cm':
        return parseFloat(height) || 0;
      case 'm':
        return (parseFloat(height) || 0) * 100;
      case 'in':
        return (parseFloat(height) || 0) * 2.54;
      case 'ft':
        return (parseFloat(height) || 0) * 30.48;
      case 'ft_in':
        return ((parseFloat(heightFt) || 0) * 30.48) + ((parseFloat(heightIn) || 0) * 2.54);
      case 'm_cm':
        return ((parseFloat(heightM) || 0) * 100) + (parseFloat(heightCm) || 0);
      default:
        return 0;
    }
  };

  // Convert weight to kg
  const getWeightInKg = (weight: string): number => {
    const w = parseFloat(weight) || 0;
    switch (weightUnit) {
      case 'kg':
        return w;
      case 'lb':
        return w * 0.453592;
      case 'st':
        return w * 6.35029;
      default:
        return 0;
    }
  };

  // Calculate BMR using Mifflin-St Jeor equation
  const calculateBMR = (weightKg: number, heightCm: number, ageYears: number, isMale: boolean): number => {
    if (isMale) {
      return (10 * weightKg) + (6.25 * heightCm) - (5 * ageYears) + 5;
    } else {
      return (10 * weightKg) + (6.25 * heightCm) - (5 * ageYears) - 161;
    }
  };

  // Calculate results
  useEffect(() => {
    const heightCm = getHeightInCm();
    const currentWeightKg = getWeightInKg(currentWeight);
    const targetWeightKg = getWeightInKg(targetWeight);
    const ageNum = parseInt(age) || 0;

    if (heightCm <= 0 || currentWeightKg <= 0 || targetWeightKg <= 0 || ageNum <= 0) {
      setResults(null);
      return;
    }

    // Calculate BMR and TDEE
    const bmr = calculateBMR(currentWeightKg, heightCm, ageNum, sex === 'male');
    const tdee = bmr * activityLevels[activityLevel].multiplier;

    // Calculate days to goal
    const today = new Date();
    const target = new Date(targetDate);
    const daysToGoal = Math.max(1, Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    const weeksToGoal = daysToGoal / 7;

    // Calculate weight to lose (in kg)
    const weightToLose = currentWeightKg - targetWeightKg;

    // 1 kg of body fat = ~7700 calories
    const totalCaloriesDeficit = weightToLose * 7700;
    const dailyDeficit = totalCaloriesDeficit / daysToGoal;
    const weeklyDeficit = dailyDeficit * 7;

    // Calculate daily calorie intake
    const dailyCalories = tdee - dailyDeficit;

    // Calculate pounds per week
    const poundsPerWeek = (weightToLose * 2.205) / weeksToGoal;

    // Safety checks
    let isSafe = true;
    let warning: string | null = null;

    if (weightToLose < 0) {
      // Weight gain goal
      isSafe = true;
      warning = 'Your target weight is higher than your current weight. This calculator shows a calorie surplus for weight gain.';
    } else if (dailyCalories < 1200 && sex === 'female') {
      isSafe = false;
      warning = 'Daily calories are below 1,200. This is not recommended for women. Consider extending your target date.';
    } else if (dailyCalories < 1500 && sex === 'male') {
      isSafe = false;
      warning = 'Daily calories are below 1,500. This is not recommended for men. Consider extending your target date.';
    } else if (poundsPerWeek > 2) {
      isSafe = false;
      warning = `Losing more than 2 lbs/week (${poundsPerWeek.toFixed(1)} lbs/week) is aggressive. Consider extending your target date for sustainable weight loss.`;
    } else if (dailyDeficit > 1000) {
      isSafe = false;
      warning = 'A deficit greater than 1,000 calories/day is aggressive and may be difficult to sustain.';
    }

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      dailyCalories: Math.round(dailyCalories),
      weeklyDeficit: Math.round(weeklyDeficit),
      dailyDeficit: Math.round(dailyDeficit),
      weightToLose: weightToLose,
      daysToGoal,
      weeksToGoal,
      poundsPerWeek,
      isSafe,
      warning,
    });
  }, [sex, age, heightUnit, height, heightFt, heightIn, heightM, heightCm, weightUnit, currentWeight, targetWeight, targetDate, activityLevel]);

  // Format date for display
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How accurate is this calorie deficit calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This calculator uses the Mifflin-St Jeor equation, which is considered one of the most accurate formulas for estimating BMR. However, individual results may vary based on metabolism, muscle mass, and other factors. Use the results as a starting point and adjust based on your actual progress."
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
            <Link href="/" className="text-green-600 hover:text-green-800 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/calculators" className="text-green-600 hover:text-green-800">
              Calculators
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Calorie Deficit Calculator</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white mb-4 shadow-lg">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Calorie Deficit Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate how many calories you need to eat daily to reach your target weight by your goal date. Uses the Mifflin-St Jeor equation for accurate BMR estimation.
          </p>
        </div>

        {/* Personal Details Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
          <button
            onClick={() => setShowPersonalDetails(!showPersonalDetails)}
            className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-green-500 to-emerald-600 text-white"
          >
            <h2 className="text-xl font-semibold flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Personal Details
            </h2>
            {showPersonalDetails ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {showPersonalDetails && (
            <div className="p-6 space-y-5">
              {/* Sex */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setSex('female')}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                      sex === 'female'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 text-gray-600 hover:border-green-300'
                    }`}
                  >
                    Female
                  </button>
                  <button
                    onClick={() => setSex('male')}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                      sex === 'male'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 text-gray-600 hover:border-green-300'
                    }`}
                  >
                    Male
                  </button>
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    placeholder="Age"
                    min="1"
                    max="120"
                  />
                  <span className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium">yrs</span>
                </div>
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                <div className="flex gap-3">
                  {(heightUnit === 'ft_in') ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="number"
                        value={heightFt}
                        onChange={(e) => setHeightFt(e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                        placeholder="Feet"
                        min="0"
                      />
                      <input
                        type="number"
                        value={heightIn}
                        onChange={(e) => setHeightIn(e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                        placeholder="Inches"
                        min="0"
                        max="11"
                      />
                    </div>
                  ) : (heightUnit === 'm_cm') ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="number"
                        value={heightM}
                        onChange={(e) => setHeightM(e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                        placeholder="Meters"
                        min="0"
                      />
                      <input
                        type="number"
                        value={heightCm}
                        onChange={(e) => setHeightCm(e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                        placeholder="cm"
                        min="0"
                        max="99"
                      />
                    </div>
                  ) : (
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      placeholder="Height"
                      min="0"
                      step="any"
                    />
                  )}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowHeightDropdown(!showHeightDropdown);
                        setShowWeightDropdown(false);
                        setShowActivityDropdown(false);
                      }}
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-green-300 transition-all flex items-center gap-2 bg-gray-50 min-w-[100px] justify-between"
                    >
                      <span className="font-medium text-gray-700">{heightUnitLabels[heightUnit]}</span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>
                    {showHeightDropdown && (
                      <div className="absolute right-0 top-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-20 min-w-[200px] overflow-hidden">
                        {(Object.keys(heightUnitLabels) as HeightUnit[]).map((unit) => (
                          <button
                            key={unit}
                            onClick={() => {
                              setHeightUnit(unit);
                              setShowHeightDropdown(false);
                            }}
                            className={`w-full px-4 py-3 text-left hover:bg-green-50 transition-colors ${
                              heightUnit === unit ? 'bg-green-100 text-green-700' : 'text-gray-700'
                            }`}
                          >
                            {unit === 'cm' && 'centimeters (cm)'}
                            {unit === 'm' && 'meters (m)'}
                            {unit === 'in' && 'inches (in)'}
                            {unit === 'ft' && 'feet (ft)'}
                            {unit === 'ft_in' && 'feet / inches (ft / in)'}
                            {unit === 'm_cm' && 'meters / centimeters (m / cm)'}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Current Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Weight</label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    placeholder="Current weight"
                    min="0"
                    step="any"
                  />
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowWeightDropdown(!showWeightDropdown);
                        setShowHeightDropdown(false);
                        setShowActivityDropdown(false);
                      }}
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-green-300 transition-all flex items-center gap-2 bg-gray-50 min-w-[100px] justify-between"
                    >
                      <span className="font-medium text-gray-700">{weightUnitLabels[weightUnit]}</span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>
                    {showWeightDropdown && (
                      <div className="absolute right-0 top-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-20 min-w-[160px] overflow-hidden">
                        {(Object.keys(weightUnitLabels) as WeightUnit[]).map((unit) => (
                          <button
                            key={unit}
                            onClick={() => {
                              setWeightUnit(unit);
                              setShowWeightDropdown(false);
                            }}
                            className={`w-full px-4 py-3 text-left hover:bg-green-50 transition-colors ${
                              weightUnit === unit ? 'bg-green-100 text-green-700' : 'text-gray-700'
                            }`}
                          >
                            {unit === 'kg' && 'kilograms (kg)'}
                            {unit === 'lb' && 'pounds (lb)'}
                            {unit === 'st' && 'stones (st)'}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Target Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Weight</label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    placeholder="Target weight"
                    min="0"
                    step="any"
                  />
                  <span className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium min-w-[100px] text-center">
                    {weightUnitLabels[weightUnit]}
                  </span>
                </div>
              </div>

              {/* Target Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    />
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowActivityDropdown(!showActivityDropdown);
                      setShowHeightDropdown(false);
                      setShowWeightDropdown(false);
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-green-300 transition-all flex items-center justify-between bg-gray-50"
                  >
                    <div className="text-left">
                      <span className="font-medium text-gray-700">{activityLevels[activityLevel].label}</span>
                      <span className="text-sm text-gray-500 ml-2">({activityLevels[activityLevel].description})</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                  {showActivityDropdown && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                      {(Object.keys(activityLevels) as ActivityLevel[]).map((level) => (
                        <button
                          key={level}
                          onClick={() => {
                            setActivityLevel(level);
                            setShowActivityDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-green-50 transition-colors ${
                            activityLevel === level ? 'bg-green-100 text-green-700' : 'text-gray-700'
                          }`}
                        >
                          <div className="font-medium">{activityLevels[level].label}</div>
                          <div className="text-sm text-gray-500">{activityLevels[level].description}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {results && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
            <div className="px-6 py-4 bg-gradient-to-r from-emerald-500 to-green-600">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Results
              </h2>
            </div>

            <div className="p-6 space-y-4">
              {/* Warning Banner */}
              {results.warning && (
                <div className={`p-4 rounded-xl border ${
                  results.isSafe
                    ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{results.warning}</p>
                  </div>
                </div>
              )}

              {/* Main Result */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Calorie deficit to reach goal</p>
                <p className="text-3xl font-bold text-green-700">
                  {results.weightToLose >= 0 ? '' : '+'}{Math.abs(results.dailyDeficit)} kcal/day
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {results.weightToLose >= 0 ? 'deficit' : 'surplus'} needed
                </p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-600">Daily Calorie Target</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{results.dailyCalories} kcal</p>
                  <p className="text-xs text-gray-500">to reach your goal</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Your TDEE</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{results.tdee} kcal</p>
                  <p className="text-xs text-gray-500">maintenance calories</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Calculator className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-600">Your BMR</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{results.bmr} kcal</p>
                  <p className="text-xs text-gray-500">basal metabolic rate</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Scale className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Weight Loss Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {results.weightToLose >= 0 ? '' : '+'}{Math.abs(results.poundsPerWeek).toFixed(1)} lbs/week
                  </p>
                  <p className="text-xs text-gray-500">
                    {results.weightToLose >= 0
                      ? (results.poundsPerWeek <= 1 ? 'safe rate' : results.poundsPerWeek <= 2 ? 'moderate rate' : 'aggressive rate')
                      : 'weight gain'
                    }
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Your Plan Summary</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>
                    <strong>Goal:</strong> {results.weightToLose >= 0 ? 'Lose' : 'Gain'} {Math.abs(results.weightToLose).toFixed(1)} kg ({Math.abs(results.weightToLose * 2.205).toFixed(1)} lbs)
                  </li>
                  <li>
                    <strong>Timeline:</strong> {results.daysToGoal} days ({results.weeksToGoal.toFixed(1)} weeks) until {formatDate(targetDate)}
                  </li>
                  <li>
                    <strong>Daily target:</strong> Eat {results.dailyCalories} calories per day
                  </li>
                  <li>
                    <strong>Weekly {results.weightToLose >= 0 ? 'deficit' : 'surplus'}:</strong> {Math.abs(results.weeklyDeficit).toLocaleString()} calories
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Calorie Intake Plan Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <button
            onClick={() => setShowCaloriePlan(!showCaloriePlan)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Flame className="w-5 h-5 mr-2 text-orange-500" />
              Calorie Intake Plan
            </h3>
            {showCaloriePlan ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {showCaloriePlan && (
            <div className="px-6 pb-6">
              {results ? (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Based on your inputs, here are different calorie targets for various weight loss speeds:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-2 font-semibold text-gray-700">Rate</th>
                          <th className="text-left py-3 px-2 font-semibold text-gray-700">Daily Calories</th>
                          <th className="text-left py-3 px-2 font-semibold text-gray-700">Daily Deficit</th>
                          <th className="text-left py-3 px-2 font-semibold text-gray-700">Weekly Loss</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 hover:bg-green-50">
                          <td className="py-3 px-2 font-medium text-gray-800">Maintain</td>
                          <td className="py-3 px-2">{results.tdee} kcal</td>
                          <td className="py-3 px-2">0 kcal</td>
                          <td className="py-3 px-2">0 lbs</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-green-50">
                          <td className="py-3 px-2 font-medium text-green-700">Mild (0.5 lb/week)</td>
                          <td className="py-3 px-2">{results.tdee - 250} kcal</td>
                          <td className="py-3 px-2">250 kcal</td>
                          <td className="py-3 px-2">0.5 lbs</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-green-50 bg-green-50">
                          <td className="py-3 px-2 font-medium text-green-700">Moderate (1 lb/week)</td>
                          <td className="py-3 px-2 font-semibold">{results.tdee - 500} kcal</td>
                          <td className="py-3 px-2">500 kcal</td>
                          <td className="py-3 px-2">1 lb</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-green-50">
                          <td className="py-3 px-2 font-medium text-orange-700">Aggressive (1.5 lbs/week)</td>
                          <td className="py-3 px-2">{results.tdee - 750} kcal</td>
                          <td className="py-3 px-2">750 kcal</td>
                          <td className="py-3 px-2">1.5 lbs</td>
                        </tr>
                        <tr className="hover:bg-green-50">
                          <td className="py-3 px-2 font-medium text-red-700">Extreme (2 lbs/week)</td>
                          <td className="py-3 px-2">{results.tdee - 1000} kcal</td>
                          <td className="py-3 px-2">1000 kcal</td>
                          <td className="py-3 px-2">2 lbs</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-gray-500">
                    * Recommended: 500 kcal deficit (1 lb/week) for sustainable, healthy weight loss.
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-500">
                  <p>Expect more details here after you have entered all the necessary information above.</p>
                </div>
              )}
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
              <Info className="w-5 h-5 mr-2 text-green-600" />
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
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Mifflin-St Jeor BMR Formula:</h4>
                <div className="bg-white rounded-lg p-3 font-mono text-sm">
                  <p><strong>Men:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5</p>
                  <p className="mt-1"><strong>Women:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">TDEE Calculation:</h4>
                <div className="bg-white rounded-lg p-3 font-mono text-sm">
                  TDEE = BMR × Activity Multiplier
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  <p><strong>Activity Multipliers:</strong></p>
                  <ul className="mt-1 space-y-1">
                    {Object.entries(activityLevels).map(([key, value]) => (
                      <li key={key}>• {value.label}: {value.multiplier}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Calorie Deficit Formula:</h4>
                <div className="bg-white rounded-lg p-3 font-mono text-sm">
                  <p>Daily Calories = TDEE - Daily Deficit</p>
                  <p className="mt-1">1 lb of fat ≈ 3,500 calories</p>
                  <p className="mt-1">1 kg of fat ≈ 7,700 calories</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Educational Content */}
        <div className="prose prose-gray max-w-none">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Scale className="w-6 h-6 mr-2 text-green-600" />
              Understanding Calorie Deficit
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">What is a Calorie Deficit?</h3>
                <p>
                  A <strong>calorie deficit</strong> occurs when you consume fewer calories than your body burns. This forces your body to use stored energy (fat) for fuel, resulting in weight loss. The formula is simple:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mt-2 font-medium text-center">
                  Calorie Deficit = Calories Burned (TDEE) - Calories Consumed
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">How Much Deficit Do You Need?</h3>
                <p>
                  To lose weight at different rates, you need these approximate deficits:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>0.5 lb per week:</strong> 250 calorie daily deficit</li>
                  <li><strong>1 lb per week:</strong> 500 calorie daily deficit (recommended)</li>
                  <li><strong>1.5 lbs per week:</strong> 750 calorie daily deficit</li>
                  <li><strong>2 lbs per week:</strong> 1,000 calorie daily deficit (maximum safe)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Safe Minimum Calories</h3>
                <p>
                  Health experts recommend not going below these daily calorie minimums:
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-3">
                  <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                    <h4 className="font-semibold text-pink-800">Women</h4>
                    <p className="text-2xl font-bold text-pink-700 mt-1">1,200 calories</p>
                    <p className="text-sm text-gray-600">minimum per day</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-800">Men</h4>
                    <p className="text-2xl font-bold text-blue-700 mt-1">1,500 calories</p>
                    <p className="text-sm text-gray-600">minimum per day</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Tips for Success</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Start with a moderate deficit (500 calories) for sustainable results</li>
                  <li>Track your food intake accurately using a food diary or app</li>
                  <li>Include protein in every meal to preserve muscle mass</li>
                  <li>Combine diet with exercise for better results and health</li>
                  <li>Be patient - healthy weight loss takes time</li>
                  <li>Adjust your calories as your weight changes</li>
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
                q: 'How accurate is this calorie deficit calculator?',
                a: 'This calculator uses the Mifflin-St Jeor equation, which is considered one of the most accurate formulas for estimating BMR. However, individual results may vary based on metabolism, muscle mass, and other factors. Use the results as a starting point and adjust based on your actual progress.'
              },
              {
                q: 'Is a 1000 calorie deficit safe?',
                a: 'A 1000 calorie deficit can lead to rapid weight loss (about 2 lbs/week) but may be difficult to sustain and could lead to muscle loss, nutrient deficiencies, and metabolic slowdown. Most experts recommend a 500 calorie deficit for sustainable, healthy weight loss.'
              },
              {
                q: 'Why am I not losing weight despite being in a deficit?',
                a: 'Several factors can affect weight loss: inaccurate calorie counting, water retention, metabolic adaptation, underestimating food portions, or overestimating exercise calories burned. Try tracking more precisely or consult a healthcare professional.'
              },
              {
                q: 'Should I eat back exercise calories?',
                a: 'It depends on your goals. If your deficit is moderate (500 cal), you might eat back some exercise calories to fuel workouts. If your deficit is already aggressive, eating back all exercise calories may slow progress. A good middle ground is eating back 50% of exercise calories.'
              },
              {
                q: 'How often should I recalculate my calorie needs?',
                a: 'Recalculate every 10-15 pounds lost, or monthly. As you lose weight, your TDEE decreases, so your calorie target needs to be adjusted to continue losing weight at the same rate.'
              },
              {
                q: 'What is the difference between BMR and TDEE?',
                a: 'BMR (Basal Metabolic Rate) is the calories your body burns at complete rest. TDEE (Total Daily Energy Expenditure) includes BMR plus calories burned through daily activities and exercise. TDEE = BMR × Activity Factor.'
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
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8 border border-green-100 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Maintenance Calorie Calculator', href: '/calculators/maintenance-calorie-calculator', desc: 'Find your TDEE' },
              { name: 'BMI Calculator', href: '/calculators/bmi-calculator', desc: 'Check your body mass index' },
              { name: 'BMR Calculator', href: '/calculators/bmr-calculator', desc: 'Calculate basal metabolic rate' },
              { name: 'Calorie Calculator', href: '/calculators/calorie-calculator', desc: 'Daily calorie needs' },
              { name: 'Body Shape Calculator', href: '/calculators/body-shape-calculator', desc: 'Find your body type' },
              { name: 'Calories Burned Walking', href: '/calculators/calories-burned-walking-calculator', desc: 'Exercise calorie burn' },
            ].map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:border-green-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                  {calc.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{calc.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-center text-white">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 text-green-200" />
          <h2 className="text-2xl font-bold mb-3">Need Help with Health & Nutrition?</h2>
          <p className="text-green-100 mb-6 max-w-xl mx-auto">
            Our expert tutors can help you understand nutrition science, metabolism, and healthy lifestyle choices!
          </p>
          <Link
            href="/tutoring/free-consultation"
            className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-colors shadow-lg"
          >
            Book Your Free Session
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </main>

      <Footer />

      {/* Click outside to close dropdowns */}
      {(showHeightDropdown || showWeightDropdown || showActivityDropdown) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setShowHeightDropdown(false);
            setShowWeightDropdown(false);
            setShowActivityDropdown(false);
          }}
        />
      )}

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Calorie Deficit Calculator',
            description: 'Free calorie deficit calculator to find how many calories to eat for weight loss. Calculate BMR, TDEE, and daily calorie intake.',
            url: 'https://www.thetutorbridge.com/calculators/calorie-deficit-calculator',
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
