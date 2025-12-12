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
  <div 
    onClick={onClick}
    className="relative flex h-[500px] w-[320px] md:h-[600px] md:w-[450px] flex-shrink-0 flex-col justify-end overflow-hidden rounded-2xl bg-gray-800 p-6 md:p-10 group cursor-pointer transition-transform hover:scale-[1.02]"
  >
    <img 
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40" 
      src={data.image} 
      alt={data.client} 
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/70 to-transparent"></div>
    
    <div className="absolute top-0 right-0 p-6 md:p-8 text-white/10 group-hover:text-white/20 transition-colors duration-500 overflow-hidden">
      <p className="text-6xl md:text-8xl font-black tracking-tighter select-none uppercase break-all text-right leading-[0.8]">
        {data.bgText}
      </p>
    </div>

    <div className="relative z-10 flex flex-col gap-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
      <div>
        <p className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">{data.client}</p>
        <p className="text-sm md:text-base font-normal text-white/80 border-l-2 border-primary pl-4">{data.description}</p>
      </div>
      <button className="flex w-full items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-white/10 text-white text-xs md:text-xs font-bold tracking-widest backdrop-blur-sm border border-white/10 hover:bg-white hover:text-black transition-colors uppercase opacity-0 group-hover:opacity-100">
        <span>{data.buttonText}</span>
      </button>
    </div>
  </div>
);

const CaseModal: React.FC<{
  data: CaseData;
  onClose: () => void;
}> = ({ data, onClose }) => {
  const { t } = useLanguage();

  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background-dark/90 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-2xl bg-[#151515] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-fade-in-up">
        {/* Header Image */}
        <div className="relative h-48 sm:h-64 w-full shrink-0">
          <img src={data.image} alt={data.client} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151515] to-transparent"></div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="absolute bottom-6 left-6 sm:left-10">
            <h3 className="text-2xl sm:text-4xl font-bold text-white leading-tight">{data.client}</h3>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar">
          <div className="space-y-8">
            <div>
              <h4 className="text-primary font-bold text-sm tracking-widest uppercase mb-3">{t('cases.modal.story')}</h4>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light">
                {data.modalContent.story}
              </p>
            </div>
            
            <div className="w-full h-px bg-white/10"></div>

            <div>
              <h4 className="text-primary font-bold text-sm tracking-widest uppercase mb-3">{t('cases.modal.result')}</h4>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light">
                {data.modalContent.result}
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer Action */}
        <div className="p-6 border-t border-white/10 bg-[#1A1A1A]">
          <button 
             onClick={onClose}
             className="w-full py-4 bg-primary text-white rounded-lg font-bold tracking-widest uppercase hover:bg-white hover:text-primary transition-all"
          >
            {t('cases.modal.close')}
          </button>
        </div>
      </div>
    </div>
  );
};

const CaseStudies: React.FC = () => {
  const { t, language } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);

  // Dynamic content based on language
  const casesData: CaseData[] = [
    {
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
      bgText: "LUXO",
      client: "LUSSO — " + (language === 'pt' ? "Estética que Vende" : "Aesthetics that Sell"),
      description: language === 'pt' ? "Estratégia: Branding Minimalista + Posicionamento" : "Strategy: Minimalist Branding + Positioning",
      buttonText: t('cases.read_brief'),
      modalContent: {
        story: language === 'pt' 
          ? "Não basta vender roupa; é preciso vender um estilo de vida. Para a LUSSO, a LUMETRIC desenhou uma identidade visual focada em transmitir confiança imediata e sofisticação. Transformamos um perfil de vendas numa vitrine de desejo."
          : "It is not enough to sell clothes; you must sell a lifestyle. For LUSSO, LUMETRIC designed a visual identity focused on conveying immediate trust and sophistication. We turned a sales profile into a showcase of desire.",
        result: language === 'pt'
          ? "Uma biografia e feed que convertem visitantes em admiradores da marca antes mesmo do primeiro clique no preço. Construção de autoridade visual pura."
          : "A bio and feed that convert visitors into brand admirers before even the first click on the price. Pure visual authority building."
      }
    },
    {
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
      bgText: "AI",
      client: "SINTÉTICO — " + (language === 'pt' ? "O Futuro da Imagem" : "The Future of Image"),
      description: language === 'pt' ? "Estratégia: AI Marketing + Narrativa Futurista" : "Strategy: AI Marketing + Futuristic Narrative",
      buttonText: t('cases.view_innovation'),
      modalContent: {
        story: language === 'pt'
          ? "Como posicionar um estúdio de fotografia que usa Inteligência Artificial? Criando uma marca que respira o futuro. Desenvolvemos o portfólio e a estratégia social do Sintético Estúdio para educar o mercado moçambicano sobre o poder da imagem gerada por IA."
          : "How to position a photography studio that uses Artificial Intelligence? Creating a brand that breathes the future. We developed the portfolio and social strategy for Sintético Studio to educate the Mozambican market about the power of AI-generated imagery.",
        result: language === 'pt'
          ? "Posicionamento como pioneiro no mercado. A marca não compete por preço, mas pela exclusividade da tecnologia e da visão artística."
          : "Positioning as a pioneer in the market. The brand does not compete on price, but on the exclusivity of technology and artistic vision."
      }
    },
    {
      image: "https://images.unsplash.com/photo-1519671482538-518b48d19eb8?auto=format&fit=crop&q=80&w=800",
      bgText: "LOCAL",
      client: "ENCONTRO DE LUZES — " + (language === 'pt' ? "Lançamento Estratégico" : "Strategic Launch"),
      description: language === 'pt' ? "Estratégia: Gestão de Evento + Tráfego Local" : "Strategy: Event Management + Local Traffic",
      buttonText: t('cases.view_experience'),
      modalContent: {
        story: language === 'pt'
          ? "Para a inauguração deste espaço gastronómico, a estratégia foi 'gerar escassez'. Utilizamos campanhas geolocalizadas para criar um burburinho local antes da abertura das portas."
          : "For the inauguration of this gastronomic space, the strategy was to 'generate scarcity'. We used geolocated campaigns to create local buzz before the doors opened.",
        result: language === 'pt'
          ? "Uma inauguração com casa cheia e percepção de exclusividade imediata. Provamos que o tráfego pago bem feito enche mesas no mundo real."
          : "A full-house inauguration and immediate perception of exclusivity. We proved that well-done paid traffic fills tables in the real world."
      }
    },
    {
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800",
      bgText: "TECH",
      client: "AUTO TECH — " + (language === 'pt' ? "Validação de Demanda" : "Demand Validation"),
      description: language === 'pt' ? "Estratégia: Teste de Oferta + Landing Page" : "Strategy: Offer Testing + Landing Page",
      buttonText: t('cases.view_product'),
      modalContent: {
        story: language === 'pt'
          ? "Para lançar um produto inovador (máquina de lavagem portátil), não adivinhamos; testamos. Criamos uma estrutura de pré-venda e análise de mercado para validar o interesse do consumidor automotivo antes da produção em massa."
          : "To launch an innovative product (portable washing machine), we didn't guess; we tested. We created a pre-sale and market analysis structure to validate automotive consumer interest before mass production.",
        result: language === 'pt'
          ? "Validação clara do público-alvo e criação de uma lista de espera ansiosa pelo lançamento, minimizando o risco do estoque."
          : "Clear validation of the target audience and creation of an eager waiting list for the launch, minimizing inventory risk."
      }
    },
    {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
      bgText: "ALPHA",
      client: "O LABORATÓRIO — " + (language === 'pt' ? "Crescimento Interno" : "Internal Growth"),
      description: language === 'pt' ? "Estratégia: Dogfooding (Usar o que vendemos)" : "Strategy: Dogfooding (Using what we sell)",
      buttonText: t('cases.view_backstage'),
      modalContent: {
        story: language === 'pt'
          ? "A melhor prova do nosso marketing somos nós mesmos. A LUMETRIC não usa prospecção fria ultrapassada; usamos o nosso próprio ecossistema de 'Editorial Social' e 'Funis' para atrair parceiros."
          : "The best proof of our marketing is ourselves. LUMETRIC does not use outdated cold prospecting; we use our own 'Social Editorial' and 'Funnels' ecosystem to attract partners.",
        result: language === 'pt'
          ? "Cada lead que entra na agência passou exatamente pelo processo que implementaremos na sua empresa. Nós somos o nosso melhor case de sucesso."
          : "Every lead that enters the agency went through exactly the process we will implement in your company. We are our own best success case."
      }
    }
  ];

  // Se showAll for true, mostra todos. Se false, mostra apenas os 3 primeiros.
  const visibleCases = showAll ? casesData : casesData.slice(0, 3);

  return (
    <section className="bg-background-dark py-24 md:py-32 w-full overflow-hidden" id="cases">
      <div className="px-6 md:px-10 lg:px-20 mb-16">
        <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter text-white">
          {t('cases.title')}
        </h2>
      </div>

      <div className="w-full pl-6 md:pl-10 lg:pl-20">
        <div className="flex overflow-x-auto pb-12 no-scrollbar gap-8 pr-10">
          
          {visibleCases.map((item, index) => (
            <CaseCard 
              key={index}
              data={item}
              onClick={() => setSelectedCase(item)}
            />
          ))}
          
          {!showAll && (
            <div 
              onClick={() => setShowAll(true)}
              className="flex h-[500px] w-[200px] md:h-[600px] md:w-[300px] flex-shrink-0 flex-col items-center justify-center rounded-2xl border border-white/10 p-6 text-center text-gray-500 hover:text-primary hover:border-primary/50 transition-colors cursor-pointer group"
            >
              <p className="mb-4 text-sm tracking-widest uppercase">{t('cases.view_all')}</p>
              <span className="material-symbols-outlined text-5xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </div>
          )}

        </div>
      </div>

      {selectedCase && (
        <CaseModal 
          data={selectedCase} 
          onClose={() => setSelectedCase(null)} 
        />
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(109, 9, 179, 0.5);
          border-radius: 10px;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default CaseStudies;