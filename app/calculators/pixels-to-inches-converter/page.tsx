'use client';

import { useState, useEffect } from 'react';
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
import Link from 'next/link';
import { Calculator, Home, Monitor, BookOpen, ArrowRight, Smartphone, Laptop, Printer, Image, Info, RotateCcw, ArrowLeftRight } from 'lucide-react';

// Common PPI presets
const ppiPresets = [
  { name: 'Web Standard (96 PPI)', value: 96, category: 'Web' },
  { name: 'Mac Retina (72 PPI)', value: 72, category: 'Web' },
  { name: 'Print Standard (300 DPI)', value: 300, category: 'Print' },
  { name: 'Print High Quality (600 DPI)', value: 600, category: 'Print' },
  { name: '27" 1080p Monitor (82 PPI)', value: 82, category: 'Monitor' },
  { name: '24" 1080p Monitor (92 PPI)', value: 92, category: 'Monitor' },
  { name: '27" 4K Monitor (163 PPI)', value: 163, category: 'Monitor' },
  { name: '32" 4K Monitor (138 PPI)', value: 138, category: 'Monitor' },
  { name: 'iPhone 15/14/13 (460 PPI)', value: 460, category: 'Mobile' },
  { name: 'iPhone 15 Pro Max (460 PPI)', value: 460, category: 'Mobile' },
  { name: 'Samsung Galaxy S24 (416 PPI)', value: 416, category: 'Mobile' },
  { name: 'iPad Pro 12.9" (264 PPI)', value: 264, category: 'Tablet' },
  { name: 'MacBook Pro 14" (254 PPI)', value: 254, category: 'Laptop' },
  { name: 'MacBook Air M2 (224 PPI)', value: 224, category: 'Laptop' },
  { name: 'Custom', value: 0, category: 'Custom' },
];

interface ConversionResult {
  inches: number;
  pixels: number;
  ppi: number;
  centimeters: number;
  millimeters: number;
}

export default function PixelsToInchesConverter() {
  const [inches, setInches] = useState<string>('');
  const [pixels, setPixels] = useState<string>('');
  const [ppi, setPpi] = useState<string>('96');
  const [selectedPreset, setSelectedPreset] = useState<string>('96');
  const [lastEdited, setLastEdited] = useState<'inches' | 'pixels'>('pixels');
  const [result, setResult] = useState<ConversionResult | null>(null);

  // Auto-calculate when values change
  useEffect(() => {
    calculateConversion();
  }, [inches, pixels, ppi, lastEdited]);

  const calculateConversion = () => {
    const ppiValue = parseFloat(ppi) || 96;

    if (ppiValue <= 0) {
      setResult(null);
      return;
    }

    if (lastEdited === 'pixels' && pixels !== '') {
      const pixelValue = parseFloat(pixels);
      if (!isNaN(pixelValue)) {
        const inchesValue = pixelValue / ppiValue;
        setResult({
          inches: inchesValue,
          pixels: pixelValue,
          ppi: ppiValue,
          centimeters: inchesValue * 2.54,
          millimeters: inchesValue * 25.4,
        });
      } else {
        setResult(null);
      }
    } else if (lastEdited === 'inches' && inches !== '') {
      const inchesValue = parseFloat(inches);
      if (!isNaN(inchesValue)) {
        const pixelValue = inchesValue * ppiValue;
        setResult({
          inches: inchesValue,
          pixels: pixelValue,
          ppi: ppiValue,
          centimeters: inchesValue * 2.54,
          millimeters: inchesValue * 25.4,
        });
      } else {
        setResult(null);
      }
    } else {
      setResult(null);
    }
  };

  const handlePixelsChange = (value: string) => {
    setPixels(value);
    setLastEdited('pixels');
  };

  const handleInchesChange = (value: string) => {
    setInches(value);
    setLastEdited('inches');
  };

  const handlePresetChange = (value: string) => {
    setSelectedPreset(value);
    if (value !== '0') {
      setPpi(value);
    }
  };

  const handleClear = () => {
    setInches('');
    setPixels('');
    setResult(null);
  };

  const formatNumber = (num: number, decimals: number = 4): string => {
    if (Math.abs(num) < 0.0001 && num !== 0) {
      return num.toExponential(2);
    }
    return num.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How many pixels are in an inch?","acceptedAnswer":{"@type":"Answer","text":"It depends on the PPI setting. At 96 PPI (web standard), 1 inch = 96 pixels. At 300 DPI (print), 1 inch = 300 pixels. At 72 PPI (Mac standard), 1 inch = 72 pixels."}},{"@type":"Question","name":"How do I convert 1920 pixels to inches?","acceptedAnswer":{"@type":"Answer","text":"Divide by PPI. At 96 PPI: 1920 ÷ 96 = 20 inches. At 300 DPI: 1920 ÷ 300 = 6.4 inches. The result changes based on pixel density."}},{"@type":"Question","name":"What PPI should I use for web images?","acceptedAnswer":{"@type":"Answer","text":"For web, 72-96 PPI is standard. The actual display size depends on the viewer\'s screen, so pixel dimensions matter more than PPI for web images."}},{"@type":"Question","name":"What DPI is needed for printing?","acceptedAnswer":{"@type":"Answer","text":"Standard print quality requires 300 DPI. High-quality prints (photos, fine art) use 600 DPI or higher. Lower quality prints (posters, billboards viewed from distance) can use 150 DPI."}},{"@type":"Question","name":"Why does the same image look different sizes on different screens?","acceptedAnswer":{"@type":"Answer","text":"Different screens have different PPI values. A 1000-pixel wide image appears smaller on a high-PPI phone screen than on a low-PPI monitor because the pixels are physically smaller on high-PPI displays."}},{"@type":"Question","name":"How do I find my monitor\'s PPI?","acceptedAnswer":{"@type":"Answer","text":"Use the formula: PPI = √(width² + height²) ÷ diagonal size. Or check your display specifications—most manufacturers list PPI in the technical specs."}},{"@type":"Question","name":"What\'s the difference between resolution and PPI?","acceptedAnswer":{"@type":"Answer","text":"Resolution is the total pixel count (e.g., 1920×1080). PPI is the pixel density—how many pixels fit per inch. A screen\'s PPI depends on both resolution AND physical size."}},{"@type":"Question","name":"How many pixels do I need for a 4×6 inch print at 300 DPI?","acceptedAnswer":{"@type":"Answer","text":"Multiply dimensions by DPI: 4 × 300 = 1200 pixels wide, 6 × 300 = 1800 pixels tall. You need a minimum of 1200×1800 pixels for quality 4×6 print."}}]}' }}
      />
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-violet-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-violet-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Pixels to Inches Converter</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 mt-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <Monitor className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pixels to Inches Converter
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Convert pixels to inches or inches to pixels based on PPI (pixels per inch). Works for screens, monitors, phones, and print resolution.
          </p>
        </div>

        {/* Calculator Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white text-center py-4 rounded-xl mb-6">
              <h2 className="text-2xl font-bold">Pixel ↔ Inch Converter</h2>
              <p className="text-violet-100 text-sm mt-1">Enter any value to convert both ways</p>
            </div>

            {/* Input Fields */}
            <div className="space-y-6 mb-6">
              {/* Inches Input */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="inches" className="text-lg font-semibold text-gray-700">
                    Inches
                  </Label>
                </div>
                <Input
                  id="inches"
                  type="number"
                  step="any"
                  value={lastEdited === 'inches' ? inches : (result ? formatNumber(result.inches, 6) : '')}
                  onChange={(e) => handleInchesChange(e.target.value)}
                  onFocus={() => {
                    if (lastEdited !== 'inches' && result) {
                      setInches(result.inches.toString());
                      setLastEdited('inches');
                    }
                  }}
                  className={`text-lg py-5 ${lastEdited === 'pixels' && result ? 'bg-violet-50 border-violet-300 text-violet-700 font-semibold' : ''}`}
                  placeholder="Enter inches"
                />
              </div>

              {/* Pixels Input */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="pixels" className="text-lg font-semibold text-gray-700">
                    Pixels
                  </Label>
                </div>
                <Input
                  id="pixels"
                  type="number"
                  step="any"
                  value={lastEdited === 'pixels' ? pixels : (result ? formatNumber(result.pixels, 2) : '')}
                  onChange={(e) => handlePixelsChange(e.target.value)}
                  onFocus={() => {
                    if (lastEdited !== 'pixels' && result) {
                      setPixels(result.pixels.toString());
                      setLastEdited('pixels');
                    }
                  }}
                  className={`text-lg py-5 ${lastEdited === 'inches' && result ? 'bg-violet-50 border-violet-300 text-violet-700 font-semibold' : ''}`}
                  placeholder="Enter pixels"
                />
              </div>

              {/* PPI Input with Presets */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="ppi" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    Pixels per inch (PPI)
                    <span className="group relative">
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        PPI (Pixels Per Inch) measures pixel density. Higher PPI means sharper display. DPI (Dots Per Inch) is the same concept for printers.
                      </span>
                    </span>
                  </Label>
                </div>
                <div className="flex gap-3">
                  <Input
                    id="ppi"
                    type="number"
                    step="any"
                    value={ppi}
                    onChange={(e) => {
                      setPpi(e.target.value);
                      setSelectedPreset('0');
                    }}
                    className="flex-1 text-lg py-5"
                    placeholder="96"
                  />
                  <Select value={selectedPreset} onValueChange={handlePresetChange}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Select preset" />
                    </SelectTrigger>
                    <SelectContent>
                      {ppiPresets.map((preset) => (
                        <SelectItem key={`${preset.name}-${preset.value}`} value={preset.value.toString()}>
                          {preset.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Info Banner */}
            <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 mb-6">
              <p className="text-violet-700 text-sm flex items-start gap-2">
                <span className="text-lg">💡</span>
                <span>You can perform calculations both ways, i.e., convert inches to pixels and <em>vice versa</em>. Just enter a value in either field.</span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                onClick={handleClear}
                variant="outline"
                className="flex-1 py-6 text-lg font-semibold border-2 hover:bg-gray-100"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Clear All
              </Button>
              <Button
                onClick={calculateConversion}
                className="flex-1 py-6 text-lg font-semibold bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
              >
                <ArrowLeftRight className="w-5 h-5 mr-2" />
                Convert
              </Button>
            </div>

            {/* Results Section */}
            {result && (
              <div className="border-2 border-violet-200 rounded-xl p-6 bg-gradient-to-br from-violet-50 to-purple-50">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Conversion Results:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg border-2 border-violet-200 shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">Pixels</div>
                    <div className="text-xl font-bold text-violet-700">
                      {formatNumber(result.pixels, 2)} px
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-2 border-violet-200 shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">Inches</div>
                    <div className="text-xl font-bold text-violet-700">
                      {formatNumber(result.inches, 4)} in
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-2 border-violet-200 shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">Centimeters</div>
                    <div className="text-xl font-bold text-purple-700">
                      {formatNumber(result.centimeters, 4)} cm
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-2 border-violet-200 shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">Millimeters</div>
                    <div className="text-xl font-bold text-purple-700">
                      {formatNumber(result.millimeters, 4)} mm
                    </div>
                  </div>
                </div>

                {/* Formula Display */}
                <div className="mt-4 pt-4 border-t border-violet-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Formula Used:</h4>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-white px-4 py-2 rounded-full text-sm font-mono text-violet-700 border border-violet-300">
                      {lastEdited === 'pixels'
                        ? `${formatNumber(result.pixels, 2)} px ÷ ${result.ppi} PPI = ${formatNumber(result.inches, 4)} inches`
                        : `${formatNumber(result.inches, 4)} in × ${result.ppi} PPI = ${formatNumber(result.pixels, 2)} pixels`
                      }
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Help text when no result */}
            {!result && (
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <Monitor className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Enter a value in inches or pixels to see the conversion</p>
              </div>
            )}
          </div>
        </div>

        {/* Common PPI Reference */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-gray-900 to-violet-900 rounded-2xl shadow-xl p-6 md:p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Common PPI Values by Device</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/10 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Monitor className="w-5 h-5 text-violet-300" />
                  <h3 className="font-bold text-violet-300">Monitors</h3>
                </div>
                <ul className="space-y-2 text-sm text-violet-100">
                  <li>24" 1080p: 92 PPI</li>
                  <li>27" 1080p: 82 PPI</li>
                  <li>27" 4K: 163 PPI</li>
                  <li>32" 4K: 138 PPI</li>
                </ul>
              </div>

              <div className="bg-white/10 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="w-5 h-5 text-violet-300" />
                  <h3 className="font-bold text-violet-300">Phones</h3>
                </div>
                <ul className="space-y-2 text-sm text-violet-100">
                  <li>iPhone 15: 460 PPI</li>
                  <li>iPhone SE: 326 PPI</li>
                  <li>Galaxy S24: 416 PPI</li>
                  <li>Pixel 8: 428 PPI</li>
                </ul>
              </div>

              <div className="bg-white/10 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Laptop className="w-5 h-5 text-violet-300" />
                  <h3 className="font-bold text-violet-300">Laptops</h3>
                </div>
                <ul className="space-y-2 text-sm text-violet-100">
                  <li>MacBook Pro 14": 254 PPI</li>
                  <li>MacBook Air: 224 PPI</li>
                  <li>13" 1080p: 166 PPI</li>
                  <li>15" 1080p: 141 PPI</li>
                </ul>
              </div>

              <div className="bg-white/10 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Printer className="w-5 h-5 text-violet-300" />
                  <h3 className="font-bold text-violet-300">Print</h3>
                </div>
                <ul className="space-y-2 text-sm text-violet-100">
                  <li>Web graphics: 72 DPI</li>
                  <li>Standard: 96 DPI</li>
                  <li>Print quality: 300 DPI</li>
                  <li>High quality: 600 DPI</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Table */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Reference: Pixels to Inches at 96 PPI</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-violet-600 text-white">
                    <th className="p-3 text-left">Pixels</th>
                    <th className="p-3 text-left">Inches</th>
                    <th className="p-3 text-left">Centimeters</th>
                    <th className="p-3 text-left">Common Use</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-mono">72 px</td>
                    <td className="p-3">0.75 in</td>
                    <td className="p-3">1.91 cm</td>
                    <td className="p-3 text-sm">Standard icon size</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">96 px</td>
                    <td className="p-3">1 in</td>
                    <td className="p-3">2.54 cm</td>
                    <td className="p-3 text-sm">One inch at web standard</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-mono">150 px</td>
                    <td className="p-3">1.56 in</td>
                    <td className="p-3">3.97 cm</td>
                    <td className="p-3 text-sm">Thumbnail image</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">300 px</td>
                    <td className="p-3">3.13 in</td>
                    <td className="p-3">7.94 cm</td>
                    <td className="p-3 text-sm">Small web image</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-mono">600 px</td>
                    <td className="p-3">6.25 in</td>
                    <td className="p-3">15.88 cm</td>
                    <td className="p-3 text-sm">Medium web image</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">1080 px</td>
                    <td className="p-3">11.25 in</td>
                    <td className="p-3">28.58 cm</td>
                    <td className="p-3 text-sm">Full HD height</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-mono">1920 px</td>
                    <td className="p-3">20 in</td>
                    <td className="p-3">50.8 cm</td>
                    <td className="p-3 text-sm">Full HD width</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">2160 px</td>
                    <td className="p-3">22.5 in</td>
                    <td className="p-3">57.15 cm</td>
                    <td className="p-3 text-sm">4K height</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 font-mono">3840 px</td>
                    <td className="p-3">40 in</td>
                    <td className="p-3">101.6 cm</td>
                    <td className="p-3 text-sm">4K width</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="max-w-4xl mx-auto space-y-8 mb-12">
          {/* What is a Pixel */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Image className="w-8 h-8 text-violet-500" />
              What is a Pixel?
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                A <strong>pixel</strong> (short for "picture element") is the smallest unit of a digital image or display. Each pixel represents a single point of color on a screen. When millions of pixels are combined, they create the images we see on our computers, phones, and TVs.
              </p>
              <p>
                The key thing to understand is that <strong>a pixel has no fixed physical size</strong>. The same 100×100 pixel image will appear larger on a low-resolution display and smaller on a high-resolution display. This is why we need to know the PPI (pixels per inch) to convert between pixels and physical measurements.
              </p>
              <div className="bg-violet-50 p-6 rounded-xl my-4">
                <h4 className="font-bold text-violet-700 mb-2">Key Point</h4>
                <p className="text-violet-800">
                  Pixel size depends on the display's resolution and physical dimensions. A 1920×1080 resolution on a 27" monitor has larger pixels than the same resolution on a 15" laptop screen.
                </p>
              </div>
            </div>
          </section>

          {/* What is PPI */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Monitor className="w-8 h-8 text-violet-500" />
              Understanding PPI (Pixels Per Inch)
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                <strong>PPI (Pixels Per Inch)</strong> measures the pixel density of a display—how many pixels fit within one linear inch. Higher PPI means more pixels are packed into the same space, resulting in sharper, more detailed images.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">PPI vs DPI: What's the Difference?</h3>
              <p>
                While often used interchangeably, there's a technical distinction:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>PPI (Pixels Per Inch)</strong>: Used for digital screens and displays</li>
                <li><strong>DPI (Dots Per Inch)</strong>: Used for printers and physical output</li>
              </ul>
              <p>
                For practical purposes when converting digital images, they work the same way. A 300 DPI print setting corresponds to 300 pixels per inch.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">How to Calculate PPI</h3>
              <p>
                You can calculate a display's PPI using the diagonal resolution and screen size:
              </p>
              <div className="bg-violet-50 p-6 rounded-xl my-4">
                <div className="text-center text-lg font-mono">
                  PPI = √(width² + height²) ÷ diagonal size (inches)
                </div>
              </div>
              <p>
                <strong>Example:</strong> A 27" monitor with 1920×1080 resolution:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                <p>PPI = √(1920² + 1080²) ÷ 27</p>
                <p>PPI = √(3,686,400 + 1,166,400) ÷ 27</p>
                <p>PPI = √4,852,800 ÷ 27</p>
                <p>PPI = 2203 ÷ 27 ≈ <strong>82 PPI</strong></p>
              </div>
            </div>
          </section>

          {/* Conversion Formulas */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Calculator className="w-8 h-8 text-violet-500" />
              Pixels to Inches Conversion Formulas
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Pixels to Inches</h3>
              <div className="bg-violet-50 p-6 rounded-xl my-4">
                <div className="flex items-center justify-center gap-2 text-xl flex-wrap">
                  <span className="font-bold text-violet-700">Inches = Pixels ÷ PPI</span>
                </div>
              </div>
              <p>
                <strong>Example:</strong> Convert 1920 pixels to inches at 96 PPI:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg font-mono">
                <p>Inches = 1920 ÷ 96 = <strong>20 inches</strong></p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Inches to Pixels</h3>
              <div className="bg-violet-50 p-6 rounded-xl my-4">
                <div className="flex items-center justify-center gap-2 text-xl flex-wrap">
                  <span className="font-bold text-violet-700">Pixels = Inches × PPI</span>
                </div>
              </div>
              <p>
                <strong>Example:</strong> Convert 5 inches to pixels at 300 DPI (for print):
              </p>
              <div className="bg-gray-100 p-4 rounded-lg font-mono">
                <p>Pixels = 5 × 300 = <strong>1500 pixels</strong></p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Pixels to Centimeters</h3>
              <div className="bg-violet-50 p-6 rounded-xl my-4">
                <div className="flex items-center justify-center gap-2 text-xl flex-wrap">
                  <span className="font-bold text-violet-700">Centimeters = (Pixels ÷ PPI) × 2.54</span>
                </div>
              </div>
              <p>
                Since 1 inch = 2.54 centimeters, simply multiply the inch result by 2.54.
              </p>
            </div>
          </section>

          {/* Practical Applications */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Image className="w-8 h-8 text-violet-500" />
              Practical Applications
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-xl border border-violet-200">
                <div className="flex items-center gap-3 mb-4">
                  <Monitor className="w-6 h-6 text-violet-600" />
                  <h3 className="text-xl font-bold text-violet-700">Web Design</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Web images typically use 72-96 PPI. Understanding pixel-to-inch conversion helps size images appropriately for different screen sizes.
                </p>
                <p className="text-sm text-violet-600 font-semibold">
                  Standard: 96 PPI (Windows) or 72 PPI (Mac)
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Printer className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-blue-700">Print Design</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Print requires 300 DPI minimum for quality output. A 4×6 inch print needs 1200×1800 pixels at 300 DPI.
                </p>
                <p className="text-sm text-blue-600 font-semibold">
                  Standard: 300 DPI (standard) or 600 DPI (high quality)
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <Smartphone className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-green-700">Mobile App Design</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Mobile devices have high PPI (300-500+). Design at higher resolutions and use responsive sizing for crisp graphics.
                </p>
                <p className="text-sm text-green-600 font-semibold">
                  iPhone: 460 PPI, Android: 300-500+ PPI
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200">
                <div className="flex items-center gap-3 mb-4">
                  <Image className="w-6 h-6 text-orange-600" />
                  <h3 className="text-xl font-bold text-orange-700">Photography</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Know your camera's megapixels to determine maximum print size. A 12MP (4000×3000) image can print at 13.3×10 inches at 300 DPI.
                </p>
                <p className="text-sm text-orange-600 font-semibold">
                  Max print size = pixels ÷ 300 DPI
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-violet-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How many pixels are in an inch?</h3>
                <p className="text-gray-700">
                  It depends on the PPI setting. At 96 PPI (web standard), 1 inch = 96 pixels. At 300 DPI (print), 1 inch = 300 pixels. At 72 PPI (Mac standard), 1 inch = 72 pixels.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How do I convert 1920 pixels to inches?</h3>
                <p className="text-gray-700">
                  Divide by PPI. At 96 PPI: 1920 ÷ 96 = 20 inches. At 300 DPI: 1920 ÷ 300 = 6.4 inches. The result changes based on pixel density.
                </p>
              </div>

              <div className="border-l-4 border-violet-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What PPI should I use for web images?</h3>
                <p className="text-gray-700">
                  For web, 72-96 PPI is standard. The actual display size depends on the viewer's screen, so pixel dimensions matter more than PPI for web images.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What DPI is needed for printing?</h3>
                <p className="text-gray-700">
                  Standard print quality requires 300 DPI. High-quality prints (photos, fine art) use 600 DPI or higher. Lower quality prints (posters, billboards viewed from distance) can use 150 DPI.
                </p>
              </div>

              <div className="border-l-4 border-violet-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Why does the same image look different sizes on different screens?</h3>
                <p className="text-gray-700">
                  Different screens have different PPI values. A 1000-pixel wide image appears smaller on a high-PPI phone screen than on a low-PPI monitor because the pixels are physically smaller on high-PPI displays.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How do I find my monitor's PPI?</h3>
                <p className="text-gray-700">
                  Use the formula: PPI = √(width² + height²) ÷ diagonal size. Or check your display specifications—most manufacturers list PPI in the technical specs.
                </p>
              </div>

              <div className="border-l-4 border-violet-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What's the difference between resolution and PPI?</h3>
                <p className="text-gray-700">
                  Resolution is the total pixel count (e.g., 1920×1080). PPI is the pixel density—how many pixels fit per inch. A screen's PPI depends on both resolution AND physical size.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How many pixels do I need for a 4×6 inch print at 300 DPI?</h3>
                <p className="text-gray-700">
                  Multiply dimensions by DPI: 4 × 300 = 1200 pixels wide, 6 × 300 = 1800 pixels tall. You need a minimum of 1200×1800 pixels for quality 4×6 print.
                </p>
              </div>

              <div className="border-l-4 border-violet-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Why is web design usually 72 or 96 PPI?</h3>
                <p className="text-gray-700">
                  These were early screen standards (Mac used 72, Windows used 96). While modern screens have higher PPI, these settings persist as defaults. For web, pixel dimensions matter more than PPI metadata.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What is Retina display?</h3>
                <p className="text-gray-700">
                  Retina is Apple's marketing term for displays with high enough PPI that individual pixels aren't visible at normal viewing distance (typically 200+ PPI for laptops, 300+ for phones).
                </p>
              </div>
            </div>
          </section>

          {/* Related Calculators */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Calculators</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/calculators/square-footage-calculator" className="block p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl hover:shadow-md transition-shadow border border-violet-200">
                <h3 className="font-bold text-violet-700 mb-2">Square Footage Calculator</h3>
                <p className="text-sm text-gray-600">Calculate area in various units</p>
              </Link>
              <Link href="/calculators/percentage-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-shadow border border-blue-200">
                <h3 className="font-bold text-blue-700 mb-2">Percentage Calculator</h3>
                <p className="text-sm text-gray-600">Calculate percentages easily</p>
              </Link>
              <Link href="/calculators/circumference-calculator" className="block p-4 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl hover:shadow-md transition-shadow border border-indigo-200">
                <h3 className="font-bold text-indigo-700 mb-2">Circumference Calculator</h3>
                <p className="text-sm text-gray-600">Calculate circle measurements</p>
              </Link>
            </div>
          </section>

          {/* Book Your Session CTA */}
          <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-2xl shadow-2xl p-8 text-white text-center">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Need Help with Design or Digital Media?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-blue-100 leading-relaxed">
              Our expert tutors can help you understand digital imaging concepts, resolution, and design principles with personalized one-on-one sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
