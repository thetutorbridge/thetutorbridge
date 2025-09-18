"use client"

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Gift, Mail, User, Globe, GraduationCap, CheckCircle } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: any) => void;
  remainingFree: number;
}

export function RegistrationModal({ isOpen, onClose, onSuccess, remainingFree }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    academic_level: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/register-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const userData = await response.json();
      
      // Store user data in localStorage
      localStorage.setItem('study_guide_user', JSON.stringify(userData));
      
      onSuccess(userData);
      onClose();
    } catch (error) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-[#1A3D7C]">
            <Gift className="w-6 h-6 text-[#2BAE66]" />
            Unlock Your Bonus Guide!
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Register now to get <strong>1 additional free study guide</strong> and join our learning community.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-[#2BAE66]/10 p-4 rounded-lg mb-4">
          <div className="flex items-center gap-2 text-[#2BAE66] font-semibold">
            <CheckCircle className="w-5 h-5" />
            What you'll get:
          </div>
          <ul className="mt-2 text-sm text-gray-700 space-y-1">
            <li>• 1 bonus free study guide (total: 3 free guides)</li>
            <li>• Priority support and updates</li>
            <li>• Educational tips and resources via email</li>
            <li>• Early access to new features</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="country" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Country
            </Label>
            <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="india">🇮🇳 India</SelectItem>
                <SelectItem value="usa">🇺🇸 United States</SelectItem>
                <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                <SelectItem value="canada">🇨🇦 Canada</SelectItem>
                <SelectItem value="australia">🇦🇺 Australia</SelectItem>
                <SelectItem value="other">🌍 Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="academic_level" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Academic Level
            </Label>
            <Select value={formData.academic_level} onValueChange={(value) => setFormData({...formData, academic_level: value})}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select your academic level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high_school">High School</SelectItem>
                <SelectItem value="undergraduate">Undergraduate</SelectItem>
                <SelectItem value="graduate">Graduate</SelectItem>
                <SelectItem value="postgraduate">Postgraduate</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Maybe Later
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#2BAE66] hover:bg-[#2BAE66]/90"
              disabled={isSubmitting || !formData.name || !formData.email}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Registering...
                </>
              ) : (
                <>
                  <Gift className="w-4 h-4 mr-2" />
                  Get Bonus Guide
                </>
              )}
            </Button>
          </div>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          By registering, you agree to receive educational emails. You can unsubscribe anytime.
        </p>
      </DialogContent>
    </Dialog>
  );
}
