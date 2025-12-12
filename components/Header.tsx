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
    window.addEventListener('scroll', handleScroll);
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

  const handleConsultationClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    onOpenConsultation();
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background-dark/90 backdrop-blur-md py-3 shadow-lg border-b border-white/10' : 'py-5 bg-transparent'}`}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between whitespace-nowrap">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center gap-3 group cursor-pointer"
          >
            {/* Logo Image with Fallback */}
            <img 
              src="/logo.png" 
              alt="LUMETRIC Logo" 
              className="h-8 w-auto object-contain transition-transform group-hover:scale-110 flex-shrink-0"
              onError={(e) => {
                e.currentTarget.onerror = null;
                // Fallback to the graphic mark if image fails
                e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNmQwOWIzIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PG1hc2sgaWQ9Im0iPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0id2hpdGUiLz48bGluZSB4MT0iNCIgeTE9IjgiIHgyPSIxMiIgeTI9IjEyIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjMiLz48L21hc2s+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOSIgbWFzaz0idXJsKCNtKSIvPjwvc3ZnPg==";
              }}
            />
            {/* Brand Name */}
            <h2 className="text-white text-xl font-bold tracking-tight leading-none group-hover:text-white/90 transition-colors pt-1">LUMETRIC</h2>
          </a>
          
          <nav className="hidden md:flex items-center gap-9">
            <a 
              className="text-sm font-medium leading-normal text-white/80 transition-colors hover:text-primary cursor-pointer" 
              href="#manifesto"
              onClick={(e) => handleNavClick(e, 'manifesto')}
            >
              {t('nav.manifesto')}
            </a>
            <a 
              className="text-sm font-medium leading-normal text-white/80 transition-colors hover:text-primary cursor-pointer" 
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
            >
              {t('nav.services')}
            </a>
            <a 
              className="text-sm font-medium leading-normal text-white/80 transition-colors hover:text-primary cursor-pointer" 
              href="#cases"
              onClick={(e) => handleNavClick(e, 'cases')}
            >
              {t('nav.cases')}
            </a>
            <button 
              className="text-sm font-medium leading-normal text-white/80 transition-colors hover:text-primary cursor-pointer bg-transparent border-none" 
              onClick={handleConsultationClick}
            >
              {t('nav.access')}
            </button>
          </nav>

          <div className="hidden md:flex">
             <button 
                onClick={onOpenConsultation}
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-6 py-2 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
             >
                {t('nav.start')}
             </button>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-background-dark border-b border-white/10 p-4 md:hidden flex flex-col gap-4 shadow-2xl">
            <a 
              className="text-lg font-medium text-white/90 cursor-pointer" 
              href="#manifesto" 
              onClick={(e) => handleNavClick(e, 'manifesto')}
            >
              {t('nav.manifesto')}
            </a>
            <a 
              className="text-lg font-medium text-white/90 cursor-pointer" 
              href="#services" 
              onClick={(e) => handleNavClick(e, 'services')}
            >
              {t('nav.services')}
            </a>
            <a 
              className="text-lg font-medium text-white/90 cursor-pointer" 
              href="#cases" 
              onClick={(e) => handleNavClick(e, 'cases')}
            >
              {t('nav.cases')}
            </a>
            <button 
              className="text-lg font-medium text-white/90 cursor-pointer text-left" 
              onClick={handleConsultationClick}
            >
              {t('nav.access')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;