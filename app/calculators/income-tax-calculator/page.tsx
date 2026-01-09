'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Home, Target, CheckCircle, HelpCircle, Lightbulb, IndianRupee, FileText, PieChart, BarChart3, ArrowRight, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function IncomeTaxCalculatorPage() {
  // Assessment year and age
  const [assessmentYear, setAssessmentYear] = useState<string>('2026-2026');
  const [ageCategory, setAgeCategory] = useState<string>('below60');

  // Income fields
  const [grossSalary, setGrossSalary] = useState<number>(0);
  const [otherIncome, setOtherIncome] = useState<number>(0);
  const [interestIncome, setInterestIncome] = useState<number>(0);
  const [rentalIncome, setRentalIncome] = useState<number>(0);
  const [homeLoanInterestSelfOccupied, setHomeLoanInterestSelfOccupied] = useState<number>(0);
  const [homeLoanInterestLetOut, setHomeLoanInterestLetOut] = useState<number>(0);

  // Deductions
  const [deduction80C, setDeduction80C] = useState<number>(0);
  const [npsDeduction, setNpsDeduction] = useState<number>(0);
  const [medicalInsurance, setMedicalInsurance] = useState<number>(0);
  const [charityDonation, setCharityDonation] = useState<number>(0);
  const [educationLoanInterest, setEducationLoanInterest] = useState<number>(0);
  const [savingsInterest, setSavingsInterest] = useState<number>(0);

  // HRA fields
  const [basicSalary, setBasicSalary] = useState<number>(0);
  const [daReceived, setDaReceived] = useState<number>(0);
  const [hraReceived, setHraReceived] = useState<number>(0);
  const [rentPaid, setRentPaid] = useState<number>(0);
  const [isMetroCity, setIsMetroCity] = useState<boolean>(true);

  // Calculate HRA Exemption
  const calculateHRAExemption = () => {
    const actualHRA = hraReceived;
    const rentMinusTenPercent = Math.max(0, rentPaid - (basicSalary + daReceived) * 0.1);
    const percentageOfBasic = (basicSalary + daReceived) * (isMetroCity ? 0.5 : 0.4);

    const hraExemption = Math.min(actualHRA, rentMinusTenPercent, percentageOfBasic);
    return Math.max(0, hraExemption);
  };

  // Calculate Net Taxable Income for Old Regime
  const calculateOldRegime = () => {
    const hraExemption = calculateHRAExemption();

    // Total Income
    const totalIncome = grossSalary + otherIncome + interestIncome + rentalIncome;

    // Deductions from Gross Total Income
    const standardDeduction = Math.min(50000, grossSalary); // Old regime standard deduction
    const homeLoanDeduction = Math.min(200000, homeLoanInterestSelfOccupied); // Section 24
    const rentalDeduction = homeLoanInterestLetOut; // For let-out property

    // Chapter VI-A Deductions
    const total80C = Math.min(150000, deduction80C); // Section 80C limit
    const total80CCD1B = Math.min(50000, npsDeduction); // Section 80CCD(1B)
    const total80D = Math.min(medicalInsurance, ageCategory === 'below60' ? 25000 : 50000); // Section 80D
    const total80G = charityDonation * 0.5; // 50% of donation (simplified)
    const total80E = educationLoanInterest; // No limit
    const total80TTA = ageCategory === 'above80' ? Math.min(50000, savingsInterest) : Math.min(10000, savingsInterest);

    const totalDeductions = standardDeduction + hraExemption + homeLoanDeduction + rentalDeduction +
                          total80C + total80CCD1B + total80D + total80G + total80E + total80TTA;

    const netTaxableIncome = Math.max(0, totalIncome - totalDeductions);

    // Tax calculation based on age
    let tax = 0;
    let exemptionLimit = 250000;

    if (ageCategory === 'above60') exemptionLimit = 300000;
    if (ageCategory === 'above80') exemptionLimit = 500000;

    if (netTaxableIncome > exemptionLimit) {
      const taxable = netTaxableIncome - exemptionLimit;

      if (taxable <= 250000) {
        tax = taxable * 0.05;
      } else if (taxable <= 750000) {
        tax = 250000 * 0.05 + (taxable - 250000) * 0.2;
      } else {
        tax = 250000 * 0.05 + 500000 * 0.2 + (taxable - 750000) * 0.3;
      }
    }

    // Section 87A Rebate
    let rebate = 0;
    if (netTaxableIncome <= 500000) {
      rebate = Math.min(tax, 12500);
    }

    const taxAfterRebate = Math.max(0, tax - rebate);
    const cess = taxAfterRebate * 0.04; // 4% Health & Education Cess
    const totalTax = taxAfterRebate + cess;

    return {
      totalIncome,
      totalDeductions,
      netTaxableIncome,
      tax: Math.round(tax),
      rebate: Math.round(rebate),
      cess: Math.round(cess),
      totalTax: Math.round(totalTax)
    };
  };

  // Calculate Net Taxable Income for New Regime
  const calculateNewRegime = () => {
    const hraExemption = calculateHRAExemption();

    // Total Income
    const totalIncome = grossSalary + otherIncome + interestIncome + rentalIncome;

    // New Regime allows very limited deductions
    const standardDeduction = Math.min(75000, grossSalary); // New regime standard deduction (FY 2026-26)
    const homeLoanDeduction = homeLoanInterestLetOut; // Only for let-out property

    const totalDeductions = standardDeduction + homeLoanDeduction;

    const netTaxableIncome = Math.max(0, totalIncome - totalDeductions);

    // New Tax Regime Slabs (FY 2026-26)
    let tax = 0;

    if (netTaxableIncome > 400000) {
      const taxable400to800 = Math.min(400000, Math.max(0, netTaxableIncome - 400000));
      tax += taxable400to800 * 0.05;
    }
    if (netTaxableIncome > 800000) {
      const taxable800to1200 = Math.min(400000, Math.max(0, netTaxableIncome - 800000));
      tax += taxable800to1200 * 0.10;
    }
    if (netTaxableIncome > 1200000) {
      const taxable1200to1600 = Math.min(400000, Math.max(0, netTaxableIncome - 1200000));
      tax += taxable1200to1600 * 0.15;
    }
    if (netTaxableIncome > 1600000) {
      const taxable1600to2000 = Math.min(400000, Math.max(0, netTaxableIncome - 1600000));
      tax += taxable1600to2000 * 0.20;
    }
    if (netTaxableIncome > 2000000) {
      const taxable2000to2400 = Math.min(400000, Math.max(0, netTaxableIncome - 2000000));
      tax += taxable2000to2400 * 0.25;
    }
    if (netTaxableIncome > 2400000) {
      const taxableAbove2400 = netTaxableIncome - 2400000;
      tax += taxableAbove2400 * 0.30;
    }

    // Section 87A Rebate (New Regime)
    let rebate = 0;
    if (netTaxableIncome <= 1200000) {
      rebate = Math.min(tax, 60000);
    }

    const taxAfterRebate = Math.max(0, tax - rebate);
    const cess = taxAfterRebate * 0.04; // 4% Health & Education Cess
    const totalTax = taxAfterRebate + cess;

    return {
      totalIncome,
      totalDeductions,
      netTaxableIncome,
      tax: Math.round(tax),
      rebate: Math.round(rebate),
      cess: Math.round(cess),
      totalTax: Math.round(totalTax)
    };
  };

  const oldRegimeResults = calculateOldRegime();
  const newRegimeResults = calculateNewRegime();

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
                  Income Tax Calculator
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl">
                  Calculate your tax liability for FY 2026-26 under Old and New Tax Regime. Compare both regimes and choose the best option for maximum savings.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <FileText className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#FFC857]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          {/* Main Calculator */}
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-[#2BAE66]" />
                  Tax Details
                </h2>

                {/* Assessment Year and Age */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Assessment Year
                    </Label>
                    <Select value={assessmentYear} onValueChange={setAssessmentYear}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2026-2027">2026 - 2027</SelectItem>
                        <SelectItem value="2026-2026">2026 - 2026</SelectItem>
                        <SelectItem value="2026-2026">2026 - 2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Age Category
                    </Label>
                    <Select value={ageCategory} onValueChange={setAgeCategory}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below60">Below 60</SelectItem>
                        <SelectItem value="above60">60 or Above 60</SelectItem>
                        <SelectItem value="above80">80 or Above 80</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Income Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-4 flex items-center">
                    <IndianRupee className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    Income
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-gray-600 mb-1.5 block">Gross Salary Income</Label>
                      <Input
                        type="number"
                        value={grossSalary || ''}
                        onChange={(e) => setGrossSalary(Number(e.target.value))}
                        className="h-12 text-base"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 mb-1.5 block">Annual Income from Other Sources</Label>
                      <Input
                        type="number"
                        value={otherIncome || ''}
                        onChange={(e) => setOtherIncome(Number(e.target.value))}
                        className="h-12 text-base"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 mb-1.5 block">Annual Income from Interest</Label>
                      <Input
                        type="number"
                        value={interestIncome || ''}
                        onChange={(e) => setInterestIncome(Number(e.target.value))}
                        className="h-12 text-base"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 mb-1.5 block">Annual Income from Let-out House Property (Rental Income)</Label>
                      <Input
                        type="number"
                        value={rentalIncome || ''}
                        onChange={(e) => setRentalIncome(Number(e.target.value))}
                        className="h-12 text-base"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 mb-1.5 block">Annual Interest Paid on Home Loan (Self-occupied)</Label>
                      <Input
                        type="number"
                        value={homeLoanInterestSelfOccupied || ''}
                        onChange={(e) => setHomeLoanInterestSelfOccupied(Number(e.target.value))}
                        className="h-12 text-base"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 mb-1.5 block">Annual Interest Paid on Home Loan (Let-out)</Label>
                      <Input
                        type="number"
                        value={homeLoanInterestLetOut || ''}
                        onChange={(e) => setHomeLoanInterestLetOut(Number(e.target.value))}
                        className="h-12 text-base"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Deductions Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    Deductions (Applicable for Old Regime)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-gray-600 mb-1.5 block">Basic Deductions u/s 80C</Label>
                      <Input
                        type="number"
                        value={deduction80C || ''}
                        onChange={(e) => setDeduction80C(Number(e.target.value))}
                        className="h-12 text-base"
                        placeholder="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">Maximum ₹1,50,000</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 mb-1.5 block">Contribution to NPS u/s 80CCD(1B)</Label>
                      <Input
                        type="number"
                        value={npsDeduction || ''}
                        onChange={(e) => setNpsDeduction(Number(e.target.value))}
                        className="h-12 text-base"
                        placeholder="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">Maximum ₹50,000 (additional)</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 mb-1.5 block">Medical Insurance Premium u/s 80D</Label>
                      <Input
                        type="number"
                        value={medicalInsurance || ''}
                        onChange={(e) => setMedicalInsurance(Number(e.target.value))}
                        className="h-12 text-base"
                        placeholder="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Maximum ₹{ageCategory === 'below60' ? '25,000' : '50,000'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 mb-1.5 block">Donation to Charity u/s 80G</Label>
                      <Input
                        type="number"
                        value={charityDonation || ''}
                        onChange={(e) => setCharityDonation(Number(e.target.value))}
                        className="h-12 text-base"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 mb-1.5 block">Interest on Educational Loan u/s 80E</Label>
                      <Input
                        type="number"
                        value={educationLoanInterest || ''}
                        onChange={(e) => setEducationLoanInterest(Number(e.target.value))}
                        className="h-12 text-base"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 mb-1.5 block">Interest on Deposits in Saving Account u/s 80TTA/TTB</Label>
                      <Input
                        type="number"
                        value={savingsInterest || ''}
                        onChange={(e) => setSavingsInterest(Number(e.target.value))}
                        className="h-12 text-base"
                        placeholder="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Maximum ₹{ageCategory === 'above80' ? '50,000' : '10,000'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* HRA Exemption Section */}
                <div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-4 flex items-center">
                    <Home className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    HRA Exemption (Applicable for Old Regime)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-gray-600 mb-1.5 block">Basic Salary Received per Annum</Label>
                      <Input
                        type="number"
                        value={basicSalary || ''}
                        onChange={(e) => setBasicSalary(Number(e.target.value))}
                        className="h-12 text-base"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 mb-1.5 block">Dearness Allowance (DA) Received per Annum</Label>
                      <Input
                        type="number"
                        value={daReceived || ''}
                        onChange={(e) => setDaReceived(Number(e.target.value))}
                        className="h-12 text-base"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 mb-1.5 block">HRA Received per Annum</Label>
                      <Input
                        type="number"
                        value={hraReceived || ''}
                        onChange={(e) => setHraReceived(Number(e.target.value))}
                        className="h-12 text-base"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 mb-1.5 block">Total Rent Paid per Annum</Label>
                      <Input
                        type="number"
                        value={rentPaid || ''}
                        onChange={(e) => setRentPaid(Number(e.target.value))}
                        className="h-12 text-base"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Do you live in a metro city?
                      </Label>
                      <Select value={isMetroCity ? 'yes' : 'no'} onValueChange={(val) => setIsMetroCity(val === 'yes')}>
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-1 space-y-6">
              {/* Old Regime Results */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#1A3D7C]">
                <h3 className="text-lg font-bold text-[#1A3D7C] mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-[#2BAE66]" />
                  Old Tax Regime
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Total Income</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(oldRegimeResults.totalIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Deductions</span>
                    <span className="font-semibold text-green-600">-{formatCurrency(oldRegimeResults.totalDeductions)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Taxable Income</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(oldRegimeResults.netTaxableIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Income Tax</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(oldRegimeResults.tax)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Rebate u/s 87A</span>
                    <span className="font-semibold text-green-600">-{formatCurrency(oldRegimeResults.rebate)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Cess (4%)</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(oldRegimeResults.cess)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-3 rounded-lg">
                    <span className="font-bold">Total Tax</span>
                    <span className="text-xl font-bold">{formatCurrency(oldRegimeResults.totalTax)}</span>
                  </div>
                </div>
              </div>

              {/* New Regime Results */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#2BAE66]">
                <h3 className="text-lg font-bold text-[#1A3D7C] mb-4 flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-[#2BAE66]" />
                  New Tax Regime
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Total Income</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(newRegimeResults.totalIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Deductions</span>
                    <span className="font-semibold text-green-600">-{formatCurrency(newRegimeResults.totalDeductions)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Taxable Income</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(newRegimeResults.netTaxableIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Income Tax</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(newRegimeResults.tax)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Rebate u/s 87A</span>
                    <span className="font-semibold text-green-600">-{formatCurrency(newRegimeResults.rebate)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Cess (4%)</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(newRegimeResults.cess)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 bg-gradient-to-r from-[#2BAE66] to-[#1A3D7C] text-white p-3 rounded-lg">
                    <span className="font-bold">Total Tax</span>
                    <span className="text-xl font-bold">{formatCurrency(newRegimeResults.totalTax)}</span>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-gradient-to-r from-[#FFC857] to-[#FFD88C] p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-bold text-[#1A3D7C] mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Recommendation
                </h3>
                <p className="text-sm text-[#1A3D7C] mb-3">
                  {oldRegimeResults.totalTax < newRegimeResults.totalTax
                    ? 'The Old Tax Regime is more beneficial for you!'
                    : oldRegimeResults.totalTax > newRegimeResults.totalTax
                    ? 'The New Tax Regime is more beneficial for you!'
                    : 'Both regimes result in the same tax liability.'}
                </p>
                <p className="text-xs text-[#1A3D7C]/80">
                  You could save{' '}
                  <strong>
                    {formatCurrency(Math.abs(oldRegimeResults.totalTax - newRegimeResults.totalTax))}
                  </strong>{' '}
                  by choosing the {oldRegimeResults.totalTax < newRegimeResults.totalTax ? 'Old' : 'New'} regime.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Target className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Benefits of Income Tax Calculator
            </h2>
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Compare Both Regimes
                  </h3>
                  <p className="text-white/90">
                    Instantly compare your tax liability under Old and New tax regimes side-by-side. Make an informed decision to choose the regime that saves you the most money.
                  </p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Accurate Tax Planning
                  </h3>
                  <p className="text-white/90">
                    Plan your investments and deductions throughout the year to minimize tax liability. Updated with latest FY 2026-26 tax slabs and rebate limits for accurate calculations.
                  </p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    HRA Exemption Calculator
                  </h3>
                  <p className="text-white/90">
                    Automatically calculates HRA exemption based on actual HRA received, rent paid, and basic salary. Factors in metro vs non-metro city differences for accurate results.
                  </p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    All Deductions Covered
                  </h3>
                  <p className="text-white/90">
                    Includes all major deductions - Section 80C, 80D, 80E, 80G, 80CCD(1B), 80TTA/TTB. Accounts for age-based exemption limits and special benefits for senior citizens.
                  </p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Save Time and Money
                  </h3>
                  <p className="text-white/90">
                    No need to manually calculate complex tax formulas. Get instant results for both regimes and identify potential tax savings through better planning and deductions.
                  </p>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Updated for Budget 2026
                  </h3>
                  <p className="text-white/90">
                    Calculator reflects latest tax changes including increased standard deduction to ₹75,000, enhanced Section 87A rebate to ₹60,000, and new tax slabs.
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-[#FFC857] text-[#1A3D7C] rounded-lg">
                <p className="font-semibold">
                  💡 Pro Tip: If you have multiple investments and deductions, the Old Tax Regime often provides better savings. The New Regime is simpler and works best for those with minimal deductions!
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
                  What is the difference between Old and New tax regimes?
                </h3>
                <p className="text-gray-700 pl-6">
                  The <strong>Old Tax Regime</strong> offers multiple deductions (80C, 80D, HRA, etc.) but has higher tax rates. The <strong>New Tax Regime</strong> has lower tax rates and higher standard deduction (₹75,000 for FY 2026-26) but doesn't allow most deductions. You can choose either regime when filing ITR.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  What are the tax slabs for FY 2026-26 under the New Regime?
                </h3>
                <p className="text-gray-700 pl-6">
                  <strong>New Regime tax slabs:</strong> Up to ₹4L (0%), ₹4-8L (5%), ₹8-12L (10%), ₹12-16L (15%), ₹16-20L (20%), ₹20-24L (25%), Above ₹24L (30%). Plus 4% Health & Education Cess. Section 87A rebate of ₹60,000 available for income up to ₹12 lakh.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  How is HRA exemption calculated?
                </h3>
                <p className="text-gray-700 pl-6">
                  HRA exemption is the <strong>minimum of</strong>: (1) Actual HRA received, (2) 50% of basic salary for metro cities or 40% for non-metro, (3) Rent paid minus 10% of basic salary. Only applicable under Old Tax Regime. Enter your basic salary, HRA, and rent details in the calculator.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  What is Section 80C and what is the maximum limit?
                </h3>
                <p className="text-gray-700 pl-6">
                  <strong>Section 80C</strong> allows deductions for investments in PPF, ELSS, NSC, life insurance premiums, EPF, home loan principal, tuition fees, etc. Maximum limit is <strong>₹1,50,000 per financial year</strong>. Only available under Old Tax Regime. This helps reduce your taxable income significantly.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  Can I switch between Old and New regime every year?
                </h3>
                <p className="text-gray-700 pl-6">
                  <strong>Yes, salaried individuals</strong> can switch between regimes every financial year. However, if you have <strong>business income</strong>, you can opt out of the New Regime only once, and then you're locked into that choice. Choose wisely based on your deductions and income.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  What is Section 87A rebate and who is eligible?
                </h3>
                <p className="text-gray-700 pl-6">
                  Section 87A provides a <strong>rebate of up to ₹12,500</strong> (Old Regime) if taxable income is up to ₹5 lakh. Under <strong>New Regime, rebate is ₹60,000</strong> if taxable income is up to ₹12 lakh. This means effectively no tax for income up to ₹12L in New Regime!
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  Are senior citizens eligible for higher exemption limits?
                </h3>
                <p className="text-gray-700 pl-6">
                  Yes! Under <strong>Old Tax Regime</strong>, senior citizens (60-80 years) get ₹3 lakh basic exemption, and super senior citizens (80+ years) get ₹5 lakh. They also get <strong>higher deduction limits</strong> for Section 80D (₹50,000) and 80TTB (₹50,000 on interest income).
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  What is the standard deduction for FY 2026-26?
                </h3>
                <p className="text-gray-700 pl-6">
                  Standard deduction is <strong>₹50,000 in Old Regime</strong> and <strong>₹75,000 in New Regime</strong> for salaried individuals. It's automatically deducted from gross salary. The increased standard deduction in New Regime makes it more attractive for many taxpayers.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  Can I claim home loan interest deduction in New Regime?
                </h3>
                <p className="text-gray-700 pl-6">
                  Under New Regime, you can <strong>only claim home loan interest for let-out property</strong> (no limit). Interest on self-occupied property is NOT allowed. Under Old Regime, you can claim up to <strong>₹2 lakh</strong> for self-occupied property under Section 24.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                  Which regime should I choose - Old or New?
                </h3>
                <p className="text-gray-700 pl-6">
                  Choose <strong>Old Regime</strong> if you have significant deductions (₹2.5L+ in 80C, HRA, home loan, etc.). Choose <strong>New Regime</strong> if you have minimal investments and want simplicity. Use our calculator to compare both - it shows exactly which regime saves you more tax!
                </p>
              </div>
            </div>
          </section>

          {/* Smart Tips Section */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
              Smart Tax Planning Tips
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl border border-gray-200">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Calculate early, plan better:</strong> Use this calculator at the beginning of the financial year to plan your investments. Know how much you need to invest in Section 80C to maximize tax savings and avoid last-minute scrambling.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Maximize Section 80C:</strong> Invest the full ₹1.5 lakh in ELSS, PPF, NSC, or home loan principal repayment. Don't forget children's tuition fees and life insurance premiums also count towards this limit under Old Regime.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Don't ignore NPS Section 80CCD(1B):</strong> This provides an additional ₹50,000 deduction over and above Section 80C. Total tax saving potential of ₹2 lakh (₹1.5L + ₹0.5L) in Old Regime - that's massive!
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Health insurance is crucial:</strong> Section 80D allows ₹25,000 deduction (₹50,000 for senior citizens). You save tax AND protect your family. You can claim for self, spouse, children, and parents - make full use of it.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Submit investment proofs to employer:</strong> Don't wait until ITR filing. Submit 80C, HRA, and other proofs to your employer for correct TDS deduction throughout the year. This improves your monthly cash flow.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Keep receipts and documents ready:</strong> Maintain rent receipts for HRA, investment certificates for 80C, medical insurance receipts for 80D. Proper documentation is essential if the Income Tax Department asks for verification.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Compare regimes annually:</strong> Your optimal tax regime can change based on salary hikes, new investments, or life changes (marriage, home loan, children). Use this calculator every year to ensure you're choosing the most beneficial regime.
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
                Need Help with Tax Calculations?
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                Our expert tutors can help you understand tax calculations, percentage mathematics, and financial planning concepts. Get personalized one-on-one guidance.
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
                This calculator provides estimates only. Tax calculations may vary based on individual circumstances. Consult a tax professional for accurate tax planning.
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
            <p>&copy; 2026 The Tutor Bridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
