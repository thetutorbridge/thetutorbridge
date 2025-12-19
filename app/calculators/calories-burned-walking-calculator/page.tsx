'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Flame,
  PersonStanding,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  Footprints,
  Scale,
  TrendingUp,
  Info,
  Calculator,
  Zap
} from 'lucide-react';

type WeightUnit = 'kg' | 'lb';
type DistanceUnit = 'km' | 'mi' | 'm' | 'ft';
type SpeedUnit = 'km/h' | 'mph' | 'm/min';
type TimeUnit = 'min' | 'hrs';

interface SlopeOption {
  label: string;
  value: number;
  met: number;
}

export default function CaloriesBurnedWalkingCalculator() {
  // Inputs
  const [weight, setWeight] = useState<string>('70');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [slope, setSlope] = useState<string>('0%');
  const [steps, setSteps] = useState<string>('');
  const [distance, setDistance] = useState<string>('');
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('km');
  const [walkingTime, setWalkingTime] = useState<string>('');
  const [timeUnit, setTimeUnit] = useState<TimeUnit>('min');
  const [walkingSpeed, setWalkingSpeed] = useState<string>('');
  const [speedUnit, setSpeedUnit] = useState<SpeedUnit>('km/h');

  // Input field tracking
  const [activeInput, setActiveInput] = useState<'steps' | 'distance' | 'time' | null>(null);

  // Results
  const [calories, setCalories] = useState<number | null>(null);
  const [weightLost, setWeightLost] = useState<number | null>(null);

  // UI state
  const [showFAQ, setShowFAQ] = useState<number | null>(null);

  // Slope options with MET values
  const slopeOptions: SlopeOption[] = [
    { label: '-15% (steep downhill)', value: -15, met: 2.8 },
    { label: '-10%', value: -10, met: 3.0 },
    { label: '-5%', value: -5, met: 3.3 },
    { label: '0% (flat)', value: 0, met: 3.5 },
    { label: '5%', value: 5, met: 5.0 },
    { label: '10%', value: 10, met: 6.3 },
    { label: '15% (steep uphill)', value: 15, met: 7.5 },
  ];

  // MET values for different walking speeds (flat ground, adjustable by slope)
  const getBaseMET = (speedKmh: number): number => {
    if (speedKmh <= 2.7) return 2.0; // Very slow
    if (speedKmh <= 4.0) return 2.8; // Slow
    if (speedKmh <= 4.8) return 3.3; // Moderate slow
    if (speedKmh <= 5.6) return 3.5; // Moderate
    if (speedKmh <= 6.4) return 4.3; // Brisk
    if (speedKmh <= 7.2) return 5.0; // Fast
    return 6.0; // Very fast
  };

  // Convert weight to kg
  const getWeightInKg = (): number => {
    const w = parseFloat(weight) || 0;
    return weightUnit === 'lb' ? w * 0.453592 : w;
  };

  // Convert distance to km
  const getDistanceInKm = (): number => {
    const d = parseFloat(distance) || 0;
    switch (distanceUnit) {
      case 'mi': return d * 1.60934;
      case 'm': return d / 1000;
      case 'ft': return d * 0.0003048;
      default: return d;
    }
  };

  // Convert time to minutes
  const getTimeInMinutes = (): number => {
    const t = parseFloat(walkingTime) || 0;
    return timeUnit === 'hrs' ? t * 60 : t;
  };

  // Convert speed to km/h
  const getSpeedInKmh = (): number => {
    const s = parseFloat(walkingSpeed) || 0;
    switch (speedUnit) {
      case 'mph': return s * 1.60934;
      case 'm/min': return s * 0.06;
      default: return s;
    }
  };

  // Average stride length based on height/sex
  const getStrideLength = (): number => {
    // Average stride length in meters
    return sex === 'male' ? 0.762 : 0.67; // Male: 2.5 ft, Female: 2.2 ft
  };

  // Calculate calories
  useEffect(() => {
    const weightKg = getWeightInKg();
    if (weightKg <= 0) {
      setCalories(null);
      setWeightLost(null);
      return;
    }

    // Get slope MET modifier
    const selectedSlope = slopeOptions.find(s => s.label.startsWith(slope)) || slopeOptions[3];
    let met = selectedSlope.met;

    // Get speed if available and adjust MET
    const speedKmh = getSpeedInKmh();
    if (speedKmh > 0) {
      const baseMET = getBaseMET(speedKmh);
      // Blend speed MET with slope MET
      met = baseMET + (selectedSlope.met - 3.5);
    }

    let durationMinutes = 0;

    // Calculate duration based on available inputs
    const stepsNum = parseFloat(steps) || 0;
    const distanceKm = getDistanceInKm();
    const timeMinutes = getTimeInMinutes();

    if (activeInput === 'steps' && stepsNum > 0) {
      // Steps to distance, then to time
      const strideM = getStrideLength();
      const distFromSteps = (stepsNum * strideM) / 1000; // km
      const avgSpeedKmh = speedKmh > 0 ? speedKmh : 5; // Default 5 km/h
      durationMinutes = (distFromSteps / avgSpeedKmh) * 60;
    } else if (activeInput === 'distance' && distanceKm > 0) {
      // Distance to time
      const avgSpeedKmh = speedKmh > 0 ? speedKmh : 5;
      durationMinutes = (distanceKm / avgSpeedKmh) * 60;
    } else if (activeInput === 'time' && timeMinutes > 0) {
      durationMinutes = timeMinutes;
    } else if (stepsNum > 0) {
      const strideM = getStrideLength();
      const distFromSteps = (stepsNum * strideM) / 1000;
      const avgSpeedKmh = speedKmh > 0 ? speedKmh : 5;
      durationMinutes = (distFromSteps / avgSpeedKmh) * 60;
    } else if (distanceKm > 0) {
      const avgSpeedKmh = speedKmh > 0 ? speedKmh : 5;
      durationMinutes = (distanceKm / avgSpeedKmh) * 60;
    } else if (timeMinutes > 0) {
      durationMinutes = timeMinutes;
    }

    if (durationMinutes > 0) {
      // Calories = MET × weight (kg) × time (hours)
      const hours = durationMinutes / 60;
      const caloriesBurned = met * weightKg * hours;
      setCalories(Math.round(caloriesBurned));

      // Weight lost (1 kg = ~7700 kcal)
      const weightLostKg = caloriesBurned / 7700;
      setWeightLost(weightLostKg);
    } else {
      setCalories(null);
      setWeightLost(null);
    }
  }, [weight, weightUnit, sex, slope, steps, distance, distanceUnit, walkingTime, timeUnit, walkingSpeed, speedUnit, activeInput]);

  // Update related fields when one changes
  const handleStepsChange = (value: string) => {
    setSteps(value);
    setActiveInput('steps');

    const stepsNum = parseFloat(value) || 0;
    if (stepsNum > 0) {
      const strideM = getStrideLength();
      const distKm = (stepsNum * strideM) / 1000;

      // Update distance
      let displayDist: number;
      switch (distanceUnit) {
        case 'mi': displayDist = distKm / 1.60934; break;
        case 'm': displayDist = distKm * 1000; break;
        case 'ft': displayDist = distKm / 0.0003048; break;
        default: displayDist = distKm;
      }
      setDistance(displayDist.toFixed(2));

      // Update time if speed is set
      const speedKmh = getSpeedInKmh();
      if (speedKmh > 0) {
        const timeMin = (distKm / speedKmh) * 60;
        setWalkingTime(timeUnit === 'hrs' ? (timeMin / 60).toFixed(2) : timeMin.toFixed(0));
      }
    }
  };

  const handleDistanceChange = (value: string) => {
    setDistance(value);
    setActiveInput('distance');

    const distKm = (() => {
      const d = parseFloat(value) || 0;
      switch (distanceUnit) {
        case 'mi': return d * 1.60934;
        case 'm': return d / 1000;
        case 'ft': return d * 0.0003048;
        default: return d;
      }
    })();

    if (distKm > 0) {
      // Update steps
      const strideM = getStrideLength();
      const stepsCalc = (distKm * 1000) / strideM;
      setSteps(Math.round(stepsCalc).toString());

      // Update time if speed is set
      const speedKmh = getSpeedInKmh();
      if (speedKmh > 0) {
        const timeMin = (distKm / speedKmh) * 60;
        setWalkingTime(timeUnit === 'hrs' ? (timeMin / 60).toFixed(2) : timeMin.toFixed(0));
      }
    }
  };

  const handleTimeChange = (value: string) => {
    setWalkingTime(value);
    setActiveInput('time');

    const timeMin = (() => {
      const t = parseFloat(value) || 0;
      return timeUnit === 'hrs' ? t * 60 : t;
    })();

    const speedKmh = getSpeedInKmh();
    if (timeMin > 0 && speedKmh > 0) {
      const distKm = (speedKmh * timeMin) / 60;

      // Update distance
      let displayDist: number;
      switch (distanceUnit) {
        case 'mi': displayDist = distKm / 1.60934; break;
        case 'm': displayDist = distKm * 1000; break;
        case 'ft': displayDist = distKm / 0.0003048; break;
        default: displayDist = distKm;
      }
      setDistance(displayDist.toFixed(2));

      // Update steps
      const strideM = getStrideLength();
      const stepsCalc = (distKm * 1000) / strideM;
      setSteps(Math.round(stepsCalc).toString());
    }
  };

  const faqs = [
    {
      question: "How many calories does walking 10,000 steps burn?",
      answer: "Walking 10,000 steps burns approximately 400-500 calories for an average adult (70 kg). The exact amount varies based on your weight, walking speed, and terrain. A heavier person will burn more calories, while walking uphill significantly increases calorie burn."
    },
    {
      question: "How many calories does walking 1 hour burn?",
      answer: "Walking for 1 hour typically burns 200-500 calories depending on your weight and pace. At a moderate pace (5 km/h), a 70 kg person burns about 280 calories. Walking briskly (6.5 km/h) or uphill can burn 400+ calories per hour."
    },
    {
      question: "Does walking speed affect calories burned?",
      answer: "Yes, walking speed significantly affects calorie burn. Faster walking requires more energy and has a higher MET (Metabolic Equivalent of Task) value. Walking at 6.5 km/h burns about 40% more calories than walking at 4 km/h for the same duration."
    },
    {
      question: "How much weight can I lose by walking?",
      answer: "To lose 1 kg of body fat, you need to burn approximately 7,700 calories. Walking 10,000 steps daily (about 500 calories) could help you lose roughly 0.5 kg per week, assuming your diet remains constant. Combining walking with proper nutrition yields best results."
    },
    {
      question: "Is walking uphill better for burning calories?",
      answer: "Yes, walking uphill burns significantly more calories than flat terrain. A 10% incline can increase calorie burn by 50-80% compared to walking on flat ground. This is because your muscles work harder against gravity, increasing the exercise intensity."
    },
    {
      question: "How many steps should I walk daily for weight loss?",
      answer: "For weight loss, aim for 10,000-12,000 steps per day, which is about 7-9 km. Research shows that 7,500-8,000 steps daily significantly reduces mortality risk. Start with your current level and gradually increase by 1,000-2,000 steps weekly."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calories Burned Walking Calculator",
    "description": "Calculate calories burned while walking based on weight, distance, time, steps, speed, and terrain slope. Includes treadmill and outdoor walking.",
    "url": "https://www.thetutorbridge.com/calculators/calories-burned-walking-calculator",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "The Tutor Bridge"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

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
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2BAE66]/10 mb-4">
              <Flame className="w-8 h-8 text-[#2BAE66]" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Calories Burned Walking Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Calculate calories burned while walking on treadmill or outdoors. Works with steps, distance, or time.
            </p>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-blue-800 text-sm flex items-start gap-2">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                You can use this calculator to estimate calories burned while using a treadmill or walking outside (even up or downhill).
              </p>
            </div>

            <div className="space-y-6">
              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your weight
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent"
                      placeholder="70"
                    />
                  </div>
                  <select
                    value={weightUnit}
                    onChange={(e) => setWeightUnit(e.target.value as WeightUnit)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent bg-white"
                  >
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                  </select>
                </div>
              </div>

              {/* Sex */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sex
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sex"
                      value="male"
                      checked={sex === 'male'}
                      onChange={() => setSex('male')}
                      className="w-5 h-5 text-[#2BAE66] focus:ring-[#2BAE66]"
                    />
                    <PersonStanding className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Male</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sex"
                      value="female"
                      checked={sex === 'female'}
                      onChange={() => setSex('female')}
                      className="w-5 h-5 text-[#2BAE66] focus:ring-[#2BAE66]"
                    />
                    <PersonStanding className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Female</span>
                  </label>
                </div>
              </div>

              {/* Slope */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  Slope
                  <span className="text-xs text-gray-500">(incline/decline)</span>
                </label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={slope}
                    onChange={(e) => setSlope(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent bg-white appearance-none"
                  >
                    {slopeOptions.map(option => (
                      <option key={option.label} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Steps */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Steps
                </label>
                <div className="relative">
                  <Footprints className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={steps}
                    onChange={(e) => handleStepsChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent"
                    placeholder="10000"
                  />
                </div>
              </div>

              {/* Distance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={distance}
                      onChange={(e) => handleDistanceChange(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent"
                      placeholder="5"
                    />
                  </div>
                  <select
                    value={distanceUnit}
                    onChange={(e) => setDistanceUnit(e.target.value as DistanceUnit)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent bg-white"
                  >
                    <option value="km">km</option>
                    <option value="mi">mi</option>
                    <option value="m">m</option>
                    <option value="ft">ft</option>
                  </select>
                </div>
              </div>

              {/* Walking Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Walking time
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={walkingTime}
                      onChange={(e) => handleTimeChange(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent"
                      placeholder="60"
                    />
                  </div>
                  <select
                    value={timeUnit}
                    onChange={(e) => setTimeUnit(e.target.value as TimeUnit)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent bg-white"
                  >
                    <option value="min">min</option>
                    <option value="hrs">hrs</option>
                  </select>
                </div>
              </div>

              {/* Walking Speed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Walking speed
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={walkingSpeed}
                      onChange={(e) => setWalkingSpeed(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent"
                      placeholder="5"
                    />
                  </div>
                  <select
                    value={speedUnit}
                    onChange={(e) => setSpeedUnit(e.target.value as SpeedUnit)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent bg-white"
                  >
                    <option value="km/h">km/h</option>
                    <option value="mph">mph</option>
                    <option value="m/min">m/min</option>
                  </select>
                </div>
              </div>

              {/* Results */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                {/* Calories */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calories
                  </label>
                  <div className="relative">
                    <Flame className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
                    <input
                      type="text"
                      value={calories !== null ? `${calories}` : '—'}
                      readOnly
                      className="w-full pl-10 pr-16 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-800 font-semibold"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">kcal</span>
                  </div>
                </div>

                {/* Weight Lost */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight lost
                  </label>
                  <div className="relative">
                    <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#2BAE66]" />
                    <input
                      type="text"
                      value={weightLost !== null ? (weightLost * 1000).toFixed(1) : '—'}
                      readOnly
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-800 font-semibold"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">g</span>
                  </div>
                  {weightLost !== null && weightLost > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      ≈ {(weightLost * 1000 * 0.035274).toFixed(2)} oz | {weightLost.toFixed(4)} kg
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Results Summary */}
            {calories !== null && calories > 0 && (
              <div className="bg-gradient-to-r from-[#2BAE66] to-[#1A3D7C] rounded-xl p-6 text-white mt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Flame className="w-5 h-5" />
                  Your Walking Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <p className="text-sm opacity-80">Calories Burned</p>
                    <p className="text-2xl font-bold">{calories}</p>
                    <p className="text-xs opacity-70">kcal</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <p className="text-sm opacity-80">Weight Lost</p>
                    <p className="text-2xl font-bold">{weightLost ? (weightLost * 1000).toFixed(0) : '0'}</p>
                    <p className="text-xs opacity-70">grams</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <p className="text-sm opacity-80">Steps</p>
                    <p className="text-2xl font-bold">{steps || '—'}</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <p className="text-sm opacity-80">Distance</p>
                    <p className="text-2xl font-bold">{distance || '—'}</p>
                    <p className="text-xs opacity-70">{distanceUnit}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* How to Use */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-[#1A3D7C]" />
              How to Use This Calculator
            </h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold">1</span>
                <p><strong>Enter your weight</strong> - This is the most important factor for calculating calories burned.</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold">2</span>
                <p><strong>Select terrain slope</strong> - Choose flat (0%) or uphill/downhill for more accurate results.</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold">3</span>
                <p><strong>Enter any one:</strong> steps, distance, or walking time. The calculator will estimate the others.</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold">4</span>
                <p><strong>Optional: Add walking speed</strong> for more precise calorie calculations based on your pace.</p>
              </div>
            </div>
          </div>

          {/* Calorie Burn Formula */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Walking Calorie Burn Formula</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <p className="text-center text-lg font-mono text-[#1A3D7C]">
                Calories = MET × Weight (kg) × Time (hours)
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                <strong>MET (Metabolic Equivalent of Task)</strong> represents the energy cost of physical activities. Walking has different MET values based on speed and terrain:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Activity</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">MET Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr><td className="py-2 px-3">Slow walking (3 km/h)</td><td className="py-2 px-3 text-[#2BAE66] font-medium">2.0</td></tr>
                    <tr><td className="py-2 px-3">Moderate walking (4.5 km/h)</td><td className="py-2 px-3 text-[#2BAE66] font-medium">3.3</td></tr>
                    <tr><td className="py-2 px-3">Brisk walking (5.5 km/h)</td><td className="py-2 px-3 text-[#2BAE66] font-medium">3.5</td></tr>
                    <tr><td className="py-2 px-3">Fast walking (6.5 km/h)</td><td className="py-2 px-3 text-[#2BAE66] font-medium">5.0</td></tr>
                    <tr><td className="py-2 px-3">Walking uphill (10% grade)</td><td className="py-2 px-3 text-[#2BAE66] font-medium">6.3</td></tr>
                    <tr><td className="py-2 px-3">Walking downhill (-10% grade)</td><td className="py-2 px-3 text-[#2BAE66] font-medium">3.0</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Calories by Steps Table */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Calories Burned by Steps</h2>
            <p className="text-gray-600 mb-4">Approximate calories burned for different step counts (70 kg person, moderate pace):</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Steps</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Distance</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Calories</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="py-3 px-4">1,000</td><td className="py-3 px-4">0.76 km</td><td className="py-3 px-4">~9 min</td><td className="py-3 px-4 text-[#2BAE66] font-medium">~40 kcal</td></tr>
                  <tr><td className="py-3 px-4">2,500</td><td className="py-3 px-4">1.9 km</td><td className="py-3 px-4">~23 min</td><td className="py-3 px-4 text-[#2BAE66] font-medium">~100 kcal</td></tr>
                  <tr><td className="py-3 px-4">5,000</td><td className="py-3 px-4">3.8 km</td><td className="py-3 px-4">~45 min</td><td className="py-3 px-4 text-[#2BAE66] font-medium">~200 kcal</td></tr>
                  <tr><td className="py-3 px-4">7,500</td><td className="py-3 px-4">5.7 km</td><td className="py-3 px-4">~68 min</td><td className="py-3 px-4 text-[#2BAE66] font-medium">~300 kcal</td></tr>
                  <tr><td className="py-3 px-4">10,000</td><td className="py-3 px-4">7.6 km</td><td className="py-3 px-4">~90 min</td><td className="py-3 px-4 text-[#2BAE66] font-medium">~400 kcal</td></tr>
                  <tr><td className="py-3 px-4">15,000</td><td className="py-3 px-4">11.4 km</td><td className="py-3 px-4">~135 min</td><td className="py-3 px-4 text-[#2BAE66] font-medium">~600 kcal</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Health Benefits */}
          <div className="bg-[#2BAE66]/5 rounded-2xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Info className="w-6 h-6 text-[#2BAE66]" />
              Health Benefits of Walking
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-[#1A3D7C] mb-2">Cardiovascular Health</h3>
                <p className="text-gray-600 text-sm">Walking 7,500-10,000 steps daily reduces heart disease risk by up to 40%.</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-[#1A3D7C] mb-2">Weight Management</h3>
                <p className="text-gray-600 text-sm">Regular walking burns calories and boosts metabolism for sustainable weight loss.</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-[#1A3D7C] mb-2">Mental Wellbeing</h3>
                <p className="text-gray-600 text-sm">Walking releases endorphins, reduces stress, and improves mood and sleep quality.</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-[#1A3D7C] mb-2">Joint Health</h3>
                <p className="text-gray-600 text-sm">Low-impact exercise strengthens muscles around joints without excessive stress.</p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowFAQ(showFAQ === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {showFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-[#2BAE66]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#2BAE66]" />
                    )}
                  </button>
                  {showFAQ === index && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#2BAE66] to-[#1A3D7C] rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Need Help With Fitness & Health Goals?</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Our expert tutors can help you understand nutrition, exercise science, and healthy living. Book a session today!
            </p>
            <a
              href="/book-session"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1A3D7C] font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Book Your Session
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
