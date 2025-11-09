'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, BookOpen, ArrowRight, Activity, Scale, TrendingUp, User, Ruler, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BMIResult {
  bmi: number;
  category: string;
  healthyWeightRange: { min: number; max: number };
  bmiPrime: number;
  ponderalIndex: number;
  classification: 'underweight' | 'normal' | 'overweight' | 'obese';
  steps: string[];
  formula: string;
}

export default function BMICalculator() {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  // Metric inputs
  const [weightKg, setWeightKg] = useState<string>('');
  const [heightCm, setHeightCm] = useState<string>('');

  // Imperial inputs
  const [weightLbs, setWeightLbs] = useState<string>('');
  const [heightFeet, setHeightFeet] = useState<string>('');
  const [heightInches, setHeightInches] = useState<string>('');

  const [result, setResult] = useState<BMIResult | null>(null);

  const getBMICategory = (bmi: number, ageNum?: number): { category: string; classification: 'underweight' | 'normal' | 'overweight' | 'obese' } => {
    // Adult BMI categories (20+ years)
    if (!ageNum || ageNum >= 20) {
      if (bmi < 16) return { category: 'Severe Thinness', classification: 'underweight' };
      if (bmi < 17) return { category: 'Moderate Thinness', classification: 'underweight' };
      if (bmi < 18.5) return { category: 'Mild Thinness', classification: 'underweight' };
      if (bmi < 25) return { category: 'Normal (Healthy Weight)', classification: 'normal' };
      if (bmi < 30) return { category: 'Overweight (Pre-obese)', classification: 'overweight' };
      if (bmi < 35) return { category: 'Obese Class I', classification: 'obese' };
      if (bmi < 40) return { category: 'Obese Class II', classification: 'obese' };
      return { category: 'Obese Class III', classification: 'obese' };
    } else {
      // Simplified categories for children/teens
      if (bmi < 18.5) return { category: 'Underweight', classification: 'underweight' };
      if (bmi < 25) return { category: 'Healthy Weight', classification: 'normal' };
      if (bmi < 30) return { category: 'Overweight', classification: 'overweight' };
      return { category: 'Obese', classification: 'obese' };
    }
  };

  const getCategoryColor = (classification: string): string => {
    switch (classification) {
      case 'underweight': return 'from-blue-600 to-cyan-600';
      case 'normal': return 'from-green-600 to-emerald-600';
      case 'overweight': return 'from-amber-600 to-orange-600';
      case 'obese': return 'from-red-600 to-rose-600';
      default: return 'from-gray-600 to-slate-600';
    }
  };

  const handleCalculate = () => {
    let weightInKg: number;
    let heightInMeters: number;

    const ageNum = age ? parseInt(age) : undefined;

    if (unitSystem === 'metric') {
      const weight = parseFloat(weightKg);
      const height = parseFloat(heightCm);

      if (isNaN(weight) || isNaN(height)) {
        alert('Please enter valid weight and height values.');
        return;
      }

      if (weight <= 0 || height <= 0) {
        alert('Weight and height must be positive numbers.');
        return;
      }

      if (weight > 500) {
        alert('Please enter a realistic weight value (max 500 kg).');
        return;
      }

      if (height > 300) {
        alert('Please enter a realistic height value (max 300 cm).');
        return;
      }

      weightInKg = weight;
      heightInMeters = height / 100;
    } else {
      // Imperial
      const weight = parseFloat(weightLbs);
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;

      if (isNaN(weight)) {
        alert('Please enter a valid weight value.');
        return;
      }

      if (feet === 0 && inches === 0) {
        alert('Please enter your height.');
        return;
      }

      if (weight <= 0) {
        alert('Weight must be a positive number.');
        return;
      }

      if (weight > 1100) {
        alert('Please enter a realistic weight value (max 1100 lbs).');
        return;
      }

      if (feet > 9 || (feet === 9 && inches > 0)) {
        alert('Please enter a realistic height value (max 9 feet).');
        return;
      }

      // Convert to metric
      weightInKg = weight * 0.453592;
      const totalInches = (feet * 12) + inches;
      heightInMeters = totalInches * 0.0254;
    }

    // Calculate BMI
    const bmi = weightInKg / (heightInMeters * heightInMeters);

    // Calculate BMI Prime (BMI / 25)
    const bmiPrime = bmi / 25;

    // Calculate Ponderal Index (weight / height³)
    const ponderalIndex = weightInKg / Math.pow(heightInMeters, 3);

    // Calculate healthy weight range (BMI 18.5-25)
    const minHealthyWeight = 18.5 * (heightInMeters * heightInMeters);
    const maxHealthyWeight = 25 * (heightInMeters * heightInMeters);

    const healthyWeightRange = unitSystem === 'metric'
      ? { min: minHealthyWeight, max: maxHealthyWeight }
      : { min: minHealthyWeight / 0.453592, max: maxHealthyWeight / 0.453592 };

    // Get category
    const { category, classification } = getBMICategory(bmi, ageNum);

    // Generate steps
    const steps: string[] = [];

    if (unitSystem === 'metric') {
      steps.push('**Step 1:** Identify your measurements');
      steps.push(`- Weight: ${weightKg} kg`);
      steps.push(`- Height: ${heightCm} cm = ${heightInMeters.toFixed(2)} m`);
      steps.push('');
      steps.push('**Step 2:** Apply the BMI formula');
      steps.push('BMI = Weight (kg) ÷ Height² (m²)');
      steps.push('');
      steps.push('**Step 3:** Calculate height squared');
      steps.push(`Height² = ${heightInMeters.toFixed(2)} × ${heightInMeters.toFixed(2)} = ${(heightInMeters * heightInMeters).toFixed(4)} m²`);
      steps.push('');
      steps.push('**Step 4:** Divide weight by height squared');
      steps.push(`BMI = ${weightKg} ÷ ${(heightInMeters * heightInMeters).toFixed(4)} = ${bmi.toFixed(2)} kg/m²`);
    } else {
      const totalInches = (parseFloat(heightFeet) || 0) * 12 + (parseFloat(heightInches) || 0);
      steps.push('**Step 1:** Identify your measurements');
      steps.push(`- Weight: ${weightLbs} lbs`);
      steps.push(`- Height: ${heightFeet} ft ${heightInches} in = ${totalInches} inches`);
      steps.push('');
      steps.push('**Step 2:** Apply the BMI formula (Imperial)');
      steps.push('BMI = 703 × Weight (lbs) ÷ Height² (in²)');
      steps.push('');
      steps.push('**Step 3:** Calculate height squared');
      steps.push(`Height² = ${totalInches} × ${totalInches} = ${totalInches * totalInches} in²`);
      steps.push('');
      steps.push('**Step 4:** Calculate BMI');
      steps.push(`BMI = 703 × ${weightLbs} ÷ ${totalInches * totalInches}`);
      steps.push(`BMI = ${(703 * parseFloat(weightLbs)).toFixed(2)} ÷ ${totalInches * totalInches}`);
      steps.push(`BMI = ${bmi.toFixed(2)} kg/m²`);
    }

    const formula = unitSystem === 'metric'
      ? `${weightKg} ÷ (${heightInMeters.toFixed(2)})²`
      : `703 × ${weightLbs} ÷ ${((parseFloat(heightFeet) || 0) * 12 + (parseFloat(heightInches) || 0))}²`;

    setResult({
      bmi: parseFloat(bmi.toFixed(1)),
      category,
      healthyWeightRange,
      bmiPrime: parseFloat(bmiPrime.toFixed(2)),
      ponderalIndex: parseFloat(ponderalIndex.toFixed(1)),
      classification,
      steps,
      formula,
    });
  };

  const handleClear = () => {
    setAge('');
    setWeightKg('');
    setHeightCm('');
    setWeightLbs('');
    setHeightFeet('');
    setHeightInches('');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-indigo-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-indigo-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">BMI Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Activity className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              BMI Calculator
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Calculate your Body Mass Index (BMI) using metric or imperial units. Get your BMI category, healthy weight range, and comprehensive health insights.
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
                  <Calculator className="w-6 h-6 text-indigo-600" />
                  Enter Your Details
                </h2>

                {/* Unit System Toggle */}
                <div className="mb-6">
                  <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                    Unit System
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => setUnitSystem('metric')}
                      variant={unitSystem === 'metric' ? 'default' : 'outline'}
                      className={`py-6 ${unitSystem === 'metric' ? 'bg-indigo-600' : ''}`}
                    >
                      Metric (kg, cm)
                    </Button>
                    <Button
                      onClick={() => setUnitSystem('imperial')}
                      variant={unitSystem === 'imperial' ? 'default' : 'outline'}
                      className={`py-6 ${unitSystem === 'imperial' ? 'bg-indigo-600' : ''}`}
                    >
                      Imperial (lbs, ft/in)
                    </Button>
                  </div>
                </div>

                {/* Age and Gender */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="age" className="text-sm font-semibold text-gray-700 mb-3 block">
                      Age (optional)
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Years"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="text-center"
                      min="2"
                      max="120"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender" className="text-sm font-semibold text-gray-700 mb-3 block">
                      Gender
                    </Label>
                    <Select value={gender} onValueChange={(value: 'male' | 'female') => setGender(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {unitSystem === 'metric' ? (
                  <>
                    {/* Metric Inputs */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <Label htmlFor="weight-kg" className="text-sm font-semibold text-gray-700 mb-3 block">
                          Weight (kg)
                        </Label>
                        <Input
                          id="weight-kg"
                          type="number"
                          placeholder="e.g., 70"
                          value={weightKg}
                          onChange={(e) => setWeightKg(e.target.value)}
                          className="text-center text-lg font-medium"
                          step="0.1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="height-cm" className="text-sm font-semibold text-gray-700 mb-3 block">
                          Height (cm)
                        </Label>
                        <Input
                          id="height-cm"
                          type="number"
                          placeholder="e.g., 175"
                          value={heightCm}
                          onChange={(e) => setHeightCm(e.target.value)}
                          className="text-center text-lg font-medium"
                          step="0.1"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Imperial Inputs */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <Label htmlFor="weight-lbs" className="text-sm font-semibold text-gray-700 mb-3 block">
                          Weight (lbs)
                        </Label>
                        <Input
                          id="weight-lbs"
                          type="number"
                          placeholder="e.g., 154"
                          value={weightLbs}
                          onChange={(e) => setWeightLbs(e.target.value)}
                          className="text-center text-lg font-medium"
                          step="0.1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                          Height
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Input
                              id="height-feet"
                              type="number"
                              placeholder="Feet"
                              value={heightFeet}
                              onChange={(e) => setHeightFeet(e.target.value)}
                              className="text-center"
                              min="0"
                              max="9"
                            />
                          </div>
                          <div>
                            <Input
                              id="height-inches"
                              type="number"
                              placeholder="Inches"
                              value={heightInches}
                              onChange={(e) => setHeightInches(e.target.value)}
                              className="text-center"
                              min="0"
                              max="11"
                              step="0.1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Calculate BMI
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
                  {/* BMI Result Card */}
                  <div className={`bg-gradient-to-br ${getCategoryColor(result.classification)} rounded-2xl shadow-xl p-6 md:p-8 text-white`}>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Scale className="w-6 h-6" />
                      Your BMI Result
                    </h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
                      <div className="text-center">
                        <p className="text-6xl md:text-7xl font-bold">{result.bmi}</p>
                        <p className="text-sm text-white/80 mt-2">kg/m²</p>
                      </div>
                      <div className="text-center border-t border-white/20 pt-4">
                        <p className="text-2xl font-semibold">{result.category}</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Metrics */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h4 className="text-sm font-semibold text-gray-600 mb-2">BMI Prime</h4>
                      <p className="text-3xl font-bold text-indigo-600">{result.bmiPrime}</p>
                      <p className="text-xs text-gray-500 mt-1">Normal: 0.74 - 1.00</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h4 className="text-sm font-semibold text-gray-600 mb-2">Ponderal Index</h4>
                      <p className="text-3xl font-bold text-purple-600">{result.ponderalIndex}</p>
                      <p className="text-xs text-gray-500 mt-1">kg/m³</p>
                    </div>
                  </div>

                  {/* Healthy Weight Range */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                      Healthy Weight Range
                    </h3>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                      <p className="text-lg text-gray-700 mb-2">
                        For your height, a healthy weight range is:
                      </p>
                      <div className="flex items-center justify-center gap-4 text-3xl font-bold text-green-600">
                        <span>{result.healthyWeightRange.min.toFixed(1)}</span>
                        <span className="text-gray-400">-</span>
                        <span>{result.healthyWeightRange.max.toFixed(1)}</span>
                        <span className="text-lg font-normal text-gray-600">
                          {unitSystem === 'metric' ? 'kg' : 'lbs'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-3 text-center">
                        This range corresponds to a BMI of 18.5 - 25 (Normal weight)
                      </p>
                    </div>
                  </div>

                  {/* Step-by-Step Solution */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                      Calculation Steps
                    </h3>
                    <div className="space-y-2 prose prose-sm max-w-none">
                      {result.steps.map((step, index) => (
                        <div key={index}>
                          {step.startsWith('**') ? (
                            <p className="text-gray-900 font-semibold mt-3 mb-1">
                              {step.replace(/\*\*/g, '')}
                            </p>
                          ) : step.startsWith('-') ? (
                            <p className="text-gray-700 ml-4">{step}</p>
                          ) : step === '' ? (
                            <div className="h-2" />
                          ) : (
                            <p className="text-gray-700 leading-relaxed font-mono text-sm bg-gray-50 p-2 rounded">{step}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Formula Section */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Formula Used
                    </h3>
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                      <p className="text-sm text-gray-600 mb-3">
                        {unitSystem === 'metric' ? 'Metric Formula:' : 'Imperial Formula:'}
                      </p>
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-center">
                          {unitSystem === 'metric' ? (
                            <div className="inline-flex flex-col items-center">
                              <span className="text-lg font-semibold">BMI = </span>
                              <div className="inline-flex flex-col items-center mt-2">
                                <span className="text-xl font-semibold px-3 pb-1">Weight (kg)</span>
                                <span className="w-full border-t-2 border-gray-900"></span>
                                <span className="text-xl font-semibold px-3 pt-1">Height² (m²)</span>
                              </div>
                            </div>
                          ) : (
                            <div className="inline-flex flex-col items-center">
                              <span className="text-lg font-semibold">BMI = </span>
                              <div className="inline-flex items-center mt-2">
                                <span className="text-lg font-semibold mr-2">703 ×</span>
                                <div className="inline-flex flex-col items-center">
                                  <span className="text-xl font-semibold px-3 pb-1">Weight (lbs)</span>
                                  <span className="w-full border-t-2 border-gray-900"></span>
                                  <span className="text-xl font-semibold px-3 pt-1">Height² (in²)</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-3 text-center">
                        Result is expressed in kg/m²
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Enter your measurements and click Calculate to see your BMI results
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
                What is BMI (Body Mass Index)?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                <strong>Body Mass Index (BMI)</strong> is a widely used screening tool that measures body fat based on your height and weight. Developed by Belgian statistician Adolphe Quetelet in the 1830s, BMI provides a simple numerical measure to classify individuals as underweight, normal weight, overweight, or obese.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                BMI is expressed in units of kg/m² (kilograms per square meter) and is calculated by dividing your weight in kilograms by the square of your height in meters. For imperial measurements, the formula includes a conversion factor of 703 to account for pounds and inches.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                While BMI is not a direct measure of body fat percentage, it correlates strongly with body fat levels in most individuals and serves as an effective screening tool for weight-related health risks. Healthcare professionals worldwide use BMI as part of comprehensive health assessments to identify potential weight problems in adults and children.
              </p>
            </section>

            {/* BMI Formula */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                BMI Calculation Formula
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-indigo-600 mb-4">Metric System</h3>
                  <div className="bg-white rounded-lg p-6 mb-4">
                    <div className="text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className="text-lg font-semibold mb-2">BMI = </span>
                        <div className="inline-flex flex-col items-center">
                          <span className="text-xl font-semibold px-4 pb-2">Weight (kg)</span>
                          <span className="w-full border-t-2 border-gray-900"></span>
                          <span className="text-xl font-semibold px-4 pt-2">Height² (m²)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>Example:</strong> Weight = 70 kg, Height = 1.75 m
                    <br />
                    BMI = 70 ÷ (1.75)² = 70 ÷ 3.0625 = 22.86 kg/m²
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-purple-600 mb-4">Imperial System</h3>
                  <div className="bg-white rounded-lg p-6 mb-4">
                    <div className="text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className="text-lg font-semibold mb-2">BMI = </span>
                        <div className="inline-flex items-center">
                          <span className="text-lg font-semibold mr-2">703 ×</span>
                          <div className="inline-flex flex-col items-center">
                            <span className="text-xl font-semibold px-3 pb-2">Weight (lbs)</span>
                            <span className="w-full border-t-2 border-gray-900"></span>
                            <span className="text-xl font-semibold px-3 pt-2">Height² (in²)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>Example:</strong> Weight = 154 lbs, Height = 69 inches
                    <br />
                    BMI = 703 × 154 ÷ (69)² = 108,262 ÷ 4,761 = 22.74 kg/m²
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Why the factor of 703?</h4>
                    <p className="text-gray-700 text-sm">
                      The number 703 is a conversion factor used in the imperial BMI formula to ensure the result matches the metric calculation. It comes from converting pounds to kilograms (÷ 2.20462) and inches to meters (÷ 39.3701), resulting in approximately 703.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* BMI Categories Table */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                BMI Categories and Classification
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The World Health Organization (WHO) has established standard BMI ranges for adults aged 20 and over:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <tr>
                      <th className="py-3 px-4 text-left">BMI Range (kg/m²)</th>
                      <th className="py-3 px-4 text-left">Category</th>
                      <th className="py-3 px-4 text-left">Health Risk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-blue-50">
                      <td className="py-3 px-4">{"< 16.0"}</td>
                      <td className="py-3 px-4 font-semibold text-blue-700">Severe Thinness</td>
                      <td className="py-3 px-4 text-sm">High risk of malnutrition</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="py-3 px-4">16.0 - 17.0</td>
                      <td className="py-3 px-4 font-semibold text-blue-600">Moderate Thinness</td>
                      <td className="py-3 px-4 text-sm">Moderate health risks</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="py-3 px-4">17.0 - 18.5</td>
                      <td className="py-3 px-4 font-semibold text-blue-500">Mild Thinness</td>
                      <td className="py-3 px-4 text-sm">Low to moderate risks</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="py-3 px-4">18.5 - 25.0</td>
                      <td className="py-3 px-4 font-semibold text-green-600">Normal (Healthy Weight)</td>
                      <td className="py-3 px-4 text-sm">Minimal health risks</td>
                    </tr>
                    <tr className="hover:bg-yellow-50">
                      <td className="py-3 px-4">25.0 - 30.0</td>
                      <td className="py-3 px-4 font-semibold text-yellow-700">Overweight (Pre-obese)</td>
                      <td className="py-3 px-4 text-sm">Increased risk of diseases</td>
                    </tr>
                    <tr className="hover:bg-orange-50">
                      <td className="py-3 px-4">30.0 - 35.0</td>
                      <td className="py-3 px-4 font-semibold text-orange-600">Obese Class I</td>
                      <td className="py-3 px-4 text-sm">Moderate to high risk</td>
                    </tr>
                    <tr className="hover:bg-red-50">
                      <td className="py-3 px-4">35.0 - 40.0</td>
                      <td className="py-3 px-4 font-semibold text-red-600">Obese Class II</td>
                      <td className="py-3 px-4 text-sm">High risk of diseases</td>
                    </tr>
                    <tr className="hover:bg-red-50">
                      <td className="py-3 px-4">≥ 40.0</td>
                      <td className="py-3 px-4 font-semibold text-red-700">Obese Class III</td>
                      <td className="py-3 px-4 text-sm">Very high risk</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Health Implications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Health Implications of BMI
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-700 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    High BMI Risks
                  </h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Type 2 diabetes</li>
                    <li>• Cardiovascular disease</li>
                    <li>• High blood pressure</li>
                    <li>• Stroke</li>
                    <li>• Certain cancers</li>
                    <li>• Osteoarthritis</li>
                    <li>• Sleep apnea</li>
                    <li>• Fatty liver disease</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Low BMI Risks
                  </h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Malnutrition</li>
                    <li>• Weakened immune system</li>
                    <li>• Osteoporosis</li>
                    <li>• Anemia</li>
                    <li>• Fertility issues</li>
                    <li>• Vitamin deficiencies</li>
                    <li>• Muscle wasting</li>
                    <li>• Heart irregularities</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* BMI Limitations */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Limitations of BMI
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                While BMI is a useful screening tool, it has several important limitations:
              </p>
              <div className="space-y-4">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    1. Doesn't Measure Body Composition
                  </h3>
                  <p className="text-gray-700">
                    BMI cannot distinguish between muscle mass and fat mass. Athletes and bodybuilders may have high BMIs due to muscle, not fat, while elderly individuals may have normal BMIs despite high body fat percentages.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    2. Doesn't Account for Fat Distribution
                  </h3>
                  <p className="text-gray-700">
                    BMI doesn't indicate where body fat is located. Visceral fat (around organs) poses greater health risks than subcutaneous fat (under skin), but BMI treats all fat equally.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    3. Varies by Age, Sex, and Ethnicity
                  </h3>
                  <p className="text-gray-700">
                    BMI standards are based primarily on Caucasian populations. Asian populations may have higher health risks at lower BMIs, while the same BMI may represent different body fat percentages for men and women.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    4. Not Suitable for Certain Groups
                  </h3>
                  <p className="text-gray-700">
                    BMI may not be accurate for pregnant women, competitive athletes, elderly individuals, people with amputations, or those with certain medical conditions affecting weight or height.
                  </p>
                </div>
              </div>
            </section>

            {/* BMI for Children */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                BMI for Children and Teenagers
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                For children and teenagers aged 2-20 years, BMI is interpreted differently using <strong>BMI-for-age percentiles</strong> based on CDC growth charts. The same BMI can mean different things at different ages for children.
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                    <tr>
                      <th className="py-3 px-4 text-left">Percentile Range</th>
                      <th className="py-3 px-4 text-left">Weight Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-blue-50">
                      <td className="py-3 px-4">{"< 5th percentile"}</td>
                      <td className="py-3 px-4 font-semibold text-blue-600">Underweight</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="py-3 px-4">5th to {"< 85th percentile"}</td>
                      <td className="py-3 px-4 font-semibold text-green-600">Healthy Weight</td>
                    </tr>
                    <tr className="hover:bg-yellow-50">
                      <td className="py-3 px-4">85th to {"< 95th percentile"}</td>
                      <td className="py-3 px-4 font-semibold text-yellow-700">Overweight</td>
                    </tr>
                    <tr className="hover:bg-red-50">
                      <td className="py-3 px-4">≥ 95th percentile</td>
                      <td className="py-3 px-4 font-semibold text-red-600">Obese</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
                <p className="text-gray-700 text-sm">
                  <strong>Note:</strong> Children's BMI must be compared to others of the same age and sex because body composition changes as children grow. Consult a pediatrician for proper interpretation of children's BMI values.
                </p>
              </div>
            </section>

            {/* Alternative Measurements */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Alternative Body Composition Measurements
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                While BMI is convenient, several other measurements provide more detailed information about body composition:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-indigo-600 mb-3">Waist Circumference</h3>
                  <p className="text-gray-700 text-sm">
                    Measures abdominal fat. Men with waist circumference {">"} 40 inches or women {">"} 35 inches have increased health risks regardless of BMI.
                  </p>
                </div>

                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">Waist-to-Hip Ratio</h3>
                  <p className="text-gray-700 text-sm">
                    Divides waist circumference by hip circumference. Ratios {">"} 0.90 (men) or {">"} 0.85 (women) indicate increased cardiovascular risk.
                  </p>
                </div>

                <div className="bg-white border-2 border-blue-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-3">Body Fat Percentage</h3>
                  <p className="text-gray-700 text-sm">
                    Measured via bioelectrical impedance, DEXA scans, or skinfold calipers. Provides direct measurement of fat vs. lean mass.
                  </p>
                </div>

                <div className="bg-white border-2 border-teal-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-teal-600 mb-3">Waist-to-Height Ratio</h3>
                  <p className="text-gray-700 text-sm">
                    Waist circumference divided by height. A ratio {">"} 0.5 suggests increased health risks. Simple rule: keep waist less than half your height.
                  </p>
                </div>
              </div>
            </section>

            {/* Tips for Healthy Weight */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Tips for Achieving and Maintaining Healthy Weight
              </h2>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 md:p-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Balanced Nutrition</h3>
                      <p className="text-gray-700">
                        Focus on whole foods including fruits, vegetables, lean proteins, whole grains, and healthy fats. Limit processed foods, sugary drinks, and excessive sodium.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Regular Physical Activity</h3>
                      <p className="text-gray-700">
                        Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity per week, plus muscle-strengthening exercises twice weekly.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Portion Control</h3>
                      <p className="text-gray-700">
                        Use smaller plates, read nutrition labels, and be mindful of serving sizes. Avoid eating directly from packages or while distracted.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Quality Sleep</h3>
                      <p className="text-gray-700">
                        Get 7-9 hours of quality sleep nightly. Poor sleep disrupts hormones that regulate hunger and metabolism, leading to weight gain.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">5</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Stress Management</h3>
                      <p className="text-gray-700">
                        Practice stress-reduction techniques like meditation, yoga, or deep breathing. Chronic stress increases cortisol, which promotes fat storage.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">6</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Regular Monitoring</h3>
                      <p className="text-gray-700">
                        Track your weight and measurements regularly, but don't obsess over daily fluctuations. Focus on long-term trends and overall health markers.
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
                    What is a healthy BMI range?
                  </h3>
                  <p className="text-gray-700">
                    For adults 20 years and older, a healthy BMI range is 18.5 to 24.9 kg/m². This range is associated with the lowest health risks according to WHO guidelines. However, optimal BMI may vary slightly based on ethnicity, age, and individual health factors.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can BMI be inaccurate?
                  </h3>
                  <p className="text-gray-700">
                    Yes, BMI has limitations. It doesn't distinguish muscle from fat, so athletes may be classified as overweight despite being healthy. It also doesn't account for age, sex, bone density, or fat distribution. BMI should be used alongside other health indicators like waist circumference, blood pressure, and cholesterol levels.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How often should I check my BMI?
                  </h3>
                  <p className="text-gray-700">
                    For most adults, checking BMI quarterly (every 3 months) is sufficient to monitor weight trends. If you're actively working on weight loss or gain, monthly checks can help track progress. Focus on long-term trends rather than daily or weekly fluctuations, which are normal.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Is BMI different for men and women?
                  </h3>
                  <p className="text-gray-700">
                    The BMI formula is the same for both sexes, but women typically have more body fat than men at the same BMI due to biological differences. The standard BMI categories apply to both, though some health organizations suggest women may have slightly different optimal ranges. Always consult healthcare providers for personalized assessment.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is BMI Prime?
                  </h3>
                  <p className="text-gray-700">
                    BMI Prime is your BMI divided by 25 (the upper limit of normal BMI). A BMI Prime of 1.0 means you're at the boundary between normal and overweight. Values between 0.74-1.00 indicate normal weight, {"<"} 0.74 is underweight, and {">"} 1.0 is overweight. It's a simpler way to understand your BMI relative to the healthy range.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do I calculate BMI manually?
                  </h3>
                  <p className="text-gray-700">
                    For metric: Divide your weight in kilograms by your height in meters squared (BMI = kg ÷ m²). For imperial: Multiply your weight in pounds by 703, then divide by your height in inches squared (BMI = 703 × lbs ÷ in²). Example: 70 kg ÷ (1.75 m)² = 70 ÷ 3.0625 = 22.86 kg/m².
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What BMI is considered obese?
                  </h3>
                  <p className="text-gray-700">
                    A BMI of 30 or higher is classified as obese. Obesity is further divided into: Class I (30-34.9), Class II (35-39.9), and Class III (40+), with health risks increasing at higher classes. Class III obesity, also called severe or morbid obesity, carries the highest health risks and may require medical intervention.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Should children use the same BMI chart as adults?
                  </h3>
                  <p className="text-gray-700">
                    No. Children and teens (ages 2-20) should use BMI-for-age percentile charts from the CDC, which account for normal growth patterns. The same BMI means different things at different ages for kids. Always consult a pediatrician for children's BMI interpretation and never put children on restrictive diets without medical supervision.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can BMI affect life insurance rates?
                  </h3>
                  <p className="text-gray-700">
                    Yes, many life insurance companies use BMI as part of their underwriting process. Very high or very low BMIs may result in higher premiums or policy restrictions because they're associated with increased health risks. However, insurers typically consider BMI alongside other health factors like blood pressure, cholesterol, and medical history.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What's the difference between BMI and body fat percentage?
                  </h3>
                  <p className="text-gray-700">
                    BMI estimates body fat based on height and weight, while body fat percentage directly measures the proportion of fat in your body. Two people with the same BMI can have very different body fat percentages. Body fat percentage is more accurate but requires special equipment (DEXA scan, bioelectrical impedance) while BMI only needs a scale and measuring tape.
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Understanding Your BMI for Better Health
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Body Mass Index is a valuable tool for assessing weight status and identifying potential health risks, but it's just one piece of the health puzzle. Our <strong>BMI calculator</strong> provides instant, accurate results along with your healthy weight range and detailed explanations to help you understand your results.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Remember that BMI is a screening tool, not a diagnostic measure. A high or low BMI doesn't automatically mean you're unhealthy, just as a normal BMI doesn't guarantee perfect health. Consider BMI alongside other health indicators like waist circumference, blood pressure, blood sugar levels, cholesterol, and overall fitness.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                If your BMI falls outside the healthy range, don't panic. Instead, consult with healthcare professionals to develop a personalized plan that addresses your specific health needs and goals. Sustainable lifestyle changes in nutrition, physical activity, sleep, and stress management are far more important than any single number.
              </p>
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 md:p-8 text-white">
                <h3 className="text-xl font-bold mb-3">Start Monitoring Your Health Today!</h3>
                <p className="mb-4">
                  Use our free BMI calculator regularly to track your progress and maintain awareness of your health status. Early detection of weight changes can help prevent chronic diseases.
                </p>
                <a href="#calculator">
                  <Button className="bg-white text-indigo-600 hover:bg-gray-100 font-bold">
                    Calculate Your BMI Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
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
              Need Help with Health and Nutrition?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you understand nutrition, health science, and body composition. Get personalized one-on-one guidance tailored to your learning style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-demo-class">
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
