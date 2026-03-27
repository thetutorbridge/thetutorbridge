// Percentage calculation data
// Pattern: "What is X% of Y?"

export interface PercentageData {
  slug: string; // e.g., "15-percent-of-120"
  percent: number;
  of: number;
  result: number;
  resultFormatted: string; // with decimal places if needed
  steps: PercentageStep[];
  method1: string; // Decimal method
  method2: string; // Fraction method
  realWorldExamples: string[];
  relatedCalculations: string[];
}

export interface PercentageStep {
  description: string;
  calculation?: string;
  result?: string;
}

// Generate slug from percent and number
export function generateSlug(percent: number, of: number): string {
  return `${percent}-percent-of-${of}`;
}

// Calculate percentage
function calculatePercentage(percent: number, of: number): number {
  return (percent / 100) * of;
}

// Format result with appropriate decimal places
function formatResult(result: number): string {
  if (Number.isInteger(result)) {
    return result.toString();
  }
  // Show up to 2 decimal places, remove trailing zeros
  return parseFloat(result.toFixed(2)).toString();
}

// Generate calculation steps
function generateSteps(percent: number, of: number, result: number): PercentageStep[] {
  return [
    {
      description: 'Convert the percentage to a decimal',
      calculation: `${percent}% = ${percent / 100}`,
    },
    {
      description: 'Multiply the decimal by the number',
      calculation: `${percent / 100} × ${of}`,
      result: formatResult(result),
    },
    {
      description: 'Final answer',
      result: `${percent}% of ${of} = ${formatResult(result)}`,
    },
  ];
}

// Generate real-world examples
function generateExamples(percent: number, of: number, result: number): string[] {
  const examples: string[] = [];

  if (of >= 50 && of <= 1000) {
    examples.push(`If a product costs $${of} and has a ${percent}% discount, you save $${formatResult(result)}`);
  }

  if (of >= 100 && of <= 500 && percent <= 100) {
    examples.push(`Scoring ${formatResult(result)} out of ${of} points gives you ${percent}%`);
  }

  if (percent >= 10 && percent <= 30) {
    examples.push(`A ${percent}% tip on a $${of} bill is $${formatResult(result)}`);
  }

  examples.push(`${percent}% of ${of} items equals ${formatResult(result)} items`);

  if (percent === 50) {
    examples.push(`Half of ${of} is ${formatResult(result)}`);
  }

  if (percent === 25) {
    examples.push(`A quarter of ${of} is ${formatResult(result)}`);
  }

  if (percent === 75) {
    examples.push(`Three quarters of ${of} is ${formatResult(result)}`);
  }

  return examples.slice(0, 3);
}

// Generate related calculations
function generateRelated(percent: number, of: number): string[] {
  const related: string[] = [];

  // Add nearby percentages
  if (percent > 5) related.push(generateSlug(percent - 5, of));
  if (percent < 95) related.push(generateSlug(percent + 5, of));

  // Add same percentage of nearby numbers
  if (of >= 50) related.push(generateSlug(percent, of - 10));
  if (of <= 950) related.push(generateSlug(percent, of + 10));

  // Add complementary percentage
  const complement = 100 - percent;
  if (complement !== percent && complement > 0) {
    related.push(generateSlug(complement, of));
  }

  // Add double and half
  if (percent <= 50) related.push(generateSlug(percent * 2, of));
  if (percent >= 10 && percent % 2 === 0) related.push(generateSlug(percent / 2, of));

  return related.filter((slug, index, self) => self.indexOf(slug) === index).slice(0, 4);
}

// Create percentage data entry
function createPercentageData(percent: number, of: number): PercentageData {
  const result = calculatePercentage(percent, of);
  const slug = generateSlug(percent, of);

  return {
    slug,
    percent,
    of,
    result,
    resultFormatted: formatResult(result),
    steps: generateSteps(percent, of, result),
    method1: `Convert ${percent}% to decimal (${percent / 100}) and multiply by ${of}`,
    method2: `Calculate (${percent} ÷ 100) × ${of} = ${formatResult(result)}`,
    realWorldExamples: generateExamples(percent, of, result),
    relatedCalculations: generateRelated(percent, of),
  };
}

// 100 most popular percentage calculations
export const percentageData: PercentageData[] = [
  // Classic round percentages with popular numbers
  createPercentageData(10, 100),
  createPercentageData(10, 200),
  createPercentageData(10, 500),
  createPercentageData(10, 1000),

  createPercentageData(15, 100),
  createPercentageData(15, 120),
  createPercentageData(15, 200),
  createPercentageData(15, 500),

  createPercentageData(20, 100),
  createPercentageData(20, 150),
  createPercentageData(20, 200),
  createPercentageData(20, 250),
  createPercentageData(20, 500),

  createPercentageData(25, 80),
  createPercentageData(25, 100),
  createPercentageData(25, 120),
  createPercentageData(25, 160),
  createPercentageData(25, 200),
  createPercentageData(25, 400),

  createPercentageData(30, 100),
  createPercentageData(30, 150),
  createPercentageData(30, 200),
  createPercentageData(30, 300),

  createPercentageData(40, 100),
  createPercentageData(40, 200),
  createPercentageData(40, 250),

  createPercentageData(50, 50),
  createPercentageData(50, 100),
  createPercentageData(50, 150),
  createPercentageData(50, 200),
  createPercentageData(50, 300),
  createPercentageData(50, 500),
  createPercentageData(50, 1000),

  createPercentageData(60, 100),
  createPercentageData(60, 200),

  createPercentageData(70, 100),
  createPercentageData(70, 200),

  createPercentageData(75, 80),
  createPercentageData(75, 100),
  createPercentageData(75, 200),
  createPercentageData(75, 400),

  createPercentageData(80, 100),
  createPercentageData(80, 200),

  createPercentageData(90, 100),
  createPercentageData(90, 200),

  // Common test scores and grades
  createPercentageData(5, 100),
  createPercentageData(5, 200),

  createPercentageData(18, 350),
  createPercentageData(35, 200),

  createPercentageData(12, 150),
  createPercentageData(12, 200),

  // Shopping discounts
  createPercentageData(10, 50),
  createPercentageData(10, 80),
  createPercentageData(10, 150),

  createPercentageData(15, 50),
  createPercentageData(15, 80),
  createPercentageData(15, 150),

  createPercentageData(20, 50),
  createPercentageData(20, 80),
  createPercentageData(20, 120),

  createPercentageData(25, 50),
  createPercentageData(25, 60),
  createPercentageData(25, 150),

  createPercentageData(30, 50),
  createPercentageData(30, 80),
  createPercentageData(30, 120),

  // Tips and service charges
  createPercentageData(15, 40),
  createPercentageData(15, 60),
  createPercentageData(18, 50),
  createPercentageData(18, 100),
  createPercentageData(20, 40),
  createPercentageData(20, 60),

  // Interest and finance
  createPercentageData(5, 500),
  createPercentageData(5, 1000),
  createPercentageData(8, 500),
  createPercentageData(8, 1000),

  // Common fractions as percentages
  createPercentageData(33, 100),
  createPercentageData(33, 300),
  createPercentageData(66, 100),
  createPercentageData(66, 300),

  // Additional popular calculations
  createPercentageData(35, 100),
  createPercentageData(35, 300),
  createPercentageData(45, 100),
  createPercentageData(45, 200),
  createPercentageData(55, 100),
  createPercentageData(55, 200),
  createPercentageData(65, 100),
  createPercentageData(65, 200),
  createPercentageData(85, 100),
  createPercentageData(85, 200),
  createPercentageData(95, 100),
  createPercentageData(95, 200),

  // Round number combinations
  createPercentageData(10, 300),
  createPercentageData(20, 300),
  createPercentageData(25, 300),
  createPercentageData(50, 400),

  // Additional popular searches
  createPercentageData(15, 300),
  createPercentageData(30, 400),
  createPercentageData(40, 150),
  createPercentageData(75, 300),
];

// Helper functions for routes
export function getPercentageBySlug(slug: string): PercentageData | undefined {
  return percentageData.find(p => p.slug === slug);
}

export function getAllPercentageSlugs(): string[] {
  return percentageData.map(p => p.slug);
}

export function parseSlug(slug: string): { percent: number; of: number } | null {
  const match = slug.match(/^(\d+)-percent-of-(\d+)$/);
  if (match) {
    return {
      percent: parseInt(match[1]),
      of: parseInt(match[2]),
    };
  }
  return null;
}
