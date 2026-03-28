'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, BarChart3 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function TextStatisticsPage() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    readingTime: 0,
    speakingTime: 0,
    uniqueWords: 0,
    longestWord: '',
    averageWordLength: 0,
  });

  useEffect(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;
    const lines = text.split('\n').length;
    const readingTime = Math.ceil(words / 200); // 200 words per minute
    const speakingTime = Math.ceil(words / 130); // 130 words per minute

    const wordArray = text.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(wordArray).size;

    const longestWord = wordArray.reduce((longest, word) =>
      word.length > longest.length ? word : longest, ''
    );

    const averageWordLength = wordArray.length > 0
      ? (wordArray.reduce((sum, word) => sum + word.length, 0) / wordArray.length).toFixed(1)
      : 0;

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      readingTime,
      speakingTime,
      uniqueWords,
      longestWord,
      averageWordLength: Number(averageWordLength),
    });
  }, [text]);

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
            <span className="text-gray-600">Text Statistics</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <BarChart3 className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Text Statistics
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Analyze your text - Get detailed statistics
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">Your Text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing or paste your text here..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 min-h-[200px] resize-y"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Characters</p>
                <p className="text-3xl font-bold text-[#1A3D7C]">{stats.characters}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Words</p>
                <p className="text-3xl font-bold text-[#2BAE66]">{stats.words}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Sentences</p>
                <p className="text-3xl font-bold text-purple-600">{stats.sentences}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Paragraphs</p>
                <p className="text-3xl font-bold text-orange-600">{stats.paragraphs}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Basic Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Characters (no spaces):</span>
                    <span className="font-bold text-gray-900">{stats.charactersNoSpaces}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Lines:</span>
                    <span className="font-bold text-gray-900">{stats.lines}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Unique Words:</span>
                    <span className="font-bold text-gray-900">{stats.uniqueWords}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Advanced Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Reading Time:</span>
                    <span className="font-bold text-gray-900">{stats.readingTime} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Speaking Time:</span>
                    <span className="font-bold text-gray-900">{stats.speakingTime} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Avg Word Length:</span>
                    <span className="font-bold text-gray-900">{stats.averageWordLength}</span>
                  </div>
                </div>
              </div>
            </div>

            {stats.longestWord && (
              <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Longest Word:</p>
                <p className="text-xl font-bold text-gray-900">{stats.longestWord} ({stats.longestWord.length} characters)</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
