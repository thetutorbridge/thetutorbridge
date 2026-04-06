'use client';

import { useState, useEffect, useRef } from 'react';
import { Trophy, Clock, Play, RotateCcw, CheckCircle, XCircle, Zap, Target, Share2, TrendingUp, Award, Brain } from 'lucide-react';

interface Question {
  question: string;
  correctAnswer: number;
  operation: string;
}

interface LeaderboardEntry {
  score: number;
  correct: number;
  incorrect: number;
  accuracy: number;
  date: string;
  grade: number;
}

type GameState = 'setup' | 'playing' | 'results';

interface MentalMathGameProps {
  grade: number;
  gradeTitle: string;
}

export function MentalMathGame({ grade, gradeTitle }: MentalMathGameProps) {
  // Core Game State
  const [gameState, setGameState] = useState<GameState>('setup');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Question State
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Scoring State
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [shareText, setShareText] = useState('');
  const [showCopied, setShowCopied] = useState(false);

  const LEADERBOARD_KEY = `mental-math-grade-${grade}-leaderboard`;

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
  }, [LEADERBOARD_KEY]);

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

  // Focus input when question changes
  useEffect(() => {
    if (gameState === 'playing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestion, gameState]);

  // Generate grade-appropriate questions
  const generateQuestion = (): Question => {
    const operations = getOperationsForGrade(grade);
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let num1: number, num2: number, correctAnswer: number, question: string;

    switch (operation) {
      case 'addition':
        [num1, num2] = getNumbersForGrade(grade, 'addition');
        correctAnswer = num1 + num2;
        question = `${num1} + ${num2}`;
        break;
      case 'subtraction':
        [num1, num2] = getNumbersForGrade(grade, 'subtraction');
        if (num1 < num2) [num1, num2] = [num2, num1]; // Ensure positive result for lower grades
        correctAnswer = num1 - num2;
        question = `${num1} - ${num2}`;
        break;
      case 'multiplication':
        [num1, num2] = getNumbersForGrade(grade, 'multiplication');
        correctAnswer = num1 * num2;
        question = `${num1} × ${num2}`;
        break;
      case 'division':
        [num1, num2] = getNumbersForGrade(grade, 'division');
        correctAnswer = num1;
        const dividend = num1 * num2;
        question = `${dividend} ÷ ${num2}`;
        break;
      default:
        [num1, num2] = getNumbersForGrade(grade, 'addition');
        correctAnswer = num1 + num2;
        question = `${num1} + ${num2}`;
    }

    return { question, correctAnswer, operation };
  };

  const getOperationsForGrade = (grade: number): string[] => {
    switch (grade) {
      case 3:
        return ['addition', 'subtraction', 'multiplication'];
      case 4:
        return ['addition', 'subtraction', 'multiplication', 'division'];
      case 5:
      case 6:
      case 7:
      case 8:
        return ['addition', 'subtraction', 'multiplication', 'division'];
      default:
        return ['addition', 'subtraction'];
    }
  };

  const getNumbersForGrade = (grade: number, operation: string): [number, number] => {
    switch (grade) {
      case 3:
        if (operation === 'addition' || operation === 'subtraction') {
          return [Math.floor(Math.random() * 50) + 1, Math.floor(Math.random() * 50) + 1];
        }
        if (operation === 'multiplication') {
          return [Math.floor(Math.random() * 5) + 2, Math.floor(Math.random() * 12) + 1];
        }
        return [Math.floor(Math.random() * 20) + 1, Math.floor(Math.random() * 20) + 1];

      case 4:
        if (operation === 'addition' || operation === 'subtraction') {
          return [Math.floor(Math.random() * 200) + 1, Math.floor(Math.random() * 200) + 1];
        }
        if (operation === 'multiplication') {
          return [Math.floor(Math.random() * 12) + 1, Math.floor(Math.random() * 12) + 1];
        }
        if (operation === 'division') {
          const divisor = Math.floor(Math.random() * 12) + 1;
          const quotient = Math.floor(Math.random() * 12) + 1;
          return [quotient, divisor];
        }
        return [Math.floor(Math.random() * 100) + 1, Math.floor(Math.random() * 100) + 1];

      case 5:
        if (operation === 'addition' || operation === 'subtraction') {
          return [Math.floor(Math.random() * 500) + 1, Math.floor(Math.random() * 500) + 1];
        }
        if (operation === 'multiplication') {
          return [Math.floor(Math.random() * 15) + 1, Math.floor(Math.random() * 15) + 1];
        }
        if (operation === 'division') {
          const divisor = Math.floor(Math.random() * 15) + 1;
          const quotient = Math.floor(Math.random() * 20) + 1;
          return [quotient, divisor];
        }
        return [Math.floor(Math.random() * 200) + 1, Math.floor(Math.random() * 200) + 1];

      case 6:
        if (operation === 'addition' || operation === 'subtraction') {
          return [Math.floor(Math.random() * 1000) + 1, Math.floor(Math.random() * 1000) + 1];
        }
        if (operation === 'multiplication') {
          return [Math.floor(Math.random() * 20) + 1, Math.floor(Math.random() * 20) + 1];
        }
        if (operation === 'division') {
          const divisor = Math.floor(Math.random() * 20) + 1;
          const quotient = Math.floor(Math.random() * 25) + 1;
          return [quotient, divisor];
        }
        return [Math.floor(Math.random() * 500) + 1, Math.floor(Math.random() * 500) + 1];

      case 7:
        if (operation === 'addition' || operation === 'subtraction') {
          return [Math.floor(Math.random() * 2000) - 500, Math.floor(Math.random() * 2000) - 500];
        }
        if (operation === 'multiplication') {
          return [Math.floor(Math.random() * 25) + 1, Math.floor(Math.random() * 25) + 1];
        }
        if (operation === 'division') {
          const divisor = Math.floor(Math.random() * 25) + 1;
          const quotient = Math.floor(Math.random() * 30) + 1;
          return [quotient, divisor];
        }
        return [Math.floor(Math.random() * 1000) + 1, Math.floor(Math.random() * 1000) + 1];

      case 8:
        if (operation === 'addition' || operation === 'subtraction') {
          return [Math.floor(Math.random() * 5000) - 1000, Math.floor(Math.random() * 5000) - 1000];
        }
        if (operation === 'multiplication') {
          return [Math.floor(Math.random() * 30) + 1, Math.floor(Math.random() * 30) + 1];
        }
        if (operation === 'division') {
          const divisor = Math.floor(Math.random() * 30) + 1;
          const quotient = Math.floor(Math.random() * 40) + 1;
          return [quotient, divisor];
        }
        return [Math.floor(Math.random() * 2000) + 1, Math.floor(Math.random() * 2000) + 1];

      default:
        return [Math.floor(Math.random() * 50) + 1, Math.floor(Math.random() * 50) + 1];
    }
  };

  const startGame = () => {
    setGameState('playing');
    setIsRunning(true);
    setTimeLeft(60);
    setScore(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setStreak(0);
    setMaxStreak(0);
    setQuestionsAnswered(0);
    setUserAnswer('');
    setCurrentQuestion(generateQuestion());
  };

  const endGame = () => {
    setGameState('results');
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    const accuracy = questionsAnswered > 0 ? Math.round((correctCount / questionsAnswered) * 100) : 0;
    const newEntry: LeaderboardEntry = {
      score,
      correct: correctCount,
      incorrect: incorrectCount,
      accuracy,
      date: new Date().toISOString(),
      grade
    };

    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    setLeaderboard(updatedLeaderboard);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedLeaderboard));
    }

    generateShareText(newEntry);
  };

  const generateShareText = (entry: LeaderboardEntry) => {
    const text = `🧠 Mental Math Challenge - Grade ${grade}\n\n` +
      `✅ Score: ${entry.score} points\n` +
      `🎯 Correct: ${entry.correct}/${questionsAnswered}\n` +
      `📊 Accuracy: ${entry.accuracy}%\n` +
      `🔥 Best Streak: ${maxStreak}\n\n` +
      `Can you beat my score? Try it at:\n` +
      `https://www.thetutorbridge.com/brain-games/mental-math-grade-${grade}`;
    setShareText(text);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Mental Math Challenge - Grade ${grade}`,
          text: shareText
        });
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const checkAnswer = () => {
    if (!currentQuestion || userAnswer.trim() === '') return;

    const answer = parseInt(userAnswer);
    const isCorrect = answer === currentQuestion.correctAnswer;

    if (isCorrect) {
      const points = Math.max(10, Math.floor(timeLeft / 6)); // More points for faster answers
      setScore(prev => prev + points);
      setCorrectCount(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        setMaxStreak(current => Math.max(current, newStreak));
        return newStreak;
      });
    } else {
      setIncorrectCount(prev => prev + 1);
      setStreak(0);
    }

    setQuestionsAnswered(prev => prev + 1);
    setUserAnswer('');
    setCurrentQuestion(generateQuestion());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {gameState === 'setup' && (
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-16 h-16 text-purple-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Mental Math Challenge
            </h2>
            <p className="text-xl text-purple-600 font-semibold mb-2">{gradeTitle}</p>
            <p className="text-gray-600 text-lg">
              Answer as many questions correctly as you can in 60 seconds!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <Clock className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Time Limit</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600">60 seconds</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <Target className="w-6 h-6 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Goal</h3>
              </div>
              <p className="text-gray-700 text-lg">Maximum points and accuracy!</p>
            </div>
          </div>

          <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Play:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Solve mental math problems as quickly as possible</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Faster answers earn more points (up to 10 per question)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Build streaks for bonus achievements</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Type your answer and press Enter to submit</span>
              </li>
            </ul>
          </div>

          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center shadow-lg"
          >
            <Play className="w-6 h-6 mr-2" />
            Start Challenge
          </button>

          {leaderboard.length > 0 && (
            <div className="mt-8 p-6 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl">
              <div className="flex items-center mb-4">
                <Trophy className="w-6 h-6 text-yellow-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Your Best Scores</h3>
              </div>
              <div className="space-y-2">
                {leaderboard.slice(0, 5).map((entry, index) => (
                  <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-800">{entry.score} points</p>
                        <p className="text-sm text-gray-600">
                          {entry.correct} correct • {entry.accuracy}% accuracy
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {gameState === 'playing' && currentQuestion && (
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Score</p>
                <p className="text-2xl font-bold text-purple-600">{score}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Streak</p>
                <p className="text-2xl font-bold text-orange-600 flex items-center">
                  <Zap className="w-5 h-5 mr-1" />
                  {streak}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Questions</p>
                <p className="text-2xl font-bold text-blue-600">{questionsAnswered}</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Time Left</p>
              <div className={`text-3xl font-bold ${timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-green-600'}`}>
                <Clock className="w-6 h-6 inline mr-1" />
                {timeLeft}s
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-6xl md:text-7xl font-bold text-gray-800 mb-8">
              {currentQuestion.question} = ?
            </p>

            <input
              ref={inputRef}
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full max-w-md mx-auto text-4xl md:text-5xl font-bold text-center border-4 border-purple-300 rounded-xl p-4 focus:outline-none focus:border-purple-600 transition-colors"
              placeholder="?"
              autoFocus
            />
          </div>

          <button
            onClick={checkAnswer}
            disabled={!userAnswer.trim()}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xl font-bold py-4 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
          >
            <CheckCircle className="w-6 h-6 mr-2" />
            Submit Answer (Enter)
          </button>

          <div className="mt-6 grid grid-cols-2 gap-4 text-center">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Correct</p>
              <p className="text-2xl font-bold text-green-600">{correctCount}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Incorrect</p>
              <p className="text-2xl font-bold text-red-600">{incorrectCount}</p>
            </div>
          </div>
        </div>
      )}

      {gameState === 'results' && (
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Award className="w-20 h-20 text-yellow-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Challenge Complete!
            </h2>
            <p className="text-xl text-purple-600 font-semibold">{gradeTitle}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center">
              <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Final Score</p>
              <p className="text-4xl font-bold text-purple-600">{score}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Accuracy</p>
              <p className="text-4xl font-bold text-green-600">
                {questionsAnswered > 0 ? Math.round((correctCount / questionsAnswered) * 100) : 0}%
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 text-center">
              <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Correct</p>
              <p className="text-4xl font-bold text-blue-600">{correctCount}</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 text-center">
              <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Best Streak</p>
              <p className="text-4xl font-bold text-orange-600">{maxStreak}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={handleShare}
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center shadow-lg relative"
            >
              <Share2 className="w-5 h-5 mr-2" />
              {showCopied ? 'Copied!' : 'Share Results'}
            </button>

            <button
              onClick={startGame}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center shadow-lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </button>
          </div>

          {leaderboard.length > 0 && (
            <div className="mt-8 p-6 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl">
              <div className="flex items-center mb-4">
                <Trophy className="w-6 h-6 text-yellow-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Top Scores</h3>
              </div>
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between rounded-lg p-3 ${
                      entry.score === score && entry.date === leaderboard[leaderboard.length - 1].date
                        ? 'bg-purple-100 border-2 border-purple-400'
                        : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-800">{entry.score} points</p>
                        <p className="text-sm text-gray-600">
                          {entry.correct} correct • {entry.accuracy}% accuracy
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
