'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, DollarSign, Users, Copy, Check } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function TipCalculatorPage() {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercent, setTipPercent] = useState(15);
  const [numPeople, setNumPeople] = useState(1);
  const [customTip, setCustomTip] = useState('');
  const [copied, setCopied] = useState(false);

  const bill = parseFloat(billAmount) || 0;
  const tip = customTip ? parseFloat(customTip) : tipPercent;
  const tipAmount = bill * (tip / 100);
  const total = bill + tipAmount;
  const perPerson = total / numPeople;
  const tipPerPerson = tipAmount / numPeople;

  const copyToClipboard = () => {
    const text = `Bill: $${bill.toFixed(2)}\nTip (${tip}%): $${tipAmount.toFixed(2)}\nTotal: $${total.toFixed(2)}\nPer Person: $${perPerson.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectTip = (percent: number) => {
    setTipPercent(percent);
    setCustomTip('');
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
            <span className="text-gray-600">Tip Calculator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <DollarSign className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Tip Calculator
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Calculate tips and split bills easily - Free restaurant tip calculator
            </p>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            {/* Bill Amount */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                <DollarSign className="w-5 h-5 inline-block mr-2 text-[#2BAE66]" />
                Bill Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-500">$</span>
                <input
                  type="number"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-2xl font-bold"
                />
              </div>
            </div>

            {/* Tip Percentage Buttons */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">Select Tip %</label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-3">
                {[10, 15, 18, 20, 22, 25].map((percent) => (
                  <button
                    key={percent}
                    onClick={() => selectTip(percent)}
                    className={`px-4 py-3 rounded-lg font-bold text-lg transition-all ${
                      tipPercent === percent && !customTip
                        ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {percent}%
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">Custom:</span>
                <input
                  type="number"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  placeholder="Enter %"
                  min="0"
                  max="100"
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 font-bold"
                />
                <span className="text-gray-700 font-bold">%</span>
              </div>
            </div>

            {/* Number of People */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                <Users className="w-5 h-5 inline-block mr-2 text-[#1A3D7C]" />
                Number of People
              </label>
              <input
                type="number"
                value={numPeople}
                onChange={(e) => setNumPeople(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-2xl font-bold"
              />
            </div>
          </div>

          {/* Results */}
          {bill > 0 && (
            <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-2xl shadow-2xl p-8 mb-6 text-white">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold">Bill Summary</h2>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-white text-[#1A3D7C] rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">Bill Amount:</span>
                    <span className="text-3xl font-bold">${bill.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">Tip ({tip}%):</span>
                    <span className="text-3xl font-bold">${tipAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border-2 border-white/30">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">Total:</span>
                    <span className="text-5xl font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>

                {numPeople > 1 && (
                  <>
                    <div className="border-t-2 border-white/20 my-6"></div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <div className="text-center mb-4">
                        <div className="text-lg font-semibold opacity-90 mb-2">Split Between {numPeople} People</div>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-semibold">Amount Per Person:</span>
                        <span className="text-4xl font-bold">${perPerson.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm opacity-90">Tip Per Person:</span>
                        <span className="text-xl font-semibold">${tipPerPerson.toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Tipping Guide */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tipping Guidelines</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border-2 border-blue-200">
                <div className="text-4xl font-bold text-blue-600 mb-2">10-15%</div>
                <div className="font-semibold text-gray-900 mb-2">Average Service</div>
                <p className="text-sm text-gray-600">Standard tip for satisfactory service</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-6 border-2 border-green-200">
                <div className="text-4xl font-bold text-green-600 mb-2">18-20%</div>
                <div className="font-semibold text-gray-900 mb-2">Good Service</div>
                <p className="text-sm text-gray-600">Recommended for excellent service</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200">
                <div className="text-4xl font-bold text-purple-600 mb-2">22-25%</div>
                <div className="font-semibold text-gray-900 mb-2">Outstanding Service</div>
                <p className="text-sm text-gray-600">For exceptional dining experiences</p>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">When to Tip</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Restaurants and cafes</li>
                <li>• Food delivery services</li>
                <li>• Bars and bartenders</li>
                <li>• Hair salons and spas</li>
                <li>• Taxi and ride-share drivers</li>
                <li>• Hotel staff and valets</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tipping Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Tip on pre-tax amount</li>
                <li>• Round up for easier math</li>
                <li>• Consider service quality</li>
                <li>• Tip more for large groups</li>
                <li>• Cash tips are preferred</li>
                <li>• Check if tip is included</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
