'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Home, ArrowRight, Sparkles, RotateCw, Calculator, Info, Users, HeartHandshake } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoveResult {
  percentage: number;
  message: string;
  category: string;
  color: string;
  emoji: string;
  advice: string;
}

export default function LoveCalculator() {
  const [name1, setName1] = useState<string>('');
  const [name2, setName2] = useState<string>('');
  const [result, setResult] = useState<LoveResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const getResultDetails = (percentage: number): Omit<LoveResult, 'percentage'> => {
    if (percentage >= 90) {
      return {
        message: 'Perfect Match! 💕',
        category: 'Soulmates',
        color: 'from-pink-600 to-rose-600',
        emoji: '😍',
        advice: 'You two are practically soulmates! The chemistry is off the charts, and you complement each other perfectly. This is the kind of connection people dream about.'
      };
    } else if (percentage >= 75) {
      return {
        message: 'Excellent Match! ❤️',
        category: 'Very High Compatibility',
        color: 'from-red-500 to-pink-500',
        emoji: '🥰',
        advice: 'This is a wonderfully strong match! You share great chemistry and understanding. With continued effort and communication, this relationship has amazing potential.'
      };
    } else if (percentage >= 60) {
      return {
        message: 'Good Match! 💗',
        category: 'High Compatibility',
        color: 'from-pink-500 to-purple-500',
        emoji: '😊',
        advice: 'You have a solid foundation for a great relationship. There\'s definitely spark and potential here. Keep nurturing the connection and watch it grow!'
      };
    } else if (percentage >= 45) {
      return {
        message: 'Moderate Match 💖',
        category: 'Medium Compatibility',
        color: 'from-purple-500 to-indigo-500',
        emoji: '🙂',
        advice: 'You have some good chemistry, though it may take effort to build a strong connection. Focus on finding common interests and understanding each other\'s differences.'
      };
    } else if (percentage >= 30) {
      return {
        message: 'Fair Match 💜',
        category: 'Low-Medium Compatibility',
        color: 'from-indigo-500 to-blue-500',
        emoji: '😐',
        advice: 'There are some challenges, but opposites can attract! Success will require patience, communication, and willingness to appreciate your differences.'
      };
    } else {
      return {
        message: 'Challenging Match 💙',
        category: 'Low Compatibility',
        color: 'from-blue-500 to-cyan-500',
        emoji: '🤔',
        advice: 'This might be a tough match, but remember - love isn\'t just about compatibility scores! Sometimes the most unexpected connections can surprise us. Follow your heart!'
      };
    }
  };

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) {
      alert('Please enter both names!');
      return;
    }

    setIsCalculating(true);

    // Simulate calculation animation
    setTimeout(() => {
      // Fun algorithm using name properties
      const combined = (name1 + name2).toLowerCase().replace(/\s/g, '');

      // Count letter frequencies
      const letterCounts: { [key: string]: number } = {};
      for (const char of combined) {
        if (char >= 'a' && char <= 'z') {
          letterCounts[char] = (letterCounts[char] || 0) + 1;
        }
      }

      // Calculate base score from letter frequencies
      let baseScore = 0;
      Object.values(letterCounts).forEach(count => {
        baseScore += count * count;
      });

      // Add length factor
      const lengthFactor = Math.abs(name1.length - name2.length);
      baseScore -= lengthFactor * 2;

      // Count common letters
      const name1Letters = new Set(name1.toLowerCase().replace(/\s/g, ''));
      const name2Letters = new Set(name2.toLowerCase().replace(/\s/g, ''));
      let commonLetters = 0;
      name1Letters.forEach(letter => {
        if (name2Letters.has(letter)) commonLetters++;
      });

      baseScore += commonLetters * 5;

      // Add vowel harmony
      const vowels = ['a', 'e', 'i', 'o', 'u'];
      const name1Vowels = name1.toLowerCase().split('').filter(c => vowels.includes(c)).length;
      const name2Vowels = name2.toLowerCase().split('').filter(c => vowels.includes(c)).length;
      baseScore += Math.abs(name1Vowels - name2Vowels) <= 1 ? 10 : 0;

      // Normalize to percentage (0-100)
      let percentage = (baseScore % 101);

      // Ensure it's between 10 and 100 for better UX
      percentage = Math.max(10, Math.min(100, percentage));

      const details = getResultDetails(percentage);

      setResult({
        percentage,
        ...details
      });

      setIsCalculating(false);
    }, 1500);
  };

  const reset = () => {
    setName1('');
    setName2('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-pink-600 transition-colors">
              <Home className="h-4 w-4" />
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-pink-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-pink-600 font-medium">Love Calculator</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-600 to-rose-600 rounded-2xl mb-4 shadow-lg animate-pulse">
            <Heart className="h-8 w-8 text-white fill-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Love Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Test your love compatibility and discover your romantic match percentage!
          </p>
          <p className="text-sm text-gray-500 mt-2 italic">
            ⚠️ For entertainment purposes only - follow your heart, not the numbers! 💕
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Calculator Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-4 border-pink-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl flex items-center justify-center">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Enter Names</h2>
            </div>

            <div className="space-y-6">
              {/* Name 1 */}
              <div>
                <Label htmlFor="name1" className="text-base font-semibold text-gray-700 mb-3 block flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-pink-600" />
                  Your Name
                </Label>
                <Input
                  id="name1"
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="Enter your name"
                  className="text-lg py-6 border-2 border-pink-200 focus:border-pink-500"
                  onKeyPress={(e) => e.key === 'Enter' && calculateLove()}
                />
              </div>

              {/* Hearts Divider */}
              <div className="flex items-center justify-center space-x-2 my-4">
                <Heart className="h-5 w-5 text-pink-400 fill-pink-400 animate-pulse" />
                <Heart className="h-6 w-6 text-pink-500 fill-pink-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <Heart className="h-5 w-5 text-pink-400 fill-pink-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>

              {/* Name 2 */}
              <div>
                <Label htmlFor="name2" className="text-base font-semibold text-gray-700 mb-3 block flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-rose-600" />
                  Their Name
                </Label>
                <Input
                  id="name2"
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="Enter their name"
                  className="text-lg py-6 border-2 border-rose-200 focus:border-rose-500"
                  onKeyPress={(e) => e.key === 'Enter' && calculateLove()}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={calculateLove}
                  disabled={isCalculating}
                  className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {isCalculating ? (
                    <>
                      <RotateCw className="mr-2 h-5 w-5 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Calculate Love
                    </>
                  )}
                </Button>
                {(name1 || name2 || result) && (
                  <Button
                    onClick={reset}
                    variant="outline"
                    className="px-6 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-pink-50 hover:border-pink-300"
                  >
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-4 border-pink-100">
            {result ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl flex items-center justify-center">
                    <HeartHandshake className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Your Results</h2>
                </div>

                {/* Love Percentage */}
                <div className={`bg-gradient-to-br ${result.color} rounded-2xl p-8 text-center shadow-lg relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10">
                    {[...Array(15)].map((_, i) => (
                      <Heart
                        key={i}
                        className="absolute text-white fill-white animate-pulse"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          width: `${20 + Math.random() * 30}px`,
                          height: `${20 + Math.random() * 30}px`,
                          animationDelay: `${Math.random() * 2}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="relative z-10">
                    <p className="text-white text-lg font-semibold mb-2">{result.message}</p>
                    <div className="text-white text-7xl md:text-8xl font-bold mb-2 drop-shadow-lg">
                      {result.percentage}%
                    </div>
                    <p className="text-white text-xl font-semibold">{result.category}</p>
                    <div className="text-6xl mt-4">{result.emoji}</div>
                  </div>
                </div>

                {/* Names Display */}
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 border-2 border-pink-200">
                  <div className="flex items-center justify-center space-x-3 text-xl font-bold text-gray-800">
                    <span className="text-pink-600">{name1}</span>
                    <Heart className="h-6 w-6 text-rose-500 fill-rose-500" />
                    <span className="text-rose-600">{name2}</span>
                  </div>
                </div>

                {/* Advice */}
                <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                  <div className="flex items-start space-x-3">
                    <Info className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Relationship Advice:</h3>
                      <p className="text-gray-700 leading-relaxed">{result.advice}</p>
                    </div>
                  </div>
                </div>

                {/* Share Button (Placeholder) */}
                <div className="text-center">
                  <p className="text-sm text-gray-500 italic">
                    💡 Remember: True love is built on trust, communication, and mutual respect - not just numbers!
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl flex items-center justify-center mb-6 animate-pulse">
                  <Heart className="h-12 w-12 text-pink-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Test Your Love!</h3>
                <p className="text-gray-600 max-w-sm">
                  Enter two names to discover your romantic compatibility percentage
                </p>
                <div className="mt-6 flex space-x-2">
                  <Heart className="h-8 w-8 text-pink-400 fill-pink-400" />
                  <Heart className="h-8 w-8 text-rose-400 fill-rose-400" />
                  <Heart className="h-8 w-8 text-red-400 fill-red-400" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Love and Compatibility</h2>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What is a Love Calculator?</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                A <strong>love calculator</strong> is a fun, entertainment tool that generates a compatibility percentage between two people based on their names. While these calculators use various algorithms (often based on name letter frequencies, numerology, or simple mathematical formulas), it's important to understand they are <em>purely for entertainment</em> and have no scientific basis for predicting actual romantic compatibility.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Love calculators have become popular online games, especially among teenagers and young adults. They provide a playful way to explore crushes and relationships, but should never be taken as serious relationship advice.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">How Love Calculators Work</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Most love calculators use algorithms that analyze the input names in various ways:
              </p>

              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200 my-6">
                <h4 className="text-lg font-bold text-purple-900 mb-4">Common Calculation Methods:</h4>
                <ul className="space-y-3 text-purple-800">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 text-xl flex-shrink-0">•</span>
                    <div>
                      <strong>Letter Frequency Analysis:</strong> Counting how many times each letter appears in both names combined
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 text-xl flex-shrink-0">•</span>
                    <div>
                      <strong>Common Letters:</strong> Identifying shared letters between the two names
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 text-xl flex-shrink-0">•</span>
                    <div>
                      <strong>Numerology:</strong> Assigning numbers to letters (A=1, B=2, etc.) and performing calculations
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 text-xl flex-shrink-0">•</span>
                    <div>
                      <strong>Name Length:</strong> Comparing the length and structure of both names
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 text-xl flex-shrink-0">•</span>
                    <div>
                      <strong>Pseudo-Random Algorithms:</strong> Using hash functions or deterministic randomization based on name inputs
                    </div>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed">
                The key characteristic of most love calculators is that they produce <strong>consistent results</strong> - entering the same two names will always give the same percentage. This consistency makes the game feel more "authentic," even though the underlying algorithm is arbitrary.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Science of Romantic Compatibility</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                While love calculators are just for fun, real romantic compatibility is a subject of serious scientific study. Psychologists and relationship researchers have identified several factors that genuinely influence relationship success:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                  <h4 className="text-lg font-bold text-red-900 mb-3 flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    Similarity vs. Complementarity
                  </h4>
                  <p className="text-red-800 leading-relaxed text-sm">
                    Research shows that "birds of a feather flock together" - couples with similar values, interests, backgrounds, and personality traits tend to have higher relationship satisfaction. However, some differences can be complementary and enriching.
                  </p>
                </div>

                <div className="bg-pink-50 rounded-xl p-6 border-2 border-pink-200">
                  <h4 className="text-lg font-bold text-pink-900 mb-3 flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Communication Skills
                  </h4>
                  <p className="text-pink-800 leading-relaxed text-sm">
                    The ability to communicate effectively, resolve conflicts constructively, and express needs and emotions is one of the strongest predictors of relationship longevity and happiness.
                  </p>
                </div>

                <div className="bg-rose-50 rounded-xl p-6 border-2 border-rose-200">
                  <h4 className="text-lg font-bold text-rose-900 mb-3 flex items-center">
                    <HeartHandshake className="h-5 w-5 mr-2" />
                    Emotional Intelligence
                  </h4>
                  <p className="text-rose-800 leading-relaxed text-sm">
                    Partners with high emotional intelligence - the ability to recognize, understand, and manage emotions - create healthier, more supportive relationships.
                  </p>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                  <h4 className="text-lg font-bold text-purple-900 mb-3 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Commitment & Trust
                  </h4>
                  <p className="text-purple-800 leading-relaxed text-sm">
                    Mutual commitment to the relationship, trustworthiness, and loyalty form the foundation of lasting love, regardless of initial attraction or compatibility scores.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Types of Love According to Psychology</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Psychologist Robert Sternberg's <strong>Triangular Theory of Love</strong> identifies three components that combine to create different types of love:
              </p>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 my-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Three Components of Love:</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-bold text-gray-900 mb-2">1. Intimacy</h5>
                    <p className="text-gray-700 text-sm">
                      Feelings of closeness, connectedness, and bondedness. This includes sharing personal thoughts, feelings, and experiences.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 mb-2">2. Passion</h5>
                    <p className="text-gray-700 text-sm">
                      The drives that lead to romance, physical attraction, and sexual consummation. The motivational component of love.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 mb-2">3. Commitment</h5>
                    <p className="text-gray-700 text-sm">
                      The decision to love someone and maintain that love over time. The cognitive component involving a conscious choice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto my-6">
                <table className="w-full bg-white rounded-xl border border-gray-200">
                  <thead>
                    <tr className="border-b-2 border-gray-300 bg-gray-50">
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Love Type</th>
                      <th className="text-center py-3 px-4 font-bold text-gray-900">Intimacy</th>
                      <th className="text-center py-3 px-4 font-bold text-gray-900">Passion</th>
                      <th className="text-center py-3 px-4 font-bold text-gray-900">Commitment</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Liking</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="py-3 px-4 text-sm">Deep friendship without passion or commitment</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Infatuation</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="py-3 px-4 text-sm">"Love at first sight" - pure passion</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Empty Love</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="py-3 px-4 text-sm">Commitment without intimacy or passion</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Romantic Love</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="py-3 px-4 text-sm">Intimacy + passion without commitment</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Companionate Love</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="py-3 px-4 text-sm">Long-term friendships or marriages</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold">Fatuous Love</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="py-3 px-4 text-sm">Whirlwind courtship and marriage</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold bg-pink-50">Consummate Love</td>
                      <td className="text-center py-3 px-4 bg-pink-50">✓</td>
                      <td className="text-center py-3 px-4 bg-pink-50">✓</td>
                      <td className="text-center py-3 px-4 bg-pink-50">✓</td>
                      <td className="py-3 px-4 text-sm bg-pink-50"><strong>Complete love - the ideal</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Factors That Actually Predict Relationship Success</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Research by psychologist John Gottman and others has identified key predictors of relationship longevity and satisfaction:
              </p>

              <div className="space-y-6 my-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Positive-to-Negative Interaction Ratio</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Successful couples maintain at least a <strong>5:1 ratio</strong> of positive to negative interactions. This means five positive comments, gestures, or experiences for every negative one. During conflicts, stable couples maintain a 1:1 ratio, while struggling couples often fall below 0.8:1.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">The Four Horsemen (What to Avoid)</h4>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Gottman identified four destructive communication patterns that predict divorce with over 90% accuracy:
                    </p>
                    <ul className="space-y-2 text-gray-700 ml-4">
                      <li>• <strong>Criticism:</strong> Attacking your partner's character instead of addressing specific behavior</li>
                      <li>• <strong>Contempt:</strong> Treating your partner with disrespect, mockery, or sarcasm (the #1 predictor of divorce)</li>
                      <li>• <strong>Defensiveness:</strong> Making excuses or playing the victim instead of taking responsibility</li>
                      <li>• <strong>Stonewalling:</strong> Withdrawing emotionally and shutting down communication</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Emotional Responsiveness</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Partners who consistently respond to each other's "bids for attention" - small requests for connection like "Look at this!" or "How was your day?" - build stronger bonds. Gottman found that couples who stayed together turned toward each other's bids 86% of the time, while those who divorced only did so 33% of the time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Shared Meaning and Values</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Couples who create shared meaning - through rituals, goals, roles, and symbols - report higher satisfaction. This includes sharing similar values about family, religion, life goals, and how to spend time and money.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Conflict Resolution Skills</h4>
                    <p className="text-gray-700 leading-relaxed">
                      It's not whether you fight, but how you fight. Successful couples use "soft startup" for difficult conversations, accept influence from each other, practice repair attempts during arguments, and know when to compromise versus when to accept differences.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">6</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Realistic Expectations</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Understanding that all relationships require work, that conflict is normal, and that your partner cannot meet all your needs leads to healthier, more sustainable relationships. The "soulmate myth" - that perfect partners exist and require no effort - often sabotages otherwise good relationships.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Role of Physical Attraction vs. Compatibility</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                While love calculators often focus on names and mystical compatibility, real relationships involve a complex interplay of attraction and compatibility:
              </p>

              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200 my-6">
                <h4 className="text-lg font-bold text-blue-900 mb-4">Physical Attraction:</h4>
                <ul className="space-y-2 text-blue-800">
                  <li>• <strong>Initial Spark:</strong> Physical attraction often initiates romantic interest and gets relationships started</li>
                  <li>• <strong>Biological Factors:</strong> Influenced by pheromones, facial symmetry, body language, and evolutionary preferences</li>
                  <li>• <strong>Changes Over Time:</strong> Physical attraction can grow or fade; personality and emotional connection become more important long-term</li>
                  <li>• <strong>Not Everything:</strong> Many relationships with strong initial attraction fail, while some with moderate attraction thrive due to deeper compatibility</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200 my-6">
                <h4 className="text-lg font-bold text-green-900 mb-4">Deep Compatibility:</h4>
                <ul className="space-y-2 text-green-800">
                  <li>• <strong>Values Alignment:</strong> Shared beliefs about family, career, lifestyle, money, and life priorities</li>
                  <li>• <strong>Personality Fit:</strong> Complementary or similar personality traits that work well together</li>
                  <li>• <strong>Communication Style:</strong> Compatible ways of expressing needs, resolving conflict, and giving/receiving love</li>
                  <li>• <strong>Life Goals:</strong> Agreement on major life decisions like children, where to live, and long-term plans</li>
                  <li>• <strong>Emotional Needs:</strong> Ability to meet each other's needs for affection, security, adventure, or independence</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Are love calculators accurate?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    No, love calculators are <strong>purely for entertainment</strong> and have no scientific accuracy. They use arbitrary algorithms based on names or birthdates and cannot predict actual romantic compatibility. Real compatibility depends on values, communication, emotional intelligence, and many other factors that a simple name-based calculator cannot assess.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Can names really determine compatibility?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    No. While names are an important part of our identity, they have no inherent power to determine romantic compatibility. Relationship success depends on personality, values, communication skills, emotional maturity, and how partners treat each other - none of which can be derived from names alone.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">What if I get a low compatibility score?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Don't worry! Love calculator results are random and meaningless. A low score has absolutely no bearing on your real relationship potential. Many successful, loving relationships would score poorly on these arbitrary tests. Focus on how you actually feel, how you communicate, and whether you share important values.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">How can I know if someone is right for me?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Real compatibility requires time, communication, and shared experiences. Pay attention to: How do you resolve conflicts? Do you share core values? Can you be yourself around them? Do they support your growth? Are you emotionally safe? Do you have good communication? Trust your feelings and observations over any calculator or test.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">What makes a relationship last?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Research shows lasting relationships share: mutual respect, good communication, ability to resolve conflicts constructively, emotional support, shared values and goals, trust and loyalty, maintaining positive interactions, and commitment to growth. Physical attraction initiates relationships, but these deeper factors sustain them.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Do opposites attract or do similar people work better?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Research generally supports "birds of a feather" - couples with similar values, backgrounds, interests, and personalities tend to have higher satisfaction. However, some differences can be complementary (like one partner being more outgoing while the other is reflective). The key is having similar <strong>core values</strong> even if personalities differ.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Is there such a thing as a soulmate?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    The "soulmate myth" - that there's one perfect person destined for you - is unsupported by research and can actually harm relationships by setting unrealistic expectations. Successful relationships are built through choice, effort, and compatibility, not magical destiny. Many potential good matches exist; what matters is choosing to build a strong relationship with commitment and work.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Can love calculators be harmful?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    When taken seriously, they can be. Some people might end promising relationships or avoid pursuing someone based on a low "compatibility" score. Young people especially might take these seriously. Always remember: these are entertainment only. Real relationship decisions should be based on your actual experiences, feelings, and observations - never on arbitrary online calculators.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">What's the difference between love and infatuation?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Infatuation</strong> is intense but short-lived attraction, often based on idealization and fantasy. It's characterized by obsession, anxiety, and seeing the person as perfect. <strong>Love</strong> develops over time, includes seeing the whole person (flaws included), involves mutual respect and trust, remains stable through ups and downs, and prioritizes the other person's wellbeing alongside your own.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">How important is physical attraction in a relationship?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Physical attraction is typically important initially and remains part of romantic relationships. However, its importance often decreases relative to emotional connection, compatibility, and friendship over time. Research shows that emotional intimacy can enhance physical attraction, while lack of emotional connection can diminish it. Most successful long-term relationships balance both physical and emotional attraction.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Love calculators are fun entertainment tools that can spark conversation or add playful excitement to crushes and relationships. However, they should never be taken as serious indicators of romantic potential. Real love and compatibility are complex, multifaceted experiences that develop through time, communication, shared values, and mutual effort.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you're wondering whether someone is right for you, look beyond numbers and percentages. Pay attention to how you feel around them, how they treat you, how you handle disagreements, whether you share important values, and whether the relationship brings out the best in both of you.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Remember: the most important compatibility factor is mutual commitment to building a healthy, respectful, loving relationship. That's something no calculator can measure - only you can determine through authentic connection and lived experience. 💕
              </p>
            </section>
          </article>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-pink-600 via-rose-600 to-red-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to Understand Relationships Better?
          </h2>
          <p className="text-xl mb-8 text-pink-50 max-w-3xl mx-auto">
            Our psychology and social science tutors can help you understand human relationships, communication, and emotional intelligence
          </p>
          <Link href="/book-demo-class">
            <Button
              size="lg"
              className="bg-white text-pink-600 hover:bg-pink-50 text-lg px-8 py-6 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Book Your Free Session
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
