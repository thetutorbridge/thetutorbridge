'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Calculator } from 'lucide-react';

interface CalculationResult {
  standardDeviation: number;
  variance: number;
  count: number;
  mean: number;
  sumOfSquares: number;
  values: number[];
  deviations: { value: number; deviation: number; deviationSquared: number }[];
  type: 'sample' | 'population';
}

export default function StandardDeviationCalculator() {
  const [dataSet, setDataSet] = useState('');
  const [calculationType, setCalculationType] = useState<'sample' | 'population'>('sample');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateStandardDeviation = () => {
    // Parse the input data
    const values = dataSet
      .split(/[\s,]+/)
      .map((val) => val.trim())
      .filter((val) => val !== '')
      .map((val) => parseFloat(val))
      .filter((val) => !isNaN(val));

    if (values.length === 0) {
      alert('Please enter valid numbers');
      return;
    }

    if (values.length === 1 && calculationType === 'sample') {
      alert('Sample standard deviation requires at least 2 values');
      return;
    }

    // Calculate mean
    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean = sum / values.length;

    // Calculate deviations and squared deviations
    const deviations = values.map((value) => {
      const deviation = value - mean;
      const deviationSquared = deviation * deviation;
      return { value, deviation, deviationSquared };
    });

    // Calculate sum of squares
    const sumOfSquares = deviations.reduce((acc, item) => acc + item.deviationSquared, 0);

    // Calculate variance
    const divisor = calculationType === 'sample' ? values.length - 1 : values.length;
    const variance = sumOfSquares / divisor;

    // Calculate standard deviation
    const standardDeviation = Math.sqrt(variance);

    setResult({
      standardDeviation,
      variance,
      count: values.length,
      mean,
      sumOfSquares,
      values,
      deviations,
      type: calculationType,
    });
  };

  const handleClear = () => {
    setDataSet('');
    setResult(null);
  };

  const renderSampleFormula = () => (
    <div className="flex flex-col items-center gap-6 my-8">
      <div className="flex items-center gap-3 text-lg md:text-xl">
        <span className="font-semibold text-2xl">s = </span>
        <div className="flex items-center">
          <span className="text-4xl">√</span>
          <div className="inline-flex flex-col items-center ml-1">
            <div className="border-b-2 border-gray-900 pb-1 px-4">
              <span className="text-xl">Σ </span>
              <span className="text-sm align-top">n</span>
              <span className="text-sm align-bottom">i=1</span>
              <span> (x</span>
              <span className="text-sm align-bottom">i</span>
              <span> − </span>
              <span className="text-xl">x̄</span>
              <span>)</span>
              <span className="text-sm align-top">2</span>
            </div>
            <span className="pt-1 px-4">n − 1</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-lg md:text-xl">
        <span className="font-semibold text-2xl">s = </span>
        <div className="flex items-center">
          <span className="text-4xl">√</span>
          <div className="inline-flex flex-col items-center ml-1">
            <div className="border-b-2 border-gray-900 pb-1 px-4">
              <span>SS</span>
            </div>
            <span className="pt-1 px-4">n − 1</span>
          </div>
        </div>
      </div>

      <div className="text-xl md:text-2xl font-semibold">
        s = ?
      </div>
    </div>
  );

  const renderPopulationFormula = () => (
    <div className="flex flex-col items-center gap-6 my-8">
      <div className="flex items-center gap-3 text-lg md:text-xl">
        <span className="font-semibold text-2xl">σ = </span>
        <div className="flex items-center">
          <span className="text-4xl">√</span>
          <div className="inline-flex flex-col items-center ml-1">
            <div className="border-b-2 border-gray-900 pb-1 px-4">
              <span className="text-xl">Σ </span>
              <span className="text-sm align-top">N</span>
              <span className="text-sm align-bottom">i=1</span>
              <span> (x</span>
              <span className="text-sm align-bottom">i</span>
              <span> − μ)</span>
              <span className="text-sm align-top">2</span>
            </div>
            <span className="pt-1 px-4">N</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-lg md:text-xl">
        <span className="font-semibold text-2xl">σ = </span>
        <div className="flex items-center">
          <span className="text-4xl">√</span>
          <div className="inline-flex flex-col items-center ml-1">
            <div className="border-b-2 border-gray-900 pb-1 px-4">
              <span>SS</span>
            </div>
            <span className="pt-1 px-4">N</span>
          </div>
        </div>
      </div>

      <div className="text-xl md:text-2xl font-semibold">
        σ = ?
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8 mt-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl mb-6 shadow-lg">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Standard Deviation Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate sample and population standard deviation with step-by-step solutions and proper mathematical notation
          </p>
        </div>

        {/* Calculator Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-center py-4 rounded-xl mb-6">
              <h2 className="text-2xl font-bold">Standard Deviation Calculator</h2>
            </div>

            {/* Input Section */}
            <div className="space-y-6 mb-6">
              <div>
                <Label htmlFor="dataSet" className="text-lg font-semibold mb-2 block text-center">
                  Enter Data Set
                </Label>
                <textarea
                  id="dataSet"
                  value={dataSet}
                  onChange={(e) => setDataSet(e.target.value)}
                  placeholder="Enter numbers separated by spaces or commas (e.g., 2, 4, 4, 4, 5, 5, 7, 9)"
                  className="w-full h-32 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Sample/Population Radio Buttons */}
              <div className="flex justify-center gap-8">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="calculationType"
                    value="sample"
                    checked={calculationType === 'sample'}
                    onChange={() => setCalculationType('sample')}
                    className="w-5 h-5 text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-3 text-lg font-medium">Sample</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="calculationType"
                    value="population"
                    checked={calculationType === 'population'}
                    onChange={() => setCalculationType('population')}
                    className="w-5 h-5 text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-3 text-lg font-medium">Population</span>
                </label>
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
                onClick={calculateStandardDeviation}
                className="flex-1 py-6 text-lg font-semibold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
              >
                Calculate
              </Button>
            </div>

            {/* Answer Section */}
            {result && (
              <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
                <h3 className="text-xl font-bold mb-4">Answer:</h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-300">
                    <span className="text-lg font-semibold">Standard Deviation</span>
                    <span className="text-lg">
                      {result.type === 'sample' ? 's' : 'σ'} = {result.standardDeviation.toFixed(4)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-300">
                    <span className="text-lg font-semibold">Variance</span>
                    <span className="text-lg">
                      {result.type === 'sample' ? 's' : 'σ'}
                      <sup>2</sup> = {result.variance.toFixed(4)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-300">
                    <span className="text-lg font-semibold">Count</span>
                    <span className="text-lg">n = {result.count}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-300">
                    <span className="text-lg font-semibold">Mean</span>
                    <span className="text-lg">x̄ = {result.mean.toFixed(4)}</span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-lg font-semibold">Sum of Squares</span>
                    <span className="text-lg">SS = {result.sumOfSquares.toFixed(4)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Solution Section */}
            {result && (
              <div className="mt-8 border-2 border-gray-300 rounded-lg p-6 bg-white">
                <h3 className="text-2xl font-bold mb-6 text-center">Solution</h3>

                {result.type === 'sample' ? renderSampleFormula() : renderPopulationFormula()}

                <div className="mt-8 space-y-6">
                  {/* Step 1: Calculate Mean */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-bold text-lg mb-3">Step 1: Calculate the Mean (x̄)</h4>
                    <p className="text-gray-700 mb-2">
                      Mean = Sum of all values ÷ Count
                    </p>
                    <p className="text-lg">
                      x̄ = ({result.values.join(' + ')}) ÷ {result.count}
                    </p>
                    <p className="text-lg font-semibold mt-2">
                      x̄ = {result.mean.toFixed(4)}
                    </p>
                  </div>

                  {/* Step 2: Calculate Deviations */}
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-bold text-lg mb-3">Step 2: Calculate Deviations from Mean</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-green-200">
                            <th className="border border-green-400 px-4 py-2">Value (x<sub>i</sub>)</th>
                            <th className="border border-green-400 px-4 py-2">Deviation (x<sub>i</sub> − x̄)</th>
                            <th className="border border-green-400 px-4 py-2">Deviation² (x<sub>i</sub> − x̄)²</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.deviations.map((item, index) => (
                            <tr key={index} className="text-center">
                              <td className="border border-green-400 px-4 py-2">{item.value}</td>
                              <td className="border border-green-400 px-4 py-2">{item.deviation.toFixed(4)}</td>
                              <td className="border border-green-400 px-4 py-2">{item.deviationSquared.toFixed(4)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Step 3: Calculate Sum of Squares */}
                  <div className="bg-yellow-50 rounded-lg p-6">
                    <h4 className="font-bold text-lg mb-3">Step 3: Calculate Sum of Squares (SS)</h4>
                    <p className="text-gray-700 mb-2">
                      SS = Σ(x<sub>i</sub> − x̄)²
                    </p>
                    <p className="text-lg">
                      SS = {result.deviations.map(d => d.deviationSquared.toFixed(4)).join(' + ')}
                    </p>
                    <p className="text-lg font-semibold mt-2">
                      SS = {result.sumOfSquares.toFixed(4)}
                    </p>
                  </div>

                  {/* Step 4: Calculate Variance */}
                  <div className="bg-purple-50 rounded-lg p-6">
                    <h4 className="font-bold text-lg mb-3">Step 4: Calculate Variance ({result.type === 'sample' ? 's²' : 'σ²'})</h4>
                    <p className="text-gray-700 mb-2">
                      {result.type === 'sample'
                        ? 'Sample Variance: s² = SS ÷ (n − 1)'
                        : 'Population Variance: σ² = SS ÷ N'
                      }
                    </p>
                    <p className="text-lg">
                      {result.type === 'sample' ? 's' : 'σ'}² = {result.sumOfSquares.toFixed(4)} ÷ {result.type === 'sample' ? `(${result.count} − 1)` : result.count}
                    </p>
                    <p className="text-lg">
                      {result.type === 'sample' ? 's' : 'σ'}² = {result.sumOfSquares.toFixed(4)} ÷ {result.type === 'sample' ? result.count - 1 : result.count}
                    </p>
                    <p className="text-lg font-semibold mt-2">
                      {result.type === 'sample' ? 's' : 'σ'}² = {result.variance.toFixed(4)}
                    </p>
                  </div>

                  {/* Step 5: Calculate Standard Deviation */}
                  <div className="bg-red-50 rounded-lg p-6">
                    <h4 className="font-bold text-lg mb-3">Step 5: Calculate Standard Deviation ({result.type === 'sample' ? 's' : 'σ'})</h4>
                    <p className="text-gray-700 mb-2">
                      Standard Deviation = √Variance
                    </p>
                    <p className="text-lg">
                      {result.type === 'sample' ? 's' : 'σ'} = √{result.variance.toFixed(4)}
                    </p>
                    <p className="text-xl font-bold mt-2 text-red-700">
                      {result.type === 'sample' ? 's' : 'σ'} = {result.standardDeviation.toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="max-w-4xl mx-auto space-y-8 mb-12">
          {/* What is Standard Deviation */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Standard Deviation?</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Standard deviation is a fundamental statistical measure that quantifies the amount of variation or dispersion in a set of data values. It tells us how spread out the numbers in a dataset are from their average (mean) value. A low standard deviation indicates that the data points tend to be close to the mean, while a high standard deviation indicates that the data points are spread out over a wider range of values.
              </p>
              <p>
                In practical terms, standard deviation helps us understand the reliability and consistency of data. For instance, in quality control, a low standard deviation in product measurements indicates consistent manufacturing, while in finance, it measures the volatility of stock prices or investment returns.
              </p>
              <p>
                The standard deviation is expressed in the same units as the original data, making it more interpretable than variance (which is in squared units). For example, if you're measuring heights in centimeters, the standard deviation will also be in centimeters, allowing for direct comparison with the original measurements.
              </p>
            </div>
          </section>

          {/* Sample vs Population Standard Deviation */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Sample vs. Population Standard Deviation</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Understanding the difference between sample and population standard deviation is crucial for accurate statistical analysis:
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Population Standard Deviation (σ)</h3>
              <p>
                The population standard deviation (denoted by the Greek letter σ, sigma) is used when you have data for the entire population. A population includes all members of a specified group. For example, if you're analyzing test scores for all students in a specific class, you're working with the complete population.
              </p>
              <p>
                The formula for population standard deviation is:
              </p>
              <div className="bg-gray-100 p-6 rounded-lg my-4 text-center text-xl">
                σ = √[Σ(x<sub>i</sub> − μ)² / N]
              </div>
              <p>
                Where μ (mu) is the population mean, N is the population size, and we divide by N because we're working with the complete dataset.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Sample Standard Deviation (s)</h3>
              <p>
                The sample standard deviation (denoted by 's') is used when you have data from a sample—a subset of the population. Samples are used when it's impractical or impossible to collect data from the entire population. For instance, polling 1,000 voters out of millions to predict election outcomes.
              </p>
              <p>
                The formula for sample standard deviation is:
              </p>
              <div className="bg-gray-100 p-6 rounded-lg my-4 text-center text-xl">
                s = √[Σ(x<sub>i</sub> − x̄)² / (n − 1)]
              </div>
              <p>
                Where x̄ (x-bar) is the sample mean, n is the sample size, and we divide by (n − 1) instead of n. This is called Bessel's correction, which provides an unbiased estimate of the population standard deviation. Using (n − 1) accounts for the fact that we're estimating the population mean from the sample, which uses up one degree of freedom.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">When to Use Which?</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Use Population Standard Deviation (σ)</strong> when you have measurements for every member of the group you're interested in studying.
                </li>
                <li>
                  <strong>Use Sample Standard Deviation (s)</strong> when you're working with a subset of data and want to make inferences about the larger population.
                </li>
              </ul>
              <p>
                In most real-world applications, you'll use the sample standard deviation because collecting data from entire populations is often impractical. The (n − 1) denominator in the sample formula produces a slightly larger standard deviation than if we used n, which helps compensate for the uncertainty introduced by not having the complete population data.
              </p>
            </div>
          </section>

          {/* How to Calculate Standard Deviation */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Calculate Standard Deviation Step-by-Step</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Calculating standard deviation by hand involves five systematic steps. Let's work through an example with the dataset: 2, 4, 4, 4, 5, 5, 7, 9 (calculating sample standard deviation).
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Step 1: Calculate the Mean</h3>
              <p>
                Add all the values together and divide by the count of values:
              </p>
              <div className="bg-blue-50 p-4 rounded-lg my-3">
                <p className="font-mono">Mean (x̄) = (2 + 4 + 4 + 4 + 5 + 5 + 7 + 9) ÷ 8</p>
                <p className="font-mono">x̄ = 40 ÷ 8 = 5</p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Step 2: Calculate Each Deviation from the Mean</h3>
              <p>
                Subtract the mean from each value to find how far each data point is from the average:
              </p>
              <div className="bg-green-50 p-4 rounded-lg my-3">
                <p className="font-mono">2 − 5 = −3</p>
                <p className="font-mono">4 − 5 = −1</p>
                <p className="font-mono">4 − 5 = −1</p>
                <p className="font-mono">4 − 5 = −1</p>
                <p className="font-mono">5 − 5 = 0</p>
                <p className="font-mono">5 − 5 = 0</p>
                <p className="font-mono">7 − 5 = 2</p>
                <p className="font-mono">9 − 5 = 4</p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Step 3: Square Each Deviation</h3>
              <p>
                Square each deviation to eliminate negative values and emphasize larger deviations:
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg my-3">
                <p className="font-mono">(−3)² = 9</p>
                <p className="font-mono">(−1)² = 1</p>
                <p className="font-mono">(−1)² = 1</p>
                <p className="font-mono">(−1)² = 1</p>
                <p className="font-mono">(0)² = 0</p>
                <p className="font-mono">(0)² = 0</p>
                <p className="font-mono">(2)² = 4</p>
                <p className="font-mono">(4)² = 16</p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Step 4: Calculate the Variance</h3>
              <p>
                Sum all the squared deviations and divide by (n − 1) for sample variance:
              </p>
              <div className="bg-purple-50 p-4 rounded-lg my-3">
                <p className="font-mono">Sum of Squares (SS) = 9 + 1 + 1 + 1 + 0 + 0 + 4 + 16 = 32</p>
                <p className="font-mono">Sample Variance (s²) = 32 ÷ (8 − 1) = 32 ÷ 7 ≈ 4.5714</p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Step 5: Take the Square Root</h3>
              <p>
                The standard deviation is the square root of the variance:
              </p>
              <div className="bg-red-50 p-4 rounded-lg my-3">
                <p className="font-mono">Sample Standard Deviation (s) = √4.5714 ≈ 2.1380</p>
              </div>

              <p className="mt-6">
                This means that, on average, the data points in our dataset deviate from the mean by approximately 2.14 units. This systematic approach ensures accurate calculation of standard deviation for any dataset.
              </p>
            </div>
          </section>

          {/* Understanding Variance */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Variance and Its Relationship to Standard Deviation</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Variance and standard deviation are intimately related statistical measures—in fact, variance is simply the square of the standard deviation (or conversely, standard deviation is the square root of variance). Both measure the spread or dispersion of data, but they express it differently.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">What is Variance?</h3>
              <p>
                Variance measures the average squared deviation from the mean. It quantifies how far a set of numbers is spread out from their average value. The formulas are:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Sample Variance:</strong> s² = Σ(x<sub>i</sub> − x̄)² / (n − 1)
                </li>
                <li>
                  <strong>Population Variance:</strong> σ² = Σ(x<sub>i</sub> − μ)² / N
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Why Use Standard Deviation Instead of Variance?</h3>
              <p>
                While variance is mathematically useful, it has a significant interpretability issue: it's expressed in squared units. If you're measuring heights in centimeters, the variance will be in square centimeters (cm²), which doesn't have an intuitive meaning in the context of height.
              </p>
              <p>
                Standard deviation solves this problem by taking the square root of variance, returning the measure to the original units. This makes it much easier to interpret and compare with the original data. In our height example, the standard deviation would be in centimeters, directly comparable to the actual height measurements.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">When to Use Each Measure</h3>
              <p>
                <strong>Use Standard Deviation when:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You need to communicate the spread of data to non-statisticians</li>
                <li>You want to express variability in the same units as your data</li>
                <li>You're calculating confidence intervals or margins of error</li>
                <li>You need an intuitive measure of typical deviation from the mean</li>
              </ul>

              <p className="mt-4">
                <strong>Use Variance when:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Performing statistical calculations like ANOVA (Analysis of Variance)</li>
                <li>Working with mathematical formulas where variance is more convenient</li>
                <li>Partitioning total variability into component parts</li>
                <li>Conducting theoretical statistical work</li>
              </ul>

              <p className="mt-6">
                In practical data analysis, standard deviation is generally preferred for reporting and interpretation because it's more intuitive. However, variance plays a crucial role in many statistical formulas and theoretical frameworks. Understanding both measures and their relationship strengthens your overall statistical literacy.
              </p>
            </div>
          </section>

          {/* Applications of Standard Deviation */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Applications of Standard Deviation</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Standard deviation is one of the most widely used statistical measures across diverse fields. Understanding its applications helps you appreciate its importance in data analysis and decision-making.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Finance and Investing</h3>
              <p>
                In finance, standard deviation is a fundamental measure of risk and volatility. Investment analysts use it to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Assess Investment Risk:</strong> A stock with a standard deviation of 15% in annual returns is more volatile (and therefore riskier) than one with a standard deviation of 5%.
                </li>
                <li>
                  <strong>Portfolio Diversification:</strong> Combining assets with different standard deviations can reduce overall portfolio risk.
                </li>
                <li>
                  <strong>Value at Risk (VaR):</strong> Financial institutions use standard deviation to calculate the potential loss in portfolio value under normal market conditions.
                </li>
                <li>
                  <strong>Options Pricing:</strong> The Black-Scholes model uses standard deviation (volatility) as a key input for pricing options.
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Quality Control and Manufacturing</h3>
              <p>
                Manufacturing industries rely heavily on standard deviation for process control:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Six Sigma:</strong> This quality control methodology aims to reduce defects by ensuring processes operate within six standard deviations from the mean, resulting in only 3.4 defects per million opportunities.
                </li>
                <li>
                  <strong>Statistical Process Control (SPC):</strong> Control charts use standard deviation to set upper and lower control limits, helping identify when a manufacturing process is going out of control.
                </li>
                <li>
                  <strong>Product Consistency:</strong> Lower standard deviation in product dimensions or characteristics indicates more consistent quality.
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Education and Testing</h3>
              <p>
                Educational institutions use standard deviation to analyze student performance:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Standardized Tests:</strong> SAT, GRE, and IQ tests use standard deviation to create standardized scores, allowing comparison across different test versions.
                </li>
                <li>
                  <strong>Grade Curving:</strong> Teachers may use standard deviation to adjust grades based on class performance distribution.
                </li>
                <li>
                  <strong>Class Performance Analysis:</strong> A high standard deviation in test scores suggests varied understanding levels, while low standard deviation indicates uniform performance.
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Weather and Climate Science</h3>
              <p>
                Meteorologists and climate scientists use standard deviation to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Temperature Variability:</strong> Assess how much daily temperatures vary from seasonal averages.
                </li>
                <li>
                  <strong>Precipitation Patterns:</strong> Analyze the consistency or variability of rainfall in different regions.
                </li>
                <li>
                  <strong>Climate Change Detection:</strong> Identify unusual weather patterns by comparing current measurements to historical standard deviations.
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Healthcare and Medicine</h3>
              <p>
                Medical professionals apply standard deviation in various ways:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Clinical Trials:</strong> Evaluate the consistency of treatment effects across patient populations.
                </li>
                <li>
                  <strong>Growth Charts:</strong> Pediatricians use standard deviation (expressed as percentiles) to track children's growth relative to population norms.
                </li>
                <li>
                  <strong>Lab Test Results:</strong> Establish normal ranges for blood tests and other diagnostic measurements.
                </li>
                <li>
                  <strong>Epidemiology:</strong> Analyze the spread of disease rates across different populations or time periods.
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Sports Analytics</h3>
              <p>
                Sports teams and analysts use standard deviation to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Player Consistency:</strong> Evaluate how consistently a player performs game-to-game. A lower standard deviation in scoring indicates more reliable performance.
                </li>
                <li>
                  <strong>Team Performance:</strong> Analyze team statistics to identify strengths and weaknesses in consistency.
                </li>
                <li>
                  <strong>Predictive Modeling:</strong> Create more accurate predictions by understanding the variability in team and player statistics.
                </li>
              </ul>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Mistakes When Calculating Standard Deviation</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Even experienced analysts sometimes make errors when calculating or interpreting standard deviation. Here are the most common mistakes and how to avoid them:
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">1. Confusing Sample and Population Formulas</h3>
              <p>
                <strong>The Mistake:</strong> Using the population formula (dividing by N) when you have sample data, or vice versa.
              </p>
              <p>
                <strong>Why It Matters:</strong> Using the wrong formula will give you an incorrect standard deviation. Using N instead of (n − 1) for sample data will systematically underestimate the true population standard deviation.
              </p>
              <p>
                <strong>How to Avoid:</strong> Ask yourself: "Do I have data for the entire population, or just a sample?" In most real-world situations, you're working with a sample, so use (n − 1) in the denominator.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">2. Forgetting to Square the Deviations</h3>
              <p>
                <strong>The Mistake:</strong> Adding up the deviations from the mean without squaring them first.
              </p>
              <p>
                <strong>Why It Matters:</strong> If you don't square the deviations, the positive and negative deviations will cancel each other out, always giving you a sum of zero (or very close to zero due to rounding).
              </p>
              <p>
                <strong>How to Avoid:</strong> Remember that the formula includes (x<sub>i</sub> − x̄)² — the squared deviations. Always square each deviation before summing them.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">3. Forgetting the Square Root</h3>
              <p>
                <strong>The Mistake:</strong> Calculating the variance but forgetting to take the square root to get the standard deviation.
              </p>
              <p>
                <strong>Why It Matters:</strong> Reporting variance when you meant to report standard deviation can lead to serious misinterpretation, as variance is in squared units and typically much larger than standard deviation.
              </p>
              <p>
                <strong>How to Avoid:</strong> Remember that standard deviation = √variance. Always take that final square root step, and double-check that your units make sense (should be the same as your original data, not squared).
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">4. Using Rounded Intermediate Values</h3>
              <p>
                <strong>The Mistake:</strong> Rounding the mean or intermediate calculations too early in the process.
              </p>
              <p>
                <strong>Why It Matters:</strong> Rounding errors accumulate, and can lead to a final answer that's significantly different from the true value, especially with large datasets.
              </p>
              <p>
                <strong>How to Avoid:</strong> Keep as many decimal places as possible during calculations, and only round your final answer. Most calculators and spreadsheets maintain high precision automatically.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">5. Misinterpreting Standard Deviation as Error</h3>
              <p>
                <strong>The Mistake:</strong> Thinking that standard deviation represents measurement error or uncertainty in the mean.
              </p>
              <p>
                <strong>Why It Matters:</strong> Standard deviation describes the spread of individual data points, not the precision of the mean itself. For uncertainty in the mean, you need the standard error (SE = s / √n).
              </p>
              <p>
                <strong>How to Avoid:</strong> Understand that standard deviation tells you about data variability, while standard error tells you about the precision of your estimate of the mean.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">6. Attempting to Calculate Sample SD with Only One Value</h3>
              <p>
                <strong>The Mistake:</strong> Trying to calculate sample standard deviation when n = 1.
              </p>
              <p>
                <strong>Why It Matters:</strong> When n = 1, the denominator (n − 1) becomes zero, making the calculation impossible (division by zero).
              </p>
              <p>
                <strong>How to Avoid:</strong> You need at least two data points to calculate sample standard deviation. With only one value, you can't measure variability in any meaningful way.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">7. Comparing Standard Deviations Across Different Scales</h3>
              <p>
                <strong>The Mistake:</strong> Directly comparing standard deviations of datasets with very different means or units.
              </p>
              <p>
                <strong>Why It Matters:</strong> A standard deviation of 10 is large if your mean is 20, but small if your mean is 10,000. Comparing raw standard deviations can be misleading.
              </p>
              <p>
                <strong>How to Avoid:</strong> Use the coefficient of variation (CV = [s / x̄] × 100%) to compare relative variability across datasets with different scales or units.
              </p>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What does a standard deviation of 0 mean?</h3>
                <p className="text-gray-700">
                  A standard deviation of 0 means there is no variability in the data—all values are identical. This would occur if you measured the same exact value multiple times, such as recording "5, 5, 5, 5" as your dataset. In this case, every value equals the mean, so all deviations are zero.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Can standard deviation be negative?</h3>
                <p className="text-gray-700">
                  No, standard deviation can never be negative. Since it's calculated as the square root of variance (which is the sum of squared values), the result must always be zero or positive. If you get a negative standard deviation, you've made a calculation error.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What's the difference between standard deviation and standard error?</h3>
                <p className="text-gray-700">
                  Standard deviation measures the variability of individual data points in a dataset, while standard error measures the precision of the sample mean as an estimate of the population mean. Standard error is calculated as SE = s / √n, where s is the standard deviation and n is the sample size. As sample size increases, standard error decreases, but standard deviation remains roughly constant.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How many data points do I need to calculate standard deviation?</h3>
                <p className="text-gray-700">
                  For population standard deviation, you can calculate it with any number of data points (even one, though it would be zero). For sample standard deviation, you need at least two data points because the formula uses (n − 1) in the denominator. With only one point, you'd divide by zero, which is undefined. However, for meaningful statistical analysis, you generally want much larger sample sizes—typically at least 30 for the central limit theorem to apply.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What does it mean when standard deviation is higher than the mean?</h3>
                <p className="text-gray-700">
                  When standard deviation exceeds the mean, it indicates very high relative variability in the data. This often occurs with right-skewed distributions or data that includes some very large outliers. For example, in income data, the standard deviation might exceed the mean because a small number of very high earners pull the standard deviation up while the mean remains relatively modest. This situation suggests you should examine your data carefully for outliers or consider whether the data follows a normal distribution.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How is standard deviation used in the 68-95-99.7 rule?</h3>
                <p className="text-gray-700">
                  The 68-95-99.7 rule (also called the empirical rule) applies to normal distributions and states that approximately 68% of data falls within 1 standard deviation of the mean, 95% within 2 standard deviations, and 99.7% within 3 standard deviations. This rule helps you understand what constitutes a "normal" value versus an outlier. For example, if test scores have a mean of 75 and standard deviation of 10, about 68% of students scored between 65 and 85.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Should I remove outliers before calculating standard deviation?</h3>
                <p className="text-gray-700">
                  This depends on your analysis goals. Outliers can significantly affect standard deviation, so if they represent data errors or aren't relevant to your analysis, removing them might be appropriate. However, if outliers represent genuine variability in your data, removing them would give a misleadingly low standard deviation that doesn't accurately represent your data's true spread. Always investigate outliers to understand their cause before deciding whether to include or exclude them, and document your decision-making process.
                </p>
              </div>
            </div>
          </section>

          {/* Tips for Students */}
          <section className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Tips for Students Learning Standard Deviation</h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Master the Conceptual Understanding First</h3>
                  <p>
                    Before memorizing formulas, understand what standard deviation represents: the average distance of data points from their mean. Visualize this with simple examples like comparing the consistency of two students' test scores or the variability in daily temperatures.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Practice with Small Datasets First</h3>
                  <p>
                    Start with datasets of 4-6 numbers to build confidence. Calculate each step manually: find the mean, compute deviations, square them, find the average, and take the square root. This hands-on practice solidifies understanding before moving to larger datasets or calculator usage.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Create a Step-by-Step Checklist</h3>
                  <p>
                    Write down the five steps and check them off as you go: (1) Calculate mean, (2) Find deviations, (3) Square deviations, (4) Calculate variance, (5) Take square root. This prevents skipping steps, especially forgetting to square deviations or take the final square root.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Remember the n vs. (n−1) Rule</h3>
                  <p>
                    Create a simple mnemonic: "Sample Subtracts One" to remember that sample standard deviation uses (n − 1). In most student problems and real-world applications, you'll be working with samples, not entire populations, so get comfortable with the (n − 1) formula.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  5
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Use Technology to Check Your Work</h3>
                  <p>
                    After calculating by hand, verify your answer using a calculator, spreadsheet, or online tool like this one. This helps you catch errors and builds confidence in your manual calculations. Understanding both methods makes you more versatile and reliable in statistical work.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                  6
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Connect to Real-World Context</h3>
                  <p>
                    Always interpret your results in context. Don't just calculate s = 12.5 and stop there. Ask: "What does this mean for my data?" In test scores, a standard deviation of 12.5 indicates moderate variability. In manufacturing tolerance, it might indicate concerning inconsistency. Context makes statistics meaningful.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Book Your Session CTA */}
          <section className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl shadow-2xl p-8 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Help with Statistics and Data Analysis?
            </h2>
            <p className="text-xl mb-8 text-red-50">
              Our expert tutors can help you master standard deviation, variance, and all statistical concepts with personalized one-on-one sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/book-demo-class"
                className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition-colors shadow-lg hover:shadow-xl inline-block"
              >
                Book a Free Demo Class
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-red-600 transition-colors inline-block"
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
