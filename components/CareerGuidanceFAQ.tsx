"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "Is career guidance only for higher classes?",
    answer: "No! We provide career guidance for students from Class 6 onwards. Early guidance helps students make informed subject choices and develop the right skills from a young age. Our counselors work with students at different stages - from middle school subject selection to college applications and beyond."                            
  },
  {
    question: "Do you provide international career counseling?",
    answer: "Yes, we offer comprehensive study abroad guidance including university selection, scholarship opportunities, application processes, and visa guidance for students planning to study internationally. We have partnerships with educational consultants worldwide and stay updated with the latest admission requirements and trends."   
  },
  {
    question: "How many sessions are needed for effective guidance?",
    answer: "It varies based on individual needs. Some students benefit from a single comprehensive session, while others prefer ongoing mentorship over 3-6 months for continuous support and progress tracking. We offer flexible packages to suit different requirements and budgets."    
  },
  {
    question: "What makes your career guidance different?",
    answer: "Our approach combines personalized assessment, industry insights, and continuous mentorship. We focus on understanding each student's unique strengths, interests, and goals to create tailored career roadmaps. Our counselors have real-world industry experience and stay updated with current market trends."                                                                                                    
  },
  {
    question: "Do you help with scholarship applications?",
    answer: "Absolutely! We provide guidance on identifying suitable scholarships, application processes, essay writing, and interview preparation to help students secure financial aid for their education. We maintain a database of current scholarship opportunities and help students craft compelling applications."        
  },
  {
    question: "What assessment tools do you use?",
    answer: "We use a combination of standardized aptitude tests, personality assessments, interest inventories, and skill evaluations. Our assessments are designed to identify not just academic strengths but also soft skills, learning styles, and career inclinations to provide comprehensive guidance."
  },
  {
    question: "Do you work with parents as well?",
    answer: "Yes, we believe in involving parents in the career guidance process. We conduct separate sessions with parents to address their concerns, explain career options, and help them understand how to support their child's career journey effectively."
  },
  {
    question: "What if my child is unsure about their interests?",
    answer: "This is very common! Our counselors are trained to help students explore different fields through various activities, career talks, and exposure sessions. We use interest exploration tools and provide opportunities to learn about different careers before making decisions."
  },
  {
    question: "How do you stay updated with career trends?",
    answer: "Our team regularly attends industry conferences, maintains partnerships with universities and companies, and conducts market research. We also have a network of industry professionals who provide insights into emerging career opportunities and changing job market demands."
  },
  {
    question: "What is the cost of career guidance sessions?",
    answer: "We offer various packages to suit different needs and budgets. Our initial consultation is free, and we provide transparent pricing for all our services. We also offer group sessions and family packages to make our services accessible to more students."
  }
]

export default function CareerGuidanceFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    console.log('Career FAQ clicked:', index, 'Current openIndex:', openIndex)
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Get answers to common questions about our career guidance services and approach.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:ring-opacity-50 rounded-lg"
              >
                <h3 className="text-lg font-semibold text-[#1A3D7C] pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#1A3D7C] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#1A3D7C] flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="pb-6 px-2">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
