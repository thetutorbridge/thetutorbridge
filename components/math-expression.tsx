'use client';

import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathExpressionProps {
  expression: string;
  displayMode?: boolean;
  className?: string;
}

export function MathExpression({ expression, displayMode = false, className = '' }: MathExpressionProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(expression, containerRef.current, {
          displayMode,
          throwOnError: false,
          output: 'html',
        });
      } catch (error) {
        // If KaTeX fails, show the plain text
        if (containerRef.current) {
          containerRef.current.textContent = expression;
        }
      }
    }
  }, [expression, displayMode]);

  return <span ref={containerRef} className={className} />;
}
