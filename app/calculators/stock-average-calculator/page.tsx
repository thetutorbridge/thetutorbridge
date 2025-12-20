'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Home, Plus, Trash2, IndianRupee, Target, CheckCircle, HelpCircle, Lightbulb, ArrowRight, BookOpen } from 'lucide-react';
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
            {/* Benefits Section */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <Target className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Benefits of Stock Average Calculator
              </h2>
              <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
                <p className="text-lg text-white/90 leading-relaxed mb-6">
                  Track your stock investments like a pro! Our calculator helps you understand your true cost basis across multiple purchases—essential for smart selling decisions and accurate tax reporting:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Accurate Cost Basis Tracking
                    </h3>
                    <p className="text-white/90">Know your exact average purchase price for tax purposes. Essential for calculating capital gains accurately when selling shares partially or fully.</p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Smart Averaging Down Strategy
                    </h3>
                    <p className="text-white/90">Determine if averaging down makes sense. See how buying more shares at current price affects your average—crucial for quality stocks during market dips.</p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Profit/Loss Analysis
                    </h3>
                    <p className="text-white/90">Instantly know if you're in profit or loss. Compare current market price with average purchase price to make informed hold/sell decisions.</p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Portfolio Management
                    </h3>
                    <p className="text-white/90">Manage multiple stock purchases systematically. Perfect for SIP-style stock investing, ESOP additions, or regular accumulation strategies.</p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Tax Planning Tool
                    </h3>
                    <p className="text-white/90">Optimize tax by selling strategically. Know exact gains/losses before selling to plan LTCG, STCG, and tax harvesting opportunities.</p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Multi-Asset Support
                    </h3>
                    <p className="text-white/90">Works for stocks, mutual funds, ETFs, crypto, gold—anything bought in multiple transactions. Universal averaging calculator for all investments.</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-[#FFC857] text-[#1A3D7C] rounded-lg">
                  <p className="font-semibold">
                    💡 Pro Tip: Always include brokerage, STT, GST, and transaction charges in your purchase price for accurate cost basis. This ensures correct tax calculation when selling!
                  </p>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Stock Average Calculator FAQs
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">1. How is average stock price calculated?</h3>
                  <p className="text-gray-700">Average price = <strong>Total investment ÷ Total shares</strong>. Example: Bought 100 shares @ ₹150 + 50 shares @ ₹140 = (100×150 + 50×140) ÷ 150 = ₹22,000 ÷ 150 = ₹146.67 per share. This is your cost basis for tax purposes.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">2. What is averaging down and is it a good strategy?</h3>
                  <p className="text-gray-700">Averaging down = buying more shares when price falls to reduce average cost. <strong>Good:</strong> For quality stocks temporarily down, you accumulate more at lower prices. <strong>Bad:</strong> For fundamentally weak stocks, you're "catching falling knife." Only average down on strong companies!</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">3. Should I include brokerage and other charges in purchase price?</h3>
                  <p className="text-gray-700">Yes! For <strong>accurate cost basis</strong>, include: Brokerage (₹10-20/trade), STT, Exchange charges, GST, DP charges. Example: 100 shares @ ₹100 + ₹50 charges = ₹10,050 total. Average = ₹100.50/share, not ₹100. This affects capital gains tax calculation.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">4. How does average price help with tax filing?</h3>
                  <p className="text-gray-700">Average purchase price = <strong>Cost of Acquisition for capital gains</strong>. When selling: (Sale Price - Average Cost) × Quantity = Capital Gain. LTCG (>1 year): >₹1.25L taxed @ 12.5%. STCG (≤1 year): @ 20%. Accurate average ensures correct tax calculation and claims.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">5. Can I use this calculator for mutual fund SIPs?</h3>
                  <p className="text-gray-700">Yes! <strong>Works for any investment</strong> with multiple purchases: Stocks, Mutual Funds (check statement for NAV/units), ETFs, Gold, Crypto, REITs. Enter each SIP installment as transaction (units × NAV). Helps track MF cost basis for redemption/switch tax calculation.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">6. Does stock split or bonus affect my average price?</h3>
                  <p className="text-gray-700"><strong>Stock Split:</strong> Adjust shares and price proportionally (1:2 split = double shares, half price). <strong>Bonus:</strong> Add bonus shares at ₹0 cost—reduces average. Example: 100 @ ₹200 + 50 bonus = 150 shares @ ₹133.33 average. Always adjust for corporate actions!</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">7. What if I sell some shares—how do I track remaining average?</h3>
                  <p className="text-gray-700"><strong>Average price doesn't change</strong> when selling! Example: Average ₹150 with 100 shares. Sell 40 shares → Remaining 60 still have ₹150 average. Only new purchases change average. This principle applies to FIFO (First In First Out) tax calculation too.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">8. How to calculate if I should average down?</h3>
                  <p className="text-gray-700">Calculate new average with additional purchase. If current price ₹120, you have 100 @ ₹150 average. Buying 100 more @ ₹120 = new average ₹135. Ask: <strong>(1) Is company fundamentally strong? (2) Can I afford more? (3) Is ₹135 attractive?</strong> Only average down quality stocks!</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">9. What is the difference between averaging down and averaging up?</h3>
                  <p className="text-gray-700"><strong>Averaging Down:</strong> Buying at lower price than current average (reduces average). <strong>Averaging Up:</strong> Buying at higher price (increases average). Both valid—down for beaten-down quality stocks, up for momentum/growth stocks you want to accumulate more of.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">10. Do brokers automatically calculate average price?</h3>
                  <p className="text-gray-700">Yes, but <strong>verify manually!</strong> Zerodha, Upstox, Groww show average in holdings. However, they may not include all charges or adjust for corporate actions correctly. Use this calculator for independent verification and tax filing accuracy. Your average = Your tax liability!</p>
                </div>
              </div>
            </section>

            {/* Tips Section */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Smart Tips for Stock Averaging
              </h2>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-200">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700"><strong>Average down only quality stocks:</strong> Check fundamentals before averaging—revenue growth, profit margins, debt levels. Don't average down "cheap" stocks without strong business. Quality + discount = opportunity!</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700"><strong>Include all transaction costs:</strong> Brokerage, STT, GST add 0.3-0.5% to purchase price. ₹1L investment with ₹300 charges = ₹100.30 average, not ₹100. Small difference now = significant in tax calculation later.</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700"><strong>Keep detailed transaction records:</strong> Date, quantity, price, charges for every purchase. Broker statements may not have full history. Your own Excel/sheet ensures accurate tax filing and portfolio tracking.</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700"><strong>Set target average, not just price:</strong> Instead of "buy at ₹100," think "reduce average to ₹120." This prevents overleveraging on single price point. Calculate how much needed to reach target average.</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700"><strong>Don't average down with entire capital:</strong> Keep reserve for further dips. If stock at ₹100 (your avg ₹150), use 30-40% capital. If it falls to ₹80, you can average again. Staggered averaging > one-time averaging.</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700"><strong>Adjust for corporate actions immediately:</strong> Stock split, bonus, dividend—adjust calculations same day. Delayed adjustments lead to wrong average and tax errors. Most brokers auto-adjust but verify manually.</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700"><strong>For students/beginners:</strong> Practice with small amounts. Buy 10-20 shares at different prices to learn averaging. Track average manually vs broker's calculation. Understanding averaging = foundation of smart investing!</p>
                  </li>
                </ul>
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

        {/* Book Your Session CTA */}
        <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Need Help with Stock & Investment Mathematics?
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                Our expert tutors can help you understand stock averaging, weighted averages, and financial calculations. Get personalized one-on-one guidance tailored to your learning style.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tutoring/free-consultation">
                  <Button className="bg-[#FFC857] hover:bg-[#FFC857]/90 text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                    Book Free Demo Class
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl transition-all duration-200">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

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
