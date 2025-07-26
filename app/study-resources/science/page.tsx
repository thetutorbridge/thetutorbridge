import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/navigation";

// Example data structure for classwise chapter resources


const chapters = [
    { number: 1, title: "Matter in Surroundings", link: "/study-resources/class-9/science/Chapter-1-Matter-in-Surroundings" },
    { number: 2, title: "Is Matter Around Us Pure", link: "/study-resources/class-9/science/Chapter-2-Is-Matter-Around-Us-Pure" },
    { number: 3, title: "Atoms and Molecules", link: "/study-resources/class-9/science/Chapter-3-Atoms-and-Molecules" },
    //{ number: 4, title: "Structure of the Atom", link: "/study-resources/class-9/science/Chapter-4-Structure-of-the-Atom" }
    // { number: 5, title: "The Fundamental Unit of Life", link: "/study-resources/class-9/science/Chapter-5-The-Fundamental-Unit-of-Life" },
];

const ScienceResourcesPage = () => (
  <div className="flex min-h-screen flex-col">
    <Navigation />
    <main className="flex-1 max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Science Study Resources</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Class 6</h2>
        <ul className="list-disc list-inside space-y-2">
          {chapters.map((chapter) => (
            <li key={chapter.number}>
              <a
                href={chapter.link}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chapter.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
    <footer className="bg-gray-900 text-white py-16 mt-10">
      <div className="container px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
              <span className="text-xl font-bold">TheTutorBridge</span>
            </div>
            <p className="text-gray-400">Transforming education through personalized learning experiences.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  One-on-One Tutoring
                </Link>
              </li>
              <li>
                <Link href="/doubt-solving" className="hover:text-white transition-colors">
                  Doubt Solving
                </Link>
              </li>
              <li>
                <Link href="/career-guidance" className="hover:text-white transition-colors">
                  Career Guidance
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="https://thetutorbridge.com/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>info@thetutorbridge.com</li>
              <li>+91 98765 43210</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          © {new Date().getFullYear()} The Tutor Bridge. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
);

export default ScienceResourcesPage;