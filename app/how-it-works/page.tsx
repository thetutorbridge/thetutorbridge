import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  ChevronRight,
  Users,
  Target,
  Calendar,
  Shield,
  GraduationCap,
  TrendingUp,
  Award,
  BookOpen,
  FileText,
  Send,
  DollarSign,
  MessageSquare,
  Video,
  ClipboardCheck,
  Sparkles,
  ArrowDown,
  Repeat,
  ThumbsUp
} from "lucide-react"

export const metadata: Metadata = {
  title: "How It Works | Homework Help & Tutoring Process | The Tutor Bridge",
  description: "Learn how The Tutor Bridge homework help and tutoring works. Simple 4-step process: Submit → Quote → Pay → Learn. Get started in minutes.",
  keywords: [
    "how tutoring works",
    "homework help process",
    "online tutoring steps",
    "get homework help",
    "tutoring process",
    "how to get a tutor",
    "tutoring explained"
  ],
  alternates: {
    canonical: "https://www.thetutorbridge.com/how-it-works",
  },
  openGraph: {
    title: "How It Works | Homework Help & Tutoring Process",
    description: "Simple process to get academic help. Submit your homework or book a tutor in minutes.",
    url: "https://www.thetutorbridge.com/how-it-works",
    siteName: "The Tutor Bridge",
    type: "website",
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Get Homework Help from The Tutor Bridge",
  description: "Step-by-step guide to getting homework help or tutoring from The Tutor Bridge",
  step: [
    {
      "@type": "HowToStep",
      name: "Submit Your Homework",
      text: "Upload your assignment, provide details about your deadline and requirements"
    },
    {
      "@type": "HowToStep",
      name: "Receive a Quote",
      text: "Get a custom price quote within 2 hours based on complexity and deadline"
    },
    {
      "@type": "HowToStep",
      name: "Approve & Pay",
      text: "Review the quote, approve it, and make a secure payment"
    },
    {
      "@type": "HowToStep",
      name: "Get Your Solution",
      text: "Receive step-by-step solutions and explanations before your deadline"
    }
  ]
}

export default function HowItWorks() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden font-merriweather">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
              <span className="text-[#1A3D7C] font-medium">How It Works</span>
            </nav>
          </div>
        </div>

        {/* Hero Section - Subtle & Center Aligned */}
        <section className="relative py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] leading-tight mb-4">
                How It Works
              </h1>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Whether you need quick homework help or ongoing tutoring, we've made the process simple. Here's exactly how it works.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/homework-help/submit">
                  <Button size="lg" className="bg-[#1A3D7C] text-white rounded-xl px-8 py-4 font-semibold hover:bg-[#1A3D7C]/90">
                    <FileText className="w-5 h-5 mr-2" />
                    Submit Homework
                  </Button>
                </Link>
                <Link href="/tutoring/free-consultation">
                  <Button size="lg" variant="outline" className="border-2 border-[#1A3D7C] text-[#1A3D7C] rounded-xl px-8 py-4 font-semibold hover:bg-[#1A3D7C] hover:text-white">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Homework Help Process */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-[#1A3D7C] px-4 py-2 rounded-full mb-4">
                <FileText className="w-5 h-5" />
                <span className="text-sm font-semibold">ON-DEMAND HELP</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                How Homework Help Works
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Need help with a specific assignment? Get expert assistance in 4 simple steps.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-4 gap-6 relative">
                {/* Connecting line (desktop only) */}
                <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#1A3D7C] via-[#2BAE66] to-[#FFC857]"></div>

                {[
                  {
                    step: 1,
                    icon: Send,
                    title: "Submit Your Homework",
                    description: "Upload your assignment, photos, or describe the problem. Tell us your deadline and any specific requirements.",
                    color: "bg-blue-100",
                    iconColor: "text-[#1A3D7C]"
                  },
                  {
                    step: 2,
                    icon: DollarSign,
                    title: "Receive a Quote",
                    description: "Within 2 hours, you'll get a custom price quote based on complexity, length, and deadline. No obligation.",
                    color: "bg-green-100",
                    iconColor: "text-[#2BAE66]"
                  },
                  {
                    step: 3,
                    icon: ClipboardCheck,
                    title: "Approve & Pay",
                    description: "Happy with the quote? Approve it and make a secure payment. We start working immediately.",
                    color: "bg-yellow-100",
                    iconColor: "text-[#FFC857]"
                  },
                  {
                    step: 4,
                    icon: BookOpen,
                    title: "Get Your Solution",
                    description: "Receive detailed, step-by-step solutions with explanations you can actually learn from. Ask follow-up questions free.",
                    color: "bg-purple-100",
                    iconColor: "text-purple-600"
                  }
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 relative z-10`}>
                          <item.icon className={`w-8 h-8 ${item.iconColor}`} />
                        </div>
                        <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {item.step}
                        </div>
                        <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </CardContent>
                    </Card>
                    {index < 3 && (
                      <div className="md:hidden flex justify-center my-4">
                        <ArrowDown className="w-6 h-6 text-gray-300" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link href="/homework-help/submit">
                  <Button size="lg" className="bg-[#1A3D7C] hover:bg-[#1A3D7C]/90 px-8 py-6 text-lg font-semibold">
                    <FileText className="w-5 h-5 mr-2" />
                    Submit Your Homework Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="py-12 sm:py-16 bg-[#F8FAFC]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] text-center mb-8">
                Why Our Homework Help Is Different
              </h3>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: BookOpen,
                    title: "Learn, Don't Just Copy",
                    description: "Every solution includes step-by-step explanations so you understand the concepts."
                  },
                  {
                    icon: MessageSquare,
                    title: "Free Follow-Ups",
                    description: "Confused about something? Ask clarifying questions within 24 hours at no extra cost."
                  },
                  {
                    icon: Shield,
                    title: "Quality Guaranteed",
                    description: "Not satisfied? We'll revise it for free or give you a full refund."
                  },
                  {
                    icon: Clock,
                    title: "Meet Your Deadline",
                    description: "We deliver on time, every time. Urgent deadlines welcome."
                  }
                ].map((item, index) => (
                  <Card key={index} className="p-6 text-center">
                    <CardContent className="p-0">
                      <item.icon className="w-10 h-10 text-[#2BAE66] mx-auto mb-3" />
                      <h4 className="font-poppins font-bold text-[#1A3D7C] mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tutoring Process */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-green-100 text-[#2BAE66] px-4 py-2 rounded-full mb-4">
                <GraduationCap className="w-5 h-5" />
                <span className="text-sm font-semibold">ONGOING SUPPORT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                How Tutoring Works
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Ready for consistent improvement? Here's how to get matched with your perfect tutor.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Left side - Steps */}
                <div className="space-y-6">
                  {[
                    {
                      step: 1,
                      title: "Free Consultation",
                      description: "Schedule a free 20-minute video call with our education coordinator. We'll discuss your child's needs, goals, and learning style.",
                      icon: Video,
                      color: "border-[#1A3D7C]"
                    },
                    {
                      step: 2,
                      title: "Tutor Matching",
                      description: "Based on your consultation, we hand-pick a tutor who specializes in your subject and matches your student's personality and learning preferences.",
                      icon: Users,
                      color: "border-[#2BAE66]"
                    },
                    {
                      step: 3,
                      title: "Trial Session",
                      description: "Meet your tutor for an introductory session. See the chemistry, experience the teaching style, and make sure it's the right fit.",
                      icon: Sparkles,
                      color: "border-[#FFC857]"
                    },
                    {
                      step: 4,
                      title: "Regular Sessions Begin",
                      description: "Start your weekly schedule! Same tutor, same time each week. Build momentum and watch the improvement.",
                      icon: Repeat,
                      color: "border-purple-500"
                    }
                  ].map((item, index) => (
                    <div key={index} className={`flex gap-4 p-4 rounded-lg border-l-4 ${item.color} bg-white shadow-sm`}>
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                        <item.icon className="w-6 h-6 text-[#1A3D7C]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-6 h-6 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {item.step}
                          </span>
                          <h3 className="font-poppins font-bold text-[#1A3D7C]">{item.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right side - Benefits */}
                <div className="bg-gradient-to-br from-[#1A3D7C] to-[#1A3D7C]/90 rounded-2xl p-8 text-white">
                  <h3 className="font-poppins font-bold text-2xl mb-6">
                    The Tutoring Difference
                  </h3>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                        <Users className="w-6 h-6 text-[#FFC857]" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Same Tutor Every Week</h4>
                        <p className="text-white/80 text-sm">Build a real relationship with someone who knows your learning style and tracks your progress.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                        <Target className="w-6 h-6 text-[#FFC857]" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Personalized Curriculum</h4>
                        <p className="text-white/80 text-sm">Lessons tailored to your school's curriculum and your specific areas of improvement.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                        <TrendingUp className="w-6 h-6 text-[#FFC857]" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Progress Reports</h4>
                        <p className="text-white/80 text-sm">Regular updates so you can see improvement. Most students boost grades within 4-6 weeks.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                        <ThumbsUp className="w-6 h-6 text-[#FFC857]" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Satisfaction Guaranteed</h4>
                        <p className="text-white/80 text-sm">Not happy with your tutor? We'll rematch you for free. Cancel anytime with no penalties.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link href="/tutoring/free-consultation">
                      <Button size="lg" className="w-full bg-[#FFC857] text-[#1A3D7C] hover:bg-[#FFC857]/90 py-6 text-lg font-semibold">
                        <Calendar className="w-5 h-5 mr-2" />
                        Book Free Consultation
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect in a Session */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                What to Expect in a Tutoring Session
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Every 1-hour session is structured for maximum learning and engagement.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden shadow-lg">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                    {[
                      {
                        time: "First 10 min",
                        title: "Warm-Up & Review",
                        description: "Check homework, review last session, address any questions",
                        color: "bg-blue-50"
                      },
                      {
                        time: "Next 25 min",
                        title: "New Concepts",
                        description: "Learn new material with clear explanations and examples",
                        color: "bg-green-50"
                      },
                      {
                        time: "Next 20 min",
                        title: "Guided Practice",
                        description: "Work through problems together with tutor support",
                        color: "bg-yellow-50"
                      },
                      {
                        time: "Last 5 min",
                        title: "Wrap-Up",
                        description: "Summarize key points, assign practice, preview next session",
                        color: "bg-purple-50"
                      }
                    ].map((item, index) => (
                      <div key={index} className={`p-6 ${item.color}`}>
                        <div className="text-xs font-semibold text-gray-500 mb-1">{item.time}</div>
                        <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Tutors */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                Meet Our Tutors
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Every tutor is carefully vetted to ensure the highest quality instruction.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-[#1A3D7C]" />
                  </div>
                  <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">Qualified Educators</h3>
                  <p className="text-gray-600 text-sm">All tutors have teaching degrees, certifications, or advanced degrees in their subject areas.</p>
                </CardContent>
              </Card>

              <Card className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-[#2BAE66]" />
                  </div>
                  <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">Background Checked</h3>
                  <p className="text-gray-600 text-sm">Every tutor passes a comprehensive background check. Your child's safety is our priority.</p>
                </CardContent>
              </Card>

              <Card className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-[#FFC857]" />
                  </div>
                  <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">Highly Rated</h3>
                  <p className="text-gray-600 text-sm">Our tutors maintain a 4.8+ average rating from families. We only keep the best.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] text-center mb-12">
              Common Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "How quickly can I get homework help?",
                  a: "Most homework help requests receive a quote within 2 hours. Once approved, we typically deliver standard assignments within 24-72 hours, though rush delivery is available for urgent deadlines."
                },
                {
                  q: "How are tutors selected for me?",
                  a: "We match based on subject expertise, teaching style, personality, and availability. During your free consultation, we learn about your child's needs and preferences to find the perfect match."
                },
                {
                  q: "What if my student doesn't like their tutor?",
                  a: "No problem! We offer free tutor rematching. If the chemistry isn't right, just let us know and we'll find a better fit—no questions asked."
                },
                {
                  q: "What technology do I need?",
                  a: "Just a computer, tablet, or phone with a camera and internet connection. We use Zoom for video sessions and a virtual whiteboard for problem-solving. We'll walk you through the setup."
                },
                {
                  q: "Can parents sit in on sessions?",
                  a: "Absolutely! Parents are welcome to observe any session. We also provide regular progress updates and are always available to discuss your child's progress."
                },
                {
                  q: "What's your cancellation policy?",
                  a: "For tutoring, you can reschedule sessions up to 24 hours in advance at no charge. Cancellations with less than 24 hours notice count toward your monthly sessions. You can cancel your subscription anytime."
                }
              ].map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-poppins font-semibold text-[#1A3D7C] mb-2">{faq.q}</h3>
                    <p className="text-gray-700">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/faq" className="text-[#1A3D7C] font-semibold hover:underline">
                View All FAQs →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Choose what works best for you—quick homework help or ongoing tutoring support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/homework-help/submit">
                <Button size="lg" className="bg-white text-[#1A3D7C] rounded-xl px-8 py-6 text-lg font-semibold hover:bg-gray-100">
                  <FileText className="w-5 h-5 mr-2" />
                  Submit Homework
                </Button>
              </Link>
              <Link href="/tutoring/free-consultation">
                <Button size="lg" className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-6 text-lg font-semibold hover:bg-[#FFC857]/90">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
                <span className="text-xl font-bold">The Tutor Bridge</span>
              </div>
              <p className="text-gray-400">Expert homework help and tutoring for grades 6-12.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Homework Help</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/homework-help/math" className="hover:text-white">Math Help</Link></li>
                <li><Link href="/homework-help/science" className="hover:text-white">Science Help</Link></li>
                <li><Link href="/homework-help/english" className="hover:text-white">English Help</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Tutoring</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/tutoring/math" className="hover:text-white">Math Tutoring</Link></li>
                <li><Link href="/tutoring/science" className="hover:text-white">Science Tutoring</Link></li>
                <li><Link href="/tutoring/english" className="hover:text-white">English Tutoring</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} The Tutor Bridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
