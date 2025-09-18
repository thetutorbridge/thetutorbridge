"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Brain, 
  Download, 
  Lightbulb, 
  Target, 
  CheckCircle, 
  Users, 
  GraduationCap,
  Sparkles,
  Languages,
  ArrowRight,
  Play,
  Star,
  Zap,
  FileText,
  Gift,
  Crown
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { RegistrationModal } from '@/components/registration-modal';
import { UpgradeModal } from '@/components/upgrade-modal';
import { getSessionId } from '@/lib/freemium';



export default function AIStudyGuideMakerPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedGuide, setGeneratedGuide] = useState<string | null>(null);
  const [fullHTML, setFullHTML] = useState<string>('');
  
  // Freemium state management
  const [sessionId, setSessionId] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  const [usageStats, setUsageStats] = useState<any>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isCheckingUsage, setIsCheckingUsage] = useState(true);

  // Initialize session and check usage on component mount
  useEffect(() => {
    const initializeSession = async () => {
      const currentSessionId = getSessionId();
      setSessionId(currentSessionId);
      
      // Check if user is stored in localStorage
      const storedUser = localStorage.getItem('study_guide_user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          localStorage.removeItem('study_guide_user');
        }
      }
      
      // Check current usage stats
      await checkCurrentUsage(currentSessionId, storedUser ? JSON.parse(storedUser).email : null);
    };
    
    initializeSession();
  }, []);

  // Function to check current usage
  const checkCurrentUsage = async (sessionId: string, userEmail?: string) => {
    try {
      const response = await fetch('/api/check-usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, userEmail })
      });
      
      if (response.ok) {
        const stats = await response.json();
        setUsageStats(stats);
      }
    } catch (error) {
      console.error('Error checking usage:', error);
    } finally {
      setIsCheckingUsage(false);
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic to generate study guide');
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate-study-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          language: selectedLanguage,
          sessionId,
          userEmail: user?.email
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle freemium restrictions
        if (errorData.error === 'REGISTRATION_REQUIRED') {
          setShowRegistrationModal(true);
          return;
        }
        
        if (errorData.error === 'UPGRADE_REQUIRED') {
          setShowUpgradeModal(true);
          return;
        }
        
        throw new Error(errorData.error || 'Failed to generate study guide');
      }

      const data = await response.json();
      setGeneratedGuide(data.studyGuide);
      setFullHTML(data.fullHTML || data.studyGuide);
      
      // Update usage stats
      if (data.usageStats) {
        setUsageStats(data.usageStats);
      }
      
      // Show note if using fallback
      if (data.note) {
        console.log('ℹ️ Note:', data.note);
      }
      
    } catch (error) {
      console.error('Error generating study guide:', error);
      alert('Failed to generate study guide. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle successful registration
  const handleRegistrationSuccess = async (userData: any) => {
    setUser(userData);
    await checkCurrentUsage(sessionId, userData.email);
    alert('🎉 Registration successful! You now have 1 additional free study guide.');
  };

  const handleDownload = async () => {
    if (!fullHTML) return;
    
    try {
      // Create a temporary div with the HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = fullHTML;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '800px';
      document.body.appendChild(tempDiv);
      
      // Convert to canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Download PDF
      pdf.save(`study-guide-${topic.toLowerCase().replace(/\s+/g, '-')}.pdf`);
      
      // Clean up
      document.body.removeChild(tempDiv);
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      // Fallback to HTML download
      const blob = new Blob([fullHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `study-guide-${topic.toLowerCase().replace(/\s+/g, '-')}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleViewFull = () => {
    if (!fullHTML) return;
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(fullHTML);
      newWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white py-12 md:py-16 px-4 md:px-6">
        <div className="container mx-auto text-center max-w-6xl">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-6 gap-4">
            <Brain className="w-12 h-12 md:w-16 md:h-16 text-[#FFC857]" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-poppins font-bold leading-tight">
              AI Study Guide Maker
            </h1>
          </div>
          <p className="text-base md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-6 md:mb-8 px-4">
            Transform your notes into stunning, visualized study guides with AI. Create personalized study materials in seconds for better exam preparation.
          </p>
          <div className="bg-white/10 p-4 md:p-6 rounded-xl mb-6 md:mb-8 mx-4">
            <p className="text-sm md:text-lg italic">
              "Make learning simpler, faster, and more engaging!"<br />
              <strong>Perfect for students, educators, and lifelong learners</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Main Tool Section */}
      <section className="py-8 md:py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 mb-8 md:mb-12">
            
            {/* Language Selection */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Languages className="w-5 h-5 md:w-6 md:h-6 text-[#2BAE66]" />
                <label className="text-base md:text-lg font-semibold text-[#1A3D7C]">Select Language:</label>
              </div>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-full sm:w-64 md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">🇺🇸 English</SelectItem>
                  <SelectItem value="hindi">🇮🇳 हिंदी (Hindi)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Usage Stats Display */}
            {!isCheckingUsage && usageStats && (
              <div className="mb-8">
                <div className="bg-gradient-to-r from-[#2BAE66]/10 to-[#1A3D7C]/10 p-4 rounded-xl border border-[#2BAE66]/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {usageStats.is_registered ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                          <span className="text-[#1A3D7C] font-semibold">
                            Welcome back, {user?.name}!
                          </span>
                        </>
                      ) : (
                        <>
                          <Gift className="w-5 h-5 text-[#FFC857]" />
                          <span className="text-[#1A3D7C] font-semibold">
                            Free User
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-white">
                        {usageStats.remaining_free} free guides left
                      </Badge>
                      {!usageStats.is_registered && usageStats.remaining_free === 1 && (
                        <Badge className="bg-[#2BAE66] text-white">
                          <Gift className="w-3 h-3 mr-1" />
                          Register for +1 bonus
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {usageStats.remaining_free === 0 && (
                    <div className="mt-3 p-3 bg-[#FFC857]/20 rounded-lg">
                      <p className="text-sm text-[#1A3D7C]">
                        <strong>🎓 Ready to unlock unlimited learning?</strong> 
                        {usageStats.is_registered 
                          ? ' Upgrade to continue creating amazing study guides!'
                          : ' Register now to get 1 bonus free guide, then upgrade for unlimited access!'
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Topic Input */}
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-bold text-[#1A3D7C] mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-[#2BAE66]" />
                Enter Your Topic
              </h3>
              <Textarea
                placeholder={selectedLanguage === 'hindi' 
                  ? "अपना विषय यहाँ लिखें... जैसे: 'प्रकाश संश्लेषण', 'भारतीय इतिहास', 'गणित के सूत्र'"
                  : "Enter your topic here... e.g., 'Photosynthesis', 'World War II', 'Algebra Basics'"
                }
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="min-h-[100px] md:min-h-[120px] text-base md:text-lg border-2 border-gray-200 focus:border-[#2BAE66] rounded-xl"
                maxLength={5000}
              />
              <div className="text-right text-sm text-gray-500 mt-2">
                {topic.length}/5000
              </div>
            </div>

            {/* Generate Button */}
            <div className="text-center mb-8">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !topic.trim()}
                size="lg"
                className="bg-[#2BAE66] hover:bg-[#2BAE66]/90 text-white px-6 md:px-12 py-3 md:py-4 text-lg md:text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin w-5 h-5 md:w-6 md:h-6 border-2 border-white border-t-transparent rounded-full mr-2 md:mr-3"></div>
                    <span className="text-sm md:text-lg">Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                    <span className="text-sm md:text-lg">Generate Study Guide</span>
                  </>
                )}
              </Button>
            </div>

            {/* Generated Study Guide Display */}
            {generatedGuide && (
              <div className="border-t-2 border-gray-200 pt-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                  <h3 className="text-xl md:text-2xl font-bold text-[#1A3D7C] flex items-center">
                    <CheckCircle className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                    Your Study Guide is Ready!
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Button
                      onClick={handleDownload}
                      className="bg-[#FFC857] hover:bg-[#FFC857]/90 text-[#1A3D7C] font-semibold rounded-xl px-4 py-2 text-sm md:text-base w-full sm:w-auto"
                    >
                      <Download className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Download PDF
                    </Button>
                    <Button
                      onClick={handleViewFull}
                      className="bg-[#1A3D7C] hover:bg-[#1A3D7C]/90 text-white font-semibold rounded-xl px-4 py-2 text-sm md:text-base w-full sm:w-auto"
                    >
                      <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      View Full Guide
                    </Button>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 md:p-6 max-h-80 md:max-h-96 overflow-y-auto border border-gray-200 shadow-lg study-guide-container">
                  <div 
                    className="text-gray-800 leading-relaxed text-sm md:text-base"
                    dangerouslySetInnerHTML={{ __html: generatedGuide }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A3D7C] mb-4">
              Why Choose Our AI Study Guide Maker?
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Experience the power of AI-driven learning with features designed for modern students and educators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2BAE66]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 md:w-8 md:h-8 text-[#2BAE66]" />
                </div>
                <CardTitle className="text-lg md:text-xl text-[#1A3D7C]">Quick & Easy Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  Transform any topic into a comprehensive study guide in just seconds. No manual formatting required.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FFC857]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Languages className="w-6 h-6 md:w-8 md:h-8 text-[#FFC857]" />
                </div>
                <CardTitle className="text-lg md:text-xl text-[#1A3D7C]">Bilingual Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  Create study guides in both English and Hindi, making learning accessible for Indian students.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#1A3D7C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 md:w-8 md:h-8 text-[#1A3D7C]" />
                </div>
                <CardTitle className="text-lg md:text-xl text-[#1A3D7C]">Research-Based Content</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  Our AI researches your topic thoroughly before generating comprehensive, factual study guides.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2BAE66]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 md:w-8 md:h-8 text-[#2BAE66]" />
                </div>
                <CardTitle className="text-lg md:text-xl text-[#1A3D7C]">Exam-Ready Format</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  Structured guides optimized for exam preparation with key points, summaries, and practice questions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FFC857]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 md:w-8 md:h-8 text-[#FFC857]" />
                </div>
                <CardTitle className="text-lg md:text-xl text-[#1A3D7C]">Easy Download</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  Download your study guides in multiple formats for offline studying and sharing with classmates.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#1A3D7C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 md:w-8 md:h-8 text-[#1A3D7C]" />
                </div>
                <CardTitle className="text-lg md:text-xl text-[#1A3D7C]">AI-Powered Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  Advanced AI analyzes your topic and creates structured, logical study guides tailored to your needs.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A3D7C] mb-4">
              How to Use the AI Study Guide Maker
            </h2>
            <p className="text-xl text-gray-600">
              Create professional study guides in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#2BAE66] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold text-[#1A3D7C] mb-4">Input Your Topic</h3>
              <p className="text-gray-600 leading-relaxed">
                Enter your study topic or paste your notes. Our AI supports both English and Hindi content for comprehensive learning.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#FFC857] text-[#1A3D7C] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold text-[#1A3D7C] mb-4">Generate Study Guide</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose your language and enter your topic. Our AI will research and create a comprehensive study guide in seconds.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold text-[#1A3D7C] mb-4">Download & Study</h3>
              <p className="text-gray-600 leading-relaxed">
                Review your personalized study guide and download it for offline use. Perfect for exam preparation and revision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A3D7C] mb-4">
              Transform Your Learning Experience
            </h2>
            <p className="text-xl text-gray-600">
              Discover how AI-powered study guides can revolutionize your academic success
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2BAE66]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] mb-2">Improved Retention</h3>
                    <p className="text-gray-600">Structured visual guides help improve information retention by up to 65% compared to traditional note-taking.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FFC857]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-[#FFC857]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] mb-2">Exam-Focused Preparation</h3>
                    <p className="text-gray-600">AI organizes content in exam-friendly formats with key points, summaries, and practice questions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1A3D7C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-[#1A3D7C]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1A3D7C] mb-2">Perfect for Group Study</h3>
                    <p className="text-gray-600">Download and share study guides with classmates for collaborative learning and group discussions.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#2BAE66]/10 to-[#1A3D7C]/10 p-8 rounded-2xl">
              <div className="text-center">
                <Brain className="w-24 h-24 text-[#2BAE66] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[#1A3D7C] mb-4">AI-Powered Learning</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our advanced AI analyzes your content and creates optimized study guides that adapt to different learning styles and academic levels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A3D7C] mb-4">
              Perfect for Every Learning Need
            </h2>
            <p className="text-xl text-gray-600">
              From students to educators, our AI study guide maker serves diverse academic requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <GraduationCap className="w-12 h-12 text-[#2BAE66] mx-auto mb-4" />
                <CardTitle className="text-[#1A3D7C]">Students</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create personalized study guides for exams, assignments, and revision sessions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Users className="w-12 h-12 text-[#FFC857] mx-auto mb-4" />
                <CardTitle className="text-[#1A3D7C]">Educators</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Design lesson plans and create review materials for classroom presentations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-[#2BAE66] mx-auto mb-4" />
                <CardTitle className="text-[#1A3D7C]">Researchers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Organize complex information into digestible, visual study guides for research projects.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Lightbulb className="w-12 h-12 text-[#FFC857] mx-auto mb-4" />
                <CardTitle className="text-[#1A3D7C]">Lifelong Learners</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Break down complex topics for self-study and professional development courses.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A3D7C] mb-4">
              What Students Say About Our AI Study Guide Maker
            </h2>
            <p className="text-xl text-gray-600">
              Real feedback from students who transformed their learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFC857] text-[#FFC857]" />
                  ))}
                </div>
                <CardTitle className="text-lg text-[#1A3D7C]">Priya Sharma</CardTitle>
                <CardDescription>Class 12 Student, Delhi</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 italic">
                  "The AI study guide maker helped me organize my physics notes perfectly. The Hindi support made it even better for understanding complex concepts!"
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFC857] text-[#FFC857]" />
                  ))}
                </div>
                <CardTitle className="text-lg text-[#1A3D7C]">Rahul Gupta</CardTitle>
                <CardDescription>Engineering Student, Mumbai</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 italic">
                  "Amazing tool! Created comprehensive study guides for my engineering subjects in minutes. The research-based content is perfectly designed for technical topics."
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFC857] text-[#FFC857]" />
                  ))}
                </div>
                <CardTitle className="text-lg text-[#1A3D7C]">Dr. Anjali Mehta</CardTitle>
                <CardDescription>High School Teacher, Bangalore</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 italic">
                  "As an educator, this tool saves me hours of lesson planning. I can create visual study materials for my students quickly and efficiently."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A3D7C] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our AI Study Guide Maker
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1A3D7C]">What is the AI Study Guide Maker?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our AI Study Guide Maker is an advanced tool that transforms your study topics into structured, comprehensive study guides. Simply input your topic and let AI create detailed study materials with research-backed content in seconds.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1A3D7C]">Is the AI Study Guide Maker free?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! Our AI Study Guide Maker is completely free to use. Create unlimited study guides without any subscription or hidden costs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1A3D7C]">Which languages are supported?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Currently, we support English and Hindi languages, making it perfect for Indian students and educators who want to create study materials in their preferred language.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1A3D7C]">Can I download the study guides?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Absolutely! You can download your generated study guides in multiple formats for offline studying, printing, or sharing with classmates and colleagues.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1A3D7C]">What subjects can I create study guides for?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our AI Study Guide Maker works with any subject - from Science, Mathematics, and History to Literature, Economics, and professional courses. The AI adapts to your content.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-12 rounded-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Study Experience?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students who are already using AI to create better study guides and achieve academic excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-4 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold"
                onClick={() => document.querySelector('textarea')?.focus()}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Creating Now
              </Button>
              <Link href="/book-demo-class">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white rounded-xl px-8 py-4 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold"
                >
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Book Free Session
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A3D7C] text-white py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
                <span className="text-xl font-bold">TheTutorBridge</span>
              </div>
              <p className="text-gray-300 mb-4">
                Empowering students with AI-powered learning tools and personalized education.
              </p>
            </div>

            {/* Services */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4 text-[#2BAE66]">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/study-resources" className="hover:text-[#2BAE66] transition-colors">Study Resources</Link></li>
                <li><Link href="/doubt-solving" className="hover:text-[#2BAE66] transition-colors">Doubt Solving</Link></li>
                <li><Link href="/career-guidance" className="hover:text-[#2BAE66] transition-colors">Career Guidance</Link></li>
                <li><Link href="/motivational-sessions" className="hover:text-[#2BAE66] transition-colors">Motivational Sessions</Link></li>
              </ul>
            </div>

            {/* AI Tools */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4 text-[#FFC857]">AI Tools</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/ai-study-guide-maker" className="hover:text-[#2BAE66] transition-colors">Study Guide Maker</Link></li>
                <li><span className="text-gray-500">Flashcard Generator (Coming Soon)</span></li>
                <li><span className="text-gray-500">Quiz Creator (Coming Soon)</span></li>
                <li><span className="text-gray-500">Note Summarizer (Coming Soon)</span></li>
              </ul>
            </div>

            {/* Company */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4 text-[#FFC857]">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/about" className="hover:text-[#2BAE66] transition-colors">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-[#2BAE66] transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-[#2BAE66] transition-colors">Contact</Link></li>
                <li><span className="text-gray-500">Privacy Policy</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 TheTutorBridge. All rights reserved. Empowering education through AI.</p>
          </div>
        </div>
      </footer>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        onSuccess={handleRegistrationSuccess}
        remainingFree={usageStats?.remaining_free || 0}
      />

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        totalGuides={usageStats?.total_guides || 0}
      />
    </div>
  );
}
