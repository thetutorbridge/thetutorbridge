'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Code2, Copy, Check, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function HtmlEncoderDecoderPage() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const encodeHtml = (text: string) => {
    if (!text) {
      setOutput('');
      return;
    }

    const encoded = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');

    setOutput(encoded);
  };

  const decodeHtml = (text: string) => {
    if (!text) {
      setOutput('');
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    const decoded = textarea.value;
    setOutput(decoded);
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    // Auto-convert as user types
    if (mode === 'encode') {
      encodeHtml(value);
    } else {
      decodeHtml(value);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    const sample = mode === 'encode'
      ? '<div class="container">Hello & welcome to "The Tutor Bridge"</div>'
      : '&lt;div class=&quot;container&quot;&gt;Hello &amp; welcome to &quot;The Tutor Bridge&quot;&lt;&#x2F;div&gt;';
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
            <span className="text-gray-600">HTML Encoder/Decoder</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Code2 className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                HTML Encoder / Decoder
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Encode and decode HTML entities instantly - Free HTML encoder/decoder tool
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
                }}
                className={`flex-1 px-6 py-4 rounded-lg font-bold text-lg transition-all ${
                  mode === 'encode'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Encode HTML
              </button>
              <button
                onClick={() => {
                  setMode('decode');
                  setInput('');
                  setOutput('');
                }}
                className={`flex-1 px-6 py-4 rounded-lg font-bold text-lg transition-all ${
                  mode === 'decode'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Decode HTML
              </button>
            </div>

            <div className="flex justify-between items-center mb-3">
              <label className="block text-lg font-semibold text-gray-900">
                Input {mode === 'encode' ? '(Plain Text/HTML)' : '(HTML Entities)'}
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
                  ? 'Enter HTML or text to encode...'
                  : 'Enter HTML entities to decode...'
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 min-h-[150px] resize-y font-mono text-sm"
            />

            <div className="flex items-center justify-center my-4">
              <ArrowRight className="w-8 h-8 text-gray-400" />
            </div>

            {output && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-lg font-semibold text-gray-900">
                    Output {mode === 'encode' ? '(HTML Entities)' : '(Plain Text/HTML)'}
                  </label>
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-[#2BAE66] text-white rounded-lg font-semibold hover:bg-[#229554] transition-all flex items-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-gray-700 font-mono text-sm whitespace-pre-wrap break-words">{output}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">HTML Encoding</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                HTML encoding converts special characters to HTML entities to prevent XSS attacks and display code safely.
              </p>
              <div className="text-xs text-gray-600 space-y-1">
                <p>• &lt; becomes &amp;lt;</p>
                <p>• &gt; becomes &amp;gt;</p>
                <p>• &amp; becomes &amp;amp;</p>
                <p>• &quot; becomes &amp;quot;</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">HTML Decoding</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                HTML decoding converts HTML entities back to their original characters for readability and editing.
              </p>
              <div className="text-xs text-gray-600 space-y-1">
                <p>• &amp;lt; becomes &lt;</p>
                <p>• &amp;gt; becomes &gt;</p>
                <p>• &amp;amp; becomes &amp;</p>
                <p>• &amp;quot; becomes &quot;</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
