'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Type, Copy, RotateCcw, Check } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function CaseConverterPage() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const convertToUpperCase = () => text.toUpperCase();
  const convertToLowerCase = () => text.toLowerCase();

  const convertToTitleCase = () => {
    return text.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const convertToSentenceCase = () => {
    return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const convertToCapitalizeEachWord = () => {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const convertToAlternatingCase = () => {
    return text
      .split('')
      .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
      .join('');
  };

  const convertToInverseCase = () => {
    return text
      .split('')
      .map((char) => {
        if (char === char.toUpperCase()) {
          return char.toLowerCase();
        } else {
          return char.toUpperCase();
        }
      })
      .join('');
  };

  const copyToClipboard = (convertedText: string, type: string) => {
    navigator.clipboard.writeText(convertedText);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const applyConversion = (conversion: () => string) => {
    setText(conversion());
  };

  const clearText = () => {
    setText('');
  };

  const characters = text.length;
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  const conversions = [
    {
      type: 'uppercase',
      label: 'UPPERCASE',
      description: 'Convert all letters to uppercase',
      convert: convertToUpperCase,
      example: 'HELLO WORLD',
      bgColor: 'from-blue-500 to-blue-600',
    },
    {
      type: 'lowercase',
      label: 'lowercase',
      description: 'Convert all letters to lowercase',
      convert: convertToLowerCase,
      example: 'hello world',
      bgColor: 'from-green-500 to-green-600',
    },
    {
      type: 'titlecase',
      label: 'Title Case',
      description: 'Capitalize the first letter of each word',
      convert: convertToTitleCase,
      example: 'Hello World',
      bgColor: 'from-purple-500 to-purple-600',
    },
    {
      type: 'sentencecase',
      label: 'Sentence case',
      description: 'Capitalize the first letter of each sentence',
      convert: convertToSentenceCase,
      example: 'Hello world. How are you?',
      bgColor: 'from-orange-500 to-orange-600',
    },
    {
      type: 'capitalize',
      label: 'Capitalize Each Word',
      description: 'Capitalize every word',
      convert: convertToCapitalizeEachWord,
      example: 'Hello World Example',
      bgColor: 'from-pink-500 to-pink-600',
    },
    {
      type: 'alternating',
      label: 'aLtErNaTiNg cAsE',
      description: 'Alternate between lowercase and uppercase',
      convert: convertToAlternatingCase,
      example: 'hElLo WoRlD',
      bgColor: 'from-yellow-500 to-yellow-600',
    },
    {
      type: 'inverse',
      label: 'InVeRsE CaSe',
      description: 'Swap uppercase and lowercase',
      convert: convertToInverseCase,
      example: 'hELLO wORLD',
      bgColor: 'from-red-500 to-red-600',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      {/* Breadcrumb */}
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
            <span className="text-gray-600">Case Converter</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Type className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Case Converter
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Convert text to uppercase, lowercase, title case, and more - Free text case changer
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold mb-1">{characters.toLocaleString()}</div>
              <div className="text-sm font-semibold opacity-90">Characters</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold mb-1">{words.toLocaleString()}</div>
              <div className="text-sm font-semibold opacity-90">Words</div>
            </div>
          </div>

          {/* Text Input */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Enter Your Text</h2>
              <button
                onClick={clearText}
                disabled={text.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw className="w-4 h-4" />
                Clear
              </button>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here... Then click any conversion button below to transform it!"
              className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none resize-none text-gray-900 text-lg"
            />
          </div>

          {/* Conversion Buttons */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Convert to:</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {conversions.map((conversion) => (
                <div
                  key={conversion.type}
                  className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200 hover:border-[#2BAE66] transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {conversion.label}
                      </h3>
                      <p className="text-sm text-gray-600">{conversion.description}</p>
                      <p className="text-xs text-gray-500 mt-1 font-mono">
                        e.g., "{conversion.example}"
                      </p>
                    </div>
                  </div>

                  {text && (
                    <div className="bg-white rounded-lg p-3 mb-3 border border-gray-300 max-h-24 overflow-y-auto">
                      <p className="text-gray-900 text-sm break-words">
                        {conversion.convert()}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => applyConversion(conversion.convert)}
                      disabled={!text}
                      className={`flex-1 px-4 py-2 bg-gradient-to-r ${conversion.bgColor} text-white rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => copyToClipboard(conversion.convert(), conversion.type)}
                      disabled={!text}
                      className="px-4 py-2 bg-[#2BAE66] text-white rounded-lg font-semibold hover:bg-[#229554] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {copied === conversion.type ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Use Cases</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4">
                  <h4 className="font-bold text-[#1A3D7C] mb-2">📝 Writers & Editors</h4>
                  <p className="text-sm text-gray-600">
                    Quickly fix capitalization errors in articles and documents
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-4">
                  <h4 className="font-bold text-[#2BAE66] mb-2">💻 Programmers</h4>
                  <p className="text-sm text-gray-600">
                    Convert variable names and code formatting
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
                  <h4 className="font-bold text-purple-600 mb-2">📱 Social Media</h4>
                  <p className="text-sm text-gray-600">
                    Format posts and captions with proper capitalization
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About Case Conversion</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our case converter tool makes it easy to change text capitalization instantly. Whether you need to convert to uppercase, lowercase, title case, or sentence case, we've got you covered.
              </p>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 border-2 border-yellow-200">
                <h4 className="font-bold text-orange-700 mb-2">💡 Pro Tip</h4>
                <p className="text-sm text-gray-700">
                  Use the "Apply" button to convert your text in place, or use the copy button to copy the converted text without changing the original.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
