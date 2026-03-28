'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Palette, Copy, Check } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function GradientGeneratorPage() {
  const [color1, setColor1] = useState('#3B82F6');
  const [color2, setColor2] = useState('#8B5CF6');
  const [angle, setAngle] = useState(90);
  const [css, setCss] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    setCss(`background: ${gradient};`);
  };

  const copy = () => {
    navigator.clipboard.writeText(css);
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
            <span className="text-gray-600">Gradient Generator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Palette className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                CSS Gradient Generator
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Generate CSS gradients - Free gradient generator
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Color 1</label>
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-full h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Color 2</label>
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-full h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Angle: {angle}°</label>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div
              className="h-48 rounded-lg mb-6 border-4 border-gray-200"
              style={{ background: `linear-gradient(${angle}deg, ${color1}, ${color2})` }}
            />

            <button
              onClick={generate}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg mb-4"
            >
              Generate CSS
            </button>

            {css && (
              <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg flex justify-between items-center">
                <code className="text-sm font-mono text-gray-900">{css}</code>
                <button onClick={copy} className="ml-4 px-4 py-2 bg-[#2BAE66] text-white rounded font-semibold hover:bg-[#229554] transition-all flex items-center gap-2">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
