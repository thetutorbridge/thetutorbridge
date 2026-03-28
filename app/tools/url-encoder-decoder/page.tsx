'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Link as LinkIcon, Copy, Check, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function UrlEncoderDecoderPage() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const encodeUrl = (text: string) => {
    if (!text) {
      setOutput('');
      setError('');
      return;
    }

    try {
      const encoded = encodeURIComponent(text);
      setOutput(encoded);
      setError('');
    } catch (e) {
      setError('Error encoding URL');
      setOutput('');
    }
  };

  const decodeUrl = (text: string) => {
    if (!text) {
      setOutput('');
      setError('');
      return;
    }

    try {
      const decoded = decodeURIComponent(text);
      setOutput(decoded);
      setError('');
    } catch (e) {
      setError('Invalid URL-encoded string');
      setOutput('');
    }
  };

  const handleConvert = () => {
    if (mode === 'encode') {
      encodeUrl(input);
    } else {
      decodeUrl(input);
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    // Auto-convert as user types
    if (mode === 'encode') {
      encodeUrl(value);
    } else {
      decodeUrl(value);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    const sample = mode === 'encode'
      ? 'https://example.com/search?q=hello world&name=John Doe'
      : 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26name%3DJohn%20Doe';
    setInput(sample);
    handleInputChange(sample);
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
            <span className="text-gray-600">URL Encoder/Decoder</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <LinkIcon className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                URL Encoder / Decoder
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Encode and decode URLs instantly - Free URL encoder/decoder tool
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            {/* Mode Selection */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => {
                  setMode('encode');
                  setInput('');
                  setOutput('');
                  setError('');
                }}
                className={`flex-1 px-6 py-4 rounded-lg font-bold text-lg transition-all ${
                  mode === 'encode'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Encode URL
              </button>
              <button
                onClick={() => {
                  setMode('decode');
                  setInput('');
                  setOutput('');
                  setError('');
                }}
                className={`flex-1 px-6 py-4 rounded-lg font-bold text-lg transition-all ${
                  mode === 'decode'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Decode URL
              </button>
            </div>

            <div className="flex justify-between items-center mb-3">
              <label className="block text-lg font-semibold text-gray-900">
                Input {mode === 'encode' ? '(Plain URL)' : '(Encoded URL)'}
              </label>
              <button
                onClick={loadSample}
                className="text-sm text-[#1A3D7C] hover:text-[#2BAE66] font-semibold"
              >
                Load Sample
              </button>
            </div>

            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={
                mode === 'encode'
                  ? 'Enter URL or text to encode...'
                  : 'Enter encoded URL to decode...'
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 min-h-[120px] resize-y font-mono text-sm"
            />

            <div className="flex items-center justify-center my-4">
              <ArrowRight className="w-8 h-8 text-gray-400" />
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-red-700 font-semibold">{error}</p>
              </div>
            )}

            {output && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-lg font-semibold text-gray-900">
                    Output {mode === 'encode' ? '(Encoded URL)' : '(Decoded URL)'}
                  </label>
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-[#2BAE66] text-white rounded-lg font-semibold hover:bg-[#229554] transition-all flex items-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <p className="text-gray-700 font-mono text-sm break-all">{output}</p>
                </div>
              </div>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">URL Encoding</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                URL encoding converts characters into a format that can be transmitted over the internet. Special characters are replaced with % followed by hex digits.
              </p>
              <p className="text-gray-600 text-xs">
                Example: "hello world" becomes "hello%20world"
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">URL Decoding</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                URL decoding converts encoded URLs back to their original format. It replaces %XX codes with their corresponding characters.
              </p>
              <p className="text-gray-600 text-xs">
                Example: "hello%20world" becomes "hello world"
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
