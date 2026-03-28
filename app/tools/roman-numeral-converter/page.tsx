'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Repeat2 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function RomanNumeralConverterPage() {
  const [mode, setMode] = useState<'to-roman' | 'from-roman'>('to-roman');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const toRoman = (num: number): string => {
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    let result = '';
    for (let i = 0; i < values.length; i++) {
      while (num >= values[i]) {
        result += symbols[i];
        num -= values[i];
      }
    }
    return result;
  };

  const fromRoman = (roman: string): number => {
    const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let result = 0;
    for (let i = 0; i < roman.length; i++) {
      const current = map[roman[i]];
      const next = map[roman[i + 1]];
      if (next && current < next) {
        result -= current;
      } else {
        result += current;
      }
    }
    return result;
  };

  const convert = () => {
    if (!input) {
      setOutput('');
      return;
    }

    try {
      if (mode === 'to-roman') {
        const num = parseInt(input);
        if (isNaN(num) || num < 1 || num > 3999) {
          setOutput('Error: Enter number between 1-3999');
          return;
        }
        setOutput(toRoman(num));
      } else {
        const result = fromRoman(input.toUpperCase());
        setOutput(result.toString());
      }
    } catch (e) {
      setOutput('Error');
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
            <span className="text-gray-600">Roman Numeral Converter</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Repeat2 className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Roman Numeral Converter
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Convert between numbers and Roman numerals - Free converter
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => { setMode('to-roman'); setInput(''); setOutput(''); }}
                className={`flex-1 px-6 py-3 rounded-lg font-bold transition-all ${
                  mode === 'to-roman'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Number to Roman
              </button>
              <button
                onClick={() => { setMode('from-roman'); setInput(''); setOutput(''); }}
                className={`flex-1 px-6 py-3 rounded-lg font-bold transition-all ${
                  mode === 'from-roman'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Roman to Number
              </button>
            </div>

            <input
              type="text"
              value={input}
              onChange={(e) => { setInput(e.target.value); convert(); }}
              placeholder={mode === 'to-roman' ? '2024' : 'MMXXIV'}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-2xl font-bold mb-6 text-center"
            />

            {output && (
              <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg text-center">
                <p className="text-5xl font-bold text-gray-900">{output}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
