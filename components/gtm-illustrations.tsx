'use client';

import React from 'react';
import { GTMCategory } from '@/lib/learning-gtm-data';

interface IllustrationProps {
  className?: string;
}

// Fundamentals - Target with layers
export const FundamentalsIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background circles */}
    <circle cx="100" cy="100" r="90" fill="#E8F4FD" />
    <circle cx="100" cy="100" r="70" fill="#C8E4FA" />
    <circle cx="100" cy="100" r="50" fill="#A8D4F7" />
    <circle cx="100" cy="100" r="30" fill="#1A3D7C" />

    {/* Center icon */}
    <path d="M100 85L110 95L100 105L90 95L100 85Z" fill="white" />

    {/* Arrows pointing inward */}
    <g stroke="#1A3D7C" strokeWidth="2" strokeLinecap="round">
      <path d="M100 20L100 45" />
      <path d="M95 35L100 45L105 35" />

      <path d="M180 100L155 100" />
      <path d="M165 95L155 100L165 105" />

      <path d="M100 180L100 155" />
      <path d="M95 165L100 155L105 165" />

      <path d="M20 100L45 100" />
      <path d="M35 95L45 100L35 105" />
    </g>
  </svg>
);

// Sales - Pipeline funnel
export const SalesIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Funnel shape */}
    <path d="M30 30H170L140 90H60L30 30Z" fill="#D4EDDA" stroke="#2BAE66" strokeWidth="2" />
    <path d="M60 90H140L120 130H80L60 90Z" fill="#B8E6C4" stroke="#2BAE66" strokeWidth="2" />
    <path d="M80 130H120L105 170H95L80 130Z" fill="#2BAE66" stroke="#2BAE66" strokeWidth="2" />

    {/* Dots representing leads */}
    <circle cx="50" cy="50" r="5" fill="#2BAE66" />
    <circle cx="80" cy="45" r="5" fill="#2BAE66" />
    <circle cx="110" cy="50" r="5" fill="#2BAE66" />
    <circle cx="140" cy="45" r="5" fill="#2BAE66" />
    <circle cx="160" cy="50" r="5" fill="#2BAE66" />

    <circle cx="75" cy="105" r="5" fill="#2BAE66" />
    <circle cx="100" cy="110" r="5" fill="#2BAE66" />
    <circle cx="125" cy="105" r="5" fill="#2BAE66" />

    <circle cx="100" cy="150" r="6" fill="white" stroke="#2BAE66" strokeWidth="2" />

    {/* Dollar sign at bottom */}
    <text x="96" y="155" fontSize="12" fill="#2BAE66" fontWeight="bold">$</text>
  </svg>
);

// Revenue Ops - Connected gears
export const RevenueOpsIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Large gear */}
    <g transform="translate(60, 60)">
      <circle cx="40" cy="40" r="30" fill="#E8E8FF" stroke="#6366f1" strokeWidth="2" />
      <circle cx="40" cy="40" r="15" fill="#6366f1" />
      {/* Gear teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <rect
          key={i}
          x="35"
          y="5"
          width="10"
          height="10"
          rx="2"
          fill="#6366f1"
          transform={`rotate(${angle}, 40, 40)`}
        />
      ))}
    </g>

    {/* Small gear */}
    <g transform="translate(115, 100)">
      <circle cx="25" cy="25" r="20" fill="#E8E8FF" stroke="#6366f1" strokeWidth="2" />
      <circle cx="25" cy="25" r="10" fill="#6366f1" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <rect
          key={i}
          x="21"
          y="2"
          width="8"
          height="8"
          rx="2"
          fill="#6366f1"
          transform={`rotate(${angle}, 25, 25)`}
        />
      ))}
    </g>

    {/* Connection lines */}
    <path d="M30 100L30 180" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M170 60L170 180" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M30 180L170 180" stroke="#6366f1" strokeWidth="2" />

    {/* Data points */}
    <circle cx="30" cy="180" r="6" fill="#6366f1" />
    <circle cx="100" cy="180" r="6" fill="#6366f1" />
    <circle cx="170" cy="180" r="6" fill="#6366f1" />
  </svg>
);

// Growth - Rocket with chart
export const GrowthIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Chart background */}
    <rect x="20" y="100" width="160" height="80" rx="8" fill="#FFF7E6" stroke="#f59e0b" strokeWidth="2" />

    {/* Chart bars */}
    <rect x="40" y="140" width="20" height="30" rx="4" fill="#FCD34D" />
    <rect x="70" y="125" width="20" height="45" rx="4" fill="#FBBF24" />
    <rect x="100" y="115" width="20" height="55" rx="4" fill="#F59E0B" />
    <rect x="130" y="105" width="20" height="65" rx="4" fill="#D97706" />

    {/* Rocket */}
    <g transform="translate(140, 20) rotate(45)">
      <ellipse cx="20" cy="35" rx="12" ry="25" fill="#f59e0b" />
      <circle cx="20" cy="25" r="5" fill="white" />
      <path d="M8 55L20 50L32 55L20 70L8 55Z" fill="#FCD34D" />
      <path d="M5 35L15 40V30L5 35Z" fill="#D97706" />
      <path d="M35 35L25 40V30L35 35Z" fill="#D97706" />
    </g>

    {/* Smoke trail */}
    <circle cx="175" cy="85" r="4" fill="#FEF3C7" opacity="0.8" />
    <circle cx="180" cy="95" r="3" fill="#FEF3C7" opacity="0.6" />
    <circle cx="183" cy="103" r="2" fill="#FEF3C7" opacity="0.4" />
  </svg>
);

// Customer Success - Heart with people
export const CustomerSuccessIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Heart shape */}
    <path
      d="M100 170C100 170 30 120 30 70C30 45 50 30 75 30C90 30 100 40 100 40C100 40 110 30 125 30C150 30 170 45 170 70C170 120 100 170 100 170Z"
      fill="#FCE7F3"
      stroke="#ec4899"
      strokeWidth="2"
    />

    {/* People icons */}
    <g transform="translate(60, 70)">
      <circle cx="15" cy="15" r="10" fill="#ec4899" />
      <path d="M5 40C5 32 9 25 15 25C21 25 25 32 25 40" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
    </g>

    <g transform="translate(110, 70)">
      <circle cx="15" cy="15" r="10" fill="#ec4899" />
      <path d="M5 40C5 32 9 25 15 25C21 25 25 32 25 40" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* Connection between people */}
    <path d="M85 95L115 95" stroke="#ec4899" strokeWidth="2" strokeDasharray="4 4" />

    {/* Stars */}
    <path d="M100 50L102 56L108 56L103 60L105 66L100 62L95 66L97 60L92 56L98 56L100 50Z" fill="#ec4899" />
    <path d="M55 55L56 58L59 58L57 60L58 63L55 61L52 63L53 60L51 58L54 58L55 55Z" fill="#F9A8D4" />
    <path d="M145 55L146 58L149 58L147 60L148 63L145 61L142 63L143 60L141 58L144 58L145 55Z" fill="#F9A8D4" />
  </svg>
);

// Modern GTM - AI/Brain with connections
export const ModernGTMIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Central brain/chip */}
    <rect x="60" y="60" width="80" height="80" rx="16" fill="#EDE9FE" stroke="#8b5cf6" strokeWidth="2" />
    <rect x="75" y="75" width="50" height="50" rx="8" fill="#8b5cf6" />

    {/* Circuit lines inside */}
    <path d="M85 100H115" stroke="white" strokeWidth="2" />
    <path d="M100 85V115" stroke="white" strokeWidth="2" />
    <circle cx="100" cy="100" r="8" fill="white" />

    {/* Connection pins */}
    <g stroke="#8b5cf6" strokeWidth="2">
      <line x1="80" y1="60" x2="80" y2="45" />
      <line x1="100" y1="60" x2="100" y2="40" />
      <line x1="120" y1="60" x2="120" y2="45" />

      <line x1="80" y1="140" x2="80" y2="155" />
      <line x1="100" y1="140" x2="100" y2="160" />
      <line x1="120" y1="140" x2="120" y2="155" />

      <line x1="60" y1="80" x2="45" y2="80" />
      <line x1="60" y1="100" x2="40" y2="100" />
      <line x1="60" y1="120" x2="45" y2="120" />

      <line x1="140" y1="80" x2="155" y2="80" />
      <line x1="140" y1="100" x2="160" y2="100" />
      <line x1="140" y1="120" x2="155" y2="120" />
    </g>

    {/* Signal waves */}
    <path d="M25 100C25 100 32 85 40 100C40 100 32 115 25 100Z" fill="#DDD6FE" />
    <path d="M160 100C160 100 167 85 175 100C175 100 167 115 160 100Z" fill="#DDD6FE" />

    {/* Data points at ends */}
    <circle cx="100" cy="30" r="6" fill="#8b5cf6" />
    <circle cx="100" cy="170" r="6" fill="#8b5cf6" />
    <circle cx="30" cy="100" r="6" fill="#8b5cf6" />
    <circle cx="170" cy="100" r="6" fill="#8b5cf6" />
  </svg>
);

// Generic GTM illustration
export const GenericGTMIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hexagonal pattern */}
    <polygon points="100,20 160,55 160,125 100,160 40,125 40,55" fill="#E8F4FD" stroke="#1A3D7C" strokeWidth="2" />
    <polygon points="100,40 140,65 140,115 100,140 60,115 60,65" fill="#C8E4FA" stroke="#1A3D7C" strokeWidth="2" />
    <polygon points="100,60 120,75 120,105 100,120 80,105 80,75" fill="#1A3D7C" />

    {/* Arrows showing flow */}
    <path d="M100 180L100 165" stroke="#2BAE66" strokeWidth="2" strokeLinecap="round" />
    <path d="M95 170L100 165L105 170" stroke="#2BAE66" strokeWidth="2" strokeLinecap="round" />

    <path d="M180 100L165 100" stroke="#2BAE66" strokeWidth="2" strokeLinecap="round" />
    <path d="M170 95L165 100L170 105" stroke="#2BAE66" strokeWidth="2" strokeLinecap="round" />

    <path d="M20 100L35 100" stroke="#2BAE66" strokeWidth="2" strokeLinecap="round" />
    <path d="M30 95L35 100L30 105" stroke="#2BAE66" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Map category to illustration
export const CategoryIllustration: React.FC<{ category: GTMCategory; className?: string }> = ({ category, className }) => {
  const illustrations: Record<GTMCategory, React.FC<IllustrationProps>> = {
    'fundamentals': FundamentalsIllustration,
    'sales': SalesIllustration,
    'revenue-ops': RevenueOpsIllustration,
    'growth': GrowthIllustration,
    'customer-success': CustomerSuccessIllustration,
    'modern-gtm': ModernGTMIllustration
  };

  const Illustration = illustrations[category] || GenericGTMIllustration;
  return <Illustration className={className} />;
};

// Interactive concept visualization
export const ConceptVisualization: React.FC<{
  type: 'funnel' | 'flywheel' | 'pipeline' | 'metrics' | 'timeline';
  className?: string;
}> = ({ type, className }) => {
  switch (type) {
    case 'funnel':
      return (
        <svg viewBox="0 0 300 200" className={className} fill="none">
          <path d="M30 20H270L220 80H80L30 20Z" fill="#E8F4FD" stroke="#1A3D7C" strokeWidth="2" />
          <path d="M80 80H220L180 130H120L80 80Z" fill="#C8E4FA" stroke="#1A3D7C" strokeWidth="2" />
          <path d="M120 130H180L160 180H140L120 130Z" fill="#1A3D7C" />
          <text x="150" y="45" textAnchor="middle" fontSize="12" fill="#1A3D7C" fontWeight="600">Awareness</text>
          <text x="150" y="100" textAnchor="middle" fontSize="12" fill="#1A3D7C" fontWeight="600">Consideration</text>
          <text x="150" y="160" textAnchor="middle" fontSize="12" fill="white" fontWeight="600">Decision</text>
        </svg>
      );
    case 'flywheel':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none">
          <circle cx="100" cy="100" r="70" fill="none" stroke="#E8F4FD" strokeWidth="20" />
          <path d="M100 30A70 70 0 0 1 170 100" stroke="#1A3D7C" strokeWidth="20" strokeLinecap="round" />
          <path d="M170 100A70 70 0 0 1 100 170" stroke="#2BAE66" strokeWidth="20" strokeLinecap="round" />
          <path d="M100 170A70 70 0 0 1 30 100" stroke="#f59e0b" strokeWidth="20" strokeLinecap="round" />
          <circle cx="100" cy="100" r="25" fill="white" stroke="#1A3D7C" strokeWidth="2" />
          <text x="100" y="105" textAnchor="middle" fontSize="10" fill="#1A3D7C" fontWeight="600">CUSTOMER</text>
        </svg>
      );
    case 'metrics':
      return (
        <svg viewBox="0 0 300 150" className={className} fill="none">
          <rect x="20" y="20" width="70" height="110" rx="8" fill="#E8F4FD" stroke="#1A3D7C" strokeWidth="2" />
          <rect x="115" y="20" width="70" height="110" rx="8" fill="#D4EDDA" stroke="#2BAE66" strokeWidth="2" />
          <rect x="210" y="20" width="70" height="110" rx="8" fill="#FFF7E6" stroke="#f59e0b" strokeWidth="2" />
          <text x="55" y="70" textAnchor="middle" fontSize="24" fill="#1A3D7C" fontWeight="700">CAC</text>
          <text x="55" y="95" textAnchor="middle" fontSize="10" fill="#1A3D7C">Acquisition Cost</text>
          <text x="150" y="70" textAnchor="middle" fontSize="24" fill="#2BAE66" fontWeight="700">LTV</text>
          <text x="150" y="95" textAnchor="middle" fontSize="10" fill="#2BAE66">Lifetime Value</text>
          <text x="245" y="70" textAnchor="middle" fontSize="24" fill="#f59e0b" fontWeight="700">NRR</text>
          <text x="245" y="95" textAnchor="middle" fontSize="10" fill="#f59e0b">Net Retention</text>
        </svg>
      );
    default:
      return <GenericGTMIllustration className={className} />;
  }
};
