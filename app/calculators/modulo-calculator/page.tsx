'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, BookOpen, ArrowRight, Percent, Hash } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ModuloResult {
  dividend: number;
  divisor: number;
  quotient: number;
  remainder: number;
  modulo: number;
  steps: string[];
  verification: string;
}

export default function ModuloCalculator() {
  const [dividend, setDividend] = useState<string>('');
  const [divisor, setDivisor] = useState<string>('');
  const [result, setResult] = useState<ModuloResult | null>(null);

  const handleCalculate = () => {
    const a = parseFloat(dividend);
    const b = parseFloat(divisor);

    // Validation
    if (isNaN(a) || isNaN(b)) {
      alert('Please enter valid numbers');
      return;
    }

    if (b === 0) {
      alert('Divisor (modulus) cannot be zero');
      return;
    }

    // For modulo operation, we typically work with integers
    const dividendInt = Math.floor(a);
    const divisorInt = Math.floor(b);

    // Calculate quotient and remainder
    const quotient = Math.floor(dividendInt / divisorInt);
    const remainder = dividendInt % divisorInt;

    // For negative numbers, adjust to get proper modulo (always non-negative)
    let modulo = remainder;
    if (remainder < 0 && divisorInt > 0) {
      modulo = remainder + divisorInt;
    } else if (remainder > 0 && divisorInt < 0) {
      modulo = remainder + divisorInt;
    }

    // Build step-by-step solution
    const steps: string[] = [];

    steps.push(`Calculating ${dividendInt} mod ${divisorInt}:`);
    steps.push('');
    steps.push('Step 1: Understand the problem');
    steps.push(`We need to find the remainder when ${dividendInt} is divided by ${divisorInt}`);
    steps.push('');
    steps.push('Step 2: Perform the division');
    steps.push(`Divide ${dividendInt} by ${divisorInt} to find the quotient and remainder`);
    steps.push(`${dividendInt} ÷ ${divisorInt} = ${quotient} with remainder ${remainder}`);
    steps.push('');
    steps.push('Step 3: Identify the modulo (remainder)');
    steps.push(`${dividendInt} = ${quotient} × ${divisorInt} + ${remainder}`);

    if (remainder !== modulo) {
      steps.push('');
      steps.push('Step 4: Adjust for proper modulo (non-negative)');
      steps.push(`Since remainder is negative, add divisor: ${remainder} + ${divisorInt} = ${modulo}`);
    }

    steps.push('');
    steps.push(`Result: ${dividendInt} mod ${divisorInt} = ${modulo}`);

    // Verification
    const verification = `${quotient} × ${divisorInt} + ${modulo} = ${quotient * divisorInt + modulo}`;

    setResult({
      dividend: dividendInt,
      divisor: divisorInt,
      quotient,
      remainder: modulo,
      modulo,
      steps,
      verification,
    });
  };

  const handleClear = () => {
    setDividend('');
    setDivisor('');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the difference between modulo and remainder?","acceptedAnswer":{"@type":"Answer","text":"In mathematics, modulo and remainder are often used interchangeably, but there can be subtle differences in how negative numbers are handled. The modulo operation typically returns a non-negative result between 0 and |b|-1, while remainder may match the sign of the dividend. For positive numbers, they are identical. In this calculator, we follow the mathematical convention where modulo results are non-negative."}},{"@type":"Question","name":"How is modulo used in programming?","acceptedAnswer":{"@type":"Answer","text":"Modulo is extensively used in programming for: cycling through arrays (index % length), checking even/odd numbers (n % 2), creating hash functions, implementing circular buffers, generating periodic patterns, and constraining values to specific ranges. It\'s fundamental to many algorithms and data structures. Most programming languages use the % operator for modulo."}},{"@type":"Question","name":"Why is modulo important in cryptography?","acceptedAnswer":{"@type":"Answer","text":"Modular arithmetic is the foundation of modern cryptography. RSA encryption, Diffie-Hellman key exchange, and elliptic curve cryptography all rely heavily on modulo operations. The difficulty of certain mathematical problems in modular arithmetic (like discrete logarithm) provides the security for these systems. Modulo operations ensure calculations stay within finite fields, making them suitable for computer implementation."}},{"@type":"Question","name":"Can modulo be negative?","acceptedAnswer":{"@type":"Answer","text":"In mathematics, the modulo operation conventionally returns a non-negative result. However, different programming languages handle this differently. Python always returns a non-negative result matching the divisor\'s sign. Languages like C, Java, and JavaScript return a result matching the dividend\'s sign, which can be negative. This calculator follows the mathematical convention of non-negative results."}},{"@type":"Question","name":"What happens with modulo 0?","acceptedAnswer":{"@type":"Answer","text":"Modulo by zero is undefined, just like division by zero. There\'s no mathematical meaning to finding the remainder when dividing by zero. In programming, attempting modulo by zero typically causes a runtime error or exception. Always ensure your divisor (modulus) is non-zero before performing the operation. This calculator will alert you if you try to calculate modulo 0."}},{"@type":"Question","name":"How do you calculate modulo by hand?","acceptedAnswer":{"@type":"Answer","text":"To calculate a mod b by hand: (1) Divide a by b to get quotient q and remainder r, (2) The remainder r is your answer. For example, 17 mod 5: divide 17 by 5 to get 3 remainder 2, so 17 mod 5 = 2. You can verify: 3 × 5 + 2 = 17. For negative numbers, adjust to ensure the result is non-negative and less than the absolute value of the divisor."}},{"@type":"Question","name":"What is the range of modulo results?","acceptedAnswer":{"@type":"Answer","text":"For a mod b where b is positive, the result always falls in the range [0, b-1]. For example, any number mod 5 will be 0, 1, 2, 3, or 4. This is why modulo is useful for creating cyclic patterns and constraining values to specific ranges. The result is always strictly less than the divisor\'s absolute value."}},{"@type":"Question","name":"What is modular arithmetic?","acceptedAnswer":{"@type":"Answer","text":"Modular arithmetic is a system of arithmetic for integers where numbers \'wrap around\' after reaching a certain value (the modulus). It\'s like clock arithmetic—after 12 comes 1, not 13. In modular arithmetic, two numbers are considered equivalent (congruent) if they have the same remainder when divided by the modulus. Written as a ≡ b (mod n), meaning a and b differ by a multiple of n."}}]}' }}
      />
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-orange-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Modulo Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Percent className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Modulo Calculator
            </h1>
            <p className="text-lg md:text-xl text-orange-100 max-w-2xl mx-auto leading-relaxed">
              Calculate modulo operation (a mod b) with step-by-step solutions. Find remainders, understand division, and verify results with detailed mathematical explanations.
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
                  <Calculator className="w-6 h-6 text-orange-600" />
                  <span className="italic">a</span> mod <span className="italic">b</span> = ?
                </h2>

                {/* Input Fields */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="dividend" className="text-sm font-semibold text-gray-700 mb-3 block">
                      dividend <span className="italic">a</span> =
                    </Label>
                    <Input
                      id="dividend"
                      type="number"
                      placeholder="Enter dividend (a)"
                      value={dividend}
                      onChange={(e) => setDividend(e.target.value)}
                      className="text-center text-lg font-medium"
                    />
                  </div>

                  <div>
                    <Label htmlFor="divisor" className="text-sm font-semibold text-gray-700 mb-3 block">
                      modulus <span className="italic">b</span> =
                      <span className="block text-xs text-gray-500 font-normal mt-1 italic">divisor</span>
                    </Label>
                    <Input
                      id="divisor"
                      type="number"
                      placeholder="Enter modulus (b)"
                      value={divisor}
                      onChange={(e) => setDivisor(e.target.value)}
                      className="text-center text-lg font-medium"
                    />
                  </div>
                </div>

                {/* Formula Preview */}
                <div className="mt-6 p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
                  <p className="text-sm font-semibold text-orange-900 mb-2 text-center">Modulo Operation:</p>
                  <p className="text-lg text-center font-semibold">
                    <span className="italic">a</span> mod <span className="italic">b</span> = remainder
                  </p>
                  <p className="text-xs text-gray-600 mt-2 text-center">
                    Returns the remainder after division
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
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
                  <div className="bg-gradient-to-br from-orange-600 to-amber-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4">Answer:</h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <p className="text-2xl md:text-3xl font-bold text-center">
                        <span className="italic">{result.dividend}</span> mod <span className="italic">{result.divisor}</span> = <span className="text-4xl md:text-5xl">{result.modulo}</span>
                      </p>
                    </div>
                  </div>

                  {/* Proof Section */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Proof
                    </h3>

                    <div className="space-y-4">
                      <div className="bg-orange-50 rounded-xl p-6">
                        <p className="text-gray-800 mb-3">
                          Divide <span className="italic font-semibold">a</span> by <span className="italic font-semibold">b</span> to find the remainder.
                        </p>
                        <p className="text-xl font-semibold text-center text-orange-900">
                          {result.dividend} ÷ {result.divisor} = {result.quotient} R{result.remainder}
                        </p>
                      </div>

                      <div className="bg-amber-50 rounded-xl p-6">
                        <p className="text-gray-800 mb-3">
                          Confirm the answer satisfies the equation:
                        </p>
                        <p className="text-lg text-center text-gray-700 mb-3">
                          Quotient × Divisor + Remainder = Dividend
                        </p>
                        <p className="text-xl font-semibold text-center text-amber-900">
                          {result.quotient} × {result.divisor} + {result.modulo} = {result.dividend}
                        </p>
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
                          <p key={index} className="font-semibold text-orange-600 mt-3">{step}</p>
                        ) : step.startsWith('Calculating') ? (
                          <p key={index} className="text-lg font-bold text-gray-900 mb-2">{step}</p>
                        ) : (
                          <p key={index} className="text-gray-700 leading-relaxed pl-4">{step}</p>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Division Details */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Division Breakdown
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
                        <p className="text-sm font-semibold text-orange-900 mb-2">Quotient</p>
                        <p className="text-3xl font-bold text-orange-600">{result.quotient}</p>
                        <p className="text-xs text-gray-600 mt-1">Whole number result</p>
                      </div>
                      <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200">
                        <p className="text-sm font-semibold text-amber-900 mb-2">Remainder</p>
                        <p className="text-3xl font-bold text-amber-600">{result.remainder}</p>
                        <p className="text-xs text-gray-600 mt-1">Modulo result</p>
                      </div>
                      <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
                        <p className="text-sm font-semibold text-yellow-900 mb-2">Verification</p>
                        <p className="text-sm font-mono text-yellow-900 mt-2">{result.verification}</p>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Percent className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    Enter values and click Calculate to see results
                  </p>
                  <p className="text-sm text-gray-400">
                    Find the remainder when dividing two numbers
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
                Understanding the Modulo Operation
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The modulo operation (often abbreviated as "mod") is a fundamental mathematical operation that finds the remainder after division of one number by another. Our comprehensive modulo calculator helps you quickly compute a mod b with detailed step-by-step solutions, making it perfect for students, programmers, mathematicians, and anyone working with modular arithmetic or number theory.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                When we write "a mod b", we're asking: "What is the remainder when a is divided by b?" For example, 5 mod 2 = 1 because when you divide 5 by 2, you get 2 with a remainder of 1. The modulo operation is extensively used in computer science, cryptography, clock arithmetic, and many areas of mathematics.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                This calculator provides not just the answer, but also shows you the complete division process, verifies the result using the division algorithm, and explains each step clearly. Whether you're learning modular arithmetic for the first time, debugging code, or working on number theory problems, this tool provides accurate results with full transparency.
              </p>
            </section>

            {/* What is Modulo */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                What is Modulo?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The modulo operation returns the remainder of a division operation. When you divide a number (dividend) by another number (divisor or modulus), you get a quotient and a remainder. The modulo operation specifically gives you that remainder.
              </p>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 mb-4">
                <h3 className="text-lg font-bold text-orange-900 mb-3">Modulo Definition:</h3>
                <p className="text-gray-700 mb-3">
                  For integers a and b (where b ≠ 0):
                </p>
                <p className="text-xl font-semibold text-center text-orange-900 mb-3">
                  <span className="italic">a</span> mod <span className="italic">b</span> = <span className="italic">r</span>
                </p>
                <p className="text-gray-700 mb-3">
                  Where <span className="italic">r</span> is the remainder such that:
                </p>
                <p className="text-lg font-semibold text-center text-gray-800">
                  <span className="italic">a</span> = <span className="italic">q</span> × <span className="italic">b</span> + <span className="italic">r</span>
                </p>
                <p className="text-sm text-gray-600 mt-3 text-center">
                  where <span className="italic">q</span> is the quotient and 0 ≤ <span className="italic">r</span> &lt; |<span className="italic">b</span>|
                </p>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                For example, 17 mod 5 = 2 because 17 = 3 × 5 + 2. The quotient is 3, and the remainder (modulo result) is 2. The remainder is always less than the divisor and is typically non-negative in most mathematical and programming contexts.
              </p>
            </section>

            {/* How to Use This Calculator */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Use This Calculator
              </h2>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Enter the Dividend (a):</strong>
                      <p className="text-gray-700 mt-1">Input the number you want to divide. This is the number you're finding the remainder for.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Enter the Modulus (b):</strong>
                      <p className="text-gray-700 mt-1">Input the divisor (must be non-zero). This is the number you're dividing by.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Click Calculate:</strong>
                      <p className="text-gray-700 mt-1">The calculator will compute the modulo result and display the quotient, remainder, and verification.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong className="text-gray-900">Review Results:</strong>
                      <p className="text-gray-700 mt-1">Examine the answer, proof section, step-by-step solution, and division breakdown to understand the complete process.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
                    <div>
                      <strong className="text-gray-900">Verify the Answer:</strong>
                      <p className="text-gray-700 mt-1">Check the verification equation to confirm that Quotient × Divisor + Remainder = Dividend.</p>
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

              <h3 className="text-xl font-bold text-gray-900 mb-4">Example: Calculate 17 mod 5</h3>
              <div className="bg-orange-50 rounded-xl p-6 mb-6">
                <ol className="space-y-3 text-gray-700">
                  <li><strong>Step 1:</strong> Identify the dividend and divisor
                    <ul className="ml-6 mt-2 space-y-1 list-disc">
                      <li>Dividend (a) = 17</li>
                      <li>Divisor/Modulus (b) = 5</li>
                    </ul>
                  </li>
                  <li><strong>Step 2:</strong> Perform the division
                    <ul className="ml-6 mt-2 space-y-1 list-disc">
                      <li>17 ÷ 5 = 3 with remainder 2</li>
                      <li>Or: 17 ÷ 5 = 3.4 (quotient is the whole number part = 3)</li>
                    </ul>
                  </li>
                  <li><strong>Step 3:</strong> Express using division algorithm
                    <ul className="ml-6 mt-2 space-y-1 list-disc">
                      <li>17 = 3 × 5 + 2</li>
                      <li>Quotient (q) = 3, Remainder (r) = 2</li>
                    </ul>
                  </li>
                  <li><strong>Step 4:</strong> The remainder is the modulo result
                    <ul className="ml-6 mt-2 space-y-1 list-disc">
                      <li>17 mod 5 = 2</li>
                    </ul>
                  </li>
                  <li><strong>Step 5:</strong> Verify the answer
                    <ul className="ml-6 mt-2 space-y-1 list-disc">
                      <li>3 × 5 + 2 = 15 + 2 = 17 ✓</li>
                    </ul>
                  </li>
                </ol>
                <p className="mt-4 p-3 bg-white rounded-lg font-semibold text-orange-900">
                  Result: 17 mod 5 = 2
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Example with Negative Numbers: Calculate -17 mod 5</h3>
              <div className="bg-amber-50 rounded-xl p-6">
                <ol className="space-y-3 text-gray-700">
                  <li><strong>Step 1:</strong> Perform division: -17 ÷ 5 = -3.4
                    <ul className="ml-6 mt-2 space-y-1 list-disc">
                      <li>Quotient = -4 (round down)</li>
                      <li>Initial remainder = -17 - (-4 × 5) = -17 + 20 = 3</li>
                    </ul>
                  </li>
                  <li><strong>Step 2:</strong> Apply division algorithm
                    <ul className="ml-6 mt-2 space-y-1 list-disc">
                      <li>-17 = -4 × 5 + 3</li>
                      <li>-17 = -20 + 3 = -17 ✓</li>
                    </ul>
                  </li>
                  <li><strong>Step 3:</strong> The modulo result is 3 (always non-negative)
                    <ul className="ml-6 mt-2 space-y-1 list-disc">
                      <li>-17 mod 5 = 3</li>
                    </ul>
                  </li>
                </ol>
                <p className="mt-4 p-3 bg-white rounded-lg font-semibold text-amber-900">
                  Result: -17 mod 5 = 3
                </p>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Applications
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3 flex items-center gap-2">
                    <Hash className="w-5 h-5" />
                    Programming & Computer Science
                  </h3>
                  <p className="text-gray-700">Used extensively in programming for array indexing, hash functions, circular buffers, and range wrapping. For example, to cycle through array indices or create periodic patterns.</p>
                </div>

                <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">Cryptography</h3>
                  <p className="text-gray-700">Fundamental to encryption algorithms like RSA and Diffie-Hellman. Modular arithmetic provides the mathematical foundation for secure communication and digital signatures.</p>
                </div>

                <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">Clock Arithmetic</h3>
                  <p className="text-gray-700">Time calculations use modulo 12 or 24. For example, 15:00 + 10 hours = 1:00 (next day) uses modulo to wrap around the clock face.</p>
                </div>

                <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">Calendar Calculations</h3>
                  <p className="text-gray-700">Determining day of the week, leap years, and date arithmetic. Modulo 7 is used to find which day of the week a particular date falls on.</p>
                </div>

                <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">Check Digits</h3>
                  <p className="text-gray-700">Credit cards, ISBNs, and barcodes use modulo operations for error detection. The check digit is calculated using modulo to verify data integrity.</p>
                </div>

                <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">Music Theory</h3>
                  <p className="text-gray-700">Musical intervals and chord progressions use modulo 12 (chromatic scale). Used to calculate note relationships and transpositions in music composition.</p>
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
                    ❌ Mistake 1: Confusing Modulo with Division
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Thinking 17 mod 5 = 3.4 (the division result).
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Modulo gives only the remainder, not the quotient. 17 mod 5 = 2.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 2: Negative Number Confusion
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Assuming -17 mod 5 = -2.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> In most systems, modulo with positive divisor gives non-negative result: -17 mod 5 = 3.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 3: Division by Zero
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Attempting to calculate a mod 0.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Modulo by zero is undefined, just like division by zero. Always ensure divisor ≠ 0.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 4: Forgetting Range Constraints
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Expecting remainder ≥ divisor.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> The remainder is always less than the absolute value of the divisor: 0 ≤ r &lt; |b|.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 5: Misunderstanding Language-Specific Behavior
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Assuming all programming languages handle modulo identically.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Different languages handle negative numbers differently. Python vs C/Java have different modulo behaviors.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 6: Using Modulo with Floats
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Trying 17.5 mod 5.2 and expecting integer results.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Modulo is primarily defined for integers. For floats, use remainder functions or convert to integers first.
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
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Quick Mental Math</h3>
                  <p className="text-gray-700">For small numbers, count up by the divisor until you exceed the dividend, then find the difference. Example: 17 mod 5 → 5, 10, 15, 20... 17 is between 15 and 20, so 17 - 15 = 2.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Modulo Properties</h3>
                  <p className="text-gray-700">Remember: (a + b) mod n = ((a mod n) + (b mod n)) mod n. This property is useful for simplifying large calculations in cryptography and number theory.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Even/Odd Testing</h3>
                  <p className="text-gray-700">Check if a number is even or odd using mod 2. If n mod 2 = 0, it's even; if n mod 2 = 1, it's odd. Simple and efficient!</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Circular Arrays</h3>
                  <p className="text-gray-700">Use modulo for wraparound indexing in programming: nextIndex = (currentIndex + 1) % arrayLength. This creates circular buffer behavior automatically.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Range Conversion</h3>
                  <p className="text-gray-700">Convert values to a specific range [0, n-1] using modulo. Useful for normalizing angles, creating periodic patterns, and constraining values.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Divisibility Testing</h3>
                  <p className="text-gray-700">If a mod b = 0, then a is divisible by b with no remainder. Quick way to test if one number divides evenly into another.</p>
                </div>
              </div>
            </section>

            {/* Modulo in Programming */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Modulo in Different Programming Languages
              </h2>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">Python</h3>
                  <p className="text-gray-700 mb-2">
                    <code className="bg-white px-2 py-1 rounded border">a % b</code> - Always returns result with same sign as divisor
                  </p>
                  <p className="text-sm text-gray-600 font-mono">
                    17 % 5 = 2, -17 % 5 = 3, 17 % -5 = -3
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">JavaScript/TypeScript</h3>
                  <p className="text-gray-700 mb-2">
                    <code className="bg-white px-2 py-1 rounded border">a % b</code> - Returns result with same sign as dividend
                  </p>
                  <p className="text-sm text-gray-600 font-mono">
                    17 % 5 = 2, -17 % 5 = -2, 17 % -5 = 2
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">Java/C/C++</h3>
                  <p className="text-gray-700 mb-2">
                    <code className="bg-white px-2 py-1 rounded border">a % b</code> - Returns result with same sign as dividend
                  </p>
                  <p className="text-sm text-gray-600 font-mono">
                    17 % 5 = 2, -17 % 5 = -2, 17 % -5 = 2
                  </p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-6">
                  <p className="text-gray-800 font-semibold mb-2">⚠️ Important Note:</p>
                  <p className="text-gray-700">
                    Different programming languages implement modulo differently, especially for negative numbers. Always check your language's documentation to understand its specific behavior.
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
                <div className="bg-orange-50 border-l-4 border-orange-500 rounded-xl p-6">
                  <p className="font-semibold text-orange-900 mb-2">Problem 1: Beginner</p>
                  <p className="text-gray-700">
                    Calculate 23 mod 7
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: How many times does 7 go into 23?</span>
                  </p>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-500 rounded-xl p-6">
                  <p className="font-semibold text-orange-900 mb-2">Problem 2: Beginner</p>
                  <p className="text-gray-700">
                    Calculate 100 mod 10
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: Is 100 evenly divisible by 10?</span>
                  </p>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-6">
                  <p className="font-semibold text-amber-900 mb-2">Problem 3: Intermediate</p>
                  <p className="text-gray-700">
                    What time will it be 100 hours from now if it's currently 3:00? Use modulo.
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: Use mod 24 for 24-hour clock.</span>
                  </p>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-6">
                  <p className="font-semibold text-amber-900 mb-2">Problem 4: Intermediate</p>
                  <p className="text-gray-700">
                    Calculate -15 mod 4
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: Result should be non-negative.</span>
                  </p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-6">
                  <p className="font-semibold text-yellow-900 mb-2">Problem 5: Advanced</p>
                  <p className="text-gray-700">
                    If today is Wednesday, what day will it be 100 days from now?
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: Use mod 7 for days of the week.</span>
                  </p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-6">
                  <p className="font-semibold text-yellow-900 mb-2">Problem 6: Challenge</p>
                  <p className="text-gray-700">
                    Find the last digit of 7^100 (7 to the power 100)
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: Look for a pattern in powers of 7 modulo 10.</span>
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
                    What is the difference between modulo and remainder?
                  </h3>
                  <p className="text-gray-700">
                    In mathematics, modulo and remainder are often used interchangeably, but there can be subtle differences in how negative numbers are handled. The modulo operation typically returns a non-negative result between 0 and |b|-1, while remainder may match the sign of the dividend. For positive numbers, they are identical. In this calculator, we follow the mathematical convention where modulo results are non-negative.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How is modulo used in programming?
                  </h3>
                  <p className="text-gray-700">
                    Modulo is extensively used in programming for: cycling through arrays (index % length), checking even/odd numbers (n % 2), creating hash functions, implementing circular buffers, generating periodic patterns, and constraining values to specific ranges. It's fundamental to many algorithms and data structures. Most programming languages use the % operator for modulo.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why is modulo important in cryptography?
                  </h3>
                  <p className="text-gray-700">
                    Modular arithmetic is the foundation of modern cryptography. RSA encryption, Diffie-Hellman key exchange, and elliptic curve cryptography all rely heavily on modulo operations. The difficulty of certain mathematical problems in modular arithmetic (like discrete logarithm) provides the security for these systems. Modulo operations ensure calculations stay within finite fields, making them suitable for computer implementation.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can modulo be negative?
                  </h3>
                  <p className="text-gray-700">
                    In mathematics, the modulo operation conventionally returns a non-negative result. However, different programming languages handle this differently. Python always returns a non-negative result matching the divisor's sign. Languages like C, Java, and JavaScript return a result matching the dividend's sign, which can be negative. This calculator follows the mathematical convention of non-negative results.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What happens with modulo 0?
                  </h3>
                  <p className="text-gray-700">
                    Modulo by zero is undefined, just like division by zero. There's no mathematical meaning to finding the remainder when dividing by zero. In programming, attempting modulo by zero typically causes a runtime error or exception. Always ensure your divisor (modulus) is non-zero before performing the operation. This calculator will alert you if you try to calculate modulo 0.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do you calculate modulo by hand?
                  </h3>
                  <p className="text-gray-700">
                    To calculate a mod b by hand: (1) Divide a by b to get quotient q and remainder r, (2) The remainder r is your answer. For example, 17 mod 5: divide 17 by 5 to get 3 remainder 2, so 17 mod 5 = 2. You can verify: 3 × 5 + 2 = 17. For negative numbers, adjust to ensure the result is non-negative and less than the absolute value of the divisor.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is the range of modulo results?
                  </h3>
                  <p className="text-gray-700">
                    For a mod b where b is positive, the result always falls in the range [0, b-1]. For example, any number mod 5 will be 0, 1, 2, 3, or 4. This is why modulo is useful for creating cyclic patterns and constraining values to specific ranges. The result is always strictly less than the divisor's absolute value.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is modular arithmetic?
                  </h3>
                  <p className="text-gray-700">
                    Modular arithmetic is a system of arithmetic for integers where numbers "wrap around" after reaching a certain value (the modulus). It's like clock arithmetic—after 12 comes 1, not 13. In modular arithmetic, two numbers are considered equivalent (congruent) if they have the same remainder when divided by the modulus. Written as a ≡ b (mod n), meaning a and b differ by a multiple of n.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How is modulo used with floating-point numbers?
                  </h3>
                  <p className="text-gray-700">
                    While modulo is primarily defined for integers, some programming languages support modulo with floating-point numbers (called fmod or remainder). However, results may be imprecise due to floating-point rounding errors. For mathematical clarity, it's best to use modulo with integers. If you need to work with decimals, consider converting to integers (by multiplying), performing modulo, then converting back.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What are some tricks for computing large modulos?
                  </h3>
                  <p className="text-gray-700">
                    For large numbers, use modular arithmetic properties: (a × b) mod n = ((a mod n) × (b mod n)) mod n, and (a + b) mod n = ((a mod n) + (b mod n)) mod n. These allow you to reduce numbers at each step, preventing overflow. For powers, use modular exponentiation (square-and-multiply algorithm). These techniques are crucial in cryptography and competitive programming.
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
                Our Modulo Calculator provides a comprehensive, user-friendly tool for computing modulo operations with complete transparency and educational value. Whether you're a mathematics student learning number theory, a programmer working with algorithms, a cryptography enthusiast, or anyone needing to calculate remainders, this calculator delivers accurate results with detailed explanations.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Understanding the modulo operation is fundamental to many areas of mathematics and computer science. By mastering modulo calculations, you develop essential skills for programming, cryptography, discrete mathematics, and problem-solving. The step-by-step solutions and verification provided by our calculator help you learn the methodology and understand the underlying principles.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Start using our calculator today to compute modulo operations quickly, verify your work, debug your code, or explore the fascinating world of modular arithmetic. With proper mathematical notation, clear proofs, division breakdowns, and comprehensive explanations, mastering the modulo operation has never been easier. Make this calculator your essential tool for all modulo calculations and build confidence in your mathematical and programming abilities!
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
              Need Help with Modular Arithmetic and Number Theory?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master modulo operations, modular arithmetic, discrete mathematics, and number theory. Get personalized one-on-one guidance tailored to your learning style.
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
