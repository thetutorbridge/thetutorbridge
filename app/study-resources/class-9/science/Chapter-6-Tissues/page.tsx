"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Lightbulb,
  CheckCircle,
  Target,
  Users,
  Zap,
  Activity,
  Layers,
  TreePine,
  Heart,
  Brain,
  BoneIcon as Muscle,
  Shield,
} from "lucide-react"

export default function Chapter6Notes() {
  const [selectedTissueType, setSelectedTissueType] = useState("plant")

  type PlantTissueKey = "meristematic" | "parenchyma" | "collenchyma" | "sclerenchyma" | "xylem" | "phloem";
  type AnimalTissueKey = "epithelial" | "connective" | "muscular" | "nervous";
  const [selectedPlantTissue, setSelectedPlantTissue] = useState<PlantTissueKey>("meristematic")
  const [selectedAnimalTissue, setSelectedAnimalTissue] = useState<AnimalTissueKey>("epithelial")

  const plantTissues: Record<PlantTissueKey, {
    name: string;
    color: string;
    textColor: string;
    description: string;
    types: string[];
  }> = {
    meristematic: {
      name: "Meristematic Tissue",
      color: "bg-green-100 border-green-200",
      textColor: "text-green-800",
      description: "Growing tissues with actively dividing cells",
      types: ["Apical", "Lateral", "Intercalary"],
    },
    parenchyma: {
      name: "Parenchyma",
      color: "bg-blue-100 border-blue-200",
      textColor: "text-blue-800",
      description: "Living cells for storage and photosynthesis",
      types: ["Storage", "Photosynthetic", "Aerenchyma"],
    },
    collenchyma: {
      name: "Collenchyma",
      color: "bg-yellow-100 border-yellow-200",
      textColor: "text-yellow-800",
      description: "Living cells providing flexible support",
      types: ["Angular", "Lamellar", "Lacunar"],
    },
    sclerenchyma: {
      name: "Sclerenchyma",
      color: "bg-red-100 border-red-200",
      textColor: "text-red-800",
      description: "Dead cells providing rigid support",
      types: ["Fibers", "Sclereids"],
    },
    xylem: {
      name: "Xylem",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-800",
      description: "Complex tissue for water transport",
      types: ["Tracheids", "Vessels", "Xylem parenchyma", "Xylem fibers"],
    },
    phloem: {
      name: "Phloem",
      color: "bg-orange-100 border-orange-200",
      textColor: "text-orange-800",
      description: "Complex tissue for food transport",
      types: ["Sieve tubes", "Companion cells", "Phloem parenchyma", "Phloem fibers"],
    },
  }

  const animalTissues = {
    epithelial: {
      name: "Epithelial Tissue",
      color: "bg-pink-100 border-pink-200",
      textColor: "text-pink-800",
      description: "Covering and lining tissue",
      types: ["Simple squamous", "Cuboidal", "Columnar", "Stratified"],
      functions: ["Protection", "Absorption", "Secretion", "Sensation"],
    },
    connective: {
      name: "Connective Tissue",
      color: "bg-indigo-100 border-indigo-200",
      textColor: "text-indigo-800",
      description: "Supporting and connecting tissue",
      types: ["Blood", "Bone", "Cartilage", "Adipose", "Areolar"],
      functions: ["Support", "Protection", "Transport", "Storage"],
    },
    muscular: {
      name: "Muscular Tissue",
      color: "bg-red-100 border-red-200",
      textColor: "text-red-800",
      description: "Contractile tissue for movement",
      types: ["Skeletal", "Cardiac", "Smooth"],
      functions: ["Movement", "Posture", "Heat generation"],
    },
    nervous: {
      name: "Nervous Tissue",
      color: "bg-yellow-100 border-yellow-200",
      textColor: "text-yellow-800",
      description: "Control and coordination tissue",
      types: ["Neurons", "Neuroglia"],
      functions: ["Signal transmission", "Control", "Coordination"],
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Class 9 Science Notes</h1>
              <p className="text-gray-600">Chapter 6: Tissues</p>
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
            <Card className="border-l-4 border-l-emerald-600">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-emerald-800">
                  <Users className="w-5 h-5" />
                  <span>Welcome to the World of Teamwork!</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-emerald-50">
                <p className="text-emerald-900 leading-relaxed">
                  <strong>Dear Tissue Explorers,</strong> Today we're discovering one of nature's most brilliant
                  inventions - TEAMWORK! Just like how students in a class work together for a school project, cells
                  team up to form tissues. Imagine millions of cells saying "Let's work together!" Some become the
                  strong support team, others become the transport crew, and some become the protection squad. In my
                  years of teaching, I've seen students amazed when they realize that their own body is made of
                  different tissue teams, each with specialized jobs. From the protective skin to the powerful muscles,
                  from the transport highways in plants to the coordination networks in animals - tissues make
                  multicellular life possible!
                </p>
              </CardContent>
            </Card>

            {/* Learning Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span>Our Tissue Discovery Mission</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">By the end of this chapter, you will:</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Understand what tissues are and why they form</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Classify and identify different plant tissues</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Recognize the four main types of animal tissues</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Connect tissue structure to their specific functions</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                    <h4 className="font-semibold text-teal-800 mb-2">🌟 Amazing Tissue Facts</h4>
                    <p className="text-teal-700 text-sm">
                      Your heart beats about 100,000 times per day using cardiac muscle tissue! A single nerve signal
                      can travel at speeds up to 120 meters per second through nervous tissue. Plant xylem can lift
                      water over 100 meters high in tall trees!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Main Content Tabs (Bootstrap version) */}
            <div className="mb-4">
                <ul className="nav nav-tabs" id="mainTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${selectedTissueType === "introduction" ? "active" : ""}`}
                            id="introduction-tab"
                            data-bs-toggle="tab"
                            type="button"
                            role="tab"
                            aria-controls="introduction"
                            aria-selected={selectedTissueType === "introduction"}
                            onClick={() => setSelectedTissueType("introduction")}
                        >
                            What are Tissues?
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${selectedTissueType === "plant" ? "active" : ""}`}
                            id="plant-tab"
                            data-bs-toggle="tab"
                            type="button"
                            role="tab"
                            aria-controls="plant"
                            aria-selected={selectedTissueType === "plant"}
                            onClick={() => setSelectedTissueType("plant")}
                        >
                            Plant Tissues
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${selectedTissueType === "animal" ? "active" : ""}`}
                            id="animal-tab"
                            data-bs-toggle="tab"
                            type="button"
                            role="tab"
                            aria-controls="animal"
                            aria-selected={selectedTissueType === "animal"}
                            onClick={() => setSelectedTissueType("animal")}
                        >
                            Animal Tissues
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${selectedTissueType === "comparison" ? "active" : ""}`}
                            id="comparison-tab"
                            data-bs-toggle="tab"
                            type="button"
                            role="tab"
                            aria-controls="comparison"
                            aria-selected={selectedTissueType === "comparison"}
                            onClick={() => setSelectedTissueType("comparison")}
                        >
                            Comparison
                        </button>
                    </li>
                </ul>
                <div className="tab-content mt-4" id="mainTabsContent">
                    <div
                        className={`tab-pane fade ${selectedTissueType === "introduction" ? "show active" : ""}`}
                        id="introduction"
                        role="tabpanel"
                        aria-labelledby="introduction-tab"
                    >
                        {/* Place the Introduction to Tissues JSX here */}
                    </div>
                    <div
                        className={`tab-pane fade ${selectedTissueType === "plant" ? "show active" : ""}`}
                        id="plant"
                        role="tabpanel"
                        aria-labelledby="plant-tab"
                    >
                        {/* Place the Plant Tissues JSX here */}
                    </div>
                    <div
                        className={`tab-pane fade ${selectedTissueType === "animal" ? "show active" : ""}`}
                        id="animal"
                        role="tabpanel"
                        aria-labelledby="animal-tab"
                    >
                        {/* Place the Animal Tissues JSX here */}
                    </div>
                    <div
                        className={`tab-pane fade ${selectedTissueType === "comparison" ? "show active" : ""}`}
                        id="comparison"
                        role="tabpanel"
                        aria-labelledby="comparison-tab"
                    >
                        {/* Place the Comparison JSX here */}
                    </div>
                </div>
            </div>
            {/* Main Content Tabs */}
            <Tabs defaultValue="introduction" className="space-y-4">
              <TabsList className="w-full overflow-x-auto flex flex-nowrap gap-2">
                <TabsTrigger value="introduction">What are Tissues?</TabsTrigger>
                <TabsTrigger value="plant">Plant Tissues</TabsTrigger>
                <TabsTrigger value="animal">Animal Tissues</TabsTrigger>
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
              </TabsList>

              <TabsContent value="introduction" className="space-y-6">
                {/* Introduction to Tissues */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Layers className="w-6 h-6 text-purple-600" />
                      <span>Understanding Tissues: From Cells to Organs</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Definition and Concept */}
                    <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-3">🧩 What Exactly Are Tissues?</h4>
                      <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
                        <p className="text-lg font-semibold text-purple-900 mb-2">
                          A tissue is a group of similar cells that work together to perform a specific function.
                        </p>
                        <p className="text-purple-700 text-sm">
                          Think of it like a sports team - individual players (cells) with similar skills team up to
                          achieve a common goal!
                        </p>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-3 rounded border border-purple-200 text-center">
                          <div className="text-2xl mb-2">🔬</div>
                          <h5 className="font-semibold text-purple-800">Similar Cells</h5>
                          <p className="text-purple-700 text-sm">Cells with similar structure and origin</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-purple-200 text-center">
                          <div className="text-2xl mb-2">🤝</div>
                          <h5 className="font-semibold text-purple-800">Work Together</h5>
                          <p className="text-purple-700 text-sm">Coordinate their activities</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-purple-200 text-center">
                          <div className="text-2xl mb-2">🎯</div>
                          <h5 className="font-semibold text-purple-800">Specific Function</h5>
                          <p className="text-purple-700 text-sm">Each tissue has a specialized job</p>
                        </div>
                      </div>
                    </div>

                    {/* Hierarchy of Organization */}
                    <div className="border-2 border-blue-200 rounded-lg p-5 bg-blue-50">
                      <h4 className="font-bold text-blue-800 text-lg mb-3 flex items-center space-x-2">
                        <Activity className="w-6 h-6" />
                        <span>The Hierarchy of Life Organization</span>
                      </h4>

                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                              <span className="text-2xl">🔬</span>
                            </div>
                            <h5 className="font-semibold text-blue-800">CELLS</h5>
                            <p className="text-blue-700 text-xs">Basic units of life</p>
                          </div>

                          <div className="text-blue-600 text-2xl">→</div>

                          <div className="text-center">
                            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mb-2">
                              <span className="text-2xl">🧩</span>
                            </div>
                            <h5 className="font-semibold text-blue-800">TISSUES</h5>
                            <p className="text-blue-700 text-xs">Groups of similar cells</p>
                          </div>

                          <div className="text-blue-600 text-2xl">→</div>

                          <div className="text-center">
                            <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center mb-2">
                              <span className="text-2xl">🫀</span>
                            </div>
                            <h5 className="font-semibold text-blue-800">ORGANS</h5>
                            <p className="text-blue-700 text-xs">Groups of tissues</p>
                          </div>

                          <div className="text-blue-600 text-2xl">→</div>

                          <div className="text-center">
                            <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mb-2">
                              <span className="text-2xl">🧬</span>
                            </div>
                            <h5 className="font-semibold text-blue-800">SYSTEMS</h5>
                            <p className="text-blue-700 text-xs">Groups of organs</p>
                          </div>

                          <div className="text-blue-600 text-2xl">→</div>

                          <div className="text-center">
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                              <span className="text-2xl">🧍</span>
                            </div>
                            <h5 className="font-semibold text-blue-800">ORGANISM</h5>
                            <p className="text-blue-700 text-xs">Complete living being</p>
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-blue-100 rounded">
                          <p className="text-blue-800 text-sm text-center">
                            <strong>Example:</strong> Muscle cells → Muscle tissue → Heart (organ) → Circulatory system
                            → Human body
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Why Do Tissues Form? */}
                    <div className="border-2 border-green-200 rounded-lg p-5 bg-green-50">
                      <h4 className="font-bold text-green-800 text-lg mb-3 flex items-center space-x-2">
                        <Lightbulb className="w-6 h-6" />
                        <span>Why Do Cells Form Tissues?</span>
                      </h4>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded border border-green-200">
                          <h5 className="font-semibold text-green-800 mb-3">🎯 Specialization Benefits</h5>
                          <ul className="text-green-700 text-sm space-y-2">
                            <li>
                              <strong>Division of Labor:</strong> Each tissue becomes expert at one job
                            </li>
                            <li>
                              <strong>Efficiency:</strong> Specialized cells work better than generalists
                            </li>
                            <li>
                              <strong>Size Advantage:</strong> Larger organisms need specialized systems
                            </li>
                            <li>
                              <strong>Complex Functions:</strong> Enable advanced life processes
                            </li>
                          </ul>
                        </div>

                        <div className="bg-white p-4 rounded border border-green-200">
                          <h5 className="font-semibold text-green-800 mb-3">🏭 Real-World Analogy</h5>
                          <div className="space-y-2 text-green-700 text-sm">
                            <p>
                              <strong>Factory Workers:</strong> Each department specializes (production, quality
                              control, shipping)
                            </p>
                            <p>
                              <strong>Orchestra:</strong> Different instruments play different parts for beautiful music
                            </p>
                            <p>
                              <strong>Sports Team:</strong> Goalkeeper, defenders, midfielders, forwards - each with
                              specific roles
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Types of Tissues Overview */}
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3">🌍 Major Tissue Categories</h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded border border-gray-200">
                          <h5 className="text-lg font-bold text-green-800 mb-3 flex items-center space-x-2">
                            <TreePine className="w-5 h-5" />
                            <span>Plant Tissues</span>
                          </h5>
                          <div className="space-y-2">
                            <div className="bg-green-50 p-2 rounded">
                              <p className="font-semibold text-green-800 text-sm">Meristematic Tissues</p>
                              <p className="text-green-700 text-xs">Growing tissues with dividing cells</p>
                            </div>
                            <div className="bg-green-50 p-2 rounded">
                              <p className="font-semibold text-green-800 text-sm">Permanent Tissues</p>
                              <p className="text-green-700 text-xs">Mature tissues with specialized functions</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded border border-gray-200">
                          <h5 className="text-lg font-bold text-pink-800 mb-3 flex items-center space-x-2">
                            <Heart className="w-5 h-5" />
                            <span>Animal Tissues</span>
                          </h5>
                          <div className="space-y-2">
                            <div className="bg-pink-50 p-2 rounded">
                              <p className="font-semibold text-pink-800 text-sm">Epithelial</p>
                              <p className="text-pink-700 text-xs">Covering and lining tissues</p>
                            </div>
                            <div className="bg-pink-50 p-2 rounded">
                              <p className="font-semibold text-pink-800 text-sm">Connective</p>
                              <p className="text-pink-700 text-xs">Supporting and connecting tissues</p>
                            </div>
                            <div className="bg-pink-50 p-2 rounded">
                              <p className="font-semibold text-pink-800 text-sm">Muscular</p>
                              <p className="text-pink-700 text-xs">Movement and contraction tissues</p>
                            </div>
                            <div className="bg-pink-50 p-2 rounded">
                              <p className="font-semibold text-pink-800 text-sm">Nervous</p>
                              <p className="text-pink-700 text-xs">Control and coordination tissues</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="plant" className="space-y-6">
                {/* Plant Tissues */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TreePine className="w-6 h-6 text-green-600" />
                      <span>Plant Tissues: Nature's Engineering Marvels</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Introduction */}
                    <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-3">🌱 Plant Tissue Organization</h4>
                      <p className="text-green-700 leading-relaxed">
                        Plants are incredible engineers! They've developed specialized tissues to solve unique
                        challenges: How to grow continuously? How to transport water from roots to leaves? How to make
                        food and store it? How to stay upright without bones? Let's explore how plant tissues work
                        together to create these living skyscrapers!
                      </p>
                    </div>

                    {/* Plant Tissue Selector */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-3">🔍 Explore Plant Tissues</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {Object.entries(plantTissues).map(([key, tissue]) => (
                          <Button
                            key={key}
                            variant={selectedPlantTissue === key ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedPlantTissue(key as PlantTissueKey)}
                            className="flex items-center space-x-2"
                          >
                            <span>{tissue.name}</span>
                          </Button>
                        ))}
                      </div>

                      {/* Selected Plant Tissue Details */}
                      <div className={`border-2 rounded-lg p-4 ${plantTissues[selectedPlantTissue].color}`}>
                        <h5 className={`text-xl font-bold mb-3 ${plantTissues[selectedPlantTissue].textColor}`}>
                          {plantTissues[selectedPlantTissue].name}
                        </h5>

                        <div className="bg-white p-4 rounded border">
                          <p className="text-gray-700 text-sm mb-3">{plantTissues[selectedPlantTissue].description}</p>
                          <div className="flex flex-wrap gap-2">
                            {plantTissues[selectedPlantTissue].types.map((type, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Plant Tissue Information */}
                    <div className="space-y-6">
                      {/* Meristematic Tissues */}
                      <div className="border-2 border-green-200 rounded-lg p-5 bg-green-50">
                        <h4 className="font-bold text-green-800 text-lg mb-3 flex items-center space-x-2">
                          <Zap className="w-6 h-6" />
                          <span>Meristematic Tissues: The Growth Centers</span>
                        </h4>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="meristematic-characteristics">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">
                                  🌱
                                </div>
                                <span>Characteristics of Meristematic Tissues</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-green-200">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h5 className="font-semibold text-green-800 mb-2">Cell Features:</h5>
                                    <ul className="text-green-700 text-sm space-y-1">
                                      <li>• Small, compact cells</li>
                                      <li>• Thin cell walls</li>
                                      <li>• Large nucleus</li>
                                      <li>• Dense cytoplasm</li>
                                      <li>• No vacuoles or small vacuoles</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-green-800 mb-2">Functions:</h5>
                                    <ul className="text-green-700 text-sm space-y-1">
                                      <li>• Continuous cell division</li>
                                      <li>• Growth of plant</li>
                                      <li>• Formation of new organs</li>
                                      <li>• Repair damaged parts</li>
                                      <li>• Increase in length and girth</li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="mt-4 p-3 bg-green-100 rounded">
                                  <p className="text-green-800 text-sm">
                                    <strong>Why they're special:</strong> These are the only plant tissues that can
                                    divide throughout the plant's life, making continuous growth possible!
                                  </p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="types-meristematic">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">
                                  📍
                                </div>
                                <span>Types Based on Location</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="space-y-4">
                                <div className="bg-white p-4 rounded border border-green-200">
                                  <h5 className="font-semibold text-green-800 mb-2 flex items-center space-x-2">
                                    <span>⬆️</span>
                                    <span>Apical Meristem</span>
                                  </h5>
                                  <div className="grid md:grid-cols-2 gap-3">
                                    <div>
                                      <p className="text-green-700 text-sm mb-2">
                                        <strong>Location:</strong> Tips of roots and shoots
                                      </p>
                                      <p className="text-green-700 text-sm">
                                        <strong>Function:</strong> Increases length (primary growth)
                                      </p>
                                    </div>
                                    <div className="bg-green-50 p-2 rounded">
                                      <p className="text-green-800 text-xs">
                                        <strong>Result:</strong> Plant grows taller and roots grow deeper
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-white p-4 rounded border border-green-200">
                                  <h5 className="font-semibold text-green-800 mb-2 flex items-center space-x-2">
                                    <span>↔️</span>
                                    <span>Lateral Meristem</span>
                                  </h5>
                                  <div className="grid md:grid-cols-2 gap-3">
                                    <div>
                                      <p className="text-green-700 text-sm mb-2">
                                        <strong>Location:</strong> Sides of stems and roots
                                      </p>
                                      <p className="text-green-700 text-sm">
                                        <strong>Function:</strong> Increases thickness (secondary growth)
                                      </p>
                                    </div>
                                    <div className="bg-green-50 p-2 rounded">
                                      <p className="text-green-800 text-xs">
                                        <strong>Result:</strong> Tree trunks become thicker, forming wood
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-white p-4 rounded border border-green-200">
                                  <h5 className="font-semibold text-green-800 mb-2 flex items-center space-x-2">
                                    <span>🔄</span>
                                    <span>Intercalary Meristem</span>
                                  </h5>
                                  <div className="grid md:grid-cols-2 gap-3">
                                    <div>
                                      <p className="text-green-700 text-sm mb-2">
                                        <strong>Location:</strong> Between mature tissues (nodes of grass)
                                      </p>
                                      <p className="text-green-700 text-sm">
                                        <strong>Function:</strong> Growth from middle regions
                                      </p>
                                    </div>
                                    <div className="bg-green-50 p-2 rounded">
                                      <p className="text-green-800 text-xs">
                                        <strong>Result:</strong> Grass can regrow after cutting!
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* Permanent Tissues */}
                      <div className="border-2 border-blue-200 rounded-lg p-5 bg-blue-50">
                        <h4 className="font-bold text-blue-800 text-lg mb-3 flex items-center space-x-2">
                          <Activity className="w-6 h-6" />
                          <span>Permanent Tissues: The Specialists</span>
                        </h4>

                        <div className="bg-white p-4 rounded border border-blue-200 mb-4">
                          <p className="text-blue-800 text-sm mb-2">
                            <strong>What are Permanent Tissues?</strong>
                          </p>
                          <p className="text-blue-700 text-sm">
                            Tissues formed from meristematic tissues that have lost the ability to divide and have
                            become specialized for specific functions.
                          </p>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="simple-permanent">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                  🔷
                                </div>
                                <span>Simple Permanent Tissues</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-4">
                              {/* Parenchyma */}
                              <div className="bg-white p-4 rounded border border-blue-200">
                                <h5 className="font-semibold text-blue-800 mb-3 flex items-center space-x-2">
                                  <span>🟦</span>
                                  <span>Parenchyma - The Multitaskers</span>
                                </h5>
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h6 className="font-semibold text-blue-800 mb-2">Structure:</h6>
                                    <ul className="text-blue-700 text-sm space-y-1">
                                      <li>• Living cells</li>
                                      <li>• Thin cell walls</li>
                                      <li>• Large intercellular spaces</li>
                                      <li>• Various shapes (usually rounded)</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h6 className="font-semibold text-blue-800 mb-2">Functions:</h6>
                                    <ul className="text-blue-700 text-sm space-y-1">
                                      <li>• Storage of food and water</li>
                                      <li>• Photosynthesis (in leaves)</li>
                                      <li>• Gas exchange</li>
                                      <li>• Provides buoyancy (in aquatic plants)</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="mt-3 p-2 bg-blue-100 rounded">
                                  <p className="text-blue-800 text-xs">
                                    <strong>Examples:</strong> Flesh of fruits, pith of stems, mesophyll of leaves
                                  </p>
                                </div>
                              </div>

                              {/* Collenchyma */}
                              <div className="bg-white p-4 rounded border border-yellow-200">
                                <h5 className="font-semibold text-yellow-800 mb-3 flex items-center space-x-2">
                                  <span>🟨</span>
                                  <span>Collenchyma - The Flexible Support</span>
                                </h5>
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h6 className="font-semibold text-yellow-800 mb-2">Structure:</h6>
                                    <ul className="text-yellow-700 text-sm space-y-1">
                                      <li>• Living cells</li>
                                      <li>• Thickened corners</li>
                                      <li>• Elongated cells</li>
                                      <li>• Cellulose and pectin walls</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h6 className="font-semibold text-yellow-800 mb-2">Functions:</h6>
                                    <ul className="text-yellow-700 text-sm space-y-1">
                                      <li>• Flexible mechanical support</li>
                                      <li>• Allows bending without breaking</li>
                                      <li>• Photosynthesis (sometimes)</li>
                                      <li>• Growth accommodation</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="mt-3 p-2 bg-yellow-100 rounded">
                                  <p className="text-yellow-800 text-xs">
                                    <strong>Examples:</strong> Leaf stalks, herbaceous stems (like celery strings!)
                                  </p>
                                </div>
                              </div>

                              {/* Sclerenchyma */}
                              <div className="bg-white p-4 rounded border border-red-200">
                                <h5 className="font-semibold text-red-800 mb-3 flex items-center space-x-2">
                                  <span>🟥</span>
                                  <span>Sclerenchyma - The Strong Support</span>
                                </h5>
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h6 className="font-semibold text-red-800 mb-2">Structure:</h6>
                                    <ul className="text-red-700 text-sm space-y-1">
                                        <li>• Dead cells at maturity</li>
                                        <li>• Very thick walls</li>
                                        <li>• Lignified (woody) walls</li>
                                        <li>• No intercellular spaces</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h6 className="font-semibold text-red-800 mb-2">Functions:</h6>
                                    <ul className="text-red-700 text-sm space-y-1">
                                      <li>• Rigid mechanical support</li>
                                      <li>• Strength and hardness</li>
                                      <li>• Protection</li>
                                      <li>• Shape maintenance</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="mt-3 p-2 bg-red-100 rounded">
                                  <p className="text-red-800 text-xs">
                                    <strong>Examples:</strong> Coconut husk fibers, jute fibers, hard seed coats
                                  </p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="complex-permanent">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-800 font-bold">
                                  🔶
                                </div>
                                <span>Complex Permanent Tissues</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-4">
                              {/* Xylem */}
                              <div className="bg-white p-4 rounded border border-purple-200">
                                <h5 className="font-semibold text-purple-800 mb-3 flex items-center space-x-2">
                                  <span>💧</span>
                                  <span>Xylem - The Water Highway</span>
                                </h5>

                                <div className="bg-purple-50 p-3 rounded mb-3">
                                  <p className="text-purple-800 text-sm">
                                    <strong>Main Function:</strong> Transport water and minerals from roots to all parts
                                    of the plant
                                  </p>
                                </div>

                                <h6 className="font-semibold text-purple-800 mb-2">Components:</h6>
                                <div className="grid md:grid-cols-2 gap-3">
                                  <div className="bg-purple-50 p-3 rounded">
                                    <h6 className="font-semibold text-purple-800 text-sm">Tracheids</h6>
                                    <p className="text-purple-700 text-xs">
                                      Dead, elongated cells with thick walls and pits for water movement
                                    </p>
                                  </div>
                                  <div className="bg-purple-50 p-3 rounded">
                                    <h6 className="font-semibold text-purple-800 text-sm">Vessels</h6>
                                    <p className="text-purple-700 text-xs">
                                      Dead, tube-like structures with perforated end walls
                                    </p>
                                  </div>
                                  <div className="bg-purple-50 p-3 rounded">
                                    <h6 className="font-semibold text-purple-800 text-sm">Xylem Parenchyma</h6>
                                    <p className="text-purple-700 text-xs">
                                      Living cells for storage and lateral transport
                                    </p>
                                  </div>
                                  <div className="bg-purple-50 p-3 rounded">
                                    <h6 className="font-semibold text-purple-800 text-sm">Xylem Fibers</h6>
                                    <p className="text-purple-700 text-xs">Dead cells providing mechanical support</p>
                                  </div>
                                </div>

                                <div className="mt-3 p-2 bg-purple-100 rounded">
                                  <p className="text-purple-800 text-xs">
                                    <strong>Amazing Fact:</strong> Xylem can lift water over 100 meters high in tall
                                    trees without any pump!
                                  </p>
                                </div>
                              </div>

                              {/* Phloem */}
                              <div className="bg-white p-4 rounded border border-orange-200">
                                <h5 className="font-semibold text-orange-800 mb-3 flex items-center space-x-2">
                                  <span>🍯</span>
                                  <span>Phloem - The Food Highway</span>
                                </h5>

                                <div className="bg-orange-50 p-3 rounded mb-3">
                                  <p className="text-orange-800 text-sm">
                                    <strong>Main Function:</strong> Transport prepared food (sugars) from leaves to all
                                    parts of the plant
                                  </p>
                                </div>

                                <h6 className="font-semibold text-orange-800 mb-2">Components:</h6>
                                <div className="grid md:grid-cols-2 gap-3">
                                  <div className="bg-orange-50 p-3 rounded">
                                    <h6 className="font-semibold text-orange-800 text-sm">Sieve Tubes</h6>
                                    <p className="text-orange-700 text-xs">
                                      Living cells with perforated end walls for food transport
                                    </p>
                                  </div>
                                  <div className="bg-orange-50 p-3 rounded">
                                    <h6 className="font-semibold text-orange-800 text-sm">Companion Cells</h6>
                                    <p className="text-orange-700 text-xs">
                                      Living cells that help sieve tubes function
                                    </p>
                                  </div>
                                  <div className="bg-orange-50 p-3 rounded">
                                    <h6 className="font-semibold text-orange-800 text-sm">Phloem Parenchyma</h6>
                                    <p className="text-orange-700 text-xs">Living cells for storage and support</p>
                                  </div>
                                  <div className="bg-orange-50 p-3 rounded">
                                    <h6 className="font-semibold text-orange-800 text-sm">Phloem Fibers</h6>
                                    <p className="text-orange-700 text-xs">Dead cells providing mechanical support</p>
                                  </div>
                                </div>

                                <div className="mt-3 p-2 bg-orange-100 rounded">
                                  <p className="text-orange-800 text-xs">
                                    <strong>Cool Fact:</strong> Phloem transport is bidirectional - food can move up or
                                    down as needed!
                                  </p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="animal" className="space-y-6">
                {/* Animal Tissues */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Heart className="w-6 h-6 text-pink-600" />
                      <span>Animal Tissues: The Body's Specialized Teams</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Introduction */}
                    <div className="bg-pink-50 p-5 rounded-lg border border-pink-200">
                      <h4 className="font-semibold text-pink-800 mb-3">🦴 Animal Tissue Organization</h4>
                      <p className="text-pink-700 leading-relaxed">
                        Animal bodies are like complex cities with different departments working 24/7! Unlike plants
                        that stay in one place, animals need to move, think, respond quickly, and maintain their body
                        temperature. This requires four specialized tissue teams: the protectors (epithelial), the
                        supporters (connective), the movers (muscular), and the controllers (nervous). Let's meet these
                        amazing teams!
                      </p>
                    </div>

                    {/* Animal Tissue Selector */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-3">🔍 Explore Animal Tissues</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {Object.entries(animalTissues).map(([key, tissue]) => (
                          <Button
                            key={key}
                            variant={selectedAnimalTissue === key ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedAnimalTissue(key as AnimalTissueKey)}
                            className="flex items-center space-x-2"
                          >
                            <span>{tissue.name}</span>
                          </Button>
                        ))}
                      </div>

                      {/* Selected Animal Tissue Details */}
                      <div className={`border-2 rounded-lg p-4 ${animalTissues[selectedAnimalTissue].color}`}>
                        <h5 className={`text-xl font-bold mb-3 ${animalTissues[selectedAnimalTissue].textColor}`}>
                          {animalTissues[selectedAnimalTissue].name}
                        </h5>

                        <div className="bg-white p-4 rounded border">
                          <p className="text-gray-700 text-sm mb-3">
                            {animalTissues[selectedAnimalTissue].description}
                          </p>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h6 className="font-semibold text-gray-800 mb-2">Types:</h6>
                              <div className="flex flex-wrap gap-1">
                                {animalTissues[selectedAnimalTissue].types.map((type, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700"
                                  >
                                    {type}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h6 className="font-semibold text-gray-800 mb-2">Functions:</h6>
                              <div className="flex flex-wrap gap-1">
                                {animalTissues[selectedAnimalTissue].functions.map((func, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-blue-100 rounded text-xs font-medium text-blue-700"
                                  >
                                    {func}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Animal Tissue Information */}
                    <div className="space-y-6">
                      {/* Epithelial Tissue */}
                      <div className="border-2 border-pink-200 rounded-lg p-5 bg-pink-50">
                        <h4 className="font-bold text-pink-800 text-lg mb-3 flex items-center space-x-2">
                          <Shield className="w-6 h-6" />
                          <span>Epithelial Tissue: The Protective Barriers</span>
                        </h4>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="epithelial-characteristics">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-800 font-bold">
                                  🛡️
                                </div>
                                <span>General Characteristics</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-pink-200">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h5 className="font-semibold text-pink-800 mb-2">Structure:</h5>
                                    <ul className="text-pink-700 text-sm space-y-1">
                                      <li>• Cells tightly packed together</li>
                                      <li>• Little or no intercellular space</li>
                                      <li>• Cells arranged in layers</li>
                                      <li>• Basement membrane present</li>
                                      <li>• No blood vessels (avascular)</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-pink-800 mb-2">Functions:</h5>
                                    <ul className="text-pink-700 text-sm space-y-1">
                                      <li>• Protection from damage</li>
                                      <li>• Absorption of nutrients</li>
                                      <li>• Secretion of substances</li>
                                      <li>• Sensation and detection</li>
                                      <li>• Regulation of material exchange</li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="mt-4 p-3 bg-pink-100 rounded">
                                  <p className="text-pink-800 text-sm">
                                    <strong>Key Feature:</strong> Epithelial tissues are like the body's security guards
                                    - they form barriers and control what gets in and out!
                                  </p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="epithelial-types">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-800 font-bold">
                                  📋
                                </div>
                                <span>Types of Epithelial Tissue</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-4">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded border border-pink-200">
                                  <h5 className="font-semibold text-pink-800 mb-2">Simple Squamous</h5>
                                  <p className="text-pink-700 text-sm mb-2">
                                    <strong>Structure:</strong> Single layer of flat, thin cells
                                  </p>
                                  <p className="text-pink-700 text-sm mb-2">
                                    <strong>Function:</strong> Allows easy passage of materials
                                  </p>
                                  <div className="bg-pink-50 p-2 rounded">
                                    <p className="text-pink-800 text-xs">
                                      <strong>Examples:</strong> Lung alveoli, blood vessel lining
                                    </p>
                                  </div>
                                </div>

                                <div className="bg-white p-4 rounded border border-pink-200">
                                  <h5 className="font-semibold text-pink-800 mb-2">Cuboidal</h5>
                                  <p className="text-pink-700 text-sm mb-2">
                                    <strong>Structure:</strong> Cube-shaped cells
                                  </p>
                                  <p className="text-pink-700 text-sm mb-2">
                                    <strong>Function:</strong> Secretion and absorption
                                  </p>
                                  <div className="bg-pink-50 p-2 rounded">
                                    <p className="text-pink-800 text-xs">
                                      <strong>Examples:</strong> Kidney tubules, salivary glands
                                    </p>
                                  </div>
                                </div>

                                <div className="bg-white p-4 rounded border border-pink-200">
                                  <h5 className="font-semibold text-pink-800 mb-2">Columnar</h5>
                                  <p className="text-pink-700 text-sm mb-2">
                                    <strong>Structure:</strong> Tall, column-like cells
                                  </p>
                                  <p className="text-pink-700 text-sm mb-2">
                                    <strong>Function:</strong> Absorption and secretion
                                  </p>
                                  <div className="bg-pink-50 p-2 rounded">
                                    <p className="text-pink-800 text-xs">
                                      <strong>Examples:</strong> Intestinal lining, stomach lining
                                    </p>
                                  </div>
                                </div>

                                <div className="bg-white p-4 rounded border border-pink-200">
                                  <h5 className="font-semibold text-pink-800 mb-2">Stratified Squamous</h5>
                                  <p className="text-pink-700 text-sm mb-2">
                                    <strong>Structure:</strong> Multiple layers of flat cells
                                  </p>
                                  <p className="text-pink-700 text-sm mb-2">
                                    <strong>Function:</strong> Protection from wear and tear
                                  </p>
                                  <div className="bg-pink-50 p-2 rounded">
                                    <p className="text-pink-800 text-xs">
                                      <strong>Examples:</strong> Skin, mouth lining
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* Connective Tissue */}
                      <div className="border-2 border-indigo-200 rounded-lg p-5 bg-indigo-50">
                        <h4 className="font-bold text-indigo-800 text-lg mb-3 flex items-center space-x-2">
                          <Layers className="w-6 h-6" />
                          <span>Connective Tissue: The Support Network</span>
                        </h4>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="connective-characteristics">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-800 font-bold">
                                  🔗
                                </div>
                                <span>General Characteristics</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h5 className="font-semibold text-indigo-800 mb-2">Structure:</h5>
                                    <ul className="text-indigo-700 text-sm space-y-1">
                                      <li>• Cells scattered in matrix</li>
                                      <li>• Large amounts of intercellular material</li>
                                      <li>• Matrix can be liquid, solid, or gel-like</li>
                                      <li>• Well-vascularized (has blood supply)</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-indigo-800 mb-2">Functions:</h5>
                                    <ul className="text-indigo-700 text-sm space-y-1">
                                      <li>• Structural support</li>
                                      <li>• Protection of organs</li>
                                      <li>• Transportation</li>
                                      <li>• Storage of materials</li>
                                      <li>• Immune defense</li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="mt-4 p-3 bg-indigo-100 rounded">
                                  <p className="text-indigo-800 text-sm">
                                    <strong>Unique Feature:</strong> Most diverse tissue type - from liquid blood to
                                    solid bone!
                                  </p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="connective-types">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-800 font-bold">
                                  🏗️
                                </div>
                                <span>Types of Connective Tissue</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-4">
                              <div className="space-y-4">
                                <div className="bg-white p-4 rounded border border-indigo-200">
                                  <h5 className="font-semibold text-indigo-800 mb-2 flex items-center space-x-2">
                                    <span>🩸</span>
                                    <span>Blood - The Liquid Connector</span>
                                  </h5>
                                  <div className="grid md:grid-cols-2 gap-3">
                                    <div>
                                      <p className="text-indigo-700 text-sm mb-2">
                                        <strong>Matrix:</strong> Liquid plasma
                                      </p>
                                      <p className="text-indigo-700 text-sm">
                                        <strong>Cells:</strong> RBC, WBC, Platelets
                                      </p>
                                    </div>
                                    <div className="bg-indigo-50 p-2 rounded">
                                      <p className="text-indigo-800 text-xs">
                                        <strong>Function:</strong> Transport oxygen, nutrients, waste, immune defense
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-white p-4 rounded border border-indigo-200">
                                  <h5 className="font-semibold text-indigo-800 mb-2 flex items-center space-x-2">
                                    <span>🦴</span>
                                    <span>Bone - The Rigid Support</span>
                                  </h5>
                                  <div className="grid md:grid-cols-2 gap-3">
                                    <div>
                                      <p className="text-indigo-700 text-sm mb-2">
                                        <strong>Matrix:</strong> Hard matrix with calcium and phosphorus
                                      </p>
                                      <p className="text-indigo-700 text-sm">
                                        <strong>Cells:</strong> Osteocytes, osteoblasts, osteoclasts
                                      </p>
                                    </div>
                                    <div className="bg-indigo-50 p-2 rounded">
                                      <p className="text-indigo-800 text-xs">
                                        <strong>Function:</strong> Support, protection, movement, blood cell formation
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-white p-4 rounded border border-indigo-200">
                                  <h5 className="font-semibold text-indigo-800 mb-2 flex items-center space-x-2">
                                    <span>🔵</span>
                                    <span>Cartilage - The Flexible Support</span>
                                  </h5>
                                  <div className="grid md:grid-cols-2 gap-3">
                                    <div>
                                      <p className="text-indigo-700 text-sm mb-2">
                                        <strong>Matrix:</strong> Firm but flexible matrix
                                      </p>
                                      <p className="text-indigo-700 text-sm">
                                        <strong>Cells:</strong> Chondrocytes
                                      </p>
                                    </div>
                                    <div className="bg-indigo-50 p-2 rounded">
                                      <p className="text-indigo-800 text-xs">
                                        <strong>Function:</strong> Smooth joint movement, shock absorption
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-white p-4 rounded border border-indigo-200">
                                  <h5 className="font-semibold text-indigo-800 mb-2 flex items-center space-x-2">
                                    <span>🟡</span>
                                    <span>Adipose - The Storage Tissue</span>
                                  </h5>
                                  <div className="grid md:grid-cols-2 gap-3">
                                    <div>
                                      <p className="text-indigo-700 text-sm mb-2">
                                        <strong>Matrix:</strong> Minimal matrix
                                      </p>
                                      <p className="text-indigo-700 text-sm">
                                        <strong>Cells:</strong> Fat cells (adipocytes)
                                      </p>
                                    </div>
                                    <div className="bg-indigo-50 p-2 rounded">
                                      <p className="text-indigo-800 text-xs">
                                        <strong>Function:</strong> Energy storage, insulation, cushioning
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-white p-4 rounded border border-indigo-200">
                                  <h5 className="font-semibold text-indigo-800 mb-2 flex items-center space-x-2">
                                    <span>🕸️</span>
                                    <span>Areolar - The Packing Material</span>
                                  </h5>
                                  <div className="grid md:grid-cols-2 gap-3">
                                    <div>
                                      <p className="text-indigo-700 text-sm mb-2">
                                        <strong>Matrix:</strong> Loose arrangement of fibers
                                      </p>
                                      <p className="text-indigo-700 text-sm">
                                        <strong>Cells:</strong> Fibroblasts, macrophages
                                      </p>
                                    </div>
                                    <div className="bg-indigo-50 p-2 rounded">
                                      <p className="text-indigo-800 text-xs">
                                        <strong>Function:</strong> Fills spaces, supports organs, repair
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* Muscular Tissue */}
                      <div className="border-2 border-red-200 rounded-lg p-5 bg-red-50">
                        <h4 className="font-bold text-red-800 text-lg mb-3 flex items-center space-x-2">
                          <Muscle className="w-6 h-6" />
                          <span>Muscular Tissue: The Movement Makers</span>
                        </h4>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="muscular-characteristics">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-800 font-bold">
                                  💪
                                </div>
                                <span>General Characteristics</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-red-200">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h5 className="font-semibold text-red-800 mb-2">Structure:</h5>
                                    <ul className="text-red-700 text-sm space-y-1">
                                      <li>• Elongated cells called muscle fibers</li>
                                      <li>• Contains contractile proteins</li>
                                      <li>• Rich in mitochondria for energy</li>
                                      <li>• Well-supplied with blood vessels</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-red-800 mb-2">Properties:</h5>
                                    <ul className="text-red-700 text-sm space-y-1">
                                      <li>• Contractility (can shorten)</li>
                                      <li>• Excitability (responds to stimuli)</li>
                                      <li>• Extensibility (can stretch)</li>
                                      <li>• Elasticity (returns to original length)</li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="mt-4 p-3 bg-red-100 rounded">
                                  <p className="text-red-800 text-sm">
                                    <strong>Key Function:</strong> All movement in the body - from heartbeat to running
                                    - depends on muscular tissue!
                                  </p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="muscular-types">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-800 font-bold">
                                  🏃
                                </div>
                                <span>Types of Muscular Tissue</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-4">
                              <div className="space-y-4">
                                <div className="bg-white p-4 rounded border border-red-200">
                                  <h5 className="font-semibold text-red-800 mb-3 flex items-center space-x-2">
                                    <span>🦴</span>
                                    <span>Skeletal Muscle - The Voluntary Movers</span>
                                  </h5>
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <h6 className="font-semibold text-red-800 mb-2">Structure:</h6>
                                      <ul className="text-red-700 text-sm space-y-1">
                                        <li>• Long, cylindrical fibers</li>
                                        <li>• Multiple nuclei</li>
                                        <li>• Striped appearance (striated)</li>
                                        <li>• Attached to bones by tendons</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h6 className="font-semibold text-red-800 mb-2">Properties:</h6>
                                      <ul className="text-red-700 text-sm space-y-1">
                                        <li>• Voluntary control</li>
                                        <li>• Fast, powerful contractions</li>
                                        <li>• Gets tired quickly</li>
                                        <li>• Conscious control</li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="mt-3 p-2 bg-red-100 rounded">
                                    <p className="text-red-800 text-xs">
                                      <strong>Examples:</strong> Biceps, triceps, leg muscles - all muscles you can
                                      control consciously
                                    </p>
                                  </div>
                                </div>

                                <div className="bg-white p-4 rounded border border-red-200">
                                  <h5 className="font-semibold text-red-800 mb-3 flex items-center space-x-2">
                                    <span>❤️</span>
                                    <span>Cardiac Muscle - The Tireless Worker</span>
                                  </h5>
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <h6 className="font-semibold text-red-800 mb-2">Structure:</h6>
                                      <ul className="text-red-700 text-sm space-y-1">
                                        <li>• Branched fibers</li>
                                        <li>• Single nucleus per cell</li>
                                        <li>• Striped appearance</li>
                                        <li>• Connected by intercalated discs</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h6 className="font-semibold text-red-800 mb-2">Properties:</h6>
                                      <ul className="text-red-700 text-sm space-y-1">
                                        <li>• Involuntary control</li>
                                        <li>• Rhythmic contractions</li>
                                        <li>• Never gets tired</li>
                                        <li>• Self-stimulating</li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="mt-3 p-2 bg-red-100 rounded">
                                    <p className="text-red-800 text-xs">
                                      <strong>Location:</strong> Heart only - beats about 100,000 times per day!
                                    </p>
                                  </div>
                                </div>

                                <div className="bg-white p-4 rounded border border-red-200">
                                  <h5 className="font-semibold text-red-800 mb-3 flex items-center space-x-2">
                                    <span>🌊</span>
                                    <span>Smooth Muscle - The Background Workers</span>
                                  </h5>
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <h6 className="font-semibold text-red-800 mb-2">Structure:</h6>
                                      <ul className="text-red-700 text-sm space-y-1">
                                        <li>• Spindle-shaped cells</li>
                                        <li>• Single nucleus</li>
                                        <li>• No striations (smooth)</li>
                                        <li>• Arranged in sheets</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h6 className="font-semibold text-red-800 mb-2">Properties:</h6>
                                      <ul className="text-red-700 text-sm space-y-1">
                                        <li>• Involuntary control</li>
                                        <li>• Slow, sustained contractions</li>
                                        <li>• Doesn't tire easily</li>
                                        <li>• Automatic function</li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="mt-3 p-2 bg-red-100 rounded">
                                    <p className="text-red-800 text-xs">
                                      <strong>Examples:</strong> Stomach, intestines, blood vessels, bladder - works
                                      without you thinking about it
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* Nervous Tissue */}
                      <div className="border-2 border-yellow-200 rounded-lg p-5 bg-yellow-50">
                        <h4 className="font-bold text-yellow-800 text-lg mb-3 flex items-center space-x-2">
                          <Brain className="w-6 h-6" />
                          <span>Nervous Tissue: The Communication Network</span>
                        </h4>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="nervous-characteristics">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-800 font-bold">
                                  🧠
                                </div>
                                <span>General Characteristics</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-yellow-200">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h5 className="font-semibold text-yellow-800 mb-2">Structure:</h5>
                                    <ul className="text-yellow-700 text-sm space-y-1">
                                      <li>• Highly specialized cells</li>
                                      <li>• Long projections (axons, dendrites)</li>
                                      <li>• Complex branching patterns</li>
                                      <li>• Supported by glial cells</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-yellow-800 mb-2">Properties:</h5>
                                    <ul className="text-yellow-700 text-sm space-y-1">
                                      <li>• Excitability (responds to stimuli)</li>
                                      <li>• Conductivity (transmits signals)</li>
                                      <li>• Integration (processes information)</li>
                                      <li>• Memory (stores information)</li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="mt-4 p-3 bg-yellow-100 rounded">
                                  <p className="text-yellow-800 text-sm">
                                    <strong>Amazing Fact:</strong> Nerve signals can travel at speeds up to 120 meters
                                    per second - faster than a race car!
                                  </p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="nervous-components">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-800 font-bold">
                                  ⚡
                                </div>
                                <span>Components of Nervous Tissue</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-4">
                              <div className="space-y-4">
                                <div className="bg-white p-4 rounded border border-yellow-200">
                                  <h5 className="font-semibold text-yellow-800 mb-3 flex items-center space-x-2">
                                    <span>🔌</span>
                                    <span>Neurons - The Signal Carriers</span>
                                  </h5>
                                  <div className="space-y-3">
                                    <div className="bg-yellow-50 p-3 rounded">
                                      <h6 className="font-semibold text-yellow-800 mb-2">Parts of a Neuron:</h6>
                                      <div className="grid md:grid-cols-3 gap-3">
                                        <div>
                                          <p className="text-yellow-700 text-sm">
                                            <strong>Cell Body:</strong> Contains nucleus and most organelles
                                          </p>
                                        </div>
                                        <div>
                                          <p className="text-yellow-700 text-sm">
                                            <strong>Dendrites:</strong> Receive signals from other neurons
                                          </p>
                                        </div>
                                        <div>
                                          <p className="text-yellow-700 text-sm">
                                            <strong>Axon:</strong> Sends signals to other neurons or muscles
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="bg-yellow-50 p-3 rounded">
                                      <h6 className="font-semibold text-yellow-800 mb-2">Types of Neurons:</h6>
                                      <div className="grid md:grid-cols-3 gap-3">
                                        <div>
                                          <p className="text-yellow-700 text-sm">
                                            <strong>Sensory:</strong> Carry information from sense organs to brain
                                          </p>
                                        </div>
                                        <div>
                                          <p className="text-yellow-700 text-sm">
                                            <strong>Motor:</strong> Carry commands from brain to muscles
                                          </p>
                                        </div>
                                        <div>
                                          <p className="text-yellow-700 text-sm">
                                            <strong>Interneurons:</strong> Connect neurons within brain and spinal cord
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-white p-4 rounded border border-yellow-200">
                                  <h5 className="font-semibold text-yellow-800 mb-3 flex items-center space-x-2">
                                    <span>🛠️</span>
                                    <span>Neuroglia - The Support Crew</span>
                                  </h5>
                                  <div className="space-y-2">
                                    <p className="text-yellow-700 text-sm">
                                      <strong>Function:</strong> Support, protect, and nourish neurons
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-3">
                                      <div className="bg-yellow-50 p-2 rounded">
                                        <p className="text-yellow-800 text-xs">
                                          <strong>Types:</strong> Astrocytes, oligodendrocytes, microglia, ependymal
                                          cells
                                        </p>
                                      </div>
                                      <div className="bg-yellow-50 p-2 rounded">
                                        <p className="text-yellow-800 text-xs">
                                          <strong>Roles:</strong> Insulation, nutrition, immune defense, repair
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comparison" className="space-y-6">
                {/* Comparison */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="w-6 h-6 text-teal-600" />
                      <span>Plant vs Animal Tissues: The Great Comparison</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Introduction */}
                    <div className="bg-teal-50 p-5 rounded-lg border border-teal-200">
                      <h4 className="font-semibold text-teal-800 mb-3">🔄 Why Are They Different?</h4>
                      <p className="text-teal-700 leading-relaxed">
                        Plants and animals have evolved different tissue systems because they face different challenges!
                        Plants need to make their own food, grow continuously, and stay anchored in one place. Animals
                        need to move, find food, respond quickly to danger, and maintain body temperature. Let's see how
                        their tissues reflect these different lifestyles!
                      </p>
                    </div>

                    {/* Comparison Table */}
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3">📊 Comprehensive Tissue Comparison</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                          <thead>
                            <tr className="bg-indigo-600 text-white">
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Aspect</th>
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Plant Tissues</th>
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Animal Tissues</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 p-3 font-medium">Growth Pattern</td>
                              <td className="border border-gray-300 p-3">
                                Continuous growth throughout life (meristematic tissues)
                              </td>
                              <td className="border border-gray-300 p-3">
                                Growth stops at maturity (no meristematic tissues)
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-3 font-medium">Support System</td>
                              <td className="border border-gray-300 p-3">
                                Mechanical tissues (collenchyma, sclerenchyma) + cell walls
                              </td>
                              <td className="border border-gray-300 p-3">
                                Skeletal system (bones, cartilage) + muscular support
                              </td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 p-3 font-medium">Transport System</td>
                              <td className="border border-gray-300 p-3">
                                Xylem (water) and Phloem (food) - one-way systems
                              </td>
                              <td className="border border-gray-300 p-3">
                                Blood circulatory system - two-way transport
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-3 font-medium">Movement</td>
                              <td className="border border-gray-300 p-3">
                                Limited movement (growth movements, leaf movements)
                              </td>
                              <td className="border border-gray-300 p-3">
                                Extensive movement (muscular tissue for locomotion)
                              </td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 p-3 font-medium">Control System</td>
                              <td className="border border-gray-300 p-3">
                                Hormonal control (plant hormones like auxins)
                              </td>
                              <td className="border border-gray-300 p-3">
                                Nervous system + hormonal control (dual control)
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-3 font-medium">Energy Production</td>
                              <td className="border border-gray-300 p-3">
                                Autotrophic (make own food via photosynthesis)
                              </td>
                              <td className="border border-gray-300 p-3">
                                Heterotrophic (obtain food from external sources)
                              </td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 p-3 font-medium">Response Speed</td>
                              <td className="border border-gray-300 p-3">Slow responses (hours to days)</td>
                              <td className="border border-gray-300 p-3">Rapid responses (milliseconds to seconds)</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-3 font-medium">Waste Management</td>
                              <td className="border border-gray-300 p-3">
                                Store waste in vacuoles or shed parts (leaves)
                              </td>
                              <td className="border border-gray-300 p-3">
                                Active excretion through kidneys, lungs, skin
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Functional Comparison */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
                        <h5 className="text-lg font-bold text-green-800 mb-3 flex items-center space-x-2">
                          <TreePine className="w-5 h-5" />
                          <span>Plant Tissue Advantages</span>
                        </h5>
                        <div className="space-y-3">
                          <div className="bg-white p-3 rounded border border-green-200">
                            <h6 className="font-semibold text-green-800 text-sm">Continuous Growth</h6>
                            <p className="text-green-700 text-xs">
                              Can grow throughout life, adapt to environment, regenerate lost parts
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded border border-green-200">
                            <h6 className="font-semibold text-green-800 text-sm">Self-Sufficiency</h6>
                            <p className="text-green-700 text-xs">
                              Make own food, don't need to hunt or search for nutrients
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded border border-green-200">
                            <h6 className="font-semibold text-green-800 text-sm">Structural Efficiency</h6>
                            <p className="text-green-700 text-xs">Cell walls provide support without heavy skeleton</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-2 border-pink-200 rounded-lg p-4 bg-pink-50">
                        <h5 className="text-lg font-bold text-pink-800 mb-3 flex items-center space-x-2">
                          <Heart className="w-5 h-5" />
                          <span>Animal Tissue Advantages</span>
                        </h5>
                        <div className="space-y-3">
                          <div className="bg-white p-3 rounded border border-pink-200">
                            <h6 className="font-semibold text-pink-800 text-sm">Rapid Response</h6>
                            <p className="text-pink-700 text-xs">
                              Nervous system allows instant reactions to danger or opportunities
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded border border-pink-200">
                            <h6 className="font-semibold text-pink-800 text-sm">Mobility</h6>
                            <p className="text-pink-700 text-xs">Can move to find food, escape danger, find mates</p>
                          </div>
                          <div className="bg-white p-3 rounded border border-pink-200">
                            <h6 className="font-semibold text-pink-800 text-sm">Complex Behavior</h6>
                            <p className="text-pink-700 text-xs">
                              Advanced nervous system enables learning, memory, complex behaviors
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Evolutionary Perspective */}
                    <div className="border-2 border-purple-200 rounded-lg p-5 bg-purple-50">
                      <h4 className="font-bold text-purple-800 text-lg mb-3 flex items-center space-x-2">
                        <Zap className="w-6 h-6" />
                        <span>Evolutionary Perspective: Why These Differences?</span>
                      </h4>

                      <div className="bg-white p-4 rounded border border-purple-200">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-semibold text-purple-800 mb-2">Plant Strategy: "Stay and Prosper"</h5>
                            <ul className="text-purple-700 text-sm space-y-1">
                              <li>• Anchor in one spot with strong roots</li>
                              <li>• Maximize surface area for sunlight capture</li>
                              <li>• Grow continuously to compete for light</li>
                              <li>• Store energy for tough times</li>
                              <li>• Reproduce by spreading seeds widely</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-purple-800 mb-2">Animal Strategy: "Move and Adapt"</h5>
                            <ul className="text-purple-700 text-sm space-y-1">
                              <li>• Develop mobility for finding resources</li>
                              <li>• Create rapid response systems</li>
                              <li>• Evolve complex behaviors</li>
                              <li>• Develop efficient metabolism</li>
                              <li>• Form social groups for survival</li>
                            </ul>
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-purple-100 rounded">
                          <p className="text-purple-800 text-sm text-center">
                            <strong>Bottom Line:</strong> Both strategies are incredibly successful - that's why we have
                            such amazing diversity of plants and animals on Earth!
                          </p>
                        </div>
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
                  <span>Test Your Tissue Knowledge</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">🧪 Challenge Problems</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800">
                          1. A student observes tissue under a microscope and sees cells with thick walls, no living
                          contents, and very little intercellular space. What type of plant tissue is this and what is
                          its function?
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>Hint: Think about the characteristics of different permanent tissues</em>
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800">
                          2. Explain why cardiac muscle is striated like skeletal muscle but involuntary like smooth
                          muscle. What advantage does this combination provide?
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>
                            Hint: Consider the heart's function and the need for continuous, powerful contractions
                          </em>
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800">
                          3. Why do plants have both xylem and phloem, while animals have only one circulatory system
                          (blood)? What does this tell us about their different lifestyles?
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>Hint: Think about what each system transports and the direction of transport</em>
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
                  <span>Tissue Master's Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-yellow-50 p-3 rounded">
                  <h4 className="font-semibold text-yellow-800 text-sm">Memory Trick</h4>
                  <p className="text-yellow-700 text-xs">
                    "ECMN" for animal tissues: Epithelial (covers), Connective (supports), Muscular (moves), Nervous
                    (controls)
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <h4 className="font-semibold text-blue-800 text-sm">Plant Tissues</h4>
                  <p className="text-blue-700 text-xs">
                    Meristematic = Growing, Permanent = Specialized. Simple = One type, Complex = Multiple types
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <h4 className="font-semibold text-green-800 text-sm">Function Focus</h4>
                  <p className="text-green-700 text-xs">
                    Always connect structure to function - thick walls = support, long fibers = transport
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Reference */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📋 Tissue Functions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="bg-gray-100 p-2 rounded">
                    <p className="font-medium">Meristematic:</p>
                    <p className="text-xs">Growth and development</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <p className="font-medium">Xylem & Phloem:</p>
                    <p className="text-xs">Transport water and food</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <p className="font-medium">Epithelial:</p>
                    <p className="text-xs">Protection and absorption</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <p className="font-medium">Muscular:</p>
                    <p className="text-xs">Movement and contraction</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tissue Locations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📍 Where to Find Them</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Apical meristem:</span>
                    <span>Root/shoot tips</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Xylem:</span>
                    <span>Vascular bundles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Cardiac muscle:</span>
                    <span>Heart only</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Neurons:</span>
                    <span>Brain, spinal cord</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Chapter Preview */}
            <Card className="bg-gradient-to-br from-orange-50 to-red-50">
              <CardHeader>
                <CardTitle className="text-lg">🔮 Coming Next</CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-orange-800 mb-2">Chapter 7: Diversity in Living Organisms</h4>
                <p className="text-orange-700 text-sm mb-3">
                  Explore the incredible variety of life on Earth and how scientists classify it!
                </p>
                <p className="text-xs text-orange-600">
                  <strong>Preview:</strong> From bacteria to blue whales - how do we organize the amazing diversity of
                  life?
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

// Add at the bottom of the file, before export or end of component
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
