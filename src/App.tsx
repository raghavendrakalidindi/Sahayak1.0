import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import VideoSection from './components/VideoSection';
import SocialProof from './components/SocialProof';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import { supabase } from './lib/supabase';

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleShowSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleBackToHome = () => {
    setShowSignup(false);
    setShowLogin(false);
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} />;
  }

  if (showSignup) {
    return <SignupPage onBack={handleBackToHome} />;
  }

  if (showLogin) {
    return <LoginPage onBack={handleBackToHome} onLoginSuccess={handleLoginSuccess} onShowSignup={handleShowSignup} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onSignup={handleShowSignup} onLogin={handleShowLogin} />
      <Hero onSignup={handleShowSignup} />
      <VideoSection />
      <SocialProof />
      <Benefits />
      <HowItWorks />
      <Testimonials onSignup={handleShowSignup} />
      <FAQ />
      <FinalCTA onSignup={handleShowSignup} />
      <Footer />
    </div>
  );
}

export default App;