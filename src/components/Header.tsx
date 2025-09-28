import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ScrollProgress from './ScrollProgress';
import PulsatingButton from './PulsatingButton';

interface HeaderProps {
  onSignup: () => void;
  onLogin: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSignup, onLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/sahayak-logo.svg" 
              alt="Sahayak Logo" 
              className="h-24 w-auto"
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              How It Works
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Pricing
            </a>
            <a href="#faq" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              FAQ
            </a>
          </nav>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onLogin}
                className="text-emerald-600 border border-emerald-600 px-5 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition-colors mr-2"
              >
                Login
              </button>
              <PulsatingButton 
                onClick={onSignup}
                className="px-6 py-3 ml-2"
              >
                Get Started Free
              </PulsatingButton>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <button
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                How It Works
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                Pricing
              </a>
              <a href="#faq" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                FAQ
              </a>
              <button 
                onClick={onLogin}
                className="text-emerald-600 border border-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors w-full mb-2"
              >
                Login
              </button>
              <PulsatingButton 
                onClick={onSignup}
                className="px-6 py-3 w-full mt-2"
              >
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 ml-2"
                Get Started Free
              </PulsatingButton>
            </button>
          </div>
        )}
      </div>
      </header>
      <ScrollProgress className="top-16" />
    </>
  )
  );
};

export default Header;