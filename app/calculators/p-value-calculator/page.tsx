'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, Home, BookOpen, ArrowRight, BarChart3, HelpCircle, Target, TrendingUp, AlertTriangle, Info, CheckCircle2, XCircle, ArrowLeftRight, ArrowLeft, ArrowRightIcon } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type TestType = 'z-score' | 't-score' | 'chi-square' | 'f-score';
type TailType = 'two-tailed' | 'left-tailed' | 'right-tailed';

interface PValueResult {
  testType: TestType;
  tailType: TailType;
  testStatistic: number;
  pValue: number;
  significanceLevel: number;
  isSignificant: boolean;
  degreesOfFreedom?: number;
  degreesOfFreedom2?: number;
  interpretation: string;
  decision: string;
}

// Error function approximation for normal distribution CDF
const erf = (x: number): number => {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
};

// Standard normal CDF (Phi function)
const normalCDF = (z: number): number => {
  return 0.5 * (1 + erf(z / Math.sqrt(2)));
};

// T-distribution CDF approximation using regularized incomplete beta function
const tCDF = (t: number, df: number): number => {
  const x = df / (df + t * t);
  const beta = incompleteBeta(x, df / 2, 0.5);

  if (t >= 0) {
    return 1 - 0.5 * beta;
  } else {
    return 0.5 * beta;
  }
};

// Incomplete beta function approximation
const incompleteBeta = (x: number, a: number, b: number): number => {
  if (x === 0) return 0;
  if (x === 1) return 1;

  // Use continued fraction approximation
  const bt = Math.exp(
    logGamma(a + b) - logGamma(a) - logGamma(b) +
    a * Math.log(x) + b * Math.log(1 - x)
  );

  if (x < (a + 1) / (a + b + 2)) {
    return bt * betaCF(x, a, b) / a;
  } else {
    return 1 - bt * betaCF(1 - x, b, a) / b;
  }
};

// Log gamma function approximation (Stirling's approximation)
const logGamma = (x: number): number => {
  const c = [
    76.18009172947146,
    -86.50532032941677,
    24.01409824083091,
    -1.231739572450155,
    0.1208650973866179e-2,
    -0.5395239384953e-5
  ];

  let y = x;
  let tmp = x + 5.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;

  for (let j = 0; j < 6; j++) {
    ser += c[j] / ++y;
  }

  return -tmp + Math.log(2.5066282746310005 * ser / x);
};

// Beta continued fraction
const betaCF = (x: number, a: number, b: number): number => {
  const maxIterations = 100;
  const epsilon = 1e-10;

  let qab = a + b;
  let qap = a + 1;
  let qam = a - 1;
  let c = 1;
  let d = 1 - qab * x / qap;

  if (Math.abs(d) < epsilon) d = epsilon;
  d = 1 / d;
  let h = d;

  for (let m = 1; m <= maxIterations; m++) {
    let m2 = 2 * m;
    let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < epsilon) d = epsilon;
    c = 1 + aa / c;
    if (Math.abs(c) < epsilon) c = epsilon;
    d = 1 / d;
    h *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < epsilon) d = epsilon;
    c = 1 + aa / c;
    if (Math.abs(c) < epsilon) c = epsilon;
    d = 1 / d;
    let del = d * c;
    h *= del;
    if (Math.abs(del - 1) < epsilon) break;
  }

  return h;
};

// Chi-square CDF using incomplete gamma function
const chiSquareCDF = (x: number, df: number): number => {
  if (x <= 0) return 0;
  return lowerIncompleteGamma(df / 2, x / 2) / gamma(df / 2);
};

// Gamma function
const gamma = (z: number): number => {
  return Math.exp(logGamma(z));
};

// Lower incomplete gamma function
const lowerIncompleteGamma = (a: number, x: number): number => {
  if (x < 0) return 0;
  if (x === 0) return 0;

  if (x < a + 1) {
    // Use series representation
    let sum = 1 / a;
    let term = 1 / a;
    for (let n = 1; n < 100; n++) {
      term *= x / (a + n);
      sum += term;
      if (Math.abs(term) < 1e-10 * Math.abs(sum)) break;
    }
    return Math.exp(-x + a * Math.log(x) - logGamma(a)) * sum;
  } else {
    // Use continued fraction
    return gamma(a) - upperIncompleteGamma(a, x);
  }
};

// Upper incomplete gamma function using continued fraction
const upperIncompleteGamma = (a: number, x: number): number => {
  let b = x + 1 - a;
  let c = 1 / 1e-30;
  let d = 1 / b;
  let h = d;

  for (let i = 1; i <= 100; i++) {
    let an = -i * (i - a);
    b += 2;
    d = an * d + b;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    c = b + an / c;
    if (Math.abs(c) < 1e-30) c = 1e-30;
    d = 1 / d;
    let del = d * c;
    h *= del;
    if (Math.abs(del - 1) < 1e-10) break;
  }

  return Math.exp(-x + a * Math.log(x) - logGamma(a)) * h;
};

// F-distribution CDF
const fCDF = (f: number, df1: number, df2: number): number => {
  if (f <= 0) return 0;
  const x = df1 * f / (df1 * f + df2);
  return incompleteBeta(x, df1 / 2, df2 / 2);
};

export default function PValueCalculator() {
  const [testType, setTestType] = useState<TestType>('z-score');
  const [tailType, setTailType] = useState<TailType>('two-tailed');
  const [testStatistic, setTestStatistic] = useState<string>('');
  const [significanceLevel, setSignificanceLevel] = useState<string>('0.05');
  const [degreesOfFreedom, setDegreesOfFreedom] = useState<string>('');
  const [degreesOfFreedom2, setDegreesOfFreedom2] = useState<string>('');
  const [result, setResult] = useState<PValueResult | null>(null);

  const calculatePValue = () => {
    const stat = parseFloat(testStatistic);
    const alpha = parseFloat(significanceLevel);
    const df = parseFloat(degreesOfFreedom);
    const df2 = parseFloat(degreesOfFreedom2);

    if (isNaN(stat)) {
      alert('Please enter a valid test statistic');
      return;
    }

    if (isNaN(alpha) || alpha <= 0 || alpha >= 1) {
      alert('Please enter a valid significance level (between 0 and 1)');
      return;
    }

    if ((testType === 't-score' || testType === 'chi-square') && (isNaN(df) || df <= 0)) {
      alert('Please enter valid degrees of freedom (must be positive)');
      return;
    }

    if (testType === 'f-score' && (isNaN(df) || df <= 0 || isNaN(df2) || df2 <= 0)) {
      alert('Please enter valid degrees of freedom for both numerator and denominator');
      return;
    }

    let pValue: number;

    switch (testType) {
      case 'z-score':
        if (tailType === 'left-tailed') {
          pValue = normalCDF(stat);
        } else if (tailType === 'right-tailed') {
          pValue = 1 - normalCDF(stat);
        } else {
          pValue = 2 * Math.min(normalCDF(stat), 1 - normalCDF(stat));
        }
        break;

      case 't-score':
        if (tailType === 'left-tailed') {
          pValue = tCDF(stat, df);
        } else if (tailType === 'right-tailed') {
          pValue = 1 - tCDF(stat, df);
        } else {
          pValue = 2 * Math.min(tCDF(stat, df), 1 - tCDF(stat, df));
        }
        break;

      case 'chi-square':
        // Chi-square is always right-tailed in typical hypothesis testing
        pValue = 1 - chiSquareCDF(stat, df);
        break;

      case 'f-score':
        // F-test is typically right-tailed
        pValue = 1 - fCDF(stat, df, df2);
        break;

      default:
        pValue = 0;
    }

    // Ensure p-value is within valid range
    pValue = Math.max(0, Math.min(1, pValue));

    const isSignificant = pValue < alpha;

    let interpretation: string;
    let decision: string;

    if (pValue < 0.001) {
      interpretation = 'Extremely strong evidence against the null hypothesis.';
    } else if (pValue < 0.01) {
      interpretation = 'Very strong evidence against the null hypothesis.';
    } else if (pValue < 0.05) {
      interpretation = 'Strong evidence against the null hypothesis.';
    } else if (pValue < 0.1) {
      interpretation = 'Weak evidence against the null hypothesis.';
    } else {
      interpretation = 'Little to no evidence against the null hypothesis.';
    }

    if (isSignificant) {
      decision = `Since p-value (${pValue.toFixed(6)}) < α (${alpha}), reject the null hypothesis.`;
    } else {
      decision = `Since p-value (${pValue.toFixed(6)}) ≥ α (${alpha}), fail to reject the null hypothesis.`;
    }

    setResult({
      testType,
      tailType,
      testStatistic: stat,
      pValue,
      significanceLevel: alpha,
      isSignificant,
      degreesOfFreedom: testType !== 'z-score' ? df : undefined,
      degreesOfFreedom2: testType === 'f-score' ? df2 : undefined,
      interpretation,
      decision,
    });
  };

  const handleClear = () => {
    setTestStatistic('');
    setDegreesOfFreedom('');
    setDegreesOfFreedom2('');
    setResult(null);
  };

  // Get test type description
  const getTestTypeDescription = (type: TestType): string => {
    switch (type) {
      case 'z-score':
        return 'Standard normal distribution (large samples, n ≥ 30)';
      case 't-score':
        return 'Student\'s t-distribution (small samples, unknown σ)';
      case 'chi-square':
        return 'Chi-square distribution (goodness of fit, independence)';
      case 'f-score':
        return 'F-distribution (comparing variances, ANOVA)';
      default:
        return '';
    }
  };

  // Get tail type description
  const getTailTypeDescription = (type: TailType): string => {
    switch (type) {
      case 'two-tailed':
        return 'H₁: μ ≠ μ₀ (different from)';
      case 'left-tailed':
        return 'H₁: μ < μ₀ (less than)';
      case 'right-tailed':
        return 'H₁: μ > μ₀ (greater than)';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-indigo-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-indigo-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">P-Value Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <BarChart3 className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              P-Value Calculator
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Calculate p-values from test statistics for hypothesis testing. Supports z-score, t-score, chi-square, and F-test with one-tailed and two-tailed options.
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
                  <Calculator className="w-6 h-6 text-indigo-600" />
                  Enter Test Details
                </h2>

                <div className="space-y-5">
                  {/* Test Type */}
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                      <BarChart3 className="w-4 h-4 mr-1 text-indigo-500" />
                      Test Statistic Type
                    </Label>
                    <Select value={testType} onValueChange={(value: TestType) => setTestType(value)}>
                      <SelectTrigger className="font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="z-score">Z-score (Normal)</SelectItem>
                        <SelectItem value="t-score">T-score (Student&apos;s t)</SelectItem>
                        <SelectItem value="chi-square">Chi-square (χ²)</SelectItem>
                        <SelectItem value="f-score">F-score (F-distribution)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">{getTestTypeDescription(testType)}</p>
                  </div>

                  {/* Test Statistic Value */}
                  <div>
                    <Label htmlFor="testStatistic" className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                      <Target className="w-4 h-4 mr-1 text-purple-500" />
                      Your {testType === 'chi-square' ? 'χ²' : testType === 'f-score' ? 'F' : testType === 't-score' ? 't' : 'Z'}-score
                    </Label>
                    <Input
                      id="testStatistic"
                      type="number"
                      step="any"
                      placeholder={testType === 'chi-square' || testType === 'f-score' ? 'e.g., 5.991' : 'e.g., 1.96'}
                      value={testStatistic}
                      onChange={(e) => setTestStatistic(e.target.value)}
                      className="text-lg font-semibold"
                    />
                  </div>

                  {/* Degrees of Freedom (for t, chi-square, F) */}
                  {testType !== 'z-score' && (
                    <div>
                      <Label htmlFor="df" className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                        <HelpCircle className="w-4 h-4 mr-1 text-blue-500" />
                        Degrees of Freedom {testType === 'f-score' ? '(df₁ - numerator)' : '(df)'}
                      </Label>
                      <Input
                        id="df"
                        type="number"
                        min="1"
                        step="1"
                        placeholder="e.g., 10"
                        value={degreesOfFreedom}
                        onChange={(e) => setDegreesOfFreedom(e.target.value)}
                        className="text-lg font-semibold"
                      />
                    </div>
                  )}

                  {/* Second Degrees of Freedom (for F-test only) */}
                  {testType === 'f-score' && (
                    <div>
                      <Label htmlFor="df2" className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                        <HelpCircle className="w-4 h-4 mr-1 text-blue-500" />
                        Degrees of Freedom (df₂ - denominator)
                      </Label>
                      <Input
                        id="df2"
                        type="number"
                        min="1"
                        step="1"
                        placeholder="e.g., 20"
                        value={degreesOfFreedom2}
                        onChange={(e) => setDegreesOfFreedom2(e.target.value)}
                        className="text-lg font-semibold"
                      />
                    </div>
                  )}

                  {/* Significance Level */}
                  <div>
                    <Label htmlFor="alpha" className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1 text-orange-500" />
                      Significance Level (α)
                    </Label>
                    <Select value={significanceLevel} onValueChange={setSignificanceLevel}>
                      <SelectTrigger className="font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.01">0.01 (1% - Very Strict)</SelectItem>
                        <SelectItem value="0.05">0.05 (5% - Standard)</SelectItem>
                        <SelectItem value="0.10">0.10 (10% - Lenient)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tail Type (not for chi-square and F) */}
                  {testType !== 'chi-square' && testType !== 'f-score' && (
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                        <ArrowLeftRight className="w-4 h-4 mr-1 text-teal-500" />
                        Type of Test
                      </Label>
                      <div className="space-y-2">
                        <button
                          onClick={() => setTailType('two-tailed')}
                          className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                            tailType === 'two-tailed'
                              ? 'bg-indigo-600 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <ArrowLeftRight className="w-4 h-4" />
                            Two-tailed
                          </span>
                          <span className="text-xs opacity-75">≠</span>
                        </button>
                        <button
                          onClick={() => setTailType('left-tailed')}
                          className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                            tailType === 'left-tailed'
                              ? 'bg-indigo-600 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Left-tailed
                          </span>
                          <span className="text-xs opacity-75">&lt;</span>
                        </button>
                        <button
                          onClick={() => setTailType('right-tailed')}
                          className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                            tailType === 'right-tailed'
                              ? 'bg-indigo-600 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <ArrowRightIcon className="w-4 h-4" />
                            Right-tailed
                          </span>
                          <span className="text-xs opacity-75">&gt;</span>
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{getTailTypeDescription(tailType)}</p>
                    </div>
                  )}

                  {/* Note for chi-square and F */}
                  {(testType === 'chi-square' || testType === 'f-score') && (
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <Info className="w-4 h-4 inline mr-1" />
                        {testType === 'chi-square'
                          ? 'Chi-square tests are typically right-tailed.'
                          : 'F-tests are typically right-tailed.'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={calculatePValue}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate P-Value
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
                  {/* Main Result Card */}
                  <div className={`rounded-2xl shadow-xl p-6 md:p-8 text-white ${
                    result.isSignificant
                      ? 'bg-gradient-to-br from-green-600 to-emerald-600'
                      : 'bg-gradient-to-br from-indigo-600 to-purple-600'
                  }`}>
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <BarChart3 className="w-6 h-6" />
                      P-Value Result
                    </h3>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                        <p className="text-white/70 text-sm mb-1">P-Value</p>
                        <p className="text-3xl md:text-4xl font-bold">
                          {result.pValue < 0.0001
                            ? '< 0.0001'
                            : result.pValue.toFixed(6)}
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                        <p className="text-white/70 text-sm mb-1">Significance Level (α)</p>
                        <p className="text-3xl md:text-4xl font-bold">{result.significanceLevel}</p>
                      </div>
                    </div>

                    {/* Decision */}
                    <div className={`rounded-xl p-4 text-center ${
                      result.isSignificant ? 'bg-green-500/30' : 'bg-white/10'
                    }`}>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        {result.isSignificant ? (
                          <CheckCircle2 className="w-6 h-6 text-green-200" />
                        ) : (
                          <XCircle className="w-6 h-6 text-white/70" />
                        )}
                        <span className="text-lg font-semibold">
                          {result.isSignificant ? 'Statistically Significant' : 'Not Statistically Significant'}
                        </span>
                      </div>
                      <p className="text-sm text-white/80">{result.decision}</p>
                    </div>
                  </div>

                  {/* Interpretation Card */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Info className="w-5 h-5 text-indigo-600" />
                      Interpretation
                    </h3>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
                        <p className="text-gray-700">{result.interpretation}</p>
                      </div>

                      {/* P-Value Scale */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Evidence Strength Scale:</h4>
                        <div className="space-y-2 text-sm">
                          <div className={`flex items-center gap-2 p-2 rounded ${result.pValue < 0.001 ? 'bg-green-100 border border-green-300' : ''}`}>
                            <span className="font-mono text-green-700">p &lt; 0.001</span>
                            <span className="text-gray-600">— Extremely strong evidence</span>
                          </div>
                          <div className={`flex items-center gap-2 p-2 rounded ${result.pValue >= 0.001 && result.pValue < 0.01 ? 'bg-green-100 border border-green-300' : ''}`}>
                            <span className="font-mono text-green-600">p &lt; 0.01</span>
                            <span className="text-gray-600">— Very strong evidence</span>
                          </div>
                          <div className={`flex items-center gap-2 p-2 rounded ${result.pValue >= 0.01 && result.pValue < 0.05 ? 'bg-yellow-100 border border-yellow-300' : ''}`}>
                            <span className="font-mono text-yellow-700">p &lt; 0.05</span>
                            <span className="text-gray-600">— Strong evidence</span>
                          </div>
                          <div className={`flex items-center gap-2 p-2 rounded ${result.pValue >= 0.05 && result.pValue < 0.1 ? 'bg-orange-100 border border-orange-300' : ''}`}>
                            <span className="font-mono text-orange-700">p &lt; 0.10</span>
                            <span className="text-gray-600">— Weak evidence</span>
                          </div>
                          <div className={`flex items-center gap-2 p-2 rounded ${result.pValue >= 0.1 ? 'bg-red-100 border border-red-300' : ''}`}>
                            <span className="font-mono text-red-700">p ≥ 0.10</span>
                            <span className="text-gray-600">— No evidence</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Calculation Details */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-purple-600" />
                      Calculation Details
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">Test Type</p>
                          <p className="font-semibold text-gray-900">
                            {result.testType === 'z-score' && 'Z-test (Normal)'}
                            {result.testType === 't-score' && 'T-test (Student\'s t)'}
                            {result.testType === 'chi-square' && 'Chi-square (χ²)'}
                            {result.testType === 'f-score' && 'F-test'}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">Tail Type</p>
                          <p className="font-semibold text-gray-900">
                            {result.tailType === 'two-tailed' && 'Two-tailed (≠)'}
                            {result.tailType === 'left-tailed' && 'Left-tailed (<)'}
                            {result.tailType === 'right-tailed' && 'Right-tailed (>)'}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
                        <h4 className="font-semibold text-indigo-800 mb-2">Formula Used:</h4>
                        {result.testType === 'z-score' && result.tailType === 'two-tailed' && (
                          <div className="text-gray-700">
                            <p className="font-mono text-sm">p-value = 2 × Φ(−|Z|)</p>
                            <p className="font-mono text-sm mt-1">p-value = 2 × Φ(−|{result.testStatistic.toFixed(4)}|) = {result.pValue.toFixed(6)}</p>
                          </div>
                        )}
                        {result.testType === 'z-score' && result.tailType === 'left-tailed' && (
                          <div className="text-gray-700">
                            <p className="font-mono text-sm">p-value = Φ(Z)</p>
                            <p className="font-mono text-sm mt-1">p-value = Φ({result.testStatistic.toFixed(4)}) = {result.pValue.toFixed(6)}</p>
                          </div>
                        )}
                        {result.testType === 'z-score' && result.tailType === 'right-tailed' && (
                          <div className="text-gray-700">
                            <p className="font-mono text-sm">p-value = 1 − Φ(Z)</p>
                            <p className="font-mono text-sm mt-1">p-value = 1 − Φ({result.testStatistic.toFixed(4)}) = {result.pValue.toFixed(6)}</p>
                          </div>
                        )}
                        {result.testType === 't-score' && (
                          <div className="text-gray-700">
                            <p className="font-mono text-sm">
                              {result.tailType === 'two-tailed' && 'p-value = 2 × cdf_t,df(−|t|)'}
                              {result.tailType === 'left-tailed' && 'p-value = cdf_t,df(t)'}
                              {result.tailType === 'right-tailed' && 'p-value = 1 − cdf_t,df(t)'}
                            </p>
                            <p className="font-mono text-sm mt-1">df = {result.degreesOfFreedom}, t = {result.testStatistic.toFixed(4)}</p>
                            <p className="font-mono text-sm mt-1">p-value = {result.pValue.toFixed(6)}</p>
                          </div>
                        )}
                        {result.testType === 'chi-square' && (
                          <div className="text-gray-700">
                            <p className="font-mono text-sm">p-value = 1 − CDF_χ²(χ², df)</p>
                            <p className="font-mono text-sm mt-1">df = {result.degreesOfFreedom}, χ² = {result.testStatistic.toFixed(4)}</p>
                            <p className="font-mono text-sm mt-1">p-value = {result.pValue.toFixed(6)}</p>
                          </div>
                        )}
                        {result.testType === 'f-score' && (
                          <div className="text-gray-700">
                            <p className="font-mono text-sm">p-value = 1 − CDF_F(F, df₁, df₂)</p>
                            <p className="font-mono text-sm mt-1">df₁ = {result.degreesOfFreedom}, df₂ = {result.degreesOfFreedom2}, F = {result.testStatistic.toFixed(4)}</p>
                            <p className="font-mono text-sm mt-1">p-value = {result.pValue.toFixed(6)}</p>
                          </div>
                        )}
                      </div>

                      {/* Summary Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="text-left py-2 px-3 font-semibold">Parameter</th>
                              <th className="text-right py-2 px-3 font-semibold">Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2 px-3">Test Statistic</td>
                              <td className="py-2 px-3 text-right font-mono">{result.testStatistic.toFixed(4)}</td>
                            </tr>
                            {result.degreesOfFreedom && (
                              <tr className="border-b">
                                <td className="py-2 px-3">Degrees of Freedom {result.testType === 'f-score' ? '(df₁)' : ''}</td>
                                <td className="py-2 px-3 text-right font-mono">{result.degreesOfFreedom}</td>
                              </tr>
                            )}
                            {result.degreesOfFreedom2 && (
                              <tr className="border-b">
                                <td className="py-2 px-3">Degrees of Freedom (df₂)</td>
                                <td className="py-2 px-3 text-right font-mono">{result.degreesOfFreedom2}</td>
                              </tr>
                            )}
                            <tr className="border-b">
                              <td className="py-2 px-3">P-Value</td>
                              <td className="py-2 px-3 text-right font-mono font-bold text-indigo-700">{result.pValue.toFixed(6)}</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 px-3">Significance Level (α)</td>
                              <td className="py-2 px-3 text-right font-mono">{result.significanceLevel}</td>
                            </tr>
                            <tr className={result.isSignificant ? 'bg-green-50' : 'bg-gray-50'}>
                              <td className="py-2 px-3">Result</td>
                              <td className={`py-2 px-3 text-right font-semibold ${result.isSignificant ? 'text-green-700' : 'text-gray-700'}`}>
                                {result.isSignificant ? 'Reject H₀' : 'Fail to Reject H₀'}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    Enter your test statistic to calculate the p-value
                  </p>
                  <p className="text-gray-400 text-sm">
                    Select test type (z, t, χ², F) and tail type
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

            {/* What is P-Value */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-indigo-600" />
                What is a P-Value?
              </h2>

              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  A <strong>p-value</strong> (probability value) is a statistical measure that helps you determine the strength of your evidence against the <strong>null hypothesis</strong>. It represents the probability of obtaining results at least as extreme as the observed results, assuming the null hypothesis is true.
                </p>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border-2 border-indigo-200">
                  <h3 className="text-2xl font-bold text-indigo-800 mb-4">Key P-Value Concepts</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Range:</strong> P-values are always between 0 and 1 (they represent probabilities)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Lower is stronger:</strong> A smaller p-value indicates stronger evidence against H₀</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Threshold:</strong> Compare p-value to significance level (α) to make decisions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Not probability of H₀:</strong> P-value is NOT the probability that H₀ is true</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                  <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Common Misconception
                  </h4>
                  <p className="text-gray-700">
                    The p-value is <strong>not</strong> the probability that the null hypothesis is true. It&apos;s the probability of seeing data as extreme as yours <em>if</em> the null hypothesis were true. This subtle distinction is crucial for proper statistical interpretation.
                  </p>
                </div>
              </div>
            </section>

            {/* P-Value Formulas */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                P-Value Formulas by Test Type
              </h2>

              {/* Z-Score Formula */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Z-Score (Standard Normal Distribution)</h3>
                <p className="text-gray-700 mb-4">For data from a normal distribution with known population standard deviation (σ):</p>

                <div className="bg-white rounded-lg p-6 border border-blue-100 space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Left-tailed (H₁: μ &lt; μ₀)</p>
                      <p className="font-mono text-lg font-bold text-blue-700">p = Φ(Z)</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Right-tailed (H₁: μ &gt; μ₀)</p>
                      <p className="font-mono text-lg font-bold text-blue-700">p = 1 − Φ(Z)</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Two-tailed (H₁: μ ≠ μ₀)</p>
                      <p className="font-mono text-lg font-bold text-blue-700">p = 2 × Φ(−|Z|)</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 text-center">Where Φ(Z) is the cumulative distribution function (CDF) of the standard normal distribution</p>
                </div>
              </div>

              {/* T-Score Formula */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-200">
                <h3 className="text-xl font-bold text-purple-800 mb-4">T-Score (Student&apos;s t-Distribution)</h3>
                <p className="text-gray-700 mb-4">For small samples (n &lt; 30) or unknown population standard deviation:</p>

                <div className="bg-white rounded-lg p-6 border border-purple-100 space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Left-tailed</p>
                      <p className="font-mono text-lg font-bold text-purple-700">p = cdf<sub>t,df</sub>(t)</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Right-tailed</p>
                      <p className="font-mono text-lg font-bold text-purple-700">p = 1 − cdf<sub>t,df</sub>(t)</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Two-tailed</p>
                      <p className="font-mono text-lg font-bold text-purple-700">p = 2 × cdf<sub>t,df</sub>(−|t|)</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 text-center">Where df = n − 1 (degrees of freedom)</p>
                </div>
              </div>

              {/* Chi-Square Formula */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-4">Chi-Square (χ²) Distribution</h3>
                <p className="text-gray-700 mb-4">For goodness of fit tests and independence tests:</p>

                <div className="bg-white rounded-lg p-6 border border-green-100">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Right-tailed (typical)</p>
                    <p className="font-mono text-lg font-bold text-green-700">p = 1 − CDF<sub>χ²</sub>(χ², df)</p>
                  </div>
                  <p className="text-sm text-gray-600 text-center mt-4">Chi-square tests are inherently one-tailed (right-tailed)</p>
                </div>
              </div>

              {/* F-Score Formula */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
                <h3 className="text-xl font-bold text-orange-800 mb-4">F-Score (F-Distribution)</h3>
                <p className="text-gray-700 mb-4">For ANOVA and comparing variances:</p>

                <div className="bg-white rounded-lg p-6 border border-orange-100">
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Right-tailed (typical)</p>
                    <p className="font-mono text-lg font-bold text-orange-700">p = 1 − CDF<sub>F</sub>(F, df₁, df₂)</p>
                  </div>
                  <p className="text-sm text-gray-600 text-center mt-4">Where df₁ = numerator degrees of freedom, df₂ = denominator degrees of freedom</p>
                </div>
              </div>
            </section>

            {/* How to Interpret P-Values */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                How to Interpret P-Values
              </h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full bg-white rounded-xl border-2 border-gray-200">
                  <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">P-Value Range</th>
                      <th className="text-left py-3 px-4 font-semibold">Evidence Strength</th>
                      <th className="text-left py-3 px-4 font-semibold">Interpretation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-green-50">
                      <td className="py-3 px-4 font-mono font-bold text-green-700">p &lt; 0.001</td>
                      <td className="py-3 px-4 font-semibold text-green-700">Extremely Strong</td>
                      <td className="py-3 px-4">Very convincing evidence to reject H₀</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono font-bold text-green-600">0.001 ≤ p &lt; 0.01</td>
                      <td className="py-3 px-4 font-semibold text-green-600">Very Strong</td>
                      <td className="py-3 px-4">Strong evidence to reject H₀</td>
                    </tr>
                    <tr className="border-b bg-yellow-50">
                      <td className="py-3 px-4 font-mono font-bold text-yellow-700">0.01 ≤ p &lt; 0.05</td>
                      <td className="py-3 px-4 font-semibold text-yellow-700">Strong</td>
                      <td className="py-3 px-4">Moderate evidence to reject H₀ (commonly used threshold)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono font-bold text-orange-700">0.05 ≤ p &lt; 0.10</td>
                      <td className="py-3 px-4 font-semibold text-orange-700">Weak</td>
                      <td className="py-3 px-4">Marginal evidence; results are suggestive but not conclusive</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="py-3 px-4 font-mono font-bold text-red-700">p ≥ 0.10</td>
                      <td className="py-3 px-4 font-semibold text-red-700">None/Minimal</td>
                      <td className="py-3 px-4">No evidence to reject H₀; results are consistent with H₀</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                  <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    If p &lt; α (e.g., p &lt; 0.05)
                  </h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• <strong>Reject</strong> the null hypothesis (H₀)</li>
                    <li>• Result is &quot;statistically significant&quot;</li>
                    <li>• Evidence supports the alternative hypothesis (H₁)</li>
                    <li>• The observed effect is unlikely due to chance</li>
                  </ul>
                </div>

                <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                  <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    If p ≥ α (e.g., p ≥ 0.05)
                  </h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• <strong>Fail to reject</strong> the null hypothesis (H₀)</li>
                    <li>• Result is &quot;not statistically significant&quot;</li>
                    <li>• Insufficient evidence against H₀</li>
                    <li>• Does NOT prove H₀ is true</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* One-Tailed vs Two-Tailed */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                One-Tailed vs Two-Tailed Tests
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <ArrowLeft className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-blue-800">Left-Tailed Test</h3>
                  </div>
                  <p className="text-gray-700 mb-3 text-sm">Tests if the parameter is <strong>less than</strong> a value.</p>
                  <div className="bg-white rounded-lg p-3 border border-blue-100">
                    <p className="text-sm font-mono">H₀: μ ≥ μ₀</p>
                    <p className="text-sm font-mono">H₁: μ &lt; μ₀</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Example: Testing if a new drug <em>lowers</em> blood pressure</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <div className="flex items-center gap-2 mb-3">
                    <ArrowRightIcon className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-bold text-green-800">Right-Tailed Test</h3>
                  </div>
                  <p className="text-gray-700 mb-3 text-sm">Tests if the parameter is <strong>greater than</strong> a value.</p>
                  <div className="bg-white rounded-lg p-3 border border-green-100">
                    <p className="text-sm font-mono">H₀: μ ≤ μ₀</p>
                    <p className="text-sm font-mono">H₁: μ &gt; μ₀</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Example: Testing if a new teaching method <em>increases</em> scores</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                  <div className="flex items-center gap-2 mb-3">
                    <ArrowLeftRight className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-bold text-purple-800">Two-Tailed Test</h3>
                  </div>
                  <p className="text-gray-700 mb-3 text-sm">Tests if the parameter is <strong>different from</strong> a value.</p>
                  <div className="bg-white rounded-lg p-3 border border-purple-100">
                    <p className="text-sm font-mono">H₀: μ = μ₀</p>
                    <p className="text-sm font-mono">H₁: μ ≠ μ₀</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Example: Testing if coin is fair (P(heads) ≠ 0.5)</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  When to Use Each Test Type
                </h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Use <strong>two-tailed</strong> when you want to detect any difference (most common, conservative)</li>
                  <li>• Use <strong>one-tailed</strong> only when you have a specific directional hypothesis <em>before</em> collecting data</li>
                  <li>• One-tailed tests have more statistical power but can miss effects in the opposite direction</li>
                  <li>• When in doubt, use a two-tailed test</li>
                </ul>
              </div>
            </section>

            {/* Examples */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                P-Value Calculation Examples
              </h2>

              {/* Example 1: Z-test */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                  Z-Test Example (Two-Tailed)
                </h3>
                <p className="text-gray-700 mb-4">
                  A researcher tests whether the average height of a population differs from 170 cm. They calculate a z-score of 2.15 at α = 0.05.
                </p>

                <div className="bg-white rounded-lg p-6 border border-blue-200 mb-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Given:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>Z-score = <strong>2.15</strong></li>
                        <li>α = <strong>0.05</strong></li>
                        <li>Test type: <strong>Two-tailed</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Calculation:</h4>
                      <div className="space-y-2 text-gray-700 text-sm">
                        <p className="font-mono">p = 2 × Φ(−|2.15|)</p>
                        <p className="font-mono">p = 2 × Φ(−2.15)</p>
                        <p className="font-mono">p = 2 × 0.0158 = <strong className="text-blue-700">0.0316</strong></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Result:</strong> Since p-value (0.0316) &lt; α (0.05), we <strong className="text-green-700">reject the null hypothesis</strong>. There is statistically significant evidence that the population mean differs from 170 cm.
                  </p>
                </div>
              </div>

              {/* Example 2: T-test */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-200">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                  T-Test Example (Right-Tailed)
                </h3>
                <p className="text-gray-700 mb-4">
                  A company tests whether a new training program increases productivity. With a sample of 25 employees, they calculate t = 1.85 at α = 0.05.
                </p>

                <div className="bg-white rounded-lg p-6 border border-purple-200 mb-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Given:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>t-score = <strong>1.85</strong></li>
                        <li>df = n − 1 = 25 − 1 = <strong>24</strong></li>
                        <li>α = <strong>0.05</strong></li>
                        <li>Test type: <strong>Right-tailed</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Calculation:</h4>
                      <div className="space-y-2 text-gray-700 text-sm">
                        <p className="font-mono">p = 1 − cdf<sub>t,24</sub>(1.85)</p>
                        <p className="font-mono">p = 1 − 0.9617</p>
                        <p className="font-mono">p = <strong className="text-purple-700">0.0383</strong></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Result:</strong> Since p-value (0.0383) &lt; α (0.05), we <strong className="text-green-700">reject the null hypothesis</strong>. The training program significantly increases productivity.
                  </p>
                </div>
              </div>

              {/* Example 3: Chi-square */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
                  Chi-Square Test Example
                </h3>
                <p className="text-gray-700 mb-4">
                  A researcher tests if dice rolls follow a uniform distribution. With df = 5 and χ² = 11.07 at α = 0.05.
                </p>

                <div className="bg-white rounded-lg p-6 border border-green-200 mb-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Given:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>χ² = <strong>11.07</strong></li>
                        <li>df = <strong>5</strong></li>
                        <li>α = <strong>0.05</strong></li>
                        <li>Critical value at α=0.05: <strong>11.07</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Calculation:</h4>
                      <div className="space-y-2 text-gray-700 text-sm">
                        <p className="font-mono">p = 1 − CDF<sub>χ²</sub>(11.07, 5)</p>
                        <p className="font-mono">p = 1 − 0.9500</p>
                        <p className="font-mono">p = <strong className="text-green-700">0.0500</strong></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-100 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Result:</strong> Since p-value (0.05) = α (0.05), this is exactly at the boundary. By convention, we typically <strong className="text-orange-700">fail to reject H₀</strong> when p = α, but this is a borderline case.
                  </p>
                </div>
              </div>
            </section>

            {/* Common Significance Levels */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Common Significance Levels (α)
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                  <div className="text-center mb-4">
                    <span className="text-4xl font-bold text-green-700">α = 0.01</span>
                    <p className="text-sm text-gray-600 mt-1">1% significance level</p>
                  </div>
                  <h4 className="font-bold text-green-800 mb-2">Very Strict</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Medical research</li>
                    <li>• High-stakes decisions</li>
                    <li>• Fewer false positives</li>
                    <li>• More false negatives</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <div className="text-center mb-4">
                    <span className="text-4xl font-bold text-blue-700">α = 0.05</span>
                    <p className="text-sm text-gray-600 mt-1">5% significance level</p>
                  </div>
                  <h4 className="font-bold text-blue-800 mb-2">Standard (Most Common)</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Social sciences</li>
                    <li>• Business research</li>
                    <li>• General scientific studies</li>
                    <li>• Balanced tradeoff</li>
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
                  <div className="text-center mb-4">
                    <span className="text-4xl font-bold text-orange-700">α = 0.10</span>
                    <p className="text-sm text-gray-600 mt-1">10% significance level</p>
                  </div>
                  <h4 className="font-bold text-orange-800 mb-2">Lenient</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Exploratory research</li>
                    <li>• Pilot studies</li>
                    <li>• More false positives</li>
                    <li>• Fewer false negatives</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    What does a p-value of 0.05 mean?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    A p-value of 0.05 means there is a <strong>5% probability</strong> of obtaining results at least as extreme as the observed results, assuming the null hypothesis is true. In other words, if H₀ were true, you would expect to see such extreme results only 5% of the time by random chance.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    Can a p-value be negative?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>No.</strong> P-values represent probabilities and must be between 0 and 1 (inclusive). A p-value of 0 indicates extremely strong evidence against H₀, while a p-value of 1 indicates the observed result is exactly what H₀ predicts.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    What&apos;s the difference between statistical significance and practical significance?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Statistical significance</strong> (p &lt; α) only indicates that an effect is unlikely due to chance. <strong>Practical significance</strong> considers whether the effect size is meaningful in real-world terms. A very large sample can detect tiny differences that are statistically significant but practically meaningless.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    When should I use a z-test vs a t-test?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Use a <strong>z-test</strong> when: (1) sample size is large (n ≥ 30), or (2) population standard deviation (σ) is known. Use a <strong>t-test</strong> when: (1) sample size is small (n &lt; 30), and (2) population standard deviation is unknown (you use sample standard deviation s instead).
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    What is the relationship between p-value and confidence interval?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    They are related! For a two-tailed test at significance level α: if p &lt; α, the (1-α)% confidence interval will NOT contain the null hypothesis value. For example, if p &lt; 0.05, the 95% confidence interval excludes H₀. Both methods lead to the same conclusion about significance.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    Does &quot;failing to reject H₀&quot; mean H₀ is true?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>No!</strong> Failing to reject H₀ only means there is insufficient evidence to reject it - it does NOT prove H₀ is true. The data simply aren&apos;t conclusive enough. This is why we say &quot;fail to reject&quot; rather than &quot;accept&quot; the null hypothesis.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    What are Type I and Type II errors?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Type I error (α):</strong> Rejecting H₀ when it&apos;s actually true (false positive). The significance level α is the maximum acceptable probability of this error. <strong>Type II error (β):</strong> Failing to reject H₀ when it&apos;s actually false (false negative). Power = 1 − β is the probability of correctly rejecting a false H₀.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    How do degrees of freedom affect the p-value?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Higher degrees of freedom (larger sample size) makes the t-distribution approach the normal distribution, resulting in smaller p-values for the same test statistic. With more data, you have more confidence in your results. This is why larger studies have more statistical power.
                  </p>
                </div>
              </div>
            </section>

            {/* Related Calculators */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Related Calculators
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/calculators/standard-deviation-calculator" className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border-2 border-indigo-200 hover:border-indigo-400 transition-colors group">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center group-hover:text-indigo-700">
                    <BarChart3 className="w-5 h-5 mr-2 text-indigo-600" />
                    Standard Deviation Calculator
                  </h4>
                  <p className="text-sm text-gray-600">
                    Calculate standard deviation, variance, and other statistical measures for your dataset.
                  </p>
                </Link>

                <Link href="/calculators/percentile-calculator" className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border-2 border-green-200 hover:border-green-400 transition-colors group">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center group-hover:text-green-700">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    Percentile Calculator
                  </h4>
                  <p className="text-sm text-gray-600">
                    Calculate percentile ranks and find percentile values from your dataset.
                  </p>
                </Link>

                <Link href="/calculators/average-calculator" className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-colors group">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center group-hover:text-blue-700">
                    <Calculator className="w-5 h-5 mr-2 text-blue-600" />
                    Average Calculator
                  </h4>
                  <p className="text-sm text-gray-600">
                    Calculate mean, median, mode, and range for your data.
                  </p>
                </Link>

                <Link href="/calculators/variance-calculator" className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-colors group">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center group-hover:text-purple-700">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    Variance Calculator
                  </h4>
                  <p className="text-sm text-gray-600">
                    Calculate sample and population variance with step-by-step solutions.
                  </p>
                </Link>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl p-8 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Master Statistical Hypothesis Testing</h2>
                <p className="text-lg text-indigo-100 mb-6 leading-relaxed">
                  Understanding p-values is fundamental to making data-driven decisions. Whether you&apos;re conducting research, analyzing business metrics, or completing coursework, this calculator helps you determine statistical significance quickly and accurately.
                </p>
                <p className="text-lg text-indigo-100 leading-relaxed">
                  Remember: p-values are just one piece of the statistical puzzle. Always consider effect size, confidence intervals, sample size, and practical significance when interpreting your results. Use this tool as part of a comprehensive statistical analysis.
                </p>
              </div>
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
              Need Help with Statistics?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master hypothesis testing, p-values, statistical inference, and data analysis. Get personalized one-on-one guidance tailored to your learning style.
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
