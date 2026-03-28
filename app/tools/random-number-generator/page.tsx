'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Dices, Copy, RotateCcw, Check, Trash2, Hash } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function RandomNumberGeneratorPage() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
  const [history, setHistory] = useState<{ numbers: number[]; timestamp: string }[]>([]);
  const [copied, setCopied] = useState(false);

  const generateNumbers = () => {
    if (min > max) {
      alert('Minimum value cannot be greater than maximum value!');
      return;
    }

    if (!allowDuplicates && count > (max - min + 1)) {
      alert(`Cannot generate ${count} unique numbers between ${min} and ${max}!`);
      return;
    }

    const numbers: number[] = [];
    const available = new Set<number>();

    if (!allowDuplicates) {
      for (let i = min; i <= max; i++) {
        available.add(i);
      }
    }

    for (let i = 0; i < count; i++) {
      let num: number;
      if (allowDuplicates) {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
      } else {
        const availableArray = Array.from(available);
        const randomIndex = Math.floor(Math.random() * availableArray.length);
        num = availableArray[randomIndex];
        available.delete(num);
      }
      numbers.push(num);
    }

    setGeneratedNumbers(numbers);
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    setHistory([{ numbers, timestamp }, ...history].slice(0, 10)); // Keep last 10
    setCopied(false);
  };

  const copyToClipboard = () => {
    const text = generatedNumbers.join(', ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const setPreset = (preset: string) => {
    switch (preset) {
      case 'dice':
        setMin(1);
        setMax(6);
        setCount(1);
        break;
      case 'coin':
        setMin(0);
        setMax(1);
        setCount(1);
        break;
      case 'lottery':
        setMin(1);
        setMax(49);
        setCount(6);
        setAllowDuplicates(false);
        break;
      case 'percent':
        setMin(0);
        setMax(100);
        setCount(1);
        break;
      case 'card':
        setMin(1);
        setMax(52);
        setCount(1);
        break;
      default:
        break;
    }
  };

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
            <span className="text-gray-600">Random Number Generator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Dices className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Random Number Generator
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Generate random numbers instantly - Free random number picker & RNG tool
            </p>
          </div>

          {/* Quick Presets */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Presets</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <button
                onClick={() => setPreset('dice')}
                className="px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-md"
              >
                🎲 Dice (1-6)
              </button>
              <button
                onClick={() => setPreset('coin')}
                className="px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-md"
              >
                🪙 Coin Flip
              </button>
              <button
                onClick={() => setPreset('lottery')}
                className="px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md"
              >
                🎰 Lottery
              </button>
              <button
                onClick={() => setPreset('percent')}
                className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
              >
                📊 Percent
              </button>
              <button
                onClick={() => setPreset('card')}
                className="px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-md"
              >
                🃏 Card Deck
              </button>
            </div>
          </div>

          {/* Number Display */}
          {generatedNumbers.length > 0 && (
            <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-2xl shadow-2xl p-8 mb-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">Generated Numbers</h2>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-white text-[#1A3D7C] rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                {generatedNumbers.map((num, index) => (
                  <div
                    key={index}
                    className="bg-white text-[#1A3D7C] rounded-xl px-8 py-6 text-5xl font-bold shadow-lg min-w-[120px] text-center"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customize Your Range</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minimum Value
                </label>
                <input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Maximum Value
                </label>
                <input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  How Many Numbers?
                </label>
                <input
                  type="number"
                  value={count}
                  min="1"
                  max="100"
                  onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200 mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowDuplicates}
                  onChange={(e) => setAllowDuplicates(e.target.checked)}
                  className="w-5 h-5 text-[#2BAE66] border-gray-300 rounded focus:ring-[#2BAE66] cursor-pointer"
                />
                <span className="ml-3 text-lg font-semibold text-gray-900">
                  Allow Duplicate Numbers
                </span>
              </label>
            </div>

            <button
              onClick={generateNumbers}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Dices className="w-6 h-6" />
              Generate Random Numbers
            </button>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Generation History</h2>
                <button
                  onClick={clearHistory}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear
                </button>
              </div>
              <div className="space-y-3">
                {history.map((entry, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex gap-2 flex-wrap">
                      {entry.numbers.map((num, numIndex) => (
                        <span
                          key={numIndex}
                          className="px-4 py-2 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold"
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-4">{entry.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                <Hash className="w-6 h-6 inline-block mr-2 text-[#2BAE66]" />
                True Randomness
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Our random number generator uses cryptographically secure algorithms to ensure truly random results. Perfect for games, simulations, statistical sampling, and decision-making.
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 mt-4">
                <h4 className="font-bold text-[#1A3D7C] mb-2">Common Uses:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Lottery number selection</li>
                  <li>• Dice rolling for games</li>
                  <li>• Statistical sampling</li>
                  <li>• Random team selection</li>
                  <li>• Raffle winner picking</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Ranges</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Standard Dice</span>
                  <span className="text-[#1A3D7C] font-bold">1 - 6</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Percentage</span>
                  <span className="text-[#1A3D7C] font-bold">0 - 100</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Lottery (Powerball)</span>
                  <span className="text-[#1A3D7C] font-bold">1 - 69</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Standard Deck</span>
                  <span className="text-[#1A3D7C] font-bold">1 - 52</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Year</span>
                  <span className="text-[#1A3D7C] font-bold">1900 - 2100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
