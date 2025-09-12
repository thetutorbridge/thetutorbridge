import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, User, Mail, Apple, Home, GraduationCap, Beaker, Zap, Target, Lightbulb, CheckCircle, TestTube, Scale, Droplets } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Class 6 Science Chapter 3 Notes – Mindful Eating: A Path to a Healthy Body',
  description: 'Get easy and detailed notes for Class 6 Science Chapter 3 – Mindful Eating: A Path to a Healthy Body. Covers nutrients, balanced diet, food tests, mindful eating tips, food miles, and exam-ready key points with daily life examples.',
};

export default function Chapter3Page() {
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
            <span className="text-gray-600">Chapter 3 - Mindful Eating: A Path to a Healthy Body</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Apple className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              Chapter 3: Mindful Eating: A Path to a Healthy Body
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover the science of nutrition, learn about different nutrients, and understand how to make healthy food choices for a balanced diet.
          </p>
          <div className="bg-white/10 p-4 rounded-xl mb-8">
            <p className="text-lg italic">"Health is the ultimate wealth" — and food is how we build it.<br />
            How do we choose the right foods for our body? → <strong>By understanding nutrients and mindful eating!</strong></p>
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
                <Zap className="w-6 h-6 mr-3 text-[#FFC857]" />
                Big Ideas of the Chapter
              </h2>
              <div className="space-y-4 text-lg">
                <p><strong>Food gives life:</strong> every meal fuels growth, repair, and protection.</p>
                <p><strong>Diversity in food</strong> comes from local crops, climate, culture, and traditions.</p>
                <p><strong>Nutrients</strong> = carbohydrates, proteins, fats, vitamins, minerals; plus <strong>roughage (fibre)</strong> and <strong>water</strong>.</p>
                <p><strong>Mindful eating</strong> = choose balanced, seasonal, locally grown food; avoid waste; respect food miles.</p>
              </div>
              <div className="mt-6 p-4 bg-[#FFC857]/10 rounded-lg">
                <p className="text-lg italic">🧠 <strong>Memory Hook:</strong> "Energy–Build–Protect" → <strong>Energy:</strong> Carbohydrates & Fats | <strong>Build/Repair:</strong> Proteins | <strong>Protect/Regulate:</strong> Vitamins & Minerals | <strong>Assist:</strong> Fibre & Water</p>
              </div>
            </div>
          </section>

          {/* What Do We Eat Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Apple className="w-8 h-8 mr-3 text-[#2BAE66]" />
              What Do We Eat? Why So Different Across India?
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700 mb-4">Your plate varies from your friend's because <strong>states grow different crops</strong> (soil & climate), and <strong>people follow different culinary traditions</strong>.</p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">Punjab</h4>
                  <p className="text-sm text-orange-700">wheat, maize → roti, saag</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">Karnataka</h4>
                  <p className="text-sm text-orange-700">rice, ragi → idli/dosa/ragi mudde</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">Manipur</h4>
                  <p className="text-sm text-orange-700">rice, bamboo shoots → eromba, singju</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-[#FFC857]/10 rounded-lg">
                <p className="text-lg italic">💡 <strong>Learning Trick – "GROW = GRowing, lOcal, Weather"</strong> Food patterns depend on Growing crops, lOcal culture, and Weather.</p>
              </div>
            </div>
          </section>

          {/* Cooking Practices Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <TestTube className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Cooking Practices: Then vs Now
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Then</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>chulha</strong></li>
                    <li>• <strong>sil-batta</strong></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Now</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• gas/electric stoves</li>
                    <li>• mixers/grinders</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Why the change?</h3>
                <p className="text-gray-700 mb-4">Technology, transport, communication, convenience, and safety.</p>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-green-800"><strong>Mindful tip:</strong> Modern tools save time; <strong>traditional methods</strong> can enhance taste & keep nutrients (e.g., slow cooking, stone-grinding).</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800">🧪 <strong>Nutrient Care:</strong> Over-boiling can reduce <strong>Vitamin C</strong>; wash produce first, <em>then</em> cut; include some <strong>raw salads</strong> for vitamin retention.</p>
              </div>
            </div>
          </section>

          {/* Components of Food Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Scale className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Components of Food
            </h2>
            
            {/* Carbohydrates */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">A) Carbohydrates → Energy-giving</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 mb-3"><strong>Examples:</strong> rice, wheat, maize, potato, sweet potato, banana, sugar.</p>
                  <p className="text-gray-700 mb-3"><strong>Daily life:</strong> Runners sip <strong>glucose water</strong> for quick energy.</p>
                  <p className="text-gray-700"><strong>Quick test (Starch):</strong> Add <strong>iodine</strong> to food → <strong>blue-black</strong> = starch present.</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800">🧠 <strong>Mnemonic:</strong> "Carbo = Charge & Go."</p>
                </div>
              </div>
            </div>

            {/* Fats */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">B) Fats → Stored energy + warmth</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 mb-3"><strong>Plant fats:</strong> groundnut, coconut, sesame, sunflower, mustard oils; nuts & seeds.</p>
                  <p className="text-gray-700 mb-3"><strong>Animal fats:</strong> ghee, butter, cream, some meats.</p>
                  <p className="text-gray-700 mb-3"><strong>Daily life:</strong> <strong>Winter laddoos</strong> use ghee & nuts to keep warm.</p>
                  <p className="text-gray-700"><strong>Quick test (Fat):</strong> Press food in paper → <strong>oily translucent patch</strong> = fat present.</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800">🧠 <strong>Mnemonic:</strong> "Fat pads the body & packs energy."</p>
                </div>
              </div>
            </div>

            {/* Proteins */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">C) Proteins → Body-building & repair</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 mb-3"><strong>Plant sources:</strong> pulses (moong, chana, rajma), soy/peas, nuts.</p>
                  <p className="text-gray-700 mb-3"><strong>Animal sources:</strong> milk & paneer, eggs, fish, chicken.</p>
                  <p className="text-gray-700 mb-3"><strong>Daily life:</strong> Sportspersons increase <strong>protein</strong> for muscles.</p>
                  <p className="text-gray-700"><strong>Quick test (Protein):</strong> In test tube add food paste + water + <strong>CuSO₄</strong> (few drops) + <strong>NaOH</strong> (10 drops) → <strong>violet</strong> = protein present.</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800">🧠 <strong>Mnemonic:</strong> "Pro-teins = Pro-repair."</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">🔒 <strong>Safety:</strong> Teacher demo; chemicals handled with care.</p>
              </div>
            </div>

            {/* Vitamins & Minerals */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">D) Vitamins & Minerals → Protective nutrients</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="text-blue-800"><strong>Vitamin A</strong> (eyes/skin): papaya, carrot, mango, milk → lack → <strong>night blindness</strong></p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="text-blue-800"><strong>Vitamin B₁</strong> (heart/nerve support): whole grains, legumes, nuts → lack → <strong>beri-beri</strong></p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="text-blue-800"><strong>Vitamin C</strong> (immunity/healing): amla, guava, citrus → lack → <strong>scurvy</strong></p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="text-blue-800"><strong>Vitamin D</strong> (helps absorb Ca): sunlight, eggs, butter, fish → lack → <strong>rickets</strong></p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <p className="text-green-800"><strong>Calcium</strong> (bones/teeth): milk/curd/paneer → lack → weak bones/teeth</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <p className="text-green-800"><strong>Iodine</strong> (thyroid function): <strong>iodised salt</strong>, seaweed → lack → <strong>goitre</strong></p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <p className="text-green-800"><strong>Iron</strong> (blood/haemoglobin): green leafy veggies, beetroot → lack → <strong>anaemia</strong></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-[#FFC857]/10 rounded-lg">
                <p className="text-lg italic">🧠 <strong>Mnemonic:</strong> "All Bodies Cure Damage; Ca, I, Fe keep you fine."</p>
              </div>
            </div>

            {/* Fibre & Water */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">E) Fibre (Roughage) & Water → Digestion & transport</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 mb-3"><strong>Fibre:</strong> whole grains, pulses, fruits/veggies, nuts → eases bowel movement, prevents constipation.</p>
                  <p className="text-gray-700"><strong>Water:</strong> carries nutrients, removes waste (sweat/urine).</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-800"><strong>Daily life:</strong> Low fibre + low water → stomach ache/constipation.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Testing Food Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <TestTube className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Testing Food in Class (Step-by-step)
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Starch Test</h3>
                <ol className="space-y-2 text-gray-700">
                  <li>1. Small piece of food on plate</li>
                  <li>2. Add 2–3 drops <strong>iodine</strong></li>
                  <li><strong>Blue-black = starch present</strong></li>
                </ol>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Fat Test</h3>
                <ol className="space-y-2 text-gray-700">
                  <li>1. Press food in clean paper; dry if watery</li>
                  <li>2. Hold to light</li>
                  <li><strong>Translucent oily patch = fat present</strong></li>
                </ol>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Protein Test</h3>
                <ol className="space-y-2 text-gray-700">
                  <li>1. Food paste + water in test tube</li>
                  <li>2. Add <strong>CuSO₄ (2 drops)</strong></li>
                  <li>3. Add <strong>NaOH (10 drops)</strong>, shake, wait</li>
                  <li><strong>Violet = protein present</strong></li>
                </ol>
              </div>
            </div>
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">🔒 <strong>Lab Safety:</strong> Don't touch/taste chemicals; wash spills immediately; follow teacher instructions.</p>
            </div>
          </section>

          {/* Balanced Diet Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Target className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Balanced Diet
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700 mb-6"><strong>Definition:</strong> Right amounts of <strong>all nutrients + fibre + water</strong>.</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Plate Trick (½–¼–¼ Method)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>½ plate</strong> fruits & veggies</li>
                    <li><strong>¼ plate</strong> proteins (dal/eggs/paneer/chana)</li>
                    <li><strong>¼ plate</strong> whole grains (roti/rice/millets)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Smart Rules</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Rainbow Rule:</strong> Eat <strong>5 colours/day</strong></li>
                    <li><strong>Smart Swap:</strong> Chips → roasted chana</li>
                    <li><strong>Label Sense:</strong> More protein/fibre, less sugar/fat</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Millets Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Droplets className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Millets = "Nutri-cereals"
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 mb-4"><strong>Examples:</strong> jowar, bajra, ragi, sanwa (barnyard)</p>
                  <p className="text-gray-700 mb-4"><strong>Benefits:</strong> rich in <strong>iron, calcium, vitamins, fibre</strong>; grow well in varied climates; support farmers; great for balanced diets.</p>
                  <p className="text-gray-700"><strong>Easy Adds:</strong> ragi dosa, bajra roti, jowar upma, millet laddoos.</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-green-800">🧠 <strong>Mnemonic:</strong> "Small grains, mighty gains."</p>
                </div>
              </div>
            </div>
          </section>

          {/* Food Miles Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Food Miles & Respecting Food
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700 mb-4"><strong>Food miles</strong> = distance from <strong>farm → plate</strong> (grow, harvest, store, transport, mill/pack, retail, home).</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Reduce miles</h3>
                  <p className="text-gray-700">choose <strong>local & seasonal</strong> → fresher, cheaper, less pollution, supports farmers.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">No waste</h3>
                  <p className="text-gray-700">take only what you can eat; reuse leftovers smartly.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Mindful Eating Habits Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <CheckCircle className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Mindful Eating Habits
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-3 text-gray-700">
                    <li>Eat <strong>seasonal</strong> (ritu-friendly), <strong>moderate</strong> (not too much), <strong>wholesome</strong></li>
                    <li>Eat <strong>slowly</strong>, chew well; drink enough <strong>water</strong></li>
                    <li>Add <strong>raw salads</strong> daily for vitamin C; don't over-cook</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-3 text-gray-700">
                    <li>Prefer <strong>home-cooked</strong> over ultra-processed; read labels</li>
                    <li>Practice <strong>gratitude</strong> for food; avoid plate waste</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* HOTS Questions Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Target className="w-8 h-8 mr-3 text-[#2BAE66]" />
              HOTS / Exam-Style Prompts
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <ol className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">1</span>
                  <span>Why are chips called "junk food" while roasted chana isn't? Compare nutrition.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">2</span>
                  <span>Explain how <strong>Vitamin D</strong> and <strong>Calcium</strong> work together for healthy bones.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">3</span>
                  <span>A student often skips breakfast and feels tired by noon—diagnose and advise.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">4</span>
                  <span>Plan a <strong>balanced lunch</strong> using <strong>local & seasonal</strong> items from your region.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">5</span>
                  <span>Suggest a classroom experiment to test <strong>starch</strong> in 5 foods and tabulate results.</span>
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
                <li>Nutrients: <strong>Carbs & Fats (energy)</strong>, <strong>Proteins (build/repair)</strong>, <strong>Vitamins & Minerals (protect/operate)</strong>, plus <strong>Fibre & Water</strong></li>
                <li><strong>Tests:</strong> Iodine → starch; Oily patch → fat; CuSO₄ + NaOH → protein</li>
                <li><strong>Balanced diet</strong> changes with age/activity; avoid <strong>junk</strong>; choose <strong>millets</strong></li>
                <li><strong>Food miles</strong> matter; <strong>local + seasonal</strong> = healthy body & healthy planet</li>
              </ul>
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
                <Link href="/book-demo-class" className="block text-white/80 hover:text-[#FFC857] transition-colors">Book Demo</Link>
              </div>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-poppins font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Mail className="w-5 h-5 text-[#FFC857]" />
                  <span className="text-white/80">+91 9310096171</span>
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