'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, ArrowLeftRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function UnitConverterPage() {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const units: Record<string, Record<string, number>> = {
    length: {
      meters: 1,
      kilometers: 0.001,
      centimeters: 100,
      millimeters: 1000,
      miles: 0.000621371,
      yards: 1.09361,
      feet: 3.28084,
      inches: 39.3701,
    },
    weight: {
      kilograms: 1,
      grams: 1000,
      milligrams: 1000000,
      pounds: 2.20462,
      ounces: 35.274,
      tons: 0.001,
    },
    temperature: {
      celsius: 'celsius',
      fahrenheit: 'fahrenheit',
      kelvin: 'kelvin',
    },
    volume: {
      liters: 1,
      milliliters: 1000,
      gallons: 0.264172,
      quarts: 1.05669,
      pints: 2.11338,
      cups: 4.22675,
    },
  };

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult('');
      return;
    }

    if (category === 'temperature') {
      let celsius = 0;
      if (fromUnit === 'celsius') celsius = val;
      else if (fromUnit === 'fahrenheit') celsius = (val - 32) * 5/9;
      else if (fromUnit === 'kelvin') celsius = val - 273.15;

      let output = 0;
      if (toUnit === 'celsius') output = celsius;
      else if (toUnit === 'fahrenheit') output = (celsius * 9/5) + 32;
      else if (toUnit === 'kelvin') output = celsius + 273.15;

      setResult(output.toFixed(2));
    } else {
      const baseValue = val / units[category][fromUnit];
      const convertedValue = baseValue * units[category][toUnit];
      setResult(convertedValue.toFixed(4));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/tools" className="text-[#1A3D7C] hover:text-[#2BAE66]">
              Tools
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Unit Converter</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <ArrowLeftRight className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Unit Converter
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Convert between units instantly - Free unit converter
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <label className="block text-lg font-semibold text-gray-900 mb-3">Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setFromUnit(Object.keys(units[e.target.value])[0]);
                setToUnit(Object.keys(units[e.target.value])[1]);
                setResult('');
              }}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 font-semibold mb-6"
            >
              <option value="length">Length</option>
              <option value="weight">Weight</option>
              <option value="temperature">Temperature</option>
              <option value="volume">Volume</option>
            </select>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 font-semibold"
                >
                  {Object.keys(units[category]).map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 font-semibold"
                >
                  {Object.keys(units[category]).map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>

            <input
              type="number"
              value={value}
              onChange={(e) => { setValue(e.target.value); convert(); }}
              placeholder="Enter value"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold mb-6"
            />

            {result && (
              <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-lg text-center">
                <p className="text-4xl font-bold text-gray-900">{result} {toUnit}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
