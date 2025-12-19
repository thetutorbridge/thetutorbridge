'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, RotateCcw, Tag, Info, BookOpen, GraduationCap, Percent, ShoppingCart, Package, ChevronDown } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

type DiscountType =
  | 'percent-off'
  | 'percent-off-2nd'
  | 'percent-off-3rd'
  | 'fixed-amount'
  | '2-for-1'
  | '3-for-2'
  | '4-for-3'
  | 'double-discount'
  | 'triple-discount'
  | 'multi-unit';

interface Results {
  youPay: number;
  youSave: number;
  perUnitPrice: number;
  effectiveDiscount: number;
  breakdown: string[];
}

export default function DiscountCalculator() {
  const [discountType, setDiscountType] = useState<DiscountType>('percent-off');
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [discount, setDiscount] = useState<string>('');
  const [secondDiscount, setSecondDiscount] = useState<string>('');
  const [thirdDiscount, setThirdDiscount] = useState<string>('');
  const [taxIncluded, setTaxIncluded] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<string>('1');
  const [currency, setCurrency] = useState<string>('Rs');
  const [results, setResults] = useState<Results | null>(null);

  const discountTypes: { value: DiscountType; label: string; description: string }[] = [
    { value: 'percent-off', label: '% off', description: 'Standard percentage discount' },
    { value: 'percent-off-2nd', label: '% off on 2nd product', description: 'Discount on second item only' },
    { value: 'percent-off-3rd', label: '% off on 3rd product', description: 'Discount on third item only' },
    { value: 'fixed-amount', label: 'Fixed amount off', description: 'Fixed amount deducted from price' },
    { value: '2-for-1', label: '2 for 1', description: 'Buy one get one free' },
    { value: '3-for-2', label: '3 for 2', description: 'Buy 2 get 1 free' },
    { value: '4-for-3', label: '4 for 3', description: 'Buy 3 get 1 free' },
    { value: 'double-discount', label: 'Double discount', description: 'Two stacked percentage discounts' },
    { value: 'triple-discount', label: 'Triple discount', description: 'Three stacked percentage discounts' },
    { value: 'multi-unit', label: 'On multiple units', description: 'Bulk quantity discount' },
  ];

  // Calculate results based on discount type
  useEffect(() => {
    const price = parseFloat(originalPrice);
    const disc = parseFloat(discount) || 0;
    const disc2 = parseFloat(secondDiscount) || 0;
    const disc3 = parseFloat(thirdDiscount) || 0;
    const qty = parseInt(quantity) || 1;

    if (isNaN(price) || price <= 0) {
      setResults(null);
      return;
    }

    let youPay = 0;
    let youSave = 0;
    const breakdown: string[] = [];
    const totalOriginal = price * qty;

    switch (discountType) {
      case 'percent-off': {
        const discountAmount = price * (disc / 100);
        youPay = (price - discountAmount) * qty;
        youSave = totalOriginal - youPay;
        breakdown.push(`Original: ${currency}${price.toFixed(2)} × ${qty} = ${currency}${totalOriginal.toFixed(2)}`);
        breakdown.push(`Discount: ${disc}% off = ${currency}${discountAmount.toFixed(2)} per item`);
        breakdown.push(`You pay: ${currency}${(price - discountAmount).toFixed(2)} × ${qty} = ${currency}${youPay.toFixed(2)}`);
        break;
      }

      case 'percent-off-2nd': {
        if (qty >= 2) {
          const firstItem = price;
          const secondItem = price * (1 - disc / 100);
          const additionalItems = Math.max(0, qty - 2) * price;
          youPay = firstItem + secondItem + additionalItems;
          youSave = totalOriginal - youPay;
          breakdown.push(`1st item: ${currency}${price.toFixed(2)} (full price)`);
          breakdown.push(`2nd item: ${currency}${secondItem.toFixed(2)} (${disc}% off)`);
          if (qty > 2) breakdown.push(`Remaining ${qty - 2} items: ${currency}${additionalItems.toFixed(2)}`);
        } else {
          youPay = price;
          youSave = 0;
          breakdown.push(`Need at least 2 items for this discount`);
          breakdown.push(`Current: 1 item at ${currency}${price.toFixed(2)}`);
        }
        break;
      }

      case 'percent-off-3rd': {
        if (qty >= 3) {
          const firstTwo = price * 2;
          const thirdItem = price * (1 - disc / 100);
          const additionalItems = Math.max(0, qty - 3) * price;
          youPay = firstTwo + thirdItem + additionalItems;
          youSave = totalOriginal - youPay;
          breakdown.push(`1st & 2nd items: ${currency}${firstTwo.toFixed(2)} (full price)`);
          breakdown.push(`3rd item: ${currency}${thirdItem.toFixed(2)} (${disc}% off)`);
          if (qty > 3) breakdown.push(`Remaining ${qty - 3} items: ${currency}${additionalItems.toFixed(2)}`);
        } else {
          youPay = price * qty;
          youSave = 0;
          breakdown.push(`Need at least 3 items for this discount`);
          breakdown.push(`Current: ${qty} item(s) at ${currency}${youPay.toFixed(2)}`);
        }
        break;
      }

      case 'fixed-amount': {
        const discountAmount = Math.min(disc, price);
        youPay = Math.max(0, (price - discountAmount)) * qty;
        youSave = totalOriginal - youPay;
        breakdown.push(`Original: ${currency}${price.toFixed(2)} × ${qty} = ${currency}${totalOriginal.toFixed(2)}`);
        breakdown.push(`Discount: ${currency}${discountAmount.toFixed(2)} off per item`);
        breakdown.push(`You pay: ${currency}${(price - discountAmount).toFixed(2)} × ${qty} = ${currency}${youPay.toFixed(2)}`);
        break;
      }

      case '2-for-1': {
        // Buy 1 Get 1 Free
        const pairsCount = Math.floor(qty / 2);
        const remainder = qty % 2;
        youPay = (pairsCount * price) + (remainder * price);
        youSave = totalOriginal - youPay;
        breakdown.push(`Buy 1 Get 1 Free (BOGO)`);
        if (pairsCount > 0) breakdown.push(`${pairsCount} pair(s): Pay ${currency}${(pairsCount * price).toFixed(2)}, get ${pairsCount} free`);
        if (remainder > 0) breakdown.push(`${remainder} extra item(s): ${currency}${(remainder * price).toFixed(2)}`);
        breakdown.push(`Total for ${qty} items: ${currency}${youPay.toFixed(2)}`);
        break;
      }

      case '3-for-2': {
        // Buy 2 Get 1 Free
        const setsOf3 = Math.floor(qty / 3);
        const remainder = qty % 3;
        youPay = (setsOf3 * price * 2) + (remainder * price);
        youSave = totalOriginal - youPay;
        breakdown.push(`Buy 2 Get 1 Free`);
        if (setsOf3 > 0) breakdown.push(`${setsOf3} set(s) of 3: Pay ${currency}${(setsOf3 * price * 2).toFixed(2)} for ${setsOf3 * 3} items`);
        if (remainder > 0) breakdown.push(`${remainder} extra item(s): ${currency}${(remainder * price).toFixed(2)}`);
        breakdown.push(`Total for ${qty} items: ${currency}${youPay.toFixed(2)}`);
        break;
      }

      case '4-for-3': {
        // Buy 3 Get 1 Free
        const setsOf4 = Math.floor(qty / 4);
        const remainder = qty % 4;
        youPay = (setsOf4 * price * 3) + (remainder * price);
        youSave = totalOriginal - youPay;
        breakdown.push(`Buy 3 Get 1 Free`);
        if (setsOf4 > 0) breakdown.push(`${setsOf4} set(s) of 4: Pay ${currency}${(setsOf4 * price * 3).toFixed(2)} for ${setsOf4 * 4} items`);
        if (remainder > 0) breakdown.push(`${remainder} extra item(s): ${currency}${(remainder * price).toFixed(2)}`);
        breakdown.push(`Total for ${qty} items: ${currency}${youPay.toFixed(2)}`);
        break;
      }

      case 'double-discount': {
        const afterFirst = price * (1 - disc / 100);
        const afterSecond = afterFirst * (1 - disc2 / 100);
        youPay = afterSecond * qty;
        youSave = totalOriginal - youPay;
        breakdown.push(`Original: ${currency}${price.toFixed(2)}`);
        breakdown.push(`After ${disc}% off: ${currency}${afterFirst.toFixed(2)}`);
        breakdown.push(`After additional ${disc2}% off: ${currency}${afterSecond.toFixed(2)}`);
        breakdown.push(`Total for ${qty} item(s): ${currency}${youPay.toFixed(2)}`);
        break;
      }

      case 'triple-discount': {
        const afterFirst = price * (1 - disc / 100);
        const afterSecond = afterFirst * (1 - disc2 / 100);
        const afterThird = afterSecond * (1 - disc3 / 100);
        youPay = afterThird * qty;
        youSave = totalOriginal - youPay;
        breakdown.push(`Original: ${currency}${price.toFixed(2)}`);
        breakdown.push(`After ${disc}% off: ${currency}${afterFirst.toFixed(2)}`);
        breakdown.push(`After additional ${disc2}% off: ${currency}${afterSecond.toFixed(2)}`);
        breakdown.push(`After additional ${disc3}% off: ${currency}${afterThird.toFixed(2)}`);
        breakdown.push(`Total for ${qty} item(s): ${currency}${youPay.toFixed(2)}`);
        break;
      }

      case 'multi-unit': {
        // Apply discount based on quantity purchased
        const discountAmount = price * (disc / 100);
        youPay = (price - discountAmount) * qty;
        youSave = totalOriginal - youPay;
        breakdown.push(`Bulk discount: ${disc}% off when buying ${qty} units`);
        breakdown.push(`Original total: ${currency}${totalOriginal.toFixed(2)}`);
        breakdown.push(`Discount: ${currency}${(discountAmount * qty).toFixed(2)}`);
        breakdown.push(`You pay: ${currency}${youPay.toFixed(2)}`);
        break;
      }
    }

    const perUnitPrice = youPay / qty;
    const effectiveDiscount = totalOriginal > 0 ? ((totalOriginal - youPay) / totalOriginal) * 100 : 0;

    setResults({
      youPay,
      youSave,
      perUnitPrice,
      effectiveDiscount,
      breakdown,
    });
  }, [discountType, originalPrice, discount, secondDiscount, thirdDiscount, quantity, currency]);

  const handleReset = () => {
    setDiscountType('percent-off');
    setOriginalPrice('');
    setDiscount('');
    setSecondDiscount('');
    setThirdDiscount('');
    setTaxIncluded(true);
    setQuantity('1');
    setResults(null);
  };

  const formatCurrency = (num: number): string => {
    return num.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  };

  // Quick discount presets
  const discountPresets = [10, 15, 20, 25, 30, 40, 50];

  // Show additional discount inputs based on type
  const showSecondDiscount = discountType === 'double-discount' || discountType === 'triple-discount';
  const showThirdDiscount = discountType === 'triple-discount';
  const showQuantity = ['percent-off-2nd', 'percent-off-3rd', '2-for-1', '3-for-2', '4-for-3', 'multi-unit'].includes(discountType);
  const showDiscountInput = !['2-for-1', '3-for-2', '4-for-3'].includes(discountType);
  const isFixedAmount = discountType === 'fixed-amount';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm py-3 px-4 sm:px-6 shadow-sm">
        <div className="container mx-auto max-w-4xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-purple-600 hover:text-purple-800 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/calculators" className="text-purple-600 hover:text-purple-800">
              Calculators
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Discount Calculator</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
              <Tag className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Discount Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate discounts with 10 different types: percentage off, 2 for 1, 3 for 2, fixed amount, double and triple discounts, and more. Find your final price and savings instantly.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
          {/* Discount Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              What type of discount?
            </label>
            <div className="relative">
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as DiscountType)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg appearance-none bg-white cursor-pointer"
              >
                {discountTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {discountTypes.find(t => t.value === discountType)?.description}
            </p>
          </div>

          {/* Original Price Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Original price
            </label>
            <div className="flex gap-2">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-700 font-medium"
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
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
              />
            </div>
          </div>

          {/* Discount Input */}
          {showDiscountInput && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isFixedAmount ? 'Amount off' : 'Discount'}
              </label>
              <div className="flex gap-2">
                {isFixedAmount && (
                  <span className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium">
                    {currency}
                  </span>
                )}
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder={isFixedAmount ? 'Enter amount' : 'Enter discount %'}
                  min="0"
                  max={isFixedAmount ? undefined : 100}
                  step="0.1"
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
                />
                {!isFixedAmount && (
                  <span className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium flex items-center">
                    <Percent className="w-5 h-5" />
                  </span>
                )}
              </div>
              {/* Quick Presets for percentage */}
              {!isFixedAmount && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {discountPresets.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setDiscount(preset.toString())}
                      className="px-3 py-1.5 text-sm bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors border border-purple-200"
                    >
                      {preset}%
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Second Discount (for double/triple) */}
          {showSecondDiscount && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Second discount
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={secondDiscount}
                  onChange={(e) => setSecondDiscount(e.target.value)}
                  placeholder="Enter second discount %"
                  min="0"
                  max="100"
                  step="0.1"
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
                />
                <span className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium flex items-center">
                  <Percent className="w-5 h-5" />
                </span>
              </div>
            </div>
          )}

          {/* Third Discount (for triple) */}
          {showThirdDiscount && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Third discount
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={thirdDiscount}
                  onChange={(e) => setThirdDiscount(e.target.value)}
                  placeholder="Enter third discount %"
                  min="0"
                  max="100"
                  step="0.1"
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
                />
                <span className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium flex items-center">
                  <Percent className="w-5 h-5" />
                </span>
              </div>
            </div>
          )}

          {/* Quantity Input */}
          {showQuantity && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                min="1"
                step="1"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
              />
            </div>
          )}

          {/* Tax Included Toggle */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
              Tax included?
              <span className="ml-2 text-gray-400 cursor-help" title="Is the displayed price inclusive of tax?">
                <Info className="w-4 h-4" />
              </span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="taxIncluded"
                  checked={taxIncluded === true}
                  onChange={() => setTaxIncluded(true)}
                  className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-700">Yes</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="taxIncluded"
                  checked={taxIncluded === false}
                  onChange={() => setTaxIncluded(false)}
                  className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-700">No</span>
              </label>
            </div>
          </div>

          {/* Results Section */}
          {results && (
            <div className="space-y-4 mb-6">
              <hr className="border-gray-200" />

              <h2 className="text-lg font-bold text-gray-800">
                After discount
              </h2>

              {/* You Pay */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-200">
                <label className="block text-sm font-semibold text-green-800 mb-2">
                  You pay...
                </label>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-green-700">
                    {currency}{formatCurrency(results.youPay)}
                  </span>
                  {results.perUnitPrice !== results.youPay && (
                    <span className="text-sm text-green-600">
                      ({currency}{formatCurrency(results.perUnitPrice)}/unit)
                    </span>
                  )}
                </div>
              </div>

              {/* You Save */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-5 border-2 border-red-200">
                <label className="block text-sm font-semibold text-red-800 mb-2">
                  You&apos;re saving...
                </label>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-red-700">
                    {currency}{formatCurrency(results.youSave)}
                  </span>
                  <span className="text-lg text-red-600">
                    ({results.effectiveDiscount.toFixed(1)}% off)
                  </span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-2 text-sm">Calculation Breakdown</h3>
                <div className="space-y-1">
                  {results.breakdown.map((line, index) => (
                    <p key={index} className="text-sm text-gray-600">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

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

        {/* Discount Types Explained */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2 text-purple-600" />
            Discount Types Explained
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">% Off</h3>
              <p className="text-sm text-purple-700">
                Standard percentage discount. If something is 20% off Rs 100, you pay Rs 80.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">% Off on 2nd/3rd Product</h3>
              <p className="text-sm text-blue-700">
                Discount applies only to the 2nd or 3rd item. First item(s) remain full price.
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Fixed Amount Off</h3>
              <p className="text-sm text-green-700">
                A specific amount is deducted. &quot;Rs 50 off&quot; means exactly Rs 50 discount.
              </p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
              <h3 className="font-semibold text-orange-800 mb-2">2 for 1 (BOGO)</h3>
              <p className="text-sm text-orange-700">
                Buy One Get One Free. Pay for 1, get 2 items. Effective 50% off when buying pairs.
              </p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
              <h3 className="font-semibold text-pink-800 mb-2">3 for 2</h3>
              <p className="text-sm text-pink-700">
                Buy 2 Get 1 Free. Pay for 2, get 3 items. Effective 33.3% off when buying sets of 3.
              </p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2">4 for 3</h3>
              <p className="text-sm text-yellow-700">
                Buy 3 Get 1 Free. Pay for 3, get 4 items. Effective 25% off when buying sets of 4.
              </p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
              <h3 className="font-semibold text-indigo-800 mb-2">Double Discount</h3>
              <p className="text-sm text-indigo-700">
                Two discounts applied sequentially. 20% + 10% = 28% total (not 30%!).
              </p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <h3 className="font-semibold text-red-800 mb-2">Triple Discount</h3>
              <p className="text-sm text-red-700">
                Three discounts stacked. Each applies to the already-reduced price.
              </p>
            </div>
          </div>
        </div>

        {/* Formula Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-purple-600" />
            Discount Formulas
          </h2>

          <div className="space-y-4">
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">Calculate Sale Price</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-sm mb-2">
                Sale Price = Original Price × (1 - Discount%/100)
              </div>
              <p className="text-sm text-purple-700">
                Example: Rs 500 with 20% off = Rs 500 × 0.80 = Rs 400
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Calculate Discount Amount</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-sm mb-2">
                Discount Amount = Original Price × (Discount%/100)
              </div>
              <p className="text-sm text-blue-700">
                Example: 30% off Rs 1000 = Rs 1000 × 0.30 = Rs 300 savings
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Calculate Discount Percentage</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-sm mb-2">
                Discount% = ((Original - Sale) / Original) × 100
              </div>
              <p className="text-sm text-green-700">
                Example: Rs 800 reduced to Rs 600 = ((800-600)/800) × 100 = 25% off
              </p>
            </div>

            <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
              <h3 className="font-semibold text-orange-800 mb-2">Find Original Price</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-sm mb-2">
                Original Price = Sale Price ÷ (1 - Discount%/100)
              </div>
              <p className="text-sm text-orange-700">
                Example: Rs 600 after 25% off = Rs 600 ÷ 0.75 = Rs 800 original
              </p>
            </div>
          </div>
        </div>

        {/* Understanding Discounts */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2 text-purple-600" />
            Understanding Discounts
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Types of Discounts</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>Promotional Discounts:</strong> Temporary price reductions to attract customers (sales, clearance)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>Quantity Discounts:</strong> Lower prices for buying in bulk (bulk buying, wholesale)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>Trade Discounts:</strong> Discounts for distributors and retailers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>Cash Discounts:</strong> Reductions for paying with cash or paying early</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Why Stacked Discounts Don&apos;t Add Up</h3>
              <p className="text-gray-600 leading-relaxed">
                When you have 20% off + 10% off, the total isn&apos;t 30%. The second discount applies to the
                already-reduced price. Rs 100 → Rs 80 (20% off) → Rs 72 (10% of Rs 80 off) = 28% total savings.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Watch Out for &quot;Fake Discounts&quot;</h3>
              <p className="text-sm text-yellow-700">
                Some retailers inflate original prices before sales to make discounts seem larger.
                Track prices over time using price history tools, and compare across multiple stores
                to ensure you&apos;re getting a genuine deal.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do I calculate a 20% discount?</h3>
              <p className="text-gray-600">
                Multiply the original price by 0.20 to find the discount amount, then subtract from the original.
                Or multiply by 0.80 to get the sale price directly. Example: 20% off Rs 500 = Rs 500 × 0.80 = Rs 400.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What&apos;s better: 2 for 1 or 50% off?</h3>
              <p className="text-gray-600">
                They&apos;re the same when buying even quantities! 2 for 1 means you pay for 1 and get 2,
                which is 50% off the total. However, 50% off is better for odd quantities (you can&apos;t buy
                1.5 items in a 2-for-1 deal).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do I find the original price from a sale price?</h3>
              <p className="text-gray-600">
                Divide the sale price by (1 - discount percentage/100). Example: If something costs Rs 75
                after 25% off, the original was Rs 75 ÷ 0.75 = Rs 100.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Is 3 for 2 the same as 33% off?</h3>
              <p className="text-gray-600">
                Yes, when buying in multiples of 3! You pay for 2 items and get 3, so you save 1 out of 3,
                which is 33.33% off. For non-multiples, the effective discount is less.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Which is better: Rs 100 off or 10% off?</h3>
              <p className="text-gray-600">
                It depends on the price! Rs 100 off is better if the original price is less than Rs 1000.
                10% off is better if the price is more than Rs 1000. At exactly Rs 1000, they&apos;re equal.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Does tax apply before or after discount?</h3>
              <p className="text-gray-600">
                Usually, discounts are applied first, then tax is calculated on the discounted price.
                This means you save on both the product and the tax. However, policies vary by region.
              </p>
            </div>
          </div>
        </div>

        {/* Related Calculators */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-lg border border-purple-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/calculators/percent-off-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Percent Off Calculator</h3>
              <p className="text-sm text-gray-600">Simple percentage discount with stackable options</p>
            </Link>
            <Link
              href="/calculators/percentage-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate any percentage with step-by-step solutions</p>
            </Link>
            <Link
              href="/calculators/percentage-change-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Percentage Change Calculator</h3>
              <p className="text-sm text-gray-600">Calculate increase or decrease between values</p>
            </Link>
            <Link
              href="/calculators/margin-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Margin Calculator</h3>
              <p className="text-sm text-gray-600">Calculate profit margins and markups</p>
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
                  Our tutors can help you master percentages, discounts, and all math concepts.
                </p>
              </div>
            </div>
            <Link
              href="/book-demo-class"
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
            "name": "Discount Calculator",
            "description": "Calculate discounts with 10 types: % off, 2 for 1, 3 for 2, fixed amount, double/triple discounts. Find final price and savings instantly.",
            "url": "https://www.thetutorbridge.com/calculators/discount-calculator",
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
                "name": "How do I calculate a 20% discount?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Multiply the original price by 0.20 to find the discount amount, then subtract from the original. Or multiply by 0.80 to get the sale price directly."
                }
              },
              {
                "@type": "Question",
                "name": "What's better: 2 for 1 or 50% off?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "They're the same when buying even quantities. 2 for 1 means you pay for 1 and get 2, which is 50% off the total. However, 50% off is better for odd quantities."
                }
              },
              {
                "@type": "Question",
                "name": "Is 3 for 2 the same as 33% off?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, when buying in multiples of 3. You pay for 2 items and get 3, so you save 1 out of 3, which is 33.33% off."
                }
              },
              {
                "@type": "Question",
                "name": "Which is better: Rs 100 off or 10% off?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It depends on the price. Rs 100 off is better if the original price is less than Rs 1000. 10% off is better if the price is more than Rs 1000."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
