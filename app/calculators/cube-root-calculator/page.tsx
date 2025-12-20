'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function CubeRootCalculator() {
  const [number, setNumber] = useState<string>('9');
  const [result, setResult] = useState<{
    principalRoot: number;
    allRoots: { real: number; imaginary: number }[];
    isPerfectCube: boolean;
  } | null>(null);

  const handleCalculate = () => {
    const num = parseFloat(number);

    if (isNaN(num)) {
      alert('Please enter a valid number.');
      return;
    }

    // Principal (real) cube root
    const principalRoot = Math.cbrt(num);

    // Calculate all three cube roots (including complex)
    const omega = { real: -0.5, imaginary: Math.sqrt(3) / 2 }; // e^(2πi/3)
    const omega2 = { real: -0.5, imaginary: -Math.sqrt(3) / 2 }; // e^(4πi/3)

    const allRoots = [
      { real: principalRoot, imaginary: 0 },
      {
        real: principalRoot * omega.real,
        imaginary: principalRoot * omega.imaginary
      },
      {
        real: principalRoot * omega2.real,
        imaginary: principalRoot * omega2.imaginary
      },
    ];

    // Check if it's a perfect cube
    const roundedRoot = Math.round(principalRoot);
    const isPerfectCube = Math.abs(roundedRoot ** 3 - num) < 0.0001;

    setResult({
      principalRoot,
      allRoots,
      isPerfectCube,
    });
  };

  const handleClear = () => {
    setNumber('9');
    setResult(null);
  };

  const formatComplex = (root: { real: number; imaginary: number }) => {
    if (Math.abs(root.imaginary) < 0.0001) {
      return root.real.toFixed(8);
    }

    const realPart = root.real.toFixed(8);
    const imagPart = Math.abs(root.imaginary).toFixed(8);
    const sign = root.imaginary >= 0 ? '+' : '−';

    return `${realPart} ${sign} ${imagPart}i`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-8 mt-20 mb-12 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A3D7C] mb-4">
            Cube Root Calculator
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Calculate the principal real cube root and all complex cube roots (∛x) with step-by-step solutions. Perfect for algebra, calculus, and understanding radical expressions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border-t-4 border-orange-700">
            <div className="bg-gradient-to-r from-orange-700 to-red-700 text-white text-center py-3 rounded-lg mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Cube Roots Calculator</h2>
            </div>

            <div className="text-center text-2xl font-bold text-gray-800 mb-6">
              <span className="text-3xl">∛</span>x = ?
            </div>

            <div className="mb-6">
              <label htmlFor="number" className="text-base font-semibold text-gray-700 mb-2 block">
                x =
              </label>
              <Input
                id="number"
                type="number"
                step="any"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="text-2xl p-4 border-2 border-gray-300 focus:border-orange-500 text-center font-semibold"
                placeholder="Enter a number"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button
                onClick={handleClear}
                variant="outline"
                className="py-6 text-lg font-semibold border-2 border-gray-300 hover:bg-gray-100"
              >
                Clear
              </Button>
              <Button
                onClick={handleCalculate}
                className="py-6 text-lg font-semibold bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800"
              >
                Calculate
              </Button>
            </div>

            {result && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Answer:</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-base font-semibold text-gray-700 mb-2">
                      The principal, real, root of:
                    </p>
                    <p className="text-3xl text-center text-blue-600 font-bold my-3">
                      <span className="text-4xl">∛</span>{number}
                    </p>
                    <p className="text-center text-xl text-gray-800">
                      = {result.principalRoot.toFixed(8)}
                    </p>
                  </div>

                  <div className="border-t-2 border-gray-300 pt-4">
                    <p className="text-base font-semibold text-gray-700 mb-3">
                      All roots:
                    </p>
                    <div className="space-y-2 text-center text-lg">
                      {result.allRoots.map((root, index) => (
                        <p key={index} className="text-gray-800">
                          {formatComplex(root)}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="border-t-2 border-gray-300 pt-4">
                    <p className="text-base text-gray-700 text-center">
                      {result.isPerfectCube
                        ? `${number} is a perfect cube`
                        : `${number} is not a perfect cube`}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
            <h3 className="text-2xl font-bold text-[#1A3D7C] mb-6 pb-3 border-b-2 border-gray-200">
              Solution:
            </h3>

            {result ? (
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <p className="font-semibold mb-2">Principal Cube Root:</p>
                  <p className="text-base">
                    <span className="text-xl">∛</span>{number} = {result.principalRoot.toFixed(8)}
                  </p>
                  <p className="text-sm mt-2 text-gray-600">
                    This is the real cube root of {number}.
                  </p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <p className="font-semibold mb-2">Verification:</p>
                  <p className="text-base">
                    ({result.principalRoot.toFixed(4)})³ ≈ {(result.principalRoot ** 3).toFixed(4)}
                  </p>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                  <p className="font-semibold mb-2">Complex Cube Roots:</p>
                  <p className="text-sm text-gray-700">
                    Every number has three cube roots (one real and two complex). The complex roots come in conjugate pairs.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg">Enter a number and click Calculate to see the cube root</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">What is a Cube Root?</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="text-lg leading-relaxed">
              The cube root of a number x is a value that, when multiplied by itself three times (cubed), equals x. It's written as ∛x or x^(1/3). For example, the cube root of 8 is 2 because 2 × 2 × 2 = 8. Unlike square roots, cube roots can be taken of negative numbers since a negative number cubed remains negative.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
              <p className="text-lg font-semibold mb-2">Mathematical Definition:</p>
              <p className="text-base">If ∛x = y, then y³ = x</p>
              <p className="text-base mt-2">Or: y × y × y = x</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Perfect Cubes Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-orange-700 to-red-700 text-white">
                  <th className="border-2 border-gray-300 p-4">Number</th>
                  <th className="border-2 border-gray-300 p-4">Cube (n³)</th>
                  <th className="border-2 border-gray-300 p-4">Cube Root (∛n³)</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-center">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <tr key={n} className={n % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border-2 border-gray-300 p-3 font-semibold">{n}</td>
                    <td className="border-2 border-gray-300 p-3">{n ** 3}</td>
                    <td className="border-2 border-gray-300 p-3">∛{n ** 3} = {n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Cube Root Properties</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-3">Basic Properties</h3>
              <ul className="space-y-2 text-base">
                <li>• ∛(a × b) = ∛a × ∛b</li>
                <li>• ∛(a / b) = ∛a / ∛b</li>
                <li>• ∛(a³) = a</li>
                <li>• (∛a)³ = a</li>
                <li>• ∛(-a) = -∛a</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-3">Special Cases</h3>
              <ul className="space-y-2 text-base">
                <li>• ∛0 = 0</li>
                <li>• ∛1 = 1</li>
                <li>• ∛(-1) = -1</li>
                <li>• ∛8 = 2</li>
                <li>• ∛27 = 3</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What is the difference between cube root and square root?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                A square root (√x) finds a number that when multiplied by itself equals x, while a cube root (∛x) finds a number that when multiplied by itself three times equals x. Square roots of negative numbers are imaginary, but cube roots of negative numbers are real negative values.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Can you take the cube root of a negative number?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Yes! Unlike square roots, cube roots of negative numbers are real. For example, ∛(-8) = -2 because (-2)³ = -8. A negative number cubed is always negative, so its cube root is also negative.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How many cube roots does a number have?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Every non-zero number has exactly three cube roots: one real root and two complex conjugate roots. For positive numbers, the real root is positive. For negative numbers, the real root is negative. The complex roots involve imaginary numbers.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What is a perfect cube?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                A perfect cube is a number that is the cube of an integer. Examples include 1 (1³), 8 (2³), 27 (3³), 64 (4³), etc. The cube root of a perfect cube is always a whole number. Perfect cubes can be positive or negative.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-xl shadow-2xl p-8 md:p-12 text-center text-white mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help with Radicals and Roots?</h2>
          <p className="text-xl mb-6 text-gray-100">
            Our expert tutors can help you master cube roots, radicals, and all algebra concepts
          </p>
          <Link
            href="/tutoring/free-consultation"
            className="inline-block bg-white text-[#1A3D7C] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Book Your Free Demo Session
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
