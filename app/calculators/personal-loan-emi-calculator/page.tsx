'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Wallet, Home, ArrowRight, TrendingUp, Shield, Clock, Calculator, CreditCard, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PersonalLoanEMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [interestRate, setInterestRate] = useState<number>(12);
  const [loanTenure, setLoanTenure] = useState<number>(3);

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure * 12;

    // EMI Formula: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                (Math.pow(1 + monthlyRate, months) - 1);

    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;

    return {
      monthlyEMI: Math.round(emi),
      principalAmount: principal,
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
    };
  };

  const results = calculateEMI();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto">
            <Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center whitespace-nowrap">
              <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/calculators" className="text-[#1A3D7C] hover:text-[#2BAE66] whitespace-nowrap">
              Calculators
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 truncate">
              <span className="hidden sm:inline">Personal Loan EMI Calculator</span>
              <span className="sm:hidden">Personal Loan</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Wallet className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              Personal Loan EMI Calculator
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Calculate EMI for personal loans instantly. Get quick estimates for medical emergencies, weddings, education, travel, or debt consolidation with accurate monthly payment calculations.
          </p>
          <div className="bg-white/10 p-3 md:p-4 rounded-xl mb-8">
            <p className="text-lg italic">
              Instant Approvals, Minimal Documentation, Quick Disbursal<br />
              <strong>Plan Your Personal Loan Repayment Today</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">

          {/* Calculator Section */}
          <section className="mb-12">
            <div className="grid lg:grid-cols-2 gap-8">

              {/* Input Section */}
              <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-xl md:text-xl md:text-2xl font-bold break-words text-[#1A3D7C] mb-6 flex items-center">
                  <Calculator className="w-5 h-5 md:w-6 md:h-6 mr-2 text-[#2BAE66]" />
                  Calculate Personal Loan EMI
                </h2>

                <div className="space-y-6">
                  {/* Loan Amount */}
                  <div>
                    <div className="flex justify-between items-center mb-3 gap-2">
                      <Label className="text-sm md:text-base font-semibold text-gray-700 flex-shrink-0">Loan Amount</Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <span className="text-xs md:text-sm text-gray-500">₹</span>
                        <Input
                          type="number"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(Number(e.target.value))}
                          className="w-20 md:w-32 text-right text-sm md:text-base"
                        />
                      </div>
                    </div>
                    <Slider
                      value={[loanAmount]}
                      onValueChange={(value) => setLoanAmount(value[0])}
                      min={10000}
                      max={5000000}
                      step={10000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹10,000</span>
                      <span>₹50 Lakhs</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <div className="flex justify-between items-center mb-3 gap-2">
                      <Label className="text-sm md:text-base font-semibold text-gray-700 flex-shrink-0">Rate of Interest (p.a.)</Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Input
                          type="number"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="w-16 md:w-24 text-right text-sm md:text-base"
                          step="0.1"
                        />
                        <span className="text-xs md:text-sm text-gray-500">%</span>
                      </div>
                    </div>
                    <Slider
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      min={8}
                      max={24}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>8%</span>
                      <span>24%</span>
                    </div>
                  </div>

                  {/* Loan Tenure */}
                  <div>
                    <div className="flex justify-between items-center mb-3 gap-2">
                      <Label className="text-sm md:text-base font-semibold text-gray-700 flex-shrink-0">Loan Tenure</Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Input
                          type="number"
                          value={loanTenure}
                          onChange={(e) => setLoanTenure(Number(e.target.value))}
                          className="w-16 md:w-24 text-right text-sm md:text-base"
                        />
                        <span className="text-xs md:text-sm text-gray-500">Years</span>
                      </div>
                    </div>
                    <Slider
                      value={[loanTenure]}
                      onValueChange={(value) => setLoanTenure(value[0])}
                      min={1}
                      max={7}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 Year</span>
                      <span>7 Years</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] p-4 md:p-8 rounded-2xl shadow-xl text-white">
                <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6 mr-2 text-[#FFC857]" />
                  Your EMI Breakdown
                </h2>

                <div className="space-y-4">
                  <div className="bg-white/20 p-4 md:p-6 rounded-xl backdrop-blur border-2 border-[#FFC857]">
                    <p className="text-sm text-white/80 mb-1">Monthly EMI</p>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold break-words text-[#FFC857]">
                      {formatCurrency(results.monthlyEMI)}
                    </p>
                    <p className="text-xs text-white/70 mt-2">
                      Pay this amount every month for {loanTenure} years
                    </p>
                  </div>

                  <div className="bg-white/10 p-3 md:p-4 rounded-xl backdrop-blur">
                    <p className="text-sm text-white/80 mb-1">Principal Amount</p>
                    <p className="text-xl md:text-2xl font-bold break-words text-[#FFC857]">
                      {formatCurrency(results.principalAmount)}
                    </p>
                    <p className="text-xs text-white/70 mt-1">
                      Loan amount borrowed
                    </p>
                  </div>

                  <div className="bg-white/10 p-3 md:p-4 rounded-xl backdrop-blur">
                    <p className="text-sm text-white/80 mb-1">Total Interest</p>
                    <p className="text-xl md:text-2xl font-bold break-words text-[#FFC857]">
                      {formatCurrency(results.totalInterest)}
                    </p>
                    <p className="text-xs text-white/70 mt-1">
                      Interest paid over {loanTenure} years at {interestRate}% p.a.
                    </p>
                  </div>

                  <div className="bg-white/10 p-3 md:p-4 rounded-xl backdrop-blur">
                    <p className="text-sm text-white/80 mb-1">Total Amount Payable</p>
                    <p className="text-xl md:text-2xl font-bold break-words text-[#FFC857]">
                      {formatCurrency(results.totalAmount)}
                    </p>
                    <p className="text-xs text-white/70 mt-1">
                      Principal + Interest over loan tenure
                    </p>
                  </div>

                  <div className="bg-white/10 p-3 md:p-4 rounded-xl backdrop-blur">
                    <p className="text-xs text-white/70">
                      <strong>Note:</strong> EMI calculations are based on reducing balance method. Actual EMI may vary based on bank processing fees and other charges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What is Personal Loan Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-[#1A3D7C]/5 to-[#2BAE66]/5 p-8 rounded-2xl border border-[#2BAE66]/20">
              <h2 className="text-xl md:text-2xl lg:text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6">
                What is a Personal Loan?
              </h2>
              <div className="prose max-w-none text-gray-700 space-y-4">
                <p className="text-lg leading-relaxed">
                  A personal loan is an unsecured loan that you can borrow from banks, NBFCs, or online lenders for any personal use without providing collateral. Unlike home or car loans that are tied to specific assets, personal loans offer complete flexibility in how you use the funds.
                </p>
                <p className="text-lg leading-relaxed">
                  Personal loans are ideal for medical emergencies, weddings, education expenses, home renovation, travel, debt consolidation, or any urgent financial need. They typically come with fixed interest rates, fixed tenure (1-7 years), and require minimal documentation with quick disbursal often within 24-48 hours.
                </p>
                <p className="text-lg leading-relaxed">
                  Since these are unsecured loans, interest rates are higher (8-24% p.a.) compared to secured loans, and approval depends mainly on your credit score, income stability, and repayment capacity.
                </p>
              </div>
            </div>
          </section>

          {/* Personal Loan Uses */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6">
              Common Uses of Personal Loans
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3 gap-2">💍 Weddings & Events</h3>
                <p className="text-gray-700">
                  Cover wedding expenses, engagement ceremonies, destination weddings, or other major life events with flexible repayment options.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3 gap-2">🏥 Medical Emergencies</h3>
                <p className="text-gray-700">
                  Get instant funds for hospitalization, surgeries, treatments, or medical procedures not covered by insurance.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3 gap-2">🎓 Education Expenses</h3>
                <p className="text-gray-700">
                  Finance higher education, professional courses, certifications, or skill development programs for yourself or family.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3 gap-2">🏠 Home Renovation</h3>
                <p className="text-gray-700">
                  Upgrade or renovate your home, buy furniture, electronics, or carry out repairs without touching your savings.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3 gap-2">✈️ Travel & Vacation</h3>
                <p className="text-gray-700">
                  Fund your dream vacation, honeymoon, international trip, or family holiday with easy EMI options.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3 gap-2">💳 Debt Consolidation</h3>
                <p className="text-gray-700">
                  Combine multiple high-interest debts (credit cards, other loans) into one personal loan with lower interest rate.
                </p>
              </div>
            </div>
          </section>

          {/* Eligibility Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Personal Loan Eligibility & Requirements
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-[#FFC857] mb-3 text-lg">✓ Eligibility Criteria</h3>
                  <ul className="space-y-2 text-white/90">
                    <li>• Age: 21 to 60 years (varies by lender)</li>
                    <li>• Minimum income: ₹15,000 - ₹25,000 per month</li>
                    <li>• Employment: Salaried or self-employed for 2+ years</li>
                    <li>• Credit Score: 750+ for best rates, 650+ minimum</li>
                    <li>• Residence: Indian citizen or NRI</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[#FFC857] mb-3 text-lg">✓ Documents Required</h3>
                  <ul className="space-y-2 text-white/90">
                    <li>• Identity Proof: Aadhaar, PAN, Passport, Voter ID</li>
                    <li>• Address Proof: Utility bills, Rental agreement</li>
                    <li>• Income Proof: Salary slips (3 months), Bank statements (6 months)</li>
                    <li>• For Self-Employed: ITR, Business proof, Financial statements</li>
                    <li>• Passport size photographs</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Smart Tips Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6">
              Smart Tips for Personal Loans
            </h2>
            <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-1">Check Your Credit Score First</h3>
                      <p className="text-gray-700 text-sm">
                        A credit score of 750+ gets you the best interest rates. Improve your score before applying by paying existing debts on time.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-1">Compare Interest Rates</h3>
                      <p className="text-gray-700 text-sm">
                        Different banks offer different rates. Even a 0.5% difference can save thousands over the loan tenure. Compare before finalizing.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-1">Borrow Only What You Need</h3>
                      <p className="text-gray-700 text-sm">
                        Don't overborrow just because you're eligible for a higher amount. Borrow only what's necessary to avoid unnecessary interest burden.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-1">Choose Shorter Tenure If Possible</h3>
                      <p className="text-gray-700 text-sm">
                        Shorter tenure means higher EMI but significantly lower total interest. Pay off quickly if you can afford higher EMI.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-1">Read Fine Print Carefully</h3>
                      <p className="text-gray-700 text-sm">
                        Check for processing fees (1-3%), prepayment charges, late payment penalties, and other hidden costs before signing.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-1">Consider Prepayment Options</h3>
                      <p className="text-gray-700 text-sm">
                        Choose loans with zero or minimal prepayment charges. Prepaying reduces interest burden significantly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  1. What is the maximum personal loan amount I can get?
                </h3>
                <p className="text-gray-700">
                  Personal loan amounts typically range from ₹10,000 to ₹40 lakhs depending on your income, credit score, and lender policies. Most banks offer up to 10-20 times your monthly salary. For example, if you earn ₹50,000/month, you may be eligible for ₹5-10 lakhs. Higher amounts require excellent credit scores (750+) and strong income proof.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  2. What credit score is needed for a personal loan?
                </h3>
                <p className="text-gray-700">
                  While the minimum credit score is typically 650-700, a score of 750 or above is recommended for best interest rates and quick approval. Scores between 700-750 get moderate rates, while below 650 may face rejection or very high interest rates (18-24%). Check your CIBIL score before applying and improve it if needed by clearing existing debts.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  3. How long does personal loan approval take?
                </h3>
                <p className="text-gray-700">
                  Modern digital lenders offer instant approval and disbursal within 24-48 hours if you have all documents ready and a good credit score. Traditional banks may take 3-7 days. Pre-approved loans for existing customers can be disbursed in hours. Delays happen due to incomplete documentation, low credit scores, or verification issues.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  4. Can I prepay my personal loan without penalty?
                </h3>
                <p className="text-gray-700">
                  As per RBI guidelines, there's no prepayment penalty on floating rate personal loans. However, fixed-rate loans may have prepayment charges (2-5% of outstanding amount). Some lenders waive charges after a lock-in period (12 months). Always check your loan agreement for prepayment terms before taking the loan.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  5. What happens if I miss an EMI payment?
                </h3>
                <p className="text-gray-700">
                  Missing an EMI attracts late payment charges (₹500-1000 or 2% of EMI), affects your credit score negatively, and may lead to penalty interest. Continuous defaults (90+ days) make the loan NPA (Non-Performing Asset), severely damaging credit score and making future loans difficult. If facing issues, contact your lender immediately to discuss restructuring options.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  6. Is personal loan interest tax deductible?
                </h3>
                <p className="text-gray-700">
                  Generally, personal loan interest is NOT tax deductible. However, if you use the loan for business purposes, you can claim interest as business expense. If used for buying/renovating a house, you may claim deduction under Section 24(b) up to ₹2 lakhs. Always maintain proper documentation and consult a tax advisor.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  7. Can I get a personal loan with a low salary?
                </h3>
                <p className="text-gray-700">
                  Yes, many lenders offer personal loans with minimum salary requirement of ₹15,000-25,000 per month. However, lower salaries typically mean lower loan amounts (₹50,000-2 lakhs) and higher interest rates. Having a good credit score, stable employment (2+ years), and additional income sources can help. Some NBFCs are more flexible than banks for low-income applicants.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  8. What are the processing fees for personal loans?
                </h3>
                <p className="text-gray-700">
                  Processing fees typically range from 1% to 3% of the loan amount plus GST. For a ₹3 lakh loan, you may pay ₹3,000-9,000 as processing fee. Some lenders waive fees during special offers or for existing customers. This fee is non-refundable even if your loan gets rejected. Always factor in processing fees when calculating total loan cost.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  9. Can self-employed individuals get personal loans?
                </h3>
                <p className="text-gray-700">
                  Yes, self-employed professionals and business owners can get personal loans but requirements are stricter. You need ITR for last 2-3 years, business vintage of 3+ years, bank statements showing regular income, and good credit score. Interest rates may be slightly higher (0.5-1% more) than salaried individuals. Ensure your ITR shows sufficient income to support the EMI.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  10. Should I take a personal loan or use my credit card?
                </h3>
                <p className="text-gray-700">
                  Personal loans are better for large amounts (₹1 lakh+) with interest rates of 10-16%, while credit cards charge 36-42% p.a. For emergencies under ₹50,000 that you can repay in 1-2 months, credit cards work. For longer tenures or bigger amounts, personal loans save significant interest. Credit cards offer flexibility and rewards, while loans have fixed EMI and tenure. Choose based on amount, repayment timeline, and total cost.
                </p>
              </div>

            </div>
          </section>

          {/* Book Your Session CTA Section */}
          <section className="text-center py-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] via-[#2BAE66] to-[#1A3D7C] text-white p-12 rounded-2xl shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-[#FFC857] mr-3" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  Need Help with EMI & Interest Calculations?
                </h2>
              </div>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Our expert tutors can help you understand EMI calculations, interest mathematics, and financial planning concepts. Get personalized one-on-one guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book-demo-class">
                  <button className="bg-[#FFC857] text-[#1A3D7C] px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#1A3D7C] transition-colors flex items-center justify-center gap-2">
                    Book Your Session
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#1A3D7C] transition-colors">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A3D7C] text-white py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
                <span className="text-xl font-bold">The TutorBridge</span>
              </div>
              <p className="text-gray-300 mb-4">
                Empowering students with personalized education and career guidance for a brighter future.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/study-resources" className="hover:text-[#2BAE66] transition-colors">Study Resources</Link></li>
                <li><Link href="/calculators" className="hover:text-[#2BAE66] transition-colors">Calculators</Link></li>
                <li><Link href="/doubt-solving" className="hover:text-[#2BAE66] transition-colors">Doubt Solving</Link></li>
                <li><Link href="/career-guidance" className="hover:text-[#2BAE66] transition-colors">Career Guidance</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p>+91 9310096171</p>
                <p>info@thetutorbridge.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 The TutorBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
