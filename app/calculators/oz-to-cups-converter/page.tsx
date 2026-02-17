'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, ChevronRight, Info, ArrowRightLeft, Droplets, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

type OunceType = 'us_fl_oz' | 'uk_fl_oz';
type CupType = 'us_customary' | 'us_legal' | 'metric';

// Conversion factors to milliliters (base unit)
const ounceToMl: Record<OunceType, number> = {
  us_fl_oz: 29.5735,
  uk_fl_oz: 28.4131,
};

const cupToMl: Record<CupType, number> = {
  us_customary: 236.588,  // 8 US fl oz
  us_legal: 240,          // 240 ml (used for nutrition labels)
  metric: 250,            // 250 ml
};

const ounceLabels: Record<OunceType, string> = {
  us_fl_oz: 'US fl oz',
  uk_fl_oz: 'UK fl oz',
};

const cupLabels: Record<CupType, string> = {
  us_customary: 'US customary cups',
  us_legal: 'US legal cups',
  metric: 'Metric cups',
};

const cupDescriptions: Record<CupType, string> = {
  us_customary: '236.588 ml (cooking)',
  us_legal: '240 ml (nutrition)',
  metric: '250 ml',
};

export default function OzToCupsConverter() {
  const [ounces, setOunces] = useState<string>('8');
  const [cups, setCups] = useState<string>('');
  const [ounceType, setOunceType] = useState<OunceType>('us_fl_oz');
  const [cupType, setCupType] = useState<CupType>('us_customary');
  const [activeInput, setActiveInput] = useState<'ounces' | 'cups'>('ounces');
  const [showOunceDropdown, setShowOunceDropdown] = useState(false);
  const [showCupDropdown, setShowCupDropdown] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [showConversionTable, setShowConversionTable] = useState(false);

  // Convert ounces to cups
  const ouncesToCups = (oz: number, ozType: OunceType, cType: CupType): number => {
    const ml = oz * ounceToMl[ozType];
    return ml / cupToMl[cType];
  };

  // Convert cups to ounces
  const cupsToOunces = (cup: number, cType: CupType, ozType: OunceType): number => {
    const ml = cup * cupToMl[cType];
    return ml / ounceToMl[ozType];
  };

  // Auto-calculate on input change
  useEffect(() => {
    if (activeInput === 'ounces') {
      const oz = parseFloat(ounces);
      if (!isNaN(oz) && oz >= 0) {
        const result = ouncesToCups(oz, ounceType, cupType);
        setCups(result.toFixed(4).replace(/\.?0+$/, ''));
      } else if (ounces === '') {
        setCups('');
      }
    } else {
      const cup = parseFloat(cups);
      if (!isNaN(cup) && cup >= 0) {
        const result = cupsToOunces(cup, cupType, ounceType);
        setOunces(result.toFixed(4).replace(/\.?0+$/, ''));
      } else if (cups === '') {
        setOunces('');
      }
    }
  }, [ounces, cups, ounceType, cupType, activeInput]);

  // Calculate conversion factor for display
  const getConversionFactor = (): number => {
    return ounceToMl[ounceType] / cupToMl[cupType];
  };

  // Common conversions table data
  const commonConversions = [
    { oz: 1, desc: '1 oz' },
    { oz: 2, desc: '2 oz' },
    { oz: 4, desc: '4 oz (½ cup)' },
    { oz: 6, desc: '6 oz (¾ cup)' },
    { oz: 8, desc: '8 oz (1 cup)' },
    { oz: 12, desc: '12 oz (1½ cups)' },
    { oz: 16, desc: '16 oz (2 cups / 1 pint)' },
    { oz: 24, desc: '24 oz (3 cups)' },
    { oz: 32, desc: '32 oz (4 cups / 1 quart)' },
    { oz: 64, desc: '64 oz (8 cups / ½ gallon)' },
  ];

  // Format fraction display
  const formatFraction = (value: number): string => {
    const fractions: Record<string, string> = {
      '0.125': '⅛',
      '0.25': '¼',
      '0.333': '⅓',
      '0.375': '⅜',
      '0.5': '½',
      '0.625': '⅝',
      '0.667': '⅔',
      '0.75': '¾',
      '0.875': '⅞',
    };

    const whole = Math.floor(value);
    const decimal = value - whole;

    for (const [key, fraction] of Object.entries(fractions)) {
      if (Math.abs(decimal - parseFloat(key)) < 0.02) {
        return whole > 0 ? `${whole} ${fraction}` : fraction;
      }
    }

    return value.toFixed(3).replace(/\.?0+$/, '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many cups is 8 oz?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "8 fluid ounces equals exactly 1 US customary cup. This is the standard conversion used in most American recipes."
          }
        }
      ]
    }) }}
      />
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-cyan-600 hover:text-cyan-800 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/calculators" className="text-cyan-600 hover:text-cyan-800">
              Calculators
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Oz to Cups Converter</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white mb-4 shadow-lg">
            <Droplets className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Oz to Cups Converter
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Convert fluid ounces to cups and cups to ounces. Supports US fluid ounces, UK fluid ounces, and multiple cup types.
          </p>
        </div>

        {/* Main Converter Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <ArrowRightLeft className="w-5 h-5 mr-2" />
              Volume Converter
            </h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Volume in Ounces */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Volume in ounces
                </label>
              </div>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={ounces}
                  onChange={(e) => {
                    setOunces(e.target.value);
                    setActiveInput('ounces');
                  }}
                  onFocus={() => setActiveInput('ounces')}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all text-lg"
                  placeholder="Enter ounces"
                  min="0"
                  step="any"
                />
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowOunceDropdown(!showOunceDropdown);
                      setShowCupDropdown(false);
                    }}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-cyan-300 transition-all flex items-center gap-2 bg-gray-50 min-w-[140px] justify-between"
                  >
                    <span className="font-medium text-gray-700">{ounceLabels[ounceType]}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                  {showOunceDropdown && (
                    <div className="absolute right-0 top-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-20 min-w-[200px] overflow-hidden">
                      {(Object.keys(ounceToMl) as OunceType[]).map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setOunceType(type);
                            setShowOunceDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-cyan-50 transition-colors flex items-center justify-between ${
                            ounceType === type ? 'bg-cyan-100 text-cyan-700' : 'text-gray-700'
                          }`}
                        >
                          <span>fluid ounces ({type === 'us_fl_oz' ? 'US' : 'UK'})</span>
                          <span className="text-sm text-gray-500">({ounceLabels[type]})</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Equals Sign */}
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                <ArrowRightLeft className="w-5 h-5 text-cyan-600" />
              </div>
            </div>

            {/* Volume in Cups */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Volume in cups
                </label>
              </div>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={cups}
                  onChange={(e) => {
                    setCups(e.target.value);
                    setActiveInput('cups');
                  }}
                  onFocus={() => setActiveInput('cups')}
                  className="flex-1 px-4 py-3 border-2 border-cyan-300 bg-cyan-50 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all text-lg font-semibold text-cyan-700"
                  placeholder="Result in cups"
                  min="0"
                  step="any"
                />
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowCupDropdown(!showCupDropdown);
                      setShowOunceDropdown(false);
                    }}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-cyan-300 transition-all flex items-center gap-2 bg-gray-50 min-w-[180px] justify-between"
                  >
                    <span className="font-medium text-gray-700 text-sm">{cupLabels[cupType]}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                  {showCupDropdown && (
                    <div className="absolute right-0 top-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-20 min-w-[280px] overflow-hidden">
                      {(Object.keys(cupToMl) as CupType[]).map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setCupType(type);
                            setShowCupDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-cyan-50 transition-colors ${
                            cupType === type ? 'bg-cyan-100 text-cyan-700' : 'text-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{cupLabels[type]}</span>
                            <span className="text-sm text-gray-500">({cupDescriptions[type]})</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Result with Fraction */}
            {cups && parseFloat(cups) > 0 && (
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Result</p>
                  <p className="text-2xl font-bold text-cyan-700">
                    {ounces} {ounceLabels[ounceType]} = {formatFraction(parseFloat(cups))} {cupLabels[cupType].toLowerCase()}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Conversion factor: 1 {ounceLabels[ounceType]} = {getConversionFactor().toFixed(6)} cups
                  </p>
                </div>
              </div>
            )}

            {/* Quick Preset Buttons */}
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Quick conversions:</p>
              <div className="flex flex-wrap gap-2">
                {[4, 8, 12, 16, 24, 32].map((oz) => (
                  <button
                    key={oz}
                    onClick={() => {
                      setOunces(oz.toString());
                      setActiveInput('ounces');
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      parseFloat(ounces) === oz
                        ? 'bg-cyan-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-cyan-100 hover:text-cyan-700'
                    }`}
                  >
                    {oz} oz
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Conversion Table Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <button
            onClick={() => setShowConversionTable(!showConversionTable)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-cyan-600" />
              Common Oz to Cups Conversions
            </h3>
            {showConversionTable ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {showConversionTable && (
            <div className="px-6 pb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Fluid Ounces</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">US Customary Cups</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">US Legal Cups</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Metric Cups</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commonConversions.map(({ oz, desc }) => (
                      <tr key={oz} className="border-b border-gray-100 hover:bg-cyan-50 transition-colors">
                        <td className="py-3 px-2">
                          <button
                            onClick={() => {
                              setOunces(oz.toString());
                              setActiveInput('ounces');
                            }}
                            className="text-cyan-600 hover:text-cyan-800 font-medium"
                          >
                            {desc}
                          </button>
                        </td>
                        <td className="py-3 px-2 font-medium text-gray-800">
                          {formatFraction(ouncesToCups(oz, 'us_fl_oz', 'us_customary'))}
                        </td>
                        <td className="py-3 px-2 text-gray-600">
                          {formatFraction(ouncesToCups(oz, 'us_fl_oz', 'us_legal'))}
                        </td>
                        <td className="py-3 px-2 text-gray-600">
                          {formatFraction(ouncesToCups(oz, 'us_fl_oz', 'metric'))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Formula Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <button
            onClick={() => setShowFormula(!showFormula)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Info className="w-5 h-5 mr-2 text-cyan-600" />
              Conversion Formulas
            </h3>
            {showFormula ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {showFormula && (
            <div className="px-6 pb-6 space-y-4">
              <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
                <h4 className="font-semibold text-cyan-800 mb-2">Oz to Cups Formula:</h4>
                <div className="bg-white rounded-lg p-3 font-mono text-center text-lg">
                  cups = fluid ounces ÷ 8
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  For US customary cups. 1 US cup = 8 US fl oz
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Cups to Oz Formula:</h4>
                <div className="bg-white rounded-lg p-3 font-mono text-center text-lg">
                  fluid ounces = cups × 8
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  For US customary cups. 1 US cup = 8 US fl oz
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">Cup Size Reference:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex justify-between">
                    <span>US Customary Cup:</span>
                    <span className="font-medium">236.588 ml (8 US fl oz)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>US Legal Cup (nutrition):</span>
                    <span className="font-medium">240 ml (8.115 US fl oz)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Metric Cup:</span>
                    <span className="font-medium">250 ml (8.454 US fl oz)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>US Fluid Ounce:</span>
                    <span className="font-medium">29.5735 ml</span>
                  </li>
                  <li className="flex justify-between">
                    <span>UK Fluid Ounce:</span>
                    <span className="font-medium">28.4131 ml</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Educational Content */}
        <div className="prose prose-gray max-w-none">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Droplets className="w-6 h-6 mr-2 text-cyan-600" />
              Understanding Oz to Cups Conversion
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">What is the Basic Conversion?</h3>
                <p>
                  The most common conversion is <strong>1 cup = 8 fluid ounces</strong> (US customary). This means:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>To convert oz to cups: divide the number of ounces by 8</li>
                  <li>To convert cups to oz: multiply the number of cups by 8</li>
                </ul>
                <p className="mt-2">
                  For example, 16 oz ÷ 8 = 2 cups, and 3 cups × 8 = 24 oz.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Different Types of Cups</h3>
                <p>
                  Not all cups are created equal! There are three main cup measurements:
                </p>
                <div className="grid sm:grid-cols-3 gap-4 mt-3">
                  <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
                    <h4 className="font-semibold text-cyan-800">US Customary Cup</h4>
                    <p className="text-sm mt-1">236.588 ml</p>
                    <p className="text-sm text-gray-600 mt-1">Used in cooking and baking recipes</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-800">US Legal Cup</h4>
                    <p className="text-sm mt-1">240 ml</p>
                    <p className="text-sm text-gray-600 mt-1">Used on nutrition labels</p>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                    <h4 className="font-semibold text-indigo-800">Metric Cup</h4>
                    <p className="text-sm mt-1">250 ml</p>
                    <p className="text-sm text-gray-600 mt-1">Used in Australia, NZ, Canada</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">US vs UK Fluid Ounces</h3>
                <p>
                  US and UK fluid ounces are slightly different:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>US fluid ounce:</strong> 29.5735 ml</li>
                  <li><strong>UK/Imperial fluid ounce:</strong> 28.4131 ml</li>
                </ul>
                <p className="mt-2">
                  The UK fl oz is about 4% smaller than the US fl oz. This difference matters for precise measurements in baking and scientific applications.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick Reference Guide</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Common Oz to Cups:</h4>
                    <ul className="text-sm space-y-1">
                      <li>4 oz = ½ cup</li>
                      <li>6 oz = ¾ cup</li>
                      <li>8 oz = 1 cup</li>
                      <li>12 oz = 1½ cups</li>
                      <li>16 oz = 2 cups (1 pint)</li>
                      <li>32 oz = 4 cups (1 quart)</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Common Cups to Oz:</h4>
                    <ul className="text-sm space-y-1">
                      <li>¼ cup = 2 oz</li>
                      <li>⅓ cup = 2.67 oz</li>
                      <li>½ cup = 4 oz</li>
                      <li>⅔ cup = 5.33 oz</li>
                      <li>¾ cup = 6 oz</li>
                      <li>1 cup = 8 oz</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">When Does Cup Type Matter?</h3>
                <p>
                  For most home cooking, the difference between cup types is negligible. However, cup type matters when:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>Precise baking:</strong> Especially for delicate pastries and bread</li>
                  <li><strong>Following international recipes:</strong> Australian recipes use metric cups</li>
                  <li><strong>Reading nutrition labels:</strong> US labels use the legal cup (240 ml)</li>
                  <li><strong>Scientific measurements:</strong> Require exact volumes</li>
                </ul>
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
                q: 'How many cups is 8 oz?',
                a: '8 fluid ounces equals exactly 1 US customary cup. This is the standard conversion used in most American recipes.'
              },
              {
                q: 'How many oz in a cup?',
                a: 'A US customary cup contains 8 fluid ounces. A US legal cup (used for nutrition labels) is 8.115 fl oz, and a metric cup is about 8.45 fl oz.'
              },
              {
                q: 'Is 16 oz the same as 2 cups?',
                a: 'Yes, 16 fluid ounces equals 2 US customary cups. This is also equal to 1 US pint.'
              },
              {
                q: 'How many cups is 32 oz?',
                a: '32 fluid ounces equals 4 US customary cups, which is also 1 US quart or ¼ gallon.'
              },
              {
                q: 'What\'s the difference between fluid ounces and ounces?',
                a: 'Fluid ounces measure volume (liquid capacity), while ounces (oz) measure weight/mass. 8 fluid ounces of water weighs about 8.3 ounces by weight.'
              },
              {
                q: 'Are UK and US fluid ounces the same?',
                a: 'No, UK (Imperial) fluid ounces are slightly smaller. 1 US fl oz = 29.57 ml, while 1 UK fl oz = 28.41 ml.'
              },
              {
                q: 'How do I measure oz without a measuring cup?',
                a: 'You can use these approximations: 2 tablespoons = 1 fl oz, a shot glass is typically 1.5 fl oz, and a standard coffee mug is about 8-12 fl oz.'
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
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 sm:p-8 border border-cyan-100 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'ml to Grams Converter', href: '/calculators/ml-to-grams-converter', desc: 'Convert ml to grams for cooking' },
              { name: 'mg to ml Converter', href: '/calculators/mg-to-ml-converter', desc: 'Convert mass to volume' },
              { name: 'Cubic Yards Calculator', href: '/calculators/cubic-yards-calculator', desc: 'Calculate volume in cubic yards' },
              { name: 'Tank Volume Calculator', href: '/calculators/tank-volume-calculator', desc: 'Calculate tank capacity' },
              { name: 'Kg to Lb Converter', href: '/calculators/kg-to-lb-converter', desc: 'Convert weight units' },
              { name: 'Cylinder Volume Calculator', href: '/calculators/cylinder-volume-calculator', desc: 'Calculate cylinder volume' },
            ].map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:border-cyan-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-gray-800 group-hover:text-cyan-600 transition-colors">
                  {calc.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{calc.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 text-cyan-200" />
          <h2 className="text-2xl font-bold mb-3">Need Help with Math or Science?</h2>
          <p className="text-cyan-100 mb-6 max-w-xl mx-auto">
            Our expert tutors can help you understand measurement conversions, unit analysis, and more!
          </p>
          <Link
            href="/tutoring/free-consultation"
            className="inline-flex items-center px-6 py-3 bg-white text-cyan-600 rounded-xl font-semibold hover:bg-cyan-50 transition-colors shadow-lg"
          >
            Book Your Free Session
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </main>

      <Footer />

      {/* Click outside to close dropdowns */}
      {(showOunceDropdown || showCupDropdown) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setShowOunceDropdown(false);
            setShowCupDropdown(false);
          }}
        />
      )}

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Oz to Cups Converter',
            description: 'Free oz to cups converter. Convert fluid ounces to cups and cups to oz instantly with support for US/UK ounces and multiple cup types.',
            url: 'https://www.thetutorbridge.com/calculators/oz-to-cups-converter',
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
