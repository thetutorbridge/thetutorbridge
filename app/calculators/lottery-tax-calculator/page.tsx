'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, Home, BookOpen, ArrowRight, DollarSign, Percent, TrendingUp, HelpCircle, Banknote, PiggyBank, Receipt, Building2, MapPin, Calendar, AlertTriangle, Info, CheckCircle2, XCircle } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// 2026 Federal Tax Brackets (Single Filer)
const federalTaxBrackets2026 = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

// State tax rates for lottery winnings (2026)
const stateTaxRates: Record<string, { name: string; rate: number; noTax?: boolean }> = {
  'AL': { name: 'Alabama', rate: 0.05 },
  'AK': { name: 'Alaska', rate: 0, noTax: true },
  'AZ': { name: 'Arizona', rate: 0.025 },
  'AR': { name: 'Arkansas', rate: 0.047 },
  'CA': { name: 'California', rate: 0, noTax: true },
  'CO': { name: 'Colorado', rate: 0.044 },
  'CT': { name: 'Connecticut', rate: 0.0699 },
  'DE': { name: 'Delaware', rate: 0.066 },
  'FL': { name: 'Florida', rate: 0, noTax: true },
  'GA': { name: 'Georgia', rate: 0.055 },
  'HI': { name: 'Hawaii', rate: 0.11 },
  'ID': { name: 'Idaho', rate: 0.058 },
  'IL': { name: 'Illinois', rate: 0.0495 },
  'IN': { name: 'Indiana', rate: 0.0323 },
  'IA': { name: 'Iowa', rate: 0.06 },
  'KS': { name: 'Kansas', rate: 0.057 },
  'KY': { name: 'Kentucky', rate: 0.045 },
  'LA': { name: 'Louisiana', rate: 0.0425 },
  'ME': { name: 'Maine', rate: 0.0715 },
  'MD': { name: 'Maryland', rate: 0.0875 },
  'MA': { name: 'Massachusetts', rate: 0.05 },
  'MI': { name: 'Michigan', rate: 0.0425 },
  'MN': { name: 'Minnesota', rate: 0.0985 },
  'MS': { name: 'Mississippi', rate: 0.05 },
  'MO': { name: 'Missouri', rate: 0.048 },
  'MT': { name: 'Montana', rate: 0.0675 },
  'NE': { name: 'Nebraska', rate: 0.0584 },
  'NV': { name: 'Nevada', rate: 0, noTax: true },
  'NH': { name: 'New Hampshire', rate: 0, noTax: true },
  'NJ': { name: 'New Jersey', rate: 0.0897 },
  'NM': { name: 'New Mexico', rate: 0.059 },
  'NY': { name: 'New York', rate: 0.109 },
  'NC': { name: 'North Carolina', rate: 0.0525 },
  'ND': { name: 'North Dakota', rate: 0.029 },
  'OH': { name: 'Ohio', rate: 0.04 },
  'OK': { name: 'Oklahoma', rate: 0.0475 },
  'OR': { name: 'Oregon', rate: 0.099 },
  'PA': { name: 'Pennsylvania', rate: 0.0307 },
  'RI': { name: 'Rhode Island', rate: 0.0599 },
  'SC': { name: 'South Carolina', rate: 0.065 },
  'SD': { name: 'South Dakota', rate: 0, noTax: true },
  'TN': { name: 'Tennessee', rate: 0, noTax: true },
  'TX': { name: 'Texas', rate: 0, noTax: true },
  'UT': { name: 'Utah', rate: 0.0465 },
  'VT': { name: 'Vermont', rate: 0.0875 },
  'VA': { name: 'Virginia', rate: 0.0575 },
  'WA': { name: 'Washington', rate: 0, noTax: true },
  'WV': { name: 'West Virginia', rate: 0.065 },
  'WI': { name: 'Wisconsin', rate: 0.0765 },
  'WY': { name: 'Wyoming', rate: 0, noTax: true },
  'DC': { name: 'Washington D.C.', rate: 0.0895 },
};

type PayoutType = 'lump-sum' | 'annuity';
type FilingStatus = 'single' | 'married-joint' | 'married-separate' | 'head-of-household';

interface AnnuityPayment {
  year: number;
  grossPayment: number;
  federalTax: number;
  stateTax: number;
  netPayment: number;
}

interface LotteryResult {
  jackpotAmount: number;
  payoutType: PayoutType;
  lumpSumPercentage: number;
  grossPayout: number;
  federalWithholding: number;
  additionalFederalTax: number;
  totalFederalTax: number;
  stateTax: number;
  totalTax: number;
  netPayout: number;
  effectiveTaxRate: number;
  annuitySchedule?: AnnuityPayment[];
  state: string;
  stateName: string;
}

export default function LotteryTaxCalculator() {
  const [jackpotAmount, setJackpotAmount] = useState<string>('');
  const [payoutType, setPayoutType] = useState<PayoutType>('lump-sum');
  const [lumpSumPercentage, setLumpSumPercentage] = useState<string>('52');
  const [state, setState] = useState<string>('CA');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [customStateTax, setCustomStateTax] = useState<string>('');
  const [useCustomStateTax, setUseCustomStateTax] = useState<boolean>(false);
  const [annuityYears, setAnnuityYears] = useState<string>('30');
  const [annuityGrowthRate, setAnnuityGrowthRate] = useState<string>('5');
  const [result, setResult] = useState<LotteryResult | null>(null);

  // Calculate federal tax using marginal brackets
  const calculateFederalTax = (taxableIncome: number): number => {
    let tax = 0;
    let remainingIncome = taxableIncome;

    for (const bracket of federalTaxBrackets2026) {
      if (remainingIncome <= 0) break;

      const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
      tax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;
    }

    return tax;
  };

  // Generate annuity schedule with 5% annual increase
  const generateAnnuitySchedule = (
    jackpot: number,
    years: number,
    growthRate: number,
    stateTaxRate: number
  ): AnnuityPayment[] => {
    const schedule: AnnuityPayment[] = [];

    // Calculate first year payment (graduated annuity)
    // Sum of geometric series: S = a * (r^n - 1) / (r - 1)
    // Where a = first payment, r = 1 + growth rate, n = years
    const r = 1 + growthRate / 100;
    const firstPayment = jackpot * (r - 1) / (Math.pow(r, years) - 1);

    for (let year = 1; year <= years; year++) {
      const grossPayment = firstPayment * Math.pow(r, year - 1);
      const federalTax = calculateFederalTax(grossPayment);
      const stateTax = grossPayment * stateTaxRate;
      const netPayment = grossPayment - federalTax - stateTax;

      schedule.push({
        year,
        grossPayment,
        federalTax,
        stateTax,
        netPayment,
      });
    }

    return schedule;
  };

  const handleCalculate = () => {
    const jackpot = parseFloat(jackpotAmount.replace(/,/g, ''));

    if (isNaN(jackpot) || jackpot <= 0) {
      alert('Please enter a valid jackpot amount');
      return;
    }

    const lumpSumPct = parseFloat(lumpSumPercentage) / 100;
    const stateTaxRate = useCustomStateTax
      ? parseFloat(customStateTax) / 100
      : stateTaxRates[state].rate;
    const years = parseInt(annuityYears);
    const growthRate = parseFloat(annuityGrowthRate);

    if (payoutType === 'lump-sum') {
      // Lump Sum Calculation
      const grossPayout = jackpot * lumpSumPct;

      // Federal withholding is 24% of gross
      const federalWithholding = grossPayout * 0.24;

      // Calculate actual federal tax using brackets
      const totalFederalTax = calculateFederalTax(grossPayout);

      // Additional federal tax (beyond withholding)
      const additionalFederalTax = Math.max(0, totalFederalTax - federalWithholding);

      // State tax
      const stateTax = grossPayout * stateTaxRate;

      // Total tax and net payout
      const totalTax = totalFederalTax + stateTax;
      const netPayout = grossPayout - totalTax;
      const effectiveTaxRate = (totalTax / grossPayout) * 100;

      setResult({
        jackpotAmount: jackpot,
        payoutType,
        lumpSumPercentage: lumpSumPct * 100,
        grossPayout,
        federalWithholding,
        additionalFederalTax,
        totalFederalTax,
        stateTax,
        totalTax,
        netPayout,
        effectiveTaxRate,
        state,
        stateName: stateTaxRates[state].name,
      });
    } else {
      // Annuity Calculation
      const annuitySchedule = generateAnnuitySchedule(jackpot, years, growthRate, stateTaxRate);

      const totalGross = annuitySchedule.reduce((sum, p) => sum + p.grossPayment, 0);
      const totalFederalTax = annuitySchedule.reduce((sum, p) => sum + p.federalTax, 0);
      const totalStateTax = annuitySchedule.reduce((sum, p) => sum + p.stateTax, 0);
      const totalNet = annuitySchedule.reduce((sum, p) => sum + p.netPayment, 0);
      const totalTax = totalFederalTax + totalStateTax;
      const effectiveTaxRate = (totalTax / totalGross) * 100;

      setResult({
        jackpotAmount: jackpot,
        payoutType,
        lumpSumPercentage: 100,
        grossPayout: totalGross,
        federalWithholding: 0,
        additionalFederalTax: 0,
        totalFederalTax,
        stateTax: totalStateTax,
        totalTax,
        netPayout: totalNet,
        effectiveTaxRate,
        annuitySchedule,
        state,
        stateName: stateTaxRates[state].name,
      });
    }
  };

  const handleClear = () => {
    setJackpotAmount('');
    setResult(null);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCurrencyDetailed = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // No-tax states list
  const noTaxStates = Object.entries(stateTaxRates)
    .filter(([, data]) => data.noTax)
    .map(([code, data]) => ({ code, name: data.name }));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"HelpCircle className=\"w-5 h-5 text-green-600\" />\n                    Is the 24% federal withholding my only tax?","acceptedAnswer":{"@type":"Answer","text":"strong> The 24% is just the initial withholding - essentially a prepayment. For large winnings, your actual tax rate will be closer to 37% (the top federal bracket). You&apos;ll owe the difference when you file your tax return. Additionally, you&apos;ll owe state taxes (0-10.9% depending on your state)."}}]}' }}
      />
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-green-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Lottery Tax Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Banknote className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Lottery Tax Calculator
            </h1>
            <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
              Calculate how much you&apos;ll actually take home from lottery winnings after federal and state taxes. Compare lump sum vs annuity payouts with accurate 2026 tax brackets.
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Input Section (Left Side - 2 columns) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-green-600" />
                  Enter Lottery Details
                </h2>

                <div className="space-y-5">
                  {/* Jackpot Amount */}
                  <div>
                    <Label htmlFor="jackpotAmount" className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                      <DollarSign className="w-4 h-4 mr-1 text-green-500" />
                      Jackpot / Annuity Payout
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                      <Input
                        id="jackpotAmount"
                        type="text"
                        placeholder="1,000,000,000"
                        value={jackpotAmount}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          setJackpotAmount(value ? parseInt(value).toLocaleString() : '');
                        }}
                        className="pl-8 text-lg font-semibold"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Enter the advertised jackpot amount</p>
                  </div>

                  {/* Payout Type */}
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                      <Receipt className="w-4 h-4 mr-1 text-emerald-500" />
                      Payout Option
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setPayoutType('lump-sum')}
                        className={`px-4 py-3 rounded-lg text-sm font-medium transition-all flex flex-col items-center ${
                          payoutType === 'lump-sum'
                            ? 'bg-green-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Banknote className="w-5 h-5 mb-1" />
                        Lump Sum
                      </button>
                      <button
                        onClick={() => setPayoutType('annuity')}
                        className={`px-4 py-3 rounded-lg text-sm font-medium transition-all flex flex-col items-center ${
                          payoutType === 'annuity'
                            ? 'bg-green-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Calendar className="w-5 h-5 mb-1" />
                        Annuity
                      </button>
                    </div>
                  </div>

                  {/* Lump Sum Percentage (only for lump sum) */}
                  {payoutType === 'lump-sum' && (
                    <div>
                      <Label htmlFor="lumpSumPct" className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                        <Percent className="w-4 h-4 mr-1 text-blue-500" />
                        Lump Sum Payout Percentage
                      </Label>
                      <div className="relative">
                        <Input
                          id="lumpSumPct"
                          type="number"
                          min="1"
                          max="100"
                          step="1"
                          value={lumpSumPercentage}
                          onChange={(e) => setLumpSumPercentage(e.target.value)}
                          className="pr-8 text-lg font-semibold"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Typically 50-60% of advertised jackpot</p>
                    </div>
                  )}

                  {/* Annuity Settings (only for annuity) */}
                  {payoutType === 'annuity' && (
                    <>
                      <div>
                        <Label htmlFor="annuityYears" className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-purple-500" />
                          Annuity Period (Years)
                        </Label>
                        <Input
                          id="annuityYears"
                          type="number"
                          min="1"
                          max="40"
                          value={annuityYears}
                          onChange={(e) => setAnnuityYears(e.target.value)}
                          className="text-lg font-semibold"
                        />
                      </div>
                      <div>
                        <Label htmlFor="annuityGrowth" className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                          Annual Payment Increase
                        </Label>
                        <div className="relative">
                          <Input
                            id="annuityGrowth"
                            type="number"
                            min="0"
                            max="10"
                            step="0.5"
                            value={annuityGrowthRate}
                            onChange={(e) => setAnnuityGrowthRate(e.target.value)}
                            className="pr-8 text-lg font-semibold"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Mega Millions/Powerball use 5% annual increase</p>
                      </div>
                    </>
                  )}

                  {/* State Selection */}
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-red-500" />
                      Your State
                    </Label>
                    <Select value={state} onValueChange={(value) => setState(value)}>
                      <SelectTrigger className="font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {Object.entries(stateTaxRates)
                          .sort((a, b) => a[1].name.localeCompare(b[1].name))
                          .map(([code, data]) => (
                            <SelectItem key={code} value={code}>
                              {data.name} {data.noTax ? '(No Tax)' : `(${(data.rate * 100).toFixed(2)}%)`}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    {stateTaxRates[state].noTax && (
                      <p className="text-xs text-green-600 mt-1 font-medium">
                        This state has no income tax on lottery winnings!
                      </p>
                    )}
                  </div>

                  {/* Custom State Tax Toggle */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={useCustomStateTax}
                        onChange={(e) => setUseCustomStateTax(e.target.checked)}
                        className="w-4 h-4 text-green-600 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">Use custom state tax rate</span>
                    </label>
                    {useCustomStateTax && (
                      <div className="mt-3">
                        <div className="relative">
                          <Input
                            type="number"
                            min="0"
                            max="15"
                            step="0.01"
                            placeholder="0"
                            value={customStateTax}
                            onChange={(e) => setCustomStateTax(e.target.value)}
                            className="pr-8"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate Tax
                  </Button>
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="px-6 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50"
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Section (Right Side - 3 columns) */}
            <div className="lg:col-span-3">
              {result ? (
                <div className="space-y-6">
                  {/* Main Results Card */}
                  <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <DollarSign className="w-6 h-6" />
                      Your {result.payoutType === 'lump-sum' ? 'Lump Sum' : 'Annuity'} Results
                    </h3>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-green-200 text-sm mb-1">Gross Payout</p>
                        <p className="text-2xl md:text-3xl font-bold">{formatCurrency(result.grossPayout)}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-green-200 text-sm mb-1">Take-Home Amount</p>
                        <p className="text-2xl md:text-3xl font-bold text-green-200">{formatCurrency(result.netPayout)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-green-200 text-xs mb-1">Total Tax</p>
                        <p className="text-lg font-bold text-red-300">{formatCurrency(result.totalTax)}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-green-200 text-xs mb-1">Federal Tax</p>
                        <p className="text-lg font-bold">{formatCurrency(result.totalFederalTax)}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-green-200 text-xs mb-1">State Tax ({result.stateName})</p>
                        <p className="text-lg font-bold">{formatCurrency(result.stateTax)}</p>
                      </div>
                    </div>

                    <div className="mt-6 bg-white/10 rounded-xl p-4 text-center">
                      <p className="text-green-200 text-sm">Effective Tax Rate</p>
                      <p className="text-3xl font-bold">{result.effectiveTaxRate.toFixed(2)}%</p>
                    </div>
                  </div>

                  {/* Tax Breakdown Card */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <Receipt className="w-5 h-5 text-green-600" />
                      Tax Breakdown
                    </h3>

                    <div className="space-y-4">
                      {/* Jackpot to Gross */}
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-700">Advertised Jackpot</span>
                        <span className="font-bold text-gray-900">{formatCurrency(result.jackpotAmount)}</span>
                      </div>

                      {result.payoutType === 'lump-sum' && (
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <span className="text-gray-700">Lump Sum ({result.lumpSumPercentage}%)</span>
                          <span className="font-bold text-gray-900">{formatCurrency(result.grossPayout)}</span>
                        </div>
                      )}

                      <div className="bg-red-50 rounded-lg p-4 space-y-3">
                        <h4 className="font-semibold text-red-800 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Tax Deductions
                        </h4>

                        {result.payoutType === 'lump-sum' && (
                          <>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-700">Federal Withholding (24%)</span>
                              <span className="font-semibold text-red-600">−{formatCurrency(result.federalWithholding)}</span>
                            </div>
                            {result.additionalFederalTax > 0 && (
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-700">Additional Federal Tax (37% bracket)</span>
                                <span className="font-semibold text-red-600">−{formatCurrency(result.additionalFederalTax)}</span>
                              </div>
                            )}
                          </>
                        )}

                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-700">Total Federal Tax</span>
                          <span className="font-semibold text-red-600">−{formatCurrency(result.totalFederalTax)}</span>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-700">State Tax ({result.stateName})</span>
                          <span className="font-semibold text-red-600">−{formatCurrency(result.stateTax)}</span>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-red-200">
                          <span className="font-semibold text-red-800">Total Tax</span>
                          <span className="font-bold text-red-700 text-lg">−{formatCurrency(result.totalTax)}</span>
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-green-800 text-lg">Net Take-Home</span>
                          <span className="font-bold text-green-700 text-2xl">{formatCurrency(result.netPayout)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Annuity Schedule (if annuity selected) */}
                  {result.annuitySchedule && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-purple-600" />
                        Annuity Payment Schedule
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Payments increase by {annuityGrowthRate}% annually over {annuityYears} years
                      </p>

                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gradient-to-r from-green-100 to-emerald-100 border-b-2 border-green-300">
                              <th className="text-left py-3 px-3 font-bold text-gray-900">Year</th>
                              <th className="text-right py-3 px-3 font-bold text-gray-900">Gross Payment</th>
                              <th className="text-right py-3 px-3 font-bold text-gray-900">Federal Tax</th>
                              <th className="text-right py-3 px-3 font-bold text-gray-900">State Tax</th>
                              <th className="text-right py-3 px-3 font-bold text-gray-900">Net Payment</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.annuitySchedule.slice(0, 10).map((payment, idx) => (
                              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-2 px-3 font-medium">{payment.year}</td>
                                <td className="py-2 px-3 text-right">{formatCurrency(payment.grossPayment)}</td>
                                <td className="py-2 px-3 text-right text-red-600">−{formatCurrency(payment.federalTax)}</td>
                                <td className="py-2 px-3 text-right text-red-600">−{formatCurrency(payment.stateTax)}</td>
                                <td className="py-2 px-3 text-right font-semibold text-green-700">{formatCurrency(payment.netPayment)}</td>
                              </tr>
                            ))}
                            {result.annuitySchedule.length > 10 && (
                              <tr className="border-b border-gray-200 bg-gray-50">
                                <td colSpan={5} className="py-3 px-3 text-center text-gray-500 italic">
                                  ... {result.annuitySchedule.length - 10} more years ...
                                </td>
                              </tr>
                            )}
                          </tbody>
                          <tfoot>
                            <tr className="bg-green-50 font-bold">
                              <td className="py-3 px-3">Total</td>
                              <td className="py-3 px-3 text-right">{formatCurrency(result.grossPayout)}</td>
                              <td className="py-3 px-3 text-right text-red-600">−{formatCurrency(result.totalFederalTax)}</td>
                              <td className="py-3 px-3 text-right text-red-600">−{formatCurrency(result.stateTax)}</td>
                              <td className="py-3 px-3 text-right text-green-700">{formatCurrency(result.netPayout)}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        * You may need to scroll horizontally to see all columns
                      </p>
                    </div>
                  )}

                  {/* Formula Explanation */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-600" />
                      How We Calculated This
                    </h3>

                    <div className="space-y-4">
                      {result.payoutType === 'lump-sum' ? (
                        <>
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                            <h4 className="font-semibold text-blue-800 mb-2">Step 1: Calculate Lump Sum</h4>
                            <div className="flex items-center gap-2 text-gray-700">
                              <span>Lump Sum =</span>
                              <span className="font-mono bg-white px-2 py-1 rounded">{formatCurrency(result.jackpotAmount)}</span>
                              <span>×</span>
                              <span className="font-mono bg-white px-2 py-1 rounded">{result.lumpSumPercentage}%</span>
                              <span>=</span>
                              <span className="font-bold text-blue-700">{formatCurrency(result.grossPayout)}</span>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4 border border-red-100">
                            <h4 className="font-semibold text-red-800 mb-2">Step 2: Federal Withholding (24%)</h4>
                            <div className="flex items-center gap-2 text-gray-700">
                              <span>Withholding =</span>
                              <span className="font-mono bg-white px-2 py-1 rounded">{formatCurrency(result.grossPayout)}</span>
                              <span>×</span>
                              <span className="font-mono bg-white px-2 py-1 rounded">24%</span>
                              <span>=</span>
                              <span className="font-bold text-red-700">{formatCurrency(result.federalWithholding)}</span>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                            <h4 className="font-semibold text-purple-800 mb-2">Step 3: Total Federal Tax (Progressive Brackets)</h4>
                            <p className="text-sm text-gray-700 mb-2">
                              Federal tax is calculated using marginal tax brackets. Your income falls into the 37% top bracket.
                            </p>
                            <div className="flex items-center gap-2 text-gray-700">
                              <span>Total Federal Tax =</span>
                              <span className="font-bold text-purple-700">{formatCurrency(result.totalFederalTax)}</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                          <h4 className="font-semibold text-purple-800 mb-2">Annuity Tax Calculation</h4>
                          <p className="text-sm text-gray-700">
                            Each annual payment is taxed separately using marginal tax brackets. Lower individual payments may result in lower marginal tax rates compared to a lump sum.
                          </p>
                        </div>
                      )}

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                        <h4 className="font-semibold text-green-800 mb-2">Final: Net Take-Home</h4>
                        <div className="flex items-center gap-2 text-gray-700">
                          <span>Net =</span>
                          <span className="font-mono bg-white px-2 py-1 rounded">{formatCurrency(result.grossPayout)}</span>
                          <span>−</span>
                          <span className="font-mono bg-white px-2 py-1 rounded">{formatCurrency(result.totalTax)}</span>
                          <span>=</span>
                          <span className="font-bold text-green-700">{formatCurrency(result.netPayout)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Banknote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    Enter your lottery jackpot amount to calculate taxes
                  </p>
                  <p className="text-gray-400 text-sm">
                    Compare lump sum vs annuity payouts with federal and state tax breakdowns
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* What is Lottery Tax */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-green-600" />
                Understanding Lottery Taxes
              </h2>

              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Winning the lottery is exciting, but the IRS considers lottery winnings as <strong>ordinary taxable income</strong>. This means your prize is subject to both federal and state income taxes, which can significantly reduce your take-home amount. Understanding how lottery taxes work helps you make informed decisions about your payout options.
                </p>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border-2 border-green-200">
                  <h3 className="text-2xl font-bold text-green-800 mb-4">Key Lottery Tax Facts</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>24% Federal Withholding:</strong> The lottery commission automatically withholds 24% of winnings over $5,000 for federal taxes.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>37% Top Bracket:</strong> Large winnings push you into the highest federal tax bracket (37% for 2026).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>State Taxes Vary:</strong> State tax rates range from 0% to 10.9% depending on where you live.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Lump Sum is Smaller:</strong> The cash option is typically 50-60% of the advertised jackpot.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Federal Tax Brackets */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                2026 Federal Tax Brackets
              </h2>

              <p className="text-gray-700 mb-4">
                Lottery winnings are taxed as ordinary income using marginal tax brackets. This means different portions of your winnings are taxed at different rates:
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full bg-white rounded-xl border-2 border-gray-200">
                  <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Tax Bracket</th>
                      <th className="text-left py-3 px-4 font-semibold">Single Filer Income Range</th>
                      <th className="text-right py-3 px-4 font-semibold">Tax Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">1st Bracket</td>
                      <td className="py-3 px-4">$0 - $11,600</td>
                      <td className="py-3 px-4 text-right font-bold text-green-700">10%</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="py-3 px-4 font-medium">2nd Bracket</td>
                      <td className="py-3 px-4">$11,600 - $47,150</td>
                      <td className="py-3 px-4 text-right font-bold text-green-700">12%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">3rd Bracket</td>
                      <td className="py-3 px-4">$47,150 - $100,525</td>
                      <td className="py-3 px-4 text-right font-bold text-yellow-700">22%</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="py-3 px-4 font-medium">4th Bracket</td>
                      <td className="py-3 px-4">$100,525 - $191,950</td>
                      <td className="py-3 px-4 text-right font-bold text-yellow-700">24%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">5th Bracket</td>
                      <td className="py-3 px-4">$191,950 - $243,725</td>
                      <td className="py-3 px-4 text-right font-bold text-orange-700">32%</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="py-3 px-4 font-medium">6th Bracket</td>
                      <td className="py-3 px-4">$243,725 - $609,350</td>
                      <td className="py-3 px-4 text-right font-bold text-orange-700">35%</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="py-3 px-4 font-medium">7th Bracket</td>
                      <td className="py-3 px-4">Over $609,350</td>
                      <td className="py-3 px-4 text-right font-bold text-red-700">37%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-yellow-800 mb-2">Important: Marginal vs. Effective Tax Rate</h4>
                    <p className="text-gray-700">
                      If you win $1 million, you don&apos;t pay 37% on the entire amount. You pay 10% on the first $11,600, 12% on the next portion, and so on. Your <strong>effective tax rate</strong> (total tax ÷ total income) will be lower than 37%.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* States with No Lottery Tax */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                States with No Lottery Tax
              </h2>

              <p className="text-gray-700 mb-4">
                Some states don&apos;t tax lottery winnings at all, giving residents a significant advantage:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                {noTaxStates.map((st) => (
                  <div key={st.code} className="bg-green-50 border-2 border-green-200 rounded-lg p-3 text-center">
                    <span className="font-bold text-green-700">{st.name}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Note on State Taxes
                </h4>
                <p className="text-gray-700">
                  Even if you live in a no-tax state, you may owe taxes to the state where you purchased the ticket. Some states require non-residents to pay state taxes on lottery winnings. Additionally, California doesn&apos;t tax lottery winnings from state lotteries but does tax winnings from other states.
                </p>
              </div>
            </section>

            {/* Lump Sum vs Annuity */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Lump Sum vs. Annuity: Which is Better?
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Banknote className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-blue-800">Lump Sum (Cash Option)</h3>
                  </div>

                  <h4 className="font-semibold text-green-700 mb-2">Pros:</h4>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Immediate access to all funds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Investment opportunities for higher returns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Estate planning flexibility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>No dependency on lottery commission solvency</span>
                    </li>
                  </ul>

                  <h4 className="font-semibold text-red-700 mb-2">Cons:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Only ~52% of advertised jackpot</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Higher immediate tax burden</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Risk of overspending</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-6 h-6 text-purple-600" />
                    <h3 className="text-xl font-bold text-purple-800">Annuity (30 Annual Payments)</h3>
                  </div>

                  <h4 className="font-semibold text-green-700 mb-2">Pros:</h4>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Full advertised jackpot amount</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Potentially lower marginal tax rates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Steady income for 30 years</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Built-in spending discipline</span>
                    </li>
                  </ul>

                  <h4 className="font-semibold text-red-700 mb-2">Cons:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>No immediate access to full amount</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Inflation erodes purchasing power</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Estate complications if you die early</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <h4 className="font-bold text-green-800 mb-3">Expert Recommendation</h4>
                <p className="text-gray-700">
                  Most financial advisors recommend the <strong>lump sum option</strong> for large jackpots if you have financial discipline and a solid investment plan. With proper investment (historically 7-10% annual returns), you can potentially grow the lump sum to exceed the total annuity payments. However, the annuity is safer for those who want guaranteed income without investment risk.
                </p>
              </div>
            </section>

            {/* Calculation Examples */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Lottery Tax Calculation Examples
              </h2>

              {/* Example 1: $100 Million */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border-2 border-green-200">
                <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                  $100 Million Jackpot (California Resident)
                </h3>

                <div className="bg-white rounded-lg p-6 border border-green-200 mb-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Lump Sum Option:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>Advertised Jackpot: <strong>$100,000,000</strong></li>
                        <li>Cash Value (52%): <strong>$52,000,000</strong></li>
                        <li>Federal Tax (~37%): <strong className="text-red-600">−$18,891,072</strong></li>
                        <li>California State Tax: <strong className="text-green-600">$0</strong> (no state tax)</li>
                        <li className="pt-2 border-t font-bold">Net Take-Home: <strong className="text-green-700 text-lg">$33,108,928</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Key Points:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>California doesn&apos;t tax state lottery winnings</li>
                        <li>Effective tax rate: ~36.3%</li>
                        <li>You keep about 33% of advertised jackpot</li>
                        <li>Additional federal tax due beyond 24% withholding</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Example 2: $1 Billion */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                  $1 Billion Jackpot (New York Resident)
                </h3>

                <div className="bg-white rounded-lg p-6 border border-blue-200 mb-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Lump Sum Option:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>Advertised Jackpot: <strong>$1,000,000,000</strong></li>
                        <li>Cash Value (52%): <strong>$520,000,000</strong></li>
                        <li>Federal Tax (~37%): <strong className="text-red-600">−$189,091,072</strong></li>
                        <li>New York State Tax (10.9%): <strong className="text-red-600">−$56,680,000</strong></li>
                        <li className="pt-2 border-t font-bold">Net Take-Home: <strong className="text-green-700 text-lg">$274,228,928</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Key Points:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>New York has highest combined tax (10.9%)</li>
                        <li>NYC residents pay additional 3.876%</li>
                        <li>Effective tax rate: ~47.3%</li>
                        <li>You keep about 27% of advertised jackpot</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Example 3: Comparison */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
                  State Tax Comparison: $500 Million Jackpot
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full bg-white rounded-lg border border-purple-200 text-sm">
                    <thead className="bg-purple-100">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">State</th>
                        <th className="text-right py-3 px-4 font-semibold">State Tax Rate</th>
                        <th className="text-right py-3 px-4 font-semibold">State Tax Amount</th>
                        <th className="text-right py-3 px-4 font-semibold">Net Take-Home</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b bg-green-50">
                        <td className="py-2 px-4 font-medium">Florida (No Tax)</td>
                        <td className="py-2 px-4 text-right text-green-600">0%</td>
                        <td className="py-2 px-4 text-right text-green-600">$0</td>
                        <td className="py-2 px-4 text-right font-bold text-green-700">~$166 Million</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4 font-medium">Pennsylvania</td>
                        <td className="py-2 px-4 text-right">3.07%</td>
                        <td className="py-2 px-4 text-right text-red-600">~$8 Million</td>
                        <td className="py-2 px-4 text-right font-bold">~$158 Million</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-2 px-4 font-medium">Illinois</td>
                        <td className="py-2 px-4 text-right">4.95%</td>
                        <td className="py-2 px-4 text-right text-red-600">~$12.9 Million</td>
                        <td className="py-2 px-4 text-right font-bold">~$153 Million</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4 font-medium">Maryland</td>
                        <td className="py-2 px-4 text-right">8.75%</td>
                        <td className="py-2 px-4 text-right text-red-600">~$22.8 Million</td>
                        <td className="py-2 px-4 text-right font-bold">~$143 Million</td>
                      </tr>
                      <tr className="bg-red-50">
                        <td className="py-2 px-4 font-medium">New York</td>
                        <td className="py-2 px-4 text-right text-red-600">10.9%</td>
                        <td className="py-2 px-4 text-right text-red-600">~$28.3 Million</td>
                        <td className="py-2 px-4 text-right font-bold text-red-700">~$137 Million</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  * Based on $260 million lump sum (52% of $500M jackpot), federal tax ~$94.5M
                </p>
              </div>
            </section>

            {/* The Lottery Tax Formula */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The Lottery Tax Formula
              </h2>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border-2 border-indigo-200">
                <h3 className="text-xl font-bold text-indigo-800 mb-4">Lump Sum Tax Calculation</h3>

                <div className="bg-white rounded-lg p-6 border border-indigo-100 space-y-4">
                  <div className="flex items-center justify-center flex-wrap gap-3 text-lg">
                    <span className="font-semibold text-gray-800">Cash Value =</span>
                    <span className="bg-indigo-100 px-3 py-1 rounded">Jackpot</span>
                    <span>×</span>
                    <span className="bg-indigo-100 px-3 py-1 rounded">Lump Sum %</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-center flex-wrap gap-3 text-lg">
                      <span className="font-semibold text-gray-800">Total Tax =</span>
                      <span className="bg-red-100 px-3 py-1 rounded">Federal Tax</span>
                      <span>+</span>
                      <span className="bg-red-100 px-3 py-1 rounded">State Tax</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-center flex-wrap gap-3 text-lg">
                      <span className="font-semibold text-gray-800">Net Payout =</span>
                      <span className="bg-blue-100 px-3 py-1 rounded">Cash Value</span>
                      <span>−</span>
                      <span className="bg-red-100 px-3 py-1 rounded">Total Tax</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-4">Federal Tax Calculation (Simplified)</h3>

                <div className="bg-white rounded-lg p-6 border border-green-100">
                  <p className="text-gray-700 mb-4">
                    For winnings over $609,350 (top bracket), the federal tax can be estimated as:
                  </p>
                  <div className="flex items-center justify-center flex-wrap gap-3 text-lg mb-4">
                    <span className="font-semibold text-gray-800">Federal Tax ≈</span>
                    <span className="bg-green-100 px-3 py-1 rounded">Cash Value</span>
                    <span>×</span>
                    <span className="bg-green-100 px-3 py-1 rounded">37%</span>
                    <span>−</span>
                    <span className="bg-green-100 px-3 py-1 rounded">$35,818</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    The $35,818 adjustment accounts for the lower rates on income in lower brackets (progressive tax system).
                  </p>
                </div>
              </div>
            </section>

            {/* Tips for Lottery Winners */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Essential Tips for Lottery Winners
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Hire Professional Help
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Immediately hire a tax attorney, financial advisor, and CPA. Large lottery wins are complex and require professional guidance to minimize taxes legally and protect your wealth.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    Consider Estimated Tax Payments
                  </h3>
                  <p className="text-gray-700 text-sm">
                    The 24% withholding won&apos;t cover your full tax bill. Make quarterly estimated tax payments to avoid underpayment penalties when you file your tax return.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                  <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center gap-2">
                    <PiggyBank className="w-5 h-5" />
                    Don&apos;t Spend Immediately
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Wait before making large purchases. Take time to create a financial plan. Many lottery winners go bankrupt within a few years due to poor financial decisions.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
                  <h3 className="text-lg font-bold text-orange-800 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Charitable Donations Strategy
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Charitable donations can reduce your taxable income. Consider setting up a donor-advised fund for strategic giving that maximizes your tax benefits over multiple years.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-green-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-green-600" />
                    How much tax do I pay on a $1 million lottery win?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    For a $1 million jackpot taking the lump sum (~$520,000), you&apos;d pay approximately <strong>$169,000 in federal taxes</strong> (around 32.5%). State taxes vary from 0% to 10.9% depending on where you live. In a no-tax state like Florida, you&apos;d keep about <strong>$351,000</strong>. In New York (10.9% state tax), you&apos;d keep about <strong>$294,000</strong>.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-green-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-green-600" />
                    Is the 24% federal withholding my only tax?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>No.</strong> The 24% is just the initial withholding - essentially a prepayment. For large winnings, your actual tax rate will be closer to 37% (the top federal bracket). You&apos;ll owe the difference when you file your tax return. Additionally, you&apos;ll owe state taxes (0-10.9% depending on your state).
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-green-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-green-600" />
                    Why is the lump sum so much less than the advertised jackpot?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    The advertised jackpot is the total of all 30 annual annuity payments. The lump sum represents the current cash value invested to fund those payments. Due to interest rates and time value of money, the cash value is typically <strong>50-60% of the advertised amount</strong>. This is before taxes.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-green-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-green-600" />
                    Can I reduce my lottery tax bill legally?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Yes, several strategies can help: <strong>(1)</strong> Take the annuity to spread income over 30 years at potentially lower brackets; <strong>(2)</strong> Make charitable donations to qualified organizations; <strong>(3)</strong> Fund retirement accounts to the maximum; <strong>(4)</strong> Consider moving to a no-tax state before claiming (consult a tax attorney). However, you cannot avoid federal taxes on lottery winnings.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-green-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-green-600" />
                    Do I pay taxes on lottery winnings from another state?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Generally, you owe taxes to the <strong>state where you purchased the ticket</strong> (if they tax lottery winnings) AND your <strong>home state</strong>. Most states offer credits to avoid double taxation. If you live in a no-tax state but win in a taxable state, you may still owe taxes to the state where you won.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-green-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-green-600" />
                    What happens to annuity payments if I die?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Annuity payments can be passed to beneficiaries in your estate. However, the remaining payments become part of your estate and may be subject to <strong>estate taxes</strong> (if your total estate exceeds exemption limits). Some states allow you to sell or assign remaining payments. Consult an estate attorney for proper planning.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-green-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-green-600" />
                    Are Powerball and Mega Millions taxed differently?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>No.</strong> Both Powerball and Mega Millions winnings are taxed the same way - as ordinary income subject to federal and state taxes. The only difference might be if you purchased the ticket in a different state than where you live, which could affect which state taxes apply.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-green-300 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-green-600" />
                    When do I have to pay lottery taxes?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    The 24% federal withholding is taken immediately when you claim your prize. You&apos;ll file your regular tax return (due April 15) for the year you won. If you owe additional taxes beyond the withholding, you may need to make <strong>quarterly estimated tax payments</strong> to avoid underpayment penalties.
                  </p>
                </div>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="mb-12">
              <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-yellow-800 mb-2">Important Disclaimer</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      This calculator provides <strong>estimates only</strong> and should not be considered tax advice. Actual taxes may vary based on your specific circumstances, filing status, deductions, and current tax laws. Tax rates and brackets change annually. Always consult a qualified tax professional or CPA for accurate tax calculations on lottery winnings.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Related Calculators */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Related Calculators
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/calculators/income-tax-calculator" className="bg-gradient-to-br from-red-50 to-orange-50 p-5 rounded-xl border-2 border-red-200 hover:border-red-400 transition-colors group">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center group-hover:text-red-700">
                    <Receipt className="w-5 h-5 mr-2 text-red-600" />
                    Income Tax Calculator
                  </h4>
                  <p className="text-sm text-gray-600">
                    Calculate your federal and state income tax with deductions and credits.
                  </p>
                </Link>

                <Link href="/calculators/compound-interest-calculator" className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border-2 border-green-200 hover:border-green-400 transition-colors group">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center group-hover:text-green-700">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    Compound Interest Calculator
                  </h4>
                  <p className="text-sm text-gray-600">
                    See how your lottery winnings could grow with compound interest investments.
                  </p>
                </Link>

                <Link href="/calculators/salary-calculator" className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-colors group">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center group-hover:text-blue-700">
                    <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                    Salary Calculator
                  </h4>
                  <p className="text-sm text-gray-600">
                    Calculate take-home salary after taxes and deductions.
                  </p>
                </Link>

                <Link href="/calculators/sip-calculator" className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-colors group">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center group-hover:text-purple-700">
                    <PiggyBank className="w-5 h-5 mr-2 text-purple-600" />
                    SIP Calculator
                  </h4>
                  <p className="text-sm text-gray-600">
                    Plan systematic investments to grow your lottery winnings over time.
                  </p>
                </Link>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Plan Your Lottery Windfall Wisely</h2>
                <p className="text-lg text-green-100 mb-6 leading-relaxed">
                  Winning the lottery is a life-changing event, but understanding the tax implications is crucial for making smart financial decisions. Whether you choose the lump sum or annuity, proper tax planning can help you maximize your after-tax windfall.
                </p>
                <p className="text-lg text-green-100 leading-relaxed">
                  Use our lottery tax calculator to estimate your take-home amount, then work with qualified financial and tax professionals to create a comprehensive plan for your newfound wealth. Remember: it&apos;s not about how much you win - it&apos;s about how much you keep.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Book Your Session CTA */}
      <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Need Help with Financial Planning?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you understand financial mathematics, tax calculations, investment strategies, and wealth management. Get personalized one-on-one guidance tailored to your learning style.
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
    </div>
  );
}
