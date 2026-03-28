'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Tag } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function DiscountCalculatorPage() {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [savings, setSavings] = useState<number | null>(null);

  const calculate = () => {
    const price = parseFloat(originalPrice);
    const disc = parseFloat(discount);

    if (isNaN(price) || isNaN(disc) || price <= 0 || disc < 0) {
      return;
    }

    const savingsAmount = (price * disc) / 100;
    const final = price - savingsAmount;

    setFinalPrice(parseFloat(final.toFixed(2)));
    setSavings(parseFloat(savingsAmount.toFixed(2)));
  };

  const quickDiscount = (percent: number) => {
    setDiscount(percent.toString());
    if (originalPrice) {
      const price = parseFloat(originalPrice);
      if (!isNaN(price) && price > 0) {
        const savingsAmount = (price * percent) / 100;
        const final = price - savingsAmount;
        setFinalPrice(parseFloat(final.toFixed(2)));
        setSavings(parseFloat(savingsAmount.toFixed(2)));
      }
    }
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
            <span className="text-gray-600">Discount Calculator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Tag className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Discount Calculator
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Calculate sale prices and savings instantly - Free discount calculator
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Original Price ($)</label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="100.00"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Discount (%)</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="20"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Quick Discount</label>
              <div className="grid grid-cols-5 gap-2">
                {[10, 15, 20, 25, 30, 40, 50, 60, 70, 75].map((percent) => (
                  <button
                    key={percent}
                    onClick={() => quickDiscount(percent)}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-all"
                  >
                    {percent}%
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg"
            >
              Calculate Discount
            </button>

            {finalPrice !== null && savings !== null && (
              <div className="mt-6 space-y-4">
                <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-lg">
                  <p className="text-sm font-semibold text-gray-600 mb-1">Final Price</p>
                  <p className="text-4xl font-bold text-gray-900">${finalPrice}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">You Save</p>
                    <p className="text-2xl font-bold text-green-600">${savings}</p>
                  </div>
                  <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">Discount</p>
                    <p className="text-2xl font-bold text-blue-600">{discount}%</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Common Discounts</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Popular discount percentages: 10% off (save $10 on $100), 20% off (save $20 on $100),
              25% off (save $25 on $100), 50% off (save $50 on $100). Perfect for Black Friday,
              Cyber Monday, and seasonal sales.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
