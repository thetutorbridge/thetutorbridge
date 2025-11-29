'use client';

import React, { useState, useEffect } from 'react';
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
import { Calculator, RotateCcw, Footprints, Flame, Activity, Info, Target } from 'lucide-react';
import Link from 'next/link';

type WeightUnit = 'kg' | 'lbs';
type HeightUnit = 'cm' | 'ft';
type WalkingSpeed = 'slow' | 'average' | 'fast';

interface SpeedInfo {
  label: string;
  mps: number; // meters per second
  mph: number;
  kmh: number;
  met: number; // Metabolic Equivalent
  description: string;
}

const walkingSpeeds: Record<WalkingSpeed, SpeedInfo> = {
  slow: {
    label: 'Slow',
    mps: 0.9,
    mph: 2.0,
    kmh: 3.2,
    met: 2.8,
    description: 'Leisurely stroll, window shopping pace',
  },
  average: {
    label: 'Average',
    mps: 1.34,
    mph: 3.0,
    kmh: 4.8,
    met: 3.5,
    description: 'Normal walking speed, commuting pace',
  },
  fast: {
    label: 'Fast',
    mps: 1.79,
    mph: 4.0,
    kmh: 6.4,
    met: 5.0,
    description: 'Brisk walk, power walking pace',
  },
};

export default function StepsToCaloriesCalculatorPage() {
  // Input states
  const [weight, setWeight] = useState<string>('');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [height, setHeight] = useState<string>('');
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm');
  const [steps, setSteps] = useState<string>('');
  const [speed, setSpeed] = useState<WalkingSpeed>('average');

  // Result states
  const [caloriesBurned, setCaloriesBurned] = useState<number | null>(null);
  const [caloriesPerStep, setCaloriesPerStep] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [walkingTime, setWalkingTime] = useState<number | null>(null);
  const [strideLength, setStrideLength] = useState<number | null>(null);

  const calculateCalories = () => {
    let weightKg = parseFloat(weight);
    let heightM = parseFloat(height);
    const numSteps = parseInt(steps);

    if (isNaN(weightKg) || isNaN(heightM) || isNaN(numSteps) || weightKg <= 0 || heightM <= 0 || numSteps <= 0) {
      setCaloriesBurned(null);
      setCaloriesPerStep(null);
      setDistance(null);
      setWalkingTime(null);
      setStrideLength(null);
      return;
    }

    // Convert weight to kg if needed
    if (weightUnit === 'lbs') {
      weightKg = weightKg * 0.453592;
    }

    // Convert height to meters if needed
    if (heightUnit === 'cm') {
      heightM = heightM / 100;
    } else if (heightUnit === 'ft') {
      heightM = heightM * 0.3048;
    }

    // Get speed info
    const speedInfo = walkingSpeeds[speed];

    // Calculate stride length (height × 0.414 for walking)
    const stride = heightM * 0.414;
    setStrideLength(stride * 100); // Convert to cm for display

    // Calculate distance in meters
    const distanceM = stride * numSteps;
    setDistance(distanceM / 1000); // Convert to km for display

    // Calculate walking time in seconds
    const timeSeconds = distanceM / speedInfo.mps;
    setWalkingTime(timeSeconds / 60); // Convert to minutes for display

    // Calculate calories burned using MET formula
    // Calories = time(hours) × MET × 3.5 × weight(kg) / 200
    const timeHours = timeSeconds / 3600;
    const calories = timeHours * speedInfo.met * 3.5 * weightKg / 200 * 60;

    setCaloriesBurned(calories);
    setCaloriesPerStep(calories / numSteps);
  };

  useEffect(() => {
    calculateCalories();
  }, [weight, weightUnit, height, heightUnit, steps, speed]);

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setSteps('');
    setSpeed('average');
    setCaloriesBurned(null);
    setCaloriesPerStep(null);
    setDistance(null);
    setWalkingTime(null);
    setStrideLength(null);
  };

  // Quick step presets
  const stepPresets = [1000, 2500, 5000, 7500, 10000, 15000];

  // Calculate steps needed for specific calorie goals
  const getStepsForCalories = (targetCalories: number): number | null => {
    if (!caloriesPerStep || caloriesPerStep <= 0) return null;
    return Math.round(targetCalories / caloriesPerStep);
  };

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Steps to Calories Calculator',
    description: 'Free steps to calories calculator to estimate calories burned from walking. Enter steps, weight, height, and walking speed for accurate results.',
    url: 'https://thetutorbridge.com/calculators/steps-to-calories-calculator',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'The Tutor Bridge',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many calories do 10,000 steps burn?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'On average, 10,000 steps burns approximately 300-500 calories depending on your weight, height, and walking speed. A 150 lb person walking at average speed burns about 370 calories per 10,000 steps.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many steps does it take to burn 100 calories?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It takes approximately 2,000-3,000 steps to burn 100 calories for most people. The exact number depends on your weight and walking speed. Heavier individuals burn more calories per step.',
        },
      },
      {
        '@type': 'Question',
        name: 'How are calories burned from steps calculated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Calories are calculated using stride length (based on height), walking distance, time, and MET (Metabolic Equivalent) values for different walking speeds. Weight is also factored in as heavier people burn more calories.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does walking speed affect calories burned?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, walking speed significantly affects calories burned. Fast walking (4 mph) burns about 60-80% more calories than slow walking (2 mph) for the same number of steps due to higher MET values.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-[#1A3D7C] to-[#2563eb]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                <Footprints className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Steps to Calories Calculator
              </h1>
              <p className="text-lg md:text-xl text-blue-100">
                Calculate how many calories you burn from walking. Enter your steps, weight, height, and walking speed to get accurate results.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Panel */}
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[#1A3D7C]" />
                    Your Information
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset
                  </Button>
                </div>

                {/* Weight Input */}
                <div className="mb-6">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Weight
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="Enter weight"
                      min="0"
                      step="0.1"
                      className="flex-1"
                    />
                    <Select value={weightUnit} onValueChange={(v) => setWeightUnit(v as WeightUnit)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="lbs">lbs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Height Input */}
                <div className="mb-6">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Height
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="Enter height"
                      min="0"
                      step="0.1"
                      className="flex-1"
                    />
                    <Select value={heightUnit} onValueChange={(v) => setHeightUnit(v as HeightUnit)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="ft">ft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Steps Input */}
                <div className="mb-6">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Number of Steps
                  </Label>
                  <Input
                    type="number"
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                    placeholder="Enter number of steps"
                    min="0"
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {stepPresets.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setSteps(preset.toString())}
                        className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                      >
                        {preset.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Walking Speed */}
                <div className="mb-6">
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Walking Speed
                  </Label>
                  <div className="space-y-2">
                    {(Object.entries(walkingSpeeds) as [WalkingSpeed, SpeedInfo][]).map(([key, info]) => (
                      <button
                        key={key}
                        onClick={() => setSpeed(key)}
                        className={`w-full py-3 px-4 rounded-lg border-2 text-left transition-all ${
                          speed === key
                            ? 'border-[#1A3D7C] bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                speed === key ? 'border-[#1A3D7C]' : 'border-gray-300'
                              }`}
                            >
                              {speed === key && (
                                <div className="w-2 h-2 rounded-full bg-[#1A3D7C]" />
                              )}
                            </div>
                            <span className={`font-medium ${speed === key ? 'text-[#1A3D7C]' : 'text-gray-700'}`}>
                              {info.label}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {info.mph} mph ({info.kmh} km/h)
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 ml-7 mt-1">{info.description}</p>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                    <Activity className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    🚶 {walkingSpeeds[speed].mph} miles/hour ({walkingSpeeds[speed].kmh} km/h)
                  </p>
                </div>
              </div>

              {/* Results Panel */}
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  Calories Burned
                </h2>

                {caloriesBurned !== null ? (
                  <div className="space-y-6">
                    {/* Main Result */}
                    <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
                      <p className="text-sm text-gray-600 mb-1">Total Calories Burned</p>
                      <p className="text-5xl font-bold text-orange-600 mb-2">
                        {caloriesBurned.toFixed(0)}
                        <span className="text-2xl ml-1">kcal</span>
                      </p>
                      <p className="text-gray-500 text-sm">
                        From {parseInt(steps).toLocaleString()} steps at {walkingSpeeds[speed].label.toLowerCase()} pace
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <p className="text-xs text-gray-500 mb-1">Calories per Step</p>
                        <p className="text-lg font-bold text-gray-800">
                          {caloriesPerStep?.toFixed(4)} kcal
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-xl">
                        <p className="text-xs text-gray-500 mb-1">Distance Walked</p>
                        <p className="text-lg font-bold text-gray-800">
                          {distance?.toFixed(2)} km
                        </p>
                        <p className="text-xs text-gray-500">
                          ({(distance! * 0.621371).toFixed(2)} miles)
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-xl">
                        <p className="text-xs text-gray-500 mb-1">Walking Time</p>
                        <p className="text-lg font-bold text-gray-800">
                          {walkingTime?.toFixed(0)} min
                        </p>
                        <p className="text-xs text-gray-500">
                          ({(walkingTime! / 60).toFixed(1)} hours)
                        </p>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-xl">
                        <p className="text-xs text-gray-500 mb-1">Stride Length</p>
                        <p className="text-lg font-bold text-gray-800">
                          {strideLength?.toFixed(1)} cm
                        </p>
                        <p className="text-xs text-gray-500">
                          ({(strideLength! / 2.54).toFixed(1)} inches)
                        </p>
                      </div>
                    </div>

                    {/* Calorie Goals */}
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4 text-green-600" />
                        Steps Needed for Calorie Goals
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {[100, 200, 300, 500].map((cal) => (
                          <div key={cal} className="bg-white p-3 rounded-lg">
                            <p className="text-xs text-gray-500">To burn {cal} kcal</p>
                            <p className="font-bold text-green-700">
                              {getStepsForCalories(cal)?.toLocaleString() || '-'} steps
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Calculation Info */}
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        Calculation Details
                      </h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>• Stride length: Height × 0.414 = {strideLength?.toFixed(1)} cm</p>
                        <p>• MET value ({walkingSpeeds[speed].label}): {walkingSpeeds[speed].met}</p>
                        <p>• Walking speed: {walkingSpeeds[speed].mps} m/s</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">👟</div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Enter Your Details
                    </h3>
                    <p className="text-gray-500">
                      Fill in your weight, height, and steps to calculate calories burned from walking.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Steps Reference Table */}
            <div className="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Steps to Calories Quick Reference
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Estimated calories burned for a 150 lb (68 kg) person at average walking speed
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Steps</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Calories (Slow)</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Calories (Average)</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Calories (Fast)</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Distance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1000, 2500, 5000, 7500, 10000, 12500, 15000, 20000].map((stepCount) => {
                      // Calculations for 150 lb, 5'7" (170 cm) person
                      const weightKg = 68;
                      const heightM = 1.70;
                      const stride = heightM * 0.414;
                      const distanceKm = (stride * stepCount) / 1000;

                      const calcCal = (met: number): number => {
                        const timeHours = (stride * stepCount / walkingSpeeds.average.mps) / 3600;
                        return timeHours * met * 3.5 * weightKg / 200 * 60;
                      };

                      return (
                        <tr key={stepCount} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{stepCount.toLocaleString()}</td>
                          <td className="py-3 px-4 text-center">{calcCal(2.8).toFixed(0)} kcal</td>
                          <td className="py-3 px-4 text-center font-semibold text-orange-600">{calcCal(3.5).toFixed(0)} kcal</td>
                          <td className="py-3 px-4 text-center">{calcCal(5.0).toFixed(0)} kcal</td>
                          <td className="py-3 px-4 text-center">{distanceKm.toFixed(1)} km</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 text-center mt-4">
                * Actual calories burned vary based on individual weight, height, and fitness level
              </p>
            </div>
          </div>
        </section>

        {/* Educational Content */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              Understanding Steps and Calories
            </h2>

            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">
                  How Are Calories Calculated from Steps?
                </h3>
                <p className="text-gray-700 mb-4">
                  The calculation involves multiple factors to provide an accurate estimate:
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-mono text-sm text-[#1A3D7C]">
                      <strong>1. Stride Length</strong> = Height × 0.414
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-mono text-sm text-green-700">
                      <strong>2. Distance</strong> = Stride Length × Number of Steps
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="font-mono text-sm text-purple-700">
                      <strong>3. Time</strong> = Distance ÷ Walking Speed
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="font-mono text-sm text-orange-700">
                      <strong>4. Calories</strong> = Time × MET × 3.5 × Weight ÷ 200
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">
                  What is MET (Metabolic Equivalent)?
                </h3>
                <p className="text-gray-700 mb-4">
                  MET is a measure of exercise intensity. One MET equals the energy expended while sitting quietly. Walking has different MET values based on speed:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-yellow-50 rounded-lg text-center">
                    <p className="text-3xl font-bold text-yellow-600">2.8</p>
                    <p className="text-sm font-medium text-gray-700">Slow Walking</p>
                    <p className="text-xs text-gray-500">2 mph / 3.2 km/h</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <p className="text-3xl font-bold text-green-600">3.5</p>
                    <p className="text-sm font-medium text-gray-700">Average Walking</p>
                    <p className="text-xs text-gray-500">3 mph / 4.8 km/h</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg text-center">
                    <p className="text-3xl font-bold text-red-600">5.0</p>
                    <p className="text-sm font-medium text-gray-700">Fast Walking</p>
                    <p className="text-xs text-gray-500">4 mph / 6.4 km/h</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">
                  Factors That Affect Calories Burned
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">⚖️ Body Weight</h4>
                    <p className="text-gray-700 text-sm">
                      Heavier individuals burn more calories because they expend more energy to move their body mass.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">📏 Height & Stride</h4>
                    <p className="text-gray-700 text-sm">
                      Taller people have longer strides, covering more distance per step but potentially burning slightly fewer calories per step.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">🏃 Walking Speed</h4>
                    <p className="text-gray-700 text-sm">
                      Faster walking increases heart rate and muscle engagement, burning significantly more calories.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">⛰️ Terrain</h4>
                    <p className="text-gray-700 text-sm">
                      Walking uphill or on uneven surfaces increases calorie burn compared to flat, paved surfaces.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">
                  Benefits of Daily Walking
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>Heart Health:</strong> Regular walking reduces risk of heart disease by up to 35%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>Weight Management:</strong> 10,000 daily steps can help maintain healthy weight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>Mental Health:</strong> Walking releases endorphins and reduces stress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>Joint Health:</strong> Low-impact exercise that strengthens joints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>Better Sleep:</strong> Regular walkers report improved sleep quality</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'How many calories do 10,000 steps burn?',
                  a: 'On average, 10,000 steps burns approximately 300-500 calories depending on your weight, height, and walking speed. A 150 lb person walking at average speed burns about 370 calories per 10,000 steps.',
                },
                {
                  q: 'How many steps does it take to burn 100 calories?',
                  a: 'It takes approximately 2,000-3,000 steps to burn 100 calories for most people. Heavier individuals need fewer steps, while lighter individuals need more steps to burn the same amount.',
                },
                {
                  q: 'Does walking speed really matter for calorie burn?',
                  a: 'Yes! Fast walking (4 mph) burns about 60-80% more calories than slow walking (2 mph) for the same duration due to higher exercise intensity and increased heart rate.',
                },
                {
                  q: 'How accurate is this calculator?',
                  a: 'This calculator provides a good estimate using established formulas based on MET values. Actual calories burned may vary by ±10-15% based on individual metabolism, fitness level, and terrain.',
                },
                {
                  q: 'Is 10,000 steps a day enough for weight loss?',
                  a: '10,000 steps burns approximately 300-500 calories, which can support weight loss when combined with a balanced diet. For faster results, aim for 12,000-15,000 steps or increase walking speed.',
                },
                {
                  q: 'How is stride length calculated?',
                  a: 'Stride length is estimated as Height × 0.414 for walking. This multiplier accounts for average walking gait. Running would use a different multiplier (approximately 0.65).',
                },
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Book Your Session CTA */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-[#1A3D7C] to-[#2563eb]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Need Help with Health & Fitness Goals?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Our expert tutors can help you understand nutrition, exercise science, and healthy lifestyle concepts. Book a personalized session today!
            </p>
            <Link href="/book-demo-class">
              <Button size="lg" className="bg-[#FFC857] hover:bg-[#ffb627] text-gray-900 font-semibold px-8">
                Book Your Session
              </Button>
            </Link>
          </div>
        </section>

        {/* Related Calculators */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Related Calculators
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/calculators/calorie-calculator"
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <h3 className="font-semibold text-[#1A3D7C] mb-1">Calorie Calculator</h3>
                <p className="text-sm text-gray-600">Calculate daily calorie needs</p>
              </Link>
              <Link
                href="/calculators/bmi-calculator"
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <h3 className="font-semibold text-[#1A3D7C] mb-1">BMI Calculator</h3>
                <p className="text-sm text-gray-600">Calculate Body Mass Index</p>
              </Link>
              <Link
                href="/calculators/bmr-calculator"
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <h3 className="font-semibold text-[#1A3D7C] mb-1">BMR Calculator</h3>
                <p className="text-sm text-gray-600">Calculate Basal Metabolic Rate</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
