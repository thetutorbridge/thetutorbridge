'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, FileJson, Copy, Check, Minimize2, Maximize2 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function JsonFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    setError('');
    if (!input.trim()) {
      setOutput('');
      setError('Please enter JSON to format');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
    } catch (e) {
      setError(`Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`);
      setOutput('');
    }
  };

  const minifyJson = () => {
    setError('');
    if (!input.trim()) {
      setOutput('');
      setError('Please enter JSON to minify');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (e) {
      setError(`Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`);
      setOutput('');
    }
  };

  const validateJson = () => {
    setError('');
    if (!input.trim()) {
      setError('Please enter JSON to validate');
      return;
    }

    try {
      JSON.parse(input);
      setError('');
      setOutput('✓ Valid JSON');
    } catch (e) {
      setError(`Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`);
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    const sample = {
      name: 'John Doe',
      age: 30,
      email: 'john@example.com',
      address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA',
      },
      hobbies: ['reading', 'coding', 'traveling'],
      active: true,
    };
    setInput(JSON.stringify(sample));
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
            <span className="text-gray-600">JSON Formatter</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <FileJson className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                JSON Formatter
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Format, minify, and validate JSON data instantly - Free JSON formatter tool
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-lg font-semibold text-gray-900">
                Input JSON
              </label>
              <button
                onClick={loadSample}
                className="text-sm text-[#1A3D7C] hover:text-[#2BAE66] font-semibold"
              >
                Load Sample
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"name": "John", "age": 30}'
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 min-h-[200px] resize-y font-mono text-sm"
            />

            <div className="grid md:grid-cols-4 gap-4 mt-6 mb-6">
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Indent Size
                </label>
                <select
                  value={indent}
                  onChange={(e) => setIndent(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 font-semibold"
                >
                  <option value="2">2 spaces</option>
                  <option value="4">4 spaces</option>
                  <option value="8">8 spaces</option>
                </select>
              </div>

              <button
                onClick={formatJson}
                className="px-6 py-2 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Maximize2 className="w-4 h-4" />
                Format
              </button>

              <button
                onClick={minifyJson}
                className="px-6 py-2 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Minimize2 className="w-4 h-4" />
                Minify
              </button>

              <button
                onClick={validateJson}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Validate
              </button>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-red-700 font-semibold">{error}</p>
              </div>
            )}

            {output && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-lg font-semibold text-gray-900">
                    Output
                  </label>
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-[#2BAE66] text-white rounded-lg font-semibold hover:bg-[#229554] transition-all flex items-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 max-h-96 overflow-y-auto">
                  <pre className="text-gray-700 text-sm font-mono whitespace-pre-wrap break-words">{output}</pre>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  <p>Size: {output.length} characters</p>
                </div>
              </div>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Format JSON</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Pretty-print JSON with proper indentation for better readability.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Minify JSON</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Remove all whitespace and compress JSON to reduce file size.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Validate JSON</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Check if your JSON syntax is valid and identify errors.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
