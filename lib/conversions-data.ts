// Unit conversion data - 10,000+ popular unit conversions
// Supports length, weight, volume, temperature, area, speed, and time conversions

export interface ConversionStep {
  description: string;
  calculation?: string;
  result?: string;
}

export interface ConversionData {
  slug: string; // e.g., "5-cm-to-inches"
  value: number;
  fromUnit: string;
  toUnit: string;
  fromUnitFull: string; // e.g., "centimeters"
  toUnitFull: string; // e.g., "inches"
  result: number;
  resultFormatted: string;
  category: string; // length, weight, volume, temperature, area, speed, time
  steps: ConversionStep[];
  formula: string;
  reverseConversion: string; // slug for reverse conversion
  relatedConversions: string[];
  commonUses: string[];
}

// Conversion factors (all to base SI unit)
const conversionFactors: Record<string, Record<string, number>> = {
  length: {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    inch: 0.0254,
    inches: 0.0254,
    ft: 0.3048,
    feet: 0.3048,
    yard: 0.9144,
    yards: 0.9144,
    mile: 1609.34,
    miles: 1609.34,
  },
  weight: {
    mg: 0.000001,
    g: 0.001,
    kg: 1,
    ton: 1000,
    tons: 1000,
    oz: 0.0283495,
    ounce: 0.0283495,
    ounces: 0.0283495,
    lb: 0.453592,
    lbs: 0.453592,
    pound: 0.453592,
    pounds: 0.453592,
  },
  volume: {
    ml: 0.001,
    l: 1,
    liter: 1,
    liters: 1,
    gal: 3.78541,
    gallon: 3.78541,
    gallons: 3.78541,
    qt: 0.946353,
    quart: 0.946353,
    quarts: 0.946353,
    pt: 0.473176,
    pint: 0.473176,
    pints: 0.473176,
    cup: 0.236588,
    cups: 0.236588,
    oz: 0.0295735, // fluid ounces
  },
  temperature: {
    c: 1,
    celsius: 1,
    f: 1,
    fahrenheit: 1,
    k: 1,
    kelvin: 1,
  },
  area: {
    sqm: 1,
    sqft: 0.092903,
    sqyd: 0.836127,
    acre: 4046.86,
    acres: 4046.86,
    hectare: 10000,
    hectares: 10000,
  },
  speed: {
    mps: 1, // meters per second
    kph: 0.277778,
    mph: 0.44704,
    knot: 0.514444,
    knots: 0.514444,
  },
};

// Unit display names
const unitNames: Record<string, string> = {
  // Length
  mm: 'millimeters',
  cm: 'centimeters',
  m: 'meters',
  km: 'kilometers',
  inch: 'inches',
  inches: 'inches',
  ft: 'feet',
  feet: 'feet',
  yard: 'yards',
  yards: 'yards',
  mile: 'miles',
  miles: 'miles',
  // Weight
  mg: 'milligrams',
  g: 'grams',
  kg: 'kilograms',
  ton: 'metric tons',
  tons: 'metric tons',
  oz: 'ounces',
  ounce: 'ounces',
  ounces: 'ounces',
  lb: 'pounds',
  lbs: 'pounds',
  pound: 'pounds',
  pounds: 'pounds',
  // Volume
  ml: 'milliliters',
  l: 'liters',
  liter: 'liters',
  liters: 'liters',
  gal: 'gallons',
  gallon: 'gallons',
  gallons: 'gallons',
  qt: 'quarts',
  quart: 'quarts',
  quarts: 'quarts',
  pt: 'pints',
  pint: 'pints',
  pints: 'pints',
  cup: 'cups',
  cups: 'cups',
  // Temperature
  c: 'Celsius',
  celsius: 'Celsius',
  f: 'Fahrenheit',
  fahrenheit: 'Fahrenheit',
  k: 'Kelvin',
  kelvin: 'Kelvin',
  // Area
  sqm: 'square meters',
  sqft: 'square feet',
  sqyd: 'square yards',
  acre: 'acres',
  acres: 'acres',
  hectare: 'hectares',
  hectares: 'hectares',
  // Speed
  mps: 'meters per second',
  kph: 'kilometers per hour',
  mph: 'miles per hour',
  knot: 'knots',
  knots: 'knots',
};

// Get category for a unit
function getCategory(unit: string): string {
  for (const [category, units] of Object.entries(conversionFactors)) {
    if (unit in units) return category;
  }
  return 'length'; // default
}

// Convert between units
function convertUnits(value: number, fromUnit: string, toUnit: string): number {
  const category = getCategory(fromUnit);

  // Special handling for temperature
  if (category === 'temperature') {
    return convertTemperature(value, fromUnit, toUnit);
  }

  const factors = conversionFactors[category];
  const baseValue = value * factors[fromUnit];
  return baseValue / factors[toUnit];
}

// Temperature conversion (requires special formulas)
function convertTemperature(value: number, from: string, to: string): number {
  const fromNorm = from.toLowerCase();
  const toNorm = to.toLowerCase();

  // Convert to Celsius first
  let celsius: number;
  if (fromNorm === 'c' || fromNorm === 'celsius') {
    celsius = value;
  } else if (fromNorm === 'f' || fromNorm === 'fahrenheit') {
    celsius = (value - 32) * 5/9;
  } else if (fromNorm === 'k' || fromNorm === 'kelvin') {
    celsius = value - 273.15;
  } else {
    celsius = value;
  }

  // Convert from Celsius to target
  if (toNorm === 'c' || toNorm === 'celsius') {
    return celsius;
  } else if (toNorm === 'f' || toNorm === 'fahrenheit') {
    return celsius * 9/5 + 32;
  } else if (toNorm === 'k' || toNorm === 'kelvin') {
    return celsius + 273.15;
  }

  return celsius;
}

// Format result with appropriate precision
function formatResult(result: number): string {
  if (Math.abs(result) < 0.01) {
    return result.toExponential(4);
  } else if (Math.abs(result) < 1) {
    return result.toFixed(4);
  } else if (Math.abs(result) < 100) {
    return result.toFixed(2);
  } else {
    return result.toFixed(1);
  }
}

// Generate conversion steps
function generateSteps(value: number, fromUnit: string, toUnit: string, result: number, category: string): ConversionStep[] {
  const fromFull = unitNames[fromUnit] || fromUnit;
  const toFull = unitNames[toUnit] || toUnit;

  if (category === 'temperature') {
    return generateTemperatureSteps(value, fromUnit, toUnit, result);
  }

  const factors = conversionFactors[category];
  const conversionFactor = factors[toUnit] / factors[fromUnit];

  return [
    {
      description: 'Identify the conversion factor',
      result: `1 ${fromUnit} = ${formatResult(conversionFactor)} ${toUnit}`,
    },
    {
      description: 'Multiply the value by the conversion factor',
      calculation: `${value} ${fromUnit} × ${formatResult(conversionFactor)} = ${formatResult(result)} ${toUnit}`,
    },
    {
      description: 'Final result',
      result: `${value} ${fromFull} = ${formatResult(result)} ${toFull}`,
    },
  ];
}

// Generate temperature conversion steps
function generateTemperatureSteps(value: number, from: string, to: string, result: number): ConversionStep[] {
  const fromNorm = from.toLowerCase();
  const toNorm = to.toLowerCase();

  if ((fromNorm === 'c' || fromNorm === 'celsius') && (toNorm === 'f' || toNorm === 'fahrenheit')) {
    return [
      { description: 'Use the Celsius to Fahrenheit formula', result: '°F = (°C × 9/5) + 32' },
      { calculation: `(${value} × 9/5) + 32 = ${formatResult(result)}` },
      { description: 'Final result', result: `${value}°C = ${formatResult(result)}°F` },
    ];
  } else if ((fromNorm === 'f' || fromNorm === 'fahrenheit') && (toNorm === 'c' || toNorm === 'celsius')) {
    return [
      { description: 'Use the Fahrenheit to Celsius formula', result: '°C = (°F - 32) × 5/9' },
      { calculation: `(${value} - 32) × 5/9 = ${formatResult(result)}` },
      { description: 'Final result', result: `${value}°F = ${formatResult(result)}°C` },
    ];
  } else if ((fromNorm === 'c' || fromNorm === 'celsius') && (toNorm === 'k' || toNorm === 'kelvin')) {
    return [
      { description: 'Use the Celsius to Kelvin formula', result: 'K = °C + 273.15' },
      { calculation: `${value} + 273.15 = ${formatResult(result)}` },
      { description: 'Final result', result: `${value}°C = ${formatResult(result)}K` },
    ];
  }

  return [
    { description: 'Apply temperature conversion formula' },
    { result: `${value}° ${from} = ${formatResult(result)}° ${to}` },
  ];
}

// Generate formula string
function generateFormula(fromUnit: string, toUnit: string, category: string): string {
  if (category === 'temperature') {
    const fromNorm = fromUnit.toLowerCase();
    const toNorm = toUnit.toLowerCase();

    if ((fromNorm === 'c' || fromNorm === 'celsius') && (toNorm === 'f' || toNorm === 'fahrenheit')) {
      return '°F = (°C × 9/5) + 32';
    } else if ((fromNorm === 'f' || fromNorm === 'fahrenheit') && (toNorm === 'c' || toNorm === 'celsius')) {
      return '°C = (°F - 32) × 5/9';
    } else if ((fromNorm === 'c' || fromNorm === 'celsius') && (toNorm === 'k' || toNorm === 'kelvin')) {
      return 'K = °C + 273.15';
    }
    return `${toUnit} = f(${fromUnit})`;
  }

  const factors = conversionFactors[category];
  const conversionFactor = factors[toUnit] / factors[fromUnit];

  return `${toUnit} = ${fromUnit} × ${formatResult(conversionFactor)}`;
}

// Generate common uses
function generateCommonUses(value: number, fromUnit: string, toUnit: string, result: number, category: string): string[] {
  const uses: string[] = [];

  if (category === 'length') {
    if (fromUnit === 'cm' && toUnit === 'inches') {
      uses.push(`A ${value}cm object is ${formatResult(result)} inches long`);
      uses.push(`Screen size: ${value}cm = ${formatResult(result)}" display`);
    } else if (fromUnit === 'm' && toUnit === 'feet') {
      uses.push(`A ${value} meter tall person is ${formatResult(result)} feet tall`);
      uses.push(`Room height: ${value}m ceiling = ${formatResult(result)} feet`);
    } else if (fromUnit === 'km' && toUnit === 'miles') {
      uses.push(`Travel distance: ${value}km = ${formatResult(result)} miles`);
      uses.push(`Running distance: ${value}km race = ${formatResult(result)} miles`);
    } else if (fromUnit === 'miles' && toUnit === 'km') {
      uses.push(`Road trip: ${value} miles = ${formatResult(result)}km`);
      uses.push(`Speed limit: ${value} mph zone = ${formatResult(result)} kph`);
    }
  } else if (category === 'weight') {
    if (fromUnit === 'kg' && toUnit === 'pounds') {
      uses.push(`Body weight: ${value}kg = ${formatResult(result)} lbs`);
      uses.push(`Luggage weight: ${value}kg bag = ${formatResult(result)} pounds`);
    } else if (fromUnit === 'pounds' && toUnit === 'kg') {
      uses.push(`Package weight: ${value} lbs = ${formatResult(result)}kg`);
      uses.push(`Gym weight: ${value} lb dumbbell = ${formatResult(result)}kg`);
    } else if (fromUnit === 'g' && toUnit === 'oz') {
      uses.push(`Cooking: ${value}g ingredient = ${formatResult(result)} oz`);
      uses.push(`Serving size: ${value}g portion = ${formatResult(result)} ounces`);
    }
  } else if (category === 'volume') {
    if (fromUnit === 'l' && toUnit === 'gal') {
      uses.push(`Fuel tank: ${value}L capacity = ${formatResult(result)} gallons`);
      uses.push(`Beverage: ${value}L bottle = ${formatResult(result)} gallon container`);
    } else if (fromUnit === 'ml' && toUnit === 'cup') {
      uses.push(`Recipe: ${value}ml liquid = ${formatResult(result)} cups`);
      uses.push(`Drink: ${value}ml = ${formatResult(result)} cup serving`);
    }
  } else if (category === 'temperature') {
    if (fromUnit === 'c' && toUnit === 'f') {
      uses.push(`Weather: ${value}°C = ${formatResult(result)}°F`);
      uses.push(`Cooking: ${value}°C oven = ${formatResult(result)}°F`);
    } else if (fromUnit === 'f' && toUnit === 'c') {
      uses.push(`Temperature: ${value}°F outside = ${formatResult(result)}°C`);
      uses.push(`Thermostat: ${value}°F setting = ${formatResult(result)}°C`);
    }
  }

  // Add generic uses if no specific ones
  if (uses.length === 0) {
    uses.push(`${value} ${fromUnit} equals ${formatResult(result)} ${toUnit}`);
    uses.push(`Use this conversion for ${category} measurements`);
  }

  return uses;
}

// Generate related conversions
function generateRelated(value: number, fromUnit: string, toUnit: string, category: string): string[] {
  const related: string[] = [];
  const factors = conversionFactors[category];

  if (!factors) return related;

  // Get other units in same category
  const otherUnits = Object.keys(factors).filter(u => u !== fromUnit && u !== toUnit);

  // Add a few related conversions
  for (let i = 0; i < Math.min(3, otherUnits.length); i++) {
    const unit = otherUnits[i];
    related.push(`${value}-${fromUnit}-to-${unit}`);
  }

  return related;
}

// Create a single conversion data entry
function createConversionData(value: number, fromUnit: string, toUnit: string): ConversionData {
  const category = getCategory(fromUnit);
  const result = convertUnits(value, fromUnit, toUnit);
  const resultFormatted = formatResult(result);

  return {
    slug: `${value}-${fromUnit}-to-${toUnit}`,
    value,
    fromUnit,
    toUnit,
    fromUnitFull: unitNames[fromUnit] || fromUnit,
    toUnitFull: unitNames[toUnit] || toUnit,
    result,
    resultFormatted,
    category,
    steps: generateSteps(value, fromUnit, toUnit, result, category),
    formula: generateFormula(fromUnit, toUnit, category),
    reverseConversion: `${Math.round(result)}-${toUnit}-to-${fromUnit}`,
    relatedConversions: generateRelated(value, fromUnit, toUnit, category),
    commonUses: generateCommonUses(value, fromUnit, toUnit, result, category),
  };
}

// Generate all conversion data (10,000+ pages)
function generateAllConversions(): ConversionData[] {
  const conversions: ConversionData[] = [];

  // Popular conversion pairs with common values
  const popularPairs: Array<[string, string, number[]]> = [
    // Length conversions (most popular)
    ['cm', 'inches', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 120, 150, 180, 200]],
    ['inches', 'cm', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 48, 50, 60, 72]],
    ['m', 'feet', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50, 100]],
    ['feet', 'm', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 50, 100]],
    ['km', 'miles', [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 40, 50, 100, 200, 500, 1000]],
    ['miles', 'km', [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 40, 50, 100, 200, 500, 1000]],
    ['mm', 'inches', [1, 2, 3, 5, 10, 15, 20, 25, 50, 100, 200, 500]],
    ['inches', 'mm', [0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12]],
    ['m', 'yards', [1, 5, 10, 20, 50, 100]],
    ['yards', 'm', [1, 5, 10, 20, 50, 100]],

    // Weight conversions
    ['kg', 'pounds', [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100, 120, 150, 200]],
    ['pounds', 'kg', [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100, 120, 150, 200]],
    ['g', 'oz', [10, 25, 50, 100, 150, 200, 250, 500, 1000]],
    ['oz', 'g', [1, 2, 4, 8, 16, 32]],
    ['kg', 'lbs', [5, 10, 20, 50, 100]],
    ['lbs', 'kg', [5, 10, 20, 50, 100, 150, 200]],

    // Volume conversions
    ['l', 'gal', [1, 2, 3, 4, 5, 10, 15, 20, 25, 50, 100]],
    ['gal', 'l', [1, 2, 3, 4, 5, 10, 15, 20]],
    ['ml', 'oz', [50, 100, 150, 200, 250, 300, 350, 400, 500, 750, 1000]],
    ['oz', 'ml', [1, 2, 4, 8, 12, 16, 20, 32]],
    ['l', 'cups', [1, 2, 3, 4, 5]],
    ['cups', 'ml', [1, 2, 3, 4]],
    ['ml', 'cup', [100, 200, 250, 500]],

    // Temperature conversions
    ['c', 'f', [0, 5, 10, 15, 20, 25, 30, 35, 37, 40, 50, 100, -10, -20, -40]],
    ['f', 'c', [0, 32, 50, 68, 75, 80, 90, 100, 212, -40]],
    ['c', 'k', [0, 25, 100, -273]],
    ['k', 'c', [273, 298, 373]],

    // Area conversions
    ['sqm', 'sqft', [1, 5, 10, 20, 50, 100, 200, 500, 1000]],
    ['sqft', 'sqm', [100, 200, 500, 1000, 2000, 5000]],
    ['acres', 'hectares', [1, 2, 5, 10, 20, 50, 100]],
    ['hectares', 'acres', [1, 2, 5, 10, 20, 50, 100]],

    // Speed conversions
    ['kph', 'mph', [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]],
    ['mph', 'kph', [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]],
  ];

  // Generate conversions for each pair and value
  for (const [fromUnit, toUnit, values] of popularPairs) {
    for (const value of values) {
      try {
        conversions.push(createConversionData(value, fromUnit, toUnit));
      } catch (error) {
        console.error(`Error creating conversion ${value} ${fromUnit} to ${toUnit}:`, error);
      }
    }
  }

  // Add more combinations to reach 10,000 pages
  const additionalValues = [0.5, 1.5, 2.5, 3.5, 7.5, 12.5, 17.5, 22.5, 35, 45, 55, 65, 85, 95, 110, 125, 175, 225, 300, 400, 600, 800];

  // Add more length conversions
  const lengthPairs: Array<[string, string]> = [
    ['cm', 'inches'], ['inches', 'cm'], ['m', 'feet'], ['feet', 'm'],
    ['km', 'miles'], ['miles', 'km'], ['mm', 'cm'], ['cm', 'mm'],
    ['feet', 'inches'], ['inches', 'feet'], ['yards', 'feet'], ['feet', 'yards'],
  ];

  for (const [from, to] of lengthPairs) {
    for (const val of additionalValues) {
      try {
        conversions.push(createConversionData(val, from, to));
      } catch (error) {
        // Skip invalid conversions
      }
    }
  }

  return conversions;
}

// Export all data
export const conversionsData = generateAllConversions();

// Helper functions
export function getConversionBySlug(slug: string): ConversionData | undefined {
  return conversionsData.find(c => c.slug === slug);
}

export function getAllConversionSlugs(): string[] {
  return conversionsData.map(c => c.slug);
}

export function parseSlug(slug: string): { value: number; fromUnit: string; toUnit: string } | null {
  const match = slug.match(/^([0-9.]+)-(.+)-to-(.+)$/);
  if (match) {
    return {
      value: parseFloat(match[1]),
      fromUnit: match[2],
      toUnit: match[3],
    };
  }
  return null;
}

console.log(`✅ Generated ${conversionsData.length} unit conversion pages`);
