'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Barcode } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function BarcodeGeneratorPage() {
  const [text, setText] = useState('');
  const [format, setFormat] = useState('code128');
  const [barcode, setBarcode] = useState('');

  const generateBarcode = () => {
    if (!text) {
      setBarcode('');
      return;
    }

    // Using free barcode API service
    const barcodeUrl = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(text)}&code=${format === 'code128' ? 'Code128' : format === 'ean13' ? 'EAN13' : 'UPCA'}&translate-esc=on`;
    setBarcode(barcodeUrl);
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
            <span className="text-gray-600">Barcode Generator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Barcode className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Barcode Generator
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Generate barcodes - Free barcode creator
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">Barcode Data</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or numbers"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">Barcode Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900"
              >
                <option value="code128">Code 128</option>
                <option value="ean13">EAN-13</option>
                <option value="upca">UPC-A</option>
              </select>
            </div>

            <button
              onClick={generateBarcode}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg mb-6"
            >
              Generate Barcode
            </button>

            {barcode && (
              <div className="mt-6">
                <label className="block text-lg font-semibold text-gray-900 mb-3">Your Barcode</label>
                <div className="flex justify-center p-8 bg-gray-50 rounded-lg">
                  <img src={barcode} alt="Generated Barcode" className="max-w-full" />
                </div>
                <div className="mt-4 text-center">
                  <a
                    href={barcode}
                    download="barcode.png"
                    className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
                  >
                    Download Barcode
                  </a>
                </div>
              </div>
            )}

            <div className="mt-6 bg-blue-50 border-l-4 border-[#1A3D7C] p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Format Guidelines:</strong>
              </p>
              <ul className="text-sm text-gray-700 mt-2 space-y-1">
                <li>• Code 128: Alphanumeric characters</li>
                <li>• EAN-13: 13 digits (e.g., 1234567890123)</li>
                <li>• UPC-A: 12 digits (e.g., 123456789012)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
