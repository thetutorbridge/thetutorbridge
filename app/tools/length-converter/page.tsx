'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Ruler } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function LengthConverterPage() {
  const [values, setValues] = useState({
    millimeters: '',
    centimeters: '',
    meters: '',
    kilometers: '',
    inches: '',
    feet: '',
    yards: '',
    miles: '',
  });

  const conversions = {
    millimeters: 1,
    centimeters: 10,
    meters: 1000,
    kilometers: 1000000,
    inches: 25.4,
    feet: 304.8,
    yards: 914.4,
    miles: 1609344,
  };

  const convert = (fromUnit: string, value: string) => {
    if (value === '') {
      setValues({
        millimeters: '',
        centimeters: '',
        meters: '',
        kilometers: '',
        inches: '',
        feet: '',
        yards: '',
        miles: '',
      });
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    const mmValue = numValue * conversions[fromUnit as keyof typeof conversions];

    setValues({
      millimeters: (mmValue / conversions.millimeters).toFixed(4),
      centimeters: (mmValue / conversions.centimeters).toFixed(4),
      meters: (mmValue / conversions.meters).toFixed(4),
      kilometers: (mmValue / conversions.kilometers).toFixed(6),
      inches: (mmValue / conversions.inches).toFixed(4),
      feet: (mmValue / conversions.feet).toFixed(4),
      yards: (mmValue / conversions.yards).toFixed(4),
      miles: (mmValue / conversions.miles).toFixed(6),
    });
  };

  const units = [
    { key: 'millimeters', label: 'Millimeters (mm)', color: 'blue' },
    { key: 'centimeters', label: 'Centimeters (cm)', color: 'green' },
    { key: 'meters', label: 'Meters (m)', color: 'purple' },
    { key: 'kilometers', label: 'Kilometers (km)', color: 'orange' },
    { key: 'inches', label: 'Inches (in)', color: 'pink' },
    { key: 'feet', label: 'Feet (ft)', color: 'teal' },
    { key: 'yards', label: 'Yards (yd)', color: 'indigo' },
    { key: 'miles', label: 'Miles (mi)', color: 'red' },
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
            <span className="text-gray-600">Length Converter</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Ruler className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Length Converter
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Convert between metric and imperial length units instantly - Free length converter
            </p>
          </div>

          {/* Converter */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {units.map((unit) => (
                <div key={unit.key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {unit.label}
                  </label>
                  <input
                    type="number"
                    value={values[unit.key as keyof typeof values]}
                    onChange={(e) => {
                      const newValues = { ...values, [unit.key]: e.target.value };
                      setValues(newValues);
                      convert(unit.key, e.target.value);
                    }}
                    placeholder="0"
                    step="any"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Common Conversions */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Conversions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border-2 border-blue-200">
                <div className="font-semibold text-gray-900 mb-2">Metric</div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 1 km = 1,000 m</li>
                  <li>• 1 m = 100 cm</li>
                  <li>• 1 cm = 10 mm</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-4 border-2 border-green-200">
                <div className="font-semibold text-gray-900 mb-2">Imperial</div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 1 mile = 1,760 yards</li>
                  <li>• 1 yard = 3 feet</li>
                  <li>• 1 foot = 12 inches</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-purple-200">
                <div className="font-semibold text-gray-900 mb-2">Metric to Imperial</div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 1 inch = 2.54 cm</li>
                  <li>• 1 foot = 30.48 cm</li>
                  <li>• 1 mile = 1.609 km</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border-2 border-orange-200">
                <div className="font-semibold text-gray-900 mb-2">Imperial to Metric</div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 1 cm = 0.394 inches</li>
                  <li>• 1 m = 3.281 feet</li>
                  <li>• 1 km = 0.621 miles</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About Length Units</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Metric:</strong> Used worldwide (mm, cm, m, km)</li>
                <li><strong>Imperial:</strong> Used in US, UK (in, ft, yd, mi)</li>
                <li><strong>Conversion:</strong> 1 inch = exactly 2.54 cm</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Uses</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Construction and carpentry</li>
                <li>• International travel</li>
                <li>• Sports and athletics</li>
                <li>• Scientific calculations</li>
                <li>• Online shopping</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
