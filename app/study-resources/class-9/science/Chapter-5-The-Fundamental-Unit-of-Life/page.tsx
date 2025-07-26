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
  History,
  Calculator,
  Activity,
  Layers,
  Search,
} from "lucide-react"
import "bootstrap/dist/css/bootstrap.min.css"

export default function Chapter5Notes() {

  const cellTypes = {
    animal: {
      name: "Animal Cell",
      color: "bg-pink-100 border-pink-200",
      textColor: "text-pink-800",
      organelles: [
        { name: "Nucleus", x: 50, y: 45, size: 12, color: "bg-purple-600" },
        { name: "Mitochondria", x: 25, y: 30, size: 6, color: "bg-red-500" },
        { name: "Mitochondria", x: 70, y: 65, size: 6, color: "bg-red-500" },
        { name: "ER", x: 35, y: 25, size: 8, color: "bg-blue-400" },
        { name: "ER", x: 65, y: 35, size: 8, color: "bg-blue-400" },
        { name: "Golgi", x: 30, y: 60, size: 7, color: "bg-yellow-500" },
        { name: "Ribosomes", x: 20, y: 50, size: 3, color: "bg-green-600" },
        { name: "Ribosomes", x: 75, y: 25, size: 3, color: "bg-green-600" },
        { name: "Ribosomes", x: 80, y: 50, size: 3, color: "bg-green-600" },
        { name: "Lysosomes", x: 60, y: 55, size: 4, color: "bg-orange-500" },
        { name: "Lysosomes", x: 40, y: 70, size: 4, color: "bg-orange-500" },
        { name: "Centrosome", x: 55, y: 35, size: 4, color: "bg-indigo-600" },
      ],
    },
    plant: {
      name: "Plant Cell",
      color: "bg-green-100 border-green-200",
      textColor: "text-green-800",
      organelles: [
        { name: "Nucleus", x: 45, y: 50, size: 10, color: "bg-purple-600" },
        { name: "Chloroplasts", x: 25, y: 35, size: 8, color: "bg-green-600" },
        { name: "Chloroplasts", x: 70, y: 30, size: 8, color: "bg-green-600" },
        { name: "Chloroplasts", x: 30, y: 65, size: 8, color: "bg-green-600" },
        { name: "Mitochondria", x: 65, y: 60, size: 5, color: "bg-red-500" },
        { name: "ER", x: 35, y: 40, size: 7, color: "bg-blue-400" },
        { name: "ER", x: 60, y: 45, size: 7, color: "bg-blue-400" },
        { name: "Golgi", x: 55, y: 65, size: 6, color: "bg-yellow-500" },
        { name: "Ribosomes", x: 25, y: 55, size: 2, color: "bg-green-600" },
        { name: "Ribosomes", x: 75, y: 40, size: 2, color: "bg-green-600" },
        { name: "Vacuole", x: 75, y: 65, size: 15, color: "bg-cyan-400" },
      ],
    },
  } as const;

  type CellTypeKey = keyof typeof cellTypes;

  const [selectedCellType, setSelectedCellType] = useState<CellTypeKey>("animal");

  const organelleDetails = {
    nucleus: {
      name: "Nucleus",
      function: "Control center of the cell, contains DNA",
      structure: "Double membrane with nuclear pores",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-800",
    },
    mitochondria: {
      name: "Mitochondria",
      function: "Powerhouse of the cell, produces ATP energy",
      structure: "Double membrane with cristae",
      color: "bg-red-100 border-red-200",
      textColor: "text-red-800",
    },
    chloroplasts: {
      name: "Chloroplasts",
      function: "Site of photosynthesis, contains chlorophyll",
      structure: "Double membrane with thylakoids and grana",
      color: "bg-green-100 border-green-200",
      textColor: "text-green-800",
    },
    er: {
      name: "Endoplasmic Reticulum",
      function: "Transport system and protein synthesis",
      structure: "Network of membranes (Rough ER has ribosomes)",
      color: "bg-blue-100 border-blue-200",
      textColor: "text-blue-800",
    },
    golgi: {
      name: "Golgi Apparatus",
      function: "Packaging and shipping center",
      structure: "Stack of flattened membrane sacs",
      color: "bg-yellow-100 border-yellow-200",
      textColor: "text-yellow-800",
    },
    ribosomes: {
      name: "Ribosomes",
      function: "Protein synthesis factories",
      structure: "Small structures made of RNA and proteins",
      color: "bg-green-100 border-green-200",
      textColor: "text-green-800",
    },
  } as const;

  type OrganelleKey = keyof typeof organelleDetails;
  const [selectedOrganelle, setSelectedOrganelle] = useState<OrganelleKey>("nucleus");
  const [selectedComparison, setSelectedComparison] = useState("prokaryotic-eukaryotic")

  return (
    <div className="container-fluid min-vh-100 bg-gray-50 px-0">
      {/* Header */}
      <header className="bg-white shadow-sm border-bottom">
        <div className="container px-4 py-4">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h1 className="h4 font-bold text-gray-900">Class 9 Science Notes</h1>
              <p className="text-gray-600">Chapter 5: The Fundamental Unit of Life</p>
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
            <Card className="border-l-4 border-l-green-600">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <Users className="w-5 h-5" />
                  <span>Welcome to the Microscopic Universe!</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-green-50">
                <p className="text-green-900 leading-relaxed">
                  <strong>Dear Cell Explorers,</strong> Today we're going on an incredible journey into the smallest
                  living units that make up all life on Earth - CELLS! Imagine that your entire body is made up of
                  trillions of these tiny factories, each working 24/7 to keep you alive. From the tiniest bacteria to
                  the largest whale, every living thing is made of cells. In my years of teaching, I've seen students
                  amazed when they realize that a single cell can be a complete living organism! Get ready to discover
                  the bustling cities inside every living thing, where organelles work like specialized departments in a
                  mega-corporation!
                </p>
              </CardContent>
            </Card>

            {/* Learning Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span>Our Cellular Discovery Mission</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">By the end of this chapter, you will:</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Understand the cell theory and discovery of cells</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Distinguish between prokaryotic and eukaryotic cells</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Compare plant and animal cell structures</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Identify organelles and understand their functions</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                    <h4 className="font-semibold text-cyan-800 mb-2">🔬 Amazing Cell Facts</h4>
                    <p className="text-cyan-700 text-sm">
                      Your body has about 37 trillion cells! If you lined them up, they would stretch around the Earth's
                      equator about 2.5 times. Yet each cell is so small that 10,000 could fit on the head of a pin!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content Tabs */}
            <Tabs defaultValue="discovery" className="space-y-4">
              <TabsList className="w-full overflow-x-auto flex flex-nowrap gap-2">
                <TabsTrigger value="discovery">Cell Discovery</TabsTrigger>
                <TabsTrigger value="types">Cell Types</TabsTrigger>
                <TabsTrigger value="structure">Cell Structure</TabsTrigger>
                <TabsTrigger value="organelles">Organelles</TabsTrigger>
              </TabsList>

              <TabsContent value="discovery" className="space-y-6">
                {/* Discovery of Cells and Cell Theory */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <History className="w-6 h-6 text-indigo-600" />
                      <span>Discovery of Cells: The Greatest Scientific Revolution</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Timeline Introduction */}
                    <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-200">
                      <h4 className="font-semibold text-indigo-800 mb-3">🕰️ The Microscopic Revolution</h4>
                      <p className="text-indigo-700 leading-relaxed">
                        Before the 1600s, nobody knew that living things were made of tiny units called cells. The
                        invention of the microscope opened up an entirely new world - the microscopic world! This
                        discovery was as revolutionary as discovering that the Earth revolves around the Sun. Let's
                        follow the amazing journey of how scientists discovered the fundamental unit of life!
                      </p>
                    </div>

                    {/* Discovery Timeline */}
                    <div className="space-y-6">
                      {/* Robert Hooke */}
                      <div className="border-2 border-amber-200 rounded-lg p-5 bg-amber-50">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="text-3xl">🔬</div>
                          <div>
                            <h4 className="text-xl font-bold text-amber-800">ROBERT HOOKE (1665)</h4>
                            <p className="text-amber-600">The First Person to See and Name "Cells"</p>
                          </div>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="hooke-discovery">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 font-bold">
                                  🧪
                                </div>
                                <span>The Cork Experiment</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-amber-200">
                                <h5 className="font-semibold text-amber-800 mb-3">What Hooke Did:</h5>

                                {/* Visual representation */}
                                <div className="bg-gray-100 p-4 rounded-lg mb-3">
                                  <div className="grid grid-cols-6 gap-1 max-w-48 mx-auto">
                                    {Array.from({ length: 24 }, (_, i) => (
                                      <div key={i} className="w-6 h-6 border-2 border-amber-400 bg-amber-100"></div>
                                    ))}
                                  </div>
                                  <p className="text-xs text-center mt-2">Cork cells as seen by Hooke</p>
                                </div>

                                <div className="space-y-2 text-amber-700 text-sm">
                                  <p>
                                    <strong>Step 1:</strong> Cut a thin slice of cork from a tree
                                  </p>
                                  <p>
                                    <strong>Step 2:</strong> Observed it under his handmade microscope
                                  </p>
                                  <p>
                                    <strong>Step 3:</strong> Saw tiny box-like compartments
                                  </p>
                                  <p>
                                    <strong>Step 4:</strong> Named them "cells" (like small rooms in a monastery)
                                  </p>
                                </div>
                              </div>

                              <div className="bg-amber-100 p-3 rounded">
                                <h5 className="font-semibold text-amber-800">Historic Significance:</h5>
                                <p className="text-amber-700 text-sm">
                                  Hooke was actually looking at dead cell walls, but he gave us the word "CELL" that we
                                  still use today! His book "Micrographia" amazed the world.
                                </p>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* Leeuwenhoek */}
                      <div className="border-2 border-blue-200 rounded-lg p-5 bg-blue-50">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="text-3xl">🦠</div>
                          <div>
                            <h4 className="text-xl font-bold text-blue-800">ANTON VAN LEEUWENHOEK (1674)</h4>
                            <p className="text-blue-600">Father of Microbiology - First to See Living Cells</p>
                          </div>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="leeuwenhoek-discovery">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                  👁️
                                </div>
                                <span>The Living World Discovery</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-blue-200">
                                <h5 className="font-semibold text-blue-800 mb-3">Amazing Discoveries:</h5>

                                <div className="grid md:grid-cols-2 gap-4 mb-3">
                                  <div className="bg-blue-50 p-3 rounded">
                                    <h6 className="font-semibold text-blue-800">Bacteria</h6>
                                    <p className="text-blue-700 text-sm">First person to see bacteria in pond water</p>
                                  </div>
                                  <div className="bg-blue-50 p-3 rounded">
                                    <h6 className="font-semibold text-blue-800">Protozoa</h6>
                                    <p className="text-blue-700 text-sm">Discovered single-celled animals</p>
                                  </div>
                                  <div className="bg-blue-50 p-3 rounded">
                                    <h6 className="font-semibold text-blue-800">Sperm Cells</h6>
                                    <p className="text-blue-700 text-sm">First to observe human sperm cells</p>
                                  </div>
                                  <div className="bg-blue-50 p-3 rounded">
                                    <h6 className="font-semibold text-blue-800">Blood Cells</h6>
                                    <p className="text-blue-700 text-sm">Saw red blood cells in detail</p>
                                  </div>
                                </div>

                                <div className="bg-blue-100 p-3 rounded">
                                  <p className="text-blue-800 text-sm">
                                    <strong>Revolutionary Insight:</strong> Leeuwenhoek realized these were LIVING
                                    organisms, not just structures. He called them "animalcules" (little animals).
                                  </p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* Cell Theory */}
                      <div className="border-2 border-green-200 rounded-lg p-5 bg-green-50">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="text-3xl">🧬</div>
                          <div>
                            <h4 className="text-xl font-bold text-green-800">CELL THEORY (1838-1855)</h4>
                            <p className="text-green-600">Schleiden, Schwann & Virchow - The Three Pillars</p>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <h5 className="font-semibold text-green-800 mb-4">The Three Fundamental Principles:</h5>

                          <div className="space-y-4">
                            <div className="flex items-start space-x-3 p-3 bg-green-100 rounded">
                              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                1
                              </div>
                              <div>
                                <h6 className="font-semibold text-green-800">All living things are made of cells</h6>
                                <p className="text-green-700 text-sm">
                                  Matthias Schleiden (plants) & Theodor Schwann (animals)
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start space-x-3 p-3 bg-green-100 rounded">
                              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                2
                              </div>
                              <div>
                                <h6 className="font-semibold text-green-800">The cell is the basic unit of life</h6>
                                <p className="text-green-700 text-sm">
                                  Cells are the smallest units that can be called "living"
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start space-x-3 p-3 bg-green-100 rounded">
                              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                3
                              </div>
                              <div>
                                <h6 className="font-semibold text-green-800">All cells come from pre-existing cells</h6>
                                <p className="text-green-700 text-sm">Rudolf Virchow - "Omnis cellula e cellula"</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 p-3 bg-green-200 rounded">
                            <p className="text-green-800 text-sm font-semibold">
                              💡 This theory revolutionized biology and medicine, explaining how life works at its most
                              basic level!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Modern Cell Biology */}
                    <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-3">🔬 Modern Cell Biology</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded border border-purple-200">
                          <h5 className="font-semibold text-purple-800">Electron Microscope</h5>
                          <p className="text-purple-700 text-sm">
                            Invented in 1931, allows us to see cell structures 1000x smaller than light microscopes can
                            show
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded border border-purple-200">
                          <h5 className="font-semibold text-purple-800">Modern Discoveries</h5>
                          <p className="text-purple-700 text-sm">
                            DNA structure, organelle functions, cell division mechanisms, and genetic engineering
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="types" className="space-y-6">
                {/* Types of Cells */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Layers className="w-6 h-6 text-teal-600" />
                      <span>Types of Cells: The Great Divide</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Introduction */}
                    <div className="bg-teal-50 p-5 rounded-lg border border-teal-200">
                      <h4 className="font-semibold text-teal-800 mb-3">🌍 Two Worlds of Cells</h4>
                      <p className="text-teal-700 leading-relaxed">
                        All life on Earth can be divided into two major groups based on cell structure: Prokaryotes
                        (before nucleus) and Eukaryotes (true nucleus). This fundamental difference shapes how organisms
                        live, reproduce, and evolve. Let's explore these two amazing worlds!
                      </p>
                    </div>

                    {/* Comparison Selector */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-3">🔍 Interactive Cell Comparison</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Button
                          variant={selectedComparison === "prokaryotic-eukaryotic" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedComparison("prokaryotic-eukaryotic")}
                        >
                          Prokaryotic vs Eukaryotic
                        </Button>
                        <Button
                          variant={selectedComparison === "plant-animal" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedComparison("plant-animal")}
                        >
                          Plant vs Animal
                        </Button>
                        <Button
                          variant={selectedComparison === "unicellular-multicellular" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedComparison("unicellular-multicellular")}
                        >
                          Unicellular vs Multicellular
                        </Button>
                      </div>

                      {/* Prokaryotic vs Eukaryotic */}
                      {selectedComparison === "prokaryotic-eukaryotic" && (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50">
                            <h5 className="text-xl font-bold text-orange-800 mb-3 flex items-center space-x-2">
                              <span>🦠</span>
                              <span>Prokaryotic Cells</span>
                            </h5>

                            {/* Simple prokaryotic cell diagram */}
                            <div className="bg-white p-4 rounded-lg mb-4 border border-orange-200">
                              <div className="w-32 h-24 mx-auto relative border-2 border-orange-400 rounded-full bg-orange-100">
                                <div className="absolute top-2 left-4 w-6 h-4 bg-blue-400 rounded opacity-60"></div>
                                <div className="absolute top-4 right-6 w-4 h-3 bg-green-500 rounded opacity-60"></div>
                                <div className="absolute bottom-3 left-8 w-5 h-3 bg-purple-400 rounded opacity-60"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-orange-800">
                                  DNA
                                </div>
                              </div>
                              <p className="text-center text-xs text-orange-700 mt-2">Bacterial Cell</p>
                            </div>

                            <div className="space-y-3">
                              <div className="bg-white p-3 rounded border border-orange-200">
                                <h6 className="font-semibold text-orange-800">Key Features:</h6>
                                <ul className="text-orange-700 text-sm mt-1 space-y-1">
                                  <li>• No true nucleus (DNA freely floating)</li>
                                  <li>• No membrane-bound organelles</li>
                                  <li>• Smaller and simpler structure</li>
                                  <li>• Cell wall present</li>
                                  <li>• Reproduce by binary fission</li>
                                </ul>
                              </div>

                              <div className="bg-orange-100 p-3 rounded">
                                <h6 className="font-semibold text-orange-800">Examples:</h6>
                                <p className="text-orange-700 text-sm">Bacteria, Blue-green algae (Cyanobacteria)</p>
                              </div>
                            </div>
                          </div>

                          <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
                            <h5 className="text-xl font-bold text-purple-800 mb-3 flex items-center space-x-2">
                              <span>🧬</span>
                              <span>Eukaryotic Cells</span>
                            </h5>

                            {/* Simple eukaryotic cell diagram */}
                            <div className="bg-white p-4 rounded-lg mb-4 border border-purple-200">
                              <div className="w-32 h-24 mx-auto relative border-2 border-purple-400 rounded-lg bg-purple-100">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-6 bg-purple-600 rounded border border-purple-800"></div>
                                <div className="absolute top-2 left-2 w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full"></div>
                                <div className="absolute bottom-2 left-3 w-4 h-2 bg-yellow-500 rounded"></div>
                                <div className="absolute bottom-2 right-3 w-3 h-3 bg-blue-500 rounded-full"></div>
                              </div>
                              <p className="text-center text-xs text-purple-700 mt-2">Animal/Plant Cell</p>
                            </div>

                            <div className="space-y-3">
                              <div className="bg-white p-3 rounded border border-purple-200">
                                <h6 className="font-semibold text-purple-800">Key Features:</h6>
                                <ul className="text-purple-700 text-sm mt-1 space-y-1">
                                  <li>• True nucleus with nuclear membrane</li>
                                  <li>• Membrane-bound organelles</li>
                                  <li>• Larger and more complex</li>
                                  <li>• Advanced cellular functions</li>
                                  <li>• Reproduce by mitosis/meiosis</li>
                                </ul>
                              </div>

                              <div className="bg-purple-100 p-3 rounded">
                                <h6 className="font-semibold text-purple-800">Examples:</h6>
                                <p className="text-purple-700 text-sm">Plants, Animals, Fungi, Protists</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Plant vs Animal */}
                      {selectedComparison === "plant-animal" && (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
                            <h5 className="text-xl font-bold text-green-800 mb-3 flex items-center space-x-2">
                              <span>🌱</span>
                              <span>Plant Cells</span>
                            </h5>

                            <div className="space-y-3">
                              <div className="bg-white p-3 rounded border border-green-200">
                                <h6 className="font-semibold text-green-800">Unique Features:</h6>
                                <ul className="text-green-700 text-sm mt-1 space-y-1">
                                  <li>
                                    • <strong>Cell Wall:</strong> Rigid structure for support
                                  </li>
                                  <li>
                                    • <strong>Chloroplasts:</strong> For photosynthesis
                                  </li>
                                  <li>
                                    • <strong>Large Vacuole:</strong> Storage and support
                                  </li>
                                  <li>
                                    • <strong>Plasmodesmata:</strong> Connections between cells
                                  </li>
                                </ul>
                              </div>

                              <div className="bg-green-100 p-3 rounded">
                                <h6 className="font-semibold text-green-800">Special Abilities:</h6>
                                <ul className="text-green-700 text-sm mt-1 space-y-1">
                                  <li>• Make their own food (autotrophic)</li>
                                  <li>• Convert sunlight to chemical energy</li>
                                  <li>• Produce oxygen as byproduct</li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="border-2 border-pink-200 rounded-lg p-4 bg-pink-50">
                            <h5 className="text-xl font-bold text-pink-800 mb-3 flex items-center space-x-2">
                              <span>🐾</span>
                              <span>Animal Cells</span>
                            </h5>

                            <div className="space-y-3">
                              <div className="bg-white p-3 rounded border border-pink-200">
                                <h6 className="font-semibold text-pink-800">Unique Features:</h6>
                                <ul className="text-pink-700 text-sm mt-1 space-y-1">
                                  <li>
                                    • <strong>Centrosomes:</strong> For cell division
                                  </li>
                                  <li>
                                    • <strong>Lysosomes:</strong> Digestive organelles
                                  </li>
                                  <li>
                                    • <strong>Small Vacuoles:</strong> Multiple small ones
                                  </li>
                                  <li>
                                    • <strong>Flexible Shape:</strong> No rigid cell wall
                                  </li>
                                </ul>
                              </div>

                              <div className="bg-pink-100 p-3 rounded">
                                <h6 className="font-semibold text-pink-800">Special Abilities:</h6>
                                <ul className="text-pink-700 text-sm mt-1 space-y-1">
                                  <li>• Movement and locomotion</li>
                                  <li>• Rapid response to stimuli</li>
                                  <li>• Complex nervous systems</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Unicellular vs Multicellular */}
                      {selectedComparison === "unicellular-multicellular" && (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                            <h5 className="text-xl font-bold text-blue-800 mb-3 flex items-center space-x-2">
                              <span>⚪</span>
                              <span>Unicellular Organisms</span>
                            </h5>

                            <div className="space-y-3">
                              <div className="bg-white p-3 rounded border border-blue-200">
                                <h6 className="font-semibold text-blue-800">Characteristics:</h6>
                                <ul className="text-blue-700 text-sm mt-1 space-y-1">
                                  <li>• Made of only ONE cell</li>
                                  <li>• Single cell performs all life functions</li>
                                  <li>• Reproduce by cell division</li>
                                  <li>• Can be prokaryotic or eukaryotic</li>
                                </ul>
                              </div>

                              <div className="bg-blue-100 p-3 rounded">
                                <h6 className="font-semibold text-blue-800">Examples:</h6>
                                <p className="text-blue-700 text-sm">Bacteria, Amoeba, Paramecium, Euglena, Yeast</p>
                              </div>
                            </div>
                          </div>

                          <div className="border-2 border-red-200 rounded-lg p-4 bg-red-50">
                            <h5 className="text-xl font-bold text-red-800 mb-3 flex items-center space-x-2">
                              <span>🔗</span>
                              <span>Multicellular Organisms</span>
                            </h5>

                            <div className="space-y-3">
                              <div className="bg-white p-3 rounded border border-red-200">
                                <h6 className="font-semibold text-red-800">Characteristics:</h6>
                                <ul className="text-red-700 text-sm mt-1 space-y-1">
                                  <li>• Made of MANY cells</li>
                                  <li>• Cells specialize for different functions</li>
                                  <li>• Complex organization and coordination</li>
                                  <li>• Always eukaryotic</li>
                                </ul>
                              </div>

                              <div className="bg-red-100 p-3 rounded">
                                <h6 className="font-semibold text-red-800">Examples:</h6>
                                <p className="text-red-700 text-sm">Humans, Trees, Mushrooms, Fish, Birds</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Comparison Table */}
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3">📊 Complete Cell Comparison</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                          <thead>
                            <tr className="bg-indigo-600 text-white">
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Feature</th>
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Prokaryotic</th>
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Plant Cell</th>
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Animal Cell</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 p-3 font-medium">Nucleus</td>
                              <td className="border border-gray-300 p-3">No true nucleus</td>
                              <td className="border border-gray-300 p-3">Present</td>
                              <td className="border border-gray-300 p-3">Present</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-3 font-medium">Cell Wall</td>
                              <td className="border border-gray-300 p-3">Present</td>
                              <td className="border border-gray-300 p-3">Present (cellulose)</td>
                              <td className="border border-gray-300 p-3">Absent</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 p-3 font-medium">Chloroplasts</td>
                              <td className="border border-gray-300 p-3">Absent</td>
                              <td className="border border-gray-300 p-3">Present</td>
                              <td className="border border-gray-300 p-3">Absent</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-3 font-medium">Vacuoles</td>
                              <td className="border border-gray-300 p-3">Absent</td>
                              <td className="border border-gray-300 p-3">Large central vacuole</td>
                              <td className="border border-gray-300 p-3">Small, multiple</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 p-3 font-medium">Lysosomes</td>
                              <td className="border border-gray-300 p-3">Absent</td>
                              <td className="border border-gray-300 p-3">Rare</td>
                              <td className="border border-gray-300 p-3">Present</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="structure" className="space-y-6">
                {/* Cell Structure */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="w-6 h-6 text-emerald-600" />
                      <span>Interactive Cell Structure Explorer</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Cell Type Selector */}
                    <div className="bg-emerald-50 p-5 rounded-lg border border-emerald-200">
                      <h4 className="font-semibold text-emerald-800 mb-3">🔬 Explore Cell Structures</h4>
                      <p className="text-emerald-700 mb-4">
                        Select a cell type to explore its structure and see how different organelles are arranged. Click
                        on organelles to learn about their functions!
                      </p>

                      <div className="flex gap-2 mb-4">
                        {Object.entries(cellTypes).map(([key, cell]) => (
                          <Button
                            key={key}
                            variant={selectedCellType === key ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCellType(key as CellTypeKey)}
                            className="flex items-center space-x-2"
                          >
                            <span>{key === "animal" ? "🐾" : "🌱"}</span>
                            <span>{cell.name}</span>
                          </Button>
                        ))}
                      </div>

                      {/* Interactive Cell Diagram */}
                      <div className={`bg-white p-6 rounded-lg border-2 ${cellTypes[selectedCellType].color}`}>
                        <h5 className={`text-xl font-bold mb-4 ${cellTypes[selectedCellType].textColor}`}>
                          {cellTypes[selectedCellType].name} Structure
                        </h5>

                        <div className="relative">
                          {/* Cell boundary */}
                          <div className="w-80 h-60 mx-auto relative border-4 border-gray-400 rounded-lg bg-gray-50 overflow-hidden">
                            {/* Cell wall for plant cells */}
                            {selectedCellType === "plant" && (
                              <div className="absolute inset-0 border-4 border-green-600 rounded-lg"></div>
                            )}

                            {/* Cell membrane */}
                            <div className="absolute inset-1 border-2 border-blue-500 rounded-lg bg-blue-50 opacity-30"></div>

                            {/* Organelles */}
                            {cellTypes[selectedCellType].organelles.map((organelle, index) => (
                              <div
                                key={index}
                                className={`absolute ${organelle.color} rounded-full cursor-pointer hover:scale-110 transition-transform border-2 border-gray-600 flex items-center justify-center text-white text-xs font-bold`}
                                style={{
                                  left: `${organelle.x}%`,
                                  top: `${organelle.y}%`,
                                  width: `${organelle.size}%`,
                                  height: `${organelle.size * 0.8}%`,
                                  transform: "translate(-50%, -50%)",
                                }}
                                title={organelle.name}
                              >
                                {organelle.size > 8 && organelle.name.charAt(0)}
                              </div>
                            ))}

                            {/* Labels */}
                            <div className="absolute -bottom-8 left-0 right-0 text-center">
                              <p className="text-sm text-gray-600">
                                {selectedCellType === "plant" ? "🌱 Plant Cell" : "🐾 Animal Cell"}
                              </p>
                            </div>
                          </div>

                          {/* Legend */}
                          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                              <span>Nucleus</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <span>Mitochondria</span>
                            </div>
                            {selectedCellType === "plant" && (
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                <span>Chloroplasts</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                              <span>ER</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                              <span>Golgi</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                              <span>Ribosomes</span>
                            </div>
                            {selectedCellType === "animal" && (
                              <>
                                <div className="flex items-center space-x-2">
                                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                  <span>Lysosomes</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                                  <span>Centrosome</span>
                                </div>
                              </>
                            )}
                            {selectedCellType === "plant" && (
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                                <span>Vacuole</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cell Components Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                        <h5 className="text-lg font-bold text-blue-800 mb-3">🧱 Cell Boundary Structures</h5>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="cell-membrane">
                            <AccordionTrigger className="text-left">
                              <span className="font-semibold text-blue-800">Cell Membrane (Plasma Membrane)</span>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-2">
                              <div className="bg-white p-3 rounded border border-blue-200">
                                <p className="text-blue-700 text-sm mb-2">
                                  <strong>Function:</strong> Controls what enters and exits the cell
                                </p>
                                <p className="text-blue-700 text-sm mb-2">
                                  <strong>Structure:</strong> Double layer of phospholipids with proteins
                                </p>
                                <p className="text-blue-700 text-sm">
                                  <strong>Special Property:</strong> Selectively permeable - allows some substances
                                  through but not others
                                </p>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="cell-wall">
                            <AccordionTrigger className="text-left">
                              <span className="font-semibold text-blue-800">Cell Wall (Plants Only)</span>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-2">
                              <div className="bg-white p-3 rounded border border-blue-200">
                                <p className="text-blue-700 text-sm mb-2">
                                  <strong>Function:</strong> Provides structural support and protection
                                </p>
                                <p className="text-blue-700 text-sm mb-2">
                                  <strong>Material:</strong> Made of cellulose (very strong!)
                                </p>
                                <p className="text-blue-700 text-sm">
                                  <strong>Why animals don't have it:</strong> Animals need flexibility for movement
                                </p>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
                        <h5 className="text-lg font-bold text-purple-800 mb-3">🧬 Control Center</h5>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="nucleus">
                            <AccordionTrigger className="text-left">
                              <span className="font-semibold text-purple-800">Nucleus - The Boss</span>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-2">
                              <div className="bg-white p-3 rounded border border-purple-200">
                                <p className="text-purple-700 text-sm mb-2">
                                  <strong>Function:</strong> Controls all cell activities and contains DNA
                                </p>
                                <p className="text-purple-700 text-sm mb-2">
                                  <strong>Parts:</strong> Nuclear membrane, nucleoplasm, nucleolus, chromatin
                                </p>
                                <p className="text-purple-700 text-sm">
                                  <strong>Fun Fact:</strong> If the cell is a city, the nucleus is the city hall!
                                </p>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="nuclear-parts">
                            <AccordionTrigger className="text-left">
                              <span className="font-semibold text-purple-800">Nuclear Components</span>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-2">
                              <div className="bg-white p-3 rounded border border-purple-200">
                                <div className="space-y-2 text-sm">
                                  <p className="text-purple-700">
                                    <strong>Nuclear Membrane:</strong> Double membrane with pores
                                  </p>
                                  <p className="text-purple-700">
                                    <strong>Nucleolus:</strong> 
                                    <span className="d-inline d-md-block">Makes ribosomes</span>Makes ribosomes
                                  </p>
                                  <p className="text-purple-700">
                                    <strong>Chromatin:</strong> DNA + proteins (becomes chromosomes during division)
                                  </p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>

                    {/* Cytoplasm */}
                    <div className="border-2 border-cyan-200 rounded-lg p-4 bg-cyan-50">
                      <h5 className="text-lg font-bold text-cyan-800 mb-3">🌊 Cytoplasm - The Cell's Ocean</h5>
                      <div className="bg-white p-4 rounded border border-cyan-200">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-semibold text-cyan-800 mb-2">What is Cytoplasm?</h6>
                            <p className="text-cyan-700 text-sm mb-2">
                              Jelly-like substance that fills the cell between the nucleus and cell membrane
                            </p>
                            <p className="text-cyan-700 text-sm">
                              <strong>Composition:</strong> Water (70-90%), proteins, salts, and other molecules
                            </p>
                          </div>
                          <div>
                            <h6 className="font-semibold text-cyan-800 mb-2">Functions:</h6>
                            <ul className="text-cyan-700 text-sm space-y-1">
                              <li>• Holds organelles in place</li>
                              <li>• Medium for chemical reactions</li>
                              <li>• Helps transport materials</li>
                              <li>• Maintains cell shape</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="organelles" className="space-y-6">
                {/* Organelles */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Search className="w-6 h-6 text-orange-600" />
                      <span>Cell Organelles: The Cellular Workforce</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Introduction */}
                    <div className="bg-orange-50 p-5 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-800 mb-3">🏭 The Cell Factory</h4>
                      <p className="text-orange-700 leading-relaxed">
                        Think of a cell as a bustling factory with different departments, each with specialized workers
                        called organelles. Just like how a factory has different sections for manufacturing, packaging,
                        shipping, and quality control, cells have organelles that perform specific jobs to keep the cell
                        alive and functioning!
                      </p>
                    </div>

                    {/* Organelle Selector */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-3">🔍 Explore Organelles</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {Object.entries(organelleDetails).map(([key, organelle]) => (
                          <Button
                            key={key}
                            variant={selectedOrganelle === key ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedOrganelle(key as OrganelleKey)}
                            className="flex items-center space-x-2 mb-2 me-2"
                          >
                            <span>{organelle.name}</span>
                          </Button>
                        ))}
                      </div>

                      {/* Selected Organelle Details */}
                      <div className={`border-2 rounded-lg p-4 ${organelleDetails[selectedOrganelle].color}`}>
                        <h5 className={`text-xl font-bold mb-3 ${organelleDetails[selectedOrganelle].textColor}`}>
                          {organelleDetails[selectedOrganelle].name}
                        </h5>

                        <div className="bg-white p-4 rounded border">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h6 className={`font-semibold mb-2 ${organelleDetails[selectedOrganelle].textColor}`}>
                                Primary Function:
                              </h6>
                              <p className="text-gray-700 text-sm mb-3">
                                {organelleDetails[selectedOrganelle].function}
                              </p>
                            </div>
                            <div>
                              <h6 className={`font-semibold mb-2 ${organelleDetails[selectedOrganelle].textColor}`}>
                                Structure:
                              </h6>
                              <p className="text-gray-700 text-sm">{organelleDetails[selectedOrganelle].structure}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Organelle Information */}
                    <div className="space-y-6">
                      {/* Energy Organelles */}
                      <div className="border-2 border-red-200 rounded-lg p-5 bg-red-50">
                        <h4 className="font-bold text-red-800 text-lg mb-3 flex items-center space-x-2">
                          <Zap className="w-6 h-6" />
                          <span>Energy Production Centers</span>
                        </h4>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="mitochondria">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-800 font-bold">
                                  ⚡
                                </div>
                                <span>Mitochondria - The Powerhouse</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-red-200">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h5 className="font-semibold text-red-800 mb-2">Structure:</h5>
                                    <ul className="text-red-700 text-sm space-y-1">
                                      <li>• Double membrane structure</li>
                                      <li>• Inner membrane has folds called cristae</li>
                                      <li>• Contains its own DNA!</li>
                                      <li>• Matrix (inner space) has enzymes</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-red-800 mb-2">Functions:</h5>
                                    <ul className="text-red-700 text-sm space-y-1">
                                      <li>• Produces ATP (cellular energy currency)</li>
                                      <li>• Cellular respiration</li>
                                      <li>• More mitochondria = more energy needed</li>
                                      <li>• Found in all eukaryotic cells</li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="mt-4 p-3 bg-red-100 rounded">
                                  <p className="text-red-800 text-sm">
                                    <strong>Amazing Fact:</strong> Muscle cells have thousands of mitochondria because
                                    they need lots of energy for movement!
                                  </p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="chloroplasts">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">
                                  🌱
                                </div>
                                <span>Chloroplasts - The Solar Panels (Plants Only)</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-green-200">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h5 className="font-semibold text-green-800 mb-2">Structure:</h5>
                                    <ul className="text-green-700 text-sm space-y-1">
                                      <li>• Double membrane like mitochondria</li>
                                      <li>• Contains thylakoids (disc-like structures)</li>
                                      <li>• Grana (stacks of thylakoids)</li>
                                      <li>• Stroma (fluid-filled space)</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-green-800 mb-2">Functions:</h5>
                                    <ul className="text-green-700 text-sm space-y-1">
                                      <li>• Photosynthesis (making food from sunlight)</li>
                                      <li>• Contains chlorophyll (green pigment)</li>
                                      <li>• Converts CO₂ + H₂O → glucose + O₂</li>
                                      <li>• Produces oxygen for all life!</li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="mt-4 p-3 bg-green-100 rounded">
                                  <p className="text-green-800 text-sm">
                                    <strong>Life Connection:</strong> Without chloroplasts, there would be no oxygen in
                                    our atmosphere and no food for any living thing!
                                  </p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* Manufacturing and Transport */}
                      <div className="border-2 border-blue-200 rounded-lg p-5 bg-blue-50">
                        <h4 className="font-bold text-blue-800 text-lg mb-3 flex items-center space-x-2">
                          <Activity className="w-6 h-6" />
                          <span>Manufacturing and Transport System</span>
                        </h4>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="endoplasmic-reticulum">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                  🏭
                                </div>
                                <span>Endoplasmic Reticulum (ER) - The Highway System</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-blue-200">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div className="border-r border-blue-200 pr-4">
                                    <h5 className="font-semibold text-blue-800 mb-2">Rough ER</h5>
                                    <ul className="text-blue-700 text-sm space-y-1 mb-3">
                                      <li>• Has ribosomes attached (looks bumpy)</li>
                                      <li>• Makes proteins for export</li>
                                      <li>• Connected to nuclear membrane</li>
                                      <li>• Abundant in protein-secreting cells</li>
                                    </ul>
                                    <div className="bg-blue-100 p-2 rounded">
                                      <p className="text-blue-800 text-xs">
                                        <strong>Example:</strong> Pancreas cells making digestive enzymes
                                      </p>
                                    </div>
                                  </div>
                                  <div className="pl-4">
                                    <h5 className="font-semibold text-blue-800 mb-2">Smooth ER</h5>
                                    <ul className="text-blue-700 text-sm space-y-1 mb-3">
                                      <li>• No ribosomes (looks smooth)</li>
                                      <li>• Makes lipids and steroids</li>
                                      <li>• Detoxifies harmful substances</li>
                                      <li>• Stores calcium ions</li>
                                    </ul>
                                    <div className="bg-blue-100 p-2 rounded">
                                      <p className="text-blue-800 text-xs">
                                        <strong>Example:</strong> Liver cells detoxifying alcohol
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="golgi-apparatus">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-800 font-bold">
                                  📦
                                </div>
                                <span>Golgi Apparatus - The Packaging Center</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-yellow-200">
                                <div className="space-y-3">
                                  <div>
                                    <h5 className="font-semibold text-yellow-800 mb-2">Structure:</h5>
                                    <p className="text-yellow-700 text-sm">
                                      Stack of flattened membrane sacs called cisternae, like a stack of pancakes
                                    </p>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-yellow-800 mb-2">Functions:</h5>
                                    <ul className="text-yellow-700 text-sm space-y-1">
                                      <li>• Receives proteins from Rough ER</li>
                                      <li>• Modifies and processes proteins</li>
                                      <li>• Packages proteins in vesicles</li>
                                      <li>• Ships proteins to their destinations</li>
                                      <li>• Makes lysosomes</li>
                                    </ul>
                                  </div>

                                  <div className="bg-yellow-100 p-3 rounded">
                                    <p className="text-yellow-800 text-sm">
                                      <strong>Analogy:</strong> Like a post office that receives packages, adds labels
                                      and addresses, then ships them out!
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="ribosomes">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">
                                  🔧
                                </div>
                                <span>Ribosomes - The Protein Factories</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-green-200">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h5 className="font-semibold text-green-800 mb-2">Structure:</h5>
                                    <ul className="text-green-700 text-sm space-y-1">
                                      <li>• Made of RNA and proteins</li>
                                      <li>• Two subunits (large and small)</li>
                                      <li>• Very small but very important</li>
                                      <li>• Found in all living cells</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-green-800 mb-2">Locations:</h5>
                                    <ul className="text-green-700 text-sm space-y-1">
                                      <li>• Free in cytoplasm</li>
                                      <li>• Attached to Rough ER</li>
                                      <li>• Inside mitochondria</li>
                                      <li>• Inside chloroplasts (plants)</li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="mt-4 p-3 bg-green-100 rounded">
                                  <p className="text-green-800 text-sm">
                                    <strong>Function:</strong> Read genetic instructions (mRNA) and build proteins
                                    according to those instructions - like following a recipe to cook!
                                  </p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* Storage and Waste Management */}
                      <div className="border-2 border-purple-200 rounded-lg p-5 bg-purple-50">
                        <h4 className="font-bold text-purple-800 text-lg mb-3 flex items-center space-x-2">
                          <Layers className="w-6 h-6" />
                          <span>Storage and Waste Management</span>
                        </h4>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="vacuoles">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-800 font-bold">
                                  💧
                                </div>
                                <span>Vacuoles - The Storage Tanks</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-cyan-200">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div className="border-r border-cyan-200 pr-4">
                                    <h5 className="font-semibold text-cyan-800 mb-2">Plant Cell Vacuoles</h5>
                                    <ul className="text-cyan-700 text-sm space-y-1 mb-3">
                                      <li>• One large central vacuole</li>
                                      <li>• Can occupy 80% of cell volume</li>
                                      <li>• Stores water, maintains turgor pressure</li>
                                      <li>• Keeps plant upright and firm</li>
                                      <li>• Stores nutrients and waste products</li>
                                    </ul>
                                    <div className="bg-cyan-100 p-2 rounded">
                                      <p className="text-cyan-800 text-xs">
                                        <strong>Why plants wilt:</strong> When vacuoles lose water, plants become
                                        floppy!
                                      </p>
                                    </div>
                                  </div>
                                  <div className="pl-4">
                                    <h5 className="font-semibold text-cyan-800 mb-2">Animal Cell Vacuoles</h5>
                                    <ul className="text-cyan-700 text-sm space-y-1 mb-3">
                                      <li>• Many small vacuoles</li>
                                      <li>• Temporary storage</li>
                                      <li>• Transport materials</li>
                                      <li>• Some specialized functions</li>
                                    </ul>
                                    <div className="bg-cyan-100 p-2 rounded">
                                      <p className="text-cyan-800 text-xs">
                                        <strong>Special types:</strong> Food vacuoles in amoeba, contractile vacuoles in
                                        paramecium
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="lysosomes">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-800 font-bold">
                                  🗑️
                                </div>
                                <span>Lysosomes - The Cleanup Crew (Animals Only)</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-orange-200">
                                <div className="space-y-3">
                                  <div>
                                    <h5 className="font-semibold text-orange-800 mb-2">Structure:</h5>
                                    <p className="text-orange-700 text-sm">
                                      Small, round organelles filled with digestive enzymes, surrounded by a membrane
                                    </p>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-orange-800 mb-2">Functions:</h5>
                                    <ul className="text-orange-700 text-sm space-y-1">
                                      <li>• Digest worn-out organelles</li>
                                      <li>• Break down waste materials</li>
                                      <li>• Destroy harmful substances</li>
                                      <li>• Help in programmed cell death</li>
                                      <li>• Digest food particles</li>
                                    </ul>
                                  </div>

                                  <div className="bg-orange-100 p-3 rounded">
                                    <p className="text-orange-800 text-sm">
                                      <strong>Nickname:</strong> "Suicide bags" because they can destroy the cell if
                                      they burst, but this is actually helpful for removing damaged cells!
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* Other Important Organelles */}
                      <div className="border-2 border-indigo-200 rounded-lg p-5 bg-indigo-50">
                        <h4 className="font-bold text-indigo-800 text-lg mb-3 flex items-center space-x-2">
                          <Calculator className="w-6 h-6" />
                          <span>Other Important Organelles</span>
                        </h4>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white p-4 rounded border border-indigo-200">
                            <h5 className="font-semibold text-indigo-800 mb-2 flex items-center space-x-2">
                              <span>🎯</span>
                              <span>Centrosome (Animals Only)</span>
                            </h5>
                            <ul className="text-indigo-700 text-sm space-y-1">
                              <li>• Contains two centrioles</li>
                              <li>• Organizes microtubules</li>
                              <li>• Important for cell division</li>
                              <li>• Helps form spindle fibers</li>
                            </ul>
                          </div>

                          <div className="bg-white p-4 rounded border border-indigo-200">
                            <h5 className="font-semibold text-indigo-800 mb-2 flex items-center space-x-2">
                              <span>🧵</span>
                              <span>Cytoskeleton</span>
                            </h5>
                            <ul className="text-indigo-700 text-sm space-y-1">
                              <li>• Network of protein fibers</li>
                              <li>• Maintains cell shape</li>
                              <li>• Helps organelles move</li>
                              <li>• Provides structural support</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Organelle Summary Table */}
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3">📋 Organelle Function Summary</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                          <thead>
                            <tr className="bg-indigo-600 text-white">
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Organelle</th>
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Main Function</th>
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Found In</th>
                              <th className="border border-indigo-500 p-3 text-left font-semibold">Analogy</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-purple-50">
                              <td className="border border-gray-300 p-3 font-medium">Nucleus</td>
                              <td className="border border-gray-300 p-3">Control center, contains DNA</td>
                              <td className="border border-gray-300 p-3">All eukaryotes</td>
                              <td className="border border-gray-300 p-3">City Hall</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-3 font-medium">Mitochondria</td>
                              <td className="border border-gray-300 p-3">Energy production (ATP)</td>
                              <td className="border border-gray-300 p-3">All eukaryotes</td>
                              <td className="border border-gray-300 p-3">Power Plant</td>
                            </tr>
                            <tr className="bg-green-50">
                              <td className="border border-gray-300 p-3 font-medium">Chloroplasts</td>
                              <td className="border border-gray-300 p-3">Photosynthesis</td>
                              <td className="border border-gray-300 p-3">Plants only</td>
                              <td className="border border-gray-300 p-3">Solar Panels</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-3 font-medium">Ribosomes</td>
                              <td className="border border-gray-300 p-3">Protein synthesis</td>
                              <td className="border border-gray-300 p-3">All cells</td>
                              <td className="border border-gray-300 p-3">Factories</td>
                            </tr>
                            <tr className="bg-blue-50">
                              <td className="border border-gray-300 p-3 font-medium">ER</td>
                              <td className="border border-gray-300 p-3">Transport system</td>
                              <td className="border border-gray-300 p-3">All eukaryotes</td>
                              <td className="border border-gray-300 p-3">Highway System</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-3 font-medium">Golgi Apparatus</td>
                              <td className="border border-gray-300 p-3">Packaging and shipping</td>
                              <td className="border border-gray-300 p-3">All eukaryotes</td>
                              <td className="border border-gray-300 p-3">Post Office</td>
                            </tr>
                            <tr className="bg-orange-50">
                              <td className="border border-gray-300 p-3 font-medium">Lysosomes</td>
                              <td className="border border-gray-300 p-3">Waste disposal</td>
                              <td className="border border-gray-300 p-3">Animals only</td>
                              <td className="border border-gray-300 p-3">Cleanup Crew</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-3 font-medium">Vacuoles</td>
                              <td className="border border-gray-300 p-3">Storage</td>
                              <td className="border border-gray-300 p-3">All eukaryotes</td>
                              <td className="border border-gray-300 p-3">Storage Tanks</td>
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
                  <span>Test Your Cell Knowledge</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">🧪 Challenge Problems</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800">
                          1. A student observes a cell under a microscope and sees a cell wall, chloroplasts, and a
                          large central vacuole. What type of cell is this and how do you know?
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>Hint: Think about which organelles are unique to certain cell types</em>
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800">
                          2. Explain why muscle cells have many more mitochondria than skin cells.
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>Hint: Consider the energy requirements of different cell types</em>
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded border border-green-200">
                        <p className="font-medium text-green-800">
                          3. What would happen to a plant cell if its chloroplasts stopped working? Explain your answer.
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          <em>Hint: Think about the function of chloroplasts and how it affects the entire plant</em>
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
                  <span>Cell Master's Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-yellow-50 p-3 rounded">
                  <h4 className="font-semibold text-yellow-800 text-sm">Memory Trick</h4>
                  <p className="text-yellow-700 text-xs">
                    "Plants Can Make Food" - Plant cells have Cell wall, Chloroplasts, and Make their own food!
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <h4 className="font-semibold text-blue-800 text-sm">Organelle Functions</h4>
                  <p className="text-blue-700 text-xs">
                    Think of organelles like departments in a company - each has a specific job!
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <h4 className="font-semibold text-green-800 text-sm">Cell Theory</h4>
                  <p className="text-green-700 text-xs">
                    Remember: All living things are made of cells, cells are the basic unit of life, all cells come from
                    cells
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Reference */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📋 Key Differences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="bg-gray-100 p-2 rounded">
                    <p className="font-medium">Plant vs Animal:</p>
                    <p className="text-xs">
                      Cell wall, chloroplasts, large vacuole vs flexible membrane, lysosomes, small vacuoles
                    </p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <p className="font-medium">Prokaryotic vs Eukaryotic:</p>
                    <p className="text-xs">No nucleus vs true nucleus with membrane</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <p className="font-medium">Unicellular vs Multicellular:</p>
                    <p className="text-xs">One cell does everything vs specialized cells work together</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Discovery Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">⏰ Cell Discovery Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Hooke (Cork):</span>
                    <span>1665</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Leeuwenhoek (Bacteria):</span>
                    <span>1674</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Schleiden (Plants):</span>
                    <span>1838</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Schwann (Animals):</span>
                    <span>1839</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Virchow (Cell Theory):</span>
                    <span>1855</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Chapter Preview */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-lg">🔮 Coming Next</CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-purple-800 mb-2">Chapter 6: Tissues</h4>
                <p className="text-purple-700 text-sm mb-3">
                  Discover how cells work together to form tissues in plants and animals!
                </p>
                <p className="text-xs text-purple-600">
                  <strong>Preview:</strong> What happens when millions of similar cells team up? How do tissues form
                  organs?
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
