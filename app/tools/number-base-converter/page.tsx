'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Home, Hash } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function NumberBaseConverterPage() {
  const [decimal, setDecimal] = useState('');
  const [binary, setBinary] = useState('');
  const [hex, setHex] = useState('');
  const [octal, setOctal] = useState('');

  const fromDecimal = (value: string) => {
    const num = parseInt(value);
    if (isNaN(num)) return;
    setDecimal(value);
    setBinary(num.toString(2));
    setHex(num.toString(16).toUpperCase());
    setOctal(num.toString(8));
  };

  return (<div className="flex flex-col min-h-screen"><Navigation /><div className="bg-gray-50 py-4 px-6"><div className="container mx-auto max-w-7xl"><nav className="flex items-center space-x-2 text-sm"><Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center"><Home className="w-4 h-4 mr-1" />Home</Link><span className="text-gray-400">/</span><Link href="/tools" className="text-[#1A3D7C] hover:text-[#2BAE66]">Tools</Link><span className="text-gray-400">/</span><span className="text-gray-600">Number Base Converter</span></nav></div></div><div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4"><div className="max-w-4xl mx-auto"><div className="text-center mb-8"><div className="flex items-center justify-center mb-4"><Hash className="w-12 h-12 mr-3 text-[#2BAE66]" /><h1 className="text-4xl md:text-5xl font-bold text-gray-900">Number Base Converter</h1></div><p className="text-xl text-gray-600">Convert between number bases</p></div><div className="bg-white rounded-2xl shadow-xl p-8"><div className="space-y-4"><div><label className="block text-lg font-semibold text-gray-900 mb-3">Decimal</label><input type="text" value={decimal} onChange={(e) => fromDecimal(e.target.value)} placeholder="123" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 font-mono" /></div><div><label className="block text-lg font-semibold text-gray-900 mb-3">Binary</label><input type="text" value={binary} readOnly placeholder="1111011" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-mono" /></div><div><label className="block text-lg font-semibold text-gray-900 mb-3">Hexadecimal</label><input type="text" value={hex} readOnly placeholder="7B" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-mono" /></div><div><label className="block text-lg font-semibold text-gray-900 mb-3">Octal</label><input type="text" value={octal} readOnly placeholder="173" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-mono" /></div></div></div></div></div><Footer /></div>);
}
