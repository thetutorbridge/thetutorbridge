'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Home, Target, CheckCircle, HelpCircle, Lightbulb, IndianRupee, Award, Briefcase, ArrowRight, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function GratuityCalculatorPage() {
  const [monthlySalary, setMonthlySalary] = useState<number>(60000);
  const [yearsOfService, setYearsOfService] = useState<number>(20);

  // Calculate Gratuity using the formula: G = n × b × 15/26
  // Where n = years of service, b = last drawn basic salary + DA
  const calculateGratuity = () => {
    // Formula: (Years of Service × Monthly Salary × 15) / 26
    const gratuityAmount = (yearsOfService * monthlySalary * 15) / 26;

    // Maximum cap is ₹20 lakh as per latest amendments
    const maxGratuity = 2000000;
    const actualGratuity = Math.min(gratuityAmount, maxGratuity);

    return {
      gratuityAmount: Math.round(actualGratuity),
      isCapped: gratuityAmount > maxGratuity,
      yearsCompleted: yearsOfService,
      isEligible: yearsOfService >= 5
    };
  };

  const results = calculateGratuity();

  // Format currency
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <>
      <Navigation />
      <div className="bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 min-h-screen">
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
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4">
                  Gratuity Calculator
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl">
                  Calculate your gratuity amount as per Payment of Gratuity Act 1972. Free online calculator for employees with 5+ years of continuous service.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Award className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#FFC857]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          {/* Main Calculator */}
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {/* Input Section */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-[#2BAE66]" />
                  Employment Details
                </h2>

                {/* Monthly Salary */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <Label className="text-base font-semibold text-gray-700">Monthly Salary (Basic + DA)</Label>
                    <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                      <IndianRupee className="w-4 h-4 text-gray-600 mr-1" />
                      <Input
                        type="number"
                        value={monthlySalary}
                        onChange={(e) => setMonthlySalary(Number(e.target.value))}
                        className="w-32 border-0 bg-transparent p-0 text-right font-semibold text-[#2BAE66] focus-visible:ring-0"
                      />
                    </div>
                  </div>
                  <Slider
                    value={[monthlySalary]}
                    onValueChange={(value) => setMonthlySalary(value[0])}
                    min={10000}
                    max={500000}
                    step={1000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹10,000</span>
                    <span>₹5,00,000</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Enter your last drawn basic salary plus Dearness Allowance (DA)
                  </p>
                </div>

                {/* Years of Service */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <Label className="text-base font-semibold text-gray-700">Years of Service</Label>
                    <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                      <Input
                        type="number"
                        value={yearsOfService}
                        onChange={(e) => setYearsOfService(Number(e.target.value))}
                        className="w-20 border-0 bg-transparent p-0 text-right font-semibold text-[#2BAE66] focus-visible:ring-0"
                      />
                      <span className="ml-1 text-gray-600 font-semibold">Yrs</span>
                    </div>
                  </div>
                  <Slider
                    value={[yearsOfService]}
                    onValueChange={(value) => setYearsOfService(value[0])}
                    min={1}
                    max={40}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 Year</span>
                    <span>40 Years</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Total years of continuous service with your employer
                  </p>
                </div>

                {/* Eligibility Notice */}
                {!results.isEligible && (
                  <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          <strong>Minimum 5 years of service required:</strong> You need to complete at least 5 years of continuous service to be eligible for gratuity payment.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Formula Explanation */}
                <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-gray-200">
                  <h3 className="text-base font-semibold text-[#1A3D7C] mb-3 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    Calculation Formula
                  </h3>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Gratuity = (Years of Service × Monthly Salary × 15) ÷ 26</strong>
                    </p>
                    <p className="text-xs text-gray-600">
                      For employees covered under the Payment of Gratuity Act 1972 (organizations with 10+ employees)
                    </p>
                  </div>
                  <div className="mt-3 text-xs text-gray-600">
                    <p><strong>Note:</strong> Maximum gratuity cap is ₹20 lakh as per latest amendments. Partial years are rounded to nearest full year.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-6">
                <h3 className="text-lg font-bold text-[#1A3D7C] mb-6 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-[#2BAE66]" />
                  Gratuity Summary
                </h3>

                {/* Results */}
                {results.isEligible ? (
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Years Served</span>
                      <span className="text-lg font-bold text-gray-900">{results.yearsCompleted} Years</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Monthly Salary</span>
                      <span className="text-lg font-bold text-gray-900">{formatCurrency(monthlySalary)}</span>
                    </div>
                    <div className="pt-3 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-4 rounded-xl">
                      <div className="text-sm mb-2">Total Gratuity Payable</div>
                      <div className="text-3xl font-bold">{formatCurrency(results.gratuityAmount)}</div>
                      {results.isCapped && (
                        <div className="text-xs mt-2 bg-white/20 p-2 rounded">
                          Capped at maximum limit of ₹20 lakh
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 text-sm">
                      You need at least 5 years of service to be eligible for gratuity
                    </p>
                  </div>
                )}

                {/* Tax Information */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="text-sm font-semibold text-[#1A3D7C] mb-2">Tax Exemption</h4>
                  <p className="text-xs text-gray-700">
                    Gratuity up to ₹20 lakh is tax-exempt for private employees. Government employees get full exemption under Section 10(10) of Income Tax Act.
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <Link href="/calculators">
                    <Button className="w-full bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] hover:opacity-90 text-white font-semibold py-6">
                      Explore More Calculators
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Target className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Benefits of Gratuity Calculator
            </h2>
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Instant Calculation
                  </h3>
                  <p className="text-white/90">
                    Quickly calculate your gratuity amount without manual calculations. Get accurate results in seconds based on the official formula prescribed by Payment of Gratuity Act 1972.
                  </p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Retirement Planning
                  </h3>
                  <p className="text-white/90">
                    Plan your retirement corpus effectively by knowing your expected gratuity amount. Factor this into your overall retirement planning for a comfortable post-retirement life.
                  </p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Verify Employer Calculation
                  </h3>
                  <p className="text-white/90">
                    Cross-check the gratuity amount offered by your employer during resignation or retirement. Ensure you receive the correct amount as per legal provisions.
                  </p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Legal Compliance
                  </h3>
                  <p className="text-white/90">
                    Calculator follows the Payment of Gratuity Act 1972 formula. Includes the latest maximum cap of ₹20 lakh and ensures calculations comply with current labor laws.
                  </p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Career Transition Planning
                  </h3>
                  <p className="text-white/90">
                    Understand the financial impact of job changes. Calculate how much gratuity you'll lose if you switch jobs before completing full years of service.
                  </p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Tax Planning Aid
                  </h3>
                  <p className="text-white/90">
                    Know your tax-exempt gratuity limit in advance. Plan your finances better with knowledge of tax-free retirement benefits under Section 10(10) of Income Tax Act.
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-[#FFC857] text-[#1A3D7C] rounded-lg">
                <p className="font-semibold">
                  💡 Pro Tip: Gratuity is tax-exempt up to ₹20 lakh for private sector employees. Any amount above this is taxable as salary income!
                </p>
              </div>
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
                  What is gratuity and who is eligible?
                </h3>
                <p className="text-gray-700 pl-6">
                  Gratuity is a <strong>lump sum payment</strong> made by employers to employees as a token of appreciation for services rendered. You're eligible if you've completed <strong>5 years of continuous service</strong> (or earlier in case of death/disability). Governed by Payment of Gratuity Act 1972 for organizations with 10+ employees.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  How is gratuity calculated?
                </h3>
                <p className="text-gray-700 pl-6">
                  <strong>Formula: (Years of Service × Last Drawn Salary × 15) ÷ 26</strong>. Last drawn salary includes Basic + DA only (not HRA, allowances, or bonus). For example, 10 years service with ₹50,000 salary = (10 × 50,000 × 15) ÷ 26 = ₹2,88,462 gratuity.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  What is the maximum gratuity amount?
                </h3>
                <p className="text-gray-700 pl-6">
                  The <strong>maximum gratuity limit is ₹20 lakh</strong> as per the latest amendment (increased from ₹10 lakh in 2010). Any gratuity amount exceeding this limit is considered "ex gratia" payment and is fully taxable. This cap applies to private sector employees only.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  Is gratuity taxable?
                </h3>
                <p className="text-gray-700 pl-6">
                  <strong>Tax exemption under Section 10(10):</strong> Government employees get full exemption. Private sector employees get exemption up to ₹20 lakh or actual gratuity received, whichever is lower. Amount above ₹20 lakh is taxable as salary. For non-covered employees, minimum of actual, ₹20L, or 15 days salary × years worked is exempt.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  Can I get gratuity if I resign before 5 years?
                </h3>
                <p className="text-gray-700 pl-6">
                  <strong>Generally no.</strong> Minimum 5 years of continuous service is mandatory for gratuity eligibility. However, exceptions exist for: <strong>Death, disability/accident causing termination, or contractual agreements</strong> providing gratuity for shorter tenure. Some companies offer ex-gratia payments voluntarily.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  How are partial years calculated for gratuity?
                </h3>
                <p className="text-gray-700 pl-6">
                  <strong>Partial years are rounded to nearest full year.</strong> If you worked 6 months or more in a year, it counts as 1 full year. Less than 6 months is ignored. For example, 10 years 7 months = 11 years for gratuity calculation. 10 years 4 months = 10 years only.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  When should gratuity be paid?
                </h3>
                <p className="text-gray-700 pl-6">
                  Gratuity must be paid <strong>within 30 days</strong> of becoming due (resignation, retirement, death, or disablement). If delayed beyond 30 days, employer must pay interest @ 10% p.a. Employee can file complaint with Controlling Authority if payment is delayed or disputed.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  Does changing jobs affect gratuity?
                </h3>
                <p className="text-gray-700 pl-6">
                  <strong>Yes, significantly.</strong> You lose gratuity if you resign before 5 years. Service period doesn't carry forward to new employer. If you've completed 5+ years, you get gratuity from current employer when leaving. To maximize gratuity, complete major milestones (5, 10, 15, 20 years) before job changes.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  Can employer deduct gratuity amount?
                </h3>
                <p className="text-gray-700 pl-6">
                  <strong>Yes, in certain cases.</strong> Employer can forfeit gratuity for: Termination due to moral turpitude, willful omission/negligence causing loss, riotous/violent behavior, or if employment is terminated for any act causing damage. Gratuity can be forfeited fully or partially based on severity.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  What documents are needed to claim gratuity?
                </h3>
                <p className="text-gray-700 pl-6">
                  Required documents: <strong>Application Form I (for claim), resignation/retirement letter, relieving letter, Form F (if applicable), ID proof, bank details, and PAN card</strong>. For death cases, nominee/legal heir needs death certificate, succession certificate, and identification documents. Keep salary slips as proof of Basic + DA.
                </p>
              </div>
            </div>
          </section>

          {/* Smart Tips Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Smart Tips About Gratuity
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl border border-gray-200">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Complete full years before resigning:</strong> If you're close to completing another full year (say 9 years 8 months), wait to complete 10 years. The difference in gratuity between 9 and 10 years can be significant - approximately 11% more gratuity for that extra year.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Understand what salary components count:</strong> Only Basic salary + Dearness Allowance (DA) are used for gratuity calculation. HRA, conveyance, medical allowance, bonuses, and commissions are NOT included. Negotiate for higher basic pay rather than allowances if you plan long tenure.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Keep employment records safe:</strong> Maintain copies of appointment letter, salary slips (especially last drawn), increment letters, and relieving documents. These are crucial if there's any dispute about gratuity calculation or entitlement.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>File Form I promptly:</strong> Submit gratuity claim form (Form I) to your employer within prescribed time. Don't delay - employer has 30 days to pay from date of eligibility. Keep acknowledgment copy for records. Follow up if payment is delayed beyond 30 days.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Nominate beneficiaries:</strong> Fill nomination form (Form F) at the time of joining or within prescribed time. Specify who should receive gratuity in case of your death. You can change nominees by submitting fresh Form F. Without nomination, legal heirs face lengthy claim procedures.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Factor gratuity into retirement planning:</strong> For a 30-year career with final salary of ₹1 lakh (Basic + DA), you could get ₹17.3 lakh gratuity tax-free. This is a substantial retirement corpus - plan how to invest it wisely for post-retirement income.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Know your rights during disputes:</strong> If employer refuses gratuity or calculates incorrectly, approach Controlling Authority under Gratuity Act within prescribed time. Authority can order payment with interest @ 10% p.a. for delayed payment. Legal remedy is available - don't let employers deny rightful gratuity.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* Related Calculators Section */}
          <section className="text-center mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-4">
              Explore More Calculators
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Try our other financial calculators for comprehensive investment and loan planning
            </p>
            <Link href="/calculators">
              <Button className="bg-white text-[#1A3D7C] hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
                View All Calculators
              </Button>
            </Link>
          </section>
        </div>

        {/* Book Your Session CTA */}
        <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Need Help with Financial Mathematics?
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                Our expert tutors can help you understand gratuity calculations, percentage mathematics, and financial concepts. Get personalized one-on-one guidance tailored to your learning style.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book-demo-class">
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

      {/* Footer */}
      <footer className="bg-[#1A3D7C] text-white py-8 md:py-12 mt-12 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">The Tutor Bridge</h3>
              <p className="text-white/80 text-sm">
                Your trusted partner for financial planning and investment calculations.
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
              <h3 className="text-lg font-bold mb-4">Disclaimer</h3>
              <p className="text-white/80 text-sm">
                This calculator provides estimates based on Payment of Gratuity Act 1972. Actual gratuity may vary based on company policy. Consult HR for accurate information.
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
            <p>&copy; 2025 The Tutor Bridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
