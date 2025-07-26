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
  Target,
  Users,
  Car,
  Calculator,
  BarChart3,
  Zap,
  Activity,
  ArrowRight,
} from "lucide-react"
import "bootstrap/dist/css/bootstrap.min.css"


export default function Chapter8Notes() {
  const [selectedGraph, setSelectedGraph] = useState("distance-time")

  return (
    <div className="container-fluid min-vh-100 bg-gray-50 px-0">
      {/* Header */}
      <header className="bg-white shadow-sm border-bottom">
        <div className="container px-4 py-4">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h1 className="h4 font-bold text-gray-900">Class 9 Science Notes</h1>
              <p className="text-gray-600">Chapter 8: Motion</p>
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
            {/* CBSE Update Notice */}
            <Alert className="border-orange-200 bg-orange-50">
              <Lightbulb className="w-4 h-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Important:</strong> According to the CBSE Syllabus 2023-24, this chapter has been renumbered as
                Chapter 7 in some textbooks. The content remains the same.
              </AlertDescription>
            </Alert>

            {/* Teacher's Introduction */}
            <Card className="border-l-4 border-l-blue-600">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-800">
                  <Users className="w-5 h-5" />
                  <span>Welcome to the World of Motion!</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-blue-50">
                <p className="text-blue-900 leading-relaxed">
                  <strong>Dear Future Physicists,</strong> Motion is everywhere around us! From the beating of your
                  heart to the rotation of planets, everything in the universe is in constant motion. In this chapter,
                  we'll discover the mathematical language that describes motion and learn to predict how objects move.
                  You'll master the art of reading motion graphs and solve real-world problems using equations of
                  motion. Get ready to see the world through the eyes of a physicist!
                </p>
              </CardContent>
            </Card>

            {/* Learning Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span>Our Motion Mastery Goals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <h4 className="fw-semibold text-dark">By the end of this chapter, you will:</h4>
                    <ul className="list-unstyled">
                      <li className="d-flex align-items-start gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                        <span>Understand that motion is relative and depends on reference frames</span>
                      </li>
                      <li className="d-flex align-items-start gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                        <span>Distinguish between distance and displacement, speed and velocity</span>
                      </li>
                      <li className="d-flex align-items-start gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                        <span>Master the three equations of motion with complete derivations</span>
                      </li>
                      <li className="d-flex align-items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                        <span>Interpret and analyze distance-time and velocity-time graphs</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="bg-warning bg-opacity-10 p-3 rounded border border-warning">
                      <h4 className="fw-semibold text-warning mb-2">🚗 Physics Mindset</h4>
                      <p className="text-warning text-sm">
                        Physics is about finding patterns in nature. Motion follows beautiful mathematical rules that help
                        us predict everything from car crashes to rocket launches. Once you understand these patterns, you
                        can describe any motion in the universe!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content Tabs */}
            <Tabs defaultValue="basics" className="space-y-4">
              <TabsList className="w-full overflow-x-auto flex flex-nowrap gap-2">
                <TabsTrigger value="basics">Motion Basics</TabsTrigger>
                <TabsTrigger value="kinematics">Speed & Velocity</TabsTrigger>
                <TabsTrigger value="graphs">Motion Graphs</TabsTrigger>
                <TabsTrigger value="equations">Equations of Motion</TabsTrigger>
              </TabsList>

              <TabsContent value="basics" className="space-y-6">
                {/* Motion Fundamentals */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Car className="w-6 h-6 text-purple-600" />
                      <span>Understanding Motion: The Fundamentals</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Teacher's Approach */}
                    <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-3">🌍 Motion is Everywhere!</h4>
                      <p className="text-purple-700 mb-3">
                        Right now, as you read this, you're moving at about 30 km/s around the Sun, 220 km/s around our
                        galaxy, and hundreds of km/s through space! Yet you feel perfectly still. This is because motion
                        is relative - it depends on your point of view. Let's explore this fascinating concept!
                      </p>
                      <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                        <p className="text-purple-800 font-medium">
                          Motion is the foundation of all physics - from atoms to galaxies!
                        </p>
                      </div>
                    </div>

                    {/* What is Motion */}
                    <div className="border-2 border-blue-200 rounded-lg p-5 bg-blue-50">
                      <h4 className="font-bold text-blue-800 text-lg mb-3 flex items-center space-x-2">
                        <Activity className="w-6 h-6" />
                        <span>What is Motion?</span>
                      </h4>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <p className="text-lg font-semibold text-blue-900 mb-2">
                          "An object is said to be in motion if it changes its position with respect to time and its
                          surroundings."
                        </p>
                      </div>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="motion-relative">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                🚂
                              </div>
                              <span>Motion is Relative - The Train Example</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <p className="text-blue-700">
                              Imagine you're sitting in a moving train. To you, other passengers appear to be at rest.
                              But to someone standing on the platform, both you and the passengers are in motion. This
                              shows that motion depends on the observer's frame of reference!
                            </p>
                            <div className="bg-blue-100 p-3 rounded">
                              <h5 className="font-semibold text-blue-800">Key Insight:</h5>
                              <p className="text-blue-700 text-sm">
                                There is no absolute rest or absolute motion in the universe. Everything is relative!
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="reference-frame">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                📍
                              </div>
                              <span>Reference Point and Reference Frame</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-blue-200">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="font-semibold text-blue-800 mb-2">Reference Point</h5>
                                  <p className="text-blue-700 text-sm">
                                    A fixed point with respect to which the position of an object is described.
                                  </p>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-blue-800 mb-2">Reference Frame</h5>
                                  <p className="text-blue-700 text-sm">
                                    A coordinate system attached to the reference point.
                                  </p>
                                </div>
                              </div>
                              <div className="mt-3 bg-blue-50 p-3 rounded">
                                <p className="text-blue-800 text-sm">
                                  <strong>Example:</strong> When you say "the school is 2 km from my house," your house
                                  is the reference point.
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    {/* Types of Motion */}
                    <div className="border-2 border-green-200 rounded-lg p-5 bg-green-50">
                      <h4 className="font-bold text-green-800 text-lg mb-3 flex items-center space-x-2">
                        <ArrowRight className="w-6 h-6" />
                        <span>Types of Motion</span>
                      </h4>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="uniform-motion">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">
                                ➡️
                              </div>
                              <span>Uniform Motion</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                              <p className="text-green-700 mb-3">
                                <strong>Definition:</strong> An object is in uniform motion if it travels equal
                                distances in equal intervals of time.
                              </p>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="font-semibold text-green-800">Characteristics:</h5>
                                  <ul className="text-green-700 text-sm mt-1 space-y-1">
                                    <li>• Speed remains constant</li>
                                    <li>• Acceleration is zero</li>
                                    <li>• Distance-time graph is straight</li>
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-green-800">Examples:</h5>
                                  <ul className="text-green-700 text-sm mt-1 space-y-1">
                                    <li>• Car at constant speed</li>
                                    <li>• Clock hands</li>
                                    <li>• Satellite in orbit</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="non-uniform-motion">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">
                                📈
                              </div>
                              <span>Non-Uniform Motion</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                              <p className="text-green-700 mb-3">
                                <strong>Definition:</strong> An object is in non-uniform motion if it travels unequal
                                distances in equal intervals of time.
                              </p>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="font-semibold text-green-800">Characteristics:</h5>
                                  <ul className="text-green-700 text-sm mt-1 space-y-1">
                                    <li>• Speed keeps changing</li>
                                    <li>• Acceleration is non-zero</li>
                                    <li>• Distance-time graph is curved</li>
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-green-800">Examples:</h5>
                                  <ul className="text-green-700 text-sm mt-1 space-y-1">
                                    <li>• Car in city traffic</li>
                                    <li>• Falling apple</li>
                                    <li>• Pendulum motion</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="kinematics" className="space-y-6">
                {/* Speed and Velocity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="w-6 h-6 text-indigo-600" />
                      <span>Speed and Velocity: The Rate of Motion</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Teacher's Approach */}
                    <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-200">
                      <h4 className="font-semibold text-indigo-800 mb-3">⚡ Understanding Rate of Motion</h4>
                      <p className="text-indigo-700 leading-relaxed">
                        Speed and velocity are often confused, but they're different! Speed tells us "how fast," while
                        velocity tells us "how fast and in which direction." It's like the difference between saying
                        "I'm walking at 5 km/h" versus "I'm walking at 5 km/h towards the north." Direction matters in
                        physics!
                      </p>
                    </div>

                    {/* Distance vs Displacement */}
                    <div className="border-2 border-red-200 rounded-lg p-5 bg-red-50">
                      <h4 className="font-bold text-red-800 text-lg mb-3">Distance vs Displacement</h4>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-white p-4 rounded-lg border border-red-200">
                          <h5 className="font-semibold text-red-800 mb-2">Distance</h5>
                          <ul className="text-red-700 text-sm space-y-1">
                            <li>• Total path length covered</li>
                            <li>• Scalar quantity (only magnitude)</li>
                            <li>• Always positive</li>
                            <li>• Depends on actual path taken</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-red-200">
                          <h5 className="font-semibold text-red-800 mb-2">Displacement</h5>
                          <ul className="text-red-700 text-sm space-y-1">
                            <li>• Shortest distance between start and end</li>
                            <li>• Vector quantity (magnitude + direction)</li>
                            <li>• Can be positive, negative, or zero</li>
                            <li>• Independent of path taken</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-red-100 p-3 rounded">
                        <h5 className="font-semibold text-red-800">Example:</h5>
                        <p className="text-red-700 text-sm">
                          A person walks 3 km East, then 4 km North.
                          <br />
                          <strong>Distance:</strong> 3 + 4 = 7 km
                          <br />
                          <strong>Displacement:</strong> √(3² + 4²) = 5 km (northeast direction)
                        </p>
                      </div>
                    </div>

                    {/* Speed vs Velocity */}
                    <div className="border-2 border-blue-200 rounded-lg p-5 bg-blue-50">
                      <h4 className="font-bold text-blue-800 text-lg mb-3">Speed vs Velocity</h4>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <h5 className="font-semibold text-blue-800 mb-2">Speed</h5>
                          <div className="bg-blue-100 p-2 rounded mb-2">
                            <p className="text-blue-800 font-medium">Speed = Distance ÷ Time</p>
                          </div>
                          <ul className="text-blue-700 text-sm space-y-1">
                            <li>• Scalar quantity</li>
                            <li>• Always positive</li>
                            <li>• Unit: m/s, km/h</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <h5 className="font-semibold text-blue-800 mb-2">Velocity</h5>
                          <div className="bg-blue-100 p-2 rounded mb-2">
                            <p className="text-blue-800 font-medium">Velocity = Displacement ÷ Time</p>
                          </div>
                          <ul className="text-blue-700 text-sm space-y-1">
                            <li>• Vector quantity</li>
                            <li>• Can be positive or negative</li>
                            <li>• Unit: m/s (with direction)</li>
                          </ul>
                        </div>
                      </div>

                      <Alert className="border-blue-200 bg-blue-50">
                        <Lightbulb className="w-4 h-4 text-blue-600" />
                        <AlertDescription className="text-blue-800">
                          <strong>Key Insight:</strong> If an object returns to its starting point, displacement = 0, so
                          average velocity = 0. But average speed ≠ 0 because distance was covered!
                        </AlertDescription>
                      </Alert>
                    </div>

                    {/* Acceleration */}
                    <div className="border-2 border-green-200 rounded-lg p-5 bg-green-50">
                      <h4 className="font-bold text-green-800 text-lg mb-3">
                        Acceleration: Rate of Change of Velocity
                      </h4>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <div className="bg-green-100 p-3 rounded mb-3">
                          <p className="text-green-800 font-medium text-center">
                            Acceleration = (Final velocity - Initial velocity) ÷ Time
                          </p>
                          <p className="text-green-800 font-medium text-center">a = (v - u) ÷ t</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-3 rounded border border-green-200">
                          <h5 className="font-semibold text-green-800">Positive Acceleration</h5>
                          <p className="text-green-700 text-sm">Velocity increases (speeding up)</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-green-200">
                          <h5 className="font-semibold text-green-800">Negative Acceleration</h5>
                          <p className="text-green-700 text-sm">Velocity decreases (slowing down)</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-green-200">
                          <h5 className="font-semibold text-green-800">Zero Acceleration</h5>
                          <p className="text-green-700 text-sm">Velocity remains constant</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="graphs" className="space-y-6">
                {/* Motion Graphs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="w-6 h-6 text-teal-600" />
                      <span>Graphical Representation of Motion</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Teacher's Graph Approach */}
                    <div className="bg-teal-50 p-5 rounded-lg border border-teal-200">
                      <h4 className="font-semibold text-teal-800 mb-3">📊 Pictures Tell Stories</h4>
                      <p className="text-teal-700 leading-relaxed">
                        Graphs are like pictures that tell the story of motion. A distance-time graph shows the journey,
                        while a velocity-time graph shows how speed changes. Learning to read these graphs is like
                        learning to read the language of motion itself!
                      </p>
                    </div>

                    {/* Graph Type Selector */}
                    <div className="flex gap-2 mb-6">
                      <button
                        onClick={() => setSelectedGraph("distance-time")}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          selectedGraph === "distance-time"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        Distance-Time Graph
                      </button>
                      <button
                        onClick={() => setSelectedGraph("velocity-time")}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          selectedGraph === "velocity-time"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        Velocity-Time Graph
                      </button>
                    </div>

                    {selectedGraph === "distance-time" && (
                      <div className="border-2 border-blue-200 rounded-lg p-5 bg-blue-50">
                        <h4 className="font-bold text-blue-800 text-lg mb-4">Distance-Time Graph</h4>

                        {/* Simple Graph Visualization */}
                        <div className="bg-white p-6 rounded-lg border border-blue-200 mb-4">
                          <div className="relative h-64 border-l-2 border-b-2 border-gray-400">
                            <div className="absolute bottom-0 left-0 w-full h-full">
                              {/* Y-axis label */}
                              <div className="absolute -left-16 top-1/2 transform -rotate-90 text-sm font-medium text-gray-600">
                                Distance (m)
                              </div>
                              {/* X-axis label */}
                              <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-600">
                                Time (s)
                              </div>

                              {/* Graph lines */}
                              <svg className="w-full h-full">
                                {/* Uniform motion - straight line */}
                                <line x1="0" y1="100%" x2="80%" y2="20%" stroke="#3B82F6" strokeWidth="3" />
                                <text x="85%" y="25%" fill="#3B82F6" fontSize="12">
                                  Uniform Motion
                                </text>

                                {/* Non-uniform motion - curved line */}
                                <path d="M 0 100 Q 40 80 80 10" stroke="#EF4444" strokeWidth="3" fill="none" />
                                <text x="85%" y="15%" fill="#EF4444" fontSize="12">
                                  Non-uniform Motion
                                </text>

                                {/* Rest - horizontal line */}
                                <line x1="0" y1="80%" x2="80%" y2="80%" stroke="#10B981" strokeWidth="3" />
                                <text x="85%" y="80%" fill="#10B981" fontSize="12">
                                  At Rest
                                </text>
                              </svg>
                            </div>
                          </div>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="dt-interpretation">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                  📈
                                </div>
                                <span>Graph Interpretation</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-white p-3 rounded border border-blue-200">
                                  <h5 className="font-semibold text-blue-800">Horizontal Line</h5>
                                  <p className="text-blue-700 text-sm">Object at rest (no motion)</p>
                                </div>
                                <div className="bg-white p-3 rounded border border-blue-200">
                                  <h5 className="font-semibold text-blue-800">Straight Slanted Line</h5>
                                  <p className="text-blue-700 text-sm">Uniform motion (constant speed)</p>
                                </div>
                                <div className="bg-white p-3 rounded border border-blue-200">
                                  <h5 className="font-semibold text-blue-800">Curved Line</h5>
                                  <p className="text-blue-700 text-sm">Non-uniform motion (changing speed)</p>
                                </div>
                              </div>
                              <div className="bg-blue-100 p-3 rounded">
                                <p className="text-blue-800 font-medium">
                                  <strong>Key Point:</strong> The slope of distance-time graph gives speed. Steeper
                                  slope = higher speed.
                                </p>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    )}

                    {selectedGraph === "velocity-time" && (
                      <div className="border-2 border-purple-200 rounded-lg p-5 bg-purple-50">
                        <h4 className="font-bold text-purple-800 text-lg mb-4">Velocity-Time Graph</h4>

                        {/* Simple Graph Visualization */}
                        <div className="bg-white p-6 rounded-lg border border-purple-200 mb-4">
                          <div className="relative h-64 border-l-2 border-b-2 border-gray-400">
                            <div className="absolute bottom-0 left-0 w-full h-full">
                              {/* Y-axis label */}
                              <div className="absolute -left-16 top-1/2 transform -rotate-90 text-sm font-medium text-gray-600">
                                Velocity (m/s)
                              </div>
                              {/* X-axis label */}
                              <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-600">
                                Time (s)
                              </div>

                              {/* Graph lines */}
                              <svg className="w-full h-full">
                                {/* Positive acceleration - upward slope */}
                                <line x1="0" y1="80%" x2="80%" y2="20%" stroke="#3B82F6" strokeWidth="3" />
                                <text x="85%" y="25%" fill="#3B82F6" fontSize="12">
                                  +ve Acceleration
                                </text>

                                {/* Uniform motion - horizontal line */}
                                <line x1="0" y1="50%" x2="80%" y2="50%" stroke="#10B981" strokeWidth="3" />
                                <text x="85%" y="50%" fill="#10B981" fontSize="12">
                                  Uniform Motion
                                </text>

                                {/* Negative acceleration - downward slope */}
                                <line x1="0" y1="30%" x2="80%" y2="70%" stroke="#EF4444" strokeWidth="3" />
                                <text x="85%" y="75%" fill="#EF4444" fontSize="12">
                                  -ve Acceleration
                                </text>
                              </svg>
                            </div>
                          </div>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="vt-interpretation">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-800 font-bold">
                                  📊
                                </div>
                                <span>Graph Analysis</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white p-3 rounded border border-purple-200">
                                  <h5 className="font-semibold text-purple-800">Slope Information</h5>
                                  <ul className="text-purple-700 text-sm mt-1 space-y-1">
                                    <li>• Slope = Acceleration</li>
                                    <li>• Upward slope = +ve acceleration</li>
                                    <li>• Downward slope = -ve acceleration</li>
                                    <li>• Horizontal = Zero acceleration</li>
                                  </ul>
                                </div>
                                <div className="bg-white p-3 rounded border border-purple-200">
                                  <h5 className="font-semibold text-purple-800">Area Information</h5>
                                  <ul className="text-purple-700 text-sm mt-1 space-y-1">
                                    <li>• Area under graph = Displacement</li>
                                    <li>• Rectangle area = base × height</li>
                                    <li>• Triangle area = ½ × base × height</li>
                                    <li>• Total area = Total displacement</li>
                                  </ul>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="equations" className="space-y-6">
                {/* Equations of Motion */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calculator className="w-6 h-6 text-orange-600" />
                      <span>Equations of Motion: The Mathematical Tools</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Teacher's Equation Approach */}
                    <div className="bg-orange-50 p-5 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-800 mb-3">🧮 The Power of Equations</h4>
                      <p className="text-orange-700 leading-relaxed">
                        These three equations are like magic formulas that can predict the future! Give me any three
                        pieces of information about motion (like initial speed, time, and acceleration), and I can tell
                        you everything else - final speed, distance traveled, you name it. Let's master these powerful
                        tools!
                      </p>
                    </div>

                    {/* First Equation */}
                    <div className="border-2 border-red-200 rounded-lg p-5 bg-red-50">
                      <h4 className="font-bold text-red-800 text-lg mb-3">First Equation of Motion</h4>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-red-900 mb-2">v = u + at</p>
                          <p className="text-red-700">
                            Relates final velocity, initial velocity, acceleration, and time
                          </p>
                        </div>
                      </div>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="first-derivation">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-800 font-bold">
                                📝
                              </div>
                              <span>Step-by-Step Derivation</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-red-200">
                              <h5 className="font-semibold text-red-800 mb-3">From the definition of acceleration:</h5>
                              <div className="space-y-2 text-red-700 text-sm">
                                <p>
                                  <strong>Step 1:</strong> Acceleration = Change in velocity ÷ Time taken
                                </p>
                                <p>
                                  <strong>Step 2:</strong> a = (Final velocity - Initial velocity) ÷ Time
                                </p>
                                <p>
                                  <strong>Step 3:</strong> a = (v - u) ÷ t
                                </p>
                                <p>
                                  <strong>Step 4:</strong> Rearranging: a × t = v - u
                                </p>
                                <p>
                                  <strong>Step 5:</strong> Therefore: <strong>v = u + at</strong>
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="first-example">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-800 font-bold">
                                💡
                              </div>
                              <span>Worked Example</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-red-100 p-4 rounded">
                              <h5 className="font-semibold text-red-800 mb-2">Problem:</h5>
                              <p className="text-red-700 text-sm mb-3">
                                A car starts from rest and accelerates at 2 m/s² for 5 seconds. Find its final velocity.
                              </p>
                              <div className="bg-white p-3 rounded">
                                <p className="text-red-800 text-sm">
                                  <strong>Given:</strong> u = 0, a = 2 m/s², t = 5s
                                  <br />
                                  <strong>Using:</strong> v = u + at
                                  <br />
                                  <strong>Solution:</strong> v = 0 + 2×5 = 10 m/s
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    {/* Second Equation */}
                    <div className="border-2 border-blue-200 rounded-lg p-5 bg-blue-50">
                      <h4 className="font-bold text-blue-800 text-lg mb-3">Second Equation of Motion</h4>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-900 mb-2">s = ut + ½at²</p>
                          <p className="text-blue-700">
                            Relates displacement, initial velocity, acceleration, and time
                          </p>
                        </div>
                      </div>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="second-derivation">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                📝
                              </div>
                              <span>Detailed Derivation</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-blue-200">
                              <h5 className="font-semibold text-blue-800 mb-3">Method 1 - Using Average Velocity:</h5>
                              <div className="space-y-2 text-blue-700 text-sm">
                                <p>
                                  <strong>Step 1:</strong> For uniformly accelerated motion, average velocity is:
                                </p>
                                <p>Average velocity = (Initial velocity + Final velocity) ÷ 2</p>
                                <p>Average velocity = (u + v) ÷ 2</p>
                                <p>
                                  <strong>Step 2:</strong> Distance = Average velocity × Time
                                </p>
                                <p>s = [(u + v) ÷ 2] × t</p>
                                <p>
                                  <strong>Step 3:</strong> From first equation: v = u + at
                                </p>
                                <p>Substituting: s = [u + (u + at)]t ÷ 2</p>
                                <p>s = [2u + at]t ÷ 2</p>
                                <p>
                                  <strong>Therefore:</strong> <strong>s = ut + ½at²</strong>
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    {/* Third Equation */}
                    <div className="border-2 border-green-200 rounded-lg p-5 bg-green-50">
                      <h4 className="font-bold text-green-800 text-lg mb-3">Third Equation of Motion</h4>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-900 mb-2">v² = u² + 2as</p>
                          <p className="text-green-700">
                            Relates velocities, acceleration, and displacement (time-independent)
                          </p>
                        </div>
                      </div>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="third-derivation">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">
                                📝
                              </div>
                              <span>Elimination Method Derivation</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                              <h5 className="font-semibold text-green-800 mb-3">
                                Eliminating time from first two equations:
                              </h5>
                              <div className="space-y-2 text-green-700 text-sm">
                                <p>
                                  <strong>Step 1:</strong> From first equation: v = u + at
                                </p>
                                <p>Therefore: t = (v - u) ÷ a</p>
                                <p>
                                  <strong>Step 2:</strong> From second equation: s = ut + ½at²
                                </p>
                                <p>
                                  <strong>Step 3:</strong> Substituting value of t:
                                </p>
                                <p>s = u × [(v - u) ÷ a] + ½a × [(v - u) ÷ a]²</p>
                                <p>
                                  <strong>Step 4:</strong> Simplifying:
                                </p>
                                <p>s = [u(v - u) + ½(v - u)²] ÷ a</p>
                                <p>s = [(v - u)(u + ½(v - u))] ÷ a</p>
                                <p>s = [(v - u)(u + v)] ÷ 2a</p>
                                <p>s = (v² - u²) ÷ 2a</p>
                                <p>
                                  <strong>Therefore:</strong> <strong>v² = u² + 2as</strong>
                                </p>
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
                          <li>• Forgetting to convert units (km/h to m/s)</li>
                          <li>
                            • Using wrong signs for acceleration (upward motion has negative acceleration due to
                            gravity)
                          </li>
                          <li>• Confusing distance with displacement in problems</li>
                          <li>• Not identifying which equation to use based on given information</li>
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
                  <span>Master the Motion</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">🚗 Challenge Yourself</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800">
                          1. A ball is thrown vertically upward with initial velocity 25 m/s. Find maximum height
                          reached. (g = 10 m/s²)
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>Hint: At maximum height, final velocity = 0</em>
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800">
                          2. A car accelerates from 10 m/s to 30 m/s over 100 m. Find acceleration.
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>Hint: Use v² = u² + 2as (time not given)</em>
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800">
                          3. Explain why motion is relative using the train-platform example.
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>Hint: Consider different reference frames</em>
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
                  <h4 className="font-semibold text-yellow-800 text-sm">Equation Selection</h4>
                  <p className="text-yellow-700 text-xs">
                    Choose equation based on what's NOT given: No time? Use v² = u² + 2as
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <h4 className="font-semibold text-blue-800 text-sm">Graph Reading</h4>
                  <p className="text-blue-700 text-xs">
                    Distance-time: slope = speed. Velocity-time: slope = acceleration, area = displacement
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <h4 className="font-semibold text-green-800 text-sm">Sign Convention</h4>
                  <p className="text-green-700 text-xs">Upward/forward = positive, Downward/backward = negative</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Reference */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📋 Motion Formulas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="bg-gray-50 p-2 rounded">
                    <strong>v = u + at</strong>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <strong>s = ut + ½at²</strong>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <strong>v² = u² + 2as</strong>
                  </div>
                  <hr className="my-2" />
                  <div className="text-xs text-gray-600">
                    <p>
                      <strong>Speed:</strong> Distance ÷ Time
                    </p>
                    <p>
                      <strong>Velocity:</strong> Displacement ÷ Time
                    </p>
                    <p>
                      <strong>Acceleration:</strong> (v - u) ÷ t
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
                <h4 className="font-semibold text-purple-800 mb-2">Chapter 9: Force and Laws of Motion</h4>
                <p className="text-purple-700 text-sm mb-3">
                  We'll discover what causes motion and learn Newton's revolutionary laws!
                </p>
                <p className="text-xs text-purple-600">
                  <strong>Preview:</strong> Why do objects move? What stops them? How do rockets work?
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <AskDoubtFloater />
    </div>
  );
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