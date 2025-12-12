import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useLanguage } from '../context/LanguageContext';

interface ConsultationModalProps {
  onClose: () => void;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({ onClose }) => {
  const { t } = useLanguage();
  
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    link: '',
    budget: '',
    obstacle: '',
    urgency: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            full_name: formData.name,
            email: formData.email,
            whatsapp: formData.whatsapp,
            social_link: formData.link,
            budget: formData.budget,
            obstacle: formData.obstacle,
            urgency: formData.urgency
            // created_at é gerado automaticamente pelo Supabase
          },
        ]);

      if (error) {
        throw error;
      }

      setStatus('success');
      
      // Fecha o modal após 2 segundos de sucesso
      setTimeout(() => {
        onClose();
      }, 2500);

    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Helper for selection cards
  const SelectionCard: React.FC<{ 
    selected: boolean; 
    value: string; 
    label: string; 
    onClick: () => void; 
  }> = ({ 
    selected, 
    value, 
    label, 
    onClick 
  }) => (
    <div 
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-lg border transition-all duration-200 flex items-center gap-3
        ${selected 
          ? 'bg-primary/20 border-primary shadow-[0_0_15px_-5px_rgba(109,9,179,0.5)]' 
          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
        }`}
    >
      <div className={`size-5 rounded-full border flex items-center justify-center shrink-0
        ${selected ? 'border-primary bg-primary' : 'border-white/30 bg-transparent'}
      `}>
        {selected && <div className="size-2 rounded-full bg-white" />}
      </div>
      <span className={`text-sm md:text-base font-medium ${selected ? 'text-white' : 'text-white/70'}`}>
        {label}
      </span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background-dark/90 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-2xl bg-[#121212] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-full overflow-hidden animate-slide-up">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#121212]">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{t('modal.title')}</h2>
            <p className="text-white/50 text-xs uppercase tracking-widest mt-1">{t('modal.subtitle')}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white/5 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Success Overlay */}
        {status === 'success' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center animate-fade-in">
             <div className="size-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <span className="material-symbols-outlined text-4xl">check</span>
             </div>
             <h3 className="text-2xl font-bold text-white mb-2">{t('modal.success_title')}</h3>
             <p className="text-white/60 max-w-md">{t('modal.success_desc')}</p>
          </div>
        ) : (
          <>
            {/* Scrollable Form */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-10">
              <form id="consultation-form" onSubmit={handleSubmit} className="flex flex-col gap-10">
                
                {/* 1. Identification */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center size-6 rounded bg-primary text-white text-xs font-bold">1</span>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">{t('modal.step1')}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-white/50 uppercase font-bold tracking-wider ml-1">{t('modal.name')}</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full h-12 rounded-lg bg-white/5 border border-white/10 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20"
                        placeholder={t('modal.name_placeholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-white/50 uppercase font-bold tracking-wider ml-1">{t('modal.email')}</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full h-12 rounded-lg bg-white/5 border border-white/10 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20"
                        placeholder={t('modal.email_placeholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-white/50 uppercase font-bold tracking-wider ml-1">{t('modal.whatsapp')}</label>
                      <input 
                        required
                        type="tel" 
                        value={formData.whatsapp}
                        onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                        className="w-full h-12 rounded-lg bg-white/5 border border-white/10 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-white/50 uppercase font-bold tracking-wider ml-1">{t('modal.site')}</label>
                      <input 
                        type="text" 
                        value={formData.link}
                        onChange={(e) => handleInputChange('link', e.target.value)}
                        className="w-full h-12 rounded-lg bg-white/5 border border-white/10 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20"
                        placeholder="Link"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Budget */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center size-6 rounded bg-primary text-white text-xs font-bold">2</span>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">{t('modal.step2')}</h3>
                  </div>
                  <p className="text-white/60 text-sm -mt-4 mb-4">{t('modal.step2_desc')}</p>

                  <div className="grid grid-cols-1 gap-3">
                    {[
                      t('opt.budget.1'),
                      t('opt.budget.2'),
                      t('opt.budget.3'),
                      t('opt.budget.4')
                    ].map((option) => (
                      <SelectionCard 
                        key={option}
                        label={option}
                        value={option}
                        selected={formData.budget === option}
                        onClick={() => handleInputChange('budget', option)}
                      />
                    ))}
                  </div>
                </div>

                {/* 3. Diagnosis */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center size-6 rounded bg-primary text-white text-xs font-bold">3</span>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">{t('modal.step3')}</h3>
                  </div>
                  <p className="text-white/60 text-sm -mt-4 mb-4">{t('modal.step3_desc')}</p>

                  <div className="grid grid-cols-1 gap-3">
                    {[
                      t('opt.obstacle.1'),
                      t('opt.obstacle.2'),
                      t('opt.obstacle.3'),
                      t('opt.obstacle.4')
                    ].map((option) => (
                      <SelectionCard 
                        key={option}
                        label={option}
                        value={option}
                        selected={formData.obstacle === option}
                        onClick={() => handleInputChange('obstacle', option)}
                      />
                    ))}
                  </div>
                </div>

                {/* 4. Timing */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center size-6 rounded bg-primary text-white text-xs font-bold">4</span>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">{t('modal.step4')}</h3>
                  </div>
                  <p className="text-white/60 text-sm -mt-4 mb-4">{t('modal.step4_desc')}</p>

                  <div className="grid grid-cols-1 gap-3">
                    {[
                      t('opt.urgency.1'),
                      t('opt.urgency.2'),
                      t('opt.urgency.3')
                    ].map((option) => (
                      <SelectionCard 
                        key={option}
                        label={option}
                        value={option}
                        selected={formData.urgency === option}
                        onClick={() => handleInputChange('urgency', option)}
                      />
                    ))}
                  </div>
                </div>

              </form>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-white/10 bg-[#121212]">
              {status === 'error' && (
                <p className="text-red-500 text-sm text-center mb-4">Erro ao enviar. Verifique sua conexão e tente novamente.</p>
              )}
              <button 
                type="submit"
                form="consultation-form"
                disabled={status === 'submitting'}
                className={`w-full h-14 rounded-lg text-base font-bold tracking-[0.1em] uppercase transition-all shadow-lg active:scale-[0.98] 
                  ${status === 'submitting' 
                    ? 'bg-white/10 text-white/50 cursor-not-allowed' 
                    : 'bg-primary text-white hover:bg-white hover:text-primary'
                  }`}
              >
                {status === 'submitting' ? t('modal.processing') : t('modal.submit')}
              </button>
            </div>
          </>
        )}

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

export default ConsultationModal;