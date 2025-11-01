'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowLeft, RotateCcw, Home, Sparkles } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function QuadraticFormulaCalculator() {
  const [a, setA] = useState<string>('1');
  const [b, setB] = useState<string>('0');
  const [c, setC] = useState<string>('0');
  const [results, setResults] = useState<any>(null);

  // Helper function to simplify square root
  const simplifySquareRoot = (n: number): { coefficient: number; radicand: number } => {
    if (n === 0) return { coefficient: 0, radicand: 1 };
    if (n < 0) return { coefficient: 1, radicand: Math.abs(n) };

    let coefficient = 1;
    let radicand = n;

    for (let i = Math.floor(Math.sqrt(n)); i > 1; i--) {
      const square = i * i;
      if (radicand % square === 0) {
        coefficient *= i;
        radicand = radicand / square;
        break;
      }
    }

    return { coefficient, radicand };
  };

  // Helper function to find GCD
  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  // Helper function to simplify fraction
  const simplifyFraction = (numerator: number, denominator: number): { num: number; den: number } => {
    const divisor = gcd(numerator, denominator);
    return {
      num: numerator / divisor,
      den: denominator / divisor,
    };
  };

  const calculateQuadratic = () => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(c);

    if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
      alert('Please enter valid numbers for a, b, and c');
      return;
    }

    if (numA === 0) {
      alert('Coefficient "a" cannot be 0 for a quadratic equation');
      return;
    }

    // Calculate discriminant
    const discriminant = numB * numB - 4 * numA * numC;

    // Prepare step-by-step solution
    const steps: any = {
      equation: `${numA}x² ${numB >= 0 ? '+' : ''}${numB}x ${numC >= 0 ? '+' : ''}${numC} = 0`,
      coefficients: { a: numA, b: numB, c: numC },
      discriminant: {
        value: discriminant,
        calculation: `(${numB})² - 4(${numA})(${numC}) = ${numB * numB} - ${4 * numA * numC} = ${discriminant}`,
      },
    };

    if (discriminant > 0) {
      // Two real roots
      const sqrtDiscriminant = Math.sqrt(discriminant);
      const x1 = (-numB + sqrtDiscriminant) / (2 * numA);
      const x2 = (-numB - sqrtDiscriminant) / (2 * numA);

      // Simplified radical form
      const simplified = simplifySquareRoot(discriminant);
      const negB = -numB;
      const twoA = 2 * numA;

      steps.type = 'Two Real Roots';
      steps.roots = {
        x1: { decimal: x1, exact: null },
        x2: { decimal: x2, exact: null },
      };

      // Build exact form
      if (simplified.radicand === 1) {
        // Perfect square
        const num1 = negB + simplified.coefficient;
        const num2 = negB - simplified.coefficient;
        const frac1 = simplifyFraction(num1, twoA);
        const frac2 = simplifyFraction(num2, twoA);

        steps.roots.x1.exact = frac1.den === 1 ? `${frac1.num}` : `${frac1.num}/${frac1.den}`;
        steps.roots.x2.exact = frac2.den === 1 ? `${frac2.num}` : `${frac2.num}/${frac2.den}`;
      } else {
        // Simplified radical form
        const fracNegB = simplifyFraction(negB, twoA);
        const fracCoeff = simplifyFraction(simplified.coefficient, twoA);

        const negBPart = fracNegB.den === 1 ? `${fracNegB.num}` : `${fracNegB.num}/${fracNegB.den}`;
        const coeffPart = fracCoeff.den === 1 ? `${fracCoeff.num}` : `${fracCoeff.num}/${fracCoeff.den}`;

        steps.roots.x1.exact = `${negBPart} + ${coeffPart}√${simplified.radicand}`;
        steps.roots.x2.exact = `${negBPart} - ${coeffPart}√${simplified.radicand}`;
      }

      steps.solution = `x = ${-numB} ± √${discriminant} / ${2 * numA}`;

    } else if (discriminant === 0) {
      // One real root (repeated)
      const x = -numB / (2 * numA);
      const frac = simplifyFraction(-numB, 2 * numA);

      steps.type = 'One Real Root (Repeated)';
      steps.roots = {
        x: {
          decimal: x,
          exact: frac.den === 1 ? `${frac.num}` : `${frac.num}/${frac.den}`,
        },
      };
      steps.solution = `x = ${-numB} / ${2 * numA}`;

    } else {
      // Complex roots
      const realPart = -numB / (2 * numA);
      const imaginaryPart = Math.sqrt(-discriminant) / (2 * numA);

      // Simplified forms
      const simplified = simplifySquareRoot(-discriminant);
      const fracReal = simplifyFraction(-numB, 2 * numA);
      const fracImag = simplifyFraction(simplified.coefficient, 2 * numA);

      steps.type = 'Two Complex Roots';
      steps.roots = {
        x1: {
          decimal: `${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i`,
          exact: null,
        },
        x2: {
          decimal: `${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i`,
          exact: null,
        },
      };

      const realPartStr = fracReal.den === 1 ? `${fracReal.num}` : `${fracReal.num}/${fracReal.den}`;
      const imagPartStr = fracImag.den === 1 ? `${fracImag.num}` : `${fracImag.num}/${fracImag.den}`;

      if (simplified.radicand === 1) {
        steps.roots.x1.exact = `${realPartStr} + ${imagPartStr}i`;
        steps.roots.x2.exact = `${realPartStr} - ${imagPartStr}i`;
      } else {
        steps.roots.x1.exact = `${realPartStr} + ${imagPartStr}i√${simplified.radicand}`;
        steps.roots.x2.exact = `${realPartStr} - ${imagPartStr}i√${simplified.radicand}`;
      }

      steps.solution = `x = ${-numB} ± i√${-discriminant} / ${2 * numA}`;
    }

    setResults(steps);
  };

  const reset = () => {
    setA('1');
    setB('0');
    setC('0');
    setResults(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
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
            <span className="text-gray-600">Quadratic Formula Calculator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Quadratic Formula Calculator</h1>
            </div>
            <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
              Solve quadratic equations (ax² + bx + c = 0) with step-by-step solutions. Get exact radical forms, decimal approximations, discriminant analysis, and complex roots instantly.
            </p>
          </div>
        </div>

        {/* Main Calculator Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Solve Quadratic Equations
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Enter the coefficients of your quadratic equation in the form <span className="font-semibold">ax² + bx + c = 0</span>
            </p>
          </div>

          {/* Quadratic Formula Display */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6 mb-6">
            <p className="text-center text-gray-700 mb-2 text-sm md:text-base font-semibold">
              Quadratic Formula:
            </p>
            <div className="text-center text-2xl md:text-3xl font-bold text-gray-900">
              x = <span className="inline-flex items-center">
                <span className="border-t-2 border-gray-900 px-2">
                  -b ± √<span className="border-b-2 border-gray-900">b² - 4ac</span>
                </span>
                <span className="mx-2">/</span>
                <span>2a</span>
              </span>
            </div>
          </div>

          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <Label htmlFor="a" className="text-sm md:text-base font-semibold text-gray-700">
                Coefficient a
              </Label>
              <Input
                id="a"
                type="number"
                step="any"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="mt-2 text-lg"
                placeholder="Enter a"
              />
              <p className="text-xs text-gray-500 mt-1">Cannot be 0</p>
            </div>

            <div>
              <Label htmlFor="b" className="text-sm md:text-base font-semibold text-gray-700">
                Coefficient b
              </Label>
              <Input
                id="b"
                type="number"
                step="any"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="mt-2 text-lg"
                placeholder="Enter b"
              />
              <p className="text-xs text-gray-500 mt-1">Can be any number</p>
            </div>

            <div>
              <Label htmlFor="c" className="text-sm md:text-base font-semibold text-gray-700">
                Coefficient c
              </Label>
              <Input
                id="c"
                type="number"
                step="any"
                value={c}
                onChange={(e) => setC(e.target.value)}
                className="mt-2 text-lg"
                placeholder="Enter c"
              />
              <p className="text-xs text-gray-500 mt-1">Can be any number</p>
            </div>
          </div>

          {/* Current Equation Display */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-center text-lg md:text-xl font-semibold text-gray-900">
              Your Equation: <span className="text-purple-600">{a || '0'}x² {parseFloat(b) >= 0 ? '+' : ''}{b || '0'}x {parseFloat(c) >= 0 ? '+' : ''}{c || '0'} = 0</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={calculateQuadratic}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg font-semibold rounded-xl"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Solve Equation
            </Button>
            <Button
              onClick={reset}
              variant="outline"
              className="sm:w-auto px-8 py-6 text-lg font-semibold rounded-xl"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Reset
            </Button>
          </div>
        </div>

        {/* Results Section */}
        {results && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Solution
            </h3>

            {/* Equation */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Equation:</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{results.equation}</p>
            </div>

            {/* Coefficients */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Coefficients:</p>
              <p className="text-lg">
                <span className="font-semibold">a =</span> {results.coefficients.a},{' '}
                <span className="font-semibold">b =</span> {results.coefficients.b},{' '}
                <span className="font-semibold">c =</span> {results.coefficients.c}
              </p>
            </div>

            {/* Discriminant */}
            <div className="mb-6 p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Step 1: Calculate the Discriminant (b² - 4ac)</p>
              <p className="text-lg mb-2">{results.discriminant.calculation}</p>
              <p className="text-xl font-bold text-gray-900">
                Discriminant = {results.discriminant.value}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {results.discriminant.value > 0 && '✓ Discriminant > 0: Two distinct real roots'}
                {results.discriminant.value === 0 && '✓ Discriminant = 0: One repeated real root'}
                {results.discriminant.value < 0 && '✓ Discriminant < 0: Two complex roots'}
              </p>
            </div>

            {/* Solution Steps */}
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Step 2: Apply the Quadratic Formula</p>
              <p className="text-lg md:text-xl font-semibold mb-4">{results.solution}</p>
            </div>

            {/* Roots */}
            <div className="p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl">
              <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                {results.type}
              </h4>

              {results.type === 'Two Real Roots' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Root 1 (x₁):</p>
                    <p className="text-xl md:text-2xl font-bold text-purple-600 mb-1">
                      x₁ = {results.roots.x1.exact}
                    </p>
                    <p className="text-gray-700">
                      ≈ {results.roots.x1.decimal.toFixed(6)}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Root 2 (x₂):</p>
                    <p className="text-xl md:text-2xl font-bold text-blue-600 mb-1">
                      x₂ = {results.roots.x2.exact}
                    </p>
                    <p className="text-gray-700">
                      ≈ {results.roots.x2.decimal.toFixed(6)}
                    </p>
                  </div>
                </div>
              )}

              {results.type === 'One Real Root (Repeated)' && (
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Root (x):</p>
                  <p className="text-xl md:text-2xl font-bold text-purple-600 mb-1">
                    x = {results.roots.x.exact}
                  </p>
                  <p className="text-gray-700">
                    ≈ {results.roots.x.decimal.toFixed(6)}
                  </p>
                </div>
              )}

              {results.type === 'Two Complex Roots' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Root 1 (x₁):</p>
                    <p className="text-xl md:text-2xl font-bold text-purple-600 mb-1">
                      x₁ = {results.roots.x1.exact}
                    </p>
                    <p className="text-gray-700">
                      ≈ {results.roots.x1.decimal}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Root 2 (x₂):</p>
                    <p className="text-xl md:text-2xl font-bold text-blue-600 mb-1">
                      x₂ = {results.roots.x2.exact}
                    </p>
                    <p className="text-gray-700">
                      ≈ {results.roots.x2.decimal}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SEO Content Sections */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <article className="prose prose-gray max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              What is the Quadratic Formula?
            </h2>
            <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
              The quadratic formula is a fundamental mathematical tool used to find the solutions (roots) of quadratic equations. A quadratic equation is any polynomial equation of the second degree, written in the standard form <strong>ax² + bx + c = 0</strong>, where <strong>a</strong>, <strong>b</strong>, and <strong>c</strong> are constants, and <strong>a ≠ 0</strong>. The quadratic formula provides an algebraic method to solve for the unknown variable <strong>x</strong> without requiring factorization or completing the square.
            </p>
            <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
              The formula itself is expressed as: <strong>x = [-b ± √(b² - 4ac)] / 2a</strong>. This elegant equation was derived through the method of completing the square and works for all quadratic equations, regardless of whether the roots are real, repeated, or complex. The ± symbol indicates that there are typically two solutions to a quadratic equation, obtained by using both the positive and negative values of the square root term.
            </p>
            <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
              The expression under the square root, <strong>b² - 4ac</strong>, is called the discriminant and plays a crucial role in determining the nature of the solutions. When the discriminant is positive, the equation has two distinct real roots. When it equals zero, there is exactly one real root (a repeated root). When the discriminant is negative, the equation has two complex conjugate roots involving the imaginary unit <strong>i</strong>, where <strong>i = √(-1)</strong>.
            </p>
            <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
              Our advanced quadratic formula calculator not only computes the roots but also provides step-by-step solutions, discriminant analysis, and both exact (simplified radical) and decimal approximations. Whether you're a student learning algebra, an engineer solving physics problems, or a professional working with parabolic models, this tool offers accurate and comprehensive solutions for all your quadratic equation needs.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
              Understanding the Discriminant (b² - 4ac)
            </h2>
            <p className="text-gray-700 mb-6 text-sm md:text-base leading-relaxed">
              The discriminant is the key to understanding what kind of solutions a quadratic equation will have. Here's a comprehensive guide to interpreting the discriminant:
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Discriminant &gt; 0 (Positive)
                </h3>
                <p className="text-gray-700 mb-3 text-sm md:text-base">
                  When <strong>b² - 4ac &gt; 0</strong>, the quadratic equation has <strong>two distinct real roots</strong>. This means the parabola crosses the x-axis at two different points.
                </p>
                <p className="font-mono bg-white p-3 rounded border border-green-200 text-sm md:text-base">
                  Example: x² - 5x + 6 = 0
                  <br />Discriminant = 25 - 24 = 1 &gt; 0
                  <br />Roots: x₁ = 3, x₂ = 2
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Discriminant = 0 (Zero)
                </h3>
                <p className="text-gray-700 mb-3 text-sm md:text-base">
                  When <strong>b² - 4ac = 0</strong>, the quadratic equation has <strong>one repeated real root</strong> (also called a double root). The parabola just touches the x-axis at exactly one point (the vertex).
                </p>
                <p className="font-mono bg-white p-3 rounded border border-yellow-200 text-sm md:text-base">
                  Example: x² - 4x + 4 = 0
                  <br />Discriminant = 16 - 16 = 0
                  <br />Root: x = 2 (repeated)
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Discriminant &lt; 0 (Negative)
                </h3>
                <p className="text-gray-700 mb-3 text-sm md:text-base">
                  When <strong>b² - 4ac &lt; 0</strong>, the quadratic equation has <strong>two complex conjugate roots</strong>. These roots involve the imaginary unit <strong>i</strong>, and the parabola does not intersect the x-axis.
                </p>
                <p className="font-mono bg-white p-3 rounded border border-purple-200 text-sm md:text-base">
                  Example: x² + 2x + 5 = 0
                  <br />Discriminant = 4 - 20 = -16 &lt; 0
                  <br />Roots: x₁ = -1 + 2i, x₂ = -1 - 2i
                </p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
              How to Use the Quadratic Formula Calculator
            </h2>
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <ol className="list-decimal list-inside space-y-3 text-gray-700 text-sm md:text-base">
                <li className="leading-relaxed">
                  <strong>Identify your coefficients:</strong> Write your quadratic equation in standard form ax² + bx + c = 0 and identify the values of a, b, and c.
                </li>
                <li className="leading-relaxed">
                  <strong>Enter the values:</strong> Input the coefficients a, b, and c into the calculator. Remember that a cannot be zero (otherwise it's not a quadratic equation).
                </li>
                <li className="leading-relaxed">
                  <strong>Click "Solve Equation":</strong> The calculator will compute the discriminant, apply the quadratic formula, and determine the type and value of the roots.
                </li>
                <li className="leading-relaxed">
                  <strong>Review the solution:</strong> Examine the step-by-step solution including discriminant calculation, formula application, and both exact and decimal forms of the roots.
                </li>
                <li className="leading-relaxed">
                  <strong>Verify your answer:</strong> You can substitute the roots back into the original equation to verify they satisfy ax² + bx + c = 0.
                </li>
              </ol>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
              Step-by-Step Examples
            </h2>

            <div className="space-y-8 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-purple-600 mb-4">
                  Example 1: Two Real Roots
                </h3>
                <p className="font-semibold mb-2 text-sm md:text-base">Solve: x² - 7x + 10 = 0</p>
                <div className="space-y-2 text-gray-700 text-sm md:text-base">
                  <p><strong>Step 1:</strong> Identify coefficients: a = 1, b = -7, c = 10</p>
                  <p><strong>Step 2:</strong> Calculate discriminant: b² - 4ac = (-7)² - 4(1)(10) = 49 - 40 = 9</p>
                  <p><strong>Step 3:</strong> Since 9 &gt; 0, we have two real roots</p>
                  <p><strong>Step 4:</strong> Apply formula: x = [7 ± √9] / 2 = [7 ± 3] / 2</p>
                  <p><strong>Step 5:</strong> Solutions:</p>
                  <p className="ml-6">x₁ = (7 + 3) / 2 = 10 / 2 = <strong className="text-purple-600">5</strong></p>
                  <p className="ml-6">x₂ = (7 - 3) / 2 = 4 / 2 = <strong className="text-purple-600">2</strong></p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-yellow-600 mb-4">
                  Example 2: One Repeated Root
                </h3>
                <p className="font-semibold mb-2 text-sm md:text-base">Solve: 4x² - 12x + 9 = 0</p>
                <div className="space-y-2 text-gray-700 text-sm md:text-base">
                  <p><strong>Step 1:</strong> Identify coefficients: a = 4, b = -12, c = 9</p>
                  <p><strong>Step 2:</strong> Calculate discriminant: b² - 4ac = (-12)² - 4(4)(9) = 144 - 144 = 0</p>
                  <p><strong>Step 3:</strong> Since discriminant = 0, we have one repeated root</p>
                  <p><strong>Step 4:</strong> Apply formula: x = -(-12) / (2 × 4) = 12 / 8 = 3/2</p>
                  <p><strong>Step 5:</strong> Solution: x = <strong className="text-yellow-600">3/2</strong> or <strong className="text-yellow-600">1.5</strong></p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-600 mb-4">
                  Example 3: Complex Roots
                </h3>
                <p className="font-semibold mb-2 text-sm md:text-base">Solve: x² + 4x + 13 = 0</p>
                <div className="space-y-2 text-gray-700 text-sm md:text-base">
                  <p><strong>Step 1:</strong> Identify coefficients: a = 1, b = 4, c = 13</p>
                  <p><strong>Step 2:</strong> Calculate discriminant: b² - 4ac = (4)² - 4(1)(13) = 16 - 52 = -36</p>
                  <p><strong>Step 3:</strong> Since -36 &lt; 0, we have two complex roots</p>
                  <p><strong>Step 4:</strong> Apply formula: x = [-4 ± √(-36)] / 2 = [-4 ± 6i] / 2</p>
                  <p><strong>Step 5:</strong> Solutions:</p>
                  <p className="ml-6">x₁ = (-4 + 6i) / 2 = <strong className="text-blue-600">-2 + 3i</strong></p>
                  <p className="ml-6">x₂ = (-4 - 6i) / 2 = <strong className="text-blue-600">-2 - 3i</strong></p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
              Why Use Our Quadratic Formula Calculator?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">✓</span>
                  Step-by-Step Solutions
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  See detailed working for every calculation including discriminant analysis and formula application, perfect for learning and verification.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">✓</span>
                  Exact & Decimal Forms
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  Get both simplified radical/fractional forms and decimal approximations for maximum flexibility in your work.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">✓</span>
                  Complex Number Support
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  Handles all types of roots including complex numbers with imaginary components, displayed in standard a + bi form.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">✓</span>
                  Mobile Optimized
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  Fully responsive design works perfectly on all devices from smartphones to desktop computers.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">✓</span>
                  Instant Results
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  Fast calculations with immediate display of roots, discriminant, and complete solution steps.
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">✓</span>
                  100% Free
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  No registration, no fees, no limitations. Use our calculator as many times as you need, completely free.
                </p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
              Real-World Applications of Quadratic Equations
            </h2>
            <div className="space-y-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  📐 Physics and Engineering
                </h3>
                <p className="text-gray-700 mb-3 text-sm md:text-base">
                  Quadratic equations model projectile motion, where the height of an object follows a parabolic path. The equation <strong>h(t) = -16t² + v₀t + h₀</strong> describes the height of a projectile at time t, where v₀ is initial velocity and h₀ is initial height. Engineers use quadratic formulas to calculate optimal launch angles, maximum heights, and impact times.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Example: A ball thrown upward at 48 ft/s from 6 feet high reaches the ground when -16t² + 48t + 6 = 0.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  💰 Business and Economics
                </h3>
                <p className="text-gray-700 mb-3 text-sm md:text-base">
                  Revenue and profit optimization often involve quadratic functions. The profit function <strong>P(x) = -ax² + bx - c</strong> represents how profit changes with production quantity. Business analysts use the quadratic formula to find break-even points (where P(x) = 0) and maximum profit levels by analyzing the vertex of the parabola.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Example: If profit P(x) = -2x² + 80x - 600, solving P(x) = 0 gives break-even production quantities.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  🏗️ Architecture and Design
                </h3>
                <p className="text-gray-700 mb-3 text-sm md:text-base">
                  Parabolic arches and curves in architecture follow quadratic equations. Designers use these formulas to calculate structural dimensions, ensure proper load distribution, and create aesthetically pleasing curves. Suspension bridges, satellite dishes, and reflector designs all rely on quadratic mathematics.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Example: A parabolic arch with equation y = -0.1x² + 4x must satisfy specific height requirements at various points.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  🌾 Agriculture and Land Management
                </h3>
                <p className="text-gray-700 mb-3 text-sm md:text-base">
                  Farmers and land planners use quadratic equations to optimize rectangular field areas with fixed perimeter constraints. Given perimeter P, if length = x, then width = (P/2 - x), and area A = x(P/2 - x) = -x² + (P/2)x, a quadratic function maximized at the vertex.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Example: With 200m of fencing, find dimensions that maximize area: A = -x² + 100x.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  🎮 Computer Graphics and Gaming
                </h3>
                <p className="text-gray-700 mb-3 text-sm md:text-base">
                  Video game physics engines use quadratic equations to simulate realistic motion, collision detection, and trajectory calculations. The parabolic paths of jumping characters, flying projectiles, and falling objects are all governed by quadratic mathematics.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Example: A character's jump arc y = -0.5x² + 3x models the height versus horizontal distance traveled.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  🔬 Science and Research
                </h3>
                <p className="text-gray-700 mb-3 text-sm md:text-base">
                  Chemical reaction rates, population growth models, and orbital mechanics often involve quadratic relationships. Scientists use the quadratic formula to solve for equilibrium points, critical concentrations, and time parameters in experimental data.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Example: A population model P(t) = 5t² - 30t + 100 might need solving for specific population levels.
                </p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6 mb-8">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  What is a quadratic equation?
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  A quadratic equation is a polynomial equation of degree 2, written in the standard form <strong>ax² + bx + c = 0</strong>, where a, b, and c are constants and <strong>a ≠ 0</strong>. The term "quadratic" comes from "quadratus," the Latin word for square, because the variable is squared (raised to the power of 2).
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  When should I use the quadratic formula?
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  Use the quadratic formula when you need to solve any quadratic equation, especially when factoring is difficult or impossible. It's particularly useful for equations with decimal coefficients, large numbers, or when you need exact radical forms. The formula works for all quadratic equations, making it the most universal solution method.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  What does the discriminant tell us?
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  The discriminant <strong>(b² - 4ac)</strong> determines the nature of the roots: If positive, there are two distinct real roots; if zero, one repeated real root; if negative, two complex conjugate roots. The discriminant also indicates whether the parabola crosses the x-axis (positive), touches it (zero), or doesn't intersect it (negative).
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Can the coefficient 'a' be zero?
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  No, if a = 0, the equation becomes <strong>bx + c = 0</strong>, which is a linear equation, not a quadratic equation. The coefficient 'a' must be non-zero for the equation to be quadratic (degree 2). Our calculator will show an error if you try to enter a = 0.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  What are complex roots?
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  Complex roots occur when the discriminant is negative, requiring the square root of a negative number. These roots are expressed in the form <strong>a + bi</strong>, where <strong>i = √(-1)</strong> is the imaginary unit. Complex roots always come in conjugate pairs: if <strong>a + bi</strong> is a root, then <strong>a - bi</strong> is also a root.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  How do I verify my solution?
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  Substitute each root back into the original equation <strong>ax² + bx + c = 0</strong>. If the root is correct, the left side should equal zero. For example, if x = 3 is a root of x² - 5x + 6 = 0, then (3)² - 5(3) + 6 = 9 - 15 + 6 = 0 ✓. This verification confirms the accuracy of your solution.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  What is a repeated root?
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  A repeated root (also called a double root) occurs when the discriminant equals zero, giving only one unique solution. This happens when the parabola just touches the x-axis at its vertex. Algebraically, both roots from the formula <strong>x = (-b ± √0) / 2a</strong> simplify to the same value: <strong>x = -b / 2a</strong>.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Can I use this for equations not in standard form?
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  First, rearrange your equation into standard form <strong>ax² + bx + c = 0</strong>. For example, if you have <strong>3x² = 5x - 2</strong>, rearrange to <strong>3x² - 5x + 2 = 0</strong>, giving a = 3, b = -5, c = 2. Then use the calculator with these coefficients. Always ensure all terms are on the left side and the equation equals zero.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  What's the difference between exact and decimal forms?
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  The exact form uses fractions and radicals (like <strong>3/2</strong> or <strong>1 + √5</strong>) and is mathematically precise. The decimal form (like <strong>1.5</strong> or <strong>3.236068</strong>) is an approximation useful for practical applications. Exact forms are preferred in pure mathematics, while decimals are often used in engineering and applied sciences.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Can quadratic equations have more than two solutions?
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  No, by the Fundamental Theorem of Algebra, a polynomial equation of degree n has exactly n roots (counting multiplicities). Since quadratic equations are degree 2, they always have exactly two roots total. These may be two distinct real roots, one repeated real root (counted twice), or two complex conjugate roots, but never more than two.
                </p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
              Common Quadratic Formula Mistakes to Avoid
            </h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-6">
              <ul className="space-y-3 text-gray-700 text-sm md:text-base">
                <li className="flex items-start">
                  <span className="text-red-600 font-bold mr-2">✗</span>
                  <span><strong>Forgetting the negative sign:</strong> Remember it's <strong>-b</strong> in the formula, not just b. If b = -5, then -b = 5.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 font-bold mr-2">✗</span>
                  <span><strong>Incorrect order of operations:</strong> Calculate b² - 4ac completely before taking the square root, not √b² - 4ac.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 font-bold mr-2">✗</span>
                  <span><strong>Dividing only part by 2a:</strong> The entire numerator (-b ± √discriminant) must be divided by 2a, not just part of it.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 font-bold mr-2">✗</span>
                  <span><strong>Missing the ± symbol:</strong> Don't forget to calculate both roots using + and - with the square root term.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 font-bold mr-2">✗</span>
                  <span><strong>Simplifying too early:</strong> Keep exact radical forms until the final answer; don't round intermediate steps.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 font-bold mr-2">✗</span>
                  <span><strong>Misidentifying coefficients:</strong> In 5 - 3x + 2x², rearrange first: 2x² - 3x + 5, so a = 2, b = -3, c = 5.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 font-bold mr-2">✗</span>
                  <span><strong>Ignoring negative discriminants:</strong> When b² - 4ac &lt; 0, don't stop! Express roots as complex numbers with i.</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
              Alternative Methods for Solving Quadratic Equations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-purple-600 mb-3">
                  Factoring Method
                </h3>
                <p className="text-gray-700 mb-3 text-sm md:text-base">
                  Express the quadratic as a product of two binomials: <strong>(mx + n)(px + q) = 0</strong>. Then use the zero product property: if AB = 0, then A = 0 or B = 0.
                </p>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  Example: x² - 5x + 6 = (x - 2)(x - 3) = 0
                  <br />Therefore: x = 2 or x = 3
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Best for:</strong> Simple integer coefficients that factor easily
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-blue-600 mb-3">
                  Completing the Square
                </h3>
                <p className="text-gray-700 mb-3 text-sm md:text-base">
                  Rewrite the equation as a perfect square trinomial plus a constant: <strong>(x + p)² = q</strong>, then take square roots of both sides.
                </p>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  Example: x² + 6x + 5 = 0
                  <br />→ (x + 3)² - 9 + 5 = 0
                  <br />→ (x + 3)² = 4
                  <br />→ x = -3 ± 2
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Best for:</strong> Deriving the quadratic formula and theoretical understanding
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-green-600 mb-3">
                  Graphing Method
                </h3>
                <p className="text-gray-700 mb-3 text-sm md:text-base">
                  Plot the parabola <strong>y = ax² + bx + c</strong> and find where it intersects the x-axis (where y = 0). The x-coordinates of intersection points are the roots.
                </p>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  Example: Graph y = x² - 4x + 3
                  <br />X-intercepts at (1, 0) and (3, 0)
                  <br />Therefore: x = 1 or x = 3
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Best for:</strong> Visual learners and approximate solutions
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-orange-600 mb-3">
                  Quadratic Formula
                </h3>
                <p className="text-gray-700 mb-3 text-sm md:text-base">
                  Apply <strong>x = [-b ± √(b² - 4ac)] / 2a</strong> directly to find both roots in one step. Works for all quadratic equations without exception.
                </p>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  Example: 2x² + 3x - 5 = 0
                  <br />x = [-3 ± √(9 + 40)] / 4
                  <br />x = [-3 ± 7] / 4
                  <br />x = 1 or x = -5/2
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Best for:</strong> All cases, especially complex coefficients and non-factorable equations
                </p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
              Quick Reference: Quadratic Formula Components
            </h2>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm md:text-base">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-bold text-gray-900 border-b">Component</th>
                    <th className="px-6 py-3 text-left font-bold text-gray-900 border-b">Symbol</th>
                    <th className="px-6 py-3 text-left font-bold text-gray-900 border-b">Meaning</th>
                    <th className="px-6 py-3 text-left font-bold text-gray-900 border-b">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-4 font-semibold">Standard Form</td>
                    <td className="px-6 py-4">ax² + bx + c = 0</td>
                    <td className="px-6 py-4">Required equation format</td>
                    <td className="px-6 py-4">All terms on left, equals zero</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Leading Coefficient</td>
                    <td className="px-6 py-4">a</td>
                    <td className="px-6 py-4">Coefficient of x²</td>
                    <td className="px-6 py-4">Must be non-zero</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4 font-semibold">Linear Coefficient</td>
                    <td className="px-6 py-4">b</td>
                    <td className="px-6 py-4">Coefficient of x</td>
                    <td className="px-6 py-4">Can be zero, positive, or negative</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Constant Term</td>
                    <td className="px-6 py-4">c</td>
                    <td className="px-6 py-4">Term without variable</td>
                    <td className="px-6 py-4">Can be zero, positive, or negative</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4 font-semibold">Discriminant</td>
                    <td className="px-6 py-4">b² - 4ac</td>
                    <td className="px-6 py-4">Determines root type</td>
                    <td className="px-6 py-4">Δ (Delta) is common symbol</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Plus-Minus</td>
                    <td className="px-6 py-4">±</td>
                    <td className="px-6 py-4">Two operations in one</td>
                    <td className="px-6 py-4">Gives both roots simultaneously</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4 font-semibold">Imaginary Unit</td>
                    <td className="px-6 py-4">i</td>
                    <td className="px-6 py-4">√(-1)</td>
                    <td className="px-6 py-4">Used when discriminant &lt; 0</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Roots/Solutions</td>
                    <td className="px-6 py-4">x₁, x₂</td>
                    <td className="px-6 py-4">Values that satisfy equation</td>
                    <td className="px-6 py-4">Also called zeros or solutions</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Ready to Solve Your Quadratic Equations?
              </h2>
              <p className="text-gray-700 mb-6 text-sm md:text-base max-w-3xl mx-auto">
                Use our free quadratic formula calculator to get instant, accurate solutions with step-by-step working. Perfect for students, teachers, engineers, and anyone working with quadratic equations!
              </p>
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-xl"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Start Calculating Now
              </Button>
            </div>
          </article>
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
}
