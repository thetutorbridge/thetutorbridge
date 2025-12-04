import { NextResponse } from 'next/server';

// Server-side cache
let cachedRates: { [key: string]: number } | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Fallback rates (used if API fails) - Updated Dec 2024
const FALLBACK_RATES: { [key: string]: number } = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.45,
  AED: 3.67,
  SAR: 3.75,
  KWD: 0.31,
  JPY: 149.50,
  CNY: 7.24,
  CAD: 1.36,
  AUD: 1.53,
  CHF: 0.88,
  SGD: 1.34,
  MYR: 4.47,
  THB: 35.20,
  PHP: 55.80,
  IDR: 15650,
  ZAR: 18.20,
  NZD: 1.65,
  HKD: 7.82,
  KRW: 1320,
  MXN: 17.25,
  BRL: 4.95,
  RUB: 92.50,
  TRY: 29.10,
  PLN: 4.02,
  SEK: 10.45,
  NOK: 10.85,
  DKK: 6.92,
  CZK: 22.80,
  HUF: 358,
  ILS: 3.72,
  QAR: 3.64,
  OMR: 0.385,
  BHD: 0.377,
  EGP: 30.90,
  PKR: 281,
  BDT: 110,
  LKR: 325,
  NPR: 133.50,
  VND: 24500,
  TWD: 31.50,
  NGN: 800,
  KES: 153,
  GHS: 12.50,
  MAD: 10.10,
  CLP: 885,
  COP: 4050,
  PEN: 3.75,
  ARS: 365,
  UAH: 37.50,
  RON: 4.62,
  BGN: 1.82,
  HRK: 7.05,
  ISK: 138,
};

async function fetchFreshRates(): Promise<{ [key: string]: number }> {
  try {
    const response = await fetch(
      'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
      {
        next: { revalidate: 86400 }, // Next.js cache for 24 hours
        signal: AbortSignal.timeout(10000) // 10 second timeout
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch rates');
    }

    const data = await response.json();

    // Convert rates to uppercase keys
    const rates: { [key: string]: number } = { USD: 1 };
    Object.keys(data.usd).forEach((key) => {
      rates[key.toUpperCase()] = data.usd[key];
    });

    return rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const now = Date.now();

    // Check if cache is valid
    if (cachedRates && (now - cacheTimestamp) < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        rates: cachedRates,
        lastUpdated: new Date(cacheTimestamp).toISOString(),
        cached: true,
        source: 'server-cache'
      }, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        }
      });
    }

    // Fetch fresh rates
    const freshRates = await fetchFreshRates();

    // Update cache
    cachedRates = freshRates;
    cacheTimestamp = now;

    return NextResponse.json({
      success: true,
      rates: freshRates,
      lastUpdated: new Date(cacheTimestamp).toISOString(),
      cached: false,
      source: 'api'
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      }
    });

  } catch (error) {
    console.error('Exchange rates API error:', error);

    // Return fallback rates if API fails
    return NextResponse.json({
      success: true,
      rates: FALLBACK_RATES,
      lastUpdated: new Date().toISOString(),
      cached: false,
      source: 'fallback',
      warning: 'Using fallback rates due to API error'
    }, {
      status: 200, // Still return 200 with fallback data
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
      }
    });
  }
}
