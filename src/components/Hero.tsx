import React from 'react';
import { Play, MessageSquare, Mail, Send } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Resolve Employee Issues{' '}
              <span className="text-emerald-600">Instantly</span> with{' '}
              <span className="text-emerald-600">AI-Powered</span> Natural Language Ticketing.
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
              Sahayak lets employees raise tickets in WhatsApp, Email, or Telegram — in text or voice. 
              Our AI captures, categorizes, assigns, and follows up automatically. No training. No new tools. 
              Just instant support.
            </p>

            <div className="space-y-4">
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Book a Free Demo
              </button>
              <p className="text-gray-500 text-sm">
                No setup required. Works with tools you already use.
              </p>
            </div>

            <div className="flex items-center space-x-6 text-gray-500">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <span className="text-sm">WhatsApp</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-emerald-600" />
                <span className="text-sm">Email</span>
              </div>
              <div className="flex items-center space-x-2">
                <Send className="w-5 h-5 text-emerald-600" />
                <span className="text-sm">Telegram</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">WhatsApp Message</p>
                    <p className="text-gray-900">"AC not working in conference room"</p>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium">
                      AI Processing...
                    </div>
                  </div>
                  
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <p className="text-sm text-emerald-600 mb-2">Ticket Created</p>
                    <p className="font-medium text-gray-900">#FXR001 - HVAC Issue</p>
                    <p className="text-sm text-gray-600">Priority: High | Assigned to: Maintenance Team</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold transform rotate-12">
              No Training Needed!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;