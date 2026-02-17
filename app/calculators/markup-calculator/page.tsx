'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { Calculator, Home, TrendingUp, BookOpen, ArrowRight, DollarSign, Percent, BarChart3, Tag, ShoppingCart, Store, Building2, Package } from 'lucide-react';

type CalculationMode = 'costAndMarkup' | 'costAndPrice' | 'markupAndPrice' | 'marginToMarkup';

interface CalculationResult {
  cost: number;
  sellingPrice: number;
  markup: number;
  margin: number;
  profit: number;
  mode: CalculationMode;
}

export default function MarkupCalculator() {
  const [currency, setCurrency] = useState('$');
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('costAndMarkup');
  const [cost, setCost] = useState('50.00');
  const [sellingPrice, setSellingPrice] = useState('');
  const [markupPercent, setMarkupPercent] = useState('100');
  const [marginPercent, setMarginPercent] = useState('');
  const [decimalPlaces, setDecimalPlaces] = useState('2');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateMarkup = () => {
    const decimals = parseInt(decimalPlaces);

    if (calculationMode === 'costAndMarkup') {
      const costValue = parseFloat(cost) || 0;
      const markupValue = parseFloat(markupPercent) || 0;

      if (costValue <= 0) {
        alert('Please enter a valid cost greater than zero');
        return;
      }

      const profit = costValue * (markupValue / 100);
      const sellingPriceCalc = costValue + profit;
      const marginCalc = (profit / sellingPriceCalc) * 100;

      setResult({
        cost: costValue,
        sellingPrice: sellingPriceCalc,
        markup: markupValue,
        margin: marginCalc,
        profit: profit,
        mode: 'costAndMarkup',
      });
    } else if (calculationMode === 'costAndPrice') {
      const costValue = parseFloat(cost) || 0;
      const priceValue = parseFloat(sellingPrice) || 0;

      if (costValue <= 0) {
        alert('Please enter a valid cost greater than zero');
        return;
      }
      if (priceValue < costValue) {
        alert('Selling price should be greater than or equal to cost');
        return;
      }

      const profit = priceValue - costValue;
      const markupCalc = (profit / costValue) * 100;
      const marginCalc = priceValue > 0 ? (profit / priceValue) * 100 : 0;

      setResult({
        cost: costValue,
        sellingPrice: priceValue,
        markup: markupCalc,
        margin: marginCalc,
        profit: profit,
        mode: 'costAndPrice',
      });
    } else if (calculationMode === 'markupAndPrice') {
      const markupValue = parseFloat(markupPercent) || 0;
      const priceValue = parseFloat(sellingPrice) || 0;

      if (priceValue <= 0) {
        alert('Please enter a valid selling price greater than zero');
        return;
      }

      const costCalc = priceValue / (1 + markupValue / 100);
      const profit = priceValue - costCalc;
      const marginCalc = (profit / priceValue) * 100;

      setResult({
        cost: costCalc,
        sellingPrice: priceValue,
        markup: markupValue,
        margin: marginCalc,
        profit: profit,
        mode: 'markupAndPrice',
      });
    } else if (calculationMode === 'marginToMarkup') {
      const marginValue = parseFloat(marginPercent) || 0;

      if (marginValue >= 100) {
        alert('Margin must be less than 100%');
        return;
      }

      const markupCalc = (marginValue / (100 - marginValue)) * 100;
      const costValue = parseFloat(cost) || 100;
      const profit = costValue * (markupCalc / 100);
      const priceCalc = costValue + profit;

      setResult({
        cost: costValue,
        sellingPrice: priceCalc,
        markup: markupCalc,
        margin: marginValue,
        profit: profit,
        mode: 'marginToMarkup',
      });
    }
  };

  const handleClear = () => {
    setCost('');
    setSellingPrice('');
    setMarkupPercent('');
    setMarginPercent('');
    setResult(null);
  };

  const renderFraction = (numerator: string, denominator: string) => (
    <span className="inline-flex flex-col items-center mx-1">
      <span className="px-2 font-semibold text-base sm:text-lg">{numerator}</span>
      <span className="w-full border-t-2 border-gray-900"></span>
      <span className="px-2 font-semibold text-base sm:text-lg">{denominator}</span>
    </span>
  );

  const decimals = parseInt(decimalPlaces);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is a good markup percentage?","acceptedAnswer":{"@type":"Answer","text":"A \'good\' markup depends on your industry, competition, and overhead costs. Retail typically uses 50-100% (keystone), while restaurants may use 200-400%. Calculate your break-even point first, then add desired profit margin. Use our calculator to experiment with different markups."}},{"@type":"Question","name":"What is keystone markup?","acceptedAnswer":{"@type":"Answer","text":"Keystone markup is a 100% markup, meaning you double the cost to get the selling price. This is equivalent to a 50% profit margin. It\'s a traditional retail pricing method that\'s simple to calculate and widely used as a baseline."}},{"@type":"Question","name":"How do I convert markup to margin?","acceptedAnswer":{"@type":"Answer","text":"Use the formula: Margin = Markup ÷ (1 + Markup). For example, a 100% markup (1.0) converts to: 1.0 ÷ (1 + 1.0) = 1.0 ÷ 2.0 = 0.50 or 50% margin. You can also use our calculator\'s margin-to-markup converter."}},{"@type":"Question","name":"Can markup be over 100%?","acceptedAnswer":{"@type":"Answer","text":"Yes! Markup can be any positive percentage. A 200% markup means you add twice the cost to the selling price (tripling the price). Restaurants, jewelry stores, and luxury goods often use markups well over 100%. However, profit margin can never exceed 100%."}},{"@type":"Question","name":"How do I calculate the selling price from markup?","acceptedAnswer":{"@type":"Answer","text":"Use the formula: Selling Price = Cost × (1 + Markup ÷ 100). For a $50 product with 60% markup: $50 × 1.60 = $80. Alternatively, multiply the cost by the markup multiplier (60% markup = 1.60 multiplier)."}},{"@type":"Question","name":"Should I use markup or margin for pricing?","acceptedAnswer":{"@type":"Answer","text":"Use markup for setting prices (it\'s easier to calculate from cost) and margin for analyzing profitability (it shows what portion of revenue is profit). Most retail operations work with markup daily, while financial analysis uses margin. Both measure the same profit differently."}},{"@type":"Question","name":"How does markup affect profit?","acceptedAnswer":{"@type":"Answer","text":"Higher markup directly increases profit per unit, but may reduce sales volume due to higher prices. The optimal markup balances maximum profit with competitive pricing. Test different markups to find your price elasticity point."}},{"@type":"Question","name":"What markup do I need for a specific margin?","acceptedAnswer":{"@type":"Answer","text":"Use the formula: Markup = Margin ÷ (1 − Margin). For a 40% margin: 0.40 ÷ (1 − 0.40) = 0.40 ÷ 0.60 = 0.667 or 66.67% markup. Common conversions: 25% margin = 33.33% markup, 33.33% margin = 50% markup, 50% margin = 100% markup."}}]}' }}
      />
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-emerald-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-emerald-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Markup Calculator</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 mt-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl mb-6 shadow-lg">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Markup Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate markup percentage, selling price, and profit with step-by-step mathematical solutions. Convert between markup and margin instantly.
          </p>
        </div>

        {/* Calculator Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white text-center py-4 rounded-xl mb-6">
              <h2 className="text-2xl font-bold">Markup Calculator</h2>
            </div>

            {/* Calculation Mode Selector */}
            <div className="mb-6">
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                What would you like to calculate?
              </Label>
              <Select value={calculationMode} onValueChange={(v) => setCalculationMode(v as CalculationMode)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="costAndMarkup">Calculate Selling Price (from Cost & Markup %)</SelectItem>
                  <SelectItem value="costAndPrice">Calculate Markup % (from Cost & Selling Price)</SelectItem>
                  <SelectItem value="markupAndPrice">Calculate Cost (from Markup % & Selling Price)</SelectItem>
                  <SelectItem value="marginToMarkup">Convert Margin to Markup</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Currency Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-end gap-2">
                <Label htmlFor="currency" className="text-sm italic text-gray-600">
                  currency
                </Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$">$</SelectItem>
                    <SelectItem value="€">€</SelectItem>
                    <SelectItem value="£">£</SelectItem>
                    <SelectItem value="¥">¥</SelectItem>
                    <SelectItem value="₹">₹</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dynamic Input Fields Based on Mode */}
            <div className="space-y-4 mb-6">
              {/* Cost Input - shown for costAndMarkup, costAndPrice, marginToMarkup */}
              {(calculationMode === 'costAndMarkup' || calculationMode === 'costAndPrice' || calculationMode === 'marginToMarkup') && (
                <div className="flex items-center gap-4">
                  <Label htmlFor="cost" className="w-36 text-right font-semibold">
                    Cost
                  </Label>
                  <span className="text-2xl font-bold">{currency}</span>
                  <Input
                    id="cost"
                    type="number"
                    step="0.01"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="flex-1 text-lg py-5"
                    placeholder="0.00"
                  />
                </div>
              )}

              {/* Markup Percent Input - shown for costAndMarkup, markupAndPrice */}
              {(calculationMode === 'costAndMarkup' || calculationMode === 'markupAndPrice') && (
                <div className="flex items-center gap-4">
                  <Label htmlFor="markupPercent" className="w-36 text-right font-semibold">
                    Markup %
                  </Label>
                  <span className="text-2xl font-bold">%</span>
                  <Input
                    id="markupPercent"
                    type="number"
                    step="0.01"
                    value={markupPercent}
                    onChange={(e) => setMarkupPercent(e.target.value)}
                    className="flex-1 text-lg py-5"
                    placeholder="0"
                  />
                </div>
              )}

              {/* Selling Price Input - shown for costAndPrice, markupAndPrice */}
              {(calculationMode === 'costAndPrice' || calculationMode === 'markupAndPrice') && (
                <div className="flex items-center gap-4">
                  <Label htmlFor="sellingPrice" className="w-36 text-right font-semibold">
                    Selling Price
                  </Label>
                  <span className="text-2xl font-bold">{currency}</span>
                  <Input
                    id="sellingPrice"
                    type="number"
                    step="0.01"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    className="flex-1 text-lg py-5"
                    placeholder="0.00"
                  />
                </div>
              )}

              {/* Margin Input - shown for marginToMarkup */}
              {calculationMode === 'marginToMarkup' && (
                <div className="flex items-center gap-4">
                  <Label htmlFor="marginPercent" className="w-36 text-right font-semibold">
                    Margin %
                  </Label>
                  <span className="text-2xl font-bold">%</span>
                  <Input
                    id="marginPercent"
                    type="number"
                    step="0.01"
                    value={marginPercent}
                    onChange={(e) => setMarginPercent(e.target.value)}
                    className="flex-1 text-lg py-5"
                    placeholder="0"
                  />
                </div>
              )}
            </div>

            {/* Decimal Places */}
            <div className="mb-6">
              <div className="flex items-center justify-start gap-3">
                <Label htmlFor="decimalPlaces" className="text-sm italic text-gray-600">
                  decimal places:
                </Label>
                <Select value={decimalPlaces} onValueChange={setDecimalPlaces}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                onClick={handleClear}
                variant="outline"
                className="flex-1 py-6 text-lg font-semibold border-2 hover:bg-gray-100"
              >
                Clear
              </Button>
              <Button
                onClick={calculateMarkup}
                className="flex-1 py-6 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
              >
                Calculate
              </Button>
            </div>

            {/* Answer Section */}
            {result && (
              <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50 mb-8">
                <h3 className="text-xl font-bold mb-6">Answer:</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-emerald-200">
                    <div className="text-sm text-gray-500 mb-1">Cost</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {currency} {result.cost.toFixed(decimals)}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-emerald-200">
                    <div className="text-sm text-gray-500 mb-1">Selling Price</div>
                    <div className="text-2xl font-bold text-emerald-700">
                      {currency} {result.sellingPrice.toFixed(decimals)}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-emerald-200">
                    <div className="text-sm text-gray-500 mb-1">Markup</div>
                    <div className="text-2xl font-bold text-teal-700">
                      {result.markup.toFixed(decimals)}%
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-emerald-200">
                    <div className="text-sm text-gray-500 mb-1">Margin</div>
                    <div className="text-2xl font-bold text-blue-700">
                      {result.margin.toFixed(decimals)}%
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-lg sm:col-span-2">
                    <div className="text-sm text-emerald-100 mb-1">Profit</div>
                    <div className="text-3xl font-bold text-white">
                      {currency} {result.profit.toFixed(decimals)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step-by-Step Solution */}
            {result && (
              <div className="border-2 border-gray-300 rounded-lg p-6 bg-white">
                <h3 className="text-2xl font-bold mb-6 text-center">Step-by-Step Solution</h3>

                <div className="space-y-8">
                  {/* Mode: Cost and Markup */}
                  {result.mode === 'costAndMarkup' && (
                    <>
                      {/* Selling Price Calculation */}
                      <div className="border-b pb-6">
                        <h4 className="text-lg font-bold text-emerald-700 mb-4">Calculating Selling Price</h4>
                        <div className="space-y-4">
                          <div className="text-center text-lg">
                            <span className="font-semibold">Formula:</span> Selling Price = Cost × (1 + Markup ÷ 100)
                          </div>
                          <div className="flex items-center justify-center gap-2 text-lg flex-wrap">
                            <span>= {result.cost.toFixed(2)} × (1 + </span>
                            {renderFraction(result.markup.toFixed(2), '100')}
                            <span>)</span>
                          </div>
                          <div className="text-center text-lg">
                            = {result.cost.toFixed(2)} × (1 + {(result.markup / 100).toFixed(4)})
                          </div>
                          <div className="text-center text-lg">
                            = {result.cost.toFixed(2)} × {(1 + result.markup / 100).toFixed(4)}
                          </div>
                          <div className="text-center text-2xl font-bold text-emerald-700">
                            Selling Price = {currency}{result.sellingPrice.toFixed(decimals)}
                          </div>
                        </div>
                      </div>

                      {/* Profit Calculation */}
                      <div className="border-b pb-6">
                        <h4 className="text-lg font-bold text-emerald-700 mb-4">Calculating Profit</h4>
                        <div className="space-y-4">
                          <div className="text-center text-lg">
                            <span className="font-semibold">Formula:</span> Profit = Selling Price − Cost
                          </div>
                          <div className="text-center text-lg">
                            = {result.sellingPrice.toFixed(2)} − {result.cost.toFixed(2)}
                          </div>
                          <div className="text-center text-2xl font-bold text-emerald-700">
                            Profit = {currency}{result.profit.toFixed(decimals)}
                          </div>
                        </div>
                      </div>

                      {/* Margin Calculation */}
                      <div>
                        <h4 className="text-lg font-bold text-emerald-700 mb-4">Converting to Margin</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-2 text-lg flex-wrap">
                            <span><span className="font-semibold">Formula:</span> Margin = </span>
                            {renderFraction('Profit', 'Selling Price')}
                            <span> × 100</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-lg flex-wrap">
                            <span>= </span>
                            {renderFraction(result.profit.toFixed(2), result.sellingPrice.toFixed(2))}
                            <span> × 100</span>
                          </div>
                          <div className="text-center text-lg">
                            = {(result.profit / result.sellingPrice).toFixed(4)} × 100
                          </div>
                          <div className="text-center text-2xl font-bold text-emerald-700">
                            Margin = {result.margin.toFixed(decimals)}%
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Mode: Cost and Price */}
                  {result.mode === 'costAndPrice' && (
                    <>
                      {/* Profit Calculation */}
                      <div className="border-b pb-6">
                        <h4 className="text-lg font-bold text-emerald-700 mb-4">Step 1: Calculate Profit</h4>
                        <div className="space-y-4">
                          <div className="text-center text-lg">
                            <span className="font-semibold">Formula:</span> Profit = Selling Price − Cost
                          </div>
                          <div className="text-center text-lg">
                            = {result.sellingPrice.toFixed(2)} − {result.cost.toFixed(2)}
                          </div>
                          <div className="text-center text-2xl font-bold text-emerald-700">
                            Profit = {currency}{result.profit.toFixed(decimals)}
                          </div>
                        </div>
                      </div>

                      {/* Markup Calculation */}
                      <div className="border-b pb-6">
                        <h4 className="text-lg font-bold text-emerald-700 mb-4">Step 2: Calculate Markup Percentage</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-2 text-lg flex-wrap">
                            <span><span className="font-semibold">Formula:</span> Markup = </span>
                            {renderFraction('Profit', 'Cost')}
                            <span> × 100</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-lg flex-wrap">
                            <span>= </span>
                            {renderFraction(result.profit.toFixed(2), result.cost.toFixed(2))}
                            <span> × 100</span>
                          </div>
                          <div className="text-center text-lg">
                            = {(result.profit / result.cost).toFixed(4)} × 100
                          </div>
                          <div className="text-center text-2xl font-bold text-emerald-700">
                            Markup = {result.markup.toFixed(decimals)}%
                          </div>
                        </div>
                      </div>

                      {/* Margin Calculation */}
                      <div>
                        <h4 className="text-lg font-bold text-emerald-700 mb-4">Step 3: Calculate Margin</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-2 text-lg flex-wrap">
                            <span><span className="font-semibold">Formula:</span> Margin = </span>
                            {renderFraction('Profit', 'Selling Price')}
                            <span> × 100</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-lg flex-wrap">
                            <span>= </span>
                            {renderFraction(result.profit.toFixed(2), result.sellingPrice.toFixed(2))}
                            <span> × 100</span>
                          </div>
                          <div className="text-center text-lg">
                            = {(result.profit / result.sellingPrice).toFixed(4)} × 100
                          </div>
                          <div className="text-center text-2xl font-bold text-emerald-700">
                            Margin = {result.margin.toFixed(decimals)}%
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Mode: Markup and Price */}
                  {result.mode === 'markupAndPrice' && (
                    <>
                      {/* Cost Calculation */}
                      <div className="border-b pb-6">
                        <h4 className="text-lg font-bold text-emerald-700 mb-4">Step 1: Calculate Cost</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-2 text-lg flex-wrap">
                            <span><span className="font-semibold">Formula:</span> Cost = </span>
                            {renderFraction('Selling Price', '1 + (Markup ÷ 100)')}
                          </div>
                          <div className="flex items-center justify-center gap-2 text-lg flex-wrap">
                            <span>= </span>
                            {renderFraction(result.sellingPrice.toFixed(2), `1 + (${result.markup.toFixed(2)} ÷ 100)`)}
                          </div>
                          <div className="flex items-center justify-center gap-2 text-lg flex-wrap">
                            <span>= </span>
                            {renderFraction(result.sellingPrice.toFixed(2), (1 + result.markup / 100).toFixed(4))}
                          </div>
                          <div className="text-center text-2xl font-bold text-emerald-700">
                            Cost = {currency}{result.cost.toFixed(decimals)}
                          </div>
                        </div>
                      </div>

                      {/* Profit Calculation */}
                      <div className="border-b pb-6">
                        <h4 className="text-lg font-bold text-emerald-700 mb-4">Step 2: Calculate Profit</h4>
                        <div className="space-y-4">
                          <div className="text-center text-lg">
                            <span className="font-semibold">Formula:</span> Profit = Selling Price − Cost
                          </div>
                          <div className="text-center text-lg">
                            = {result.sellingPrice.toFixed(2)} − {result.cost.toFixed(2)}
                          </div>
                          <div className="text-center text-2xl font-bold text-emerald-700">
                            Profit = {currency}{result.profit.toFixed(decimals)}
                          </div>
                        </div>
                      </div>

                      {/* Margin Calculation */}
                      <div>
                        <h4 className="text-lg font-bold text-emerald-700 mb-4">Step 3: Calculate Margin</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-2 text-lg flex-wrap">
                            <span><span className="font-semibold">Formula:</span> Margin = </span>
                            {renderFraction('Profit', 'Selling Price')}
                            <span> × 100</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-lg flex-wrap">
                            <span>= </span>
                            {renderFraction(result.profit.toFixed(2), result.sellingPrice.toFixed(2))}
                            <span> × 100</span>
                          </div>
                          <div className="text-center text-2xl font-bold text-emerald-700">
                            Margin = {result.margin.toFixed(decimals)}%
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Mode: Margin to Markup */}
                  {result.mode === 'marginToMarkup' && (
                    <>
                      {/* Markup Calculation */}
                      <div className="border-b pb-6">
                        <h4 className="text-lg font-bold text-emerald-700 mb-4">Converting Margin to Markup</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-2 text-lg flex-wrap">
                            <span><span className="font-semibold">Formula:</span> Markup = </span>
                            {renderFraction('Margin', '100 − Margin')}
                            <span> × 100</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-lg flex-wrap">
                            <span>= </span>
                            {renderFraction(result.margin.toFixed(2), `100 − ${result.margin.toFixed(2)}`)}
                            <span> × 100</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-lg flex-wrap">
                            <span>= </span>
                            {renderFraction(result.margin.toFixed(2), (100 - result.margin).toFixed(2))}
                            <span> × 100</span>
                          </div>
                          <div className="text-center text-lg">
                            = {(result.margin / (100 - result.margin)).toFixed(4)} × 100
                          </div>
                          <div className="text-center text-2xl font-bold text-emerald-700">
                            Markup = {result.markup.toFixed(decimals)}%
                          </div>
                        </div>
                      </div>

                      {/* Example with cost */}
                      <div>
                        <h4 className="text-lg font-bold text-emerald-700 mb-4">Example Calculation (using Cost = {currency}{result.cost.toFixed(2)})</h4>
                        <div className="space-y-4">
                          <div className="text-center text-lg">
                            Selling Price = Cost × (1 + Markup ÷ 100)
                          </div>
                          <div className="text-center text-lg">
                            = {result.cost.toFixed(2)} × (1 + {(result.markup / 100).toFixed(4)})
                          </div>
                          <div className="text-center text-lg">
                            = {result.cost.toFixed(2)} × {(1 + result.markup / 100).toFixed(4)}
                          </div>
                          <div className="text-center text-2xl font-bold text-emerald-700">
                            Selling Price = {currency}{result.sellingPrice.toFixed(decimals)}
                          </div>
                          <div className="text-center text-lg mt-4">
                            Profit = {result.sellingPrice.toFixed(2)} − {result.cost.toFixed(2)} = {currency}{result.profit.toFixed(decimals)}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Markup vs Margin Quick Reference */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Markup vs Margin Quick Reference</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-center">
                <thead>
                  <tr className="border-b border-emerald-400">
                    <th className="py-3 px-4">Margin</th>
                    <th className="py-3 px-4">Markup</th>
                    <th className="py-3 px-4">Multiplier</th>
                  </tr>
                </thead>
                <tbody className="text-emerald-50">
                  <tr className="border-b border-emerald-500/30">
                    <td className="py-3 px-4">10%</td>
                    <td className="py-3 px-4">11.11%</td>
                    <td className="py-3 px-4">1.111</td>
                  </tr>
                  <tr className="border-b border-emerald-500/30">
                    <td className="py-3 px-4">20%</td>
                    <td className="py-3 px-4">25%</td>
                    <td className="py-3 px-4">1.25</td>
                  </tr>
                  <tr className="border-b border-emerald-500/30">
                    <td className="py-3 px-4">25%</td>
                    <td className="py-3 px-4">33.33%</td>
                    <td className="py-3 px-4">1.333</td>
                  </tr>
                  <tr className="border-b border-emerald-500/30">
                    <td className="py-3 px-4">30%</td>
                    <td className="py-3 px-4">42.86%</td>
                    <td className="py-3 px-4">1.429</td>
                  </tr>
                  <tr className="border-b border-emerald-500/30">
                    <td className="py-3 px-4">33.33%</td>
                    <td className="py-3 px-4">50%</td>
                    <td className="py-3 px-4">1.50</td>
                  </tr>
                  <tr className="border-b border-emerald-500/30">
                    <td className="py-3 px-4">40%</td>
                    <td className="py-3 px-4">66.67%</td>
                    <td className="py-3 px-4">1.667</td>
                  </tr>
                  <tr className="border-b border-emerald-500/30">
                    <td className="py-3 px-4">50%</td>
                    <td className="py-3 px-4 font-bold">100% (Keystone)</td>
                    <td className="py-3 px-4">2.00</td>
                  </tr>
                  <tr className="border-b border-emerald-500/30">
                    <td className="py-3 px-4">60%</td>
                    <td className="py-3 px-4">150%</td>
                    <td className="py-3 px-4">2.50</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">75%</td>
                    <td className="py-3 px-4">300%</td>
                    <td className="py-3 px-4">4.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-emerald-100 mt-4 text-center">
              Multiplier = (Cost × Multiplier) = Selling Price
            </p>
          </div>
        </div>

        {/* Educational Content */}
        <div className="max-w-4xl mx-auto space-y-8 mb-12">
          {/* What is Markup */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Tag className="w-8 h-8 text-emerald-600" />
              What is Markup?
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                <strong>Markup</strong> is the amount added to the cost of a product or service to determine its selling price. Expressed as a percentage, markup represents how much profit you add relative to your cost. It is one of the most fundamental concepts in business pricing and retail mathematics.
              </p>
              <p>
                The <strong>markup formula</strong> is:
              </p>
              <div className="bg-emerald-50 p-6 rounded-xl my-4">
                <div className="flex items-center justify-center gap-2 text-xl flex-wrap">
                  <span className="font-bold">Markup % = </span>
                  <span className="inline-flex flex-col items-center mx-2">
                    <span className="px-3 font-semibold">Selling Price − Cost</span>
                    <span className="w-full border-t-2 border-emerald-700"></span>
                    <span className="px-3 font-semibold">Cost</span>
                  </span>
                  <span className="font-bold"> × 100</span>
                </div>
              </div>
              <p>
                For example, if you purchase a product for $50 (cost) and sell it for $100 (selling price), your markup is:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg my-3">
                <p className="font-mono">Markup = ($100 − $50) ÷ $50 × 100 = $50 ÷ $50 × 100 = <strong>100%</strong></p>
              </div>
              <p>
                This 100% markup is also known as <strong>"keystone markup"</strong> in retail, meaning you double the cost to get the selling price. This is a common pricing strategy in many retail businesses.
              </p>
            </div>
          </section>

          {/* Markup vs Margin */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-emerald-600" />
              Markup vs. Margin: The Critical Difference
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                While <strong>markup</strong> and <strong>margin</strong> both measure profitability, they calculate it differently and should never be confused. Using the wrong metric can lead to significant pricing errors.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-emerald-50 p-6 rounded-xl border-2 border-emerald-200">
                  <h3 className="text-xl font-bold text-emerald-700 mb-3">Markup</h3>
                  <p className="text-sm text-gray-600 mb-3">Percentage added <strong>to cost</strong></p>
                  <div className="flex items-center justify-center gap-2 text-lg">
                    <span className="inline-flex flex-col items-center">
                      <span className="px-2 font-semibold text-sm">Profit</span>
                      <span className="w-full border-t-2 border-emerald-700"></span>
                      <span className="px-2 font-semibold text-sm">Cost</span>
                    </span>
                    <span> × 100</span>
                  </div>
                  <p className="text-sm text-emerald-700 mt-3 font-semibold">Can exceed 100%</p>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">Margin</h3>
                  <p className="text-sm text-gray-600 mb-3">Percentage of <strong>selling price</strong></p>
                  <div className="flex items-center justify-center gap-2 text-lg">
                    <span className="inline-flex flex-col items-center">
                      <span className="px-2 font-semibold text-sm">Profit</span>
                      <span className="w-full border-t-2 border-blue-700"></span>
                      <span className="px-2 font-semibold text-sm">Selling Price</span>
                    </span>
                    <span> × 100</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-3 font-semibold">Always less than 100%</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Example Comparison</h3>
              <p>
                Using the same example: Cost = $50, Selling Price = $100, Profit = $50
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Markup</strong> = $50 ÷ $50 × 100 = <span className="text-emerald-700 font-bold">100%</span> (profit relative to cost)</li>
                <li><strong>Margin</strong> = $50 ÷ $100 × 100 = <span className="text-blue-700 font-bold">50%</span> (profit relative to selling price)</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Conversion Formulas</h3>
              <div className="bg-gray-100 p-6 rounded-lg space-y-3">
                <p><strong>Markup to Margin:</strong></p>
                <p className="font-mono ml-4">Margin = Markup ÷ (1 + Markup)</p>
                <p className="mt-4"><strong>Margin to Markup:</strong></p>
                <p className="font-mono ml-4">Markup = Margin ÷ (1 − Margin)</p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Why This Matters</h3>
              <p>
                If you want a 50% margin but accidentally apply a 50% markup, you will undercharge significantly:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>50% markup on $50 cost = $75 selling price (only 33.33% margin)</li>
                <li>50% margin requires 100% markup = $100 selling price</li>
              </ul>
              <p className="text-red-600 font-semibold">
                This mistake costs you $25 per unit in lost profit!
              </p>
            </div>
          </section>

          {/* How to Calculate Markup */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Calculator className="w-8 h-8 text-emerald-600" />
              How to Calculate Markup: Step-by-Step Guide
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Method 1: Finding Markup Percentage</h3>
              <p>
                When you know both the cost and selling price, use this formula:
              </p>
              <div className="bg-emerald-50 p-6 rounded-xl my-4">
                <div className="flex items-center justify-center gap-2 text-lg flex-wrap">
                  <span className="font-bold">Markup % = </span>
                  <span className="inline-flex flex-col items-center mx-2">
                    <span className="px-3 font-semibold">Selling Price − Cost</span>
                    <span className="w-full border-t-2 border-emerald-700"></span>
                    <span className="px-3 font-semibold">Cost</span>
                  </span>
                  <span className="font-bold"> × 100</span>
                </div>
              </div>
              <p><strong>Example:</strong> A retailer buys t-shirts for $15 and sells them for $24.</p>
              <div className="bg-gray-100 p-4 rounded-lg my-3 space-y-2">
                <p className="font-mono">Markup = ($24 − $15) ÷ $15 × 100</p>
                <p className="font-mono">Markup = $9 ÷ $15 × 100</p>
                <p className="font-mono">Markup = 0.6 × 100 = <strong>60%</strong></p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Method 2: Finding Selling Price from Markup</h3>
              <p>
                When you know the cost and desired markup percentage:
              </p>
              <div className="bg-emerald-50 p-6 rounded-xl my-4 text-center text-lg">
                <p className="font-bold">Selling Price = Cost × (1 + Markup % ÷ 100)</p>
              </div>
              <p><strong>Example:</strong> A product costs $40 and you want a 75% markup.</p>
              <div className="bg-gray-100 p-4 rounded-lg my-3 space-y-2">
                <p className="font-mono">Selling Price = $40 × (1 + 75 ÷ 100)</p>
                <p className="font-mono">Selling Price = $40 × 1.75</p>
                <p className="font-mono">Selling Price = <strong>$70</strong></p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Method 3: Finding Cost from Selling Price and Markup</h3>
              <p>
                When you know the selling price and markup percentage:
              </p>
              <div className="bg-emerald-50 p-6 rounded-xl my-4">
                <div className="flex items-center justify-center gap-2 text-lg flex-wrap">
                  <span className="font-bold">Cost = </span>
                  <span className="inline-flex flex-col items-center mx-2">
                    <span className="px-3 font-semibold">Selling Price</span>
                    <span className="w-full border-t-2 border-emerald-700"></span>
                    <span className="px-3 font-semibold">1 + (Markup % ÷ 100)</span>
                  </span>
                </div>
              </div>
              <p><strong>Example:</strong> A product sells for $150 with a 50% markup. What was the cost?</p>
              <div className="bg-gray-100 p-4 rounded-lg my-3 space-y-2">
                <p className="font-mono">Cost = $150 ÷ (1 + 50 ÷ 100)</p>
                <p className="font-mono">Cost = $150 ÷ 1.5</p>
                <p className="font-mono">Cost = <strong>$100</strong></p>
              </div>
            </div>
          </section>

          {/* Markup Applications */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <ShoppingCart className="w-8 h-8 text-emerald-600" />
              Real-World Markup Applications
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-3 mb-4">
                  <Store className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-xl font-bold text-emerald-700">Retail</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Retailers typically use 50-100% markup (keystone pricing). Fashion retail often uses higher markups (100-300%) to cover returns, seasonality, and discounting.
                </p>
                <p className="text-sm text-emerald-600 font-semibold">
                  Common: 50% - 100% markup
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-blue-700">Wholesale</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Wholesalers operate on thinner markups (10-30%) but sell in larger volumes. They bridge manufacturers and retailers.
                </p>
                <p className="text-sm text-blue-600 font-semibold">
                  Common: 10% - 30% markup
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-purple-700">Manufacturing</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Manufacturers use markups ranging from 30-50% to cover production costs, R&D, and distribution while remaining competitive.
                </p>
                <p className="text-sm text-purple-600 font-semibold">
                  Common: 30% - 50% markup
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                  <h3 className="text-xl font-bold text-orange-700">E-commerce</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Online sellers can vary widely from 30-200% depending on competition, niche, and brand value. Lower overhead allows competitive pricing.
                </p>
                <p className="text-sm text-orange-600 font-semibold">
                  Common: 30% - 200% markup
                </p>
              </div>
            </div>
          </section>

          {/* Industry Markup Standards */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Percent className="w-8 h-8 text-emerald-600" />
              Standard Markup Percentages by Industry
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-emerald-600 text-white">
                    <th className="p-4 text-left">Industry</th>
                    <th className="p-4 text-center">Typical Markup</th>
                    <th className="p-4 text-center">Equivalent Margin</th>
                    <th className="p-4 text-center">Multiplier</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-semibold">Groceries</td>
                    <td className="p-4 text-center">5% - 15%</td>
                    <td className="p-4 text-center">4.8% - 13%</td>
                    <td className="p-4 text-center">1.05 - 1.15</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-semibold">Electronics</td>
                    <td className="p-4 text-center">20% - 50%</td>
                    <td className="p-4 text-center">17% - 33%</td>
                    <td className="p-4 text-center">1.20 - 1.50</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-semibold">Clothing</td>
                    <td className="p-4 text-center">100% - 300%</td>
                    <td className="p-4 text-center">50% - 75%</td>
                    <td className="p-4 text-center">2.00 - 4.00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-semibold">Restaurants</td>
                    <td className="p-4 text-center">200% - 400%</td>
                    <td className="p-4 text-center">67% - 80%</td>
                    <td className="p-4 text-center">3.00 - 5.00</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-semibold">Jewelry</td>
                    <td className="p-4 text-center">100% - 500%</td>
                    <td className="p-4 text-center">50% - 83%</td>
                    <td className="p-4 text-center">2.00 - 6.00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-semibold">Furniture</td>
                    <td className="p-4 text-center">80% - 150%</td>
                    <td className="p-4 text-center">44% - 60%</td>
                    <td className="p-4 text-center">1.80 - 2.50</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-semibold">Pharmaceuticals</td>
                    <td className="p-4 text-center">30% - 100%</td>
                    <td className="p-4 text-center">23% - 50%</td>
                    <td className="p-4 text-center">1.30 - 2.00</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Software/SaaS</td>
                    <td className="p-4 text-center">500% - 1000%+</td>
                    <td className="p-4 text-center">83% - 91%</td>
                    <td className="p-4 text-center">6.00 - 11.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Note: These are general industry averages. Actual markups vary based on brand positioning, competition, and market conditions.
            </p>
          </section>

          {/* Common Mistakes */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Markup Calculation Mistakes</h2>
            <div className="space-y-6">
              <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-700 mb-2">Mistake #1: Confusing Markup with Margin</h3>
                <p className="text-gray-700 mb-3">
                  The most common error is using margin when you mean markup, or vice versa.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-red-600"><strong>Wrong:</strong> "I need a 50% margin, so I'll markup by 50%"</p>
                  <p className="text-green-600 mt-2"><strong>Correct:</strong> "For a 50% margin, I need a 100% markup"</p>
                </div>
              </div>

              <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-500">
                <h3 className="text-xl font-bold text-amber-700 mb-2">Mistake #2: Not Including All Costs</h3>
                <p className="text-gray-700 mb-3">
                  Many businesses only consider product cost, ignoring shipping, handling, and overhead.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-amber-600"><strong>Tip:</strong> Use "landed cost" (product + shipping + handling + fees) as your base for markup calculations.</p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-blue-700 mb-2">Mistake #3: Using a Single Markup for All Products</h3>
                <p className="text-gray-700 mb-3">
                  Different products may require different markups based on competition, demand, and perceived value.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-blue-600"><strong>Tip:</strong> High-demand items can sustain higher markups; commodity items need competitive pricing.</p>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-purple-700 mb-2">Mistake #4: Forgetting to Adjust for Discounts</h3>
                <p className="text-gray-700 mb-3">
                  If you plan to offer sales or discounts, your initial markup must account for this.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-purple-600"><strong>Example:</strong> To maintain 30% margin after a 20% discount, you need approximately 87.5% initial markup.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Markup Formulas Summary */}
          <section className="bg-gradient-to-br from-gray-900 to-emerald-900 rounded-2xl shadow-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-6">Essential Markup Formulas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-emerald-300 mb-4">Basic Markup Formulas</h3>
                <div className="space-y-3 text-emerald-50">
                  <p><strong>Markup %</strong> = (Selling Price − Cost) ÷ Cost × 100</p>
                  <p><strong>Selling Price</strong> = Cost × (1 + Markup %)</p>
                  <p><strong>Cost</strong> = Selling Price ÷ (1 + Markup %)</p>
                  <p><strong>Profit</strong> = Selling Price − Cost</p>
                </div>
              </div>

              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-emerald-300 mb-4">Conversion Formulas</h3>
                <div className="space-y-3 text-emerald-50">
                  <p><strong>Markup to Margin:</strong></p>
                  <p className="ml-4">Margin = Markup ÷ (1 + Markup)</p>
                  <p><strong>Margin to Markup:</strong></p>
                  <p className="ml-4">Markup = Margin ÷ (1 − Margin)</p>
                </div>
              </div>

              <div className="bg-white/10 p-6 rounded-xl md:col-span-2">
                <h3 className="text-xl font-bold text-emerald-300 mb-4">Quick Multipliers</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-emerald-50">
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-2xl font-bold">×1.25</p>
                    <p className="text-sm">25% markup</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-2xl font-bold">×1.50</p>
                    <p className="text-sm">50% markup</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-2xl font-bold">×2.00</p>
                    <p className="text-sm">100% markup (Keystone)</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-2xl font-bold">×3.00</p>
                    <p className="text-sm">200% markup</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-emerald-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What is a good markup percentage?</h3>
                <p className="text-gray-700">
                  A "good" markup depends on your industry, competition, and overhead costs. Retail typically uses 50-100% (keystone), while restaurants may use 200-400%. Calculate your break-even point first, then add desired profit margin. Use our calculator to experiment with different markups.
                </p>
              </div>

              <div className="border-l-4 border-teal-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What is keystone markup?</h3>
                <p className="text-gray-700">
                  Keystone markup is a 100% markup, meaning you double the cost to get the selling price. This is equivalent to a 50% profit margin. It's a traditional retail pricing method that's simple to calculate and widely used as a baseline.
                </p>
              </div>

              <div className="border-l-4 border-emerald-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How do I convert markup to margin?</h3>
                <p className="text-gray-700">
                  Use the formula: Margin = Markup ÷ (1 + Markup). For example, a 100% markup (1.0) converts to: 1.0 ÷ (1 + 1.0) = 1.0 ÷ 2.0 = 0.50 or 50% margin. You can also use our calculator's margin-to-markup converter.
                </p>
              </div>

              <div className="border-l-4 border-teal-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Can markup be over 100%?</h3>
                <p className="text-gray-700">
                  Yes! Markup can be any positive percentage. A 200% markup means you add twice the cost to the selling price (tripling the price). Restaurants, jewelry stores, and luxury goods often use markups well over 100%. However, profit margin can never exceed 100%.
                </p>
              </div>

              <div className="border-l-4 border-emerald-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How do I calculate the selling price from markup?</h3>
                <p className="text-gray-700">
                  Use the formula: Selling Price = Cost × (1 + Markup ÷ 100). For a $50 product with 60% markup: $50 × 1.60 = $80. Alternatively, multiply the cost by the markup multiplier (60% markup = 1.60 multiplier).
                </p>
              </div>

              <div className="border-l-4 border-teal-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Should I use markup or margin for pricing?</h3>
                <p className="text-gray-700">
                  Use markup for setting prices (it's easier to calculate from cost) and margin for analyzing profitability (it shows what portion of revenue is profit). Most retail operations work with markup daily, while financial analysis uses margin. Both measure the same profit differently.
                </p>
              </div>

              <div className="border-l-4 border-emerald-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How does markup affect profit?</h3>
                <p className="text-gray-700">
                  Higher markup directly increases profit per unit, but may reduce sales volume due to higher prices. The optimal markup balances maximum profit with competitive pricing. Test different markups to find your price elasticity point.
                </p>
              </div>

              <div className="border-l-4 border-teal-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What markup do I need for a specific margin?</h3>
                <p className="text-gray-700">
                  Use the formula: Markup = Margin ÷ (1 − Margin). For a 40% margin: 0.40 ÷ (1 − 0.40) = 0.40 ÷ 0.60 = 0.667 or 66.67% markup. Common conversions: 25% margin = 33.33% markup, 33.33% margin = 50% markup, 50% margin = 100% markup.
                </p>
              </div>

              <div className="border-l-4 border-emerald-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How do I account for overhead in markup?</h3>
                <p className="text-gray-700">
                  Add all costs (product, shipping, handling, storage, overhead allocation) to get your "landed cost" or "true cost." Apply markup to this total cost, not just the product cost. This ensures your pricing covers all business expenses plus desired profit.
                </p>
              </div>

              <div className="border-l-4 border-teal-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What's the difference between gross and net markup?</h3>
                <p className="text-gray-700">
                  Gross markup is based only on direct product costs (cost of goods sold). Net markup factors in all costs including overhead, labor, and indirect expenses. Net markup is always lower than gross markup and gives a more accurate picture of true profitability.
                </p>
              </div>
            </div>
          </section>

          {/* Related Calculators */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Calculators</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/calculators/margin-calculator" className="block p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl hover:shadow-md transition-shadow border border-emerald-200">
                <h3 className="font-bold text-emerald-700 mb-2">Margin Calculator</h3>
                <p className="text-sm text-gray-600">Calculate profit margin from cost and revenue</p>
              </Link>
              <Link href="/calculators/profit-margin-calculator" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-md transition-shadow border border-green-200">
                <h3 className="font-bold text-green-700 mb-2">Profit Margin Calculator</h3>
                <p className="text-sm text-gray-600">Calculate gross, operating, and net profit margins</p>
              </Link>
              <Link href="/calculators/percentage-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-shadow border border-blue-200">
                <h3 className="font-bold text-blue-700 mb-2">Percentage Calculator</h3>
                <p className="text-sm text-gray-600">Calculate percentages and percent changes</p>
              </Link>
            </div>
          </section>

          {/* Book Your Session CTA */}
          <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-2xl shadow-2xl p-8 text-white text-center">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Need Help with Business Math or Pricing Calculations?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-blue-100 leading-relaxed">
              Our expert tutors can help you master markup, margin, and all business mathematics with personalized one-on-one sessions tailored to your learning style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
