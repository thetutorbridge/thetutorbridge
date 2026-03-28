'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, FileJson } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function YamlToJsonPage() {
  const [yaml, setYaml] = useState('');
  const [json, setJson] = useState('');

  const convert = () => {
    try {
      // Basic YAML parser (handles simple cases)
      const lines = yaml.trim().split('\n');
      const result: any = {};
      let currentIndent = 0;
      let currentObj: any = result;
      const stack: any[] = [result];

      lines.forEach(line => {
        if (line.trim().startsWith('#')) return; // Skip comments

        const indent = line.search(/\S/);
        const trimmed = line.trim();

        if (trimmed.includes(':')) {
          const [key, ...valueParts] = trimmed.split(':');
          const value = valueParts.join(':').trim();

          if (value) {
            // Simple key-value pair
            currentObj[key.trim()] = isNaN(Number(value)) ? value : Number(value);
          } else {
            // Nested object
            currentObj[key.trim()] = {};
            stack.push(currentObj[key.trim()]);
            currentObj = currentObj[key.trim()];
            currentIndent = indent;
          }
        } else if (trimmed.startsWith('- ')) {
          // Array item
          const value = trimmed.substring(2).trim();
          if (!Array.isArray(currentObj)) {
            currentObj = [];
          }
          currentObj.push(isNaN(Number(value)) ? value : Number(value));
        }
      });

      setJson(JSON.stringify(result, null, 2));
    } catch (e) {
      setJson('Error: Invalid YAML format');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(json);
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
            <span className="text-gray-600">YAML to JSON</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <FileJson className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                YAML to JSON Converter
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Convert YAML to JSON - Free converter
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">YAML Input</label>
                <textarea
                  value={yaml}
                  onChange={(e) => setYaml(e.target.value)}
                  placeholder="name: John&#10;age: 30&#10;city: New York"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 min-h-[300px] resize-y font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">JSON Output</label>
                <textarea
                  value={json}
                  readOnly
                  placeholder="JSON output..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-900 min-h-[300px] resize-y font-mono text-sm"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={convert}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg"
              >
                Convert to JSON
              </button>
              <button
                onClick={copyToClipboard}
                className="px-8 py-4 bg-gray-600 text-white rounded-lg font-bold text-lg hover:bg-gray-700 transition-all shadow-lg"
              >
                Copy JSON
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
