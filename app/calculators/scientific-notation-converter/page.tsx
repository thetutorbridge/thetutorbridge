'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calculator, Atom } from 'lucide-react';

interface ConversionResult {
  scientificNotation: string;
  eNotation: string;
  engineeringNotation: string;
  engineeringPrefix: string;
  standardForm: string;
  orderOfMagnitude: number;
  realNumber: string;
  wordForm: string;
  coefficient: number;
  exponent: number;
}

export default function ScientificNotationConverterPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState('');

  const clearInput = () => {
    setInput('');
    setResult(null);
    setError('');
  };

  const convertToWordForm = (num: number): string => {
    if (num === 0) return 'zero';

    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const scales = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion'];

    const numToWords = (n: number): string => {
      if (n === 0) return '';
      if (n < 10) return ones[n];
      if (n < 20) return teens[n - 10];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
      if (n < 1000) return ones[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + numToWords(n % 100) : '');
      return '';
    };

    const isNegative = num < 0;
    num = Math.abs(num);
    const integerPart = Math.floor(num);

    if (integerPart === 0) return isNegative ? 'negative zero' : 'zero';

    const groups: number[] = [];
    let temp = integerPart;
    while (temp > 0) {
      groups.push(temp % 1000);
      temp = Math.floor(temp / 1000);
    }

    let words = '';
    for (let i = groups.length - 1; i >= 0; i--) {
      if (groups[i] > 0) {
        const groupWord = numToWords(groups[i]);
        words += groupWord;
        if (i > 0 && scales[i]) {
          words += ' ' + scales[i];
        }
        if (i > 0) words += ' ';
      }
    }

    return (isNegative ? 'negative ' : '') + words.trim();
  };

  const getEngineeringNotation = (coefficient: number, exponent: number): { notation: string; prefix: string } => {
    const prefixes: { [key: number]: string } = {
      24: 'yotta- (Y)',
      21: 'zetta- (Z)',
      18: 'exa- (E)',
      15: 'peta- (P)',
      12: 'tera- (T)',
      9: 'giga- (G)',
      6: 'mega- (M)',
      3: 'kilo- (k)',
      0: '',
      '-3': 'milli- (m)',
      '-6': 'micro- (μ)',
      '-9': 'nano- (n)',
      '-12': 'pico- (p)',
      '-15': 'femto- (f)',
      '-18': 'atto- (a)',
      '-21': 'zepto- (z)',
      '-24': 'yocto- (y)',
    };

    // Adjust to nearest multiple of 3
    const remainder = exponent % 3;
    const engExp = exponent - remainder;
    const engCoeff = coefficient * Math.pow(10, remainder);

    const notation = `${engCoeff.toFixed(3)} × 10${toSuperscript(engExp)}`;
    const prefix = prefixes[engExp] || '';

    return { notation, prefix };
  };

  const toSuperscript = (num: number): string => {
    const superscripts: { [key: string]: string } = {
      '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
      '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
      '-': '⁻', '+': '⁺'
    };
    return num.toString().split('').map(char => superscripts[char] || char).join('');
  };

  const convertNotation = () => {
    setError('');
    setResult(null);

    if (!input.trim()) {
      setError('Please enter a number or scientific notation');
      return;
    }

    try {
      let value: number;

      // Parse various formats
      let cleanInput = input.trim().toLowerCase()
        .replace(/\s+/g, '')
        .replace(/×/g, '*');

      // Replace 'x' with '*' only when it's used as multiplication (not in 'e' notation)
      // Match patterns like "3.456 x 10" or "3.456x10"
      cleanInput = cleanInput.replace(/([0-9.]+)x(10)/g, '$1*$2');

      // Try to parse as number first
      if (cleanInput.includes('e') && !cleanInput.includes('*')) {
        // e-notation format
        value = parseFloat(cleanInput);
      } else if (cleanInput.includes('*10')) {
        // Scientific notation format: 3.456*10^11 or 3.456*10**11
        const parts = cleanInput.split('*10');
        const coefficient = parseFloat(parts[0]);
        let expPart = parts[1];

        // Handle both ^ and ** for exponentiation
        if (expPart.startsWith('^') || expPart.startsWith('**')) {
          expPart = expPart.replace(/^\^/, '').replace(/^\*\*/, '');
        }

        const exponent = parseFloat(expPart);
        value = coefficient * Math.pow(10, exponent);
      } else {
        // Regular number
        value = parseFloat(cleanInput);
      }

      if (isNaN(value) || !isFinite(value)) {
        setError('Invalid input. Please enter a valid number or scientific notation.');
        return;
      }

      // Convert to scientific notation
      const absValue = Math.abs(value);
      const sign = value < 0 ? -1 : 1;

      let exponent: number;
      let coefficient: number;

      if (absValue === 0) {
        exponent = 0;
        coefficient = 0;
      } else {
        exponent = Math.floor(Math.log10(absValue));
        coefficient = sign * (absValue / Math.pow(10, exponent));
      }

      // Scientific notation with proper superscript
      const scientificNotation = `${coefficient.toFixed(3)} × 10${toSuperscript(exponent)}`;

      // E-notation
      const eNotation = value.toExponential(4);

      // Engineering notation
      const engineering = getEngineeringNotation(coefficient, exponent);

      // Standard form
      const standardForm = `${coefficient.toFixed(3)} × 10${toSuperscript(exponent)}`;

      // Real number
      let realNumber: string;
      if (Math.abs(value) >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What\'s the difference between scientific notation and standard form?","acceptedAnswer":{"@type":"Answer","text":"Scientific notation (a × 10ⁿ) expresses numbers as a coefficient between 1 and 10 multiplied by a power of 10, while standard form is the regular decimal representation. For example, 5,000 is standard form, while 5 × 10³ is scientific notation."}}]}' }}
      />= 1e15 || (Math.abs(value) < 0.000001 && value !== 0)) {
        realNumber = value.toExponential(0).replace('e+', 'e').replace('e0', '');
        realNumber = realNumber.split('e')[0].replace(/\.0+$/, '');
        if (realNumber.length > 13) {
          realNumber = value.toExponential(0);
        } else {
          realNumber = Math.round(value).toString();
        }
      } else {
        realNumber = value.toString();
      }

      // Word form
      const wordForm = convertToWordForm(value);

      setResult({
        scientificNotation,
        eNotation,
        engineeringNotation: engineering.notation,
        engineeringPrefix: engineering.prefix,
        standardForm,
        orderOfMagnitude: exponent,
        realNumber,
        wordForm,
        coefficient,
        exponent,
      });
    } catch (err) {
      setError('Error processing input. Please check your number format.');
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-full mb-6">
              <Atom className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1A3D7C] mb-4">
              Scientific Notation Converter
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Convert numbers between scientific notation, standard form, e-notation, engineering notation, and word form
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12 border-2 border-gray-200">
            <div className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white py-4 px-6 rounded-lg mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold">Scientific Notation Converter</h2>
            </div>

            <p className="text-center text-gray-600 italic mb-6">
              enter a number or scientific notation
            </p>

            {/* Input */}
            <div className="mb-6">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="3.456 x 10^11"
                className="w-full text-xl text-center py-6 border-2 border-gray-300 rounded-lg"
                onKeyPress={(e) => e.key === 'Enter' && convertNotation()}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-center mb-8">
              <Button
                onClick={clearInput}
                variant="outline"
                className="px-12 py-6 text-lg font-semibold border-2 border-gray-400 hover:bg-gray-100"
              >
                Clear
              </Button>
              <Button
                onClick={convertNotation}
                className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] hover:from-[#15325f] hover:to-[#239654] text-white"
              >
                Calculate
              </Button>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-6">
                <p className="text-red-700 text-center font-semibold">{error}</p>
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="bg-gradient-to-b from-gray-50 to-white border-2 border-gray-300 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Answer:</h3>

                <div className="space-y-6">
                  {/* Scientific Notation */}
                  <div className="text-center pb-6 border-b-2 border-gray-200">
                    <p className="text-3xl font-bold text-gray-900 mb-2">
                      = {result.scientificNotation}
                    </p>
                    <p className="text-gray-600 italic">scientific notation</p>
                  </div>

                  {/* E-notation */}
                  <div className="text-center pb-6 border-b-2 border-gray-200">
                    <p className="text-3xl font-bold text-gray-900 mb-2">
                      = {result.eNotation}
                    </p>
                    <p className="text-gray-600 italic">scientific e notation</p>
                  </div>

                  {/* Engineering Notation */}
                  <div className="text-center pb-6 border-b-2 border-gray-200">
                    <p className="text-3xl font-bold text-gray-900 mb-2">
                      = {result.engineeringNotation}
                    </p>
                    <p className="text-gray-600 italic">engineering notation</p>
                    {result.engineeringPrefix && (
                      <p className="text-gray-700 mt-2 font-semibold">{result.engineeringPrefix}</p>
                    )}
                  </div>

                  {/* Standard Form */}
                  <div className="text-center pb-6 border-b-2 border-gray-200">
                    <p className="text-3xl font-bold text-gray-900 mb-2">
                      = {result.standardForm}
                    </p>
                    <p className="text-gray-600 italic">standard form</p>
                  </div>

                  {/* Order of Magnitude */}
                  <div className="text-center pb-6 border-b-2 border-gray-200">
                    <p className="text-4xl font-bold text-gray-900 mb-2">
                      {result.orderOfMagnitude}
                    </p>
                    <p className="text-gray-600 italic">Order of Magnitude</p>
                    <p className="text-gray-500 text-sm mt-1">for scientific and standard forms</p>
                  </div>

                  {/* Real Number */}
                  <div className="text-center pb-6 border-b-2 border-gray-200">
                    <p className="text-3xl font-bold text-gray-900 mb-2">
                      = {result.realNumber}
                    </p>
                    <p className="text-gray-600 italic">(real number)</p>
                  </div>

                  {/* Word Form */}
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900 mb-2">
                      = {result.wordForm}
                    </p>
                    <p className="text-gray-600 italic">word form</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Educational Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Calculator className="mr-3 h-8 w-8 text-[#2BAE66]" />
              What is Scientific Notation?
            </h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
              <p className="text-lg">
                <strong>Scientific notation</strong> is a way of expressing numbers that are too large or too small to be conveniently written in standard decimal form. It's widely used in science, engineering, and mathematics to represent very large or very small quantities in a compact, standardized format.
              </p>
              <p className="text-lg">
                A number in scientific notation is written as the product of two factors:
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-4">
                <p className="text-xl font-semibold text-center">
                  <strong>a × 10ⁿ</strong>
                </p>
                <p className="text-center mt-3">
                  where <strong>a</strong> is the coefficient (1 ≤ |a| &lt; 10)<br />
                  and <strong>n</strong> is the exponent (an integer)
                </p>
              </div>
              <p className="text-lg">
                For example, <strong>345,600,000,000</strong> can be written as <strong>3.456 × 10¹¹</strong> in scientific notation. This makes it much easier to read, write, and calculate with extremely large or small numbers.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Parts of Scientific Notation</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border-2 border-blue-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Coefficient (Mantissa)</h3>
                <p className="text-gray-700 mb-3">
                  The coefficient is the number that appears before the multiplication sign. It must be greater than or equal to 1 and less than 10.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-mono text-lg">In <strong>3.456 × 10¹¹</strong></p>
                  <p className="text-blue-700 font-bold mt-2">Coefficient = 3.456</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Exponent (Power of 10)</h3>
                <p className="text-gray-700 mb-3">
                  The exponent indicates how many places to move the decimal point. Positive exponents mean large numbers, negative mean small numbers.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-mono text-lg">In <strong>3.456 × 10¹¹</strong></p>
                  <p className="text-green-700 font-bold mt-2">Exponent = 11</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">How to Convert to Scientific Notation</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">For Large Numbers (≥ 10):</h3>
                <ol className="space-y-3 text-lg text-gray-700 list-decimal list-inside">
                  <li>Move the decimal point to the left until you have a number between 1 and 10</li>
                  <li>Count how many places you moved the decimal (this is your exponent)</li>
                  <li>Write the number as: coefficient × 10^(positive exponent)</li>
                </ol>
                <div className="bg-blue-50 p-6 rounded-lg mt-4 border-l-4 border-blue-500">
                  <p className="font-semibold text-gray-800 mb-2">Example:</p>
                  <p className="text-gray-700">345,600,000,000</p>
                  <p className="text-gray-700 mt-2">→ Move decimal 11 places left: 3.456</p>
                  <p className="text-blue-700 font-bold mt-2">= 3.456 × 10¹¹</p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">For Small Numbers (&lt; 1):</h3>
                <ol className="space-y-3 text-lg text-gray-700 list-decimal list-inside">
                  <li>Move the decimal point to the right until you have a number between 1 and 10</li>
                  <li>Count how many places you moved the decimal (this is your exponent)</li>
                  <li>Write the number as: coefficient × 10^(negative exponent)</li>
                </ol>
                <div className="bg-green-50 p-6 rounded-lg mt-4 border-l-4 border-green-500">
                  <p className="font-semibold text-gray-800 mb-2">Example:</p>
                  <p className="text-gray-700">0.00000456</p>
                  <p className="text-gray-700 mt-2">→ Move decimal 6 places right: 4.56</p>
                  <p className="text-green-700 font-bold mt-2">= 4.56 × 10⁻⁶</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Different Notation Formats</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 rounded-r-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Scientific Notation (Standard)</h3>
                <p className="text-gray-700 mb-2">
                  Uses the multiplication symbol (×) and superscript for exponent.
                </p>
                <p className="text-2xl font-mono font-bold text-purple-700">3.456 × 10¹¹</p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">E-notation (Scientific E)</h3>
                <p className="text-gray-700 mb-2">
                  Computer/calculator format using 'e' or 'E' to represent "× 10^".
                </p>
                <p className="text-2xl font-mono font-bold text-blue-700">3.456e11 or 3.456E+11</p>
              </div>

              <div className="border-l-4 border-green-500 pl-6 py-4 bg-green-50 rounded-r-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Engineering Notation</h3>
                <p className="text-gray-700 mb-2">
                  Similar to scientific notation but exponents are always multiples of 3, aligning with metric prefixes.
                </p>
                <p className="text-2xl font-mono font-bold text-green-700">345.6 × 10⁹ (giga-)</p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6 py-4 bg-orange-50 rounded-r-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Standard Form</h3>
                <p className="text-gray-700 mb-2">
                  The regular decimal representation of the number.
                </p>
                <p className="text-2xl font-mono font-bold text-orange-700">345,600,000,000</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Engineering Notation Prefixes</h2>
            <p className="text-lg text-gray-700 mb-6">
              Engineering notation uses metric prefixes for common powers of 10:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
                    <th className="border border-gray-300 px-6 py-3 text-left">Prefix</th>
                    <th className="border border-gray-300 px-6 py-3 text-center">Symbol</th>
                    <th className="border border-gray-300 px-6 py-3 text-center">Power of 10</th>
                    <th className="border border-gray-300 px-6 py-3 text-right">Decimal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-6 py-3">tera-</td>
                    <td className="border border-gray-300 px-6 py-3 text-center font-bold">T</td>
                    <td className="border border-gray-300 px-6 py-3 text-center">10¹²</td>
                    <td className="border border-gray-300 px-6 py-3 text-right">1,000,000,000,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-6 py-3">giga-</td>
                    <td className="border border-gray-300 px-6 py-3 text-center font-bold">G</td>
                    <td className="border border-gray-300 px-6 py-3 text-center">10⁹</td>
                    <td className="border border-gray-300 px-6 py-3 text-right">1,000,000,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-6 py-3">mega-</td>
                    <td className="border border-gray-300 px-6 py-3 text-center font-bold">M</td>
                    <td className="border border-gray-300 px-6 py-3 text-center">10⁶</td>
                    <td className="border border-gray-300 px-6 py-3 text-right">1,000,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-6 py-3">kilo-</td>
                    <td className="border border-gray-300 px-6 py-3 text-center font-bold">k</td>
                    <td className="border border-gray-300 px-6 py-3 text-center">10³</td>
                    <td className="border border-gray-300 px-6 py-3 text-right">1,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-blue-50">
                    <td className="border border-gray-300 px-6 py-3 font-semibold">—</td>
                    <td className="border border-gray-300 px-6 py-3 text-center font-bold">—</td>
                    <td className="border border-gray-300 px-6 py-3 text-center font-semibold">10⁰</td>
                    <td className="border border-gray-300 px-6 py-3 text-right font-semibold">1</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-6 py-3">milli-</td>
                    <td className="border border-gray-300 px-6 py-3 text-center font-bold">m</td>
                    <td className="border border-gray-300 px-6 py-3 text-center">10⁻³</td>
                    <td className="border border-gray-300 px-6 py-3 text-right">0.001</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-6 py-3">micro-</td>
                    <td className="border border-gray-300 px-6 py-3 text-center font-bold">μ</td>
                    <td className="border border-gray-300 px-6 py-3 text-center">10⁻⁶</td>
                    <td className="border border-gray-300 px-6 py-3 text-right">0.000001</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-6 py-3">nano-</td>
                    <td className="border border-gray-300 px-6 py-3 text-center font-bold">n</td>
                    <td className="border border-gray-300 px-6 py-3 text-center">10⁻⁹</td>
                    <td className="border border-gray-300 px-6 py-3 text-right">0.000000001</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-6 py-3">pico-</td>
                    <td className="border border-gray-300 px-6 py-3 text-center font-bold">p</td>
                    <td className="border border-gray-300 px-6 py-3 text-center">10⁻¹²</td>
                    <td className="border border-gray-300 px-6 py-3 text-right">0.000000000001</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Scientific Notation Examples</h2>
            <div className="space-y-8">
              {/* Example 1 */}
              <div className="border-l-4 border-green-500 pl-6 py-4 bg-green-50 rounded-r-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Example 1: Large Number</h3>
                <p className="text-lg text-gray-700 mb-3">
                  <strong>Convert:</strong> 5,870,000,000 to scientific notation
                </p>
                <div className="bg-white p-4 rounded-lg text-gray-800 space-y-2">
                  <p><strong>Step 1:</strong> Move decimal left until between 1 and 10</p>
                  <p className="ml-6">5,870,000,000 → 5.87</p>
                  <p><strong>Step 2:</strong> Count decimal places moved</p>
                  <p className="ml-6">Moved 9 places left</p>
                  <p><strong>Step 3:</strong> Write in scientific notation</p>
                  <p className="ml-6 text-2xl font-bold text-green-700 mt-3">= 5.87 × 10⁹</p>
                </div>
              </div>

              {/* Example 2 */}
              <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Example 2: Small Number</h3>
                <p className="text-lg text-gray-700 mb-3">
                  <strong>Convert:</strong> 0.00000234 to scientific notation
                </p>
                <div className="bg-white p-4 rounded-lg text-gray-800 space-y-2">
                  <p><strong>Step 1:</strong> Move decimal right until between 1 and 10</p>
                  <p className="ml-6">0.00000234 → 2.34</p>
                  <p><strong>Step 2:</strong> Count decimal places moved</p>
                  <p className="ml-6">Moved 6 places right (negative exponent)</p>
                  <p><strong>Step 3:</strong> Write in scientific notation</p>
                  <p className="ml-6 text-2xl font-bold text-blue-700 mt-3">= 2.34 × 10⁻⁶</p>
                </div>
              </div>

              {/* Example 3 */}
              <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 rounded-r-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Example 3: Already in Range</h3>
                <p className="text-lg text-gray-700 mb-3">
                  <strong>Convert:</strong> 7.89 to scientific notation
                </p>
                <div className="bg-white p-4 rounded-lg text-gray-800 space-y-2">
                  <p><strong>Step 1:</strong> Already between 1 and 10</p>
                  <p className="ml-6">7.89 (no movement needed)</p>
                  <p><strong>Step 2:</strong> Decimal moved 0 places</p>
                  <p className="ml-6">Exponent = 0</p>
                  <p><strong>Step 3:</strong> Write in scientific notation</p>
                  <p className="ml-6 text-2xl font-bold text-purple-700 mt-3">= 7.89 × 10⁰ = 7.89</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Real-World Applications</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border-2 border-blue-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Astronomy</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Distance to stars: 4.24 × 10¹³ km (Alpha Centauri)</li>
                  <li>• Sun's mass: 1.989 × 10³⁰ kg</li>
                  <li>• Speed of light: 2.998 × 10⁸ m/s</li>
                  <li>• Atoms in the universe: ~10⁸⁰</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Chemistry & Physics</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Avogadro's number: 6.022 × 10²³</li>
                  <li>• Electron mass: 9.109 × 10⁻³¹ kg</li>
                  <li>• Planck's constant: 6.626 × 10⁻³⁴ J·s</li>
                  <li>• Atomic radii: ~10⁻¹⁰ m</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Biology & Medicine</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• DNA width: 2.5 × 10⁻⁹ m</li>
                  <li>• Cells in human body: ~3.7 × 10¹³</li>
                  <li>• Virus size: 1 × 10⁻⁸ to 3 × 10⁻⁷ m</li>
                  <li>• Red blood cell count: ~5 × 10⁶ per μL</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-lg border-2 border-orange-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Computing & Technology</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Computer operations: 10⁹ ops/sec (GHz)</li>
                  <li>• Storage capacity: 10¹² bytes (TB)</li>
                  <li>• Internet data: ~10²¹ bytes (zettabytes)</li>
                  <li>• Nanosecond: 1 × 10⁻⁹ seconds</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Operations with Scientific Notation</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Multiplication</h3>
                <p className="text-lg text-gray-700 mb-3">
                  Multiply the coefficients and add the exponents:
                </p>
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <p className="text-xl">(2 × 10³) × (3 × 10⁵)</p>
                  <p className="text-xl mt-2">= (2 × 3) × 10⁽³⁺⁵⁾</p>
                  <p className="text-2xl font-bold text-blue-700 mt-2">= 6 × 10⁸</p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Division</h3>
                <p className="text-lg text-gray-700 mb-3">
                  Divide the coefficients and subtract the exponents:
                </p>
                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                  <p className="text-xl">(8 × 10⁶) ÷ (2 × 10²)</p>
                  <p className="text-xl mt-2">= (8 ÷ 2) × 10⁽⁶⁻²⁾</p>
                  <p className="text-2xl font-bold text-green-700 mt-2">= 4 × 10⁴</p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Addition & Subtraction</h3>
                <p className="text-lg text-gray-700 mb-3">
                  First make the exponents the same, then add/subtract coefficients:
                </p>
                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <p className="text-xl">(3 × 10⁴) + (5 × 10³)</p>
                  <p className="text-xl mt-2">= (3 × 10⁴) + (0.5 × 10⁴)</p>
                  <p className="text-xl mt-2">= (3 + 0.5) × 10⁴</p>
                  <p className="text-2xl font-bold text-purple-700 mt-2">= 3.5 × 10⁴</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Frequently Asked Questions (FAQ)</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  What's the difference between scientific notation and standard form?
                </h3>
                <p className="text-gray-700">
                  Scientific notation (a × 10ⁿ) expresses numbers as a coefficient between 1 and 10 multiplied by a power of 10, while standard form is the regular decimal representation. For example, 5,000 is standard form, while 5 × 10³ is scientific notation.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  When should I use scientific notation?
                </h3>
                <p className="text-gray-700">
                  Use scientific notation when dealing with very large numbers (like astronomical distances), very small numbers (like atomic measurements), when precision matters, in scientific calculations, or when comparing numbers of vastly different magnitudes.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  What is e-notation and how is it different from scientific notation?
                </h3>
                <p className="text-gray-700">
                  E-notation (like 3.456e11) is the computer/calculator format for scientific notation. The "e" stands for "exponent" and means "times 10 to the power of." So 3.456e11 is the same as 3.456 × 10¹¹. It's just a different way to write the same thing.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  What is engineering notation?
                </h3>
                <p className="text-gray-700">
                  Engineering notation is similar to scientific notation, but the exponent is always a multiple of 3 (like 10³, 10⁶, 10⁹). This aligns with metric prefixes (kilo, mega, giga) and is commonly used in engineering and electronics.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  How do I enter scientific notation in a calculator?
                </h3>
                <p className="text-gray-700">
                  Most calculators have an "EE" or "EXP" button for scientific notation. To enter 3.456 × 10¹¹, type: 3.456, press EE or EXP, then type 11. Don't manually type "× 10^" as this will give incorrect results.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Can scientific notation be negative?
                </h3>
                <p className="text-gray-700">
                  Yes, both the coefficient and the exponent can be negative. A negative coefficient means the number itself is negative (like -3.5 × 10⁴ = -35,000), while a negative exponent indicates a small number less than 1 (like 3.5 × 10⁻⁴ = 0.00035).
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  What is the order of magnitude?
                </h3>
                <p className="text-gray-700">
                  The order of magnitude is the exponent in scientific notation, representing the power of 10. It gives a rough sense of the scale of a number. For example, 10⁶ (million) and 10⁹ (billion) differ by 3 orders of magnitude, meaning one is 1,000 times larger than the other.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  How many significant figures should I use in scientific notation?
                </h3>
                <p className="text-gray-700">
                  The number of significant figures depends on the precision of your measurement or calculation. In scientific notation, all digits in the coefficient are significant. For example, 3.456 × 10¹¹ has 4 significant figures, while 3.5 × 10¹¹ has 2 significant figures.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-[#1A3D7C] mb-4">Why Use Our Scientific Notation Converter?</h2>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-start">
                <span className="text-[#2BAE66] mr-3 text-2xl">✓</span>
                <span><strong>Multiple Formats:</strong> Convert to scientific, e-notation, and engineering notation</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#2BAE66] mr-3 text-2xl">✓</span>
                <span><strong>Comprehensive Results:</strong> See all notation formats at once</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#2BAE66] mr-3 text-2xl">✓</span>
                <span><strong>Word Form:</strong> Get number spelled out in words</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#2BAE66] mr-3 text-2xl">✓</span>
                <span><strong>Order of Magnitude:</strong> Understand the scale of numbers</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#2BAE66] mr-3 text-2xl">✓</span>
                <span><strong>Free & Easy:</strong> No registration, instant results</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#2BAE66] mr-3 text-2xl">✓</span>
                <span><strong>Educational:</strong> Learn with comprehensive examples</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
