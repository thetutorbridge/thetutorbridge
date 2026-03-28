'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Home, Palette } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function ColorShadesGeneratorPage() {
  const [color, setColor] = useState('#3498db');
  const [shades, setShades] = useState<string[]>([]);

  const generateShades = () => {
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 0, g: 0, b: 0 };
    };

    const rgbToHex = (r: number, g: number, b: number) => {
      return "#" + [r, g, b].map(x => Math.max(0, Math.min(255, x)).toString(16).padStart(2, '0')).join('');
    };

    const rgb = hexToRgb(color);
    const newShades = [];
    
    for (let i = 5; i >= 1; i--) {
      const factor = i * 0.2;
      newShades.push(rgbToHex(Math.round(rgb.r + (255 - rgb.r) * factor), Math.round(rgb.g + (255 - rgb.g) * factor), Math.round(rgb.b + (255 - rgb.b) * factor)));
    }
    
    newShades.push(color);
    
    for (let i = 1; i <= 5; i++) {
      const factor = i * 0.2;
      newShades.push(rgbToHex(Math.round(rgb.r * (1 - factor)), Math.round(rgb.g * (1 - factor)), Math.round(rgb.b * (1 - factor))));
    }
    
    setShades(newShades);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center"><Home className="w-4 h-4 mr-1" />Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/tools" className="text-[#1A3D7C] hover:text-[#2BAE66]">Tools</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Color Shades Generator</span>
          </nav>
        </div>
      </div>
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Palette className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Color Shades Generator</h1>
            </div>
            <p className="text-xl text-gray-600">Generate lighter and darker shades</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">Base Color</label>
              <div className="flex gap-3">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-20 h-12 border-2 border-gray-300 rounded-lg cursor-pointer" />
                <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 font-mono" />
              </div>
            </div>
            <button onClick={generateShades} className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg mb-6">
              Generate Shades
            </button>
            {shades.length > 0 && (
              <div className="grid grid-cols-11 gap-2">
                {shades.map((shade, index) => (
                  <div key={index} className="text-center">
                    <div style={{backgroundColor: shade}} className="h-24 rounded-lg mb-2 cursor-pointer shadow-md" onClick={() => navigator.clipboard.writeText(shade)} />
                    <p className="text-xs font-mono text-gray-700">{shade}</p>
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
