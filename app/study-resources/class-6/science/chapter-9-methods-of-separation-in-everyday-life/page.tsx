import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Filter, Wind, Eye, Magnet, Droplets, Thermometer, Lightbulb, TestTube, Star, Home, GraduationCap, Beaker, Target, AlertTriangle, Zap, Scissors } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Class 6 Science Chapter 9 Notes – Methods of Separation in Everyday Life (Handpicking, Sieving, Filtration & More)',
  description: 'Get Class 6 Science Chapter 9 notes – Methods of Separation in Everyday Life. Covers handpicking, threshing, winnowing, sieving, sedimentation, decantation, filtration, evaporation, churning, magnetic separation, and practical applications with daily life examples.',
};

export default function Chapter9Page() {
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
              <span className="hidden sm:inline">Chapter 9 - Methods of Separation in Everyday Life</span>
              <span className="sm:hidden">Ch 9</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Filter className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              Chapter 9: Methods of Separation in Everyday Life
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            From handpicking stones from rice to winnowing husk from grain, separation methods help us make mixtures useful, clean, and safe.
          </p>
          <div className="bg-white/10 p-4 rounded-xl mb-8">
            <p className="text-lg italic">"The art of separation is the science of making things useful."<br />
            <strong>— Ancient wisdom</strong></p>
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
                Big Ideas (Why we separate)
              </h2>
              <ul className="space-y-3 text-lg" style={{ wordSpacing: 'normal', letterSpacing: 'normal' }}>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>We separate to <strong>(a) remove unwanted parts</strong> (stones from dal) and <strong>(b) obtain two useful components</strong> (butter + buttermilk).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>The <strong>property</strong> that differs between components (size, mass, magnetism, state, etc.) decides the <strong>method</strong> we choose.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Separation Toolbox Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Filter className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Separation Toolbox at a Glance
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1A3D7C] text-white">
                    <th className="border border-gray-300 p-3 text-left">Method</th>
                    <th className="border border-gray-300 p-3 text-left">What it separates</th>
                    <th className="border border-gray-300 p-3 text-left">Property used</th>
                    <th className="border border-gray-300 p-3 text-left">Daily-life example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Handpicking</td>
                    <td className="border border-gray-300 p-3">Solid–solid (small quantity of unwanted pieces)</td>
                    <td className="border border-gray-300 p-3">Visible difference in <strong>size/shape/colour</strong></td>
                    <td className="border border-gray-300 p-3">Pick small stones from rice/dal</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Threshing</td>
                    <td className="border border-gray-300 p-3">Grains from stalks</td>
                    <td className="border border-gray-300 p-3">Grains <strong>loosen</strong> from stalks on <strong>beating</strong></td>
                    <td className="border border-gray-300 p-3">Beating wheat bundles to free grains</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Winnowing</td>
                    <td className="border border-gray-300 p-3"><strong>Lighter</strong> husk from <strong>heavier</strong> grains</td>
                    <td className="border border-gray-300 p-3"><strong>Wind/air</strong> carries light component farther</td>
                    <td className="border border-gray-300 p-3">Farmer uses <strong>soop</strong> (bamboo tray) in wind</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Sieving</td>
                    <td className="border border-gray-300 p-3">Solid–solid of <strong>different sizes</strong></td>
                    <td className="border border-gray-300 p-3"><strong>Mesh size</strong> allows smaller to pass</td>
                    <td className="border border-gray-300 p-3">Sieving flour to remove bran/stones</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Sedimentation & Decantation</td>
                    <td className="border border-gray-300 p-3">Insoluble solid from liquid; immiscible liquids</td>
                    <td className="border border-gray-300 p-3">Heavier solid <strong>settles</strong>; lighter <strong>layer</strong> poured off</td>
                    <td className="border border-gray-300 p-3">Tea leaves settling, then gently <strong>pour</strong> tea; <strong>oil–water</strong> separation</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Filtration</td>
                    <td className="border border-gray-300 p-3">Insoluble solid from liquid (finer)</td>
                    <td className="border border-gray-300 p-3"><strong>Pores</strong> allow liquid through</td>
                    <td className="border border-gray-300 p-3">Tea strainer; cloth; <strong>filter paper</strong> cone + funnel</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Evaporation</td>
                    <td className="border border-gray-300 p-3"><strong>Dissolved solid</strong> from solution</td>
                    <td className="border border-gray-300 p-3">Liquid <strong>vaporises</strong>, solid remains</td>
                    <td className="border border-gray-300 p-3"><strong>Salt from seawater</strong> in salt pans; salt from salt solution on heating</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Churning</td>
                    <td className="border border-gray-300 p-3">Butter from curd (liquid–liquid/solid)</td>
                    <td className="border border-gray-300 p-3"><strong>Density</strong> difference (lighter butter floats)</td>
                    <td className="border border-gray-300 p-3">Mathni/whisk to get butter; buttermilk remains</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Magnetic separation</td>
                    <td className="border border-gray-300 p-3">Magnetic vs non-magnetic</td>
                    <td className="border border-gray-300 p-3"><strong>Magnetism</strong></td>
                    <td className="border border-gray-300 p-3">Pick <strong>iron nails</strong> from sawdust with a magnet; magnets in recycling yards</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 flex items-start">
                <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Limits:</strong> Filtration <strong>does not</strong> remove <strong>dissolved</strong> substances (e.g., salt in water). Evaporation yields the <strong>solid</strong> but usually <strong>loses the water</strong> (getting both back needs advanced methods beyond this chapter).</span>
              </p>
            </div>
          </section>

          {/* Decision Map Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Target className="w-8 h-8 mr-3 text-[#2BAE66]" />
              "Which Method Do I Use?" – A Quick Decision Map
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <ol className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">1</span>
                  <div>
                    <strong>Is one part magnetic (iron, steel)?</strong> → <strong>Magnetic separation</strong>.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">2</span>
                  <div>
                    <strong>Are pieces visibly different & few?</strong> → <strong>Handpicking</strong>.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">3</span>
                  <div>
                    <strong>Solid sticks to stalk?</strong> → <strong>Threshing</strong>, then <strong>winnowing</strong> (husk).
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">4</span>
                  <div>
                    <strong>Different particle sizes (solid–solid)?</strong> → <strong>Sieving</strong>.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">5</span>
                  <div>
                    <strong>Insoluble solid in liquid (coarse → fine)?</strong><br />
                    • Coarse → <strong>Sediment → Decant</strong><br />
                    • Fine → <strong>Filtration (cloth/filter paper)</strong>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">6</span>
                  <div>
                    <strong>Two immiscible liquids (oil–water)?</strong> → <strong>Decantation</strong> (let layers form, pour upper).
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">7</span>
                  <div>
                    <strong>Solid dissolved in liquid (salt in water)?</strong> → <strong>Evaporation</strong> → recover the <strong>solid</strong>.
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* Concept + Classroom Mini-Labs */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <TestTube className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Concept + Classroom Mini-Labs
            </h2>
            
            {/* Handpicking */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#1A3D7C] mb-4 flex items-center">
                <Eye className="w-6 h-6 mr-3 text-[#2BAE66]" />
                A) Handpicking
              </h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    <strong>Idea:</strong> Works when the <strong>unwanted fraction is small</strong> and <strong>visibly different</strong>.
                  </p>
                  <div className="bg-[#FFC857]/10 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Try:</strong> Close your eyes and pick stones from grains—notice how <strong>sight</strong> helps this method.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Threshing → Winnowing */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#1A3D7C] mb-4 flex items-center">
                <Wind className="w-6 h-6 mr-3 text-[#2BAE66]" />
                B) Threshing → Winnowing
              </h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    <strong>Threshing:</strong> Beat dry stalks → grains <strong>separate</strong>.
                  </p>
                  <p className="text-gray-700">
                    <strong>Winnowing:</strong> In wind/air, <strong>light</strong> husk blows farther; <strong>heavy</strong> grains fall close.
                  </p>
                  <div className="bg-[#FFC857]/10 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Home demo:</strong> Rub <strong>roasted peanuts</strong> between palms → blow gently → <strong>skins fly off</strong>, nuts fall near you.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sieving */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#1A3D7C] mb-4 flex items-center">
                <Filter className="w-6 h-6 mr-3 text-[#2BAE66]" />
                C) Sieving
              </h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    <strong>Mesh size</strong> matters: if holes are <strong>too big</strong>, unwanted pieces pass through; if <strong>too small</strong>, useful flour is lost.
                  </p>
                  <div className="bg-[#FFC857]/10 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Try:</strong> Compare different sieves; note that <strong>all holes are equal</strong> within one sieve, but sieves can have <strong>different</strong> mesh sizes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sedimentation → Decantation */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#1A3D7C] mb-4 flex items-center">
                <Droplets className="w-6 h-6 mr-3 text-[#2BAE66]" />
                D) Sedimentation → Decantation
              </h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    <strong>Settle</strong> heavy solids; <strong>tilt</strong> and pour clear liquid slowly.
                  </p>
                  <div className="bg-[#FFC857]/10 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Demo:</strong> Make tea, <strong>let leaves settle</strong>, pour into cup; or leave <strong>oil–water</strong> to form layers, then pour the top layer.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filtration */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#1A3D7C] mb-4 flex items-center">
                <Filter className="w-6 h-6 mr-3 text-[#2BAE66]" />
                E) Filtration
              </h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    <strong>Filters:</strong> multi-layer cloth, cotton, sand, <strong>filter paper</strong> (fine pores).
                  </p>
                  <p className="text-gray-700">
                    <strong>Lab setup:</strong> Fold <strong>filter paper cone</strong>, place in <strong>funnel</strong>, collect <strong>filtrate</strong> in flask; <strong>residue</strong> stays on paper.
                  </p>
                  <div className="bg-[#FFC857]/10 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Everyday link:</strong> <strong>Fishing nets</strong> act like large meshes—<strong>water passes, fish stay</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Evaporation */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#1A3D7C] mb-4 flex items-center">
                <Thermometer className="w-6 h-6 mr-3 text-[#2BAE66]" />
                F) Evaporation (getting the solid back)
              </h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    <strong>Salt pans:</strong> Shallow seawater ponds under <strong>sun & wind</strong> → water <strong>evaporates</strong>, <strong>salt</strong> remains; later <strong>purified</strong>.
                  </p>
                  <div className="bg-[#FFC857]/10 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Activity:</strong> Drop salt solution on dark paper → after drying, <strong>white salt patches</strong> appear; heat in <strong>china dish</strong> to speed up.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Churning */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#1A3D7C] mb-4 flex items-center">
                <Zap className="w-6 h-6 mr-3 text-[#2BAE66]" />
                G) Churning (butter from curd)
              </h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    <strong>Whisk/Mathni:</strong> <strong>Lighter butter</strong> floats; <strong>buttermilk</strong> remains.
                  </p>
                  <div className="bg-[#FFC857]/10 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Question:</strong> What kitchen appliance today replaces the mathni?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Magnetic Separation */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#1A3D7C] mb-4 flex items-center">
                <Magnet className="w-6 h-6 mr-3 text-[#2BAE66]" />
                H) Magnetic Separation
              </h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Move a <strong>magnet</strong> through sawdust mixed with <strong>iron nails</strong> → nails <strong>stick</strong> to magnet.
                  </p>
                  <div className="bg-[#FFC857]/10 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Industry:</strong> Magnets on cranes pull out scrap <strong>iron</strong> from mixed waste for <strong>recycling</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Science + Society Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Star className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Science + Society (Eco & Health Angles)
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Water safety:</h4>
                  <p className="text-gray-700">
                    Simple cloth/charcoal/sand <strong>filters</strong> improve clarity, but <strong>do not</strong> remove <strong>dissolved salts</strong>; <strong>boiling</strong> makes water microbiologically safer.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Plastic in rivers/oceans:</h4>
                  <p className="text-gray-700">
                    Nets catch trash too—reduce <strong>plastic pollution at source</strong>.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Value of recycling:</h4>
                  <p className="text-gray-700">
                    <strong>Magnetic separation</strong> helps recover iron for <strong>reuse</strong>.
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
                    <p>You have a mix of <strong>iron nails, sawdust, sand, stones, black pepper, salt, and water</strong>. Plan the <strong>sequence</strong> of methods to separate everything. Justify each step.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">2</span>
                  <div>
                    <p>Why is <strong>winnowing</strong> possible only in <strong>moving air</strong>? Predict what changes on a <strong>still day</strong>.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">3</span>
                  <div>
                    <p>Explain why <strong>filtration</strong> removes mud from water but <strong>not salt</strong>. Which method would you use for salt water? Why?</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">4</span>
                  <div>
                    <p><strong>Sieving</strong> failed to clean flour at home. List <strong>three likely causes</strong> and fixes.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">5</span>
                  <div>
                    <p>Compare <strong>sedimentation–decantation</strong> with <strong>filtration</strong> for muddy water—when would you choose each?</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* Visual Prompts Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Eye className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Visual Prompts to Add to Your Notes
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Winnowing diagram:</strong> farmer + <strong>soop</strong>, arrows showing <strong>wind</strong>, <strong>light husk</strong> carried farther than <strong>grains</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Sieving close-up:</strong> sieve mesh vs particle sizes (bran stays, flour passes).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Filtration setup:</strong> folded <strong>filter paper cone</strong> in funnel → <strong>residue</strong>/<strong>filtrate</strong> labels.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Evaporation:</strong> <strong>china dish</strong> on wire gauze; water boiling off; <strong>salt left</strong> behind.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Churning:</strong> butter floating; buttermilk below.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Magnetic separation:</strong> nails sticking to a magnet from sawdust.</span>
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
                  <span><strong>Choose the method by property:</strong> size → <strong>handpick/sieve</strong>; heaviness in air → <strong>winnow</strong>; settling → <strong>sediment/decant</strong>; fine insolubles → <strong>filter</strong>; dissolved solid → <strong>evaporate</strong>; magnetism → <strong>magnet</strong>; butter vs buttermilk → <strong>churn</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Methods often work <strong>in sequence</strong> (e.g., <strong>threshing → winnowing</strong>).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Know the limits</strong> (filters don't remove dissolved salts; evaporation loses water).</span>
                </li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Help Understanding Separation Methods?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Our expert mentors can help you master separation techniques with hands-on experiments and real-world applications.
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
