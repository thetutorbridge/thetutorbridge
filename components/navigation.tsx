"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, Calculator, Wrench, Gamepad2 } from "lucide-react"
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
              {/* Tools */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveDesktopDropdown('tools')}
                onMouseLeave={() => setActiveDesktopDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-brand-teal transition-colors">
                  Tools
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDesktopDropdown === 'tools' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Calculators */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveDesktopDropdown('calculators')}
                onMouseLeave={() => setActiveDesktopDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-brand-teal transition-colors">
                  Calculators
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDesktopDropdown === 'calculators' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <Link href="/roadmap" className="text-sm font-medium text-gray-700 hover:text-brand-teal transition-colors">
                Roadmaps
              </Link>
              <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-brand-teal transition-colors">
                Blog
              </Link>
              <Link href="/faq" className="text-sm font-medium text-gray-700 hover:text-brand-teal transition-colors">
                FAQ
              </Link>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-3">
              <Link href="/tools" className="hidden lg:flex">
                <Button className="bg-[#2BAE66] text-white hover:bg-[#2BAE66]/90">
                  <Gamepad2 className="w-4 h-4 mr-2" />
                  Explore Tools
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

      {/* Desktop Dropdown Menus */}
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
                  marginLeft: activeDesktopDropdown === 'tools' ? '-200px' :
                              activeDesktopDropdown === 'calculators' ? '-80px' :
                              '-40px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
                  maxHeight: '80vh',
                  overflowY: 'auto'
                }}
              >
                {activeDesktopDropdown === 'tools' && (
                  <>
                    <Link href="/tools" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <Wrench className="w-5 h-5 text-[#2BAE66]" />
                      <div>
                        <div className="font-medium text-gray-900">All Tools</div>
                        <div className="text-xs text-gray-500">80+ Developer Tools</div>
                      </div>
                    </Link>
                    <div className="border-t my-2"></div>
                    <Link href="/tools/timer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <span className="text-gray-700">⏱️ Study Timer</span>
                    </Link>
                    <Link href="/tools/pomodoro-timer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <span className="text-gray-700">🍅 Pomodoro Timer</span>
                    </Link>
                    <Link href="/tools/random-number-generator" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <span className="text-gray-700">🎲 Random Number</span>
                    </Link>
                    <Link href="/tools/password-generator" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <span className="text-gray-700">🔐 Password Gen</span>
                    </Link>
                    <Link href="/tools/word-counter" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <span className="text-gray-700">📝 Word Counter</span>
                    </Link>
                    <div className="border-t my-2"></div>
                    <Link href="/tools" className="flex items-center justify-center gap-2 p-3 bg-[#2BAE66] text-white rounded-lg hover:bg-[#2BAE66]/90 transition-colors font-medium" onClick={() => setActiveDesktopDropdown(null)}>
                      View All Tools
                    </Link>
                  </>
                )}

                {activeDesktopDropdown === 'calculators' && (
                  <>
                    <Link href="/calculators" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <Calculator className="w-5 h-5 text-[#1A3D7C]" />
                      <div>
                        <div className="font-medium text-gray-900">All Calculators</div>
                        <div className="text-xs text-gray-500">100+ Free Calculators</div>
                      </div>
                    </Link>
                    <div className="border-t my-2"></div>
                    <Link href="/calculators/gpa-calculator" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <span className="text-gray-700">📊 GPA Calculator</span>
                    </Link>
                    <Link href="/calculators/grade-calculator" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <span className="text-gray-700">📈 Grade Calculator</span>
                    </Link>
                    <Link href="/calculators/percentage-calculator" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <span className="text-gray-700">% Percentage Calc</span>
                    </Link>
                    <Link href="/calculators/scientific-calculator" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <span className="text-gray-700">🧮 Scientific Calc</span>
                    </Link>
                    <Link href="/calculators/bmi-calculator" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveDesktopDropdown(null)}>
                      <span className="text-gray-700">⚖️ BMI Calculator</span>
                    </Link>
                    <div className="border-t my-2"></div>
                    <Link href="/calculators" className="flex items-center justify-center gap-2 p-3 bg-[#1A3D7C] text-white rounded-lg hover:bg-[#1A3D7C]/90 transition-colors font-medium" onClick={() => setActiveDesktopDropdown(null)}>
                      View All Calculators
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 bg-white z-[9998] lg:hidden overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            {/* Tools Dropdown */}
            <div className="mb-4">
              <button
                onClick={() => toggleDropdown('tools')}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">Tools</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openDropdown === 'tools' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'tools' && (
                <div className="ml-4 mt-2 space-y-2">
                  <Link href="/tools" className="block p-2 text-gray-700 hover:bg-gray-50 rounded" onClick={() => setIsOpen(false)}>
                    All Tools
                  </Link>
                  <Link href="/tools/timer" className="block p-2 text-gray-700 hover:bg-gray-50 rounded" onClick={() => setIsOpen(false)}>
                    Study Timer
                  </Link>
                  <Link href="/tools/random-number-generator" className="block p-2 text-gray-700 hover:bg-gray-50 rounded" onClick={() => setIsOpen(false)}>
                    Random Number
                  </Link>
                  <Link href="/tools/password-generator" className="block p-2 text-gray-700 hover:bg-gray-50 rounded" onClick={() => setIsOpen(false)}>
                    Password Generator
                  </Link>
                </div>
              )}
            </div>

            {/* Calculators Dropdown */}
            <div className="mb-4">
              <button
                onClick={() => toggleDropdown('calculators')}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">Calculators</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openDropdown === 'calculators' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'calculators' && (
                <div className="ml-4 mt-2 space-y-2">
                  <Link href="/calculators" className="block p-2 text-gray-700 hover:bg-gray-50 rounded" onClick={() => setIsOpen(false)}>
                    All Calculators
                  </Link>
                  <Link href="/calculators/gpa-calculator" className="block p-2 text-gray-700 hover:bg-gray-50 rounded" onClick={() => setIsOpen(false)}>
                    GPA Calculator
                  </Link>
                  <Link href="/calculators/grade-calculator" className="block p-2 text-gray-700 hover:bg-gray-50 rounded" onClick={() => setIsOpen(false)}>
                    Grade Calculator
                  </Link>
                  <Link href="/calculators/percentage-calculator" className="block p-2 text-gray-700 hover:bg-gray-50 rounded" onClick={() => setIsOpen(false)}>
                    Percentage Calculator
                  </Link>
                </div>
              )}
            </div>

            <Link href="/roadmap" className="block p-3 rounded-lg hover:bg-gray-50 font-medium text-gray-900" onClick={() => setIsOpen(false)}>
              Roadmaps
            </Link>
            <Link href="/blog" className="block p-3 rounded-lg hover:bg-gray-50 font-medium text-gray-900" onClick={() => setIsOpen(false)}>
              Blog
            </Link>
            <Link href="/faq" className="block p-3 rounded-lg hover:bg-gray-50 font-medium text-gray-900" onClick={() => setIsOpen(false)}>
              FAQ
            </Link>
            <Link href="/about" className="block p-3 rounded-lg hover:bg-gray-50 font-medium text-gray-900" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="block p-3 rounded-lg hover:bg-gray-50 font-medium text-gray-900" onClick={() => setIsOpen(false)}>
              Contact
            </Link>

            <div className="mt-6">
              <Link href="/tools" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-[#2BAE66] text-white hover:bg-[#2BAE66]/90">
                  <Gamepad2 className="w-4 h-4 mr-2" />
                  Explore Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  )
}
