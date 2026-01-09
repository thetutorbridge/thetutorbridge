'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, Ruler, CheckCircle, HelpCircle, Lightbulb, BookOpen, TrendingUp, Target, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type AreaShape = 'Rectangle' | 'Square' | 'Circle' | 'Triangle';
type LengthUnit = 'feet' | 'inches' | 'yards' | 'meters' | 'centimeters';
type CostUnit = 'square foot, ft²' | 'square yard, yd²' | 'square meter, m²';

export default function SquareFootageCalculatorPage() {
  const [areaShape, setAreaShape] = useState<AreaShape>('Rectangle');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [radius, setRadius] = useState('');
  const [base, setBase] = useState('');
  const [height, setHeight] = useState('');
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>('feet');
  const [widthUnit, setWidthUnit] = useState<LengthUnit>('feet');
  const [quantity, setQuantity] = useState('1');
  const [wasteFactor, setWasteFactor] = useState('0');
  const [price, setPrice] = useState('');
  const [costUnit, setCostUnit] = useState<CostUnit>('square foot, ft²');

  const [results, setResults] = useState<{
    squareFeet: number;
    squareInches: number;
    squareYards: number;
    squareMeters: number;
    acres: number;
    cost: number;
  } | null>(null);

  // Conversion factors to feet
  const toFeet = (value: number, unit: LengthUnit): number => {
    switch (unit) {
      case 'feet': return value;
      case 'inches': return value / 12;
      case 'yards': return value * 3;
      case 'meters': return value * 3.28084;
      case 'centimeters': return value / 30.48;
      default: return value;
    }
  };

  // Calculate area based on shape
  const calculateArea = (): number | null => {
    let areaInSquareFeet = 0;

    switch (areaShape) {
      case 'Rectangle': {
        const l = parseFloat(length);
        const w = parseFloat(width);
        if (!l || !w) return null;
        const lengthInFeet = toFeet(l, lengthUnit);
        const widthInFeet = toFeet(w, widthUnit);
        areaInSquareFeet = lengthInFeet * widthInFeet;
        break;
      }
      case 'Square': {
        const side = parseFloat(length);
        if (!side) return null;
        const sideInFeet = toFeet(side, lengthUnit);
        areaInSquareFeet = sideInFeet * sideInFeet;
        break;
      }
      case 'Circle': {
        const r = parseFloat(radius);
        if (!r) return null;
        const radiusInFeet = toFeet(r, lengthUnit);
        areaInSquareFeet = Math.PI * radiusInFeet * radiusInFeet;
        break;
      }
      case 'Triangle': {
        const b = parseFloat(base);
        const h = parseFloat(height);
        if (!b || !h) return null;
        const baseInFeet = toFeet(b, lengthUnit);
        const heightInFeet = toFeet(h, widthUnit);
        areaInSquareFeet = (baseInFeet * heightInFeet) / 2;
        break;
      }
      default:
        return null;
    }

    return areaInSquareFeet;
  };

  const handleCalculate = () => {
    const baseArea = calculateArea();
    if (baseArea === null) {
      alert('Please enter valid dimensions');
      return;
    }

    // Apply quantity
    const qty = parseFloat(quantity) || 1;
    let totalArea = baseArea * qty;

    // Apply waste factor
    const waste = parseFloat(wasteFactor) || 0;
    if (waste > 0) {
      totalArea = totalArea * (1 + waste / 100);
    }

    // Convert to different units
    const squareFeet = totalArea;
    const squareInches = totalArea * 144;
    const squareYards = totalArea / 9;
    const squareMeters = totalArea * 0.092903;
    const acres = totalArea / 43560;

    // Calculate cost
    let cost = 0;
    if (price) {
      const priceValue = parseFloat(price);
      switch (costUnit) {
        case 'square foot, ft²':
          cost = priceValue * squareFeet;
          break;
        case 'square yard, yd²':
          cost = priceValue * squareYards;
          break;
        case 'square meter, m²':
          cost = priceValue * squareMeters;
          break;
      }
    }

    setResults({
      squareFeet,
      squareInches,
      squareYards,
      squareMeters,
      acres,
      cost
    });
  };

  const handleClear = () => {
    setLength('');
    setWidth('');
    setRadius('');
    setBase('');
    setHeight('');
    setQuantity('1');
    setWasteFactor('0');
    setPrice('');
    setResults(null);
  };

  const formatNumber = (num: number, decimals: number = 2): string => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  return (
    <>
      <Navigation />
      <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-8 md:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <Link
              href="/calculators"
              className="inline-flex items-center text-white/90 hover:text-white mb-4 md:mb-6 transition-colors text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Calculators
            </Link>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                  Square Footage Calculator - Free Area & Cost Calculator
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl">
                  Calculate square footage for any shape with unit conversions to sq ft, sq in, sq yd, sq m, and acres. Includes waste factor and materials cost estimation for flooring, painting, roofing, and construction projects.
                </p>
              </div>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                <Ruler className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {/* Main Calculator */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-8 lg:p-10">
                <div className="bg-gradient-to-r from-orange-700 to-red-600 text-white text-center py-4 rounded-lg mb-6">
                  <h2 className="text-xl md:text-2xl font-bold">Square Footage Calculator</h2>
                </div>

                {/* Area Shape Selector */}
                <div className="mb-6">
                  <Label htmlFor="area-shape" className="text-gray-700 font-semibold mb-3 block text-base md:text-lg">
                    Area Shape:
                  </Label>
                  <Select value={areaShape} onValueChange={(value: AreaShape) => setAreaShape(value)}>
                    <SelectTrigger id="area-shape" className="w-full border-2 border-[#2BAE66] text-lg py-6">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rectangle">Rectangle</SelectItem>
                      <SelectItem value="Square">Square</SelectItem>
                      <SelectItem value="Circle">Circle</SelectItem>
                      <SelectItem value="Triangle">Triangle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Dynamic Inputs Based on Shape */}
                <div className="space-y-6">
                  {areaShape === 'Rectangle' && (
                    <>
                      <div>
                        <Label htmlFor="length" className="text-gray-700 font-semibold mb-3 block text-base">
                          Length =
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            id="length"
                            type="number"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            placeholder="0"
                            className="text-center text-lg py-6 border-2 border-[#2BAE66]"
                          />
                          <Select value={lengthUnit} onValueChange={(value: LengthUnit) => setLengthUnit(value)}>
                            <SelectTrigger className="border-2 border-[#2BAE66] py-6">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="feet">feet</SelectItem>
                              <SelectItem value="inches">inches</SelectItem>
                              <SelectItem value="yards">yards</SelectItem>
                              <SelectItem value="meters">meters</SelectItem>
                              <SelectItem value="centimeters">centimeters</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="width" className="text-gray-700 font-semibold mb-3 block text-base">
                          Width =
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            id="width"
                            type="number"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            placeholder="0"
                            className="text-center text-lg py-6 border-2 border-[#2BAE66]"
                          />
                          <Select value={widthUnit} onValueChange={(value: LengthUnit) => setWidthUnit(value)}>
                            <SelectTrigger className="border-2 border-[#2BAE66] py-6">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="feet">feet</SelectItem>
                              <SelectItem value="inches">inches</SelectItem>
                              <SelectItem value="yards">yards</SelectItem>
                              <SelectItem value="meters">meters</SelectItem>
                              <SelectItem value="centimeters">centimeters</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </>
                  )}

                  {areaShape === 'Square' && (
                    <div>
                      <Label htmlFor="side" className="text-gray-700 font-semibold mb-3 block text-base">
                        Side Length =
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          id="side"
                          type="number"
                          value={length}
                          onChange={(e) => setLength(e.target.value)}
                          placeholder="0"
                          className="text-center text-lg py-6 border-2 border-[#2BAE66]"
                        />
                        <Select value={lengthUnit} onValueChange={(value: LengthUnit) => setLengthUnit(value)}>
                          <SelectTrigger className="border-2 border-[#2BAE66] py-6">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="feet">feet</SelectItem>
                            <SelectItem value="inches">inches</SelectItem>
                            <SelectItem value="yards">yards</SelectItem>
                            <SelectItem value="meters">meters</SelectItem>
                            <SelectItem value="centimeters">centimeters</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {areaShape === 'Circle' && (
                    <div>
                      <Label htmlFor="radius" className="text-gray-700 font-semibold mb-3 block text-base">
                        Radius =
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          id="radius"
                          type="number"
                          value={radius}
                          onChange={(e) => setRadius(e.target.value)}
                          placeholder="0"
                          className="text-center text-lg py-6 border-2 border-[#2BAE66]"
                        />
                        <Select value={lengthUnit} onValueChange={(value: LengthUnit) => setLengthUnit(value)}>
                          <SelectTrigger className="border-2 border-[#2BAE66] py-6">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="feet">feet</SelectItem>
                            <SelectItem value="inches">inches</SelectItem>
                            <SelectItem value="yards">yards</SelectItem>
                            <SelectItem value="meters">meters</SelectItem>
                            <SelectItem value="centimeters">centimeters</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {areaShape === 'Triangle' && (
                    <>
                      <div>
                        <Label htmlFor="base" className="text-gray-700 font-semibold mb-3 block text-base">
                          Base =
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            id="base"
                            type="number"
                            value={base}
                            onChange={(e) => setBase(e.target.value)}
                            placeholder="0"
                            className="text-center text-lg py-6 border-2 border-[#2BAE66]"
                          />
                          <Select value={lengthUnit} onValueChange={(value: LengthUnit) => setLengthUnit(value)}>
                            <SelectTrigger className="border-2 border-[#2BAE66] py-6">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="feet">feet</SelectItem>
                              <SelectItem value="inches">inches</SelectItem>
                              <SelectItem value="yards">yards</SelectItem>
                              <SelectItem value="meters">meters</SelectItem>
                              <SelectItem value="centimeters">centimeters</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="height" className="text-gray-700 font-semibold mb-3 block text-base">
                          Height =
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            id="height"
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="0"
                            className="text-center text-lg py-6 border-2 border-[#2BAE66]"
                          />
                          <Select value={widthUnit} onValueChange={(value: LengthUnit) => setWidthUnit(value)}>
                            <SelectTrigger className="border-2 border-[#2BAE66] py-6">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="feet">feet</SelectItem>
                              <SelectItem value="inches">inches</SelectItem>
                              <SelectItem value="yards">yards</SelectItem>
                              <SelectItem value="meters">meters</SelectItem>
                              <SelectItem value="centimeters">centimeters</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Quantity */}
                  <div>
                    <Label htmlFor="quantity" className="text-gray-700 font-semibold mb-3 block text-base">
                      Quantity =
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="1"
                      className="text-center text-lg py-6 border-2 border-[#2BAE66]"
                    />
                  </div>
                </div>

                {/* Optional Waste Factor */}
                <div className="mt-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 italic">
                    optional materials waste factor
                  </h3>
                  <div className="flex items-center gap-3">
                    <Label className="text-gray-700 font-semibold whitespace-nowrap">
                      Add an extra
                    </Label>
                    <Input
                      type="number"
                      value={wasteFactor}
                      onChange={(e) => setWasteFactor(e.target.value)}
                      placeholder="0"
                      className="w-24 text-center text-lg py-3 border-2 border-[#2BAE66]"
                    />
                    <span className="text-lg font-semibold">%</span>
                  </div>
                </div>

                {/* Optional Materials Cost */}
                <div className="mt-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 italic">
                    optional materials cost
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 items-end">
                    <div>
                      <Label className="text-sm text-gray-600 mb-2 block">price</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">$</span>
                        <Input
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="0"
                          className="text-center text-lg py-3 border-2 border-[#2BAE66]"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 mb-2 block">square unit</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">per</span>
                        <Select value={costUnit} onValueChange={(value: CostUnit) => setCostUnit(value)}>
                          <SelectTrigger className="border-2 border-[#2BAE66] py-3">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="square foot, ft²">square foot, ft²</SelectItem>
                            <SelectItem value="square yard, yd²">square yard, yd²</SelectItem>
                            <SelectItem value="square meter, m²">square meter, m²</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="py-6 text-lg font-semibold border-2 border-gray-300"
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={handleCalculate}
                    className="py-6 text-lg font-semibold bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] hover:opacity-90"
                  >
                    Calculate
                  </Button>
                </div>

                {/* Results */}
                {results && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-[#2BAE66]">
                    <h3 className="text-2xl font-bold text-[#1A3D7C] mb-6">Answer:</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-300">
                        <span className="text-lg font-semibold text-gray-700">Square Feet =</span>
                        <span className="text-2xl font-bold text-[#1A3D7C]">{formatNumber(results.squareFeet)} ft²</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-300">
                        <span className="text-lg font-semibold text-gray-700">Square Inches =</span>
                        <span className="text-xl font-bold text-gray-800">{formatNumber(results.squareInches, 0)} in²</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-300">
                        <span className="text-lg font-semibold text-gray-700">Square Yards =</span>
                        <span className="text-xl font-bold text-gray-800">{formatNumber(results.squareYards)} yd²</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-300">
                        <span className="text-lg font-semibold text-gray-700">Square Meters =</span>
                        <span className="text-xl font-bold text-gray-800">{formatNumber(results.squareMeters)} m²</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-300">
                        <span className="text-lg font-semibold text-gray-700">Acres =</span>
                        <span className="text-xl font-bold text-gray-800">{formatNumber(results.acres, 4)} ac</span>
                      </div>
                      {price && (
                        <div className="flex justify-between items-center py-3 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg px-4 mt-4">
                          <span className="text-lg font-semibold">Cost =</span>
                          <span className="text-2xl font-bold">${formatNumber(results.cost)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Help Box */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-base md:text-lg">
                    <HelpCircle className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    How to Use
                  </h3>
                  <ul className="space-y-2 text-sm md:text-base text-gray-700">
                    <li>✓ Select your area shape (Rectangle, Square, Circle, or Triangle)</li>
                    <li>✓ Enter dimensions with your preferred unit of measurement</li>
                    <li>✓ Add quantity if calculating multiple areas</li>
                    <li>✓ Add waste factor (5-10% typical for flooring/roofing)</li>
                    <li>✓ Enter price per square unit to calculate total material cost</li>
                    <li>✓ Results show in sq ft, sq in, sq yd, sq m, and acres</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Quick Reference */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 text-white sticky top-6">
                <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3" />
                  Quick Reference
                </h2>

                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="font-semibold text-[#FFC857] mb-2">Common Conversions</h3>
                    <ul className="text-sm space-y-1">
                      <li>1 sq ft = 144 sq in</li>
                      <li>1 sq yd = 9 sq ft</li>
                      <li>1 sq m = 10.764 sq ft</li>
                      <li>1 acre = 43,560 sq ft</li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="font-semibold text-[#FFC857] mb-2">Waste Factors</h3>
                    <ul className="text-sm space-y-1">
                      <li>Tile: 10-15%</li>
                      <li>Hardwood: 5-10%</li>
                      <li>Carpet: 5-10%</li>
                      <li>Paint: 10-20%</li>
                      <li>Roofing: 10-15%</li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="font-semibold text-[#FFC857] mb-2">Formulas</h3>
                    <ul className="text-sm space-y-1">
                      <li>Rectangle: L × W</li>
                      <li>Square: Side²</li>
                      <li>Circle: π × R²</li>
                      <li>Triangle: (B × H) ÷ 2</li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="font-semibold text-[#FFC857] mb-2">Common Uses</h3>
                    <ul className="text-sm space-y-1">
                      <li>✓ Flooring materials</li>
                      <li>✓ Paint coverage</li>
                      <li>✓ Roofing shingles</li>
                      <li>✓ Carpet & tile</li>
                      <li>✓ Land measurement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Content Sections */}
          <div className="mt-12 md:mt-16 space-y-8 md:space-y-12">
            {/* What is Square Footage Calculator */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                What is a Square Footage Calculator?
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  A <strong>square footage calculator</strong> is an area measurement tool that calculates the total surface area of floors, walls, rooms, yards, or land parcels in square feet and other common units. Also known as a <strong>sq ft calculator</strong>, <strong>footage calculator</strong>, or <strong>area calculator</strong>, this tool helps homeowners, contractors, designers, and DIY enthusiasts accurately measure spaces for flooring, painting, roofing, landscaping, and construction projects.
                </p>
                <p>
                  Our free square footage calculator supports multiple geometric shapes (rectangle, square, circle, triangle), converts between different measurement units (feet, inches, yards, meters, centimeters), displays results in five different area units (square feet, square inches, square yards, square meters, acres), and includes optional features like quantity multiplication, waste factor adjustment (typically 5-15% for materials), and materials cost estimation per square unit.
                </p>
                <p>
                  Unlike simple length × width calculators, our tool handles complex shapes, automatically converts mixed units, applies industry-standard waste factors for materials like tile, hardwood, carpet, or roofing shingles, and calculates total project costs when you input material prices. The calculator outputs precise measurements in both imperial (sq ft, sq in, sq yd) and metric (sq m) units, plus acres for land measurement, making it versatile for any project from small room renovations to large property assessments.
                </p>
                <p>
                  Whether you're estimating how much tile to buy for a bathroom, calculating paint coverage for walls, determining roofing shingle quantities, measuring lawn area for sod or fertilizer, or assessing property size for real estate purposes, this calculator provides accurate square footage with waste allowance to ensure you purchase sufficient materials without significant over-ordering.
                </p>
              </div>
            </section>

            {/* How to Calculate Square Footage */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                How to Calculate Square Footage for Different Shapes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    Rectangle & Square Rooms
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Formula:</strong> Length × Width (for rectangles) or Side × Side (for squares). Measure the longest wall for length and perpendicular wall for width. Convert all measurements to feet first.
                  </p>
                  <div className="bg-white p-3 rounded mt-3">
                    <p className="text-sm font-mono">Room: 12 ft × 15 ft</p>
                    <p className="text-sm font-mono">12 × 15 = 180 sq ft</p>
                    <p className="text-sm text-[#2BAE66]">+ 10% waste = 198 sq ft needed</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    Circular Areas
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Formula:</strong> π × Radius² (where π ≈ 3.14159). Measure from center to edge for radius, or divide diameter by 2. Perfect for round patios, pools, or gazebos.
                  </p>
                  <div className="bg-white p-3 rounded mt-3">
                    <p className="text-sm font-mono">Patio radius: 8 feet</p>
                    <p className="text-sm font-mono">3.14159 × 8² = 201.06 sq ft</p>
                    <p className="text-sm text-[#2BAE66]">Round pool or patio area</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    Triangular Spaces
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Formula:</strong> (Base × Height) ÷ 2. Measure the bottom edge (base) and perpendicular height from base to opposite point. Common for gabled walls or angular rooms.
                  </p>
                  <div className="bg-white p-3 rounded mt-3">
                    <p className="text-sm font-mono">Base: 10 ft, Height: 12 ft</p>
                    <p className="text-sm font-mono">(10 × 12) ÷ 2 = 60 sq ft</p>
                    <p className="text-sm text-[#2BAE66]">Gable wall or attic space</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-red-50 p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    Multiple Areas & Waste Factor
                  </h3>
                  <p className="text-gray-700 mb-3">
                    For multiple identical rooms, calculate one area and multiply by quantity. Always add <strong>waste factor</strong>: 5-10% for hardwood/carpet, 10-15% for tile, 10-20% for paint.
                  </p>
                  <div className="bg-white p-3 rounded mt-3">
                    <p className="text-sm font-mono">3 rooms @ 180 sq ft each = 540 sq ft</p>
                    <p className="text-sm font-mono">+ 10% waste = 594 sq ft</p>
                    <p className="text-sm text-[#2BAE66]">Total material needed</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <Target className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Why Use Our Square Footage Calculator?
              </h2>
              <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Multiple Shape Support
                    </h3>
                    <p className="text-white/90">
                      Calculate area for rectangles, squares, circles, and triangles. Perfect for rooms, pools, patios, gables, and irregular spaces. No need for separate calculators - one tool handles all common geometric shapes.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Unit Conversion Built-In
                    </h3>
                    <p className="text-white/90">
                      Input measurements in feet, inches, yards, meters, or centimeters - the calculator automatically converts to square feet and other units. Mix units freely: length in feet, width in inches - no manual conversion needed.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Automatic Waste Factor
                    </h3>
                    <p className="text-white/90">
                      Add 0-100% waste factor for materials that require cutting, fitting, or allowance for damage. Industry-standard percentages: tile 10-15%, hardwood 5-10%, paint 10-20%. Ensures you buy enough without significant excess.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Material Cost Estimator
                    </h3>
                    <p className="text-white/90">
                      Enter material price per square foot, yard, or meter to instantly calculate total project cost including waste. Compare materials easily: $3/sq ft tile vs $5/sq ft hardwood for your 300 sq ft room.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Multiple Unit Results
                    </h3>
                    <p className="text-white/90">
                      See results in 5 units simultaneously: square feet (sq ft), square inches (sq in), square yards (sq yd), square meters (sq m), and acres (ac). Perfect for materials sold in different units or international projects.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Quantity Multiplier
                    </h3>
                    <p className="text-white/90">
                      Calculate multiple identical areas at once. Three bedrooms same size? Enter dimensions once, set quantity to 3, get total square footage instantly. Saves time for multi-room projects.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                Real-World Square Footage Applications
              </h2>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    🏠 Flooring Installation (Tile, Hardwood, Carpet)
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Scenario:</strong> Installing tile in a 12 ft × 15 ft kitchen. Tile costs $4.50 per sq ft. Need 10% waste for cuts and breakage.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Calculation:</strong> 12 × 15 = 180 sq ft. With 10% waste: 180 × 1.10 = 198 sq ft. Cost: 198 × $4.50 = $891
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    Result: Order 198 sq ft of tile, budget $891 for materials
                  </p>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    🎨 Wall Painting & Paint Coverage
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Scenario:</strong> Painting a bedroom with 4 walls (10 ft × 8 ft ceiling height). Paint covers 350 sq ft per gallon. Need 15% waste for texture/absorption.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Calculation:</strong> Total wall area: (10+10+12+12) × 8 = 352 sq ft. With 15% waste: 352 × 1.15 = 404.8 sq ft. Gallons: 404.8 ÷ 350 = 1.16 → 2 gallons
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    Result: Buy 2 gallons of paint (allowing for 2 coats if needed)
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    🏗️ Roofing Materials (Shingles, Metal)
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Scenario:</strong> Roof is 40 ft × 25 ft. Shingles sold per "square" (100 sq ft). Need 10% waste for overlap and ridge caps.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Calculation:</strong> 40 × 25 = 1,000 sq ft. With 10% waste: 1,000 × 1.10 = 1,100 sq ft. Squares needed: 1,100 ÷ 100 = 11 squares
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    Result: Order 11 squares of roofing shingles
                  </p>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    🌿 Landscaping (Sod, Mulch, Fertilizer)
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Scenario:</strong> Laying sod in backyard (50 ft × 30 ft). Sod comes in pallets covering 450 sq ft each. Add 5% for irregular edges.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Calculation:</strong> 50 × 30 = 1,500 sq ft. With 5% waste: 1,500 × 1.05 = 1,575 sq ft. Pallets: 1,575 ÷ 450 = 3.5 → 4 pallets
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    Result: Order 4 pallets of sod (1,800 sq ft total)
                  </p>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    📐 Real Estate & Property Measurement
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Scenario:</strong> Measuring lot size for property listing. Lot is 150 ft × 200 ft. Convert to acres for MLS listing.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Calculation:</strong> 150 × 200 = 30,000 sq ft. Acres: 30,000 ÷ 43,560 = 0.6887 acres ≈ 0.69 acres
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    Result: List property as 0.69 acres or 30,000 sq ft
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    🏊 Pool Deck or Patio Construction
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Scenario:</strong> Building circular patio around pool, radius 12 feet. Pavers cost $8 per sq ft.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Calculation:</strong> π × 12² = 3.14159 × 144 = 452.39 sq ft. Cost: 452.39 × $8 = $3,619.12
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    Result: 452 sq ft of pavers needed, $3,619 budget
                  </p>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How do I calculate square footage of a room?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Measure the <strong>length and width</strong> of the room in feet using a tape measure. Multiply length × width to get square feet. For example: a room that is 12 feet long and 10 feet wide is 12 × 10 = 120 square feet. For irregular rooms, divide into rectangles, calculate each section, then add them together.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    What is waste factor and why do I need it?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    <strong>Waste factor</strong> accounts for material lost during cutting, fitting, breakage, and imperfect installations. Recommended percentages: <strong>tile 10-15%</strong> (complex patterns need more), <strong>hardwood/laminate 5-10%</strong>, <strong>carpet 5-10%</strong>, <strong>paint 10-20%</strong>, <strong>roofing 10-15%</strong>. Without waste factor, you'll run short and face delays waiting for additional materials.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How many square feet are in a square yard?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    <strong>1 square yard = 9 square feet</strong>. Since 1 yard = 3 feet, when you square both sides: (1 yd)² = (3 ft)², so 1 sq yd = 9 sq ft. Carpet is often sold by the square yard. To convert: divide square feet by 9. Example: 180 sq ft ÷ 9 = 20 square yards of carpet.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Can I mix different units of measurement?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Yes! Our calculator allows you to enter length in one unit (e.g., feet) and width in another (e.g., inches), and it automatically converts to calculate accurate square footage. For example: length = 12 feet, width = 18 inches → the calculator converts 18 inches to 1.5 feet, then calculates 12 × 1.5 = 18 sq ft.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How do I measure square footage for flooring?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    <strong>Step 1:</strong> Measure room length and width at the widest points (walls aren't always perfectly straight). <strong>Step 2:</strong> Multiply for square footage. <strong>Step 3:</strong> Add 5-15% waste factor depending on material and pattern. <strong>Step 4:</strong> For multiple rooms, calculate each separately then add together. Always round up when ordering materials.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    What if my room has closets or alcoves?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    <strong>Method 1 (Subtract):</strong> Calculate the main room area, then calculate closet/alcove areas separately and subtract. <strong>Method 2 (Add):</strong> Divide room into rectangles (main room + closet), calculate each, add together. For flooring/carpet, include closet areas. For painting, calculate walls separately - alcoves add perimeter.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How much paint do I need per square foot?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    <strong>One gallon of paint</strong> typically covers <strong>350-400 square feet</strong> of smooth wall with one coat. Textured walls, porous surfaces, or dark-to-light color changes require more. Formula: (Total sq ft ÷ 350) × number of coats = gallons needed. Always add 10-20% for touchups and waste. Example: 400 sq ft wall, 2 coats → (400 ÷ 350) × 2 = 2.3 gallons → buy 3 gallons.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How do I convert square feet to acres?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    <strong>1 acre = 43,560 square feet</strong>. To convert sq ft to acres: divide by 43,560. Example: 10,000 sq ft ÷ 43,560 = 0.2296 acres (about ¼ acre). To convert acres to sq ft: multiply by 43,560. Example: 0.5 acres × 43,560 = 21,780 sq ft. Our calculator shows both automatically.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Do I measure flooring by inside wall or outside wall?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Always measure <strong>inside wall to inside wall</strong> (the actual floor space). Don't include wall thickness. Use a tape measure along the floor, not ceiling or mid-wall. For irregular rooms with bumps or alcoves, break into rectangles and measure each section separately.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Can this calculator help with tile layout patterns?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    While the calculator gives you <strong>total square footage needed</strong>, complex patterns like diagonal, herringbone, or chevron require higher waste factors (15-20% instead of 10%). The calculator's waste factor feature accommodates this. For exact tile count, divide total sq ft by individual tile area (e.g., 12" × 12" tile = 1 sq ft each).
                  </p>
                </div>
              </div>
            </section>

            {/* Conversion Reference Table */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                Area Conversion Reference Table
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
                      <th className="border border-gray-300 p-3 text-left">Square Feet (sq ft)</th>
                      <th className="border border-gray-300 p-3 text-left">Square Inches (sq in)</th>
                      <th className="border border-gray-300 p-3 text-left">Square Yards (sq yd)</th>
                      <th className="border border-gray-300 p-3 text-left">Square Meters (sq m)</th>
                      <th className="border border-gray-300 p-3 text-left">Acres</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">1</td>
                      <td className="border border-gray-300 p-3">144</td>
                      <td className="border border-gray-300 p-3">0.1111</td>
                      <td className="border border-gray-300 p-3">0.0929</td>
                      <td className="border border-gray-300 p-3">0.000023</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">100</td>
                      <td className="border border-gray-300 p-3">14,400</td>
                      <td className="border border-gray-300 p-3">11.11</td>
                      <td className="border border-gray-300 p-3">9.29</td>
                      <td className="border border-gray-300 p-3">0.0023</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">500</td>
                      <td className="border border-gray-300 p-3">72,000</td>
                      <td className="border border-gray-300 p-3">55.56</td>
                      <td className="border border-gray-300 p-3">46.45</td>
                      <td className="border border-gray-300 p-3">0.0115</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">1,000</td>
                      <td className="border border-gray-300 p-3">144,000</td>
                      <td className="border border-gray-300 p-3">111.11</td>
                      <td className="border border-gray-300 p-3">92.90</td>
                      <td className="border border-gray-300 p-3">0.0230</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">5,000</td>
                      <td className="border border-gray-300 p-3">720,000</td>
                      <td className="border border-gray-300 p-3">555.56</td>
                      <td className="border border-gray-300 p-3">464.52</td>
                      <td className="border border-gray-300 p-3">0.1148</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">43,560</td>
                      <td className="border border-gray-300 p-3">6,272,640</td>
                      <td className="border border-gray-300 p-3">4,840</td>
                      <td className="border border-gray-300 p-3">4,046.86</td>
                      <td className="border border-gray-300 p-3">1.0 (1 acre)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Tips Section */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Pro Tips for Accurate Measurements
              </h2>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-gray-200">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Always round up when ordering materials:</strong> If calculator shows 247.6 sq ft, order 248 sq ft minimum. Better to have extra than run short mid-project. Leftover flooring/tile is useful for future repairs.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Measure twice, calculate once:</strong> Double-check all measurements before ordering expensive materials. Walls aren't always straight - measure at multiple points and use the longest dimension to ensure coverage.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Account for pattern matching:</strong> Patterned materials (wood grain, tile designs, wallpaper) need extra for matching. Add 15-25% waste instead of standard 10% for complex patterns or diagonal installations.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Subtract large obstacles:</strong> For flooring, subtract built-in cabinets, islands, tubs, or large permanent fixtures. Don't subtract for appliances or furniture that can be moved. For walls, subtract large windows and doors.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Use consistent units:</strong> Don't mix feet and inches in your head - convert everything to feet (with decimals) or use calculator's mixed unit feature. 6 inches = 0.5 feet, 3 inches = 0.25 feet, 9 inches = 0.75 feet.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Consider material packaging:</strong> Materials come in specific sizes (carpet rolls, tile boxes, paint gallons). Check packaging before ordering - you might need to round up to full boxes/rolls even if calculator shows exact footage.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>For multi-room projects, calculate separately:</strong> Don't assume rooms are identical - measure each individually. Variations in wall straightness, corners, and built-ins mean "identical" rooms often differ by 5-10 sq ft.
                    </p>
                  </li>
                </ul>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-xl md:rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Explore More Calculators
              </h2>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Check out our other practical and educational calculators
              </p>
              <Link href="/calculators">
                <Button className="bg-white text-[#1A3D7C] hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
                  View All Calculators
                </Button>
              </Link>
            </section>

            {/* Book Your Session CTA */}
            <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center text-white">
                  <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
                  <h2 className="text-2xl md:text-4xl font-bold mb-4">
                    Need Help with Area & Geometry?
                  </h2>
                  <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                    Our expert tutors can help you master area calculations, geometry, and measurement concepts. Get personalized one-on-one guidance tailored to your learning style.
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
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#1A3D7C] text-white py-8 md:py-12 mt-12 md:mt-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">The Tutor Bridge</h3>
                <p className="text-white/80 text-sm">
                  Free square footage and area calculators for construction, home improvement, and land measurement.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/calculators" className="text-white/80 hover:text-white transition-colors">
                      All Calculators
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-white/80 hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">About This Calculator</h3>
                <p className="text-white/80 text-sm">
                  Free square footage calculator with multiple shapes, unit conversions, waste factor, and cost estimation.
                </p>
              </div>
            </div>
            <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
              <p>&copy; 2026 The Tutor Bridge. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
