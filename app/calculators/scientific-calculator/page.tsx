'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, Delete, RotateCcw, Home, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function ScientificCalculatorPage() {
  const [display, setDisplay] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');
  const [memory, setMemory] = useState<number>(0);
  const [isRadians, setIsRadians] = useState<boolean>(true);
  const [lastAnswer, setLastAnswer] = useState<number>(0);
  const [isNewCalculation, setIsNewCalculation] = useState<boolean>(true);

  const toRadians = (deg: number) => (deg * Math.PI) / 180;
  const toDegrees = (rad: number) => (rad * 180) / Math.PI;

  const handleNumber = (num: string) => {
    if (isNewCalculation) {
      setDisplay(num);
      setExpression(num);
      setIsNewCalculation(false);
    } else {
      if (display === '0' && num !== '.') {
        setDisplay(num);
        setExpression(expression.slice(0, -1) + num);
      } else {
        setDisplay(display + num);
        setExpression(expression + num);
      }
    }
  };

  const handleOperator = (op: string) => {
    setIsNewCalculation(false);
    const displayOp = op === '*' ? '×' : op === '/' ? '÷' : op;
    setExpression(expression + ' ' + displayOp + ' ');
    setDisplay('0');
  };

  const handleFunction = (func: string) => {
    const num = parseFloat(display);
    let result: number;

    switch (func) {
      case 'sin':
        result = isRadians ? Math.sin(num) : Math.sin(toRadians(num));
        break;
      case 'cos':
        result = isRadians ? Math.cos(num) : Math.cos(toRadians(num));
        break;
      case 'tan':
        result = isRadians ? Math.tan(num) : Math.tan(toRadians(num));
        break;
      case 'asin':
        result = isRadians ? Math.asin(num) : toDegrees(Math.asin(num));
        break;
      case 'acos':
        result = isRadians ? Math.acos(num) : toDegrees(Math.acos(num));
        break;
      case 'atan':
        result = isRadians ? Math.atan(num) : toDegrees(Math.atan(num));
        break;
      case 'log':
        result = Math.log10(num);
        break;
      case 'ln':
        result = Math.log(num);
        break;
      case 'sqrt':
        result = Math.sqrt(num);
        break;
      case 'cbrt':
        result = Math.cbrt(num);
        break;
      case 'square':
        result = num * num;
        break;
      case 'cube':
        result = num * num * num;
        break;
      case 'inverse':
        result = 1 / num;
        break;
      case 'factorial':
        result = factorial(Math.floor(num));
        break;
      case 'abs':
        result = Math.abs(num);
        break;
      case 'exp':
        result = Math.exp(num);
        break;
      case 'percent':
        result = num / 100;
        break;
      case 'negate':
        result = -num;
        break;
      default:
        result = num;
    }

    const resultStr = formatResult(result);
    setDisplay(resultStr);
    setExpression(resultStr);
    setIsNewCalculation(true);
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  };

  const formatResult = (num: number): string => {
    if (isNaN(num)) return 'Error';
    if (!isFinite(num)) return 'Infinity';
    if (Math.abs(num) < 0.0000001 && num !== 0) return num.toExponential(6);
    if (Math.abs(num) > 9999999999) return num.toExponential(6);
    const formatted = parseFloat(num.toPrecision(12));
    return String(formatted);
  };

  const calculate = () => {
    try {
      // Replace display operators with JavaScript operators
      let evalExpression = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, String(Math.PI))
        .replace(/e(?![x])/g, String(Math.E));

      // Safely evaluate the expression
      const result = Function('"use strict"; return (' + evalExpression + ')')();
      const resultStr = formatResult(result);
      setLastAnswer(result);
      setDisplay(resultStr);
      setExpression(resultStr);
      setIsNewCalculation(true);
    } catch {
      setDisplay('Error');
      setIsNewCalculation(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
    setIsNewCalculation(true);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleConstant = (constant: string) => {
    const value = constant === 'pi' ? Math.PI : Math.E;
    const symbol = constant === 'pi' ? 'π' : 'e';
    if (isNewCalculation) {
      setDisplay(formatResult(value));
      setExpression(symbol);
      setIsNewCalculation(false);
    } else {
      setDisplay(formatResult(value));
      setExpression(expression + symbol);
    }
  };

  const handleMemory = (action: string) => {
    const num = parseFloat(display);
    switch (action) {
      case 'MC': setMemory(0); break;
      case 'MR': setDisplay(formatResult(memory)); setExpression(formatResult(memory)); setIsNewCalculation(true); break;
      case 'M+': setMemory(memory + num); break;
      case 'M-': setMemory(memory - num); break;
      case 'MS': setMemory(num); break;
    }
  };

  const handleAns = () => {
    if (isNewCalculation) {
      setDisplay(formatResult(lastAnswer));
      setExpression(formatResult(lastAnswer));
      setIsNewCalculation(false);
    } else {
      setDisplay(formatResult(lastAnswer));
      setExpression(expression + formatResult(lastAnswer));
    }
  };

  const buttonClass = "h-12 text-lg font-semibold transition-all hover:scale-105";
  const numButtonClass = `${buttonClass} bg-white hover:bg-gray-100 border-2 border-gray-200`;
  const opButtonClass = `${buttonClass} bg-blue-500 hover:bg-blue-600 text-white`;
  const funcButtonClass = `${buttonClass} bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm`;
  const specialButtonClass = `${buttonClass} bg-orange-500 hover:bg-orange-600 text-white`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is a scientific calculator?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A scientific calculator is an advanced calculator that can perform complex mathematical operations including trigonometry (sin, cos, tan), logarithms (log, ln), exponents, roots, factorials, and more. It is essential for students, engineers, and scientists.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is the difference between radians and degrees?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Radians and degrees are two units for measuring angles. A full circle is 360 degrees or 2π radians. To convert: radians = degrees × (π/180). Most scientific work uses radians, while everyday applications often use degrees.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is the natural logarithm (ln)?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The natural logarithm (ln) is the logarithm with base e (≈2.71828). It is the inverse of the exponential function e^x. It is widely used in calculus, physics, and engineering for modeling growth and decay processes.'
                }
              },
              {
                '@type': 'Question',
                name: 'How do I calculate factorials?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A factorial (n!) is the product of all positive integers up to n. For example, 5! = 5×4×3×2×1 = 120. Factorials are used in permutations, combinations, and probability calculations.'
                }
              }
            ]
          })
        }}
      />
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50">
        {/* Breadcrumb */}
        <div className="bg-white/80 backdrop-blur-sm py-3 px-4 shadow-sm">
          <div className="max-w-6xl mx-auto">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
                <Home className="w-4 h-4 mr-1" />Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/calculators" className="text-blue-600 hover:text-blue-800">Calculators</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 font-medium">Scientific Calculator</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Scientific Calculator</h1>
            </div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Free online scientific calculator with trigonometry, logarithms, exponents, and more. Perfect for students, engineers, and scientists.
            </p>
          </div>
        </div>

        {/* Calculator */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-slate-200">
              {/* Display */}
              <div className="bg-slate-800 p-4">
                <div className="text-right text-slate-400 text-sm h-6 overflow-hidden">{expression || '0'}</div>
                <div className="text-right text-white text-4xl font-mono font-bold overflow-x-auto">{display}</div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-slate-400">{memory !== 0 ? `M: ${memory}` : ''}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsRadians(!isRadians)}
                    className="text-xs text-slate-300 hover:text-white"
                  >
                    {isRadians ? 'RAD' : 'DEG'}
                  </Button>
                </div>
              </div>

              {/* Buttons */}
              <div className="p-4 bg-slate-50">
                {/* Memory Row */}
                <div className="grid grid-cols-5 gap-2 mb-2">
                  {['MC', 'MR', 'M+', 'M-', 'MS'].map((btn) => (
                    <Button key={btn} onClick={() => handleMemory(btn)} className={`${funcButtonClass} text-xs h-10`}>{btn}</Button>
                  ))}
                </div>

                {/* Scientific Functions Row 1 */}
                <div className="grid grid-cols-5 gap-2 mb-2">
                  <Button onClick={() => handleFunction('square')} className={funcButtonClass}>x²</Button>
                  <Button onClick={() => handleFunction('cube')} className={funcButtonClass}>x³</Button>
                  <Button onClick={() => handleFunction('sqrt')} className={funcButtonClass}>√</Button>
                  <Button onClick={() => handleFunction('cbrt')} className={funcButtonClass}>∛</Button>
                  <Button onClick={() => handleFunction('inverse')} className={funcButtonClass}>1/x</Button>
                </div>

                {/* Scientific Functions Row 2 */}
                <div className="grid grid-cols-5 gap-2 mb-2">
                  <Button onClick={() => handleFunction('sin')} className={funcButtonClass}>sin</Button>
                  <Button onClick={() => handleFunction('cos')} className={funcButtonClass}>cos</Button>
                  <Button onClick={() => handleFunction('tan')} className={funcButtonClass}>tan</Button>
                  <Button onClick={() => handleFunction('log')} className={funcButtonClass}>log</Button>
                  <Button onClick={() => handleFunction('ln')} className={funcButtonClass}>ln</Button>
                </div>

                {/* Scientific Functions Row 3 */}
                <div className="grid grid-cols-5 gap-2 mb-2">
                  <Button onClick={() => handleFunction('asin')} className={funcButtonClass}>sin⁻¹</Button>
                  <Button onClick={() => handleFunction('acos')} className={funcButtonClass}>cos⁻¹</Button>
                  <Button onClick={() => handleFunction('atan')} className={funcButtonClass}>tan⁻¹</Button>
                  <Button onClick={() => handleFunction('exp')} className={funcButtonClass}>eˣ</Button>
                  <Button onClick={() => handleFunction('factorial')} className={funcButtonClass}>n!</Button>
                </div>

                {/* Constants and Special */}
                <div className="grid grid-cols-5 gap-2 mb-2">
                  <Button onClick={() => handleConstant('pi')} className={funcButtonClass}>π</Button>
                  <Button onClick={() => handleConstant('e')} className={funcButtonClass}>e</Button>
                  <Button onClick={handleAns} className={funcButtonClass}>Ans</Button>
                  <Button onClick={() => handleFunction('abs')} className={funcButtonClass}>|x|</Button>
                  <Button onClick={() => handleFunction('percent')} className={funcButtonClass}>%</Button>
                </div>

                {/* Main Calculator Grid */}
                <div className="grid grid-cols-4 gap-2">
                  <Button onClick={clear} className={`${specialButtonClass}`}>AC</Button>
                  <Button onClick={clearEntry} className={funcButtonClass}>CE</Button>
                  <Button onClick={backspace} className={funcButtonClass}><Delete className="w-5 h-5" /></Button>
                  <Button onClick={() => handleOperator('/')} className={opButtonClass}>÷</Button>

                  <Button onClick={() => handleNumber('7')} className={numButtonClass}>7</Button>
                  <Button onClick={() => handleNumber('8')} className={numButtonClass}>8</Button>
                  <Button onClick={() => handleNumber('9')} className={numButtonClass}>9</Button>
                  <Button onClick={() => handleOperator('*')} className={opButtonClass}>×</Button>

                  <Button onClick={() => handleNumber('4')} className={numButtonClass}>4</Button>
                  <Button onClick={() => handleNumber('5')} className={numButtonClass}>5</Button>
                  <Button onClick={() => handleNumber('6')} className={numButtonClass}>6</Button>
                  <Button onClick={() => handleOperator('-')} className={opButtonClass}>−</Button>

                  <Button onClick={() => handleNumber('1')} className={numButtonClass}>1</Button>
                  <Button onClick={() => handleNumber('2')} className={numButtonClass}>2</Button>
                  <Button onClick={() => handleNumber('3')} className={numButtonClass}>3</Button>
                  <Button onClick={() => handleOperator('+')} className={opButtonClass}>+</Button>

                  <Button onClick={() => handleFunction('negate')} className={numButtonClass}>±</Button>
                  <Button onClick={() => handleNumber('0')} className={numButtonClass}>0</Button>
                  <Button onClick={() => handleNumber('.')} className={numButtonClass}>.</Button>
                  <Button onClick={calculate} className={`${specialButtonClass}`}>=</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2 text-slate-800">Trigonometry</h3>
              <p className="text-gray-600 text-sm">Sin, Cos, Tan and their inverses. Switch between radians and degrees.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2 text-slate-800">Logarithms</h3>
              <p className="text-gray-600 text-sm">Natural log (ln), common log (log₁₀), and exponential functions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2 text-slate-800">Advanced Math</h3>
              <p className="text-gray-600 text-sm">Powers, roots, factorials, constants (π, e), and memory functions.</p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {[
                { question: 'What is a scientific calculator?', answer: 'A scientific calculator performs complex mathematical operations including trigonometry, logarithms, exponents, roots, and factorials. It is essential for students, engineers, and scientists.' },
                { question: 'What is the difference between radians and degrees?', answer: 'Radians and degrees are units for measuring angles. A full circle is 360° or 2π radians. To convert: radians = degrees × (π/180). Scientific work typically uses radians.' },
                { question: 'What is the natural logarithm (ln)?', answer: 'The natural logarithm (ln) uses base e (≈2.71828). It is the inverse of e^x and is widely used in calculus, physics, and engineering for modeling growth and decay.' },
                { question: 'How do factorials work?', answer: 'A factorial (n!) is the product of all positive integers up to n. For example, 5! = 5×4×3×2×1 = 120. Used in permutations, combinations, and probability.' },
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-start">
                    <HelpCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-slate-600" />{faq.question}
                  </h3>
                  <p className="text-gray-700 ml-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Calculators */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Related Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Basic Calculator', href: '/calculators/basic-calculator', description: 'Simple arithmetic calculator' },
                { name: 'Percentage Calculator', href: '/calculators/percentage-calculator', description: 'Calculate percentages easily' },
                { name: 'Quadratic Formula', href: '/calculators/quadratic-formula-calculator', description: 'Solve quadratic equations' },
                { name: 'Fraction Calculator', href: '/calculators/fractions-calculator', description: 'Add, subtract, multiply fractions' },
              ].map((calc) => (
                <Link key={calc.href} href={calc.href} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:border-slate-400 hover:shadow-lg transition-all group">
                  <h3 className="font-semibold text-gray-800 group-hover:text-slate-600 mb-1">{calc.name}</h3>
                  <p className="text-sm text-gray-600">{calc.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
