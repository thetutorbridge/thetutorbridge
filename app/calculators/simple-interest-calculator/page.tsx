'use client';

import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

type CalculationType = 'totalPlusInterest' | 'interest' | 'principal' | 'rate' | 'time';

interface Result {
  value: number;
  formula: string;
  steps: string[];
  additionalInfo?: {
    principal?: number;
    interest?: number;
    rate?: number;
    time?: number;
    totalAmount?: number;
  };
}

export default function SimpleInterestCalculator() {
  const [calculationType, setCalculationType] = useState<CalculationType>('totalPlusInterest');
  const [principal, setPrincipal] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [timeUnit, setTimeUnit] = useState<'years' | 'months' | 'days'>('years');
  const [interest, setInterest] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<string>('');
  const [result, setResult] = useState<Result | null>(null);

  const convertTimeToYears = (value: number, unit: 'years' | 'months' | 'days'): number => {
    switch (unit) {
      case 'years':
        return value;
      case 'months':
        return value / 12;
      case 'days':
        return value / 365;
      default:
        return value;
    }
  };

  const calculateSimpleInterest = () => {
    try {
      let resultValue: number;
      let formula: string;
      let steps: string[] = [];
      let additionalInfo: Result['additionalInfo'] = {};

      const P = parseFloat(principal);
      const R = parseFloat(rate);
      const t = time ? convertTimeToYears(parseFloat(time), timeUnit) : 0;
      const I = parseFloat(interest);
      const A = parseFloat(totalAmount);

      if (calculationType === 'totalPlusInterest') {
        // Calculate A = P(1 + rt)
        const r = R / 100;
        resultValue = P * (1 + r * t);
        const interestEarned = resultValue - P;

        formula = 'A = P(1 + rt)';
        steps = [
          `Given: P = ${P.toFixed(2)}, R = ${R}%, t = ${t.toFixed(6)} years`,
          `Convert rate to decimal: r = R ÷ 100 = ${R} ÷ 100 = ${r.toFixed(6)}`,
          `Calculate: A = P(1 + rt)`,
          `A = ${P.toFixed(2)} × (1 + ${r.toFixed(6)} × ${t.toFixed(6)})`,
          `A = ${P.toFixed(2)} × (1 + ${(r * t).toFixed(6)})`,
          `A = ${P.toFixed(2)} × ${(1 + r * t).toFixed(6)}`,
          `A = ${resultValue.toFixed(2)}`,
          `Interest earned: I = A − P = ${resultValue.toFixed(2)} − ${P.toFixed(2)} = ${interestEarned.toFixed(2)}`,
        ];
        additionalInfo = {
          principal: P,
          rate: R,
          time: t,
          interest: interestEarned,
          totalAmount: resultValue,
        };
      } else if (calculationType === 'interest') {
        // Calculate I = Prt
        const r = R / 100;
        resultValue = P * r * t;

        formula = 'I = Prt';
        steps = [
          `Given: P = ${P.toFixed(2)}, R = ${R}%, t = ${t.toFixed(6)} years`,
          `Convert rate to decimal: r = R ÷ 100 = ${R} ÷ 100 = ${r.toFixed(6)}`,
          `Calculate: I = Prt`,
          `I = ${P.toFixed(2)} × ${r.toFixed(6)} × ${t.toFixed(6)}`,
          `I = ${resultValue.toFixed(2)}`,
          `Total amount: A = P + I = ${P.toFixed(2)} + ${resultValue.toFixed(2)} = ${(P + resultValue).toFixed(2)}`,
        ];
        additionalInfo = {
          principal: P,
          rate: R,
          time: t,
          interest: resultValue,
          totalAmount: P + resultValue,
        };
      } else if (calculationType === 'principal') {
        // Calculate P = A / (1 + rt) or P = I / (rt)
        if (totalAmount) {
          const r = R / 100;
          resultValue = A / (1 + r * t);
          const interestEarned = A - resultValue;

          formula = 'P = A ÷ (1 + rt)';
          steps = [
            `Given: A = ${A.toFixed(2)}, R = ${R}%, t = ${t.toFixed(6)} years`,
            `Convert rate to decimal: r = R ÷ 100 = ${R} ÷ 100 = ${r.toFixed(6)}`,
            `Calculate: P = A ÷ (1 + rt)`,
            `P = ${A.toFixed(2)} ÷ (1 + ${r.toFixed(6)} × ${t.toFixed(6)})`,
            `P = ${A.toFixed(2)} ÷ (1 + ${(r * t).toFixed(6)})`,
            `P = ${A.toFixed(2)} ÷ ${(1 + r * t).toFixed(6)}`,
            `P = ${resultValue.toFixed(2)}`,
            `Interest: I = A − P = ${A.toFixed(2)} − ${resultValue.toFixed(2)} = ${interestEarned.toFixed(2)}`,
          ];
          additionalInfo = {
            principal: resultValue,
            rate: R,
            time: t,
            interest: interestEarned,
            totalAmount: A,
          };
        } else {
          const r = R / 100;
          resultValue = I / (r * t);

          formula = 'P = I ÷ (rt)';
          steps = [
            `Given: I = ${I.toFixed(2)}, R = ${R}%, t = ${t.toFixed(6)} years`,
            `Convert rate to decimal: r = R ÷ 100 = ${R} ÷ 100 = ${r.toFixed(6)}`,
            `Calculate: P = I ÷ (rt)`,
            `P = ${I.toFixed(2)} ÷ (${r.toFixed(6)} × ${t.toFixed(6)})`,
            `P = ${I.toFixed(2)} ÷ ${(r * t).toFixed(6)}`,
            `P = ${resultValue.toFixed(2)}`,
            `Total amount: A = P + I = ${resultValue.toFixed(2)} + ${I.toFixed(2)} = ${(resultValue + I).toFixed(2)}`,
          ];
          additionalInfo = {
            principal: resultValue,
            rate: R,
            time: t,
            interest: I,
            totalAmount: resultValue + I,
          };
        }
      } else if (calculationType === 'rate') {
        // Calculate R = (I / Pt) × 100 or R = ((A/P - 1) / t) × 100
        if (interest) {
          resultValue = (I / (P * t)) * 100;

          formula = 'R = (I ÷ Pt) × 100';
          steps = [
            `Given: I = ${I.toFixed(2)}, P = ${P.toFixed(2)}, t = ${t.toFixed(6)} years`,
            `Calculate: R = (I ÷ Pt) × 100`,
            `R = (${I.toFixed(2)} ÷ (${P.toFixed(2)} × ${t.toFixed(6)})) × 100`,
            `R = (${I.toFixed(2)} ÷ ${(P * t).toFixed(6)}) × 100`,
            `R = ${(I / (P * t)).toFixed(6)} × 100`,
            `R = ${resultValue.toFixed(6)}%`,
            `Total amount: A = P + I = ${P.toFixed(2)} + ${I.toFixed(2)} = ${(P + I).toFixed(2)}`,
          ];
          additionalInfo = {
            principal: P,
            rate: resultValue,
            time: t,
            interest: I,
            totalAmount: P + I,
          };
        } else {
          resultValue = ((A / P - 1) / t) * 100;
          const r = resultValue / 100;
          const interestEarned = A - P;

          formula = 'R = ((A ÷ P − 1) ÷ t) × 100';
          steps = [
            `Given: A = ${A.toFixed(2)}, P = ${P.toFixed(2)}, t = ${t.toFixed(6)} years`,
            `Calculate: R = ((A ÷ P − 1) ÷ t) × 100`,
            `R = ((${A.toFixed(2)} ÷ ${P.toFixed(2)} − 1) ÷ ${t.toFixed(6)}) × 100`,
            `R = ((${(A / P).toFixed(6)} − 1) ÷ ${t.toFixed(6)}) × 100`,
            `R = (${(A / P - 1).toFixed(6)} ÷ ${t.toFixed(6)}) × 100`,
            `R = ${((A / P - 1) / t).toFixed(6)} × 100`,
            `R = ${resultValue.toFixed(6)}%`,
            `Interest: I = A − P = ${A.toFixed(2)} − ${P.toFixed(2)} = ${interestEarned.toFixed(2)}`,
          ];
          additionalInfo = {
            principal: P,
            rate: resultValue,
            time: t,
            interest: interestEarned,
            totalAmount: A,
          };
        }
      } else if (calculationType === 'time') {
        // Calculate t = I / (Pr) or t = (A/P - 1) / r
        if (interest) {
          const r = R / 100;
          resultValue = I / (P * r);

          formula = 't = I ÷ (Pr)';
          steps = [
            `Given: I = ${I.toFixed(2)}, P = ${P.toFixed(2)}, R = ${R}%`,
            `Convert rate to decimal: r = R ÷ 100 = ${R} ÷ 100 = ${r.toFixed(6)}`,
            `Calculate: t = I ÷ (Pr)`,
            `t = ${I.toFixed(2)} ÷ (${P.toFixed(2)} × ${r.toFixed(6)})`,
            `t = ${I.toFixed(2)} ÷ ${(P * r).toFixed(6)}`,
            `t = ${resultValue.toFixed(6)} years`,
            `Total amount: A = P + I = ${P.toFixed(2)} + ${I.toFixed(2)} = ${(P + I).toFixed(2)}`,
          ];
          additionalInfo = {
            principal: P,
            rate: R,
            time: resultValue,
            interest: I,
            totalAmount: P + I,
          };
        } else {
          const r = R / 100;
          resultValue = (A / P - 1) / r;
          const interestEarned = A - P;

          formula = 't = (A ÷ P − 1) ÷ r';
          steps = [
            `Given: A = ${A.toFixed(2)}, P = ${P.toFixed(2)}, R = ${R}%`,
            `Convert rate to decimal: r = R ÷ 100 = ${R} ÷ 100 = ${r.toFixed(6)}`,
            `Calculate: t = (A ÷ P − 1) ÷ r`,
            `t = (${A.toFixed(2)} ÷ ${P.toFixed(2)} − 1) ÷ ${r.toFixed(6)}`,
            `t = (${(A / P).toFixed(6)} − 1) ÷ ${r.toFixed(6)}`,
            `t = ${(A / P - 1).toFixed(6)} ÷ ${r.toFixed(6)}`,
            `t = ${resultValue.toFixed(6)} years`,
            `Interest: I = A − P = ${A.toFixed(2)} − ${P.toFixed(2)} = ${interestEarned.toFixed(2)}`,
          ];
          additionalInfo = {
            principal: P,
            rate: R,
            time: resultValue,
            interest: interestEarned,
            totalAmount: A,
          };
        }
      } else {
        throw new Error('Invalid calculation type');
      }

      setResult({
        value: resultValue,
        formula,
        steps,
        additionalInfo,
      });
    } catch (error) {
      setResult(null);
      alert('Please enter valid values for all required fields.');
    }
  };

  const clearAll = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setInterest('');
    setTotalAmount('');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center">
              <Calculator className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-[#1A3D7C] mb-4">
            Simple Interest Calculator
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Calculate simple interest, principal, rate, time, or total amount using the formula <span className="italic font-semibold">A = P(1 + rt)</span>
          </p>
        </div>

        {/* Calculator Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8 mb-12">
          {/* Calculation Type Selector */}
          <div className="mb-6">
            <Label className="text-lg font-semibold text-[#1A3D7C] mb-2 block">Calculate:</Label>
            <select
              value={calculationType}
              onChange={(e) => {
                setCalculationType(e.target.value as CalculationType);
                setResult(null);
              }}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#2BAE66] text-lg"
            >
              <option value="totalPlusInterest">Total P+I (A)</option>
              <option value="interest">Interest (I)</option>
              <option value="principal">Principal (P)</option>
              <option value="rate">Rate (R)</option>
              <option value="time">Time (t)</option>
            </select>
          </div>

          {/* Formula Display */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-2 border-[#2BAE66]">
            <p className="text-center text-xl font-semibold text-[#1A3D7C]">
              {calculationType === 'totalPlusInterest' && (
                <span className="italic">Where A = P(1 + rt)</span>
              )}
              {calculationType === 'interest' && (
                <span className="italic">Where I = Prt</span>
              )}
              {calculationType === 'principal' && (
                <span className="italic">Where P = A ÷ (1 + rt) or P = I ÷ (rt)</span>
              )}
              {calculationType === 'rate' && (
                <span className="italic">Where R = (I ÷ Pt) × 100 or R = ((A ÷ P − 1) ÷ t) × 100</span>
              )}
              {calculationType === 'time' && (
                <span className="italic">Where t = I ÷ (Pr) or t = (A ÷ P − 1) ÷ r</span>
              )}
            </p>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Principal Input */}
            {calculationType !== 'principal' && (
              <div>
                <Label htmlFor="principal" className="text-base font-semibold text-[#1A3D7C] mb-2 block">
                  Principal (P)
                </Label>
                <Input
                  id="principal"
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="Enter principal amount"
                  className="text-lg p-3 border-2 focus:border-[#2BAE66]"
                  step="0.01"
                />
              </div>
            )}

            {/* Rate Input */}
            {calculationType !== 'rate' && (
              <div>
                <Label htmlFor="rate" className="text-base font-semibold text-[#1A3D7C] mb-2 block">
                  Rate (R) % per year
                </Label>
                <Input
                  id="rate"
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="Enter rate (percentage)"
                  className="text-lg p-3 border-2 focus:border-[#2BAE66]"
                  step="0.01"
                />
              </div>
            )}

            {/* Time Input */}
            {calculationType !== 'time' && (
              <div>
                <Label htmlFor="time" className="text-base font-semibold text-[#1A3D7C] mb-2 block">
                  Time (t)
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="time"
                    type="number"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Enter time"
                    className="text-lg p-3 border-2 focus:border-[#2BAE66] flex-1"
                    step="0.01"
                  />
                  <select
                    value={timeUnit}
                    onChange={(e) => setTimeUnit(e.target.value as 'years' | 'months' | 'days')}
                    className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#2BAE66]"
                  >
                    <option value="years">years</option>
                    <option value="months">months</option>
                    <option value="days">days</option>
                  </select>
                </div>
              </div>
            )}

            {/* Interest Input (for Principal, Rate, Time calculations) */}
            {(calculationType === 'principal' || calculationType === 'rate' || calculationType === 'time') && (
              <div>
                <Label htmlFor="interest" className="text-base font-semibold text-[#1A3D7C] mb-2 block">
                  Interest (I) <span className="text-sm text-gray-600">(optional)</span>
                </Label>
                <Input
                  id="interest"
                  type="number"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  placeholder="Enter interest amount"
                  className="text-lg p-3 border-2 focus:border-[#2BAE66]"
                  step="0.01"
                />
              </div>
            )}

            {/* Total Amount Input (for Principal, Rate, Time calculations) */}
            {(calculationType === 'principal' || calculationType === 'rate' || calculationType === 'time') && (
              <div>
                <Label htmlFor="totalAmount" className="text-base font-semibold text-[#1A3D7C] mb-2 block">
                  Total Amount (A) <span className="text-sm text-gray-600">(optional)</span>
                </Label>
                <Input
                  id="totalAmount"
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  placeholder="Enter total amount"
                  className="text-lg p-3 border-2 focus:border-[#2BAE66]"
                  step="0.01"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={calculateSimpleInterest}
              className="flex-1 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] hover:from-[#2BAE66] hover:to-[#1A3D7C] text-white py-6 text-lg font-semibold rounded-lg transition-all duration-300"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Calculate
            </Button>
            <Button
              onClick={clearAll}
              variant="outline"
              className="px-8 py-6 text-lg font-semibold border-2 border-[#1A3D7C] text-[#1A3D7C] hover:bg-[#1A3D7C] hover:text-white rounded-lg transition-all duration-300"
            >
              Clear
            </Button>
          </div>

          {/* Result Display */}
          {result && (
            <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-[#2BAE66]">
              <h3 className="text-2xl font-bold text-[#1A3D7C] mb-4">Result:</h3>

              <div className="mb-4 p-4 bg-white rounded-lg">
                <p className="text-xl font-semibold text-[#2BAE66]">
                  {calculationType === 'totalPlusInterest' && `Total Amount (A) = ${result.value.toFixed(2)}`}
                  {calculationType === 'interest' && `Interest (I) = ${result.value.toFixed(2)}`}
                  {calculationType === 'principal' && `Principal (P) = ${result.value.toFixed(2)}`}
                  {calculationType === 'rate' && `Rate (R) = ${result.value.toFixed(6)}%`}
                  {calculationType === 'time' && `Time (t) = ${result.value.toFixed(6)} years`}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-semibold text-[#1A3D7C] mb-2">Formula:</h4>
                <p className="text-lg italic font-semibold bg-white p-3 rounded-lg">{result.formula}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-semibold text-[#1A3D7C] mb-2">Step-by-step Solution:</h4>
                <div className="bg-white p-4 rounded-lg space-y-2">
                  {result.steps.map((step, index) => (
                    <p key={index} className="text-base">
                      <span className="font-semibold text-[#2BAE66]">Step {index + 1}:</span> {step}
                    </p>
                  ))}
                </div>
              </div>

              {result.additionalInfo && (
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1A3D7C] mb-3">Summary:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.additionalInfo.principal !== undefined && (
                      <p className="text-base">
                        <span className="font-semibold">Principal (P):</span> {result.additionalInfo.principal.toFixed(2)}
                      </p>
                    )}
                    {result.additionalInfo.rate !== undefined && (
                      <p className="text-base">
                        <span className="font-semibold">Rate (R):</span> {result.additionalInfo.rate.toFixed(6)}%
                      </p>
                    )}
                    {result.additionalInfo.time !== undefined && (
                      <p className="text-base">
                        <span className="font-semibold">Time (t):</span> {result.additionalInfo.time.toFixed(6)} years
                      </p>
                    )}
                    {result.additionalInfo.interest !== undefined && (
                      <p className="text-base">
                        <span className="font-semibold">Interest (I):</span> {result.additionalInfo.interest.toFixed(2)}
                      </p>
                    )}
                    {result.additionalInfo.totalAmount !== undefined && (
                      <p className="text-base">
                        <span className="font-semibold">Total Amount (A):</span> {result.additionalInfo.totalAmount.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Educational Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* What is Simple Interest */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-4">What is Simple Interest?</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Simple interest is a method of calculating the interest charge on a loan or deposit. It is determined by multiplying the daily interest rate by the principal by the number of time periods that elapse. Simple interest is calculated only on the principal amount of a loan or deposit, so it is easier to determine than compound interest.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The formula for simple interest is straightforward: multiply the principal amount by the interest rate and the time period. The total amount owed or earned is the sum of the principal and the simple interest calculated.
            </p>
          </section>

          {/* Simple Interest Formula */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-4">Simple Interest Formula</h2>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border-2 border-[#2BAE66] mb-6">
              <p className="text-2xl font-bold text-center text-[#1A3D7C] mb-4">
                <span className="italic">I = Prt</span>
              </p>
              <p className="text-xl font-semibold text-center text-[#1A3D7C]">
                <span className="italic">A = P + I = P(1 + rt)</span>
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-gray-700"><span className="font-semibold text-[#1A3D7C]">I</span> = Simple Interest</p>
              <p className="text-gray-700"><span className="font-semibold text-[#1A3D7C]">P</span> = Principal amount (initial investment or loan)</p>
              <p className="text-gray-700"><span className="font-semibold text-[#1A3D7C]">r</span> = Interest rate per period (as a decimal)</p>
              <p className="text-gray-700"><span className="font-semibold text-[#1A3D7C]">R</span> = Interest rate per period (as a percentage)</p>
              <p className="text-gray-700"><span className="font-semibold text-[#1A3D7C]">t</span> = Time period (in years)</p>
              <p className="text-gray-700"><span className="font-semibold text-[#1A3D7C]">A</span> = Total amount (Principal + Interest)</p>
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-gray-700">
                <span className="font-semibold">Important:</span> To convert the annual interest rate (R) to a decimal rate (r), divide by 100: <span className="italic">r = R ÷ 100</span>
              </p>
            </div>
          </section>

          {/* How to Calculate Simple Interest */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-4">How to Calculate Simple Interest</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-2">Step 1: Identify the Principal (P)</h3>
                <p className="text-gray-700">
                  The principal is the initial amount of money borrowed or invested. For example, if you deposit $5,000 in a savings account, the principal is $5,000.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-2">Step 2: Determine the Interest Rate (R or r)</h3>
                <p className="text-gray-700">
                  The interest rate is typically expressed as an annual percentage. Convert the percentage to a decimal by dividing by 100. For example, 5% becomes 0.05.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-2">Step 3: Find the Time Period (t)</h3>
                <p className="text-gray-700">
                  The time period is the length of time the money is borrowed or invested, expressed in years. If the time is given in months or days, convert it to years (months ÷ 12, days ÷ 365).
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-2">Step 4: Apply the Formula</h3>
                <p className="text-gray-700 mb-2">
                  Use the formula <span className="italic font-semibold">I = Prt</span> to calculate the simple interest.
                </p>
                <p className="text-gray-700">
                  Then calculate the total amount: <span className="italic font-semibold">A = P + I</span> or <span className="italic font-semibold">A = P(1 + rt)</span>
                </p>
              </div>
            </div>
          </section>

          {/* Example Calculations */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-4">Example Calculations</h2>

            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg border-l-4 border-[#2BAE66]">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">Example 1: Calculate Total Amount</h3>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Given:</span> P = $10,000, R = 5% per year, t = 3 years</p>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Solution:</span></p>
                <div className="ml-4 space-y-1 text-gray-700">
                  <p>Convert rate: r = 5 ÷ 100 = 0.05</p>
                  <p>Calculate: A = P(1 + rt)</p>
                  <p>A = 10,000 × (1 + 0.05 × 3)</p>
                  <p>A = 10,000 × (1 + 0.15)</p>
                  <p>A = 10,000 × 1.15</p>
                  <p className="font-semibold text-[#2BAE66]">A = $11,500</p>
                  <p>Interest earned: I = A − P = $11,500 − $10,000 = $1,500</p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-green-50 to-white rounded-lg border-l-4 border-[#1A3D7C]">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">Example 2: Calculate Interest Rate</h3>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Given:</span> P = $8,000, I = $1,200, t = 2 years</p>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Solution:</span></p>
                <div className="ml-4 space-y-1 text-gray-700">
                  <p>Use formula: R = (I ÷ Pt) × 100</p>
                  <p>R = (1,200 ÷ (8,000 × 2)) × 100</p>
                  <p>R = (1,200 ÷ 16,000) × 100</p>
                  <p>R = 0.075 × 100</p>
                  <p className="font-semibold text-[#2BAE66]">R = 7.5%</p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-purple-50 to-white rounded-lg border-l-4 border-[#2BAE66]">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">Example 3: Calculate Time Period</h3>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Given:</span> P = $5,000, R = 6% per year, A = $6,500</p>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Solution:</span></p>
                <div className="ml-4 space-y-1 text-gray-700">
                  <p>Convert rate: r = 6 ÷ 100 = 0.06</p>
                  <p>Use formula: t = (A ÷ P − 1) ÷ r</p>
                  <p>t = (6,500 ÷ 5,000 − 1) ÷ 0.06</p>
                  <p>t = (1.3 − 1) ÷ 0.06</p>
                  <p>t = 0.3 ÷ 0.06</p>
                  <p className="font-semibold text-[#2BAE66]">t = 5 years</p>
                </div>
              </div>
            </div>
          </section>

          {/* Simple Interest vs Compound Interest */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-4">Simple Interest vs Compound Interest</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
                    <th className="border border-gray-300 p-3 text-left">Aspect</th>
                    <th className="border border-gray-300 p-3 text-left">Simple Interest</th>
                    <th className="border border-gray-300 p-3 text-left">Compound Interest</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Calculation Basis</td>
                    <td className="border border-gray-300 p-3">Calculated only on principal</td>
                    <td className="border border-gray-300 p-3">Calculated on principal + accumulated interest</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Formula</td>
                    <td className="border border-gray-300 p-3 italic">I = Prt, A = P(1 + rt)</td>
                    <td className="border border-gray-300 p-3 italic">A = P(1 + r)ⁿ</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Growth Pattern</td>
                    <td className="border border-gray-300 p-3">Linear growth</td>
                    <td className="border border-gray-300 p-3">Exponential growth</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Common Use</td>
                    <td className="border border-gray-300 p-3">Short-term loans, simple savings</td>
                    <td className="border border-gray-300 p-3">Long-term investments, mortgages</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Returns</td>
                    <td className="border border-gray-300 p-3">Lower returns over time</td>
                    <td className="border border-gray-300 p-3">Higher returns over time</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Applications of Simple Interest */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-4">Applications of Simple Interest</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">Personal Loans</h3>
                <p className="text-gray-700">
                  Many short-term personal loans use simple interest to calculate the interest owed on the borrowed amount.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">Car Loans</h3>
                <p className="text-gray-700">
                  Some automobile financing uses simple interest calculations for determining monthly payments and total interest.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">Savings Accounts</h3>
                <p className="text-gray-700">
                  Certain basic savings accounts calculate interest using simple interest methods for easier understanding.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">Short-term Investments</h3>
                <p className="text-gray-700">
                  Treasury bills and other short-term securities often use simple interest for calculating returns.
                </p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">Promissory Notes</h3>
                <p className="text-gray-700">
                  Written promises to pay back borrowed money typically include simple interest calculations.
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">Educational Purposes</h3>
                <p className="text-gray-700">
                  Simple interest is taught in schools to introduce basic financial literacy and interest concepts.
                </p>
              </div>
            </div>
          </section>

          {/* Tips for Using Simple Interest */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-4">Tips for Using Simple Interest Calculator</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A3D7C] mb-1">Convert Percentages</h3>
                  <p className="text-gray-700">Always convert percentage rates to decimals when using formulas manually (divide by 100).</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A3D7C] mb-1">Time Units Matter</h3>
                  <p className="text-gray-700">Ensure time is expressed in years. Convert months to years (÷ 12) or days to years (÷ 365).</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A3D7C] mb-1">Double-Check Units</h3>
                  <p className="text-gray-700">Make sure the interest rate period matches the time period (both annual, both monthly, etc.).</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A3D7C] mb-1">Compare Options</h3>
                  <p className="text-gray-700">Use the calculator to compare different loan or investment scenarios before making decisions.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="font-bold">5</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A3D7C] mb-1">Verify Results</h3>
                  <p className="text-gray-700">Review the step-by-step solution to understand how the result was calculated and verify accuracy.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-2">What is the difference between simple and compound interest?</h3>
                <p className="text-gray-700">
                  Simple interest is calculated only on the principal amount, while compound interest is calculated on both the principal and accumulated interest. Simple interest grows linearly, while compound interest grows exponentially over time.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-2">How do I convert monthly interest rate to annual?</h3>
                <p className="text-gray-700">
                  To convert a monthly interest rate to an annual rate, multiply it by 12. For example, 1% per month equals 12% per year. However, note that this is different from compound interest calculations.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-2">Can simple interest be negative?</h3>
                <p className="text-gray-700">
                  In standard financial contexts, simple interest is not negative. However, in some theoretical scenarios or when dealing with debt reductions, you might see negative interest rates, but this is uncommon in simple interest calculations.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-2">Is simple interest better than compound interest?</h3>
                <p className="text-gray-700">
                  It depends on your perspective. For borrowers, simple interest is better as it results in lower total interest paid. For investors, compound interest is better as it generates higher returns over time. Simple interest is easier to calculate and understand.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-2">How accurate is this simple interest calculator?</h3>
                <p className="text-gray-700">
                  This calculator uses precise mathematical formulas and provides results accurate to several decimal places. The step-by-step solutions show exactly how calculations are performed, ensuring transparency and accuracy.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-2">What if my time period is in months or days?</h3>
                <p className="text-gray-700">
                  The calculator automatically converts your time input to years based on the unit you select. You can enter time in years, months, or days, and the calculator will handle the conversion (months ÷ 12, days ÷ 365).
                </p>
              </div>
            </div>
          </section>

          {/* Additional Resources */}
          <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-4">Additional Resources</h2>
            <div className="space-y-3">
              <p className="text-lg">
                Learn more about financial calculations and interest rates:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Understanding compound interest and its exponential growth</li>
                <li>Amortization schedules for loan repayment planning</li>
                <li>Present value and future value calculations</li>
                <li>Annual percentage rate (APR) vs annual percentage yield (APY)</li>
                <li>Effective interest rate calculations and comparisons</li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
