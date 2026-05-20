'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, Beef, Wheat, Droplets, Target, Scale, Home, HelpCircle, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const activityLevels = [
  { value: '1.2', label: 'Sedentary', description: 'Little or no exercise' },
  { value: '1.375', label: 'Lightly Active', description: 'Exercise 1-3 days/week' },
  { value: '1.55', label: 'Moderately Active', description: 'Exercise 3-5 days/week' },
  { value: '1.725', label: 'Very Active', description: 'Exercise 6-7 days/week' },
  { value: '1.9', label: 'Extremely Active', description: 'Very intense exercise daily' },
];

const goals = [
  { value: 'lose', label: 'Lose Weight', multiplier: 0.8, description: '20% deficit' },
  { value: 'mildlose', label: 'Mild Weight Loss', multiplier: 0.9, description: '10% deficit' },
  { value: 'maintain', label: 'Maintain Weight', multiplier: 1.0, description: 'Maintenance' },
  { value: 'mildgain', label: 'Lean Bulk', multiplier: 1.1, description: '10% surplus' },
  { value: 'gain', label: 'Bulk', multiplier: 1.2, description: '20% surplus' },
];

const macroPresets = [
  { value: 'balanced', label: 'Balanced', protein: 30, carbs: 40, fat: 30 },
  { value: 'lowcarb', label: 'Low Carb', protein: 40, carbs: 20, fat: 40 },
  { value: 'highprotein', label: 'High Protein', protein: 40, carbs: 35, fat: 25 },
  { value: 'keto', label: 'Keto', protein: 25, carbs: 5, fat: 70 },
  { value: 'lowfat', label: 'Low Fat', protein: 35, carbs: 50, fat: 15 },
  { value: 'custom', label: 'Custom', protein: 30, carbs: 40, fat: 30 },
];

export default function MacroCalculatorPage() {
  const [age, setAge] = useState<string>('25');
  const [gender, setGender] = useState<string>('male');
  const [weight, setWeight] = useState<string>('70');
  const [weightUnit, setWeightUnit] = useState<string>('kg');
  const [height, setHeight] = useState<string>('170');
  const [heightUnit, setHeightUnit] = useState<string>('cm');
  const [activityLevel, setActivityLevel] = useState<string>('1.55');
  const [goal, setGoal] = useState<string>('maintain');
  const [preset, setPreset] = useState<string>('balanced');
  const [proteinPercent, setProteinPercent] = useState<number>(30);
  const [carbsPercent, setCarbsPercent] = useState<number>(40);
  const [fatPercent, setFatPercent] = useState<number>(30);

  const handlePresetChange = (value: string) => {
    setPreset(value);
    const selectedPreset = macroPresets.find(p => p.value === value);
    if (selectedPreset && value !== 'custom') {
      setProteinPercent(selectedPreset.protein);
      setCarbsPercent(selectedPreset.carbs);
      setFatPercent(selectedPreset.fat);
    }
  };

  const results = useMemo(() => {
    const ageNum = parseFloat(age) || 0;
    let weightKg = parseFloat(weight) || 0;
    let heightCm = parseFloat(height) || 0;
    const activity = parseFloat(activityLevel);
    const goalData = goals.find(g => g.value === goal);
    const goalMultiplier = goalData?.multiplier || 1;

    if (weightUnit === 'lb') weightKg = weightKg * 0.453592;
    if (heightUnit === 'ft') heightCm = heightCm * 30.48;
    if (heightUnit === 'in') heightCm = heightCm * 2.54;

    if (ageNum <= 0 || weightKg <= 0 || heightCm <= 0) return null;

    // Mifflin-St Jeor BMR
    let bmr = 0;
    if (gender === 'male') {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * ageNum) + 5;
    } else {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * ageNum) - 161;
    }

    const tdee = bmr * activity;
    const targetCalories = Math.round(tdee * goalMultiplier);

    // Calculate macros in grams
    const proteinCals = targetCalories * (proteinPercent / 100);
    const carbsCals = targetCalories * (carbsPercent / 100);
    const fatCals = targetCalories * (fatPercent / 100);

    const proteinGrams = Math.round(proteinCals / 4); // 4 cal per gram
    const carbsGrams = Math.round(carbsCals / 4); // 4 cal per gram
    const fatGrams = Math.round(fatCals / 9); // 9 cal per gram

    // Protein per kg of body weight
    const proteinPerKg = (proteinGrams / weightKg).toFixed(1);

    return {
      tdee: Math.round(tdee),
      targetCalories,
      protein: {
        grams: proteinGrams,
        calories: Math.round(proteinCals),
        percent: proteinPercent,
        perKg: proteinPerKg,
      },
      carbs: {
        grams: carbsGrams,
        calories: Math.round(carbsCals),
        percent: carbsPercent,
      },
      fat: {
        grams: fatGrams,
        calories: Math.round(fatCals),
        percent: fatPercent,
      },
      weightKg,
    };
  }, [age, gender, weight, weightUnit, height, heightUnit, activityLevel, goal, proteinPercent, carbsPercent, fatPercent]);

  const totalPercent = proteinPercent + carbsPercent + fatPercent;

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
                name: 'What are macros?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Macros (macronutrients) are the three main nutrients your body needs in large amounts: protein, carbohydrates, and fat. Each provides calories - protein and carbs have 4 calories per gram, while fat has 9 calories per gram.'
                }
              },
              {
                '@type': 'Question',
                name: 'How much protein do I need per day?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For most active individuals, 1.6-2.2 grams of protein per kg of body weight is recommended. Sedentary people need about 0.8g/kg. Those building muscle or losing weight while preserving muscle should aim for the higher end.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is the best macro ratio for weight loss?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A common effective ratio for weight loss is 40% protein, 35% carbs, 25% fat. Higher protein helps preserve muscle mass during a calorie deficit. However, the most important factor is maintaining a calorie deficit.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is the best macro ratio for muscle gain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For muscle gain, aim for 30% protein, 45% carbs, 25% fat with a slight calorie surplus. Higher carbs provide energy for workouts and muscle glycogen, while adequate protein supports muscle protein synthesis.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is IIFYM (If It Fits Your Macros)?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'IIFYM is a flexible dieting approach where you can eat any foods as long as they fit within your daily macro targets. This allows dietary flexibility while still meeting nutritional goals for body composition.'
                }
              }
            ]
          })
        }}
      />
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        {/* Breadcrumb */}
        <div className="bg-white/80 backdrop-blur-sm py-3 px-4 shadow-sm">
          <div className="max-w-6xl mx-auto">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-green-600 hover:text-green-800 flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/calculators" className="text-green-600 hover:text-green-800">Calculators</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 font-medium">Macro Calculator</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Target className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Macro Calculator</h1>
            </div>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Calculate your daily protein, carbs, and fat needs based on your goals. Get personalized macros for weight loss, muscle gain, or maintenance.
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
                  <Calculator className="w-6 h-6 mr-2 text-green-600" />
                  Your Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">Age</Label>
                    <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="h-12" />
                  </div>

                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">Gender</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">Weight</Label>
                    <div className="flex gap-2">
                      <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="h-12 flex-1" />
                      <Select value={weightUnit} onValueChange={setWeightUnit}>
                        <SelectTrigger className="w-20 h-12"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="lb">lb</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">Height</Label>
                    <div className="flex gap-2">
                      <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="h-12 flex-1" />
                      <Select value={heightUnit} onValueChange={setHeightUnit}>
                        <SelectTrigger className="w-20 h-12"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cm">cm</SelectItem>
                          <SelectItem value="in">in</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">Activity Level</Label>
                    <Select value={activityLevel} onValueChange={setActivityLevel}>
                      <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {activityLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">Goal</Label>
                    <Select value={goal} onValueChange={setGoal}>
                      <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {goals.map((g) => (
                          <SelectItem key={g.value} value={g.value}>{g.label} ({g.description})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">Macro Preset</Label>
                    <Select value={preset} onValueChange={handlePresetChange}>
                      <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {macroPresets.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.label} {p.value !== 'custom' && `(${p.protein}P/${p.carbs}C/${p.fat}F)`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {preset === 'custom' && (
                    <>
                      <div>
                        <Label className="text-base font-semibold text-gray-700 mb-2 block">Protein %</Label>
                        <Input type="number" value={proteinPercent} onChange={(e) => setProteinPercent(Number(e.target.value))} className="h-12" min="0" max="100" />
                      </div>
                      <div>
                        <Label className="text-base font-semibold text-gray-700 mb-2 block">Carbs %</Label>
                        <Input type="number" value={carbsPercent} onChange={(e) => setCarbsPercent(Number(e.target.value))} className="h-12" min="0" max="100" />
                      </div>
                      <div>
                        <Label className="text-base font-semibold text-gray-700 mb-2 block">Fat %</Label>
                        <Input type="number" value={fatPercent} onChange={(e) => setFatPercent(Number(e.target.value))} className="h-12" min="0" max="100" />
                      </div>
                      {totalPercent !== 100 && (
                        <div className="md:col-span-2">
                          <p className="text-red-600 text-sm">Total must equal 100% (currently {totalPercent}%)</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white p-6 md:p-8 rounded-xl shadow-xl sticky top-4">
                <h2 className="text-2xl font-bold mb-6">Your Daily Macros</h2>

                {results && totalPercent === 100 ? (
                  <div className="space-y-4">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
                      <p className="text-sm text-green-200 mb-1">Target Calories</p>
                      <p className="text-3xl font-bold">{results.targetCalories}</p>
                      <p className="text-xs text-green-200">TDEE: {results.tdee} cal</p>
                    </div>

                    <div className="bg-red-500/80 backdrop-blur-sm p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Beef className="w-5 h-5 mr-2" />
                          <span>Protein</span>
                        </div>
                        <span className="font-bold">{results.protein.grams}g</span>
                      </div>
                      <div className="text-sm text-red-200 mt-1">
                        {results.protein.calories} cal ({results.protein.percent}%) • {results.protein.perKg}g/kg
                      </div>
                    </div>

                    <div className="bg-yellow-500/80 backdrop-blur-sm p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Wheat className="w-5 h-5 mr-2" />
                          <span>Carbs</span>
                        </div>
                        <span className="font-bold">{results.carbs.grams}g</span>
                      </div>
                      <div className="text-sm text-yellow-200 mt-1">
                        {results.carbs.calories} cal ({results.carbs.percent}%)
                      </div>
                    </div>

                    <div className="bg-blue-500/80 backdrop-blur-sm p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Droplets className="w-5 h-5 mr-2" />
                          <span>Fat</span>
                        </div>
                        <span className="font-bold">{results.fat.grams}g</span>
                      </div>
                      <div className="text-sm text-blue-200 mt-1">
                        {results.fat.calories} cal ({results.fat.percent}%)
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Scale className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-green-200">Enter your details to calculate macros</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {[
                { question: 'What are macros?', answer: 'Macros (macronutrients) are protein, carbohydrates, and fat - the three nutrients your body needs in large amounts. Protein and carbs provide 4 calories per gram, while fat provides 9 calories per gram.' },
                { question: 'How much protein do I need?', answer: 'For active individuals, 1.6-2.2g protein per kg body weight is recommended. Sedentary people need about 0.8g/kg. Higher protein is better when building muscle or losing fat.' },
                { question: 'What macro ratio is best for weight loss?', answer: 'A common ratio for weight loss is 40% protein, 35% carbs, 25% fat. Higher protein helps preserve muscle during a deficit. The most important factor is total calorie deficit.' },
                { question: 'What macro ratio is best for muscle gain?', answer: 'For muscle gain, try 30% protein, 45% carbs, 25% fat with a calorie surplus. Higher carbs fuel workouts and recovery while adequate protein supports muscle growth.' },
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-start">
                    <HelpCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-green-600" />
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
                { name: 'TDEE Calculator', href: '/calculators/tdee-calculator', description: 'Calculate total daily energy expenditure' },
                { name: 'BMI Calculator', href: '/calculators/bmi-calculator', description: 'Calculate your Body Mass Index' },
                { name: 'Calorie Deficit Calculator', href: '/calculators/calorie-deficit-calculator', description: 'Plan your weight loss' },
                { name: 'BMR Calculator', href: '/calculators/bmr-calculator', description: 'Calculate basal metabolic rate' },
              ].map((calc) => (
                <Link key={calc.href} href={calc.href} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all group">
                  <h3 className="font-semibold text-gray-800 group-hover:text-green-600 mb-1">{calc.name}</h3>
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
