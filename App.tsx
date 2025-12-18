import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Manifesto from './components/Manifesto';
import CaseStudies from './components/CaseStudies';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ConsultationModal from './components/ConsultationModal';
import Blog from './components/Blog';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'blog'>('home');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Reset scroll when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const openConsultation = () => setIsConsultationOpen(true);
  const closeConsultation = () => setIsConsultationOpen(false);

  // RENDERIZAÇÃO CONDICIONAL: SE FOR BLOG, MOSTRA SÓ O BLOG
  if (currentView === 'blog') {
    return <Blog onBack={() => setCurrentView('home')} />;
  }

  // SE NÃO, MOSTRA A LANDING PAGE PADRÃO
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark text-white overflow-x-hidden">
      <Header onOpenConsultation={openConsultation} />
      <main>
        <div id="home">
          <Hero 
            onOpenConsultation={openConsultation} 
            onOpenBlog={() => setCurrentView('blog')} 
          />
        </div>
        
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

export default App;