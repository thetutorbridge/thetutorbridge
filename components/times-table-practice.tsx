'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, RotateCcw, Play, Trophy, Target, Printer, BookOpen, Lightbulb } from 'lucide-react';

interface TimesTablePracticeProps {
  table: number;
}

interface Question {
  multiplier: number;
  answer: number;
}

type Mode = 'learn' | 'practice';

export function TimesTablePractice({ table }: TimesTablePracticeProps) {
  const [mode, setMode] = useState<Mode>('learn');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [completedMultipliers, setCompletedMultipliers] = useState<Set<number>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  const allMultipliers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  useEffect(() => {
    if (mode === 'practice' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestion, mode]);

  const generateQuestion = (): Question => {
    const multiplier = allMultipliers[Math.floor(Math.random() * allMultipliers.length)];
    return {
      multiplier,
      answer: table * multiplier
    };
  };

  const startPractice = () => {
    setMode('practice');
    setScore(0);
    setQuestionsAsked(0);
    setCorrectCount(0);
    setCompletedMultipliers(new Set());
    setFeedback(null);
    setUserAnswer('');
    setCurrentQuestion(generateQuestion());
  };

  const checkAnswer = () => {
    if (!currentQuestion || userAnswer.trim() === '') return;

    const answer = parseInt(userAnswer);
    const isCorrect = answer === currentQuestion.answer;

    if (isCorrect) {
      setScore(prev => prev + 10);
      setCorrectCount(prev => prev + 1);
      setFeedback('correct');
      setCompletedMultipliers(prev => new Set([...prev, currentQuestion.multiplier]));
    } else {
      setFeedback('incorrect');
    }

    setQuestionsAsked(prev => prev + 1);

    setTimeout(() => {
      setFeedback(null);
      setUserAnswer('');
      setCurrentQuestion(generateQuestion());
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  const resetPractice = () => {
    setMode('learn');
    setScore(0);
    setQuestionsAsked(0);
    setCorrectCount(0);
    setCompletedMultipliers(new Set());
    setFeedback(null);
    setUserAnswer('');
    setCurrentQuestion(null);
  };

  const getTips = (table: number): string[] => {
    const tips: { [key: number]: string[] } = {
      2: [
        "Double the number! 2 × 5 is the same as 5 + 5",
        "All answers are even numbers",
        "Count by 2s: 2, 4, 6, 8, 10, 12..."
      ],
      3: [
        "Add the number three times: 3 × 4 = 4 + 4 + 4",
        "The sum of digits in answers follows a pattern",
        "Skip count by 3s: 3, 6, 9, 12, 15..."
      ],
      4: [
        "Double, then double again! 4 × 5 = (5 × 2) × 2",
        "Think of quarters: 4 quarters = $1",
        "All answers are even numbers"
      ],
      5: [
        "All answers end in 0 or 5",
        "Use your hand - 5 fingers help count!",
        "Half of ten: 5 × 6 = half of (10 × 6)"
      ],
      6: [
        "Double the 3 times table: 6 × 4 = 2 × (3 × 4)",
        "Add 6 each time: 6, 12, 18, 24...",
        "Think of 6-packs!"
      ],
      7: [
        "Add 7 each time - practice skip counting",
        "7 × 8 = 56 (rhyme: '5, 6, 7, 8')",
        "Most challenging table - practice makes perfect!"
      ],
      8: [
        "Double the 4 times table",
        "Think of octopuses with 8 legs",
        "Count by 8s: 8, 16, 24, 32..."
      ],
      9: [
        "Fingers trick: Hold down finger #N, count fingers before (tens) and after (ones)",
        "Sum of digits always equals 9 (up to 9×10)",
        "One less than the 10 times table minus the multiplier"
      ],
      10: [
        "Easiest! Just add a zero",
        "10 × 7 = 70 (7 with a 0)",
        "Count by tens: 10, 20, 30, 40..."
      ],
      11: [
        "Up to 11 × 9: just repeat the digit (11 × 4 = 44)",
        "11 × 10 = 110, 11 × 11 = 121, 11 × 12 = 132",
        "Add the number to itself shifted left"
      ],
      12: [
        "Think of dozens - 12 eggs in a carton",
        "Add 10 times table + 2 times table",
        "12 × 5 = 60 (5 dozen = 60)"
      ]
    };

    return tips[table] || ["Practice makes perfect!", "Use skip counting", "Look for patterns"];
  };

  const printTable = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto">
      {mode === 'learn' && (
        <div className="space-y-8">
          {/* Visual Times Table Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
              {table} Times Table
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {allMultipliers.map(multiplier => {
                const answer = table * multiplier;
                return (
                  <div
                    key={multiplier}
                    className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200"
                  >
                    <p className="text-2xl font-bold text-gray-800">
                      {table} × {multiplier} = <span className="text-blue-600">{answer}</span>
                    </p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={startPractice}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xl font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center shadow-lg"
            >
              <Play className="w-6 h-6 mr-2" />
              Start Practice Quiz
            </button>
          </div>

          {/* Tips and Tricks */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Lightbulb className="w-7 h-7 text-yellow-600 mr-3" />
              Tips & Tricks for the {table} Times Table
            </h3>
            <ul className="space-y-3">
              {getTips(table).map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-600 text-xl mr-3">💡</span>
                  <p className="text-gray-700 text-lg">{tip}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Printable Version */}
          <div className="bg-white rounded-2xl shadow-xl p-8 print:shadow-none">
            <button
              onClick={printTable}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center shadow-lg print:hidden"
            >
              <Printer className="w-5 h-5 mr-2" />
              Print This Times Table
            </button>

            <div className="print:block hidden mt-8">
              <h2 className="text-4xl font-bold text-center mb-8">{table} Times Table</h2>
              <div className="space-y-2">
                {allMultipliers.map(multiplier => (
                  <p key={multiplier} className="text-2xl">
                    {table} × {multiplier} = {table * multiplier}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {mode === 'practice' && currentQuestion && (
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Score</p>
                <p className="text-3xl font-bold text-blue-600">{score}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Accuracy</p>
                <p className="text-3xl font-bold text-green-600">
                  {questionsAsked > 0 ? Math.round((correctCount / questionsAsked) * 100) : 0}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Questions</p>
                <p className="text-3xl font-bold text-purple-600">{questionsAsked}</p>
              </div>
            </div>

            <button
              onClick={resetPractice}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition-all flex items-center"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Back to Learn
            </button>
          </div>

          {/* Progress Tracker */}
          <div className="mb-8">
            <p className="text-sm text-gray-600 mb-2">Practice Progress:</p>
            <div className="flex flex-wrap gap-2">
              {allMultipliers.map(mult => (
                <div
                  key={mult}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                    completedMultipliers.has(mult)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {mult}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-6xl md:text-7xl font-bold text-gray-800 mb-8">
              {table} × {currentQuestion.multiplier} = ?
            </p>

            <input
              ref={inputRef}
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`w-full max-w-md mx-auto text-4xl md:text-5xl font-bold text-center border-4 rounded-xl p-4 focus:outline-none transition-colors ${
                feedback === 'correct'
                  ? 'border-green-500 bg-green-50'
                  : feedback === 'incorrect'
                  ? 'border-red-500 bg-red-50'
                  : 'border-blue-300 focus:border-blue-600'
              }`}
              placeholder="?"
              autoFocus
            />

            {feedback && (
              <div className="mt-4 flex items-center justify-center">
                {feedback === 'correct' ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-8 h-8 mr-2" />
                    <span className="text-2xl font-bold">Correct!</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <XCircle className="w-8 h-8 mr-2" />
                    <span className="text-2xl font-bold">
                      Incorrect. Answer: {currentQuestion.answer}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={checkAnswer}
            disabled={!userAnswer.trim() || feedback !== null}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-xl font-bold py-4 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
          >
            <Target className="w-6 h-6 mr-2" />
            Check Answer (Enter)
          </button>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">Correct</p>
              <p className="text-3xl font-bold text-green-600">{correctCount}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">Incorrect</p>
              <p className="text-3xl font-bold text-red-600">{questionsAsked - correctCount}</p>
            </div>
          </div>

          {completedMultipliers.size === 12 && (
            <div className="mt-8 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-400">
              <div className="flex items-center justify-center mb-3">
                <Trophy className="w-10 h-10 text-yellow-600" />
              </div>
              <p className="text-center text-xl font-bold text-gray-800">
                🎉 Congratulations! You've practiced all {table} times table problems!
              </p>
              <p className="text-center text-gray-600 mt-2">
                Accuracy: {Math.round((correctCount / questionsAsked) * 100)}% • Keep practicing to improve!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
