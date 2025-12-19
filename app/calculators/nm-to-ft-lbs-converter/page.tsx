'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, RotateCcw, ArrowRightLeft, Wrench, Car, Settings, Info, ChevronDown, ChevronUp, BookOpen, GraduationCap } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

type TorqueUnit = 'nm' | 'ftlbs' | 'inlbs' | 'kgm' | 'kgcm';

interface ConversionResult {
  nm: number;
  ftlbs: number;
  inlbs: number;
  kgm: number;
  kgcm: number;
}

export default function NmToFtLbsConverter() {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputUnit, setInputUnit] = useState<TorqueUnit>('nm');
  const [results, setResults] = useState<ConversionResult | null>(null);
  const [showOtherUnits, setShowOtherUnits] = useState(false);

  // Conversion factors to Newton-meters (base unit)
  const toNm: Record<TorqueUnit, number> = {
    nm: 1,
    ftlbs: 1.35582,
    inlbs: 0.112985,
    kgm: 9.80665,
    kgcm: 0.0980665,
  };

  // Unit labels
  const unitLabels: Record<TorqueUnit, { name: string; symbol: string; fullName: string }> = {
    nm: { name: 'Newton-meters', symbol: 'N·m', fullName: 'Newton-meter' },
    ftlbs: { name: 'Foot-pounds', symbol: 'ft·lbs', fullName: 'Foot-pound' },
    inlbs: { name: 'Inch-pounds', symbol: 'in·lbs', fullName: 'Inch-pound' },
    kgm: { name: 'Kilogram-force meters', symbol: 'kgf·m', fullName: 'Kilogram-force meter' },
    kgcm: { name: 'Kilogram-force centimeters', symbol: 'kgf·cm', fullName: 'Kilogram-force centimeter' },
  };

  // Calculate conversions
  useEffect(() => {
    const value = parseFloat(inputValue);

    if (!isNaN(value) && value >= 0) {
      // Convert input to Nm first
      const valueInNm = value * toNm[inputUnit];

      // Convert from Nm to all units
      setResults({
        nm: valueInNm,
        ftlbs: valueInNm / toNm.ftlbs,
        inlbs: valueInNm / toNm.inlbs,
        kgm: valueInNm / toNm.kgm,
        kgcm: valueInNm / toNm.kgcm,
      });
    } else {
      setResults(null);
    }
  }, [inputValue, inputUnit]);

  const handleReset = () => {
    setInputValue('');
    setInputUnit('nm');
    setResults(null);
    setShowOtherUnits(false);
  };

  const formatNumber = (num: number): string => {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.0001) return num.toExponential(4);
    if (Math.abs(num) < 1) return num.toFixed(6).replace(/\.?0+$/, '');
    if (Math.abs(num) >= 1000000) return num.toExponential(4);
    return num.toLocaleString('en-US', { maximumFractionDigits: 4 });
  };

  // Common conversion examples
  const commonConversions = [
    { nm: 1, ftlbs: 0.7376, description: 'Small fastener' },
    { nm: 10, ftlbs: 7.376, description: 'Spark plug' },
    { nm: 25, ftlbs: 18.44, description: 'Wheel lug nut (light)' },
    { nm: 50, ftlbs: 36.88, description: 'Oil drain plug' },
    { nm: 100, ftlbs: 73.76, description: 'Wheel lug nut (medium)' },
    { nm: 150, ftlbs: 110.6, description: 'Wheel lug nut (heavy)' },
    { nm: 200, ftlbs: 147.5, description: 'Cylinder head bolt' },
    { nm: 300, ftlbs: 221.3, description: 'Axle nut' },
    { nm: 400, ftlbs: 295.0, description: 'Crankshaft bolt' },
    { nm: 500, ftlbs: 368.8, description: 'Heavy machinery' },
  ];

  // Quick presets
  const quickPresets = [
    { value: 10, unit: 'nm' as TorqueUnit, label: '10 N·m' },
    { value: 25, unit: 'nm' as TorqueUnit, label: '25 N·m' },
    { value: 50, unit: 'nm' as TorqueUnit, label: '50 N·m' },
    { value: 100, unit: 'nm' as TorqueUnit, label: '100 N·m' },
    { value: 50, unit: 'ftlbs' as TorqueUnit, label: '50 ft·lbs' },
    { value: 100, unit: 'ftlbs' as TorqueUnit, label: '100 ft·lbs' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm py-3 px-4 sm:px-6 shadow-sm">
        <div className="container mx-auto max-w-4xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/calculators" className="text-blue-600 hover:text-blue-800">
              Calculators
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Nm to ft-lbs Converter</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
              <ArrowRightLeft className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Nm to ft-lbs Converter
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Convert torque between Newton-meters and foot-pounds instantly. Includes inch-pounds, kilogram-force meters, and other torque units.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
          {/* Input Section */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter Torque Value
            </label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value"
                  min="0"
                  step="any"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg transition-all"
                />
              </div>
              <select
                value={inputUnit}
                onChange={(e) => setInputUnit(e.target.value as TorqueUnit)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-700 font-medium min-w-[140px]"
              >
                <option value="nm">N·m</option>
                <option value="ftlbs">ft·lbs</option>
                <option value="inlbs">in·lbs</option>
                <option value="kgm">kgf·m</option>
                <option value="kgcm">kgf·cm</option>
              </select>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Quick presets:</p>
            <div className="flex flex-wrap gap-2">
              {quickPresets.map((preset) => (
                <button
                  key={`${preset.value}-${preset.unit}`}
                  onClick={() => {
                    setInputValue(preset.value.toString());
                    setInputUnit(preset.unit);
                  }}
                  className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 rounded-lg transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Results */}
          {results && (
            <div className="space-y-4">
              {/* Nm to ft-lbs (main conversion) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <p className="text-sm text-blue-700 font-medium mb-1">Newton-meters</p>
                  <p className="text-2xl font-bold text-blue-800">{formatNumber(results.nm)}</p>
                  <p className="text-sm text-blue-600">N·m</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                  <p className="text-sm text-orange-700 font-medium mb-1">Foot-pounds</p>
                  <p className="text-2xl font-bold text-orange-800">{formatNumber(results.ftlbs)}</p>
                  <p className="text-sm text-orange-600">ft·lbs</p>
                </div>
              </div>

              {/* Other Units (Expandable) */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowOtherUnits(!showOtherUnits)}
                  className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
                >
                  <span className="font-medium text-gray-700 flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Other torque units
                  </span>
                  {showOtherUnits ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {showOtherUnits && (
                  <div className="p-4 space-y-3 bg-white">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Inch-pounds</span>
                      <span className="font-semibold text-gray-800">{formatNumber(results.inlbs)} in·lbs</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Kilogram-force meters</span>
                      <span className="font-semibold text-gray-800">{formatNumber(results.kgm)} kgf·m</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Kilogram-force centimeters</span>
                      <span className="font-semibold text-gray-800">{formatNumber(results.kgcm)} kgf·cm</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Reset Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleReset}
              className="flex items-center px-6 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear all changes
            </button>
          </div>
        </div>

        {/* Conversion Formulas */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-orange-600" />
            Conversion Formulas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-semibold text-blue-800 mb-2">N·m to ft·lbs</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-sm mb-2">
                ft·lbs = N·m × 0.7376
              </div>
              <p className="text-sm text-blue-700">
                Or divide by 1.356 to get the same result
              </p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4">
              <h3 className="font-semibold text-orange-800 mb-2">ft·lbs to N·m</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-sm mb-2">
                N·m = ft·lbs × 1.3558
              </div>
              <p className="text-sm text-orange-700">
                Multiply foot-pounds by 1.3558 for newton-meters
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="font-semibold text-green-800 mb-2">in·lbs to ft·lbs</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-sm mb-2">
                ft·lbs = in·lbs ÷ 12
              </div>
              <p className="text-sm text-green-700">
                Divide inch-pounds by 12 for foot-pounds
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <h3 className="font-semibold text-purple-800 mb-2">kgf·m to N·m</h3>
              <div className="bg-white rounded-lg p-3 font-mono text-sm mb-2">
                N·m = kgf·m × 9.807
              </div>
              <p className="text-sm text-purple-700">
                1 kilogram-force meter = 9.807 newton-meters
              </p>
            </div>
          </div>
        </div>

        {/* Common Conversions Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Wrench className="w-5 h-5 mr-2 text-orange-600" />
            Common Torque Conversions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">N·m</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">ft·lbs</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Typical Application</th>
                </tr>
              </thead>
              <tbody>
                {commonConversions.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2.5 px-2 font-medium text-blue-700">{row.nm}</td>
                    <td className="py-2.5 px-2 font-medium text-orange-700">{row.ftlbs}</td>
                    <td className="py-2.5 px-2 text-gray-600">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Understanding Torque Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2 text-orange-600" />
            Understanding Torque
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is Torque?</h3>
              <p className="text-gray-600 leading-relaxed">
                Torque is a measure of rotational force, representing how much force is applied to rotate an object around an axis.
                It&apos;s the product of force multiplied by the distance from the rotation point (lever arm).
                In mechanical applications, torque specifications ensure fasteners are tightened correctly without damage.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Newton-meters (N·m)</h3>
              <p className="text-gray-600 leading-relaxed">
                The newton-meter is the SI (metric) unit of torque. One newton-meter equals the torque produced by a force of
                one newton applied at a perpendicular distance of one meter from the axis of rotation. This unit is standard
                in most countries and used in scientific, engineering, and automotive applications worldwide.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Foot-pounds (ft·lbs)</h3>
              <p className="text-gray-600 leading-relaxed">
                The foot-pound is the imperial unit of torque commonly used in the United States. One foot-pound equals the
                torque produced by one pound of force applied at a distance of one foot from the rotation axis. Many American
                torque wrenches and automotive specifications use this unit.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
                <Car className="w-4 h-4 mr-2" />
                Automotive Applications
              </h3>
              <ul className="text-yellow-700 space-y-1 text-sm">
                <li>• <strong>Wheel lug nuts:</strong> Typically 80-150 N·m (60-110 ft·lbs) depending on vehicle</li>
                <li>• <strong>Spark plugs:</strong> Usually 15-30 N·m (11-22 ft·lbs)</li>
                <li>• <strong>Oil drain plugs:</strong> Generally 30-50 N·m (22-37 ft·lbs)</li>
                <li>• <strong>Cylinder head bolts:</strong> Often 80-250 N·m (60-185 ft·lbs)</li>
                <li>• <strong>Engine mounts:</strong> Typically 60-100 N·m (44-74 ft·lbs)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Torque Matters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-orange-600" />
            Why Proper Torque Matters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 rounded-xl p-4">
              <h3 className="font-semibold text-red-800 mb-2">Under-torquing Risks</h3>
              <ul className="text-red-700 space-y-1 text-sm">
                <li>• Fasteners may loosen over time</li>
                <li>• Vibration can cause parts to separate</li>
                <li>• Gasket leaks and seal failures</li>
                <li>• Loss of clamping force</li>
                <li>• Component failure during operation</li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <h3 className="font-semibold text-red-800 mb-2">Over-torquing Risks</h3>
              <ul className="text-red-700 space-y-1 text-sm">
                <li>• Stripped threads</li>
                <li>• Broken bolts or studs</li>
                <li>• Warped or cracked components</li>
                <li>• Crushed gaskets causing leaks</li>
                <li>• Stress fractures in materials</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-green-50 rounded-xl p-4">
            <h3 className="font-semibold text-green-800 mb-2">Best Practices</h3>
            <ul className="text-green-700 space-y-1 text-sm">
              <li>• Always use a calibrated torque wrench for critical fasteners</li>
              <li>• Follow manufacturer specifications exactly</li>
              <li>• Apply torque in a cross or star pattern for multiple fasteners</li>
              <li>• Clean threads before assembly for accurate readings</li>
              <li>• Consider thread lubricant requirements (wet vs dry torque specs)</li>
            </ul>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-orange-600" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do I convert Nm to ft-lbs?</h3>
              <p className="text-gray-600">
                Multiply the value in newton-meters by 0.7376 to get foot-pounds. For example, 100 N·m × 0.7376 = 73.76 ft·lbs.
                Alternatively, you can divide the N·m value by 1.356 to get the same result.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do I convert ft-lbs to Nm?</h3>
              <p className="text-gray-600">
                Multiply the value in foot-pounds by 1.3558 to get newton-meters. For example, 100 ft·lbs × 1.3558 = 135.58 N·m.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What&apos;s the difference between ft-lbs and in-lbs?</h3>
              <p className="text-gray-600">
                Both are imperial torque units. Inch-pounds (in-lbs) are smaller - there are 12 inch-pounds in one foot-pound.
                In-lbs are used for smaller, more delicate fasteners where precise, lower torque is required.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Why do torque specs differ between wet and dry threads?</h3>
              <p className="text-gray-600">
                Lubricated (wet) threads have less friction, so the same torque produces more clamping force.
                Wet torque specs are typically 20-30% lower than dry specs. Always check if the specification
                assumes clean, dry threads or lubricated threads.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How accurate are torque wrenches?</h3>
              <p className="text-gray-600">
                Quality torque wrenches are typically accurate within ±4% of the indicated value when properly calibrated.
                Wrenches should be recalibrated annually or after being dropped. Always store a click-type torque wrench
                at its lowest setting to preserve calibration.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is kgf·m and when is it used?</h3>
              <p className="text-gray-600">
                Kilogram-force meter (kgf·m) is a metric gravitational unit of torque used in some older specifications
                and certain countries. One kgf·m equals approximately 9.807 N·m. You may encounter this unit in older
                Japanese and European vehicle manuals.
              </p>
            </div>
          </div>
        </div>

        {/* Related Calculators */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-lg border border-orange-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/calculators/speed-distance-time-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Speed Distance Time Calculator</h3>
              <p className="text-sm text-gray-600">Calculate speed, distance, or time with unit conversion</p>
            </Link>
            <Link
              href="/calculators/mg-to-ml-converter"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">mg to ml Converter</h3>
              <p className="text-sm text-gray-600">Convert mass to volume with density calculations</p>
            </Link>
            <Link
              href="/calculators/celsius-to-fahrenheit-converter"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Celsius to Fahrenheit Converter</h3>
              <p className="text-sm text-gray-600">Convert temperatures between metric and imperial</p>
            </Link>
            <Link
              href="/calculators/square-footage-calculator"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-800 mb-1">Square Footage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate area in multiple units</p>
            </Link>
          </div>
        </div>

        {/* Book Your Session CTA */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2563eb] rounded-2xl shadow-xl p-6 sm:p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <GraduationCap className="w-12 h-12 text-[#FFC857] mr-4 flex-shrink-0" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Need Help with Engineering Concepts?</h2>
                <p className="text-blue-100">
                  Our expert tutors can help you understand physics, mechanics, and engineering calculations.
                </p>
              </div>
            </div>
            <Link
              href="/book-demo-class"
              className="inline-flex items-center px-6 py-3 bg-[#FFC857] text-[#1A3D7C] font-bold rounded-xl hover:bg-yellow-400 transition-colors whitespace-nowrap"
            >
              Book Your Session
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Nm to ft-lbs Converter",
            "description": "Convert torque between Newton-meters and foot-pounds. Includes inch-pounds, kilogram-force meters, and other torque units.",
            "url": "https://www.thetutorbridge.com/calculators/nm-to-ft-lbs-converter",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "The Tutor Bridge"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I convert Nm to ft-lbs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Multiply the value in newton-meters by 0.7376 to get foot-pounds. For example, 100 N·m × 0.7376 = 73.76 ft·lbs. Alternatively, you can divide the N·m value by 1.356 to get the same result."
                }
              },
              {
                "@type": "Question",
                "name": "How do I convert ft-lbs to Nm?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Multiply the value in foot-pounds by 1.3558 to get newton-meters. For example, 100 ft·lbs × 1.3558 = 135.58 N·m."
                }
              },
              {
                "@type": "Question",
                "name": "What's the difference between ft-lbs and in-lbs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Both are imperial torque units. Inch-pounds (in-lbs) are smaller - there are 12 inch-pounds in one foot-pound. In-lbs are used for smaller, more delicate fasteners where precise, lower torque is required."
                }
              },
              {
                "@type": "Question",
                "name": "Why do torque specs differ between wet and dry threads?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Lubricated (wet) threads have less friction, so the same torque produces more clamping force. Wet torque specs are typically 20-30% lower than dry specs. Always check if the specification assumes clean, dry threads or lubricated threads."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
