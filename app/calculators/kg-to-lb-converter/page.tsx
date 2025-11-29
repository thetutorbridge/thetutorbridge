'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, BookOpen, ArrowRight, Scale, ArrowLeftRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ConversionResult {
  inputValue: number;
  outputValue: number;
  fromUnit: string;
  toUnit: string;
  formula: string;
  steps: string[];
  additionalConversions: {
    grams: number;
    ounces: number;
    stones?: number;
  };
}

// Conversion constants
const KG_TO_LB = 2.20462262185;
const LB_TO_KG = 0.45359237;
const KG_TO_G = 1000;
const LB_TO_OZ = 16;

export default function KgToLbConverter() {
  const [weight, setWeight] = useState<string>('');
  const [conversionMode, setConversionMode] = useState<'kgtolb' | 'lbtokg'>('kgtolb');
  const [result, setResult] = useState<ConversionResult | null>(null);

  const convertWeight = () => {
    const inputWeight = parseFloat(weight);

    if (isNaN(inputWeight)) {
      alert('Please enter a valid number');
      return;
    }

    if (inputWeight < 0) {
      alert('Please enter a positive number');
      return;
    }

    let outputWeight: number;
    let steps: string[];
    let formula: string;
    let additionalConversions: ConversionResult['additionalConversions'];

    if (conversionMode === 'kgtolb') {
      // Kilograms to Pounds: lb = kg × 2.20462
      outputWeight = inputWeight * KG_TO_LB;
      formula = 'lb = kg × 2.20462';
      steps = [
        `Formula: lb = kg × 2.20462`,
        '',
        `Given: ${inputWeight} kg`,
        '',
        `Step 1: Multiply kilograms by the conversion factor`,
        `${inputWeight} kg × 2.20462 = ${outputWeight.toFixed(6)} lb`,
        '',
        `Step 2: Round to practical precision`,
        `${outputWeight.toFixed(6)} lb ≈ ${outputWeight.toFixed(4)} lb`,
        '',
        `Result: ${inputWeight} kg = ${outputWeight.toFixed(4)} lb`,
      ];
      additionalConversions = {
        grams: inputWeight * KG_TO_G,
        ounces: outputWeight * LB_TO_OZ,
        stones: outputWeight / 14,
      };
    } else {
      // Pounds to Kilograms: kg = lb × 0.453592
      outputWeight = inputWeight * LB_TO_KG;
      formula = 'kg = lb × 0.453592';
      steps = [
        `Formula: kg = lb × 0.453592`,
        '',
        `Given: ${inputWeight} lb`,
        '',
        `Step 1: Multiply pounds by the conversion factor`,
        `${inputWeight} lb × 0.453592 = ${outputWeight.toFixed(6)} kg`,
        '',
        `Step 2: Round to practical precision`,
        `${outputWeight.toFixed(6)} kg ≈ ${outputWeight.toFixed(4)} kg`,
        '',
        `Result: ${inputWeight} lb = ${outputWeight.toFixed(4)} kg`,
      ];
      additionalConversions = {
        grams: outputWeight * KG_TO_G,
        ounces: inputWeight * LB_TO_OZ,
      };
    }

    setResult({
      inputValue: inputWeight,
      outputValue: outputWeight,
      fromUnit: conversionMode === 'kgtolb' ? 'kg' : 'lb',
      toUnit: conversionMode === 'kgtolb' ? 'lb' : 'kg',
      formula,
      steps,
      additionalConversions,
    });
  };

  const handleClear = () => {
    setWeight('');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-teal-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-teal-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Kg to Lb Converter</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Scale className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Kg to Lb Converter
            </h1>
            <p className="text-lg md:text-xl text-teal-100 max-w-2xl mx-auto leading-relaxed">
              Convert weight between kilograms (kg) and pounds (lb) with step-by-step solutions and conversion formulas.
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
                <div className="bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-xl p-4 mb-6 text-center">
                  <h2 className="text-xl md:text-2xl font-bold">
                    Convert {conversionMode === 'kgtolb' ? 'Kilograms to Pounds' : 'Pounds to Kilograms'}
                  </h2>
                </div>

                {/* Conversion Mode Toggle */}
                <div className="mb-6 flex items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setConversionMode('kgtolb');
                      setResult(null);
                    }}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      conversionMode === 'kgtolb'
                        ? 'bg-gradient-to-r from-teal-600 to-green-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    kg to lb
                  </button>
                  <button
                    onClick={() => {
                      setConversionMode('lbtokg');
                      setResult(null);
                    }}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      conversionMode === 'lbtokg'
                        ? 'bg-gradient-to-r from-teal-600 to-green-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    lb to kg
                  </button>
                </div>

                {/* Input Field */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="weight" className="text-sm font-semibold text-gray-700 mb-3 block">
                      Enter Weight
                    </Label>
                    <div className="relative">
                      <Input
                        id="weight"
                        type="number"
                        placeholder="e.g., 70"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="text-center text-2xl font-medium border-2 pr-16"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            convertWeight();
                          }
                        }}
                        min="0"
                        step="any"
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-gray-500">
                        {conversionMode === 'kgtolb' ? 'kg' : 'lb'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={convertWeight}
                    className="flex-1 bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Convert
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
                <div className="mt-6 p-4 bg-gradient-to-br from-teal-50 to-green-50 rounded-xl">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Common Conversions:</h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>• 1 kg = 2.205 lb</p>
                    <p>• 5 kg = 11.023 lb</p>
                    <p>• 10 kg = 22.046 lb</p>
                    <p>• 1 lb = 0.454 kg</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section (Right Side - 3 columns) */}
            <div className="lg:col-span-3">
              {result ? (
                <div className="space-y-6">
                  {/* Answer Card */}
                  <div className="bg-gradient-to-br from-teal-600 to-green-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4">Answer</h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <div className="text-center">
                        <p className="text-5xl md:text-6xl font-bold mb-2">
                          {result.inputValue} {result.fromUnit} = {result.outputValue.toFixed(4)} {result.toUnit}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Conversions */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Additional Conversions
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-teal-50 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-600 mb-1">Grams</p>
                        <p className="text-xl font-bold text-teal-600">
                          {result.additionalConversions.grams.toFixed(2)} g
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-600 mb-1">Ounces</p>
                        <p className="text-xl font-bold text-green-600">
                          {result.additionalConversions.ounces.toFixed(2)} oz
                        </p>
                      </div>
                      {result.additionalConversions.stones !== undefined && (
                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                          <p className="text-sm text-gray-600 mb-1">Stones</p>
                          <p className="text-xl font-bold text-blue-600">
                            {result.additionalConversions.stones.toFixed(2)} st
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Formula Display */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Conversion Formula
                    </h3>
                    <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6 text-center">
                      <p className="text-2xl md:text-3xl font-bold text-gray-900">
                        {result.formula}
                      </p>
                      {conversionMode === 'kgtolb' ? (
                        <div className="mt-4 text-gray-700">
                          <p className="text-sm">Multiply kilograms by 2.20462 to get pounds</p>
                          <p className="text-xs mt-2 text-gray-500">1 kilogram = 2.20462262185 pounds (exact)</p>
                        </div>
                      ) : (
                        <div className="mt-4 text-gray-700">
                          <p className="text-sm">Multiply pounds by 0.453592 to get kilograms</p>
                          <p className="text-xs mt-2 text-gray-500">1 pound = 0.45359237 kilograms (exact)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step-by-Step Solution */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-teal-600" />
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

                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    Enter a weight and click Convert
                  </p>
                  <p className="text-gray-400 text-sm">
                    Convert between kilograms and pounds with step-by-step solutions
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

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Understanding Kilogram to Pound Conversion
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The kilogram (kg) and pound (lb) are two of the most commonly used units of mass in the world. Kilograms are the standard unit of mass in the International System of Units (SI) and are used by most countries worldwide. Pounds, on the other hand, are part of the imperial system and are primarily used in the United States, United Kingdom (for body weight), and a few other countries.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Converting between kilograms and pounds is essential in many everyday situations, from understanding your body weight when traveling internationally to converting product weights for shipping or cooking. Our Kg to Lb Converter provides instant, accurate conversions with complete step-by-step solutions.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you're a fitness enthusiast tracking your weight, a chef following international recipes, or a business professional dealing with international shipping, understanding how to convert between these units is invaluable. This converter makes it simple and provides the mathematical steps so you can understand the conversion process.
              </p>
            </section>

            {/* Conversion Formulas */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Weight Conversion Formulas
              </h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-teal-700 mb-4">Kilograms to Pounds</h3>
                  <div className="bg-white rounded-lg p-6">
                    <p className="text-2xl font-bold text-center mb-4">
                      lb = kg × 2.20462
                    </p>
                    <p className="text-center text-gray-700 mb-4">or more precisely</p>
                    <p className="text-2xl font-bold text-center">
                      lb = kg × 2.20462262185
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="font-bold text-gray-900 mb-2">Example: Convert 75 kg to pounds</p>
                      <p className="text-gray-700 font-mono text-sm">lb = 75 × 2.20462</p>
                      <p className="text-gray-700 font-mono text-sm">lb = 165.3465</p>
                      <p className="text-gray-700 font-mono text-sm font-bold">75 kg = 165.35 lb (rounded)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">Pounds to Kilograms</h3>
                  <div className="bg-white rounded-lg p-6">
                    <p className="text-2xl font-bold text-center mb-4">
                      kg = lb × 0.453592
                    </p>
                    <p className="text-center text-gray-700 mb-4">or more precisely</p>
                    <p className="text-2xl font-bold text-center">
                      kg = lb × 0.45359237
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="font-bold text-gray-900 mb-2">Example: Convert 150 lb to kilograms</p>
                      <p className="text-gray-700 font-mono text-sm">kg = 150 × 0.453592</p>
                      <p className="text-gray-700 font-mono text-sm">kg = 68.0388</p>
                      <p className="text-gray-700 font-mono text-sm font-bold">150 lb = 68.04 kg (rounded)</p>
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
              <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Select Conversion Direction:</strong>
                      <p className="text-gray-700 mt-1">Choose "kg to lb" to convert kilograms to pounds, or "lb to kg" to convert pounds to kilograms.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Enter Weight Value:</strong>
                      <p className="text-gray-700 mt-1">Type the weight you want to convert. Accepts positive numbers including decimals.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Click Convert:</strong>
                      <p className="text-gray-700 mt-1">Press the Convert button or hit Enter to see the converted weight with step-by-step solution and additional unit conversions.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* Understanding the Units */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Understanding Weight Units
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-teal-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-teal-600 mb-4">Kilogram (kg)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• SI base unit of mass</li>
                    <li>• Used worldwide (metric system)</li>
                    <li>• 1 kg = 1,000 grams</li>
                    <li>• Defined by Planck constant</li>
                    <li>• Standard for science and trade</li>
                    <li>• Used in most countries</li>
                  </ul>
                </div>
                <div className="bg-white border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-600 mb-4">Pound (lb)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Imperial/US customary unit</li>
                    <li>• Used in US and UK (body weight)</li>
                    <li>• 1 lb = 16 ounces</li>
                    <li>• Symbol "lb" from Latin "libra"</li>
                    <li>• 14 pounds = 1 stone (UK)</li>
                    <li>• Common in everyday US usage</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Quick Reference Table */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Weight Conversions
              </h2>
              <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-teal-600 to-green-600 text-white">
                    <tr>
                      <th className="p-4 text-left font-bold">Kilograms (kg)</th>
                      <th className="p-4 text-left font-bold">Pounds (lb)</th>
                      <th className="p-4 text-left font-bold">Common Use</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-semibold">0.5</td>
                      <td className="p-4 font-semibold">1.10</td>
                      <td className="p-4 text-gray-700">Small package</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-semibold">1</td>
                      <td className="p-4 font-semibold">2.20</td>
                      <td className="p-4 text-gray-700">Bag of sugar</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-semibold">5</td>
                      <td className="p-4 font-semibold">11.02</td>
                      <td className="p-4 text-gray-700">Bag of flour</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-semibold">10</td>
                      <td className="p-4 font-semibold">22.05</td>
                      <td className="p-4 text-gray-700">Carry-on bag</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-semibold">50</td>
                      <td className="p-4 font-semibold">110.23</td>
                      <td className="p-4 text-gray-700">Child's weight</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-semibold">70</td>
                      <td className="p-4 font-semibold">154.32</td>
                      <td className="p-4 text-gray-700">Average adult</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-semibold">100</td>
                      <td className="p-4 font-semibold">220.46</td>
                      <td className="p-4 text-gray-700">Larger adult</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Applications
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-teal-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-teal-600 mb-3">Travel & Luggage</h3>
                  <p className="text-gray-700">
                    Airlines often have weight limits in different units. US carriers may use pounds while international airlines use kilograms. Convert your luggage weight to avoid excess baggage fees when traveling internationally.
                  </p>
                </div>

                <div className="bg-white border-2 border-green-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-600 mb-3">Fitness & Health</h3>
                  <p className="text-gray-700">
                    Gym equipment in the US often displays weights in pounds, while bodyweight scales might use kilograms. Understanding conversions helps you track progress regardless of the equipment used.
                  </p>
                </div>

                <div className="bg-white border-2 border-teal-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-teal-600 mb-3">Cooking & Recipes</h3>
                  <p className="text-gray-700">
                    International recipes often specify ingredients in kilograms or grams, while American recipes use pounds and ounces. Converting accurately ensures your dishes turn out perfectly.
                  </p>
                </div>

                <div className="bg-white border-2 border-green-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-600 mb-3">Shipping & Commerce</h3>
                  <p className="text-gray-700">
                    International shipping requires weight declarations in specific units. Accurate conversions are essential for customs declarations, shipping costs, and compliance with regulations.
                  </p>
                </div>

                <div className="bg-white border-2 border-teal-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-teal-600 mb-3">Medical & Healthcare</h3>
                  <p className="text-gray-700">
                    Patient weights are recorded in different units depending on the country. Accurate conversions are crucial for medication dosing, which is often calculated based on body weight.
                  </p>
                </div>

                <div className="bg-white border-2 border-green-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-600 mb-3">Sports & Athletics</h3>
                  <p className="text-gray-700">
                    Boxing, wrestling, and other sports have weight classes. Athletes competing internationally need to understand weight limits in both measurement systems.
                  </p>
                </div>
              </div>
            </section>

            {/* Tips and Tricks */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Quick Mental Conversion Tips
              </h2>
              <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6">
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <div>
                      <strong>Double and add 10%:</strong> For kg to lb, double the kg value and add 10% for a quick estimate. (e.g., 50 kg → 100 + 10 = 110 lb, actual: 110.23 lb)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    <div>
                      <strong>Halve and subtract 10%:</strong> For lb to kg, halve the lb value and subtract 10% from that. (e.g., 100 lb → 50 - 5 = 45 kg, actual: 45.36 kg)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    <div>
                      <strong>Remember key values:</strong> Memorize that 1 kg ≈ 2.2 lb and 1 lb ≈ 0.45 kg for quick reference.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    <div>
                      <strong>Use anchor points:</strong> Know common weights like 50 kg = 110 lb, 70 kg = 154 lb, 100 kg = 220 lb.
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* History of Units */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                History of Weight Units
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  The <strong>kilogram</strong> was originally defined in 1795 during the French Revolution as the mass of one liter of water at its freezing point. It was redefined in 1799 as the mass of the International Prototype of the Kilogram (IPK), a platinum-iridium cylinder kept in France. In 2019, the kilogram was redefined based on the Planck constant, making it a truly universal measurement.
                </p>
                <p className="mb-4">
                  The <strong>pound</strong> has ancient origins, with the word coming from the Latin "libra pondo" meaning "a pound by weight." Various pound standards existed throughout history, but the modern avoirdupois pound (used for most weighing) was standardized in 1959 by international agreement as exactly 0.45359237 kilograms.
                </p>
                <p>
                  Today, while most of the world uses the metric system with kilograms as the standard unit of mass, the United States remains the largest country still primarily using pounds for everyday measurements. The UK uses a mix, with kilograms for most purposes but pounds and stones still common for body weight.
                </p>
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
                    How many pounds are in a kilogram?
                  </h3>
                  <p className="text-gray-700">
                    One kilogram equals approximately 2.20462 pounds. For most practical purposes, you can use 2.2 as the conversion factor. The exact value is 2.20462262185 pounds per kilogram.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How many kilograms are in a pound?
                  </h3>
                  <p className="text-gray-700">
                    One pound equals exactly 0.45359237 kilograms (by international definition). For everyday use, 0.45 or 0.454 provides sufficient accuracy.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why is it kg to lbs (plural) not kg to lb?
                  </h3>
                  <p className="text-gray-700">
                    Both "lb" and "lbs" are correct abbreviations for pounds. "Lb" is technically correct as it comes from the Latin "libra," but "lbs" is commonly used in informal writing to indicate plural. The official symbol is "lb" for both singular and plural.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Is there a difference between weight and mass?
                  </h3>
                  <p className="text-gray-700">
                    Technically, mass (measured in kilograms) is the amount of matter in an object, while weight is the force of gravity on that mass. However, on Earth's surface, the terms are often used interchangeably since the gravitational force is constant.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do I convert my body weight from kg to lbs?
                  </h3>
                  <p className="text-gray-700">
                    Simply multiply your weight in kilograms by 2.205. For example, if you weigh 70 kg, your weight in pounds is 70 × 2.205 = 154.35 lbs. Use our calculator above for precise conversions.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is a stone and how does it relate to pounds?
                  </h3>
                  <p className="text-gray-700">
                    A stone is a British unit of weight equal to 14 pounds (6.35 kg). It's commonly used in the UK and Ireland for measuring body weight. For example, a person weighing 150 pounds would be 10 stone 10 pounds.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Which countries use pounds vs. kilograms?
                  </h3>
                  <p className="text-gray-700">
                    The United States, Liberia, and Myanmar are the only countries that haven't officially adopted the metric system. The UK uses a mix, with most commerce in metric but personal weight often still expressed in stones and pounds.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How accurate is this converter?
                  </h3>
                  <p className="text-gray-700">
                    Our converter uses the internationally recognized exact conversion factor (1 lb = 0.45359237 kg). The results are accurate to many decimal places, far beyond what's needed for any practical application.
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
                Understanding how to convert between kilograms and pounds is an essential skill in our globally connected world. Whether you're traveling internationally, following fitness programs, cooking with international recipes, or conducting business across borders, this conversion knowledge proves invaluable.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our Kg to Lb Converter makes these conversions instant and accurate, with step-by-step solutions to help you understand the mathematics behind the conversion. Use this tool whenever you need reliable weight conversion with detailed explanations, and bookmark it for easy access whenever you need to convert between metric and imperial weight units!
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
              Need Help with Unit Conversions and Math?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master unit conversions, measurement systems, and excel in mathematics and science. Get personalized one-on-one guidance tailored to your learning style.
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
