'use client';

import { useState, useEffect } from 'react';
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
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { Ruler, ChevronRight, ChevronDown, ChevronUp, RotateCcw, BookOpen, Calculator, HelpCircle, Info, Users, Baby } from 'lucide-react';

// Khamis-Roche coefficients for boys (ages 4.0 to 17.5)
const boysCoefficients: { [key: string]: { intercept: number; height: number; weight: number; midparent: number } } = {
  '4.0': { intercept: 45.06, height: 1.2190, weight: -0.0980, midparent: 0.4290 },
  '4.5': { intercept: 37.85, height: 1.1740, weight: -0.0630, midparent: 0.4500 },
  '5.0': { intercept: 30.64, height: 1.1290, weight: -0.0280, midparent: 0.4710 },
  '5.5': { intercept: 24.20, height: 1.0890, weight: 0.0020, midparent: 0.4890 },
  '6.0': { intercept: 17.76, height: 1.0490, weight: 0.0320, midparent: 0.5070 },
  '6.5': { intercept: 11.86, height: 1.0130, weight: 0.0580, midparent: 0.5220 },
  '7.0': { intercept: 5.96, height: 0.9770, weight: 0.0840, midparent: 0.5370 },
  '7.5': { intercept: 0.55, height: 0.9450, weight: 0.1060, midparent: 0.5490 },
  '8.0': { intercept: -4.86, height: 0.9130, weight: 0.1280, midparent: 0.5610 },
  '8.5': { intercept: -9.84, height: 0.8850, weight: 0.1470, midparent: 0.5700 },
  '9.0': { intercept: -14.82, height: 0.8570, weight: 0.1660, midparent: 0.5790 },
  '9.5': { intercept: -13.10, height: 0.9110, weight: -0.0350, midparent: 0.4640 },
  '10.0': { intercept: -11.04, height: 0.9714, weight: -0.0400, midparent: 0.4593 },
  '10.5': { intercept: -8.80, height: 1.0280, weight: -0.0440, midparent: 0.4550 },
  '11.0': { intercept: -6.40, height: 1.0810, weight: -0.0480, midparent: 0.4510 },
  '11.5': { intercept: -3.84, height: 1.1300, weight: -0.0510, midparent: 0.4470 },
  '12.0': { intercept: -1.28, height: 1.1790, weight: -0.0540, midparent: 0.4430 },
  '12.5': { intercept: 1.44, height: 1.2240, weight: -0.0560, midparent: 0.4400 },
  '13.0': { intercept: 4.16, height: 1.2690, weight: -0.0580, midparent: 0.4370 },
  '13.5': { intercept: 7.04, height: 1.3100, weight: -0.0590, midparent: 0.4340 },
  '14.0': { intercept: 9.92, height: 1.3510, weight: -0.0600, midparent: 0.4310 },
  '14.5': { intercept: 12.96, height: 1.3880, weight: -0.0600, midparent: 0.4290 },
  '15.0': { intercept: 16.00, height: 1.4250, weight: -0.0600, midparent: 0.4270 },
  '15.5': { intercept: 19.20, height: 1.4580, weight: -0.0590, midparent: 0.4250 },
  '16.0': { intercept: 22.40, height: 1.4910, weight: -0.0580, midparent: 0.4230 },
  '16.5': { intercept: 25.76, height: 1.5200, weight: -0.0560, midparent: 0.4220 },
  '17.0': { intercept: 29.12, height: 1.5490, weight: -0.0540, midparent: 0.4210 },
  '17.5': { intercept: 32.64, height: 1.5740, weight: -0.0510, midparent: 0.4200 },
};

// Khamis-Roche coefficients for girls (ages 4.0 to 17.5)
const girlsCoefficients: { [key: string]: { intercept: number; height: number; weight: number; midparent: number } } = {
  '4.0': { intercept: 35.96, height: 1.0980, weight: -0.0600, midparent: 0.4350 },
  '4.5': { intercept: 29.33, height: 1.0610, weight: -0.0350, midparent: 0.4520 },
  '5.0': { intercept: 22.70, height: 1.0240, weight: -0.0100, midparent: 0.4690 },
  '5.5': { intercept: 16.72, height: 0.9910, weight: 0.0120, midparent: 0.4830 },
  '6.0': { intercept: 10.74, height: 0.9580, weight: 0.0340, midparent: 0.4970 },
  '6.5': { intercept: 5.31, height: 0.9290, weight: 0.0530, midparent: 0.5080 },
  '7.0': { intercept: -0.12, height: 0.9000, weight: 0.0720, midparent: 0.5190 },
  '7.5': { intercept: -5.03, height: 0.8750, weight: 0.0880, midparent: 0.5270 },
  '8.0': { intercept: -9.94, height: 0.8500, weight: 0.1040, midparent: 0.5350 },
  '8.5': { intercept: -14.36, height: 0.8290, weight: 0.1170, midparent: 0.5400 },
  '9.0': { intercept: -18.78, height: 0.8080, weight: 0.1300, midparent: 0.5450 },
  '9.5': { intercept: -9.80, height: 0.8200, weight: -0.0700, midparent: 0.3800 },
  '10.0': { intercept: 0.33, height: 0.8277, weight: -0.0740, midparent: 0.3731 },
  '10.5': { intercept: 10.10, height: 0.8360, weight: -0.0780, midparent: 0.3670 },
  '11.0': { intercept: 19.50, height: 0.8440, weight: -0.0810, midparent: 0.3610 },
  '11.5': { intercept: 28.54, height: 0.8520, weight: -0.0840, midparent: 0.3560 },
  '12.0': { intercept: 37.58, height: 0.8600, weight: -0.0860, midparent: 0.3510 },
  '12.5': { intercept: 46.26, height: 0.8680, weight: -0.0880, midparent: 0.3470 },
  '13.0': { intercept: 54.94, height: 0.8760, weight: -0.0890, midparent: 0.3430 },
  '13.5': { intercept: 63.26, height: 0.8840, weight: -0.0900, midparent: 0.3400 },
  '14.0': { intercept: 71.58, height: 0.8920, weight: -0.0900, midparent: 0.3370 },
  '14.5': { intercept: 79.54, height: 0.9000, weight: -0.0900, midparent: 0.3350 },
  '15.0': { intercept: 87.50, height: 0.9080, weight: -0.0890, midparent: 0.3330 },
  '15.5': { intercept: 95.10, height: 0.9160, weight: -0.0880, midparent: 0.3320 },
  '16.0': { intercept: 102.70, height: 0.9240, weight: -0.0860, midparent: 0.3310 },
  '16.5': { intercept: 109.94, height: 0.9320, weight: -0.0840, midparent: 0.3300 },
  '17.0': { intercept: 117.18, height: 0.9400, weight: -0.0810, midparent: 0.3290 },
  '17.5': { intercept: 124.06, height: 0.9480, weight: -0.0780, midparent: 0.3290 },
};

// Height units conversion
const heightUnits: { [key: string]: { label: string; toCm: number } } = {
  'mm': { label: 'millimeters (mm)', toCm: 0.1 },
  'cm': { label: 'centimeters (cm)', toCm: 1 },
  'm': { label: 'meters (m)', toCm: 100 },
  'in': { label: 'inches (in)', toCm: 2.54 },
  'ft': { label: 'feet (ft)', toCm: 30.48 },
};

// Weight units conversion
const weightUnits: { [key: string]: { label: string; toKg: number } } = {
  'g': { label: 'grams (g)', toKg: 0.001 },
  'dag': { label: 'decagrams (dag)', toKg: 0.01 },
  'kg': { label: 'kilograms (kg)', toKg: 1 },
  'oz': { label: 'ounces (oz)', toKg: 0.0283495 },
  'lb': { label: 'pounds (lb)', toKg: 0.453592 },
  'st': { label: 'stones (st)', toKg: 6.35029 },
};

// Age options from 4 to 17.5 in 0.5 increments
const ageOptions = Array.from({ length: 28 }, (_, i) => {
  const age = 4 + i * 0.5;
  return { value: age.toFixed(1), label: `${age} years` };
});

export default function HeightCalculatorPage() {
  // Method 1: Khamis-Roche
  const [method1Open, setMethod1Open] = useState(true);
  const [kr_motherHeight, setKr_motherHeight] = useState('');
  const [kr_motherHeightUnit, setKr_motherHeightUnit] = useState('cm');
  const [kr_fatherHeight, setKr_fatherHeight] = useState('');
  const [kr_fatherHeightUnit, setKr_fatherHeightUnit] = useState('cm');
  const [kr_childSex, setKr_childSex] = useState<'boy' | 'girl'>('boy');
  const [kr_childAge, setKr_childAge] = useState('4.0');
  const [kr_childHeight, setKr_childHeight] = useState('');
  const [kr_childHeightUnit, setKr_childHeightUnit] = useState('cm');
  const [kr_childWeight, setKr_childWeight] = useState('');
  const [kr_childWeightUnit, setKr_childWeightUnit] = useState('kg');
  const [kr_resultUnit, setKr_resultUnit] = useState('cm');
  const [kr_result, setKr_result] = useState<number | null>(null);

  // Method 2: Mid-Parental Height
  const [method2Open, setMethod2Open] = useState(true);
  const [mp_motherHeight, setMp_motherHeight] = useState('');
  const [mp_motherHeightUnit, setMp_motherHeightUnit] = useState('cm');
  const [mp_fatherHeight, setMp_fatherHeight] = useState('');
  const [mp_fatherHeightUnit, setMp_fatherHeightUnit] = useState('cm');
  const [mp_girlResultUnit, setMp_girlResultUnit] = useState('cm');
  const [mp_boyResultUnit, setMp_boyResultUnit] = useState('cm');
  const [mp_girlResult, setMp_girlResult] = useState<number | null>(null);
  const [mp_boyResult, setMp_boyResult] = useState<number | null>(null);

  // Calculate Khamis-Roche prediction
  useEffect(() => {
    const motherCm = parseFloat(kr_motherHeight) * heightUnits[kr_motherHeightUnit].toCm;
    const fatherCm = parseFloat(kr_fatherHeight) * heightUnits[kr_fatherHeightUnit].toCm;
    const childCm = parseFloat(kr_childHeight) * heightUnits[kr_childHeightUnit].toCm;
    const childKg = parseFloat(kr_childWeight) * weightUnits[kr_childWeightUnit].toKg;

    if (motherCm > 0 && fatherCm > 0 && childCm > 0 && childKg > 0) {
      const midparentHeight = (motherCm + fatherCm) / 2;
      const coefficients = kr_childSex === 'boy' ? boysCoefficients[kr_childAge] : girlsCoefficients[kr_childAge];

      if (coefficients) {
        const predictedHeightCm =
          coefficients.intercept +
          coefficients.height * childCm +
          coefficients.weight * childKg +
          coefficients.midparent * midparentHeight;

        setKr_result(predictedHeightCm);
      }
    } else {
      setKr_result(null);
    }
  }, [kr_motherHeight, kr_motherHeightUnit, kr_fatherHeight, kr_fatherHeightUnit, kr_childSex, kr_childAge, kr_childHeight, kr_childHeightUnit, kr_childWeight, kr_childWeightUnit]);

  // Calculate Mid-Parental Height prediction
  useEffect(() => {
    const motherCm = parseFloat(mp_motherHeight) * heightUnits[mp_motherHeightUnit].toCm;
    const fatherCm = parseFloat(mp_fatherHeight) * heightUnits[mp_fatherHeightUnit].toCm;

    if (motherCm > 0 && fatherCm > 0) {
      // For girls: (mother's height + father's height - 13cm) / 2
      // For boys: (mother's height + father's height + 13cm) / 2
      const girlHeight = (motherCm + fatherCm - 13) / 2;
      const boyHeight = (motherCm + fatherCm + 13) / 2;

      setMp_girlResult(girlHeight);
      setMp_boyResult(boyHeight);
    } else {
      setMp_girlResult(null);
      setMp_boyResult(null);
    }
  }, [mp_motherHeight, mp_motherHeightUnit, mp_fatherHeight, mp_fatherHeightUnit]);

  // Convert cm to display unit
  const convertFromCm = (cm: number, unit: string): number => {
    return cm / heightUnits[unit].toCm;
  };

  // Format height with feet and inches
  const formatHeight = (cm: number, unit: string): string => {
    const value = convertFromCm(cm, unit);
    if (unit === 'ft') {
      const feet = Math.floor(value);
      const inches = (value - feet) * 12;
      return `${feet}' ${inches.toFixed(1)}"`;
    }
    return value.toFixed(2);
  };

  // Reset Method 1
  const resetMethod1 = () => {
    setKr_motherHeight('');
    setKr_fatherHeight('');
    setKr_childHeight('');
    setKr_childWeight('');
    setKr_childSex('boy');
    setKr_childAge('4.0');
    setKr_result(null);
  };

  // Reset Method 2
  const resetMethod2 = () => {
    setMp_motherHeight('');
    setMp_fatherHeight('');
    setMp_girlResult(null);
    setMp_boyResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/calculators" className="hover:text-blue-600 transition-colors">Calculators</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">Height Calculator</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
            <Ruler className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Height Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Predict your child&apos;s future adult height using two scientific methods:
            the Khamis-Roche Height Predictor and the Mid-Parental Height Calculator.
          </p>
        </div>

        {/* Calculator Section */}
        <div className="space-y-6">
          {/* Method 1: Khamis-Roche */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <button
              onClick={() => setMethod1Open(!method1Open)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {method1Open ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-blue-600" />}
                <h2 className="text-xl font-semibold text-gray-900">Method 1: The Khamis-Roche Height Predictor</h2>
              </div>
            </button>

            {method1Open && (
              <div className="px-6 pb-6 space-y-5">
                {/* Mother's Height */}
                <div>
                  <Label className="text-gray-700 font-medium">Mother&apos;s height</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="number"
                      value={kr_motherHeight}
                      onChange={(e) => setKr_motherHeight(e.target.value)}
                      placeholder="Enter height"
                      className="flex-1"
                    />
                    <Select value={kr_motherHeightUnit} onValueChange={setKr_motherHeightUnit}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(heightUnits).map(([key, { label }]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Father's Height */}
                <div>
                  <Label className="text-gray-700 font-medium">Father&apos;s height</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="number"
                      value={kr_fatherHeight}
                      onChange={(e) => setKr_fatherHeight(e.target.value)}
                      placeholder="Enter height"
                      className="flex-1"
                    />
                    <Select value={kr_fatherHeightUnit} onValueChange={setKr_fatherHeightUnit}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(heightUnits).map(([key, { label }]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Child's Sex */}
                <div>
                  <Label className="text-gray-700 font-medium">Child&apos;s sex</Label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="kr_sex"
                        checked={kr_childSex === 'boy'}
                        onChange={() => setKr_childSex('boy')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">Boy</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="kr_sex"
                        checked={kr_childSex === 'girl'}
                        onChange={() => setKr_childSex('girl')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">Girl</span>
                    </label>
                  </div>
                </div>

                {/* Child's Age */}
                <div>
                  <Label className="text-gray-700 font-medium">Child&apos;s age</Label>
                  <Select value={kr_childAge} onValueChange={setKr_childAge}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Child's Height */}
                <div>
                  <Label className="text-gray-700 font-medium">Child&apos;s height</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="number"
                      value={kr_childHeight}
                      onChange={(e) => setKr_childHeight(e.target.value)}
                      placeholder="Enter height"
                      className="flex-1"
                    />
                    <Select value={kr_childHeightUnit} onValueChange={setKr_childHeightUnit}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(heightUnits).map(([key, { label }]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Child's Weight */}
                <div>
                  <Label className="text-gray-700 font-medium">Child&apos;s weight</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="number"
                      value={kr_childWeight}
                      onChange={(e) => setKr_childWeight(e.target.value)}
                      placeholder="Enter weight"
                      className="flex-1"
                    />
                    <Select value={kr_childWeightUnit} onValueChange={setKr_childWeightUnit}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(weightUnits).map(([key, { label }]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Result */}
                <div>
                  <Label className="text-gray-700 font-medium">Child&apos;s future height</Label>
                  <div className="flex gap-2 mt-1">
                    <div className={`flex-1 px-4 py-3 rounded-lg border ${kr_result ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                      <span className={`text-lg font-semibold ${kr_result ? 'text-blue-700' : 'text-gray-400'}`}>
                        {kr_result ? formatHeight(kr_result, kr_resultUnit) : '—'}
                      </span>
                    </div>
                    <Select value={kr_resultUnit} onValueChange={setKr_resultUnit}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(heightUnits).map(([key, { label }]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {kr_result && (
                    <p className="text-sm text-gray-500 mt-2">
                      Margin of error: ±{kr_childSex === 'boy' ? '2.1' : '1.7'} inches ({kr_childSex === 'boy' ? '5.3' : '4.3'} cm)
                    </p>
                  )}
                </div>

                {/* Reset Button */}
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" onClick={resetMethod1} className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Clear all changes
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Method 2: Mid-Parental Height */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <button
              onClick={() => setMethod2Open(!method2Open)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {method2Open ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-blue-600" />}
                <h2 className="text-xl font-semibold text-gray-900">Method 2: Mid-Parental Height Calculator</h2>
              </div>
            </button>

            {method2Open && (
              <div className="px-6 pb-6 space-y-5">
                {/* Mother's Height */}
                <div>
                  <Label className="text-gray-700 font-medium">Mother&apos;s height</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="number"
                      value={mp_motherHeight}
                      onChange={(e) => setMp_motherHeight(e.target.value)}
                      placeholder="Enter height"
                      className="flex-1"
                    />
                    <Select value={mp_motherHeightUnit} onValueChange={setMp_motherHeightUnit}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(heightUnits).map(([key, { label }]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Father's Height */}
                <div>
                  <Label className="text-gray-700 font-medium">Father&apos;s height</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="number"
                      value={mp_fatherHeight}
                      onChange={(e) => setMp_fatherHeight(e.target.value)}
                      placeholder="Enter height"
                      className="flex-1"
                    />
                    <Select value={mp_fatherHeightUnit} onValueChange={setMp_fatherHeightUnit}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(heightUnits).map(([key, { label }]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Girl's Result */}
                <div>
                  <Label className="text-gray-700 font-medium">Girl&apos;s future height</Label>
                  <div className="flex gap-2 mt-1">
                    <div className={`flex-1 px-4 py-3 rounded-lg border ${mp_girlResult ? 'bg-pink-50 border-pink-200' : 'bg-gray-50 border-gray-200'}`}>
                      <span className={`text-lg font-semibold ${mp_girlResult ? 'text-pink-700' : 'text-gray-400'}`}>
                        {mp_girlResult ? formatHeight(mp_girlResult, mp_girlResultUnit) : '—'}
                      </span>
                    </div>
                    <Select value={mp_girlResultUnit} onValueChange={setMp_girlResultUnit}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(heightUnits).map(([key, { label }]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Boy's Result */}
                <div>
                  <Label className="text-gray-700 font-medium">Boy&apos;s future height</Label>
                  <div className="flex gap-2 mt-1">
                    <div className={`flex-1 px-4 py-3 rounded-lg border ${mp_boyResult ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                      <span className={`text-lg font-semibold ${mp_boyResult ? 'text-blue-700' : 'text-gray-400'}`}>
                        {mp_boyResult ? formatHeight(mp_boyResult, mp_boyResultUnit) : '—'}
                      </span>
                    </div>
                    <Select value={mp_boyResultUnit} onValueChange={setMp_boyResultUnit}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(heightUnits).map(([key, { label }]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {mp_girlResult && mp_boyResult && (
                  <p className="text-sm text-gray-500">
                    Margin of error: ±4 inches (10 cm) - This is a simpler estimation based only on parental heights.
                  </p>
                )}

                {/* Reset Button */}
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" onClick={resetMethod2} className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Clear all changes
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 space-y-10">
          {/* What is Height Prediction */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">What is Height Prediction?</h2>
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                Height prediction is the scientific estimation of a child&apos;s final adult height based on various factors
                including genetics (parental heights), current height and weight, age, and sex. While genetics plays a
                major role in determining height (accounting for about 60-80% of height variation), environmental factors
                like nutrition, health, and physical activity also influence growth.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Our calculator offers two scientifically-validated methods to predict your child&apos;s adult height:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li><strong>Khamis-Roche Method:</strong> The most accurate non-bone-age method, using child&apos;s current measurements</li>
                <li><strong>Mid-Parental Height Method:</strong> A simpler calculation based solely on parents&apos; heights</li>
              </ul>
            </div>
          </section>

          {/* Khamis-Roche Method Explained */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">The Khamis-Roche Method</h2>
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                The Khamis-Roche method was developed in 1994 by Dr. Harry Khamis and Dr. Alex Roche at Wright State
                University. It is considered the most accurate method for predicting adult height without requiring
                bone age assessment (X-ray of the hand).
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">The Formula</h3>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-center">
                <p className="text-gray-800">
                  H<sub>adult</sub> = β + (a<sub>h</sub> × h<sub>child</sub>) + (a<sub>w</sub> × w<sub>child</sub>) + (a<sub>p</sub> × h<sub>midparent</sub>)
                </p>
              </div>

              <div className="mt-4 text-gray-600">
                <p>Where:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>β</strong> = Intercept coefficient (varies by age and sex)</li>
                  <li><strong>a<sub>h</sub></strong> = Child&apos;s height coefficient</li>
                  <li><strong>a<sub>w</sub></strong> = Child&apos;s weight coefficient</li>
                  <li><strong>a<sub>p</sub></strong> = Midparent height coefficient</li>
                  <li><strong>h<sub>midparent</sub></strong> = (Mother&apos;s height + Father&apos;s height) ÷ 2</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Accuracy</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>For boys: ±2.1 inches (5.3 cm) margin of error</li>
                <li>For girls: ±1.7 inches (4.3 cm) margin of error</li>
                <li>90% accuracy rate when used correctly</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Limitations</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Developed primarily for Caucasian children (may be less accurate for other ethnicities)</li>
                <li>Only valid for ages 4-17.5 years</li>
                <li>Assumes normal growth without medical conditions affecting height</li>
              </ul>
            </div>
          </section>

          {/* Mid-Parental Height Method */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">The Mid-Parental Height Method</h2>
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                The Mid-Parental Height method (also called the Tanner method) is a simpler calculation that estimates
                a child&apos;s adult height based solely on the heights of both biological parents. While less accurate
                than the Khamis-Roche method, it provides a quick estimate when the child&apos;s current measurements
                aren&apos;t available.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">The Formulas</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">For Girls:</p>
                  <p className="font-mono text-gray-800">
                    Height = (Mother&apos;s height + Father&apos;s height − 13 cm) ÷ 2
                  </p>
                </div>
                <div className="text-center border-t pt-3">
                  <p className="text-sm text-gray-500 mb-1">For Boys:</p>
                  <p className="font-mono text-gray-800">
                    Height = (Mother&apos;s height + Father&apos;s height + 13 cm) ÷ 2
                  </p>
                </div>
              </div>

              <p className="text-gray-600 mt-4">
                The 13 cm (approximately 5 inches) adjustment accounts for the average height difference between
                adult males and females.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Accuracy</h3>
              <p className="text-gray-600">
                The mid-parental height method has a margin of error of approximately ±4 inches (10 cm). This larger
                margin exists because the method doesn&apos;t account for the child&apos;s current growth status.
              </p>
            </div>
          </section>

          {/* Factors Affecting Height */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Baby className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Factors Affecting Height</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Genetic Factors (60-80%)</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Parental heights</li>
                  <li>Family history of growth patterns</li>
                  <li>Ethnic background</li>
                  <li>Genetic variations affecting growth hormones</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Environmental Factors (20-40%)</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Nutrition quality</li>
                  <li>Sleep patterns</li>
                  <li>Physical activity</li>
                  <li>Overall health status</li>
                  <li>Hormonal balance</li>
                  <li>Socioeconomic conditions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Average Height by Age Table */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Average Height by Age (US CDC Data)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Age</th>
                    <th className="text-center py-3 px-4 font-semibold text-blue-600">Boys (cm)</th>
                    <th className="text-center py-3 px-4 font-semibold text-blue-600">Boys (ft&apos;in&quot;)</th>
                    <th className="text-center py-3 px-4 font-semibold text-pink-600">Girls (cm)</th>
                    <th className="text-center py-3 px-4 font-semibold text-pink-600">Girls (ft&apos;in&quot;)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="py-2 px-4">4 years</td><td className="text-center py-2 px-4">103</td><td className="text-center py-2 px-4">3&apos;5&quot;</td><td className="text-center py-2 px-4">101</td><td className="text-center py-2 px-4">3&apos;4&quot;</td></tr>
                  <tr className="bg-gray-50"><td className="py-2 px-4">6 years</td><td className="text-center py-2 px-4">116</td><td className="text-center py-2 px-4">3&apos;10&quot;</td><td className="text-center py-2 px-4">115</td><td className="text-center py-2 px-4">3&apos;9&quot;</td></tr>
                  <tr><td className="py-2 px-4">8 years</td><td className="text-center py-2 px-4">128</td><td className="text-center py-2 px-4">4&apos;2&quot;</td><td className="text-center py-2 px-4">127</td><td className="text-center py-2 px-4">4&apos;2&quot;</td></tr>
                  <tr className="bg-gray-50"><td className="py-2 px-4">10 years</td><td className="text-center py-2 px-4">138</td><td className="text-center py-2 px-4">4&apos;6&quot;</td><td className="text-center py-2 px-4">138</td><td className="text-center py-2 px-4">4&apos;6&quot;</td></tr>
                  <tr><td className="py-2 px-4">12 years</td><td className="text-center py-2 px-4">149</td><td className="text-center py-2 px-4">4&apos;11&quot;</td><td className="text-center py-2 px-4">152</td><td className="text-center py-2 px-4">5&apos;0&quot;</td></tr>
                  <tr className="bg-gray-50"><td className="py-2 px-4">14 years</td><td className="text-center py-2 px-4">164</td><td className="text-center py-2 px-4">5&apos;5&quot;</td><td className="text-center py-2 px-4">160</td><td className="text-center py-2 px-4">5&apos;3&quot;</td></tr>
                  <tr><td className="py-2 px-4">16 years</td><td className="text-center py-2 px-4">173</td><td className="text-center py-2 px-4">5&apos;8&quot;</td><td className="text-center py-2 px-4">163</td><td className="text-center py-2 px-4">5&apos;4&quot;</td></tr>
                  <tr className="bg-gray-50"><td className="py-2 px-4">18 years (Adult)</td><td className="text-center py-2 px-4">176</td><td className="text-center py-2 px-4">5&apos;9&quot;</td><td className="text-center py-2 px-4">163</td><td className="text-center py-2 px-4">5&apos;4&quot;</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQs */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How accurate is this height calculator?</h3>
                <p className="text-gray-600">
                  The Khamis-Roche method has a 90% accuracy rate with a margin of error of ±2.1 inches for boys and
                  ±1.7 inches for girls. The mid-parental method has a larger margin of ±4 inches but is useful for
                  quick estimates.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">At what age can I predict my child&apos;s height?</h3>
                <p className="text-gray-600">
                  The Khamis-Roche method works for children aged 4 to 17.5 years. For younger children, height
                  predictions are less reliable due to high variability in early growth patterns.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why is my child&apos;s weight needed for the prediction?</h3>
                <p className="text-gray-600">
                  Weight provides important information about a child&apos;s nutritional status and growth trajectory.
                  Children who are heavier for their age may be further along in their growth, affecting the prediction.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can medical conditions affect my child&apos;s predicted height?</h3>
                <p className="text-gray-600">
                  Yes. Growth hormone deficiencies, thyroid disorders, chronic illnesses, and other medical conditions
                  can significantly affect height. These predictions assume normal, healthy growth. Consult a pediatrician
                  if you have concerns about your child&apos;s growth.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why are there different predictions for different ethnicities?</h3>
                <p className="text-gray-600">
                  The Khamis-Roche method was developed using data from Caucasian American children. Different ethnic
                  populations may have different growth patterns, so the predictions may be less accurate for children
                  of other backgrounds.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">When do children stop growing?</h3>
                <p className="text-gray-600">
                  Girls typically stop growing around age 14-16, while boys continue growing until about 16-18 years old.
                  However, some individuals may continue growing slightly into their early 20s.
                </p>
              </div>
            </div>
          </section>

          {/* Related Calculators */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/calculators/bmi-calculator" className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <Calculator className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-700">BMI Calculator</span>
              </Link>
              <Link href="/calculators/age-calculator" className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <Calculator className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-700">Age Calculator</span>
              </Link>
              <Link href="/calculators/percentage-calculator" className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <Calculator className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-700">Percentage Calculator</span>
              </Link>
            </div>
          </section>
        </div>

        {/* Book Your Session CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need Help Understanding Growth Charts?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our expert tutors can help you understand child development, growth patterns, and more.
            Book a personalized tutoring session today!
          </p>
          <Link href="/book-session">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              Book Your Session
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
