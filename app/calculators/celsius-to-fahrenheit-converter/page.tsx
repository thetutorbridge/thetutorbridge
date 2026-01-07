'use client';

import { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Calculator, Home, BookOpen, ArrowRight, Thermometer, ArrowLeftRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is 0 degrees Celsius in Fahrenheit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "0 degrees Celsius equals 32 degrees Fahrenheit. This is the freezing point of water. Formula: °F = (0 × 9/5) + 32 = 32°F"
      }
    },
    {
      "@type": "Question",
      "name": "What is 100 degrees Celsius in Fahrenheit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "100 degrees Celsius equals 212 degrees Fahrenheit. This is the boiling point of water at sea level. Formula: °F = (100 × 9/5) + 32 = 212°F"
      }
    },
    {
      "@type": "Question",
      "name": "What is 37 degrees Celsius in Fahrenheit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "37 degrees Celsius equals 98.6 degrees Fahrenheit. This is the normal human body temperature. Formula: °F = (37 × 9/5) + 32 = 98.6°F"
      }
    },
    {
      "@type": "Question",
      "name": "What is the formula to convert Celsius to Fahrenheit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The formula is: °F = (°C × 9/5) + 32, or equivalently °F = (°C × 1.8) + 32. Multiply Celsius by 9/5 (or 1.8), then add 32."
      }
    },
    {
      "@type": "Question",
      "name": "What is 20 degrees Celsius in Fahrenheit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "20 degrees Celsius equals 68 degrees Fahrenheit. This is considered comfortable room temperature. Formula: °F = (20 × 9/5) + 32 = 68°F"
      }
    }
  ]
};

interface ConversionResult {
  inputValue: number;
  outputValue: number;
  fromUnit: string;
  toUnit: string;
  formula: string;
  steps: string[];
}

export default function CelsiusToFahrenheitConverter() {
  const [temperature, setTemperature] = useState<string>('');
  const [conversionMode, setConversionMode] = useState<'ctof' | 'ftoc'>('ctof');
  const [result, setResult] = useState<ConversionResult | null>(null);

  const convertTemperature = () => {
    const temp = parseFloat(temperature);

    if (isNaN(temp)) {
      alert('Please enter a valid number');
      return;
    }

    let outputTemp: number;
    let steps: string[];
    let formula: string;

    if (conversionMode === 'ctof') {
      // Celsius to Fahrenheit: °F = (°C × 9/5) + 32
      outputTemp = (temp * 9 / 5) + 32;
      formula = '°F = (°C × 9/5) + 32';
      steps = [
        `Formula: °F = (°C × 9/5) + 32`,
        '',
        `Given: °C = ${temp}`,
        '',
        `Step 1: Multiply °C by 9/5`,
        `${temp} × 9/5 = ${temp} × 1.8 = ${(temp * 1.8).toFixed(4)}`,
        '',
        `Step 2: Add 32`,
        `${(temp * 1.8).toFixed(4)} + 32 = ${outputTemp.toFixed(2)}`,
        '',
        `Result: ${temp} °C = ${outputTemp.toFixed(2)} °F`,
      ];
    } else {
      // Fahrenheit to Celsius: °C = (°F - 32) × 5/9
      outputTemp = (temp - 32) * 5 / 9;
      formula = '°C = (°F − 32) × 5/9';
      steps = [
        `Formula: °C = (°F − 32) × 5/9`,
        '',
        `Given: °F = ${temp}`,
        '',
        `Step 1: Subtract 32 from °F`,
        `${temp} − 32 = ${(temp - 32).toFixed(2)}`,
        '',
        `Step 2: Multiply by 5/9`,
        `${(temp - 32).toFixed(2)} × 5/9 = ${(temp - 32).toFixed(2)} × 0.5556 = ${outputTemp.toFixed(4)}`,
        '',
        `Result: ${temp} °F = ${outputTemp.toFixed(2)} °C`,
      ];
    }

    setResult({
      inputValue: temp,
      outputValue: outputTemp,
      fromUnit: conversionMode === 'ctof' ? '°C' : '°F',
      toUnit: conversionMode === 'ctof' ? '°F' : '°C',
      formula,
      steps,
    });
  };

  const handleClear = () => {
    setTemperature('');
    setResult(null);
  };

  const toggleConversionMode = () => {
    setConversionMode(conversionMode === 'ctof' ? 'ftoc' : 'ctof');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-red-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-red-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Celsius to Fahrenheit Converter</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Thermometer className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Celsius to Fahrenheit Converter
            </h1>
            <p className="text-lg md:text-xl text-red-100 max-w-2xl mx-auto leading-relaxed">
              Convert temperature between Celsius (°C) and Fahrenheit (°F) with step-by-step solutions and conversion formulas.
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Input Section (Left Side - 2 columns) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-4">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl p-4 mb-6 text-center">
                  <h2 className="text-xl md:text-2xl font-bold">
                    Convert {conversionMode === 'ctof' ? 'Celsius to Fahrenheit' : 'Fahrenheit to Celsius'}
                  </h2>
                </div>

                {/* Conversion Mode Toggle */}
                <div className="mb-6 flex items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setConversionMode('ctof');
                      setResult(null);
                    }}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      conversionMode === 'ctof'
                        ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    °C to °F
                  </button>
                  <button
                    onClick={() => {
                      setConversionMode('ftoc');
                      setResult(null);
                    }}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      conversionMode === 'ftoc'
                        ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    °F to °C
                  </button>
                </div>

                {/* Input Field */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="temperature" className="text-sm font-semibold text-gray-700 mb-3 block">
                      Enter Temperature
                    </Label>
                    <div className="relative">
                      <Input
                        id="temperature"
                        type="number"
                        placeholder="e.g., 50"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        className="text-center text-2xl font-medium border-2 pr-16"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            convertTemperature();
                          }
                        }}
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-gray-500">
                        {conversionMode === 'ctof' ? '°C' : '°F'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={convertTemperature}
                    className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Calculate
                  </Button>
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="px-6 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50"
                  >
                    Clear
                  </Button>
                </div>

                {/* Quick Examples */}
                <div className="mt-6 p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Common Conversions:</h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>• 0 °C = 32 °F (Water freezes)</p>
                    <p>• 100 °C = 212 °F (Water boils)</p>
                    <p>• 37 °C = 98.6 °F (Body temp)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section (Right Side - 3 columns) */}
            <div className="lg:col-span-3">
              {result ? (
                <div className="space-y-6">
                  {/* Answer Card */}
                  <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4">Answer</h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <div className="text-center">
                        <p className="text-5xl md:text-6xl font-bold mb-2">
                          {result.inputValue} {result.fromUnit} = {result.outputValue.toFixed(2)} {result.toUnit}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Formula Display */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Conversion Formula
                    </h3>
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 text-center">
                      <p className="text-2xl md:text-3xl font-bold text-gray-900">
                        {result.formula}
                      </p>
                      {conversionMode === 'ctof' ? (
                        <div className="mt-4 text-gray-700">
                          <p className="text-sm">Multiply Celsius by <sup>9</sup>/<sub>5</sub> (or 1.8), then add 32</p>
                        </div>
                      ) : (
                        <div className="mt-4 text-gray-700">
                          <p className="text-sm">Subtract 32 from Fahrenheit, then multiply by <sup>5</sup>/<sub>9</sub> (or 0.5556)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step-by-Step Solution */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-red-600" />
                      Solution with Steps
                    </h3>
                    <div className="space-y-2">
                      {result.steps.map((step, index) => (
                        <div key={index}>
                          {step === '' ? (
                            <div className="h-2"></div>
                          ) : (
                            <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg font-mono text-sm">
                              {step}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Reference */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Temperature Reference Points
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Water Freezes</p>
                        <p className="text-lg font-bold text-blue-600">0 °C = 32 °F</p>
                      </div>
                      <div className="bg-red-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Water Boils</p>
                        <p className="text-lg font-bold text-red-600">100 °C = 212 °F</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Room Temperature</p>
                        <p className="text-lg font-bold text-green-600">20-22 °C = 68-72 °F</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Body Temperature</p>
                        <p className="text-lg font-bold text-orange-600">37 °C = 98.6 °F</p>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Thermometer className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    Enter a temperature and click Calculate
                  </p>
                  <p className="text-gray-400 text-sm">
                    Convert between Celsius and Fahrenheit with step-by-step solutions
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Educational Content Section - Due to token limits, this is condensed */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Understanding Temperature Conversion
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Temperature conversion between Celsius (°C) and Fahrenheit (°F) is essential for international communication, travel, cooking, science, and daily weather understanding. The Celsius scale, also known as centigrade, is used worldwide in most countries and scientific applications, while Fahrenheit is primarily used in the United States, its territories, and a few other countries.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our Temperature Converter provides instant, accurate conversions with complete step-by-step solutions. Understanding these formulas helps you mentally estimate temperatures when traveling or working with international recipes and scientific data.
              </p>
            </section>

            {/* Conversion Formulas */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Temperature Conversion Formulas
              </h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-red-700 mb-4">Celsius to Fahrenheit</h3>
                  <div className="bg-white rounded-lg p-6">
                    <p className="text-2xl font-bold text-center mb-4">
                      °F = (°C × <sup>9</sup>/<sub>5</sub>) + 32
                    </p>
                    <p className="text-center text-gray-700 mb-4">or</p>
                    <p className="text-2xl font-bold text-center">
                      °F = (°C × 1.8) + 32
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="font-bold text-gray-900 mb-2">Example: Convert 50°C to Fahrenheit</p>
                      <p className="text-gray-700 font-mono text-sm">°F = (50 × 1.8) + 32</p>
                      <p className="text-gray-700 font-mono text-sm">°F = 90 + 32</p>
                      <p className="text-gray-700 font-mono text-sm font-bold">°F = 122</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">Fahrenheit to Celsius</h3>
                  <div className="bg-white rounded-lg p-6">
                    <p className="text-2xl font-bold text-center mb-4">
                      °C = (°F − 32) × <sup>5</sup>/<sub>9</sub>
                    </p>
                    <p className="text-center text-gray-700 mb-4">or</p>
                    <p className="text-2xl font-bold text-center">
                      °C = (°F − 32) × 0.5556
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="font-bold text-gray-900 mb-2">Example: Convert 122°F to Celsius</p>
                      <p className="text-gray-700 font-mono text-sm">°C = (122 − 32) × 0.5556</p>
                      <p className="text-gray-700 font-mono text-sm">°C = 90 × 0.5556</p>
                      <p className="text-gray-700 font-mono text-sm font-bold">°C = 50</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Use */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Use This Converter
              </h2>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Select Conversion Direction:</strong>
                      <p className="text-gray-700 mt-1">Choose °C to °F or °F to °C using the toggle buttons.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Enter Temperature:</strong>
                      <p className="text-gray-700 mt-1">Type the temperature value. Accepts positive and negative numbers, including decimals.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Calculate:</strong>
                      <p className="text-gray-700 mt-1">Click Calculate or press Enter to see the converted temperature with step-by-step solution.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* Temperature Scales */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Understanding Temperature Scales
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-red-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-red-600 mb-4">Celsius (°C)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Also called Centigrade</li>
                    <li>• Used worldwide (metric system)</li>
                    <li>• 0°C = Water freezes</li>
                    <li>• 100°C = Water boils</li>
                    <li>• Named after Anders Celsius</li>
                    <li>• Standard for scientific use</li>
                  </ul>
                </div>
                <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-orange-600 mb-4">Fahrenheit (°F)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Used in United States</li>
                    <li>• Part of imperial system</li>
                    <li>• 32°F = Water freezes</li>
                    <li>• 212°F = Water boils</li>
                    <li>• Named after Daniel Fahrenheit</li>
                    <li>• 180° between freeze/boil points</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Applications
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-3">🌡️ Weather & Travel</h3>
                  <p className="text-gray-700">
                    When traveling internationally, convert weather forecasts to understand local temperatures. US travelers abroad need Celsius conversion; international visitors to the US need Fahrenheit.
                  </p>
                </div>

                <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">🍳 Cooking & Baking</h3>
                  <p className="text-gray-700">
                    Convert oven temperatures for international recipes. European recipes use Celsius; American recipes use Fahrenheit. Essential for accurate baking and cooking results.
                  </p>
                </div>

                <div className="bg-white border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-3">🔬 Science & Medicine</h3>
                  <p className="text-gray-700">
                    Scientific research uses Celsius. Medical professionals may need to convert body temperatures between scales for international patient records and research data.
                  </p>
                </div>

                <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">🏭 Industry & Engineering</h3>
                  <p className="text-gray-700">
                    Manufacturing specifications, HVAC systems, and engineering projects often require temperature conversions between metric and imperial systems.
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Reference Table */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Temperature Conversions
              </h2>
              <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
                    <tr>
                      <th className="p-4 text-left font-bold">Celsius (°C)</th>
                      <th className="p-4 text-left font-bold">Fahrenheit (°F)</th>
                      <th className="p-4 text-left font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-semibold">-40</td>
                      <td className="p-4 font-semibold">-40</td>
                      <td className="p-4 text-gray-700">Same temperature</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-semibold">0</td>
                      <td className="p-4 font-semibold">32</td>
                      <td className="p-4 text-gray-700">Water freezes</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-semibold">10</td>
                      <td className="p-4 font-semibold">50</td>
                      <td className="p-4 text-gray-700">Cool day</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-semibold">20</td>
                      <td className="p-4 font-semibold">68</td>
                      <td className="p-4 text-gray-700">Room temperature</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-semibold">37</td>
                      <td className="p-4 font-semibold">98.6</td>
                      <td className="p-4 text-gray-700">Body temperature</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-semibold">100</td>
                      <td className="p-4 font-semibold">212</td>
                      <td className="p-4 text-gray-700">Water boils</td>
                    </tr>
                  </tbody>
                </table>
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
                    Why do we add 32 when converting Celsius to Fahrenheit?
                  </h3>
                  <p className="text-gray-700">
                    The 32 represents the offset between the two scales' zero points. Water freezes at 0°C but 32°F, so we add 32 to account for this 32-degree difference in the starting points of the two scales.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What temperature is the same in both Celsius and Fahrenheit?
                  </h3>
                  <p className="text-gray-700">
                    -40° is the same in both scales: -40°C = -40°F. This is the only temperature where both scales intersect and show the same numerical value.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Which countries use Fahrenheit?
                  </h3>
                  <p className="text-gray-700">
                    Only a few countries use Fahrenheit: the United States, Bahamas, Belize, Cayman Islands, and Palau. The rest of the world uses Celsius as their standard temperature scale.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why is the conversion ratio 9/5 or 1.8?
                  </h3>
                  <p className="text-gray-700">
                    The ratio 9/5 (1.8) comes from the relationship between the scales. Fahrenheit has 180 degrees between water's freezing and boiling points (32°F to 212°F), while Celsius has 100 degrees (0°C to 100°C). The ratio 180/100 simplifies to 9/5.
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Conclusion
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Understanding temperature conversion between Celsius and Fahrenheit is a practical skill for international travel, cooking, science, and daily life. Whether you're checking the weather forecast in a foreign country, following an international recipe, or working on a scientific project, being able to quickly convert between these temperature scales is invaluable.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our Temperature Converter makes these conversions instant and accurate, with step-by-step solutions to help you understand the mathematics behind the conversion. Use this tool whenever you need reliable temperature conversion with detailed explanations!
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
              Need Help with Temperature Conversions and Math?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master temperature conversions, unit conversions, and excel in mathematics and science. Get personalized one-on-one guidance tailored to your learning style.
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
