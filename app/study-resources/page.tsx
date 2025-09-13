"use client"

import type { Metadata } from "next"
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Study Resources - Free Learning Materials for Grades 6-12 | The Tutor Bridge",
  description: "Access comprehensive study resources for grades 6-12. Free notes, practice questions, and learning materials for Math, Science, and English. Expert-curated content to boost your academic performance.",
  keywords: [
    "study resources",
    "learning materials",
    "free notes",
    "practice questions",
    "grades 6-12",
    "math resources",
    "science resources",
    "english resources",
    "academic materials",
    "study guides"
  ],
  alternates: {
    canonical: "https://thetutorbridge.com/study-resources",
  },
  openGraph: {
    title: "Study Resources - Free Learning Materials for Grades 6-12 | The Tutor Bridge",
    description: "Access comprehensive study resources for grades 6-12. Free notes, practice questions, and learning materials for Math, Science, and English.",
    url: "https://thetutorbridge.com/study-resources",
    siteName: "The Tutor Bridge",
    type: "website",
  },
}

export default function StudyResources() {
  const classes = [6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Simple Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight mb-6">
            Study Resources for <span className="text-[#FFC857]">Classes 6-12</span>
                </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-8">
            Access comprehensive study materials, practice questions, and learning guides to excel in your academics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#grade-selector">
              <Button size="lg" className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-4 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold">
                Explore Resources <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
  </Link>
            <Link href="/book-demo-class">
              <Button size="lg" variant="outline" className="border-2 border-white text-white rounded-xl px-8 py-4 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold">
                Book Free Session
</Button>
            </Link>
          </div>
          </div>
        </section>

      {/* Simple Grade Selector */}
      <section id="grade-selector" className="py-16 bg-white px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
              Select Your Class
              </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Choose your class to explore available study materials.
              </p>
            </div>

          {/* Mobile-friendly class grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 max-w-4xl mx-auto">
            {classes.map((classNum) => (
              <Link
                key={classNum}
                href={`/study-resources/class-${classNum}`}
                className={`p-4 rounded-xl text-center transition-all duration-300 block ${
                  "bg-gray-50 hover:bg-gray-100 text-[#1A3D7C] hover:shadow-lg"
                }`}
              >
                <GraduationCap className="w-8 h-8 mx-auto mb-2 text-[#1A3D7C]" />
                <span className="font-semibold text-lg">Class {classNum}</span>
                      </Link>
              ))}
            </div>
          </div>
        </section>


      {/* Simple CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-poppins font-bold mb-6">
            Need Help with Your Studies?
              </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our expert mentors are here to help you succeed. Book a free session and get personalized guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-demo-class">
              <Button size="lg" className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-4 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold">
                Book Free Session
                  </Button>
                    </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white rounded-xl px-8 py-4 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold">
                Contact Us
                  </Button>
                    </Link>
          </div>
          </div>
        </section>

      {/* Simple Footer */}
      <footer className="bg-[#1A3D7C] text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
                <span className="text-xl font-poppins font-bold">The Tutor Bridge</span>
              </div>
              <p className="text-white/80 leading-relaxed">
                Empowering students with personalized education and career guidance for a brighter future.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-poppins font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/about" className="block text-white/80 hover:text-[#FFC857] transition-colors">About Us</Link>
                <Link href="/study-resources" className="block text-white/80 hover:text-[#FFC857] transition-colors">Study Resources</Link>
                <Link href="/career-guidance" className="block text-white/80 hover:text-[#FFC857] transition-colors">Career Guidance</Link>
                <Link href="/book-demo-class" className="block text-white/80 hover:text-[#FFC857] transition-colors">Book Demo</Link>
          </div>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-poppins font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Phone className="w-5 h-5 text-[#FFC857]" />
                  <span className="text-white/80">+91 9310096171</span>
                  </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Mail className="w-5 h-5 text-[#FFC857]" />
                  <span className="text-white/80">info@thetutorbridge.com</span>
                </div>
                  </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/60">
              © 2025 The Tutor Bridge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}