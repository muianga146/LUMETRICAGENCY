import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Header
    'nav.manifesto': 'Manifesto',
    'nav.services': 'Serviços',
    'nav.cases': 'Cases',
    'nav.access': 'Acesso',
    'nav.start': 'Começar',
    
    // Hero
    'hero.title': 'Não Busque Atenção.\nExija Obsessão.',
    'hero.subtitle': 'A LUMETRIC transforma tráfego frio em desejo ardente. Marketing de precisão para marcas que se recusam a ser ignoradas.',
    'hero.cta_primary': '[ INICIAR A DOMINAÇÃO ]',
    'hero.cta_secondary': 'LER ARTIGOS',

    // Manifesto
    'manifesto.title': 'A Lógica por \ntrás do Caos.',
    'manifesto.text': 'O mercado digital está saturado de ruído. Nós somos o sinal. Acreditamos que o marketing moderno vive na intersecção entre a estética editorial e a brutalidade dos dados. Não criamos apenas campanhas; desenhamos ecossistemas de vendas onde cada pixel tem um propósito e cada clique é uma conquista.',
    'manifesto.cta': '[ CONHEÇA NOSSO DNA ]',

    // Services
    'services.title': 'Arquitetura de \nCrescimento',
    'services.cta': '[ ESCOLHA SUA ARMA ]',
    'services.s1.title': 'Brand Equity & Design',
    'services.s1.desc': 'Não criamos apenas logotipos; forjamos ativos visuais de alto valor. Desenvolvemos identidades que aumentam instantaneamente a perceção de preço da sua marca, criando uma estética que intimida a concorrência e estabelece autoridade visual imediata.',
    'services.s2.title': 'Tráfego de Alta Performance',
    'services.s2.desc': 'Abandone as métricas de vaidade. A nossa gestão de tráfego utiliza dados agressivos e segmentação cirúrgica para garantir que cada centavo investido retorne multiplicado. O foco é puramente em ROI, escala e aquisição de clientes qualificados.',
    'services.s3.title': 'Editorial Social',
    'services.s3.desc': 'Transforme o seu feed numa revista digital. A nossa estratégia de conteúdo foge do genérico para criar narrativas visuais magnéticas. Produzimos material que não só educa, mas cria desejo e cultura ao redor da marca, convertendo seguidores em embaixadores.',
    'services.s4.title': 'Funis de Conversão',
    'services.s4.desc': 'A jornada do cliente não pode ser um acidente; deve ser engenharia. Desenhamos arquiteturas digitais que guiam o visitante de forma estratégica, eliminando fricções e transformando a simples curiosidade numa máquina previsível de receita recorrente.',

    // Cases
    'cases.title': 'Fatos. Não Ficção.',
    'cases.view_all': 'Ver Todos',
    'cases.read_brief': '[ LER O BRIEFING ]',
    'cases.view_innovation': '[ VER A INOVAÇÃO ]',
    'cases.view_experience': '[ VER A EXPERIÊNCIA ]',
    'cases.view_product': '[ VER O PRODUTO ]',
    'cases.view_backstage': '[ VER OS BASTIDORES ]',
    'cases.modal.story': 'A História Real',
    'cases.modal.result': 'O Resultado',
    'cases.modal.close': 'Fechar Briefing',

    // Footer
    'footer.title': 'Esteja à Frente do Algoritmo.',
    'footer.subtitle': 'Estratégias validadas, tendências de mercado e atualizações da LUMETRIC direto no seu dispositivo. Sem spam, apenas lucro.',
    'footer.email_placeholder': 'Digite seu melhor E-mail',
    'footer.whatsapp_placeholder': 'Seu número de WhatsApp',
    'footer.cta': 'GARANTIR MEU ACESSO',
    'footer.processing': 'PROCESSANDO...',
    'footer.privacy': 'Política de Privacidade',
    'footer.terms': 'Termos de Serviço',
    'footer.rights': '© 2024 LUMETRIC. Todos os direitos reservados.',
    'footer.alert_success': 'Inscrição confirmada! Você agora está à frente do algoritmo.',
    'footer.alert_error': 'Ocorreu um erro ao processar sua inscrição.',

    // Blog UI
    'blog.back_home': 'Voltar para Home',
    'blog.back_grid': 'Voltar para o Grid',
    'blog.loading': 'Carregando conhecimento...',
    'blog.read_now': 'Ler Agora',
    'blog.search_placeholder': 'O que você busca dominar hoje?',
    'blog.empty_search': 'Nenhum artigo encontrado. Tente outro termo de busca.',
    'blog.cta_elite_title': 'Elite Only',
    'blog.cta_title': 'Você tem o conhecimento.\nNós temos a audiência.',
    'blog.cta_subtitle': 'Junte-se ao conselho editorial da Lumetric. Publique seus insights para milhares de empreendedores e construa sua autoridade digital.',
    'blog.cta_button': 'Não Busque Atenção. Publique Aqui.',
    'blog.admin_area': 'Área Restrita',
    'blog.publish_btn': 'Publicar Matéria',
    'blog.cancel_btn': 'Cancelar',
    'blog.share_obsession': 'Espalhe a Obsessão',
    'blog.read_time': 'de leitura',
    'blog.keep_obsession': 'Mantenha a Obsessão',

    // Modal Form
    'modal.title': 'Aplicação para Consultoria',
    'modal.subtitle': 'Preencha com precisão',
    'modal.success_title': 'Aplicação Recebida',
    'modal.success_desc': 'Nossa equipe de estratégia analisará seu perfil. Se houver fit, entraremos em contato em até 24 horas.',
    'modal.step1': 'Identificação',
    'modal.name': 'Nome Completo',
    'modal.name_placeholder': 'Seu nome',
    'modal.email': 'E-mail Corporativo',
    'modal.email_placeholder': 'seu@email.com',
    'modal.whatsapp': 'WhatsApp',
    'modal.site': 'Site ou Instagram',
    'modal.step2': 'O Filtro Financeiro',
    'modal.step2_desc': 'Qual é o seu orçamento mensal disponível para marketing?',
    'modal.step3': 'O Diagnóstico',
    'modal.step3_desc': 'Qual é o maior obstáculo do seu negócio hoje?',
    'modal.step4': 'O Timing',
    'modal.step4_desc': 'Quão rápido você precisa ver resultados?',
    'modal.submit': '[ APLICAR PARA CONSULTORIA ]',
    'modal.processing': 'PROCESSANDO DADOS...',
    
    // Form Options (PT)
    'opt.budget.1': 'Até 20.000 MT (Iniciante)',
    'opt.budget.2': 'De 20.000 MT a 60.000 MT (Crescimento)',
    'opt.budget.3': 'De 60.000 MT a 150.000 MT (Escala)',
    'opt.budget.4': 'Acima de 150.000 MT (Dominância)',
    'opt.obstacle.1': 'Tenho tráfego, mas não tenho vendas (Problema de Conversão)',
    'opt.obstacle.2': 'Ninguém conhece a minha marca (Problema de Branding)',
    'opt.obstacle.3': 'Meus anúncios pararam de funcionar (Problema de Performance)',
    'opt.obstacle.4': 'Preciso lançar um produto novo (Problema de Estratégia)',
    'opt.urgency.1': '"Para ontem" (Urgência Alta - Lead Quente)',
    'opt.urgency.2': 'Nas próximas semanas (Lead Morno)',
    'opt.urgency.3': 'Estou apenas pesquisando preços (Lead Frio/Curioso)'
  },
  en: {
    // Header
    'nav.manifesto': 'Manifesto',
    'nav.services': 'Services',
    'nav.cases': 'Cases',
    'nav.access': 'Access',
    'nav.start': 'Start',
    
    // Hero
    'hero.title': 'Don\'t Seek Attention.\nDemand Obsession.',
    'hero.subtitle': 'LUMETRIC turns cold traffic into burning desire. Precision marketing for brands that refuse to be ignored.',
    'hero.cta_primary': '[ START DOMINATION ]',
    'hero.cta_secondary': 'READ ARTICLES',

    // Manifesto
    'manifesto.title': 'The Logic \nbehind the Chaos.',
    'manifesto.text': 'The digital market is saturated with noise. We are the signal. We believe modern marketing lives at the intersection of editorial aesthetics and data brutality. We don\'t just create campaigns; we design sales ecosystems where every pixel has a purpose and every click is a conquest.',
    'manifesto.cta': '[ KNOW OUR DNA ]',

    // Services
    'services.title': 'Growth \nArchitecture',
    'services.cta': '[ CHOOSE YOUR WEAPON ]',
    'services.s1.title': 'Brand Equity & Design',
    'services.s1.desc': 'We don\'t just create logos; we forge high-value visual assets. We develop identities that instantly increase your brand\'s price perception, creating an aesthetic that intimidates competition and establishes immediate visual authority.',
    'services.s2.title': 'High Performance Traffic',
    'services.s2.desc': 'Abandon vanity metrics. Our traffic management uses aggressive data and surgical targeting to ensure every penny invested returns multiplied. The focus is purely on ROI, scale, and acquiring qualified clients.',
    'services.s3.title': 'Social Editorial',
    'services.s3.desc': 'Turn your feed into a digital magazine. Our content strategy flees from generic to create magnetic visual narratives. We produce material that not only educates but creates desire and culture around the brand, converting followers into ambassadors.',
    'services.s4.title': 'Conversion Funnels',
    'services.s4.desc': 'The customer journey cannot be an accident; it must be engineering. We design digital architectures that guide the visitor strategically, eliminating friction and turning simple curiosity into a predictable recurring revenue machine.',

    // Cases
    'cases.title': 'Facts. Not Fiction.',
    'cases.view_all': 'View All',
    'cases.read_brief': '[ READ BRIEFING ]',
    'cases.view_innovation': '[ SEE INNOVATION ]',
    'cases.view_experience': '[ SEE EXPERIENCE ]',
    'cases.view_product': '[ SEE PRODUCT ]',
    'cases.view_backstage': '[ SEE BACKSTAGE ]',
    'cases.modal.story': 'The True Story',
    'cases.modal.result': 'The Result',
    'cases.modal.close': 'Close Briefing',

    // Footer
    'footer.title': 'Stay Ahead of the Algorithm.',
    'footer.subtitle': 'Validated strategies, market trends, and LUMETRIC updates straight to your device. No spam, just profit.',
    'footer.email_placeholder': 'Enter your best E-mail',
    'footer.whatsapp_placeholder': 'Your WhatsApp number',
    'footer.cta': 'SECURE MY ACCESS',
    'footer.processing': 'PROCESSING...',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.rights': '© 2024 LUMETRIC. All rights reserved.',
    'footer.alert_success': 'Subscription confirmed! You are now ahead of the algorithm.',
    'footer.alert_error': 'An error occurred while processing your subscription.',

    // Blog UI
    'blog.back_home': 'Back to Home',
    'blog.back_grid': 'Back to Grid',
    'blog.loading': 'Loading knowledge...',
    'blog.read_now': 'Read Now',
    'blog.search_placeholder': 'What do you seek to master today?',
    'blog.empty_search': 'No articles found. Try another search term.',
    'blog.cta_elite_title': 'Elite Only',
    'blog.cta_title': 'You have the knowledge.\nWe have the audience.',
    'blog.cta_subtitle': 'Join the Lumetric editorial board. Publish your insights to thousands of entrepreneurs and build your digital authority.',
    'blog.cta_button': 'Don\'t Seek Attention. Publish Here.',
    'blog.admin_area': 'Restricted Area',
    'blog.publish_btn': 'Publish Article',
    'blog.cancel_btn': 'Cancel',
    'blog.share_obsession': 'Spread the Obsession',
    'blog.read_time': 'read',
    'blog.keep_obsession': 'Keep the Obsession',

    // Modal Form
    'modal.title': 'Application for Consultancy',
    'modal.subtitle': 'Fill with precision',
    'modal.success_title': 'Application Received',
    'modal.success_desc': 'Our strategy team will analyze your profile. If there is a fit, we will contact you within 24 hours.',
    'modal.step1': 'Identification',
    'modal.name': 'Full Name',
    'modal.name_placeholder': 'Your name',
    'modal.email': 'Corporate E-mail',
    'modal.email_placeholder': 'your@email.com',
    'modal.whatsapp': 'WhatsApp',
    'modal.site': 'Website or Instagram',
    'modal.step2': 'The Financial Filter',
    'modal.step2_desc': 'What is your available monthly budget for marketing?',
    'modal.step3': 'The Diagnosis',
    'modal.step3_desc': 'What is the biggest obstacle for your business today?',
    'modal.step4': 'The Timing',
    'modal.step4_desc': 'How fast do you need to see results?',
    'modal.submit': '[ APPLY FOR CONSULTANCY ]',
    'modal.processing': 'PROCESSING DATA...',

    // Form Options (EN)
    'opt.budget.1': 'Up to 20,000 MT (Beginner)',
    'opt.budget.2': 'From 20,000 MT to 60,000 MT (Growth)',
    'opt.budget.3': 'From 60,000 MT to 150,000 MT (Scale)',
    'opt.budget.4': 'Above 150,000 MT (Domination)',
    'opt.obstacle.1': 'I have traffic, but no sales (Conversion Problem)',
    'opt.obstacle.2': 'No one knows my brand (Branding Problem)',
    'opt.obstacle.3': 'My ads stopped working (Performance Problem)',
    'opt.obstacle.4': 'I need to launch a new product (Strategy Problem)',
    'opt.urgency.1': '"Yesterday" (High Urgency - Hot Lead)',
    'opt.urgency.2': 'In the next weeks (Warm Lead)',
    'opt.urgency.3': 'Just researching prices (Cold/Curious Lead)'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};