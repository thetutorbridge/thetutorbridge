'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, Circle, BookOpen, ArrowRight, Info, RefreshCw } from 'lucide-react';
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

type InputType = 'radius' | 'diameter' | 'circumference' | 'area';
type Unit = 'mm' | 'cm' | 'm' | 'km' | 'in' | 'ft' | 'yd' | 'mi';

interface CalculationResult {
  radius: number;
  diameter: number;
  circumference: number;
  area: number;
  inputType: InputType;
  inputValue: number;
  unit: Unit;
}

const unitLabels: Record<Unit, string> = {
  mm: 'Millimeters (mm)',
  cm: 'Centimeters (cm)',
  m: 'Meters (m)',
  km: 'Kilometers (km)',
  in: 'Inches (in)',
  ft: 'Feet (ft)',
  yd: 'Yards (yd)',
  mi: 'Miles (mi)',
};

const unitShort: Record<Unit, string> = {
  mm: 'mm',
  cm: 'cm',
  m: 'm',
  km: 'km',
  in: 'in',
  ft: 'ft',
  yd: 'yd',
  mi: 'mi',
};

export default function CircumferenceCalculator() {
  const [radius, setRadius] = useState<string>('');
  const [diameter, setDiameter] = useState<string>('');
  const [circumference, setCircumference] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [unit, setUnit] = useState<Unit>('cm');
  const [lastChanged, setLastChanged] = useState<InputType | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const PI = Math.PI;

  // Auto-calculate when any input changes
  useEffect(() => {
    if (!lastChanged) return;

    let r: number | null = null;

    switch (lastChanged) {
      case 'radius':
        r = parseFloat(radius);
        break;
      case 'diameter':
        const d = parseFloat(diameter);
        if (!isNaN(d) && d > 0) r = d / 2;
        break;
      case 'circumference':
        const c = parseFloat(circumference);
        if (!isNaN(c) && c > 0) r = c / (2 * PI);
        break;
      case 'area':
        const a = parseFloat(area);
        if (!isNaN(a) && a > 0) r = Math.sqrt(a / PI);
        break;
    }

    if (r !== null && !isNaN(r) && r > 0) {
      const newDiameter = r * 2;
      const newCircumference = 2 * PI * r;
      const newArea = PI * r * r;

      // Update all fields except the one being changed
      if (lastChanged !== 'radius') setRadius(r.toFixed(6).replace(/\.?0+$/, ''));
      if (lastChanged !== 'diameter') setDiameter(newDiameter.toFixed(6).replace(/\.?0+$/, ''));
      if (lastChanged !== 'circumference') setCircumference(newCircumference.toFixed(6).replace(/\.?0+$/, ''));
      if (lastChanged !== 'area') setArea(newArea.toFixed(6).replace(/\.?0+$/, ''));

      setResult({
        radius: r,
        diameter: newDiameter,
        circumference: newCircumference,
        area: newArea,
        inputType: lastChanged,
        inputValue: parseFloat(
          lastChanged === 'radius' ? radius :
          lastChanged === 'diameter' ? diameter :
          lastChanged === 'circumference' ? circumference : area
        ),
        unit,
      });
    } else {
      setResult(null);
    }
  }, [radius, diameter, circumference, area, lastChanged, unit]);

  const handleInputChange = (type: InputType, value: string) => {
    setLastChanged(type);
    switch (type) {
      case 'radius':
        setRadius(value);
        break;
      case 'diameter':
        setDiameter(value);
        break;
      case 'circumference':
        setCircumference(value);
        break;
      case 'area':
        setArea(value);
        break;
    }
  };

  const handleClear = () => {
    setRadius('');
    setDiameter('');
    setCircumference('');
    setArea('');
    setLastChanged(null);
    setResult(null);
  };

  const formatNumber = (num: number, decimals: number = 6): string => {
    return num.toFixed(decimals).replace(/\.?0+$/, '');
  };

  // JSON-LD Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Circumference Calculator",
    "description": "Free online circumference calculator to find circle circumference, radius, diameter, and area. Enter any value to calculate all circle properties instantly.",
    "url": "https://www.thetutorbridge.com/calculators/circumference-calculator",
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
        "name": "What is the formula for circumference of a circle?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The circumference of a circle can be calculated using two formulas: C = 2πr (where r is the radius) or C = πd (where d is the diameter). Both formulas give the same result since diameter equals 2 times the radius."
        }
      },
      {
        "@type": "Question",
        "name": "How do you find circumference from diameter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To find circumference from diameter, simply multiply the diameter by π (pi, approximately 3.14159). The formula is C = πd. For example, if the diameter is 10 cm, the circumference is 10 × π = 31.4159 cm."
        }
      },
      {
        "@type": "Question",
        "name": "What is the relationship between circumference and radius?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The circumference is directly proportional to the radius. The formula C = 2πr shows that circumference equals 2π (approximately 6.283) times the radius. If you double the radius, the circumference also doubles."
        }
      },
      {
        "@type": "Question",
        "name": "How do you find the radius from circumference?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To find the radius from circumference, divide the circumference by 2π. The formula is r = C/(2π). For example, if the circumference is 31.4159 cm, the radius is 31.4159 ÷ (2 × 3.14159) = 5 cm."
        }
      },
      {
        "@type": "Question",
        "name": "What is the value of π (pi)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pi (π) is a mathematical constant approximately equal to 3.14159265359. It represents the ratio of a circle's circumference to its diameter and is the same for all circles regardless of size. It's an irrational number with infinite non-repeating decimal places."
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
            <span className="text-gray-900 font-medium">Circumference Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Circle className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Circumference Calculator
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Calculate circle circumference, radius, diameter, and area instantly. Enter any value and get all circle properties with formulas: <strong>C = 2πr</strong> and <strong>A = πr²</strong>
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
                  <Circle className="w-6 h-6 text-indigo-600" />
                  Circle Properties
                </h2>

                {/* Circle Diagram */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 mb-6">
                  <svg viewBox="0 0 200 200" className="w-full max-w-[200px] mx-auto">
                    {/* Circle */}
                    <circle cx="100" cy="100" r="70" fill="none" stroke="#6366f1" strokeWidth="3" />
                    {/* Radius line */}
                    <line x1="100" y1="100" x2="170" y2="100" stroke="#1A3D7C" strokeWidth="2" />
                    {/* Center dot */}
                    <circle cx="100" cy="100" r="4" fill="#1A3D7C" />
                    {/* Radius label */}
                    <text x="135" y="95" fontSize="14" fill="#1A3D7C" fontWeight="bold">r</text>
                    {/* Circumference label */}
                    <text x="100" y="25" fontSize="12" fill="#6366f1" fontWeight="bold" textAnchor="middle">C = 2πr</text>
                  </svg>
                  <div className="text-center mt-2 space-y-1">
                    <p className="text-sm text-gray-600"><strong>Circumference:</strong> C = 2πr = πd</p>
                    <p className="text-sm text-gray-600"><strong>Area:</strong> A = πr²</p>
                  </div>
                </div>

                {/* Unit Selector */}
                <div className="mb-6">
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block">Unit</Label>
                  <Select value={unit} onValueChange={(value: Unit) => setUnit(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm">Millimeters (mm)</SelectItem>
                      <SelectItem value="cm">Centimeters (cm)</SelectItem>
                      <SelectItem value="m">Meters (m)</SelectItem>
                      <SelectItem value="km">Kilometers (km)</SelectItem>
                      <SelectItem value="in">Inches (in)</SelectItem>
                      <SelectItem value="ft">Feet (ft)</SelectItem>
                      <SelectItem value="yd">Yards (yd)</SelectItem>
                      <SelectItem value="mi">Miles (mi)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                  {/* Radius */}
                  <div>
                    <Label htmlFor="radius" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      Radius (r)
                      <span className="text-xs text-gray-500 font-normal">half of diameter</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="radius"
                        type="number"
                        placeholder="Enter radius"
                        value={radius}
                        onChange={(e) => handleInputChange('radius', e.target.value)}
                        className="pr-12 text-lg"
                        step="any"
                        min="0"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                        {unitShort[unit]}
                      </span>
                    </div>
                  </div>

                  {/* Diameter */}
                  <div>
                    <Label htmlFor="diameter" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      Diameter (d)
                      <span className="text-xs text-gray-500 font-normal">d = 2r</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="diameter"
                        type="number"
                        placeholder="Enter diameter"
                        value={diameter}
                        onChange={(e) => handleInputChange('diameter', e.target.value)}
                        className="pr-12 text-lg"
                        step="any"
                        min="0"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                        {unitShort[unit]}
                      </span>
                    </div>
                  </div>

                  {/* Circumference */}
                  <div>
                    <Label htmlFor="circumference" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      Circumference (C)
                      <Info className="w-4 h-4 text-gray-400" />
                    </Label>
                    <div className="relative">
                      <Input
                        id="circumference"
                        type="number"
                        placeholder="Enter circumference"
                        value={circumference}
                        onChange={(e) => handleInputChange('circumference', e.target.value)}
                        className="pr-12 text-lg"
                        step="any"
                        min="0"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                        {unitShort[unit]}
                      </span>
                    </div>
                  </div>

                  {/* Area */}
                  <div>
                    <Label htmlFor="area" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      Area (A)
                      <span className="text-xs text-gray-500 font-normal">A = πr²</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="area"
                        type="number"
                        placeholder="Enter area"
                        value={area}
                        onChange={(e) => handleInputChange('area', e.target.value)}
                        className="pr-16 text-lg"
                        step="any"
                        min="0"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                        {unitShort[unit]}²
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
                  Clear All
                </Button>

                {/* Info Box */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Tip:</strong> Enter any one value to automatically calculate all other circle properties!
                  </p>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3">
              {result ? (
                <div className="space-y-6">
                  {/* Main Results Card */}
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-6">Circle Properties</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-indigo-200 text-sm mb-1">Radius (r)</p>
                        <p className="text-2xl md:text-3xl font-bold">
                          {formatNumber(result.radius)} <span className="text-lg">{unitShort[unit]}</span>
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-indigo-200 text-sm mb-1">Diameter (d)</p>
                        <p className="text-2xl md:text-3xl font-bold">
                          {formatNumber(result.diameter)} <span className="text-lg">{unitShort[unit]}</span>
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-indigo-200 text-sm mb-1">Circumference (C)</p>
                        <p className="text-2xl md:text-3xl font-bold">
                          {formatNumber(result.circumference)} <span className="text-lg">{unitShort[unit]}</span>
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-indigo-200 text-sm mb-1">Area (A)</p>
                        <p className="text-2xl md:text-3xl font-bold">
                          {formatNumber(result.area)} <span className="text-lg">{unitShort[unit]}²</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Formulas Used Card */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Formulas Used</h3>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600 mb-2">Circumference Formula</p>
                        <div className="flex items-center justify-center gap-4 text-xl md:text-2xl font-bold text-gray-800">
                          <span>C = 2πr</span>
                          <span className="text-gray-400">or</span>
                          <span>C = πd</span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600 mb-2">Area Formula</p>
                        <div className="text-xl md:text-2xl font-bold text-gray-800 text-center">
                          A = πr²
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600 mb-2">Value of π (Pi)</p>
                        <div className="text-lg font-bold text-gray-800 text-center">
                          π ≈ 3.14159265359...
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step-by-Step Calculation */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Step-by-Step Calculation</h3>
                    <div className="space-y-4">
                      {result.inputType === 'radius' && (
                        <>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                            <div>
                              <p className="font-medium text-gray-900">Given: Radius (r) = {formatNumber(result.radius)} {unitShort[unit]}</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                            <div>
                              <p className="font-medium text-gray-900">Calculate Diameter: d = 2r</p>
                              <p className="text-gray-600">d = 2 × {formatNumber(result.radius)} = <strong>{formatNumber(result.diameter)} {unitShort[unit]}</strong></p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                            <div>
                              <p className="font-medium text-gray-900">Calculate Circumference: C = 2πr</p>
                              <p className="text-gray-600">C = 2 × π × {formatNumber(result.radius)} = <strong>{formatNumber(result.circumference)} {unitShort[unit]}</strong></p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                            <div>
                              <p className="font-medium text-gray-900">Calculate Area: A = πr²</p>
                              <p className="text-gray-600">A = π × {formatNumber(result.radius)}² = <strong>{formatNumber(result.area)} {unitShort[unit]}²</strong></p>
                            </div>
                          </div>
                        </>
                      )}
                      {result.inputType === 'diameter' && (
                        <>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                            <div>
                              <p className="font-medium text-gray-900">Given: Diameter (d) = {formatNumber(result.diameter)} {unitShort[unit]}</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                            <div>
                              <p className="font-medium text-gray-900">Calculate Radius: r = d/2</p>
                              <p className="text-gray-600">r = {formatNumber(result.diameter)} ÷ 2 = <strong>{formatNumber(result.radius)} {unitShort[unit]}</strong></p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                            <div>
                              <p className="font-medium text-gray-900">Calculate Circumference: C = πd</p>
                              <p className="text-gray-600">C = π × {formatNumber(result.diameter)} = <strong>{formatNumber(result.circumference)} {unitShort[unit]}</strong></p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                            <div>
                              <p className="font-medium text-gray-900">Calculate Area: A = πr²</p>
                              <p className="text-gray-600">A = π × {formatNumber(result.radius)}² = <strong>{formatNumber(result.area)} {unitShort[unit]}²</strong></p>
                            </div>
                          </div>
                        </>
                      )}
                      {result.inputType === 'circumference' && (
                        <>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                            <div>
                              <p className="font-medium text-gray-900">Given: Circumference (C) = {formatNumber(result.circumference)} {unitShort[unit]}</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                            <div>
                              <p className="font-medium text-gray-900">Calculate Radius: r = C/(2π)</p>
                              <p className="text-gray-600">r = {formatNumber(result.circumference)} ÷ (2 × π) = <strong>{formatNumber(result.radius)} {unitShort[unit]}</strong></p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                            <div>
                              <p className="font-medium text-gray-900">Calculate Diameter: d = 2r</p>
                              <p className="text-gray-600">d = 2 × {formatNumber(result.radius)} = <strong>{formatNumber(result.diameter)} {unitShort[unit]}</strong></p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                            <div>
                              <p className="font-medium text-gray-900">Calculate Area: A = πr²</p>
                              <p className="text-gray-600">A = π × {formatNumber(result.radius)}² = <strong>{formatNumber(result.area)} {unitShort[unit]}²</strong></p>
                            </div>
                          </div>
                        </>
                      )}
                      {result.inputType === 'area' && (
                        <>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                            <div>
                              <p className="font-medium text-gray-900">Given: Area (A) = {formatNumber(result.area)} {unitShort[unit]}²</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                            <div>
                              <p className="font-medium text-gray-900">Calculate Radius: r = √(A/π)</p>
                              <p className="text-gray-600">r = √({formatNumber(result.area)} ÷ π) = <strong>{formatNumber(result.radius)} {unitShort[unit]}</strong></p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                            <div>
                              <p className="font-medium text-gray-900">Calculate Diameter: d = 2r</p>
                              <p className="text-gray-600">d = 2 × {formatNumber(result.radius)} = <strong>{formatNumber(result.diameter)} {unitShort[unit]}</strong></p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                            <div>
                              <p className="font-medium text-gray-900">Calculate Circumference: C = 2πr</p>
                              <p className="text-gray-600">C = 2 × π × {formatNumber(result.radius)} = <strong>{formatNumber(result.circumference)} {unitShort[unit]}</strong></p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Circle className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    Enter any circle measurement to calculate all properties
                  </p>
                  <p className="text-gray-400 text-sm">
                    Radius, Diameter, Circumference, or Area
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

            {/* What is Circumference */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What is Circumference?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The <strong>circumference</strong> of a circle is the distance around the circle's edge, also known as the circle's <strong>perimeter</strong>. It represents the total length of the boundary that encloses the circular region. Just as a rectangle has a perimeter that can be measured by adding all its sides, a circle has a circumference that can be calculated using a special mathematical formula involving pi (π).
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The relationship between a circle's circumference and its diameter is one of the most fundamental constants in mathematics. No matter how large or small a circle is, when you divide its circumference by its diameter, you always get the same number: <strong>π (pi)</strong>, approximately 3.14159.
              </p>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Key Circle Terms</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Radius (r):</strong> The distance from the center of the circle to any point on its edge</li>
                  <li><strong>Diameter (d):</strong> The distance across the circle through its center (d = 2r)</li>
                  <li><strong>Circumference (C):</strong> The perimeter or distance around the circle</li>
                  <li><strong>Area (A):</strong> The space enclosed within the circle</li>
                  <li><strong>Pi (π):</strong> The mathematical constant ≈ 3.14159265359</li>
                </ul>
              </div>
            </section>

            {/* Circumference Formulas */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Circumference Formulas
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                There are two primary formulas to calculate the circumference of a circle, depending on whether you know the radius or the diameter:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">Using Radius</h3>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold">C = 2πr</p>
                  </div>
                  <p className="text-indigo-100 mt-4 text-sm">
                    Where C is circumference, π ≈ 3.14159, and r is the radius
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">Using Diameter</h3>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold">C = πd</p>
                  </div>
                  <p className="text-purple-100 mt-4 text-sm">
                    Where C is circumference, π ≈ 3.14159, and d is the diameter
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl p-6">
                <h4 className="font-bold text-gray-900 mb-2">Why are these formulas equivalent?</h4>
                <p className="text-gray-700">
                  Since the diameter (d) is always twice the radius (d = 2r), both formulas give the same result:
                  <br /><strong>C = 2πr = π(2r) = πd</strong>
                </p>
              </div>
            </section>

            {/* Related Formulas */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                All Circle Formulas
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                      <th className="px-6 py-4 text-left font-bold">To Find</th>
                      <th className="px-6 py-4 text-left font-bold">Formula</th>
                      <th className="px-6 py-4 text-left font-bold">Given</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Circumference</td>
                      <td className="px-6 py-4 font-mono text-indigo-600">C = 2πr</td>
                      <td className="px-6 py-4 text-gray-600">Radius</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Circumference</td>
                      <td className="px-6 py-4 font-mono text-indigo-600">C = πd</td>
                      <td className="px-6 py-4 text-gray-600">Diameter</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Area</td>
                      <td className="px-6 py-4 font-mono text-indigo-600">A = πr²</td>
                      <td className="px-6 py-4 text-gray-600">Radius</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Area</td>
                      <td className="px-6 py-4 font-mono text-indigo-600">A = πd²/4</td>
                      <td className="px-6 py-4 text-gray-600">Diameter</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Radius</td>
                      <td className="px-6 py-4 font-mono text-indigo-600">r = C/(2π)</td>
                      <td className="px-6 py-4 text-gray-600">Circumference</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Radius</td>
                      <td className="px-6 py-4 font-mono text-indigo-600">r = √(A/π)</td>
                      <td className="px-6 py-4 text-gray-600">Area</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Diameter</td>
                      <td className="px-6 py-4 font-mono text-indigo-600">d = C/π</td>
                      <td className="px-6 py-4 text-gray-600">Circumference</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Diameter</td>
                      <td className="px-6 py-4 font-mono text-indigo-600">d = 2r</td>
                      <td className="px-6 py-4 text-gray-600">Radius</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* How to Calculate Step-by-Step */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Calculate Circumference: Step-by-Step
              </h2>

              <div className="space-y-8">
                {/* From Radius */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Method 1: From Radius</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                      <div>
                        <p className="font-medium text-gray-900">Identify the radius</p>
                        <p className="text-gray-600">Find or measure the radius (distance from center to edge)</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                      <div>
                        <p className="font-medium text-gray-900">Multiply by 2</p>
                        <p className="text-gray-600">Double the radius value</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                      <div>
                        <p className="font-medium text-gray-900">Multiply by π</p>
                        <p className="text-gray-600">Multiply the result by π (3.14159)</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2"><strong>Example:</strong> Radius = 5 cm</p>
                    <p className="font-mono text-indigo-600">C = 2 × π × 5 = 2 × 3.14159 × 5 = <strong>31.4159 cm</strong></p>
                  </div>
                </div>

                {/* From Diameter */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Method 2: From Diameter</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                      <div>
                        <p className="font-medium text-gray-900">Identify the diameter</p>
                        <p className="text-gray-600">Find or measure the diameter (distance across through center)</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                      <div>
                        <p className="font-medium text-gray-900">Multiply by π</p>
                        <p className="text-gray-600">Multiply the diameter by π (3.14159)</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2"><strong>Example:</strong> Diameter = 10 cm</p>
                    <p className="font-mono text-purple-600">C = π × 10 = 3.14159 × 10 = <strong>31.4159 cm</strong></p>
                  </div>
                </div>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Applications of Circumference
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-indigo-600 mb-3">🚗 Automotive</h3>
                  <p className="text-gray-700">
                    Calculate tire circumference to determine how far a vehicle travels per wheel rotation. Essential for speedometer calibration and fuel efficiency calculations.
                  </p>
                </div>
                <div className="bg-white border-2 border-purple-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">🏗️ Construction</h3>
                  <p className="text-gray-700">
                    Determine the amount of material needed for circular structures like pipes, columns, tanks, and domes. Calculate fencing for round areas.
                  </p>
                </div>
                <div className="bg-white border-2 border-pink-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-pink-600 mb-3">🎨 Arts & Crafts</h3>
                  <p className="text-gray-700">
                    Calculate ribbon, trim, or border length needed for circular designs, wreaths, decorations, and craft projects.
                  </p>
                </div>
                <div className="bg-white border-2 border-blue-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-blue-600 mb-3">🏃 Sports & Fitness</h3>
                  <p className="text-gray-700">
                    Calculate track lengths, running distances around circular paths, and wheel circumference for cycling computers.
                  </p>
                </div>
                <div className="bg-white border-2 border-green-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-green-600 mb-3">🌍 Geography & Science</h3>
                  <p className="text-gray-700">
                    Calculate Earth's circumference (approximately 40,075 km at the equator), planetary measurements, and orbital paths.
                  </p>
                </div>
                <div className="bg-white border-2 border-orange-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">⚙️ Engineering</h3>
                  <p className="text-gray-700">
                    Design gears, pulleys, wheels, and circular components. Calculate belt lengths and rotating machinery dimensions.
                  </p>
                </div>
              </div>
            </section>

            {/* The History of Pi */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                The History of Pi (π)
              </h2>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  The mathematical constant <strong>π (pi)</strong> has fascinated mathematicians for over 4,000 years. The ancient Babylonians approximated π as 3.125, while the Egyptians used 3.1605. The Greek mathematician <strong>Archimedes</strong> (287-212 BC) calculated π to be between 3.1408 and 3.1429 using polygons.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  <strong>Eratosthenes</strong>, another Greek mathematician, made history around 240 BC by being the first to calculate Earth's circumference. He observed that the Sun cast no shadow at Syene (modern-day Aswan) at noon on the summer solstice, while it cast a shadow at Alexandria. Using geometry and the distance between the cities, he calculated Earth's circumference to be about 40,000 km—remarkably close to the actual value of 40,075 km!
                </p>
                <div className="bg-white rounded-lg p-4 mt-4">
                  <p className="text-sm text-gray-600">
                    <strong>Fun Fact:</strong> The symbol π was first used by Welsh mathematician William Jones in 1706 and was later popularized by Leonhard Euler. Today, π has been calculated to over 100 trillion digits!
                  </p>
                </div>
              </div>
            </section>

            {/* Common Mistakes */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Mistakes to Avoid
              </h2>
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4">
                  <h4 className="font-bold text-red-800 mb-1">❌ Confusing Radius and Diameter</h4>
                  <p className="text-red-700 text-sm">
                    Remember: Diameter = 2 × Radius. Using the wrong value will double or halve your result.
                  </p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4">
                  <h4 className="font-bold text-red-800 mb-1">❌ Using π = 3 for Precise Calculations</h4>
                  <p className="text-red-700 text-sm">
                    While π ≈ 3 is useful for quick estimates, use at least 3.14159 for accurate results.
                  </p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4">
                  <h4 className="font-bold text-red-800 mb-1">❌ Mixing Up Units</h4>
                  <p className="text-red-700 text-sm">
                    Always ensure your radius/diameter is in consistent units. The circumference will be in the same unit.
                  </p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4">
                  <h4 className="font-bold text-red-800 mb-1">❌ Confusing Circumference and Area</h4>
                  <p className="text-red-700 text-sm">
                    Circumference (C = 2πr) measures distance. Area (A = πr²) measures space. They have different units!
                  </p>
                </div>
              </div>
            </section>

            {/* Practice Problems */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Practice Problems
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-2">Problem 1: Basic Calculation</h4>
                  <p className="text-gray-700 mb-3">Find the circumference of a circle with radius 7 cm.</p>
                  <details className="cursor-pointer">
                    <summary className="text-indigo-600 font-medium hover:text-indigo-800">Show Solution</summary>
                    <div className="mt-3 bg-white rounded-lg p-4">
                      <p>C = 2πr = 2 × 3.14159 × 7 = <strong>43.98 cm</strong></p>
                    </div>
                  </details>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-2">Problem 2: From Diameter</h4>
                  <p className="text-gray-700 mb-3">A circular table has a diameter of 1.2 meters. What is its circumference?</p>
                  <details className="cursor-pointer">
                    <summary className="text-purple-600 font-medium hover:text-purple-800">Show Solution</summary>
                    <div className="mt-3 bg-white rounded-lg p-4">
                      <p>C = πd = 3.14159 × 1.2 = <strong>3.77 meters</strong></p>
                    </div>
                  </details>
                </div>
                <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-2">Problem 3: Finding Radius</h4>
                  <p className="text-gray-700 mb-3">A wheel has a circumference of 62.83 cm. What is its radius?</p>
                  <details className="cursor-pointer">
                    <summary className="text-pink-600 font-medium hover:text-pink-800">Show Solution</summary>
                    <div className="mt-3 bg-white rounded-lg p-4">
                      <p>r = C/(2π) = 62.83 ÷ (2 × 3.14159) = <strong>10 cm</strong></p>
                    </div>
                  </details>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-2">Problem 4: Real-World Application</h4>
                  <p className="text-gray-700 mb-3">A bicycle wheel has a radius of 35 cm. How far does the bicycle travel in one complete wheel rotation?</p>
                  <details className="cursor-pointer">
                    <summary className="text-blue-600 font-medium hover:text-blue-800">Show Solution</summary>
                    <div className="mt-3 bg-white rounded-lg p-4">
                      <p>Distance = Circumference = 2πr = 2 × 3.14159 × 35 = <strong>219.91 cm ≈ 2.2 meters</strong></p>
                    </div>
                  </details>
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
                    What is the formula for circumference of a circle?
                  </h3>
                  <p className="text-gray-700">
                    The circumference of a circle can be calculated using <strong>C = 2πr</strong> (where r is the radius) or <strong>C = πd</strong> (where d is the diameter). Both formulas yield the same result since d = 2r.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do you find circumference from diameter?
                  </h3>
                  <p className="text-gray-700">
                    Simply multiply the diameter by π (approximately 3.14159). For example, if the diameter is 10 cm, the circumference is 10 × π = 31.4159 cm.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is the relationship between circumference and radius?
                  </h3>
                  <p className="text-gray-700">
                    The circumference is directly proportional to the radius. The formula C = 2πr shows that circumference equals 2π (approximately 6.283) times the radius. Doubling the radius doubles the circumference.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do you find radius from circumference?
                  </h3>
                  <p className="text-gray-700">
                    Divide the circumference by 2π using the formula <strong>r = C/(2π)</strong>. For example, if C = 31.4159 cm, then r = 31.4159 ÷ 6.283 = 5 cm.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is the exact value of π (pi)?
                  </h3>
                  <p className="text-gray-700">
                    Pi (π) is an irrational number that cannot be expressed as a simple fraction. It equals approximately 3.14159265359... and continues infinitely without repeating. For most calculations, using 3.14159 provides sufficient accuracy.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do you find area from circumference?
                  </h3>
                  <p className="text-gray-700">
                    First, find the radius using r = C/(2π), then calculate area using A = πr². Alternatively, use the direct formula <strong>A = C²/(4π)</strong>.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is Earth's circumference?
                  </h3>
                  <p className="text-gray-700">
                    Earth's circumference at the equator is approximately 40,075 km (24,901 miles). The polar circumference is slightly smaller at about 40,008 km due to Earth being an oblate spheroid.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How can I measure circumference without a formula?
                  </h3>
                  <p className="text-gray-700">
                    You can physically wrap a string or flexible tape measure around the circular object, then measure the length of the string. This gives you the circumference directly.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What units is circumference measured in?
                  </h3>
                  <p className="text-gray-700">
                    Circumference is measured in units of length—the same units as the radius or diameter. Common units include centimeters, meters, inches, feet, and miles.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is the difference between circumference and perimeter?
                  </h3>
                  <p className="text-gray-700">
                    Circumference is the specific term for the perimeter (boundary length) of a circle. While "perimeter" can refer to any polygon's boundary, "circumference" is exclusively used for circles.
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
                <Link href="/calculators/square-footage-calculator" className="block bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-indigo-300 hover:shadow-lg transition-all">
                  <h3 className="font-bold text-indigo-600 mb-1">Square Footage Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate area for any shape</p>
                </Link>
                <Link href="/calculators/percentage-calculator" className="block bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-indigo-300 hover:shadow-lg transition-all">
                  <h3 className="font-bold text-indigo-600 mb-1">Percentage Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate percentages easily</p>
                </Link>
                <Link href="/calculators/slope-calculator" className="block bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-indigo-300 hover:shadow-lg transition-all">
                  <h3 className="font-bold text-indigo-600 mb-1">Slope Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate slope between two points</p>
                </Link>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Conclusion
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Understanding circumference is fundamental to working with circles in mathematics, science, engineering, and everyday life. Whether you're calculating the distance around a tire, designing circular structures, or solving geometry problems, the circumference formula <strong>C = 2πr</strong> is an essential tool.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our free circumference calculator makes these calculations instant and accurate. Simply enter any circle measurement—radius, diameter, circumference, or area—and instantly get all other properties with step-by-step explanations. No more manual calculations or π approximation errors!
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
              Need Help with Geometry?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master circles, circumference, area, and all geometry concepts. Get personalized one-on-one guidance tailored to your learning style.
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
