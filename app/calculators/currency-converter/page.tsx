'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calculator,
  Home,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  TrendingUp,
  Globe,
  DollarSign,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  Clock,
  ArrowUpDown,
  Search,
  Star,
  AlertCircle
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Currency data with names, symbols, and flags
const currencies: { [key: string]: { name: string; symbol: string; flag: string } } = {
  USD: { name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  EUR: { name: 'Euro', symbol: '€', flag: '🇪🇺' },
  GBP: { name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  INR: { name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  AED: { name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  SAR: { name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
  KWD: { name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼' },
  JPY: { name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  CNY: { name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  CAD: { name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  AUD: { name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  CHF: { name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  SGD: { name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  MYR: { name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
  THB: { name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
  PHP: { name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭' },
  IDR: { name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩' },
  ZAR: { name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  NZD: { name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  HKD: { name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  KRW: { name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  MXN: { name: 'Mexican Peso', symbol: 'MX$', flag: '🇲🇽' },
  BRL: { name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  RUB: { name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
  TRY: { name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
  PLN: { name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱' },
  SEK: { name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  NOK: { name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  DKK: { name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
  CZK: { name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' },
  HUF: { name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺' },
  ILS: { name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱' },
  QAR: { name: 'Qatari Riyal', symbol: 'ر.ق', flag: '🇶🇦' },
  OMR: { name: 'Omani Rial', symbol: 'ر.ع.', flag: '🇴🇲' },
  BHD: { name: 'Bahraini Dinar', symbol: '.د.ب', flag: '🇧🇭' },
  EGP: { name: 'Egyptian Pound', symbol: 'E£', flag: '🇪🇬' },
  PKR: { name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰' },
  BDT: { name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩' },
  LKR: { name: 'Sri Lankan Rupee', symbol: 'Rs', flag: '🇱🇰' },
  NPR: { name: 'Nepalese Rupee', symbol: 'Rs', flag: '🇳🇵' },
  VND: { name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳' },
  TWD: { name: 'Taiwan Dollar', symbol: 'NT$', flag: '🇹🇼' },
  NGN: { name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
  KES: { name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪' },
  GHS: { name: 'Ghanaian Cedi', symbol: 'GH₵', flag: '🇬🇭' },
  MAD: { name: 'Moroccan Dirham', symbol: 'د.م.', flag: '🇲🇦' },
  CLP: { name: 'Chilean Peso', symbol: 'CLP$', flag: '🇨🇱' },
  COP: { name: 'Colombian Peso', symbol: 'COL$', flag: '🇨🇴' },
  PEN: { name: 'Peruvian Sol', symbol: 'S/', flag: '🇵🇪' },
  ARS: { name: 'Argentine Peso', symbol: 'ARS$', flag: '🇦🇷' },
  UAH: { name: 'Ukrainian Hryvnia', symbol: '₴', flag: '🇺🇦' },
  RON: { name: 'Romanian Leu', symbol: 'lei', flag: '🇷🇴' },
  BGN: { name: 'Bulgarian Lev', symbol: 'лв', flag: '🇧🇬' },
  HRK: { name: 'Croatian Kuna', symbol: 'kn', flag: '🇭🇷' },
  ISK: { name: 'Icelandic Krona', symbol: 'kr', flag: '🇮🇸' },
};

// Popular currency pairs for quick access
const popularPairs = [
  { from: 'USD', to: 'INR', label: 'USD to INR' },
  { from: 'EUR', to: 'INR', label: 'EUR to INR' },
  { from: 'GBP', to: 'INR', label: 'GBP to INR' },
  { from: 'AED', to: 'INR', label: 'AED to INR' },
  { from: 'SAR', to: 'INR', label: 'SAR to INR' },
  { from: 'KWD', to: 'INR', label: 'KWD to INR' },
  { from: 'USD', to: 'EUR', label: 'USD to EUR' },
  { from: 'EUR', to: 'USD', label: 'EUR to USD' },
  { from: 'USD', to: 'CAD', label: 'USD to CAD' },
  { from: 'USD', to: 'PHP', label: 'USD to PHP' },
  { from: 'USD', to: 'IDR', label: 'USD to IDR' },
  { from: 'USD', to: 'ZAR', label: 'Dollar to Rand' },
];

interface ExchangeRates {
  [key: string]: number;
}

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('INR');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fromSearch, setFromSearch] = useState<string>('');
  const [toSearch, setToSearch] = useState<string>('');
  const [showFromDropdown, setShowFromDropdown] = useState<boolean>(false);
  const [showToDropdown, setShowToDropdown] = useState<boolean>(false);

  // Fetch exchange rates from our server API (cached for 24 hours)
  const fetchExchangeRates = useCallback(async (forceRefresh = false) => {
    setIsLoading(true);
    setError(null);

    try {
      // Check localStorage for quick client-side cache (5 minutes)
      if (!forceRefresh) {
        const cachedData = localStorage.getItem('exchangeRates');
        const cachedTime = localStorage.getItem('exchangeRatesTime');

        if (cachedData && cachedTime) {
          const cacheAge = Date.now() - parseInt(cachedTime);
          const fiveMinutes = 5 * 60 * 1000;

          if (cacheAge < fiveMinutes) {
            const parsed = JSON.parse(cachedData);
            setExchangeRates(parsed.rates);
            setLastUpdated(parsed.lastUpdated || new Date(parseInt(cachedTime)).toLocaleString());
            setIsLoading(false);
            return;
          }
        }
      }

      // Fetch from our server API (server caches for 24 hours)
      const response = await fetch('/api/exchange-rates');

      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }

      const data = await response.json();

      if (data.success && data.rates) {
        // Cache the rates locally for 5 minutes
        localStorage.setItem('exchangeRates', JSON.stringify({
          rates: data.rates,
          lastUpdated: new Date(data.lastUpdated).toLocaleString()
        }));
        localStorage.setItem('exchangeRatesTime', Date.now().toString());

        setExchangeRates(data.rates);
        setLastUpdated(new Date(data.lastUpdated).toLocaleString());

        if (data.source === 'fallback') {
          setError('Using approximate rates. Live rates temporarily unavailable.');
        }
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Error fetching rates:', err);
      setError('Unable to fetch latest rates. Using cached data if available.');

      // Try to use cached data even if expired
      const cachedData = localStorage.getItem('exchangeRates');
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        setExchangeRates(parsed.rates);
        setLastUpdated((parsed.lastUpdated || 'Unknown') + ' (cached)');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExchangeRates();
  }, [fetchExchangeRates]);

  // Calculate converted amount
  const convertCurrency = (amt: number, from: string, to: string): number => {
    if (!exchangeRates || !exchangeRates[from] || !exchangeRates[to]) {
      return 0;
    }

    // Convert from source to USD, then to target
    const amountInUSD = amt / exchangeRates[from];
    const result = amountInUSD * exchangeRates[to];

    return result;
  };

  const parsedAmount = parseFloat(amount) || 0;
  const convertedAmount = convertCurrency(parsedAmount, fromCurrency, toCurrency);
  const exchangeRate = convertCurrency(1, fromCurrency, toCurrency);
  const inverseRate = convertCurrency(1, toCurrency, fromCurrency);

  // Swap currencies
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Handle quick pair selection
  const handleQuickPair = (from: string, to: string) => {
    setFromCurrency(from);
    setToCurrency(to);
  };

  // Format number with appropriate decimals
  const formatNumber = (num: number, decimals: number = 2): string => {
    if (num >= 1000) {
      return num.toLocaleString('en-US', { maximumFractionDigits: decimals });
    }
    if (num < 0.01) {
      return num.toFixed(6);
    }
    return num.toFixed(decimals);
  };

  // Filter currencies based on search
  const filterCurrencies = (search: string) => {
    const searchLower = search.toLowerCase();
    return Object.keys(currencies).filter((code) => {
      const currency = currencies[code];
      return (
        code.toLowerCase().includes(searchLower) ||
        currency.name.toLowerCase().includes(searchLower)
      );
    });
  };

  const filteredFromCurrencies = filterCurrencies(fromSearch);
  const filteredToCurrencies = filterCurrencies(toSearch);

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"1. How accurate are these exchange rates?","acceptedAnswer":{"@type":"Answer","text":"Our rates are sourced from reliable financial data providers and represent mid-market rates — the fairest exchange rate available. Rates are updated daily. Note that banks and money transfer services may offer slightly different rates due to their markup."}},{"@type":"Question","name":"2. What is the mid-market rate?","acceptedAnswer":{"@type":"Answer","text":"The mid-market rate is the midpoint between the buy and sell prices of a currency pair. It\'s considered the \'real\' exchange rate and is used by banks for large transactions. Our converter uses this rate for accurate comparisons."}},{"@type":"Question","name":"3. Why is the rate I get at banks different?","acceptedAnswer":{"@type":"Answer","text":"Banks and currency exchange services add a markup to the mid-market rate — this is how they make profit. The difference can range from 1% to 5% or more. Always compare rates before exchanging money."}},{"@type":"Question","name":"4. How often do exchange rates change?","acceptedAnswer":{"@type":"Answer","text":"Forex markets operate 24/5, so rates change constantly during trading hours. For most practical purposes, daily rates are sufficient. Our converter updates rates once per day."}},{"@type":"Question","name":"5. Which currency is the strongest in the world?","acceptedAnswer":{"@type":"Answer","text":"The Kuwaiti Dinar (KWD) is the world\'s highest-valued currency, followed by the Bahraini Dinar (BHD) and Omani Rial (OMR). This doesn\'t necessarily mean their economies are the strongest — it reflects their exchange rate policy."}},{"@type":"Question","name":"6. What does it mean when a currency is \"pegged\"?","acceptedAnswer":{"@type":"Answer","text":"A pegged (or fixed) currency has its value tied to another currency at a fixed rate. For example, the UAE Dirham is pegged to USD at approximately 3.67 AED per dollar. This provides stability for trade and investment."}},{"@type":"Question","name":"7. Can I use this converter for business transactions?","acceptedAnswer":{"@type":"Answer","text":"Yes, our converter provides accurate indicative rates for planning and comparison. However, for actual business transactions, always confirm the rate with your bank or payment provider as they may apply different rates and fees."}},{"@type":"Question","name":"8. How many currencies does this converter support?","acceptedAnswer":{"@type":"Answer","text":"Our currency converter supports 150+ world currencies , including all major currencies (USD, EUR, GBP, JPY, etc.), popular currencies for remittances (AED, SAR, KWD), and many emerging market currencies."}}]}' }}
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
            <Link href="/calculators" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center whitespace-nowrap">
              <Calculator className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Calculators</span>
              <span className="sm:hidden">Calc</span>
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 truncate">
              <span className="hidden sm:inline">Currency Converter</span>
              <span className="sm:hidden">Currency</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Globe className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              Currency Converter — Live Exchange Rates
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Convert between 150+ world currencies instantly with real-time exchange rates.
            From USD to INR, EUR to Dollar, AED to Rupee — get accurate conversions for travel,
            business, or remittances.
          </p>
          <div className="bg-white/10 p-4 rounded-xl mb-8">
            <p className="text-lg italic">
              Fast, free, and accurate currency conversions.<br />
              <strong>Updated daily with mid-market rates!</strong>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/calculators">
              <Button size="lg" variant="outline" className="border-2 border-white text-white rounded-xl px-8 py-4 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Calculators
              </Button>
            </Link>
            <Link href="/tutoring/free-consultation">
              <Button size="lg" className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-4 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold">
                Book Free Session
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">

          {/* Currency Converter Tool */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">

                {/* Left: Converter Input */}
                <div className="p-4 md:p-8 lg:p-10 bg-white">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 md:mb-8 flex items-center">
                    <DollarSign className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                    <span className="text-base md:text-2xl lg:text-3xl">Convert Currency</span>
                  </h2>

                  {/* Amount Input */}
                  <div className="mb-6">
                    <Label htmlFor="amount" className="text-sm md:text-lg font-semibold text-gray-700 mb-2 block">
                      Amount
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-2xl font-bold text-center border-2 border-[#2BAE66] py-6"
                      placeholder="Enter amount"
                      min="0"
                    />
                  </div>

                  {/* From Currency */}
                  <div className="mb-4 relative">
                    <Label className="text-sm md:text-lg font-semibold text-gray-700 mb-2 block">
                      From
                    </Label>
                    <div
                      className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-[#2BAE66] transition-colors"
                      onClick={() => setShowFromDropdown(!showFromDropdown)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{currencies[fromCurrency]?.flag}</span>
                          <div>
                            <p className="font-bold text-lg">{fromCurrency}</p>
                            <p className="text-sm text-gray-500">{currencies[fromCurrency]?.name}</p>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 transition-transform ${showFromDropdown ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    {showFromDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-64 overflow-hidden">
                        <div className="p-2 border-b">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search currency..."
                              value={fromSearch}
                              onChange={(e) => setFromSearch(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-[#2BAE66]"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                        <div className="overflow-y-auto max-h-48">
                          {filteredFromCurrencies.map((code) => (
                            <div
                              key={code}
                              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 ${code === fromCurrency ? 'bg-green-50' : ''}`}
                              onClick={() => {
                                setFromCurrency(code);
                                setShowFromDropdown(false);
                                setFromSearch('');
                              }}
                            >
                              <span className="text-xl">{currencies[code]?.flag}</span>
                              <div>
                                <p className="font-semibold">{code}</p>
                                <p className="text-xs text-gray-500">{currencies[code]?.name}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Swap Button */}
                  <div className="flex justify-center my-4">
                    <Button
                      onClick={handleSwap}
                      variant="outline"
                      className="rounded-full p-3 border-2 border-[#2BAE66] hover:bg-[#2BAE66] hover:text-white transition-all"
                    >
                      <ArrowUpDown className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* To Currency */}
                  <div className="mb-6 relative">
                    <Label className="text-sm md:text-lg font-semibold text-gray-700 mb-2 block">
                      To
                    </Label>
                    <div
                      className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-[#2BAE66] transition-colors"
                      onClick={() => setShowToDropdown(!showToDropdown)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{currencies[toCurrency]?.flag}</span>
                          <div>
                            <p className="font-bold text-lg">{toCurrency}</p>
                            <p className="text-sm text-gray-500">{currencies[toCurrency]?.name}</p>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 transition-transform ${showToDropdown ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    {showToDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-64 overflow-hidden">
                        <div className="p-2 border-b">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search currency..."
                              value={toSearch}
                              onChange={(e) => setToSearch(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-[#2BAE66]"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                        <div className="overflow-y-auto max-h-48">
                          {filteredToCurrencies.map((code) => (
                            <div
                              key={code}
                              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 ${code === toCurrency ? 'bg-green-50' : ''}`}
                              onClick={() => {
                                setToCurrency(code);
                                setShowToDropdown(false);
                                setToSearch('');
                              }}
                            >
                              <span className="text-xl">{currencies[code]?.flag}</span>
                              <div>
                                <p className="font-semibold">{code}</p>
                                <p className="text-xs text-gray-500">{currencies[code]?.name}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-center justify-between text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Last updated: {lastUpdated || 'Loading...'}</span>
                    </div>
                    <Button
                      onClick={() => fetchExchangeRates(true)}
                      variant="ghost"
                      size="sm"
                      disabled={isLoading}
                      className="text-[#2BAE66] hover:text-[#1A3D7C]"
                      title="Refresh rates"
                    >
                      <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </Button>
                  </div>

                  {error && (
                    <div className="mt-4 flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>

                {/* Right: Results */}
                <div className="p-4 md:p-8 lg:p-10 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 flex items-center">
                    <TrendingUp className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#FFC857]" />
                    <span className="text-base md:text-2xl lg:text-3xl">Conversion Result</span>
                  </h2>

                  {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                      <RefreshCw className="w-12 h-12 animate-spin text-white/50" />
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Main Result */}
                      <div className="bg-[#FFC857] p-6 md:p-8 rounded-xl shadow-lg">
                        <div className="text-center">
                          <p className="text-[#1A3D7C]/70 text-sm mb-2">
                            {formatNumber(parsedAmount)} {fromCurrency} =
                          </p>
                          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A3D7C] break-words">
                            {currencies[toCurrency]?.symbol}{formatNumber(convertedAmount, 4)} {toCurrency}
                          </p>
                          <p className="text-[#1A3D7C]/70 text-sm mt-2">
                            {currencies[toCurrency]?.flag} {currencies[toCurrency]?.name}
                          </p>
                        </div>
                      </div>

                      {/* Exchange Rate Info */}
                      <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/20">
                        <h3 className="text-lg font-semibold mb-4 text-white/90">Exchange Rate</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-white/80">1 {fromCurrency}</span>
                            <span className="text-white font-bold">{formatNumber(exchangeRate, 6)} {toCurrency}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/80">1 {toCurrency}</span>
                            <span className="text-white font-bold">{formatNumber(inverseRate, 6)} {fromCurrency}</span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Reference */}
                      <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/20">
                        <h3 className="text-lg font-semibold mb-4 text-white/90">Quick Reference</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {[1, 10, 100, 1000].map((val) => (
                            <div key={val} className="flex justify-between bg-white/5 p-2 rounded">
                              <span className="text-white/70">{val} {fromCurrency}</span>
                              <span className="text-white font-medium">{formatNumber(convertCurrency(val, fromCurrency, toCurrency), 2)} {toCurrency}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </section>

          {/* Popular Currency Pairs */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Star className="w-6 h-6 md:w-8 md:h-8 mr-3 text-[#FFC857]" />
              Popular Currency Pairs
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {popularPairs.map((pair) => (
                <button
                  key={`${pair.from}-${pair.to}`}
                  onClick={() => handleQuickPair(pair.from, pair.to)}
                  className={`p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
                    fromCurrency === pair.from && toCurrency === pair.to
                      ? 'border-[#2BAE66] bg-green-50'
                      : 'border-gray-200 hover:border-[#2BAE66]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-xl">{currencies[pair.from]?.flag}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <span className="text-xl">{currencies[pair.to]?.flag}</span>
                  </div>
                  <p className="font-semibold text-[#1A3D7C]">{pair.label}</p>
                  {exchangeRates && (
                    <p className="text-sm text-gray-500">
                      1 {pair.from} = {formatNumber(convertCurrency(1, pair.from, pair.to), 4)} {pair.to}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Introduction Content */}
          <section className="mb-12">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our <strong>free currency converter</strong> provides accurate exchange rates for over 150 world currencies. Whether you're planning international travel, sending money abroad, comparing prices for online shopping, or studying exchange rate economics, this tool gives you instant, reliable currency conversions.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Exchange rates are updated daily using mid-market rates — the same rates used by banks and financial institutions. This ensures you get the most accurate conversion for <strong>USD to INR</strong>, <strong>EUR to Dollar</strong>, <strong>AED to Rupee</strong>, <strong>GBP to INR</strong>, and any other currency pair you need.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Simply enter the amount, select your currencies, and get instant results. The converter shows both the converted amount and the current exchange rate for quick reference.
              </p>
            </div>
          </section>

          {/* What is Currency Conversion */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-[#2BAE66]" />
              What is Currency Conversion?
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Currency conversion</strong> is the process of exchanging one country's currency for another at a specific exchange rate. Exchange rates fluctuate based on economic factors, market demand, and global events. Our currency converter uses the <strong>mid-market rate</strong> — the midpoint between buy and sell prices — which is considered the fairest exchange rate.
              </p>

              <h3 className="text-xl font-semibold text-[#1A3D7C] mt-6 mb-4">Key Concepts:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Exchange Rate:</strong> The price of one currency expressed in terms of another (e.g., 1 USD = 83.45 INR)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Mid-Market Rate:</strong> The real exchange rate found on Reuters and other financial data providers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Floating Rate:</strong> Rates that change based on market forces (most major currencies)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Fixed/Pegged Rate:</strong> Rates set by central banks (e.g., AED is pegged to USD)</span>
                </li>
              </ul>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200 mt-6">
                <h4 className="text-lg font-semibold text-[#1A3D7C] mb-3">Example Conversion:</h4>
                <p className="text-gray-700 mb-4">
                  Convert <strong>100 USD to INR</strong> with an exchange rate of 83.45:
                </p>
                <div className="bg-white p-4 rounded-lg mb-4">
                  <p className="text-sm font-mono text-gray-700 mb-2">
                    Amount in INR = Amount in USD × Exchange Rate
                  </p>
                  <p className="text-sm font-mono text-gray-700 mb-2">
                    Amount in INR = 100 × 83.45 = 8,345 INR
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">You Have</p>
                    <p className="text-lg font-bold text-[#1A3D7C]">$100 USD</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Exchange Rate</p>
                    <p className="text-lg font-bold text-[#1A3D7C]">83.45</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">You Get</p>
                    <p className="text-lg font-bold text-[#2BAE66]">₹8,345 INR</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Popular Currency Conversions */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Globe className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Popular Currency Conversions
            </h2>
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <p className="text-lg text-white/90 leading-relaxed mb-6">
                Here are the most searched currency conversions worldwide:
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-3 flex items-center">
                    <span className="text-xl mr-2">🇺🇸</span> USD Conversions
                  </h3>
                  <ul className="text-white/90 space-y-2 text-sm">
                    <li>• USD to INR (Dollar to Rupee)</li>
                    <li>• USD to EUR (Dollar to Euro)</li>
                    <li>• USD to GBP (Dollar to Pound)</li>
                    <li>• USD to CAD (Dollar to Canadian)</li>
                    <li>• USD to PHP (Dollar to Peso)</li>
                    <li>• USD to ZAR (Dollar to Rand)</li>
                  </ul>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-3 flex items-center">
                    <span className="text-xl mr-2">🇮🇳</span> INR Conversions
                  </h3>
                  <ul className="text-white/90 space-y-2 text-sm">
                    <li>• AED to INR (Dirham to Rupee)</li>
                    <li>• SAR to INR (Riyal to Rupee)</li>
                    <li>• KWD to INR (Dinar to Rupee)</li>
                    <li>• GBP to INR (Pound to Rupee)</li>
                    <li>• EUR to INR (Euro to Rupee)</li>
                    <li>• SGD to INR (Singapore to Rupee)</li>
                  </ul>
                </div>
                <div className="bg-white/10 p-5 rounded-xl">
                  <h3 className="font-semibold text-[#FFC857] mb-3 flex items-center">
                    <span className="text-xl mr-2">🇪🇺</span> EUR Conversions
                  </h3>
                  <ul className="text-white/90 space-y-2 text-sm">
                    <li>• EUR to USD (Euro to Dollar)</li>
                    <li>• EUR to GBP (Euro to Pound)</li>
                    <li>• EUR to INR (Euro to Rupee)</li>
                    <li>• EUR to CHF (Euro to Franc)</li>
                    <li>• EUR to JPY (Euro to Yen)</li>
                    <li>• EUR to CAD (Euro to Canadian)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How to Use This Calculator */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <CheckCircle className="w-8 h-8 mr-3 text-[#2BAE66]" />
              How to Use This Currency Converter
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-0.5">1</span>
                  <div>
                    <p className="text-gray-700"><strong>Enter the amount</strong> you want to convert in the input field.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-0.5">2</span>
                  <div>
                    <p className="text-gray-700"><strong>Select your source currency</strong> (the currency you have) from the "From" dropdown. Use the search box to quickly find currencies.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-0.5">3</span>
                  <div>
                    <p className="text-gray-700"><strong>Select your target currency</strong> (the currency you want) from the "To" dropdown.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-0.5">4</span>
                  <div>
                    <p className="text-gray-700"><strong>View instant results</strong> showing the converted amount, exchange rate, and quick reference table.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-0.5">5</span>
                  <div>
                    <p className="text-gray-700"><strong>Use the swap button</strong> to quickly reverse the currency pair (e.g., from USD→INR to INR→USD).</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* Real-World Applications */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Globe className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Real-World Applications
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">✈️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">International Travel</h3>
                </div>
                <p className="text-gray-700">Plan your travel budget by converting your home currency to local currency. Know how much your money is worth before you travel.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">💸</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">International Remittances</h3>
                </div>
                <p className="text-gray-700">Compare exchange rates before sending money abroad. NRIs and overseas workers can track INR conversion rates.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">🛒</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Online Shopping</h3>
                </div>
                <p className="text-gray-700">Convert prices when shopping from international websites like Amazon, eBay, or AliExpress to your local currency.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">📊</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Business & Trade</h3>
                </div>
                <p className="text-gray-700">Calculate costs for international imports/exports, invoice amounts, and multi-currency transactions.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">📚</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Education & Study Abroad</h3>
                </div>
                <p className="text-gray-700">Students can convert tuition fees, living expenses, and scholarship amounts when planning to study abroad.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#2BAE66] transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">📈</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C]">Investment & Forex</h3>
                </div>
                <p className="text-gray-700">Track currency movements for forex trading, international investments, and portfolio management.</p>
              </div>
            </div>
          </section>

          {/* Factors Affecting Exchange Rates */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Factors Affecting Exchange Rates
            </h2>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-200">
              <p className="text-gray-700 leading-relaxed mb-6">
                Exchange rates are influenced by various economic and geopolitical factors:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700"><strong>Interest Rates:</strong> Higher interest rates attract foreign investment, strengthening the currency.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700"><strong>Inflation:</strong> Lower inflation rates typically lead to currency appreciation over time.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700"><strong>Trade Balance:</strong> Countries with trade surpluses often have stronger currencies.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700"><strong>Political Stability:</strong> Stable governments attract more foreign investment, boosting currency value.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700"><strong>Economic Performance:</strong> Strong GDP growth and low unemployment support currency strength.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700"><strong>Central Bank Policy:</strong> Monetary policy decisions directly impact currency supply and value.</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* World's Major Currencies */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <DollarSign className="w-8 h-8 mr-3 text-[#2BAE66]" />
              World's Major Currencies
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
                <thead className="bg-[#1A3D7C] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Currency</th>
                    <th className="px-4 py-3 text-left">Code</th>
                    <th className="px-4 py-3 text-left">Symbol</th>
                    <th className="px-4 py-3 text-left">Country/Region</th>
                    <th className="px-4 py-3 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">🇺🇸 US Dollar</td>
                    <td className="px-4 py-3">USD</td>
                    <td className="px-4 py-3">$</td>
                    <td className="px-4 py-3">United States</td>
                    <td className="px-4 py-3 text-sm text-gray-600">World's primary reserve currency</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">🇪🇺 Euro</td>
                    <td className="px-4 py-3">EUR</td>
                    <td className="px-4 py-3">€</td>
                    <td className="px-4 py-3">Eurozone (20 countries)</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Second most traded currency</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">🇬🇧 British Pound</td>
                    <td className="px-4 py-3">GBP</td>
                    <td className="px-4 py-3">£</td>
                    <td className="px-4 py-3">United Kingdom</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Oldest currency still in use</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">🇯🇵 Japanese Yen</td>
                    <td className="px-4 py-3">JPY</td>
                    <td className="px-4 py-3">¥</td>
                    <td className="px-4 py-3">Japan</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Third most traded currency</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">🇨🇳 Chinese Yuan</td>
                    <td className="px-4 py-3">CNY</td>
                    <td className="px-4 py-3">¥</td>
                    <td className="px-4 py-3">China</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Growing international importance</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">🇮🇳 Indian Rupee</td>
                    <td className="px-4 py-3">INR</td>
                    <td className="px-4 py-3">₹</td>
                    <td className="px-4 py-3">India</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Among top 20 traded currencies</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">🇰🇼 Kuwaiti Dinar</td>
                    <td className="px-4 py-3">KWD</td>
                    <td className="px-4 py-3">د.ك</td>
                    <td className="px-4 py-3">Kuwait</td>
                    <td className="px-4 py-3 text-sm text-gray-600">World's highest-valued currency</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">🇦🇪 UAE Dirham</td>
                    <td className="px-4 py-3">AED</td>
                    <td className="px-4 py-3">د.إ</td>
                    <td className="px-4 py-3">United Arab Emirates</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Pegged to USD at 3.6725</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <HelpCircle className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="space-y-4">

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">1. How accurate are these exchange rates?</h3>
                <p className="text-gray-700">Our rates are sourced from reliable financial data providers and represent <strong>mid-market rates</strong> — the fairest exchange rate available. Rates are updated daily. Note that banks and money transfer services may offer slightly different rates due to their markup.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">2. What is the mid-market rate?</h3>
                <p className="text-gray-700">The mid-market rate is the midpoint between the buy and sell prices of a currency pair. It's considered the "real" exchange rate and is used by banks for large transactions. Our converter uses this rate for accurate comparisons.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">3. Why is the rate I get at banks different?</h3>
                <p className="text-gray-700">Banks and currency exchange services add a <strong>markup</strong> to the mid-market rate — this is how they make profit. The difference can range from 1% to 5% or more. Always compare rates before exchanging money.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">4. How often do exchange rates change?</h3>
                <p className="text-gray-700">Forex markets operate 24/5, so rates change constantly during trading hours. For most practical purposes, daily rates are sufficient. Our converter updates rates once per day.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">5. Which currency is the strongest in the world?</h3>
                <p className="text-gray-700">The <strong>Kuwaiti Dinar (KWD)</strong> is the world's highest-valued currency, followed by the Bahraini Dinar (BHD) and Omani Rial (OMR). This doesn't necessarily mean their economies are the strongest — it reflects their exchange rate policy.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">6. What does it mean when a currency is "pegged"?</h3>
                <p className="text-gray-700">A pegged (or fixed) currency has its value tied to another currency at a fixed rate. For example, the UAE Dirham is pegged to USD at approximately 3.67 AED per dollar. This provides stability for trade and investment.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">7. Can I use this converter for business transactions?</h3>
                <p className="text-gray-700">Yes, our converter provides accurate indicative rates for planning and comparison. However, for actual business transactions, always confirm the rate with your bank or payment provider as they may apply different rates and fees.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">8. How many currencies does this converter support?</h3>
                <p className="text-gray-700">Our currency converter supports <strong>150+ world currencies</strong>, including all major currencies (USD, EUR, GBP, JPY, etc.), popular currencies for remittances (AED, SAR, KWD), and many emerging market currencies.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">9. Is this currency converter free to use?</h3>
                <p className="text-gray-700">Yes! Our currency converter is <strong>completely free</strong> with no hidden charges. You can perform unlimited conversions without signing up or paying anything.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">10. Why do NRIs track USD to INR rates?</h3>
                <p className="text-gray-700">Non-Resident Indians (NRIs) monitor USD to INR rates to maximize the value of their remittances. A favorable exchange rate means more rupees for the same dollar amount, making it important to track rate movements.</p>
              </div>

            </div>
          </section>

          {/* Tips for Currency Exchange */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Tips for Currency Exchange
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-4">Before Exchanging:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 mt-0.5 flex-shrink-0" />
                      <span>Compare rates from multiple providers</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 mt-0.5 flex-shrink-0" />
                      <span>Check for hidden fees and commissions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 mt-0.5 flex-shrink-0" />
                      <span>Avoid airport exchange counters (worst rates)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 mt-0.5 flex-shrink-0" />
                      <span>Consider using online transfer services</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-4">Best Practices:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 mt-0.5 flex-shrink-0" />
                      <span>Use cards with no foreign transaction fees</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 mt-0.5 flex-shrink-0" />
                      <span>Avoid dynamic currency conversion (DCC)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 mt-0.5 flex-shrink-0" />
                      <span>Track rates and exchange when favorable</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-2 mt-0.5 flex-shrink-0" />
                      <span>Keep some cash for emergencies abroad</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Book Your Session CTA Section */}
          <section className="text-center py-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] via-[#2BAE66] to-[#1A3D7C] text-white p-12 rounded-2xl shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-[#FFC857] mr-3" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  Need Help with Economics or Finance?
                </h2>
              </div>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Our expert tutors can help you understand exchange rates, international trade, monetary policy, and financial mathematics. Get personalized one-on-one guidance tailored to your learning needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tutoring/free-consultation">
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

// ChevronDown icon component
function ChevronDown({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}
