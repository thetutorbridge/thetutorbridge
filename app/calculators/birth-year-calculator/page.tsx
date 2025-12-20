'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calculator, RotateCcw, Calendar, Cake, Info, Gift } from 'lucide-react';
import Link from 'next/link';

type CalculationMode = 'age-to-year' | 'year-to-age';
type BirthdayStatus = 'before' | 'after';

export default function BirthYearCalculatorPage() {
  // Input states
  const [mode, setMode] = useState<CalculationMode>('age-to-year');
  const [referenceDate, setReferenceDate] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [birthYear, setBirthYear] = useState<string>('');
  const [birthdayStatus, setBirthdayStatus] = useState<BirthdayStatus>('after');

  // Result states
  const [calculatedBirthYear, setCalculatedBirthYear] = useState<number | null>(null);
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null);
  const [generation, setGeneration] = useState<string>('');
  const [chineseZodiac, setChineseZodiac] = useState<string>('');

  // Set default reference date to today
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setReferenceDate(formattedDate);
  }, []);

  const getGeneration = (year: number): string => {
    if (year >= 2013) return 'Generation Alpha (2013-present)';
    if (year >= 1997) return 'Generation Z (1997-2012)';
    if (year >= 1981) return 'Millennials / Gen Y (1981-1996)';
    if (year >= 1965) return 'Generation X (1965-1980)';
    if (year >= 1946) return 'Baby Boomers (1946-1964)';
    if (year >= 1928) return 'Silent Generation (1928-1945)';
    if (year >= 1901) return 'Greatest Generation (1901-1927)';
    return 'Lost Generation (before 1901)';
  };

  const getChineseZodiac = (year: number): string => {
    const zodiacAnimals = [
      'Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox',
      'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat'
    ];
    const zodiacEmojis: Record<string, string> = {
      'Monkey': '🐵', 'Rooster': '🐓', 'Dog': '🐕', 'Pig': '🐷',
      'Rat': '🐀', 'Ox': '🐂', 'Tiger': '🐅', 'Rabbit': '🐇',
      'Dragon': '🐉', 'Snake': '🐍', 'Horse': '🐴', 'Goat': '🐐'
    };
    const animal = zodiacAnimals[year % 12];
    return `${zodiacEmojis[animal]} ${animal}`;
  };

  const calculateBirthYear = () => {
    const refDate = new Date(referenceDate);
    const ageNum = parseInt(age);

    if (isNaN(ageNum) || ageNum < 0 || !referenceDate) {
      setCalculatedBirthYear(null);
      return;
    }

    const refYear = refDate.getFullYear();
    let calculatedYear = refYear - ageNum;

    // Adjust based on whether birthday has passed
    if (birthdayStatus === 'before') {
      calculatedYear -= 1;
    }

    setCalculatedBirthYear(calculatedYear);
    setGeneration(getGeneration(calculatedYear));
    setChineseZodiac(getChineseZodiac(calculatedYear));
  };

  const calculateAge = () => {
    const refDate = new Date(referenceDate);
    const birthYearNum = parseInt(birthYear);

    if (isNaN(birthYearNum) || birthYearNum < 0 || !referenceDate) {
      setCalculatedAge(null);
      return;
    }

    const refYear = refDate.getFullYear();
    let calculatedAgeNum = refYear - birthYearNum;

    // Adjust based on whether birthday has passed
    if (birthdayStatus === 'before') {
      calculatedAgeNum -= 1;
    }

    if (calculatedAgeNum < 0) {
      setCalculatedAge(null);
      return;
    }

    setCalculatedAge(calculatedAgeNum);
    setGeneration(getGeneration(birthYearNum));
    setChineseZodiac(getChineseZodiac(birthYearNum));
  };

  useEffect(() => {
    if (mode === 'age-to-year' && age) {
      calculateBirthYear();
    } else if (mode === 'year-to-age' && birthYear) {
      calculateAge();
    }
  }, [referenceDate, age, birthYear, birthdayStatus, mode]);

  const handleReset = () => {
    const today = new Date();
    setReferenceDate(today.toISOString().split('T')[0]);
    setAge('');
    setBirthYear('');
    setBirthdayStatus('after');
    setCalculatedBirthYear(null);
    setCalculatedAge(null);
    setGeneration('');
    setChineseZodiac('');
  };

  // Quick age presets
  const agePresets = [10, 18, 21, 25, 30, 40, 50, 65];

  // Historical events for birth years
  const getHistoricalContext = (year: number): string[] => {
    const events: string[] = [];

    if (year >= 2020) events.push('Born during the COVID-19 pandemic era');
    else if (year >= 2010) events.push('Born in the smartphone era');
    else if (year >= 2000) events.push('Born in the new millennium');
    else if (year >= 1990) events.push('Born during the rise of the internet');
    else if (year >= 1980) events.push('Born during the personal computer revolution');
    else if (year >= 1970) events.push('Born during the Space Age');
    else if (year >= 1960) events.push('Born during the Civil Rights era');
    else if (year >= 1950) events.push('Born during the post-war boom');
    else if (year >= 1940) events.push('Born during World War II');

    return events;
  };

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Birth Year Calculator',
    description: 'Free birth year calculator to find birth year from age or calculate age from birth year. Includes generation info and Chinese zodiac sign.',
    url: 'https://www.thetutorbridge.com/calculators/birth-year-calculator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'The Tutor Bridge',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I calculate birth year from age?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To calculate birth year from age, subtract the age from the current year. If the birthday hasn\'t occurred yet this year, subtract an additional year. For example, if someone is 25 in 2024 and their birthday is after today, they were born in 1999. If their birthday has passed, they were born in 1999.',
        },
      },
      {
        '@type': 'Question',
        name: 'What year was I born if I am a certain age?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the formula: Birth Year = Current Year - Age. Adjust by subtracting 1 if your birthday hasn\'t occurred yet this year. For example, if you\'re 30 in 2024 and your birthday has passed, you were born in 1994.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does birthday timing matter for birth year calculation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Birthday timing matters because your age changes on your birthday. If your birthday hasn\'t occurred yet this year, you\'re technically still the age you were last year for calculation purposes, which affects the birth year result.',
        },
      },
      {
        '@type': 'Question',
        name: 'What generation am I based on my birth year?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Generations are: Gen Alpha (2013+), Gen Z (1997-2012), Millennials (1981-1996), Gen X (1965-1980), Baby Boomers (1946-1964), Silent Generation (1928-1945), and Greatest Generation (1901-1927).',
        },
      },
    ],
  };

  const resultYear = mode === 'age-to-year' ? calculatedBirthYear : parseInt(birthYear);
  const resultAge = mode === 'year-to-age' ? calculatedAge : parseInt(age);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-[#1A3D7C] to-[#2563eb]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                <Cake className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Birth Year Calculator
              </h1>
              <p className="text-lg md:text-xl text-blue-100">
                Calculate birth year from age or find age from birth year. Get your generation, Chinese zodiac sign, and more!
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Panel */}
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[#1A3D7C]" />
                    Calculate Birth Year
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset
                  </Button>
                </div>

                {/* Calculation Mode */}
                <div className="mb-6">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Calculation Mode
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setMode('age-to-year')}
                      className={`py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                        mode === 'age-to-year'
                          ? 'border-[#1A3D7C] bg-blue-50 text-[#1A3D7C]'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      Age → Birth Year
                    </button>
                    <button
                      onClick={() => setMode('year-to-age')}
                      className={`py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                        mode === 'year-to-age'
                          ? 'border-[#1A3D7C] bg-blue-50 text-[#1A3D7C]'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      Birth Year → Age
                    </button>
                  </div>
                </div>

                {/* Reference Date */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <Label className="text-sm font-medium text-gray-700">
                      On... (Reference Date)
                    </Label>
                  </div>
                  <Input
                    type="date"
                    value={referenceDate}
                    onChange={(e) => setReferenceDate(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    The date for which you want to calculate
                  </p>
                </div>

                {/* Age or Birth Year Input */}
                {mode === 'age-to-year' ? (
                  <div className="mb-6">
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Their age is...
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Enter age"
                        min="0"
                        max="150"
                        className="flex-1"
                      />
                      <span className="flex items-center px-3 bg-gray-100 rounded-lg text-gray-600 text-sm">
                        years
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {agePresets.map((presetAge) => (
                        <button
                          key={presetAge}
                          onClick={() => setAge(presetAge.toString())}
                          className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                        >
                          {presetAge} years
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Birth Year
                    </Label>
                    <Input
                      type="number"
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      placeholder="Enter birth year (e.g., 1990)"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                    <div className="flex flex-wrap gap-2 mt-3">
                      {[1960, 1970, 1980, 1990, 2000, 2010].map((year) => (
                        <button
                          key={year}
                          onClick={() => setBirthYear(year.toString())}
                          className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Birthday Status */}
                <div className="mb-6">
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    The chosen date is...
                  </Label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setBirthdayStatus('before')}
                      className={`w-full py-3 px-4 rounded-lg border-2 text-left transition-all flex items-center gap-3 ${
                        birthdayStatus === 'before'
                          ? 'border-[#1A3D7C] bg-blue-50 text-[#1A3D7C]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          birthdayStatus === 'before'
                            ? 'border-[#1A3D7C]'
                            : 'border-gray-300'
                        }`}
                      >
                        {birthdayStatus === 'before' && (
                          <div className="w-2 h-2 rounded-full bg-[#1A3D7C]" />
                        )}
                      </div>
                      <span>Before the birthday</span>
                    </button>
                    <button
                      onClick={() => setBirthdayStatus('after')}
                      className={`w-full py-3 px-4 rounded-lg border-2 text-left transition-all flex items-center gap-3 ${
                        birthdayStatus === 'after'
                          ? 'border-[#1A3D7C] bg-blue-50 text-[#1A3D7C]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          birthdayStatus === 'after'
                            ? 'border-[#1A3D7C]'
                            : 'border-gray-300'
                        }`}
                      >
                        {birthdayStatus === 'after' && (
                          <div className="w-2 h-2 rounded-full bg-[#1A3D7C]" />
                        )}
                      </div>
                      <span>After the birthday</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                    <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    This affects the calculation by ±1 year
                  </p>
                </div>
              </div>

              {/* Results Panel */}
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-[#2BAE66]" />
                  Results
                </h2>

                {((mode === 'age-to-year' && calculatedBirthYear) || (mode === 'year-to-age' && calculatedAge !== null)) ? (
                  <div className="space-y-6">
                    {/* Main Result */}
                    <div className="text-center p-6 bg-gradient-to-br from-[#1A3D7C]/5 to-[#2BAE66]/5 rounded-xl border-2 border-[#1A3D7C]/20">
                      {mode === 'age-to-year' ? (
                        <>
                          <p className="text-sm text-gray-600 mb-1">Birth Year</p>
                          <p className="text-5xl font-bold text-[#1A3D7C] mb-2">
                            {calculatedBirthYear}
                          </p>
                          <p className="text-gray-500">
                            A person who is {age} years old was born in {calculatedBirthYear}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm text-gray-600 mb-1">Age</p>
                          <p className="text-5xl font-bold text-[#1A3D7C] mb-2">
                            {calculatedAge} <span className="text-2xl">years</span>
                          </p>
                          <p className="text-gray-500">
                            A person born in {birthYear} is {calculatedAge} years old
                          </p>
                        </>
                      )}
                    </div>

                    {/* Calculation Explanation */}
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Calculator className="w-4 h-4" />
                        Calculation
                      </h4>
                      {mode === 'age-to-year' ? (
                        <p className="text-sm text-gray-600 font-mono bg-white p-2 rounded">
                          {new Date(referenceDate).getFullYear()} - {age} {birthdayStatus === 'before' ? '- 1' : ''} = {calculatedBirthYear}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-600 font-mono bg-white p-2 rounded">
                          {new Date(referenceDate).getFullYear()} - {birthYear} {birthdayStatus === 'before' ? '- 1' : ''} = {calculatedAge}
                        </p>
                      )}
                    </div>

                    {/* Generation */}
                    {generation && (
                      <div className="p-4 bg-purple-50 rounded-xl">
                        <h4 className="font-semibold text-gray-800 mb-2">🎭 Generation</h4>
                        <p className="text-purple-700 font-medium">{generation}</p>
                      </div>
                    )}

                    {/* Chinese Zodiac */}
                    {chineseZodiac && resultYear && (
                      <div className="p-4 bg-red-50 rounded-xl">
                        <h4 className="font-semibold text-gray-800 mb-2">Chinese Zodiac</h4>
                        <p className="text-red-700 font-medium text-lg">{chineseZodiac}</p>
                      </div>
                    )}

                    {/* Historical Context */}
                    {resultYear && getHistoricalContext(resultYear).length > 0 && (
                      <div className="p-4 bg-amber-50 rounded-xl">
                        <h4 className="font-semibold text-gray-800 mb-2">📜 Historical Context</h4>
                        <ul className="space-y-1">
                          {getHistoricalContext(resultYear).map((event, idx) => (
                            <li key={idx} className="text-sm text-amber-800">
                              • {event}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Age Milestones */}
                    {resultYear && (
                      <div className="p-4 bg-green-50 rounded-xl">
                        <h4 className="font-semibold text-gray-800 mb-3">🎯 Key Milestones</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-white p-2 rounded">
                            <p className="text-gray-500 text-xs">Turned 18</p>
                            <p className="font-semibold text-gray-800">{resultYear + 18}</p>
                          </div>
                          <div className="bg-white p-2 rounded">
                            <p className="text-gray-500 text-xs">Turned 21</p>
                            <p className="font-semibold text-gray-800">{resultYear + 21}</p>
                          </div>
                          <div className="bg-white p-2 rounded">
                            <p className="text-gray-500 text-xs">Turns/Turned 50</p>
                            <p className="font-semibold text-gray-800">{resultYear + 50}</p>
                          </div>
                          <div className="bg-white p-2 rounded">
                            <p className="text-gray-500 text-xs">Turns/Turned 65</p>
                            <p className="font-semibold text-gray-800">{resultYear + 65}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎂</div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Enter {mode === 'age-to-year' ? 'Age' : 'Birth Year'}
                    </h3>
                    <p className="text-gray-500">
                      {mode === 'age-to-year'
                        ? 'Enter an age to calculate the birth year'
                        : 'Enter a birth year to calculate the current age'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Age Reference Table */}
            <div className="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Quick Age to Birth Year Reference
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Age</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Birth Year</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Generation</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Chinese Zodiac</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[5, 10, 15, 18, 21, 25, 30, 35, 40, 45, 50, 60, 70, 80].map((ageVal) => {
                      const currentYear = new Date().getFullYear();
                      const birthYearVal = currentYear - ageVal;
                      return (
                        <tr key={ageVal} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{ageVal} years</td>
                          <td className="py-3 px-4 text-center font-semibold text-[#1A3D7C]">{birthYearVal}</td>
                          <td className="py-3 px-4 text-center text-xs">{getGeneration(birthYearVal).split('(')[0].trim()}</td>
                          <td className="py-3 px-4 text-center">{getChineseZodiac(birthYearVal)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 text-center mt-4">
                * Based on current year ({new Date().getFullYear()}) assuming birthday has passed
              </p>
            </div>
          </div>
        </section>

        {/* Educational Content */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              How to Calculate Birth Year
            </h2>

            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">
                  The Birth Year Formula
                </h3>
                <p className="text-gray-700 mb-4">
                  Calculating birth year from age is straightforward, but requires consideration of whether the birthday has occurred:
                </p>
                <div className="p-4 bg-blue-50 rounded-lg mb-4">
                  <p className="font-mono text-center text-lg font-semibold text-[#1A3D7C]">
                    Birth Year = Current Year - Age
                  </p>
                </div>
                <p className="text-gray-700">
                  <strong>Important adjustment:</strong> If the birthday hasn&apos;t occurred yet this year, subtract an additional year from the result.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">
                  Why Birthday Timing Matters
                </h3>
                <p className="text-gray-700 mb-4">
                  The &quot;before or after birthday&quot; option is crucial because:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">After Birthday</h4>
                    <p className="text-gray-700 text-sm">
                      If someone&apos;s birthday has already passed this year, they&apos;ve already &quot;turned&quot; their current age, so we use the simple formula.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Before Birthday</h4>
                    <p className="text-gray-700 text-sm">
                      If the birthday is still coming, they were born one year earlier than the simple calculation suggests, so we subtract an additional year.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">
                  Example Calculations
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Example 1: Birthday has passed</h4>
                    <p className="text-gray-700 text-sm">
                      Someone is 30 years old in 2024 and their birthday was in March (it&apos;s now November).<br/>
                      <span className="font-mono">2024 - 30 = 1994</span><br/>
                      <strong>Birth Year: 1994</strong>
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Example 2: Birthday hasn&apos;t passed</h4>
                    <p className="text-gray-700 text-sm">
                      Someone is 30 years old in 2024 and their birthday is in December (it&apos;s now November).<br/>
                      <span className="font-mono">2024 - 30 - 1 = 1993</span><br/>
                      <strong>Birth Year: 1993</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">
                  Generation Guide
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Generation Alpha', years: '2013 - Present', traits: 'Digital natives, AI era' },
                    { name: 'Generation Z', years: '1997 - 2012', traits: 'Social media, smartphones' },
                    { name: 'Millennials (Gen Y)', years: '1981 - 1996', traits: 'Internet, digital pioneers' },
                    { name: 'Generation X', years: '1965 - 1980', traits: 'Latchkey kids, MTV generation' },
                    { name: 'Baby Boomers', years: '1946 - 1964', traits: 'Post-war prosperity' },
                    { name: 'Silent Generation', years: '1928 - 1945', traits: 'Great Depression, WWII' },
                  ].map((gen) => (
                    <div key={gen.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-800">{gen.name}</p>
                        <p className="text-xs text-gray-500">{gen.traits}</p>
                      </div>
                      <span className="text-sm text-[#1A3D7C] font-medium">{gen.years}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'How do I calculate birth year from age?',
                  a: 'Subtract the age from the current year. If the birthday hasn\'t occurred yet this year, subtract an additional year. For example: In 2024, a 25-year-old (birthday passed) was born in 1999.',
                },
                {
                  q: 'What year was I born if I am 30?',
                  a: 'If you\'re 30 in 2024 and your birthday has passed, you were born in 1994. If your birthday hasn\'t occurred yet, you were born in 1993.',
                },
                {
                  q: 'Why is the birthday timing important?',
                  a: 'Because your age increases by one on your birthday each year. Before your birthday, you\'re technically still the age you were last year, which means you were born one year earlier.',
                },
                {
                  q: 'How can I find someone\'s birth year if I only know their age?',
                  a: 'Use our calculator or the formula: Current Year - Age = Birth Year. Remember to subtract 1 more year if their birthday hasn\'t happened yet this year.',
                },
                {
                  q: 'What generation am I?',
                  a: 'Generations are defined by birth year ranges: Gen Alpha (2013+), Gen Z (1997-2012), Millennials (1981-1996), Gen X (1965-1980), Baby Boomers (1946-1964), Silent Generation (1928-1945).',
                },
                {
                  q: 'Can I calculate age from birth year?',
                  a: 'Yes! Simply use the reverse formula: Current Year - Birth Year = Age. Subtract 1 if the birthday hasn\'t occurred yet this year.',
                },
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Book Your Session CTA */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-[#1A3D7C] to-[#2563eb]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Need Help with Math Concepts?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Our expert tutors can help you understand mathematical concepts, from basic arithmetic to advanced calculations. Book a personalized session today!
            </p>
            <Link href="/tutoring/free-consultation">
              <Button size="lg" className="bg-[#FFC857] hover:bg-[#ffb627] text-gray-900 font-semibold px-8">
                Book Your Session
              </Button>
            </Link>
          </div>
        </section>

        {/* Related Calculators */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Related Calculators
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/calculators/age-calculator"
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <h3 className="font-semibold text-[#1A3D7C] mb-1">Age Calculator</h3>
                <p className="text-sm text-gray-600">Calculate exact age in years, months, days</p>
              </Link>
              <Link
                href="/calculators/date-calculator"
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <h3 className="font-semibold text-[#1A3D7C] mb-1">Date Calculator</h3>
                <p className="text-sm text-gray-600">Add or subtract days from a date</p>
              </Link>
              <Link
                href="/calculators/time-until-calculator"
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <h3 className="font-semibold text-[#1A3D7C] mb-1">Time Until Calculator</h3>
                <p className="text-sm text-gray-600">Calculate time until a future date</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
