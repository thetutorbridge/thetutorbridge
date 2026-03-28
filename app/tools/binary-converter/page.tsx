'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Binary } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function BinaryConverterPage() {
  const [mode, setMode] = useState<'to-binary' | 'from-binary'>('to-binary');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = () => {
    if (!input) {
      setOutput('');
      return;
    }

    if (mode === 'to-binary') {
      const binary = input.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
      setOutput(binary);
    } else {
      try {
        const text = input.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
        setOutput(text);
      } catch (e) {
        setOutput('Error: Invalid binary');
      }
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
            <span className="text-gray-600">Binary Converter</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Binary className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Binary Converter
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Convert text to binary and binary to text - Free converter
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => { setMode('to-binary'); setInput(''); setOutput(''); }}
                className={`flex-1 px-6 py-3 rounded-lg font-bold transition-all ${
                  mode === 'to-binary'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Text to Binary
              </button>
              <button
                onClick={() => { setMode('from-binary'); setInput(''); setOutput(''); }}
                className={`flex-1 px-6 py-3 rounded-lg font-bold transition-all ${
                  mode === 'from-binary'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Binary to Text
              </button>
            </div>

            <label className="block text-lg font-semibold text-gray-900 mb-3">
              {mode === 'to-binary' ? 'Text Input' : 'Binary Input'}
            </label>
            <textarea
              value={input}
              onChange={(e) => { setInput(e.target.value); convert(); }}
              placeholder={mode === 'to-binary' ? 'Enter text...' : 'Enter binary (space-separated)...'}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 min-h-[120px] resize-y font-mono text-sm mb-6"
            />

            {output && (
              <div className="p-6 bg-gray-50 border-2 border-gray-200 rounded-lg">
                <p className="text-sm font-semibold text-gray-600 mb-2">
                  {mode === 'to-binary' ? 'Binary Output' : 'Text Output'}
                </p>
                <p className="text-gray-900 font-mono text-sm break-all">{output}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
