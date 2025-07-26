"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Target,
  Users,
  Atom,
  Zap,
  Eye,
  History,
  Calculator,
  Microscope,
} from "lucide-react"
import "bootstrap/dist/css/bootstrap.min.css"

export default function Chapter4Notes() {
  type AtomicModelKey = keyof typeof atomicModels
  const [selectedModel, setSelectedModel] = useState<AtomicModelKey>("thomson")
  const [selectedAtom, setSelectedAtom] = useState<keyof typeof atomExamples>("hydrogen")
  const [isAnimating, setIsAnimating] = useState(false)

  const atomicModels = {
    thomson: {
      name: "Thomson's Model",
      year: "1904",
      nickname: "Plum Pudding Model",
      description: "Positive sphere with embedded electrons",
      color: "bg-red-100",
      icon: "🍮",
    },
    rutherford: {
      name: "Rutherford's Model",
      year: "1911",
      nickname: "Nuclear Model",
      description: "Dense nucleus with orbiting electrons",
      color: "bg-blue-100",
      icon: "🌌",
    },
    bohr: {
      name: "Bohr's Model",
      year: "1913",
      nickname: "Planetary Model",
      description: "Electrons in fixed energy levels",
      color: "bg-green-100",
      icon: "🪐",
    },
  }

  const atomExamples = {
    hydrogen: { protons: 1, neutrons: 0, electrons: 1, symbol: "H", shells: [1] },
    helium: { protons: 2, neutrons: 2, electrons: 2, symbol: "He", shells: [2] },
    lithium: { protons: 3, neutrons: 4, electrons: 3, symbol: "Li", shells: [2, 1] },
    carbon: { protons: 6, neutrons: 6, electrons: 6, symbol: "C", shells: [2, 4] },
    oxygen: { protons: 8, neutrons: 8, electrons: 8, symbol: "O", shells: [2, 6] },
    sodium: { protons: 11, neutrons: 12, electrons: 11, symbol: "Na", shells: [2, 8, 1] },
  }

  return (
    <div className="container-fluid min-vh-100 bg-gray-50 px-0">
      {/* Header */}
      <header className="bg-white shadow-sm border-bottom">
        <div className="container px-4 py-4">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h1 className="h4 font-bold text-gray-900">Class 9 Science Notes</h1>
              <p className="text-gray-600">Chapter 4: Structure of the Atom</p>
            </div>
            <Badge variant="outline" className="text-sm">
              <BookOpen className="w-4 h-4 mr-1" />
              CBSE Curriculum
            </Badge>
          </div>
        </div>
      </header>

      <div className="container px-4 py-6">
        <div className="row g-6">
          {/* Main Content */}
          <div className="col-12 col-lg-9 space-y-6">
            {/* Teacher's Introduction */}
            <Card className="border-l-4 border-l-blue-600">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-800">
                  <Users className="w-5 h-5" />
                  <span>Journey to the Heart of Matter!</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-blue-50">
                <p className="text-blue-900 leading-relaxed">
                  <strong>Dear Atomic Explorers,</strong> Today we embark on one of science's greatest adventures -
                  peering inside the atom! In my 25+ years of teaching, I've watched students' amazement when they
                  realize that atoms are mostly empty space, yet everything we touch is made of them. We'll follow the
                  footsteps of brilliant scientists who used ingenious experiments to "see" the invisible. Get ready to
                  discover a world smaller than anything you can imagine, yet more fascinating than any science fiction!
                </p>
              </CardContent>
            </Card>

            {/* Learning Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span>Our Atomic Discovery Mission</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">By the end of this chapter, you will:</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Understand how scientists discovered electrons, protons, and neutrons</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Compare different atomic models and their significance</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Master electronic configuration and shell arrangement</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Understand isotopes and their real-world applications</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-2">🔬 Scientific Thinking</h4>
                    <p className="text-amber-700 text-sm">
                      Remember: Scientists couldn't actually "see" atoms, but they used clever experiments to understand
                      their structure. This is the beauty of scientific thinking - using evidence to understand the
                      invisible!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content Tabs */}
            <Tabs defaultValue="discovery" className="space-y-4">
              <TabsList className="w-full overflow-x-auto flex flex-nowrap gap-2">
                <TabsTrigger value="discovery">Particle Discovery</TabsTrigger>
                <TabsTrigger value="models">Atomic Models</TabsTrigger>
                <TabsTrigger value="structure">Atomic Structure</TabsTrigger>
                <TabsTrigger value="isotopes">Isotopes</TabsTrigger>
              </TabsList>

              <TabsContent value="discovery" className="space-y-6">
                {/* Discovery of Subatomic Particles */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Microscope className="w-6 h-6 text-purple-600" />
                      <span>Discovery of Subatomic Particles: The Great Detective Story</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Timeline Introduction */}
                    <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-3">🕰️ The Greatest Detective Story in Science</h4>
                      <p className="text-purple-700 leading-relaxed">
                        For over 2000 years, people believed atoms were indivisible (the word "atom" means "cannot be
                        cut"). But in the late 1800s, scientists began discovering that atoms have internal structure!
                        It was like finding out that what you thought was a solid marble actually contains an entire
                        universe inside. Let's follow this incredible journey of discovery!
                      </p>
                    </div>

                    {/* Discovery Timeline */}
                    <div className="space-y-6">
                      {/* Discovery of Electron */}
                      <div className="border-2 border-red-200 rounded-lg p-5 bg-red-50">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="text-3xl">⚡</div>
                          <div>
                            <h4 className="text-xl font-bold text-red-800">DISCOVERY OF ELECTRON (1897)</h4>
                            <p className="text-red-600">J.J. Thomson - The First Subatomic Particle</p>
                          </div>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="electron-experiment">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-800 font-bold">
                                  🧪
                                </div>
                                <span>The Cathode Ray Tube Experiment</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-red-200">
                                <h5 className="font-semibold text-red-800 mb-3">The Experimental Setup:</h5>

                                {/* Visual representation of cathode ray tube */}
                                <div className="bg-gray-100 p-4 rounded-lg mb-3">
                                  <div className="flex items-center justify-between">
                                    <div className="text-center">
                                      <div className="w-4 h-8 bg-red-500 rounded"></div>
                                      <p className="text-xs mt-1">Cathode (-)</p>
                                    </div>
                                    <div className="flex-1 mx-4">
                                      <div className="h-1 bg-yellow-400 rounded relative">
                                        <div className="absolute -top-1 left-1/4 w-2 h-3 bg-yellow-400 rounded animate-pulse"></div>
                                        <div className="absolute -top-1 left-2/4 w-2 h-3 bg-yellow-400 rounded animate-pulse"></div>
                                        <div className="absolute -top-1 left-3/4 w-2 h-3 bg-yellow-400 rounded animate-pulse"></div>
                                      </div>
                                      <p className="text-xs text-center mt-1">Cathode Rays</p>
                                    </div>
                                    <div className="text-center">
                                      <div className="w-4 h-8 bg-blue-500 rounded"></div>
                                      <p className="text-xs mt-1">Anode (+)</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2 text-red-700 text-sm">
                                  <p>
                                    <strong>Observation 1:</strong> Mysterious rays traveled from cathode to anode
                                  </p>
                                  <p>
                                    <strong>Observation 2:</strong> Rays were deflected by electric and magnetic fields
                                  </p>
                                  <p>
                                    <strong>Observation 3:</strong> Same rays produced regardless of cathode material
                                  </p>
                                </div>
                              </div>

                              <div className="bg-red-100 p-3 rounded">
                                <h5 className="font-semibold text-red-800">Thomson's Brilliant Conclusion:</h5>
                                <p className="text-red-700 text-sm">
                                  These rays were streams of negatively charged particles - the first subatomic
                                  particles! He called them "electrons" and proved they were part of all atoms.
                                </p>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="electron-properties">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-800 font-bold">
                                  📊
                                </div>
                                <span>Properties of Electrons</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-white p-3 rounded border border-red-200">
                                  <h5 className="font-semibold text-red-800">Charge</h5>
                                  <p className="text-red-700 text-sm">-1.6 × 10⁻¹⁹ C</p>
                                  <p className="text-red-600 text-xs">(Negative)</p>
                                </div>
                                <div className="bg-white p-3 rounded border border-red-200">
                                  <h5 className="font-semibold text-red-800">Mass</h5>
                                  <p className="text-red-700 text-sm">9.1 × 10⁻³¹ kg</p>
                                  <p className="text-red-600 text-xs">(Very light!)</p>
                                </div>
                                <div className="bg-white p-3 rounded border border-red-200">
                                  <h5 className="font-semibold text-red-800">Location</h5>
                                  <p className="text-red-700 text-sm">Outside nucleus</p>
                                  <p className="text-red-600 text-xs">(In shells/orbits)</p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* Discovery of Proton */}
                      <div className="border-2 border-blue-200 rounded-lg p-5 bg-blue-50">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="text-3xl">⚛️</div>
                          <div>
                            <h4 className="text-xl font-bold text-blue-800">DISCOVERY OF PROTON (1886-1919)</h4>
                            <p className="text-blue-600">Goldstein & Rutherford - The Positive Particle</p>
                          </div>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="proton-experiment">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                  🧪
                                </div>
                                <span>The Canal Ray Experiment</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-blue-200">
                                <h5 className="font-semibold text-blue-800 mb-3">Goldstein's Discovery:</h5>

                                {/* Visual representation of canal rays */}
                                <div className="bg-gray-100 p-4 rounded-lg mb-3">
                                  <div className="flex items-center justify-between">
                                    <div className="text-center">
                                      <div className="w-4 h-8 bg-blue-500 rounded"></div>
                                      <p className="text-xs mt-1">Anode (+)</p>
                                    </div>
                                    <div className="flex-1 mx-4">
                                      <div className="h-1 bg-green-400 rounded relative">
                                        <div className="absolute -top-1 right-1/4 w-2 h-3 bg-green-400 rounded animate-pulse"></div>
                                        <div className="absolute -top-1 right-2/4 w-2 h-3 bg-green-400 rounded animate-pulse"></div>
                                        <div className="absolute -top-1 right-3/4 w-2 h-3 bg-green-400 rounded animate-pulse"></div>
                                      </div>
                                      <p className="text-xs text-center mt-1">Canal Rays</p>
                                    </div>
                                    <div className="text-center">
                                      <div className="w-4 h-8 bg-red-500 rounded relative">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                          <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                      </div>
                                      <p className="text-xs mt-1">Perforated Cathode</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2 text-blue-700 text-sm">
                                  <p>
                                    <strong>Key Observation:</strong> Rays traveled in opposite direction to cathode
                                    rays
                                  </p>
                                  <p>
                                    <strong>Conclusion:</strong> These were positively charged particles
                                  </p>
                                  <p>
                                    <strong>Rutherford's Contribution:</strong> Named them "protons" (Greek for "first")
                                  </p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="proton-properties">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                  📊
                                </div>
                                <span>Properties of Protons</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-white p-3 rounded border border-blue-200">
                                  <h5 className="font-semibold text-blue-800">Charge</h5>
                                  <p className="text-blue-700 text-sm">+1.6 × 10⁻¹⁹ C</p>
                                  <p className="text-blue-600 text-xs">(Positive)</p>
                                </div>
                                <div className="bg-white p-3 rounded border border-blue-200">
                                  <h5 className="font-semibold text-blue-800">Mass</h5>
                                  <p className="text-blue-700 text-sm">1.67 × 10⁻²⁷ kg</p>
                                  <p className="text-blue-600 text-xs">(1836 times heavier than electron!)</p>
                                </div>
                                <div className="bg-white p-3 rounded border border-blue-200">
                                  <h5 className="font-semibold text-blue-800">Location</h5>
                                  <p className="text-blue-700 text-sm">In nucleus</p>
                                  <p className="text-blue-600 text-xs">(Center of atom)</p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* Discovery of Neutron */}
                      <div className="border-2 border-green-200 rounded-lg p-5 bg-green-50">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="text-3xl">⚪</div>
                          <div>
                            <h4 className="text-xl font-bold text-green-800">DISCOVERY OF NEUTRON (1932)</h4>
                            <p className="text-green-600">James Chadwick - The Neutral Particle</p>
                          </div>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="neutron-discovery">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">
                                  🎯
                                </div>
                                <span>The Missing Piece of the Puzzle</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-green-200">
                                <h5 className="font-semibold text-green-800 mb-3">The Problem:</h5>
                                <p className="text-green-700 text-sm mb-3">
                                  Scientists noticed that atomic mass was always greater than the mass of protons and
                                  electrons combined. Something was missing!
                                </p>

                                <h5 className="font-semibold text-green-800 mb-2">Chadwick's Experiment:</h5>
                                <div className="bg-green-50 p-3 rounded mb-3">
                                  <p className="text-green-700 text-sm">
                                    He bombarded beryllium with alpha particles and discovered mysterious radiation that
                                    had no charge but significant mass - neutrons!
                                  </p>
                                </div>

                                <div className="bg-green-100 p-3 rounded">
                                  <h5 className="font-semibold text-green-800">Why This Discovery Was Crucial:</h5>
                                  <ul className="text-green-700 text-sm mt-2 space-y-1">
                                    <li>• Explained the missing mass in atoms</li>
                                    <li>• Led to understanding of isotopes</li>
                                    <li>• Made nuclear reactions possible</li>
                                    <li>• Paved the way for nuclear energy</li>
                                  </ul>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="neutron-properties">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">
                                  📊
                                </div>
                                <span>Properties of Neutrons</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-white p-3 rounded border border-green-200">
                                  <h5 className="font-semibold text-green-800">Charge</h5>
                                  <p className="text-green-700 text-sm">0 (Zero)</p>
                                  <p className="text-green-600 text-xs">(Neutral)</p>
                                </div>
                                <div className="bg-white p-3 rounded border border-green-200">
                                  <h5 className="font-semibold text-green-800">Mass</h5>
                                  <p className="text-green-700 text-sm">1.67 × 10⁻²⁷ kg</p>
                                  <p className="text-green-600 text-xs">(Almost same as proton)</p>
                                </div>
                                <div className="bg-white p-3 rounded border border-green-200">
                                  <h5 className="font-semibold text-green-800">Location</h5>
                                  <p className="text-green-700 text-sm">In nucleus</p>
                                  <p className="text-green-600 text-xs">(With protons)</p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>

                    {/* Summary Table */}
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3">📋 Subatomic Particles Summary</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                          <thead>
                            <tr className="bg-indigo-600 text-white">
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Particle</th>
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Symbol</th>
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Charge</th>
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Mass (kg)</th>
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Location</th>
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Discoverer</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-red-50">
                              <td className="border border-gray-300 p-3 font-medium">Electron</td>
                              <td className="border border-gray-300 p-3">e⁻</td>
                              <td className="border border-gray-300 p-3">-1</td>
                              <td className="border border-gray-300 p-3">9.1 × 10⁻³¹</td>
                              <td className="border border-gray-300 p-3">Outside nucleus</td>
                              <td className="border border-gray-300 p-3">J.J. Thomson (1897)</td>
                            </tr>
                            <tr className="bg-blue-50">
                              <td className="border border-gray-300 p-3 font-medium">Proton</td>
                              <td className="border border-gray-300 p-3">p⁺</td>
                              <td className="border border-gray-300 p-3">+1</td>
                              <td className="border border-gray-300 p-3">1.67 × 10⁻²⁷</td>
                              <td className="border border-gray-300 p-3">In nucleus</td>
                              <td className="border border-gray-300 p-3">Rutherford (1919)</td>
                            </tr>
                            <tr className="bg-green-50">
                              <td className="border border-gray-300 p-3 font-medium">Neutron</td>
                              <td className="border border-gray-300 p-3">n⁰</td>
                              <td className="border border-gray-300 p-3">0</td>
                              <td className="border border-gray-300 p-3">1.67 × 10⁻²⁷</td>
                              <td className="border border-gray-300 p-3">In nucleus</td>
                              <td className="border border-gray-300 p-3">Chadwick (1932)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="models" className="space-y-6">
                {/* Atomic Models */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <History className="w-6 h-6 text-indigo-600" />
                      <span>Evolution of Atomic Models: From Pudding to Planets</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Model Selection */}
                    <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-200">
                      <h4 className="font-semibold text-indigo-800 mb-3">🎭 The Changing Face of the Atom</h4>
                      <p className="text-indigo-700 leading-relaxed mb-4">
                        As scientists discovered new evidence, their models of the atom evolved dramatically. Each model
                        was a stepping stone to better understanding. Let's explore how our picture of the atom changed
                        from a simple sphere to the complex structure we know today!
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {Object.entries(atomicModels).map(([key, model]) => (
                          <Button
                            key={key}
                            variant={selectedModel === key ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedModel(key as AtomicModelKey)}
                            className="flex items-center space-x-2"
                          >
                            <span>{model.icon}</span>
                            <span>{model.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Selected Model Display */}
                    <div
                      className={`border-2 rounded-lg p-5 ${
                        selectedModel === "thomson"
                          ? "border-red-200 bg-red-50"
                          : selectedModel === "rutherford"
                            ? "border-blue-200 bg-blue-50"
                            : "border-green-200 bg-green-50"
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="text-4xl">{atomicModels[selectedModel].icon}</div>
                        <div>
                          <h4
                            className={`text-xl font-bold ${
                              selectedModel === "thomson"
                                ? "text-red-800"
                                : selectedModel === "rutherford"
                                  ? "text-blue-800"
                                  : "text-green-800"
                            }`}
                          >
                            {atomicModels[selectedModel].name}{" "}({atomicModels[selectedModel].year})
                          </h4>
                          <p
                            className={`${
                              selectedModel === "thomson"
                                ? "text-red-600"
                                : selectedModel === "rutherford"
                                  ? "text-blue-600"
                                  : "text-green-600"
                            }`}
                          >
                            {atomicModels[selectedModel].nickname}
                          </p>
                        </div>
                      </div>

                      {/* Thomson's Model */}
                      {selectedModel === "thomson" && (
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg border border-red-200">
                            <h5 className="font-semibold text-red-800 mb-3">The "Plum Pudding" Model</h5>

                            {/* Visual representation */}
                            <div className="flex justify-center mb-4">
                              <div className="w-32 h-32 bg-red-200 rounded-full relative border-4 border-red-300">
                                <div className="absolute top-4 left-6 w-3 h-3 bg-blue-600 rounded-full"></div>
                                <div className="absolute top-8 right-8 w-3 h-3 bg-blue-600 rounded-full"></div>
                                <div className="absolute bottom-6 left-8 w-3 h-3 bg-blue-600 rounded-full"></div>
                                <div className="absolute bottom-8 right-6 w-3 h-3 bg-blue-600 rounded-full"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-red-800 text-xs font-bold">+</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="bg-red-100 p-3 rounded">
                                <h6 className="font-semibold text-red-800">Key Features:</h6>
                                <ul className="text-red-700 text-sm mt-1 space-y-1">
                                  <li>• Atom is a uniform sphere of positive charge</li>
                                  <li>• Electrons embedded like raisins in pudding</li>
                                  <li>• Overall atom is electrically neutral</li>
                                  <li>• No empty space in the atom</li>
                                </ul>
                              </div>

                              <div className="bg-red-100 p-3 rounded">
                                <h6 className="font-semibold text-red-800">Why It Failed:</h6>
                                <p className="text-red-700 text-sm">
                                  Rutherford's gold foil experiment showed that most of the atom is empty space,
                                  contradicting Thomson's model.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Rutherford's Model */}
                      {selectedModel === "rutherford" && (
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg border border-blue-200">
                            <h5 className="font-semibold text-blue-800 mb-3">The Nuclear Model</h5>

                            {/* Visual representation */}
                            <div className="flex justify-center mb-4">
                              <div className="w-32 h-32 relative">
                                {/* Nucleus */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full"></div>
                                {/* Electrons */}
                                <div className="absolute top-2 left-8 w-2 h-2 bg-blue-600 rounded-full"></div>
                                <div className="absolute top-8 right-2 w-2 h-2 bg-blue-600 rounded-full"></div>
                                <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-600 rounded-full"></div>
                                <div className="absolute bottom-2 right-8 w-2 h-2 bg-blue-600 rounded-full"></div>
                                {/* Orbital paths */}
                                <div className="absolute inset-4 border border-dashed border-blue-400 rounded-full"></div>
                                <div className="absolute inset-8 border border-dashed border-blue-400 rounded-full"></div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="bg-blue-100 p-3 rounded">
                                <h6 className="font-semibold text-blue-800">
                                  Revolutionary Discovery - Gold Foil Experiment:
                                </h6>
                                <ul className="text-blue-700 text-sm mt-1 space-y-1">
                                  <li>• Most alpha particles passed straight through</li>
                                  <li>• Some were deflected at large angles</li>
                                  <li>• Very few bounced back completely</li>
                                </ul>
                              </div>

                              <div className="bg-blue-100 p-3 rounded">
                                <h6 className="font-semibold text-blue-800">Key Features:</h6>
                                <ul className="text-blue-700 text-sm mt-1 space-y-1">
                                  <li>• Dense, positively charged nucleus at center</li>
                                  <li>• Electrons revolve around nucleus</li>
                                  <li>• Most of atom is empty space</li>
                                  <li>• Size of nucleus {"<<"} size of atom</li>
                                </ul>
                              </div>

                              <div className="bg-blue-100 p-3 rounded">
                                <h6 className="font-semibold text-blue-800">Problem:</h6>
                                <p className="text-blue-700 text-sm">
                                  According to classical physics, revolving electrons should lose energy and spiral into
                                  the nucleus, making atoms unstable.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Bohr's Model */}
                      {selectedModel === "bohr" && (
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg border border-green-200">
                            <h5 className="font-semibold text-green-800 mb-3">The Planetary Model</h5>

                            {/* Visual representation */}
                            <div className="flex justify-center mb-4">
                              <div className="w-40 h-40 relative">
                                {/* Nucleus */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full">
                                  <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                                    +
                                  </div>
                                </div>
                                {/* Energy levels */}
                                <div className="absolute inset-6 border-2 border-green-400 rounded-full opacity-60"></div>
                                <div className="absolute inset-4 border-2 border-green-500 rounded-full opacity-60"></div>
                                <div className="absolute inset-2 border-2 border-green-600 rounded-full opacity-60"></div>
                                {/* Electrons */}
                                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                                <div className="absolute top-3 right-3 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                                <div className="absolute bottom-5 left-5 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                                {/* Labels */}
                                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs text-green-700">
                                  n=3
                                </div>
                                <div className="absolute top-2 -right-4 text-xs text-green-700">n=2</div>
                                <div className="absolute bottom-4 -left-4 text-xs text-green-700">n=1</div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="bg-green-100 p-3 rounded">
                                <h6 className="font-semibold text-green-800">Bohr's Postulates:</h6>
                                <ul className="text-green-700 text-sm mt-1 space-y-1">
                                  <li>• Electrons revolve in fixed circular orbits (energy levels)</li>
                                  <li>• Each orbit has definite energy (quantized energy levels)</li>
                                  <li>• Electrons don't radiate energy while in these orbits</li>
                                  <li>• Energy is absorbed/emitted only when electrons jump between orbits</li>
                                </ul>
                              </div>

                              <div className="bg-green-100 p-3 rounded">
                                <h6 className="font-semibold text-green-800">Energy Level Formula:</h6>
                                <p className="text-green-700 text-sm font-mono">
                                  Maximum electrons in shell = 2n²
                                  <br />
                                  (where n = shell number)
                                </p>
                              </div>

                              <div className="bg-green-100 p-3 rounded">
                                <h6 className="font-semibold text-green-800">Success:</h6>
                                <p className="text-green-700 text-sm">
                                  Successfully explained the stability of atoms and the hydrogen spectrum. This model is
                                  still used for basic understanding!
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Model Comparison */}
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3">📊 Model Comparison</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                          <thead>
                            <tr className="bg-indigo-600 text-white">
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Aspect</th>
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Thomson</th>
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Rutherford</th>
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Bohr</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 p-3 font-medium">Nucleus</td>
                              <td className="border border-gray-300 p-3">No nucleus</td>
                              <td className="border border-gray-300 p-3">Dense, positive nucleus</td>
                              <td className="border border-gray-300 p-3">Dense, positive nucleus</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-3 font-medium">Electron Position</td>
                              <td className="border border-gray-300 p-3">Embedded in positive sphere</td>
                              <td className="border border-gray-300 p-3">Revolving around nucleus</td>
                              <td className="border border-gray-300 p-3">In fixed energy levels</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 p-3 font-medium">Empty Space</td>
                              <td className="border border-gray-300 p-3">No empty space</td>
                              <td className="border border-gray-300 p-3">Mostly empty space</td>
                              <td className="border border-gray-300 p-3">Mostly empty space</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-3 font-medium">Stability</td>
                              <td className="border border-gray-300 p-3">Stable</td>
                              <td className="border border-gray-300 p-3">Unstable (electrons should spiral in)</td>
                              <td className="border border-gray-300 p-3">Stable (quantized energy levels)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="structure" className="space-y-6">
                {/* Atomic Structure and Electronic Configuration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Atom className="w-6 h-6 text-teal-600" />
                      <span>Atomic Structure and Electronic Configuration</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Interactive Atom Selector */}
                    <div className="bg-teal-50 p-5 rounded-lg border border-teal-200">
                      <h4 className="font-semibold text-teal-800 mb-3">🔬 Interactive Atomic Structure Explorer</h4>
                      <p className="text-teal-700 mb-4">
                        Select different atoms to see how electrons are arranged in shells. Notice the patterns!
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {Object.entries(atomExamples).map(([key, atom]) => (
                          <Button
                            key={key}
                            variant={selectedAtom === key ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedAtom(key as keyof typeof atomExamples)}
                            className="flex items-center space-x-2"
                          >
                            <span>{atom.symbol}</span>
                            <span className="capitalize">{key}</span>
                          </Button>
                        ))}
                      </div>

                      {/* Selected Atom Display */}
                      <div className="bg-white p-4 rounded-lg border border-teal-200">
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Atomic Structure Diagram */}
                          <div className="text-center">
                            <h5 className="font-semibold text-teal-800 mb-3">
                              {atomExamples[selectedAtom].symbol} -{" "}
                              {selectedAtom.charAt(0).toUpperCase() + selectedAtom.slice(1)}
                            </h5>

                            {/* Visual atom representation */}
                            <div className="relative w-48 h-48 mx-auto">
                              {/* Nucleus */}
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {atomExamples[selectedAtom].protons}p⁺
                                <br />
                                {atomExamples[selectedAtom].neutrons}n⁰
                              </div>

                              {/* Electron shells */}
                              {atomExamples[selectedAtom].shells.map((electronCount, shellIndex) => {
                                const radius = 40 + shellIndex * 30
                                return (
                                  <div key={shellIndex}>
                                    {/* Shell circle */}
                                    <div
                                      className="absolute border-2 border-teal-400 rounded-full opacity-60"
                                      style={{
                                        width: `${radius * 2}px`,
                                        height: `${radius * 2}px`,
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                      }}
                                    ></div>

                                    {/* Electrons in this shell */}
                                    {Array.from({ length: electronCount }, (_, electronIndex) => {
                                      const angle = (electronIndex * 360) / electronCount
                                      const x = Math.cos((angle * Math.PI) / 180) * radius
                                      const y = Math.sin((angle * Math.PI) / 180) * radius
                                      return (
                                        <div
                                          key={electronIndex}
                                          className="absolute w-3 h-3 bg-blue-600 rounded-full"
                                          style={{
                                            left: `calc(50% + ${x}px - 6px)`,
                                            top: `calc(50% + ${y}px - 6px)`,
                                          }}
                                        ></div>
                                      )
                                    })}

                                    {/* Shell label */}
                                    <div
                                      className="absolute text-xs text-teal-700 font-semibold"
                                      style={{
                                        left: `calc(50% + ${radius + 10}px)`,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                      }}
                                    >
                                      {["K", "L", "M", "N"][shellIndex]} ({electronCount}e⁻)
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>

                          {/* Atomic Information */}
                          <div className="space-y-4">
                            <div className="bg-teal-100 p-3 rounded">
                              <h6 className="font-semibold text-teal-800">Atomic Information</h6>
                              <div className="text-teal-700 text-sm mt-2 space-y-1">
                                <p>
                                  <strong>Symbol:</strong> {atomExamples[selectedAtom].symbol}
                                </p>
                                <p>
                                  <strong>Atomic Number:</strong> {atomExamples[selectedAtom].protons}
                                </p>
                                <p>
                                  <strong>Mass Number:</strong>{" "}
                                  {atomExamples[selectedAtom].protons + atomExamples[selectedAtom].neutrons}
                                </p>
                              </div>
                            </div>

                            <div className="bg-teal-100 p-3 rounded">
                              <h6 className="font-semibold text-teal-800">Subatomic Particles</h6>
                              <div className="text-teal-700 text-sm mt-2 space-y-1">
                                <p>
                                  <strong>Protons:</strong> {atomExamples[selectedAtom].protons}
                                </p>
                                <p>
                                  <strong>Neutrons:</strong> {atomExamples[selectedAtom].neutrons}
                                </p>
                                <p>
                                  <strong>Electrons:</strong> {atomExamples[selectedAtom].electrons}
                                </p>
                              </div>
                            </div>

                            <div className="bg-teal-100 p-3 rounded">
                              <h6 className="font-semibold text-teal-800">Electronic Configuration</h6>
                              <div className="text-teal-700 text-sm mt-2">
                                <p>
                                  <strong>Shell arrangement:</strong> {atomExamples[selectedAtom].shells.join(", ")}
                                </p>
                                <p>
                                  <strong>Valency:</strong>{" "}
                                  {atomExamples[selectedAtom].shells[atomExamples[selectedAtom].shells.length - 1] <= 4
                                    ? atomExamples[selectedAtom].shells[atomExamples[selectedAtom].shells.length - 1]
                                    : 8 -
                                      atomExamples[selectedAtom].shells[atomExamples[selectedAtom].shells.length - 1]}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Electronic Configuration Rules */}
                    <div className="border-2 border-purple-200 rounded-lg p-5 bg-purple-50">
                      <h4 className="font-bold text-purple-800 text-lg mb-3 flex items-center space-x-2">
                        <Calculator className="w-6 h-6" />
                        <span>Rules for Electronic Configuration</span>
                      </h4>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="shell-capacity">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-800 font-bold">
                                1
                              </div>
                              <span>Maximum Electrons in Each Shell (2n² Rule)</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-purple-200">
                              <h5 className="font-semibold text-purple-800 mb-3">The 2n² Formula:</h5>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <div className="bg-purple-100 p-2 rounded">
                                    <p className="text-purple-800 text-sm">
                                      <strong>K shell (n=1):</strong> 2(1)² = 2 electrons
                                    </p>
                                  </div>
                                  <div className="bg-purple-100 p-2 rounded">
                                    <p className="text-purple-800 text-sm">
                                      <strong>L shell (n=2):</strong> 2(2)² = 8 electrons
                                    </p>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="bg-purple-100 p-2 rounded">
                                    <p className="text-purple-800 text-sm">
                                      <strong>M shell (n=3):</strong> 2(3)² = 18 electrons
                                    </p>
                                  </div>
                                  <div className="bg-purple-100 p-2 rounded">
                                    <p className="text-purple-800 text-sm">
                                      <strong>N shell (n=4):</strong> 2(4)² = 32 electrons
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="filling-order">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-800 font-bold">
                                2
                              </div>
                              <span>Order of Filling Electrons</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-purple-200">
                              <h5 className="font-semibold text-purple-800 mb-3">Filling Rules:</h5>
                              <ol className="text-purple-700 text-sm space-y-2">
                                <li>
                                  <strong>1. Fill innermost shell first</strong> - Start with K shell, then L, then M,
                                  etc.
                                </li>
                                <li>
                                  <strong>2. Outermost shell maximum</strong> - Can't have more than 8 electrons in
                                  outermost shell
                                </li>
                                <li>
                                  <strong>3. Penultimate shell maximum</strong> - Can't have more than 18 electrons in
                                  second-last shell
                                </li>
                              </ol>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="valency-determination">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-800 font-bold">
                                3
                              </div>
                              <span>Determining Valency from Electronic Configuration</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-purple-200">
                              <h5 className="font-semibold text-purple-800 mb-3">Valency Rules:</h5>
                              <div className="space-y-3">
                                <div className="bg-purple-100 p-3 rounded">
                                  <p className="text-purple-800 text-sm">
                                    <strong>If outermost shell has {"≤"}4 electrons:</strong> Valency = Number of
                                    electrons in outermost shell
                                  </p>
                                  <p className="text-purple-700 text-xs mt-1">Example: Carbon (2,4) → Valency = 4</p>
                                </div>
                                <div className="bg-purple-100 p-3 rounded">
                                  <p className="text-purple-800 text-sm">
                                    <strong>If outermost shell has {">"}4 electrons:</strong> Valency = 8 - Number of
                                    electrons in outermost shell
                                  </p>
                                  <p className="text-purple-700 text-xs mt-1">
                                    Example: Oxygen (2,6) → Valency = 8-6 = 2
                                  </p>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    {/* Practice Examples */}
                    <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                      <h4 className="font-semibold text-yellow-800 mb-3 flex items-center space-x-2">
                        <Lightbulb className="w-5 h-5" />
                        <span>Practice Electronic Configurations</span>
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded border border-yellow-200">
                          <h5 className="font-semibold text-yellow-800">First 10 Elements</h5>
                          <div className="text-yellow-700 text-sm mt-2 space-y-1">
                            <p>H (1): 1</p>
                            <p>He (2): 2</p>
                            <p>Li (3): 2, 1</p>
                            <p>Be (4): 2, 2</p>
                            <p>B (5): 2, 3</p>
                            <p>C (6): 2, 4</p>
                            <p>N (7): 2, 5</p>
                            <p>O (8): 2, 6</p>
                            <p>F (9): 2, 7</p>
                            <p>Ne (10): 2, 8</p>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded border border-yellow-200">
                          <h5 className="font-semibold text-yellow-800">Their Valencies</h5>
                          <div className="text-yellow-700 text-sm mt-2 space-y-1">
                            <p>H: 1</p>
                            <p>He: 0 (stable)</p>
                            <p>Li: 1</p>
                            <p>Be: 2</p>
                            <p>B: 3</p>
                            <p>C: 4</p>
                            <p>N: 3 (8-5)</p>
                            <p>O: 2 (8-6)</p>
                            <p>F: 1 (8-7)</p>
                            <p>Ne: 0 (stable)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="isotopes" className="space-y-6">
                {/* Isotopes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="w-6 h-6 text-orange-600" />
                      <span>Isotopes: Same Element, Different Mass</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Introduction to Isotopes */}
                    <div className="bg-orange-50 p-5 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-800 mb-3">🧬 The Twin Mystery</h4>
                      <p className="text-orange-700 leading-relaxed">
                        Imagine identical twins who look exactly the same but have different weights. That's what
                        isotopes are like! They're atoms of the same element (same number of protons) but with different
                        masses (different numbers of neutrons). This discovery revolutionized our understanding of
                        atomic structure and led to incredible applications from carbon dating to nuclear medicine!
                      </p>
                    </div>

                    {/* What are Isotopes */}
                    <div className="border-2 border-blue-200 rounded-lg p-5 bg-blue-50">
                      <h4 className="font-bold text-blue-800 text-lg mb-3 flex items-center space-x-2">
                        <Atom className="w-6 h-6" />
                        <span>Understanding Isotopes</span>
                      </h4>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <p className="text-lg font-semibold text-blue-900 mb-2">
                          Isotopes are atoms of the same element having the same atomic number but different mass
                          numbers.
                        </p>
                        <div className="bg-blue-100 p-3 rounded mt-3">
                          <p className="text-blue-800 text-sm">
                            <strong>Key Point:</strong> Same protons (same element) + Different neutrons (different
                            mass) = Isotopes
                          </p>
                        </div>
                      </div>

                      {/* Isotope Examples */}
                      <div className="space-y-4">
                        <h5 className="font-semibold text-blue-800">Common Isotope Examples:</h5>

                        {/* Hydrogen Isotopes */}
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <h6 className="font-semibold text-blue-800 mb-3">Hydrogen Isotopes</h6>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-3 rounded text-center">
                              <div className="text-2xl mb-2">¹H</div>
                              <h6 className="font-semibold text-blue-800">Protium</h6>
                              <p className="text-blue-700 text-sm">1 proton, 0 neutrons</p>
                              <p className="text-blue-600 text-xs">99.98% abundance</p>
                            </div>
                            <div className="bg-blue-50 p-3 rounded text-center">
                              <div className="text-2xl mb-2">²H</div>
                              <h6 className="font-semibold text-blue-800">Deuterium</h6>
                              <p className="text-blue-700 text-sm">1 proton, 1 neutron</p>
                              <p className="text-blue-600 text-xs">0.02% abundance</p>
                            </div>
                            <div className="bg-blue-50 p-3 rounded text-center">
                              <div className="text-2xl mb-2">³H</div>
                              <h6 className="font-semibold text-blue-800">Tritium</h6>
                              <p className="text-blue-700 text-sm">1 proton, 2 neutrons</p>
                              <p className="text-blue-600 text-xs">Radioactive, rare</p>
                            </div>
                          </div>
                        </div>

                        {/* Carbon Isotopes */}
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <h6 className="font-semibold text-blue-800 mb-3">Carbon Isotopes</h6>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-3 rounded text-center">
                              <div className="text-2xl mb-2">¹²C</div>
                              <h6 className="font-semibold text-blue-800">Carbon-12</h6>
                              <p className="text-blue-700 text-sm">6 protons, 6 neutrons</p>
                              <p className="text-blue-600 text-xs">98.9% abundance</p>
                            </div>
                            <div className="bg-blue-50 p-3 rounded text-center">
                              <div className="text-2xl mb-2">¹³C</div>
                              <h6 className="font-semibold text-blue-800">Carbon-13</h6>
                              <p className="text-blue-700 text-sm">6 protons, 7 neutrons</p>
                              <p className="text-blue-600 text-xs">1.1% abundance</p>
                            </div>
                            <div className="bg-blue-50 p-3 rounded text-center">
                              <div className="text-2xl mb-2">¹⁴C</div>
                              <h6 className="font-semibold text-blue-800">Carbon-14</h6>
                              <p className="text-blue-700 text-sm">6 protons, 8 neutrons</p>
                              <p className="text-blue-600 text-xs">Radioactive, for dating</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Atomic Number and Mass Number */}
                    <div className="border-2 border-green-200 rounded-lg p-5 bg-green-50">
                      <h4 className="font-bold text-green-800 text-lg mb-3 flex items-center space-x-2">
                        <Calculator className="w-6 h-6" />
                        <span>Atomic Number vs Mass Number</span>
                      </h4>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <h5 className="font-semibold text-green-800 mb-3">Atomic Number (Z)</h5>
                          <div className="space-y-2">
                            <p className="text-green-700 text-sm">
                              <strong>Definition:</strong> Number of protons in the nucleus
                            </p>
                            <p className="text-green-700 text-sm">
                              <strong>Significance:</strong> Determines the element's identity
                            </p>
                            <p className="text-green-700 text-sm">
                              <strong>Example:</strong> All carbon atoms have Z = 6
                            </p>
                            <div className="bg-green-100 p-2 rounded">
                              <p className="text-green-800 text-xs font-semibold">
                                Z = Number of protons = Number of electrons (in neutral atom)
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <h5 className="font-semibold text-green-800 mb-3">Mass Number (A)</h5>
                          <div className="space-y-2">
                            <p className="text-green-700 text-sm">
                              <strong>Definition:</strong> Total number of protons and neutrons
                            </p>
                            <p className="text-green-700 text-sm">
                              <strong>Significance:</strong> Determines the atom's mass
                            </p>
                            <p className="text-green-700 text-sm">
                              <strong>Example:</strong> Carbon-12 has A = 12
                            </p>
                            <div className="bg-green-100 p-2 rounded">
                              <p className="text-green-800 text-xs font-semibold">
                                A = Number of protons + Number of neutrons
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Notation */}
                      <div className="mt-4 bg-white p-4 rounded-lg border border-green-200">
                        <h5 className="font-semibold text-green-800 mb-3">Isotope Notation</h5>
                        <div className="flex justify-center mb-4">
                          <div className="text-center">
                            <div className="text-4xl font-mono text-green-800 mb-2">
                              <sup>A</sup>X<sub>Z</sub>
                            </div>
                            <div className="text-green-700 text-sm space-y-1">
                              <p>A = Mass number (top left)</p>
                              <p>X = Element symbol</p>
                              <p>Z = Atomic number (bottom left)</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-green-100 p-3 rounded">
                          <p className="text-green-800 text-sm text-center">
                            <strong>Example:</strong> <sup>14</sup>C<sub>6</sub> represents Carbon-14 with mass number
                            14 and atomic number 6
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Applications of Isotopes */}
                    <div className="border-2 border-purple-200 rounded-lg p-5 bg-purple-50">
                      <h4 className="font-bold text-purple-800 text-lg mb-3 flex items-center space-x-2">
                        <Eye className="w-6 h-6" />
                        <span>Amazing Applications of Isotopes</span>
                      </h4>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="carbon-dating">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-800 font-bold">
                                🏺
                              </div>
                              <span>Carbon-14 Dating: Unlocking History</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-purple-200">
                              <h5 className="font-semibold text-purple-800 mb-2">How It Works:</h5>
                              <ul className="text-purple-700 text-sm space-y-2">
                                <li>• Living organisms contain both C-12 and C-14</li>
                                <li>• When they die, C-14 starts decaying (half-life: 5,730 years)</li>
                                <li>• By measuring C-14/C-12 ratio, we can determine age</li>
                                <li>• Useful for dating objects up to 50,000 years old</li>
                              </ul>
                              <div className="bg-purple-100 p-3 rounded mt-3">
                                <p className="text-purple-800 text-sm">
                                  <strong>Famous Example:</strong> Used to date the Shroud of Turin, ancient
                                  manuscripts, and archaeological artifacts!
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="medical-isotopes">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-800 font-bold">
                                🏥
                              </div>
                              <span>Medical Applications: Saving Lives</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-purple-200">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <h5 className="font-semibold text-purple-800">Diagnosis</h5>
                                  <ul className="text-purple-700 text-sm space-y-1">
                                    <li>• Iodine-131: Thyroid imaging</li>
                                    <li>• Technetium-99m: Heart scans</li>
                                    <li>• Fluorine-18: PET scans</li>
                                    <li>• Thallium-201: Heart function</li>
                                  </ul>
                                </div>
                                <div className="space-y-3">
                                  <h5 className="font-semibold text-purple-800">Treatment</h5>
                                  <ul className="text-purple-700 text-sm space-y-1">
                                    <li>• Cobalt-60: Cancer radiation therapy</li>
                                    <li>• Iodine-131: Thyroid cancer treatment</li>
                                    <li>• Phosphorus-32: Blood disorders</li>
                                    <li>• Yttrium-90: Liver cancer</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="nuclear-energy">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-800 font-bold">
                                ⚡
                              </div>
                              <span>Nuclear Energy: Powering the Future</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-purple-200">
                              <h5 className="font-semibold text-purple-800 mb-2">Nuclear Power:</h5>
                              <ul className="text-purple-700 text-sm space-y-2">
                                <li>• Uranium-235: Nuclear fission in power plants</li>
                                <li>• Plutonium-239: Nuclear fuel and weapons</li>
                                <li>• Deuterium & Tritium: Nuclear fusion research</li>
                              </ul>
                              <div className="bg-purple-100 p-3 rounded mt-3">
                                <p className="text-purple-800 text-sm">
                                  <strong>Amazing Fact:</strong> 1 kg of Uranium-235 can produce as much energy as 3
                                  million kg of coal!
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="agriculture">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-800 font-bold">
                                🌾
                              </div>
                              <span>Agriculture: Growing Better Food</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-purple-200">
                              <h5 className="font-semibold text-purple-800 mb-2">Agricultural Applications:</h5>
                              <ul className="text-purple-700 text-sm space-y-2">
                                <li>• Plant breeding: Creating new crop varieties</li>
                                <li>• Pest control: Sterilizing harmful insects</li>
                                <li>• Food preservation: Extending shelf life</li>
                                <li>• Soil studies: Understanding nutrient uptake</li>
                              </ul>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    {/* Common Student Misconceptions */}
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <AlertDescription>
                        <strong className="text-red-800">Common Student Mistakes:</strong>
                        <ul className="text-red-700 mt-1 space-y-1">
                          <li>• Thinking isotopes are different elements (they're the same element!)</li>
                          <li>• Confusing atomic number with mass number</li>
                          <li>• Believing all isotopes are radioactive (many are stable)</li>
                          <li>• Forgetting that chemical properties remain the same for isotopes</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Assessment Section */}
            <Card className="border-l-4 border-l-green-600">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  <span>Test Your Atomic Knowledge</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">🧪 Challenge Problems</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800">
                          1. An atom has 17 protons, 18 neutrons, and 17 electrons. What is its atomic number, mass
                          number, and electronic configuration?
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>Hint: Atomic number = protons, Mass number = protons + neutrons</em>
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800">
                          2. Explain why Rutherford's gold foil experiment disproved Thomson's model.
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>Hint: Think about what the experiment revealed about atomic structure</em>
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800">
                          3. Carbon-12 and Carbon-14 are isotopes. Explain why they have the same chemical properties
                          but different physical properties.
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>Hint: Consider what determines chemical vs physical properties</em>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="col-12 col-lg-3 space-y-4">
            {/* Study Tips */}
            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  <span>Master's Secrets</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-yellow-50 p-3 rounded">
                  <h4 className="font-semibold text-yellow-800 text-sm">Model Memory</h4>
                  <p className="text-yellow-700 text-xs">
                    "Tom's Pudding, Ruth's Nucleus, Bohr's Orbits" - Remember the evolution!
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <h4 className="font-semibold text-blue-800 text-sm">Electronic Config</h4>
                  <p className="text-blue-700 text-xs">
                    Always fill K shell first (max 2), then L shell (max 8), then M shell
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <h4 className="font-semibold text-green-800 text-sm">Isotope Trick</h4>
                  <p className="text-green-700 text-xs">
                    Same protons = same element, different neutrons = different mass
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Reference */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📋 Key Formulas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="bg-gray-100 p-2 rounded">
                    <p className="font-medium">Max electrons in shell:</p>
                    <p className="font-mono">2n²</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <p className="font-medium">Mass number:</p>
                    <p className="font-mono">A = p⁺ + n⁰</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <p className="font-medium">Atomic number:</p>
                    <p className="font-mono">Z = p⁺ = e⁻</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <p className="font-medium">Neutrons:</p>
                    <p className="font-mono">n⁰ = A - Z</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">⏰ Discovery Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Electron:</span>
                    <span>1897 (Thomson)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Nucleus:</span>
                    <span>1911 (Rutherford)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Proton:</span>
                    <span>1919 (Rutherford)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Neutron:</span>
                    <span>1932 (Chadwick)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Chapter Preview */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-lg">🔮 Coming Next</CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-purple-800 mb-2">Chapter 5: The Fundamental Unit of Life</h4>
                <p className="text-purple-700 text-sm mb-3">
                  We'll explore the cell - the basic unit of all living things!
                </p>
                <p className="text-xs text-purple-600">
                  <strong>Preview:</strong> How are plant and animal cells different? What makes a cell alive?
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
