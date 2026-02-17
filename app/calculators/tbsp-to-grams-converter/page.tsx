'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, ChevronRight, Info, ChevronDown, ChevronUp, GraduationCap, Scale } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

type TbspType = 'metric' | 'us';

interface Ingredient {
  name: string;
  density: number; // g/ml
  gramsPerTbsp: number; // pre-calculated for metric tbsp (15ml)
}

// Ingredient densities and grams per tablespoon
const ingredients: Record<string, Ingredient> = {
  water: { name: 'Water', density: 1.0, gramsPerTbsp: 15 },
  milk: { name: 'Milk', density: 1.03, gramsPerTbsp: 15.45 },
  flour: { name: 'Flour', density: 0.53, gramsPerTbsp: 7.95 },
  sugar: { name: 'Sugar', density: 0.845, gramsPerTbsp: 12.68 },
  salt: { name: 'Salt', density: 1.2, gramsPerTbsp: 18 },
  honey: { name: 'Honey', density: 1.42, gramsPerTbsp: 21.3 },
  butter: { name: 'Butter', density: 0.959, gramsPerTbsp: 14.39 },
  oil: { name: 'Oil', density: 0.92, gramsPerTbsp: 13.8 },
  nuts_seeds: { name: 'Nuts and seeds', density: 0.65, gramsPerTbsp: 9.75 },
  cacao: { name: 'Cacao', density: 0.52, gramsPerTbsp: 7.8 },
  rice: { name: 'Rice (raw)', density: 0.85, gramsPerTbsp: 12.75 },
  oats: { name: 'Oats', density: 0.41, gramsPerTbsp: 6.15 },
  jam: { name: 'Jam', density: 1.33, gramsPerTbsp: 19.95 },
  nutella: { name: 'Nutella', density: 1.2, gramsPerTbsp: 18 },
  maple_syrup: { name: 'Maple syrup', density: 1.37, gramsPerTbsp: 20.55 },
  cream_38: { name: 'Cream 38% fat', density: 0.99, gramsPerTbsp: 14.85 },
  cream_13: { name: 'Cream 13% fat', density: 1.01, gramsPerTbsp: 15.15 },
  custom: { name: 'Custom ingredient', density: 1.0, gramsPerTbsp: 15 },
};

// Tablespoon sizes in ml
const tbspSizes: Record<TbspType, { label: string; ml: number }> = {
  metric: { label: 'tablespoons (15 ml)', ml: 15 },
  us: { label: 'US tablespoons (14.79 ml)', ml: 14.79 },
};

export default function TbspToGramsConverter() {
  const [selectedIngredient, setSelectedIngredient] = useState<string>('butter');
  const [tbspType, setTbspType] = useState<TbspType>('metric');
  const [tablespoons, setTablespoons] = useState<string>('');
  const [grams, setGrams] = useState<string>('');
  const [customDensity, setCustomDensity] = useState<string>('1.0');
  const [activeInput, setActiveInput] = useState<'tbsp' | 'grams'>('tbsp');
  const [showIngredientDropdown, setShowIngredientDropdown] = useState(false);
  const [showTbspDropdown, setShowTbspDropdown] = useState(false);
  const [showDensity, setShowDensity] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [showConversionTable, setShowConversionTable] = useState(false);

  // Get current density
  const getCurrentDensity = (): number => {
    if (selectedIngredient === 'custom') {
      return parseFloat(customDensity) || 1.0;
    }
    return ingredients[selectedIngredient].density;
  };

  // Convert tbsp to grams
  const tbspToGrams = (tbsp: number): number => {
    const density = getCurrentDensity();
    const ml = tbspSizes[tbspType].ml;
    return tbsp * ml * density;
  };

  // Convert grams to tbsp
  const gramsToTbsp = (g: number): number => {
    const density = getCurrentDensity();
    const ml = tbspSizes[tbspType].ml;
    return g / (ml * density);
  };

  // Auto-calculate on input change
  useEffect(() => {
    if (activeInput === 'tbsp') {
      const tbsp = parseFloat(tablespoons);
      if (!isNaN(tbsp) && tbsp >= 0) {
        const result = tbspToGrams(tbsp);
        setGrams(result.toFixed(2).replace(/\.?0+$/, ''));
      } else if (tablespoons === '') {
        setGrams('');
      }
    } else {
      const g = parseFloat(grams);
      if (!isNaN(g) && g >= 0) {
        const result = gramsToTbsp(g);
        setTablespoons(result.toFixed(2).replace(/\.?0+$/, ''));
      } else if (grams === '') {
        setTablespoons('');
      }
    }
  }, [tablespoons, grams, selectedIngredient, tbspType, customDensity, activeInput]);

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setShowIngredientDropdown(false);
    setShowTbspDropdown(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many grams is 1 tablespoon of butter?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "One tablespoon (15 ml) of butter weighs approximately 14.4 grams. This is because butter has a density of about 0.959 g/ml, making it slightly lighter than water."
          }
        }
      ]
    }) }}
      />
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
            <span className="text-gray-600">Tbsp to Grams Converter</span>
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
            Tbsp to Grams Converter
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Convert tablespoons to grams for any cooking ingredient. Select your ingredient and get accurate weight measurements instantly.
          </p>
        </div>

        {/* Main Converter Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              Tablespoon to Grams Converter
            </h2>
          </div>

          <div className="p-6 space-y-5">
            {/* Ingredient Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ingredient</label>
              <div className="relative">
                <button
                  onClick={() => {
                    closeAllDropdowns();
                    setShowIngredientDropdown(!showIngredientDropdown);
                  }}
                  className="w-full px-4 py-3 border-2 border-orange-300 bg-orange-50 rounded-xl hover:border-orange-400 transition-all flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-gray-800">{ingredients[selectedIngredient].name}</span>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </button>
                {showIngredientDropdown && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-20 max-h-80 overflow-y-auto">
                    {Object.entries(ingredients).map(([key, ingredient]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedIngredient(key);
                          setShowIngredientDropdown(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors flex items-center justify-between ${
                          selectedIngredient === key ? 'bg-orange-100 text-orange-700' : 'text-gray-700'
                        }`}
                      >
                        <span>{ingredient.name}</span>
                        {key !== 'custom' && (
                          <span className="text-sm text-gray-500">{ingredient.gramsPerTbsp}g/tbsp</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tablespoons Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tablespoons</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={tablespoons}
                  onChange={(e) => {
                    setTablespoons(e.target.value);
                    setActiveInput('tbsp');
                  }}
                  onFocus={() => setActiveInput('tbsp')}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-lg"
                  placeholder="Enter tablespoons"
                  min="0"
                  step="any"
                />
                <div className="relative">
                  <button
                    onClick={() => {
                      closeAllDropdowns();
                      setShowTbspDropdown(!showTbspDropdown);
                    }}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-all flex items-center gap-2 bg-gray-50 min-w-[120px] justify-between"
                  >
                    <span className="font-medium text-gray-700 text-sm">tbsp</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                  {showTbspDropdown && (
                    <div className="absolute right-0 top-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-20 min-w-[260px] overflow-hidden">
                      {(Object.keys(tbspSizes) as TbspType[]).map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setTbspType(type);
                            setShowTbspDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors ${
                            tbspType === type ? 'bg-orange-100 text-orange-700' : 'text-gray-700'
                          }`}
                        >
                          {tbspSizes[type].label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Grams Input/Output */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Grams</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={grams}
                  onChange={(e) => {
                    setGrams(e.target.value);
                    setActiveInput('grams');
                  }}
                  onFocus={() => setActiveInput('grams')}
                  className="flex-1 px-4 py-3 border-2 border-orange-300 bg-orange-50 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-lg font-semibold text-orange-700"
                  placeholder="Result in grams"
                  min="0"
                  step="any"
                />
                <span className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium flex items-center">g</span>
              </div>
            </div>

            {/* Show Ingredient Density Checkbox */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="showDensity"
                checked={showDensity}
                onChange={(e) => setShowDensity(e.target.checked)}
                className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="showDensity" className="text-sm text-gray-700">
                Show ingredient density
              </label>
            </div>

            {/* Density Display / Custom Density Input */}
            {showDensity && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ingredient Density (g/ml)
                </label>
                {selectedIngredient === 'custom' ? (
                  <input
                    type="number"
                    value={customDensity}
                    onChange={(e) => setCustomDensity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    placeholder="Enter density (g/ml)"
                    min="0"
                    step="0.01"
                  />
                ) : (
                  <div className="px-4 py-3 bg-white rounded-xl border border-gray-200 font-semibold text-gray-800">
                    {getCurrentDensity()} g/ml
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Density determines how heavy an ingredient is per unit volume.
                  Water has a density of 1.0 g/ml.
                </p>
              </div>
            )}

            {/* Result Summary */}
            {grams && parseFloat(grams) > 0 && (
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-700">
                    {tablespoons} {tbspType === 'metric' ? 'tbsp' : 'US tbsp'} of {ingredients[selectedIngredient].name.toLowerCase()} = {grams} g
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Using {tbspSizes[tbspType].ml} ml per tablespoon × {getCurrentDensity()} g/ml density
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Conversion Table Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <button
            onClick={() => setShowConversionTable(!showConversionTable)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-orange-600" />
              Tbsp to Grams Conversion Table
            </h3>
            {showConversionTable ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {showConversionTable && (
            <div className="px-6 pb-6">
              <p className="text-sm text-gray-600 mb-4">
                Grams per tablespoon (15 ml metric) for common ingredients:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-orange-50">
                      <th className="py-3 px-3 text-left font-semibold text-gray-700 border-b">Ingredient</th>
                      <th className="py-3 px-3 text-center font-semibold text-gray-700 border-b">1 tbsp</th>
                      <th className="py-3 px-3 text-center font-semibold text-gray-700 border-b">2 tbsp</th>
                      <th className="py-3 px-3 text-center font-semibold text-gray-700 border-b">3 tbsp</th>
                      <th className="py-3 px-3 text-center font-semibold text-gray-700 border-b">Density</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(ingredients)
                      .filter(([key]) => key !== 'custom')
                      .map(([key, ingredient]) => (
                        <tr
                          key={key}
                          className={`hover:bg-orange-50 cursor-pointer transition-colors ${
                            selectedIngredient === key ? 'bg-orange-100' : ''
                          }`}
                          onClick={() => setSelectedIngredient(key)}
                        >
                          <td className="py-3 px-3 border-b font-medium text-gray-800">{ingredient.name}</td>
                          <td className="py-3 px-3 border-b text-center">{ingredient.gramsPerTbsp.toFixed(1)}g</td>
                          <td className="py-3 px-3 border-b text-center">{(ingredient.gramsPerTbsp * 2).toFixed(1)}g</td>
                          <td className="py-3 px-3 border-b text-center">{(ingredient.gramsPerTbsp * 3).toFixed(1)}g</td>
                          <td className="py-3 px-3 border-b text-center text-gray-500">{ingredient.density} g/ml</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
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
                <h4 className="font-semibold text-orange-800 mb-2">Tbsp to Grams Formula:</h4>
                <div className="bg-white rounded-lg p-3 font-mono text-lg text-center">
                  grams = tablespoons × ml per tbsp × density
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  For metric tablespoons: g = tbsp × 15 × density (g/ml)
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Grams to Tbsp Formula:</h4>
                <div className="bg-white rounded-lg p-3 font-mono text-lg text-center">
                  tablespoons = grams ÷ (ml per tbsp × density)
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  For metric tablespoons: tbsp = g ÷ (15 × density)
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">Tablespoon Sizes:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Metric tablespoon:</strong> 15 ml (used in most countries)</li>
                  <li><strong>US tablespoon:</strong> 14.79 ml (≈ 14.8 ml)</li>
                  <li><strong>Australian tablespoon:</strong> 20 ml</li>
                  <li><strong>UK tablespoon:</strong> 15 ml (same as metric)</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Educational Content */}
        <div className="prose prose-gray max-w-none">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Scale className="w-6 h-6 mr-2 text-orange-600" />
              Understanding Tbsp to Grams Conversion
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Why Convert Tablespoons to Grams?</h3>
                <p>
                  While tablespoons measure <strong>volume</strong>, grams measure <strong>weight</strong>. Different ingredients have different densities, so 1 tablespoon of flour weighs much less than 1 tablespoon of honey. Converting to grams gives you more accurate measurements for:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Precise baking recipes (especially European recipes)</li>
                  <li>Nutritional calculations</li>
                  <li>Scaling recipes up or down</li>
                  <li>Consistent results every time</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Common Conversions</h3>
                <div className="grid sm:grid-cols-2 gap-4 mt-3">
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-800">Butter</h4>
                    <p className="text-sm mt-1">1 tbsp = 14.4 g</p>
                    <p className="text-xs text-gray-600">1 stick = 8 tbsp = 113 g</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <h4 className="font-semibold text-amber-800">Sugar</h4>
                    <p className="text-sm mt-1">1 tbsp = 12.7 g</p>
                    <p className="text-xs text-gray-600">Granulated white sugar</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800">Flour</h4>
                    <p className="text-sm mt-1">1 tbsp = 8 g</p>
                    <p className="text-xs text-gray-600">All-purpose flour</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-800">Honey</h4>
                    <p className="text-sm mt-1">1 tbsp = 21.3 g</p>
                    <p className="text-xs text-gray-600">Dense, sweet syrup</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Why Does Density Matter?</h3>
                <p>
                  Density is mass per unit volume. Water has a density of 1 g/ml, meaning 1 ml of water weighs 1 gram. Ingredients with higher density (like honey at 1.42 g/ml) are heavier per tablespoon, while less dense ingredients (like flour at 0.53 g/ml) are lighter.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mt-3">
                  <p className="font-medium">Example:</p>
                  <p className="text-sm mt-1">1 tablespoon (15 ml) of different ingredients:</p>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• Water: 15 × 1.0 = <strong>15 g</strong></li>
                    <li>• Honey: 15 × 1.42 = <strong>21.3 g</strong></li>
                    <li>• Flour: 15 × 0.53 = <strong>8 g</strong></li>
                  </ul>
                </div>
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
                q: 'How many grams is 1 tablespoon of butter?',
                a: 'One tablespoon (15 ml) of butter weighs approximately 14.4 grams. This is because butter has a density of about 0.959 g/ml, making it slightly lighter than water.'
              },
              {
                q: 'How many grams is 1 tablespoon of flour?',
                a: 'One tablespoon of all-purpose flour weighs about 8 grams. Flour is much lighter than water due to its low density (0.53 g/ml) and the air pockets between particles.'
              },
              {
                q: 'How many grams is 1 tablespoon of sugar?',
                a: 'One tablespoon of granulated sugar weighs approximately 12.7 grams. Brown sugar is slightly heavier at about 13.8 grams per tablespoon due to molasses content.'
              },
              {
                q: 'What\'s the difference between metric and US tablespoons?',
                a: 'A metric tablespoon is exactly 15 ml, while a US tablespoon is slightly smaller at 14.79 ml. For most cooking purposes, the difference is negligible, but it can matter in precise baking.'
              },
              {
                q: 'How do I convert grams back to tablespoons?',
                a: 'Divide the weight in grams by the grams per tablespoon for that ingredient. For example, 30g of butter ÷ 14.4g per tbsp = 2.08 tablespoons.'
              },
              {
                q: 'Why do recipes use grams instead of tablespoons?',
                a: 'Grams provide more accurate measurements because they measure weight, not volume. Ingredients can be packed differently (like flour), so volume measurements can vary. Professional bakers and European recipes typically use grams for consistency.'
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
              { name: 'ml to Grams Converter', href: '/calculators/ml-to-grams-converter', desc: 'Convert ml to grams' },
              { name: 'mg to ml Converter', href: '/calculators/mg-to-ml-converter', desc: 'Convert mass to volume' },
              { name: 'Oz to Cups Converter', href: '/calculators/oz-to-cups-converter', desc: 'Convert oz to cups' },
              { name: 'Kg to Lb Converter', href: '/calculators/kg-to-lb-converter', desc: 'Convert weight units' },
              { name: 'Calorie Calculator', href: '/calculators/calorie-calculator', desc: 'Daily calorie needs' },
              { name: 'BMI Calculator', href: '/calculators/bmi-calculator', desc: 'Calculate body mass index' },
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
          <h2 className="text-2xl font-bold mb-3">Need Help with Cooking Math?</h2>
          <p className="text-orange-100 mb-6 max-w-xl mx-auto">
            Our expert tutors can help you understand measurement conversions, ratios, and kitchen math!
          </p>
          <Link
            href="/tutoring/free-consultation"
            className="inline-flex items-center px-6 py-3 bg-white text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-colors shadow-lg"
          >
            Book Your Free Session
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </main>

      <Footer />

      {/* Click outside to close dropdowns */}
      {(showIngredientDropdown || showTbspDropdown) && (
        <div
          className="fixed inset-0 z-10"
          onClick={closeAllDropdowns}
        />
      )}

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Tbsp to Grams Converter',
            description: 'Free tbsp to grams converter for cooking. Convert tablespoons to grams for butter, flour, sugar, honey, and 15+ ingredients.',
            url: 'https://www.thetutorbridge.com/calculators/tbsp-to-grams-converter',
            applicationCategory: 'UtilityApplication',
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
