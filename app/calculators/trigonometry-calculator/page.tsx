'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, RotateCcw, Triangle, Info, BookOpen, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

type AngleUnit = 'deg' | 'rad';
type LengthUnit = 'cm' | 'mm' | 'm' | 'in' | 'ft';

interface TrigResults {
  sin: number;
  cos: number;
  tan: number;
  cot: number;
  sec: number;
  csc: number;
}

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

export default function TrigonometryCalculator() {
  // Trig Functions Section
  const [trigAngle, setTrigAngle] = useState<string>('');
  const [trigAngleUnit, setTrigAngleUnit] = useState<AngleUnit>('deg');
  const [trigResults, setTrigResults] = useState<TrigResults | null>(null);
  const [showTrigSection, setShowTrigSection] = useState(true);

  // Right Triangle Section
  const [showTriangleSection, setShowTriangleSection] = useState(true);
  const [sideA, setSideA] = useState<string>('');
  const [sideB, setSideB] = useState<string>('');
  const [sideC, setSideC] = useState<string>('');
  const [angleAlpha, setAngleAlpha] = useState<string>('');
  const [angleBeta, setAngleBeta] = useState<string>('');
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>('cm');
  const [angleUnit, setAngleUnit] = useState<AngleUnit>('deg');
  const [triangleResults, setTriangleResults] = useState<TriangleResults | null>(null);
  const [triangleError, setTriangleError] = useState<string>('');

  // Convert degrees to radians
  const toRadians = (degrees: number): number => degrees * (Math.PI / 180);

  // Convert radians to degrees
  const toDegrees = (radians: number): number => radians * (180 / Math.PI);

  // Calculate trig functions
  useEffect(() => {
    const angle = parseFloat(trigAngle);
    if (isNaN(angle)) {
      setTrigResults(null);
      return;
    }

    const angleRad = trigAngleUnit === 'deg' ? toRadians(angle) : angle;

    const sinVal = Math.sin(angleRad);
    const cosVal = Math.cos(angleRad);
    const tanVal = Math.tan(angleRad);

    setTrigResults({
      sin: sinVal,
      cos: cosVal,
      tan: tanVal,
      cot: cosVal !== 0 ? 1 / tanVal : Infinity,
      sec: cosVal !== 0 ? 1 / cosVal : Infinity,
      csc: sinVal !== 0 ? 1 / sinVal : Infinity,
    });
  }, [trigAngle, trigAngleUnit]);

  // Solve right triangle
  useEffect(() => {
    const a = parseFloat(sideA) || 0;
    const b = parseFloat(sideB) || 0;
    const c = parseFloat(sideC) || 0;
    let alpha = parseFloat(angleAlpha) || 0;
    let beta = parseFloat(angleBeta) || 0;

    // Convert angles to radians for calculation
    if (angleUnit === 'deg') {
      alpha = toRadians(alpha);
      beta = toRadians(beta);
    }

    setTriangleError('');

    // Count known values
    const knownSides = [a, b, c].filter(s => s > 0).length;
    const knownAngles = [alpha, beta].filter(ang => ang > 0).length;
    const totalKnown = knownSides + knownAngles;

    if (totalKnown < 2) {
      setTriangleResults(null);
      return;
    }

    let resultA = a;
    let resultB = b;
    let resultC = c;
    let resultAlpha = alpha;
    let resultBeta = beta;

    try {
      // Case: Two sides known
      if (a > 0 && b > 0 && c === 0) {
        resultC = Math.sqrt(a * a + b * b);
        resultAlpha = Math.atan(a / b);
        resultBeta = Math.atan(b / a);
      } else if (a > 0 && c > 0 && b === 0) {
        if (c <= a) {
          setTriangleError('Hypotenuse must be greater than side a');
          setTriangleResults(null);
          return;
        }
        resultB = Math.sqrt(c * c - a * a);
        resultAlpha = Math.asin(a / c);
        resultBeta = Math.acos(a / c);
      } else if (b > 0 && c > 0 && a === 0) {
        if (c <= b) {
          setTriangleError('Hypotenuse must be greater than side b');
          setTriangleResults(null);
          return;
        }
        resultA = Math.sqrt(c * c - b * b);
        resultAlpha = Math.acos(b / c);
        resultBeta = Math.asin(b / c);
      }
      // Case: One side and one angle known
      else if (a > 0 && alpha > 0) {
        resultBeta = Math.PI / 2 - alpha;
        resultB = a / Math.tan(alpha);
        resultC = a / Math.sin(alpha);
      } else if (a > 0 && beta > 0) {
        resultAlpha = Math.PI / 2 - beta;
        resultB = a * Math.tan(beta);
        resultC = a / Math.cos(beta);
      } else if (b > 0 && alpha > 0) {
        resultBeta = Math.PI / 2 - alpha;
        resultA = b * Math.tan(alpha);
        resultC = b / Math.cos(alpha);
      } else if (b > 0 && beta > 0) {
        resultAlpha = Math.PI / 2 - beta;
        resultA = b / Math.tan(beta);
        resultC = b / Math.sin(beta);
      } else if (c > 0 && alpha > 0) {
        resultBeta = Math.PI / 2 - alpha;
        resultA = c * Math.sin(alpha);
        resultB = c * Math.cos(alpha);
      } else if (c > 0 && beta > 0) {
        resultAlpha = Math.PI / 2 - beta;
        resultA = c * Math.cos(beta);
        resultB = c * Math.sin(beta);
      }
      // Case: Three sides known - verify it's a right triangle
      else if (a > 0 && b > 0 && c > 0) {
        const tolerance = 0.01;
        if (Math.abs(a * a + b * b - c * c) > tolerance * c * c) {
          setTriangleError('These sides do not form a valid right triangle');
          setTriangleResults(null);
          return;
        }
        resultAlpha = Math.asin(a / c);
        resultBeta = Math.asin(b / c);
      }

      // Validate results
      if (resultA <= 0 || resultB <= 0 || resultC <= 0 ||
          isNaN(resultA) || isNaN(resultB) || isNaN(resultC) ||
          !isFinite(resultA) || !isFinite(resultB) || !isFinite(resultC)) {
        setTriangleError('Invalid triangle configuration');
        setTriangleResults(null);
        return;
      }

      const area = (resultA * resultB) / 2;
      const perimeter = resultA + resultB + resultC;

      setTriangleResults({
        sideA: resultA,
        sideB: resultB,
        sideC: resultC,
        angleAlpha: angleUnit === 'deg' ? toDegrees(resultAlpha) : resultAlpha,
        angleBeta: angleUnit === 'deg' ? toDegrees(resultBeta) : resultBeta,
        area,
        perimeter,
        valid: true,
      });
    } catch {
      setTriangleError('Unable to calculate triangle');
      setTriangleResults(null);
    }
  }, [sideA, sideB, sideC, angleAlpha, angleBeta, angleUnit]);

  const handleReset = () => {
    setTrigAngle('');
    setTrigResults(null);
    setSideA('');
    setSideB('');
    setSideC('');
    setAngleAlpha('');
    setAngleBeta('');
    setTriangleResults(null);
    setTriangleError('');
  };

  const formatNumber = (num: number, decimals: number = 4): string => {
    if (!isFinite(num)) return 'undefined';
    if (Math.abs(num) < 0.0001 && num !== 0) return num.toExponential(3);
    return num.toLocaleString('en-US', { maximumFractionDigits: decimals });
  };

  // Common angle presets
  const anglePresets = [
    { value: 0, label: '0°' },
    { value: 30, label: '30°' },
    { value: 45, label: '45°' },
    { value: 60, label: '60°' },
    { value: 90, label: '90°' },
    { value: 180, label: '180°' },
  ];

  // Trig values table
  const trigTable = [
    { angle: 0, sin: '0', cos: '1', tan: '0' },
    { angle: 30, sin: '1/2', cos: '√3/2', tan: '1/√3' },
    { angle: 45, sin: '√2/2', cos: '√2/2', tan: '1' },
    { angle: 60, sin: '√3/2', cos: '1/2', tan: '√3' },
    { angle: 90, sin: '1', cos: '0', tan: 'undefined' },
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
            <span className="text-gray-600">Trigonometry Calculator</span>
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
            Trigonometry Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate sin, cos, tan, and other trig functions. Solve right triangles by finding missing sides and angles.
          </p>
        </div>

        {/* Trigonometric Functions Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
          <button
            onClick={() => setShowTrigSection(!showTrigSection)}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-indigo-600" />
              Trigonometric functions: sin, cos, tan
            </h2>
            {showTrigSection ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {showTrigSection && (
            <>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  Angle
                  <span className="ml-2 text-gray-400 cursor-help" title="Enter angle in degrees or radians">
                    <Info className="w-4 h-4" />
                  </span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={trigAngle}
                    onChange={(e) => setTrigAngle(e.target.value)}
                    placeholder="Enter angle"
                    step="any"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg transition-all"
                  />
                  <select
                    value={trigAngleUnit}
                    onChange={(e) => setTrigAngleUnit(e.target.value as AngleUnit)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700 font-medium"
                  >
                    <option value="deg">deg</option>
                    <option value="rad">rad</option>
                  </select>
                </div>
                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {anglePresets.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => {
                        setTrigAngle(preset.value.toString());
                        setTrigAngleUnit('deg');
                      }}
                      className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 rounded-lg transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trig Results */}
              {trigResults && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-200">
                    <p className="text-xs text-indigo-600 font-medium">sin</p>
                    <p className="text-lg font-bold text-indigo-800">{formatNumber(trigResults.sin)}</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                    <p className="text-xs text-purple-600 font-medium">cos</p>
                    <p className="text-lg font-bold text-purple-800">{formatNumber(trigResults.cos)}</p>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-3 border border-pink-200">
                    <p className="text-xs text-pink-600 font-medium">tan</p>
                    <p className="text-lg font-bold text-pink-800">{formatNumber(trigResults.tan)}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                    <p className="text-xs text-blue-600 font-medium">cot</p>
                    <p className="text-lg font-bold text-blue-800">{formatNumber(trigResults.cot)}</p>
                  </div>
                  <div className="bg-teal-50 rounded-xl p-3 border border-teal-200">
                    <p className="text-xs text-teal-600 font-medium">sec</p>
                    <p className="text-lg font-bold text-teal-800">{formatNumber(trigResults.sec)}</p>
                  </div>
                  <div className="bg-cyan-50 rounded-xl p-3 border border-cyan-200">
                    <p className="text-xs text-cyan-600 font-medium">csc</p>
                    <p className="text-lg font-bold text-cyan-800">{formatNumber(trigResults.csc)}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Triangle Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
          <button
            onClick={() => setShowTriangleSection(!showTriangleSection)}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <Triangle className="w-5 h-5 mr-2 text-indigo-600" />
              Trigonometry in right triangle
            </h2>
            {showTriangleSection ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {showTriangleSection && (
            <>
              <p className="text-gray-600 text-sm mb-4">
                Enter all known variables. The calculator will find the rest if such a triangle is possible.
              </p>

              {/* Triangle Diagram */}
              <div className="flex justify-center mb-6">
                <svg viewBox="0 0 200 160" className="w-48 h-36">
                  {/* Triangle */}
                  <polygon
                    points="30,130 30,30 170,130"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="2"
                  />
                  {/* Right angle marker */}
                  <polyline
                    points="30,115 45,115 45,130"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="1.5"
                  />
                  {/* Labels */}
                  <text x="15" y="85" fontSize="14" fill="#4F46E5" fontWeight="bold">a</text>
                  <text x="95" y="148" fontSize="14" fill="#4F46E5" fontWeight="bold">b</text>
                  <text x="105" y="70" fontSize="14" fill="#4F46E5" fontWeight="bold">c</text>
                  {/* Angle labels */}
                  <text x="155" y="125" fontSize="12" fill="#7C3AED" fontWeight="bold">α</text>
                  <text x="45" y="45" fontSize="12" fill="#7C3AED" fontWeight="bold">β</text>
                </svg>
              </div>

              {/* Side Inputs */}
              <div className="space-y-4 mb-6">
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
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700 font-medium"
                    >
                      <option value="cm">cm</option>
                      <option value="mm">mm</option>
                      <option value="m">m</option>
                      <option value="in">in</option>
                      <option value="ft">ft</option>
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
                    <span className="flex items-center px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium min-w-[60px] justify-center">
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
                    <span className="flex items-center px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium min-w-[60px] justify-center">
                      {lengthUnit}
                    </span>
                  </div>
                </div>

                {/* Angle Inputs */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Angle α</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={angleAlpha}
                      onChange={(e) => setAngleAlpha(e.target.value)}
                      placeholder="Enter angle α"
                      min="0"
                      max={angleUnit === 'deg' ? '90' : String(Math.PI / 2)}
                      step="any"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg transition-all"
                    />
                    <select
                      value={angleUnit}
                      onChange={(e) => setAngleUnit(e.target.value as AngleUnit)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700 font-medium"
                    >
                      <option value="deg">deg</option>
                      <option value="rad">rad</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Angle β</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={angleBeta}
                      onChange={(e) => setAngleBeta(e.target.value)}
                      placeholder="Enter angle β"
                      min="0"
                      max={angleUnit === 'deg' ? '90' : String(Math.PI / 2)}
                      step="any"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg transition-all"
                    />
                    <span className="flex items-center px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium min-w-[60px] justify-center">
                      {angleUnit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {triangleError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                  <p className="text-red-700 text-sm">{triangleError}</p>
                </div>
              )}

              {/* Triangle Results */}
              {triangleResults && triangleResults.valid && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-200">
                      <p className="text-xs text-indigo-600 font-medium">Side a</p>
                      <p className="text-lg font-bold text-indigo-800">{formatNumber(triangleResults.sideA, 2)} {lengthUnit}</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                      <p className="text-xs text-purple-600 font-medium">Side b</p>
                      <p className="text-lg font-bold text-purple-800">{formatNumber(triangleResults.sideB, 2)} {lengthUnit}</p>
                    </div>
                    <div className="bg-pink-50 rounded-xl p-3 border border-pink-200">
                      <p className="text-xs text-pink-600 font-medium">Side c (hypotenuse)</p>
                      <p className="text-lg font-bold text-pink-800">{formatNumber(triangleResults.sideC, 2)} {lengthUnit}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                      <p className="text-xs text-blue-600 font-medium">Angle α</p>
                      <p className="text-lg font-bold text-blue-800">{formatNumber(triangleResults.angleAlpha, 2)}°</p>
                    </div>
                    <div className="bg-teal-50 rounded-xl p-3 border border-teal-200">
                      <p className="text-xs text-teal-600 font-medium">Angle β</p>
                      <p className="text-lg font-bold text-teal-800">{formatNumber(triangleResults.angleBeta, 2)}°</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-3 border border-green-200">
                      <p className="text-xs text-green-600 font-medium">Area</p>
                      <p className="text-lg font-bold text-green-800">{formatNumber(triangleResults.area, 2)} {lengthUnit}²</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <p className="text-xs text-gray-600 font-medium">Perimeter</p>
                    <p className="text-lg font-bold text-gray-800">{formatNumber(triangleResults.perimeter, 2)} {lengthUnit}</p>
                  </div>
                </div>
              )}
            </>
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

        {/* SOHCAHTOA Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
            SOHCAHTOA - Trigonometry Made Easy
          </h2>
          <p className="text-gray-600 mb-4">
            Remember the basic trigonometric ratios with the mnemonic <strong>SOHCAHTOA</strong>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
              <h3 className="font-bold text-indigo-800 text-lg mb-2">SOH</h3>
              <p className="text-indigo-700 font-mono text-center text-lg mb-2">
                sin(θ) = O / H
              </p>
              <p className="text-sm text-indigo-600">
                <strong>S</strong>ine = <strong>O</strong>pposite / <strong>H</strong>ypotenuse
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <h3 className="font-bold text-purple-800 text-lg mb-2">CAH</h3>
              <p className="text-purple-700 font-mono text-center text-lg mb-2">
                cos(θ) = A / H
              </p>
              <p className="text-sm text-purple-600">
                <strong>C</strong>osine = <strong>A</strong>djacent / <strong>H</strong>ypotenuse
              </p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
              <h3 className="font-bold text-pink-800 text-lg mb-2">TOA</h3>
              <p className="text-pink-700 font-mono text-center text-lg mb-2">
                tan(θ) = O / A
              </p>
              <p className="text-sm text-pink-600">
                <strong>T</strong>angent = <strong>O</strong>pposite / <strong>A</strong>djacent
              </p>
            </div>
          </div>
        </div>

        {/* Trig Values Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-indigo-600" />
            Common Trigonometric Values
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">Angle</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">sin</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">cos</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">tan</th>
                </tr>
              </thead>
              <tbody>
                {trigTable.map((row) => (
                  <tr key={row.angle} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-3 font-medium text-indigo-700">{row.angle}°</td>
                    <td className="py-3 px-3 text-gray-800 font-mono">{row.sin}</td>
                    <td className="py-3 px-3 text-gray-800 font-mono">{row.cos}</td>
                    <td className="py-3 px-3 text-gray-800 font-mono">{row.tan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formulas Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2 text-indigo-600" />
            Key Trigonometric Formulas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Pythagorean Theorem</h3>
              <p className="font-mono text-blue-700 text-center text-lg">a² + b² = c²</p>
              <p className="text-sm text-blue-600 mt-2">For any right triangle</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Pythagorean Identity</h3>
              <p className="font-mono text-green-700 text-center text-lg">sin²θ + cos²θ = 1</p>
              <p className="text-sm text-green-600 mt-2">Always true for any angle</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">Reciprocal Functions</h3>
              <div className="text-sm text-purple-700 space-y-1">
                <p className="font-mono">csc(θ) = 1/sin(θ)</p>
                <p className="font-mono">sec(θ) = 1/cos(θ)</p>
                <p className="font-mono">cot(θ) = 1/tan(θ)</p>
              </div>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
              <h3 className="font-semibold text-orange-800 mb-2">Angle Sum (Right Triangle)</h3>
              <p className="font-mono text-orange-700 text-center text-lg">α + β = 90°</p>
              <p className="text-sm text-orange-600 mt-2">The two acute angles sum to 90°</p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do I use SOHCAHTOA?</h3>
              <p className="text-gray-600">
                First, identify the sides relative to your angle: the hypotenuse (longest side, opposite the right angle),
                the opposite side (across from the angle), and the adjacent side (next to the angle, not the hypotenuse).
                Then choose the ratio that uses your known values to find the unknown.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What&apos;s the difference between degrees and radians?</h3>
              <p className="text-gray-600">
                Both are units for measuring angles. Degrees divide a full circle into 360 parts. Radians measure the
                angle based on the radius of a circle—a full circle is 2π radians. To convert: radians = degrees × (π/180).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Why is tan(90°) undefined?</h3>
              <p className="text-gray-600">
                Tangent equals sin/cos. At 90°, cos(90°) = 0, and division by zero is undefined.
                Geometrically, this represents a vertical line with infinite slope.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do I find an angle from a trig value?</h3>
              <p className="text-gray-600">
                Use inverse trigonometric functions (also called arc functions): sin⁻¹, cos⁻¹, or tan⁻¹.
                For example, if sin(θ) = 0.5, then θ = sin⁻¹(0.5) = 30°.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What information do I need to solve a right triangle?</h3>
              <p className="text-gray-600">
                You need at least two pieces of information (besides the right angle): either two sides, or one side
                and one acute angle. From these, you can calculate all other sides and angles.
              </p>
            </div>
          </div>
        </div>

        {/* Related Calculators */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg border border-indigo-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/calculators/quadratic-formula-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Quadratic Formula Calculator</h3>
              <p className="text-sm text-gray-600">Solve quadratic equations with step-by-step solutions</p>
            </Link>
            <Link
              href="/calculators/slope-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Slope Calculator</h3>
              <p className="text-sm text-gray-600">Calculate slope, distance, and midpoint between points</p>
            </Link>
            <Link
              href="/calculators/circumference-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Circumference Calculator</h3>
              <p className="text-sm text-gray-600">Calculate circle properties using C = 2πr</p>
            </Link>
            <Link
              href="/calculators/cylinder-volume-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Cylinder Volume Calculator</h3>
              <p className="text-sm text-gray-600">Calculate cylinder volume and surface area</p>
            </Link>
          </div>
        </div>

        {/* Book Your Session CTA */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2563eb] rounded-2xl shadow-xl p-6 sm:p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <GraduationCap className="w-12 h-12 text-[#FFC857] mr-4 flex-shrink-0" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Need Help with Trigonometry?</h2>
                <p className="text-blue-100">
                  Our expert math tutors can help you master trigonometry, from basic ratios to advanced identities.
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
            "name": "Trigonometry Calculator",
            "description": "Calculate sin, cos, tan and other trigonometric functions. Solve right triangles by finding missing sides and angles.",
            "url": "https://www.thetutorbridge.com/calculators/trigonometry-calculator",
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
                "name": "How do I use SOHCAHTOA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Identify the sides relative to your angle: hypotenuse (longest side), opposite side (across from angle), and adjacent side (next to angle). Choose the ratio using your known values."
                }
              },
              {
                "@type": "Question",
                "name": "What's the difference between degrees and radians?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Both measure angles. Degrees divide a circle into 360 parts. Radians use the radius—a full circle is 2π radians. Convert: radians = degrees × (π/180)."
                }
              },
              {
                "@type": "Question",
                "name": "Why is tan(90°) undefined?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Tangent equals sin/cos. At 90°, cos(90°) = 0, and division by zero is undefined. Geometrically, this represents a vertical line with infinite slope."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
