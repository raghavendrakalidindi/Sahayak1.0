import React from 'react';
import { 
  GraduationCap, 
  Brain, 
  Languages, 
  IndianRupee, 
  Zap, 
  RefreshCw 
} from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: GraduationCap,
      title: 'No Training Needed',
      description: 'Works directly on WhatsApp, Telegram, and Email. Employees use tools they already know.',
    },
    {
      icon: Brain,
      title: 'AI-Powered Categorization',
      description: 'Our AI captures intent, assigns priority, and routes tickets instantly.',
    },
    {
      icon: Languages,
      title: 'Multilingual & Voice Support',
      description: 'Raise tickets in English, Hindi, or regional languages — text or voice.',
    },
    {
      icon: IndianRupee,
      title: 'Affordable',
      description: 'Only ₹299/user/month vs ₹1000+ for Freshdesk/Zendesk.',
    },
    {
      icon: Zap,
      title: 'CRM & HRMS Integration',
      description: 'Connects seamlessly with your existing enterprise systems.',
    },
    {
      icon: RefreshCw,
      title: 'Automated Follow-Ups',
      description: 'Employees get updates and reminders in their preferred language.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Teams Choose <span className="text-emerald-600">Sahayak</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors">
                  <Icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;