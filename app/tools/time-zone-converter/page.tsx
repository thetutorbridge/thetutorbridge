'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Globe, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function TimeZoneConverterPage() {
  const [sourceTime, setSourceTime] = useState('12:00');
  const [sourceZone, setSourceZone] = useState('America/New_York');

  const timezones = [
    { label: 'New York (EST/EDT)', value: 'America/New_York' },
    { label: 'Los Angeles (PST/PDT)', value: 'America/Los_Angeles' },
    { label: 'Chicago (CST/CDT)', value: 'America/Chicago' },
    { label: 'London (GMT/BST)', value: 'Europe/London' },
    { label: 'Paris (CET/CEST)', value: 'Europe/Paris' },
    { label: 'Berlin (CET/CEST)', value: 'Europe/Berlin' },
    { label: 'Tokyo (JST)', value: 'Asia/Tokyo' },
    { label: 'Sydney (AEDT/AEST)', value: 'Australia/Sydney' },
    { label: 'Dubai (GST)', value: 'Asia/Dubai' },
    { label: 'Singapore (SGT)', value: 'Asia/Singapore' },
    { label: 'Mumbai (IST)', value: 'Asia/Kolkata' },
    { label: 'Hong Kong (HKT)', value: 'Asia/Hong_Kong' },
  ];

  const convertTime = (targetZone: string) => {
    const [hours, minutes] = sourceTime.split(':').map(Number);
    const sourceDate = new Date();
    sourceDate.setHours(hours, minutes, 0, 0);

    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: targetZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return formatter.format(sourceDate);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <div className="bg-gray-50 py-4 px-6">
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
            <span className="text-gray-600">Time Zone Converter</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Globe className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Time Zone Converter
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Convert time between different time zones - Free timezone converter
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Time
                </label>
                <input
                  type="time"
                  value={sourceTime}
                  onChange={(e) => setSourceTime(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 text-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  From Time Zone
                </label>
                <select
                  value={sourceZone}
                  onChange={(e) => setSourceZone(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 font-semibold"
                >
                  {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Converted Times</h2>
            <div className="space-y-3">
              {timezones.map((tz) => (
                <div
                  key={tz.value}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border-2 border-gray-200"
                >
                  <span className="font-semibold text-gray-700">{tz.label}</span>
                  <span className="text-2xl font-bold text-[#1A3D7C]">
                    {convertTime(tz.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
