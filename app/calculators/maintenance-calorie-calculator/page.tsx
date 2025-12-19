'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, RotateCcw, Flame, Info, BookOpen, GraduationCap, Activity, Scale, Target, TrendingDown, TrendingUp, Apple, Droplets } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

type Sex = 'male' | 'female';
type HeightUnit = 'cm' | 'ft';
type WeightUnit = 'kg' | 'lb';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'hard' | 'physical' | 'athlete';

interface Results {
  bmr: number;
  maintenanceCalories: number;
  protein: { grams: number; calories: number; percent: number };
  carbs: { grams: number; calories: number; percent: number };
  fat: { grams: number; calories: number; percent: number };
  idealWeight: { min: number; max: number };
  weightChange: {
    mildLoss: number;
    loss: number;
    mildGain: number;
    gain: number;
  };
}

export default function MaintenanceCalorieCalculator() {
  const [sex, setSex] = useState<Sex>('male');
  const [height, setHeight] = useState<string>('');
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm');
  const [heightFeet, setHeightFeet] = useState<string>('');
  const [heightInches, setHeightInches] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [age, setAge] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('sedentary');
  const [results, setResults] = useState<Results | null>(null);
  const [showMacros, setShowMacros] = useState<boolean>(false);
  const [showIdealWeight, setShowIdealWeight] = useState<boolean>(false);
  const [showWeightChange, setShowWeightChange] = useState<boolean>(false);

  // Activity level multipliers (PAL - Physical Activity Level)
  const activityMultipliers: Record<ActivityLevel, { value: number; label: string; description: string }> = {
    sedentary: { value: 1.2, label: 'I do not exercise', description: 'Little or no exercise, desk job' },
    light: { value: 1.4, label: 'I exercise regularly', description: 'Light exercise 1-2 times/week' },
    moderate: { value: 1.6, label: 'I exercise a lot', description: 'Moderate exercise 2-3 times/week' },
    hard: { value: 1.75, label: 'Hard exercise', description: 'Hard exercise 3-5 times/week' },
    physical: { value: 2.0, label: 'I have a physical job', description: 'Physical job or hard exercise 6-7 times/week' },
    athlete: { value: 2.4, label: 'I am a professional athlete', description: 'Professional athlete training' },
  };

  // Get height in cm
  const getHeightInCm = (): number | null => {
    if (heightUnit === 'cm') {
      const h = parseFloat(height);
      return isNaN(h) || h <= 0 ? null : h;
    } else {
      const ft = parseFloat(heightFeet) || 0;
      const inch = parseFloat(heightInches) || 0;
      if (ft === 0 && inch === 0) return null;
      return (ft * 12 + inch) * 2.54;
    }
  };

  // Get weight in kg
  const getWeightInKg = (): number | null => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return null;
    return weightUnit === 'kg' ? w : w * 0.453592;
  };

  // Calculate BMR using Mifflin-St Jeor equation
  const calculateBMR = (weightKg: number, heightCm: number, ageYears: number, gender: Sex): number => {
    if (gender === 'male') {
      return 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5;
    } else {
      return 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
    }
  };

  // Calculate ideal weight range using BMI 18.5-24.9
  const calculateIdealWeight = (heightCm: number): { min: number; max: number } => {
    const heightM = heightCm / 100;
    return {
      min: 18.5 * heightM * heightM,
      max: 24.9 * heightM * heightM,
    };
  };

  // Calculate macros (moderate protein approach)
  const calculateMacros = (calories: number, weightKg: number) => {
    // Protein: 1.6g per kg body weight (good for active individuals)
    const proteinGrams = weightKg * 1.6;
    const proteinCalories = proteinGrams * 4;

    // Fat: 25% of calories
    const fatCalories = calories * 0.25;
    const fatGrams = fatCalories / 9;

    // Carbs: remaining calories
    const carbsCalories = calories - proteinCalories - fatCalories;
    const carbsGrams = carbsCalories / 4;

    return {
      protein: {
        grams: Math.round(proteinGrams),
        calories: Math.round(proteinCalories),
        percent: Math.round((proteinCalories / calories) * 100),
      },
      carbs: {
        grams: Math.round(carbsGrams),
        calories: Math.round(carbsCalories),
        percent: Math.round((carbsCalories / calories) * 100),
      },
      fat: {
        grams: Math.round(fatGrams),
        calories: Math.round(fatCalories),
        percent: 25,
      },
    };
  };

  // Auto-calculate on input change
  useEffect(() => {
    const heightCm = getHeightInCm();
    const weightKg = getWeightInKg();
    const ageNum = parseFloat(age);

    if (!heightCm || !weightKg || isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
      setResults(null);
      return;
    }

    const bmr = calculateBMR(weightKg, heightCm, ageNum, sex);
    const maintenanceCalories = bmr * activityMultipliers[activityLevel].value;
    const macros = calculateMacros(maintenanceCalories, weightKg);
    const idealWeight = calculateIdealWeight(heightCm);

    setResults({
      bmr: Math.round(bmr),
      maintenanceCalories: Math.round(maintenanceCalories),
      ...macros,
      idealWeight,
      weightChange: {
        mildLoss: Math.round(maintenanceCalories - 250),
        loss: Math.round(maintenanceCalories - 500),
        mildGain: Math.round(maintenanceCalories + 250),
        gain: Math.round(maintenanceCalories + 500),
      },
    });
  }, [sex, height, heightUnit, heightFeet, heightInches, weight, weightUnit, age, activityLevel]);

  const handleReset = () => {
    setSex('male');
    setHeight('');
    setHeightUnit('cm');
    setHeightFeet('');
    setHeightInches('');
    setWeight('');
    setWeightUnit('kg');
    setAge('');
    setActivityLevel('sedentary');
    setResults(null);
    setShowMacros(false);
    setShowIdealWeight(false);
    setShowWeightChange(false);
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  // Reference table data for calories by activity level
  const referenceData = [
    { weight: 50, sedentary: 1340, light: 1490, moderate: 1640, hard: 1790, physical: 2090, athlete: 2490 },
    { weight: 60, sedentary: 1460, light: 1620, moderate: 1790, hard: 1950, physical: 2280, athlete: 2720 },
    { weight: 70, sedentary: 1580, light: 1760, moderate: 1940, hard: 2120, physical: 2480, athlete: 2960 },
    { weight: 80, sedentary: 1700, light: 1900, moderate: 2090, hard: 2290, physical: 2670, athlete: 3200 },
    { weight: 90, sedentary: 1820, light: 2040, moderate: 2240, hard: 2450, physical: 2860, athlete: 3440 },
    { weight: 100, sedentary: 1940, light: 2180, moderate: 2400, hard: 2620, light: 3060, athlete: 3680 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm py-3 px-4 sm:px-6 shadow-sm">
        <div className="container mx-auto max-w-4xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-green-600 hover:text-green-800 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/calculators" className="text-green-600 hover:text-green-800">
              Calculators
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Maintenance Calorie Calculator</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
              <Flame className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Maintenance Calorie Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estimate how much energy and nutrients your body needs to maintain your current weight. Calculate your daily calorie needs based on age, sex, height, weight, and activity level.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-600" />
            About You
          </h2>

          {/* Sex Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Sex
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="sex"
                  checked={sex === 'female'}
                  onChange={() => setSex('female')}
                  className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-2 text-gray-700">Female</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="sex"
                  checked={sex === 'male'}
                  onChange={() => setSex('male')}
                  className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-2 text-gray-700">Male</span>
              </label>
            </div>
          </div>

          {/* Height Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Height
            </label>
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => setHeightUnit('cm')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  heightUnit === 'cm'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                cm
              </button>
              <button
                onClick={() => setHeightUnit('ft')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  heightUnit === 'ft'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                ft/in
              </button>
            </div>
            {heightUnit === 'cm' ? (
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter height in cm (e.g., 170)"
                min="0"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
              />
            ) : (
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="number"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    placeholder="Feet"
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    placeholder="Inches"
                    min="0"
                    max="11"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Weight Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Weight
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={`Enter weight in ${weightUnit}`}
                min="0"
                step="0.1"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
              />
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value as WeightUnit)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-700 font-medium"
              >
                <option value="kg">kg</option>
                <option value="lb">lb</option>
              </select>
            </div>
          </div>

          {/* Age Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Age
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age in years"
                min="1"
                max="120"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
              />
              <span className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium">
                yrs
              </span>
            </div>
          </div>

          {/* Activity Level Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Physical activity level
            </label>
            <div className="space-y-2">
              {Object.entries(activityMultipliers).map(([key, { label, description }]) => (
                <label
                  key={key}
                  className={`flex items-start cursor-pointer p-3 rounded-xl border-2 transition-colors ${
                    activityLevel === key
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="activityLevel"
                    checked={activityLevel === key}
                    onChange={() => setActivityLevel(key as ActivityLevel)}
                    className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500 mt-0.5"
                  />
                  <div className="ml-3">
                    <span className="text-gray-800 font-medium">{label}</span>
                    <p className="text-xs text-gray-500">{description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Results Section */}
          {results && (
            <div className="space-y-6">
              <hr className="border-gray-200" />

              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-600" />
                Results
              </h2>

              {/* Main Result - Calories to maintain weight */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Calories to maintain weight
                </label>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-green-700">
                    {formatNumber(results.maintenanceCalories)}
                  </span>
                  <span className="text-lg text-green-600 font-medium">kcal/day</span>
                </div>
                <p className="text-sm text-green-700 mt-2">
                  BMR: {formatNumber(results.bmr)} kcal × Activity factor: {activityMultipliers[activityLevel].value}
                </p>
              </div>

              {/* Optional Sections */}
              <div className="space-y-4">
                {/* Macros Checkbox */}
                <label className="flex items-center cursor-pointer p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={showMacros}
                    onChange={() => setShowMacros(!showMacros)}
                    className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-3 text-gray-700 font-medium">Check calories distribution (%)</span>
                </label>

                {showMacros && (
                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-4">Macronutrient Distribution</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Apple className="w-6 h-6 text-red-600" />
                        </div>
                        <p className="text-xs text-gray-600">Protein</p>
                        <p className="text-xl font-bold text-red-700">{results.protein.grams}g</p>
                        <p className="text-xs text-gray-500">{results.protein.percent}% ({results.protein.calories} kcal)</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-xl">🍞</span>
                        </div>
                        <p className="text-xs text-gray-600">Carbs</p>
                        <p className="text-xl font-bold text-yellow-700">{results.carbs.grams}g</p>
                        <p className="text-xs text-gray-500">{results.carbs.percent}% ({results.carbs.calories} kcal)</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Droplets className="w-6 h-6 text-orange-600" />
                        </div>
                        <p className="text-xs text-gray-600">Fat</p>
                        <p className="text-xl font-bold text-orange-700">{results.fat.grams}g</p>
                        <p className="text-xs text-gray-500">{results.fat.percent}% ({results.fat.calories} kcal)</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Ideal Weight Checkbox */}
                <label className="flex items-center cursor-pointer p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={showIdealWeight}
                    onChange={() => setShowIdealWeight(!showIdealWeight)}
                    className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-3 text-gray-700 font-medium">Check my ideal weight</span>
                </label>

                {showIdealWeight && (
                  <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
                    <h3 className="font-semibold text-purple-800 mb-3 flex items-center">
                      <Scale className="w-5 h-5 mr-2" />
                      Ideal Weight Range (BMI 18.5-24.9)
                    </h3>
                    <div className="flex items-center justify-center gap-4">
                      <div className="text-center">
                        <p className="text-sm text-purple-600">Minimum</p>
                        <p className="text-2xl font-bold text-purple-700">
                          {results.idealWeight.min.toFixed(1)} kg
                        </p>
                        <p className="text-xs text-purple-500">
                          ({(results.idealWeight.min * 2.20462).toFixed(1)} lb)
                        </p>
                      </div>
                      <div className="text-3xl text-purple-400">—</div>
                      <div className="text-center">
                        <p className="text-sm text-purple-600">Maximum</p>
                        <p className="text-2xl font-bold text-purple-700">
                          {results.idealWeight.max.toFixed(1)} kg
                        </p>
                        <p className="text-xs text-purple-500">
                          ({(results.idealWeight.max * 2.20462).toFixed(1)} lb)
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Weight Change Checkbox */}
                <label className="flex items-center cursor-pointer p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={showWeightChange}
                    onChange={() => setShowWeightChange(!showWeightChange)}
                    className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-3 text-gray-700 font-medium">I want to change my weight</span>
                </label>

                {showWeightChange && (
                  <div className="space-y-4">
                    {/* Weight Loss */}
                    <div className="bg-red-50 rounded-xl p-5 border border-red-200">
                      <h3 className="font-semibold text-red-800 mb-3 flex items-center">
                        <TrendingDown className="w-5 h-5 mr-2" />
                        To Lose Weight
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-3 border border-red-100">
                          <p className="text-xs text-red-600">Mild loss (0.25 kg/week)</p>
                          <p className="text-xl font-bold text-red-700">{formatNumber(results.weightChange.mildLoss)} kcal</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-red-100">
                          <p className="text-xs text-red-600">Weight loss (0.5 kg/week)</p>
                          <p className="text-xl font-bold text-red-700">{formatNumber(results.weightChange.loss)} kcal</p>
                        </div>
                      </div>
                    </div>

                    {/* Weight Gain */}
                    <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                      <h3 className="font-semibold text-emerald-800 mb-3 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        To Gain Weight
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-3 border border-emerald-100">
                          <p className="text-xs text-emerald-600">Mild gain (0.25 kg/week)</p>
                          <p className="text-xl font-bold text-emerald-700">{formatNumber(results.weightChange.mildGain)} kcal</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-emerald-100">
                          <p className="text-xs text-emerald-600">Weight gain (0.5 kg/week)</p>
                          <p className="text-xl font-bold text-emerald-700">{formatNumber(results.weightChange.gain)} kcal</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Reset Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleReset}
              className="flex items-center px-6 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear all changes
            </button>
          </div>
        </div>

        {/* Formula Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-green-600" />
            How Maintenance Calories Are Calculated
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Step 1: Calculate BMR (Mifflin-St Jeor Equation)</h3>
              <p className="text-gray-600 text-sm mb-3">
                Basal Metabolic Rate (BMR) is the number of calories your body needs at complete rest.
              </p>
              <div className="bg-green-50 rounded-xl p-4 space-y-2">
                <div className="font-mono text-sm">
                  <span className="text-blue-700 font-semibold">Men:</span> BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5
                </div>
                <div className="font-mono text-sm">
                  <span className="text-pink-700 font-semibold">Women:</span> BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Step 2: Apply Activity Multiplier (PAL)</h3>
              <p className="text-gray-600 text-sm mb-3">
                Multiply BMR by your Physical Activity Level (PAL) to get maintenance calories.
              </p>
              <div className="bg-blue-50 rounded-xl p-4 font-mono text-center">
                Maintenance Calories = BMR × Activity Level
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Activity Level Multipliers</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-2 px-3 font-semibold text-gray-700">Activity Level</th>
                      <th className="text-center py-2 px-3 font-semibold text-gray-700">PAL</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-700">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(activityMultipliers).map(([key, { value, label, description }]) => (
                      <tr key={key} className="border-b border-gray-100">
                        <td className="py-2 px-3 text-gray-800">{label}</td>
                        <td className="py-2 px-3 text-center font-semibold text-green-700">{value}</td>
                        <td className="py-2 px-3 text-gray-600 text-xs">{description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Reference Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Scale className="w-5 h-5 mr-2 text-green-600" />
            Quick Reference: Daily Maintenance Calories
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Approximate maintenance calories for a 30-year-old, 170 cm person at different weights and activity levels:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-2 font-semibold text-gray-700">Weight</th>
                  <th className="text-center py-2 px-2 font-semibold text-gray-700">Sedentary</th>
                  <th className="text-center py-2 px-2 font-semibold text-gray-700">Light</th>
                  <th className="text-center py-2 px-2 font-semibold text-gray-700">Moderate</th>
                  <th className="text-center py-2 px-2 font-semibold text-gray-700">Active</th>
                </tr>
              </thead>
              <tbody>
                {referenceData.map((row) => (
                  <tr key={row.weight} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-2 font-medium text-gray-800">{row.weight} kg</td>
                    <td className="py-2 px-2 text-center text-gray-700">{row.sedentary}</td>
                    <td className="py-2 px-2 text-center text-gray-700">{row.light}</td>
                    <td className="py-2 px-2 text-center text-gray-700">{row.moderate}</td>
                    <td className="py-2 px-2 text-center text-green-700 font-medium">{row.physical}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            * Values are estimates. Your actual needs may vary based on metabolism, age, and other factors.
          </p>
        </div>

        {/* Educational Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2 text-green-600" />
            Understanding Maintenance Calories
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What Are Maintenance Calories?</h3>
              <p className="text-gray-600 leading-relaxed">
                Maintenance calories (also called TDEE - Total Daily Energy Expenditure) represent the total number
                of calories your body burns in a day. This includes your basal metabolism (BMR), physical activity,
                digestion of food (thermic effect), and non-exercise activity like walking and fidgeting.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Why Does It Matter?</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Weight Maintenance:</strong> Eating at maintenance calories keeps your weight stable</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Weight Loss:</strong> Eating below maintenance creates a calorie deficit</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Weight Gain:</strong> Eating above maintenance creates a surplus for muscle or weight gain</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Performance:</strong> Athletes need accurate calorie targets for optimal performance</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Factors Affecting Your Maintenance Calories</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="font-medium text-gray-800 mb-1">Age</p>
                  <p className="text-sm text-gray-600">Metabolism slows ~2% per decade after 20</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="font-medium text-gray-800 mb-1">Sex</p>
                  <p className="text-sm text-gray-600">Men typically have higher BMR due to muscle mass</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="font-medium text-gray-800 mb-1">Body Composition</p>
                  <p className="text-sm text-gray-600">More muscle = higher calorie burn at rest</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="font-medium text-gray-800 mb-1">Activity Level</p>
                  <p className="text-sm text-gray-600">Physical activity is the most variable factor</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Important Note</h3>
              <p className="text-sm text-yellow-700">
                This calculator provides an estimate based on formulas. Your actual maintenance calories may differ
                by 10-20%. Track your weight for 2-4 weeks while eating at the calculated level to find your true
                maintenance. Adjust up or down based on whether you gain, lose, or maintain weight.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-green-600" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is TDEE vs BMR?</h3>
              <p className="text-gray-600">
                <strong>BMR (Basal Metabolic Rate)</strong> is the calories your body burns at complete rest just to
                keep you alive (breathing, circulation, brain function). <strong>TDEE (Total Daily Energy Expenditure)</strong>
                is your BMR plus all the calories burned through physical activity. TDEE equals your maintenance calories.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How accurate is this calculator?</h3>
              <p className="text-gray-600">
                The Mifflin-St Jeor equation is considered the most accurate formula for the general population,
                with about ±10% accuracy. Individual variations in metabolism, muscle mass, hormones, and other
                factors can cause your actual needs to differ. Use the result as a starting point.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Why do maintenance calories decrease with age?</h3>
              <p className="text-gray-600">
                As we age, we typically lose muscle mass (sarcopenia) and our metabolic processes slow down.
                This reduces BMR by approximately 2% per decade after age 20. Maintaining muscle through
                resistance training can help minimize this decline.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Should I eat back exercise calories?</h3>
              <p className="text-gray-600">
                If you selected an activity level that reflects your regular exercise, don&apos;t eat back additional
                calories. If you chose &quot;sedentary&quot; and exercise separately, you can eat back 50-75% of exercise
                calories (fitness trackers often overestimate by 20-30%).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How often should I recalculate my maintenance calories?</h3>
              <p className="text-gray-600">
                Recalculate every 5-10 kg (10-20 lbs) of weight change, or every 2-3 months. As your weight changes,
                your calorie needs change too. Also recalculate if your activity level changes significantly.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Why do men have higher maintenance calories than women?</h3>
              <p className="text-gray-600">
                On average, men have more muscle mass and less body fat than women. Muscle tissue is metabolically
                active and burns more calories at rest than fat tissue. Additionally, hormonal differences affect
                metabolic rate.
              </p>
            </div>
          </div>
        </div>

        {/* Related Calculators */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/calculators/calorie-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Calorie Calculator</h3>
              <p className="text-sm text-gray-600">Calculate calories for weight loss, maintenance, or muscle gain</p>
            </Link>
            <Link
              href="/calculators/bmr-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">BMR Calculator</h3>
              <p className="text-sm text-gray-600">Calculate your Basal Metabolic Rate using multiple formulas</p>
            </Link>
            <Link
              href="/calculators/bmi-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">BMI Calculator</h3>
              <p className="text-sm text-gray-600">Calculate Body Mass Index for health assessment</p>
            </Link>
            <Link
              href="/calculators/calories-burned-walking-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Calories Burned Walking</h3>
              <p className="text-sm text-gray-600">Calculate calories burned from walking by distance or steps</p>
            </Link>
          </div>
        </div>

        {/* Book Your Session CTA */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2563eb] rounded-2xl shadow-xl p-6 sm:p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <GraduationCap className="w-12 h-12 text-[#FFC857] mr-4 flex-shrink-0" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Need Help with Nutrition & Health Goals?</h2>
                <p className="text-blue-100">
                  Our tutors can help you understand nutrition science and create a personalized eating plan.
                </p>
              </div>
            </div>
            <Link
              href="/book-demo-class"
              className="inline-flex items-center px-6 py-3 bg-[#FFC857] text-[#1A3D7C] font-bold rounded-xl hover:bg-yellow-400 transition-colors whitespace-nowrap"
            >
              Book Your Session
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Maintenance Calorie Calculator",
            "description": "Calculate how many calories you need daily to maintain your current weight based on BMR, age, sex, and activity level.",
            "url": "https://www.thetutorbridge.com/calculators/maintenance-calorie-calculator",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "The Tutor Bridge"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is TDEE vs BMR?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "BMR (Basal Metabolic Rate) is the calories your body burns at complete rest. TDEE (Total Daily Energy Expenditure) is your BMR plus all calories burned through physical activity. TDEE equals your maintenance calories."
                }
              },
              {
                "@type": "Question",
                "name": "How accurate is the maintenance calorie calculator?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Mifflin-St Jeor equation is considered the most accurate formula for the general population, with about ±10% accuracy. Individual variations in metabolism, muscle mass, and hormones can cause your actual needs to differ."
                }
              },
              {
                "@type": "Question",
                "name": "Why do maintenance calories decrease with age?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "As we age, we typically lose muscle mass and our metabolic processes slow down. This reduces BMR by approximately 2% per decade after age 20. Maintaining muscle through resistance training can help minimize this decline."
                }
              },
              {
                "@type": "Question",
                "name": "How often should I recalculate my maintenance calories?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Recalculate every 5-10 kg (10-20 lbs) of weight change, or every 2-3 months. As your weight changes, your calorie needs change too."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
