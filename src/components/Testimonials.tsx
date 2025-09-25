import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  onSignup: () => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ onSignup }) => {
  const testimonials = [
    {
      quote: "We set up Sahayak in one day. Our employees love how simple it is — no training required. IT tickets now resolve 40% faster.",
      author: "Operations Head",
      company: "Mid-size Manufacturing Company",
      avatar: "MG",
    },
    {
      quote: "Affordable, effective, and multilingual. Finally, a system that works for India-specific needs.",
      author: "HR Manager",
      company: "Tech Startup",
      avatar: "TS",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-emerald-600">Early Users</span> Say
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 relative"
            >
              <Quote className="absolute top-4 left-4 w-8 h-8 text-emerald-200" />
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              <blockquote className="text-lg text-gray-700 mb-8 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center">
                <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-emerald-600">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-500 text-sm">{testimonial.company}</div>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full text-xs font-medium">
                Verified User
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Join hundreds of satisfied customers</p>
          <button 
            onClick={onSignup}
            className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Start Your Success Story
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;