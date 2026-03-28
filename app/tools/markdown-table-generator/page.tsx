'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Table } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function MarkdownTableGeneratorPage() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [markdown, setMarkdown] = useState('');

  const generateTable = () => {
    let md = '| ';
    for (let j = 0; j < cols; j++) {
      md += `Header ${j + 1} | `;
    }
    md += '\n| ';
    for (let j = 0; j < cols; j++) {
      md += '--- | ';
    }
    md += '\n';

    for (let i = 0; i < rows - 1; i++) {
      md += '| ';
      for (let j = 0; j < cols; j++) {
        md += `Row ${i + 1} Col ${j + 1} | `;
      }
      md += '\n';
    }

    setMarkdown(md);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
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
            <span className="text-gray-600">Markdown Table Generator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Table className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Markdown Table Generator
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Generate markdown tables for GitHub and docs
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Rows</label>
                <input
                  type="number"
                  value={rows}
                  onChange={(e) => setRows(parseInt(e.target.value) || 1)}
                  min="1"
                  max="20"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Columns</label>
                <input
                  type="number"
                  value={cols}
                  onChange={(e) => setCols(parseInt(e.target.value) || 1)}
                  min="1"
                  max="20"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900"
                />
              </div>
            </div>

            <button
              onClick={generateTable}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg mb-6"
            >
              Generate Table
            </button>

            {markdown && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-lg font-semibold text-gray-900">Markdown Code</label>
                  <button
                    onClick={copyToClipboard}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
                  >
                    Copy Code
                  </button>
                </div>
                <textarea
                  value={markdown}
                  readOnly
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-900 min-h-[200px] resize-y font-mono text-sm"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
