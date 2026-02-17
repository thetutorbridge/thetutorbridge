import React from 'react';

interface IconProps {
  className?: string;
}

// Homework Help Icon - Shows a document with a pencil and lightbulb (representing help/insight)
export const HomeworkHelpIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Document base */}
    <rect
      x="12"
      y="8"
      width="32"
      height="44"
      rx="3"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Document fold corner */}
    <path
      d="M36 8V16C36 17.1046 36.8954 18 38 18H44"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M36 8L44 16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Text lines on document */}
    <line x1="18" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="18" y1="31" x2="38" y2="31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="18" y1="38" x2="34" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

    {/* Pencil writing (diagonal, bottom right) */}
    <g transform="translate(38, 36) rotate(45)">
      <rect
        x="0"
        y="0"
        width="6"
        height="22"
        rx="1"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Pencil tip */}
      <path
        d="M0 22L3 28L6 22"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Pencil eraser */}
      <rect x="0" y="0" width="6" height="4" rx="1" fill="currentColor" fillOpacity="0.4" />
    </g>

    {/* Lightbulb (top right, representing insight/help) */}
    <g transform="translate(46, 4)">
      {/* Bulb glow */}
      <circle cx="8" cy="10" r="10" fill="currentColor" fillOpacity="0.1" />
      {/* Bulb */}
      <path
        d="M8 2C4.68629 2 2 4.68629 2 8C2 10.2091 3.20977 12.1358 5 13.1973V15C5 15.5523 5.44772 16 6 16H10C10.5523 16 11 15.5523 11 15V13.1973C12.7902 12.1358 14 10.2091 14 8C14 4.68629 11.3137 2 8 2Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Bulb base */}
      <rect x="5.5" y="16" width="5" height="2" rx="0.5" fill="currentColor" />
      {/* Light rays */}
      <line x1="8" y1="-2" x2="8" y2="-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="0" x2="3" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="0" x2="13" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* Checkmark on document (task being solved) */}
    <circle cx="40" cy="45" r="6" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M37 45L39 47L43 43"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Math Subject Icon - Shows mathematical elements (sigma, graph, equations)
export const MathIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Coordinate grid background */}
    <g opacity="0.15">
      <line x1="8" y1="32" x2="56" y2="32" stroke="currentColor" strokeWidth="1" />
      <line x1="32" y1="8" x2="32" y2="56" stroke="currentColor" strokeWidth="1" />
      <line x1="8" y1="20" x2="56" y2="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="8" y1="44" x2="56" y2="44" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="20" y1="8" x2="20" y2="56" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="44" y1="8" x2="44" y2="56" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
    </g>

    {/* Parabola curve */}
    <path
      d="M12 48C12 48 20 16 32 16C44 16 52 48 52 48"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />

    {/* Points on curve */}
    <circle cx="20" cy="28" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="32" cy="16" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="44" cy="28" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />

    {/* Sigma symbol (top left) */}
    <g transform="translate(4, 4)">
      <rect x="0" y="0" width="18" height="20" rx="3" fill="currentColor" fillOpacity="0.1" />
      <path
        d="M5 5H13L8 10L13 15H5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>

    {/* Pi symbol (top right) */}
    <g transform="translate(44, 4)">
      <circle cx="8" cy="10" r="10" fill="currentColor" fillOpacity="0.1" />
      <path
        d="M4 6H12M6 6V16M10 6V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </g>

    {/* Plus minus symbol (bottom) */}
    <g transform="translate(4, 44)">
      <rect x="0" y="0" width="16" height="16" rx="2" fill="currentColor" fillOpacity="0.15" />
      <line x1="8" y1="3" x2="8" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="5" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="5" y1="12" x2="11" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Equals sign (bottom right) */}
    <g transform="translate(46, 46)">
      <circle cx="7" cy="7" r="9" fill="currentColor" fillOpacity="0.1" />
      <line x1="3" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="9" x2="11" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

// Science Subject Icon - Shows microscope, atoms, and scientific elements
export const ScienceIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Microscope */}
    <g transform="translate(8, 6)">
      {/* Eyepiece */}
      <rect
        x="14"
        y="0"
        width="8"
        height="10"
        rx="2"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Body tube */}
      <rect
        x="16"
        y="10"
        width="4"
        height="16"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Arm */}
      <path
        d="M8 36L18 26"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Objective lens */}
      <ellipse
        cx="18"
        cy="28"
        rx="4"
        ry="3"
        fill="currentColor"
        fillOpacity="0.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Stage */}
      <rect
        x="4"
        y="34"
        width="24"
        height="4"
        rx="1"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Base */}
      <path
        d="M2 50C2 48 4 46 8 46H24C28 46 30 48 30 50"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Stand */}
      <rect
        x="14"
        y="38"
        width="4"
        height="8"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </g>

    {/* Atom (top right) */}
    <g transform="translate(42, 4)">
      {/* Nucleus */}
      <circle cx="10" cy="10" r="4" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
      {/* Electron orbits */}
      <ellipse cx="10" cy="10" rx="14" ry="6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
      <ellipse cx="10" cy="10" rx="14" ry="6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" transform="rotate(60 10 10)" />
      <ellipse cx="10" cy="10" rx="14" ry="6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" transform="rotate(-60 10 10)" />
      {/* Electrons */}
      <circle cx="24" cy="10" r="2" fill="currentColor" />
      <circle cx="3" cy="3" r="2" fill="currentColor" />
      <circle cx="3" cy="17" r="2" fill="currentColor" />
    </g>

    {/* DNA helix hint (bottom right) */}
    <g transform="translate(46, 38)">
      <path
        d="M2 2C6 4 10 4 14 2M2 8C6 6 10 6 14 8M2 14C6 12 10 12 14 14M2 20C6 18 10 18 14 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <line x1="4" y1="2" x2="4" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <line x1="12" y1="2" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    </g>

    {/* Bubbles/particles */}
    <circle cx="48" cy="34" r="2" fill="currentColor" fillOpacity="0.4" />
    <circle cx="44" cy="30" r="1.5" fill="currentColor" fillOpacity="0.3" />
    <circle cx="52" cy="32" r="1" fill="currentColor" fillOpacity="0.5" />
  </svg>
);

// English Subject Icon - Shows book, pen, and writing elements
export const EnglishIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Open book */}
    <g transform="translate(4, 16)">
      {/* Left page */}
      <path
        d="M28 4C28 4 22 2 14 2C6 2 2 4 2 4V40C2 40 6 38 14 38C22 38 28 40 28 40V4Z"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Right page */}
      <path
        d="M28 4C28 4 34 2 42 2C50 2 54 4 54 4V40C54 40 50 38 42 38C34 38 28 40 28 40V4Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Book spine */}
      <line x1="28" y1="4" x2="28" y2="40" stroke="currentColor" strokeWidth="2" />

      {/* Text lines on left page */}
      <line x1="7" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="7" y1="15" x2="20" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="7" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="7" y1="25" x2="18" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

      {/* Text lines on right page */}
      <line x1="33" y1="10" x2="49" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="33" y1="15" x2="46" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="33" y1="20" x2="48" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="33" y1="25" x2="44" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </g>

    {/* Fountain pen (top right) */}
    <g transform="translate(42, 2) rotate(45)">
      {/* Pen body */}
      <rect
        x="0"
        y="0"
        width="5"
        height="20"
        rx="1"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Pen nib */}
      <path
        d="M0 20L2.5 28L5 20"
        fill="currentColor"
        fillOpacity="0.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Pen cap */}
      <rect x="0" y="0" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.35" />
      {/* Pen clip */}
      <rect x="5" y="1" width="2" height="8" rx="0.5" fill="currentColor" fillOpacity="0.3" />
    </g>

    {/* Quote marks (decorative, top left) */}
    <g transform="translate(4, 2)" opacity="0.6">
      <path
        d="M4 10C4 6 6 4 10 4V7C8 7 7 8 7 10H10V14H4V10Z"
        fill="currentColor"
      />
      <path
        d="M14 10C14 6 16 4 20 4V7C18 7 17 8 17 10H20V14H14V10Z"
        fill="currentColor"
      />
    </g>

    {/* A letter badge (bottom left) */}
    <g transform="translate(2, 48)">
      <circle cx="10" cy="8" r="10" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      <text
        x="10"
        y="12"
        textAnchor="middle"
        fill="currentColor"
        fontSize="12"
        fontWeight="bold"
        fontFamily="serif"
      >
        A
      </text>
    </g>

    {/* Sparkle/inspiration */}
    <g opacity="0.5">
      <path d="M54 46L55 48L57 49L55 50L54 52L53 50L51 49L53 48L54 46Z" fill="currentColor" />
    </g>
  </svg>
);

// Step 1: Submit Icon - Document with upload arrow
export const SubmitIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Document base */}
    <rect
      x="12"
      y="8"
      width="32"
      height="44"
      rx="3"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="2"
    />

    {/* Document fold corner */}
    <path
      d="M36 8V16C36 17.1046 36.8954 18 38 18H44"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M36 8L44 16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Text lines */}
    <line x1="18" y1="26" x2="32" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <line x1="18" y1="33" x2="38" y2="33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <line x1="18" y1="40" x2="34" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

    {/* Upload arrow circle */}
    <circle cx="46" cy="44" r="14" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />

    {/* Upload arrow */}
    <path
      d="M46 50V38M46 38L41 43M46 38L51 43"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Step 2: Quote Icon - Clock with price tag
export const QuoteIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Clock face */}
    <circle
      cx="28"
      cy="32"
      r="22"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="2"
    />

    {/* Clock inner circle */}
    <circle cx="28" cy="32" r="3" fill="currentColor" fillOpacity="0.3" />

    {/* Hour hand */}
    <line
      x1="28"
      y1="32"
      x2="28"
      y2="20"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Minute hand */}
    <line
      x1="28"
      y1="32"
      x2="38"
      y2="32"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Clock tick marks */}
    <line x1="28" y1="12" x2="28" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="28" y1="49" x2="28" y2="52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="8" y1="32" x2="11" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="45" y1="32" x2="48" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

    {/* Price tag */}
    <g transform="translate(42, 6)">
      <rect
        x="0"
        y="0"
        width="18"
        height="24"
        rx="3"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Tag hole */}
      <circle cx="9" cy="6" r="2.5" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      {/* Dollar sign */}
      <path
        d="M9 11V21M6 14C6 12.5 7.5 11.5 9 11.5C10.5 11.5 12 12 12 13.5C12 15 10.5 15.5 9 16C7.5 16.5 6 17 6 18.5C6 20 7.5 20.5 9 20.5C10.5 20.5 12 19.5 12 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

// Step 3: Approve Icon - Checkmark with thumbs up feel
export const ApproveIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Main circle */}
    <circle
      cx="32"
      cy="32"
      r="24"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="2"
    />

    {/* Inner decorative circle */}
    <circle
      cx="32"
      cy="32"
      r="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="4 3"
      opacity="0.3"
    />

    {/* Checkmark */}
    <path
      d="M22 32L29 39L42 24"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Sparkles around */}
    <g opacity="0.6">
      <circle cx="52" cy="16" r="2" fill="currentColor" />
      <circle cx="56" cy="24" r="1.5" fill="currentColor" />
      <circle cx="12" cy="20" r="1.5" fill="currentColor" />
      <path d="M8 40L9 42L11 43L9 44L8 46L7 44L5 43L7 42L8 40Z" fill="currentColor" />
      <path d="M54 44L55 46L57 47L55 48L54 50L53 48L51 47L53 46L54 44Z" fill="currentColor" />
    </g>
  </svg>
);

// Step 4: Success Icon - Trophy with star
export const SuccessIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Trophy cup */}
    <path
      d="M20 12H44V28C44 36.8366 36.8366 44 28 44H36C27.1634 44 20 36.8366 20 28V12Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="2"
    />

    {/* Trophy rim */}
    <rect x="18" y="8" width="28" height="6" rx="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />

    {/* Left handle */}
    <path
      d="M20 16H14C10 16 8 20 8 24C8 28 10 32 14 32H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="currentColor"
      fillOpacity="0.1"
    />

    {/* Right handle */}
    <path
      d="M44 16H50C54 16 56 20 56 24C56 28 54 32 50 32H44"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="currentColor"
      fillOpacity="0.1"
    />

    {/* Trophy stem */}
    <rect x="28" y="44" width="8" height="8" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />

    {/* Trophy base */}
    <rect x="22" y="52" width="20" height="6" rx="2" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />

    {/* Star on trophy */}
    <path
      d="M32 18L34 24L40 24L35 28L37 34L32 30L27 34L29 28L24 24L30 24L32 18Z"
      fill="currentColor"
      fillOpacity="0.4"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />

    {/* Celebration sparkles */}
    <g opacity="0.5">
      <circle cx="10" cy="10" r="2" fill="currentColor" />
      <circle cx="54" cy="8" r="1.5" fill="currentColor" />
      <path d="M6 20L7 22L9 23L7 24L6 26L5 24L3 23L5 22L6 20Z" fill="currentColor" />
      <path d="M58 18L59 20L61 21L59 22L58 24L57 22L55 21L57 20L58 18Z" fill="currentColor" />
    </g>
  </svg>
);

// Certified Tutors Icon - Certificate with ribbon
export const CertifiedIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Certificate background */}
    <rect
      x="8"
      y="6"
      width="40"
      height="32"
      rx="3"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="2"
    />

    {/* Certificate border decoration */}
    <rect
      x="12"
      y="10"
      width="32"
      height="24"
      rx="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="3 2"
      opacity="0.4"
    />

    {/* Star emblem at top */}
    <path
      d="M28 14L29.5 17L33 17.5L30.5 20L31 23.5L28 22L25 23.5L25.5 20L23 17.5L26.5 17L28 14Z"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* Text lines */}
    <line x1="18" y1="28" x2="38" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <line x1="22" y1="33" x2="34" y2="33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />

    {/* Ribbon left */}
    <path
      d="M20 38V56L26 50L32 56V38"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Ribbon right */}
    <path
      d="M32 38V56L38 50L44 56V38"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Badge circle */}
    <circle cx="50" cy="14" r="10" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
    <path d="M46 14L49 17L54 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Satisfaction Guaranteed Icon - Shield with checkmark and guarantee badge
export const GuaranteeIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Shield shape */}
    <path
      d="M32 4L8 14V30C8 44 18 54 32 60C46 54 56 44 56 30V14L32 4Z"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Inner shield */}
    <path
      d="M32 10L14 18V30C14 40 22 48 32 52C42 48 50 40 50 30V18L32 10Z"
      fill="currentColor"
      fillOpacity="0.08"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.5"
    />

    {/* Checkmark */}
    <path
      d="M22 30L29 37L42 24"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Sparkles */}
    <circle cx="52" cy="8" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="12" cy="10" r="1.5" fill="currentColor" opacity="0.4" />
    <path d="M56 20L57 22L59 23L57 24L56 26L55 24L53 23L55 22L56 20Z" fill="currentColor" opacity="0.4" />
  </svg>
);

// Learn Don't Copy Icon - Brain with lightbulb/understanding
export const LearnIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Open book base */}
    <path
      d="M32 52C32 52 24 50 16 50C8 50 4 52 4 52V20C4 20 8 18 16 18C24 18 32 20 32 20"
      fill="currentColor"
      fillOpacity="0.08"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M32 52C32 52 40 50 48 50C56 50 60 52 60 52V20C60 20 56 18 48 18C40 18 32 20 32 20"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <line x1="32" y1="20" x2="32" y2="52" stroke="currentColor" strokeWidth="2" />

    {/* Lightbulb above book */}
    <g transform="translate(22, 2)">
      {/* Bulb glow */}
      <circle cx="10" cy="10" r="12" fill="currentColor" fillOpacity="0.1" />
      {/* Bulb */}
      <path
        d="M10 2C5.58 2 2 5.58 2 10C2 12.76 3.48 15.14 5.7 16.46V18C5.7 18.55 6.15 19 6.7 19H13.3C13.85 19 14.3 18.55 14.3 18V16.46C16.52 15.14 18 12.76 18 10C18 5.58 14.42 2 10 2Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Bulb base */}
      <rect x="6.5" y="19" width="7" height="2" rx="0.5" fill="currentColor" fillOpacity="0.4" />
      <rect x="7" y="21" width="6" height="1.5" rx="0.5" fill="currentColor" fillOpacity="0.3" />
      {/* Light rays */}
      <line x1="10" y1="-2" x2="10" y2="0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="2" y1="2" x2="4" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="18" y1="2" x2="16" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </g>

    {/* Understanding arrows/flow */}
    <path d="M12 32L20 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <path d="M44 32L52 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <circle cx="16" cy="32" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="48" cy="32" r="2" fill="currentColor" opacity="0.5" />
  </svg>
);

// Fast Turnaround Icon - Speedometer/clock with speed lines
export const FastIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Speedometer arc */}
    <path
      d="M12 44C12 32.954 20.954 24 32 24C43.046 24 52 32.954 52 44"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Inner arc */}
    <path
      d="M18 44C18 36.268 24.268 30 32 30C39.732 30 46 36.268 46 44"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.3"
    />

    {/* Speed tick marks */}
    <line x1="14" y1="44" x2="18" y2="44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="17" y1="34" x2="20" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="26" x2="32" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="47" y1="34" x2="44" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="50" y1="44" x2="46" y2="44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

    {/* Needle pointing to fast */}
    <path
      d="M32 44L44 34"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="32" cy="44" r="4" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />

    {/* Speed lines */}
    <g opacity="0.5">
      <line x1="4" y1="36" x2="10" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="44" x2="8" y2="44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="52" x2="10" y2="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Fast label area */}
    <text x="42" y="58" fill="currentColor" fontSize="8" fontWeight="bold" opacity="0.6">FAST</text>

    {/* Lightning bolt */}
    <path
      d="M54 10L50 20H56L52 30L60 16H54L58 10H54Z"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

// Same Tutor Icon - Two people with heart/connection
export const SameTutorIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Connection arc */}
    <path
      d="M18 28C18 20 26 16 32 22C38 16 46 20 46 28"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="3 2"
      opacity="0.4"
    />

    {/* Heart in center */}
    <path
      d="M32 24C30 22 26 22 26 26C26 30 32 34 32 34C32 34 38 30 38 26C38 22 34 22 32 24Z"
      fill="currentColor"
      fillOpacity="0.25"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Tutor (left) */}
    <g transform="translate(4, 24)">
      <circle cx="12" cy="8" r="8" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
      {/* Graduation cap */}
      <path d="M4 6L12 2L20 6L12 10L4 6Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="18" y1="7" x2="18" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Body */}
      <path
        d="M0 36C0 28 5.373 22 12 22C18.627 22 24 28 24 36"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>

    {/* Student (right) */}
    <g transform="translate(36, 28)">
      <circle cx="12" cy="8" r="7" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
      {/* Body */}
      <path
        d="M2 32C2 25.373 6.477 20 12 20C17.523 20 22 25.373 22 32"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Book */}
      <rect x="7" y="22" width="10" height="7" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
    </g>

    {/* Calendar dots indicating recurring */}
    <g transform="translate(24, 54)">
      <circle cx="4" cy="4" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
      <circle cx="16" cy="4" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
      <line x1="7" y1="4" x2="13" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </g>
  </svg>
);

// Proven Results Icon - Chart with upward trend and star
export const ResultsIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Chart background */}
    <rect
      x="6"
      y="12"
      width="44"
      height="40"
      rx="3"
      fill="currentColor"
      fillOpacity="0.08"
      stroke="currentColor"
      strokeWidth="2"
    />

    {/* Grid lines */}
    <line x1="6" y1="28" x2="50" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <line x1="6" y1="36" x2="50" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <line x1="6" y1="44" x2="50" y2="44" stroke="currentColor" strokeWidth="1" opacity="0.2" />

    {/* Bar chart bars */}
    <rect x="12" y="38" width="6" height="10" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
    <rect x="22" y="32" width="6" height="16" rx="1" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1" />
    <rect x="32" y="26" width="6" height="22" rx="1" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
    <rect x="42" y="18" width="6" height="30" rx="1" fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1" />

    {/* Trend line */}
    <path
      d="M15 36L25 30L35 24L45 16"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Arrow at end of trend */}
    <path d="M42 14L45 16L43 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

    {/* Success badge */}
    <circle cx="54" cy="16" r="8" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M54 12L55.2 14.5L58 14.9L56 16.8L56.4 19.6L54 18.3L51.6 19.6L52 16.8L50 14.9L52.8 14.5L54 12Z"
      fill="currentColor"
      fillOpacity="0.4"
      stroke="currentColor"
      strokeWidth="1"
    />

    {/* 95% label */}
    <text x="14" y="20" fill="currentColor" fontSize="8" fontWeight="bold" opacity="0.6">95%</text>
  </svg>
);

// Avatar 1 - Female with medium hair (Jennifer)
export const AvatarFemale1: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Background circle */}
    <circle cx="32" cy="32" r="30" fill="currentColor" fillOpacity="0.1" />

    {/* Hair back */}
    <path
      d="M16 28C16 28 14 42 18 52C20 56 24 58 32 58C40 58 44 56 46 52C50 42 48 28 48 28"
      fill="currentColor"
      fillOpacity="0.6"
    />

    {/* Face */}
    <ellipse cx="32" cy="34" rx="14" ry="16" fill="#FBE4D5" />

    {/* Hair front */}
    <path
      d="M18 30C18 20 24 12 32 12C40 12 46 20 46 30C46 30 44 24 32 24C20 24 18 30 18 30Z"
      fill="currentColor"
      fillOpacity="0.7"
    />

    {/* Hair sides */}
    <path
      d="M18 30C18 30 16 34 16 40C16 44 17 48 18 50"
      stroke="currentColor"
      strokeOpacity="0.6"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M46 30C46 30 48 34 48 40C48 44 47 48 46 50"
      stroke="currentColor"
      strokeOpacity="0.6"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Eyes */}
    <ellipse cx="26" cy="34" rx="2" ry="2.5" fill="#4A4A4A" />
    <ellipse cx="38" cy="34" rx="2" ry="2.5" fill="#4A4A4A" />

    {/* Eye highlights */}
    <circle cx="26.5" cy="33.5" r="0.8" fill="white" />
    <circle cx="38.5" cy="33.5" r="0.8" fill="white" />

    {/* Eyebrows */}
    <path d="M23 30C24 29 26 29 28 30" stroke="#6B5B4F" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M36 30C38 29 40 29 41 30" stroke="#6B5B4F" strokeWidth="1.5" strokeLinecap="round" />

    {/* Nose */}
    <path d="M32 36V40" stroke="#E5C4B0" strokeWidth="1.5" strokeLinecap="round" />

    {/* Smile */}
    <path
      d="M27 44C29 46 35 46 37 44"
      stroke="#C96B5A"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Blush */}
    <ellipse cx="23" cy="42" rx="3" ry="2" fill="#F5C0B0" fillOpacity="0.5" />
    <ellipse cx="41" cy="42" rx="3" ry="2" fill="#F5C0B0" fillOpacity="0.5" />
  </svg>
);

// Avatar 2 - Male with short hair (Michael)
export const AvatarMale1: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Background circle */}
    <circle cx="32" cy="32" r="30" fill="currentColor" fillOpacity="0.1" />

    {/* Neck/Shirt hint */}
    <path
      d="M24 54C24 54 26 58 32 58C38 58 40 54 40 54"
      fill="currentColor"
      fillOpacity="0.3"
    />

    {/* Face */}
    <ellipse cx="32" cy="34" rx="13" ry="15" fill="#F5DCC8" />

    {/* Hair */}
    <path
      d="M19 28C19 20 25 14 32 14C39 14 45 20 45 28C45 28 44 22 32 22C20 22 19 28 19 28Z"
      fill="currentColor"
      fillOpacity="0.7"
    />

    {/* Hair top detail */}
    <path
      d="M24 18C26 16 30 15 32 15C34 15 38 16 40 18"
      stroke="currentColor"
      strokeOpacity="0.5"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* Ears */}
    <ellipse cx="19" cy="36" rx="3" ry="4" fill="#F5DCC8" />
    <ellipse cx="45" cy="36" rx="3" ry="4" fill="#F5DCC8" />

    {/* Eyes */}
    <ellipse cx="26" cy="34" rx="2.5" ry="2.5" fill="#4A4A4A" />
    <ellipse cx="38" cy="34" rx="2.5" ry="2.5" fill="#4A4A4A" />

    {/* Eye highlights */}
    <circle cx="26.8" cy="33.5" r="0.8" fill="white" />
    <circle cx="38.8" cy="33.5" r="0.8" fill="white" />

    {/* Eyebrows */}
    <path d="M22 30C24 28 27 28 29 29" stroke="#5B4A3F" strokeWidth="2" strokeLinecap="round" />
    <path d="M35 29C37 28 40 28 42 30" stroke="#5B4A3F" strokeWidth="2" strokeLinecap="round" />

    {/* Nose */}
    <path d="M32 36V41L30 42" stroke="#E5C4B0" strokeWidth="1.5" strokeLinecap="round" />

    {/* Smile */}
    <path
      d="M27 45C29 47 35 47 37 45"
      stroke="#B85B4A"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Avatar 3 - Female with different hairstyle (Sarah)
export const AvatarFemale2: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Background circle */}
    <circle cx="32" cy="32" r="30" fill="currentColor" fillOpacity="0.1" />

    {/* Hair back - longer flowing */}
    <path
      d="M14 32C14 32 12 46 16 54C18 58 24 60 32 60C40 60 46 58 48 54C52 46 50 32 50 32"
      fill="currentColor"
      fillOpacity="0.5"
    />

    {/* Face */}
    <ellipse cx="32" cy="34" rx="13" ry="15" fill="#FCEEE5" />

    {/* Hair front - wavy style */}
    <path
      d="M19 30C19 18 25 12 32 12C39 12 45 18 45 30C45 30 42 20 32 20C22 20 19 30 19 30Z"
      fill="currentColor"
      fillOpacity="0.6"
    />

    {/* Hair wave detail left */}
    <path
      d="M19 30C17 32 15 38 15 44C15 48 16 52 17 54"
      stroke="currentColor"
      strokeOpacity="0.5"
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* Hair wave detail right */}
    <path
      d="M45 30C47 32 49 38 49 44C49 48 48 52 47 54"
      stroke="currentColor"
      strokeOpacity="0.5"
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* Hair accessory - small clip */}
    <circle cx="42" cy="22" r="3" fill="currentColor" fillOpacity="0.8" />
    <circle cx="42" cy="22" r="1.5" fill="white" fillOpacity="0.5" />

    {/* Eyes */}
    <ellipse cx="26" cy="34" rx="2" ry="2.5" fill="#4A4A4A" />
    <ellipse cx="38" cy="34" rx="2" ry="2.5" fill="#4A4A4A" />

    {/* Eye highlights */}
    <circle cx="26.5" cy="33.5" r="0.8" fill="white" />
    <circle cx="38.5" cy="33.5" r="0.8" fill="white" />

    {/* Eyelashes hint */}
    <path d="M24 31.5C24.5 31 25.5 31 26 31.5" stroke="#4A4A4A" strokeWidth="1" strokeLinecap="round" />
    <path d="M38 31.5C38.5 31 39.5 31 40 31.5" stroke="#4A4A4A" strokeWidth="1" strokeLinecap="round" />

    {/* Eyebrows */}
    <path d="M23 30C24.5 29 26.5 29 28 30" stroke="#7B6B5F" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M36 30C37.5 29 39.5 29 41 30" stroke="#7B6B5F" strokeWidth="1.5" strokeLinecap="round" />

    {/* Nose */}
    <path d="M32 37V40" stroke="#E8D0C0" strokeWidth="1.5" strokeLinecap="round" />

    {/* Smile */}
    <path
      d="M28 44C30 46 34 46 36 44"
      stroke="#C96B5A"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Blush */}
    <ellipse cx="23" cy="41" rx="3" ry="2" fill="#F5C0B0" fillOpacity="0.4" />
    <ellipse cx="41" cy="41" rx="3" ry="2" fill="#F5C0B0" fillOpacity="0.4" />
  </svg>
);

// Weekly Tutoring Icon - Shows a tutor and student with ongoing connection/growth
export const WeeklyTutoringIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Connection arc between tutor and student */}
    <path
      d="M18 32C18 22 32 18 46 32"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="4 2"
      opacity="0.4"
    />

    {/* Tutor (left side) */}
    <g transform="translate(6, 20)">
      {/* Head */}
      <circle
        cx="12"
        cy="8"
        r="8"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Body */}
      <path
        d="M0 36C0 28 5.37258 22 12 22C18.6274 22 24 28 24 36"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Graduation cap on tutor */}
      <path
        d="M4 6L12 2L20 6L12 10L4 6Z"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M18 7V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="16" y="11" width="4" height="2" rx="1" fill="currentColor" fillOpacity="0.4" />
    </g>

    {/* Student (right side) */}
    <g transform="translate(34, 24)">
      {/* Head */}
      <circle
        cx="12"
        cy="8"
        r="7"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Body */}
      <path
        d="M2 32C2 25 6.47715 20 12 20C17.5228 20 22 25 22 32"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Book in hands */}
      <rect
        x="6"
        y="22"
        width="12"
        height="8"
        rx="1"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line x1="12" y1="22" x2="12" y2="30" stroke="currentColor" strokeWidth="1" />
    </g>

    {/* Calendar/schedule indicator (bottom left) */}
    <g transform="translate(2, 48)">
      <rect
        x="0"
        y="0"
        width="16"
        height="14"
        rx="2"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Calendar header */}
      <rect x="0" y="0" width="16" height="4" rx="2" fill="currentColor" fillOpacity="0.2" />
      {/* Calendar dots (representing scheduled sessions) */}
      <circle cx="4" cy="8" r="1.5" fill="currentColor" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      <circle cx="12" cy="8" r="1.5" fill="currentColor" />
      <circle cx="4" cy="11.5" r="1.5" fill="currentColor" fillOpacity="0.4" />
      <circle cx="8" cy="11.5" r="1.5" fill="currentColor" fillOpacity="0.4" />
    </g>

    {/* Growth chart (bottom right) */}
    <g transform="translate(44, 46)">
      {/* Chart background */}
      <rect
        x="0"
        y="0"
        width="18"
        height="16"
        rx="2"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Upward trend line */}
      <path
        d="M3 13L7 9L11 11L15 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrow at the end */}
      <path
        d="M13 4L15 5L14 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>

    {/* Sparkles indicating learning/progress */}
    <g opacity="0.6">
      <path d="M28 10L29 12L31 13L29 14L28 16L27 14L25 13L27 12L28 10Z" fill="currentColor" />
      <path d="M52 18L52.5 19.5L54 20L52.5 20.5L52 22L51.5 20.5L50 20L51.5 19.5L52 18Z" fill="currentColor" />
    </g>
  </svg>
);
