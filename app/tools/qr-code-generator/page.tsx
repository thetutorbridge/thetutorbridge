'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Home, QrCode, Download, Copy, Check } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function QrCodeGeneratorPage() {
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);
  const [qrCode, setQrCode] = useState('');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simple QR Code generation using a free API
  const generateQRCode = () => {
    if (!text) {
      setQrCode('');
      return;
    }

    // Use QR Server API (free, no API key needed)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
    setQrCode(qrUrl);
  };

  const downloadQRCode = () => {
    if (!qrCode) return;

    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setText('https://www.thetutorbridge.com');
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent('https://www.thetutorbridge.com')}`;
    setQrCode(qrUrl);
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
            <span className="text-gray-600">QR Code Generator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <QrCode className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                QR Code Generator
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Generate QR codes for URLs, text, and more - Free QR code generator
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="block text-lg font-semibold text-gray-900">
                Enter Text or URL
              </label>
              <button
                onClick={loadSample}
                className="text-sm text-[#1A3D7C] hover:text-[#2BAE66] font-semibold"
              >
                Load Sample
              </button>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter URL, text, phone number, or any data..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 min-h-[100px] resize-y mb-6"
            />

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  QR Code Size
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 font-semibold"
                >
                  <option value="128">Small (128x128)</option>
                  <option value="256">Medium (256x256)</option>
                  <option value="512">Large (512x512)</option>
                  <option value="1024">Extra Large (1024x1024)</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={generateQRCode}
                  disabled={!text}
                  className="w-full px-8 py-3 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <QrCode className="w-5 h-5" />
                  Generate QR Code
                </button>
              </div>
            </div>

            {qrCode && (
              <div className="text-center">
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8 mb-6 inline-block">
                  <img src={qrCode} alt="QR Code" className="max-w-full h-auto" />
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={downloadQRCode}
                    className="px-6 py-3 bg-[#2BAE66] text-white rounded-lg font-bold hover:bg-[#229554] transition-all flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download PNG
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-all flex items-center gap-2"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copied ? 'Copied!' : 'Copy Text'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <canvas ref={canvasRef} style={{ display: 'none' }} />

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What is a QR Code?</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                QR (Quick Response) codes are 2D barcodes that can store URLs, text, contact info, and more. They can be scanned with smartphone cameras.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Use Cases</h3>
              <ul className="text-gray-700 text-sm leading-relaxed space-y-1">
                <li>• Website URLs and landing pages</li>
                <li>• Contact information (vCard)</li>
                <li>• WiFi credentials</li>
                <li>• Product information</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
