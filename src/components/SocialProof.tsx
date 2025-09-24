import React from 'react';

const SocialProof = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Built for Businesses of All Sizes
        </h2>
        
        <p className="text-gray-600 mb-12 text-lg">
          Trusted by forward-thinking teams looking to simplify support.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="w-24 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 font-medium">Logo {i}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-emerald-600 mb-2">500+</div>
            <div className="text-gray-600">Issues Resolved</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-600 mb-2">40%</div>
            <div className="text-gray-600">Faster Resolution</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-600 mb-2">0</div>
            <div className="text-gray-600">Training Hours Needed</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;