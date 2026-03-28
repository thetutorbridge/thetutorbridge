'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Palette, Copy, Check } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function ColorPickerPage() {
  const [color, setColor] = useState('#2BAE66');
  const [copied, setCopied] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const presetColors = [
    '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3',
    '#000000', '#FFFFFF', '#808080', '#C0C0C0', '#800000', '#808000', '#008000',
    '#800080', '#008080', '#000080', '#FF69B4', '#FFA500', '#FFD700', '#ADFF2F',
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
            <span className="text-gray-600">Color Picker</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Palette className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Color Picker
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Pick colors and get HEX, RGB, HSL codes instantly - Free online color picker tool
            </p>
          </div>

          {/* Color Picker */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Choose Your Color
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-32 h-32 rounded-lg cursor-pointer border-4 border-gray-300"
                />
                <div
                  className="flex-1 h-32 rounded-lg border-4 border-gray-300"
                  style={{ backgroundColor: color }}
                />
              </div>
            </div>

            {/* Color Codes */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-1">HEX</div>
                    <div className="text-2xl font-mono font-bold text-gray-900">{color.toUpperCase()}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(color.toUpperCase(), 'hex')}
                    className="px-4 py-2 bg-[#2BAE66] text-white rounded-lg font-semibold hover:bg-[#229554] transition-all flex items-center gap-2"
                  >
                    {copied === 'hex' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied === 'hex' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {rgb && (
                <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-1">RGB</div>
                      <div className="text-2xl font-mono font-bold text-gray-900">
                        rgb({rgb.r}, {rgb.g}, {rgb.b})
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')}
                      className="px-4 py-2 bg-[#2BAE66] text-white rounded-lg font-semibold hover:bg-[#229554] transition-all flex items-center gap-2"
                    >
                      {copied === 'rgb' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied === 'rgb' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}

              {hsl && (
                <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-1">HSL</div>
                      <div className="text-2xl font-mono font-bold text-gray-900">
                        hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'hsl')}
                      className="px-4 py-2 bg-[#2BAE66] text-white rounded-lg font-semibold hover:bg-[#229554] transition-all flex items-center gap-2"
                    >
                      {copied === 'hsl' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied === 'hsl' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preset Colors */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Preset Colors</h2>
            <div className="grid grid-cols-7 gap-3">
              {presetColors.map((presetColor, index) => (
                <button
                  key={index}
                  onClick={() => setColor(presetColor)}
                  className="w-full aspect-square rounded-lg border-4 border-gray-300 hover:border-[#2BAE66] transition-all cursor-pointer"
                  style={{ backgroundColor: presetColor }}
                  title={presetColor}
                />
              ))}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Color Formats</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li><strong>HEX:</strong> Hexadecimal format (#RRGGBB)</li>
                <li><strong>RGB:</strong> Red, Green, Blue (0-255)</li>
                <li><strong>HSL:</strong> Hue, Saturation, Lightness</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Uses</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Web design & development</li>
                <li>• Graphic design projects</li>
                <li>• Brand color selection</li>
                <li>• CSS styling</li>
                <li>• Digital art creation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
