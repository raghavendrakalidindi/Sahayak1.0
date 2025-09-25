import React from 'react';
import { useState } from 'react';
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

function App() {
  const [showSignup, setShowSignup] = useState(false);

  const handleShowSignup = () => {
    setShowSignup(true);
  };

  const handleBackToHome = () => {
    setShowSignup(false);
  };

  if (showSignup) {
    return <SignupPage onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onSignup={handleShowSignup} />
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