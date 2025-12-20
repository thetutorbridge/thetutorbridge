'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, ArrowRight, Activity, TrendingDown, TrendingUp, Minus, Info, Target, Apple, Flame, Scale, Heart } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CalorieResult {
  bmr: number;
  maintenance: number;
  mildWeightLoss: number;
  weightLoss: number;
  extremeWeightLoss: number;
  mildWeightGain: number;
  weightGain: number;
  extremeWeightGain: number;
  formula: string;
  steps: string[];
}

export default function CalorieCalculator() {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('');
  const [formula, setFormula] = useState<'mifflin' | 'harris' | 'katch'>('mifflin');

  // Metric inputs
  const [weightKg, setWeightKg] = useState<string>('');
  const [heightCm, setHeightCm] = useState<string>('');

  // Imperial inputs
  const [weightLbs, setWeightLbs] = useState<string>('');
  const [heightFeet, setHeightFeet] = useState<string>('');
  const [heightInches, setHeightInches] = useState<string>('');

  // Activity level and body fat
  const [activityLevel, setActivityLevel] = useState<string>('1.2');
  const [bodyFat, setBodyFat] = useState<string>('');

  const [result, setResult] = useState<CalorieResult | null>(null);
  const [error, setError] = useState<string>('');

  const activityLevels = [
    { value: '1.2', label: 'Sedentary', description: 'Little or no exercise' },
    { value: '1.375', label: 'Light', description: 'Exercise 1-3 times/week' },
    { value: '1.55', label: 'Moderate', description: 'Exercise 4-5 times/week' },
    { value: '1.725', label: 'Active', description: 'Daily exercise or intense 3-4 times/week' },
    { value: '1.9', label: 'Very Active', description: 'Intense exercise 6-7 times/week' },
    { value: '2.0', label: 'Extra Active', description: 'Very intense daily exercise or physical job' },
  ];

  const calculateCalories = () => {
    setError('');
    setResult(null);

    // Validation
    if (!age || parseFloat(age) <= 0 || parseFloat(age) > 120) {
      setError('Please enter a valid age between 1 and 120');
      return;
    }

    let weightInKg = 0;
    let heightInCm = 0;

    if (unitSystem === 'metric') {
      if (!weightKg || parseFloat(weightKg) <= 0) {
        setError('Please enter a valid weight in kg');
        return;
      }
      if (!heightCm || parseFloat(heightCm) <= 0) {
        setError('Please enter a valid height in cm');
        return;
      }
      weightInKg = parseFloat(weightKg);
      heightInCm = parseFloat(heightCm);
    } else {
      if (!weightLbs || parseFloat(weightLbs) <= 0) {
        setError('Please enter a valid weight in lbs');
        return;
      }
      if (!heightFeet && !heightInches) {
        setError('Please enter a valid height');
        return;
      }
      weightInKg = parseFloat(weightLbs) * 0.453592;
      const totalInches = (parseFloat(heightFeet) || 0) * 12 + (parseFloat(heightInches) || 0);
      heightInCm = totalInches * 2.54;
    }

    const ageNum = parseFloat(age);
    const activityMultiplier = parseFloat(activityLevel);

    let bmr = 0;
    let formulaUsed = '';
    const steps: string[] = [];

    // Calculate BMR based on selected formula
    if (formula === 'mifflin') {
      // Mifflin-St Jeor Equation
      formulaUsed = 'Mifflin-St Jeor';
      if (gender === 'male') {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * ageNum + 5;
        steps.push(`BMR (Male) = 10 × ${weightInKg.toFixed(1)} + 6.25 × ${heightInCm.toFixed(1)} - 5 × ${ageNum} + 5`);
      } else {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * ageNum - 161;
        steps.push(`BMR (Female) = 10 × ${weightInKg.toFixed(1)} + 6.25 × ${heightInCm.toFixed(1)} - 5 × ${ageNum} - 161`);
      }
      steps.push(`BMR = ${bmr.toFixed(2)} calories/day`);
    } else if (formula === 'harris') {
      // Revised Harris-Benedict Equation
      formulaUsed = 'Harris-Benedict';
      if (gender === 'male') {
        bmr = 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * ageNum + 88.362;
        steps.push(`BMR (Male) = 13.397 × ${weightInKg.toFixed(1)} + 4.799 × ${heightInCm.toFixed(1)} - 5.677 × ${ageNum} + 88.362`);
      } else {
        bmr = 9.247 * weightInKg + 3.098 * heightInCm - 4.330 * ageNum + 447.593;
        steps.push(`BMR (Female) = 9.247 × ${weightInKg.toFixed(1)} + 3.098 × ${heightInCm.toFixed(1)} - 4.330 × ${ageNum} + 447.593`);
      }
      steps.push(`BMR = ${bmr.toFixed(2)} calories/day`);
    } else {
      // Katch-McArdle Formula
      formulaUsed = 'Katch-McArdle';
      if (!bodyFat || parseFloat(bodyFat) <= 0 || parseFloat(bodyFat) >= 100) {
        setError('Katch-McArdle formula requires body fat percentage (1-99%)');
        return;
      }
      const bodyFatPercent = parseFloat(bodyFat) / 100;
      const leanBodyMass = weightInKg * (1 - bodyFatPercent);
      bmr = 370 + 21.6 * leanBodyMass;
      steps.push(`Lean Body Mass = ${weightInKg.toFixed(1)} × (1 - ${bodyFatPercent.toFixed(3)}) = ${leanBodyMass.toFixed(2)} kg`);
      steps.push(`BMR = 370 + 21.6 × ${leanBodyMass.toFixed(2)}`);
      steps.push(`BMR = ${bmr.toFixed(2)} calories/day`);
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const maintenance = bmr * activityMultiplier;
    steps.push(`\nTDEE = BMR × Activity Level`);
    steps.push(`TDEE = ${bmr.toFixed(2)} × ${activityMultiplier} = ${maintenance.toFixed(2)} calories/day`);

    // Calculate different goal calories
    const mildWeightLoss = maintenance - 250; // 0.5 lb per week
    const weightLoss = maintenance - 500; // 1 lb per week
    const extremeWeightLoss = maintenance - 1000; // 2 lbs per week
    const mildWeightGain = maintenance + 250; // 0.5 lb per week
    const weightGain = maintenance + 500; // 1 lb per week
    const extremeWeightGain = maintenance + 1000; // 2 lbs per week

    setResult({
      bmr,
      maintenance,
      mildWeightLoss,
      weightLoss,
      extremeWeightLoss,
      mildWeightGain,
      weightGain,
      extremeWeightGain,
      formula: formulaUsed,
      steps,
    });
  };

  const reset = () => {
    setAge('');
    setWeightKg('');
    setHeightCm('');
    setWeightLbs('');
    setHeightFeet('');
    setHeightInches('');
    setBodyFat('');
    setActivityLevel('1.2');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600 transition-colors">
              <Home className="h-4 w-4" />
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-orange-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-orange-600 font-medium">Calorie Calculator</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl mb-4 shadow-lg">
            <Flame className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Calorie Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your daily calorie needs for weight loss, maintenance, or muscle gain based on BMR and activity level
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Calculator Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Calculate Calories</h2>
            </div>

            <div className="space-y-6">
              {/* Unit System Toggle */}
              <div>
                <Label className="text-base font-semibold text-gray-700 mb-3 block">Unit System</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setUnitSystem('metric')}
                    className={`py-3 px-4 rounded-xl font-medium transition-all ${
                      unitSystem === 'metric'
                        ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Metric (kg, cm)
                  </button>
                  <button
                    onClick={() => setUnitSystem('imperial')}
                    className={`py-3 px-4 rounded-xl font-medium transition-all ${
                      unitSystem === 'imperial'
                        ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Imperial (lbs, ft/in)
                  </button>
                </div>
              </div>

              {/* Gender Selection */}
              <div>
                <Label className="text-base font-semibold text-gray-700 mb-3 block">Gender</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setGender('male')}
                    className={`py-3 px-4 rounded-xl font-medium transition-all ${
                      gender === 'male'
                        ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`py-3 px-4 rounded-xl font-medium transition-all ${
                      gender === 'female'
                        ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Age */}
              <div>
                <Label htmlFor="age" className="text-base font-semibold text-gray-700 mb-3 block">
                  Age (years)
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                  className="text-lg py-6"
                  min="1"
                  max="120"
                />
              </div>

              {/* Weight Input */}
              {unitSystem === 'metric' ? (
                <div>
                  <Label htmlFor="weightKg" className="text-base font-semibold text-gray-700 mb-3 block">
                    Weight (kg)
                  </Label>
                  <Input
                    id="weightKg"
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    placeholder="Enter weight in kilograms"
                    className="text-lg py-6"
                    step="0.1"
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor="weightLbs" className="text-base font-semibold text-gray-700 mb-3 block">
                    Weight (lbs)
                  </Label>
                  <Input
                    id="weightLbs"
                    type="number"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(e.target.value)}
                    placeholder="Enter weight in pounds"
                    className="text-lg py-6"
                    step="0.1"
                  />
                </div>
              )}

              {/* Height Input */}
              {unitSystem === 'metric' ? (
                <div>
                  <Label htmlFor="heightCm" className="text-base font-semibold text-gray-700 mb-3 block">
                    Height (cm)
                  </Label>
                  <Input
                    id="heightCm"
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    placeholder="Enter height in centimeters"
                    className="text-lg py-6"
                    step="0.1"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="heightFeet" className="text-base font-semibold text-gray-700 mb-3 block">
                      Height (feet)
                    </Label>
                    <Input
                      id="heightFeet"
                      type="number"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      placeholder="Feet"
                      className="text-lg py-6"
                    />
                  </div>
                  <div>
                    <Label htmlFor="heightInches" className="text-base font-semibold text-gray-700 mb-3 block">
                      Height (inches)
                    </Label>
                    <Input
                      id="heightInches"
                      type="number"
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      placeholder="Inches"
                      className="text-lg py-6"
                    />
                  </div>
                </div>
              )}

              {/* Activity Level */}
              <div>
                <Label htmlFor="activity" className="text-base font-semibold text-gray-700 mb-3 block">
                  Activity Level
                </Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger className="text-lg py-6">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {activityLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value} className="py-3">
                        <div>
                          <div className="font-semibold">{level.label}</div>
                          <div className="text-xs text-gray-500">{level.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Formula Selection */}
              <div>
                <Label className="text-base font-semibold text-gray-700 mb-3 block">BMR Formula</Label>
                <Select value={formula} onValueChange={(value: 'mifflin' | 'harris' | 'katch') => setFormula(value)}>
                  <SelectTrigger className="text-lg py-6">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mifflin" className="py-3">
                      <div>
                        <div className="font-semibold">Mifflin-St Jeor (Recommended)</div>
                        <div className="text-xs text-gray-500">Most accurate for general population</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="harris" className="py-3">
                      <div>
                        <div className="font-semibold">Harris-Benedict (Revised)</div>
                        <div className="text-xs text-gray-500">Traditional formula, slightly less accurate</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="katch" className="py-3">
                      <div>
                        <div className="font-semibold">Katch-McArdle</div>
                        <div className="text-xs text-gray-500">Requires body fat % - most accurate</div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Body Fat Percentage (for Katch-McArdle) */}
              {formula === 'katch' && (
                <div>
                  <Label htmlFor="bodyFat" className="text-base font-semibold text-gray-700 mb-3 block">
                    Body Fat Percentage (%)
                  </Label>
                  <Input
                    id="bodyFat"
                    type="number"
                    value={bodyFat}
                    onChange={(e) => setBodyFat(e.target.value)}
                    placeholder="Enter body fat percentage"
                    className="text-lg py-6"
                    step="0.1"
                    min="1"
                    max="99"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Required for Katch-McArdle formula. Average: Men 15-20%, Women 20-25%
                  </p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={calculateCalories}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate
                </Button>
                <Button
                  onClick={reset}
                  variant="outline"
                  className="px-6 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            {result ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Your Results</h2>
                </div>

                {/* BMR */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold text-blue-900">Basal Metabolic Rate (BMR)</span>
                    <Heart className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-4xl font-bold text-blue-600 mb-2">{result.bmr.toFixed(0)} cal/day</p>
                  <p className="text-sm text-blue-700">Calories burned at complete rest ({result.formula} Formula)</p>
                </div>

                {/* Maintenance */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold text-green-900">Maintenance Calories</span>
                    <Minus className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-4xl font-bold text-green-600 mb-2">{result.maintenance.toFixed(0)} cal/day</p>
                  <p className="text-sm text-green-700">To maintain your current weight</p>
                </div>

                {/* Weight Loss Section */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <TrendingDown className="h-5 w-5 mr-2 text-red-600" />
                    Weight Loss Goals
                  </h3>

                  <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">Mild Weight Loss</p>
                        <p className="text-xs text-gray-600">0.5 lb/week</p>
                      </div>
                      <p className="text-2xl font-bold text-red-600">{result.mildWeightLoss.toFixed(0)}</p>
                    </div>
                  </div>

                  <div className="bg-red-100 rounded-xl p-4 border border-red-300">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">Weight Loss</p>
                        <p className="text-xs text-gray-600">1 lb/week (recommended)</p>
                      </div>
                      <p className="text-2xl font-bold text-red-700">{result.weightLoss.toFixed(0)}</p>
                    </div>
                  </div>

                  <div className="bg-red-200 rounded-xl p-4 border border-red-400">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">Extreme Weight Loss</p>
                        <p className="text-xs text-gray-600">2 lbs/week (not recommended)</p>
                      </div>
                      <p className="text-2xl font-bold text-red-800">{result.extremeWeightLoss.toFixed(0)}</p>
                    </div>
                  </div>
                </div>

                {/* Weight Gain Section */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                    Weight Gain Goals
                  </h3>

                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">Mild Weight Gain</p>
                        <p className="text-xs text-gray-600">0.5 lb/week</p>
                      </div>
                      <p className="text-2xl font-bold text-green-600">{result.mildWeightGain.toFixed(0)}</p>
                    </div>
                  </div>

                  <div className="bg-green-100 rounded-xl p-4 border border-green-300">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">Weight Gain</p>
                        <p className="text-xs text-gray-600">1 lb/week (recommended)</p>
                      </div>
                      <p className="text-2xl font-bold text-green-700">{result.weightGain.toFixed(0)}</p>
                    </div>
                  </div>

                  <div className="bg-green-200 rounded-xl p-4 border border-green-400">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">Fast Weight Gain</p>
                        <p className="text-xs text-gray-600">2 lbs/week</p>
                      </div>
                      <p className="text-2xl font-bold text-green-800">{result.extremeWeightGain.toFixed(0)}</p>
                    </div>
                  </div>
                </div>

                {/* Calculation Steps */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Info className="h-5 w-5 mr-2 text-gray-600" />
                    Calculation Steps
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700 font-mono">
                    {result.steps.map((step, index) => (
                      <p key={index} className="leading-relaxed">{step}</p>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl flex items-center justify-center mb-6">
                  <Flame className="h-12 w-12 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Calculate Your Calories</h3>
                <p className="text-gray-600 max-w-sm">
                  Enter your details and select your activity level to calculate your daily calorie needs
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Calorie Calculation</h2>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What is a Calorie?</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                A <strong>calorie</strong> is a unit of energy. In nutrition, calories refer to the energy people get from the food and drink they consume, and the energy they use in physical activity. Calories are essential to human health; the key is consuming the right amount for your goals and activity level.
              </p>
              <p className="text-gray-700 leading-relaxed">
                When we talk about "calories" in food, we're actually referring to <strong>kilocalories (kcal)</strong>, where 1 kcal = 1,000 calories. However, the term "calorie" is commonly used in everyday language to mean kilocalorie.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What is BMR (Basal Metabolic Rate)?</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Basal Metabolic Rate (BMR)</strong> is the number of calories your body burns at complete rest to maintain vital functions such as breathing, circulation, nutrient processing, and cell production. BMR accounts for about 60-75% of your total daily energy expenditure.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Your BMR is influenced by several factors including age, gender, weight, height, muscle mass, and genetics. Generally, men have a higher BMR than women due to greater muscle mass, and BMR tends to decrease with age.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">BMR Calculation Formulas</h3>

              <div className="mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3">1. Mifflin-St Jeor Equation (Recommended)</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Mifflin-St Jeor equation, developed in 1990, is considered the most accurate formula for calculating BMR for the general population. It has been validated by numerous studies and is recommended by the Academy of Nutrition and Dietetics.
                </p>
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200 my-4">
                  <p className="font-semibold text-gray-900 mb-3">For Men:</p>
                  <div className="font-mono text-lg mb-4">
                    BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) + 5
                  </div>
                  <p className="font-semibold text-gray-900 mb-3">For Women:</p>
                  <div className="font-mono text-lg">
                    BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) - 161
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3">2. Harris-Benedict Equation (Revised)</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Harris-Benedict equation was first introduced in 1919 and revised in 1984. While still widely used, it's generally considered slightly less accurate than the Mifflin-St Jeor equation.
                </p>
                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200 my-4">
                  <p className="font-semibold text-gray-900 mb-3">For Men:</p>
                  <div className="font-mono text-sm mb-4">
                    BMR = 13.397 × weight(kg) + 4.799 × height(cm) - 5.677 × age(years) + 88.362
                  </div>
                  <p className="font-semibold text-gray-900 mb-3">For Women:</p>
                  <div className="font-mono text-sm">
                    BMR = 9.247 × weight(kg) + 3.098 × height(cm) - 4.330 × age(years) + 447.593
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3">3. Katch-McArdle Formula</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Katch-McArdle formula is considered the most accurate when body fat percentage is known. It's based on lean body mass rather than total body weight, making it particularly useful for athletes and bodybuilders.
                </p>
                <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200 my-4">
                  <div className="font-mono text-lg mb-3">
                    BMR = 370 + 21.6 × Lean Body Mass(kg)
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Where: Lean Body Mass = weight(kg) × (1 - body fat percentage)
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">TDEE (Total Daily Energy Expenditure)</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>TDEE</strong> represents the total number of calories you burn per day, accounting for all activities. It's calculated by multiplying your BMR by an activity factor that represents your lifestyle and exercise habits.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 my-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Activity Level Multipliers:</h4>
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Activity Level</th>
                      <th className="text-center py-3 px-4 font-bold text-gray-900">Multiplier</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Sedentary</td>
                      <td className="text-center py-3 px-4">1.2</td>
                      <td className="py-3 px-4">Little or no exercise, desk job</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Light</td>
                      <td className="text-center py-3 px-4">1.375</td>
                      <td className="py-3 px-4">Light exercise 1-3 times/week</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Moderate</td>
                      <td className="text-center py-3 px-4">1.55</td>
                      <td className="py-3 px-4">Moderate exercise 4-5 times/week</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Active</td>
                      <td className="text-center py-3 px-4">1.725</td>
                      <td className="py-3 px-4">Daily exercise or intense exercise 3-4 times/week</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Very Active</td>
                      <td className="text-center py-3 px-4">1.9</td>
                      <td className="py-3 px-4">Intense exercise 6-7 times/week</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">Extra Active</td>
                      <td className="text-center py-3 px-4">2.0</td>
                      <td className="py-3 px-4">Very intense daily exercise or physical job</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200 my-4">
                <p className="font-semibold text-gray-900 mb-2">TDEE Formula:</p>
                <div className="font-mono text-lg">
                  TDEE = BMR × Activity Level Multiplier
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Calorie Deficit for Weight Loss</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To lose weight, you need to create a <strong>calorie deficit</strong>, meaning you consume fewer calories than your body burns. One pound of fat equals approximately 3,500 calories. Therefore:
              </p>

              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200 my-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 text-xl">•</span>
                    <span><strong>500 calorie daily deficit</strong> = 1 lb weight loss per week (recommended)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 text-xl">•</span>
                    <span><strong>250 calorie daily deficit</strong> = 0.5 lb weight loss per week (mild)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 text-xl">•</span>
                    <span><strong>1000 calorie daily deficit</strong> = 2 lb weight loss per week (extreme, not recommended for most)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-300 my-6">
                <p className="text-yellow-900 font-semibold mb-2">⚠️ Important Safety Guidelines:</p>
                <ul className="space-y-2 text-yellow-900">
                  <li>• Women should not consume less than 1,200 calories per day</li>
                  <li>• Men should not consume less than 1,500 calories per day</li>
                  <li>• Extreme calorie restriction can slow metabolism and cause nutrient deficiencies</li>
                  <li>• Always consult a healthcare provider before starting any weight loss plan</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Calorie Surplus for Weight Gain</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To gain weight (muscle or overall mass), you need a <strong>calorie surplus</strong>, consuming more calories than you burn. For healthy weight gain, especially muscle building, a moderate surplus combined with strength training is recommended.
              </p>

              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200 my-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 text-xl">•</span>
                    <span><strong>250 calorie daily surplus</strong> = 0.5 lb weight gain per week (lean gain)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 text-xl">•</span>
                    <span><strong>500 calorie daily surplus</strong> = 1 lb weight gain per week (recommended)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 text-xl">•</span>
                    <span><strong>1000 calorie daily surplus</strong> = 2 lb weight gain per week (fast gain)</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed">
                For muscle building, combine your calorie surplus with progressive resistance training and adequate protein intake (1.6-2.2g per kg of body weight). A smaller surplus (250-300 calories) minimizes fat gain while maximizing muscle growth.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Macronutrient Distribution</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Calories come from three macronutrients: carbohydrates, proteins, and fats. Each provides different amounts of energy per gram:
              </p>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 my-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Macronutrient</th>
                      <th className="text-center py-3 px-4 font-bold text-gray-900">Calories per Gram</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Primary Function</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Carbohydrates</td>
                      <td className="text-center py-3 px-4 text-xl font-bold text-blue-600">4</td>
                      <td className="py-3 px-4">Primary energy source, fuel for brain and muscles</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Protein</td>
                      <td className="text-center py-3 px-4 text-xl font-bold text-green-600">4</td>
                      <td className="py-3 px-4">Muscle building and repair, enzyme production</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Fat</td>
                      <td className="text-center py-3 px-4 text-xl font-bold text-orange-600">9</td>
                      <td className="py-3 px-4">Hormone production, vitamin absorption, energy storage</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">Alcohol</td>
                      <td className="text-center py-3 px-4 text-xl font-bold text-red-600">7</td>
                      <td className="py-3 px-4">No nutritional value (empty calories)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="text-xl font-bold text-gray-900 mb-3">Recommended Macronutrient Ratios:</h4>
              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <h5 className="font-bold text-blue-900 mb-3">Balanced Diet</h5>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li>Carbs: 45-65%</li>
                    <li>Protein: 10-35%</li>
                    <li>Fat: 20-35%</li>
                  </ul>
                </div>
                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                  <h5 className="font-bold text-green-900 mb-3">High Protein (Muscle Gain)</h5>
                  <ul className="space-y-2 text-green-800 text-sm">
                    <li>Carbs: 40-50%</li>
                    <li>Protein: 30-40%</li>
                    <li>Fat: 20-30%</li>
                  </ul>
                </div>
                <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
                  <h5 className="font-bold text-orange-900 mb-3">Low Carb</h5>
                  <ul className="space-y-2 text-orange-800 text-sm">
                    <li>Carbs: 10-30%</li>
                    <li>Protein: 25-35%</li>
                    <li>Fat: 40-60%</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Zigzag Calorie Cycling</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Zigzag calorie cycling</strong> involves alternating between higher and lower calorie days throughout the week while maintaining the same weekly average. This approach may help prevent metabolic adaptation and can make dieting more sustainable.
              </p>

              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200 my-6">
                <h4 className="text-lg font-bold text-purple-900 mb-4">Example 7-Day Zigzag Pattern (for 2000 cal/day average):</h4>
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-purple-300">
                      <th className="text-left py-2 px-3 font-bold text-purple-900">Day</th>
                      <th className="text-right py-2 px-3 font-bold text-purple-900">Calories</th>
                    </tr>
                  </thead>
                  <tbody className="text-purple-800">
                    <tr className="border-b border-purple-200">
                      <td className="py-2 px-3">Monday</td>
                      <td className="text-right py-2 px-3 font-semibold">2,000</td>
                    </tr>
                    <tr className="border-b border-purple-200">
                      <td className="py-2 px-3">Tuesday</td>
                      <td className="text-right py-2 px-3 font-semibold">1,700</td>
                    </tr>
                    <tr className="border-b border-purple-200">
                      <td className="py-2 px-3">Wednesday</td>
                      <td className="text-right py-2 px-3 font-semibold">2,300</td>
                    </tr>
                    <tr className="border-b border-purple-200">
                      <td className="py-2 px-3">Thursday</td>
                      <td className="text-right py-2 px-3 font-semibold">1,800</td>
                    </tr>
                    <tr className="border-b border-purple-200">
                      <td className="py-2 px-3">Friday</td>
                      <td className="text-right py-2 px-3 font-semibold">2,200</td>
                    </tr>
                    <tr className="border-b border-purple-200">
                      <td className="py-2 px-3">Saturday</td>
                      <td className="text-right py-2 px-3 font-semibold">2,100</td>
                    </tr>
                    <tr className="border-b-2 border-purple-300">
                      <td className="py-2 px-3">Sunday</td>
                      <td className="text-right py-2 px-3 font-semibold">1,900</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold">Weekly Total</td>
                      <td className="text-right py-2 px-3 font-bold text-lg">14,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Benefits of zigzag cycling include preventing metabolic slowdown, reducing diet fatigue, and allowing for more flexible eating on certain days. Higher calorie days can be aligned with workout days for better performance.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Calories in Common Foods</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Understanding the caloric content of common foods helps you make informed dietary choices. Here's a reference table:
              </p>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 my-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">🍎 Fruits & Vegetables</h4>
                    <table className="w-full text-sm">
                      <tbody className="text-gray-700">
                        <tr className="border-b border-gray-200">
                          <td className="py-2">Apple (medium)</td>
                          <td className="text-right font-semibold">95 cal</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2">Banana (medium)</td>
                          <td className="text-right font-semibold">105 cal</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2">Broccoli (1 cup)</td>
                          <td className="text-right font-semibold">55 cal</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2">Carrot (medium)</td>
                          <td className="text-right font-semibold">25 cal</td>
                        </tr>
                        <tr>
                          <td className="py-2">Spinach (1 cup)</td>
                          <td className="text-right font-semibold">7 cal</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">🍗 Proteins</h4>
                    <table className="w-full text-sm">
                      <tbody className="text-gray-700">
                        <tr className="border-b border-gray-200">
                          <td className="py-2">Chicken breast (100g)</td>
                          <td className="text-right font-semibold">165 cal</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2">Salmon (100g)</td>
                          <td className="text-right font-semibold">208 cal</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2">Egg (large)</td>
                          <td className="text-right font-semibold">72 cal</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2">Greek yogurt (100g)</td>
                          <td className="text-right font-semibold">59 cal</td>
                        </tr>
                        <tr>
                          <td className="py-2">Tofu (100g)</td>
                          <td className="text-right font-semibold">76 cal</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">🍞 Grains & Carbs</h4>
                    <table className="w-full text-sm">
                      <tbody className="text-gray-700">
                        <tr className="border-b border-gray-200">
                          <td className="py-2">Brown rice (1 cup cooked)</td>
                          <td className="text-right font-semibold">216 cal</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2">Whole wheat bread (1 slice)</td>
                          <td className="text-right font-semibold">81 cal</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2">Oatmeal (1 cup cooked)</td>
                          <td className="text-right font-semibold">154 cal</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2">Pasta (1 cup cooked)</td>
                          <td className="text-right font-semibold">200 cal</td>
                        </tr>
                        <tr>
                          <td className="py-2">Quinoa (1 cup cooked)</td>
                          <td className="text-right font-semibold">222 cal</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">🥑 Fats & Nuts</h4>
                    <table className="w-full text-sm">
                      <tbody className="text-gray-700">
                        <tr className="border-b border-gray-200">
                          <td className="py-2">Avocado (medium)</td>
                          <td className="text-right font-semibold">234 cal</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2">Almonds (1 oz/28g)</td>
                          <td className="text-right font-semibold">164 cal</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2">Peanut butter (2 tbsp)</td>
                          <td className="text-right font-semibold">188 cal</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2">Olive oil (1 tbsp)</td>
                          <td className="text-right font-semibold">119 cal</td>
                        </tr>
                        <tr>
                          <td className="py-2">Walnuts (1 oz/28g)</td>
                          <td className="text-right font-semibold">185 cal</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Calories Burned During Exercise</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Physical activity increases your calorie burn. Here are approximate calories burned per 30 minutes for different weights:
              </p>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 my-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-2 font-bold text-gray-900">Activity (30 min)</th>
                      <th className="text-center py-3 px-2 font-bold text-gray-900">125 lbs</th>
                      <th className="text-center py-3 px-2 font-bold text-gray-900">155 lbs</th>
                      <th className="text-center py-3 px-2 font-bold text-gray-900">185 lbs</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2">Walking (3.5 mph)</td>
                      <td className="text-center py-2 px-2">120</td>
                      <td className="text-center py-2 px-2">149</td>
                      <td className="text-center py-2 px-2">178</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2">Running (6 mph)</td>
                      <td className="text-center py-2 px-2">295</td>
                      <td className="text-center py-2 px-2">360</td>
                      <td className="text-center py-2 px-2">428</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2">Cycling (moderate)</td>
                      <td className="text-center py-2 px-2">210</td>
                      <td className="text-center py-2 px-2">260</td>
                      <td className="text-center py-2 px-2">311</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2">Swimming (general)</td>
                      <td className="text-center py-2 px-2">180</td>
                      <td className="text-center py-2 px-2">223</td>
                      <td className="text-center py-2 px-2">266</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2">Weight lifting</td>
                      <td className="text-center py-2 px-2">90</td>
                      <td className="text-center py-2 px-2">112</td>
                      <td className="text-center py-2 px-2">133</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2">Yoga</td>
                      <td className="text-center py-2 px-2">120</td>
                      <td className="text-center py-2 px-2">149</td>
                      <td className="text-center py-2 px-2">178</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2">Basketball</td>
                      <td className="text-center py-2 px-2">240</td>
                      <td className="text-center py-2 px-2">298</td>
                      <td className="text-center py-2 px-2">355</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2">Jump rope</td>
                      <td className="text-center py-2 px-2">300</td>
                      <td className="text-center py-2 px-2">372</td>
                      <td className="text-center py-2 px-2">444</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 leading-relaxed text-sm italic">
                Note: These are estimates. Actual calories burned vary based on intensity, fitness level, and metabolism.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tips for Successful Calorie Management</h3>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    For Weight Loss
                  </h4>
                  <ul className="space-y-2 text-blue-800">
                    <li>• Track your food intake using a food diary or app</li>
                    <li>• Focus on nutrient-dense, low-calorie foods</li>
                    <li>• Increase protein intake to preserve muscle mass</li>
                    <li>• Stay hydrated - drink water before meals</li>
                    <li>• Get adequate sleep (7-9 hours) for optimal metabolism</li>
                    <li>• Combine diet with regular exercise</li>
                    <li>• Be patient - aim for 1-2 lbs per week</li>
                    <li>• Measure progress with photos and measurements, not just scale</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                  <h4 className="text-lg font-bold text-green-900 mb-4 flex items-center">
                    <Scale className="h-5 w-5 mr-2" />
                    For Weight Gain
                  </h4>
                  <ul className="space-y-2 text-green-800">
                    <li>• Eat more frequently - 4-6 meals per day</li>
                    <li>• Choose calorie-dense foods (nuts, dried fruits, oils)</li>
                    <li>• Prioritize progressive resistance training</li>
                    <li>• Consume adequate protein (1.6-2.2g per kg body weight)</li>
                    <li>• Don't skip meals, especially breakfast</li>
                    <li>• Use protein shakes as snacks between meals</li>
                    <li>• Monitor weight weekly and adjust calories as needed</li>
                    <li>• Focus on gaining muscle, not just fat</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Common Mistakes to Avoid</h3>

              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200 my-6">
                <ul className="space-y-3 text-red-900">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 text-xl flex-shrink-0">✗</span>
                    <div>
                      <strong>Underestimating portions:</strong> Use a food scale to measure accurately, especially high-calorie foods like oils and nuts.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 text-xl flex-shrink-0">✗</span>
                    <div>
                      <strong>Not accounting for beverages:</strong> Drinks like sodas, juices, and alcohol can add hundreds of hidden calories.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 text-xl flex-shrink-0">✗</span>
                    <div>
                      <strong>Overestimating exercise calories:</strong> Fitness trackers often overestimate burn by 20-30%. Be conservative.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 text-xl flex-shrink-0">✗</span>
                    <div>
                      <strong>Being too restrictive:</strong> Extreme diets are unsustainable. Aim for moderate, consistent changes.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 text-xl flex-shrink-0">✗</span>
                    <div>
                      <strong>Ignoring quality:</strong> 1,500 calories of junk food ≠ 1,500 calories of nutritious food for health outcomes.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 text-xl flex-shrink-0">✗</span>
                    <div>
                      <strong>Not adjusting over time:</strong> As you lose/gain weight, your calorie needs change. Recalculate every 10-15 lbs.
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">How accurate are calorie calculators?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Calorie calculators provide estimates based on population averages. Individual variation in metabolism can cause actual needs to differ by ±10-20%. Use the calculator as a starting point, then adjust based on your real-world results over 2-4 weeks.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Should I eat back calories burned from exercise?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    If you selected an activity level that includes your regular exercise, don't eat back those calories. If you chose "sedentary" and do separate exercise, you can eat back 50-75% of estimated exercise calories to account for overestimation.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">What if I'm not losing weight with a calorie deficit?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    If you're not losing weight after 3-4 weeks, you're likely not in a true deficit. Common causes include underestimating food intake, overestimating activity level, or metabolic adaptation. Try reducing intake by 100-200 calories, improving tracking accuracy, or increasing activity.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Is it safe to eat less than my BMR?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Generally, no. Eating below your BMR for extended periods can slow metabolism, cause muscle loss, hormonal imbalances, and nutrient deficiencies. Always maintain a minimum of 1,200 calories for women and 1,500 for men unless under medical supervision.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Do I need to count calories forever?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Not necessarily. Calorie counting is a tool for awareness and achieving specific goals. Many people track for a few months to learn portion sizes and food values, then maintain their weight intuitively. Some prefer continued tracking for accountability.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Which BMR formula should I use?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    For most people, the <strong>Mifflin-St Jeor equation</strong> is recommended as it's the most accurate for the general population. Use <strong>Katch-McArdle</strong> if you know your body fat percentage and have above-average muscle mass. Harris-Benedict is older and slightly less accurate but still widely used.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Can I lose fat and gain muscle at the same time?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Yes, but it's challenging and typically works best for beginners or those returning after a break (often called "newbie gains"). It requires a small calorie deficit, high protein intake (2g per kg body weight), and progressive resistance training. Most advanced trainees need separate bulking and cutting phases.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">How often should I recalculate my calorie needs?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Recalculate every 10-15 pounds of weight change, or every 2-3 months if maintaining weight. Your calorie needs decrease as you lose weight and increase as you gain weight, so regular adjustments are necessary for continued progress.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">What about cheat days or refeed days?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Strategic refeed days (eating at maintenance or slightly above) can help with diet adherence, restore leptin levels, and improve workout performance. Plan 1-2 higher calorie days per week, focusing on extra carbs rather than fats. Avoid completely uncontrolled "cheat days" that can undo a week's deficit.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Do different types of calories (carbs, protein, fat) matter?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Yes, macronutrient composition matters for body composition, satiety, and health—not just total calories. Protein helps preserve muscle during weight loss, fats are essential for hormones, and carbs fuel performance. While "calories in vs calories out" determines weight change, macro balance affects what type of weight you lose or gain.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Understanding your calorie needs is a fundamental step toward achieving your health and fitness goals. Whether you're looking to lose weight, gain muscle, or maintain your current physique, knowing your BMR and TDEE provides a scientific foundation for your nutrition plan.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Remember that calorie calculators provide estimates—your actual needs may vary. Use these numbers as a starting point, monitor your progress over several weeks, and adjust accordingly. Combine calorie awareness with quality nutrition, regular exercise, adequate sleep, and stress management for optimal results.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Always consult with healthcare professionals, registered dietitians, or certified nutritionists before making significant changes to your diet, especially if you have underlying health conditions or are taking medications.
              </p>
            </section>
          </article>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Personalized Nutrition Guidance?
          </h2>
          <p className="text-xl mb-8 text-orange-50 max-w-3xl mx-auto">
            Work with our expert tutors and nutritionists to create a customized diet plan tailored to your unique goals and lifestyle
          </p>
          <Link href="/tutoring/free-consultation">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8 py-6 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Book Your Free Session
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
