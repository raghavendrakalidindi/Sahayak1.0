import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How is Sahayak different from Freshdesk/Zendesk?',
      answer: 'Sahayak works directly in WhatsApp, Telegram, and Email with no training or new interface. It\'s also 70% more affordable.',
    },
    {
      question: 'Does it support regional languages?',
      answer: 'Yes. Employees can raise tickets in Hindi, English, and regional Indian languages — text or voice.',
    },
    {
      question: 'What does it cost?',
      answer: 'Simple pricing: ₹299/user/month. No hidden fees.',
    },
    {
      question: 'Can it integrate with our existing systems?',
      answer: 'Yes, Sahayak integrates with popular CRMs and HRMS tools.',
    },
    {
      question: 'Is setup complicated?',
      answer: 'Not at all. Sahayak is plug-and-play. Your team can start using it the same day.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-emerald-600">Questions</span>
          </h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}>
                <div className="px-8 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
            Contact our support team
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;