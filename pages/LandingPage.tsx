import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Manifesto from '../components/Manifesto';
import CaseStudies from '../components/CaseStudies';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import ConsultationModal from '../components/ConsultationModal';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const openConsultation = () => setIsConsultationOpen(true);
  const closeConsultation = () => setIsConsultationOpen(false);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark text-white overflow-x-hidden">
      <Header onOpenConsultation={openConsultation} />
      <main>
        <div id="home">
          <Hero 
            onOpenConsultation={openConsultation}
            onOpenBlog={() => navigate('/blog')}
          />
        </div>
        {/* Logical Flow: Vision (Manifesto) -> Execution (Services) -> Proof (Cases) */}
        <div id="manifesto" className="scroll-mt-28">
          <Manifesto onOpenConsultation={openConsultation} />
        </div>
        <div id="services" className="scroll-mt-28">
          <Services onOpenConsultation={openConsultation} />
        </div>
        <div id="cases" className="scroll-mt-28">
          <CaseStudies />
        </div>
      </main>
      <div id="contact" className="scroll-mt-28">
        <Footer />
      </div>
      <ScrollToTop />
      
      {isConsultationOpen && (
        <ConsultationModal onClose={closeConsultation} />
      )}
    </div>
  );
};

export default LandingPage;