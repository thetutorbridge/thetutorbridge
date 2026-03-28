'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Home, Space } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
export default function WhitespaceRemoverPage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const remove = () => setResult(text.replace(/\s+/g, ' ').trim());
  return (<div className="flex flex-col min-h-screen"><Navigation /><div className="bg-gray-50 py-4 px-6"><div className="container mx-auto max-w-7xl"><nav className="flex items-center space-x-2 text-sm"><Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center"><Home className="w-4 h-4 mr-1" />Home</Link><span className="text-gray-400">/</span><Link href="/tools" className="text-[#1A3D7C] hover:text-[#2BAE66]">Tools</Link><span className="text-gray-400">/</span><span className="text-gray-600">Whitespace Remover</span></nav></div></div><div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4"><div className="max-w-6xl mx-auto"><div className="text-center mb-8"><div className="flex items-center justify-center mb-4"><Space className="w-12 h-12 mr-3 text-[#2BAE66]" /><h1 className="text-4xl md:text-5xl font-bold text-gray-900">Whitespace Remover</h1></div><p className="text-xl text-gray-600">Remove extra whitespace</p></div><div className="bg-white rounded-2xl shadow-xl p-8"><div className="grid md:grid-cols-2 gap-6 mb-6"><div><label className="block text-lg font-semibold text-gray-900 mb-3">Input</label><textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Text   with    extra    spaces" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none min-h-[300px] resize-y" /></div><div><label className="block text-lg font-semibold text-gray-900 mb-3">Cleaned</label><textarea value={result} readOnly className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 min-h-[300px] resize-y" /></div></div><button onClick={remove} className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg">Remove Whitespace</button></div></div></div><Footer /></div>);
}
