'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Type } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function StringUtilityPage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const operations = {
    reverse: () => setResult(text.split('').reverse().join('')),
    removeSpaces: () => setResult(text.replace(/\s+/g, '')),
    removeLineBreaks: () => setResult(text.replace(/\n/g, '')),
    trimSpaces: () => setResult(text.trim()),
    countChars: () => setResult(`Characters: ${text.length}`),
    countWords: () => setResult(`Words: ${text.trim().split(/\s+/).filter(w => w).length}`),
    countLines: () => setResult(`Lines: ${text.split('\n').length}`),
    toSlug: () => setResult(text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')),
    removeDuplicateLines: () => {
      const lines = text.split('\n');
      const unique = [...new Set(lines)];
      setResult(unique.join('\n'));
    },
    sortLines: () => {
      const lines = text.split('\n');
      setResult(lines.sort().join('\n'));
    },
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
            <span className="text-gray-600">String Utility</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Type className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                String Utility Tool
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Manipulate and analyze text strings
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Text Input</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your text here..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 min-h-[300px] resize-y"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Result</label>
                <textarea
                  value={result}
                  readOnly
                  placeholder="Result will appear here..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-900 min-h-[300px] resize-y"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              <button onClick={operations.reverse} className="px-4 py-2 bg-[#1A3D7C] text-white rounded-lg hover:bg-[#153162] transition-all text-sm font-semibold">
                Reverse
              </button>
              <button onClick={operations.removeSpaces} className="px-4 py-2 bg-[#1A3D7C] text-white rounded-lg hover:bg-[#153162] transition-all text-sm font-semibold">
                Remove Spaces
              </button>
              <button onClick={operations.removeLineBreaks} className="px-4 py-2 bg-[#1A3D7C] text-white rounded-lg hover:bg-[#153162] transition-all text-sm font-semibold">
                Remove Lines
              </button>
              <button onClick={operations.trimSpaces} className="px-4 py-2 bg-[#1A3D7C] text-white rounded-lg hover:bg-[#153162] transition-all text-sm font-semibold">
                Trim
              </button>
              <button onClick={operations.countChars} className="px-4 py-2 bg-[#2BAE66] text-white rounded-lg hover:bg-[#229554] transition-all text-sm font-semibold">
                Count Chars
              </button>
              <button onClick={operations.countWords} className="px-4 py-2 bg-[#2BAE66] text-white rounded-lg hover:bg-[#229554] transition-all text-sm font-semibold">
                Count Words
              </button>
              <button onClick={operations.countLines} className="px-4 py-2 bg-[#2BAE66] text-white rounded-lg hover:bg-[#229554] transition-all text-sm font-semibold">
                Count Lines
              </button>
              <button onClick={operations.toSlug} className="px-4 py-2 bg-[#1A3D7C] text-white rounded-lg hover:bg-[#153162] transition-all text-sm font-semibold">
                To Slug
              </button>
              <button onClick={operations.removeDuplicateLines} className="px-4 py-2 bg-[#1A3D7C] text-white rounded-lg hover:bg-[#153162] transition-all text-sm font-semibold">
                Remove Dupes
              </button>
              <button onClick={operations.sortLines} className="px-4 py-2 bg-[#1A3D7C] text-white rounded-lg hover:bg-[#153162] transition-all text-sm font-semibold">
                Sort Lines
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
