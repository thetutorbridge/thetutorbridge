'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, DollarSign } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function LoanCalculatorPage() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [monthly, setMonthly] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [interest, setInterest] = useState<number | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || r < 0 || n <= 0) {
      return;
    }

    const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - p;

    setMonthly(parseFloat(monthlyPayment.toFixed(2)));
    setTotal(parseFloat(totalPayment.toFixed(2)));
    setInterest(parseFloat(totalInterest.toFixed(2)));
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
            <span className="text-gray-600">Loan Calculator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <DollarSign className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Loan Calculator
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Calculate loan payments and total interest - Free loan calculator
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="space-y-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Loan Amount ($)</label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="10000"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Interest Rate (%)</label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="5.5"
                  step="0.1"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Loan Term (Years)</label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="5"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                />
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg"
            >
              Calculate Loan
            </button>

            {monthly && total && interest && (
              <div className="mt-6 space-y-4">
                <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-lg text-center">
                  <p className="text-sm font-semibold text-gray-600 mb-1">Monthly Payment</p>
                  <p className="text-4xl font-bold text-gray-900">${monthly}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg text-center">
                    <p className="text-sm font-semibold text-gray-600 mb-1">Total Payment</p>
                    <p className="text-2xl font-bold text-gray-900">${total}</p>
                  </div>
                  <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg text-center">
                    <p className="text-sm font-semibold text-gray-600 mb-1">Total Interest</p>
                    <p className="text-2xl font-bold text-orange-600">${interest}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
