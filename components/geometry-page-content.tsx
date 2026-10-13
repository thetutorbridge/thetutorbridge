'use client';

import Link from 'next/link';
import { Home, Calculator, Square, Circle, Box, Maximize2, BookOpen, ArrowRight, Check } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { GeometryData } from '@/lib/geometry-data';

interface GeometryPageContentProps {
  data: GeometryData;
}

export default function GeometryPageContent({ data }: GeometryPageContentProps) {
  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${data.formulaName}: ${Object.entries(data.parameters).map(([k, v]) => `${k} ${v}`).join(', ')}`,
    description: `Calculate ${data.formulaName.toLowerCase()} with ${Object.entries(data.parameters).map(([k, v]) => `${k}=${v}`).join(', ')}. Result: ${data.resultFormatted} ${data.unit}. Step-by-step solution with formula ${data.formula}.`,
    author: {
      '@type': 'Organization',
      name: 'The Tutor Bridge',
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Tutor Bridge',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.thetutorbridge.com/logo.png',
      },
    },
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString(),
  };

  // HowTo Schema for SEO
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Calculate ${data.formulaName}`,
    description: `Step-by-step guide to calculate ${data.formulaName.toLowerCase()} with ${Object.entries(data.parameters).map(([k, v]) => `${k}=${v}`).join(', ')}`,
    step: data.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.description,
      text: step.calculation || step.result || step.description,
    })),
    totalTime: 'PT3M',
    tool: {
      '@type': 'HowToTool',
      name: 'Geometry Calculator',
    },
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.thetutorbridge.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Geometry Calculator',
        item: 'https://www.thetutorbridge.com/geometry',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: data.formulaName,
        item: `https://www.thetutorbridge.com/geometry/${data.slug}`,
      },
    ],
  };

  // FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the formula for ${data.category.replace('-', ' ')} of a ${data.shape}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The formula is ${data.formula}. This formula allows you to calculate the ${data.category.replace('-', ' ')} when you know the required measurements: ${Object.keys(data.parameters).join(', ')}.`
        }
      },
      {
        '@type': 'Question',
        name: `How do I calculate ${data.formulaName.toLowerCase()} with ${Object.entries(data.parameters).map(([k, v]) => `${k}=${v}`).join(' and ')}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Using the formula ${data.formula}, substitute your values: ${Object.entries(data.parameters).map(([k, v]) => `${k}=${v}`).join(', ')}. Following the calculation steps, you get ${data.resultFormatted} ${data.unit}.`
        }
      },
      {
        '@type': 'Question',
        name: `What units should I use for ${data.category.replace('-', ' ')}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: data.category === 'area' ? 'Area is always measured in square units. If your measurements are in meters, the area will be in square meters (m²). If in feet, you\'ll get square feet (ft²).' :
                data.category === 'volume' ? 'Volume is always measured in cubic units. If your measurements are in centimeters, volume will be in cubic centimeters (cm³). If in inches, you\'ll get cubic inches (in³).' :
                data.category === 'perimeter' ? 'Perimeter is measured in linear units - the same units as your measurements. If you measure in meters, perimeter is in meters.' :
                'Surface area is measured in square units, just like regular area. If measuring in meters, surface area is in square meters (m²).'
        }
      },
      {
        '@type': 'Question',
        name: `Why is ${data.resultFormatted} the answer?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `When we apply the formula ${data.formula} with the values ${Object.entries(data.parameters).map(([k, v]) => `${k}=${v}`).join(', ')}, the mathematical operations give us exactly ${data.resultFormatted} ${data.unit}. Each step follows mathematical rules that have been proven to always give correct results.`
        }
      },
      {
        '@type': 'Question',
        name: 'What if my measurements are in different units?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You must convert all measurements to the same unit before calculating. For example, if one measurement is in meters and another is in centimeters, convert one to match the other first. 1 meter = 100 centimeters, 1 foot = 12 inches, 1 yard = 3 feet.'
        }
      }
    ]
  };

  const getCategoryIcon = () => {
    if (data.category === 'area') return <Square className="w-6 h-6 text-[#2BAE66]" />;
    if (data.category === 'perimeter') return <Maximize2 className="w-6 h-6 text-purple-600" />;
    if (data.category === 'volume') return <Box className="w-6 h-6 text-blue-600" />;
    if (data.category === 'surface-area') return <Circle className="w-6 h-6 text-green-600" />;
    return <Calculator className="w-6 h-6 text-[#1A3D7C]" />;
  };

  const getCategoryColor = () => {
    if (data.category === 'area') return 'text-[#2BAE66] bg-green-50 border-green-200';
    if (data.category === 'perimeter') return 'text-purple-600 bg-purple-50 border-purple-200';
    if (data.category === 'volume') return 'text-blue-600 bg-blue-50 border-blue-200';
    if (data.category === 'surface-area') return 'text-green-600 bg-green-50 border-green-200';
    return 'text-[#1A3D7C] bg-blue-50 border-blue-200';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/geometry" className="text-[#1A3D7C] hover:text-[#2BAE66]">
              Geometry Calculator
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{data.formulaName}</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center mb-4">
              {getCategoryIcon()}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 ml-3">
                {data.formulaName}
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              {Object.entries(data.parameters).map(([key, val], idx, arr) => (
                <span key={key}>
                  <span className="font-semibold text-[#1A3D7C]">{key}</span> = {val}
                  {idx < arr.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          </div>

          {/* Quick Answer */}
          <div className={`bg-gradient-to-br ${data.category === 'area' ? 'from-green-50 to-teal-50' : data.category === 'perimeter' ? 'from-purple-50 to-pink-50' : data.category === 'volume' ? 'from-blue-50 to-cyan-50' : 'from-green-50 to-emerald-50'} rounded-2xl shadow-xl p-8 mb-8 border-2 ${getCategoryColor()}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg text-gray-600 mb-2">Answer:</p>
                <p className="text-5xl font-bold ${getCategoryColor()}">
                  {data.resultFormatted} {data.unit}
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-full p-6">
                <Check className="w-16 h-16 text-green-600" />
              </div>
            </div>
          </div>

          {/* Diagram Description */}
          {data.diagram && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Square className="w-6 h-6 mr-2 text-[#2BAE66]" />
                Shape Visualization
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                <p className="text-gray-700 text-lg leading-relaxed">{data.diagram}</p>
              </div>
            </div>
          )}

          {/* Step-by-Step Solution */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-[#2BAE66]" />
              Step-by-Step Solution
            </h2>
            <div className="space-y-4">
              {data.steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-l-4 border-[#2BAE66]"
                >
                  <div className="flex items-start">
                    <div className="bg-[#2BAE66] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-semibold text-lg mb-2">{step.description}</p>
                      {step.calculation && (
                        <div className="bg-white rounded-lg p-4 font-mono text-[#1A3D7C] border-2 border-blue-200">
                          {step.calculation}
                        </div>
                      )}
                      {step.result && !step.calculation && (
                        <div className="bg-green-50 rounded-lg p-4 font-semibold text-green-700 border-2 border-green-200">
                          {step.result}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formula Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-6 h-6 mr-2 text-purple-600" />
              Formula Used
            </h2>
            <div className="bg-white rounded-xl p-6 border-2 border-purple-300">
              <p className="text-3xl font-bold text-center text-purple-700 font-mono">
                {data.formula}
              </p>
            </div>
            <div className="mt-4 text-gray-700">
              <p className="text-lg">
                This formula calculates the <strong>{data.category}</strong> of a <strong>{data.shape}</strong>.
              </p>
            </div>
          </div>

          {/* Real-World Applications */}
          {data.realWorldExamples.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Box className="w-6 h-6 mr-2 text-blue-600" />
                Real-World Applications
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {data.realWorldExamples.map((example, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-5 border-2 border-blue-200"
                  >
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-1">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 text-base leading-relaxed">{example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Problems */}
          {data.relatedProblems.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ArrowRight className="w-6 h-6 mr-2 text-[#2BAE66]" />
                Related Geometry Problems
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.relatedProblems.map((slug, index) => (
                  <Link
                    key={index}
                    href={`/geometry/${slug}`}
                    className="block bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-5 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-[#2BAE66]"
                  >
                    <p className="text-gray-700 text-sm font-medium">
                      {slug.replace(/-/g, ' ').replace(/\//g, ' - ')}
                    </p>
                    <div className="flex items-center mt-2 text-[#2BAE66]">
                      <span className="text-xs font-semibold">Solve this →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Comprehensive Educational Content */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-yellow-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Understanding {data.shape.charAt(0).toUpperCase() + data.shape.slice(1)} {data.category.replace('-', ' ').charAt(0).toUpperCase() + data.category.replace('-', ' ').slice(1)}
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg leading-relaxed">
                The <strong>{data.category.replace('-', ' ')}</strong> of a <strong>{data.shape}</strong> is a fundamental concept in geometry that students encounter from elementary school through college-level mathematics.
                {data.category === 'area' && ' Area measures the amount of two-dimensional space enclosed within a shape\'s boundaries. Think of it as the amount of paint needed to cover a surface or the amount of carpet required to cover a floor. Area is always expressed in square units (like square meters, square feet, or square centimeters) because we are measuring two-dimensional space.'}
                {data.category === 'perimeter' && ' Perimeter measures the total length of the boundary around a two-dimensional shape. Imagine walking around the edge of a park - the perimeter would be the total distance you walked. Perimeter is expressed in linear units (like meters, feet, or centimeters) because we are measuring length along a line.'}
                {data.category === 'volume' && ' Volume measures the amount of three-dimensional space occupied by an object. It tells us the capacity of a container or how much space an object takes up. Volume is expressed in cubic units (like cubic meters, cubic feet, or liters) because we are measuring space in three dimensions.'}
                {data.category === 'surface-area' && ' Surface area measures the total area of all the external surfaces of a three-dimensional object combined. If you were wrapping a gift box, the surface area tells you how much wrapping paper you need. Surface area is expressed in square units (like square meters or square feet).'}
              </p>
              <p className="text-base leading-relaxed">
                By using the formula <span className="font-mono bg-white px-2 py-1 rounded border border-yellow-300">{data.formula}</span>,
                we can quickly and accurately calculate the {data.category.replace('-', ' ')} for any {data.shape} when we know the required measurements. This formula has been mathematically proven and is universally accepted in mathematics, engineering, architecture, and science.
              </p>
            </div>
          </div>

          {/* Mathematical Background */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Mathematical Background & Theory</h2>
            <div className="prose max-w-none text-gray-700">
              {data.shape === 'triangle' && (
                <>
                  <p className="mb-4">The triangle is one of the most fundamental shapes in geometry, consisting of three sides and three angles. The formula for the area of a triangle (A = ½ × base × height) can be derived from the area of a rectangle. If you draw a rectangle around a triangle, the triangle always occupies exactly half of that rectangle's area - hence the ½ in our formula.</p>
                  <p className="mb-4">Triangles appear everywhere in nature and human construction because they are inherently stable structures. The triangular shape distributes weight evenly and resists deformation, which is why you see triangles in bridge trusses, roof frameworks, and even the molecular structure of many materials.</p>
                  <p>There are several types of triangles based on their sides (equilateral, isosceles, scalene) and angles (acute, right, obtuse). Our formula works for ALL types of triangles as long as you use the perpendicular height from the base to the opposite vertex.</p>
                </>
              )}
              {data.shape === 'rectangle' && (
                <>
                  <p className="mb-4">The rectangle is a four-sided polygon (quadrilateral) with four right angles (90°). Its opposite sides are parallel and equal in length. The area formula (A = length × width) is intuitive: if you fill a rectangle with unit squares, you'll have exactly length × width squares.</p>
                  <p className="mb-4">Rectangles are the most common shape in human-made structures because they're easy to manufacture, stack efficiently, and maximize usable space. From books and screens to rooms and buildings, rectangular shapes dominate our designed world.</p>
                  <p>The diagonal of a rectangle can be calculated using the Pythagorean theorem: d = √(length² + width²). This relationship between the sides and diagonal is crucial in construction and design.</p>
                </>
              )}
              {data.shape === 'circle' && (
                <>
                  <p className="mb-4">The circle is defined as the set of all points equidistant from a central point. The distance from the center to any point on the circle is the radius, and the distance across the circle through the center is the diameter (d = 2r).</p>
                  <p className="mb-4">The famous number π (pi, approximately 3.14159) appears in the area formula because circles have a special mathematical property. Pi is the ratio of any circle's circumference to its diameter, and it appears throughout mathematics, physics, and engineering.</p>
                  <p>The area formula A = πr² can be derived through calculus (integration) or through the ancient method of approximating circles with many-sided polygons. The more sides the polygon has, the closer its area approaches πr².</p>
                </>
              )}
              {data.shape === 'square' && (
                <>
                  <p className="mb-4">A square is a special rectangle where all four sides are equal in length. It's also a special case of a rhombus (all sides equal) with right angles. The area formula (A = side²) reflects this symmetry.</p>
                  <p className="mb-4">Squares have the largest area among all quadrilaterals with a given perimeter, making them mathematically efficient shapes. This principle is used in optimization problems and appears in nature (such as honeycomb structures approximating squares).</p>
                  <p>The diagonal of a square equals side × √2. This relationship, discovered by the ancient Pythagoreans, was one of the first proofs that irrational numbers exist.</p>
                </>
              )}
              {(data.shape === 'rectangular-prism' || data.shape === 'rectangular prism') && (
                <>
                  <p className="mb-4">A rectangular prism (also called a cuboid or rectangular box) is a three-dimensional shape with six rectangular faces. It's the 3D equivalent of a rectangle and is defined by three measurements: length, width, and height.</p>
                  <p className="mb-4">The volume formula (V = length × width × height) extends naturally from area: if we stack unit cubes inside the prism, we get length × width cubes on the base, and we stack them height times high.</p>
                  <p>Rectangular prisms are fundamental in packaging, shipping, architecture, and storage. Understanding their volume helps optimize space usage and calculate capacities.</p>
                </>
              )}
              {data.shape === 'sphere' && (
                <>
                  <p className="mb-4">A sphere is the three-dimensional analog of a circle - the set of all points equidistant from a center point in 3D space. Spheres appear throughout nature because they minimize surface area for a given volume.</p>
                  <p className="mb-4">The volume formula V = (4/3)πr³ was first proven by Archimedes using an ingenious method involving cylinders and cones. The surface area formula (4πr²) shows that a sphere's surface area equals exactly four times the area of its great circle.</p>
                  <p>Planets, stars, bubbles, and water droplets all naturally form spherical shapes due to gravity and surface tension, demonstrating the mathematical elegance of this shape in physics.</p>
                </>
              )}
              {data.shape === 'cylinder' && (
                <>
                  <p className="mb-4">A cylinder is a 3D shape with two parallel circular bases connected by a curved surface. It can be visualized as a circle extended into the third dimension, or as a rectangle rotated around one of its sides.</p>
                  <p className="mb-4">The volume formula (V = πr²h) combines the area of the circular base (πr²) with the height (h). This makes sense: we're essentially stacking circular disks of area πr² to a height of h units.</p>
                  <p>Cylinders are common in engineering because they handle internal pressure well (pipes, tanks) and roll easily (wheels, rollers). Understanding cylinder calculations is essential for many practical applications.</p>
                </>
              )}
              {data.shape === 'cone' && (
                <>
                  <p className="mb-4">A cone is a 3D shape with a circular base that tapers smoothly to a point called the apex or vertex. It can be visualized as a triangle rotated around one of its sides that passes through the base.</p>
                  <p className="mb-4">The volume of a cone (V = ⅓πr²h) is exactly one-third of a cylinder with the same base and height. This remarkable relationship was proven by Archimedes and can be demonstrated through calculus or physical experiments.</p>
                  <p>Cones appear in nature (volcanoes, pine cones) and in human designs (ice cream cones, traffic cones, funnels). The cone's shape efficiently directs materials toward or away from a point.</p>
                </>
              )}
              {data.shape === 'parallelogram' && (
                <>
                  <p className="mb-4">A parallelogram is a quadrilateral with two pairs of parallel sides. Opposite sides are equal in length, and opposite angles are equal. The rectangle is a special case of parallelogram with right angles.</p>
                  <p className="mb-4">The area formula (A = base × height) uses the perpendicular height, not the side length. This can be understood by "cutting" the parallelogram and rearranging it into a rectangle without changing its area.</p>
                  <p>Parallelograms demonstrate the principle that shearing (slanting) a shape doesn't change its area. This concept is important in physics (stress and strain) and advanced geometry.</p>
                </>
              )}
              {data.shape === 'trapezoid' && (
                <>
                  <p className="mb-4">A trapezoid (called trapezium in British English) is a quadrilateral with exactly one pair of parallel sides, called the bases. The area formula uses both bases because neither alone represents the "typical" width.</p>
                  <p className="mb-4">The formula A = ½(b₁ + b₂)h essentially calculates the area using the average of the two bases multiplied by the height. This makes mathematical sense: (b₁ + b₂)/2 is the average width, and multiplying by height gives area.</p>
                  <p>Trapezoids appear in architecture (building facades), engineering (dams), and nature (cross-sections of riverbeds). Understanding trapezoid calculations is useful for many real-world applications.</p>
                </>
              )}
              {!['triangle', 'rectangle', 'circle', 'square', 'rectangular-prism', 'rectangular prism', 'sphere', 'cylinder', 'cone', 'parallelogram', 'trapezoid'].includes(data.shape) && (
                <p className="mb-4">This geometric calculation involves fundamental principles that are used throughout mathematics, science, and engineering. Understanding these calculations builds a strong foundation for more advanced mathematical concepts.</p>
              )}
            </div>
          </div>

          {/* Common Mistakes Section */}
          <div className="bg-red-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-red-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-red-600 mr-2">⚠️</span> Common Mistakes to Avoid
            </h2>
            <div className="space-y-4">
              {data.category === 'area' && (
                <>
                  <div className="flex items-start bg-white p-4 rounded-lg">
                    <span className="text-red-600 font-bold mr-3">✗</span>
                    <div>
                      <p className="font-semibold text-gray-900">Confusing area with perimeter</p>
                      <p className="text-gray-600 text-sm">Area measures the space inside (square units), while perimeter measures the distance around (linear units). They require different formulas.</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-white p-4 rounded-lg">
                    <span className="text-red-600 font-bold mr-3">✗</span>
                    <div>
                      <p className="font-semibold text-gray-900">Using the wrong units</p>
                      <p className="text-gray-600 text-sm">Always express area in square units (m², ft², cm²). If your measurements are in different units, convert them first before calculating.</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-white p-4 rounded-lg">
                    <span className="text-red-600 font-bold mr-3">✗</span>
                    <div>
                      <p className="font-semibold text-gray-900">Forgetting the height must be perpendicular</p>
                      <p className="text-gray-600 text-sm">For triangles and parallelograms, the height must be measured at a 90° angle to the base, not along a slanted side.</p>
                    </div>
                  </div>
                </>
              )}
              {data.category === 'volume' && (
                <>
                  <div className="flex items-start bg-white p-4 rounded-lg">
                    <span className="text-red-600 font-bold mr-3">✗</span>
                    <div>
                      <p className="font-semibold text-gray-900">Confusing volume with surface area</p>
                      <p className="text-gray-600 text-sm">Volume measures the space inside (cubic units), while surface area measures the outer surfaces (square units).</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-white p-4 rounded-lg">
                    <span className="text-red-600 font-bold mr-3">✗</span>
                    <div>
                      <p className="font-semibold text-gray-900">Not using cubic units</p>
                      <p className="text-gray-600 text-sm">Volume must always be in cubic units (m³, ft³, cm³). Remember: if measuring in meters, your answer is in cubic meters.</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-white p-4 rounded-lg">
                    <span className="text-red-600 font-bold mr-3">✗</span>
                    <div>
                      <p className="font-semibold text-gray-900">Mixing up radius and diameter</p>
                      <p className="text-gray-600 text-sm">The radius is half the diameter. Using diameter when the formula requires radius will give you an answer 4x or 8x too large!</p>
                    </div>
                  </div>
                </>
              )}
              {data.category === 'perimeter' && (
                <>
                  <div className="flex items-start bg-white p-4 rounded-lg">
                    <span className="text-red-600 font-bold mr-3">✗</span>
                    <div>
                      <p className="font-semibold text-gray-900">Forgetting to add all sides</p>
                      <p className="text-gray-600 text-sm">Perimeter requires adding ALL sides of the shape. For rectangles, remember there are two lengths AND two widths.</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-white p-4 rounded-lg">
                    <span className="text-red-600 font-bold mr-3">✗</span>
                    <div>
                      <p className="font-semibold text-gray-900">Using area formula instead</p>
                      <p className="text-gray-600 text-sm">Perimeter is about distance around, not space inside. The answer should be in linear units (m, ft, cm), not square units.</p>
                    </div>
                  </div>
                </>
              )}
              {data.category === 'surface-area' && (
                <>
                  <div className="flex items-start bg-white p-4 rounded-lg">
                    <span className="text-red-600 font-bold mr-3">✗</span>
                    <div>
                      <p className="font-semibold text-gray-900">Missing some faces</p>
                      <p className="text-gray-600 text-sm">Count all surfaces! A rectangular prism has 6 faces (top, bottom, front, back, left, right). Missing even one gives a wrong answer.</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-white p-4 rounded-lg">
                    <span className="text-red-600 font-bold mr-3">✗</span>
                    <div>
                      <p className="font-semibold text-gray-900">Confusing with volume</p>
                      <p className="text-gray-600 text-sm">Surface area is in square units (like wrapping paper), volume is in cubic units (like water capacity).</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Tips for Success */}
          <div className="bg-green-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-green-600 mr-2">💡</span> Tips for Success
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Always Draw a Diagram</h3>
                <p className="text-gray-600 text-sm">Sketching the shape with labeled measurements helps you visualize the problem and choose the right formula.</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Check Your Units</h3>
                <p className="text-gray-600 text-sm">Make sure all measurements use the same units before calculating. Convert if necessary.</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Use Estimation</h3>
                <p className="text-gray-600 text-sm">Before calculating, estimate what a reasonable answer might be. This helps catch major errors.</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Show Your Work</h3>
                <p className="text-gray-600 text-sm">Writing out each step helps prevent errors and makes it easier to find mistakes if your answer seems wrong.</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Memorize Key Formulas</h3>
                <p className="text-gray-600 text-sm">Create flashcards for common geometry formulas. Practice regularly until they become automatic.</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Double-Check with Logic</h3>
                <p className="text-gray-600 text-sm">Ask: "Does this answer make sense?" A room can't have an area of 2 square meters if the sides are 10m each.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-[#1A3D7C] mr-2">❓</span> Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">What is the formula for {data.category.replace('-', ' ')} of a {data.shape}?</h3>
                <p className="text-gray-600">The formula is <span className="font-mono bg-gray-100 px-2 py-1 rounded">{data.formula}</span>. This formula allows you to calculate the {data.category.replace('-', ' ')} when you know the required measurements: {Object.keys(data.parameters).join(', ')}.</p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">How do I calculate {data.formulaName.toLowerCase()} with {Object.entries(data.parameters).map(([k, v]) => `${k}=${v}`).join(' and ')}?</h3>
                <p className="text-gray-600">Using the formula {data.formula}, substitute your values: {Object.entries(data.parameters).map(([k, v]) => `${k}=${v}`).join(', ')}. Following the calculation steps, you get {data.resultFormatted} {data.unit}.</p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">What units should I use for {data.category.replace('-', ' ')}?</h3>
                <p className="text-gray-600">
                  {data.category === 'area' && 'Area is always measured in square units. If your measurements are in meters, the area will be in square meters (m²). If in feet, you\'ll get square feet (ft²).'}
                  {data.category === 'perimeter' && 'Perimeter is measured in linear units - the same units as your measurements. If you measure in meters, perimeter is in meters. If in feet, perimeter is in feet.'}
                  {data.category === 'volume' && 'Volume is always measured in cubic units. If your measurements are in centimeters, volume will be in cubic centimeters (cm³). If in inches, you\'ll get cubic inches (in³).'}
                  {data.category === 'surface-area' && 'Surface area is measured in square units, just like regular area. If measuring in meters, surface area is in square meters (m²).'}
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">What are some real-world applications of calculating {data.shape} {data.category.replace('-', ' ')}?</h3>
                <p className="text-gray-600">
                  {data.category === 'area' && `Calculating ${data.shape} area is useful for: determining how much paint or wallpaper you need, calculating flooring materials, measuring land for gardening or construction, and sizing fabric for sewing projects.`}
                  {data.category === 'perimeter' && `${data.shape.charAt(0).toUpperCase() + data.shape.slice(1)} perimeter calculations are used for: fencing a yard, measuring running tracks, calculating border or trim materials, and determining the amount of ribbon or edging needed.`}
                  {data.category === 'volume' && `${data.shape.charAt(0).toUpperCase() + data.shape.slice(1)} volume calculations help with: determining container capacity, calculating water in pools or tanks, measuring shipping box sizes, and figuring out how much material fills a space.`}
                  {data.category === 'surface-area' && `${data.shape.charAt(0).toUpperCase() + data.shape.slice(1)} surface area is important for: calculating wrapping paper or packaging needs, determining paint or coating coverage, and sizing labels or coverings.`}
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Why is {data.resultFormatted} the answer?</h3>
                <p className="text-gray-600">When we apply the formula {data.formula} with the values {Object.entries(data.parameters).map(([k, v]) => `${k}=${v}`).join(', ')}, the mathematical operations give us exactly {data.resultFormatted} {data.unit}. Each step in the solution follows mathematical rules that have been proven to always give correct results.</p>
              </div>

              <div className="pb-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">What if my measurements are in different units?</h3>
                <p className="text-gray-600">You must convert all measurements to the same unit before calculating. For example, if one measurement is in meters and another is in centimeters, convert one to match the other first. 1 meter = 100 centimeters, 1 foot = 12 inches, 1 yard = 3 feet.</p>
              </div>
            </div>
          </div>

          {/* Practice Problems Section */}
          <div className="bg-blue-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Makes Perfect</h2>
            <p className="text-gray-700 mb-4">
              The best way to master geometry calculations is through practice. Try solving these types of problems:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Start with simple numbers to understand the formula</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Progress to larger numbers and decimals</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Try word problems that require identifying the correct formula</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Practice with real-world measurements (rooms, gardens, containers)</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Challenge yourself with unit conversions included in problems</span>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-2xl shadow-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Need More Help with Geometry?</h2>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Get personalized 1-on-1 tutoring with expert geometry tutors. Master formulas, solve complex problems, and ace your exams!
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-white text-[#1A3D7C] px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg"
            >
              Find Your Geometry Tutor
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
