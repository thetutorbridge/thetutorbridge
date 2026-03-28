'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, FileCode } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function JsonToXmlPage() {
  const [json, setJson] = useState('');
  const [xml, setXml] = useState('');

  const jsonToXml = (obj: any, rootName = 'root'): string => {
    let xml = '';

    const convertValue = (key: string, value: any): string => {
      if (value === null || value === undefined) {
        return `<${key} />`;
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        let inner = '';
        for (const k in value) {
          inner += convertValue(k, value[k]);
        }
        return `<${key}>${inner}</${key}>`;
      } else if (Array.isArray(value)) {
        return value.map(item => convertValue(key, item)).join('');
      } else {
        return `<${key}>${value}</${key}>`;
      }
    };

    if (typeof obj === 'object' && !Array.isArray(obj)) {
      for (const key in obj) {
        xml += convertValue(key, obj[key]);
      }
      return `<${rootName}>${xml}</${rootName}>`;
    } else {
      return `<${rootName}>${obj}</${rootName}>`;
    }
  };

  const convert = () => {
    try {
      const parsed = JSON.parse(json);
      const xmlOutput = jsonToXml(parsed);
      setXml(xmlOutput);
    } catch (e) {
      setXml('Error: Invalid JSON');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(xml);
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
            <span className="text-gray-600">JSON to XML</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <FileCode className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                JSON to XML Converter
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Convert JSON to XML - Free converter
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">JSON Input</label>
                <textarea
                  value={json}
                  onChange={(e) => setJson(e.target.value)}
                  placeholder='{"name": "John", "age": 30}'
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 min-h-[300px] resize-y font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">XML Output</label>
                <textarea
                  value={xml}
                  readOnly
                  placeholder="XML output..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-900 min-h-[300px] resize-y font-mono text-sm"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={convert}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg"
              >
                Convert to XML
              </button>
              <button
                onClick={copyToClipboard}
                className="px-8 py-4 bg-gray-600 text-white rounded-lg font-bold text-lg hover:bg-gray-700 transition-all shadow-lg"
              >
                Copy XML
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
