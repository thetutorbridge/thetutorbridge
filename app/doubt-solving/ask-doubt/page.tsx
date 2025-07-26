"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"

export default function AskDoubt() {
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
      doubt: (form.elements.namedItem("doubt") as HTMLInputElement).value,
      class: (form.elements.namedItem("class") as HTMLSelectElement).value,
    }

    try {
      const res = await fetch("/api/ask-doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error("Failed to submit doubt")
      setSuccess(true)
      form.reset()
    } catch (err) {
      setError("There was an error submitting your doubt. Please try again.")
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
                  Ask a Doubt
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
                  <label className="block text-gray-700 font-medium mb-2">Your Doubt</label>
                  <textarea
                    name="doubt"
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Doubt"}
                </Button>
                {success && (
                  <div className="text-green-700 bg-green-100 border border-green-300 rounded-lg px-4 py-3 text-center font-semibold mt-4">
                    ✅ Your doubt has been submitted! We will get back to you soon.
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
      </main>
    </div>
  )
}