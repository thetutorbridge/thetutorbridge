import Link from 'next/link';
import { Home, Clock, Type, Lock, Dices, CaseSensitive, ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const tools = [
  {
    name: 'Timer & Stopwatch',
    slug: 'timer',
    icon: Clock,
    description: 'Free online timer and stopwatch. Perfect for workouts, cooking, studying, and Pomodoro technique. Set custom timers or track time with millisecond precision.',
    color: 'from-blue-500 to-blue-600',
    traffic: '15M+',
    features: ['Countdown Timer', 'Stopwatch', 'Audio Alerts', 'Preset Buttons'],
  },
  {
    name: 'Character Counter',
    slug: 'character-counter',
    icon: Type,
    description: 'Count characters, words, sentences, and paragraphs instantly. Real-time text analysis perfect for essays, social media posts, and content writing.',
    color: 'from-green-500 to-green-600',
    traffic: '3.5M+',
    features: ['Character Count', 'Word Count', 'Reading Time', 'Social Media Limits'],
  },
  {
    name: 'Password Generator',
    slug: 'password-generator',
    icon: Lock,
    description: 'Create strong, secure random passwords instantly. Customize length and character types. 100% secure - generated locally in your browser.',
    color: 'from-purple-500 to-purple-600',
    traffic: '5M+',
    features: ['Secure Passwords', 'Strength Meter', 'Customizable', '100% Private'],
  },
  {
    name: 'Random Number Generator',
    slug: 'random-number-generator',
    icon: Dices,
    description: 'Generate random numbers with custom ranges. Perfect for lottery, dice rolls, games, and statistical sampling. True randomness guaranteed.',
    color: 'from-orange-500 to-orange-600',
    traffic: '3M+',
    features: ['Custom Range', 'Multiple Numbers', 'Quick Presets', 'History Tracking'],
  },
  {
    name: 'Case Converter',
    slug: 'case-converter',
    icon: CaseSensitive,
    description: 'Convert text to uppercase, lowercase, title case, sentence case, and more. 7 conversion types for writers, programmers, and editors.',
    color: 'from-pink-500 to-pink-600',
    traffic: '500k+',
    features: ['7 Case Types', 'Real-time Preview', 'Copy or Apply', 'Instant Results'],
  },
];

export default function ToolsPage() {
  const totalTraffic = '27M+';

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Tools</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-14 h-14 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Free Online Tools
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-600 mb-6">
              Powerful, free tools for students, professionals, and everyday use
            </p>
            <div className="flex justify-center items-center gap-6 flex-wrap">
              <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                {tools.length} Tools Available
              </div>
              <div className="bg-white text-gray-700 px-6 py-3 rounded-full font-bold text-lg shadow-lg border-2 border-gray-300">
                {totalTraffic} Monthly Users
              </div>
            </div>
          </div>

          {/* Features Banner */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-8 h-8 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Lightning Fast</h3>
              </div>
              <p className="text-gray-700">
                All tools run instantly in your browser. No waiting, no delays.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">100% Private</h3>
              </div>
              <p className="text-gray-700">
                Nothing is sent to our servers. Your data stays on your device.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-8 h-8 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900">Always Free</h3>
              </div>
              <p className="text-gray-700">
                No sign-up, no payment, no limits. Use as much as you want.
              </p>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-200 hover:border-[#2BAE66]"
              >
                <div className={`bg-gradient-to-r ${tool.color} p-6 text-white`}>
                  <tool.icon className="w-12 h-12 mb-3" />
                  <h2 className="text-2xl font-bold mb-2">{tool.name}</h2>
                  <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                    {tool.traffic} monthly searches
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {tool.description}
                  </p>

                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">Key Features:</h3>
                    <div className="flex flex-wrap gap-2">
                      {tool.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center text-[#2BAE66] font-bold group-hover:translate-x-2 transition-transform">
                    Try it now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className="mt-16 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-200 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">More Tools Coming Soon!</h2>
            <p className="text-xl text-gray-700 mb-4">
              We're building 50+ more free tools including Age Calculator, Color Picker, Date Calculator, and many more.
            </p>
            <p className="text-gray-600">
              Bookmark this page to stay updated with new tool releases.
            </p>
          </div>

          {/* Why Use Our Tools */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Why Use TheTutorBridge Tools?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-3">For Students</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Character counter for essay word limits</li>
                  <li>• Timer for study sessions and exams</li>
                  <li>• Random number generator for practice problems</li>
                  <li>• Password generator for secure accounts</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2BAE66] mb-3">For Professionals</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Case converter for formatting documents</li>
                  <li>• Character counter for social media posts</li>
                  <li>• Timer for time management (Pomodoro)</li>
                  <li>• Password generator for security</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">For Writers</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Word and character counting</li>
                  <li>• Reading time estimates</li>
                  <li>• Case conversion for formatting</li>
                  <li>• Social media character limits</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-600 mb-3">For Everyone</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 100% free to use, no sign-up required</li>
                  <li>• Works on desktop, tablet, and mobile</li>
                  <li>• No ads or distractions</li>
                  <li>• Privacy-focused - all local processing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
