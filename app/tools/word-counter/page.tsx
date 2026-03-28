'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, FileText, Copy, RotateCcw, Check } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function WordCounterPage() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphs = text.trim() === '' ? 0 : text.split(/\n\n+/).filter(p => p.trim().length > 0).length;
  const readingTime = Math.ceil(words / 200);
  const speakingTime = Math.ceil(words / 150);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearText = () => {
    setText('');
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
            <span className="text-gray-600">Word Counter</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <FileText className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Word Counter
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Count words, characters, sentences instantly - Free online word counter tool
            </p>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold mb-1">{words.toLocaleString()}</div>
              <div className="text-sm font-semibold opacity-90">Words</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold mb-1">{characters.toLocaleString()}</div>
              <div className="text-sm font-semibold opacity-90">Characters</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold mb-1">{sentences.toLocaleString()}</div>
              <div className="text-sm font-semibold opacity-90">Sentences</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold mb-1">{paragraphs.toLocaleString()}</div>
              <div className="text-sm font-semibold opacity-90">Paragraphs</div>
            </div>
          </div>

          {/* Text Input */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Enter or Paste Your Text</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  disabled={text.length === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-[#2BAE66] text-white rounded-lg font-semibold hover:bg-[#229554] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={clearText}
                  disabled={text.length === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RotateCcw className="w-4 h-4" />
                  Clear
                </button>
              </div>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your text here... The word count will update in real-time!"
              className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none resize-none text-gray-900 text-lg"
            />
          </div>

          {/* Detailed Stats */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Text Statistics</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Total Words</span>
                  <span className="text-2xl font-bold text-green-600">{words.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Characters (with spaces)</span>
                  <span className="text-2xl font-bold text-blue-600">{characters.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Characters (no spaces)</span>
                  <span className="text-2xl font-bold text-purple-600">{charactersNoSpaces.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 font-medium">Average Word Length</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {words > 0 ? (charactersNoSpaces / words).toFixed(1) : '0'} letters
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Reading & Speaking Time</h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border-2 border-blue-200">
                  <div className="text-sm font-semibold text-gray-700 mb-1">Reading Time</div>
                  <div className="text-3xl font-bold text-blue-600">
                    {readingTime} {readingTime === 1 ? 'minute' : 'minutes'}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Based on 200 words/minute</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-4 border-2 border-green-200">
                  <div className="text-sm font-semibold text-gray-700 mb-1">Speaking Time</div>
                  <div className="text-3xl font-bold text-green-600">
                    {speakingTime} {speakingTime === 1 ? 'minute' : 'minutes'}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Based on 150 words/minute</div>
                </div>
              </div>
            </div>
          </div>

          {/* Common Word Limits */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Word Count Limits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { type: 'Tweet/X', limit: '280 chars' },
                { type: 'College Essay', limit: '500-650 words' },
                { type: 'Blog Post', limit: '1000-2000 words' },
                { type: 'Short Story', limit: '1500-5000 words' },
                { type: 'Research Paper', limit: '3000-5000 words' },
                { type: 'Novel Chapter', limit: '3000-5000 words' },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 flex justify-between items-center border border-gray-200">
                  <span className="font-semibold text-gray-700 text-sm">{item.type}</span>
                  <span className="text-[#1A3D7C] font-bold text-sm">{item.limit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
