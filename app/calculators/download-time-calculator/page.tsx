'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, Download, BookOpen, ArrowRight, Info, RefreshCw, Wifi, Clock, HardDrive } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type FileSizeUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB';
type SpeedUnit = 'bps' | 'Kbps' | 'Mbps' | 'Gbps';
type TimeUnit = 'sec' | 'min' | 'hrs';
type CalculationMode = 'time' | 'speed' | 'size';

interface DownloadResult {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  fileSizeInBits: number;
  speedInBps: number;
  formattedTime: string;
}

// Conversion factors to bytes
const fileSizeToBytes: Record<FileSizeUnit, number> = {
  'B': 1,
  'KB': 1024,
  'MB': 1024 * 1024,
  'GB': 1024 * 1024 * 1024,
  'TB': 1024 * 1024 * 1024 * 1024,
};

// Conversion factors to bits per second
const speedToBps: Record<SpeedUnit, number> = {
  'bps': 1,
  'Kbps': 1000,
  'Mbps': 1000000,
  'Gbps': 1000000000,
};

// Time unit to seconds
const timeToSeconds: Record<TimeUnit, number> = {
  'sec': 1,
  'min': 60,
  'hrs': 3600,
};

export default function DownloadTimeCalculator() {
  const [fileSize, setFileSize] = useState<string>('');
  const [fileSizeUnit, setFileSizeUnit] = useState<FileSizeUnit>('MB');
  const [downloadSpeed, setDownloadSpeed] = useState<string>('');
  const [speedValue, setSpeedValue] = useState<SpeedUnit>('Mbps');
  const [timeHours, setTimeHours] = useState<string>('');
  const [timeMinutes, setTimeMinutes] = useState<string>('');
  const [timeSeconds, setTimeSeconds] = useState<string>('');
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('time');
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [calculatedSpeed, setCalculatedSpeed] = useState<number | null>(null);
  const [calculatedSize, setCalculatedSize] = useState<number | null>(null);

  // Auto-calculate when inputs change
  useEffect(() => {
    if (calculationMode === 'time') {
      calculateDownloadTime();
    } else if (calculationMode === 'speed') {
      calculateRequiredSpeed();
    } else if (calculationMode === 'size') {
      calculateFileSize();
    }
  }, [fileSize, fileSizeUnit, downloadSpeed, speedValue, timeHours, timeMinutes, timeSeconds, calculationMode]);

  const calculateDownloadTime = () => {
    const size = parseFloat(fileSize);
    const speed = parseFloat(downloadSpeed);

    if (isNaN(size) || isNaN(speed) || size <= 0 || speed <= 0) {
      setResult(null);
      return;
    }

    // Convert file size to bits (1 byte = 8 bits)
    const fileSizeInBytes = size * fileSizeToBytes[fileSizeUnit];
    const fileSizeInBits = fileSizeInBytes * 8;

    // Convert speed to bits per second
    const speedInBps = speed * speedToBps[speedValue];

    // Calculate time in seconds
    const totalSeconds = fileSizeInBits / speedInBps;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    // Format time string
    let formattedTime = '';
    if (hours > 0) formattedTime += `${hours}h `;
    if (minutes > 0 || hours > 0) formattedTime += `${minutes}m `;
    formattedTime += `${seconds}s`;

    setResult({
      hours,
      minutes,
      seconds,
      totalSeconds,
      fileSizeInBits,
      speedInBps,
      formattedTime: formattedTime.trim(),
    });
  };

  const calculateRequiredSpeed = () => {
    const size = parseFloat(fileSize);
    const hrs = parseFloat(timeHours) || 0;
    const mins = parseFloat(timeMinutes) || 0;
    const secs = parseFloat(timeSeconds) || 0;

    const totalTimeSeconds = hrs * 3600 + mins * 60 + secs;

    if (isNaN(size) || size <= 0 || totalTimeSeconds <= 0) {
      setCalculatedSpeed(null);
      return;
    }

    const fileSizeInBytes = size * fileSizeToBytes[fileSizeUnit];
    const fileSizeInBits = fileSizeInBytes * 8;
    const requiredSpeedBps = fileSizeInBits / totalTimeSeconds;
    const requiredSpeedMbps = requiredSpeedBps / 1000000;

    setCalculatedSpeed(requiredSpeedMbps);
  };

  const calculateFileSize = () => {
    const speed = parseFloat(downloadSpeed);
    const hrs = parseFloat(timeHours) || 0;
    const mins = parseFloat(timeMinutes) || 0;
    const secs = parseFloat(timeSeconds) || 0;

    const totalTimeSeconds = hrs * 3600 + mins * 60 + secs;

    if (isNaN(speed) || speed <= 0 || totalTimeSeconds <= 0) {
      setCalculatedSize(null);
      return;
    }

    const speedInBps = speed * speedToBps[speedValue];
    const totalBits = speedInBps * totalTimeSeconds;
    const totalBytes = totalBits / 8;
    const totalMB = totalBytes / (1024 * 1024);

    setCalculatedSize(totalMB);
  };

  const handleClear = () => {
    setFileSize('');
    setDownloadSpeed('');
    setTimeHours('');
    setTimeMinutes('');
    setTimeSeconds('');
    setResult(null);
    setCalculatedSpeed(null);
    setCalculatedSize(null);
  };

  const formatFileSize = (mb: number): string => {
    if (mb >= 1024 * 1024) {
      return `${(mb / (1024 * 1024)).toFixed(2)} TB`;
    } else if (mb >= 1024) {
      return `${(mb / 1024).toFixed(2)} GB`;
    } else if (mb >= 1) {
      return `${mb.toFixed(2)} MB`;
    } else {
      return `${(mb * 1024).toFixed(2)} KB`;
    }
  };

  const formatSpeed = (mbps: number): string => {
    if (mbps >= 1000) {
      return `${(mbps / 1000).toFixed(2)} Gbps`;
    } else if (mbps >= 1) {
      return `${mbps.toFixed(2)} Mbps`;
    } else {
      return `${(mbps * 1000).toFixed(2)} Kbps`;
    }
  };

  const formatTime = (totalSeconds: number): string => {
    if (totalSeconds < 60) {
      return `${totalSeconds.toFixed(1)} seconds`;
    } else if (totalSeconds < 3600) {
      const mins = Math.floor(totalSeconds / 60);
      const secs = Math.floor(totalSeconds % 60);
      return `${mins} min ${secs} sec`;
    } else if (totalSeconds < 86400) {
      const hrs = Math.floor(totalSeconds / 3600);
      const mins = Math.floor((totalSeconds % 3600) / 60);
      return `${hrs} hr ${mins} min`;
    } else {
      const days = Math.floor(totalSeconds / 86400);
      const hrs = Math.floor((totalSeconds % 86400) / 3600);
      return `${days} day${days > 1 ? 's' : ''} ${hrs} hr`;
    }
  };

  // Common download scenarios for quick reference
  const commonScenarios = [
    { name: 'HD Movie (4 GB)', size: 4, unit: 'GB' as FileSizeUnit },
    { name: '4K Movie (20 GB)', size: 20, unit: 'GB' as FileSizeUnit },
    { name: 'Game Update (50 GB)', size: 50, unit: 'GB' as FileSizeUnit },
    { name: 'Large Game (100 GB)', size: 100, unit: 'GB' as FileSizeUnit },
    { name: 'Music Album (100 MB)', size: 100, unit: 'MB' as FileSizeUnit },
    { name: 'Photo (5 MB)', size: 5, unit: 'MB' as FileSizeUnit },
  ];

  // Internet speed presets
  const speedPresets = [
    { name: '2G Mobile', speed: 0.1, unit: 'Mbps' as SpeedUnit },
    { name: '3G Mobile', speed: 3, unit: 'Mbps' as SpeedUnit },
    { name: '4G/LTE', speed: 25, unit: 'Mbps' as SpeedUnit },
    { name: '5G', speed: 100, unit: 'Mbps' as SpeedUnit },
    { name: 'Basic Broadband', speed: 10, unit: 'Mbps' as SpeedUnit },
    { name: 'Fast Broadband', speed: 50, unit: 'Mbps' as SpeedUnit },
    { name: 'Fiber 100', speed: 100, unit: 'Mbps' as SpeedUnit },
    { name: 'Fiber 500', speed: 500, unit: 'Mbps' as SpeedUnit },
    { name: 'Fiber 1 Gbps', speed: 1, unit: 'Gbps' as SpeedUnit },
  ];

  // JSON-LD Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Download Time Calculator",
    "description": "Free download time calculator to estimate how long a file download will take based on file size and internet speed. Works with MB, GB, TB and Mbps, Gbps speeds.",
    "url": "https://thetutorbridge.com/calculators/download-time-calculator",
    "applicationCategory": "CalculatorApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "provider": {
      "@type": "Organization",
      "name": "The Tutor Bridge",
      "url": "https://thetutorbridge.com"
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I calculate download time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate download time, divide the file size (in bits) by your internet speed (in bits per second). For example, a 1 GB file at 100 Mbps: 1 GB = 8,589,934,592 bits. 8,589,934,592 ÷ 100,000,000 = 85.9 seconds ≈ 1 minute 26 seconds."
        }
      },
      {
        "@type": "Question",
        "name": "Why is my actual download slower than the calculated time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Actual download times are often slower due to network congestion, server limitations, ISP throttling, Wi-Fi interference, distance from server, and overhead from protocols. Real-world speeds are typically 10-30% slower than advertised speeds."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Mbps and MBps?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mbps (megabits per second) measures internet speed, while MBps (megabytes per second) measures file transfer rates. 1 byte = 8 bits, so 100 Mbps = 12.5 MBps. ISPs advertise in Mbps, but downloads show MBps."
        }
      },
      {
        "@type": "Question",
        "name": "How long to download 1 GB at different speeds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "At 10 Mbps: ~13 minutes. At 50 Mbps: ~2.7 minutes. At 100 Mbps: ~1.3 minutes. At 500 Mbps: ~16 seconds. At 1 Gbps: ~8 seconds. These are theoretical maximums; actual times may vary."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-indigo-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-indigo-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Download Time Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Download className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Download Time Calculator
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Calculate how long it will take to download files based on your internet speed. Works with any file size and connection speed.
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Input Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-indigo-600" />
                  Calculate Download
                </h2>

                {/* Calculation Mode Tabs */}
                <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
                  <button
                    onClick={() => setCalculationMode('time')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                      calculationMode === 'time'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Clock className="w-4 h-4 inline mr-1" />
                    Time
                  </button>
                  <button
                    onClick={() => setCalculationMode('speed')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                      calculationMode === 'speed'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Wifi className="w-4 h-4 inline mr-1" />
                    Speed
                  </button>
                  <button
                    onClick={() => setCalculationMode('size')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                      calculationMode === 'size'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <HardDrive className="w-4 h-4 inline mr-1" />
                    Size
                  </button>
                </div>

                {/* Input Fields */}
                <div className="space-y-5">
                  {/* File Size */}
                  {(calculationMode === 'time' || calculationMode === 'speed') && (
                    <div>
                      <Label htmlFor="fileSize" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-gray-500" />
                        File Size
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="fileSize"
                          type="number"
                          placeholder="Enter size"
                          value={fileSize}
                          onChange={(e) => setFileSize(e.target.value)}
                          className="flex-1 text-lg"
                          step="any"
                          min="0"
                        />
                        <Select value={fileSizeUnit} onValueChange={(value: FileSizeUnit) => setFileSizeUnit(value)}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="KB">KB</SelectItem>
                            <SelectItem value="MB">MB</SelectItem>
                            <SelectItem value="GB">GB</SelectItem>
                            <SelectItem value="TB">TB</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Download Speed */}
                  {(calculationMode === 'time' || calculationMode === 'size') && (
                    <div>
                      <Label htmlFor="downloadSpeed" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-gray-500" />
                        Download Speed
                        <Info className="w-3 h-3 text-gray-400" />
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="downloadSpeed"
                          type="number"
                          placeholder="Enter speed"
                          value={downloadSpeed}
                          onChange={(e) => setDownloadSpeed(e.target.value)}
                          className="flex-1 text-lg"
                          step="any"
                          min="0"
                        />
                        <Select value={speedValue} onValueChange={(value: SpeedUnit) => setSpeedValue(value)}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bps">bps</SelectItem>
                            <SelectItem value="Kbps">Kbps</SelectItem>
                            <SelectItem value="Mbps">Mbps</SelectItem>
                            <SelectItem value="Gbps">Gbps</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Download Time (for speed/size calculation) */}
                  {(calculationMode === 'speed' || calculationMode === 'size') && (
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        Download Time
                      </Label>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input
                            type="number"
                            placeholder="hrs"
                            value={timeHours}
                            onChange={(e) => setTimeHours(e.target.value)}
                            className="text-center"
                            min="0"
                          />
                          <p className="text-xs text-gray-500 text-center mt-1">hours</p>
                        </div>
                        <div className="flex-1">
                          <Input
                            type="number"
                            placeholder="min"
                            value={timeMinutes}
                            onChange={(e) => setTimeMinutes(e.target.value)}
                            className="text-center"
                            min="0"
                            max="59"
                          />
                          <p className="text-xs text-gray-500 text-center mt-1">minutes</p>
                        </div>
                        <div className="flex-1">
                          <Input
                            type="number"
                            placeholder="sec"
                            value={timeSeconds}
                            onChange={(e) => setTimeSeconds(e.target.value)}
                            className="text-center"
                            min="0"
                            max="59"
                          />
                          <p className="text-xs text-gray-500 text-center mt-1">seconds</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Clear Button */}
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="w-full mt-6 py-5 text-base font-semibold rounded-xl border-2 hover:bg-gray-50"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear All
                </Button>

                {/* Quick Presets */}
                {calculationMode === 'time' && (
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Quick File Sizes:</p>
                    <div className="flex flex-wrap gap-2">
                      {commonScenarios.slice(0, 4).map((scenario) => (
                        <button
                          key={scenario.name}
                          onClick={() => {
                            setFileSize(scenario.size.toString());
                            setFileSizeUnit(scenario.unit);
                          }}
                          className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 rounded-full transition-colors"
                        >
                          {scenario.name}
                        </button>
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-gray-700 mb-3 mt-4">Speed Presets:</p>
                    <div className="flex flex-wrap gap-2">
                      {speedPresets.slice(2, 7).map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => {
                            setDownloadSpeed(preset.speed.toString());
                            setSpeedValue(preset.unit);
                          }}
                          className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 rounded-full transition-colors"
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3">
              {/* Download Time Result */}
              {calculationMode === 'time' && result && (
                <div className="space-y-6">
                  {/* Main Result Card */}
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Estimated Download Time
                    </h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <p className="text-4xl md:text-5xl font-bold text-center">
                        {result.formattedTime}
                      </p>
                      <p className="text-indigo-200 text-center mt-2">
                        ({formatTime(result.totalSeconds)})
                      </p>
                    </div>
                  </div>

                  {/* Time Breakdown */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Time Breakdown</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-indigo-50 rounded-xl p-4 text-center">
                        <p className="text-3xl font-bold text-indigo-600">{result.hours}</p>
                        <p className="text-sm text-gray-600">Hours</p>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-4 text-center">
                        <p className="text-3xl font-bold text-purple-600">{result.minutes}</p>
                        <p className="text-sm text-gray-600">Minutes</p>
                      </div>
                      <div className="bg-pink-50 rounded-xl p-4 text-center">
                        <p className="text-3xl font-bold text-pink-600">{result.seconds}</p>
                        <p className="text-sm text-gray-600">Seconds</p>
                      </div>
                    </div>
                  </div>

                  {/* Calculation Details */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Calculation Details</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">File Size</span>
                        <span className="font-semibold text-gray-900">{fileSize} {fileSizeUnit}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Download Speed</span>
                        <span className="font-semibold text-gray-900">{downloadSpeed} {speedValue}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">File Size (in bits)</span>
                        <span className="font-semibold text-gray-900">{(result.fileSizeInBits / 1000000000).toFixed(2)} Gb</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-600">Total Seconds</span>
                        <span className="font-semibold text-gray-900">{result.totalSeconds.toFixed(2)}s</span>
                      </div>
                    </div>
                  </div>

                  {/* Formula */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Formula Used</h3>
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 text-center">
                      <p className="text-lg font-mono text-gray-800">
                        Download Time = File Size (bits) ÷ Speed (bps)
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      Note: 1 byte = 8 bits. File sizes are typically in bytes (MB, GB), while internet speeds are in bits (Mbps, Gbps).
                    </p>
                  </div>
                </div>
              )}

              {/* Required Speed Result */}
              {calculationMode === 'speed' && calculatedSpeed !== null && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Wifi className="w-5 h-5" />
                      Required Download Speed
                    </h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <p className="text-4xl md:text-5xl font-bold text-center">
                        {formatSpeed(calculatedSpeed)}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">What This Means</h3>
                    <p className="text-gray-700">
                      To download <strong>{fileSize} {fileSizeUnit}</strong> in <strong>{timeHours || 0}h {timeMinutes || 0}m {timeSeconds || 0}s</strong>,
                      you need a minimum internet speed of <strong>{formatSpeed(calculatedSpeed)}</strong>.
                    </p>
                  </div>
                </div>
              )}

              {/* Calculated File Size Result */}
              {calculationMode === 'size' && calculatedSize !== null && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <HardDrive className="w-5 h-5" />
                      Maximum File Size
                    </h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <p className="text-4xl md:text-5xl font-bold text-center">
                        {formatFileSize(calculatedSize)}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">What This Means</h3>
                    <p className="text-gray-700">
                      With a <strong>{downloadSpeed} {speedValue}</strong> connection, you can download up to <strong>{formatFileSize(calculatedSize)}</strong> in <strong>{timeHours || 0}h {timeMinutes || 0}m {timeSeconds || 0}s</strong>.
                    </p>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {((calculationMode === 'time' && !result) ||
                (calculationMode === 'speed' && calculatedSpeed === null) ||
                (calculationMode === 'size' && calculatedSize === null)) && (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Download className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    {calculationMode === 'time' && 'Enter file size and download speed'}
                    {calculationMode === 'speed' && 'Enter file size and desired time'}
                    {calculationMode === 'size' && 'Enter download speed and available time'}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Results will appear automatically
                  </p>
                </div>
              )}

              {/* Speed Comparison Table */}
              {calculationMode === 'time' && result && (
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Same File at Different Speeds</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Connection Type</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Speed</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {speedPresets.map((preset) => {
                          const speedBps = preset.speed * speedToBps[preset.unit];
                          const time = result.fileSizeInBits / speedBps;
                          return (
                            <tr key={preset.name} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-3 px-4">{preset.name}</td>
                              <td className="py-3 px-4">{preset.speed} {preset.unit}</td>
                              <td className="py-3 px-4 font-medium text-indigo-600">{formatTime(time)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* What is Download Time Calculator */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What is Download Time?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                <strong>Download time</strong> is the duration required to transfer a file from a server to your device over the internet. It depends on two main factors: the <strong>file size</strong> (how large the file is) and your <strong>internet connection speed</strong> (how fast data can be transferred).
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Understanding download time helps you plan file transfers, choose appropriate internet plans, and manage expectations when downloading large files like games, movies, software updates, or backups.
              </p>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">The Download Time Formula</h3>
                <div className="bg-white rounded-lg p-4 text-center mb-4">
                  <p className="text-xl font-mono font-bold text-indigo-600">
                    Time (seconds) = File Size (bits) ÷ Speed (bits per second)
                  </p>
                </div>
                <p className="text-gray-700 text-sm">
                  <strong>Important:</strong> File sizes are measured in bytes (KB, MB, GB), but internet speeds are measured in bits (Kbps, Mbps, Gbps). Since 1 byte = 8 bits, you must convert file size to bits before calculating.
                </p>
              </div>
            </section>

            {/* Understanding File Sizes */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Understanding File Size Units
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                      <th className="px-6 py-4 text-left font-bold">Unit</th>
                      <th className="px-6 py-4 text-left font-bold">Symbol</th>
                      <th className="px-6 py-4 text-left font-bold">Size in Bytes</th>
                      <th className="px-6 py-4 text-left font-bold">Common Use</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4">Byte</td>
                      <td className="px-6 py-4 font-mono">B</td>
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4 text-gray-600">Single character</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4">Kilobyte</td>
                      <td className="px-6 py-4 font-mono">KB</td>
                      <td className="px-6 py-4">1,024</td>
                      <td className="px-6 py-4 text-gray-600">Small documents, emails</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4">Megabyte</td>
                      <td className="px-6 py-4 font-mono">MB</td>
                      <td className="px-6 py-4">1,048,576</td>
                      <td className="px-6 py-4 text-gray-600">Photos, music files, apps</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4">Gigabyte</td>
                      <td className="px-6 py-4 font-mono">GB</td>
                      <td className="px-6 py-4">1,073,741,824</td>
                      <td className="px-6 py-4 text-gray-600">Movies, games, software</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4">Terabyte</td>
                      <td className="px-6 py-4 font-mono">TB</td>
                      <td className="px-6 py-4">1,099,511,627,776</td>
                      <td className="px-6 py-4 text-gray-600">Large backups, video archives</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Understanding Internet Speeds */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Understanding Internet Speed Units
              </h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
                      <th className="px-6 py-4 text-left font-bold">Unit</th>
                      <th className="px-6 py-4 text-left font-bold">Symbol</th>
                      <th className="px-6 py-4 text-left font-bold">Bits per Second</th>
                      <th className="px-6 py-4 text-left font-bold">Typical Connection</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4">Bits per second</td>
                      <td className="px-6 py-4 font-mono">bps</td>
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4 text-gray-600">Dial-up (obsolete)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4">Kilobits per second</td>
                      <td className="px-6 py-4 font-mono">Kbps</td>
                      <td className="px-6 py-4">1,000</td>
                      <td className="px-6 py-4 text-gray-600">2G mobile, ISDN</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4">Megabits per second</td>
                      <td className="px-6 py-4 font-mono">Mbps</td>
                      <td className="px-6 py-4">1,000,000</td>
                      <td className="px-6 py-4 text-gray-600">Broadband, 4G/5G, Cable</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4">Gigabits per second</td>
                      <td className="px-6 py-4 font-mono">Gbps</td>
                      <td className="px-6 py-4">1,000,000,000</td>
                      <td className="px-6 py-4 text-gray-600">Fiber optic, 5G</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl p-6">
                <h4 className="font-bold text-gray-900 mb-2">Mbps vs MBps - Don't Get Confused!</h4>
                <p className="text-gray-700">
                  <strong>Mbps</strong> (megabits per second) is used for internet speeds.<br />
                  <strong>MBps</strong> (megabytes per second) is used for file transfer rates.<br />
                  <strong>1 MBps = 8 Mbps</strong> (since 1 byte = 8 bits)<br /><br />
                  So a 100 Mbps connection downloads at about 12.5 MBps maximum.
                </p>
              </div>
            </section>

            {/* Common Internet Connection Types */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Internet Connection Types
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-blue-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-blue-600 mb-3">DSL (Digital Subscriber Line)</h3>
                  <p className="text-gray-700 mb-2">Speed: 1-100 Mbps</p>
                  <p className="text-sm text-gray-600">Uses telephone lines. Speed decreases with distance from exchange. Good for basic browsing and streaming.</p>
                </div>
                <div className="bg-white border-2 border-green-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-green-600 mb-3">Cable Internet</h3>
                  <p className="text-gray-700 mb-2">Speed: 10-500 Mbps</p>
                  <p className="text-sm text-gray-600">Uses coaxial cables. Shared bandwidth with neighbors. Great for streaming and gaming.</p>
                </div>
                <div className="bg-white border-2 border-purple-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">Fiber Optic</h3>
                  <p className="text-gray-700 mb-2">Speed: 100 Mbps - 10 Gbps</p>
                  <p className="text-sm text-gray-600">Uses light signals through glass fibers. Fastest and most reliable. Ideal for heavy users.</p>
                </div>
                <div className="bg-white border-2 border-orange-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">4G LTE / 5G Mobile</h3>
                  <p className="text-gray-700 mb-2">Speed: 10-1000 Mbps</p>
                  <p className="text-sm text-gray-600">Wireless cellular networks. 5G offers fiber-like speeds. Great for mobility.</p>
                </div>
                <div className="bg-white border-2 border-cyan-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-cyan-600 mb-3">Satellite Internet</h3>
                  <p className="text-gray-700 mb-2">Speed: 12-100 Mbps</p>
                  <p className="text-sm text-gray-600">Available anywhere with sky view. Higher latency. Good for rural areas.</p>
                </div>
                <div className="bg-white border-2 border-pink-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-pink-600 mb-3">Starlink</h3>
                  <p className="text-gray-700 mb-2">Speed: 50-200 Mbps</p>
                  <p className="text-sm text-gray-600">Low-Earth orbit satellite. Lower latency than traditional satellite. Expanding coverage.</p>
                </div>
              </div>
            </section>

            {/* Download Time Examples */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Download Time Examples
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                      <th className="px-4 py-3 text-left font-bold">File Type</th>
                      <th className="px-4 py-3 text-left font-bold">Size</th>
                      <th className="px-4 py-3 text-center font-bold">10 Mbps</th>
                      <th className="px-4 py-3 text-center font-bold">50 Mbps</th>
                      <th className="px-4 py-3 text-center font-bold">100 Mbps</th>
                      <th className="px-4 py-3 text-center font-bold">1 Gbps</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3">MP3 Song</td>
                      <td className="px-4 py-3">5 MB</td>
                      <td className="px-4 py-3 text-center">4 sec</td>
                      <td className="px-4 py-3 text-center">0.8 sec</td>
                      <td className="px-4 py-3 text-center">0.4 sec</td>
                      <td className="px-4 py-3 text-center">&lt;0.1 sec</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3">Photo (High Res)</td>
                      <td className="px-4 py-3">15 MB</td>
                      <td className="px-4 py-3 text-center">12 sec</td>
                      <td className="px-4 py-3 text-center">2.4 sec</td>
                      <td className="px-4 py-3 text-center">1.2 sec</td>
                      <td className="px-4 py-3 text-center">0.1 sec</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3">HD Movie</td>
                      <td className="px-4 py-3">4 GB</td>
                      <td className="px-4 py-3 text-center">53 min</td>
                      <td className="px-4 py-3 text-center">11 min</td>
                      <td className="px-4 py-3 text-center">5.3 min</td>
                      <td className="px-4 py-3 text-center">32 sec</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3">4K Movie</td>
                      <td className="px-4 py-3">20 GB</td>
                      <td className="px-4 py-3 text-center">4.4 hr</td>
                      <td className="px-4 py-3 text-center">53 min</td>
                      <td className="px-4 py-3 text-center">27 min</td>
                      <td className="px-4 py-3 text-center">2.7 min</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3">Game (Modern)</td>
                      <td className="px-4 py-3">100 GB</td>
                      <td className="px-4 py-3 text-center">22 hr</td>
                      <td className="px-4 py-3 text-center">4.4 hr</td>
                      <td className="px-4 py-3 text-center">2.2 hr</td>
                      <td className="px-4 py-3 text-center">13 min</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3">OS Update</td>
                      <td className="px-4 py-3">5 GB</td>
                      <td className="px-4 py-3 text-center">67 min</td>
                      <td className="px-4 py-3 text-center">13 min</td>
                      <td className="px-4 py-3 text-center">6.7 min</td>
                      <td className="px-4 py-3 text-center">40 sec</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Why Downloads Take Longer Than Expected */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Why Downloads Take Longer Than Expected
              </h2>
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4">
                  <h4 className="font-bold text-red-800 mb-1">Network Congestion</h4>
                  <p className="text-red-700 text-sm">Peak hours (evenings) slow everyone down as bandwidth is shared among users.</p>
                </div>
                <div className="bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-4">
                  <h4 className="font-bold text-orange-800 mb-1">Server Limitations</h4>
                  <p className="text-orange-700 text-sm">The download server may limit speeds, especially for free downloads or during high traffic.</p>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-xl p-4">
                  <h4 className="font-bold text-yellow-800 mb-1">ISP Throttling</h4>
                  <p className="text-yellow-700 text-sm">Some ISPs deliberately slow certain types of traffic like streaming or torrents.</p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-4">
                  <h4 className="font-bold text-blue-800 mb-1">Wi-Fi Interference</h4>
                  <p className="text-blue-700 text-sm">Walls, distance from router, and competing devices reduce wireless speeds significantly.</p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-500 rounded-r-xl p-4">
                  <h4 className="font-bold text-purple-800 mb-1">Protocol Overhead</h4>
                  <p className="text-purple-700 text-sm">TCP/IP protocols add extra data for error checking, reducing actual throughput by 5-10%.</p>
                </div>
                <div className="bg-gray-50 border-l-4 border-gray-500 rounded-r-xl p-4">
                  <h4 className="font-bold text-gray-800 mb-1">Geographic Distance</h4>
                  <p className="text-gray-700 text-sm">Downloading from servers far away introduces latency and may route through slower networks.</p>
                </div>
              </div>
            </section>

            {/* Tips to Improve Download Speed */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Tips to Improve Download Speed
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-700 mb-3">Use Ethernet Instead of Wi-Fi</h3>
                  <p className="text-gray-700 text-sm">Wired connections are faster and more stable. Direct connection to router eliminates wireless interference.</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-700 mb-3">Download During Off-Peak Hours</h3>
                  <p className="text-gray-700 text-sm">Schedule large downloads for late night or early morning when fewer people are online.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-700 mb-3">Pause Other Internet Activities</h3>
                  <p className="text-gray-700 text-sm">Stop streaming, gaming, or video calls while downloading to maximize available bandwidth.</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-700 mb-3">Use a Download Manager</h3>
                  <p className="text-gray-700 text-sm">Download managers can resume interrupted downloads and sometimes use multiple connections.</p>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-teal-700 mb-3">Choose Closer Servers</h3>
                  <p className="text-gray-700 text-sm">If available, select download mirrors geographically close to you for faster transfers.</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-indigo-700 mb-3">Restart Your Router</h3>
                  <p className="text-gray-700 text-sm">Sometimes a simple router restart clears memory issues and restores optimal performance.</p>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do I calculate download time?
                  </h3>
                  <p className="text-gray-700">
                    Divide the file size (in bits) by your internet speed (in bits per second). For example, a 1 GB file at 100 Mbps: Convert 1 GB to bits (8,589,934,592 bits), then divide by 100,000,000 bps = 85.9 seconds or about 1.4 minutes.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why is my actual download slower than calculated?
                  </h3>
                  <p className="text-gray-700">
                    Real-world speeds are affected by network congestion, server limitations, ISP throttling, Wi-Fi interference, and protocol overhead. Expect actual speeds to be 10-30% slower than advertised maximum speeds.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What's the difference between Mbps and MBps?
                  </h3>
                  <p className="text-gray-700">
                    <strong>Mbps</strong> (megabits per second) measures internet speed. <strong>MBps</strong> (megabytes per second) measures file transfer rates. Since 1 byte = 8 bits, 100 Mbps = 12.5 MBps. ISPs advertise in Mbps, but downloads often show MBps.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How long to download 1 GB at various speeds?
                  </h3>
                  <p className="text-gray-700">
                    At 10 Mbps: ~13 minutes. At 50 Mbps: ~2.7 minutes. At 100 Mbps: ~1.3 minutes. At 500 Mbps: ~16 seconds. At 1 Gbps: ~8 seconds.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Does download speed affect upload speed?
                  </h3>
                  <p className="text-gray-700">
                    Most connections have asymmetric speeds—download is faster than upload. A 100 Mbps download plan might only offer 10-20 Mbps upload. Fiber connections often offer symmetric speeds (same up/down).
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What internet speed do I need for streaming?
                  </h3>
                  <p className="text-gray-700">
                    SD quality: 3-4 Mbps. HD (720p): 5-8 Mbps. Full HD (1080p): 10-15 Mbps. 4K Ultra HD: 25-35 Mbps. Multiple simultaneous streams require higher speeds.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How can I test my actual internet speed?
                  </h3>
                  <p className="text-gray-700">
                    Use speed test websites like Speedtest.net, Fast.com, or your ISP's speed test tool. Test multiple times at different hours for accurate results. Use ethernet for the most accurate measurement.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is latency and how does it affect downloads?
                  </h3>
                  <p className="text-gray-700">
                    Latency (ping) is the delay before data transfer begins. High latency (100ms+) makes connections feel slow even with fast speeds. It affects interactive activities more than large downloads, but can still impact overall transfer initiation.
                  </p>
                </div>
              </div>
            </section>

            {/* Related Calculators */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Related Calculators
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/calculators/time-to-decimal-calculator" className="block bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-indigo-300 hover:shadow-lg transition-all">
                  <h3 className="font-bold text-indigo-600 mb-1">Time to Decimal Calculator</h3>
                  <p className="text-sm text-gray-600">Convert time to decimal hours</p>
                </Link>
                <Link href="/calculators/percentage-calculator" className="block bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-indigo-300 hover:shadow-lg transition-all">
                  <h3 className="font-bold text-indigo-600 mb-1">Percentage Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate percentages easily</p>
                </Link>
                <Link href="/calculators/speed-distance-time-calculator" className="block bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-indigo-300 hover:shadow-lg transition-all">
                  <h3 className="font-bold text-indigo-600 mb-1">Speed Distance Time Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate speed, distance, or time</p>
                </Link>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Conclusion
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Understanding download times helps you make informed decisions about file transfers, internet plan upgrades, and time management. Whether you're downloading games, movies, software updates, or backing up data, knowing how long it will take helps you plan accordingly.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our download time calculator makes these calculations instant and easy. Simply enter your file size and internet speed to get accurate time estimates. Use the three modes to calculate download time, required speed, or maximum file size based on your needs.
              </p>
            </section>

          </div>
        </div>
      </div>

      {/* Book Your Session CTA */}
      <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Need Help with Computer Science?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you understand networking, data transfer, computer fundamentals, and more. Get personalized one-on-one guidance tailored to your learning style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-demo-class">
                <Button className="bg-[#FFC857] hover:bg-[#FFC857]/90 text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                  Book Free Demo Class
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl transition-all duration-200">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
