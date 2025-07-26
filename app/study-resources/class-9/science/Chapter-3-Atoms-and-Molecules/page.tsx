"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import "bootstrap/dist/css/bootstrap.min.css"
import {
  BookOpen,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Target,
  Users,
  Atom,
  Calculator,
  Scale,
  Zap,
  Building,
} from "lucide-react"

export default function Chapter3Notes() {
  const [selectedAtom, setSelectedAtom] = useState("hydrogen")

  const atomExamples = {
    hydrogen: { symbol: "H", mass: "1", electrons: 1, color: "bg-red-100" },
    carbon: { symbol: "C", mass: "12", electrons: 6, color: "bg-gray-100" },
    oxygen: { symbol: "O", mass: "16", electrons: 8, color: "bg-blue-100" },
    sodium: { symbol: "Na", mass: "23", electrons: 11, color: "bg-yellow-100" },
  }

  const telegramLink = "https://t.me/thetutorbridge";

  function AskDoubtFloater() {
    return (
      <a
        href={telegramLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2
          sm:bottom-6 sm:right-6 sm:px-4 sm:py-3
          bottom-3 right-3 px-3 py-2 text-sm"
        style={{ maxWidth: '90vw' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-6 sm:h-6 w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 3.75l-9.568 16.456a.75.75 0 01-1.364-.03l-2.6-6.5a.75.75 0 01.41-.97l12.122-5.05a.75.75 0 01.99.094z" />
        </svg>
        <span className="hidden sm:inline">Ask Doubt</span>
        <span className="inline sm:hidden">Ask</span>
      </a>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Class 9 Science Notes</h1>
              <p className="text-gray-600">Chapter 3: Atoms and Molecules</p>
            </div>
            <Badge variant="outline" className="text-sm">
              <BookOpen className="w-4 h-4 mr-1" />
              CBSE Curriculum
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Teacher's Introduction */}
            <Card className="border-l-4 border-l-blue-600">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-800">
                  <Users className="w-5 h-5" />
                  <span>Welcome to the Atomic World!</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-blue-50">
                <p className="text-blue-900 leading-relaxed">
                  <strong>Dear Future Chemists,</strong> Today we embark on the most exciting journey in science -
                  exploring the invisible building blocks of everything around us! In my 25+ years of teaching, I've
                  seen students' eyes light up when they realize that the same atoms in their pencil are also in distant
                  stars. We'll discover the fundamental laws that govern all chemical reactions and learn the "language"
                  of chemistry. Get ready to think like atoms and molecules!
                </p>
              </CardContent>
            </Card>

            {/* Learning Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span>Our Atomic Adventure Goals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">By the end of this chapter, you will:</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Understand the fundamental laws that govern all chemical reactions</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Distinguish between atoms and molecules like a pro</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Master the mole concept - chemistry's counting system</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Write chemical formulas using valency with confidence</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-2">🧪 Chemistry Mindset</h4>
                    <p className="text-amber-700 text-sm">
                      Chemistry is like learning a new language - atoms and molecules are the "words," and chemical
                      formulas are the "sentences." Once you understand the grammar (valency), you can write any
                      chemical story!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content Tabs */}
            <Tabs defaultValue="laws" className="space-y-4">
              <TabsList className="w-full overflow-x-auto flex flex-nowrap gap-2">
                <TabsTrigger value="laws">Chemical Laws</TabsTrigger>
                <TabsTrigger value="atoms-molecules">Atoms & Molecules</TabsTrigger>
                <TabsTrigger value="mole-concept">Mole Concept</TabsTrigger>
                <TabsTrigger value="formulas">Chemical Formulas</TabsTrigger>
              </TabsList>

              <TabsContent value="laws" className="space-y-6">
                {/* Laws of Chemical Combination */}
                <Card>
                  <CardHeader className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2">
                    <CardTitle className="flex items-center space-x-2">
                      <Scale className="w-6 h-6 text-purple-600" />
                      <span>Laws of Chemical Combination: The Universal Rules</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Teacher's Approach */}
                    <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-3">⚖️ Nature's Accounting System</h4>
                      <p className="text-purple-700 mb-3">
                        Imagine nature as the most honest accountant ever - it never loses or gains matter, and it
                        always follows strict rules when combining elements. These laws were discovered by brilliant
                        scientists who noticed that chemical reactions follow predictable patterns. Let's uncover these
                        universal rules!
                      </p>
                      <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                        <p className="text-purple-800 font-medium">
                          These laws laid the foundation for atomic theory and modern chemistry!
                        </p>
                      </div>
                    </div>

                    {/* Law of Conservation of Mass */}
                    <div className="border-2 border-green-200 rounded-lg p-5 bg-green-50">
                      <h4 className="font-bold text-green-800 text-lg mb-3 flex items-center space-x-2">
                        <Scale className="w-6 h-6" />
                        <span>Law of Conservation of Mass</span>
                      </h4>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <p className="text-lg font-semibold text-green-900 mb-2">
                          "Mass can neither be created nor destroyed in a chemical reaction."
                        </p>
                        <p className="text-green-700 text-sm">
                          - Discovered by Antoine Lavoisier (1789), the "Father of Modern Chemistry"
                        </p>
                      </div>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="conservation-explanation">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">
                                ?
                              </div>
                              <span>What Does This Really Mean?</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <p className="text-green-700">
                              In any chemical reaction, the total mass of reactants (starting materials) equals the
                              total mass of products (final materials). Atoms are just rearranged, never created or
                              destroyed!
                            </p>
                            <div className="bg-green-100 p-3 rounded">
                              <h5 className="font-semibold text-green-800">Simple Example:</h5>
                              <p className="text-green-700 text-sm">
                                2g Hydrogen + 16g Oxygen → 18g Water
                                <br />
                                Total mass before = Total mass after = 18g
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="conservation-proof">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">
                                🧪
                              </div>
                              <span>Lavoisier's Famous Experiment</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                              <h5 className="font-semibold text-green-800 mb-2">The Mercury Oxide Experiment</h5>
                              <p className="text-green-700 text-sm mb-3">
                                Lavoisier heated mercury oxide in a sealed container and found that the total mass
                                remained exactly the same, even though mercury oxide decomposed into mercury and oxygen.
                              </p>
                              <div className="bg-green-50 p-3 rounded">
                                <p className="text-green-800 font-medium text-sm">
                                  Mercury Oxide → Mercury + Oxygen
                                  <br />
                                  Mass before = Mass after (exactly!)
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    {/* Law of Constant Proportions */}
                    <div className="border-2 border-blue-200 rounded-lg p-5 bg-blue-50">
                      <h4 className="font-bold text-blue-800 text-lg mb-3 flex items-center space-x-2">
                        <Calculator className="w-6 h-6" />
                        <span>Law of Constant Proportions</span>
                      </h4>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <p className="text-lg font-semibold text-blue-900 mb-2">
                          "A pure compound always contains the same elements in the same proportion by mass."
                        </p>
                        <p className="text-blue-700 text-sm">
                          - Discovered by Joseph Proust (1799), also called "Law of Definite Proportions"
                        </p>
                      </div>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="proportions-explanation">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                ?
                              </div>
                              <span>What Does This Really Mean?</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <p className="text-blue-700">
                              No matter where you get water from - rain, sea, or lab - it always contains hydrogen and
                              oxygen in the exact same ratio: 2:16 or 1:8 by mass.
                            </p>
                            <div className="bg-blue-100 p-3 rounded">
                              <h5 className="font-semibold text-blue-800">Water Example:</h5>
                              <p className="text-blue-700 text-sm">
                                • 18g water from rain: 2g H + 16g O<br />• 36g water from sea: 4g H + 32g O<br />• 90g
                                water from lab: 10g H + 80g O<br />
                                Ratio is always 1:8!
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="proportions-importance">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                💡
                              </div>
                              <span>Why This Law is Revolutionary</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-blue-200">
                              <p className="text-blue-700 text-sm mb-3">
                                This law proved that compounds have fixed compositions, leading to the idea that matter
                                is made of atoms that combine in definite ratios!
                              </p>
                              <div className="bg-blue-50 p-3 rounded">
                                <h5 className="font-semibold text-blue-800">Real-World Impact:</h5>
                                <ul className="text-blue-700 text-sm mt-1 space-y-1">
                                  <li>• Quality control in manufacturing</li>
                                  <li>• Drug purity testing</li>
                                  <li>• Food composition analysis</li>
                                  <li>• Environmental monitoring</li>
                                </ul>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    {/* Common Student Misconceptions */}
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <AlertDescription>
                        <strong className="text-red-800">Common Student Mistake:</strong>
                        <p className="text-red-700 mt-1">
                          "If I burn paper, it disappears, so mass is destroyed." Wrong! The paper combines with oxygen
                          to form carbon dioxide and water vapor that escape into air. If you could capture all
                          products, the total mass would be the same!
                        </p>
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="atoms-molecules" className="space-y-6">
                {/* Atoms and Molecules */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Atom className="w-6 h-6 text-indigo-600" />
                      <span>Atoms and Molecules: The Building Blocks</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Teacher's Building Block Approach */}
                    <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-200">
                      <h4 className="font-semibold text-indigo-800 mb-3">🧱 The Ultimate Building Blocks</h4>
                      <p className="text-indigo-700 leading-relaxed">
                        Think of atoms as LEGO blocks and molecules as the structures you build with them. Just like you
                        can build a house, car, or spaceship with the same LEGO blocks, nature builds everything - from
                        water to DNA - using just about 100 different types of atoms! Let's meet these incredible
                        building blocks.
                      </p>
                    </div>

                    {/* Atoms */}
                    <div className="border-2 border-red-200 rounded-lg p-5 bg-red-50">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="text-3xl">⚛️</div>
                        <div>
                          <h4 className="text-xl font-bold text-red-800">ATOMS</h4>
                          <p className="text-red-600">The Indivisible Units</p>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <p className="text-lg font-semibold text-red-900 mb-2">
                          An atom is the smallest particle of an element that retains all the chemical properties of
                          that element.
                        </p>
                      </div>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="atom-structure">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-800 font-bold">
                                🔬
                              </div>
                              <span>What's Inside an Atom?</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="bg-white p-3 rounded border border-red-200">
                                <h5 className="font-semibold text-red-800">Nucleus</h5>
                                <p className="text-red-700 text-sm">
                                  Center of atom, contains protons (+) and neutrons (neutral)
                                </p>
                              </div>
                              <div className="bg-white p-3 rounded border border-red-200">
                                <h5 className="font-semibold text-red-800">Electrons</h5>
                                <p className="text-red-700 text-sm">
                                  Negatively charged particles orbiting the nucleus
                                </p>
                              </div>
                              <div className="bg-white p-3 rounded border border-red-200">
                                <h5 className="font-semibold text-red-800">Size</h5>
                                <p className="text-red-700 text-sm">About 10⁻¹⁰ meters (incredibly tiny!)</p>
                              </div>
                            </div>
                            <div className="bg-red-100 p-3 rounded">
                              <h5 className="font-semibold text-red-800">Amazing Fact:</h5>
                              <p className="text-red-700 text-sm">
                                If an atom were the size of a football stadium, the nucleus would be like a marble at
                                the center!
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="atom-symbols">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-800 font-bold">
                                📝
                              </div>
                              <span>Atomic Symbols: Chemistry's Shorthand</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <p className="text-red-700">
                              Each element has a unique symbol - like a name tag for atoms. These symbols are used
                              worldwide!
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white p-3 rounded border border-red-200">
                                <h5 className="font-semibold text-red-800">Common Elements</h5>
                                <ul className="text-red-700 text-sm mt-2 space-y-1">
                                  <li>• Hydrogen: H</li>
                                  <li>• Carbon: C</li>
                                  <li>• Oxygen: O</li>
                                  <li>• Nitrogen: N</li>
                                </ul>
                              </div>
                              <div className="bg-white p-3 rounded border border-red-200">
                                <h5 className="font-semibold text-red-800">Tricky Ones</h5>
                                <ul className="text-red-700 text-sm mt-2 space-y-1">
                                  <li>• Sodium: Na (from Latin 'Natrium')</li>
                                  <li>• Potassium: K (from Latin 'Kalium')</li>
                                  <li>• Iron: Fe (from Latin 'Ferrum')</li>
                                  <li>• Gold: Au (from Latin 'Aurum')</li>
                                </ul>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    {/* Molecules */}
                    <div className="border-2 border-green-200 rounded-lg p-5 bg-green-50">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="text-3xl">🔗</div>
                        <div>
                          <h4 className="text-xl font-bold text-green-800">MOLECULES</h4>
                          <p className="text-green-600">Atoms Holding Hands</p>
                        </div>
                      </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <p className="text-lg font-semibold text-green-900 mb-2">
                          A molecule is a group of two or more atoms chemically bonded together.
                        </p>
                        </div>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="molecule-types">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">
                                🔗
                              </div>
                              <span>Types of Molecules</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white p-4 rounded-lg border border-green-200">
                                <h5 className="font-semibold text-green-800 mb-2">Homoatomic Molecules</h5>
                                <p className="text-green-700 text-sm mb-2">Made of same type of atoms</p>
                                <div className="bg-green-50 p-2 rounded">
                                  <p className="text-green-600 text-xs">
                                    <strong>Examples:</strong>
                                    <br />• O₂ (Oxygen gas)
                                    <br />• H₂ (Hydrogen gas)
                                    <br />• N₂ (Nitrogen gas)
                                  </p>
                                </div>
                              </div>
                              <div className="bg-white p-4 rounded-lg border border-green-200">
                                <h5 className="font-semibold text-green-800 mb-2">Heteroatomic Molecules</h5>
                                <p className="text-green-700 text-sm mb-2">Made of different types of atoms</p>
                                <div className="bg-green-50 p-2 rounded">
                                  <p className="text-green-600 text-xs">
                                    <strong>Examples:</strong>
                                    <br />• H₂O (Water)
                                    <br />• CO₂ (Carbon dioxide)
                                    <br />• NH₃ (Ammonia)
                                  </p>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="molecule-size">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">
                                📏
                              </div>
                              <span>Molecular Size Classification</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="space-y-3">
                              <div className="bg-white p-3 rounded border border-green-200">
                                <h5 className="font-semibold text-green-800">Diatomic (2 atoms)</h5>
                                <p className="text-green-700 text-sm">H₂, O₂, N₂, Cl₂</p>
                              </div>
                              <div className="bg-white p-3 rounded border border-green-200">
                                <h5 className="font-semibold text-green-800">Triatomic (3 atoms)</h5>
                                <p className="text-green-700 text-sm">H₂O, CO₂, O₃ (ozone)</p>
                              </div>
                              <div className="bg-white p-3 rounded border border-green-200">
                                <h5 className="font-semibold text-green-800">Polyatomic (many atoms)</h5>
                                <p className="text-green-700 text-sm">C₆H₁₂O₆ (glucose), C₈H₁₈ (octane)</p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    {/* Atomic and Molecular Mass */}
                    <div className="border-2 border-purple-200 rounded-lg p-5 bg-purple-50">
                      <h4 className="font-bold text-purple-800 text-lg mb-3 flex items-center space-x-2">
                        <Scale className="w-6 h-6" />
                        <span>Atomic and Molecular Mass</span>
                      </h4>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-purple-100 p-3 rounded">
                            <h5 className="font-semibold text-purple-800">Atomic Mass</h5>
                            <p className="text-purple-700 text-sm">
                              The mass of one atom of an element (in atomic mass units, u)
                            </p>
                          </div>
                          <div className="bg-purple-100 p-3 rounded">
                            <h5 className="font-semibold text-purple-800">Molecular Mass</h5>
                            <p className="text-purple-700 text-sm">
                              The sum of atomic masses of all atoms in a molecule
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-100 p-3 rounded">
                        <h5 className="font-semibold text-purple-800">Example Calculation:</h5>
                        <p className="text-purple-700 text-sm">Water (H₂O): (2 × 1) + (1 × 16) = 2 + 16 = 18 u</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mole-concept" className="space-y-6">
                {/* Mole Concept */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calculator className="w-6 h-6 text-teal-600" />
                      <span>The Mole Concept: Chemistry's Counting System</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Teacher's Counting Approach */}
                    <div className="bg-teal-50 p-5 rounded-lg border border-teal-200">
                      <h4 className="font-semibold text-teal-800 mb-3">🔢 The Ultimate Counting System</h4>
                      <p className="text-teal-700 leading-relaxed">
                        Imagine trying to count the atoms in a grain of salt - you'd be counting forever! That's why
                        chemists invented the "mole" - a special counting unit for incredibly tiny particles. It's like
                        saying "dozen" for 12 items, but instead of 12, a mole represents 6.022 × 10²³ particles. This
                        number is so important, it has its own name: Avogadro's number!
                      </p>
                    </div>

                    {/* What is a Mole */}
                    <div className="border-2 border-blue-200 rounded-lg p-5 bg-blue-50">
                      <h4 className="font-bold text-blue-800 text-lg mb-3 flex items-center space-x-2">
                        <Calculator className="w-6 h-6" />
                        <span>What is a Mole?</span>
                      </h4>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <p className="text-lg font-semibold text-blue-900 mb-2">
                          1 mole = 6.022 × 10²³ particles (atoms, molecules, ions, etc.)
                        </p>
                        <p className="text-blue-700 text-sm">
                          This number is called Avogadro's number (Nₐ), named after Amedeo Avogadro
                        </p>
                      </div>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="avogadro-number">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                🔢
                              </div>
                              <span>How Big is Avogadro's Number?</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-blue-200">
                              <h5 className="font-semibold text-blue-800 mb-2">Mind-Blowing Comparisons:</h5>
                              <ul className="text-blue-700 text-sm space-y-2">
                                <li>
                                  • If you counted 1 number per second, it would take 1.9 × 10¹⁶ years to count to
                                  Avogadro's number!
                                </li>
                                <li>
                                  • If Avogadro's number of rice grains were spread over Earth, they'd form a layer 75
                                  miles thick!
                                </li>
                                <li>
                                  • If you had Avogadro's number of dollars, you could buy everything on Earth trillions
                                  of times over!
                                </li>
                              </ul>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="molar-mass">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                ⚖️
                              </div>
                              <span>Molar Mass: The Bridge Between Atoms and Grams</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-blue-200">
                              <p className="text-blue-700 mb-3">
                                Molar mass is the mass of one mole of a substance, expressed in grams per mole (g/mol).
                              </p>
                              <div className="bg-blue-50 p-3 rounded">
                                <h5 className="font-semibold text-blue-800">Key Insight:</h5>
                                <p className="text-blue-700 text-sm">
                                  The molar mass in g/mol is numerically equal to the atomic/molecular mass in u!
                                </p>
                              </div>
                              <div className="mt-3 space-y-2">
                                <div className="bg-blue-100 p-2 rounded">
                                  <p className="text-blue-800 text-sm">
                                    <strong>Carbon:</strong> Atomic mass = 12 u, Molar mass = 12 g/mol
                                  </p>
                                </div>
                                <div className="bg-blue-100 p-2 rounded">
                                  <p className="text-blue-800 text-sm">
                                    <strong>Water:</strong> Molecular mass = 18 u, Molar mass = 18 g/mol
                                  </p>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="mole-calculations">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                📊
                              </div>
                              <span>Essential Mole Calculations</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white p-4 rounded-lg border border-blue-200">
                                <h5 className="font-semibold text-blue-800 mb-2">Formula Triangle</h5>
                                <div className="bg-blue-50 p-3 rounded text-center">
                                  <div className="text-blue-800 font-mono">
                                    <div className="border-b border-blue-400 pb-1 mb-1">Mass (g)</div>
                                    <div className="flex justify-between">
                                      <span>Moles</span>
                                      <span>×</span>
                                      <span>Molar Mass</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-white p-4 rounded-lg border border-blue-200">
                                <h5 className="font-semibold text-blue-800 mb-2">Key Formulas</h5>
                                <div className="space-y-1 text-blue-700 text-sm">
                                  <p>• Moles = Mass ÷ Molar Mass</p>
                                  <p>• Mass = Moles × Molar Mass</p>
                                  <p>• Particles = Moles × Nₐ</p>
                                </div>
                              </div>
                            </div>
                            <div className="bg-blue-100 p-3 rounded">
                              <h5 className="font-semibold text-blue-800">Example Problem:</h5>
                              <p className="text-blue-700 text-sm">
                                How many moles are in 36g of water?
                                <br />
                                Moles = 36g ÷ 18 g/mol = 2 moles
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    {/* Teacher's Memory Tricks */}
                    <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                      <h4 className="font-semibold text-yellow-800 mb-3 flex items-center space-x-2">
                        <Lightbulb className="w-5 h-5" />
                        <span>Teacher's Memory Tricks</span>
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded border border-yellow-200">
                          <h5 className="font-semibold text-yellow-800">Remember Avogadro's Number</h5>
                          <p className="text-yellow-700 text-sm">
                            "Avocado's number" - 6.022 × 10²³ (like the number of molecules in a really big avocado!)
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded border border-yellow-200">
                          <h5 className="font-semibold text-yellow-800">Mole Formula</h5>
                          <p className="text-yellow-700 text-sm">"Moles Make Mass" - Moles × Molar Mass = Mass</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="formulas" className="space-y-6">
                {/* Chemical Formulas and Valency */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="w-6 h-6 text-orange-600" />
                      <span>Chemical Formulas and Valency: The Language of Chemistry</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Teacher's Language Approach */}
                    <div className="bg-orange-50 p-5 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-800 mb-3">📝 Learning Chemistry's Language</h4>
                      <p className="text-orange-700 leading-relaxed">
                        Chemical formulas are like recipes - they tell us exactly which atoms and how many of each are
                        needed to make a compound. Valency is the "combining capacity" of atoms - think of it as how
                        many "hands" each atom has to hold onto other atoms. Once you master valency, writing chemical
                        formulas becomes as easy as following a recipe!
                      </p>
                    </div>

                    {/* Valency */}
                    <div className="border-2 border-red-200 rounded-lg p-5 bg-red-50">
                      <h4 className="font-bold text-red-800 text-lg mb-3 flex items-center space-x-2">
                        <Zap className="w-6 h-6" />
                        <span>Valency: The Combining Power</span>
                      </h4>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <p className="text-lg font-semibold text-red-900 mb-2">
                          Valency is the combining capacity of an element - the number of electrons it can lose, gain,
                          or share.
                        </p>
                      </div>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="valency-concept">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-800 font-bold">
                                🤝
                              </div>
                              <span>Understanding Valency with the "Hands" Analogy</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <p className="text-red-700 mb-3">
                              Think of atoms as people with different numbers of "hands" they can use to hold onto other
                              atoms:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white p-3 rounded border border-red-200">
                                <h5 className="font-semibold text-red-800">Monovalent (1 hand)</h5>
                                <p className="text-red-700 text-sm">H, Na, K, Cl, F</p>
                                <p className="text-red-600 text-xs">Can form 1 bond</p>
                              </div>
                              <div className="bg-white p-3 rounded border border-red-200">
                                <h5 className="font-semibold text-red-800">Divalent (2 hands)</h5>
                                <p className="text-red-700 text-sm">O, Mg, Ca, Zn</p>
                                <p className="text-red-600 text-xs">Can form 2 bonds</p>
                              </div>
                              <div className="bg-white p-3 rounded border border-red-200">
                                <h5 className="font-semibold text-red-800">Trivalent (3 hands)</h5>
                                <p className="text-red-700 text-sm">N, Al, Fe</p>
                                <p className="text-red-600 text-xs">Can form 3 bonds</p>
                              </div>
                              <div className="bg-white p-3 rounded border border-red-200">
                                <h5 className="font-semibold text-red-800">Tetravalent (4 hands)</h5>
                                <p className="text-red-700 text-sm">C, Si</p>
                                <p className="text-red-600 text-xs">Can form 4 bonds</p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="valency-table">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-800 font-bold">
                                📋
                              </div>
                              <span>Essential Valency Table</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="overflow-x-auto">
                              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                                <thead>
                                  <tr className="bg-red-600 text-white">
                                    <th className="border border-red-500 p-3 text-left font-semibold">Valency</th>
                                    <th className="border border-red-500 p-3 text-left font-semibold">Elements</th>
                                    <th className="border border-red-500 p-3 text-left font-semibold">Radicals</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="bg-gray-50">
                                    <td className="border border-gray-300 p-3 font-medium">1</td>
                                    <td className="border border-gray-300 p-3">H, Na, K, Li, Ag</td>
                                    <td className="border border-gray-300 p-3">OH⁻, NO₃⁻, Cl⁻</td>
                                  </tr>
                                  <tr>
                                    <td className="border border-gray-300 p-3 font-medium">2</td>
                                    <td className="border border-gray-300 p-3">O, Mg, Ca, Zn, Ba</td>
                                    <td className="border border-gray-300 p-3">SO₄²⁻, CO₃²⁻</td>
                                  </tr>
                                  <tr className="bg-gray-50">
                                    <td className="border border-gray-300 p-3 font-medium">3</td>
                                    <td className="border border-gray-300 p-3">N, Al, Fe</td>
                                    <td className="border border-gray-300 p-3">PO₄³⁻, NO₃⁻</td>
                                  </tr>
                                  <tr>
                                    <td className="border border-gray-300 p-3 font-medium">4</td>
                                    <td className="border border-gray-300 p-3">C, Si</td>
                                    <td className="border border-gray-300 p-3">-</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    {/* Writing Chemical Formulas */}
                    <div className="border-2 border-green-200 rounded-lg p-5 bg-green-50">
                      <h4 className="font-bold text-green-800 text-lg mb-3 flex items-center space-x-2">
                        <Building className="w-6 h-6" />
                        <span>Writing Chemical Formulas</span>
                      </h4>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="formula-rules">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">
                                📝
                              </div>
                              <span>The Cross-Multiplication Method</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                              <h5 className="font-semibold text-green-800 mb-3">Step-by-Step Method:</h5>
                              <ol className="text-green-700 text-sm space-y-2">
                                <li>1. Write symbols of elements/radicals</li>
                                <li>2. Write their valencies below</li>
                                <li>3. Cross-multiply the valencies</li>
                                <li>4. Simplify if possible</li>
                              </ol>
                            </div>

                            <div className="bg-green-100 p-4 rounded">
                              <h5 className="font-semibold text-green-800 mb-2">Example: Aluminum Oxide</h5>
                              <div className="font-mono text-green-700 text-sm space-y-1">
                                <p>Al³⁺ + O²⁻</p>
                                <p>Cross multiply: Al₂O₃</p>
                                <p>Final formula: Al₂O₃</p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="formula-examples">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">
                                💡
                              </div>
                              <span>Practice Examples</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white p-3 rounded border border-green-200">
                                <h5 className="font-semibold text-green-800">Simple Compounds</h5>
                                <ul className="text-green-700 text-sm mt-2 space-y-1">
                                  <li>• Water: H₂O</li>
                                  <li>• Salt: NaCl</li>
                                  <li>• Carbon dioxide: CO₂</li>
                                  <li>• Ammonia: NH₃</li>
                                </ul>
                              </div>
                              <div className="bg-white p-3 rounded border border-green-200">
                                <h5 className="font-semibold text-green-800">Complex Compounds</h5>
                                <ul className="text-green-700 text-sm mt-2 space-y-1">
                                  <li>• Calcium carbonate: CaCO₃</li>
                                  <li>• Sodium sulfate: Na₂SO₄</li>
                                  <li>• Aluminum hydroxide: Al(OH)₃</li>
                                  <li>• Magnesium nitrate: Mg(NO₃)₂</li>
                                </ul>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    {/* Common Student Mistakes */}
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <AlertDescription>
                        <strong className="text-red-800">Common Student Mistakes:</strong>
                        <ul className="text-red-700 mt-1 space-y-1">
                          <li>• Forgetting to use brackets for polyatomic ions: Mg(NO₃)₂, not MgNO₃₂</li>
                          <li>• Not simplifying formulas: Writing Ca₂O₂ instead of CaO</li>
                          <li>• Mixing up positive and negative valencies</li>
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
                  <span>Master the Atomic World</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">🧪 Challenge Yourself</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800">
                          1. Calculate the number of molecules in 44g of CO₂. (Given: C=12, O=16)
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>Hint: Find moles first, then multiply by Avogadro's number</em>
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800">
                          2. Write the chemical formula for calcium phosphate using valency method.
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>Hint: Ca²⁺ and PO₄³⁻ - use cross multiplication</em>
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800">
                          3. Explain why the Law of Conservation of Mass is fundamental to chemistry.
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>Hint: Think about what happens to atoms during chemical reactions</em>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
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
                  <h4 className="font-semibold text-yellow-800 text-sm">Valency Memory</h4>
                  <p className="text-yellow-700 text-xs">"H-Li-Na-K-Rb-Cs-Fr" all have valency 1 (Group 1 elements)</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <h4 className="font-semibold text-blue-800 text-sm">Mole Calculations</h4>
                  <p className="text-blue-700 text-xs">
                    Always write the formula triangle: Mass at top, Moles and Molar Mass at bottom
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <h4 className="font-semibold text-green-800 text-sm">Formula Writing</h4>
                  <p className="text-green-700 text-xs">Practice with common compounds daily - muscle memory is key!</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Reference */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📋 Essential Constants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Avogadro's Number:</span>
                    <span>6.022 × 10²³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Atomic Mass Unit:</span>
                    <span>1 u</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Carbon-12 Mass:</span>
                    <span>12 u exactly</span>
                  </div>
                  <hr className="my-2" />
                  <div className="text-xs text-gray-600">
                    <p>
                      <strong>Remember:</strong> Molar mass (g/mol) = Atomic mass (u) numerically
                    </p>
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
                <h4 className="font-semibold text-purple-800 mb-2">Chapter 4: Structure of the Atom</h4>
                <p className="text-purple-700 text-sm mb-3">
                  We'll journey inside the atom to discover electrons, protons, and neutrons!
                </p>
                <p className="text-xs text-purple-600">
                  <strong>Preview:</strong> How did scientists discover what's inside atoms? What makes atoms stable?
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <AskDoubtFloater />
    </div>
  )
}
