import Link from "next/link"
import { Download, FileText, BookOpen, Calculator, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const mathResources = [
  {
    title: "Class 9 Mathematics Notes",
    description: "Last-minute revision notes for Class 9.",
    link: "/study-resources/math/class-9-notes",
    type: "Revision Notes",
  },
]

export default function MathResources() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <Calculator className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-brand-orange bg-clip-text text-transparent">
                Math Resources
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="/study-resources" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Back to Study Resources
            </Link>
          </nav>
        </div>
      </header>

     <main className="flex-1">
      <section className="py-20">
        <div className="container px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center">
            Mathematics Resources <span className="bg-gradient-to-r from-blue-600 to-brand-orange bg-clip-text text-transparent">Class 6-12</span>
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mathResources.map((res) => (
              <Card key={res.title} className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="h-6 w-6 text-blue-600" />
                    <span className="font-semibold text-blue-700">{res.type}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2">{res.title}</h2>
                  <p className="text-gray-600 mb-6">{res.description}</p>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                    <Link href={res.link}>
                      View
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
    </div>
  )
}