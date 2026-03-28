'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Palette, Shuffle } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function ColorPaletteGeneratorPage() {
  const [baseColor, setBaseColor] = useState('#3B82F6');
  const [palette, setPalette] = useState<string[]>([]);

  const generatePalette = () => {
    const colors = [baseColor];
    const hex = baseColor.substring(1);
    const num = parseInt(hex, 16);

    // Generate complementary and analogous colors
    for (let i = 1; i < 5; i++) {
      const offset = (num + (i * 51 * Math.pow(16, i % 3))) % 0xFFFFFF;
      colors.push('#' + offset.toString(16).padStart(6, '0'));
    }

    setPalette(colors);
  };

  const randomColor = () => {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setBaseColor(color);
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
            <span className="text-gray-600">Color Palette Generator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Palette className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Color Palette Generator
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Generate color palettes instantly - Free palette generator
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex gap-4 mb-6">
              <input
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-24 h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 font-mono text-lg font-bold"
              />
              <button
                onClick={randomColor}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-all flex items-center gap-2"
              >
                <Shuffle className="w-5 h-5" />
                Random
              </button>
            </div>

            <button
              onClick={generatePalette}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg mb-6"
            >
              Generate Palette
            </button>

            {palette.length > 0 && (
              <div className="grid grid-cols-5 gap-4">
                {palette.map((color, idx) => (
                  <div key={idx} className="text-center">
                    <div
                      className="w-full h-32 rounded-lg border-4 border-gray-200 mb-2"
                      style={{ backgroundColor: color }}
                    />
                    <p className="font-mono text-sm font-bold text-gray-900">{color}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
