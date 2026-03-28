'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Dices } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function DiceRollerPage() {
  const [numDice, setNumDice] = useState('1');
  const [sides, setSides] = useState('6');
  const [results, setResults] = useState<number[]>([]);
  const [total, setTotal] = useState(0);

  const rollDice = () => {
    const dice = parseInt(numDice) || 1;
    const numSides = parseInt(sides) || 6;
    const rolls: number[] = [];

    for (let i = 0; i < dice; i++) {
      const roll = Math.floor(Math.random() * numSides) + 1;
      rolls.push(roll);
    }

    setResults(rolls);
    setTotal(rolls.reduce((sum, val) => sum + val, 0));
  };

  const quickRoll = (d: number, s: number) => {
    setNumDice(d.toString());
    setSides(s.toString());
    setTimeout(() => {
      const rolls: number[] = [];
      for (let i = 0; i < d; i++) {
        rolls.push(Math.floor(Math.random() * s) + 1);
      }
      setResults(rolls);
      setTotal(rolls.reduce((sum, val) => sum + val, 0));
    }, 100);
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
            <span className="text-gray-600">Dice Roller</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Dices className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Dice Roller
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Roll virtual dice - Perfect for games
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Number of Dice</label>
                <input
                  type="number"
                  value={numDice}
                  onChange={(e) => setNumDice(e.target.value)}
                  min="1"
                  max="20"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Sides per Die</label>
                <input
                  type="number"
                  value={sides}
                  onChange={(e) => setSides(e.target.value)}
                  min="2"
                  max="100"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900"
                />
              </div>
            </div>

            <button
              onClick={rollDice}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg mb-6"
            >
              Roll Dice
            </button>

            {results.length > 0 && (
              <div className="mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg text-center">
                  <div className="flex flex-wrap justify-center gap-4 mb-4">
                    {results.map((result, index) => (
                      <div
                        key={index}
                        className="w-20 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center text-3xl font-bold text-[#1A3D7C]"
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    Total: <span className="text-[#2BAE66]">{total}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Roll</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => quickRoll(1, 6)}
                  className="px-4 py-3 bg-[#1A3D7C] text-white rounded-lg font-semibold hover:bg-[#153162] transition-all"
                >
                  1d6
                </button>
                <button
                  onClick={() => quickRoll(2, 6)}
                  className="px-4 py-3 bg-[#1A3D7C] text-white rounded-lg font-semibold hover:bg-[#153162] transition-all"
                >
                  2d6
                </button>
                <button
                  onClick={() => quickRoll(1, 20)}
                  className="px-4 py-3 bg-[#1A3D7C] text-white rounded-lg font-semibold hover:bg-[#153162] transition-all"
                >
                  1d20
                </button>
                <button
                  onClick={() => quickRoll(3, 6)}
                  className="px-4 py-3 bg-[#1A3D7C] text-white rounded-lg font-semibold hover:bg-[#153162] transition-all"
                >
                  3d6
                </button>
                <button
                  onClick={() => quickRoll(4, 6)}
                  className="px-4 py-3 bg-[#2BAE66] text-white rounded-lg font-semibold hover:bg-[#229554] transition-all"
                >
                  4d6
                </button>
                <button
                  onClick={() => quickRoll(1, 10)}
                  className="px-4 py-3 bg-[#2BAE66] text-white rounded-lg font-semibold hover:bg-[#229554] transition-all"
                >
                  1d10
                </button>
                <button
                  onClick={() => quickRoll(1, 12)}
                  className="px-4 py-3 bg-[#2BAE66] text-white rounded-lg font-semibold hover:bg-[#229554] transition-all"
                >
                  1d12
                </button>
                <button
                  onClick={() => quickRoll(1, 100)}
                  className="px-4 py-3 bg-[#2BAE66] text-white rounded-lg font-semibold hover:bg-[#229554] transition-all"
                >
                  1d100
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
