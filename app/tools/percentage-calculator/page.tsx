'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Percent, Calculator } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function PercentageCalculatorPage() {
  const [mode, setMode] = useState<'what-is' | 'what-percent' | 'percent-change' | 'percent-of-total'>('what-is');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (isNaN(num1) || isNaN(num2)) {
      setResult('Please enter valid numbers');
      return;
    }

    let answer = '';
    switch (mode) {
      case 'what-is':
        // What is X% of Y?
        answer = ((num1 / 100) * num2).toFixed(2);
        setResult(`${num1}% of ${num2} = ${answer}`);
        break;
      case 'what-percent':
        // X is what % of Y?
        if (num2 === 0) {
          setResult('Cannot divide by zero');
          return;
        }
        answer = ((num1 / num2) * 100).toFixed(2);
        setResult(`${num1} is ${answer}% of ${num2}`);
        break;
      case 'percent-change':
        // Percentage change from X to Y
        if (num1 === 0) {
          setResult('Cannot calculate percentage change from zero');
          return;
        }
        answer = (((num2 - num1) / num1) * 100).toFixed(2);
        const change = parseFloat(answer) >= 0 ? 'increase' : 'decrease';
        setResult(`Percentage ${change}: ${Math.abs(parseFloat(answer))}%`);
        break;
      case 'percent-of-total':
        // X is what % of total Y?
        if (num2 === 0) {
          setResult('Cannot divide by zero');
          return;
        }
        answer = ((num1 / num2) * 100).toFixed(2);
        setResult(`${num1} is ${answer}% of total ${num2}`);
        break;
    }
  };

  const getPlaceholders = () => {
    switch (mode) {
      case 'what-is':
        return { p1: 'Percentage (e.g., 20)', p2: 'Value (e.g., 100)' };
      case 'what-percent':
        return { p1: 'Value (e.g., 50)', p2: 'Total (e.g., 200)' };
      case 'percent-change':
        return { p1: 'Original value (e.g., 100)', p2: 'New value (e.g., 150)' };
      case 'percent-of-total':
        return { p1: 'Part (e.g., 25)', p2: 'Whole (e.g., 100)' };
    }
  };

  const placeholders = getPlaceholders();

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
            <span className="text-gray-600">Percentage Calculator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Percent className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Percentage Calculator
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Calculate percentages instantly - Free percentage calculator
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            {/* Mode Selection */}
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Calculation Type
            </label>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => { setMode('what-is'); setResult(null); }}
                className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                  mode === 'what-is'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                What is X% of Y?
              </button>
              <button
                onClick={() => { setMode('what-percent'); setResult(null); }}
                className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                  mode === 'what-percent'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                X is what % of Y?
              </button>
              <button
                onClick={() => { setMode('percent-change'); setResult(null); }}
                className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                  mode === 'percent-change'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                % Change (X to Y)
              </button>
              <button
                onClick={() => { setMode('percent-of-total'); setResult(null); }}
                className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                  mode === 'percent-of-total'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                % of Total
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {mode === 'what-is' ? 'Percentage' : mode === 'percent-change' ? 'Original Value' : 'Value'}
                </label>
                <input
                  type="number"
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                  placeholder={placeholders.p1}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {mode === 'what-is' ? 'Of Value' : mode === 'percent-change' ? 'New Value' : 'Total/Whole'}
                </label>
                <input
                  type="number"
                  value={value2}
                  onChange={(e) => setValue2(e.target.value)}
                  placeholder={placeholders.p2}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                />
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Calculate
            </button>

            {result && (
              <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-lg">
                <p className="text-2xl font-bold text-gray-900 text-center">{result}</p>
              </div>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Uses</h3>
              <ul className="text-gray-700 text-sm leading-relaxed space-y-1">
                <li>• Calculate discounts and sales</li>
                <li>• Calculate tips and gratuity</li>
                <li>• Calculate tax amounts</li>
                <li>• Compare price changes</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Formula</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Percentage = (Part / Whole) × 100<br />
                Value = (Percentage / 100) × Whole<br />
                Change% = ((New - Old) / Old) × 100
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
