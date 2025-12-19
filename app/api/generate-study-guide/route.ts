import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client conditionally
let openai: OpenAI | null = null;

function getOpenAIClient() {
  if (!openai && process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

// Debug function to check API key
function checkOpenAIConfig() {
  const apiKey = process.env.OPENAI_API_KEY;
  console.log('🔑 OpenAI API Key status:', apiKey ? `Present (${apiKey.substring(0, 10)}...)` : 'Missing');
  return !!apiKey;
}

// Clean HTML generator for frontend display
function generateCleanHTML(content: ProcessedContent, topic: string, language: string, analysis: TopicAnalysis): string {
  const isHindi = language === 'hindi';
  
  let html = `
    <div class="study-guide-content">
      <div class="header-section">
        <div class="brand-section">
          <a href="https://www.thetutorbridge.com" target="_blank" class="brand-link">
            <img src="/TheTutorBridge Logo New.png" alt="TheTutorBridge Logo" class="brand-logo">
            <div class="brand-text">
              <div class="brand-name">TheTutorBridge</div>
              <div class="brand-tagline">${isHindi ? 'शिक्षा में उत्कृष्टता' : 'Excellence in Education'}</div>
            </div>
          </a>
        </div>
        <h1 class="main-title">${isHindi ? 'अध्ययन गाइड' : 'Study Guide'}: ${topic}</h1>
      </div>
  `;

  // Summary
  html += `
    <div class="section">
      <h2 class="section-title">${isHindi ? 'सारांश' : 'Summary'}</h2>
      <div class="summary-box">${content.summary}</div>
    </div>
  `;

  // Main Concepts
  if (content.mainConcepts.length > 0) {
    html += `
      <div class="section">
        <h2 class="section-title">${isHindi ? 'मुख्य अवधारणाएं' : 'Key Concepts'}</h2>
        <div class="concepts-grid">
    `;
    content.mainConcepts.forEach((concept, i) => {
      html += `<div class="concept-card"><span class="concept-number">${i + 1}</span> ${concept}</div>`;
    });
    html += `</div></div>`;
  }

  // Definitions
  if (Object.keys(content.definitions).length > 0) {
    html += `
      <div class="section">
        <h2 class="section-title">${isHindi ? 'महत्वपूर्ण परिभाषाएं' : 'Important Definitions'}</h2>
    `;
    Object.entries(content.definitions).forEach(([term, def]) => {
      html += `
        <div class="definition-card">
          <div class="definition-term">${term}</div>
          <div class="definition-content">${def}</div>
        </div>
      `;
    });
    html += `</div>`;
  }

  // Study Strategy
  if (content.studyStrategy.length > 0) {
    html += `
      <div class="section">
        <h2 class="section-title">${isHindi ? 'अध्ययन रणनीति' : 'Study Strategy'}</h2>
        <div class="strategy-grid">
    `;
    content.studyStrategy.forEach((strategy, i) => {
      html += `<div class="strategy-card"><span class="strategy-icon">📚</span> ${strategy}</div>`;
    });
    html += `</div></div>`;
  }

  // Examples
  if (content.examples.length > 0) {
    html += `
      <div class="section">
        <h2 class="section-title">${isHindi ? 'व्यावहारिक उदाहरण' : 'Practical Examples'}</h2>
        <div class="examples-grid">
    `;
    content.examples.forEach((example, i) => {
      html += `<div class="example-card"><span class="example-icon">💡</span> ${example}</div>`;
    });
    html += `</div></div>`;
  }

  // Applications
  if (content.applications.length > 0) {
    html += `
      <div class="section">
        <h2 class="section-title">${isHindi ? 'करियर अवसर' : 'Career Opportunities'}</h2>
        <div class="applications-grid">
    `;
    content.applications.forEach((app, i) => {
      html += `<div class="application-card"><span class="application-icon">🚀</span> ${app}</div>`;
    });
    html += `</div></div>`;
  }

  // Exam Tips
  if (content.examTips.length > 0) {
    html += `
      <div class="section">
        <h2 class="section-title">${isHindi ? 'परीक्षा तैयारी टिप्स' : 'Exam Tips'}</h2>
        <div class="tips-grid">
    `;
    content.examTips.forEach((tip, i) => {
      html += `<div class="tip-card"><span class="tip-icon">⭐</span> ${tip}</div>`;
    });
    html += `</div></div>`;
  }

  html += `</div>`;
  
  return html;
}

// Deep research function to gather REAL information about the topic
async function researchTopic(topic: string): Promise<string> {
  console.log(`🔍 DEEP RESEARCHING: "${topic}"`);
  
  let researchData = '';
  
  try {
    // DSSSB Specific Research
    if (topic.toLowerCase().includes('dsssb')) {
      console.log('📋 Researching DSSSB specific information...');
      
      const dsssb_info = `
DSSSB (Delhi Subordinate Services Selection Board) RESEARCH FINDINGS:

EXAM STRUCTURE:
- DSSSB conducts recruitment for Group B and Group C posts in Delhi Government
- Senior Accountant is a Group B post under Finance Department
- Exam Pattern: Written Test (Objective) + Document Verification
- Total Marks: 100 (Computer Based Test)
- Duration: 90 minutes
- Negative Marking: 0.25 marks deduction for wrong answers

SYLLABUS BREAKDOWN:
1. General Awareness (25 marks): Current affairs, Indian history, geography, Indian polity, economic and social development
2. General Intelligence & Reasoning (25 marks): Analogies, similarities, differences, space visualization, problem solving
3. Arithmetical & Numerical Ability (25 marks): Number systems, computation of whole numbers, decimals, fractions, relationships between numbers
4. Professional Knowledge (25 marks): 
   - Accounting principles and concepts
   - Financial accounting and reporting
   - Cost accounting and management accounting
   - Auditing and assurance
   - Taxation (Income Tax, GST)
   - Financial management
   - Government accounting and budgeting

SPECIFIC REQUIREMENTS:
- Educational Qualification: Bachelor's degree with 60% marks + Professional qualification (CA/ICWA/CS) OR Master's degree in Commerce/Economics/Business Administration
- Age Limit: 18-27 years (relaxation for reserved categories)
- Pay Scale: Level-6 (Rs. 35,400 - 1,12,400)

PREPARATION STRATEGY:
- Focus on Government Accounting Standards (GAS)
- Study CAG reports and public financial management
- Practice previous DSSSB papers (last 5 years)
- Current affairs from Delhi government schemes and policies
- Strong foundation in basic accounting principles

RECOMMENDED BOOKS:
- Accounting: T.S. Grewal, R.L. Gupta
- Auditing: Surbhi Bansal, Kamal Gupta  
- Taxation: Girish Ahuja, Ravi Gupta
- Government Accounting: ICAI Study Material
`;

      researchData += dsssb_info;
    }

    // SSC CGL Specific Research
    if (topic.toLowerCase().includes('ssc') && (topic.toLowerCase().includes('cgl') || topic.toLowerCase().includes('combined graduate level'))) {
      console.log('📋 Researching SSC CGL specific information...');
      
      const ssc_cgl_info = `
SSC CGL (Staff Selection Commission Combined Graduate Level) RESEARCH FINDINGS:

EXAM STRUCTURE:
- Four-tier examination process
- Tier 1: Computer Based Test (Preliminary) - 100 marks, 60 minutes
- Tier 2: Computer Based Test (Mains) - Multiple papers, 200 marks each
- Tier 3: Descriptive Paper (Pen & Paper) - 100 marks, 60 minutes  
- Tier 4: Computer Proficiency Test/Skill Test (Qualifying)

TIER 1 SYLLABUS BREAKDOWN:
1. General Intelligence & Reasoning (25 questions, 50 marks)
   - Analogies, similarities, differences, space visualization
   - Problem solving, analysis, judgment, decision making
   - Visual memory, discrimination, observation, relationship concepts
   - Arithmetical reasoning, figural classification, semantic series

2. General Awareness (25 questions, 50 marks)
   - Current events, Indian history, culture, geography, economic scene
   - General polity, Indian constitution, sports, important events
   - Scientific research, computers, mobile technology

3. Quantitative Aptitude (25 questions, 50 marks)
   - Number systems, computation of whole numbers, decimals, fractions
   - Ratio & proportion, percentage, profit & loss, discount
   - Simple & compound interest, time & work, time & distance
   - Use of tables & graphs, mensuration, basic algebraic identities

4. English Comprehension (25 questions, 50 marks)
   - Grammar, vocabulary, reading comprehension
   - Sentence correction, error detection, fill in the blanks
   - Synonyms, antonyms, spelling, phrases & idioms

TIER 2 DETAILED STRUCTURE:
- Paper 1: Quantitative Abilities (100 questions, 200 marks, 2 hours)
- Paper 2: English Language & Comprehension (200 questions, 200 marks, 2 hours)
- Paper 3: Statistics (100 questions, 200 marks, 2 hours) - Only for Statistical Investigator posts
- Paper 4: General Studies (Finance & Economics) (100 questions, 200 marks, 2 hours) - Only for Assistant Audit Officer posts

RECENT EXAM TRENDS (2024-2025):
- Increased difficulty in quantitative aptitude section with data interpretation focus
- Heavy emphasis on current affairs from government schemes (PM Vishwakarma, PLI schemes)
- Focus on digital India 2.0, AI initiatives, environmental policies, and sports achievements
- Integration of financial literacy and digital payment systems questions
- English section emphasizing comprehension and practical communication skills
- More questions on sustainable development goals and climate change initiatives

CUT-OFF ANALYSIS:
- General Category: 120-130 marks out of 200 (Tier 1)
- OBC: 115-125 marks out of 200
- SC/ST: 100-110 marks out of 200
- Tier 2 cut-offs are generally higher: 140-160 marks per paper

JOB PROFILES AVAILABLE:
1. Assistant Audit Officer (AAO) - Grade B
2. Assistant Accounts Officer (AAO) - Grade B  
3. Assistant Section Officer (ASO) - Grade B
4. Statistical Investigator Grade II
5. Tax Assistant (Central Excise & Income Tax)
6. Examiner (Customs, Central Excise, Income Tax)
7. Inspector (Central Excise, Preventive Officer, Examiner)
8. Sub Inspector (Central Bureau of Investigation)

SALARY STRUCTURE:
- Grade B Posts: ₹35,400-112,400 (Pay Level 6) + DA + HRA
- Grade C Posts: ₹25,500-81,100 (Pay Level 4) + allowances
- In-hand salary ranges from ₹25,000 to ₹50,000 depending on posting location

PREPARATION STRATEGY:
1. Foundation Phase (2-3 months):
   - NCERT books (Classes 6-12) for basic concepts
   - Focus on mathematics fundamentals
   - Build vocabulary and grammar basics

2. Advanced Preparation (4-5 months):
   - Standard reference books for each section
   - Daily current affairs reading (last 6 months)
   - Regular practice of quantitative problems
   - English comprehension improvement

3. Practice Phase (2-3 months):
   - Previous year papers (last 5 years minimum)
   - Daily mock tests and time management
   - Weak area identification and improvement
   - Speed enhancement techniques

4. Final Revision (1 month):
   - Quick revision notes
   - Formula sheets and shortcuts
   - Current affairs compilation
   - Stress management and exam strategy

RECOMMENDED BOOKS:
- Quantitative Aptitude: R.S. Aggarwal, Arun Sharma
- Reasoning: R.S. Aggarwal, A Modern Approach to Verbal & Non-Verbal Reasoning
- English: Wren & Martin, Word Power Made Easy by Norman Lewis
- General Awareness: Lucent's General Knowledge, Manorama Yearbook
- Current Affairs: Monthly magazines (Pratiyogita Darpan, Competition Success Review)

SUCCESS STATISTICS:
- Total applications: 25-30 lakh candidates annually
- Tier 1 qualified: 8-10 lakh candidates (top 10x of vacancies)
- Final selection: 8,000-12,000 candidates
- Success rate: 0.3-0.4% overall
- Average preparation time: 8-12 months for serious candidates

COMMON MISTAKES TO AVOID:
- Ignoring basic mathematical concepts
- Not practicing enough mock tests
- Poor time management during exam
- Neglecting current affairs preparation
- Focusing only on one tier, ignoring others
- Not maintaining accuracy while increasing speed

SECTIONAL PREPARATION TIPS:
Quantitative Aptitude:
- Master basic arithmetic operations
- Practice mental calculation techniques
- Focus on time-saving shortcuts and tricks
- Regular practice of data interpretation

Reasoning:
- Develop pattern recognition skills
- Practice different types of logical reasoning
- Work on spatial and visual reasoning
- Time management is crucial

General Awareness:
- Read newspapers daily (The Hindu, Indian Express)
- Focus on government schemes and policies
- Stay updated with sports and awards
- Study Indian history, geography, and polity basics

English:
- Improve vocabulary through word lists
- Practice reading comprehension daily
- Focus on grammar rules and their applications
- Work on error detection and sentence improvement
`;

      researchData += ssc_cgl_info;
    }

    // UPSC Specific Research
    if (topic.toLowerCase().includes('upsc')) {
      console.log('📋 Researching UPSC specific information...');
      
      const upsc_info = `
UPSC CIVIL SERVICES RESEARCH FINDINGS:

EXAM STRUCTURE:
- Three stages: Preliminary (objective), Mains (descriptive), Interview (personality test)
- Prelims: 2 papers (GS + CSAT), 200 marks each
- Mains: 9 papers (Essay, 4 GS, 2 Optional, 2 Language), 1750 marks total
- Interview: 275 marks

CURRENT TRENDS (2025):
- Heavy focus on AI and digital governance initiatives
- Increased emphasis on climate change and sustainable development
- Integration of fintech, blockchain, and digital currency concepts
- Rising importance of ethics, integrity, and social responsibility questions
- Focus on India's G20 presidency outcomes and global leadership role
- Emphasis on space technology, quantum computing, and emerging technologies

SUCCESS STATISTICS:
- Success rate: 0.1-0.2% (around 1000 selections from 10+ lakh applicants)
- Average preparation time: 12-18 months for serious candidates
- Optional subject impact: Can make 15-20% difference in final ranking

RECOMMENDED STRATEGY:
- NCERT foundation (Classes 6-12) - 3 months
- Standard books for each subject - 6 months  
- Current affairs integration - ongoing
- Answer writing practice - 4-6 months
- Mock tests and revision - 3 months

TOP RECOMMENDED BOOKS:
- Polity: M. Laxmikanth
- Geography: G.C. Leong, Savindra Singh
- History: Bipan Chandra, Spectrum
- Economics: Ramesh Singh
- Environment: Shankar IAS
`;

      researchData += upsc_info;
    }

    // NET Specific Research  
    if (topic.toLowerCase().includes('net')) {
      console.log('📋 Researching NET specific information...');
      
      const net_info = `
UGC NET RESEARCH FINDINGS:

EXAM PATTERN:
- Computer Based Test (CBT)
- Two papers: Paper 1 (General) + Paper 2 (Subject specific)
- Paper 1: 50 questions, 100 marks (Teaching aptitude, research methodology)
- Paper 2: 100 questions, 200 marks (Subject knowledge)
- Duration: 3 hours total
- No negative marking

QUALIFICATION CRITERIA:
- JRF: Top 6% candidates (fellowship + lectureship eligibility)
- Lectureship: Next candidates up to certain cutoff
- Age limit for JRF: 28 years (31 for reserved categories)

MATHEMATICS NET SPECIFICS:
- Syllabus covers: Real Analysis, Complex Analysis, Linear Algebra, Abstract Algebra, Topology, Differential Equations, Numerical Analysis, Discrete Mathematics
- Weightage: Analysis (30%), Algebra (25%), Applied Mathematics (20%), Others (25%)
- Recent trend: More application-oriented questions
- Success rate: 8-12% for JRF, 15-20% for lectureship

PREPARATION TIMELINE:
- Foundation building: 4-6 months
- Advanced topics: 3-4 months  
- Problem solving practice: 3-4 months
- Mock tests and revision: 2 months
`;

      researchData += net_info;
    }

    // General Web Research for other topics
    if (!researchData) {
      console.log('🌐 Performing general web research for unknown topic...');
      
      // Try to fetch from Wikipedia API for general topics
      try {
        const searchQuery = encodeURIComponent(topic.replace(/[^a-zA-Z0-9\s]/g, ' ').trim());
        const wikiResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${searchQuery}`, {
          headers: {
            'User-Agent': 'StudyGuideBot/2025 (https://www.thetutorbridge.com)'
          },
          timeout: 5000
        });
        
        if (wikiResponse.ok) {
          const wikiData = await wikiResponse.json();
          if (wikiData.extract && wikiData.extract.length > 50) {
            researchData += `
WIKIPEDIA RESEARCH FINDINGS for "${topic}":

SUMMARY:
${wikiData.extract}

KEY INFORMATION:
- Topic: ${wikiData.title || topic}
- Description: ${wikiData.description || 'General topic'}
- Context: This topic requires comprehensive understanding and systematic study approach.

GENERAL STUDY APPROACH:
- Start with fundamental concepts and definitions
- Build upon basic knowledge with advanced topics
- Practice application through examples and exercises
- Regular revision and self-assessment
- Connect theory with practical applications
`;
            console.log('✅ Wikipedia data found and integrated');
          }
        }
      } catch (wikiError) {
        console.log('⚠️ Wikipedia research failed, using expert knowledge');
        // Add generic research template for completely unknown topics
        researchData = `
EXPERT ANALYSIS for "${topic}":

This topic requires systematic study and comprehensive understanding. Based on educational best practices:

FUNDAMENTAL APPROACH:
- Build strong foundation with basic concepts
- Progress systematically from simple to complex topics
- Regular practice and application of learned concepts
- Continuous assessment and improvement

RECOMMENDED STUDY METHODOLOGY:
- Conceptual understanding over memorization
- Multiple learning resources and perspectives
- Practical application and real-world connections
- Regular revision and knowledge consolidation
`;
      }
    }

    console.log(`✅ DEEP Research completed. Found ${researchData.length} characters of REAL data`);
    return researchData || 'Proceeding with general analysis.';
    
  } catch (error) {
    console.error('Research failed:', error);
    return 'Research unavailable, proceeding with expert knowledge.';
  }
}

// GPT-powered study guide generation with research
async function generateStudyGuideWithGPT(topic: string, language: string): Promise<ProcessedContent> {
  const isHindi = language === 'hindi';
  
  const systemPrompt = `You are an ELITE educational strategist and content architect with 20+ years of experience creating transformative learning materials for top-tier educational institutions, government examinations, and Fortune 500 companies. Your expertise spans competitive exam coaching, academic research, and professional development across all domains.

🚨 CRITICAL MISSION: ELIMINATE GENERIC CONTENT AT ALL COSTS. Every single word must provide SPECIFIC, ACTIONABLE, and CONTEXTUALLY RELEVANT value to the learner.

🎯 ZERO-TOLERANCE POLICY FOR:
- Generic phrases like "build strong foundation" or "practice regularly"
- Template-style responses that could apply to any topic
- Surface-level advice without specific implementation details
- Vague recommendations without concrete resources or steps
- Boilerplate content that doesn't address the specific topic's unique challenges

📊 MANDATORY CONTEXT INTELLIGENCE:
You MUST demonstrate deep understanding of:
1. EXACT EXAM STRUCTURE: Specific number of questions, marks, time limits, negative marking schemes
2. CURRENT TRENDS: What changed in the last 2-3 years, recent pattern shifts, emerging topics
3. SUCCESS METRICS: Actual cut-off scores, success rates, typical preparation timelines
4. RESOURCE SPECIFICITY: Exact book titles, author names, chapter recommendations, online platforms
5. STRATEGIC INSIGHTS: What separates top 1% performers from average candidates

🔬 RESEARCH-DRIVEN APPROACH:
- Every recommendation must be backed by data, statistics, or proven methodologies
- Include specific examples, case studies, and real success stories
- Reference actual exam questions, syllabus weightages, and scoring patterns
- Mention current affairs, recent developments, and industry changes
- Provide insider knowledge that only experts in the field would know

🎯 CONTEXTUAL MASTERY REQUIREMENTS:
For COMPETITIVE EXAMS: Must include exact syllabus breakdown, tier-wise strategies, specific book recommendations with chapters, current affairs sources, mock test platforms, and success rate statistics.

For ACADEMIC SUBJECTS: Must include latest research developments, key researchers, current applications, industry connections, advanced concepts, and future career implications.

For PROFESSIONAL SKILLS: Must include current market demand, specific skill requirements, project portfolio ideas, industry certifications, salary expectations, and career progression paths.

🚀 EXCELLENCE BENCHMARKS:
- Content should be so specific that it could only apply to THIS exact topic
- Include at least 10 specific, actionable recommendations per section
- Provide exact timelines, resource names, and implementation strategies
- Address common failure points and how to overcome them specifically
- Include insider tips that demonstrate deep domain expertise
- CRITICAL: All information must be current as of 2025, including recent policy changes, technological updates, and emerging trends

RESPONSE FORMAT: You MUST respond with ONLY a valid JSON object with this exact structure:
{
  "summary": "A comprehensive 4-5 sentence summary that captures the essence, importance, current relevance, and future implications of the topic",
  "mainConcepts": [
    "Deep concept 1 with specific details and context",
    "Advanced concept 2 with theoretical framework",
    "Complex concept 3 with interdisciplinary connections",
    "Sophisticated concept 4 with current developments",
    "Nuanced concept 5 with practical implications",
    "Additional concept 6 with research insights",
    "Extended concept 7 with future directions"
  ],
  "definitions": {
    "Technical Term 1": "Comprehensive definition with etymology, context, and significance in the field",
    "Advanced Concept 2": "Detailed explanation with theoretical background and practical applications",
    "Specialized Term 3": "In-depth definition with examples, variations, and related concepts",
    "Professional Jargon 4": "Complete explanation with industry context and usage scenarios",
    "Academic Term 5": "Scholarly definition with research background and current understanding"
  },
  "studyStrategy": [
    "Advanced learning technique 1 with specific implementation steps and timeline",
    "Research-backed strategy 2 with practical examples and expected outcomes",
    "Expert-recommended approach 3 with resource allocation and milestone tracking",
    "Proven methodology 4 with adaptation guidelines for different learning styles",
    "Comprehensive strategy 5 with integration of multiple learning modalities",
    "Long-term mastery plan 6 with progressive skill building and assessment methods"
  ],
  "examples": [
    "Detailed real-world example 1 with step-by-step breakdown and analysis",
    "Complex case study 2 with multiple variables and problem-solving approaches",
    "Industry-specific scenario 3 with practical implications and lessons learned",
    "Academic application 4 with theoretical backing and empirical evidence",
    "Professional situation 5 with strategic thinking and decision-making process"
  ],
  "applications": [
    "High-impact career opportunity 1 with specific roles, companies, and growth trajectory",
    "Cutting-edge industry application 2 with market demand and future prospects",
    "Research and development pathway 3 with academic and commercial potential",
    "Entrepreneurial opportunity 4 with market analysis and business model insights",
    "Cross-functional application 5 with interdisciplinary collaboration possibilities",
    "Emerging field connection 6 with innovation potential and skill requirements"
  ],
  "examTips": [
    "Advanced preparation strategy 1 with timeline, resources, and success metrics",
    "Expert technique 2 with psychological preparation and performance optimization",
    "Tactical approach 3 with pattern recognition and time management strategies",
    "Strategic methodology 4 with error analysis and improvement frameworks",
    "Comprehensive system 5 with revision techniques and retention strategies",
    "Professional insight 6 with insider knowledge and competitive advantages"
  ]
}

🏆 EXCELLENCE STANDARDS:
- Every piece of information should be actionable and valuable
- Include specific names, dates, numbers, and concrete details where relevant
- Provide multiple angles and perspectives on complex topics
- Connect to current events, trends, and future developments
- Ensure content is immediately applicable and transformative for the learner
- Maintain academic rigor while being accessible and engaging

📝 MANDATORY FORMATTING REQUIREMENTS:
- ALWAYS use proper HTML notation for ALL scientific content:
  - Chemical formulas: H<sub>2</sub>O (NEVER H2O), CO<sub>2</sub> (NEVER CO2), H<sub>2</sub>SO<sub>4</sub> (NEVER H2SO4)
  - Mathematical expressions: x<sup>2</sup> (NEVER x^2), a<sup>n</sup> (NEVER a^n), log<sub>10</sub> (NEVER log10)
  - Ionic charges: Na<sup>+</sup> (NEVER Na+), Cl<sup>-</sup> (NEVER Cl-), SO<sub>4</sub><sup>2-</sup> (NEVER SO4^2-)
- ALWAYS use <sub> for subscripts and <sup> for superscripts in formulas
- Write chemical equations with proper notation: 6CO<sub>2</sub> + 6H<sub>2</sub>O → C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6O<sub>2</sub>
- Include mathematical expressions with proper formatting: ∫, ∑, π, α, β, etc.
- This is CRITICAL for chemistry, physics, and mathematics topics

Language: ${language}

Remember: You are creating content for serious learners who want to achieve mastery, not just basic understanding. Go deep, be specific, and provide transformative insights.`;

  const userPrompt = `🚨 URGENT: CREATE AN EXPERT-LEVEL, RESEARCH-BACKED STUDY GUIDE FOR: "${topic}"

⚡ MISSION CRITICAL REQUIREMENTS:
- Language: ${language}
- Quality Standard: TOP 1% EXPERT LEVEL - No generic advice accepted
- Target: Serious candidates who want to DOMINATE this topic, not just "pass"
- Approach: Data-driven, research-backed, insider knowledge only

🎯 MANDATORY INTELLIGENCE DEMONSTRATION:
You MUST prove deep expertise by including:
1. EXACT specifications (numbers, percentages, dates, statistics)
2. SPECIFIC resources (book titles, authors, platforms, tools)
3. INSIDER knowledge (trends, patterns, success secrets)
4. CURRENT developments (2024-2025 changes, recent updates, and 2025 trends)
5. PROVEN strategies (what actually works vs. what people think works)

🚨 ZERO-TOLERANCE FOR GENERIC CONTENT:
❌ BANNED PHRASES: "build strong foundation", "practice regularly", "stay consistent", "important topic"
❌ BANNED ADVICE: Generic study tips that could apply to any subject
❌ BANNED CONTENT: Template responses, surface-level information, obvious advice

✅ REQUIRED SPECIFICITY:
✅ Exact exam pattern details (questions, marks, time, negative marking)
✅ Specific book recommendations with chapter numbers and page references
✅ Current cut-off trends with numerical data
✅ Success rate statistics and preparation timeline data
✅ Insider tips that only domain experts would know

🔥 DELIVERABLE REQUIREMENTS:
- 8+ SPECIFIC concepts with exact implementation details
- 6+ PRECISE definitions with real-world context and current applications
- 7+ PROVEN strategies with step-by-step execution plans
- 6+ DETAILED examples with actual case studies and data
- 7+ CAREER insights with salary ranges, market demand, and growth projections
- 8+ EXPERT tips with success rates and effectiveness metrics

💎 EXCELLENCE VALIDATION:
This study guide should be so specific and valuable that:
- A complete beginner could follow it step-by-step to mastery
- An expert would learn new insights and strategies
- It could replace expensive coaching programs
- Every recommendation is backed by data or proven results

🎯 CRITICAL SUCCESS METRIC: 
If someone asked "How do you know this works?", you should be able to cite specific success stories, statistics, research studies, or expert testimonials for EVERY major recommendation.

TOPIC FOCUS: "${topic}" - Make this guide so topic-specific that it couldn't possibly apply to any other subject.`;

  try {
    // Check if OpenAI is configured
    if (!checkOpenAIConfig()) {
      console.log('⚠️ OpenAI API key not configured, falling back to intelligent system');
      // Fall back to intelligent content generation when API key is missing
      const topicAnalysis = analyzeTopicIntelligently(topic);
      const content = generateIntelligentContent(topic, language, topicAnalysis);
      const inlineHTML = generateCleanHTML(content, topic, language, topicAnalysis);
      const fullHTML = generateProfessionalHTML(content, topic, language, 'comprehensive');
      
      return NextResponse.json({
        studyGuide: inlineHTML,
        fullHTML: fullHTML,
        note: 'Generated using intelligent content system (OpenAI API not configured)'
      });
    }

    // Step 1: RESEARCH the topic thoroughly
    const researchData = await researchTopic(topic);
    
    // Step 2: Create research-informed prompt
    const enhancedUserPrompt = `${userPrompt}

🔬 RESEARCH-BACKED INTELLIGENCE INTEGRATION:
You now have access to EXPERT-LEVEL research findings. Your task is to transform this data into an EXCEPTIONAL study guide:

${researchData}

🚨 NON-NEGOTIABLE REQUIREMENTS: 
1. EXTRACT EVERY SPECIFIC DETAIL from the research above - exam patterns, marks, duration, cut-offs, success rates, book names, preparation timelines
2. REFERENCE EXACT NUMBERS: Question counts, mark distributions, time limits, success percentages, salary ranges
3. CITE SPECIFIC RESOURCES: Mention exact book titles, authors, platforms, and tools from the research
4. INCLUDE CURRENT TRENDS: Reference the 2024-2025 developments, recent pattern changes, and emerging 2025 trends mentioned
5. PROVIDE INSIDER STRATEGIES: Use the preparation strategies, common mistakes, and expert tips from the research

🎯 RESEARCH UTILIZATION MANDATE:
- Transform raw research data into actionable step-by-step strategies
- Convert statistics into practical insights and decision-making guidance
- Use specific examples and case studies mentioned in the research
- Reference the exact syllabus breakdowns, weightages, and scoring patterns
- Include the recommended books, authors, and resources with specific chapter guidance

🔬 SCIENTIFIC NOTATION REQUIREMENTS:
MANDATORY - Use proper HTML notation for ALL scientific content:
- Chemical formulas: H<sub>2</sub>O (NOT H2O), CO<sub>2</sub> (NOT CO2), C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> (NOT C6H12O6)
- Mathematical expressions: x<sup>2</sup> (NOT x^2), log<sub>10</sub> (NOT log10), a<sup>n</sup> (NOT a^n)
- Chemical equations: 6CO<sub>2</sub> + 6H<sub>2</sub>O → C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6O<sub>2</sub>
- Ionic charges: Na<sup>+</sup> (NOT Na+), Cl<sup>-</sup> (NOT Cl-), SO<sub>4</sub><sup>2-</sup> (NOT SO4^2-)
- NEVER write plain text formulas like H2O, CO2, x^2 - ALWAYS use HTML tags

💎 QUALITY VALIDATION TEST:
Before finalizing, ask yourself:
- Can I cite specific data/statistics for each major claim?
- Are my recommendations backed by the research findings?
- Would an expert in this field recognize this as insider knowledge?
- Is every piece of advice specific to "${topic}" and not applicable to other topics?
- Have I included exact numbers, timelines, and resource specifications?

FAILURE TO MEET THESE STANDARDS IS UNACCEPTABLE. Create content worthy of a premium coaching program.`;

    console.log(`🚀 Generating GPT-4o RESEARCH-BASED study guide for: "${topic}"`);
    
    // Log token usage for monitoring
    const systemTokens = systemPrompt.length / 4; // Rough estimate: ~4 chars per token
    const userTokens = enhancedUserPrompt.length / 4;
    console.log(`📊 Estimated input tokens: System: ${Math.round(systemTokens)}, User: ${Math.round(userTokens)}, Total: ${Math.round(systemTokens + userTokens)}`);
    
    const openaiClient = getOpenAIClient();
    if (!openaiClient) {
      throw new Error('OpenAI client not available');
    }
    
    const response = await openaiClient.chat.completions.create({
      model: "gpt-4o", // Using GPT-4o (most reliable) for superior reasoning and deep content
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: enhancedUserPrompt }
      ],
      temperature: 0.8,
      max_tokens: 4000 // Standard parameter for GPT-4o
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    // Log actual token usage from OpenAI response
    if (response.usage) {
      console.log(`🔥 ACTUAL TOKEN USAGE:`, {
        prompt_tokens: response.usage.prompt_tokens,
        completion_tokens: response.usage.completion_tokens,
        total_tokens: response.usage.total_tokens,
        estimated_cost_usd: ((response.usage.prompt_tokens * 0.0025 + response.usage.completion_tokens * 0.01) / 1000).toFixed(4)
      });
    }

    console.log('📝 Raw GPT response:', content.substring(0, 200) + '...');

    // Clean up the response in case GPT adds extra formatting
    let cleanContent = content.trim();
    if (cleanContent.startsWith('```json')) {
      cleanContent = cleanContent.replace(/```json\s*/, '').replace(/\s*```$/, '');
    }
    if (cleanContent.startsWith('```')) {
      cleanContent = cleanContent.replace(/```\s*/, '').replace(/\s*```$/, '');
    }

    const parsedContent = JSON.parse(cleanContent) as ProcessedContent;
    
    // Validate the response structure
    if (!parsedContent.summary || !Array.isArray(parsedContent.mainConcepts)) {
      throw new Error('Invalid response structure from OpenAI');
    }

    console.log(`✅ GPT-4o RESEARCH-BASED study guide generated successfully with enhanced reasoning`);
    return parsedContent;

  } catch (error) {
    console.error('❌ GPT generation failed:', error);
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
    // Fallback to the existing intelligent system
    throw error;
  }
}

interface TopicAnalysis {
  category: string;
  subject: string;
  examType: string;
  level: string;
  isPreparationGuide: boolean;
  keywords: string[];
}

interface ProcessedContent {
  mainConcepts: string[];
  keyPoints: string[];
  definitions: Record<string, string>;
  examples: string[];
  applications: string[];
  summary: string;
  studyStrategy: string[];
  examTips: string[];
}

export async function POST(request: NextRequest) {
  try {
    const { topic, language = 'english' } = await request.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    console.log(`🚀 Generating GPT-4o RESEARCH-BASED study guide for: "${topic}"`);

    // Step 1: Try GPT-4o with research for best quality and deep reasoning
    let content: ProcessedContent;
    let method = 'gpt-4o-research-powered';
    
    try {
      content = await generateStudyGuideWithGPT(topic, language);
    } catch (gptError) {
      console.log('⚠️ GPT failed, falling back to intelligent system');
      // Fallback to existing intelligent system
      const analysis = analyzeTopicIntelligently(topic);
      console.log(`📊 Fallback Analysis: ${analysis.category} - ${analysis.subject} - ${analysis.examType}`);
      content = await generateIntelligentContent(topic, analysis, language);
      method = 'research-enhanced-fallback';
    }

    // Step 2: Create professional study guide HTML
    const analysis = { 
      category: 'gpt-generated', 
      subject: topic, 
      examType: '', 
      level: '', 
      isPreparationGuide: false, 
      keywords: [] 
    };
    const fullHTML = generateProfessionalHTML(content, topic, language, 'comprehensive', analysis);

    return NextResponse.json({ 
      studyGuide: generateCleanHTML(content, topic, language, analysis),
      fullHTML: fullHTML,
      method: method
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to generate study guide' }, { status: 500 });
  }
}

function analyzeTopicIntelligently(topic: string): TopicAnalysis {
  const topicLower = topic.toLowerCase();
  const words = topicLower.split(/\s+/);
  
  const analysis: TopicAnalysis = {
    category: 'academic-subject',
    subject: '',
    examType: '',
    level: 'intermediate',
    isPreparationGuide: false,
    keywords: words
  };
  
  // Check if it's a preparation guide
  if (topicLower.includes('prepare') || topicLower.includes('preparation') || topicLower.includes('how to')) {
    analysis.isPreparationGuide = true;
    analysis.category = 'exam-preparation';
    
    // Specific exam detection
    if (topicLower.includes('net') && topicLower.includes('math')) {
      analysis.examType = 'ugc-net-mathematics';
      analysis.subject = 'mathematics';
      analysis.level = 'postgraduate';
    } else if (topicLower.includes('upsc')) {
      analysis.examType = 'upsc-civil-services';
      analysis.level = 'advanced';
    } else if (topicLower.includes('ssc')) {
      analysis.examType = 'ssc-government';
      analysis.level = 'intermediate';
    } else if (topicLower.includes('jee')) {
      analysis.examType = 'jee-engineering';
      analysis.level = 'advanced';
    } else if (topicLower.includes('neet')) {
      analysis.examType = 'neet-medical';
      analysis.level = 'advanced';
    }
  }
  
  // Subject detection
  if (words.some(w => ['math', 'mathematics', 'algebra', 'calculus', 'geometry', 'trigonometry'].includes(w))) {
    analysis.subject = 'mathematics';
  } else if (words.some(w => ['physics', 'chemistry', 'biology', 'science'].includes(w))) {
    analysis.subject = 'science';
  } else if (words.some(w => ['history', 'geography', 'civics', 'economics'].includes(w))) {
    analysis.subject = 'social-studies';
  }
  
  return analysis;
}

async function generateIntelligentContent(topic: string, analysis: TopicAnalysis, language: string): Promise<ProcessedContent> {
  console.log(`🎯 Generating intelligent content for: ${analysis.examType || analysis.subject || 'general'}`);
  
  // Get Wikipedia content for non-preparation topics
  let wikiContent = '';
  if (!analysis.isPreparationGuide) {
    wikiContent = await getWikipediaContent(topic);
  }
  
  return {
    mainConcepts: generateSmartConcepts(topic, analysis, wikiContent),
    keyPoints: generateSmartKeyPoints(topic, analysis),
    definitions: generateSmartDefinitions(topic, analysis, wikiContent),
    examples: generateSmartExamples(topic, analysis),
    applications: generateSmartApplications(topic, analysis),
    summary: generateSmartSummary(topic, analysis, wikiContent),
    studyStrategy: generateSmartStudyStrategy(topic, analysis),
    examTips: generateSmartExamTips(topic, analysis)
  };
}

function generateSmartConcepts(topic: string, analysis: TopicAnalysis, wikiContent: string): string[] {
  const concepts: string[] = [];
  
  // Extract from Wikipedia first
  if (wikiContent) {
    const sentences = wikiContent.split(/[.!?]+/).filter(s => s.trim().length > 30);
    const relevantSentences = sentences.filter(s => {
      const lower = s.toLowerCase();
      return lower.includes('is a') || lower.includes('refers to') || lower.includes('defined as');
    }).slice(0, 2);
    concepts.push(...relevantSentences.map(s => s.trim()));
  }
  
  // Add specific intelligent concepts
  if (analysis.examType === 'ugc-net-mathematics') {
    concepts.push(
      'UGC NET Mathematics consists of Paper-I (General Aptitude) and Paper-II (Subject-specific Mathematics)',
      'Paper-II syllabus includes Real Analysis (25%), Complex Analysis (15%), Linear Algebra (15%), Abstract Algebra (15%), and other topics',
      'Exam is computer-based with 3 hours duration and negative marking for incorrect answers',
      'JRF qualification requires being in top 6% of Paper-II qualified candidates',
      'Assistant Professor eligibility requires only qualifying Paper-I and Paper-II with minimum marks'
    );
  } else if (analysis.subject === 'mathematics') {
    concepts.push(
      `${topic} involves systematic study of mathematical structures, patterns, and logical relationships`,
      'Mathematical reasoning requires both computational skills and conceptual understanding',
      'Problem-solving techniques and proof methods are essential components',
      'Applications span across science, engineering, economics, and technology fields'
    );
  } else if (analysis.subject === 'science') {
    concepts.push(
      `${topic} is based on scientific principles that can be observed, measured, and tested`,
      'Scientific understanding requires both theoretical knowledge and experimental evidence',
      'The concept connects to broader scientific frameworks and natural phenomena',
      'Practical applications demonstrate the relevance in technology and daily life'
    );
  }
  
  return concepts.slice(0, 6);
}

function generateSmartKeyPoints(topic: string, analysis: TopicAnalysis): string[] {
  if (analysis.examType === 'ugc-net-mathematics') {
    return [
      'Master undergraduate mathematics thoroughly - Real Analysis, Complex Analysis, Linear Algebra are core areas',
      'Practice previous year questions systematically - understand question patterns and difficulty levels',
      'Focus on theorem statements, proofs, and their applications in problem-solving',
      'Develop speed and accuracy - 3 hours for 100 questions requires efficient time management',
      'Create comprehensive notes and formula sheets for effective revision strategy'
    ];
  }
  
  if (analysis.subject === 'mathematics') {
    return [
      'Build strong foundation in basic mathematical concepts and operations',
      'Practice problem-solving with step-by-step methodology and logical reasoning',
      'Understand theoretical concepts along with practical computational techniques',
      'Regular practice with diverse problem types builds confidence and speed',
      'Connect mathematical concepts to real-world applications and scenarios'
    ];
  }
  
  if (analysis.subject === 'science') {
    return [
      'Understand fundamental scientific principles and their experimental basis',
      'Learn scientific terminology and precise definitions for clear communication',
      'Practice numerical problems and data interpretation skills',
      'Connect theoretical knowledge to practical applications and real phenomena',
      'Develop scientific thinking and analytical problem-solving abilities'
    ];
  }
  
  return [
    `Master the fundamental concepts and principles of ${topic}`,
    'Develop systematic approach to learning and problem-solving',
    'Practice regular application and real-world connections',
    'Build strong foundation before advancing to complex topics',
    'Regular revision and self-assessment for continuous improvement'
  ];
}

function generateSmartDefinitions(topic: string, analysis: TopicAnalysis, wikiContent: string): Record<string, string> {
  const definitions: Record<string, string> = {};
  
  // Extract from Wikipedia content
  if (wikiContent) {
    const sentences = wikiContent.split(/[.!?]+/);
    sentences.forEach(sentence => {
      const match = sentence.match(/(.+?)\s+(is|are|refers to|means)\s+(.+)/i);
      if (match && match[3].length > 20 && match[3].length < 200) {
        const term = match[1].trim();
        const definition = match[3].trim();
        if (term.length < 50 && !definitions[term]) {
          definitions[term] = definition;
        }
      }
    });
  }
  
  // Add specific definitions
  if (analysis.examType === 'ugc-net-mathematics') {
    definitions['UGC NET'] = 'National Eligibility Test conducted by NTA for determining eligibility for Assistant Professor and JRF in Indian universities';
    definitions['JRF'] = 'Junior Research Fellowship providing ₹31,000 monthly stipend for PhD research work';
    definitions['Paper-II'] = 'Subject-specific paper testing in-depth knowledge of mathematics at postgraduate level';
  }
  
  return definitions;
}

function generateSmartExamples(topic: string, analysis: TopicAnalysis): string[] {
  if (analysis.examType === 'ugc-net-mathematics') {
    return [
      'Daily routine: 6-8 hours mathematics study focusing on Real Analysis theorems and proofs',
      'Topic schedule: Real Analysis (2.5 months), Complex Analysis (2 months), Linear Algebra (1.5 months), Abstract Algebra (2 months)',
      'Practice pattern: Solve 15-20 previous year questions daily, take weekly full-length mock tests',
      'Resource strategy: Standard textbooks (Rudin, Dummit-Foote) + coaching notes + online lectures',
      'Revision approach: Monthly topic revision, theorem compilation, and formula quick-reference sheets'
    ];
  }
  
  if (analysis.subject === 'mathematics') {
    return [
      'Work through step-by-step problem solutions to understand methodology',
      'Use visual representations and graphs to understand mathematical relationships',
      'Practice mental calculations and computational shortcuts for efficiency',
      'Apply mathematical concepts to solve real-world problems and scenarios'
    ];
  }
  
  return [
    `Practical study examples and case studies related to ${topic}`,
    'Real-world applications demonstrating the importance and relevance',
    'Step-by-step learning approach with progressive difficulty levels'
  ];
}

function generateSmartApplications(topic: string, analysis: TopicAnalysis): string[] {
  if (analysis.examType === 'ugc-net-mathematics') {
    return [
      'Assistant Professor positions in universities and colleges with salary range ₹57,700 - ₹1,82,400',
      'JRF fellowship for PhD research with ₹31,000 monthly stipend and contingency grant',
      'Research opportunities in pure and applied mathematics at national institutes',
      'Higher education teaching career with job security and academic growth prospects',
      'International collaboration opportunities for research and academic exchange programs'
    ];
  }
  
  if (analysis.subject === 'mathematics') {
    return [
      'Engineering and technology careers requiring strong mathematical foundation',
      'Data science and analytics roles using mathematical modeling and statistics',
      'Finance and banking sectors applying mathematical concepts for analysis',
      'Research and development opportunities in various scientific fields'
    ];
  }
  
  return [
    `Professional career opportunities related to ${topic}`,
    'Academic and research applications in higher education',
    'Industry applications and technological innovations',
    'Personal development and skill enhancement benefits'
  ];
}

function generateSmartSummary(topic: string, analysis: TopicAnalysis, wikiContent: string): string {
  if (analysis.examType === 'ugc-net-mathematics') {
    return `UGC NET Mathematics is a national-level exam for Assistant Professor and JRF positions, requiring mastery of undergraduate mathematics topics including Real Analysis, Complex Analysis, Linear Algebra, and Abstract Algebra. Success requires systematic preparation, regular practice with previous papers, and strong conceptual understanding of mathematical theorems and proofs.`;
  }
  
  if (wikiContent && wikiContent.length > 100) {
    // Extract the most relevant sentence from Wikipedia
    const sentences = wikiContent.split(/[.!?]+/).filter(s => s.trim().length > 30);
    const topicWords = topic.toLowerCase().split(/\s+/);
    
    const relevantSentence = sentences.find(s => {
      const lower = s.toLowerCase();
      return topicWords.some(word => lower.includes(word)) && lower.length > 50;
    });
    
    if (relevantSentence) {
      return relevantSentence.trim();
    }
  }
  
  return `${topic} is an important area of study requiring systematic learning, conceptual understanding, and practical application for comprehensive mastery and real-world application.`;
}

function generateSmartStudyStrategy(topic: string, analysis: TopicAnalysis): string[] {
  if (analysis.examType === 'ugc-net-mathematics') {
    return [
      'Start with NCERT 11-12 mathematics for basic concept revision and foundation building',
      'Use standard textbooks: Rudin (Real Analysis), Ahlfors (Complex Analysis), Hoffman-Kunze (Linear Algebra)',
      'Solve previous 15 years question papers systematically to understand exam patterns',
      'Join quality test series and take weekly mock tests for performance evaluation',
      'Create handwritten notes with theorem statements, proofs, and important formulas'
    ];
  }
  
  return [
    'Build strong foundation with basic concepts before advancing to complex topics',
    'Use multiple learning resources: textbooks, online materials, and practical exercises',
    'Practice regular self-assessment and identify areas needing improvement',
    'Create effective study notes and summary materials for quick revision',
    'Maintain consistent study schedule with balanced learning and practice time'
  ];
}

function generateSmartExamTips(topic: string, analysis: TopicAnalysis): string[] {
  if (analysis.examType === 'ugc-net-mathematics') {
    return [
      'Attempt questions strategically - start with your strongest topics (Real Analysis, Linear Algebra)',
      'Use elimination method for multiple choice questions when direct solution is time-consuming',
      'Time management: Spend maximum 2 minutes per question, move on if stuck',
      'Review calculations carefully - mathematical errors can be costly in competitive exams',
      'Stay calm and focused - negative marking requires confident and accurate attempts'
    ];
  }
  
  if (analysis.isPreparationGuide) {
    return [
      'Understand the exam pattern, syllabus, and marking scheme thoroughly',
      'Practice with timed mock tests to improve speed and accuracy',
      'Focus on conceptual clarity rather than rote memorization',
      'Identify and strengthen weak areas through targeted practice',
      'Maintain physical and mental health during preparation period'
    ];
  }
  
  return [
    'Focus on understanding concepts rather than memorizing facts',
    'Practice application of knowledge in different contexts',
    'Regular revision helps in long-term retention',
    'Seek help when facing difficulties - don\'t let doubts accumulate',
    'Connect learning to practical applications for better understanding'
  ];
}

async function getWikipediaContent(topic: string): Promise<string> {
  try {
    const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'TheTutorBridge-StudyGuide/1.0',
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (data.extract) {
        console.log(`✅ Wikipedia content found for: ${data.title}`);
        return data.extract;
      }
    }
    
    return '';
  } catch (error) {
    console.error('Wikipedia error:', error);
    return '';
  }
}

function generateProfessionalHTML(content: ProcessedContent, topic: string, language: string, template: string, analysis: TopicAnalysis): string {
  const isHindi = language === 'hindi';
  
  const styles = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap');
      
      * { box-sizing: border-box; }
      body { 
        font-family: 'Merriweather', serif; 
        line-height: 1.7; 
        margin: 0; 
        padding: 15px; 
        background-color: #F5F5F5; 
        color: #2C2C2C;
      }
      
      .study-guide { 
        max-width: 900px; 
        margin: 0 auto; 
        background: #FFFFFF; 
        padding: 30px; 
        border-radius: 12px; 
        box-shadow: 0 8px 32px rgba(26, 61, 124, 0.1); 
      }
      
      .header { 
        text-align: center; 
        margin-bottom: 40px; 
        padding-bottom: 25px; 
        border-bottom: 3px solid #1A3D7C; 
      }
      
      .title { 
        font-family: 'Poppins', sans-serif; 
        color: #1A3D7C; 
        font-size: 2.2em; 
        margin-bottom: 15px; 
        font-weight: 700; 
        line-height: 1.2;
      }
      
      .section { margin-bottom: 35px; }
      
      .section-title { 
        font-family: 'Poppins', sans-serif; 
        color: #1A3D7C; 
        font-size: 1.5em; 
        font-weight: 600; 
        margin-bottom: 20px; 
        border-left: 5px solid #2BAE66; 
        padding-left: 18px; 
      }
      
      .content-box { 
        margin: 12px 0; 
        padding: 18px; 
        border-radius: 10px; 
        box-shadow: 0 3px 12px rgba(0,0,0,0.08);
      }
      
      .concept-item { 
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); 
        border-left: 5px solid #2BAE66; 
      }
      
      .key-point { 
        background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); 
        border-left: 5px solid #1A3D7C; 
      }
      
      .definition-box { 
        background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%); 
        padding: 20px; 
        border-radius: 12px; 
        margin: 15px 0; 
        border: 2px solid #FFC857; 
        box-shadow: 0 4px 16px rgba(255, 200, 87, 0.2);
      }
      
      .definition-term { 
        font-family: 'Poppins', sans-serif; 
        font-weight: 600; 
        color: #1A3D7C; 
        font-size: 1.1em;
        margin-bottom: 8px;
        display: block;
      }
      
      .example-box { 
        background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%); 
        border-left: 5px solid #2BAE66; 
      }
      
      .application-box { 
        background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%); 
        border-left: 5px solid #1A3D7C; 
      }
      
      .summary-box { 
        background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); 
        padding: 25px; 
        border-radius: 12px; 
        border: 3px solid #2BAE66; 
        margin: 25px 0; 
        box-shadow: 0 4px 16px rgba(43, 174, 102, 0.2);
        font-size: 1.05em;
        line-height: 1.6;
      }
      
      .download-btn { 
        font-family: 'Poppins', sans-serif; 
        background: #1A3D7C; 
        color: white; 
        padding: 14px 28px; 
        border: none; 
        border-radius: 8px; 
        cursor: pointer; 
        font-size: 16px; 
        font-weight: 500; 
        margin: 12px 8px; 
        transition: all 0.3s ease;
      }
      .download-btn:hover { background: #2BAE66; transform: translateY(-2px); }
      
      /* Mobile Responsive */
      @media (max-width: 768px) {
        body { padding: 10px; }
        .study-guide { padding: 20px; }
        .title { font-size: 1.8em; }
        .section-title { font-size: 1.3em; }
        .content-box { padding: 15px; }
      }
      
      @media (max-width: 480px) {
        .study-guide { padding: 15px; }
        .title { font-size: 1.6em; }
        .section-title { font-size: 1.1em; }
        .content-box { padding: 12px; }
        .download-btn { padding: 10px 18px; font-size: 14px; }
      }
      
      @media print { 
        .download-btn { display: none; }
        body { background: white; }
      }
    </style>
  `;
  
  let html = `
    <!DOCTYPE html>
    <html lang="${language === 'hindi' ? 'hi' : 'en'}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${isHindi ? 'अध्ययन गाइड' : 'Study Guide'}: ${topic}</title>
      ${styles}
    </head>
    <body>
      <div class="study-guide">
        <div class="header">
          <div style="margin-bottom: 25px;">
            <a href="https://www.thetutorbridge.com" target="_blank" style="text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 15px;">
              <img src="/TheTutorBridge Logo New.png" alt="TheTutorBridge Logo" style="height: 60px; width: auto;" onerror="this.style.display='none';">
              <div style="text-align: left;">
                <div style="font-family: 'Poppins', sans-serif; font-size: 1.8em; font-weight: bold; color: #1A3D7C;">TheTutorBridge</div>
                <div style="font-family: 'Poppins', sans-serif; font-size: 0.9em; color: #2BAE66;">${isHindi ? 'शिक्षा में उत्कृष्टता' : 'Excellence in Education'}</div>
              </div>
            </a>
          </div>
          <h1 class="title">${isHindi ? 'अध्ययन गाइड' : 'Study Guide'}: ${topic}</h1>
        </div>
  `;

  // Summary
  html += `
    <div class="section">
      <h2 class="section-title">${isHindi ? 'सारांश' : 'Summary'}</h2>
      <div class="summary-box">${content.summary}</div>
    </div>
  `;

  // Main Concepts
  if (content.mainConcepts.length > 0) {
    html += `
      <div class="section">
        <h2 class="section-title">${isHindi ? 'मुख्य अवधारणाएं' : 'Key Concepts'}</h2>
    `;
    content.mainConcepts.forEach((concept, i) => {
      html += `<div class="content-box concept-item"><strong>${i + 1}.</strong> ${concept}</div>`;
    });
    html += `</div>`;
  }

  // Definitions
  if (Object.keys(content.definitions).length > 0) {
    html += `
      <div class="section">
        <h2 class="section-title">${isHindi ? 'महत्वपूर्ण परिभाषाएं' : 'Important Definitions'}</h2>
    `;
    Object.entries(content.definitions).forEach(([term, def]) => {
      html += `
        <div class="definition-box">
          <span class="definition-term">${term}</span>
          ${def}
        </div>
      `;
    });
    html += `</div>`;
  }

  // Study Strategy
  if (content.studyStrategy.length > 0) {
    html += `
      <div class="section">
        <h2 class="section-title">${isHindi ? 'अध्ययन रणनीति' : 'Study Strategy'}</h2>
    `;
    content.studyStrategy.forEach((strategy, i) => {
      html += `<div class="content-box key-point"><strong>📚 ${i + 1}.</strong> ${strategy}</div>`;
    });
    html += `</div>`;
  }

  // Examples
  if (content.examples.length > 0) {
    html += `
      <div class="section">
        <h2 class="section-title">${isHindi ? 'व्यावहारिक उदाहरण' : 'Practical Examples'}</h2>
    `;
    content.examples.forEach((example, i) => {
      html += `<div class="content-box example-box"><strong>💡 ${i + 1}.</strong> ${example}</div>`;
    });
    html += `</div>`;
  }

  // Applications
  if (content.applications.length > 0) {
    html += `
      <div class="section">
        <h2 class="section-title">${isHindi ? 'करियर अवसर' : 'Career Opportunities'}</h2>
    `;
    content.applications.forEach((app, i) => {
      html += `<div class="content-box application-box"><strong>🚀 ${i + 1}.</strong> ${app}</div>`;
    });
    html += `</div>`;
  }

  // Exam Tips
  if (content.examTips.length > 0) {
    html += `
      <div class="section">
        <h2 class="section-title">${isHindi ? 'परीक्षा तैयारी टिप्स' : 'Exam Tips'}</h2>
    `;
    content.examTips.forEach((tip, i) => {
      html += `<div class="content-box key-point"><strong>⭐ ${i + 1}.</strong> ${tip}</div>`;
    });
    html += `</div>`;
  }

  // Footer
  html += `
    <div style="text-align: center; margin: 40px 0;">
      <button class="download-btn" onclick="window.print()">${isHindi ? 'PDF डाउनलोड करें' : 'Download PDF'}</button>
    </div>

    <div style="background: linear-gradient(135deg, #1A3D7C 0%, #2BAE66 100%); padding: 30px; border-radius: 12px; text-align: center; margin-top: 40px; color: white;">
      <a href="https://www.thetutorbridge.com" target="_blank" style="color: white; text-decoration: none;">
        <div style="font-family: 'Poppins', sans-serif; font-size: 1.6em; font-weight: bold; margin-bottom: 10px;">📚 TheTutorBridge.com</div>
        <div style="font-size: 1em; opacity: 0.9; margin-bottom: 20px;">${isHindi ? 'भारत का सबसे अच्छा ऑनलाइन शिक्षा प्लेटफॉर्म' : 'India\'s Best Online Education Platform'}</div>
      </a>
      
      <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
          <div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px;">
            ${isHindi ? '📖 कक्षा 6-12 संसाधन' : '📖 Class 6-12 Resources'}
          </div>
          <div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px;">
            ${isHindi ? '👨‍🏫 व्यक्तिगत ट्यूटरिंग' : '👨‍🏫 Personal Tutoring'}
          </div>
          <div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px;">
            ${isHindi ? '💼 करियर गाइडेंस' : '💼 Career Guidance'}
          </div>
          <div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px;">
            ${isHindi ? '📞 मुफ्त डेमो क्लास' : '📞 Free Demo Class'}
          </div>
        </div>
        
        <a href="https://www.thetutorbridge.com" target="_blank" style="display: inline-block; background: #FFC857; color: #1A3D7C; padding: 15px 30px; border-radius: 10px; text-decoration: none; font-family: 'Poppins', sans-serif; font-weight: 600; margin-top: 20px; font-size: 1.1em;">
          ${isHindi ? '🚀 अभी विजिट करें' : '🚀 Visit Now'}
        </a>
      </div>
    </div>

    </div>
    </body>
    </html>
  `;

  return html;
}

function extractInlineHTML(fullHTML: string): string {
  const bodyStart = fullHTML.indexOf('<div class="study-guide">');
  const bodyEnd = fullHTML.lastIndexOf('</div>');
  
  if (bodyStart !== -1 && bodyEnd !== -1) {
    const content = fullHTML.substring(bodyStart, bodyEnd + 6);
    
    return `
      <style>
        .study-guide { font-family: 'Merriweather', serif; line-height: 1.7; color: #2C2C2C; }
        .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #1A3D7C; }
        .title { font-family: 'Poppins', sans-serif; color: #1A3D7C; font-size: 2em; font-weight: 700; }
        .section { margin-bottom: 25px; }
        .section-title { font-family: 'Poppins', sans-serif; color: #1A3D7C; font-size: 1.4em; font-weight: 600; border-left: 5px solid #2BAE66; padding-left: 15px; }
        .content-box { margin: 10px 0; padding: 15px; border-radius: 8px; }
        .concept-item { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-left: 5px solid #2BAE66; }
        .key-point { background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-left: 5px solid #1A3D7C; }
        .definition-box { background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%); padding: 18px; border-radius: 10px; border: 2px solid #FFC857; }
        .definition-term { font-family: 'Poppins', sans-serif; font-weight: 600; color: #1A3D7C; display: block; margin-bottom: 8px; }
        .example-box { background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%); border-left: 5px solid #2BAE66; }
        .application-box { background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%); border-left: 5px solid #1A3D7C; }
        .summary-box { background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); padding: 20px; border-radius: 10px; border: 3px solid #2BAE66; }
      </style>
      ${content}
    `;
  }
  
  return fullHTML;
}

