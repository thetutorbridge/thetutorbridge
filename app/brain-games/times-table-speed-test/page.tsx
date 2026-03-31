'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Home, Calculator, Trophy, Clock, Play, RotateCcw, CheckSquare, Keyboard, Zap, Target, Share2, Copy } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

interface LeaderboardEntry {
  score: number;
  correct: number;
  incorrect: number;
  date: string;
  tables: number[];
}

interface Question {
  num1: number;
  num2: number;
  correctAnswer: number;
  options?: number[];
}

type GameState = 'setup' | 'playing' | 'results';
type InputMode = 'keyboard' | 'multiple-choice';

const LEADERBOARD_KEY = 'times-tables-leaderboard';

export default function TimesTablesSpeedTest() {
  // Core Game State
  const [gameState, setGameState] = useState<GameState>('setup');
  const [selectedTables, setSelectedTables] = useState<number[]>([2, 3, 4, 5]);
  const [inputMode, setInputMode] = useState<InputMode>('keyboard');

  // Timer State
  const [timeLeft, setTimeLeft] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Question State
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [askedQuestions, setAskedQuestions] = useState<Set<string>>(new Set());
  const [userAnswer, setUserAnswer] = useState('');

  // Scoring State
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Load leaderboard on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LEADERBOARD_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setLeaderboard(parsed.slice(0, 10));
        } catch (e) {
          setLeaderboard([]);
        }
      }
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [gameState, isRunning, timeLeft]);

  // Generate question
  const generateQuestion = (): Question | null => {
    if (selectedTables.length === 0) return null;

    const table = selectedTables[Math.floor(Math.random() * selectedTables.length)];
    const num2 = Math.floor(Math.random() * 12) + 1;
    const correctAnswer = table * num2;

    const questionKey = `${table}x${num2}`;
    setAskedQuestions(prev => new Set([...prev, questionKey]));

    if (inputMode === 'multiple-choice') {
      const options = new Set<number>([correctAnswer]);
      while (options.size < 4) {
        const offset = Math.floor(Math.random() * 20) - 10;
        const wrongAnswer = Math.max(1, correctAnswer + offset);
        if (wrongAnswer !== correctAnswer) {
          options.add(wrongAnswer);
        }
      }
      return {
        num1: table,
        num2,
        correctAnswer,
        options: Array.from(options).sort(() => Math.random() - 0.5)
      };
    }

    return { num1: table, num2, correctAnswer };
  };

  // Check answer
  const checkAnswer = (submittedAnswer: number) => {
    if (!currentQuestion) return;

    const isCorrect = submittedAnswer === currentQuestion.correctAnswer;
    setQuestionsAnswered(prev => prev + 1);

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setStreak(prev => prev + 1);
      setMaxStreak(prev => Math.max(prev, streak + 1));

      const points = 10 + (streak * 2);
      setScore(prev => prev + points);
    } else {
      setIncorrectCount(prev => prev + 1);
      setStreak(0);
    }

    setUserAnswer('');
    setCurrentQuestion(generateQuestion());
  };

  // Start game
  const startGame = () => {
    if (selectedTables.length === 0) {
      alert('Please select at least one times table!');
      return;
    }

    setGameState('playing');
    setTimeLeft(120);
    setScore(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setQuestionsAnswered(0);
    setStreak(0);
    setMaxStreak(0);
    setAskedQuestions(new Set());
    setUserAnswer('');
    setCurrentQuestion(generateQuestion());
    setIsRunning(true);
  };

  // End game
  const endGame = () => {
    setIsRunning(false);
    setGameState('results');
    saveToLeaderboard();
  };

  // Save to leaderboard
  const saveToLeaderboard = () => {
    if (typeof window === 'undefined') return;

    const newEntry: LeaderboardEntry = {
      score,
      correct: correctCount,
      incorrect: incorrectCount,
      date: new Date().toLocaleDateString(),
      tables: selectedTables
    };

    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    setLeaderboard(updated);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
  };

  // Reset game
  const resetGame = () => {
    setGameState('setup');
    setTimeLeft(120);
    setScore(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setQuestionsAnswered(0);
    setStreak(0);
    setMaxStreak(0);
    setAskedQuestions(new Set());
    setCurrentQuestion(null);
    setUserAnswer('');
  };

  // Toggle table selection
  const toggleTable = (table: number) => {
    setSelectedTables(prev => {
      if (prev.includes(table)) {
        if (prev.length === 1) return prev;
        return prev.filter(t => t !== table);
      } else {
        return [...prev, table].sort((a, b) => a - b);
      }
    });
  };

  // Get share text
  const getShareText = () => {
    const accuracy = questionsAnswered > 0
      ? Math.round((correctCount / questionsAnswered) * 100)
      : 0;

    return `🎯 Times Tables Speed Test Results!\n\n` +
      `🏆 Score: ${score}\n` +
      `✅ Correct: ${correctCount}/${questionsAnswered}\n` +
      `📊 Accuracy: ${accuracy}%\n` +
      `🔥 Best Streak: ${maxStreak}\n\n` +
      `Can you beat my score? Try it now!`;
  };

  // Share to WhatsApp
  const shareToWhatsApp = () => {
    const text = getShareText();
    const url = 'https://www.thetutorbridge.com/brain-games/times-table-speed-test';
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + '\n\n' + url)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Share to Facebook
  const shareToFacebook = () => {
    const url = 'https://www.thetutorbridge.com/brain-games/times-table-speed-test';
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  // Share to Twitter/X
  const shareToTwitter = () => {
    const text = getShareText();
    const url = 'https://www.thetutorbridge.com/brain-games/times-table-speed-test';
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  // Native share (for mobile - opens share sheet with all apps)
  const handleNativeShare = async () => {
    const shareText = getShareText();
    const url = 'https://www.thetutorbridge.com/brain-games/times-table-speed-test';

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Times Tables Speed Test Results',
          text: shareText + '\n\n' + url,
        });
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText + '\n\n' + url);
        alert('Results copied to clipboard! Share them anywhere you like.');
      } catch (err) {
        console.log('Copy failed');
      }
    }
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
            <span className="text-gray-600">Times Tables Speed Test</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Times Tables Speed Test
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Master multiplication with fun 2-minute challenges!
            </p>
          </div>

          {/* Setup Screen */}
          {gameState === 'setup' && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Tables</h2>
              <p className="text-gray-600 mb-6">Select which multiplication tables you want to practice (1-12)</p>

              {/* Table Selection Grid */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(table => (
                  <button
                    key={table}
                    onClick={() => toggleTable(table)}
                    className={`p-4 rounded-lg font-bold text-lg transition-all ${
                      selectedTables.includes(table)
                        ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg scale-105'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {table}x
                  </button>
                ))}
              </div>

              {/* Input Mode Toggle */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">Input Mode</h3>
              <p className="text-gray-600 mb-4">Choose how you want to answer questions</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <button
                  onClick={() => setInputMode('keyboard')}
                  className={`px-8 py-3 rounded-full font-semibold transition-all ${
                    inputMode === 'keyboard'
                      ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  <Keyboard className="w-5 h-5 inline mr-2" />
                  Keyboard Input
                </button>
                <button
                  onClick={() => setInputMode('multiple-choice')}
                  className={`px-8 py-3 rounded-full font-semibold transition-all ${
                    inputMode === 'multiple-choice'
                      ? 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white shadow-lg'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  <CheckSquare className="w-5 h-5 inline mr-2" />
                  Multiple Choice
                </button>
              </div>

              {/* Game Info */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
                <h4 className="font-bold text-gray-900 mb-2">How to Play:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Answer as many multiplication questions as you can in 2 minutes</li>
                  <li>• Earn 10 points for each correct answer + streak bonuses</li>
                  <li>• Build your streak for extra points (2 points per streak level)</li>
                  <li>• Try to beat your high score and reach the leaderboard!</li>
                </ul>
              </div>

              {/* Start Button */}
              <button
                onClick={startGame}
                disabled={selectedTables.length === 0}
                className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="w-6 h-6 inline mr-2" />
                Start 2-Minute Challenge!
              </button>
            </div>
          )}

          {/* Playing Screen */}
          {gameState === 'playing' && currentQuestion && (
            <div>
              {/* Timer & Score Bar */}
              <div className="flex justify-between items-center mb-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <Clock className={`w-6 h-6 ${timeLeft <= 30 ? 'text-red-500' : 'text-[#1A3D7C]'}`} />
                  <span className={`text-2xl font-bold ${timeLeft <= 30 ? 'text-red-500 animate-pulse' : 'text-gray-900'}`}>
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-[#FFC857]" />
                  <span className="text-2xl font-bold text-[#2BAE66]">{score}</span>
                </div>
              </div>

              {/* Question Display */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 md:p-12 rounded-2xl mb-6 text-center">
                <div className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">
                  {currentQuestion.num1} × {currentQuestion.num2} = ?
                </div>
                {streak > 2 && (
                  <div className="text-xl font-semibold text-[#2BAE66] animate-pulse">
                    🔥 {streak} Streak!
                  </div>
                )}
              </div>

              {/* Input Interface - Keyboard Mode */}
              {inputMode === 'keyboard' && (
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                  <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && userAnswer) {
                        checkAnswer(parseInt(userAnswer));
                      }
                    }}
                    autoFocus
                    placeholder="Type answer..."
                    className="w-full sm:w-64 px-6 py-4 text-3xl font-bold text-center border-4 border-[#2BAE66] rounded-lg focus:outline-none focus:ring-4 focus:ring-[#2BAE66]/30"
                  />
                  <button
                    onClick={() => checkAnswer(parseInt(userAnswer))}
                    disabled={!userAnswer}
                    className="px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-xl disabled:opacity-50 hover:shadow-lg transition-all"
                  >
                    Submit
                  </button>
                </div>
              )}

              {/* Input Interface - Multiple Choice Mode */}
              {inputMode === 'multiple-choice' && currentQuestion.options && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => checkAnswer(option)}
                      className="p-6 md:p-8 bg-white border-4 border-gray-300 rounded-xl text-3xl md:text-4xl font-bold text-gray-900 hover:border-[#2BAE66] hover:bg-blue-50 transition-all"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/* Progress Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-100 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-600">{correctCount}</div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
                <div className="bg-red-100 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-red-600">{incorrectCount}</div>
                  <div className="text-sm text-gray-600">Incorrect</div>
                </div>
                <div className="bg-blue-100 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600">{questionsAnswered}</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
              </div>
            </div>
          )}

          {/* Results Screen */}
          {gameState === 'results' && (
            <div>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 md:p-6 text-center shadow-lg">
                  <Trophy className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 text-[#FFC857]" />
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{score}</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-600">Final Score</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 md:p-6 text-center shadow-lg">
                  <Target className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 text-[#1A3D7C]" />
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{correctCount}</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-600">Correct</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 md:p-6 text-center shadow-lg">
                  <Zap className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 text-purple-600" />
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{maxStreak}</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-600">Best Streak</div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 md:p-6 text-center shadow-lg">
                  <Calculator className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 text-[#FFC857]" />
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{questionsAnswered}</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-600">Questions</div>
                </div>
              </div>

              {/* Accuracy Display */}
              {(() => {
                const accuracy = questionsAnswered > 0
                  ? Math.round((correctCount / questionsAnswered) * 100)
                  : 0;
                const color = accuracy >= 80 ? '#2BAE66' : accuracy >= 60 ? '#FFC857' : '#FF6B6B';
                const message = accuracy >= 90 ? "Amazing! You're a multiplication master!" :
                                accuracy >= 80 ? "Great job! Keep it up!" :
                                accuracy >= 70 ? "Nice work! You're improving!" :
                                accuracy >= 60 ? "Good effort! Practice makes perfect!" :
                                "Keep trying! You'll get better!";

                return (
                  <div className="bg-white rounded-xl p-6 mb-8 text-center">
                    <div className="text-5xl md:text-6xl font-bold mb-2" style={{ color }}>{accuracy}%</div>
                    <div className="text-xl text-gray-600 mb-2">Accuracy</div>
                    <div className="text-lg font-semibold text-gray-700">{message}</div>
                  </div>
                );
              })()}

              {/* Leaderboard */}
              {leaderboard.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Trophy className="w-8 h-8 text-[#FFC857]" />
                    Top 10 High Scores
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="py-3 px-2 md:px-4 text-left font-bold text-gray-700">Rank</th>
                          <th className="py-3 px-2 md:px-4 text-left font-bold text-gray-700">Score</th>
                          <th className="py-3 px-2 md:px-4 text-left font-bold text-gray-700">Correct</th>
                          <th className="py-3 px-2 md:px-4 text-left font-bold text-gray-700 hidden sm:table-cell">Tables</th>
                          <th className="py-3 px-2 md:px-4 text-left font-bold text-gray-700 hidden md:table-cell">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboard.map((entry, index) => (
                          <tr key={index} className={`border-b border-gray-100 ${index === 0 ? 'bg-yellow-50' : ''}`}>
                            <td className="py-3 px-2 md:px-4 text-lg">
                              {index === 0 && '🥇'}
                              {index === 1 && '🥈'}
                              {index === 2 && '🥉'}
                              {index > 2 && `#${index + 1}`}
                            </td>
                            <td className="py-3 px-2 md:px-4 font-bold text-[#2BAE66]">{entry.score}</td>
                            <td className="py-3 px-2 md:px-4">{entry.correct}</td>
                            <td className="py-3 px-2 md:px-4 text-sm hidden sm:table-cell">{entry.tables.join(', ')}</td>
                            <td className="py-3 px-2 md:px-4 text-sm text-gray-600 hidden md:table-cell">{entry.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <button
                  onClick={resetGame}
                  className="px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-full font-bold text-lg hover:shadow-xl transition-all"
                >
                  <RotateCcw className="w-6 h-6 inline mr-2" />
                  Play Again
                </button>
                <button
                  onClick={() => setGameState('setup')}
                  className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-bold text-lg hover:bg-gray-50 transition-all"
                >
                  Change Settings
                </button>
              </div>

              {/* Share Section */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 md:p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center flex items-center justify-center gap-2">
                  <Share2 className="w-7 h-7 text-[#2BAE66]" />
                  Share Your Results!
                </h3>
                <p className="text-gray-600 text-center mb-6">Challenge your friends to beat your score!</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto">
                  {/* WhatsApp */}
                  <button
                    onClick={shareToWhatsApp}
                    className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl hover:shadow-lg transition-all border-2 border-transparent hover:border-[#25D366] group"
                  >
                    <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <span className="font-semibold text-sm text-gray-700">WhatsApp</span>
                  </button>

                  {/* Facebook */}
                  <button
                    onClick={shareToFacebook}
                    className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl hover:shadow-lg transition-all border-2 border-transparent hover:border-[#1877F2] group"
                  >
                    <div className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <span className="font-semibold text-sm text-gray-700">Facebook</span>
                  </button>

                  {/* Twitter/X */}
                  <button
                    onClick={shareToTwitter}
                    className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl hover:shadow-lg transition-all border-2 border-transparent hover:border-[#1DA1F2] group"
                  >
                    <div className="w-12 h-12 bg-[#1DA1F2] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </div>
                    <span className="font-semibold text-sm text-gray-700">Twitter</span>
                  </button>

                  {/* More Options */}
                  <button
                    onClick={handleNativeShare}
                    className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl hover:shadow-lg transition-all border-2 border-transparent hover:border-[#2BAE66] group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Share2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-semibold text-sm text-gray-700">More</span>
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Sharing helps us reach more students. Thank you! 💚
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
