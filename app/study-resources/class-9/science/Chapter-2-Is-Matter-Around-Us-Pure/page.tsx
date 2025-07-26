"use client"

import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BookOpen,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Brain,
  Target,
  Users,
  FlaskConical,
  Droplets,
  Filter,
  Beaker,
  TestTube,
} from "lucide-react"

export default function Chapter2Notes() {
  const [selectedMixture, setSelectedMixture] = useState("homogeneous")

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
    <div className="container-fluid min-vh-100 bg-gray-50 px-0">
      {/* Header */}
      <header className="bg-white shadow-sm border-bottom">
        <div className="container px-4 py-4">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h1 className="h4 font-bold text-gray-900">Class 9 Science Notes</h1>
              <p className="text-gray-600">Chapter 2: Is Matter Around Us Pure?</p>
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
                  <span>Teacher's Welcome Back</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-blue-50">
                <p className="text-blue-900 leading-relaxed">
                  <strong>Welcome back, young scientists!</strong> In Chapter 1, we discovered that everything around us
                  is matter made of tiny particles. Now comes the exciting question: Is this matter pure, or is it mixed
                  with other substances? Today, we'll become detectives, learning to identify pure substances from
                  mixtures, and discover the amazing techniques scientists use to separate them. Get ready for some
                  fascinating kitchen chemistry!
                </p>
              </CardContent>
            </Card>

            {/* Learning Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span>Our Learning Journey Today</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <h4 className="fw-semibold text-dark">By the end of this chapter, you will:</h4>
                    <ul className="list-unstyled mt-2">
                      <li className="d-flex align-items-start mb-2">
                        <CheckCircle className="me-2 text-success flex-shrink-0" style={{ width: 18, height: 18, marginTop: 2 }} />
                        <span>Distinguish between pure substances and mixtures like a pro</span>
                      </li>
                      <li className="d-flex align-items-start mb-2">
                        <CheckCircle className="me-2 text-success flex-shrink-0" style={{ width: 18, height: 18, marginTop: 2 }} />
                        <span>Understand solutions, suspensions, and colloids with confidence</span>
                      </li>
                      <li className="d-flex align-items-start mb-2">
                        <CheckCircle className="me-2 text-success flex-shrink-0" style={{ width: 18, height: 18, marginTop: 2 }} />
                        <span>Master separation techniques used in real laboratories</span>
                      </li>
                      <li className="d-flex align-items-start mb-2">
                        <CheckCircle className="me-2 text-success flex-shrink-0" style={{ width: 18, height: 18, marginTop: 2 }} />
                        <span>Apply this knowledge to solve everyday problems</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="bg-warning bg-opacity-10 p-3 rounded border border-warning">
                      <h4 className="fw-semibold text-warning mb-2">🔬 Lab Safety First!</h4>
                      <p className="text-warning text-sm">
                        As we explore separation techniques, remember: Never taste unknown substances, always wear safety
                        goggles when suggested, and ask an adult before trying experiments at home.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content Tabs */}
            <Tabs defaultValue="pure-vs-mixture" className="space-y-4">
              <TabsList className="w-full overflow-x-auto flex flex-nowrap gap-2">
                <TabsTrigger value="pure-vs-mixture">Pure vs Mixture</TabsTrigger>
                <TabsTrigger value="types-mixtures">Types of Mixtures</TabsTrigger>
                <TabsTrigger value="solutions">Solutions</TabsTrigger>
                <TabsTrigger value="separation">Separation Methods</TabsTrigger>
              </TabsList>

              <TabsContent value="pure-vs-mixture" className="space-y-6">
                {/* Pure Substances vs Mixtures */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-6 h-6 text-purple-600" />
                      <span>Pure Substances vs Mixtures: The Great Detective Work</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Teacher's Detective Approach */}
                    <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-3">🕵️ Let's Be Science Detectives</h4>
                      <p className="text-purple-700 mb-3">
                        Imagine you're a detective examining evidence. You have a glass of water, a handful of soil, and
                        a piece of gold jewelry. Your job is to determine: Which of these contains only one type of
                        substance (pure), and which contains multiple substances mixed together (mixture)? Let's develop
                        our detective skills!
                      </p>
                      <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                        <p className="text-purple-800 font-medium">
                          The key clue: Pure substances have the same composition throughout, while mixtures contain two
                          or more different substances that can be separated!
                        </p>
                      </div>
                    </div>

                    {/* Pure Substances */}
                    <div className="border-2 border-green-200 rounded-lg p-5 bg-green-50">
                      <h4 className="font-bold text-green-800 text-lg mb-3 flex items-center space-x-2">
                        <TestTube className="w-6 h-6" />
                        <span>PURE SUBSTANCES</span>
                      </h4>
                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <p className="text-lg font-semibold text-green-900 mb-2">
                          A pure substance contains only one type of particle and has a fixed composition.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          <div className="bg-green-100 p-3 rounded">
                            <h5 className="font-semibold text-green-800">Elements</h5>
                            <p className="text-green-700 text-sm">
                              Made of only one type of atom. Cannot be broken down further by chemical means.
                            </p>
                            <p className="text-green-600 text-xs mt-1">
                              <strong>Examples:</strong> Gold (Au), Oxygen (O₂), Carbon (C)
                            </p>
                          </div>
                          <div className="bg-green-100 p-3 rounded">
                            <h5 className="font-semibold text-green-800">Compounds</h5>
                            <p className="text-green-700 text-sm">
                              Made of two or more different atoms chemically bonded in fixed ratios.
                            </p>
                            <p className="text-green-600 text-xs mt-1">
                              <strong>Examples:</strong> Water (H₂O), Salt (NaCl), Sugar (C₁₂H₂₂O₁₁)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-100 p-3 rounded">
                        <h5 className="font-semibold text-green-800">Key Characteristics of Pure Substances:</h5>
                        <ul className="text-green-700 text-sm mt-2 space-y-1">
                          <li>• Fixed melting and boiling points</li>
                          <li>• Uniform composition throughout</li>
                          <li>• Cannot be separated by physical methods</li>
                          <li>• Same properties in every sample</li>
                        </ul>
                      </div>
                    </div>

                    {/* Mixtures */}
                    <div className="border-2 border-orange-200 rounded-lg p-5 bg-orange-50">
                      <h4 className="font-bold text-orange-800 text-lg mb-3 flex items-center space-x-2">
                        <Beaker className="w-6 h-6" />
                        <span>MIXTURES</span>
                      </h4>
                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <p className="text-lg font-semibold text-orange-900 mb-2">
                          A mixture contains two or more substances that are physically combined but not chemically
                          bonded.
                        </p>
                        <div className="bg-orange-100 p-3 rounded mt-4">
                          <h5 className="font-semibold text-orange-800">Key Characteristics of Mixtures:</h5>
                          <ul className="text-orange-700 text-sm mt-2 space-y-1">
                            <li>• Variable composition (can have different ratios)</li>
                            <li>• Components retain their individual properties</li>
                            <li>• Can be separated by physical methods</li>
                            <li>• No fixed melting or boiling point</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Common Student Misconceptions */}
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <AlertDescription>
                        <strong className="text-red-800">Common Student Mistake:</strong>
                        <p className="text-red-700 mt-1">
                          "Air is a pure substance because it looks uniform." Wrong! Air is a mixture of gases (78%
                          nitrogen, 21% oxygen, 1% other gases). Just because we can't see the different components
                          doesn't make it pure!
                        </p>
                      </AlertDescription>
                    </Alert>

                    {/* Real-World Detective Work */}
                    <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-200">
                      <h4 className="font-semibold text-indigo-800 mb-3 flex items-center space-x-2">
                        <FlaskConical className="w-5 h-5" />
                        <span>Detective Challenge: Identify These!</span>
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h5 className="font-semibold text-indigo-800">Pure Substances:</h5>
                          <div className="space-y-2">
                            <div className="bg-white p-2 rounded border border-indigo-200">
                              <span className="text-indigo-700 text-sm">✓ Distilled water (H₂O only)</span>
                            </div>
                            <div className="bg-white p-2 rounded border border-indigo-200">
                              <span className="text-indigo-700 text-sm">✓ Pure gold jewelry (Au only)</span>
                            </div>
                            <div className="bg-white p-2 rounded border border-indigo-200">
                              <span className="text-indigo-700 text-sm">✓ Table salt (NaCl only)</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h5 className="font-semibold text-indigo-800">Mixtures:</h5>
                          <div className="space-y-2">
                            <div className="bg-white p-2 rounded border border-indigo-200">
                              <span className="text-indigo-700 text-sm">✗ Tap water (H₂O + minerals)</span>
                            </div>
                            <div className="bg-white p-2 rounded border border-indigo-200">
                              <span className="text-indigo-700 text-sm">✗ Soil (sand + clay + organic matter)</span>
                            </div>
                            <div className="bg-white p-2 rounded border border-indigo-200">
                              <span className="text-indigo-700 text-sm">✗ Air (N₂ + O₂ + other gases)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="types-mixtures" className="space-y-6">
                {/* Types of Mixtures */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Droplets className="w-6 h-6 text-blue-600" />
                      <span>Types of Mixtures: The Visibility Test</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Teacher's Visibility Approach */}
                    <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-3">👁️ The Visibility Test</h4>
                      <p className="text-blue-700 leading-relaxed">
                        Here's a simple way to classify mixtures: Can you see the different components with your naked
                        eye? This simple question divides all mixtures into two main categories. Let's explore this
                        fascinating world where appearance tells us so much about the science behind it!
                      </p>
                    </div>

                    {/* Homogeneous Mixtures */}
                    <div className="border-2 border-green-200 rounded-lg p-5 bg-green-50">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="text-3xl">🌊</div>
                        <div>
                          <h4 className="text-xl font-bold text-green-800">HOMOGENEOUS MIXTURES</h4>
                          <p className="text-green-600">The "Uniform" Mixtures</p>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <p className="text-lg font-semibold text-green-900 mb-2">
                          Components are uniformly distributed and cannot be distinguished by the naked eye.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h5 className="font-semibold text-green-800 mb-2">Characteristics</h5>
                          <ul className="text-green-700 text-sm space-y-1">
                            <li>• Same composition throughout</li>
                            <li>• Components not visible separately</li>
                            <li>• Also called "solutions"</li>
                            <li>• Have uniform properties</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h5 className="font-semibold text-green-800 mb-2">Examples</h5>
                          <ul className="text-green-700 text-sm space-y-1">
                            <li>• Salt water (salt dissolved in water)</li>
                            <li>• Sugar water (sugar dissolved in water)</li>
                            <li>• Air (mixture of gases)</li>
                            <li>• Brass (copper + zinc alloy)</li>
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4 bg-green-100 p-3 rounded">
                        <h5 className="font-semibold text-green-800">Teacher's Memory Trick:</h5>
                        <p className="text-green-700 text-sm">
                          "Homo" means "same" - so homogeneous mixtures look the SAME throughout. You can't spot the
                          difference between different parts!
                        </p>
                      </div>
                    </div>

                    {/* Heterogeneous Mixtures */}
                    <div className="border-2 border-purple-200 rounded-lg p-5 bg-purple-50">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="text-3xl">🥗</div>
                        <div>
                          <h4 className="text-xl font-bold text-purple-800">HETEROGENEOUS MIXTURES</h4>
                          <p className="text-purple-600">The "Non-Uniform" Mixtures</p>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <p className="text-lg font-semibold text-purple-900 mb-2">
                          Components are not uniformly distributed and can be distinguished by the naked eye.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h5 className="font-semibold text-purple-800 mb-2">Characteristics</h5>
                          <ul className="text-purple-700 text-sm space-y-1">
                            <li>• Different composition in different regions</li>
                            <li>• Components clearly visible</li>
                            <li>• Can have distinct boundaries</li>
                            <li>• Properties vary from region to region</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h5 className="font-semibold text-purple-800 mb-2">Examples</h5>
                          <ul className="text-purple-700 text-sm space-y-1">
                            <li>• Oil and water mixture</li>
                            <li>• Sand and water mixture</li>
                            <li>• Salad (vegetables mixed together)</li>
                            <li>• Granite rock (different minerals)</li>
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4 bg-purple-100 p-3 rounded">
                        <h5 className="font-semibold text-purple-800">Teacher's Memory Trick:</h5>
                        <p className="text-purple-700 text-sm">
                          "Hetero" means "different" - so heterogeneous mixtures have DIFFERENT regions that you can
                          actually see and identify!
                        </p>
                      </div>
                    </div>

                    {/* Interactive Comparison */}
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3">🔍 Quick Identification Guide</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                          <thead>
                            <tr className="bg-indigo-600 text-white">
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Property</th>
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Homogeneous</th>
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Heterogeneous</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 p-3 font-medium">Visibility of Components</td>
                              <td className="border border-gray-300 p-3">Cannot see separate components</td>
                              <td className="border border-gray-300 p-3">Can see separate components</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-3 font-medium">Composition</td>
                              <td className="border border-gray-300 p-3">Uniform throughout</td>
                              <td className="border border-gray-300 p-3">Non-uniform</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 p-3 font-medium">Boundaries</td>
                              <td className="border border-gray-300 p-3">No visible boundaries</td>
                              <td className="border border-gray-300 p-3">Clear boundaries between components</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-3 font-medium">Example</td>
                              <td className="border border-gray-300 p-3">Salt water</td>
                              <td className="border border-gray-300 p-3">Oil and water</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="solutions" className="space-y-6">
                {/* Solutions, Suspensions, and Colloids */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TestTube className="w-6 h-6 text-teal-600" />
                      <span>Solutions, Suspensions & Colloids: The Size Matters</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Teacher's Size Approach */}
                    <div className="bg-teal-50 p-5 rounded-lg border border-teal-200">
                      <h4 className="font-semibold text-teal-800 mb-3">📏 It's All About Particle Size!</h4>
                      <p className="text-teal-700 leading-relaxed">
                        Imagine you're mixing different sized objects in water: tiny sugar crystals, medium-sized flour
                        particles, and large pebbles. Each behaves differently! The size of particles determines whether
                        we get a solution, suspension, or colloid. This is one of the most important concepts in
                        chemistry!
                      </p>
                    </div>

                    {/* Solutions */}
                    <div className="border-2 border-blue-200 rounded-lg p-5 bg-blue-50">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="text-3xl">💧</div>
                        <div>
                          <h4 className="text-xl font-bold text-blue-800">SOLUTIONS</h4>
                          <p className="text-blue-600">The "Invisible" Mixtures</p>
                        </div>
                      </div>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="solution-basics">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                1
                              </div>
                              <span>What Makes a Solution Special?</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="text-lg font-semibold text-blue-900 mb-2">
                                A solution is a homogeneous mixture where one substance (solute) is completely dissolved
                                in another (solvent).
                              </p>
                              <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <div className="bg-blue-100 p-3 rounded">
                                  <h5 className="font-semibold text-blue-800">Solute</h5>
                                  <p className="text-blue-700 text-sm">
                                    The substance being dissolved (usually present in smaller amount)
                                  </p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded">
                                  <h5 className="font-semibold text-blue-800">Solvent</h5>
                                  <p className="text-blue-700 text-sm">
                                    The substance doing the dissolving (usually present in larger amount)
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                              <h5 className="font-semibold text-blue-800">Key Characteristics:</h5>
                              <ul className="text-blue-700 text-sm mt-2 space-y-1">
                                <li>• Particle size: Less than 1 nanometer (extremely small!)</li>
                                <li>• Transparent and clear</li>
                                <li>• Cannot be separated by filtration</li>
                                <li>• Do not scatter light (no Tyndall effect)</li>
                                <li>• Solute particles don't settle down</li>
                              </ul>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="solution-types">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                2
                              </div>
                              <span>Types of Solutions</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="bg-white p-3 rounded border border-blue-200">
                                <h5 className="font-semibold text-blue-800">Solid in Liquid</h5>
                                <p className="text-blue-700 text-sm">Salt in water, Sugar in water</p>
                              </div>
                              <div className="bg-white p-3 rounded border border-blue-200">
                                <h5 className="font-semibold text-blue-800">Liquid in Liquid</h5>
                                <p className="text-blue-700 text-sm">Alcohol in water, Vinegar</p>
                              </div>
                              <div className="bg-white p-3 rounded border border-blue-200">
                                <h5 className="font-semibold text-blue-800">Gas in Liquid</h5>
                                <p className="text-blue-700 text-sm">CO₂ in water (soda), O₂ in water</p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="concentration">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                3
                              </div>
                              <span>Concentration: How Strong is Your Solution?</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-blue-200">
                              <h5 className="font-semibold text-blue-800 mb-2">
                                Concentration = Amount of solute / Amount of solution
                              </h5>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-3 rounded">
                                  <h6 className="font-semibold text-blue-800">Concentrated Solution</h6>
                                  <p className="text-blue-700 text-sm">More solute, less solvent</p>
                                  <p className="text-blue-600 text-xs">Example: Strong tea</p>
                                </div>
                                <div className="bg-blue-50 p-3 rounded">
                                  <h6 className="font-semibold text-blue-800">Dilute Solution</h6>
                                  <p className="text-blue-700 text-sm">Less solute, more solvent</p>
                                  <p className="text-blue-600 text-xs">Example: Weak tea</p>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    {/* Suspensions */}
                    <div className="border-2 border-orange-200 rounded-lg p-5 bg-orange-50">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="text-3xl">🌪️</div>
                        <div>
                          <h4 className="text-xl font-bold text-orange-800">SUSPENSIONS</h4>
                          <p className="text-orange-600">The "Visible" Mixtures</p>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <p className="text-lg font-semibold text-orange-900 mb-2">
                          A suspension is a heterogeneous mixture where large particles are dispersed in a liquid but
                          settle down over time.
                        </p>
                      </div>

                      <div className="bg-orange-100 p-3 rounded">
                        <h5 className="font-semibold text-orange-800">Key Characteristics:</h5>
                        <ul className="text-orange-700 text-sm mt-2 space-y-1">
                          <li>• Particle size: Greater than 100 nanometers (visible!)</li>
                          <li>• Opaque and cloudy appearance</li>
                          <li>• Particles settle down when left undisturbed</li>
                          <li>• Can be separated by filtration</li>
                          <li>• Show Tyndall effect (scatter light)</li>
                        </ul>
                      </div>

                      <div className="mt-4 bg-white p-3 rounded border border-orange-200">
                        <h5 className="font-semibold text-orange-800">Examples:</h5>
                        <p className="text-orange-700 text-sm">
                          Muddy water, chalk powder in water, sand in water, paints
                        </p>
                      </div>
                    </div>

                    {/* Colloids */}
                    <div className="border-2 border-purple-200 rounded-lg p-5 bg-purple-50">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="text-3xl">🌫️</div>
                        <div>
                          <h4 className="text-xl font-bold text-purple-800">COLLOIDS</h4>
                          <p className="text-purple-600">The "In-Between" Mixtures</p>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <p className="text-lg font-semibold text-purple-900 mb-2">
                          A colloid is a mixture where particles are intermediate in size between solutions and
                          suspensions.
                        </p>
                      </div>

                      <div className="bg-purple-100 p-3 rounded mb-4">
                        <h5 className="font-semibold text-purple-800">Key Characteristics:</h5>
                        <ul className="text-purple-700 text-sm mt-2 space-y-1">
                          <li>• Particle size: 1-100 nanometers (medium size)</li>
                          <li>• Appear homogeneous but are actually heterogeneous</li>
                          <li>• Do not settle down</li>
                          <li>• Cannot be separated by ordinary filtration</li>
                          <li>• Show Tyndall effect strongly</li>
                        </ul>
                      </div>

                      <div className="bg-white p-3 rounded border border-purple-200">
                        <h5 className="font-semibold text-purple-800">Examples:</h5>
                        <p className="text-purple-700 text-sm">Milk, butter, fog, smoke, jelly, blood</p>
                      </div>
                    </div>

                    {/* Tyndall Effect */}
                    <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                      <h4 className="font-semibold text-yellow-800 mb-3 flex items-center space-x-2">
                        <Lightbulb className="w-5 h-5" />
                        <span>The Tyndall Effect: Nature's Light Show</span>
                      </h4>
                      <p className="text-yellow-700 mb-3">
                        When light passes through colloids and suspensions, it gets scattered by the particles, making
                        the path of light visible. This is called the Tyndall effect!
                      </p>
                      <div className="bg-white p-3 rounded border-l-4 border-yellow-500">
                        <h5 className="font-semibold text-yellow-800">See it in Nature:</h5>
                        <ul className="text-yellow-700 text-sm mt-1 space-y-1">
                          <li>• Sunlight through fog or dust</li>
                          <li>• Car headlights in fog</li>
                          <li>• Projector beam in a dusty room</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="separation" className="space-y-6">
                {/* Separation Methods */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Filter className="w-6 h-6 text-red-600" />
                      <span>Separation Techniques: The Art of Unmixing</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Teacher's Approach */}
                    <div className="bg-red-50 p-5 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-3">🎯 Choose Your Weapon Wisely!</h4>
                      <p className="text-red-700 leading-relaxed">
                        Imagine you're a chef who accidentally mixed salt with pepper, or a scientist who needs to
                        purify water. How do you separate them? The key is understanding the different properties of the
                        substances - size, solubility, boiling point, density. Each property gives us a different
                        separation technique!
                      </p>
                    </div>

                    {/* Separation Methods */}
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="filtration">
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-800 font-bold">
                              1
                            </div>
                            <span>Filtration - The Size Separator</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-11 space-y-3">
                          <div className="bg-white p-4 rounded-lg border border-red-200">
                            <h5 className="font-semibold text-red-800 mb-2">How it Works:</h5>
                            <p className="text-red-700 text-sm mb-3">
                              Uses a porous barrier (filter paper) to separate particles based on size. Large particles
                              stay behind, small particles pass through.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-red-50 p-3 rounded">
                                <h6 className="font-semibold text-red-800">Best For:</h6>
                                <p className="text-red-700 text-sm">Separating insoluble solids from liquids</p>
                              </div>
                              <div className="bg-red-50 p-3 rounded">
                                <h6 className="font-semibold text-red-800">Examples:</h6>
                                <p className="text-red-700 text-sm">Sand from water, tea leaves from tea</p>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="evaporation">
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-800 font-bold">
                              2
                            </div>
                            <span>Evaporation - The Heat Method</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-11 space-y-3">
                          <div className="bg-white p-4 rounded-lg border border-orange-200">
                            <h5 className="font-semibold text-orange-800 mb-2">How it Works:</h5>
                            <p className="text-orange-700 text-sm mb-3">
                              Heat the solution to evaporate the solvent (usually water), leaving behind the solid
                              solute.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-orange-50 p-3 rounded">
                                <h6 className="font-semibold text-orange-800">Best For:</h6>
                                <p className="text-orange-700 text-sm">Separating dissolved solids from liquids</p>
                              </div>
                              <div className="bg-orange-50 p-3 rounded">
                                <h6 className="font-semibold text-orange-800">Examples:</h6>
                                <p className="text-orange-700 text-sm">Salt from seawater, sugar from sugar water</p>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="distillation">
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                              3
                            </div>
                            <span>Distillation - The Boiling Point Hero</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-11 space-y-3">
                          <div className="bg-white p-4 rounded-lg border border-blue-200">
                            <h5 className="font-semibold text-blue-800 mb-2">How it Works:</h5>
                            <p className="text-blue-700 text-sm mb-3">
                              Heat the mixture to boil the component with lower boiling point, then cool and condense
                              the vapor back to liquid.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-blue-50 p-3 rounded">
                                <h6 className="font-semibold text-blue-800">Best For:</h6>
                                <p className="text-blue-700 text-sm">
                                  Separating liquids with different boiling points
                                </p>
                              </div>
                              <div className="bg-blue-50 p-3 rounded">
                                <h6 className="font-semibold text-blue-800">Examples:</h6>
                                <p className="text-blue-700 text-sm">Pure water from salt water, alcohol from wine</p>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="chromatography">
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-800 font-bold">
                              4
                            </div>
                            <span>Chromatography - The Color Detective</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-11 space-y-3">
                          <div className="bg-white p-4 rounded-lg border border-purple-200">
                            <h5 className="font-semibold text-purple-800 mb-2">How it Works:</h5>
                            <p className="text-purple-700 text-sm mb-3">
                              Components move at different speeds through a medium (like paper) based on their
                              properties, creating separate bands.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-purple-50 p-3 rounded">
                                <h6 className="font-semibold text-purple-800">Best For:</h6>
                                <p className="text-purple-700 text-sm">
                                  Separating colored substances or similar compounds
                                </p>
                              </div>
                              <div className="bg-purple-50 p-3 rounded">
                                <h6 className="font-semibold text-purple-800">Examples:</h6>
                                <p className="text-purple-700 text-sm">Dyes in ink, pigments in leaves</p>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="magnetic">
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">
                              5
                            </div>
                            <span>Magnetic Separation - The Magnet Magic</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-11 space-y-3">
                          <div className="bg-white p-4 rounded-lg border border-green-200">
                            <h5 className="font-semibold text-green-800 mb-2">How it Works:</h5>
                            <p className="text-green-700 text-sm mb-3">
                              Uses a magnet to attract magnetic materials, leaving non-magnetic materials behind.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-green-50 p-3 rounded">
                                <h6 className="font-semibold text-green-800">Best For:</h6>
                                <p className="text-green-700 text-sm">
                                  Separating magnetic from non-magnetic materials
                                </p>
                              </div>
                              <div className="bg-green-50 p-3 rounded">
                                <h6 className="font-semibold text-green-800">Examples:</h6>
                                <p className="text-green-700 text-sm">Iron filings from sand, steel from waste</p>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {/* Quick Reference Guide */}
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3">🎯 Quick Selection Guide</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                          <thead>
                            <tr className="bg-indigo-600 text-white">
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Mixture Type</th>
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Best Method</th>
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Example</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 p-3">Insoluble solid + Liquid</td>
                              <td className="border border-gray-300 p-3">Filtration</td>
                              <td className="border border-gray-300 p-3">Sand + Water</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-3">Soluble solid + Liquid</td>
                              <td className="border border-gray-300 p-3">Evaporation</td>
                              <td className="border border-gray-300 p-3">Salt + Water</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 p-3">Two liquids (different boiling points)</td>
                              <td className="border border-gray-300 p-3">Distillation</td>
                              <td className="border border-gray-300 p-3">Water + Alcohol</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-3">Magnetic + Non-magnetic</td>
                              <td className="border border-gray-300 p-3">Magnetic Separation</td>
                              <td className="border border-gray-300 p-3">Iron + Sulfur</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Assessment Section */}
            <Card className="border-l-4 border-l-green-600">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  <span>Test Your Detective Skills</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">🕵️ Solve These Mysteries</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800">
                          1. You have a mixture of salt, sand, and iron filings. Design a step-by-step method to
                          separate all three.
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>Hint: Think about magnetic properties, solubility, and particle size</em>
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800">
                          2. Why does milk show the Tyndall effect but sugar water doesn't?
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>Hint: Consider particle sizes and types of mixtures</em>
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800">
                          3. A student claims that air is a pure substance because it looks uniform. How would you prove
                          them wrong?
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>Hint: Think about composition and separation possibilities</em>
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
                  <span>Master's Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-yellow-50 p-3 rounded">
                  <h4 className="font-semibold text-yellow-800 text-sm">Memory Trick</h4>
                  <p className="text-yellow-700 text-xs">
                    "SuSCo" - Solutions (smallest), Suspensions (largest), Colloids (in-between)
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <h4 className="font-semibold text-blue-800 text-sm">Tyndall Test</h4>
                  <p className="text-blue-700 text-xs">
                    Shine a flashlight through different liquids at home to see which show the Tyndall effect!
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <h4 className="font-semibold text-green-800 text-sm">Separation Practice</h4>
                  <p className="text-green-700 text-xs">Try paper chromatography with different colored markers</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Reference */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📋 Quick Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Solution particle size:</span>
                    <span>&lt; 1 nm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Colloid particle size:</span>
                    <span>1-100 nm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Suspension particle size:</span>
                    <span>&gt; 100 nm</span>
                  </div>
                  <hr className="my-2" />
                  <div className="text-xs text-gray-600">
                    <p>
                      <strong>Remember:</strong> nm = nanometer (1 billionth of a meter!)
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
                <h4 className="font-semibold text-purple-800 mb-2">Chapter 3: Atoms and Molecules</h4>
                <p className="text-purple-700 text-sm mb-3">
                  We'll dive into the building blocks of matter - atoms and molecules!
                </p>
                <p className="text-xs text-purple-600">
                  <strong>Preview:</strong> What are atoms made of? How do they combine to form molecules?
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
