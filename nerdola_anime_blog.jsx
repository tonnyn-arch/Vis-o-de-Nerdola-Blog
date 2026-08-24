import React, { useState, useEffect, useRef } from "react";

/* ============================================================
   CONFIG — edite aqui
   ============================================================ */
const SITE_NAME = "VISÃO DE NERDOLA";
const SITE_TAGLINE = "Animes, mangás e tudo que rola no universo otaku";
const LOGO_IMAGE_URL = "/mnt/user-data/outputs/nerdola_logo.png";
const YT_HANDLE = "@visaodenerdola";
const YT_URL = `https://www.youtube.com/${YT_HANDLE}`;
const YT_CHANNEL_NAME = "Visão de Nerdola";

// Quem pode publicar. Adicione ou remova códigos aqui — cada string é uma "chave" de admin.
// Compartilhe a chave só com quem você autorizar a postar.
const ADMIN_ACCESS_CODES = ["nerdola2026"];

const CATEGORIES = ["Animes", "Mangás", "Notícias", "Reviews", "Cultura Pop"];

const STORAGE_KEY = "nerdola-posts-v1";

/* ============================================================
   SEED — posts de exemplo (apague/edite pelo painel depois de logar)
   ============================================================ */
const SEED_POSTS = [
  {
    id: "seed-1",
    title: "Temporada de outono: os 5 animes que estão dominando a conversa",
    category: "Animes",
    excerpt:
      "Do sobrenatural ao slice of life, a leva de outono trouxe apostas fortes dos estúdios — separamos os lançamentos que estão pegando fogo nas redes.",
    content:
      "A cada temporada o calendário de simulcast fica mais concorrido, e esse outono não foi diferente. Estúdios apostaram em adaptações de mangás com base de fãs consolidada, misturando arcos de ação com respiros de comédia para segurar o ritmo semanal.\n\nO que chama atenção não é só a qualidade da animação — vários times de produção investiram pesado em cenas-chave, guardando orçamento para os momentos que viralizam — mas também como os estúdios estão lendo o timing dos cortes semanais para manter a audiência voltando.\n\nSe você está sem tempo de acompanhar tudo, o conselho é simples: escolha dois títulos para assistir semana a semana e deixe o resto para maratonar quando a temporada fechar. Mangá de origem quase sempre entrega contexto que o anime não tem espaço para explicar.",
    imageUrl: "",
    author: "Redação Nerdola",
    date: "2026-08-18",
    featured: true,
  },
  {
    id: "seed-2",
    title: "Guia de leitura: por onde começar se você nunca leu mangá",
    category: "Mangás",
    excerpt:
      "Formato, sentido de leitura, edições físicas vs. digitais: um guia sem enrolação para quem quer sair do anime e migrar pro papel.",
    content:
      "Migrar do anime para o mangá assusta no começo — o sentido de leitura da direita pra esquerda, os volumes que custam mais caro que um livro comum, a quantidade de séries em andamento. Mas o hábito se forma rápido depois dos primeiros capítulos.\n\nUma dica prática: comece por uma obra já finalizada. Séries com fim fechado evitam a ansiedade de esperar lançamento mensal e dão uma visão completa do trabalho do autor, do primeiro traço ao arco final.\n\nEdições físicas valem pelo papel e pelo extra de capa, mas as plataformas digitais são melhores pra testar uma obra sem compromisso antes de gastar com a coleção completa.",
    imageUrl: "",
    author: "Redação Nerdola",
    date: "2026-08-12",
    featured: false,
  },
  {
    id: "seed-3",
    title: "Bastidores: como os estúdios decidem o que vira anime",
    category: "Notícias",
    excerpt:
      "Nem todo mangá de sucesso vira anime — entenda os critérios de mercado, engajamento e janela de produção por trás dessa escolha.",
    content:
      "Transformar um mangá em anime é decisão de negócio antes de ser decisão criativa. Editoras acompanham vendas de volume, engajamento em plataformas de leitura e até menções em redes sociais antes de fechar parceria com um estúdio de animação.\n\nO tempo de produção também pesa: um anime de qualidade leva, em média, de um a três anos entre aprovação e estreia, dependendo da complexidade da arte e do tamanho do elenco de dubladores envolvido.\n\nPor isso obras com fandom internacional forte tendem a furar a fila — o retorno financeiro projetado é maior e justifica o investimento em uma temporada de 24 episódios ou mais.",
    imageUrl: "",
    author: "Redação Nerdola",
    date: "2026-08-05",
    featured: false,
  },
  {
    id: "seed-4",
    title: "Review: o arco mais recente entrega o que prometeu?",
    category: "Reviews",
    excerpt:
      "Analisamos ritmo, direção de arte e adaptação de roteiro do arco que fechou a temporada — com nota final e o que ficou devendo.",
    content:
      "Arcos de fechamento de temporada carregam a responsabilidade de amarrar pontas soltas sem sacrificar o ritmo. Nesse caso específico, a direção optou por condensar capítulos inteiros do material original em poucos episódios, o que funcionou bem para quem já leu o mangá, mas pode ter deixado espectadores novos um pouco perdidos em certas transições.\n\nA trilha sonora merece destaque: o uso de leitmotifs recorrentes amarrou emocionalmente cenas que, na página, dependiam só do desenho de expressão do personagem.\n\nNo saldo geral, a adaptação cumpre o que promete — não é perfeita, mas honra o material de origem e deixa gancho forte para uma possível segunda temporada.",
    imageUrl: "",
    author: "Redação Nerdola",
    date: "2026-07-29",
    featured: false,
  },
  {
    id: "seed-5",
    title: "Cultura pop: por que eventos de anime não param de crescer no Brasil",
    category: "Cultura Pop",
    excerpt:
      "De convenções regionais a eventos com milhares de cosplayers, o mercado de eventos otaku brasileiro vive um momento de expansão.",
    content:
      "O circuito de convenções cresceu de forma constante nos últimos anos, puxado por um público que não se contenta mais em consumir anime só em casa. Cosplay, feiras de importados e paineis com dubladores viraram parte central da experiência, não só um complemento.\n\nEsse crescimento também aqueceu o mercado local de arte e mercadoria independente — muitos artistas que hoje vivem de comissões começaram vendendo prints em uma mesa de artista alley.\n\nA expectativa para os próximos anos é de consolidação: menos eventos pequenos competindo pela mesma data, e mais eventos regionais ganhando porte de convenção nacional.",
    imageUrl: "",
    author: "Redação Nerdola",
    date: "2026-07-20",
    featured: false,
  },
];

/* ============================================================
   HELPERS
   ============================================================ */
function formatDate(iso) {
  try {
    const d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  } catch {
    return iso;
  }
}

function makeId() {
  return "post-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
}

/* ============================================================
   PEQUENOS COMPONENTES VISUAIS
   ============================================================ */
function ScreentonePlaceholder({ label }) {
  return (
    <div className="cover-placeholder" aria-hidden="true">
      <div className="cover-placeholder-label">{label}</div>
    </div>
  );
}

function AdSlot({ size = "300x250", context = "sidebar" }) {
  return (
    <div className={`ad-slot ad-slot--${context}`} role="complementary" aria-label="Espaço publicitário">
      <span className="ad-slot-eyebrow">Publicidade</span>
      <span className="ad-slot-size">{size}</span>
      <span className="ad-slot-sub">Espaço disponível para anúncio</span>
    </div>
  );
}

function YoutubePromo({ compact = false }) {
  return (
    <a href={YT_URL} target="_blank" rel="noopener noreferrer" className={`yt-promo ${compact ? "yt-promo--compact" : ""}`}>
      <span className="yt-promo-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path
            fill="currentColor"
            d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5V8.5l6.3 3.5-6.3 3.5Z"
          />
        </svg>
      </span>
      <span className="yt-promo-text">
        <strong>ACOMPANHE O VISÃO DE NERDOLA NO YOUTUBE:</strong> {YT_CHANNEL_NAME} ({YT_HANDLE})
      </span>
    </a>
  );
}

/* ============================================================
   HEADER
   ============================================================ */
function Header({ isAdmin, onLoginClick, onLogout, onNewPost, activeCategory, onCategory, onHome }) {
  return (
    <header className="site-header">
      <div className="site-header-top">
        <button className="logo-link" onClick={onHome} aria-label="Página inicial">
          {LOGO_IMAGE_URL ? (
            <img src={LOGO_IMAGE_URL} alt={SITE_NAME} className="logo-img" />
          ) : (
            <span className="logo-wordmark">
              <span className="logo-main">VISÃO DE</span>
              <span className="logo-sub">NERDOLA</span>
            </span>
          )}
        </button>

        <div className="header-actions">
          {isAdmin ? (
            <>
              <button className="btn btn-gold" onClick={onNewPost}>+ Nova postagem</button>
              <button className="btn btn-ghost" onClick={onLogout}>Sair</button>
            </>
          ) : (
            <button className="btn btn-ghost btn-admin" onClick={onLoginClick}>Área do admin</button>
          )}
        </div>
      </div>

      <nav className="site-nav" aria-label="Categorias">
        <button className={`nav-link ${activeCategory === null ? "is-active" : ""}`} onClick={() => onCategory(null)}>
          Início
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`nav-link ${activeCategory === cat ? "is-active" : ""}`}
            onClick={() => onCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>
    </header>
  );
}

/* ============================================================
   LOGIN MODAL
   ============================================================ */
function LoginModal({ onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const match = ADMIN_ACCESS_CODES.some((c) => c.trim().toLowerCase() === code.trim().toLowerCase());
    if (match && name.trim()) {
      onSuccess(name.trim());
    } else {
      setError("Nome ou código de acesso incorretos.");
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar">×</button>
        <span className="modal-eyebrow">Acesso restrito</span>
        <h2 className="modal-title">Entrar como admin</h2>
        <p className="modal-hint">Peça seu código de acesso a quem administra o site.</p>
        <form onSubmit={handleSubmit} className="modal-form">
          <label className="field-label">
            Seu nome
            <input value={name} onChange={(e) => setName(e.target.value)} className="field-input" required />
          </label>
          <label className="field-label">
            Código de acesso
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="field-input"
              required
            />
          </label>
          {error && <p className="field-error">{error}</p>}
          <button type="submit" className="btn btn-gold btn-block">Entrar</button>
        </form>
      </div>
    </div>
  );
}

/* ============================================================
   EDITOR (criar / editar post)
   ============================================================ */
function PostEditor({ initial, onCancel, onSave, onDelete }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [category, setCategory] = useState(initial?.category || CATEGORIES[0]);
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [content, setContent] = useState(initial?.content || "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl || "");
  const [featured, setFeatured] = useState(initial?.featured || false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim() || !content.trim()) return;
    onSave({
      id: initial?.id || makeId(),
      title: title.trim(),
      category,
      excerpt: excerpt.trim(),
      content: content.trim(),
      imageUrl: imageUrl.trim(),
      author: initial?.author || "Redação Nerdola",
      date: initial?.date || new Date().toISOString().slice(0, 10),
      featured,
    });
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-panel modal-panel--wide" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onCancel} aria-label="Fechar">×</button>
        <span className="modal-eyebrow">{initial ? "Editar postagem" : "Nova postagem"}</span>
        <h2 className="modal-title">{initial ? "Atualizar matéria" : "Escrever nova matéria"}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label className="field-label">
            Título
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="field-input" required />
          </label>

          <label className="field-label">
            Categoria
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="field-input">
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>

          <label className="field-label">
            Resumo (aparece nos cards)
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="field-input field-textarea field-textarea--short"
              required
            />
          </label>

          <label className="field-label">
            Texto completo (separe parágrafos com uma linha em branco)
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="field-input field-textarea"
              required
            />
          </label>

          <label className="field-label">
            Link da imagem de capa (opcional — cole aqui o link de uma imagem que você mesmo hospedou)
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="field-input"
              placeholder="https://..."
            />
            <span className="field-note">Não geramos capas por IA — a imagem é sempre a que você anexar.</span>
          </label>

          <label className="field-checkbox">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            Destacar como matéria principal
          </label>

          <div className="modal-form-actions">
            <button type="submit" className="btn btn-gold">{initial ? "Salvar alterações" : "Publicar"}</button>
            {initial && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => { if (confirm("Excluir esta postagem?")) onDelete(initial.id); }}
              >
                Excluir
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

/* ============================================================
   POST CARD
   ============================================================ */
function PostCard({ post, onOpen, isAdmin, onEdit, size = "normal" }) {
  return (
    <article className={`post-card post-card--${size}`}>
      <button className="post-card-media" onClick={() => onOpen(post.id)} aria-label={`Abrir: ${post.title}`}>
        {post.imageUrl ? (
          <img src={post.imageUrl} alt={post.title} className="post-card-img" />
        ) : (
          <ScreentonePlaceholder label={post.category} />
        )}
        <span className="post-card-tag">{post.category}</span>
      </button>
      <div className="post-card-body">
        <button className="post-card-title" onClick={() => onOpen(post.id)}>{post.title}</button>
        <p className="post-card-excerpt">{post.excerpt}</p>
        <div className="post-card-meta">
          <span>{post.author}</span>
          <span aria-hidden="true">•</span>
          <span>{formatDate(post.date)}</span>
        </div>
        {isAdmin && (
          <button className="post-card-edit" onClick={() => onEdit(post)}>Editar</button>
        )}
      </div>
    </article>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ post, onOpen }) {
  if (!post) return null;
  return (
    <section className="hero">
      <div className="hero-media">
        {post.imageUrl ? (
          <img src={post.imageUrl} alt={post.title} className="hero-img" />
        ) : (
          <ScreentonePlaceholder label={post.category} />
        )}
        <div className="hero-speedlines" aria-hidden="true" />
      </div>
      <div className="hero-copy">
        <span className="hero-eyebrow">Matéria principal · {post.category}</span>
        <h1 className="hero-title">{post.title}</h1>
        <p className="hero-excerpt">{post.excerpt}</p>
        <div className="hero-meta">{post.author} — {formatDate(post.date)}</div>
        <button className="btn btn-gold" onClick={() => onOpen(post.id)}>Ler matéria completa</button>
      </div>
    </section>
  );
}

/* ============================================================
   POST DETAIL
   ============================================================ */
function PostDetail({ post, onBack, isAdmin, onEdit }) {
  const paragraphs = post.content.split(/\n\s*\n/);
  const mid = Math.floor(paragraphs.length / 2);

  return (
    <article className="post-detail">
      <button className="back-link" onClick={onBack}>← Voltar para a capa</button>
      <span className="post-detail-tag">{post.category}</span>
      <h1 className="post-detail-title">{post.title}</h1>
      <div className="post-detail-meta">
        <span>{post.author}</span>
        <span aria-hidden="true">•</span>
        <span>{formatDate(post.date)}</span>
        {isAdmin && <button className="post-card-edit" onClick={() => onEdit(post)}>Editar postagem</button>}
      </div>

      {post.imageUrl ? (
        <img src={post.imageUrl} alt={post.title} className="post-detail-img" />
      ) : (
        <ScreentonePlaceholder label={post.category} />
      )}

      <div className="post-detail-body">
        {paragraphs.map((p, i) => (
          <React.Fragment key={i}>
            <p className={i === 0 ? "post-detail-lead" : ""}>{p}</p>
            {i === mid && paragraphs.length > 2 && <AdSlot size="728x90" context="in-article" />}
          </React.Fragment>
        ))}
      </div>

      <YoutubePromo />
    </article>
  );
}

/* ============================================================
   SIDEBAR
   ============================================================ */
function Sidebar({ posts, onOpen, activeCategory, onCategory }) {
  const counts = CATEGORIES.map((cat) => ({
    cat,
    count: posts.filter((p) => p.category === cat).length,
  }));
  const recent = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 4);

  return (
    <aside className="sidebar">
      <AdSlot size="300x250" context="sidebar" />

      <YoutubePromo compact />

      <div className="sidebar-block">
        <h3 className="sidebar-heading">Categorias</h3>
        <ul className="sidebar-list">
          {counts.map(({ cat, count }) => (
            <li key={cat}>
              <button
                className={`sidebar-list-link ${activeCategory === cat ? "is-active" : ""}`}
                onClick={() => onCategory(cat)}
              >
                <span>{cat}</span>
                <span className="sidebar-count">{count}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-block">
        <h3 className="sidebar-heading">Últimas postagens</h3>
        <ul className="sidebar-list sidebar-list--recent">
          {recent.map((p) => (
            <li key={p.id}>
              <button className="sidebar-recent-link" onClick={() => onOpen(p.id)}>
                {p.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <AdSlot size="300x600" context="sidebar" />
    </aside>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [posts, setPosts] = useState(SEED_POSTS);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState("home"); // 'home' | 'post'
  const [selectedId, setSelectedId] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [editorPost, setEditorPost] = useState(null); // null = closed, {} = new, {...} = editing
  const [showEditor, setShowEditor] = useState(false);

  const [saveError, setSaveError] = useState(false);

  // Carregar posts do armazenamento compartilhado
  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get(STORAGE_KEY, true);
        if (result && result.value) {
          const parsed = JSON.parse(result.value);
          if (Array.isArray(parsed) && parsed.length) {
            setPosts(parsed);
          } else {
            await window.storage.set(STORAGE_KEY, JSON.stringify(SEED_POSTS), true);
          }
        } else {
          await window.storage.set(STORAGE_KEY, JSON.stringify(SEED_POSTS), true);
        }
      } catch (err) {
        // Sem storage disponível: segue só com os posts de exemplo em memória.
        console.error("Storage indisponível, usando dados de exemplo:", err);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  async function persist(nextPosts) {
    setPosts(nextPosts);
    try {
      const result = await window.storage.set(STORAGE_KEY, JSON.stringify(nextPosts), true);
      if (!result) setSaveError(true);
    } catch (err) {
      console.error("Erro ao salvar:", err);
      setSaveError(true);
    }
  }

  function openPost(id) {
    setSelectedId(id);
    setView("post");
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    setView("home");
    setSelectedId(null);
  }

  function handleCategory(cat) {
    setActiveCategory(cat);
    setView("home");
    setSelectedId(null);
  }

  function handleLoginSuccess(name) {
    setIsAdmin(true);
    setAdminName(name);
    setShowLogin(false);
  }

  function handleLogout() {
    setIsAdmin(false);
    setAdminName("");
  }

  function handleSavePost(post) {
    const exists = posts.some((p) => p.id === post.id);
    const next = exists ? posts.map((p) => (p.id === post.id ? post : p)) : [post, ...posts];
    persist(next);
    setShowEditor(false);
    setEditorPost(null);
  }

  function handleDeletePost(id) {
    persist(posts.filter((p) => p.id !== id));
    setShowEditor(false);
    setEditorPost(null);
    if (selectedId === id) goHome();
  }

  const visiblePosts = activeCategory ? posts.filter((p) => p.category === activeCategory) : posts;
  const featured = posts.find((p) => p.featured) || posts[0];
  const gridPosts = activeCategory ? visiblePosts : visiblePosts.filter((p) => p.id !== featured?.id);
  const selectedPost = posts.find((p) => p.id === selectedId);

  return (
    <div className="nerdola-app">
      <style>{CSS}</style>

      <Header
        isAdmin={isAdmin}
        onLoginClick={() => setShowLogin(true)}
        onLogout={handleLogout}
        onNewPost={() => { setEditorPost(null); setShowEditor(true); }}
        activeCategory={activeCategory}
        onCategory={handleCategory}
        onHome={goHome}
      />

      <div className="site-tagline-bar">
        <p>{SITE_TAGLINE}</p>
      </div>

      <main className="site-main">
        <div className="site-columns">
          <div className="main-column">
            {view === "post" && selectedPost ? (
              <PostDetail
                post={selectedPost}
                onBack={goHome}
                isAdmin={isAdmin}
                onEdit={(p) => { setEditorPost(p); setShowEditor(true); }}
              />
            ) : (
              <>
                {!activeCategory && <Hero post={featured} onOpen={openPost} />}
                {!activeCategory && <AdSlot size="728x90" context="banner" />}

                <div className="section-heading-row">
                  <h2 className="section-heading">{activeCategory ? activeCategory : "Últimas matérias"}</h2>
                </div>

                <div className="post-grid">
                  {gridPosts.length === 0 && (
                    <p className="empty-state">Ainda não há postagens nesta categoria.</p>
                  )}
                  {gridPosts.map((p) => (
                    <PostCard
                      key={p.id}
                      post={p}
                      onOpen={openPost}
                      isAdmin={isAdmin}
                      onEdit={(post) => { setEditorPost(post); setShowEditor(true); }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <Sidebar posts={posts} onOpen={openPost} activeCategory={activeCategory} onCategory={handleCategory} />
        </div>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            {LOGO_IMAGE_URL ? (
              <img src={LOGO_IMAGE_URL} alt={SITE_NAME} className="logo-img logo-img--footer" />
            ) : (
              <span className="logo-wordmark logo-wordmark--footer">
                <span className="logo-main">VISÃO DE</span>
                <span className="logo-sub">NERDOLA</span>
              </span>
            )}
            <p className="footer-tagline">{SITE_TAGLINE}</p>
          </div>
          <YoutubePromo />
        </div>
        <AdSlot size="728x90" context="footer" />
        <p className="footer-credits">
          {isAdmin && adminName ? `Conectado como ${adminName} — ` : ""}
          © {new Date().getFullYear()} {SITE_NAME}. Todo conteúdo é de autoria da redação.
        </p>
      </footer>

      {saveError && (
        <div className="toast-error">Não foi possível salvar agora — suas alterações podem não persistir.</div>
      )}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onSuccess={handleLoginSuccess} />}

      {showEditor && (
        <PostEditor
          initial={editorPost}
          onCancel={() => { setShowEditor(false); setEditorPost(null); }}
          onSave={handleSavePost}
          onDelete={handleDeletePost}
        />
      )}
    </div>
  );
}

/* ============================================================
   CSS
   ============================================================ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Zilla+Slab:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');

.nerdola-app {
  --ink: #17130d;
  --ink-soft: #4a4437;
  --paper: #ffffff;
  --paper-alt: #f2efe6;
  --gold: #c8a23a;
  --gold-bright: #e8c468;
  --gold-deep: #8f6f1c;
  --border: #17130d;
  --radius: 2px;
  font-family: 'Zilla Slab', Georgia, serif;
  color: var(--ink);
  background: var(--paper);
  min-height: 100vh;
  line-height: 1.55;
}
.nerdola-app *, .nerdola-app *::before, .nerdola-app *::after { box-sizing: border-box; }
.nerdola-app button { font-family: inherit; cursor: pointer; background: none; border: none; color: inherit; }
.nerdola-app a { color: inherit; }
.nerdola-app img { max-width: 100%; display: block; }
.nerdola-app input, .nerdola-app select, .nerdola-app textarea { font-family: inherit; }

@media (prefers-reduced-motion: reduce) {
  .nerdola-app * { transition: none !important; animation: none !important; }
}

/* ---------- utility ---------- */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0.7em 1.4em; font-family: 'IBM Plex Mono', monospace; font-weight: 600;
  font-size: 0.78rem; letter-spacing: 0.06em; text-transform: uppercase;
  border: 2px solid var(--ink); border-radius: var(--radius); transition: transform 0.15s ease, background 0.15s ease;
}
.btn:focus-visible { outline: 3px solid var(--gold-deep); outline-offset: 2px; }
.btn-gold { background: var(--gold); color: var(--ink); }
.btn-gold:hover { background: var(--gold-bright); transform: translateY(-1px); }
.btn-ghost { background: transparent; color: var(--ink); }
.btn-ghost:hover { background: var(--paper-alt); }
.btn-danger { background: var(--paper); color: #7a1f1f; border-color: #7a1f1f; }
.btn-danger:hover { background: #f6e6e6; }
.btn-block { width: 100%; }

/* ---------- header ---------- */
.site-header { border-bottom: 4px solid var(--ink); background: var(--paper); position: sticky; top: 0; z-index: 20; }
.site-header-top {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.1rem 1.5rem; gap: 1rem; max-width: 1240px; margin: 0 auto;
}
.logo-link { display: flex; align-items: center; }
.logo-img { height: 52px; width: auto; }
.logo-img--footer { height: 60px; background: var(--paper); padding: 0.5rem 0.7rem; border-radius: var(--radius); }
.logo-wordmark { display: flex; flex-direction: column; line-height: 0.85; text-align: left; }
.logo-main {
  font-family: 'Bebas Neue', sans-serif; font-size: 2rem; letter-spacing: 0.03em;
  color: var(--ink);
}
.logo-sub {
  font-family: 'IBM Plex Mono', monospace; font-size: 0.68rem; letter-spacing: 0.32em;
  color: var(--gold-deep); font-weight: 600; margin-top: 0.35rem;
}
.header-actions { display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap; }

.site-nav {
  display: flex; gap: 0.25rem; overflow-x: auto; padding: 0 1.5rem 0.75rem;
  max-width: 1240px; margin: 0 auto;
}
.nav-link {
  font-family: 'IBM Plex Mono', monospace; font-size: 0.74rem; letter-spacing: 0.06em; text-transform: uppercase;
  padding: 0.45em 0.85em; border-radius: var(--radius); white-space: nowrap; color: var(--ink-soft);
  border-bottom: 2px solid transparent;
}
.nav-link:hover { color: var(--ink); }
.nav-link.is-active { color: var(--ink); border-bottom-color: var(--gold); font-weight: 600; }

.site-tagline-bar { background: var(--ink); color: var(--paper); text-align: center; padding: 0.4rem 1rem; }
.site-tagline-bar p { margin: 0; font-family: 'IBM Plex Mono', monospace; font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--gold-bright); }

/* ---------- layout ---------- */
.site-main { max-width: 1240px; margin: 0 auto; padding: 2rem 1.5rem 3rem; }
.site-columns { display: grid; grid-template-columns: 1fr 300px; gap: 2.5rem; align-items: start; }
@media (max-width: 900px) { .site-columns { grid-template-columns: 1fr; } }

.section-heading-row { display: flex; align-items: center; gap: 1rem; margin: 2.5rem 0 1.25rem; }
.section-heading {
  font-family: 'Bebas Neue', sans-serif; font-size: 1.7rem; letter-spacing: 0.02em; margin: 0;
  position: relative; padding-bottom: 0.4rem; border-bottom: 3px solid var(--gold); display: inline-block;
}
.empty-state { font-family: 'IBM Plex Mono', monospace; font-size: 0.85rem; color: var(--ink-soft); }

/* ---------- screentone placeholder ---------- */
.cover-placeholder {
  width: 100%; height: 100%; min-height: 160px; position: relative;
  background-color: var(--paper-alt);
  background-image: radial-gradient(var(--gold) 1.1px, transparent 1.1px);
  background-size: 9px 9px;
  display: flex; align-items: center; justify-content: center;
  border-bottom: 3px solid var(--ink);
}
.cover-placeholder-label {
  font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; letter-spacing: 0.08em;
  color: var(--ink); background: var(--paper); padding: 0.3em 0.9em; border: 2px solid var(--ink);
}

/* ---------- hero ---------- */
.hero {
  display: grid; grid-template-columns: 1.1fr 1fr; gap: 0; border: 3px solid var(--ink); margin-bottom: 1.5rem;
}
@media (max-width: 720px) { .hero { grid-template-columns: 1fr; } }
.hero-media { position: relative; min-height: 260px; border-right: 3px solid var(--ink); overflow: hidden; }
@media (max-width: 720px) { .hero-media { border-right: none; border-bottom: 3px solid var(--ink); } }
.hero-img { width: 100%; height: 100%; object-fit: cover; min-height: 260px; }
.hero-speedlines {
  position: absolute; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(115deg, rgba(200,162,58,0.16) 0 2px, transparent 2px 34px);
}
.hero-copy { padding: 2rem; display: flex; flex-direction: column; gap: 0.9rem; justify-content: center; }
.hero-eyebrow {
  font-family: 'IBM Plex Mono', monospace; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--gold-deep); font-weight: 600;
}
.hero-title { font-family: 'Bebas Neue', sans-serif; font-size: 2.6rem; line-height: 1.02; margin: 0; letter-spacing: 0.01em; }
.hero-excerpt { color: var(--ink-soft); margin: 0; font-size: 1.02rem; }
.hero-meta { font-family: 'IBM Plex Mono', monospace; font-size: 0.72rem; color: var(--ink-soft); }
.hero-copy .btn { align-self: flex-start; }

/* ---------- post grid & cards ---------- */
.post-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
@media (max-width: 640px) { .post-grid { grid-template-columns: 1fr; } }

.post-card { border: 3px solid var(--ink); display: flex; flex-direction: column; background: var(--paper); }
.post-card-media { position: relative; display: block; width: 100%; padding: 0; border-bottom: 3px solid var(--ink); text-align: left; }
.post-card-img { width: 100%; height: 170px; object-fit: cover; }
.post-card-tag {
  position: absolute; top: 0.6rem; left: 0; background: var(--gold); color: var(--ink);
  font-family: 'IBM Plex Mono', monospace; font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase;
  padding: 0.3em 0.7em; font-weight: 700; border: 2px solid var(--ink); border-left: none;
}
.post-card-body { padding: 1.1rem 1.2rem 1.3rem; display: flex; flex-direction: column; gap: 0.55rem; flex: 1; }
.post-card-title {
  font-family: 'Bebas Neue', sans-serif; font-size: 1.35rem; line-height: 1.1; text-align: left; letter-spacing: 0.01em;
}
.post-card-title:hover { color: var(--gold-deep); }
.post-card-excerpt { color: var(--ink-soft); font-size: 0.92rem; margin: 0; flex: 1; }
.post-card-meta {
  font-family: 'IBM Plex Mono', monospace; font-size: 0.68rem; color: var(--ink-soft);
  display: flex; gap: 0.4rem; text-transform: uppercase; letter-spacing: 0.04em;
}
.post-card-edit {
  align-self: flex-start; margin-top: 0.3rem; font-family: 'IBM Plex Mono', monospace; font-size: 0.68rem;
  text-transform: uppercase; letter-spacing: 0.05em; color: var(--gold-deep); text-decoration: underline;
}

/* ---------- ad slots ---------- */
.ad-slot {
  border: 2px dashed var(--gold-deep); background: var(--paper-alt);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.2rem;
  padding: 1.4rem 1rem; text-align: center; margin: 0 0 1.5rem;
}
.ad-slot--sidebar { min-height: 180px; }
.ad-slot--banner, .ad-slot--footer { min-height: 90px; }
.ad-slot--in-article { min-height: 90px; margin: 1.5rem 0; }
.ad-slot-eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold-deep); font-weight: 700; }
.ad-slot-size { font-family: 'IBM Plex Mono', monospace; font-size: 0.85rem; color: var(--ink); }
.ad-slot-sub { font-family: 'IBM Plex Mono', monospace; font-size: 0.65rem; color: var(--ink-soft); }

/* ---------- youtube promo ---------- */
.yt-promo {
  display: flex; align-items: center; gap: 0.7rem; background: var(--ink); color: var(--paper);
  padding: 0.9rem 1rem; margin-bottom: 1.5rem; border: 2px solid var(--ink);
}
.yt-promo:hover { background: #2a231a; }
.yt-promo-icon { color: var(--gold-bright); flex-shrink: 0; }
.yt-promo-text { font-size: 0.82rem; line-height: 1.35; }
.yt-promo-text strong { color: var(--gold-bright); }
.yt-promo--compact { padding: 0.7rem 0.85rem; }

/* ---------- post detail ---------- */
.post-detail { max-width: 720px; }
.back-link { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--gold-deep); margin-bottom: 1.2rem; }
.post-detail-tag {
  display: inline-block; background: var(--gold); color: var(--ink); font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.06em; padding: 0.3em 0.7em; font-weight: 700; margin-bottom: 0.8rem;
}
.post-detail-title { font-family: 'Bebas Neue', sans-serif; font-size: 2.4rem; line-height: 1.05; margin: 0 0 0.6rem; }
.post-detail-meta {
  font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; color: var(--ink-soft);
  display: flex; gap: 0.5rem; align-items: center; margin-bottom: 1.3rem; flex-wrap: wrap;
}
.post-detail-img { width: 100%; max-height: 420px; object-fit: cover; border: 3px solid var(--ink); margin-bottom: 1.5rem; }
.post-detail-body p { margin: 0 0 1.1rem; font-size: 1.05rem; }
.post-detail-lead::first-letter {
  font-family: 'Bebas Neue', sans-serif; font-size: 3.4rem; float: left; line-height: 0.8; padding: 0.05em 0.1em 0 0; color: var(--gold-deep);
}

/* ---------- sidebar ---------- */
.sidebar { display: flex; flex-direction: column; }
.sidebar-block { border: 2px solid var(--ink); padding: 1.1rem 1.1rem 1.3rem; margin-bottom: 1.5rem; }
.sidebar-heading {
  font-family: 'Bebas Neue', sans-serif; font-size: 1.15rem; letter-spacing: 0.02em; margin: 0 0 0.7rem;
  border-bottom: 2px solid var(--gold); padding-bottom: 0.4rem;
}
.sidebar-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.4rem; }
.sidebar-list-link { display: flex; justify-content: space-between; width: 100%; padding: 0.3rem 0.1rem; font-size: 0.88rem; text-align: left; }
.sidebar-list-link:hover, .sidebar-list-link.is-active { color: var(--gold-deep); }
.sidebar-count { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; color: var(--ink-soft); }
.sidebar-list--recent { gap: 0.65rem; }
.sidebar-recent-link { text-align: left; font-size: 0.86rem; line-height: 1.35; }
.sidebar-recent-link:hover { color: var(--gold-deep); }

/* ---------- footer ---------- */
.site-footer { background: var(--ink); color: var(--paper); padding: 2.5rem 1.5rem 1.5rem; margin-top: 3rem; }
.footer-top { max-width: 1240px; margin: 0 auto 1.5rem; display: flex; justify-content: space-between; align-items: flex-start; gap: 1.5rem; flex-wrap: wrap; }
.footer-brand { display: flex; flex-direction: column; gap: 0.5rem; }
.logo-wordmark--footer .logo-main { color: var(--paper); }
.footer-tagline { font-size: 0.85rem; color: #c9c3b3; margin: 0; max-width: 280px; }
.footer-top .yt-promo { background: transparent; border: 2px solid var(--gold-deep); max-width: 420px; margin-bottom: 0; }
.site-footer .ad-slot { max-width: 1240px; margin: 0 auto 1.5rem; border-color: var(--gold-bright); background: #241f16; }
.site-footer .ad-slot-eyebrow, .site-footer .ad-slot-size, .site-footer .ad-slot-sub { color: var(--gold-bright); }
.footer-credits { max-width: 1240px; margin: 0 auto; font-family: 'IBM Plex Mono', monospace; font-size: 0.7rem; color: #8f8873; text-align: center; }

/* ---------- modal ---------- */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(23,19,13,0.72); display: flex; align-items: center; justify-content: center;
  padding: 1.5rem; z-index: 100; overflow-y: auto;
}
.modal-panel {
  background: var(--paper); border: 3px solid var(--ink); max-width: 420px; width: 100%; padding: 2rem;
  position: relative; max-height: 90vh; overflow-y: auto;
}
.modal-panel--wide { max-width: 640px; }
.modal-close { position: absolute; top: 0.8rem; right: 1rem; font-size: 1.6rem; line-height: 1; color: var(--ink-soft); }
.modal-close:hover { color: var(--ink); }
.modal-eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold-deep); font-weight: 700; }
.modal-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; margin: 0.2rem 0 0.6rem; }
.modal-hint { color: var(--ink-soft); font-size: 0.88rem; margin: 0 0 1.2rem; }
.modal-form { display: flex; flex-direction: column; gap: 1rem; }
.field-label { display: flex; flex-direction: column; gap: 0.35rem; font-family: 'IBM Plex Mono', monospace; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--ink-soft); }
.field-input {
  font-family: 'Zilla Slab', serif; font-size: 0.95rem; padding: 0.6em 0.7em; border: 2px solid var(--ink);
  border-radius: var(--radius); color: var(--ink); background: var(--paper);
}
.field-input:focus-visible { outline: 3px solid var(--gold-deep); outline-offset: 1px; }
.field-textarea { min-height: 160px; resize: vertical; }
.field-textarea--short { min-height: 70px; }
.field-note { text-transform: none; letter-spacing: 0; font-size: 0.75rem; color: var(--gold-deep); }
.field-error { color: #7a1f1f; font-size: 0.82rem; margin: 0; }
.field-checkbox { display: flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; }
.modal-form-actions { display: flex; gap: 0.8rem; flex-wrap: wrap; margin-top: 0.3rem; }

/* ---------- toast ---------- */
.toast-error {
  position: fixed; bottom: 1.2rem; left: 50%; transform: translateX(-50%); background: #7a1f1f; color: #fff;
  padding: 0.7em 1.2em; font-family: 'IBM Plex Mono', monospace; font-size: 0.78rem; border-radius: var(--radius); z-index: 200;
}
`;
