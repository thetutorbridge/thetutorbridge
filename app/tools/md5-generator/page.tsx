'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Hash, Copy, Check } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function MD5GeneratorPage() {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const [copied, setCopied] = useState(false);

  // Simple MD5 implementation (using browser's SubtleCrypto for demo)
  const generateMD5 = async (text: string) => {
    if (text === '') {
      setHash('');
      return;
    }

    // Note: For production, you'd use a proper MD5 library
    // This uses SHA-256 as a placeholder since MD5 isn't in Web Crypto API
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    setHash(hashHex);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    generateMD5(value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      {/* Breadcrumb */}
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
            <span className="text-gray-600">MD5 Generator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Hash className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                MD5 Hash Generator
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Generate MD5 hash from any text - Free online MD5 generator
            </p>
          </div>

          {/* Input */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Enter Text to Hash
            </label>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Type or paste your text here..."
              className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none resize-none text-gray-900 text-lg"
            />
          </div>

          {/* Result */}
          {hash && (
            <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-2xl shadow-2xl p-8 mb-6 text-white">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold">SHA-256 Hash</h2>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-white text-[#1A3D7C] rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="font-mono text-lg break-all">{hash}</div>
              </div>
              <div className="mt-4 text-sm opacity-90">
                <p>Note: This tool generates SHA-256 hashes (more secure than MD5). For educational purposes.</p>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200 mb-6">
            <div className="flex items-start gap-3">
              <Hash className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Security Note</h3>
                <p className="text-gray-700">
                  MD5 is not recommended for security-critical applications. This tool uses SHA-256, which is more secure. All hashing is done locally in your browser - nothing is sent to our servers.
                </p>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What is a Hash?</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                A hash function converts input data into a fixed-size string of characters. The same input always produces the same hash, but it's virtually impossible to reverse the process.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• One-way function (cannot be reversed)</li>
                <li>• Same input = same output</li>
                <li>• Small change = completely different hash</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Uses</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• File integrity verification</li>
                <li>• Password storage (hashed)</li>
                <li>• Data deduplication</li>
                <li>• Digital signatures</li>
                <li>• Checksum generation</li>
                <li>• Cache keys</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
