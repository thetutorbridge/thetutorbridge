"use client"

import type { Metadata } from "next"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Book Free Demo Class - Expert Online Tutoring | The Tutor Bridge",
  description: "Book a free demo class with The Tutor Bridge! Experience personalized 1-on-1 tutoring for Math, Science, and English. Expert tutors for grades 6-12. No commitment required.",
  keywords: [
    "book demo class",
    "free trial",
    "online tutoring demo",
    "personalized tutoring",
    "math tutor demo",
    "science tutor demo",
    "english tutor demo",
    "grades 6-12",
    "expert tutors",
    "free tutoring session"
  ],
  alternates: {
    canonical: "https://thetutorbridge.com/book-demo-class",
  },
  openGraph: {
    title: "Book Free Demo Class - Expert Online Tutoring | The Tutor Bridge",
    description: "Book a free demo class with The Tutor Bridge! Experience personalized 1-on-1 tutoring for Math, Science, and English. Expert tutors for grades 6-12.",
    url: "https://thetutorbridge.com/book-demo-class",
    siteName: "The Tutor Bridge",
    type: "website",
  },
}

export default function BookDemoClass() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const form = e.currentTarget
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      mobile: (form.elements.namedItem("mobile") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      class: (form.elements.namedItem("class") as HTMLSelectElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
    }

    try {
      const res = await fetch("/api/book-demo-class", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error("Failed to book demo class")
      setSuccess(true)
      form.reset()
    } catch (err) {
        console.error(err);
      setError("There was an error booking your demo class. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-blue/5 via-white to-brand-amber/10 min-h-[60vh] flex items-center">
          <div className="container px-4 py-20 relative z-10">
            <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                <span className="bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">
                  Book a Free Demo Class
                </span>
              </h1>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Mobile Number</label>
                  <input
                    name="mobile"
                    type="tel"
                    maxLength={10}
                    minLength={10}
                    required
                    pattern="[0-9]{10,}"
                    className="w-full px-4 py-3 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Class</label>
                  <select
                    name="class"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Class
                    </option>
                    <option value="6">Class 6</option>
                    <option value="7">Class 7</option>
                    <option value="8">Class 8</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Subject</label>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="subject"
                        value="Mathematics"
                        required
                        className="w-4 h-4 text-brand-teal focus:ring-brand-teal"
                      />
                      <span className="text-sm sm:text-base">Mathematics</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="subject"
                        value="Science"
                        required
                        className="w-4 h-4 text-brand-teal focus:ring-brand-teal"
                      />
                      <span className="text-sm sm:text-base">Science</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="subject"
                        value="English"
                        required
                        className="w-4 h-4 text-brand-teal focus:ring-brand-teal"
                      />
                      <span className="text-sm sm:text-base">English</span>
                    </label>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Book Demo Class"}
                </Button>
                {success && (
                  <div className="text-brand-teal text-center font-medium mt-2">
                    Your demo class has been booked! We will contact you soon. 
                    Please check spam folder if you don't see the confirmation email.
                  </div>
                )}
                {error && (
                  <div className="text-red-600 text-center font-medium mt-2">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main></div>
  )
}