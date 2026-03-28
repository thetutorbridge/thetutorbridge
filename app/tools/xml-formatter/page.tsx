'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, FileCode } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function XmlFormatterPage() {
  const [xml, setXml] = useState('');
  const [formatted, setFormatted] = useState('');

  const format = () => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, 'text/xml');
      const serializer = new XMLSerializer();
      let result = serializer.serializeToString(xmlDoc);

      // Basic indentation
      result = result.replace(/></g, '>\n<');
      const lines = result.split('\n');
      let indent = 0;
      const indented = lines.map(line => {
        if (line.match(/<\/\w/)) indent = Math.max(0, indent - 1);
        const indentedLine = '  '.repeat(indent) + line;
        if (line.match(/<\w[^>]*[^\/]>/)) indent++;
        return indentedLine;
      });

      setFormatted(indented.join('\n'));
    } catch (e) {
      setFormatted('Error: Invalid XML');
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
            <span className="text-gray-600">XML Formatter</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <FileCode className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                XML Formatter
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Format XML data - Free XML formatter
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">XML Input</label>
                <textarea
                  value={xml}
                  onChange={(e) => setXml(e.target.value)}
                  placeholder="<root><item>data</item></root>"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 min-h-[300px] resize-y font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Formatted XML</label>
                <textarea
                  value={formatted}
                  readOnly
                  placeholder="Formatted output..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-900 min-h-[300px] resize-y font-mono text-sm"
                />
              </div>
            </div>

            <button
              onClick={format}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg"
            >
              Format XML
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
