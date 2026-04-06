'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Brain, Trophy, RotateCcw, Play, Star, Clock, Target, Zap, Share2 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

interface Card {
  id: number;
  type: 'equation' | 'answer';
  value: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

type GameState = 'setup' | 'playing' | 'results';
type Difficulty = 'easy' | 'medium' | 'hard';

interface GameStats {
  moves: number;
  matches: number;
  timeElapsed: number;
  score: number;
}

interface LeaderboardEntry extends GameStats {
  difficulty: Difficulty;
  date: string;
}

const LEADERBOARD_KEY = 'memory-card-match-leaderboard';

export default function MemoryCardMatch() {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [stats, setStats] = useState<GameStats>({
    moves: 0,
    matches: 0,
    timeElapsed: 0,
    score: 0
  });
  const [isChecking, setIsChecking] = useState(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Load leaderboard on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LEADERBOARD_KEY);
      if (stored) {
        try {
          setLeaderboard(JSON.parse(stored).slice(0, 10));
        } catch (e) {
          setLeaderboard([]);
        }
      }
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && !timerInterval) {
      const interval = setInterval(() => {
        setStats(prev => ({ ...prev, timeElapsed: prev.timeElapsed + 1 }));
      }, 1000);
      setTimerInterval(interval);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
    };
  }, [gameState]);

  // Generate card pairs based on difficulty
  const generateCards = (difficulty: Difficulty): Card[] => {
    const pairCounts = { easy: 6, medium: 8, hard: 12 };
    const pairCount = pairCounts[difficulty];

    const mathProblems: { equation: string; answer: string }[] = [];
    const usedProblems = new Set<string>();

    // Generate unique math problems
    while (mathProblems.length < pairCount) {
      const num1 = Math.floor(Math.random() * 12) + 1;
      const num2 = Math.floor(Math.random() * 12) + 1;
      const key = `${num1}x${num2}`;

      if (!usedProblems.has(key)) {
        usedProblems.add(key);
        mathProblems.push({
          equation: `${num1} × ${num2}`,
          answer: String(num1 * num2)
        });
      }
    }

    // Create card pairs
    const cardPairs: Card[] = [];
    mathProblems.forEach((problem, index) => {
      cardPairs.push(
        {
          id: index * 2,
          type: 'equation',
          value: problem.equation,
          pairId: index,
          isFlipped: false,
          isMatched: false
        },
        {
          id: index * 2 + 1,
          type: 'answer',
          value: problem.answer,
          pairId: index,
          isFlipped: false,
          isMatched: false
        }
      );
    });

    // Shuffle cards
    return cardPairs.sort(() => Math.random() - 0.5);
  };

  // Start game
  const startGame = () => {
    const newCards = generateCards(difficulty);
    setCards(newCards);
    setFlippedCards([]);
    setStats({ moves: 0, matches: 0, timeElapsed: 0, score: 0 });
    setGameState('playing');
  };

  // Handle card click
  const handleCardClick = (cardId: number) => {
    if (isChecking) return;
    if (flippedCards.length >= 2) return;
    if (flippedCards.includes(cardId)) return;
    if (cards[cardId].isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Update card state
    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    // Check for match if two cards are flipped
    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      checkMatch(newFlippedCards);
    }
  };

  // Check if two flipped cards match
  const checkMatch = (flipped: number[]) => {
    const [card1Id, card2Id] = flipped;
    const card1 = cards[card1Id];
    const card2 = cards[card2Id];

    setStats(prev => ({ ...prev, moves: prev.moves + 1 }));

    setTimeout(() => {
      if (card1.pairId === card2.pairId) {
        // Match found!
        const newCards = [...cards];
        newCards[card1Id].isMatched = true;
        newCards[card2Id].isMatched = true;
        setCards(newCards);

        const newMatches = stats.matches + 1;
        const timeBonusPoints = Math.max(0, 100 - stats.timeElapsed);
        const movesPenalty = stats.moves * 2;
        const matchBonus = 50;
        const newScore = stats.score + matchBonus + timeBonusPoints - movesPenalty;

        setStats(prev => ({
          ...prev,
          matches: newMatches,
          score: Math.max(0, newScore)
        }));

        // Check if game is complete
        if (newMatches === cards.length / 2) {
          endGame();
        }
      } else {
        // No match - flip cards back
        const newCards = [...cards];
        newCards[card1Id].isFlipped = false;
        newCards[card2Id].isFlipped = false;
        setCards(newCards);
      }

      setFlippedCards([]);
      setIsChecking(false);
    }, 800);
  };

  // End game
  const endGame = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setGameState('results');
    saveToLeaderboard();
  };

  // Save to leaderboard
  const saveToLeaderboard = () => {
    if (typeof window === 'undefined') return;

    const newEntry: LeaderboardEntry = {
      ...stats,
      difficulty,
      date: new Date().toLocaleDateString()
    };

    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    setLeaderboard(updated);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
  };

  // Reset game
  const resetGame = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setGameState('setup');
    setCards([]);
    setFlippedCards([]);
    setStats({ moves: 0, matches: 0, timeElapsed: 0, score: 0 });
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get grid columns based on difficulty
  const getGridCols = () => {
    switch (difficulty) {
      case 'easy': return 'grid-cols-3 md:grid-cols-4';
      case 'medium': return 'grid-cols-4 md:grid-cols-4';
      case 'hard': return 'grid-cols-4 md:grid-cols-6';
      default: return 'grid-cols-4';
    }
  };

  // Share results
  const getShareText = () => {
    return `🧠 Memory Card Match Results!\n\n` +
      `🏆 Score: ${stats.score}\n` +
      `⏱️ Time: ${formatTime(stats.timeElapsed)}\n` +
      `🎯 Moves: ${stats.moves}\n` +
      `✅ Matches: ${stats.matches}\n` +
      `📊 Difficulty: ${difficulty.toUpperCase()}\n\n` +
      `Can you beat my score?`;
  };

  const handleNativeShare = async () => {
    const shareText = getShareText();
    const url = 'https://www.thetutorbridge.com/brain-games/memory-card-match';

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Memory Card Match Results',
          text: shareText + '\n\n' + url,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText + '\n\n' + url);
        alert('Results copied to clipboard!');
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
            <Link href="/brain-games" className="text-[#1A3D7C] hover:text-[#2BAE66]">
              Brain Games
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Memory Card Match</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-12 h-12 mr-3 text-purple-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Memory Card Match
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Match multiplication equations with their answers!
            </p>
          </div>

          {/* Setup Screen */}
          {gameState === 'setup' && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Difficulty</h2>
              <p className="text-gray-600 mb-6">Select how challenging you want the game to be</p>

              {/* Difficulty Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  { level: 'easy' as Difficulty, pairs: 6, label: 'Easy', color: 'from-green-500 to-emerald-500' },
                  { level: 'medium' as Difficulty, pairs: 8, label: 'Medium', color: 'from-blue-500 to-cyan-500' },
                  { level: 'hard' as Difficulty, pairs: 12, label: 'Hard', color: 'from-purple-500 to-pink-500' }
                ].map(({ level, pairs, label, color }) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`p-6 rounded-xl font-bold text-lg transition-all ${
                      difficulty === level
                        ? `bg-gradient-to-r ${color} text-white shadow-lg scale-105`
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{label}</div>
                    <div className="text-sm opacity-90">{pairs} pairs ({pairs * 2} cards)</div>
                  </button>
                ))}
              </div>

              {/* Game Info */}
              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-6">
                <h4 className="font-bold text-gray-900 mb-2">How to Play:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Click cards to flip and reveal equations or answers</li>
                  <li>• Find matching pairs (equation + answer)</li>
                  <li>• Match all pairs to win!</li>
                  <li>• Fewer moves and less time = higher score</li>
                </ul>
              </div>

              {/* Start Button */}
              <button
                onClick={startGame}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold text-xl hover:shadow-xl transition-all"
              >
                <Play className="w-6 h-6 inline mr-2" />
                Start Game
              </button>
            </div>
          )}

          {/* Playing Screen */}
          {gameState === 'playing' && (
            <div>
              {/* Stats Bar */}
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-gray-900">{formatTime(stats.timeElapsed)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-gray-900">Moves: {stats.moves}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  <span className="font-bold text-gray-900">Matches: {stats.matches}/{cards.length / 2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#2BAE66]" />
                  <span className="font-bold text-gray-900">Score: {stats.score}</span>
                </div>
              </div>

              {/* Card Grid */}
              <div className={`grid ${getGridCols()} gap-3 md:gap-4 mb-6`}>
                {cards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    disabled={card.isMatched || card.isFlipped || isChecking}
                    className={`aspect-square rounded-xl font-bold text-lg md:text-xl transition-all transform ${
                      card.isMatched
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white scale-95 opacity-50'
                        : card.isFlipped
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                        : 'bg-gradient-to-br from-gray-200 to-gray-300 text-transparent hover:scale-105 hover:shadow-md'
                    } disabled:cursor-not-allowed`}
                  >
                    <div className="flex items-center justify-center h-full p-2">
                      {(card.isFlipped || card.isMatched) ? card.value : '?'}
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={resetGame}
                className="w-full px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-all"
              >
                <RotateCcw className="w-5 h-5 inline mr-2" />
                Reset Game
              </button>
            </div>
          )}

          {/* Results Screen */}
          {gameState === 'results' && (
            <div>
              {/* Celebration */}
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h2>
                <p className="text-xl text-gray-600">You matched all the cards!</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center shadow-lg">
                  <Trophy className="w-12 h-12 mx-auto mb-3 text-[#FFC857]" />
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stats.score}</div>
                  <div className="text-sm font-semibold text-gray-600">Final Score</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center shadow-lg">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                  <div className="text-4xl font-bold text-gray-900 mb-2">{formatTime(stats.timeElapsed)}</div>
                  <div className="text-sm font-semibold text-gray-600">Time</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center shadow-lg">
                  <Target className="w-12 h-12 mx-auto mb-3 text-green-600" />
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stats.moves}</div>
                  <div className="text-sm font-semibold text-gray-600">Moves</div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 text-center shadow-lg">
                  <Zap className="w-12 h-12 mx-auto mb-3 text-amber-600" />
                  <div className="text-4xl font-bold text-gray-900 mb-2">{difficulty.toUpperCase()}</div>
                  <div className="text-sm font-semibold text-gray-600">Difficulty</div>
                </div>
              </div>

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
                          <th className="py-3 px-4 text-left font-bold text-gray-700">Rank</th>
                          <th className="py-3 px-4 text-left font-bold text-gray-700">Score</th>
                          <th className="py-3 px-4 text-left font-bold text-gray-700">Moves</th>
                          <th className="py-3 px-4 text-left font-bold text-gray-700 hidden sm:table-cell">Time</th>
                          <th className="py-3 px-4 text-left font-bold text-gray-700 hidden md:table-cell">Difficulty</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboard.map((entry, index) => (
                          <tr key={index} className={`border-b border-gray-100 ${index === 0 ? 'bg-yellow-50' : ''}`}>
                            <td className="py-3 px-4">
                              {index === 0 && '🥇'}
                              {index === 1 && '🥈'}
                              {index === 2 && '🥉'}
                              {index > 2 && `#${index + 1}`}
                            </td>
                            <td className="py-3 px-4 font-bold text-purple-600">{entry.score}</td>
                            <td className="py-3 px-4">{entry.moves}</td>
                            <td className="py-3 px-4 hidden sm:table-cell">{formatTime(entry.timeElapsed)}</td>
                            <td className="py-3 px-4 text-sm hidden md:table-cell">{entry.difficulty}</td>
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
                  onClick={startGame}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg hover:shadow-xl transition-all"
                >
                  <RotateCcw className="w-6 h-6 inline mr-2" />
                  Play Again
                </button>
                <button
                  onClick={resetGame}
                  className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-bold text-lg hover:bg-gray-50 transition-all"
                >
                  Change Difficulty
                </button>
              </div>

              {/* Share Section */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center flex items-center justify-center gap-2">
                  <Share2 className="w-7 h-7 text-purple-600" />
                  Share Your Results!
                </h3>
                <p className="text-gray-600 text-center mb-6">Challenge your friends to beat your score!</p>

                <div className="flex justify-center">
                  <button
                    onClick={handleNativeShare}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    <Share2 className="w-5 h-5 inline mr-2" />
                    Share Results
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
