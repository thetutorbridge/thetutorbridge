'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, Droplets, BookOpen, ArrowRight, Info, RefreshCw, Scale, ArrowLeftRight, Beaker } from 'lucide-react';
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

type ConversionMode = 'mg-to-ml' | 'ml-to-mg';

interface SubstancePreset {
  name: string;
  density: number; // mg/ml
  category: string;
}

// Common substances with their densities in mg/ml
const substancePresets: SubstancePreset[] = [
  // Water-based
  { name: 'Water', density: 1000, category: 'Water & Liquids' },
  { name: 'Milk (whole)', density: 1030, category: 'Water & Liquids' },
  { name: 'Milk (skim)', density: 1035, category: 'Water & Liquids' },
  { name: 'Sea Water', density: 1025, category: 'Water & Liquids' },

  // Oils
  { name: 'Olive Oil', density: 916, category: 'Oils' },
  { name: 'Vegetable Oil', density: 920, category: 'Oils' },
  { name: 'Coconut Oil', density: 925, category: 'Oils' },
  { name: 'Sunflower Oil', density: 918, category: 'Oils' },
  { name: 'Castor Oil', density: 961, category: 'Oils' },

  // Alcohols
  { name: 'Ethanol (pure)', density: 789, category: 'Alcohols' },
  { name: 'Isopropyl Alcohol', density: 786, category: 'Alcohols' },
  { name: 'Methanol', density: 792, category: 'Alcohols' },

  // Honey & Syrups
  { name: 'Honey', density: 1420, category: 'Syrups' },
  { name: 'Maple Syrup', density: 1370, category: 'Syrups' },
  { name: 'Corn Syrup', density: 1380, category: 'Syrups' },
  { name: 'Glycerin', density: 1261, category: 'Syrups' },

  // Medical/Pharmaceutical
  { name: 'Saline Solution (0.9%)', density: 1005, category: 'Medical' },
  { name: 'Hydrogen Peroxide (3%)', density: 1010, category: 'Medical' },

  // Household
  { name: 'Vinegar', density: 1005, category: 'Household' },
  { name: 'Dish Soap', density: 1030, category: 'Household' },

  // Custom
  { name: 'Custom Density', density: 1000, category: 'Custom' },
];

export default function MgToMlConverter() {
  const [mode, setMode] = useState<ConversionMode>('mg-to-ml');
  const [inputValue, setInputValue] = useState<string>('');
  const [density, setDensity] = useState<string>('1000');
  const [selectedSubstance, setSelectedSubstance] = useState<string>('Water');
  const [result, setResult] = useState<number | null>(null);

  // Auto-calculate when inputs change
  useEffect(() => {
    const value = parseFloat(inputValue);
    const densityValue = parseFloat(density);

    if (isNaN(value) || isNaN(densityValue) || value < 0 || densityValue <= 0) {
      setResult(null);
      return;
    }

    if (mode === 'mg-to-ml') {
      // Volume (ml) = Mass (mg) / Density (mg/ml)
      setResult(value / densityValue);
    } else {
      // Mass (mg) = Volume (ml) × Density (mg/ml)
      setResult(value * densityValue);
    }
  }, [inputValue, density, mode]);

  // Handle substance selection
  const handleSubstanceChange = (substanceName: string) => {
    setSelectedSubstance(substanceName);
    const substance = substancePresets.find(s => s.name === substanceName);
    if (substance && substanceName !== 'Custom Density') {
      setDensity(substance.density.toString());
    }
  };

  const handleClear = () => {
    setInputValue('');
    setResult(null);
  };

  const swapMode = () => {
    setMode(mode === 'mg-to-ml' ? 'ml-to-mg' : 'mg-to-ml');
    setInputValue('');
    setResult(null);
  };

  const formatResult = (value: number): string => {
    if (value < 0.0001) {
      return value.toExponential(4);
    } else if (value < 1) {
      return value.toFixed(6).replace(/\.?0+$/, '');
    } else if (value < 1000) {
      return value.toFixed(4).replace(/\.?0+$/, '');
    } else {
      return value.toLocaleString('en-US', { maximumFractionDigits: 2 });
    }
  };

  // Group substances by category
  const groupedSubstances = substancePresets.reduce((acc, substance) => {
    if (!acc[substance.category]) {
      acc[substance.category] = [];
    }
    acc[substance.category].push(substance);
    return acc;
  }, {} as Record<string, SubstancePreset[]>);

  // JSON-LD Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "mg to ml Converter",
    "description": "Free mg to ml converter to convert milligrams to milliliters. Enter weight in mg and substance density to calculate volume in ml. Works for water, oils, medications, and more.",
    "url": "https://www.thetutorbridge.com/calculators/mg-to-ml-converter",
    "applicationCategory": "CalculatorApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "provider": {
      "@type": "Organization",
      "name": "The Tutor Bridge",
      "url": "https://www.thetutorbridge.com"
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I convert mg to ml?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To convert mg to ml, divide the mass in milligrams by the density of the substance in mg/ml. Formula: Volume (ml) = Mass (mg) ÷ Density (mg/ml). For water (density = 1000 mg/ml), 100 mg = 0.1 ml."
        }
      },
      {
        "@type": "Question",
        "name": "Is 1 mg equal to 1 ml?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, mg and ml measure different things. Milligrams (mg) measure mass/weight, while milliliters (ml) measure volume. They're only equal for water at standard conditions where 1 ml of water weighs 1000 mg (1 gram). For other substances, the conversion depends on density."
        }
      },
      {
        "@type": "Question",
        "name": "What is density and why does it matter for mg to ml conversion?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Density is the mass per unit volume of a substance (mg/ml or g/ml). It's essential for converting between mass (mg) and volume (ml) because different substances have different densities. Water has a density of 1000 mg/ml, while oil is about 920 mg/ml, meaning the same mass of oil takes up more volume than water."
        }
      },
      {
        "@type": "Question",
        "name": "How many ml is 500 mg?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends on the substance. For water (density 1000 mg/ml): 500 mg = 0.5 ml. For olive oil (density 916 mg/ml): 500 mg ≈ 0.546 ml. For honey (density 1420 mg/ml): 500 mg ≈ 0.352 ml."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-indigo-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-indigo-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">mg to ml Converter</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Droplets className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              mg to ml Converter
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Convert milligrams (mg) to milliliters (ml) and vice versa. Enter the mass, select your substance or enter density, and get instant results.
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Input Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Scale className="w-6 h-6 text-indigo-600" />
                  Convert Units
                </h2>

                {/* Mode Toggle */}
                <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                  <div className="text-center flex-1">
                    <p className={`font-bold ${mode === 'mg-to-ml' ? 'text-indigo-600' : 'text-gray-400'}`}>
                      mg
                    </p>
                    <p className={`text-xs ${mode === 'mg-to-ml' ? 'text-indigo-500' : 'text-gray-400'}`}>
                      Milligrams
                    </p>
                  </div>
                  <button
                    onClick={swapMode}
                    className="mx-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
                    title="Swap conversion direction"
                  >
                    <ArrowLeftRight className="w-5 h-5 text-indigo-600" />
                  </button>
                  <div className="text-center flex-1">
                    <p className={`font-bold ${mode === 'ml-to-mg' ? 'text-indigo-600' : 'text-gray-400'}`}>
                      ml
                    </p>
                    <p className={`text-xs ${mode === 'ml-to-mg' ? 'text-indigo-500' : 'text-gray-400'}`}>
                      Milliliters
                    </p>
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-5">
                  {/* Value Input */}
                  <div>
                    <Label htmlFor="inputValue" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      {mode === 'mg-to-ml' ? (
                        <>
                          <Scale className="w-4 h-4 text-gray-500" />
                          Mass (mg)
                        </>
                      ) : (
                        <>
                          <Droplets className="w-4 h-4 text-gray-500" />
                          Volume (ml)
                        </>
                      )}
                    </Label>
                    <div className="relative">
                      <Input
                        id="inputValue"
                        type="number"
                        placeholder={mode === 'mg-to-ml' ? 'Enter milligrams' : 'Enter milliliters'}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="text-lg pr-14"
                        step="any"
                        min="0"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                        {mode === 'mg-to-ml' ? 'mg' : 'ml'}
                      </span>
                    </div>
                  </div>

                  {/* Substance Selector */}
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Beaker className="w-4 h-4 text-gray-500" />
                      Substance
                    </Label>
                    <Select value={selectedSubstance} onValueChange={handleSubstanceChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select substance" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(groupedSubstances).map(([category, substances]) => (
                          <div key={category}>
                            <div className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-50">
                              {category}
                            </div>
                            {substances.map((substance) => (
                              <SelectItem key={substance.name} value={substance.name}>
                                {substance.name} ({substance.density} mg/ml)
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Density Input */}
                  <div>
                    <Label htmlFor="density" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      Density (mg/ml)
                      <Info className="w-3 h-3 text-gray-400" />
                    </Label>
                    <div className="relative">
                      <Input
                        id="density"
                        type="number"
                        placeholder="Enter density"
                        value={density}
                        onChange={(e) => {
                          setDensity(e.target.value);
                          setSelectedSubstance('Custom Density');
                        }}
                        className="text-lg pr-20"
                        step="any"
                        min="0"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                        mg/ml
                      </span>
                    </div>
                  </div>
                </div>

                {/* Clear Button */}
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="w-full mt-6 py-5 text-base font-semibold rounded-xl border-2 hover:bg-gray-50"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear
                </Button>

                {/* Quick Info */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Formula:</strong><br />
                    {mode === 'mg-to-ml'
                      ? 'Volume (ml) = Mass (mg) ÷ Density (mg/ml)'
                      : 'Mass (mg) = Volume (ml) × Density (mg/ml)'}
                  </p>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3">
              {result !== null && (
                <div className="space-y-6">
                  {/* Main Result Card */}
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      {mode === 'mg-to-ml' ? (
                        <>
                          <Droplets className="w-5 h-5" />
                          Volume Result
                        </>
                      ) : (
                        <>
                          <Scale className="w-5 h-5" />
                          Mass Result
                        </>
                      )}
                    </h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <div className="text-center">
                        <p className="text-4xl md:text-5xl font-bold">
                          {formatResult(result)}
                        </p>
                        <p className="text-xl text-indigo-200 mt-2">
                          {mode === 'mg-to-ml' ? 'milliliters (ml)' : 'milligrams (mg)'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Conversion Summary */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Conversion Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Input Value</span>
                        <span className="font-semibold text-gray-900">
                          {inputValue} {mode === 'mg-to-ml' ? 'mg' : 'ml'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Substance</span>
                        <span className="font-semibold text-gray-900">{selectedSubstance}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Density</span>
                        <span className="font-semibold text-gray-900">{density} mg/ml</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-600">Result</span>
                        <span className="font-bold text-indigo-600 text-lg">
                          {formatResult(result)} {mode === 'mg-to-ml' ? 'ml' : 'mg'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Step-by-Step Calculation */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Step-by-Step Calculation</h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                        <div>
                          <p className="font-medium text-gray-900">Given Values</p>
                          <p className="text-gray-600">
                            {mode === 'mg-to-ml'
                              ? `Mass = ${inputValue} mg, Density = ${density} mg/ml`
                              : `Volume = ${inputValue} ml, Density = ${density} mg/ml`}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                        <div>
                          <p className="font-medium text-gray-900">Apply Formula</p>
                          <p className="text-gray-600 font-mono">
                            {mode === 'mg-to-ml'
                              ? `Volume = Mass ÷ Density`
                              : `Mass = Volume × Density`}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                        <div>
                          <p className="font-medium text-gray-900">Calculate</p>
                          <p className="text-gray-600 font-mono">
                            {mode === 'mg-to-ml'
                              ? `${inputValue} ÷ ${density} = ${formatResult(result)} ml`
                              : `${inputValue} × ${density} = ${formatResult(result)} mg`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Same Value in Different Substances */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {mode === 'mg-to-ml' ? 'Same Mass' : 'Same Volume'} in Different Substances
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-2 font-semibold text-gray-700">Substance</th>
                            <th className="text-left py-3 px-2 font-semibold text-gray-700">Density</th>
                            <th className="text-left py-3 px-2 font-semibold text-gray-700">Result</th>
                          </tr>
                        </thead>
                        <tbody>
                          {substancePresets.slice(0, 8).map((substance) => {
                            const value = parseFloat(inputValue);
                            let calcResult: number;
                            if (mode === 'mg-to-ml') {
                              calcResult = value / substance.density;
                            } else {
                              calcResult = value * substance.density;
                            }
                            return (
                              <tr key={substance.name} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-2 px-2">{substance.name}</td>
                                <td className="py-2 px-2">{substance.density} mg/ml</td>
                                <td className="py-2 px-2 font-medium text-indigo-600">
                                  {formatResult(calcResult)} {mode === 'mg-to-ml' ? 'ml' : 'mg'}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {result === null && (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Droplets className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    Enter a value to convert
                  </p>
                  <p className="text-gray-400 text-sm">
                    Results will appear automatically
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* What is mg to ml Conversion */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Understanding mg to ml Conversion
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Converting milligrams (mg) to milliliters (ml) involves converting a unit of <strong>mass</strong> (mg) to a unit of <strong>volume</strong> (ml). Unlike converting between the same type of measurement (like meters to kilometers), this conversion requires knowing the <strong>density</strong> of the substance.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                <strong>Milligrams (mg)</strong> measure how much something weighs, while <strong>milliliters (ml)</strong> measure how much space something takes up. The relationship between them depends entirely on what substance you're measuring.
              </p>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Key Concept: Density</h3>
                <p className="text-gray-700 mb-4">
                  <strong>Density</strong> is the mass per unit volume of a substance, typically expressed as mg/ml or g/ml. It tells you how much a certain volume of a substance weighs.
                </p>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-xl font-mono font-bold text-indigo-600">
                    Density = Mass ÷ Volume
                  </p>
                </div>
              </div>
            </section>

            {/* Conversion Formulas */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                mg to ml Conversion Formulas
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">mg to ml</h3>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center mb-4">
                    <p className="text-2xl font-bold font-mono">
                      ml = mg ÷ density
                    </p>
                  </div>
                  <p className="text-indigo-100 text-sm">
                    Divide the mass in milligrams by the density in mg/ml to get the volume in milliliters.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">ml to mg</h3>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center mb-4">
                    <p className="text-2xl font-bold font-mono">
                      mg = ml × density
                    </p>
                  </div>
                  <p className="text-purple-100 text-sm">
                    Multiply the volume in milliliters by the density in mg/ml to get the mass in milligrams.
                  </p>
                </div>
              </div>
            </section>

            {/* Common Substance Densities */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Substance Densities
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                      <th className="px-6 py-4 text-left font-bold">Substance</th>
                      <th className="px-6 py-4 text-left font-bold">Density (mg/ml)</th>
                      <th className="px-6 py-4 text-left font-bold">Density (g/ml)</th>
                      <th className="px-6 py-4 text-left font-bold">100 mg = ? ml</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Water</td>
                      <td className="px-6 py-4">1,000</td>
                      <td className="px-6 py-4">1.00</td>
                      <td className="px-6 py-4 text-indigo-600 font-semibold">0.1 ml</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Whole Milk</td>
                      <td className="px-6 py-4">1,030</td>
                      <td className="px-6 py-4">1.03</td>
                      <td className="px-6 py-4 text-indigo-600 font-semibold">0.097 ml</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Olive Oil</td>
                      <td className="px-6 py-4">916</td>
                      <td className="px-6 py-4">0.916</td>
                      <td className="px-6 py-4 text-indigo-600 font-semibold">0.109 ml</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Honey</td>
                      <td className="px-6 py-4">1,420</td>
                      <td className="px-6 py-4">1.42</td>
                      <td className="px-6 py-4 text-indigo-600 font-semibold">0.070 ml</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Ethanol</td>
                      <td className="px-6 py-4">789</td>
                      <td className="px-6 py-4">0.789</td>
                      <td className="px-6 py-4 text-indigo-600 font-semibold">0.127 ml</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Glycerin</td>
                      <td className="px-6 py-4">1,261</td>
                      <td className="px-6 py-4">1.261</td>
                      <td className="px-6 py-4 text-indigo-600 font-semibold">0.079 ml</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Maple Syrup</td>
                      <td className="px-6 py-4">1,370</td>
                      <td className="px-6 py-4">1.37</td>
                      <td className="px-6 py-4 text-indigo-600 font-semibold">0.073 ml</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Examples */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Step-by-Step Examples
              </h2>
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Example 1: Converting 500 mg of Water to ml</h3>
                  <div className="space-y-3">
                    <p><strong>Given:</strong> Mass = 500 mg, Density of water = 1000 mg/ml</p>
                    <p><strong>Formula:</strong> Volume = Mass ÷ Density</p>
                    <p><strong>Calculation:</strong> Volume = 500 ÷ 1000 = <span className="text-indigo-600 font-bold">0.5 ml</span></p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Example 2: Converting 250 mg of Olive Oil to ml</h3>
                  <div className="space-y-3">
                    <p><strong>Given:</strong> Mass = 250 mg, Density of olive oil = 916 mg/ml</p>
                    <p><strong>Formula:</strong> Volume = Mass ÷ Density</p>
                    <p><strong>Calculation:</strong> Volume = 250 ÷ 916 = <span className="text-purple-600 font-bold">0.273 ml</span></p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Example 3: Converting 2 ml of Honey to mg</h3>
                  <div className="space-y-3">
                    <p><strong>Given:</strong> Volume = 2 ml, Density of honey = 1420 mg/ml</p>
                    <p><strong>Formula:</strong> Mass = Volume × Density</p>
                    <p><strong>Calculation:</strong> Mass = 2 × 1420 = <span className="text-green-600 font-bold">2,840 mg</span></p>
                  </div>
                </div>
              </div>
            </section>

            {/* Why Density Matters */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Why Density Matters in mg to ml Conversion
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl p-6 mb-6">
                <h4 className="font-bold text-gray-900 mb-2">Important!</h4>
                <p className="text-gray-700">
                  You <strong>cannot</strong> directly convert mg to ml without knowing the density. These units measure different things—mass vs. volume. The density bridges the gap between them.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-indigo-600 mb-3">Same Mass, Different Volumes</h3>
                  <p className="text-gray-700 text-sm">
                    100 mg of water = 0.1 ml<br />
                    100 mg of honey = 0.07 ml<br />
                    100 mg of oil = 0.109 ml<br /><br />
                    Denser substances take up less space for the same mass.
                  </p>
                </div>
                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">Same Volume, Different Masses</h3>
                  <p className="text-gray-700 text-sm">
                    1 ml of water = 1000 mg<br />
                    1 ml of honey = 1420 mg<br />
                    1 ml of oil = 916 mg<br /><br />
                    Denser substances weigh more for the same volume.
                  </p>
                </div>
              </div>
            </section>

            {/* Common Use Cases */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Uses for mg to ml Conversion
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-blue-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-blue-600 mb-3">💊 Medications & Pharmaceuticals</h3>
                  <p className="text-gray-700 text-sm">
                    Converting drug dosages between mass and volume for liquid medications, syrups, and injectable solutions.
                  </p>
                </div>
                <div className="bg-white border-2 border-green-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-green-600 mb-3">🍳 Cooking & Baking</h3>
                  <p className="text-gray-700 text-sm">
                    Converting recipe measurements between weight and volume for ingredients like oils, honey, and milk.
                  </p>
                </div>
                <div className="bg-white border-2 border-purple-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">🔬 Laboratory Work</h3>
                  <p className="text-gray-700 text-sm">
                    Preparing solutions, reagents, and samples that require precise mass-to-volume calculations.
                  </p>
                </div>
                <div className="bg-white border-2 border-orange-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">✨ Cosmetics & Skincare</h3>
                  <p className="text-gray-700 text-sm">
                    Formulating skincare products, essential oil blends, and cosmetic preparations with precise measurements.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do I convert mg to ml?
                  </h3>
                  <p className="text-gray-700">
                    Divide the mass in milligrams by the density of the substance in mg/ml. Formula: <strong>ml = mg ÷ density</strong>. For example, 100 mg of water (density 1000 mg/ml) = 100 ÷ 1000 = 0.1 ml.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Is 1 mg equal to 1 ml?
                  </h3>
                  <p className="text-gray-700">
                    No. Milligrams measure mass (weight), while milliliters measure volume (space). They cannot be directly equated. For water, 1 ml = 1000 mg. For other substances, the conversion depends on their density.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How many ml is 500 mg?
                  </h3>
                  <p className="text-gray-700">
                    It depends on the substance. For water: 500 mg = 0.5 ml. For olive oil: 500 mg ≈ 0.546 ml. For honey: 500 mg ≈ 0.352 ml. Always use the correct density for your substance.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is the density of water in mg/ml?
                  </h3>
                  <p className="text-gray-700">
                    The density of pure water at room temperature (25°C) is approximately <strong>1000 mg/ml</strong> or <strong>1 g/ml</strong>. This makes water a convenient reference point for conversions.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why can't I convert mg to ml without knowing the substance?
                  </h3>
                  <p className="text-gray-700">
                    Because mg measures mass and ml measures volume—two fundamentally different properties. The same mass of different substances occupies different volumes. Density is the bridge that connects mass and volume.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do I find the density of a substance?
                  </h3>
                  <p className="text-gray-700">
                    You can look up standard densities in reference tables, check product labels (especially for food and chemicals), or calculate it by measuring the mass and volume yourself (density = mass ÷ volume).
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Does temperature affect mg to ml conversion?
                  </h3>
                  <p className="text-gray-700">
                    Yes. Density changes with temperature—liquids generally expand when heated and contract when cooled. For most everyday conversions, room temperature densities are accurate enough, but scientific applications may require temperature-specific values.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What's the difference between g/ml and mg/ml?
                  </h3>
                  <p className="text-gray-700">
                    They measure the same thing (density) but in different units. 1 g/ml = 1000 mg/ml. Water has a density of 1 g/ml or 1000 mg/ml. Use whichever unit matches your input values.
                  </p>
                </div>
              </div>
            </section>

            {/* Related Calculators */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Related Calculators
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/calculators/percentage-calculator" className="block bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-indigo-300 hover:shadow-lg transition-all">
                  <h3 className="font-bold text-indigo-600 mb-1">Percentage Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate percentages easily</p>
                </Link>
                <Link href="/calculators/bmi-calculator" className="block bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-indigo-300 hover:shadow-lg transition-all">
                  <h3 className="font-bold text-indigo-600 mb-1">BMI Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate Body Mass Index</p>
                </Link>
                <Link href="/calculators/decimal-to-fraction-calculator" className="block bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-indigo-300 hover:shadow-lg transition-all">
                  <h3 className="font-bold text-indigo-600 mb-1">Decimal to Fraction</h3>
                  <p className="text-sm text-gray-600">Convert decimals to fractions</p>
                </Link>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Conclusion
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Converting between milligrams and milliliters requires understanding that these units measure different properties—mass and volume. The key to accurate conversion is knowing the <strong>density</strong> of the substance you're working with.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our mg to ml converter makes these calculations instant and accurate. Simply enter your value, select your substance (or enter a custom density), and get immediate results with step-by-step explanations. Perfect for cooking, medicine, laboratory work, and more!
              </p>
            </section>

          </div>
        </div>
      </div>

      {/* Book Your Session CTA */}
      <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Need Help with Chemistry or Science?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you understand density, unit conversions, and chemistry concepts. Get personalized one-on-one guidance tailored to your learning style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-demo-class">
                <Button className="bg-[#FFC857] hover:bg-[#FFC857]/90 text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                  Book Free Demo Class
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl transition-all duration-200">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
