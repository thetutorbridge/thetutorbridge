'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, Shuffle, Copy, CheckCircle2, Lightbulb, HelpCircle, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function RandomNumberGenerator() {
  const [min, setMin] = useState<string>('1');
  const [max, setMax] = useState<string>('10');
  const [quantity, setQuantity] = useState<string>('5');
  const [allowRepeats, setAllowRepeats] = useState<string>('no');
  const [sortOption, setSortOption] = useState<string>('none');
  const [copyFormat, setCopyFormat] = useState<string>('space');
  const [result, setResult] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  const generateRandomNumbers = () => {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    const count = parseInt(quantity);

    // Validation
    if (isNaN(minNum) || isNaN(maxNum) || isNaN(count)) {
      alert('Please enter valid numbers');
      return;
    }

    if (minNum >= maxNum) {
      alert('Minimum must be less than Maximum');
      return;
    }

    if (count < 1) {
      alert('Quantity must be at least 1');
      return;
    }

    if (allowRepeats === 'no' && count > (maxNum - minNum + 1)) {
      alert(`Cannot generate ${count} unique numbers in range ${minNum}-${maxNum}. Maximum unique numbers possible: ${maxNum - minNum + 1}`);
      return;
    }

    const numbers: number[] = [];
    const availableNumbers = new Set<number>();

    // Generate array of all possible numbers
    if (allowRepeats === 'no') {
      for (let i = minNum; i <= maxNum; i++) {
        availableNumbers.add(i);
      }
    }

    // Generate random numbers
    for (let i = 0; i < count; i++) {
      let randomNum: number;

      if (allowRepeats === 'no') {
        // Pick from available numbers
        const availableArray = Array.from(availableNumbers);
        const randomIndex = Math.floor(Math.random() * availableArray.length);
        randomNum = availableArray[randomIndex];
        availableNumbers.delete(randomNum);
      } else {
        // Allow repeats
        randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      }

      numbers.push(randomNum);
    }

    // Sort if needed
    let sortedNumbers = [...numbers];
    if (sortOption === 'asc') {
      sortedNumbers.sort((a, b) => a - b);
    } else if (sortOption === 'desc') {
      sortedNumbers.sort((a, b) => b - a);
    }

    setResult(sortedNumbers);
    setCopied(false);
  };

  const handleClear = () => {
    setMin('1');
    setMax('10');
    setQuantity('5');
    setAllowRepeats('no');
    setSortOption('none');
    setCopyFormat('space');
    setResult([]);
    setCopied(false);
  };

  const formatForCopy = (numbers: number[]): string => {
    switch (copyFormat) {
      case 'space':
        return numbers.join(' ');
      case 'comma':
        return numbers.join(', ');
      case 'newline':
        return numbers.join('\n');
      case 'commaNoSpace':
        return numbers.join(',');
      default:
        return numbers.join(' ');
    }
  };

  const handleCopy = async () => {
    if (result.length === 0) return;

    const textToCopy = formatForCopy(result);
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How random are the numbers generated?","acceptedAnswer":{"@type":"Answer","text":"Our generator uses JavaScript\'s Math.random() function, which produces pseudo-random numbers suitable for most purposes including games, sampling, and education. While not cryptographically secure, the numbers are sufficiently random for everyday applications and pass basic randomness tests."}},{"@type":"Question","name":"Can I generate the same random numbers twice?","acceptedAnswer":{"@type":"Answer","text":"No, each generation creates new random numbers. The generator doesn\'t use seeds or save previous results. If you need to preserve numbers, use the Copy button immediately after generation. For reproducible random sequences, you\'d need a seeded random generator."}},{"@type":"Question","name":"What\'s the difference between allowing and disallowing repeats?","acceptedAnswer":{"@type":"Answer","text":"\'No Repeats\' ensures each number appears at most once (like drawing lottery balls without replacement). \'Allow Repeats\' lets the same number appear multiple times (like rolling dice where you can get the same number repeatedly). Use \'No Repeats\' for unique selections and \'Allow Repeats\' for independent random events."}},{"@type":"Question","name":"What\'s the maximum range and quantity I can use?","acceptedAnswer":{"@type":"Answer","text":"You can use any positive integer range and generate up to thousands of numbers. However, with \'No Repeats\' enabled, the maximum quantity equals your range size (e.g., range 1-100 allows up to 100 unique numbers). Very large quantities may take slightly longer to generate."}},{"@type":"Question","name":"Can I use this for lottery number selection?","acceptedAnswer":{"@type":"Answer","text":"Yes! Set your range to match the lottery (e.g., 1-49 for many lotteries), choose your quantity (usually 6 numbers), select \'No Repeats\' to ensure unique numbers, and optionally sort them ascending. The generator provides fair random selection suitable for lottery picks."}},{"@type":"Question","name":"Is this generator suitable for cryptography or security?","acceptedAnswer":{"@type":"Answer","text":"No. This generator uses pseudo-random numbers suitable for games, education, and general purposes. For security-critical applications like encryption keys or authentication tokens, use a cryptographically secure random number generator (CSPRNG) specifically designed for that purpose."}},{"@type":"Question","name":"Why do I sometimes see patterns in random numbers?","acceptedAnswer":{"@type":"Answer","text":"Humans are pattern-seeking and often see patterns in true randomness. Consecutive numbers, repeated digits, or clusters can occur in genuine random sequences. If you generate enough numbers over time, you\'ll see roughly equal distribution. Small samples may show apparent patterns that aren\'t statistically significant."}},{"@type":"Question","name":"Can I generate negative numbers or decimals?","acceptedAnswer":{"@type":"Answer","text":"This generator currently produces whole numbers (integers) only. You can use negative ranges by setting a negative minimum (e.g., -10 to 10). For decimal random numbers, you\'d need a specialized decimal random generator, though you could divide the results by a power of 10 manually."}}]}' }}
      />
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#2BAE66] transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-[#2BAE66] transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Random Number Generator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Shuffle className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Random Number Generator
            </h1>
            <p className="text-lg md:text-xl text-orange-100 max-w-2xl mx-auto leading-relaxed">
              Generate random numbers with custom range, control duplicates, and choose sorting options. Perfect for games, lottery, passwords, and random selection.
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Input Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-orange-600" />
                  Random Numbers Generator
                </h2>

                {/* Range */}
                <div className="mb-6 p-5 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
                  <h3 className="font-bold text-gray-900 mb-4">Range</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="min" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Min:
                      </Label>
                      <Input
                        id="min"
                        type="number"
                        placeholder="1"
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                        className="text-center text-lg font-bold border-2 border-orange-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="max" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Max:
                      </Label>
                      <Input
                        id="max"
                        type="number"
                        placeholder="10"
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                        className="text-center text-lg font-bold border-2 border-orange-300"
                      />
                    </div>
                  </div>
                </div>

                {/* How Many */}
                <div className="mb-6 p-5 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border-2 border-red-200">
                  <h3 className="font-bold text-gray-900 mb-4">How Many</h3>

                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="quantity" className="text-sm font-semibold text-gray-700">
                        Generate
                      </Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="5"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="flex-1 text-center text-lg font-bold border-2 border-red-300"
                      />
                      <span className="text-sm text-gray-700">list items</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="repeats" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Allow repeats:
                    </Label>
                    <Select value={allowRepeats} onValueChange={setAllowRepeats}>
                      <SelectTrigger id="repeats" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="sort" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Sort:
                    </Label>
                    <Select value={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger id="sort" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Do not sort</SelectItem>
                        <SelectItem value="asc">Ascending (Low to High)</SelectItem>
                        <SelectItem value="desc">Descending (High to Low)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Copy Format */}
                <div className="mb-6 p-5 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border-2 border-pink-200">
                  <h3 className="font-bold text-gray-900 mb-4">Copy Button</h3>
                  <div>
                    <Label htmlFor="copyFormat" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Copy / Paste:
                    </Label>
                    <Select value={copyFormat} onValueChange={setCopyFormat}>
                      <SelectTrigger id="copyFormat" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="space">Text with Spaces</SelectItem>
                        <SelectItem value="comma">Comma Separated</SelectItem>
                        <SelectItem value="commaNoSpace">Comma (No Spaces)</SelectItem>
                        <SelectItem value="newline">New Line</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="px-6 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50"
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={generateRandomNumbers}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Calculate
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3">
              {result.length > 0 ? (
                <div className="space-y-6">
                  {/* Answer Card */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        Answer:
                      </h3>
                      <Button
                        onClick={handleCopy}
                        className={`flex items-center gap-2 ${
                          copied
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-orange-600 hover:bg-orange-700'
                        } text-white px-6 py-2 rounded-lg transition-all`}
                      >
                        {copied ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 min-h-[120px] flex items-center justify-center">
                      <p className="text-3xl md:text-4xl font-bold text-gray-900 text-center break-words">
                        {formatForCopy(result)}
                      </p>
                    </div>

                    {/* Statistics */}
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Count</p>
                        <p className="text-xl font-bold text-orange-600">{result.length}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Sum</p>
                        <p className="text-xl font-bold text-orange-600">
                          {result.reduce((acc, val) => acc + val, 0)}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Average</p>
                        <p className="text-xl font-bold text-orange-600">
                          {(result.reduce((acc, val) => acc + val, 0) / result.length).toFixed(2)}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Range</p>
                        <p className="text-xl font-bold text-orange-600">
                          {Math.max(...result)} - {Math.min(...result)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-[#FFC857]" />
                      Generation Details
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Range:</span>
                        <span className="font-bold text-gray-900">
                          {min} to {max}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Numbers Generated:</span>
                        <span className="font-bold text-gray-900">{result.length}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Duplicates Allowed:</span>
                        <span className="font-bold text-gray-900">
                          {allowRepeats === 'yes' ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Sort Order:</span>
                        <span className="font-bold text-gray-900">
                          {sortOption === 'none'
                            ? 'Random Order'
                            : sortOption === 'asc'
                            ? 'Ascending'
                            : 'Descending'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Copy Format:</span>
                        <span className="font-bold text-gray-900">
                          {copyFormat === 'space'
                            ? 'Text with Spaces'
                            : copyFormat === 'comma'
                            ? 'Comma Separated'
                            : copyFormat === 'commaNoSpace'
                            ? 'Comma (No Spaces)'
                            : 'New Line'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Shuffle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    Set your parameters and click Calculate to generate random numbers
                  </p>
                  <p className="text-gray-400 text-sm">
                    Perfect for games, lottery, passwords, and random selection
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
                Understanding Random Number Generation
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                A random number generator (RNG) is a tool that produces unpredictable sequences of numbers within a specified range. Random numbers are fundamental in computing, mathematics, statistics, gaming, cryptography, and various real-world applications where unpredictability and fairness are essential.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our comprehensive random number generator allows you to customize every aspect of number generation. You can set the minimum and maximum values, control how many numbers to generate, decide whether to allow duplicate numbers, choose sorting options, and select your preferred copy format—all with instant results.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you need random numbers for lottery picks, game mechanics, statistical sampling, password generation, raffle drawings, or educational purposes, this tool provides a flexible and user-friendly solution. The generator uses JavaScript's built-in random number functionality to create pseudo-random numbers that are suitable for most practical applications.
              </p>
            </section>

            {/* How It Works */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Use This Random Number Generator
              </h2>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 mb-6">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Set Your Range:</strong>
                      <p className="text-gray-700 mt-1">Enter the minimum and maximum values for your random numbers. For example, 1 to 100 for a percentage-style range, or 1 to 6 for a dice roll.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Choose Quantity:</strong>
                      <p className="text-gray-700 mt-1">Specify how many random numbers you want to generate. This could be 1 for a single random number, 6 for lottery picks, or any quantity you need.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Configure Options:</strong>
                      <p className="text-gray-700 mt-1">Decide whether to allow repeated numbers, choose if you want the results sorted (ascending, descending, or random), and select your preferred copy format.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong className="text-gray-900">Generate and Copy:</strong>
                      <p className="text-gray-700 mt-1">Click Calculate to generate your random numbers. Use the Copy button to instantly copy the results to your clipboard in your chosen format.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* Features Explanation */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Understanding Generator Features
              </h2>

              <div className="space-y-6">
                <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-orange-600 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Range Selection
                  </h3>
                  <p className="text-gray-700 mb-3">
                    The range defines the minimum and maximum values for your random numbers. The minimum value must be less than the maximum value. Common ranges include 1-6 (dice), 1-10 (simple selection), 1-100 (percentages), or any custom range you need.
                  </p>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Example:</strong> Range 1-10 will only generate numbers between 1 and 10 inclusive.
                    </p>
                  </div>
                </div>

                <div className="bg-white border-2 border-red-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-red-600 mb-3">
                    Allow Repeats Option
                  </h3>
                  <p className="text-gray-700 mb-3">
                    This option controls whether the same number can appear multiple times in your results:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-3">
                    <li><strong>No Repeats:</strong> Each number will appear at most once (like drawing lottery balls)</li>
                    <li><strong>Allow Repeats:</strong> Numbers can appear multiple times (like rolling dice multiple times)</li>
                  </ul>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> With "No Repeats," you cannot generate more numbers than available in your range. For example, range 1-10 can only generate up to 10 unique numbers.
                    </p>
                  </div>
                </div>

                <div className="bg-white border-2 border-pink-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-pink-600 mb-3">
                    Sort Options
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Choose how you want your generated numbers displayed:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Do Not Sort:</strong> Numbers appear in random order as they were generated</li>
                    <li><strong>Ascending:</strong> Numbers are sorted from lowest to highest (e.g., 1, 3, 5, 8, 10)</li>
                    <li><strong>Descending:</strong> Numbers are sorted from highest to lowest (e.g., 10, 8, 5, 3, 1)</li>
                  </ul>
                </div>

                <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-purple-600 mb-3">
                    Copy Formats
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Select how numbers should be formatted when copied to clipboard:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Text with Spaces:</strong> "1 5 8 10 15" (easy to read)</li>
                    <li><strong>Comma Separated:</strong> "1, 5, 8, 10, 15" (CSV format)</li>
                    <li><strong>Comma (No Spaces):</strong> "1,5,8,10,15" (compact CSV)</li>
                    <li><strong>New Line:</strong> Each number on a separate line (list format)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Applications
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">🎲 Gaming & Entertainment</h3>
                  <p className="text-gray-700">
                    Generate random numbers for dice rolls, card games, board games, video game mechanics, random event triggers, loot drops, and character stats. Create fair and unpredictable gameplay experiences.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-3">🎟️ Lottery & Raffles</h3>
                  <p className="text-gray-700">
                    Pick lottery numbers, raffle ticket winners, door prize selections, giveaway winners, and random drawings. Ensure fair selection in contests and promotional events.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-pink-600 mb-3">📊 Research & Statistics</h3>
                  <p className="text-gray-700">
                    Generate random samples for surveys, create random assignments for experiments, select participants for studies, and perform Monte Carlo simulations for statistical analysis.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">🔒 Security & Passwords</h3>
                  <p className="text-gray-700">
                    Create random PIN codes, generate password components, produce verification codes, create one-time passwords (OTP), and generate random seeds for cryptographic applications.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-3">🎓 Education & Teaching</h3>
                  <p className="text-gray-700">
                    Generate random numbers for math problems, create quiz question orders, randomly select students, assign random groups, and demonstrate probability concepts in statistics classes.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-600 mb-3">💼 Business & Decision Making</h3>
                  <p className="text-gray-700">
                    Make unbiased selections, choose random quality control samples, conduct A/B testing assignments, select random audit dates, and implement fair rotation schedules.
                  </p>
                </div>
              </div>
            </section>

            {/* Common Mistakes */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Mistakes to Avoid
              </h2>

              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Requesting More Unique Numbers Than Available</h3>
                  <p className="text-red-800 mb-2">
                    <strong>Wrong:</strong> Trying to generate 20 unique numbers in range 1-10 ❌
                  </p>
                  <p className="text-green-800">
                    <strong>Correct:</strong> With "No Repeats," you can only generate up to 10 numbers in a 1-10 range. Either increase your range or allow repeats ✓
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Min Greater Than Max</h3>
                  <p className="text-red-800 mb-2">
                    <strong>Wrong:</strong> Setting minimum = 100 and maximum = 10 ❌
                  </p>
                  <p className="text-green-800">
                    <strong>Correct:</strong> Always ensure minimum is less than maximum. Use 10 to 100, not 100 to 10 ✓
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Expecting True Randomness for Cryptography</h3>
                  <p className="text-red-800 mb-2">
                    <strong>Wrong:</strong> Using online random generators for high-security passwords or encryption keys ❌
                  </p>
                  <p className="text-green-800">
                    <strong>Correct:</strong> For cryptographic purposes, use dedicated cryptographic random number generators (CSPRNG). This tool is perfect for games, sampling, and general use ✓
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Not Understanding Probability</h3>
                  <p className="text-red-800 mb-2">
                    <strong>Wrong:</strong> Expecting equal distribution in small sample sizes or thinking previous results affect future generations ❌
                  </p>
                  <p className="text-green-800">
                    <strong>Correct:</strong> Each generation is independent. With enough generations, you'll see roughly equal distribution across your range ✓
                  </p>
                </div>
              </div>
            </section>

            {/* Tips and Tricks */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Tips for Using Random Numbers
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-700 mb-3">Test Multiple Times</h3>
                  <p className="text-gray-700">
                    If you need high-quality randomness, generate multiple sets and compare. True randomness should show different patterns each time with no obvious bias toward specific numbers.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-700 mb-3">Save Important Results</h3>
                  <p className="text-gray-700">
                    Use the Copy button to save your random numbers immediately. Once you generate new numbers, the previous ones are gone. Keep records for lottery picks or important selections.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-pink-700 mb-3">Use Appropriate Ranges</h3>
                  <p className="text-gray-700">
                    Choose ranges that match your needs: 1-6 for dice, 0-100 for percentages, 1-52 for card deck positions, 1-1000 for large selections. Appropriate ranges make results more useful.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-700 mb-3">Consider Sort Options</h3>
                  <p className="text-gray-700">
                    Sorted results are easier to check for duplicates and patterns. Use ascending sort for lottery numbers or when you need to quickly scan your results for specific values.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-700 mb-3">Document Your Settings</h3>
                  <p className="text-gray-700">
                    For reproducibility in research or games, document your range, quantity, and whether repeats were allowed. This helps validate results and recreate conditions if needed.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-700 mb-3">Understand Limitations</h3>
                  <p className="text-gray-700">
                    Computer random number generators are "pseudo-random"—they use mathematical algorithms. They're perfect for games, sampling, and general use but not for high-security cryptography.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <HelpCircle className="w-8 h-8 text-orange-600" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How random are the numbers generated?
                  </h3>
                  <p className="text-gray-700">
                    Our generator uses JavaScript's Math.random() function, which produces pseudo-random numbers suitable for most purposes including games, sampling, and education. While not cryptographically secure, the numbers are sufficiently random for everyday applications and pass basic randomness tests.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can I generate the same random numbers twice?
                  </h3>
                  <p className="text-gray-700">
                    No, each generation creates new random numbers. The generator doesn't use seeds or save previous results. If you need to preserve numbers, use the Copy button immediately after generation. For reproducible random sequences, you'd need a seeded random generator.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What's the difference between allowing and disallowing repeats?
                  </h3>
                  <p className="text-gray-700">
                    "No Repeats" ensures each number appears at most once (like drawing lottery balls without replacement). "Allow Repeats" lets the same number appear multiple times (like rolling dice where you can get the same number repeatedly). Use "No Repeats" for unique selections and "Allow Repeats" for independent random events.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What's the maximum range and quantity I can use?
                  </h3>
                  <p className="text-gray-700">
                    You can use any positive integer range and generate up to thousands of numbers. However, with "No Repeats" enabled, the maximum quantity equals your range size (e.g., range 1-100 allows up to 100 unique numbers). Very large quantities may take slightly longer to generate.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can I use this for lottery number selection?
                  </h3>
                  <p className="text-gray-700">
                    Yes! Set your range to match the lottery (e.g., 1-49 for many lotteries), choose your quantity (usually 6 numbers), select "No Repeats" to ensure unique numbers, and optionally sort them ascending. The generator provides fair random selection suitable for lottery picks.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Is this generator suitable for cryptography or security?
                  </h3>
                  <p className="text-gray-700">
                    No. This generator uses pseudo-random numbers suitable for games, education, and general purposes. For security-critical applications like encryption keys or authentication tokens, use a cryptographically secure random number generator (CSPRNG) specifically designed for that purpose.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why do I sometimes see patterns in random numbers?
                  </h3>
                  <p className="text-gray-700">
                    Humans are pattern-seeking and often see patterns in true randomness. Consecutive numbers, repeated digits, or clusters can occur in genuine random sequences. If you generate enough numbers over time, you'll see roughly equal distribution. Small samples may show apparent patterns that aren't statistically significant.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can I generate negative numbers or decimals?
                  </h3>
                  <p className="text-gray-700">
                    This generator currently produces whole numbers (integers) only. You can use negative ranges by setting a negative minimum (e.g., -10 to 10). For decimal random numbers, you'd need a specialized decimal random generator, though you could divide the results by a power of 10 manually.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What does the statistics section show?
                  </h3>
                  <p className="text-gray-700">
                    The statistics show: Count (how many numbers generated), Sum (total of all numbers), Average (mean of the numbers), and Range (highest to lowest value). These help you quickly understand your generated number set and verify it meets your expectations.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do I use this for research or statistical sampling?
                  </h3>
                  <p className="text-gray-700">
                    For random sampling, set your range to match your population size (e.g., 1-500 for 500 participants), choose how many samples you need, and select "No Repeats" to ensure each participant can only be selected once. Use ascending sort to make it easier to identify selected participants.
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
                Random number generation is a powerful tool with applications across gaming, research, security, education, and decision-making. Our comprehensive random number generator provides all the features you need to create random numbers quickly and easily, with full control over range, quantity, duplicates, sorting, and output format.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Whether you're selecting lottery numbers, conducting statistical research, creating game mechanics, choosing raffle winners, or teaching probability concepts, this tool offers a reliable and user-friendly solution. The intuitive interface makes it easy for anyone to generate quality random numbers in seconds.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Understanding the options available—particularly the difference between allowing and disallowing repeats, and when to use different sort orders—helps you generate exactly the random numbers you need for your specific application. The built-in statistics and detailed generation information help you verify that results meet your requirements.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Start using our Random Number Generator today for all your random selection needs. With instant generation, multiple copy formats, and comprehensive options, you'll have the perfect tool for any situation requiring unpredictable, fair random numbers. Try it now and experience how easy random number generation can be!
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
              Need Help with Mathematics & Probability?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you understand random numbers, probability, and mathematical concepts. Get personalized one-on-one guidance tailored to your learning style.
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
