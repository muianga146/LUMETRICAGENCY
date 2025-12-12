import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const BlogEditor: React.FC = () => {
  const { user, addPost } = useBlog();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1550751827-4bd374c3f58b');

  // Protection Logic
  if (!user || (user.role === 'guest')) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center text-center p-4">
            <div>
                <h1 className="text-3xl text-red-500 font-bold mb-4">Acesso Negado</h1>
                <p className="text-white/60 mb-8">Você precisa ser um Assinante VIP ou Admin para acessar o editor.</p>
                <button onClick={() => navigate('/blog')} className="px-6 py-3 bg-white text-black font-bold uppercase rounded">Voltar</button>
            </div>
        </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!title || !content) return;

    addPost({
        title,
        excerpt: excerpt || 'Sem resumo',
        content: content, // In a real app, this would come from a rich text editor
        image: imageUrl,
        category: category || 'Geral'
    });

    navigate('/blog');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-white/10 p-6 flex justify-between items-center sticky top-0 bg-[#0a0a0a] z-50">
        <h1 className="font-bold text-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">edit_document</span>
            Studio de Criação
        </h1>
        <div className="flex gap-4">
            <button onClick={() => navigate('/blog')} className="px-4 py-2 text-sm font-bold text-white/50 hover:text-white">CANCELAR</button>
            <button form="post-form" type="submit" className="px-6 py-2 bg-primary text-white text-sm font-bold uppercase tracking-widest rounded hover:bg-white hover:text-primary transition-colors">
                Publicar
            </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6 md:p-12">
        <form id="post-form" onSubmit={handleSubmit} className="space-y-8 animate-fade-in-up">
            
            <div className="space-y-2">
                <label className="text-xs uppercase font-bold tracking-widest text-white/40">Imagem de Capa (URL)</label>
                <input 
                    type="text" 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-primary focus:outline-none font-mono text-sm"
                />
            </div>

            <div className="space-y-2">
                <input 
                    type="text" 
                    placeholder="Título Impactante" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-transparent border-none text-4xl md:text-6xl font-bold placeholder:text-white/20 focus:ring-0 focus:outline-none"
                    autoFocus
                />
            </div>

            <div className="flex gap-4">
                 <input 
                    type="text" 
                    placeholder="Categoria (ex: Estratégia)" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded px-3 py-1 text-sm focus:border-primary focus:outline-none w-48"
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase font-bold tracking-widest text-white/40">Resumo (SEO)</label>
                <textarea 
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Escreva um gancho curto para o card..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white/80 focus:border-primary focus:outline-none h-24 resize-none"
                />
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10">
                <label className="text-xs uppercase font-bold tracking-widest text-white/40">Conteúdo (HTML Permitido)</label>
                <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Comece a escrever sua obra-prima..."
                    className="w-full bg-transparent border-none text-lg leading-relaxed text-white/90 placeholder:text-white/20 focus:ring-0 focus:outline-none min-h-[50vh] resize-none font-serif"
                />
            </div>
        </form>
      </div>

      <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default BlogEditor;