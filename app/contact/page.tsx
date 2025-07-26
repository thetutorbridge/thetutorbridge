"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-[60vh] flex items-center">
          <div className="container px-4 py-20 relative z-10">
            <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Contact Us
                </span>
              </h1>
              <p className="text-lg text-gray-700 mb-8 text-center">
                Have questions or need help? Reach out to our team and we’ll get
                back to you within 24 hours.
              </p>
              <form
                className="space-y-6"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);
                  setError(null);
                  setSuccess(false);
                  const form = e.currentTarget as HTMLFormElement;
                  const formData = {
                    name: (form.elements.namedItem("name") as HTMLInputElement)
                      .value,
                    email: (
                      form.elements.namedItem("email") as HTMLInputElement
                    ).value,
                    message: (
                      form.elements.namedItem("message") as HTMLTextAreaElement
                    ).value,
                  };
                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(formData),
                    });
                    if (!res.ok) throw new Error("Failed to send message");
                    setSuccess(true);
                    form.reset();
                  } catch (err) {
                    setError("There was an error sending your message. Please try again.");
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
                {success && (
                  <div className="text-green-600 text-center mt-4">
                    Your message has been sent!
                  </div>
                )}
                {error && (
                  <div className="text-red-600 text-center mt-4">
                    {error}
                  </div>
                )}
              </form>
              <div className="mt-8 text-center text-gray-600">
                Or email us at{" "}
                <a
                  href="mailto:info@thetutorbridge.com"
                  className="text-blue-600 underline"
                >
                  info@thetutorbridge.com
                </a>
                <br />
                Call us:{" "}
                <a href="tel:+919876543210" className="text-blue-600 underline">
                  +91 9310096171
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}