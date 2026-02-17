'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, TrendingUp, RotateCcw, CheckCircle, Lightbulb, BookOpen, Target, Info, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PercentageChangeCalculator() {
  const [v1, setV1] = useState<string>('');
  const [v2, setV2] = useState<string>('');
  const [result, setResult] = useState<{
    percentageChange: number;
    absoluteChange: number;
    isIncrease: boolean;
  } | null>(null);

  const calculatePercentageChange = () => {
    const value1 = parseFloat(v1);
    const value2 = parseFloat(v2);

    if (isNaN(value1) || isNaN(value2)) {
      alert('Please enter valid numbers for both V₁ and V₂');
      return;
    }

    if (value1 === 0) {
      alert('V₁ cannot be 0');
      return;
    }

    const absoluteChange = value2 - value1;
    const percentageChange = (absoluteChange / Math.abs(value1)) * 100;
    const isIncrease = absoluteChange > 0;

    setResult({
      percentageChange,
      absoluteChange,
      isIncrease,
    });
  };

  const handleClear = () => {
    setV1('');
    setV2('');
    setResult(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What\'s the difference between percentage change and percentage increase?","acceptedAnswer":{"@type":"Answer","text":"Percentage change is the general term that covers both increases and decreases—it can be positive or negative. Percentage increase specifically refers to positive changes (growth), while percentage decrease refers to negative changes (decline). The formulas are identical; the terminology just indicates direction."}},{"@type":"Question","name":"Why do we use absolute value for V₁ in the denominator?","acceptedAnswer":{"@type":"Answer","text":"Using |V₁| ensures the formula works correctly even when the initial value is negative. For example, if temperature changes from -10°C to -5°C, that\'s an increase of 50%: [(-5-(-10))/|-10|] × 100 = 50%. Without absolute value, you\'d get -50%, incorrectly suggesting a decrease. This makes the formula universally applicable."}},{"@type":"Question","name":"Can percentage change be greater than 100%?","acceptedAnswer":{"@type":"Answer","text":"Yes! A 100% increase means doubling, 200% means tripling, etc. There\'s no upper limit. If a stock goes from $10 to $50, that\'s a 400% increase. Similarly, the maximum decrease is -100% (value reaches zero). For example, going from $100 to $0 is a -100% change."}},{"@type":"Question","name":"How is percentage change different from percentage points?","acceptedAnswer":{"@type":"Answer","text":"Percentage change measures relative change using the formula. Percentage points measure absolute difference between two percentages. If interest rates go from 4% to 6%, that\'s a 2 percentage point increase but a 50% change (because 2 is 50% of 4). Use percentage points when both values are already percentages."}},{"@type":"Question","name":"What if V₁ equals zero?","acceptedAnswer":{"@type":"Answer","text":"Percentage change cannot be calculated when V₁ = 0 because you cannot divide by zero. If starting from 0, report the absolute change instead (e.g., \'increased from 0 to 50 units\') or use alternative metrics. Mathematically, going from 0 to any positive number represents an infinite percentage increase."}},{"@type":"Question","name":"Is the order of values important?","acceptedAnswer":{"@type":"Answer","text":"Yes, absolutely! Percentage change is directional. Going from 40 to 50 is a +25% change, but going from 50 to 40 is a -20% change. V₁ should be your starting/initial/before value, and V₂ should be your ending/final/after value. Reversing them gives a different result because the baseline changes."}},{"@type":"Question","name":"How do I interpret negative percentage change?","acceptedAnswer":{"@type":"Answer","text":"A negative percentage change indicates a decrease or decline. The negative sign shows direction, while the magnitude shows how significant the change is. For example, -15% means the value decreased by 15% of its original amount. To report this, you can say \'15% decrease\' (dropping the negative) or \'-15% change\' (keeping the sign)."}},{"@type":"Question","name":"Can I use percentage change for comparing multiple periods?","acceptedAnswer":{"@type":"Answer","text":"Yes, but be careful with compounding. If sales increase 10% year 1 and 10% year 2, the total is not 20%. Year 2\'s 10% applies to the already-increased Year 1 value, resulting in 21% total growth (1.1 × 1.1 = 1.21). For multiple periods, calculate each percentage change separately or use compound growth formulas."}}]}' }}
      />
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto max-w-6xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/calculators" className="text-[#1A3D7C] hover:text-[#2BAE66]">
              Calculators
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Percentage Change Calculator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-red-50 via-white to-orange-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Percentage Change Calculator</h1>
            </div>
            <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
              Calculate percentage change between two values with step-by-step solutions. Understand increases, decreases, and percentage differences with proper mathematical notation.
            </p>
          </div>
        </div>

        {/* Main Calculator Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Calculator Card */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl border-2 border-gray-200 mb-8">
            <div className="bg-gradient-to-r from-red-700 to-orange-600 text-white p-4 rounded-lg mb-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Percentage Change Calculator</h2>
            </div>

            {/* Formula Display */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center border-2 border-gray-200">
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                <span className="inline-flex flex-col items-center">
                  <span className="border-b-2 border-gray-900 pb-1">
                    (V₂ − V₁)
                  </span>
                  <span className="mt-1">|V₁|</span>
                </span>
                <span className="mx-3">×</span>
                <span>100</span>
                <span className="mx-2">=</span>
                <span>?</span>
              </p>
              <p className="text-gray-600 italic mt-4 text-sm md:text-base">
                Change from V₁ to V₂
              </p>
            </div>

            <div className="space-y-6">
              {/* V1 Input */}
              <div>
                <Label htmlFor="v1" className="text-gray-700 font-semibold mb-3 block text-base md:text-lg">
                  V₁ =
                </Label>
                <Input
                  id="v1"
                  type="number"
                  step="any"
                  value={v1}
                  onChange={(e) => setV1(e.target.value)}
                  placeholder="Enter first value (V₁)"
                  className="text-center text-lg py-6 border-2 border-[#2BAE66] focus:ring-2 focus:ring-[#2BAE66]"
                />
              </div>

              {/* V2 Input */}
              <div>
                <Label htmlFor="v2" className="text-gray-700 font-semibold mb-3 block text-base md:text-lg">
                  V₂ =
                </Label>
                <Input
                  id="v2"
                  type="number"
                  step="any"
                  value={v2}
                  onChange={(e) => setV2(e.target.value)}
                  placeholder="Enter second value (V₂)"
                  className="text-center text-lg py-6 border-2 border-[#2BAE66] focus:ring-2 focus:ring-[#2BAE66]"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="flex-1 py-6 text-lg font-semibold border-2 border-gray-300 hover:bg-gray-50"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Clear
                </Button>
                <Button
                  onClick={calculatePercentageChange}
                  className="flex-1 py-6 text-lg font-semibold bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] hover:opacity-90"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate
                </Button>
              </div>
            </div>

            {/* Results Section */}
            {result && (
              <div className="mt-8 space-y-6">
                {/* Answer */}
                <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-lg p-6 text-white">
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Answer:
                  </h3>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border-2 border-white/20">
                    <p className="text-3xl md:text-4xl font-bold text-center">
                      = {Math.abs(result.percentageChange).toFixed(4)}% {result.isIncrease ? 'increase' : 'decrease'}
                    </p>
                  </div>
                </div>

                {/* Solution Steps */}
                <div className="border-2 border-[#2BAE66]/30 rounded-lg p-6 bg-gradient-to-br from-red-50 to-orange-50">
                  <h3 className="text-xl font-bold text-[#1A3D7C] mb-4 flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-[#2BAE66]" />
                    Solution:
                  </h3>
                  <div className="space-y-4">
                    <p className="text-gray-800 font-semibold">
                      Calculate percentage change
                    </p>
                    <p className="text-gray-800">
                      from V₁ = {v1} to V₂ = {v2}
                    </p>

                    {/* Mathematical Formula Display */}
                    <div className="bg-white rounded-lg p-6 my-6 border-2 border-gray-200">
                      <p className="text-center text-xl md:text-2xl font-bold text-gray-900 mb-4">
                        <span className="inline-flex flex-col items-center">
                          <span className="border-b-2 border-gray-900 pb-1">
                            (V₂ − V₁)
                          </span>
                          <span className="mt-1">|V₁|</span>
                        </span>
                        <span className="mx-3">×</span>
                        <span>100</span>
                      </p>

                      <div className="space-y-3 mt-6">
                        <p className="text-center text-lg">
                          = <span className="inline-flex flex-col items-center">
                            <span className="border-b-2 border-gray-900 pb-1">
                              ({v2} − {v1})
                            </span>
                            <span className="mt-1">|{v1}|</span>
                          </span>
                          <span className="mx-2">×</span>
                          <span>100</span>
                        </p>

                        <p className="text-center text-lg">
                          = <span className="inline-flex flex-col items-center">
                            <span className="border-b-2 border-gray-900 pb-1">
                              {result.absoluteChange}
                            </span>
                            <span className="mt-1">{Math.abs(parseFloat(v1))}</span>
                          </span>
                          <span className="mx-2">×</span>
                          <span>100</span>
                        </p>

                        <p className="text-center text-lg">
                          = {(result.absoluteChange / Math.abs(parseFloat(v1))).toFixed(6)} × 100
                        </p>

                        <p className="text-center text-lg font-bold text-gray-900">
                          = {result.percentageChange.toFixed(4)}% change
                        </p>

                        <p className="text-center text-xl font-bold text-[#2BAE66] mt-4">
                          = {Math.abs(result.percentageChange).toFixed(4)}% {result.isIncrease ? 'increase' : 'decrease'}
                        </p>
                      </div>
                    </div>

                    {/* Note */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 rounded-r-lg">
                      <p className="text-gray-700 text-sm md:text-base">
                        <strong>Note:</strong> Percent Change is NOT the same as Percent Difference. Percent change measures relative change from a starting value, while percent difference measures the difference relative to the average of two values.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SEO Content */}
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 mb-8">
            <article className="prose prose-gray max-w-none">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                What is Percentage Change?
              </h2>
              <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
                Percentage change is a mathematical concept that measures how much a value has increased or decreased relative to its original amount, expressed as a percentage. The formula for percentage change is: <strong>[(V₂ - V₁) / |V₁|] × 100</strong>, where V₁ is the initial value and V₂ is the final value. This calculation is essential in statistics, economics, finance, business analytics, and scientific research for understanding trends, growth rates, and comparative changes over time.
              </p>
              <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
                Unlike absolute change which simply shows the raw difference between two numbers, percentage change provides context by expressing that difference relative to the starting point. This relative measurement is crucial because it allows meaningful comparisons between changes of different magnitudes. For instance, a $10 price increase represents a 100% change when starting from $10, but only a 1% change when starting from $1,000. Percentage change captures this proportional significance that absolute differences cannot convey.
              </p>
              <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
                The percentage change formula uses the absolute value of the initial value (|V₁|) in the denominator to ensure proper calculations even with negative starting values, such as temperatures below zero, financial losses, or debt amounts. A positive percentage change indicates an increase (growth), while a negative percentage change indicates a decrease (decline). The magnitude of the percentage tells you how significant the change is—a 5% change is relatively small, while a 100% change means the value has doubled (or halved if negative).
              </p>
              <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
                Our Percentage Change Calculator automates this computation and provides clear, step-by-step solutions with proper mathematical notation. Whether you're analyzing stock market fluctuations, tracking business metrics, comparing test scores, monitoring population changes, or evaluating any quantitative data, this tool delivers precise percentage change calculations instantly while helping you understand the underlying mathematics.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
                Percentage Change vs Percentage Difference
              </h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Critical Distinction
                </h3>
                <p className="text-gray-700 mb-4 text-sm md:text-base">
                  Many people confuse <strong>percentage change</strong> with <strong>percentage difference</strong>, but they measure different things and use different formulas:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Percentage Change</h4>
                    <p className="text-gray-700 mb-3 text-sm">
                      <strong>Measures:</strong> Relative change from a starting value
                    </p>
                    <p className="text-gray-700 mb-3 text-sm">
                      <strong>Formula:</strong> [(V₂ - V₁) / |V₁|] × 100
                    </p>
                    <p className="text-gray-700 mb-3 text-sm">
                      <strong>Direction:</strong> Has direction (increase/decrease)
                    </p>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      Example: From 40 to 50<br />
                      = (50-40)/40 × 100<br />
                      = <strong>25% increase</strong>
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-green-200">
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Percentage Difference</h4>
                    <p className="text-gray-700 mb-3 text-sm">
                      <strong>Measures:</strong> Difference relative to average
                    </p>
                    <p className="text-gray-700 mb-3 text-sm">
                      <strong>Formula:</strong> [|V₂ - V₁| / ((V₁ + V₂)/2)] × 100
                    </p>
                    <p className="text-gray-700 mb-3 text-sm">
                      <strong>Direction:</strong> No direction (always positive)
                    </p>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      Example: Between 40 and 50<br />
                      = |50-40|/((40+50)/2) × 100<br />
                      = <strong>22.22% difference</strong>
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mt-6 text-sm md:text-base">
                  <strong>Key Point:</strong> Use percentage change when you have a clear before/after or initial/final relationship. Use percentage difference when comparing two independent values without a clear starting point.
                </p>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
                How to Calculate Percentage Change Step by Step
              </h2>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg mb-6 border-l-4 border-[#2BAE66]">
                <ol className="list-decimal list-inside space-y-4 text-gray-700 text-sm md:text-base">
                  <li className="leading-relaxed">
                    <strong>Identify your values:</strong> Determine V₁ (initial/starting value) and V₂ (final/ending value). The order matters because percentage change is directional.
                  </li>
                  <li className="leading-relaxed">
                    <strong>Calculate the difference:</strong> Subtract the initial value from the final value: V₂ - V₁. This gives you the absolute change, which can be positive (increase) or negative (decrease).
                  </li>
                  <li className="leading-relaxed">
                    <strong>Divide by initial value:</strong> Take the difference and divide it by the absolute value of the initial amount: (V₂ - V₁) / |V₁|. This converts the absolute change to a relative change.
                  </li>
                  <li className="leading-relaxed">
                    <strong>Multiply by 100:</strong> Convert the decimal result to a percentage by multiplying by 100: [(V₂ - V₁) / |V₁|] × 100.
                  </li>
                  <li className="leading-relaxed">
                    <strong>Interpret the result:</strong> If positive, it's an increase/growth. If negative, it's a decrease/decline. The magnitude indicates how significant the change is.
                  </li>
                </ol>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
                Detailed Examples with Solutions
              </h2>
              <div className="space-y-6 mb-8">
                <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">
                    Example 1: Stock Price Increase
                  </h3>
                  <p className="font-semibold mb-3">A stock price changed from $45 to $60. Calculate the percentage change.</p>
                  <div className="space-y-2 text-gray-700 text-sm md:text-base">
                    <p><strong>Given:</strong> V₁ = $45, V₂ = $60</p>
                    <p><strong>Step 1:</strong> Difference = V₂ - V₁ = $60 - $45 = $15</p>
                    <p><strong>Step 2:</strong> Divide by initial: $15 / $45 = 0.3333</p>
                    <p><strong>Step 3:</strong> Convert to percentage: 0.3333 × 100 = 33.33%</p>
                    <p className="text-lg font-bold text-blue-700 mt-4">Answer: 33.33% increase</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-red-50 to-orange-50">
                  <h3 className="text-xl font-bold text-red-700 mb-4">
                    Example 2: Temperature Decrease
                  </h3>
                  <p className="font-semibold mb-3">Temperature dropped from 30°C to 20°C. Find the percentage change.</p>
                  <div className="space-y-2 text-gray-700 text-sm md:text-base">
                    <p><strong>Given:</strong> V₁ = 30°C, V₂ = 20°C</p>
                    <p><strong>Step 1:</strong> Difference = V₂ - V₁ = 20 - 30 = -10</p>
                    <p><strong>Step 2:</strong> Divide by initial: -10 / 30 = -0.3333</p>
                    <p><strong>Step 3:</strong> Convert to percentage: -0.3333 × 100 = -33.33%</p>
                    <p className="text-lg font-bold text-red-700 mt-4">Answer: 33.33% decrease</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-purple-50 to-pink-50">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">
                    Example 3: Revenue Growth
                  </h3>
                  <p className="font-semibold mb-3">Company revenue grew from $500,000 to $625,000. Calculate percentage change.</p>
                  <div className="space-y-2 text-gray-700 text-sm md:text-base">
                    <p><strong>Given:</strong> V₁ = $500,000, V₂ = $625,000</p>
                    <p><strong>Step 1:</strong> Difference = $625,000 - $500,000 = $125,000</p>
                    <p><strong>Step 2:</strong> Divide by initial: $125,000 / $500,000 = 0.25</p>
                    <p><strong>Step 3:</strong> Convert to percentage: 0.25 × 100 = 25%</p>
                    <p className="text-lg font-bold text-purple-700 mt-4">Answer: 25% increase</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-green-50 to-emerald-50">
                  <h3 className="text-xl font-bold text-green-700 mb-4">
                    Example 4: Weight Loss
                  </h3>
                  <p className="font-semibold mb-3">Body weight changed from 180 lbs to 162 lbs. What's the percentage change?</p>
                  <div className="space-y-2 text-gray-700 text-sm md:text-base">
                    <p><strong>Given:</strong> V₁ = 180 lbs, V₂ = 162 lbs</p>
                    <p><strong>Step 1:</strong> Difference = 162 - 180 = -18 lbs</p>
                    <p><strong>Step 2:</strong> Divide by initial: -18 / 180 = -0.1</p>
                    <p><strong>Step 3:</strong> Convert to percentage: -0.1 × 100 = -10%</p>
                    <p className="text-lg font-bold text-green-700 mt-4">Answer: 10% decrease</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
                Real-World Applications of Percentage Change
              </h2>
              <div className="space-y-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="w-6 h-6 mr-2 text-[#2BAE66]" />
                    Stock Market Analysis
                  </h3>
                  <p className="text-gray-700 mb-3 text-sm md:text-base">
                    Investors and traders use percentage change daily to track stock performance, compare portfolio returns, and make buy/sell decisions. A stock moving from $50 to $55 shows a 10% gain, helping investors assess performance relative to benchmarks like the S&P 500. Percentage change is more meaningful than dollar amounts because it accounts for the initial investment size.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Example: "My tech stocks are up 15% this quarter while the market average is only 8%."
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    📊 Business Performance Metrics
                  </h3>
                  <p className="text-gray-700 mb-3 text-sm md:text-base">
                    Companies track percentage changes in revenue, profit, costs, customer base, and market share to evaluate business health and growth trajectories. Quarter-over-quarter and year-over-year percentage changes are standard metrics in earnings reports. A 20% revenue increase signals strong growth, while a 5% cost reduction improves margins.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Example: "Q3 sales showed a 12% increase compared to Q2, exceeding our 8% target."
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    🌡️ Scientific Measurements
                  </h3>
                  <p className="text-gray-700 mb-3 text-sm md:text-base">
                    Scientists use percentage change to quantify experimental results, climate data, population studies, and chemical concentrations. Temperature changes, species population fluctuations, and atmospheric CO₂ levels are often reported as percentage changes to communicate significance. A 2°C temperature increase may sound small, but represents a 40% change from 5°C baseline.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Example: "The endangered species population increased by 15% after conservation efforts."
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    💰 Economic Indicators
                  </h3>
                  <p className="text-gray-700 mb-3 text-sm md:text-base">
                    Economists track percentage changes in GDP, unemployment rates, inflation, interest rates, and currency exchange rates to assess economic health and policy effectiveness. A 2% GDP growth, 0.5% inflation rate, or 10% unemployment reduction are standard ways to communicate economic trends. These percentage changes guide government policy and Federal Reserve decisions.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Example: "GDP grew 2.3% year-over-year, slightly above the 2% economist consensus."
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    🏥 Health and Fitness
                  </h3>
                  <p className="text-gray-700 mb-3 text-sm md:text-base">
                    Medical professionals and fitness trainers use percentage change to monitor weight loss/gain, blood pressure, cholesterol levels, muscle mass, and vital signs. A 5% body weight reduction is clinically significant for health benefits. Percentage change helps track progress and set realistic fitness goals, making abstract numbers more meaningful.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Example: "I achieved a 7% reduction in body fat through diet and exercise."
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    📱 Technology and Web Analytics
                  </h3>
                  <p className="text-gray-700 mb-3 text-sm md:text-base">
                    Digital marketers and product managers track percentage changes in website traffic, conversion rates, user engagement, app downloads, and bounce rates. A 25% increase in conversion rate after A/B testing validates design changes. Monthly active user growth, expressed as percentage change, helps startups demonstrate traction to investors.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Example: "New landing page design increased conversions by 18% compared to the old version."
                  </p>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6 mb-8">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    What's the difference between percentage change and percentage increase?
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Percentage change is the general term that covers both increases and decreases—it can be positive or negative. Percentage increase specifically refers to positive changes (growth), while percentage decrease refers to negative changes (decline). The formulas are identical; the terminology just indicates direction.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Why do we use absolute value for V₁ in the denominator?
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Using |V₁| ensures the formula works correctly even when the initial value is negative. For example, if temperature changes from -10°C to -5°C, that's an increase of 50%: [(-5-(-10))/|-10|] × 100 = 50%. Without absolute value, you'd get -50%, incorrectly suggesting a decrease. This makes the formula universally applicable.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Can percentage change be greater than 100%?
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Yes! A 100% increase means doubling, 200% means tripling, etc. There's no upper limit. If a stock goes from $10 to $50, that's a 400% increase. Similarly, the maximum decrease is -100% (value reaches zero). For example, going from $100 to $0 is a -100% change.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    How is percentage change different from percentage points?
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Percentage change measures relative change using the formula. Percentage points measure absolute difference between two percentages. If interest rates go from 4% to 6%, that's a <strong>2 percentage point</strong> increase but a <strong>50% change</strong> (because 2 is 50% of 4). Use percentage points when both values are already percentages.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    What if V₁ equals zero?
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Percentage change cannot be calculated when V₁ = 0 because you cannot divide by zero. If starting from 0, report the absolute change instead (e.g., "increased from 0 to 50 units") or use alternative metrics. Mathematically, going from 0 to any positive number represents an infinite percentage increase.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Is the order of values important?
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Yes, absolutely! Percentage change is directional. Going from 40 to 50 is a +25% change, but going from 50 to 40 is a -20% change. V₁ should be your starting/initial/before value, and V₂ should be your ending/final/after value. Reversing them gives a different result because the baseline changes.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    How do I interpret negative percentage change?
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    A negative percentage change indicates a decrease or decline. The negative sign shows direction, while the magnitude shows how significant the change is. For example, -15% means the value decreased by 15% of its original amount. To report this, you can say "15% decrease" (dropping the negative) or "-15% change" (keeping the sign).
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Can I use percentage change for comparing multiple periods?
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Yes, but be careful with compounding. If sales increase 10% year 1 and 10% year 2, the total is not 20%. Year 2's 10% applies to the already-increased Year 1 value, resulting in 21% total growth (1.1 × 1.1 = 1.21). For multiple periods, calculate each percentage change separately or use compound growth formulas.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    How precise should my percentage change calculation be?
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    This depends on context. Financial reports often use 2 decimal places (25.75%), scientific papers might use 3-4 decimals for precision (33.3333%), and casual business communication often rounds to whole numbers (25%). Our calculator provides 4 decimal places for maximum precision, but you can round as needed for your audience.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    What's the relationship between percentage change and growth rate?
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Growth rate and percentage change are essentially the same concept when measuring a single period. However, "growth rate" is typically used for positive changes over time (like annual growth rate), while "percentage change" is more general and can be positive or negative. Compound Annual Growth Rate (CAGR) extends this concept across multiple periods.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
                Common Mistakes to Avoid
              </h2>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  ⚠️ Watch Out For These Errors
                </h3>
                <ul className="space-y-3 text-gray-700 text-sm md:text-base">
                  <li className="flex items-start">
                    <span className="text-red-600 font-bold mr-2">✗</span>
                    <span><strong>Switching V₁ and V₂:</strong> Always use initial value as V₁ and final value as V₂. Reversing them changes the percentage and baseline.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-bold mr-2">✗</span>
                    <span><strong>Forgetting absolute value:</strong> Use |V₁| in denominator when V₁ might be negative to ensure correct direction.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-bold mr-2">✗</span>
                    <span><strong>Confusing with percentage points:</strong> Remember: percentage change vs percentage points are different when dealing with existing percentages.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-bold mr-2">✗</span>
                    <span><strong>Adding consecutive percentage changes:</strong> 10% + 10% ≠ 20% total change due to compounding. Calculate each step properly.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-bold mr-2">✗</span>
                    <span><strong>Using percentage difference formula:</strong> Don't confuse with percentage difference, which divides by the average of both values.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-bold mr-2">✗</span>
                    <span><strong>Attempting calculation with V₁ = 0:</strong> Cannot calculate percentage change from zero—report absolute change instead.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-bold mr-2">✗</span>
                    <span><strong>Misinterpreting negative results:</strong> Negative percentage = decrease, not an error. Both positive and negative results are valid.</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
                Quick Reference: Percentage Change Formulas
              </h2>
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm md:text-base">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left font-bold text-gray-900 border-b">Concept</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-900 border-b">Formula</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-900 border-b">When to Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-semibold">Percentage Change</td>
                      <td className="px-6 py-4">[(V₂ - V₁) / |V₁|] × 100</td>
                      <td className="px-6 py-4">Measuring change from starting value</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-6 py-4 font-semibold">Percentage Increase</td>
                      <td className="px-6 py-4">Same formula, result is positive</td>
                      <td className="px-6 py-4">When V₂ &gt; V₁ (growth/increase)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-semibold">Percentage Decrease</td>
                      <td className="px-6 py-4">Same formula, result is negative</td>
                      <td className="px-6 py-4">When V₂ &lt; V₁ (decline/decrease)</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-6 py-4 font-semibold">Percentage Difference</td>
                      <td className="px-6 py-4">[|V₂ - V₁| / ((V₁+V₂)/2)] × 100</td>
                      <td className="px-6 py-4">Comparing two values without direction</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-semibold">Reverse Calculation</td>
                      <td className="px-6 py-4">V₁ = V₂ / (1 + %change/100)</td>
                      <td className="px-6 py-4">Finding original value from final</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-6 py-4 font-semibold">Finding V₂</td>
                      <td className="px-6 py-4">V₂ = V₁ × (1 + %change/100)</td>
                      <td className="px-6 py-4">Finding final value from percentage</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-semibold">Growth Multiplier</td>
                      <td className="px-6 py-4">1 + (%change/100)</td>
                      <td className="px-6 py-4">Converting percentage to multiplication factor</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-xl p-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Calculate Percentage Change Instantly
                </h2>
                <p className="text-gray-700 mb-6 text-sm md:text-base max-w-3xl mx-auto">
                  Use our free percentage change calculator for accurate results with step-by-step solutions and proper mathematical notation. Perfect for students, analysts, investors, and professionals!
                </p>
                <Button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] hover:opacity-90 text-white px-8 py-6 text-lg font-semibold rounded-xl"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Start Calculating Now
                </Button>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Book Your Session CTA */}
      <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Need Help with Percentage Calculations?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master percentage changes, growth rates, and statistical analysis. Get personalized one-on-one guidance tailored to your learning style.
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

      <Footer />
    </div>
  );
}
