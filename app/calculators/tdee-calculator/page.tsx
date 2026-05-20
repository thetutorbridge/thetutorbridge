'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, Flame, Activity, Target, Scale, TrendingUp, TrendingDown, Minus, Home, HelpCircle, Lightbulb, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const activityLevels = [
  { value: '1.2', label: 'Sedentary', description: 'Little or no exercise, desk job' },
  { value: '1.375', label: 'Lightly Active', description: 'Light exercise 1-3 days/week' },
  { value: '1.55', label: 'Moderately Active', description: 'Moderate exercise 3-5 days/week' },
  { value: '1.725', label: 'Very Active', description: 'Hard exercise 6-7 days/week' },
  { value: '1.9', label: 'Extremely Active', description: 'Very hard exercise, physical job' },
];

export default function TDEECalculatorPage() {
  const [age, setAge] = useState<string>('25');
  const [gender, setGender] = useState<string>('male');
  const [weight, setWeight] = useState<string>('70');
  const [weightUnit, setWeightUnit] = useState<string>('kg');
  const [height, setHeight] = useState<string>('170');
  const [heightUnit, setHeightUnit] = useState<string>('cm');
  const [activityLevel, setActivityLevel] = useState<string>('1.55');
  const [formula, setFormula] = useState<string>('mifflin');

  const results = useMemo(() => {
    const ageNum = parseFloat(age) || 0;
    let weightKg = parseFloat(weight) || 0;
    let heightCm = parseFloat(height) || 0;
    const activity = parseFloat(activityLevel);

    // Convert units if needed
    if (weightUnit === 'lb') weightKg = weightKg * 0.453592;
    if (heightUnit === 'ft') heightCm = heightCm * 30.48;
    if (heightUnit === 'in') heightCm = heightCm * 2.54;

    if (ageNum <= 0 || weightKg <= 0 || heightCm <= 0) return null;

    let bmr = 0;

    // Calculate BMR based on selected formula
    if (formula === 'mifflin') {
      // Mifflin-St Jeor Equation (most accurate for most people)
      if (gender === 'male') {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * ageNum) + 5;
      } else {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * ageNum) - 161;
      }
    } else if (formula === 'harris') {
      // Harris-Benedict Equation (revised)
      if (gender === 'male') {
        bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * ageNum);
      } else {
        bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * ageNum);
      }
    } else {
      // Katch-McArdle (requires body fat %, using estimate)
      const leanMass = weightKg * 0.85; // Rough estimate
      bmr = 370 + (21.6 * leanMass);
    }

    const tdee = bmr * activity;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      mildLoss: Math.round(tdee - 250), // 0.25 kg/week
      weightLoss: Math.round(tdee - 500), // 0.5 kg/week
      extremeLoss: Math.round(tdee - 1000), // 1 kg/week
      mildGain: Math.round(tdee + 250),
      weightGain: Math.round(tdee + 500),
      extremeGain: Math.round(tdee + 1000),
    };
  }, [age, gender, weight, weightUnit, height, heightUnit, activityLevel, formula]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is TDEE?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'TDEE (Total Daily Energy Expenditure) is the total number of calories your body burns in a day, including your Basal Metabolic Rate (BMR) plus calories burned through physical activity and digestion. It represents your maintenance calories.'
                }
              },
              {
                '@type': 'Question',
                name: 'How is TDEE calculated?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'TDEE is calculated by first determining your BMR using formulas like Mifflin-St Jeor or Harris-Benedict, then multiplying by an activity factor (1.2 for sedentary to 1.9 for extremely active) based on your lifestyle and exercise habits.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is the difference between BMR and TDEE?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'BMR (Basal Metabolic Rate) is the calories your body burns at complete rest just to maintain vital functions. TDEE includes BMR plus all additional calories burned through daily activities, exercise, and digesting food.'
                }
              },
              {
                '@type': 'Question',
                name: 'How do I use TDEE for weight loss?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'To lose weight, eat fewer calories than your TDEE. A deficit of 500 calories per day results in about 0.5 kg (1 lb) weight loss per week. Never go below 1200 calories (women) or 1500 calories (men) without medical supervision.'
                }
              },
              {
                '@type': 'Question',
                name: 'Which TDEE formula is most accurate?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Mifflin-St Jeor equation is considered most accurate for the general population. However, all formulas are estimates. Track your actual weight changes over 2-3 weeks and adjust calories accordingly for personalized accuracy.'
                }
              }
            ]
          })
        }}
      />
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        {/* Breadcrumb */}
        <div className="bg-white/80 backdrop-blur-sm py-3 px-4 shadow-sm">
          <div className="max-w-6xl mx-auto">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-orange-600 hover:text-orange-800 flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/calculators" className="text-orange-600 hover:text-orange-800">Calculators</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 font-medium">TDEE Calculator</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Flame className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">TDEE Calculator</h1>
            </div>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Calculate your Total Daily Energy Expenditure to know exactly how many calories you burn each day. Perfect for weight loss, muscle gain, or maintenance goals.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-2 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-orange-600" />
                  Enter Your Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Age */}
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">Age</Label>
                    <Input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="h-12 text-lg"
                      min="1"
                      max="120"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">Gender</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Weight */}
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">Weight</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="h-12 text-lg flex-1"
                        min="1"
                      />
                      <Select value={weightUnit} onValueChange={setWeightUnit}>
                        <SelectTrigger className="w-20 h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="lb">lb</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Height */}
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">Height</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="h-12 text-lg flex-1"
                        min="1"
                      />
                      <Select value={heightUnit} onValueChange={setHeightUnit}>
                        <SelectTrigger className="w-20 h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cm">cm</SelectItem>
                          <SelectItem value="in">in</SelectItem>
                          <SelectItem value="ft">ft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Activity Level */}
                  <div className="md:col-span-2">
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">Activity Level</Label>
                    <Select value={activityLevel} onValueChange={setActivityLevel}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {activityLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label} - {level.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Formula */}
                  <div className="md:col-span-2">
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">Formula</Label>
                    <Select value={formula} onValueChange={setFormula}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mifflin">Mifflin-St Jeor (Recommended)</SelectItem>
                        <SelectItem value="harris">Harris-Benedict</SelectItem>
                        <SelectItem value="katch">Katch-McArdle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Calorie Goals Table */}
              {results && (
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Calorie Goals Based on Your TDEE</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-600">Goal</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-600">Daily Calories</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-600">Weekly Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 bg-red-50">
                          <td className="py-3 px-4 flex items-center"><TrendingDown className="w-4 h-4 mr-2 text-red-600" />Extreme Weight Loss</td>
                          <td className="py-3 px-4 text-right font-semibold text-red-600">{results.extremeLoss} cal</td>
                          <td className="py-3 px-4 text-right text-red-600">-1 kg/week</td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-orange-50">
                          <td className="py-3 px-4 flex items-center"><TrendingDown className="w-4 h-4 mr-2 text-orange-600" />Weight Loss</td>
                          <td className="py-3 px-4 text-right font-semibold text-orange-600">{results.weightLoss} cal</td>
                          <td className="py-3 px-4 text-right text-orange-600">-0.5 kg/week</td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-yellow-50">
                          <td className="py-3 px-4 flex items-center"><TrendingDown className="w-4 h-4 mr-2 text-yellow-600" />Mild Weight Loss</td>
                          <td className="py-3 px-4 text-right font-semibold text-yellow-600">{results.mildLoss} cal</td>
                          <td className="py-3 px-4 text-right text-yellow-600">-0.25 kg/week</td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-green-100">
                          <td className="py-3 px-4 flex items-center font-bold"><Minus className="w-4 h-4 mr-2 text-green-700" />Maintenance (TDEE)</td>
                          <td className="py-3 px-4 text-right font-bold text-green-700">{results.tdee} cal</td>
                          <td className="py-3 px-4 text-right text-green-700">0 kg/week</td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-blue-50">
                          <td className="py-3 px-4 flex items-center"><TrendingUp className="w-4 h-4 mr-2 text-blue-600" />Mild Weight Gain</td>
                          <td className="py-3 px-4 text-right font-semibold text-blue-600">{results.mildGain} cal</td>
                          <td className="py-3 px-4 text-right text-blue-600">+0.25 kg/week</td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-indigo-50">
                          <td className="py-3 px-4 flex items-center"><TrendingUp className="w-4 h-4 mr-2 text-indigo-600" />Weight Gain</td>
                          <td className="py-3 px-4 text-right font-semibold text-indigo-600">{results.weightGain} cal</td>
                          <td className="py-3 px-4 text-right text-indigo-600">+0.5 kg/week</td>
                        </tr>
                        <tr className="bg-purple-50">
                          <td className="py-3 px-4 flex items-center"><TrendingUp className="w-4 h-4 mr-2 text-purple-600" />Fast Weight Gain</td>
                          <td className="py-3 px-4 text-right font-semibold text-purple-600">{results.extremeGain} cal</td>
                          <td className="py-3 px-4 text-right text-purple-600">+1 kg/week</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-orange-600 to-red-600 text-white p-6 md:p-8 rounded-xl shadow-xl sticky top-4">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Flame className="w-6 h-6 mr-2" />
                  Your Results
                </h2>

                {results ? (
                  <div className="space-y-4">
                    <div className="bg-white/20 backdrop-blur-sm p-5 rounded-lg border-2 border-yellow-400">
                      <p className="text-sm text-orange-200 mb-1">Your TDEE</p>
                      <p className="text-4xl font-bold text-yellow-300">{results.tdee}</p>
                      <p className="text-sm text-orange-200">calories/day</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <p className="text-sm text-orange-200 mb-1">Basal Metabolic Rate (BMR)</p>
                      <p className="text-2xl font-semibold">{results.bmr} cal/day</p>
                      <p className="text-xs text-orange-200 mt-1">Calories burned at rest</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <p className="text-sm text-orange-200 mb-1">Activity Calories</p>
                      <p className="text-2xl font-semibold">{results.tdee - results.bmr} cal/day</p>
                      <p className="text-xs text-orange-200 mt-1">Additional calories from activity</p>
                    </div>

                    <div className="pt-4 border-t border-white/20">
                      <p className="text-sm text-orange-200 mb-2">Quick Goals:</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Lose 0.5 kg/week:</span>
                          <span className="font-semibold">{results.weightLoss} cal</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gain 0.5 kg/week:</span>
                          <span className="font-semibold">{results.weightGain} cal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Scale className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-orange-200">Enter your details to calculate TDEE</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Frequently Asked Questions About TDEE
            </h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {[
                {
                  question: 'What is TDEE?',
                  answer: 'TDEE (Total Daily Energy Expenditure) is the total number of calories your body burns in a day. It includes your BMR (calories burned at rest) plus calories burned through physical activity, exercise, and digesting food. This is your maintenance calorie level.'
                },
                {
                  question: 'How is TDEE calculated?',
                  answer: 'TDEE is calculated by first determining your BMR using formulas like Mifflin-St Jeor, then multiplying by an activity factor based on your lifestyle. Activity factors range from 1.2 (sedentary) to 1.9 (extremely active).'
                },
                {
                  question: 'What is the difference between BMR and TDEE?',
                  answer: 'BMR (Basal Metabolic Rate) is the calories your body burns at complete rest to maintain vital functions like breathing and circulation. TDEE is BMR plus all additional calories burned through daily activities and exercise.'
                },
                {
                  question: 'How do I use TDEE for weight loss?',
                  answer: 'To lose weight, eat fewer calories than your TDEE. A deficit of 500 calories per day typically results in about 0.5 kg (1 lb) of weight loss per week. Avoid extreme deficits below 1200 calories (women) or 1500 calories (men).'
                },
                {
                  question: 'Which TDEE formula is most accurate?',
                  answer: 'The Mifflin-St Jeor equation is generally considered most accurate for most people. However, all formulas are estimates. For best results, track your weight for 2-3 weeks and adjust your calorie intake based on actual results.'
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-start">
                    <HelpCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-orange-600" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 ml-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Calculators */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Related Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Macro Calculator', href: '/calculators/macro-calculator', description: 'Calculate your protein, carbs & fat needs' },
                { name: 'BMI Calculator', href: '/calculators/bmi-calculator', description: 'Calculate your Body Mass Index' },
                { name: 'BMR Calculator', href: '/calculators/bmr-calculator', description: 'Calculate your Basal Metabolic Rate' },
                { name: 'Calorie Deficit Calculator', href: '/calculators/calorie-deficit-calculator', description: 'Plan your weight loss calories' },
              ].map((calc) => (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all group"
                >
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 mb-1">{calc.name}</h3>
                  <p className="text-sm text-gray-600">{calc.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
