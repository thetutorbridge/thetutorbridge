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
import { TrendingUp } from 'lucide-react';

interface CalculationResult {
  margin: number;
  markup: number;
  profit: number;
  cost: number;
  revenue: number;
}

export default function MarginCalculator() {
  const [currency, setCurrency] = useState('$');
  const [cost, setCost] = useState('5.00');
  const [revenue, setRevenue] = useState('50.00');
  const [decimalPlaces, setDecimalPlaces] = useState('2');
  const [includeTax, setIncludeTax] = useState(false);
  const [taxPercent, setTaxPercent] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateMargin = () => {
    const costValue = parseFloat(cost) || 0;
    const revenueValue = parseFloat(revenue) || 0;

    if (revenueValue === 0) {
      alert('Revenue cannot be zero');
      return;
    }

    // Calculate profit
    const profit = revenueValue - costValue;

    // Calculate margin: (Revenue - Cost) / Revenue × 100
    const margin = ((revenueValue - costValue) / revenueValue) * 100;

    // Calculate markup: (Revenue - Cost) / Cost × 100
    const markup = costValue !== 0 ? ((revenueValue - costValue) / costValue) * 100 : 0;

    setResult({
      margin,
      markup,
      profit,
      cost: costValue,
      revenue: revenueValue,
    });
  };

  const handleClear = () => {
    setCost('');
    setRevenue('');
    setTaxPercent('');
    setIncludeTax(false);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is a good profit margin?","acceptedAnswer":{"@type":"Answer","text":"A \'good\' profit margin varies by industry. Software companies often see margins of 60-80%, while grocery stores operate on 1-3% margins. Compare your margin to industry averages to assess performance. Generally, higher margins indicate better pricing power, lower costs, or both."}},{"@type":"Question","name":"How do I increase my profit margin?","acceptedAnswer":{"@type":"Answer","text":"Increase margins by: (1) raising prices without losing customers, (2) reducing costs through better suppliers or processes, (3) improving product mix by focusing on higher-margin items, (4) adding value to justify premium pricing, or (5) reducing waste and improving efficiency."}},{"@type":"Question","name":"Can margin be more than 100%?","acceptedAnswer":{"@type":"Answer","text":"No, profit margin cannot exceed 100% because profit (revenue minus cost) cannot be greater than revenue itself. If calculated correctly, margin will always fall between 0% and 100%. If you get over 100%, you\'re likely calculating markup instead of margin."}},{"@type":"Question","name":"What\'s the difference between gross margin and net margin?","acceptedAnswer":{"@type":"Answer","text":"Gross margin considers only direct costs (cost of goods sold), while net margin includes all expenses (operating costs, taxes, interest, etc.). Gross margin shows production efficiency, while net margin reveals overall business profitability. Net margin is always lower than gross margin."}},{"@type":"Question","name":"Should I use margin or markup for pricing?","acceptedAnswer":{"@type":"Answer","text":"Use markup for pricing decisions (it shows how much to add to cost) and margin for financial analysis (it shows profitability). Many retailers use markup to set prices, then track margin to measure performance. Both are useful for different purposes."}}]}' }}
      />
      <Navigation />

      <main className="container mx-auto px-4 py-8 mt-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl mb-6 shadow-lg">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Margin Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate profit margin, markup percentage, and profit with step-by-step mathematical solutions
          </p>
        </div>

        {/* Calculator Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="bg-gradient-to-r from-orange-700 to-red-700 text-white text-center py-4 rounded-xl mb-6">
              <h2 className="text-2xl font-bold">Margin Calculator</h2>
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

            {/* Input Fields */}
            <div className="space-y-4 mb-6">
              {/* Cost */}
              <div className="flex items-center gap-4">
                <Label htmlFor="cost" className="w-32 text-right font-semibold">
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

              {/* Revenue */}
              <div className="flex items-center gap-4">
                <Label htmlFor="revenue" className="w-32 text-right font-semibold">
                  Revenue
                </Label>
                <span className="text-2xl font-bold">{currency}</span>
                <Input
                  id="revenue"
                  type="number"
                  step="0.01"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  className="flex-1 text-lg py-5"
                  placeholder="0.00"
                />
              </div>
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

            {/* Tax Checkbox */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="checkbox"
                  id="includeTax"
                  checked={includeTax}
                  onChange={(e) => setIncludeTax(e.target.checked)}
                  className="w-5 h-5 text-orange-600 focus:ring-orange-500 rounded"
                />
                <Label htmlFor="includeTax" className="text-base font-medium italic cursor-pointer">
                  Calculate with tax, VAT or GST
                </Label>
              </div>

              {includeTax && (
                <div className="ml-8 space-y-2">
                  <div className="flex items-center gap-3">
                    <Label htmlFor="taxPercent" className="font-semibold">
                      Tax Percent: %
                    </Label>
                    <Input
                      id="taxPercent"
                      type="number"
                      step="0.01"
                      value={taxPercent}
                      onChange={(e) => setTaxPercent(e.target.value)}
                      className="w-40 text-lg py-5"
                      placeholder="0"
                    />
                  </div>
                  <p className="text-sm text-gray-500 italic">tax, VAT or GST</p>
                </div>
              )}
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
                onClick={calculateMargin}
                className="flex-1 py-6 text-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
              >
                Calculate
              </Button>
            </div>

            {/* Answer Section */}
            {result && (
              <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50 mb-8">
                <h3 className="text-xl font-bold mb-6">Answer:</h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-lg font-semibold">Margin:</span>
                    <span className="text-lg">{result.margin.toFixed(parseInt(decimalPlaces))}%</span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-lg font-semibold">Markup:</span>
                    <span className="text-lg">{result.markup.toFixed(parseInt(decimalPlaces))}%</span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-lg font-semibold">Profit:</span>
                    <span className="text-lg">{currency} {result.profit.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-lg font-semibold">Cost:</span>
                    <span className="text-lg">{currency} {result.cost.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-lg font-semibold">Revenue:</span>
                    <span className="text-lg">{currency} {result.revenue.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step-by-Step Solution */}
            {result && (
              <div className="border-2 border-gray-300 rounded-lg p-6 bg-white">
                <h3 className="text-2xl font-bold mb-6 text-center">Step-by-Step Solution</h3>

                <div className="space-y-8">
                  {/* Margin Calculation */}
                  <div className="border-b pb-6">
                    <div className="space-y-4">
                      {/* Formula */}
                      <div className="flex items-center justify-center gap-2 text-xl flex-wrap">
                        <span>Margin = </span>
                        <div className="inline-flex flex-col items-center mx-1">
                          <span className="px-3 font-semibold">Revenue − Cost</span>
                          <span className="w-full border-t-2 border-gray-900"></span>
                          <span className="px-3 font-semibold">Revenue</span>
                        </div>
                        <span> × 100</span>
                      </div>

                      {/* Step 1 */}
                      <div className="flex items-center justify-center gap-2 text-xl flex-wrap">
                        <span>= </span>
                        <div className="inline-flex flex-col items-center mx-1">
                          <span className="px-3 font-semibold">{result.revenue} − {result.cost}</span>
                          <span className="w-full border-t-2 border-gray-900"></span>
                          <span className="px-3 font-semibold">{result.revenue}</span>
                        </div>
                        <span> × 100</span>
                      </div>

                      {/* Step 2 */}
                      <div className="flex items-center justify-center gap-2 text-xl flex-wrap">
                        <span>= </span>
                        <div className="inline-flex flex-col items-center mx-1">
                          <span className="px-3 font-semibold">{result.profit.toFixed(2)}</span>
                          <span className="w-full border-t-2 border-gray-900"></span>
                          <span className="px-3 font-semibold">{result.revenue}</span>
                        </div>
                        <span> × 100</span>
                      </div>

                      {/* Step 3 */}
                      <div className="text-center text-xl">
                        = {(result.profit / result.revenue).toFixed(4)} × 100
                      </div>

                      {/* Final Answer */}
                      <div className="text-center text-2xl font-bold text-orange-700">
                        Margin = {result.margin.toFixed(parseInt(decimalPlaces))}%
                      </div>
                    </div>
                  </div>

                  {/* Markup Calculation */}
                  <div className="border-b pb-6">
                    <div className="space-y-4">
                      {/* Formula */}
                      <div className="flex items-center justify-center gap-2 text-xl flex-wrap">
                        <span>Markup = </span>
                        <div className="inline-flex flex-col items-center mx-1">
                          <span className="px-3 font-semibold">Revenue − Cost</span>
                          <span className="w-full border-t-2 border-gray-900"></span>
                          <span className="px-3 font-semibold">Cost</span>
                        </div>
                        <span> × 100</span>
                      </div>

                      {/* Step 1 */}
                      <div className="flex items-center justify-center gap-2 text-xl flex-wrap">
                        <span>= </span>
                        <div className="inline-flex flex-col items-center mx-1">
                          <span className="px-3 font-semibold">{result.revenue} − {result.cost}</span>
                          <span className="w-full border-t-2 border-gray-900"></span>
                          <span className="px-3 font-semibold">{result.cost}</span>
                        </div>
                        <span> × 100</span>
                      </div>

                      {/* Step 2 */}
                      <div className="flex items-center justify-center gap-2 text-xl flex-wrap">
                        <span>= </span>
                        <div className="inline-flex flex-col items-center mx-1">
                          <span className="px-3 font-semibold">{result.profit.toFixed(2)}</span>
                          <span className="w-full border-t-2 border-gray-900"></span>
                          <span className="px-3 font-semibold">{result.cost}</span>
                        </div>
                        <span> × 100</span>
                      </div>

                      {/* Step 3 */}
                      <div className="text-center text-xl">
                        = {(result.profit / result.cost).toFixed(2)} × 100
                      </div>

                      {/* Final Answer */}
                      <div className="text-center text-2xl font-bold text-orange-700">
                        Markup = {result.markup.toFixed(parseInt(decimalPlaces))}%
                      </div>
                    </div>
                  </div>

                  {/* Profit Calculation */}
                  <div>
                    <div className="space-y-4">
                      {/* Formula */}
                      <div className="text-center text-xl">
                        Profit = Revenue − Cost
                      </div>

                      {/* Step 1 */}
                      <div className="text-center text-xl">
                        = {result.revenue} − {result.cost}
                      </div>

                      {/* Final Answer */}
                      <div className="text-center text-2xl font-bold text-orange-700">
                        Profit = {result.profit.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="max-w-4xl mx-auto space-y-8 mb-12">
          {/* What is Margin */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Profit Margin?</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Profit margin is a key financial metric that measures how much profit a business makes for every dollar of revenue generated. Expressed as a percentage, it represents the portion of sales that translates into profit after all costs are deducted. Understanding profit margin is essential for business owners, investors, and financial analysts as it provides insight into a company's profitability, operational efficiency, and pricing strategy.
              </p>
              <p>
                The profit margin formula is straightforward: Profit Margin = (Revenue − Cost) ÷ Revenue × 100%. For example, if a product sells for $50 (revenue) and costs $5 to produce (cost), the profit is $45, and the profit margin is (45 ÷ 50) × 100% = 90%. This means that 90% of the selling price represents profit, while 10% covers the cost.
              </p>
              <p>
                Profit margins vary significantly across industries. Software and technology companies often have high profit margins (60-80%) because their products have low production costs once developed. Retail businesses typically have lower margins (2-10%) due to higher operational costs and competitive pricing. Understanding industry benchmarks helps businesses evaluate their performance relative to competitors.
              </p>
              <p>
                There are different types of profit margins used in financial analysis: gross profit margin (revenue minus cost of goods sold), operating profit margin (revenue minus operating expenses), and net profit margin (revenue minus all expenses including taxes and interest). Each provides different insights into business profitability and efficiency.
              </p>
            </div>
          </section>

          {/* Margin vs Markup */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Margin vs. Markup: Understanding the Difference</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Margin and markup are two distinct but related concepts that business owners often confuse. While both measure profitability, they use different bases for calculation and provide different perspectives on pricing and profit.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Profit Margin</h3>
              <p>
                Margin is calculated based on the selling price (revenue): Margin = (Revenue − Cost) ÷ Revenue × 100%. It tells you what percentage of your selling price is profit. For example, with a cost of $5 and revenue of $50, the margin is 90%, meaning 90% of the selling price is profit.
              </p>
              <p>
                Margin is always between 0% and 100% because you cannot have more profit than revenue. It's the preferred metric for financial analysis and comparing business performance because it directly relates to how much of each sales dollar becomes profit.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Markup</h3>
              <p>
                Markup is calculated based on cost: Markup = (Revenue − Cost) ÷ Cost × 100%. It tells you how much you're adding to the cost to determine the selling price. Using the same example ($5 cost, $50 revenue), the markup is 900%, meaning you're adding 9 times the cost as profit.
              </p>
              <p>
                Markup can exceed 100% and often does in retail and wholesale businesses. It's commonly used in pricing decisions because it directly shows how much you're adding to your costs to set prices.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Key Differences</h3>
              <div className="bg-gray-100 p-6 rounded-lg my-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left pb-3">Aspect</th>
                      <th className="text-left pb-3">Margin</th>
                      <th className="text-left pb-3">Markup</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2">Base</td>
                      <td className="py-2">Revenue</td>
                      <td className="py-2">Cost</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-2">Range</td>
                      <td className="py-2">0% to 100%</td>
                      <td className="py-2">0% to infinity</td>
                    </tr>
                    <tr>
                      <td className="py-2">Use</td>
                      <td className="py-2">Financial analysis</td>
                      <td className="py-2">Pricing decisions</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Conversion Between Margin and Markup</h3>
              <p>
                You can convert between margin and markup using these formulas:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Margin = Markup ÷ (1 + Markup)</li>
                <li>Markup = Margin ÷ (1 − Margin)</li>
              </ul>
              <p>
                For example, a 50% margin equals a 100% markup, while a 900% markup equals a 90% margin. Understanding both metrics helps you make better pricing and profitability decisions.
              </p>
            </div>
          </section>

          {/* How to Calculate Margin */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Calculate Profit Margin</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Calculating profit margin requires three simple steps. Let's work through an example where a product costs $5 to produce and sells for $50.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Step 1: Determine Your Cost and Revenue</h3>
              <p>
                First, identify your cost (how much you spend to produce or acquire the product) and revenue (how much you sell it for):
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cost = $5.00</li>
                <li>Revenue = $50.00</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Step 2: Calculate Profit</h3>
              <p>
                Subtract cost from revenue to find profit:
              </p>
              <div className="bg-blue-50 p-4 rounded-lg my-3">
                <p className="font-mono">Profit = Revenue − Cost</p>
                <p className="font-mono">Profit = $50.00 − $5.00 = $45.00</p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Step 3: Calculate Margin Percentage</h3>
              <p>
                Divide profit by revenue and multiply by 100 to get the margin percentage:
              </p>
              <div className="bg-green-50 p-4 rounded-lg my-3">
                <p className="font-mono">Margin = (Profit ÷ Revenue) × 100%</p>
                <p className="font-mono">Margin = ($45.00 ÷ $50.00) × 100%</p>
                <p className="font-mono">Margin = 0.9 × 100% = 90%</p>
              </div>

              <p className="mt-6">
                This 90% margin means that for every dollar of revenue, you keep $0.90 as profit after covering the $0.10 cost. High margins indicate strong pricing power and efficient operations, while low margins suggest competitive markets or high operational costs.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Common Margin Calculation Mistakes</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Confusing margin with markup:</strong> Remember, margin uses revenue as the denominator, while markup uses cost.
                </li>
                <li>
                  <strong>Forgetting to multiply by 100:</strong> Without multiplying by 100, you get a decimal (0.9) instead of a percentage (90%).
                </li>
                <li>
                  <strong>Using the wrong revenue figure:</strong> Ensure you're using the selling price (revenue), not the profit.
                </li>
                <li>
                  <strong>Not accounting for all costs:</strong> Include all direct and indirect costs for accurate margin calculations.
                </li>
              </ul>
            </div>
          </section>

          {/* Practical Applications */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Practical Applications of Margin Calculations</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Understanding and calculating margins is crucial across various business scenarios:
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Pricing Strategy</h3>
              <p>
                Margins help you set competitive yet profitable prices. If your target margin is 40% and your cost is $60, you can calculate the required selling price: Revenue = Cost ÷ (1 − Margin) = $60 ÷ (1 − 0.40) = $60 ÷ 0.60 = $100.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Product Profitability Analysis</h3>
              <p>
                Compare margins across different products to identify which are most profitable. Products with higher margins may deserve more marketing investment, while low-margin products might need repricing or discontinuation.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Business Valuation</h3>
              <p>
                Investors and buyers evaluate businesses based on profit margins. Higher margins often indicate stronger competitive positions, better management, and more sustainable profitability, leading to higher business valuations.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Financial Planning</h3>
              <p>
                Margins help forecast future profitability. If you know your target margin and expected costs, you can project revenue requirements and assess whether business goals are achievable.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Cost Control</h3>
              <p>
                Tracking margins over time reveals whether costs are rising faster than prices. Declining margins signal a need for cost reduction initiatives or price increases to maintain profitability.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-orange-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What is a good profit margin?</h3>
                <p className="text-gray-700">
                  A "good" profit margin varies by industry. Software companies often see margins of 60-80%, while grocery stores operate on 1-3% margins. Compare your margin to industry averages to assess performance. Generally, higher margins indicate better pricing power, lower costs, or both.
                </p>
              </div>

              <div className="border-l-4 border-red-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How do I increase my profit margin?</h3>
                <p className="text-gray-700">
                  Increase margins by: (1) raising prices without losing customers, (2) reducing costs through better suppliers or processes, (3) improving product mix by focusing on higher-margin items, (4) adding value to justify premium pricing, or (5) reducing waste and improving efficiency.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Can margin be more than 100%?</h3>
                <p className="text-gray-700">
                  No, profit margin cannot exceed 100% because profit (revenue minus cost) cannot be greater than revenue itself. If calculated correctly, margin will always fall between 0% and 100%. If you get over 100%, you're likely calculating markup instead of margin.
                </p>
              </div>

              <div className="border-l-4 border-red-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What's the difference between gross margin and net margin?</h3>
                <p className="text-gray-700">
                  Gross margin considers only direct costs (cost of goods sold), while net margin includes all expenses (operating costs, taxes, interest, etc.). Gross margin shows production efficiency, while net margin reveals overall business profitability. Net margin is always lower than gross margin.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Should I use margin or markup for pricing?</h3>
                <p className="text-gray-700">
                  Use markup for pricing decisions (it shows how much to add to cost) and margin for financial analysis (it shows profitability). Many retailers use markup to set prices, then track margin to measure performance. Both are useful for different purposes.
                </p>
              </div>
            </div>
          </section>

          {/* Book Your Session CTA */}
          <section className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl shadow-2xl p-8 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Help with Business Math or Financial Calculations?
            </h2>
            <p className="text-xl mb-8 text-orange-50">
              Our expert tutors can help you master profit margins, markup calculations, and all business mathematics with personalized one-on-one sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/tutoring/free-consultation"
                className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg hover:shadow-xl inline-block"
              >
                Book a Free Demo Class
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-orange-600 transition-colors inline-block"
              >
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
