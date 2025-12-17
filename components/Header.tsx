
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenConsultation: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background-dark/95 backdrop-blur-md py-3 shadow-lg border-b border-white/10' : 'py-5 bg-transparent'}`}
      role="banner"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="LUMETRIC Home"
          >
            <img 
              src="/logo.png" 
              alt="LUMETRIC" 
              width="32"
              height="32"
              className="h-8 w-8 object-contain transition-transform group-hover:scale-110"
              loading="eager"
            />
            <span className="text-white text-xl font-bold tracking-tight">LUMETRIC</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-9" role="navigation" aria-label="Main Navigation">
            <a href="#manifesto" onClick={(e) => handleNavClick(e, 'manifesto')} className="text-sm font-medium text-white/70 hover:text-primary transition-colors">{t('nav.manifesto')}</a>
            <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="text-sm font-medium text-white/70 hover:text-primary transition-colors">{t('nav.services')}</a>
            <a href="#cases" onClick={(e) => handleNavClick(e, 'cases')} className="text-sm font-medium text-white/70 hover:text-primary transition-colors">{t('nav.cases')}</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenConsultation}
              className="hidden sm:flex cursor-pointer items-center justify-center rounded-lg bg-primary px-6 py-2 text-sm font-bold uppercase tracking-wider text-white hover:scale-105 transition-all"
            >
              {t('nav.start')}
            </button>
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Fechar Menu" : "Abrir Menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span className="material-symbols-outlined text-3xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="absolute top-full left-0 w-full bg-background-dark/98 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 shadow-2xl animate-fade-in md:hidden">
            <a href="#manifesto" className="text-xl font-bold text-white/90" onClick={(e) => handleNavClick(e, 'manifesto')}>{t('nav.manifesto')}</a>
            <a href="#services" className="text-xl font-bold text-white/90" onClick={(e) => handleNavClick(e, 'services')}>{t('nav.services')}</a>
            <a href="#cases" className="text-xl font-bold text-white/90" onClick={(e) => handleNavClick(e, 'cases')}>{t('nav.cases')}</a>
            <button onClick={onOpenConsultation} className="w-full py-4 bg-primary rounded-lg font-bold uppercase">{t('nav.start')}</button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
