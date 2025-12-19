'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, RotateCcw, Footprints, Ruler, Info, BookOpen, GraduationCap, MapPin } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

type EstimateMethod = 'average' | 'height' | 'stride';
type Sex = 'male' | 'female';
type DistanceUnit = 'mi' | 'km' | 'm' | 'ft';
type HeightUnit = 'ft' | 'cm';
type StrideUnit = 'ft' | 'in' | 'cm' | 'm';

interface Results {
  miles: number;
  kilometers: number;
  meters: number;
  feet: number;
}

export default function StepsToMilesCalculator() {
  const [estimateMethod, setEstimateMethod] = useState<EstimateMethod>('average');
  const [sex, setSex] = useState<Sex>('female');
  const [steps, setSteps] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('ft');
  const [heightFeet, setHeightFeet] = useState<string>('');
  const [heightInches, setHeightInches] = useState<string>('');
  const [strideLength, setStrideLength] = useState<string>('');
  const [strideUnit, setStrideUnit] = useState<StrideUnit>('ft');
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('mi');
  const [results, setResults] = useState<Results | null>(null);

  // Average stride lengths in feet
  const averageStride: Record<Sex, number> = {
    male: 2.5,
    female: 2.2,
  };

  // Convert height to stride length (approximately 41.5% of height for walking)
  const heightToStride = (heightInCm: number): number => {
    // Convert cm to feet for stride
    const heightInFeet = heightInCm / 30.48;
    return heightInFeet * 0.415;
  };

  // Get stride length in feet based on method
  const getStrideLengthInFeet = (): number | null => {
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
      return heightToStride(heightCm);
    } else {
      // Custom stride length
      const stride = parseFloat(strideLength);
      if (isNaN(stride) || stride <= 0) return null;
      // Convert to feet
      switch (strideUnit) {
        case 'ft':
          return stride;
        case 'in':
          return stride / 12;
        case 'cm':
          return stride / 30.48;
        case 'm':
          return stride * 3.28084;
        default:
          return stride;
      }
    }
  };

  // Calculate results
  useEffect(() => {
    const numSteps = parseFloat(steps);
    const strideFeet = getStrideLengthInFeet();

    if (isNaN(numSteps) || numSteps <= 0 || !strideFeet) {
      setResults(null);
      return;
    }

    // Calculate distance in feet
    const distanceFeet = numSteps * strideFeet;

    // Convert to all units
    setResults({
      miles: distanceFeet / 5280,
      kilometers: distanceFeet / 3280.84,
      meters: distanceFeet / 3.28084,
      feet: distanceFeet,
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
    setHeightUnit('ft');
    setStrideUnit('ft');
    setDistanceUnit('mi');
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
      case 'mi':
        return formatNumber(results.miles);
      case 'km':
        return formatNumber(results.kilometers);
      case 'm':
        return formatNumber(results.meters, 0);
      case 'ft':
        return formatNumber(results.feet, 0);
      default:
        return '—';
    }
  };

  // Quick step presets
  const stepPresets = [1000, 2000, 5000, 7500, 10000, 15000, 20000];

  // Reference table data
  const referenceData = [
    { steps: 1000, maleDistance: 0.47, femaleDistance: 0.42 },
    { steps: 2000, maleDistance: 0.95, femaleDistance: 0.83 },
    { steps: 5000, maleDistance: 2.37, femaleDistance: 2.08 },
    { steps: 7500, maleDistance: 3.55, femaleDistance: 3.13 },
    { steps: 10000, maleDistance: 4.73, femaleDistance: 4.17 },
    { steps: 15000, maleDistance: 7.10, femaleDistance: 6.25 },
    { steps: 20000, maleDistance: 9.47, femaleDistance: 8.33 },
  ];

  // Steps per mile reference
  const stepsPerMile = [
    { description: '1 mile (male avg)', steps: 2112 },
    { description: '1 mile (female avg)', steps: 2400 },
    { description: '5K (3.1 miles)', steps: '6,500-7,500' },
    { description: '10K (6.2 miles)', steps: '13,000-15,000' },
    { description: 'Half marathon', steps: '27,000-31,000' },
    { description: 'Marathon', steps: '54,000-62,000' },
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
            <span className="text-gray-600">Steps to Miles Calculator</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
              <Footprints className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Steps to Miles Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Convert your walking steps to miles, kilometers, or other distance units. Calculate based on average stride length, your height, or custom stride measurement.
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
                  className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-3 text-gray-700">average stride length</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="estimateMethod"
                  checked={estimateMethod === 'height'}
                  onChange={() => setEstimateMethod('height')}
                  className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-3 text-gray-700">your height</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="estimateMethod"
                  checked={estimateMethod === 'stride'}
                  onChange={() => setEstimateMethod('stride')}
                  className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-3 text-gray-700">your stride length</span>
              </label>
            </div>
          </div>

          {/* Sex Selection (for average method) */}
          {estimateMethod === 'average' && (
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
                    className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <span className="ml-2 text-gray-700">Male</span>
                </label>
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
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Average stride: Male = 2.5 ft (76 cm), Female = 2.2 ft (67 cm)
              </p>
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
                  onClick={() => setHeightUnit('ft')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    heightUnit === 'ft'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Feet & Inches
                </button>
                <button
                  onClick={() => setHeightUnit('cm')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    heightUnit === 'cm'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Centimeters
                </button>
              </div>
              {heightUnit === 'ft' ? (
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
              ) : (
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter height in cm"
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                />
              )}
              <p className="text-xs text-gray-500 mt-2">
                Stride length is estimated as ~41.5% of your height
              </p>
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
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                />
                <select
                  value={strideUnit}
                  onChange={(e) => setStrideUnit(e.target.value as StrideUnit)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-700 font-medium"
                >
                  <option value="ft">ft</option>
                  <option value="in">in</option>
                  <option value="cm">cm</option>
                  <option value="m">m</option>
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
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
            />
            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2 mt-3">
              {stepPresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setSteps(preset.toString())}
                  className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 rounded-lg transition-colors"
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
              <div className="flex-1 px-4 py-3 bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200 rounded-xl">
                <p className="text-2xl font-bold text-green-800">
                  {getDisplayDistance()}
                </p>
              </div>
              <select
                value={distanceUnit}
                onChange={(e) => setDistanceUnit(e.target.value as DistanceUnit)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-700 font-medium"
              >
                <option value="mi">mi</option>
                <option value="km">km</option>
                <option value="m">m</option>
                <option value="ft">ft</option>
              </select>
            </div>
          </div>

          {/* All Distance Results */}
          {results && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                <p className="text-xs text-blue-700 font-medium">Miles</p>
                <p className="text-lg font-bold text-blue-800">{formatNumber(results.miles)}</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                <p className="text-xs text-purple-700 font-medium">Kilometers</p>
                <p className="text-lg font-bold text-purple-800">{formatNumber(results.kilometers)}</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-3 border border-orange-200">
                <p className="text-xs text-orange-700 font-medium">Meters</p>
                <p className="text-lg font-bold text-orange-800">{formatNumber(results.meters, 0)}</p>
              </div>
              <div className="bg-teal-50 rounded-xl p-3 border border-teal-200">
                <p className="text-xs text-teal-700 font-medium">Feet</p>
                <p className="text-lg font-bold text-teal-800">{formatNumber(results.feet, 0)}</p>
              </div>
            </div>
          )}

          {/* Current Stride Length Display */}
          {getStrideLengthInFeet() && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Stride length used:</span>{' '}
                {formatNumber(getStrideLengthInFeet()!)} ft ({formatNumber(getStrideLengthInFeet()! * 30.48)} cm)
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Steps per mile:</span>{' '}
                {formatNumber(5280 / getStrideLengthInFeet()!, 0)}
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

        {/* Steps to Miles Reference Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-green-600" />
            Steps to Miles Conversion Chart
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Steps</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Miles (Male)</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Miles (Female)</th>
                </tr>
              </thead>
              <tbody>
                {referenceData.map((row) => (
                  <tr key={row.steps} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2.5 px-2 font-medium text-gray-800">{row.steps.toLocaleString()}</td>
                    <td className="py-2.5 px-2 text-blue-700">{row.maleDistance} mi</td>
                    <td className="py-2.5 px-2 text-pink-700">{row.femaleDistance} mi</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            * Based on average stride lengths: Male 2.5 ft, Female 2.2 ft
          </p>
        </div>

        {/* Steps Per Mile Reference */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Ruler className="w-5 h-5 mr-2 text-green-600" />
            How Many Steps in a Mile?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stepsPerMile.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{item.description}</span>
                <span className="font-semibold text-green-700">
                  {typeof item.steps === 'number' ? item.steps.toLocaleString() : item.steps} steps
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Formula Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-green-600" />
            Steps to Miles Formula
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="font-semibold text-green-800 mb-2">Steps to Distance</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-center mb-2">
                Miles = (Steps × Stride) ÷ 5280
              </div>
              <p className="text-sm text-green-700">
                Stride length in feet, 5280 feet per mile
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Distance to Steps</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-center mb-2">
                Steps = (Miles × 5280) ÷ Stride
              </div>
              <p className="text-sm text-blue-700">
                Calculate steps needed for a target distance
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <h3 className="font-semibold text-purple-800 mb-2">Stride from Height</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-center mb-2">
                Stride ≈ Height × 0.415
              </div>
              <p className="text-sm text-purple-700">
                Walking stride is approximately 41.5% of height
              </p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4">
              <h3 className="font-semibold text-orange-800 mb-2">Steps per Mile</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-center mb-2">
                Steps/Mile = 5280 ÷ Stride
              </div>
              <p className="text-sm text-orange-700">
                Male avg: ~2,112 | Female avg: ~2,400
              </p>
            </div>
          </div>
        </div>

        {/* Understanding Stride Length */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2 text-green-600" />
            Understanding Stride Length
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is Stride Length?</h3>
              <p className="text-gray-600 leading-relaxed">
                Stride length is the distance covered in a single step, measured from heel to heel.
                It varies based on height, leg length, walking speed, and individual gait patterns.
                For walking, stride length is typically about 41-45% of your height.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Factors Affecting Stride Length</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Height:</strong> Taller individuals generally have longer strides</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Walking speed:</strong> Faster walking increases stride length</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Terrain:</strong> Uphill walking shortens stride, downhill lengthens it</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Age:</strong> Stride length typically decreases with age</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
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
                <li>Measure the total distance</li>
                <li>Divide by the number of steps taken</li>
              </ol>
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
              <h3 className="font-semibold text-gray-800 mb-2">How many steps are in a mile?</h3>
              <p className="text-gray-600">
                On average, there are about 2,000-2,500 steps in a mile. For men with an average stride of 2.5 feet,
                it&apos;s approximately 2,112 steps. For women with an average stride of 2.2 feet, it&apos;s approximately
                2,400 steps. Your actual number depends on your height and stride length.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How far is 10,000 steps?</h3>
              <p className="text-gray-600">
                10,000 steps is approximately 4-5 miles (6.4-8 km). For men with average stride, it&apos;s about
                4.73 miles. For women, it&apos;s about 4.17 miles. This is the commonly recommended daily step goal
                for general health and fitness.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Why does stride length matter?</h3>
              <p className="text-gray-600">
                Stride length directly affects how far you travel with each step. A longer stride means fewer
                steps to cover the same distance. Using your actual stride length (rather than averages) gives
                you more accurate distance measurements from your step count.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Is walking stride different from running stride?</h3>
              <p className="text-gray-600">
                Yes, running stride is typically 1.5-2 times longer than walking stride. When running, you have
                a brief airborne phase where both feet are off the ground, allowing for longer steps. This
                calculator is designed for walking stride lengths.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How accurate are fitness trackers at counting steps?</h3>
              <p className="text-gray-600">
                Most modern fitness trackers are 95-99% accurate for step counting during normal walking.
                Accuracy can decrease during activities like cycling, pushing a stroller, or carrying objects.
                Wrist-worn devices may miss steps if your arms don&apos;t swing naturally.
              </p>
            </div>
          </div>
        </div>

        {/* Related Calculators */}
        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-lg border border-green-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/calculators/steps-to-calories-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Steps to Calories Calculator</h3>
              <p className="text-sm text-gray-600">Calculate calories burned from walking steps</p>
            </Link>
            <Link
              href="/calculators/bmi-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">BMI Calculator</h3>
              <p className="text-sm text-gray-600">Calculate Body Mass Index for health assessment</p>
            </Link>
            <Link
              href="/calculators/calorie-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Calorie Calculator</h3>
              <p className="text-sm text-gray-600">Calculate daily calorie needs for your goals</p>
            </Link>
            <Link
              href="/calculators/speed-distance-time-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
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
            "name": "Steps to Miles Calculator",
            "description": "Convert walking steps to miles, kilometers, and other distance units based on stride length, height, or averages.",
            "url": "https://www.thetutorbridge.com/calculators/steps-to-miles-calculator",
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
                "name": "How many steps are in a mile?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "On average, there are about 2,000-2,500 steps in a mile. For men with an average stride of 2.5 feet, it's approximately 2,112 steps. For women with an average stride of 2.2 feet, it's approximately 2,400 steps."
                }
              },
              {
                "@type": "Question",
                "name": "How far is 10,000 steps?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "10,000 steps is approximately 4-5 miles (6.4-8 km). For men with average stride, it's about 4.73 miles. For women, it's about 4.17 miles."
                }
              },
              {
                "@type": "Question",
                "name": "Why does stride length matter?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Stride length directly affects how far you travel with each step. A longer stride means fewer steps to cover the same distance. Using your actual stride length gives you more accurate distance measurements."
                }
              },
              {
                "@type": "Question",
                "name": "Is walking stride different from running stride?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, running stride is typically 1.5-2 times longer than walking stride. When running, you have a brief airborne phase where both feet are off the ground, allowing for longer steps."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
