import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPost } = useBlog();
  const navigate = useNavigate();
  const [readingProgress, setReadingProgress] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const post = id ? getPost(id) : undefined;

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      const progress = (scrollPosition / totalHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = (platform: string) => {
    if (!post) return;
    const url = window.location.href;
    const text = post.title;

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowShareMenu(false);
      }, 2000);
      return;
    }

    let shareUrl = '';
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setShowShareMenu(false);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold text-white">Artigo não encontrado</h1>
        <button onClick={() => navigate('/blog')} className="text-primary hover:underline">Voltar ao Blog</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-primary selection:text-white">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-primary z-[100] transition-all duration-100 ease-out shadow-[0_0_10px_rgba(109,9,179,0.8)]" style={{ width: `${readingProgress}%` }}></div>

      {/* Header Minimal */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
        <div className="pointer-events-auto bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 flex items-center gap-4">
            <button onClick={() => navigate('/blog')} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold">
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Blog
            </button>
            <div className="w-px h-4 bg-white/20"></div>
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors uppercase tracking-widest text-xs font-bold">
                Home
            </button>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto pt-32 px-6 pb-32">
        <header className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block px-3 py-1 border border-white/20 rounded-full text-xs text-white/60 uppercase tracking-widest mb-6">
                {post.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8 tracking-tight">{post.title}</h1>
            <div className="flex items-center justify-center gap-6 text-sm text-white/50">
                <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                        {post.author.charAt(0)}
                    </div>
                    <span>{post.author}</span>
                </div>
                <span>•</span>
                <span>{post.date}</span>
            </div>
        </header>

        <div className="w-full h-[50vh] rounded-2xl overflow-hidden mb-16 shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div 
            className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl text-white/80 leading-loose animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
            dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative">
            <div className="text-left">
                <h4 className="text-white font-bold mb-1">Gostou deste insight?</h4>
                <p className="text-white/50 text-sm">Compartilhe conhecimento ou inicie uma discussão.</p>
            </div>
            
            <div className="flex gap-4">
                {/* Share Dropdown Container */}
                <div className="relative">
                    <button 
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className={`size-10 rounded-full flex items-center justify-center transition-colors ${showShareMenu ? 'bg-primary text-white' : 'bg-white/5 text-white hover:bg-primary hover:text-white'}`}
                        title="Compartilhar"
                    >
                        <span className="material-symbols-outlined text-lg">share</span>
                    </button>

                    {showShareMenu && (
                        <div className="absolute bottom-full right-0 mb-4 w-48 bg-[#151515] border border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl animate-fade-in-up origin-bottom-right z-20">
                            <div className="p-1">
                                <button 
                                    onClick={() => handleShare('twitter')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors text-left rounded-lg"
                                >
                                    <svg className="size-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                    Twitter / X
                                </button>
                                <button 
                                    onClick={() => handleShare('facebook')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors text-left rounded-lg"
                                >
                                    <svg className="size-4 fill-current" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.603-2.797 2.87v1.1h3.928l-.576 3.667h-3.352v7.98h-5.018z"/></svg>
                                    Facebook
                                </button>
                                <button 
                                    onClick={() => handleShare('linkedin')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors text-left rounded-lg"
                                >
                                    <svg className="size-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                    LinkedIn
                                </button>
                                <div className="h-px bg-white/10 my-1"></div>
                                <button 
                                    onClick={() => handleShare('copy')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors text-left rounded-lg"
                                >
                                    <span className="material-symbols-outlined text-base">
                                        {copied ? 'check' : 'content_copy'}
                                    </span>
                                    {copied ? 'Copiado!' : 'Copiar Link'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <button className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><span className="material-symbols-outlined text-lg">favorite</span></button>
            </div>
        </div>
      </article>

      {/* Overlay to close menu when clicking outside */}
      {showShareMenu && (
        <div className="fixed inset-0 z-10" onClick={() => setShowShareMenu(false)}></div>
      )}

      <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default BlogPost;