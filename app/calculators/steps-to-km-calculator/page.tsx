'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, RotateCcw, Footprints, Ruler, Info, BookOpen, GraduationCap, MapPin } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

type EstimateMethod = 'average' | 'height' | 'stride';
type Sex = 'male' | 'female';
type DistanceUnit = 'km' | 'm' | 'mi' | 'ft';
type HeightUnit = 'cm' | 'ft';
type StrideUnit = 'cm' | 'm' | 'ft' | 'in';

interface Results {
  kilometers: number;
  meters: number;
  miles: number;
  feet: number;
}

export default function StepsToKmCalculator() {
  const [estimateMethod, setEstimateMethod] = useState<EstimateMethod>('average');
  const [sex, setSex] = useState<Sex>('female');
  const [steps, setSteps] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm');
  const [heightFeet, setHeightFeet] = useState<string>('');
  const [heightInches, setHeightInches] = useState<string>('');
  const [strideLength, setStrideLength] = useState<string>('');
  const [strideUnit, setStrideUnit] = useState<StrideUnit>('cm');
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('km');
  const [results, setResults] = useState<Results | null>(null);

  // Average stride lengths in centimeters (based on reference)
  const averageStride: Record<Sex, number> = {
    male: 76,   // 76 cm for men
    female: 67, // 67 cm for women
  };

  // Height to stride length coefficient (based on reference)
  const heightCoefficient: Record<Sex, number> = {
    male: 0.415,
    female: 0.413,
  };

  // Convert height to stride length in cm
  const heightToStride = (heightInCm: number, gender: Sex): number => {
    return heightInCm * heightCoefficient[gender];
  };

  // Get stride length in centimeters based on method
  const getStrideLengthInCm = (): number | null => {
    if (estimateMethod === 'average') {
      return averageStride[sex];
    } else if (estimateMethod === 'height') {
      let heightCm: number;
      if (heightUnit === 'ft') {
        const ft = parseFloat(heightFeet) || 0;
        const inch = parseFloat(heightInches) || 0;
        heightCm = (ft * 12 + inch) * 2.54;
      } else {
        heightCm = parseFloat(height);
      }
      if (isNaN(heightCm) || heightCm <= 0) return null;
      return heightToStride(heightCm, sex);
    } else {
      // Custom stride length
      const stride = parseFloat(strideLength);
      if (isNaN(stride) || stride <= 0) return null;
      // Convert to centimeters
      switch (strideUnit) {
        case 'cm':
          return stride;
        case 'm':
          return stride * 100;
        case 'ft':
          return stride * 30.48;
        case 'in':
          return stride * 2.54;
        default:
          return stride;
      }
    }
  };

  // Calculate results
  useEffect(() => {
    const numSteps = parseFloat(steps);
    const strideCm = getStrideLengthInCm();

    if (isNaN(numSteps) || numSteps <= 0 || !strideCm) {
      setResults(null);
      return;
    }

    // Calculate distance in centimeters
    const distanceCm = numSteps * strideCm;

    // Convert to all units
    setResults({
      kilometers: distanceCm / 100000,
      meters: distanceCm / 100,
      miles: distanceCm / 160934.4,
      feet: distanceCm / 30.48,
    });
  }, [steps, estimateMethod, sex, height, heightUnit, heightFeet, heightInches, strideLength, strideUnit]);

  const handleReset = () => {
    setSteps('');
    setHeight('');
    setHeightFeet('');
    setHeightInches('');
    setStrideLength('');
    setEstimateMethod('average');
    setSex('female');
    setHeightUnit('cm');
    setStrideUnit('cm');
    setDistanceUnit('km');
    setResults(null);
  };

  const formatNumber = (num: number, decimals: number = 2): string => {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.01) return num.toFixed(4);
    return num.toLocaleString('en-US', { maximumFractionDigits: decimals });
  };

  const getDisplayDistance = (): string => {
    if (!results) return '—';
    switch (distanceUnit) {
      case 'km':
        return formatNumber(results.kilometers);
      case 'm':
        return formatNumber(results.meters, 0);
      case 'mi':
        return formatNumber(results.miles);
      case 'ft':
        return formatNumber(results.feet, 0);
      default:
        return '—';
    }
  };

  // Quick step presets
  const stepPresets = [1000, 2000, 5000, 7500, 10000, 15000, 20000];

  // Reference table data (in km)
  const referenceData = [
    { steps: 1000, maleDistance: 0.76, femaleDistance: 0.67 },
    { steps: 2000, maleDistance: 1.52, femaleDistance: 1.34 },
    { steps: 5000, maleDistance: 3.80, femaleDistance: 3.35 },
    { steps: 7500, maleDistance: 5.70, femaleDistance: 5.03 },
    { steps: 10000, maleDistance: 7.60, femaleDistance: 6.70 },
    { steps: 15000, maleDistance: 11.40, femaleDistance: 10.05 },
    { steps: 20000, maleDistance: 15.20, femaleDistance: 13.40 },
  ];

  // Steps per km reference
  const stepsPerKm = [
    { description: '1 km (male avg)', steps: 1316 },
    { description: '1 km (female avg)', steps: 1493 },
    { description: '5K run', steps: '6,500-7,500' },
    { description: '10K run', steps: '13,000-15,000' },
    { description: 'Half marathon (21.1 km)', steps: '27,000-31,000' },
    { description: 'Marathon (42.2 km)', steps: '54,000-62,000' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm py-3 px-4 sm:px-6 shadow-sm">
        <div className="container mx-auto max-w-4xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/calculators" className="text-blue-600 hover:text-blue-800">
              Calculators
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Steps to Km Calculator</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
              <Footprints className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Steps to Km Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Convert your walking steps to kilometers. Calculate distance based on average stride length, your height, or custom stride measurement. Find out how far 10,000 steps is in km!
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
          {/* Estimate Method Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
              Estimate based on
              <span className="ml-2 text-gray-400 cursor-help" title="Choose how to estimate your stride length">
                <Info className="w-4 h-4" />
              </span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="estimateMethod"
                  checked={estimateMethod === 'average'}
                  onChange={() => setEstimateMethod('average')}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">average stride length</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="estimateMethod"
                  checked={estimateMethod === 'height'}
                  onChange={() => setEstimateMethod('height')}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">your height</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="estimateMethod"
                  checked={estimateMethod === 'stride'}
                  onChange={() => setEstimateMethod('stride')}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">your stride length</span>
              </label>
            </div>
          </div>

          {/* Sex Selection (for average method) */}
          {(estimateMethod === 'average' || estimateMethod === 'height') && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Sex
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="sex"
                    checked={sex === 'male'}
                    onChange={() => setSex('male')}
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Male</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="sex"
                    checked={sex === 'female'}
                    onChange={() => setSex('female')}
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Female</span>
                </label>
              </div>
              {estimateMethod === 'average' && (
                <p className="text-xs text-gray-500 mt-2">
                  Average stride: Male = 76 cm, Female = 67 cm
                </p>
              )}
              {estimateMethod === 'height' && (
                <p className="text-xs text-gray-500 mt-2">
                  Stride coefficient: Male = height × 0.415, Female = height × 0.413
                </p>
              )}
            </div>
          )}

          {/* Height Input (for height method) */}
          {estimateMethod === 'height' && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Height
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => setHeightUnit('cm')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    heightUnit === 'cm'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Centimeters
                </button>
                <button
                  onClick={() => setHeightUnit('ft')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    heightUnit === 'ft'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Feet & Inches
                </button>
              </div>
              {heightUnit === 'cm' ? (
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter height in cm (e.g., 170)"
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Stride Length Input (for stride method) */}
          {estimateMethod === 'stride' && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Stride Length
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={strideLength}
                  onChange={(e) => setStrideLength(e.target.value)}
                  placeholder="Enter stride length"
                  min="0"
                  step="0.1"
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
                <select
                  value={strideUnit}
                  onChange={(e) => setStrideUnit(e.target.value as StrideUnit)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 font-medium"
                >
                  <option value="cm">cm</option>
                  <option value="m">m</option>
                  <option value="ft">ft</option>
                  <option value="in">in</option>
                </select>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Measure from heel to heel during normal walking pace
              </p>
            </div>
          )}

          {/* Steps Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Steps
            </label>
            <input
              type="number"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              placeholder="Enter number of steps"
              min="0"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2 mt-3">
              {stepPresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setSteps(preset.toString())}
                  className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-lg transition-colors"
                >
                  {preset.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Distance Result */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Distance
            </label>
            <div className="flex gap-2">
              <div className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
                <p className="text-2xl font-bold text-blue-800">
                  {getDisplayDistance()}
                </p>
              </div>
              <select
                value={distanceUnit}
                onChange={(e) => setDistanceUnit(e.target.value as DistanceUnit)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 font-medium"
              >
                <option value="km">km</option>
                <option value="m">m</option>
                <option value="mi">mi</option>
                <option value="ft">ft</option>
              </select>
            </div>
          </div>

          {/* All Distance Results */}
          {results && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                <p className="text-xs text-blue-700 font-medium">Kilometers</p>
                <p className="text-lg font-bold text-blue-800">{formatNumber(results.kilometers)}</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                <p className="text-xs text-purple-700 font-medium">Meters</p>
                <p className="text-lg font-bold text-purple-800">{formatNumber(results.meters, 0)}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-3 border border-green-200">
                <p className="text-xs text-green-700 font-medium">Miles</p>
                <p className="text-lg font-bold text-green-800">{formatNumber(results.miles)}</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-3 border border-orange-200">
                <p className="text-xs text-orange-700 font-medium">Feet</p>
                <p className="text-lg font-bold text-orange-800">{formatNumber(results.feet, 0)}</p>
              </div>
            </div>
          )}

          {/* Current Stride Length Display */}
          {getStrideLengthInCm() && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Stride length used:</span>{' '}
                {formatNumber(getStrideLengthInCm()!)} cm ({formatNumber(getStrideLengthInCm()! / 100, 2)} m)
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Steps per kilometer:</span>{' '}
                {formatNumber(100000 / getStrideLengthInCm()!, 0)}
              </p>
            </div>
          )}

          {/* Reset Button */}
          <div className="flex justify-center">
            <button
              onClick={handleReset}
              className="flex items-center px-6 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear all changes
            </button>
          </div>
        </div>

        {/* Steps to Km Reference Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            Steps to Kilometers Conversion Chart
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Steps</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Distance (Male)</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Distance (Female)</th>
                </tr>
              </thead>
              <tbody>
                {referenceData.map((row) => (
                  <tr key={row.steps} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2.5 px-2 font-medium text-gray-800">{row.steps.toLocaleString()}</td>
                    <td className="py-2.5 px-2 text-blue-700">{row.maleDistance} km</td>
                    <td className="py-2.5 px-2 text-pink-700">{row.femaleDistance} km</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            * Based on average stride lengths: Male 76 cm, Female 67 cm
          </p>
        </div>

        {/* Steps Per Km Reference */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Ruler className="w-5 h-5 mr-2 text-blue-600" />
            How Many Steps in a Kilometer?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stepsPerKm.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{item.description}</span>
                <span className="font-semibold text-blue-700">
                  {typeof item.steps === 'number' ? item.steps.toLocaleString() : item.steps} steps
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Key insight:</strong> On average, 1 kilometer equals approximately 1,300-1,500 steps,
              depending on your stride length. Women typically need about 1,493 steps per km, while men
              need roughly 1,316 steps per km.
            </p>
          </div>
        </div>

        {/* Formula Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-blue-600" />
            Steps to Km Formula
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Steps to Distance</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-center mb-2">
                Distance = Steps × Stride Length
              </div>
              <p className="text-sm text-blue-700">
                Example: 10,000 steps × 76 cm = 760,000 cm = 7.6 km
              </p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4">
              <h3 className="font-semibold text-indigo-800 mb-2">Distance to Steps</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-center mb-2">
                Steps = Distance ÷ Stride Length
              </div>
              <p className="text-sm text-indigo-700">
                Example: 5 km ÷ 0.76 m = 6,579 steps (male avg)
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <h3 className="font-semibold text-purple-800 mb-2">Stride from Height (Male)</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-center mb-2">
                Stride = Height × 0.415
              </div>
              <p className="text-sm text-purple-700">
                Example: 180 cm × 0.415 = 74.7 cm stride
              </p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4">
              <h3 className="font-semibold text-pink-800 mb-2">Stride from Height (Female)</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-center mb-2">
                Stride = Height × 0.413
              </div>
              <p className="text-sm text-pink-700">
                Example: 165 cm × 0.413 = 68.1 cm stride
              </p>
            </div>
          </div>
        </div>

        {/* Quick Answers Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Answers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">How far is 10,000 steps in km?</h3>
              <p className="text-gray-600 text-sm">
                Using average stride lengths: <strong className="text-blue-700">7.6 km for men</strong> and
                <strong className="text-pink-700"> 6.7 km for women</strong>. The general average with a
                74 cm stride is about 7.4 km.
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">How many steps in 1 km?</h3>
              <p className="text-gray-600 text-sm">
                Approximately <strong className="text-blue-700">1,316 steps for men</strong> and
                <strong className="text-pink-700"> 1,493 steps for women</strong>. The general range
                is 1,300-1,500 steps per kilometer.
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">How far is 5,000 steps?</h3>
              <p className="text-gray-600 text-sm">
                About <strong className="text-blue-700">3.8 km for men</strong> and
                <strong className="text-pink-700"> 3.35 km for women</strong> using average stride lengths.
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">How many steps for 5K?</h3>
              <p className="text-gray-600 text-sm">
                A 5K (5 kilometers) walk requires approximately
                <strong className="text-blue-700"> 6,500-7,500 steps</strong> depending on your stride length.
              </p>
            </div>
          </div>
        </div>

        {/* Understanding Stride Length */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-600" />
            Understanding Stride Length
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is Stride Length?</h3>
              <p className="text-gray-600 leading-relaxed">
                Stride length (or step length) is the distance covered in a single step, measured from
                the heel of one foot to the heel of the same foot after it lands again. For walking,
                stride length is typically about 41-42% of your height. This is different from running,
                where stride length is considerably longer.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Average Stride Lengths</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="font-semibold text-blue-800">Men</p>
                  <p className="text-blue-700">Average: 76 cm (0.76 m)</p>
                  <p className="text-sm text-blue-600">Height coefficient: 0.415</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-xl">
                  <p className="font-semibold text-pink-800">Women</p>
                  <p className="text-pink-700">Average: 67 cm (0.67 m)</p>
                  <p className="text-sm text-pink-600">Height coefficient: 0.413</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Factors Affecting Stride Length</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Height:</strong> Taller individuals generally have longer strides</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Leg length:</strong> Longer legs typically mean longer strides</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Walking speed:</strong> Does NOT significantly affect stride length (contrary to popular belief)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Terrain:</strong> Uphill walking shortens stride, downhill may lengthen it</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Fitness level:</strong> Regular walkers often develop more efficient strides</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">How to Measure Your Stride</h3>
              <ol className="text-yellow-700 space-y-1 text-sm list-decimal list-inside">
                <li>Mark a starting point on the ground</li>
                <li>Walk at your normal pace for 10-20 steps</li>
                <li>Mark where your last step lands</li>
                <li>Measure the total distance in centimeters or meters</li>
                <li>Divide by the number of steps taken</li>
              </ol>
              <p className="text-yellow-600 text-sm mt-2">
                Alternatively, walk a known distance (like 100 meters) and count your steps, then divide.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How many steps are in a kilometer?</h3>
              <p className="text-gray-600">
                On average, there are approximately 1,300-1,500 steps in a kilometer. For men with an
                average stride of 76 cm, it&apos;s about 1,316 steps. For women with an average stride
                of 67 cm, it&apos;s approximately 1,493 steps. Your actual number depends on your height
                and individual stride length.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How far is 10,000 steps in kilometers?</h3>
              <p className="text-gray-600">
                10,000 steps equals approximately 7.4 km using the general average stride of 74 cm.
                For men with a 76 cm stride, it&apos;s about 7.6 km. For women with a 67 cm stride,
                it&apos;s about 6.7 km. This is the commonly recommended daily step goal for general
                health and fitness.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Is 10,000 steps a day enough?</h3>
              <p className="text-gray-600">
                While 10,000 steps is a popular goal, research suggests that health benefits start
                at around 7,000-8,000 steps per day. Any increase in daily steps from a sedentary
                baseline provides health benefits. The 10,000 steps goal (equivalent to about 7-8 km)
                is a good target for general fitness.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Does walking speed affect the steps-to-km conversion?</h3>
              <p className="text-gray-600">
                Interestingly, walking speed does NOT significantly affect stride length during normal
                walking. Your stride is primarily determined by your height and anatomy, not your pace.
                However, running does increase stride length substantially compared to walking.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How accurate are fitness trackers at counting steps?</h3>
              <p className="text-gray-600">
                Most modern fitness trackers and smartphones are 95-99% accurate for step counting during
                normal walking. Accuracy can decrease during activities like cycling, pushing a cart, or
                when your arms don&apos;t swing naturally. Wrist-worn devices may miss steps if your arms
                are stationary.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Why use stride length instead of a fixed conversion?</h3>
              <p className="text-gray-600">
                Using your personal stride length gives much more accurate results. A tall person with
                a 90 cm stride covers nearly 35% more distance per step than someone with a 67 cm stride.
                This can mean a difference of over 2 km when calculating 10,000 steps!
              </p>
            </div>
          </div>
        </div>

        {/* Related Calculators */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/calculators/steps-to-miles-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Steps to Miles Calculator</h3>
              <p className="text-sm text-gray-600">Convert walking steps to miles and other distance units</p>
            </Link>
            <Link
              href="/calculators/calories-burned-walking-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Calories Burned Walking Calculator</h3>
              <p className="text-sm text-gray-600">Calculate calories burned from walking distance or steps</p>
            </Link>
            <Link
              href="/calculators/bmi-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">BMI Calculator</h3>
              <p className="text-sm text-gray-600">Calculate Body Mass Index for health assessment</p>
            </Link>
            <Link
              href="/calculators/speed-distance-time-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Speed Distance Time Calculator</h3>
              <p className="text-sm text-gray-600">Calculate speed, distance, or time for any journey</p>
            </Link>
          </div>
        </div>

        {/* Book Your Session CTA */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2563eb] rounded-2xl shadow-xl p-6 sm:p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <GraduationCap className="w-12 h-12 text-[#FFC857] mr-4 flex-shrink-0" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Need Help with Health & Fitness Goals?</h2>
                <p className="text-blue-100">
                  Our tutors can help you understand the science behind fitness, nutrition, and healthy living.
                </p>
              </div>
            </div>
            <Link
              href="/tutoring/free-consultation"
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
            "name": "Steps to Km Calculator",
            "description": "Convert walking steps to kilometers based on stride length, height, or gender averages. Find how far 10,000 steps is in km.",
            "url": "https://www.thetutorbridge.com/calculators/steps-to-km-calculator",
            "applicationCategory": "UtilityApplication",
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
                "name": "How many steps are in a kilometer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "On average, there are approximately 1,300-1,500 steps in a kilometer. For men with an average stride of 76 cm, it's about 1,316 steps. For women with an average stride of 67 cm, it's approximately 1,493 steps."
                }
              },
              {
                "@type": "Question",
                "name": "How far is 10,000 steps in kilometers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "10,000 steps equals approximately 7.4 km using the general average stride of 74 cm. For men with a 76 cm stride, it's about 7.6 km. For women with a 67 cm stride, it's about 6.7 km."
                }
              },
              {
                "@type": "Question",
                "name": "Does walking speed affect the steps-to-km conversion?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Walking speed does NOT significantly affect stride length during normal walking. Your stride is primarily determined by your height and anatomy, not your pace."
                }
              },
              {
                "@type": "Question",
                "name": "Why use stride length instead of a fixed conversion?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Using your personal stride length gives much more accurate results. A tall person with a 90 cm stride covers nearly 35% more distance per step than someone with a 67 cm stride."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
