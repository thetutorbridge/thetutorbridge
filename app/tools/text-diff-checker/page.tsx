'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, FileSearch } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function TextDiffCheckerPage() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [differences, setDifferences] = useState<string[]>([]);

  const checkDiff = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const diffs: string[] = [];

    const maxLength = Math.max(lines1.length, lines2.length);
    for (let i = 0; i < maxLength; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';
      if (line1 !== line2) {
        diffs.push(`Line ${i + 1}: "${line1}" vs "${line2}"`);
      }
    }

    setDifferences(diffs);
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
            <span className="text-gray-600">Text Diff Checker</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <FileSearch className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Text Diff Checker
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Compare two texts and find differences - Free text diff tool
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Text 1</label>
                <textarea
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  placeholder="Enter first text..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 min-h-[200px] resize-y font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Text 2</label>
                <textarea
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  placeholder="Enter second text..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 min-h-[200px] resize-y font-mono text-sm"
                />
              </div>
            </div>

            <button
              onClick={checkDiff}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg"
            >
              Find Differences
            </button>

            {differences.length > 0 && (
              <div className="mt-6 p-6 bg-gray-50 border-2 border-gray-200 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{differences.length} Difference(s) Found</h3>
                <div className="space-y-2">
                  {differences.map((diff, idx) => (
                    <div key={idx} className="p-3 bg-white rounded border-l-4 border-orange-500">
                      <p className="text-sm text-gray-700 font-mono">{diff}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {differences.length === 0 && text1 && text2 && (
              <div className="mt-6 p-6 bg-green-50 border-2 border-green-200 rounded-lg text-center">
                <p className="text-lg font-bold text-green-700">No differences found! Texts are identical.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
