'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Home, BarChart } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
export default function WordFrequencyCounterPage() {
  const [text, setText] = useState('');
  const [frequencies, setFrequencies] = useState<[string, number][]>([]);
  const count = () => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const freq: Record<string, number> = {};
    words.forEach(w => freq[w] = (freq[w] || 0) + 1);
    setFrequencies(Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 20));
  };
  return (<div className="flex flex-col min-h-screen"><Navigation /><div className="bg-gray-50 py-4 px-6"><div className="container mx-auto max-w-7xl"><nav className="flex items-center space-x-2 text-sm"><Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center"><Home className="w-4 h-4 mr-1" />Home</Link><span className="text-gray-400">/</span><Link href="/tools" className="text-[#1A3D7C] hover:text-[#2BAE66]">Tools</Link><span className="text-gray-400">/</span><span className="text-gray-600">Word Frequency Counter</span></nav></div></div><div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4"><div className="max-w-6xl mx-auto"><div className="text-center mb-8"><div className="flex items-center justify-center mb-4"><BarChart className="w-12 h-12 mr-3 text-[#2BAE66]" /><h1 className="text-4xl md:text-5xl font-bold text-gray-900">Word Frequency Counter</h1></div><p className="text-xl text-gray-600">Count word frequencies</p></div><div className="bg-white rounded-2xl shadow-xl p-8"><div className="mb-6"><label className="block text-lg font-semibold text-gray-900 mb-3">Text</label><textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none min-h-[200px] resize-y" /></div><button onClick={count} className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg mb-6">Count Frequencies</button>{frequencies.length > 0 && <div><label className="block text-lg font-semibold text-gray-900 mb-3">Top 20 Words</label><div className="space-y-2">{frequencies.map(([word, count]) => <div key={word} className="flex justify-between p-3 bg-gray-50 rounded"><span className="font-semibold">{word}</span><span className="text-gray-600">{count}</span></div>)}</div></div>}</div></div></div><Footer /></div>);
}
