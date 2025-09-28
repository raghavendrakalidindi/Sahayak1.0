import React from 'react';
import { 
  MessageCircle, 
  Brain, 
  Ticket, 
  Users, 
  Activity 
} from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageCircle,
      title: 'Employee Sends Request',
      description: '"AC not working in conference room" via WhatsApp/Email/Telegram.',
    },
    {
      icon: Brain,
      title: 'AI Understands',
      description: 'Categorizes as "Facilities → HVAC → High Priority."',
    },
    {
      icon: Ticket,
      title: 'System Creates Ticket',
      description: 'Ticket #FXR001 auto-generated with acknowledgment.',
    },
    {
      icon: Users,
      title: 'Team Notified',
      description: 'Maintenance team gets ticket on WhatsApp/Email.',
    },
    {
      icon: Activity,
      title: 'Dashboard Updates',
      description: 'Admin tracks progress in real-time, employee gets automated updates.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How <span className="text-emerald-600">Sahayak</span> Works
          </h2>
        </div>
        
        <div className="relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-24 left-20 right-20 h-px bg-emerald-200"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative text-center group">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                    <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                      <Icon className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div className="absolute -top-2 -left-2 bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            From problem to solution in under 60 seconds
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-emerald-600 text-white px-8 py-4 text-lg rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            See It in Action
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;