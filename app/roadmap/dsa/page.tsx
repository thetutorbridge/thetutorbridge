'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Binary,
  List,
  GitBranch,
  Network,
  Repeat,
  Search,
  BarChart3,
  Zap,
  Layers,
  Server,
  Code,
  Brain
} from 'lucide-react';
import {
  RoadmapHero,
  WhatIsSection,
  VisualRoadmapSection,
  SalarySection,
  ProjectsSection,
  FAQSection,
  RelatedRoadmapsSection,
  CTASection,
  RoadmapStage
} from '@/components/roadmap/RoadmapComponents';

// Roadmap Stages Data
const roadmapStages: RoadmapStage[] = [
  {
    title: 'Complexity Analysis',
    icon: BarChart3,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'Big O Notation',
        description: 'Understand algorithm efficiency',
        topics: ['Time Complexity', 'Space Complexity', 'Best/Worst/Average Case', 'Amortized Analysis']
      },
      {
        id: 2,
        title: 'Common Complexities',
        description: 'Learn complexity classes',
        topics: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)']
      }
    ],
    milestone: 'You can analyze algorithm efficiency!'
  },
  {
    title: 'Arrays & Strings',
    icon: Binary,
    color: 'bg-green-500',
    steps: [
      {
        id: 3,
        title: 'Array Fundamentals',
        description: 'Master array operations',
        topics: ['Static vs Dynamic', 'Insertion/Deletion', 'Two Pointers', 'Sliding Window']
      },
      {
        id: 4,
        title: 'String Manipulation',
        description: 'Work with strings efficiently',
        topics: ['String Matching', 'Palindromes', 'Anagrams', 'Substrings', 'String Hashing']
      }
    ]
  },
  {
    title: 'Linked Lists',
    icon: List,
    color: 'bg-purple-500',
    steps: [
      {
        id: 5,
        title: 'Linked List Types',
        description: 'Understand different linked lists',
        topics: ['Singly Linked', 'Doubly Linked', 'Circular', 'Operations', 'Fast & Slow Pointers']
      },
      {
        id: 6,
        title: 'Linked List Problems',
        description: 'Common interview problems',
        topics: ['Reversal', 'Cycle Detection', 'Merge Lists', 'Remove Nth Node', 'Intersection']
      }
    ],
    milestone: 'You mastered linear data structures!'
  },
  {
    title: 'Stacks & Queues',
    icon: Layers,
    color: 'bg-orange-500',
    steps: [
      {
        id: 7,
        title: 'Stack',
        description: 'LIFO data structure',
        topics: ['Push/Pop', 'Balanced Parentheses', 'Monotonic Stack', 'Min Stack', 'Expression Evaluation']
      },
      {
        id: 8,
        title: 'Queue',
        description: 'FIFO data structure',
        topics: ['Enqueue/Dequeue', 'Circular Queue', 'Priority Queue', 'Deque', 'BFS Applications']
      }
    ]
  },
  {
    title: 'Trees',
    icon: GitBranch,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 9,
        title: 'Binary Trees',
        description: 'Tree fundamentals',
        topics: ['Traversals (In/Pre/Post/Level)', 'Height/Depth', 'Balanced Trees', 'BST Operations']
      },
      {
        id: 10,
        title: 'Advanced Trees',
        description: 'Complex tree structures',
        topics: ['AVL Trees', 'Red-Black Trees', 'Segment Trees', 'Trie', 'Heap']
      }
    ],
    milestone: 'You understand hierarchical data!'
  },
  {
    title: 'Graphs',
    icon: Network,
    color: 'bg-pink-500',
    steps: [
      {
        id: 11,
        title: 'Graph Basics',
        description: 'Graph representation and traversal',
        topics: ['Adjacency List/Matrix', 'BFS', 'DFS', 'Connected Components', 'Cycle Detection']
      },
      {
        id: 12,
        title: 'Graph Algorithms',
        description: 'Advanced graph algorithms',
        topics: ['Dijkstra', 'Bellman-Ford', 'Floyd-Warshall', 'Topological Sort', 'MST (Prim/Kruskal)']
      }
    ]
  },
  {
    title: 'Recursion & Backtracking',
    icon: Repeat,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 13,
        title: 'Recursion',
        description: 'Master recursive thinking',
        topics: ['Base Cases', 'Recursive Relations', 'Call Stack', 'Tail Recursion', 'Memoization']
      },
      {
        id: 14,
        title: 'Backtracking',
        description: 'Solve constraint problems',
        topics: ['N-Queens', 'Sudoku Solver', 'Permutations', 'Combinations', 'Subsets']
      }
    ],
    milestone: 'You can solve complex recursive problems!'
  },
  {
    title: 'Sorting & Searching',
    icon: Search,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 15,
        title: 'Sorting Algorithms',
        description: 'Learn all sorting techniques',
        topics: ['Bubble/Selection/Insertion', 'Merge Sort', 'Quick Sort', 'Heap Sort', 'Counting/Radix']
      },
      {
        id: 16,
        title: 'Searching',
        description: 'Efficient search algorithms',
        topics: ['Binary Search', 'Binary Search Variations', 'Search in Rotated Array', 'Ternary Search']
      }
    ]
  },
  {
    title: 'Dynamic Programming',
    icon: Zap,
    color: 'bg-red-500',
    steps: [
      {
        id: 17,
        title: 'DP Fundamentals',
        description: 'Core DP concepts',
        topics: ['Overlapping Subproblems', 'Optimal Substructure', 'Top-Down vs Bottom-Up', '1D DP']
      },
      {
        id: 18,
        title: 'DP Patterns',
        description: 'Common DP problem patterns',
        topics: ['2D DP', 'Knapsack', 'LCS/LIS', 'Matrix Chain', 'DP on Trees/Graphs']
      }
    ],
    milestone: 'You are a DSA Master!'
  }
];

// Salary impact data (DSA skills boost for SDE roles)
const usaSalaries = [
  { level: 'Entry SDE (0-2 yrs)', range: '$90K - $140K', avg: '$115K' },
  { level: 'Mid SDE (2-5 yrs)', range: '$140K - $200K', avg: '$165K' },
  { level: 'Senior SDE (5-8 yrs)', range: '$200K - $300K', avg: '$240K' },
  { level: 'Staff+ (8+ yrs)', range: '$300K - $500K+', avg: '$380K' }
];

const indiaSalaries = [
  { level: 'Entry SDE (0-2 yrs)', range: '₹8L - ₹20L', avg: '₹14L' },
  { level: 'Mid SDE (2-5 yrs)', range: '₹20L - ₹40L', avg: '₹28L' },
  { level: 'Senior SDE (5-8 yrs)', range: '₹40L - ₹70L', avg: '₹52L' },
  { level: 'Staff+ (8+ yrs)', range: '₹70L - ₹1.2Cr+', avg: '₹85L' }
];

// Project Ideas
const projects = [
  {
    title: 'LeetCode 75',
    level: 'Beginner' as const,
    description: 'Solve the LeetCode 75 problem set',
    skills: ['Arrays', 'Strings', 'Hash Maps']
  },
  {
    title: 'Sorting Visualizer',
    level: 'Beginner' as const,
    description: 'Build a sorting algorithm visualizer',
    skills: ['Sorting', 'Visualization', 'Animation']
  },
  {
    title: 'Graph Visualizer',
    level: 'Intermediate' as const,
    description: 'Visualize BFS, DFS, Dijkstra',
    skills: ['Graphs', 'Pathfinding', 'React/Canvas']
  },
  {
    title: 'LeetCode 150',
    level: 'Intermediate' as const,
    description: 'Complete the interview prep list',
    skills: ['Trees', 'DP', 'Graphs']
  },
  {
    title: 'Design a Cache (LRU)',
    level: 'Advanced' as const,
    description: 'Implement LRU Cache from scratch',
    skills: ['Hash Map', 'Doubly Linked List', 'Design']
  },
  {
    title: 'Competitive Programming',
    level: 'Advanced' as const,
    description: 'Participate in Codeforces/AtCoder',
    skills: ['Advanced DP', 'Segment Trees', 'Math']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to learn DSA?',
    answer: 'With 2-3 hours of daily practice, you can cover fundamentals in 3-4 months. Becoming proficient for interviews takes 6-9 months. Focus on understanding patterns rather than memorizing solutions. Consistency is more important than intensity - solving 2-3 problems daily beats weekend cramming.'
  },
  {
    question: 'Which programming language should I use for DSA?',
    answer: 'Python is great for beginners due to its simple syntax. Java and C++ are preferred for competitive programming (faster execution). JavaScript works well if you are a web developer. Most companies accept any language in interviews. Pick one and master it rather than switching between languages.'
  },
  {
    question: 'How many LeetCode problems should I solve?',
    answer: 'Quality over quantity. Solving 150-200 problems covering all patterns is enough for most interviews. Focus on understanding the pattern behind each problem type rather than solving 1000+ problems. Review your solutions and learn from optimal approaches. The LeetCode 75 and Blind 75 lists are excellent starting points.'
  },
  {
    question: 'Should I learn DSA before web development?',
    answer: 'Both can be learned in parallel. DSA is essential for technical interviews at most companies but not required for building web applications. If your goal is to work at FAANG or similar companies, prioritize DSA. For startup jobs or freelancing, focus on practical development skills first.'
  },
  {
    question: 'Is DSA required for all programming jobs?',
    answer: 'DSA is most important for software engineering roles at tech companies. Frontend, mobile, and DevOps interviews may have lighter DSA focus. Startups often prioritize practical skills over algorithmic problems. However, strong DSA skills open doors to higher-paying positions and make you a better problem solver overall.'
  },
  {
    question: 'How do I approach a DSA problem I cannot solve?',
    answer: 'Spend 20-30 minutes trying different approaches. Draw diagrams and trace through examples. If stuck, read the hint or look at the solution approach (not code). Implement it yourself. Review the optimal solution and understand why it works. Add it to your review list and revisit after a week.'
  },
  {
    question: 'What is the best order to learn DSA topics?',
    answer: 'Start with complexity analysis, then arrays and strings. Move to linked lists, stacks, queues. Learn trees and graphs next. Cover recursion and backtracking. Finally, tackle dynamic programming. This order builds on previous concepts. Do not skip to DP before mastering recursion.'
  },
  {
    question: 'How do I prepare for FAANG interviews?',
    answer: 'Master all DSA topics in this roadmap. Solve 200+ LeetCode problems (Easy: 50, Medium: 120, Hard: 30). Practice explaining your thought process aloud. Do mock interviews. Study system design for senior roles. Timeline: 3-6 months of focused preparation for most candidates.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Backend Developer',
    description: 'Server-side development',
    href: '/roadmap/backend-developer',
    icon: Server,
    color: 'bg-green-500'
  },
  {
    title: 'System Design',
    description: 'Design scalable systems',
    href: '/roadmap/system-design',
    icon: Network,
    color: 'bg-indigo-500'
  },
  {
    title: 'Python Developer',
    description: 'Python programming',
    href: '/roadmap/python-developer',
    icon: Code,
    color: 'bg-yellow-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Data Structures & Algorithms Roadmap 2026',
  description: 'Complete guide to learning data structures and algorithms in 2026',
  author: { '@type': 'Organization', name: 'The Tutor Bridge' },
  publisher: { '@type': 'Organization', name: 'The Tutor Bridge' }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer }
  }))
};

export default function DSARoadmapPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navigation />

      <main className="min-h-screen bg-gray-50">
        <RoadmapHero
          title="Data Structures & Algorithms Roadmap"
          description="Master arrays, linked lists, trees, graphs, and dynamic programming. Your complete guide to acing coding interviews and becoming a better programmer in 2026."
          duration="4-6 Months"
          difficulty="Beginner to Advanced"
          accentColor="#3B82F6"
        />

        <WhatIsSection
          title="What are Data Structures & Algorithms?"
          paragraphs={[
            'Data Structures are ways to organize and store data efficiently. Algorithms are step-by-step procedures to solve problems. Together, they form the foundation of computer science and software engineering.',
            'Mastering DSA makes you a better problem solver, helps you write efficient code, and is essential for passing technical interviews at top tech companies like Google, Amazon, Meta, and Microsoft.'
          ]}
          responsibilities={[
            'Choose optimal data structures for problems',
            'Analyze time and space complexity',
            'Implement efficient algorithms',
            'Solve coding interview problems',
            'Optimize existing code for performance',
            'Design solutions for complex problems',
            'Debug and trace through algorithms',
            'Communicate solutions clearly'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#3B82F6"
        />

        <SalarySection
          title="DSA Skills Impact on SDE Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Strong DSA skills are the gateway to top tech companies. FAANG and similar companies filter candidates heavily on DSA in interviews. Even at the same company, engineers with stronger problem-solving skills tend to get promoted faster."
          gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Master Data Structures & Algorithms?"
          description="Get personalized guidance from engineers who have cracked FAANG interviews."
          gradient="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"
        />
      </main>

      <Footer />
    </>
  );
}
