import { Navigation } from "@/components/navigation"
import Image from "next/image"

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-[60vh] flex items-center">
          <div className="container px-4 py-20 relative z-10">
            <div className="grid gap-16 lg:grid-cols-2 items-center">
              <div className="space-y-8">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                  <span className="text-gray-900">About</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    The Tutor Bridge
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl font-light">
                  The Tutor Bridge is India’s leading online tutoring platform. Our mission is to empower students with personalized learning, expert guidance, and 24/7 support. With 10,000+ success stories, we’re committed to academic excellence and holistic growth.
                </p>
                <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                  <li>Instant doubt solving via Telegram community</li>
                  <li>Career guidance & mentorship</li>
                  <li>Premium study resources</li>
                </ul>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/banner.png"
                  width={400}
                  height={320}
                  alt="About The Tutor Bridge"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}