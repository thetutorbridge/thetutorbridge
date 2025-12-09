import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronRight,
  HelpCircle,
  FileText,
  GraduationCap,
  DollarSign,
  Shield,
  Clock,
  Users,
  Calendar,
  Mail
} from "lucide-react"

export const metadata: Metadata = {
  title: "FAQ | Frequently Asked Questions | The Tutor Bridge",
  description: "Get answers to common questions about The Tutor Bridge homework help and tutoring services. Pricing, process, tutors, scheduling, and more.",
  keywords: [
    "tutoring FAQ",
    "homework help questions",
    "online tutoring FAQ",
    "tutoring questions answered",
    "tutoring help",
    "homework assistance FAQ"
  ],
  alternates: {
    canonical: "https://www.thetutorbridge.com/faq",
  },
  openGraph: {
    title: "FAQ | Frequently Asked Questions",
    description: "Common questions about our homework help and tutoring services answered.",
    url: "https://www.thetutorbridge.com/faq",
    siteName: "The Tutor Bridge",
    type: "website",
  }
}

const faqs = {
  general: {
    title: "General Questions",
    icon: HelpCircle,
    questions: [
      {
        q: "What grades and subjects do you cover?",
        a: "We provide homework help and tutoring for students in grades 6-12 (middle school and high school) in Math, Science, and English. This includes all levels from Pre-Algebra to AP Calculus, General Science to AP Physics/Chemistry/Biology, and basic English to AP Literature."
      },
      {
        q: "Are your tutors qualified?",
        a: "Yes! All our tutors are U.S.-based, certified educators with teaching credentials or advanced degrees in their subject areas. They undergo a rigorous vetting process including background checks, subject assessments, and teaching demonstrations. We maintain a 4.8+ average rating among our tutoring staff."
      },
      {
        q: "What's the difference between homework help and tutoring?",
        a: "Homework help is on-demand, pay-per-task assistance for specific assignments. Tutoring is ongoing, scheduled 1-on-1 sessions with the same tutor each week, designed for long-term improvement and grade boosting. Many families start with homework help and upgrade to tutoring when they see the value."
      },
      {
        q: "How do online sessions work?",
        a: "Sessions are conducted via Zoom video call with screen sharing and an interactive whiteboard. You just need a computer, tablet, or phone with a camera and internet connection. We provide a virtual learning environment that mimics in-person tutoring."
      },
      {
        q: "Is this considered cheating?",
        a: "No. Our homework help provides step-by-step explanations designed to teach concepts, not just provide answers. We follow academic integrity guidelines and our goal is to help students understand material so they can succeed on their own. Tutoring sessions are focused on teaching and skill-building."
      }
    ]
  },
  homeworkHelp: {
    title: "Homework Help",
    icon: FileText,
    questions: [
      {
        q: "How do I submit homework?",
        a: "Simply visit our Submit Homework page, fill out the form with your assignment details, upload any files or photos, set your deadline, and submit. You'll receive a custom quote within 2 hours."
      },
      {
        q: "How long does it take to get help?",
        a: "Quote delivery: Within 2 hours. Standard assignments: 24-72 hours. Rush delivery: 24-48 hours. Urgent requests: Under 24 hours. Actual timelines depend on complexity and are confirmed in your quote."
      },
      {
        q: "What if I'm not satisfied with the work?",
        a: "We offer free revisions if you're not completely satisfied. If we can't resolve the issue, we provide a full refund. Your satisfaction is guaranteed."
      },
      {
        q: "Can I ask follow-up questions?",
        a: "Yes! After receiving your solution, you can ask clarifying questions within 24 hours at no additional cost. We want to make sure you understand the material."
      },
      {
        q: "What subjects and types of assignments do you help with?",
        a: "We help with all Math (algebra through calculus), Science (physics, chemistry, biology, earth science), and English (essays, grammar, literature analysis) assignments. This includes problem sets, essays, lab reports, projects, study guides, and more."
      }
    ]
  },
  tutoring: {
    title: "Tutoring",
    icon: GraduationCap,
    questions: [
      {
        q: "How do I get started with tutoring?",
        a: "Book a free 20-minute consultation through our website. We'll discuss your child's needs, goals, and learning style, then match them with an ideal tutor. After a trial session to ensure good fit, regular weekly sessions begin."
      },
      {
        q: "Will my child have the same tutor each week?",
        a: "Yes! Consistency is key to academic improvement. Your child will work with the same dedicated tutor every session, building a relationship and allowing the tutor to deeply understand their learning style and needs."
      },
      {
        q: "What if my child doesn't click with their tutor?",
        a: "No problem! We offer free tutor rematching. Just let us know within the first few sessions and we'll find a better fit—no questions asked and no extra charge."
      },
      {
        q: "How often should my child have tutoring sessions?",
        a: "It depends on goals and needs. We offer packages of 4 sessions/month (1x/week) for maintenance, 8 sessions/month (2x/week) for improvement (most popular), and 12 sessions/month (3x/week) for intensive prep or significant struggles."
      },
      {
        q: "Can I sit in on my child's sessions?",
        a: "Absolutely! Parents are welcome to observe any session. We also provide regular progress reports and are always available to discuss your child's progress separately."
      },
      {
        q: "What happens if we need to miss a session?",
        a: "Sessions can be rescheduled up to 24 hours in advance at no charge. Last-minute cancellations (less than 24 hours) will count toward your monthly sessions. We understand life happens and work with you to be flexible."
      }
    ]
  },
  pricing: {
    title: "Pricing & Payment",
    icon: DollarSign,
    questions: [
      {
        q: "How much does homework help cost?",
        a: "Prices vary based on complexity, length, and deadline. Simple problems start at $15, problem sets at $35-60, essays at $40-75, and full assignments at $75+. Rush and urgent deadlines cost more. You always receive a custom quote before paying."
      },
      {
        q: "How much does tutoring cost?",
        a: "Monthly packages: Starter (4 sessions) $120/month, Standard (8 sessions) $200/month, Premium (12 sessions) $350/month. All sessions are 1 hour each. Multi-subject and sibling discounts available."
      },
      {
        q: "Are there any hidden fees?",
        a: "No hidden fees, ever. The price quoted is the price you pay. No signup fees, no cancellation fees, no surprise charges."
      },
      {
        q: "What payment methods do you accept?",
        a: "We currently accept PayPal and Wise (formerly TransferWise) for secure, convenient payments. Both options support international transfers and provide buyer protection."
      },
      {
        q: "Are there any discounts available?",
        a: "Yes! Multi-subject discount: 10% off for 2 subjects, 15% off for 3+ subjects. Sibling discount: 10% off for second child, 15% off for 3+ children. Contact us about family plans."
      }
    ]
  },
  scheduling: {
    title: "Scheduling & Logistics",
    icon: Calendar,
    questions: [
      {
        q: "What hours are you available?",
        a: "Homework help quotes are provided 7 days a week, typically within 2 hours. Tutoring sessions are available Monday-Saturday, with times ranging from after school (3pm) to evening (9pm) in all U.S. time zones."
      },
      {
        q: "What timezone do you operate in?",
        a: "We work with students in all U.S. time zones: Eastern, Central, Mountain, Pacific, Alaska, and Hawaii. When you book, we'll schedule in your local time."
      },
      {
        q: "How far in advance do I need to book tutoring sessions?",
        a: "Once enrolled, your weekly session time is locked in. If you need to reschedule, just give us 24 hours notice. For the initial consultation, we typically have availability within 48 hours."
      },
      {
        q: "What technology do I need?",
        a: "A computer, tablet, or phone with a camera and internet connection. We use Zoom for video calls and provide access to virtual whiteboards. We'll send setup instructions and test everything before your first session."
      }
    ]
  },
  safety: {
    title: "Safety & Trust",
    icon: Shield,
    questions: [
      {
        q: "Are tutors background checked?",
        a: "Yes, every tutor undergoes a comprehensive background check before joining our platform. Your child's safety is our top priority."
      },
      {
        q: "How do you ensure quality?",
        a: "All tutors are vetted for qualifications, subject expertise, and teaching ability. We collect ratings after every session and maintain a 4.8+ standard. Tutors who fall below standards are retrained or removed."
      },
      {
        q: "Is my payment information secure?",
        a: "Yes. All payments are processed through secure, encrypted payment processors (Stripe). We never store your full credit card information on our servers."
      },
      {
        q: "What's your privacy policy?",
        a: "We take privacy seriously. Your personal information is never sold or shared with third parties. Student data is used only to provide and improve our services. See our full Privacy Policy for details."
      }
    ]
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: Object.values(faqs).flatMap(category =>
    category.questions.map(faq => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  )
}

export default function FAQ() {
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
              <span className="text-[#1A3D7C] font-medium">FAQ</span>
            </nav>
          </div>
        </div>

        {/* Hero Section - Subtle & Center Aligned */}
        <section className="relative py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] leading-tight mb-4">
                Frequently Asked Questions
              </h1>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Everything you need to know about our homework help and tutoring services. Can't find what you're looking for? Contact us!
              </p>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-8 bg-white border-b sticky top-0 z-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap justify-center gap-3">
              {Object.entries(faqs).map(([key, category]) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-[#1A3D7C] hover:text-white transition-colors text-sm font-medium"
                >
                  <category.icon className="w-4 h-4" />
                  {category.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            {Object.entries(faqs).map(([key, category]) => (
              <div key={key} id={key} className="mb-12 scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#1A3D7C] rounded-full flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-[#1A3D7C]">
                    {category.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-6">
                        <h3 className="font-poppins font-semibold text-[#1A3D7C] mb-3 flex items-start gap-2">
                          <span className="w-6 h-6 bg-[#FFC857] text-[#1A3D7C] rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                            Q
                          </span>
                          {faq.q}
                        </h3>
                        <div className="pl-8">
                          <p className="text-gray-700">{faq.a}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                Still Have Questions?
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                We're here to help! Reach out and we'll get back to you as soon as possible.
              </p>

              <div className="flex justify-center mb-8">
                <Card className="p-6 text-center hover:shadow-lg transition-shadow max-w-sm w-full">
                  <CardContent className="p-0">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-7 h-7 text-[#1A3D7C]" />
                    </div>
                    <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">Email Us</h3>
                    <a href="mailto:info@thetutorbridge.com" className="text-gray-600 hover:text-[#1A3D7C]">
                      info@thetutorbridge.com
                    </a>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tutoring/free-consultation">
                  <Button size="lg" className="bg-[#2BAE66] hover:bg-[#2BAE66]/90 px-8 py-6 text-lg font-semibold">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Free Consultation
                  </Button>
                </Link>
                <Link href="/homework-help/submit">
                  <Button size="lg" variant="outline" className="border-2 border-[#1A3D7C] text-[#1A3D7C] px-8 py-6 text-lg font-semibold hover:bg-[#1A3D7C] hover:text-white">
                    <FileText className="w-5 h-5 mr-2" />
                    Submit Homework
                  </Button>
                </Link>
              </div>
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
