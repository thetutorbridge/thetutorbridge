'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Home, Calculator } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function ScientificCalculatorPage() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');

  const handleNumber = (num: string) => {
    if (display === '0') setDisplay(num);
    else setDisplay(display + num);
  };

  const handleOperator = (op: string) => {
    setDisplay(display + ' ' + op + ' ');
  };

  const calculate = () => {
    try {
      const result = eval(display.replace(/×/g, '*').replace(/÷/g, '/'));
      setDisplay(result.toString());
      setExpression(display + ' = ' + result);
    } catch (e) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
  };

  const scientific = (func: string) => {
    try {
      const num = parseFloat(display);
      let result = 0;
      switch(func) {
        case 'sin': result = Math.sin(num); break;
        case 'cos': result = Math.cos(num); break;
        case 'tan': result = Math.tan(num); break;
        case 'log': result = Math.log10(num); break;
        case 'ln': result = Math.log(num); break;
        case 'sqrt': result = Math.sqrt(num); break;
        case 'pow': result = Math.pow(num, 2); break;
      }
      setDisplay(result.toString());
    } catch (e) {
      setDisplay('Error');
    }
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
            <span className="text-gray-600">Scientific Calculator</span>
          </nav>
        </div>
      </div>
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Scientific Calculator</h1>
            </div>
            <p className="text-xl text-gray-600">Advanced mathematical calculations</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="bg-gray-900 text-white p-6 rounded-lg mb-6">
              <div className="text-sm text-gray-400 min-h-[20px]">{expression}</div>
              <div className="text-3xl font-mono text-right">{display}</div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <button onClick={clear} className="col-span-2 px-4 py-3 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600">C</button>
              <button onClick={() => handleOperator('÷')} className="px-4 py-3 bg-[#1A3D7C] text-white rounded-lg font-bold">÷</button>
              <button onClick={() => handleOperator('×')} className="px-4 py-3 bg-[#1A3D7C] text-white rounded-lg font-bold">×</button>
              {['7','8','9'].map(n => <button key={n} onClick={() => handleNumber(n)} className="px-4 py-3 bg-gray-200 text-gray-900 rounded-lg font-bold hover:bg-gray-300">{n}</button>)}
              <button onClick={() => handleOperator('-')} className="px-4 py-3 bg-[#1A3D7C] text-white rounded-lg font-bold">-</button>
              {['4','5','6'].map(n => <button key={n} onClick={() => handleNumber(n)} className="px-4 py-3 bg-gray-200 text-gray-900 rounded-lg font-bold hover:bg-gray-300">{n}</button>)}
              <button onClick={() => handleOperator('+')} className="px-4 py-3 bg-[#1A3D7C] text-white rounded-lg font-bold">+</button>
              {['1','2','3'].map(n => <button key={n} onClick={() => handleNumber(n)} className="px-4 py-3 bg-gray-200 text-gray-900 rounded-lg font-bold hover:bg-gray-300">{n}</button>)}
              <button onClick={calculate} className="row-span-2 px-4 py-3 bg-[#2BAE66] text-white rounded-lg font-bold hover:bg-[#229554] text-2xl">=</button>
              <button onClick={() => handleNumber('0')} className="col-span-2 px-4 py-3 bg-gray-200 text-gray-900 rounded-lg font-bold hover:bg-gray-300">0</button>
              <button onClick={() => handleNumber('.')} className="px-4 py-3 bg-gray-200 text-gray-900 rounded-lg font-bold hover:bg-gray-300">.</button>
            </div>
            <div className="grid grid-cols-4 gap-3 mt-3">
              {['sin','cos','tan','log'].map(f => <button key={f} onClick={() => scientific(f)} className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-bold hover:bg-purple-600">{f}</button>)}
              {['ln','sqrt','x²','π'].map(f => <button key={f} onClick={() => scientific(f === 'x²' ? 'pow' : f === 'π' ? () => setDisplay(Math.PI.toString()) : f)} className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-bold hover:bg-purple-600">{f}</button>)}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
