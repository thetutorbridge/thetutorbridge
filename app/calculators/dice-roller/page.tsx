'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Dices, Home, ArrowRight, Sparkles, RotateCw, Trash2, Plus, Minus, Info, TrendingUp, BookOpen } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
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

interface DiceRoll {
  id: number;
  diceType: string;
  numDice: number;
  modifier: number;
  rolls: number[];
  total: number;
  timestamp: Date;
}

const diceTypes = [
  { value: '4', label: 'd4 (Tetrahedron)', sides: 4 },
  { value: '6', label: 'd6 (Cube)', sides: 6 },
  { value: '8', label: 'd8 (Octahedron)', sides: 8 },
  { value: '10', label: 'd10 (Pentagonal Trapezohedron)', sides: 10 },
  { value: '12', label: 'd12 (Dodecahedron)', sides: 12 },
  { value: '20', label: 'd20 (Icosahedron)', sides: 20 },
  { value: '100', label: 'd100 (Percentile)', sides: 100 },
];

export default function DiceRoller() {
  const [selectedDice, setSelectedDice] = useState<string>('20');
  const [numDice, setNumDice] = useState<string>('1');
  const [modifier, setModifier] = useState<string>('0');
  const [customSides, setCustomSides] = useState<string>('');
  const [useCustom, setUseCustom] = useState<boolean>(false);

  const [currentRolls, setCurrentRolls] = useState<number[]>([]);
  const [currentTotal, setCurrentTotal] = useState<number>(0);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [rollHistory, setRollHistory] = useState<DiceRoll[]>([]);
  const [rollCount, setRollCount] = useState<number>(0);

  const rollDice = () => {
    const dice = parseInt(numDice);
    const sides = useCustom ? parseInt(customSides) : parseInt(selectedDice);
    const mod = parseInt(modifier) || 0;

    if (isNaN(dice) || dice < 1 || dice > 100) {
      alert('Please enter a valid number of dice (1-100)');
      return;
    }

    if (useCustom && (isNaN(sides) || sides < 2 || sides > 1000)) {
      alert('Please enter a valid number of sides (2-1000)');
      return;
    }

    setIsRolling(true);

    // Animate rolling
    let animationCount = 0;
    const animationInterval = setInterval(() => {
      const tempRolls = Array.from({ length: dice }, () =>
        Math.floor(Math.random() * sides) + 1
      );
      setCurrentRolls(tempRolls);
      animationCount++;

      if (animationCount >= 10) {
        clearInterval(animationInterval);

        // Final roll
        const finalRolls = Array.from({ length: dice }, () =>
          Math.floor(Math.random() * sides) + 1
        );
        const sum = finalRolls.reduce((acc, val) => acc + val, 0);
        const total = sum + mod;

        setCurrentRolls(finalRolls);
        setCurrentTotal(total);
        setIsRolling(false);

        // Add to history
        const newRoll: DiceRoll = {
          id: rollCount,
          diceType: useCustom ? `d${sides}` : `d${selectedDice}`,
          numDice: dice,
          modifier: mod,
          rolls: finalRolls,
          total: total,
          timestamp: new Date(),
        };

        setRollHistory(prev => [newRoll, ...prev].slice(0, 10));
        setRollCount(prev => prev + 1);
      }
    }, 50);
  };

  const clearHistory = () => {
    setRollHistory([]);
    setCurrentRolls([]);
    setCurrentTotal(0);
  };

  const getDiceColor = (sides: number) => {
    const colors: { [key: number]: string } = {
      4: 'from-yellow-500 to-amber-600',
      6: 'from-blue-500 to-indigo-600',
      8: 'from-green-500 to-emerald-600',
      10: 'from-purple-500 to-violet-600',
      12: 'from-red-500 to-rose-600',
      20: 'from-orange-500 to-red-600',
      100: 'from-pink-500 to-purple-600',
    };
    return colors[sides] || 'from-gray-500 to-slate-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-purple-600 transition-colors">
              <Home className="h-4 w-4" />
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-purple-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-purple-600 font-medium">Dice Roller</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <Dices className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Dice Roller
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Roll virtual dice online for D&D, tabletop RPGs, board games, and probability learning
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Dice Roller Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Dices className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Roll Dice</h2>
            </div>

            <div className="space-y-6">
              {/* Dice Type Toggle */}
              <div>
                <Label className="text-base font-semibold text-gray-700 mb-3 block">Dice Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setUseCustom(false)}
                    className={`py-3 px-4 rounded-xl font-medium transition-all ${
                      !useCustom
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Standard Dice
                  </button>
                  <button
                    onClick={() => setUseCustom(true)}
                    className={`py-3 px-4 rounded-xl font-medium transition-all ${
                      useCustom
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Custom Dice
                  </button>
                </div>
              </div>

              {/* Standard Dice Selection */}
              {!useCustom && (
                <div>
                  <Label htmlFor="diceType" className="text-base font-semibold text-gray-700 mb-3 block">
                    Select Dice
                  </Label>
                  <Select value={selectedDice} onValueChange={setSelectedDice}>
                    <SelectTrigger className="text-lg py-6">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {diceTypes.map((dice) => (
                        <SelectItem key={dice.value} value={dice.value} className="py-3">
                          <div className="font-semibold">{dice.label}</div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Custom Dice Sides */}
              {useCustom && (
                <div>
                  <Label htmlFor="customSides" className="text-base font-semibold text-gray-700 mb-3 block">
                    Number of Sides
                  </Label>
                  <Input
                    id="customSides"
                    type="number"
                    value={customSides}
                    onChange={(e) => setCustomSides(e.target.value)}
                    placeholder="Enter number of sides (2-1000)"
                    className="text-lg py-6"
                    min="2"
                    max="1000"
                  />
                </div>
              )}

              {/* Number of Dice */}
              <div>
                <Label htmlFor="numDice" className="text-base font-semibold text-gray-700 mb-3 block">
                  Number of Dice
                </Label>
                <Input
                  id="numDice"
                  type="number"
                  value={numDice}
                  onChange={(e) => setNumDice(e.target.value)}
                  placeholder="Enter number of dice (1-100)"
                  className="text-lg py-6"
                  min="1"
                  max="100"
                />
              </div>

              {/* Modifier */}
              <div>
                <Label htmlFor="modifier" className="text-base font-semibold text-gray-700 mb-3 block">
                  Modifier (Optional)
                </Label>
                <Input
                  id="modifier"
                  type="number"
                  value={modifier}
                  onChange={(e) => setModifier(e.target.value)}
                  placeholder="Add/subtract from total (e.g., +5 or -3)"
                  className="text-lg py-6"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Enter a positive or negative number to modify the total
                </p>
              </div>

              {/* Roll Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={rollDice}
                  disabled={isRolling}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {isRolling ? (
                    <>
                      <RotateCw className="mr-2 h-5 w-5 animate-spin" />
                      Rolling...
                    </>
                  ) : (
                    <>
                      <Dices className="mr-2 h-5 w-5" />
                      Roll Dice
                    </>
                  )}
                </Button>
                {rollHistory.length > 0 && (
                  <Button
                    onClick={clearHistory}
                    variant="outline"
                    className="px-6 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-red-50 hover:border-red-300"
                  >
                    <Trash2 className="h-5 w-5 text-red-600" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            {currentRolls.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Results</h2>
                </div>

                {/* Total */}
                <div className={`bg-gradient-to-br ${getDiceColor(useCustom ? parseInt(customSides) : parseInt(selectedDice))} rounded-2xl p-8 text-center shadow-lg`}>
                  <p className="text-white text-lg font-semibold mb-2">Total Result</p>
                  <p className="text-white text-6xl font-bold mb-2">{currentTotal}</p>
                  {parseInt(modifier) !== 0 && (
                    <p className="text-white text-sm opacity-90">
                      (Sum: {currentRolls.reduce((a, b) => a + b, 0)} {parseInt(modifier) >= 0 ? '+' : ''} {modifier})
                    </p>
                  )}
                </div>

                {/* Individual Rolls */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Individual Rolls</h3>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {currentRolls.map((roll, index) => (
                      <div
                        key={index}
                        className={`bg-gradient-to-br ${getDiceColor(useCustom ? parseInt(customSides) : parseInt(selectedDice))} rounded-xl p-4 flex items-center justify-center shadow-md transform transition-transform hover:scale-105`}
                      >
                        <span className="text-white text-2xl font-bold">{roll}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-6">
                  <div className="text-center">
                    <p className="text-gray-600 text-sm font-semibold mb-1">Average</p>
                    <p className="text-gray-900 text-2xl font-bold">
                      {(currentRolls.reduce((a, b) => a + b, 0) / currentRolls.length).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm font-semibold mb-1">Highest</p>
                    <p className="text-gray-900 text-2xl font-bold">
                      {Math.max(...currentRolls)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm font-semibold mb-1">Lowest</p>
                    <p className="text-gray-900 text-2xl font-bold">
                      {Math.min(...currentRolls)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm font-semibold mb-1">Sum</p>
                    <p className="text-gray-900 text-2xl font-bold">
                      {currentRolls.reduce((a, b) => a + b, 0)}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mb-6">
                  <Dices className="h-12 w-12 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to Roll!</h3>
                <p className="text-gray-600 max-w-sm">
                  Select your dice type, number of dice, and click Roll to get started
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Roll History */}
        {rollHistory.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Roll History</h2>
              </div>
              <span className="text-sm text-gray-500">Last 10 rolls</span>
            </div>

            <div className="space-y-3">
              {rollHistory.map((roll) => (
                <div key={roll.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-bold text-gray-900">
                          {roll.numDice}{roll.diceType}
                          {roll.modifier !== 0 && (
                            <span className="text-purple-600">
                              {roll.modifier > 0 ? '+' : ''}{roll.modifier}
                            </span>
                          )}
                        </span>
                        <span className="text-sm text-gray-500">
                          {roll.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 flex-wrap">
                        <span className="text-sm text-gray-600">Rolls:</span>
                        {roll.rolls.map((r, i) => (
                          <span key={i} className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm text-gray-600 mb-1">Total</p>
                      <p className="text-3xl font-bold text-purple-600">{roll.total}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Educational Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Dice and Probability</h2>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What is a Dice Roller?</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                A <strong>dice roller</strong> is a digital tool that simulates the random rolling of physical dice. Virtual dice rollers use pseudo-random number generation algorithms to produce results that closely approximate the randomness of actual dice, making them perfect for tabletop gaming, probability experiments, and educational purposes.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Unlike physical dice which can have manufacturing imperfections or wear over time, digital dice rollers provide consistent, unbiased randomness for every roll. This makes them ideal for online gaming, remote play sessions, and situations where physical dice aren't available.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Types of Polyhedral Dice</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Polyhedral dice are multi-sided dice commonly used in tabletop role-playing games like Dungeons & Dragons. Each die type represents a different platonic solid or geometric shape:
              </p>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 my-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Dice</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Geometric Shape</th>
                      <th className="text-center py-3 px-4 font-bold text-gray-900">Sides</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Common Uses</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-bold text-yellow-600">d4</td>
                      <td className="py-3 px-4">Tetrahedron</td>
                      <td className="text-center py-3 px-4 font-semibold">4</td>
                      <td className="py-3 px-4">Light damage, healing spells</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-bold text-blue-600">d6</td>
                      <td className="py-3 px-4">Cube</td>
                      <td className="text-center py-3 px-4 font-semibold">6</td>
                      <td className="py-3 px-4">Standard die, most board games</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-bold text-green-600">d8</td>
                      <td className="py-3 px-4">Octahedron</td>
                      <td className="text-center py-3 px-4 font-semibold">8</td>
                      <td className="py-3 px-4">Medium damage, weapon attacks</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-bold text-purple-600">d10</td>
                      <td className="py-3 px-4">Pentagonal Trapezohedron</td>
                      <td className="text-center py-3 px-4 font-semibold">10</td>
                      <td className="py-3 px-4">Percentile rolls (with d100)</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-bold text-red-600">d12</td>
                      <td className="py-3 px-4">Dodecahedron</td>
                      <td className="text-center py-3 px-4 font-semibold">12</td>
                      <td className="py-3 px-4">Heavy damage weapons</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-bold text-orange-600">d20</td>
                      <td className="py-3 px-4">Icosahedron</td>
                      <td className="text-center py-3 px-4 font-semibold">20</td>
                      <td className="py-3 px-4">Ability checks, attack rolls</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-pink-600">d100</td>
                      <td className="py-3 px-4">Two d10s (Percentile)</td>
                      <td className="text-center py-3 px-4 font-semibold">100</td>
                      <td className="py-3 px-4">Percentage-based outcomes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dice Probability and Statistics</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Understanding the probability of dice rolls is essential for gaming strategy and mathematical learning. The probability of rolling any specific number on a fair die is:
              </p>

              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200 my-4">
                <p className="font-semibold text-gray-900 mb-2">Probability Formula:</p>
                <div className="flex items-center justify-center my-4">
                  <div className="inline-flex flex-col items-center">
                    <span className="text-xl font-semibold px-3 pb-1">P(specific outcome) = </span>
                    <div className="inline-flex flex-col items-center mt-2">
                      <span className="text-xl font-semibold px-3 pb-1">1</span>
                      <span className="w-full border-t-2 border-gray-900"></span>
                      <span className="text-xl font-semibold px-3 pt-1">Number of sides</span>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="text-xl font-bold text-gray-900 mb-3">Probability for Common Dice:</h4>
              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h5 className="font-bold text-gray-900 mb-3">d6 (Standard Die)</h5>
                  <ul className="space-y-2 text-gray-700">
                    <li>• P(any specific number) = 1/6 ≈ 16.67%</li>
                    <li>• P(even number) = 3/6 = 50%</li>
                    <li>• P(number ≥ 4) = 3/6 = 50%</li>
                    <li>• Average roll = 3.5</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h5 className="font-bold text-gray-900 mb-3">d20 (D&D Standard)</h5>
                  <ul className="space-y-2 text-gray-700">
                    <li>• P(any specific number) = 1/20 = 5%</li>
                    <li>• P(natural 20 or 1) = 1/20 = 5%</li>
                    <li>• P(roll ≥ 10) = 11/20 = 55%</li>
                    <li>• Average roll = 10.5</li>
                  </ul>
                </div>
              </div>

              <h4 className="text-xl font-bold text-gray-900 mb-3">Multiple Dice Probability</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                When rolling multiple dice, the probability distribution changes. The sum of multiple dice follows a bell curve (normal distribution), with middle values being more likely than extreme values.
              </p>

              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200 my-4">
                <p className="font-semibold text-gray-900 mb-3">2d6 (Two Six-Sided Dice):</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Possible range: 2-12</li>
                  <li>• Most common result: 7 (probability = 6/36 ≈ 16.67%)</li>
                  <li>• P(rolling 2 or 12) = 1/36 ≈ 2.78% each</li>
                  <li>• Average roll: 7</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dice Notation in Gaming</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Tabletop games use a standardized notation system to describe dice rolls:
              </p>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 my-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Standard Notation Format:</h4>
                <div className="bg-white rounded-lg p-4 border-2 border-gray-300 mb-4">
                  <p className="font-mono text-xl text-center font-bold text-gray-900">
                    [Number of Dice]d[Sides] ± [Modifier]
                  </p>
                </div>

                <h5 className="font-bold text-gray-900 mb-3">Examples:</h5>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-2 px-3 font-bold text-gray-900">Notation</th>
                      <th className="text-left py-2 px-3 font-bold text-gray-900">Meaning</th>
                      <th className="text-left py-2 px-3 font-bold text-gray-900">Range</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-3 font-mono font-bold">1d20</td>
                      <td className="py-2 px-3">Roll one 20-sided die</td>
                      <td className="py-2 px-3">1-20</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-3 font-mono font-bold">3d6</td>
                      <td className="py-2 px-3">Roll three 6-sided dice and sum them</td>
                      <td className="py-2 px-3">3-18</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-3 font-mono font-bold">2d8+5</td>
                      <td className="py-2 px-3">Roll two 8-sided dice, sum, add 5</td>
                      <td className="py-2 px-3">7-21</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-3 font-mono font-bold">1d100</td>
                      <td className="py-2 px-3">Roll percentile dice (d100)</td>
                      <td className="py-2 px-3">1-100</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono font-bold">4d6-2</td>
                      <td className="py-2 px-3">Roll four 6-sided dice, sum, subtract 2</td>
                      <td className="py-2 px-3">2-22</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Common Uses for Dice Rollers</h3>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                  <h4 className="text-lg font-bold text-purple-900 mb-4 flex items-center">
                    <Dices className="h-5 w-5 mr-2" />
                    Tabletop Role-Playing Games
                  </h4>
                  <ul className="space-y-2 text-purple-800">
                    <li>• <strong>Dungeons & Dragons (D&D):</strong> Attack rolls, saving throws, ability checks</li>
                    <li>• <strong>Pathfinder:</strong> Skill checks, combat resolution</li>
                    <li>• <strong>Call of Cthulhu:</strong> Percentile-based skill tests</li>
                    <li>• <strong>Shadowrun:</strong> Multiple d6 dice pools</li>
                    <li>• <strong>Warhammer:</strong> Combat and magic resolution</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Board Games
                  </h4>
                  <ul className="space-y-2 text-blue-800">
                    <li>• <strong>Monopoly:</strong> Movement (2d6)</li>
                    <li>• <strong>Risk:</strong> Battle resolution</li>
                    <li>• <strong>Settlers of Catan:</strong> Resource production (2d6)</li>
                    <li>• <strong>Backgammon:</strong> Movement and strategy</li>
                    <li>• <strong>Yahtzee:</strong> Scoring combinations (5d6)</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                  <h4 className="text-lg font-bold text-green-900 mb-4 flex items-center">
                    <Info className="h-5 w-5 mr-2" />
                    Educational Applications
                  </h4>
                  <ul className="space-y-2 text-green-800">
                    <li>• <strong>Probability lessons:</strong> Teaching basic statistics</li>
                    <li>• <strong>Random sampling:</strong> Selecting students or items</li>
                    <li>• <strong>Math games:</strong> Addition, multiplication practice</li>
                    <li>• <strong>Decision making:</strong> Random group assignments</li>
                    <li>• <strong>Simulations:</strong> Demonstrating probability distributions</li>
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
                  <h4 className="text-lg font-bold text-orange-900 mb-4 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Other Uses
                  </h4>
                  <ul className="space-y-2 text-orange-800">
                    <li>• <strong>Random decisions:</strong> Making fair choices</li>
                    <li>• <strong>Character creation:</strong> RPG ability score generation</li>
                    <li>• <strong>Loot tables:</strong> Determining random rewards</li>
                    <li>• <strong>Random encounters:</strong> GM/DM tools</li>
                    <li>• <strong>Party games:</strong> Virtual dice for online play</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Physical vs. Virtual Dice</h3>

              <div className="overflow-x-auto my-6">
                <table className="w-full bg-gray-50 rounded-xl border border-gray-200">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Aspect</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Physical Dice</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Virtual Dice Roller</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Randomness</td>
                      <td className="py-3 px-4">True random, but affected by wear, balance issues</td>
                      <td className="py-3 px-4">Pseudo-random, mathematically fair</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Accessibility</td>
                      <td className="py-3 px-4">Requires physical set, can get lost</td>
                      <td className="py-3 px-4">Always available online or on devices</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Speed</td>
                      <td className="py-3 px-4">Manual rolling, counting takes time</td>
                      <td className="py-3 px-4">Instant results, automatic calculation</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Tactile Feel</td>
                      <td className="py-3 px-4">Satisfying physical interaction</td>
                      <td className="py-3 px-4">Visual/animation only</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">History Tracking</td>
                      <td className="py-3 px-4">Must record manually</td>
                      <td className="py-3 px-4">Automatic roll history and statistics</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Cost</td>
                      <td className="py-3 px-4">Purchase required, can be expensive</td>
                      <td className="py-3 px-4">Free online tools available</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">Best For</td>
                      <td className="py-3 px-4">In-person gaming, collectors</td>
                      <td className="py-3 px-4">Online play, quick calculations, learning</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Dice Fairness</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                A <strong>fair die</strong> is one where each outcome has an equal probability of occurring. For physical dice, achieving perfect fairness is challenging due to:
              </p>

              <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-300 my-6">
                <h4 className="text-lg font-bold text-yellow-900 mb-4">Factors Affecting Physical Dice Fairness:</h4>
                <ul className="space-y-2 text-yellow-900">
                  <li>• <strong>Manufacturing imperfections:</strong> Uneven weight distribution, air bubbles</li>
                  <li>• <strong>Wear and tear:</strong> Rounded corners from use affect rolling patterns</li>
                  <li>• <strong>Material density:</strong> Inconsistent materials create bias</li>
                  <li>• <strong>Number placement:</strong> Deep engravings can shift weight</li>
                  <li>• <strong>Surface texture:</strong> Affects how dice tumble and settle</li>
                </ul>
              </div>

              <h4 className="text-xl font-bold text-gray-900 mb-3">Testing Dice Fairness: The Float Test</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                To test if physical dice are fair, you can perform a <strong>float test</strong>:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>Fill a container with warm water</li>
                <li>Add salt gradually until the die floats (about 1/3 cup per cup of water)</li>
                <li>Spin the die in the water</li>
                <li>The same face consistently pointing up indicates an imbalance</li>
                <li>A fair die should have no consistent "up" face after multiple spins</li>
              </ol>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">D&D Ability Score Generation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                One of the most common uses for dice in tabletop gaming is generating character ability scores in Dungeons & Dragons. The standard method uses a specific dice formula:
              </p>

              <div className="bg-indigo-50 rounded-xl p-6 border-2 border-indigo-200 my-6">
                <h4 className="text-lg font-bold text-indigo-900 mb-4">4d6 Drop Lowest Method:</h4>
                <ol className="space-y-3 text-indigo-900">
                  <li className="flex items-start">
                    <span className="font-bold mr-2">1.</span>
                    <span>Roll four 6-sided dice (4d6)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">2.</span>
                    <span>Drop the lowest die from the four rolled</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">3.</span>
                    <span>Sum the remaining three dice</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">4.</span>
                    <span>Repeat six times for Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma</span>
                  </li>
                </ol>

                <div className="mt-4 bg-white rounded-lg p-4 border border-indigo-300">
                  <p className="font-semibold text-indigo-900 mb-2">Example:</p>
                  <p className="text-indigo-800 font-mono">
                    Roll: 5, 4, 3, 1 → Drop 1 → Sum: 5 + 4 + 3 = <strong className="text-2xl">12</strong>
                  </p>
                </div>

                <p className="text-sm text-indigo-800 mt-4">
                  This method produces ability scores ranging from 3 to 18, with an average around 12-13, making characters slightly above average.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Are online dice rollers truly random?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Online dice rollers use pseudo-random number generators (PRNGs) which are algorithmic and technically deterministic. However, modern PRNGs are cryptographically secure and produce results statistically indistinguishable from true randomness for all practical gaming and educational purposes. They're often more fair than physical dice which can have manufacturing imperfections.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">What does "critical hit" mean in dice rolling?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    In D&D and many RPGs, rolling a natural 20 (the maximum on a d20, without modifiers) is called a "critical hit" or "critical success." This typically means automatic success and often deals double damage in combat. Conversely, rolling a natural 1 is a "critical fail" or "critical miss," usually meaning automatic failure.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">How do percentile dice (d100) work?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Percentile dice are typically created by rolling two d10s together - one representing tens (00, 10, 20, ...90) and one representing ones (0-9). Rolling both gives you a result from 1-100. For example, rolling 30 on the tens die and 7 on the ones die gives you 37. Rolling 00 and 0 represents 100.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">What's the probability of rolling doubles with 2d6?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    With two six-sided dice, there are 36 possible outcomes (6 × 6). Doubles occur when both dice show the same number: (1,1), (2,2), (3,3), (4,4), (5,5), or (6,6). That's 6 favorable outcomes out of 36 total, giving a probability of 6/36 = 1/6 ≈ 16.67%.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Why is d20 the most popular RPG die?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    The d20 became standard in D&D's "d20 System" because 20 provides a good range for probability (5% increments), easily allows for modifiers without going out of range, and the icosahedron shape rolls well. Its 5% per-number probability makes it easy to calculate success chances and creates exciting uncertainty in gameplay.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Can I use this dice roller for online D&D sessions?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Absolutely! Virtual dice rollers are perfect for online tabletop gaming sessions via platforms like Roll20, Discord, or Zoom. The roll history feature lets you track and verify all rolls, and you can share your screen to show results to other players. Many online gaming groups prefer digital dice for their speed and automatic calculation.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">What's the average result when rolling multiple dice?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    The average roll for any die is (minimum + maximum) / 2. For multiple dice, multiply the average by the number of dice. For example: 1d6 averages 3.5, so 3d6 averages 10.5. Adding modifiers simply adds that number to the average (3d6+2 averages 12.5).
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">How do dice modifiers work in RPGs?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Modifiers are bonuses or penalties added to dice rolls, representing character abilities, equipment, or situational factors. For example, "1d20+5" means roll a 20-sided die and add 5 to the result. If you roll 14, your final result is 19. Negative modifiers work the same way: "2d6-2" means roll two dice, sum them, and subtract 2.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">What's the difference between advantage and disadvantage in D&D 5e?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    In D&D 5th Edition, <strong>advantage</strong> means you roll 2d20 and take the higher result, while <strong>disadvantage</strong> means roll 2d20 and take the lower result. Advantage increases your average roll from 10.5 to about 13.82, while disadvantage decreases it to about 7.18 - a significant mechanical difference that doesn't require complex modifier math.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Can teachers use this for classroom activities?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Yes! Dice rollers are excellent educational tools for teaching probability, statistics, addition, and multiplication. Teachers can use them for random student selection, creating math problems, demonstrating bell curves with multiple dice, or making learning games more interactive. The roll history feature helps track results for class experiments.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Whether you're a dungeon master running an epic D&D campaign, a board game enthusiast, a teacher demonstrating probability, or someone making a random decision, virtual dice rollers provide convenient, fair, and instant results. Understanding dice probability and notation enhances your gaming experience and mathematical literacy.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our dice roller supports all standard polyhedral dice types used in tabletop gaming, offers customizable options for any number of sides, includes modifiers for complex calculations, and tracks your roll history for reference. Roll the dice and let chance decide your fate!
              </p>
            </section>
          </article>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help with Probability and Statistics?
          </h2>
          <p className="text-xl mb-8 text-purple-50 max-w-3xl mx-auto">
            Our expert tutors can help you master probability, statistics, and game theory concepts using interactive examples
          </p>
          <Link href="/tutoring/free-consultation">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-6 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Book Your Free Session
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
