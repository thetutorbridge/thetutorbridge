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

type InputType = 'radius' | 'diameter' | 'area';
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

export default function AreaOfCircleCalculator() {
  const [radius, setRadius] = useState<string>('');
  const [diameter, setDiameter] = useState<string>('');
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
      if (lastChanged !== 'area') setArea(newArea.toFixed(6).replace(/\.?0+$/, ''));

      setResult({
        radius: r,
        diameter: newDiameter,
        circumference: newCircumference,
        area: newArea,
        inputType: lastChanged,
        inputValue: parseFloat(
          lastChanged === 'radius' ? radius :
          lastChanged === 'diameter' ? diameter : area
        ),
        unit,
      });
    } else {
      setResult(null);
    }
  }, [radius, diameter, area, lastChanged, unit]);

  const handleInputChange = (type: InputType, value: string) => {
    setLastChanged(type);
    switch (type) {
      case 'radius':
        setRadius(value);
        break;
      case 'diameter':
        setDiameter(value);
        break;
      case 'area':
        setArea(value);
        break;
    }
  };

  const handleClear = () => {
    setRadius('');
    setDiameter('');
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
    "name": "Area of a Circle Calculator",
    "description": "Free online area of a circle calculator. Calculate circle area from radius, diameter, or find radius from area using A = πr² formula.",
    "url": "https://www.thetutorbridge.com/calculators/area-of-a-circle-calculator",
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
        "name": "What is the formula for the area of a circle?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The area of a circle is calculated using the formula A = πr², where A is the area, π (pi) is approximately 3.14159, and r is the radius of the circle. You can also use A = π(d/2)² or A = πd²/4 if you know the diameter."
        }
      },
      {
        "@type": "Question",
        "name": "How do you find the area of a circle from diameter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To find the area from diameter, first divide the diameter by 2 to get the radius, then apply A = πr². Alternatively, use A = πd²/4. For example, if diameter is 10 cm, area = π × (10/2)² = π × 25 = 78.54 cm²."
        }
      },
      {
        "@type": "Question",
        "name": "How do you find radius from area of a circle?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To find the radius from the area, use the formula r = √(A/π). For example, if the area is 78.54 cm², the radius is √(78.54/3.14159) = √25 = 5 cm."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
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
            <Link href="/" className="hover:text-purple-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-purple-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Area of a Circle Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Circle className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Area of a Circle Calculator
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
              Calculate the area of a circle from radius, diameter, or find the radius from area. Instant results with the formula: <strong>A = πr²</strong>
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
                  <Circle className="w-6 h-6 text-purple-600" />
                  Circle Area Calculator
                </h2>

                {/* Circle Diagram */}
                <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-4 mb-6">
                  <svg viewBox="0 0 200 200" className="w-full max-w-[200px] mx-auto">
                    {/* Filled circle for area */}
                    <circle cx="100" cy="100" r="70" fill="rgba(147, 51, 234, 0.1)" stroke="#9333ea" strokeWidth="3" />
                    {/* Radius line */}
                    <line x1="100" y1="100" x2="170" y2="100" stroke="#1A3D7C" strokeWidth="2" strokeDasharray="5,3" />
                    {/* Diameter line */}
                    <line x1="30" y1="100" x2="170" y2="100" stroke="#9333ea" strokeWidth="2" />
                    {/* Center dot */}
                    <circle cx="100" cy="100" r="4" fill="#1A3D7C" />
                    {/* Radius label */}
                    <text x="135" y="95" fontSize="14" fill="#1A3D7C" fontWeight="bold">r</text>
                    {/* Diameter label */}
                    <text x="100" y="120" fontSize="12" fill="#9333ea" fontWeight="bold" textAnchor="middle">d</text>
                    {/* Area label */}
                    <text x="100" y="25" fontSize="12" fill="#9333ea" fontWeight="bold" textAnchor="middle">A = πr²</text>
                  </svg>
                  <div className="text-center mt-2 space-y-1">
                    <p className="text-sm text-gray-600"><strong>Area Formula:</strong> A = πr²</p>
                    <p className="text-sm text-gray-600"><strong>From Diameter:</strong> A = π(d/2)² = πd²/4</p>
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
                      <span className="text-xs text-gray-500 font-normal">distance from center to edge</span>
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
                <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <p className="text-sm text-purple-800">
                    <strong>Tip:</strong> Enter radius, diameter, or area - the other values calculate automatically!
                  </p>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3">
              {result ? (
                <div className="space-y-6">
                  {/* Main Results Card */}
                  <div className="bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-6">Circle Properties</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 col-span-2">
                        <p className="text-purple-200 text-sm mb-1">Area (A)</p>
                        <p className="text-3xl md:text-4xl font-bold">
                          {formatNumber(result.area)} <span className="text-xl">{unitShort[unit]}²</span>
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-purple-200 text-sm mb-1">Radius (r)</p>
                        <p className="text-2xl md:text-3xl font-bold">
                          {formatNumber(result.radius)} <span className="text-lg">{unitShort[unit]}</span>
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-purple-200 text-sm mb-1">Diameter (d)</p>
                        <p className="text-2xl md:text-3xl font-bold">
                          {formatNumber(result.diameter)} <span className="text-lg">{unitShort[unit]}</span>
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 col-span-2">
                        <p className="text-purple-200 text-sm mb-1">Circumference (C)</p>
                        <p className="text-2xl md:text-3xl font-bold">
                          {formatNumber(result.circumference)} <span className="text-lg">{unitShort[unit]}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Formulas Used Card */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Formulas Used</h3>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600 mb-2">Area Formula (from Radius)</p>
                        <div className="text-xl md:text-2xl font-bold text-gray-800 text-center">
                          A = πr²
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-fuchsia-50 to-pink-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600 mb-2">Area Formula (from Diameter)</p>
                        <div className="flex items-center justify-center gap-4 text-xl md:text-2xl font-bold text-gray-800">
                          <span>A = π(d/2)²</span>
                          <span className="text-gray-400">=</span>
                          <span>πd²/4</span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600 mb-2">Radius from Area</p>
                        <div className="text-xl md:text-2xl font-bold text-gray-800 text-center">
                          r = √(A/π)
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
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                            <div>
                              <p className="font-medium text-gray-900">Given: Radius (r) = {formatNumber(result.radius)} {unitShort[unit]}</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                            <div>
                              <p className="font-medium text-gray-900">Apply the Area Formula: A = πr²</p>
                              <p className="text-gray-600">A = π × ({formatNumber(result.radius)})²</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                            <div>
                              <p className="font-medium text-gray-900">Square the radius</p>
                              <p className="text-gray-600">r² = {formatNumber(result.radius)} × {formatNumber(result.radius)} = {formatNumber(result.radius * result.radius)}</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                            <div>
                              <p className="font-medium text-gray-900">Multiply by π</p>
                              <p className="text-gray-600">A = 3.14159... × {formatNumber(result.radius * result.radius)} = <strong>{formatNumber(result.area)} {unitShort[unit]}²</strong></p>
                            </div>
                          </div>
                        </>
                      )}
                      {result.inputType === 'diameter' && (
                        <>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                            <div>
                              <p className="font-medium text-gray-900">Given: Diameter (d) = {formatNumber(result.diameter)} {unitShort[unit]}</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                            <div>
                              <p className="font-medium text-gray-900">Calculate Radius: r = d/2</p>
                              <p className="text-gray-600">r = {formatNumber(result.diameter)} ÷ 2 = <strong>{formatNumber(result.radius)} {unitShort[unit]}</strong></p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                            <div>
                              <p className="font-medium text-gray-900">Apply the Area Formula: A = πr²</p>
                              <p className="text-gray-600">A = π × ({formatNumber(result.radius)})²</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                            <div>
                              <p className="font-medium text-gray-900">Calculate</p>
                              <p className="text-gray-600">A = π × {formatNumber(result.radius * result.radius)} = <strong>{formatNumber(result.area)} {unitShort[unit]}²</strong></p>
                            </div>
                          </div>
                        </>
                      )}
                      {result.inputType === 'area' && (
                        <>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                            <div>
                              <p className="font-medium text-gray-900">Given: Area (A) = {formatNumber(result.area)} {unitShort[unit]}²</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                            <div>
                              <p className="font-medium text-gray-900">Apply the Radius Formula: r = √(A/π)</p>
                              <p className="text-gray-600">r = √({formatNumber(result.area)} ÷ π)</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                            <div>
                              <p className="font-medium text-gray-900">Divide Area by π</p>
                              <p className="text-gray-600">{formatNumber(result.area)} ÷ 3.14159... = {formatNumber(result.area / PI)}</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                            <div>
                              <p className="font-medium text-gray-900">Take the Square Root</p>
                              <p className="text-gray-600">r = √{formatNumber(result.area / PI)} = <strong>{formatNumber(result.radius)} {unitShort[unit]}</strong></p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">5</div>
                            <div>
                              <p className="font-medium text-gray-900">Calculate Diameter: d = 2r</p>
                              <p className="text-gray-600">d = 2 × {formatNumber(result.radius)} = <strong>{formatNumber(result.diameter)} {unitShort[unit]}</strong></p>
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
                    Enter radius, diameter, or area to calculate
                  </p>
                  <p className="text-gray-400 text-sm">
                    All circle properties will be calculated automatically
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

            {/* What is Area of a Circle */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What is the Area of a Circle?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The <strong>area of a circle</strong> is the amount of space enclosed within the circle's boundary (circumference). It represents the total surface covered by a perfectly round shape. Area is measured in square units, such as square centimeters (cm²), square meters (m²), or square inches (in²).
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Unlike the circumference, which measures the distance around a circle, the area measures the space inside. Understanding circle area is essential in countless real-world applications, from calculating the size of a pizza to determining the coverage area of a sprinkler system.
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-xl p-6 mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Key Circle Terms for Area</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Radius (r):</strong> Distance from center to edge - the key measurement for area calculations</li>
                  <li><strong>Diameter (d):</strong> Distance across the circle through center (d = 2r)</li>
                  <li><strong>Area (A):</strong> The space enclosed within the circle, measured in square units</li>
                  <li><strong>Pi (π):</strong> The mathematical constant ≈ 3.14159265359, essential for all circle calculations</li>
                </ul>
              </div>
            </section>

            {/* Area Formulas */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Area of a Circle Formula
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The fundamental formula for calculating the area of a circle uses the radius. If you know the diameter or circumference instead, you can derive the radius first or use alternative formulas.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">Primary Formula (Using Radius)</h3>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold">A = πr²</p>
                  </div>
                  <p className="text-purple-100 mt-4 text-sm">
                    Where A is area, π ≈ 3.14159, and r is the radius
                  </p>
                </div>
                <div className="bg-gradient-to-br from-fuchsia-600 to-pink-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">Using Diameter</h3>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold">A = πd²/4</p>
                  </div>
                  <p className="text-fuchsia-100 mt-4 text-sm">
                    Where d is the diameter (since r = d/2)
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl p-6">
                <h4 className="font-bold text-gray-900 mb-2">Why does the formula use r² (radius squared)?</h4>
                <p className="text-gray-700">
                  The area of a circle is proportional to the square of its radius. This means if you double the radius, the area increases by a factor of 4 (2² = 4). If you triple the radius, the area increases by a factor of 9 (3² = 9). This squared relationship is why circles grow much larger in area than their radius might suggest.
                </p>
              </div>
            </section>

            {/* Finding Radius from Area */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Find Radius from Area
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Sometimes you know the area and need to find the radius. By rearranging the area formula, you can solve for radius:
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 md:p-8">
                <div className="bg-white rounded-lg p-6 text-center mb-4">
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">r = √(A/π)</p>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <p className="font-medium text-gray-900">Divide the area by π (3.14159...)</p>
                      <p className="text-gray-600">This gives you r²</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <p className="font-medium text-gray-900">Take the square root of the result</p>
                      <p className="text-gray-600">This gives you the radius</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2"><strong>Example:</strong> Area = 78.54 cm²</p>
                  <p className="font-mono text-purple-600">r = √(78.54 ÷ 3.14159) = √25 = <strong>5 cm</strong></p>
                </div>
              </div>
            </section>

            {/* All Circle Formulas Table */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Complete Circle Formulas Reference
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white">
                      <th className="px-6 py-4 text-left font-bold">To Find</th>
                      <th className="px-6 py-4 text-left font-bold">Formula</th>
                      <th className="px-6 py-4 text-left font-bold">Given</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Area</td>
                      <td className="px-6 py-4 font-mono text-purple-600">A = πr²</td>
                      <td className="px-6 py-4 text-gray-600">Radius</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Area</td>
                      <td className="px-6 py-4 font-mono text-purple-600">A = πd²/4</td>
                      <td className="px-6 py-4 text-gray-600">Diameter</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Area</td>
                      <td className="px-6 py-4 font-mono text-purple-600">A = C²/(4π)</td>
                      <td className="px-6 py-4 text-gray-600">Circumference</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Radius</td>
                      <td className="px-6 py-4 font-mono text-purple-600">r = √(A/π)</td>
                      <td className="px-6 py-4 text-gray-600">Area</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Diameter</td>
                      <td className="px-6 py-4 font-mono text-purple-600">d = 2√(A/π)</td>
                      <td className="px-6 py-4 text-gray-600">Area</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Circumference</td>
                      <td className="px-6 py-4 font-mono text-purple-600">C = 2√(πA)</td>
                      <td className="px-6 py-4 text-gray-600">Area</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Step-by-Step Examples */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Calculate Area: Step-by-Step Examples
              </h2>

              <div className="space-y-8">
                {/* Example 1: From Radius */}
                <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Example 1: Find area from radius</h3>
                  <p className="text-gray-700 mb-4">A circular garden has a radius of 7 meters. Find its area.</p>
                  <div className="bg-white rounded-lg p-4 space-y-2">
                    <p className="font-mono text-gray-700"><strong>Given:</strong> r = 7 m</p>
                    <p className="font-mono text-gray-700"><strong>Formula:</strong> A = πr²</p>
                    <p className="font-mono text-gray-700"><strong>Step 1:</strong> Square the radius: 7² = 49</p>
                    <p className="font-mono text-gray-700"><strong>Step 2:</strong> Multiply by π: π × 49 = 3.14159 × 49</p>
                    <p className="font-mono text-purple-600"><strong>Answer:</strong> A = 153.94 m²</p>
                  </div>
                </div>

                {/* Example 2: From Diameter */}
                <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Example 2: Find area from diameter</h3>
                  <p className="text-gray-700 mb-4">A circular table has a diameter of 1.2 meters. What is its surface area?</p>
                  <div className="bg-white rounded-lg p-4 space-y-2">
                    <p className="font-mono text-gray-700"><strong>Given:</strong> d = 1.2 m</p>
                    <p className="font-mono text-gray-700"><strong>Step 1:</strong> Find radius: r = d/2 = 1.2/2 = 0.6 m</p>
                    <p className="font-mono text-gray-700"><strong>Step 2:</strong> Apply formula: A = πr² = π × (0.6)²</p>
                    <p className="font-mono text-gray-700"><strong>Step 3:</strong> Calculate: A = π × 0.36 = 1.131</p>
                    <p className="font-mono text-purple-600"><strong>Answer:</strong> A = 1.13 m²</p>
                  </div>
                </div>

                {/* Example 3: Find Radius from Area */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Example 3: Find radius from area</h3>
                  <p className="text-gray-700 mb-4">A circular pool has an area of 314.16 square feet. What is its radius?</p>
                  <div className="bg-white rounded-lg p-4 space-y-2">
                    <p className="font-mono text-gray-700"><strong>Given:</strong> A = 314.16 ft²</p>
                    <p className="font-mono text-gray-700"><strong>Formula:</strong> r = √(A/π)</p>
                    <p className="font-mono text-gray-700"><strong>Step 1:</strong> Divide by π: 314.16 ÷ 3.14159 = 100</p>
                    <p className="font-mono text-gray-700"><strong>Step 2:</strong> Take square root: √100 = 10</p>
                    <p className="font-mono text-purple-600"><strong>Answer:</strong> r = 10 feet</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Applications of Circle Area
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-purple-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">Construction & Landscaping</h3>
                  <p className="text-gray-700">
                    Calculate material needed for circular patios, ponds, fountains, and garden beds. Determine concrete volume for circular foundations and the coverage area of round structures.
                  </p>
                </div>
                <div className="bg-white border-2 border-fuchsia-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-fuchsia-600 mb-3">Manufacturing</h3>
                  <p className="text-gray-700">
                    Calculate the surface area of circular components like wheels, gears, and discs. Essential for material cost estimation and quality control in production.
                  </p>
                </div>
                <div className="bg-white border-2 border-pink-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-pink-600 mb-3">Agriculture</h3>
                  <p className="text-gray-700">
                    Determine irrigation coverage for circular pivot systems. Calculate the area of grain silos, storage tanks, and circular crop fields for yield estimation.
                  </p>
                </div>
                <div className="bg-white border-2 border-violet-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-violet-600 mb-3">Food Industry</h3>
                  <p className="text-gray-700">
                    Calculate pizza sizes, cake portions, and circular serving areas. Compare value between different sized circular products like pies and tortillas.
                  </p>
                </div>
                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-indigo-600 mb-3">Sports & Recreation</h3>
                  <p className="text-gray-700">
                    Calculate the area of circular fields, targets in archery and darts, and swimming pools. Used for maintaining playing surfaces and equipment specifications.
                  </p>
                </div>
                <div className="bg-white border-2 border-blue-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-blue-600 mb-3">Science & Medicine</h3>
                  <p className="text-gray-700">
                    Calculate cross-sectional areas of blood vessels, cells, and biological structures. Essential in physics for calculating pressure on circular surfaces.
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
                  <h4 className="font-bold text-red-800 mb-1">Using Diameter Instead of Radius</h4>
                  <p className="text-red-700 text-sm">
                    The formula A = πr² uses the radius, not diameter. If you use diameter by mistake, your answer will be 4 times too large. Always divide diameter by 2 first.
                  </p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4">
                  <h4 className="font-bold text-red-800 mb-1">Forgetting to Square the Radius</h4>
                  <p className="text-red-700 text-sm">
                    The formula is πr², not πr. Forgetting to square the radius gives an answer that's too small (it would actually give you half the circumference, not the area).
                  </p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4">
                  <h4 className="font-bold text-red-800 mb-1">Wrong Units for Area</h4>
                  <p className="text-red-700 text-sm">
                    Area is measured in square units (cm², m², in²). If radius is in centimeters, area is in square centimeters. Don't forget the "squared" part of the unit.
                  </p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4">
                  <h4 className="font-bold text-red-800 mb-1">Confusing Area with Circumference</h4>
                  <p className="text-red-700 text-sm">
                    Area (A = πr²) measures enclosed space. Circumference (C = 2πr) measures distance around. They have different formulas and different unit types.
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
                <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-2">Problem 1: Basic Calculation</h4>
                  <p className="text-gray-700 mb-3">Find the area of a circle with radius 5 cm.</p>
                  <details className="cursor-pointer">
                    <summary className="text-purple-600 font-medium hover:text-purple-800">Show Solution</summary>
                    <div className="mt-3 bg-white rounded-lg p-4">
                      <p>A = πr² = π × 5² = π × 25 = <strong>78.54 cm²</strong></p>
                    </div>
                  </details>
                </div>
                <div className="bg-gradient-to-r from-fuchsia-50 to-pink-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-2">Problem 2: Using Diameter</h4>
                  <p className="text-gray-700 mb-3">A pizza has a diameter of 14 inches. What is its area?</p>
                  <details className="cursor-pointer">
                    <summary className="text-fuchsia-600 font-medium hover:text-fuchsia-800">Show Solution</summary>
                    <div className="mt-3 bg-white rounded-lg p-4">
                      <p>r = d/2 = 14/2 = 7 inches</p>
                      <p>A = πr² = π × 7² = π × 49 = <strong>153.94 in²</strong></p>
                    </div>
                  </details>
                </div>
                <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-2">Problem 3: Finding Radius</h4>
                  <p className="text-gray-700 mb-3">A circular rug has an area of 50.27 square feet. What is its radius?</p>
                  <details className="cursor-pointer">
                    <summary className="text-pink-600 font-medium hover:text-pink-800">Show Solution</summary>
                    <div className="mt-3 bg-white rounded-lg p-4">
                      <p>r = √(A/π) = √(50.27/3.14159) = √16 = <strong>4 feet</strong></p>
                    </div>
                  </details>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-2">Problem 4: Comparison</h4>
                  <p className="text-gray-700 mb-3">Which has more area: a circle with radius 6 cm or a circle with diameter 10 cm?</p>
                  <details className="cursor-pointer">
                    <summary className="text-blue-600 font-medium hover:text-blue-800">Show Solution</summary>
                    <div className="mt-3 bg-white rounded-lg p-4">
                      <p>Circle 1: A = π × 6² = 113.10 cm²</p>
                      <p>Circle 2: r = 10/2 = 5 cm, A = π × 5² = 78.54 cm²</p>
                      <p><strong>Circle 1 (radius 6 cm) has more area.</strong></p>
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
                    What is the formula for the area of a circle?
                  </h3>
                  <p className="text-gray-700">
                    The area of a circle is <strong>A = πr²</strong>, where A is the area, π (pi) is approximately 3.14159, and r is the radius. If you have the diameter, use A = πd²/4 or first convert diameter to radius (r = d/2).
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do you find the area of a circle from the diameter?
                  </h3>
                  <p className="text-gray-700">
                    First divide the diameter by 2 to get the radius, then use A = πr². For example, if diameter is 10 cm: radius = 5 cm, area = π × 5² = 78.54 cm². Alternatively, use A = πd²/4 directly.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do you find the radius from the area of a circle?
                  </h3>
                  <p className="text-gray-700">
                    Use the formula <strong>r = √(A/π)</strong>. Divide the area by π (3.14159...), then take the square root of the result. For example, if area = 100 cm², radius = √(100/3.14159) = √31.83 = 5.64 cm.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is the area of a circle with radius 10?
                  </h3>
                  <p className="text-gray-700">
                    A = πr² = π × 10² = π × 100 = <strong>314.159 square units</strong>. The units depend on the radius measurement (cm² if radius is in cm, in² if in inches, etc.).
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can the area and circumference of a circle be equal?
                  </h3>
                  <p className="text-gray-700">
                    Yes, when the radius equals 2 units. At r = 2: Area = π × 2² = 4π and Circumference = 2π × 2 = 4π. Both equal approximately 12.566. However, they have different unit types (area in units², circumference in units).
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do you find area from circumference?
                  </h3>
                  <p className="text-gray-700">
                    First find the radius: r = C/(2π), then calculate area: A = πr². Or use the direct formula: <strong>A = C²/(4π)</strong>. For example, if C = 31.42, then A = (31.42)²/(4 × 3.14159) = 78.54.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why is the area formula πr² and not 2πr?
                  </h3>
                  <p className="text-gray-700">
                    2πr is the circumference formula (distance around). Area requires squaring the radius because you're measuring two-dimensional space. The πr² formula comes from calculus, representing the sum of infinitely many thin concentric rings.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    If you double the radius, what happens to the area?
                  </h3>
                  <p className="text-gray-700">
                    The area quadruples (becomes 4 times larger). Since A = πr², if you replace r with 2r: A = π(2r)² = π × 4r² = 4πr². This is why the area grows much faster than the radius.
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
                <Link href="/calculators/circumference-calculator" className="block bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-purple-300 hover:shadow-lg transition-all">
                  <h3 className="font-bold text-purple-600 mb-1">Circumference Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate circumference using C = 2πr</p>
                </Link>
                <Link href="/calculators/square-footage-calculator" className="block bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-purple-300 hover:shadow-lg transition-all">
                  <h3 className="font-bold text-purple-600 mb-1">Square Footage Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate area for any shape</p>
                </Link>
                <Link href="/calculators/cylinder-volume-calculator" className="block bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-purple-300 hover:shadow-lg transition-all">
                  <h3 className="font-bold text-purple-600 mb-1">Cylinder Volume Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate V = πr²h for cylinders</p>
                </Link>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Conclusion
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The area of a circle formula <strong>A = πr²</strong> is one of the most fundamental concepts in geometry with countless practical applications. Whether you're calculating the size of a pizza, designing a circular garden, or solving homework problems, understanding this formula is essential.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our free Area of a Circle Calculator makes these calculations instant and accurate. Simply enter any measurement—radius, diameter, or area—and get all other circle properties with step-by-step explanations. No more manual calculations or worrying about π approximations!
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
              Our expert tutors can help you master circle area, circumference, and all geometry concepts. Get personalized one-on-one guidance tailored to your learning style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tutoring/free-consultation">
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
