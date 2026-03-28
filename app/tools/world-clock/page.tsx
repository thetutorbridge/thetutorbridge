'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Clock } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function WorldClockPage() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timezones = [
    { city: 'New York', timezone: 'America/New_York', flag: '🇺🇸' },
    { city: 'Los Angeles', timezone: 'America/Los_Angeles', flag: '🇺🇸' },
    { city: 'London', timezone: 'Europe/London', flag: '🇬🇧' },
    { city: 'Paris', timezone: 'Europe/Paris', flag: '🇫🇷' },
    { city: 'Tokyo', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
    { city: 'Sydney', timezone: 'Australia/Sydney', flag: '🇦🇺' },
    { city: 'Dubai', timezone: 'Asia/Dubai', flag: '🇦🇪' },
    { city: 'Singapore', timezone: 'Asia/Singapore', flag: '🇸🇬' },
    { city: 'Mumbai', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
    { city: 'Hong Kong', timezone: 'Asia/Hong_Kong', flag: '🇭🇰' },
    { city: 'Moscow', timezone: 'Europe/Moscow', flag: '🇷🇺' },
    { city: 'Berlin', timezone: 'Europe/Berlin', flag: '🇩🇪' },
  ];

  const getTimeInTimezone = (timezone: string) => {
    return time.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const getDateInTimezone = (timezone: string) => {
    return time.toLocaleDateString('en-US', {
      timeZone: timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      {/* Breadcrumb */}
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
            <span className="text-gray-600">World Clock</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                World Clock
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              See current time in major cities worldwide - Free world clock tool
            </p>
          </div>

          {/* World Clocks Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timezones.map((tz, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border-2 border-gray-200 hover:border-[#2BAE66]"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="text-3xl">{tz.flag}</span>
                    {tz.city}
                  </h3>
                </div>
                <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-lg p-4 text-white text-center">
                  <div className="text-4xl font-bold mb-2 font-mono">
                    {getTimeInTimezone(tz.timezone)}
                  </div>
                  <div className="text-sm opacity-90">
                    {getDateInTimezone(tz.timezone)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About World Clock</h2>
            <p className="text-gray-700 leading-relaxed">
              This world clock displays the current time in major cities across different time zones.
              Perfect for international business, travel planning, coordinating with remote teams,
              or simply knowing what time it is for friends and family around the globe.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
