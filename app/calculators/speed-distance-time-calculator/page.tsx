'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calculator, Gauge } from 'lucide-react';

type CalculationType = 'speed' | 'distance' | 'time';

interface CalculationResult {
  value: number;
  unit: string;
  formula: string;
  displayValue: string;
}

export default function SpeedDistanceTimeCalculatorPage() {
  const [calculationType, setCalculationType] = useState<CalculationType>('speed');

  // Distance inputs
  const [distanceValue, setDistanceValue] = useState('');
  const [distanceUnit, setDistanceUnit] = useState('mi');

  // Speed inputs
  const [speedValue, setSpeedValue] = useState('');
  const [speedUnit, setSpeedUnit] = useState('mph');

  // Time inputs
  const [timeValue, setTimeValue] = useState('');
  const [timeUnit, setTimeUnit] = useState('hr');

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState('');

  const clearInputs = () => {
    setDistanceValue('');
    setSpeedValue('');
    setTimeValue('');
    setResult(null);
    setError('');
  };

  // Unit conversion functions
  const convertDistanceToMeters = (value: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      'm': 1,
      'km': 1000,
      'mi': 1609.34,
      'ft': 0.3048,
      'yd': 0.9144,
    };
    return value * (conversions[unit] || 1);
  };

  const convertSpeedToMPS = (value: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      'mps': 1,
      'kph': 1000 / 3600,
      'mph': 1609.34 / 3600,
      'fps': 0.3048,
    };
    return value * (conversions[unit] || 1);
  };

  const convertTimeToSeconds = (value: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      's': 1,
      'min': 60,
      'hr': 3600,
      'day': 86400,
    };
    return value * (conversions[unit] || 1);
  };

  const convertFromMeters = (value: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      'm': 1,
      'km': 0.001,
      'mi': 1 / 1609.34,
      'ft': 1 / 0.3048,
      'yd': 1 / 0.9144,
    };
    return value * (conversions[unit] || 1);
  };

  const convertFromMPS = (value: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      'mps': 1,
      'kph': 3600 / 1000,
      'mph': 3600 / 1609.34,
      'fps': 1 / 0.3048,
    };
    return value * (conversions[unit] || 1);
  };

  const convertFromSeconds = (value: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      's': 1,
      'min': 1 / 60,
      'hr': 1 / 3600,
      'day': 1 / 86400,
    };
    return value * (conversions[unit] || 1);
  };

  const getUnitLabel = (unit: string): string => {
    const labels: { [key: string]: string } = {
      // Distance
      'm': 'meters',
      'km': 'kilometers',
      'mi': 'miles',
      'ft': 'feet',
      'yd': 'yards',
      // Speed
      'mps': 'm/s',
      'kph': 'km/h',
      'mph': 'mph',
      'fps': 'ft/s',
      // Time
      's': 'seconds',
      'min': 'minutes',
      'hr': 'hours',
      'day': 'days',
    };
    return labels[unit] || unit;
  };

  const calculate = () => {
    setError('');
    setResult(null);

    try {
      if (calculationType === 'speed') {
        // Calculate speed = distance / time
        if (!distanceValue || !timeValue) {
          setError('Please enter distance and time values');
          return;
        }

        const distance = parseFloat(distanceValue);
        const time = parseFloat(timeValue);

        if (isNaN(distance) || isNaN(time) || distance <= 0 || time <= 0) {
          setError('Please enter valid positive numbers for distance and time');
          return;
        }

        // Convert to base units
        const distanceInMeters = convertDistanceToMeters(distance, distanceUnit);
        const timeInSeconds = convertTimeToSeconds(time, timeUnit);

        // Calculate speed in m/s
        const speedInMPS = distanceInMeters / timeInSeconds;

        // Convert to desired unit
        const speedResult = convertFromMPS(speedInMPS, speedUnit);

        setResult({
          value: speedResult,
          unit: speedUnit,
          formula: 'speed = distance ÷ time',
          displayValue: `speed = ${speedResult.toFixed(2)} ${getUnitLabel(speedUnit)}`,
        });

      } else if (calculationType === 'distance') {
        // Calculate distance = speed × time
        if (!speedValue || !timeValue) {
          setError('Please enter speed and time values');
          return;
        }

        const speed = parseFloat(speedValue);
        const time = parseFloat(timeValue);

        if (isNaN(speed) || isNaN(time) || speed <= 0 || time <= 0) {
          setError('Please enter valid positive numbers for speed and time');
          return;
        }

        // Convert to base units
        const speedInMPS = convertSpeedToMPS(speed, speedUnit);
        const timeInSeconds = convertTimeToSeconds(time, timeUnit);

        // Calculate distance in meters
        const distanceInMeters = speedInMPS * timeInSeconds;

        // Convert to desired unit
        const distanceResult = convertFromMeters(distanceInMeters, distanceUnit);

        setResult({
          value: distanceResult,
          unit: distanceUnit,
          formula: 'distance = speed × time',
          displayValue: `distance = ${distanceResult.toFixed(2)} ${getUnitLabel(distanceUnit)}`,
        });

      } else if (calculationType === 'time') {
        // Calculate time = distance / speed
        if (!distanceValue || !speedValue) {
          setError('Please enter distance and speed values');
          return;
        }

        const distance = parseFloat(distanceValue);
        const speed = parseFloat(speedValue);

        if (isNaN(distance) || isNaN(speed) || distance <= 0 || speed <= 0) {
          setError('Please enter valid positive numbers for distance and speed');
          return;
        }

        // Convert to base units
        const distanceInMeters = convertDistanceToMeters(distance, distanceUnit);
        const speedInMPS = convertSpeedToMPS(speed, speedUnit);

        // Calculate time in seconds
        const timeInSeconds = distanceInMeters / speedInMPS;

        // Convert to desired unit
        const timeResult = convertFromSeconds(timeInSeconds, timeUnit);

        setResult({
          value: timeResult,
          unit: timeUnit,
          formula: 'time = distance ÷ speed',
          displayValue: `time = ${timeResult.toFixed(2)} ${getUnitLabel(timeUnit)}`,
        });
      }
    } catch (err) {
      setError('Error calculating. Please check your inputs.');
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-full mb-6">
              <Gauge className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1A3D7C] mb-4">
              Speed Distance Time Calculator
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Calculate speed, distance, or time using the formula: speed = distance/time
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12 border-2 border-gray-200">
            <div className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white py-4 px-6 rounded-lg mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold">Speed Distance Time Calculator</h2>
            </div>

            {/* Choose Calculation Type */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 text-center mb-3">Choose a Calculation</h3>
              <p className="text-center text-gray-600 italic mb-4">then enter the known values below</p>

              <div className="flex justify-center">
                <select
                  value={calculationType}
                  onChange={(e) => {
                    setCalculationType(e.target.value as CalculationType);
                    clearInputs();
                  }}
                  className="w-64 px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none font-semibold"
                >
                  <option value="speed">Solve for Speed</option>
                  <option value="distance">Solve for Distance</option>
                  <option value="time">Solve for Time</option>
                </select>
              </div>
            </div>

            {/* Formula Display */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-8 text-center">
              <p className="text-2xl font-bold text-gray-800 italic">
                {calculationType === 'speed' && 'speed = distance ÷ time'}
                {calculationType === 'distance' && 'distance = speed × time'}
                {calculationType === 'time' && 'time = distance ÷ speed'}
              </p>
            </div>

            {/* Input Fields */}
            <div className="space-y-6 mb-8">
              {/* Distance Input */}
              {calculationType !== 'distance' && (
                <div className="flex items-center gap-4">
                  <label className="w-32 text-lg font-semibold text-gray-800">distance =</label>
                  <Input
                    type="number"
                    value={distanceValue}
                    onChange={(e) => setDistanceValue(e.target.value)}
                    placeholder="165"
                    className="flex-1 text-lg py-6"
                    min="0"
                    step="any"
                  />
                  <select
                    value={distanceUnit}
                    onChange={(e) => setDistanceUnit(e.target.value)}
                    className="w-32 px-3 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="mi">mi</option>
                    <option value="km">km</option>
                    <option value="m">m</option>
                    <option value="ft">ft</option>
                    <option value="yd">yd</option>
                  </select>
                </div>
              )}

              {/* Speed Input/Output */}
              {calculationType === 'speed' ? (
                <div className="flex items-center gap-4">
                  <label className="w-32 text-lg font-semibold text-gray-800">speed =</label>
                  <div className="flex-1 px-4 py-3 bg-gray-100 rounded-lg text-lg text-gray-500 italic flex items-center">
                    (answer units)
                  </div>
                  <select
                    value={speedUnit}
                    onChange={(e) => setSpeedUnit(e.target.value)}
                    className="w-48 px-3 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="mph">mi/h (mph)</option>
                    <option value="kph">km/h</option>
                    <option value="mps">m/s</option>
                    <option value="fps">ft/s</option>
                  </select>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <label className="w-32 text-lg font-semibold text-gray-800">speed =</label>
                  <Input
                    type="number"
                    value={speedValue}
                    onChange={(e) => setSpeedValue(e.target.value)}
                    placeholder="55"
                    className="flex-1 text-lg py-6"
                    min="0"
                    step="any"
                  />
                  <select
                    value={speedUnit}
                    onChange={(e) => setSpeedUnit(e.target.value)}
                    className="w-48 px-3 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="mph">mi/h (mph)</option>
                    <option value="kph">km/h</option>
                    <option value="mps">m/s</option>
                    <option value="fps">ft/s</option>
                  </select>
                </div>
              )}

              {/* Time Input */}
              {calculationType !== 'time' && (
                <div className="flex items-center gap-4">
                  <label className="w-32 text-lg font-semibold text-gray-800">time =</label>
                  <Input
                    type="number"
                    value={timeValue}
                    onChange={(e) => setTimeValue(e.target.value)}
                    placeholder="3"
                    className="flex-1 text-lg py-6"
                    min="0"
                    step="any"
                  />
                  <select
                    value={timeUnit}
                    onChange={(e) => setTimeUnit(e.target.value)}
                    className="w-32 px-3 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="hr">hr</option>
                    <option value="min">min</option>
                    <option value="s">s</option>
                    <option value="day">day</option>
                  </select>
                </div>
              )}

              {/* Distance Output */}
              {calculationType === 'distance' && (
                <div className="flex items-center gap-4">
                  <label className="w-32 text-lg font-semibold text-gray-800">distance =</label>
                  <div className="flex-1 px-4 py-3 bg-gray-100 rounded-lg text-lg text-gray-500 italic flex items-center">
                    (answer units)
                  </div>
                  <select
                    value={distanceUnit}
                    onChange={(e) => setDistanceUnit(e.target.value)}
                    className="w-32 px-3 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="mi">mi</option>
                    <option value="km">km</option>
                    <option value="m">m</option>
                    <option value="ft">ft</option>
                    <option value="yd">yd</option>
                  </select>
                </div>
              )}

              {/* Time Output */}
              {calculationType === 'time' && (
                <div className="flex items-center gap-4">
                  <label className="w-32 text-lg font-semibold text-gray-800">time =</label>
                  <div className="flex-1 px-4 py-3 bg-gray-100 rounded-lg text-lg text-gray-500 italic flex items-center">
                    (answer units)
                  </div>
                  <select
                    value={timeUnit}
                    onChange={(e) => setTimeUnit(e.target.value)}
                    className="w-32 px-3 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="hr">hr</option>
                    <option value="min">min</option>
                    <option value="s">s</option>
                    <option value="day">day</option>
                  </select>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-center mb-8">
              <Button
                onClick={clearInputs}
                variant="outline"
                className="px-12 py-6 text-lg font-semibold border-2 border-gray-400 hover:bg-gray-100"
              >
                Clear
              </Button>
              <Button
                onClick={calculate}
                className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] hover:from-[#15325f] hover:to-[#239654] text-white"
              >
                Calculate
              </Button>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-6">
                <p className="text-red-700 text-center font-semibold">{error}</p>
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="bg-gradient-to-b from-gray-50 to-white border-2 border-gray-300 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Answer:</h3>

                <div className="space-y-4 text-center">
                  <p className="text-3xl font-bold text-gray-900">
                    {result.displayValue}
                  </p>

                  <div className="pt-4 border-t-2 border-gray-300">
                    <p className="text-xl text-gray-700">
                      = {result.value.toFixed(2)} {result.unit === 'mph' ? 'mi/h' : result.unit}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Educational Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Calculator className="mr-3 h-8 w-8 text-[#2BAE66]" />
              Speed, Distance, and Time Relationship
            </h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
              <p className="text-lg">
                The relationship between <strong>speed</strong>, <strong>distance</strong>, and <strong>time</strong> is one of the most fundamental concepts in physics and everyday life. These three quantities are connected by a simple but powerful formula.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-4">
                <p className="text-2xl font-bold text-center mb-3">
                  speed = distance ÷ time
                </p>
                <p className="text-center text-lg">
                  or equivalently: <strong>s = d/t</strong>
                </p>
              </div>
              <p className="text-lg">
                From this fundamental equation, we can derive two other important formulas:
              </p>
              <ul className="space-y-2 text-lg list-disc list-inside ml-4">
                <li><strong>distance = speed × time</strong> (d = s × t)</li>
                <li><strong>time = distance ÷ speed</strong> (t = d/s)</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">The Speed Triangle</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <p className="text-lg text-gray-700 mb-4">
                  The <strong>speed triangle</strong> is a visual way to remember the relationship between speed, distance, and time. It helps you quickly determine which formula to use.
                </p>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border-2 border-blue-300">
                  <div className="text-center">
                    <div className="inline-block border-4 border-blue-600 p-8" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}>
                      <div className="relative" style={{width: '200px', height: '150px'}}>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-blue-800">D</div>
                        <div className="absolute bottom-0 left-8 text-2xl font-bold text-blue-800">S</div>
                        <div className="absolute bottom-0 right-8 text-2xl font-bold text-blue-800">T</div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full border-t-2 border-blue-600"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2 text-gray-700">
                    <p className="font-semibold">How to use:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Cover what you want to find</li>
                      <li>What remains shows the formula</li>
                      <li>D on top = divide, S and T beside = multiply</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Formulas:</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <p className="font-semibold text-gray-800 mb-2">To find Speed:</p>
                    <p className="text-lg">Speed = Distance ÷ Time</p>
                    <p className="text-sm text-gray-600 mt-1">Cover S, see D/T</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                    <p className="font-semibold text-gray-800 mb-2">To find Distance:</p>
                    <p className="text-lg">Distance = Speed × Time</p>
                    <p className="text-sm text-gray-600 mt-1">Cover D, see S × T</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                    <p className="font-semibold text-gray-800 mb-2">To find Time:</p>
                    <p className="text-lg">Time = Distance ÷ Speed</p>
                    <p className="text-sm text-gray-600 mt-1">Cover T, see D/S</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Step-by-Step Examples</h2>
            <div className="space-y-8">
              {/* Example 1 */}
              <div className="border-l-4 border-green-500 pl-6 py-4 bg-green-50 rounded-r-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Example 1: Calculate Speed</h3>
                <p className="text-lg text-gray-700 mb-3">
                  <strong>Problem:</strong> A car travels 165 miles in 3 hours. What is its average speed?
                </p>
                <div className="bg-white p-4 rounded-lg text-gray-800 space-y-2">
                  <p><strong>Given:</strong></p>
                  <p className="ml-6">Distance = 165 miles</p>
                  <p className="ml-6">Time = 3 hours</p>
                  <p className="mt-3"><strong>Formula:</strong> speed = distance ÷ time</p>
                  <p className="mt-2"><strong>Calculation:</strong></p>
                  <p className="ml-6">speed = 165 mi ÷ 3 hr</p>
                  <p className="ml-6 text-2xl font-bold text-green-700 mt-3">speed = 55 miles per hour (mph)</p>
                </div>
              </div>

              {/* Example 2 */}
              <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Example 2: Calculate Distance</h3>
                <p className="text-lg text-gray-700 mb-3">
                  <strong>Problem:</strong> A train travels at 80 km/h for 2.5 hours. How far does it travel?
                </p>
                <div className="bg-white p-4 rounded-lg text-gray-800 space-y-2">
                  <p><strong>Given:</strong></p>
                  <p className="ml-6">Speed = 80 km/h</p>
                  <p className="ml-6">Time = 2.5 hours</p>
                  <p className="mt-3"><strong>Formula:</strong> distance = speed × time</p>
                  <p className="mt-2"><strong>Calculation:</strong></p>
                  <p className="ml-6">distance = 80 km/h × 2.5 hr</p>
                  <p className="ml-6 text-2xl font-bold text-blue-700 mt-3">distance = 200 kilometers</p>
                </div>
              </div>

              {/* Example 3 */}
              <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 rounded-r-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Example 3: Calculate Time</h3>
                <p className="text-lg text-gray-700 mb-3">
                  <strong>Problem:</strong> How long will it take to drive 300 miles at 60 mph?
                </p>
                <div className="bg-white p-4 rounded-lg text-gray-800 space-y-2">
                  <p><strong>Given:</strong></p>
                  <p className="ml-6">Distance = 300 miles</p>
                  <p className="ml-6">Speed = 60 mph</p>
                  <p className="mt-3"><strong>Formula:</strong> time = distance ÷ speed</p>
                  <p className="mt-2"><strong>Calculation:</strong></p>
                  <p className="ml-6">time = 300 mi ÷ 60 mph</p>
                  <p className="ml-6 text-2xl font-bold text-purple-700 mt-3">time = 5 hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Common Units</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border-2 border-blue-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Speed Units</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• mph (miles per hour)</li>
                  <li>• km/h (kilometers per hour)</li>
                  <li>• m/s (meters per second)</li>
                  <li>• ft/s (feet per second)</li>
                  <li>• knots (nautical miles/hr)</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Distance Units</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• miles (mi)</li>
                  <li>• kilometers (km)</li>
                  <li>• meters (m)</li>
                  <li>• feet (ft)</li>
                  <li>• yards (yd)</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Time Units</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• hours (hr, h)</li>
                  <li>• minutes (min)</li>
                  <li>• seconds (s, sec)</li>
                  <li>• days</li>
                  <li>• milliseconds (ms)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Real-World Applications</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Travel Planning</h3>
                <p className="text-lg text-gray-700">
                  Calculate how long your road trip will take, or determine if you need to speed up to arrive on time. Essential for planning vacation drives, daily commutes, and delivery schedules.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Sports & Athletics</h3>
                <p className="text-lg text-gray-700">
                  Track running pace, cycling speed, or swimming velocity. Athletes use these calculations to monitor performance, set training goals, and analyze race results.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Physics & Science</h3>
                <p className="text-lg text-gray-700">
                  Foundation for understanding motion, velocity, and acceleration. Used in mechanics, astronomy, and any field involving moving objects or energy transfer.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Navigation & Aviation</h3>
                <p className="text-lg text-gray-700">
                  Pilots and sailors use speed-distance-time calculations for flight planning, fuel consumption estimates, and arrival time predictions. Critical for safe and efficient navigation.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Important Concepts</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Average Speed vs. Instantaneous Speed</h3>
                <p className="text-gray-700">
                  <strong>Average speed</strong> is the total distance divided by total time, while <strong>instantaneous speed</strong> is the speed at a specific moment. The formulas in this calculator give average speed over the journey.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Speed vs. Velocity</h3>
                <p className="text-gray-700">
                  <strong>Speed</strong> is a scalar quantity (magnitude only), while <strong>velocity</strong> is a vector quantity (magnitude and direction). For practical purposes in this calculator, we treat them the same.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Constant Speed</h3>
                <p className="text-gray-700">
                  These formulas assume <strong>constant speed</strong>. If speed varies during the journey, the calculated speed represents the average speed over the entire trip.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Unit Consistency</h3>
                <p className="text-gray-700">
                  Always ensure your units are consistent. If distance is in miles and time in hours, speed will be in miles per hour (mph). Our calculator handles unit conversions automatically.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Frequently Asked Questions (FAQ)</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  What is the formula for speed?
                </h3>
                <p className="text-gray-700">
                  The formula for speed is: <strong>speed = distance ÷ time</strong>. This means speed equals the distance traveled divided by the time taken. For example, if you travel 100 miles in 2 hours, your speed is 100 ÷ 2 = 50 mph.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  How do I calculate travel time?
                </h3>
                <p className="text-gray-700">
                  To calculate travel time, use the formula: <strong>time = distance ÷ speed</strong>. Divide the total distance you need to travel by your average speed. For instance, a 300-mile trip at 60 mph will take 300 ÷ 60 = 5 hours.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  What's the difference between mph and km/h?
                </h3>
                <p className="text-gray-700">
                  MPH (miles per hour) and km/h (kilometers per hour) are different units for measuring speed. 1 mile = 1.609 kilometers, so 60 mph ≈ 97 km/h. The United States primarily uses mph, while most other countries use km/h.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Can I use this calculator for running pace?
                </h3>
                <p className="text-gray-700">
                  Yes! For running, enter your distance (e.g., 5 km) and time (e.g., 25 minutes), then select "Solve for Speed" to get your pace. You can convert between different units like min/km or min/mile.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  What is average speed?
                </h3>
                <p className="text-gray-700">
                  Average speed is the total distance traveled divided by the total time taken, including stops and slowdowns. It differs from your speedometer reading, which shows instantaneous speed at any given moment.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  How do I convert between different speed units?
                </h3>
                <p className="text-gray-700">
                  Common conversions: 1 mph = 1.609 km/h, 1 mph = 0.447 m/s, 1 m/s = 3.6 km/h. Our calculator automatically converts between units, so you can input in any unit and get results in your preferred unit.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  What if my speed varies during the trip?
                </h3>
                <p className="text-gray-700">
                  If your speed changes during the journey (which is common in real driving), the calculator will give you the average speed. This is still useful for planning purposes, even though you may go faster or slower at different points.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Can this be used for circular motion?
                </h3>
                <p className="text-gray-700">
                  Yes, but keep in mind this calculator measures average speed along the path traveled (distance), not displacement. For circular motion, the distance is the circumference of the circle, even though the displacement might be zero.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-[#1A3D7C] mb-4">Why Use Our Speed Distance Time Calculator?</h2>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-start">
                <span className="text-[#2BAE66] mr-3 text-2xl">✓</span>
                <span><strong>Multiple Units:</strong> Convert between mph, km/h, m/s, and more</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#2BAE66] mr-3 text-2xl">✓</span>
                <span><strong>Solve for Any Variable:</strong> Calculate speed, distance, or time</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#2BAE66] mr-3 text-2xl">✓</span>
                <span><strong>Instant Results:</strong> Get answers immediately with clear formulas</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#2BAE66] mr-3 text-2xl">✓</span>
                <span><strong>Free & Easy:</strong> No registration, simple interface</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#2BAE66] mr-3 text-2xl">✓</span>
                <span><strong>Educational:</strong> Learn with examples and explanations</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#2BAE66] mr-3 text-2xl">✓</span>
                <span><strong>Mobile Responsive:</strong> Works on phones, tablets, and computers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
