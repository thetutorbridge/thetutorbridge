'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ChevronDown, ChevronUp, RotateCcw, TriangleRight } from 'lucide-react';

// Length units with conversion to meters
const lengthUnits: Record<string, { name: string; toMeters: number }> = {
  mm: { name: 'Millimeters (mm)', toMeters: 0.001 },
  cm: { name: 'Centimeters (cm)', toMeters: 0.01 },
  m: { name: 'Meters (m)', toMeters: 1 },
  km: { name: 'Kilometers (km)', toMeters: 1000 },
  in: { name: 'Inches (in)', toMeters: 0.0254 },
  ft: { name: 'Feet (ft)', toMeters: 0.3048 },
  yd: { name: 'Yards (yd)', toMeters: 0.9144 },
  mi: { name: 'Miles (mi)', toMeters: 1609.344 },
  nmi: { name: 'Nautical miles (nmi)', toMeters: 1852 },
};

// Angle units with conversion to degrees
const angleUnits: Record<string, { name: string; toDegrees: number }> = {
  deg: { name: 'Degrees (deg)', toDegrees: 1 },
  rad: { name: 'Radians (rad)', toDegrees: 180 / Math.PI },
  grad: { name: 'Gradians (gon)', toDegrees: 0.9 },
  turn: { name: 'Turns (tr)', toDegrees: 360 },
  arcmin: { name: 'Minutes of arc (arcmin)', toDegrees: 1 / 60 },
  arcsec: { name: 'Seconds of arc (arcsec)', toDegrees: 1 / 3600 },
  mrad: { name: 'Milliradians (mrad)', toDegrees: (180 / Math.PI) / 1000 },
  urad: { name: 'Microradians (μrad)', toDegrees: (180 / Math.PI) / 1000000 },
  pirad: { name: 'π radians (× π rad)', toDegrees: 180 },
};

type InputMode = 'two_sides' | 'angle_and_side' | 'area_and_side';

interface Results {
  sideA: number | null;
  sideB: number | null;
  sideC: number | null;
  angleAlpha: number | null;
  angleBeta: number | null;
  area: number | null;
  perimeter: number | null;
}

export default function RightTriangleCalculatorPage() {
  // Input mode
  const [inputMode, setInputMode] = useState<InputMode>('two_sides');

  // Two sides mode
  const [sideAInput, setSideAInput] = useState<string>('');
  const [sideBInput, setSideBInput] = useState<string>('');
  const [sideCInput, setSideCInput] = useState<string>('');

  // Angle and side mode
  const [angleInput, setAngleInput] = useState<string>('');
  const [knownSide, setKnownSide] = useState<'a' | 'b' | 'c'>('a');
  const [knownSideValue, setKnownSideValue] = useState<string>('');

  // Area and side mode
  const [areaInput, setAreaInput] = useState<string>('');
  const [areaSide, setAreaSide] = useState<'a' | 'b'>('a');
  const [areaSideValue, setAreaSideValue] = useState<string>('');

  // Units
  const [lengthUnit, setLengthUnit] = useState<string>('cm');
  const [angleUnit, setAngleUnit] = useState<string>('deg');

  // Results
  const [results, setResults] = useState<Results>({
    sideA: null,
    sideB: null,
    sideC: null,
    angleAlpha: null,
    angleBeta: null,
    area: null,
    perimeter: null,
  });

  // UI state
  const [showInfo, setShowInfo] = useState(false);
  const [showFormulas, setShowFormulas] = useState(false);
  const [error, setError] = useState<string>('');

  // Conversion helpers
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  const toDegrees = (radians: number) => radians * (180 / Math.PI);

  const convertAngleToDegrees = (value: number, unit: string): number => {
    return value * angleUnits[unit].toDegrees;
  };

  const convertAngleFromDegrees = (degrees: number, unit: string): number => {
    return degrees / angleUnits[unit].toDegrees;
  };

  // Calculate function
  useEffect(() => {
    setError('');
    let newResults: Results = {
      sideA: null,
      sideB: null,
      sideC: null,
      angleAlpha: null,
      angleBeta: null,
      area: null,
      perimeter: null,
    };

    try {
      if (inputMode === 'two_sides') {
        // Count how many sides are provided
        const a = sideAInput ? parseFloat(sideAInput) : null;
        const b = sideBInput ? parseFloat(sideBInput) : null;
        const c = sideCInput ? parseFloat(sideCInput) : null;

        const providedCount = [a, b, c].filter((x) => x !== null && x > 0).length;

        if (providedCount >= 2) {
          let sideA: number, sideB: number, sideC: number;

          if (a && b && a > 0 && b > 0) {
            // Given legs a and b, find hypotenuse c
            sideA = a;
            sideB = b;
            sideC = Math.sqrt(a * a + b * b);
          } else if (a && c && a > 0 && c > 0) {
            // Given leg a and hypotenuse c, find leg b
            if (c <= a) {
              setError('Hypotenuse (c) must be greater than leg (a)');
              setResults(newResults);
              return;
            }
            sideA = a;
            sideC = c;
            sideB = Math.sqrt(c * c - a * a);
          } else if (b && c && b > 0 && c > 0) {
            // Given leg b and hypotenuse c, find leg a
            if (c <= b) {
              setError('Hypotenuse (c) must be greater than leg (b)');
              setResults(newResults);
              return;
            }
            sideB = b;
            sideC = c;
            sideA = Math.sqrt(c * c - b * b);
          } else {
            setResults(newResults);
            return;
          }

          // Calculate angles
          const angleAlphaDeg = toDegrees(Math.atan(sideA / sideB));
          const angleBetaDeg = 90 - angleAlphaDeg;

          // Calculate area and perimeter
          const area = (sideA * sideB) / 2;
          const perimeter = sideA + sideB + sideC;

          newResults = {
            sideA,
            sideB,
            sideC,
            angleAlpha: angleAlphaDeg,
            angleBeta: angleBetaDeg,
            area,
            perimeter,
          };
        }
      } else if (inputMode === 'angle_and_side') {
        const angle = angleInput ? parseFloat(angleInput) : null;
        const side = knownSideValue ? parseFloat(knownSideValue) : null;

        if (angle && side && angle > 0 && side > 0) {
          // Convert angle to degrees
          const angleDeg = convertAngleToDegrees(angle, angleUnit);

          if (angleDeg <= 0 || angleDeg >= 90) {
            setError('Angle must be between 0° and 90° (exclusive)');
            setResults(newResults);
            return;
          }

          const angleRad = toRadians(angleDeg);
          let sideA: number, sideB: number, sideC: number;

          // The angle α is opposite to side a, adjacent to side b
          if (knownSide === 'a') {
            // Given side a (opposite to angle α)
            sideA = side;
            sideB = sideA / Math.tan(angleRad);
            sideC = sideA / Math.sin(angleRad);
          } else if (knownSide === 'b') {
            // Given side b (adjacent to angle α)
            sideB = side;
            sideA = sideB * Math.tan(angleRad);
            sideC = sideB / Math.cos(angleRad);
          } else {
            // Given hypotenuse c
            sideC = side;
            sideA = sideC * Math.sin(angleRad);
            sideB = sideC * Math.cos(angleRad);
          }

          const angleAlphaDeg = angleDeg;
          const angleBetaDeg = 90 - angleAlphaDeg;
          const area = (sideA * sideB) / 2;
          const perimeter = sideA + sideB + sideC;

          newResults = {
            sideA,
            sideB,
            sideC,
            angleAlpha: angleAlphaDeg,
            angleBeta: angleBetaDeg,
            area,
            perimeter,
          };
        }
      } else if (inputMode === 'area_and_side') {
        const area = areaInput ? parseFloat(areaInput) : null;
        const side = areaSideValue ? parseFloat(areaSideValue) : null;

        if (area && side && area > 0 && side > 0) {
          let sideA: number, sideB: number, sideC: number;

          // Area = (a * b) / 2, so a * b = 2 * Area
          if (areaSide === 'a') {
            sideA = side;
            sideB = (2 * area) / sideA;
          } else {
            sideB = side;
            sideA = (2 * area) / sideB;
          }

          sideC = Math.sqrt(sideA * sideA + sideB * sideB);
          const angleAlphaDeg = toDegrees(Math.atan(sideA / sideB));
          const angleBetaDeg = 90 - angleAlphaDeg;
          const perimeter = sideA + sideB + sideC;

          newResults = {
            sideA,
            sideB,
            sideC,
            angleAlpha: angleAlphaDeg,
            angleBeta: angleBetaDeg,
            area,
            perimeter,
          };
        }
      }
    } catch {
      setError('Invalid input values');
    }

    setResults(newResults);
  }, [
    inputMode,
    sideAInput,
    sideBInput,
    sideCInput,
    angleInput,
    knownSide,
    knownSideValue,
    areaInput,
    areaSide,
    areaSideValue,
    lengthUnit,
    angleUnit,
  ]);

  const resetCalculator = () => {
    setSideAInput('');
    setSideBInput('');
    setSideCInput('');
    setAngleInput('');
    setKnownSideValue('');
    setAreaInput('');
    setAreaSideValue('');
    setError('');
  };

  const formatNumber = (num: number | null, decimals: number = 4): string => {
    if (num === null) return '-';
    if (Number.isInteger(num)) return num.toString();
    return num.toFixed(decimals).replace(/\.?0+$/, '');
  };

  const formatAngle = (degrees: number | null): string => {
    if (degrees === null) return '-';
    const converted = convertAngleFromDegrees(degrees, angleUnit);
    return formatNumber(converted);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 mb-4">
              <TriangleRight className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Right Triangle Calculator
            </h1>
            <p className="text-slate-400">
              Calculate sides, angles, area, and perimeter of a right triangle
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6 mb-8">
            {/* Input Mode Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Given...
              </label>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="inputMode"
                    checked={inputMode === 'two_sides'}
                    onChange={() => {
                      setInputMode('two_sides');
                      resetCalculator();
                    }}
                    className="w-4 h-4 text-blue-500 border-slate-500 focus:ring-blue-500 focus:ring-offset-slate-800"
                  />
                  <span className="ml-3 text-slate-300">Two sides</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="inputMode"
                    checked={inputMode === 'angle_and_side'}
                    onChange={() => {
                      setInputMode('angle_and_side');
                      resetCalculator();
                    }}
                    className="w-4 h-4 text-blue-500 border-slate-500 focus:ring-blue-500 focus:ring-offset-slate-800"
                  />
                  <span className="ml-3 text-slate-300">Angle α and one side</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="inputMode"
                    checked={inputMode === 'area_and_side'}
                    onChange={() => {
                      setInputMode('area_and_side');
                      resetCalculator();
                    }}
                    className="w-4 h-4 text-blue-500 border-slate-500 focus:ring-blue-500 focus:ring-offset-slate-800"
                  />
                  <span className="ml-3 text-slate-300">Area and one side</span>
                </label>
              </div>
            </div>

            {/* Triangle Diagram */}
            <div className="flex justify-center mb-6">
              <svg viewBox="0 0 200 180" className="w-48 h-44">
                {/* Triangle */}
                <polygon
                  points="30,150 30,30 170,150"
                  fill="rgba(59, 130, 246, 0.2)"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="2"
                />
                {/* Right angle marker */}
                <polyline
                  points="30,135 45,135 45,150"
                  fill="none"
                  stroke="rgb(148, 163, 184)"
                  strokeWidth="1.5"
                />
                {/* Angle α arc */}
                <path
                  d="M 145,150 A 25,25 0 0,0 160,130"
                  fill="none"
                  stroke="rgb(251, 146, 60)"
                  strokeWidth="2"
                />
                {/* Angle β arc */}
                <path
                  d="M 30,55 A 25,25 0 0,1 50,40"
                  fill="none"
                  stroke="rgb(251, 146, 60)"
                  strokeWidth="2"
                />
                {/* Labels */}
                <text x="15" y="95" fill="white" fontSize="16" fontWeight="bold">a</text>
                <text x="95" y="170" fill="white" fontSize="16" fontWeight="bold">b</text>
                <text x="105" y="80" fill="white" fontSize="16" fontWeight="bold">c</text>
                <text x="150" y="145" fill="rgb(251, 146, 60)" fontSize="14" fontWeight="bold">α</text>
                <text x="38" y="45" fill="rgb(251, 146, 60)" fontSize="14" fontWeight="bold">β</text>
              </svg>
            </div>

            {/* Input Fields based on mode */}
            {inputMode === 'two_sides' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Two Sides</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Enter any two sides to calculate the third side and all angles.
                </p>

                {/* Side a */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Side length a (opposite to α)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={sideAInput}
                      onChange={(e) => setSideAInput(e.target.value)}
                      placeholder="Enter side a"
                      className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      step="any"
                    />
                    <select
                      value={lengthUnit}
                      onChange={(e) => setLengthUnit(e.target.value)}
                      className="px-3 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.entries(lengthUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Side b */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Side length b (adjacent to α)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={sideBInput}
                      onChange={(e) => setSideBInput(e.target.value)}
                      placeholder="Enter side b"
                      className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      step="any"
                    />
                    <select
                      value={lengthUnit}
                      onChange={(e) => setLengthUnit(e.target.value)}
                      className="px-3 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.entries(lengthUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Side c */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Side length c (hypotenuse)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={sideCInput}
                      onChange={(e) => setSideCInput(e.target.value)}
                      placeholder="Enter side c"
                      className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      step="any"
                    />
                    <select
                      value={lengthUnit}
                      onChange={(e) => setLengthUnit(e.target.value)}
                      className="px-3 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.entries(lengthUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {inputMode === 'angle_and_side' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Angle and Side</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Enter angle α and one side to calculate all other values.
                </p>

                {/* Angle α */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Angle α
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={angleInput}
                      onChange={(e) => setAngleInput(e.target.value)}
                      placeholder="Enter angle α"
                      className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      step="any"
                    />
                    <select
                      value={angleUnit}
                      onChange={(e) => setAngleUnit(e.target.value)}
                      className="px-3 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.entries(angleUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Known side selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Known side
                  </label>
                  <select
                    value={knownSide}
                    onChange={(e) => setKnownSide(e.target.value as 'a' | 'b' | 'c')}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="a">Side a (opposite to α)</option>
                    <option value="b">Side b (adjacent to α)</option>
                    <option value="c">Side c (hypotenuse)</option>
                  </select>
                </div>

                {/* Side value */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Side {knownSide} length
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={knownSideValue}
                      onChange={(e) => setKnownSideValue(e.target.value)}
                      placeholder={`Enter side ${knownSide}`}
                      className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      step="any"
                    />
                    <select
                      value={lengthUnit}
                      onChange={(e) => setLengthUnit(e.target.value)}
                      className="px-3 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.entries(lengthUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {inputMode === 'area_and_side' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Area and Side</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Enter the area and one leg to calculate all other values.
                </p>

                {/* Area */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Area
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={areaInput}
                      onChange={(e) => setAreaInput(e.target.value)}
                      placeholder="Enter area"
                      className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      step="any"
                    />
                    <span className="px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-300">
                      {lengthUnit}²
                    </span>
                  </div>
                </div>

                {/* Known leg selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Known leg
                  </label>
                  <select
                    value={areaSide}
                    onChange={(e) => setAreaSide(e.target.value as 'a' | 'b')}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="a">Side a (leg)</option>
                    <option value="b">Side b (leg)</option>
                  </select>
                </div>

                {/* Leg value */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Side {areaSide} length
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={areaSideValue}
                      onChange={(e) => setAreaSideValue(e.target.value)}
                      placeholder={`Enter side ${areaSide}`}
                      className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      step="any"
                    />
                    <select
                      value={lengthUnit}
                      onChange={(e) => setLengthUnit(e.target.value)}
                      className="px-3 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.entries(lengthUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Reset Button */}
            <button
              onClick={resetCalculator}
              className="mt-6 flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          {/* Results Card */}
          {(results.sideA !== null || results.sideB !== null || results.sideC !== null) && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Results</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sides */}
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-slate-400 mb-3">Sides</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Side a:</span>
                      <span className="text-white font-semibold">
                        {formatNumber(results.sideA)} {lengthUnit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Side b:</span>
                      <span className="text-white font-semibold">
                        {formatNumber(results.sideB)} {lengthUnit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Side c (hypotenuse):</span>
                      <span className="text-white font-semibold">
                        {formatNumber(results.sideC)} {lengthUnit}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Angles */}
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-slate-400 mb-3">Angles</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Angle α:</span>
                      <span className="text-white font-semibold">
                        {formatAngle(results.angleAlpha)} {angleUnit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Angle β:</span>
                      <span className="text-white font-semibold">
                        {formatAngle(results.angleBeta)} {angleUnit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Right angle:</span>
                      <span className="text-white font-semibold">
                        {formatAngle(90)} {angleUnit}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Area */}
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-slate-400 mb-3">Area</h3>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Area:</span>
                    <span className="text-white font-semibold">
                      {formatNumber(results.area)} {lengthUnit}²
                    </span>
                  </div>
                </div>

                {/* Perimeter */}
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-slate-400 mb-3">Perimeter</h3>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Perimeter:</span>
                    <span className="text-white font-semibold">
                      {formatNumber(results.perimeter)} {lengthUnit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Formulas Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 overflow-hidden mb-8">
            <button
              onClick={() => setShowFormulas(!showFormulas)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-700/30 transition-colors"
            >
              <h2 className="text-xl font-bold text-white">Formulas Used</h2>
              {showFormulas ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </button>
            {showFormulas && (
              <div className="px-6 pb-6 space-y-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    Pythagorean Theorem
                  </h3>
                  <p className="text-slate-300 font-mono text-lg">a² + b² = c²</p>
                  <p className="text-slate-400 text-sm mt-2">
                    Where c is the hypotenuse and a, b are the legs.
                  </p>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    Trigonometric Ratios (SOH CAH TOA)
                  </h3>
                  <div className="space-y-2 font-mono text-slate-300">
                    <p>sin(α) = opposite / hypotenuse = a / c</p>
                    <p>cos(α) = adjacent / hypotenuse = b / c</p>
                    <p>tan(α) = opposite / adjacent = a / b</p>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    Area and Perimeter
                  </h3>
                  <div className="space-y-2 font-mono text-slate-300">
                    <p>Area = (a × b) / 2</p>
                    <p>Perimeter = a + b + c</p>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    Angle Relationships
                  </h3>
                  <div className="space-y-2 font-mono text-slate-300">
                    <p>α + β = 90°</p>
                    <p>α + β + 90° = 180°</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 overflow-hidden">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-700/30 transition-colors"
            >
              <h2 className="text-xl font-bold text-white">About Right Triangles</h2>
              {showInfo ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </button>
            {showInfo && (
              <div className="px-6 pb-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    What is a Right Triangle?
                  </h3>
                  <p className="text-slate-300">
                    A right triangle is a triangle with one 90-degree angle (right angle).
                    The side opposite to the right angle is called the hypotenuse (c),
                    and it&apos;s always the longest side. The other two sides are called legs (a and b).
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    How to Use This Calculator
                  </h3>
                  <ul className="text-slate-300 list-disc list-inside space-y-1">
                    <li><strong>Two sides:</strong> Enter any two sides to find the third and all angles</li>
                    <li><strong>Angle and side:</strong> Enter angle α and one side to solve the triangle</li>
                    <li><strong>Area and side:</strong> Enter the area and one leg to find all values</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    Special Right Triangles
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <h4 className="text-white font-semibold">45-45-90 Triangle</h4>
                      <p className="text-slate-400 text-sm">
                        Sides ratio: 1 : 1 : √2
                      </p>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <h4 className="text-white font-semibold">30-60-90 Triangle</h4>
                      <p className="text-slate-400 text-sm">
                        Sides ratio: 1 : √3 : 2
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    Common Applications
                  </h3>
                  <ul className="text-slate-300 list-disc list-inside space-y-1">
                    <li>Construction and architecture</li>
                    <li>Navigation and surveying</li>
                    <li>Physics and engineering</li>
                    <li>Computer graphics and game development</li>
                    <li>Calculating distances and heights</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Right Triangle Calculator',
            description:
              'Calculate sides, angles, area, and perimeter of a right triangle using the Pythagorean theorem and trigonometry.',
            url: 'https://thetutorbridge.com/calculators/right-triangle-calculator',
            applicationCategory: 'EducationalApplication',
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
