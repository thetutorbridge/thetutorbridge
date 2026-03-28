'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Home, Radio } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function MorseCodeTranslatorPage() {
  const [text, setText] = useState('');
  const [morse, setMorse] = useState('');
  const morseCode: Record<string, string> = {'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.','H':'....','I':'..','J':'.---','K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-','U':'..-','V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..','0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',' ':'/'};

  const toMorse = () => {
    const result = text.toUpperCase().split('').map(char => morseCode[char] || '').join(' ');
    setMorse(result);
  };

  const fromMorse = () => {
    const reverseMorse = Object.fromEntries(Object.entries(morseCode).map(([k,v]) => [v,k]));
    const result = morse.split(' ').map(code => reverseMorse[code] || '').join('');
    setText(result);
  };

  return (<div className="flex flex-col min-h-screen"><Navigation /><div className="bg-gray-50 py-4 px-6"><div className="container mx-auto max-w-7xl"><nav className="flex items-center space-x-2 text-sm"><Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center"><Home className="w-4 h-4 mr-1" />Home</Link><span className="text-gray-400">/</span><Link href="/tools" className="text-[#1A3D7C] hover:text-[#2BAE66]">Tools</Link><span className="text-gray-400">/</span><span className="text-gray-600">Morse Code Translator</span></nav></div></div><div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4"><div className="max-w-6xl mx-auto"><div className="text-center mb-8"><div className="flex items-center justify-center mb-4"><Radio className="w-12 h-12 mr-3 text-[#2BAE66]" /><h1 className="text-4xl md:text-5xl font-bold text-gray-900">Morse Code Translator</h1></div><p className="text-xl text-gray-600">Translate text to/from Morse code</p></div><div className="bg-white rounded-2xl shadow-xl p-8 mb-6"><div className="grid md:grid-cols-2 gap-6 mb-6"><div><label className="block text-lg font-semibold text-gray-900 mb-3">Text</label><textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 min-h-[200px] resize-y" /></div><div><label className="block text-lg font-semibold text-gray-900 mb-3">Morse Code</label><textarea value={morse} onChange={(e) => setMorse(e.target.value)} placeholder=".- -... -.-." className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 min-h-[200px] resize-y font-mono" /></div></div><div className="flex gap-4"><button onClick={toMorse} className="flex-1 px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg">To Morse</button><button onClick={fromMorse} className="flex-1 px-8 py-4 bg-gradient-to-r from-[#2BAE66] to-[#1A3D7C] text-white rounded-lg font-bold text-lg hover:from-[#229554] hover:to-[#153162] transition-all shadow-lg">From Morse</button></div></div></div></div><Footer /></div>);
}
