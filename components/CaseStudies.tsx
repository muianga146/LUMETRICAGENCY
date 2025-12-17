
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface CaseData {
  image: string;
  bgText: string;
  client: string;
  description: string;
  buttonText: string;
  modalContent: {
    story: string;
    result: string;
  };
}

const CaseCard: React.FC<{
  data: CaseData;
  onClick: () => void;
}> = ({ data, onClick }) => (
  <article 
    onClick={onClick}
    className="relative flex h-[500px] w-[320px] md:h-[600px] md:w-[450px] flex-shrink-0 flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 p-6 md:p-10 group cursor-pointer transition-transform hover:scale-[1.01]"
  >
    <img 
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60" 
      src={data.image} 
      alt={`Case study: ${data.client}`}
      loading="lazy"
      width="450"
      height="600"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent"></div>
    
    <div className="absolute top-0 right-0 p-6 md:p-8 text-white/10 group-hover:text-white/20 transition-colors duration-500 overflow-hidden select-none">
      <p className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
        {data.bgText}
      </p>
    </div>

    <div className="relative z-10 flex flex-col gap-6">
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">{data.client}</h3>
        <p className="text-sm md:text-base font-normal text-white/90 border-l-2 border-primary pl-4">{data.description}</p>
      </div>
      <button 
        className="flex w-full items-center justify-center rounded-lg h-12 px-4 bg-white/10 text-white text-xs font-bold tracking-widest backdrop-blur-sm border border-white/20 hover:bg-white hover:text-black transition-all uppercase"
        aria-label={`Ver mais sobre ${data.client}`}
      >
        <span>{data.buttonText}</span>
      </button>
    </div>
  </article>
);

const CaseModal: React.FC<{
  data: CaseData;
  onClose: () => void;
}> = ({ data, onClose }) => {
  const { t } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-background-dark/95 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative z-10 w-full max-w-2xl bg-[#121212] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-slide-up">
        <div className="relative h-48 sm:h-64 w-full shrink-0">
          <img src={data.image} alt="" className="w-full h-full object-cover opacity-80" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white hover:bg-white hover:text-black transition-colors"
            aria-label="Fechar"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="absolute bottom-6 left-6 sm:left-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white">{data.client}</h2>
          </div>
        </div>

        <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar">
          <div className="space-y-8">
            <section>
              <h4 className="text-primary font-bold text-sm tracking-widest uppercase mb-3">{t('cases.modal.story')}</h4>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">{data.modalContent.story}</p>
            </section>
            <div className="w-full h-px bg-white/10"></div>
            <section>
              <h4 className="text-primary font-bold text-sm tracking-widest uppercase mb-3">{t('cases.modal.result')}</h4>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">{data.modalContent.result}</p>
            </section>
          </div>
        </div>
        
        <div className="p-6 border-t border-white/10">
          <button onClick={onClose} className="w-full py-4 bg-primary text-white rounded-lg font-bold tracking-widest uppercase">{t('cases.modal.close')}</button>
        </div>
      </div>
    </div>
  );
};

const CaseStudies: React.FC = () => {
  const { t, language } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);

  const casesData: CaseData[] = [
    {
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
      bgText: "LUXO",
      client: `LUSSO — ${language === 'pt' ? "Estética que Vende" : "Aesthetics that Sell"}`,
      description: language === 'pt' ? "Branding Minimalista + Posicionamento" : "Minimalist Branding + Positioning",
      buttonText: t('cases.read_brief'),
      modalContent: {
        story: language === 'pt' ? "Branding focado em sofisticação para aumentar o valor percebido." : "Branding focused on sophistication to increase perceived value.",
        result: language === 'pt' ? "Conversão imediata de visitantes em clientes de alto ticket." : "Immediate conversion of visitors into high-ticket clients."
      }
    },
    {
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
      bgText: "AI",
      client: `SINTÉTICO — ${language === 'pt' ? "O Futuro da Imagem" : "The Future of Image"}`,
      description: language === 'pt' ? "AI Marketing + Narrativa Futurista" : "AI Marketing + Futuristic Narrative",
      buttonText: t('cases.view_innovation'),
      modalContent: {
        story: language === 'pt' ? "Uso de IA para criar campanhas impossíveis anteriormente." : "Using AI to create campaigns previously impossible.",
        result: language === 'pt' ? "Redução de 70% no custo de produção criativa." : "70% reduction in creative production costs."
      }
    },
    {
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800",
      bgText: "TECH",
      client: `AUTO TECH — ${language === 'pt' ? "Validação de Demanda" : "Demand Validation"}`,
      description: language === 'pt' ? "Teste de Oferta + Landing Page" : "Offer Testing + Landing Page",
      buttonText: t('cases.view_product'),
      modalContent: {
        story: language === 'pt' ? "Validação científica de produtos antes do lançamento." : "Scientific validation of products before launch.",
        result: language === 'pt' ? "Lista de espera com mais de 5.000 leads qualificados." : "Waiting list with over 5,000 qualified leads."
      }
    }
  ];

  return (
    <section className="bg-background-dark py-24 md:py-32 w-full" id="cases">
      <div className="px-6 md:px-10 lg:px-20 mb-16">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">{t('cases.title')}</h2>
      </div>

      <div className="w-full pl-6 md:pl-10 lg:pl-20">
        <div className="flex overflow-x-auto pb-12 no-scrollbar gap-8 pr-10">
          {casesData.map((item, index) => (
            <CaseCard key={index} data={item} onClick={() => setSelectedCase(item)} />
          ))}
        </div>
      </div>

      {selectedCase && <CaseModal data={selectedCase} onClose={() => setSelectedCase(null)} />}
    </section>
  );
};

export default CaseStudies;
