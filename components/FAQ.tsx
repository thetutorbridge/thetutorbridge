"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "What subjects do you cover?",
    answer: "We provide comprehensive support for all subjects from Class 6 to 12, including Mathematics, Science (Physics, Chemistry, Biology), English, Social Studies, and more. We also offer specialized coaching for competitive exams like JEE, NEET, and board examinations."
  },
  {
    question: "How do I book a free demo session?",
    answer: "Simply click on 'Book a Free Session' button on our website, fill out the form with your details, and our team will contact you within 24 hours to schedule your personalized demo session."
  },
  {
    question: "What makes The Tutor Bridge different?",
    answer: "We focus on personalized learning, 24/7 doubt support, and comprehensive career guidance. Our expert mentors provide one-on-one attention and create customized study plans for each student's unique learning needs."
  },
  {
    question: "Do you provide study materials?",
    answer: "Yes! We offer comprehensive study resources including detailed notes, practice papers, previous year question papers, and interactive learning materials for all classes and subjects."
  },
  {
    question: "How much does it cost?",
    answer: "Our pricing is competitive and varies based on the services you choose. We offer flexible payment plans and often have special offers. Contact us for detailed pricing information tailored to your needs."
  },
  {
    question: "Can I get help with career guidance?",
    answer: "Absolutely! Our career guidance experts help students discover their interests, choose the right subjects, and plan their academic and professional journey. We provide insights into various career paths and help with college selection."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    console.log('FAQ clicked:', index, 'Current openIndex:', openIndex)
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
            Find answers to common questions about our services, teaching methodology, and how we can help you achieve your academic goals.
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