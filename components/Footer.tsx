import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { PrivacyPolicyModal, TermsOfServiceModal } from './LegalModals';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t, setLanguage, language } = useLanguage();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  // States for newsletter form
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email, whatsapp }]);

      if (error) throw error;

      alert(t('footer.alert_success'));
      setEmail('');
      setWhatsapp('');
    } catch (error) {
      console.error('Error submitting newsletter:', error);
      alert(t('footer.alert_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const changeLanguage = (lang: 'pt' | 'en') => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

  return (
    <footer className="bg-deep-purple w-full pt-20 pb-10">
      <div className="container mx-auto px-4">
        
        {/* Lead Capture Section */}
        <div className="flex flex-col items-center justify-center gap-12 max-w-4xl mx-auto mb-24">
          <div className="text-center space-y-6">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              {t('footer.title')}
            </h2>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              {t('footer.subtitle')}
            </p>
          </div>

          <form className="w-full max-w-3xl flex flex-col items-center gap-6" onSubmit={handleNewsletterSubmit}>
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 w-full">
              <div className="flex-1 w-full">
                <input 
                  className="w-full rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white border border-white/20 bg-white/10 h-14 placeholder:text-white/60 px-6 text-base transition-all hover:bg-white/20" 
                  placeholder={t('footer.email_placeholder')}
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex-1 w-full">
                <input 
                  className="w-full rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white border border-white/20 bg-white/10 h-14 placeholder:text-white/60 px-6 text-base transition-all hover:bg-white/20" 
                  placeholder={t('footer.whatsapp_placeholder')} 
                  type="tel" 
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full md:w-auto min-w-[200px] h-14 px-8 bg-white text-deep-purple rounded-lg text-base font-bold tracking-wider hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all shadow-lg uppercase ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? t('footer.processing') : t('footer.cta')}
            </button>
          </form>
        </div>

        {/* Footer Links & Copyright */}
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white/60 text-sm">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="LUMETRIC Logo" 
              className="h-8 w-auto object-contain flex-shrink-0 grayscale brightness-200"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxtYXNrIGlkPSJtIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9IndoaXRlIi8+PGxpbmUgeDE9IjQiIHkxPSI4IiB4Mj0iMTIiIHkyPSIxMiIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIzIi8+PC9tYXNrPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjkiIG1hc2s9InVybCgjbSkiLz48L3N2Zz4=";
              }}
            />
            <span className="font-bold tracking-tight text-white text-lg leading-none pt-1">LUMETRIC</span>
          </div>

          <div className="flex gap-8">
             <button onClick={() => setShowPrivacy(true)} className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">{t('footer.privacy')}</button>
             <button onClick={() => setShowTerms(true)} className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">{t('footer.terms')}</button>
          </div>

          <div className="flex gap-6 items-center">
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="hover:text-white transition-colors group flex items-center justify-center bg-transparent border-none p-0 cursor-pointer text-white/60 hover:text-white"
                aria-label="Select Language"
              >
                <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">public</span>
                <span className="ml-1 uppercase text-xs font-bold">{language}</span>
              </button>

              {isLangMenuOpen && (
                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-20 bg-white rounded-lg shadow-xl overflow-hidden animate-pop-up origin-bottom z-50">
                  <button 
                    onClick={() => changeLanguage('pt')}
                    className={`w-full py-3 text-center font-bold text-xs hover:bg-gray-50 transition-colors ${language === 'pt' ? 'text-primary' : 'text-gray-500'}`}
                  >
                    PT
                  </button>
                  <div className="w-full h-px bg-gray-100"></div>
                  <button 
                    onClick={() => changeLanguage('en')}
                    className={`w-full py-3 text-center font-bold text-xs hover:bg-gray-50 transition-colors ${language === 'en' ? 'text-primary' : 'text-gray-500'}`}
                  >
                    EN
                  </button>
                </div>
              )}
            </div>

            {/* Instagram Icon */}
            <a 
              href="https://www.instagram.com/clicksales.io/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors group text-white/80 hover:text-white"
            >
              <svg className="size-6 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="text-center mt-8 text-white/40 text-xs">
          {t('footer.rights')}
        </div>
      </div>

      {showPrivacy && <PrivacyPolicyModal onClose={() => setShowPrivacy(false)} />}
      {showTerms && <TermsOfServiceModal onClose={() => setShowTerms(false)} />}

      <style>{`
        @keyframes popUp {
          from { opacity: 0; transform: translateX(-50%) scale(0.9); }
          to { opacity: 1; transform: translateX(-50%) scale(1); }
        }
        .animate-pop-up {
          animation: popUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </footer>
  );
};

export default Footer;