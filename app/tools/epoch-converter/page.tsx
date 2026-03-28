'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Clock3 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function EpochConverterPage() {
  const [mode, setMode] = useState<'to-epoch' | 'from-epoch'>('to-epoch');
  const [dateTime, setDateTime] = useState('');
  const [epoch, setEpoch] = useState('');
  const [result, setResult] = useState('');

  const convert = () => {
    try {
      if (mode === 'to-epoch') {
        if (!dateTime) {
          setResult('');
          return;
        }
        const timestamp = new Date(dateTime).getTime();
        setResult(Math.floor(timestamp / 1000).toString());
      } else {
        if (!epoch) {
          setResult('');
          return;
        }
        const date = new Date(parseInt(epoch) * 1000);
        setResult(date.toLocaleString());
      }
    } catch (e) {
      setResult('Error');
    }
  };

  const useNow = () => {
    const now = new Date();
    setDateTime(now.toISOString().slice(0, 16));
    setResult(Math.floor(now.getTime() / 1000).toString());
  };

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
            <span className="text-gray-600">Epoch Converter</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Clock3 className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Unix Epoch Converter
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Convert between date/time and Unix timestamp - Free converter
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => { setMode('to-epoch'); setDateTime(''); setEpoch(''); setResult(''); }}
                className={`flex-1 px-6 py-3 rounded-lg font-bold transition-all ${
                  mode === 'to-epoch'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Date to Epoch
              </button>
              <button
                onClick={() => { setMode('from-epoch'); setDateTime(''); setEpoch(''); setResult(''); }}
                className={`flex-1 px-6 py-3 rounded-lg font-bold transition-all ${
                  mode === 'from-epoch'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Epoch to Date
              </button>
            </div>

            {mode === 'to-epoch' ? (
              <>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Date & Time</label>
                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => { setDateTime(e.target.value); convert(); }}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-semibold mb-4"
                />
                <button
                  onClick={useNow}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all mb-6"
                >
                  Use Current Time
                </button>
              </>
            ) : (
              <>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Unix Timestamp (Epoch)</label>
                <input
                  type="number"
                  value={epoch}
                  onChange={(e) => { setEpoch(e.target.value); convert(); }}
                  placeholder="1700000000"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-mono mb-6"
                />
              </>
            )}

            {result && (
              <div className="p-6 bg-gradient-to-br from-blue-50 to-teal-50 border-2 border-blue-200 rounded-lg text-center">
                <p className="text-sm font-semibold text-gray-600 mb-2">
                  {mode === 'to-epoch' ? 'Unix Timestamp' : 'Date & Time'}
                </p>
                <p className="text-3xl font-bold text-gray-900 font-mono">{result}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
