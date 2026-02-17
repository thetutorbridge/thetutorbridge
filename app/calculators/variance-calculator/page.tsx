'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, BookOpen, ArrowRight, BarChart3, TrendingUp } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface VarianceResult {
  dataSet: number[];
  count: number;
  mean: number;
  variance: number;
  standardDeviation: number;
  sumOfSquares: number;
  varianceType: 'sample' | 'population';
  steps: string[];
  deviations: { value: number; deviation: number; squaredDeviation: number }[];
}

export default function VarianceCalculator() {
  const [input, setInput] = useState<string>('');
  const [varianceType, setVarianceType] = useState<'sample' | 'population'>('sample');
  const [result, setResult] = useState<VarianceResult | null>(null);

  const handleCalculate = () => {
    if (!input.trim()) {
      alert('Please enter a data set');
      return;
    }

    try {
      // Parse input - support comma, space, or both
      const numbers = input
        .split(/[,\s]+/)
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .map(s => parseFloat(s));

      // Validate
      if (numbers.length < 2) {
        alert('Please enter at least 2 numbers');
        return;
      }

      if (numbers.some(n => isNaN(n))) {
        alert('Please enter valid numbers only');
        return;
      }

      // Calculate mean
      const sum = numbers.reduce((acc, num) => acc + num, 0);
      const mean = sum / numbers.length;

      // Calculate deviations and squared deviations
      const deviations = numbers.map(value => ({
        value,
        deviation: value - mean,
        squaredDeviation: Math.pow(value - mean, 2),
      }));

      // Calculate sum of squares
      const sumOfSquares = deviations.reduce((acc, d) => acc + d.squaredDeviation, 0);

      // Calculate variance based on type
      const divisor = varianceType === 'sample' ? numbers.length - 1 : numbers.length;
      const variance = sumOfSquares / divisor;

      // Calculate standard deviation
      const standardDeviation = Math.sqrt(variance);

      // Build step-by-step solution
      const steps: string[] = [];

      if (varianceType === 'sample') {
        steps.push('Calculating Sample Variance (s²):');
        steps.push('');
        steps.push('Step 1: List the data set');
        steps.push(`Data: ${numbers.join(', ')}`);
        steps.push(`Count (n): ${numbers.length}`);
        steps.push('');
        steps.push('Step 2: Calculate the mean (x̄)');
        steps.push(`x̄ = (${numbers.join(' + ')}) / ${numbers.length}`);
        steps.push(`x̄ = ${sum} / ${numbers.length}`);
        steps.push(`x̄ = ${mean.toFixed(6)}`);
        steps.push('');
        steps.push('Step 3: Calculate deviations from the mean (xᵢ - x̄)');
        deviations.forEach((d, i) => {
          steps.push(`${d.value} - ${mean.toFixed(6)} = ${d.deviation.toFixed(6)}`);
        });
        steps.push('');
        steps.push('Step 4: Square each deviation (xᵢ - x̄)²');
        deviations.forEach((d, i) => {
          steps.push(`(${d.deviation.toFixed(6)})² = ${d.squaredDeviation.toFixed(6)}`);
        });
        steps.push('');
        steps.push('Step 5: Sum the squared deviations (SS)');
        steps.push(`SS = ${deviations.map(d => d.squaredDeviation.toFixed(6)).join(' + ')}`);
        steps.push(`SS = ${sumOfSquares.toFixed(6)}`);
        steps.push('');
        steps.push('Step 6: Divide by (n - 1) for sample variance');
        steps.push(`s² = SS / (n - 1)`);
        steps.push(`s² = ${sumOfSquares.toFixed(6)} / ${numbers.length - 1}`);
        steps.push(`s² = ${variance.toFixed(6)}`);
        steps.push('');
        steps.push('Step 7: Calculate standard deviation (s)');
        steps.push(`s = √(s²) = √${variance.toFixed(6)}`);
        steps.push(`s = ${standardDeviation.toFixed(6)}`);
      } else {
        steps.push('Calculating Population Variance (σ²):');
        steps.push('');
        steps.push('Step 1: List the data set');
        steps.push(`Data: ${numbers.join(', ')}`);
        steps.push(`Count (N): ${numbers.length}`);
        steps.push('');
        steps.push('Step 2: Calculate the mean (μ)');
        steps.push(`μ = (${numbers.join(' + ')}) / ${numbers.length}`);
        steps.push(`μ = ${sum} / ${numbers.length}`);
        steps.push(`μ = ${mean.toFixed(6)}`);
        steps.push('');
        steps.push('Step 3: Calculate deviations from the mean (xᵢ - μ)');
        deviations.forEach((d, i) => {
          steps.push(`${d.value} - ${mean.toFixed(6)} = ${d.deviation.toFixed(6)}`);
        });
        steps.push('');
        steps.push('Step 4: Square each deviation (xᵢ - μ)²');
        deviations.forEach((d, i) => {
          steps.push(`(${d.deviation.toFixed(6)})² = ${d.squaredDeviation.toFixed(6)}`);
        });
        steps.push('');
        steps.push('Step 5: Sum the squared deviations (SS)');
        steps.push(`SS = ${deviations.map(d => d.squaredDeviation.toFixed(6)).join(' + ')}`);
        steps.push(`SS = ${sumOfSquares.toFixed(6)}`);
        steps.push('');
        steps.push('Step 6: Divide by N for population variance');
        steps.push(`σ² = SS / N`);
        steps.push(`σ² = ${sumOfSquares.toFixed(6)} / ${numbers.length}`);
        steps.push(`σ² = ${variance.toFixed(6)}`);
        steps.push('');
        steps.push('Step 7: Calculate standard deviation (σ)');
        steps.push(`σ = √(σ²) = √${variance.toFixed(6)}`);
        steps.push(`σ = ${standardDeviation.toFixed(6)}`);
      }

      setResult({
        dataSet: numbers,
        count: numbers.length,
        mean,
        variance,
        standardDeviation,
        sumOfSquares,
        varianceType,
        steps,
        deviations,
      });
    } catch (error) {
      alert('An error occurred during calculation. Please check your input.');
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  // Render sample variance formula
  const renderSampleVarianceFormula = () => (
    <div className="flex items-center justify-center gap-3 text-lg">
      <span className="font-semibold">s² = </span>
      <div className="inline-flex flex-col items-center">
        <div className="border-b-2 border-gray-900 pb-1 px-4">
          <span className="text-xl">Σ</span>
          <span className="text-sm align-sub">i=1</span>
          <span className="text-sm align-super">n</span>
          <span className="ml-2">(x</span>
          <span className="text-sm align-sub">i</span>
          <span> − x̄)²</span>
        </div>
        <span className="pt-1 px-4">n − 1</span>
      </div>
    </div>
  );

  // Render population variance formula
  const renderPopulationVarianceFormula = () => (
    <div className="flex items-center justify-center gap-3 text-lg">
      <span className="font-semibold">σ² = </span>
      <div className="inline-flex flex-col items-center">
        <div className="border-b-2 border-gray-900 pb-1 px-4">
          <span className="text-xl">Σ</span>
          <span className="text-sm align-sub">i=1</span>
          <span className="text-sm align-super">N</span>
          <span className="ml-2">(x</span>
          <span className="text-sm align-sub">i</span>
          <span> − μ)²</span>
        </div>
        <span className="pt-1 px-4">N</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the difference between variance and standard deviation?","acceptedAnswer":{"@type":"Answer","text":"Variance (s² or σ²) is the average of squared deviations from the mean, while standard deviation (s or σ) is the square root of variance. Standard deviation is in the same units as the original data, making it more interpretable. Variance is in squared units. For example, if data is in meters, variance is in meters² and standard deviation is in meters. Both measure spread, but standard deviation is generally easier to understand."}},{"@type":"Question","name":"When should I use sample variance vs population variance?","acceptedAnswer":{"@type":"Answer","text":"Use sample variance (s²) when you\'re working with a subset of data from a larger population and want to estimate the population variance. Use population variance (σ²) only when you have data for the entire population. In practice, most analyses use sample variance because we rarely have complete population data. The key difference is the divisor: sample variance divides by (n-1) while population variance divides by N."}},{"@type":"Question","name":"Why does sample variance divide by (n-1) instead of n?","acceptedAnswer":{"@type":"Answer","text":"This is called Bessel\'s correction. When we use sample data to estimate population variance, dividing by n tends to underestimate the true population variance because the sample mean is closer to the sample data than the population mean would be. Dividing by (n-1) instead of n corrects this bias and provides an unbiased estimate of the population variance. This is why sample variance using (n-1) is also called \'unbiased variance.\'"}},{"@type":"Question","name":"Can variance be negative?","acceptedAnswer":{"@type":"Answer","text":"No, variance cannot be negative. Since variance is calculated by squaring deviations from the mean and then averaging them, and squared numbers are always non-negative, variance must be non-negative (≥ 0). The minimum variance is zero, which occurs only when all data points are identical. If you calculate a negative variance, you\'ve made an error in your calculations—check your arithmetic, especially the mean calculation and the divisor."}},{"@type":"Question","name":"What does a high variance mean?","acceptedAnswer":{"@type":"Answer","text":"High variance indicates that data points are spread far from the mean, showing high variability or diversity in the dataset. For example, in finance, high variance in stock returns indicates high volatility and risk. In quality control, high variance suggests inconsistent production. However, \'high\' is relative—compare variance to the mean or to variances in similar datasets. The coefficient of variation (CV = standard deviation/mean) helps make this comparison."}},{"@type":"Question","name":"What does a low variance mean?","acceptedAnswer":{"@type":"Answer","text":"Low variance indicates that data points cluster closely around the mean, showing consistency and homogeneity. For example, low variance in test scores suggests students performed similarly. In manufacturing, low variance indicates consistent, high-quality production. Zero variance means all values are identical. Low variance isn\'t always desirable—in some contexts like investment portfolios, you might want some variability for potential returns."}},{"@type":"Question","name":"How does variance relate to normal distribution?","acceptedAnswer":{"@type":"Answer","text":"In a normal distribution, variance (or standard deviation) determines the spread of the bell curve. About 68% of data falls within 1 standard deviation of the mean, 95% within 2 standard deviations, and 99.7% within 3 standard deviations. This is the empirical rule (68-95-99.7 rule). Higher variance means a wider, flatter bell curve; lower variance means a narrower, taller curve. Variance is one of the two parameters (along with mean) that completely define a normal distribution."}},{"@type":"Question","name":"What is sum of squares (SS)?","acceptedAnswer":{"@type":"Answer","text":"Sum of squares (SS) is the total of all squared deviations from the mean: SS = Σ(xᵢ - x̄)². It\'s the numerator in the variance formula. SS represents the total variation in the dataset. Variance is essentially the average squared deviation, calculated by dividing SS by n (for population) or (n-1) (for sample). SS is fundamental to many statistical techniques including ANOVA and regression analysis."}}]}' }}
      />
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-blue-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Variance Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <BarChart3 className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Variance Calculator
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Calculate sample and population variance with step-by-step solutions. Includes standard deviation, mean, sum of squares, and detailed statistical analysis.
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Input Section (Left Side - 2 columns) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-blue-600" />
                  Enter Data Set
                </h2>

                {/* Variance Type Selector */}
                <div className="mb-6">
                  <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                    Variance Type
                  </Label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="varianceType"
                        value="sample"
                        checked={varianceType === 'sample'}
                        onChange={(e) => setVarianceType('sample')}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Sample (s²)</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="varianceType"
                        value="population"
                        checked={varianceType === 'population'}
                        onChange={(e) => setVarianceType('population')}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Population (σ²)</span>
                    </label>
                  </div>
                </div>

                {/* Input Field */}
                <div className="mb-6">
                  <Label htmlFor="dataInput" className="text-sm font-semibold text-gray-700 mb-3 block">
                    Data Values (comma or space separated)
                  </Label>
                  <textarea
                    id="dataInput"
                    placeholder="Enter numbers: 10, 12, 15, 16, 20"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full min-h-[120px] p-4 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Enter at least 2 numbers separated by commas or spaces
                  </p>
                </div>

                {/* Formula Preview */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <p className="text-sm font-semibold text-blue-900 mb-2 text-center">Formula:</p>
                  {varianceType === 'sample' ? renderSampleVarianceFormula() : renderPopulationVarianceFormula()}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Calculate
                  </Button>
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="px-6 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50"
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Section (Right Side - 3 columns) */}
            <div className="lg:col-span-3">
              {result ? (
                <div className="space-y-6">
                  {/* Answer Card */}
                  <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4">Answer</h3>
                    <div className="space-y-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-sm mb-1 text-blue-100">Variance ({result.varianceType === 'sample' ? 's²' : 'σ²'})</p>
                        <p className="text-3xl md:text-4xl font-bold">{result.variance.toFixed(7)}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-sm mb-1 text-blue-100">Standard Deviation ({result.varianceType === 'sample' ? 's' : 'σ'})</p>
                        <p className="text-2xl md:text-3xl font-bold">{result.standardDeviation.toFixed(7)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Summary Statistics */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Summary Statistics
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-semibold text-gray-700">Count ({result.varianceType === 'sample' ? 'n' : 'N'})</span>
                        <span className="text-gray-900 font-mono text-lg">{result.count}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-semibold text-gray-700">Mean ({result.varianceType === 'sample' ? 'x̄' : 'μ'})</span>
                        <span className="text-gray-900 font-mono text-lg">{result.mean.toFixed(7)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-semibold text-gray-700">Sum of Squares (SS)</span>
                        <span className="text-gray-900 font-mono text-lg">{result.sumOfSquares.toFixed(7)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Deviation Table */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Deviation Breakdown
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead className="bg-blue-50">
                          <tr>
                            <th className="p-3 text-left font-semibold text-blue-900 border-b-2 border-blue-200">Value (x<sub>i</sub>)</th>
                            <th className="p-3 text-left font-semibold text-blue-900 border-b-2 border-blue-200">Deviation</th>
                            <th className="p-3 text-left font-semibold text-blue-900 border-b-2 border-blue-200">Squared Dev</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.deviations.map((d, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                              <td className="p-3 border-b border-gray-200 font-mono">{d.value}</td>
                              <td className="p-3 border-b border-gray-200 font-mono text-sm">{d.deviation.toFixed(6)}</td>
                              <td className="p-3 border-b border-gray-200 font-mono text-sm">{d.squaredDeviation.toFixed(6)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Step-by-Step Solution */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Solution with Steps
                    </h3>
                    <div className="space-y-2 font-mono text-sm">
                      {result.steps.map((step, index) => (
                        step === '' ? (
                          <div key={index} className="h-2"></div>
                        ) : step.startsWith('Step') || step.startsWith('Calculating') ? (
                          <p key={index} className="font-bold text-blue-600 mt-3 font-sans text-base">{step}</p>
                        ) : (
                          <p key={index} className="text-gray-700 leading-relaxed pl-4">{step}</p>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Formula Explanation */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Formula Used
                    </h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      {result.varianceType === 'sample' ? (
                        <>
                          <p className="text-sm font-semibold text-gray-700 mb-3">Sample Variance Formula:</p>
                          {renderSampleVarianceFormula()}
                          <p className="text-xs text-gray-600 mt-3">
                            Divides by (n-1) to provide an unbiased estimate of the population variance
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-semibold text-gray-700 mb-3">Population Variance Formula:</p>
                          {renderPopulationVarianceFormula()}
                          <p className="text-xs text-gray-600 mt-3">
                            Divides by N when you have data for the entire population
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    Enter data values and click Calculate to see results
                  </p>
                  <p className="text-sm text-gray-400">
                    Choose between sample variance (s²) or population variance (σ²)
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Understanding Variance in Statistics
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Variance is a fundamental statistical measure that quantifies the spread or dispersion of a data set. Our comprehensive variance calculator helps you quickly compute both sample variance (s²) and population variance (σ²) with detailed step-by-step solutions, making it perfect for students, researchers, data analysts, and anyone working with statistical data.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Understanding variance is crucial for data analysis because it tells you how much your data points differ from the mean. A low variance indicates that data points are clustered closely around the mean, while a high variance indicates greater spread. This calculator not only computes the variance but also provides the standard deviation, mean, sum of squares, and a complete breakdown of all calculations.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you're analyzing scientific experiments, financial data, quality control measurements, or academic research, this tool provides accurate results with full transparency into the calculation process. The step-by-step solutions help you understand not just the answer, but the methodology behind variance calculations.
              </p>
            </section>

            {/* What is Variance */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                What is Variance?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Variance is a numerical measure of how data points in a data set are spread out from their average value (mean). It's calculated by taking the average of the squared differences from the mean. The larger the variance, the more spread out the data points are; the smaller the variance, the closer the data points are to the mean.
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 mb-4">
                <h3 className="text-lg font-bold text-blue-900 mb-3">Key Characteristics:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Always a non-negative number (variance ≥ 0)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Expressed in squared units of the original data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Sensitive to outliers and extreme values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Used as a foundation for many other statistical measures</span>
                  </li>
                </ul>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                For example, if you measure the heights of students in a class and the variance is 25 cm², this tells you that the typical squared deviation from the mean height is 25 square centimeters. The standard deviation (square root of variance) would be 5 cm, which is more interpretable in the original units.
              </p>
            </section>

            {/* Sample vs Population Variance */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Sample Variance vs Population Variance
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Understanding the difference between sample variance and population variance is crucial for correct statistical analysis. Here's a comprehensive comparison:
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-2 border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                    <tr>
                      <th className="p-4 text-left font-semibold">Aspect</th>
                      <th className="p-4 text-left font-semibold">Sample Variance (s²)</th>
                      <th className="p-4 text-left font-semibold">Population Variance (σ²)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="border-b border-gray-200">
                      <td className="p-4 font-semibold text-gray-900">Definition</td>
                      <td className="p-4 text-gray-700">Variance of a subset of data</td>
                      <td className="p-4 text-gray-700">Variance of entire population</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Symbol</td>
                      <td className="p-4 text-gray-700">s²</td>
                      <td className="p-4 text-gray-700">σ² (sigma squared)</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 font-semibold text-gray-900">Divisor</td>
                      <td className="p-4 text-gray-700">n - 1 (Bessel's correction)</td>
                      <td className="p-4 text-gray-700">N (population size)</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">When to Use</td>
                      <td className="p-4 text-gray-700">Working with a sample from larger population</td>
                      <td className="p-4 text-gray-700">Have data for entire population</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-gray-900">Purpose</td>
                      <td className="p-4 text-gray-700">Estimate population variance</td>
                      <td className="p-4 text-gray-700">Describe actual population spread</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-6">
                <p className="text-gray-800 font-semibold mb-2">⚠️ Important Note:</p>
                <p className="text-gray-700">
                  Sample variance uses (n-1) instead of n as the divisor to provide an unbiased estimate of the population variance. This correction, known as Bessel's correction, compensates for the fact that sample data tends to be less spread out than the full population. Most real-world statistical analyses use sample variance unless you have data for the entire population.
                </p>
              </div>
            </section>

            {/* How to Use This Calculator */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Use This Calculator
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Select Variance Type:</strong>
                      <p className="text-gray-700 mt-1">Choose "Sample" if you're working with a subset of data, or "Population" if you have data for the entire population.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Enter Your Data:</strong>
                      <p className="text-gray-700 mt-1">Input your data values separated by commas or spaces. You need at least 2 numbers to calculate variance.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Click Calculate:</strong>
                      <p className="text-gray-700 mt-1">The calculator will compute variance, standard deviation, mean, sum of squares, and provide a complete deviation breakdown.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong className="text-gray-900">Review Results:</strong>
                      <p className="text-gray-700 mt-1">Examine the variance, standard deviation, summary statistics, deviation table, and step-by-step solution to fully understand the calculations.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
                    <div>
                      <strong className="text-gray-900">Interpret the Results:</strong>
                      <p className="text-gray-700 mt-1">Use the variance to understand data spread. Higher variance means more spread; lower variance means data is closer to the mean.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* Step-by-Step Calculation Guide */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Step-by-Step Calculation Guide
              </h2>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Calculating Sample Variance:</h3>
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <p className="font-semibold text-blue-900 mb-3">Example: Calculate sample variance for data set: 10, 12, 15, 16, 20</p>
                <ol className="space-y-3 text-gray-700">
                  <li><strong>Step 1:</strong> Count the data points: n = 5</li>
                  <li><strong>Step 2:</strong> Calculate the mean: x̄ = (10 + 12 + 15 + 16 + 20) / 5 = 73 / 5 = 14.6</li>
                  <li><strong>Step 3:</strong> Calculate deviations from mean:
                    <ul className="ml-6 mt-2 space-y-1 list-disc">
                      <li>10 - 14.6 = -4.6</li>
                      <li>12 - 14.6 = -2.6</li>
                      <li>15 - 14.6 = 0.4</li>
                      <li>16 - 14.6 = 1.4</li>
                      <li>20 - 14.6 = 5.4</li>
                    </ul>
                  </li>
                  <li><strong>Step 4:</strong> Square each deviation:
                    <ul className="ml-6 mt-2 space-y-1 list-disc">
                      <li>(-4.6)² = 21.16</li>
                      <li>(-2.6)² = 6.76</li>
                      <li>(0.4)² = 0.16</li>
                      <li>(1.4)² = 1.96</li>
                      <li>(5.4)² = 29.16</li>
                    </ul>
                  </li>
                  <li><strong>Step 5:</strong> Sum the squared deviations: SS = 21.16 + 6.76 + 0.16 + 1.96 + 29.16 = 59.2</li>
                  <li><strong>Step 6:</strong> Divide by (n-1): s² = 59.2 / (5-1) = 59.2 / 4 = 14.8</li>
                  <li><strong>Step 7:</strong> Standard deviation: s = √14.8 ≈ 3.847</li>
                </ol>
                <p className="mt-4 p-3 bg-white rounded-lg font-semibold text-blue-900">
                  Result: Sample variance = 14.8, Sample standard deviation ≈ 3.847
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Calculating Population Variance:</h3>
              <div className="bg-cyan-50 rounded-xl p-6">
                <p className="font-semibold text-cyan-900 mb-3">Example: Calculate population variance for the same data set</p>
                <ol className="space-y-3 text-gray-700">
                  <li><strong>Steps 1-5:</strong> Same as sample variance (count, mean, deviations, squared deviations, sum of squares = 59.2)</li>
                  <li><strong>Step 6:</strong> Divide by N: σ² = 59.2 / 5 = 11.84</li>
                  <li><strong>Step 7:</strong> Standard deviation: σ = √11.84 ≈ 3.441</li>
                </ol>
                <p className="mt-4 p-3 bg-white rounded-lg font-semibold text-cyan-900">
                  Result: Population variance = 11.84, Population standard deviation ≈ 3.441
                </p>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Applications
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-blue-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Finance & Investing
                  </h3>
                  <p className="text-gray-700">Measure investment risk and volatility. Higher variance in stock returns indicates greater risk. Portfolio managers use variance to balance risk and return in investment strategies.</p>
                </div>

                <div className="bg-white border-2 border-blue-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-3">Quality Control</h3>
                  <p className="text-gray-700">Manufacturing uses variance to ensure product consistency. Low variance in product measurements indicates consistent quality, while high variance suggests inconsistent production processes.</p>
                </div>

                <div className="bg-white border-2 border-blue-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-3">Scientific Research</h3>
                  <p className="text-gray-700">Researchers use variance to assess experimental reliability and measurement precision. Low variance in repeated measurements indicates reliable, reproducible results.</p>
                </div>

                <div className="bg-white border-2 border-blue-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-3">Education & Testing</h3>
                  <p className="text-gray-700">Analyze test score distributions and student performance variability. High variance suggests diverse skill levels, while low variance indicates uniform performance across students.</p>
                </div>

                <div className="bg-white border-2 border-blue-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-3">Weather & Climate</h3>
                  <p className="text-gray-700">Meteorologists use variance to analyze temperature fluctuations, rainfall variability, and climate patterns. Helps predict weather extremes and climate change impacts.</p>
                </div>

                <div className="bg-white border-2 border-blue-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-3">Healthcare & Medicine</h3>
                  <p className="text-gray-700">Medical professionals use variance to assess treatment effectiveness, patient response variability, and diagnostic test reliability. Critical for clinical trials and medical research.</p>
                </div>
              </div>
            </section>

            {/* Common Mistakes to Avoid */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Mistakes to Avoid
              </h2>
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 1: Using Wrong Variance Type
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Using population variance (dividing by n) when you have sample data.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Use sample variance (dividing by n-1) when working with a subset of data to get an unbiased estimate.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 2: Forgetting to Square Deviations
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Adding up deviations without squaring them first.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Always square each deviation before summing. This ensures all values are positive and emphasizes larger deviations.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 3: Confusing Variance with Standard Deviation
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Treating variance and standard deviation as interchangeable.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Standard deviation = √(variance). Variance is in squared units; standard deviation is in original units.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 4: Using Incorrect Mean
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Using an estimated or rounded mean for variance calculations.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Always calculate the exact mean from your data set first. Rounding the mean can introduce significant errors in variance.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 5: Ignoring Units
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Forgetting that variance is in squared units of the original data.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> If data is in meters, variance is in meters². For interpretation, use standard deviation (meters) instead.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 6: Rounding Too Early
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Rounding intermediate calculations (mean, deviations) before final result.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Keep full precision throughout all calculations. Only round the final variance and standard deviation.
                  </p>
                </div>
              </div>
            </section>

            {/* Tips and Tricks */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Tips and Tricks
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Computational Formula</h3>
                  <p className="text-gray-700">Use the computational formula s² = [Σx² - (Σx)²/n] / (n-1) for easier calculation with large datasets. It's algebraically equivalent but requires less intermediate steps.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Check Your Work</h3>
                  <p className="text-gray-700">Verify that Σ(deviations) ≈ 0. The sum of deviations from the mean should be zero (or very close due to rounding). If not, you've made an error in calculating the mean or deviations.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Interpret Relative to Mean</h3>
                  <p className="text-gray-700">Compare variance to the mean. For meaningful interpretation, calculate the coefficient of variation (CV = standard deviation / mean × 100%) to compare variability across different datasets.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Watch for Outliers</h3>
                  <p className="text-gray-700">Variance is sensitive to outliers because deviations are squared. One extreme value can dramatically increase variance. Always check for and consider outliers in your analysis.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Use Standard Deviation for Interpretation</h3>
                  <p className="text-gray-700">While variance is useful for calculations, standard deviation (√variance) is easier to interpret because it's in the same units as your data. Report both when appropriate.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Minimum Variance = 0</h3>
                  <p className="text-gray-700">Variance equals zero only when all values are identical. If you get zero variance, all your data points are the same. If you get negative variance, you've made a calculation error.</p>
                </div>
              </div>
            </section>

            {/* Variance Properties */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Important Properties of Variance
              </h2>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">Non-Negativity Property</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Var(X) ≥ 0</strong> - Variance is always non-negative because it's based on squared deviations. Zero variance means no variability (all values are identical).
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">Constant Addition Property</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Var(X + c) = Var(X)</strong> - Adding a constant to all data points doesn't change the variance. The spread remains the same; only the location shifts.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">Constant Multiplication Property</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Var(cX) = c²Var(X)</strong> - Multiplying all data by a constant multiplies the variance by the square of that constant. This is why variance has squared units.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">Independence Property</h3>
                  <p className="text-gray-700">
                    For independent variables X and Y: <strong>Var(X + Y) = Var(X) + Var(Y)</strong>. Variances add for independent variables, which is fundamental to many statistical analyses.
                  </p>
                </div>
              </div>
            </section>

            {/* Practice Problems */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Practice Problems
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Test your understanding with these practice problems. Use our calculator to check your answers!
              </p>
              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-6">
                  <p className="font-semibold text-blue-900 mb-2">Problem 1: Beginner</p>
                  <p className="text-gray-700">
                    Calculate the sample variance for the data set: 5, 7, 9, 11, 13
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: First find the mean, then calculate squared deviations.</span>
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-6">
                  <p className="font-semibold text-blue-900 mb-2">Problem 2: Beginner</p>
                  <p className="text-gray-700">
                    Find the population variance for: 2, 4, 6, 8
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: Population variance divides by N, not (N-1).</span>
                  </p>
                </div>

                <div className="bg-cyan-50 border-l-4 border-cyan-500 rounded-xl p-6">
                  <p className="font-semibold text-cyan-900 mb-2">Problem 3: Intermediate</p>
                  <p className="text-gray-700">
                    A sample has variance 16. What is the standard deviation? If each value in the dataset is multiplied by 3, what is the new variance?
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: Remember the relationship between variance and standard deviation, and how variance changes with multiplication.</span>
                  </p>
                </div>

                <div className="bg-cyan-50 border-l-4 border-cyan-500 rounded-xl p-6">
                  <p className="font-semibold text-cyan-900 mb-2">Problem 4: Intermediate</p>
                  <p className="text-gray-700">
                    The mean of a dataset is 50 and the variance is 25. All values are increased by 10. What are the new mean and variance?
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: Think about how adding a constant affects mean vs. variance.</span>
                  </p>
                </div>

                <div className="bg-teal-50 border-l-4 border-teal-500 rounded-xl p-6">
                  <p className="font-semibold text-teal-900 mb-2">Problem 5: Advanced</p>
                  <p className="text-gray-700">
                    Sample A: 10, 20, 30, 40, 50. Sample B: 28, 29, 30, 31, 32. Which sample has greater variance? Why does this make sense intuitively?
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: Both have the same mean, but different spreads.</span>
                  </p>
                </div>

                <div className="bg-teal-50 border-l-4 border-teal-500 rounded-xl p-6">
                  <p className="font-semibold text-teal-900 mb-2">Problem 6: Challenge</p>
                  <p className="text-gray-700">
                    Test scores have a mean of 75 and standard deviation of 8. If scores are converted using the formula (New = 2 × Old + 10), what are the new mean and standard deviation?
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: Apply both constant multiplication and addition properties.</span>
                  </p>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is the difference between variance and standard deviation?
                  </h3>
                  <p className="text-gray-700">
                    Variance (s² or σ²) is the average of squared deviations from the mean, while standard deviation (s or σ) is the square root of variance. Standard deviation is in the same units as the original data, making it more interpretable. Variance is in squared units. For example, if data is in meters, variance is in meters² and standard deviation is in meters. Both measure spread, but standard deviation is generally easier to understand.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    When should I use sample variance vs population variance?
                  </h3>
                  <p className="text-gray-700">
                    Use sample variance (s²) when you're working with a subset of data from a larger population and want to estimate the population variance. Use population variance (σ²) only when you have data for the entire population. In practice, most analyses use sample variance because we rarely have complete population data. The key difference is the divisor: sample variance divides by (n-1) while population variance divides by N.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why does sample variance divide by (n-1) instead of n?
                  </h3>
                  <p className="text-gray-700">
                    This is called Bessel's correction. When we use sample data to estimate population variance, dividing by n tends to underestimate the true population variance because the sample mean is closer to the sample data than the population mean would be. Dividing by (n-1) instead of n corrects this bias and provides an unbiased estimate of the population variance. This is why sample variance using (n-1) is also called "unbiased variance."
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can variance be negative?
                  </h3>
                  <p className="text-gray-700">
                    No, variance cannot be negative. Since variance is calculated by squaring deviations from the mean and then averaging them, and squared numbers are always non-negative, variance must be non-negative (≥ 0). The minimum variance is zero, which occurs only when all data points are identical. If you calculate a negative variance, you've made an error in your calculations—check your arithmetic, especially the mean calculation and the divisor.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What does a high variance mean?
                  </h3>
                  <p className="text-gray-700">
                    High variance indicates that data points are spread far from the mean, showing high variability or diversity in the dataset. For example, in finance, high variance in stock returns indicates high volatility and risk. In quality control, high variance suggests inconsistent production. However, "high" is relative—compare variance to the mean or to variances in similar datasets. The coefficient of variation (CV = standard deviation/mean) helps make this comparison.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What does a low variance mean?
                  </h3>
                  <p className="text-gray-700">
                    Low variance indicates that data points cluster closely around the mean, showing consistency and homogeneity. For example, low variance in test scores suggests students performed similarly. In manufacturing, low variance indicates consistent, high-quality production. Zero variance means all values are identical. Low variance isn't always desirable—in some contexts like investment portfolios, you might want some variability for potential returns.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How does variance relate to normal distribution?
                  </h3>
                  <p className="text-gray-700">
                    In a normal distribution, variance (or standard deviation) determines the spread of the bell curve. About 68% of data falls within 1 standard deviation of the mean, 95% within 2 standard deviations, and 99.7% within 3 standard deviations. This is the empirical rule (68-95-99.7 rule). Higher variance means a wider, flatter bell curve; lower variance means a narrower, taller curve. Variance is one of the two parameters (along with mean) that completely define a normal distribution.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is sum of squares (SS)?
                  </h3>
                  <p className="text-gray-700">
                    Sum of squares (SS) is the total of all squared deviations from the mean: SS = Σ(xᵢ - x̄)². It's the numerator in the variance formula. SS represents the total variation in the dataset. Variance is essentially the average squared deviation, calculated by dividing SS by n (for population) or (n-1) (for sample). SS is fundamental to many statistical techniques including ANOVA and regression analysis.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How are outliers affected by variance?
                  </h3>
                  <p className="text-gray-700">
                    Variance is very sensitive to outliers because deviations are squared. A single extreme value can dramatically increase variance. For example, the dataset (1, 2, 3, 4, 5) has variance ≈2.5, but (1, 2, 3, 4, 100) has variance ≈1,555. If outliers are errors or anomalies, consider removing them. If they're legitimate data, report both the variance with and without outliers, or use robust measures of spread like interquartile range (IQR) that are less sensitive to outliers.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can I compare variances of datasets with different means?
                  </h3>
                  <p className="text-gray-700">
                    Yes, but use caution. Variance magnitude depends on both spread and scale. A dataset with values 1000-1100 will have much larger variance than 1-10 even with similar relative spread. For meaningful comparison across datasets with different means or units, use the coefficient of variation (CV = standard deviation / mean × 100%), which expresses variability as a percentage of the mean. This allows you to compare relative variability independent of scale.
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Conclusion
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our Variance Calculator provides a comprehensive, user-friendly tool for calculating both sample and population variance with complete transparency and educational value. Whether you're a statistics student learning about variability measures, a researcher analyzing experimental data, a business analyst examining performance metrics, or a data scientist working on machine learning models, this calculator delivers accurate results with detailed explanations.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Understanding variance is fundamental to statistics, data analysis, and research. By mastering variance calculations and interpretations, you develop critical analytical skills for understanding data spread, variability, and distribution. The step-by-step solutions provided by our calculator help you learn the methodology, not just obtain the answer, building deeper statistical understanding.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Start using our calculator today to compute variance and standard deviation quickly, verify your homework, prepare for exams, or analyze your research data. With proper mathematical notation, detailed deviation breakdowns, summary statistics, and comprehensive explanations, understanding and applying variance concepts has never been easier. Make this calculator your essential tool for all statistical variance calculations and build confidence in your data analysis skills!
              </p>
            </section>

          </div>
        </div>
      </div>

      {/* Book Your Session CTA */}
      <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Need Help with Statistics and Data Analysis?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master variance, standard deviation, probability distributions, and statistical analysis. Get personalized one-on-one guidance tailored to your learning style.
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
