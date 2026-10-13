'use client';

import React from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { Home, DollarSign } from 'lucide-react';

export default function SalesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#1A3D7C] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Sales</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] via-[#2563eb] to-[#2BAE66] text-white py-16 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm mb-6">
            <DollarSign className="w-4 h-4" />
            <span>Sales Resources</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Sales Guides & Tools
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Comprehensive guides to help you find the best sales tools, close more deals, and accelerate revenue growth.
          </p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-12 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-8">We&apos;re working on comprehensive sales guides including CRM software comparisons, sales automation tools, prospecting strategies, and more.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg">Best CRM Software</span>
            <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg">Sales Automation Tools</span>
            <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg">Cold Email Software</span>
            <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg">Sales Intelligence</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
