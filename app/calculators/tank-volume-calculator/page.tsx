'use client';

import { useState } from 'react';
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
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Calculator } from 'lucide-react';

type TankType =
  | 'horizontal-cylinder'
  | 'vertical-cylinder'
  | 'rectangle'
  | 'horizontal-oval'
  | 'vertical-oval'
  | 'horizontal-capsule'
  | 'vertical-capsule'
  | 'horizontal-2-1-elliptical'
  | 'horizontal-dish-ends'
  | 'horizontal-ellipse';

interface VolumeResults {
  usGallonsCapacity: number;
  usGallonsVolume: number;
  impGallonsCapacity: number;
  impGallonsVolume: number;
  litersCapacity: number;
  litersVolume: number;
  cubicMetersCapacity: number;
  cubicMetersVolume: number;
  cubicFeetCapacity: number;
  cubicFeetVolume: number;
  fillPercentage: number;
}

export default function TankVolumeCalculator() {
  const [tankType, setTankType] = useState<TankType>('horizontal-cylinder');
  const [length, setLength] = useState('');
  const [diameter, setDiameter] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [filledDepth, setFilledDepth] = useState('');
  const [unit, setUnit] = useState('inches');
  const [result, setResult] = useState<VolumeResults | null>(null);

  const tankTypeLabels: Record<TankType, string> = {
    'horizontal-cylinder': 'Horizontal Cylinder',
    'vertical-cylinder': 'Vertical Cylinder',
    'rectangle': 'Rectangle',
    'horizontal-oval': 'Horizontal Oval',
    'vertical-oval': 'Vertical Oval',
    'horizontal-capsule': 'Horizontal Capsule',
    'vertical-capsule': 'Vertical Capsule',
    'horizontal-2-1-elliptical': 'Horizontal 2:1 Elliptical',
    'horizontal-dish-ends': 'Horizontal Dish Ends',
    'horizontal-ellipse': 'Horizontal Ellipse',
  };

  const convertToInches = (value: number, fromUnit: string): number => {
    switch (fromUnit) {
      case 'feet': return value * 12;
      case 'yards': return value * 36;
      case 'cm': return value / 2.54;
      case 'meters': return value / 0.0254;
      default: return value; // inches
    }
  };

  const calculateHorizontalCylinderVolume = (L: number, D: number, d: number): number => {
    // L = length, D = diameter, d = filled depth (all in inches)
    const r = D / 2;
    if (d >= D) {
      // Tank is full
      return Math.PI * r * r * L;
    }
    // Partial fill using circular segment formula
    const fillHeight = d;
    const theta = 2 * Math.acos((r - fillHeight) / r);
    const area = (r * r / 2) * (theta - Math.sin(theta));
    return area * L;
  };

  const calculateVerticalCylinderVolume = (L: number, D: number, d: number): number => {
    // L = height, D = diameter, d = filled depth (all in inches)
    const r = D / 2;
    const filledHeight = Math.min(d, L);
    return Math.PI * r * r * filledHeight;
  };

  const calculateRectangleVolume = (L: number, W: number, H: number, d: number): number => {
    // L = length, W = width, H = height, d = filled depth
    const filledHeight = Math.min(d, H);
    return L * W * filledHeight;
  };

  const calculateHorizontalOvalVolume = (L: number, D: number, W: number, d: number): number => {
    // Approximation for horizontal oval (ellipse cross-section)
    const a = W / 2; // semi-major axis
    const b = D / 2; // semi-minor axis

    if (d >= D) {
      // Full tank
      return Math.PI * a * b * L;
    }

    // Partial fill approximation
    const fillRatio = d / D;
    const area = Math.PI * a * b * fillRatio;
    return area * L;
  };

  const calculateVerticalOvalVolume = (H: number, D: number, W: number, d: number): number => {
    // Vertical oval tank
    const a = W / 2;
    const b = D / 2;
    const filledHeight = Math.min(d, H);
    return Math.PI * a * b * filledHeight;
  };

  const calculateHorizontalCapsuleVolume = (L: number, D: number, d: number): number => {
    // Capsule = cylinder with hemispherical ends
    const r = D / 2;
    const cylinderLength = L - D; // Subtract the two hemisphere ends

    if (d >= D) {
      // Full tank
      const cylinderVol = Math.PI * r * r * cylinderLength;
      const sphereVol = (4 / 3) * Math.PI * r * r * r;
      return cylinderVol + sphereVol;
    }

    // Partial fill (simplified approximation)
    const fillRatio = d / D;
    const cylinderVol = Math.PI * r * r * cylinderLength;
    const sphereVol = (4 / 3) * Math.PI * r * r * r;
    const totalVol = cylinderVol + sphereVol;
    return totalVol * fillRatio;
  };

  const calculateVerticalCapsuleVolume = (H: number, D: number, d: number): number => {
    // Vertical capsule
    const r = D / 2;
    const cylinderHeight = H - D;
    const filledDepth = Math.min(d, H);

    if (filledDepth <= r) {
      // Only in bottom hemisphere
      const sphereCapVol = (Math.PI * filledDepth * filledDepth / 3) * (3 * r - filledDepth);
      return sphereCapVol;
    } else if (filledDepth <= cylinderHeight + r) {
      // In cylinder portion
      const bottomHemisphere = (2 / 3) * Math.PI * r * r * r;
      const cylinderPortion = Math.PI * r * r * (filledDepth - r);
      return bottomHemisphere + cylinderPortion;
    } else {
      // Including top hemisphere
      const bottomHemisphere = (2 / 3) * Math.PI * r * r * r;
      const cylinderPortion = Math.PI * r * r * cylinderHeight;
      const topCapHeight = filledDepth - cylinderHeight - r;
      const topCapVol = (Math.PI * topCapHeight * topCapHeight / 3) * (3 * r - topCapHeight);
      return bottomHemisphere + cylinderPortion + topCapVol;
    }
  };

  const calculateHorizontalEllipticalVolume = (L: number, D: number, d: number): number => {
    // 2:1 Elliptical head
    const r = D / 2;
    const a = D; // semi-major axis is 2x radius

    if (d >= D) {
      return (2 / 3) * Math.PI * a * r * r + Math.PI * r * r * (L - a);
    }

    // Simplified partial fill
    const fillRatio = d / D;
    const totalVol = (2 / 3) * Math.PI * a * r * r + Math.PI * r * r * (L - a);
    return totalVol * fillRatio;
  };

  const cubicInchesToUSGallons = (cubicInches: number): number => cubicInches / 231;
  const cubicInchesToImpGallons = (cubicInches: number): number => cubicInches / 277.419;
  const cubicInchesToLiters = (cubicInches: number): number => cubicInches * 0.0163871;
  const cubicInchesToCubicMeters = (cubicInches: number): number => cubicInches * 0.000016387064;
  const cubicInchesToCubicFeet = (cubicInches: number): number => cubicInches / 1728;

  const handleCalculate = () => {
    let L = 0, D = 0, W = 0, H = 0, d = 0;

    // Convert all measurements to inches
    if (length) L = convertToInches(parseFloat(length), unit);
    if (diameter) D = convertToInches(parseFloat(diameter), unit);
    if (width) W = convertToInches(parseFloat(width), unit);
    if (height) H = convertToInches(parseFloat(height), unit);
    if (filledDepth) d = convertToInches(parseFloat(filledDepth), unit);

    let volumeCubicInches = 0;
    let capacityCubicInches = 0;

    switch (tankType) {
      case 'horizontal-cylinder':
        if (!L || !D) {
          alert('Please enter Length and Diameter');
          return;
        }
        capacityCubicInches = calculateHorizontalCylinderVolume(L, D, D);
        volumeCubicInches = d ? calculateHorizontalCylinderVolume(L, D, d) : 0;
        break;

      case 'vertical-cylinder':
        if (!L || !D) {
          alert('Please enter Length (Height) and Diameter');
          return;
        }
        capacityCubicInches = calculateVerticalCylinderVolume(L, D, L);
        volumeCubicInches = d ? calculateVerticalCylinderVolume(L, D, d) : 0;
        break;

      case 'rectangle':
        if (!L || !W || !H) {
          alert('Please enter Length, Width, and Height');
          return;
        }
        capacityCubicInches = calculateRectangleVolume(L, W, H, H);
        volumeCubicInches = d ? calculateRectangleVolume(L, W, H, d) : 0;
        break;

      case 'horizontal-oval':
        if (!L || !D || !W) {
          alert('Please enter Length, Diameter, and Width');
          return;
        }
        capacityCubicInches = calculateHorizontalOvalVolume(L, D, W, D);
        volumeCubicInches = d ? calculateHorizontalOvalVolume(L, D, W, d) : 0;
        break;

      case 'vertical-oval':
        if (!H || !D || !W) {
          alert('Please enter Height, Diameter, and Width');
          return;
        }
        capacityCubicInches = calculateVerticalOvalVolume(H, D, W, H);
        volumeCubicInches = d ? calculateVerticalOvalVolume(H, D, W, d) : 0;
        break;

      case 'horizontal-capsule':
        if (!L || !D) {
          alert('Please enter Length and Diameter');
          return;
        }
        capacityCubicInches = calculateHorizontalCapsuleVolume(L, D, D);
        volumeCubicInches = d ? calculateHorizontalCapsuleVolume(L, D, d) : 0;
        break;

      case 'vertical-capsule':
        if (!H || !D) {
          alert('Please enter Height and Diameter');
          return;
        }
        capacityCubicInches = calculateVerticalCapsuleVolume(H, D, H);
        volumeCubicInches = d ? calculateVerticalCapsuleVolume(H, D, d) : 0;
        break;

      case 'horizontal-2-1-elliptical':
      case 'horizontal-dish-ends':
      case 'horizontal-ellipse':
        if (!L || !D) {
          alert('Please enter Length and Diameter');
          return;
        }
        capacityCubicInches = calculateHorizontalEllipticalVolume(L, D, D);
        volumeCubicInches = d ? calculateHorizontalEllipticalVolume(L, D, d) : 0;
        break;
    }

    const fillPercentage = capacityCubicInches > 0 ? (volumeCubicInches / capacityCubicInches) * 100 : 0;

    setResult({
      usGallonsCapacity: cubicInchesToUSGallons(capacityCubicInches),
      usGallonsVolume: cubicInchesToUSGallons(volumeCubicInches),
      impGallonsCapacity: cubicInchesToImpGallons(capacityCubicInches),
      impGallonsVolume: cubicInchesToImpGallons(volumeCubicInches),
      litersCapacity: cubicInchesToLiters(capacityCubicInches),
      litersVolume: cubicInchesToLiters(volumeCubicInches),
      cubicMetersCapacity: cubicInchesToCubicMeters(capacityCubicInches),
      cubicMetersVolume: cubicInchesToCubicMeters(volumeCubicInches),
      cubicFeetCapacity: cubicInchesToCubicFeet(capacityCubicInches),
      cubicFeetVolume: cubicInchesToCubicFeet(volumeCubicInches),
      fillPercentage,
    });
  };

  const handleClear = () => {
    setLength('');
    setDiameter('');
    setWidth('');
    setHeight('');
    setFilledDepth('');
    setResult(null);
  };

  const getRequiredFields = (): string[] => {
    switch (tankType) {
      case 'horizontal-cylinder':
      case 'vertical-cylinder':
      case 'horizontal-capsule':
      case 'horizontal-2-1-elliptical':
      case 'horizontal-dish-ends':
      case 'horizontal-ellipse':
        return ['length', 'diameter'];
      case 'vertical-capsule':
        return ['height', 'diameter'];
      case 'rectangle':
        return ['length', 'width', 'height'];
      case 'horizontal-oval':
        return ['length', 'diameter', 'width'];
      case 'vertical-oval':
        return ['height', 'diameter', 'width'];
      default:
        return [];
    }
  };

  const requiredFields = getRequiredFields();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8 mt-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl mb-6 shadow-lg">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tank Volume Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate tank capacity and fill volume for all tank shapes with results in gallons, liters, cubic feet, and cubic meters
          </p>
        </div>

        {/* Calculator Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="bg-gradient-to-r from-amber-700 to-orange-700 text-white text-center py-4 rounded-xl mb-6">
              <h2 className="text-2xl font-bold">Tank Volume & Fill Calculator</h2>
            </div>

            {/* Tank Type Selector */}
            <div className="mb-6">
              <Label htmlFor="tankType" className="text-lg font-semibold mb-2 block">
                Tank Type:
              </Label>
              <Select value={tankType} onValueChange={(value) => setTankType(value as TankType)}>
                <SelectTrigger className="w-full text-lg py-6">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(tankTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value} className="text-lg py-3">
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-2 italic">
                enter all dimensions and depth using integers or decimal numbers
              </p>
            </div>

            {/* Unit Selector */}
            <div className="mb-6">
              <Label htmlFor="unit" className="text-lg font-semibold mb-2 block">
                Measurement Unit:
              </Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="w-full text-lg py-6">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inches">Inches</SelectItem>
                  <SelectItem value="feet">Feet</SelectItem>
                  <SelectItem value="yards">Yards</SelectItem>
                  <SelectItem value="cm">Centimeters</SelectItem>
                  <SelectItem value="meters">Meters</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Length */}
              {requiredFields.includes('length') && (
                <div>
                  <Label htmlFor="length" className="text-lg font-semibold mb-2 block">
                    Length:
                  </Label>
                  <Input
                    id="length"
                    type="number"
                    step="any"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="text-lg py-6"
                    placeholder="Enter length"
                  />
                </div>
              )}

              {/* Diameter */}
              {requiredFields.includes('diameter') && (
                <div>
                  <Label htmlFor="diameter" className="text-lg font-semibold mb-2 block">
                    Diameter:
                  </Label>
                  <Input
                    id="diameter"
                    type="number"
                    step="any"
                    value={diameter}
                    onChange={(e) => setDiameter(e.target.value)}
                    className="text-lg py-6"
                    placeholder="Enter diameter"
                  />
                </div>
              )}

              {/* Width */}
              {requiredFields.includes('width') && (
                <div>
                  <Label htmlFor="width" className="text-lg font-semibold mb-2 block">
                    Width:
                  </Label>
                  <Input
                    id="width"
                    type="number"
                    step="any"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="text-lg py-6"
                    placeholder="Enter width"
                  />
                </div>
              )}

              {/* Height */}
              {requiredFields.includes('height') && (
                <div>
                  <Label htmlFor="height" className="text-lg font-semibold mb-2 block">
                    Height:
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    step="any"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="text-lg py-6"
                    placeholder="Enter height"
                  />
                </div>
              )}

              {/* Filled Depth */}
              <div className="md:col-span-2">
                <Label htmlFor="filledDepth" className="text-lg font-semibold mb-2 block">
                  Filled Depth: <span className="text-sm font-normal text-gray-500">(optional - for partial fill)</span>
                </Label>
                <Input
                  id="filledDepth"
                  type="number"
                  step="any"
                  value={filledDepth}
                  onChange={(e) => setFilledDepth(e.target.value)}
                  className="text-lg py-6"
                  placeholder="Enter filled depth"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                onClick={handleClear}
                variant="outline"
                className="flex-1 py-6 text-lg font-semibold border-2 hover:bg-gray-100"
              >
                Clear
              </Button>
              <Button
                onClick={handleCalculate}
                className="flex-1 py-6 text-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
              >
                Calculate
              </Button>
            </div>

            {/* Results Table */}
            {result && (
              <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gray-100 px-4 py-3">
                  <h3 className="text-xl font-bold">Answer:</h3>
                </div>

                {/* Fill Percentage */}
                {filledDepth && (
                  <div className="bg-blue-50 px-4 py-3 text-center border-b-2 border-gray-300">
                    <p className="text-2xl font-bold text-blue-700">
                      {result.fillPercentage.toFixed(1)}% Full
                    </p>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-200 border-b-2 border-gray-300">
                        <th className="px-4 py-3 text-left font-bold"></th>
                        <th className="px-4 py-3 text-center font-bold">Capacity</th>
                        <th className="px-4 py-3 text-center font-bold">Volume*</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-3 font-semibold">U.S. Gallons</td>
                        <td className="px-4 py-3 text-center">{result.usGallonsCapacity.toFixed(2)}</td>
                        <td className="px-4 py-3 text-center">{result.usGallonsVolume.toFixed(2)}</td>
                      </tr>
                      <tr className="border-b border-gray-300 bg-gray-50">
                        <td className="px-4 py-3 font-semibold">Imp. Gallons</td>
                        <td className="px-4 py-3 text-center">{result.impGallonsCapacity.toFixed(2)}</td>
                        <td className="px-4 py-3 text-center">{result.impGallonsVolume.toFixed(2)}</td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-3 font-semibold">Liters</td>
                        <td className="px-4 py-3 text-center">{result.litersCapacity.toFixed(2)}</td>
                        <td className="px-4 py-3 text-center">{result.litersVolume.toFixed(2)}</td>
                      </tr>
                      <tr className="border-b border-gray-300 bg-gray-50">
                        <td className="px-4 py-3 font-semibold">Cubic Meters</td>
                        <td className="px-4 py-3 text-center">{result.cubicMetersCapacity.toFixed(4)}</td>
                        <td className="px-4 py-3 text-center">{result.cubicMetersVolume.toFixed(4)}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold">Cubic Feet</td>
                        <td className="px-4 py-3 text-center">{result.cubicFeetCapacity.toFixed(4)}</td>
                        <td className="px-4 py-3 text-center">{result.cubicFeetVolume.toFixed(4)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {filledDepth && (
                  <div className="bg-gray-100 px-4 py-2 text-sm text-gray-600 italic">
                    * Volume is calculated based on filled depth of {filledDepth} {unit}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="max-w-4xl mx-auto space-y-8 mb-12">
          {/* What is Tank Volume */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Tank Volume?</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Tank volume refers to the total internal capacity of a storage container or vessel, measured in units such as gallons, liters, cubic feet, or cubic meters. Understanding tank volume is essential for industries ranging from agriculture and manufacturing to residential water storage and commercial fuel distribution. Accurate volume calculations ensure proper sizing, efficient use of resources, and compliance with safety regulations.
              </p>
              <p>
                There are two primary volume measurements for tanks: <strong>capacity</strong> and <strong>fill volume</strong>. Capacity represents the maximum amount the tank can hold when completely full, while fill volume indicates the current amount of liquid or material in the tank based on the filled depth. This distinction is crucial for inventory management, preventing overflow, and optimizing storage efficiency.
              </p>
              <p>
                Tank volume calculations depend heavily on the tank's geometric shape. Common tank shapes include horizontal and vertical cylinders, rectangular tanks, oval tanks, capsule-shaped tanks (cylinders with hemispherical ends), and various elliptical configurations. Each shape requires specific mathematical formulas to calculate volume accurately, taking into account dimensions such as length, diameter, width, height, and filled depth.
              </p>
              <p>
                Our Tank Volume Calculator supports all major tank shapes and provides instant calculations in multiple units, making it an invaluable tool for engineers, farmers, facility managers, and anyone who needs to determine tank capacity or measure current fill levels. Whether you're designing a new storage system, checking inventory levels, or planning a purchase, understanding tank volume is the foundation of effective liquid storage management.
              </p>
            </div>
          </section>

          {/* Tank Volume Formulas */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Tank Volume Formulas by Shape</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p>
                Different tank shapes require different volume formulas. Here are the most common tank types and their volume calculations:
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Horizontal Cylinder Tank</h3>
              <p>
                A horizontal cylindrical tank is one of the most common storage configurations, particularly for fuel oil, propane, and water. The volume formula for a full horizontal cylinder is:
              </p>
              <div className="bg-gray-100 p-6 rounded-lg my-4 text-center">
                <p className="text-xl font-mono">V = π × r² × L</p>
              </div>
              <p>
                Where V is volume, π (pi) ≈ 3.14159, r is the radius (diameter ÷ 2), and L is the length of the cylinder.
              </p>
              <p>
                For partial fill calculations, the formula becomes more complex, using circular segment geometry to determine the cross-sectional area of the liquid at a given depth, then multiplying by the tank length.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Vertical Cylinder Tank</h3>
              <p>
                Vertical cylindrical tanks are commonly used for water storage, chemical processing, and agricultural applications. The full capacity formula is:
              </p>
              <div className="bg-gray-100 p-6 rounded-lg my-4 text-center">
                <p className="text-xl font-mono">V = π × r² × h</p>
              </div>
              <p>
                Where h is the height of the cylinder. For partial fill, simply use the filled depth instead of the total height, making vertical cylinder calculations straightforward.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Rectangular Tank</h3>
              <p>
                Rectangular tanks are the simplest to calculate and are often used for custom-built storage systems. The volume formula is:
              </p>
              <div className="bg-gray-100 p-6 rounded-lg my-4 text-center">
                <p className="text-xl font-mono">V = L × W × H</p>
              </div>
              <p>
                Where L is length, W is width, and H is height. For partial fill, replace H with the filled depth. This straightforward calculation makes rectangular tanks easy to design and analyze.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Oval Tank (Elliptical Cross-Section)</h3>
              <p>
                Oval tanks have an elliptical cross-section and are used when space constraints require a non-circular shape. The volume formula is:
              </p>
              <div className="bg-gray-100 p-6 rounded-lg my-4 text-center">
                <p className="text-xl font-mono">V = π × a × b × L</p>
              </div>
              <p>
                Where a is the semi-major axis (width ÷ 2), b is the semi-minor axis (height ÷ 2), and L is the length. Partial fill calculations for oval tanks require approximations or numerical integration methods.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Capsule Tank</h3>
              <p>
                A capsule tank consists of a cylinder with hemispherical ends (like a pill shape). This design provides structural strength and eliminates flat ends that would require additional reinforcement. The volume formula is:
              </p>
              <div className="bg-gray-100 p-6 rounded-lg my-4 text-center">
                <p className="text-xl font-mono">V = π × r² × L<sub>cyl</sub> + (4/3) × π × r³</p>
              </div>
              <p>
                Where L<sub>cyl</sub> is the length of the cylindrical portion (total length minus the diameter), and the second term represents the volume of the two hemispheres (which together form a complete sphere).
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Elliptical Head Tanks</h3>
              <p>
                Tanks with elliptical heads (2:1 elliptical, dish ends) are common in industrial pressure vessels. The elliptical ends provide better pressure distribution than flat ends while being less expensive than hemispherical ends. Volume calculations combine the cylindrical body with the elliptical end caps using specialized formulas based on the ellipse dimensions.
              </p>

              <p className="mt-6">
                Our calculator handles all these shapes automatically, applying the correct formulas and accounting for partial fill levels to provide accurate capacity and volume measurements in your preferred units.
              </p>
            </div>
          </section>

          {/* How to Measure Tank Volume */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Measure and Calculate Tank Volume</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Calculating tank volume accurately requires careful measurement and the right approach for your tank's shape. Follow these steps for the most accurate results:
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Step 1: Identify Your Tank Shape</h3>
              <p>
                Before taking any measurements, determine your tank's geometric shape. Common shapes include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Horizontal or vertical cylinder</li>
                <li>Rectangle (box-shaped)</li>
                <li>Oval (elliptical cross-section)</li>
                <li>Capsule (cylinder with rounded ends)</li>
                <li>Tanks with elliptical, dished, or hemispherical heads</li>
              </ul>
              <p>
                If you're unsure, examine the tank's manufacturer specifications or documentation, which typically indicate the tank type and standard dimensions.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Step 2: Measure Tank Dimensions</h3>
              <p>
                Use a measuring tape to determine the required dimensions for your tank shape:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Cylindrical tanks:</strong> Measure the diameter (distance across the circular end) and the length or height (depending on orientation)
                </li>
                <li>
                  <strong>Rectangular tanks:</strong> Measure length, width, and height
                </li>
                <li>
                  <strong>Oval tanks:</strong> Measure length, width (major axis), and height (minor axis)
                </li>
                <li>
                  <strong>Capsule tanks:</strong> Measure total length including rounded ends and diameter
                </li>
              </ul>
              <p>
                Take measurements in consistent units (inches, feet, centimeters, or meters). Our calculator accepts any of these units and converts them automatically.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Step 3: Measure Filled Depth (Optional)</h3>
              <p>
                To calculate the current volume of liquid in the tank (rather than total capacity), measure the filled depth:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Vertical tanks:</strong> Measure from the bottom of the tank to the liquid surface
                </li>
                <li>
                  <strong>Horizontal tanks:</strong> Measure the vertical depth of liquid at the deepest point (perpendicular to the ground)
                </li>
                <li>
                  Use a measuring stick, dipstick, or sight glass if available
                </li>
                <li>
                  For safety, never enter confined spaces or climb on tanks without proper training and safety equipment
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Step 4: Enter Values into the Calculator</h3>
              <p>
                Input your measurements into our Tank Volume Calculator:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Select your tank type from the dropdown menu</li>
                <li>Choose your measurement unit (inches, feet, centimeters, or meters)</li>
                <li>Enter the required dimensions for your tank shape</li>
                <li>If calculating current volume, enter the filled depth</li>
                <li>Click "Calculate" to get instant results</li>
              </ol>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Step 5: Review Results in Multiple Units</h3>
              <p>
                The calculator provides results in five different units for both capacity and current volume:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>U.S. Gallons</strong> - Standard in the United States for most liquid measurements</li>
                <li><strong>Imperial Gallons</strong> - Used in the UK and some Commonwealth countries</li>
                <li><strong>Liters</strong> - Metric standard, used worldwide for most applications</li>
                <li><strong>Cubic Meters</strong> - Metric unit for large-scale commercial and industrial tanks</li>
                <li><strong>Cubic Feet</strong> - Common in construction and large storage applications</li>
              </ul>
              <p>
                Having results in multiple units makes it easy to compare tank options, order the correct amount of material, or comply with local regulations that may require specific measurement units.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Tips for Accurate Measurements</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Measure at multiple points and average the results, especially for older or deformed tanks</li>
                <li>Account for tank thickness when measuring internal dimensions (measure inside the tank walls if possible)</li>
                <li>For buried tanks or inaccessible tanks, consult manufacturer specifications rather than estimating</li>
                <li>Double-check your measurements before ordering materials or making purchasing decisions</li>
                <li>Consider working with a professional for critical applications or very large tanks</li>
              </ul>
            </div>
          </section>

          {/* Applications */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Applications of Tank Volume Calculations</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Accurate tank volume calculations are essential across numerous industries and applications. Understanding your tank's capacity and current fill level enables better planning, cost control, and safety management.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Agriculture and Farming</h3>
              <p>
                Farmers rely on tank volume calculations for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Water Storage:</strong> Determining irrigation water availability and planning for drought conditions
                </li>
                <li>
                  <strong>Fuel Management:</strong> Tracking diesel and gasoline inventory for farm equipment
                </li>
                <li>
                  <strong>Fertilizer and Chemical Storage:</strong> Calculating application rates and ordering the correct quantities
                </li>
                <li>
                  <strong>Milk and Dairy:</strong> Managing bulk milk storage and cooling tank capacity
                </li>
                <li>
                  <strong>Grain and Feed:</strong> Estimating storage capacity for liquid feed supplements
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Residential and Home Use</h3>
              <p>
                Homeowners use tank volume calculations for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Heating Oil Tanks:</strong> Monitoring fuel levels and scheduling deliveries
                </li>
                <li>
                  <strong>Propane Tanks:</strong> Determining gas capacity for heating, cooking, and appliances
                </li>
                <li>
                  <strong>Water Heaters:</strong> Selecting the right size for household needs
                </li>
                <li>
                  <strong>Rainwater Harvesting:</strong> Sizing collection tanks for irrigation and non-potable uses
                </li>
                <li>
                  <strong>Swimming Pools:</strong> Calculating water volume for chemical treatment and heating
                </li>
                <li>
                  <strong>Septic Systems:</strong> Understanding septic tank capacity and maintenance schedules
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Industrial and Commercial</h3>
              <p>
                Businesses and industries use tank volume calculations for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Fuel Distribution:</strong> Managing inventory at gas stations and fuel depots
                </li>
                <li>
                  <strong>Chemical Processing:</strong> Ensuring proper reactor and storage vessel sizing
                </li>
                <li>
                  <strong>Food and Beverage:</strong> Calculating capacity for brewing, dairy, wine, and other liquid processing
                </li>
                <li>
                  <strong>Pharmaceutical Manufacturing:</strong> Sizing mixing and storage tanks for precise batch production
                </li>
                <li>
                  <strong>Water Treatment:</strong> Designing treatment, storage, and distribution systems
                </li>
                <li>
                  <strong>Oil and Gas:</strong> Managing crude oil, refined products, and chemical storage
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Construction and Engineering</h3>
              <p>
                Engineers and contractors use tank volume calculations for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>System Design:</strong> Properly sizing tanks for new construction projects
                </li>
                <li>
                  <strong>Capacity Planning:</strong> Ensuring adequate storage for project requirements
                </li>
                <li>
                  <strong>Cost Estimation:</strong> Calculating material quantities and associated costs
                </li>
                <li>
                  <strong>Compliance:</strong> Meeting building codes and environmental regulations
                </li>
                <li>
                  <strong>Retrofits and Upgrades:</strong> Evaluating existing tank capacity when modifying systems
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Environmental and Safety Applications</h3>
              <p>
                Tank volume calculations are critical for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Spill Prevention:</strong> Understanding containment requirements and secondary containment sizing
                </li>
                <li>
                  <strong>Emergency Response:</strong> Planning for potential spills or leaks
                </li>
                <li>
                  <strong>Regulatory Compliance:</strong> Meeting EPA, OSHA, and local environmental regulations
                </li>
                <li>
                  <strong>Risk Assessment:</strong> Evaluating potential hazards based on stored quantities
                </li>
                <li>
                  <strong>Insurance:</strong> Providing accurate capacity information for coverage and claims
                </li>
              </ul>

              <p className="mt-6">
                Whether you're a homeowner checking your heating oil level, a farmer planning irrigation, or an engineer designing a commercial storage system, accurate tank volume calculations provide the foundation for informed decisions, efficient operations, and regulatory compliance.
              </p>
            </div>
          </section>

          {/* Conversion Reference */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Volume Unit Conversion Reference</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Understanding volume unit conversions helps you work with different measurement systems and compare tank capacities. Here are the most common conversions:
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">U.S. Gallons (US gal)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>1 US gallon = 231 cubic inches</li>
                <li>1 US gallon = 3.785 liters</li>
                <li>1 US gallon = 0.833 imperial gallons</li>
                <li>1 US gallon = 0.1337 cubic feet</li>
                <li>1 US gallon = 0.003785 cubic meters</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Imperial Gallons (Imp gal)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>1 imperial gallon = 277.42 cubic inches</li>
                <li>1 imperial gallon = 4.546 liters</li>
                <li>1 imperial gallon = 1.201 US gallons</li>
                <li>1 imperial gallon = 0.1605 cubic feet</li>
                <li>1 imperial gallon = 0.004546 cubic meters</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Liters (L)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>1 liter = 61.024 cubic inches</li>
                <li>1 liter = 0.2642 US gallons</li>
                <li>1 liter = 0.2200 imperial gallons</li>
                <li>1 liter = 0.03531 cubic feet</li>
                <li>1 liter = 0.001 cubic meters</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Cubic Feet (ft³)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>1 cubic foot = 1,728 cubic inches</li>
                <li>1 cubic foot = 7.481 US gallons</li>
                <li>1 cubic foot = 6.229 imperial gallons</li>
                <li>1 cubic foot = 28.317 liters</li>
                <li>1 cubic foot = 0.02832 cubic meters</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Cubic Meters (m³)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>1 cubic meter = 61,024 cubic inches</li>
                <li>1 cubic meter = 264.2 US gallons</li>
                <li>1 cubic meter = 220.0 imperial gallons</li>
                <li>1 cubic meter = 1,000 liters</li>
                <li>1 cubic meter = 35.31 cubic feet</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Quick Conversion Tips</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>To convert US gallons to liters, multiply by 3.785</li>
                <li>To convert liters to US gallons, divide by 3.785 (or multiply by 0.264)</li>
                <li>To convert cubic feet to gallons, multiply by 7.48</li>
                <li>To convert gallons to cubic feet, divide by 7.48 (or multiply by 0.134)</li>
                <li>Imperial gallons are about 20% larger than US gallons</li>
              </ul>

              <p className="mt-6">
                Our calculator automatically provides results in all five major units, eliminating the need for manual conversions and reducing the risk of calculation errors.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-amber-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How do I measure the diameter of a round tank?</h3>
                <p className="text-gray-700">
                  For accessible tanks, measure straight across the circular opening or end from one edge to the opposite edge, passing through the center point. For buried or inaccessible tanks, measure the circumference (distance around) and divide by π (3.14159) to get the diameter. Always measure the inside diameter for the most accurate volume calculation.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What's the difference between tank capacity and volume?</h3>
                <p className="text-gray-700">
                  Capacity is the maximum amount the tank can hold when completely full, while volume refers to the current amount of liquid in the tank based on the filled depth. Our calculator shows both: capacity when you enter just the tank dimensions, and actual volume when you also enter the filled depth.
                </p>
              </div>

              <div className="border-l-4 border-amber-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Can I use this calculator for underground tanks?</h3>
                <p className="text-gray-700">
                  Yes, as long as you know the tank's dimensions and shape. For underground tanks, you'll typically need to consult the manufacturer's specifications or installation records for accurate measurements, as direct measurement is often not possible. The calculator works the same regardless of whether the tank is above ground, buried, or indoors.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How accurate are the partial fill calculations?</h3>
                <p className="text-gray-700">
                  Accuracy depends on tank shape. Vertical cylinders and rectangular tanks provide highly accurate partial fill calculations. Horizontal cylinders use exact geometric formulas for circular segments. More complex shapes like ovals and elliptical heads use approximation methods that are generally accurate within 2-5% for practical purposes. For critical applications, consider professional tank calibration.
                </p>
              </div>

              <div className="border-l-4 border-amber-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What if my tank has irregular dimensions or damage?</h3>
                <p className="text-gray-700">
                  This calculator assumes ideal geometric shapes. For tanks with significant irregularities, dents, or deformation, the results may be less accurate. In such cases, consider: (1) measuring at multiple points and averaging, (2) professional tank strapping (calibration), or (3) using the manufacturer's capacity charts if available. Always err on the side of caution for safety-critical applications.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Do I need to account for tank wall thickness?</h3>
                <p className="text-gray-700">
                  For most practical applications, tank wall thickness has minimal impact on volume calculations (typically less than 1-2% difference). However, for the most accurate results, measure the inside dimensions of the tank rather than outside dimensions. This is especially important for small tanks or those with thick walls (like pressure vessels).
                </p>
              </div>

              <div className="border-l-4 border-amber-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Can I calculate volume for tilted or slanted tanks?</h3>
                <p className="text-gray-700">
                  This calculator assumes tanks are level (horizontal tanks) or perfectly vertical (vertical tanks). For tilted tanks, the calculations become significantly more complex and require advanced mathematics or engineering software. If your tank is not level, you should either level it or consult with a professional for accurate volume determination.
                </p>
              </div>
            </div>
          </section>

          {/* Book Your Session CTA */}
          <section className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl shadow-2xl p-8 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Help with Volume Calculations or Geometry?
            </h2>
            <p className="text-xl mb-8 text-amber-50">
              Our expert tutors can help you master volume formulas, geometry, and all mathematical concepts with personalized one-on-one sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/tutoring/free-consultation"
                className="bg-white text-amber-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-colors shadow-lg hover:shadow-xl inline-block"
              >
                Book a Free Demo Class
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-amber-600 transition-colors inline-block"
              >
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
