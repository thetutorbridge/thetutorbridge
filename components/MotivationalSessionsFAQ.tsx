"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "Are sessions online or offline?",
    answer: "We offer both online and offline sessions. Most of our motivational sessions are conducted online via interactive video calls, but we also organize in-person workshops in major cities."
  },
  {
    question: "Can parents also join?",
    answer: "Yes! We encourage parents to join our sessions as they play a crucial role in supporting their children's motivation and academic journey. Many sessions are designed for both students and parents."
  },
  {
    question: "Do you offer group and 1:1 sessions?",
    answer: "We offer both formats. Group sessions are great for peer learning and shared experiences, while 1:1 sessions provide personalized attention and tailored guidance for specific challenges."
  },
  {
    question: "How long are the motivational sessions?",
    answer: "Our sessions typically range from 60-90 minutes. Group workshops may be longer (2-3 hours), while 1:1 counseling sessions are usually 45-60 minutes to ensure focused attention."
  },
  {
    question: "What age groups do you cater to?",
    answer: "Our motivational sessions are designed for students from Class 6 to 12, as well as college students. We also have specialized sessions for parents and educators."
  }
]

export default function MotivationalSessionsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    console.log('Motivational FAQ clicked:', index, 'Current openIndex:', openIndex)
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
            Get answers to common questions about our motivational sessions and how they can help you.
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
