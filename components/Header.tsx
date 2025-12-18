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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background-dark/98 backdrop-blur-md py-3 shadow-2xl border-b border-white/5' : 'py-6 bg-transparent'}`}
      role="banner"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center gap-2 group cursor-pointer"
            aria-label="LUMETRIC Home"
          >
            <div className="relative flex items-center justify-center h-10 w-10">
              <img 
                src="/logo.png" 
                alt="LUMETRIC Logo" 
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = "https://raw.githubusercontent.com/google/material-design-icons/master/png/action/visibility/mw24/2x/baseline_visibility_white_48dp.png";
                }}
              />
            </div>
            <span className="text-white text-xl md:text-2xl font-bold tracking-tighter uppercase ml-1">LUMETRIC</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-10" role="navigation" aria-label="Main Navigation">
            <a href="#manifesto" onClick={(e) => handleNavClick(e, 'manifesto')} className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 hover:text-primary transition-colors">{t('nav.manifesto')}</a>
            <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 hover:text-primary transition-colors">{t('nav.services')}</a>
            <a href="#cases" onClick={(e) => handleNavClick(e, 'cases')} className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 hover:text-primary transition-colors">{t('nav.cases')}</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenConsultation}
              className="hidden sm:flex cursor-pointer items-center justify-center rounded-lg bg-primary px-7 py-3 text-xs font-black uppercase tracking-[0.15em] text-white hover:bg-white hover:text-primary transition-all shadow-lg active:scale-95"
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
          <nav className="absolute top-full left-0 w-full bg-background-dark/98 backdrop-blur-2xl border-b border-white/5 p-8 flex flex-col gap-8 shadow-2xl animate-fade-in md:hidden">
            <a href="#manifesto" className="text-2xl font-black uppercase tracking-widest text-white/90" onClick={(e) => handleNavClick(e, 'manifesto')}>{t('nav.manifesto')}</a>
            <a href="#services" className="text-2xl font-black uppercase tracking-widest text-white/90" onClick={(e) => handleNavClick(e, 'services')}>{t('nav.services')}</a>
            <a href="#cases" className="text-2xl font-black uppercase tracking-widest text-white/90" onClick={(e) => handleNavClick(e, 'cases')}>{t('nav.cases')}</a>
            <button onClick={onOpenConsultation} className="w-full py-5 bg-primary rounded-lg font-black uppercase tracking-widest text-white shadow-xl">{t('nav.start')}</button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;