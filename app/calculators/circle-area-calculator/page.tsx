'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, ChevronRight, Info, ChevronDown, ChevronUp, GraduationCap, Circle } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

type LengthUnit = 'mm' | 'cm' | 'm' | 'km' | 'in' | 'ft' | 'yd' | 'mi' | 'nm' | 'ft_in' | 'm_cm';
type AreaUnit = 'mm2' | 'cm2' | 'dm2' | 'm2' | 'km2' | 'in2' | 'ft2' | 'yd2' | 'mi2' | 'a' | 'da' | 'ha' | 'ac' | 'sf';

// Length conversion to meters
const lengthToMeters: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
  nm: 1852,
};

// Area conversion to square meters
const areaToSqMeters: Record<string, number> = {
  mm2: 0.000001,
  cm2: 0.0001,
  dm2: 0.01,
  m2: 1,
  km2: 1000000,
  in2: 0.00064516,
  ft2: 0.092903,
  yd2: 0.836127,
  mi2: 2589988.11,
  a: 100,           // are
  da: 1000,         // decare
  ha: 10000,        // hectare
  ac: 4046.86,      // acre
  sf: 5351.215,     // football field (American)
};

const lengthUnitLabels: Record<LengthUnit, string> = {
  mm: 'Millimeters (mm)',
  cm: 'Centimeters (cm)',
  m: 'Meters (m)',
  km: 'Kilometers (km)',
  in: 'Inches (in)',
  ft: 'Feet (ft)',
  yd: 'Yard (yd)',
  mi: 'Miles (mi)',
  nm: 'Nautical miles (nm)',
  ft_in: 'Feet / Inches (ft / in)',
  m_cm: 'Meters / Centimeters (m / cm)',
};

const areaUnitLabels: Record<AreaUnit, string> = {
  mm2: 'Square millimeters (mm²)',
  cm2: 'Square centimeters (cm²)',
  dm2: 'Square decimeters (dm²)',
  m2: 'Square meters (m²)',
  km2: 'Square kilometers (km²)',
  in2: 'Square inches (in²)',
  ft2: 'Square feet (ft²)',
  yd2: 'Square yards (yd²)',
  mi2: 'Square miles (mi²)',
  a: 'Ares (a)',
  da: 'Decares (da)',
  ha: 'Hectares (ha)',
  ac: 'Acres (ac)',
  sf: 'Football fields (sf)',
};

const lengthUnitShort: Record<LengthUnit, string> = {
  mm: 'mm',
  cm: 'cm',
  m: 'm',
  km: 'km',
  in: 'in',
  ft: 'ft',
  yd: 'yd',
  mi: 'mi',
  nm: 'nm',
  ft_in: 'ft/in',
  m_cm: 'm/cm',
};

const areaUnitShort: Record<AreaUnit, string> = {
  mm2: 'mm²',
  cm2: 'cm²',
  dm2: 'dm²',
  m2: 'm²',
  km2: 'km²',
  in2: 'in²',
  ft2: 'ft²',
  yd2: 'yd²',
  mi2: 'mi²',
  a: 'a',
  da: 'da',
  ha: 'ha',
  ac: 'ac',
  sf: 'sf',
};

export default function CircleAreaCalculator() {
  const [radius, setRadius] = useState<string>('');
  const [radiusFt, setRadiusFt] = useState<string>('');
  const [radiusIn, setRadiusIn] = useState<string>('');
  const [radiusM, setRadiusM] = useState<string>('');
  const [radiusCm, setRadiusCm] = useState<string>('');
  const [diameter, setDiameter] = useState<string>('');
  const [diameterFt, setDiameterFt] = useState<string>('');
  const [diameterIn, setDiameterIn] = useState<string>('');
  const [diameterM, setDiameterM] = useState<string>('');
  const [diameterCm, setDiameterCm] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [radiusUnit, setRadiusUnit] = useState<LengthUnit>('cm');
  const [diameterUnit, setDiameterUnit] = useState<LengthUnit>('cm');
  const [areaUnit, setAreaUnit] = useState<AreaUnit>('cm2');
  const [activeInput, setActiveInput] = useState<'radius' | 'diameter' | 'area' | null>(null);
  const [showRadiusDropdown, setShowRadiusDropdown] = useState(false);
  const [showDiameterDropdown, setShowDiameterDropdown] = useState(false);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [circumference, setCircumference] = useState<number | null>(null);

  // Get radius value in meters
  const getRadiusInMeters = (): number => {
    if (radiusUnit === 'ft_in') {
      const ft = parseFloat(radiusFt) || 0;
      const inches = parseFloat(radiusIn) || 0;
      return (ft * 0.3048) + (inches * 0.0254);
    } else if (radiusUnit === 'm_cm') {
      const m = parseFloat(radiusM) || 0;
      const cm = parseFloat(radiusCm) || 0;
      return m + (cm * 0.01);
    }
    return (parseFloat(radius) || 0) * lengthToMeters[radiusUnit];
  };

  // Get diameter value in meters
  const getDiameterInMeters = (): number => {
    if (diameterUnit === 'ft_in') {
      const ft = parseFloat(diameterFt) || 0;
      const inches = parseFloat(diameterIn) || 0;
      return (ft * 0.3048) + (inches * 0.0254);
    } else if (diameterUnit === 'm_cm') {
      const m = parseFloat(diameterM) || 0;
      const cm = parseFloat(diameterCm) || 0;
      return m + (cm * 0.01);
    }
    return (parseFloat(diameter) || 0) * lengthToMeters[diameterUnit];
  };

  // Get area in square meters
  const getAreaInSqMeters = (): number => {
    return (parseFloat(area) || 0) * areaToSqMeters[areaUnit];
  };

  // Convert meters to target unit
  const metersToUnit = (meters: number, unit: LengthUnit): number => {
    if (unit === 'ft_in' || unit === 'm_cm') {
      return meters / lengthToMeters['m'];
    }
    return meters / lengthToMeters[unit];
  };

  // Convert square meters to target unit
  const sqMetersToUnit = (sqMeters: number, unit: AreaUnit): number => {
    return sqMeters / areaToSqMeters[unit];
  };

  // Set radius from meters
  const setRadiusFromMeters = (meters: number) => {
    if (radiusUnit === 'ft_in') {
      const totalInches = meters / 0.0254;
      const ft = Math.floor(totalInches / 12);
      const inches = totalInches % 12;
      setRadiusFt(ft.toFixed(0));
      setRadiusIn(inches.toFixed(4).replace(/\.?0+$/, ''));
    } else if (radiusUnit === 'm_cm') {
      const m = Math.floor(meters);
      const cm = (meters - m) * 100;
      setRadiusM(m.toFixed(0));
      setRadiusCm(cm.toFixed(4).replace(/\.?0+$/, ''));
    } else {
      const value = metersToUnit(meters, radiusUnit);
      setRadius(value.toFixed(6).replace(/\.?0+$/, ''));
    }
  };

  // Set diameter from meters
  const setDiameterFromMeters = (meters: number) => {
    if (diameterUnit === 'ft_in') {
      const totalInches = meters / 0.0254;
      const ft = Math.floor(totalInches / 12);
      const inches = totalInches % 12;
      setDiameterFt(ft.toFixed(0));
      setDiameterIn(inches.toFixed(4).replace(/\.?0+$/, ''));
    } else if (diameterUnit === 'm_cm') {
      const m = Math.floor(meters);
      const cm = (meters - m) * 100;
      setDiameterM(m.toFixed(0));
      setDiameterCm(cm.toFixed(4).replace(/\.?0+$/, ''));
    } else {
      const value = metersToUnit(meters, diameterUnit);
      setDiameter(value.toFixed(6).replace(/\.?0+$/, ''));
    }
  };

  // Calculate on input change
  useEffect(() => {
    if (activeInput === 'radius') {
      const radiusMeters = getRadiusInMeters();
      if (radiusMeters > 0) {
        // Calculate diameter
        const diameterMeters = radiusMeters * 2;
        setDiameterFromMeters(diameterMeters);

        // Calculate area (A = πr²)
        const areaSqMeters = Math.PI * radiusMeters * radiusMeters;
        const areaInUnit = sqMetersToUnit(areaSqMeters, areaUnit);
        setArea(areaInUnit.toFixed(6).replace(/\.?0+$/, ''));

        // Calculate circumference
        setCircumference(2 * Math.PI * radiusMeters);
      }
    } else if (activeInput === 'diameter') {
      const diameterMeters = getDiameterInMeters();
      if (diameterMeters > 0) {
        // Calculate radius
        const radiusMeters = diameterMeters / 2;
        setRadiusFromMeters(radiusMeters);

        // Calculate area (A = π(d/2)²)
        const areaSqMeters = Math.PI * radiusMeters * radiusMeters;
        const areaInUnit = sqMetersToUnit(areaSqMeters, areaUnit);
        setArea(areaInUnit.toFixed(6).replace(/\.?0+$/, ''));

        // Calculate circumference
        setCircumference(2 * Math.PI * radiusMeters);
      }
    } else if (activeInput === 'area') {
      const areaSqMeters = getAreaInSqMeters();
      if (areaSqMeters > 0) {
        // Calculate radius from area (r = √(A/π))
        const radiusMeters = Math.sqrt(areaSqMeters / Math.PI);
        setRadiusFromMeters(radiusMeters);

        // Calculate diameter
        const diameterMeters = radiusMeters * 2;
        setDiameterFromMeters(diameterMeters);

        // Calculate circumference
        setCircumference(2 * Math.PI * radiusMeters);
      }
    }
  }, [radius, radiusFt, radiusIn, radiusM, radiusCm, diameter, diameterFt, diameterIn, diameterM, diameterCm, area, radiusUnit, diameterUnit, areaUnit, activeInput]);

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setShowRadiusDropdown(false);
    setShowDiameterDropdown(false);
    setShowAreaDropdown(false);
  };

  // Format number for display
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return num.toExponential(4);
    }
    return num.toFixed(6).replace(/\.?0+$/, '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-purple-600 hover:text-purple-800 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/calculators" className="text-purple-600 hover:text-purple-800">
              Calculators
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Circle Area Calculator</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white mb-4 shadow-lg">
            <Circle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Circle Area Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate the area of a circle from radius or diameter. Enter any value to find all circle properties instantly.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              Circle Calculator
            </h2>
          </div>

          <div className="p-6">
            {/* Circle Diagram */}
            <div className="flex justify-center mb-6">
              <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-md">
                {/* Circle fill */}
                <circle cx="100" cy="100" r="80" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />

                {/* Center point */}
                <circle cx="100" cy="100" r="3" fill="#1f2937" />

                {/* Radius line */}
                <line x1="100" y1="100" x2="165" y2="65" stroke="#1f2937" strokeWidth="2" />
                <text x="135" y="75" fontSize="14" fontWeight="bold" fill="#1f2937">r</text>

                {/* Diameter line */}
                <line x1="35" y1="135" x2="165" y2="65" stroke="#1f2937" strokeWidth="1" strokeDasharray="5,5" />
                <text x="55" y="125" fontSize="14" fontWeight="bold" fill="#1f2937">d</text>
              </svg>
            </div>

            <div className="space-y-5">
              {/* Radius Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Radius (r)</label>
                <div className="flex gap-3">
                  {radiusUnit === 'ft_in' ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="number"
                        value={radiusFt}
                        onChange={(e) => {
                          setRadiusFt(e.target.value);
                          setActiveInput('radius');
                        }}
                        onFocus={() => setActiveInput('radius')}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        placeholder="Feet"
                        min="0"
                      />
                      <input
                        type="number"
                        value={radiusIn}
                        onChange={(e) => {
                          setRadiusIn(e.target.value);
                          setActiveInput('radius');
                        }}
                        onFocus={() => setActiveInput('radius')}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        placeholder="Inches"
                        min="0"
                      />
                    </div>
                  ) : radiusUnit === 'm_cm' ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="number"
                        value={radiusM}
                        onChange={(e) => {
                          setRadiusM(e.target.value);
                          setActiveInput('radius');
                        }}
                        onFocus={() => setActiveInput('radius')}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        placeholder="Meters"
                        min="0"
                      />
                      <input
                        type="number"
                        value={radiusCm}
                        onChange={(e) => {
                          setRadiusCm(e.target.value);
                          setActiveInput('radius');
                        }}
                        onFocus={() => setActiveInput('radius')}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        placeholder="cm"
                        min="0"
                      />
                    </div>
                  ) : (
                    <input
                      type="number"
                      value={radius}
                      onChange={(e) => {
                        setRadius(e.target.value);
                        setActiveInput('radius');
                      }}
                      onFocus={() => setActiveInput('radius')}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      placeholder="Enter radius"
                      min="0"
                      step="any"
                    />
                  )}
                  <div className="relative">
                    <button
                      onClick={() => {
                        closeAllDropdowns();
                        setShowRadiusDropdown(!showRadiusDropdown);
                      }}
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-all flex items-center gap-2 bg-gray-50 min-w-[100px] justify-between"
                    >
                      <span className="font-medium text-gray-700">{lengthUnitShort[radiusUnit]}</span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>
                    {showRadiusDropdown && (
                      <div className="absolute right-0 top-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-20 max-h-64 overflow-y-auto min-w-[220px]">
                        {(Object.keys(lengthUnitLabels) as LengthUnit[]).map((unit) => (
                          <button
                            key={unit}
                            onClick={() => {
                              setRadiusUnit(unit);
                              setShowRadiusDropdown(false);
                            }}
                            className={`w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors text-sm ${
                              radiusUnit === unit ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                            }`}
                          >
                            {lengthUnitLabels[unit]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Diameter Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Diameter (d)</label>
                <div className="flex gap-3">
                  {diameterUnit === 'ft_in' ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="number"
                        value={diameterFt}
                        onChange={(e) => {
                          setDiameterFt(e.target.value);
                          setActiveInput('diameter');
                        }}
                        onFocus={() => setActiveInput('diameter')}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        placeholder="Feet"
                        min="0"
                      />
                      <input
                        type="number"
                        value={diameterIn}
                        onChange={(e) => {
                          setDiameterIn(e.target.value);
                          setActiveInput('diameter');
                        }}
                        onFocus={() => setActiveInput('diameter')}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        placeholder="Inches"
                        min="0"
                      />
                    </div>
                  ) : diameterUnit === 'm_cm' ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="number"
                        value={diameterM}
                        onChange={(e) => {
                          setDiameterM(e.target.value);
                          setActiveInput('diameter');
                        }}
                        onFocus={() => setActiveInput('diameter')}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        placeholder="Meters"
                        min="0"
                      />
                      <input
                        type="number"
                        value={diameterCm}
                        onChange={(e) => {
                          setDiameterCm(e.target.value);
                          setActiveInput('diameter');
                        }}
                        onFocus={() => setActiveInput('diameter')}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        placeholder="cm"
                        min="0"
                      />
                    </div>
                  ) : (
                    <input
                      type="number"
                      value={diameter}
                      onChange={(e) => {
                        setDiameter(e.target.value);
                        setActiveInput('diameter');
                      }}
                      onFocus={() => setActiveInput('diameter')}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      placeholder="Enter diameter"
                      min="0"
                      step="any"
                    />
                  )}
                  <div className="relative">
                    <button
                      onClick={() => {
                        closeAllDropdowns();
                        setShowDiameterDropdown(!showDiameterDropdown);
                      }}
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-all flex items-center gap-2 bg-gray-50 min-w-[100px] justify-between"
                    >
                      <span className="font-medium text-gray-700">{lengthUnitShort[diameterUnit]}</span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>
                    {showDiameterDropdown && (
                      <div className="absolute right-0 top-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-20 max-h-64 overflow-y-auto min-w-[220px]">
                        {(Object.keys(lengthUnitLabels) as LengthUnit[]).map((unit) => (
                          <button
                            key={unit}
                            onClick={() => {
                              setDiameterUnit(unit);
                              setShowDiameterDropdown(false);
                            }}
                            className={`w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors text-sm ${
                              diameterUnit === unit ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                            }`}
                          >
                            {lengthUnitLabels[unit]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Area Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area (A)</label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => {
                      setArea(e.target.value);
                      setActiveInput('area');
                    }}
                    onFocus={() => setActiveInput('area')}
                    className="flex-1 px-4 py-3 border-2 border-purple-300 bg-purple-50 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-lg font-semibold text-purple-700"
                    placeholder="Calculated area"
                    min="0"
                    step="any"
                  />
                  <div className="relative">
                    <button
                      onClick={() => {
                        closeAllDropdowns();
                        setShowAreaDropdown(!showAreaDropdown);
                      }}
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-all flex items-center gap-2 bg-gray-50 min-w-[100px] justify-between"
                    >
                      <span className="font-medium text-gray-700">{areaUnitShort[areaUnit]}</span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>
                    {showAreaDropdown && (
                      <div className="absolute right-0 top-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-20 max-h-64 overflow-y-auto min-w-[240px]">
                        {(Object.keys(areaUnitLabels) as AreaUnit[]).map((unit) => (
                          <button
                            key={unit}
                            onClick={() => {
                              setAreaUnit(unit);
                              setShowAreaDropdown(false);
                            }}
                            className={`w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors text-sm ${
                              areaUnit === unit ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                            }`}
                          >
                            {areaUnitLabels[unit]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Result Summary */}
              {circumference !== null && circumference > 0 && (
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">Circle Properties</h4>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Circumference:</span>
                      <span className="font-semibold text-gray-800 ml-2">
                        {formatNumber(circumference / lengthToMeters[radiusUnit === 'ft_in' || radiusUnit === 'm_cm' ? 'm' : radiusUnit])} {lengthUnitShort[radiusUnit === 'ft_in' || radiusUnit === 'm_cm' ? 'm' : radiusUnit]}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Formula used:</span>
                      <span className="font-semibold text-gray-800 ml-2">A = πr²</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Formula Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <button
            onClick={() => setShowFormula(!showFormula)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Info className="w-5 h-5 mr-2 text-purple-600" />
              Circle Area Formulas
            </h3>
            {showFormula ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {showFormula && (
            <div className="px-6 pb-6 space-y-4">
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">Area from Radius:</h4>
                <div className="bg-white rounded-lg p-3 font-mono text-lg text-center">
                  A = π × r²
                </div>
                <p className="text-sm text-gray-600 mt-2">Where r is the radius of the circle</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Area from Diameter:</h4>
                <div className="bg-white rounded-lg p-3 font-mono text-lg text-center">
                  A = π × (d/2)² = π × d² / 4
                </div>
                <p className="text-sm text-gray-600 mt-2">Where d is the diameter of the circle</p>
              </div>

              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Radius from Area:</h4>
                <div className="bg-white rounded-lg p-3 font-mono text-lg text-center">
                  r = √(A / π)
                </div>
                <p className="text-sm text-gray-600 mt-2">Where A is the area of the circle</p>
              </div>

              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Circumference from Radius:</h4>
                <div className="bg-white rounded-lg p-3 font-mono text-lg text-center">
                  C = 2 × π × r
                </div>
                <p className="text-sm text-gray-600 mt-2">Where C is the circumference</p>
              </div>
            </div>
          )}
        </div>

        {/* Educational Content */}
        <div className="prose prose-gray max-w-none">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Circle className="w-6 h-6 mr-2 text-purple-600" />
              Understanding Circle Area
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">What is Circle Area?</h3>
                <p>
                  The <strong>area of a circle</strong> is the amount of space enclosed within the circle's boundary. It's measured in square units (cm², m², in², etc.) and represents the total surface contained by the circle.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">The Famous Formula: A = πr²</h3>
                <p>
                  The area of a circle equals <strong>pi (π) times the radius squared</strong>. This is one of the most important formulas in geometry:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mt-3 text-center">
                  <span className="text-2xl font-bold text-purple-700">A = π × r²</span>
                </div>
                <p className="mt-3">
                  Where:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>A</strong> = Area of the circle</li>
                  <li><strong>π (pi)</strong> ≈ 3.14159... (a mathematical constant)</li>
                  <li><strong>r</strong> = Radius (distance from center to edge)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Key Circle Relationships</h3>
                <div className="grid sm:grid-cols-2 gap-4 mt-3">
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-800">Radius & Diameter</h4>
                    <p className="text-sm mt-1">d = 2r (diameter is twice the radius)</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-800">Circumference & Radius</h4>
                    <p className="text-sm mt-1">C = 2πr (circumference formula)</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-800">Area & Circumference</h4>
                    <p className="text-sm mt-1">A = C² / (4π)</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-800">Special Case</h4>
                    <p className="text-sm mt-1">When r = 2, A = C = 4π</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Example Calculations</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <p><strong>Example 1:</strong> Circle with radius 5 cm</p>
                  <p className="ml-4">Area = π × 5² = π × 25 = <strong>78.54 cm²</strong></p>

                  <p><strong>Example 2:</strong> Circle with diameter 10 m</p>
                  <p className="ml-4">Radius = 10/2 = 5 m</p>
                  <p className="ml-4">Area = π × 5² = <strong>78.54 m²</strong></p>

                  <p><strong>Example 3:</strong> Find radius if area = 100 cm²</p>
                  <p className="ml-4">r = √(100/π) = √(31.83) = <strong>5.64 cm</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: 'How do I find the area of a circle from radius?',
                a: 'Multiply pi (π ≈ 3.14159) by the radius squared. Formula: A = πr². For example, if radius is 4 cm, area = 3.14159 × 4² = 50.27 cm².'
              },
              {
                q: 'How do I find the area from diameter?',
                a: 'First divide the diameter by 2 to get the radius, then use A = πr². Or use the direct formula: A = π × (d/2)² = πd²/4.'
              },
              {
                q: 'How do I find radius if I know the area?',
                a: 'Divide the area by pi, then take the square root. Formula: r = √(A/π). For example, if area is 100 cm², radius = √(100/3.14159) = 5.64 cm.'
              },
              {
                q: 'What is pi (π)?',
                a: 'Pi is a mathematical constant representing the ratio of a circle\'s circumference to its diameter. It\'s approximately 3.14159265359... and is an irrational number (it goes on forever without repeating).'
              },
              {
                q: 'Why do we square the radius in the area formula?',
                a: 'Area is a two-dimensional measurement (length × width). Since a circle extends in two dimensions from its center, we multiply the radius by itself (r × r = r²) to capture both dimensions.'
              },
              {
                q: 'What\'s the difference between area and circumference?',
                a: 'Area (A = πr²) measures the space inside the circle in square units. Circumference (C = 2πr) measures the distance around the circle in linear units.'
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                <h3 className="font-semibold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Calculators */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-purple-100 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Circumference Calculator', href: '/calculators/circumference-calculator', desc: 'Calculate circle circumference' },
              { name: 'Area of a Circle Calculator', href: '/calculators/area-of-a-circle-calculator', desc: 'Another circle area tool' },
              { name: 'Cylinder Volume Calculator', href: '/calculators/cylinder-volume-calculator', desc: 'Volume of cylinders' },
              { name: 'Square Footage Calculator', href: '/calculators/square-footage-calculator', desc: 'Calculate area in sq ft' },
              { name: 'Trigonometry Calculator', href: '/calculators/trigonometry-calculator', desc: 'Sin, cos, tan calculator' },
              { name: 'Percentage Calculator', href: '/calculators/percentage-calculator', desc: 'Calculate percentages' },
            ].map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                  {calc.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{calc.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 text-purple-200" />
          <h2 className="text-2xl font-bold mb-3">Need Help with Geometry?</h2>
          <p className="text-purple-100 mb-6 max-w-xl mx-auto">
            Our expert tutors can help you understand circle formulas, geometry concepts, and more!
          </p>
          <Link
            href="/tutoring/free-consultation"
            className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors shadow-lg"
          >
            Book Your Free Session
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </main>

      <Footer />

      {/* Click outside to close dropdowns */}
      {(showRadiusDropdown || showDiameterDropdown || showAreaDropdown) && (
        <div
          className="fixed inset-0 z-10"
          onClick={closeAllDropdowns}
        />
      )}

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Circle Area Calculator',
            description: 'Free circle area calculator. Calculate area from radius or diameter. Find radius, diameter, and circumference from area.',
            url: 'https://www.thetutorbridge.com/calculators/circle-area-calculator',
            applicationCategory: 'UtilityApplication',
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
