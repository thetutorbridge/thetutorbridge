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
  TreePine,
  Dna,
  Globe,
  Search,
  Layers,
  Leaf,
  Bug,
  Fish,
} from "lucide-react"
import "bootstrap/dist/css/bootstrap.min.css"

type ClassificationLevel = "kingdom" | "phylum" | "class" | "order" | "family" | "genus" | "species";

export default function Chapter7Notes() {
  type KingdomKey = keyof typeof kingdoms;
  const [selectedKingdom, setSelectedKingdom] = useState<KingdomKey>("monera")
  const [selectedClassificationLevel, setSelectedClassificationLevel] = useState<ClassificationLevel>("kingdom")
  type PlantGroupKey = keyof typeof plantGroups;
  const [selectedPlantGroup, setSelectedPlantGroup] = useState<PlantGroupKey>("thallophyta")
  type AnimalGroupKey = keyof typeof animalGroups;
  const [selectedAnimalGroup, setSelectedAnimalGroup] = useState<AnimalGroupKey>("porifera")

  const kingdoms = {
    monera: {
      name: "Kingdom Monera",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-800",
      icon: "🦠",
      description: "Prokaryotic organisms - bacteria and blue-green algae",
      characteristics: [
        "Prokaryotic cells (no membrane-bound nucleus)",
        "Unicellular organisms",
        "Cell wall present",
        "Reproduce by binary fission",
        "Mode of nutrition: autotrophic or heterotrophic",
      ],
      examples: ["Bacteria", "Blue-green algae (Nostoc, Anabaena)", "Mycoplasma"],
      importance: "Nitrogen fixation, decomposition, some cause diseases",
    },
    protista: {
      name: "Kingdom Protista",
      color: "bg-cyan-100 border-cyan-200",
      textColor: "text-cyan-800",
      icon: "🦠",
      description: "Eukaryotic unicellular organisms",
      characteristics: [
        "Eukaryotic cells (membrane-bound nucleus)",
        "Unicellular organisms",
        "Some have cell wall, some don't",
        "Mode of nutrition: autotrophic or heterotrophic",
        "Locomotion by cilia, flagella, or pseudopodia",
      ],
      examples: ["Amoeba", "Paramecium", "Euglena", "Plasmodium"],
      importance: "Some cause diseases (malaria), some are useful in research",
    },
    fungi: {
      name: "Kingdom Fungi",
      color: "bg-orange-100 border-orange-200",
      textColor: "text-orange-800",
      icon: "🍄",
      description: "Eukaryotic organisms that are heterotrophic and have cell walls",
      characteristics: [
        "Eukaryotic cells",
        "Cell wall made of chitin",
        "Heterotrophic nutrition (saprophytic)",
        "Body made of hyphae (thread-like structures)",
        "Reproduce by spores",
      ],
      examples: ["Yeast", "Mushroom", "Bread mould (Rhizopus)", "Penicillium"],
      importance: "Decomposers, food production, medicine (antibiotics)",
    },
    plantae: {
      name: "Kingdom Plantae",
      color: "bg-green-100 border-green-200",
      textColor: "text-green-800",
      icon: "🌱",
      description: "Eukaryotic, multicellular organisms with autotrophic nutrition",
      characteristics: [
        "Eukaryotic cells",
        "Cell wall made of cellulose",
        "Autotrophic nutrition (photosynthesis)",
        "Multicellular organisms",
        "Contain chlorophyll",
      ],
      examples: ["Algae", "Mosses", "Ferns", "Gymnosperms", "Angiosperms"],
      importance: "Oxygen production, food source, medicines, shelter",
    },
    animalia: {
      name: "Kingdom Animalia",
      color: "bg-pink-100 border-pink-200",
      textColor: "text-pink-800",
      icon: "🐾",
      description: "Eukaryotic, multicellular organisms with heterotrophic nutrition",
      characteristics: [
        "Eukaryotic cells",
        "No cell wall",
        "Heterotrophic nutrition",
        "Multicellular organisms",
        "Most show locomotion",
      ],
      examples: ["Sponges", "Jellyfish", "Worms", "Insects", "Fish", "Birds", "Mammals"],
      importance: "Ecological balance, food source, companionship",
    },
  }

  const plantGroups = {
    thallophyta: {
      name: "Thallophyta (Algae)",
      description: "Simple plants without true roots, stems, or leaves",
      characteristics: [
        "Body is thallus (not differentiated into root, stem, leaf)",
        "Mostly aquatic",
        "Autotrophic nutrition",
        "Reproduce by spores",
      ],
      examples: ["Spirogyra", "Ulothrix", "Cladophora", "Chara"],
      habitat: "Mostly in water (fresh water and marine)",
    },
    bryophyta: {
      name: "Bryophyta (Mosses)",
      description: "Small plants that grow in moist places",
      characteristics: [
        "Body differentiated into stem and leaf-like structures",
        "No true roots (have rhizoids)",
        "No vascular tissue",
        "Reproduce by spores",
        "Called 'amphibians of plant kingdom'",
      ],
      examples: ["Moss", "Marchantia", "Riccia"],
      habitat: "Moist and shady places",
    },
    pteridophyta: {
      name: "Pteridophyta (Ferns)",
      description: "Plants with true roots, stems, and leaves",
      characteristics: [
        "Well-developed roots, stems, and leaves",
        "Vascular tissue present",
        "Reproduce by spores",
        "No seeds or flowers",
      ],
      examples: ["Fern", "Marsilea", "Equisetum"],
      habitat: "Moist and shady places",
    },
    gymnosperms: {
      name: "Gymnosperms",
      description: "Seed-bearing plants with naked seeds",
      characteristics: [
        "Seeds are naked (not enclosed in fruits)",
        "Usually perennial, evergreen, woody",
        "Leaves are needle-like",
        "Reproduce by seeds",
      ],
      examples: ["Pine", "Deodar", "Cycas"],
      habitat: "Colder regions",
    },
    angiosperms: {
      name: "Angiosperms (Flowering Plants)",
      description: "Seed-bearing plants with seeds enclosed in fruits",
      characteristics: [
        "Seeds enclosed in fruits",
        "Have flowers",
        "Most advanced group of plants",
        "Divided into monocots and dicots",
      ],
      examples: ["Mango", "Wheat", "Rose", "Pea"],
      habitat: "All types of habitats",
    },
  }

  const animalGroups = {
    porifera: {
      name: "Porifera (Sponges)",
      description: "Simple multicellular animals with pores",
      characteristics: [
        "Body has pores (ostia)",
        "No true tissues",
        "Asymmetrical body",
        "Aquatic animals",
        "Filter feeders",
      ],
      examples: ["Sycon", "Spongilla", "Euspongia"],
      habitat: "Mostly marine, some freshwater",
    },
    coelenterata: {
      name: "Coelenterata (Cnidaria)",
      description: "Animals with stinging cells",
      characteristics: [
        "Body has a central cavity",
        "Radial symmetry",
        "Tissue level organization",
        "Have stinging cells (cnidoblasts)",
        "Aquatic animals",
      ],
      examples: ["Hydra", "Jellyfish", "Sea anemone", "Coral"],
      habitat: "Mostly marine, some freshwater",
    },
    platyhelminthes: {
      name: "Platyhelminthes (Flatworms)",
      description: "Flat-bodied worms",
      characteristics: [
        "Dorsoventrally flattened body",
        "Bilateral symmetry",
        "Organ level organization",
        "No body cavity",
        "Some are parasitic",
      ],
      examples: ["Planaria", "Liver fluke", "Tapeworm"],
      habitat: "Free-living or parasitic",
    },
    nematoda: {
      name: "Nematoda (Roundworms)",
      description: "Cylindrical worms",
      characteristics: [
        "Cylindrical body",
        "Bilateral symmetry",
        "Organ system level organization",
        "Body cavity present",
        "Many are parasitic",
      ],
      examples: ["Ascaris", "Wuchereria", "Ancylostoma"],
      habitat: "Free-living or parasitic",
    },
    annelida: {
      name: "Annelida (Segmented Worms)",
      description: "Worms with segmented body",
      characteristics: [
        "Body segmented into rings",
        "Bilateral symmetry",
        "Organ system level organization",
        "True body cavity",
        "Closed circulatory system",
      ],
      examples: ["Earthworm", "Leech", "Nereis"],
      habitat: "Terrestrial, freshwater, marine",
    },
    arthropoda: {
      name: "Arthropoda",
      description: "Animals with jointed legs",
      characteristics: [
        "Jointed legs",
        "Segmented body",
        "Exoskeleton made of chitin",
        "Bilateral symmetry",
        "Largest phylum in animal kingdom",
      ],
      examples: ["Insects", "Crustaceans", "Spiders", "Centipedes"],
      habitat: "All types of habitats",
    },
    mollusca: {
      name: "Mollusca",
      description: "Soft-bodied animals",
      characteristics: [
        "Soft body",
        "Body covered by mantle",
        "Usually have shell",
        "Muscular foot for locomotion",
        "Open circulatory system",
      ],
      examples: ["Snail", "Mussel", "Octopus", "Squid"],
      habitat: "Marine, freshwater, terrestrial",
    },
    echinodermata: {
      name: "Echinodermata",
      description: "Spiny-skinned animals",
      characteristics: [
        "Spiny skin",
        "Radial symmetry in adults",
        "Water vascular system",
        "Exclusively marine",
        "Tube feet for locomotion",
      ],
      examples: ["Starfish", "Sea urchin", "Sea cucumber"],
      habitat: "Marine only",
    },
    chordata: {
      name: "Chordata",
      description: "Animals with notochord",
      characteristics: [
        "Notochord present at some stage",
        "Dorsal nerve cord",
        "Pharyngeal gill slits",
        "Post-anal tail",
        "Bilateral symmetry",
      ],
      examples: ["Fish", "Amphibians", "Reptiles", "Birds", "Mammals"],
      habitat: "All types of habitats",
    },
  }

  const classificationHierarchy = {
    kingdom: { name: "Kingdom", description: "Largest taxonomic group", example: "Animalia" },
    phylum: { name: "Phylum", description: "Major body plan differences", example: "Chordata" },
    class: { name: "Class", description: "Similar lifestyle and structure", example: "Mammalia" },
    order: { name: "Order", description: "Related families grouped together", example: "Primates" },
    family: { name: "Family", description: "Closely related genera", example: "Hominidae" },
    genus: { name: "Genus", description: "Very similar species", example: "Homo" },
    species: { name: "Species", description: "Organisms that can interbreed", example: "sapiens" },
  }

  return (
    <div className="container-fluid min-vh-100 bg-gray-50 px-0">
      {/* Header */}
      <header className="bg-white shadow-sm border-bottom">
        <div className="container px-4 py-4">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h1 className="h4 font-bold text-gray-900">Class 9 Science Notes</h1>
              <p className="text-gray-600">Chapter 7: Diversity in Living Organisms</p>
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
                  <span>Welcome to the Amazing World of Life!</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-blue-50">
                <p className="text-blue-900 leading-relaxed">
                  <strong>Dear Young Biologists,</strong> Have you ever wondered how scientists make sense of the
                  incredible variety of life on Earth? From the tiniest bacteria to the largest whales, from simple
                  algae to complex flowering plants - our planet is home to millions of different species! In this
                  chapter, we'll explore how scientists organize and classify this amazing diversity. Think of it like
                  organizing a massive library - without a proper system, it would be impossible to find anything! By
                  the end of this chapter, you'll understand how every living thing has its place in the grand tree of
                  life, and you'll be able to classify organisms like a real scientist. Get ready for an exciting
                  journey through the kingdoms of life! 🌍✨
                </p>
              </CardContent>
            </Card>

            {/* Learning Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span>What We'll Discover Together</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">Learning Goals:</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Understand the need for classification of living organisms</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Learn the basis of classification and hierarchy</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Explore the five kingdoms of life in detail</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Master plant and animal classification systems</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                    <h4 className="font-semibold text-indigo-800 mb-2">🌟 Amazing Biodiversity Facts</h4>
                    <p className="text-indigo-700 text-sm">
                      Scientists have identified about 1.5 million species so far, but estimate there could be 8-10
                      million species on Earth! Every year, about 18,000 new species are discovered. The Amazon
                      rainforest alone contains more species than entire continents. A single gram of soil can contain
                      up to 40,000 bacterial species!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content Tabs */}
            <Tabs defaultValue="introduction" className="space-y-4">
              <TabsList className="w-full overflow-x-auto flex flex-nowrap gap-2">
                <TabsTrigger value="introduction">Need for Classification</TabsTrigger>
                <TabsTrigger value="basis">Basis & Hierarchy</TabsTrigger>
                <TabsTrigger value="kingdoms">Five Kingdoms</TabsTrigger>
                <TabsTrigger value="plants">Plant Classification</TabsTrigger>
                <TabsTrigger value="animals">Animal Classification</TabsTrigger>
              </TabsList>

              <TabsContent value="introduction" className="space-y-6">
                {/* Need for Classification */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Search className="w-6 h-6 text-teal-600" />
                      <span>Why Do We Need Classification?</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Real-world analogy */}
                    <div className="bg-teal-50 p-5 rounded-lg border border-teal-200">
                      <h4 className="font-semibold text-teal-800 mb-3">
                        🏪 Imagine a Supermarket Without Organization...
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-red-50 p-4 rounded border border-red-200">
                          <h5 className="font-semibold text-red-800 mb-2">❌ Without Classification:</h5>
                          <ul className="text-red-700 text-sm space-y-1">
                            <li>• Fruits mixed with electronics</li>
                            <li>• Medicines scattered everywhere</li>
                            <li>• No way to find what you need</li>
                            <li>• Chaos and confusion</li>
                            <li>• Waste of time and energy</li>
                          </ul>
                        </div>
                        <div className="bg-green-50 p-4 rounded border border-green-200">
                          <h5 className="font-semibold text-green-800 mb-2">✅ With Classification:</h5>
                          <ul className="text-green-700 text-sm space-y-1">
                            <li>• Everything in proper sections</li>
                            <li>• Easy to locate items</li>
                            <li>• Systematic organization</li>
                            <li>• Efficient shopping</li>
                            <li>• Clear understanding</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-teal-100 rounded">
                        <p className="text-teal-800 text-sm">
                          <strong>Just like a supermarket, life on Earth needs organization!</strong> With millions of
                          species, classification helps scientists study, understand, and communicate about living
                          organisms effectively.
                        </p>
                      </div>
                    </div>

                    {/* Benefits of Classification */}
                    <div className="border-2 border-blue-200 rounded-lg p-5 bg-blue-50">
                      <h4 className="font-bold text-blue-800 text-lg mb-3 flex items-center space-x-2">
                        <Lightbulb className="w-6 h-6" />
                        <span>How Classification Helps Scientists</span>
                      </h4>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="systematic-study">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                📚
                              </div>
                              <span>Makes Systematic Study Possible</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-blue-200">
                              <p className="text-blue-700 text-sm mb-3">
                                Classification groups similar organisms together, making it easier to study their
                                characteristics, behavior, and relationships.
                              </p>
                              <div className="grid md:grid-cols-2 gap-3">
                                <div className="bg-blue-50 p-3 rounded">
                                  <h6 className="font-semibold text-blue-800 text-sm">Example: Medical Research</h6>
                                  <p className="text-blue-700 text-xs">
                                    Doctors can quickly identify disease-causing bacteria and choose the right treatment
                                    by knowing their classification.
                                  </p>
                                </div>
                                <div className="bg-blue-50 p-3 rounded">
                                  <h6 className="font-semibold text-blue-800 text-sm">Example: Agriculture</h6>
                                  <p className="text-blue-700 text-xs">
                                    Farmers can identify crop pests and diseases more easily when they know how
                                    organisms are classified.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="identification">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                🔍
                              </div>
                              <span>Easy Identification of Organisms</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-blue-200">
                              <p className="text-blue-700 text-sm mb-3">
                                With a proper classification system, scientists can identify unknown organisms by
                                comparing their characteristics with known groups.
                              </p>
                              <div className="bg-blue-50 p-3 rounded">
                                <h6 className="font-semibold text-blue-800 text-sm">Real-world Application:</h6>
                                <p className="text-blue-700 text-xs">
                                  When a new species is discovered, scientists can place it in the correct group by
                                  studying its features and comparing them with existing classifications.
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="relationships">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                🌳
                              </div>
                              <span>Shows Evolutionary Relationships</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-blue-200">
                              <p className="text-blue-700 text-sm mb-3">
                                Classification reveals how different organisms are related through evolution and helps
                                us understand the tree of life.
                              </p>
                              <div className="space-y-2">
                                <div className="bg-blue-50 p-3 rounded">
                                  <h6 className="font-semibold text-blue-800 text-sm">Close Relatives</h6>
                                  <p className="text-blue-700 text-xs">
                                    Organisms in the same genus are very closely related and share a recent common
                                    ancestor.
                                  </p>
                                </div>
                                <div className="bg-blue-50 p-3 rounded">
                                  <h6 className="font-semibold text-blue-800 text-sm">Distant Relatives</h6>
                                  <p className="text-blue-700 text-xs">
                                    Organisms in the same kingdom share basic characteristics but may have diverged long
                                    ago in evolution.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="communication">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                🌍
                              </div>
                              <span>Universal Scientific Communication</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11 space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-blue-200">
                              <p className="text-blue-700 text-sm mb-3">
                                Scientific names and classification provide a universal language that scientists
                                worldwide can understand, regardless of their local language.
                              </p>
                              <div className="bg-blue-50 p-3 rounded">
                                <h6 className="font-semibold text-blue-800 text-sm">Example: The Mango Tree</h6>
                                <div className="grid md:grid-cols-3 gap-2 mt-2">
                                  <p className="text-blue-700 text-xs">Hindi: आम</p>
                                  <p className="text-blue-700 text-xs">Tamil: மாம்பழம்</p>
                                  <p className="text-blue-700 text-xs">Bengali: আম</p>
                                  <p className="text-blue-700 text-xs">English: Mango</p>
                                  <p className="text-blue-700 text-xs">Spanish: Mango</p>
                                  <p className="text-blue-700 text-xs">French: Mangue</p>
                                </div>
                                <div className="mt-2 p-2 bg-blue-100 rounded">
                                  <p className="text-blue-800 text-sm">
                                    <strong>Scientific name:</strong> <em>Mangifera indica</em> - understood by
                                    scientists everywhere!
                                  </p>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    {/* Historical Development */}
                    <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                      <h4 className="font-semibold text-yellow-800 mb-3">📜 The Journey of Classification</h4>
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded border border-yellow-200">
                          <h5 className="font-semibold text-yellow-800 text-sm">Aristotle (384-322 BCE)</h5>
                          <p className="text-yellow-700 text-xs">
                            First attempt at classification - divided living things into plants (non-moving) and animals
                            (moving). Simple but groundbreaking!
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded border border-yellow-200">
                          <h5 className="font-semibold text-yellow-800 text-sm">Carolus Linnaeus (1707-1778)</h5>
                          <p className="text-yellow-700 text-xs">
                            "Father of Taxonomy" - created the hierarchical classification system and binomial
                            nomenclature (two-name system) still used today.
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded border border-yellow-200">
                          <h5 className="font-semibold text-yellow-800 text-sm">R.H. Whittaker (1969)</h5>
                          <p className="text-yellow-700 text-xs">
                            Proposed the five-kingdom classification system based on cell structure, body organization,
                            and mode of nutrition.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="basis" className="space-y-6">
                {/* Basis of Classification */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Layers className="w-6 h-6 text-purple-600" />
                      <span>Basis of Classification and Hierarchy</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Basis of Classification */}
                    <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-3">🔬 What Do Scientists Look At?</h4>
                      <p className="text-purple-700 mb-4">
                        Scientists use several key characteristics to classify organisms. Think of it like describing a
                        person - you might mention their height, hair color, personality, and hobbies to help others
                        identify them!
                      </p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded border border-purple-200">
                          <h5 className="font-semibold text-purple-800 mb-3">🏗️ Basic Characteristics</h5>
                          <ul className="text-purple-700 text-sm space-y-2">
                            <li>
                              <strong>Cell structure:</strong> Prokaryotic or eukaryotic?
                            </li>
                            <li>
                              <strong>Body organization:</strong> Unicellular or multicellular?
                            </li>
                            <li>
                              <strong>Mode of nutrition:</strong> How do they get food?
                            </li>
                            <li>
                              <strong>Body design:</strong> Level of organization
                            </li>
                            <li>
                              <strong>Reproduction:</strong> How do they produce offspring?
                            </li>
                          </ul>
                        </div>

                        <div className="bg-white p-4 rounded border border-purple-200">
                          <h5 className="font-semibold text-purple-800 mb-3">🧬 Advanced Features</h5>
                          <ul className="text-purple-700 text-sm space-y-2">
                            <li>
                              <strong>Symmetry:</strong> Body shape and arrangement
                            </li>
                            <li>
                              <strong>Coelom:</strong> Presence of body cavity
                            </li>
                            <li>
                              <strong>Segmentation:</strong> Body divided into segments
                            </li>
                            <li>
                              <strong>Notochord:</strong> Supporting structure
                            </li>
                            <li>
                              <strong>Appendages:</strong> Limbs and other structures
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Hierarchy of Classification */}
                    <div className="border-2 border-indigo-200 rounded-lg p-5 bg-indigo-50">
                      <h4 className="font-bold text-indigo-800 text-lg mb-3 flex items-center space-x-2">
                        <TreePine className="w-6 h-6" />
                        <span>The Classification Hierarchy</span>
                      </h4>

                      <div className="bg-white p-4 rounded border border-indigo-200 mb-4">
                        <h5 className="font-semibold text-indigo-800 mb-3">🏗️ Building the Classification Pyramid</h5>
                        <p className="text-indigo-700 text-sm mb-4">
                          Classification works like a pyramid - broad categories at the top, getting more specific as we
                          go down. It's like organizing your school: School → Grade → Section → Roll Number!
                        </p>

                        {/* Interactive Hierarchy Selector */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {Object.entries(classificationHierarchy).map(([key, level]) => (
                            <Button
                              key={key}
                              variant={selectedClassificationLevel === key ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedClassificationLevel(key as ClassificationLevel)}
                              className="flex items-center space-x-2"
                            >
                              <span>{level.name}</span>
                            </Button>
                          ))}
                        </div>

                        <div className="bg-indigo-50 p-4 rounded border border-indigo-200">
                          <h6 className="text-lg font-bold text-indigo-800 mb-2">
                            {classificationHierarchy[selectedClassificationLevel].name}
                          </h6>
                          <p className="text-indigo-700 text-sm mb-2">
                            <strong>Description:</strong>{" "}
                            {classificationHierarchy[selectedClassificationLevel].description}
                          </p>
                          <p className="text-indigo-700 text-sm">
                            <strong>Example (Human):</strong>{" "}
                            {classificationHierarchy[selectedClassificationLevel].example}
                          </p>
                        </div>
                      </div>

                      {/* Visual Hierarchy */}
                      <div className="bg-white p-4 rounded border border-indigo-200">
                        <h5 className="font-semibold text-indigo-800 mb-3 text-center">📊 The Complete Hierarchy</h5>
                        <div className="space-y-3">
                          {Object.entries(classificationHierarchy).map(([key, level], index) => (
                            <div key={key} className="text-center">
                              <div
                                className={`inline-block px-4 py-2 rounded-lg font-bold text-white ${
                                  index === 0
                                    ? "bg-indigo-600 text-lg"
                                    : index === 1
                                      ? "bg-indigo-500"
                                      : index === 2
                                        ? "bg-indigo-400"
                                        : index === 3
                                          ? "bg-indigo-300 text-indigo-800"
                                          : index === 4
                                            ? "bg-indigo-200 text-indigo-800"
                                            : index === 5
                                              ? "bg-indigo-100 text-indigo-800"
                                              : "bg-indigo-50 text-indigo-800 border-2 border-indigo-300"
                                }`}
                              >
                                {level.name.toUpperCase()}
                              </div>
                              <p className="text-indigo-700 text-xs mt-1">{level.description}</p>
                              {index < Object.keys(classificationHierarchy).length - 1 && (
                                <div className="flex justify-center mt-2">
                                  <div className="w-1 h-4 bg-indigo-400"></div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 p-3 bg-indigo-100 rounded">
                          <p className="text-indigo-800 text-sm text-center">
                            <strong>Memory Trick:</strong> "King Philip Came Over For Good Soup"
                            <br />
                            (Kingdom, Phylum, Class, Order, Family, Genus, Species)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Nomenclature */}
                    <div className="border-2 border-green-200 rounded-lg p-5 bg-green-50">
                      <h4 className="font-bold text-green-800 text-lg mb-3 flex items-center space-x-2">
                        <Dna className="w-6 h-6" />
                        <span>Binomial Nomenclature: The Two-Name System</span>
                      </h4>

                      <div className="bg-white p-4 rounded border border-green-200">
                        <h5 className="font-semibold text-green-800 mb-3">📝 How Scientific Names Work</h5>
                        <p className="text-green-700 text-sm mb-4">
                          Every organism gets exactly two names - like having a first name and last name! This system
                          was created by Carolus Linnaeus.
                        </p>

                        <div className="bg-green-50 p-4 rounded border border-green-200 mb-4">
                          <div className="text-center mb-4">
                            <div className="text-xl font-bold text-green-800 mb-2">
                              <span className="bg-green-200 px-3 py-1 rounded mr-2">Genus</span>
                              <span className="bg-green-300 px-3 py-1 rounded">species</span>
                            </div>
                            <p className="text-green-700 text-sm">Every scientific name has exactly two parts</p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded border border-green-200">
                              <h6 className="font-semibold text-green-800 mb-2">First Name: Genus</h6>
                              <ul className="text-green-700 text-sm space-y-1">
                                <li>• Always starts with capital letter</li>
                                <li>• Groups similar species together</li>
                                <li>
                                  • Example: <em>Homo</em> (humans)
                                </li>
                              </ul>
                            </div>
                            <div className="bg-white p-3 rounded border border-green-200">
                              <h6 className="font-semibold text-green-800 mb-2">Second Name: Species</h6>
                              <ul className="text-green-700 text-sm space-y-1">
                                <li>• Always starts with small letter</li>
                                <li>• Describes specific characteristics</li>
                                <li>
                                  • Example: <em>sapiens</em> (wise)
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h6 className="font-semibold text-green-800">📏 Rules for Writing Scientific Names:</h6>
                          <div className="grid md:grid-cols-2 gap-3">
                            <div className="bg-green-50 p-3 rounded">
                              <p className="text-green-700 text-sm">
                                <strong>✍️ When handwritten:</strong> Underline the name
                                <br />
                                Example: <u>Homo sapiens</u>
                              </p>
                            </div>
                            <div className="bg-green-50 p-3 rounded">
                              <p className="text-green-700 text-sm">
                                <strong>💻 When typed:</strong> Use italics
                                <br />
                                Example: <em>Homo sapiens</em>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-green-100 rounded">
                          <h6 className="font-semibold text-green-800 mb-2">🌟 Common Examples:</h6>
                          <div className="grid md:grid-cols-2 gap-2">
                            <p className="text-green-700 text-sm">
                              <strong>Human:</strong> <em>Homo sapiens</em>
                            </p>
                            <p className="text-green-700 text-sm">
                              <strong>Mango:</strong> <em>Mangifera indica</em>
                            </p>
                            <p className="text-green-700 text-sm">
                              <strong>House cat:</strong> <em>Felis catus</em>
                            </p>
                            <p className="text-green-700 text-sm">
                              <strong>Rice:</strong> <em>Oryza sativa</em>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="kingdoms" className="space-y-6">
                {/* Five Kingdoms */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="w-6 h-6 text-emerald-600" />
                      <span>The Five Kingdoms of Life</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Introduction */}
                    <div className="bg-emerald-50 p-5 rounded-lg border border-emerald-200">
                      <h4 className="font-semibold text-emerald-800 mb-3">👑 Meet the Five Great Kingdoms</h4>
                      <p className="text-emerald-700 leading-relaxed mb-4">
                        R.H. Whittaker (1969) divided all life into five kingdoms based on three main criteria: cell
                        structure, body organization, and mode of nutrition. It's like dividing all students in your
                        school into five houses based on their characteristics!
                      </p>

                      <div className="grid md:grid-cols-3 gap-3">
                        <div className="bg-white p-3 rounded border border-emerald-200">
                          <h6 className="font-semibold text-emerald-800 text-sm">🔬 Cell Structure</h6>
                          <p className="text-emerald-700 text-xs">Prokaryotic vs Eukaryotic</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-emerald-200">
                          <h6 className="font-semibold text-emerald-800 text-sm">🏗️ Body Organization</h6>
                          <p className="text-emerald-700 text-xs">Unicellular vs Multicellular</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-emerald-200">
                          <h6 className="font-semibold text-emerald-800 text-sm">🍽️ Mode of Nutrition</h6>
                          <p className="text-emerald-700 text-xs">Autotrophic vs Heterotrophic</p>
                        </div>
                      </div>
                    </div>

                    {/* Kingdom Selector */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-3">🔍 Explore Each Kingdom</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {Object.entries(kingdoms).map(([key, kingdom]) => (
                          <Button
                            key={key}
                            variant={selectedKingdom === key ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedKingdom(key as KingdomKey)}
                            className="flex items-center space-x-2"
                          >
                            <span>{kingdom.icon}</span>
                            <span>{kingdom.name.split(" ")[1]}</span>
                          </Button>
                        ))}
                      </div>

                      {/* Selected Kingdom Details */}
                      <div className={`border-2 rounded-lg p-4 ${kingdoms[selectedKingdom].color}`}>
                        <h5 className={`text-xl font-bold mb-3 ${kingdoms[selectedKingdom].textColor}`}>
                          {kingdoms[selectedKingdom].icon} {kingdoms[selectedKingdom].name}
                        </h5>

                        <div className="bg-white p-4 rounded border">
                          <p className="text-gray-700 text-sm mb-4">{kingdoms[selectedKingdom].description}</p>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h6 className="font-semibold text-gray-800 mb-2">Key Characteristics:</h6>
                              <ul className="text-gray-700 text-sm space-y-1">
                                {kingdoms[selectedKingdom].characteristics.map((char, index) => (
                                  <li key={index} className="flex items-start space-x-2">
                                    <span className="text-green-500 mt-1">•</span>
                                    <span>{char}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h6 className="font-semibold text-gray-800 mb-2">Examples:</h6>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {kingdoms[selectedKingdom].examples.map((example, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-blue-100 rounded text-xs font-medium text-blue-700"
                                  >
                                    {example}
                                  </span>
                                ))}
                              </div>
                              <h6 className="font-semibold text-gray-800 mb-1">Importance:</h6>
                              <p className="text-gray-700 text-sm">{kingdoms[selectedKingdom].importance}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Kingdom Comparison Table */}
                    <div className="border-2 border-gray-200 rounded-lg p-5 bg-gray-50">
                      <h4 className="font-bold text-gray-800 text-lg mb-3 flex items-center space-x-2">
                        <span className="text-2xl">⚖️</span>
                        <span>Kingdom Comparison Chart</span>
                      </h4>

                      <div className="bg-white p-4 rounded border border-gray-200 overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b-2 border-gray-200">
                              <th className="text-left p-2 font-semibold text-gray-800">Feature</th>
                              <th className="text-left p-2 font-semibold text-purple-800">Monera</th>
                              <th className="text-left p-2 font-semibold text-cyan-800">Protista</th>
                              <th className="text-left p-2 font-semibold text-orange-800">Fungi</th>
                              <th className="text-left p-2 font-semibold text-green-800">Plantae</th>
                              <th className="text-left p-2 font-semibold text-pink-800">Animalia</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-100">
                              <td className="p-2 font-medium">Cell Type</td>
                              <td className="p-2 text-purple-700">Prokaryotic</td>
                              <td className="p-2 text-cyan-700">Eukaryotic</td>
                              <td className="p-2 text-orange-700">Eukaryotic</td>
                              <td className="p-2 text-green-700">Eukaryotic</td>
                              <td className="p-2 text-pink-700">Eukaryotic</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="p-2 font-medium">Body Organization</td>
                              <td className="p-2 text-purple-700">Unicellular</td>
                              <td className="p-2 text-cyan-700">Unicellular</td>
                              <td className="p-2 text-orange-700">Multicellular</td>
                              <td className="p-2 text-green-700">Multicellular</td>
                              <td className="p-2 text-pink-700">Multicellular</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="p-2 font-medium">Cell Wall</td>
                              <td className="p-2 text-purple-700">Present</td>
                              <td className="p-2 text-cyan-700">Some have</td>
                              <td className="p-2 text-orange-700">Present (Chitin)</td>
                              <td className="p-2 text-green-700">Present (Cellulose)</td>
                              <td className="p-2 text-pink-700">Absent</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="p-2 font-medium">Mode of Nutrition</td>
                              <td className="p-2 text-purple-700">Auto/Heterotrophic</td>
                              <td className="p-2 text-cyan-700">Auto/Heterotrophic</td>
                              <td className="p-2 text-orange-700">Heterotrophic</td>
                              <td className="p-2 text-green-700">Autotrophic</td>
                              <td className="p-2 text-pink-700">Heterotrophic</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-medium">Examples</td>
                              <td className="p-2 text-purple-700">Bacteria</td>
                              <td className="p-2 text-cyan-700">Amoeba</td>
                              <td className="p-2 text-orange-700">Mushroom</td>
                              <td className="p-2 text-green-700">Mango tree</td>
                              <td className="p-2 text-pink-700">Human</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="plants" className="space-y-6">
                {/* Plant Classification */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Leaf className="w-6 h-6 text-green-600" />
                      <span>Plant Kingdom Classification</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Introduction */}
                    <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-3">🌱 Journey Through Plant Evolution</h4>
                      <p className="text-green-700 leading-relaxed mb-4">
                        Plants show a beautiful evolutionary progression from simple to complex forms. It's like
                        watching the story of how plants conquered land! We'll explore five major groups, each
                        representing a step in plant evolution.
                      </p>

                      <div className="bg-white p-3 rounded border border-green-200">
                        <h5 className="font-semibold text-green-800 mb-2">🎯 Classification Based On:</h5>
                        <div className="grid md:grid-cols-2 gap-3">
                          <ul className="text-green-700 text-sm space-y-1">
                            <li>• Body differentiation (root, stem, leaf)</li>
                            <li>• Vascular tissue (transport system)</li>
                            <li>• Seed formation</li>
                          </ul>
                          <ul className="text-green-700 text-sm space-y-1">
                            <li>• Reproductive structures</li>
                            <li>• Habitat preferences</li>
                            <li>• Evolutionary complexity</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Plant Group Selector */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-3">🔍 Explore Plant Groups</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {Object.entries(plantGroups).map(([key, group]) => (
                          <Button
                            key={key}
                            variant={selectedPlantGroup === key ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedPlantGroup(key as PlantGroupKey)}
                            className="flex items-center space-x-2"
                          >
                            <span>{group.name.split(" ")[0]}</span>
                          </Button>
                        ))}
                      </div>

                      {/* Selected Plant Group Details */}
                      <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
                        <h5 className="text-xl font-bold mb-3 text-green-800">
                          🌿 {plantGroups[selectedPlantGroup].name}
                        </h5>

                        <div className="bg-white p-4 rounded border">
                          <p className="text-gray-700 text-sm mb-4">{plantGroups[selectedPlantGroup].description}</p>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h6 className="font-semibold text-gray-800 mb-2">Key Characteristics:</h6>
                              <ul className="text-gray-700 text-sm space-y-1">
                                {plantGroups[selectedPlantGroup].characteristics.map((char, index) => (
                                  <li key={index} className="flex items-start space-x-2">
                                    <span className="text-green-500 mt-1">•</span>
                                    <span>{char}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h6 className="font-semibold text-gray-800 mb-2">Examples:</h6>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {plantGroups[selectedPlantGroup].examples.map((example, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-green-100 rounded text-xs font-medium text-green-700"
                                  >
                                    {example}
                                  </span>
                                ))}
                              </div>
                              <h6 className="font-semibold text-gray-800 mb-1">Habitat:</h6>
                              <p className="text-gray-700 text-sm">{plantGroups[selectedPlantGroup].habitat}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Plant Groups */}
                    <div className="space-y-6">
                      {/* Thallophyta */}
                      <div className="border-2 border-blue-200 rounded-lg p-5 bg-blue-50">
                        <h4 className="font-bold text-blue-800 text-lg mb-3 flex items-center space-x-2">
                          <span className="text-2xl">🌊</span>
                          <span>Thallophyta - The Water Pioneers</span>
                        </h4>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="thallophyta-details">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                  💧
                                </div>
                                <span>Simple but Essential - The First Plants</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-blue-200">
                                <div className="space-y-4">
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <h6 className="font-semibold text-blue-800 mb-2">Why "Thallophyta"?</h6>
                                      <p className="text-blue-700 text-sm mb-2">
                                        "Thallus" means a simple plant body that is not divided into root, stem, and
                                        leaves. These are the simplest plants!
                                      </p>
                                      <ul className="text-blue-700 text-sm space-y-1">
                                        <li>• No true roots, stems, or leaves</li>
                                        <li>• Body is called thallus</li>
                                        <li>• Mostly aquatic</li>
                                        <li>• Reproduce by spores</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h6 className="font-semibold text-blue-800 mb-2">Ecological Importance:</h6>
                                      <ul className="text-blue-700 text-sm space-y-1">
                                        <li>• Primary producers in aquatic ecosystems</li>
                                        <li>• Oxygen production</li>
                                        <li>• Food for aquatic animals</li>
                                        <li>• Some used as food by humans</li>
                                        <li>• Nitrogen fixation (blue-green algae)</li>
                                      </ul>
                                    </div>
                                  </div>

                                  <div className="bg-blue-50 p-3 rounded">
                                    <h6 className="font-semibold text-blue-800 mb-2">
                                      🔬 Common Examples You Can Find:
                                    </h6>
                                    <div className="grid md:grid-cols-2 gap-3">
                                      <div>
                                        <p className="text-blue-700 text-sm">
                                          <strong>Spirogyra:</strong> Green thread-like algae in ponds
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-blue-700 text-sm">
                                          <strong>Ulothrix:</strong> Unbranched filamentous green algae
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

                      {/* Bryophyta */}
                      <div className="border-2 border-teal-200 rounded-lg p-5 bg-teal-50">
                        <h4 className="font-bold text-teal-800 text-lg mb-3 flex items-center space-x-2">
                          <span className="text-2xl">🍃</span>
                          <span>Bryophyta - The Amphibians of Plant Kingdom</span>
                        </h4>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="bryophyta-details">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-800 font-bold">
                                  🌿
                                </div>
                                <span>Living Between Water and Land</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-teal-200">
                                <div className="space-y-4">
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <h6 className="font-semibold text-teal-800 mb-2">Why "Amphibians"?</h6>
                                      <p className="text-teal-700 text-sm mb-2">
                                        Like amphibians (frogs), these plants need water for reproduction but can live
                                        on land. They're the bridge between aquatic and terrestrial plants!
                                      </p>
                                      <ul className="text-teal-700 text-sm space-y-1">
                                        <li>• Have stem and leaf-like structures</li>
                                        <li>• No true roots (have rhizoids)</li>
                                        <li>• No vascular tissue</li>
                                        <li>• Need water for reproduction</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h6 className="font-semibold text-teal-800 mb-2">Special Features:</h6>
                                      <ul className="text-teal-700 text-sm space-y-1">
                                        <li>• Small in size (lack support tissue)</li>
                                        <li>• Grow in moist, shady places</li>
                                        <li>• Prevent soil erosion</li>
                                        <li>• First plants to colonize rocks</li>
                                        <li>• Reproduce by spores</li>
                                      </ul>
                                    </div>
                                  </div>

                                  <div className="bg-teal-50 p-3 rounded">
                                    <h6 className="font-semibold text-teal-800 mb-2">🏞️ Where to Find Them:</h6>
                                    <p className="text-teal-700 text-sm">
                                      Look for moss on tree trunks, rocks, and damp walls. Marchantia can be found near
                                      water bodies and in greenhouses.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* Pteridophyta */}
                      <div className="border-2 border-emerald-200 rounded-lg p-5 bg-emerald-50">
                        <h4 className="font-bold text-emerald-800 text-lg mb-3 flex items-center space-x-2">
                          <span className="text-2xl">🌿</span>
                          <span>Pteridophyta - The First True Land Plants</span>
                        </h4>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="pteridophyta-details">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 font-bold">
                                  🌱
                                </div>
                                <span>The Vascular Revolution</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-emerald-200">
                                <div className="space-y-4">
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <h6 className="font-semibold text-emerald-800 mb-2">Major Breakthrough:</h6>
                                      <p className="text-emerald-700 text-sm mb-2">
                                        First plants with a proper transport system (vascular tissue)! This allowed them
                                        to grow taller and live in drier places.
                                      </p>
                                      <ul className="text-emerald-700 text-sm space-y-1">
                                        <li>• True roots, stems, and leaves</li>
                                        <li>• Vascular tissue (xylem and phloem)</li>
                                        <li>• Can grow much larger</li>
                                        <li>• Still reproduce by spores</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h6 className="font-semibold text-emerald-800 mb-2">Evolutionary Importance:</h6>
                                      <ul className="text-emerald-700 text-sm space-y-1">
                                        <li>• Ancestors of seed plants</li>
                                        <li>• Formed ancient forests</li>
                                        <li>• Source of coal deposits</li>
                                        <li>• Show alternation of generations</li>
                                        <li>• Bridge to seed plants</li>
                                      </ul>
                                    </div>
                                  </div>

                                  <div className="bg-emerald-50 p-3 rounded">
                                    <h6 className="font-semibold text-emerald-800 mb-2">🌿 Modern Examples:</h6>
                                    <p className="text-emerald-700 text-sm">
                                      Ferns are the most common pteridophytes today. Look for their characteristic
                                      divided leaves (fronds) in gardens and forests.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* Gymnosperms */}
                      <div className="border-2 border-amber-200 rounded-lg p-5 bg-amber-50">
                        <h4 className="font-bold text-amber-800 text-lg mb-3 flex items-center space-x-2">
                          <span className="text-2xl">🌲</span>
                          <span>Gymnosperms - The Naked Seed Plants</span>
                        </h4>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="gymnosperms-details">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 font-bold">
                                  🌰
                                </div>
                                <span>The Seed Revolution</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-amber-200">
                                <div className="space-y-4">
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <h6 className="font-semibold text-amber-800 mb-2">The Seed Advantage:</h6>
                                      <p className="text-amber-700 text-sm mb-2">
                                        First plants to produce seeds! Seeds are like baby plants with their own food
                                        supply, making survival much easier.
                                      </p>
                                      <ul className="text-amber-700 text-sm space-y-1">
                                        <li>• Seeds are "naked" (not in fruits)</li>
                                        <li>• Usually have cones</li>
                                        <li>• Needle-like leaves</li>
                                        <li>• Adapted to cold climates</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h6 className="font-semibold text-amber-800 mb-2">Adaptations:</h6>
                                      <ul className="text-amber-700 text-sm space-y-1">
                                        <li>• Thick, waxy needle leaves</li>
                                        <li>• Reduce water loss</li>
                                        <li>• Evergreen (don't shed leaves)</li>
                                        <li>• Conical shape sheds snow</li>
                                        <li>• Deep root systems</li>
                                      </ul>
                                    </div>
                                  </div>

                                  <div className="bg-amber-50 p-3 rounded">
                                    <h6 className="font-semibold text-amber-800 mb-2">🏔️ Where They Thrive:</h6>
                                    <p className="text-amber-700 text-sm">
                                      Conifers dominate cold regions and mountains. Think of Christmas trees, pine
                                      forests, and the taiga biome!
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* Angiosperms */}
                      <div className="border-2 border-rose-200 rounded-lg p-5 bg-rose-50">
                        <h4 className="font-bold text-rose-800 text-lg mb-3 flex items-center space-x-2">
                          <span className="text-2xl">🌸</span>
                          <span>Angiosperms - The Flowering Champions</span>
                        </h4>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="angiosperms-details">
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-800 font-bold">
                                  🌺
                                </div>
                                <span>The Most Successful Plants on Earth</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-11 space-y-3">
                              <div className="bg-white p-4 rounded-lg border border-rose-200">
                                <div className="space-y-4">
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <h6 className="font-semibold text-rose-800 mb-2">Why So Successful?</h6>
                                      <p className="text-rose-700 text-sm mb-2">
                                        Flowers and fruits made them incredibly successful! Flowers attract pollinators,
                                        and fruits protect seeds and help in dispersal.
                                      </p>
                                      <ul className="text-rose-700 text-sm space-y-1">
                                        <li>• Seeds enclosed in fruits</li>
                                        <li>• Have flowers for reproduction</li>
                                        <li>• Most diverse plant group</li>
                                        <li>• Adapted to all habitats</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h6 className="font-semibold text-rose-800 mb-2">Two Main Groups:</h6>
                                      <div className="space-y-2">
                                        <div className="bg-rose-50 p-2 rounded">
                                          <p className="text-rose-700 text-sm">
                                            <strong>Monocots:</strong> One seed leaf (corn, grass, lilies)
                                          </p>
                                        </div>
                                        <div className="bg-rose-50 p-2 rounded">
                                          <p className="text-rose-700 text-sm">
                                            <strong>Dicots:</strong> Two seed leaves (roses, beans, trees)
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="bg-rose-50 p-3 rounded">
                                    <h6 className="font-semibold text-rose-800 mb-2">🌍 Everywhere Around Us:</h6>
                                    <p className="text-rose-700 text-sm">
                                      From tiny duckweeds to giant oak trees, from desert cacti to water lilies -
                                      angiosperms have conquered every habitat on Earth!
                                    </p>
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

              <TabsContent value="animals" className="space-y-6">
                {/* Animal Classification */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bug className="w-6 h-6 text-pink-600" />
                      <span>Animal Kingdom Classification</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Introduction */}
                    <div className="bg-pink-50 p-5 rounded-lg border border-pink-200">
                      <h4 className="font-semibold text-pink-800 mb-3">🐾 The Amazing Animal Diversity</h4>
                      <p className="text-pink-700 leading-relaxed mb-4">
                        Animals show incredible diversity in body plans, from simple sponges to complex mammals. We
                        classify them based on their body organization, symmetry, and other key features. Let's explore
                        the major animal phyla!
                      </p>

                      <div className="bg-white p-3 rounded border border-pink-200">
                        <h5 className="font-semibold text-pink-800 mb-2">🎯 Classification Based On:</h5>
                        <div className="grid md:grid-cols-3 gap-3">
                          <ul className="text-pink-700 text-sm space-y-1">
                            <li>• Body symmetry</li>
                            <li>• Body cavity (coelom)</li>
                            <li>• Body segmentation</li>
                          </ul>
                          <ul className="text-pink-700 text-sm space-y-1">
                            <li>• Tissue organization</li>
                            <li>• Digestive system</li>
                            <li>• Circulatory system</li>
                          </ul>
                          <ul className="text-pink-700 text-sm space-y-1">
                            <li>• Respiratory system</li>
                            <li>• Reproductive system</li>
                            <li>• Nervous system</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Animal Group Selector */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-3">🔍 Explore Animal Phyla</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {Object.entries(animalGroups).map(([key, group]) => (
                          <Button
                            key={key}
                            variant={selectedAnimalGroup === key ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedAnimalGroup(key as AnimalGroupKey)}
                            className="flex items-center space-x-2"
                          >
                            <span>{group.name.split(" ")[0]}</span>
                          </Button>
                        ))}
                      </div>

                      {/* Selected Animal Group Details */}
                      <div className="border-2 border-pink-200 rounded-lg p-4 bg-pink-50">
                        <h5 className="text-xl font-bold mb-3 text-pink-800">
                          🐾 {animalGroups[selectedAnimalGroup].name}
                        </h5>

                        <div className="bg-white p-4 rounded border">
                          <p className="text-gray-700 text-sm mb-4">{animalGroups[selectedAnimalGroup].description}</p>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h6 className="font-semibold text-gray-800 mb-2">Key Characteristics:</h6>
                              <ul className="text-gray-700 text-sm space-y-1">
                                {animalGroups[selectedAnimalGroup].characteristics.map((char, index) => (
                                  <li key={index} className="flex items-start space-x-2">
                                    <span className="text-pink-500 mt-1">•</span>
                                    <span>{char}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h6 className="font-semibold text-gray-800 mb-2">Examples:</h6>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {animalGroups[selectedAnimalGroup].examples.map((example, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-pink-100 rounded text-xs font-medium text-pink-700"
                                  >
                                    {example}
                                  </span>
                                ))}
                              </div>
                              <h6 className="font-semibold text-gray-800 mb-1">Habitat:</h6>
                              <p className="text-gray-700 text-sm">{animalGroups[selectedAnimalGroup].habitat}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Animal Groups */}
                    <div className="space-y-6">
                      {/* Evolution of Complexity */}
                      <div className="border-2 border-indigo-200 rounded-lg p-5 bg-indigo-50">
                        <h4 className="font-bold text-indigo-800 text-lg mb-3 flex items-center space-x-2">
                          <span className="text-2xl">📈</span>
                          <span>Evolution of Animal Complexity</span>
                        </h4>

                        <div className="bg-white p-4 rounded border border-indigo-200">
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="bg-indigo-50 p-3 rounded">
                                <h6 className="font-semibold text-indigo-800 mb-2">Simple → Complex</h6>
                                <p className="text-indigo-700 text-sm">
                                  From simple sponges with no tissues to complex mammals with organ systems
                                </p>
                              </div>
                              <div className="bg-indigo-50 p-3 rounded">
                                <h6 className="font-semibold text-indigo-800 mb-2">Symmetry Development</h6>
                                <p className="text-indigo-700 text-sm">
                                  From asymmetrical to radial to bilateral symmetry
                                </p>
                              </div>
                              <div className="bg-indigo-50 p-3 rounded">
                                <h6 className="font-semibold text-indigo-800 mb-2">Body Cavity</h6>
                                <p className="text-indigo-700 text-sm">From no cavity to pseudocoelom to true coelom</p>
                              </div>
                            </div>

                            <div className="bg-indigo-100 p-3 rounded">
                              <h6 className="font-semibold text-indigo-800 mb-2">🧬 Evolutionary Trend:</h6>
                              <p className="text-indigo-700 text-sm">
                                Porifera → Coelenterata → Platyhelminthes → Nematoda → Annelida → Arthropoda → Mollusca
                                → Echinodermata → Chordata
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Vertebrates vs Invertebrates */}
                      <div className="border-2 border-purple-200 rounded-lg p-5 bg-purple-50">
                        <h4 className="font-bold text-purple-800 text-lg mb-3 flex items-center space-x-2">
                          <Fish className="w-6 h-6" />
                          <span>Vertebrates vs Invertebrates</span>
                        </h4>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white p-4 rounded border border-purple-200">
                            <h5 className="font-semibold text-purple-800 mb-3">🦴 Vertebrates (Phylum Chordata)</h5>
                            <ul className="text-purple-700 text-sm space-y-2">
                              <li>• Have backbone (vertebral column)</li>
                              <li>• Internal skeleton</li>
                              <li>• Well-developed nervous system</li>
                              <li>• Closed circulatory system</li>
                              <li>• Examples: Fish, birds, mammals</li>
                            </ul>
                            <div className="mt-3 p-2 bg-purple-50 rounded">
                              <p className="text-purple-700 text-xs">
                                <strong>Fun Fact:</strong> Only about 3% of all animal species are vertebrates!
                              </p>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded border border-purple-200">
                            <h5 className="font-semibold text-purple-800 mb-3">🐛 Invertebrates (All Other Phyla)</h5>
                            <ul className="text-purple-700 text-sm space-y-2">
                              <li>• No backbone</li>
                              <li>• External skeleton or no skeleton</li>
                              <li>• Simpler nervous systems</li>
                              <li>• Various circulatory systems</li>
                              <li>• Examples: Insects, worms, jellyfish</li>
                            </ul>
                            <div className="mt-3 p-2 bg-purple-50 rounded">
                              <p className="text-purple-700 text-xs">
                                <strong>Amazing:</strong> 97% of all animals are invertebrates, with insects being the
                                largest group!
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="col-12 col-lg-3 space-y-6">
            {/* Quick Reference */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎯 Quick Reference</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Classification Hierarchy</h4>
                  <div className="text-sm space-y-1">
                    <p className="text-gray-600">Kingdom → Phylum → Class</p>
                    <p className="text-gray-600">Order → Family → Genus</p>
                    <p className="text-gray-600">Species</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Five Kingdoms</h4>
                  <div className="space-y-1">
                    <Badge variant="outline" className="text-xs">
                      🦠 Monera
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      🦠 Protista
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      🍄 Fungi
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      🌱 Plantae
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      🐾 Animalia
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Memory Trick</h4>
                  <p className="text-sm text-gray-600">"King Philip Came Over For Good Soup"</p>
                </div>
              </CardContent>
            </Card>

            {/* Study Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  <span>Study Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 text-sm mb-1">🔍 Observe & Compare</h4>
                  <p className="text-blue-700 text-xs">
                    Look at organisms around you and try to classify them using the characteristics you've learned.
                  </p>
                </div>

                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 text-sm mb-1">📊 Make Charts</h4>
                  <p className="text-green-700 text-xs">
                    Create comparison tables for kingdoms, plant groups, and animal phyla.
                  </p>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 text-sm mb-1">🧬 Practice Names</h4>
                  <p className="text-purple-700 text-xs">
                    Learn scientific names of common organisms and understand their meanings.
                  </p>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 text-sm mb-1">🌳 Draw Trees</h4>
                  <p className="text-orange-700 text-xs">
                    Draw classification trees to visualize relationships between different groups.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Key Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📚 Key Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong className="text-gray-800">Taxonomy:</strong>
                    <p className="text-gray-600 text-xs">Science of classification</p>
                  </div>
                  <div>
                    <strong className="text-gray-800">Binomial:</strong>
                    <p className="text-gray-600 text-xs">Two-name system</p>
                  </div>
                  <div>
                    <strong className="text-gray-800">Prokaryotic:</strong>
                    <p className="text-gray-600 text-xs">No membrane-bound nucleus</p>
                  </div>
                  <div>
                    <strong className="text-gray-800">Eukaryotic:</strong>
                    <p className="text-gray-600 text-xs">Membrane-bound nucleus present</p>
                  </div>
                  <div>
                    <strong className="text-gray-800">Autotrophic:</strong>
                    <p className="text-gray-600 text-xs">Make own food</p>
                  </div>
                  <div>
                    <strong className="text-gray-800">Heterotrophic:</strong>
                    <p className="text-gray-600 text-xs">Depend on others for food</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Assessment Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <span>Test Your Classification Knowledge!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">🎯 Quick Check Questions</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded border">
                    <p className="text-sm font-medium text-gray-800 mb-2">
                      1. Which kingdom contains organisms with prokaryotic cells?
                    </p>
                    <p className="text-xs text-gray-600">Answer: Kingdom Monera</p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded border">
                    <p className="text-sm font-medium text-gray-800 mb-2">2. What is the scientific name for humans?</p>
                    <p className="text-xs text-gray-600">
                      Answer: <em>Homo sapiens</em>
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded border">
                    <p className="text-sm font-medium text-gray-800 mb-2">
                      3. Which plant group is called "amphibians of plant kingdom"?
                    </p>
                    <p className="text-xs text-gray-600">Answer: Bryophyta (Mosses)</p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded border">
                    <p className="text-sm font-medium text-gray-800 mb-2">4. What type of cell wall do fungi have?</p>
                    <p className="text-xs text-gray-600">Answer: Chitin</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">🧠 Think and Apply</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded border border-blue-200">
                    <p className="text-sm font-medium text-blue-800 mb-2">
                      Classification Challenge: A newly discovered organism is unicellular, has a membrane-bound
                      nucleus, and can move using flagella. Which kingdom does it belong to?
                    </p>
                    <p className="text-xs text-blue-600">Think about the key characteristics of each kingdom!</p>
                  </div>

                  <div className="p-3 bg-green-50 rounded border border-green-200">
                    <p className="text-sm font-medium text-green-800 mb-2">
                      Real-world Application: Why do you think angiosperms are the most successful plants on Earth?
                    </p>
                    <p className="text-xs text-green-600">Consider their reproductive strategies and adaptations!</p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded border border-purple-200">
                    <p className="text-sm font-medium text-purple-800 mb-2">
                      Research Project: Find 5 organisms from your local area and classify them up to the phylum level.
                    </p>
                    <p className="text-xs text-purple-600">Use field guides or online resources to help you!</p>
                  </div>

                  <div className="p-3 bg-orange-50 rounded border border-orange-200">
                    <p className="text-sm font-medium text-orange-800 mb-2">
                      Critical Thinking: How has classification helped in medical discoveries and treatments?
                    </p>
                    <p className="text-xs text-orange-600">
                      Think about antibiotics, vaccines, and disease identification!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">🏆 Chapter Summary</h4>
              <p className="text-yellow-700 text-sm">
                Congratulations! You've now explored the incredible diversity of life on Earth and learned how
                scientists organize it all. From the tiniest bacteria to the largest mammals, from simple algae to
                complex flowering plants - every organism has its place in the grand tree of life. Remember,
                classification is not just about memorizing names and groups; it's about understanding relationships,
                evolution, and the amazing story of life on our planet. Keep observing the world around you with your
                new classification knowledge!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
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

// ... inside your main component's return, just before the closing tag:
{/* ...existing JSX... */}
<AskDoubtFloater />
// ... existing code ...
