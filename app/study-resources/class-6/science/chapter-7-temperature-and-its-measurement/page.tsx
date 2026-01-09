import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Thermometer, Eye, HardHat, Droplets, Scale, Box, Lightbulb, TestTube, Star, Home, GraduationCap, Beaker, Target, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Class 6 Science Chapter 7 Notes – Temperature and Its Measurement (Clinical & Lab Thermometers)',
  description: 'Get Class 6 Science Chapter 7 notes – Temperature and Its Measurement. Covers hot vs cold, clinical and laboratory thermometers, correct measurement steps, least count, kelvin conversion, air temperature, safety tips, activities, and exam-ready key points with daily life examples.',
};

export default function Chapter7Page() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto">
            <Link href="/study-resources" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center whitespace-nowrap">
              <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Study Resources</span>
              <span className="sm:hidden">Resources</span>
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/study-resources/class-6" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center whitespace-nowrap">
              <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Class 6</span>
              <span className="sm:hidden">C6</span>
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/study-resources/class-6/science" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center whitespace-nowrap">
              <Beaker className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Science</span>
              <span className="sm:hidden">Sci</span>
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 truncate max-w-[200px] sm:max-w-none">
              <span className="hidden sm:inline">Chapter 7 - Temperature and Its Measurement</span>
              <span className="sm:hidden">Ch 7</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Thermometer className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              Chapter 7: Temperature and Its Measurement
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Touch can trick; thermometers tell. Learn to measure temperature accurately using the right instruments the right way.
          </p>
          <div className="bg-white/10 p-4 rounded-xl mb-8">
            <p className="text-lg italic">"Wrong measurements are worse than no measurements at all."<br />
            <strong>— Anna Mani</strong></p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/study-resources/class-6/science">
              <Button size="lg" variant="outline" className="border-2 border-white text-white rounded-xl px-8 py-4 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Class 6 Science
              </Button>
            </Link>
            <Link href="/tutoring/free-consultation">
              <Button size="lg" className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-4 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold">
                Book Free Session
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">

          {/* Big Ideas Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 mr-3 text-[#FFC857]" />
                Big Ideas (Why this chapter matters)
              </h2>
              <ul className="space-y-3 text-lg" style={{ wordSpacing: 'normal', letterSpacing: 'normal' }}>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Touch can trick; thermometers tell.</strong> You can <em>feel</em> hot or cold, but only a <strong>thermometer</strong> gives a <strong>reliable number</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Temperature</strong> is the measure of hotness/coldness; we use <strong>scales</strong> (°C, °F, K).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Use the right thermometer the right way:</strong><br />
                  <strong>Clinical (digital)</strong> → body temperature.<br />
                  <strong>Laboratory</strong> → liquids/air in experiments.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Read correctly</strong> (no parallax, correct position), else the number is wrong—<em>even with a good instrument</em>.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Hot or Cold Activity */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <TestTube className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Hot or Cold? (Activity idea)
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="bg-[#FFC857]/10 p-6 rounded-lg border border-[#FFC857]/20 mb-6">
                <h3 className="font-semibold text-[#1A3D7C] mb-4">Three-bowl demo:</h3>
                <p className="text-gray-700 mb-4">
                  Right hand in warm water (<strong>A</strong>), left in ice-cold (<strong>C</strong>) for 1–2 min → then both into tap water (<strong>B</strong>).
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• One hand feels B <strong>cool</strong>, the other <strong>warm</strong>—<em>the same water!</em></li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Memory hook:</h4>
                <p className="text-gray-700">
                  <strong>Takeaway:</strong> <em>"Touch can <strong>trick</strong>, thermometers <strong>tell</strong>."</em>
                </p>
              </div>
            </div>
          </section>

          {/* Clinical Thermometer */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Thermometer className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Clinical Thermometer (Digital) — for body temperature
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700 mb-6">
                <strong>Digital, battery-run</strong>, easy-to-read. Safer than mercury (mercury is <strong>toxic</strong>).
              </p>

              <div className="bg-[#2BAE66]/10 p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-[#1A3D7C] mb-4">How to use (D.A.R.T.)</h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">D</span>
                    <span><strong>Disinfect/clean</strong> the tip; keep display <strong>dry</strong>.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">A</span>
                    <span><strong>Apply</strong> under tongue (mouth closed) <em>or</em> in <strong>armpit</strong> for children/elderly.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">R</span>
                    <span><strong>Read</strong> when it beeps/flashes.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">T</span>
                    <span><strong>Tidy up</strong>: clean & dry the tip after use.</span>
                  </li>
                </ol>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">"Normal" human temperature:</h4>
                  <p className="text-gray-700">
                    About <strong>37.0 °C</strong> (<strong>98.6 °F</strong>), but <strong>varies</strong> slightly with age, time of day, and activity.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Important notes:</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• <strong>Armpit readings</strong> are typically <strong>0.5–1.0 °C lower</strong> than core body temperature.</li>
                    <li>• <strong>Non-contact infrared</strong> thermometers measure from a distance.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Laboratory Thermometer */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <TestTube className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Laboratory Thermometer — for liquids/air (not for the body)
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="mb-6">
                <h3 className="font-semibold text-[#1A3D7C] mb-4">Parts:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Long glass stem</li>
                  <li>• <strong>Bulb</strong> with liquid (often <strong>coloured alcohol</strong> or <strong>mercury</strong>)</li>
                  <li>• <strong>Celsius scale</strong> on stem</li>
                </ul>
              </div>

              <div className="bg-[#1A3D7C]/10 p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-[#1A3D7C] mb-4">Read it correctly (V.I.E.W. rule)</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <span className="w-8 h-8 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">V</span>
                      <div>
                        <h4 className="font-semibold text-[#1A3D7C]">Vertical</h4>
                        <p className="text-gray-700 text-sm">Hold the thermometer <strong>upright</strong>.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="w-8 h-8 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">I</span>
                      <div>
                        <h4 className="font-semibold text-[#1A3D7C]">Immersed</h4>
                        <p className="text-gray-700 text-sm"><strong>Bulb fully in</strong> the liquid; <strong>don't touch</strong> beaker sides/bottom.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <span className="w-8 h-8 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">E</span>
                      <div>
                        <h4 className="font-semibold text-[#1A3D7C]">Eye-level</h4>
                        <p className="text-gray-700 text-sm">Eyes <strong>in line</strong> with the top of the liquid column (avoid <strong>parallax</strong>).</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="w-8 h-8 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">W</span>
                      <div>
                        <h4 className="font-semibold text-[#1A3D7C]">While-in</h4>
                        <p className="text-gray-700 text-sm"><strong>Read while immersed</strong>; as soon as you take it out, the column <strong>falls</strong>.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 flex items-start">
                  <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Do not</strong> use a lab thermometer to measure body temperature (range/design unsuitable; reading drops on removal).</span>
                </p>
              </div>
            </div>
          </section>

          {/* Mini-Labs */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <TestTube className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Mini-Labs (class-ready)
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <ol className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">1</span>
                  <div>
                    <strong>Touch vs Thermometer:</strong> Do the three-bowl activity; reflect why touch misleads.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">2</span>
                  <div>
                    <strong>Body Temp Log:</strong> Record your temperature <strong>morning/noon/evening</strong> for a week; notice patterns.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">3</span>
                  <div>
                    <strong>Find Least Count:</strong> Inspect your lab thermometer; calculate the smallest division value.
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* HOTS Questions */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-[#2BAE66]" />
              HOTS / Exam-Style Practice
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <ol className="space-y-6 text-gray-700">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">1</span>
                  <div>
                    <p>Why is <strong>touch</strong> unreliable for detecting fever? Use the three-bowl reasoning.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">2</span>
                  <div>
                    <p>List <strong>four</strong> precautions for using a <strong>lab thermometer</strong> and explain <strong>why</strong> for each.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">3</span>
                  <div>
                    <p>A thermometer has <strong>50 divisions</strong> between <strong>0 °C and 100 °C</strong>. What is its <strong>least count</strong>?</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* Quick Recap */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 mr-3 text-[#FFC857]" />
                Quick Recap
              </h2>
              <ul className="space-y-3 text-lg" style={{ wordSpacing: 'normal', letterSpacing: 'normal' }}>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Temperature</strong> measures hotness/coldness; <strong>thermometers</strong> give reliable numbers.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Clinical (digital)</strong>: body only; <strong>Lab</strong>: liquids/air (<strong>–10 to 110 °C</strong> typical).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Read with <strong>V.I.E.W.</strong> (Vertical, Immersed, Eye-level, While-in).</span>
                </li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Help Understanding Temperature Measurement?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Our expert mentors can help you master thermometer usage and temperature concepts with hands-on experiments and real-world applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tutoring/free-consultation">
                  <button className="bg-[#FFC857] text-[#1A3D7C] px-8 py-3 rounded-xl font-semibold hover:bg-[#FFC857]/90 transition-colors">
                    Book Free Session
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#1A3D7C] transition-colors">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A3D7C] text-white py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
                <span className="text-xl font-bold">The TutorBridge</span>
              </div>
              <p className="text-gray-300 mb-4">
                Empowering students with personalized education and career guidance for a brighter future.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/study-resources" className="hover:text-[#2BAE66] transition-colors">Study Resources</Link></li>
                <li><Link href="/homework-help" className="hover:text-[#2BAE66] transition-colors">Doubt Solving</Link></li>
                <li><Link href="/career-guidance" className="hover:text-[#2BAE66] transition-colors">Career Guidance</Link></li>
                <li><Link href="/motivational-sessions" className="hover:text-[#2BAE66] transition-colors">Motivational Sessions</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>info@thetutorbridge.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2026 The TutorBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
