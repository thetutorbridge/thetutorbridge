'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Hash } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function HexConverterPage() {
  const [mode, setMode] = useState<'to-hex' | 'from-hex' | 'dec-hex'>('to-hex');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = () => {
    if (!input) {
      setOutput('');
      return;
    }

    try {
      if (mode === 'to-hex') {
        const hex = input.split('').map(char => char.charCodeAt(0).toString(16)).join(' ');
        setOutput(hex);
      } else if (mode === 'from-hex') {
        const text = input.split(' ').map(h => String.fromCharCode(parseInt(h, 16))).join('');
        setOutput(text);
      } else {
        const num = parseInt(input);
        setOutput(num.toString(16).toUpperCase());
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
            <span className="text-gray-600">Hex Converter</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Hash className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Hexadecimal Converter
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Convert between text, hex, and decimal - Free hex converter
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <button
                onClick={() => { setMode('to-hex'); setInput(''); setOutput(''); }}
                className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                  mode === 'to-hex'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Text to Hex
              </button>
              <button
                onClick={() => { setMode('from-hex'); setInput(''); setOutput(''); }}
                className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                  mode === 'from-hex'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Hex to Text
              </button>
              <button
                onClick={() => { setMode('dec-hex'); setInput(''); setOutput(''); }}
                className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                  mode === 'dec-hex'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Dec to Hex
              </button>
            </div>

            <input
              type="text"
              value={input}
              onChange={(e) => { setInput(e.target.value); convert(); }}
              placeholder="Enter value..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-mono mb-6"
            />

            {output && (
              <div className="p-6 bg-gray-50 border-2 border-gray-200 rounded-lg">
                <p className="text-sm font-semibold text-gray-600 mb-2">Output</p>
                <p className="text-2xl font-bold text-gray-900 font-mono break-all">{output}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
