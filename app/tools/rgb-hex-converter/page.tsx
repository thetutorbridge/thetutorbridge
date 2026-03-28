'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Palette, Copy, Check, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function RgbHexConverterPage() {
  const [mode, setMode] = useState<'rgb-to-hex' | 'hex-to-rgb'>('rgb-to-hex');
  const [r, setR] = useState('255');
  const [g, setG] = useState('0');
  const [b, setB] = useState('0');
  const [hex, setHex] = useState('#FF0000');
  const [copied, setCopied] = useState(false);

  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (n: number) => {
      const hex = Math.max(0, Math.min(255, n)).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const handleRgbChange = (red: string, green: string, blue: string) => {
    setR(red);
    setG(green);
    setB(blue);
    const rNum = parseInt(red) || 0;
    const gNum = parseInt(green) || 0;
    const bNum = parseInt(blue) || 0;
    setHex(rgbToHex(rNum, gNum, bNum));
  };

  const handleHexChange = (hexValue: string) => {
    setHex(hexValue);
    const rgb = hexToRgb(hexValue);
    if (rgb) {
      setR(rgb.r.toString());
      setG(rgb.g.toString());
      setB(rgb.b.toString());
    }
  };

  const copyToClipboard = () => {
    const text = mode === 'rgb-to-hex' ? hex : `rgb(${r}, ${g}, ${b})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentColor = hex;

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
            <span className="text-gray-600">RGB/HEX Converter</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Palette className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                RGB / HEX Converter
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Convert between RGB and HEX color codes instantly - Free color converter
            </p>
          </div>

          {/* Mode Selection */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setMode('rgb-to-hex')}
                className={`flex-1 px-6 py-4 rounded-lg font-bold text-lg transition-all ${
                  mode === 'rgb-to-hex'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                RGB to HEX
              </button>
              <button
                onClick={() => setMode('hex-to-rgb')}
                className={`flex-1 px-6 py-4 rounded-lg font-bold text-lg transition-all ${
                  mode === 'hex-to-rgb'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                HEX to RGB
              </button>
            </div>

            {mode === 'rgb-to-hex' ? (
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Enter RGB Values (0-255)
                </label>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-red-600 mb-2">Red</label>
                    <input
                      type="number"
                      value={r}
                      onChange={(e) => handleRgbChange(e.target.value, g, b)}
                      min="0"
                      max="255"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none text-gray-900 text-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-green-600 mb-2">Green</label>
                    <input
                      type="number"
                      value={g}
                      onChange={(e) => handleRgbChange(r, e.target.value, b)}
                      min="0"
                      max="255"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-gray-900 text-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-blue-600 mb-2">Blue</label>
                    <input
                      type="number"
                      value={b}
                      onChange={(e) => handleRgbChange(r, g, e.target.value)}
                      min="0"
                      max="255"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900 text-xl font-bold"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Enter HEX Color Code
                </label>
                <input
                  type="text"
                  value={hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  placeholder="#FF0000"
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-2xl font-mono font-bold mb-6"
                />
              </div>
            )}

            {/* Color Preview */}
            <div className="flex items-center gap-6 mb-6">
              <div
                className="w-32 h-32 rounded-lg border-4 border-gray-300"
                style={{ backgroundColor: currentColor }}
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Color Preview</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-700">RGB:</span>
                    <span className="font-mono text-lg font-bold">rgb({r}, {g}, {b})</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-700">HEX:</span>
                    <span className="font-mono text-lg font-bold">{hex}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={copyToClipboard}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copied!' : mode === 'rgb-to-hex' ? 'Copy HEX Code' : 'Copy RGB Code'}
            </button>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About RGB</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                RGB (Red, Green, Blue) is an additive color model where colors are created by combining red, green, and blue light. Each channel ranges from 0-255.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About HEX</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                HEX is a hexadecimal representation of RGB colors. It uses 6 characters (0-9, A-F) where each pair represents red, green, and blue values.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
