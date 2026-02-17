'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Home, Calculator, Activity, TrendingUp, Flame, Users, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BMRResults {
  mifflin: number;
  harris: number;
  katch: number | null;
  average: number;
}

interface TDEEResults {
  sedentary: number;
  light: number;
  moderate: number;
  active: number;
  veryActive: number;
  extraActive: number;
}

export default function BMRCalculatorPage() {
  // User inputs
  const [age, setAge] = useState<string>('30');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('imperial');
  const [formula, setFormula] = useState<'mifflin' | 'harris' | 'katch' | 'average'>('mifflin');

  // Metric inputs
  const [weightKg, setWeightKg] = useState<string>('');
  const [heightCm, setHeightCm] = useState<string>('');

  // Imperial inputs
  const [weightLbs, setWeightLbs] = useState<string>('180');
  const [heightFeet, setHeightFeet] = useState<string>('5');
  const [heightInches, setHeightInches] = useState<string>('10');

  // Katch-McArdle specific
  const [bodyFatPercentage, setBodyFatPercentage] = useState<string>('');

  // Results
  const [bmrResults, setBmrResults] = useState<BMRResults | null>(null);
  const [tdeeResults, setTdeeResults] = useState<TDEEResults | null>(null);

  const calculateBMR = () => {
    const ageNum = parseFloat(age);

    if (!ageNum || ageNum < 15 || ageNum > 80) {
      alert('Please enter a valid age between 15 and 80');
      return;
    }

    // Convert to metric
    let weightInKg: number;
    let heightInCm: number;

    if (unitSystem === 'metric') {
      weightInKg = parseFloat(weightKg);
      heightInCm = parseFloat(heightCm);
    } else {
      weightInKg = parseFloat(weightLbs) * 0.453592;
      const totalInches = (parseFloat(heightFeet) || 0) * 12 + (parseFloat(heightInches) || 0);
      heightInCm = totalInches * 2.54;
    }

    if (!weightInKg || !heightInCm) {
      alert('Please enter valid weight and height');
      return;
    }

    // Calculate BMR using all three formulas

    // 1. Mifflin-St Jeor (most accurate)
    let bmrMifflin: number;
    if (gender === 'male') {
      bmrMifflin = 10 * weightInKg + 6.25 * heightInCm - 5 * ageNum + 5;
    } else {
      bmrMifflin = 10 * weightInKg + 6.25 * heightInCm - 5 * ageNum - 161;
    }

    // 2. Revised Harris-Benedict
    let bmrHarris: number;
    if (gender === 'male') {
      bmrHarris = 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * ageNum + 88.362;
    } else {
      bmrHarris = 9.247 * weightInKg + 3.098 * heightInCm - 4.330 * ageNum + 447.593;
    }

    // 3. Katch-McArdle (requires body fat %)
    let bmrKatch: number | null = null;
    const bodyFat = parseFloat(bodyFatPercentage);
    if (bodyFat && bodyFat > 0 && bodyFat < 100) {
      const leanBodyMass = weightInKg * (1 - bodyFat / 100);
      bmrKatch = 370 + (21.6 * leanBodyMass);
    }

    // Calculate average
    const validBMRs = [bmrMifflin, bmrHarris, bmrKatch].filter((val): val is number => val !== null);
    const bmrAverage = validBMRs.reduce((sum, val) => sum + val, 0) / validBMRs.length;

    setBmrResults({
      mifflin: bmrMifflin,
      harris: bmrHarris,
      katch: bmrKatch,
      average: bmrAverage,
    });

    // Calculate TDEE for different activity levels based on selected formula
    let selectedBMR: number;
    switch (formula) {
      case 'mifflin':
        selectedBMR = bmrMifflin;
        break;
      case 'harris':
        selectedBMR = bmrHarris;
        break;
      case 'katch':
        selectedBMR = bmrKatch || bmrMifflin;
        break;
      default:
        selectedBMR = bmrAverage;
    }

    setTdeeResults({
      sedentary: selectedBMR * 1.2,        // Little to no exercise
      light: selectedBMR * 1.375,          // Light exercise 1-3 days/week
      moderate: selectedBMR * 1.55,        // Moderate exercise 3-5 days/week
      active: selectedBMR * 1.725,         // Heavy exercise 6-7 days/week
      veryActive: selectedBMR * 1.9,       // Very heavy exercise, physical job
      extraActive: selectedBMR * 2.0,      // Professional athlete level
    });
  };

  const reset = () => {
    setAge('30');
    setGender('male');
    setUnitSystem('imperial');
    setFormula('mifflin');
    setWeightKg('');
    setHeightCm('');
    setWeightLbs('180');
    setHeightFeet('5');
    setHeightInches('10');
    setBodyFatPercentage('');
    setBmrResults(null);
    setTdeeResults(null);
  };

  const formatNumber = (value: number) => {
    return Math.round(value).toLocaleString();
  };

  const getSelectedBMR = (): number => {
    if (!bmrResults) return 0;
    switch (formula) {
      case 'mifflin':
        return bmrResults.mifflin;
      case 'harris':
        return bmrResults.harris;
      case 'katch':
        return bmrResults.katch || bmrResults.mifflin;
      default:
        return bmrResults.average;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Need Help with Nutrition & Fitness Planning?","acceptedAnswer":{"@type":"Answer","text":"Our expert tutors can help you understand metabolism, nutrition science, and create personalized fitness plans. Book a session today!"}}]}' }}
      />
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm py-3 px-4 sm:px-6 shadow-sm">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-blue-600">Calculators</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">BMR Calculator</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 text-white py-20 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Flame className="w-16 h-16 text-orange-200 mr-4" />
            <h1 className="text-5xl font-bold">BMR Calculator</h1>
          </div>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
            Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE)
            using scientifically validated formulas. Discover how many calories your body burns at rest.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Input Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-orange-600" />
                  Your Information
                </h2>

                {/* Unit System */}
                <div className="mb-4">
                  <Label className="text-gray-700 font-medium">Unit System</Label>
                  <Select value={unitSystem} onValueChange={(value: 'metric' | 'imperial') => setUnitSystem(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="imperial">Imperial (lbs, ft/in)</SelectItem>
                      <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Age */}
                <div className="mb-4">
                  <Label htmlFor="age" className="text-gray-700 font-medium">
                    Age (15-80 years)
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="mt-1"
                    placeholder="30"
                    min="15"
                    max="80"
                  />
                </div>

                {/* Gender */}
                <div className="mb-4">
                  <Label className="text-gray-700 font-medium">Gender</Label>
                  <Select value={gender} onValueChange={(value: 'male' | 'female') => setGender(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {unitSystem === 'imperial' ? (
                  <>
                    {/* Weight (Imperial) */}
                    <div className="mb-4">
                      <Label htmlFor="weightLbs" className="text-gray-700 font-medium">
                        Weight (lbs)
                      </Label>
                      <Input
                        id="weightLbs"
                        type="number"
                        value={weightLbs}
                        onChange={(e) => setWeightLbs(e.target.value)}
                        className="mt-1"
                        placeholder="180"
                      />
                    </div>

                    {/* Height (Imperial) */}
                    <div className="mb-4">
                      <Label className="text-gray-700 font-medium">Height</Label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div>
                          <Input
                            type="number"
                            value={heightFeet}
                            onChange={(e) => setHeightFeet(e.target.value)}
                            placeholder="Feet"
                          />
                          <p className="text-xs text-gray-500 mt-1">Feet</p>
                        </div>
                        <div>
                          <Input
                            type="number"
                            value={heightInches}
                            onChange={(e) => setHeightInches(e.target.value)}
                            placeholder="Inches"
                          />
                          <p className="text-xs text-gray-500 mt-1">Inches</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Weight (Metric) */}
                    <div className="mb-4">
                      <Label htmlFor="weightKg" className="text-gray-700 font-medium">
                        Weight (kg)
                      </Label>
                      <Input
                        id="weightKg"
                        type="number"
                        value={weightKg}
                        onChange={(e) => setWeightKg(e.target.value)}
                        className="mt-1"
                        placeholder="82"
                      />
                    </div>

                    {/* Height (Metric) */}
                    <div className="mb-4">
                      <Label htmlFor="heightCm" className="text-gray-700 font-medium">
                        Height (cm)
                      </Label>
                      <Input
                        id="heightCm"
                        type="number"
                        value={heightCm}
                        onChange={(e) => setHeightCm(e.target.value)}
                        className="mt-1"
                        placeholder="178"
                      />
                    </div>
                  </>
                )}

                {/* BMR Formula Selection */}
                <div className="mb-4">
                  <Label className="text-gray-700 font-medium">BMR Formula</Label>
                  <Select value={formula} onValueChange={(value: any) => setFormula(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mifflin">Mifflin-St Jeor (Recommended)</SelectItem>
                      <SelectItem value="harris">Revised Harris-Benedict</SelectItem>
                      <SelectItem value="katch">Katch-McArdle (Requires Body Fat %)</SelectItem>
                      <SelectItem value="average">Average of All Methods</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Body Fat Percentage (for Katch-McArdle) */}
                <div className="mb-6">
                  <Label htmlFor="bodyFat" className="text-gray-700 font-medium">
                    Body Fat % (Optional - for Katch-McArdle)
                  </Label>
                  <Input
                    id="bodyFat"
                    type="number"
                    value={bodyFatPercentage}
                    onChange={(e) => setBodyFatPercentage(e.target.value)}
                    className="mt-1"
                    placeholder="15"
                    min="1"
                    max="99"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Only needed for Katch-McArdle formula
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={calculateBMR}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate BMR
                  </Button>
                  <Button
                    onClick={reset}
                    variant="outline"
                    className="flex-1"
                  >
                    Reset
                  </Button>
                </div>
              </div>

              {/* Results Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                  Your Results
                </h2>

                {bmrResults !== null ? (
                  <div className="space-y-6">
                    {/* BMR Result */}
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border-2 border-orange-200">
                      <div className="text-sm text-gray-600 mb-1">
                        Your Basal Metabolic Rate (BMR)
                      </div>
                      <div className="text-4xl font-bold text-orange-600">
                        {formatNumber(getSelectedBMR())} <span className="text-2xl">cal/day</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-2">
                        Calories burned at complete rest
                      </div>
                    </div>

                    {/* All Formula Results */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-semibold text-gray-700 mb-3">
                        Results from All Formulas:
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Mifflin-St Jeor:</span>
                          <span className="font-semibold text-gray-800">
                            {formatNumber(bmrResults.mifflin)} cal/day
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Harris-Benedict:</span>
                          <span className="font-semibold text-gray-800">
                            {formatNumber(bmrResults.harris)} cal/day
                          </span>
                        </div>
                        {bmrResults.katch !== null && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Katch-McArdle:</span>
                            <span className="font-semibold text-gray-800">
                              {formatNumber(bmrResults.katch)} cal/day
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between border-t border-gray-300 pt-2">
                          <span className="text-gray-600">Average:</span>
                          <span className="font-bold text-gray-900">
                            {formatNumber(bmrResults.average)} cal/day
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* TDEE Results */}
                    {tdeeResults && (
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                        <div className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
                          <Activity className="w-4 h-4 mr-2 text-blue-600" />
                          Daily Calorie Needs by Activity Level (TDEE)
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-gray-800">Sedentary</div>
                              <div className="text-xs text-gray-600">Little to no exercise</div>
                            </div>
                            <div className="font-semibold text-blue-700">
                              {formatNumber(tdeeResults.sedentary)} cal
                            </div>
                          </div>
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-gray-800">Light Exercise</div>
                              <div className="text-xs text-gray-600">1-3 days per week</div>
                            </div>
                            <div className="font-semibold text-blue-700">
                              {formatNumber(tdeeResults.light)} cal
                            </div>
                          </div>
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-gray-800">Moderate Exercise</div>
                              <div className="text-xs text-gray-600">3-5 days per week</div>
                            </div>
                            <div className="font-semibold text-blue-700">
                              {formatNumber(tdeeResults.moderate)} cal
                            </div>
                          </div>
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-gray-800">Heavy Exercise</div>
                              <div className="text-xs text-gray-600">6-7 days per week</div>
                            </div>
                            <div className="font-semibold text-blue-700">
                              {formatNumber(tdeeResults.active)} cal
                            </div>
                          </div>
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-gray-800">Very Heavy Exercise</div>
                              <div className="text-xs text-gray-600">Twice per day, physical job</div>
                            </div>
                            <div className="font-semibold text-blue-700">
                              {formatNumber(tdeeResults.veryActive)} cal
                            </div>
                          </div>
                          <div className="flex justify-between items-start border-t border-blue-300 pt-2">
                            <div>
                              <div className="font-medium text-gray-800">Extra Active</div>
                              <div className="text-xs text-gray-600">Professional athlete level</div>
                            </div>
                            <div className="font-bold text-blue-800">
                              {formatNumber(tdeeResults.extraActive)} cal
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Weight Management Guide */}
                    {tdeeResults && (
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-sm font-semibold text-gray-800 mb-3">
                          Weight Management Guide:
                        </div>
                        <div className="space-y-2 text-xs text-gray-700">
                          <div className="flex items-start">
                            <span className="text-red-600 mr-2">▼</span>
                            <span>
                              <strong>Weight Loss:</strong> Consume 500 cal/day less than your TDEE
                              (≈1 lb/week loss)
                            </span>
                          </div>
                          <div className="flex items-start">
                            <span className="text-blue-600 mr-2">■</span>
                            <span>
                              <strong>Maintenance:</strong> Consume calories equal to your TDEE
                            </span>
                          </div>
                          <div className="flex items-start">
                            <span className="text-green-600 mr-2">▲</span>
                            <span>
                              <strong>Weight Gain:</strong> Consume 500 cal/day more than your TDEE
                              (≈1 lb/week gain)
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-12 text-center">
                    <Flame className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Enter your information and click Calculate to see your BMR and daily calorie needs
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Basal Metabolic Rate (BMR)</h2>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">What is BMR?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Basal Metabolic Rate (BMR)</strong> is the number of calories your body needs to perform
              essential physiological functions while at complete rest. These functions include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Breathing and circulation</li>
              <li>Cell production and repair</li>
              <li>Nutrient processing</li>
              <li>Protein synthesis</li>
              <li>Brain and nerve function</li>
              <li>Maintaining body temperature</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              BMR represents approximately <strong>60-75% of your total daily energy expenditure</strong>,
              making it the largest component of calorie burn for most people.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">BMR Calculation Formulas</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              There are three widely-used scientific formulas for calculating BMR:
            </p>

            {/* Mifflin-St Jeor Formula */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl my-6 border-l-4 border-blue-500">
              <h4 className="text-lg font-bold text-blue-900 mb-3">1. Mifflin-St Jeor Formula (Recommended)</h4>
              <p className="text-sm text-gray-700 mb-4">
                Developed in 1990, this is currently considered the most accurate formula for most people.
              </p>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">For Men:</div>
                  <div className="bg-white p-4 rounded border-l-4 border-blue-600 font-mono text-sm">
                    BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age(years) + 5
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">For Women:</div>
                  <div className="bg-white p-4 rounded border-l-4 border-pink-600 font-mono text-sm">
                    BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age(years) − 161
                  </div>
                </div>
              </div>
            </div>

            {/* Harris-Benedict Formula */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl my-6 border-l-4 border-green-500">
              <h4 className="text-lg font-bold text-green-900 mb-3">2. Revised Harris-Benedict Formula</h4>
              <p className="text-sm text-gray-700 mb-4">
                Originally created in 1919 and revised in 1984. Still widely used and fairly accurate.
              </p>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">For Men:</div>
                  <div className="bg-white p-4 rounded border-l-4 border-green-600 font-mono text-sm">
                    BMR = 13.397 × weight(kg) + 4.799 × height(cm) − 5.677 × age(years) + 88.362
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">For Women:</div>
                  <div className="bg-white p-4 rounded border-l-4 border-pink-600 font-mono text-sm">
                    BMR = 9.247 × weight(kg) + 3.098 × height(cm) − 4.330 × age(years) + 447.593
                  </div>
                </div>
              </div>
            </div>

            {/* Katch-McArdle Formula */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl my-6 border-l-4 border-purple-500">
              <h4 className="text-lg font-bold text-purple-900 mb-3">3. Katch-McArdle Formula</h4>
              <p className="text-sm text-gray-700 mb-4">
                Takes lean body mass into account. More accurate for people who know their body fat percentage,
                especially athletes with higher muscle mass.
              </p>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">Formula (gender-neutral):</div>
                  <div className="bg-white p-4 rounded border-l-4 border-purple-600 space-y-2 text-sm">
                    <div className="font-mono">
                      LBM = weight(kg) × (1 − body fat % ÷ 100)
                    </div>
                    <div className="font-mono">
                      BMR = 370 + (21.6 × LBM)
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    LBM = Lean Body Mass (muscle, bone, organs, water)
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Example BMR Calculation</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Let's calculate BMR for a 30-year-old male who weighs 180 lbs (81.6 kg) and is 5'10" (178 cm):
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <div className="mb-4">
                <strong>Using Mifflin-St Jeor Formula:</strong>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <div>BMR = 10 × 81.6 + 6.25 × 178 − 5 × 30 + 5</div>
                <div>BMR = 816 + 1,112.5 − 150 + 5</div>
                <div className="text-lg font-bold text-green-700 pt-2">BMR = 1,783.5 calories per day</div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-500 text-sm text-gray-700">
                This means this person burns approximately 1,784 calories per day just to maintain basic
                bodily functions at complete rest.
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">BMR vs RMR vs TDEE</h3>
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Term</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Definition</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Measurement Conditions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">BMR</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Basal Metabolic Rate - calories burned for essential functions
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Measured in lab after 12-hour fast, lying down, complete rest
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">RMR</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Resting Metabolic Rate - similar to BMR but slightly higher
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Less restrictive conditions, typically 10-20% higher than BMR
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">TDEE</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Total Daily Energy Expenditure - total calories burned per day
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      BMR + activity + digestion + thermogenesis
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Calculating TDEE from BMR</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              To determine your total daily calorie needs, multiply your BMR by an activity factor:
            </p>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl my-6 border-l-4 border-orange-500">
              <h4 className="font-semibold text-gray-800 mb-3">TDEE Activity Multipliers:</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">Sedentary (1.2×)</div>
                    <div className="text-gray-600">Little to no exercise, desk job</div>
                  </div>
                  <div className="font-mono text-orange-700">TDEE = BMR × 1.2</div>
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">Light Exercise (1.375×)</div>
                    <div className="text-gray-600">Exercise 1-3 days per week</div>
                  </div>
                  <div className="font-mono text-orange-700">TDEE = BMR × 1.375</div>
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">Moderate Exercise (1.55×)</div>
                    <div className="text-gray-600">Exercise 3-5 days per week</div>
                  </div>
                  <div className="font-mono text-orange-700">TDEE = BMR × 1.55</div>
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">Heavy Exercise (1.725×)</div>
                    <div className="text-gray-600">Exercise 6-7 days per week</div>
                  </div>
                  <div className="font-mono text-orange-700">TDEE = BMR × 1.725</div>
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">Very Heavy Exercise (1.9×)</div>
                    <div className="text-gray-600">Twice per day workouts, physical job</div>
                  </div>
                  <div className="font-mono text-orange-700">TDEE = BMR × 1.9</div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Factors That Affect BMR</h3>

            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  1. Body Composition
                </h4>
                <p className="text-gray-700 text-sm">
                  Muscle tissue burns more calories at rest than fat tissue. People with higher muscle mass
                  have higher BMRs. This is why strength training can boost your metabolism even when you're
                  not exercising.
                </p>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-800 mb-2">2. Age</h4>
                <p className="text-gray-700 text-sm">
                  BMR decreases by about 1-2% per decade after age 20. This is primarily due to loss of muscle
                  mass (sarcopenia) and hormonal changes. Maintaining muscle through resistance training can
                  help counteract this decline.
                </p>
              </div>

              <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-semibold text-gray-800 mb-2">3. Gender</h4>
                <p className="text-gray-700 text-sm">
                  Men typically have 5-10% higher BMRs than women due to higher muscle mass and lower body
                  fat percentage. This difference is reflected in the gender-specific formulas used to
                  calculate BMR.
                </p>
              </div>

              <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-semibold text-gray-800 mb-2">4. Genetics</h4>
                <p className="text-gray-700 text-sm">
                  Genetic factors can cause BMR to vary by up to 26% between individuals, even with similar
                  body composition. Some people are naturally "fast burners" while others have slower
                  metabolisms.
                </p>
              </div>

              <div className="bg-red-50 p-5 rounded-lg border-l-4 border-red-500">
                <h4 className="font-semibold text-gray-800 mb-2">5. Climate & Temperature</h4>
                <p className="text-gray-700 text-sm">
                  Living in extreme temperatures (very hot or cold climates) can increase BMR by 5-20% as
                  your body works harder to maintain core temperature through thermoregulation.
                </p>
              </div>

              <div className="bg-pink-50 p-5 rounded-lg border-l-4 border-pink-500">
                <h4 className="font-semibold text-gray-800 mb-2">6. Hormones</h4>
                <p className="text-gray-700 text-sm">
                  Thyroid hormones significantly impact BMR. Hyperthyroidism (overactive thyroid) increases
                  BMR, while hypothyroidism (underactive thyroid) decreases it. Pregnancy and menstrual
                  cycle also affect metabolism.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Using BMR for Weight Management</h3>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl my-6 border-l-4 border-green-500">
              <h4 className="font-semibold text-gray-800 mb-4">Creating a Calorie Deficit for Weight Loss:</h4>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="bg-white p-4 rounded border-l-4 border-red-500">
                  <div className="font-semibold text-gray-800 mb-2">Safe Weight Loss Rate: 0.5-2 lbs per week</div>
                  <ul className="list-disc list-inside space-y-1">
                    <li>1 pound of fat = approximately 3,500 calories</li>
                    <li>500 cal/day deficit = 1 lb/week loss</li>
                    <li>1,000 cal/day deficit = 2 lbs/week loss</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded border-l-4 border-yellow-500">
                  <div className="font-semibold text-gray-800 mb-2">Important: Never eat below your BMR!</div>
                  <p>
                    Consuming fewer calories than your BMR can slow metabolism, cause muscle loss, and lead
                    to nutrient deficiencies. Always aim to eat between your BMR and TDEE for healthy,
                    sustainable weight loss.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">How to Increase Your BMR</h3>

            <div className="space-y-4 my-6">
              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-800 mb-2">1. Build Muscle Through Strength Training</h4>
                <p className="text-gray-700 text-sm">
                  Muscle tissue burns about 6 calories per pound per day at rest, compared to 2 calories per
                  pound for fat tissue. Adding 10 pounds of muscle could increase your BMR by 40-60 calories
                  per day.
                </p>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-800 mb-2">2. Stay Hydrated</h4>
                <p className="text-gray-700 text-sm">
                  Drinking water can temporarily boost metabolism by 10-30% for about an hour. Aim for 8-10
                  glasses of water per day. Cold water may have a slightly greater effect as your body uses
                  energy to warm it to body temperature.
                </p>
              </div>

              <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-semibold text-gray-800 mb-2">3. Eat Enough Protein</h4>
                <p className="text-gray-700 text-sm">
                  Protein has the highest thermic effect of food (TEF) - your body burns 20-30% of protein
                  calories during digestion, compared to 5-10% for carbs and 0-3% for fats. Aim for 0.8-1.2g
                  of protein per pound of body weight.
                </p>
              </div>

              <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-semibold text-gray-800 mb-2">4. Get Quality Sleep</h4>
                <p className="text-gray-700 text-sm">
                  Poor sleep disrupts hormones that regulate metabolism (leptin and ghrelin), potentially
                  reducing BMR. Aim for 7-9 hours of quality sleep per night to maintain optimal metabolic
                  function.
                </p>
              </div>

              <div className="bg-red-50 p-5 rounded-lg border-l-4 border-red-500">
                <h4 className="font-semibold text-gray-800 mb-2">5. Don't Crash Diet</h4>
                <p className="text-gray-700 text-sm">
                  Severe calorie restriction (eating well below BMR) can decrease your metabolic rate by up
                  to 23%. Your body enters "starvation mode" to conserve energy. Maintain a moderate deficit
                  and eat at least your BMR calories.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Frequently Asked Questions</h3>

            <div className="space-y-6 my-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">1. Is BMR the same as RMR?</h4>
                <p className="text-gray-700 text-sm">
                  No, but they're very similar. BMR is measured under very strict laboratory conditions
                  (after 12-hour fast, complete rest). RMR is measured under less restrictive conditions
                  and is typically 10-20% higher than BMR. For practical purposes, most calculators (including
                  this one) estimate RMR and call it BMR.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">2. Which BMR formula is most accurate?</h4>
                <p className="text-gray-700 text-sm">
                  The Mifflin-St Jeor formula is currently considered most accurate for the general population.
                  The Katch-McArdle formula is more accurate for athletes or individuals with known body fat
                  percentage. Studies show Mifflin-St Jeor is accurate within ±10% for most people.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">3. Should I eat my BMR calories or TDEE calories?</h4>
                <p className="text-gray-700 text-sm">
                  Eat based on your TDEE (not BMR) according to your goals: For weight loss, eat 10-20% below
                  TDEE; for maintenance, eat at TDEE; for muscle gain, eat 10-20% above TDEE. Never eat below
                  your BMR for extended periods.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">4. Why is my BMR different from my friend's?</h4>
                <p className="text-gray-700 text-sm">
                  BMR varies based on age, gender, body composition, height, weight, and genetics. A taller,
                  heavier, more muscular, younger male will have a significantly higher BMR than a shorter,
                  lighter, less muscular, older female. Genetic variations can also cause 26% variance between
                  individuals.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">5. Can I trust online BMR calculators?</h4>
                <p className="text-gray-700 text-sm">
                  Online calculators provide estimates within ±10-15% accuracy for most people. For exact
                  measurements, you'd need indirect calorimetry testing in a lab. However, these formulas
                  are scientifically validated and accurate enough for diet and fitness planning.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">6. Does BMR change throughout the day?</h4>
                <p className="text-gray-700 text-sm">
                  Yes, slightly. BMR is typically lowest during sleep and increases during waking hours due
                  to increased neural activity and muscle tone. However, these variations are small (±5-10%)
                  and the daily average remains constant unless body composition or other factors change.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">7. How quickly can I increase my BMR?</h4>
                <p className="text-gray-700 text-sm">
                  Building muscle is the most effective way to increase BMR long-term. You can realistically
                  gain 1-2 pounds of muscle per month with consistent strength training and proper nutrition.
                  Each pound of muscle adds about 6 calories/day to your BMR. Other factors (hydration,
                  protein intake) provide temporary boosts.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">8. Does intermittent fasting affect BMR?</h4>
                <p className="text-gray-700 text-sm">
                  Short-term fasting (16-24 hours) actually slightly increases BMR due to adrenaline and
                  noradrenaline release. However, prolonged fasting or severe calorie restriction for multiple
                  days can decrease BMR. Intermittent fasting protocols done correctly don't harm metabolism.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">9. Do certain foods boost metabolism significantly?</h4>
                <p className="text-gray-700 text-sm">
                  While foods like caffeine, green tea, and spicy peppers can temporarily boost metabolism by
                  3-11%, the effect is modest and temporary. The thermic effect of food (TEF) varies: protein
                  (20-30%), carbs (5-10%), and fats (0-3%). Focus on overall diet quality rather than specific
                  "metabolism-boosting" foods.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">10. Can medical conditions affect my BMR?</h4>
                <p className="text-gray-700 text-sm">
                  Yes. Thyroid disorders have the most significant impact: hyperthyroidism can increase BMR
                  by 50-100%, while hypothyroidism can decrease it by 30-40%. Other conditions affecting BMR
                  include diabetes, Cushing's syndrome, PCOS, and chronic stress. Consult a doctor if you
                  suspect a medical issue affecting your metabolism.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 text-white rounded-2xl p-8 my-12">
              <div className="text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-orange-200" />
                <h3 className="text-2xl font-bold mb-4">Need Help with Nutrition & Fitness Planning?</h3>
                <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                  Our expert tutors can help you understand metabolism, nutrition science,
                  and create personalized fitness plans. Book a session today!
                </p>
                <Link href="/tutoring/free-consultation">
                  <Button className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-8 py-3">
                    Book Your Session
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
