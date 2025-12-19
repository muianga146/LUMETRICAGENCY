
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ServicesProps {
  onOpenConsultation: () => void;
}

const Services: React.FC<ServicesProps> = ({ onOpenConsultation }) => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const services = [
    {
      icon: "laptop_mac",
      title: t('services.s1.title'),
      description: t('services.s1.desc')
    },
    {
      icon: "ads_click",
      title: t('services.s2.title'),
      description: t('services.s2.desc')
    },
    {
      icon: "search",
      title: t('services.s3.title'),
      description: t('services.s3.desc')
    },
    {
      icon: "filter_list",
      title: t('services.s4.title'),
      description: t('services.s4.desc')
    },
    {
      icon: "share",
      title: t('services.s5.title'),
      description: t('services.s5.desc')
    }
  ];

  return (
    <section className="relative w-full py-16 md:py-24 px-4 bg-background-dark border-t border-white/5" id="services">
      <div className="mx-auto w-full max-w-[1200px] px-2 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          
          {/* Left Column: Heading & Dynamic Description */}
          <div className="lg:col-span-2 flex flex-col justify-start">
            <h2 className="text-white tracking-tight text-4xl sm:text-5xl lg:text-6xl font-bold leading-none text-left pb-6">
              {t('services.title').split('\n')[0]} <br/>
              <span className="text-primary">{t('services.title').split('\n')[1]}</span>
            </h2>
            
            <div className="min-h-[140px] lg:min-h-[180px] relative">
              <p 
                key={activeIndex !== null ? activeIndex : 'default'}
                className="text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed mb-8 md:mb-10 animate-fade-in transition-all duration-500"
              >
                {activeIndex !== null ? services[activeIndex].description : "Construímos arquiteturas de crescimento abrangentes que escalam sua marca desde a base, integrando cada ponto de contato para o máximo impacto e conversão."}
              </p>
            </div>

            <div className="flex justify-start">
              <button 
                onClick={onOpenConsultation}
                className="flex w-full md:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-transparent border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 text-base font-bold tracking-widest uppercase"
              >
                <span className="truncate">{t('services.cta')}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Service List */}
          <div className="lg:col-span-3 flex flex-col gap-3 md:gap-4">
            {services.map((service, index) => {
              const isActive = activeIndex === index;
              return (
                <button 
                  key={index}
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className={`group w-full text-left p-5 md:p-7 rounded-xl border transition-all duration-300 ease-in-out transform hover:-translate-y-1 
                    ${isActive 
                      ? 'bg-white/10 border-primary shadow-[0_0_20px_-5px_rgba(109,9,179,0.3)]' 
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-primary/50'
                    }`}
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className={`p-3 rounded-lg transition-colors shrink-0 ${isActive ? 'bg-primary text-white' : 'bg-white/5 text-gray-400 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                      <span className="material-symbols-outlined text-2xl md:text-3xl">
                        {service.icon}
                      </span>
                    </div>
                    <h3 className={`text-base md:text-xl lg:text-2xl font-bold leading-tight transition-colors duration-300 ${isActive ? 'text-primary' : 'text-white group-hover:text-primary'}`}>
                      {service.title}
                    </h3>
                    <div className={`ml-auto transition-all duration-300 ${isActive ? 'opacity-100 text-primary translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 text-gray-500 group-hover:text-primary'} hidden sm:block`}>
                      <span className="material-symbols-outlined">
                        {isActive ? 'check_circle' : 'arrow_outward'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Services;
