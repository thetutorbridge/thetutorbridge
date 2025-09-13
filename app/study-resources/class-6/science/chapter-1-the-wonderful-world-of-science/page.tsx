"use client"

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Lightbulb,
  Target,
  Beaker,
  Globe,
  Droplets,
  Thermometer,
  Star,
  Users,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Home,
  GraduationCap,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";

export default function Class6ScienceChapter1() {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const scientificMethodSteps = [
    { step: "1. Observe", icon: "👀", description: "Notice something interesting", example: "You see a plant growing towards the light" },
    { step: "2. Question", icon: "❓", description: "Ask why/how it happens", example: "Why does the plant grow towards the light?" },
    { step: "3. Guess (Hypothesis)", icon: "💭", description: "Make a possible answer", example: "The plant grows towards light to get more sunlight for photosynthesis" },
    { step: "4. Test", icon: "🧪", description: "Experiment or observe more", example: "Place plants in different lighting conditions and observe their growth" },
    { step: "5. Analyse", icon: "📊", description: "Check if the guess was correct", example: "Compare the growth of plants in different lighting" },
  ];

  const scienceAreas = [
    { title: "Planet Earth", icon: "🌍", description: "Life, plants, animals, ecosystems" },
    { title: "Food", icon: "🍲", description: "Cuisines, ingredients, nutrition" },
    { title: "Materials", icon: "🧱", description: "Paper, plastic, metal, rubber" },
    { title: "Water", icon: "💧", description: "Ice, water, steam, water cycle" },
    { title: "Heat & Temperature", icon: "🌡️", description: "Hot/cold, fever thermometer" },
    { title: "Space Beyond Earth", icon: "🌌", description: "Sun, Moon, Stars, Galaxies" },
  ];

  const dailyLifeExamples = [
    { activity: "Cooking", science: "Heat transfer, chemical reactions" },
    { activity: "Repairing", science: "Mechanical principles, problem-solving" },
    { activity: "Gardening", science: "Plant biology, soil chemistry" },
    { activity: "Using electricity", science: "Electrical circuits, energy flow" },
  ];

  const curiosityQuestions = [
    "Why do stars shine? ✨",
    "How does a flower know when to bloom? 🌸",
    "Why does it rain? 🌧️",
    "Why do we sweat in summer?",
    "Why do leaves fall in autumn?",
    "Why does milk spoil outside the fridge?",
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto">
            <Link href="/study-resources" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center whitespace-nowrap">
              <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Study Resources</span>
              <span className="sm:hidden">Resources</span>
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/study-resources" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center whitespace-nowrap">
              <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Class 6</span>
              <span className="sm:hidden">C6</span>
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/study-resources" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center whitespace-nowrap">
              <Beaker className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Science</span>
              <span className="sm:hidden">Sci</span>
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 truncate max-w-[200px] sm:max-w-none">
              <span className="hidden sm:inline">Chapter 1 - The Wonderful World of Science</span>
              <span className="sm:hidden">Ch 1</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-6">
            <BookOpen className="w-12 h-12 text-[#FFC857] mb-4 sm:mb-0 sm:mr-4" />
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-poppins font-bold leading-tight text-center">
              The Wonderful World of Science
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Class 6 Science - Chapter 1: Explore the fascinating world of science through curiosity, observation, and discovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/study-resources">
              <Button size="lg" variant="outline" className="border-2 border-white text-white rounded-xl px-8 py-4 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Resources
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

      {/* Introduction Section */}
      <section className="py-16 bg-white px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  ✨ Introduction
                </h2>
                <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Humans are naturally <strong className="text-[#1A3D7C]">curious</strong> — we ask questions and explore since childhood.
                </p>
                <p>
                  Science is our tool to <strong className="text-[#1A3D7C]">understand the world</strong> and uncover its secrets.
                </p>
                <p>
                  It is <strong className="text-[#1A3D7C]">everywhere</strong>: in kitchens, oceans, forests, playgrounds, and even outer space.
                </p>
                
                <div className="bg-[#FFC857]/10 p-6 rounded-xl border-l-4 border-[#FFC857]">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-[#FFC857] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-2">💡 Key Thought:</h3>
                      <p className="text-gray-700">
                        To be wise, always be a <strong>"Whys" person</strong> — keep asking questions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What is Science Section */}
      <section className="py-16 bg-[#F8FAFC] px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  🔍 What is Science?
                </h2>
                <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Science = <strong className="text-[#1A3D7C]">Thinking + Observing + Experimenting</strong>.
                </p>
                <p>
                  Like a <strong className="text-[#1A3D7C]">giant jigsaw puzzle</strong>: each discovery is a piece, but the puzzle is endless.
                </p>
                <p>
                  Old ideas can change when new discoveries arrive.
                </p>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-[#1A3D7C] mb-4">Examples from Daily Life:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                      Why do stars shine? ✨
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                      How does a flower know when to bloom? 🌸
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                      Why does it rain? 🌧️
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Science Areas Section */}
      <section className="py-16 bg-white px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">
              🌏 What Will We Explore?
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Science connects to all parts of life
            </p>
            <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full mt-4"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scienceAreas.map((area, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{area.icon}</div>
                  <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-3">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {area.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Scientific Method Section */}
      <section className="py-16 bg-[#F8FAFC] px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  🧪 The Scientific Method
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  Science is a <strong>process</strong>, not just facts.
                </p>
                <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-[#1A3D7C] mb-4">Steps (OQGTA):</h3>
                  <div className="space-y-4">
                    {scientificMethodSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl">{step.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#1A3D7C] mb-1">{step.step}</h4>
                          <p className="text-gray-700 mb-2">{step.description}</p>
                          <p className="text-sm text-gray-600 italic">Example: {step.example}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-[#FFC857]/10 p-6 rounded-xl border-l-4 border-[#FFC857]">
                  <div className="flex items-start gap-3">
                    <Target className="w-6 h-6 text-[#FFC857] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-2">💡 Memory Trick:</h3>
                      <p className="text-gray-700">
                        Think <strong>OQGTA</strong> → "Old Queen Gave Tea Away"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Daily Life Science Section */}
      <section className="py-16 bg-white px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  👫 Science in Daily Life
                </h2>
                <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Cooking, repairing, gardening = all mini-science activities.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Anyone applying the method = <strong className="text-[#1A3D7C]">a scientist in action</strong>.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Science is teamwork → Scientists work together globally.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {dailyLifeExamples.map((example, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-[#1A3D7C] mb-2">{example.activity}</h4>
                      <p className="text-gray-600 text-sm">{example.science}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Curiosity Section */}
      <section className="py-16 bg-[#F8FAFC] px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  💡 Curiosity is Key
                </h2>
                <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Curiosity makes us explore the unknown.
                </p>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-[#1A3D7C] mb-4">Example "Why" Questions:</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {curiosityQuestions.map((question, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        <span className="text-gray-700">{question}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* HOTS Section */}
      <section className="py-16 bg-white px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  📚 HOTS (Higher Order Thinking Skills)
                </h2>
                <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#1A3D7C] mb-2">1. Why is science compared to a puzzle?</h4>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#1A3D7C] mb-2">2. If new discoveries can change old ideas, how should a scientist think?</h4>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#1A3D7C] mb-2">3. How is boiling water in the kitchen an example of science in daily life?</h4>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Recap Section */}
      <section className="py-16 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-poppins font-bold mb-8">
            🎯 Quick Recap
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Key Points:</h3>
              <ul className="space-y-2 text-left">
                <li>• Science = curiosity + experiments</li>
                <li>• It covers Earth, food, materials, water, heat, and space</li>
                <li>• Scientific Method = OQGTA</li>
                <li>• Science is teamwork, curiosity, and discovery</li>
              </ul>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Fun Fact:</h3>
              <p className="text-left">
                The word <em>science</em> comes from Latin <em>scientia</em>, meaning <strong>knowledge</strong>. 
                New species are discovered on Earth every year! 🐠🌱
              </p>
            </div>
          </div>
          
          <div className="bg-white/10 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">✍️ Memory Hook:</h3>
            <p>
              Science is like cooking 🍳 — You ask why taste is odd, change ingredients (test), observe results. That's science in action!
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1A3D7C] mb-6">
            Need Help Understanding Science Concepts?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Our expert science mentors can help you understand these concepts better and answer all your curious questions!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-demo-class">
              <Button size="lg" className="bg-[#2BAE66] text-white rounded-xl px-8 py-4 hover:shadow-lg hover:bg-[#2BAE66]/90 transition-all text-lg font-semibold">
                Book Free Science Session
              </Button>
            </Link>
            <Link href="/study-resources">
              <Button size="lg" variant="outline" className="border-2 border-[#1A3D7C] text-[#1A3D7C] rounded-xl px-8 py-4 hover:bg-[#1A3D7C] hover:text-white transition-all text-lg font-semibold">
                Explore More Resources
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
                <Link href="/book-demo-class" className="block text-white/80 hover:text-[#FFC857] transition-colors">Book Demo</Link>
              </div>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-poppins font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Users className="w-5 h-5 text-[#FFC857]" />
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