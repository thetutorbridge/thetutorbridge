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
import { Calculator, RotateCcw, Info, Sparkles, User } from 'lucide-react';
import Link from 'next/link';

type Unit = 'cm' | 'in';
type FeatureSharpness = 'sharp' | 'somewhat' | 'round';
type Sex = 'female' | 'male' | '';

interface FaceShape {
  name: string;
  description: string;
  characteristics: string[];
  hairstyleTips: string[];
  glassesTips: string[];
  makeupTips?: string[];
  celebrities: string[];
  icon: string;
}

const faceShapes: Record<string, FaceShape> = {
  oval: {
    name: 'Oval',
    description: 'Your face is longer than it is wide, with a forehead slightly wider than your jaw. The oval face is considered the most balanced and versatile shape.',
    characteristics: [
      'Face length greater than cheekbone width',
      'Forehead wider than jawline',
      'Gentle curve at the jawline',
      'Balanced proportions overall',
    ],
    hairstyleTips: [
      'Almost any hairstyle works well',
      'Try volume at the crown or sides',
      'Both short and long styles are flattering',
      'Experiment with bangs of any type',
    ],
    glassesTips: [
      'Most frame shapes work well',
      'Walnut-shaped frames are ideal',
      'Try bold geometric shapes',
      'Avoid frames that are too large',
    ],
    makeupTips: [
      'Light contouring to enhance natural structure',
      'Highlight cheekbones and brow bone',
      'Most makeup techniques work well',
    ],
    celebrities: ['Beyoncé', 'George Clooney', 'Julia Roberts', 'Ryan Gosling'],
    icon: '🥚',
  },
  round: {
    name: 'Round',
    description: 'Your face is approximately as wide as it is long, with full cheeks and a rounded chin. The widest point is at your cheekbones.',
    characteristics: [
      'Face length and width are similar',
      'Full, rounded cheeks',
      'Rounded chin without angles',
      'Soft, curved jawline',
    ],
    hairstyleTips: [
      'Add height at the crown',
      'Long layers to elongate the face',
      'Side-swept bangs work well',
      'Avoid chin-length bobs',
    ],
    glassesTips: [
      'Angular frames add definition',
      'Rectangular or square frames',
      'Cat-eye shapes are flattering',
      'Avoid round frames',
    ],
    makeupTips: [
      'Contour sides of face to slim',
      'Highlight center of forehead and chin',
      'Angular eyebrow shape adds structure',
    ],
    celebrities: ['Selena Gomez', 'Leonardo DiCaprio', 'Chrissy Teigen', 'Jack Black'],
    icon: '🌕',
  },
  square: {
    name: 'Square',
    description: 'Your face features a strong, angular jawline with a forehead and jaw of similar width. The face length and width are approximately equal.',
    characteristics: [
      'Strong, angular jawline',
      'Forehead and jaw similar width',
      'Face length and width nearly equal',
      'Defined angles at the jaw',
    ],
    hairstyleTips: [
      'Soft layers around the face',
      'Side parts to soften angles',
      'Waves and curls add softness',
      'Avoid blunt cuts at jaw level',
    ],
    glassesTips: [
      'Round or oval frames soften angles',
      'Thin, rimless frames work well',
      'Cat-eye shapes are flattering',
      'Avoid square or angular frames',
    ],
    makeupTips: [
      'Contour jaw corners to soften',
      'Round out edges with bronzer',
      'Soft, arched eyebrows',
    ],
    celebrities: ['Angelina Jolie', 'Brad Pitt', 'Keira Knightley', 'Henry Cavill'],
    icon: '⬜',
  },
  heart: {
    name: 'Heart',
    description: 'Your face features a wider forehead and cheekbones that taper to a narrow, pointed chin. Often includes a widow\'s peak hairline.',
    characteristics: [
      'Wide forehead and cheekbones',
      'Narrow, pointed chin',
      'Face tapers from top to bottom',
      'May have widow\'s peak hairline',
    ],
    hairstyleTips: [
      'Add width at the chin level',
      'Side-swept bangs balance forehead',
      'Chin-length or longer styles',
      'Avoid heavy volume at the crown',
    ],
    glassesTips: [
      'Bottom-heavy frames balance face',
      'Light-colored or rimless tops',
      'Oval or round frames',
      'Avoid decorative tops on frames',
    ],
    makeupTips: [
      'Contour forehead sides',
      'Highlight chin to balance',
      'Blush applied lower on cheeks',
    ],
    celebrities: ['Reese Witherspoon', 'Ryan Reynolds', 'Scarlett Johansson', 'Nick Jonas'],
    icon: '💜',
  },
  oblong: {
    name: 'Oblong (Rectangle)',
    description: 'Your face is notably longer than it is wide, with a forehead, cheekbones, and jaw of similar width. The face appears elongated.',
    characteristics: [
      'Face significantly longer than wide',
      'Forehead, cheeks, jaw similar width',
      'Long, straight cheeks',
      'May have high forehead',
    ],
    hairstyleTips: [
      'Add width at the sides',
      'Avoid extra height at crown',
      'Bangs help shorten face appearance',
      'Layered cuts add volume at sides',
    ],
    glassesTips: [
      'Wide frames add horizontal balance',
      'Decorative temples draw eye outward',
      'Avoid narrow, small frames',
      'Try bold, oversized styles',
    ],
    makeupTips: [
      'Contour forehead and chin',
      'Horizontal blush application',
      'Emphasize eyes to draw attention up',
    ],
    celebrities: ['Sarah Jessica Parker', 'Adam Levine', 'Liv Tyler', 'Ben Affleck'],
    icon: '📱',
  },
  diamond: {
    name: 'Diamond',
    description: 'Your cheekbones are the widest part of your face, with a narrow forehead and jawline. Features are typically angular and defined.',
    characteristics: [
      'Cheekbones are widest point',
      'Narrow forehead and jaw',
      'Angular, sharp features',
      'Pointed chin',
    ],
    hairstyleTips: [
      'Add width at forehead or chin',
      'Side-swept bangs work well',
      'Chin-length bobs are flattering',
      'Avoid slicked-back styles',
    ],
    glassesTips: [
      'Cat-eye or oval frames',
      'Frames wider than cheekbones',
      'Rimless or semi-rimless styles',
      'Avoid narrow frames',
    ],
    makeupTips: [
      'Highlight forehead and chin',
      'Contour cheekbones subtly',
      'Soft, rounded eyebrow shape',
    ],
    celebrities: ['Rihanna', 'Robert Pattinson', 'Taylor Swift', 'Johnny Depp'],
    icon: '💎',
  },
  triangle: {
    name: 'Triangle (Pear)',
    description: 'Your jawline is wider than your forehead and cheekbones. The face widens from forehead to jaw.',
    characteristics: [
      'Jawline wider than forehead',
      'Narrow forehead',
      'Face widens toward jaw',
      'Prominent jaw area',
    ],
    hairstyleTips: [
      'Add volume at the crown',
      'Side-swept styles balance width',
      'Avoid chin-length cuts',
      'Full bangs add forehead width',
    ],
    glassesTips: [
      'Cat-eye shapes add upper width',
      'Bold brow lines are flattering',
      'Avoid bottom-heavy frames',
      'Try semi-rimless with detailed tops',
    ],
    makeupTips: [
      'Highlight forehead and temples',
      'Contour jawline',
      'Draw attention to eyes',
    ],
    celebrities: ['Kelly Osbourne', 'Gene Hackman', 'Minnie Driver'],
    icon: '🔺',
  },
};

export default function FaceShapeCalculatorPage() {
  const [sex, setSex] = useState<Sex>('');
  const [foreheadWidth, setForeheadWidth] = useState<string>('');
  const [cheeksWidth, setCheeksWidth] = useState<string>('');
  const [jawlineWidth, setJawlineWidth] = useState<string>('');
  const [faceLength, setFaceLength] = useState<string>('');
  const [featureSharpness, setFeatureSharpness] = useState<FeatureSharpness>('somewhat');
  const [unit, setUnit] = useState<Unit>('cm');
  const [result, setResult] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState<string | null>(null);

  const measurementInfo: Record<string, string> = {
    forehead: 'Measure across your forehead at its widest point, typically between the temples.',
    cheeks: 'Measure across your face from the outer corner of one cheekbone to the other.',
    jawline: 'Measure from the tip of your chin to below your ear, then double the number.',
    faceLength: 'Measure from the center of your hairline straight down to the tip of your chin.',
  };

  const calculateFaceShape = (): string | null => {
    const forehead = parseFloat(foreheadWidth);
    const cheeks = parseFloat(cheeksWidth);
    const jaw = parseFloat(jawlineWidth);
    const length = parseFloat(faceLength);

    if (isNaN(forehead) || isNaN(cheeks) || isNaN(jaw) || isNaN(length)) {
      return null;
    }

    if (forehead <= 0 || cheeks <= 0 || jaw <= 0 || length <= 0) {
      return null;
    }

    // Calculate ratios
    const lengthToWidthRatio = length / cheeks;
    const foreheadToJawRatio = forehead / jaw;
    const cheeksToForeheadRatio = cheeks / forehead;
    const cheeksToJawRatio = cheeks / jaw;

    // Determine face shape based on measurements and ratios
    // Diamond: Cheekbones widest, narrow forehead and jaw, sharp features
    if (
      cheeks > forehead * 1.1 &&
      cheeks > jaw * 1.1 &&
      featureSharpness === 'sharp' &&
      lengthToWidthRatio > 1.1
    ) {
      return 'diamond';
    }

    // Heart: Wide forehead/cheeks, narrow jaw, tapers down
    if (
      forehead >= cheeks * 0.95 &&
      jaw < forehead * 0.85 &&
      jaw < cheeks * 0.85
    ) {
      return 'heart';
    }

    // Triangle: Jaw wider than forehead
    if (jaw > forehead * 1.1 && jaw >= cheeks * 0.95) {
      return 'triangle';
    }

    // Round: Length ≈ width, full cheeks
    if (
      lengthToWidthRatio >= 0.9 &&
      lengthToWidthRatio <= 1.1 &&
      cheeks >= forehead * 0.95 &&
      cheeks >= jaw * 0.95 &&
      featureSharpness !== 'sharp'
    ) {
      return 'round';
    }

    // Square: Length ≈ width, angular jaw
    if (
      lengthToWidthRatio >= 0.9 &&
      lengthToWidthRatio <= 1.15 &&
      Math.abs(forehead - jaw) < forehead * 0.1 &&
      (featureSharpness === 'sharp' || featureSharpness === 'somewhat')
    ) {
      return 'square';
    }

    // Oblong: Much longer than wide, similar widths
    if (
      lengthToWidthRatio > 1.3 &&
      Math.abs(forehead - jaw) < forehead * 0.15 &&
      Math.abs(cheeks - forehead) < forehead * 0.15
    ) {
      return 'oblong';
    }

    // Oval: Longer than wide, forehead wider than jaw
    if (
      lengthToWidthRatio > 1.1 &&
      forehead > jaw * 0.95 &&
      cheeks >= forehead * 0.9
    ) {
      return 'oval';
    }

    // Default to oval if no clear match
    return 'oval';
  };

  useEffect(() => {
    const shape = calculateFaceShape();
    setResult(shape);
  }, [foreheadWidth, cheeksWidth, jawlineWidth, faceLength, featureSharpness]);

  const handleReset = () => {
    setSex('');
    setForeheadWidth('');
    setCheeksWidth('');
    setJawlineWidth('');
    setFaceLength('');
    setFeatureSharpness('somewhat');
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
      setForeheadWidth(convertUnit(foreheadWidth, unit, newUnit));
      setCheeksWidth(convertUnit(cheeksWidth, unit, newUnit));
      setJawlineWidth(convertUnit(jawlineWidth, unit, newUnit));
      setFaceLength(convertUnit(faceLength, unit, newUnit));
      setUnit(newUnit);
    }
  };

  const currentShape = result ? faceShapes[result] : null;

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Face Shape Calculator',
    description: 'Free face shape calculator to determine your face shape based on facial measurements. Get personalized hairstyle, glasses, and makeup recommendations.',
    url: 'https://thetutorbridge.com/calculators/face-shape-calculator',
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
        name: 'What are the different face shapes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The main face shapes are: Oval (balanced, longer than wide), Round (equal length and width, full cheeks), Square (strong angular jaw, equal proportions), Heart (wide forehead, narrow chin), Oblong/Rectangle (long face, similar widths), Diamond (wide cheekbones, narrow forehead and jaw), and Triangle (wide jaw, narrow forehead).',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I measure my face shape?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Measure four areas: 1) Forehead width at the widest point between temples, 2) Cheekbone width from outer corner to outer corner, 3) Jawline from chin tip to below ear (doubled), and 4) Face length from hairline center to chin tip. Compare these measurements to determine your face shape.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is knowing my face shape important?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Knowing your face shape helps you choose flattering hairstyles, glasses frames, and makeup techniques. The general rule is to choose styles that contrast your face shape - angular accessories for round faces, softer styles for angular faces.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the most common face shape?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The oval face shape is often considered the most common and is typically seen as the "ideal" shape due to its balanced proportions. However, all face shapes are beautiful and unique, and the key is to embrace and style for your natural shape.',
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
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Face Shape Calculator
              </h1>
              <p className="text-lg md:text-xl text-blue-100">
                Discover your face shape and get personalized recommendations for hairstyles, glasses, and makeup. Enter your facial measurements below.
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
                    Face Measurements
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

                {/* Sex Selection (Optional) */}
                <div className="mb-6">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Sex <span className="text-gray-400 text-xs">(Optional)</span>
                  </Label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setSex(sex === 'female' ? '' : 'female')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                        sex === 'female'
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      Female ♀
                    </button>
                    <button
                      onClick={() => setSex(sex === 'male' ? '' : 'male')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                        sex === 'male'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      Male ♂
                    </button>
                  </div>
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
                  {/* Forehead Width */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Forehead Width
                      </Label>
                      <button
                        onClick={() => setShowInfo(showInfo === 'forehead' ? null : 'forehead')}
                        className="text-gray-400 hover:text-[#1A3D7C] transition-colors"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    {showInfo === 'forehead' && (
                      <p className="text-xs text-gray-500 mb-2 bg-blue-50 p-2 rounded">
                        {measurementInfo.forehead}
                      </p>
                    )}
                    <div className="relative">
                      <Input
                        type="number"
                        value={foreheadWidth}
                        onChange={(e) => setForeheadWidth(e.target.value)}
                        placeholder="Enter forehead width"
                        className="pr-12"
                        min="0"
                        step="0.1"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        {unit}
                      </span>
                    </div>
                  </div>

                  {/* Cheeks Width */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Cheeks Width
                      </Label>
                      <button
                        onClick={() => setShowInfo(showInfo === 'cheeks' ? null : 'cheeks')}
                        className="text-gray-400 hover:text-[#1A3D7C] transition-colors"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    {showInfo === 'cheeks' && (
                      <p className="text-xs text-gray-500 mb-2 bg-blue-50 p-2 rounded">
                        {measurementInfo.cheeks}
                      </p>
                    )}
                    <div className="relative">
                      <Input
                        type="number"
                        value={cheeksWidth}
                        onChange={(e) => setCheeksWidth(e.target.value)}
                        placeholder="Enter cheekbone width"
                        className="pr-12"
                        min="0"
                        step="0.1"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        {unit}
                      </span>
                    </div>
                  </div>

                  {/* Jawline Width */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Jawline Length
                      </Label>
                      <button
                        onClick={() => setShowInfo(showInfo === 'jawline' ? null : 'jawline')}
                        className="text-gray-400 hover:text-[#1A3D7C] transition-colors"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    {showInfo === 'jawline' && (
                      <p className="text-xs text-gray-500 mb-2 bg-blue-50 p-2 rounded">
                        {measurementInfo.jawline}
                      </p>
                    )}
                    <div className="relative">
                      <Input
                        type="number"
                        value={jawlineWidth}
                        onChange={(e) => setJawlineWidth(e.target.value)}
                        placeholder="Enter jawline length"
                        className="pr-12"
                        min="0"
                        step="0.1"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        {unit}
                      </span>
                    </div>
                  </div>

                  {/* Face Length */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Face Length
                      </Label>
                      <button
                        onClick={() => setShowInfo(showInfo === 'faceLength' ? null : 'faceLength')}
                        className="text-gray-400 hover:text-[#1A3D7C] transition-colors"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    {showInfo === 'faceLength' && (
                      <p className="text-xs text-gray-500 mb-2 bg-blue-50 p-2 rounded">
                        {measurementInfo.faceLength}
                      </p>
                    )}
                    <div className="relative">
                      <Input
                        type="number"
                        value={faceLength}
                        onChange={(e) => setFaceLength(e.target.value)}
                        placeholder="Enter face length"
                        className="pr-12"
                        min="0"
                        step="0.1"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        {unit}
                      </span>
                    </div>
                  </div>

                  {/* Feature Sharpness */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium text-gray-700">
                        How sharp are your features?
                      </Label>
                      <button
                        onClick={() => setShowInfo(showInfo === 'sharpness' ? null : 'sharpness')}
                        className="text-gray-400 hover:text-[#1A3D7C] transition-colors"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    {showInfo === 'sharpness' && (
                      <p className="text-xs text-gray-500 mb-2 bg-blue-50 p-2 rounded">
                        Sharp features have defined angles at the jawline and cheekbones. Round features have softer, curved contours.
                      </p>
                    )}
                    <div className="space-y-2">
                      {[
                        { value: 'sharp', label: 'Sharp' },
                        { value: 'somewhat', label: 'Somewhat' },
                        { value: 'round', label: 'Round' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setFeatureSharpness(option.value as FeatureSharpness)}
                          className={`w-full py-2 px-4 rounded-lg border-2 text-left transition-all flex items-center gap-3 ${
                            featureSharpness === option.value
                              ? 'border-[#1A3D7C] bg-blue-50 text-[#1A3D7C]'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              featureSharpness === option.value
                                ? 'border-[#1A3D7C]'
                                : 'border-gray-300'
                            }`}
                          >
                            {featureSharpness === option.value && (
                              <div className="w-2 h-2 rounded-full bg-[#1A3D7C]" />
                            )}
                          </div>
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Panel */}
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#2BAE66]" />
                  Your Face Shape
                </h2>

                {currentShape ? (
                  <div className="space-y-6">
                    {/* Shape Result */}
                    <div className="text-center p-6 bg-gradient-to-br from-[#1A3D7C]/5 to-[#2BAE66]/5 rounded-xl border-2 border-[#1A3D7C]/20">
                      <div className="text-5xl mb-3">{currentShape.icon}</div>
                      <h3 className="text-2xl font-bold text-[#1A3D7C] mb-2">
                        {currentShape.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{currentShape.description}</p>
                    </div>

                    {/* Measurements Summary */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Forehead</p>
                        <p className="font-bold text-gray-800">{foreheadWidth || '-'} {unit}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Cheeks</p>
                        <p className="font-bold text-gray-800">{cheeksWidth || '-'} {unit}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Jawline</p>
                        <p className="font-bold text-gray-800">{jawlineWidth || '-'} {unit}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Length</p>
                        <p className="font-bold text-gray-800">{faceLength || '-'} {unit}</p>
                      </div>
                    </div>

                    {/* Hairstyle Tips */}
                    <div className="p-4 bg-purple-50 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-3">💇 Hairstyle Tips</h4>
                      <ul className="space-y-2">
                        {currentShape.hairstyleTips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-purple-500 mt-0.5">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Glasses Tips */}
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-3">👓 Glasses Recommendations</h4>
                      <ul className="space-y-2">
                        {currentShape.glassesTips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-blue-500 mt-0.5">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Makeup Tips (if female or unspecified) */}
                    {sex !== 'male' && currentShape.makeupTips && (
                      <div className="p-4 bg-pink-50 rounded-xl">
                        <h4 className="font-semibold text-gray-800 mb-3">💄 Makeup Tips</h4>
                        <ul className="space-y-2">
                          {currentShape.makeupTips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-pink-500 mt-0.5">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Celebrities */}
                    <div className="p-4 bg-amber-50 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-2">⭐ Celebrities with {currentShape.name} Face</h4>
                      <p className="text-sm text-gray-700">
                        {currentShape.celebrities.join(', ')}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📐</div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Enter Your Measurements
                    </h3>
                    <p className="text-gray-500">
                      Fill in your facial measurements to discover your face shape and get personalized style recommendations.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* All Face Shapes Guide */}
            <div className="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                All Face Shapes Explained
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Object.entries(faceShapes).map(([key, shape]) => (
                  <div
                    key={key}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      result === key
                        ? 'border-[#1A3D7C] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{shape.icon}</span>
                      <h3 className="font-bold text-gray-800">{shape.name}</h3>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {shape.characteristics[0]}
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
              How to Measure Your Face Shape
            </h2>

            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">
                  Step-by-Step Measurement Guide
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">1. Forehead Width</h4>
                    <p className="text-gray-700 text-sm">
                      Using a flexible measuring tape, measure across your forehead at its widest point. This is typically from the outer edge of one eyebrow arch to the other, or between the temples.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">2. Cheekbone Width</h4>
                    <p className="text-gray-700 text-sm">
                      Measure across your cheekbones, starting and ending at the pointiest part below the outer corner of each eye. This is usually the widest part of your face.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">3. Jawline Length</h4>
                    <p className="text-gray-700 text-sm">
                      Measure from the tip of your chin to below your ear at the point where your jaw angles upward. Multiply this number by two to get your total jawline measurement.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">4. Face Length</h4>
                    <p className="text-gray-700 text-sm">
                      Measure from the center of your hairline straight down to the tip of your chin. If you have a receding hairline, start from where your hairline would naturally be.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">
                  Why Face Shape Matters for Styling
                </h3>
                <p className="text-gray-700 mb-4">
                  Understanding your face shape is the foundation for making flattering style choices. The general principle is to <strong>create balance</strong> by choosing styles that contrast with your natural shape:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><strong>Round faces</strong> benefit from angular styles that add definition</li>
                  <li><strong>Angular faces</strong> are softened by curved, rounded styles</li>
                  <li><strong>Long faces</strong> are balanced by horizontal elements that add width</li>
                  <li><strong>Wide faces</strong> are elongated by vertical lines and height</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">
                  Tips for Accurate Measurements
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Use a flexible fabric measuring tape for accuracy</li>
                  <li>Pull your hair back completely from your face</li>
                  <li>Stand in front of a mirror with good lighting</li>
                  <li>Keep the measuring tape flat against your face</li>
                  <li>Take measurements multiple times for consistency</li>
                  <li>Have someone help you for the most accurate results</li>
                </ul>
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
                  q: 'What are the different face shapes?',
                  a: 'The main face shapes are Oval, Round, Square, Heart, Oblong (Rectangle), Diamond, and Triangle. Each is determined by the proportions between forehead, cheekbones, jawline, and face length.',
                },
                {
                  q: 'How accurate is the face shape calculator?',
                  a: 'The calculator provides a good indication based on your measurements, but face shapes exist on a spectrum. You may have characteristics of multiple shapes. Use the result as a starting point for styling choices.',
                },
                {
                  q: 'Can my face shape change over time?',
                  a: 'Your bone structure remains constant, but factors like weight changes, aging, and muscle tone can affect how your face shape appears. Hairstyles and makeup can also dramatically change perceived face shape.',
                },
                {
                  q: 'What face shape is considered most attractive?',
                  a: 'All face shapes are beautiful! While oval is often called the "ideal" due to its balanced proportions, beauty standards vary across cultures and time periods. The key is finding styles that make you feel confident.',
                },
                {
                  q: 'Why do I need to know my face shape?',
                  a: 'Knowing your face shape helps you choose flattering hairstyles, glasses frames, makeup techniques, and even jewelry. It\'s about creating visual balance and enhancing your natural features.',
                },
                {
                  q: 'What if my measurements don\'t clearly match one shape?',
                  a: 'Many people have combination face shapes or fall between categories. This is completely normal! Consider the recommendations from the closest matching shapes and experiment to find what works best for you.',
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
              Need Personal Styling Advice?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Our expert tutors can help you with art, design, and personal development. Book a personalized session today!
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
                href="/calculators/body-shape-calculator"
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <h3 className="font-semibold text-[#1A3D7C] mb-1">Body Shape Calculator</h3>
                <p className="text-sm text-gray-600">Find your body type with measurements</p>
              </Link>
              <Link
                href="/calculators/bmi-calculator"
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <h3 className="font-semibold text-[#1A3D7C] mb-1">BMI Calculator</h3>
                <p className="text-sm text-gray-600">Calculate your Body Mass Index</p>
              </Link>
              <Link
                href="/calculators/age-calculator"
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <h3 className="font-semibold text-[#1A3D7C] mb-1">Age Calculator</h3>
                <p className="text-sm text-gray-600">Calculate your exact age</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
