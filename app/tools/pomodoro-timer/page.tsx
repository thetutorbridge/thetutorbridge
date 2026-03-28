'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Home, Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function PomodoroTimerPage() {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (isWorkSession) {
        setTimeLeft(breakMinutes * 60);
        setIsWorkSession(false);
      } else {
        setTimeLeft(workMinutes * 60);
        setIsWorkSession(true);
      }
      setIsRunning(false);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft, workMinutes, breakMinutes, isWorkSession]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(workMinutes * 60);
    setIsWorkSession(true);
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
            <span className="text-gray-600">Pomodoro Timer</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Pomodoro Timer
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Boost productivity with the Pomodoro Technique - Free Pomodoro timer
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className={`text-center mb-8 p-6 rounded-lg ${isWorkSession ? 'bg-red-50' : 'bg-green-50'}`}>
              <p className="text-2xl font-bold mb-4">{isWorkSession ? 'Work Session' : 'Break Time'}</p>
              <p className="text-7xl font-bold text-gray-900">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </p>
            </div>

            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {isRunning ? <><Pause className="w-5 h-5" /> Pause</> : <><Play className="w-5 h-5" /> Start</>}
              </button>
              <button
                onClick={reset}
                className="px-8 py-4 bg-gray-200 text-gray-700 rounded-lg font-bold text-lg hover:bg-gray-300 transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" /> Reset
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Work Minutes</label>
                <input
                  type="number"
                  value={workMinutes}
                  onChange={(e) => {
                    setWorkMinutes(parseInt(e.target.value) || 25);
                    if (isWorkSession && !isRunning) setTimeLeft((parseInt(e.target.value) || 25) * 60);
                  }}
                  min="1"
                  max="60"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 font-semibold"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Break Minutes</label>
                <input
                  type="number"
                  value={breakMinutes}
                  onChange={(e) => setBreakMinutes(parseInt(e.target.value) || 5)}
                  min="1"
                  max="30"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2BAE66] focus:outline-none text-gray-900 font-semibold"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Pomodoro Technique</h3>
            <ol className="list-decimal list-inside text-gray-700 text-sm leading-relaxed space-y-2">
              <li>Work for 25 minutes (one Pomodoro)</li>
              <li>Take a 5-minute break</li>
              <li>Repeat 4 times</li>
              <li>Take a longer 15-30 minute break</li>
            </ol>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
