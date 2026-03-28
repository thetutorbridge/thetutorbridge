'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Home, Palette } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
export default function RgbHslConverterPage() {
  const [r, setR] = useState('255');
  const [g, setG] = useState('0');
  const [b, setB] = useState('0');
  const [h, setH] = useState('0');
  const [s, setS] = useState('100');
  const [l, setL] = useState('50');
  const rgbToHsl = () => {
    const rd = parseInt(r) / 255, gd = parseInt(g) / 255, bd = parseInt(b) / 255;
    const max = Math.max(rd, gd, bd), min = Math.min(rd, gd, bd);
    let hl = (max + min) / 2, hs, hh = 0;
    if (max === min) { hh = hs = 0; } else {
      const d = max - min;
      hs = hl > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === rd) hh = ((gd - bd) / d + (gd < bd ? 6 : 0)) / 6;
      if (max === gd) hh = ((bd - rd) / d + 2) / 6;
      if (max === bd) hh = ((rd - gd) / d + 4) / 6;
    }
    setH(Math.round(hh * 360).toString());
    setS(Math.round(hs * 100).toString());
    setL(Math.round(hl * 100).toString());
  };
  return (<div className="flex flex-col min-h-screen"><Navigation /><div className="bg-gray-50 py-4 px-6"><div className="container mx-auto max-w-7xl"><nav className="flex items-center space-x-2 text-sm"><Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center"><Home className="w-4 h-4 mr-1" />Home</Link><span className="text-gray-400">/</span><Link href="/tools" className="text-[#1A3D7C] hover:text-[#2BAE66]">Tools</Link><span className="text-gray-400">/</span><span className="text-gray-600">RGB to HSL Converter</span></nav></div></div><div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4"><div className="max-w-4xl mx-auto"><div className="text-center mb-8"><div className="flex items-center justify-center mb-4"><Palette className="w-12 h-12 mr-3 text-[#2BAE66]" /><h1 className="text-4xl md:text-5xl font-bold text-gray-900">RGB to HSL Converter</h1></div><p className="text-xl text-gray-600">Convert RGB to HSL colors</p></div><div className="bg-white rounded-2xl shadow-xl p-8"><div className="grid md:grid-cols-2 gap-6 mb-6"><div className="space-y-4"><h3 className="text-lg font-semibold text-gray-900">RGB</h3><div><label className="block text-sm font-semibold text-gray-700 mb-2">Red (0-255)</label><input type="number" value={r} onChange={(e) => setR(e.target.value)} min="0" max="255" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none" /></div><div><label className="block text-sm font-semibold text-gray-700 mb-2">Green (0-255)</label><input type="number" value={g} onChange={(e) => setG(e.target.value)} min="0" max="255" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none" /></div><div><label className="block text-sm font-semibold text-gray-700 mb-2">Blue (0-255)</label><input type="number" value={b} onChange={(e) => setB(e.target.value)} min="0" max="255" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none" /></div></div><div className="space-y-4"><h3 className="text-lg font-semibold text-gray-900">HSL</h3><div><label className="block text-sm font-semibold text-gray-700 mb-2">Hue (0-360)</label><input type="number" value={h} readOnly className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50" /></div><div><label className="block text-sm font-semibold text-gray-700 mb-2">Saturation (0-100%)</label><input type="number" value={s} readOnly className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50" /></div><div><label className="block text-sm font-semibold text-gray-700 mb-2">Lightness (0-100%)</label><input type="number" value={l} readOnly className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50" /></div></div></div><button onClick={rgbToHsl} className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg">Convert</button></div></div></div><Footer /></div>);
}
