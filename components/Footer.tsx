
import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { PrivacyPolicyModal, TermsOfServiceModal } from './LegalModals';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t, setLanguage, language } = useLanguage();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert([{ email, whatsapp }]);
      if (error) throw error;
      alert(t('footer.alert_success'));
      setEmail('');
      setWhatsapp('');
    } catch (error) {
      alert(t('footer.alert_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-deep-purple w-full pt-20 pb-10" role="contentinfo">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col items-center justify-center gap-12 max-w-4xl mx-auto mb-24">
          <div className="text-center space-y-6">
            <h2 className="text-white text-4xl md:text-6xl font-bold tracking-tighter">{t('footer.title')}</h2>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">{t('footer.subtitle')}</p>
          </div>

          <form className="w-full max-w-3xl flex flex-col gap-6" onSubmit={handleNewsletterSubmit} aria-label="Newsletter">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="news-email" className="sr-only">E-mail</label>
                <input id="news-email" className="w-full rounded-lg text-white bg-white/10 border border-white/30 h-14 px-6 focus:ring-2 focus:ring-white outline-none" placeholder={t('footer.email_placeholder')} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex-1">
                <label htmlFor="news-whatsapp" className="sr-only">WhatsApp</label>
                <input id="news-whatsapp" className="w-full rounded-lg text-white bg-white/10 border border-white/30 h-14 px-6 focus:ring-2 focus:ring-white outline-none" placeholder={t('footer.whatsapp_placeholder')} type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
              </div>
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full md:w-fit mx-auto h-14 px-12 bg-white text-deep-purple rounded-lg font-bold uppercase hover:scale-105 transition-all">
              {isSubmitting ? t('footer.processing') : t('footer.cta')}
            </button>
          </form>
        </div>

        <div className="border-t border-white/20 pt-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white/80 text-sm">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="LUMETRIC Logo" width="32" height="32" className="h-8 w-auto object-contain" />
            <span className="font-bold text-xl text-white tracking-tighter uppercase">LUMETRIC</span>
          </div>

          <div className="flex gap-8 font-medium">
             <button onClick={() => setShowPrivacy(true)} className="hover:text-white transition-colors">{t('footer.privacy')}</button>
             <button onClick={() => setShowTerms(true)} className="hover:text-white transition-colors">{t('footer.terms')}</button>
          </div>

          <div className="flex gap-6 items-center">
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="hover:text-white transition-colors flex items-center gap-2"
                aria-label="Trocar Idioma"
              >
                <span className="material-symbols-outlined">public</span>
                <span className="uppercase text-xs font-bold">{language}</span>
              </button>
              {isLangMenuOpen && (
                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-white text-black rounded-lg shadow-2xl overflow-hidden py-1">
                  <button onClick={() => {setLanguage('pt'); setIsLangMenuOpen(false)}} className="w-full px-4 py-2 hover:bg-gray-100 font-bold">PT</button>
                  <button onClick={() => {setLanguage('en'); setIsLangMenuOpen(false)}} className="w-full px-4 py-2 hover:bg-gray-100 font-bold">EN</button>
                </div>
              )}
            </div>

            <a href="https://www.instagram.com/clicksales.io/" target="_blank" rel="noopener" className="hover:text-white transition-all" aria-label="Siga no Instagram">
              <svg className="size-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>
        
        <div className="text-center mt-8 text-white/50 text-xs">
          {t('footer.rights')}
        </div>
      </div>

      {showPrivacy && <PrivacyPolicyModal onClose={() => setShowPrivacy(false)} />}
      {showTerms && <TermsOfServiceModal onClose={() => setShowTerms(false)} />}
    </footer>
  );
};

export default Footer;
