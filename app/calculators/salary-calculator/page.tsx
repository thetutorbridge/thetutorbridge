'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, TrendingUp, IndianRupee, Target, CheckCircle, HelpCircle, Lightbulb, Briefcase, Wallet, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function SalaryCalculatorPage() {
  const [ctc, setCtc] = useState<number>(600000);
  const [bonusType, setBonusType] = useState<string>('percentage');
  const [bonusPercentage, setBonusPercentage] = useState<number>(15);
  const [monthlyProfTax, setMonthlyProfTax] = useState<number>(200);
  const [monthlyEmployerPF, setMonthlyEmployerPF] = useState<number>(1800);
  const [monthlyEmployeePF, setMonthlyEmployeePF] = useState<number>(1800);
  const [additionalDeduction1, setAdditionalDeduction1] = useState<number>(0);
  const [additionalDeduction2, setAdditionalDeduction2] = useState<number>(0);

  const calculateSalary = () => {
    // Calculate bonus amount
    const bonusAmount = bonusType === 'percentage' ? (ctc * bonusPercentage) / 100 : 0;

    // Gross salary (CTC minus bonus)
    const grossAnnualSalary = ctc - bonusAmount;

    // Total monthly deductions
    const totalMonthlyDeductions = monthlyProfTax + monthlyEmployerPF + monthlyEmployeePF + additionalDeduction1 + additionalDeduction2;

    // Total annual deductions
    const totalAnnualDeductions = totalMonthlyDeductions * 12;

    // Take home salary
    const takeHomeAnnualSalary = grossAnnualSalary - totalAnnualDeductions;
    const takeHomeMonthlySalary = takeHomeAnnualSalary / 12;

    return {
      grossAnnualSalary: Math.round(grossAnnualSalary),
      bonusAmount: Math.round(bonusAmount),
      totalMonthlyDeductions: Math.round(totalMonthlyDeductions),
      totalAnnualDeductions: Math.round(totalAnnualDeductions),
      takeHomeMonthlySalary: Math.round(takeHomeMonthlySalary),
      takeHomeAnnualSalary: Math.round(takeHomeAnnualSalary),
    };
  };

  const results = calculateSalary();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the difference between CTC and take-home salary?","acceptedAnswer":{"@type":"Answer","text":"CTC (Cost to Company) is the total amount a company spends on an employee annually, including salary, benefits, and perks. Take-home salary is the actual amount you receive after all deductions like PF, professional tax, and other contributions."}},{"@type":"Question","name":"How is basic salary calculated from CTC?","acceptedAnswer":{"@type":"Answer","text":"Basic salary typically forms 40-50% of the CTC. It is the fixed component paid before any allowances or deductions. The exact percentage varies by company policy and industry standards."}},{"@type":"Question","name":"What deductions are considered in salary calculation?","acceptedAnswer":{"@type":"Answer","text":"Common deductions include Employee Provident Fund (EPF), Professional Tax, Income Tax (TDS), Health Insurance premiums, and any other statutory or voluntary deductions specified by the employer."}},{"@type":"Question","name":"What is EPF and how much is deducted?","acceptedAnswer":{"@type":"Answer","text":"Employee Provident Fund (EPF) is a retirement savings scheme. Typically, 12% of basic salary is deducted from employee salary, and the employer contributes an equal amount. The calculation is capped at ₹15,000 basic salary per month."}},{"@type":"Question","name":"What is professional tax and how is it calculated?","acceptedAnswer":{"@type":"Answer","text":"Professional tax is a state-level employment tax levied on salaried individuals. The amount varies by state, with a maximum cap of ₹2,500 per year. It depends on your monthly salary slab as per state regulations."}},{"@type":"Question","name":"Is bonus included in take-home salary?","acceptedAnswer":{"@type":"Answer","text":"Bonuses are typically part of CTC but not included in monthly take-home salary. They are usually paid separately as performance bonuses, annual bonuses, or festival bonuses as per company policy."}},{"@type":"Question","name":"How accurate is this salary calculator?","acceptedAnswer":{"@type":"Answer","text":"This calculator provides accurate estimates based on the inputs you provide. However, actual take-home may vary slightly due to company-specific policies, state-specific professional tax rates, and other factors."}},{"@type":"Question","name":"Can I use this calculator for job offer comparison?","acceptedAnswer":{"@type":"Answer","text":"Yes! This calculator is perfect for comparing different job offers. Enter the CTC and deduction details for each offer to see which one gives you better take-home salary."}}]}' }}
      />
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Header Section */}
      <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Wallet className="w-12 h-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Salary Calculator</h1>
          </div>
          <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
            Calculate your take-home salary from CTC. Get instant breakdown of deductions, PF contributions, and professional tax to understand your actual in-hand salary.
          </p>
        </div>
      </div>

      {/* Main Calculator Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input Fields */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <Calculator className="w-6 h-6 mr-2" />
                Salary Details
              </h2>

              <div className="space-y-6">
                {/* Cost to Company (CTC) */}
                <div>
                  <Label htmlFor="ctc" className="text-base font-semibold text-gray-700 mb-2 block">
                    Cost to Company (CTC)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <Input
                      id="ctc"
                      type="number"
                      value={ctc}
                      onChange={(e) => setCtc(Number(e.target.value))}
                      className="pl-8 text-lg h-12"
                      min="0"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Annual CTC package</p>
                </div>

                {/* Bonus Type and Percentage */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bonusType" className="text-base font-semibold text-gray-700 mb-2 block">
                      Bonus Included in CTC
                    </Label>
                    <Select value={bonusType} onValueChange={setBonusType}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {bonusType === 'percentage' && (
                    <div>
                      <Label htmlFor="bonusPercentage" className="text-base font-semibold text-gray-700 mb-2 block">
                        Bonus Percentage
                      </Label>
                      <div className="relative">
                        <Input
                          id="bonusPercentage"
                          type="number"
                          value={bonusPercentage}
                          onChange={(e) => setBonusPercentage(Number(e.target.value))}
                          className="pr-8 text-lg h-12"
                          min="0"
                          max="100"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Monthly Deductions */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-4">Monthly Deductions</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Monthly Professional Tax */}
                    <div>
                      <Label htmlFor="profTax" className="text-base font-semibold text-gray-700 mb-2 block">
                        Monthly Professional Tax
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <Input
                          id="profTax"
                          type="number"
                          value={monthlyProfTax}
                          onChange={(e) => setMonthlyProfTax(Number(e.target.value))}
                          className="pl-8 text-lg h-12"
                          min="0"
                        />
                      </div>
                    </div>

                    {/* Monthly Employer PF */}
                    <div>
                      <Label htmlFor="employerPF" className="text-base font-semibold text-gray-700 mb-2 block">
                        Monthly Employer PF
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <Input
                          id="employerPF"
                          type="number"
                          value={monthlyEmployerPF}
                          onChange={(e) => setMonthlyEmployerPF(Number(e.target.value))}
                          className="pl-8 text-lg h-12"
                          min="0"
                        />
                      </div>
                    </div>

                    {/* Monthly Employee PF */}
                    <div>
                      <Label htmlFor="employeePF" className="text-base font-semibold text-gray-700 mb-2 block">
                        Monthly Employee PF
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <Input
                          id="employeePF"
                          type="number"
                          value={monthlyEmployeePF}
                          onChange={(e) => setMonthlyEmployeePF(Number(e.target.value))}
                          className="pl-8 text-lg h-12"
                          min="0"
                        />
                      </div>
                    </div>

                    {/* Additional Deduction 1 */}
                    <div>
                      <Label htmlFor="addDed1" className="text-base font-semibold text-gray-700 mb-2 block">
                        Monthly Additional Deduction (Optional)
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <Input
                          id="addDed1"
                          type="number"
                          value={additionalDeduction1}
                          onChange={(e) => setAdditionalDeduction1(Number(e.target.value))}
                          className="pl-8 text-lg h-12"
                          min="0"
                        />
                      </div>
                    </div>

                    {/* Additional Deduction 2 */}
                    <div className="md:col-span-2">
                      <Label htmlFor="addDed2" className="text-base font-semibold text-gray-700 mb-2 block">
                        Monthly Additional Deduction (Optional)
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <Input
                          id="addDed2"
                          type="number"
                          value={additionalDeduction2}
                          onChange={(e) => setAdditionalDeduction2(Number(e.target.value))}
                          className="pl-8 text-lg h-12"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Formula Explanation */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border-2 border-blue-200">
              <h3 className="text-lg font-semibold text-[#1A3D7C] mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                How Salary is Calculated
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Gross Salary</strong> = CTC - Bonus Amount</p>
                <p><strong>Total Monthly Deductions</strong> = Professional Tax + Employer PF + Employee PF + Additional Deductions</p>
                <p><strong>Total Annual Deductions</strong> = Total Monthly Deductions × 12</p>
                <p><strong>Take Home Salary</strong> = Gross Salary - Total Annual Deductions</p>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white p-6 md:p-8 rounded-xl shadow-xl sticky top-4">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2" />
                Your Salary Breakdown
              </h2>

              <div className="space-y-4">
                {/* Annual CTC */}
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <p className="text-sm text-blue-100 mb-1">Annual CTC</p>
                  <p className="text-2xl font-bold">{formatCurrency(ctc)}</p>
                </div>

                {/* Bonus Amount */}
                {results.bonusAmount > 0 && (
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                    <p className="text-sm text-blue-100 mb-1">Bonus Amount</p>
                    <p className="text-xl font-semibold">- {formatCurrency(results.bonusAmount)}</p>
                  </div>
                )}

                {/* Gross Annual Salary */}
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <p className="text-sm text-blue-100 mb-1">Gross Annual Salary</p>
                  <p className="text-xl font-semibold">{formatCurrency(results.grossAnnualSalary)}</p>
                </div>

                {/* Total Monthly Deductions */}
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <p className="text-sm text-blue-100 mb-1">Total Monthly Deductions</p>
                  <p className="text-xl font-semibold">- {formatCurrency(results.totalMonthlyDeductions)}</p>
                </div>

                {/* Total Annual Deductions */}
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <p className="text-sm text-blue-100 mb-1">Total Annual Deductions</p>
                  <p className="text-xl font-semibold">- {formatCurrency(results.totalAnnualDeductions)}</p>
                </div>

                <div className="border-t-2 border-white/30 pt-4 mt-4">
                  {/* Take Home Monthly Salary */}
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg mb-4">
                    <p className="text-sm text-blue-100 mb-1">Take Home Monthly Salary</p>
                    <p className="text-3xl font-bold">{formatCurrency(results.takeHomeMonthlySalary)}</p>
                  </div>

                  {/* Take Home Annual Salary */}
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                    <p className="text-sm text-blue-100 mb-1">Take Home Annual Salary</p>
                    <p className="text-3xl font-bold">{formatCurrency(results.takeHomeAnnualSalary)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-[#1A3D7C] mb-8">
            Benefits of Using Our Salary Calculator
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Instant Results',
                description: 'Get your take-home salary calculated in seconds with real-time updates as you adjust inputs.',
              },
              {
                title: 'Complete Breakdown',
                description: 'See detailed bifurcation of all deductions including PF, professional tax, and custom deductions.',
              },
              {
                title: 'CTC to In-Hand',
                description: 'Understand the exact difference between your CTC and actual in-hand salary you receive.',
              },
              {
                title: 'Monthly & Annual View',
                description: 'View both monthly and annual salary breakdowns to plan your finances better.',
              },
              {
                title: 'Bonus Calculation',
                description: 'Factor in bonus percentage or fixed amount to get accurate take-home calculations.',
              },
              {
                title: 'Job Comparison',
                description: 'Compare multiple job offers by calculating take-home salary from different CTC packages.',
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200 hover:border-[#2BAE66] transition-all hover:shadow-lg"
              >
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">{benefit.title}</h3>
                    <p className="text-gray-700">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-[#1A3D7C] mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              {
                question: 'What is the difference between CTC and take-home salary?',
                answer: 'CTC (Cost to Company) is the total amount a company spends on an employee annually, including salary, benefits, and perks. Take-home salary is the actual amount you receive after all deductions like PF, professional tax, and other contributions.',
              },
              {
                question: 'How is basic salary calculated from CTC?',
                answer: 'Basic salary typically forms 40-50% of the CTC. It is the fixed component paid before any allowances or deductions. The exact percentage varies by company policy and industry standards.',
              },
              {
                question: 'What deductions are considered in salary calculation?',
                answer: 'Common deductions include Employee Provident Fund (EPF), Professional Tax, Income Tax (TDS), Health Insurance premiums, and any other statutory or voluntary deductions specified by the employer.',
              },
              {
                question: 'What is EPF and how much is deducted?',
                answer: 'Employee Provident Fund (EPF) is a retirement savings scheme. Typically, 12% of basic salary is deducted from employee salary, and the employer contributes an equal amount. The calculation is capped at ₹15,000 basic salary per month.',
              },
              {
                question: 'What is professional tax and how is it calculated?',
                answer: 'Professional tax is a state-level employment tax levied on salaried individuals. The amount varies by state, with a maximum cap of ₹2,500 per year. It depends on your monthly salary slab as per state regulations.',
              },
              {
                question: 'Is bonus included in take-home salary?',
                answer: 'Bonuses are typically part of CTC but not included in monthly take-home salary. They are usually paid separately as performance bonuses, annual bonuses, or festival bonuses as per company policy.',
              },
              {
                question: 'How accurate is this salary calculator?',
                answer: 'This calculator provides accurate estimates based on the inputs you provide. However, actual take-home may vary slightly due to company-specific policies, state-specific professional tax rates, and other factors.',
              },
              {
                question: 'Can I use this calculator for job offer comparison?',
                answer: 'Yes! This calculator is perfect for comparing different job offers. Enter the CTC and deduction details for each offer to see which one gives you better take-home salary.',
              },
              {
                question: 'What are additional deductions in salary?',
                answer: 'Additional deductions can include health insurance premiums, meal coupons, transport allowances, loan repayments, or any other company-specific or voluntary deductions beyond statutory requirements.',
              },
              {
                question: 'How often should I recalculate my salary?',
                answer: 'Recalculate when you get a salary hike, change jobs, when professional tax rates change in your state, or when your deductions change due to policy updates or personal choices like increasing PF contribution.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border-l-4 border-[#2BAE66] shadow-md">
                <div className="flex items-start">
                  <HelpCircle className="w-6 h-6 text-[#1A3D7C] mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Tips Section */}
        <div className="mt-16 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white p-8 md:p-12 rounded-xl">
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
            <Lightbulb className="w-8 h-8 mr-3" />
            Smart Salary Planning Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'Understand Your Salary Structure',
                tip: 'Request a detailed salary breakup from HR showing all components like basic, HRA, special allowance, and deductions to understand where your money goes.',
              },
              {
                title: 'Maximize Tax Savings',
                tip: 'Utilize all available tax deductions under sections 80C, 80D, and HRA to reduce taxable income and increase take-home salary legally.',
              },
              {
                title: 'Compare Job Offers Wisely',
                tip: 'Don\'t just compare CTC. Always calculate take-home salary considering all deductions, benefits, and perks to make informed career decisions.',
              },
              {
                title: 'Plan Your EPF Wisely',
                tip: 'While EPF is mandatory for basic salary up to ₹15,000, voluntary PF contributions above this can help build a strong retirement corpus.',
              },
              {
                title: 'Budget Based on In-Hand Salary',
                tip: 'Always create your monthly budget based on take-home salary, not CTC. This ensures realistic financial planning and avoids overspending.',
              },
              {
                title: 'Review Annually',
                tip: 'Review your salary structure annually, especially after increments or policy changes, to ensure you\'re getting optimal take-home pay.',
              },
              {
                title: 'Consider Hidden Benefits',
                tip: 'Factor in employer benefits like health insurance, stock options, meal vouchers, and transport allowances when evaluating total compensation.',
              },
            ].map((tip, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border-2 border-white/30">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-300 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                    <p className="text-blue-100">{tip.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Understanding Salary Components */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-[#1A3D7C] mb-8">
            Understanding Salary Components
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200">
              <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Earnings Components</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Basic Salary:</strong> Fixed component, typically 40-50% of CTC</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>HRA:</strong> House Rent Allowance for accommodation expenses</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Special Allowance:</strong> Additional allowances and benefits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>LTA:</strong> Leave Travel Allowance for travel expenses</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Performance Bonus:</strong> Variable pay based on performance</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200">
              <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Deduction Components</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Employee PF:</strong> 12% of basic salary (capped at ₹15,000)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Employer PF:</strong> Employer contribution to PF account</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Professional Tax:</strong> State-specific tax (max ₹2,500/year)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Income Tax:</strong> TDS deducted monthly based on tax slab</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Other Deductions:</strong> Insurance, loans, or voluntary contributions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Book Your Session CTA */}
      <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Need Help with Salary & Tax Calculations?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master percentage calculations, understand deductions, and excel in financial mathematics. Get personalized one-on-one guidance.
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

      <Footer />
    </>
  );
}
