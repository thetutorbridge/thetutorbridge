'use client';

import { useState } from 'react';
import { Thermometer, ArrowRight, BookOpen, GraduationCap, Lightbulb, CheckCircle2, Info, ArrowLeftRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

interface ConversionResult {
  inputValue: number;
  outputValue: number;
  fromUnit: string;
  toUnit: string;
  formula: string;
  steps: string[];
}

export default function FahrenheitToCelsiusConverter() {
  const [temperature, setTemperature] = useState<string>('');
  const [conversionMode, setConversionMode] = useState<'ftoc' | 'ctof'>('ftoc');
  const [result, setResult] = useState<ConversionResult | null>(null);

  const convertTemperature = () => {
    const temp = parseFloat(temperature);

    if (isNaN(temp)) {
      alert('Please enter a valid number');
      return;
    }

    let outputValue: number;
    let steps: string[] = [];
    let formula: string;
    let fromUnit: string;
    let toUnit: string;

    if (conversionMode === 'ftoc') {
      // Fahrenheit to Celsius: °C = (°F − 32) × 5/9
      fromUnit = '°F';
      toUnit = '°C';
      formula = '°C = (°F − 32) × (5/9)';

      steps.push(`Given temperature: ${temp} °F`);
      steps.push(`Using the formula: °C = (°F − 32) × (5/9)`);
      steps.push(`Substitute the value: °C = (${temp} − 32) × (5/9)`);

      const step1 = temp - 32;
      steps.push(`Subtract 32: °C = ${step1} × (5/9)`);
      steps.push(`Multiply by 5/9: °C = ${step1} × 1.8`);

      outputValue = (temp - 32) * (5/9);
      steps.push(`Result: °C = ${outputValue.toFixed(2)}`);
    } else {
      // Celsius to Fahrenheit: °F = (°C × 9/5) + 32
      fromUnit = '°C';
      toUnit = '°F';
      formula = '°F = (°C × 9/5) + 32';

      steps.push(`Given temperature: ${temp} °C`);
      steps.push(`Using the formula: °F = (°C × 9/5) + 32`);
      steps.push(`Substitute the value: °F = (${temp} × 9/5) + 32`);

      const step1 = temp * (9/5);
      steps.push(`Multiply by 9/5: °F = ${step1.toFixed(2)} + 32`);

      outputValue = (temp * 9/5) + 32;
      steps.push(`Add 32: °F = ${outputValue.toFixed(2)}`);
    }

    setResult({
      inputValue: temp,
      outputValue,
      fromUnit,
      toUnit,
      formula,
      steps
    });
  };

  const clearCalculator = () => {
    setTemperature('');
    setResult(null);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Thermometer className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Fahrenheit to Celsius | °F to °C</h1>
            </div>
            <p className="text-xl text-center text-orange-100 max-w-3xl mx-auto">
              Convert temperature between Fahrenheit and Celsius with step-by-step solutions and conversion formulas
            </p>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-2 border-orange-200">
            <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-lg mb-6">
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                Convert Fahrenheit to Celsius
              </h2>
            </div>

            {/* Conversion Mode Toggle */}
            <div className="mb-6">
              <Label className="text-base font-semibold text-gray-700 mb-3 block">
                Conversion Mode
              </Label>
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="conversionMode"
                    value="ftoc"
                    checked={conversionMode === 'ftoc'}
                    onChange={(e) => setConversionMode(e.target.value as 'ftoc' | 'ctof')}
                    className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-lg font-medium text-gray-700">°F to °C</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="conversionMode"
                    value="ctof"
                    checked={conversionMode === 'ctof'}
                    onChange={(e) => setConversionMode(e.target.value as 'ftoc' | 'ctof')}
                    className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-lg font-medium text-gray-700">°C to °F</span>
                </label>
              </div>
            </div>

            {/* Input Field */}
            <div className="mb-6">
              <Label htmlFor="temperature" className="text-base font-semibold text-gray-700">
                Enter Temperature
              </Label>
              <div className="flex items-center mt-2">
                <Input
                  id="temperature"
                  type="number"
                  step="any"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  placeholder={conversionMode === 'ftoc' ? 'Enter °F' : 'Enter °C'}
                  className="text-lg"
                />
                <span className="ml-3 text-2xl font-bold text-gray-700">
                  {conversionMode === 'ftoc' ? '°F' : '°C'}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-6">
              <Button
                onClick={clearCalculator}
                variant="outline"
                className="flex-1 py-6 text-lg"
              >
                Clear
              </Button>
              <Button
                onClick={convertTemperature}
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 py-6 text-lg"
              >
                Calculate
              </Button>
            </div>

            {/* Results */}
            {result && (
              <div className="space-y-6">
                {/* Answer */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-200">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Answer:</h3>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-800">
                      {result.inputValue} {result.fromUnit} = {result.outputValue.toFixed(2)} {result.toUnit}
                    </p>
                  </div>
                </div>

                {/* Solution */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <CheckCircle2 className="h-6 w-6 mr-2 text-green-600" />
                    Solution
                  </h3>

                  {/* Formula */}
                  <div className="bg-white p-4 rounded-lg mb-4 border border-gray-200">
                    <p className="text-lg font-semibold text-center text-gray-800">
                      {result.formula}
                    </p>
                  </div>

                  {/* Step-by-Step */}
                  <div className="space-y-3">
                    {result.steps.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold text-sm mr-3">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Temperature Reference Table */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <Thermometer className="h-8 w-8 mr-3 text-orange-600" />
              Common Temperature Reference
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-orange-100 to-red-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Fahrenheit (°F)</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Celsius (°C)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">Absolute Zero</td>
                    <td className="px-6 py-4 text-center font-semibold">−459.67 °F</td>
                    <td className="px-6 py-4 text-center font-semibold">−273.15 °C</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">Freezing Point of Water</td>
                    <td className="px-6 py-4 text-center font-semibold">32 °F</td>
                    <td className="px-6 py-4 text-center font-semibold">0 °C</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">Room Temperature</td>
                    <td className="px-6 py-4 text-center font-semibold">68 °F</td>
                    <td className="px-6 py-4 text-center font-semibold">20 °C</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">Normal Body Temperature</td>
                    <td className="px-6 py-4 text-center font-semibold">98.6 °F</td>
                    <td className="px-6 py-4 text-center font-semibold">37 °C</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">Boiling Point of Water</td>
                    <td className="px-6 py-4 text-center font-semibold">212 °F</td>
                    <td className="px-6 py-4 text-center font-semibold">100 °C</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Educational Content */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <BookOpen className="h-8 w-8 mr-3 text-orange-600" />
              Understanding Temperature Conversion
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                Temperature conversion between Fahrenheit and Celsius is essential in daily life, science, cooking, travel,
                and many other areas. Understanding how these temperature scales relate to each other helps you navigate
                between different measurement systems used around the world.
              </p>

              <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Conversion Formulas</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-2">Fahrenheit to Celsius</p>
                    <p className="text-2xl font-bold text-orange-600">°C = (°F − 32) × 5/9</p>
                    <p className="text-sm text-gray-600 mt-2">or</p>
                    <p className="text-2xl font-bold text-orange-600">°C = (°F − 32) ÷ 1.8</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-2">Celsius to Fahrenheit</p>
                    <p className="text-2xl font-bold text-red-600">°F = (°C × 9/5) + 32</p>
                    <p className="text-sm text-gray-600 mt-2">or</p>
                    <p className="text-2xl font-bold text-red-600">°F = (°C × 1.8) + 32</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">History of Temperature Scales</h3>
              <p className="text-gray-700 mb-4">
                The Fahrenheit and Celsius scales have fascinating historical backgrounds that explain their seemingly
                arbitrary reference points.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
                  <h4 className="text-lg font-bold text-orange-900 mb-2">Fahrenheit Scale</h4>
                  <p className="text-gray-700 mb-3">
                    Created by Daniel Gabriel Fahrenheit in 1724, this scale was based on three reference points:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>0 °F: Temperature of a mixture of ice, water, and ammonium chloride</li>
                    <li>32 °F: Freezing point of water</li>
                    <li>96 °F: Approximate human body temperature (later refined to 98.6 °F)</li>
                  </ul>
                  <p className="text-gray-700 mt-3">
                    Primarily used in the United States, Bahamas, Belize, Cayman Islands, and Palau.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <h4 className="text-lg font-bold text-blue-900 mb-2">Celsius Scale</h4>
                  <p className="text-gray-700 mb-3">
                    Developed by Anders Celsius in 1742, this scale is based on the properties of water:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>0 °C: Freezing point of water at standard atmospheric pressure</li>
                    <li>100 °C: Boiling point of water at standard atmospheric pressure</li>
                  </ul>
                  <p className="text-gray-700 mt-3">
                    Used by most countries worldwide and is the standard in scientific contexts. Also called centigrade
                    because of the 100-degree interval between freezing and boiling points.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">How to Convert Fahrenheit to Celsius</h3>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-bold text-gray-800 mb-3">Step-by-Step Process</h4>
                <ol className="list-decimal list-inside text-gray-700 space-y-3">
                  <li>
                    <strong>Start with the Fahrenheit temperature:</strong> Identify the temperature value in degrees
                    Fahrenheit that you want to convert.
                  </li>
                  <li>
                    <strong>Subtract 32:</strong> The freezing point of water is 32 °F (0 °C), so we first adjust for
                    this offset. This gives you the temperature above the freezing point.
                  </li>
                  <li>
                    <strong>Multiply by 5/9 (or divide by 1.8):</strong> The Celsius scale has 100 degrees between
                    freezing and boiling, while Fahrenheit has 180 degrees. The ratio 5/9 (or approximately 0.5556)
                    accounts for this difference in scale size.
                  </li>
                  <li>
                    <strong>Round to desired precision:</strong> Temperature is typically expressed to one or two
                    decimal places depending on the context.
                  </li>
                </ol>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Conversion Examples</h3>

              <div className="space-y-6">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-purple-900 mb-3">Example 1: Converting 77 °F to Celsius</h4>
                  <div className="bg-white p-4 rounded border border-purple-200">
                    <p className="text-gray-700 mb-2"><strong>Given:</strong> 77 °F</p>
                    <p className="text-gray-700 mb-2"><strong>Formula:</strong> °C = (°F − 32) × 5/9</p>
                    <p className="text-gray-700 mb-2">°C = (77 − 32) × 5/9</p>
                    <p className="text-gray-700 mb-2">°C = 45 × 5/9</p>
                    <p className="text-gray-700 mb-2">°C = 225/9</p>
                    <p className="text-gray-700"><strong>°C = 25</strong></p>
                    <p className="text-gray-600 mt-3 text-sm">
                      Therefore, 77 °F is equal to 25 °C, which is a pleasant room temperature.
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-purple-900 mb-3">Example 2: Converting 5 °F to Celsius</h4>
                  <div className="bg-white p-4 rounded border border-purple-200">
                    <p className="text-gray-700 mb-2"><strong>Given:</strong> 5 °F</p>
                    <p className="text-gray-700 mb-2"><strong>Formula:</strong> °C = (°F − 32) × 5/9</p>
                    <p className="text-gray-700 mb-2">°C = (5 − 32) × 5/9</p>
                    <p className="text-gray-700 mb-2">°C = −27 × 5/9</p>
                    <p className="text-gray-700 mb-2">°C = −135/9</p>
                    <p className="text-gray-700"><strong>°C = −15</strong></p>
                    <p className="text-gray-600 mt-3 text-sm">
                      Therefore, 5 °F equals −15 °C, which is well below freezing.
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-purple-900 mb-3">Example 3: Converting 98.6 °F to Celsius (Body Temperature)</h4>
                  <div className="bg-white p-4 rounded border border-purple-200">
                    <p className="text-gray-700 mb-2"><strong>Given:</strong> 98.6 °F</p>
                    <p className="text-gray-700 mb-2"><strong>Formula:</strong> °C = (°F − 32) × 5/9</p>
                    <p className="text-gray-700 mb-2">°C = (98.6 − 32) × 5/9</p>
                    <p className="text-gray-700 mb-2">°C = 66.6 × 5/9</p>
                    <p className="text-gray-700 mb-2">°C = 333/9</p>
                    <p className="text-gray-700"><strong>°C = 37</strong></p>
                    <p className="text-gray-600 mt-3 text-sm">
                      Normal human body temperature is 98.6 °F or 37 °C.
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-purple-900 mb-3">Example 4: Converting 212 °F to Celsius (Boiling Point)</h4>
                  <div className="bg-white p-4 rounded border border-purple-200">
                    <p className="text-gray-700 mb-2"><strong>Given:</strong> 212 °F</p>
                    <p className="text-gray-700 mb-2"><strong>Formula:</strong> °C = (°F − 32) × 5/9</p>
                    <p className="text-gray-700 mb-2">°C = (212 − 32) × 5/9</p>
                    <p className="text-gray-700 mb-2">°C = 180 × 5/9</p>
                    <p className="text-gray-700 mb-2">°C = 900/9</p>
                    <p className="text-gray-700"><strong>°C = 100</strong></p>
                    <p className="text-gray-600 mt-3 text-sm">
                      Water boils at 212 °F or 100 °C at standard atmospheric pressure.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">How to Convert Celsius to Fahrenheit</h3>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-bold text-gray-800 mb-3">Step-by-Step Process</h4>
                <ol className="list-decimal list-inside text-gray-700 space-y-3">
                  <li>
                    <strong>Start with the Celsius temperature:</strong> Identify the temperature value in degrees
                    Celsius that you want to convert.
                  </li>
                  <li>
                    <strong>Multiply by 9/5 (or 1.8):</strong> This accounts for the difference in scale size between
                    Celsius (100 degrees between freezing and boiling) and Fahrenheit (180 degrees).
                  </li>
                  <li>
                    <strong>Add 32:</strong> This adjusts for the offset between the two scales' zero points.
                  </li>
                  <li>
                    <strong>Round to desired precision:</strong> Express the result to appropriate decimal places.
                  </li>
                </ol>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Real-World Applications</h3>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
                  <h4 className="text-lg font-bold text-orange-900 mb-2">Cooking and Baking</h4>
                  <p className="text-gray-700">
                    Recipe temperatures often need conversion between systems. Oven temperatures, meat doneness, and
                    candy-making stages all rely on accurate temperature measurements.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                  <h4 className="text-lg font-bold text-green-900 mb-2">International Travel</h4>
                  <p className="text-gray-700">
                    Weather forecasts use different scales in different countries. Understanding both scales helps you
                    prepare appropriate clothing and activities when traveling.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <h4 className="text-lg font-bold text-blue-900 mb-2">Healthcare</h4>
                  <p className="text-gray-700">
                    Body temperature monitoring for fever detection requires knowing both scales, as medical equipment
                    may use either system depending on the country.
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
                  <h4 className="text-lg font-bold text-purple-900 mb-2">Science and Engineering</h4>
                  <p className="text-gray-700">
                    While Celsius (and Kelvin) is standard in scientific work, some engineering applications still use
                    Fahrenheit, requiring conversion between systems.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Quick Mental Approximation Methods</h3>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-bold text-yellow-900 mb-3">Fahrenheit to Celsius (Rough Estimate)</h4>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Subtract 30 (instead of 32)</li>
                  <li>Divide by 2 (instead of multiplying by 5/9)</li>
                </ol>
                <p className="text-gray-600 mt-3 text-sm italic">
                  Example: 68 °F → (68 - 30) ÷ 2 = 19 °C (actual: 20 °C)
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-bold text-yellow-900 mb-3">Celsius to Fahrenheit (Rough Estimate)</h4>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Double the Celsius temperature</li>
                  <li>Add 30 (instead of 32)</li>
                </ol>
                <p className="text-gray-600 mt-3 text-sm italic">
                  Example: 20 °C → (20 × 2) + 30 = 70 °F (actual: 68 °F)
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Common Mistakes to Avoid</h3>

              <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6">
                <h4 className="text-lg font-bold text-red-900 mb-3">Watch Out For These Errors:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-3">
                  <li>
                    <strong>Forgetting to subtract 32 first:</strong> When converting Fahrenheit to Celsius, always
                    subtract 32 before multiplying by 5/9, not after.
                  </li>
                  <li>
                    <strong>Forgetting to add 32 last:</strong> When converting Celsius to Fahrenheit, add 32 after
                    multiplying by 9/5, not before.
                  </li>
                  <li>
                    <strong>Using the wrong fraction:</strong> Use 5/9 for °F to °C, and 9/5 for °C to °F. Reversing
                    these will give incorrect results.
                  </li>
                  <li>
                    <strong>Rounding too early:</strong> Complete all calculations first, then round the final result
                    to avoid accumulating rounding errors.
                  </li>
                  <li>
                    <strong>Confusing the formulas:</strong> Remember that °C = (°F − 32) × 5/9 and
                    °F = (°C × 9/5) + 32. The operations are in different orders.
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Understanding the Math Behind the Formulas</h3>
              <p className="text-gray-700 mb-4">
                The conversion formulas derive from the relationship between the two scales:
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Key Observations</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Both scales have different zero points (0 °F ≠ 0 °C)</li>
                  <li>The scales have different "degree sizes" or intervals</li>
                  <li>100 Celsius degrees = 180 Fahrenheit degrees (from 0 °C to 100 °C = 32 °F to 212 °F)</li>
                  <li>The ratio 100:180 simplifies to 5:9</li>
                  <li>The freezing point offset is 32 °F</li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Temperature Scales Around the World</h3>
              <p className="text-gray-700 mb-4">
                Understanding which countries use which scale helps in international communication:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <h4 className="text-lg font-bold text-blue-900 mb-2">Countries Using Celsius</h4>
                  <p className="text-gray-700 mb-2">
                    Most countries worldwide use Celsius, including:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>All of Europe</li>
                    <li>All of Asia</li>
                    <li>All of Africa</li>
                    <li>All of South America</li>
                    <li>Australia and New Zealand</li>
                    <li>Canada (officially, though Fahrenheit is sometimes used)</li>
                  </ul>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
                  <h4 className="text-lg font-bold text-orange-900 mb-2">Countries Using Fahrenheit</h4>
                  <p className="text-gray-700 mb-2">
                    Only a few countries primarily use Fahrenheit:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>United States</li>
                    <li>Bahamas</li>
                    <li>Belize</li>
                    <li>Cayman Islands</li>
                    <li>Palau</li>
                  </ul>
                  <p className="text-gray-700 mt-3 text-sm italic">
                    Even in these countries, scientific contexts typically use Celsius.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Kelvin: The Scientific Temperature Scale</h3>
              <p className="text-gray-700 mb-4">
                While Celsius and Fahrenheit are most common in daily life, scientists often use Kelvin, which starts
                at absolute zero (the coldest possible temperature).
              </p>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-5 mb-6">
                <h4 className="text-lg font-bold text-purple-900 mb-2">Kelvin Conversions</h4>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Celsius to Kelvin:</strong> K = °C + 273.15</p>
                  <p><strong>Fahrenheit to Kelvin:</strong> K = (°F + 459.67) × 5/9</p>
                  <p className="mt-3 text-sm italic">Note: Kelvin doesn't use the degree symbol (°).</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6 mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                  <Lightbulb className="h-6 w-6 mr-2 text-yellow-600" />
                  Key Takeaways
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Fahrenheit and Celsius measure temperature using different reference points and scales</li>
                  <li>Use °C = (°F − 32) × 5/9 to convert Fahrenheit to Celsius</li>
                  <li>Use °F = (°C × 9/5) + 32 to convert Celsius to Fahrenheit</li>
                  <li>Water freezes at 32 °F / 0 °C and boils at 212 °F / 100 °C</li>
                  <li>Most of the world uses Celsius; the US primarily uses Fahrenheit</li>
                  <li>For quick estimates, subtract 30 and divide by 2 (°F to °C) or double and add 30 (°C to °F)</li>
                  <li>Always perform operations in the correct order to get accurate results</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <Info className="h-8 w-8 mr-3 text-orange-600" />
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                  What is the fastest way to convert Fahrenheit to Celsius?
                </summary>
                <p className="text-gray-700 mt-3">
                  The exact formula is °C = (°F − 32) × 5/9. For a quick mental estimate, subtract 30 and divide by 2.
                  For example, 70 °F → (70 - 30) ÷ 2 = 20 °C (actual answer: 21.1 °C). This approximation is useful for
                  everyday situations where precision isn't critical.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                  Why does the US use Fahrenheit instead of Celsius?
                </summary>
                <p className="text-gray-700 mt-3">
                  The United States adopted the Fahrenheit scale early in its history and has continued using it due to
                  tradition and the cost of switching all infrastructure, education materials, and consumer products.
                  However, American scientists and many industries do use Celsius and the metric system.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                  At what temperature are Fahrenheit and Celsius the same?
                </summary>
                <p className="text-gray-700 mt-3">
                  The two scales intersect at −40 degrees. That is, −40 °F = −40 °C. This can be proven algebraically by
                  setting °F = °C in the conversion formula and solving for the temperature value.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                  Is there a temperature where Celsius and Fahrenheit readings are exactly opposite?
                </summary>
                <p className="text-gray-700 mt-3">
                  Yes! At 11.428571 °C, the Fahrenheit reading is 52.571429 °F. These aren't exact opposites, but the
                  closest relationship is that certain pairs of values have interesting mathematical relationships.
                  However, there's no simple "opposite" relationship between the scales.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                  Which temperature scale is more accurate?
                </summary>
                <p className="text-gray-700 mt-3">
                  Both scales are equally accurate—they're just different ways of measuring the same physical property.
                  Neither is inherently more precise than the other. However, Celsius has advantages in scientific work
                  because it's based on the properties of water and aligns with the Kelvin scale (just add 273.15).
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                  Why is body temperature 98.6 °F instead of a round number?
                </summary>
                <p className="text-gray-700 mt-3">
                  The value 98.6 °F comes from converting 37 °C to Fahrenheit. Carl Wunderlich, a German physician,
                  determined that normal body temperature was 37 °C in the 1860s. When converted to Fahrenheit,
                  37 °C × 9/5 + 32 = 98.6 °F. The Celsius version is the round number; Fahrenheit just reflects the
                  conversion.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                  How do I convert oven temperatures for recipes?
                </summary>
                <p className="text-gray-700 mt-3">
                  Use the standard conversion formula, but be aware that most ovens have temperature variations of ±25 °F
                  anyway. Common conversions: 350 °F = 175 °C, 375 °F = 190 °C, 400 °F = 200 °C, 425 °F = 220 °C,
                  450 °F = 230 °C. Many modern recipes list both temperatures.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                  Can I use this converter for negative temperatures?
                </summary>
                <p className="text-gray-700 mt-3">
                  Yes! The conversion formulas work perfectly for negative temperatures. For example, −40 °F = −40 °C,
                  and 0 °F = −17.78 °C. Cold temperatures often need conversion for winter weather forecasts and frozen
                  storage requirements.
                </p>
              </details>
            </div>
          </div>

          {/* Book Your Session CTA */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl shadow-lg p-8 text-white text-center">
            <GraduationCap className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Need Help with Math or Science?</h2>
            <p className="text-xl text-orange-100 mb-6 max-w-2xl mx-auto">
              Our expert tutors can help you master temperature conversion, unit conversions, and all aspects of math and
              science. Get personalized one-on-one instruction tailored to your learning style.
            </p>
            <Link href="https://www.thetutorbridge.com/book-session">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8 py-6 h-auto font-semibold"
              >
                Book Your Session Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
