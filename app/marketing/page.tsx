'use client';

import React from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { Search, TrendingUp, BarChart3, Megaphone, Home, ArrowRight } from 'lucide-react';

const marketingResources = [
  {
    title: "Best SEO Tools",
    description: "32 best SEO tools for 2026: free and paid options. Compare features, pricing, and find the perfect tools for your needs.",
    href: "/marketing/best-seo-tools",
    icon: Search,
    tags: ["SEO", "Tools", "Free & Paid"]
  }
];

export default function MarketingPage() {
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
            <span className="text-gray-900 font-medium">Marketing</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] via-[#2563eb] to-[#2BAE66] text-white py-16 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm mb-6">
            <Megaphone className="w-4 h-4" />
            <span>Marketing Resources</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Marketing Guides & Tools
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Comprehensive guides to help you grow your online presence with SEO, content marketing, and digital strategies.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Resources</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {marketingResources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <Link
                  key={index}
                  href={resource.href}
                  className="group bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:border-[#1A3D7C] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1A3D7C] transition mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {resource.tags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#1A3D7C] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-12 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">More Coming Soon</h2>
          <p className="text-gray-600 mb-8">We&apos;re working on more marketing guides including content marketing, social media, email marketing, and more.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg">Content Marketing Guide</span>
            <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg">Social Media Tools</span>
            <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg">Email Marketing</span>
            <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg">Analytics Guide</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
