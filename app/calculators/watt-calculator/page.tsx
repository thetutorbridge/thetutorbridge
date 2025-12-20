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
import { Calculator, Home, Zap, BookOpen, ArrowRight, Lightbulb, Battery, Cpu, CircuitBoard, RotateCcw } from 'lucide-react';

// Unit conversion factors to base units (V, A, Ω, W)
const voltageUnits = {
  'mV': { label: 'millivolts (mV)', factor: 0.001 },
  'V': { label: 'volts (V)', factor: 1 },
  'kV': { label: 'kilovolts (kV)', factor: 1000 },
  'MV': { label: 'megavolts (MV)', factor: 1000000 },
};

const currentUnits = {
  'μA': { label: 'microamperes (μA)', factor: 0.000001 },
  'mA': { label: 'milliamperes (mA)', factor: 0.001 },
  'A': { label: 'amperes (A)', factor: 1 },
};

const resistanceUnits = {
  'mΩ': { label: 'milliohms (mΩ)', factor: 0.001 },
  'Ω': { label: 'ohms (Ω)', factor: 1 },
  'kΩ': { label: 'kiloohms (kΩ)', factor: 1000 },
  'MΩ': { label: 'megaohms (MΩ)', factor: 1000000 },
};

const powerUnits = {
  'pW': { label: 'picowatts (pW)', factor: 1e-12 },
  'nW': { label: 'nanowatts (nW)', factor: 1e-9 },
  'μW': { label: 'microwatts (μW)', factor: 1e-6 },
  'mW': { label: 'milliwatts (mW)', factor: 0.001 },
  'W': { label: 'watts (W)', factor: 1 },
  'kW': { label: 'kilowatts (kW)', factor: 1000 },
  'MW': { label: 'megawatts (MW)', factor: 1000000 },
  'GW': { label: 'gigawatts (GW)', factor: 1e9 },
  'TW': { label: 'terawatts (TW)', factor: 1e12 },
  'PW': { label: 'petawatts (PW)', factor: 1e15 },
  'hp(E)': { label: 'electric horsepowers (hp(E))', factor: 746 },
};

interface CalculationResult {
  voltage: number;
  current: number;
  resistance: number;
  power: number;
  voltageUnit: string;
  currentUnit: string;
  resistanceUnit: string;
  powerUnit: string;
  calculatedFields: string[];
  formulas: string[];
}

export default function WattCalculator() {
  const [voltage, setVoltage] = useState<string>('');
  const [current, setCurrent] = useState<string>('');
  const [resistance, setResistance] = useState<string>('');
  const [power, setPower] = useState<string>('');

  const [voltageUnit, setVoltageUnit] = useState<string>('V');
  const [currentUnit, setCurrentUnit] = useState<string>('A');
  const [resistanceUnit, setResistanceUnit] = useState<string>('Ω');
  const [powerUnit, setPowerUnit] = useState<string>('W');

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [autoCalculate, setAutoCalculate] = useState<boolean>(true);

  // Convert input value to base unit
  const toBaseUnit = (value: number, unit: string, unitType: 'voltage' | 'current' | 'resistance' | 'power'): number => {
    const units = unitType === 'voltage' ? voltageUnits :
                  unitType === 'current' ? currentUnits :
                  unitType === 'resistance' ? resistanceUnits : powerUnits;
    return value * (units[unit as keyof typeof units]?.factor || 1);
  };

  // Convert from base unit to display unit
  const fromBaseUnit = (value: number, unit: string, unitType: 'voltage' | 'current' | 'resistance' | 'power'): number => {
    const units = unitType === 'voltage' ? voltageUnits :
                  unitType === 'current' ? currentUnits :
                  unitType === 'resistance' ? resistanceUnits : powerUnits;
    return value / (units[unit as keyof typeof units]?.factor || 1);
  };

  const calculateValues = () => {
    const v = voltage !== '' ? toBaseUnit(parseFloat(voltage), voltageUnit, 'voltage') : null;
    const i = current !== '' ? toBaseUnit(parseFloat(current), currentUnit, 'current') : null;
    const r = resistance !== '' ? toBaseUnit(parseFloat(resistance), resistanceUnit, 'resistance') : null;
    const p = power !== '' ? toBaseUnit(parseFloat(power), powerUnit, 'power') : null;

    // Count how many values we have
    const knownValues = [v, i, r, p].filter(val => val !== null && !isNaN(val as number)).length;

    if (knownValues < 2) {
      setResult(null);
      return;
    }

    let calcV = v;
    let calcI = i;
    let calcR = r;
    let calcP = p;
    const calculatedFields: string[] = [];
    const formulas: string[] = [];

    // Calculate missing values using Ohm's Law and Power equations
    // P = V × I, V = I × R, P = I² × R, P = V² / R

    // If we have V and I, calculate P and R
    if (calcV !== null && calcI !== null) {
      if (calcP === null) {
        calcP = calcV * calcI;
        calculatedFields.push('power');
        formulas.push('P = V × I');
      }
      if (calcR === null && calcI !== 0) {
        calcR = calcV / calcI;
        calculatedFields.push('resistance');
        formulas.push('R = V ÷ I');
      }
    }

    // If we have V and R, calculate I and P
    if (calcV !== null && calcR !== null && calcR !== 0) {
      if (calcI === null) {
        calcI = calcV / calcR;
        calculatedFields.push('current');
        formulas.push('I = V ÷ R');
      }
      if (calcP === null) {
        calcP = (calcV * calcV) / calcR;
        calculatedFields.push('power');
        formulas.push('P = V² ÷ R');
      }
    }

    // If we have V and P, calculate I and R
    if (calcV !== null && calcP !== null && calcV !== 0) {
      if (calcI === null) {
        calcI = calcP / calcV;
        calculatedFields.push('current');
        formulas.push('I = P ÷ V');
      }
      if (calcR === null && calcI !== null && calcI !== 0) {
        calcR = calcV / calcI;
        calculatedFields.push('resistance');
        formulas.push('R = V ÷ I');
      }
    }

    // If we have I and R, calculate V and P
    if (calcI !== null && calcR !== null) {
      if (calcV === null) {
        calcV = calcI * calcR;
        calculatedFields.push('voltage');
        formulas.push('V = I × R');
      }
      if (calcP === null) {
        calcP = calcI * calcI * calcR;
        calculatedFields.push('power');
        formulas.push('P = I² × R');
      }
    }

    // If we have I and P, calculate V and R
    if (calcI !== null && calcP !== null && calcI !== 0) {
      if (calcV === null) {
        calcV = calcP / calcI;
        calculatedFields.push('voltage');
        formulas.push('V = P ÷ I');
      }
      if (calcR === null) {
        calcR = calcP / (calcI * calcI);
        calculatedFields.push('resistance');
        formulas.push('R = P ÷ I²');
      }
    }

    // If we have R and P, calculate V and I
    if (calcR !== null && calcP !== null && calcR !== 0) {
      if (calcV === null) {
        calcV = Math.sqrt(calcP * calcR);
        calculatedFields.push('voltage');
        formulas.push('V = √(P × R)');
      }
      if (calcI === null) {
        calcI = Math.sqrt(calcP / calcR);
        calculatedFields.push('current');
        formulas.push('I = √(P ÷ R)');
      }
    }

    if (calcV !== null && calcI !== null && calcR !== null && calcP !== null) {
      setResult({
        voltage: fromBaseUnit(calcV, voltageUnit, 'voltage'),
        current: fromBaseUnit(calcI, currentUnit, 'current'),
        resistance: fromBaseUnit(calcR, resistanceUnit, 'resistance'),
        power: fromBaseUnit(calcP, powerUnit, 'power'),
        voltageUnit,
        currentUnit,
        resistanceUnit,
        powerUnit,
        calculatedFields,
        formulas,
      });
    } else {
      setResult(null);
    }
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    if (autoCalculate) {
      calculateValues();
    }
  }, [voltage, current, resistance, power, voltageUnit, currentUnit, resistanceUnit, powerUnit]);

  const handleClear = () => {
    setVoltage('');
    setCurrent('');
    setResistance('');
    setPower('');
    setResult(null);
  };

  const formatNumber = (num: number): string => {
    if (Math.abs(num) < 0.0001 || Math.abs(num) >= 1e9) {
      return num.toExponential(4);
    }
    return num.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  const renderFraction = (numerator: string, denominator: string) => (
    <span className="inline-flex flex-col items-center mx-1">
      <span className="px-2 font-semibold text-base">{numerator}</span>
      <span className="w-full border-t-2 border-gray-900"></span>
      <span className="px-2 font-semibold text-base">{denominator}</span>
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-amber-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-amber-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Watt Calculator</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 mt-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mb-6 shadow-lg">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Watt Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate electrical power (watts), voltage (volts), current (amps), and resistance (ohms) using Ohm's Law. Enter any two values to find the others.
          </p>
        </div>

        {/* Calculator Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-center py-4 rounded-xl mb-6">
              <h2 className="text-2xl font-bold">Electrical Power Calculator</h2>
              <p className="text-amber-100 text-sm mt-1">Enter any 2 values to calculate the others</p>
            </div>

            {/* Input Fields */}
            <div className="space-y-6 mb-6">
              {/* Voltage */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="voltage" className="text-lg font-semibold text-gray-700">
                    Voltage (V)
                  </Label>
                </div>
                <div className="flex gap-2">
                  <Input
                    id="voltage"
                    type="number"
                    step="any"
                    value={voltage}
                    onChange={(e) => setVoltage(e.target.value)}
                    className={`flex-1 text-lg py-5 ${result?.calculatedFields.includes('voltage') ? 'bg-amber-50 border-amber-300' : ''}`}
                    placeholder="Enter voltage"
                  />
                  <Select value={voltageUnit} onValueChange={setVoltageUnit}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(voltageUnits).map(([key, { label }]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Current */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="current" className="text-lg font-semibold text-gray-700">
                    Current (I)
                  </Label>
                </div>
                <div className="flex gap-2">
                  <Input
                    id="current"
                    type="number"
                    step="any"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    className={`flex-1 text-lg py-5 ${result?.calculatedFields.includes('current') ? 'bg-amber-50 border-amber-300' : ''}`}
                    placeholder="Enter current"
                  />
                  <Select value={currentUnit} onValueChange={setCurrentUnit}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(currentUnits).map(([key, { label }]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Resistance */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="resistance" className="text-lg font-semibold text-gray-700">
                    Resistance (R)
                  </Label>
                </div>
                <div className="flex gap-2">
                  <Input
                    id="resistance"
                    type="number"
                    step="any"
                    value={resistance}
                    onChange={(e) => setResistance(e.target.value)}
                    className={`flex-1 text-lg py-5 ${result?.calculatedFields.includes('resistance') ? 'bg-amber-50 border-amber-300' : ''}`}
                    placeholder="Enter resistance"
                  />
                  <Select value={resistanceUnit} onValueChange={setResistanceUnit}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(resistanceUnits).map(([key, { label }]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Power */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="power" className="text-lg font-semibold text-gray-700">
                    Power (P)
                  </Label>
                </div>
                <div className="flex gap-2">
                  <Input
                    id="power"
                    type="number"
                    step="any"
                    value={power}
                    onChange={(e) => setPower(e.target.value)}
                    className={`flex-1 text-lg py-5 ${result?.calculatedFields.includes('power') ? 'bg-amber-50 border-amber-300' : ''}`}
                    placeholder="Enter power"
                  />
                  <Select value={powerUnit} onValueChange={setPowerUnit}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(powerUnits).map(([key, { label }]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
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
                onClick={calculateValues}
                className="flex-1 py-6 text-lg font-semibold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate
              </Button>
            </div>

            {/* Results Section */}
            {result && (
              <div className="border-2 border-amber-200 rounded-xl p-6 bg-gradient-to-br from-amber-50 to-orange-50">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Results:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`bg-white p-4 rounded-lg border-2 ${result.calculatedFields.includes('voltage') ? 'border-amber-400 shadow-md' : 'border-gray-200'}`}>
                    <div className="text-sm text-gray-500 mb-1">Voltage (V)</div>
                    <div className="text-xl font-bold text-amber-700">
                      {formatNumber(result.voltage)} {result.voltageUnit}
                    </div>
                    {result.calculatedFields.includes('voltage') && (
                      <div className="text-xs text-amber-600 mt-1">Calculated</div>
                    )}
                  </div>

                  <div className={`bg-white p-4 rounded-lg border-2 ${result.calculatedFields.includes('current') ? 'border-amber-400 shadow-md' : 'border-gray-200'}`}>
                    <div className="text-sm text-gray-500 mb-1">Current (I)</div>
                    <div className="text-xl font-bold text-amber-700">
                      {formatNumber(result.current)} {result.currentUnit}
                    </div>
                    {result.calculatedFields.includes('current') && (
                      <div className="text-xs text-amber-600 mt-1">Calculated</div>
                    )}
                  </div>

                  <div className={`bg-white p-4 rounded-lg border-2 ${result.calculatedFields.includes('resistance') ? 'border-amber-400 shadow-md' : 'border-gray-200'}`}>
                    <div className="text-sm text-gray-500 mb-1">Resistance (R)</div>
                    <div className="text-xl font-bold text-amber-700">
                      {formatNumber(result.resistance)} {result.resistanceUnit}
                    </div>
                    {result.calculatedFields.includes('resistance') && (
                      <div className="text-xs text-amber-600 mt-1">Calculated</div>
                    )}
                  </div>

                  <div className={`bg-white p-4 rounded-lg border-2 ${result.calculatedFields.includes('power') ? 'border-amber-400 shadow-md' : 'border-gray-200'}`}>
                    <div className="text-sm text-gray-500 mb-1">Power (P)</div>
                    <div className="text-xl font-bold text-amber-700">
                      {formatNumber(result.power)} {result.powerUnit}
                    </div>
                    {result.calculatedFields.includes('power') && (
                      <div className="text-xs text-amber-600 mt-1">Calculated</div>
                    )}
                  </div>
                </div>

                {/* Formulas Used */}
                {result.formulas.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-amber-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Formulas Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.formulas.map((formula, index) => (
                        <span key={index} className="bg-white px-3 py-1 rounded-full text-sm font-mono text-amber-700 border border-amber-300">
                          {formula}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Help text when not enough inputs */}
            {!result && (
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <Calculator className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Enter at least 2 values to calculate the others</p>
              </div>
            )}
          </div>
        </div>

        {/* Formula Reference Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-gray-900 to-amber-900 rounded-2xl shadow-xl p-6 md:p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Ohm's Law & Power Formulas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-amber-300 mb-4">Ohm's Law</h3>
                <div className="space-y-3 text-amber-50">
                  <p className="font-mono text-lg">V = I × R</p>
                  <p className="font-mono text-lg">I = V ÷ R</p>
                  <p className="font-mono text-lg">R = V ÷ I</p>
                </div>
              </div>

              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-amber-300 mb-4">Power Equations</h3>
                <div className="space-y-3 text-amber-50">
                  <p className="font-mono text-lg">P = V × I</p>
                  <p className="font-mono text-lg">P = I² × R</p>
                  <p className="font-mono text-lg">P = V² ÷ R</p>
                </div>
              </div>

              <div className="bg-white/10 p-6 rounded-xl md:col-span-2">
                <h3 className="text-xl font-bold text-amber-300 mb-4">Variable Definitions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-amber-50">
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-2xl font-bold">V</p>
                    <p className="text-sm">Voltage (Volts)</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-2xl font-bold">I</p>
                    <p className="text-sm">Current (Amps)</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-2xl font-bold">R</p>
                    <p className="text-sm">Resistance (Ohms)</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-2xl font-bold">P</p>
                    <p className="text-sm">Power (Watts)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="max-w-4xl mx-auto space-y-8 mb-12">
          {/* What is a Watt */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 text-amber-500" />
              What is a Watt?
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                A <strong>watt (W)</strong> is the SI unit of power, named after Scottish inventor James Watt. It measures the rate at which energy is transferred or converted. One watt is defined as <strong>one joule per second (J/s)</strong>, representing the rate of energy flow in an electrical circuit.
              </p>
              <p>
                In electrical terms, <strong>one watt equals the power produced when one ampere of current flows through a circuit with one volt of potential difference</strong>:
              </p>
              <div className="bg-amber-50 p-6 rounded-xl my-4">
                <div className="text-center text-2xl font-bold text-amber-700">
                  1 Watt = 1 Volt × 1 Ampere = 1 Joule/Second
                </div>
              </div>
              <p>
                Watts are used to measure power consumption in everyday appliances. For example:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>A typical LED bulb uses <strong>9-12 watts</strong></li>
                <li>A laptop charger typically uses <strong>45-65 watts</strong></li>
                <li>A microwave oven uses <strong>600-1200 watts</strong></li>
                <li>An electric heater uses <strong>1000-1500 watts</strong></li>
                <li>A hair dryer uses <strong>1000-2000 watts</strong></li>
              </ul>
            </div>
          </section>

          {/* Ohm's Law */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <CircuitBoard className="w-8 h-8 text-amber-500" />
              Understanding Ohm's Law
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                <strong>Ohm's Law</strong> is a fundamental principle in electrical engineering that describes the relationship between voltage, current, and resistance in an electrical circuit. Discovered by German physicist Georg Simon Ohm in 1827, it states:
              </p>
              <div className="bg-amber-50 p-6 rounded-xl my-4">
                <div className="flex items-center justify-center gap-2 text-xl flex-wrap">
                  <span className="font-bold text-amber-700">V = I × R</span>
                </div>
                <p className="text-center text-gray-600 mt-2">
                  Voltage equals Current times Resistance
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">The Three Forms of Ohm's Law</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                  <h4 className="font-bold text-blue-700 mb-2">Find Voltage</h4>
                  <p className="font-mono text-lg text-center">V = I × R</p>
                  <p className="text-sm text-gray-600 mt-2">Multiply current by resistance</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200">
                  <h4 className="font-bold text-green-700 mb-2">Find Current</h4>
                  <p className="font-mono text-lg text-center">I = V ÷ R</p>
                  <p className="text-sm text-gray-600 mt-2">Divide voltage by resistance</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl border-2 border-purple-200">
                  <h4 className="font-bold text-purple-700 mb-2">Find Resistance</h4>
                  <p className="font-mono text-lg text-center">R = V ÷ I</p>
                  <p className="text-sm text-gray-600 mt-2">Divide voltage by current</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Example Calculation</h3>
              <p>
                A circuit has a 12V battery and a resistance of 4Ω. What is the current?
              </p>
              <div className="bg-gray-100 p-4 rounded-lg my-3 space-y-2">
                <p className="font-mono">I = V ÷ R</p>
                <p className="font-mono">I = 12V ÷ 4Ω</p>
                <p className="font-mono font-bold">I = 3 Amperes</p>
              </div>
            </div>
          </section>

          {/* Power Formulas */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-amber-500" />
              Electrical Power Formulas
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Electrical power can be calculated using several formulas, depending on which values you know. These are derived from Ohm's Law combined with the basic power equation.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">The Power Triangle</h3>
              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div className="bg-amber-50 p-5 rounded-xl border-2 border-amber-200">
                  <h4 className="font-bold text-amber-700 mb-2 text-center">P = V × I</h4>
                  <p className="text-sm text-gray-600 text-center">Power = Voltage × Current</p>
                  <p className="text-xs text-gray-500 mt-2 text-center">Use when you know V and I</p>
                </div>
                <div className="bg-amber-50 p-5 rounded-xl border-2 border-amber-200">
                  <h4 className="font-bold text-amber-700 mb-2 text-center">P = I² × R</h4>
                  <p className="text-sm text-gray-600 text-center">Power = Current² × Resistance</p>
                  <p className="text-xs text-gray-500 mt-2 text-center">Use when you know I and R</p>
                </div>
                <div className="bg-amber-50 p-5 rounded-xl border-2 border-amber-200">
                  <h4 className="font-bold text-amber-700 mb-2 text-center">P = V² ÷ R</h4>
                  <p className="text-sm text-gray-600 text-center">Power = Voltage² ÷ Resistance</p>
                  <p className="text-xs text-gray-500 mt-2 text-center">Use when you know V and R</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Solved Examples</h3>

              <div className="bg-blue-50 p-6 rounded-xl mb-4">
                <h4 className="font-bold text-blue-700 mb-3">Example 1: Find Power from Voltage and Current</h4>
                <p className="mb-2">A 120V appliance draws 2A of current. What is the power consumption?</p>
                <div className="bg-white p-3 rounded-lg font-mono">
                  <p>P = V × I</p>
                  <p>P = 120V × 2A</p>
                  <p className="font-bold text-blue-700">P = 240 Watts</p>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-xl mb-4">
                <h4 className="font-bold text-green-700 mb-3">Example 2: Find Power from Current and Resistance</h4>
                <p className="mb-2">A circuit has 3A of current flowing through a 10Ω resistor. What power is dissipated?</p>
                <div className="bg-white p-3 rounded-lg font-mono">
                  <p>P = I² × R</p>
                  <p>P = 3² × 10</p>
                  <p>P = 9 × 10</p>
                  <p className="font-bold text-green-700">P = 90 Watts</p>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl">
                <h4 className="font-bold text-purple-700 mb-3">Example 3: Find Power from Voltage and Resistance</h4>
                <p className="mb-2">A 24V source is connected to a 6Ω resistor. What is the power?</p>
                <div className="bg-white p-3 rounded-lg font-mono">
                  <p>P = V² ÷ R</p>
                  <p>P = 24² ÷ 6</p>
                  <p>P = 576 ÷ 6</p>
                  <p className="font-bold text-purple-700">P = 96 Watts</p>
                </div>
              </div>
            </div>
          </section>

          {/* Unit Conversions */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Calculator className="w-8 h-8 text-amber-500" />
              Power Unit Conversions
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-amber-500 text-white">
                    <th className="p-4 text-left">Unit</th>
                    <th className="p-4 text-left">Symbol</th>
                    <th className="p-4 text-left">Equivalent in Watts</th>
                    <th className="p-4 text-left">Scientific Notation</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b bg-gray-50">
                    <td className="p-4">Picowatt</td>
                    <td className="p-4 font-mono">pW</td>
                    <td className="p-4">0.000000000001 W</td>
                    <td className="p-4 font-mono">10⁻¹² W</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Nanowatt</td>
                    <td className="p-4 font-mono">nW</td>
                    <td className="p-4">0.000000001 W</td>
                    <td className="p-4 font-mono">10⁻⁹ W</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4">Microwatt</td>
                    <td className="p-4 font-mono">μW</td>
                    <td className="p-4">0.000001 W</td>
                    <td className="p-4 font-mono">10⁻⁶ W</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Milliwatt</td>
                    <td className="p-4 font-mono">mW</td>
                    <td className="p-4">0.001 W</td>
                    <td className="p-4 font-mono">10⁻³ W</td>
                  </tr>
                  <tr className="border-b bg-amber-100 font-semibold">
                    <td className="p-4">Watt</td>
                    <td className="p-4 font-mono">W</td>
                    <td className="p-4">1 W</td>
                    <td className="p-4 font-mono">10⁰ W</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Kilowatt</td>
                    <td className="p-4 font-mono">kW</td>
                    <td className="p-4">1,000 W</td>
                    <td className="p-4 font-mono">10³ W</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4">Megawatt</td>
                    <td className="p-4 font-mono">MW</td>
                    <td className="p-4">1,000,000 W</td>
                    <td className="p-4 font-mono">10⁶ W</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Gigawatt</td>
                    <td className="p-4 font-mono">GW</td>
                    <td className="p-4">1,000,000,000 W</td>
                    <td className="p-4 font-mono">10⁹ W</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4">Terawatt</td>
                    <td className="p-4 font-mono">TW</td>
                    <td className="p-4">1,000,000,000,000 W</td>
                    <td className="p-4 font-mono">10¹² W</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Electric Horsepower</td>
                    <td className="p-4 font-mono">hp(E)</td>
                    <td className="p-4">746 W</td>
                    <td className="p-4 font-mono">7.46 × 10² W</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Practical Applications */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Battery className="w-8 h-8 text-amber-500" />
              Practical Applications
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-blue-700">Home Electrical</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Calculate power consumption of appliances to estimate electricity bills. A 100W bulb running for 10 hours uses 1 kWh (kilowatt-hour).
                </p>
                <p className="text-sm text-blue-600 font-semibold">
                  Energy (kWh) = Power (kW) × Time (hours)
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <Battery className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-green-700">Battery Systems</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Calculate watt-hours for battery capacity. A 12V battery with 100Ah capacity stores 1,200 Wh of energy.
                </p>
                <p className="text-sm text-green-600 font-semibold">
                  Wh = Voltage × Amp-hours
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-purple-700">Electronics Design</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Size power supplies and calculate heat dissipation in circuits. A resistor dissipating more than its rated power will overheat.
                </p>
                <p className="text-sm text-purple-600 font-semibold">
                  Power rating must exceed calculated P
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-orange-600" />
                  <h3 className="text-xl font-bold text-orange-700">Solar & Renewable</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Size solar panels and inverters based on power requirements. A 300W panel in 5 hours of sunlight produces 1,500 Wh daily.
                </p>
                <p className="text-sm text-orange-600 font-semibold">
                  Daily Energy = Panel Watts × Sun Hours
                </p>
              </div>
            </div>
          </section>

          {/* Watt-Hour Calculation */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Watts vs Watt-Hours: Understanding Energy</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                <strong>Watts (W)</strong> measure instantaneous power—the rate at which energy is used at any moment. <strong>Watt-hours (Wh)</strong> measure total energy consumed over time.
              </p>

              <div className="bg-amber-50 p-6 rounded-xl my-4">
                <h4 className="font-bold text-amber-700 mb-3">The Relationship</h4>
                <p className="text-center text-xl font-mono">Energy (Wh) = Power (W) × Time (hours)</p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Examples</h3>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>60W light bulb for 5 hours:</strong><br />
                  60W × 5h = 300 Wh = 0.3 kWh
                </li>
                <li>
                  <strong>1500W heater for 2 hours:</strong><br />
                  1500W × 2h = 3000 Wh = 3 kWh
                </li>
                <li>
                  <strong>Smartphone (5W) charging for 2 hours:</strong><br />
                  5W × 2h = 10 Wh = 0.01 kWh
                </li>
              </ul>

              <div className="bg-blue-50 p-6 rounded-xl mt-6">
                <h4 className="font-bold text-blue-700 mb-3">Electricity Cost Calculation</h4>
                <p className="mb-2">To calculate electricity cost:</p>
                <p className="font-mono text-center">Cost = kWh consumed × Price per kWh</p>
                <p className="mt-3 text-sm text-gray-600">
                  Example: Running a 1000W appliance for 5 hours at $0.12/kWh costs: 1kW × 5h × $0.12 = $0.60
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-amber-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How do I calculate watts from volts and amps?</h3>
                <p className="text-gray-700">
                  Multiply voltage by current: <strong>P = V × I</strong>. For example, a 120V device drawing 2 amps uses 120 × 2 = 240 watts.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What is the difference between watts and volts?</h3>
                <p className="text-gray-700">
                  <strong>Voltage (volts)</strong> is the electrical pressure or potential difference that pushes current through a circuit. <strong>Power (watts)</strong> is the rate at which energy is consumed or produced. Voltage is like water pressure; watts are like the flow rate.
                </p>
              </div>

              <div className="border-l-4 border-amber-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How many watts is 1 amp at 120 volts?</h3>
                <p className="text-gray-700">
                  Using P = V × I: 120V × 1A = <strong>120 watts</strong>. Similarly, at 240V, 1 amp equals 240 watts.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How do I convert watts to amps?</h3>
                <p className="text-gray-700">
                  Divide power by voltage: <strong>I = P ÷ V</strong>. A 1200W device at 120V draws 1200 ÷ 120 = 10 amps.
                </p>
              </div>

              <div className="border-l-4 border-amber-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What is 1 kilowatt equal to?</h3>
                <p className="text-gray-700">
                  1 kilowatt (kW) = <strong>1,000 watts</strong>. It's commonly used to measure larger power consumption like appliances and HVAC systems.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How do I calculate power in a resistor?</h3>
                <p className="text-gray-700">
                  Use any of these formulas: <strong>P = V × I</strong>, <strong>P = I² × R</strong>, or <strong>P = V² ÷ R</strong>. Choose based on which values you know.
                </p>
              </div>

              <div className="border-l-4 border-amber-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What is a gigawatt?</h3>
                <p className="text-gray-700">
                  1 gigawatt (GW) = <strong>1 billion watts (10⁹ W)</strong>. It's used to measure power plant output. For reference, the famous "1.21 gigawatts" from Back to the Future equals 1,210,000,000 watts.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How does resistance affect power?</h3>
                <p className="text-gray-700">
                  At constant voltage, <strong>lower resistance means higher power</strong> (P = V²/R). At constant current, <strong>higher resistance means higher power</strong> (P = I²R). This is why proper resistor sizing is critical in electronics.
                </p>
              </div>

              <div className="border-l-4 border-amber-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What is electric horsepower?</h3>
                <p className="text-gray-700">
                  Electric horsepower (hp(E)) = <strong>746 watts</strong>. It's used to rate electric motors. A 1 hp motor consumes approximately 746 watts of electrical power.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How do I size a power supply?</h3>
                <p className="text-gray-700">
                  Calculate total power needed by summing all component requirements, then add 20-30% headroom. For example, if components need 400W, choose at least a 500W power supply for safe operation.
                </p>
              </div>
            </div>
          </section>

          {/* Related Calculators */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Calculators</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/calculators/percentage-calculator" className="block p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl hover:shadow-md transition-shadow border border-amber-200">
                <h3 className="font-bold text-amber-700 mb-2">Percentage Calculator</h3>
                <p className="text-sm text-gray-600">Calculate percentages and percent changes</p>
              </Link>
              <Link href="/calculators/speed-distance-time-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-shadow border border-blue-200">
                <h3 className="font-bold text-blue-700 mb-2">Speed Distance Time Calculator</h3>
                <p className="text-sm text-gray-600">Calculate speed, distance, or time</p>
              </Link>
              <Link href="/calculators/basic-calculator" className="block p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl hover:shadow-md transition-shadow border border-gray-200">
                <h3 className="font-bold text-gray-700 mb-2">Basic Calculator</h3>
                <p className="text-sm text-gray-600">Simple arithmetic calculations</p>
              </Link>
            </div>
          </section>

          {/* Book Your Session CTA */}
          <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-2xl shadow-2xl p-8 text-white text-center">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Need Help with Physics or Electrical Concepts?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-blue-100 leading-relaxed">
              Our expert tutors can help you master Ohm's Law, electrical circuits, and all physics concepts with personalized one-on-one sessions tailored to your learning style.
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
