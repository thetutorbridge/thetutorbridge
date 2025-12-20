'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Type, Home, CheckCircle, HelpCircle, Lightbulb, FileText, DollarSign, Copy, Check, TrendingUp, Target, ArrowRight, BookOpen } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function NumbersToWordsConverterPage() {
  const [numberInput, setNumberInput] = useState('');
  const [conversionType, setConversionType] = useState<'words' | 'currency' | 'check'>('words');
  const [letterCase, setLetterCase] = useState<'lowercase' | 'uppercase' | 'titlecase'>('lowercase');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  // Number to words conversion logic
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

  const convertLessThanThousand = (num: number): string => {
    if (num === 0) return '';

    let result = '';

    if (num >= 100) {
      result += ones[Math.floor(num / 100)] + ' hundred';
      num %= 100;
      if (num > 0) result += ' ';
    }

    if (num >= 20) {
      result += tens[Math.floor(num / 10)];
      num %= 10;
      if (num > 0) result += '-';
    } else if (num >= 10) {
      result += teens[num - 10];
      return result;
    }

    if (num > 0) {
      result += ones[num];
    }

    return result;
  };

  const numberToWords = (num: number): string => {
    if (num === 0) return 'zero';

    const billion = Math.floor(num / 1000000000);
    const million = Math.floor((num % 1000000000) / 1000000);
    const thousand = Math.floor((num % 1000000) / 1000);
    const remainder = num % 1000;

    let result = '';

    if (billion > 0) {
      result += convertLessThanThousand(billion) + ' billion';
      if (million > 0 || thousand > 0 || remainder > 0) result += ' ';
    }

    if (million > 0) {
      result += convertLessThanThousand(million) + ' million';
      if (thousand > 0 || remainder > 0) result += ' ';
    }

    if (thousand > 0) {
      result += convertLessThanThousand(thousand) + ' thousand';
      if (remainder > 0) result += ' ';
    }

    if (remainder > 0) {
      result += convertLessThanThousand(remainder);
    }

    return result.trim();
  };

  const applyLetterCase = (text: string): string => {
    switch (letterCase) {
      case 'uppercase':
        return text.toUpperCase();
      case 'titlecase':
        return text.split(' ').map(word =>
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
      default:
        return text;
    }
  };

  const handleCalculate = () => {
    if (!numberInput.trim()) {
      setResult('Please enter a number');
      return;
    }

    const cleanedInput = numberInput.replace(/,/g, '');
    const parts = cleanedInput.split('.');
    const integerPart = parseInt(parts[0]);
    const decimalPart = parts[1] || '0';

    if (isNaN(integerPart)) {
      setResult('Invalid number');
      return;
    }

    if (integerPart < 0) {
      setResult('Please enter a positive number');
      return;
    }

    if (integerPart > 999999999999) {
      setResult('Number is too large (max: 999,999,999,999)');
      return;
    }

    let convertedText = '';

    switch (conversionType) {
      case 'words':
        convertedText = numberToWords(integerPart);
        if (parts[1] && parseInt(parts[1]) > 0) {
          convertedText += ' point ';
          for (let digit of parts[1]) {
            convertedText += ones[parseInt(digit)] + ' ';
          }
          convertedText = convertedText.trim();
        }
        break;

      case 'currency':
        const rupees = numberToWords(integerPart);
        const paise = decimalPart.padEnd(2, '0').substring(0, 2);
        const paiseNum = parseInt(paise);

        convertedText = rupees + ' rupee' + (integerPart !== 1 ? 's' : '');

        if (paiseNum > 0) {
          convertedText += ' and ' + numberToWords(paiseNum) + ' pais' + (paiseNum !== 1 ? 'e' : 'a');
        }

        convertedText += ' only';
        break;

      case 'check':
        const dollars = numberToWords(integerPart);
        const cents = decimalPart.padEnd(2, '0').substring(0, 2);

        // For check writing, first letter uppercase
        convertedText = dollars.charAt(0).toUpperCase() + dollars.slice(1);
        convertedText += ' and ' + cents + '/100';

        // Don't apply letter case transformation for check format
        setResult(convertedText);
        return;
    }

    setResult(applyLetterCase(convertedText));
  };

  const handleClear = () => {
    setNumberInput('');
    setResult('');
    setCopied(false);
  };

  const handleCopy = () => {
    if (result && result !== 'Please enter a number' && result !== 'Invalid number') {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <Navigation />
      <div className="bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-8 md:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <Link
              href="/calculators"
              className="inline-flex items-center text-white/90 hover:text-white mb-4 md:mb-6 transition-colors text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Calculators
            </Link>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                  Numbers to Words Converter
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl">
                  Convert numbers to written words instantly. Perfect for writing checks, invoices, legal documents, and formal writing. Supports currency format and multiple letter cases.
                </p>
              </div>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                <Type className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {/* Left Column - Calculator */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 lg:p-10">
                <div className="bg-[#B85C4E] text-white text-center py-4 rounded-lg mb-6">
                  <h2 className="text-xl md:text-2xl font-bold">
                    Numbers to Words Calculator
                  </h2>
                </div>

                <div className="space-y-6 md:space-y-8">
                  {/* Number Input */}
                  <div>
                    <Label htmlFor="number-input" className="text-gray-900 font-semibold text-lg mb-3 block text-center">
                      Convert this Number:
                    </Label>
                    <Input
                      id="number-input"
                      type="text"
                      value={numberInput}
                      onChange={(e) => setNumberInput(e.target.value)}
                      placeholder="Enter a number (e.g., 123, 1000, 5.99)"
                      className="w-full text-center font-bold text-lg border-2 border-gray-300 focus:ring-2 focus:ring-[#2BAE66] py-6"
                    />
                  </div>

                  {/* Conversion Type */}
                  <div>
                    <Label className="text-gray-900 font-semibold text-lg mb-3 block text-center">
                      To:
                    </Label>
                    <RadioGroup
                      value={conversionType}
                      onValueChange={(value) => setConversionType(value as 'words' | 'currency' | 'check')}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="words" id="words" />
                        <Label htmlFor="words" className="cursor-pointer font-semibold text-base">
                          Words
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="currency" id="currency" />
                        <Label htmlFor="currency" className="cursor-pointer font-semibold text-base">
                          Currency
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="check" id="check" />
                        <Label htmlFor="check" className="cursor-pointer font-semibold text-base">
                          Check Writing
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Letter Case */}
                  <div>
                    <Label htmlFor="letter-case" className="text-gray-900 font-semibold text-base mb-3 flex items-center gap-2">
                      Letter Case:
                    </Label>
                    <Select value={letterCase} onValueChange={(value) => setLetterCase(value as any)}>
                      <SelectTrigger className="w-full border-2 border-gray-300 text-base py-6">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lowercase">lowercase</SelectItem>
                        <SelectItem value="uppercase">UPPERCASE</SelectItem>
                        <SelectItem value="titlecase">Title Case</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={handleClear}
                      variant="outline"
                      className="flex-1 py-6 text-lg font-semibold border-2 border-gray-300 hover:bg-gray-50"
                    >
                      Clear
                    </Button>
                    <Button
                      onClick={handleCalculate}
                      className="flex-1 py-6 text-lg font-semibold bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] hover:opacity-90"
                    >
                      Calculate
                    </Button>
                  </div>
                </div>

                {/* Info Display */}
                <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border-2 border-orange-200">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-base md:text-lg">
                    <Type className="w-5 h-5 mr-2" />
                    Quick Guide
                  </h3>
                  <ul className="space-y-2 text-sm md:text-base text-gray-700">
                    <li>• <strong>Words:</strong> Converts to plain text (e.g., 123 → one hundred twenty-three)</li>
                    <li>• <strong>Currency:</strong> Converts to rupees format (e.g., 100.50 → one hundred rupees and fifty paise only)</li>
                    <li>• <strong>Check Writing:</strong> Converts to check format (e.g., 100.50 → One hundred and 50/100)</li>
                    <li>• Supports up to 999 billion</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Result */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 text-white sticky top-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl md:text-2xl font-bold flex items-center">
                    <TrendingUp className="w-6 h-6 mr-3" />
                    Answer:
                  </h2>
                  {result && result !== 'Please enter a number' && result !== 'Invalid number' && (
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      size="sm"
                      className="bg-white/10 hover:bg-white/20 border-white/30 text-white"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  )}
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 min-h-[200px] border-2 border-white/20">
                  {result ? (
                    <p className="text-white text-lg leading-relaxed break-words">
                      {result}
                    </p>
                  ) : (
                    <p className="text-white/60 text-center italic">
                      Your result will appear here
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-white/20 space-y-2 text-xs md:text-sm text-white/80">
                  <p>✨ Type: {conversionType === 'words' ? 'Words' : conversionType === 'currency' ? 'Currency' : 'Check Writing'}</p>
                  <p>🔤 Case: {letterCase === 'lowercase' ? 'Lowercase' : letterCase === 'uppercase' ? 'Uppercase' : 'Title Case'}</p>
                  <p>📋 Click Copy to save result</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="mt-12 md:mt-16 space-y-8 md:space-y-12">
            {/* What is Numbers to Words Converter */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                What is a Numbers to Words Converter?
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  A <strong>numbers to words converter</strong> is a digital tool that transforms numeric digits into their written word equivalents. This essential utility helps you convert any number—whether it's 1, 100, or 1,000,000—into its proper written form in English, making it invaluable for various professional and legal documents.
                </p>
                <p>
                  Our converter supports three distinct conversion modes: <strong>plain words format</strong> (e.g., "one hundred twenty-three"), <strong>currency format</strong> for financial documents (e.g., "one hundred twenty-three rupees only"), and <strong>check writing format</strong> for bank checks (e.g., "One hundred twenty-three and 00/100").
                </p>
                <p>
                  The tool handles numbers up to 999 billion and includes decimal support for precise conversions. You can customize the output with three letter case options: lowercase for casual use, UPPERCASE for formal documents, and Title Case for standard business writing. This flexibility makes it perfect for checks, invoices, legal contracts, receipts, and any document requiring spelled-out numbers.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-lg">
                    <FileText className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    Legal Documents
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                    <li>✓ Contracts & agreements</li>
                    <li>✓ Affidavits</li>
                    <li>✓ Court documents</li>
                    <li>✓ Property deeds</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-lg">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-lg">
                    <DollarSign className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    Financial Use
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                    <li>✓ Writing checks</li>
                    <li>✓ Invoices & receipts</li>
                    <li>✓ Demand drafts</li>
                    <li>✓ Payment vouchers</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-lg">
                    <Type className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    Business & Education
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                    <li>✓ Business letters</li>
                    <li>✓ Academic writing</li>
                    <li>✓ Reports & proposals</li>
                    <li>✓ Formal correspondence</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How to Use */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                How to Use the Numbers to Words Converter
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    Step 1: Enter Your Number
                  </h3>
                  <p className="text-gray-700">
                    Type any number from 0 to 999,999,999,999 in the input field. You can enter <strong>whole numbers</strong> (e.g., 100, 5000) or <strong>decimal numbers</strong> (e.g., 123.45, 99.99). The converter accepts numbers with or without commas for easier readability.
                  </p>
                </div>

                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    Step 2: Choose Conversion Type
                  </h3>
                  <p className="text-gray-700">
                    Select your desired format: <strong>Words</strong> for standard text conversion (e.g., "one hundred"), <strong>Currency</strong> for rupee format with "only" suffix (e.g., "one hundred rupees and fifty paise only"), or <strong>Check Writing</strong> for the fraction format used on checks (e.g., "One hundred and 50/100").
                  </p>
                </div>

                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    Step 3: Select Letter Case
                  </h3>
                  <p className="text-gray-700">
                    Choose how you want the output formatted: <strong>lowercase</strong> for all small letters, <strong>UPPERCASE</strong> for all capital letters, or <strong>Title Case</strong> for capitalized first letters of each word. Note: Check Writing format automatically uses proper capitalization.
                  </p>
                </div>

                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    Step 4: Click Calculate
                  </h3>
                  <p className="text-gray-700">
                    Press the <strong>Calculate</strong> button to convert your number. The result appears instantly in the answer box on the right. The conversion is accurate and follows standard English number-to-word rules, including proper use of hyphens in compound numbers (e.g., "twenty-one").
                  </p>
                </div>

                <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                  <h3 className="font-bold text-[#1A3D7C] mb-2 text-lg">
                    Step 5: Copy Your Result
                  </h3>
                  <p className="text-gray-700">
                    Click the <strong>Copy</strong> button to automatically copy the converted text to your clipboard. You'll see a confirmation ("Copied") for 2 seconds. Paste the result directly into your document, check, invoice, or wherever you need the written form.
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
                <h3 className="font-bold text-[#1A3D7C] mb-3">Conversion Examples:</h3>
                <div className="space-y-2 text-gray-700">
                  <p>• <strong>100</strong> → Words: "one hundred" | Currency: "one hundred rupees only" | Check: "One hundred and 00/100"</p>
                  <p>• <strong>1,234.56</strong> → Words: "one thousand two hundred thirty-four point five six" | Currency: "one thousand two hundred thirty-four rupees and fifty-six paise only"</p>
                  <p>• <strong>1000000</strong> → "one million" (all formats handle large numbers perfectly)</p>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <Target className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Benefits of Using Numbers to Words Converter
              </h2>
              <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Error-Free Check Writing
                    </h3>
                    <p className="text-white/90">
                      Eliminate spelling mistakes when writing checks. Our converter ensures perfect accuracy with proper capitalization and the correct fraction format (e.g., "50/100"), preventing check rejection or fraud concerns.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Legal Document Compliance
                    </h3>
                    <p className="text-white/90">
                      Meet legal requirements for contracts, affidavits, and agreements where monetary amounts must be written in both numbers and words. Ensures consistency and prevents tampering or disputes over amounts.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Professional Invoicing
                    </h3>
                    <p className="text-white/90">
                      Create professional invoices and receipts with properly spelled-out amounts. Currency format adds "rupees and paise only" for clarity and completeness, meeting accounting and tax documentation standards.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Time-Saving Automation
                    </h3>
                    <p className="text-white/90">
                      Convert numbers instantly instead of manually writing them out. Perfect for accounting departments, legal firms, and businesses that process numerous financial documents daily, saving hours of work.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Educational Tool
                    </h3>
                    <p className="text-white/90">
                      Help students learn number spelling and place values (thousands, millions, billions). Teachers can use it to verify answers, and students can learn proper English number formatting rules.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Multiple Format Options
                    </h3>
                    <p className="text-white/90">
                      One tool, three formats! Switch between plain words, currency format, and check writing format instantly. Letter case options (lowercase, UPPERCASE, Title Case) adapt to any document style requirement.
                    </p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-[#FFC857] text-[#1A3D7C] rounded-lg">
                  <p className="font-semibold">
                    💡 Pro Tip: For checks, always use Title Case and Check Writing format to ensure bank acceptance. Double-check that written amount matches the numerical amount exactly!
                  </p>
                </div>
              </div>
            </section>

            {/* Common Use Cases */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                Real-World Use Cases
              </h2>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-orange-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    ✍️ Writing Bank Checks
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Scenario:</strong> You need to write a check for ₹12,550 to pay your contractor.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Solution:</strong> Enter 12550, select "Check Writing", get result: <em>"Twelve thousand five hundred fifty and 00/100"</em>
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    <strong>Benefit:</strong> Prevents spelling errors that could lead to check rejection
                  </p>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    📄 Legal Contract Drafting
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Scenario:</strong> A lawyer needs to write "Five Hundred Thousand Rupees" in a property sale agreement for ₹5,00,000.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Solution:</strong> Enter 500000, select "Currency" and "Title Case", get: <em>"Five Hundred Thousand Rupees Only"</em>
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    <strong>Benefit:</strong> Ensures legal compliance and prevents amount disputes
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    🧾 Business Invoice Generation
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Scenario:</strong> An accountant creates an invoice for ₹1,75,250.50 and needs the amount in words for GST compliance.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Solution:</strong> Enter 175250.50, select "Currency", get: <em>"one hundred seventy-five thousand two hundred fifty rupees and fifty paise only"</em>
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    <strong>Benefit:</strong> Meets tax invoice requirements with accurate spelled amounts
                  </p>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    🎓 Student Learning Aid
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Scenario:</strong> A Class 3 student needs to learn how to spell large numbers like 9,876,543.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Solution:</strong> Enter 9876543, select "Words" and "Title Case", learn: <em>"Nine Million Eight Hundred Seventy-Six Thousand Five Hundred Forty-Three"</em>
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    <strong>Benefit:</strong> Helps understand place values and proper English number spelling
                  </p>
                </div>
              </div>
            </section>

            {/* FAQs Section */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How do I convert numbers to words for check writing?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Enter your check amount (e.g., 1234.56), select <strong>"Check Writing"</strong> format, and click Calculate. The converter outputs proper check format like <em>"One thousand two hundred thirty-four and 56/100"</em>. This format is universally accepted by all banks for check processing.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    What's the difference between Words, Currency, and Check Writing formats?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    <strong>Words</strong> gives plain text (e.g., "one hundred"). <strong>Currency</strong> adds rupees/paise with "only" suffix (e.g., "one hundred rupees only"). <strong>Check Writing</strong> uses fraction format for cents/paise (e.g., "One hundred and 00/100"). Use Words for general text, Currency for invoices/receipts, and Check Writing specifically for bank checks.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Can I convert decimal numbers like 123.45?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Yes! For <strong>Words format</strong>, decimals convert as "point five four". For <strong>Currency format</strong>, it becomes "one hundred twenty-three rupees and forty-five paise". For <strong>Check Writing</strong>, it shows "One hundred twenty-three and 45/100". The converter handles up to 2 decimal places for currency.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    What's the maximum number I can convert?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Our converter supports numbers up to <strong>999,999,999,999</strong> (999 billion). This covers virtually all practical use cases from personal checks to large business contracts. Numbers are converted with proper place value notation including thousands, millions, and billions.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    When should I use Title Case vs UPPERCASE vs lowercase?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Use <strong>Title Case</strong> for formal business documents and legal contracts. Use <strong>lowercase</strong> for casual writing or when matching document style. Use <strong>UPPERCASE</strong> for emphasis or when required by specific forms. Note: Check Writing format automatically uses proper capitalization (first letter uppercase) regardless of your selection.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Is this converter accurate for legal and financial documents?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Yes, our converter follows <strong>standard English number-to-word rules</strong> and proper formatting conventions. It correctly handles hyphens in compound numbers (e.g., "twenty-one"), place values, and currency formatting. However, always double-check important documents and consult with legal/financial advisors for critical transactions.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How do I spell out numbers in Indian numbering system vs International?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Our converter uses the <strong>International numbering system</strong> (thousands, millions, billions) which is standard for English. For example, 100000 = "one hundred thousand" (not "one lakh"). This format is universally accepted in international business, banking, and legal documents.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Can I use this for writing demand drafts (DD)?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Absolutely! Use the <strong>Currency format</strong> for demand drafts. Enter the DD amount, select "Currency" and "Title Case", and you'll get the proper format: "Five Thousand Rupees Only". Banks accept this format for DDs, pay orders, and banker's checks.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Does the converter work on mobile devices?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Yes! Our converter is <strong>fully mobile-responsive</strong> and works perfectly on smartphones and tablets. You can convert numbers and copy results directly from your mobile browser. No app download required—just bookmark this page for quick access anytime.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How do I spell zero or negative numbers?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Zero converts to <strong>"zero"</strong> in all formats. Negative numbers are currently not supported as they're rarely used in checks and formal financial documents. For negative amounts in documents, manually add "minus" or "negative" before the converted positive number.
                  </p>
                </div>
              </div>
            </section>

            {/* Smart Tips Section */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Smart Tips for Converting Numbers to Words
              </h2>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl border border-gray-200">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Double-check check amounts:</strong> When writing checks, verify that the numerical amount (₹1,234.00) exactly matches the written amount ("One thousand two hundred thirty-four and 00/100"). Mismatches can lead to check rejection or payment delays.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Use "only" for invoices:</strong> Always use Currency format with "only" suffix for invoices, receipts, and payment documents. This adds legal clarity and prevents amount tampering (e.g., "Five hundred rupees only" can't be modified to "Five hundred fifty rupees only").
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Capitalize properly for legal documents:</strong> Legal contracts and agreements typically require Title Case for amounts (e.g., "Two Million Five Hundred Thousand"). This adds formality and makes the document look professional. Always use Title Case for official paperwork.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Round cents/paise for clarity:</strong> When possible, round invoice amounts to whole numbers to avoid confusion. However, if decimals are necessary, always specify both: "₹1,234.50" written as "One thousand two hundred thirty-four rupees and fifty paise only".
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Use Copy feature wisely:</strong> After converting, use the Copy button to paste directly into your document. This eliminates manual typing errors. For checks, paste into the memo field or use it as reference to write neatly on the check's amount line.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Know place value conventions:</strong> Our converter uses International system (thousand, million, billion). If you work with Indian numbering (lakh, crore), remember: 1 lakh = 100 thousand, 1 crore = 10 million. Convert mentally if needed for local context.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Practice check writing:</strong> Before writing a real check, practice with this converter. Enter various amounts and see how they should be written. This builds confidence and prevents costly mistakes when writing actual payment checks.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Save commonly used amounts:</strong> If you frequently write checks or invoices for standard amounts (like ₹5,000 or ₹10,000), convert them once and save the text in a document. This saves time for recurring transactions and ensures consistency.
                    </p>
                  </li>
                </ul>
              </div>
            </section>

            {/* Number Spelling Reference */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                Quick Number Spelling Reference
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
                      <th className="border border-gray-300 p-3 text-left">Number</th>
                      <th className="border border-gray-300 p-3 text-left">Words Format</th>
                      <th className="border border-gray-300 p-3 text-left">Currency Format</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">10</td>
                      <td className="border border-gray-300 p-3">ten</td>
                      <td className="border border-gray-300 p-3">ten rupees only</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">100</td>
                      <td className="border border-gray-300 p-3">one hundred</td>
                      <td className="border border-gray-300 p-3">one hundred rupees only</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">1,000</td>
                      <td className="border border-gray-300 p-3">one thousand</td>
                      <td className="border border-gray-300 p-3">one thousand rupees only</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">10,000</td>
                      <td className="border border-gray-300 p-3">ten thousand</td>
                      <td className="border border-gray-300 p-3">ten thousand rupees only</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">100,000</td>
                      <td className="border border-gray-300 p-3">one hundred thousand (1 lakh)</td>
                      <td className="border border-gray-300 p-3">one hundred thousand rupees only</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">1,000,000</td>
                      <td className="border border-gray-300 p-3">one million (10 lakhs)</td>
                      <td className="border border-gray-300 p-3">one million rupees only</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">10,000,000</td>
                      <td className="border border-gray-300 p-3">ten million (1 crore)</td>
                      <td className="border border-gray-300 p-3">ten million rupees only</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">1,000,000,000</td>
                      <td className="border border-gray-300 p-3">one billion (100 crores)</td>
                      <td className="border border-gray-300 p-3">one billion rupees only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Hyphen Rule:</strong> Use hyphens for compound numbers from 21-99 (e.g., twenty-one, thirty-five, ninety-nine). Numbers like 100, 1000, etc. don't use hyphens.
                </p>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-xl md:rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Explore More Calculators
              </h2>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Check out our financial calculators for SIP, EMI, salary, hours, and more
              </p>
              <Link href="/calculators">
                <Button className="bg-white text-[#1A3D7C] hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
                  View All Calculators
                </Button>
              </Link>
            </section>

            {/* Book Your Session CTA */}
            <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center text-white">
                  <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
                  <h2 className="text-2xl md:text-4xl font-bold mb-4">
                    Need Help with Number Systems?
                  </h2>
                  <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                    Our expert tutors can help you understand number systems, place values, and excel in mathematics. Get personalized one-on-one guidance tailored to your learning style.
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
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#1A3D7C] text-white py-8 md:py-12 mt-12 md:mt-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">The Tutor Bridge</h3>
                <p className="text-white/80 text-sm">
                  Your trusted partner for number conversion and financial calculations.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/calculators" className="text-white/80 hover:text-white transition-colors">
                      All Calculators
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-white/80 hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Disclaimer</h3>
                <p className="text-white/80 text-sm">
                  This converter provides accurate number-to-word conversions for reference. Always verify critical financial and legal documents with professionals.
                </p>
              </div>
            </div>
            <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
              <p>&copy; 2025 The Tutor Bridge. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
