'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Home, Plus, Trash2, IndianRupee } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Transaction {
  id: number;
  quantity: number;
  price: number;
}

export default function StockAverageCalculatorPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, quantity: 100, price: 150 },
    { id: 2, quantity: 50, price: 140 },
  ]);

  const addTransaction = () => {
    const newId = transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1;
    setTransactions([...transactions, { id: newId, quantity: 0, price: 0 }]);
  };

  const removeTransaction = (id: number) => {
    if (transactions.length > 1) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  const updateTransaction = (id: number, field: 'quantity' | 'price', value: number) => {
    setTransactions(transactions.map(t =>
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  const calculateAverage = () => {
    const totalQuantity = transactions.reduce((sum, t) => sum + t.quantity, 0);
    const totalValue = transactions.reduce((sum, t) => sum + (t.quantity * t.price), 0);
    const averagePrice = totalQuantity > 0 ? totalValue / totalQuantity : 0;

    return {
      totalShares: totalQuantity,
      totalInvestment: Math.round(totalValue),
      averagePrice: Math.round(averagePrice * 100) / 100,
    };
  };

  const results = calculateAverage();

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <>
      <Navigation />
      <div className="bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-8 md:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <Link
              href="/calculators"
              className="inline-flex items-center text-white/90 hover:text-white mb-4 md:mb-6 transition-colors text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Calculators
            </Link>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                  Stock Average Calculator
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl">
                  Calculate your average purchase price across multiple stock transactions. Perfect for averaging down or tracking portfolio cost.
                </p>
              </div>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                <Calculator className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {/* Left Column - Calculator */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 lg:p-10">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-[#1A3D7C]">
                    Stock Transactions
                  </h2>
                  <Button
                    onClick={addTransaction}
                    className="bg-[#2BAE66] hover:bg-[#229954] text-white text-sm md:text-base"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Transaction
                  </Button>
                </div>

                <div className="space-y-4">
                  {transactions.map((transaction, index) => (
                    <div key={transaction.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-[#1A3D7C] text-sm md:text-base">
                          Transaction {index + 1}
                        </h3>
                        {transactions.length > 1 && (
                          <Button
                            onClick={() => removeTransaction(transaction.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`quantity-${transaction.id}`} className="text-gray-700 mb-2 block text-sm md:text-base">
                            Quantity (Shares)
                          </Label>
                          <Input
                            id={`quantity-${transaction.id}`}
                            type="number"
                            value={transaction.quantity || ''}
                            onChange={(e) => updateTransaction(transaction.id, 'quantity', Number(e.target.value))}
                            className="w-full text-right font-bold text-sm md:text-base lg:text-lg border-2 border-[#2BAE66]"
                            placeholder="0"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`price-${transaction.id}`} className="text-gray-700 mb-2 block text-sm md:text-base">
                            Price per Share (₹)
                          </Label>
                          <Input
                            id={`price-${transaction.id}`}
                            type="number"
                            value={transaction.price || ''}
                            onChange={(e) => updateTransaction(transaction.id, 'price', Number(e.target.value))}
                            className="w-full text-right font-bold text-sm md:text-base lg:text-lg border-2 border-[#2BAE66]"
                            placeholder="0.00"
                            step="0.01"
                          />
                        </div>
                      </div>

                      <div className="mt-3 text-sm text-gray-600">
                        Total Value: <span className="font-semibold text-[#1A3D7C]">
                          {formatCurrency(transaction.quantity * transaction.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 text-white sticky top-6">
                <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3" />
                  Portfolio Summary
                </h2>

                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
                    <p className="text-white/80 text-xs md:text-sm mb-2">Total Shares</p>
                    <p className="text-2xl md:text-3xl font-bold break-words">
                      {results.totalShares.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
                    <p className="text-white/80 text-xs md:text-sm mb-2">Total Investment</p>
                    <p className="text-2xl md:text-3xl font-bold break-words">
                      {formatCurrency(results.totalInvestment)}
                    </p>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 md:p-6 border-2 border-white/30">
                    <p className="text-white/90 text-xs md:text-sm mb-2 font-semibold">Average Purchase Price</p>
                    <p className="text-3xl md:text-4xl font-bold break-words">
                      {formatCurrency(results.averagePrice)}
                    </p>
                    <p className="text-white/70 text-xs mt-2">per share</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20 space-y-2 text-xs md:text-sm text-white/80">
                  <p>💡 Use this to track averaging down</p>
                  <p>📊 Add more transactions to update average</p>
                  <p>🎯 Compare with current market price</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="mt-12 md:mt-16 space-y-8 md:space-y-12">
            {/* What is Stock Average Calculator */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                What is a Stock Average Calculator?
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  A Stock Average Calculator helps investors calculate the average purchase price of stocks across multiple transactions. This is particularly useful when you buy the same stock at different prices over time, also known as dollar-cost averaging or averaging down.
                </p>
                <p>
                  The calculator computes the weighted average price by considering both the quantity of shares and the price at which they were purchased. This gives you a clear picture of your actual cost basis for tax and investment tracking purposes.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-lg">
                    <TrendingUp className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    Key Benefits
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                    <li>✓ Track your true cost basis</li>
                    <li>✓ Make informed selling decisions</li>
                    <li>✓ Monitor averaging down strategy</li>
                    <li>✓ Calculate profit/loss accurately</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-lg">
                    <Calculator className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    Use Cases
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                    <li>✓ SIP investments in stocks</li>
                    <li>✓ Averaging down during dips</li>
                    <li>✓ Portfolio cost tracking</li>
                    <li>✓ Tax filing calculations</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    How is average stock price calculated?
                  </h3>
                  <p className="text-gray-700">
                    Average price = Total investment amount ÷ Total number of shares. For example, if you bought 100 shares at ₹150 and 50 shares at ₹140, your average is (100×150 + 50×140) ÷ 150 = ₹146.67 per share.
                  </p>
                </div>

                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    What is averaging down in stocks?
                  </h3>
                  <p className="text-gray-700">
                    Averaging down means buying more shares of a stock at a lower price than your initial purchase. This reduces your average cost per share. However, it's important to only average down on fundamentally strong stocks.
                  </p>
                </div>

                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    Should I include brokerage charges?
                  </h3>
                  <p className="text-gray-700">
                    For accurate cost basis calculation, you should include brokerage, STT, and other transaction charges in the purchase price. This gives you the true average cost per share.
                  </p>
                </div>

                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    How does this help with tax filing?
                  </h3>
                  <p className="text-gray-700">
                    Your average purchase price is your cost of acquisition for capital gains tax calculation. When you sell shares, the difference between sale price and this average cost determines your taxable gains.
                  </p>
                </div>

                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    Can I use this for mutual fund SIPs?
                  </h3>
                  <p className="text-gray-700">
                    Yes! This calculator works for any investment where you're buying units at different prices - stocks, mutual funds, ETFs, or even cryptocurrencies. Just enter each purchase as a separate transaction.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-xl md:rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Explore More Financial Calculators
              </h2>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Make smarter investment decisions with our comprehensive suite of calculators
              </p>
              <Link href="/calculators">
                <Button className="bg-white text-[#1A3D7C] hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
                  View All Calculators
                </Button>
              </Link>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#1A3D7C] text-white py-8 md:py-12 mt-12 md:mt-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">The Tutor Bridge</h3>
                <p className="text-white/80 text-sm">
                  Your trusted partner for financial planning and investment calculations.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/calculators" className="text-white/80 hover:text-white transition-colors">
                      All Calculators
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-white/80 hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Disclaimer</h3>
                <p className="text-white/80 text-sm">
                  This calculator provides estimates only. Actual returns may vary. Consult a financial advisor for investment decisions.
                </p>
              </div>
            </div>
            <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
              <p>&copy; 2025 The Tutor Bridge. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
