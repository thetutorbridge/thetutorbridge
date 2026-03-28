'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Repeat, Copy, Check } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function TextRepeaterPage() {
  const [text, setText] = useState('');
  const [count, setCount] = useState(10);
  const [separator, setSeparator] = useState<'none' | 'space' | 'newline' | 'comma' | 'custom'>('newline');
  const [customSeparator, setCustomSeparator] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const repeatText = () => {
    if (!text) {
      setOutput('');
      return;
    }

    let sep = '';
    switch (separator) {
      case 'space':
        sep = ' ';
        break;
      case 'newline':
        sep = '\n';
        break;
      case 'comma':
        sep = ', ';
        break;
      case 'custom':
        sep = customSeparator;
        break;
      case 'none':
      default:
        sep = '';
        break;
    }

    const repeated = Array.from({ length: count }, () => text).join(sep);
    setOutput(repeated);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <span className="text-gray-600">Text Repeater</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Repeat className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Text Repeater
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Repeat any text multiple times instantly - Free text repeater tool
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Enter Text to Repeat
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your text here..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 min-h-[120px] resize-y"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Repeat Count
                </label>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(Math.max(1, Math.min(1000, parseInt(e.target.value) || 1)))}
                  min="1"
                  max="1000"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Separator
                </label>
                <select
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value as any)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 font-semibold"
                >
                  <option value="newline">New Line</option>
                  <option value="space">Space</option>
                  <option value="comma">Comma</option>
                  <option value="none">None</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>

            {separator === 'custom' && (
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Custom Separator
                </label>
                <input
                  type="text"
                  value={customSeparator}
                  onChange={(e) => setCustomSeparator(e.target.value)}
                  placeholder="Enter custom separator..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900"
                />
              </div>
            )}

            <button
              onClick={repeatText}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Repeat className="w-5 h-5" />
              Repeat Text
            </button>
          </div>

          {output && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Repeated Text</h2>
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
              <div className="mt-4 text-sm text-gray-600">
                <p>Total characters: {output.length}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
