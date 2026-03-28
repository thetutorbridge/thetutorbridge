'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Activity } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function BmiCalculatorPage() {
  const [system, setSystem] = useState<'metric' | 'imperial'>('metric');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [result, setResult] = useState<{bmi: number; category: string; color: string} | null>(null);

  const calculateBMI = () => {
    let bmiValue = 0;

    if (system === 'metric') {
      const h = parseFloat(height) / 100; // cm to meters
      const w = parseFloat(weight);
      if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
        return;
      }
      bmiValue = w / (h * h);
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      const totalInches = (ft * 12) + inches;
      const w = parseFloat(weight);
      if (totalInches <= 0 || w <= 0) {
        return;
      }
      bmiValue = (w / (totalInches * totalInches)) * 703;
    }

    let category = '';
    let color = '';

    if (bmiValue < 18.5) {
      category = 'Underweight';
      color = 'text-blue-600';
    } else if (bmiValue < 25) {
      category = 'Normal weight';
      color = 'text-green-600';
    } else if (bmiValue < 30) {
      category = 'Overweight';
      color = 'text-orange-600';
    } else {
      category = 'Obese';
      color = 'text-red-600';
    }

    setResult({ bmi: parseFloat(bmiValue.toFixed(1)), category, color });
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
            <span className="text-gray-600">BMI Calculator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Activity className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                BMI Calculator
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Calculate your Body Mass Index (BMI) - Free BMI calculator
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setSystem('metric')}
                className={`flex-1 px-6 py-3 rounded-lg font-bold transition-all ${
                  system === 'metric'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Metric (kg, cm)
              </button>
              <button
                onClick={() => setSystem('imperial')}
                className={`flex-1 px-6 py-3 rounded-lg font-bold transition-all ${
                  system === 'imperial'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Imperial (lbs, ft/in)
              </button>
            </div>

            {system === 'metric' ? (
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="170"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="70"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6 mb-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">Height</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      placeholder="Feet"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                    />
                    <input
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      placeholder="Inches"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">Weight (lbs)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="154"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                  />
                </div>
              </div>
            )}

            <button
              onClick={calculateBMI}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg"
            >
              Calculate BMI
            </button>

            {result && (
              <div className="mt-6 p-8 bg-gradient-to-br from-blue-50 to-teal-50 border-2 border-blue-200 rounded-lg text-center">
                <p className="text-6xl font-bold text-gray-900 mb-2">{result.bmi}</p>
                <p className={`text-2xl font-bold ${result.color}`}>{result.category}</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">BMI Categories</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-3 bg-blue-50 rounded">
                <span className="font-semibold">Underweight</span>
                <span className="text-blue-600">BMI &lt; 18.5</span>
              </div>
              <div className="flex justify-between p-3 bg-green-50 rounded">
                <span className="font-semibold">Normal weight</span>
                <span className="text-green-600">BMI 18.5 - 24.9</span>
              </div>
              <div className="flex justify-between p-3 bg-orange-50 rounded">
                <span className="font-semibold">Overweight</span>
                <span className="text-orange-600">BMI 25 - 29.9</span>
              </div>
              <div className="flex justify-between p-3 bg-red-50 rounded">
                <span className="font-semibold">Obese</span>
                <span className="text-red-600">BMI ≥ 30</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
