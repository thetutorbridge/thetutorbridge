'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import Script from 'next/script';

type ConversionType = '24-to-12' | '12-to-24';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is 0800 military time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "0800 military time is 8:00 AM in regular 12-hour time. It is pronounced 'zero eight hundred hours' or 'oh eight hundred hours'."
      }
    },
    {
      "@type": "Question",
      "name": "What is 1300 military time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1300 military time is 1:00 PM in regular time. To convert, subtract 12 from 13 to get 1, then add PM. It's pronounced 'thirteen hundred hours'."
      }
    },
    {
      "@type": "Question",
      "name": "What is 1800 military time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1800 military time is 6:00 PM in regular time. Subtract 12 from 18 to get 6 PM. It's pronounced 'eighteen hundred hours'."
      }
    },
    {
      "@type": "Question",
      "name": "What is 2100 military time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2100 military time is 9:00 PM in regular time. Subtract 12 from 21 to get 9 PM. It's pronounced 'twenty-one hundred hours'."
      }
    },
    {
      "@type": "Question",
      "name": "What is 0000 military time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "0000 military time is 12:00 AM (midnight) in regular time. It marks the start of a new day and is pronounced 'zero hundred hours'."
      }
    },
    {
      "@type": "Question",
      "name": "How do I convert military time to regular time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For times 1300-2359, subtract 12 from the hour and add PM. For 0100-1159, remove leading zero and add AM. For 0000-0059, use 12:XX AM. For 1200-1259, use 12:XX PM."
      }
    },
    {
      "@type": "Question",
      "name": "What is Zulu time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zulu time (Z time) is the military name for Coordinated Universal Time (UTC). It's called 'Zulu' from the NATO phonetic alphabet and is used in aviation, military operations, and international coordination."
      }
    }
  ]
};

export default function MilitaryTimeConverter() {
  const [conversionType, setConversionType] = useState<ConversionType>('24-to-12');
  const [timeInput, setTimeInput] = useState<string>('');
  const [period, setPeriod] = useState<string>('pm');
  const [result, setResult] = useState<{
    regularTime: string;
    militaryTime: string;
    twentyFourHour: string;
  } | null>(null);

  const convertTo12Hour = (militaryTime: string) => {
    const [hours, minutes] = militaryTime.split(':').map(Number);

    if (hours === 0) {
      return { time: `12:${minutes.toString().padStart(2, '0')}`, period: 'am' };
    } else if (hours < 12) {
      return { time: `${hours}:${minutes.toString().padStart(2, '0')}`, period: 'am' };
    } else if (hours === 12) {
      return { time: `12:${minutes.toString().padStart(2, '0')}`, period: 'pm' };
    } else {
      return { time: `${hours - 12}:${minutes.toString().padStart(2, '0')}`, period: 'pm' };
    }
  };

  const convertTo24Hour = (time: string, period: string) => {
    const [hours, minutes] = time.split(':').map(Number);

    let militaryHours = hours;

    if (period === 'am') {
      if (hours === 12) {
        militaryHours = 0;
      }
    } else {
      if (hours !== 12) {
        militaryHours = hours + 12;
      }
    }

    return `${militaryHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleCalculate = () => {
    if (!timeInput) {
      alert('Please enter a time.');
      return;
    }

    const timeRegex = /^(\d{1,2}):?(\d{2})$/;
    const match = timeInput.match(timeRegex);

    if (!match) {
      alert('Please enter a valid time in HH:MM format.');
      return;
    }

    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);

    if (minutes >= 60) {
      alert('Minutes must be less than 60.');
      return;
    }

    if (conversionType === '24-to-12') {
      // Convert 24-hour to 12-hour
      if (hours >= 24) {
        alert('Hours must be less than 24 for military time.');
        return;
      }

      const militaryTime = `${hours.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}`;
      const converted = convertTo12Hour(`${hours}:${minutes}`);

      setResult({
        regularTime: `${converted.time} ${converted.period}`,
        militaryTime: `${militaryTime} hours`,
        twentyFourHour: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
      });
    } else {
      // Convert 12-hour to 24-hour
      if (hours > 12 || hours < 1) {
        alert('Hours must be between 1 and 12 for regular time.');
        return;
      }

      const militaryTime = convertTo24Hour(`${hours}:${minutes}`, period);
      const [milHours] = militaryTime.split(':');
      const militaryFormatted = `${milHours}${minutes.toString().padStart(2, '0')}`;

      setResult({
        regularTime: `${hours}:${minutes.toString().padStart(2, '0')} ${period}`,
        militaryTime: `${militaryFormatted} hours`,
        twentyFourHour: militaryTime,
      });
    }
  };

  const handleClear = () => {
    setTimeInput('');
    setPeriod('pm');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-8 mt-20 mb-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A3D7C] mb-4">
            Military Time Converter (24-Hour to 12-Hour)
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Instantly convert military time (0800, 1300, 1800, 2100) to regular AM/PM time. Free tool for military, aviation, medical, and international time formats.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Calculator Section */}
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border-t-4 border-orange-700">
            <div className="bg-gradient-to-r from-orange-700 to-red-700 text-white text-center py-3 rounded-lg mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Military Time Conversion</h2>
            </div>

            {/* Conversion Type Radio Buttons */}
            <div className="mb-6">
              <Label className="text-base font-semibold text-gray-700 mb-3 block">
                Convert To:
              </Label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="to-24-hour"
                    name="conversionType"
                    value="24-to-12"
                    checked={conversionType === '24-to-12'}
                    onChange={(e) => setConversionType(e.target.value as ConversionType)}
                    className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                  />
                  <label htmlFor="to-24-hour" className="ml-3 text-base text-gray-700">
                    24 hour military time
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="to-12-hour"
                    name="conversionType"
                    value="12-to-24"
                    checked={conversionType === '12-to-24'}
                    onChange={(e) => setConversionType(e.target.value as ConversionType)}
                    className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                  />
                  <label htmlFor="to-12-hour" className="ml-3 text-base text-gray-700">
                    12 hour regular time
                  </label>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-600 italic mb-6">
              {conversionType === '24-to-12' ? 'Input 12 hour time' : 'Input 24 hour time'}
            </p>

            {/* Time Input */}
            <div className="mb-6">
              <Label htmlFor="time" className="text-base font-semibold text-gray-700 mb-2 block">
                Time:
              </Label>
              <div className="flex gap-2">
                <Input
                  id="time"
                  type="text"
                  value={timeInput}
                  onChange={(e) => setTimeInput(e.target.value)}
                  className="text-lg p-3 border-2 border-gray-300 focus:border-orange-500 flex-1"
                  placeholder={conversionType === '24-to-12' ? '13:00' : '1:00'}
                />
                {conversionType === '12-to-24' && (
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-24 border-2 border-gray-300 focus:border-orange-500 text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="am">am</SelectItem>
                      <SelectItem value="pm">pm</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button
                onClick={handleClear}
                variant="outline"
                className="py-6 text-lg font-semibold border-2 border-gray-300 hover:bg-gray-100"
              >
                Clear
              </Button>
              <Button
                onClick={handleCalculate}
                className="py-6 text-lg font-semibold bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800"
              >
                Calculate
              </Button>
            </div>

            {/* Answer Section */}
            {result && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Answer:</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border-2 border-gray-300">
                    <tbody className="text-gray-700">
                      <tr className="bg-white">
                        <td className="border-2 border-gray-300 p-3 font-semibold">Regular time</td>
                        <td className="border-2 border-gray-300 p-3 text-blue-600 font-semibold">{result.regularTime}</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border-2 border-gray-300 p-3 font-semibold">Military time</td>
                        <td className="border-2 border-gray-300 p-3 text-blue-600 font-semibold">{result.militaryTime}</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="border-2 border-gray-300 p-3 font-semibold">24 Hour time</td>
                        <td className="border-2 border-gray-300 p-3 text-blue-600 font-semibold">{result.twentyFourHour}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Solution/Info Section */}
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
            <h3 className="text-2xl font-bold text-[#1A3D7C] mb-6 pb-3 border-b-2 border-gray-200">
              How It Works
            </h3>

            {result ? (
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <p className="font-semibold mb-2">Conversion Explanation:</p>
                  {conversionType === '24-to-12' ? (
                    <div className="text-base space-y-2">
                      <p>Converting <span className="font-semibold">{result.twentyFourHour}</span> (24-hour) to 12-hour format:</p>
                      <p className="ml-4">• Original time: {result.twentyFourHour}</p>
                      <p className="ml-4">• Regular time: {result.regularTime}</p>
                      <p className="ml-4">• Military format: {result.militaryTime}</p>
                    </div>
                  ) : (
                    <div className="text-base space-y-2">
                      <p>Converting <span className="font-semibold">{result.regularTime}</span> (12-hour) to 24-hour format:</p>
                      <p className="ml-4">• Original time: {result.regularTime}</p>
                      <p className="ml-4">• 24-hour format: {result.twentyFourHour}</p>
                      <p className="ml-4">• Military format: {result.militaryTime}</p>
                    </div>
                  )}
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <p className="font-semibold mb-2">Quick Reference:</p>
                  <div className="text-sm space-y-1">
                    <p>• 00:00 - 00:59 = 12:00 am - 12:59 am (midnight hour)</p>
                    <p>• 01:00 - 11:59 = 1:00 am - 11:59 am (morning)</p>
                    <p>• 12:00 - 12:59 = 12:00 pm - 12:59 pm (noon hour)</p>
                    <p>• 13:00 - 23:59 = 1:00 pm - 11:59 pm (afternoon/evening)</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                  Military time (24-hour clock) runs from 0000 (midnight) to 2359 (11:59 PM). The hours from 1 AM to 12 PM are the same in both formats. For PM times, add 12 to the hour (except for 12 PM which stays as 1200).
                </p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Examples:</p>
                  <p className="text-base">1:00 PM = 13:00 = 1300 hours</p>
                  <p className="text-base">3:30 PM = 15:30 = 1530 hours</p>
                  <p className="text-base">11:45 PM = 23:45 = 2345 hours</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Time Conversions - Top Searched */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8 mb-8 border-2 border-blue-200">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Common Military Time Conversions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <h3 className="font-bold text-lg text-orange-700">0800 Military Time</h3>
              <p className="text-2xl font-bold text-gray-800">8:00 AM</p>
              <p className="text-sm text-gray-600">Eight hundred hours</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <h3 className="font-bold text-lg text-orange-700">1300 Military Time</h3>
              <p className="text-2xl font-bold text-gray-800">1:00 PM</p>
              <p className="text-sm text-gray-600">Thirteen hundred hours</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <h3 className="font-bold text-lg text-orange-700">1800 Military Time</h3>
              <p className="text-2xl font-bold text-gray-800">6:00 PM</p>
              <p className="text-sm text-gray-600">Eighteen hundred hours</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <h3 className="font-bold text-lg text-orange-700">2100 Military Time</h3>
              <p className="text-2xl font-bold text-gray-800">9:00 PM</p>
              <p className="text-sm text-gray-600">Twenty-one hundred hours</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <h3 className="font-bold text-lg text-orange-700">0000 Military Time</h3>
              <p className="text-2xl font-bold text-gray-800">12:00 AM</p>
              <p className="text-sm text-gray-600">Midnight (Zero hundred)</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <h3 className="font-bold text-lg text-orange-700">0600 Military Time</h3>
              <p className="text-2xl font-bold text-gray-800">6:00 AM</p>
              <p className="text-sm text-gray-600">Zero six hundred hours</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <h3 className="font-bold text-lg text-orange-700">1500 Military Time</h3>
              <p className="text-2xl font-bold text-gray-800">3:00 PM</p>
              <p className="text-sm text-gray-600">Fifteen hundred hours</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <h3 className="font-bold text-lg text-orange-700">2000 Military Time</h3>
              <p className="text-2xl font-bold text-gray-800">8:00 PM</p>
              <p className="text-sm text-gray-600">Twenty hundred hours</p>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">What is Military Time?</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="text-lg leading-relaxed">
              Military time, also known as the 24-hour clock, is a timekeeping system that runs from 0000 (midnight) to 2359 (one minute before midnight). Unlike the 12-hour clock that repeats twice daily with AM and PM designations, military time continues counting through the day, eliminating any ambiguity about whether a time is in the morning or evening.
            </p>
            <p className="text-lg leading-relaxed">
              This time format is used by the military, emergency services, aviation, hospitals, transportation systems, and most countries worldwide. It's called "military time" in the United States, but it's the standard time format in many countries and is officially known as the 24-hour clock or international standard time notation (ISO 8601).
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Military Time Conversion Chart</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-orange-700 to-red-700 text-white">
                  <th className="border-2 border-gray-300 p-4 text-left">12-Hour (Regular)</th>
                  <th className="border-2 border-gray-300 p-4 text-left">24-Hour</th>
                  <th className="border-2 border-gray-300 p-4 text-left">Military</th>
                  <th className="border-2 border-gray-300 p-4 text-left">Pronounced</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-3">12:00 AM (Midnight)</td>
                  <td className="border-2 border-gray-300 p-3 font-semibold">00:00</td>
                  <td className="border-2 border-gray-300 p-3">0000 hours</td>
                  <td className="border-2 border-gray-300 p-3">Zero hundred hours</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-3">1:00 AM</td>
                  <td className="border-2 border-gray-300 p-3 font-semibold">01:00</td>
                  <td className="border-2 border-gray-300 p-3">0100 hours</td>
                  <td className="border-2 border-gray-300 p-3">Zero one hundred hours</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-3">6:00 AM</td>
                  <td className="border-2 border-gray-300 p-3 font-semibold">06:00</td>
                  <td className="border-2 border-gray-300 p-3">0600 hours</td>
                  <td className="border-2 border-gray-300 p-3">Zero six hundred hours</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-3">12:00 PM (Noon)</td>
                  <td className="border-2 border-gray-300 p-3 font-semibold">12:00</td>
                  <td className="border-2 border-gray-300 p-3">1200 hours</td>
                  <td className="border-2 border-gray-300 p-3">Twelve hundred hours</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-3">1:00 PM</td>
                  <td className="border-2 border-gray-300 p-3 font-semibold">13:00</td>
                  <td className="border-2 border-gray-300 p-3">1300 hours</td>
                  <td className="border-2 border-gray-300 p-3">Thirteen hundred hours</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-3">6:00 PM</td>
                  <td className="border-2 border-gray-300 p-3 font-semibold">18:00</td>
                  <td className="border-2 border-gray-300 p-3">1800 hours</td>
                  <td className="border-2 border-gray-300 p-3">Eighteen hundred hours</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-3">11:59 PM</td>
                  <td className="border-2 border-gray-300 p-3 font-semibold">23:59</td>
                  <td className="border-2 border-gray-300 p-3">2359 hours</td>
                  <td className="border-2 border-gray-300 p-3">Twenty-three fifty-nine hours</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">How to Convert Military Time</h2>
          <div className="prose max-w-none text-gray-700">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-3">From Military to Regular Time</h3>
                <ol className="space-y-3 text-base">
                  <li><span className="font-semibold">1. For times 0000-0059:</span> Add 12 hours and use AM (midnight hour)</li>
                  <li><span className="font-semibold">2. For times 0100-1159:</span> Remove leading zero, use AM</li>
                  <li><span className="font-semibold">3. For time 1200-1259:</span> Keep as 12:XX PM (noon hour)</li>
                  <li><span className="font-semibold">4. For times 1300-2359:</span> Subtract 12 from hours, use PM</li>
                </ol>
                <div className="bg-white p-4 rounded mt-4">
                  <p className="font-semibold text-sm">Example:</p>
                  <p className="text-sm">1530 hours → 15 - 12 = 3 → 3:30 PM</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-3">From Regular to Military Time</h3>
                <ol className="space-y-3 text-base">
                  <li><span className="font-semibold">1. For 12:00 AM - 12:59 AM:</span> Use 00:00 - 00:59</li>
                  <li><span className="font-semibold">2. For 1:00 AM - 11:59 AM:</span> Add leading zero if needed</li>
                  <li><span className="font-semibold">3. For 12:00 PM - 12:59 PM:</span> Keep as 12:00 - 12:59</li>
                  <li><span className="font-semibold">4. For 1:00 PM - 11:59 PM:</span> Add 12 to the hour</li>
                </ol>
                <div className="bg-white p-4 rounded mt-4">
                  <p className="font-semibold text-sm">Example:</p>
                  <p className="text-sm">8:45 PM → 8 + 12 = 20 → 20:45 or 2045 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Who Uses Military Time?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border-2 border-orange-200">
              <h3 className="text-xl font-bold text-orange-800 mb-3">Professional Fields</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Military and armed forces</li>
                <li>• Aviation and airports</li>
                <li>• Emergency services (police, fire, EMS)</li>
                <li>• Hospitals and medical facilities</li>
                <li>• Transportation (trains, buses)</li>
                <li>• Maritime and shipping</li>
                <li>• Space agencies (NASA)</li>
                <li>• Scientific research</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
              <h3 className="text-xl font-bold text-purple-800 mb-3">Global Usage</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Most European countries</li>
                <li>• Asian countries</li>
                <li>• Latin American countries</li>
                <li>• African countries</li>
                <li>• Australia and New Zealand</li>
                <li>• International organizations</li>
                <li>• Global telecommunications</li>
                <li>• Computer systems and programming</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Why is it called military time?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                It's called "military time" in the United States because the armed forces adopted the 24-hour clock to avoid confusion in operations where precision timing is critical. However, this is the standard time format used by most countries worldwide and is officially called the 24-hour clock or international standard time notation.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What is 0000 hours in military time?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                0000 hours (pronounced "zero hundred hours") is midnight, or 12:00 AM in regular time. It marks the beginning of a new day in the 24-hour clock. One minute before midnight is 2359 hours (11:59 PM), and one minute after midnight is 0001 hours (12:01 AM).
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Is 12:00 PM noon or midnight?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                12:00 PM is noon (midday) in 12-hour time, which is 1200 hours in military time. Midnight is 12:00 AM, which is 0000 hours in military time. To avoid confusion, many prefer to say "12 noon" and "12 midnight" instead of using AM/PM for these times.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How do you say military time out loud?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Military time is pronounced by stating the digits followed by "hundred hours." For example, 0800 is "zero eight hundred hours," 1530 is "fifteen thirty hours," and 2100 is "twenty-one hundred hours." Minutes other than multiples of 100 are stated individually (e.g., 1545 is "fifteen forty-five hours").
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What is Zulu time?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Zulu time (Z time) is the military name for Coordinated Universal Time (UTC), the primary time standard used worldwide. It's called "Zulu" from the NATO phonetic alphabet letter Z. Zulu time is used in aviation, military, and other fields where coordinating across time zones is essential. For example, 1400Z means 14:00 UTC.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Do all countries use the 24-hour clock?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Most countries around the world use the 24-hour clock as their standard time format in daily life. The United States, Canada, Australia, New Zealand, the Philippines, and a few other countries primarily use the 12-hour clock with AM/PM in informal settings, though they often use the 24-hour clock in professional contexts like medicine, aviation, and military.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Is there a colon in military time?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                In formal military notation, times are written as four digits without a colon (e.g., 1430 hours), though the 24-hour clock commonly uses a colon in civilian contexts (14:30). When writing military time, you can use either format, but the four-digit format without punctuation is traditional in military and aviation use.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How do I learn to read military time quickly?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                The easiest trick: For times after 12:00 PM, simply subtract 12 from the hour. For example, 17:00 - 12 = 5:00 PM, 20:00 - 12 = 8:00 PM. For morning times (before noon), just remove the leading zero if present. With practice, you'll start recognizing common times automatically (1800 is dinner time, 0900 is mid-morning, etc.).
              </p>
            </div>
          </div>
        </div>

        {/* Book Your Session CTA */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-xl shadow-2xl p-8 md:p-12 text-center text-white mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help with Time Concepts or Math?</h2>
          <p className="text-xl mb-6 text-gray-100">
            Our expert tutors can help you master time conversions, calculations, and all academic subjects
          </p>
          <Link
            href="/tutoring/free-consultation"
            className="inline-block bg-white text-[#1A3D7C] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Book Your Free Demo Session
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
