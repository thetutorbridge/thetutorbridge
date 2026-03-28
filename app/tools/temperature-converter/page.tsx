'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Thermometer, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function TemperatureConverterPage() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [kelvin, setKelvin] = useState('');

  const convertFromCelsius = (value: string) => {
    setCelsius(value);
    if (value === '') {
      setFahrenheit('');
      setKelvin('');
      return;
    }
    const c = parseFloat(value);
    if (!isNaN(c)) {
      setFahrenheit(((c * 9/5) + 32).toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    }
  };

  const convertFromFahrenheit = (value: string) => {
    setFahrenheit(value);
    if (value === '') {
      setCelsius('');
      setKelvin('');
      return;
    }
    const f = parseFloat(value);
    if (!isNaN(f)) {
      setCelsius(((f - 32) * 5/9).toFixed(2));
      setKelvin((((f - 32) * 5/9) + 273.15).toFixed(2));
    }
  };

  const convertFromKelvin = (value: string) => {
    setKelvin(value);
    if (value === '') {
      setCelsius('');
      setFahrenheit('');
      return;
    }
    const k = parseFloat(value);
    if (!isNaN(k)) {
      setCelsius((k - 273.15).toFixed(2));
      setFahrenheit((((k - 273.15) * 9/5) + 32).toFixed(2));
    }
  };

  const commonTemps = [
    { name: 'Absolute Zero', c: -273.15, f: -459.67, k: 0 },
    { name: 'Water Freezing', c: 0, f: 32, k: 273.15 },
    { name: 'Room Temperature', c: 20, f: 68, k: 293.15 },
    { name: 'Body Temperature', c: 37, f: 98.6, k: 310.15 },
    { name: 'Water Boiling', c: 100, f: 212, k: 373.15 },
  ];

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
            <span className="text-gray-600">Temperature Converter</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Thermometer className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Temperature Converter
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Convert between Celsius, Fahrenheit, and Kelvin instantly - Free temperature converter
            </p>
          </div>

          {/* Converter */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="space-y-6">
              {/* Celsius */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Celsius (°C)
                </label>
                <input
                  type="number"
                  value={celsius}
                  onChange={(e) => convertFromCelsius(e.target.value)}
                  placeholder="Enter temperature"
                  step="0.01"
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-2xl font-bold"
                />
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="w-8 h-8 text-gray-400 rotate-90" />
              </div>

              {/* Fahrenheit */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Fahrenheit (°F)
                </label>
                <input
                  type="number"
                  value={fahrenheit}
                  onChange={(e) => convertFromFahrenheit(e.target.value)}
                  placeholder="Enter temperature"
                  step="0.01"
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-2xl font-bold"
                />
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="w-8 h-8 text-gray-400 rotate-90" />
              </div>

              {/* Kelvin */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Kelvin (K)
                </label>
                <input
                  type="number"
                  value={kelvin}
                  onChange={(e) => convertFromKelvin(e.target.value)}
                  placeholder="Enter temperature"
                  step="0.01"
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-2xl font-bold"
                />
              </div>
            </div>
          </div>

          {/* Common Temperatures */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Temperatures</h2>
            <div className="space-y-3">
              {commonTemps.map((temp, index) => (
                <button
                  key={index}
                  onClick={() => convertFromCelsius(temp.c.toString())}
                  className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all text-left"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900 text-lg">{temp.name}</span>
                    <div className="flex gap-4 text-sm">
                      <span className="text-blue-600 font-bold">{temp.c}°C</span>
                      <span className="text-orange-600 font-bold">{temp.f}°F</span>
                      <span className="text-purple-600 font-bold">{temp.k}K</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Formulas */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Conversion Formulas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border-2 border-blue-200">
                <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">Celsius to Fahrenheit</h3>
                <div className="font-mono text-gray-700 bg-white p-3 rounded border border-gray-300">
                  °F = (°C × 9/5) + 32
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border-2 border-orange-200">
                <h3 className="font-bold text-orange-700 mb-3 text-lg">Fahrenheit to Celsius</h3>
                <div className="font-mono text-gray-700 bg-white p-3 rounded border border-gray-300">
                  °C = (°F - 32) × 5/9
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200">
                <h3 className="font-bold text-purple-700 mb-3 text-lg">Celsius to Kelvin</h3>
                <div className="font-mono text-gray-700 bg-white p-3 rounded border border-gray-300">
                  K = °C + 273.15
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-6 border-2 border-green-200">
                <h3 className="font-bold text-green-700 mb-3 text-lg">Kelvin to Celsius</h3>
                <div className="font-mono text-gray-700 bg-white p-3 rounded border border-gray-300">
                  °C = K - 273.15
                </div>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About Temperature Scales</h3>
              <ul className="space-y-3 text-gray-700">
                <li><strong>Celsius:</strong> Used worldwide, based on water's freezing (0°) and boiling (100°) points</li>
                <li><strong>Fahrenheit:</strong> Commonly used in the United States</li>
                <li><strong>Kelvin:</strong> Scientific scale starting at absolute zero</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Reference</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 0°C = 32°F = 273.15K</li>
                <li>• 100°C = 212°F = 373.15K</li>
                <li>• -40°C = -40°F = 233.15K</li>
                <li>• Room temp: ~20°C = 68°F</li>
                <li>• Body temp: 37°C = 98.6°F</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
