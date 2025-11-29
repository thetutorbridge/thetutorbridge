'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, RotateCcw, Dog, Info, BookOpen, GraduationCap, Scale, Ruler, TrendingUp } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

type AgeUnit = 'weeks' | 'months';
type WeightUnit = 'kg' | 'lbs';

interface Results {
  adultWeightKg: number;
  adultWeightLbs: number;
  sizeCategory: string;
  estimatedHeight: string;
  growthPercentage: number;
}

interface DogSizeInfo {
  category: string;
  weightRange: string;
  heightRange: string;
  maturityAge: string;
  examples: string[];
  color: string;
  bgColor: string;
}

export default function DogSizeCalculator() {
  const [puppyAge, setPuppyAge] = useState<string>('');
  const [ageUnit, setAgeUnit] = useState<AgeUnit>('weeks');
  const [currentWeight, setCurrentWeight] = useState<string>('');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [results, setResults] = useState<Results | null>(null);

  // Dog size categories
  const sizeCategories: DogSizeInfo[] = [
    {
      category: 'Toy',
      weightRange: '< 5 kg (11 lbs)',
      heightRange: '< 25 cm (10 in)',
      maturityAge: '8-10 months',
      examples: ['Chihuahua', 'Yorkshire Terrier', 'Pomeranian', 'Maltese'],
      color: 'text-pink-700',
      bgColor: 'bg-pink-50 border-pink-200',
    },
    {
      category: 'Small',
      weightRange: '5-10 kg (11-22 lbs)',
      heightRange: '25-40 cm (10-16 in)',
      maturityAge: '10-12 months',
      examples: ['French Bulldog', 'Beagle', 'Dachshund', 'Shih Tzu'],
      color: 'text-purple-700',
      bgColor: 'bg-purple-50 border-purple-200',
    },
    {
      category: 'Medium',
      weightRange: '10-25 kg (22-55 lbs)',
      heightRange: '40-55 cm (16-22 in)',
      maturityAge: '12-15 months',
      examples: ['Border Collie', 'Cocker Spaniel', 'Bulldog', 'Australian Shepherd'],
      color: 'text-blue-700',
      bgColor: 'bg-blue-50 border-blue-200',
    },
    {
      category: 'Large',
      weightRange: '25-45 kg (55-100 lbs)',
      heightRange: '55-70 cm (22-28 in)',
      maturityAge: '15-18 months',
      examples: ['Labrador Retriever', 'Golden Retriever', 'German Shepherd', 'Boxer'],
      color: 'text-green-700',
      bgColor: 'bg-green-50 border-green-200',
    },
    {
      category: 'Giant',
      weightRange: '> 45 kg (100 lbs)',
      heightRange: '> 70 cm (28 in)',
      maturityAge: '18-24 months',
      examples: ['Great Dane', 'Saint Bernard', 'Mastiff', 'Newfoundland'],
      color: 'text-orange-700',
      bgColor: 'bg-orange-50 border-orange-200',
    },
  ];

  // Growth rate by age (percentage of adult weight typically reached)
  const getGrowthPercentage = (ageWeeks: number): number => {
    if (ageWeeks <= 8) return 20 + (ageWeeks * 2);
    if (ageWeeks <= 16) return 35 + ((ageWeeks - 8) * 3);
    if (ageWeeks <= 26) return 60 + ((ageWeeks - 16) * 2);
    if (ageWeeks <= 52) return 80 + ((ageWeeks - 26) * 0.75);
    return 100;
  };

  // Get size category based on weight
  const getSizeCategory = (weightKg: number): string => {
    if (weightKg < 5) return 'Toy';
    if (weightKg < 10) return 'Small';
    if (weightKg < 25) return 'Medium';
    if (weightKg < 45) return 'Large';
    return 'Giant';
  };

  // Estimate height based on weight (rough approximation)
  const estimateHeight = (weightKg: number): string => {
    if (weightKg < 5) return '15-25 cm (6-10 in)';
    if (weightKg < 10) return '25-40 cm (10-16 in)';
    if (weightKg < 25) return '40-55 cm (16-22 in)';
    if (weightKg < 45) return '55-70 cm (22-28 in)';
    return '70-90 cm (28-35 in)';
  };

  // Calculate results
  useEffect(() => {
    let ageWeeks = parseFloat(puppyAge);
    const weight = parseFloat(currentWeight);

    if (isNaN(ageWeeks) || isNaN(weight) || ageWeeks <= 0 || weight <= 0) {
      setResults(null);
      return;
    }

    // Convert months to weeks if needed
    if (ageUnit === 'months') {
      ageWeeks = ageWeeks * 4.33;
    }

    // Convert weight to kg if in lbs
    let weightKg = weight;
    if (weightUnit === 'lbs') {
      weightKg = weight * 0.453592;
    }

    // Calculate adult weight using formula: (Puppy weight / Puppy age in weeks) × 52
    const adultWeightKg = (weightKg / ageWeeks) * 52;
    const adultWeightLbs = adultWeightKg * 2.20462;

    // Get growth percentage for current age
    const growthPercentage = getGrowthPercentage(ageWeeks);

    setResults({
      adultWeightKg,
      adultWeightLbs,
      sizeCategory: getSizeCategory(adultWeightKg),
      estimatedHeight: estimateHeight(adultWeightKg),
      growthPercentage: Math.min(growthPercentage, 100),
    });
  }, [puppyAge, ageUnit, currentWeight, weightUnit]);

  const handleReset = () => {
    setPuppyAge('');
    setCurrentWeight('');
    setAgeUnit('weeks');
    setWeightUnit('kg');
    setResults(null);
  };

  const formatNumber = (num: number, decimals: number = 1): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: decimals });
  };

  // Quick age presets
  const agePresets = [
    { value: 8, unit: 'weeks' as AgeUnit, label: '8 weeks' },
    { value: 12, unit: 'weeks' as AgeUnit, label: '12 weeks' },
    { value: 16, unit: 'weeks' as AgeUnit, label: '16 weeks' },
    { value: 6, unit: 'months' as AgeUnit, label: '6 months' },
    { value: 9, unit: 'months' as AgeUnit, label: '9 months' },
    { value: 12, unit: 'months' as AgeUnit, label: '12 months' },
  ];

  // Growth milestones
  const growthMilestones = [
    { age: '8 weeks', percentage: '20-25%', description: 'Puppy leaves breeder, rapid growth begins' },
    { age: '3-4 months', percentage: '40-50%', description: 'Teething begins, still growing rapidly' },
    { age: '6 months', percentage: '60-70%', description: 'Growth slows, adult teeth come in' },
    { age: '9-12 months', percentage: '80-90%', description: 'Small breeds near adult size' },
    { age: '12-18 months', percentage: '90-100%', description: 'Medium/large breeds reach adult size' },
    { age: '18-24 months', percentage: '100%', description: 'Giant breeds finish growing' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm py-3 px-4 sm:px-6 shadow-sm">
        <div className="container mx-auto max-w-4xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/calculators" className="text-blue-600 hover:text-blue-800">
              Calculators
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Dog Size Calculator</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
              <Dog className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Dog Size Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Predict your puppy&apos;s adult weight and size category. Enter your puppy&apos;s current age and weight to estimate how big they&apos;ll grow.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
          {/* Puppy Age Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your puppy&apos;s age
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={puppyAge}
                onChange={(e) => setPuppyAge(e.target.value)}
                placeholder="Enter age"
                min="1"
                step="1"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg transition-all"
              />
              <select
                value={ageUnit}
                onChange={(e) => setAgeUnit(e.target.value as AgeUnit)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-700 font-medium"
              >
                <option value="weeks">wks</option>
                <option value="months">mos</option>
              </select>
            </div>
            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2 mt-3">
              {agePresets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setPuppyAge(preset.value.toString());
                    setAgeUnit(preset.unit);
                  }}
                  className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-700 rounded-lg transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Weight Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              Weight
              <span className="ml-2 text-gray-400 cursor-help" title="Current weight of your puppy">
                <Info className="w-4 h-4" />
              </span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
                placeholder="Enter weight"
                min="0.1"
                step="0.1"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg transition-all"
              />
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value as WeightUnit)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-700 font-medium"
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
          </div>

          {/* Results */}
          {results && (
            <div className="space-y-4 mb-6">
              {/* Adult Weight Result */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-amber-700 font-medium mb-1">Predicted Adult Weight</p>
                    <p className="text-3xl font-bold text-amber-800">
                      {formatNumber(results.adultWeightKg)} kg
                    </p>
                    <p className="text-lg text-amber-600">
                      ({formatNumber(results.adultWeightLbs)} lbs)
                    </p>
                  </div>
                  <div className="text-right">
                    <Scale className="w-12 h-12 text-amber-400" />
                  </div>
                </div>

                {/* Size Category Badge */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Size Category:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    sizeCategories.find(s => s.category === results.sizeCategory)?.bgColor
                  } ${
                    sizeCategories.find(s => s.category === results.sizeCategory)?.color
                  }`}>
                    {results.sizeCategory}
                  </span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center mb-2">
                    <Ruler className="w-5 h-5 text-blue-600 mr-2" />
                    <p className="text-sm text-blue-700 font-medium">Estimated Height</p>
                  </div>
                  <p className="text-lg font-bold text-blue-800">{results.estimatedHeight}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                    <p className="text-sm text-green-700 font-medium">Current Growth</p>
                  </div>
                  <p className="text-lg font-bold text-green-800">{formatNumber(results.growthPercentage, 0)}% of adult size</p>
                  {/* Progress Bar */}
                  <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${results.growthPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reset Button */}
          <div className="flex justify-center">
            <button
              onClick={handleReset}
              className="flex items-center px-6 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear all changes
            </button>
          </div>
        </div>

        {/* Formula Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-amber-600" />
            How We Calculate Adult Dog Weight
          </h2>
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200 mb-4">
            <h3 className="font-semibold text-amber-800 mb-2">The Formula</h3>
            <div className="bg-white rounded-lg p-4 font-mono text-center text-lg mb-3">
              Adult Weight = (Puppy Weight ÷ Age in Weeks) × 52
            </div>
            <p className="text-sm text-amber-700">
              This formula estimates adult weight by calculating the weekly growth rate and projecting it over a full year (52 weeks).
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Example Calculation</h3>
            <p className="text-blue-700 text-sm">
              A puppy weighing <strong>4 kg at 12 weeks</strong>:<br />
              Adult Weight = (4 ÷ 12) × 52 = <strong>17.3 kg</strong> (approximately 38 lbs)
            </p>
          </div>
        </div>

        {/* Dog Size Categories */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Dog className="w-5 h-5 mr-2 text-amber-600" />
            Dog Size Categories
          </h2>
          <div className="space-y-4">
            {sizeCategories.map((size) => (
              <div key={size.category} className={`rounded-xl p-4 border ${size.bgColor}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className={`font-bold text-lg ${size.color}`}>{size.category}</h3>
                  <span className="text-sm text-gray-600">
                    Mature at: {size.maturityAge}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-2">
                  <p><strong>Weight:</strong> {size.weightRange}</p>
                  <p><strong>Height:</strong> {size.heightRange}</p>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Examples:</strong> {size.examples.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Milestones */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-amber-600" />
            Puppy Growth Milestones
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Age</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">% of Adult Size</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">What&apos;s Happening</th>
                </tr>
              </thead>
              <tbody>
                {growthMilestones.map((milestone, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium text-amber-700">{milestone.age}</td>
                    <td className="py-3 px-2 text-gray-800">{milestone.percentage}</td>
                    <td className="py-3 px-2 text-gray-600">{milestone.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2 text-amber-600" />
            Important Notes
          </h2>

          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Estimation Accuracy</h3>
              <p className="text-yellow-700 text-sm">
                This calculator provides an estimate based on average growth patterns. Actual adult size can vary
                by 10-20% depending on breed, genetics, nutrition, and health factors. Mixed breed dogs may show
                more variation than purebreds.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Best Age for Prediction</h3>
              <p className="text-blue-700 text-sm">
                The most accurate predictions are made when puppies are between 8-16 weeks old. Very young puppies
                (under 8 weeks) or older dogs may give less accurate results.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h3 className="font-semibold text-green-800 mb-2">Growth Rate Variations</h3>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• <strong>Toy/Small breeds:</strong> Reach adult size fastest (8-12 months)</li>
                <li>• <strong>Medium breeds:</strong> Mature around 12-15 months</li>
                <li>• <strong>Large breeds:</strong> Continue growing until 15-18 months</li>
                <li>• <strong>Giant breeds:</strong> May grow until 18-24 months</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-amber-600" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How accurate is the dog size prediction?</h3>
              <p className="text-gray-600">
                The prediction is generally accurate within 10-20% for purebred dogs. Mixed breed puppies
                may vary more. The formula works best for puppies between 8-16 weeks old when growth patterns
                are most consistent.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">When do dogs stop growing?</h3>
              <p className="text-gray-600">
                It depends on the breed size. Toy and small breeds typically reach adult size by 10-12 months.
                Medium breeds mature around 12-15 months. Large breeds take 15-18 months, and giant breeds
                like Great Danes may continue growing until 18-24 months.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can nutrition affect my dog&apos;s adult size?</h3>
              <p className="text-gray-600">
                Yes, nutrition plays a crucial role. Proper nutrition supports healthy growth, while
                underfeeding can stunt growth and overfeeding can lead to obesity or orthopedic problems
                in large breed puppies. Always follow veterinary guidance for your puppy&apos;s diet.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Is paw size a good predictor of adult size?</h3>
              <p className="text-gray-600">
                Paw size can give a rough indication—puppies with larger paws often grow into bigger dogs.
                However, it&apos;s not a precise measurement. The weight-based formula provides a more
                reliable estimate of adult size.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Why does my puppy&apos;s predicted size seem too big/small?</h3>
              <p className="text-gray-600">
                Several factors can affect this: the puppy may be over or underweight for their age,
                they might be from particularly large or small parents, or they could be a mixed breed
                with unpredictable growth patterns. If concerned, consult your veterinarian.
              </p>
            </div>
          </div>
        </div>

        {/* Related Calculators */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg border border-amber-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/calculators/bmi-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">BMI Calculator</h3>
              <p className="text-sm text-gray-600">Calculate Body Mass Index for health assessment</p>
            </Link>
            <Link
              href="/calculators/calorie-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Calorie Calculator</h3>
              <p className="text-sm text-gray-600">Calculate daily calorie needs</p>
            </Link>
            <Link
              href="/calculators/age-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Age Calculator</h3>
              <p className="text-sm text-gray-600">Calculate age in years, months, and days</p>
            </Link>
            <Link
              href="/calculators/steps-to-calories-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Steps to Calories Calculator</h3>
              <p className="text-sm text-gray-600">Calculate calories burned from walking</p>
            </Link>
          </div>
        </div>

        {/* Book Your Session CTA */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2563eb] rounded-2xl shadow-xl p-6 sm:p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <GraduationCap className="w-12 h-12 text-[#FFC857] mr-4 flex-shrink-0" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Need Help with Biology or Science?</h2>
                <p className="text-blue-100">
                  Our expert tutors can help you understand animal biology, growth patterns, and life sciences.
                </p>
              </div>
            </div>
            <Link
              href="/book-demo-class"
              className="inline-flex items-center px-6 py-3 bg-[#FFC857] text-[#1A3D7C] font-bold rounded-xl hover:bg-yellow-400 transition-colors whitespace-nowrap"
            >
              Book Your Session
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Dog Size Calculator",
            "description": "Predict your puppy's adult weight and size category based on current age and weight.",
            "url": "https://thetutorbridge.com/calculators/dog-size-calculator",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "The Tutor Bridge"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How accurate is the dog size prediction?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The prediction is generally accurate within 10-20% for purebred dogs. Mixed breed puppies may vary more. The formula works best for puppies between 8-16 weeks old."
                }
              },
              {
                "@type": "Question",
                "name": "When do dogs stop growing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Toy and small breeds reach adult size by 10-12 months. Medium breeds mature around 12-15 months. Large breeds take 15-18 months, and giant breeds may continue growing until 18-24 months."
                }
              },
              {
                "@type": "Question",
                "name": "Can nutrition affect my dog's adult size?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, nutrition plays a crucial role. Proper nutrition supports healthy growth, while underfeeding can stunt growth and overfeeding can lead to obesity or orthopedic problems."
                }
              },
              {
                "@type": "Question",
                "name": "Is paw size a good predictor of adult size?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Paw size can give a rough indication—puppies with larger paws often grow into bigger dogs. However, the weight-based formula provides a more reliable estimate."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
