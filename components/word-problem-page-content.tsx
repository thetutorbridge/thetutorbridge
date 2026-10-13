'use client';

import Link from 'next/link';
import { Home, BookOpen, Calculator, AlertCircle, Lightbulb, ArrowRight, CheckCircle, Info } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { WordProblemData } from '@/lib/word-problems-data';

interface WordProblemPageContentProps {
  data: WordProblemData;
}

export default function WordProblemPageContent({ data }: WordProblemPageContentProps) {
  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${data.title} - Word Problem Solution`,
    description: data.problem,
    author: {
      '@type': 'Organization',
      name: 'The Tutor Bridge',
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Tutor Bridge',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.thetutorbridge.com/logo.png',
      },
    },
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString(),
  };

  // HowTo Schema for SEO
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Solve: ${data.title}`,
    description: data.problem,
    step: data.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.description,
      text: step.calculation || step.result || step.description,
    })),
    totalTime: 'PT3M',
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.thetutorbridge.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Word Problems',
        item: 'https://www.thetutorbridge.com/word-problems',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: data.title,
        item: `https://www.thetutorbridge.com/word-problems/${data.slug}`,
      },
    ],
  };

  // FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the answer to this ${data.category.replace('-', ' ')}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The answer is ${data.answerFormatted}. This is found by ${data.steps[0]?.description.toLowerCase() || 'solving step by step'}.`
        }
      },
      {
        '@type': 'Question',
        name: `How do you solve ${data.category.replace('-', ' ')}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `To solve ${data.category.replace('-', ' ')}, follow these steps: 1) Read the problem carefully and identify what's being asked. 2) Extract key information and variables. 3) Set up an equation or use the appropriate formula. 4) Solve step by step. 5) Check your answer makes sense in context.`
        }
      },
      {
        '@type': 'Question',
        name: 'What are the key steps to solving word problems?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The key steps are: 1) Read carefully to understand what is asked. 2) Identify and list known information. 3) Define variables for unknowns. 4) Translate words into mathematical equations. 5) Solve the equation(s). 6) Verify your answer makes sense in the real-world context.'
        }
      },
      {
        '@type': 'Question',
        name: `What formula is used for ${data.category.replace('-', ' ')}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: data.formula
            ? `The formula used is: ${data.formula}. This formula helps relate the known and unknown quantities in the problem.`
            : `This type of problem typically involves setting up equations based on the relationships described in the problem, then solving for the unknown using algebraic techniques.`
        }
      },
      {
        '@type': 'Question',
        name: 'Why are word problems important in math?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Word problems are important because they teach you to apply math to real-life situations. They develop critical thinking, reading comprehension, and problem-solving skills. Mastering word problems prepares you for practical applications of math in science, engineering, finance, and everyday life.'
        }
      }
    ]
  };

  const getDifficultyColor = () => {
    if (data.difficulty === 'easy') return 'bg-green-100 text-green-700 border-green-300';
    if (data.difficulty === 'medium') return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return 'bg-red-100 text-red-700 border-red-300';
  };

  const getCategoryColor = () => {
    if (data.category === 'age-problems') return 'from-blue-500 to-cyan-500';
    if (data.category === 'distance-speed-time') return 'from-green-500 to-teal-500';
    if (data.category === 'money-problems') return 'from-purple-500 to-pink-500';
    if (data.category === 'percentage-problems') return 'from-orange-500 to-red-500';
    if (data.category === 'number-problems') return 'from-indigo-500 to-blue-500';
    if (data.category === 'geometry-word-problems') return 'from-pink-500 to-rose-500';
    return 'from-gray-500 to-slate-500';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
            <Link href="/word-problems" className="text-[#1A3D7C] hover:text-[#2BAE66]">
              Word Problems
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 capitalize">{data.category.replace('-', ' ')}</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {data.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${getDifficultyColor()} capitalize`}>
                    {data.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700 border-2 border-gray-300">
                    {data.gradeLevel}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-50 text-gray-600 border-2 border-gray-200 capitalize">
                    {data.subcategory.replace('-', ' ')}
                  </span>
                </div>
              </div>
              <BookOpen className="w-12 h-12 text-[#2BAE66]" />
            </div>
          </div>

          {/* Problem Statement */}
          <div className={`bg-gradient-to-r ${getCategoryColor()} rounded-2xl shadow-xl p-8 mb-8 text-white`}>
            <div className="flex items-center mb-4">
              <Calculator className="w-8 h-8 mr-3" />
              <h2 className="text-2xl font-bold">The Problem</h2>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border-2 border-white/30">
              <p className="text-xl leading-relaxed">
                {data.problem}
              </p>
            </div>
          </div>

          {/* Quick Answer */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg text-gray-600 mb-2">Answer:</p>
                <p className="text-4xl font-bold text-green-700">
                  {data.answerFormatted}
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-full p-6">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
            </div>
          </div>

          {/* Key Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Info className="w-6 h-6 mr-2 text-[#2BAE66]" />
              Key Information
            </h2>
            <ul className="space-y-3">
              {data.keyInformation.map((info, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">{info}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Formula (if applicable) */}
          {data.formula && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-purple-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Calculator className="w-6 h-6 mr-2 text-purple-600" />
                Formula
              </h2>
              <div className="bg-white rounded-xl p-6 border-2 border-purple-300">
                <p className="text-2xl font-bold text-center text-purple-700 font-mono">
                  {data.formula}
                </p>
              </div>
            </div>
          )}

          {/* Step-by-Step Solution */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-[#2BAE66]" />
              Step-by-Step Solution
            </h2>
            <div className="space-y-4">
              {data.steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-l-4 border-[#2BAE66]"
                >
                  <div className="flex items-start">
                    <div className="bg-[#2BAE66] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-semibold text-lg mb-2">{step.description}</p>
                      {step.calculation && (
                        <div className="bg-white rounded-lg p-4 font-mono text-[#1A3D7C] border-2 border-blue-200 mb-2">
                          {step.calculation}
                        </div>
                      )}
                      {step.result && !step.calculation && (
                        <div className="bg-green-50 rounded-lg p-4 font-semibold text-green-700 border-2 border-green-200">
                          {step.result}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          {data.commonMistakes.length > 0 && (
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-red-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2 text-red-600" />
                Common Mistakes to Avoid
              </h2>
              <ul className="space-y-3">
                {data.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start bg-white rounded-lg p-4">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tips */}
          {data.tips.length > 0 && (
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-yellow-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2 text-yellow-600" />
                Helpful Tips
              </h2>
              <ul className="space-y-3">
                {data.tips.map((tip, index) => (
                  <li key={index} className="flex items-start bg-white rounded-lg p-4">
                    <Lightbulb className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Real-World Context */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Real-World Application
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {data.realWorldContext}
            </p>
          </div>

          {/* Problem-Solving Strategy */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Universal Word Problem Strategy
            </h2>
            <p className="text-gray-700 mb-6">
              Use this 5-step strategy for any word problem you encounter:
            </p>
            <div className="space-y-4">
              <div className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mr-4 text-xl">R</div>
                <div>
                  <h3 className="font-bold text-blue-800 text-lg">Read Carefully</h3>
                  <p className="text-gray-700">Read the entire problem at least twice. Don't rush - understanding is key. Identify what question is being asked.</p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold mr-4 text-xl">I</div>
                <div>
                  <h3 className="font-bold text-green-800 text-lg">Identify Information</h3>
                  <p className="text-gray-700">List all the given facts, numbers, and what you need to find. Underline or highlight key data.</p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold mr-4 text-xl">S</div>
                <div>
                  <h3 className="font-bold text-purple-800 text-lg">Set Up the Equation</h3>
                  <p className="text-gray-700">Translate words into math. Use variables for unknowns. Choose the right formula or create an equation.</p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold mr-4 text-xl">E</div>
                <div>
                  <h3 className="font-bold text-orange-800 text-lg">Execute the Solution</h3>
                  <p className="text-gray-700">Solve step by step. Show your work. Keep calculations organized and double-check arithmetic.</p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center font-bold mr-4 text-xl">S</div>
                <div>
                  <h3 className="font-bold text-red-800 text-lg">Sanity Check</h3>
                  <p className="text-gray-700">Does your answer make sense in context? Check units. Re-read the question to ensure you answered what was asked.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <p className="text-center font-semibold text-gray-700">
                Remember: <strong className="text-[#1A3D7C]">R-I-S-E-S</strong> = Read, Identify, Set up, Execute, Sanity check
              </p>
            </div>
          </div>

          {/* Category-Specific Tips */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Tips for {data.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl">
                <h3 className="font-bold text-[#1A3D7C] mb-2">Recognize Patterns</h3>
                <p className="text-gray-700 text-sm">
                  {data.category.includes('age') && 'Age problems often involve time relationships (years ago, years from now). Set up equations comparing ages at different times.'}
                  {data.category.includes('distance') && 'Distance problems use the formula d = r × t. Make a table for multiple travelers or trips to organize information.'}
                  {data.category.includes('money') && 'Money problems involve counting, prices, or interest. Organize values in tables and track units (dollars, cents).'}
                  {data.category.includes('percentage') && 'Percentage problems convert between decimals and percents. Remember: percent means "per hundred."'}
                  {data.category.includes('number') && 'Number problems describe relationships between unknowns. Translate words like "twice," "sum," "difference" carefully.'}
                  {data.category.includes('geometry') && 'Geometry word problems require formulas for perimeter, area, or volume. Draw diagrams to visualize.'}
                  {!['age', 'distance', 'money', 'percentage', 'number', 'geometry'].some(cat => data.category.includes(cat)) && 'Look for keywords that suggest operations: "total" (add), "difference" (subtract), "times" (multiply), "split" (divide).'}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-5 rounded-xl">
                <h3 className="font-bold text-[#2BAE66] mb-2">Define Variables Clearly</h3>
                <p className="text-gray-700 text-sm">
                  Write out what each variable represents. For example: "Let x = current age" is clearer than just "x = age."
                  This prevents confusion when solving.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl">
                <h3 className="font-bold text-purple-700 mb-2">Work Backwards to Check</h3>
                <p className="text-gray-700 text-sm">
                  Once you have an answer, plug it back into the original problem (not just your equation).
                  Does it satisfy all the conditions stated?
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-5 rounded-xl">
                <h3 className="font-bold text-orange-700 mb-2">Draw It Out</h3>
                <p className="text-gray-700 text-sm">
                  Diagrams, tables, and visual representations help organize information and reveal relationships
                  that aren't obvious from text alone.
                </p>
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="group bg-gray-50 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-gray-900">
                  What is the answer to this problem?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-700">
                  The answer is <strong>{data.answerFormatted}</strong>. See the step-by-step solution above for
                  the complete explanation of how to arrive at this answer.
                </div>
              </details>
              <details className="group bg-gray-50 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-gray-900">
                  How do you approach {data.category.replace(/-/g, ' ')}?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-700">
                  First, read carefully to understand what's being asked. Then identify all given information
                  and what you need to find. Set up equations based on the relationships described, solve
                  step by step, and verify your answer makes sense in the real-world context.
                </div>
              </details>
              <details className="group bg-gray-50 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-gray-900">
                  What are the key steps to solving word problems?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-700">
                  Use the R-I-S-E-S method: <strong>Read</strong> the problem carefully, <strong>Identify</strong> known information,
                  <strong>Set up</strong> equations, <strong>Execute</strong> the solution, and <strong>Sanity check</strong> your answer.
                  This systematic approach works for any type of word problem.
                </div>
              </details>
              <details className="group bg-gray-50 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-gray-900">
                  Why are word problems important?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-700">
                  Word problems connect math to real life. They develop critical thinking, reading comprehension,
                  and problem-solving skills that are essential in careers like engineering, science, medicine,
                  finance, and technology. They also appear frequently on standardized tests like SAT and ACT.
                </div>
              </details>
              <details className="group bg-gray-50 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-gray-900">
                  What's the most common mistake in word problems?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-700">
                  The most common mistake is not reading carefully enough. Many students rush and miss key details,
                  or answer a different question than what was asked. Always re-read the problem after solving to
                  ensure your answer addresses what was specifically asked.
                </div>
              </details>
              <details className="group bg-gray-50 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-gray-900">
                  How can I get better at word problems?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-700">
                  Practice regularly with different types of problems. Start with easier ones and progress to harder ones.
                  Always write out your work step by step. Review mistakes to understand where you went wrong.
                  Learn to recognize common problem patterns. With consistent practice, word problems become much easier!
                </div>
              </details>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Related Topics:</h3>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm font-medium border-2 border-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-2xl shadow-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Need More Help with Word Problems?</h2>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Get personalized 1-on-1 tutoring with expert math tutors. Master word problems, build problem-solving skills, and boost your confidence!
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-white text-[#1A3D7C] px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg"
            >
              Find Your Math Tutor
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
