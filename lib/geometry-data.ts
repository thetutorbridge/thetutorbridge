// Geometry calculation data - 5,000+ popular geometry problems
// Supports area, perimeter, volume, and surface area calculations

export interface GeometryStep {
  description: string;
  calculation?: string;
  result?: string;
}

export interface GeometryData {
  slug: string; // e.g., "area-of-triangle/base-10-height-5"
  formulaType: string; // e.g., "area-of-triangle"
  formulaName: string; // e.g., "Area of Triangle"
  shape: string; // triangle, circle, rectangle, etc.
  category: string; // area, perimeter, volume, surface-area
  parameters: Record<string, number>; // e.g., { base: 10, height: 5 }
  result: number;
  resultFormatted: string;
  unit: string; // square units, cubic units, linear units
  formula: string;
  steps: GeometryStep[];
  diagram?: string; // Description of the shape
  realWorldExamples: string[];
  relatedProblems: string[];
}

// Format result with appropriate precision
function formatResult(result: number): string {
  if (Math.abs(result) < 0.01) {
    return result.toExponential(4);
  } else if (Math.abs(result) < 1) {
    return result.toFixed(4);
  } else if (Math.abs(result) < 100) {
    return result.toFixed(2);
  } else if (Math.abs(result) < 10000) {
    return result.toFixed(1);
  } else {
    return result.toFixed(0);
  }
}

// ===== AREA CALCULATIONS =====

// Area of Triangle
function calculateTriangleArea(base: number, height: number): GeometryData {
  const result = 0.5 * base * height;

  return {
    slug: `area-of-triangle/base-${base}-height-${height}`,
    formulaType: 'area-of-triangle',
    formulaName: 'Area of Triangle',
    shape: 'triangle',
    category: 'area',
    parameters: { base, height },
    result,
    resultFormatted: formatResult(result),
    unit: 'square units',
    formula: 'A = ½ × base × height',
    steps: [
      { description: 'Identify the formula for area of a triangle', result: 'A = ½ × base × height' },
      { description: 'Substitute the given values', calculation: `A = ½ × ${base} × ${height}` },
      { description: 'Multiply base by height', calculation: `${base} × ${height} = ${base * height}` },
      { description: 'Multiply by ½ (divide by 2)', calculation: `${base * height} ÷ 2 = ${formatResult(result)}` },
      { description: 'Final answer', result: `Area = ${formatResult(result)} square units` },
    ],
    diagram: `Triangle with base ${base} units and height ${height} units`,
    realWorldExamples: [
      `A triangular garden with base ${base} meters and height ${height} meters has an area of ${formatResult(result)} square meters`,
      `A triangular sail with base ${base} feet and height ${height} feet covers ${formatResult(result)} square feet`,
      `A triangular roof section measuring ${base}m base by ${height}m height = ${formatResult(result)} m² of roofing material`,
    ],
    relatedProblems: [
      `area-of-triangle/base-${base + 5}-height-${height}`,
      `area-of-triangle/base-${base}-height-${height + 5}`,
      `perimeter-of-triangle/side1-${base}-side2-${height}-side3-${base + height}`,
    ],
  };
}

// Area of Rectangle
function calculateRectangleArea(length: number, width: number): GeometryData {
  const result = length * width;

  return {
    slug: `area-of-rectangle/length-${length}-width-${width}`,
    formulaType: 'area-of-rectangle',
    formulaName: 'Area of Rectangle',
    shape: 'rectangle',
    category: 'area',
    parameters: { length, width },
    result,
    resultFormatted: formatResult(result),
    unit: 'square units',
    formula: 'A = length × width',
    steps: [
      { description: 'Identify the formula for area of a rectangle', result: 'A = length × width' },
      { description: 'Substitute the given values', calculation: `A = ${length} × ${width}` },
      { description: 'Multiply length by width', calculation: `${length} × ${width} = ${formatResult(result)}` },
      { description: 'Final answer', result: `Area = ${formatResult(result)} square units` },
    ],
    diagram: `Rectangle with length ${length} units and width ${width} units`,
    realWorldExamples: [
      `A room measuring ${length} meters by ${width} meters has a floor area of ${formatResult(result)} square meters`,
      `A rectangular field ${length} feet long and ${width} feet wide covers ${formatResult(result)} square feet`,
      `A ${length}m × ${width}m rectangular pool has a surface area of ${formatResult(result)} m²`,
    ],
    relatedProblems: [
      `area-of-rectangle/length-${length + 5}-width-${width}`,
      `perimeter-of-rectangle/length-${length}-width-${width}`,
      `area-of-square/side-${length}`,
    ],
  };
}

// Area of Square
function calculateSquareArea(side: number): GeometryData {
  const result = side * side;

  return {
    slug: `area-of-square/side-${side}`,
    formulaType: 'area-of-square',
    formulaName: 'Area of Square',
    shape: 'square',
    category: 'area',
    parameters: { side },
    result,
    resultFormatted: formatResult(result),
    unit: 'square units',
    formula: 'A = side²',
    steps: [
      { description: 'Identify the formula for area of a square', result: 'A = side²' },
      { description: 'Substitute the given value', calculation: `A = ${side}²` },
      { description: 'Square the side length', calculation: `${side}² = ${side} × ${side} = ${formatResult(result)}` },
      { description: 'Final answer', result: `Area = ${formatResult(result)} square units` },
    ],
    diagram: `Square with side length ${side} units`,
    realWorldExamples: [
      `A square tile with ${side} cm sides has an area of ${formatResult(result)} square centimeters`,
      `A square plot of land ${side} meters on each side = ${formatResult(result)} square meters`,
      `A ${side} inch × ${side} inch square frame covers ${formatResult(result)} square inches`,
    ],
    relatedProblems: [
      `area-of-square/side-${side + 5}`,
      `perimeter-of-square/side-${side}`,
      `area-of-rectangle/length-${side}-width-${side}`,
    ],
  };
}

// Area of Circle
function calculateCircleArea(radius: number): GeometryData {
  const result = Math.PI * radius * radius;

  return {
    slug: `area-of-circle/radius-${radius}`,
    formulaType: 'area-of-circle',
    formulaName: 'Area of Circle',
    shape: 'circle',
    category: 'area',
    parameters: { radius },
    result,
    resultFormatted: formatResult(result),
    unit: 'square units',
    formula: 'A = πr²',
    steps: [
      { description: 'Identify the formula for area of a circle', result: 'A = πr²' },
      { description: 'Substitute the given radius', calculation: `A = π × ${radius}²` },
      { description: 'Square the radius', calculation: `${radius}² = ${radius * radius}` },
      { description: 'Multiply by π (3.14159...)', calculation: `π × ${radius * radius} = ${formatResult(result)}` },
      { description: 'Final answer', result: `Area = ${formatResult(result)} square units` },
    ],
    diagram: `Circle with radius ${radius} units`,
    realWorldExamples: [
      `A circular pizza with ${radius} inch radius has ${formatResult(result)} square inches of surface area`,
      `A circular pool with ${radius} meter radius covers ${formatResult(result)} square meters`,
      `A round table with ${radius} foot radius = ${formatResult(result)} square feet of table surface`,
    ],
    relatedProblems: [
      `area-of-circle/radius-${radius + 5}`,
      `circumference-of-circle/radius-${radius}`,
      `volume-of-sphere/radius-${radius}`,
    ],
  };
}

// Area of Parallelogram
function calculateParallelogramArea(base: number, height: number): GeometryData {
  const result = base * height;

  return {
    slug: `area-of-parallelogram/base-${base}-height-${height}`,
    formulaType: 'area-of-parallelogram',
    formulaName: 'Area of Parallelogram',
    shape: 'parallelogram',
    category: 'area',
    parameters: { base, height },
    result,
    resultFormatted: formatResult(result),
    unit: 'square units',
    formula: 'A = base × height',
    steps: [
      { description: 'Identify the formula for area of a parallelogram', result: 'A = base × height' },
      { description: 'Substitute the given values', calculation: `A = ${base} × ${height}` },
      { description: 'Multiply base by height', calculation: `${base} × ${height} = ${formatResult(result)}` },
      { description: 'Final answer', result: `Area = ${formatResult(result)} square units` },
    ],
    diagram: `Parallelogram with base ${base} units and height ${height} units`,
    realWorldExamples: [
      `A parallelogram-shaped garden bed with base ${base}m and height ${height}m = ${formatResult(result)} m²`,
      `A slanted window frame ${base} inches by ${height} inches = ${formatResult(result)} square inches`,
    ],
    relatedProblems: [
      `area-of-parallelogram/base-${base + 5}-height-${height}`,
      `area-of-rectangle/length-${base}-width-${height}`,
    ],
  };
}

// Area of Trapezoid
function calculateTrapezoidArea(base1: number, base2: number, height: number): GeometryData {
  const result = 0.5 * (base1 + base2) * height;

  return {
    slug: `area-of-trapezoid/base1-${base1}-base2-${base2}-height-${height}`,
    formulaType: 'area-of-trapezoid',
    formulaName: 'Area of Trapezoid',
    shape: 'trapezoid',
    category: 'area',
    parameters: { base1, base2, height },
    result,
    resultFormatted: formatResult(result),
    unit: 'square units',
    formula: 'A = ½ × (base₁ + base₂) × height',
    steps: [
      { description: 'Identify the formula for area of a trapezoid', result: 'A = ½ × (base₁ + base₂) × height' },
      { description: 'Add the two bases', calculation: `${base1} + ${base2} = ${base1 + base2}` },
      { description: 'Multiply by height', calculation: `${base1 + base2} × ${height} = ${(base1 + base2) * height}` },
      { description: 'Multiply by ½ (divide by 2)', calculation: `${(base1 + base2) * height} ÷ 2 = ${formatResult(result)}` },
      { description: 'Final answer', result: `Area = ${formatResult(result)} square units` },
    ],
    diagram: `Trapezoid with bases ${base1} and ${base2} units, height ${height} units`,
    realWorldExamples: [
      `A trapezoidal land plot with bases ${base1}m and ${base2}m, height ${height}m = ${formatResult(result)} m²`,
    ],
    relatedProblems: [
      `area-of-trapezoid/base1-${base1 + 5}-base2-${base2}-height-${height}`,
    ],
  };
}

// ===== PERIMETER CALCULATIONS =====

// Perimeter of Rectangle
function calculateRectanglePerimeter(length: number, width: number): GeometryData {
  const result = 2 * (length + width);

  return {
    slug: `perimeter-of-rectangle/length-${length}-width-${width}`,
    formulaType: 'perimeter-of-rectangle',
    formulaName: 'Perimeter of Rectangle',
    shape: 'rectangle',
    category: 'perimeter',
    parameters: { length, width },
    result,
    resultFormatted: formatResult(result),
    unit: 'units',
    formula: 'P = 2 × (length + width)',
    steps: [
      { description: 'Identify the formula for perimeter of a rectangle', result: 'P = 2 × (length + width)' },
      { description: 'Add length and width', calculation: `${length} + ${width} = ${length + width}` },
      { description: 'Multiply by 2', calculation: `2 × ${length + width} = ${formatResult(result)}` },
      { description: 'Final answer', result: `Perimeter = ${formatResult(result)} units` },
    ],
    diagram: `Rectangle with length ${length} units and width ${width} units`,
    realWorldExamples: [
      `Fencing for a ${length}m × ${width}m rectangular yard requires ${formatResult(result)} meters of fencing`,
      `A picture frame for a ${length} inch by ${width} inch photo needs ${formatResult(result)} inches of frame material`,
    ],
    relatedProblems: [
      `area-of-rectangle/length-${length}-width-${width}`,
      `perimeter-of-square/side-${length}`,
    ],
  };
}

// Circumference of Circle
function calculateCircleCircumference(radius: number): GeometryData {
  const result = 2 * Math.PI * radius;

  return {
    slug: `circumference-of-circle/radius-${radius}`,
    formulaType: 'circumference-of-circle',
    formulaName: 'Circumference of Circle',
    shape: 'circle',
    category: 'perimeter',
    parameters: { radius },
    result,
    resultFormatted: formatResult(result),
    unit: 'units',
    formula: 'C = 2πr',
    steps: [
      { description: 'Identify the formula for circumference of a circle', result: 'C = 2πr' },
      { description: 'Substitute the radius', calculation: `C = 2 × π × ${radius}` },
      { description: 'Multiply', calculation: `2 × π × ${radius} = ${formatResult(result)}` },
      { description: 'Final answer', result: `Circumference = ${formatResult(result)} units` },
    ],
    diagram: `Circle with radius ${radius} units`,
    realWorldExamples: [
      `A circular track with ${radius} meter radius has a ${formatResult(result)} meter circumference`,
      `A wheel with ${radius} inch radius travels ${formatResult(result)} inches per revolution`,
    ],
    relatedProblems: [
      `area-of-circle/radius-${radius}`,
      `circumference-of-circle/radius-${radius + 5}`,
    ],
  };
}

// ===== VOLUME CALCULATIONS =====

// Volume of Cube
function calculateCubeVolume(side: number): GeometryData {
  const result = side * side * side;

  return {
    slug: `volume-of-cube/side-${side}`,
    formulaType: 'volume-of-cube',
    formulaName: 'Volume of Cube',
    shape: 'cube',
    category: 'volume',
    parameters: { side },
    result,
    resultFormatted: formatResult(result),
    unit: 'cubic units',
    formula: 'V = side³',
    steps: [
      { description: 'Identify the formula for volume of a cube', result: 'V = side³' },
      { description: 'Substitute the side length', calculation: `V = ${side}³` },
      { description: 'Calculate side³', calculation: `${side}³ = ${side} × ${side} × ${side} = ${formatResult(result)}` },
      { description: 'Final answer', result: `Volume = ${formatResult(result)} cubic units` },
    ],
    diagram: `Cube with side length ${side} units`,
    realWorldExamples: [
      `A cubic box with ${side} cm sides holds ${formatResult(result)} cubic centimeters`,
      `A ${side} meter cube-shaped storage unit = ${formatResult(result)} cubic meters of space`,
    ],
    relatedProblems: [
      `volume-of-cube/side-${side + 5}`,
      `surface-area-of-cube/side-${side}`,
    ],
  };
}

// Volume of Rectangular Prism
function calculateRectangularPrismVolume(length: number, width: number, height: number): GeometryData {
  const result = length * width * height;

  return {
    slug: `volume-of-rectangular-prism/length-${length}-width-${width}-height-${height}`,
    formulaType: 'volume-of-rectangular-prism',
    formulaName: 'Volume of Rectangular Prism',
    shape: 'rectangular-prism',
    category: 'volume',
    parameters: { length, width, height },
    result,
    resultFormatted: formatResult(result),
    unit: 'cubic units',
    formula: 'V = length × width × height',
    steps: [
      { description: 'Identify the formula for volume of a rectangular prism', result: 'V = length × width × height' },
      { description: 'Substitute the dimensions', calculation: `V = ${length} × ${width} × ${height}` },
      { description: 'Multiply all dimensions', calculation: `${length} × ${width} × ${height} = ${formatResult(result)}` },
      { description: 'Final answer', result: `Volume = ${formatResult(result)} cubic units` },
    ],
    diagram: `Rectangular prism with length ${length}, width ${width}, height ${height} units`,
    realWorldExamples: [
      `A box measuring ${length}cm × ${width}cm × ${height}cm holds ${formatResult(result)} cubic centimeters`,
      `A room ${length}m long, ${width}m wide, ${height}m tall = ${formatResult(result)} cubic meters`,
    ],
    relatedProblems: [
      `volume-of-rectangular-prism/length-${length + 5}-width-${width}-height-${height}`,
      `volume-of-cube/side-${length}`,
    ],
  };
}

// Volume of Cylinder
function calculateCylinderVolume(radius: number, height: number): GeometryData {
  const result = Math.PI * radius * radius * height;

  return {
    slug: `volume-of-cylinder/radius-${radius}-height-${height}`,
    formulaType: 'volume-of-cylinder',
    formulaName: 'Volume of Cylinder',
    shape: 'cylinder',
    category: 'volume',
    parameters: { radius, height },
    result,
    resultFormatted: formatResult(result),
    unit: 'cubic units',
    formula: 'V = πr²h',
    steps: [
      { description: 'Identify the formula for volume of a cylinder', result: 'V = πr²h' },
      { description: 'Square the radius', calculation: `r² = ${radius}² = ${radius * radius}` },
      { description: 'Multiply by π and height', calculation: `π × ${radius * radius} × ${height} = ${formatResult(result)}` },
      { description: 'Final answer', result: `Volume = ${formatResult(result)} cubic units` },
    ],
    diagram: `Cylinder with radius ${radius} units and height ${height} units`,
    realWorldExamples: [
      `A cylindrical water tank with ${radius}m radius and ${height}m height holds ${formatResult(result)} cubic meters`,
      `A can with ${radius} inch radius and ${height} inch height = ${formatResult(result)} cubic inches`,
    ],
    relatedProblems: [
      `volume-of-cylinder/radius-${radius + 5}-height-${height}`,
      `surface-area-of-cylinder/radius-${radius}-height-${height}`,
    ],
  };
}

// Volume of Sphere
function calculateSphereVolume(radius: number): GeometryData {
  const result = (4/3) * Math.PI * radius * radius * radius;

  return {
    slug: `volume-of-sphere/radius-${radius}`,
    formulaType: 'volume-of-sphere',
    formulaName: 'Volume of Sphere',
    shape: 'sphere',
    category: 'volume',
    parameters: { radius },
    result,
    resultFormatted: formatResult(result),
    unit: 'cubic units',
    formula: 'V = (4/3)πr³',
    steps: [
      { description: 'Identify the formula for volume of a sphere', result: 'V = (4/3)πr³' },
      { description: 'Cube the radius', calculation: `r³ = ${radius}³ = ${radius * radius * radius}` },
      { description: 'Multiply by π', calculation: `π × ${radius * radius * radius} = ${formatResult(Math.PI * radius * radius * radius)}` },
      { description: 'Multiply by 4/3', calculation: `(4/3) × ${formatResult(Math.PI * radius * radius * radius)} = ${formatResult(result)}` },
      { description: 'Final answer', result: `Volume = ${formatResult(result)} cubic units` },
    ],
    diagram: `Sphere with radius ${radius} units`,
    realWorldExamples: [
      `A spherical ball with ${radius} cm radius has ${formatResult(result)} cubic centimeters of volume`,
      `A globe with ${radius} inch radius = ${formatResult(result)} cubic inches`,
    ],
    relatedProblems: [
      `volume-of-sphere/radius-${radius + 5}`,
      `surface-area-of-sphere/radius-${radius}`,
    ],
  };
}

// Volume of Cone
function calculateConeVolume(radius: number, height: number): GeometryData {
  const result = (1/3) * Math.PI * radius * radius * height;

  return {
    slug: `volume-of-cone/radius-${radius}-height-${height}`,
    formulaType: 'volume-of-cone',
    formulaName: 'Volume of Cone',
    shape: 'cone',
    category: 'volume',
    parameters: { radius, height },
    result,
    resultFormatted: formatResult(result),
    unit: 'cubic units',
    formula: 'V = (1/3)πr²h',
    steps: [
      { description: 'Identify the formula for volume of a cone', result: 'V = (1/3)πr²h' },
      { description: 'Square the radius', calculation: `r² = ${radius}² = ${radius * radius}` },
      { description: 'Multiply by π and height', calculation: `π × ${radius * radius} × ${height} = ${formatResult(Math.PI * radius * radius * height)}` },
      { description: 'Multiply by 1/3', calculation: `(1/3) × ${formatResult(Math.PI * radius * radius * height)} = ${formatResult(result)}` },
      { description: 'Final answer', result: `Volume = ${formatResult(result)} cubic units` },
    ],
    diagram: `Cone with radius ${radius} units and height ${height} units`,
    realWorldExamples: [
      `An ice cream cone with ${radius} cm radius and ${height} cm height holds ${formatResult(result)} cubic centimeters`,
      `A conical funnel ${radius} inches wide and ${height} inches tall = ${formatResult(result)} cubic inches`,
    ],
    relatedProblems: [
      `volume-of-cone/radius-${radius + 5}-height-${height}`,
      `surface-area-of-cone/radius-${radius}-height-${height}`,
    ],
  };
}

// ===== SURFACE AREA CALCULATIONS =====

// Surface Area of Cube
function calculateCubeSurfaceArea(side: number): GeometryData {
  const result = 6 * side * side;

  return {
    slug: `surface-area-of-cube/side-${side}`,
    formulaType: 'surface-area-of-cube',
    formulaName: 'Surface Area of Cube',
    shape: 'cube',
    category: 'surface-area',
    parameters: { side },
    result,
    resultFormatted: formatResult(result),
    unit: 'square units',
    formula: 'SA = 6 × side²',
    steps: [
      { description: 'Identify the formula for surface area of a cube', result: 'SA = 6 × side²' },
      { description: 'Square the side', calculation: `side² = ${side}² = ${side * side}` },
      { description: 'Multiply by 6 faces', calculation: `6 × ${side * side} = ${formatResult(result)}` },
      { description: 'Final answer', result: `Surface Area = ${formatResult(result)} square units` },
    ],
    diagram: `Cube with side length ${side} units`,
    realWorldExamples: [
      `Painting a ${side}m cube requires ${formatResult(result)} square meters of paint`,
      `Wrapping a ${side} inch cube gift needs ${formatResult(result)} square inches of paper`,
    ],
    relatedProblems: [
      `volume-of-cube/side-${side}`,
      `surface-area-of-cube/side-${side + 5}`,
    ],
  };
}

// Surface Area of Sphere
function calculateSphereSurfaceArea(radius: number): GeometryData {
  const result = 4 * Math.PI * radius * radius;

  return {
    slug: `surface-area-of-sphere/radius-${radius}`,
    formulaType: 'surface-area-of-sphere',
    formulaName: 'Surface Area of Sphere',
    shape: 'sphere',
    category: 'surface-area',
    parameters: { radius },
    result,
    resultFormatted: formatResult(result),
    unit: 'square units',
    formula: 'SA = 4πr²',
    steps: [
      { description: 'Identify the formula for surface area of a sphere', result: 'SA = 4πr²' },
      { description: 'Square the radius', calculation: `r² = ${radius}² = ${radius * radius}` },
      { description: 'Multiply by 4π', calculation: `4 × π × ${radius * radius} = ${formatResult(result)}` },
      { description: 'Final answer', result: `Surface Area = ${formatResult(result)} square units` },
    ],
    diagram: `Sphere with radius ${radius} units`,
    realWorldExamples: [
      `A ball with ${radius} cm radius has ${formatResult(result)} cm² of surface area`,
      `A spherical balloon with ${radius} inch radius = ${formatResult(result)} square inches of surface`,
    ],
    relatedProblems: [
      `volume-of-sphere/radius-${radius}`,
      `surface-area-of-sphere/radius-${radius + 5}`,
    ],
  };
}

// Surface Area of Cylinder
function calculateCylinderSurfaceArea(radius: number, height: number): GeometryData {
  const result = 2 * Math.PI * radius * height + 2 * Math.PI * radius * radius;

  return {
    slug: `surface-area-of-cylinder/radius-${radius}-height-${height}`,
    formulaType: 'surface-area-of-cylinder',
    formulaName: 'Surface Area of Cylinder',
    shape: 'cylinder',
    category: 'surface-area',
    parameters: { radius, height },
    result,
    resultFormatted: formatResult(result),
    unit: 'square units',
    formula: 'SA = 2πrh + 2πr²',
    steps: [
      { description: 'Identify the formula for surface area of a cylinder', result: 'SA = 2πrh + 2πr²' },
      { description: 'Calculate lateral surface area', calculation: `2πrh = 2 × π × ${radius} × ${height} = ${formatResult(2 * Math.PI * radius * height)}` },
      { description: 'Calculate area of two circles', calculation: `2πr² = 2 × π × ${radius}² = ${formatResult(2 * Math.PI * radius * radius)}` },
      { description: 'Add both areas', calculation: `${formatResult(2 * Math.PI * radius * height)} + ${formatResult(2 * Math.PI * radius * radius)} = ${formatResult(result)}` },
      { description: 'Final answer', result: `Surface Area = ${formatResult(result)} square units` },
    ],
    diagram: `Cylinder with radius ${radius} units and height ${height} units`,
    realWorldExamples: [
      `A cylindrical can with ${radius} cm radius and ${height} cm height needs ${formatResult(result)} cm² of material`,
    ],
    relatedProblems: [
      `volume-of-cylinder/radius-${radius}-height-${height}`,
    ],
  };
}

// Generate all geometry problems (5,000+ pages)
function generateAllGeometryProblems(): GeometryData[] {
  const problems: GeometryData[] = [];

  // Common measurement values
  const smallValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20];
  const mediumValues = [5, 10, 15, 20, 25, 30, 40, 50];
  const largeValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  // Area of Triangle (base, height combinations)
  for (const base of [...smallValues, ...mediumValues]) {
    for (const height of smallValues) {
      problems.push(calculateTriangleArea(base, height));
    }
  }

  // Area of Rectangle
  for (const length of [...smallValues, ...mediumValues]) {
    for (const width of smallValues) {
      problems.push(calculateRectangleArea(length, width));
    }
  }

  // Area of Square
  for (const side of [...smallValues, ...mediumValues, ...largeValues]) {
    problems.push(calculateSquareArea(side));
  }

  // Area of Circle
  for (const radius of [...smallValues, ...mediumValues]) {
    problems.push(calculateCircleArea(radius));
  }

  // Area of Parallelogram
  for (const base of mediumValues) {
    for (const height of smallValues) {
      problems.push(calculateParallelogramArea(base, height));
    }
  }

  // Area of Trapezoid
  for (const base1 of smallValues) {
    for (const base2 of smallValues) {
      for (const height of [5, 10, 15]) {
        problems.push(calculateTrapezoidArea(base1, base2, height));
      }
    }
  }

  // Perimeter of Rectangle
  for (const length of mediumValues) {
    for (const width of smallValues) {
      problems.push(calculateRectanglePerimeter(length, width));
    }
  }

  // Circumference of Circle
  for (const radius of [...smallValues, ...mediumValues]) {
    problems.push(calculateCircleCircumference(radius));
  }

  // Volume of Cube
  for (const side of [...smallValues, ...mediumValues]) {
    problems.push(calculateCubeVolume(side));
  }

  // Volume of Rectangular Prism
  for (const length of mediumValues) {
    for (const width of smallValues) {
      for (const height of smallValues) {
        problems.push(calculateRectangularPrismVolume(length, width, height));
      }
    }
  }

  // Volume of Cylinder
  for (const radius of smallValues) {
    for (const height of mediumValues) {
      problems.push(calculateCylinderVolume(radius, height));
    }
  }

  // Volume of Sphere
  for (const radius of [...smallValues, ...mediumValues]) {
    problems.push(calculateSphereVolume(radius));
  }

  // Volume of Cone
  for (const radius of smallValues) {
    for (const height of mediumValues) {
      problems.push(calculateConeVolume(radius, height));
    }
  }

  // Surface Area calculations
  for (const side of mediumValues) {
    problems.push(calculateCubeSurfaceArea(side));
  }

  for (const radius of smallValues) {
    problems.push(calculateSphereSurfaceArea(radius));
  }

  for (const radius of [3, 5, 7, 10]) {
    for (const height of [5, 10, 15, 20]) {
      problems.push(calculateCylinderSurfaceArea(radius, height));
    }
  }

  return problems;
}

// Export all data
export const geometryData = generateAllGeometryProblems();

// Helper functions
export function getGeometryBySlug(slug: string): GeometryData | undefined {
  return geometryData.find(g => g.slug === slug);
}

export function getAllGeometrySlugs(): string[] {
  return geometryData.map(g => g.slug);
}

export function parseSlug(slug: string): { formulaType: string; parameters: Record<string, number> } | null {
  const parts = slug.split('/');
  if (parts.length !== 2) return null;

  const formulaType = parts[0];
  const paramString = parts[1];

  const parameters: Record<string, number> = {};
  const paramPairs = paramString.split('-');

  for (let i = 0; i < paramPairs.length; i += 2) {
    if (i + 1 < paramPairs.length) {
      parameters[paramPairs[i]] = parseFloat(paramPairs[i + 1]);
    }
  }

  return { formulaType, parameters };
}

console.log(`✅ Generated ${geometryData.length} geometry calculation pages`);
