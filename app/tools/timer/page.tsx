'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Home, Clock, Play, Pause, RotateCcw, Timer as TimerIcon, StopCircle } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function TimerStopwatchPage() {
  const [mode, setMode] = useState<'timer' | 'stopwatch'>('timer');

  // Timer state
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerTimeLeft, setTimerTimeLeft] = useState(25 * 60);

  // Stopwatch state
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);

  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const stopwatchIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Timer logic
  useEffect(() => {
    if (timerRunning && timerTimeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerTimeLeft((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            playAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [timerRunning, timerTimeLeft]);

  // Stopwatch logic
  useEffect(() => {
    if (stopwatchRunning) {
      stopwatchIntervalRef.current = setInterval(() => {
        setStopwatchTime((prev) => prev + 10);
      }, 10);
    } else {
      if (stopwatchIntervalRef.current) {
        clearInterval(stopwatchIntervalRef.current);
      }
    }
    return () => {
      if (stopwatchIntervalRef.current) {
        clearInterval(stopwatchIntervalRef.current);
      }
    };
  }, [stopwatchRunning]);

  const playAlarm = () => {
    if (typeof window !== 'undefined') {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGWi77OScTRAKT6fj8LJeGwU7k9XwzH0tBSF1xe7hZSENHm7A3ua2bCATU6fk7q5aFwxNouLvw3AnBSaBzvHaiTQIGGe76+OfSxELUKjk77FfHAU9ktXwzH4uBSBzxu3kaCYRHG7A3+q4bSEUU6Xj763ZEgxNouLvw3ApBSaBzvHaiTMIF2S86+CfSRAKUqfk7rBgHgU8kdXwzX8vBSBzxuzlaCYRHG7A3+q4bSEUU6Xj763ZEgxNouLvw3ApBSaBzvHaiTMIF2S86+CfSRAKUqfk7rBgHgU8kdXwzX8vBSBzxuzlaCYRHG7A3+q4bSEUU6Xj763ZEgxNouLvw3ApBSaBzvHaiTMIF2S86+CfSRAKUqfk7rBgHgU8kdXwzX8vBSBzxuzlaCYRHG7A3+q4bSEUU6Xj763ZEgxNouLvw3ApBSaBzvHaiTMIF2S86+CfSRAKUqfk7rBgHgU8kdXwzX8vBSBzxuzlaCYRHG7A3+q4bSEUU6Xj763ZEgxNouLvw3ApBSaBzvHaiTMIF2S86+CfSRAKUqfk7rBgHgU8kdXwzX8vBSBzxuzlaCYRHG7A3+q4bSEUU6Xj763ZEgxNouLvw3ApBSaBzvHaiTMIF2S86+CfSRAKUqfk7rBgHgU8kdXwzX8vBSBzxuzlaCYRHG7A3+q4bSEUU6Xj763ZEgxNouLvw3ApBSaBzvHaiTMIF2S86+CfSRAKUqfk7rBgHgU8kdXwzX8vBSBzxuzlaCYRHG7A3+q4bSEUU6Xj763ZEgxNouLvw3ApBSaBzvHaiTMIF2S86+CfSRAKUqfk7rBgHgU8kdXwzX8vBSBzxuzlaCYRHG7A3+q4bSEUU6Xj763ZEgxNouLvw3ApBSaBzvHaiTMIF2S86+CfSRAKUqfk7rBgHgU8kdXwzX8vBSBzxuzlaCYRHG7A3+q4bSEUU6Xj763ZEgxNouLvw3ApBSaBzvHaiTMIF2S86+CfSRAKUqfk7rBgHgU8kdXwzX8vBSBzxuzlaCYRHG7A3+q4bSEUU6Xj763ZEgxNouLvw3ApBSaBzvHaiTMIF2S86+CfSRAKUqfk7rBgHgU8kdXwzX8vBSBzxuzlaCYRHG7A3+q4bSEUU6Xj763ZEgxNouLvw3ApBSaBzvHaiTMIF2S86+CfSRAKUqfk7rBgHgU8kdXwzX8vBSBzxuzlaCYRHG7A3+q4bSEUU6Xj763ZEgxNouLvw3ApBQ==');
      audio.play().catch(() => {});
    }
  };

  const startTimer = () => {
    if (timerTimeLeft === 0) {
      const totalSeconds = timerMinutes * 60 + timerSeconds;
      setTimerTimeLeft(totalSeconds);
    }
    setTimerRunning(true);
  };

  const pauseTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    const totalSeconds = timerMinutes * 60 + timerSeconds;
    setTimerTimeLeft(totalSeconds);
  };

  const setPresetTimer = (minutes: number) => {
    setTimerMinutes(minutes);
    setTimerSeconds(0);
    setTimerTimeLeft(minutes * 60);
    setTimerRunning(false);
  };

  const startStopwatch = () => {
    setStopwatchRunning(true);
  };

  const pauseStopwatch = () => {
    setStopwatchRunning(false);
  };

  const resetStopwatch = () => {
    setStopwatchRunning(false);
    setStopwatchTime(0);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatStopwatch = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
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
            <span className="text-gray-600">Timer & Stopwatch</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Timer & Stopwatch
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Free online timer and stopwatch - perfect for workouts, cooking, studying, and productivity
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 shadow-lg">
              <button
                onClick={() => setMode('timer')}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  mode === 'timer'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <TimerIcon className="w-5 h-5 inline mr-2" />
                Timer
              </button>
              <button
                onClick={() => setMode('stopwatch')}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  mode === 'stopwatch'
                    ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <StopCircle className="w-5 h-5 inline mr-2" />
                Stopwatch
              </button>
            </div>
          </div>

          {/* Timer Mode */}
          {mode === 'timer' && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              {/* Timer Display */}
              <div className="text-center mb-8">
                <div className="text-8xl font-bold text-gray-900 mb-4 font-mono">
                  {formatTime(timerTimeLeft)}
                </div>
                {timerTimeLeft === 0 && !timerRunning && (
                  <div className="text-2xl font-bold text-red-600 animate-pulse">
                    Time's Up! 🎉
                  </div>
                )}
              </div>

              {/* Timer Input */}
              {!timerRunning && (
                <div className="flex justify-center gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Minutes</label>
                    <input
                      type="number"
                      min="0"
                      max="999"
                      value={timerMinutes}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setTimerMinutes(val);
                        setTimerTimeLeft(val * 60 + timerSeconds);
                      }}
                      className="w-24 px-4 py-3 border-2 border-gray-300 rounded-lg text-center text-2xl font-bold focus:border-[#2BAE66] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Seconds</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={timerSeconds}
                      onChange={(e) => {
                        const val = Math.min(59, parseInt(e.target.value) || 0);
                        setTimerSeconds(val);
                        setTimerTimeLeft(timerMinutes * 60 + val);
                      }}
                      className="w-24 px-4 py-3 border-2 border-gray-300 rounded-lg text-center text-2xl font-bold focus:border-[#2BAE66] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Preset Buttons */}
              {!timerRunning && (
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  {[1, 5, 10, 15, 25, 30, 45, 60].map((min) => (
                    <button
                      key={min}
                      onClick={() => setPresetTimer(min)}
                      className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-full font-semibold text-gray-700 transition-all"
                    >
                      {min} min
                    </button>
                  ))}
                </div>
              )}

              {/* Timer Controls */}
              <div className="flex justify-center gap-4">
                {!timerRunning ? (
                  <button
                    onClick={startTimer}
                    disabled={timerTimeLeft === 0 && timerMinutes === 0 && timerSeconds === 0}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    <Play className="w-6 h-6" />
                    Start
                  </button>
                ) : (
                  <button
                    onClick={pauseTimer}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-full font-bold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg"
                  >
                    <Pause className="w-6 h-6" />
                    Pause
                  </button>
                )}
                <button
                  onClick={resetTimer}
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full font-bold text-lg hover:from-gray-600 hover:to-gray-700 transition-all shadow-lg"
                >
                  <RotateCcw className="w-6 h-6" />
                  Reset
                </button>
              </div>
            </div>
          )}

          {/* Stopwatch Mode */}
          {mode === 'stopwatch' && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              {/* Stopwatch Display */}
              <div className="text-center mb-8">
                <div className="text-8xl font-bold text-gray-900 mb-4 font-mono">
                  {formatStopwatch(stopwatchTime)}
                </div>
              </div>

              {/* Stopwatch Controls */}
              <div className="flex justify-center gap-4">
                {!stopwatchRunning ? (
                  <button
                    onClick={startStopwatch}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
                  >
                    <Play className="w-6 h-6" />
                    Start
                  </button>
                ) : (
                  <button
                    onClick={pauseStopwatch}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-full font-bold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg"
                  >
                    <Pause className="w-6 h-6" />
                    Pause
                  </button>
                )}
                <button
                  onClick={resetStopwatch}
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full font-bold text-lg hover:from-gray-600 hover:to-gray-700 transition-all shadow-lg"
                >
                  <RotateCcw className="w-6 h-6" />
                  Reset
                </button>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg text-[#1A3D7C] mb-2">⏲️ Timer Mode</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Set minutes and seconds</li>
                  <li>• Or click preset buttons (1, 5, 10, etc.)</li>
                  <li>• Click Start to begin countdown</li>
                  <li>• Pause or Reset anytime</li>
                  <li>• Alarm sounds when time's up!</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#2BAE66] mb-2">⏱️ Stopwatch Mode</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Click Start to begin counting</li>
                  <li>• Pause to stop timing</li>
                  <li>• Resume by clicking Start again</li>
                  <li>• Reset to go back to zero</li>
                  <li>• Accurate to 1/100th second!</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Perfect For:</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-bold text-[#1A3D7C] mb-2">🍳 Cooking</h3>
                <p className="text-sm text-gray-600">Time your recipes perfectly</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-bold text-[#2BAE66] mb-2">💪 Workouts</h3>
                <p className="text-sm text-gray-600">HIIT, Tabata, rest periods</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-bold text-purple-600 mb-2">📚 Studying</h3>
                <p className="text-sm text-gray-600">Pomodoro technique (25 min)</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-bold text-orange-600 mb-2">🧘 Meditation</h3>
                <p className="text-sm text-gray-600">Timed mindfulness sessions</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-bold text-red-600 mb-2">🎮 Gaming</h3>
                <p className="text-sm text-gray-600">Speedruns and challenges</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-bold text-blue-600 mb-2">💼 Meetings</h3>
                <p className="text-sm text-gray-600">Time-box discussions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
