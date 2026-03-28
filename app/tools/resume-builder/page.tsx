'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, FileText } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function ResumeBuilderPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [summary, setSummary] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');

  const printResume = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <div className="bg-gray-50 py-4 px-6 print:hidden">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/tools" className="text-[#1A3D7C] hover:text-[#2BAE66]">
              Tools
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Resume Builder</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 print:bg-white print:py-0">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 print:hidden">
            <div className="flex items-center justify-center mb-4">
              <FileText className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Resume Builder
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Create your professional resume
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 print:shadow-none print:rounded-none">
            <div className="mb-6 text-center print:mb-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Full Name"
                className="w-full px-4 py-3 text-3xl font-bold text-center border-b-2 border-gray-300 focus:border-[#2BAE66] focus:outline-none text-gray-900 print:border-none mb-2"
              />
              <div className="flex justify-center gap-4 text-sm text-gray-600">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="px-3 py-1 border-b border-gray-300 focus:border-[#2BAE66] focus:outline-none print:border-none"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(123) 456-7890"
                  className="px-3 py-1 border-b border-gray-300 focus:border-[#2BAE66] focus:outline-none print:border-none"
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#2BAE66] pb-1">
                Professional Summary
              </h3>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Brief summary of your professional background and goals..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#2BAE66] focus:outline-none text-gray-900 print:border-none print:p-0"
                rows={3}
              />
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#2BAE66] pb-1">
                Experience
              </h3>
              <textarea
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Job Title | Company | Date&#10;• Achievement or responsibility&#10;• Achievement or responsibility&#10;&#10;Job Title | Company | Date&#10;• Achievement or responsibility"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#2BAE66] focus:outline-none text-gray-900 print:border-none print:p-0"
                rows={8}
              />
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#2BAE66] pb-1">
                Education
              </h3>
              <textarea
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="Degree | University | Year&#10;Degree | University | Year"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#2BAE66] focus:outline-none text-gray-900 print:border-none print:p-0"
                rows={4}
              />
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#2BAE66] pb-1">
                Skills
              </h3>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="• Skill 1&#10;• Skill 2&#10;• Skill 3"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#2BAE66] focus:outline-none text-gray-900 print:border-none print:p-0"
                rows={4}
              />
            </div>

            <button
              onClick={printResume}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg print:hidden"
            >
              Print Resume
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
