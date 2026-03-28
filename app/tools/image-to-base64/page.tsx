'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Image as ImageIcon } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function ImageToBase64Page() {
  const [base64, setBase64] = useState('');
  const [preview, setPreview] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setBase64(result);
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(base64);
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
            <span className="text-gray-600">Image to Base64</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <ImageIcon className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Image to Base64 Converter
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Convert images to Base64 encoded strings
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">Upload Image</label>
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
                  <img src={preview} alt="Preview" className="max-w-full max-h-64 object-contain" />
                </div>
              </div>
            )}

            {base64 && (
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-900 mb-3">Base64 Output</label>
                <textarea
                  value={base64}
                  readOnly
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-900 min-h-[150px] resize-y font-mono text-xs"
                />
              </div>
            )}

            {base64 && (
              <button
                onClick={copyToClipboard}
                className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg"
              >
                Copy Base64
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
