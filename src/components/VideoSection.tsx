import React from 'react';
import { Play } from 'lucide-react';

interface VideoSectionProps {
  onSignup?: () => void;
}

const VideoSection: React.FC<VideoSectionProps> = ({ onSignup }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
          See Sahayak in Action <span className="text-emerald-600">(2-Min Demo)</span>
        </h2>
        
        <div className="relative group cursor-pointer">
          <div 
            onClick={onSignup}
            className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-center h-full">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 group-hover:bg-white/30 transition-colors">
                <Play className="w-16 h-16 text-white fill-white" />
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        
        <p className="mt-6 text-gray-600">
          <button 
            onClick={onSignup}
            className="bg-emerald-600 text-white px-6 py-2 text-sm rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            See It in Action
          </button>
          <span className="ml-2">- Watch how Sahayak transforms employee support from chaos to clarity.</span>
        </p>
      </div>
    </section>
  );
};

export default VideoSection;