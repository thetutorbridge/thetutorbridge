import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Navigation } from "@/components/navigation";

const chapters = [
  { number: 1, title: "Matter in Surroundings", link: "/study-resources/class-9/science/Chapter-1-Matter-in-Surroundings" },
  { number: 2, title: "Is Matter Around Us Pure", link: "/study-resources/class-9/science/Chapter-2-Is-Matter-Around-Us-Pure" },
  { number: 3, title: "Atoms and Molecules", link: "/study-resources/class-9/science/Chapter-3-Atoms-and-Molecules" },
  { number: 4, title: "Structure of the Atom", link: "/study-resources/class-9/science/Chapter-4-Structure-of-the-Atom" },
  { number: 5, title: "The Fundamental Unit of Life", link: "/study-resources/class-9/science/Chapter-5-The-Fundamental-Unit-of-Life" },
  { number: 6, title: "Tissues", link: "/study-resources/class-9/science/Chapter-6-Tissues" },
  { number: 7, title: "Diversity in Living Organisms", link: "/study-resources/class-9/science/Chapter-7-Diversity-in-Living-Organisms" },
  { number: 8, title: "Motions", link: "/study-resources/class-9/science/Chapter-8-Motions" },
];

export default function Class9ScienceResources() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <div className="container px-4 flex-1">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Class 9 Science Resources
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chapters.map((ch) => (
            <Card key={ch.number} className="hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  Chapter {ch.number}: {ch.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href={ch.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  View
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}