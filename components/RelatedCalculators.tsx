import Link from 'next/link';
import { Calculator } from 'lucide-react';

interface RelatedCalculator {
  title: string;
  description: string;
  href: string;
}

interface RelatedCalculatorsProps {
  calculators: RelatedCalculator[];
  variant?: 'default' | 'compact';
}

export function RelatedCalculators({ calculators, variant = 'default' }: RelatedCalculatorsProps) {
  if (calculators.length === 0) return null;

  return (
    <section className="bg-white py-12 px-6 border-t border-gray-200">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Calculator className="w-6 h-6 mr-2 text-[#2BAE66]" />
          Related Calculators
        </h2>
        <div className={`grid ${variant === 'compact' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'} gap-6`}>
          {calculators.map((calc, index) => (
            <Link key={index} href={calc.href} className="group">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-[#2BAE66] hover:shadow-lg transition-all h-full">
                <div className="flex items-start gap-3 mb-2">
                  <Calculator className="w-5 h-5 text-[#2BAE66] flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#2BAE66] line-clamp-2">
                    {calc.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 pl-8">
                  {calc.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
