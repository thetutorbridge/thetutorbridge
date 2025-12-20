import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Heart, Wind, Eye, Zap, TrendingUp, Users, Droplets, Apple, Skull, Lightbulb, TestTube, Star, Home, GraduationCap, Beaker, Target, AlertTriangle, Sun, Moon } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Class 6 Science Chapter 10 Notes – Living Creatures: Exploring their Characteristics (MRS GREN + D, Germination & Plant Growth)',
  description: 'Get Class 6 Science Chapter 10 notes – Living Creatures: Exploring their Characteristics. Covers MRS GREN + D life processes, germination conditions, plant growth and movement, phototropism, geotropism, and practical activities with daily life examples.',
};

export default function Chapter10Page() {
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
              <span className="hidden sm:inline">Chapter 10 - Living Creatures: Exploring their Characteristics</span>
              <span className="sm:hidden">Ch 10</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              Chapter 10: Living Creatures: Exploring their Characteristics
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            A seashell can be a home — and a body part — of a living snail. So how do we tell living from non-living? Explore life processes, germination, and plant growth.
          </p>
          <div className="bg-white/10 p-4 rounded-xl mb-8">
            <p className="text-lg italic">"Life is not measured by the number of breaths we take, but by the moments that take our breath away."<br />
            <strong>— Maya Angelou</strong></p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/study-resources/class-6/science">
              <Button size="lg" variant="outline" className="border-2 border-white text-white rounded-xl px-8 py-4 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Class 6 Science
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

      {/* Main Content */}
      <main className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">

          {/* What sets living apart from non-living Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Heart className="w-8 h-8 mr-3 text-[#2BAE66]" />
              What Sets Living Apart from Non-Living?
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  Use <strong>MRS GREN + D</strong> as your life-process checklist:
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      M — Movement
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Animals move; plants also show movements (flower opening; climbers twining; <strong>Drosera</strong> trapping insects; <strong>Mimosa</strong> folding on touch).
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <Wind className="w-5 h-5 mr-2" />
                      R — Respiration
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Humans breathe (lungs); plants exchange gases via <strong>stomata</strong>.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                      <Eye className="w-5 h-5 mr-2" />
                      S — Sensitivity/Response
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Thorn prick → withdraw; hot cup → pull back; Mimosa folds; some plants "sleep" at night.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      G — Growth
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Children outgrow clothes; plants add roots, shoots, leaves.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      R — Reproduction
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Organisms produce young ones/seeds (continuity of life).
                    </p>
                  </div>
                  
                  <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                    <h4 className="font-semibold text-indigo-800 mb-2 flex items-center">
                      <Droplets className="w-5 h-5 mr-2" />
                      E — Excretion
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Sweat/urine in animals; tiny <strong>water droplets</strong> (guttation) in grasses/roses.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
                    <h4 className="font-semibold text-pink-800 mb-2 flex items-center">
                      <Apple className="w-5 h-5 mr-2" />
                      N — Nutrition
                    </h4>
                    <p className="text-gray-700 text-sm">
                      All living beings need food/energy; plants make food, animals eat plants/other animals.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <Skull className="w-5 h-5 mr-2" />
                      + D — Death
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Life processes eventually stop; non-living doesn't have this.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-[#FFC857]/10 rounded-lg">
                <h3 className="font-semibold text-[#1A3D7C] mb-2">💡 Warm-up (Table idea):</h3>
                <p className="text-gray-700">
                  Make a 3-column list — <em>Thing</em> → <em>Living/Non-living</em> → <em>Reason using MRS GREN + D</em>. Cars move but <strong>do not</strong> grow/respire/excrete/reproduce → <strong>non-living</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Are seeds living? Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <TestTube className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Are Seeds Living? — Germination Conditions (Activity)
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700 mb-6">
                Set up <strong>four pots</strong> for ~15 days and observe:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">A — No water, sunlight present</h4>
                  <p className="text-gray-700 text-sm">
                    → <strong>No germination</strong> (water missing).
                  </p>
                </div>
                
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">B — Excess water, sunlight present</h4>
                  <p className="text-gray-700 text-sm">
                    → <strong>No/poor germination</strong> (waterlogged soil → <strong>no air</strong>).
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">C — Moist soil, dark</h4>
                  <p className="text-gray-700 text-sm">
                    → <strong>Germination occurs</strong> (air + water present).
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">D — Moist soil, sunlight present</h4>
                  <p className="text-gray-700 text-sm">
                    → <strong>Germination occurs</strong> (air + water present).
                  </p>
                </div>
              </div>
              
              <div className="bg-[#2BAE66]/10 p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-[#1A3D7C] mb-4">Conclusion:</h3>
                <p className="text-gray-700 mb-4">
                  <strong>Water + air</strong> are essential for germination; <strong>light isn't essential</strong> for bean seeds (species vary). After sprouting, light is needed for <strong>healthy growth</strong>.
                </p>
                <p className="text-gray-700">
                  <strong>Why?</strong> Water softens the <strong>seed coat</strong> and activates the <strong>embryo</strong>; air (oxygen) in soil spaces supports seed <strong>respiration</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Growth & movement in plants Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Growth & Movement in Plants (Activity)
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="space-y-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Upright + light all around:</h4>
                  <p className="text-gray-700">
                    <strong>Shoot</strong> grows <strong>up</strong>, <strong>root</strong> grows <strong>down</strong>.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Inverted seedling:</h4>
                  <p className="text-gray-700">
                    <strong>Shoot bends up</strong>, <strong>root bends down</strong>.
                  </p>
                </div>
                
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">One-sided light:</h4>
                  <p className="text-gray-700">
                    <strong>Shoot bends toward light</strong> (phototropism); root continues <strong>down</strong> (positive geotropism).
                  </p>
                </div>
              </div>
              
              {/* Mermaid Diagram */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-[#1A3D7C] mb-4 text-center">Plant Growth & Movement Diagram</h3>
                <div className="text-center">
                  <div className="inline-block bg-white p-4 rounded-lg border-2 border-[#2BAE66]">
                    <div className="text-sm text-gray-600 mb-2">Upright: light all around</div>
                    <div className="flex items-center justify-center space-x-4">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full mb-1"></div>
                        <div className="text-xs">Shoot</div>
                        <div className="text-xs text-green-600">↑ Upward</div>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-brown-500 rounded-full mb-1" style={{backgroundColor: '#8B4513'}}></div>
                        <div className="text-xs">Root</div>
                        <div className="text-xs text-brown-600">↓ Downward</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="my-4 text-gray-400">↓</div>
                  
                  <div className="inline-block bg-white p-4 rounded-lg border-2 border-[#2BAE66]">
                    <div className="text-sm text-gray-600 mb-2">Inverted: light all around</div>
                    <div className="flex items-center justify-center space-x-4">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full mb-1"></div>
                        <div className="text-xs">Shoot</div>
                        <div className="text-xs text-green-600">↗ Bends Upward</div>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-brown-500 rounded-full mb-1" style={{backgroundColor: '#8B4513'}}></div>
                        <div className="text-xs">Root</div>
                        <div className="text-xs text-brown-600">↙ Bends Downward</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="my-4 text-gray-400">↓</div>
                  
                  <div className="inline-block bg-white p-4 rounded-lg border-2 border-[#2BAE66]">
                    <div className="text-sm text-gray-600 mb-2">Upright: light from one side</div>
                    <div className="flex items-center justify-center space-x-4">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full mb-1"></div>
                        <div className="text-xs">Shoot</div>
                        <div className="text-xs text-green-600">→ Bends toward light</div>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-brown-500 rounded-full mb-1" style={{backgroundColor: '#8B4513'}}></div>
                        <div className="text-xs">Root</div>
                        <div className="text-xs text-brown-600">↓ Downward</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Life Cycle Case Studies Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Users className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Life Cycle Case Studies
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="space-y-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">🌱 Bean Plant Life Cycle</h4>
                  <p className="text-gray-700 text-sm">
                    <strong>Seed</strong> → <strong>Germination</strong> → <strong>Seedling</strong> → <strong>Mature Plant</strong> → <strong>Flower</strong> → <strong>Fruit</strong> → <strong>New Seeds</strong>
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">🦋 Butterfly Life Cycle</h4>
                  <p className="text-gray-700 text-sm">
                    <strong>Egg</strong> → <strong>Larva (Caterpillar)</strong> → <strong>Pupa (Chrysalis)</strong> → <strong>Adult Butterfly</strong>
                  </p>
                </div>
                
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">🐸 Frog Life Cycle</h4>
                  <p className="text-gray-700 text-sm">
                    <strong>Egg</strong> → <strong>Tadpole</strong> → <strong>Froglet</strong> → <strong>Adult Frog</strong>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* HOTS Questions */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-[#2BAE66]" />
              HOTS / Exam-Style Practice
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <ol className="space-y-6 text-gray-700">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">1</span>
                  <div>
                    <p>A robot can move, respond to touch, and even "learn." Using <strong>MRS GREN + D</strong>, explain why it's still considered non-living.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">2</span>
                  <div>
                    <p>Why do seeds need <strong>air</strong> for germination? What happens if soil is waterlogged?</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">3</span>
                  <div>
                    <p>Explain the difference between <strong>phototropism</strong> and <strong>geotropism</strong> with examples.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">4</span>
                  <div>
                    <p>Design an experiment to test if <strong>temperature</strong> affects seed germination. What variables would you control?</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">5</span>
                  <div>
                    <p>Compare the life cycles of a <strong>plant</strong> and an <strong>animal</strong>. What are the similarities and differences?</p>
                  </div>
                </li>
              </ol>
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
                  <span>Use <strong>MRS GREN + D</strong> to identify living things: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition, and Death.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Seeds need water + air</strong> for germination; light is not essential initially but needed for healthy growth.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Plants show <strong>phototropism</strong> (bend toward light) and <strong>geotropism</strong> (roots grow down, shoots grow up).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>All living things go through <strong>life cycles</strong> with different stages of growth and development.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Help Understanding Living Creatures?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Our expert mentors can help you master life processes, germination experiments, and plant growth with hands-on activities and real-world examples.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tutoring/free-consultation">
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
                <li><Link href="/homework-help" className="hover:text-[#2BAE66] transition-colors">Doubt Solving</Link></li>
                <li><Link href="/career-guidance" className="hover:text-[#2BAE66] transition-colors">Career Guidance</Link></li>
                <li><Link href="/motivational-sessions" className="hover:text-[#2BAE66] transition-colors">Motivational Sessions</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <BookOpen className="w-4 h-4" />
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
