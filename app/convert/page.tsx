'use client';

import Link from 'next/link';
import { Home, Calculator, TrendingUp, Ruler, Weight, Droplet, Thermometer, Maximize, Zap, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { conversionsData } from '@/lib/conversions-data';

export default function ConvertMainPage() {
  // Group conversions by category
  const lengthConversions = conversionsData.filter(c => c.category === 'length').slice(0, 24);
  const weightConversions = conversionsData.filter(c => c.category === 'weight').slice(0, 20);
  const volumeConversions = conversionsData.filter(c => c.category === 'volume').slice(0, 16);
  const temperatureConversions = conversionsData.filter(c => c.category === 'temperature').slice(0, 12);
  const areaConversions = conversionsData.filter(c => c.category === 'area').slice(0, 12);
  const speedConversions = conversionsData.filter(c => c.category === 'speed').slice(0, 12);

  const categoryIcons = {
    length: Ruler,
    weight: Weight,
    volume: Droplet,
    temperature: Thermometer,
    area: Maximize,
    speed: Zap,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Unit Converter - Convert Length, Weight, Volume & More',
            description: 'Free online unit converter with 10,000+ conversions. Convert between metric and imperial units instantly.',
            url: 'https://www.thetutorbridge.com/convert',
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
            <span className="text-gray-600">Unit Converter</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Calculator className="w-16 h-16 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold">Unit Converter</h1>
            </div>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
              Convert units instantly with step-by-step solutions for 10,000+ conversions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-3xl font-bold text-[#FFC857]">10,000+</p>
                <p className="text-sm text-blue-100">Conversions</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-3xl font-bold text-[#FFC857]">6 Categories</p>
                <p className="text-sm text-blue-100">Length, Weight, Volume & More</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-3xl font-bold text-[#FFC857]">100% Free</p>
                <p className="text-sm text-blue-100">No Signup Required</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Length Conversions */}
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <Ruler className="w-8 h-8 mr-3 text-[#2BAE66]" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Length & Distance Conversions
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Convert between centimeters, inches, meters, feet, kilometers, miles, and more.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {lengthConversions.map((item) => (
                <Link
                  key={item.slug}
                  href={`/convert/${item.slug}`}
                  className="block bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-[#2BAE66]"
                >
                  <div className="text-center">
                    <p className="text-lg font-bold text-[#1A3D7C] mb-2">
                      {item.value} {item.fromUnit}
                    </p>
                    <div className="text-sm text-gray-400 mb-2">to</div>
                    <p className="text-lg font-bold text-gray-900 mb-3">
                      {item.toUnit}
                    </p>
                    <div className="text-sm text-gray-400 mb-1">=</div>
                    <div className="text-xl font-bold text-green-600">
                      {item.resultFormatted}
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-4 text-[#2BAE66]">
                    <span className="text-sm font-medium">Convert</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Weight Conversions */}
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <Weight className="w-8 h-8 mr-3 text-purple-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Weight & Mass Conversions
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Convert between kilograms, pounds, grams, ounces, and more.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {weightConversions.map((item) => (
                <Link
                  key={item.slug}
                  href={`/convert/${item.slug}`}
                  className="block bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-purple-500"
                >
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">{item.value} {item.fromUnit} to {item.toUnit}</p>
                    <p className="text-xl font-bold text-purple-600">
                      {item.resultFormatted}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Volume Conversions */}
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <Droplet className="w-8 h-8 mr-3 text-blue-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Volume & Capacity Conversions
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Convert between liters, gallons, milliliters, cups, pints, and more.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {volumeConversions.map((item) => (
                <Link
                  key={item.slug}
                  href={`/convert/${item.slug}`}
                  className="block bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-blue-500"
                >
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">{item.value} {item.fromUnit} to {item.toUnit}</p>
                    <p className="text-xl font-bold text-blue-600">
                      {item.resultFormatted}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Temperature Conversions */}
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <Thermometer className="w-8 h-8 mr-3 text-red-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Temperature Conversions
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Convert between Celsius, Fahrenheit, and Kelvin.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {temperatureConversions.map((item) => (
                <Link
                  key={item.slug}
                  href={`/convert/${item.slug}`}
                  className="block bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-red-500"
                >
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">{item.value}°{item.fromUnit.toUpperCase()} to °{item.toUnit.toUpperCase()}</p>
                    <p className="text-xl font-bold text-red-600">
                      {item.resultFormatted}°
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Educational Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Use Our Unit Converter?
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Comprehensive Coverage
                </h3>
                <p className="leading-relaxed">
                  Access 10,000+ unit conversions across 6 major categories: length, weight, volume, temperature, area, and speed. Whether you need metric to imperial or any other conversion, we've got you covered.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Step-by-Step Solutions
                </h3>
                <p className="leading-relaxed">
                  Don't just get the answer—understand how it works! Each conversion includes detailed step-by-step explanations and the conversion formula, helping you learn the math behind unit conversions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Real-World Applications
                </h3>
                <p className="leading-relaxed">
                  See practical examples of how each conversion is used in everyday life, from cooking and travel to construction and science. Learn when and why you'd need each conversion.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-5 rounded-xl">
                  <h4 className="font-bold text-green-700 mb-2">Fast & Accurate</h4>
                  <p className="text-sm">Instant conversions with precise calculations you can trust</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl">
                  <h4 className="font-bold text-purple-700 mb-2">Educational</h4>
                  <p className="text-sm">Learn the formulas and understand the conversion process</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl">
                  <h4 className="font-bold text-blue-700 mb-2">Mobile Friendly</h4>
                  <p className="text-sm">Convert units on any device, anywhere, anytime</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-5 rounded-xl">
                  <h4 className="font-bold text-orange-700 mb-2">100% Free</h4>
                  <p className="text-sm">No registration, no ads, no hidden fees—completely free</p>
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
