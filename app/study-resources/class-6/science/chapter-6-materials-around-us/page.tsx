import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, User, Mail, Package, Eye, HardHat, Droplets, Scale, Box, Lightbulb, TestTube, Star, Home, GraduationCap, Beaker } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Class 6 Science Chapter 6 Notes – Materials Around Us (Properties & Uses)',
  description: 'Get Class 6 Science Chapter 6 notes – Materials Around Us. Covers classification of objects and materials, key properties (lustre, hardness, transparency, solubility, mass, volume), daily life examples, fun activities, and exam-ready key points explained simply.',
};

export default function Chapter6Page() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/study-resources" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Study Resources
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/study-resources/class-6" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <GraduationCap className="w-4 h-4 mr-1" />
              Class 6
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/study-resources/class-6/science" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <Beaker className="w-4 h-4 mr-1" />
              Science
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Chapter 6 - Materials Around Us</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Package className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              Chapter 6: Materials Around Us
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Objects are everywhere; materials are what they're made of. Learn to observe → group → choose the right material for the right job.
          </p>
          <div className="bg-white/10 p-4 rounded-xl mb-8">
            <p className="text-lg italic">A chef needs to choose the right pan for cooking.<br />
            How does he decide between steel, aluminum, or ceramic? → <strong>By understanding material properties!</strong></p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/study-resources/class-6/science">
              <Button size="lg" variant="outline" className="border-2 border-white text-white rounded-xl px-8 py-4 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Class 6 Science
              </Button>
            </Link>
            <Link href="/book-demo-class">
              <Button size="lg" className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-4 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold">
                Book Free Session
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">

          {/* Big Ideas Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 mr-3 text-[#FFC857]" />
                Big Ideas
              </h2>
              <ul className="space-y-3 text-lg" style={{ wordSpacing: 'normal', letterSpacing: 'normal' }}>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Object vs Material:</strong> Objects (bottle, table) are <em>made from</em> materials (plastic, glass, wood).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Why group?</strong> Grouping (classification) by common properties makes study & choice <em>easier and logical</em>.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Key properties to compare:</strong> Appearance (lustre), hardness/softness, see-through ability (transparent/translucent/opaque), solubility in water, mass (heaviness) and volume (space).</span>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-[#FFC857]/10 rounded-lg">
                <h3 className="font-semibold text-[#FFC857] mb-2">💡 Memory Hook – "LAHSTeM-V"</h3>
                <p className="text-white">
                  <strong>L</strong>ustre, <strong>A</strong>ppearance, <strong>H</strong>ard/Soft, <strong>S</strong>ee-through, <strong>Te</strong>st in water (soluble/insoluble), <strong>M</strong>ass, <strong>V</strong>olume.
                </p>
              </div>
            </div>
          </section>

          {/* Spot & List Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Eye className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Spot & List (Warm-up)
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <ul className="space-y-4 text-gray-700" style={{ wordSpacing: 'normal', letterSpacing: 'normal' }}>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Look around your room/class and note <strong>object → material(s)</strong> pairs (e.g., <strong>Pen</strong> → plastic body + metal clip + ink).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>One object can use <strong>many materials</strong>; <strong>one material</strong> can make <strong>many objects</strong>.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Choosing Materials for Purpose */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Package className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Choosing Materials for Purpose
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-4">Examples</h3>
                <ul className="space-y-3 text-gray-700">
                  <li><strong>Tumbler</strong> must hold water: suitable → steel, glass, plastic; not suitable → cloth, paper</li>
                  <li><strong>Sports balls</strong> differ by material & bounce (cricket vs tennis vs hand-exercise ball)</li>
                  <li><strong>Pens/utensils/furniture</strong> often mix materials to combine strengths</li>
                </ul>
              </div>
              
              <div className="bg-[#2BAE66]/10 p-6 rounded-lg">
                <h3 className="font-semibold text-[#1A3D7C] mb-4">🔎 Think like a maker</h3>
                <p className="text-gray-700">
                  First write <strong>required properties</strong> (e.g., "must be waterproof, strong, light"), then pick the material.
                </p>
              </div>
            </div>
          </section>

          {/* Properties of Materials */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <TestTube className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Properties of Materials (with quick checks)
            </h2>
            
            {/* A) Appearance & Lustre */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#1A3D7C] mb-4 flex items-center">
                <Star className="w-6 h-6 mr-2 text-[#2BAE66]" />
                A) Appearance & Lustre
              </h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-3">Lustrous (shiny)</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Usually <strong>metals</strong>—iron, copper, aluminium, zinc, gold</li>
                      <li>• Metals may <strong>lose shine</strong> due to air/moisture</li>
                      <li>• Freshly cut surfaces show lustre</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-3">Non-lustrous</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Paper, wood, rubber, jute</li>
                      <li>• <strong>Caution:</strong> Polished/coated plastics can "look shiny" but aren't metals</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* B) Hard vs Soft */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#1A3D7C] mb-4 flex items-center">
                <HardHat className="w-6 h-6 mr-2 text-[#2BAE66]" />
                B) Hard vs Soft (relative!)
              </h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-3">Hard</h4>
                    <p className="text-gray-700 mb-3">Difficult to scratch/compress (stone, iron)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-3">Soft</h4>
                    <p className="text-gray-700 mb-3">Easy to scratch/compress (eraser, sponge)</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Relative:</strong> rubber is harder than sponge but softer than iron.<br/>
                    <strong>Try:</strong> Scratch test with a key on wood/chalk/metal & compare.
                  </p>
                </div>
              </div>
            </div>

            {/* C) See-through ability */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#1A3D7C] mb-4 flex items-center">
                <Eye className="w-6 h-6 mr-2 text-[#2BAE66]" />
                C) See-through ability
              </h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h4 className="font-semibold text-green-800 mb-3">Transparent</h4>
                    <p className="text-gray-700 text-sm">See clearly (glass, clean water, air, window glass)</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-yellow-800 mb-3">Translucent</h4>
                    <p className="text-gray-700 text-sm">See blurred (butter paper, frosted glass)</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-red-800 mb-3">Opaque</h4>
                    <p className="text-gray-700 text-sm">Cannot see through (wood, cardboard, metals)</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Scene check:</strong> Child looking through a <strong>glass window</strong> (transparent) vs <strong>wooden door</strong> (opaque).
                  </p>
                </div>
              </div>
            </div>

            {/* D) Solubility in Water */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#1A3D7C] mb-4 flex items-center">
                <Droplets className="w-6 h-6 mr-2 text-[#2BAE66]" />
                D) Solubility in Water
              </h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-3">Soluble</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Sugar, salt</strong> disappear (dissolve)</li>
                      <li>• <strong>Liquids:</strong> Some mix (vinegar–water)</li>
                      <li>• <strong>Gases:</strong> Oxygen dissolves in water—vital for aquatic life</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-3">Insoluble</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Sand, sawdust, chalk powder</strong> stay visible even after stirring</li>
                      <li>• <strong>Liquids:</strong> Some separate (oil–water)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">🍹 Health note (ORS)</h4>
                  <p className="text-gray-700">
                    If packets aren't available, mix <strong>6 level teaspoons sugar + ½ teaspoon salt in 1 L boiled & cooled water</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* E) Heaviness → Mass */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#1A3D7C] mb-4 flex items-center">
                <Scale className="w-6 h-6 mr-2 text-[#2BAE66]" />
                E) Heaviness → Mass
              </h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-700">
                  Heavier cup has <strong>more mass</strong> (use a balance to compare sand/water/pebbles).<br/>
                  In daily talk "weight" is used, but you'll learn <strong>mass vs weight</strong> later.
                </p>
              </div>
            </div>

            {/* F) Space → Volume */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#1A3D7C] mb-4 flex items-center">
                <Box className="w-6 h-6 mr-2 text-[#2BAE66]" />
                F) Space → Volume
              </h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <ul className="space-y-3 text-gray-700">
                  <li>• Same tumbler, different water levels → <strong>different volume</strong> of water</li>
                  <li>• Common units on bottles: <strong>mL, L</strong> (e.g., 500 mL)</li>
                  <li>• <strong>Notation rules:</strong> write a <strong>space</strong> between number & unit (e.g., <strong>500 mL</strong>)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* What is Matter */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Box className="w-8 h-8 mr-3 text-[#2BAE66]" />
              What is Matter?
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="mb-6">
                <p className="text-lg text-gray-700 mb-4">
                  <strong>Anything that occupies space (volume) and has mass</strong> is <strong>matter</strong>.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-[#1A3D7C] mb-3">Mass Units</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Gram (<strong>g</strong>), kilogram (<strong>kg</strong>)</li>
                    <li>• <strong>kg</strong> is SI unit of mass</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#1A3D7C] mb-3">Volume Units</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Litre (<strong>L</strong>), millilitre (<strong>mL</strong>)</li>
                    <li>• SI volume: <strong>m³</strong> (1 m³ = 1000 L)</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-gray-700">
                  Write with correct symbols and spacing: <strong>7 kg</strong>, <strong>500 mL</strong>, <strong>2 m³</strong>.
                </p>
              </div>
              
              <div className="mt-4 space-y-3 text-gray-700">
                <p>• <strong>Materials are kinds of matter</strong> used to make objects.</p>
                <p>• We classify <strong>non-living</strong> things by properties, just like we classify living things.</p>
              </div>
            </div>
          </section>

          {/* Daily-Life Sorting Ideas */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Package className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Daily-Life Sorting Ideas
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-4">Kitchen</h3>
                <p className="text-gray-700">
                  Store by <strong>type/use</strong> (cereals, pulses, spices, oils) or by <strong>containers</strong> (transparent jars help you see contents).
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-4">Shop/Wardrobe</h3>
                <p className="text-gray-700">
                  Group by <strong>material</strong>, <strong>fragility</strong>, <strong>use frequency</strong>.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-4">Waste bins</h3>
                <p className="text-gray-700">
                  Pick container materials considering <strong>leak-proof</strong>, <strong>safe for glass</strong>, <strong>dry vs wet</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Mini-Labs / Activities */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <TestTube className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Mini-Labs / Activities (class-ready)
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <ol className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">1</span>
                  <div>
                    <strong>Shine Hunt:</strong> Collect foil, copper wire, chalk, wood—rank lustre; note if shine is <strong>real metal</strong> or <strong>polish/coating</strong>.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">2</span>
                  <div>
                    <strong>Scratch Scale:</strong> Use the same key to scratch chalk/wood/aluminium/iron—order from <strong>soft → hard</strong>.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">3</span>
                  <div>
                    <strong>Window Test:</strong> Label classroom items <strong>T/Tr/O</strong> (transparent/translucent/opaque).
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">4</span>
                  <div>
                    <strong>Mix & Note:</strong> Stir <strong>salt, sugar, sand, sawdust, chalk</strong> in water—record soluble/insoluble; try <strong>oil</strong> on top.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">5</span>
                  <div>
                    <strong>Balance Compare:</strong> Half-filled cups of <strong>water, sand, pebbles</strong>—weigh & order by <strong>mass</strong>.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">6</span>
                  <div>
                    <strong>Volume Sense:</strong> Pour water from two bottles into identical tumblers; compare <strong>levels → volume</strong>.
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* Fun Facts / Culture Corner */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Star className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Fun Facts / Culture Corner
            </h2>
            <div className="bg-gradient-to-r from-[#FFC857]/10 to-[#2BAE66]/10 p-6 rounded-lg border border-[#FFC857]/20">
              <ul className="space-y-4 text-gray-700" style={{ wordSpacing: 'normal', letterSpacing: 'normal' }}>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Ancient pottery</strong> (Harappan): refined clays, slips, painted designs; baked <strong>terracotta</strong> jars for storage.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Ayurveda's 20 properties (guṇa)</strong> show an early <strong>system of classifying matter</strong> (e.g., heavy–light, hot–cold, smooth–rough).</span>
                </li>
              </ul>
            </div>
          </section>

          {/* HOTS Questions */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-[#2BAE66]" />
              HOTS / Exam-Style Questions
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <ol className="space-y-6 text-gray-700">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">1</span>
                  <div>
                    <p><strong>Chair challenge:</strong> From wood/iron/plastic/bamboo/cement/stone—pick the <strong>best</strong> for (i) hardness (long-term use), (ii) light weight, (iii) not cold in winter, (iv) easy cleaning—justify.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">2</span>
                  <div>
                    <p><strong>Transparent containers</strong> are common in shops—explain <strong>why</strong>.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">3</span>
                  <div>
                    <p><strong>Mystery pair:</strong> X dissolves and is <strong>hard</strong>; Y doesn't dissolve and is <strong>soft</strong>—name examples & explain.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">4</span>
                  <div>
                    <p>Sort <strong>horse, oil, air, frosted glass, copper, butter paper, chalk</strong> into <strong>material type</strong> and <strong>see-through class</strong>.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">5</span>
                  <div>
                    <p>Your friend calls <strong>air "not matter"</strong> since we can't see it. Refute using <strong>mass/volume</strong> ideas.</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* Suggested Visuals */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <BookOpen className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Suggested Visuals to Add
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <ul className="space-y-3 text-gray-700" style={{ wordSpacing: 'normal', letterSpacing: 'normal' }}>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Property Wall:</strong> Lustre vs Non-lustre; Hard vs Soft (photo tiles).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>See-through Strip:</strong> Transparent ↔ Translucent ↔ Opaque with real samples.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Mixing Map:</strong> Soluble/insoluble table + oil-water layer sketch.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Units Poster:</strong> g–kg, mL–L–m³ with <strong>correct symbol rules</strong> & examples.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Object → Material map:</strong> "Pen" exploded view (plastic/metal/ink).</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Quick Recap */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 mr-3 text-[#FFC857]" />
                Quick Recap
              </h2>
              <ul className="space-y-3 text-lg" style={{ wordSpacing: 'normal', letterSpacing: 'normal' }}>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Objects come from <strong>many materials</strong>; we <strong>choose</strong> by properties & purpose.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Classification</strong> helps compare & decide quickly.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Core properties: <strong>lustre</strong>, <strong>hard/soft</strong>, <strong>transparent/translucent/opaque</strong>, <strong>soluble/insoluble</strong>, <strong>mass</strong>, <strong>volume</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Matter = mass + volume</strong>; write units <strong>properly</strong> (7 kg, 500 mL, 2 m³).</span>
                </li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Help Understanding Materials and Their Properties?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Our expert mentors can help you master material classification and properties with hands-on activities and real-world examples.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book-demo-class">
                  <button className="bg-[#FFC857] text-[#1A3D7C] px-8 py-3 rounded-xl font-semibold hover:bg-[#FFC857]/90 transition-colors">
                    Book Free Session
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#1A3D7C] transition-colors">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A3D7C] text-white py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
                <span className="text-xl font-bold">The TutorBridge</span>
              </div>
              <p className="text-gray-300 mb-4">
                Empowering students with personalized education and career guidance for a brighter future.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/study-resources" className="hover:text-[#2BAE66] transition-colors">Study Resources</Link></li>
                <li><Link href="/doubt-solving" className="hover:text-[#2BAE66] transition-colors">Doubt Solving</Link></li>
                <li><Link href="/career-guidance" className="hover:text-[#2BAE66] transition-colors">Career Guidance</Link></li>
                <li><Link href="/motivational-sessions" className="hover:text-[#2BAE66] transition-colors">Motivational Sessions</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  <span>+91 9310096171</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@thetutorbridge.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 The TutorBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
