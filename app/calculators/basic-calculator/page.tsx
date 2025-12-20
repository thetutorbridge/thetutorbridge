'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, Home, CheckCircle, HelpCircle, Lightbulb, BookOpen, TrendingUp, Target, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';

export default function BasicCalculatorPage() {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);
  const [memory, setMemory] = useState<number>(0);
  const [history, setHistory] = useState<string[]>([]);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);

    if (previousValue !== null && !newNumber) {
      calculate();
    } else {
      setPreviousValue(current);
    }

    setOperation(op);
    setNewNumber(true);
  };

  const calculate = () => {
    if (previousValue === null || operation === null) return;

    const current = parseFloat(display);
    let result = 0;
    let calculation = '';

    switch (operation) {
      case '+':
        result = previousValue + current;
        calculation = `${previousValue} + ${current} = ${result}`;
        break;
      case '-':
        result = previousValue - current;
        calculation = `${previousValue} - ${current} = ${result}`;
        break;
      case '×':
        result = previousValue * current;
        calculation = `${previousValue} × ${current} = ${result}`;
        break;
      case '÷':
        if (current === 0) {
          setDisplay('Error');
          setPreviousValue(null);
          setOperation(null);
          setNewNumber(true);
          return;
        }
        result = previousValue / current;
        calculation = `${previousValue} ÷ ${current} = ${result}`;
        break;
      case 'x^y':
        result = Math.pow(previousValue, current);
        calculation = `${previousValue}^${current} = ${result}`;
        break;
    }

    setDisplay(result.toString());
    setHistory([calculation, ...history.slice(0, 9)]);
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentValue(0);
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDelete = () => {
    if (display === '0' || display === 'Error' || newNumber) {
      return;
    }
    if (display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleSquareRoot = () => {
    const value = parseFloat(display);
    if (value < 0) {
      setDisplay('Error');
    } else {
      const result = Math.sqrt(value);
      setDisplay(result.toString());
      setHistory([`√${value} = ${result}`, ...history.slice(0, 9)]);
    }
    setNewNumber(true);
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    const result = value / 100;
    setDisplay(result.toString());
    setNewNumber(true);
  };

  const handlePlusMinus = () => {
    const value = parseFloat(display);
    setDisplay((-value).toString());
  };

  const handlePi = () => {
    setDisplay(Math.PI.toString());
    setNewNumber(true);
  };

  const handleMemoryClear = () => {
    setMemory(0);
  };

  const handleMemoryRecall = () => {
    setDisplay(memory.toString());
    setNewNumber(true);
  };

  const handleMemoryAdd = () => {
    setMemory(memory + parseFloat(display));
  };

  const handleMemorySubtract = () => {
    setMemory(memory - parseFloat(display));
  };

  const ButtonCalc = ({ children, onClick, className = '', variant = 'default' }: any) => {
    const baseClass = "h-16 text-xl font-semibold rounded-lg transition-all active:scale-95";
    const variantClass = variant === 'number' ? 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200' :
                        variant === 'operation' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold' :
                        variant === 'special' ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' :
                        'bg-gray-200 hover:bg-gray-300 text-gray-700';

    return (
      <button
        onClick={onClick}
        className={`${baseClass} ${variantClass} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <>
      <Navigation />
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 min-h-screen">
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
                  Basic Calculator - Free Online Scientific Calculator
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl">
                  Free online calculator with memory functions, square root, percentage, and all basic arithmetic operations. Perfect for students, professionals, and quick calculations on the go.
                </p>
              </div>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                <Calculator className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {/* Left Column - Calculator */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-8 lg:p-10">
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white text-center py-4 rounded-lg mb-6">
                  <h2 className="text-xl md:text-2xl font-bold">Calculator</h2>
                </div>

                {/* Calculator Display */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-xl mb-6 border-4 border-gray-300 shadow-inner">
                  <div className="bg-gradient-to-r from-green-900 to-green-800 text-right p-6 rounded-lg mb-2">
                    <div className="text-green-400 text-sm mb-1 font-mono h-5">
                      {operation && previousValue !== null ? `${previousValue} ${operation}` : ' '}
                    </div>
                    <div className="text-green-100 text-4xl md:text-5xl font-bold font-mono break-all">
                      {display}
                    </div>
                  </div>
                  {memory !== 0 && (
                    <div className="text-xs text-gray-600 text-right">Memory: {memory}</div>
                  )}
                </div>

                {/* Calculator Buttons */}
                <div className="grid grid-cols-4 gap-2 md:gap-3">
                  {/* Memory Row */}
                  <ButtonCalc onClick={handleMemoryClear} variant="special">mc</ButtonCalc>
                  <ButtonCalc onClick={handleMemoryRecall} variant="special">mr</ButtonCalc>
                  <ButtonCalc onClick={handleMemorySubtract} variant="special">m-</ButtonCalc>
                  <ButtonCalc onClick={handleMemoryAdd} variant="special">m+</ButtonCalc>

                  {/* Function Row */}
                  <ButtonCalc onClick={handleClear} variant="special">AC</ButtonCalc>
                  <ButtonCalc onClick={handleDelete} variant="special">DEL</ButtonCalc>
                  <ButtonCalc onClick={handlePercentage} variant="special">%</ButtonCalc>
                  <ButtonCalc onClick={() => handleOperation('÷')} variant="operation">÷</ButtonCalc>

                  {/* Number Rows */}
                  <ButtonCalc onClick={() => handleNumber('7')} variant="number">7</ButtonCalc>
                  <ButtonCalc onClick={() => handleNumber('8')} variant="number">8</ButtonCalc>
                  <ButtonCalc onClick={() => handleNumber('9')} variant="number">9</ButtonCalc>
                  <ButtonCalc onClick={() => handleOperation('×')} variant="operation">×</ButtonCalc>

                  <ButtonCalc onClick={() => handleNumber('4')} variant="number">4</ButtonCalc>
                  <ButtonCalc onClick={() => handleNumber('5')} variant="number">5</ButtonCalc>
                  <ButtonCalc onClick={() => handleNumber('6')} variant="number">6</ButtonCalc>
                  <ButtonCalc onClick={() => handleOperation('-')} variant="operation">-</ButtonCalc>

                  <ButtonCalc onClick={() => handleNumber('1')} variant="number">1</ButtonCalc>
                  <ButtonCalc onClick={() => handleNumber('2')} variant="number">2</ButtonCalc>
                  <ButtonCalc onClick={() => handleNumber('3')} variant="number">3</ButtonCalc>
                  <ButtonCalc onClick={() => handleOperation('+')} variant="operation">+</ButtonCalc>

                  <ButtonCalc onClick={() => handleNumber('0')} variant="number">0</ButtonCalc>
                  <ButtonCalc onClick={handleDecimal} variant="number">.</ButtonCalc>
                  <ButtonCalc onClick={handlePlusMinus} variant="number">+/-</ButtonCalc>
                  <ButtonCalc onClick={calculate} variant="operation">=</ButtonCalc>

                  {/* Advanced Functions Row */}
                  <ButtonCalc onClick={handlePi} variant="special">π</ButtonCalc>
                  <ButtonCalc onClick={() => handleOperation('x^y')} variant="special">x<sup>y</sup></ButtonCalc>
                  <ButtonCalc onClick={handleSquareRoot} variant="special">√x</ButtonCalc>
                  <ButtonCalc onClick={() => {
                    const value = parseFloat(display);
                    setDisplay((value * value).toString());
                    setNewNumber(true);
                  }} variant="special">x²</ButtonCalc>
                </div>

                {/* Calculation History */}
                {history.length > 0 && (
                  <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200">
                    <h3 className="font-bold text-lg mb-3 text-[#1A3D7C] flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-[#2BAE66]" />
                      Calculation History:
                    </h3>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                      {history.map((calc, index) => (
                        <div key={index} className="text-gray-700 font-mono text-sm bg-white p-2 rounded">
                          {calc}
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() => setHistory([])}
                      variant="outline"
                      className="mt-3 w-full text-sm"
                    >
                      Clear History
                    </Button>
                  </div>
                )}

                {/* Info Display */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-[#2BAE66]/20">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-base md:text-lg">
                    <HelpCircle className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    Quick Guide
                  </h3>
                  <ul className="space-y-2 text-sm md:text-base text-gray-700">
                    <li>✓ <strong>MC:</strong> Clear memory</li>
                    <li>✓ <strong>MR:</strong> Recall memory value</li>
                    <li>✓ <strong>M-:</strong> Subtract current value from memory</li>
                    <li>✓ <strong>M+:</strong> Add current value to memory</li>
                    <li>✓ <strong>AC:</strong> Clear all (All Clear)</li>
                    <li>✓ <strong>DEL:</strong> Delete last digit (backspace)</li>
                    <li>✓ <strong>√x:</strong> Square root of current value</li>
                    <li>✓ <strong>%:</strong> Convert to percentage (divide by 100)</li>
                    <li>✓ <strong>+/-:</strong> Toggle positive/negative</li>
                    <li>✓ <strong>π:</strong> Insert value of Pi (3.14159...)</li>
                    <li>✓ <strong>x^y:</strong> Raise x to power of y</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Quick Reference */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 text-white sticky top-6">
                <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3" />
                  Features
                </h2>

                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="font-semibold text-[#FFC857] mb-2">Basic Operations</h3>
                    <ul className="text-sm space-y-1">
                      <li>+ Addition</li>
                      <li>- Subtraction</li>
                      <li>× Multiplication</li>
                      <li>÷ Division</li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="font-semibold text-[#FFC857] mb-2">Scientific Functions</h3>
                    <ul className="text-sm space-y-1">
                      <li>√ Square Root</li>
                      <li>x² Square</li>
                      <li>x^y Power</li>
                      <li>1/x Reciprocal</li>
                      <li>π Pi constant</li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="font-semibold text-[#FFC857] mb-2">Memory Functions</h3>
                    <ul className="text-sm space-y-1">
                      <li>MC - Clear memory</li>
                      <li>MR - Recall memory</li>
                      <li>M+ - Add to memory</li>
                      <li>M- - Subtract from memory</li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="font-semibold text-[#FFC857] mb-2">Special Features</h3>
                    <ul className="text-sm space-y-1">
                      <li>✓ Calculation History</li>
                      <li>✓ Percentage Function</li>
                      <li>✓ Decimal Support</li>
                      <li>✓ Error Handling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections - Comprehensive SEO Content */}
          <div className="mt-12 md:mt-16 space-y-8 md:space-y-12">
            {/* What is a Basic Calculator */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                What is a Basic Calculator?
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  A <strong>basic calculator</strong> is an essential mathematical tool that performs fundamental arithmetic operations including addition, subtraction, multiplication, and division. Modern basic calculators have evolved to include scientific functions like square root, percentage calculations, memory storage, and power operations, making them versatile tools for everyday calculations.
                </p>
                <p>
                  Our <strong>free online calculator</strong> combines the simplicity of a basic calculator with advanced features typically found in scientific calculators. It features a digital display, number pad (0-9), decimal point support, memory functions (MC, MR, M+, M-), and special operations including square root (√), percentage (%), pi (π), power functions (x^y, x²), and reciprocal (1/x).
                </p>
                <p>
                  Unlike traditional physical calculators, our web-based calculator is accessible from any device - desktop computer, laptop, tablet, or smartphone. It requires no installation, works offline after initial load, and automatically saves your calculation history. Whether you're a student checking homework, a professional doing quick business calculations, or anyone needing fast arithmetic solutions, this calculator provides instant, accurate results with a user-friendly interface.
                </p>
                <p>
                  The calculator includes intelligent error handling for operations like division by zero and square roots of negative numbers, ensuring reliable operation. The calculation history feature allows you to review previous operations, making it perfect for budgeting, shopping calculations, recipe conversions, and academic work where you need to track multiple calculations.
                </p>
              </div>
            </section>

            {/* How to Use the Calculator */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                How to Use the Online Calculator
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    Basic Arithmetic Operations
                  </h3>
                  <ol className="text-gray-700 space-y-2 list-decimal list-inside">
                    <li>Click number buttons to enter your first number</li>
                    <li>Click an operation button (+, -, ×, ÷)</li>
                    <li>Enter the second number</li>
                    <li>Press = to see the result</li>
                    <li>Use AC (All Clear) to start a new calculation</li>
                  </ol>
                  <div className="bg-white p-3 rounded mt-4">
                    <p className="text-sm font-semibold text-[#1A3D7C]">Example: 25 + 17</p>
                    <p className="text-sm">Click: 2 → 5 → + → 1 → 7 → =</p>
                    <p className="text-sm text-[#2BAE66]">Result: 42</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    Memory Functions
                  </h3>
                  <ul className="text-gray-700 space-y-2">
                    <li><strong>M+:</strong> Add displayed value to memory</li>
                    <li><strong>M-:</strong> Subtract displayed value from memory</li>
                    <li><strong>MR:</strong> Recall (display) stored memory value</li>
                    <li><strong>MC:</strong> Clear memory (set to zero)</li>
                  </ul>
                  <div className="bg-white p-3 rounded mt-4">
                    <p className="text-sm font-semibold text-[#1A3D7C]">Memory Example:</p>
                    <p className="text-sm">Calculate: 15, press M+</p>
                    <p className="text-sm">Calculate: 8, press M+</p>
                    <p className="text-sm">Press MR</p>
                    <p className="text-sm text-[#2BAE66]">Shows: 23 (sum in memory)</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    Scientific Functions
                  </h3>
                  <ul className="text-gray-700 space-y-2">
                    <li><strong>√x:</strong> Calculate square root of displayed number</li>
                    <li><strong>%:</strong> Convert to percentage (divide by 100)</li>
                    <li><strong>π:</strong> Insert Pi value (3.14159265...)</li>
                    <li><strong>x²:</strong> Square the displayed number</li>
                    <li><strong>x^y:</strong> Raise x to the power of y</li>
                    <li><strong>1/x:</strong> Calculate reciprocal (1 divided by x)</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-red-50 p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    Special Operations
                  </h3>
                  <ul className="text-gray-700 space-y-2">
                    <li><strong>Decimal Point (.):</strong> Enter decimal numbers like 3.14</li>
                    <li><strong>+/-:</strong> Toggle between positive and negative</li>
                    <li><strong>AC:</strong> Clear everything and start fresh</li>
                    <li><strong>History:</strong> View and review previous calculations</li>
                  </ul>
                  <div className="bg-white p-3 rounded mt-4">
                    <p className="text-sm font-semibold text-[#1A3D7C]">Power Example:</p>
                    <p className="text-sm">Calculate: 2³ (2 to the power of 3)</p>
                    <p className="text-sm">Click: 2 → x^y → 3 → =</p>
                    <p className="text-sm text-[#2BAE66]">Result: 8</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <Target className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Why Use Our Online Calculator?
              </h2>
              <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      100% Free & No Installation
                    </h3>
                    <p className="text-white/90">
                      Completely free online calculator that works directly in your web browser. No downloads, no installation, no registration required. Access from any device with internet connection - desktop, laptop, tablet, or smartphone.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Scientific Calculator Features
                    </h3>
                    <p className="text-white/90">
                      Beyond basic arithmetic, includes square root, power functions, percentage calculations, pi constant, reciprocal, and memory storage. Perfect for students, professionals, and everyday calculations requiring more than simple math.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Calculation History Tracking
                    </h3>
                    <p className="text-white/90">
                      Automatically saves your recent calculations so you can review previous operations. Great for double-checking work, budgeting, expense tracking, and academic assignments where you need to show your calculation process.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Mobile-Optimized Design
                    </h3>
                    <p className="text-white/90">
                      Fully responsive design works perfectly on all screen sizes. Large, touch-friendly buttons make it easy to use on smartphones and tablets. The calculator adapts to your device for optimal user experience.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Fast & Accurate Results
                    </h3>
                    <p className="text-white/90">
                      Instant calculations with high precision. Built using modern JavaScript for reliable, fast computation. Handles decimals, large numbers, and complex operations without errors or delays. Results appear immediately.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Memory Functions
                    </h3>
                    <p className="text-white/90">
                      Store intermediate results with M+, M-, MR, and MC buttons. Perfect for multi-step calculations where you need to save values temporarily. Essential for accounting, budgeting, and complex mathematical problems.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Real-World Use Cases */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                Real-World Calculator Applications
              </h2>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    📚 Student & Homework Help
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Use Case:</strong> Verify math homework answers, solve algebra problems, calculate fractions, percentages, and square roots. The history feature helps track all steps for showing work on assignments.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Example:</strong> Calculate average of test scores: 85, 92, 78, 88. Use M+ to add each score to memory (total: 343), then divide by 4.
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    Result: 343 ÷ 4 = 85.75 (average score)
                  </p>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    🛒 Shopping & Budget Calculations
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Use Case:</strong> Calculate shopping totals, compare prices, determine discounts, split bills with friends, and track expenses. Memory functions help sum multiple items.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Example:</strong> Item costs $45, on sale for 30% off. Calculate: 45 × 30 % = 13.50 (discount). Then: 45 - 13.50 = 31.50
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    Final Price: $31.50 (saved $13.50)
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    💼 Business & Finance
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Use Case:</strong> Calculate profit margins, tax amounts, currency conversions, salary calculations, invoice totals, and percentage changes in sales or stock prices.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Example:</strong> Product costs $200 to make, selling for $350. Profit margin: (350-200)÷350×100 = 150÷350×100 = 42.86%
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    Profit Margin: 42.86%
                  </p>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    🏠 Home & DIY Projects
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Use Case:</strong> Calculate room dimensions, paint needed, material costs, recipe conversions, tip amounts at restaurants, and household budget tracking.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Example:</strong> Room is 12 feet × 15 feet. One gallon of paint covers 350 sq ft. Area: 12×15=180. Gallons needed: 180÷350=0.51
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    Need: 1 gallon of paint (rounded up)
                  </p>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    🔬 Science & Engineering
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Use Case:</strong> Physics calculations (force, velocity, energy), chemistry measurements, engineering conversions, statistical calculations, and scientific notation.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Example:</strong> Calculate area of circle with radius 7cm. Formula: A = πr². Calculation: π × 7²  = 3.14159 × 49
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    Area: 153.94 cm²
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    💪 Health & Fitness
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Use Case:</strong> Calculate BMI, calorie tracking, macro percentages, workout progress, weight conversions (kg to lbs), and fitness goal tracking.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Example:</strong> Convert weight: 70 kg to pounds. Formula: kg × 2.205. Calculation: 70 × 2.205
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    Weight: 154.35 pounds
                  </p>
                </div>
              </div>
            </section>

            {/* Calculator Functions Guide */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                Complete Calculator Functions Guide
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
                      <th className="border border-gray-300 p-3 text-left">Button</th>
                      <th className="border border-gray-300 p-3 text-left">Function</th>
                      <th className="border border-gray-300 p-3 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">0-9</td>
                      <td className="border border-gray-300 p-3">Number input buttons</td>
                      <td className="border border-gray-300 p-3">Press 1, 2, 3 to enter 123</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">+</td>
                      <td className="border border-gray-300 p-3">Addition</td>
                      <td className="border border-gray-300 p-3">25 + 17 = 42</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">-</td>
                      <td className="border border-gray-300 p-3">Subtraction</td>
                      <td className="border border-gray-300 p-3">50 - 23 = 27</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">×</td>
                      <td className="border border-gray-300 p-3">Multiplication</td>
                      <td className="border border-gray-300 p-3">12 × 8 = 96</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">÷</td>
                      <td className="border border-gray-300 p-3">Division</td>
                      <td className="border border-gray-300 p-3">144 ÷ 12 = 12</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">=</td>
                      <td className="border border-gray-300 p-3">Calculate result</td>
                      <td className="border border-gray-300 p-3">Complete operation</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">AC</td>
                      <td className="border border-gray-300 p-3">All Clear - reset calculator</td>
                      <td className="border border-gray-300 p-3">Clear everything</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">DEL</td>
                      <td className="border border-gray-300 p-3">Delete last digit (backspace)</td>
                      <td className="border border-gray-300 p-3">123 → DEL → 12</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">.</td>
                      <td className="border border-gray-300 p-3">Decimal point</td>
                      <td className="border border-gray-300 p-3">3.14, 0.5, 99.99</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">+/-</td>
                      <td className="border border-gray-300 p-3">Toggle positive/negative</td>
                      <td className="border border-gray-300 p-3">5 → -5 or -5 → 5</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">%</td>
                      <td className="border border-gray-300 p-3">Convert to percentage</td>
                      <td className="border border-gray-300 p-3">50% → 0.5</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">√x</td>
                      <td className="border border-gray-300 p-3">Square root</td>
                      <td className="border border-gray-300 p-3">√64 = 8</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">x²</td>
                      <td className="border border-gray-300 p-3">Square (multiply by itself)</td>
                      <td className="border border-gray-300 p-3">5² = 25</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">x^y</td>
                      <td className="border border-gray-300 p-3">Power (x to the power of y)</td>
                      <td className="border border-gray-300 p-3">2^8 = 256</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">1/x</td>
                      <td className="border border-gray-300 p-3">Reciprocal (1 divided by x)</td>
                      <td className="border border-gray-300 p-3">1/4 = 0.25</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">π</td>
                      <td className="border border-gray-300 p-3">Pi constant</td>
                      <td className="border border-gray-300 p-3">3.141592653589793</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">MC</td>
                      <td className="border border-gray-300 p-3">Memory Clear</td>
                      <td className="border border-gray-300 p-3">Set memory to 0</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">MR</td>
                      <td className="border border-gray-300 p-3">Memory Recall</td>
                      <td className="border border-gray-300 p-3">Display stored value</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">M+</td>
                      <td className="border border-gray-300 p-3">Memory Add</td>
                      <td className="border border-gray-300 p-3">Add current to memory</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">M-</td>
                      <td className="border border-gray-300 p-3">Memory Subtract</td>
                      <td className="border border-gray-300 p-3">Subtract current from memory</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQs Section */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Is this calculator completely free to use?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Yes, this online calculator is 100% free with no hidden costs, registration requirements, or trial periods. You can use it unlimited times from any device. No downloads or installations needed - it works directly in your web browser on desktop, mobile, or tablet.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Does this work on mobile phones and tablets?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Absolutely! The calculator is fully responsive and optimized for all screen sizes. The buttons are large and touch-friendly for easy use on smartphones and tablets. It works on iOS (iPhone/iPad), Android devices, and all modern mobile browsers without any issues.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How do I use the memory functions (MC, MR, M+, M-)?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    <strong>M+</strong> adds the current display to memory. <strong>M-</strong> subtracts it from memory. <strong>MR</strong> recalls (shows) the stored memory value. <strong>MC</strong> clears memory. Example: Calculate 15 + 8 = 23, press M+. Calculate 10 × 2 = 20, press M+. Now press MR to see total: 43 (23+20).
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    What is the difference between AC and DEL?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    <strong>AC (All Clear)</strong> resets the entire calculator - clearing the display, operations, and previous values. It's like starting completely fresh. <strong>DEL (Delete)</strong> removes only the last digit you entered, perfect for fixing typos without clearing everything. Example: If you entered 1234 by mistake instead of 123, press DEL once to remove the 4.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How do I calculate percentages?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    The <strong>% button</strong> converts the displayed number to decimal by dividing by 100. For discounts: Calculate 200 × 20 = 4000, press % to get 40 (20% of 200). For percentage of a number: Enter the number, press ×, enter percentage, press =, then %. Example: What is 15% of 80? → 80 × 15 = 1200, press % → 12.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Can I use keyboard shortcuts?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Currently, this calculator is designed for mouse/touch input. You can click the on-screen buttons with your mouse or tap them on touch devices. Keyboard support may be added in future updates. For now, the large clickable buttons provide easy, accurate input.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    What does the x^y button do?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    <strong>x^y</strong> calculates "x to the power of y" or exponentiation. Enter the base number (x), press x^y, enter the exponent (y), then press =. Example: To calculate 2³ (2 cubed): Press 2 → x^y → 3 → = → Result: 8. For 5² (5 squared), you can also use the x² button directly.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Why does division by zero show "Error"?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Division by zero is mathematically undefined and would result in infinity or error. When you try to divide any number by 0, the calculator displays "Error" to prevent incorrect results. Press AC to clear the error and start a new calculation. This is standard behavior for all calculators.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How accurate are the calculations?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    The calculator uses JavaScript's double-precision floating-point arithmetic, which provides accuracy up to about 15-17 significant digits. This is more than sufficient for everyday calculations, homework, business math, and most scientific purposes. For extremely high-precision requirements (like cryptography), specialized tools would be needed.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Can I see my previous calculations?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Yes! The calculator automatically saves a <strong>calculation history</strong> showing your last 10 operations. Each completed calculation (after pressing =) is added to the history below the calculator. You can review previous results and clear the history with the "Clear History" button.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    What is the square root (√x) function?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    The <strong>√x button</strong> calculates the square root of the displayed number. Square root finds the value that, when multiplied by itself, equals the original number. Example: √64 = 8 (because 8 × 8 = 64). The calculator will show "Error" if you try to take the square root of a negative number.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How do I calculate compound operations like (5+3)×2?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    For compound operations, calculate step by step: First do 5 + 3 = 8. Then multiply 8 × 2 = 16. Alternatively, use <strong>memory</strong>: Calculate 5 + 3 = 8, press M+ to store. Clear display (AC), enter 2, then press × then MR to recall 8, finally press = for the result 16.
                  </p>
                </div>
              </div>
            </section>

            {/* Smart Tips Section */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Calculator Tips & Tricks
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-gray-200">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Use Memory for Running Totals:</strong> Shopping? Press M+ after each item price to keep a running total. When done, press MR to see your total cart value. Much faster than adding everything at once. Remember to press MC before starting a new shopping trip.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Quick Percentage Calculations:</strong> To find what percentage one number is of another, divide and multiply by 100. Example: What % is 45 of 180? → 45 ÷ 180 = 0.25, then × 100 = 25%. Or use: 45 ÷ 180 = 0.25, showing 25% directly.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Calculate Tips Easily:</strong> For a 20% tip on a $45 bill: 45 × 20 = 900, then press % to get 9 (the tip amount). For total: 45 + 9 = 54. For 15% tip: 45 × 15 %, then + 45 =. Quick restaurant math!
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Use Square for Area Calculations:</strong> Finding area of a square? Enter one side length and press x². Example: Square with 12-foot sides → 12, press x² → 144 sq ft. For circles, multiply radius by itself (x²), then × π for area.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Chain Calculations Without Clearing:</strong> After pressing =, the result stays in the calculator. You can immediately start another operation (+, -, ×, ÷) to continue calculating with that result. No need to re-enter the number. Great for sequential calculations.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Double-Check with Inverse Operations:</strong> Verify division with multiplication: 144 ÷ 12 = 12. Check: 12 × 12 = 144 ✓. Verify subtraction with addition: 100 - 37 = 63. Check: 63 + 37 = 100 ✓. This catches input errors.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Use Reciprocal (1/x) for Division:</strong> Instead of dividing by a number, multiply by its reciprocal. Example: Instead of 100 ÷ 4, you can do 4, press 1/x (gives 0.25), then × 100 = 25. Useful when the divisor is easier to remember than the dividend.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Reference Calculation History:</strong> Made an error but need a previous result? Check the calculation history below the calculator instead of recalculating. The history shows your last 10 operations with complete calculations - perfect for catching where you went wrong.
                    </p>
                  </li>
                </ul>
              </div>
            </section>

            {/* Calculator vs Traditional */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                Online Calculator vs. Physical Calculator
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
                      <th className="border border-gray-300 p-3 text-left">Feature</th>
                      <th className="border border-gray-300 p-3 text-left">Online Calculator</th>
                      <th className="border border-gray-300 p-3 text-left">Physical Calculator</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">Cost</td>
                      <td className="border border-gray-300 p-3 text-green-700">✓ Free</td>
                      <td className="border border-gray-300 p-3 text-orange-700">$10-$100+</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">Accessibility</td>
                      <td className="border border-gray-300 p-3 text-green-700">✓ Any device, anywhere</td>
                      <td className="border border-gray-300 p-3 text-orange-700">Must carry with you</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">Battery</td>
                      <td className="border border-gray-300 p-3 text-green-700">✓ No batteries needed</td>
                      <td className="border border-gray-300 p-3 text-orange-700">Requires batteries</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">Display Size</td>
                      <td className="border border-gray-300 p-3 text-green-700">✓ Large, scalable</td>
                      <td className="border border-gray-300 p-3 text-orange-700">Small LCD screen</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">History</td>
                      <td className="border border-gray-300 p-3 text-green-700">✓ Saves last 10 calculations</td>
                      <td className="border border-gray-300 p-3 text-orange-700">No history (usually)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">Updates</td>
                      <td className="border border-gray-300 p-3 text-green-700">✓ Automatic improvements</td>
                      <td className="border border-gray-300 p-3 text-orange-700">No updates</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">Durability</td>
                      <td className="border border-gray-300 p-3 text-orange-700">Requires internet/device</td>
                      <td className="border border-gray-300 p-3 text-green-700">✓ Physical, durable</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">Exam Use</td>
                      <td className="border border-gray-300 p-3 text-orange-700">May not be allowed</td>
                      <td className="border border-gray-300 p-3 text-green-700">✓ Often permitted</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Best of Both Worlds:</strong> Use our online calculator for homework, home projects, shopping, and everyday calculations. Keep a physical calculator as backup for exams, outdoor work, or situations without internet access. Together they cover all your calculation needs!
                </p>
              </div>
            </section>

            {/* SEO Keywords Section */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl md:rounded-2xl p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                Related Calculator Tools & Keywords
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-[#2BAE66] mb-2">Calculator Types</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Online calculator</li>
                    <li>• Basic calculator</li>
                    <li>• Scientific calculator</li>
                    <li>• Free calculator</li>
                    <li>• Web calculator</li>
                    <li>• Mobile calculator</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-[#2BAE66] mb-2">Calculator Functions</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Add subtract multiply divide</li>
                    <li>• Square root calculator</li>
                    <li>• Percentage calculator</li>
                    <li>• Power calculator</li>
                    <li>• Memory calculator</li>
                    <li>• Decimal calculator</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-[#2BAE66] mb-2">Use Cases</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Math homework calculator</li>
                    <li>• Shopping calculator</li>
                    <li>• Tip calculator</li>
                    <li>• Budget calculator</li>
                    <li>• Business calculator</li>
                    <li>• Student calculator</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-xl md:rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Explore More Calculators
              </h2>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Check out our other educational, financial, and specialized calculators
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
                    Need Help with Mathematics?
                  </h2>
                  <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                    Our expert tutors can help you master mathematical operations, problem-solving, and excel in your studies. Get personalized one-on-one guidance tailored to your learning style.
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
                  Your trusted partner for free online calculators and educational tools.
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
                  Free online basic calculator with scientific functions. No installation required. Works on all devices.
                </p>
              </div>
            </div>
            <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
              <p>&copy; 2025 The Tutor Bridge. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
