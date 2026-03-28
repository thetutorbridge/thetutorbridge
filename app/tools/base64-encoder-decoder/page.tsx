'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Code, Copy, Check, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function Base64EncoderDecoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const encodeBase64 = (text: string) => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(text)));
      setOutput(encoded);
      setError('');
    } catch (e) {
      setError('Error encoding text');
      setOutput('');
    }
  };

  const decodeBase64 = (text: string) => {
    try {
      const decoded = decodeURIComponent(escape(atob(text)));
      setOutput(decoded);
      setError('');
    } catch (e) {
      setError('Invalid Base64 string');
      setOutput('');
    }
  };

  const handleConvert = () => {
    if (!input) {
      setOutput('');
      setError('');
      return;
    }

    if (mode === 'encode') {
      encodeBase64(input);
    } else {
      decodeBase64(input);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const switchMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput(input);
    setError('');
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
            <span className="text-gray-600">Base64 Encoder/Decoder</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Code className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Base64 Encoder/Decoder
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Encode and decode Base64 text instantly - Free online Base64 converter
            </p>
          </div>

          {/* Mode Selection */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => { setMode('encode'); setError(''); }}
                className={`flex-1 px-6 py-4 rounded-lg font-bold text-lg transition-all ${
                  mode === 'encode'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Encode to Base64
              </button>
              <button
                onClick={() => { setMode('decode'); setError(''); }}
                className={`flex-1 px-6 py-4 rounded-lg font-bold text-lg transition-all ${
                  mode === 'decode'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Decode from Base64
              </button>
            </div>

            {/* Input */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
                className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none resize-none text-gray-900 text-lg font-mono"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleConvert}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {mode === 'encode' ? 'Encode' : 'Decode'}
                <ArrowRight className="w-5 h-5" />
              </button>
              {output && (
                <button
                  onClick={switchMode}
                  className="px-8 py-4 bg-gray-500 text-white rounded-lg font-bold text-lg hover:bg-gray-600 transition-all"
                >
                  Switch Mode
                </button>
              )}
            </div>
          </div>

          {/* Output */}
          {(output || error) && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {error ? 'Error' : mode === 'encode' ? 'Encoded Result' : 'Decoded Result'}
                </h2>
                {output && (
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-[#2BAE66] text-white rounded-lg font-semibold hover:bg-[#229554] transition-all flex items-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                )}
              </div>
              {error ? (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                  <p className="text-red-600 font-semibold">{error}</p>
                </div>
              ) : (
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
                  <pre className="whitespace-pre-wrap break-all font-mono text-gray-900">{output}</pre>
                </div>
              )}
            </div>
          )}

          {/* Info Section */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 mb-6">
            <div className="flex items-start gap-3">
              <Code className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">What is Base64?</h3>
                <p className="text-gray-700 mb-3">
                  Base64 is an encoding scheme that converts binary data into ASCII text format. It's commonly used to encode data for transfer over text-based protocols like email and HTTP.
                </p>
                <p className="text-gray-600 text-sm">
                  All encoding and decoding happens locally in your browser - your data is never sent to our servers.
                </p>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Uses</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Embedding images in HTML/CSS</li>
                <li>• Encoding binary data for APIs</li>
                <li>• Email attachments (MIME)</li>
                <li>• Data URIs in web development</li>
                <li>• Storing binary data in JSON</li>
                <li>• Authentication tokens</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Base64 Basics</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Uses 64 characters: A-Z, a-z, 0-9, +, /</li>
                <li>• Padding character: = (for alignment)</li>
                <li>• Increases data size by ~33%</li>
                <li>• Not encryption (easily reversible)</li>
                <li>• Safe for text-based transmission</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
