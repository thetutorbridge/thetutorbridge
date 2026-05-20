import { NextResponse } from 'next/server';

// Server-side cache
let cachedRates: { [key: string]: number } | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

// Fallback rates (updated May 2026) - used only if ALL APIs fail
const FALLBACK_RATES: { [key: string]: number } = {
  USD: 1,
  EUR: 0.91,
  GBP: 0.78,
  INR: 84.50,
  AED: 3.67,
  SAR: 3.75,
  KWD: 0.31,
  JPY: 157.50,
  CNY: 7.25,
  CAD: 1.38,
  AUD: 1.55,
  CHF: 0.90,
  SGD: 1.35,
  MYR: 4.72,
  THB: 35.70,
  PHP: 56.50,
  IDR: 16100,
  ZAR: 18.50,
  NZD: 1.68,
  HKD: 7.82,
  KRW: 1380,
  MXN: 17.50,
  BRL: 5.10,
  RUB: 92.00,
  TRY: 32.50,
  PLN: 4.05,
  SEK: 10.80,
  NOK: 11.00,
  DKK: 6.95,
  CZK: 23.50,
  HUF: 370,
  ILS: 3.75,
  QAR: 3.64,
  OMR: 0.385,
  BHD: 0.377,
  EGP: 49.50,
  PKR: 280,
  BDT: 118,
  LKR: 298,
  NPR: 135,
  VND: 25400,
  TWD: 32.50,
  NGN: 1550,
  KES: 129,
  GHS: 15.50,
  MAD: 10.00,
  CLP: 950,
  COP: 4200,
  PEN: 3.78,
  ARS: 980,
  UAH: 41.50,
  RON: 4.65,
  BGN: 1.82,
  HRK: 7.05,
  ISK: 140,
};

// API 1: Frankfurter (ECB-based, very reliable, free)
async function fetchFromFrankfurter(): Promise<{ [key: string]: number }> {
  const response = await fetch(
    'https://api.frankfurter.app/latest?from=USD',
    {
      signal: AbortSignal.timeout(8000),
      headers: { 'Accept': 'application/json' }
    }
  );

  if (!response.ok) throw new Error('Frankfurter API failed');

  const data = await response.json();
  const rates: { [key: string]: number } = { USD: 1 };

  Object.keys(data.rates).forEach((key) => {
    rates[key.toUpperCase()] = data.rates[key];
  });

  return rates;
}

// API 2: ExchangeRate.host (free, no API key needed for basic usage)
async function fetchFromExchangeRateHost(): Promise<{ [key: string]: number }> {
  const response = await fetch(
    'https://api.exchangerate.host/latest?base=USD',
    {
      signal: AbortSignal.timeout(8000),
      headers: { 'Accept': 'application/json' }
    }
  );

  if (!response.ok) throw new Error('ExchangeRate.host API failed');

  const data = await response.json();

  if (!data.success && !data.rates) {
    throw new Error('Invalid response from ExchangeRate.host');
  }

  const rates: { [key: string]: number } = { USD: 1 };

  Object.keys(data.rates || {}).forEach((key) => {
    rates[key.toUpperCase()] = data.rates[key];
  });

  return rates;
}

// API 3: FloatRates (completely free, no limits)
async function fetchFromFloatRates(): Promise<{ [key: string]: number }> {
  const response = await fetch(
    'https://www.floatrates.com/daily/usd.json',
    {
      signal: AbortSignal.timeout(8000),
      headers: { 'Accept': 'application/json' }
    }
  );

  if (!response.ok) throw new Error('FloatRates API failed');

  const data = await response.json();
  const rates: { [key: string]: number } = { USD: 1 };

  Object.keys(data).forEach((key) => {
    if (data[key] && data[key].rate) {
      rates[key.toUpperCase()] = data[key].rate;
    }
  });

  return rates;
}

// API 4: Fawaz Ahmed Currency API (free, GitHub hosted)
async function fetchFromFawazAhmed(): Promise<{ [key: string]: number }> {
  const response = await fetch(
    'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
    {
      signal: AbortSignal.timeout(8000)
    }
  );

  if (!response.ok) throw new Error('Fawaz Ahmed API failed');

  const data = await response.json();
  const rates: { [key: string]: number } = { USD: 1 };

  Object.keys(data.usd || {}).forEach((key) => {
    rates[key.toUpperCase()] = data.usd[key];
  });

  return rates;
}

// Try multiple APIs in order until one succeeds
async function fetchFreshRates(): Promise<{ rates: { [key: string]: number }; source: string }> {
  const apis = [
    { name: 'frankfurter', fetch: fetchFromFrankfurter },
    { name: 'floatrates', fetch: fetchFromFloatRates },
    { name: 'fawazahmed', fetch: fetchFromFawazAhmed },
    { name: 'exchangeratehost', fetch: fetchFromExchangeRateHost },
  ];

  for (const api of apis) {
    try {
      console.log(`Trying ${api.name} API...`);
      const rates = await api.fetch();

      // Validate that we got essential currencies
      if (rates.USD && rates.EUR && rates.INR && Object.keys(rates).length > 20) {
        console.log(`Successfully fetched rates from ${api.name}`);
        return { rates, source: api.name };
      }
    } catch (error) {
      console.error(`${api.name} API failed:`, error);
    }
  }

  throw new Error('All exchange rate APIs failed');
}

export async function GET() {
  try {
    const now = Date.now();

    // Check if cache is valid (6 hours)
    if (cachedRates && (now - cacheTimestamp) < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        rates: cachedRates,
        lastUpdated: new Date(cacheTimestamp).toISOString(),
        cached: true,
        source: 'server-cache'
      }, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=21600',
        }
      });
    }

    // Fetch fresh rates from available APIs
    const { rates: freshRates, source } = await fetchFreshRates();

    // Merge with fallback to ensure all currencies are available
    const mergedRates = { ...FALLBACK_RATES, ...freshRates };

    // Update cache
    cachedRates = mergedRates;
    cacheTimestamp = now;

    return NextResponse.json({
      success: true,
      rates: mergedRates,
      lastUpdated: new Date(cacheTimestamp).toISOString(),
      cached: false,
      source: source
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=21600',
      }
    });

  } catch (error) {
    console.error('Exchange rates API error:', error);

    // Return fallback rates if all APIs fail
    return NextResponse.json({
      success: true,
      rates: FALLBACK_RATES,
      lastUpdated: new Date().toISOString(),
      cached: false,
      source: 'fallback',
      warning: 'Using fallback rates - live rates temporarily unavailable'
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
      }
    });
  }
}
