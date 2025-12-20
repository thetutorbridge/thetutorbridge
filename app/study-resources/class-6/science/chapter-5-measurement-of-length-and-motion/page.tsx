import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, User, Mail, Ruler, Move, Target, RotateCcw, Zap, Home, GraduationCap, Beaker } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Class 6 Science Chapter 5 Notes – Measurement of Length and Motion (Easy & Conceptual)',
  description: 'Download Class 6 Science Chapter 5 notes – Measurement of Length and Motion. Covers SI units, conversions (km, m, cm, mm), correct measurement methods, parallax error, reference point, types of motion (linear, circular, oscillatory), and exam-ready key points with daily life examples.',
};

export default function Chapter5Page() {
  return (
    <div className="min-h-screen bg-white" style={{ wordSpacing: 'normal', letterSpacing: 'normal' }}>
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
              <span className="hidden sm:inline">Chapter 5 - Measurement of Length and Motion</span>
              <span className="sm:hidden">Ch 5</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Ruler className="w-12 h-12 text-[#FFC857] mr-4" />
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
              Chapter 5: Measurement of Length and Motion
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            From handspans to metre scales, and from milestones to motion—this chapter builds the habits of measuring right and thinking in reference points.
          </p>
          <div className="bg-white/10 p-4 rounded-xl mb-8">
            <p className="text-lg italic">A carpenter needs to measure wood for a table.<br />
            How can he ensure everyone gets the same measurement? → <strong>Use standard units!</strong></p>
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
                <Zap className="w-6 h-6 mr-3 text-[#FFC857]" />
                Big Ideas (at a glance)
              </h2>
              <ul className="space-y-3 text-lg" style={{ wordSpacing: 'normal', letterSpacing: 'normal' }}>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>We need <strong>standard units</strong> so everyone gets the <em>same</em> answer for the same length.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>SI unit of length = metre (m)</strong>; other useful units: <strong>km, cm, mm</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Measure right</strong>: correct tool, correct placement, correct eye position (no parallax), and correct notation.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Reference point</strong> tells <em>where</em> something is; <strong>motion</strong> means position changes with time <em>relative to</em> that reference.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Types of motion you'll see everywhere: <strong>linear</strong>, <strong>circular</strong>, <strong>oscillatory</strong>; some are <strong>periodic</strong>.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Why Standard Units */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Target className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Why Standard Units?
            </h2>
            <div className="bg-white border-l-4 border-[#2BAE66] p-6 rounded-r-lg shadow-sm">
              <ul className="space-y-4 text-gray-700" style={{ wordSpacing: 'normal', letterSpacing: 'normal' }}>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Body-part units (handspan, foot, arm length) vary from person to person → results differ.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Countries agreed on <strong>SI units</strong> to avoid confusion in trade, travel, and science.</span>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-[#FFC857]/10 rounded-lg">
                <h3 className="font-semibold text-[#1A3D7C] mb-2">🧠 Memory Hook — "k→m→cm→mm"</h3>
                <p className="text-gray-700">
                  Think of a <strong>ladder</strong> that zooms in by ×10 steps:<br/>
                  <strong>1km = 1000m</strong>, <strong>1m = 100cm</strong>, <strong>1cm = 10mm</strong>.
                </p>
              </div>

              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">
                  ✅ <strong>Symbols are lowercase</strong> (km, m, cm, mm), no plural <strong>s</strong>, and <strong>no space</strong> between number and unit: <code>12cm</code>, not <code>12 cm</code>.
                </p>
              </div>
            </div>
          </section>

          {/* Choosing the Right Measuring Tool */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Ruler className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Choosing the Right Measuring Tool
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-4">Tool Selection Guide</h3>
                <ul className="space-y-3 text-gray-700">
                  <li><strong>15-cm scale</strong> → small objects (eraser, coin, leaf)</li>
                  <li><strong>Metre scale</strong> → classroom objects, furniture, door height</li>
                  <li><strong>Flexible tape</strong> → curved or round things (tree trunk, chest size)</li>
                  <li><strong>Kilometre</strong> readings/milestones → long distances (towns, roads)</li>
                  <li><strong>Inches</strong> may appear on some scales; <strong>1 inch = 2.54cm</strong></li>
                </ul>
              </div>
              
              <div className="bg-[#2BAE66]/10 p-6 rounded-lg">
                <h3 className="font-semibold text-[#1A3D7C] mb-4">🧩 Tool Picker Rule</h3>
                <p className="text-gray-700">
                  If it's <strong>curved or round</strong>, use <strong>flexible tape</strong> or <strong>thread method</strong>; 
                  if it's <strong>straight and small</strong>, use a <strong>short scale</strong>; 
                  <strong>bigger</strong>, use a <strong>metre scale</strong> or <strong>long tape</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Measure Correctly */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Target className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Measure Correctly (avoid the classic mistakes)
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <ol className="space-y-4 text-gray-700" style={{ wordSpacing: 'normal', letterSpacing: 'normal' }}>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">1</span>
                  <span><strong>Place the scale flush</strong> along the object's length.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">2</span>
                  <span><strong>Eye above the mark</strong> (avoid parallax): keep your eye <strong>perpendicular</strong> to the scale at the reading point.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">3</span>
                  <span><strong>Broken zero?</strong> Start from a full mark (say <strong>1.0cm</strong>) and <strong>subtract</strong> the starting reading from the ending reading.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">4</span>
                  <span><strong>Curved line?</strong> Lay a <strong>thread</strong> along the curve, then straighten it and measure with a scale.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">5</span>
                  <span><strong>Record properly</strong>: value + unit (e.g., <code>9.4cm</code>).</span>
                </li>
              </ol>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-[#1A3D7C] mb-2">🧪 Mini-lab</h3>
                <p className="text-gray-700">
                  Measure a page thickness by measuring <strong>100 pages</strong> together, then divide by 100 for better accuracy.
                </p>
              </div>
            </div>
          </section>

          {/* Describing Position */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Target className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Describing Position — the Reference Point Idea
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <ul className="space-y-4 text-gray-700 mb-6" style={{ wordSpacing: 'normal', letterSpacing: 'normal' }}>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>A <strong>reference point</strong> is a fixed place you measure from (bus stand, "0km" stone, centre line on a field).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Everyone using the <strong>same reference point</strong> will agree on distances and positions.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Milestones</strong> (e.g., "Delhi 70km" → "Delhi 60km") tell how far you are <strong>from Delhi</strong>—your position changes with time as you move.</span>
                </li>
              </ul>
              
              <div className="p-4 bg-[#FFC857]/10 rounded-lg">
                <h3 className="font-semibold text-[#1A3D7C] mb-2">💡 Mind Trick — "From where?"</h3>
                <p className="text-gray-700">
                  Whenever you hear a distance, ask: <strong>From where?</strong> That's your reference point.
                </p>
              </div>
            </div>
          </section>

          {/* Rest vs Motion */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Move className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Rest vs Motion (it depends on reference!)
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-4">In Motion</h3>
                <p className="text-gray-700">
                  Position changes <strong>with time relative to</strong> a reference point.
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-4">At Rest</h3>
                <p className="text-gray-700">
                  Position does <strong>not</strong> change relative to that point.
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-gray-700">
                <strong>Bus example:</strong> Passengers are <strong>at rest</strong> relative to the bus, but <strong>in motion</strong> relative to trees outside.
              </p>
            </div>
            
            <div className="mt-4 p-4 bg-[#FFC857]/10 rounded-lg">
              <h3 className="font-semibold text-[#1A3D7C] mb-2">🧠 Switch the frame</h3>
              <p className="text-gray-700">
                Change the reference, and rest ↔ motion judgment can change!
              </p>
            </div>
          </section>

          {/* Types of Motion */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <RotateCcw className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Types of Motion (with daily-life examples)
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-4">A) Linear Motion</h3>
                <p className="text-sm text-gray-600 mb-3">(straight-line path)</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Falling apple</li>
                  <li>• Marching parade</li>
                  <li>• Box pushed straight</li>
                  <li>• Car on straight road</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-4">B) Circular Motion</h3>
                <p className="text-sm text-gray-600 mb-3">(around a centre)</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Merry-go-round</li>
                  <li>• Spinning fan blades</li>
                  <li>• Stone tied to string</li>
                  <li>• Whirled object</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-4">C) Oscillatory Motion</h3>
                <p className="text-sm text-gray-600 mb-3">(to-and-fro about fixed position)</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Swing in park</li>
                  <li>• Pendulum</li>
                  <li>• Bent ruler released</li>
                  <li>• Load on spring</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-[#1A3D7C] mb-4">D) Periodic Motion</h3>
                <p className="text-sm text-gray-600 mb-3">(repeats after equal time intervals)</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Many circular motions</li>
                  <li>• Many oscillatory motions</li>
                  <li>• Fan blades</li>
                  <li>• Pendulum swings</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-[#FFC857]/10 rounded-lg">
              <h3 className="font-semibold text-[#1A3D7C] mb-2">🧠 Memory Hook — "Li-Ci-Os (LEE-SEE-OSS)"</h3>
              <p className="text-gray-700">
                <strong>Li</strong>near, <strong>Ci</strong>rcular, <strong>Os</strong>cillatory → classify any motion you see.
              </p>
            </div>
          </section>

          {/* Conversion & Notation */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Ruler className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Conversion & Notation Quick Sheet
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-[#1A3D7C] mb-4">Unit Conversions</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>km → m:</strong> ×1000 (e.g., 1.5km = <strong>1500m</strong>)</li>
                    <li><strong>m → cm:</strong> ×100 (e.g., 2m = <strong>200cm</strong>)</li>
                    <li><strong>cm → mm:</strong> ×10 (e.g., 9.4cm = <strong>94mm</strong>)</li>
                    <li><strong>in → cm:</strong> ×2.54 (e.g., 3in ≈ <strong>7.62cm</strong>)</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-[#1A3D7C] mb-2">✍️ Write like a pro</h3>
                  <p className="text-gray-700">
                    <code>5m</code>, <code>27cm</code>, <code>3mm</code>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Exam Traps & Fixes */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Target className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Typical Exam/Practical Traps & Fixes
            </h2>
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <ul className="space-y-4 text-gray-700" style={{ wordSpacing: 'normal', letterSpacing: 'normal' }}>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Wrong eye angle (parallax):</strong> always look <strong>straight above</strong> the mark.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Starting from a broken zero:</strong> start at <strong>1.0cm</strong> (or any clear mark) and <strong>subtract</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Curved lengths with rigid scales:</strong> use <strong>thread/tape</strong> first, then a scale.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Wrong unit choice:</strong> don't measure road distance in <strong>metres</strong> or page thickness in <strong>centimetres</strong>—pick sensible units.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* HOTS Questions */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Zap className="w-8 h-8 mr-3 text-[#2BAE66]" />
              HOTS / Practice Prompts
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <ol className="space-y-6 text-gray-700">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">1</span>
                  <div>
                    <p>You and your friend measure the same desk—your answers differ. List <strong>three reasons</strong> and how to avoid them.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">2</span>
                  <div>
                    <p>A string light must go along an arch. Describe a <strong>two-step</strong> method to get its exact length.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">3</span>
                  <div>
                    <p>From a moving train with <strong>closed windows</strong>, can you tell if it's moving at constant speed? Explain with the <strong>reference point</strong> idea.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">4</span>
                  <div>
                    <p>Classify motions you see in a park: swing, slide, roundabout, running child, rotating sprinkler—<strong>with reasons</strong>.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">5</span>
                  <div>
                    <p>A kilometre stone changes from "City A 120km" to "City A 95km". What changed: <strong>position or reference</strong>? Explain.</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* Suggested Visuals */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <BookOpen className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Suggested Visuals for Your Notes
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <ul className="space-y-3 text-gray-700" style={{ wordSpacing: 'normal', letterSpacing: 'normal' }}>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Unit Ladder Poster:</strong> km ⇄ m ⇄ cm ⇄ mm with ×/÷ arrows.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Correct Reading Diagram:</strong> eye position A/B/C—only <strong>B</strong> is correct (no parallax).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Broken-Zero Method:</strong> start at 1.0cm → end at 10.4cm → length = 9.4cm.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Curved-Line Method:</strong> thread along curve → straighten → measure.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#2BAE66] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Motion Gallery:</strong> linear vs circular vs oscillatory, and a <strong>periodic</strong> label for repeating ones.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Quick Recap */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-3 text-[#FFC857]" />
                Quick Recap
              </h2>
              <ul className="space-y-3 text-lg" style={{ wordSpacing: 'normal', letterSpacing: 'normal' }}>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>SI length unit</strong>: metre (m); conversions among <strong>km, m, cm, mm</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Accurate measuring needs <strong>right tool</strong>, <strong>right placement</strong>, <strong>right eye</strong>, and <strong>right notation</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Reference point</strong> defines position; <strong>motion</strong> = changing position with time relative to it.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Recognise and classify <strong>linear, circular, oscillatory</strong> motions; many are <strong>periodic</strong>.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12">
            <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Help Understanding Measurement and Motion?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Our expert mentors can help you master these concepts with practical examples and interactive sessions.
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
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@thetutorbridge.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 The TutorBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
