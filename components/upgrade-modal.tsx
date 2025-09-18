"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Zap, Star, CheckCircle, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalGuides: number;
}

export function UpgradeModal({ isOpen, onClose, totalGuides }: UpgradeModalProps) {
  const plans = [
    {
      name: 'Starter',
      price: '$4.99',
      period: '/month',
      guides: '10 guides',
      description: 'Perfect for casual learners',
      features: [
        'Up to 10 study guides per month',
        'All subjects and topics',
        'PDF downloads',
        'Mobile optimized',
        'Email support'
      ],
      popular: false,
      color: 'bg-[#1A3D7C]'
    },
    {
      name: 'Student Pro',
      price: '$9.99',
      period: '/month',
      guides: '50 guides',
      description: 'Ideal for serious students',
      features: [
        'Up to 50 study guides per month',
        'Priority generation (faster)',
        'Advanced formatting options',
        'Study progress tracking',
        'Priority email support',
        'Exclusive study tips'
      ],
      popular: true,
      color: 'bg-[#2BAE66]'
    },
    {
      name: 'Unlimited',
      price: '$19.99',
      period: '/month',
      guides: 'Unlimited',
      description: 'For educators and power users',
      features: [
        'Unlimited study guides',
        'Instant generation',
        'Bulk generation tools',
        'Team collaboration features',
        'Phone + email support',
        'Custom branding options'
      ],
      popular: false,
      color: 'bg-[#FFC857]'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-[#1A3D7C] text-xl">
            <Crown className="w-6 h-6 text-[#FFC857]" />
            Upgrade to Continue Learning
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            You've used all <strong>{totalGuides} free study guides</strong>! Choose a plan to continue creating amazing study materials.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative hover:shadow-lg transition-all duration-300 ${plan.popular ? 'ring-2 ring-[#2BAE66] scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-[#2BAE66] text-white px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`w-12 h-12 ${plan.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-[#1A3D7C]">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-[#1A3D7C]">
                  {plan.price}
                  <span className="text-sm font-normal text-gray-500">{plan.period}</span>
                </div>
                <CardDescription className="text-[#2BAE66] font-semibold">{plan.guides}</CardDescription>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.color} hover:opacity-90 text-white font-semibold`}
                  onClick={() => {
                    // TODO: Implement payment integration
                    alert(`Payment integration coming soon! You selected: ${plan.name} plan`);
                  }}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-[#1A3D7C] mb-2">🎓 Why Upgrade?</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <strong>📚 Comprehensive Content:</strong> Each study guide uses advanced AI to provide deep, research-based content worth hours of manual research.
            </div>
            <div>
              <strong>💰 Great Value:</strong> At just $0.50-2.00 per guide, you're getting premium educational content at a fraction of tutoring costs.
            </div>
            <div>
              <strong>⚡ Time Saving:</strong> Generate in 30 seconds what would take hours to research and format manually.
            </div>
            <div>
              <strong>🎯 Exam Ready:</strong> Formatted specifically for effective studying and exam preparation.
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <p className="text-sm text-gray-500">
            💡 <strong>Tip:</strong> Bookmark this page to continue later!
          </p>
          <Button variant="outline" onClick={onClose} className="flex items-center gap-2">
            <X className="w-4 h-4" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
