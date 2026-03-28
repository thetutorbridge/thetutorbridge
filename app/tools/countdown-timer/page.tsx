'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Home, Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function CountdownTimerPage() {
  const [targetDate, setTargetDate] = useState('');
  const [targetTime, setTargetTime] = useState('');
  const [title, setTitle] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const calculateTimeLeft = () => {
    if (!targetDate || !targetTime) return;

    const target = new Date(`${targetDate}T${targetTime}`);
    const now = new Date();
    const difference = target.getTime() - now.getTime();

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        total: difference,
      });
    } else {
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
      });
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const startCountdown = () => {
    if (!targetDate || !targetTime) {
      alert('Please select both date and time');
      return;
    }

    const target = new Date(`${targetDate}T${targetTime}`);
    const now = new Date();

    if (target <= now) {
      alert('Please select a future date and time');
      return;
    }

    setIsRunning(true);
    calculateTimeLeft();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(calculateTimeLeft, 1000);
  };

  const pauseCountdown = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetCountdown = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimeLeft({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: 0,
    });
    setTargetDate('');
    setTargetTime('');
    setTitle('');
  };

  const setQuickTime = (type: string) => {
    const now = new Date();
    switch (type) {
      case '1min':
        now.setMinutes(now.getMinutes() + 1);
        break;
      case '5min':
        now.setMinutes(now.getMinutes() + 5);
        break;
      case '10min':
        now.setMinutes(now.getMinutes() + 10);
        break;
      case '30min':
        now.setMinutes(now.getMinutes() + 30);
        break;
      case '1hour':
        now.setHours(now.getHours() + 1);
        break;
      case '1day':
        now.setDate(now.getDate() + 1);
        break;
    }

    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().slice(0, 5);
    setTargetDate(dateStr);
    setTargetTime(timeStr);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const progress = timeLeft.total > 0 ? 100 : 0;

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
            <span className="text-gray-600">Countdown Timer</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Countdown Timer
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Create countdown timers for events, deadlines, and special occasions
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Event Title (Optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Birthday, Vacation, Project Deadline"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900"
                disabled={isRunning}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Target Date
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 font-semibold"
                  disabled={isRunning}
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Target Time
                </label>
                <input
                  type="time"
                  value={targetTime}
                  onChange={(e) => setTargetTime(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 font-semibold"
                  disabled={isRunning}
                />
              </div>
            </div>

            {!isRunning && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Quick Set
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {['1min', '5min', '10min', '30min', '1hour', '1day'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setQuickTime(type)}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-all"
                    >
                      {type === '1min' ? '1 Min' :
                       type === '5min' ? '5 Min' :
                       type === '10min' ? '10 Min' :
                       type === '30min' ? '30 Min' :
                       type === '1hour' ? '1 Hour' :
                       '1 Day'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              {!isRunning ? (
                <button
                  onClick={startCountdown}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Start Countdown
                </button>
              ) : (
                <button
                  onClick={pauseCountdown}
                  className="flex-1 px-8 py-4 bg-orange-500 text-white rounded-lg font-bold text-lg hover:bg-orange-600 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Pause className="w-5 h-5" />
                  Pause
                </button>
              )}
              <button
                onClick={resetCountdown}
                className="px-8 py-4 bg-gray-200 text-gray-700 rounded-lg font-bold text-lg hover:bg-gray-300 transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </div>
          </div>

          {timeLeft.total > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {title && (
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
                  {title}
                </h2>
              )}

              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-xl p-6 text-center">
                  <div className="text-5xl font-bold text-white mb-2">
                    {timeLeft.days}
                  </div>
                  <div className="text-sm font-semibold text-white opacity-90">
                    Days
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-xl p-6 text-center">
                  <div className="text-5xl font-bold text-white mb-2">
                    {timeLeft.hours}
                  </div>
                  <div className="text-sm font-semibold text-white opacity-90">
                    Hours
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-xl p-6 text-center">
                  <div className="text-5xl font-bold text-white mb-2">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-sm font-semibold text-white opacity-90">
                    Minutes
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-xl p-6 text-center">
                  <div className="text-5xl font-bold text-white mb-2">
                    {timeLeft.seconds}
                  </div>
                  <div className="text-sm font-semibold text-white opacity-90">
                    Seconds
                  </div>
                </div>
              </div>

              {timeLeft.total === 0 && (
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#2BAE66]">
                    Time's Up! 🎉
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
