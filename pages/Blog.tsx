import React from 'react';
import { Link } from 'react-router-dom';

// Dados fictícios para prototipagem visual
const PLACEHOLDER_POSTS = [
  {
    id: 1,
    category: "ESTRATÉGIA",
    title: "O Fim do Tráfego Pago como Você Conhece",
    excerpt: "Porque o CPC está subindo e a única saída para escalar em 2024 é a construção de marca sólida (Branding).",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    date: "10 OUT",
    readTime: "5 min"
  },
  {
    id: 2,
    category: "DESIGN",
    title: "Psicologia das Cores no Varejo de Luxo",
    excerpt: "Como o preto e o roxo influenciam a percepção de alto valor e aumentam o ticket médio instantaneamente.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    date: "12 OUT",
    readTime: "4 min"
  },
  {
    id: 3,
    category: "CONVERSÃO",
    title: "Engenharia de Menu: Vendendo sem Vender",
    excerpt: "Técnicas de UX aplicadas a cardápios digitais que guiam o olhar do cliente para os produtos de maior margem.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    date: "15 OUT",
    readTime: "7 min"
  },
  {
    id: 4,
    category: "BRANDING",
    title: "A Era da Atenção Curta",
    excerpt: "Como criar hooks visuais que param o scroll em menos de 3 segundos em plataformas como TikTok e Reels.",
    image: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?auto=format&fit=crop&q=80&w=800",
    date: "18 OUT",
    readTime: "3 min"
  },
  {
    id: 5,
    category: "TECH",
    title: "AI Generativa na Criação de Conteúdo",
    excerpt: "Ferramentas que estamos usando internamente para triplicar a produção de criativos sem perder a qualidade.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    date: "20 OUT",
    readTime: "6 min"
  },
  {
    id: 6,
    category: "CULTURA",
    title: "Construindo Comunidades, Não Listas",
    excerpt: "A diferença fundamental entre ter seguidores e ter advogados da marca dispostos a defender seu produto.",
    image: "https://images.unsplash.com/photo-1519671482538-518b48d19eb8?auto=format&fit=crop&q=80&w=800",
    date: "22 OUT",
    readTime: "5 min"
  }
];

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-dark text-white selection:bg-primary selection:text-white pb-20">
      
      {/* 1. Header Simplificado */}
      <nav className="fixed top-0 w-full z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="size-8 text-primary group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                <mask id="blog-header-mask">
                  <rect x="0" y="0" width="24" height="24" fill="white" />
                  <line x1="4" y1="8" x2="12" y2="12" stroke="black" strokeWidth="3" />
                </mask>
                <circle cx="12" cy="12" r="9" mask="url(#blog-header-mask)" />
              </svg>
            </div>
            <span className="font-bold tracking-tight text-xl">CLICKSALES <span className="text-primary font-light opacity-80">| INSIGHTS</span></span>
          </Link>

          <Link 
            to="/" 
            className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform material-symbols-outlined text-base">arrow_back</span>
            Voltar para Home
          </Link>
        </div>
      </nav>

      {/* Container Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32">

        {/* 2. Hero Section do Blog (Destaque) */}
        <div className="relative w-full h-[60vh] min-h-[500px] rounded-2xl overflow-hidden cursor-pointer group mb-20 border border-white/10">
          <img 
            src="https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&q=80&w=2000" 
            alt="Destaque" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-3/4">
            <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded mb-6 shadow-[0_0_15px_rgba(109,9,179,0.5)]">
              Trending
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6 tracking-tight group-hover:text-primary transition-colors duration-300">
              A Arte da Guerra Digital: Dominando 2024
            </h1>
            <p className="text-white/80 text-lg md:text-xl line-clamp-2 max-w-2xl font-light">
              Descubra as táticas não convencionais que as maiores marcas estão usando para monopolizar a atenção em um mercado saturado.
            </p>
          </div>
        </div>

        {/* Título da Seção */}
        <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-4">
          <h2 className="text-3xl font-bold tracking-tight">Últimas Publicações</h2>
          <span className="text-white/40 text-sm font-mono hidden md:block">ARCHIVE_2024</span>
        </div>

        {/* 3. Grid de Artigos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PLACEHOLDER_POSTS.map((post) => (
            <article 
              key={post.id}
              className="group bg-[#121212] border border-white/10 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(109,9,179,0.4)] hover:border-primary/50 flex flex-col h-full"
            >
              {/* Imagem do Card */}
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-white/10">
                  {post.readTime}
                </div>
              </div>

              {/* Conteúdo do Card */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">{post.category}</span>
                  <span className="text-xs text-white/30 font-mono">{post.date}</span>
                </div>
                
                <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-white transition-colors text-white/90">
                  {post.title}
                </h3>
                
                <p className="text-white/50 text-sm line-clamp-3 mb-6 font-light leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                
                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/40 group-hover:text-primary transition-colors">
                    Ler Artigo
                  </span>
                  <span className="material-symbols-outlined text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all text-lg">
                    arrow_forward
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer do Blog (CTA) */}
        <div className="mt-24 py-16 border-t border-white/10 text-center">
          <h3 className="text-2xl font-bold mb-4">Quer contribuir?</h3>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Estamos sempre em busca de mentes afiadas. Se tem algo valioso para dizer, este é o seu palco.
          </p>
          <button className="px-8 py-3 bg-white/5 border border-white/10 rounded hover:bg-white hover:text-black transition-all font-bold uppercase tracking-widest text-sm">
            Entrar em Contato
          </button>
        </div>

      </div>
    </div>
  );
};

export default Blog;