'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Calculator, Globe, DollarSign, TrendingUp, ArrowRight, CheckCircle, HelpCircle, Lightbulb, RefreshCw, MapPin, Building2, Plane, Home, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

// PPP conversion factors relative to USD (2024 data based on World Bank/IMF estimates)
// PPP factor > 1 means currency is undervalued (things are cheaper)
// PPP factor < 1 means currency is overvalued (things are more expensive)
// Exchange rates are fetched live from API
interface CountryPPPData {
  name: string;
  currency: string;
  symbol: string;
  pppFactor: number;
  fallbackExchangeRate: number; // Used if API fails
}

const pppBaseData: Record<string, CountryPPPData> = {
  'US': { name: 'United States', currency: 'USD', symbol: '$', pppFactor: 1.00, fallbackExchangeRate: 1.00 },
  'IN': { name: 'India', currency: 'INR', symbol: '₹', pppFactor: 22.89, fallbackExchangeRate: 84.50 },
  'UK': { name: 'United Kingdom', currency: 'GBP', symbol: '£', pppFactor: 0.69, fallbackExchangeRate: 0.78 },
  'DE': { name: 'Germany', currency: 'EUR', symbol: '€', pppFactor: 0.75, fallbackExchangeRate: 0.91 },
  'FR': { name: 'France', currency: 'EUR', symbol: '€', pppFactor: 0.78, fallbackExchangeRate: 0.91 },
  'JP': { name: 'Japan', currency: 'JPY', symbol: '¥', pppFactor: 97.07, fallbackExchangeRate: 157.50 },
  'CN': { name: 'China', currency: 'CNY', symbol: '¥', pppFactor: 4.19, fallbackExchangeRate: 7.25 },
  'CA': { name: 'Canada', currency: 'CAD', symbol: '$', pppFactor: 1.21, fallbackExchangeRate: 1.38 },
  'AU': { name: 'Australia', currency: 'AUD', symbol: '$', pppFactor: 1.48, fallbackExchangeRate: 1.55 },
  'SG': { name: 'Singapore', currency: 'SGD', symbol: '$', pppFactor: 0.84, fallbackExchangeRate: 1.35 },
  'AE': { name: 'UAE', currency: 'AED', symbol: 'د.إ', pppFactor: 2.26, fallbackExchangeRate: 3.67 },
  'CH': { name: 'Switzerland', currency: 'CHF', symbol: 'Fr', pppFactor: 0.91, fallbackExchangeRate: 0.90 },
  'NL': { name: 'Netherlands', currency: 'EUR', symbol: '€', pppFactor: 0.79, fallbackExchangeRate: 0.91 },
  'SE': { name: 'Sweden', currency: 'SEK', symbol: 'kr', pppFactor: 9.11, fallbackExchangeRate: 10.80 },
  'NO': { name: 'Norway', currency: 'NOK', symbol: 'kr', pppFactor: 10.28, fallbackExchangeRate: 11.00 },
  'DK': { name: 'Denmark', currency: 'DKK', symbol: 'kr', pppFactor: 6.63, fallbackExchangeRate: 6.95 },
  'IE': { name: 'Ireland', currency: 'EUR', symbol: '€', pppFactor: 0.82, fallbackExchangeRate: 0.91 },
  'NZ': { name: 'New Zealand', currency: 'NZD', symbol: '$', pppFactor: 1.47, fallbackExchangeRate: 1.68 },
  'BR': { name: 'Brazil', currency: 'BRL', symbol: 'R$', pppFactor: 2.58, fallbackExchangeRate: 5.10 },
  'MX': { name: 'Mexico', currency: 'MXN', symbol: '$', pppFactor: 9.94, fallbackExchangeRate: 17.50 },
  'KR': { name: 'South Korea', currency: 'KRW', symbol: '₩', pppFactor: 867.41, fallbackExchangeRate: 1380 },
  'IT': { name: 'Italy', currency: 'EUR', symbol: '€', pppFactor: 0.72, fallbackExchangeRate: 0.91 },
  'ES': { name: 'Spain', currency: 'EUR', symbol: '€', pppFactor: 0.66, fallbackExchangeRate: 0.91 },
  'PL': { name: 'Poland', currency: 'PLN', symbol: 'zł', pppFactor: 1.99, fallbackExchangeRate: 4.05 },
  'MY': { name: 'Malaysia', currency: 'MYR', symbol: 'RM', pppFactor: 1.79, fallbackExchangeRate: 4.72 },
  'TH': { name: 'Thailand', currency: 'THB', symbol: '฿', pppFactor: 12.42, fallbackExchangeRate: 35.70 },
  'PH': { name: 'Philippines', currency: 'PHP', symbol: '₱', pppFactor: 19.44, fallbackExchangeRate: 56.50 },
  'ID': { name: 'Indonesia', currency: 'IDR', symbol: 'Rp', pppFactor: 4749.09, fallbackExchangeRate: 16100 },
  'VN': { name: 'Vietnam', currency: 'VND', symbol: '₫', pppFactor: 7785.45, fallbackExchangeRate: 25400 },
  'ZA': { name: 'South Africa', currency: 'ZAR', symbol: 'R', pppFactor: 7.28, fallbackExchangeRate: 18.50 },
  'IL': { name: 'Israel', currency: 'ILS', symbol: '₪', pppFactor: 3.94, fallbackExchangeRate: 3.75 },
  'PT': { name: 'Portugal', currency: 'EUR', symbol: '€', pppFactor: 0.59, fallbackExchangeRate: 0.91 },
  'CZ': { name: 'Czech Republic', currency: 'CZK', symbol: 'Kč', pppFactor: 14.19, fallbackExchangeRate: 23.50 },
  'HU': { name: 'Hungary', currency: 'HUF', symbol: 'Ft', pppFactor: 166.49, fallbackExchangeRate: 370 },
  'RO': { name: 'Romania', currency: 'RON', symbol: 'lei', pppFactor: 2.01, fallbackExchangeRate: 4.65 },
  'AT': { name: 'Austria', currency: 'EUR', symbol: '€', pppFactor: 0.78, fallbackExchangeRate: 0.91 },
  'BE': { name: 'Belgium', currency: 'EUR', symbol: '€', pppFactor: 0.79, fallbackExchangeRate: 0.91 },
  'FI': { name: 'Finland', currency: 'EUR', symbol: '€', pppFactor: 0.87, fallbackExchangeRate: 0.91 },
  'GR': { name: 'Greece', currency: 'EUR', symbol: '€', pppFactor: 0.57, fallbackExchangeRate: 0.91 },
  'HK': { name: 'Hong Kong', currency: 'HKD', symbol: '$', pppFactor: 5.60, fallbackExchangeRate: 7.82 },
  'TW': { name: 'Taiwan', currency: 'TWD', symbol: '$', pppFactor: 15.14, fallbackExchangeRate: 32.50 },
  'AR': { name: 'Argentina', currency: 'ARS', symbol: '$', pppFactor: 212.47, fallbackExchangeRate: 980 },
  'CO': { name: 'Colombia', currency: 'COP', symbol: '$', pppFactor: 1669.45, fallbackExchangeRate: 4200 },
  'CL': { name: 'Chile', currency: 'CLP', symbol: '$', pppFactor: 457.82, fallbackExchangeRate: 950 },
  'PE': { name: 'Peru', currency: 'PEN', symbol: 'S/', pppFactor: 1.79, fallbackExchangeRate: 3.78 },
  'PK': { name: 'Pakistan', currency: 'PKR', symbol: '₨', pppFactor: 39.57, fallbackExchangeRate: 280 },
  'BD': { name: 'Bangladesh', currency: 'BDT', symbol: '৳', pppFactor: 35.89, fallbackExchangeRate: 118 },
  'NG': { name: 'Nigeria', currency: 'NGN', symbol: '₦', pppFactor: 198.45, fallbackExchangeRate: 1550 },
  'EG': { name: 'Egypt', currency: 'EGP', symbol: '£', pppFactor: 6.45, fallbackExchangeRate: 49.50 },
  'SA': { name: 'Saudi Arabia', currency: 'SAR', symbol: '﷼', pppFactor: 1.81, fallbackExchangeRate: 3.75 },
  'RU': { name: 'Russia', currency: 'RUB', symbol: '₽', pppFactor: 28.34, fallbackExchangeRate: 92 },
  'TR': { name: 'Turkey', currency: 'TRY', symbol: '₺', pppFactor: 8.67, fallbackExchangeRate: 32.50 },
  'UA': { name: 'Ukraine', currency: 'UAH', symbol: '₴', pppFactor: 11.89, fallbackExchangeRate: 41.50 },
};

export default function PPPSalaryCalculatorPage() {
  const [salary, setSalary] = useState<number>(100000);
  const [sourceCountry, setSourceCountry] = useState<string>('US');
  const [targetCountry, setTargetCountry] = useState<string>('IN');
  const [period, setPeriod] = useState<string>('annual');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [ratesLastUpdated, setRatesLastUpdated] = useState<string>('');
  const [isLoadingRates, setIsLoadingRates] = useState<boolean>(true);
  const [ratesSource, setRatesSource] = useState<string>('');

  // Fetch live exchange rates
  const fetchExchangeRates = useCallback(async () => {
    setIsLoadingRates(true);
    try {
      const response = await fetch('/api/exchange-rates');
      const data = await response.json();

      if (data.success && data.rates) {
        setExchangeRates(data.rates);
        setRatesLastUpdated(new Date(data.lastUpdated).toLocaleString());
        setRatesSource(data.source);
      }
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      // Use fallback rates
      const fallbackRates: Record<string, number> = {};
      Object.entries(pppBaseData).forEach(([, countryData]) => {
        fallbackRates[countryData.currency] = countryData.fallbackExchangeRate;
      });
      setExchangeRates(fallbackRates);
      setRatesSource('fallback');
    } finally {
      setIsLoadingRates(false);
    }
  }, []);

  useEffect(() => {
    fetchExchangeRates();
  }, [fetchExchangeRates]);

  // Get exchange rate for a currency (live or fallback)
  const getExchangeRate = useCallback((currency: string, fallback: number): number => {
    return exchangeRates[currency] || fallback;
  }, [exchangeRates]);

  // Build pppData with live exchange rates
  const pppData = useMemo(() => {
    const data: Record<string, { name: string; currency: string; symbol: string; pppFactor: number; exchangeRate: number }> = {};
    Object.entries(pppBaseData).forEach(([code, countryData]) => {
      data[code] = {
        ...countryData,
        exchangeRate: getExchangeRate(countryData.currency, countryData.fallbackExchangeRate)
      };
    });
    return data;
  }, [getExchangeRate]);

  const sortedCountries = useMemo(() => {
    return Object.entries(pppData)
      .sort(([, a], [, b]) => a.name.localeCompare(b.name))
      .map(([code, data]) => ({ code, ...data }));
  }, [pppData]);

  const calculatePPPSalary = useMemo(() => {
    const source = pppData[sourceCountry];
    const target = pppData[targetCountry];

    if (!source || !target) return null;

    // Convert source salary to USD using PPP
    const salaryInUSDPPP = salary / source.pppFactor;

    // Convert USD to target currency using PPP
    const equivalentSalaryPPP = salaryInUSDPPP * target.pppFactor;

    // Market exchange rate conversion (for comparison)
    const salaryInUSD = salary / source.exchangeRate;
    const equivalentSalaryMarket = salaryInUSD * target.exchangeRate;

    // Cost of living adjustment factor
    const costOfLivingFactor = (target.exchangeRate / target.pppFactor) / (source.exchangeRate / source.pppFactor);

    // Purchasing power ratio
    const purchasingPowerRatio = (target.pppFactor / target.exchangeRate) / (source.pppFactor / source.exchangeRate);

    return {
      equivalentSalaryPPP: Math.round(equivalentSalaryPPP),
      equivalentSalaryMarket: Math.round(equivalentSalaryMarket),
      salaryInUSD: Math.round(salaryInUSD),
      costOfLivingFactor: costOfLivingFactor,
      purchasingPowerRatio: purchasingPowerRatio,
      source,
      target,
      pppDifference: Math.round(equivalentSalaryPPP - equivalentSalaryMarket),
      pppDifferencePercent: ((equivalentSalaryPPP - equivalentSalaryMarket) / equivalentSalaryMarket * 100).toFixed(1),
    };
  }, [salary, sourceCountry, targetCountry, pppData]);

  const formatCurrency = (amount: number, symbol: string) => {
    if (amount >= 10000000) {
      return `${symbol}${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `${symbol}${(amount / 100000).toFixed(2)} L`;
    } else if (amount >= 1000) {
      return `${symbol}${amount.toLocaleString()}`;
    }
    return `${symbol}${amount.toLocaleString()}`;
  };

  const swapCountries = () => {
    const temp = sourceCountry;
    setSourceCountry(targetCountry);
    setTargetCountry(temp);
  };

  const getMonthlyValue = (value: number) => {
    return period === 'annual' ? Math.round(value / 12) : value;
  };

  const getAnnualValue = (value: number) => {
    return period === 'monthly' ? value * 12 : value;
  };

  const displaySalary = period === 'annual' ? salary : Math.round(salary / 12);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': [
              {
                '@type': 'Question',
                'name': 'What is a PPP Salary Calculator?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'A PPP Salary Calculator uses Purchasing Power Parity to compare salaries across different countries. It calculates the equivalent salary you would need in another country to maintain the same standard of living, accounting for differences in cost of living and purchasing power.'
                }
              },
              {
                '@type': 'Question',
                'name': 'What is Purchasing Power Parity (PPP)?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Purchasing Power Parity (PPP) is an economic theory that compares different countries\' currencies through a basket of goods approach. It determines how much money is needed in one country to buy the same goods and services in another country, providing a more accurate comparison than market exchange rates.'
                }
              },
              {
                '@type': 'Question',
                'name': 'How is PPP salary calculated?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'PPP salary is calculated by first converting your salary to a common currency (usually USD) using PPP conversion factors, then converting to the target currency using its PPP factor. The formula is: Equivalent Salary = (Original Salary / Source PPP Factor) × Target PPP Factor.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Why is PPP important for salary comparison?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'PPP is important because market exchange rates don\'t reflect the true cost of living in different countries. A $100,000 salary in the US has different purchasing power than an equivalent amount in India or Switzerland. PPP adjustment shows the real value of your salary in terms of what you can actually buy.'
                }
              },
              {
                '@type': 'Question',
                'name': 'What is the difference between PPP and market exchange rate?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Market exchange rates are determined by supply and demand in currency markets and can be volatile. PPP rates are calculated based on the cost of a standardized basket of goods and services, providing a more stable measure of relative purchasing power between countries.'
                }
              },
              {
                '@type': 'Question',
                'name': 'How can I use PPP salary calculator for relocation decisions?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'When relocating, use the PPP calculator to determine the minimum salary you need in your new country to maintain your current lifestyle. If the PPP-adjusted equivalent is higher than your job offer, you may experience a decrease in purchasing power despite a nominally higher salary.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Are PPP conversion factors accurate?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'PPP factors are estimates based on World Bank and IMF data and are updated periodically. While they provide a good approximation, actual cost of living can vary significantly within a country based on city, lifestyle, and personal spending habits.'
                }
              },
              {
                '@type': 'Question',
                'name': 'What does a PPP factor greater than 1 mean?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'A PPP factor greater than 1 (compared to USD) means the local currency is undervalued by market exchange rates - goods and services are relatively cheaper in that country. This is common in developing countries like India, where the cost of living is lower than what exchange rates suggest.'
                }
              }
            ]
          })
        }}
      />
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Breadcrumb */}
        <div className="bg-white/80 backdrop-blur-sm py-3 px-4 shadow-sm">
          <div className="max-w-6xl mx-auto">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/calculators" className="text-blue-600 hover:text-blue-800">
                Calculators
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 font-medium">PPP Salary Calculator</span>
            </nav>
          </div>
        </div>

        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#6B46C1] text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Globe className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">PPP Salary Calculator</h1>
            </div>
            <p className="text-xl text-center text-purple-100 max-w-3xl mx-auto">
              Compare salaries across countries using Purchasing Power Parity (PPP). Calculate your equivalent salary and understand the real value of your income in different countries.
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
                  Enter Your Salary Details
                </h2>

                <div className="space-y-6">
                  {/* Salary Input */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="salary" className="text-base font-semibold text-gray-700 mb-2 block">
                        Your Salary
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                          {pppData[sourceCountry]?.symbol}
                        </span>
                        <Input
                          id="salary"
                          type="number"
                          value={salary}
                          onChange={(e) => setSalary(Number(e.target.value))}
                          className="pl-10 text-lg h-12"
                          min="0"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="period" className="text-base font-semibold text-gray-700 mb-2 block">
                        Salary Period
                      </Label>
                      <Select value={period} onValueChange={setPeriod}>
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="annual">Annual</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Country Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
                    <div>
                      <Label htmlFor="sourceCountry" className="text-base font-semibold text-gray-700 mb-2 block">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        From Country
                      </Label>
                      <Select value={sourceCountry} onValueChange={setSourceCountry}>
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-80">
                          {sortedCountries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.name} ({country.currency})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={swapCountries}
                      className="h-12 w-12 rounded-full border-2 hover:bg-purple-50"
                    >
                      <RefreshCw className="w-5 h-5 text-purple-600" />
                    </Button>

                    <div>
                      <Label htmlFor="targetCountry" className="text-base font-semibold text-gray-700 mb-2 block">
                        <Plane className="w-4 h-4 inline mr-1" />
                        To Country
                      </Label>
                      <Select value={targetCountry} onValueChange={setTargetCountry}>
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-80">
                          {sortedCountries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.name} ({country.currency})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Exchange Rate Status */}
                  <div className={`flex items-center justify-between p-3 rounded-lg ${ratesSource === 'fallback' ? 'bg-yellow-50 border border-yellow-200' : 'bg-green-50 border border-green-200'}`}>
                    <div className="flex items-center text-sm">
                      {isLoadingRates ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin text-gray-500" />
                          <span className="text-gray-600">Loading live exchange rates...</span>
                        </>
                      ) : ratesSource === 'fallback' ? (
                        <>
                          <AlertCircle className="w-4 h-4 mr-2 text-yellow-600" />
                          <span className="text-yellow-700">Using approximate rates. Live rates temporarily unavailable.</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                          <span className="text-green-700">Live exchange rates ({ratesSource})</span>
                        </>
                      )}
                    </div>
                    {ratesLastUpdated && !isLoadingRates && (
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">Updated: {ratesLastUpdated}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={fetchExchangeRates}
                          className="h-6 w-6 p-0"
                        >
                          <RefreshCw className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* PPP Explanation */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border-2 border-purple-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-3 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                  How PPP Salary Calculation Works
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Step 1:</strong> Convert your salary to USD using PPP factor: {pppData[sourceCountry]?.symbol}{salary.toLocaleString()} ÷ {pppData[sourceCountry]?.pppFactor} = ${calculatePPPSalary?.salaryInUSD.toLocaleString()}</p>
                  <p><strong>Step 2:</strong> Convert USD to target currency using PPP: ${calculatePPPSalary?.salaryInUSD.toLocaleString()} × {pppData[targetCountry]?.pppFactor} = {pppData[targetCountry]?.symbol}{calculatePPPSalary?.equivalentSalaryPPP.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-2">PPP factors reflect the relative cost of goods and services, not market exchange rates.</p>
                </div>
              </div>

              {/* Comparison Table */}
              {calculatePPPSalary && (
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
                  <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">Detailed Comparison</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-600">Metric</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-600">{pppData[sourceCountry]?.name}</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-600">{pppData[targetCountry]?.name}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-700">PPP Factor</td>
                          <td className="py-3 px-4 text-right font-medium">{pppData[sourceCountry]?.pppFactor}</td>
                          <td className="py-3 px-4 text-right font-medium">{pppData[targetCountry]?.pppFactor}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-700">Market Exchange Rate (vs USD)</td>
                          <td className="py-3 px-4 text-right font-medium">{pppData[sourceCountry]?.exchangeRate}</td>
                          <td className="py-3 px-4 text-right font-medium">{pppData[targetCountry]?.exchangeRate}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-700">Your {period === 'annual' ? 'Annual' : 'Monthly'} Salary</td>
                          <td className="py-3 px-4 text-right font-medium text-green-600">
                            {pppData[sourceCountry]?.symbol}{salary.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-purple-600">
                            {pppData[targetCountry]?.symbol}{calculatePPPSalary.equivalentSalaryPPP.toLocaleString()}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-blue-50">
                          <td className="py-3 px-4 text-gray-700">Market Rate Conversion</td>
                          <td className="py-3 px-4 text-right font-medium">{pppData[sourceCountry]?.symbol}{salary.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right font-medium">{pppData[targetCountry]?.symbol}{calculatePPPSalary.equivalentSalaryMarket.toLocaleString()}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-700">PPP vs Market Difference</td>
                          <td className="py-3 px-4 text-right">-</td>
                          <td className="py-3 px-4 text-right font-medium">
                            <span className={calculatePPPSalary.pppDifference >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {calculatePPPSalary.pppDifference >= 0 ? '+' : ''}{pppData[targetCountry]?.symbol}{calculatePPPSalary.pppDifference.toLocaleString()} ({calculatePPPSalary.pppDifferencePercent}%)
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Results */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[#1A3D7C] to-[#6B46C1] text-white p-6 md:p-8 rounded-xl shadow-xl sticky top-4">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2" />
                  PPP Salary Result
                </h2>

                {calculatePPPSalary && (
                  <div className="space-y-4">
                    {/* Original Salary */}
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <p className="text-sm text-purple-200 mb-1">Your Salary in {pppData[sourceCountry]?.name}</p>
                      <p className="text-2xl font-bold">
                        {pppData[sourceCountry]?.symbol}{salary.toLocaleString()}
                        <span className="text-sm font-normal text-purple-200 ml-2">/{period === 'annual' ? 'year' : 'month'}</span>
                      </p>
                    </div>

                    {/* Equivalent in USD */}
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <p className="text-sm text-purple-200 mb-1">Equivalent in USD (PPP)</p>
                      <p className="text-xl font-semibold">${calculatePPPSalary.salaryInUSD.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-8 h-8 text-yellow-300 animate-pulse" />
                    </div>

                    {/* PPP Equivalent Salary */}
                    <div className="bg-white/20 backdrop-blur-sm p-5 rounded-lg border-2 border-yellow-400">
                      <p className="text-sm text-yellow-200 mb-1 font-medium">PPP Equivalent in {pppData[targetCountry]?.name}</p>
                      <p className="text-3xl font-bold text-yellow-300">
                        {formatCurrency(calculatePPPSalary.equivalentSalaryPPP, pppData[targetCountry]?.symbol)}
                      </p>
                      <p className="text-sm text-purple-200 mt-1">per {period === 'annual' ? 'year' : 'month'}</p>
                    </div>

                    {/* Market Rate */}
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <p className="text-sm text-purple-200 mb-1">Market Exchange Rate</p>
                      <p className="text-lg font-semibold">
                        {pppData[targetCountry]?.symbol}{calculatePPPSalary.equivalentSalaryMarket.toLocaleString()}
                      </p>
                    </div>

                    {/* Insight */}
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <p className="text-sm text-purple-200 mb-2">What this means:</p>
                      <p className="text-sm leading-relaxed">
                        {calculatePPPSalary.pppDifference >= 0
                          ? `To maintain the same purchasing power in ${pppData[targetCountry]?.name}, you need ${pppData[targetCountry]?.symbol}${calculatePPPSalary.equivalentSalaryPPP.toLocaleString()} - which is ${calculatePPPSalary.pppDifferencePercent}% more than market exchange rate conversion.`
                          : `Cost of living in ${pppData[targetCountry]?.name} is higher. You'd need ${pppData[targetCountry]?.symbol}${calculatePPPSalary.equivalentSalaryPPP.toLocaleString()} for equivalent purchasing power.`
                        }
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-[#1A3D7C] mb-8">
              Why Use Our PPP Salary Calculator?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Accurate PPP Data',
                  description: 'Uses World Bank and IMF Purchasing Power Parity factors for reliable salary comparisons across 50+ countries.',
                  icon: Globe
                },
                {
                  title: 'Real Value Comparison',
                  description: 'Understand the actual purchasing power of your salary, not just the nominal exchange rate conversion.',
                  icon: DollarSign
                },
                {
                  title: 'Relocation Planning',
                  description: 'Make informed decisions about job offers abroad by knowing the minimum salary needed to maintain your lifestyle.',
                  icon: Plane
                },
                {
                  title: 'Instant Calculation',
                  description: 'Get immediate PPP-adjusted salary equivalents with detailed breakdowns and comparisons.',
                  icon: Calculator
                },
                {
                  title: 'Cost of Living Insight',
                  description: 'See how differences in cost of living affect your real income between countries.',
                  icon: Building2
                },
                {
                  title: 'Market vs PPP Comparison',
                  description: 'Compare market exchange rates with PPP rates to understand currency valuation differences.',
                  icon: TrendingUp
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg"
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#1A3D7C] to-[#6B46C1] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">{benefit.title}</h3>
                      <p className="text-gray-700 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-[#1A3D7C] mb-8">
              Frequently Asked Questions About PPP Salary Calculator
            </h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {[
                {
                  question: 'What is a PPP Salary Calculator?',
                  answer: 'A PPP Salary Calculator uses Purchasing Power Parity to compare salaries across different countries. It calculates the equivalent salary you would need in another country to maintain the same standard of living, accounting for differences in cost of living and purchasing power.'
                },
                {
                  question: 'What is Purchasing Power Parity (PPP)?',
                  answer: 'Purchasing Power Parity (PPP) is an economic theory that compares different countries\' currencies through a basket of goods approach. It determines how much money is needed in one country to buy the same goods and services in another country, providing a more accurate comparison than market exchange rates.'
                },
                {
                  question: 'How is PPP salary calculated?',
                  answer: 'PPP salary is calculated by first converting your salary to a common currency (usually USD) using PPP conversion factors, then converting to the target currency using its PPP factor. The formula is: Equivalent Salary = (Original Salary / Source PPP Factor) × Target PPP Factor.'
                },
                {
                  question: 'Why is PPP important for salary comparison?',
                  answer: 'PPP is important because market exchange rates don\'t reflect the true cost of living in different countries. A $100,000 salary in the US has different purchasing power than an equivalent amount in India or Switzerland. PPP adjustment shows the real value of your salary in terms of what you can actually buy.'
                },
                {
                  question: 'What is the difference between PPP and market exchange rate?',
                  answer: 'Market exchange rates are determined by supply and demand in currency markets and can be volatile. PPP rates are calculated based on the cost of a standardized basket of goods and services, providing a more stable measure of relative purchasing power between countries.'
                },
                {
                  question: 'How can I use PPP salary calculator for relocation decisions?',
                  answer: 'When relocating, use the PPP calculator to determine the minimum salary you need in your new country to maintain your current lifestyle. If the PPP-adjusted equivalent is higher than your job offer, you may experience a decrease in purchasing power despite a nominally higher salary.'
                },
                {
                  question: 'Are PPP conversion factors accurate?',
                  answer: 'PPP factors are estimates based on World Bank and IMF data and are updated periodically. While they provide a good approximation, actual cost of living can vary significantly within a country based on city, lifestyle, and personal spending habits.'
                },
                {
                  question: 'What does a PPP factor greater than 1 mean?',
                  answer: 'A PPP factor greater than 1 (compared to USD) means the local currency is undervalued by market exchange rates - goods and services are relatively cheaper in that country. This is common in developing countries like India, where the cost of living is lower than what exchange rates suggest.'
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 flex items-start">
                    <HelpCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-purple-600" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 ml-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Calculators */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-[#1A3D7C] mb-8">
              Related Calculators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Salary Calculator', href: '/calculators/salary-calculator', description: 'Calculate take-home salary from CTC' },
                { name: 'Currency Converter', href: '/calculators/currency-converter', description: 'Convert between 150+ currencies' },
                { name: 'Salary to Hourly Calculator', href: '/calculators/salary-to-hourly-calculator', description: 'Convert salary to hourly rate' },
                { name: 'Annual Income Calculator', href: '/calculators/annual-income-calculator', description: 'Calculate annual income from hourly wage' },
              ].map((calc) => (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:border-purple-400 hover:shadow-lg transition-all group"
                >
                  <h3 className="font-semibold text-[#1A3D7C] group-hover:text-purple-600 mb-1">{calc.name}</h3>
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
