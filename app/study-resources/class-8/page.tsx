"use client"

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Calculator,
  Beaker,
  PenTool,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Phone,
  Mail,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";

export default function Class6Resources() {
  const [expandedSubjects, setExpandedSubjects] = useState<{ [key: string]: boolean }>({});

  const subjects = ["Mathematics", "Science", "English"];

  const toggleSubject = (subject: string) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [subject]: !prev[subject]
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/study-resources" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <GraduationCap className="w-4 h-4 mr-1" />
              Study Resources
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Class 8</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              Class 8 Study Resources
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Access comprehensive study materials, practice questions, and learning guides for Class 8 subjects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/study-resources">
              <Button size="lg" variant="outline" className="border-2 border-white text-white rounded-xl px-8 py-4 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to All Classes
              </Button>
            </Link>
            <Link href="/tutoring/free-consultation">
              <Button size="lg" className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-4 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold">
                Book Free Session
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Subject Resources */}
      <section className="py-16 bg-white px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
              Class 8 Subjects
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Choose a subject to explore available study materials.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {subjects.map((subject) => (
              <Card key={subject} className="border-0 shadow-lg">
                <button
                  className="flex justify-between items-center w-full p-6 text-left font-semibold text-lg text-[#1A3D7C] hover:bg-gray-50 transition-colors rounded-lg"
                  onClick={() => toggleSubject(subject)}
                >
                  <div className="flex items-center gap-3">
                    {subject === "Mathematics" && <Calculator className="w-6 h-6 text-[#2BAE66]" />}
                    {subject === "Science" && <Beaker className="w-6 h-6 text-[#2BAE66]" />}
                    {subject === "English" && <PenTool className="w-6 h-6 text-[#2BAE66]" />}
                    {subject}
                  </div>
                  {expandedSubjects[subject] ? (
                    <ChevronUp className="w-5 h-5 text-[#2BAE66]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#2BAE66]" />
                  )}
                </button>
                {expandedSubjects[subject] && (
                  <CardContent className="p-6 border-t border-gray-200 bg-white">
                    {subject === "Science" ? (
                      <div className="text-center py-8">
                        <BookOpen className="w-16 h-16 text-[#2BAE66] mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-[#1A3D7C] mb-2">
                          Science Resources Available!
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                          Access comprehensive Class 8 Science resources including Chapter 1: The Wonderful World of Science.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Link href="/study-resources/class-8/science/chapter-1-the-wonderful-world-of-science">
                            <Button className="bg-[#2BAE66] text-white rounded-xl px-6 py-3 hover:bg-[#2BAE66]/90 transition-all">
                              View Chapter 1
                            </Button>
                          </Link>
                          <Link href="/tutoring/free-consultation">
                            <Button variant="outline" className="border-2 border-[#2BAE66] text-[#2BAE66] rounded-xl px-6 py-3 hover:bg-[#2BAE66] hover:text-white transition-all">
                              Book Free Session
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-[#1A3D7C] mb-2">
                          {subject} Resources Coming Soon!
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                          We're working hard to bring you comprehensive {subject.toLowerCase()} resources for Class 8. 
                          In the meantime, book a free session with our expert mentors.
                        </p>
                        <Link href="/tutoring/free-consultation">
                          <Button className="bg-[#2BAE66] text-white rounded-xl px-6 py-3 hover:bg-[#2BAE66]/90 transition-all">
                            Book Free Session
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-poppins font-bold mb-6">
            Need Help with Class 8 Studies?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our expert mentors can help you understand concepts better and excel in your Class 8 studies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tutoring/free-consultation">
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

      {/* Footer */}
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
                <Link href="/tutoring/free-consultation" className="block text-white/80 hover:text-[#FFC857] transition-colors">Book Demo</Link>
              </div>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-poppins font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Phone className="w-5 h-5 text-[#FFC857]" />
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
              © 2026 The Tutor Bridge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
