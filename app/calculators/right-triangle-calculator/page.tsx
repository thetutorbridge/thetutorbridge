'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, RotateCcw, Triangle, Info, BookOpen, GraduationCap, ChevronDown, ChevronUp, ArrowRight, Lightbulb, Target, CheckCircle } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

type InputMode = 'two_sides' | 'angle_side' | 'area_side';
type LengthUnit = 'mm' | 'cm' | 'm' | 'km' | 'in' | 'ft' | 'yd' | 'mi' | 'nmi';
type AngleUnit = 'deg' | 'rad' | 'grad';

interface TriangleResults {
  sideA: number;
  sideB: number;
  sideC: number;
  angleAlpha: number;
  angleBeta: number;
  area: number;
  perimeter: number;
  valid: boolean;
}

// Length unit conversions to meters
const lengthConversions: Record<LengthUnit, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
  nmi: 1852,
};

const lengthUnitNames: Record<LengthUnit, string> = {
  mm: 'Millimeters (mm)',
  cm: 'Centimeters (cm)',
  m: 'Meters (m)',
  km: 'Kilometers (km)',
  in: 'Inches (in)',
  ft: 'Feet (ft)',
  yd: 'Yards (yd)',
  mi: 'Miles (mi)',
  nmi: 'Nautical miles (nmi)',
};

// Angle unit conversions to degrees
const angleConversions: Record<AngleUnit, number> = {
  deg: 1,
  rad: 180 / Math.PI,
  grad: 0.9,
};

const angleUnitNames: Record<AngleUnit, string> = {
  deg: 'Degrees (deg)',
  rad: 'Radians (rad)',
  grad: 'Gradians (gon)',
};

export default function RightTriangleCalculator() {
  // Input mode
  const [inputMode, setInputMode] = useState<InputMode>('two_sides');

  // Two sides mode inputs
  const [sideA, setSideA] = useState<string>('');
  const [sideB, setSideB] = useState<string>('');
  const [sideC, setSideC] = useState<string>('');

  // Angle and side mode inputs
  const [knownAngle, setKnownAngle] = useState<string>('');
  const [knownSideType, setKnownSideType] = useState<'a' | 'b' | 'c'>('a');
  const [knownSideValue, setKnownSideValue] = useState<string>('');

  // Area and side mode inputs
  const [knownArea, setKnownArea] = useState<string>('');
  const [areaSideType, setAreaSideType] = useState<'a' | 'b'>('a');
  const [areaSideValue, setAreaSideValue] = useState<string>('');

  // Units
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>('cm');
  const [angleUnit, setAngleUnit] = useState<AngleUnit>('deg');

  // Results
  const [results, setResults] = useState<TriangleResults | null>(null);
  const [error, setError] = useState<string>('');

  // Section toggles
  const [showFormulas, setShowFormulas] = useState(false);
  const [showHowTo, setShowHowTo] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  // Helper functions
  const toRadians = (degrees: number): number => degrees * (Math.PI / 180);
  const toDegrees = (radians: number): number => radians * (180 / Math.PI);

  const convertAngleToDegrees = (value: number, unit: AngleUnit): number => {
    return value * angleConversions[unit];
  };

  const convertAngleFromDegrees = (degrees: number, unit: AngleUnit): number => {
    return degrees / angleConversions[unit];
  };

  // Main calculation effect
  useEffect(() => {
    setError('');
    setResults(null);

    try {
      let resultA = 0, resultB = 0, resultC = 0;
      let resultAlpha = 0, resultBeta = 0;

      if (inputMode === 'two_sides') {
        const a = parseFloat(sideA) || 0;
        const b = parseFloat(sideB) || 0;
        const c = parseFloat(sideC) || 0;

        const knownSides = [a, b, c].filter(s => s > 0).length;

        if (knownSides < 2) return;

        if (a > 0 && b > 0 && c === 0) {
          // Known: a, b (legs) -> Find: c (hypotenuse)
          resultA = a;
          resultB = b;
          resultC = Math.sqrt(a * a + b * b);
          resultAlpha = toDegrees(Math.atan(a / b));
          resultBeta = 90 - resultAlpha;
        } else if (a > 0 && c > 0 && b === 0) {
          // Known: a (leg), c (hypotenuse) -> Find: b
          if (c <= a) {
            setError('Hypotenuse (c) must be greater than leg (a)');
            return;
          }
          resultA = a;
          resultC = c;
          resultB = Math.sqrt(c * c - a * a);
          resultAlpha = toDegrees(Math.asin(a / c));
          resultBeta = 90 - resultAlpha;
        } else if (b > 0 && c > 0 && a === 0) {
          // Known: b (leg), c (hypotenuse) -> Find: a
          if (c <= b) {
            setError('Hypotenuse (c) must be greater than leg (b)');
            return;
          }
          resultB = b;
          resultC = c;
          resultA = Math.sqrt(c * c - b * b);
          resultAlpha = toDegrees(Math.acos(b / c));
          resultBeta = 90 - resultAlpha;
        } else if (a > 0 && b > 0 && c > 0) {
          // All three sides given - verify right triangle
          const tolerance = 0.01;
          if (Math.abs(a * a + b * b - c * c) > tolerance * c * c) {
            setError('These sides do not form a valid right triangle (a² + b² ≠ c²)');
            return;
          }
          resultA = a;
          resultB = b;
          resultC = c;
          resultAlpha = toDegrees(Math.asin(a / c));
          resultBeta = 90 - resultAlpha;
        } else {
          return;
        }
      } else if (inputMode === 'angle_side') {
        const angle = parseFloat(knownAngle) || 0;
        const side = parseFloat(knownSideValue) || 0;

        if (angle <= 0 || side <= 0) return;

        const angleDeg = convertAngleToDegrees(angle, angleUnit);

        if (angleDeg <= 0 || angleDeg >= 90) {
          setError('Angle α must be between 0° and 90° (exclusive)');
          return;
        }

        const angleRad = toRadians(angleDeg);

        if (knownSideType === 'a') {
          // Known: angle α, side a (opposite)
          resultA = side;
          resultB = resultA / Math.tan(angleRad);
          resultC = resultA / Math.sin(angleRad);
        } else if (knownSideType === 'b') {
          // Known: angle α, side b (adjacent)
          resultB = side;
          resultA = resultB * Math.tan(angleRad);
          resultC = resultB / Math.cos(angleRad);
        } else {
          // Known: angle α, side c (hypotenuse)
          resultC = side;
          resultA = resultC * Math.sin(angleRad);
          resultB = resultC * Math.cos(angleRad);
        }

        resultAlpha = angleDeg;
        resultBeta = 90 - angleDeg;
      } else if (inputMode === 'area_side') {
        const area = parseFloat(knownArea) || 0;
        const side = parseFloat(areaSideValue) || 0;

        if (area <= 0 || side <= 0) return;

        // Area = (a * b) / 2, so a * b = 2 * Area
        if (areaSideType === 'a') {
          resultA = side;
          resultB = (2 * area) / resultA;
        } else {
          resultB = side;
          resultA = (2 * area) / resultB;
        }

        resultC = Math.sqrt(resultA * resultA + resultB * resultB);
        resultAlpha = toDegrees(Math.atan(resultA / resultB));
        resultBeta = 90 - resultAlpha;
      }

      // Validate results
      if (resultA <= 0 || resultB <= 0 || resultC <= 0 ||
          isNaN(resultA) || isNaN(resultB) || isNaN(resultC) ||
          !isFinite(resultA) || !isFinite(resultB) || !isFinite(resultC)) {
        setError('Invalid triangle configuration');
        return;
      }

      const area = (resultA * resultB) / 2;
      const perimeter = resultA + resultB + resultC;

      setResults({
        sideA: resultA,
        sideB: resultB,
        sideC: resultC,
        angleAlpha: resultAlpha,
        angleBeta: resultBeta,
        area,
        perimeter,
        valid: true,
      });
    } catch {
      setError('Unable to calculate triangle');
    }
  }, [inputMode, sideA, sideB, sideC, knownAngle, knownSideType, knownSideValue, knownArea, areaSideType, areaSideValue, angleUnit]);

  const handleReset = () => {
    setSideA('');
    setSideB('');
    setSideC('');
    setKnownAngle('');
    setKnownSideValue('');
    setKnownArea('');
    setAreaSideValue('');
    setResults(null);
    setError('');
  };

  const formatNumber = (num: number, decimals: number = 4): string => {
    if (!isFinite(num)) return 'undefined';
    if (Number.isInteger(num)) return num.toString();
    return num.toLocaleString('en-US', { maximumFractionDigits: decimals });
  };

  const formatAngle = (degrees: number): string => {
    const converted = convertAngleFromDegrees(degrees, angleUnit);
    return formatNumber(converted);
  };

  // Common triangle presets
  const trianglePresets = [
    { name: '3-4-5', a: 3, b: 4 },
    { name: '5-12-13', a: 5, b: 12 },
    { name: '8-15-17', a: 8, b: 15 },
    { name: '45-45-90', a: 1, b: 1 },
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
            <span className="text-gray-600">Right Triangle Calculator</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
              <Triangle className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Right Triangle Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate sides, angles, area, and perimeter of right triangles using the Pythagorean theorem and trigonometry. Perfect for students, engineers, and professionals.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
          {/* Input Mode Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Given...
            </label>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer p-3 rounded-lg border-2 border-gray-200 hover:border-indigo-300 transition-colors has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50">
                <input
                  type="radio"
                  name="inputMode"
                  checked={inputMode === 'two_sides'}
                  onChange={() => {
                    setInputMode('two_sides');
                    handleReset();
                  }}
                  className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-3 text-gray-700 font-medium">Two sides</span>
              </label>
              <label className="flex items-center cursor-pointer p-3 rounded-lg border-2 border-gray-200 hover:border-indigo-300 transition-colors has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50">
                <input
                  type="radio"
                  name="inputMode"
                  checked={inputMode === 'angle_side'}
                  onChange={() => {
                    setInputMode('angle_side');
                    handleReset();
                  }}
                  className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-3 text-gray-700 font-medium">Angle α and one side</span>
              </label>
              <label className="flex items-center cursor-pointer p-3 rounded-lg border-2 border-gray-200 hover:border-indigo-300 transition-colors has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50">
                <input
                  type="radio"
                  name="inputMode"
                  checked={inputMode === 'area_side'}
                  onChange={() => {
                    setInputMode('area_side');
                    handleReset();
                  }}
                  className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-3 text-gray-700 font-medium">Area and one side</span>
              </label>
            </div>
          </div>

          {/* Triangle Diagram */}
          <div className="flex justify-center mb-6">
            <svg viewBox="0 0 220 180" className="w-56 h-44">
              {/* Triangle fill */}
              <polygon
                points="30,150 30,30 190,150"
                fill="rgba(99, 102, 241, 0.1)"
                stroke="#4F46E5"
                strokeWidth="2.5"
              />
              {/* Right angle marker */}
              <polyline
                points="30,135 45,135 45,150"
                fill="none"
                stroke="#4F46E5"
                strokeWidth="2"
              />
              {/* Angle α arc */}
              <path
                d="M 165,150 A 25,25 0 0,0 180,135"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2.5"
              />
              {/* Angle β arc */}
              <path
                d="M 30,55 A 25,25 0 0,1 50,42"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2.5"
              />
              {/* Side labels */}
              <text x="12" y="95" fontSize="16" fill="#4F46E5" fontWeight="bold">a</text>
              <text x="105" y="170" fontSize="16" fill="#4F46E5" fontWeight="bold">b</text>
              <text x="115" y="80" fontSize="16" fill="#4F46E5" fontWeight="bold">c</text>
              {/* Angle labels */}
              <text x="168" y="142" fontSize="14" fill="#F59E0B" fontWeight="bold">α</text>
              <text x="40" y="48" fontSize="14" fill="#F59E0B" fontWeight="bold">β</text>
              {/* 90° label */}
              <text x="38" y="145" fontSize="10" fill="#6B7280">90°</text>
            </svg>
          </div>

          {/* Quick Presets */}
          {inputMode === 'two_sides' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">Quick presets (common right triangles):</label>
              <div className="flex flex-wrap gap-2">
                {trianglePresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setSideA(preset.a.toString());
                      setSideB(preset.b.toString());
                      setSideC('');
                    }}
                    className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 rounded-lg transition-colors"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Two Sides Mode Inputs */}
          {inputMode === 'two_sides' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Two Sides</h3>
              <p className="text-sm text-gray-600 mb-4">
                Enter any two sides to calculate the third side and all angles.
              </p>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Side a (opposite to α)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={sideA}
                    onChange={(e) => setSideA(e.target.value)}
                    placeholder="Enter side a"
                    min="0"
                    step="any"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg transition-all"
                  />
                  <select
                    value={lengthUnit}
                    onChange={(e) => setLengthUnit(e.target.value as LengthUnit)}
                    className="px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700 font-medium min-w-[80px]"
                  >
                    {Object.entries(lengthUnitNames).map(([key, name]) => (
                      <option key={key} value={key}>{key}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Side b (adjacent to α)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={sideB}
                    onChange={(e) => setSideB(e.target.value)}
                    placeholder="Enter side b"
                    min="0"
                    step="any"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg transition-all"
                  />
                  <span className="flex items-center px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium min-w-[80px] justify-center">
                    {lengthUnit}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Side c (hypotenuse)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={sideC}
                    onChange={(e) => setSideC(e.target.value)}
                    placeholder="Enter side c"
                    min="0"
                    step="any"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg transition-all"
                  />
                  <span className="flex items-center px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium min-w-[80px] justify-center">
                    {lengthUnit}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Angle and Side Mode Inputs */}
          {inputMode === 'angle_side' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Angle and Side</h3>
              <p className="text-sm text-gray-600 mb-4">
                Enter angle α and one side to calculate all other values.
              </p>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Angle α</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={knownAngle}
                    onChange={(e) => setKnownAngle(e.target.value)}
                    placeholder="Enter angle α"
                    min="0"
                    step="any"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg transition-all"
                  />
                  <select
                    value={angleUnit}
                    onChange={(e) => setAngleUnit(e.target.value as AngleUnit)}
                    className="px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700 font-medium min-w-[80px]"
                  >
                    {Object.entries(angleUnitNames).map(([key, name]) => (
                      <option key={key} value={key}>{key}</option>
                    ))}
                  </select>
                </div>
                {/* Quick angle presets */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {[30, 45, 60].map((angle) => (
                    <button
                      key={angle}
                      onClick={() => {
                        setKnownAngle(angle.toString());
                        setAngleUnit('deg');
                      }}
                      className="px-3 py-1 text-sm bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 rounded-lg transition-colors"
                    >
                      {angle}°
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Known side</label>
                <select
                  value={knownSideType}
                  onChange={(e) => setKnownSideType(e.target.value as 'a' | 'b' | 'c')}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700 font-medium"
                >
                  <option value="a">Side a (opposite to α)</option>
                  <option value="b">Side b (adjacent to α)</option>
                  <option value="c">Side c (hypotenuse)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Side {knownSideType} length</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={knownSideValue}
                    onChange={(e) => setKnownSideValue(e.target.value)}
                    placeholder={`Enter side ${knownSideType}`}
                    min="0"
                    step="any"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg transition-all"
                  />
                  <select
                    value={lengthUnit}
                    onChange={(e) => setLengthUnit(e.target.value as LengthUnit)}
                    className="px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700 font-medium min-w-[80px]"
                  >
                    {Object.entries(lengthUnitNames).map(([key]) => (
                      <option key={key} value={key}>{key}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Area and Side Mode Inputs */}
          {inputMode === 'area_side' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Area and Side</h3>
              <p className="text-sm text-gray-600 mb-4">
                Enter the area and one leg to calculate all other values.
              </p>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Area</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={knownArea}
                    onChange={(e) => setKnownArea(e.target.value)}
                    placeholder="Enter area"
                    min="0"
                    step="any"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg transition-all"
                  />
                  <span className="flex items-center px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium">
                    {lengthUnit}²
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Known leg</label>
                <select
                  value={areaSideType}
                  onChange={(e) => setAreaSideType(e.target.value as 'a' | 'b')}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700 font-medium"
                >
                  <option value="a">Side a (leg)</option>
                  <option value="b">Side b (leg)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Side {areaSideType} length</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={areaSideValue}
                    onChange={(e) => setAreaSideValue(e.target.value)}
                    placeholder={`Enter side ${areaSideType}`}
                    min="0"
                    step="any"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg transition-all"
                  />
                  <select
                    value={lengthUnit}
                    onChange={(e) => setLengthUnit(e.target.value as LengthUnit)}
                    className="px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700 font-medium min-w-[80px]"
                  >
                    {Object.entries(lengthUnitNames).map(([key]) => (
                      <option key={key} value={key}>{key}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Results */}
          {results && results.valid && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-800">Results</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                  <p className="text-xs text-indigo-600 font-medium mb-1">Side a</p>
                  <p className="text-xl font-bold text-indigo-800">{formatNumber(results.sideA, 4)}</p>
                  <p className="text-sm text-indigo-600">{lengthUnit}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <p className="text-xs text-purple-600 font-medium mb-1">Side b</p>
                  <p className="text-xl font-bold text-purple-800">{formatNumber(results.sideB, 4)}</p>
                  <p className="text-sm text-purple-600">{lengthUnit}</p>
                </div>
                <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                  <p className="text-xs text-pink-600 font-medium mb-1">Side c (hypotenuse)</p>
                  <p className="text-xl font-bold text-pink-800">{formatNumber(results.sideC, 4)}</p>
                  <p className="text-sm text-pink-600">{lengthUnit}</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <p className="text-xs text-amber-600 font-medium mb-1">Angle α</p>
                  <p className="text-xl font-bold text-amber-800">{formatAngle(results.angleAlpha)}</p>
                  <p className="text-sm text-amber-600">{angleUnit}</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <p className="text-xs text-orange-600 font-medium mb-1">Angle β</p>
                  <p className="text-xl font-bold text-orange-800">{formatAngle(results.angleBeta)}</p>
                  <p className="text-sm text-orange-600">{angleUnit}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <p className="text-xs text-green-600 font-medium mb-1">Area</p>
                  <p className="text-xl font-bold text-green-800">{formatNumber(results.area, 4)}</p>
                  <p className="text-sm text-green-600">{lengthUnit}²</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-xs text-gray-600 font-medium mb-1">Perimeter</p>
                <p className="text-xl font-bold text-gray-800">{formatNumber(results.perimeter, 4)} {lengthUnit}</p>
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

        {/* Pythagorean Theorem Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-indigo-600" />
            The Pythagorean Theorem
          </h2>
          <p className="text-gray-600 mb-4">
            The Pythagorean theorem is the foundation for solving right triangles. It states that in a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides:
          </p>
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200 text-center mb-4">
            <p className="text-3xl font-bold text-indigo-800 font-mono">a² + b² = c²</p>
            <p className="text-sm text-indigo-600 mt-2">Where c is the hypotenuse (longest side)</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <p className="font-semibold text-blue-800 mb-2">Find Hypotenuse (c)</p>
              <p className="font-mono text-blue-700">c = √(a² + b²)</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <p className="font-semibold text-purple-800 mb-2">Find Leg (a)</p>
              <p className="font-mono text-purple-700">a = √(c² − b²)</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
              <p className="font-semibold text-pink-800 mb-2">Find Leg (b)</p>
              <p className="font-mono text-pink-700">b = √(c² − a²)</p>
            </div>
          </div>
        </div>

        {/* SOHCAHTOA Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
            SOHCAHTOA - Trigonometric Ratios
          </h2>
          <p className="text-gray-600 mb-4">
            Remember the basic trigonometric ratios with the mnemonic <strong>SOHCAHTOA</strong>. These ratios relate angles to side lengths in right triangles:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
              <h3 className="font-bold text-indigo-800 text-lg mb-2">SOH</h3>
              <p className="text-indigo-700 font-mono text-center text-lg mb-2">sin(θ) = O / H</p>
              <p className="text-sm text-indigo-600"><strong>S</strong>ine = <strong>O</strong>pposite / <strong>H</strong>ypotenuse</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <h3 className="font-bold text-purple-800 text-lg mb-2">CAH</h3>
              <p className="text-purple-700 font-mono text-center text-lg mb-2">cos(θ) = A / H</p>
              <p className="text-sm text-purple-600"><strong>C</strong>osine = <strong>A</strong>djacent / <strong>H</strong>ypotenuse</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
              <h3 className="font-bold text-pink-800 text-lg mb-2">TOA</h3>
              <p className="text-pink-700 font-mono text-center text-lg mb-2">tan(θ) = O / A</p>
              <p className="text-sm text-pink-600"><strong>T</strong>angent = <strong>O</strong>pposite / <strong>A</strong>djacent</p>
            </div>
          </div>
        </div>

        {/* Formulas Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <button
            onClick={() => setShowFormulas(!showFormulas)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <Info className="w-5 h-5 mr-2 text-indigo-600" />
              All Formulas for Right Triangles
            </h2>
            {showFormulas ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
          </button>
          {showFormulas && (
            <div className="px-6 pb-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-3">Side Formulas</h3>
                  <div className="space-y-2 text-sm font-mono text-blue-700">
                    <p>c = √(a² + b²)</p>
                    <p>a = √(c² − b²)</p>
                    <p>b = √(c² − a²)</p>
                    <p>a = c × sin(α) = b × tan(α)</p>
                    <p>b = c × cos(α) = a / tan(α)</p>
                    <p>c = a / sin(α) = b / cos(α)</p>
                  </div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-3">Angle Formulas</h3>
                  <div className="space-y-2 text-sm font-mono text-green-700">
                    <p>α = arcsin(a/c) = arccos(b/c)</p>
                    <p>α = arctan(a/b)</p>
                    <p>β = 90° − α</p>
                    <p>α + β = 90°</p>
                    <p>α + β + 90° = 180°</p>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <h3 className="font-semibold text-purple-800 mb-3">Area Formulas</h3>
                  <div className="space-y-2 text-sm font-mono text-purple-700">
                    <p>Area = (a × b) / 2</p>
                    <p>Area = (a² × tan(β)) / 2</p>
                    <p>Area = (b² × tan(α)) / 2</p>
                    <p>Area = (c² × sin(α) × cos(α)) / 2</p>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <h3 className="font-semibold text-orange-800 mb-3">Perimeter & Other</h3>
                  <div className="space-y-2 text-sm font-mono text-orange-700">
                    <p>Perimeter = a + b + c</p>
                    <p>Inradius = (a + b − c) / 2</p>
                    <p>Circumradius = c / 2</p>
                    <p>Altitude to c = (a × b) / c</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Special Right Triangles */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-indigo-600" />
            Special Right Triangles
          </h2>
          <p className="text-gray-600 mb-4">
            Some right triangles have special angle measurements that make calculations easier. These are commonly used in geometry and trigonometry.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-200">
              <h3 className="font-bold text-indigo-800 text-lg mb-3">45-45-90 Triangle (Isosceles Right Triangle)</h3>
              <div className="flex items-center justify-center mb-4">
                <svg viewBox="0 0 120 100" className="w-32 h-28">
                  <polygon points="10,90 10,10 90,90" fill="rgba(99, 102, 241, 0.2)" stroke="#4F46E5" strokeWidth="2" />
                  <text x="0" y="55" fontSize="12" fill="#4F46E5" fontWeight="bold">1</text>
                  <text x="45" y="98" fontSize="12" fill="#4F46E5" fontWeight="bold">1</text>
                  <text x="55" y="45" fontSize="12" fill="#4F46E5" fontWeight="bold">√2</text>
                </svg>
              </div>
              <p className="text-indigo-700 font-mono text-center text-lg mb-2">Side ratio: 1 : 1 : √2</p>
              <p className="text-sm text-indigo-600">Both legs are equal. The hypotenuse is √2 times a leg.</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
              <h3 className="font-bold text-purple-800 text-lg mb-3">30-60-90 Triangle</h3>
              <div className="flex items-center justify-center mb-4">
                <svg viewBox="0 0 140 100" className="w-36 h-28">
                  <polygon points="10,90 10,10 120,90" fill="rgba(147, 51, 234, 0.2)" stroke="#7C3AED" strokeWidth="2" />
                  <text x="0" y="55" fontSize="12" fill="#7C3AED" fontWeight="bold">1</text>
                  <text x="55" y="98" fontSize="12" fill="#7C3AED" fontWeight="bold">√3</text>
                  <text x="65" y="45" fontSize="12" fill="#7C3AED" fontWeight="bold">2</text>
                </svg>
              </div>
              <p className="text-purple-700 font-mono text-center text-lg mb-2">Side ratio: 1 : √3 : 2</p>
              <p className="text-sm text-purple-600">Short leg opposite 30°, long leg opposite 60°, hypotenuse opposite 90°.</p>
            </div>
          </div>
        </div>

        {/* Pythagorean Triples */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-indigo-600" />
            Common Pythagorean Triples
          </h2>
          <p className="text-gray-600 mb-4">
            Pythagorean triples are sets of three positive integers (a, b, c) that satisfy a² + b² = c². These are useful for quick calculations without a calculator.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Triple</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">a²</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">b²</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">c²</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Verification</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { a: 3, b: 4, c: 5 },
                  { a: 5, b: 12, c: 13 },
                  { a: 8, b: 15, c: 17 },
                  { a: 7, b: 24, c: 25 },
                  { a: 20, b: 21, c: 29 },
                  { a: 9, b: 40, c: 41 },
                ].map((triple) => (
                  <tr key={`${triple.a}-${triple.b}-${triple.c}`} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-indigo-700">{triple.a}-{triple.b}-{triple.c}</td>
                    <td className="py-3 px-4 text-gray-800">{triple.a * triple.a}</td>
                    <td className="py-3 px-4 text-gray-800">{triple.b * triple.b}</td>
                    <td className="py-3 px-4 text-gray-800">{triple.c * triple.c}</td>
                    <td className="py-3 px-4 text-green-600 font-mono">{triple.a * triple.a} + {triple.b * triple.b} = {triple.c * triple.c} ✓</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <button
            onClick={() => setShowHowTo(!showHowTo)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-indigo-600" />
              How to Use This Calculator
            </h2>
            {showHowTo ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
          </button>
          {showHowTo && (
            <div className="px-6 pb-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Choose your input type:</strong>
                      <p className="text-gray-700 mt-1">Select &quot;Two sides&quot; if you know any two sides, &quot;Angle α and one side&quot; if you know an angle and a side, or &quot;Area and one side&quot; if you know the area and one leg.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Enter your known values:</strong>
                      <p className="text-gray-700 mt-1">Input the values you know. Make sure to select the correct units (cm, m, inches, etc. for length; degrees, radians for angles).</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Get instant results:</strong>
                      <p className="text-gray-700 mt-1">The calculator automatically computes all unknown values including all three sides, both acute angles, the area, and the perimeter.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong className="text-gray-900">Use quick presets:</strong>
                      <p className="text-gray-700 mt-1">Click on common Pythagorean triple buttons (3-4-5, 5-12-13, etc.) or angle presets (30°, 45°, 60°) for quick calculations.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Real-World Applications */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <button
            onClick={() => setShowApplications(!showApplications)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <Target className="w-5 h-5 mr-2 text-indigo-600" />
              Real-World Applications
            </h2>
            {showApplications ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
          </button>
          {showApplications && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-2">Construction & Architecture</h3>
                  <p className="text-sm text-blue-700">Calculate roof slopes, stair dimensions, ramp angles, and ensure walls are perpendicular using the 3-4-5 method.</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <h3 className="font-bold text-green-800 mb-2">Navigation & Surveying</h3>
                  <p className="text-sm text-green-700">Determine distances, heights of buildings or mountains, and calculate shortest paths using triangulation.</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <h3 className="font-bold text-purple-800 mb-2">Physics & Engineering</h3>
                  <p className="text-sm text-purple-700">Calculate force components, velocity vectors, projectile motion, and analyze structural supports.</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <h3 className="font-bold text-orange-800 mb-2">Computer Graphics & Gaming</h3>
                  <p className="text-sm text-orange-700">Compute distances between points, rotation angles, collision detection, and 3D transformations.</p>
                </div>
                <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                  <h3 className="font-bold text-pink-800 mb-2">Aviation & Maritime</h3>
                  <p className="text-sm text-pink-700">Calculate flight paths, descent angles, distance to horizon, and navigation routes.</p>
                </div>
                <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
                  <h3 className="font-bold text-cyan-800 mb-2">DIY & Home Improvement</h3>
                  <p className="text-sm text-cyan-700">Measure diagonal distances, calculate ladder heights, TV mounting angles, and fence post spacing.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <button
            onClick={() => setShowFAQ(!showFAQ)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
              Frequently Asked Questions
            </h2>
            {showFAQ ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
          </button>
          {showFAQ && (
            <div className="px-6 pb-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">What is a right triangle?</h3>
                <p className="text-gray-600">A right triangle is a triangle with one 90-degree angle (right angle). The side opposite the right angle is called the hypotenuse, and it&apos;s always the longest side. The other two sides are called legs.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">How do I know if a triangle is a right triangle?</h3>
                <p className="text-gray-600">A triangle is a right triangle if and only if the square of its longest side equals the sum of squares of the other two sides (a² + b² = c²). You can also verify if one angle measures exactly 90 degrees.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">What&apos;s the minimum information needed to solve a right triangle?</h3>
                <p className="text-gray-600">You need at least two pieces of information (besides the right angle): either two sides, or one side and one acute angle. From these, you can calculate all other properties of the triangle.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Why is the hypotenuse always the longest side?</h3>
                <p className="text-gray-600">The hypotenuse is opposite the largest angle (90°). In any triangle, the longest side is always opposite the largest angle. Since 90° is the largest angle in a right triangle, the hypotenuse must be the longest side.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">What are the two acute angles in a right triangle?</h3>
                <p className="text-gray-600">The two acute angles (α and β) are complementary, meaning they add up to 90°. If one angle is 30°, the other must be 60°. If one is 45°, the other is also 45° (isosceles right triangle).</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">How do I calculate the area of a right triangle?</h3>
                <p className="text-gray-600">The area equals half the product of the two legs: Area = (a × b) / 2. This works because the two legs form the base and height of the triangle, and the area of any triangle is (base × height) / 2.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">What is SOHCAHTOA?</h3>
                <p className="text-gray-600">SOHCAHTOA is a mnemonic for remembering trigonometric ratios: SOH (Sine = Opposite/Hypotenuse), CAH (Cosine = Adjacent/Hypotenuse), TOA (Tangent = Opposite/Adjacent). These relate angles to side lengths in right triangles.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">What are Pythagorean triples?</h3>
                <p className="text-gray-600">Pythagorean triples are sets of three positive integers (a, b, c) that satisfy the Pythagorean theorem (a² + b² = c²). Common examples include 3-4-5, 5-12-13, and 8-15-17. These are useful for quick calculations without decimals.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Can I use this calculator for non-right triangles?</h3>
                <p className="text-gray-600">This calculator is specifically designed for right triangles. For non-right triangles, you would need to use the Law of Sines or Law of Cosines, which require different formulas and input combinations.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">What is the difference between degrees and radians?</h3>
                <p className="text-gray-600">Both are units for measuring angles. Degrees divide a full circle into 360 parts (so a right angle is 90°). Radians measure angles based on the radius of a circle—a full circle is 2π radians, and a right angle is π/2 radians. To convert: radians = degrees × (π/180).</p>
              </div>
            </div>
          )}
        </div>

        {/* Related Calculators */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg border border-indigo-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/calculators/trigonometry-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center"
            >
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                <Triangle className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Trigonometry Calculator</h3>
                <p className="text-sm text-gray-600">Calculate sin, cos, tan and more</p>
              </div>
            </Link>
            <Link
              href="/calculators/quadratic-formula-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <Calculator className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Quadratic Formula Calculator</h3>
                <p className="text-sm text-gray-600">Solve quadratic equations</p>
              </div>
            </Link>
            <Link
              href="/calculators/circumference-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <Calculator className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Circumference Calculator</h3>
                <p className="text-sm text-gray-600">Calculate circle properties</p>
              </div>
            </Link>
            <Link
              href="/calculators/slope-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <Calculator className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Slope Calculator</h3>
                <p className="text-sm text-gray-600">Calculate slope between two points</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Book Your Session CTA */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-2xl shadow-xl p-6 sm:p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <GraduationCap className="w-12 h-12 text-[#FFC857] mr-4 flex-shrink-0" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Need Help with Geometry & Trigonometry?</h2>
                <p className="text-blue-100">
                  Our expert math tutors can help you master right triangles, the Pythagorean theorem, and trigonometric ratios with personalized guidance.
                </p>
              </div>
            </div>
            <Link
              href="/book-demo-class"
              className="inline-flex items-center px-6 py-3 bg-[#FFC857] text-[#1A3D7C] font-bold rounded-xl hover:bg-yellow-400 transition-colors whitespace-nowrap"
            >
              Book Free Demo Class
              <ArrowRight className="w-5 h-5 ml-2" />
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
            "name": "Right Triangle Calculator",
            "description": "Calculate sides, angles, area, and perimeter of right triangles using the Pythagorean theorem and trigonometry. Supports multiple input modes and units.",
            "url": "https://thetutorbridge.com/calculators/right-triangle-calculator",
            "applicationCategory": "EducationalApplication",
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
                "name": "What is a right triangle?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A right triangle is a triangle with one 90-degree angle (right angle). The side opposite the right angle is called the hypotenuse, and it's always the longest side. The other two sides are called legs."
                }
              },
              {
                "@type": "Question",
                "name": "How do I know if a triangle is a right triangle?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A triangle is a right triangle if and only if the square of its longest side equals the sum of squares of the other two sides (a² + b² = c²). You can also verify if one angle measures exactly 90 degrees."
                }
              },
              {
                "@type": "Question",
                "name": "What is the Pythagorean theorem?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Pythagorean theorem states that in a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides: a² + b² = c², where c is the hypotenuse."
                }
              },
              {
                "@type": "Question",
                "name": "What is SOHCAHTOA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "SOHCAHTOA is a mnemonic for remembering trigonometric ratios: SOH (Sine = Opposite/Hypotenuse), CAH (Cosine = Adjacent/Hypotenuse), TOA (Tangent = Opposite/Adjacent)."
                }
              },
              {
                "@type": "Question",
                "name": "What are Pythagorean triples?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pythagorean triples are sets of three positive integers (a, b, c) that satisfy the Pythagorean theorem (a² + b² = c²). Common examples include 3-4-5, 5-12-13, and 8-15-17."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
