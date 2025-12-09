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
  Upload,
  Shield,
  Award,
  Zap,
  ChevronRight,
  FileText,
  Camera,
  AlertCircle,
  Loader2,
  X
} from "lucide-react"

export default function SubmitHomework() {
  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    email: "",
    phone: "",
    timezone: "",
    grade: "",
    subject: "",
    topic: "",
    description: "",
    urgency: "",
    preferredTime: "",
    source: "",
    consent: false
  })
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles(prev => [...prev, ...newFiles].slice(0, 5)) // Max 5 files
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let uploadedFiles: { name: string; url: string; size: number }[] = []

      // Step 1: Upload files if any
      if (files.length > 0) {
        const uploadFormData = new FormData()
        files.forEach(file => {
          uploadFormData.append("files", file)
        })

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData
        })

        if (!uploadResponse.ok) {
          const uploadError = await uploadResponse.json()
          throw new Error(uploadError.error || "Failed to upload files")
        }

        const uploadData = await uploadResponse.json()
        uploadedFiles = uploadData.files
      }

      // Step 2: Submit the form with file URLs
      const response = await fetch("/api/homework-help", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          files: uploadedFiles
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit homework")
      }

      setSubmitStatus("success")
    } catch (error) {
      console.error("Submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }


  const grades = ["6", "7", "8", "9", "10", "11", "12"]
  const subjects = ["Math", "Science", "English"]
  const urgencyOptions = [
    { value: "immediate", label: "Urgent - Within 60 minutes (+$10)", price: "+$10" },
    { value: "24hr", label: "Priority - Within 24 hours", price: "Standard" },
    { value: "48hr", label: "Standard - Within 48 hours", price: "Best Value" }
  ]

  const sources = [
    "Google Search",
    "Facebook/Instagram",
    "Friend/Family Referral",
    "School Recommendation",
    "Reddit",
    "YouTube",
    "Other"
  ]

  if (submitStatus === "success") {
    return (
      <div className="relative min-h-screen flex flex-col overflow-x-hidden font-merriweather">
        <div className="fixed inset-0 -z-10 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3D7C]/5 via-[#2BAE66]/5 to-[#FFC857]/10" />
        </div>

        <Navigation />

        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-[#2BAE66] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">
              Homework Submitted Successfully!
            </h1>
            <p className="text-gray-700 mb-6">
              Thank you for submitting your homework. Our team will review your request and send you a quote within the next 30 minutes. Check your email for confirmation.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-[#1A3D7C] mb-2">What happens next?</h3>
              <ol className="text-sm text-gray-600 text-left space-y-2">
                <li>1. You'll receive a confirmation email shortly</li>
                <li>2. Our team reviews your homework and creates a quote</li>
                <li>3. You'll receive the quote via email (usually within 30 min)</li>
                <li>4. Once approved, our tutor begins working on your solution</li>
              </ol>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/homework-help">
                <Button className="bg-[#1A3D7C] text-white">
                  Back to Homework Help
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden font-merriweather">
      {/* Background */}
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
              <Link href="/homework-help" className="hover:text-[#1A3D7C]">Homework Help</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-[#1A3D7C] font-medium">Submit Homework</span>
            </nav>
          </div>
        </div>

        {/* Hero Banner - Subtle & Center Aligned */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
              Submit Your Homework
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload your question and get expert help with step-by-step explanations. Most quotes delivered within 30 minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#2BAE66]" />
                <span>60-min urgent delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#2BAE66]" />
                <span>100% original work</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#2BAE66]" />
                <span>4.9/5 satisfaction</span>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Main Form */}
              <div className="lg:col-span-2">
                <Card className="p-6 sm:p-8">
                  <CardContent className="p-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Contact Information */}
                      <div>
                        <h2 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-4">
                          Contact Information
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">
                              Parent/Guardian Name *
                            </label>
                            <input
                              type="text"
                              id="parentName"
                              name="parentName"
                              required
                              value={formData.parentName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent outline-none transition-all"
                              placeholder="Your name"
                            />
                          </div>
                          <div>
                            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
                              Student Name *
                            </label>
                            <input
                              type="text"
                              id="studentName"
                              name="studentName"
                              required
                              value={formData.studentName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent outline-none transition-all"
                              placeholder="Student's name"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent outline-none transition-all"
                              placeholder="your@email.com"
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number (Optional)
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent outline-none transition-all"
                              placeholder="(555) 123-4567"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                              Your Timezone *
                            </label>
                            <TimezoneSelect
                              value={formData.timezone}
                              onChange={(value) => setFormData({ ...formData, timezone: value })}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Assignment Details */}
                      <div className="border-t pt-6">
                        <h2 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-4">
                          Assignment Details
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                              Student Grade *
                            </label>
                            <select
                              id="grade"
                              name="grade"
                              required
                              value={formData.grade}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent outline-none transition-all bg-white"
                            >
                              <option value="">Select grade</option>
                              {grades.map(g => (
                                <option key={g} value={g}>Grade {g}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                              Subject *
                            </label>
                            <select
                              id="subject"
                              name="subject"
                              required
                              value={formData.subject}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent outline-none transition-all bg-white"
                            >
                              <option value="">Select subject</option>
                              {subjects.map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </div>
                          <div className="sm:col-span-2">
                            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                              Topic/Chapter *
                            </label>
                            <input
                              type="text"
                              id="topic"
                              name="topic"
                              required
                              value={formData.topic}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent outline-none transition-all"
                              placeholder="e.g., Quadratic Equations, Chemical Bonding, Essay Writing"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                              Describe Your Question/Assignment *
                            </label>
                            <textarea
                              id="description"
                              name="description"
                              required
                              rows={4}
                              value={formData.description}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent outline-none transition-all resize-none"
                              placeholder="Please describe your homework question or paste the problem here. Include any specific instructions from your teacher."
                            />
                          </div>
                        </div>
                      </div>

                      {/* File Upload */}
                      <div className="border-t pt-6">
                        <h2 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-4">
                          Upload Files (Optional)
                        </h2>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2BAE66] transition-colors">
                          <input
                            type="file"
                            id="files"
                            multiple
                            accept="image/*,.pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <label htmlFor="files" className="cursor-pointer">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Camera className="w-6 h-6 text-gray-500" />
                            </div>
                            <p className="text-gray-700 font-medium">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Photos, PDFs, or Word docs (max 5 files)
                            </p>
                          </label>
                        </div>
                        {files.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {files.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                                <div className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-gray-500" />
                                  <span className="text-sm text-gray-700 truncate max-w-[200px]">{file.name}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="text-gray-400 hover:text-red-500"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Urgency Selection */}
                      <div className="border-t pt-6">
                        <h2 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-4">
                          Delivery Speed *
                        </h2>
                        <div className="space-y-3">
                          {urgencyOptions.map((option) => (
                            <label
                              key={option.value}
                              className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                formData.urgency === option.value
                                  ? "border-[#2BAE66] bg-green-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name="urgency"
                                  value={option.value}
                                  checked={formData.urgency === option.value}
                                  onChange={handleInputChange}
                                  className="w-4 h-4 text-[#2BAE66]"
                                  required
                                />
                                <span className="font-medium text-gray-700">{option.label}</span>
                              </div>
                              <span className={`text-sm font-semibold ${
                                option.value === "immediate" ? "text-[#FFC857]" : "text-[#2BAE66]"
                              }`}>
                                {option.price}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Preferred Session Time */}
                      <div className="border-t pt-6">
                        <h2 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-4">
                          Preferred Time for Live Help (Optional)
                        </h2>
                        <input
                          type="text"
                          id="preferredTime"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent outline-none transition-all"
                          placeholder="e.g., Weekdays after 4pm, Saturday morning"
                        />
                      </div>

                      {/* How Did You Hear About Us */}
                      <div className="border-t pt-6">
                        <h2 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-4">
                          How Did You Hear About Us?
                        </h2>
                        <select
                          id="source"
                          name="source"
                          value={formData.source}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BAE66] focus:border-transparent outline-none transition-all bg-white"
                        >
                          <option value="">Select an option</option>
                          {sources.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      {/* Consent Checkbox */}
                      <div className="border-t pt-6">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="consent"
                            checked={formData.consent}
                            onChange={handleInputChange}
                            required
                            className="w-5 h-5 text-[#2BAE66] mt-0.5"
                          />
                          <span className="text-sm text-gray-600">
                            I agree to the <Link href="/terms" className="text-[#1A3D7C] underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#1A3D7C] underline">Privacy Policy</Link>. I understand that The Tutor Bridge provides educational support and explanations, not answers to be submitted as my own work.
                          </span>
                        </label>
                      </div>

                      {/* Submit Button */}
                      <div className="border-t pt-6">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#2BAE66] hover:bg-[#2BAE66]/90 text-white py-6 text-lg font-semibold rounded-xl"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Upload className="w-5 h-5 mr-2" />
                              Submit Homework Request
                            </>
                          )}
                        </Button>
                        {submitStatus === "error" && (
                          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                            <AlertCircle className="w-5 h-5" />
                            <span>Something went wrong. Please try again.</span>
                          </div>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Pricing Summary */}
                <Card className="p-6 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white">
                  <CardContent className="p-0">
                    <h3 className="text-xl font-poppins font-bold mb-4">Pricing Guide</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Single Question</span>
                        <span className="font-semibold">From $15</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Problem Set (3-10 Q)</span>
                        <span className="font-semibold">$40 - $80</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Essay Review</span>
                        <span className="font-semibold">From $25</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lab Report</span>
                        <span className="font-semibold">From $40</span>
                      </div>
                      <div className="flex justify-between border-t border-white/20 pt-3 mt-3">
                        <span>Urgent Delivery (+60 min)</span>
                        <span className="font-semibold text-[#FFC857]">+$10</span>
                      </div>
                    </div>
                    <p className="text-xs text-white/70 mt-4">
                      * Final price depends on complexity. You'll receive a quote before any charges.
                    </p>
                  </CardContent>
                </Card>

                {/* Trust Badges */}
                <Card className="p-6">
                  <CardContent className="p-0">
                    <h3 className="text-lg font-poppins font-bold text-[#1A3D7C] mb-4">Why Trust Us?</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">U.S.-certified expert tutors</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Step-by-step explanations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">100% original work guaranteed</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Revisions included</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Secure payment processing</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="p-6 bg-[#F8FAFC]">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-[#1A3D7C]">50K+</div>
                        <div className="text-xs text-gray-600">Tasks Completed</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#2BAE66]">98%</div>
                        <div className="text-xs text-gray-600">Satisfaction</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#FFC857]">100+</div>
                        <div className="text-xs text-gray-600">Expert Tutors</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#1A3D7C]">4.9★</div>
                        <div className="text-xs text-gray-600">Rating</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Need Help? */}
                <Card className="p-6">
                  <CardContent className="p-0 text-center">
                    <h3 className="text-lg font-poppins font-bold text-[#1A3D7C] mb-2">Need Help?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Have questions about our service?
                    </p>
                    <Link href="/tutoring/free-consultation">
                      <Button variant="outline" className="w-full">
                        Book Free Consultation
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
              <span className="text-lg font-bold">The Tutor Bridge</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link href="/homework-help" className="hover:text-white transition-colors">Homework Help</Link>
              <Link href="/tutoring" className="hover:text-white transition-colors">Tutoring</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} The Tutor Bridge
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
