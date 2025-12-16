import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ManifestoProps {
  onOpenConsultation: () => void;
}

const Manifesto: React.FC<ManifestoProps> = ({ onOpenConsultation }) => {
  const { t } = useLanguage();

  return (
    <section className="bg-white text-background-dark w-full py-16 md:py-24 lg:py-40 px-4">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-12 lg:gap-24 items-center">
          
          <div className="md:col-span-7 lg:col-span-8">
            <h2 className="font-serif text-[2.8rem] xs:text-[3.5rem] sm:text-[5rem] lg:text-[7rem] font-bold leading-[0.9] tracking-tight text-electric-purple whitespace-pre-line">
              {t('manifesto.title')}
            </h2>
          </div>

          <div className="flex flex-col justify-end md:col-span-5 lg:col-span-4 h-full md:pt-32">
            <p className="text-[#1A1A1A] mb-8 md:mb-10 text-base md:text-lg leading-relaxed font-medium">
              {t('manifesto.text')}
            </p>
            <div className="flex">
              <button 
                onClick={onOpenConsultation}
                className="flex w-full md:w-auto h-14 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-electric-purple px-8 text-sm font-bold tracking-[0.1em] text-white transition-all hover:bg-background-dark hover:shadow-xl"
              >
                <span>{t('manifesto.cta')}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Manifesto;