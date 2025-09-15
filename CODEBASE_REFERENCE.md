# Next.js Codebase Structure Reference - The Tutor Bridge

## Overview
This document provides a comprehensive reference for creating consistent pages in The Tutor Bridge Next.js application, based on analysis of the existing `/app/study-resources/class-6/science/` chapters.

---

## 1. File Structure & Organization

### Study Resources Hierarchy
```
app/study-resources/
├── class-6/
│   ├── science/
│   │   ├── layout.tsx                               # Subject-level layout
│   │   ├── chapter-1-the-wonderful-world-of-science/
│   │   │   ├── layout.tsx                          # Chapter-specific layout (optional)
│   │   │   └── page.tsx                            # Chapter content
│   │   ├── chapter-2-diversity-in-the-living-world/
│   │   ├── chapter-3-mindful-eating-a-path-to-a-healthy-body/
│   │   ├── chapter-4-exploring-magnets/
│   │   ├── chapter-5-measurement-of-length-and-motion/
│   │   ├── chapter-6-materials-around-us/
│   │   └── chapter-7-temperature-and-its-measurement/
│   ├── layout.tsx                                  # Class-level layout
│   └── page.tsx                                    # Class listing page
├── layout.tsx                                      # Study resources layout
└── page.tsx                                        # Main study resources page
```

### Naming Conventions
- **Folders**: `kebab-case` (lowercase with hyphens)
- **Chapters**: `chapter-{number}-{descriptive-title}`
- **Files**: `page.tsx` for content, `layout.tsx` for metadata/layout
- **Components**: `PascalCase`

---

## 2. Metadata & SEO Pattern

### Metadata Structure (Consistent Pattern)
```tsx
export const metadata: Metadata = {
  title: 'Class X Subject Chapter Y Notes – Chapter Title (Key Features)',
  description: 'Get Class X Subject Chapter Y notes – Chapter Title. Covers [key topics], [key concepts], [practical examples], and exam-ready key points with daily life examples.',
};
```

### Real Examples:
```tsx
// Chapter 1
title: 'Class 6 Science Chapter 1 Notes – The Wonderful World of Science'
description: 'Complete Class 6 Science Chapter 1 notes covering curiosity, scientific method, daily life science, and discovery processes with engaging examples.'

// Chapter 7
title: 'Class 6 Science Chapter 7 Notes – Temperature and Its Measurement (Clinical & Lab Thermometers)'
description: 'Get Class 6 Science Chapter 7 notes – Temperature and Its Measurement. Covers hot vs cold, clinical and laboratory thermometers, correct measurement steps, least count, kelvin conversion, air temperature, safety tips, activities, and exam-ready key points with daily life examples.'
```

### Layout Metadata (Subject Level)
```tsx
export const metadata: Metadata = {
  title: "Class 6 Science Study Resources",
  description: "Complete Class 6 Science study materials including all chapters covering physics, chemistry, and biology concepts. Free notes, explanations, and practice questions.",
  keywords: "class 6 science, grade 6 science, 6th grade science notes, science study materials, physics chemistry biology class 6",
  openGraph: {
    title: "Class 6 Science Study Resources",
    description: "Complete Class 6 Science study materials including all chapters covering physics, chemistry, and biology concepts. Free notes, explanations, and practice questions.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 6 Science - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 6 Science Study Resources",
    description: "Complete Class 6 Science study materials including all chapters covering physics, chemistry, and biology concepts.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-6/science",
  },
}
```

---

## 3. Component Architecture

### Required Imports (Standard Pattern)
```tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { [ICONS] } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
```

### Icon Usage Patterns
```tsx
// Common icons by context:
- Home: breadcrumbs home link
- GraduationCap: class/education related
- Beaker: science subject
- Calculator: math subject
- BookOpen: general content/reading
- ArrowLeft: back navigation
- Lightbulb: key ideas/tips
- Target: objectives/goals
- CheckCircle: success/completion
- TestTube: experiments/activities
- Mail: contact information
- Thermometer: temperature (Chapter 7 specific)
- Apple: food/nutrition (Chapter 3 specific)
- Leaf: nature/biology (Chapter 2 specific)
```

### Component Structure (Consistent Order)
1. **Navigation** - `<Navigation />`
2. **Breadcrumb Navigation**
3. **Hero Section**
4. **Main Content** (organized in `<main>` tag)
5. **CTA Section**
6. **Footer**

---

## 4. Navigation Structure

### Breadcrumb Implementation
```tsx
<div className="bg-gray-50 py-4 px-6">
  <div className="container mx-auto">
    <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto">
      <Link href="/study-resources" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center whitespace-nowrap">
        <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
        <span className="hidden sm:inline">Study Resources</span>
        <span className="sm:hidden">Resources</span>
      </Link>
      <span className="text-gray-400">/</span>
      <Link href="/study-resources/class-6" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center whitespace-nowrap">
        <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
        <span className="hidden sm:inline">Class 6</span>
        <span className="sm:hidden">C6</span>
      </Link>
      <span className="text-gray-400">/</span>
      <Link href="/study-resources/class-6/science" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center whitespace-nowrap">
        <Beaker className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
        <span className="hidden sm:inline">Science</span>
        <span className="sm:hidden">Sci</span>
      </Link>
      <span className="text-gray-400">/</span>
      <span className="text-gray-600 truncate max-w-[200px] sm:max-w-none">
        <span className="hidden sm:inline">Chapter X - Full Chapter Title</span>
        <span className="sm:hidden">Ch X</span>
      </span>
    </nav>
  </div>
</div>
```

### Hero Section Pattern
```tsx
<section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-6">
  <div className="container mx-auto text-center max-w-4xl">
    <div className="flex items-center justify-center mb-6">
      <[RelevantIcon] className="w-12 h-12 text-[#FFC857] mr-4" />
      <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight">
        Chapter X: Chapter Title
      </h1>
    </div>
    <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
      Compelling description of what students will learn
    </p>
    <div className="bg-white/10 p-4 rounded-xl mb-8">
      <p className="text-lg italic">Engaging hook or quote<br />
      <strong>Key learning outcome</strong></p>
    </div>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="/study-resources/class-6/science">
        <Button size="lg" variant="outline" className="border-2 border-white text-white rounded-xl px-8 py-4 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Class 6 Science
        </Button>
      </Link>
      <Link href="/book-demo-class">
        <Button size="lg" className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-4 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold">
          Book Free Session
        </Button>
      </Link>
    </div>
  </div>
</section>
```

---

## 5. Content Structure

### Section Organization Pattern
1. **Big Ideas/Introduction** - Key concepts overview
2. **Main Content Sections** - Organized by topic
3. **Activities/Mini-Labs** - Hands-on learning
4. **HOTS Questions** - Higher Order Thinking Skills
5. **Quick Recap** - Summary points
6. **Suggested Visuals** - Visual aids recommendations

### Section Header Pattern
```tsx
<section className="mb-12">
  <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
    <[RelevantIcon] className="w-8 h-8 mr-3 text-[#2BAE66]" />
    Section Title
  </h2>
  {/* Content */}
</section>
```

### Big Ideas Section (Consistent Structure)
```tsx
<section className="mb-12">
  <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
    <h2 className="text-2xl font-bold mb-6 flex items-center">
      <Lightbulb className="w-6 h-6 mr-3 text-[#FFC857]" />
      Big Ideas
    </h2>
    <ul className="space-y-3 text-lg" style={{ wordSpacing: 'normal', letterSpacing: 'normal' }}>
      <li className="flex items-start">
        <span className="w-2 h-2 bg-[#FFC857] rounded-full mt-2 mr-3 flex-shrink-0"></span>
        <span><strong>Key concept:</strong> explanation with <em>emphasis</em>.</span>
      </li>
    </ul>
    <div className="mt-6 p-4 bg-[#FFC857]/10 rounded-lg">
      <h3 className="font-semibold text-[#FFC857] mb-2">💡 Memory Hook</h3>
      <p className="text-white">Memory technique or mnemonic device</p>
    </div>
  </div>
</section>
```

### Content Card Pattern
```tsx
<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
  <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Section Title</h3>
  <p className="text-gray-700">Content goes here</p>
</div>
```

---

## 6. Styling Patterns

### Brand Colors (Consistent Usage)
```css
/* Primary colors */
--primary-blue: #1A3D7C     /* Headings, links, borders */
--primary-green: #2BAE66    /* Icons, accents, highlights */
--accent-yellow: #FFC857    /* CTAs, special highlights */

/* Background gradients */
background: gradient from-[#1A3D7C] to-[#2BAE66]

/* Text colors */
text-[#1A3D7C]   /* Main headings */
text-gray-700    /* Body text */
text-gray-600    /* Secondary text */
text-white/90    /* Hero text with opacity */
```

### Layout Structure
```css
/* Container pattern */
container mx-auto max-w-4xl    /* Main content */
container mx-auto max-w-7xl   /* Full width sections */

/* Spacing pattern */
py-16 px-6    /* Section padding */
mb-12         /* Section bottom margin */
mb-6          /* Subsection margin */

/* Card styling */
bg-white p-6 rounded-lg shadow-sm border border-gray-200
```

### Typography
```css
/* Headings */
font-poppins font-bold    /* Main headings with Poppins font */
text-3xl md:text-5xl     /* Responsive heading sizes */

/* Body text */
text-lg                  /* Large body text */
leading-relaxed          /* Comfortable line height */
```

---

## 7. Technical Implementation

### Import Patterns
```tsx
// Standard imports (in this order)
import { Metadata } from 'next';
import Link from 'next/link';
import { [ICONS_LIST] } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
```

### TypeScript Usage
- All files use TypeScript (.tsx extension)
- Metadata objects properly typed with `Metadata` interface
- React component props typed when used
- Event handlers properly typed

### Component Naming
- Default exports use descriptive names: `Chapter1Page`, `Chapter2Page`
- Function names match the chapter content
- Consistent naming pattern: `Chapter{Number}Page`

---

## 8. CTA and Footer Patterns

### CTA Section
```tsx
<section className="text-center py-12">
  <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
    <h2 className="text-2xl md:text-3xl font-bold mb-4">
      Need Help Understanding [Topic]?
    </h2>
    <p className="text-lg mb-6 opacity-90">
      Our expert mentors can help you master [concepts] with [methods].
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="/book-demo-class">
        <button className="bg-[#FFC857] text-[#1A3D7C] px-8 py-3 rounded-xl font-semibold hover:bg-[#FFC857]/90 transition-colors">
          Book Free Session
        </button>
      </Link>
      <Link href="/contact">
        <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#1A3D7C] transition-colors">
          Contact Us
        </button>
      </Link>
    </div>
  </div>
</section>
```

### Footer Pattern
```tsx
<footer className="bg-[#1A3D7C] text-white py-12 px-6">
  <div className="container mx-auto max-w-7xl">
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Brand */}
      <div className="text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
          <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
          <span className="text-xl font-bold">The TutorBridge</span>
        </div>
        <p className="text-gray-300 mb-4">
          Empowering students with personalized education and career guidance for a brighter future.
        </p>
      </div>

      {/* Quick Links */}
      <div className="text-center md:text-left">
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2 text-gray-300">
          <li><Link href="/study-resources" className="hover:text-[#2BAE66] transition-colors">Study Resources</Link></li>
          <li><Link href="/doubt-solving" className="hover:text-[#2BAE66] transition-colors">Doubt Solving</Link></li>
          <li><Link href="/career-guidance" className="hover:text-[#2BAE66] transition-colors">Career Guidance</Link></li>
          <li><Link href="/motivational-sessions" className="hover:text-[#2BAE66] transition-colors">Motivational Sessions</Link></li>
        </ul>
      </div>

      {/* Contact */}
      <div className="text-center md:text-left">
        <h3 className="text-lg font-semibold mb-4">Contact</h3>
        <div className="space-y-2 text-gray-300">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Mail className="w-4 h-4" />
            <span>+91 9310096171</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Mail className="w-4 h-4" />
            <span>info@thetutorbridge.com</span>
          </div>
        </div>
      </div>
    </div>

    <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
      <p>&copy; 2025 The TutorBridge. All rights reserved.</p>
    </div>
  </div>
</footer>
```

---

## 9. IDENTIFIED ISSUES

### Chapter 7 "Package is not defined" Error

**Issue Location**: `/app/study-resources/class-6/science/chapter-7-temperature-and-its-measurement/page.tsx` - Line 138

**Problem**: The component uses `<Package className="w-8 h-8 mr-3 text-[#2BAE66]" />` but `Package` is not imported from lucide-react.

**Solutions**:
1. **Add Package to imports**: Add `Package` to the lucide-react import statement
2. **Replace with existing icon**: Use `Box` (already imported) or another suitable icon
3. **Use a more contextually appropriate icon**: Since this is about materials, consider `Box`, `Layers`, or `Archive`

**Recommended Fix**: Replace `Package` with `Box` on line 138 and line 359, as `Box` is already imported and contextually appropriate for materials/containers.

---

## 10. BEST PRACTICES

### Content Writing
- Use clear, student-friendly language
- Include memory hooks and mnemonics
- Provide real-world examples
- Structure content with bullet points and numbered lists
- Use emojis sparingly for visual breaks

### Accessibility
- Proper heading hierarchy (h1 → h2 → h3)
- Descriptive alt text for images
- Good color contrast ratios
- Responsive design for all screen sizes

### Performance
- Optimize images with Next.js Image component
- Use proper semantic HTML
- Minimize large imports
- Efficient CSS classes with Tailwind

### SEO
- Descriptive page titles and meta descriptions
- Proper heading structure
- Internal linking structure
- Canonical URLs for layouts

---

## 11. TEMPLATE FOR NEW CHAPTER

```tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, [RELEVANT_ICONS] } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Class 6 Science Chapter X Notes – [Chapter Title] ([Key Features])',
  description: 'Get Class 6 Science Chapter X notes – [Chapter Title]. Covers [key topics], and exam-ready key points with daily life examples.',
};

export default function ChapterXPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Breadcrumb Navigation - COPY PATTERN */}

      {/* Hero Section - ADAPT FOR CHAPTER */}

      {/* Main Content */}
      <main className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">

          {/* Big Ideas Section - REQUIRED */}

          {/* Chapter-specific sections */}

          {/* HOTS Questions - RECOMMENDED */}

          {/* Quick Recap - REQUIRED */}

          {/* CTA Section - REQUIRED */}

        </div>
      </main>

      {/* Footer - COPY EXACT PATTERN */}

    </div>
  );
}
```

This comprehensive reference document should provide all the patterns, structures, and conventions needed to create consistent chapter pages in the codebase. The identified Package import issue in Chapter 7 should be fixed by replacing it with the `Box` icon that's already imported.
