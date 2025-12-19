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
import { Calculator, RotateCcw, Info, Heart, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';

type Unit = 'cm' | 'in';

interface BodyShape {
  name: string;
  description: string;
  characteristics: string[];
  fashionTips: string[];
  celebrities: string[];
  icon: string;
}

const bodyShapes: Record<string, BodyShape> = {
  hourglass: {
    name: 'Hourglass',
    description: 'Your bust and hips are nearly equal in size with a well-defined, narrow waist. This is considered the classic proportional figure.',
    characteristics: [
      'Bust and hips approximately the same width',
      'Well-defined waist (significantly smaller than bust and hips)',
      'Curves are balanced top and bottom',
      'Weight tends to distribute evenly',
    ],
    fashionTips: [
      'Fitted clothing that emphasizes your waist',
      'Wrap dresses and belted styles',
      'High-waisted bottoms',
      'V-necklines and scoop necks',
      'Avoid boxy or shapeless clothing',
    ],
    celebrities: ['Scarlett Johansson', 'Sofia Vergara', 'Marilyn Monroe', 'Kim Kardashian'],
    icon: '⌛',
  },
  pear: {
    name: 'Pear (Triangle)',
    description: 'Your hips are wider than your bust, with a defined waist. Your lower body is the fullest part of your figure.',
    characteristics: [
      'Hips wider than bust and shoulders',
      'Defined waistline',
      'Narrower upper body',
      'Weight tends to accumulate in hips and thighs',
    ],
    fashionTips: [
      'Draw attention upward with statement tops',
      'Boat necks and off-shoulder styles',
      'A-line skirts and dresses',
      'Dark-colored bottoms',
      'Structured jackets to balance proportions',
    ],
    celebrities: ['Beyoncé', 'Jennifer Lopez', 'Shakira', 'Rihanna'],
    icon: '🍐',
  },
  apple: {
    name: 'Apple (Round)',
    description: 'You carry weight around your midsection with a fuller waist. Your bust is often larger, and legs tend to be slimmer.',
    characteristics: [
      'Fuller midsection and waist',
      'Bust typically larger than hips',
      'Less defined waistline',
      'Slimmer legs and arms',
    ],
    fashionTips: [
      'Empire waistlines and A-line silhouettes',
      'V-necks to elongate the torso',
      'Flowing fabrics around the midsection',
      'Structured tops with detail at shoulders',
      'Show off your legs with shorter hemlines',
    ],
    celebrities: ['Adele', 'Queen Latifah', 'Melissa McCarthy', 'Rebel Wilson'],
    icon: '🍎',
  },
  rectangle: {
    name: 'Rectangle (Straight)',
    description: 'Your bust, waist, and hips are similar in width, creating a straight silhouette. Your figure is athletic and balanced.',
    characteristics: [
      'Bust, waist, and hips roughly the same width',
      'Less defined waistline',
      'Athletic or straight build',
      'Weight distributes evenly throughout body',
    ],
    fashionTips: [
      'Create curves with belted styles',
      'Peplum tops and ruffled details',
      'Layered outfits to add dimension',
      'Off-shoulder and sweetheart necklines',
      'Textured fabrics and patterns',
    ],
    celebrities: ['Cameron Diaz', 'Natalie Portman', 'Kate Middleton', 'Nicole Kidman'],
    icon: '▭',
  },
  invertedTriangle: {
    name: 'Inverted Triangle',
    description: 'Your shoulders and bust are wider than your hips. You have a strong upper body with a narrower lower half.',
    characteristics: [
      'Shoulders wider than hips',
      'Bust larger than hips',
      'Narrow hips and slimmer legs',
      'Athletic build with broad shoulders',
    ],
    fashionTips: [
      'Draw attention to lower body with bold bottoms',
      'A-line and flared skirts',
      'Wide-leg pants',
      'V-necks to soften shoulders',
      'Avoid shoulder pads and boat necks',
    ],
    celebrities: ['Angelina Jolie', 'Naomi Campbell', 'Demi Moore', 'Renée Zellweger'],
    icon: '🔻',
  },
  spoon: {
    name: 'Spoon',
    description: 'Your hips are significantly larger than your bust with a clearly defined waist. Similar to pear but with more pronounced hip curves.',
    characteristics: [
      'Hips much larger than bust',
      'Clearly defined waist',
      'Hip "shelf" appearance',
      'Narrower shoulders and bust',
    ],
    fashionTips: [
      'Structured tops to balance proportions',
      'Statement necklaces and earrings',
      'A-line dresses starting at waist',
      'Dark-colored bottoms',
      'Avoid clingy fabrics on hips',
    ],
    celebrities: ['Jennifer Love Hewitt', 'America Ferrera'],
    icon: '🥄',
  },
};

export default function BodyShapeCalculatorPage() {
  const [bust, setBust] = useState<string>('');
  const [waist, setWaist] = useState<string>('');
  const [highHip, setHighHip] = useState<string>('');
  const [hips, setHips] = useState<string>('');
  const [unit, setUnit] = useState<Unit>('cm');
  const [result, setResult] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState<string | null>(null);

  const measurementInfo: Record<string, string> = {
    bust: 'Measure around the fullest part of your chest, keeping the tape parallel to the ground.',
    waist: 'Measure around the narrowest part of your natural waist, usually just above the belly button.',
    highHip: 'Measure around your body at the top of your hip bones, about 3-4 inches below your waist.',
    hips: 'Measure around the fullest part of your hips and buttocks, keeping feet together.',
  };

  const calculateBodyShape = () => {
    const bustVal = parseFloat(bust);
    const waistVal = parseFloat(waist);
    const hipsVal = parseFloat(hips);

    if (isNaN(bustVal) || isNaN(waistVal) || isNaN(hipsVal)) {
      return null;
    }

    if (bustVal <= 0 || waistVal <= 0 || hipsVal <= 0) {
      return null;
    }

    // Calculate ratios
    const waistToBust = waistVal / bustVal;
    const waistToHips = waistVal / hipsVal;
    const bustToHips = bustVal / hipsVal;
    const hipsToBust = hipsVal / bustVal;

    // Difference thresholds (in same unit as input)
    const threshold = unit === 'cm' ? 7.5 : 3; // ~3 inches = ~7.5 cm

    // Determine body shape based on ratios and differences
    // Hourglass: bust and hips within 5% of each other, waist is at least 25% smaller
    if (
      Math.abs(bustVal - hipsVal) <= threshold &&
      waistVal < bustVal * 0.83 &&
      waistVal < hipsVal * 0.83
    ) {
      return 'hourglass';
    }

    // Inverted Triangle: bust is notably larger than hips
    if (bustVal > hipsVal + threshold && waistVal < bustVal) {
      return 'invertedTriangle';
    }

    // Pear/Triangle: hips are notably larger than bust
    if (hipsVal > bustVal + threshold && waistVal < hipsVal * 0.9) {
      return 'pear';
    }

    // Spoon: hips much larger than bust with defined waist
    if (hipsVal > bustVal * 1.15 && waistVal < hipsVal * 0.8) {
      return 'spoon';
    }

    // Apple: waist is close to or larger than bust/hips
    if (waistVal >= bustVal * 0.85 && waistVal >= hipsVal * 0.85) {
      return 'apple';
    }

    // Rectangle: all measurements within similar range, less defined waist
    if (
      Math.abs(bustVal - hipsVal) <= threshold &&
      waistVal >= bustVal * 0.75 &&
      waistVal >= hipsVal * 0.75
    ) {
      return 'rectangle';
    }

    // Default to rectangle if no clear shape
    return 'rectangle';
  };

  useEffect(() => {
    const shape = calculateBodyShape();
    setResult(shape);
  }, [bust, waist, highHip, hips, unit]);

  const handleReset = () => {
    setBust('');
    setWaist('');
    setHighHip('');
    setHips('');
    setResult(null);
  };

  const convertUnit = (value: string, from: Unit, to: Unit): string => {
    if (!value) return '';
    const numVal = parseFloat(value);
    if (isNaN(numVal)) return '';

    if (from === 'cm' && to === 'in') {
      return (numVal / 2.54).toFixed(1);
    } else if (from === 'in' && to === 'cm') {
      return (numVal * 2.54).toFixed(1);
    }
    return value;
  };

  const handleUnitChange = (newUnit: Unit) => {
    if (newUnit !== unit) {
      setBust(convertUnit(bust, unit, newUnit));
      setWaist(convertUnit(waist, unit, newUnit));
      setHighHip(convertUnit(highHip, unit, newUnit));
      setHips(convertUnit(hips, unit, newUnit));
      setUnit(newUnit);
    }
  };

  const currentShape = result ? bodyShapes[result] : null;

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Body Shape Calculator',
    description: 'Free body shape calculator to determine your body type based on bust, waist, and hip measurements. Get personalized fashion tips for your body shape.',
    url: 'https://www.thetutorbridge.com/calculators/body-shape-calculator',
    applicationCategory: 'HealthApplication',
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
        name: 'What are the different body shapes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The main body shapes are: Hourglass (bust and hips equal with narrow waist), Pear/Triangle (hips wider than bust), Apple/Round (fuller midsection), Rectangle/Straight (similar measurements throughout), Inverted Triangle (shoulders wider than hips), and Spoon (pronounced hip curves).',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I measure my body for body shape?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Measure your bust around the fullest part of your chest, your waist at the narrowest part (usually above the belly button), and your hips at the widest point of your buttocks. Keep the tape measure parallel to the ground and snug but not tight.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I change my body shape?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your basic body shape is largely determined by genetics and bone structure, which cannot be changed. However, you can modify your appearance through exercise to build muscle in specific areas, maintain a healthy weight, and choose clothing that flatters your natural shape.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the ideal body shape?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'There is no "ideal" body shape - all body shapes are beautiful and unique. The hourglass figure has been historically idealized in some cultures, but beauty standards vary across time and cultures. The key is to embrace and dress for your natural body shape.',
        },
      },
    ],
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
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-[#1A3D7C] to-[#2563eb]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Body Shape Calculator
              </h1>
              <p className="text-lg md:text-xl text-blue-100">
                Discover your body shape and get personalized fashion tips. Enter your measurements to find out if you&apos;re an hourglass, pear, apple, rectangle, or inverted triangle.
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
                    Your Measurements
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

                {/* Unit Selection */}
                <div className="mb-6">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Unit
                  </Label>
                  <Select value={unit} onValueChange={(v) => handleUnitChange(v as Unit)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">Centimeters (cm)</SelectItem>
                      <SelectItem value="in">Inches (in)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Measurement Inputs */}
                <div className="space-y-5">
                  {/* Bust */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Bust
                      </Label>
                      <button
                        onClick={() => setShowInfo(showInfo === 'bust' ? null : 'bust')}
                        className="text-gray-400 hover:text-[#1A3D7C] transition-colors"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    {showInfo === 'bust' && (
                      <p className="text-xs text-gray-500 mb-2 bg-blue-50 p-2 rounded">
                        {measurementInfo.bust}
                      </p>
                    )}
                    <div className="relative">
                      <Input
                        type="number"
                        value={bust}
                        onChange={(e) => setBust(e.target.value)}
                        placeholder={`Enter bust measurement`}
                        className="pr-12"
                        min="0"
                        step="0.1"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        {unit}
                      </span>
                    </div>
                  </div>

                  {/* Waist */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Waist
                      </Label>
                      <button
                        onClick={() => setShowInfo(showInfo === 'waist' ? null : 'waist')}
                        className="text-gray-400 hover:text-[#1A3D7C] transition-colors"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    {showInfo === 'waist' && (
                      <p className="text-xs text-gray-500 mb-2 bg-blue-50 p-2 rounded">
                        {measurementInfo.waist}
                      </p>
                    )}
                    <div className="relative">
                      <Input
                        type="number"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        placeholder={`Enter waist measurement`}
                        className="pr-12"
                        min="0"
                        step="0.1"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        {unit}
                      </span>
                    </div>
                  </div>

                  {/* High Hip (Optional) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium text-gray-700">
                        High Hip <span className="text-gray-400 text-xs">(Optional)</span>
                      </Label>
                      <button
                        onClick={() => setShowInfo(showInfo === 'highHip' ? null : 'highHip')}
                        className="text-gray-400 hover:text-[#1A3D7C] transition-colors"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    {showInfo === 'highHip' && (
                      <p className="text-xs text-gray-500 mb-2 bg-blue-50 p-2 rounded">
                        {measurementInfo.highHip}
                      </p>
                    )}
                    <div className="relative">
                      <Input
                        type="number"
                        value={highHip}
                        onChange={(e) => setHighHip(e.target.value)}
                        placeholder={`Enter high hip measurement`}
                        className="pr-12"
                        min="0"
                        step="0.1"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        {unit}
                      </span>
                    </div>
                  </div>

                  {/* Hips */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Hips
                      </Label>
                      <button
                        onClick={() => setShowInfo(showInfo === 'hips' ? null : 'hips')}
                        className="text-gray-400 hover:text-[#1A3D7C] transition-colors"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    {showInfo === 'hips' && (
                      <p className="text-xs text-gray-500 mb-2 bg-blue-50 p-2 rounded">
                        {measurementInfo.hips}
                      </p>
                    )}
                    <div className="relative">
                      <Input
                        type="number"
                        value={hips}
                        onChange={(e) => setHips(e.target.value)}
                        placeholder={`Enter hip measurement`}
                        className="pr-12"
                        min="0"
                        step="0.1"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        {unit}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Measurement Guide */}
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    Measurement Tips
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use a soft measuring tape</li>
                    <li>• Stand straight with feet together</li>
                    <li>• Keep the tape snug but not tight</li>
                    <li>• Wear thin clothing or measure over underwear</li>
                  </ul>
                </div>
              </div>

              {/* Results Panel */}
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#2BAE66]" />
                  Your Body Shape
                </h2>

                {currentShape ? (
                  <div className="space-y-6">
                    {/* Shape Result */}
                    <div className="text-center p-6 bg-gradient-to-br from-[#1A3D7C]/5 to-[#2BAE66]/5 rounded-xl border-2 border-[#1A3D7C]/20">
                      <div className="text-5xl mb-3">{currentShape.icon}</div>
                      <h3 className="text-2xl font-bold text-[#1A3D7C] mb-2">
                        {currentShape.name}
                      </h3>
                      <p className="text-gray-600">{currentShape.description}</p>
                    </div>

                    {/* Measurements Summary */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Bust</p>
                        <p className="font-bold text-gray-800">{bust || '-'} {unit}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Waist</p>
                        <p className="font-bold text-gray-800">{waist || '-'} {unit}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Hips</p>
                        <p className="font-bold text-gray-800">{hips || '-'} {unit}</p>
                      </div>
                    </div>

                    {/* Characteristics */}
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-3">Characteristics</h4>
                      <ul className="space-y-2">
                        {currentShape.characteristics.map((char, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-[#2BAE66] mt-0.5">✓</span>
                            {char}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Fashion Tips */}
                    <div className="p-4 bg-green-50 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-3">Fashion Tips</h4>
                      <ul className="space-y-2">
                        {currentShape.fashionTips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-purple-500 mt-0.5">★</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Celebrities */}
                    <div className="p-4 bg-purple-50 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-500" />
                        Celebrities with this shape
                      </h4>
                      <p className="text-sm text-gray-700">
                        {currentShape.celebrities.join(', ')}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📏</div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Enter Your Measurements
                    </h3>
                    <p className="text-gray-500">
                      Fill in your bust, waist, and hip measurements to discover your body shape and get personalized style recommendations.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Body Shape Guide */}
            <div className="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                All Body Shapes Explained
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(bodyShapes).map(([key, shape]) => (
                  <div
                    key={key}
                    className={`p-5 rounded-xl border-2 transition-all ${
                      result === key
                        ? 'border-[#1A3D7C] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{shape.icon}</span>
                      <h3 className="font-bold text-gray-800">{shape.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {shape.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Educational Content */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              Understanding Body Shapes
            </h2>

            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">
                  What Determines Body Shape?
                </h3>
                <p className="text-gray-700 mb-4">
                  Your body shape is primarily determined by your <strong>bone structure</strong>, particularly the width of your shoulders, ribcage, and pelvis. These proportions are largely genetic and established during puberty.
                </p>
                <p className="text-gray-700 mb-4">
                  While you cannot change your bone structure, several factors can influence how your body shape appears:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><strong>Fat distribution:</strong> Hormones affect where your body stores fat</li>
                  <li><strong>Muscle development:</strong> Exercise can build muscle in specific areas</li>
                  <li><strong>Posture:</strong> How you carry yourself affects your silhouette</li>
                  <li><strong>Age and life stages:</strong> Pregnancy, menopause, and aging can shift proportions</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">
                  How to Measure Yourself Accurately
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Bust</h4>
                    <p className="text-gray-700 text-sm">
                      Wrap the measuring tape around the fullest part of your bust (usually at nipple level). Keep the tape parallel to the ground and breathe normally.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Waist</h4>
                    <p className="text-gray-700 text-sm">
                      Measure at your natural waistline—the narrowest part of your torso, usually just above your belly button. Don&apos;t suck in your stomach.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Hips</h4>
                    <p className="text-gray-700 text-sm">
                      Stand with feet together and measure around the widest part of your hips and buttocks, keeping the tape parallel to the floor.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">
                  Body Shape vs. Body Size
                </h3>
                <p className="text-gray-700 mb-4">
                  It&apos;s important to understand that <strong>body shape and body size are different concepts</strong>. Your body shape refers to the proportional relationship between your bust, waist, and hips—not your overall size.
                </p>
                <p className="text-gray-700">
                  Someone who is a size 4 and someone who is a size 14 can both have an hourglass figure if their proportions are similar. Body shapes exist at every size, and the goal is to dress in ways that make you feel confident, regardless of the number on the tag.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">
                  Embracing Your Natural Shape
                </h3>
                <p className="text-gray-700 mb-4">
                  Rather than trying to change your body to fit an &quot;ideal&quot; shape, focus on:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Understanding what styles flatter your natural proportions</li>
                  <li>Choosing clothes that fit well and feel comfortable</li>
                  <li>Celebrating the unique aspects of your body</li>
                  <li>Focusing on health and how you feel rather than appearance</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Fashion &quot;rules&quot; are just guidelines—wear whatever makes you feel confident and happy!
                </p>
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
                  q: 'What are the different body shapes?',
                  a: 'The main body shapes are: Hourglass (bust and hips roughly equal with a defined waist), Pear/Triangle (hips wider than bust), Apple/Round (fuller midsection), Rectangle/Straight (similar measurements throughout), Inverted Triangle (shoulders wider than hips), and Spoon (pronounced hip curves with defined waist).',
                },
                {
                  q: 'How accurate is the body shape calculator?',
                  a: 'Our calculator uses standard measurement ratios to determine body shape. While it provides a good general indication, body shapes exist on a spectrum, and you may find you have characteristics of multiple shapes. Use the result as a starting point for understanding your proportions.',
                },
                {
                  q: 'Can my body shape change over time?',
                  a: 'While your basic bone structure stays the same, factors like weight changes, hormonal shifts, pregnancy, and aging can affect fat distribution and muscle tone, which may make your body appear more like a different shape over time.',
                },
                {
                  q: 'What is the most common body shape?',
                  a: 'Studies suggest that the rectangle (straight) body shape is the most common, followed by pear and apple shapes. However, body shape distribution varies across different populations and demographics.',
                },
                {
                  q: 'Do men have body shapes too?',
                  a: 'Yes! Men also have distinct body shapes including rectangle, inverted triangle, oval, and trapezoid. The principles of understanding your proportions and dressing accordingly apply to all genders.',
                },
                {
                  q: 'What if I\'m between two body shapes?',
                  a: 'Many people have characteristics of multiple body shapes. This is completely normal! Use the features and fashion tips from both shapes that apply to you. Body shapes are guidelines, not rigid categories.',
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
              Need Help with Health & Fitness Education?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Our expert tutors can help you understand body composition, nutrition, fitness principles, and more. Book a personalized session today!
            </p>
            <Link href="/book-demo-class">
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
                href="/calculators/bmi-calculator"
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <h3 className="font-semibold text-[#1A3D7C] mb-1">BMI Calculator</h3>
                <p className="text-sm text-gray-600">Calculate your Body Mass Index</p>
              </Link>
              <Link
                href="/calculators/calorie-calculator"
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <h3 className="font-semibold text-[#1A3D7C] mb-1">Calorie Calculator</h3>
                <p className="text-sm text-gray-600">Calculate daily calorie needs</p>
              </Link>
              <Link
                href="/calculators/ideal-weight-calculator"
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <h3 className="font-semibold text-[#1A3D7C] mb-1">Ideal Weight Calculator</h3>
                <p className="text-sm text-gray-600">Find your ideal body weight</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
