'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, BookOpen, ArrowRight, Shuffle, Grid3x3 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CombinationResult {
  n: number;
  r: number;
  combination: number;
  permutation: number;
  steps: string[];
  formula: string;
  permutationFormula: string;
  factorialN: number;
  factorialR: number;
  factorialNMinusR: number;
}

export default function CombinationsCalculator() {
  const [n, setN] = useState<string>('');
  const [r, setR] = useState<string>('');
  const [calculationType, setCalculationType] = useState<string>('combination');
  const [result, setResult] = useState<CombinationResult | null>(null);

  // Calculate factorial
  const factorial = (num: number): number => {
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    return result;
  };

  // Format large numbers with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  const handleCalculate = () => {
    const nValue = parseInt(n);
    const rValue = parseInt(r);

    // Validation
    if (isNaN(nValue) || isNaN(rValue)) {
      alert('Please enter valid numbers');
      return;
    }

    if (nValue < 0 || rValue < 0) {
      alert('Please enter non-negative integers only');
      return;
    }

    if (rValue > nValue) {
      alert('r cannot be greater than n');
      return;
    }

    if (nValue > 170) {
      alert('n is too large. Please enter n ≤ 170 to avoid overflow');
      return;
    }

    // Calculate factorials
    const factN = factorial(nValue);
    const factR = factorial(rValue);
    const factNMinusR = factorial(nValue - rValue);

    // Calculate combination (nCr)
    const combination = factN / (factR * factNMinusR);

    // Calculate permutation (nPr)
    const permutation = factN / factNMinusR;

    // Build step-by-step solution
    const steps: string[] = [];

    if (calculationType === 'combination') {
      steps.push(`Calculating C(${nValue}, ${rValue}) or ${nValue}C${rValue}:`);
      steps.push('');
      steps.push('Step 1: Identify the values');
      steps.push(`n = ${nValue} (total number of items)`);
      steps.push(`r = ${rValue} (number of items to choose)`);
      steps.push('');
      steps.push('Step 2: Apply the combination formula');
      steps.push('C(n, r) = n! / (r! × (n - r)!)');
      steps.push(`C(${nValue}, ${rValue}) = ${nValue}! / (${rValue}! × ${nValue - rValue}!)`);
      steps.push('');
      steps.push('Step 3: Calculate factorials');
      steps.push(`${nValue}! = ${formatNumber(factN)}`);
      steps.push(`${rValue}! = ${formatNumber(factR)}`);
      steps.push(`${nValue - rValue}! = ${formatNumber(factNMinusR)}`);
      steps.push('');
      steps.push('Step 4: Substitute and simplify');
      steps.push(`C(${nValue}, ${rValue}) = ${formatNumber(factN)} / (${formatNumber(factR)} × ${formatNumber(factNMinusR)})`);
      steps.push(`C(${nValue}, ${rValue}) = ${formatNumber(factN)} / ${formatNumber(factR * factNMinusR)}`);
      steps.push(`C(${nValue}, ${rValue}) = ${formatNumber(combination)}`);
      steps.push('');
      steps.push(`Result: There are ${formatNumber(combination)} ways to choose ${rValue} items from ${nValue} items (order does not matter).`);
    } else {
      steps.push(`Calculating P(${nValue}, ${rValue}) or ${nValue}P${rValue}:`);
      steps.push('');
      steps.push('Step 1: Identify the values');
      steps.push(`n = ${nValue} (total number of items)`);
      steps.push(`r = ${rValue} (number of items to arrange)`);
      steps.push('');
      steps.push('Step 2: Apply the permutation formula');
      steps.push('P(n, r) = n! / (n - r)!');
      steps.push(`P(${nValue}, ${rValue}) = ${nValue}! / ${nValue - rValue}!`);
      steps.push('');
      steps.push('Step 3: Calculate factorials');
      steps.push(`${nValue}! = ${formatNumber(factN)}`);
      steps.push(`${nValue - rValue}! = ${formatNumber(factNMinusR)}`);
      steps.push('');
      steps.push('Step 4: Substitute and simplify');
      steps.push(`P(${nValue}, ${rValue}) = ${formatNumber(factN)} / ${formatNumber(factNMinusR)}`);
      steps.push(`P(${nValue}, ${rValue}) = ${formatNumber(permutation)}`);
      steps.push('');
      steps.push(`Result: There are ${formatNumber(permutation)} ways to arrange ${rValue} items from ${nValue} items (order matters).`);
    }

    setResult({
      n: nValue,
      r: rValue,
      combination,
      permutation,
      steps,
      formula: 'C(n, r) = n! / (r! × (n - r)!)',
      permutationFormula: 'P(n, r) = n! / (n - r)!',
      factorialN: factN,
      factorialR: factR,
      factorialNMinusR: factNMinusR,
    });
  };

  const handleClear = () => {
    setN('');
    setR('');
    setResult(null);
  };

  // Render factorial notation
  const renderFactorial = (num: number) => (
    <span className="font-semibold">{num}!</span>
  );

  // Render fraction for formula
  const renderFormula = () => (
    <div className="flex items-center justify-center gap-3 text-xl">
      <span className="font-semibold">C(n, r) = </span>
      <div className="inline-flex flex-col items-center">
        <span className="border-b-2 border-gray-900 pb-1 px-4">n!</span>
        <span className="pt-1 px-4">r! × (n − r)!</span>
      </div>
    </div>
  );

  const renderPermutationFormula = () => (
    <div className="flex items-center justify-center gap-3 text-xl">
      <span className="font-semibold">P(n, r) = </span>
      <div className="inline-flex flex-col items-center">
        <span className="border-b-2 border-gray-900 pb-1 px-4">n!</span>
        <span className="pt-1 px-4">(n − r)!</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the difference between nCr and nPr?","acceptedAnswer":{"@type":"Answer","text":"nCr (combinations) is used when order doesn\'t matter—it counts the number of ways to choose r items from n items. nPr (permutations) is used when order matters—it counts the number of ways to arrange r items selected from n items. Always remember: P(n,r) = C(n,r) × r!, meaning there are r! different arrangements for each combination."}},{"@type":"Question","name":"How do I know whether to use combinations or permutations?","acceptedAnswer":{"@type":"Answer","text":"Ask yourself: \'Does the order of selection matter?\' If rearranging the selected items creates a different outcome, use permutations. If rearranging doesn\'t create a new outcome, use combinations. For example, selecting team members uses combinations (the order you pick them doesn\'t matter), but assigning positions to team members uses permutations (position assignment order matters)."}},{"@type":"Question","name":"What does \"n choose r\" mean?","acceptedAnswer":{"@type":"Answer","text":"\'n choose r\' is another way to say C(n,r) or nCr. It represents the number of ways to choose r items from a set of n items, where order doesn\'t matter. For example, \'5 choose 2\' means C(5,2) = 10—there are 10 different ways to select 2 items from a group of 5 items."}},{"@type":"Question","name":"Can r be greater than n in combinations?","acceptedAnswer":{"@type":"Answer","text":"No, r cannot be greater than n in standard combinations or permutations. You cannot choose or arrange more items than you have available. The valid range is 0 ≤ r ≤ n. If r > n, the result is mathematically defined as 0 (zero ways to choose more items than exist)."}},{"@type":"Question","name":"What is a factorial and how is it calculated?","acceptedAnswer":{"@type":"Answer","text":"A factorial, denoted by n!, is the product of all positive integers from 1 to n. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120. By definition, 0! = 1 and 1! = 1. Factorials grow very rapidly—10! = 3,628,800 and 20! = 2,432,902,008,176,640,000. Our calculator handles factorials automatically in combination and permutation formulas."}},{"@type":"Question","name":"Why is the calculator limited to n ≤ 170?","acceptedAnswer":{"@type":"Answer","text":"Factorials grow extremely large very quickly. 170! is approximately 7.26 × 10³⁰⁶, which is near the maximum value that can be stored in standard floating-point numbers. Beyond 170!, we encounter computational overflow errors. For most practical applications, values up to 170 are more than sufficient."}},{"@type":"Question","name":"What are binomial coefficients?","acceptedAnswer":{"@type":"Answer","text":"Binomial coefficients are another name for combination values C(n,r). They\'re called this because they appear as coefficients in the binomial expansion of (a + b)ⁿ. For example, (a + b)³ = a³ + 3a²b + 3ab² + b³, where the coefficients 1, 3, 3, 1 are C(3,0), C(3,1), C(3,2), and C(3,3) respectively."}},{"@type":"Question","name":"How is this calculator useful for probability?","acceptedAnswer":{"@type":"Answer","text":"Combinations are fundamental in probability calculations. The probability of an event is often calculated as (favorable outcomes)/(total possible outcomes). For example, the probability of drawing a specific 5-card poker hand is 1/C(52,5) because there are C(52,5) total possible hands. This calculator helps you quickly compute these values for probability problems."}}]}' }}
      />
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-purple-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-purple-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Combinations Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Shuffle className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Combinations Calculator
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
              Calculate combinations (nCr) and permutations (nPr) with step-by-step solutions. Perfect for probability, statistics, and combinatorics problems.
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
                  <Calculator className="w-6 h-6 text-purple-600" />
                  Enter Values
                </h2>

                {/* Calculation Type Selector */}
                <div className="mb-6">
                  <Label htmlFor="calculationType" className="text-sm font-semibold text-gray-700 mb-3 block">
                    Calculation Type
                  </Label>
                  <Select value={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger className="w-full text-lg">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="combination">Combination (nCr) - Order doesn't matter</SelectItem>
                      <SelectItem value="permutation">Permutation (nPr) - Order matters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Input Fields */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="n" className="text-sm font-semibold text-gray-700 mb-3 block">
                      n (Total number of items)
                    </Label>
                    <Input
                      id="n"
                      type="number"
                      placeholder="Enter n"
                      value={n}
                      onChange={(e) => setN(e.target.value)}
                      className="text-center text-lg font-medium"
                      min="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">Maximum value: 170</p>
                  </div>

                  <div>
                    <Label htmlFor="r" className="text-sm font-semibold text-gray-700 mb-3 block">
                      r (Number of items to {calculationType === 'combination' ? 'choose' : 'arrange'})
                    </Label>
                    <Input
                      id="r"
                      type="number"
                      placeholder="Enter r"
                      value={r}
                      onChange={(e) => setR(e.target.value)}
                      className="text-center text-lg font-medium"
                      min="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">Must be ≤ n</p>
                  </div>
                </div>

                {/* Formula Preview */}
                <div className="mt-6 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                  <p className="text-sm font-semibold text-purple-900 mb-2 text-center">Formula:</p>
                  {calculationType === 'combination' ? renderFormula() : renderPermutationFormula()}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
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
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4">Answer</h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <p className="text-sm mb-2 text-purple-100">
                        {calculationType === 'combination'
                          ? `C(${result.n}, ${result.r}) = ${result.n}C${result.r}`
                          : `P(${result.n}, ${result.r}) = ${result.n}P${result.r}`
                        }
                      </p>
                      <p className="text-4xl md:text-5xl font-bold text-center">
                        {formatNumber(calculationType === 'combination' ? result.combination : result.permutation)}
                      </p>
                      <p className="text-sm mt-3 text-purple-100 text-center">
                        {calculationType === 'combination'
                          ? `${formatNumber(result.combination)} ${result.combination === 1 ? 'way' : 'ways'} to choose`
                          : `${formatNumber(result.permutation)} ${result.permutation === 1 ? 'way' : 'ways'} to arrange`
                        }
                      </p>
                    </div>
                  </div>

                  {/* Both Results Comparison */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Quick Comparison
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                        <p className="text-sm font-semibold text-purple-900 mb-2">Combination (nCr)</p>
                        <p className="text-xs text-gray-600 mb-2">Order doesn't matter</p>
                        <p className="text-2xl font-bold text-purple-600">{formatNumber(result.combination)}</p>
                      </div>
                      <div className="bg-pink-50 rounded-xl p-4 border-2 border-pink-200">
                        <p className="text-sm font-semibold text-pink-900 mb-2">Permutation (nPr)</p>
                        <p className="text-xs text-gray-600 mb-2">Order matters</p>
                        <p className="text-2xl font-bold text-pink-600">{formatNumber(result.permutation)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Step-by-Step Solution */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Solution with Steps
                    </h3>
                    <div className="space-y-2">
                      {result.steps.map((step, index) => (
                        step === '' ? (
                          <div key={index} className="h-2"></div>
                        ) : step.startsWith('Step') || step.startsWith('Result:') ? (
                          <p key={index} className="font-semibold text-gray-900 mt-3">{step}</p>
                        ) : step.startsWith('Calculating') ? (
                          <p key={index} className="text-lg font-bold text-purple-600 mb-2">{step}</p>
                        ) : (
                          <p key={index} className="text-gray-700 leading-relaxed pl-4">{step}</p>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Formula Breakdown */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Formula Breakdown
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <p className="text-sm font-semibold text-gray-700 mb-3">Combination Formula:</p>
                        {renderFormula()}
                        <p className="text-xs text-gray-600 mt-3 text-center">Used when order does not matter</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <p className="text-sm font-semibold text-gray-700 mb-3">Permutation Formula:</p>
                        {renderPermutationFormula()}
                        <p className="text-xs text-gray-600 mt-3 text-center">Used when order matters</p>
                      </div>
                    </div>
                  </div>

                  {/* Factorials Used */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Factorials Calculated
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-semibold text-gray-700">{result.n}!</span>
                        <span className="text-gray-900 font-mono">{formatNumber(result.factorialN)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-semibold text-gray-700">{result.r}!</span>
                        <span className="text-gray-900 font-mono">{formatNumber(result.factorialR)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-semibold text-gray-700">({result.n} - {result.r})! = {result.n - result.r}!</span>
                        <span className="text-gray-900 font-mono">{formatNumber(result.factorialNMinusR)}</span>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Shuffle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    Enter values and click Calculate to see results
                  </p>
                  <p className="text-sm text-gray-400">
                    Choose between combinations (nCr) or permutations (nPr)
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
                Understanding Combinations and Permutations
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Combinations and permutations are fundamental concepts in combinatorics, the branch of mathematics dealing with counting, arrangement, and selection. Our comprehensive combinations calculator helps you quickly compute both combinations (nCr) and permutations (nPr) with detailed step-by-step solutions, making it perfect for students, educators, statisticians, and anyone working with probability and counting problems.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The key difference between combinations and permutations lies in whether the order of selection matters. Combinations are used when order doesn't matter (like choosing lottery numbers), while permutations are used when order is important (like arranging books on a shelf).
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                This calculator uses precise mathematical formulas to compute exact results, displaying the full working process so you can understand not just the answer, but how it was derived. Whether you're solving probability problems, analyzing statistical scenarios, or working on discrete mathematics assignments, this tool provides accurate results with educational value.
              </p>
            </section>

            {/* What is a Combination */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                What is a Combination?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                A combination is a selection of items from a larger set where the order of selection does not matter. When we calculate C(n, r) or nCr, we're determining the number of ways to choose r items from a set of n items, regardless of the order in which they are chosen.
              </p>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-4">
                <h3 className="text-lg font-bold text-purple-900 mb-3">Combination Formula:</h3>
                <div className="flex justify-center mb-4">
                  <div className="inline-flex flex-col items-center text-2xl">
                    <span className="border-b-2 border-purple-900 pb-2 px-6 font-semibold">n!</span>
                    <span className="pt-2 px-6 font-semibold">r! × (n − r)!</span>
                  </div>
                </div>
                <p className="text-gray-700 text-center">Where n! represents n factorial (n × (n-1) × (n-2) × ... × 1)</p>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                For example, if you have 5 different fruits and want to choose 3 of them for a fruit salad, the number of different combinations is C(5, 3) = 10. The selection (apple, banana, orange) is the same as (orange, apple, banana) because order doesn't matter in combinations.
              </p>
            </section>

            {/* What is a Permutation */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                What is a Permutation?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                A permutation is an arrangement of items from a larger set where the order of arrangement matters. When we calculate P(n, r) or nPr, we're determining the number of ways to arrange r items selected from a set of n items, taking into account the different orders.
              </p>
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 mb-4">
                <h3 className="text-lg font-bold text-pink-900 mb-3">Permutation Formula:</h3>
                <div className="flex justify-center mb-4">
                  <div className="inline-flex flex-col items-center text-2xl">
                    <span className="border-b-2 border-pink-900 pb-2 px-6 font-semibold">n!</span>
                    <span className="pt-2 px-6 font-semibold">(n − r)!</span>
                  </div>
                </div>
                <p className="text-gray-700 text-center">The number of ordered arrangements of r items from n total items</p>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                For example, if you have 5 runners in a race and want to know how many different ways the top 3 positions can be filled, you calculate P(5, 3) = 60. Here, the arrangement (Alice, Bob, Charlie) is different from (Bob, Alice, Charlie) because order matters in permutations.
              </p>
            </section>

            {/* How to Use This Calculator */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Use This Calculator
              </h2>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Select Calculation Type:</strong>
                      <p className="text-gray-700 mt-1">Choose whether you need to calculate a combination (nCr) where order doesn't matter, or a permutation (nPr) where order is important.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Enter n (Total Items):</strong>
                      <p className="text-gray-700 mt-1">Input the total number of items in your set. This must be a non-negative integer (maximum 170 to avoid computational overflow).</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Enter r (Items to Select):</strong>
                      <p className="text-gray-700 mt-1">Input the number of items you want to choose or arrange. This value must be less than or equal to n.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong className="text-gray-900">Click Calculate:</strong>
                      <p className="text-gray-700 mt-1">The calculator will compute your result and display both the combination and permutation values, along with detailed step-by-step solutions showing all calculations.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
                    <div>
                      <strong className="text-gray-900">Review Results:</strong>
                      <p className="text-gray-700 mt-1">Examine the answer, step-by-step solution, formula breakdown, and factorial calculations to fully understand the process.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* Combinations vs Permutations */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Combinations vs Permutations: Key Differences
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Understanding when to use combinations versus permutations is crucial for solving counting problems correctly. Here's a comprehensive comparison:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-2 border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <tr>
                      <th className="p-4 text-left font-semibold">Aspect</th>
                      <th className="p-4 text-left font-semibold">Combination (nCr)</th>
                      <th className="p-4 text-left font-semibold">Permutation (nPr)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="border-b border-gray-200">
                      <td className="p-4 font-semibold text-gray-900">Order Matters?</td>
                      <td className="p-4 text-gray-700">No</td>
                      <td className="p-4 text-gray-700">Yes</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Formula</td>
                      <td className="p-4 text-gray-700">n! / (r! × (n-r)!)</td>
                      <td className="p-4 text-gray-700">n! / (n-r)!</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 font-semibold text-gray-900">Result Size</td>
                      <td className="p-4 text-gray-700">Smaller (fewer possibilities)</td>
                      <td className="p-4 text-gray-700">Larger (more arrangements)</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Example</td>
                      <td className="p-4 text-gray-700">Choosing 3 lottery numbers from 10</td>
                      <td className="p-4 text-gray-700">Arranging top 3 winners from 10 contestants</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-gray-900">Relationship</td>
                      <td className="p-4 text-gray-700" colSpan={2}>P(n,r) = C(n,r) × r!</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 rounded-xl p-6">
                <p className="text-gray-800 font-semibold mb-2">💡 Quick Tip:</p>
                <p className="text-gray-700">Ask yourself: "Does the order of selection matter?" If yes, use permutations. If no, use combinations. For example, a handshake between person A and person B is the same as between B and A (combination), but person A arriving before person B is different from B arriving before A (permutation).</p>
              </div>
            </section>

            {/* Step-by-Step Calculation Guide */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Step-by-Step Calculation Guide
              </h2>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Calculating Combinations (nCr):</h3>
              <div className="bg-purple-50 rounded-xl p-6 mb-6">
                <p className="font-semibold text-purple-900 mb-3">Example: Calculate C(7, 3)</p>
                <ol className="space-y-3 text-gray-700">
                  <li><strong>Step 1:</strong> Identify n = 7 and r = 3</li>
                  <li><strong>Step 2:</strong> Apply the formula: C(7, 3) = 7! / (3! × (7-3)!) = 7! / (3! × 4!)</li>
                  <li><strong>Step 3:</strong> Calculate factorials:
                    <ul className="ml-6 mt-2 space-y-1 list-disc">
                      <li>7! = 7 × 6 × 5 × 4 × 3 × 2 × 1 = 5,040</li>
                      <li>3! = 3 × 2 × 1 = 6</li>
                      <li>4! = 4 × 3 × 2 × 1 = 24</li>
                    </ul>
                  </li>
                  <li><strong>Step 4:</strong> Substitute: C(7, 3) = 5,040 / (6 × 24) = 5,040 / 144</li>
                  <li><strong>Step 5:</strong> Simplify: C(7, 3) = 35</li>
                </ol>
                <p className="mt-4 p-3 bg-white rounded-lg font-semibold text-purple-900">
                  Result: There are 35 ways to choose 3 items from 7 items.
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Calculating Permutations (nPr):</h3>
              <div className="bg-pink-50 rounded-xl p-6">
                <p className="font-semibold text-pink-900 mb-3">Example: Calculate P(7, 3)</p>
                <ol className="space-y-3 text-gray-700">
                  <li><strong>Step 1:</strong> Identify n = 7 and r = 3</li>
                  <li><strong>Step 2:</strong> Apply the formula: P(7, 3) = 7! / (7-3)! = 7! / 4!</li>
                  <li><strong>Step 3:</strong> Calculate factorials:
                    <ul className="ml-6 mt-2 space-y-1 list-disc">
                      <li>7! = 7 × 6 × 5 × 4 × 3 × 2 × 1 = 5,040</li>
                      <li>4! = 4 × 3 × 2 × 1 = 24</li>
                    </ul>
                  </li>
                  <li><strong>Step 4:</strong> Substitute: P(7, 3) = 5,040 / 24</li>
                  <li><strong>Step 5:</strong> Simplify: P(7, 3) = 210</li>
                </ol>
                <p className="mt-4 p-3 bg-white rounded-lg font-semibold text-pink-900">
                  Result: There are 210 ways to arrange 3 items from 7 items.
                </p>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Applications
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3 flex items-center gap-2">
                    <Grid3x3 className="w-5 h-5" />
                    Lottery and Gaming
                  </h3>
                  <p className="text-gray-700">Calculate the odds of winning lottery games by determining the number of possible combinations. For example, in a lottery where you choose 6 numbers from 49, there are C(49, 6) = 13,983,816 possible combinations.</p>
                </div>

                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">Committee Selection</h3>
                  <p className="text-gray-700">Determine how many ways a committee can be formed from a larger group. For instance, selecting a 5-person committee from 12 employees uses combinations since the order of selection doesn't matter.</p>
                </div>

                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">Password & Security</h3>
                  <p className="text-gray-700">Calculate the number of possible passwords or PIN combinations. If a 4-digit PIN uses unique digits from 0-9, there are P(10, 4) = 5,040 possible permutations.</p>
                </div>

                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">Sports Tournaments</h3>
                  <p className="text-gray-700">Determine the number of possible match-ups or tournament brackets. In a league with 8 teams, there are C(8, 2) = 28 possible pairings for matches.</p>
                </div>

                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">Genetics & Biology</h3>
                  <p className="text-gray-700">Calculate genetic combinations and probability of trait inheritance. Understanding combinations helps predict offspring genotypes and phenotypes in Mendelian genetics.</p>
                </div>

                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">Menu Planning</h3>
                  <p className="text-gray-700">Restaurants use combinations to determine how many different meal combinations can be created from available ingredients or how many different combos can be offered to customers.</p>
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
                    ❌ Mistake 1: Confusing Combinations and Permutations
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Using combinations when order matters, or permutations when it doesn't.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Always ask "Does order matter?" If yes, use permutations (nPr). If no, use combinations (nCr).
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 2: Incorrect Formula Application
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Forgetting to divide by r! in the combination formula.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Remember that C(n,r) = n!/(r!×(n-r)!) while P(n,r) = n!/(n-r)!
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 3: Invalid Input Values
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Setting r greater than n, or using negative numbers.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Ensure 0 ≤ r ≤ n and both values are non-negative integers.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 4: Calculation Errors with Large Factorials
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Calculating factorials sequentially without simplification.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Simplify before calculating. For C(50,2), use (50×49)/2 instead of calculating 50!, 2!, and 48! separately.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 5: Misunderstanding Special Cases
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Forgetting that C(n,0) = 1 and C(n,n) = 1.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Remember these special cases: C(n,0) = 1 (one way to choose nothing), C(n,n) = 1 (one way to choose everything), and C(n,1) = n.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 6: Ignoring Problem Context
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Not reading the problem carefully to determine if order matters.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Look for keywords like "arrange," "sequence," or "rank" (permutation) versus "select," "choose," or "group" (combination).
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
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Simplification Shortcut</h3>
                  <p className="text-gray-700">For C(n,r), you can simplify by canceling out the larger factorial terms. For example, C(10,2) = (10×9)/(2×1) = 45, much easier than calculating 10!, 2!, and 8! separately.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Symmetry Property</h3>
                  <p className="text-gray-700">C(n,r) = C(n, n-r). This means choosing r items is the same as choosing which (n-r) items to leave out. Use the smaller value for easier calculations.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Quick Mental Math</h3>
                  <p className="text-gray-700">For small values, memorize common combinations: C(5,2)=10, C(6,2)=15, C(7,2)=21. These appear frequently in problems and can save calculation time.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Pascal's Triangle</h3>
                  <p className="text-gray-700">The values of C(n,r) form Pascal's Triangle. Each number is the sum of the two numbers above it, which can be useful for finding combinations without direct calculation.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Relationship Formula</h3>
                  <p className="text-gray-700">Remember that P(n,r) = C(n,r) × r!. If you know one value, you can quickly calculate the other without repeating all calculations.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Problem-Solving Strategy</h3>
                  <p className="text-gray-700">When stuck, try listing out small examples manually. If you can see the pattern with small numbers, it's easier to identify whether you need combinations or permutations.</p>
                </div>
              </div>
            </section>

            {/* Properties and Special Cases */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Important Properties and Special Cases
              </h2>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">Identity Properties</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>C(n, 0) = 1</strong> - There is exactly one way to choose nothing</li>
                    <li><strong>C(n, n) = 1</strong> - There is exactly one way to choose everything</li>
                    <li><strong>C(n, 1) = n</strong> - There are n ways to choose one item from n items</li>
                    <li><strong>C(n, r) = C(n, n-r)</strong> - Symmetry property (choosing r is same as leaving n-r)</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">Addition Property</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>C(n, r) = C(n-1, r-1) + C(n-1, r)</strong>
                  </p>
                  <p className="text-gray-700">
                    This is the foundation of Pascal's Triangle. The number of ways to choose r items from n items equals the sum of choosing r-1 from n-1 (including a specific item) and choosing r from n-1 (excluding that item).
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">Relationship Between nCr and nPr</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>P(n, r) = C(n, r) × r!</strong>
                  </p>
                  <p className="text-gray-700">
                    The number of permutations equals the number of combinations multiplied by the number of ways to arrange r items (r factorial). This makes sense because for each combination, there are r! different orderings.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">Binomial Theorem Connection</h3>
                  <p className="text-gray-700">
                    Combination values are also called binomial coefficients because they appear in the expansion of (a + b)ⁿ. The coefficient of aⁿ⁻ʳbʳ in this expansion is C(n, r).
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
                <div className="bg-purple-50 border-l-4 border-purple-500 rounded-xl p-6">
                  <p className="font-semibold text-purple-900 mb-2">Problem 1: Beginner</p>
                  <p className="text-gray-700">
                    A school committee needs to select 4 students from a group of 10 volunteers. How many different committees can be formed?
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: Does the order of selection matter for a committee?</span>
                  </p>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 rounded-xl p-6">
                  <p className="font-semibold text-purple-900 mb-2">Problem 2: Beginner</p>
                  <p className="text-gray-700">
                    In a race with 8 runners, how many different ways can the gold, silver, and bronze medals be awarded?
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: Does finishing order matter for medal positions?</span>
                  </p>
                </div>

                <div className="bg-pink-50 border-l-4 border-pink-500 rounded-xl p-6">
                  <p className="font-semibold text-pink-900 mb-2">Problem 3: Intermediate</p>
                  <p className="text-gray-700">
                    A pizza parlor offers 12 different toppings. If you want to create a pizza with exactly 5 toppings, how many different combinations are possible?
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: Think about whether the order you add toppings matters.</span>
                  </p>
                </div>

                <div className="bg-pink-50 border-l-4 border-pink-500 rounded-xl p-6">
                  <p className="font-semibold text-pink-900 mb-2">Problem 4: Intermediate</p>
                  <p className="text-gray-700">
                    How many different 4-letter "words" (including nonsense words) can be formed using the letters A, B, C, D, E, F without repeating any letter?
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: Consider if ABCD is different from DCBA.</span>
                  </p>
                </div>

                <div className="bg-rose-50 border-l-4 border-rose-500 rounded-xl p-6">
                  <p className="font-semibold text-rose-900 mb-2">Problem 5: Advanced</p>
                  <p className="text-gray-700">
                    In how many ways can a basketball team of 5 players be chosen from 12 players, if 2 specific players refuse to play together?
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: Calculate total combinations, then subtract invalid combinations.</span>
                  </p>
                </div>

                <div className="bg-rose-50 border-l-4 border-rose-500 rounded-xl p-6">
                  <p className="font-semibold text-rose-900 mb-2">Problem 6: Advanced</p>
                  <p className="text-gray-700">
                    A company has 7 employees. In how many ways can they form a leadership team consisting of a president, vice president, and secretary if no person can hold more than one position?
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: Each position is distinct and matters.</span>
                  </p>
                </div>

                <div className="bg-rose-50 border-l-4 border-rose-500 rounded-xl p-6">
                  <p className="font-semibold text-rose-900 mb-2">Problem 7: Challenge</p>
                  <p className="text-gray-700">
                    In a standard deck of 52 cards, how many different 5-card poker hands contain exactly 3 aces?
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: You need to choose 3 aces from 4, and 2 other cards from the remaining 48.</span>
                  </p>
                </div>

                <div className="bg-rose-50 border-l-4 border-rose-500 rounded-xl p-6">
                  <p className="font-semibold text-rose-900 mb-2">Problem 8: Challenge</p>
                  <p className="text-gray-700">
                    How many different ways can you arrange the letters in the word "MATHEMATICS" if you use all 11 letters?
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: This involves permutations with repetition—some letters repeat!</span>
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
                    What is the difference between nCr and nPr?
                  </h3>
                  <p className="text-gray-700">
                    nCr (combinations) is used when order doesn't matter—it counts the number of ways to choose r items from n items. nPr (permutations) is used when order matters—it counts the number of ways to arrange r items selected from n items. Always remember: P(n,r) = C(n,r) × r!, meaning there are r! different arrangements for each combination.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do I know whether to use combinations or permutations?
                  </h3>
                  <p className="text-gray-700">
                    Ask yourself: "Does the order of selection matter?" If rearranging the selected items creates a different outcome, use permutations. If rearranging doesn't create a new outcome, use combinations. For example, selecting team members uses combinations (the order you pick them doesn't matter), but assigning positions to team members uses permutations (position assignment order matters).
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What does "n choose r" mean?
                  </h3>
                  <p className="text-gray-700">
                    "n choose r" is another way to say C(n,r) or nCr. It represents the number of ways to choose r items from a set of n items, where order doesn't matter. For example, "5 choose 2" means C(5,2) = 10—there are 10 different ways to select 2 items from a group of 5 items.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can r be greater than n in combinations?
                  </h3>
                  <p className="text-gray-700">
                    No, r cannot be greater than n in standard combinations or permutations. You cannot choose or arrange more items than you have available. The valid range is 0 ≤ r ≤ n. If r &gt; n, the result is mathematically defined as 0 (zero ways to choose more items than exist).
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is a factorial and how is it calculated?
                  </h3>
                  <p className="text-gray-700">
                    A factorial, denoted by n!, is the product of all positive integers from 1 to n. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120. By definition, 0! = 1 and 1! = 1. Factorials grow very rapidly—10! = 3,628,800 and 20! = 2,432,902,008,176,640,000. Our calculator handles factorials automatically in combination and permutation formulas.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why is the calculator limited to n ≤ 170?
                  </h3>
                  <p className="text-gray-700">
                    Factorials grow extremely large very quickly. 170! is approximately 7.26 × 10³⁰⁶, which is near the maximum value that can be stored in standard floating-point numbers. Beyond 170!, we encounter computational overflow errors. For most practical applications, values up to 170 are more than sufficient.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What are binomial coefficients?
                  </h3>
                  <p className="text-gray-700">
                    Binomial coefficients are another name for combination values C(n,r). They're called this because they appear as coefficients in the binomial expansion of (a + b)ⁿ. For example, (a + b)³ = a³ + 3a²b + 3ab² + b³, where the coefficients 1, 3, 3, 1 are C(3,0), C(3,1), C(3,2), and C(3,3) respectively.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How is this calculator useful for probability?
                  </h3>
                  <p className="text-gray-700">
                    Combinations are fundamental in probability calculations. The probability of an event is often calculated as (favorable outcomes)/(total possible outcomes). For example, the probability of drawing a specific 5-card poker hand is 1/C(52,5) because there are C(52,5) total possible hands. This calculator helps you quickly compute these values for probability problems.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is Pascal's Triangle and how does it relate to combinations?
                  </h3>
                  <p className="text-gray-700">
                    Pascal's Triangle is a triangular array where each number is the sum of the two numbers above it. Each row represents the combination values for a given n. Row 5, for example, shows: 1, 5, 10, 10, 5, 1, which are C(5,0), C(5,1), C(5,2), C(5,3), C(5,4), and C(5,5). It's a visual tool for understanding combination patterns and relationships.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can this calculator handle combinations with repetition?
                  </h3>
                  <p className="text-gray-700">
                    This calculator computes standard combinations without repetition (where each item can be chosen at most once). Combinations with repetition use a different formula: C(n+r-1, r). If you need combinations with repetition (like choosing ice cream flavors where you can pick the same flavor multiple times), you'll need to use the modified formula or a specialized calculator.
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
                Our Combinations Calculator provides a powerful, user-friendly tool for solving combinatorics problems with precision and clarity. Whether you're a student learning about probability and counting principles, a teacher creating educational materials, a statistician analyzing data, or anyone working with mathematical combinations and permutations, this calculator delivers accurate results with comprehensive step-by-step explanations.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Understanding the difference between combinations and permutations is essential for correctly solving counting problems. By mastering these concepts and using our calculator to verify your work, you'll develop stronger problem-solving skills and mathematical intuition. The detailed solutions provided help you learn the methodology, not just get the answer.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Start using our calculator today to solve combinations and permutations quickly, check your homework, prepare for exams, or explore the fascinating world of combinatorics. With proper mathematical notation, factorial breakdowns, and clear explanations, learning and applying these important mathematical concepts has never been easier. Make this calculator your go-to tool for all combination and permutation calculations!
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
              Need Help with Combinatorics and Probability?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master combinations, permutations, probability theory, and discrete mathematics. Get personalized one-on-one guidance tailored to your learning style.
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
