"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { TimezoneSelect } from "@/components/timezone-select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  CheckCircle,
  Clock,
  Star,
  Calendar,
  ChevronRight,
  Users,
  Video,
  Mail,
  MessageSquare,
  Shield,
  GraduationCap,
  Target,
  Award,
  ArrowRight,
  Sparkles
} from "lucide-react"

export default function FreeConsultation() {
  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    email: "",
    phone: "",
    timezone: "",
    grade: "",
    subjects: [] as string[],
    currentChallenges: "",
    goals: "",
    preferredSchedule: "",
    howHeard: "",
    additionalInfo: "",
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send to both email addresses
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recipients: ["rishabhjain2489@gmail.com", "info@thetutorbridge.com"],
          type: "consultation_request"
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="relative min-h-screen flex flex-col overflow-x-hidden font-merriweather">
        <div className="fixed inset-0 -z-10 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3D7C]/5 via-[#2BAE66]/5 to-[#FFC857]/10" />
        </div>

        <Navigation />

        <main className="flex-1 flex items-center justify-center py-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-2xl text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-[#2BAE66]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
              Consultation Request Received!
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Thank you for choosing The Tutor Bridge. We've received your consultation request and will contact you within 24 hours to schedule your free session.
            </p>
            <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left">
              <h3 className="font-poppins font-bold text-[#1A3D7C] mb-3">What happens next?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                  <span>Our education coordinator will review your submission</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                  <span>We'll call or email you within 24 hours to confirm your consultation time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
                  <span>You'll receive a Zoom link for your 20-minute video consultation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</span>
                  <span>During the call, we'll discuss goals and match you with the perfect tutor</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  Return to Home
                </Button>
              </Link>
              <Link href="/homework-help">
                <Button className="bg-[#2BAE66] w-full sm:w-auto">
                  Need Homework Help Now?
                </Button>
              </Link>
            </div>
          </div>
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
              <Link href="/tutoring" className="hover:text-[#1A3D7C]">Tutoring</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-[#1A3D7C] font-medium">Free Consultation</span>
            </nav>
          </div>
        </div>

        {/* Hero Section - Subtle & Center Aligned */}
        <section className="relative py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] leading-tight mb-4">
                Book Your Free Consultation
              </h1>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Talk with our education experts, discuss your child's needs, and get matched with the perfect tutor—all at no cost.
              </p>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-[#2BAE66]" />
                  <span>Video call with expert</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#2BAE66]" />
                  <span>Personalized recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#2BAE66]" />
                  <span>Only 20 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg">
                  <CardContent className="p-6 sm:p-8">
                    <h2 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-6">
                      Request Your Free Consultation
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Parent & Student Info */}
                      <div className="space-y-4">
                        <h3 className="font-poppins font-semibold text-gray-800 border-b pb-2">Contact Information</h3>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Parent/Guardian Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.parentName}
                              onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                              placeholder="Your full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Student Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.studentName}
                              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                              placeholder="Student's name"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                              placeholder="your@email.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                              placeholder="(555) 123-4567"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Timezone <span className="text-red-500">*</span>
                            </label>
                            <TimezoneSelect
                              value={formData.timezone}
                              onChange={(value) => setFormData({ ...formData, timezone: value })}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Student's Grade <span className="text-red-500">*</span>
                            </label>
                            <select
                              required
                              value={formData.grade}
                              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                            >
                              <option value="">Select grade</option>
                              <option value="6">6th Grade</option>
                              <option value="7">7th Grade</option>
                              <option value="8">8th Grade</option>
                              <option value="9">9th Grade (Freshman)</option>
                              <option value="10">10th Grade (Sophomore)</option>
                              <option value="11">11th Grade (Junior)</option>
                              <option value="12">12th Grade (Senior)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Subject Selection */}
                      <div className="space-y-4">
                        <h3 className="font-poppins font-semibold text-gray-800 border-b pb-2">
                          Subjects Needed <span className="text-red-500">*</span>
                        </h3>
                        <p className="text-sm text-gray-600">Select all subjects where your student needs help:</p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {[
                            "Pre-Algebra",
                            "Algebra 1 & 2",
                            "Geometry",
                            "Pre-Calculus",
                            "Calculus",
                            "Statistics",
                            "Physics",
                            "Chemistry",
                            "Biology",
                            "English/Writing",
                            "Literature",
                            "Test Prep (SAT/ACT)"
                          ].map((subject) => (
                            <button
                              key={subject}
                              type="button"
                              onClick={() => handleSubjectToggle(subject)}
                              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                                formData.subjects.includes(subject)
                                  ? "border-[#2BAE66] bg-[#2BAE66]/10 text-[#2BAE66]"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              {formData.subjects.includes(subject) && (
                                <CheckCircle className="w-4 h-4 inline mr-1" />
                              )}
                              {subject}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Goals & Challenges */}
                      <div className="space-y-4">
                        <h3 className="font-poppins font-semibold text-gray-800 border-b pb-2">Tell Us More</h3>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Current Challenges
                          </label>
                          <textarea
                            value={formData.currentChallenges}
                            onChange={(e) => setFormData({ ...formData, currentChallenges: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                            placeholder="What specific challenges is your student facing? (e.g., struggling with word problems, test anxiety, falling behind in class)"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Goals for Tutoring
                          </label>
                          <textarea
                            value={formData.goals}
                            onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                            placeholder="What would you like your student to achieve? (e.g., improve grades, build confidence, prepare for AP exams)"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Preferred Schedule
                          </label>
                          <textarea
                            value={formData.preferredSchedule}
                            onChange={(e) => setFormData({ ...formData, preferredSchedule: e.target.value })}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                            placeholder="When is your student typically available? (e.g., weekday evenings after 5pm, Saturday mornings)"
                          />
                        </div>
                      </div>

                      {/* How Heard */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          How did you hear about us?
                        </label>
                        <select
                          value={formData.howHeard}
                          onChange={(e) => setFormData({ ...formData, howHeard: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                        >
                          <option value="">Select an option</option>
                          <option value="google">Google Search</option>
                          <option value="social">Social Media</option>
                          <option value="referral">Friend/Family Referral</option>
                          <option value="school">School Recommendation</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Additional Info */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Anything else we should know?
                        </label>
                        <textarea
                          value={formData.additionalInfo}
                          onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                          placeholder="Learning style preferences, special accommodations needed, etc."
                        />
                      </div>

                      {/* Consent */}
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="consent"
                          required
                          checked={formData.consent}
                          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                          className="mt-1 w-4 h-4 text-[#1A3D7C] rounded focus:ring-[#1A3D7C]"
                        />
                        <label htmlFor="consent" className="text-sm text-gray-600">
                          I agree to be contacted by The Tutor Bridge via phone, email, or text regarding tutoring services. I understand this consultation is free with no obligation to purchase. <span className="text-red-500">*</span>
                        </label>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting || formData.subjects.length === 0}
                        className="w-full bg-[#2BAE66] hover:bg-[#2BAE66]/90 py-6 text-lg font-semibold"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Calendar className="w-5 h-5 mr-2" />
                            Request Free Consultation
                          </>
                        )}
                      </Button>

                      <p className="text-center text-sm text-gray-500">
                        We'll contact you within 24 hours to confirm your consultation time.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* What to Expect */}
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-poppins font-bold text-[#1A3D7C] mb-4">
                      What to Expect
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-[#1A3D7C] font-bold text-sm">1</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Initial Discussion</h4>
                          <p className="text-sm text-gray-600">We'll discuss your child's academic situation and goals</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-[#1A3D7C] font-bold text-sm">2</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Tutor Matching</h4>
                          <p className="text-sm text-gray-600">We'll explain how we match students with ideal tutors</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-[#1A3D7C] font-bold text-sm">3</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Custom Plan</h4>
                          <p className="text-sm text-gray-600">Receive a personalized learning recommendation</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-[#1A3D7C] font-bold text-sm">4</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Q&A</h4>
                          <p className="text-sm text-gray-600">Get all your questions answered</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Trust Signals */}
                <Card className="shadow-lg bg-gradient-to-br from-[#1A3D7C] to-[#1A3D7C]/90 text-white">
                  <CardContent className="p-6">
                    <h3 className="font-poppins font-bold mb-4">
                      Why Families Trust Us
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-[#FFC857]" />
                        <span className="text-sm">All tutors U.S.-certified educators</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-[#FFC857]" />
                        <span className="text-sm">500+ families served</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-[#FFC857]" />
                        <span className="text-sm">4.9/5 average rating</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-[#FFC857]" />
                        <span className="text-sm">100% satisfaction guarantee</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <GraduationCap className="w-5 h-5 text-[#FFC857]" />
                        <span className="text-sm">95% grade improvement rate</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Quick Contact */}
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-poppins font-bold text-[#1A3D7C] mb-4">
                      Questions? Reach Out!
                    </h3>
                    <div className="space-y-3">
                      <a href="mailto:info@thetutorbridge.com" className="flex items-center gap-3 text-gray-700 hover:text-[#1A3D7C]">
                        <Mail className="w-5 h-5" />
                        <span className="text-sm">info@thetutorbridge.com</span>
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Testimonial */}
                <Card className="shadow-lg border-l-4 border-[#FFC857]">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFC857] text-[#FFC857]" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-4">
                      "The consultation was incredibly helpful. They really took time to understand my daughter's needs and matched her with a tutor who's been amazing."
                    </p>
                    <div className="text-sm">
                      <span className="font-semibold text-[#1A3D7C]">Jennifer M.</span>
                      <span className="text-gray-500"> — Parent of 10th grader</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 bg-[#F8FAFC]">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-[#1A3D7C] text-center mb-8">
              Consultation FAQs
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "Is the consultation really free?",
                  a: "Yes, 100% free with absolutely no obligation. We believe in helping families make informed decisions about their child's education."
                },
                {
                  q: "How long is the consultation?",
                  a: "Consultations are typically 15-20 minutes via Zoom video call. It's enough time to discuss your needs and answer your questions without taking up your whole day."
                },
                {
                  q: "What if I'm not ready to commit to tutoring?",
                  a: "No problem at all! The consultation is meant to be informative. There's zero pressure to sign up, and you can take all the time you need to decide."
                },
                {
                  q: "Can both parents join the consultation?",
                  a: "Absolutely! We encourage both parents to join if possible. The student is also welcome to participate if they're comfortable."
                },
                {
                  q: "What happens after the consultation?",
                  a: "If you decide to proceed, we'll match your child with a tutor and schedule a trial session. If not, no worries—you'll have all the information you need for whenever you're ready."
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
