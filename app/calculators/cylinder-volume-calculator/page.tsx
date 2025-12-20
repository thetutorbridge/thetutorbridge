'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, RotateCcw, Circle, Cylinder, Info, BookOpen, GraduationCap } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

type CylinderType = 'solid' | 'hollow';
type LengthUnit = 'mm' | 'cm' | 'm' | 'in' | 'ft';
type VolumeUnit = 'mm3' | 'cm3' | 'm3' | 'in3' | 'ft3' | 'l' | 'gal';

interface Results {
  volume: number;
  surfaceArea: number;
  lateralArea: number;
  baseArea: number;
}

export default function CylinderVolumeCalculator() {
  const [cylinderType, setCylinderType] = useState<CylinderType>('solid');
  const [height, setHeight] = useState<string>('');
  const [radius, setRadius] = useState<string>('');
  const [diameter, setDiameter] = useState<string>('');
  const [innerRadius, setInnerRadius] = useState<string>('');
  const [innerDiameter, setInnerDiameter] = useState<string>('');
  const [useRadius, setUseRadius] = useState(true);
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>('cm');
  const [volumeUnit, setVolumeUnit] = useState<VolumeUnit>('cm3');
  const [results, setResults] = useState<Results | null>(null);

  // Conversion factors to meters (base unit)
  const lengthToMeters: Record<LengthUnit, number> = {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    in: 0.0254,
    ft: 0.3048,
  };

  // Conversion factors from cubic meters to volume units
  const cubicMetersToVolume: Record<VolumeUnit, number> = {
    mm3: 1e9,
    cm3: 1e6,
    m3: 1,
    in3: 61023.7,
    ft3: 35.3147,
    l: 1000,
    gal: 264.172,
  };

  // Unit labels
  const lengthLabels: Record<LengthUnit, string> = {
    mm: 'mm',
    cm: 'cm',
    m: 'm',
    in: 'in',
    ft: 'ft',
  };

  const volumeLabels: Record<VolumeUnit, string> = {
    mm3: 'mm³',
    cm3: 'cm³',
    m3: 'm³',
    in3: 'in³',
    ft3: 'ft³',
    l: 'L',
    gal: 'gal',
  };

  // Sync radius and diameter
  useEffect(() => {
    if (useRadius && radius) {
      const r = parseFloat(radius);
      if (!isNaN(r)) {
        setDiameter((r * 2).toString());
      }
    }
  }, [radius, useRadius]);

  useEffect(() => {
    if (!useRadius && diameter) {
      const d = parseFloat(diameter);
      if (!isNaN(d)) {
        setRadius((d / 2).toString());
      }
    }
  }, [diameter, useRadius]);

  // Sync inner radius and diameter for hollow cylinder
  useEffect(() => {
    if (useRadius && innerRadius) {
      const r = parseFloat(innerRadius);
      if (!isNaN(r)) {
        setInnerDiameter((r * 2).toString());
      }
    }
  }, [innerRadius, useRadius]);

  useEffect(() => {
    if (!useRadius && innerDiameter) {
      const d = parseFloat(innerDiameter);
      if (!isNaN(d)) {
        setInnerRadius((d / 2).toString());
      }
    }
  }, [innerDiameter, useRadius]);

  // Calculate results
  useEffect(() => {
    const h = parseFloat(height);
    const r = parseFloat(radius);

    if (isNaN(h) || isNaN(r) || h <= 0 || r <= 0) {
      setResults(null);
      return;
    }

    // Convert to meters for calculation
    const hMeters = h * lengthToMeters[lengthUnit];
    const rMeters = r * lengthToMeters[lengthUnit];

    if (cylinderType === 'solid') {
      // Solid cylinder
      const volumeM3 = Math.PI * Math.pow(rMeters, 2) * hMeters;
      const baseAreaM2 = Math.PI * Math.pow(rMeters, 2);
      const lateralAreaM2 = 2 * Math.PI * rMeters * hMeters;
      const surfaceAreaM2 = 2 * baseAreaM2 + lateralAreaM2;

      // Convert to selected length unit squared for area
      const areaFactor = Math.pow(1 / lengthToMeters[lengthUnit], 2);

      setResults({
        volume: volumeM3 * cubicMetersToVolume[volumeUnit],
        surfaceArea: surfaceAreaM2 * areaFactor,
        lateralArea: lateralAreaM2 * areaFactor,
        baseArea: baseAreaM2 * areaFactor,
      });
    } else {
      // Hollow cylinder
      const rInner = parseFloat(innerRadius);
      if (isNaN(rInner) || rInner <= 0 || rInner >= r) {
        setResults(null);
        return;
      }

      const rInnerMeters = rInner * lengthToMeters[lengthUnit];
      const volumeM3 = Math.PI * hMeters * (Math.pow(rMeters, 2) - Math.pow(rInnerMeters, 2));
      const outerBaseAreaM2 = Math.PI * Math.pow(rMeters, 2);
      const innerBaseAreaM2 = Math.PI * Math.pow(rInnerMeters, 2);
      const outerLateralAreaM2 = 2 * Math.PI * rMeters * hMeters;
      const innerLateralAreaM2 = 2 * Math.PI * rInnerMeters * hMeters;
      const surfaceAreaM2 = outerLateralAreaM2 + innerLateralAreaM2 + 2 * (outerBaseAreaM2 - innerBaseAreaM2);

      const areaFactor = Math.pow(1 / lengthToMeters[lengthUnit], 2);

      setResults({
        volume: volumeM3 * cubicMetersToVolume[volumeUnit],
        surfaceArea: surfaceAreaM2 * areaFactor,
        lateralArea: (outerLateralAreaM2 + innerLateralAreaM2) * areaFactor,
        baseArea: (outerBaseAreaM2 - innerBaseAreaM2) * areaFactor,
      });
    }
  }, [height, radius, innerRadius, cylinderType, lengthUnit, volumeUnit]);

  const handleReset = () => {
    setHeight('');
    setRadius('');
    setDiameter('');
    setInnerRadius('');
    setInnerDiameter('');
    setCylinderType('solid');
    setUseRadius(true);
    setLengthUnit('cm');
    setVolumeUnit('cm3');
    setResults(null);
  };

  const formatNumber = (num: number): string => {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.0001) return num.toExponential(4);
    if (Math.abs(num) >= 1000000) return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
    if (Math.abs(num) < 1) return num.toFixed(6).replace(/\.?0+$/, '');
    return num.toLocaleString('en-US', { maximumFractionDigits: 4 });
  };

  // Common examples
  const examples = [
    { name: 'Soda Can', height: 12.2, radius: 3.3, unit: 'cm' as LengthUnit, description: '~355 ml' },
    { name: 'Paint Bucket', height: 19, radius: 8.5, unit: 'cm' as LengthUnit, description: '~3.8 L (1 gal)' },
    { name: 'Oil Drum', height: 88, radius: 28.5, unit: 'cm' as LengthUnit, description: '~200 L' },
    { name: 'Wine Bottle', height: 30, radius: 3.75, unit: 'cm' as LengthUnit, description: '~750 ml' },
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
            <span className="text-gray-600">Cylinder Volume Calculator</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
              <Cylinder className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Cylinder Volume Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate the volume, surface area, and other properties of solid or hollow cylinders. Enter height and radius or diameter.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
          {/* Cylinder Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Cylinder type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="cylinderType"
                  checked={cylinderType === 'solid'}
                  onChange={() => setCylinderType('solid')}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Right or oblique full cylinder</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="cylinderType"
                  checked={cylinderType === 'hollow'}
                  onChange={() => setCylinderType('hollow')}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Hollow cylinder</span>
              </label>
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-4 mb-6">
            {/* Height */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Height
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter height"
                  min="0"
                  step="any"
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all"
                />
                <select
                  value={lengthUnit}
                  onChange={(e) => setLengthUnit(e.target.value as LengthUnit)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 font-medium"
                >
                  <option value="mm">mm</option>
                  <option value="cm">cm</option>
                  <option value="m">m</option>
                  <option value="in">in</option>
                  <option value="ft">ft</option>
                </select>
              </div>
            </div>

            {/* Radius/Diameter Toggle */}
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => setUseRadius(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  useRadius
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Use Radius
              </button>
              <button
                onClick={() => setUseRadius(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !useRadius
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Use Diameter
              </button>
            </div>

            {/* Radius */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {cylinderType === 'hollow' ? 'Outer Radius' : 'Radius'}
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={radius}
                  onChange={(e) => {
                    setRadius(e.target.value);
                    if (useRadius) {
                      const r = parseFloat(e.target.value);
                      if (!isNaN(r)) setDiameter((r * 2).toString());
                    }
                  }}
                  placeholder="Enter radius"
                  min="0"
                  step="any"
                  disabled={!useRadius}
                  className={`flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all ${
                    !useRadius ? 'bg-gray-50 text-gray-500' : ''
                  }`}
                />
                <span className="flex items-center px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium min-w-[60px] justify-center">
                  {lengthLabels[lengthUnit]}
                </span>
              </div>
            </div>

            {/* Diameter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {cylinderType === 'hollow' ? 'Outer Diameter' : 'Diameter'}
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={diameter}
                  onChange={(e) => {
                    setDiameter(e.target.value);
                    if (!useRadius) {
                      const d = parseFloat(e.target.value);
                      if (!isNaN(d)) setRadius((d / 2).toString());
                    }
                  }}
                  placeholder="Enter diameter"
                  min="0"
                  step="any"
                  disabled={useRadius}
                  className={`flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all ${
                    useRadius ? 'bg-gray-50 text-gray-500' : ''
                  }`}
                />
                <span className="flex items-center px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium min-w-[60px] justify-center">
                  {lengthLabels[lengthUnit]}
                </span>
              </div>
            </div>

            {/* Inner Radius/Diameter for Hollow Cylinder */}
            {cylinderType === 'hollow' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Inner Radius
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={innerRadius}
                      onChange={(e) => {
                        setInnerRadius(e.target.value);
                        if (useRadius) {
                          const r = parseFloat(e.target.value);
                          if (!isNaN(r)) setInnerDiameter((r * 2).toString());
                        }
                      }}
                      placeholder="Enter inner radius"
                      min="0"
                      step="any"
                      disabled={!useRadius}
                      className={`flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all ${
                        !useRadius ? 'bg-gray-50 text-gray-500' : ''
                      }`}
                    />
                    <span className="flex items-center px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium min-w-[60px] justify-center">
                      {lengthLabels[lengthUnit]}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Inner Diameter
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={innerDiameter}
                      onChange={(e) => {
                        setInnerDiameter(e.target.value);
                        if (!useRadius) {
                          const d = parseFloat(e.target.value);
                          if (!isNaN(d)) setInnerRadius((d / 2).toString());
                        }
                      }}
                      placeholder="Enter inner diameter"
                      min="0"
                      step="any"
                      disabled={useRadius}
                      className={`flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all ${
                        useRadius ? 'bg-gray-50 text-gray-500' : ''
                      }`}
                    />
                    <span className="flex items-center px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium min-w-[60px] justify-center">
                      {lengthLabels[lengthUnit]}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Formula Display */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 flex items-center justify-center">
            <div className="flex items-center gap-8">
              {/* Cylinder Diagram */}
              <svg viewBox="0 0 120 160" className="w-24 h-32">
                {/* Cylinder body */}
                <ellipse cx="60" cy="30" rx="40" ry="15" fill="none" stroke="#3B82F6" strokeWidth="2" />
                <line x1="20" y1="30" x2="20" y2="130" stroke="#3B82F6" strokeWidth="2" />
                <line x1="100" y1="30" x2="100" y2="130" stroke="#3B82F6" strokeWidth="2" />
                <ellipse cx="60" cy="130" rx="40" ry="15" fill="none" stroke="#3B82F6" strokeWidth="2" />
                <path d="M 20 130 A 40 15 0 0 1 100 130" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 2" />

                {/* Radius line */}
                <line x1="60" y1="30" x2="100" y2="30" stroke="#EF4444" strokeWidth="2" />
                <text x="78" y="22" fontSize="12" fill="#EF4444" fontWeight="bold">r</text>

                {/* Height line */}
                <line x1="108" y1="30" x2="108" y2="130" stroke="#10B981" strokeWidth="2" />
                <text x="112" y="85" fontSize="12" fill="#10B981" fontWeight="bold">h</text>
              </svg>

              {/* Formula */}
              <div className="text-center">
                <p className="text-lg font-mono font-bold text-gray-800">
                  V = h · π · r²
                </p>
                {cylinderType === 'hollow' && (
                  <p className="text-sm text-gray-600 mt-1">
                    V = h · π · (R² - r²)
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Volume Unit Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Volume
            </label>
            <div className="flex gap-2">
              <div className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
                <p className="text-2xl font-bold text-blue-800">
                  {results ? formatNumber(results.volume) : '—'}
                </p>
              </div>
              <select
                value={volumeUnit}
                onChange={(e) => setVolumeUnit(e.target.value as VolumeUnit)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 font-medium"
              >
                <option value="mm3">mm³</option>
                <option value="cm3">cm³</option>
                <option value="m3">m³</option>
                <option value="in3">in³</option>
                <option value="ft3">ft³</option>
                <option value="l">L</option>
                <option value="gal">gal</option>
              </select>
            </div>
          </div>

          {/* Additional Results */}
          {results && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <p className="text-sm text-green-700 font-medium mb-1">Surface Area</p>
                <p className="text-lg font-bold text-green-800">{formatNumber(results.surfaceArea)}</p>
                <p className="text-sm text-green-600">{lengthLabels[lengthUnit]}²</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <p className="text-sm text-purple-700 font-medium mb-1">Lateral Area</p>
                <p className="text-lg font-bold text-purple-800">{formatNumber(results.lateralArea)}</p>
                <p className="text-sm text-purple-600">{lengthLabels[lengthUnit]}²</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <p className="text-sm text-orange-700 font-medium mb-1">Base Area</p>
                <p className="text-lg font-bold text-orange-800">{formatNumber(results.baseArea)}</p>
                <p className="text-sm text-orange-600">{lengthLabels[lengthUnit]}²</p>
              </div>
            </div>
          )}

          {/* Reset Button */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleReset}
              className="flex items-center px-6 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear all changes
            </button>
          </div>
        </div>

        {/* Common Examples */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Circle className="w-5 h-5 mr-2 text-blue-600" />
            Common Cylinder Examples
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {examples.map((example) => (
              <button
                key={example.name}
                onClick={() => {
                  setHeight(example.height.toString());
                  setRadius(example.radius.toString());
                  setDiameter((example.radius * 2).toString());
                  setLengthUnit(example.unit);
                  setCylinderType('solid');
                  setUseRadius(true);
                }}
                className="bg-gray-50 hover:bg-blue-50 rounded-xl p-4 text-left transition-colors border border-gray-200 hover:border-blue-300"
              >
                <p className="font-semibold text-gray-800">{example.name}</p>
                <p className="text-sm text-gray-600">h: {example.height} {example.unit}, r: {example.radius} {example.unit}</p>
                <p className="text-xs text-blue-600 mt-1">{example.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Formulas Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-blue-600" />
            Cylinder Formulas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Volume of Solid Cylinder</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-center mb-2">
                V = π × r² × h
              </div>
              <p className="text-sm text-blue-700">
                Where r is radius and h is height
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="font-semibold text-green-800 mb-2">Volume of Hollow Cylinder</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-center mb-2">
                V = π × h × (R² - r²)
              </div>
              <p className="text-sm text-green-700">
                Where R is outer radius, r is inner radius
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <h3 className="font-semibold text-purple-800 mb-2">Surface Area (Solid)</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-center mb-2">
                A = 2πr² + 2πrh
              </div>
              <p className="text-sm text-purple-700">
                Two circular bases + lateral surface
              </p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4">
              <h3 className="font-semibold text-orange-800 mb-2">Lateral Surface Area</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-center mb-2">
                A<sub>lateral</sub> = 2πrh
              </div>
              <p className="text-sm text-orange-700">
                The curved surface area (without bases)
              </p>
            </div>
          </div>
        </div>

        {/* Understanding Cylinders */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-600" />
            Understanding Cylinders
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is a Cylinder?</h3>
              <p className="text-gray-600 leading-relaxed">
                A cylinder is a three-dimensional solid with two parallel circular bases connected by a curved surface.
                The line segment joining the centers of the two bases is called the axis. In a right cylinder, the axis
                is perpendicular to the bases. The distance between the bases along the axis is the height.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Types of Cylinders</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-1">Right Cylinder</h4>
                  <p className="text-sm text-blue-700">
                    The axis is perpendicular to the circular bases. Most common type used in everyday objects.
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-1">Oblique Cylinder</h4>
                  <p className="text-sm text-green-700">
                    The axis is at an angle to the bases. The volume formula remains the same.
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-800 mb-1">Hollow Cylinder</h4>
                  <p className="text-sm text-purple-700">
                    Has an inner cylindrical hole. Examples include pipes, tubes, and rings.
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-medium text-orange-800 mb-1">Elliptical Cylinder</h4>
                  <p className="text-sm text-orange-700">
                    Has elliptical (oval) bases instead of circular ones.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Real-World Examples</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Beverage cans:</strong> Soda cans, beer cans, and food tins are cylindrical for efficient stacking and manufacturing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Storage tanks:</strong> Water tanks, fuel tanks, and industrial containers often use cylindrical shapes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Pipes and tubes:</strong> Plumbing pipes, electrical conduits, and structural tubes are hollow cylinders</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Nature:</strong> Tree trunks, plant stems, some bones, and bacterial flagella approximate cylinders</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Engines:</strong> Pistons move within cylindrical chambers in internal combustion engines</span>
                </li>
              </ul>
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
              <h3 className="font-semibold text-gray-800 mb-2">How do I calculate cylinder volume?</h3>
              <p className="text-gray-600">
                Multiply π (pi, approximately 3.14159) by the radius squared, then multiply by the height.
                The formula is V = πr²h. If you know the diameter instead of radius, divide the diameter by 2
                to get the radius first.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is the difference between radius and diameter?</h3>
              <p className="text-gray-600">
                The radius is the distance from the center of the circle to its edge. The diameter is the distance
                across the circle through its center, equal to twice the radius (d = 2r).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do I convert cubic centimeters to liters?</h3>
              <p className="text-gray-600">
                1 liter equals 1,000 cubic centimeters. Divide your cm³ value by 1,000 to get liters.
                For example, 500 cm³ = 0.5 liters.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What&apos;s the volume of a hollow cylinder?</h3>
              <p className="text-gray-600">
                For a hollow cylinder (like a pipe), calculate the volume of the outer cylinder and subtract
                the volume of the inner cylinder: V = π × h × (R² - r²), where R is the outer radius and r
                is the inner radius.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Does the volume formula work for oblique (tilted) cylinders?</h3>
              <p className="text-gray-600">
                Yes! The volume of an oblique cylinder is the same as a right cylinder with the same base area
                and height. This follows from Cavalieri&apos;s principle. Use the perpendicular height (not the
                slant height) in your calculation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is the lateral surface area?</h3>
              <p className="text-gray-600">
                The lateral (or curved) surface area is the area of the cylinder&apos;s side, excluding the circular
                bases. It equals 2πrh, which is the circumference of the base multiplied by the height.
                Think of it as unrolling the cylinder&apos;s side into a rectangle.
              </p>
            </div>
          </div>
        </div>

        {/* Related Calculators */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/calculators/circumference-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Circumference Calculator</h3>
              <p className="text-sm text-gray-600">Calculate circle circumference, radius, diameter, and area</p>
            </Link>
            <Link
              href="/calculators/tank-volume-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Tank Volume Calculator</h3>
              <p className="text-sm text-gray-600">Calculate tank capacity for all shapes in gallons and liters</p>
            </Link>
            <Link
              href="/calculators/cubic-yards-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Cubic Yards Calculator</h3>
              <p className="text-sm text-gray-600">Calculate cubic yards, feet, and meters for materials</p>
            </Link>
            <Link
              href="/calculators/square-footage-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Square Footage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate area for any shape with cost estimation</p>
            </Link>
          </div>
        </div>

        {/* Book Your Session CTA */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2563eb] rounded-2xl shadow-xl p-6 sm:p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <GraduationCap className="w-12 h-12 text-[#FFC857] mr-4 flex-shrink-0" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Need Help with Geometry?</h2>
                <p className="text-blue-100">
                  Our expert tutors can help you master volume calculations, surface area, and 3D geometry concepts.
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
            "name": "Cylinder Volume Calculator",
            "description": "Calculate the volume, surface area, and properties of solid or hollow cylinders. Enter height and radius or diameter.",
            "url": "https://www.thetutorbridge.com/calculators/cylinder-volume-calculator",
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
                "name": "How do I calculate cylinder volume?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Multiply π (pi, approximately 3.14159) by the radius squared, then multiply by the height. The formula is V = πr²h. If you know the diameter instead of radius, divide the diameter by 2 to get the radius first."
                }
              },
              {
                "@type": "Question",
                "name": "What is the difference between radius and diameter?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The radius is the distance from the center of the circle to its edge. The diameter is the distance across the circle through its center, equal to twice the radius (d = 2r)."
                }
              },
              {
                "@type": "Question",
                "name": "How do I convert cubic centimeters to liters?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "1 liter equals 1,000 cubic centimeters. Divide your cm³ value by 1,000 to get liters. For example, 500 cm³ = 0.5 liters."
                }
              },
              {
                "@type": "Question",
                "name": "What's the volume of a hollow cylinder?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For a hollow cylinder (like a pipe), calculate the volume of the outer cylinder and subtract the volume of the inner cylinder: V = π × h × (R² - r²), where R is the outer radius and r is the inner radius."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
