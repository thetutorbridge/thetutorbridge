'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, BookOpen, ArrowRight, ArrowLeftRight, History } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ConversionResult {
  input: string;
  output: string;
  steps: string[];
  breakdown: { symbol: string; value: number }[];
  conversionType: 'toRoman' | 'toNumber';
}

export default function RomanNumeralConverter() {
  const [input, setInput] = useState<string>('');
  const [conversionType, setConversionType] = useState<'toRoman' | 'toNumber'>('toRoman');
  const [result, setResult] = useState<ConversionResult | null>(null);

  // Roman numeral mappings
  const romanNumerals = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' },
  ];

  const romanSymbolValues: { [key: string]: number } = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000,
  };

  // Convert number to Roman numeral
  const numberToRoman = (num: number): ConversionResult => {
    let remaining = num;
    let roman = '';
    const breakdown: { symbol: string; value: number }[] = [];
    const steps: string[] = [];

    steps.push(`Converting ${num} to Roman numerals:`);
    steps.push(`We start with ${num} and break it down using the largest Roman numeral values first.`);

    for (const { value, symbol } of romanNumerals) {
      const count = Math.floor(remaining / value);
      if (count > 0) {
        const symbolRepeat = symbol.repeat(count);
        roman += symbolRepeat;
        breakdown.push({ symbol: symbolRepeat, value: value * count });
        steps.push(`${remaining} ÷ ${value} = ${count}, so we use ${symbol} ${count} time${count > 1 ? 's' : ''}: ${symbolRepeat} (value: ${value * count})`);
        remaining -= value * count;
        steps.push(`Remaining: ${remaining}`);
      }
    }

    steps.push(`Final result: ${num} = ${roman}`);

    return {
      input: num.toString(),
      output: roman,
      steps,
      breakdown,
      conversionType: 'toRoman',
    };
  };

  // Convert Roman numeral to number
  const romanToNumber = (roman: string): ConversionResult => {
    const upperRoman = roman.toUpperCase();
    let total = 0;
    const breakdown: { symbol: string; value: number }[] = [];
    const steps: string[] = [];

    steps.push(`Converting ${upperRoman} to a number:`);
    steps.push(`We read from left to right and apply the subtractive rule when needed.`);

    for (let i = 0; i < upperRoman.length; i++) {
      const current = romanSymbolValues[upperRoman[i]];
      const next = romanSymbolValues[upperRoman[i + 1]];

      if (next && current < next) {
        // Subtractive case
        const subtractiveValue = next - current;
        total += subtractiveValue;
        breakdown.push({ symbol: upperRoman[i] + upperRoman[i + 1], value: subtractiveValue });
        steps.push(`${upperRoman[i]}${upperRoman[i + 1]}: ${current} is less than ${next}, so ${next} - ${current} = ${subtractiveValue} (subtractive notation)`);
        steps.push(`Running total: ${total}`);
        i++; // Skip next character
      } else {
        // Additive case
        total += current;
        breakdown.push({ symbol: upperRoman[i], value: current });
        steps.push(`${upperRoman[i]}: Add ${current}`);
        steps.push(`Running total: ${total}`);
      }
    }

    steps.push(`Final result: ${upperRoman} = ${total}`);

    return {
      input: roman,
      output: total.toString(),
      steps,
      breakdown,
      conversionType: 'toNumber',
    };
  };

  // Validate Roman numeral
  const isValidRoman = (str: string): boolean => {
    const romanRegex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;
    return romanRegex.test(str);
  };

  const handleConvert = () => {
    if (!input.trim()) {
      alert('Please enter a value to convert');
      return;
    }

    try {
      if (conversionType === 'toRoman') {
        const num = parseInt(input);
        if (isNaN(num)) {
          alert('Please enter a valid number');
          return;
        }
        if (num < 1 || num > 3999) {
          alert('Please enter a number between 1 and 3999');
          return;
        }
        setResult(numberToRoman(num));
      } else {
        const trimmedInput = input.trim().toUpperCase();
        if (!isValidRoman(trimmedInput)) {
          alert('Please enter a valid Roman numeral (I, V, X, L, C, D, M)');
          return;
        }
        setResult(romanToNumber(trimmedInput));
      }
    } catch (error) {
      alert('An error occurred during conversion. Please check your input.');
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  const handleSwitch = () => {
    setConversionType(conversionType === 'toRoman' ? 'toNumber' : 'toRoman');
    setInput('');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the largest number you can write with Roman numerals?","acceptedAnswer":{"@type":"Answer","text":"The standard Roman numeral system can represent numbers up to 3,999 (MMMCMXCIX). Numbers larger than 3,999 require special notation like bars over letters (which multiply by 1,000) or other conventions not supported by standard Roman numerals."}},{"@type":"Question","name":"Why is there no zero in Roman numerals?","acceptedAnswer":{"@type":"Answer","text":"Ancient Romans didn\'t have a concept of zero as a number. Roman numerals were designed for counting tangible objects and recording quantities, not for mathematics or representing \'nothing.\' Zero as a mathematical concept was introduced much later from India via Arabic mathematics."}},{"@type":"Question","name":"Can Roman numerals represent decimal numbers or fractions?","acceptedAnswer":{"@type":"Answer","text":"Standard Roman numerals only represent whole numbers. Ancient Romans had a separate system for fractions based on twelfths (duodecimal), but it\'s not commonly used today. Modern usage of Roman numerals is limited to integers from 1 to 3,999."}},{"@type":"Question","name":"Why do some clocks use IIII instead of IV for 4?","acceptedAnswer":{"@type":"Answer","text":"This is known as the \'watchmaker\'s four.\' Several theories exist: visual symmetry with VIII opposite it, avoiding confusion with IV (which looks like VI upside down), and historical tradition. While not standard, it\'s an accepted variation in horology (clockmaking)."}},{"@type":"Question","name":"What does the bar over a Roman numeral mean?","acceptedAnswer":{"@type":"Answer","text":"A bar (vinculum) over a Roman numeral multiplies its value by 1,000. For example, V̅ = 5,000 and X̅ = 10,000. This notation allows representation of larger numbers beyond the standard limit of 3,999, though it\'s not commonly used today."}},{"@type":"Question","name":"How were Roman numerals used in ancient Rome?","acceptedAnswer":{"@type":"Answer","text":"Romans used their numeral system for commerce, record-keeping, military logistics, and monument inscriptions. For complex calculations, they used an abacus rather than written arithmetic. The system was practical for tallying but difficult for mathematical operations we take for granted today."}},{"@type":"Question","name":"Why did we switch from Roman to Arabic numerals?","acceptedAnswer":{"@type":"Answer","text":"Arabic (Hindu-Arabic) numerals were adopted in Europe because they\'re far superior for mathematics. They\'re positional (place value system), include zero, and make arithmetic operations much easier. Roman numerals remained for ceremonial and decorative purposes while Arabic numerals became standard for calculations."}},{"@type":"Question","name":"Is there a Roman numeral for negative numbers?","acceptedAnswer":{"@type":"Answer","text":"No, Roman numerals don\'t have a notation for negative numbers. The ancient Romans didn\'t use negative numbers in their mathematics. Negative numbers were developed much later in mathematical history, primarily in India and China."}}]}' }}
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
            <span className="text-gray-900 font-medium">Roman Numeral Converter</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <History className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Roman Numeral Converter
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
              Convert between numbers (1-3999) and Roman numerals instantly. Bi-directional converter with step-by-step explanations and historical insights.
            </p>
          </div>
        </div>
      </div>

      {/* Converter Section */}
      <div className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Input Section (Left Side - 2 columns) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-purple-600" />
                  Convert
                </h2>

                {/* Conversion Type Selector */}
                <div className="mb-6">
                  <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                    Conversion Type
                  </Label>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setConversionType('toRoman');
                        setInput('');
                        setResult(null);
                      }}
                      variant={conversionType === 'toRoman' ? 'default' : 'outline'}
                      className={`flex-1 ${conversionType === 'toRoman' ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                    >
                      Number → Roman
                    </Button>
                    <Button
                      onClick={handleSwitch}
                      variant="outline"
                      size="icon"
                      className="border-2"
                    >
                      <ArrowLeftRight className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => {
                        setConversionType('toNumber');
                        setInput('');
                        setResult(null);
                      }}
                      variant={conversionType === 'toNumber' ? 'default' : 'outline'}
                      className={`flex-1 ${conversionType === 'toNumber' ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                    >
                      Roman → Number
                    </Button>
                  </div>
                </div>

                {/* Input Field */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="input" className="text-sm font-semibold text-gray-700 mb-3 block">
                      {conversionType === 'toRoman' ? 'Enter Number (1-3999)' : 'Enter Roman Numeral'}
                    </Label>
                    <Input
                      id="input"
                      type="text"
                      placeholder={conversionType === 'toRoman' ? 'e.g., 2026' : 'e.g., MMXXIV'}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="text-center text-lg font-medium border-2 uppercase"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleConvert();
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleConvert}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Convert
                  </Button>
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="px-6 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50"
                  >
                    Clear
                  </Button>
                </div>

                {/* Quick Examples */}
                <div className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Quick Examples:</h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>• 2026 = MMXXIV</p>
                    <p>• 1999 = MCMXCIX</p>
                    <p>• XIV = 14</p>
                    <p>• XCIX = 99</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section (Right Side - 3 columns) */}
            <div className="lg:col-span-3">
              {result ? (
                <div className="space-y-6">
                  {/* Answer Card */}
                  <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4">Conversion Result</h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <div className="flex items-center justify-center gap-4 text-2xl md:text-3xl font-bold flex-wrap">
                        <span className="text-3xl md:text-4xl">{result.input}</span>
                        <ArrowRight className="w-8 h-8" />
                        <span className="text-4xl md:text-5xl">{result.output}</span>
                      </div>
                    </div>
                  </div>

                  {/* Breakdown Card */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Symbol Breakdown
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {result.breakdown.map((item, index) => (
                        <div key={index} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 text-center">
                          <div className="text-3xl font-bold text-purple-600 mb-2">{item.symbol}</div>
                          <div className="text-sm text-gray-600">= {item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step-by-Step Solution */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                      Step-by-Step Explanation
                    </h3>
                    <div className="space-y-4">
                      {result.steps.map((step, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold mt-1">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 leading-relaxed flex-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    Enter a {conversionType === 'toRoman' ? 'number' : 'Roman numeral'} and click Convert
                  </p>
                  <p className="text-gray-400 text-sm">
                    {conversionType === 'toRoman' ? 'Numbers from 1 to 3999 supported' : 'Valid Roman numerals: I, V, X, L, C, D, M'}
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
                Understanding Roman Numerals
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Roman numerals are a numeral system that originated in ancient Rome and remained the usual way of writing numbers throughout Europe well into the Late Middle Ages. Today, they're still used in various contexts including clock faces, book chapters, movie sequels, Super Bowl numbers, and formal documents.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The Roman numeral system uses seven basic symbols: I (1), V (5), X (10), L (50), C (100), D (500), and M (1000). These symbols are combined using addition and subtraction rules to represent any number from 1 to 3,999. Unlike our decimal system which is positional (where 23 means 2 tens and 3 ones), Roman numerals use a combination of additive and subtractive notation.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our Roman Numeral Converter makes it easy to convert between standard numbers and Roman numerals instantly. Whether you're trying to understand a date on a building, decipher a movie sequel number, or simply learning about this ancient numbering system, our tool provides clear, step-by-step explanations for every conversion.
              </p>
            </section>

            {/* Roman Numeral Symbols */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Roman Numeral Symbols and Values
              </h2>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 md:p-8 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Basic Symbols</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 flex items-center justify-between">
                    <span className="text-4xl font-bold text-purple-600">I</span>
                    <span className="text-2xl font-semibold text-gray-700">= 1</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 flex items-center justify-between">
                    <span className="text-4xl font-bold text-purple-600">V</span>
                    <span className="text-2xl font-semibold text-gray-700">= 5</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 flex items-center justify-between">
                    <span className="text-4xl font-bold text-purple-600">X</span>
                    <span className="text-2xl font-semibold text-gray-700">= 10</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 flex items-center justify-between">
                    <span className="text-4xl font-bold text-purple-600">L</span>
                    <span className="text-2xl font-semibold text-gray-700">= 50</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 flex items-center justify-between">
                    <span className="text-4xl font-bold text-purple-600">C</span>
                    <span className="text-2xl font-semibold text-gray-700">= 100</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 flex items-center justify-between">
                    <span className="text-4xl font-bold text-purple-600">D</span>
                    <span className="text-2xl font-semibold text-gray-700">= 500</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 flex items-center justify-between col-span-2">
                    <span className="text-4xl font-bold text-purple-600">M</span>
                    <span className="text-2xl font-semibold text-gray-700">= 1,000</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Memory Tip</h3>
                <p className="text-gray-700">
                  Remember the phrase: <strong>"I Value Xylophones Like Cows Dig Milk"</strong> to recall the symbols in order: I, V, X, L, C, D, M
                </p>
              </div>
            </section>

            {/* Conversion Rules */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Roman Numeral Conversion Rules
              </h2>
              <div className="space-y-6">
                <div className="bg-white border-l-4 border-purple-600 rounded-r-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">1. Additive Notation (Addition Rule)</h3>
                  <p className="text-gray-700 mb-3">
                    When a smaller or equal symbol appears after a larger symbol, you add the values.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-mono text-lg mb-2">VI = V + I = 5 + 1 = <strong>6</strong></p>
                    <p className="font-mono text-lg mb-2">XII = X + I + I = 10 + 1 + 1 = <strong>12</strong></p>
                    <p className="font-mono text-lg">MCCC = M + C + C + C = 1000 + 100 + 100 + 100 = <strong>1300</strong></p>
                  </div>
                </div>

                <div className="bg-white border-l-4 border-indigo-600 rounded-r-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">2. Subtractive Notation (Subtraction Rule)</h3>
                  <p className="text-gray-700 mb-3">
                    When a smaller symbol appears before a larger symbol, you subtract the smaller from the larger. This applies only to specific combinations.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-mono text-lg mb-2">IV = V - I = 5 - 1 = <strong>4</strong></p>
                    <p className="font-mono text-lg mb-2">IX = X - I = 10 - 1 = <strong>9</strong></p>
                    <p className="font-mono text-lg mb-2">XL = L - X = 50 - 10 = <strong>40</strong></p>
                    <p className="font-mono text-lg mb-2">XC = C - X = 100 - 10 = <strong>90</strong></p>
                    <p className="font-mono text-lg mb-2">CD = D - C = 500 - 100 = <strong>400</strong></p>
                    <p className="font-mono text-lg">CM = M - C = 1000 - 100 = <strong>900</strong></p>
                  </div>
                  <p className="text-gray-600 text-sm mt-3">
                    <strong>Important:</strong> Only I, X, and C can be subtracted. Only from the next two higher values.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-purple-600 rounded-r-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">3. Repetition Rule</h3>
                  <p className="text-gray-700 mb-3">
                    I, X, C, and M can be repeated up to three times in succession to add value.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-mono text-lg mb-2">III = I + I + I = 1 + 1 + 1 = <strong>3</strong></p>
                    <p className="font-mono text-lg mb-2">XXX = X + X + X = 10 + 10 + 10 = <strong>30</strong></p>
                    <p className="font-mono text-lg">CCC = C + C + C = 100 + 100 + 100 = <strong>300</strong></p>
                  </div>
                  <p className="text-gray-600 text-sm mt-3">
                    <strong>Note:</strong> V, L, and D are never repeated. Use IV instead of IIII, XL instead of XXXX, etc.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-indigo-600 rounded-r-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">4. Largest to Smallest Rule</h3>
                  <p className="text-gray-700 mb-3">
                    Roman numerals are written from largest to smallest, left to right (except for subtractive notation).
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-mono text-lg mb-2">MDCCLXXVI = M + D + C + C + L + X + X + V + I = <strong>1776</strong></p>
                    <p className="font-mono text-lg">MMXXIV = M + M + X + X + IV = <strong>2026</strong></p>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Use */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Use This Converter
              </h2>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Select Conversion Direction:</strong>
                      <p className="text-gray-700 mt-1">Choose whether you want to convert a number to Roman numerals or a Roman numeral to a number using the toggle buttons.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Enter Your Value:</strong>
                      <p className="text-gray-700 mt-1">Type a number (1-3999) or a valid Roman numeral (using I, V, X, L, C, D, M) in the input field.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Click Convert:</strong>
                      <p className="text-gray-700 mt-1">Press the Convert button (or hit Enter) to see the result, symbol breakdown, and step-by-step explanation.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong className="text-gray-900">Study the Explanation:</strong>
                      <p className="text-gray-700 mt-1">Review the detailed breakdown showing how each symbol contributes to the final value and the step-by-step conversion process.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* Common Conversions */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Roman Numeral Conversions
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-4">Numbers 1-10</h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between"><span>1</span><span className="font-bold">I</span></div>
                    <div className="flex justify-between"><span>2</span><span className="font-bold">II</span></div>
                    <div className="flex justify-between"><span>3</span><span className="font-bold">III</span></div>
                    <div className="flex justify-between"><span>4</span><span className="font-bold">IV</span></div>
                    <div className="flex justify-between"><span>5</span><span className="font-bold">V</span></div>
                    <div className="flex justify-between"><span>6</span><span className="font-bold">VI</span></div>
                    <div className="flex justify-between"><span>7</span><span className="font-bold">VII</span></div>
                    <div className="flex justify-between"><span>8</span><span className="font-bold">VIII</span></div>
                    <div className="flex justify-between"><span>9</span><span className="font-bold">IX</span></div>
                    <div className="flex justify-between"><span>10</span><span className="font-bold">X</span></div>
                  </div>
                </div>

                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-indigo-600 mb-4">Key Numbers</h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between"><span>20</span><span className="font-bold">XX</span></div>
                    <div className="flex justify-between"><span>30</span><span className="font-bold">XXX</span></div>
                    <div className="flex justify-between"><span>40</span><span className="font-bold">XL</span></div>
                    <div className="flex justify-between"><span>50</span><span className="font-bold">L</span></div>
                    <div className="flex justify-between"><span>90</span><span className="font-bold">XC</span></div>
                    <div className="flex justify-between"><span>100</span><span className="font-bold">C</span></div>
                    <div className="flex justify-between"><span>400</span><span className="font-bold">CD</span></div>
                    <div className="flex justify-between"><span>500</span><span className="font-bold">D</span></div>
                    <div className="flex justify-between"><span>900</span><span className="font-bold">CM</span></div>
                    <div className="flex justify-between"><span>1000</span><span className="font-bold">M</span></div>
                  </div>
                </div>

                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-4">Historical Years</h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between"><span>1492</span><span className="font-bold text-xs">MCDXCII</span></div>
                    <div className="flex justify-between"><span>1776</span><span className="font-bold text-xs">MDCCLXXVI</span></div>
                    <div className="flex justify-between"><span>1918</span><span className="font-bold text-xs">MCMXVIII</span></div>
                    <div className="flex justify-between"><span>1945</span><span className="font-bold text-xs">MCMXLV</span></div>
                    <div className="flex justify-between"><span>2000</span><span className="font-bold">MM</span></div>
                    <div className="flex justify-between"><span>2020</span><span className="font-bold">MMXX</span></div>
                    <div className="flex justify-between"><span>2026</span><span className="font-bold">MMXXIV</span></div>
                    <div className="flex justify-between"><span>2026</span><span className="font-bold">MMXXV</span></div>
                    <div className="flex justify-between"><span>3000</span><span className="font-bold">MMM</span></div>
                    <div className="flex justify-between"><span>3999</span><span className="font-bold text-xs">MMMCMXCIX</span></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Applications of Roman Numerals
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">🎬 Entertainment Industry</h3>
                  <p className="text-gray-700">
                    Movie sequels (Rocky IV, Star Wars Episode V), TV series seasons, and copyright years in film credits all use Roman numerals. Super Bowl games are numbered with Roman numerals (Super Bowl LVIII = 58).
                  </p>
                </div>
                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-indigo-600 mb-3">⏰ Clock Faces</h3>
                  <p className="text-gray-700">
                    Traditional analog clocks and watches often display hours using Roman numerals (I through XII). This gives them a classic, elegant appearance and connects to historical timekeeping.
                  </p>
                </div>
                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">📚 Book Organization</h3>
                  <p className="text-gray-700">
                    Front matter pages (preface, introduction) use Roman numerals for page numbers (i, ii, iii), while main content uses Arabic numerals. Chapter numbers and volume numbers also commonly use Roman numerals.
                  </p>
                </div>
                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-indigo-600 mb-3">🏛️ Architecture & Monuments</h3>
                  <p className="text-gray-700">
                    Buildings display construction dates in Roman numerals on cornerstones and plaques. Monuments, memorials, and historical landmarks use Roman numerals for dates and significant numbers.
                  </p>
                </div>
                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">👑 Royalty & Succession</h3>
                  <p className="text-gray-700">
                    Monarchs and popes use Roman numerals: Elizabeth II, Louis XIV, Pope John Paul II. This tradition distinguishes rulers with the same name across generations.
                  </p>
                </div>
                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-indigo-600 mb-3">📜 Legal Documents</h3>
                  <p className="text-gray-700">
                    Formal legal documents, contracts, and official papers often use Roman numerals for sections, clauses, and dates to convey formality and prevent alteration.
                  </p>
                </div>
              </div>
            </section>

            {/* Common Mistakes */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Mistakes When Using Roman Numerals
              </h2>
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Using IIII Instead of IV</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> IIII = 4 ✗
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> IV = 4 ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Exception: Some clock faces use IIII for symmetry, but standard notation is IV.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Repeating V, L, or D</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> VV = 10 ✗, LL = 100 ✗
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> X = 10 ✓, C = 100 ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    V, L, and D can only appear once in a sequence.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Incorrect Subtractive Pairs</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> IL = 49 ✗, IC = 99 ✗, VL = 45 ✗
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> XLIX = 49 ✓, XCIX = 99 ✓, XLV = 45 ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Only I, X, and C can be used subtractively, and only with the next two higher values.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Repeating More Than Three Times</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> XXXX = 40 ✗, IIII = 4 ✗
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> XL = 40 ✓, IV = 4 ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    No symbol should be repeated more than three times consecutively.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Writing Smaller Before Larger Incorrectly</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Reading VX as 5 ✗, reading IIV as 3 ✗
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> VX doesn't exist (use V for 5), IIV doesn't exist (use III for 3) ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Subtractive notation has strict rules - you can't subtract from just any larger numeral.
                  </p>
                </div>
              </div>
            </section>

            {/* Tips and Tricks */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Tips for Reading and Writing Roman Numerals
              </h2>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Break It Down into Groups:</strong>
                      <p className="text-gray-700 mt-1">
                        When reading long Roman numerals, break them into thousands, hundreds, tens, and ones. MCMXCIV = M (1000) + CM (900) + XC (90) + IV (4) = 1994.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Look for Subtractive Patterns First:</strong>
                      <p className="text-gray-700 mt-1">
                        Scan for IV, IX, XL, XC, CD, and CM before adding up individual symbols. These combinations are common and easy to miss.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Practice with Years:</strong>
                      <p className="text-gray-700 mt-1">
                        Convert your birth year, current year, and historical dates to Roman numerals. This practical application helps memorization.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Use the Calculator to Check:</strong>
                      <p className="text-gray-700 mt-1">
                        After manually converting, use our calculator to verify your work and see the step-by-step breakdown to understand any mistakes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Remember Key Numbers:</strong>
                      <p className="text-gray-700 mt-1">
                        Memorize 1, 5, 10, 50, 100, 500, 1000 and their subtractive forms (4, 9, 40, 90, 400, 900). Everything else is combinations of these.
                      </p>
                    </div>
                  </div>
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
                    What is the largest number you can write with Roman numerals?
                  </h3>
                  <p className="text-gray-700">
                    The standard Roman numeral system can represent numbers up to 3,999 (MMMCMXCIX). Numbers larger than 3,999 require special notation like bars over letters (which multiply by 1,000) or other conventions not supported by standard Roman numerals.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why is there no zero in Roman numerals?
                  </h3>
                  <p className="text-gray-700">
                    Ancient Romans didn't have a concept of zero as a number. Roman numerals were designed for counting tangible objects and recording quantities, not for mathematics or representing "nothing." Zero as a mathematical concept was introduced much later from India via Arabic mathematics.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can Roman numerals represent decimal numbers or fractions?
                  </h3>
                  <p className="text-gray-700">
                    Standard Roman numerals only represent whole numbers. Ancient Romans had a separate system for fractions based on twelfths (duodecimal), but it's not commonly used today. Modern usage of Roman numerals is limited to integers from 1 to 3,999.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why do some clocks use IIII instead of IV for 4?
                  </h3>
                  <p className="text-gray-700">
                    This is known as the "watchmaker's four." Several theories exist: visual symmetry with VIII opposite it, avoiding confusion with IV (which looks like VI upside down), and historical tradition. While not standard, it's an accepted variation in horology (clockmaking).
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What does the bar over a Roman numeral mean?
                  </h3>
                  <p className="text-gray-700">
                    A bar (vinculum) over a Roman numeral multiplies its value by 1,000. For example, V̅ = 5,000 and X̅ = 10,000. This notation allows representation of larger numbers beyond the standard limit of 3,999, though it's not commonly used today.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How were Roman numerals used in ancient Rome?
                  </h3>
                  <p className="text-gray-700">
                    Romans used their numeral system for commerce, record-keeping, military logistics, and monument inscriptions. For complex calculations, they used an abacus rather than written arithmetic. The system was practical for tallying but difficult for mathematical operations we take for granted today.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why did we switch from Roman to Arabic numerals?
                  </h3>
                  <p className="text-gray-700">
                    Arabic (Hindu-Arabic) numerals were adopted in Europe because they're far superior for mathematics. They're positional (place value system), include zero, and make arithmetic operations much easier. Roman numerals remained for ceremonial and decorative purposes while Arabic numerals became standard for calculations.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Is there a Roman numeral for negative numbers?
                  </h3>
                  <p className="text-gray-700">
                    No, Roman numerals don't have a notation for negative numbers. The ancient Romans didn't use negative numbers in their mathematics. Negative numbers were developed much later in mathematical history, primarily in India and China.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do you type Roman numerals on a computer?
                  </h3>
                  <p className="text-gray-700">
                    Simply type the capital letters I, V, X, L, C, D, and M using your keyboard. Some Unicode fonts include special Roman numeral characters, but standard capital letters work perfectly fine and are universally recognized. Our converter automatically formats your input correctly.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Are there different styles of Roman numerals?
                  </h3>
                  <p className="text-gray-700">
                    There are minor variations in notation style, particularly regarding subtractive notation. Modern standard uses IV for 4 and IX for 9, but historical inscriptions sometimes used IIII and VIIII. Our converter uses modern standard notation, which is most widely accepted and taught today.
                  </p>
                </div>
              </div>
            </section>

            {/* Historical Context */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Historical Context and Legacy
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Roman numerals originated in ancient Rome around 500 BCE and were the primary numeral system throughout the Roman Empire and medieval Europe for over 2,000 years. They evolved from earlier Etruscan numerals and served Romans well for their needs in commerce, military organization, and civil administration.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The system's longevity is remarkable considering its limitations for mathematical operations. Complex calculations were performed using an abacus, while Roman numerals were primarily used for recording results. The advent of algebra and advanced mathematics in medieval Europe highlighted these limitations and drove the adoption of Arabic numerals by the 14th century.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, Roman numerals persist in ceremonial, decorative, and formal contexts, connecting us to classical antiquity. Their continued use in movies, books, clocks, and monuments represents a cultural bridge to our past and adds gravitas to modern communications. Understanding Roman numerals enriches our appreciation of history and enhances our cultural literacy.
              </p>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Conclusion
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Roman numerals remain an important part of our cultural and educational landscape, connecting modern society to ancient history. Whether you're decoding the copyright date on a movie, understanding a clock face, or interpreting chapter numbers in a book, knowing how to read Roman numerals is a valuable skill.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our Roman Numeral Converter makes it easy to translate between modern Arabic numerals and classical Roman notation. With step-by-step explanations, you can learn the rules and logic behind the system, not just get quick answers. The tool serves both practical needs and educational purposes, helping students, professionals, and curious minds understand this ancient numeral system.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Use this converter whenever you encounter Roman numerals or need to express numbers in this classical format. The more you practice, the more natural reading and writing Roman numerals will become. Explore, experiment, and enjoy connecting with a numbering system that has endured for millennia!
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
              Need Help with Mathematics and Number Systems?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you understand Roman numerals, number systems, and excel in mathematics. Get personalized one-on-one guidance tailored to your learning style.
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
