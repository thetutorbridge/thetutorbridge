'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, User, RotateCcw, Copy, Check } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function RandomNameGeneratorPage() {
  const [names, setNames] = useState<string[]>([]);
  const [count, setCount] = useState(10);
  const [gender, setGender] = useState<'male' | 'female' | 'both'>('both');
  const [copied, setCopied] = useState<number | null>(null);

  const firstNamesMale = [
    'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Christopher',
    'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Andrew', 'Paul', 'Joshua', 'Kenneth',
    'Kevin', 'Brian', 'George', 'Timothy', 'Ronald', 'Edward', 'Jason', 'Jeffrey', 'Ryan', 'Jacob',
  ];

  const firstNamesFemale = [
    'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
    'Lisa', 'Nancy', 'Betty', 'Helen', 'Sandra', 'Donna', 'Carol', 'Ruth', 'Sharon', 'Michelle',
    'Laura', 'Sarah', 'Kimberly', 'Deborah', 'Jessica', 'Shirley', 'Cynthia', 'Angela', 'Melissa', 'Brenda',
  ];

  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
    'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  ];

  const generateNames = () => {
    const newNames: string[] = [];
    for (let i = 0; i < count; i++) {
      let firstName: string;
      if (gender === 'male') {
        firstName = firstNamesMale[Math.floor(Math.random() * firstNamesMale.length)];
      } else if (gender === 'female') {
        firstName = firstNamesFemale[Math.floor(Math.random() * firstNamesFemale.length)];
      } else {
        const allFirstNames = [...firstNamesMale, ...firstNamesFemale];
        firstName = allFirstNames[Math.floor(Math.random() * allFirstNames.length)];
      }
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      newNames.push(`${firstName} ${lastName}`);
    }
    setNames(newNames);
  };

  const copyName = (name: string, index: number) => {
    navigator.clipboard.writeText(name);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAllNames = () => {
    navigator.clipboard.writeText(names.join('\n'));
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
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
            <span className="text-gray-600">Random Name Generator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <User className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Random Name Generator
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Generate random names instantly - Free random name picker & generator
            </p>
          </div>

          {/* Generator Settings */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Number of Names
                </label>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                  min="1"
                  max="100"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Gender
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setGender('male')}
                    className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                      gender === 'male'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                      gender === 'female'
                        ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Female
                  </button>
                  <button
                    onClick={() => setGender('both')}
                    className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                      gender === 'both'
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Both
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={generateNames}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-6 h-6" />
              Generate Names
            </button>
          </div>

          {/* Generated Names */}
          {names.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Generated Names</h2>
                <button
                  onClick={copyAllNames}
                  className="px-4 py-2 bg-[#2BAE66] text-white rounded-lg font-semibold hover:bg-[#229554] transition-all flex items-center gap-2"
                >
                  {copied === -1 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied === -1 ? 'Copied All!' : 'Copy All'}
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {names.map((name, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all"
                  >
                    <span className="text-lg font-semibold text-gray-900">{name}</span>
                    <button
                      onClick={() => copyName(name, index)}
                      className="p-2 hover:bg-white rounded-lg transition-all"
                    >
                      {copied === index ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Uses</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Character names for stories</li>
                <li>• Game character creation</li>
                <li>• Testing and demo accounts</li>
                <li>• Creative writing projects</li>
                <li>• Baby name inspiration</li>
                <li>• Username generation</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About This Tool</h3>
              <p className="text-gray-700 leading-relaxed">
                This random name generator creates realistic full names by combining common first and last names. Perfect for writers, game developers, and anyone needing quick name ideas.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
