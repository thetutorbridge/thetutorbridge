'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, ArrowRight, BookOpen, GraduationCap, Lightbulb, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine, ResponsiveContainer, Dot } from 'recharts';

interface SlopeResult {
  slope: number | null;
  slopeType: 'positive' | 'negative' | 'zero' | 'undefined';
  slopeFraction: string;
  pointSlopeForm: string;
  slopeInterceptForm: string;
  standardForm: string;
  xIntercept: string;
  yIntercept: string;
  steps: string[];
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function toFraction(numerator: number, denominator: number): string {
  if (denominator === 0) return 'undefined';
  if (numerator === 0) return '0';

  const sign = (numerator * denominator < 0) ? '-' : '';
  numerator = Math.abs(numerator);
  denominator = Math.abs(denominator);

  const divisor = gcd(numerator, denominator);
  numerator /= divisor;
  denominator /= divisor;

  if (denominator === 1) return `${sign}${numerator}`;
  return `${sign}${numerator}/${denominator}`;
}

export default function SlopeCalculator() {
  const [x1, setX1] = useState<string>('');
  const [y1, setY1] = useState<string>('');
  const [x2, setX2] = useState<string>('');
  const [y2, setY2] = useState<string>('');
  const [result, setResult] = useState<SlopeResult | null>(null);
  const [error, setError] = useState<string>('');

  const calculateSlope = () => {
    setError('');

    const x1Val = parseFloat(x1);
    const y1Val = parseFloat(y1);
    const x2Val = parseFloat(x2);
    const y2Val = parseFloat(y2);

    if (isNaN(x1Val) || isNaN(y1Val) || isNaN(x2Val) || isNaN(y2Val)) {
      setError('Please enter valid numbers for all coordinates');
      setResult(null);
      return;
    }

    if (x1Val === x2Val && y1Val === y2Val) {
      setError('Points must be different');
      setResult(null);
      return;
    }

    const steps: string[] = [];
    steps.push(`Given points: (${x1Val}, ${y1Val}) and (${x2Val}, ${y2Val})`);
    steps.push(`Using the slope formula: m = (y₂ − y₁) / (x₂ − x₁)`);

    // Calculate slope
    const deltaY = y2Val - y1Val;
    const deltaX = x2Val - x1Val;

    steps.push(`Substitute values: m = (${y2Val} − ${y1Val}) / (${x2Val} − ${x1Val})`);
    steps.push(`Simplify: m = ${deltaY} / ${deltaX}`);

    let slope: number | null = null;
    let slopeType: 'positive' | 'negative' | 'zero' | 'undefined';
    let slopeFraction: string;
    let pointSlopeForm: string;
    let slopeInterceptForm: string;
    let standardForm: string;
    let xIntercept: string;
    let yIntercept: string;

    if (deltaX === 0) {
      // Vertical line - undefined slope
      slopeType = 'undefined';
      slopeFraction = 'undefined';
      steps.push(`Since x₂ − x₁ = 0, the slope is undefined (vertical line)`);
      pointSlopeForm = 'Not applicable (vertical line)';
      slopeInterceptForm = 'Not applicable (vertical line)';
      standardForm = `x = ${x1Val}`;
      xIntercept = 'Not applicable';
      yIntercept = 'Not applicable';
      steps.push(`Equation of the line: x = ${x1Val}`);
    } else if (deltaY === 0) {
      // Horizontal line - zero slope
      slope = 0;
      slopeType = 'zero';
      slopeFraction = '0';
      steps.push(`Since y₂ − y₁ = 0, the slope is 0 (horizontal line)`);
      pointSlopeForm = `y − ${y1Val} = 0(x − ${x1Val})`;
      slopeInterceptForm = `y = ${y1Val}`;
      standardForm = `y = ${y1Val}`;
      xIntercept = 'Not applicable';
      yIntercept = `${y1Val}`;
      steps.push(`Point-slope form: y − ${y1Val} = 0(x − ${x1Val})`);
      steps.push(`Slope-intercept form: y = ${y1Val}`);
    } else {
      slope = deltaY / deltaX;
      slopeFraction = toFraction(deltaY, deltaX);

      if (slope > 0) {
        slopeType = 'positive';
        steps.push(`The slope is positive: m = ${slope}`);
      } else {
        slopeType = 'negative';
        steps.push(`The slope is negative: m = ${slope}`);
      }

      // Point-slope form: y - y1 = m(x - x1)
      const mStr = slopeFraction;
      pointSlopeForm = `y − ${y1Val} = ${mStr}(x − ${x1Val})`;
      steps.push(`Point-slope form: y − ${y1Val} = ${mStr}(x − ${x1Val})`);

      // Slope-intercept form: y = mx + b
      const b = y1Val - slope * x1Val;
      const bStr = b >= 0 ? `+ ${b}` : `− ${Math.abs(b)}`;
      slopeInterceptForm = `y = ${mStr}x ${bStr}`;
      steps.push(`Slope-intercept form: y = ${mStr}x ${bStr}`);

      // Standard form: Ax + By = C
      const A = -deltaY;
      const B = deltaX;
      const C = -deltaY * x1Val + deltaX * y1Val;
      const divisor = gcd(gcd(Math.abs(A), Math.abs(B)), Math.abs(C));
      const finalA = A / divisor;
      const finalB = B / divisor;
      const finalC = C / divisor;

      if (finalB === 0) {
        standardForm = `${finalA}x = ${finalC}`;
      } else {
        const BStr = finalB >= 0 ? `+ ${finalB}y` : `− ${Math.abs(finalB)}y`;
        standardForm = `${finalA}x ${BStr} = ${finalC}`;
      }
      steps.push(`Standard form: ${standardForm}`);

      // X-intercept (set y = 0)
      if (slope !== 0) {
        const xInt = -b / slope;
        xIntercept = `(${xInt.toFixed(4)}, 0)`;
        steps.push(`X-intercept (y = 0): x = ${xInt.toFixed(4)}`);
      } else {
        xIntercept = 'Not applicable';
      }

      // Y-intercept (set x = 0)
      yIntercept = `(0, ${b.toFixed(4)})`;
      steps.push(`Y-intercept (x = 0): y = ${b.toFixed(4)}`);
    }

    setResult({
      slope,
      slopeType,
      slopeFraction,
      pointSlopeForm,
      slopeInterceptForm,
      standardForm,
      xIntercept,
      yIntercept,
      steps
    });
  };

  const generateGraphData = () => {
    if (!result) return [];

    const x1Val = parseFloat(x1);
    const y1Val = parseFloat(y1);
    const x2Val = parseFloat(x2);
    const y2Val = parseFloat(y2);

    const data = [];

    // Determine the range for the graph
    const minX = Math.min(x1Val, x2Val) - 2;
    const maxX = Math.max(x1Val, x2Val) + 2;

    if (result.slopeType === 'undefined') {
      // Vertical line
      const minY = Math.min(y1Val, y2Val) - 2;
      const maxY = Math.max(y1Val, y2Val) + 2;
      for (let y = minY; y <= maxY; y += 0.5) {
        data.push({ x: x1Val, y });
      }
    } else {
      // Regular or horizontal line
      const slope = result.slope || 0;
      const b = y1Val - slope * x1Val;

      for (let x = minX; x <= maxX; x += 0.5) {
        const y = slope * x + b;
        data.push({ x, y });
      }
    }

    return data;
  };

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const x1Val = parseFloat(x1);
    const y1Val = parseFloat(y1);
    const x2Val = parseFloat(x2);
    const y2Val = parseFloat(y2);

    const isPoint1 = Math.abs(payload.x - x1Val) < 0.01 && Math.abs(payload.y - y1Val) < 0.01;
    const isPoint2 = Math.abs(payload.x - x2Val) < 0.01 && Math.abs(payload.y - y2Val) < 0.01;

    if (isPoint1 || isPoint2) {
      return (
        <svg x={cx - 6} y={cy - 6} width={12} height={12} fill="#3b82f6" viewBox="0 0 12 12">
          <circle cx={6} cy={6} r={5} stroke="#fff" strokeWidth={2} />
        </svg>
      );
    }
    return null;
  };

  const resetCalculator = () => {
    setX1('');
    setY1('');
    setX2('');
    setY2('');
    setResult(null);
    setError('');
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Slope Calculator</h1>
            </div>
            <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
              Calculate the slope between two points with step-by-step solutions and interactive graph visualization
            </p>
          </div>
        </div>

      {/* Calculator Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Input Section */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Calculator className="h-6 w-6 mr-2 text-blue-600" />
                  Enter Coordinates
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Enter the coordinates of two points to calculate the slope
                </p>
              </div>

              {/* Point 1 */}
              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-700">
                  Point 1: (x₁, y₁)
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="x1" className="text-sm text-gray-600">x₁</Label>
                    <Input
                      id="x1"
                      type="number"
                      step="any"
                      value={x1}
                      onChange={(e) => setX1(e.target.value)}
                      placeholder="Enter x₁"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="y1" className="text-sm text-gray-600">y₁</Label>
                    <Input
                      id="y1"
                      type="number"
                      step="any"
                      value={y1}
                      onChange={(e) => setY1(e.target.value)}
                      placeholder="Enter y₁"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Point 2 */}
              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-700">
                  Point 2: (x₂, y₂)
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="x2" className="text-sm text-gray-600">x₂</Label>
                    <Input
                      id="x2"
                      type="number"
                      step="any"
                      value={x2}
                      onChange={(e) => setX2(e.target.value)}
                      placeholder="Enter x₂"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="y2" className="text-sm text-gray-600">y₂</Label>
                    <Input
                      id="y2"
                      type="number"
                      step="any"
                      value={y2}
                      onChange={(e) => setY2(e.target.value)}
                      placeholder="Enter y₂"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={calculateSlope}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Calculate Slope
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={resetCalculator}
                  variant="outline"
                  className="px-6"
                >
                  Reset
                </Button>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="md:col-span-3">
              {result ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Results</h3>

                    {/* Slope */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-4">
                      <p className="text-sm text-gray-600 mb-1">Slope (m)</p>
                      <div className="flex items-baseline gap-3">
                        <p className="text-3xl font-bold text-blue-600">
                          {result.slopeFraction}
                        </p>
                        {result.slope !== null && (
                          <p className="text-lg text-gray-600">
                            ≈ {result.slope.toFixed(4)}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {result.slopeType === 'positive' && 'Positive slope (line rises from left to right)'}
                        {result.slopeType === 'negative' && 'Negative slope (line falls from left to right)'}
                        {result.slopeType === 'zero' && 'Zero slope (horizontal line)'}
                        {result.slopeType === 'undefined' && 'Undefined slope (vertical line)'}
                      </p>
                    </div>

                    {/* Equation Forms */}
                    <div className="grid gap-4 mb-4">
                      <div className="p-3 bg-white border border-gray-200 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Point-Slope Form</p>
                        <p className="text-base font-semibold text-gray-800">{result.pointSlopeForm}</p>
                      </div>
                      <div className="p-3 bg-white border border-gray-200 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Slope-Intercept Form</p>
                        <p className="text-base font-semibold text-gray-800">{result.slopeInterceptForm}</p>
                      </div>
                      <div className="p-3 bg-white border border-gray-200 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Standard Form</p>
                        <p className="text-base font-semibold text-gray-800">{result.standardForm}</p>
                      </div>
                    </div>

                    {/* Intercepts */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">X-Intercept</p>
                        <p className="text-sm font-semibold text-gray-800">{result.xIntercept}</p>
                      </div>
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Y-Intercept</p>
                        <p className="text-sm font-semibold text-gray-800">{result.yIntercept}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">Enter coordinates to calculate slope</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Graph Visualization */}
          {result && result.slopeType !== 'undefined' && (
            <div className="mt-8 border-t pt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Graph Visualization</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={generateGraphData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="x"
                      stroke="#6b7280"
                      label={{ value: 'x', position: 'insideBottomRight', offset: -5 }}
                    />
                    <YAxis
                      stroke="#6b7280"
                      label={{ value: 'y', angle: -90, position: 'insideLeft' }}
                    />
                    <ReferenceLine x={0} stroke="#9ca3af" strokeWidth={2} />
                    <ReferenceLine y={0} stroke="#9ca3af" strokeWidth={2} />
                    <Line
                      type="monotone"
                      dataKey="y"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={<CustomDot />}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                    <span>Point 1: ({x1}, {y1})</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                    <span>Point 2: ({x2}, {y2})</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step-by-Step Solution */}
          {result && (
            <div className="mt-8 border-t pt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <CheckCircle2 className="h-6 w-6 mr-2 text-green-600" />
                Step-by-Step Solution
              </h3>
              <div className="space-y-3">
                {result.steps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm mr-3">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Slope Formula Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <BookOpen className="h-8 w-8 mr-3 text-blue-600" />
            Understanding the Slope Formula
          </h2>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              The slope of a line is a fundamental concept in algebra and coordinate geometry. It measures the steepness
              and direction of a line, representing the rate of change between two points.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">The Slope Formula</h3>
              <div className="text-center my-4">
                <p className="text-2xl font-bold text-blue-600">
                  m = (y₂ − y₁) / (x₂ − x₁)
                </p>
              </div>
              <p className="text-gray-700 mt-4">
                Where:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li><strong>m</strong> is the slope of the line</li>
                <li><strong>(x₁, y₁)</strong> are the coordinates of the first point</li>
                <li><strong>(x₂, y₂)</strong> are the coordinates of the second point</li>
                <li><strong>y₂ − y₁</strong> is the change in y (rise)</li>
                <li><strong>x₂ − x₁</strong> is the change in x (run)</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">What Does Slope Mean?</h3>
            <p className="text-gray-700 mb-4">
              The slope represents the ratio of vertical change (rise) to horizontal change (run) between two points
              on a line. In practical terms:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>
                <strong>Positive slope:</strong> The line rises as you move from left to right. The larger the slope,
                the steeper the line.
              </li>
              <li>
                <strong>Negative slope:</strong> The line falls as you move from left to right. The more negative the
                slope, the steeper the decline.
              </li>
              <li>
                <strong>Zero slope:</strong> The line is horizontal, meaning there's no vertical change regardless of
                horizontal movement.
              </li>
              <li>
                <strong>Undefined slope:</strong> The line is vertical, meaning there's no horizontal change. Division
                by zero makes the slope undefined.
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">How to Calculate Slope</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-bold text-gray-800 mb-3">Step-by-Step Process</h4>
              <ol className="list-decimal list-inside text-gray-700 space-y-3">
                <li>
                  <strong>Identify the coordinates:</strong> Label your two points as (x₁, y₁) and (x₂, y₂). It doesn't
                  matter which point you choose as point 1 or point 2.
                </li>
                <li>
                  <strong>Calculate the change in y:</strong> Subtract y₁ from y₂ to find the vertical change (rise).
                  This gives you the numerator.
                </li>
                <li>
                  <strong>Calculate the change in x:</strong> Subtract x₁ from x₂ to find the horizontal change (run).
                  This gives you the denominator.
                </li>
                <li>
                  <strong>Divide:</strong> Divide the change in y by the change in x to get the slope.
                </li>
                <li>
                  <strong>Simplify:</strong> If possible, simplify the fraction to its lowest terms, or express as a decimal.
                </li>
              </ol>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Example Calculations</h3>

            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-purple-900 mb-3">Example 1: Positive Slope</h4>
                <p className="text-gray-700 mb-3">
                  Find the slope of the line passing through (2, 3) and (5, 9).
                </p>
                <div className="bg-white p-4 rounded border border-purple-200">
                  <p className="text-gray-700 mb-2"><strong>Solution:</strong></p>
                  <p className="text-gray-700">m = (9 − 3) / (5 − 2)</p>
                  <p className="text-gray-700">m = 6 / 3</p>
                  <p className="text-gray-700"><strong>m = 2</strong></p>
                  <p className="text-gray-600 mt-3 text-sm">
                    The slope is 2, which means for every 1 unit you move horizontally, the line rises 2 units vertically.
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-purple-900 mb-3">Example 2: Negative Slope</h4>
                <p className="text-gray-700 mb-3">
                  Find the slope of the line passing through (4, 7) and (8, 1).
                </p>
                <div className="bg-white p-4 rounded border border-purple-200">
                  <p className="text-gray-700 mb-2"><strong>Solution:</strong></p>
                  <p className="text-gray-700">m = (1 − 7) / (8 − 4)</p>
                  <p className="text-gray-700">m = −6 / 4</p>
                  <p className="text-gray-700"><strong>m = −3/2 or −1.5</strong></p>
                  <p className="text-gray-600 mt-3 text-sm">
                    The slope is −1.5, meaning the line falls 1.5 units vertically for every 1 unit moved horizontally.
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-purple-900 mb-3">Example 3: Zero Slope</h4>
                <p className="text-gray-700 mb-3">
                  Find the slope of the line passing through (−3, 5) and (4, 5).
                </p>
                <div className="bg-white p-4 rounded border border-purple-200">
                  <p className="text-gray-700 mb-2"><strong>Solution:</strong></p>
                  <p className="text-gray-700">m = (5 − 5) / (4 − (−3))</p>
                  <p className="text-gray-700">m = 0 / 7</p>
                  <p className="text-gray-700"><strong>m = 0</strong></p>
                  <p className="text-gray-600 mt-3 text-sm">
                    The slope is 0 because the y-coordinates are the same, indicating a horizontal line.
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-purple-900 mb-3">Example 4: Undefined Slope</h4>
                <p className="text-gray-700 mb-3">
                  Find the slope of the line passing through (6, 2) and (6, 8).
                </p>
                <div className="bg-white p-4 rounded border border-purple-200">
                  <p className="text-gray-700 mb-2"><strong>Solution:</strong></p>
                  <p className="text-gray-700">m = (8 − 2) / (6 − 6)</p>
                  <p className="text-gray-700">m = 6 / 0</p>
                  <p className="text-gray-700"><strong>m = undefined</strong></p>
                  <p className="text-gray-600 mt-3 text-sm">
                    The slope is undefined because the x-coordinates are the same, indicating a vertical line.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Equation Forms Using Slope</h3>
            <p className="text-gray-700 mb-4">
              Once you know the slope and have at least one point, you can write the equation of the line in various forms:
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Point-Slope Form</h4>
                <p className="text-xl font-semibold text-blue-600 mb-2">y − y₁ = m(x − x₁)</p>
                <p className="text-gray-700">
                  This form is useful when you know the slope and one point on the line. Simply substitute the slope
                  (m) and the coordinates of the known point (x₁, y₁).
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Slope-Intercept Form</h4>
                <p className="text-xl font-semibold text-blue-600 mb-2">y = mx + b</p>
                <p className="text-gray-700">
                  This is the most common form, where m is the slope and b is the y-intercept (where the line crosses
                  the y-axis). This form makes it easy to graph the line and identify its properties.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Standard Form</h4>
                <p className="text-xl font-semibold text-blue-600 mb-2">Ax + By = C</p>
                <p className="text-gray-700">
                  In standard form, A, B, and C are integers, and A is typically positive. This form is useful for
                  certain algebraic manipulations and for finding intercepts quickly.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Real-World Applications of Slope</h3>
            <p className="text-gray-700 mb-4">
              Understanding slope is crucial in many real-world contexts:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                <h4 className="text-lg font-bold text-blue-900 mb-2">Construction and Engineering</h4>
                <p className="text-gray-700">
                  Slope determines the grade of roads, ramps, and roofs. Building codes often specify maximum slopes
                  for wheelchair ramps (typically 1:12) and drainage systems.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                <h4 className="text-lg font-bold text-green-900 mb-2">Economics and Business</h4>
                <p className="text-gray-700">
                  Slope represents rate of change in graphs showing profit, revenue, or cost over time. A steeper
                  positive slope indicates faster growth.
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
                <h4 className="text-lg font-bold text-purple-900 mb-2">Physics and Science</h4>
                <p className="text-gray-700">
                  Slope on a distance-time graph represents velocity. On a velocity-time graph, it represents
                  acceleration. These concepts are fundamental in motion analysis.
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
                <h4 className="text-lg font-bold text-orange-900 mb-2">Geography and Cartography</h4>
                <p className="text-gray-700">
                  Topographic maps use slope to show terrain steepness. Ski resorts classify runs by slope difficulty,
                  with steeper slopes being more challenging.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Common Mistakes to Avoid</h3>

            <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6">
              <h4 className="text-lg font-bold text-red-900 mb-3">Watch Out For These Errors:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-3">
                <li>
                  <strong>Reversing the subtraction:</strong> Always subtract the coordinates in the same order for
                  both numerator and denominator. If you calculate (y₂ − y₁), you must also calculate (x₂ − x₁),
                  not (x₁ − x₂).
                </li>
                <li>
                  <strong>Mixing up x and y:</strong> Make sure you're subtracting y-coordinates in the numerator
                  and x-coordinates in the denominator, not the other way around.
                </li>
                <li>
                  <strong>Dividing by zero:</strong> When x₂ = x₁, the line is vertical and the slope is undefined,
                  not zero. Don't attempt to divide by zero.
                </li>
                <li>
                  <strong>Confusing zero slope with undefined slope:</strong> A horizontal line (same y-coordinates)
                  has zero slope, while a vertical line (same x-coordinates) has undefined slope.
                </li>
                <li>
                  <strong>Sign errors:</strong> Pay careful attention to negative signs when subtracting negative
                  numbers. Remember that subtracting a negative is the same as adding a positive.
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Tips for Success</h3>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <ul className="list-disc list-inside text-gray-700 space-y-3">
                <li>
                  <strong>Label your points clearly:</strong> Write down which point is (x₁, y₁) and which is
                  (x₂, y₂) before you begin calculating.
                </li>
                <li>
                  <strong>Show your work:</strong> Write out each step of the calculation to avoid arithmetic errors
                  and make it easier to check your answer.
                </li>
                <li>
                  <strong>Simplify fractions:</strong> Always reduce your slope to the simplest form for cleaner
                  results and easier interpretation.
                </li>
                <li>
                  <strong>Check with a graph:</strong> If possible, plot the points and draw the line to visually
                  verify that your calculated slope makes sense.
                </li>
                <li>
                  <strong>Practice with different types:</strong> Work through examples of positive, negative, zero,
                  and undefined slopes to become comfortable with all scenarios.
                </li>
                <li>
                  <strong>Use the calculator above:</strong> Verify your hand calculations using our slope calculator
                  to check your work and see the step-by-step solution.
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Parallel and Perpendicular Lines</h3>
            <p className="text-gray-700 mb-4">
              The slope of a line determines its relationship with other lines:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                <h4 className="text-lg font-bold text-blue-900 mb-2">Parallel Lines</h4>
                <p className="text-gray-700 mb-3">
                  Two lines are parallel if and only if they have the same slope (and different y-intercepts).
                </p>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="text-gray-700 text-sm">
                    <strong>Example:</strong> Lines with slopes m = 3 and m = 3 are parallel.
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
                <h4 className="text-lg font-bold text-purple-900 mb-2">Perpendicular Lines</h4>
                <p className="text-gray-700 mb-3">
                  Two lines are perpendicular if the product of their slopes equals −1. This means their slopes are
                  negative reciprocals.
                </p>
                <div className="bg-white p-3 rounded border border-purple-200">
                  <p className="text-gray-700 text-sm">
                    <strong>Example:</strong> Lines with slopes m = 2 and m = −1/2 are perpendicular because
                    2 × (−1/2) = −1.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Advanced Concepts</h3>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Rate of Change</h4>
                <p className="text-gray-700">
                  Slope is fundamentally a measure of rate of change. In calculus, this concept extends to derivatives,
                  which represent instantaneous rates of change. The slope formula gives you the average rate of change
                  between two points.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Direction Angles</h4>
                <p className="text-gray-700 mb-2">
                  The slope is related to the angle θ that the line makes with the positive x-axis through the
                  relationship:
                </p>
                <p className="text-center text-lg font-semibold text-blue-600 my-2">tan(θ) = m</p>
                <p className="text-gray-700">
                  Therefore, θ = arctan(m). This connection between slope and angle is useful in trigonometry and
                  vector mathematics.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Distance and Midpoint</h4>
                <p className="text-gray-700">
                  Related concepts often used with slope include the distance formula (to find the length of a line
                  segment) and the midpoint formula (to find the point exactly halfway between two points). These
                  formulas, combined with slope, give you powerful tools for analyzing lines and shapes in coordinate
                  geometry.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Practice Problems</h3>
            <p className="text-gray-700 mb-4">
              Test your understanding with these practice problems. Use our calculator above to check your answers!
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
                <p className="text-gray-800 font-semibold mb-2">1. Find the slope of the line through (−2, 5) and (3, −1).</p>
                <details className="mt-3">
                  <summary className="cursor-pointer text-blue-600 font-semibold">Show Solution</summary>
                  <div className="mt-3 p-3 bg-white rounded border border-yellow-200">
                    <p className="text-gray-700">m = (−1 − 5) / (3 − (−2)) = −6 / 5</p>
                    <p className="text-gray-700 mt-2"><strong>Answer: m = −6/5 or −1.2</strong></p>
                  </div>
                </details>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
                <p className="text-gray-800 font-semibold mb-2">2. What is the slope of a line passing through (7, 4) and (7, −3)?</p>
                <details className="mt-3">
                  <summary className="cursor-pointer text-blue-600 font-semibold">Show Solution</summary>
                  <div className="mt-3 p-3 bg-white rounded border border-yellow-200">
                    <p className="text-gray-700">m = (−3 − 4) / (7 − 7) = −7 / 0</p>
                    <p className="text-gray-700 mt-2"><strong>Answer: Undefined (vertical line)</strong></p>
                  </div>
                </details>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
                <p className="text-gray-800 font-semibold mb-2">3. Find the slope of the line through (−4, −2) and (5, −2).</p>
                <details className="mt-3">
                  <summary className="cursor-pointer text-blue-600 font-semibold">Show Solution</summary>
                  <div className="mt-3 p-3 bg-white rounded border border-yellow-200">
                    <p className="text-gray-700">m = (−2 − (−2)) / (5 − (−4)) = 0 / 9</p>
                    <p className="text-gray-700 mt-2"><strong>Answer: m = 0 (horizontal line)</strong></p>
                  </div>
                </details>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
                <p className="text-gray-800 font-semibold mb-2">
                  4. A line has slope 3/4. What is the slope of a line perpendicular to it?
                </p>
                <details className="mt-3">
                  <summary className="cursor-pointer text-blue-600 font-semibold">Show Solution</summary>
                  <div className="mt-3 p-3 bg-white rounded border border-yellow-200">
                    <p className="text-gray-700">For perpendicular lines: m₁ × m₂ = −1</p>
                    <p className="text-gray-700">(3/4) × m₂ = −1</p>
                    <p className="text-gray-700">m₂ = −1 ÷ (3/4) = −1 × (4/3)</p>
                    <p className="text-gray-700 mt-2"><strong>Answer: m = −4/3</strong></p>
                  </div>
                </details>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <Lightbulb className="h-6 w-6 mr-2 text-yellow-600" />
                Key Takeaways
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Slope measures the steepness and direction of a line</li>
                <li>The formula is m = (y₂ − y₁) / (x₂ − x₁), also known as "rise over run"</li>
                <li>Positive slopes rise, negative slopes fall, zero slopes are horizontal, undefined slopes are vertical</li>
                <li>Slope is essential for writing equations of lines in various forms</li>
                <li>Parallel lines have equal slopes; perpendicular lines have slopes that are negative reciprocals</li>
                <li>Understanding slope is crucial for algebra, calculus, and many real-world applications</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <Info className="h-8 w-8 mr-3 text-blue-600" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                What is the difference between slope and gradient?
              </summary>
              <p className="text-gray-700 mt-3">
                In mathematics, "slope" and "gradient" are often used interchangeably to describe the steepness of a
                line. However, in some contexts, gradient can refer to a vector field or the rate of change in multiple
                dimensions. For lines in two-dimensional space, they mean the same thing.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                Can slope be greater than 1?
              </summary>
              <p className="text-gray-700 mt-3">
                Yes! Slope can be any real number. A slope greater than 1 or less than −1 indicates a steep line.
                For example, a slope of 5 means the line rises 5 units vertically for every 1 unit horizontally,
                making it quite steep.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                How do I find slope from an equation?
              </summary>
              <p className="text-gray-700 mt-3">
                If the equation is in slope-intercept form (y = mx + b), the slope is the coefficient m. If it's in
                standard form (Ax + By = C), solve for y to get slope-intercept form, or use m = −A/B. For other forms,
                identify two points on the line and use the slope formula.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                What does a slope of 1 mean?
              </summary>
              <p className="text-gray-700 mt-3">
                A slope of 1 means the line rises 1 unit vertically for every 1 unit it moves horizontally. This creates
                a 45-degree angle with the x-axis. The line rises at a consistent, moderate rate.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                Why is vertical line slope undefined?
              </summary>
              <p className="text-gray-700 mt-3">
                A vertical line has the same x-coordinate for all points, making the denominator (x₂ − x₁) equal to
                zero. Since division by zero is undefined in mathematics, we say the slope is undefined. You can think
                of it as "infinitely steep."
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                How is slope used in real life?
              </summary>
              <p className="text-gray-700 mt-3">
                Slope appears in countless real-world applications: road grades (for example, a 6% grade means a slope
                of 0.06), roof pitch in construction, ski slope difficulty ratings, wheelchair ramp specifications,
                economic graphs showing rates of change, velocity on distance-time graphs, and drainage systems in
                civil engineering.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                What is the slope of the x-axis?
              </summary>
              <p className="text-gray-700 mt-3">
                The x-axis is a horizontal line where y = 0 for all values of x. Since there's no vertical change
                regardless of horizontal movement, the slope is 0. Similarly, any horizontal line (y = c) has a slope
                of 0.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                Can I use this calculator for finding slope from a graph?
              </summary>
              <p className="text-gray-700 mt-3">
                Yes! If you have a graph, identify two clear points on the line, read their coordinates, and enter
                them into the calculator. The calculator will find the slope and show you the step-by-step solution.
                Our graph visualization will also help you verify your points are correct.
              </p>
            </details>
          </div>
        </div>

        {/* Book Your Session CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white text-center">
          <GraduationCap className="h-16 w-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Need Help Understanding Slope?</h2>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Our expert tutors can help you master slope, linear equations, and all aspects of algebra and geometry.
            Get personalized one-on-one instruction tailored to your learning style.
          </p>
          <Link href="https://thetutorbridge.com/book-session">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto font-semibold"
            >
              Book Your Session Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
