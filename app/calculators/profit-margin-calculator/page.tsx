'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { DollarSign } from 'lucide-react';

interface CalculationResult {
  netProfitMargin: number;
  netProfit: number;
  profitPercentage: number;
  cost: number;
  revenue: number;
}

export default function ProfitMarginCalculator() {
  const [cost, setCost] = useState('60.00');
  const [revenue, setRevenue] = useState('100.00');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateProfitMargin = () => {
    const costValue = parseFloat(cost) || 0;
    const revenueValue = parseFloat(revenue) || 0;

    if (revenueValue === 0) {
      alert('Revenue cannot be zero');
      return;
    }

    // Calculate net profit
    const netProfit = revenueValue - costValue;

    // Calculate net profit margin: (Revenue - Cost) / Revenue × 100
    const netProfitMargin = ((revenueValue - costValue) / revenueValue) * 100;

    // Calculate profit percentage (same as margin in this context)
    const profitPercentage = netProfitMargin;

    setResult({
      netProfitMargin,
      netProfit,
      profitPercentage,
      cost: costValue,
      revenue: revenueValue,
    });
  };

  const handleClear = () => {
    setCost('');
    setRevenue('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8 mt-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl mb-6 shadow-lg">
            <DollarSign className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Profit Margin Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate net profit margin, net profit, and profit percentage with step-by-step mathematical solutions
          </p>
        </div>

        {/* Calculator Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="bg-gradient-to-r from-green-700 to-emerald-700 text-white text-center py-4 rounded-xl mb-8">
              <h2 className="text-2xl font-bold">Profit Margin Calculator</h2>
            </div>

            {/* Input Fields */}
            <div className="space-y-6 mb-8">
              {/* Cost */}
              <div className="flex items-center justify-center gap-4">
                <Label htmlFor="cost" className="text-lg font-semibold w-28 text-right">
                  Cost: $
                </Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="w-48 text-center text-xl py-6"
                  placeholder="0.00"
                />
              </div>

              {/* Revenue */}
              <div className="flex items-center justify-center gap-4">
                <Label htmlFor="revenue" className="text-lg font-semibold w-28 text-right">
                  Revenue: $
                </Label>
                <Input
                  id="revenue"
                  type="number"
                  step="0.01"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  className="w-48 text-center text-xl py-6"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-8">
              <Button
                onClick={handleClear}
                variant="outline"
                className="flex-1 py-6 text-lg font-semibold border-2 hover:bg-gray-100"
              >
                Clear
              </Button>
              <Button
                onClick={calculateProfitMargin}
                className="flex-1 py-6 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                Calculate
              </Button>
            </div>

            {/* Answer Section */}
            {result && (
              <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
                <h3 className="text-xl font-bold mb-6">Answer:</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Net Profit Margin:</span>
                    <span className="text-lg font-bold">{result.netProfitMargin.toFixed(2)}%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Net Profit:</span>
                    <span className="text-lg font-bold">${result.netProfit.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Profit Percentage:</span>
                    <span className="text-lg font-bold">{result.profitPercentage.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="max-w-4xl mx-auto space-y-8 mb-12">
          {/* What is Profit Margin */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Net Profit Margin?</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Net profit margin is a critical financial ratio that measures how much net profit a business generates as a percentage of its revenue. It represents the portion of each dollar of revenue that translates into profit after all costs are deducted. Understanding net profit margin is essential for business owners, investors, and financial analysts to assess a company's profitability and operational efficiency.
              </p>
              <p>
                The net profit margin formula is straightforward: Net Profit Margin = (Revenue − Cost) ÷ Revenue × 100%. For example, if a business has revenue of $100 and costs of $60, the net profit is $40, and the net profit margin is ($40 ÷ $100) × 100% = 40%. This means that for every dollar of revenue, the business keeps $0.40 as profit after covering all costs.
              </p>
              <p>
                Net profit margin varies significantly across different industries. Technology and software companies often have high profit margins (20-40% or higher) due to low marginal costs once products are developed. Retail businesses typically operate on lower margins (2-5%) due to competitive pricing and higher operational costs. Understanding these industry benchmarks helps businesses evaluate their performance and identify areas for improvement.
              </p>
              <p>
                A higher profit margin indicates better profitability and more efficient operations. It means a company is either able to charge premium prices, control costs effectively, or both. Conversely, a low profit margin may suggest pricing pressure, high costs, or intense competition. Tracking profit margin over time reveals trends in business performance and helps identify when corrective action is needed.
              </p>
            </div>
          </section>

          {/* How to Calculate */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Calculate Net Profit Margin</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Calculating net profit margin involves three simple steps. Let's work through an example where a business has $60 in costs and $100 in revenue.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Step 1: Identify Revenue and Cost</h3>
              <p>
                First, determine your total revenue (sales) and total cost (all expenses):
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Revenue = $100.00</li>
                <li>Cost = $60.00</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Step 2: Calculate Net Profit</h3>
              <p>
                Subtract total cost from revenue to find net profit:
              </p>
              <div className="bg-blue-50 p-4 rounded-lg my-3">
                <p className="font-mono">Net Profit = Revenue − Cost</p>
                <p className="font-mono">Net Profit = $100.00 − $60.00 = $40.00</p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Step 3: Calculate Net Profit Margin</h3>
              <p>
                Divide net profit by revenue and multiply by 100 to get the percentage:
              </p>
              <div className="bg-green-50 p-4 rounded-lg my-3">
                <p className="font-mono">Net Profit Margin = (Net Profit ÷ Revenue) × 100%</p>
                <p className="font-mono">Net Profit Margin = ($40.00 ÷ $100.00) × 100%</p>
                <p className="font-mono">Net Profit Margin = 0.40 × 100% = 40.00%</p>
              </div>

              <p className="mt-6">
                This 40% net profit margin means that for every dollar of revenue, the business retains $0.40 as profit after all costs. The remaining $0.60 covers the costs of operations. A 40% margin is considered excellent in most industries and indicates strong pricing power and efficient cost management.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Understanding Profit Percentage</h3>
              <p>
                In this calculator, profit percentage is the same as net profit margin—it shows what percentage of revenue becomes profit. Both metrics express profitability as a percentage of sales, making them easy to understand and compare across different businesses or time periods.
              </p>
            </div>
          </section>

          {/* Importance of Profit Margin */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Net Profit Margin Matters</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Net profit margin is one of the most important metrics for evaluating business performance and financial health:
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Business Performance Indicator</h3>
              <p>
                Net profit margin reveals how efficiently a business converts revenue into profit. A high margin indicates effective cost control, strong pricing power, or both. Comparing your margin to industry averages helps you understand whether your business is performing well or needs improvement.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Investment Decisions</h3>
              <p>
                Investors use profit margin to evaluate potential investments. Companies with higher and stable profit margins are generally more attractive because they generate more profit per dollar of sales. Consistent margins over time suggest sustainable competitive advantages and reliable management.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Pricing Strategy</h3>
              <p>
                Understanding your profit margin helps inform pricing decisions. If margins are too low, you may need to raise prices or reduce costs. If margins are very high compared to competitors, you might have room to lower prices to gain market share while still maintaining profitability.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Cost Control</h3>
              <p>
                Tracking profit margin over time reveals whether costs are increasing faster than revenue. A declining margin signals that expenses are rising or pricing isn't keeping pace with cost increases, prompting investigation and corrective action.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Business Comparison</h3>
              <p>
                Profit margin allows comparison between businesses of different sizes. A small company with $100,000 in revenue and a 30% margin may be more profitable than a larger company with $1,000,000 in revenue but only a 5% margin. The percentage metric normalizes for size differences.
              </p>
            </div>
          </section>

          {/* Industry Benchmarks */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Net Profit Margin by Industry</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Different industries have vastly different profit margin ranges. Here are typical net profit margins across various sectors:
              </p>

              <div className="overflow-x-auto mt-6">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">Industry</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">Typical Net Profit Margin</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Software/SaaS</td>
                      <td className="border border-gray-300 px-4 py-2">15-25%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Banking</td>
                      <td className="border border-gray-300 px-4 py-2">20-30%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Pharmaceutical</td>
                      <td className="border border-gray-300 px-4 py-2">15-20%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Consulting</td>
                      <td className="border border-gray-300 px-4 py-2">10-20%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Insurance</td>
                      <td className="border border-gray-300 px-4 py-2">5-10%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Retail (General)</td>
                      <td className="border border-gray-300 px-4 py-2">2-5%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Restaurant</td>
                      <td className="border border-gray-300 px-4 py-2">3-6%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Grocery Stores</td>
                      <td className="border border-gray-300 px-4 py-2">1-3%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Transportation</td>
                      <td className="border border-gray-300 px-4 py-2">2-4%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Construction</td>
                      <td className="border border-gray-300 px-4 py-2">3-7%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-6">
                These ranges are general guidelines and can vary based on company size, market position, and operational efficiency. Use them as benchmarks to evaluate your business performance, but remember that exceptional companies often exceed their industry averages through superior management and competitive advantages.
              </p>
            </div>
          </section>

          {/* Improving Profit Margin */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Improve Net Profit Margin</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Improving net profit margin requires either increasing revenue, decreasing costs, or both. Here are proven strategies:
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Increase Prices</h3>
              <p>
                Raising prices directly improves profit margin if you can maintain sales volume. Even small price increases can significantly impact profitability. Test price increases on select products or customer segments to assess impact before broader implementation.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Reduce Direct Costs</h3>
              <p>
                Negotiate better terms with suppliers, find alternative vendors, or buy in larger quantities for volume discounts. Reducing the cost of goods sold directly increases profit on each sale.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Decrease Operating Expenses</h3>
              <p>
                Review all operating expenses for potential savings. Automate manual processes, reduce waste, optimize energy usage, and eliminate unnecessary subscriptions or services. Small savings across many expense categories add up significantly.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Improve Product Mix</h3>
              <p>
                Focus sales and marketing efforts on higher-margin products or services. Discontinue or de-emphasize low-margin offerings. This strategic shift can improve overall profitability without changing individual product margins.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Increase Operational Efficiency</h3>
              <p>
                Streamline processes, reduce errors, minimize returns, and optimize inventory management. Better efficiency means lower costs per unit sold, directly improving margins.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Add Value</h3>
              <p>
                Enhance products or services to justify premium pricing. Better quality, superior customer service, additional features, or faster delivery can support higher prices and improve margins.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What is a good net profit margin?</h3>
                <p className="text-gray-700">
                  A "good" net profit margin varies by industry. Software companies might target 20-30%, while grocery stores operate successfully on 1-3%. Generally, higher margins are better, but compare your margin to industry averages and your own historical performance to assess whether your margin is good for your specific business.
                </p>
              </div>

              <div className="border-l-4 border-emerald-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What's the difference between gross profit margin and net profit margin?</h3>
                <p className="text-gray-700">
                  Gross profit margin only considers direct costs (cost of goods sold), while net profit margin includes all expenses (operating costs, taxes, interest, etc.). Net profit margin provides a more complete picture of overall profitability, while gross margin focuses on production efficiency.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Can profit margin be negative?</h3>
                <p className="text-gray-700">
                  Yes, profit margin can be negative when costs exceed revenue, resulting in a net loss. A negative profit margin means the business is losing money on each sale and is not sustainable long-term without corrective action or additional funding.
                </p>
              </div>

              <div className="border-l-4 border-emerald-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How often should I calculate profit margin?</h3>
                <p className="text-gray-700">
                  Calculate profit margin monthly or quarterly to track trends and identify issues early. Many businesses also calculate margins by product line, customer segment, or sales channel to understand which areas are most profitable and where improvements are needed.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What costs should be included in the calculation?</h3>
                <p className="text-gray-700">
                  For net profit margin, include all costs: cost of goods sold, operating expenses, salaries, rent, utilities, marketing, depreciation, interest, and taxes. The more comprehensive your cost accounting, the more accurate your profit margin calculation will be.
                </p>
              </div>
            </div>
          </section>

          {/* Book Your Session CTA */}
          <section className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-2xl p-8 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Help with Business Math or Financial Analysis?
            </h2>
            <p className="text-xl mb-8 text-green-50">
              Our expert tutors can help you master profit margins, financial ratios, and all business mathematics with personalized one-on-one sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/tutoring/free-consultation"
                className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-colors shadow-lg hover:shadow-xl inline-block"
              >
                Book a Free Demo Class
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-green-600 transition-colors inline-block"
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
