'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!pattern || !testString) {
      setMatches([]);
      setError('');
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const found = testString.match(regex);
      setMatches(found || []);
      setError('');
    } catch (e) {
      setError('Invalid regular expression');
      setMatches([]);
    }
  }, [pattern, flags, testString]);

  const highlightMatches = () => {
    if (!pattern || !testString || matches.length === 0) return testString;

    try {
      const regex = new RegExp(pattern, flags);
      return testString.replace(regex, (match) => `<mark class="bg-yellow-300">${match}</mark>`);
    } catch {
      return testString;
    }
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
            <span className="text-gray-600">Regex Tester</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Search className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Regex Tester
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Test regular expressions - Real-time matching
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">Regular Expression</label>
              <div className="flex gap-3">
                <span className="text-2xl text-gray-600">/</span>
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="[A-Z]\w+"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 font-mono"
                />
                <span className="text-2xl text-gray-600">/</span>
                <input
                  type="text"
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  placeholder="g"
                  className="w-20 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 font-mono"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Flags: g (global), i (case-insensitive), m (multiline), s (dotAll), u (unicode), y (sticky)
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">Test String</label>
              <textarea
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                placeholder="Enter text to test against your regex pattern..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 min-h-[150px] resize-y"
              />
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700 font-semibold">{error}</p>
              </div>
            )}

            {!error && matches.length > 0 && (
              <div className="mb-6">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-4">
                  <p className="text-green-700 font-semibold">
                    {matches.length} match{matches.length !== 1 ? 'es' : ''} found
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold text-gray-900 mb-3">Highlighted Matches</label>
                  <div
                    className="p-4 bg-gray-50 border-2 border-gray-300 rounded-lg min-h-[100px] whitespace-pre-wrap font-mono text-sm"
                    dangerouslySetInnerHTML={{ __html: highlightMatches() }}
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">Match List</label>
                  <div className="space-y-2">
                    {matches.map((match, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <span className="text-sm text-gray-600 mr-3">Match {index + 1}:</span>
                        <span className="font-mono text-gray-900">{match}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!error && pattern && testString && matches.length === 0 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <p className="text-yellow-700 font-semibold">No matches found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
