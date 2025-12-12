import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'guest' | 'subscriber' | 'admin';

export interface User {
  email: string;
  role: UserRole;
  name?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: UserRole;
  date: string;
  image: string;
  category: string;
}

interface BlogContextType {
  user: User | null;
  posts: BlogPost[];
  login: (email: string) => void;
  logout: () => void;
  subscribe: () => void;
  addPost: (post: Omit<BlogPost, 'id' | 'date' | 'author' | 'authorRole'>) => void;
  getPost: (id: string) => BlogPost | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'O Fim do Tráfego Pago como Você Conhece',
    excerpt: 'Porque o CPC está subindo e a única saída é a construção de marca.',
    content: `
      <p>O mercado mudou. A era do "clique barato" acabou. Se você ainda está jogando o jogo de 2019, sua empresa está sangrando dinheiro.</p>
      <br/>
      <p>O algoritmo não quer mais o seu dinheiro de curto prazo; ele quer retenção. Plataformas como Meta e TikTok estão priorizando criativos que geram engajamento real, não apenas cliques acidentais.</p>
      <br/>
      <h3>A Nova Regra de Ouro</h3>
      <p>Branding não é mais opcional. Branding é a única forma de diminuir o seu CAC a longo prazo.</p>
    `,
    author: 'Admin',
    authorRole: 'admin',
    date: '10 Out 2023',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    category: 'Estratégia'
  },
  {
    id: '2',
    title: 'Psicologia das Cores no Varejo de Luxo',
    excerpt: 'Como o preto e o roxo influenciam a percepção de alto valor.',
    content: 'O luxo não grita, ele sussurra. Neste artigo, exploramos como a ausência de cor pode valer mais do que o arco-íris inteiro...',
    author: 'Equipe Clicksales',
    authorRole: 'subscriber',
    date: '12 Out 2023',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop',
    category: 'Design'
  },
  {
    id: '3',
    title: 'Engenharia de Menu: Vendendo sem Vender',
    excerpt: 'Técnicas de UX aplicadas a cardápios digitais que aumentam o ticket médio.',
    content: 'A forma como você apresenta o preço muda tudo. Vamos dissecar a estrutura de um menu que converte 30% mais...',
    author: 'Admin',
    authorRole: 'admin',
    date: '15 Out 2023',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    category: 'Conversão'
  }
];

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);

  const login = (email: string) => {
    // ADMIN RULE
    if (email.toLowerCase() === 'admin@clicksales.io') {
      setUser({ email, role: 'admin', name: 'CEO' });
    } else {
      setUser({ email, role: 'guest', name: email.split('@')[0] });
    }
  };

  const logout = () => setUser(null);

  const subscribe = () => {
    if (user) {
      setUser({ ...user, role: 'subscriber' });
    }
  };

  const addPost = (newPostData: Omit<BlogPost, 'id' | 'date' | 'author' | 'authorRole'>) => {
    if (!user) return;

    const newPost: BlogPost = {
      ...newPostData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
      author: user.name || 'Anônimo',
      authorRole: user.role
    };

    setPosts([newPost, ...posts]);
  };

  const getPost = (id: string) => posts.find(p => p.id === id);

  return (
    <BlogContext.Provider value={{ user, posts, login, logout, subscribe, addPost, getPost }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};