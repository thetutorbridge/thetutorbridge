'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Type, Copy, RotateCcw, Check } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function CharacterCounterPage() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphs = text.trim() === '' ? 0 : text.split(/\n\n+/).filter(p => p.trim().length > 0).length;
  const lines = text === '' ? 0 : text.split(/\n/).length;
  const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words/min
  const speakingTime = Math.ceil(words / 150); // Average speaking speed: 150 words/min

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
            <span className="text-gray-600">Character Counter</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Type className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Character Counter
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Count characters, words, sentences, and more - Free online text analysis tool
            </p>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold mb-1">{characters.toLocaleString()}</div>
              <div className="text-sm font-semibold opacity-90">Characters</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold mb-1">{words.toLocaleString()}</div>
              <div className="text-sm font-semibold opacity-90">Words</div>
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
              placeholder="Start typing or paste your text here... The character count will update in real-time!"
              className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none resize-none text-gray-900 text-lg"
            />
          </div>

          {/* Detailed Stats */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Detailed Statistics</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Characters (with spaces)</span>
                  <span className="text-2xl font-bold text-[#1A3D7C]">{characters.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Characters (no spaces)</span>
                  <span className="text-2xl font-bold text-[#2BAE66]">{charactersNoSpaces.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Words</span>
                  <span className="text-2xl font-bold text-purple-600">{words.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Lines</span>
                  <span className="text-2xl font-bold text-orange-600">{lines.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Sentences</span>
                  <span className="text-2xl font-bold text-red-600">{sentences.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 font-medium">Paragraphs</span>
                  <span className="text-2xl font-bold text-blue-600">{paragraphs.toLocaleString()}</span>
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
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-purple-200">
                  <div className="text-sm font-semibold text-gray-700 mb-1">Average Word Length</div>
                  <div className="text-3xl font-bold text-purple-600">
                    {words > 0 ? (charactersNoSpaces / words).toFixed(1) : '0'} letters
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Perfect For:</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4">
                <h3 className="font-bold text-[#1A3D7C] mb-2">✍️ Writers & Bloggers</h3>
                <p className="text-sm text-gray-600">Track word count for articles, essays, and blog posts</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-4">
                <h3 className="font-bold text-[#2BAE66] mb-2">📚 Students</h3>
                <p className="text-sm text-gray-600">Meet essay and assignment word requirements</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
                <h3 className="font-bold text-purple-600 mb-2">💼 Professionals</h3>
                <p className="text-sm text-gray-600">Optimize content for social media character limits</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4">
                <h3 className="font-bold text-orange-600 mb-2">🎤 Speakers</h3>
                <p className="text-sm text-gray-600">Calculate speech duration and timing</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4">
                <h3 className="font-bold text-yellow-700 mb-2">📱 Social Media</h3>
                <p className="text-sm text-gray-600">Check Twitter (280), Instagram, Facebook limits</p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-4">
                <h3 className="font-bold text-pink-600 mb-2">✉️ Copywriters</h3>
                <p className="text-sm text-gray-600">Craft perfect email subject lines and ad copy</p>
              </div>
            </div>
          </div>

          {/* Character Limits Reference */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Character Limits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { platform: 'Twitter/X', limit: 280 },
                { platform: 'Instagram Caption', limit: 2200 },
                { platform: 'Facebook Post', limit: 63206 },
                { platform: 'LinkedIn Post', limit: 3000 },
                { platform: 'Meta Description', limit: 160 },
                { platform: 'SMS Text', limit: 160 },
                { platform: 'Email Subject', limit: 60 },
                { platform: 'YouTube Title', limit: 100 },
                { platform: 'TikTok Caption', limit: 2200 },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-3 flex justify-between items-center border border-gray-200">
                  <span className="font-semibold text-gray-700 text-sm">{item.platform}</span>
                  <span className="text-[#1A3D7C] font-bold">{item.limit}</span>
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
