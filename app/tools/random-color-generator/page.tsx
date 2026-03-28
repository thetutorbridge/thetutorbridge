'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Home, Palette } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
export default function RandomColorGeneratorPage() {
  const [colors, setColors] = useState<string[]>([]);
  const generate = () => {
    const newColors = [];
    for (let i = 0; i < 10; i++) {
      newColors.push('#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
    }
    setColors(newColors);
  };
  return (<div className="flex flex-col min-h-screen"><Navigation /><div className="bg-gray-50 py-4 px-6"><div className="container mx-auto max-w-7xl"><nav className="flex items-center space-x-2 text-sm"><Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center"><Home className="w-4 h-4 mr-1" />Home</Link><span className="text-gray-400">/</span><Link href="/tools" className="text-[#1A3D7C] hover:text-[#2BAE66]">Tools</Link><span className="text-gray-400">/</span><span className="text-gray-600">Random Color Generator</span></nav></div></div><div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4"><div className="max-w-6xl mx-auto"><div className="text-center mb-8"><div className="flex items-center justify-center mb-4"><Palette className="w-12 h-12 mr-3 text-[#2BAE66]" /><h1 className="text-4xl md:text-5xl font-bold text-gray-900">Random Color Generator</h1></div><p className="text-xl text-gray-600">Generate random colors</p></div><div className="bg-white rounded-2xl shadow-xl p-8"><button onClick={generate} className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg mb-6">Generate Colors</button>{colors.length > 0 && <div className="grid grid-cols-2 md:grid-cols-5 gap-4">{colors.map((color, i) => <div key={i} className="text-center"><div style={{backgroundColor: color}} className="h-32 rounded-lg mb-2 cursor-pointer shadow-md" onClick={() => navigator.clipboard.writeText(color)} /><p className="text-sm font-mono text-gray-700">{color}</p></div>)}</div>}</div></div></div><Footer /></div>);
}
