import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBlog, BlogPost } from '../context/BlogContext';

const BlogHome: React.FC = () => {
  const { posts, user, login, logout, subscribe } = useBlog();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(emailInput);
    setShowLoginModal(false);
  };

  const handleNewPostClick = () => {
    if (!user) {
      setShowLoginModal(true);
    } else if (user.role === 'guest') {
      setShowPaywall(true);
    } else {
      navigate('/blog/novo');
    }
  };

  const handleSubscribe = () => {
    // Simulating Payment Processing
    setTimeout(() => {
        subscribe();
        setShowPaywall(false);
        navigate('/blog/novo');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-primary selection:text-white pb-20">
      {/* Blog Header */}
      <nav className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
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
                <span className="font-bold tracking-tight text-xl hidden sm:inline">CLICKSALES <span className="text-primary font-light opacity-80">| INSIGHTS</span></span>
            </Link>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/" className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-base">arrow_back</span>
                <span className="hidden sm:inline">Voltar ao Site</span>
            </Link>

            <div className="w-px h-6 bg-white/10"></div>

            {user ? (
                <div className="flex items-center gap-4">
                    <span className="text-sm text-white/60 hidden md:block">Olá, <span className={user.role === 'admin' ? 'text-primary font-bold' : 'text-white'}>{user.role === 'admin' ? 'BOSS' : user.name}</span></span>
                    <button onClick={handleNewPostClick} className="text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">edit</span>
                        <span className="hidden sm:inline">Escrever</span>
                    </button>
                    <button onClick={logout} className="text-sm text-white/40 hover:text-white transition-colors">Sair</button>
                </div>
            ) : (
                <button onClick={() => setShowLoginModal(true)} className="text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors">
                    Login / VIP
                </button>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        
        {/* Featured Post */}
        {featuredPost && (
            <div onClick={() => navigate(`/blog/${featuredPost.id}`)} className="relative w-full h-[60vh] rounded-2xl overflow-hidden cursor-pointer group mb-16 animate-fade-in-up">
                <img src={featuredPost.image} alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-3/4">
                    <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded mb-4">
                        {featuredPost.category}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors duration-300">
                        {featuredPost.title}
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl line-clamp-2 max-w-2xl">
                        {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mt-6 text-sm font-medium tracking-wide">
                        <div className="flex items-center gap-2">
                            <div className={`size-2 rounded-full ${featuredPost.authorRole === 'admin' ? 'bg-primary' : 'bg-gray-500'}`}></div>
                            <span>{featuredPost.author}</span>
                        </div>
                        <span className="text-white/40">•</span>
                        <span className="text-white/60">{featuredPost.date}</span>
                    </div>
                </div>
            </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post, idx) => (
                <div 
                    key={post.id} 
                    onClick={() => navigate(`/blog/${post.id}`)}
                    className={`group bg-[#121212] rounded-xl overflow-hidden border border-white/5 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_-5px_rgba(109,9,179,0.2)] animate-slide-up flex flex-col`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                >
                    <div className="h-48 overflow-hidden relative">
                         <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                         {post.authorRole === 'admin' && (
                             <div className="absolute top-3 right-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-lg">
                                 Oficial
                             </div>
                         )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{post.category}</span>
                            <span className="text-xs text-white/30">{post.date}</span>
                        </div>
                        <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                        <p className="text-white/60 text-sm line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
                        
                        <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                            <span className={`text-xs font-medium ${post.authorRole === 'admin' ? 'text-primary' : 'text-white/50'}`}>
                                Por {post.author}
                            </span>
                            <span className="material-symbols-outlined text-white/20 group-hover:text-primary transition-colors text-lg">arrow_forward</span>
                        </div>
                    </div>
                </div>
            ))}

            {/* CTA Card for Writers */}
            <div 
                onClick={handleNewPostClick}
                className="bg-gradient-to-br from-primary/10 to-transparent rounded-xl border border-dashed border-primary/30 flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-primary/20 transition-colors group min-h-[400px]"
            >
                <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-3xl">edit_square</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Torne-se um Autor VIP</h3>
                <p className="text-white/60 text-sm max-w-xs mx-auto mb-6">Compartilhe sua expertise com nossa audiência exclusiva. Assine agora para desbloquear o editor.</p>
                <button className="px-6 py-2 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-white hover:text-primary transition-colors">
                    Escrever Artigo
                </button>
            </div>
        </div>

      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#151515] border border-white/10 p-8 rounded-2xl w-full max-w-md relative animate-slide-up shadow-2xl">
                <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-white/50 hover:text-white"><span className="material-symbols-outlined">close</span></button>
                <h2 className="text-2xl font-bold mb-1">Identifique-se</h2>
                <p className="text-white/50 text-sm mb-6">Use 'admin@clicksales.io' para acesso total ou qualquer outro para visitante.</p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input 
                        type="email" 
                        required 
                        placeholder="Seu e-mail" 
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full h-12 bg-white/5 border border-white/10 rounded px-4 text-white focus:border-primary focus:outline-none"
                    />
                    <button type="submit" className="w-full h-12 bg-white text-black font-bold uppercase tracking-widest rounded hover:bg-gray-200">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
      )}

      {/* Paywall Modal */}
      {showPaywall && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-primary/20 backdrop-blur-md">
            <div className="bg-[#121212] border border-primary/50 p-10 rounded-2xl w-full max-w-lg relative animate-slide-up shadow-[0_0_50px_-10px_rgba(109,9,179,0.5)] text-center">
                <button onClick={() => setShowPaywall(false)} className="absolute top-4 right-4 text-white/50 hover:text-white"><span className="material-symbols-outlined">close</span></button>
                
                <div className="size-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/40">
                    <span className="material-symbols-outlined text-4xl text-white">diamond</span>
                </div>

                <h2 className="text-3xl font-bold mb-2">Acesso Exclusivo</h2>
                <p className="text-white/60 mb-8">Apenas assinantes VIP podem publicar artigos na rede Clicksales. Junte-se à elite do marketing.</p>

                <div className="bg-white/5 rounded-xl p-6 mb-8 border border-white/10">
                    <div className="text-sm text-white/50 uppercase tracking-widest mb-1">Assinatura Mensal</div>
                    <div className="text-4xl font-bold text-primary">$5.00 <span className="text-lg text-white/40 font-normal">/mês</span></div>
                    <ul className="text-left text-sm text-white/70 space-y-2 mt-4 max-w-[200px] mx-auto">
                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check</span> Publicações ilimitadas</li>
                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check</span> Perfil de Autor destacado</li>
                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check</span> Acesso à comunidade</li>
                    </ul>
                </div>

                <button onClick={handleSubscribe} className="w-full h-14 bg-primary text-white font-bold text-lg uppercase tracking-widest rounded-lg hover:bg-white hover:text-primary transition-all hover:shadow-lg shadow-primary/20">
                    Assinar Agora
                </button>
                <p className="text-xs text-white/30 mt-4">Pagamento seguro. Cancele quando quiser.</p>
            </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-slide-up {
            animation: fade-in-up 0.4s ease-out forwards;
            opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default BlogHome;