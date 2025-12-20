'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, RotateCcw, Tag, Info, BookOpen, GraduationCap, Percent, DollarSign, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

interface Results {
  finalPrice: number;
  savings: number;
  discountAmount1: number;
  discountAmount2: number;
  priceAfterFirstDiscount: number;
  salesTaxAmount: number;
  totalDiscount: number;
  effectiveDiscountPercent: number;
}

export default function PercentOffCalculator() {
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [percentOff1, setPercentOff1] = useState<string>('');
  const [showSecondDiscount, setShowSecondDiscount] = useState<boolean>(false);
  const [percentOff2, setPercentOff2] = useState<string>('');
  const [showSalesTax, setShowSalesTax] = useState<boolean>(false);
  const [salesTaxRate, setSalesTaxRate] = useState<string>('');
  const [results, setResults] = useState<Results | null>(null);
  const [currency, setCurrency] = useState<string>('Rs');

  // Auto-calculate on input change
  useEffect(() => {
    const price = parseFloat(originalPrice);
    const discount1 = parseFloat(percentOff1) || 0;
    const discount2 = showSecondDiscount ? (parseFloat(percentOff2) || 0) : 0;
    const taxRate = showSalesTax ? (parseFloat(salesTaxRate) || 0) : 0;

    if (isNaN(price) || price <= 0) {
      setResults(null);
      return;
    }

    // Calculate first discount
    const discountAmount1 = price * (discount1 / 100);
    const priceAfterFirstDiscount = price - discountAmount1;

    // Calculate second stackable discount (applied to already discounted price)
    const discountAmount2 = priceAfterFirstDiscount * (discount2 / 100);
    const priceAfterDiscounts = priceAfterFirstDiscount - discountAmount2;

    // Calculate sales tax
    const salesTaxAmount = priceAfterDiscounts * (taxRate / 100);
    const finalPrice = priceAfterDiscounts + salesTaxAmount;

    // Total savings (without tax)
    const totalSavings = discountAmount1 + discountAmount2;
    const effectiveDiscountPercent = (totalSavings / price) * 100;

    setResults({
      finalPrice,
      savings: totalSavings,
      discountAmount1,
      discountAmount2,
      priceAfterFirstDiscount,
      salesTaxAmount,
      totalDiscount: totalSavings,
      effectiveDiscountPercent,
    });
  }, [originalPrice, percentOff1, percentOff2, showSecondDiscount, salesTaxRate, showSalesTax]);

  const handleReset = () => {
    setOriginalPrice('');
    setPercentOff1('');
    setPercentOff2('');
    setSalesTaxRate('');
    setShowSecondDiscount(false);
    setShowSalesTax(false);
    setResults(null);
  };

  const formatCurrency = (num: number): string => {
    return num.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  };

  // Quick discount presets
  const discountPresets = [5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 75];

  // Reference table data
  const referenceData = [
    { percent: 10, original: 100, final: 90, savings: 10 },
    { percent: 15, original: 100, final: 85, savings: 15 },
    { percent: 20, original: 100, final: 80, savings: 20 },
    { percent: 25, original: 100, final: 75, savings: 25 },
    { percent: 30, original: 100, final: 70, savings: 30 },
    { percent: 40, original: 100, final: 60, savings: 40 },
    { percent: 50, original: 100, final: 50, savings: 50 },
  ];

  // Common shopping scenarios
  const shoppingExamples = [
    { original: 1000, discount: 20, final: 800, savings: 200, description: '20% off sale' },
    { original: 500, discount: 10, final: 450, savings: 50, description: '10% member discount' },
    { original: 2000, discount: 30, final: 1400, savings: 600, description: '30% clearance' },
    { original: 1500, discount: 50, final: 750, savings: 750, description: '50% Black Friday' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm py-3 px-4 sm:px-6 shadow-sm">
        <div className="container mx-auto max-w-4xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-red-600 hover:text-red-800 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/calculators" className="text-red-600 hover:text-red-800">
              Calculators
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Percent Off Calculator</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-pink-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
              <Tag className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Percent Off Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate sale prices and savings instantly. Find out how much you&apos;ll pay after discounts with support for stackable percentages and sales tax.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
          {/* Original Price Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Original price
            </label>
            <div className="flex gap-2">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-700 font-medium"
              >
                <option value="Rs">Rs</option>
                <option value="$">$</option>
                <option value="€">€</option>
                <option value="£">£</option>
                <option value="¥">¥</option>
              </select>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="Enter original price"
                min="0"
                step="0.01"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
              />
            </div>
          </div>

          {/* Percent Off Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Percent off
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={percentOff1}
                onChange={(e) => setPercentOff1(e.target.value)}
                placeholder="Enter discount percentage"
                min="0"
                max="100"
                step="0.1"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
              />
              <span className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium flex items-center">
                <Percent className="w-5 h-5" />
              </span>
            </div>
            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2 mt-3">
              {discountPresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setPercentOff1(preset.toString())}
                  className="px-3 py-1.5 text-sm bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors border border-red-200"
                >
                  {preset}%
                </button>
              ))}
            </div>
          </div>

          {/* Second Stackable Discount Toggle */}
          <div className="mb-4">
            <label className="flex items-center cursor-pointer p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={showSecondDiscount}
                onChange={() => setShowSecondDiscount(!showSecondDiscount)}
                className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="ml-3 text-gray-700 font-medium">Add second stackable percent off</span>
            </label>
          </div>

          {/* Second Discount Input */}
          {showSecondDiscount && (
            <div className="mb-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
              <label className="block text-sm font-semibold text-orange-800 mb-2">
                Second percent off (applied after first discount)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={percentOff2}
                  onChange={(e) => setPercentOff2(e.target.value)}
                  placeholder="Enter second discount"
                  min="0"
                  max="100"
                  step="0.1"
                  className="flex-1 px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg bg-white"
                />
                <span className="px-4 py-3 bg-orange-100 rounded-xl text-orange-700 font-medium flex items-center">
                  <Percent className="w-5 h-5" />
                </span>
              </div>
              <p className="text-xs text-orange-700 mt-2">
                Stackable discounts are applied sequentially, not added together.
                E.g., 20% + 10% off = 28% total, not 30%.
              </p>
            </div>
          )}

          {/* Results Section */}
          {results && (
            <div className="space-y-4 mb-6">
              <hr className="border-gray-200" />

              <h2 className="text-lg font-bold text-gray-800">
                Final price and savings
              </h2>

              {/* Final Price */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-200">
                <label className="block text-sm font-semibold text-green-800 mb-2">
                  Final price
                </label>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-green-700">
                    {currency}{formatCurrency(results.finalPrice)}
                  </span>
                </div>
              </div>

              {/* Savings */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-5 border-2 border-red-200">
                <label className="block text-sm font-semibold text-red-800 mb-2">
                  Savings
                </label>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-red-700">
                    {currency}{formatCurrency(results.savings)}
                  </span>
                  <span className="text-lg text-red-600">
                    ({results.effectiveDiscountPercent.toFixed(1)}% off)
                  </span>
                </div>
              </div>

              {/* Breakdown */}
              {(showSecondDiscount || showSalesTax) && (
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Original:</span> {currency}{formatCurrency(parseFloat(originalPrice))}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">First discount ({percentOff1 || 0}%):</span> -{currency}{formatCurrency(results.discountAmount1)}
                  </p>
                  {showSecondDiscount && parseFloat(percentOff2) > 0 && (
                    <>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">After first discount:</span> {currency}{formatCurrency(results.priceAfterFirstDiscount)}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Second discount ({percentOff2}%):</span> -{currency}{formatCurrency(results.discountAmount2)}
                      </p>
                    </>
                  )}
                  {showSalesTax && parseFloat(salesTaxRate) > 0 && (
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Sales tax ({salesTaxRate}%):</span> +{currency}{formatCurrency(results.salesTaxAmount)}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Sales Tax Section */}
          <div className="mb-6">
            <button
              onClick={() => setShowSalesTax(!showSalesTax)}
              className="flex items-center justify-between w-full p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors border border-blue-200"
            >
              <span className="text-blue-800 font-semibold flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Sales tax
              </span>
              {showSalesTax ? (
                <ChevronUp className="w-5 h-5 text-blue-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-blue-600" />
              )}
            </button>

            {showSalesTax && (
              <div className="mt-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <label className="block text-sm font-semibold text-blue-800 mb-2">
                  Sales tax rate
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={salesTaxRate}
                    onChange={(e) => setSalesTaxRate(e.target.value)}
                    placeholder="Enter tax rate"
                    min="0"
                    max="100"
                    step="0.1"
                    className="flex-1 px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg bg-white"
                  />
                  <span className="px-4 py-3 bg-blue-100 rounded-xl text-blue-700 font-medium flex items-center">
                    <Percent className="w-5 h-5" />
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[5, 7, 8, 10, 12, 18].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSalesTaxRate(rate.toString())}
                      className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reset Button */}
          <div className="flex justify-center">
            <button
              onClick={handleReset}
              className="flex items-center px-6 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear all changes
            </button>
          </div>
        </div>

        {/* Quick Reference Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-red-600" />
            Percent Off Quick Reference
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Quick reference for common discount percentages on a {currency}100 item:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Discount</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-700">Original</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-700">Final Price</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-700">You Save</th>
                </tr>
              </thead>
              <tbody>
                {referenceData.map((row) => (
                  <tr key={row.percent} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium text-red-600">{row.percent}% off</td>
                    <td className="py-2 px-3 text-right text-gray-700">{currency}{row.original}</td>
                    <td className="py-2 px-3 text-right text-green-700 font-medium">{currency}{row.final}</td>
                    <td className="py-2 px-3 text-right text-red-600">{currency}{row.savings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shopping Examples */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2 text-red-600" />
            Common Shopping Scenarios
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {shoppingExamples.map((example, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-red-300 transition-colors cursor-pointer"
                onClick={() => {
                  setOriginalPrice(example.original.toString());
                  setPercentOff1(example.discount.toString());
                }}
              >
                <p className="font-semibold text-gray-800 mb-1">{example.description}</p>
                <p className="text-sm text-gray-600">
                  {currency}{example.original} → <span className="text-green-600 font-medium">{currency}{example.final}</span>
                  <span className="text-red-600 ml-2">(Save {currency}{example.savings})</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Formula Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-red-600" />
            How to Calculate Percent Off
          </h2>

          <div className="space-y-6">
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <h3 className="font-semibold text-red-800 mb-2">Basic Formula</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-center mb-2">
                Final Price = Original Price × (1 - Discount%/100)
              </div>
              <p className="text-sm text-red-700">
                Or: Final Price = Original Price - (Original Price × Discount%/100)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Quick 10% Off Method</h3>
                <p className="text-sm text-blue-700">
                  Simply move the decimal one place left.
                  <br /><strong>Example:</strong> 10% off Rs 250 = Rs 25 off → Rs 225
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">Quick 20% Off Method</h3>
                <p className="text-sm text-green-700">
                  Calculate 10%, then double it.
                  <br /><strong>Example:</strong> 20% off Rs 300 = Rs 60 off → Rs 240
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">Quick 25% Off Method</h3>
                <p className="text-sm text-purple-700">
                  Divide by 4 to find the discount.
                  <br /><strong>Example:</strong> 25% off Rs 400 = Rs 100 off → Rs 300
                </p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <h3 className="font-semibold text-orange-800 mb-2">Quick 50% Off Method</h3>
                <p className="text-sm text-orange-700">
                  Simply divide by 2.
                  <br /><strong>Example:</strong> 50% off Rs 800 = Rs 400 off → Rs 400
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2">Stackable Discounts</h3>
              <p className="text-sm text-yellow-700 mb-2">
                When applying multiple discounts, each is calculated on the already-reduced price:
              </p>
              <div className="bg-white rounded-lg p-3 text-sm">
                <p><strong>Example:</strong> Rs 1000 with 20% off, then 10% off</p>
                <p className="mt-1">Step 1: Rs 1000 × (1 - 0.20) = Rs 800</p>
                <p>Step 2: Rs 800 × (1 - 0.10) = Rs 720</p>
                <p className="mt-1 text-yellow-800"><strong>Total savings: Rs 280 (28% effective discount, NOT 30%)</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* Understanding Discounts */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2 text-red-600" />
            Understanding Percent Off
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is Percent Off?</h3>
              <p className="text-gray-600 leading-relaxed">
                Percent off (or percentage discount) represents how much the original price is reduced
                by a certain percentage. When something is &quot;20% off,&quot; you pay 80% of the original price
                and save 20%. This is the most common way retailers advertise sales and promotions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Why Stackable Discounts Aren&apos;t Simply Added</h3>
              <p className="text-gray-600 leading-relaxed">
                When you have two discounts (like a store sale plus a coupon), they&apos;re applied sequentially,
                not added together. The second discount applies to the already-reduced price, not the original.
                This is why 20% + 10% off equals 28% total savings, not 30%.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">When Is Sales Tax Calculated?</h3>
              <p className="text-gray-600 leading-relaxed">
                Sales tax is typically calculated on the final discounted price, not the original price.
                This means you save on both the product price AND the tax amount. The tax is added
                after all discounts are applied.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h3 className="font-semibold text-red-800 mb-2">Black Friday & Cyber Monday Tips</h3>
              <p className="text-sm text-red-700">
                Average discounts during these sales events range from 25-35%. Use this calculator to
                verify actual savings and compare deals. Remember: a 50% discount on an inflated price
                may not be a real bargain. Always check the original price history before buying.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-red-600" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do I calculate 20% off?</h3>
              <p className="text-gray-600">
                To calculate 20% off, multiply the original price by 0.20 (or divide by 5) to find the
                discount amount, then subtract from the original. Alternatively, multiply the original
                by 0.80 to get the final price directly. Example: 20% off Rs 500 = Rs 500 × 0.80 = Rs 400.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is the formula for percent off?</h3>
              <p className="text-gray-600">
                Final Price = Original Price × (1 - Discount/100), or Discount Amount = Original Price × (Discount/100).
                For example, 30% off Rs 200: Discount = 200 × 0.30 = Rs 60, Final Price = Rs 200 - Rs 60 = Rs 140.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do stackable discounts work?</h3>
              <p className="text-gray-600">
                Stackable discounts are applied one after another, not added together. The second discount
                is calculated on the price after the first discount. Example: 30% off + 20% off doesn&apos;t
                equal 50% off. Instead: Rs 100 → Rs 70 (30% off) → Rs 56 (20% off Rs 70) = 44% total savings.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Is it better to get a flat amount off or percentage off?</h3>
              <p className="text-gray-600">
                It depends on the original price. Calculate both to compare. For expensive items, percentage
                discounts often save more. For cheaper items, flat discounts might be better. Example:
                Rs 50 off vs 10% off on Rs 400 → Rs 50 off is better (Rs 50 vs Rs 40 savings).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do I find the original price from a sale price?</h3>
              <p className="text-gray-600">
                Original Price = Sale Price ÷ (1 - Discount/100). Example: If something costs Rs 80 after
                20% off, the original was Rs 80 ÷ 0.80 = Rs 100. This is useful for verifying &quot;sale&quot; prices.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Does sales tax apply before or after the discount?</h3>
              <p className="text-gray-600">
                In most regions, sales tax is applied to the final discounted price, not the original price.
                This means you save on both the product and the tax. Always check your local tax laws as
                rules may vary by location.
              </p>
            </div>
          </div>
        </div>

        {/* Related Calculators */}
        <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl shadow-lg border border-red-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/calculators/percentage-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate any percentage with step-by-step solutions</p>
            </Link>
            <Link
              href="/calculators/percentage-increase-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Percentage Increase Calculator</h3>
              <p className="text-sm text-gray-600">Calculate percentage increase between two values</p>
            </Link>
            <Link
              href="/calculators/percentage-decrease-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Percentage Decrease Calculator</h3>
              <p className="text-sm text-gray-600">Calculate percentage decrease between two values</p>
            </Link>
            <Link
              href="/calculators/percentage-difference-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Percentage Difference Calculator</h3>
              <p className="text-sm text-gray-600">Find the percentage difference between two numbers</p>
            </Link>
          </div>
        </div>

        {/* Book Your Session CTA */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2563eb] rounded-2xl shadow-xl p-6 sm:p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <GraduationCap className="w-12 h-12 text-[#FFC857] mr-4 flex-shrink-0" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Need Help with Math & Percentages?</h2>
                <p className="text-blue-100">
                  Our tutors can help you master percentages, fractions, and all math concepts.
                </p>
              </div>
            </div>
            <Link
              href="/tutoring/free-consultation"
              className="inline-flex items-center px-6 py-3 bg-[#FFC857] text-[#1A3D7C] font-bold rounded-xl hover:bg-yellow-400 transition-colors whitespace-nowrap"
            >
              Book Your Session
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Percent Off Calculator",
            "description": "Calculate sale prices and savings instantly. Find discounts with stackable percentages and sales tax support.",
            "url": "https://www.thetutorbridge.com/calculators/percent-off-calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "The Tutor Bridge"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I calculate 20% off?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "To calculate 20% off, multiply the original price by 0.20 to find the discount amount, then subtract from the original. Alternatively, multiply the original by 0.80 to get the final price directly."
                }
              },
              {
                "@type": "Question",
                "name": "What is the formula for percent off?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Final Price = Original Price × (1 - Discount/100), or Discount Amount = Original Price × (Discount/100)."
                }
              },
              {
                "@type": "Question",
                "name": "How do stackable discounts work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Stackable discounts are applied one after another, not added together. The second discount is calculated on the price after the first discount. 30% off + 20% off equals 44% total savings, not 50%."
                }
              },
              {
                "@type": "Question",
                "name": "Does sales tax apply before or after the discount?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In most regions, sales tax is applied to the final discounted price, not the original price. This means you save on both the product and the tax."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
