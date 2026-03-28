'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, QrCode } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function QrCodeScannerPage() {
  const [result, setResult] = useState('');
  const [preview, setPreview] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result as string;
      setPreview(imageData);

      // Create an image element to load the QR code
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          // Basic QR code detection (simplified - real implementation would use a library)
          setResult('QR Code scanning requires a specialized library. Please use a camera-based QR scanner or upload to a dedicated scanning service.');
        } catch (error) {
          setResult('Error: Could not scan QR code');
        }
      };
      img.src = imageData;
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
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
            <span className="text-gray-600">QR Code Scanner</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <QrCode className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                QR Code Scanner
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Scan QR codes from images
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">Upload QR Code Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900"
              />
            </div>

            {preview && (
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-900 mb-3">Preview</label>
                <div className="flex justify-center p-4 bg-gray-50 rounded-lg">
                  <img src={preview} alt="QR Code" className="max-w-full max-h-64 object-contain" />
                </div>
              </div>
            )}

            {result && (
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-900 mb-3">Scanned Result</label>
                <textarea
                  value={result}
                  readOnly
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-900 min-h-[100px] resize-y"
                />
                <button
                  onClick={copyToClipboard}
                  className="mt-4 px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
                >
                  Copy Result
                </button>
              </div>
            )}

            <div className="bg-blue-50 border-l-4 border-[#1A3D7C] p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> For full QR code scanning functionality, this tool would require integration with a specialized QR scanning library like jsQR or zxing. For now, this demonstrates the upload and preview functionality.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
