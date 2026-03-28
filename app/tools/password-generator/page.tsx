'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Lock, Copy, RotateCcw, Check, AlertCircle } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    let generatedPassword = '';

    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === '') {
      alert('Please select at least one character type!');
      return;
    }

    // Ensure at least one of each selected type
    if (includeUppercase) generatedPassword += uppercase[Math.floor(Math.random() * uppercase.length)];
    if (includeLowercase) generatedPassword += lowercase[Math.floor(Math.random() * lowercase.length)];
    if (includeNumbers) generatedPassword += numbers[Math.floor(Math.random() * numbers.length)];
    if (includeSymbols) generatedPassword += symbols[Math.floor(Math.random() * symbols.length)];

    // Fill the rest randomly
    for (let i = generatedPassword.length; i < length; i++) {
      generatedPassword += chars[Math.floor(Math.random() * chars.length)];
    }

    // Shuffle the password
    generatedPassword = generatedPassword.split('').sort(() => Math.random() - 0.5).join('');

    setPassword(generatedPassword);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStrength = () => {
    if (!password) return { label: 'No Password', color: 'gray', width: '0%' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (password.length >= 16) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { label: 'Weak', color: 'red', width: '25%' };
    if (strength <= 4) return { label: 'Fair', color: 'orange', width: '50%' };
    if (strength <= 6) return { label: 'Good', color: 'yellow', width: '75%' };
    return { label: 'Strong', color: 'green', width: '100%' };
  };

  const strength = getStrength();

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
            <span className="text-gray-600">Password Generator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Lock className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Password Generator
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Create strong, secure passwords instantly - Free random password generator
            </p>
          </div>

          {/* Password Display */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="bg-gray-50 rounded-lg p-6 mb-4 border-2 border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1 mr-4">
                  {password ? (
                    <input
                      type="text"
                      value={password}
                      readOnly
                      className="w-full px-4 py-3 text-2xl font-mono font-bold text-gray-900 bg-white rounded-lg border-2 border-gray-300"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 text-2xl font-mono font-bold text-gray-400 bg-white rounded-lg border-2 border-gray-300 text-center">
                      Click Generate Password
                    </div>
                  )}
                </div>
                <button
                  onClick={copyToClipboard}
                  disabled={!password}
                  className="px-6 py-3 bg-[#2BAE66] text-white rounded-lg font-semibold hover:bg-[#229554] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* Strength Meter */}
              {password && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">Password Strength:</span>
                    <span className={`text-sm font-bold text-${strength.color}-600`}>{strength.label}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full bg-${strength.color}-500 transition-all duration-500`}
                      style={{ width: strength.width }}
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={generatePassword}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-6 h-6" />
              Generate Password
            </button>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customize Your Password</h2>

            {/* Length Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-lg font-semibold text-gray-700">Password Length</label>
                <span className="text-3xl font-bold text-[#1A3D7C]">{length}</span>
              </div>
              <input
                type="range"
                min="4"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2BAE66]"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>4</span>
                <span>64</span>
              </div>
            </div>

            {/* Character Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                    className="w-5 h-5 text-[#2BAE66] border-gray-300 rounded focus:ring-[#2BAE66] cursor-pointer"
                  />
                  <span className="ml-3 text-lg font-semibold text-gray-900">Uppercase Letters</span>
                </label>
                <span className="font-mono text-gray-600">A-Z</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                    className="w-5 h-5 text-[#2BAE66] border-gray-300 rounded focus:ring-[#2BAE66] cursor-pointer"
                  />
                  <span className="ml-3 text-lg font-semibold text-gray-900">Lowercase Letters</span>
                </label>
                <span className="font-mono text-gray-600">a-z</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="w-5 h-5 text-[#2BAE66] border-gray-300 rounded focus:ring-[#2BAE66] cursor-pointer"
                  />
                  <span className="ml-3 text-lg font-semibold text-gray-900">Numbers</span>
                </label>
                <span className="font-mono text-gray-600">0-9</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                    className="w-5 h-5 text-[#2BAE66] border-gray-300 rounded focus:ring-[#2BAE66] cursor-pointer"
                  />
                  <span className="ml-3 text-lg font-semibold text-gray-900">Symbols</span>
                </label>
                <span className="font-mono text-gray-600">!@#$%^&*</span>
              </div>
            </div>
          </div>

          {/* Security Tips */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Password Security Tips</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Never reuse passwords</strong> across different accounts</li>
                  <li>• Use <strong>at least 12-16 characters</strong> for maximum security</li>
                  <li>• Enable <strong>two-factor authentication (2FA)</strong> when available</li>
                  <li>• Use a <strong>password manager</strong> to store passwords securely</li>
                  <li>• Change passwords regularly, especially for sensitive accounts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why Strong Passwords Matter</h3>
              <p className="text-gray-700 leading-relaxed">
                Weak passwords are the #1 cause of data breaches. A strong password combining uppercase, lowercase, numbers, and symbols makes it virtually impossible for hackers to crack using brute-force attacks.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">100% Secure & Private</h3>
              <p className="text-gray-700 leading-relaxed">
                All passwords are generated locally in your browser. Nothing is sent to our servers. Your passwords are completely private and secure.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
