"use client"

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
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
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm overflow-x-auto">
            <Link href="/study-resources" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <GraduationCap className="w-4 h-4 mr-1" />
              Study Resources
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Class 6</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl overflow-hidden">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              Class 6 Study Resources
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Access comprehensive study materials, practice questions, and learning guides for Class 6 subjects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/study-resources">
              <Button size="lg" variant="outline" className="border-2 border-white text-white rounded-xl px-8 py-4 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to All Classes
              </Button>
            </Link>
            <Link href="/book-demo-class">
              <Button size="lg" className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-4 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold">
                Book Free Session
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Subject Resources */}
      <section className="py-16 bg-white px-6">
        <div className="container mx-auto max-w-7xl overflow-hidden">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
              Class 6 Subjects
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
                      <div className="py-8">
                        <div className="text-center mb-6">
                          <BookOpen className="w-16 h-16 text-[#2BAE66] mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-[#1A3D7C] mb-2">
                            Science Resources Available!
                          </h3>
               <p className="text-gray-600 max-w-md mx-auto">
                 Access comprehensive Class 6 Science resources including 10 detailed chapters with notes, examples, and interactive content.
               </p>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          <Link href="/study-resources/class-6/science/chapter-1-the-wonderful-world-of-science" className="block">
                            <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-[#2BAE66] min-w-0">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                                <div className="min-w-0 flex-1">
                                  <h4 className="font-semibold text-[#1A3D7C] break-words">The Wonderful World of Science</h4>
                                  <p className="text-sm text-gray-600">Introduction to science, scientific method, and daily life examples</p>
                                </div>
                              </div>
                              <ArrowRight className="w-5 h-5 text-[#2BAE66]" />
                            </div>
                          </Link>
                          
                          <Link href="/study-resources/class-6/science/chapter-2-diversity-in-the-living-world" className="block">
                            <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-[#2BAE66] min-w-0">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                                <div className="min-w-0 flex-1">
                                  <h4 className="font-semibold text-[#1A3D7C] break-words">Diversity in the Living World</h4>
                                  <p className="text-sm text-gray-600">Biodiversity, plant and animal classification, adaptations</p>
                                </div>
                              </div>
                              <ArrowRight className="w-5 h-5 text-[#2BAE66]" />
                            </div>
                          </Link>
                          
                          <Link href="/study-resources/class-6/science/chapter-3-mindful-eating-a-path-to-a-healthy-body" className="block">
                            <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-[#2BAE66] min-w-0">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                                <div className="min-w-0 flex-1">
                                  <h4 className="font-semibold text-[#1A3D7C] break-words">Mindful Eating: A Path to a Healthy Body</h4>
                                  <p className="text-sm text-gray-600">Nutrients, balanced diet, food tests, mindful eating habits</p>
                                </div>
                              </div>
                              <ArrowRight className="w-5 h-5 text-[#2BAE66]" />
                            </div>
                          </Link>
                          
               <Link href="/study-resources/class-6/science/chapter-4-exploring-magnets" className="block">
                 <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-[#2BAE66] min-w-0">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                     <div className="min-w-0 flex-1">
                       <h4 className="font-semibold text-[#1A3D7C] break-words">Exploring Magnets</h4>
                       <p className="text-sm text-gray-600">Magnetic materials, poles, compass, attraction and repulsion</p>
                     </div>
                   </div>
                   <ArrowRight className="w-5 h-5 text-[#2BAE66]" />
                 </div>
               </Link>
               
               <Link href="/study-resources/class-6/science/chapter-5-measurement-of-length-and-motion" className="block">
                 <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-[#2BAE66] min-w-0">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold">5</div>
                     <div className="min-w-0 flex-1">
                       <h4 className="font-semibold text-[#1A3D7C] break-words">Measurement of Length and Motion</h4>
                       <p className="text-sm text-gray-600">SI units, conversions, measuring tools, reference points, types of motion</p>
                     </div>
                   </div>
                   <ArrowRight className="w-5 h-5 text-[#2BAE66]" />
                 </div>
               </Link>
               
               <Link href="/study-resources/class-6/science/chapter-6-materials-around-us" className="block">
                 <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-[#2BAE66] min-w-0">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold">6</div>
                     <div className="min-w-0 flex-1">
                       <h4 className="font-semibold text-[#1A3D7C] break-words">Materials Around Us</h4>
                       <p className="text-sm text-gray-600">Properties of materials, classification, lustre, hardness, transparency, solubility</p>
                     </div>
                   </div>
                   <ArrowRight className="w-5 h-5 text-[#2BAE66]" />
                 </div>
               </Link>

               <Link href="/study-resources/class-6/science/chapter-7-temperature-and-its-measurement" className="block">
                 <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-[#2BAE66] min-w-0">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold">7</div>
                     <div className="min-w-0 flex-1">
                       <h4 className="font-semibold text-[#1A3D7C] break-words">Temperature and Its Measurement</h4>
                       <p className="text-sm text-gray-600">Clinical & lab thermometers, temperature scales, measurement techniques, safety tips</p>
                     </div>
                   </div>
                   <ArrowRight className="w-5 h-5 text-[#2BAE66]" />
                 </div>
               </Link>

               <Link href="/study-resources/class-6/science/chapter-8-a-journey-through-states-of-water" className="block">
                 <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-[#2BAE66] min-w-0">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold">8</div>
                     <div className="min-w-0 flex-1">
                       <h4 className="font-semibold text-[#1A3D7C] break-words">A Journey Through States of Water</h4>
                       <p className="text-sm text-gray-600">States of water, evaporation, condensation, water cycle, melting and freezing</p>
                     </div>
                   </div>
                   <ArrowRight className="w-5 h-5 text-[#2BAE66]" />
                 </div>
               </Link>

               <Link href="/study-resources/class-6/science/chapter-9-methods-of-separation-in-everyday-life" className="block">
                 <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-[#2BAE66] min-w-0">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold">9</div>
                     <div className="min-w-0 flex-1">
                       <h4 className="font-semibold text-[#1A3D7C] break-words">Methods of Separation in Everyday Life</h4>
                       <p className="text-sm text-gray-600">Handpicking, sieving, filtration, evaporation, winnowing, threshing, magnetic separation</p>
                     </div>
                   </div>
                   <ArrowRight className="w-5 h-5 text-[#2BAE66]" />
                 </div>
               </Link>

               <Link href="/study-resources/class-6/science/chapter-10-living-creatures-exploring-their-characteristics" className="block">
                 <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-[#2BAE66] min-w-0">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold">10</div>
                     <div className="min-w-0 flex-1">
                       <h4 className="font-semibold text-[#1A3D7C] break-words">Living Creatures: Exploring their Characteristics</h4>
                       <p className="text-sm text-gray-600">MRS GREN + D life processes, germination conditions, plant growth and movement</p>
                     </div>
                   </div>
                   <ArrowRight className="w-5 h-5 text-[#2BAE66]" />
                 </div>
               </Link>
                        </div>
                        
                        <div className="text-center">
                          <Link href="/book-demo-class">
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
                          We're working hard to bring you comprehensive {subject.toLowerCase()} resources for Class 6. 
                          In the meantime, book a free session with our expert mentors.
                        </p>
                        <Link href="/book-demo-class">
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
        <div className="container mx-auto text-center max-w-4xl overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-poppins font-bold mb-6">
            Need Help with Class 6 Studies?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our expert mentors can help you understand concepts better and excel in your Class 6 studies.
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

      {/* Footer */}
      <footer className="bg-[#1A3D7C] text-white py-12 px-6">
        <div className="container mx-auto max-w-7xl overflow-hidden">
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






