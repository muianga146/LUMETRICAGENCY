import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useLanguage } from '../context/LanguageContext';

interface BlogProps {
  onBack: () => void;
}

interface BlogPost {
  id: number | string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  fires: number;
  author: string;
  isNew: boolean;
}

interface AuthorProfile {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

const PROFILE_KEY = 'lumetric_author_profile_v1';

// PERFIL PADRÃO (Placeholder para o Admin Local)
const DEFAULT_PROFILE: AuthorProfile = {
  name: "Admin Lumetric",
  role: "Editor Chefe",
  bio: "Especialista em Estratégias de Dominação de Mercado. Transformo dados brutos em narrativas que vendem milhões.",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
};

// CATEGORIAS MESTRAS
const MASTER_CATEGORIES = [
  "ESTRATÉGIA", "MARKETING", "VENDAS", "IA & TECH", "FINANÇAS",
  "AGRONEGÓCIO", "ARQUITETURA", "AUTOMOTIVO", "BELEZA", "CIÊNCIA",
  "DESIGN", "EDUCAÇÃO", "ENGENHARIA", "ESPORTES", "GAMING",
  "GASTRONOMIA", "IMOBILIÁRIO", "JURÍDICO", "LOGÍSTICA",
  "MODA & ESTILO", "MÚSICA", "SAÚDE & MED", "TURISMO"
];

const FILTER_CATEGORIES = ["TODOS", ...MASTER_CATEGORIES];

const Blog: React.FC<BlogProps> = ({ onBack }) => {
  const { t } = useLanguage();
  // --- STATE DE DADOS ---
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- STATE DO PERFIL DO AUTOR (Local) ---
  const [authorProfile, setAuthorProfile] = useState<AuthorProfile>(() => {
    try {
      const savedProfile = localStorage.getItem(PROFILE_KEY);
      return savedProfile ? JSON.parse(savedProfile) : DEFAULT_PROFILE;
    } catch (error) {
      console.error(error); 
      return DEFAULT_PROFILE;
    }
  });

  // Salva perfil no LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(authorProfile));
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
    }
  }, [authorProfile]);

  // --- FETCH POSTS DO SUPABASE ---
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Mapear dados do Supabase para o formato do frontend
      const mappedPosts: BlogPost[] = data?.map((post: any) => ({
        id: post.id,
        category: post.category,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image_url,
        // Formata data: "12 OUT"
        date: new Date(post.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).toUpperCase().replace('.', ''),
        fires: post.fires_count,
        author: post.author_name,
        isNew: post.is_new
      })) || [];

      setPosts(mappedPosts);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      triggerToast("Erro ao carregar o feed de artigos.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- STATE DE NAVEGAÇÃO E FILTROS ---
  const [activeCategory, setActiveCategory] = useState("TODOS");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // --- STATE DE SEGURANÇA E MODAIS ---
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false); 
  const [showToast, setShowToast] = useState(false); 
  const [toastMessage, setToastMessage] = useState(""); 
  const [passwordInput, setPasswordInput] = useState("");
  
  // --- STATE DO FORMULÁRIO DE APLICAÇÃO ---
  const [applicationForm, setApplicationForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    linkedin: "",
    headline: "",
    pitch: "",
    niche: ""
  });
  const [isSubmittingApp, setIsSubmittingApp] = useState(false);

  // --- STATE DO EDITOR ---
  const [editorTitle, setEditorTitle] = useState("");
  const [editorCategory, setEditorCategory] = useState("ESTRATÉGIA");
  const [editorContent, setEditorContent] = useState("");
  const [editorImage, setEditorImage] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  // --- STATE DE ENGAJAMENTO (Local p/ UI instantânea) ---
  const [localFires, setLocalFires] = useState(0);
  const [hasFired, setHasFired] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getReadingTime = (content: string) => {
    if (!content) return "1 min";
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min`;
  };

  // --- DEEP LINKING ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('post');
    if (postId && posts.length > 0) {
      const foundPost = posts.find((p) => p.id.toString() === postId.toString());
      if (foundPost) setSelectedArticle(foundPost);
    }
  }, [posts]);

  const handleUrlUpdate = (postId: string | null) => {
    try {
      const url = new URL(window.location.href);
      if (postId) {
        url.searchParams.set('post', postId);
      } else {
        url.searchParams.delete('post');
      }
      window.history.pushState({}, '', url.toString());
    } catch (error) {
      console.warn('Atualização de URL bloqueada.', error);
    }
  };

  const openArticle = (post: BlogPost) => {
    setSelectedArticle(post);
    handleUrlUpdate(post.id.toString());
  };

  const closeArticle = () => {
    setSelectedArticle(null);
    handleUrlUpdate(null);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null; 
    e.currentTarget.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800";
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "TODOS" || post.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    if (selectedArticle) {
      window.scrollTo(0, 0);
      setLocalFires(selectedArticle.fires);
      setHasFired(false);
    }
  }, [selectedArticle]);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleShare = (platform: 'whatsapp' | 'linkedin' | 'twitter' | 'copy') => {
    if (!selectedArticle) return;
    const url = window.location.href;
    const text = `${selectedArticle.title} - Leia na LUMETRIC`;

    if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        triggerToast("Link de Dominação Copiado");
      }).catch(() => triggerToast("Link Copiado"));
      return;
    }
    
     let shareUrl = '';
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "admin123") {
      setShowLoginModal(false);
      setIsEditing(true);
      setPasswordInput("");
    } else {
      triggerToast("Acesso Negado: Senha Incorreta.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 800 * 1024) {
        alert("A imagem é muito grande. Use uma menor que 800KB para salvar.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditorImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setShowProfileModal(false);
    triggerToast("Perfil atualizado localmente.");
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingApp(true);
    try {
      const { error } = await supabase.from('author_applications').insert([{
        full_name: applicationForm.name,
        email: applicationForm.email,
        whatsapp: applicationForm.whatsapp,
        portfolio_url: applicationForm.linkedin,
        niche: applicationForm.niche,
        headline_test: applicationForm.headline,
        pitch: applicationForm.pitch
      }]);
      if (error) throw error;
      
      triggerToast("Aplicação enviada! Analisaremos seu perfil.");
      setShowWaitlistModal(false);
      setApplicationForm({ name: "", email: "", whatsapp: "", linkedin: "", headline: "", pitch: "", niche: "" });
    } catch (error) {
      console.error('Erro:', error);
      alert("Erro ao enviar. Tente novamente.");
    } finally {
        setIsSubmittingApp(false);
    }
  };

  // --- FUNÇÃO DE ENGAJAMENTO (FIRES) ---
  const handleFireClick = async () => {
    if (!hasFired && selectedArticle) {
      // Otimistic update
      setLocalFires(prev => prev + 1);
      setHasFired(true);

      // Atualiza no Supabase
      try {
        const { error } = await supabase
          .from('blog_posts')
          .update({ fires_count: localFires + 1 }) // Usa localFires atualizado
          .eq('id', selectedArticle.id);
        
        if (error) throw error;
      } catch (err) {
        console.error("Erro ao atualizar fires:", err);
      }
    }
  };

  // --- FUNÇÃO DE PUBLICAR ARTIGO (SUPABASE) ---
  const handlePublish = async () => {
    if (!editorTitle.trim() || !editorContent.trim()) {
      alert("Título e Conteúdo são obrigatórios.");
      return;
    }

    setIsPublishing(true);

    try {
        const excerptText = editorContent.substring(0, 100).replace(/<[^>]*>?/gm, '') + "...";
        const imageToSave = editorImage || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800";

        // Insere no banco
        const { error } = await supabase
            .from('blog_posts')
            .insert([{
                title: editorTitle,
                category: editorCategory,
                content: editorContent.replace(/\n/g, "<br/>"),
                excerpt: excerptText,
                image_url: imageToSave,
                author_name: authorProfile.name,
                is_new: true,
                fires_count: 0
            }]);

        if (error) throw error;

        // Recarregar posts para aparecer o novo
        await fetchPosts();
        
        setIsEditing(false);
        triggerToast("Artigo publicado e salvo no banco!");
        
        // Reset Form
        setEditorTitle("");
        setEditorContent("");
        setEditorImage("");
        setEditorCategory("ESTRATÉGIA");

    } catch (error) {
        console.error("Erro ao publicar:", error);
        alert("Erro ao publicar artigo. Verifique sua conexão com o banco.");
    } finally {
        setIsPublishing(false);
    }
  };

  const BlogFooter = () => (
    <footer className="w-full border-t border-white/5 bg-[#050505] py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
           <div className="flex items-center gap-2">
             <img src="/logo.png" alt="LUMETRIC" className="h-6 w-auto object-contain grayscale brightness-150" onError={(e) => {e.currentTarget.style.display='none'}} />
             <h4 className="font-bold text-white tracking-widest text-lg">LUMETRIC <span className="text-primary text-xs align-top">INSIGHTS</span></h4>
           </div>
           <p className="text-white/40 text-xs max-w-xs">Estratégias de dominação de mercado, entregues sem filtro.</p>
        </div>
        <div className="text-white/20 text-[10px] uppercase">
          © 2024 Lumetric Studio
        </div>
      </div>
    </footer>
  );

  // =========================================================================
  // VIEW 1: EDITOR (ADMIN)
  // =========================================================================
  if (isEditing) {
    return (
      <div className="min-h-screen w-full bg-[#050505] text-white animate-fade-in flex flex-col relative">
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="material-symbols-outlined text-primary text-xl md:text-2xl">edit_document</span>
            <span className="font-bold tracking-widest text-xs md:text-sm text-white/50 hidden xs:inline">STUDIO DE CRIAÇÃO</span>
          </div>
          <div className="flex gap-2 md:gap-4 items-center">
            <button 
              onClick={() => setShowProfileModal(true)}
              className="size-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-primary transition-colors mr-1 md:mr-2"
              title="Editar Perfil do Autor"
            >
              <span className="material-symbols-outlined text-base md:text-lg">settings</span>
            </button>

            <button 
              onClick={() => setIsEditing(false)}
              className="px-3 md:px-6 py-2 text-xs md:text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              {t('blog.cancel_btn')}
            </button>
            <button 
              onClick={handlePublish}
              disabled={isPublishing}
              className={`px-4 md:px-6 py-2 bg-primary text-white rounded shadow-[0_0_20px_-5px_rgba(109,9,179,0.5)] hover:bg-white hover:text-primary transition-all text-xs md:text-sm font-bold uppercase tracking-widest ${isPublishing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isPublishing ? '...' : t('blog.publish_btn')}
            </button>
          </div>
        </nav>

        {/* Área de Edição */}
        <div className="max-w-4xl mx-auto w-full px-4 md:px-6 pt-24 md:pt-32 pb-20 flex-1 flex flex-col gap-6 md:gap-8">
          
          <div className="w-full relative group">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="cover-upload"
            />
            
            {editorImage ? (
              <div className="relative w-full h-48 md:h-80 rounded-2xl overflow-hidden border border-white/20 group-hover:border-primary/50 transition-colors shadow-2xl">
                <img src={editorImage} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                   <label htmlFor="cover-upload" className="cursor-pointer px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-black rounded font-bold uppercase text-xs tracking-widest border border-white/20 transition-all">
                      Trocar
                   </label>
                   <button onClick={() => setEditorImage("")} className="px-4 py-2 bg-red-500/20 hover:bg-red-500 text-red-200 hover:text-white rounded font-bold uppercase text-xs tracking-widest border border-red-500/30 transition-all">
                      Remover
                   </button>
                </div>
              </div>
            ) : (
              <label 
                htmlFor="cover-upload" 
                className="w-full h-32 md:h-48 border-2 border-dashed border-white/10 hover:border-primary/50 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-white/5 hover:bg-white/[0.07] transition-all group"
              >
                <span className="material-symbols-outlined text-3xl md:text-4xl text-white/20 group-hover:text-primary mb-2 transition-colors">add_photo_alternate</span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Carregar Capa</span>
              </label>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Selecione a Categoria</label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {MASTER_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setEditorCategory(cat)}
                  className={`px-2 py-2 rounded border text-[10px] font-bold uppercase tracking-widest transition-all truncate
                    ${editorCategory === cat 
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white hover:border-white/20'}
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <input 
            type="text"
            placeholder="Título Impactante Aqui..."
            value={editorTitle}
            onChange={(e) => setEditorTitle(e.target.value)}
            className="w-full bg-transparent border-none text-4xl md:text-7xl font-bold text-white placeholder-white/20 focus:outline-none focus:ring-0 leading-tight"
          />

          <textarea 
            placeholder="Comece a escrever sua obra-prima..."
            value={editorContent}
            onChange={(e) => setEditorContent(e.target.value)}
            className="w-full flex-1 bg-transparent border-none text-lg md:text-2xl text-white/80 font-light leading-relaxed placeholder-white/10 focus:outline-none focus:ring-0 resize-none min-h-[50vh]"
          />
        </div>

        {/* MODAL PERFIL */}
        {showProfileModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#151515] border border-white/10 p-8 rounded-2xl w-full max-w-lg relative animate-fade-in shadow-2xl">
              <button 
                onClick={() => setShowProfileModal(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">badge</span>
                <h2 className="text-xl font-bold uppercase tracking-widest">Perfil do Autor</h2>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="flex items-center gap-6 mb-6">
                   <div className="w-20 h-20 rounded-full overflow-hidden border border-white/20 shrink-0">
                      <img src={authorProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1 space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">URL do Avatar</label>
                      <input 
                        type="text" 
                        value={authorProfile.avatar}
                        onChange={(e) => setAuthorProfile({...authorProfile, avatar: e.target.value})}
                        className="w-full bg-transparent border-b border-white/10 py-1 text-sm text-white focus:border-primary focus:outline-none"
                      />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Seu Nome</label>
                    <input 
                      type="text" 
                      value={authorProfile.name}
                      onChange={(e) => setAuthorProfile({...authorProfile, name: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:border-primary focus:outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Cargo / Título</label>
                    <input 
                      type="text" 
                      value={authorProfile.role}
                      onChange={(e) => setAuthorProfile({...authorProfile, role: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Mini Bio</label>
                  <textarea 
                    value={authorProfile.bio}
                    onChange={(e) => setAuthorProfile({...authorProfile, bio: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm text-white/80 focus:border-primary focus:outline-none h-24 resize-none leading-relaxed"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full h-12 bg-white text-black font-bold uppercase tracking-widest rounded hover:bg-primary hover:text-white transition-all shadow-lg"
                >
                  Salvar Alterações
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: MODO LEITURA (ARTIGO EXPANDIDO)
  // =========================================================================
  if (selectedArticle) {
    return (
      <div className="min-h-screen w-full bg-[#0a0a0a] text-white animate-fade-in relative flex flex-col">
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 px-4 md:px-6 py-4 flex justify-between items-center">
          <button 
            onClick={closeArticle}
            className="group flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
            {t('blog.back_grid')}
          </button>
          <span className="text-[10px] md:text-xs font-bold text-primary border border-primary/30 px-2 py-1 rounded bg-primary/10">
            {selectedArticle.category}
          </span>
        </nav>

        {/* --- SOCIAL SHARE BAR (DESKTOP) --- */}
        <div className="hidden lg:flex fixed left-10 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-6 animate-fade-in">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 -rotate-90 whitespace-nowrap mb-4">
             {t('blog.share_obsession')}
          </div>
          <button onClick={() => handleShare('whatsapp')} className="group flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-[#25D366] transition-all duration-300">
             <svg className="size-5 fill-white/50 group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg></button>
            <button onClick={() => handleShare('linkedin')} className="p-2 rounded-full bg-white/5 text-white/70 active:text-white active:bg-white/10"><svg className="size-6 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></button>
            <button onClick={() => handleShare('twitter')} className="p-2 rounded-full bg-white/5 text-white/70 active:text-white active:bg-white/10"><svg className="size-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></button>
            <button onClick={() => handleShare('copy')} className="p-2 rounded-full bg-white/5 text-white/70 active:text-white active:bg-white/10"><span className="material-symbols-outlined text-xl">link</span></button>
            <button onClick={handleFireClick} className={`p-2 rounded-full flex items-center gap-1 border ${hasFired ? 'border-orange-500 bg-orange-500/20 text-orange-500' : 'border-white/10 bg-white/5 text-white'}`}>
                <span className="material-symbols-outlined text-xl">local_fire_department</span>
                <span className="text-xs font-bold">{localFires}</span>
            </button>
        </div>

        {/* TOAST NOTIFICATION */}
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] z-[100] transition-all duration-300 flex items-center gap-3 ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
           <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
           <span className="font-bold text-sm uppercase tracking-widest">{toastMessage}</span>
        </div>

        {/* CONTENT */}
        <div className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 pt-32 pb-24">
            <div className="mb-10 text-center">
               <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{selectedArticle.title}</h1>
               <div className="flex items-center justify-center gap-4 text-xs text-white/50">
                  <span>{selectedArticle.date}</span>
                  <span className="size-1 bg-white/20 rounded-full"></span>
                  <span>{getReadingTime(selectedArticle.content)}</span>
                  <span className="size-1 bg-white/20 rounded-full"></span>
                  <span className="text-primary font-bold">{selectedArticle.author}</span>
               </div>
            </div>

            <div className="w-full h-[30vh] md:h-[50vh] rounded-2xl overflow-hidden mb-12 shadow-2xl relative">
                <img src={selectedArticle.image} alt={selectedArticle.title} onError={handleImageError} className="w-full h-full object-cover" />
            </div>

            <div 
               className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl text-white/80 leading-loose"
               dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
            />
        </div>

        {/* Floating Action Button Mobile */}
        <div className="lg:hidden fixed bottom-6 right-6 z-40">
           <button onClick={handleFireClick} className={`size-14 rounded-full flex items-center justify-center shadow-lg border ${hasFired ? 'bg-orange-600 border-orange-400 text-white' : 'bg-primary border-primary text-white'}`}>
              <span className="material-symbols-outlined text-2xl">local_fire_department</span>
           </button>
        </div>

        <BlogFooter />
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: GRID (LISTAGEM PADRÃO)
  // =========================================================================
  return (
    <div className="min-h-screen w-full bg-background-dark text-white animate-fade-in relative flex flex-col">
      
      <nav className="fixed top-0 left-0 w-full z-50 bg-background-dark/90 backdrop-blur-md border-b border-white/10 px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
            {t('blog.back_home')}
          </button>
          
          <div className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="LUMETRIC" 
              className="h-5 md:h-6 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNmQwOWIzIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PG1hc2sgaWQ9Im0iPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0id2hpdGUiLz48bGluZSB4MT0iNCIgeTE9IjgiIHgyPSIxMiIgeTI9IjEyIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjMiLz48L21hc2s+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOSIgbWFzaz0idXJsKCNtKSIvPjwvc3ZnPg==";
              }}
            />
            <div className="font-bold tracking-tight text-base md:text-lg hidden xs:block">
              LUMETRIC <span className="text-primary opacity-80">| INSIGHTS</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-28 md:pt-32 flex-1">
        
        <div className="mb-12">
            <h1 className="text-4xl xs:text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter mb-6">
              CONHECIMENTO<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">É PODER.</span>
            </h1>
        </div>

        {/* BARRA DE FILTROS E BUSCA */}
        <div className={`sticky top-[72px] z-40 transition-all duration-500 ease-in-out -mx-4 md:-mx-6 px-4 md:px-6 py-4 mb-10 ${isScrolled ? 'bg-background-dark/90 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent'}`}>
           <div className="space-y-4 max-w-7xl mx-auto">
             {/* Search Input */}
             <div className="relative w-full max-w-md">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30 material-symbols-outlined">search</span>
                <input 
                   type="text" 
                   placeholder={t('blog.search_placeholder')}
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full bg-transparent border-b border-white/20 py-2 pl-8 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-colors text-base md:text-lg"
                />
             </div>

             {/* Filters */}
             <div className="flex overflow-x-auto gap-6 md:gap-8 pb-2 no-scrollbar whitespace-nowrap mask-image-gradient">
              {FILTER_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs md:text-sm font-bold tracking-widest uppercase transition-all relative flex-shrink-0
                    ${activeCategory === cat ? 'text-white' : 'text-white/40 hover:text-white/70'}
                  `}
                >
                  {cat}
                  {activeCategory === cat && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary shadow-[0_0_10px_#6d09b3]"></span>
                  )}
                </button>
              ))}
            </div>
           </div>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-white/40 flex flex-col items-center">
             <div className="size-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
             <p>{t('blog.loading')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-24">
            {filteredPosts.map((post: any, index: number) => (
              <article 
                key={post.id}
                onClick={() => openArticle(post)}
                className="group bg-[#121212] border border-white/10 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_-5px_rgba(109,9,179,0.3)] hover:border-primary/50 flex flex-col h-full animate-fade-in-up fill-mode-forwards relative"
                style={{ animationDelay: `${Math.min(index * 100, 1000)}ms` }}
              >
                <div className="h-48 md:h-56 overflow-hidden relative bg-gray-800">
                  <img 
                    src={post.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"} 
                    alt={post.title} 
                    onError={handleImageError}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                  />
                  
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-white/10 flex items-center gap-1 z-10">
                    <span className="material-symbols-outlined text-[10px] text-orange-500">local_fire_department</span>
                    {post.fires}
                  </div>

                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-white/10 flex items-center gap-1 z-10">
                    <span className="material-symbols-outlined text-[10px] text-white/70">schedule</span>
                    {getReadingTime(post.content)}
                  </div>

                  {post.isNew && (
                    <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-lg animate-pulse border border-white/20 z-10">
                      Novo
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">{post.category}</span>
                    <span className="text-xs text-white/30 font-mono">{post.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-white transition-colors text-white/90">
                    {post.title}
                  </h3>
                  
                  <p 
                    className="text-white/50 text-sm mb-6 font-light leading-relaxed flex-1"
                    style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  >
                    {post.excerpt}
                  </p>
                  
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-white/40 group-hover:text-primary transition-colors">
                        {t('blog.read_now')}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all text-lg">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        
        {!isLoading && filteredPosts.length === 0 && (
          <div className="py-20 text-center text-white/40">
            <span className="material-symbols-outlined text-4xl mb-2">search_off</span>
            <p>{t('blog.empty_search')}</p>
          </div>
        )}

        {/* BANNER DE CTA (TORNE-SE AUTOR) */}
        <div className="w-full rounded-2xl border border-primary/50 bg-gradient-to-r from-[#121212] to-primary/10 p-6 md:p-16 text-center relative overflow-hidden group shadow-[0_0_40px_rgba(109,9,179,0.2)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-colors duration-500"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-block mb-4 text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] border border-primary/30 px-3 py-1 rounded-full bg-primary/10">
                {t('blog.cta_elite_title')}
              </span>
              <h3 className="text-2xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight whitespace-pre-line">
                {t('blog.cta_title')}
              </h3>
              <p className="text-white/60 mb-8 font-light text-sm md:text-lg">
                {t('blog.cta_subtitle')}
              </p>
              <button 
                onClick={() => setShowWaitlistModal(true)}
                className="px-6 md:px-8 py-3 md:py-4 bg-primary text-white rounded-lg font-bold text-sm md:text-base uppercase tracking-widest hover:bg-white hover:text-primary hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_-5px_rgba(109,9,179,0.5)]"
              >
                {t('blog.cta_button')}
              </button>
            </div>
        </div>

      </div>

      <BlogFooter />

      {/* BOTÃO DE SEGURANÇA (ADMIN) */}
      <div className="w-full border-t border-white/5 py-4 text-center bg-[#050505]">
        <button 
          onClick={() => setShowLoginModal(true)}
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 hover:text-primary transition-colors"
        >
          {t('blog.admin_area')}
        </button>
      </div>

      {/* MODAL DE LOGIN */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#151515] border border-white/10 p-8 rounded-2xl w-full max-w-sm relative animate-fade-in shadow-2xl">
            <button 
              onClick={() => { setShowLoginModal(false); setPasswordInput(""); }}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <div className="text-center mb-6">
              <span className="material-symbols-outlined text-primary text-4xl mb-2">lock</span>
              <h2 className="text-xl font-bold uppercase tracking-widest">Acesso Admin</h2>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <input 
                type="password" 
                autoFocus
                placeholder="Senha de Acesso" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full h-12 bg-white/5 border border-white/10 rounded px-4 text-white focus:border-primary focus:outline-none text-center tracking-widest"
              />
              <button 
                type="submit" 
                className="w-full h-12 bg-primary text-white font-bold uppercase tracking-widest rounded hover:bg-white hover:text-primary transition-all shadow-lg shadow-primary/20"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL WAITLIST / APLICAÇÃO (SUPABASE) */}
      {showWaitlistModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center md:px-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#121212] border-0 md:border border-white/10 p-6 md:p-8 rounded-none md:rounded-2xl w-full max-w-2xl h-full md:h-auto md:max-h-[95vh] relative animate-fade-in shadow-2xl flex flex-col">
            <button 
              onClick={() => setShowWaitlistModal(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white z-10"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <div className="text-center mb-6 mt-4 md:mt-0">
               <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest mb-2 text-white">Aplicação para Autor Verificado</h2>
               <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                 A Lumetric busca mentes obcecadas por resultado. Prove que você é uma delas.
               </p>
            </div>

            <form 
              id="author-application-form"
              onSubmit={handleWaitlistSubmit}
              className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1"
            >
              {/* CONFIGURAÇÃO DO FORMSUBMIT */}
              <input type="hidden" name="_subject" value="Nova Candidatura de Autor - LUMETRIC" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Nome Completo *</label>
                   <input 
                     type="text" 
                     name="nome_completo"
                     required
                     value={applicationForm.name}
                     onChange={(e) => setApplicationForm({...applicationForm, name: e.target.value})}
                     className="w-full h-12 bg-[#1A1A1A] border border-white/10 rounded px-4 text-white focus:border-primary focus:outline-none placeholder-white/20 transition-all"
                     placeholder="Seu Nome"
                   />
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Email Corporativo *</label>
                   <input 
                     type="email" 
                     name="email"
                     required
                     value={applicationForm.email}
                     onChange={(e) => setApplicationForm({...applicationForm, email: e.target.value})}
                     className="w-full h-12 bg-[#1A1A1A] border border-white/10 rounded px-4 text-white focus:border-primary focus:outline-none placeholder-white/20 transition-all"
                     placeholder="seu@empresa.com"
                   />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">WhatsApp *</label>
                   <input 
                     type="tel" 
                     name="whatsapp"
                     required
                     value={applicationForm.whatsapp}
                     onChange={(e) => setApplicationForm({...applicationForm, whatsapp: e.target.value})}
                     className="w-full h-12 bg-[#1A1A1A] border border-white/10 rounded px-4 text-white focus:border-primary focus:outline-none placeholder-white/20 transition-all"
                     placeholder="(00) 00000-0000"
                   />
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">LinkedIn / Portfólio</label>
                   <input 
                     type="url" 
                     name="portfolio"
                     value={applicationForm.linkedin}
                     onChange={(e) => setApplicationForm({...applicationForm, linkedin: e.target.value})}
                     className="w-full h-12 bg-[#1A1A1A] border border-white/10 rounded px-4 text-white focus:border-primary focus:outline-none placeholder-white/20 transition-all"
                     placeholder="https://"
                   />
                </div>
              </div>

              <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Seu Nicho de Mercado *</label>
                  <select
                    name="nicho"
                    required
                    value={applicationForm.niche}
                    onChange={(e) => setApplicationForm({...applicationForm, niche: e.target.value})}
                    className="w-full h-12 bg-[#1A1A1A] border border-white/10 rounded px-4 text-white focus:border-primary focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-gray-500">Selecione sua área de atuação</option>
                    {MASTER_CATEGORIES.map(cat => (
                      <option key={cat} value={cat} className="bg-[#1A1A1A] text-white">{cat}</option>
                    ))}
                  </select>
              </div>

              <div className="pt-2 border-t border-white/5 mt-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-primary ml-1 block mb-2">Teste de Criatividade</label>
                <input 
                  type="text" 
                  name="manchete_teste"
                  required
                  value={applicationForm.headline}
                  onChange={(e) => setApplicationForm({...applicationForm, headline: e.target.value})}
                  className="w-full h-12 bg-[#1A1A1A] border border-white/10 rounded px-4 text-white focus:border-primary focus:outline-none placeholder-white/20 transition-all"
                  placeholder="Qual seria a Manchete (Título) do seu primeiro artigo?"
                />
              </div>

              <div className="space-y-1">
                 <textarea 
                   name="pitch"
                   required
                   value={applicationForm.pitch}
                   onChange={(e) => setApplicationForm({...applicationForm, pitch: e.target.value})}
                   className="w-full h-32 bg-[#1A1A1A] border border-white/10 rounded p-4 text-white focus:border-primary focus:outline-none placeholder-white/20 resize-none transition-all"
                   placeholder="Pitch: Por que devemos ceder espaço para você? Qual é a sua expertise única?"
                 />
              </div>

              <button 
                type="submit" 
                disabled={isSubmittingApp}
                className={`w-full h-14 bg-primary text-white font-bold uppercase tracking-widest rounded transition-all shadow-[0_0_20px_-5px_rgba(109,9,179,0.4)] mt-4 mb-4 md:mb-0
                  ${isSubmittingApp 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-white hover:text-primary hover:scale-[1.01]'
                  }`}
              >
                {isSubmittingApp ? 'Enviando Aplicação...' : 'Enviar Aplicação para Análise'}
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleReveal {
            from { opacity: 0; transform: scale(1.05); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-reveal {
          animation: scaleReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .fill-mode-forwards {
            animation-fill-mode: forwards;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Blog;