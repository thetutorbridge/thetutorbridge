'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, Droplets, BookOpen, ArrowRight, RefreshCw, Scale, ArrowLeftRight, ChefHat } from 'lucide-react';
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

type ConversionMode = 'ml-to-grams' | 'grams-to-ml';

interface IngredientPreset {
  name: string;
  density: number; // g/ml
  category: string;
}

// Common cooking ingredients with their densities in g/ml
const ingredientPresets: IngredientPreset[] = [
  // Water & Liquids
  { name: 'Water', density: 1.0, category: 'Water & Liquids' },
  { name: 'Milk (whole)', density: 1.03, category: 'Water & Liquids' },
  { name: 'Milk (skim)', density: 1.035, category: 'Water & Liquids' },
  { name: 'Heavy Cream', density: 0.994, category: 'Water & Liquids' },
  { name: 'Buttermilk', density: 1.03, category: 'Water & Liquids' },
  { name: 'Coconut Milk', density: 0.97, category: 'Water & Liquids' },

  // Oils
  { name: 'Olive Oil', density: 0.92, category: 'Oils' },
  { name: 'Vegetable Oil', density: 0.92, category: 'Oils' },
  { name: 'Coconut Oil (melted)', density: 0.925, category: 'Oils' },
  { name: 'Sunflower Oil', density: 0.92, category: 'Oils' },
  { name: 'Canola Oil', density: 0.92, category: 'Oils' },
  { name: 'Sesame Oil', density: 0.92, category: 'Oils' },

  // Sweeteners
  { name: 'Honey', density: 1.42, category: 'Sweeteners' },
  { name: 'Maple Syrup', density: 1.37, category: 'Sweeteners' },
  { name: 'Corn Syrup', density: 1.38, category: 'Sweeteners' },
  { name: 'Molasses', density: 1.41, category: 'Sweeteners' },
  { name: 'Agave Nectar', density: 1.40, category: 'Sweeteners' },
  { name: 'Golden Syrup', density: 1.40, category: 'Sweeteners' },

  // Sugars & Powders
  { name: 'Granulated Sugar', density: 0.85, category: 'Sugars & Powders' },
  { name: 'Brown Sugar (packed)', density: 0.93, category: 'Sugars & Powders' },
  { name: 'Powdered Sugar', density: 0.56, category: 'Sugars & Powders' },
  { name: 'All-Purpose Flour', density: 0.53, category: 'Sugars & Powders' },
  { name: 'Bread Flour', density: 0.55, category: 'Sugars & Powders' },
  { name: 'Cake Flour', density: 0.48, category: 'Sugars & Powders' },
  { name: 'Cocoa Powder', density: 0.52, category: 'Sugars & Powders' },
  { name: 'Cornstarch', density: 0.54, category: 'Sugars & Powders' },
  { name: 'Baking Powder', density: 0.90, category: 'Sugars & Powders' },
  { name: 'Salt (table)', density: 1.22, category: 'Sugars & Powders' },

  // Dairy & Fats
  { name: 'Butter (melted)', density: 0.91, category: 'Dairy & Fats' },
  { name: 'Sour Cream', density: 1.02, category: 'Dairy & Fats' },
  { name: 'Yogurt', density: 1.03, category: 'Dairy & Fats' },
  { name: 'Cream Cheese', density: 1.02, category: 'Dairy & Fats' },

  // Other Ingredients
  { name: 'Vinegar', density: 1.01, category: 'Other' },
  { name: 'Lemon Juice', density: 1.02, category: 'Other' },
  { name: 'Soy Sauce', density: 1.20, category: 'Other' },
  { name: 'Tomato Paste', density: 1.10, category: 'Other' },
  { name: 'Peanut Butter', density: 1.09, category: 'Other' },
  { name: 'Mayonnaise', density: 0.91, category: 'Other' },
  { name: 'Ketchup', density: 1.14, category: 'Other' },

  // Custom
  { name: 'Custom Density', density: 1.0, category: 'Custom' },
];

export default function MlToGramsConverter() {
  const [mode, setMode] = useState<ConversionMode>('ml-to-grams');
  const [inputValue, setInputValue] = useState<string>('');
  const [density, setDensity] = useState<string>('1');
  const [selectedIngredient, setSelectedIngredient] = useState<string>('Water');
  const [result, setResult] = useState<number | null>(null);

  // Auto-calculate when inputs change
  useEffect(() => {
    const value = parseFloat(inputValue);
    const densityValue = parseFloat(density);

    if (isNaN(value) || isNaN(densityValue) || value < 0 || densityValue <= 0) {
      setResult(null);
      return;
    }

    if (mode === 'ml-to-grams') {
      // Mass (g) = Volume (ml) × Density (g/ml)
      setResult(value * densityValue);
    } else {
      // Volume (ml) = Mass (g) ÷ Density (g/ml)
      setResult(value / densityValue);
    }
  }, [inputValue, density, mode]);

  // Handle ingredient selection
  const handleIngredientChange = (ingredientName: string) => {
    setSelectedIngredient(ingredientName);
    const ingredient = ingredientPresets.find(i => i.name === ingredientName);
    if (ingredient && ingredientName !== 'Custom Density') {
      setDensity(ingredient.density.toString());
    }
  };

  const handleClear = () => {
    setInputValue('');
    setResult(null);
  };

  const swapMode = () => {
    setMode(mode === 'ml-to-grams' ? 'grams-to-ml' : 'ml-to-grams');
    setInputValue('');
    setResult(null);
  };

  const formatResult = (value: number): string => {
    if (value < 0.01) {
      return value.toFixed(4);
    } else if (value < 1) {
      return value.toFixed(3);
    } else if (value < 100) {
      return value.toFixed(2);
    } else {
      return value.toFixed(1);
    }
  };

  // Group ingredients by category
  const groupedIngredients = ingredientPresets.reduce((acc, ingredient) => {
    if (!acc[ingredient.category]) {
      acc[ingredient.category] = [];
    }
    acc[ingredient.category].push(ingredient);
    return acc;
  }, {} as Record<string, IngredientPreset[]>);

  // JSON-LD Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ml to Grams Converter",
    "description": "Free ml to grams converter for cooking ingredients. Convert milliliters to grams for water, milk, flour, sugar, oil, honey and more using density-based calculations.",
    "url": "https://www.thetutorbridge.com/calculators/ml-to-grams-converter",
    "applicationCategory": "CalculatorApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "provider": {
      "@type": "Organization",
      "name": "The Tutor Bridge",
      "url": "https://www.thetutorbridge.com"
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I convert ml to grams?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To convert ml to grams, multiply the volume in milliliters by the density of the substance in g/ml. Formula: Grams = Milliliters × Density. For water (density = 1 g/ml), 100 ml = 100 grams."
        }
      },
      {
        "@type": "Question",
        "name": "Is 1 ml equal to 1 gram?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Only for water! 1 ml of water equals approximately 1 gram because water has a density of 1 g/ml. For other substances, the conversion depends on density. For example, 1 ml of honey weighs about 1.42 grams, while 1 ml of oil weighs about 0.92 grams."
        }
      },
      {
        "@type": "Question",
        "name": "How many grams is 100 ml of milk?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "100 ml of whole milk weighs approximately 103 grams. Milk has a density of about 1.03 g/ml, which is slightly higher than water due to its fat and protein content."
        }
      },
      {
        "@type": "Question",
        "name": "How do I convert grams to ml?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To convert grams to ml, divide the mass in grams by the density of the substance in g/ml. Formula: Milliliters = Grams ÷ Density. For example, 100 grams of honey (density 1.42 g/ml) = 100 ÷ 1.42 = 70.4 ml."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Navigation />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-orange-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">ml to Grams Converter</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <ChefHat className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              ml to Grams Converter
            </h1>
            <p className="text-lg md:text-xl text-orange-100 max-w-2xl mx-auto leading-relaxed">
              Convert milliliters to grams for cooking ingredients. Select your ingredient and get instant, accurate conversions based on density.
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Input Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Scale className="w-6 h-6 text-orange-600" />
                  Convert
                </h2>

                {/* Mode Toggle */}
                <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
                  <div className="text-center flex-1">
                    <p className={`font-bold ${mode === 'ml-to-grams' ? 'text-orange-600' : 'text-gray-400'}`}>
                      ml
                    </p>
                    <p className={`text-xs ${mode === 'ml-to-grams' ? 'text-orange-500' : 'text-gray-400'}`}>
                      Milliliters
                    </p>
                  </div>
                  <button
                    onClick={swapMode}
                    className="mx-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
                    title="Swap conversion direction"
                  >
                    <ArrowLeftRight className="w-5 h-5 text-orange-600" />
                  </button>
                  <div className="text-center flex-1">
                    <p className={`font-bold ${mode === 'grams-to-ml' ? 'text-orange-600' : 'text-gray-400'}`}>
                      g
                    </p>
                    <p className={`text-xs ${mode === 'grams-to-ml' ? 'text-orange-500' : 'text-gray-400'}`}>
                      Grams
                    </p>
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-5">
                  {/* Ingredient Selector */}
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <ChefHat className="w-4 h-4 text-gray-500" />
                      Ingredient
                    </Label>
                    <Select value={selectedIngredient} onValueChange={handleIngredientChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select ingredient" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(groupedIngredients).map(([category, ingredients]) => (
                          <div key={category}>
                            <div className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-50">
                              {category}
                            </div>
                            {ingredients.map((ingredient) => (
                              <SelectItem key={ingredient.name} value={ingredient.name}>
                                {ingredient.name} ({ingredient.density} g/ml)
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Value Input */}
                  <div>
                    <Label htmlFor="inputValue" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      {mode === 'ml-to-grams' ? (
                        <>
                          <Droplets className="w-4 h-4 text-gray-500" />
                          Milliliters (ml)
                        </>
                      ) : (
                        <>
                          <Scale className="w-4 h-4 text-gray-500" />
                          Grams (g)
                        </>
                      )}
                    </Label>
                    <div className="relative">
                      <Input
                        id="inputValue"
                        type="number"
                        placeholder={mode === 'ml-to-grams' ? 'Enter milliliters' : 'Enter grams'}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="text-lg pr-14"
                        step="any"
                        min="0"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                        {mode === 'ml-to-grams' ? 'ml' : 'g'}
                      </span>
                    </div>
                  </div>

                  {/* Density Display */}
                  <div>
                    <Label htmlFor="density" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Density (g/ml)
                    </Label>
                    <div className="relative">
                      <Input
                        id="density"
                        type="number"
                        placeholder="Enter density"
                        value={density}
                        onChange={(e) => {
                          setDensity(e.target.value);
                          setSelectedIngredient('Custom Density');
                        }}
                        className="text-lg pr-16"
                        step="any"
                        min="0"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                        g/ml
                      </span>
                    </div>
                  </div>
                </div>

                {/* Clear Button */}
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="w-full mt-6 py-5 text-base font-semibold rounded-xl border-2 hover:bg-gray-50"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear
                </Button>

                {/* Quick Info */}
                <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <p className="text-sm text-orange-800">
                    <strong>Formula:</strong><br />
                    {mode === 'ml-to-grams'
                      ? 'Grams = Milliliters × Density'
                      : 'Milliliters = Grams ÷ Density'}
                  </p>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3">
              {result !== null && (
                <div className="space-y-6">
                  {/* Main Result Card */}
                  <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      {mode === 'ml-to-grams' ? (
                        <>
                          <Scale className="w-5 h-5" />
                          Weight Result
                        </>
                      ) : (
                        <>
                          <Droplets className="w-5 h-5" />
                          Volume Result
                        </>
                      )}
                    </h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <div className="text-center">
                        <p className="text-4xl md:text-5xl font-bold">
                          {formatResult(result)}
                        </p>
                        <p className="text-xl text-orange-100 mt-2">
                          {mode === 'ml-to-grams' ? 'grams (g)' : 'milliliters (ml)'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Conversion Summary */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Conversion Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Input Value</span>
                        <span className="font-semibold text-gray-900">
                          {inputValue} {mode === 'ml-to-grams' ? 'ml' : 'g'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Ingredient</span>
                        <span className="font-semibold text-gray-900">{selectedIngredient}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Density</span>
                        <span className="font-semibold text-gray-900">{density} g/ml</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-600">Result</span>
                        <span className="font-bold text-orange-600 text-lg">
                          {formatResult(result)} {mode === 'ml-to-grams' ? 'g' : 'ml'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Step-by-Step Calculation */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Step-by-Step Calculation</h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                        <div>
                          <p className="font-medium text-gray-900">Given Values</p>
                          <p className="text-gray-600">
                            {mode === 'ml-to-grams'
                              ? `Volume = ${inputValue} ml, Density = ${density} g/ml`
                              : `Mass = ${inputValue} g, Density = ${density} g/ml`}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                        <div>
                          <p className="font-medium text-gray-900">Apply Formula</p>
                          <p className="text-gray-600 font-mono">
                            {mode === 'ml-to-grams'
                              ? `Grams = Volume × Density`
                              : `Milliliters = Mass ÷ Density`}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                        <div>
                          <p className="font-medium text-gray-900">Calculate</p>
                          <p className="text-gray-600 font-mono">
                            {mode === 'ml-to-grams'
                              ? `${inputValue} × ${density} = ${formatResult(result)} g`
                              : `${inputValue} ÷ ${density} = ${formatResult(result)} ml`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Same Value in Different Ingredients */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {mode === 'ml-to-grams' ? 'Same Volume' : 'Same Weight'} in Different Ingredients
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-2 font-semibold text-gray-700">Ingredient</th>
                            <th className="text-left py-3 px-2 font-semibold text-gray-700">Density</th>
                            <th className="text-left py-3 px-2 font-semibold text-gray-700">Result</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ingredientPresets.slice(0, 10).map((ingredient) => {
                            const value = parseFloat(inputValue);
                            let calcResult: number;
                            if (mode === 'ml-to-grams') {
                              calcResult = value * ingredient.density;
                            } else {
                              calcResult = value / ingredient.density;
                            }
                            return (
                              <tr key={ingredient.name} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-2 px-2">{ingredient.name}</td>
                                <td className="py-2 px-2">{ingredient.density} g/ml</td>
                                <td className="py-2 px-2 font-medium text-orange-600">
                                  {formatResult(calcResult)} {mode === 'ml-to-grams' ? 'g' : 'ml'}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {result === null && (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <ChefHat className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    Select an ingredient and enter a value to convert
                  </p>
                  <p className="text-gray-400 text-sm">
                    Results will appear automatically
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

            {/* What is ml to Grams Conversion */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Understanding ml to Grams Conversion
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Converting milliliters (ml) to grams (g) is essential in cooking and baking, where recipes may use either volume or weight measurements. Since <strong>milliliters measure volume</strong> (how much space something takes up) and <strong>grams measure mass</strong> (how heavy something is), the conversion depends on the <strong>density</strong> of the ingredient.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                For water, the conversion is simple: 1 ml = 1 gram. But for other ingredients like honey, oil, or flour, the relationship is different. This is why professional bakers prefer weighing ingredients—it's more accurate than measuring by volume.
              </p>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Key Concept: Density</h3>
                <p className="text-gray-700 mb-4">
                  <strong>Density</strong> = Mass ÷ Volume, measured in g/ml. It tells you how much one milliliter of a substance weighs.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-orange-600">1.0</p>
                    <p className="text-sm text-gray-600">Water (g/ml)</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-orange-600">1.42</p>
                    <p className="text-sm text-gray-600">Honey (g/ml)</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-orange-600">0.92</p>
                    <p className="text-sm text-gray-600">Oil (g/ml)</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Conversion Formulas */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                ml to Grams Conversion Formulas
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">ml to Grams</h3>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center mb-4">
                    <p className="text-2xl font-bold font-mono">
                      g = ml × density
                    </p>
                  </div>
                  <p className="text-orange-100 text-sm">
                    Multiply milliliters by density (g/ml) to get grams.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">Grams to ml</h3>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center mb-4">
                    <p className="text-2xl font-bold font-mono">
                      ml = g ÷ density
                    </p>
                  </div>
                  <p className="text-amber-100 text-sm">
                    Divide grams by density (g/ml) to get milliliters.
                  </p>
                </div>
              </div>
            </section>

            {/* Is ml Equal to Grams? */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Are Grams Equal to ml? The Water Exception
              </h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6 mb-6">
                <h4 className="font-bold text-blue-800 mb-2">Special Case: Water</h4>
                <p className="text-blue-700">
                  For <strong>water only</strong>, 1 ml = 1 gram. This is because water has a density of exactly 1 g/ml at standard conditions. This makes water the perfect reference point for understanding density.
                </p>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                However, for all other ingredients, ml and grams are NOT equal:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">Denser than Water (&gt;1 g/ml)</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    These ingredients weigh MORE than water for the same volume:
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Honey (1.42 g/ml) - 100 ml = 142 g</li>
                    <li>• Maple Syrup (1.37 g/ml) - 100 ml = 137 g</li>
                    <li>• Milk (1.03 g/ml) - 100 ml = 103 g</li>
                    <li>• Salt (1.22 g/ml) - 100 ml = 122 g</li>
                  </ul>
                </div>
                <div className="bg-white border-2 border-amber-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-amber-600 mb-3">Less Dense than Water (&lt;1 g/ml)</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    These ingredients weigh LESS than water for the same volume:
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Oil (0.92 g/ml) - 100 ml = 92 g</li>
                    <li>• Flour (0.53 g/ml) - 100 ml = 53 g</li>
                    <li>• Sugar (0.85 g/ml) - 100 ml = 85 g</li>
                    <li>• Butter (0.91 g/ml) - 100 ml = 91 g</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Common Ingredient Densities */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Cooking Ingredient Densities
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                      <th className="px-6 py-4 text-left font-bold">Ingredient</th>
                      <th className="px-6 py-4 text-left font-bold">Density (g/ml)</th>
                      <th className="px-6 py-4 text-left font-bold">100 ml = ? grams</th>
                      <th className="px-6 py-4 text-left font-bold">100 g = ? ml</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Water</td>
                      <td className="px-6 py-4">1.00</td>
                      <td className="px-6 py-4 text-orange-600 font-semibold">100 g</td>
                      <td className="px-6 py-4 text-orange-600 font-semibold">100 ml</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Milk</td>
                      <td className="px-6 py-4">1.03</td>
                      <td className="px-6 py-4 text-orange-600 font-semibold">103 g</td>
                      <td className="px-6 py-4 text-orange-600 font-semibold">97 ml</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Honey</td>
                      <td className="px-6 py-4">1.42</td>
                      <td className="px-6 py-4 text-orange-600 font-semibold">142 g</td>
                      <td className="px-6 py-4 text-orange-600 font-semibold">70 ml</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Olive Oil</td>
                      <td className="px-6 py-4">0.92</td>
                      <td className="px-6 py-4 text-orange-600 font-semibold">92 g</td>
                      <td className="px-6 py-4 text-orange-600 font-semibold">109 ml</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">All-Purpose Flour</td>
                      <td className="px-6 py-4">0.53</td>
                      <td className="px-6 py-4 text-orange-600 font-semibold">53 g</td>
                      <td className="px-6 py-4 text-orange-600 font-semibold">189 ml</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Granulated Sugar</td>
                      <td className="px-6 py-4">0.85</td>
                      <td className="px-6 py-4 text-orange-600 font-semibold">85 g</td>
                      <td className="px-6 py-4 text-orange-600 font-semibold">118 ml</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Butter (melted)</td>
                      <td className="px-6 py-4">0.91</td>
                      <td className="px-6 py-4 text-orange-600 font-semibold">91 g</td>
                      <td className="px-6 py-4 text-orange-600 font-semibold">110 ml</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Maple Syrup</td>
                      <td className="px-6 py-4">1.37</td>
                      <td className="px-6 py-4 text-orange-600 font-semibold">137 g</td>
                      <td className="px-6 py-4 text-orange-600 font-semibold">73 ml</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Step-by-Step Examples */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Step-by-Step Conversion Examples
              </h2>
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Example 1: How many grams is 250 ml of milk?</h3>
                  <div className="space-y-3">
                    <p><strong>Given:</strong> Volume = 250 ml, Density of milk = 1.03 g/ml</p>
                    <p><strong>Formula:</strong> Grams = ml × density</p>
                    <p><strong>Calculation:</strong> 250 × 1.03 = <span className="text-orange-600 font-bold">257.5 grams</span></p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Example 2: How many grams is 100 ml of honey?</h3>
                  <div className="space-y-3">
                    <p><strong>Given:</strong> Volume = 100 ml, Density of honey = 1.42 g/ml</p>
                    <p><strong>Formula:</strong> Grams = ml × density</p>
                    <p><strong>Calculation:</strong> 100 × 1.42 = <span className="text-orange-600 font-bold">142 grams</span></p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Example 3: How many ml is 200 grams of olive oil?</h3>
                  <div className="space-y-3">
                    <p><strong>Given:</strong> Mass = 200 g, Density of olive oil = 0.92 g/ml</p>
                    <p><strong>Formula:</strong> ml = grams ÷ density</p>
                    <p><strong>Calculation:</strong> 200 ÷ 0.92 = <span className="text-green-600 font-bold">217.4 ml</span></p>
                  </div>
                </div>
              </div>
            </section>

            {/* Why Convert ml to Grams */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Why Convert ml to Grams in Cooking?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-orange-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">More Accurate Measurements</h3>
                  <p className="text-gray-700 text-sm">
                    Weighing ingredients is more precise than measuring by volume. A cup of flour can vary by 30% depending on how it's scooped, but 120 grams is always 120 grams.
                  </p>
                </div>
                <div className="bg-white border-2 border-amber-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-amber-600 mb-3">Better Baking Results</h3>
                  <p className="text-gray-700 text-sm">
                    Professional bakers use weight measurements because baking is a science. Precise ingredient ratios lead to consistent, delicious results every time.
                  </p>
                </div>
                <div className="bg-white border-2 border-yellow-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-yellow-600 mb-3">International Recipe Conversion</h3>
                  <p className="text-gray-700 text-sm">
                    Many international recipes use metric weights. Understanding ml to grams conversion helps you follow recipes from around the world.
                  </p>
                </div>
                <div className="bg-white border-2 border-green-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-green-600 mb-3">Easier Scaling</h3>
                  <p className="text-gray-700 text-sm">
                    Scaling recipes up or down is much easier with weight measurements. Simply multiply or divide the gram amounts without worrying about cup fractions.
                  </p>
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
                    How do I convert ml to grams?
                  </h3>
                  <p className="text-gray-700">
                    Multiply the volume in milliliters by the density of the ingredient in g/ml. Formula: <strong>Grams = ml × density</strong>. For water (density 1 g/ml), 100 ml = 100 grams. For honey (density 1.42 g/ml), 100 ml = 142 grams.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Is 1 ml equal to 1 gram?
                  </h3>
                  <p className="text-gray-700">
                    Only for water! 1 ml of water equals 1 gram because water has a density of 1 g/ml. For other ingredients, the conversion depends on their density. Honey weighs about 1.42 grams per ml, while oil weighs about 0.92 grams per ml.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How many grams is 100 ml of milk?
                  </h3>
                  <p className="text-gray-700">
                    100 ml of whole milk weighs approximately <strong>103 grams</strong>. Milk has a density of about 1.03 g/ml, which is slightly higher than water due to its fat and protein content.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How many grams is 250 ml?
                  </h3>
                  <p className="text-gray-700">
                    It depends on the ingredient. For water: 250 ml = 250 g. For milk: 250 ml = 257.5 g. For honey: 250 ml = 355 g. For oil: 250 ml = 230 g. Always use the density of your specific ingredient.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why is flour measured differently?
                  </h3>
                  <p className="text-gray-700">
                    Flour has a low density (about 0.53 g/ml) and can be packed loosely or tightly, causing significant variations in volume measurements. This is why baking recipes often specify flour by weight—1 cup of flour can range from 120-150 grams depending on how it's measured.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do I convert grams to ml?
                  </h3>
                  <p className="text-gray-700">
                    Divide the weight in grams by the density of the ingredient. Formula: <strong>ml = grams ÷ density</strong>. For example, 100 grams of honey (density 1.42 g/ml) = 100 ÷ 1.42 = 70.4 ml.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can I use this converter for dry ingredients?
                  </h3>
                  <p className="text-gray-700">
                    Yes! This converter works for both liquids and dry ingredients like flour, sugar, and cocoa powder. Just select the correct ingredient to use its density. However, for dry ingredients, weight measurements are generally more reliable than volume.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why does oil float on water?
                  </h3>
                  <p className="text-gray-700">
                    Oil floats on water because it has a lower density (about 0.92 g/ml compared to water's 1.0 g/ml). This means a given volume of oil weighs less than the same volume of water, causing it to float.
                  </p>
                </div>
              </div>
            </section>

            {/* Related Calculators */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Related Calculators
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/calculators/mg-to-ml-converter" className="block bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-orange-300 hover:shadow-lg transition-all">
                  <h3 className="font-bold text-orange-600 mb-1">mg to ml Converter</h3>
                  <p className="text-sm text-gray-600">Convert milligrams to milliliters</p>
                </Link>
                <Link href="/calculators/kg-to-lb-converter" className="block bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-orange-300 hover:shadow-lg transition-all">
                  <h3 className="font-bold text-orange-600 mb-1">Kg to Lb Converter</h3>
                  <p className="text-sm text-gray-600">Convert kilograms to pounds</p>
                </Link>
                <Link href="/calculators/calorie-calculator" className="block bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-orange-300 hover:shadow-lg transition-all">
                  <h3 className="font-bold text-orange-600 mb-1">Calorie Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate daily calorie needs</p>
                </Link>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Conclusion
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Converting between milliliters and grams is essential for accurate cooking and baking. Remember that <strong>1 ml only equals 1 gram for water</strong>—for all other ingredients, you need to account for their density.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our ml to Grams Converter makes these calculations instant and accurate. Simply select your ingredient, enter the value, and get immediate results. Perfect for following recipes, scaling portions, and achieving consistent cooking results every time!
              </p>
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
              Need Help with Math or Science?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you understand unit conversions, density, and more. Get personalized one-on-one guidance tailored to your learning style.
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

      <Footer />
    </div>
  );
}
