import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenConsultation: () => void;
  onOpenBlog: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onOpenBlog }) => {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 bg-background-dark z-0">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50 mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-electric-purple/10 rounded-full blur-[100px] pointer-events-none opacity-30"></div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 text-left">
              <h1 className="text-5xl font-bold leading-[0.9] tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-9xl break-words whitespace-pre-line">
                {t('hero.title').split('\n')[0]}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">{t('hero.title').split('\n')[1]}</span>
              </h1>
              <h2 className="max-w-xl text-base font-normal leading-relaxed text-white/70 md:text-lg lg:text-xl mt-4">
                {t('hero.subtitle')}
              </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={onOpenConsultation}
                  className="group flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-8 py-4 text-base md:text-lg font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-white hover:text-primary hover:shadow-[0_0_40px_-10px_rgba(109,9,179,0.5)] active:scale-95"
                >
                  <span className="relative z-10 mr-2">{t('hero.cta_primary')}</span>
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                </button>

                {/* Botão Blog Ativo via State */}
                <button 
                  onClick={onOpenBlog}
                  className="group flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-white/30 bg-transparent px-8 py-4 text-base md:text-lg font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-white/5 hover:border-white hover:text-white active:scale-95 hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)]"
                >
                  <span>{t('hero.cta_secondary')}</span>
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;