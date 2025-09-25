import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

interface FinalCTAProps {
  onSignup: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ onSignup }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Ready to Simplify <span className="text-yellow-300">Employee Support</span>?
          </h2>
          
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Join forward-thinking companies who have transformed their support process with Sahayak
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={onSignup}
              className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl flex items-center space-x-2 group"
            >
              <Zap className="w-6 h-6" />
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={onSignup}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-emerald-600 transition-colors"
            >
              Schedule Demo
            </button>
          </div>
          
          <p className="text-emerald-200">
            No training, no new tools. Just instant ticketing.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-emerald-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <span>Setup in 24 hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <span>No training required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;