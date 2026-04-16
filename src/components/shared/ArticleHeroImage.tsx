interface ArticleHeroImageProps {
  slug: string;
  title: string;
  className?: string;
}

interface HeroConfig {
  gradient: string;
  label: string;
  headline: string;
  pills: string[];
  accentColor: string;
}

const heroConfigs: Record<string, HeroConfig> = {
  'enterprise-to-ai': {
    gradient: 'from-slate-900 via-indigo-950 to-slate-900',
    label: 'CAREER TRANSITION',
    headline: 'Enterprise → AI',
    pills: ['System Design', 'RAG', 'Agents', 'Evaluation', 'Python'],
    accentColor: '#818cf8',
  },
  'rag-beyond-basics': {
    gradient: 'from-cyan-950 via-blue-950 to-indigo-950',
    label: 'PRODUCTION RAG',
    headline: 'Hybrid Search + Reranking + Evaluation',
    pills: ['Dense + BM25', 'RRF Fusion', 'Cohere Rerank', 'RAGAS 0.91'],
    accentColor: '#22d3ee',
  },
  'llmops-cicd': {
    gradient: 'from-emerald-950 via-teal-950 to-cyan-950',
    label: 'LLMOPS',
    headline: 'CI/CD for AI Applications',
    pills: ['Prompt Versioning', 'A/B Testing', 'Eval Gates', 'Canary Deploy'],
    accentColor: '#34d399',
  },
  'building-mcp-servers': {
    gradient: 'from-violet-950 via-purple-950 to-fuchsia-950',
    label: 'MCP PROTOCOL',
    headline: '3 Servers · 26 Tools · 1 Agent',
    pills: ['GitHub', 'Project Mgmt', 'Calendar', 'Human-in-the-Loop'],
    accentColor: '#a78bfa',
  },
};

export function ArticleHeroImage({ slug, className }: ArticleHeroImageProps) {
  const config = heroConfigs[slug];
  if (!config) return null;

  return (
    <div className={`w-full overflow-hidden bg-gradient-to-br ${config.gradient} relative ${className || 'rounded-xl mb-8'}`}>
      {/* Glow effects */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: config.accentColor }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{ background: config.accentColor }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-8 md:px-12 py-12 md:py-16 text-center">
        {/* Label */}
        <span
          className="inline-block text-xs font-bold tracking-[0.2em] px-3 py-1 rounded-full mb-5 border"
          style={{
            color: config.accentColor,
            borderColor: `${config.accentColor}40`,
            background: `${config.accentColor}15`,
          }}
        >
          {config.label}
        </span>

        {/* Headline */}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight mb-6 leading-tight">
          {config.headline}
        </h3>

        {/* Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {config.pills.map((pill) => (
            <span
              key={pill}
              className="px-3 py-1 rounded-full text-xs font-medium text-white/70 border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
