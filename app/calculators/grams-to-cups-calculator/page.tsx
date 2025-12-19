'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, ChevronRight, Info, ChevronDown, ChevronUp, GraduationCap, Scale, Utensils } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

type WeightUnit = 'g' | 'kg' | 'mg' | 'oz' | 'lb' | 'dag';
type CupType = 'us_customary' | 'us_legal' | 'metric';

interface Ingredient {
  name: string;
  gramsPerUSCup: number; // grams per US customary cup (236.59 ml)
}

// Ingredient densities - grams per US customary cup (236.59 ml)
const ingredients: Record<string, Ingredient> = {
  water: { name: 'Water', gramsPerUSCup: 236.59 },
  flour: { name: 'Flour', gramsPerUSCup: 125 },
  milk: { name: 'Milk', gramsPerUSCup: 245 },
  sugar: { name: 'Sugar', gramsPerUSCup: 200 },
  salt: { name: 'Salt', gramsPerUSCup: 292 },
  honey: { name: 'Honey', gramsPerUSCup: 340 },
  butter: { name: 'Butter', gramsPerUSCup: 227 },
  olive_oil: { name: 'Olive Oil', gramsPerUSCup: 216 },
  rice_raw: { name: 'Rice (raw)', gramsPerUSCup: 185 },
  oats: { name: 'Oats', gramsPerUSCup: 90 },
  jam: { name: 'Jam', gramsPerUSCup: 340 },
  nutella: { name: 'Nutella', gramsPerUSCup: 300 },
  maple_syrup: { name: 'Maple Syrup', gramsPerUSCup: 322 },
  cream_38: { name: 'Cream, 38% fat', gramsPerUSCup: 238 },
  cream_13: { name: 'Cream, 13% fat', gramsPerUSCup: 242 },
  powder_sugar: { name: 'Powder Sugar', gramsPerUSCup: 120 },
  flaked_almonds: { name: 'Flaked Almonds', gramsPerUSCup: 85 },
  cacao: { name: 'Cacao', gramsPerUSCup: 118 },
  corn_starch: { name: 'Corn Starch', gramsPerUSCup: 128 },
  rye_flour: { name: 'Rye Flour', gramsPerUSCup: 102 },
  custom: { name: 'Custom', gramsPerUSCup: 236.59 },
};

// Cup sizes in ml
const cupSizes: Record<CupType, { name: string; ml: number; description: string }> = {
  us_customary: { name: 'US cups', ml: 236.59, description: 'US customary cups (recipes)' },
  us_legal: { name: 'US legal cups', ml: 240, description: 'US legal cups (nutrition)' },
  metric: { name: 'UK/AU/CA/ZA cups', ml: 250, description: 'UK/Australia/Canada/South Africa metric cups' },
};

// Weight units conversion to grams
const weightUnits: Record<WeightUnit, { name: string; toGrams: number }> = {
  g: { name: 'grams (g)', toGrams: 1 },
  kg: { name: 'kilograms (kg)', toGrams: 1000 },
  mg: { name: 'milligrams (mg)', toGrams: 0.001 },
  oz: { name: 'ounces (oz)', toGrams: 28.3495 },
  lb: { name: 'pounds (lb)', toGrams: 453.592 },
  dag: { name: 'decagrams (dag)', toGrams: 10 },
};

export default function GramsToCupsCalculator() {
  const [selectedIngredient, setSelectedIngredient] = useState<string>('water');
  const [weight, setWeight] = useState<string>('100');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('g');
  const [cupType, setCupType] = useState<CupType>('us_customary');
  const [customDensity, setCustomDensity] = useState<string>('236.59');
  const [cups, setCups] = useState<number | null>(null);

  const [showIngredientDropdown, setShowIngredientDropdown] = useState(false);
  const [showWeightUnitDropdown, setShowWeightUnitDropdown] = useState(false);
  const [showCupTypeDropdown, setShowCupTypeDropdown] = useState(false);
  const [showConverter, setShowConverter] = useState(true);
  const [showConversionTable, setShowConversionTable] = useState(false);
  const [showFormula, setShowFormula] = useState(false);

  // Calculate cups from weight
  useEffect(() => {
    const weightValue = parseFloat(weight) || 0;
    if (weightValue <= 0) {
      setCups(null);
      return;
    }

    // Convert weight to grams
    const weightInGrams = weightValue * weightUnits[weightUnit].toGrams;

    // Get ingredient density (grams per US cup)
    const density = selectedIngredient === 'custom'
      ? parseFloat(customDensity) || 236.59
      : ingredients[selectedIngredient].gramsPerUSCup;

    // Adjust density for cup type
    const cupSizeMl = cupSizes[cupType].ml;
    const usCupMl = 236.59;
    const adjustedDensity = density * (cupSizeMl / usCupMl);

    // Calculate cups
    const result = weightInGrams / adjustedDensity;
    setCups(result);
  }, [weight, weightUnit, selectedIngredient, cupType, customDensity]);

  // Format cups result
  const formatCups = (value: number): string => {
    if (value < 0.01) return value.toFixed(4);
    if (value < 0.1) return value.toFixed(3);
    if (value < 10) return value.toFixed(2);
    return value.toFixed(1);
  };

  // Common conversions table data
  const commonConversions = [
    { grams: 50 },
    { grams: 100 },
    { grams: 150 },
    { grams: 200 },
    { grams: 250 },
    { grams: 300 },
    { grams: 400 },
    { grams: 500 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-orange-600 hover:text-orange-800 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/calculators" className="text-orange-600 hover:text-orange-800">
              Calculators
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Grams to Cups Calculator</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white mb-4 shadow-lg">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Grams to Cups Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Convert grams to cups for any cooking ingredient. Select from 20+ ingredients with accurate density values for precise recipe conversions.
          </p>
        </div>

        {/* Converter Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
          <button
            onClick={() => setShowConverter(!showConverter)}
            className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-orange-500 to-amber-600 text-white"
          >
            <h2 className="text-xl font-semibold flex items-center">
              <Utensils className="w-5 h-5 mr-2" />
              Converter
            </h2>
            {showConverter ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {showConverter && (
            <div className="p-6 space-y-5">
              {/* Ingredient Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ingredient</label>
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowIngredientDropdown(!showIngredientDropdown);
                      setShowWeightUnitDropdown(false);
                      setShowCupTypeDropdown(false);
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-all flex items-center justify-between bg-gray-50"
                  >
                    <span className="font-medium text-gray-700">{ingredients[selectedIngredient].name}</span>
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </button>
                  {showIngredientDropdown && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-20 max-h-64 overflow-y-auto">
                      {Object.entries(ingredients).map(([key, ingredient]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setSelectedIngredient(key);
                            setShowIngredientDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors ${
                            selectedIngredient === key ? 'bg-orange-100 text-orange-700' : 'text-gray-700'
                          }`}
                        >
                          {ingredient.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Custom Density (only for custom ingredient) */}
              {selectedIngredient === 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Density (grams per US cup)
                  </label>
                  <input
                    type="number"
                    value={customDensity}
                    onChange={(e) => setCustomDensity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    placeholder="Grams per cup"
                    min="1"
                    step="0.01"
                  />
                </div>
              )}

              {/* Weight Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    placeholder="Enter weight"
                    min="0"
                    step="any"
                  />
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowWeightUnitDropdown(!showWeightUnitDropdown);
                        setShowIngredientDropdown(false);
                        setShowCupTypeDropdown(false);
                      }}
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-all flex items-center gap-2 bg-gray-50 min-w-[80px] justify-between"
                    >
                      <span className="font-medium text-gray-700">{weightUnit}</span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>
                    {showWeightUnitDropdown && (
                      <div className="absolute right-0 top-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-20 min-w-[180px] overflow-hidden">
                        {(Object.keys(weightUnits) as WeightUnit[]).map((unit) => (
                          <button
                            key={unit}
                            onClick={() => {
                              setWeightUnit(unit);
                              setShowWeightUnitDropdown(false);
                            }}
                            className={`w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors ${
                              weightUnit === unit ? 'bg-orange-100 text-orange-700' : 'text-gray-700'
                            }`}
                          >
                            {weightUnits[unit].name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Cup Type Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cups</label>
                <div className="flex gap-3">
                  <div className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl">
                    <p className="text-3xl font-bold text-orange-700">
                      {cups !== null ? formatCups(cups) : '—'}
                    </p>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowCupTypeDropdown(!showCupTypeDropdown);
                        setShowIngredientDropdown(false);
                        setShowWeightUnitDropdown(false);
                      }}
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-all flex items-center gap-2 bg-gray-50 min-w-[120px] justify-between h-full"
                    >
                      <span className="font-medium text-gray-700 text-sm">{cupSizes[cupType].name}</span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>
                    {showCupTypeDropdown && (
                      <div className="absolute right-0 top-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-20 min-w-[320px] overflow-hidden">
                        {(Object.keys(cupSizes) as CupType[]).map((type) => (
                          <button
                            key={type}
                            onClick={() => {
                              setCupType(type);
                              setShowCupTypeDropdown(false);
                            }}
                            className={`w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors ${
                              cupType === type ? 'bg-orange-100 text-orange-700' : 'text-gray-700'
                            }`}
                          >
                            <div className="font-medium">{cupSizes[type].description}</div>
                            <div className="text-sm text-gray-500">{cupSizes[type].ml} ml</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              {cups !== null && selectedIngredient !== 'custom' && (
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <p className="text-sm text-gray-700">
                    <strong>{weight} {weightUnit}</strong> of <strong>{ingredients[selectedIngredient].name.toLowerCase()}</strong> equals approximately{' '}
                    <strong>{formatCups(cups)} {cupSizes[cupType].name}</strong>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Density: {ingredients[selectedIngredient].gramsPerUSCup} g per US cup
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Conversion Table Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <button
            onClick={() => setShowConversionTable(!showConversionTable)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-orange-600" />
              Conversion Table for {ingredients[selectedIngredient].name}
            </h3>
            {showConversionTable ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {showConversionTable && (
            <div className="px-6 pb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-orange-50">
                      <th className="text-left py-3 px-3 font-semibold text-gray-700">Grams</th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-700">US Cups</th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-700">US Legal Cups</th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-700">Metric Cups</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commonConversions.map((row) => {
                      const density = selectedIngredient === 'custom'
                        ? parseFloat(customDensity) || 236.59
                        : ingredients[selectedIngredient].gramsPerUSCup;

                      const usCups = row.grams / density;
                      const usLegalCups = row.grams / (density * (240 / 236.59));
                      const metricCups = row.grams / (density * (250 / 236.59));

                      return (
                        <tr key={row.grams} className="border-b border-gray-100 hover:bg-orange-50">
                          <td className="py-3 px-3 font-medium">{row.grams} g</td>
                          <td className="py-3 px-3">{formatCups(usCups)}</td>
                          <td className="py-3 px-3">{formatCups(usLegalCups)}</td>
                          <td className="py-3 px-3">{formatCups(metricCups)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* All Ingredients Reference */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">100 Grams to Cups - All Ingredients</h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-amber-50">
                    <th className="text-left py-3 px-3 font-semibold text-gray-700">Ingredient</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-700">g/cup</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-700">100g = US Cups</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(ingredients)
                    .filter(([key]) => key !== 'custom')
                    .map(([key, ingredient]) => (
                      <tr
                        key={key}
                        className={`border-b border-gray-100 hover:bg-orange-50 cursor-pointer ${
                          selectedIngredient === key ? 'bg-orange-100' : ''
                        }`}
                        onClick={() => setSelectedIngredient(key)}
                      >
                        <td className="py-3 px-3 font-medium">{ingredient.name}</td>
                        <td className="py-3 px-3">{ingredient.gramsPerUSCup}</td>
                        <td className="py-3 px-3 font-semibold text-orange-700">
                          {formatCups(100 / ingredient.gramsPerUSCup)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Formula Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <button
            onClick={() => setShowFormula(!showFormula)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Info className="w-5 h-5 mr-2 text-orange-600" />
              Conversion Formula
            </h3>
            {showFormula ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {showFormula && (
            <div className="px-6 pb-6 space-y-4">
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Grams to Cups Formula:</h4>
                <div className="bg-white rounded-lg p-3 font-mono text-sm">
                  <p>cups = weight (g) ÷ density (g/cup)</p>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-2">Cups to Grams Formula:</h4>
                <div className="bg-white rounded-lg p-3 font-mono text-sm">
                  <p>weight (g) = cups × density (g/cup)</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Cup Sizes:</h4>
                <div className="bg-white rounded-lg p-3 text-sm space-y-1">
                  <p><strong>US Customary Cup:</strong> 236.59 ml (used in recipes)</p>
                  <p><strong>US Legal Cup:</strong> 240 ml (used in nutrition labels)</p>
                  <p><strong>Metric Cup:</strong> 250 ml (UK, Australia, Canada, South Africa)</p>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">Why Density Matters:</h4>
                <p className="text-sm text-gray-700">
                  Different ingredients have different densities, meaning the same volume weighs differently. For example, 1 cup of flour (125g) weighs much less than 1 cup of honey (340g). This is why you need ingredient-specific conversions.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Educational Content */}
        <div className="prose prose-gray max-w-none">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Scale className="w-6 h-6 mr-2 text-orange-600" />
              Understanding Grams to Cups Conversions
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Why Can&apos;t You Use a Universal Conversion?</h3>
                <p>
                  Unlike converting between units of the same type (like grams to ounces), converting between weight and volume requires knowing the <strong>density</strong> of the specific ingredient. A cup of feathers and a cup of lead have the same volume but vastly different weights!
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Common Ingredient Conversions</h3>
                <div className="grid sm:grid-cols-2 gap-4 mt-3">
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-800">100g Flour</h4>
                    <p className="text-2xl font-bold text-orange-700 mt-1">0.80 US cups</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <h4 className="font-semibold text-amber-800">100g Sugar</h4>
                    <p className="text-2xl font-bold text-amber-700 mt-1">0.50 US cups</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800">100g Butter</h4>
                    <p className="text-2xl font-bold text-yellow-700 mt-1">0.44 US cups</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-800">100g Water</h4>
                    <p className="text-2xl font-bold text-green-700 mt-1">0.42 US cups</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Tips for Accurate Measurements</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Use a kitchen scale:</strong> Weighing ingredients is always more accurate than using cups</li>
                  <li><strong>Spoon and level:</strong> When using cups for flour, spoon it in and level off the top</li>
                  <li><strong>Don&apos;t pack:</strong> Unless specified, don&apos;t pack ingredients into cups (except brown sugar)</li>
                  <li><strong>Check your recipe source:</strong> US and metric recipes use different cup sizes</li>
                  <li><strong>Liquid vs dry measuring cups:</strong> Use the right type for better accuracy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: 'How many grams are in a cup?',
                a: 'It depends on the ingredient. For water, 1 US cup = 236.59g. For flour, 1 cup ≈ 125g. For sugar, 1 cup ≈ 200g. Always use ingredient-specific conversions for accuracy.'
              },
              {
                q: 'What\'s the difference between US cups and metric cups?',
                a: 'US customary cups are 236.59 ml, US legal cups (nutrition labels) are 240 ml, and metric cups (UK, Australia, Canada) are 250 ml. This ~6% difference can affect recipes.'
              },
              {
                q: 'Why do recipes use cups instead of grams?',
                a: 'Cups are traditional in US cooking and don\'t require a scale. However, professional bakers and most of the world prefer weight measurements for consistency and precision.'
              },
              {
                q: 'How accurate are cup measurements?',
                a: 'Cup measurements can vary by 10-20% depending on how you fill the cup, humidity, and ingredient settling. A kitchen scale accurate to 1g is much more reliable.'
              },
              {
                q: 'Can I convert any ingredient from grams to cups?',
                a: 'Yes, if you know the ingredient\'s density (grams per cup). Our calculator includes 20 common ingredients, and you can enter a custom density for any other ingredient.'
              },
              {
                q: 'Why does 1 cup of flour weigh less than 1 cup of sugar?',
                a: 'Flour is less dense than sugar because flour particles are lighter and trap more air. Sugar granules pack more tightly together, making the same volume weigh more.'
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                <h3 className="font-semibold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Calculators */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 sm:p-8 border border-orange-100 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Tbsp to Grams Converter', href: '/calculators/tbsp-to-grams-converter', desc: 'Tablespoons to grams' },
              { name: 'Oz to Cups Converter', href: '/calculators/oz-to-cups-converter', desc: 'Ounces to cups' },
              { name: 'ML to Grams Converter', href: '/calculators/ml-to-grams-converter', desc: 'Milliliters to grams' },
              { name: 'Kg to Lb Converter', href: '/calculators/kg-to-lb-converter', desc: 'Kilograms to pounds' },
              { name: 'Mg to ML Converter', href: '/calculators/mg-to-ml-converter', desc: 'Milligrams to milliliters' },
              { name: 'Calorie Calculator', href: '/calculators/calorie-calculator', desc: 'Daily calorie needs' },
            ].map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:border-orange-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                  {calc.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{calc.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-8 text-center text-white">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 text-orange-200" />
          <h2 className="text-2xl font-bold mb-3">Need Help with Cooking & Nutrition?</h2>
          <p className="text-orange-100 mb-6 max-w-xl mx-auto">
            Our expert tutors can help you understand cooking science, nutrition, and measurement conversions!
          </p>
          <Link
            href="/book-demo-class"
            className="inline-flex items-center px-6 py-3 bg-white text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-colors shadow-lg"
          >
            Book Your Free Session
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </main>

      <Footer />

      {/* Click outside to close dropdowns */}
      {(showIngredientDropdown || showWeightUnitDropdown || showCupTypeDropdown) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setShowIngredientDropdown(false);
            setShowWeightUnitDropdown(false);
            setShowCupTypeDropdown(false);
          }}
        />
      )}

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Grams to Cups Calculator',
            description: 'Free grams to cups converter for cooking. Convert grams to cups for flour, sugar, butter, honey, and 20+ ingredients.',
            url: 'https://www.thetutorbridge.com/calculators/grams-to-cups-calculator',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            permissions: 'browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />
    </div>
  );
}
