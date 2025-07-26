"use client"

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
  Microscope,
  ThermometerSun,
} from "lucide-react"
import "bootstrap/dist/css/bootstrap.min.css"
export default function ProfessionalScienceNotes() {
  const [selectedConcept, setSelectedConcept] = useState("introduction")

  return (
    <div className="container-fluid min-vh-100 bg-gray-50 px-0">
      {/* Header */}
      <header className="bg-white shadow-sm border-bottom">
        <div className="container px-3 px-sm-4 py-3 py-sm-4">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div className="flex-grow-1 min-w-0">
              <h1 className="h4 h3-sm font-bold text-gray-900 text-truncate">Class 9 Science Notes</h1>
              <p className="text-sm text-base-sm text-gray-600 text-truncate">Chapter 1: Matter Forced in Our Surroundings</p>
            </div>
            <Badge variant="outline" className="text-xs text-sm-sm flex-shrink-0">
              <BookOpen className="w-3 h-3 w-sm-4 h-sm-4 mr-1" />
              CBSE Curriculum
            </Badge>
          </div>
        </div>
      </header>

      <div className="container px-3 px-sm-4 py-4 py-sm-6">
        <div className="row g-4 g-sm-6">
          {/* Main Content */}
          <div className="col-12 col-lg-9 space-y-4 space-y-sm-6">
            {/* Teacher's Introduction */}
            <Card className="border-l-4 border-l-blue-600">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center space-x-2 text-blue-800 text-lg sm:text-xl">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>Teacher's Note</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-blue-50 pt-0">
                <p className="text-blue-900 leading-relaxed text-sm sm:text-base">
                  <strong>Dear Students,</strong> In my 25+ years of teaching science, I've seen that Chapter 1 is where
                  students either fall in love with science or get confused by abstract concepts. Today, we'll build
                  your understanding step by step, just like constructing a building - starting with a strong
                  foundation. Remember, science is all around you - from the air you breathe to the water you drink.
                  Let's explore together!
                </p>
              </CardContent>
            </Card>

            {/* Learning Objectives - Teacher Style */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                  <span>What We'll Master Today</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                      By the end of this lesson, you will:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Understand why everything around us is called 'matter'</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Explain the particle nature of matter with confidence</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Distinguish between solids, liquids, and gases scientifically</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Predict and explain changes of state in daily life</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 sm:p-4 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-2 text-sm sm:text-base">🎯 Success Tip</h4>
                    <p className="text-amber-700 text-sm">
                      Don't just memorize - visualize! Every time you learn a concept, think of 3 examples from your
                      daily life. This is how you'll remember it forever.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content Tabs */}
            <Tabs defaultValue="foundation" className="space-y-4">
              <TabsList className="w-full overflow-x-auto flex flex-nowrap gap-2">
                <TabsTrigger value="foundation" className="text-xs sm:text-sm px-2 py-2">
                  Foundation
                </TabsTrigger>
                <TabsTrigger value="particles" className="text-xs sm:text-sm px-2 py-2">
                  Particle Theory
                </TabsTrigger>
                <TabsTrigger value="states" className="text-xs sm:text-sm px-2 py-2">
                  States of Matter
                </TabsTrigger>
                <TabsTrigger value="changes" className="text-xs sm:text-sm px-2 py-2">
                  State Changes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="foundation" className="space-y-4 sm:space-y-6">
                {/* Building the Foundation */}
                <Card>
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                      <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0" />
                      <span>Building Our Foundation: What is Matter?</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6 pt-0">
                    {/* Teacher's Approach */}
                    <div className="bg-purple-50 p-4 sm:p-5 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-3 text-sm sm:text-base">
                        🧠 Let's Think Together
                      </h4>
                      <p className="text-purple-700 mb-3 text-sm sm:text-base leading-relaxed">
                        Before we define matter, let me ask you something: Look around your classroom right now. What do
                        you see? Your desk, the air you're breathing, the water in your bottle, even you yourself - what
                        do all these have in common?
                      </p>
                      <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                        <p className="text-purple-800 font-medium text-sm sm:text-base">
                          They all take up space and have weight. This is our first clue to understanding matter!
                        </p>
                      </div>
                    </div>

                    {/* Scientific Definition */}
                    <div className="border-2 border-blue-200 rounded-lg p-4 sm:p-5 bg-blue-50">
                      <h4 className="font-bold text-blue-800 text-base sm:text-lg mb-3">📚 Scientific Definition</h4>
                      <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                        <p className="text-base sm:text-lg font-semibold text-blue-900 mb-2">
                          Matter is anything that has mass and occupies space (volume).
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                          <div className="bg-blue-100 p-3 rounded">
                            <h5 className="font-semibold text-blue-800 text-sm sm:text-base">Mass</h5>
                            <p className="text-blue-700 text-sm">
                              The amount of matter in an object. We feel this as weight.
                            </p>
                          </div>
                          <div className="bg-blue-100 p-3 rounded">
                            <h5 className="font-semibold text-blue-800 text-sm sm:text-base">Volume</h5>
                            <p className="text-blue-700 text-sm">
                              The space occupied by matter. Even air takes up space!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Common Student Misconceptions */}
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                      <AlertDescription>
                        <strong className="text-red-800">Common Student Mistake:</strong>
                        <p className="text-red-700 mt-1 text-sm sm:text-base">
                          "Air is not matter because we can't see it." This is wrong! Air has mass (a balloon filled
                          with air weighs more than an empty one) and occupies space (you can't put two things in the
                          same space).
                        </p>
                      </AlertDescription>
                    </Alert>

                    {/* Classroom Activity */}
                    <div className="bg-green-50 p-4 sm:p-5 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center space-x-2 text-sm sm:text-base">
                        <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <span>Try This at Home</span>
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded border-l-4 border-green-500">
                          <h5 className="font-semibold text-green-800 text-sm sm:text-base">
                            Experiment 1: Proving Air Has Mass
                          </h5>
                          <p className="text-green-700 text-sm mt-1">
                            Take two identical balloons. Blow up one and leave the other empty. Balance them on a ruler.
                            The inflated balloon will be heavier - proving air has mass!
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded border-l-4 border-green-500">
                          <h5 className="font-semibold text-green-800 text-sm sm:text-base">
                            Experiment 2: Proving Air Occupies Space
                          </h5>
                          <p className="text-green-700 text-sm mt-1">
                            Push an empty glass upside down into water. Water won't fill it completely because air is
                            taking up space inside!
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="particles" className="space-y-4 sm:space-y-6">
                {/* Particle Theory */}
                <Card>
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                      <Microscope className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 flex-shrink-0" />
                      <span>The Particle Theory of Matter</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6 pt-0">
                    {/* Teacher's Story Approach */}
                    <div className="bg-indigo-50 p-4 sm:p-5 rounded-lg border border-indigo-200">
                      <h4 className="font-semibold text-indigo-800 mb-3 text-sm sm:text-base">
                        📖 The Story of Discovery
                      </h4>
                      <p className="text-indigo-700 leading-relaxed text-sm sm:text-base">
                        Imagine you're a detective trying to solve a mystery: "What is matter made of?" Ancient Greek
                        philosophers like Democritus (460 BC) first proposed that everything is made of tiny, invisible
                        particles called "atoms" (meaning "indivisible"). For over 2000 years, this remained just an
                        idea. Today, with powerful microscopes, we can actually see these particles!
                      </p>
                    </div>

                    {/* The Five Key Ideas */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-800 text-base sm:text-lg">
                        🔑 Five Key Ideas About Particles
                      </h4>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="idea1">
                          <AccordionTrigger className="text-left px-2 sm:px-4">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-content-center text-blue-800 font-bold text-xs sm:text-sm flex-shrink-0">
                                1
                              </div>
                              <span className="text-sm sm:text-base">All matter is made of tiny particles</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-2 sm:px-4 pb-4">
                            <div className="pl-8 sm:pl-11 space-y-3">
                              <p className="text-gray-700 text-sm sm:text-base">
                                Everything around you - your pencil, the air, water - is made of extremely small
                                particles. These particles are so small that millions of them can fit on the tip of a
                                needle!
                              </p>
                              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                                <h5 className="font-semibold text-blue-800 text-sm sm:text-base">
                                  Real-Life Connection:
                                </h5>
                                <p className="text-blue-700 text-sm">
                                  When you smell food cooking from the kitchen, it's because tiny particles of the food
                                  are traveling through air to your nose!
                                </p>
                              </div>
                              <Alert className="border-amber-200 bg-amber-50">
                                <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                <AlertDescription className="text-amber-800 text-sm">
                                  <strong>Memory Tip:</strong> Think of particles like LEGO blocks - everything is built
                                  from these tiny building blocks, but the blocks themselves are invisible to our eyes.
                                </AlertDescription>
                              </Alert>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="idea2">
                          <AccordionTrigger className="text-left px-2 sm:px-4">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-content-center text-green-800 font-bold text-xs sm:text-sm flex-shrink-0">
                                2
                              </div>
                              <span className="text-sm sm:text-base">Particles are in constant motion</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-2 sm:px-4 pb-4">
                            <div className="pl-8 sm:pl-11 space-y-3">
                              <p className="text-gray-700 text-sm sm:text-base">
                                Even when you're sitting still, the particles inside you are moving constantly! This
                                motion never stops - it's happening right now as you read this.
                              </p>
                              <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                                <h5 className="font-semibold text-green-800 text-sm sm:text-base">
                                  Evidence You Can See:
                                </h5>
                                <p className="text-green-700 text-sm">
                                  Put a drop of food coloring in still water. Watch it spread without stirring - that's
                                  particles moving!
                                </p>
                              </div>
                              <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                                <h5 className="font-semibold text-yellow-800 text-sm sm:text-base">
                                  Teacher's Insight:
                                </h5>
                                <p className="text-yellow-700 text-sm">
                                  Students often ask: "If particles are always moving, why doesn't my desk move?" Great
                                  question! The particles vibrate in place in solids - like people dancing in a crowded
                                  room without changing positions.
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="idea3">
                          <AccordionTrigger className="text-left px-2 sm:px-4">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-content-center text-purple-800 font-bold text-xs sm:text-sm flex-shrink-0">
                                3
                              </div>
                              <span className="text-sm sm:text-base">Particles have spaces between them</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-2 sm:px-4 pb-4">
                            <div className="pl-8 sm:pl-11 space-y-3">
                              <p className="text-gray-700 text-sm sm:text-base">
                                Matter isn't completely "solid" - there are empty spaces between particles. This is why
                                we can compress gases and why liquids can mix.
                              </p>
                              <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                                <h5 className="font-semibold text-purple-800 text-sm sm:text-base">Amazing Fact:</h5>
                                <p className="text-purple-700 text-sm">
                                  If an atom were the size of a football stadium, the nucleus would be like a marble at
                                  the center - most of an atom is empty space!
                                </p>
                              </div>
                              <div className="bg-white p-3 rounded border border-gray-200">
                                <h5 className="font-semibold text-gray-800 text-sm sm:text-base">
                                  Classroom Demonstration:
                                </h5>
                                <p className="text-gray-700 text-sm">
                                  Mix 50ml water + 50ml alcohol. You get less than 100ml total! Alcohol particles fit
                                  into spaces between water particles.
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="idea4">
                          <AccordionTrigger className="text-left px-2 sm:px-4">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-content-center text-red-800 font-bold text-xs sm:text-sm flex-shrink-0">
                                4
                              </div>
                              <span className="text-sm sm:text-base">Particles attract each other</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-2 sm:px-4 pb-4">
                            <div className="pl-8 sm:pl-11 space-y-3">
                              <p className="text-gray-700 text-sm sm:text-base">
                                Particles have forces that pull them together (like invisible magnets). These forces are
                                called intermolecular forces.
                              </p>
                              <div className="bg-red-50 p-3 rounded border-l-4 border-red-500">
                                <h5 className="font-semibold text-red-800 text-sm sm:text-base">Why This Matters:</h5>
                                <p className="text-red-700 text-sm">
                                  Without these forces, everything would be gas! These forces hold solids and liquids
                                  together.
                                </p>
                              </div>
                              <Alert className="border-orange-200 bg-orange-50">
                                <AlertTriangle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                                <AlertDescription className="text-orange-800 text-sm">
                                  <strong>Don't Confuse:</strong> These are NOT the same as gravitational force or
                                  magnetic force. These are special forces between molecules.
                                </AlertDescription>
                              </Alert>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="idea5">
                          <AccordionTrigger className="text-left px-2 sm:px-4">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-100 rounded-full flex items-center justify-content-center text-teal-800 font-bold text-xs sm:text-sm flex-shrink-0">
                                5
                              </div>
                              <span className="text-sm sm:text-base">Particle motion increases with temperature</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-2 sm:px-4 pb-4">
                            <div className="pl-8 sm:pl-11 space-y-3">
                              <p className="text-gray-700 text-sm sm:text-base">
                                Heat is actually the energy of moving particles! When you heat something, particles move
                                faster. When you cool it, they slow down.
                              </p>
                              <div className="bg-teal-50 p-3 rounded border-l-4 border-teal-500">
                                <h5 className="font-semibold text-teal-800 text-sm sm:text-base">
                                  Connect to Daily Life:
                                </h5>
                                <p className="text-teal-700 text-sm">
                                  This is why ice melts when heated (particles move faster and break free) and why steam
                                  condenses when cooled (particles slow down and come together).
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="states" className="space-y-4 sm:space-y-6">
                {/* States of Matter */}
                <Card>
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                      <ThermometerSun className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 flex-shrink-0" />
                      <span>The Three States of Matter</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6 pt-0">
                    {/* Teacher's Approach to States */}
                    <div className="bg-orange-50 p-4 sm:p-5 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-800 mb-3 text-sm sm:text-base">
                        🎭 Think of States as Different Personalities
                      </h4>
                      <p className="text-orange-700 text-sm sm:text-base">
                        Imagine particles as people in different situations: In a solid, they're like people in a
                        crowded elevator - close together, can only vibrate in place. In a liquid, they're like people
                        at a party - close but can move around each other. In a gas, they're like people in a huge empty
                        field - far apart and moving freely in all directions.
                      </p>
                    </div>

                    {/* Detailed State Analysis */}
                    <div className="space-y-4 sm:space-y-6">
                      {/* Solids */}
                      <div className="border-2 border-blue-200 rounded-lg p-4 sm:p-5 bg-blue-50">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="text-2xl sm:text-3xl">🧊</div>
                          <div>
                            <h4 className="text-lg sm:text-xl font-bold text-blue-800">SOLIDS</h4>
                            <p className="text-blue-600 text-sm sm:text-base">The "Disciplined" State</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                          <div className="bg-white p-3 sm:p-4 rounded-lg">
                            <h5 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">Particle Behavior</h5>
                            <ul className="text-blue-700 text-sm space-y-1">
                              <li>• Tightly packed in regular patterns</li>
                              <li>• Vibrate about fixed positions</li>
                              <li>• Strong intermolecular forces</li>
                              <li>• Lowest kinetic energy</li>
                            </ul>
                          </div>
                          <div className="bg-white p-3 sm:p-4 rounded-lg">
                            <h5 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">
                              Observable Properties
                            </h5>
                            <ul className="text-blue-700 text-sm space-y-1">
                              <li>• Definite shape and volume</li>
                              <li>• Cannot be compressed easily</li>
                              <li>• Do not flow</li>
                              <li>• High density</li>
                            </ul>
                          </div>
                        </div>

                        <div className="mt-4 bg-blue-100 p-3 rounded">
                          <h5 className="font-semibold text-blue-800 text-sm sm:text-base">
                            Why Solids Behave This Way:
                          </h5>
                          <p className="text-blue-700 text-sm">
                            Strong intermolecular forces act like invisible chains, keeping particles in fixed
                            positions. They can only vibrate, not move freely.
                          </p>
                        </div>
                      </div>

                      {/* Liquids */}
                      <div className="border-2 border-green-200 rounded-lg p-4 sm:p-5 bg-green-50">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="text-2xl sm:text-3xl">💧</div>
                          <div>
                            <h4 className="text-lg sm:text-xl font-bold text-green-800">LIQUIDS</h4>
                            <p className="text-green-600 text-sm sm:text-base">The "Flexible" State</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                          <div className="bg-white p-3 sm:p-4 rounded-lg">
                            <h5 className="font-semibold text-green-800 mb-2 text-sm sm:text-base">
                              Particle Behavior
                            </h5>
                            <ul className="text-green-700 text-sm space-y-1">
                              <li>• Closely packed but irregular arrangement</li>
                              <li>• Can slide past each other</li>
                              <li>• Moderate intermolecular forces</li>
                              <li>• Moderate kinetic energy</li>
                            </ul>
                          </div>
                          <div className="bg-white p-3 sm:p-4 rounded-lg">
                            <h5 className="font-semibold text-green-800 mb-2 text-sm sm:text-base">
                              Observable Properties
                            </h5>
                            <ul className="text-green-700 text-sm space-y-1">
                              <li>• Definite volume, no definite shape</li>
                              <li>• Slightly compressible</li>
                              <li>• Can flow (fluid)</li>
                              <li>• Medium density</li>
                            </ul>
                          </div>
                        </div>

                        <div className="mt-4 bg-green-100 p-3 rounded">
                          <h5 className="font-semibold text-green-800 text-sm sm:text-base">
                            Why Liquids Behave This Way:
                          </h5>
                          <p className="text-green-700 text-sm">
                            Intermolecular forces are weaker than in solids, so particles can move around each other but
                            are still attracted enough to stay together.
                          </p>
                        </div>
                      </div>

                      {/* Gases */}
                      <div className="border-2 border-purple-200 rounded-lg p-4 sm:p-5 bg-purple-50">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="text-2xl sm:text-3xl">💨</div>
                          <div>
                            <h4 className="text-lg sm:text-xl font-bold text-purple-800">GASES</h4>
                            <p className="text-purple-600 text-sm sm:text-base">The "Free" State</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                          <div className="bg-white p-3 sm:p-4 rounded-lg">
                            <h5 className="font-semibold text-purple-800 mb-2 text-sm sm:text-base">
                              Particle Behavior
                            </h5>
                            <ul className="text-purple-700 text-sm space-y-1">
                              <li>• Far apart, random arrangement</li>
                              <li>• Move rapidly in all directions</li>
                              <li>• Very weak intermolecular forces</li>
                              <li>• Highest kinetic energy</li>
                            </ul>
                          </div>
                          <div className="bg-white p-3 sm:p-4 rounded-lg">
                            <h5 className="font-semibold text-purple-800 mb-2 text-sm sm:text-base">
                              Observable Properties
                            </h5>
                            <ul className="text-purple-700 text-sm space-y-1">
                              <li>• No definite shape or volume</li>
                              <li>• Highly compressible</li>
                              <li>• Flow and expand to fill container</li>
                              <li>• Low density</li>
                            </ul>
                          </div>
                        </div>

                        <div className="mt-4 bg-purple-100 p-3 rounded">
                          <h5 className="font-semibold text-purple-800 text-sm sm:text-base">
                            Why Gases Behave This Way:
                          </h5>
                          <p className="text-purple-700 text-sm">
                            Intermolecular forces are so weak that particles move independently. High kinetic energy
                            overcomes any attraction between particles.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Common Misconceptions */}
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                      <AlertDescription>
                        <strong className="text-red-800">Address This Misconception:</strong>
                        <p className="text-red-700 mt-1 text-sm sm:text-base">
                          Students often think: "Gases have no mass because they're invisible." Wrong! A balloon filled
                          with helium is lighter than air, but it still has mass. We can weigh gases using sensitive
                          balances.
                        </p>
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="changes" className="space-y-4 sm:space-y-6">
                {/* State Changes */}
                <Card>
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                      <ThermometerSun className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0" />
                      <span>Changes of State</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6 pt-0">
                    {/* Teacher's Explanation */}
                    <div className="bg-red-50 p-4 sm:p-5 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-3 text-sm sm:text-base">
                        🌡️ The Temperature-Energy Connection
                      </h4>
                      <p className="text-red-700 leading-relaxed text-sm sm:text-base">
                        Here's the key insight: Temperature is just a measure of how fast particles are moving! When you
                        heat ice, you're giving energy to water particles. They vibrate faster and faster until they
                        break free from their fixed positions - that's melting! When you cool steam, you're taking
                        energy away, so particles slow down and come closer together.
                      </p>
                    </div>

                    {/* The Six State Changes */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-800 text-base sm:text-lg">
                        🔄 The Six Ways Matter Changes State
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Heating Processes */}
                        <div className="bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-200">
                          <h5 className="font-bold text-orange-800 mb-3 flex items-center space-x-2 text-sm sm:text-base">
                            <span>🔥</span>
                            <span>Adding Heat Energy</span>
                          </h5>

                          <div className="space-y-3">
                            <div className="bg-white p-3 rounded border-l-4 border-orange-500">
                              <h6 className="font-semibold text-orange-800 text-sm sm:text-base">
                                1. Melting (Fusion)
                              </h6>
                              <p className="text-orange-700 text-sm">Solid → Liquid</p>
                              <p className="text-orange-600 text-xs mt-1">
                                <strong>Example:</strong> Ice → Water at 0°C
                                <br />
                                <strong>What happens:</strong> Particles gain enough energy to break free from fixed
                                positions
                              </p>
                            </div>

                            <div className="bg-white p-3 rounded border-l-4 border-orange-500">
                              <h6 className="font-semibold text-orange-800 text-sm sm:text-base">2. Vaporization</h6>
                              <p className="text-orange-700 text-sm">Liquid → Gas</p>
                              <p className="text-orange-600 text-xs mt-1">
                                <strong>Example:</strong> Water → Steam at 100°C
                                <br />
                                <strong>What happens:</strong> Particles gain enough energy to completely separate
                              </p>
                            </div>

                            <div className="bg-white p-3 rounded border-l-4 border-orange-500">
                              <h6 className="font-semibold text-orange-800 text-sm sm:text-base">3. Sublimation</h6>
                              <p className="text-orange-700 text-sm">Solid → Gas (directly)</p>
                              <p className="text-orange-600 text-xs mt-1">
                                <strong>Example:</strong> Dry ice, camphor, naphthalene
                                <br />
                                <strong>What happens:</strong> Particles jump directly from fixed positions to free
                                movement
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Cooling Processes */}
                        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                          <h5 className="font-bold text-blue-800 mb-3 flex items-center space-x-2 text-sm sm:text-base">
                            <span>❄️</span>
                            <span>Removing Heat Energy</span>
                          </h5>

                          <div className="space-y-3">
                            <div className="bg-white p-3 rounded border-l-4 border-blue-500">
                              <h6 className="font-semibold text-blue-800 text-sm sm:text-base">
                                4. Freezing (Solidification)
                              </h6>
                              <p className="text-blue-700 text-sm">Liquid → Solid</p>
                              <p className="text-blue-600 text-xs mt-1">
                                <strong>Example:</strong> Water → Ice at 0°C
                                <br />
                                <strong>What happens:</strong> Particles lose energy and get locked into fixed positions
                              </p>
                            </div>

                            <div className="bg-white p-3 rounded border-l-4 border-blue-500">
                              <h6 className="font-semibold text-blue-800 text-sm sm:text-base">5. Condensation</h6>
                              <p className="text-blue-700 text-sm">Gas → Liquid</p>
                              <p className="text-blue-600 text-xs mt-1">
                                <strong>Example:</strong> Steam → Water droplets
                                <br />
                                <strong>What happens:</strong> Particles slow down and come closer together
                              </p>
                            </div>

                            <div className="bg-white p-3 rounded border-l-4 border-blue-500">
                              <h6 className="font-semibold text-blue-800 text-sm sm:text-base">6. Deposition</h6>
                              <p className="text-blue-700 text-sm">Gas → Solid (directly)</p>
                              <p className="text-blue-600 text-xs mt-1">
                                <strong>Example:</strong> Frost formation
                                <br />
                                <strong>What happens:</strong> Particles jump directly from free movement to fixed
                                positions
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Real-World Applications */}
                    <div className="bg-green-50 p-4 sm:p-5 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-3 text-sm sm:text-base">
                        🌍 See It in Your Daily Life
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h5 className="font-semibold text-green-800 text-sm sm:text-base">Morning Examples:</h5>
                          <ul className="text-green-700 text-sm space-y-1">
                            <li>• Dew on grass (condensation)</li>
                            <li>• Ice cubes melting in your drink</li>
                            <li>• Steam from hot tea</li>
                            <li>• Butter melting on toast</li>
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-semibold text-green-800 text-sm sm:text-base">Kitchen Science:</h5>
                          <ul className="text-green-700 text-sm space-y-1">
                            <li>• Water boiling for pasta</li>
                            <li>• Chocolate melting</li>
                            <li>• Freezing water to make ice</li>
                            <li>• Camphor tablets disappearing</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Assessment Section */}
            <Card className="border-l-4 border-l-green-600">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center space-x-2 text-green-800 text-lg sm:text-xl">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>Check Your Understanding</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3 text-sm sm:text-base">🤔 Think and Explain</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800 text-sm sm:text-base">
                          1. Why can you smell perfume from across the room?
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>Hint: Think about particle movement and spaces between air particles</em>
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800 text-sm sm:text-base">
                          2. Why does a solid have a definite shape but a liquid doesn't?
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>Hint: Compare the strength of intermolecular forces</em>
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800 text-sm sm:text-base">
                          3. Explain why we can compress a gas but not a solid.
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>Hint: Think about spaces between particles</em>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="col-12 col-lg-3 space-y-4 hidden lg:block">
            {/* Study Tips */}
            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <span>Study Smart</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <div className="bg-yellow-50 p-3 rounded">
                  <h4 className="font-semibold text-yellow-800 text-sm">Memory Technique</h4>
                  <p className="text-yellow-700 text-xs">
                    Remember "SLG" - Solid (Strong forces), Liquid (Loose forces), Gas (Gone forces)
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <h4 className="font-semibold text-blue-800 text-sm">Visual Learning</h4>
                  <p className="text-blue-700 text-xs">Draw particle diagrams for each state. This helps in exams!</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <h4 className="font-semibold text-green-800 text-sm">Practice Tip</h4>
                  <p className="text-green-700 text-xs">Find 5 examples of each state change in your home</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Reference */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">📋 Quick Reference</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Melting Point of Ice:</span>
                    <span>0°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Boiling Point of Water:</span>
                    <span>100°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Room Temperature:</span>
                    <span>25°C</span>
                  </div>
                  <hr className="my-2" />
                  <div className="text-xs text-gray-600">
                    <p>
                      <strong>Remember:</strong> These values are at standard atmospheric pressure (1 atm)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Chapter Preview */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">🔮 Coming Next</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <h4 className="font-semibold text-purple-800 mb-2">Chapter 2: Is Matter Around Us Pure?</h4>
                <p className="text-purple-700 text-sm mb-3">
                  We'll explore mixtures, solutions, and how to separate different substances.
                </p>
                <p className="text-xs text-purple-600">
                  <strong>Preview:</strong> Why is seawater salty? How do we get pure salt from it?
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
