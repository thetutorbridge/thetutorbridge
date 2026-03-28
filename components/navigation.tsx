"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, FileText, GraduationCap, Calculator, BookOpen, Map, Wrench, Shapes, ArrowRightLeft, Variable, Percent, Divide, FlaskConical, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [activeDesktopDropdown, setActiveDesktopDropdown] = useState<string | null>(null)

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b shadow-sm" style={{ zIndex: 9999 }}>
        <div className="container mx-auto px-4 h-full">
          <nav className="flex h-full items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image src="/TheTutorBridge Logo New.png" width={40} height={40} alt="The Tutor Bridge Logo" className="h-10 w-10" />
              <span className="text-2xl font-bold bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">
                The Tutor Bridge
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 h-full">
              {/* Homework Help */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveDesktopDropdown('homework')}
                onMouseLeave={() => setActiveDesktopDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-brand-teal transition-colors">
                  Homework Help
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDesktopDropdown === 'homework' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Tutoring */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveDesktopDropdown('tutoring')}
                onMouseLeave={() => setActiveDesktopDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-brand-teal transition-colors">
                  Tutoring
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDesktopDropdown === 'tutoring' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Resources */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveDesktopDropdown('resources')}
                onMouseLeave={() => setActiveDesktopDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-brand-teal transition-colors">
                  Resources
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDesktopDropdown === 'resources' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-brand-teal transition-colors">
                Pricing
              </Link>
              <Link href="/how-it-works" className="text-sm font-medium text-gray-700 hover:text-brand-teal transition-colors">
                How It Works
              </Link>
              <Link href="/faq" className="text-sm font-medium text-gray-700 hover:text-brand-teal transition-colors">
                FAQ
              </Link>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-3">
              <Link href="/homework-help/submit" className="hidden md:flex lg:hidden">
                <Button variant="outline" className="border-[#1A3D7C] text-[#1A3D7C]">
                  Get Help
                </Button>
              </Link>
              <Link href="/tutoring/free-consultation" className="hidden lg:flex">
                <Button className="bg-[#1A3D7C] text-white hover:bg-[#1A3D7C]/90">
                  Book Free Consultation
                </Button>
              </Link>

              {/* Mobile menu button */}
              <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Desktop Dropdown Menus - Positioned OUTSIDE header, below navbar */}
      {activeDesktopDropdown && (
        <div
          className="fixed left-0 right-0 hidden lg:block"
          style={{ top: '64px', zIndex: 9998 }}
          onMouseEnter={() => setActiveDesktopDropdown(activeDesktopDropdown)}
          onMouseLeave={() => setActiveDesktopDropdown(null)}
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div
                className="bg-white rounded-lg shadow-xl border border-gray-100 p-3 min-w-[280px]"
                style={{
                  marginLeft: activeDesktopDropdown === 'homework' ? '-200px' :
                              activeDesktopDropdown === 'tutoring' ? '-80px' :
                              '-40px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
                  maxHeight: '80vh',
                  overflowY: 'auto'
                }}
              >
                {activeDesktopDropdown === 'homework' && (
                  <>
                    <Link href="/homework-help" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <FileText className="w-5 h-5 text-[#1A3D7C]" />
                      <div>
                        <div className="font-medium text-gray-900">All Subjects</div>
                        <div className="text-xs text-gray-500">Overview & Submit</div>
                      </div>
                    </Link>
                    <div className="border-t my-2"></div>
                    <Link href="/homework-help/math" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <span className="w-5 h-5 flex items-center justify-center text-[#1A3D7C] font-bold">∑</span>
                      <span className="text-gray-700">Math Help</span>
                    </Link>
                    <Link href="/homework-help/science" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <span className="w-5 h-5 flex items-center justify-center text-[#2BAE66]">🔬</span>
                      <span className="text-gray-700">Science Help</span>
                    </Link>
                    <Link href="/homework-help/english" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <span className="w-5 h-5 flex items-center justify-center text-[#FFC857]">📝</span>
                      <span className="text-gray-700">English Help</span>
                    </Link>
                    <div className="border-t my-2"></div>
                    <Link href="/homework-help/submit" className="flex items-center justify-center gap-2 p-3 bg-[#2BAE66] text-white rounded-lg hover:bg-[#2BAE66]/90 transition-colors font-medium" onClick={() => setActiveDesktopDropdown(null)}>
                      Submit Homework
                    </Link>
                  </>
                )}

                {activeDesktopDropdown === 'tutoring' && (
                  <>
                    <Link href="/tutoring" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <GraduationCap className="w-5 h-5 text-[#1A3D7C]" />
                      <div>
                        <div className="font-medium text-gray-900">All Subjects</div>
                        <div className="text-xs text-gray-500">Weekly 1-on-1 Sessions</div>
                      </div>
                    </Link>
                    <div className="border-t my-2"></div>
                    <Link href="/tutoring/math" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <span className="w-5 h-5 flex items-center justify-center text-[#1A3D7C] font-bold">∑</span>
                      <span className="text-gray-700">Math Tutoring</span>
                    </Link>
                    <Link href="/tutoring/science" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <span className="w-5 h-5 flex items-center justify-center text-[#2BAE66]">🔬</span>
                      <span className="text-gray-700">Science Tutoring</span>
                    </Link>
                    <Link href="/tutoring/english" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <span className="w-5 h-5 flex items-center justify-center text-[#FFC857]">📝</span>
                      <span className="text-gray-700">English Tutoring</span>
                    </Link>
                    <div className="border-t my-2"></div>
                    <Link href="/tutoring/free-consultation" className="flex items-center justify-center gap-2 p-3 bg-[#FFC857] text-[#1A3D7C] rounded-lg hover:bg-[#FFC857]/90 transition-colors font-medium" onClick={() => setActiveDesktopDropdown(null)}>
                      Free Consultation
                    </Link>
                  </>
                )}

                {activeDesktopDropdown === 'resources' && (
                  <>
                    <Link href="/tools" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <Wrench className="w-5 h-5 text-[#2BAE66]" />
                      <div>
                        <div className="font-medium text-gray-900">Tools</div>
                        <div className="text-xs text-gray-500">Timer, Password Gen & More</div>
                      </div>
                    </Link>
                    <Link href="/calculators" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <Calculator className="w-5 h-5 text-[#1A3D7C]" />
                      <div>
                        <div className="font-medium text-gray-900">Calculators</div>
                        <div className="text-xs text-gray-500">200+ Free Calculators</div>
                      </div>
                    </Link>
                    <div className="border-t my-2"></div>
                    <Link href="/geometry" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <Shapes className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">Geometry Calculator</span>
                    </Link>
                    <Link href="/convert" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <ArrowRightLeft className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">Unit Converter</span>
                    </Link>
                    <Link href="/solve" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <Variable className="w-5 h-5 text-orange-600" />
                      <span className="text-gray-700">Equation Solver</span>
                    </Link>
                    <Link href="/percentage" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <Percent className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Percentage Calculator</span>
                    </Link>
                    <Link href="/fraction-to-decimal" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <Divide className="w-5 h-5 text-pink-600" />
                      <span className="text-gray-700">Fraction to Decimal</span>
                    </Link>
                    <Link href="/formulas" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <FlaskConical className="w-5 h-5 text-teal-600" />
                      <span className="text-gray-700">Formulas Database</span>
                    </Link>
                    <Link href="/word-problems" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <MessageSquare className="w-5 h-5 text-indigo-600" />
                      <span className="text-gray-700">Word Problems</span>
                    </Link>
                    <div className="border-t my-2"></div>
                    <Link href="/roadmap" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <Map className="w-5 h-5 text-[#1A3D7C]" />
                      <span className="text-gray-700">Career Roadmaps</span>
                    </Link>
                    <Link href="/study-resources" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <BookOpen className="w-5 h-5 text-[#FFC857]" />
                      <span className="text-gray-700">Study Resources</span>
                    </Link>
                    <Link href="/blog" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <FileText className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Blog</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16"></div>

      {/* Mobile Navigation - Full screen overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-16 bg-white lg:hidden overflow-y-auto" style={{ zIndex: 9998 }}>
          <div className="container mx-auto px-4 py-4 space-y-2">
            {/* Homework Help Section */}
            <div>
              <button
                onClick={() => toggleDropdown('homework')}
                className="flex items-center justify-between w-full py-3 text-gray-700 font-medium"
              >
                <span>Homework Help</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'homework' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'homework' && (
                <div className="pl-4 space-y-1 pb-2">
                  <Link href="/homework-help" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>
                    All Subjects
                  </Link>
                  <Link href="/homework-help/math" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>
                    Math Help
                  </Link>
                  <Link href="/homework-help/science" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>
                    Science Help
                  </Link>
                  <Link href="/homework-help/english" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>
                    English Help
                  </Link>
                  <Link href="/homework-help/submit" className="block py-2 text-[#2BAE66] font-medium" onClick={() => setIsOpen(false)}>
                    Submit Homework →
                  </Link>
                </div>
              )}
            </div>

            {/* Tutoring Section */}
            <div>
              <button
                onClick={() => toggleDropdown('tutoring')}
                className="flex items-center justify-between w-full py-3 text-gray-700 font-medium"
              >
                <span>Tutoring</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'tutoring' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'tutoring' && (
                <div className="pl-4 space-y-1 pb-2">
                  <Link href="/tutoring" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>
                    All Subjects
                  </Link>
                  <Link href="/tutoring/math" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>
                    Math Tutoring
                  </Link>
                  <Link href="/tutoring/science" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>
                    Science Tutoring
                  </Link>
                  <Link href="/tutoring/english" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>
                    English Tutoring
                  </Link>
                  <Link href="/tutoring/free-consultation" className="block py-2 text-[#FFC857] font-medium" onClick={() => setIsOpen(false)}>
                    Free Consultation →
                  </Link>
                </div>
              )}
            </div>

            {/* Resources Section */}
            <div>
              <button
                onClick={() => toggleDropdown('resources')}
                className="flex items-center justify-between w-full py-3 text-gray-700 font-medium"
              >
                <span>Resources</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'resources' && (
                <div className="pl-4 space-y-1 pb-2">
                  <Link href="/tools" className="block py-2 text-[#2BAE66] font-medium" onClick={() => setIsOpen(false)}>
                    🛠️ Tools
                  </Link>
                  <Link href="/calculators" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>
                    🧮 Calculators (200+)
                  </Link>
                  <Link href="/geometry" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>
                    📐 Geometry Calculator
                  </Link>
                  <Link href="/convert" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>
                    🔄 Unit Converter
                  </Link>
                  <Link href="/solve" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>
                    ✏️ Equation Solver
                  </Link>
                  <Link href="/percentage" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>
                    📊 Percentage Calculator
                  </Link>
                  <Link href="/fraction-to-decimal" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>
                    ➗ Fraction to Decimal
                  </Link>
                  <Link href="/formulas" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>
                    🧪 Formulas Database
                  </Link>
                  <Link href="/word-problems" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>
                    💬 Word Problems
                  </Link>
                  <div className="border-t my-2"></div>
                  <Link href="/roadmap" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>
                    🗺️ Career Roadmaps
                  </Link>
                  <Link href="/study-resources" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>
                    📚 Study Resources
                  </Link>
                  <Link href="/blog" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>
                    📝 Blog
                  </Link>
                </div>
              )}
            </div>

            <div className="border-t pt-2">
              <Link href="/pricing" className="block py-3 text-gray-700" onClick={() => setIsOpen(false)}>
                Pricing
              </Link>
              <Link href="/how-it-works" className="block py-3 text-gray-700" onClick={() => setIsOpen(false)}>
                How It Works
              </Link>
              <Link href="/faq" className="block py-3 text-gray-700" onClick={() => setIsOpen(false)}>
                FAQ
              </Link>
              <Link href="/about" className="block py-3 text-gray-700" onClick={() => setIsOpen(false)}>
                About Us
              </Link>
              <Link href="/contact" className="block py-3 text-gray-700" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </div>

            <div className="border-t pt-4 space-y-3">
              <Link href="/homework-help/submit" className="block" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-[#2BAE66] hover:bg-[#2BAE66]/90">
                  Submit Homework
                </Button>
              </Link>
              <Link href="/tutoring/free-consultation" className="block" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-[#1A3D7C] hover:bg-[#1A3D7C]/90">
                  Book Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
