// Content relationship mappings for internal linking

export interface RelatedCalculator {
  title: string;
  description: string;
  href: string;
}

export interface RelatedBlog {
  title: string;
  description: string;
  href: string;
}

export interface RelatedRoadmap {
  title: string;
  description: string;
  href: string;
}

// Calculator relationships
export const calculatorRelationships: Record<string, {
  relatedCalculators: RelatedCalculator[];
  relatedBlogs: RelatedBlog[];
}> = {
  'gpa-calculator': {
    relatedCalculators: [
      {
        title: 'CGPA to Percentage Calculator',
        description: 'Convert CGPA to percentage for Indian universities',
        href: '/calculators/cgpa-to-percentage-calculator'
      },
      {
        title: 'Percentage to CGPA Calculator',
        description: 'Convert percentage marks to CGPA',
        href: '/calculators/percentage-to-cgpa-calculator'
      },
      {
        title: 'Grade Calculator',
        description: 'Calculate final grades with weighted assignments',
        href: '/calculators/grade-calculator'
      },
      {
        title: 'Test Grade Calculator',
        description: 'Calculate test scores and grades instantly',
        href: '/calculators/test-grade-calculator'
      }
    ],
    relatedBlogs: [
      {
        title: '10 Effective Study Techniques That Actually Work',
        description: 'Proven study methods to improve your GPA and academic performance',
        href: '/blog/effective-study-techniques'
      },
      {
        title: '20 Reasons Why Education Is Important',
        description: 'Understand why academic achievement matters for your future',
        href: '/blog/20-reasons-why-education-is-important'
      },
      {
        title: 'What Is Competency-Based Education?',
        description: 'Learn about mastery-based learning approaches beyond GPA',
        href: '/blog/what-is-competency-based-education'
      }
    ]
  },
  'percentage-calculator': {
    relatedCalculators: [
      {
        title: 'Percentage Increase Calculator',
        description: 'Calculate percentage increase between two numbers',
        href: '/calculators/percentage-increase-calculator'
      },
      {
        title: 'Percentage Difference Calculator',
        description: 'Find the percentage difference between values',
        href: '/calculators/percentage-difference-calculator'
      },
      {
        title: 'Percentage Change Calculator',
        description: 'Calculate percentage change over time',
        href: '/calculators/percentage-change-calculator'
      },
      {
        title: 'Discount Calculator',
        description: 'Calculate discounts and sale prices',
        href: '/calculators/discount-calculator'
      }
    ],
    relatedBlogs: [
      {
        title: 'Essential Math Skills for Real-World Success',
        description: 'Why understanding percentages is crucial in daily life',
        href: '/blog/math-skills-for-success'
      },
      {
        title: '10 Effective Study Techniques That Actually Work',
        description: 'Master percentage calculations and other math concepts',
        href: '/blog/effective-study-techniques'
      },
      {
        title: 'What Is STEM Education?',
        description: 'How math foundations like percentages connect to STEM',
        href: '/blog/what-is-stem-education'
      }
    ]
  },
  'cgpa-to-percentage-calculator': {
    relatedCalculators: [
      {
        title: 'GPA Calculator',
        description: 'Calculate your Grade Point Average',
        href: '/calculators/gpa-calculator'
      },
      {
        title: 'Percentage to CGPA Calculator',
        description: 'Convert percentage back to CGPA',
        href: '/calculators/percentage-to-cgpa-calculator'
      },
      {
        title: 'SGPA to CGPA Calculator',
        description: 'Convert semester GPA to cumulative GPA',
        href: '/calculators/sgpa-to-cgpa-calculator'
      },
      {
        title: 'Marks Percentage Calculator',
        description: 'Calculate percentage from marks obtained',
        href: '/calculators/marks-percentage-calculator'
      }
    ],
    relatedBlogs: [
      {
        title: 'Indian Education System: Complete Guide',
        description: 'Understanding CGPA and grading in Indian universities',
        href: '/blog/indian-education-system-guide'
      },
      {
        title: '20 Reasons Why Education Is Important',
        description: 'Why academic scores matter for your career',
        href: '/blog/20-reasons-why-education-is-important'
      }
    ]
  },
  'bmi-calculator': {
    relatedCalculators: [
      {
        title: 'BMR Calculator',
        description: 'Calculate your Basal Metabolic Rate',
        href: '/calculators/bmr-calculator'
      },
      {
        title: 'Calorie Calculator',
        description: 'Calculate daily calorie needs',
        href: '/calculators/calorie-calculator'
      },
      {
        title: 'Body Shape Calculator',
        description: 'Determine your body shape category',
        href: '/calculators/body-shape-calculator'
      }
    ],
    relatedBlogs: []
  },
  'compound-interest-calculator': {
    relatedCalculators: [
      {
        title: 'Simple Interest Calculator',
        description: 'Calculate simple interest on investments',
        href: '/calculators/simple-interest-calculator'
      },
      {
        title: 'SIP Calculator',
        description: 'Calculate mutual fund SIP returns',
        href: '/calculators/sip-calculator'
      },
      {
        title: 'PPF Calculator',
        description: 'Calculate PPF investment returns',
        href: '/calculators/ppf-calculator'
      },
      {
        title: 'FD Calculator',
        description: 'Calculate fixed deposit maturity amount',
        href: '/calculators/fd-calculator'
      }
    ],
    relatedBlogs: []
  },
  'discount-calculator': {
    relatedCalculators: [
      {
        title: 'Percentage Calculator',
        description: 'Calculate any percentage instantly',
        href: '/calculators/percentage-calculator'
      },
      {
        title: 'Percent Off Calculator',
        description: 'Calculate discount percentages',
        href: '/calculators/percent-off-calculator'
      },
      {
        title: 'Markup Calculator',
        description: 'Calculate markup on products',
        href: '/calculators/markup-calculator'
      }
    ],
    relatedBlogs: []
  },
  'ppp-salary-calculator': {
    relatedCalculators: [
      {
        title: 'Salary Calculator',
        description: 'Calculate take-home salary from CTC',
        href: '/calculators/salary-calculator'
      },
      {
        title: 'Currency Converter',
        description: 'Convert between 150+ world currencies',
        href: '/calculators/currency-converter'
      },
      {
        title: 'Salary to Hourly Calculator',
        description: 'Convert salary to hourly rate',
        href: '/calculators/salary-to-hourly-calculator'
      },
      {
        title: 'Annual Income Calculator',
        description: 'Calculate annual income from hourly wage',
        href: '/calculators/annual-income-calculator'
      }
    ],
    relatedBlogs: [
      {
        title: '20 Reasons Why Education Is Important',
        description: 'Understanding global opportunities and career growth',
        href: '/blog/20-reasons-why-education-is-important'
      }
    ]
  },
  'grade-calculator': {
    relatedCalculators: [
      {
        title: 'GPA Calculator',
        description: 'Calculate your Grade Point Average',
        href: '/calculators/gpa-calculator'
      },
      {
        title: 'Test Grade Calculator',
        description: 'Calculate test scores and grades',
        href: '/calculators/test-grade-calculator'
      },
      {
        title: 'EZ Grader',
        description: 'Quick grading tool for teachers',
        href: '/calculators/ez-grader'
      }
    ],
    relatedBlogs: [
      {
        title: '10 Effective Study Techniques That Actually Work',
        description: 'Improve your grades with proven study methods',
        href: '/blog/effective-study-techniques'
      }
    ]
  }
};

// Blog relationships (add calculators to blog posts)
export const blogCalculators: Record<string, RelatedCalculator[]> = {
  'effective-study-techniques': [
    {
      title: 'GPA Calculator',
      description: 'Track your academic performance and calculate your GPA',
      href: '/calculators/gpa-calculator'
    },
    {
      title: 'Grade Calculator',
      description: 'Calculate final grades with weighted assignments',
      href: '/calculators/grade-calculator'
    },
    {
      title: 'Test Grade Calculator',
      description: 'Quickly calculate test scores and percentages',
      href: '/calculators/test-grade-calculator'
    },
    {
      title: 'Percentage Calculator',
      description: 'Calculate percentages for test scores and grades',
      href: '/calculators/percentage-calculator'
    }
  ],
  '20-reasons-why-education-is-important': [
    {
      title: 'GPA Calculator',
      description: 'Calculate your Grade Point Average for academic success',
      href: '/calculators/gpa-calculator'
    },
    {
      title: 'CGPA to Percentage Calculator',
      description: 'Convert CGPA to percentage for applications',
      href: '/calculators/cgpa-to-percentage-calculator'
    }
  ],
  'what-is-stem-education': [
    {
      title: 'Percentage Calculator',
      description: 'Essential math tool for STEM calculations',
      href: '/calculators/percentage-calculator'
    },
    {
      title: 'Basic Calculator',
      description: 'Simple calculator for everyday math',
      href: '/calculators/basic-calculator'
    },
    {
      title: 'Quadratic Formula Calculator',
      description: 'Solve quadratic equations instantly',
      href: '/calculators/quadratic-formula-calculator'
    }
  ],
  'what-is-competency-based-education': [
    {
      title: 'GPA Calculator',
      description: 'Traditional GPA calculation for comparison',
      href: '/calculators/gpa-calculator'
    },
    {
      title: 'Grade Calculator',
      description: 'Calculate mastery-based grades and assessments',
      href: '/calculators/grade-calculator'
    }
  ],
  'welcome-to-thetutorbridge': [
    {
      title: 'GPA Calculator',
      description: 'Track your academic performance',
      href: '/calculators/gpa-calculator'
    },
    {
      title: 'Grade Calculator',
      description: 'Calculate your final grades',
      href: '/calculators/grade-calculator'
    },
    {
      title: 'Percentage Calculator',
      description: 'Calculate percentages for homework and tests',
      href: '/calculators/percentage-calculator'
    }
  ]
};

// Roadmap relationships (add calculators to roadmap pages)
export const roadmapCalculators: Record<string, RelatedCalculator[]> = {
  'frontend-developer': [
    {
      title: 'Salary Calculator',
      description: 'Calculate expected frontend developer salaries',
      href: '/calculators/salary-calculator'
    },
    {
      title: 'Hours Calculator',
      description: 'Track your learning hours and progress',
      href: '/calculators/hours-calculator'
    }
  ],
  'data-scientist': [
    {
      title: 'Mean Mode Median Calculator',
      description: 'Statistical calculations for data analysis',
      href: '/calculators/mean-mode-median-calculator'
    },
    {
      title: 'Standard Deviation Calculator',
      description: 'Calculate standard deviation for datasets',
      href: '/calculators/standard-deviation-calculator'
    },
    {
      title: 'Percentile Calculator',
      description: 'Find percentiles in data distributions',
      href: '/calculators/percentile-calculator'
    }
  ],
  'python-developer': [
    {
      title: 'Salary Calculator',
      description: 'Estimate Python developer salaries',
      href: '/calculators/salary-calculator'
    }
  ]
};

// Helper function to get related calculators for a calculator page
export function getRelatedCalculators(calculatorSlug: string): RelatedCalculator[] {
  return calculatorRelationships[calculatorSlug]?.relatedCalculators || [];
}

// Helper function to get related blogs for a calculator page
export function getCalculatorRelatedBlogs(calculatorSlug: string): RelatedBlog[] {
  return calculatorRelationships[calculatorSlug]?.relatedBlogs || [];
}

// Helper function to get related calculators for a blog post
export function getBlogRelatedCalculators(blogSlug: string): RelatedCalculator[] {
  return blogCalculators[blogSlug] || [];
}

// Helper function to get related calculators for a roadmap
export function getRoadmapRelatedCalculators(roadmapSlug: string): RelatedCalculator[] {
  return roadmapCalculators[roadmapSlug] || [];
}
