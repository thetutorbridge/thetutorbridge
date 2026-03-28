'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Box, Copy, Check } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function BoxShadowGeneratorPage() {
  const [h, setH] = useState(0);
  const [v, setV] = useState(4);
  const [blur, setBlur] = useState(6);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.1);
  const [copied, setCopied] = useState(false);

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const shadowCSS = `box-shadow: ${h}px ${v}px ${blur}px ${spread}px ${hexToRgba(color, opacity)};`;

  const copy = () => {
    navigator.clipboard.writeText(shadowCSS);
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
            <span className="text-gray-600">Box Shadow Generator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Box className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Box Shadow Generator
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Generate CSS box shadows - Free shadow generator
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Horizontal: {h}px</label>
                  <input type="range" min="-50" max="50" value={h} onChange={(e) => setH(parseInt(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Vertical: {v}px</label>
                  <input type="range" min="-50" max="50" value={v} onChange={(e) => setV(parseInt(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Blur: {blur}px</label>
                  <input type="range" min="0" max="50" value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Spread: {spread}px</label>
                  <input type="range" min="-30" max="30" value={spread} onChange={(e) => setSpread(parseInt(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-12 border-2 border-gray-300 rounded-lg cursor-pointer" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Opacity: {opacity}</label>
                  <input type="range" min="0" max="1" step="0.05" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} className="w-full" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <code className="text-xs font-mono text-gray-900">{shadowCSS}</code>
                  <button onClick={copy} className="ml-2 px-3 py-1 bg-[#2BAE66] text-white rounded font-semibold hover:bg-[#229554] transition-all flex items-center gap-2 text-sm">
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center justify-center">
              <div
                className="w-64 h-64 bg-white rounded-lg"
                style={{ boxShadow: `${h}px ${v}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}` }}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
