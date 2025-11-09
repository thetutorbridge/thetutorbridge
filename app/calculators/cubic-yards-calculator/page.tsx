'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

type ShapeType = 'rectangle' | 'square' | 'circle' | 'triangle' | 'rectangle-border' | 'circle-border' | 'annulus' | 'trapezoid';
type LengthUnit = 'in' | 'ft' | 'yds' | 'mm' | 'cm' | 'm';
type CostPerUnit = 'foot' | 'yard' | 'meter';
type Currency = '$' | '€' | '£' | '₹' | '元' | '¥' | 'R' | 'Rp';

export default function CubicYardsCalculator() {
  const [shape, setShape] = useState<ShapeType>('rectangle');
  const [depth, setDepth] = useState<string>('');
  const [depthUnit, setDepthUnit] = useState<LengthUnit>('in');
  const [length, setLength] = useState<string>('');
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>('ft');
  const [width, setWidth] = useState<string>('');
  const [widthUnit, setWidthUnit] = useState<LengthUnit>('ft');
  const [radius, setRadius] = useState<string>('');
  const [radiusUnit, setRadiusUnit] = useState<LengthUnit>('ft');
  const [base, setBase] = useState<string>('');
  const [baseUnit, setBaseUnit] = useState<LengthUnit>('ft');
  const [height, setHeight] = useState<string>('');
  const [heightUnit, setHeightUnit] = useState<LengthUnit>('ft');
  const [borderWidth, setBorderWidth] = useState<string>('');
  const [borderWidthUnit, setBorderWidthUnit] = useState<LengthUnit>('ft');
  const [innerRadius, setInnerRadius] = useState<string>('');
  const [innerRadiusUnit, setInnerRadiusUnit] = useState<LengthUnit>('ft');
  const [outerRadius, setOuterRadius] = useState<string>('');
  const [outerRadiusUnit, setOuterRadiusUnit] = useState<LengthUnit>('ft');
  const [topWidth, setTopWidth] = useState<string>('');
  const [topWidthUnit, setTopWidthUnit] = useState<LengthUnit>('ft');
  const [bottomWidth, setBottomWidth] = useState<string>('');
  const [bottomWidthUnit, setBottomWidthUnit] = useState<LengthUnit>('ft');
  const [quantity, setQuantity] = useState<string>('1');
  const [price, setPrice] = useState<string>('0');
  const [costPerUnit, setCostPerUnit] = useState<CostPerUnit>('yard');
  const [currency, setCurrency] = useState<Currency>('$');

  const [result, setResult] = useState<{
    cubicYards: number;
    cubicFeet: number;
    cubicMeters: number;
    cost: number;
  } | null>(null);

  // Convert length to yards
  const convertToYards = (value: number, unit: LengthUnit): number => {
    const conversions: Record<LengthUnit, number> = {
      'in': 1 / 36,      // 36 inches in a yard
      'ft': 1 / 3,       // 3 feet in a yard
      'yds': 1,          // yard is yard
      'mm': 1 / 914.4,   // 914.4 mm in a yard
      'cm': 1 / 91.44,   // 91.44 cm in a yard
      'm': 1.09361,      // 1.09361 yards in a meter
    };
    return value * conversions[unit];
  };

  const calculateVolume = () => {
    let volumeInCubicYards = 0;
    const qty = parseFloat(quantity) || 1;

    try {
      switch (shape) {
        case 'rectangle': {
          const d = convertToYards(parseFloat(depth) || 0, depthUnit);
          const l = convertToYards(parseFloat(length) || 0, lengthUnit);
          const w = convertToYards(parseFloat(width) || 0, widthUnit);
          volumeInCubicYards = d * l * w * qty;
          break;
        }
        case 'square': {
          const d = convertToYards(parseFloat(depth) || 0, depthUnit);
          const l = convertToYards(parseFloat(length) || 0, lengthUnit);
          volumeInCubicYards = d * l * l * qty;
          break;
        }
        case 'circle': {
          const d = convertToYards(parseFloat(depth) || 0, depthUnit);
          const r = convertToYards(parseFloat(radius) || 0, radiusUnit);
          volumeInCubicYards = Math.PI * r * r * d * qty;
          break;
        }
        case 'triangle': {
          const d = convertToYards(parseFloat(depth) || 0, depthUnit);
          const b = convertToYards(parseFloat(base) || 0, baseUnit);
          const h = convertToYards(parseFloat(height) || 0, heightUnit);
          volumeInCubicYards = (b * h / 2) * d * qty;
          break;
        }
        case 'rectangle-border': {
          const d = convertToYards(parseFloat(depth) || 0, depthUnit);
          const l = convertToYards(parseFloat(length) || 0, lengthUnit);
          const w = convertToYards(parseFloat(width) || 0, widthUnit);
          const bw = convertToYards(parseFloat(borderWidth) || 0, borderWidthUnit);
          const outerArea = l * w;
          const innerArea = (l - 2 * bw) * (w - 2 * bw);
          volumeInCubicYards = (outerArea - innerArea) * d * qty;
          break;
        }
        case 'circle-border': {
          const d = convertToYards(parseFloat(depth) || 0, depthUnit);
          const r = convertToYards(parseFloat(radius) || 0, radiusUnit);
          const bw = convertToYards(parseFloat(borderWidth) || 0, borderWidthUnit);
          const outerArea = Math.PI * r * r;
          const innerArea = Math.PI * (r - bw) * (r - bw);
          volumeInCubicYards = (outerArea - innerArea) * d * qty;
          break;
        }
        case 'annulus': {
          const d = convertToYards(parseFloat(depth) || 0, depthUnit);
          const ro = convertToYards(parseFloat(outerRadius) || 0, outerRadiusUnit);
          const ri = convertToYards(parseFloat(innerRadius) || 0, innerRadiusUnit);
          volumeInCubicYards = Math.PI * (ro * ro - ri * ri) * d * qty;
          break;
        }
        case 'trapezoid': {
          const d = convertToYards(parseFloat(depth) || 0, depthUnit);
          const tw = convertToYards(parseFloat(topWidth) || 0, topWidthUnit);
          const bw = convertToYards(parseFloat(bottomWidth) || 0, bottomWidthUnit);
          const h = convertToYards(parseFloat(height) || 0, heightUnit);
          volumeInCubicYards = ((tw + bw) / 2) * h * d * qty;
          break;
        }
      }

      const cubicFeet = volumeInCubicYards * 27; // 27 cubic feet in a cubic yard
      const cubicMeters = volumeInCubicYards * 0.764555; // 0.764555 cubic meters in a cubic yard

      let totalCost = 0;
      const priceValue = parseFloat(price) || 0;

      if (costPerUnit === 'foot') {
        totalCost = cubicFeet * priceValue;
      } else if (costPerUnit === 'yard') {
        totalCost = volumeInCubicYards * priceValue;
      } else if (costPerUnit === 'meter') {
        totalCost = cubicMeters * priceValue;
      }

      setResult({
        cubicYards: volumeInCubicYards,
        cubicFeet: cubicFeet,
        cubicMeters: cubicMeters,
        cost: totalCost,
      });
    } catch (error) {
      alert('Please enter valid values for all required fields.');
    }
  };

  const handleClear = () => {
    setDepth('');
    setLength('');
    setWidth('');
    setRadius('');
    setBase('');
    setHeight('');
    setBorderWidth('');
    setInnerRadius('');
    setOuterRadius('');
    setTopWidth('');
    setBottomWidth('');
    setQuantity('1');
    setPrice('0');
    setResult(null);
  };

  const getShapeDisplayName = () => {
    const names: Record<ShapeType, string> = {
      'rectangle': 'Rectangle',
      'square': 'Square',
      'circle': 'Circle',
      'triangle': 'Triangle',
      'rectangle-border': 'Rectangle Border',
      'circle-border': 'Circle Border',
      'annulus': 'Annulus',
      'trapezoid': 'Trapezoid',
    };
    return names[shape];
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-8 mt-20 mb-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A3D7C] mb-4">
            Cubic Yards Calculator
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Calculate cubic yards, cubic feet, and cubic meters for any shape. Perfect for concrete, mulch, gravel, soil, and landscaping projects with optional cost calculator.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Calculator Section */}
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border-t-4 border-red-700">
            <div className="bg-gradient-to-r from-red-700 to-orange-700 text-white text-center py-3 rounded-lg mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Cubic Yards Calculator</h2>
            </div>

            <p className="text-center text-gray-700 font-semibold mb-6">
              Enter area or dimensions:
            </p>

            {/* Shape Selector */}
            <div className="mb-6">
              <Select value={shape} onValueChange={(value) => setShape(value as ShapeType)}>
                <SelectTrigger className="w-full text-lg border-2 border-gray-300 focus:border-red-500 py-3">
                  <SelectValue placeholder="Select shape" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rectangle">Rectangle</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                  <SelectItem value="circle">Circle</SelectItem>
                  <SelectItem value="triangle">Triangle</SelectItem>
                  <SelectItem value="rectangle-border">Rectangle Border</SelectItem>
                  <SelectItem value="circle-border">Circle Border</SelectItem>
                  <SelectItem value="annulus">Annulus</SelectItem>
                  <SelectItem value="trapezoid">Trapezoid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Depth Input - Common to all shapes */}
            <div className="mb-6">
              <Label htmlFor="depth" className="text-base font-semibold text-gray-700 mb-2 block">
                Depth =
              </Label>
              <div className="flex gap-2">
                <Input
                  id="depth"
                  type="number"
                  step="any"
                  value={depth}
                  onChange={(e) => setDepth(e.target.value)}
                  className="text-lg p-3 border-2 border-gray-300 focus:border-red-500 flex-1"
                  placeholder="0"
                />
                <Select value={depthUnit} onValueChange={(value) => setDepthUnit(value as LengthUnit)}>
                  <SelectTrigger className="w-24 border-2 border-gray-300 focus:border-red-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in">in</SelectItem>
                    <SelectItem value="ft">ft</SelectItem>
                    <SelectItem value="yds">yds</SelectItem>
                    <SelectItem value="mm">mm</SelectItem>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="m">m</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Rectangle/Square Inputs */}
            {(shape === 'rectangle' || shape === 'square' || shape === 'rectangle-border') && (
              <>
                <div className="mb-6">
                  <Label htmlFor="length" className="text-base font-semibold text-gray-700 mb-2 block">
                    Length =
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="length"
                      type="number"
                      step="any"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="text-lg p-3 border-2 border-gray-300 focus:border-red-500 flex-1"
                      placeholder="0"
                    />
                    <Select value={lengthUnit} onValueChange={(value) => setLengthUnit(value as LengthUnit)}>
                      <SelectTrigger className="w-24 border-2 border-gray-300 focus:border-red-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in">in</SelectItem>
                        <SelectItem value="ft">ft</SelectItem>
                        <SelectItem value="yds">yds</SelectItem>
                        <SelectItem value="mm">mm</SelectItem>
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="m">m</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {shape !== 'square' && (
                  <div className="mb-6">
                    <Label htmlFor="width" className="text-base font-semibold text-gray-700 mb-2 block">
                      Width =
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="width"
                        type="number"
                        step="any"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="text-lg p-3 border-2 border-gray-300 focus:border-red-500 flex-1"
                        placeholder="0"
                      />
                      <Select value={widthUnit} onValueChange={(value) => setWidthUnit(value as LengthUnit)}>
                        <SelectTrigger className="w-24 border-2 border-gray-300 focus:border-red-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in">in</SelectItem>
                          <SelectItem value="ft">ft</SelectItem>
                          <SelectItem value="yds">yds</SelectItem>
                          <SelectItem value="mm">mm</SelectItem>
                          <SelectItem value="cm">cm</SelectItem>
                          <SelectItem value="m">m</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Circle Inputs */}
            {(shape === 'circle' || shape === 'circle-border') && (
              <div className="mb-6">
                <Label htmlFor="radius" className="text-base font-semibold text-gray-700 mb-2 block">
                  Radius =
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="radius"
                    type="number"
                    step="any"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    className="text-lg p-3 border-2 border-gray-300 focus:border-red-500 flex-1"
                    placeholder="0"
                  />
                  <Select value={radiusUnit} onValueChange={(value) => setRadiusUnit(value as LengthUnit)}>
                    <SelectTrigger className="w-24 border-2 border-gray-300 focus:border-red-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in">in</SelectItem>
                      <SelectItem value="ft">ft</SelectItem>
                      <SelectItem value="yds">yds</SelectItem>
                      <SelectItem value="mm">mm</SelectItem>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="m">m</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Triangle Inputs */}
            {shape === 'triangle' && (
              <>
                <div className="mb-6">
                  <Label htmlFor="base" className="text-base font-semibold text-gray-700 mb-2 block">
                    Base =
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="base"
                      type="number"
                      step="any"
                      value={base}
                      onChange={(e) => setBase(e.target.value)}
                      className="text-lg p-3 border-2 border-gray-300 focus:border-red-500 flex-1"
                      placeholder="0"
                    />
                    <Select value={baseUnit} onValueChange={(value) => setBaseUnit(value as LengthUnit)}>
                      <SelectTrigger className="w-24 border-2 border-gray-300 focus:border-red-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in">in</SelectItem>
                        <SelectItem value="ft">ft</SelectItem>
                        <SelectItem value="yds">yds</SelectItem>
                        <SelectItem value="mm">mm</SelectItem>
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="m">m</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mb-6">
                  <Label htmlFor="height" className="text-base font-semibold text-gray-700 mb-2 block">
                    Height =
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="height"
                      type="number"
                      step="any"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="text-lg p-3 border-2 border-gray-300 focus:border-red-500 flex-1"
                      placeholder="0"
                    />
                    <Select value={heightUnit} onValueChange={(value) => setHeightUnit(value as LengthUnit)}>
                      <SelectTrigger className="w-24 border-2 border-gray-300 focus:border-red-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in">in</SelectItem>
                        <SelectItem value="ft">ft</SelectItem>
                        <SelectItem value="yds">yds</SelectItem>
                        <SelectItem value="mm">mm</SelectItem>
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="m">m</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            {/* Border Width for Border Shapes */}
            {(shape === 'rectangle-border' || shape === 'circle-border') && (
              <div className="mb-6">
                <Label htmlFor="borderWidth" className="text-base font-semibold text-gray-700 mb-2 block">
                  Border Width =
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="borderWidth"
                    type="number"
                    step="any"
                    value={borderWidth}
                    onChange={(e) => setBorderWidth(e.target.value)}
                    className="text-lg p-3 border-2 border-gray-300 focus:border-red-500 flex-1"
                    placeholder="0"
                  />
                  <Select value={borderWidthUnit} onValueChange={(value) => setBorderWidthUnit(value as LengthUnit)}>
                    <SelectTrigger className="w-24 border-2 border-gray-300 focus:border-red-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in">in</SelectItem>
                      <SelectItem value="ft">ft</SelectItem>
                      <SelectItem value="yds">yds</SelectItem>
                      <SelectItem value="mm">mm</SelectItem>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="m">m</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Annulus Inputs */}
            {shape === 'annulus' && (
              <>
                <div className="mb-6">
                  <Label htmlFor="outerRadius" className="text-base font-semibold text-gray-700 mb-2 block">
                    Outer Radius =
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="outerRadius"
                      type="number"
                      step="any"
                      value={outerRadius}
                      onChange={(e) => setOuterRadius(e.target.value)}
                      className="text-lg p-3 border-2 border-gray-300 focus:border-red-500 flex-1"
                      placeholder="0"
                    />
                    <Select value={outerRadiusUnit} onValueChange={(value) => setOuterRadiusUnit(value as LengthUnit)}>
                      <SelectTrigger className="w-24 border-2 border-gray-300 focus:border-red-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in">in</SelectItem>
                        <SelectItem value="ft">ft</SelectItem>
                        <SelectItem value="yds">yds</SelectItem>
                        <SelectItem value="mm">mm</SelectItem>
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="m">m</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mb-6">
                  <Label htmlFor="innerRadius" className="text-base font-semibold text-gray-700 mb-2 block">
                    Inner Radius =
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="innerRadius"
                      type="number"
                      step="any"
                      value={innerRadius}
                      onChange={(e) => setInnerRadius(e.target.value)}
                      className="text-lg p-3 border-2 border-gray-300 focus:border-red-500 flex-1"
                      placeholder="0"
                    />
                    <Select value={innerRadiusUnit} onValueChange={(value) => setInnerRadiusUnit(value as LengthUnit)}>
                      <SelectTrigger className="w-24 border-2 border-gray-300 focus:border-red-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in">in</SelectItem>
                        <SelectItem value="ft">ft</SelectItem>
                        <SelectItem value="yds">yds</SelectItem>
                        <SelectItem value="mm">mm</SelectItem>
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="m">m</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            {/* Trapezoid Inputs */}
            {shape === 'trapezoid' && (
              <>
                <div className="mb-6">
                  <Label htmlFor="topWidth" className="text-base font-semibold text-gray-700 mb-2 block">
                    Top Width =
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="topWidth"
                      type="number"
                      step="any"
                      value={topWidth}
                      onChange={(e) => setTopWidth(e.target.value)}
                      className="text-lg p-3 border-2 border-gray-300 focus:border-red-500 flex-1"
                      placeholder="0"
                    />
                    <Select value={topWidthUnit} onValueChange={(value) => setTopWidthUnit(value as LengthUnit)}>
                      <SelectTrigger className="w-24 border-2 border-gray-300 focus:border-red-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in">in</SelectItem>
                        <SelectItem value="ft">ft</SelectItem>
                        <SelectItem value="yds">yds</SelectItem>
                        <SelectItem value="mm">mm</SelectItem>
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="m">m</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mb-6">
                  <Label htmlFor="bottomWidth" className="text-base font-semibold text-gray-700 mb-2 block">
                    Bottom Width =
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="bottomWidth"
                      type="number"
                      step="any"
                      value={bottomWidth}
                      onChange={(e) => setBottomWidth(e.target.value)}
                      className="text-lg p-3 border-2 border-gray-300 focus:border-red-500 flex-1"
                      placeholder="0"
                    />
                    <Select value={bottomWidthUnit} onValueChange={(value) => setBottomWidthUnit(value as LengthUnit)}>
                      <SelectTrigger className="w-24 border-2 border-gray-300 focus:border-red-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in">in</SelectItem>
                        <SelectItem value="ft">ft</SelectItem>
                        <SelectItem value="yds">yds</SelectItem>
                        <SelectItem value="mm">mm</SelectItem>
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="m">m</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mb-6">
                  <Label htmlFor="trapHeight" className="text-base font-semibold text-gray-700 mb-2 block">
                    Height =
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="trapHeight"
                      type="number"
                      step="any"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="text-lg p-3 border-2 border-gray-300 focus:border-red-500 flex-1"
                      placeholder="0"
                    />
                    <Select value={heightUnit} onValueChange={(value) => setHeightUnit(value as LengthUnit)}>
                      <SelectTrigger className="w-24 border-2 border-gray-300 focus:border-red-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in">in</SelectItem>
                        <SelectItem value="ft">ft</SelectItem>
                        <SelectItem value="yds">yds</SelectItem>
                        <SelectItem value="mm">mm</SelectItem>
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="m">m</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <Label htmlFor="quantity" className="text-base font-semibold text-gray-700 mb-2 block">
                Quantity =
              </Label>
              <Input
                id="quantity"
                type="number"
                step="1"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="text-lg p-3 border-2 border-gray-300 focus:border-red-500"
                placeholder="1"
              />
            </div>

            {/* Optional Cost Calculation */}
            <div className="border-2 border-gray-300 rounded-lg p-4 mb-6">
              <h3 className="text-base font-semibold text-gray-700 italic mb-4">Optional Cost Calculation</h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="price" className="text-sm font-semibold text-gray-700 mb-2 block">
                    price
                  </Label>
                  <div className="flex gap-2">
                    <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
                      <SelectTrigger className="w-20 border-2 border-gray-300 focus:border-red-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="$">$</SelectItem>
                        <SelectItem value="€">€</SelectItem>
                        <SelectItem value="£">£</SelectItem>
                        <SelectItem value="₹">₹</SelectItem>
                        <SelectItem value="元">元</SelectItem>
                        <SelectItem value="¥">¥</SelectItem>
                        <SelectItem value="R">R</SelectItem>
                        <SelectItem value="Rp">Rp</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="price"
                      type="number"
                      step="any"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="text-lg p-3 border-2 border-gray-300 focus:border-red-500 flex-1"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="costPerUnit" className="text-sm font-semibold text-gray-700 mb-2 block">
                    per cubic
                  </Label>
                  <Select value={costPerUnit} onValueChange={(value) => setCostPerUnit(value as CostPerUnit)}>
                    <SelectTrigger className="w-full border-2 border-gray-300 focus:border-red-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="foot">foot (ft³)</SelectItem>
                      <SelectItem value="yard">yard (yd³)</SelectItem>
                      <SelectItem value="meter">meter (m³)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button
                onClick={handleClear}
                variant="outline"
                className="py-6 text-lg font-semibold border-2 border-gray-300 hover:bg-gray-100"
              >
                Clear
              </Button>
              <Button
                onClick={calculateVolume}
                className="py-6 text-lg font-semibold bg-gradient-to-r from-red-700 to-orange-700 hover:from-red-800 hover:to-orange-800"
              >
                Calculate
              </Button>
            </div>

            {/* Answer Section */}
            {result && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Answer:</h3>
                <div className="space-y-3">
                  <p className="text-lg font-bold">
                    <span className="font-semibold">Cubic Yards =</span>{' '}
                    <span className="text-blue-600">{result.cubicYards.toFixed(4)}</span>
                  </p>
                  <p className="text-lg font-bold">
                    <span className="font-semibold">Cubic Feet =</span>{' '}
                    <span className="text-blue-600">{result.cubicFeet.toFixed(4)}</span>
                  </p>
                  <p className="text-lg font-bold">
                    <span className="font-semibold">Cubic Meters =</span>{' '}
                    <span className="text-blue-600">{result.cubicMeters.toFixed(4)}</span>
                  </p>
                  {parseFloat(price) > 0 && (
                    <p className="text-lg font-bold border-t-2 border-gray-300 pt-3 mt-3">
                      <span className="font-semibold">Cost =</span>{' '}
                      <span className="text-green-600">{currency}{result.cost.toFixed(2)}</span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Solution Section */}
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
            <h3 className="text-2xl font-bold text-[#1A3D7C] mb-6 pb-3 border-b-2 border-gray-200">
              Solution:
            </h3>

            {result && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    Calculate cubic yards for {getShapeDisplayName()}
                  </h4>

                  <div className="space-y-4 text-lg">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <p className="font-semibold mb-2">Step 1: Identify the formula</p>
                      {shape === 'rectangle' && (
                        <p>Volume = Depth × Length × Width</p>
                      )}
                      {shape === 'square' && (
                        <p>Volume = Depth × Length × Length</p>
                      )}
                      {shape === 'circle' && (
                        <p>Volume = π × Radius² × Depth</p>
                      )}
                      {shape === 'triangle' && (
                        <p>Volume = (Base × Height ÷ 2) × Depth</p>
                      )}
                      {shape === 'rectangle-border' && (
                        <p>Volume = (Outer Area - Inner Area) × Depth</p>
                      )}
                      {shape === 'circle-border' && (
                        <p>Volume = (Outer Circle Area - Inner Circle Area) × Depth</p>
                      )}
                      {shape === 'annulus' && (
                        <p>Volume = π × (Outer Radius² - Inner Radius²) × Depth</p>
                      )}
                      {shape === 'trapezoid' && (
                        <p>Volume = [(Top Width + Bottom Width) ÷ 2] × Height × Depth</p>
                      )}
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-500 p-4">
                      <p className="font-semibold mb-2">Step 2: Convert all measurements to yards</p>
                      <div className="text-base space-y-1">
                        {depth && <p>Depth: {depth} {depthUnit} = {convertToYards(parseFloat(depth), depthUnit).toFixed(4)} yds</p>}
                        {length && <p>Length: {length} {lengthUnit} = {convertToYards(parseFloat(length), lengthUnit).toFixed(4)} yds</p>}
                        {width && <p>Width: {width} {widthUnit} = {convertToYards(parseFloat(width), widthUnit).toFixed(4)} yds</p>}
                        {radius && <p>Radius: {radius} {radiusUnit} = {convertToYards(parseFloat(radius), radiusUnit).toFixed(4)} yds</p>}
                        {base && <p>Base: {base} {baseUnit} = {convertToYards(parseFloat(base), baseUnit).toFixed(4)} yds</p>}
                        {height && <p>Height: {height} {heightUnit} = {convertToYards(parseFloat(height), heightUnit).toFixed(4)} yds</p>}
                      </div>
                    </div>

                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                      <p className="font-semibold mb-2">Step 3: Calculate volume in cubic yards</p>
                      <p>Cubic Yards = {result.cubicYards.toFixed(4)} yd³</p>
                      {parseFloat(quantity) > 1 && (
                        <p className="text-sm mt-2 text-gray-600">(Quantity: {quantity})</p>
                      )}
                    </div>

                    <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                      <p className="font-semibold mb-2">Step 4: Convert to other units</p>
                      <p>Cubic Feet = {result.cubicYards.toFixed(4)} × 27 = {result.cubicFeet.toFixed(4)} ft³</p>
                      <p className="mt-2">Cubic Meters = {result.cubicYards.toFixed(4)} × 0.764555 = {result.cubicMeters.toFixed(4)} m³</p>
                    </div>

                    {parseFloat(price) > 0 && (
                      <div className="bg-green-50 border-l-4 border-green-500 p-4">
                        <p className="font-semibold mb-2">Step 5: Calculate cost</p>
                        <p>
                          Cost = {costPerUnit === 'yard' ? result.cubicYards.toFixed(4) : costPerUnit === 'foot' ? result.cubicFeet.toFixed(4) : result.cubicMeters.toFixed(4)} {costPerUnit === 'yard' ? 'yd³' : costPerUnit === 'foot' ? 'ft³' : 'm³'} × {currency}{price} = {currency}{result.cost.toFixed(2)}
                        </p>
                      </div>
                    )}

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                      <p className="text-xl font-bold text-gray-800">
                        Final Answer: {result.cubicYards.toFixed(4)} cubic yards
                      </p>
                      <p className="text-base text-gray-700 mt-2">
                        = {result.cubicFeet.toFixed(4)} ft³ = {result.cubicMeters.toFixed(4)} m³
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!result && (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg">Select a shape, enter dimensions, and click Calculate to see the step-by-step solution</p>
              </div>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">What is a Cubic Yard?</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="text-lg leading-relaxed">
              A cubic yard (abbreviated as yd³ or cu yd) is a unit of volume measurement in the imperial system. One cubic yard equals the volume of a cube with edges that are exactly one yard (3 feet) in length. This measurement is widely used in construction, landscaping, and material delivery industries throughout the United States.
            </p>
            <p className="text-lg leading-relaxed">
              Understanding cubic yards is essential when ordering materials such as concrete, mulch, gravel, topsoil, sand, or crushed stone. These materials are typically sold and delivered by the cubic yard, making it crucial to accurately calculate the volume you need for your project to avoid ordering too little or too much.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
              <h3 className="text-xl font-bold mb-3">Key Conversions:</h3>
              <ul className="space-y-2 text-lg">
                <li><span className="font-semibold">1 cubic yard =</span> 27 cubic feet (3 ft × 3 ft × 3 ft)</li>
                <li><span className="font-semibold">1 cubic yard =</span> 0.764555 cubic meters</li>
                <li><span className="font-semibold">1 cubic yard =</span> 46,656 cubic inches</li>
                <li><span className="font-semibold">1 cubic yard =</span> 201.974 gallons (US liquid)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">How to Calculate Cubic Yards</h2>
          <div className="prose max-w-none text-gray-700">
            <p className="text-lg mb-6">The basic formula for calculating cubic yards depends on the shape of the area you're measuring:</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-3">Rectangle/Square</h3>
                <div className="bg-white p-4 rounded-lg mb-3">
                  <p className="font-semibold text-center text-lg">Volume = Length × Width × Depth</p>
                </div>
                <p className="text-sm">All measurements must be in yards, or convert the result by dividing by 27 if using feet.</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-3">Circle</h3>
                <div className="bg-white p-4 rounded-lg mb-3">
                  <p className="font-semibold text-center text-lg">Volume = π × Radius² × Depth</p>
                </div>
                <p className="text-sm">π (pi) ≈ 3.14159. Radius is half the diameter of the circle.</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
                <h3 className="text-xl font-bold text-purple-800 mb-3">Triangle</h3>
                <div className="bg-white p-4 rounded-lg mb-3">
                  <p className="font-semibold text-center text-lg">Volume = (Base × Height ÷ 2) × Depth</p>
                </div>
                <p className="text-sm">Base and height form a right angle. Depth is the thickness or height of the material.</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border-2 border-orange-200">
                <h3 className="text-xl font-bold text-orange-800 mb-3">Trapezoid</h3>
                <div className="bg-white p-4 rounded-lg mb-3">
                  <p className="font-semibold text-center text-sm">Volume = [(Top + Bottom) ÷ 2] × Height × Depth</p>
                </div>
                <p className="text-sm">Top and bottom are the parallel sides. Height is the perpendicular distance between them.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Common Applications and Materials</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Concrete Projects</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Driveways and parking areas</li>
                <li>• Foundations and footings</li>
                <li>• Patios and walkways</li>
                <li>• Slabs and floors</li>
                <li>• Steps and stairs</li>
                <li>• Retaining walls</li>
              </ul>
              <div className="bg-white p-3 rounded mt-4 text-sm">
                <p className="font-semibold">Typical coverage:</p>
                <p>1 yd³ concrete covers ~81 sq ft at 4" depth</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-3">Mulch & Landscaping</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Garden beds and borders</li>
                <li>• Tree rings and plantings</li>
                <li>• Playground surfaces</li>
                <li>• Pathways and trails</li>
                <li>• Erosion control</li>
                <li>• Decorative landscaping</li>
              </ul>
              <div className="bg-white p-3 rounded mt-4 text-sm">
                <p className="font-semibold">Typical coverage:</p>
                <p>1 yd³ mulch covers ~108 sq ft at 3" depth</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-3">Gravel & Stone</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Driveway base and surface</li>
                <li>• Drainage systems</li>
                <li>• French drains</li>
                <li>• Decorative rock beds</li>
                <li>• Pathway bases</li>
                <li>• Foundation drainage</li>
              </ul>
              <div className="bg-white p-3 rounded mt-4 text-sm">
                <p className="font-semibold">Typical coverage:</p>
                <p>1 yd³ gravel covers ~100 sq ft at 3" depth</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border-2 border-orange-200">
              <h3 className="text-xl font-bold text-orange-800 mb-3">Soil & Topsoil</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Lawn installation and repair</li>
                <li>• Raised garden beds</li>
                <li>• Grading and leveling</li>
                <li>• Filling low spots</li>
                <li>• Vegetable gardens</li>
                <li>• Landscape renovation</li>
              </ul>
              <div className="bg-white p-3 rounded mt-4 text-sm">
                <p className="font-semibold">Typical coverage:</p>
                <p>1 yd³ topsoil covers ~100 sq ft at 3" depth</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Material Weight Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-red-700 to-orange-700 text-white">
                  <th className="border-2 border-gray-300 p-4 text-left">Material</th>
                  <th className="border-2 border-gray-300 p-4 text-left">Weight per Cubic Yard</th>
                  <th className="border-2 border-gray-300 p-4 text-left">Notes</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-4 font-semibold">Concrete (mixed)</td>
                  <td className="border-2 border-gray-300 p-4">~4,000 lbs (2 tons)</td>
                  <td className="border-2 border-gray-300 p-4">Varies by mix and aggregate</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-4 font-semibold">Topsoil (dry)</td>
                  <td className="border-2 border-gray-300 p-4">~2,000 lbs (1 ton)</td>
                  <td className="border-2 border-gray-300 p-4">Moisture content affects weight</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-4 font-semibold">Topsoil (wet)</td>
                  <td className="border-2 border-gray-300 p-4">~3,000 lbs (1.5 tons)</td>
                  <td className="border-2 border-gray-300 p-4">Significantly heavier when saturated</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-4 font-semibold">Mulch (bark)</td>
                  <td className="border-2 border-gray-300 p-4">~400-800 lbs</td>
                  <td className="border-2 border-gray-300 p-4">Very light, depends on type and moisture</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-4 font-semibold">Gravel (crushed stone)</td>
                  <td className="border-2 border-gray-300 p-4">~2,700 lbs (1.35 tons)</td>
                  <td className="border-2 border-gray-300 p-4">Depends on stone type and size</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-4 font-semibold">Sand (dry)</td>
                  <td className="border-2 border-gray-300 p-4">~2,700 lbs (1.35 tons)</td>
                  <td className="border-2 border-gray-300 p-4">Wet sand weighs more</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-4 font-semibold">Compost</td>
                  <td className="border-2 border-gray-300 p-4">~1,000-1,600 lbs</td>
                  <td className="border-2 border-gray-300 p-4">Varies widely by composition</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-4 font-semibold">River rock</td>
                  <td className="border-2 border-gray-300 p-4">~2,800 lbs (1.4 tons)</td>
                  <td className="border-2 border-gray-300 p-4">Smooth decorative stone</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Tips for Ordering Materials</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Add 10-15% Extra</h4>
                  <p className="text-gray-700">Always order 10-15% more material than calculated to account for waste, spillage, settling, and irregular shapes.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Measure Accurately</h4>
                  <p className="text-gray-700">Use a tape measure and measure multiple times. Round up to the nearest inch for consistency.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Consider Depth Requirements</h4>
                  <p className="text-gray-700">Concrete: 4" minimum for driveways. Mulch: 2-4" for garden beds. Gravel: 4-6" for driveways.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Plan Delivery Access</h4>
                  <p className="text-gray-700">Ensure delivery trucks can access your site. Most trucks need 10-12 feet of clearance.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">5</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Check Load Limits</h4>
                  <p className="text-gray-700">Know your truck or trailer's weight capacity. A cubic yard of concrete weighs about 4,000 lbs!</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">6</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Get Multiple Quotes</h4>
                  <p className="text-gray-700">Prices vary significantly between suppliers. Compare delivered cost per cubic yard from multiple vendors.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">7</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Consider Bulk Discounts</h4>
                  <p className="text-gray-700">Larger orders often receive better per-yard pricing. Coordinate with neighbors if possible.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">8</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Prepare the Site</h4>
                  <p className="text-gray-700">Clear the area and have tools ready before delivery. Materials settle and compact over time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How many wheelbarrows are in a cubic yard?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                A standard contractor's wheelbarrow holds about 6 cubic feet when level full. Since there are 27 cubic feet in a cubic yard, one cubic yard equals approximately 4.5 wheelbarrow loads. However, this can vary based on wheelbarrow size and how full you load it. Plan for 5-6 trips per cubic yard for easier handling.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How do I convert square feet to cubic yards?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To convert square feet to cubic yards, you need to know the depth (thickness) of the material. First, convert depth to feet (e.g., 4 inches = 4/12 = 0.333 feet). Then multiply: square feet × depth in feet = cubic feet. Finally, divide cubic feet by 27 to get cubic yards. Example: 300 sq ft × 0.333 ft depth = 100 cu ft ÷ 27 = 3.7 cubic yards.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How much does a cubic yard of concrete cost?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Concrete prices vary by location, type, and supplier but typically range from $120 to $150 per cubic yard for standard ready-mix concrete delivered. Specialty mixes (high-strength, fiber-reinforced, or colored concrete) can cost $150-$200+ per cubic yard. Always get quotes from multiple suppliers and factor in delivery fees, which usually apply to orders under a minimum quantity (often 10 yards).
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What's the difference between a cubic yard and a square yard?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                A square yard is a unit of area (length × width) measuring 9 square feet (3 ft × 3 ft), while a cubic yard is a unit of volume (length × width × depth) measuring 27 cubic feet (3 ft × 3 ft × 3 ft). Square yards measure flat surfaces like carpet or sod, while cubic yards measure three-dimensional quantities like concrete, mulch, or gravel.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How deep should mulch be applied?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                For garden beds and landscaping, mulch should be applied 2-4 inches deep. A 2-inch layer provides basic weed suppression and moisture retention, while 3-4 inches is ideal for better insulation and longer-lasting coverage. Avoid depths over 4 inches as this can suffocate plant roots and prevent water from reaching the soil. Refresh mulch annually as it decomposes.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Can I pick up a cubic yard of material myself?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                It depends on the material and your vehicle. A cubic yard of mulch (400-800 lbs) can usually fit in a pickup truck, but a cubic yard of gravel (2,700 lbs) or concrete (4,000 lbs) requires a heavy-duty truck or trailer and may exceed your vehicle's payload capacity. Most suppliers offer delivery, which is often more practical for heavy materials and ensures the proper amount is delivered.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What is a "ton" of gravel in cubic yards?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                One ton (2,000 lbs) of gravel is approximately 0.74 cubic yards, or about 20 cubic feet. However, this conversion depends on the type and density of the gravel. Crushed stone, pea gravel, and river rock have different weights per cubic yard. Most crushed stone weighs about 2,700 lbs per cubic yard, so 1 ton = about 0.74 yards, while 1 cubic yard = about 1.35 tons.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How many cubic yards do I need for a driveway?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                For a concrete driveway, use a minimum 4-inch depth. Calculate: measure length × width in feet, multiply by 0.333 (4 inches in feet), then divide by 27. For example, a 20 ft × 40 ft driveway: 20 × 40 × 0.333 = 266.4 cu ft ÷ 27 = 9.9 cubic yards. For a gravel driveway, use 4-6 inches depth for the base layer. Always order 10-15% extra.
              </p>
            </div>
          </div>
        </div>

        {/* Book Your Session CTA */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-xl shadow-2xl p-8 md:p-12 text-center text-white mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help with Math or Calculations?</h2>
          <p className="text-xl mb-6 text-gray-100">
            Our expert tutors can help you master volume calculations, geometry, and mathematical concepts
          </p>
          <Link
            href="/book-demo-class"
            className="inline-block bg-white text-[#1A3D7C] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Book Your Free Demo Session
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
