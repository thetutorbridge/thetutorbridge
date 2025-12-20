"use client"

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Lightbulb,
  Target,
  Beaker,
  Globe,
  Compass,
  Zap,
  Shield,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Home,
  GraduationCap,
  Mail,
  Phone,
  Users,
  AlertTriangle,
  Play,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";

export default function Class6ScienceChapter4() {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const magneticMaterials = [
    { material: "Iron", symbol: "Fe", examples: "Nails, paperclips, steel objects" },
    { material: "Nickel", symbol: "Ni", examples: "Some coins, alloys" },
    { material: "Cobalt", symbol: "Co", examples: "Some magnets, alloys" },
  ];

  const nonMagneticMaterials = [
    { material: "Wood", examples: "Tables, chairs, pencils" },
    { material: "Plastic", examples: "Bottles, toys, containers" },
    { material: "Glass", examples: "Windows, bottles, mirrors" },
    { material: "Rubber", examples: "Erasers, tires, bands" },
    { material: "Most stones", examples: "Rocks, pebbles, gems" },
  ];

  const magnetShapes = [
    { shape: "Bar Magnet", description: "Rectangular with N and S poles at ends", use: "General purpose, experiments" },
    { shape: "U/Horse-shoe Magnet", description: "U-shaped with poles at tips", use: "Stronger field, lifting objects" },
    { shape: "Ring Magnet", description: "Circular with poles on opposite sides", use: "Motors, generators" },
    { shape: "Disc Magnet", description: "Flat circular with poles on faces", use: "Small devices, crafts" },
  ];

  const experiments = [
    {
      concept: "Poles strongest",
      setup: "Iron filings + bar magnet",
      observation: "Filings cluster at ends",
      conclusion: "Poles are strongest"
    },
    {
      concept: "Direction finder",
      setup: "Suspend magnet by thread",
      observation: "Settles N–S",
      conclusion: "Earth is like a magnet"
    },
    {
      concept: "Make a compass",
      setup: "Magnetise needle, float on cork",
      observation: "Needle aligns N–S",
      conclusion: "Needle became a magnet"
    },
    {
      concept: "Repulsion test",
      setup: "Two bar magnets",
      observation: "N–N or S–S push away",
      conclusion: "Like poles repel (sure test)"
    },
    {
      concept: "Through materials",
      setup: "Compass + magnet + wood/plastic/glass between",
      observation: "Needle still deflects",
      conclusion: "Field passes through non-magnetic sheets"
    }
  ];

  const funActivities = [
    { activity: "Magnetic Garland", description: "Ring magnets stick into a chain" },
    { activity: "Maze Game", description: "Move steel balls in a maze with a magnet beneath the board" },
    { activity: "Paperclip-in-water Rescue", description: "Lift it using a magnet outside the cup (no wet fingers!)" },
    { activity: "Matchbox-magnet Cars", description: "Face like poles to repel and 'drive' them apart" },
    { activity: "Ring-magnet Hover", description: "Stack rings with like poles facing to keep a gap" },
  ];

  const memoryBoosters = [
    { trick: "INC", meaning: "Iron, Nickel, Cobalt are magnetic" },
    { trick: "No Single", meaning: "No single pole exists; poles come in pairs" },
    { trick: "AR rule", meaning: "Attract (unlike), Repel (like)" },
    { trick: "R = Real test", meaning: "Repulsion is the real/sure test for identifying a magnet" },
  ];

  const hotsQuestions = [
    "You have 3 identical metal bars; 2 are magnets, 1 is ordinary iron. No other tools. How do you identify the magnets? (Hint: look for repulsion.)",
    "A bar magnet has no pole markings. How can you find which end is North without another magnet? (Hint: suspend it freely; the North-seeking end points North.)",
    "Why is repulsion considered a sure test for magnetism, but attraction is not?",
    "A compass shows N–S even with a plastic sheet in between. What does that tell you about magnetic influence?",
    "In a 'matchbox-magnet car' race, cars rush apart when brought close. Explain using poles.",
  ];

  const compassSteps = [
    "Lay needle on table; stroke it 30–40 times with the same pole of the bar magnet in one direction",
    "Pass needle through a cork; float on water so needle stays above water",
    "When it stops turning, note direction → your compass!",
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto">
            <Link href="/study-resources" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center whitespace-nowrap">
              <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Study Resources</span>
              <span className="sm:hidden">Resources</span>
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/study-resources/class-6" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center whitespace-nowrap">
              <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Class 6</span>
              <span className="sm:hidden">C6</span>
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/study-resources/class-6/science" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center whitespace-nowrap">
              <Beaker className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Science</span>
              <span className="sm:hidden">Sci</span>
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 truncate max-w-[200px] sm:max-w-none">
              <span className="hidden sm:inline">Chapter 4 - Exploring Magnets</span>
              <span className="sm:hidden">Ch 4</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Compass className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              Exploring Magnets
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Class 6 Science - Chapter 4: Discover the fascinating world of magnets, magnetic materials, poles, and how compasses work.
          </p>
          <div className="bg-white/10 p-4 rounded-xl mb-8">
            <p className="text-lg italic">A stormy, overcast night at sea… no stars to guide the sailors.<br />
            What else can show direction? → <strong>A magnetic compass!</strong></p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/study-resources/class-6">
              <Button size="lg" variant="outline" className="border-2 border-white text-white rounded-xl px-8 py-4 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Class 6
              </Button>
            </Link>
            <Link href="/tutoring/free-consultation">
              <Button size="lg" className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-4 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold">
                Book Free Session
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Big Ideas Section */}
      <section className="py-16 bg-white px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  🧲 Big Ideas & Story Hook
                </h2>
                <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mt-1 flex-shrink-0" />
                    <span>In olden days, travellers used a <strong className="text-[#1A3D7C]">magnetic compass</strong> to find directions when stars weren't visible.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mt-1 flex-shrink-0" />
                    <span>Magnets appear in daily life: <strong className="text-[#1A3D7C]">pencil-box closures, purses, dusters on boards, toy parts</strong>.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mt-1 flex-shrink-0" />
                    <span>Natural magnets: <strong className="text-[#1A3D7C]">lodestone</strong> (ancient). Today we also have <strong className="text-[#1A3D7C]">artificial magnets</strong> in many shapes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mt-1 flex-shrink-0" />
                    <span><em>Why this matters:</em> magnets help in <strong className="text-[#1A3D7C]">navigation, holding/closing, sorting metals, toys, and science tools</strong>.</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Magnetic vs Non-magnetic Materials Section */}
      <section className="py-16 bg-[#F8FAFC] px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">
              🧲 Magnetic vs Non-magnetic Materials
            </h2>
            <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Magnetic Materials */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-6 flex items-center">
                  <Zap className="w-6 h-6 mr-2 text-[#2BAE66]" />
                  Magnetic Materials
                </h3>
                <div className="space-y-4">
                  {magneticMaterials.map((material, index) => (
                    <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-[#1A3D7C] mb-2">{material.material} ({material.symbol})</h4>
                      <p className="text-gray-600 text-sm">{material.examples}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Non-magnetic Materials */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-6 flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-[#2BAE66]" />
                  Non-magnetic Materials
                </h3>
                <div className="space-y-4">
                  {nonMagneticMaterials.map((material, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-[#1A3D7C] mb-2">{material.material}</h4>
                      <p className="text-gray-600 text-sm">{material.examples}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-[#FFC857]/10 p-6 rounded-xl border-l-4 border-[#FFC857]">
            <div className="flex items-start gap-3">
              <Target className="w-6 h-6 text-[#FFC857] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[#1A3D7C] mb-2">💡 Memory Trick:</h3>
                <p className="text-gray-700">
                  <strong>"INC are IN the magnetic club"</strong> → <strong>I</strong>ron, <strong>N</strong>ickel, <strong>C</strong>obalt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Magnet Shapes Section */}
      <section className="py-16 bg-white px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">
              🔧 Shapes of Magnets
            </h2>
            <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {magnetShapes.map((magnet, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#2BAE66] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Compass className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-poppins font-bold text-[#1A3D7C] mb-3">{magnet.shape}</h3>
                  <p className="text-gray-600 text-sm mb-3">{magnet.description}</p>
                  <p className="text-[#2BAE66] text-sm font-semibold">{magnet.use}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Poles Section */}
      <section className="py-16 bg-[#F8FAFC] px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  🧭 Poles of a Magnet
                </h2>
                <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Key Points:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-1 flex-shrink-0" />
                      <span>Ends are <strong>poles</strong>: <strong>North (N)</strong> and <strong>South (S)</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-1 flex-shrink-0" />
                      <span>Magnetism is strongest near the <strong>poles</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-1 flex-shrink-0" />
                      <span><strong>No single pole exists</strong>: breaking a magnet gives smaller magnets, each with both N and S</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-yellow-800 mb-2">Misconception Fix:</h3>
                      <p className="text-yellow-700">
                        You <strong>cannot</strong> get an isolated N or S by cutting a magnet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Compass Making Section */}
      <section className="py-16 bg-white px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  🧭 Make Your Own Compass
                </h2>
                <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">You'll need:</h3>
                  <p className="text-gray-700">Sewing needle, bar magnet, cork, bowl of water</p>
                </div>
                
                <div className="space-y-4">
                  {compassSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-[#FFC857]/10 p-6 rounded-xl border-l-4 border-[#FFC857]">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-[#FFC857] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-2">History Nugget:</h3>
                      <p className="text-gray-700">
                        A floating, <strong>magnetised fish-shaped iron</strong> (matsya-yantra) in <strong>oil</strong> was once used for navigation in India.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Attraction vs Repulsion Section */}
      <section className="py-16 bg-[#F8FAFC] px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  ⚡ When Two Magnets Meet: Attraction vs Repulsion
                </h2>
                <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">Attraction</h3>
                    <p className="text-green-700 mb-4"><strong>Unlike poles attract</strong> (N–S)</p>
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">N</div>
                      <span className="text-2xl">↔️</span>
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">S</div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-red-50 rounded-xl border border-red-200">
                    <h3 className="text-xl font-semibold text-red-800 mb-4">Repulsion</h3>
                    <p className="text-red-700 mb-4"><strong>Like poles repel</strong> (N–N or S–S)</p>
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">N</div>
                      <span className="text-2xl">↔️</span>
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">N</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#FFC857]/10 p-6 rounded-xl border-l-4 border-[#FFC857]">
                  <div className="flex items-start gap-3">
                    <Target className="w-6 h-6 text-[#FFC857] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-[#1A3D7C] mb-2">Sure Test of a Magnet:</h3>
                      <p className="text-gray-700">
                        <strong>Repulsion</strong> (only a magnet can repel a magnet; an unmagnetised iron bar will be attracted by either pole).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Experiments Section */}
      <section className="py-16 bg-white px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">
              🧪 Mini-Labs & Observations
            </h2>
            <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full"></div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-[#2BAE66] text-white">
                  <th className="border border-gray-300 p-3 text-left">Concept</th>
                  <th className="border border-gray-300 p-3 text-left">Setup</th>
                  <th className="border border-gray-300 p-3 text-left">What to See</th>
                  <th className="border border-gray-300 p-3 text-left">What it Proves</th>
                </tr>
              </thead>
              <tbody>
                {experiments.map((experiment, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 font-medium">{experiment.concept}</td>
                    <td className="border border-gray-300 p-3">{experiment.setup}</td>
                    <td className="border border-gray-300 p-3">{experiment.observation}</td>
                    <td className="border border-gray-300 p-3">{experiment.conclusion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Fun Activities Section */}
      <section className="py-16 bg-[#F8FAFC] px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">
              🎮 Fun with Magnets (STEM corners)
            </h2>
            <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {funActivities.map((activity, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Play className="w-6 h-6 text-[#2BAE66]" />
                    <h3 className="text-lg font-poppins font-bold text-[#1A3D7C]">{activity.activity}</h3>
                  </div>
                  <p className="text-gray-600">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Memory Boosters Section */}
      <section className="py-16 bg-white px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  🧠 Memory Boosters
                </h2>
                <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {memoryBoosters.map((booster, index) => (
                  <div key={index} className="p-6 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-[#1A3D7C] mb-2">{booster.trick}</h3>
                    <p className="text-gray-700">{booster.meaning}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Caring for Magnets Section */}
      <section className="py-16 bg-[#F8FAFC] px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  🛡️ Caring for Magnets (Do's & Don'ts)
                </h2>
                <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-red-50 rounded-xl border border-red-200">
                  <h3 className="text-xl font-semibold text-red-800 mb-4">❌ Don'ts</h3>
                  <ul className="space-y-2 text-red-700">
                    <li>• Do not heat magnets</li>
                    <li>• Do not drop or hammer magnets</li>
                    <li>• Keep away from mobiles/remotes</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                  <h3 className="text-xl font-semibold text-green-800 mb-4">✅ Do's</h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• Keep unlike poles together</li>
                    <li>• Use wooden spacer between magnets</li>
                    <li>• Use soft iron keepers across ends</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 bg-blue-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-2">Reason:</h3>
                    <p className="text-blue-700">
                      Protects magnetic strength and prevents self-demagnetisation.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* HOTS Section */}
      <section className="py-16 bg-white px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  📚 HOTS / Exam-Style Practice
                </h2>
                <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                {hotsQuestions.map((question, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-[#1A3D7C] mb-2">{index + 1}. {question}</h4>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Recap Section */}
      <section className="py-16 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-poppins font-bold mb-8">
            🎯 Quick Recap
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Key Points:</h3>
              <ul className="space-y-2 text-left">
                <li>• Only some materials (mostly iron, nickel, cobalt) are magnetic</li>
                <li>• A magnet has two poles; no single pole is possible</li>
                <li>• A free magnet aligns North–South; compasses use this to show direction</li>
                <li>• Unlike attract, like repel; repulsion is the sure test for a magnet</li>
                <li>• Magnetic influence can act through many non-magnetic materials</li>
                <li>• Handle & store magnets carefully to retain strength</li>
              </ul>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Memory Tricks:</h3>
              <ul className="space-y-2 text-left">
                <li>• <strong>INC</strong> → Iron, Nickel, Cobalt are magnetic</li>
                <li>• <strong>No Single</strong> → No single pole exists; poles come in pairs</li>
                <li>• <strong>AR rule</strong> → Attract (unlike), Repel (like)</li>
                <li>• <strong>R = Real test</strong> → Repulsion is the real/sure test for identifying a magnet</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1A3D7C] mb-6">
            Need Help Understanding Magnets?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Our expert science mentors can help you understand magnetic concepts, conduct experiments, and explore the fascinating world of magnets!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tutoring/free-consultation">
              <Button size="lg" className="bg-[#2BAE66] text-white rounded-xl px-8 py-4 hover:shadow-lg hover:bg-[#2BAE66]/90 transition-all text-lg font-semibold">
                Book Free Science Session
              </Button>
            </Link>
            <Link href="/study-resources/class-6">
              <Button size="lg" variant="outline" className="border-2 border-[#1A3D7C] text-[#1A3D7C] rounded-xl px-8 py-4 hover:bg-[#1A3D7C] hover:text-white transition-all text-lg font-semibold">
                Explore More Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A3D7C] text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
                <span className="text-xl font-poppins font-bold">The Tutor Bridge</span>
              </div>
              <p className="text-white/80 leading-relaxed">
                Empowering students with personalized education and career guidance for a brighter future.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-poppins font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/about" className="block text-white/80 hover:text-[#FFC857] transition-colors">About Us</Link>
                <Link href="/study-resources" className="block text-white/80 hover:text-[#FFC857] transition-colors">Study Resources</Link>
                <Link href="/career-guidance" className="block text-white/80 hover:text-[#FFC857] transition-colors">Career Guidance</Link>
                <Link href="/tutoring/free-consultation" className="block text-white/80 hover:text-[#FFC857] transition-colors">Book Demo</Link>
              </div>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-poppins font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Phone className="w-5 h-5 text-[#FFC857]" />
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Mail className="w-5 h-5 text-[#FFC857]" />
                  <span className="text-white/80">info@thetutorbridge.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/60">
              © 2025 The Tutor Bridge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
