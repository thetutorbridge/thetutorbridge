'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Palette } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function ColorContrastCheckerPage() {
  const [foreground, setForeground] = useState('#000000');
  const [background, setBackground] = useState('#ffffff');
  const [ratio, setRatio] = useState('21.00');
  const [wcagAA, setWcagAA] = useState(true);
  const [wcagAAA, setWcagAAA] = useState(true);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const getContrastRatio = (fg: string, bg: string) => {
    const fgRgb = hexToRgb(fg);
    const bgRgb = hexToRgb(bg);

    const l1 = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
    const l2 = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
  };

  useEffect(() => {
    const contrastRatio = getContrastRatio(foreground, background);
    setRatio(contrastRatio.toFixed(2));
    setWcagAA(contrastRatio >= 4.5);
    setWcagAAA(contrastRatio >= 7);
  }, [foreground, background]);

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
            <span className="text-gray-600">Color Contrast Checker</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Palette className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Color Contrast Checker
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Check WCAG color contrast ratios
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Foreground Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value)}
                    className="w-20 h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Background Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="w-20 h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6 p-8 rounded-lg" style={{ backgroundColor: background, color: foreground }}>
              <h2 className="text-3xl font-bold mb-2">Sample Text</h2>
              <p className="text-lg">This is how your text will look with the selected colors.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-2">Contrast Ratio</p>
                <p className="text-3xl font-bold text-gray-900">{ratio}:1</p>
              </div>

              <div className={`p-6 rounded-lg text-center ${wcagAA ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className="text-sm text-gray-600 mb-2">WCAG AA</p>
                <p className={`text-2xl font-bold ${wcagAA ? 'text-green-700' : 'text-red-700'}`}>
                  {wcagAA ? '✓ Pass' : '✗ Fail'}
                </p>
                <p className="text-xs text-gray-500 mt-1">Requires 4.5:1</p>
              </div>

              <div className={`p-6 rounded-lg text-center ${wcagAAA ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className="text-sm text-gray-600 mb-2">WCAG AAA</p>
                <p className={`text-2xl font-bold ${wcagAAA ? 'text-green-700' : 'text-red-700'}`}>
                  {wcagAAA ? '✓ Pass' : '✗ Fail'}
                </p>
                <p className="text-xs text-gray-500 mt-1">Requires 7:1</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
