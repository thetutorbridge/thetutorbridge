'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Code } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function HtmlBeautifierPage() {
  const [html, setHtml] = useState('');
  const [formatted, setFormatted] = useState('');

  const beautify = () => {
    try {
      let result = html;
      let indent = 0;
      const formatted = result
        .replace(/></g, '>\n<')
        .split('\n')
        .map(line => {
          const trimmed = line.trim();
          if (trimmed.match(/<\/\w/)) indent = Math.max(0, indent - 1);
          const indented = '  '.repeat(indent) + trimmed;
          if (trimmed.match(/<\w[^>]*[^\/]>/) && !trimmed.match(/<\/(html|head|body|div|span|p|h[1-6]|ul|ol|li|table|tr|td|th)>/)) {
            indent++;
          }
          return indented;
        })
        .join('\n');

      setFormatted(formatted);
    } catch (e) {
      setFormatted('Error: Invalid HTML');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formatted);
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
            <span className="text-gray-600">HTML Beautifier</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Code className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                HTML Beautifier
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Format HTML code - Free beautifier
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">HTML Input</label>
                <textarea
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  placeholder="<div><p>Hello World</p></div>"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 min-h-[300px] resize-y font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Formatted HTML</label>
                <textarea
                  value={formatted}
                  readOnly
                  placeholder="Formatted output..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-900 min-h-[300px] resize-y font-mono text-sm"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={beautify}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg"
              >
                Beautify HTML
              </button>
              <button
                onClick={copyToClipboard}
                className="px-8 py-4 bg-gray-600 text-white rounded-lg font-bold text-lg hover:bg-gray-700 transition-all shadow-lg"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
