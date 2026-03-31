import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { ComprehensiveFooter } from "@/components/comprehensive-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronRight,
  Brain,
  Gamepad2,
  Timer,
  Target,
  Sparkles,
  Clock,
  Zap,
  Trophy
} from "lucide-react"

export const metadata: Metadata = {
  title: "Brain Games - Fun Learning Games | The Tutor Bridge",
  description: "Free interactive brain games for learning. Practice times tables, memory, typing speed, and more. Make learning fun with The Tutor Bridge brain games!",
  keywords: [
    "brain games",
    "educational games",
    "math games",
    "memory games",
    "typing games",
    "learning games",
    "interactive games",
    "free brain games",
    "times tables game",
    "multiplication practice"
  ],
  alternates: {
    canonical: "https://www.thetutorbridge.com/brain-games",
  },
  openGraph: {
    title: "Brain Games - Fun Learning Games",
    description: "Free interactive brain games for learning and practice. Start playing now!",
    url: "https://www.thetutorbridge.com/brain-games",
    siteName: "The Tutor Bridge",
    type: "website",
  }
}

export default function BrainGames() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden font-merriweather">
      <div className="fixed inset-0 -z-10 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A3D7C]/5 via-[#2BAE66]/5 to-[#FFC857]/10" />
      </div>

      <Navigation />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 py-3">
            <nav className="flex items-center text-sm text-gray-600">
              <Link href="/" className="hover:text-[#1A3D7C]">Home</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-[#1A3D7C] font-medium">Brain Games</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-20 sm:py-32 bg-gradient-to-br from-[#2BAE66] to-[#1A3D7C] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                New Games Available!
              </div>

              <div className="mb-8 flex justify-center">
                <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                  <Gamepad2 className="w-16 h-16 text-white" />
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-bold leading-tight mb-6">
                Brain Games<br />
                <span className="text-[#FFC857]">Make Learning Fun!</span>
              </h1>

              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                Play interactive games that make learning exciting. Practice mental math, boost memory, improve typing speed, and more!
              </p>

              <Link href="/brain-games/times-table-speed-test">
                <Button size="lg" className="bg-[#FFC857] text-[#1A3D7C] hover:bg-[#FFC857]/90 rounded-xl px-8 py-6 text-lg font-semibold">
                  <Trophy className="w-5 h-5 mr-2" />
                  Play Times Tables Challenge
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Available Games Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                Available Games
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Start playing now or see what's coming soon!
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Times Tables Challenge - AVAILABLE */}
              <Link href="/brain-games/times-table-speed-test">
                <Card className="p-6 hover:shadow-xl transition-all border-2 border-[#2BAE66] relative cursor-pointer group">
                  <div className="absolute top-4 right-4 bg-[#2BAE66] text-white text-xs font-bold px-3 py-1 rounded-full">
                    PLAY NOW
                  </div>
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Target className="w-8 h-8 text-[#1A3D7C]" />
                    </div>
                    <h3 className="font-poppins font-bold text-xl text-[#1A3D7C] mb-2">Times Tables Challenge</h3>
                    <p className="text-gray-600">Master multiplication with speed tests and challenges. Track your progress and improve your speed.</p>
                  </CardContent>
                </Card>
              </Link>

              {/* Coming Soon Games */}
              {[
                {
                  icon: Brain,
                  title: "Memory Games",
                  description: "Boost your memory with card matching, sequence memorization, and pattern recognition games.",
                  color: "bg-purple-50",
                  iconColor: "text-purple-600"
                },
                {
                  icon: Timer,
                  title: "Typing Speed Test",
                  description: "Improve your typing speed and accuracy with timed challenges. Perfect for students and professionals.",
                  color: "bg-green-50",
                  iconColor: "text-[#2BAE66]"
                },
                {
                  icon: Zap,
                  title: "Quick Math",
                  description: "Sharpen mental math skills with rapid-fire addition, subtraction, multiplication, and division.",
                  color: "bg-yellow-50",
                  iconColor: "text-[#FFC857]"
                },
                {
                  icon: Trophy,
                  title: "Logic Puzzles",
                  description: "Challenge your problem-solving with pattern recognition, sequences, and logic problems.",
                  color: "bg-red-50",
                  iconColor: "text-red-600"
                },
                {
                  icon: Sparkles,
                  title: "Word Games",
                  description: "Build vocabulary and spelling skills with word searches, scrambles, and vocabulary challenges.",
                  color: "bg-indigo-50",
                  iconColor: "text-indigo-600"
                }
              ].map((game, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow relative opacity-75">
                  <div className="absolute top-4 right-4 bg-gray-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                    COMING SOON
                  </div>
                  <CardContent className="p-0">
                    <div className={`w-16 h-16 ${game.color} rounded-full flex items-center justify-center mb-4`}>
                      <game.icon className={`w-8 h-8 ${game.iconColor}`} />
                    </div>
                    <h3 className="font-poppins font-bold text-xl text-[#1A3D7C] mb-2">{game.title}</h3>
                    <p className="text-gray-600">{game.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Brain Games Section */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Why Brain Games?
                </h2>
                <p className="text-lg text-gray-700">
                  Learning through play is one of the most effective ways to build skills and retain knowledge.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Make Learning Fun",
                    description: "Turn practice into play. Games make repetitive tasks engaging and enjoyable."
                  },
                  {
                    title: "Instant Feedback",
                    description: "See results immediately. Know what you got right and learn from mistakes instantly."
                  },
                  {
                    title: "Track Progress",
                    description: "Watch yourself improve over time. See your scores increase with each session."
                  },
                  {
                    title: "Build Confidence",
                    description: "Success in games builds confidence in real-world applications. Practice without pressure."
                  }
                ].map((benefit, index) => (
                  <Card key={index} className="p-6 border-l-4 border-[#2BAE66]">
                    <CardContent className="p-0">
                      <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-[#2BAE66]" />
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Meanwhile Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C] mb-6">
                While You Wait...
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Explore our other free learning tools! We have 100+ calculators and 80+ developer tools ready for you right now.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tools">
                  <Button size="lg" className="bg-[#1A3D7C] text-white rounded-xl px-8 py-6 text-lg font-semibold hover:bg-[#1A3D7C]/90">
                    <Gamepad2 className="w-5 h-5 mr-2" />
                    Explore All Tools
                  </Button>
                </Link>
                <Link href="/calculators">
                  <Button size="lg" className="bg-[#2BAE66] text-white rounded-xl px-8 py-6 text-lg font-semibold hover:bg-[#2BAE66]/90">
                    <Target className="w-5 h-5 mr-2" />
                    Browse Calculators
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ComprehensiveFooter />
    </div>
  )
}
