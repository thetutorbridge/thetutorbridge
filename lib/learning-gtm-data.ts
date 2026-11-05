// GTM Learning Hub Data
// 100 Go-To-Market terms organized by category

export type GTMCategory =
  | 'fundamentals'
  | 'sales'
  | 'revenue-ops'
  | 'growth'
  | 'customer-success'
  | 'modern-gtm';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface GTMTerm {
  id: number;
  slug: string;
  term: string;
  abbreviation?: string;
  category: GTMCategory;
  meaning: string;
  difficulty: DifficultyLevel;
  relatedTerms: string[];      // Related terms in same category
  crossLinks: string[];        // Related terms in different categories
  isPriority: boolean;         // Top 15 priority terms
  keyPoints: string[];         // 3-4 key learning points
  example: string;             // Real-world example
  commonMistakes?: string[];   // Common misconceptions
}

export interface GTMCategoryInfo {
  slug: GTMCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
  termCount: number;
}

export const GTM_CATEGORIES: GTMCategoryInfo[] = [
  {
    slug: 'fundamentals',
    name: 'GTM Fundamentals & Strategy',
    description: 'Core concepts for understanding go-to-market strategy and market positioning.',
    icon: 'Target',
    color: '#1A3D7C',
    termCount: 15
  },
  {
    slug: 'sales',
    name: 'Sales & Pipeline Terminology',
    description: 'Essential sales concepts from lead generation to closing deals.',
    icon: 'TrendingUp',
    color: '#2BAE66',
    termCount: 20
  },
  {
    slug: 'revenue-ops',
    name: 'Revenue Operations & GTM Operations',
    description: 'Operations, systems, and processes that power revenue growth.',
    icon: 'Settings',
    color: '#6366f1',
    termCount: 15
  },
  {
    slug: 'growth',
    name: 'Growth, Marketing & Demand Generation',
    description: 'Strategies for acquiring customers and driving sustainable growth.',
    icon: 'Rocket',
    color: '#f59e0b',
    termCount: 20
  },
  {
    slug: 'customer-success',
    name: 'Customer Success & Retention',
    description: 'Keeping customers happy, reducing churn, and expanding revenue.',
    icon: 'Heart',
    color: '#ec4899',
    termCount: 10
  },
  {
    slug: 'modern-gtm',
    name: 'Modern GTM, AI & Buying Behaviour',
    description: 'Cutting-edge concepts including AI-driven GTM and buying signals.',
    icon: 'Cpu',
    color: '#8b5cf6',
    termCount: 20
  }
];

export const GTM_TERMS: GTMTerm[] = [
  // ============================================
  // CATEGORY 1: GTM Fundamentals & Strategy (15 terms)
  // ============================================
  {
    id: 1,
    slug: 'go-to-market-gtm',
    term: 'Go-To-Market',
    abbreviation: 'GTM',
    category: 'fundamentals',
    meaning: 'The overall strategy for bringing a product to market and acquiring customers. It encompasses everything from identifying target customers to choosing sales channels, pricing, and messaging.',
    difficulty: 'beginner',
    relatedTerms: ['gtm-motion', 'positioning', 'value-proposition'],
    crossLinks: ['demand-generation', 'pipeline-generation', 'revops'],
    isPriority: true,
    keyPoints: [
      'Defines how you will reach and convert customers',
      'Includes pricing, positioning, and distribution strategy',
      'Should be revisited as market conditions change',
      'Aligns product, marketing, sales, and customer success'
    ],
    example: 'When Slack launched, their GTM strategy focused on bottom-up adoption—letting teams try the product for free, then expanding within organizations. This product-led approach was their GTM.'
  },
  {
    id: 2,
    slug: 'gtm-motion',
    term: 'GTM Motion',
    category: 'fundamentals',
    meaning: 'The approach a company uses to acquire and convert customers, such as sales-led, product-led, or partner-led. Different motions require different team structures, metrics, and investments.',
    difficulty: 'beginner',
    relatedTerms: ['go-to-market-gtm', 'positioning', 'market-segmentation'],
    crossLinks: ['plg-product-led-growth', 'slg-sales-led-growth', 'pipeline-generation'],
    isPriority: true,
    keyPoints: [
      'Sales-led: Enterprise deals with sales team driving conversions',
      'Product-led: Product itself drives acquisition and conversion',
      'Partner-led: Channel partners drive customer acquisition',
      'Most companies use a hybrid of multiple motions'
    ],
    example: 'Zoom uses a hybrid GTM motion: product-led for small teams (free tier) and sales-led for enterprise accounts with dedicated sales teams.'
  },
  {
    id: 3,
    slug: 'icp-ideal-customer-profile',
    term: 'Ideal Customer Profile',
    abbreviation: 'ICP',
    category: 'fundamentals',
    meaning: 'The type of company that is most likely to benefit from and purchase your product. ICP defines firmographic characteristics like industry, company size, geography, and technology stack.',
    difficulty: 'beginner',
    relatedTerms: ['buyer-persona', 'tam-total-addressable-market', 'market-segmentation'],
    crossLinks: ['lead-qualification', 'abm-account-based-marketing', 'pipeline-generation'],
    isPriority: true,
    keyPoints: [
      'Focuses on company-level characteristics, not individuals',
      'Helps prioritize sales and marketing efforts',
      'Should be validated with data from best customers',
      'Different from buyer persona which is about people'
    ],
    example: 'A B2B SaaS company selling HR software might define their ICP as: Tech companies with 200-2000 employees, US-based, using Slack and Google Workspace, with distributed teams.'
  },
  {
    id: 4,
    slug: 'buyer-persona',
    term: 'Buyer Persona',
    category: 'fundamentals',
    meaning: 'A representation of the individual decision-maker or buyer within your ICP. Personas include job title, responsibilities, goals, challenges, and how they prefer to buy.',
    difficulty: 'beginner',
    relatedTerms: ['icp-ideal-customer-profile', 'value-proposition', 'messaging-framework'],
    crossLinks: ['buying-committee', 'champion', 'economic-buyer'],
    isPriority: false,
    keyPoints: [
      'Represents a type of person, not a specific individual',
      'Based on research with real customers',
      'Guides content creation and messaging',
      'Most B2B purchases involve multiple personas'
    ],
    example: 'For HR software: "HR Hannah" - VP of People at a tech company, 10+ years experience, cares about employee experience, reports to CEO, evaluates tools quarterly.'
  },
  {
    id: 5,
    slug: 'tam-total-addressable-market',
    term: 'Total Addressable Market',
    abbreviation: 'TAM',
    category: 'fundamentals',
    meaning: 'The total revenue opportunity if you captured 100% of your target market. TAM represents the maximum potential size of your market.',
    difficulty: 'intermediate',
    relatedTerms: ['sam-serviceable-available-market', 'som-serviceable-obtainable-market', 'market-segmentation'],
    crossLinks: ['market-penetration', 'positioning'],
    isPriority: false,
    keyPoints: [
      'Useful for understanding market potential',
      'Can be calculated top-down or bottom-up',
      'Investors use TAM to evaluate opportunity size',
      'Be careful not to inflate TAM unrealistically'
    ],
    example: 'If there are 100,000 companies globally that could use your project management software and you charge $10,000/year, your TAM is $1 billion.'
  },
  {
    id: 6,
    slug: 'sam-serviceable-available-market',
    term: 'Serviceable Available Market',
    abbreviation: 'SAM',
    category: 'fundamentals',
    meaning: 'The portion of TAM your business can realistically serve given your product capabilities, geography, and go-to-market approach.',
    difficulty: 'intermediate',
    relatedTerms: ['tam-total-addressable-market', 'som-serviceable-obtainable-market', 'market-segmentation'],
    crossLinks: ['market-penetration', 'icp-ideal-customer-profile'],
    isPriority: false,
    keyPoints: [
      'More realistic than TAM for planning',
      'Limited by product features, language, region',
      'Changes as you expand capabilities',
      'Helps set realistic growth targets'
    ],
    example: 'If your TAM is $1B but you only sell to US companies under 500 employees and your product is English-only, your SAM might be $200M.'
  },
  {
    id: 7,
    slug: 'som-serviceable-obtainable-market',
    term: 'Serviceable Obtainable Market',
    abbreviation: 'SOM',
    category: 'fundamentals',
    meaning: 'The portion of SAM you can realistically capture given competition, resources, and execution capabilities. This is your realistic market share target.',
    difficulty: 'intermediate',
    relatedTerms: ['tam-total-addressable-market', 'sam-serviceable-available-market', 'market-penetration'],
    crossLinks: ['competitive-intelligence', 'positioning'],
    isPriority: false,
    keyPoints: [
      'Most realistic market sizing metric',
      'Typically a small percentage of SAM initially',
      'Used for revenue forecasting',
      'Considers competitive dynamics'
    ],
    example: 'With $200M SAM, if you can realistically capture 5% market share in 3 years, your SOM is $10M.'
  },
  {
    id: 8,
    slug: 'market-segmentation',
    term: 'Market Segmentation',
    category: 'fundamentals',
    meaning: 'Dividing a market into smaller groups based on shared characteristics like industry, company size, geography, or behavior. Enables targeted marketing and sales strategies.',
    difficulty: 'beginner',
    relatedTerms: ['icp-ideal-customer-profile', 'tam-total-addressable-market', 'positioning'],
    crossLinks: ['abm-account-based-marketing', 'territory-planning', 'lead-scoring'],
    isPriority: false,
    keyPoints: [
      'Allows for tailored messaging per segment',
      'Common criteria: industry, size, geography, behavior',
      'Enables efficient resource allocation',
      'Segments should be measurable and accessible'
    ],
    example: 'A CRM company might segment by: Enterprise (1000+ employees), Mid-market (100-999), SMB (under 100), with different sales motions for each.'
  },
  {
    id: 9,
    slug: 'positioning',
    term: 'Positioning',
    category: 'fundamentals',
    meaning: 'How you want your target audience to perceive your product relative to alternatives. Positioning defines your unique place in the market and in customers\' minds.',
    difficulty: 'intermediate',
    relatedTerms: ['differentiation', 'value-proposition', 'messaging-framework'],
    crossLinks: ['competitive-intelligence', 'product-marketing'],
    isPriority: false,
    keyPoints: [
      'Based on competitive alternatives, not just competitors',
      'Must be true, relevant, and differentiated',
      'Should resonate with target buyers',
      'Foundation for all marketing messages'
    ],
    example: 'Slack positioned as "Where work happens" - not just a chat tool but a central hub, differentiating from email and simple messaging apps.'
  },
  {
    id: 10,
    slug: 'differentiation',
    term: 'Differentiation',
    category: 'fundamentals',
    meaning: 'What makes your product meaningfully different from competitors. True differentiation is hard to copy and matters to customers.',
    difficulty: 'intermediate',
    relatedTerms: ['positioning', 'value-proposition', 'competitive-intelligence'],
    crossLinks: ['category-creation', 'product-marketing'],
    isPriority: false,
    keyPoints: [
      'Must matter to customers, not just be different',
      'Can be features, experience, service, or approach',
      'Should be defensible and hard to copy',
      'Claims need proof and validation'
    ],
    example: 'Tesla differentiated with over-the-air updates - cars that improve after purchase, unlike traditional automakers requiring dealer visits.'
  },
  {
    id: 11,
    slug: 'value-proposition',
    term: 'Value Proposition',
    category: 'fundamentals',
    meaning: 'The primary value or benefit your product promises to deliver. It answers "Why should I buy this?" and connects your differentiation to customer outcomes.',
    difficulty: 'beginner',
    relatedTerms: ['positioning', 'differentiation', 'messaging-framework'],
    crossLinks: ['product-marketing', 'conversion-rate-optimization'],
    isPriority: false,
    keyPoints: [
      'Should be clear, specific, and compelling',
      'Focused on customer outcome, not features',
      'Different personas may have different value props',
      'Must be provable with evidence'
    ],
    example: 'Stripe\'s value proposition: "Payments infrastructure for the internet" - enabling developers to accept payments with minimal code.'
  },
  {
    id: 12,
    slug: 'messaging-framework',
    term: 'Messaging Framework',
    category: 'fundamentals',
    meaning: 'A structured way of communicating product value to different audiences. Ensures consistent messaging across teams while allowing customization per persona or segment.',
    difficulty: 'intermediate',
    relatedTerms: ['value-proposition', 'positioning', 'buyer-persona'],
    crossLinks: ['product-marketing', 'sales-enablement'],
    isPriority: false,
    keyPoints: [
      'Aligns marketing, sales, and product teams',
      'Includes key messages per persona',
      'Provides proof points and evidence',
      'Should evolve based on market feedback'
    ],
    example: 'A messaging framework includes: 30-second pitch, key benefits by persona, competitive differentiators, objection handling, and customer proof points.'
  },
  {
    id: 13,
    slug: 'category-creation',
    term: 'Category Creation',
    category: 'fundamentals',
    meaning: 'Establishing a new market category around a product or solution. Instead of competing in an existing category, you define and lead a new one.',
    difficulty: 'advanced',
    relatedTerms: ['positioning', 'differentiation', 'value-proposition'],
    crossLinks: ['demand-generation', 'product-marketing'],
    isPriority: false,
    keyPoints: [
      'Requires significant investment in education',
      'Risk: the category may not gain adoption',
      'Reward: category leaders capture most value',
      'Needs POV on why the world needs this category'
    ],
    example: 'HubSpot created the "Inbound Marketing" category, defining a new approach to marketing that they led, rather than competing as just another marketing tool.'
  },
  {
    id: 14,
    slug: 'competitive-intelligence',
    term: 'Competitive Intelligence',
    category: 'fundamentals',
    meaning: 'Researching competitors, their products, pricing, positioning, and strategies. Used to inform your own GTM decisions and handle competitive situations.',
    difficulty: 'intermediate',
    relatedTerms: ['positioning', 'differentiation', 'market-segmentation'],
    crossLinks: ['sales-enablement', 'win-rate'],
    isPriority: false,
    keyPoints: [
      'Includes direct competitors and alternatives',
      'Track product, pricing, and messaging changes',
      'Use for sales battlecards and training',
      'Ongoing process, not one-time research'
    ],
    example: 'A competitive intelligence program tracks competitor feature releases, pricing changes, customer reviews, and sales tactics, shared via monthly battlecard updates.'
  },
  {
    id: 15,
    slug: 'market-penetration',
    term: 'Market Penetration',
    category: 'fundamentals',
    meaning: 'Increasing your market share within an existing market. Focuses on winning more customers from the available market rather than expanding to new markets.',
    difficulty: 'intermediate',
    relatedTerms: ['som-serviceable-obtainable-market', 'competitive-intelligence', 'tam-total-addressable-market'],
    crossLinks: ['demand-capture', 'win-rate', 'sales-cycle'],
    isPriority: false,
    keyPoints: [
      'Different from market expansion',
      'Requires winning against competitors',
      'Can involve pricing, distribution, or positioning changes',
      'Measured as percentage of SAM/SOM captured'
    ],
    example: 'A CRM with 5% market share focusing on penetration might double sales team, improve competitive positioning, and offer switching incentives to win more of the existing market.'
  },

  // ============================================
  // CATEGORY 2: Sales & Pipeline Terminology (20 terms)
  // ============================================
  {
    id: 16,
    slug: 'pipeline',
    term: 'Pipeline',
    category: 'sales',
    meaning: 'All active sales opportunities being pursued by a sales team. Pipeline represents potential future revenue at various stages of the sales process.',
    difficulty: 'beginner',
    relatedTerms: ['pipeline-generation', 'pipeline-coverage', 'deal-velocity'],
    crossLinks: ['sales-forecasting', 'crm-customer-relationship-management'],
    isPriority: true,
    keyPoints: [
      'Represents potential future revenue',
      'Organized by deal stages (e.g., Discovery, Demo, Negotiation)',
      'Quality matters as much as quantity',
      'Needs continuous replenishment'
    ],
    example: 'A sales rep with $500K in pipeline has opportunities at various stages: $100K in Discovery, $200K in Demo, $200K in Negotiation.'
  },
  {
    id: 17,
    slug: 'pipeline-generation',
    term: 'Pipeline Generation',
    category: 'sales',
    meaning: 'The process of creating new sales opportunities. Pipeline generation combines marketing activities, sales prospecting, and partner referrals to create qualified opportunities.',
    difficulty: 'beginner',
    relatedTerms: ['pipeline', 'lead-generation', 'outbound-sales'],
    crossLinks: ['demand-generation', 'abm-account-based-marketing', 'mql-marketing-qualified-lead'],
    isPriority: true,
    keyPoints: [
      'Critical metric for revenue predictability',
      'Requires alignment between marketing and sales',
      'Multiple sources: inbound, outbound, partners, events',
      'Focus on qualified pipeline, not just volume'
    ],
    example: 'A company generates pipeline through: content marketing (30%), outbound SDR team (40%), events (15%), and partner referrals (15%).'
  },
  {
    id: 18,
    slug: 'pipeline-coverage',
    term: 'Pipeline Coverage',
    category: 'sales',
    meaning: 'The ratio of pipeline value to the sales target. A coverage ratio of 3x means you have 3 times more pipeline than your quota, accounting for expected win rates.',
    difficulty: 'intermediate',
    relatedTerms: ['pipeline', 'win-rate', 'sales-forecasting'],
    crossLinks: ['deal-velocity', 'sales-cycle'],
    isPriority: false,
    keyPoints: [
      'Typical healthy coverage: 3-4x quota',
      'Low coverage = revenue risk',
      'Varies by win rate and deal velocity',
      'Leading indicator of future revenue'
    ],
    example: 'With a $1M quota and 33% win rate, you need $3M in pipeline (3x coverage) to reliably hit your target.'
  },
  {
    id: 19,
    slug: 'lead-generation',
    term: 'Lead Generation',
    category: 'sales',
    meaning: 'Attracting potential customers who may be interested in your product. Lead generation creates the top of the sales funnel through marketing and outreach activities.',
    difficulty: 'beginner',
    relatedTerms: ['lead-qualification', 'mql-marketing-qualified-lead', 'lead-nurturing'],
    crossLinks: ['demand-generation', 'inbound-sales', 'outbound-sales'],
    isPriority: false,
    keyPoints: [
      'First step in the revenue process',
      'Channels: content, ads, events, referrals',
      'Quality vs quantity tradeoff',
      'Measured by cost per lead (CPL)'
    ],
    example: 'A B2B company generates leads through gated eBooks (20%), webinars (30%), paid ads (25%), and LinkedIn content (25%).'
  },
  {
    id: 20,
    slug: 'lead-qualification',
    term: 'Lead Qualification',
    category: 'sales',
    meaning: 'Determining whether a lead is a good fit and worth pursuing. Qualification ensures sales time is spent on prospects likely to convert.',
    difficulty: 'beginner',
    relatedTerms: ['lead-generation', 'mql-marketing-qualified-lead', 'sql-sales-qualified-lead'],
    crossLinks: ['icp-ideal-customer-profile', 'lead-scoring'],
    isPriority: false,
    keyPoints: [
      'Common frameworks: BANT, MEDDIC, SPICED',
      'Assess fit, need, timing, and budget',
      'Can be done by marketing (MQL) or sales (SQL)',
      'Prevents wasted sales resources'
    ],
    example: 'Using BANT: Does the lead have Budget, Authority to buy, a genuine Need, and Timeline for purchase?'
  },
  {
    id: 21,
    slug: 'mql-marketing-qualified-lead',
    term: 'Marketing Qualified Lead',
    abbreviation: 'MQL',
    category: 'sales',
    meaning: 'A lead considered qualified based on marketing engagement and predefined criteria. MQLs show enough interest to be passed to sales for further qualification.',
    difficulty: 'beginner',
    relatedTerms: ['sql-sales-qualified-lead', 'pql-product-qualified-lead', 'lead-scoring'],
    crossLinks: ['lead-generation', 'demand-generation', 'lead-nurturing'],
    isPriority: false,
    keyPoints: [
      'Defined by engagement threshold (score)',
      'First handoff point from marketing to sales',
      'Criteria should be agreed by marketing and sales',
      'Not all MQLs become SQLs'
    ],
    example: 'An MQL might be someone who downloaded 3 pieces of content, attended a webinar, and visited the pricing page - scoring above 100 points.'
  },
  {
    id: 22,
    slug: 'sql-sales-qualified-lead',
    term: 'Sales Qualified Lead',
    abbreviation: 'SQL',
    category: 'sales',
    meaning: 'A lead that meets sales qualification criteria and is ready for sales engagement. SQLs have been vetted to confirm they have genuine potential to become customers.',
    difficulty: 'beginner',
    relatedTerms: ['mql-marketing-qualified-lead', 'sal-sales-accepted-lead', 'lead-qualification'],
    crossLinks: ['pipeline-generation', 'sales-cycle'],
    isPriority: false,
    keyPoints: [
      'Has passed initial sales conversation',
      'Confirmed fit, need, and potential timeline',
      'Higher conversion rate than MQL',
      'Moves into active sales pipeline'
    ],
    example: 'After an MQL books a call, the SDR confirms they have budget, are evaluating solutions, and have a 90-day timeline - they become an SQL.'
  },
  {
    id: 23,
    slug: 'pql-product-qualified-lead',
    term: 'Product Qualified Lead',
    abbreviation: 'PQL',
    category: 'sales',
    meaning: 'A prospect who demonstrates buying intent through product usage. In PLG models, PQLs are users who have experienced value and show signals of readiness to upgrade.',
    difficulty: 'intermediate',
    relatedTerms: ['mql-marketing-qualified-lead', 'sql-sales-qualified-lead', 'lead-scoring'],
    crossLinks: ['plg-product-led-growth', 'activation', 'product-adoption'],
    isPriority: false,
    keyPoints: [
      'Based on product behavior, not content engagement',
      'Key metric in PLG companies',
      'Usage signals: features used, frequency, team size',
      'Often higher quality than MQLs'
    ],
    example: 'A PQL in Slack might be a free team that has 10+ members, 1000+ messages, and has integrated 3+ apps - showing high engagement and growth potential.'
  },
  {
    id: 24,
    slug: 'sal-sales-accepted-lead',
    term: 'Sales Accepted Lead',
    abbreviation: 'SAL',
    category: 'sales',
    meaning: 'A lead formally accepted by the sales team for follow-up. SAL represents the handoff point where sales agrees the lead is worth pursuing.',
    difficulty: 'intermediate',
    relatedTerms: ['mql-marketing-qualified-lead', 'sql-sales-qualified-lead', 'lead-routing'],
    crossLinks: ['pipeline-generation', 'revops'],
    isPriority: false,
    keyPoints: [
      'Sales takes ownership at this stage',
      'Prevents leads from being ignored',
      'Creates accountability between teams',
      'SLA typically defines response time'
    ],
    example: 'When an SDR receives an MQL, they have 4 hours (SLA) to accept it as an SAL or reject it with feedback to marketing.'
  },
  {
    id: 25,
    slug: 'lead-scoring',
    term: 'Lead Scoring',
    category: 'sales',
    meaning: 'Assigning scores to leads based on attributes and behaviors. Lead scoring helps prioritize which leads to pursue first based on likely conversion potential.',
    difficulty: 'intermediate',
    relatedTerms: ['lead-qualification', 'mql-marketing-qualified-lead', 'lead-nurturing'],
    crossLinks: ['marketing-ops', 'data-enrichment', 'crm-customer-relationship-management'],
    isPriority: false,
    keyPoints: [
      'Combines demographic and behavioral signals',
      'Should be calibrated against actual conversion data',
      'Negative scoring for bad fit signals',
      'Enables automation and prioritization'
    ],
    example: 'Lead scoring model: +20 for Director+ title, +10 for pricing page visit, +15 for demo request, -30 for competitor email domain, MQL threshold at 100.'
  },
  {
    id: 26,
    slug: 'lead-nurturing',
    term: 'Lead Nurturing',
    category: 'sales',
    meaning: 'Building relationships with prospects through relevant communication over time. Nurturing keeps your solution top-of-mind until they are ready to buy.',
    difficulty: 'beginner',
    relatedTerms: ['lead-generation', 'mql-marketing-qualified-lead', 'lead-scoring'],
    crossLinks: ['demand-generation', 'marketing-ops', 'workflow-automation'],
    isPriority: false,
    keyPoints: [
      'Long-term engagement strategy',
      'Uses email sequences, content, and events',
      'Personalization improves effectiveness',
      'Can re-activate cold leads'
    ],
    example: 'A 6-email nurture sequence over 3 months: welcome → industry insights → case study → product comparison → ROI calculator → sales conversation offer.'
  },
  {
    id: 27,
    slug: 'outbound-sales',
    term: 'Outbound Sales',
    category: 'sales',
    meaning: 'Proactively reaching potential customers through email, calls, LinkedIn, and other direct channels. Outbound requires sellers to initiate contact rather than waiting for inbound interest.',
    difficulty: 'beginner',
    relatedTerms: ['inbound-sales', 'pipeline-generation', 'lead-generation'],
    crossLinks: ['abm-account-based-marketing', 'signal-based-selling', 'intent-data'],
    isPriority: false,
    keyPoints: [
      'Seller initiates the relationship',
      'Requires research and personalization',
      'Multi-channel approach works best',
      'Higher cost but more control over targeting'
    ],
    example: 'An SDR identifies target accounts, researches contacts on LinkedIn, sends personalized emails referencing recent news, and follows up with calls.'
  },
  {
    id: 28,
    slug: 'inbound-sales',
    term: 'Inbound Sales',
    category: 'sales',
    meaning: 'Converting prospects who initiate interest in your product. Inbound leads come from marketing efforts like content, SEO, and ads.',
    difficulty: 'beginner',
    relatedTerms: ['outbound-sales', 'lead-generation', 'mql-marketing-qualified-lead'],
    crossLinks: ['demand-capture', 'organic-acquisition', 'landing-page-optimization'],
    isPriority: false,
    keyPoints: [
      'Prospect initiates the relationship',
      'Usually higher intent than outbound',
      'Requires strong content and SEO',
      'Lower cost per lead typically'
    ],
    example: 'A prospect finds your blog via Google, downloads an eBook, attends a webinar, then requests a demo - this entire journey is inbound.'
  },
  {
    id: 29,
    slug: 'sales-enablement',
    term: 'Sales Enablement',
    category: 'sales',
    meaning: 'Providing sales teams with the content, tools, training, and resources needed to close deals. Enablement bridges the gap between marketing strategy and sales execution.',
    difficulty: 'intermediate',
    relatedTerms: ['competitive-intelligence', 'messaging-framework', 'win-rate'],
    crossLinks: ['sales-ops', 'product-marketing', 'gtm-stack'],
    isPriority: false,
    keyPoints: [
      'Includes content, training, and technology',
      'Owned by dedicated team or product marketing',
      'Measures impact on win rates and ramp time',
      'Requires ongoing updates and feedback loops'
    ],
    example: 'Sales enablement delivers: onboarding program, product demos, competitive battlecards, objection handling guides, case studies, and ROI calculators.'
  },
  {
    id: 30,
    slug: 'deal-velocity',
    term: 'Deal Velocity',
    category: 'sales',
    meaning: 'How quickly opportunities move through the sales pipeline. Higher velocity means faster time to revenue.',
    difficulty: 'intermediate',
    relatedTerms: ['sales-cycle', 'pipeline', 'win-rate'],
    crossLinks: ['sales-forecasting', 'revops'],
    isPriority: false,
    keyPoints: [
      'Velocity = (Opportunities × Win Rate × Deal Size) / Sales Cycle Length',
      'Improving any factor improves velocity',
      'Varies significantly by segment',
      'Key metric for revenue predictability'
    ],
    example: 'A company has 100 opportunities, 25% win rate, $50K average deal, 90-day cycle. Velocity = (100 × 0.25 × $50K) / 90 = $13,889/day.'
  },
  {
    id: 31,
    slug: 'sales-cycle',
    term: 'Sales Cycle',
    category: 'sales',
    meaning: 'The time between initial prospect engagement and closing a deal. Understanding your sales cycle helps with forecasting and resource planning.',
    difficulty: 'beginner',
    relatedTerms: ['deal-velocity', 'pipeline', 'sales-forecasting'],
    crossLinks: ['buying-committee', 'multi-threading'],
    isPriority: false,
    keyPoints: [
      'Longer for enterprise, shorter for SMB',
      'Includes all stages from first touch to close',
      'Can be shortened with better qualification',
      'Track by segment for accuracy'
    ],
    example: 'SMB deals close in 30 days, Mid-market in 60 days, Enterprise in 180 days - three different sales cycles for one product.'
  },
  {
    id: 32,
    slug: 'win-rate',
    term: 'Win Rate',
    category: 'sales',
    meaning: 'The percentage of sales opportunities successfully converted into customers. Win rate is a key indicator of sales effectiveness and product-market fit.',
    difficulty: 'beginner',
    relatedTerms: ['pipeline-coverage', 'deal-velocity', 'sales-cycle'],
    crossLinks: ['competitive-intelligence', 'sales-enablement'],
    isPriority: false,
    keyPoints: [
      'Calculate from opportunities, not leads',
      'Benchmark varies by industry and deal size',
      'Track by rep, segment, and competitor',
      'Low win rate may signal qualification issues'
    ],
    example: 'Of 100 sales opportunities, 30 closed as customers. Win rate = 30%. Track separately vs different competitors to identify patterns.'
  },
  {
    id: 33,
    slug: 'deal-size',
    term: 'Deal Size',
    category: 'sales',
    meaning: 'The monetary value of an individual sales opportunity or contract. Also called Average Contract Value (ACV) when averaged across all deals.',
    difficulty: 'beginner',
    relatedTerms: ['deal-velocity', 'pipeline', 'win-rate'],
    crossLinks: ['upselling', 'expansion-revenue', 'ltv-lifetime-value'],
    isPriority: false,
    keyPoints: [
      'Impacts GTM motion choice',
      'Larger deals = longer cycles, more stakeholders',
      'Track ACV trends over time',
      'Can be increased through packaging and upsells'
    ],
    example: 'A SaaS company has $5K average deal for SMB, $50K for Mid-market, and $500K for Enterprise segments.'
  },
  {
    id: 34,
    slug: 'multi-threading',
    term: 'Multi-threading',
    category: 'sales',
    meaning: 'Building relationships with multiple stakeholders within the same target account. Multi-threading reduces risk of deal loss if one contact leaves or becomes unresponsive.',
    difficulty: 'intermediate',
    relatedTerms: ['buying-committee', 'champion', 'economic-buyer'],
    crossLinks: ['abm-account-based-marketing', 'sales-cycle'],
    isPriority: false,
    keyPoints: [
      'Essential for enterprise deals',
      'Map the buying committee early',
      'Different value props for different roles',
      'Reduces single-point-of-failure risk'
    ],
    example: 'Instead of only talking to the IT Director, the rep also engages the CFO (budget), CISO (security), and end-users (adoption) - four threads in one deal.'
  },
  {
    id: 35,
    slug: 'sales-qualified-opportunity',
    term: 'Sales Qualified Opportunity',
    abbreviation: 'SQO',
    category: 'sales',
    meaning: 'A sales opportunity that meets defined qualification requirements. SQO represents opportunities that have passed discovery and have clear potential to close.',
    difficulty: 'intermediate',
    relatedTerms: ['sql-sales-qualified-lead', 'pipeline', 'win-rate'],
    crossLinks: ['sales-forecasting', 'deal-velocity'],
    isPriority: false,
    keyPoints: [
      'Higher quality than general pipeline',
      'Meets MEDDIC or similar criteria',
      'Typically has champion and timeline',
      'Used for more accurate forecasting'
    ],
    example: 'An SQO has: identified pain, confirmed budget, named champion, mapped decision process, and committed timeline - not just "interested in learning more."'
  },

  // ============================================
  // CATEGORY 3: Revenue Operations & GTM Operations (15 terms)
  // ============================================
  {
    id: 36,
    slug: 'revops-revenue-operations',
    term: 'Revenue Operations',
    abbreviation: 'RevOps',
    category: 'revenue-ops',
    meaning: 'Aligning sales, marketing, and customer success operations to drive revenue growth. RevOps creates a unified approach to process, technology, and data across revenue teams.',
    difficulty: 'intermediate',
    relatedTerms: ['sales-ops', 'marketing-ops', 'customer-success-ops'],
    crossLinks: ['gtm-stack', 'sales-forecasting', 'attribution'],
    isPriority: true,
    keyPoints: [
      'Breaks down silos between go-to-market teams',
      'Single source of truth for data and metrics',
      'Owns technology stack and processes',
      'Emerged from combining sales/marketing ops'
    ],
    example: 'A RevOps team manages the CRM, defines the lead-to-revenue process, creates dashboards used by all teams, and ensures data quality across systems.'
  },
  {
    id: 37,
    slug: 'sales-ops',
    term: 'Sales Operations',
    abbreviation: 'Sales Ops',
    category: 'revenue-ops',
    meaning: 'Managing sales processes, technology, reporting, and operational efficiency. Sales ops ensures sales reps can focus on selling rather than administrative tasks.',
    difficulty: 'intermediate',
    relatedTerms: ['revops-revenue-operations', 'crm-customer-relationship-management', 'territory-planning'],
    crossLinks: ['sales-forecasting', 'sales-enablement', 'pipeline-coverage'],
    isPriority: false,
    keyPoints: [
      'Supports sales team efficiency',
      'Manages CRM and sales tools',
      'Creates reports and dashboards',
      'Handles compensation and territory design'
    ],
    example: 'Sales ops tasks: maintain CRM hygiene, build pipeline reports, design territories, calculate commissions, and onboard new reps to tools.'
  },
  {
    id: 38,
    slug: 'marketing-ops',
    term: 'Marketing Operations',
    abbreviation: 'Marketing Ops',
    category: 'revenue-ops',
    meaning: 'Managing marketing technology, automation, workflows, and campaign operations. Marketing ops enables marketing teams to execute efficiently and measure impact.',
    difficulty: 'intermediate',
    relatedTerms: ['revops-revenue-operations', 'lead-scoring', 'workflow-automation'],
    crossLinks: ['attribution', 'lead-routing', 'demand-generation'],
    isPriority: false,
    keyPoints: [
      'Owns marketing technology stack',
      'Manages automation and lead flow',
      'Creates attribution and performance reporting',
      'Ensures data quality and compliance'
    ],
    example: 'Marketing ops manages: HubSpot workflows, lead scoring models, form integrations, email deliverability, attribution reporting, and GDPR compliance.'
  },
  {
    id: 39,
    slug: 'customer-success-ops',
    term: 'Customer Success Operations',
    abbreviation: 'CS Ops',
    category: 'revenue-ops',
    meaning: 'Optimizing customer success processes, systems, and performance. CS ops enables customer success teams to scale while maintaining quality outcomes.',
    difficulty: 'intermediate',
    relatedTerms: ['revops-revenue-operations', 'customer-health-score', 'customer-onboarding'],
    crossLinks: ['nrr-net-revenue-retention', 'churn-rate', 'expansion-revenue'],
    isPriority: false,
    keyPoints: [
      'Manages CS platform and health scores',
      'Designs playbooks and workflows',
      'Tracks retention and expansion metrics',
      'Optimizes capacity and coverage models'
    ],
    example: 'CS ops creates: health scoring models, renewal playbooks, expansion triggers, QBR templates, and CSM capacity planning.'
  },
  {
    id: 40,
    slug: 'gtm-engineering',
    term: 'GTM Engineering',
    category: 'revenue-ops',
    meaning: 'Building and automating technical workflows that support go-to-market execution. GTM engineering combines software engineering with revenue operations needs.',
    difficulty: 'advanced',
    relatedTerms: ['workflow-automation', 'gtm-stack', 'revops-revenue-operations'],
    crossLinks: ['signal-based-selling', 'data-enrichment', 'ai-sdr'],
    isPriority: true,
    keyPoints: [
      'Technical skills applied to GTM problems',
      'Builds custom integrations and automations',
      'Enables scale without adding headcount',
      'Emerging specialized role'
    ],
    example: 'A GTM engineer builds: automated lead enrichment pipeline, custom Slack alerts for buying signals, and API integrations between tools in the stack.'
  },
  {
    id: 41,
    slug: 'gtm-stack',
    term: 'GTM Stack',
    category: 'revenue-ops',
    meaning: 'The collection of tools used by sales, marketing, and revenue teams. A well-designed GTM stack enables efficient processes and reliable data.',
    difficulty: 'beginner',
    relatedTerms: ['crm-customer-relationship-management', 'revops-revenue-operations', 'workflow-automation'],
    crossLinks: ['sales-enablement', 'marketing-ops'],
    isPriority: false,
    keyPoints: [
      'Includes CRM, marketing automation, sales tools',
      'Integration between tools is critical',
      'Too many tools creates complexity',
      'Regular audits prevent tool sprawl'
    ],
    example: 'Typical GTM stack: Salesforce (CRM), HubSpot (marketing), Outreach (sales engagement), Gong (conversation intelligence), ZoomInfo (data).'
  },
  {
    id: 42,
    slug: 'crm-customer-relationship-management',
    term: 'Customer Relationship Management',
    abbreviation: 'CRM',
    category: 'revenue-ops',
    meaning: 'Software used to manage customer relationships, contacts, and sales pipelines. CRM is the system of record for all customer interactions.',
    difficulty: 'beginner',
    relatedTerms: ['gtm-stack', 'pipeline', 'data-hygiene'],
    crossLinks: ['sales-ops', 'lead-routing', 'sales-forecasting'],
    isPriority: false,
    keyPoints: [
      'Central repository for customer data',
      'Tracks all sales activities and communications',
      'Enables forecasting and reporting',
      'Data quality is crucial for effectiveness'
    ],
    example: 'Salesforce stores: all contacts and accounts, opportunity pipeline, activity history, email threads, and forecasts for the entire sales organization.'
  },
  {
    id: 43,
    slug: 'data-enrichment',
    term: 'Data Enrichment',
    category: 'revenue-ops',
    meaning: 'Adding missing information to prospect or customer records. Enrichment improves targeting and personalization by filling in company and contact details.',
    difficulty: 'intermediate',
    relatedTerms: ['data-hygiene', 'lead-scoring', 'crm-customer-relationship-management'],
    crossLinks: ['icp-ideal-customer-profile', 'abm-account-based-marketing', 'personalization-at-scale'],
    isPriority: false,
    keyPoints: [
      'Sources: ZoomInfo, Clearbit, Apollo',
      'Adds firmographics and contact info',
      'Enables better segmentation and routing',
      'Should be automated for efficiency'
    ],
    example: 'A form capture email is automatically enriched with: full name, title, company, industry, employee count, technologies used, and revenue range.'
  },
  {
    id: 44,
    slug: 'lead-routing',
    term: 'Lead Routing',
    category: 'revenue-ops',
    meaning: 'Automatically assigning incoming leads to the appropriate sales representatives. Good routing ensures fast response times and proper matching.',
    difficulty: 'intermediate',
    relatedTerms: ['territory-planning', 'sal-sales-accepted-lead', 'lead-scoring'],
    crossLinks: ['revops-revenue-operations', 'workflow-automation'],
    isPriority: false,
    keyPoints: [
      'Based on territory, segment, or round-robin',
      'Speed to lead impacts conversion',
      'Needs rules for conflicts and exceptions',
      'Should integrate with CRM'
    ],
    example: 'Lead routing rules: Enterprise (>1000 employees) → Enterprise AE by region; Mid-market → SDR for qualification; Existing customer → Account Manager.'
  },
  {
    id: 45,
    slug: 'territory-planning',
    term: 'Territory Planning',
    category: 'revenue-ops',
    meaning: 'Dividing markets or accounts among sales representatives. Good territory design balances opportunity fairly and maximizes coverage.',
    difficulty: 'intermediate',
    relatedTerms: ['lead-routing', 'sales-ops', 'market-segmentation'],
    crossLinks: ['abm-account-based-marketing', 'pipeline-coverage'],
    isPriority: false,
    keyPoints: [
      'Can be geographic, industry, or account-based',
      'Balance workload and opportunity',
      'Align with GTM motion and ICP',
      'Review and adjust annually'
    ],
    example: 'Territory design: Named accounts (top 500 companies) assigned 1:1, Mid-market by region, SMB by state, with some overlap for strategic accounts.'
  },
  {
    id: 46,
    slug: 'workflow-automation',
    term: 'Workflow Automation',
    category: 'revenue-ops',
    meaning: 'Automating repetitive tasks across GTM processes. Automation increases efficiency, reduces errors, and ensures consistent execution.',
    difficulty: 'intermediate',
    relatedTerms: ['gtm-engineering', 'marketing-ops', 'gtm-stack'],
    crossLinks: ['lead-nurturing', 'lead-routing', 'ai-agents'],
    isPriority: false,
    keyPoints: [
      'Examples: lead assignment, follow-up reminders',
      'Tools: Zapier, Workato, native platform automation',
      'Balance automation with personalization',
      'Document and maintain workflows'
    ],
    example: 'Automated workflow: When lead scores >100, assign to SDR, create task to call within 1 hour, send Slack notification, add to outbound sequence.'
  },
  {
    id: 47,
    slug: 'sales-forecasting',
    term: 'Sales Forecasting',
    category: 'revenue-ops',
    meaning: 'Predicting future revenue based on pipeline, historical data, and sales performance. Accurate forecasting enables business planning and resource allocation.',
    difficulty: 'intermediate',
    relatedTerms: ['pipeline-coverage', 'win-rate', 'deal-velocity'],
    crossLinks: ['revops-revenue-operations', 'revenue-intelligence'],
    isPriority: false,
    keyPoints: [
      'Uses pipeline, win rates, and historical patterns',
      'Categories: commit, best case, pipeline',
      'Accuracy improves with data and discipline',
      'AI tools increasingly used for prediction'
    ],
    example: 'Forecast roll-up: $2M in Commit (90%+ confidence), $1M Best Case (60-90%), $3M Pipeline (< 60%), weighted forecast = $4.8M.'
  },
  {
    id: 48,
    slug: 'attribution',
    term: 'Attribution',
    category: 'revenue-ops',
    meaning: 'Identifying which marketing or sales activities contributed to conversions and revenue. Attribution helps optimize spend and understand what works.',
    difficulty: 'advanced',
    relatedTerms: ['funnel-analytics', 'marketing-ops', 'revops-revenue-operations'],
    crossLinks: ['cac-customer-acquisition-cost', 'roas-return-on-ad-spend', 'revenue-attribution'],
    isPriority: false,
    keyPoints: [
      'Models: first-touch, last-touch, multi-touch',
      'No perfect model - each has tradeoffs',
      'Dark funnel makes attribution harder',
      'Focus on directionally useful insights'
    ],
    example: 'Multi-touch attribution: Blog post (20%), webinar (30%), case study (20%), demo request (30%) - credits distributed across touchpoints.'
  },
  {
    id: 49,
    slug: 'funnel-analytics',
    term: 'Funnel Analytics',
    category: 'revenue-ops',
    meaning: 'Analyzing how prospects move through different stages of the conversion funnel. Funnel analytics identifies bottlenecks and optimization opportunities.',
    difficulty: 'intermediate',
    relatedTerms: ['attribution', 'pipeline', 'conversion-rate-optimization'],
    crossLinks: ['lead-qualification', 'mql-marketing-qualified-lead', 'win-rate'],
    isPriority: false,
    keyPoints: [
      'Track conversion at each stage',
      'Identify where prospects drop off',
      'Compare cohorts and segments',
      'Ties to revenue, not just activity'
    ],
    example: 'Funnel analysis: 10,000 visitors → 1,000 leads (10%) → 200 MQLs (20%) → 100 SQLs (50%) → 30 customers (30%). Biggest drop: MQL to SQL conversion.'
  },
  {
    id: 50,
    slug: 'data-hygiene',
    term: 'Data Hygiene',
    category: 'revenue-ops',
    meaning: 'Maintaining accurate, complete, and consistent CRM and customer data. Clean data enables reliable reporting, automation, and decision-making.',
    difficulty: 'beginner',
    relatedTerms: ['crm-customer-relationship-management', 'data-enrichment', 'revops-revenue-operations'],
    crossLinks: ['lead-scoring', 'sales-forecasting'],
    isPriority: false,
    keyPoints: [
      'Includes deduplication and standardization',
      'Requires ongoing processes, not one-time cleanup',
      'Bad data leads to bad decisions',
      'Automate validation where possible'
    ],
    example: 'Data hygiene practices: standardize company names, merge duplicate records, validate email addresses, fill missing fields with enrichment, archive stale records.'
  },

  // ============================================
  // CATEGORY 4: Growth, Marketing & Demand Generation (20 terms)
  // ============================================
  {
    id: 51,
    slug: 'demand-generation',
    term: 'Demand Generation',
    abbreviation: 'Demand Gen',
    category: 'growth',
    meaning: 'Creating awareness and demand for a company\'s products or services. Demand generation focuses on building pipeline, not just capturing existing intent.',
    difficulty: 'beginner',
    relatedTerms: ['demand-capture', 'lead-generation', 'abm-account-based-marketing'],
    crossLinks: ['pipeline-generation', 'content-marketing', 'mql-marketing-qualified-lead'],
    isPriority: true,
    keyPoints: [
      'Creates demand, not just captures it',
      'Long-term brand and pipeline building',
      'Includes content, events, and advertising',
      'Measured by influenced pipeline'
    ],
    example: 'Demand generation activities: educational webinar series, thought leadership content, industry report sponsorship - all creating awareness before buyers are actively shopping.'
  },
  {
    id: 52,
    slug: 'demand-capture',
    term: 'Demand Capture',
    category: 'growth',
    meaning: 'Converting existing market demand into leads, opportunities, and customers. Demand capture targets buyers who are already looking for solutions.',
    difficulty: 'intermediate',
    relatedTerms: ['demand-generation', 'inbound-sales', 'landing-page-optimization'],
    crossLinks: ['organic-acquisition', 'performance-marketing', 'conversion-rate-optimization'],
    isPriority: false,
    keyPoints: [
      'Captures intent that already exists',
      'Includes paid search, SEO, review sites',
      'Faster ROI than demand generation',
      'Limited by total market demand'
    ],
    example: 'Demand capture: bidding on "best CRM software" in Google Ads, optimizing for "CRM comparison" SEO terms, maintaining G2 and Capterra profiles.'
  },
  {
    id: 53,
    slug: 'abm-account-based-marketing',
    term: 'Account-Based Marketing',
    abbreviation: 'ABM',
    category: 'growth',
    meaning: 'Targeting specific high-value accounts with personalized marketing campaigns. ABM treats individual accounts as markets of one.',
    difficulty: 'intermediate',
    relatedTerms: ['demand-generation', 'icp-ideal-customer-profile', 'multi-threading'],
    crossLinks: ['personalization-at-scale', 'buying-committee', 'intent-data'],
    isPriority: true,
    keyPoints: [
      'Inverts the traditional funnel',
      'Tight alignment between sales and marketing',
      'Requires account selection criteria',
      'Higher cost but higher deal sizes'
    ],
    example: 'ABM campaign: identify 50 target accounts, create custom landing pages per account, run LinkedIn ads to their employees, coordinate with sales on outreach timing.'
  },
  {
    id: 54,
    slug: 'plg-product-led-growth',
    term: 'Product-Led Growth',
    abbreviation: 'PLG',
    category: 'growth',
    meaning: 'A growth strategy where the product itself drives acquisition, activation, and expansion. Users experience value through the product before engaging with sales.',
    difficulty: 'intermediate',
    relatedTerms: ['slg-sales-led-growth', 'pql-product-qualified-lead', 'plg-motion'],
    crossLinks: ['activation', 'time-to-value', 'product-adoption'],
    isPriority: false,
    keyPoints: [
      'Product is the primary growth driver',
      'Often includes free tier or trial',
      'Requires excellent UX and time-to-value',
      'Sales engages when product signals readiness'
    ],
    example: 'Slack, Dropbox, and Figma use PLG: free access lets users experience value, team adoption drives viral growth, sales engages for enterprise deals.'
  },
  {
    id: 55,
    slug: 'slg-sales-led-growth',
    term: 'Sales-Led Growth',
    abbreviation: 'SLG',
    category: 'growth',
    meaning: 'A growth strategy where sales teams drive customer acquisition and conversion. Traditional B2B approach with SDRs, AEs, and structured sales process.',
    difficulty: 'beginner',
    relatedTerms: ['plg-product-led-growth', 'outbound-sales', 'pipeline-generation'],
    crossLinks: ['sql-sales-qualified-lead', 'sales-cycle', 'enterprise-sales'],
    isPriority: false,
    keyPoints: [
      'Sales team drives conversions',
      'Higher touch, higher deal sizes',
      'Requires more investment in sales org',
      'Better for complex, consultative sales'
    ],
    example: 'Enterprise software companies like Salesforce are sales-led: prospects request demos, work with sales through discovery and evaluation, then sign contracts.'
  },
  {
    id: 56,
    slug: 'clg-community-led-growth',
    term: 'Community-Led Growth',
    abbreviation: 'CLG',
    category: 'growth',
    meaning: 'Using communities to drive awareness, engagement, acquisition, and retention. Community members become advocates who attract and support other users.',
    difficulty: 'intermediate',
    relatedTerms: ['plg-product-led-growth', 'organic-acquisition', 'growth-loops'],
    crossLinks: ['voice-of-customer', 'customer-retention'],
    isPriority: false,
    keyPoints: [
      'Community as acquisition channel',
      'Peer support reduces support costs',
      'Builds loyalty and switching costs',
      'Takes time to build authentic community'
    ],
    example: 'Notion, Figma, and dbt have strong communities where users share templates, answer questions, and advocate for the product, driving organic growth.'
  },
  {
    id: 57,
    slug: 'growth-loops',
    term: 'Growth Loops',
    category: 'growth',
    meaning: 'Self-reinforcing systems where one user or customer generates more growth. Unlike funnels, loops compound over time as outputs become inputs.',
    difficulty: 'advanced',
    relatedTerms: ['plg-product-led-growth', 'viral-growth', 'product-adoption'],
    crossLinks: ['organic-acquisition', 'clg-community-led-growth'],
    isPriority: false,
    keyPoints: [
      'Compound effect: outputs feed inputs',
      'Types: viral, content, sales-assisted',
      'More sustainable than paid acquisition',
      'Require product changes to create'
    ],
    example: 'Calendly growth loop: User sends scheduling link → Recipient books meeting → Recipient sees how easy it is → Recipient signs up → Sends their own links.'
  },
  {
    id: 58,
    slug: 'conversion-rate-optimization',
    term: 'Conversion Rate Optimization',
    abbreviation: 'CRO',
    category: 'growth',
    meaning: 'Improving the percentage of visitors or prospects who complete a desired action. CRO uses data and testing to optimize the user journey.',
    difficulty: 'intermediate',
    relatedTerms: ['landing-page-optimization', 'funnel-analytics', 'demand-capture'],
    crossLinks: ['activation', 'product-adoption'],
    isPriority: false,
    keyPoints: [
      'Test one variable at a time',
      'Statistical significance matters',
      'Small improvements compound over time',
      'Focus on high-impact pages first'
    ],
    example: 'CRO test: A/B test two demo request forms - shorter form (3 fields) vs detailed form (7 fields). Measure conversion rate and lead quality for each.'
  },
  {
    id: 59,
    slug: 'landing-page-optimization',
    term: 'Landing Page Optimization',
    category: 'growth',
    meaning: 'Improving landing pages to increase conversions. Optimization covers messaging, design, social proof, forms, and CTAs.',
    difficulty: 'intermediate',
    relatedTerms: ['conversion-rate-optimization', 'demand-capture', 'performance-marketing'],
    crossLinks: ['value-proposition', 'messaging-framework'],
    isPriority: false,
    keyPoints: [
      'Clear headline and value prop',
      'Minimal distractions from main CTA',
      'Social proof builds credibility',
      'Mobile optimization essential'
    ],
    example: 'Landing page test: Add customer logos and testimonials above the fold, simplify form from 5 to 3 fields, change CTA from "Submit" to "Get Your Demo".'
  },
  {
    id: 60,
    slug: 'performance-marketing',
    term: 'Performance Marketing',
    category: 'growth',
    meaning: 'Marketing campaigns focused on measurable outcomes such as leads, conversions, or revenue. Performance marketing ties spend directly to results.',
    difficulty: 'intermediate',
    relatedTerms: ['demand-capture', 'roas-return-on-ad-spend', 'cac-customer-acquisition-cost'],
    crossLinks: ['demand-generation', 'organic-acquisition'],
    isPriority: false,
    keyPoints: [
      'Paid channels with clear attribution',
      'Includes paid search, social ads, display',
      'Optimized for specific conversion events',
      'Requires tracking and measurement infrastructure'
    ],
    example: 'Performance marketing: $100K/month on Google Ads and LinkedIn, targeting keywords and audiences, optimizing to cost per demo booked and cost per opportunity.'
  },
  {
    id: 61,
    slug: 'cac-customer-acquisition-cost',
    term: 'Customer Acquisition Cost',
    abbreviation: 'CAC',
    category: 'growth',
    meaning: 'The average cost of acquiring a new customer. CAC includes all sales and marketing costs divided by new customers acquired.',
    difficulty: 'beginner',
    relatedTerms: ['ltv-lifetime-value', 'cac-payback-period', 'roas-return-on-ad-spend'],
    crossLinks: ['pipeline-generation', 'demand-generation'],
    isPriority: true,
    keyPoints: [
      'CAC = Total S&M Spend / New Customers',
      'Track blended and by channel',
      'Should be recovered within reasonable time',
      'Compare to LTV for unit economics'
    ],
    example: 'Monthly spend: $500K marketing + $300K sales = $800K. New customers: 100. CAC = $8,000 per customer.'
  },
  {
    id: 62,
    slug: 'ltv-lifetime-value',
    term: 'Lifetime Value',
    abbreviation: 'LTV',
    category: 'growth',
    meaning: 'The total expected revenue or gross profit generated by a customer over their lifetime. LTV helps determine how much you can spend to acquire customers.',
    difficulty: 'intermediate',
    relatedTerms: ['cac-customer-acquisition-cost', 'cac-payback-period', 'customer-retention'],
    crossLinks: ['nrr-net-revenue-retention', 'expansion-revenue'],
    isPriority: false,
    keyPoints: [
      'LTV = ARPU × Gross Margin × Customer Lifetime',
      'LTV:CAC ratio should be 3:1 or better',
      'Increases with retention and expansion',
      'Use cohort analysis for accuracy'
    ],
    example: '$1,000/month ARPU × 80% margin × 36 months average lifetime = $28,800 LTV. With $8,000 CAC, LTV:CAC ratio is 3.6:1.'
  },
  {
    id: 63,
    slug: 'cac-payback-period',
    term: 'CAC Payback Period',
    category: 'growth',
    meaning: 'The time required to recover customer acquisition costs. Shorter payback means faster reinvestment in growth.',
    difficulty: 'intermediate',
    relatedTerms: ['cac-customer-acquisition-cost', 'ltv-lifetime-value', 'gross-margin'],
    crossLinks: ['nrr-net-revenue-retention', 'churn-rate'],
    isPriority: true,
    keyPoints: [
      'Payback = CAC / (Monthly Revenue × Gross Margin)',
      'Good SaaS benchmark: 12-18 months',
      'Shorter is better for cash efficiency',
      'Impacts funding requirements'
    ],
    example: '$8,000 CAC, $1,000/month revenue, 80% margin = $8,000 / $800 = 10 month payback.'
  },
  {
    id: 64,
    slug: 'roas-return-on-ad-spend',
    term: 'Return on Ad Spend',
    abbreviation: 'ROAS',
    category: 'growth',
    meaning: 'Revenue generated for every unit of money spent on advertising. ROAS measures the effectiveness of paid marketing campaigns.',
    difficulty: 'beginner',
    relatedTerms: ['performance-marketing', 'cac-customer-acquisition-cost', 'attribution'],
    crossLinks: ['demand-capture', 'pipeline-generation'],
    isPriority: false,
    keyPoints: [
      'ROAS = Revenue from Ads / Ad Spend',
      'Different from ROI (doesn\'t include costs)',
      'Benchmark varies by industry',
      'Track at campaign and channel level'
    ],
    example: '$50K ad spend generates $200K in revenue. ROAS = 4:1 or 400%. For every $1 spent, $4 in revenue returned.'
  },
  {
    id: 65,
    slug: 'organic-acquisition',
    term: 'Organic Acquisition',
    category: 'growth',
    meaning: 'Acquiring customers through unpaid channels such as SEO, social media, and referrals. Organic growth is more sustainable but takes longer to build.',
    difficulty: 'beginner',
    relatedTerms: ['demand-generation', 'growth-loops', 'clg-community-led-growth'],
    crossLinks: ['demand-capture', 'plg-product-led-growth'],
    isPriority: false,
    keyPoints: [
      'Lower CAC than paid channels',
      'Takes time to build momentum',
      'Includes SEO, word-of-mouth, virality',
      'Compounds over time'
    ],
    example: 'Organic channels: SEO blog content (40%), product virality (30%), word-of-mouth referrals (20%), social media (10%).'
  },
  {
    id: 66,
    slug: 'product-marketing',
    term: 'Product Marketing',
    abbreviation: 'PMM',
    category: 'growth',
    meaning: 'Connecting product capabilities with customer needs through positioning, messaging, and GTM execution. Product marketing bridges product and revenue teams.',
    difficulty: 'intermediate',
    relatedTerms: ['positioning', 'messaging-framework', 'sales-enablement'],
    crossLinks: ['value-proposition', 'competitive-intelligence', 'go-to-market-gtm'],
    isPriority: false,
    keyPoints: [
      'Owns positioning and messaging',
      'Drives launches and GTM strategy',
      'Creates sales enablement content',
      'Bridges product, marketing, and sales'
    ],
    example: 'Product marketing responsibilities: competitive analysis, launch plans, pricing input, sales decks, demo scripts, case studies, analyst relations.'
  },
  {
    id: 67,
    slug: 'product-adoption',
    term: 'Product Adoption',
    category: 'growth',
    meaning: 'The extent to which customers start using and integrating a product into their workflows. High adoption correlates with retention and expansion.',
    difficulty: 'beginner',
    relatedTerms: ['activation', 'time-to-value', 'customer-onboarding'],
    crossLinks: ['pql-product-qualified-lead', 'customer-health-score', 'churn-rate'],
    isPriority: false,
    keyPoints: [
      'Measured by feature usage and depth',
      'Key driver of retention',
      'Requires good onboarding',
      'Track adoption milestones'
    ],
    example: 'Adoption metrics: daily active users, features used per user, integrations connected, team members invited, time spent in product.'
  },
  {
    id: 68,
    slug: 'activation',
    term: 'Activation',
    category: 'growth',
    meaning: 'The point at which a new user experiences the product\'s core value. Activation is the "aha moment" that converts a signup into an engaged user.',
    difficulty: 'intermediate',
    relatedTerms: ['time-to-value', 'product-adoption', 'customer-onboarding'],
    crossLinks: ['pql-product-qualified-lead', 'plg-product-led-growth'],
    isPriority: false,
    keyPoints: [
      'Specific action that correlates with retention',
      'Should happen quickly after signup',
      'Different products have different activation events',
      'Key metric for PLG companies'
    ],
    example: 'Slack activation: when a team sends 2,000+ messages. Dropbox activation: when a user uploads their first file. These events predict long-term engagement.'
  },
  {
    id: 69,
    slug: 'time-to-value',
    term: 'Time to Value',
    abbreviation: 'TTV',
    category: 'growth',
    meaning: 'The time it takes for a customer to experience meaningful value from a product. Shorter TTV improves conversion, activation, and retention.',
    difficulty: 'intermediate',
    relatedTerms: ['activation', 'product-adoption', 'customer-onboarding'],
    crossLinks: ['plg-product-led-growth', 'customer-health-score'],
    isPriority: false,
    keyPoints: [
      'Critical for PLG and trial conversions',
      'Reduced through onboarding optimization',
      'Different users may have different TTV',
      'Measure from signup to value milestone'
    ],
    example: 'A project management tool measures TTV as time from signup to creating first project with team members. Goal: under 10 minutes.'
  },
  {
    id: 70,
    slug: 'plg-motion',
    term: 'PLG Motion',
    category: 'growth',
    meaning: 'A GTM approach where free trials, freemium offerings, and product usage drive conversion. PLG motion enables bottom-up adoption and product-driven sales.',
    difficulty: 'intermediate',
    relatedTerms: ['plg-product-led-growth', 'pql-product-qualified-lead', 'activation'],
    crossLinks: ['gtm-motion', 'time-to-value', 'product-adoption'],
    isPriority: false,
    keyPoints: [
      'Product drives initial engagement',
      'Sales assists high-potential accounts',
      'Requires product-focused metrics',
      'Often combined with sales-assist motion'
    ],
    example: 'Figma PLG motion: free for individuals → team adoption → sales engages when organization hits 10+ users with usage patterns suggesting enterprise readiness.'
  },

  // ============================================
  // CATEGORY 5: Customer Success & Retention (10 terms)
  // ============================================
  {
    id: 71,
    slug: 'customer-onboarding',
    term: 'Customer Onboarding',
    category: 'customer-success',
    meaning: 'Helping new customers get started and achieve their first meaningful outcome. Good onboarding accelerates time-to-value and improves retention.',
    difficulty: 'beginner',
    relatedTerms: ['time-to-value', 'activation', 'customer-health-score'],
    crossLinks: ['product-adoption', 'customer-retention'],
    isPriority: false,
    keyPoints: [
      'First impression sets the tone',
      'Define clear success milestones',
      'Mix of self-serve and high-touch',
      'Measure onboarding completion rates'
    ],
    example: 'Structured onboarding: Welcome call → Account setup → First integration → Training session → Success review at 30 days.'
  },
  {
    id: 72,
    slug: 'customer-retention',
    term: 'Customer Retention',
    category: 'customer-success',
    meaning: 'The ability to keep existing customers over time. Retention is the foundation of sustainable growth and is typically more cost-effective than acquisition.',
    difficulty: 'beginner',
    relatedTerms: ['churn-rate', 'nrr-net-revenue-retention', 'customer-health-score'],
    crossLinks: ['ltv-lifetime-value', 'expansion-revenue'],
    isPriority: false,
    keyPoints: [
      'Cheaper than acquisition',
      'Enables expansion revenue',
      'Requires ongoing value delivery',
      'Measure by cohort for accuracy'
    ],
    example: '90% annual retention means of 100 customers, 90 remain after one year. Small retention improvements compound significantly over time.'
  },
  {
    id: 73,
    slug: 'churn-rate',
    term: 'Churn Rate',
    category: 'customer-success',
    meaning: 'The percentage of customers or revenue lost during a given period. Churn is the opposite of retention and must be minimized for sustainable growth.',
    difficulty: 'beginner',
    relatedTerms: ['customer-retention', 'nrr-net-revenue-retention', 'grr-gross-revenue-retention'],
    crossLinks: ['customer-health-score', 'ltv-lifetime-value'],
    isPriority: false,
    keyPoints: [
      'Can be measured as logo or revenue churn',
      'Monthly vs annual rates differ',
      'Analyze by cohort and segment',
      'Identify leading indicators to predict'
    ],
    example: 'Monthly revenue churn: $100K MRR lost / $2M total MRR = 5% monthly churn = 46% annual churn (compounded).'
  },
  {
    id: 74,
    slug: 'nrr-net-revenue-retention',
    term: 'Net Revenue Retention',
    abbreviation: 'NRR',
    category: 'customer-success',
    meaning: 'Revenue retained from existing customers, including expansion, contraction, and churn. NRR above 100% means you grow revenue without acquiring new customers.',
    difficulty: 'intermediate',
    relatedTerms: ['grr-gross-revenue-retention', 'expansion-revenue', 'churn-rate'],
    crossLinks: ['ltv-lifetime-value', 'customer-retention'],
    isPriority: true,
    keyPoints: [
      'NRR > 100% = expansion exceeds churn',
      'Key SaaS metric for investors',
      'Best companies: 120%+ NRR',
      'Includes upgrades and downgrades'
    ],
    example: 'Starting MRR: $1M. After 1 year: -$100K churn, -$50K contraction, +$300K expansion. Ending: $1.15M. NRR = 115%.'
  },
  {
    id: 75,
    slug: 'grr-gross-revenue-retention',
    term: 'Gross Revenue Retention',
    abbreviation: 'GRR',
    category: 'customer-success',
    meaning: 'The percentage of recurring revenue retained, excluding expansion revenue. GRR measures your ability to keep existing revenue, capped at 100%.',
    difficulty: 'intermediate',
    relatedTerms: ['nrr-net-revenue-retention', 'churn-rate', 'customer-retention'],
    crossLinks: ['customer-health-score', 'ltv-lifetime-value'],
    isPriority: false,
    keyPoints: [
      'Maximum is 100% (no expansion)',
      'Healthy benchmark: 90%+ annually',
      'More conservative than NRR',
      'Shows base retention health'
    ],
    example: 'Starting MRR: $1M. After 1 year: -$100K churn, -$50K contraction. GRR = $850K / $1M = 85%.'
  },
  {
    id: 76,
    slug: 'expansion-revenue',
    term: 'Expansion Revenue',
    category: 'customer-success',
    meaning: 'Additional revenue generated from existing customers. Expansion includes upsells, cross-sells, and increased usage beyond the original contract.',
    difficulty: 'beginner',
    relatedTerms: ['upselling', 'cross-selling', 'nrr-net-revenue-retention'],
    crossLinks: ['customer-health-score', 'ltv-lifetime-value'],
    isPriority: false,
    keyPoints: [
      'Lower cost than new acquisition',
      'Drives NRR above 100%',
      'Requires strong product adoption',
      'Can be proactive or usage-based'
    ],
    example: 'Expansion sources: tier upgrades ($50K), seat additions ($30K), new product modules ($20K) = $100K expansion MRR this quarter.'
  },
  {
    id: 77,
    slug: 'upselling',
    term: 'Upselling',
    category: 'customer-success',
    meaning: 'Encouraging customers to purchase a higher-tier product or plan. Upselling increases average revenue per customer.',
    difficulty: 'beginner',
    relatedTerms: ['expansion-revenue', 'cross-selling', 'deal-size'],
    crossLinks: ['customer-health-score', 'product-adoption'],
    isPriority: false,
    keyPoints: [
      'Move customers to higher tiers',
      'Based on value delivered',
      'Timing matters - after proven success',
      'Different from cross-selling'
    ],
    example: 'Customer on $500/month Pro plan hitting limits → upsell to $1,200/month Enterprise plan with higher limits and additional features.'
  },
  {
    id: 78,
    slug: 'cross-selling',
    term: 'Cross-selling',
    category: 'customer-success',
    meaning: 'Selling additional products or services to existing customers. Cross-selling expands the relationship beyond the initial purchase.',
    difficulty: 'beginner',
    relatedTerms: ['upselling', 'expansion-revenue', 'customer-retention'],
    crossLinks: ['ltv-lifetime-value', 'deal-size'],
    isPriority: false,
    keyPoints: [
      'Sell adjacent products or services',
      'Increases account footprint',
      'Requires relevant product portfolio',
      'Existing relationships ease sale'
    ],
    example: 'CRM customer using sales automation → cross-sell marketing automation and customer service modules to create complete customer platform.'
  },
  {
    id: 79,
    slug: 'customer-health-score',
    term: 'Customer Health Score',
    category: 'customer-success',
    meaning: 'A metric indicating the likelihood of customer retention or churn. Health scores combine product usage, engagement, and satisfaction signals.',
    difficulty: 'intermediate',
    relatedTerms: ['churn-rate', 'customer-retention', 'customer-onboarding'],
    crossLinks: ['product-adoption', 'nrr-net-revenue-retention'],
    isPriority: false,
    keyPoints: [
      'Composite score from multiple signals',
      'Enables proactive intervention',
      'Should predict actual outcomes',
      'Calibrate regularly against churn data'
    ],
    example: 'Health score components: product usage (40%), support tickets (20%), NPS (15%), engagement (15%), payment history (10%). Score 0-100, <50 = at risk.'
  },
  {
    id: 80,
    slug: 'voice-of-customer',
    term: 'Voice of Customer',
    abbreviation: 'VoC',
    category: 'customer-success',
    meaning: 'Customer feedback collected to understand needs, expectations, and experiences. VoC informs product development, messaging, and customer experience improvements.',
    difficulty: 'beginner',
    relatedTerms: ['customer-health-score', 'customer-retention', 'nps'],
    crossLinks: ['product-marketing', 'positioning'],
    isPriority: false,
    keyPoints: [
      'Collected through surveys, interviews, reviews',
      'Quantitative (NPS) and qualitative (interviews)',
      'Should influence product roadmap',
      'Close the loop with customers'
    ],
    example: 'VoC program: NPS survey quarterly, customer interviews monthly, support ticket analysis, G2 review monitoring, win/loss analysis.'
  },

  // ============================================
  // CATEGORY 6: Modern GTM, AI & Buying Behaviour (20 terms)
  // ============================================
  {
    id: 81,
    slug: 'signal-based-selling',
    term: 'Signal-Based Selling',
    category: 'modern-gtm',
    meaning: 'Identifying buying signals to determine when and how to approach prospects. Signal-based selling makes outreach more relevant and timely.',
    difficulty: 'intermediate',
    relatedTerms: ['intent-data', 'buyer-intent', 'buying-signals'],
    crossLinks: ['outbound-sales', 'abm-account-based-marketing', 'ai-sdr'],
    isPriority: true,
    keyPoints: [
      'Right message at the right time',
      'Uses intent, activity, and event signals',
      'More effective than spray-and-pray',
      'Requires data infrastructure'
    ],
    example: 'Signal triggers outreach: company raises funding (event) + visiting pricing page (intent) + hiring for role you help with (signal) → personalized SDR outreach.'
  },
  {
    id: 82,
    slug: 'intent-data',
    term: 'Intent Data',
    category: 'modern-gtm',
    meaning: 'Data indicating that a company or individual is researching a particular solution or topic. Intent data reveals buying interest before direct engagement.',
    difficulty: 'intermediate',
    relatedTerms: ['buyer-intent', 'buying-signals', 'signal-based-selling'],
    crossLinks: ['abm-account-based-marketing', 'demand-capture', 'lead-scoring'],
    isPriority: true,
    keyPoints: [
      'First-party: your own website and product',
      'Third-party: research on other sites',
      'Providers: Bombora, G2, 6sense',
      'Quality varies significantly'
    ],
    example: 'Intent signal: Target account employees reading "CRM comparison" articles, visiting competitor websites, and searching related keywords across the web.'
  },
  {
    id: 83,
    slug: 'buyer-intent',
    term: 'Buyer Intent',
    category: 'modern-gtm',
    meaning: 'Evidence that a prospect is actively considering purchasing a product. High intent indicates readiness to buy, informing prioritization and messaging.',
    difficulty: 'beginner',
    relatedTerms: ['intent-data', 'buying-signals', 'pql-product-qualified-lead'],
    crossLinks: ['lead-scoring', 'signal-based-selling'],
    isPriority: false,
    keyPoints: [
      'Stronger than general interest',
      'Shown through specific behaviors',
      'High-intent leads convert better',
      'Should adjust engagement approach'
    ],
    example: 'High intent signals: visiting pricing page multiple times, requesting demo, comparing to competitors, asking about implementation.'
  },
  {
    id: 84,
    slug: 'buying-signals',
    term: 'Buying Signals',
    category: 'modern-gtm',
    meaning: 'Actions or events suggesting a prospect may be ready to purchase. Buying signals can be behavioral, demographic, or event-based.',
    difficulty: 'beginner',
    relatedTerms: ['buyer-intent', 'intent-data', 'sales-trigger'],
    crossLinks: ['signal-based-selling', 'lead-scoring'],
    isPriority: false,
    keyPoints: [
      'Behavioral: website visits, content downloads',
      'Event-based: funding, hiring, leadership change',
      'Product-based: usage spikes, feature exploration',
      'Combine signals for stronger indicators'
    ],
    example: 'Buying signals: visited pricing page 5 times (behavior), company just raised Series B (event), added 3 team members to trial (product).'
  },
  {
    id: 85,
    slug: 'dark-funnel',
    term: 'Dark Funnel',
    category: 'modern-gtm',
    meaning: 'Research and buying activities that happen outside trackable marketing channels. Dark funnel includes word-of-mouth, private communities, and unattributed sources.',
    difficulty: 'advanced',
    relatedTerms: ['attribution', 'intent-data', 'buyer-intent'],
    crossLinks: ['demand-generation', 'clg-community-led-growth'],
    isPriority: true,
    keyPoints: [
      'Majority of B2B research is dark',
      'Includes Slack communities, podcasts, peers',
      'Cannot be directly tracked',
      'Ask "How did you hear about us?" for insights'
    ],
    example: 'Dark funnel example: Buyer learns about product from a friend, discusses in private Slack, reads reviews, then shows up as "direct" traffic requesting demo.'
  },
  {
    id: 86,
    slug: 'zero-click-marketing',
    term: 'Zero-Click Marketing',
    category: 'modern-gtm',
    meaning: 'Marketing that delivers value and information without requiring users to visit your website. Content lives where audiences already are.',
    difficulty: 'intermediate',
    relatedTerms: ['dark-funnel', 'demand-generation', 'organic-acquisition'],
    crossLinks: ['clg-community-led-growth', 'content-marketing'],
    isPriority: false,
    keyPoints: [
      'Full value in social posts, newsletters',
      'Builds brand without requiring clicks',
      'Adapts to changing platform algorithms',
      'Harder to measure but builds awareness'
    ],
    example: 'Zero-click: LinkedIn carousel with complete framework, Twitter thread with full guide, YouTube video with standalone value - no click needed to learn.'
  },
  {
    id: 87,
    slug: 'revenue-intelligence',
    term: 'Revenue Intelligence',
    category: 'modern-gtm',
    meaning: 'Using data and analytics to understand and improve revenue performance. Revenue intelligence platforms capture and analyze sales activities automatically.',
    difficulty: 'intermediate',
    relatedTerms: ['conversation-intelligence', 'sales-forecasting', 'revops-revenue-operations'],
    crossLinks: ['win-rate', 'deal-velocity', 'pipeline'],
    isPriority: true,
    keyPoints: [
      'Automatic activity capture',
      'AI-powered insights and forecasting',
      'Tools: Gong, Clari, People.ai',
      'Improves visibility and coaching'
    ],
    example: 'Revenue intelligence: automatically log all emails and calls, analyze deal risk, identify patterns in won/lost deals, improve forecast accuracy.'
  },
  {
    id: 88,
    slug: 'conversation-intelligence',
    term: 'Conversation Intelligence',
    category: 'modern-gtm',
    meaning: 'Analyzing sales calls and conversations to identify insights and improve sales execution. AI transcribes and analyzes conversations at scale.',
    difficulty: 'intermediate',
    relatedTerms: ['revenue-intelligence', 'sales-enablement', 'win-rate'],
    crossLinks: ['coaching', 'competitive-intelligence'],
    isPriority: false,
    keyPoints: [
      'Records and transcribes sales calls',
      'Identifies winning behaviors',
      'Surfaces competitive mentions',
      'Tools: Gong, Chorus, Clari'
    ],
    example: 'Conversation intelligence reveals: top reps spend 40% of call listening, mention ROI 3x more often, and address pricing objections proactively.'
  },
  {
    id: 89,
    slug: 'ai-sdr',
    term: 'AI SDR',
    category: 'modern-gtm',
    meaning: 'An AI-powered system that automates parts of the sales development process. AI SDRs handle research, personalization, and initial outreach at scale.',
    difficulty: 'advanced',
    relatedTerms: ['ai-agents', 'agentic-gtm', 'signal-based-selling'],
    crossLinks: ['outbound-sales', 'pipeline-generation', 'workflow-automation'],
    isPriority: false,
    keyPoints: [
      'Automates prospecting and outreach',
      'Handles initial qualification',
      'Scales beyond human capacity',
      'Emerging technology, rapidly evolving'
    ],
    example: 'AI SDR: monitors for buying signals, researches prospects, writes personalized emails, sends at optimal times, and routes responses to human SDRs.'
  },
  {
    id: 90,
    slug: 'ai-agents',
    term: 'AI Agents',
    category: 'modern-gtm',
    meaning: 'Autonomous or semi-autonomous systems that perform tasks and execute workflows. AI agents can take actions, make decisions, and complete multi-step processes.',
    difficulty: 'advanced',
    relatedTerms: ['ai-sdr', 'agentic-gtm', 'workflow-automation'],
    crossLinks: ['gtm-engineering', 'personalization-at-scale'],
    isPriority: false,
    keyPoints: [
      'More autonomous than simple automation',
      'Can reason and make decisions',
      'Execute multi-step workflows',
      'Emerging capability in GTM'
    ],
    example: 'AI agent workflow: receives inbound lead → researches company → enriches data → scores lead → routes to rep → drafts personalized follow-up → schedules meeting.'
  },
  {
    id: 91,
    slug: 'agentic-gtm',
    term: 'Agentic GTM',
    category: 'modern-gtm',
    meaning: 'Using AI agents to execute and coordinate different GTM activities. Agentic GTM represents the next evolution of automation in sales and marketing.',
    difficulty: 'advanced',
    relatedTerms: ['ai-agents', 'ai-sdr', 'gtm-engineering'],
    crossLinks: ['workflow-automation', 'signal-based-selling', 'personalization-at-scale'],
    isPriority: true,
    keyPoints: [
      'AI coordinates GTM workflows',
      'Agents work together on complex tasks',
      'Requires robust data infrastructure',
      'Emerging paradigm in GTM'
    ],
    example: 'Agentic GTM: Intent agent detects signal → Research agent gathers context → Outreach agent personalizes message → Meeting agent schedules call → all coordinated automatically.'
  },
  {
    id: 92,
    slug: 'personalization-at-scale',
    term: 'Personalization at Scale',
    category: 'modern-gtm',
    meaning: 'Delivering customized experiences across large numbers of prospects or customers. AI enables personalization that was previously only possible in high-touch situations.',
    difficulty: 'intermediate',
    relatedTerms: ['abm-account-based-marketing', 'ai-agents', 'signal-based-selling'],
    crossLinks: ['outbound-sales', 'demand-generation'],
    isPriority: false,
    keyPoints: [
      'Beyond "Hi {First Name}"',
      'Uses AI for content generation',
      'Balances automation with relevance',
      'Requires data and signals'
    ],
    example: 'Personalized at scale: AI generates unique email for each prospect referencing their company\'s recent news, tech stack, and specific challenges in their industry.'
  },
  {
    id: 93,
    slug: 'signal-based-marketing',
    term: 'Signal-Based Marketing',
    category: 'modern-gtm',
    meaning: 'Triggering marketing campaigns based on prospect behaviors, activities, or events. Marketing responds to signals rather than following static schedules.',
    difficulty: 'intermediate',
    relatedTerms: ['signal-based-selling', 'intent-data', 'buying-signals'],
    crossLinks: ['demand-generation', 'abm-account-based-marketing', 'workflow-automation'],
    isPriority: false,
    keyPoints: [
      'Event-triggered campaigns',
      'More relevant than batch-and-blast',
      'Requires signal detection infrastructure',
      'Coordinates with sales motions'
    ],
    example: 'Signal-based: When target account shows high intent + visits pricing page, automatically serve retargeting ads, send relevant case study, and alert sales rep.'
  },
  {
    id: 94,
    slug: 'account-intelligence',
    term: 'Account Intelligence',
    category: 'modern-gtm',
    meaning: 'Collecting and analyzing information about target accounts to improve engagement. Account intelligence enables relevant, timely outreach.',
    difficulty: 'intermediate',
    relatedTerms: ['intent-data', 'abm-account-based-marketing', 'competitive-intelligence'],
    crossLinks: ['signal-based-selling', 'multi-threading'],
    isPriority: false,
    keyPoints: [
      'Company info, news, signals',
      'Org charts and contact data',
      'Tech stack and usage data',
      'Providers: ZoomInfo, LinkedIn, 6sense'
    ],
    example: 'Account intelligence: Company profile, recent funding, leadership changes, technology used, hiring trends, competitor relationships, key contacts and their roles.'
  },
  {
    id: 95,
    slug: 'buying-committee',
    term: 'Buying Committee',
    category: 'modern-gtm',
    meaning: 'The group of stakeholders involved in making a B2B purchasing decision. Enterprise deals typically involve 6-10 people in the buying committee.',
    difficulty: 'intermediate',
    relatedTerms: ['champion', 'economic-buyer', 'multi-threading'],
    crossLinks: ['sales-cycle', 'abm-account-based-marketing'],
    isPriority: true,
    keyPoints: [
      'Average 6-10 people in B2B decisions',
      'Different roles: user, technical, economic',
      'Each has different concerns',
      'Map early and engage broadly'
    ],
    example: 'Buying committee: End users (daily use), IT (security/integration), Finance (budget), Legal (contract), Executive sponsor (strategic fit).'
  },
  {
    id: 96,
    slug: 'champion',
    term: 'Champion',
    category: 'modern-gtm',
    meaning: 'An internal stakeholder who advocates for your product within a prospective customer organization. Champions sell internally on your behalf.',
    difficulty: 'intermediate',
    relatedTerms: ['economic-buyer', 'buying-committee', 'multi-threading'],
    crossLinks: ['sales-cycle', 'win-rate'],
    isPriority: false,
    keyPoints: [
      'Has personal stake in your success',
      'Sells internally when you cannot',
      'Needs ammunition and enablement',
      'Essential for enterprise deals'
    ],
    example: 'Champion: Director of Marketing who will look successful if your tool improves metrics. You arm them with ROI data and presentation materials for internal meetings.'
  },
  {
    id: 97,
    slug: 'economic-buyer',
    term: 'Economic Buyer',
    category: 'modern-gtm',
    meaning: 'The person responsible for approving the budget and making the financial purchasing decision. The economic buyer may not be the end user.',
    difficulty: 'intermediate',
    relatedTerms: ['champion', 'buying-committee', 'multi-threading'],
    crossLinks: ['deal-size', 'sales-cycle'],
    isPriority: false,
    keyPoints: [
      'Controls budget approval',
      'Often different from end user',
      'Cares about ROI and business impact',
      'Must be engaged for deal to close'
    ],
    example: 'Economic buyer: CFO who controls the software budget. Even if the marketing team wants the tool, the CFO must approve the spend.'
  },
  {
    id: 98,
    slug: 'sales-trigger',
    term: 'Sales Trigger',
    category: 'modern-gtm',
    meaning: 'An event that creates a potential reason for a prospect to consider purchasing. Triggers create natural opening for relevant outreach.',
    difficulty: 'beginner',
    relatedTerms: ['buying-signals', 'signal-based-selling', 'intent-data'],
    crossLinks: ['outbound-sales', 'pipeline-generation'],
    isPriority: false,
    keyPoints: [
      'External events: funding, hiring, expansion',
      'Internal events: leadership change, initiative',
      'Creates timely reason to engage',
      'Can be monitored and automated'
    ],
    example: 'Sales triggers: Company raises Series B (budget), hires VP Sales (initiative), opens new office (expansion), competitor acquisition (urgency).'
  },
  {
    id: 99,
    slug: 'gtm-orchestration',
    term: 'GTM Orchestration',
    category: 'modern-gtm',
    meaning: 'Coordinating data, channels, teams, and automated workflows across the GTM process. Orchestration ensures cohesive execution across touchpoints.',
    difficulty: 'advanced',
    relatedTerms: ['revops-revenue-operations', 'workflow-automation', 'agentic-gtm'],
    crossLinks: ['abm-account-based-marketing', 'signal-based-selling'],
    isPriority: false,
    keyPoints: [
      'Coordinates multiple channels',
      'Aligns sales and marketing activities',
      'Uses automation and AI',
      'Creates cohesive buyer experience'
    ],
    example: 'GTM orchestration: ABM campaign triggers → Intent signal detected → Ads served → SDR outreach timed → AE meeting → CS handoff → all coordinated automatically.'
  },
  {
    id: 100,
    slug: 'revenue-attribution',
    term: 'Revenue Attribution',
    category: 'modern-gtm',
    meaning: 'Connecting GTM activities and touchpoints to revenue outcomes. Revenue attribution helps understand which investments drive results.',
    difficulty: 'advanced',
    relatedTerms: ['attribution', 'revops-revenue-operations', 'funnel-analytics'],
    crossLinks: ['cac-customer-acquisition-cost', 'demand-generation', 'pipeline-generation'],
    isPriority: true,
    keyPoints: [
      'Ties activities to closed revenue',
      'More valuable than lead attribution',
      'Requires full-funnel tracking',
      'Informs investment decisions'
    ],
    example: 'Revenue attribution: 30% of closed revenue touched webinars, 45% engaged with blog content, 60% had SDR outreach - with proper weighting for multi-touch.'
  }
];

// Helper functions
export function getTermBySlug(slug: string): GTMTerm | undefined {
  return GTM_TERMS.find(term => term.slug === slug);
}

export function getTermsByCategory(category: GTMCategory): GTMTerm[] {
  return GTM_TERMS.filter(term => term.category === category);
}

export function getPriorityTerms(): GTMTerm[] {
  return GTM_TERMS.filter(term => term.isPriority);
}

export function getAllSlugs(): string[] {
  return GTM_TERMS.map(term => term.slug);
}

export function getRelatedTerms(term: GTMTerm): GTMTerm[] {
  const relatedSlugs = [...term.relatedTerms, ...term.crossLinks];
  return GTM_TERMS.filter(t => relatedSlugs.includes(t.slug));
}

export function getCategoryInfo(category: GTMCategory): GTMCategoryInfo | undefined {
  return GTM_CATEGORIES.find(c => c.slug === category);
}

export function getTermsByDifficulty(difficulty: DifficultyLevel): GTMTerm[] {
  return GTM_TERMS.filter(term => term.difficulty === difficulty);
}

// Navigation helpers
export function getNextTerm(currentSlug: string): GTMTerm | undefined {
  const currentIndex = GTM_TERMS.findIndex(t => t.slug === currentSlug);
  if (currentIndex === -1 || currentIndex === GTM_TERMS.length - 1) return undefined;
  return GTM_TERMS[currentIndex + 1];
}

export function getPreviousTerm(currentSlug: string): GTMTerm | undefined {
  const currentIndex = GTM_TERMS.findIndex(t => t.slug === currentSlug);
  if (currentIndex <= 0) return undefined;
  return GTM_TERMS[currentIndex - 1];
}

// Search helper
export function searchTerms(query: string): GTMTerm[] {
  const lowerQuery = query.toLowerCase();
  return GTM_TERMS.filter(term =>
    term.term.toLowerCase().includes(lowerQuery) ||
    term.meaning.toLowerCase().includes(lowerQuery) ||
    (term.abbreviation && term.abbreviation.toLowerCase().includes(lowerQuery))
  );
}
