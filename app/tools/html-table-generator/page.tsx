'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Table } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function HtmlTableGeneratorPage() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [hasHeader, setHasHeader] = useState(true);
  const [htmlCode, setHtmlCode] = useState('');

  const generateTable = () => {
    let html = '<table>\n';

    if (hasHeader) {
      html += '  <thead>\n    <tr>\n';
      for (let j = 0; j < cols; j++) {
        html += `      <th>Header ${j + 1}</th>\n`;
      }
      html += '    </tr>\n  </thead>\n';
    }

    html += '  <tbody>\n';
    const startRow = hasHeader ? 1 : 0;
    for (let i = startRow; i < rows; i++) {
      html += '    <tr>\n';
      for (let j = 0; j < cols; j++) {
        html += `      <td>Row ${hasHeader ? i : i + 1} Col ${j + 1}</td>\n`;
      }
      html += '    </tr>\n';
    }
    html += '  </tbody>\n</table>';

    setHtmlCode(html);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlCode);
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
            <span className="text-gray-600">HTML Table Generator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Table className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                HTML Table Generator
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Generate HTML tables - Custom rows and columns
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
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

              <div className="flex items-end">
                <label className="flex items-center space-x-3 mb-3">
                  <input
                    type="checkbox"
                    checked={hasHeader}
                    onChange={(e) => setHasHeader(e.target.checked)}
                    className="w-5 h-5 text-[#2BAE66]"
                  />
                  <span className="text-lg font-semibold text-gray-900">Include Header</span>
                </label>
              </div>
            </div>

            <button
              onClick={generateTable}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg mb-6"
            >
              Generate Table
            </button>

            {htmlCode && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-lg font-semibold text-gray-900">HTML Code</label>
                  <button
                    onClick={copyToClipboard}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
                  >
                    Copy Code
                  </button>
                </div>
                <textarea
                  value={htmlCode}
                  readOnly
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-900 min-h-[200px] resize-y font-mono text-sm mb-6"
                />

                <label className="block text-lg font-semibold text-gray-900 mb-3">Preview</label>
                <div className="overflow-x-auto border-2 border-gray-300 rounded-lg p-4">
                  <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
