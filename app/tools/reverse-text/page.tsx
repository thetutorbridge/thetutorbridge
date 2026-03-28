'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, ArrowLeftRight, Copy, Check, RotateCcw } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function ReverseTextPage() {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'reverse' | 'words' | 'lines'>('reverse');
  const [copied, setCopied] = useState(false);

  const reverseText = () => {
    if (!text) {
      setOutput('');
      return;
    }

    let result = '';
    switch (mode) {
      case 'reverse':
        // Reverse entire text character by character
        result = text.split('').reverse().join('');
        break;
      case 'words':
        // Reverse word order
        result = text.split(' ').reverse().join(' ');
        break;
      case 'lines':
        // Reverse line order
        result = text.split('\n').reverse().join('\n');
        break;
    }
    setOutput(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTextChange = (value: string) => {
    setText(value);
    // Auto-reverse as user types
    if (value) {
      let result = '';
      switch (mode) {
        case 'reverse':
          result = value.split('').reverse().join('');
          break;
        case 'words':
          result = value.split(' ').reverse().join(' ');
          break;
        case 'lines':
          result = value.split('\n').reverse().join('\n');
          break;
      }
      setOutput(result);
    } else {
      setOutput('');
    }
  };

  const handleModeChange = (newMode: 'reverse' | 'words' | 'lines') => {
    setMode(newMode);
    if (text) {
      let result = '';
      switch (newMode) {
        case 'reverse':
          result = text.split('').reverse().join('');
          break;
        case 'words':
          result = text.split(' ').reverse().join(' ');
          break;
        case 'lines':
          result = text.split('\n').reverse().join('\n');
          break;
      }
      setOutput(result);
    }
  };

  const swapTexts = () => {
    const temp = text;
    setText(output);
    handleTextChange(output);
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
            <span className="text-gray-600">Reverse Text</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <ArrowLeftRight className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Reverse Text
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Reverse text, words, or lines instantly - Free text reversal tool
            </p>
          </div>

          {/* Mode Selection */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Reverse Mode
            </label>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <button
                onClick={() => handleModeChange('reverse')}
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  mode === 'reverse'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Characters
              </button>
              <button
                onClick={() => handleModeChange('words')}
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  mode === 'words'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Words
              </button>
              <button
                onClick={() => handleModeChange('lines')}
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  mode === 'lines'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Lines
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Input Text
              </label>
              <textarea
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={
                  mode === 'reverse'
                    ? 'Type your text here...'
                    : mode === 'words'
                    ? 'Type multiple words...'
                    : 'Type multiple lines...'
                }
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 min-h-[150px] resize-y"
              />
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={reverseText}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Reverse
              </button>
              <button
                onClick={swapTexts}
                disabled={!output}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ArrowLeftRight className="w-5 h-5" />
                Swap
              </button>
            </div>

            {output && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-lg font-semibold text-gray-900">
                    Reversed Text
                  </label>
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-[#2BAE66] text-white rounded-lg font-semibold hover:bg-[#229554] transition-all flex items-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 max-h-96 overflow-y-auto">
                  <p className="text-gray-700 whitespace-pre-wrap break-words leading-relaxed">{output}</p>
                </div>
              </div>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Reverse Characters</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Reverses the entire text character by character from end to beginning.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Reverse Words</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Reverses the order of words while keeping each word intact.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Reverse Lines</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Reverses the order of lines in your text while keeping line content intact.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
