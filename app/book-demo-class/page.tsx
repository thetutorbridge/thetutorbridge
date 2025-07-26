"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-[60vh] flex items-center">
          <div className="container px-4 py-20 relative z-10">
            <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Class</label>
                  <select
                    name="class"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="subject"
                        value="Mathematics"
                        required
                      />
                      Mathematics
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="subject"
                        value="Science"
                        required
                      />
                      Science
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="subject"
                        value="English"
                        required
                      />
                      English
                    </label>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Book Demo Class"}
                </Button>
                {success && (
                  <div className="text-green-600 text-center font-medium mt-2">
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