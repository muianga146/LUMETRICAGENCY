import React, { useEffect } from 'react';

interface ModalProps {
  onClose: () => void;
}

const ModalBase: React.FC<ModalProps & { title: string; children: React.ReactNode }> = ({ onClose, title, children }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background-dark/90 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-3xl bg-[#121212] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-full overflow-hidden animate-slide-up">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#121212]">
          <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 bg-white/5 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 text-white/80 text-sm leading-relaxed font-light">
          {children}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-[#121212]">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-white/5 text-white rounded-lg font-bold tracking-widest uppercase hover:bg-white hover:text-background-dark transition-all text-xs"
          >
            Fechar
          </button>
        </div>
      </div>

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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export const PrivacyPolicyModal: React.FC<ModalProps> = ({ onClose }) => (
  <ModalBase title="Política de Privacidade" onClose={onClose}>
    <section>
      <h3 className="text-white font-bold text-base mb-2">1. Introdução</h3>
      <p>A CLICKSALES valoriza a sua privacidade. Esta política descreve como recolhemos, usamos e protegemos as suas informações pessoais ao utilizar os nossos serviços e website.</p>
    </section>
    
    <section>
      <h3 className="text-white font-bold text-base mb-2">2. Dados Recolhidos</h3>
      <p>Podemos recolher informações pessoais, como nome, endereço de e-mail e número de telefone, apenas quando fornecidas voluntariamente por si através dos nossos formulários de contacto ou inscrição. Também recolhemos dados de navegação anónimos para fins de análise de desempenho.</p>
    </section>
    
    <section>
      <h3 className="text-white font-bold text-base mb-2">3. Utilização dos Dados</h3>
      <p>As informações recolhidas são utilizadas para:</p>
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>Prestar os serviços de consultoria e marketing solicitados.</li>
        <li>Entrar em contacto para responder a dúvidas ou agendar reuniões.</li>
        <li>Enviar comunicações de marketing relevantes, caso tenha optado por recebê-las.</li>
      </ul>
    </section>

    <section>
      <h3 className="text-white font-bold text-base mb-2">4. Partilha de Informações</h3>
      <p>Não vendemos, trocamos ou transferimos as suas informações pessoais para terceiros, exceto quando necessário para a prestação dos nossos serviços (ex: ferramentas de automação) ou quando exigido por lei.</p>
    </section>

    <section>
      <h3 className="text-white font-bold text-base mb-2">5. Segurança</h3>
      <p>Implementamos medidas de segurança robustas para proteger os seus dados contra acesso, alteração ou divulgação não autorizada.</p>
    </section>
  </ModalBase>
);

export const TermsOfServiceModal: React.FC<ModalProps> = ({ onClose }) => (
  <ModalBase title="Termos de Serviço" onClose={onClose}>
    <section>
      <h3 className="text-white font-bold text-base mb-2">1. Aceitação dos Termos</h3>
      <p>Ao aceder e utilizar o website da CLICKSALES, concorda em cumprir estes Termos de Serviço, bem como todas as leis e regulamentos aplicáveis.</p>
    </section>
    
    <section>
      <h3 className="text-white font-bold text-base mb-2">2. Propriedade Intelectual</h3>
      <p>Todo o conteúdo presente neste site, incluindo textos, gráficos, logotipos, ícones e código, é propriedade exclusiva da CLICKSALES ou dos seus licenciadores e está protegido por leis de direitos de autor.</p>
    </section>
    
    <section>
      <h3 className="text-white font-bold text-base mb-2">3. Uso de Licença</h3>
      <p>É concedida permissão para transferir temporariamente uma cópia dos materiais (informações ou software) no site da CLICKSALES apenas para visualização transitória pessoal e não comercial.</p>
    </section>

    <section>
      <h3 className="text-white font-bold text-base mb-2">4. Limitação de Responsabilidade</h3>
      <p>A CLICKSALES não será responsável por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucros, ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais no site da CLICKSALES.</p>
    </section>

    <section>
      <h3 className="text-white font-bold text-base mb-2">5. Modificações</h3>
      <p>A CLICKSALES pode rever estes termos de serviço a qualquer momento, sem aviso prévio. Ao usar este site, concorda em ficar vinculado à versão atual desses termos de serviço.</p>
    </section>
  </ModalBase>
);