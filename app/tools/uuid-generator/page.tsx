'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Key, Copy, Check, RotateCcw } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function UuidGeneratorPage() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [version, setVersion] = useState<'v4' | 'v1'>('v4');
  const [copied, setCopied] = useState(false);

  const generateUUID = () => {
    if (version === 'v4') {
      // Generate UUID v4 (random)
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    } else {
      // Generate UUID v1 (time-based - simplified)
      const now = Date.now();
      const timeHex = now.toString(16).padStart(12, '0');
      const randomHex = Math.random().toString(16).slice(2, 14).padStart(12, '0');
      return `${timeHex.slice(0, 8)}-${timeHex.slice(8, 12)}-1${randomHex.slice(0, 3)}-${randomHex.slice(3, 7)}-${randomHex.slice(7, 12)}${Math.random().toString(16).slice(2, 3)}`;
    }
  };

  const generateUUIDs = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
  };

  const copyToClipboard = (uuid?: string) => {
    const text = uuid || uuids.join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <span className="text-gray-600">UUID Generator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Key className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                UUID Generator
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Generate unique UUIDs (GUIDs) instantly - Free UUID generator
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  UUID Version
                </label>
                <select
                  value={version}
                  onChange={(e) => setVersion(e.target.value as 'v4' | 'v1')}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 font-semibold"
                >
                  <option value="v4">Version 4 (Random)</option>
                  <option value="v1">Version 1 (Time-based)</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Count
                </label>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                  min="1"
                  max="100"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={generateUUIDs}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Generate
                </button>
              </div>
            </div>
          </div>

          {uuids.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Generated UUID{uuids.length > 1 ? 's' : ''}
                </h2>
                <button
                  onClick={() => copyToClipboard()}
                  className="px-4 py-2 bg-[#2BAE66] text-white rounded-lg font-semibold hover:bg-[#229554] transition-all flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy All'}
                </button>
              </div>

              <div className="space-y-3">
                {uuids.map((uuid, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 border-2 border-gray-200 rounded-lg p-4"
                  >
                    <code className="text-gray-700 font-mono text-sm md:text-base flex-1">
                      {uuid}
                    </code>
                    <button
                      onClick={() => copyToClipboard(uuid)}
                      className="ml-4 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-all"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">UUID Version 4</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Version 4 UUIDs are randomly generated and are the most commonly used. They provide excellent uniqueness with 122 random bits.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">UUID Version 1</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Version 1 UUIDs are time-based and include timestamp information. Useful when you need sortable unique identifiers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
