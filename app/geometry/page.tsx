'use client';

import Link from 'next/link';
import { Home, Calculator, Square, Circle, Box, Maximize2, TrendingUp, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { geometryData } from '@/lib/geometry-data';

export default function GeometryMainPage() {
  // Group by category
  const areaProblems = geometryData.filter(g => g.category === 'area').slice(0, 24);
  const perimeterProblems = geometryData.filter(g => g.category === 'perimeter').slice(0, 16);
  const volumeProblems = geometryData.filter(g => g.category === 'volume').slice(0, 24);
  const surfaceAreaProblems = geometryData.filter(g => g.category === 'surface-area').slice(0, 12);

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Geometry Calculator - Area, Perimeter, Volume & Surface Area',
            description: 'Calculate geometry problems with 5,000+ step-by-step solutions for all shapes.',
            url: 'https://www.thetutorbridge.com/geometry',
            publisher: {
              '@type': 'Organization',
              name: 'The Tutor Bridge',
            },
          }),
        }}
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
            <span className="text-gray-600">Geometry Calculator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Calculator className="w-16 h-16 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold">Geometry Calculator</h1>
            </div>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
              Calculate area, perimeter, volume & surface area for all shapes with step-by-step solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-3xl font-bold text-[#FFC857]">5,000+</p>
                <p className="text-sm text-blue-100">Problems Solved</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-3xl font-bold text-[#FFC857]">15+ Shapes</p>
                <p className="text-sm text-blue-100">2D & 3D Geometry</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-3xl font-bold text-[#FFC857]">100% Free</p>
                <p className="text-sm text-blue-100">Step-by-Step Solutions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Area Calculations */}
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <Square className="w-8 h-8 mr-3 text-[#2BAE66]" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Area Calculations (2D Shapes)
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Calculate the area of triangles, rectangles, circles, parallelograms, trapezoids, and squares.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {areaProblems.map((item) => (
                <Link
                  key={item.slug}
                  href={`/geometry/${item.slug}`}
                  className="block bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-[#2BAE66]"
                >
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">{item.shape}</p>
                    <p className="text-lg font-bold text-[#1A3D7C] mb-2">
                      {Object.entries(item.parameters).map(([key, val]) => `${key}=${val}`).join(', ')}
                    </p>
                    <div className="text-sm text-gray-400 mb-1">Area =</div>
                    <div className="text-xl font-bold text-green-600">
                      {item.resultFormatted}
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-4 text-[#2BAE66]">
                    <span className="text-sm font-medium">View Solution</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Perimeter Calculations */}
          {perimeterProblems.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <Maximize2 className="w-8 h-8 mr-3 text-purple-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Perimeter & Circumference
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Calculate perimeter of rectangles, squares, triangles, and circumference of circles.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {perimeterProblems.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/geometry/${item.slug}`}
                    className="block bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-purple-500"
                  >
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">{item.formulaName}</p>
                      <p className="text-xl font-bold text-purple-600">
                        {item.resultFormatted}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Volume Calculations */}
          {volumeProblems.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <Box className="w-8 h-8 mr-3 text-blue-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Volume Calculations (3D Shapes)
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Calculate volume of cubes, rectangular prisms, cylinders, spheres, and cones.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {volumeProblems.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/geometry/${item.slug}`}
                    className="block bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-blue-500"
                  >
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">{item.shape}</p>
                      <p className="text-xl font-bold text-blue-600">
                        {item.resultFormatted}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{item.unit}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Surface Area Calculations */}
          {surfaceAreaProblems.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <Circle className="w-8 h-8 mr-3 text-green-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Surface Area Calculations
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Calculate surface area of cubes, spheres, and cylinders.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {surfaceAreaProblems.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/geometry/${item.slug}`}
                    className="block bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-4 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-green-500"
                  >
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">{item.shape}</p>
                      <p className="text-xl font-bold text-green-600">
                        {item.resultFormatted}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Educational Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Master Geometry with Step-by-Step Solutions
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Complete Formula Coverage
                </h3>
                <p className="leading-relaxed">
                  Access 5,000+ geometry problems covering all major shapes and formulas. From basic area calculations to complex 3D volume problems, we have detailed solutions for every geometry challenge.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-5 rounded-xl">
                  <h4 className="font-bold text-green-700 mb-2">2D Geometry</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Area of triangles, rectangles, circles</li>
                    <li>• Perimeter calculations</li>
                    <li>• Parallelograms & trapezoids</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl">
                  <h4 className="font-bold text-purple-700 mb-2">3D Geometry</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Volume of cubes, cylinders, spheres</li>
                    <li>• Surface area calculations</li>
                    <li>• Rectangular prisms & cones</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl">
                  <h4 className="font-bold text-blue-700 mb-2">Real-World Applications</h4>
                  <p className="text-sm">See how geometry is used in construction, design, engineering, and everyday life</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-5 rounded-xl">
                  <h4 className="font-bold text-orange-700 mb-2">Step-by-Step Learning</h4>
                  <p className="text-sm">Every problem includes detailed steps, formulas, and explanations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
