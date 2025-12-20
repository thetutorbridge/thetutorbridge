import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, User, Mail, Leaf, Home, GraduationCap, Beaker, TreePine, Fish, Bird, Bug, Zap, Target, Lightbulb, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Class 6 Science Chapter 2 Notes – Diversity in the Living World (Easy & Conceptual)',
  description: 'Download Class 6 Science Chapter 2 notes – Diversity in the Living World. Clear explanations, grouping of plants and animals, adaptations, habitats, daily life examples, and fun learning tricks to make science engaging for students.',
};

export default function Chapter2Page() {
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
              <span className="hidden sm:inline">Chapter 2 - Diversity in the Living World</span>
              <span className="sm:hidden">Ch 2</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Leaf className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              Chapter 2: Diversity in the Living World
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover the amazing variety of plants and animals around us. Learn how to group them, understand their adaptations, and explore different habitats.
          </p>
          <div className="bg-white/10 p-4 rounded-xl mb-8">
            <p className="text-lg italic">A walk in the park reveals countless different plants and animals.<br />
            How do scientists organize this incredible variety? → <strong>Through classification and grouping!</strong></p>
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

          {/* Introduction Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-3 text-[#FFC857]" />
                Introduction
              </h2>
              <div className="space-y-4 text-lg">
                <p>Nature is full of variety: <strong>plants, animals, sounds, smells, movements</strong>.</p>
                <p>Every bird has a <strong>unique chirp</strong>, every plant has different leaves, stems, and flowers.</p>
                <p>This variety is called <strong>Biodiversity</strong>.</p>
                <p>We must <strong>observe without disturbing</strong> nature — respect living beings.</p>
              </div>
              <div className="mt-6 p-4 bg-[#FFC857]/10 rounded-lg">
                <p className="text-lg italic">💡 <strong>Learning Trick:</strong> Think of biodiversity as a <strong>"nature's festival"</strong> — everything is different but connected.</p>
              </div>
            </div>
          </section>

          {/* Diversity in Plants and Animals Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <TreePine className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Diversity in Plants and Animals Around Us
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">🌿 Plants</h3>
                  <p className="text-gray-700 mb-4">Plants differ in:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Stems:</strong> hard/soft</li>
                    <li><strong>Leaves:</strong> shape, arrangement</li>
                    <li><strong>Flowers:</strong> colour, smell</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">🐾 Animals</h3>
                  <p className="text-gray-700 mb-4">Animals differ in:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Habitat:</strong> land, water, both</li>
                    <li><strong>Food:</strong> herbivore, carnivore, omnivore</li>
                    <li><strong>Movement:</strong> walk, crawl, swim, fly</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Example Tables Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Target className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Example Tables
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Plants Table */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">📋 Plants Examples</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-3 py-2 text-left">Plant</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Stem</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Leaves</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Flower</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2">Grass</td>
                        <td className="border border-gray-300 px-3 py-2">Soft</td>
                        <td className="border border-gray-300 px-3 py-2">Single, alternate</td>
                        <td className="border border-gray-300 px-3 py-2">Green</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2">Tulsi 🌿</td>
                        <td className="border border-gray-300 px-3 py-2">Hard</td>
                        <td className="border border-gray-300 px-3 py-2">Opposite pairs</td>
                        <td className="border border-gray-300 px-3 py-2">Purple</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2">Neem 🌳</td>
                        <td className="border border-gray-300 px-3 py-2">Hard, thick</td>
                        <td className="border border-gray-300 px-3 py-2">Smooth surface</td>
                        <td className="border border-gray-300 px-3 py-2">Small white</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Animals Table */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">📋 Animals Examples</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-3 py-2 text-left">Animal</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Habitat</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Food</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Movement</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2">Crow 🐦</td>
                        <td className="border border-gray-300 px-3 py-2">Trees</td>
                        <td className="border border-gray-300 px-3 py-2">Insects</td>
                        <td className="border border-gray-300 px-3 py-2">Fly & walk</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2">Ant 🐜</td>
                        <td className="border border-gray-300 px-3 py-2">Soil</td>
                        <td className="border border-gray-300 px-3 py-2">Leaves, seeds</td>
                        <td className="border border-gray-300 px-3 py-2">Crawl</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2">Fish 🐟</td>
                        <td className="border border-gray-300 px-3 py-2">Water</td>
                        <td className="border border-gray-300 px-3 py-2">Insects/plants</td>
                        <td className="border border-gray-300 px-3 py-2">Swim</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Grouping Plants Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <TreePine className="w-8 h-8 mr-3 text-[#2BAE66]" />
              How to Group Plants and Animals?
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Why Group?</h3>
              <p className="text-gray-700 mb-6">Makes study easier by <strong>finding similarities & differences</strong>. Like arranging books by subject.</p>
              
              <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Grouping Plants</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">1. Herbs 🌱</h4>
                  <p className="text-sm text-green-700">Short, soft stems (tomato)</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">2. Shrubs 🌹</h4>
                  <p className="text-sm text-green-700">Medium height, woody stems branching near ground (rose)</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">3. Trees 🌳</h4>
                  <p className="text-sm text-green-700">Tall, hard thick stems, branches high (mango)</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">4. Climbers 🍇</h4>
                  <p className="text-sm text-green-700">Need support (grapevine)</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">5. Creepers 🎃</h4>
                  <p className="text-sm text-green-700">Spread on ground (pumpkin)</p>
                </div>
              </div>
            </div>
          </section>

          {/* Grouping by Leaves and Roots Section */}
          <section className="mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Grouping by Leaves (Venation)</h3>
                <ul className="space-y-3 text-gray-700">
                  <li><strong>Reticulate venation</strong> – net-like veins (hibiscus, mustard)</li>
                  <li><strong>Parallel venation</strong> – veins run parallel (banana, grass)</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Grouping by Roots</h3>
                <ul className="space-y-3 text-gray-700">
                  <li><strong>Taproot</strong> – one main root + side roots (mustard, hibiscus)</li>
                  <li><strong>Fibrous roots</strong> – bunch of thin roots (wheat, grass)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Grouping by Seeds Section */}
          <section className="mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Grouping by Seeds</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Dicots</h4>
                  <p className="text-sm text-blue-700">2 cotyledons, reticulate venation, taproots (chickpea)</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Monocots</h4>
                  <p className="text-sm text-blue-700">1 cotyledon, parallel venation, fibrous roots (maize)</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-[#FFC857]/10 rounded-lg">
                <p className="text-lg italic">💡 <strong>Memory Trick:</strong> <strong>Di = Two = Dicots</strong> | <strong>Mono = One = Monocots</strong></p>
              </div>
            </div>
          </section>

          {/* Grouping Animals Section */}
          <section className="mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Grouping Animals</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">By Movement</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>Walk (goat)</li>
                    <li>Crawl (ant)</li>
                    <li>Swim (fish)</li>
                    <li>Fly (pigeon)</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">By Habitat</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>Land (camel)</li>
                    <li>Water (whale)</li>
                    <li>Both (frog)</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">By Food</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>Herbivores</li>
                    <li>Carnivores</li>
                    <li>Omnivores</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Habitats and Adaptations Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Fish className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Plants and Animals in Different Surroundings
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Habitats</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Terrestrial (land)</h4>
                  <p className="text-sm text-green-700">forests, deserts, grasslands, mountains</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Aquatic (water)</h4>
                  <p className="text-sm text-blue-700">rivers, ponds, oceans</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">Amphibians</h4>
                  <p className="text-sm text-purple-700">live in both (frogs)</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Adaptations</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#1A3D7C] mb-3">Plant Adaptations</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Desert cactus:</strong> fleshy stem stores water 🌵</li>
                    <li><strong>Mountain deodar tree:</strong> cone shape lets snow slide ❄️</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A3D7C] mb-3">Animal Adaptations</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Hot desert camel:</strong> long legs, one hump, wide hooves 🐪</li>
                    <li><strong>Cold desert camel:</strong> two humps, thick hair 🐫</li>
                    <li><strong>Whales & fish:</strong> streamlined body for swimming 🐋🐟</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-[#FFC857]/10 rounded-lg">
                <p className="text-lg italic">💡 <strong>Learning Trick:</strong> "HASA → Habitat, Adaptation, Survival, Adjustment" – these four always go together.</p>
              </div>
            </div>
          </section>

          {/* Key Words Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Key Words
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong>Biodiversity</strong> – variety of life
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong>Grouping</strong> – arranging by similarities/differences
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong>Herbs, Shrubs, Trees</strong> – plant categories
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong>Venation</strong> – leaf vein pattern
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong>Taproot/Fibrous root</strong> – root systems
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong>Dicot/Monocot</strong> – seed types
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong>Adaptation</strong> – survival feature
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong>Habitat</strong> – natural home
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong>Terrestrial/Aquatic/Amphibian</strong> – types of habitats
                </div>
              </div>
            </div>
          </section>

          {/* HOTS Questions Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Target className="w-8 h-8 mr-3 text-[#2BAE66]" />
              HOTS (Higher Order Thinking Skills)
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <ol className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">1</span>
                  <span>Why do desert plants have thick stems?</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">2</span>
                  <span>How are dicot plants different from monocot plants?</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">3</span>
                  <span>Why do animals living in water have streamlined bodies?</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">4</span>
                  <span>Why is grouping of plants and animals important?</span>
                </li>
              </ol>
            </div>
          </section>

          {/* Quick Recap Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <CheckCircle className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Quick Recap
            </h2>
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <ul className="space-y-3 text-lg">
                <li>Biodiversity = variety in plants & animals</li>
                <li>Plants grouped by <strong>stem, leaves, roots, seeds</strong></li>
                <li>Animals grouped by <strong>movement, food, habitat</strong></li>
                <li>Adaptations help survival in different surroundings</li>
                <li>Habitat = natural home providing food, water, shelter</li>
                <li>Protecting biodiversity = protecting life on Earth</li>
              </ul>
              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <p className="text-lg italic">✍️ <strong>Memory Hook:</strong> "Plants show variety in stem, leaves, roots, seeds. Animals show variety in food, movement, habitats. All show adaptations for survival."</p>
              </div>
            </div>
          </section>

        </div>
      </main>

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
                  <Mail className="w-5 h-5 text-[#FFC857]" />
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
