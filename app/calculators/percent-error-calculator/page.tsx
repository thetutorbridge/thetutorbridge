'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

export default function PercentErrorCalculator() {
  const [calculationType, setCalculationType] = useState<string>('percent-error');
  const [experimental, setExperimental] = useState<string>('5');
  const [theoretical, setTheoretical] = useState<string>('7');
  const [percentError, setPercentError] = useState<string>('');
  const [result, setResult] = useState<{
    percentError: number;
    absoluteError: number;
    relativeError: number;
  } | null>(null);

  const handleCalculate = () => {
    const E = parseFloat(experimental);
    const T = parseFloat(theoretical);
    const PE = parseFloat(percentError);

    if (calculationType === 'percent-error') {
      if (isNaN(E) || isNaN(T) || T === 0) {
        alert('Please enter valid experimental and theoretical values. Theoretical value cannot be zero.');
        return;
      }

      const absError = Math.abs(E - T);
      const relError = absError / Math.abs(T);
      const percError = relError * 100;

      setResult({
        percentError: percError,
        absoluteError: absError,
        relativeError: relError,
      });
    } else if (calculationType === 'experimental-value') {
      if (isNaN(PE) || isNaN(T) || T === 0) {
        alert('Please enter valid percent error and theoretical value. Theoretical value cannot be zero.');
        return;
      }

      const calculatedE = T * (1 + (PE / 100));
      const absError = Math.abs(calculatedE - T);
      const relError = absError / Math.abs(T);

      setExperimental(calculatedE.toFixed(10));
      setResult({
        percentError: PE,
        absoluteError: absError,
        relativeError: relError,
      });
    } else if (calculationType === 'theoretical-value') {
      if (isNaN(PE) || isNaN(E) || PE === 100 || PE === -100) {
        alert('Please enter valid percent error and experimental value. Percent error cannot be ±100%.');
        return;
      }

      const calculatedT = E / (1 + (PE / 100));
      const absError = Math.abs(E - calculatedT);
      const relError = absError / Math.abs(calculatedT);

      setTheoretical(calculatedT.toFixed(10));
      setResult({
        percentError: PE,
        absoluteError: absError,
        relativeError: relError,
      });
    }
  };

  const handleClear = () => {
    setExperimental('5');
    setTheoretical('7');
    setPercentError('');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-8 mt-20 mb-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A3D7C] mb-4">
            Percent Error Calculator
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Calculate percentage error between experimental and theoretical values with step-by-step solutions. Perfect for chemistry labs, physics experiments, and scientific research.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Calculator Section */}
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border-t-4 border-red-600">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-center py-3 rounded-lg mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Percent Error Calculator</h2>
            </div>

            {/* Calculation Type Selector */}
            <div className="mb-6">
              <Label htmlFor="calculationType" className="text-base font-semibold text-gray-700 mb-2 block">
                Calculate:
              </Label>
              <Select value={calculationType} onValueChange={setCalculationType}>
                <SelectTrigger className="w-full text-base border-2 border-gray-300 focus:border-red-500">
                  <SelectValue placeholder="Select calculation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percent-error">Percent Error</SelectItem>
                  <SelectItem value="experimental-value">Experimental Value</SelectItem>
                  <SelectItem value="theoretical-value">Theoretical Value</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Formula Display */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
              {calculationType === 'percent-error' && (
                <div className="text-center">
                  <div className="flex items-center justify-center flex-wrap gap-2 text-lg">
                    <span className="font-semibold">% error =</span>
                    <div className="inline-flex flex-col items-center mx-1">
                      <span className="px-3 font-semibold border-b-2 border-gray-900 pb-1">| E − T |</span>
                      <span className="px-3 font-semibold pt-1">T</span>
                    </div>
                    <span className="font-semibold">× 100 = ?</span>
                  </div>
                </div>
              )}
              {calculationType === 'experimental-value' && (
                <div className="text-center">
                  <div className="flex items-center justify-center flex-wrap gap-2 text-lg">
                    <span className="font-semibold">E = T × (1 +</span>
                    <div className="inline-flex flex-col items-center mx-1">
                      <span className="px-3 font-semibold border-b-2 border-gray-900 pb-1">% error</span>
                      <span className="px-3 font-semibold pt-1">100</span>
                    </div>
                    <span className="font-semibold">) = ?</span>
                  </div>
                </div>
              )}
              {calculationType === 'theoretical-value' && (
                <div className="text-center">
                  <div className="flex items-center justify-center flex-wrap gap-2 text-lg">
                    <span className="font-semibold">T =</span>
                    <div className="inline-flex flex-col items-center mx-1">
                      <span className="px-3 font-semibold border-b-2 border-gray-900 pb-1">E</span>
                      <span className="px-3 font-semibold pt-1">(1 + % error / 100)</span>
                    </div>
                    <span className="font-semibold">= ?</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Fields */}
            <div className="space-y-6 mb-6">
              {/* Experimental Value Input */}
              {calculationType !== 'experimental-value' && (
                <div>
                  <Label htmlFor="experimental" className="text-base font-semibold text-gray-700 mb-2 block">
                    E = <span className="text-sm font-normal italic text-gray-600">Experimental</span>
                  </Label>
                  <Input
                    id="experimental"
                    type="number"
                    step="any"
                    value={experimental}
                    onChange={(e) => setExperimental(e.target.value)}
                    className="text-lg p-3 border-2 border-gray-300 focus:border-red-500"
                    placeholder="Enter experimental value"
                  />
                </div>
              )}

              {/* Theoretical Value Input */}
              {calculationType !== 'theoretical-value' && (
                <div>
                  <Label htmlFor="theoretical" className="text-base font-semibold text-gray-700 mb-2 block">
                    T = <span className="text-sm font-normal italic text-gray-600">Theoretical</span>
                  </Label>
                  <Input
                    id="theoretical"
                    type="number"
                    step="any"
                    value={theoretical}
                    onChange={(e) => setTheoretical(e.target.value)}
                    className="text-lg p-3 border-2 border-gray-300 focus:border-red-500"
                    placeholder="Enter theoretical value"
                  />
                </div>
              )}

              {/* Percent Error Input */}
              {calculationType !== 'percent-error' && (
                <div>
                  <Label htmlFor="percentError" className="text-base font-semibold text-gray-700 mb-2 block">
                    % error = <span className="text-sm font-normal italic text-gray-600">Percent Error</span>
                  </Label>
                  <Input
                    id="percentError"
                    type="number"
                    step="any"
                    value={percentError}
                    onChange={(e) => setPercentError(e.target.value)}
                    className="text-lg p-3 border-2 border-gray-300 focus:border-red-500"
                    placeholder="Enter percent error"
                  />
                </div>
              )}
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
                onClick={handleCalculate}
                className="py-6 text-lg font-semibold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
              >
                Calculate
              </Button>
            </div>

            {/* Answer Section */}
            {result && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Answer:</h3>
                <div className="space-y-3">
                  <p className="text-lg">
                    <span className="font-semibold">% error =</span>{' '}
                    <span className="text-red-600 font-bold">{result.percentError.toFixed(8)}%</span>
                  </p>
                  {calculationType === 'experimental-value' && (
                    <p className="text-lg">
                      <span className="font-semibold">Experimental Value =</span>{' '}
                      <span className="text-blue-600 font-bold">{experimental}</span>
                    </p>
                  )}
                  {calculationType === 'theoretical-value' && (
                    <p className="text-lg">
                      <span className="font-semibold">Theoretical Value =</span>{' '}
                      <span className="text-blue-600 font-bold">{theoretical}</span>
                    </p>
                  )}
                  <div className="border-t-2 border-gray-300 pt-3 mt-3">
                    <p className="text-base text-gray-700">
                      <span className="font-semibold">Absolute Error =</span>{' '}
                      {result.absoluteError.toFixed(8)}
                    </p>
                    <p className="text-base text-gray-700">
                      <span className="font-semibold">Relative Error =</span>{' '}
                      {result.relativeError.toFixed(10)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Solution Section */}
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
            <h3 className="text-2xl font-bold text-[#1A3D7C] mb-6 pb-3 border-b-2 border-gray-200">
              Solution:
            </h3>

            {result && calculationType === 'percent-error' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Calculate percent error</h4>

                  <div className="space-y-4 text-lg">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">% error =</span>
                      <div className="inline-flex flex-col items-center mx-1">
                        <span className="px-3 font-semibold border-b-2 border-gray-900 pb-1">| E − T |</span>
                        <span className="px-3 font-semibold pt-1">T</span>
                      </div>
                      <span className="font-semibold">× 100</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">% error =</span>
                      <div className="inline-flex flex-col items-center mx-1">
                        <span className="px-3 font-semibold border-b-2 border-gray-900 pb-1">| {experimental} − {theoretical} |</span>
                        <span className="px-3 font-semibold pt-1">{theoretical}</span>
                      </div>
                      <span className="font-semibold">× 100</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">% error =</span>
                      <div className="inline-flex flex-col items-center mx-1">
                        <span className="px-3 font-semibold border-b-2 border-gray-900 pb-1">| {(parseFloat(experimental) - parseFloat(theoretical)).toFixed(4)} |</span>
                        <span className="px-3 font-semibold pt-1">{theoretical}</span>
                      </div>
                      <span className="font-semibold">× 100%</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">% error =</span>
                      <span className="font-semibold">| {result.relativeError.toFixed(10)} |</span>
                      <span className="font-semibold">× 100</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">% error =</span>
                      <span className="font-semibold">{Math.abs(result.relativeError).toFixed(10)} × 100</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">% error =</span>
                      <span className="font-semibold">{result.percentError.toFixed(8)}</span>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                      <p className="text-lg font-bold text-gray-800">
                        Percent Error = {result.percentError.toFixed(8)}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t-2 border-gray-200">
                    <p className="text-base text-gray-700 mb-2">
                      <span className="font-semibold">Absolute Error =</span> {result.absoluteError.toFixed(8)}
                    </p>
                    <p className="text-base text-gray-700">
                      <span className="font-semibold">Relative Error =</span> {result.relativeError.toFixed(10)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {result && calculationType === 'experimental-value' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Calculate experimental value</h4>

                  <div className="space-y-4 text-lg">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">E = T × (1 +</span>
                      <div className="inline-flex flex-col items-center mx-1">
                        <span className="px-3 font-semibold border-b-2 border-gray-900 pb-1">% error</span>
                        <span className="px-3 font-semibold pt-1">100</span>
                      </div>
                      <span className="font-semibold">)</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">E = {theoretical} × (1 +</span>
                      <div className="inline-flex flex-col items-center mx-1">
                        <span className="px-3 font-semibold border-b-2 border-gray-900 pb-1">{percentError}</span>
                        <span className="px-3 font-semibold pt-1">100</span>
                      </div>
                      <span className="font-semibold">)</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">E = {theoretical} × (1 + {(parseFloat(percentError) / 100).toFixed(6)})</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">E = {theoretical} × {(1 + parseFloat(percentError) / 100).toFixed(6)}</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">E = {experimental}</span>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                      <p className="text-lg font-bold text-gray-800">
                        Experimental Value = {experimental}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {result && calculationType === 'theoretical-value' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Calculate theoretical value</h4>

                  <div className="space-y-4 text-lg">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">T =</span>
                      <div className="inline-flex flex-col items-center mx-1">
                        <span className="px-3 font-semibold border-b-2 border-gray-900 pb-1">E</span>
                        <span className="px-3 font-semibold pt-1">(1 + % error / 100)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">T =</span>
                      <div className="inline-flex flex-col items-center mx-1">
                        <span className="px-3 font-semibold border-b-2 border-gray-900 pb-1">{experimental}</span>
                        <span className="px-3 font-semibold pt-1">(1 + {percentError} / 100)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">T =</span>
                      <div className="inline-flex flex-col items-center mx-1">
                        <span className="px-3 font-semibold border-b-2 border-gray-900 pb-1">{experimental}</span>
                        <span className="px-3 font-semibold pt-1">{(1 + parseFloat(percentError) / 100).toFixed(6)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">T = {theoretical}</span>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                      <p className="text-lg font-bold text-gray-800">
                        Theoretical Value = {theoretical}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!result && (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg">Enter values and click Calculate to see the step-by-step solution</p>
              </div>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">What is Percent Error?</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="text-lg leading-relaxed">
              Percent error (also called percentage error) is a measurement of the accuracy of an experimental or measured value compared to a true or theoretical value. It expresses the difference between the measured value and the accepted value as a percentage of the accepted value. Percent error is widely used in scientific experiments, laboratory work, quality control, and statistical analysis to quantify measurement accuracy.
            </p>
            <p className="text-lg leading-relaxed">
              The percent error formula uses absolute value to ensure the result is always positive, making it easier to compare errors across different measurements. A smaller percent error indicates higher accuracy, while a larger percent error suggests greater deviation from the true value.
            </p>
            <p className="text-lg leading-relaxed">
              In scientific research and educational settings, calculating percent error is essential for evaluating experimental techniques, identifying sources of error, and improving measurement precision. It helps researchers and students understand the reliability of their data and the effectiveness of their experimental methods.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Percent Error Formula</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="text-lg leading-relaxed mb-4">
              The percent error formula calculates the relative difference between an experimental value and a theoretical (accepted) value:
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
              <div className="flex items-center justify-center gap-3 text-xl flex-wrap">
                <span className="font-bold">Percent Error =</span>
                <div className="inline-flex flex-col items-center mx-2">
                  <span className="px-4 font-bold border-b-2 border-gray-900 pb-1">| Experimental Value − Theoretical Value |</span>
                  <span className="px-4 font-bold pt-1">Theoretical Value</span>
                </div>
                <span className="font-bold">× 100%</span>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 my-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Where:</h3>
              <ul className="space-y-3 text-lg">
                <li><span className="font-semibold">Experimental Value (E):</span> The value obtained from measurement or experiment</li>
                <li><span className="font-semibold">Theoretical Value (T):</span> The accepted, true, or expected value</li>
                <li><span className="font-semibold">Absolute Value (| |):</span> Ensures the result is positive regardless of whether the experimental value is higher or lower than the theoretical value</li>
              </ul>
            </div>

            <p className="text-lg leading-relaxed">
              The formula can also be written using the variables E and T:
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6">
              <div className="flex items-center justify-center gap-3 text-xl flex-wrap">
                <span className="font-bold">% error =</span>
                <div className="inline-flex flex-col items-center mx-2">
                  <span className="px-4 font-bold border-b-2 border-gray-900 pb-1">| E − T |</span>
                  <span className="px-4 font-bold pt-1">T</span>
                </div>
                <span className="font-bold">× 100</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">How to Calculate Percent Error (Step-by-Step)</h2>
          <div className="prose max-w-none text-gray-700">
            <ol className="space-y-6 text-lg">
              <li className="pl-2">
                <span className="font-bold text-[#1A3D7C]">Step 1: Identify the Values</span>
                <p className="mt-2 ml-4">Determine your experimental value (measured value) and theoretical value (accepted or true value).</p>
                <div className="bg-gray-50 p-4 rounded-lg mt-3 ml-4">
                  <p className="font-semibold">Example:</p>
                  <p>Experimental Value (E) = 5</p>
                  <p>Theoretical Value (T) = 7</p>
                </div>
              </li>

              <li className="pl-2">
                <span className="font-bold text-[#1A3D7C]">Step 2: Calculate the Absolute Difference</span>
                <p className="mt-2 ml-4">Subtract the theoretical value from the experimental value and take the absolute value to ensure a positive result.</p>
                <div className="bg-gray-50 p-4 rounded-lg mt-3 ml-4">
                  <p>Absolute Error = | E − T |</p>
                  <p>Absolute Error = | 5 − 7 | = | −2 | = 2</p>
                </div>
              </li>

              <li className="pl-2">
                <span className="font-bold text-[#1A3D7C]">Step 3: Divide by Theoretical Value</span>
                <p className="mt-2 ml-4">Divide the absolute difference by the theoretical value to get the relative error.</p>
                <div className="bg-gray-50 p-4 rounded-lg mt-3 ml-4">
                  <p>Relative Error = 2 ÷ 7 = 0.285714286</p>
                </div>
              </li>

              <li className="pl-2">
                <span className="font-bold text-[#1A3D7C]">Step 4: Multiply by 100</span>
                <p className="mt-2 ml-4">Multiply the relative error by 100 to convert it to a percentage.</p>
                <div className="bg-gray-50 p-4 rounded-lg mt-3 ml-4">
                  <p>Percent Error = 0.285714286 × 100 = 28.5714286%</p>
                </div>
              </li>

              <li className="pl-2">
                <span className="font-bold text-[#1A3D7C]">Step 5: Interpret the Result</span>
                <p className="mt-2 ml-4">The percent error of 28.57% indicates that the experimental value differs from the theoretical value by approximately 28.57%. A lower percent error indicates higher accuracy.</p>
              </li>
            </ol>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Related Error Calculations</h2>
          <div className="prose max-w-none text-gray-700 space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Absolute Error</h3>
              <p className="text-lg mb-3">
                Absolute error is the magnitude of the difference between the experimental and theoretical values:
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-lg">Absolute Error = | Experimental Value − Theoretical Value |</p>
                <p className="font-semibold text-lg">Absolute Error = | E − T |</p>
              </div>
              <p className="mt-3 text-base">
                Unlike percent error, absolute error is expressed in the same units as the measured quantity and does not account for the magnitude of the measurement.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Relative Error</h3>
              <p className="text-lg mb-3">
                Relative error is the ratio of the absolute error to the theoretical value:
              </p>
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center gap-2 flex-wrap text-lg font-semibold">
                  <span>Relative Error =</span>
                  <div className="inline-flex flex-col items-center mx-1">
                    <span className="px-3 border-b-2 border-gray-900 pb-1">Absolute Error</span>
                    <span className="px-3 pt-1">Theoretical Value</span>
                  </div>
                  <span>=</span>
                  <div className="inline-flex flex-col items-center mx-1">
                    <span className="px-3 border-b-2 border-gray-900 pb-1">| E − T |</span>
                    <span className="px-3 pt-1">T</span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-base">
                Relative error is dimensionless (has no units) and is simply the decimal form of percent error. To convert relative error to percent error, multiply by 100.
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Relationship Between Errors</h3>
              <div className="space-y-3 text-lg">
                <p><span className="font-semibold">Percent Error</span> = Relative Error × 100</p>
                <p><span className="font-semibold">Relative Error</span> = Percent Error ÷ 100</p>
                <p><span className="font-semibold">Absolute Error</span> = Relative Error × Theoretical Value</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Applications of Percent Error</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-3">Chemistry Laboratory</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Titration experiments</li>
                <li>• Determining molecular mass</li>
                <li>• Measuring reaction yields</li>
                <li>• Analyzing concentration</li>
                <li>• Evaluating purity of compounds</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-3">Physics Experiments</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Measuring acceleration due to gravity</li>
                <li>• Calculating kinetic energy</li>
                <li>• Determining spring constants</li>
                <li>• Measuring wavelengths of light</li>
                <li>• Analyzing pendulum periods</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
              <h3 className="text-xl font-bold text-purple-800 mb-3">Biology Research</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Population growth studies</li>
                <li>• Enzyme activity measurements</li>
                <li>• pH determinations</li>
                <li>• Genetic frequency calculations</li>
                <li>• Metabolic rate experiments</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border-2 border-orange-200">
              <h3 className="text-xl font-bold text-orange-800 mb-3">Engineering & Quality Control</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Manufacturing tolerance analysis</li>
                <li>• Calibration verification</li>
                <li>• Product specification testing</li>
                <li>• Measurement system analysis</li>
                <li>• Process capability studies</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Interpreting Percent Error Values</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
                  <th className="border-2 border-gray-300 p-4 text-left">Percent Error Range</th>
                  <th className="border-2 border-gray-300 p-4 text-left">Interpretation</th>
                  <th className="border-2 border-gray-300 p-4 text-left">Typical Causes</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="bg-green-50">
                  <td className="border-2 border-gray-300 p-4 font-semibold">0% - 5%</td>
                  <td className="border-2 border-gray-300 p-4">Excellent accuracy</td>
                  <td className="border-2 border-gray-300 p-4">Precise instruments, careful technique, minimal environmental factors</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border-2 border-gray-300 p-4 font-semibold">5% - 10%</td>
                  <td className="border-2 border-gray-300 p-4">Good accuracy</td>
                  <td className="border-2 border-gray-300 p-4">Minor measurement errors, slight calibration issues</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="border-2 border-gray-300 p-4 font-semibold">10% - 20%</td>
                  <td className="border-2 border-gray-300 p-4">Moderate accuracy</td>
                  <td className="border-2 border-gray-300 p-4">Human error, instrument limitations, environmental variations</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="border-2 border-gray-300 p-4 font-semibold">20% - 50%</td>
                  <td className="border-2 border-gray-300 p-4">Poor accuracy</td>
                  <td className="border-2 border-gray-300 p-4">Systematic errors, faulty equipment, incorrect procedures</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="border-2 border-gray-300 p-4 font-semibold">&gt; 50%</td>
                  <td className="border-2 border-gray-300 p-4">Unacceptable accuracy</td>
                  <td className="border-2 border-gray-300 p-4">Major experimental flaws, wrong theoretical value, calculation errors</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Common Sources of Experimental Error</h2>
          <div className="prose max-w-none text-gray-700 space-y-6">
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Systematic Errors</h3>
              <p className="text-lg mb-3">
                Systematic errors are consistent, repeatable errors that affect measurements in the same direction each time:
              </p>
              <ul className="space-y-2 text-base ml-6">
                <li>• Calibration errors in instruments</li>
                <li>• Zero error in measuring devices</li>
                <li>• Improper experimental setup</li>
                <li>• Environmental factors (temperature, pressure, humidity)</li>
                <li>• Observer bias or parallax error</li>
                <li>• Using incorrect formulas or constants</li>
              </ul>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Random Errors</h3>
              <p className="text-lg mb-3">
                Random errors are unpredictable variations that occur differently in each measurement:
              </p>
              <ul className="space-y-2 text-base ml-6">
                <li>• Fluctuations in experimental conditions</li>
                <li>• Reading measurement scales</li>
                <li>• Timing variations in manual measurements</li>
                <li>• Electrical noise in electronic instruments</li>
                <li>• Inconsistent mixing or sample preparation</li>
                <li>• Natural variations in materials</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Human Errors</h3>
              <p className="text-lg mb-3">
                Mistakes made by the experimenter during the procedure:
              </p>
              <ul className="space-y-2 text-base ml-6">
                <li>• Misreading scales or instruments</li>
                <li>• Recording data incorrectly</li>
                <li>• Using wrong chemicals or materials</li>
                <li>• Not following procedure correctly</li>
                <li>• Calculation mistakes</li>
                <li>• Contamination of samples</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Tips for Reducing Percent Error</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Use Calibrated Instruments</h4>
                  <p className="text-gray-700">Ensure all measuring devices are properly calibrated before use.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Take Multiple Measurements</h4>
                  <p className="text-gray-700">Perform experiments multiple times and average the results to reduce random errors.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Control Environmental Factors</h4>
                  <p className="text-gray-700">Maintain consistent temperature, pressure, and humidity during experiments.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Use Appropriate Precision</h4>
                  <p className="text-gray-700">Select instruments with precision suitable for the measurement being made.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">5</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Follow Proper Technique</h4>
                  <p className="text-gray-700">Adhere strictly to established experimental procedures and protocols.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">6</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Minimize Parallax Error</h4>
                  <p className="text-gray-700">Read measurements at eye level and perpendicular to the scale.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">7</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Verify Calculations</h4>
                  <p className="text-gray-700">Double-check all mathematical calculations and unit conversions.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">8</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Use Fresh Materials</h4>
                  <p className="text-gray-700">Ensure chemicals and samples are not degraded or contaminated.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What is the difference between percent error and percent difference?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Percent error compares an experimental value to a known theoretical (true) value and indicates accuracy. Percent difference compares two experimental values to each other when there is no known "true" value, and it indicates precision or consistency between measurements. Percent error uses the theoretical value in the denominator, while percent difference typically uses the average of the two values.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Can percent error be negative?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                No, percent error cannot be negative because the formula uses absolute value (| |), which makes the result always positive. This ensures that percent error represents the magnitude of the deviation regardless of whether the experimental value is higher or lower than the theoretical value. If you need to know the direction of the error, you can calculate "signed percent error" by removing the absolute value bars.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What is an acceptable percent error?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                The acceptable percent error depends on the field of study and the nature of the experiment. In chemistry and physics laboratories, percent errors below 5% are generally considered excellent, 5-10% is good, and anything above 10% may require investigation. However, for some complex biological experiments or field measurements, higher percent errors (up to 20-30%) might be acceptable due to natural variability and measurement challenges.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What does a percent error of 0% mean?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                A percent error of 0% means that the experimental value exactly matches the theoretical value, indicating perfect accuracy. However, this is extremely rare in real experiments due to measurement limitations, environmental factors, and instrument precision. If you consistently get 0% error, you should verify your experimental setup and calculations, as this may indicate a problem with the procedure or that measurements were copied from the theoretical values.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Can percent error be greater than 100%?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Yes, percent error can exceed 100% when the absolute difference between experimental and theoretical values is greater than the theoretical value itself. For example, if the theoretical value is 5 and the experimental value is 15, the percent error would be 200%. Such high percent errors typically indicate major experimental problems, systematic errors, or the use of an incorrect theoretical value.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How do you reduce percent error in experiments?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To reduce percent error: (1) use calibrated, high-precision instruments; (2) perform multiple trials and average the results; (3) control environmental variables like temperature and humidity; (4) follow proper measurement techniques to avoid parallax and reading errors; (5) ensure all materials are pure and fresh; (6) minimize systematic errors through proper experimental design; and (7) carefully follow established procedures and protocols.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Is percent error the same as accuracy?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Percent error is a measure of accuracy, but they are not exactly the same thing. Accuracy refers to how close a measurement is to the true value, while percent error quantifies that accuracy as a percentage. Lower percent error indicates higher accuracy. Accuracy is a qualitative concept, whereas percent error provides a quantitative assessment of accuracy.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What is the relationship between percent error and significant figures?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                When reporting percent error, the number of significant figures should reflect the precision of your measurements. Generally, percent error should be rounded to match the significant figures in your experimental data. If your measurements have 3 significant figures, report your percent error with 3 significant figures as well. Over-reporting precision in percent error can be misleading about the actual accuracy of your measurements.
              </p>
            </div>
          </div>
        </div>

        {/* Book Your Session CTA */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-xl shadow-2xl p-8 md:p-12 text-center text-white mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help with Science Experiments?</h2>
          <p className="text-xl mb-6 text-gray-100">
            Our expert tutors can help you understand percent error, experimental design, and data analysis
          </p>
          <Link
            href="/tutoring/free-consultation"
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
