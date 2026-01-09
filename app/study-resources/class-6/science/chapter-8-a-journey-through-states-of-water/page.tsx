import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Droplets, Thermometer, Eye, Wind, Sun, Cloud, Lightbulb, TestTube, Star, Home, GraduationCap, Beaker, Target, AlertTriangle, Zap } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Class 6 Science Chapter 8 Notes – A Journey Through States of Water (Evaporation, Condensation & Water Cycle)',
  description: 'Get Class 6 Science Chapter 8 notes – A Journey Through States of Water. Clear explanations of states (solid, liquid, gas), evaporation, condensation, melting/freezing, factors affecting drying, cooling by evaporation, cloud formation, and the water cycle—plus activities and HOTS questions.',
};

export default function Chapter8Page() {
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
              <span className="hidden sm:inline">Chapter 8 - A Journey Through States of Water</span>
              <span className="sm:hidden">Ch 8</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Droplets className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              Chapter 8: A Journey Through States of Water
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Ice, water, steam—same substance, different states. Discover how and why water changes its form, and how those changes shape weather and daily life.
          </p>
          <div className="bg-white/10 p-4 rounded-xl mb-8">
            <p className="text-lg italic">"Water is the driving force of all nature."<br />
            <strong>— Leonardo da Vinci</strong></p>
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

          {/* Big Ideas Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 mr-3 text-[#FFC857]" />
                Big Ideas (Why this chapter matters)
              </h2>
              <ul className="space-y-3 text-lg" style={{ wordSpacing: 'normal', letterSpacing: 'normal' }}>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Ice, water, water vapour</strong> are <strong>the same substance (H₂O)</strong> in three states: <strong>solid, liquid, gas</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>State decides <strong>shape, flow, spread</strong>: <strong>Ice (solid):</strong> fixed shape, doesn't flow. <strong>Water (liquid):</strong> no fixed shape, <strong>flows</strong>, keeps <strong>volume</strong>. <strong>Water vapour (gas):</strong> no fixed shape/volume, <strong>spreads to fill space</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Two master processes drive most changes: <strong>Evaporation</strong> (liquid → vapour) and <strong>Condensation</strong> (vapour → liquid).</span>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-[#FFC857]/10 rounded-lg">
                <h3 className="font-semibold text-[#FFC857] mb-2">🧠 Memory Hook — "S–L–G: Shape–Flow–Spread"</h3>
                <p className="text-white">Solid: <strong>Shape</strong> fixed → Liquid: <strong>Flows</strong> → Gas: <strong>Spreads</strong>.</p>
              </div>
            </div>
          </section>

          {/* Ice vs Water Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <TestTube className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Ice vs Water: Same or Different?
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="bg-[#FFC857]/10 p-6 rounded-lg border border-[#FFC857]/20 mb-6">
                <h3 className="font-semibold text-[#1A3D7C] mb-4">Try this activity:</h3>
                <p className="text-gray-700 mb-4">
                  Keep an ice cube in a cup and watch it melt.
                </p>
                <p className="text-gray-700">
                  <strong>Inference:</strong> Ice → water without anything "added", so they're <strong>two states of the same substance</strong>.
                </p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Daily signs:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Water <strong>splashes</strong>, ice <strong>doesn't</strong></li>
                  <li>• Water <strong>flows</strong>, ice <strong>doesn't</strong></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Evaporation Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Wind className="w-8 h-8 mr-3 text-[#2BAE66]" />
              The "Disappearing Water" Mystery → Evaporation
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="space-y-6">
                <p className="text-gray-700">
                  Puddles shrink after sunshine; utensils dry after washing; a mopped floor dries. Water on a <strong>hot pan</strong> "vanishes" as <strong>steam</strong> (water vapour; visible "steam" is tiny droplets formed from vapour).
                </p>
                
                <div className="bg-[#2BAE66]/10 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#1A3D7C] mb-4">Definition:</h3>
                  <p className="text-gray-700">
                    <strong>Evaporation</strong> = liquid water changing into <strong>water vapour</strong>. It happens <strong>even at room temperature</strong>.
                  </p>
                </div>

                <div className="bg-[#1A3D7C]/10 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#1A3D7C] mb-4">Factors that change the rate of evaporation (S–W–A–H):</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="w-8 h-8 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">S</span>
                        <div>
                          <h4 className="font-semibold text-[#1A3D7C]">Surface area ↑</h4>
                          <p className="text-gray-700 text-sm">→ faster (thin <strong>plate</strong> dries quicker than <strong>bottle cap</strong> with the same water).</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="w-8 h-8 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">W</span>
                        <div>
                          <h4 className="font-semibold text-[#1A3D7C]">Warmth/temperature ↑</h4>
                          <p className="text-gray-700 text-sm">(sunlight, hot day) → faster.</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="w-8 h-8 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">A</span>
                        <div>
                          <h4 className="font-semibold text-[#1A3D7C]">Air movement ↑</h4>
                          <p className="text-gray-700 text-sm">(wind, fan) → faster.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="w-8 h-8 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">H</span>
                        <div>
                          <h4 className="font-semibold text-[#1A3D7C]">Humidity ↓</h4>
                          <p className="text-gray-700 text-sm">(drier air) → faster. Humid/rainy days → <strong>slower</strong> drying.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FFC857]/10 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#1A3D7C] mb-4">🧪 Mini-tests:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Put equal water in a <strong>cap</strong> and a <strong>plate</strong> → plate evaporates faster (<strong>area effect</strong>).</li>
                    <li>• Keep equal water <strong>in sun vs shade</strong>; repeat on <strong>windy vs still</strong> days.</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-4">🌬️ Cooling by evaporation:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Matka/surahi</strong> stay cool because a little water seeps through clay and <strong>evaporates</strong>, removing heat.</li>
                    <li>• <strong>Hand sanitiser</strong> feels cold: fast evaporation pulls heat from skin.</li>
                    <li>• <strong>Fan</strong> makes sweat evaporate faster → cooling.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Condensation Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Cloud className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Water Droplets on a Cold Glass → Condensation
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="space-y-6">
                <p className="text-gray-700">
                  A tumbler with <strong>ice-cold water</strong> gets droplets <strong>outside</strong>. Where from? <strong>Not seepage</strong> (water level inside doesn't fall).
                </p>
                
                <div className="bg-[#2BAE66]/10 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#1A3D7C] mb-4">Explanation:</h3>
                  <p className="text-gray-700">
                    Water vapour in air <strong>condenses</strong> on the cold surface → <strong>droplets</strong>.
                  </p>
                </div>

                <div className="bg-[#1A3D7C]/10 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#1A3D7C] mb-4">Definition:</h3>
                  <p className="text-gray-700">
                    <strong>Condensation</strong> = water vapour changing into <strong>liquid water</strong>.
                  </p>
                </div>

                <div className="bg-[#FFC857]/10 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#1A3D7C] mb-4">Examples:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Dew</strong> on leaves in the morning</li>
                    <li>• Droplets on a <strong>lid</strong> over boiling water</li>
                    <li>• Used in <strong>AWG machines</strong> (cool moist air → water)</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-4">🧪 Weighing test idea:</h3>
                  <p className="text-gray-700">
                    Cover the cold tumbler and <strong>weigh</strong> every few minutes: mass <strong>increases</strong> as droplets collect outside (from air).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Changing States Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Zap className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Changing State with Heating/Cooling
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Melting:</h4>
                    <p className="text-gray-700">solid → liquid (ice → water; <strong>wax</strong> melts on heating).</p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Freezing:</h4>
                    <p className="text-gray-700">liquid → solid (water → ice; <strong>coconut oil</strong> can solidify in winter).</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Evaporation:</h4>
                    <p className="text-gray-700">liquid → gas (water on hot surface).</p>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Condensation:</h4>
                    <p className="text-gray-700">gas → liquid (dew, cold glass droplets).</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-[#FFC857]/10 rounded-lg">
                <h3 className="font-semibold text-[#1A3D7C] mb-2">🧠 Memory Hook — "Mi–Fre–Ev–Con"</h3>
                <p className="text-gray-700">
                  <strong>Mi</strong>lting, <strong>Fre</strong>ezing, <strong>Ev</strong>aporation, <strong>Con</strong>densation.
                </p>
              </div>
            </div>
          </section>

          {/* Properties Comparison Table */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Target className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Properties of States (Quick Compare)
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1A3D7C] text-white">
                    <th className="border border-gray-300 p-3 text-left">Property</th>
                    <th className="border border-gray-300 p-3 text-left">Ice (Solid)</th>
                    <th className="border border-gray-300 p-3 text-left">Water (Liquid)</th>
                    <th className="border border-gray-300 p-3 text-left">Water Vapour (Gas)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Shape</td>
                    <td className="border border-gray-300 p-3">Fixed</td>
                    <td className="border border-gray-300 p-3">No fixed shape; <strong>takes container's shape</strong></td>
                    <td className="border border-gray-300 p-3">No fixed shape</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Flow</td>
                    <td className="border border-gray-300 p-3">No</td>
                    <td className="border border-gray-300 p-3"><strong>Yes</strong></td>
                    <td className="border border-gray-300 p-3">—</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Spread</td>
                    <td className="border border-gray-300 p-3">No</td>
                    <td className="border border-gray-300 p-3"><strong>Spreads</strong> over a surface (volume constant)</td>
                    <td className="border border-gray-300 p-3"><strong>Fills any available space</strong></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Seen at room temp</td>
                    <td className="border border-gray-300 p-3">Yes (as ice if cooled enough)</td>
                    <td className="border border-gray-300 p-3">Yes</td>
                    <td className="border border-gray-300 p-3">Yes (present in air though <strong>invisible</strong>)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Water Cycle Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Cloud className="w-8 h-8 mr-3 text-[#2BAE66]" />
              From Puddles to Monsoon — Water Cycle
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">1. Evaporation:</h4>
                      <p className="text-gray-700">from oceans, lakes, rivers, soil, plants.</p>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">2. Condensation:</h4>
                      <p className="text-gray-700">cooling of moist air → tiny droplets around <strong>dust particles</strong> → <strong>clouds</strong>.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">3. Precipitation:</h4>
                      <p className="text-gray-700">many droplets merge → <strong>rain</strong> (or <strong>hail/snow</strong> in special conditions).</p>
                    </div>
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">4. Return flow:</h4>
                      <p className="text-gray-700">runoff via rivers/groundwater back to oceans.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#FFC857]/10 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#1A3D7C] mb-4">🧪 Bottle-cloud demo:</h3>
                  <p className="text-gray-700">
                    Add a tiny burnt-paper piece (dust) to a bottle with some water; squeeze–release → hazy "cloud" appears (droplets <strong>condense on dust</strong>).
                  </p>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800">
                    <strong>Important:</strong> Only a small fraction of Earth's water is directly usable; <strong>conserve</strong> and <strong>avoid pollution</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Investigations Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <TestTube className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Investigations You Can Do (Class-Ready)
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <ol className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">1</span>
                  <div>
                    <strong>Seepage or not?</strong> Mark the <strong>inside water level</strong>; if outside droplets form but level inside <strong>doesn't drop</strong>, it's <strong>condensation</strong>.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">2</span>
                  <div>
                    <strong>Which dries faster?</strong> Change <strong>one factor</strong> at a time (area, heat/sunlight, airflow, humidity); keep others same; <strong>time to dry</strong> is your measure.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">3</span>
                  <div>
                    <strong>Cooling seat trick:</strong> On a hot day, place a <strong>wet cloth</strong> on a hot scooter seat + fan/airflow → faster evaporation → <strong>cooler</strong> seat.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">4</span>
                  <div>
                    <strong>Where is evaporation at work at home?</strong> Sweat drying, cooking aromas spreading, clothes drying, floor mopping, ink drying.
                  </div>
                </li>
              </ol>
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
                    <p>Two tumblers: one with <strong>ice water</strong>, one with <strong>room-temp water</strong>. Only the cold one "sweats". Explain with <strong>condensation</strong>.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">2</span>
                  <div>
                    <p>A student says "water on the cold tumbler <strong>seeped out</strong>". Design a <strong>fair test</strong> to rule out seepage.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">3</span>
                  <div>
                    <p>Clothes dry slowly on a rainy day though fans are ON. Use <strong>humidity</strong> and <strong>airflow</strong> to explain.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">4</span>
                  <div>
                    <p>In two identical rooms, same wet cloth area: one <strong>sunlit</strong>, one <strong>shaded</strong>. Predict and justify which dries first and <strong>why</strong>.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">5</span>
                  <div>
                    <p>Explain <strong>matka cooling</strong> with <strong>evaporation</strong>; compare with feeling cold after <strong>sanitiser</strong> use.</p>
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
                  <span><strong>Same substance (H₂O)</strong> can be <strong>solid/liquid/gas</strong> with different behaviours.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Evaporation</strong> (liquid→gas) speeds up with <strong>bigger area, heat, wind, lower humidity</strong>; it <strong>cools</strong> surfaces.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Condensation</strong> (gas→liquid) forms <strong>dew</strong> and <strong>droplets</strong> on cold surfaces; it's central to <strong>clouds & rain</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Melting/Freezing</strong> switch between solid and liquid via <strong>heating/cooling</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>The <strong>water cycle</strong> is evaporation → condensation → precipitation → return flow.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Use water wisely</strong>—only a small part is readily usable.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Help Understanding States of Water?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Our expert mentors can help you master evaporation, condensation, and the water cycle with hands-on experiments and real-world applications.
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
            <p>&copy; 2026 The TutorBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
