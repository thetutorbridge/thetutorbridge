'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Baby, Home, ArrowRight, TrendingUp, Shield, GraduationCap, Calculator, Heart, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SSYCalculatorPage() {
  const currentYear = new Date().getFullYear();
  const [yearlyInvestment, setYearlyInvestment] = useState<number>(10000);
  const [girlAge, setGirlAge] = useState<number>(5);
  const [startYear, setStartYear] = useState<number>(currentYear);

  const SSY_INTEREST_RATE = 8.2; // Current SSY interest rate for 2026

  const calculateSSY = () => {
    const annualRate = SSY_INTEREST_RATE / 100;
    const depositYears = 15; // Deposits made for 15 years
    const maturityPeriod = 21; // Account matures after 21 years

    let totalInvestment = yearlyInvestment * depositYears;
    let maturityAmount = 0;

    // Calculate maturity amount
    // Each year's deposit compounds for remaining years until maturity
    for (let year = 1; year <= depositYears; year++) {
      const yearsToCompound = maturityPeriod - year + 1;
      const amountForThisYear = yearlyInvestment * Math.pow(1 + annualRate, yearsToCompound);
      maturityAmount += amountForThisYear;
    }

    const totalInterest = maturityAmount - totalInvestment;
    const maturityYear = startYear + maturityPeriod;

    return {
      totalInvestment: Math.round(totalInvestment),
      totalInterest: Math.round(totalInterest),
      maturityYear: maturityYear,
      maturityValue: Math.round(maturityAmount),
    };
  };

  const results = calculateSSY();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"1. What is the current interest rate for Sukanya Samriddhi Yojana in 2026?","acceptedAnswer":{"@type":"Answer","text":"The current interest rate for SSY is 8.2% per annum (October-December 2026 quarter), compounded annually. The interest rate is revised quarterly by the Government of India based on market conditions. This rate is significantly higher than most other savings schemes and bank fixed deposits."}},{"@type":"Question","name":"2. Can I open an SSY account for my daughter who is 11 years old?","acceptedAnswer":{"@type":"Answer","text":"No, the account can only be opened for a girl child who is below 10 years of age. The age is calculated from the date of birth to the date of account opening. If your daughter has already turned 10, you won\'t be eligible to open an SSY account for her."}},{"@type":"Question","name":"3. How many SSY accounts can I open?","acceptedAnswer":{"@type":"Answer","text":"A maximum of two accounts can be opened by a family - one for each daughter. Only one account per girl child is allowed. In case of twins or triplets born in the second delivery, a third account can be opened with supporting documents. No more than three accounts are permitted under any circumstances."}},{"@type":"Question","name":"4. What happens if I don\'t deposit the minimum amount in a year?","acceptedAnswer":{"@type":"Answer","text":"If you fail to deposit the minimum amount of ₹250 in a financial year, your account will be considered \'discontinued\' or \'defaulted\'. You can revive the account by paying ₹50 penalty for each year of default, along with the minimum deposit for those years. The account will continue to earn interest even if it\'s defaulted."}},{"@type":"Question","name":"5. Can I withdraw money from SSY account before maturity?","acceptedAnswer":{"@type":"Answer","text":"Partial withdrawal of up to 50% of the balance is allowed after the girl child turns 18 years old, specifically for higher education expenses. The account can be prematurely closed after the girl turns 18 for marriage purposes. In case of medical emergency or death of the account holder, premature closure is allowed with supporting documents."}},{"@type":"Question","name":"6. What are the tax benefits of SSY?","acceptedAnswer":{"@type":"Answer","text":"SSY enjoys EEE (Exempt-Exempt-Exempt) tax status. Investment up to ₹1.5 lakh qualifies for deduction under Section 80C of Income Tax Act. The interest earned is completely tax-free, and the maturity amount is also fully exempt from tax. This makes SSY one of the most tax-efficient investment options available."}},{"@type":"Question","name":"7. Where can I open a Sukanya Samriddhi Account?","acceptedAnswer":{"@type":"Answer","text":"SSY accounts can be opened at any post office across India or at authorized branches of commercial banks including SBI, PNB, ICICI Bank, HDFC Bank, Axis Bank, and many others. You need to submit the account opening form along with the girl child\'s birth certificate and KYC documents of the guardian."}},{"@type":"Question","name":"8. When does the SSY account mature?","acceptedAnswer":{"@type":"Answer","text":"The SSY account matures 21 years from the date of account opening. For example, if you open the account in 2026, it will mature in 2046. However, deposits need to be made only for the first 15 years. From year 16 to 21, the account continues to earn interest but no deposits are required or allowed."}}]}' }}
      />
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
              <span className="hidden sm:inline">SSY Calculator</span>
              <span className="sm:hidden">SSY</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Baby className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              Sukanya Samriddhi Yojana Calculator
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-6">
            Calculate maturity amount for your daughter's future with SSY - a government-backed savings scheme offering 8.2% interest rate with complete tax benefits.
          </p>
          <div className="bg-white/10 p-3 md:p-4 rounded-xl mb-4">
            <p className="text-xl md:text-2xl font-bold break-words text-[#FFC857]">
              Latest SSY Rate = {SSY_INTEREST_RATE}%
            </p>
            <p className="text-sm text-white/80 mt-1">Compounded Annually | Fully Tax-Free Returns</p>
          </div>
          <div className="bg-white/10 p-3 md:p-4 rounded-xl">
            <p className="text-lg italic">
              Beti Bachao, Beti Padhao - Secure Your Daughter's Future<br />
              <strong>Government-backed | Tax Benefits under Section 80C</strong>
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
                  Calculate SSY Maturity Amount
                </h2>

                <div className="space-y-6">
                  {/* Yearly Investment */}
                  <div>
                    <div className="flex justify-between items-center mb-3 gap-2">
                      <Label className="text-sm md:text-base font-semibold text-gray-700 flex-shrink-0">Yearly Investment</Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <span className="text-xs md:text-sm text-gray-500">₹</span>
                        <Input
                          type="number"
                          value={yearlyInvestment}
                          onChange={(e) => setYearlyInvestment(Number(e.target.value))}
                          className="w-20 md:w-32 text-right text-sm md:text-base"
                        />
                      </div>
                    </div>
                    <Slider
                      value={[yearlyInvestment]}
                      onValueChange={(value) => setYearlyInvestment(value[0])}
                      min={250}
                      max={150000}
                      step={250}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹250</span>
                      <span>₹1,50,000</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Min: ₹250 | Max: ₹1,50,000 per year
                    </p>
                  </div>

                  {/* Girl's Age */}
                  <div>
                    <div className="flex justify-between items-center mb-3 gap-2">
                      <Label className="text-sm md:text-base font-semibold text-gray-700 flex-shrink-0">Girl's Age</Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Input
                          type="number"
                          value={girlAge}
                          onChange={(e) => setGirlAge(Number(e.target.value))}
                          className="w-16 md:w-24 text-right text-sm md:text-base"
                        />
                        <span className="text-xs md:text-sm text-gray-500">Years</span>
                      </div>
                    </div>
                    <Slider
                      value={[girlAge]}
                      onValueChange={(value) => setGirlAge(value[0])}
                      min={0}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0 Year</span>
                      <span>10 Years</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Account can be opened for girls below 10 years
                    </p>
                  </div>

                  {/* Start Year */}
                  <div>
                    <div className="flex justify-between items-center mb-3 gap-2">
                      <Label className="text-sm md:text-base font-semibold text-gray-700 flex-shrink-0">Start Period</Label>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Input
                          type="number"
                          value={startYear}
                          onChange={(e) => setStartYear(Number(e.target.value))}
                          className="w-20 md:w-28 text-right text-sm md:text-base"
                        />
                      </div>
                    </div>
                    <Slider
                      value={[startYear]}
                      onValueChange={(value) => setStartYear(value[0])}
                      min={2014}
                      max={currentYear + 5}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>2014</span>
                      <span>{currentYear + 5}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      SSY scheme launched in 2014
                    </p>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] p-4 md:p-8 rounded-2xl shadow-xl text-white">
                <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6 mr-2 text-[#FFC857]" />
                  Your SSY Maturity Details
                </h2>

                <div className="space-y-4">
                  <div className="bg-white/10 p-3 md:p-4 rounded-xl backdrop-blur">
                    <p className="text-sm text-white/80 mb-1">Total Investment</p>
                    <p className="text-xl md:text-2xl font-bold break-words text-[#FFC857]">
                      {formatCurrency(results.totalInvestment)}
                    </p>
                    <p className="text-xs text-white/70 mt-1">
                      ₹{yearlyInvestment.toLocaleString('en-IN')} × 15 years
                    </p>
                  </div>

                  <div className="bg-white/10 p-3 md:p-4 rounded-xl backdrop-blur">
                    <p className="text-sm text-white/80 mb-1">Total Interest</p>
                    <p className="text-xl md:text-2xl font-bold break-words text-[#FFC857]">
                      {formatCurrency(results.totalInterest)}
                    </p>
                    <p className="text-xs text-white/70 mt-1">
                      At {SSY_INTEREST_RATE}% p.a. (compounded yearly)
                    </p>
                  </div>

                  <div className="bg-white/10 p-3 md:p-4 rounded-xl backdrop-blur">
                    <p className="text-sm text-white/80 mb-1">Maturity Year</p>
                    <p className="text-xl md:text-2xl font-bold break-words text-[#FFC857]">
                      {results.maturityYear}
                    </p>
                    <p className="text-xs text-white/70 mt-1">
                      21 years from account opening
                    </p>
                  </div>

                  <div className="bg-white/20 p-4 md:p-6 rounded-xl backdrop-blur border-2 border-[#FFC857]">
                    <p className="text-sm text-white/80 mb-1">Maturity Value</p>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold break-words text-[#FFC857]">
                      {formatCurrency(results.maturityValue)}
                    </p>
                    <p className="text-xs text-white/70 mt-2">
                      ✓ Completely Tax-Free | ✓ Government Guaranteed
                    </p>
                  </div>

                  <div className="bg-white/10 p-3 md:p-4 rounded-xl backdrop-blur">
                    <p className="text-xs text-white/70">
                      <strong>Note:</strong> Interest rate is subject to quarterly revision by the Government of India. Current rate: {SSY_INTEREST_RATE}% (Q4 2026-25).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What is SSY Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-[#1A3D7C]/5 to-[#2BAE66]/5 p-8 rounded-2xl border border-[#2BAE66]/20">
              <h2 className="text-xl md:text-2xl lg:text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6">
                What is Sukanya Samriddhi Yojana (SSY)?
              </h2>
              <div className="prose max-w-none text-gray-700 space-y-4">
                <p className="text-lg leading-relaxed">
                  Sukanya Samriddhi Yojana (SSY) is a government-backed savings scheme launched under the "Beti Bachao, Beti Padhao" campaign in 2014. It is designed to secure the financial future of the girl child by providing attractive interest rates and tax benefits to parents or legal guardians.
                </p>
                <p className="text-lg leading-relaxed">
                  The scheme can be opened at any post office or authorized commercial banks across India. It offers one of the highest interest rates among all government-backed savings schemes, currently at 8.2% per annum, which is compounded yearly and completely tax-free.
                </p>
                <p className="text-lg leading-relaxed">
                  SSY is an excellent long-term investment option for parents who want to build a substantial corpus for their daughter's higher education and marriage expenses, with the added benefit of complete tax exemption on both investment and returns.
                </p>
              </div>
            </div>
          </section>

          {/* Key Features Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6">
              Key Features of Sukanya Samriddhi Yojana
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3 gap-2">High Interest Rate</h3>
                <p className="text-gray-700">
                  Current interest rate of 8.2% p.a. compounded annually - one of the highest among all government savings schemes.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3 gap-2">Triple Tax Benefits</h3>
                <p className="text-gray-700">
                  Eligible for deduction under Section 80C, interest earned is tax-free, and maturity amount is completely tax-exempt (EEE status).
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3 gap-2">Partial Withdrawal</h3>
                <p className="text-gray-700">
                  Withdraw up to 50% of the balance after the girl turns 18 for higher education expenses without penalty.
                </p>
              </div>
            </div>
          </section>

          {/* How SSY Works */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6">
              How Does Sukanya Samriddhi Yojana Work?
            </h2>
            <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">Account Opening</h3>
                    <p className="text-gray-700">
                      Parents or legal guardians can open an SSY account for a girl child below 10 years of age at any post office or authorized bank. Only one account per girl child is allowed, and a maximum of two accounts per family (for two daughters).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">Deposit Period (15 Years)</h3>
                    <p className="text-gray-700">
                      Deposits can be made for 15 years from the date of account opening. Minimum deposit is ₹250 per year and maximum is ₹1,50,000 per financial year. Deposits can be made in lump sum or installments.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">Interest Accrual (Years 16-21)</h3>
                    <p className="text-gray-700">
                      After 15 years, no more deposits are required, but the account continues to earn interest at the applicable rate until maturity. The interest is compounded annually and credited to the account.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#2BAE66] rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">Maturity (21 Years)</h3>
                    <p className="text-gray-700">
                      The account matures 21 years from the date of opening. At maturity, the entire amount (principal + interest) can be withdrawn tax-free. The account can also be closed after the girl turns 18 for marriage purposes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Eligibility & Rules Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Eligibility Criteria & Important Rules
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-[#FFC857] mb-3 text-lg">✓ Who Can Open SSY Account?</h3>
                  <ul className="space-y-2 text-white/90">
                    <li>• Parents or legal guardians of a girl child</li>
                    <li>• Girl child must be below 10 years of age</li>
                    <li>• Only Indian residents are eligible</li>
                    <li>• Maximum two accounts per family (two daughters)</li>
                    <li>• In case of twins/triplets, third account allowed with proof</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[#FFC857] mb-3 text-lg">✓ Deposit Rules</h3>
                  <ul className="space-y-2 text-white/90">
                    <li>• Minimum deposit: ₹250 per year</li>
                    <li>• Maximum deposit: ₹1,50,000 per year</li>
                    <li>• Deposits can be made until 15 years</li>
                    <li>• Deposits in cash, cheque, DD, or online transfer</li>
                    <li>• Penalty of ₹50/year if minimum deposit not made</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[#FFC857] mb-3 text-lg">✓ Withdrawal Rules</h3>
                  <ul className="space-y-2 text-white/90">
                    <li>• Partial withdrawal: 50% after girl turns 18</li>
                    <li>• Purpose: Higher education expenses only</li>
                    <li>• Premature closure: After girl turns 18 for marriage</li>
                    <li>• Closure on death of account holder allowed</li>
                    <li>• Closure on medical grounds with documentation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[#FFC857] mb-3 text-lg">✓ Account Transfer & Operation</h3>
                  <ul className="space-y-2 text-white/90">
                    <li>• Account transferable across India</li>
                    <li>• Girl can operate account after turning 18</li>
                    <li>• Before 18, guardian operates the account</li>
                    <li>• Interest rate revised quarterly by government</li>
                    <li>• Passbook issued for tracking deposits</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-xl md:text-2xl lg:text-3xl font-bold break-words text-[#1A3D7C] mb-6">
              Benefits of Sukanya Samriddhi Yojana
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex gap-3 mb-3 gap-2">
                  <Shield className="w-6 h-6 text-[#2BAE66] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#1A3D7C] mb-2">Government-Backed Security</h3>
                    <p className="text-gray-700 text-sm">
                      Being a government scheme, SSY offers 100% safety and security. Your investment is backed by the Government of India, ensuring zero risk of capital loss.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex gap-3 mb-3 gap-2">
                  <TrendingUp className="w-6 h-6 text-[#2BAE66] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#1A3D7C] mb-2">Highest Returns Among Small Savings</h3>
                    <p className="text-gray-700 text-sm">
                      SSY offers one of the highest interest rates (8.2% currently) among all government-backed small savings schemes, helping your money grow faster.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex gap-3 mb-3 gap-2">
                  <Heart className="w-6 h-6 text-[#2BAE66] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#1A3D7C] mb-2">Complete Tax Exemption (EEE)</h3>
                    <p className="text-gray-700 text-sm">
                      Enjoy triple tax benefits - investment qualifies for 80C deduction (up to ₹1.5L), interest is tax-free, and maturity amount is completely exempt from tax.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex gap-3 mb-3 gap-2">
                  <GraduationCap className="w-6 h-6 text-[#2BAE66] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#1A3D7C] mb-2">Flexible Withdrawal for Education</h3>
                    <p className="text-gray-700 text-sm">
                      Access 50% of the balance after your daughter turns 18 for higher education needs, ensuring funds are available when needed most.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex gap-3 mb-3 gap-2">
                  <Calculator className="w-6 h-6 text-[#2BAE66] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#1A3D7C] mb-2">Low Minimum Investment</h3>
                    <p className="text-gray-700 text-sm">
                      Start investing with just ₹250 per year, making it accessible to families from all economic backgrounds to secure their daughter's future.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex gap-3 mb-3 gap-2">
                  <ArrowRight className="w-6 h-6 text-[#2BAE66] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#1A3D7C] mb-2">Easy Account Transfer</h3>
                    <p className="text-gray-700 text-sm">
                      Transfer your SSY account from one post office/bank to another anywhere in India free of cost, offering complete flexibility.
                    </p>
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
                  1. What is the current interest rate for Sukanya Samriddhi Yojana in 2026?
                </h3>
                <p className="text-gray-700">
                  The current interest rate for SSY is 8.2% per annum (October-December 2026 quarter), compounded annually. The interest rate is revised quarterly by the Government of India based on market conditions. This rate is significantly higher than most other savings schemes and bank fixed deposits.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  2. Can I open an SSY account for my daughter who is 11 years old?
                </h3>
                <p className="text-gray-700">
                  No, the account can only be opened for a girl child who is below 10 years of age. The age is calculated from the date of birth to the date of account opening. If your daughter has already turned 10, you won't be eligible to open an SSY account for her.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  3. How many SSY accounts can I open?
                </h3>
                <p className="text-gray-700">
                  A maximum of two accounts can be opened by a family - one for each daughter. Only one account per girl child is allowed. In case of twins or triplets born in the second delivery, a third account can be opened with supporting documents. No more than three accounts are permitted under any circumstances.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  4. What happens if I don't deposit the minimum amount in a year?
                </h3>
                <p className="text-gray-700">
                  If you fail to deposit the minimum amount of ₹250 in a financial year, your account will be considered "discontinued" or "defaulted". You can revive the account by paying ₹50 penalty for each year of default, along with the minimum deposit for those years. The account will continue to earn interest even if it's defaulted.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  5. Can I withdraw money from SSY account before maturity?
                </h3>
                <p className="text-gray-700">
                  Partial withdrawal of up to 50% of the balance is allowed after the girl child turns 18 years old, specifically for higher education expenses. The account can be prematurely closed after the girl turns 18 for marriage purposes. In case of medical emergency or death of the account holder, premature closure is allowed with supporting documents.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  6. What are the tax benefits of SSY?
                </h3>
                <p className="text-gray-700">
                  SSY enjoys EEE (Exempt-Exempt-Exempt) tax status. Investment up to ₹1.5 lakh qualifies for deduction under Section 80C of Income Tax Act. The interest earned is completely tax-free, and the maturity amount is also fully exempt from tax. This makes SSY one of the most tax-efficient investment options available.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  7. Where can I open a Sukanya Samriddhi Account?
                </h3>
                <p className="text-gray-700">
                  SSY accounts can be opened at any post office across India or at authorized branches of commercial banks including SBI, PNB, ICICI Bank, HDFC Bank, Axis Bank, and many others. You need to submit the account opening form along with the girl child's birth certificate and KYC documents of the guardian.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  8. When does the SSY account mature?
                </h3>
                <p className="text-gray-700">
                  The SSY account matures 21 years from the date of account opening. For example, if you open the account in 2026, it will mature in 2046. However, deposits need to be made only for the first 15 years. From year 16 to 21, the account continues to earn interest but no deposits are required or allowed.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  9. Can I transfer my SSY account to another bank or post office?
                </h3>
                <p className="text-gray-700">
                  Yes, you can transfer your SSY account from one post office/bank to another anywhere in India free of cost. You need to submit a transfer request along with the passbook at the current branch. The account can be transferred for the convenience of the depositor or if the account holder relocates to a different city.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-2 text-lg">
                  10. What happens to the SSY account after the girl child gets married?
                </h3>
                <p className="text-gray-700">
                  The account can be closed after the girl child turns 18 and gets married. The closure before maturity is allowed only for marriage purposes. You need to submit a marriage certificate or affidavit along with the closure request. If the girl marries before 18 or after 21 years, the account continues until normal maturity of 21 years.
                </p>
              </div>

            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Help Planning Your Daughter's Future?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Our expert financial mentors can guide you through SSY and other investment options to secure the best future for your child.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tutoring/free-consultation">
                  <button className="bg-[#FFC857] text-[#1A3D7C] px-8 py-3 rounded-xl font-semibold hover:bg-[#FFC857]/90 transition-colors">
                    Book Free Consultation
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

      {/* Book Your Session CTA */}
      <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Need Help with Investment & Interest Calculations?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you understand compound interest, investment growth, and financial planning mathematics. Get personalized one-on-one guidance.
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

      {/* Footer */}
      <footer className="bg-[#1A3D7C] text-white py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
                <span className="text-xl font-bold">The Tutor Bridge</span>
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
                <li><Link href="/homework-help" className="hover:text-[#2BAE66] transition-colors">Doubt Solving</Link></li>
                <li><Link href="/career-guidance" className="hover:text-[#2BAE66] transition-colors">Career Guidance</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p>info@thetutorbridge.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2026 The Tutor Bridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
