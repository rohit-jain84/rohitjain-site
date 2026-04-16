import type {
  HeroData,
  SummaryData,
  Project,
  Role,
  SkillCategory,
  EducationData,
  ContactData,
  NavItem,
  ServiceArea,
  DesignPrinciple,
  Testimonial,
} from '../types';

export const navigation: NavItem[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const hero: HeroData = {
  name: 'Rohit Jain',
  title: 'AI Engineer — Production RAG, Intelligent Agents, Document Intelligence. Enterprise system design principles in every layer.',
  photoUrl: '/photo/Rohit Jain.jpg',
  headline:
    '5 open-source projects with Docker orchestration, evaluation frameworks, and measurable results. 17 years of enterprise architecture as the backbone.',
  availableForWork: true,
};

export const summary: SummaryData = {
  paragraphs: [
    'I architect production AI systems where multi-tenancy, fault tolerance, observability, and cost optimization aren\'t afterthoughts — they\'re structural decisions made on day one.',
    '5 open-source projects. Each with Docker Compose orchestration, comprehensive documentation, CI/CD pipelines, and evaluation frameworks that prove they work.',
    '17 years of enterprise backend (C#/.NET, Azure, AWS) gave me the instincts. Python, FastAPI, LangGraph, and vector databases gave me the toolkit. Currently open to freelance engagements — I prefer long-term hourly contracts where I can deeply understand the problem.',
  ],
};

export const projects: Project[] = [
  {
    id: 'multi-tenant-rag',
    title: 'Multi-Tenant RAG Platform',
    description:
      'Production document Q&A where organizations upload documents and employees ask natural-language questions. Every answer cites specific source passages with page numbers. Tenant data is fully isolated with separate vector collections, BM25 indices, and rate limits.',
    techStack: ['Python', 'FastAPI', 'Qdrant', 'PostgreSQL', 'Redis', 'React', 'Docker'],
    githubUrl: 'https://github.com/rohit-jain84/multi-tenant-rag-platform',
    caseStudySlug: 'rag-platform',
    category: 'rag',
    highlights: [
      '0.91 faithfulness (RAGAS)',
      '+12% hybrid vs dense-only',
      '1.8s P95 latency',
    ],
    heroScreenshot: '/screenshots/rag-platform/query-playground.png',
    screenshots: [
      { src: '/screenshots/rag-platform/query-playground.png', alt: 'Query playground with citations and latency breakdown' },
      { src: '/screenshots/rag-platform/health-dashboard.png', alt: 'Health dashboard — PostgreSQL, Qdrant, Redis status' },
      { src: '/screenshots/rag-platform/tenant-admin-dark.png', alt: 'Tenant provisioning (dark mode)' },
      { src: '/screenshots/rag-platform/tenant-management.png', alt: 'Tenant management — rate limits, status' },
    ],
    scenario: 'HR team uploads 200 policy documents. An employee asks "What is the parental leave policy for employees in India?" and gets a cited answer with page numbers in under 2 seconds.',
    architectureOneLiner: 'FastAPI → Qdrant (dense) + Redis (BM25) → RRF fusion → Cohere reranking → LLM generation with SSE streaming',
  },
  {
    id: 'mcp-agent-system',
    title: 'Enterprise AI Agents with MCP',
    description:
      'One AI assistant to replace the 47 browser tabs every project manager has open. Connects to GitHub, Jira, and Calendar through the Model Context Protocol — planning and executing multi-step workflows with human-in-the-loop approval for write operations.',
    techStack: ['LangGraph', 'Claude', 'FastMCP', 'FastAPI', 'React', 'PostgreSQL', 'Redis'],
    githubUrl: 'https://github.com/rohit-jain84/enterprise-mcp-agent-system',
    caseStudySlug: 'mcp-agent',
    category: 'agents',
    highlights: [
      '$0.04 per conversation',
      '82% task completion',
      '95% guardrail block rate',
    ],
    heroScreenshot: '/screenshots/mcp-agent/02-chat.png',
    screenshots: [
      { src: '/screenshots/mcp-agent/02-chat.png', alt: 'Multi-tool orchestration with rich responses' },
      { src: '/screenshots/mcp-agent/03-approvals.png', alt: 'Human-in-the-loop approval queue' },
      { src: '/screenshots/mcp-agent/04-history.png', alt: 'Session management and search' },
      { src: '/screenshots/mcp-agent/05-settings.png', alt: 'MCP server health dashboard' },
    ],
    scenario: 'PM asks "Why is the payment feature delayed?" — agent connects failing CI → PR that caused it → linked ticket → engineer who was out sick. Cross-tool reasoning in one query.',
    architectureOneLiner: 'LangGraph StateGraph (9 nodes) → 3 MCP servers (26 tools) → Haiku routing / Sonnet reasoning → PostgreSQL checkpointing',
  },
  {
    id: 'document-intelligence',
    title: 'Document Intelligence Platform',
    description:
      'Multi-stage ML pipeline that processes enterprise documents end-to-end: extracts text from any format (including scanned images), recognizes and normalizes entities, classifies by type using a trainable model, and indexes into a hybrid search engine with RAG-powered Q&A.',
    techStack: ['Python', 'FastAPI', 'Elasticsearch', 'PostgreSQL', 'Redis', 'MinIO', 'Celery', 'React'],
    githubUrl: 'https://github.com/rohit-jain84/enterprise-document-intelligence-platform',
    caseStudySlug: 'document-intelligence',
    category: 'document-ai',
    highlights: [
      '0.91 classification F1',
      '+22% nDCG@10 hybrid search',
      '12 docs/min throughput',
    ],
    scenario: 'Legal team uploads 500 contracts. System OCRs scanned documents, extracts company names, dates, and monetary amounts, classifies each as "contract," and enables search like "Find vendor contracts with auto-renewal clauses expiring before Q3."',
    architectureOneLiner: 'Celery pipeline: Upload → Tika/pdfplumber/Tesseract → TF-IDF+SVM classification → spaCy NER → Elasticsearch (BM25 + kNN)',
  },
  {
    id: 'llmops-platform',
    title: 'LLMOps Platform',
    description:
      'DevOps for LLM applications. Version and A/B test prompts, run automated and human evaluations, route queries to the cheapest capable model, trace every LLM call, and deploy safely through eval-gated CI/CD pipelines with canary rollouts.',
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Qdrant', 'LangFuse', 'OpenTelemetry', 'Grafana', 'Docker'],
    githubUrl: 'https://github.com/rohit-jain84/llmops-platform',
    category: 'llmops',
    highlights: [
      'Eval-gated CI/CD',
      'A/B testing with t-test',
      'Canary rollouts',
    ],
    heroScreenshot: '/screenshots/llmops/dashboard.png',
    screenshots: [
      { src: '/screenshots/llmops/dashboard.png', alt: 'Platform dashboard' },
      { src: '/screenshots/llmops/cost-analytics.png', alt: 'Cost analytics by model and time' },
      { src: '/screenshots/llmops/experiments.png', alt: 'A/B testing experiments' },
      { src: '/screenshots/llmops/evaluations.png', alt: 'Evaluation runs and metrics' },
      { src: '/screenshots/llmops/deployments.png', alt: 'Canary deployment pipeline' },
    ],
    scenario: 'Support bot prompt change drops factuality by 5%. The eval-gated pipeline catches the regression before it reaches production. Team iterates on the prompt with A/B testing until quality exceeds the previous version.',
    architectureOneLiner: 'FastAPI gateway → litellm (100+ providers) → Qdrant semantic cache → LangFuse + OTel tracing → Grafana dashboards',
  },
  {
    id: 'code-review-ai',
    title: 'AI Code Review Assistant',
    description:
      'AI-powered code review tool that analyzes code snippets using LLMs and returns structured findings with severity levels, categories, line numbers, and actionable fix suggestions. Supports 11 programming languages with multi-LLM backend.',
    techStack: ['Python', 'FastAPI', 'Claude API', 'OpenAI API', 'JavaScript', 'CodeMirror', 'Docker'],
    githubUrl: 'https://github.com/rohit-jain84/code-review-ai-assistant',
    category: 'code-review',
    highlights: [
      '11 languages supported',
      'Structured findings',
      'Multi-LLM support',
    ],
    scenario: 'Developer pastes a Python function. AI identifies a SQL injection vulnerability (critical), suggests parameterized queries, and flags a missing type annotation (info) — all in structured, parseable output.',
    architectureOneLiner: 'CodeMirror editor → FastAPI (rate-limited) → Claude/GPT → Structured JSON findings with severity + fix suggestions',
  },
  {
    id: 'investello',
    title: 'Investello — Value Investing SaaS',
    description:
      'Value-investing platform serving 100,000+ users with automated valuation engines, stock screeners, and AI-powered earnings analysis — processing 1M+ data points monthly across 5,000 publicly listed companies.',
    techStack: ['C#', 'ASP.NET Core', 'Azure SQL', 'Azure OpenAI', 'Semantic Kernel', 'Azure Functions'],
    category: 'enterprise',
    highlights: [
      '100,000+ users',
      '1M+ data points/month',
      '5,000 companies tracked',
    ],
    scenario: 'Retail investor screens 5,000+ stocks using automated valuation metrics, then reads an AI-generated earnings summary instead of parsing a 40-page PDF.',
    architectureOneLiner: 'ASP.NET Core → Azure SQL + Blob Storage → Scheduled pipelines (500K+ records) → Azure OpenAI earnings analyzer',
  },
];

export const designPrinciples: DesignPrinciple[] = [
  {
    id: 'multi-tenancy',
    title: 'Multi-Tenancy by Design',
    description: 'Physical isolation at every data layer — not metadata filtering that one bug can bypass.',
    evidence: 'RAG Platform: per-tenant Qdrant collections, separate BM25 indices, Argon2 API keys. Doc Intel: collection-level RBAC.',
    projectId: 'multi-tenant-rag',
  },
  {
    id: 'graceful-degradation',
    title: 'Graceful Degradation',
    description: 'Layered fallbacks so the system never hard-fails — it degrades to the next-best option.',
    evidence: 'RAG: Cohere → CrossEncoder fallback. Doc Intel: Tika → pdfplumber → Tesseract tiered OCR. MCP Agent: per-step error recovery.',
    projectId: 'document-intelligence',
  },
  {
    id: 'eval-driven',
    title: 'Evaluation-Driven Development',
    description: 'Every change is measured against an eval set — no tuning by vibes.',
    evidence: 'RAG: 56-question RAGAS eval set. MCP Agent: 30-task eval suite across 6 categories. LLMOps: eval-gated CI/CD pipelines.',
    projectId: 'llmops-platform',
  },
  {
    id: 'cost-optimization',
    title: 'Cost Optimization',
    description: 'Right-size every LLM call — cheap models for routing, expensive models for reasoning.',
    evidence: 'MCP Agent: Haiku for routing (3% cost, 40% of calls). LLMOps: semantic caching + model routing. RAG: per-query cost tracking.',
    projectId: 'mcp-agent-system',
  },
  {
    id: 'observability',
    title: 'Observability',
    description: 'Structured logging, distributed tracing, and dashboards — not just console.log.',
    evidence: 'LLMOps: LangFuse + OpenTelemetry + 3 Grafana dashboards. All projects: structlog JSON, health endpoints, correlation IDs.',
    projectId: 'llmops-platform',
  },
  {
    id: 'security',
    title: 'Security & Safety',
    description: 'Defense in depth — guardrails, PII detection, RBAC, and audit trails.',
    evidence: 'MCP Agent: 3-layer guardrails (NeMo + Presidio + output). RAG: Argon2 + tenant isolation. Doc Intel: JWT + RBAC + audit trail.',
    projectId: 'mcp-agent-system',
  },
  {
    id: 'docker-first',
    title: 'Docker-First Infrastructure',
    description: 'One command to run everything — Docker Compose with production multi-stage builds.',
    evidence: 'All 5 projects: Docker Compose orchestration, persistent volumes, health probes, production builds.',
    projectId: 'multi-tenant-rag',
  },
  {
    id: 'async-first',
    title: 'Async-First Architecture',
    description: 'Non-blocking I/O everywhere — parallel tool execution, streaming responses, background workers.',
    evidence: 'All use FastAPI + async/await. Doc Intel: Celery workers. MCP Agent: asyncio.gather. RAG: SSE streaming.',
    projectId: 'mcp-agent-system',
  },
];

export const experience: Role[] = [
  {
    id: 'ai-engineer',
    title: 'AI Engineer — Freelance & Portfolio',
    company: 'Independent',
    location: 'Remote — India',
    startDate: 'Oct 2025',
    endDate: 'Present',
    bullets: [
      'Built a multi-tenant RAG platform with hybrid search (dense + BM25 via Reciprocal Rank Fusion), semantic chunking, Cohere reranking, and RAGAS evaluation — achieving 0.91 faithfulness across a 56-question eval set.',
      'Architected an enterprise AI agent system orchestrating 26 tools across 3 MCP servers using LangGraph, with multi-model cost optimization ($0.04/conversation), 3-layer guardrails, and human-in-the-loop approval via graph interrupts.',
      'Designed a document intelligence pipeline: tiered OCR extraction, trainable document classification (0.91 F1), NER with entity normalization, and Elasticsearch hybrid search (+22% nDCG@10 vs keyword-only).',
      'Created an LLMOps platform with prompt versioning, LLM-as-judge evaluation, A/B testing with statistical significance, eval-gated CI/CD pipelines, and semantic caching for cost optimization.',
    ],
    techStack: ['Python', 'FastAPI', 'LangGraph', 'Claude', 'Qdrant', 'Elasticsearch', 'PostgreSQL', 'Redis', 'React', 'Docker'],
  },
  {
    id: 'investello',
    title: 'CTO & Principal Architect (Founder)',
    company: 'Investello',
    location: 'Concurrent Entrepreneurial Venture',
    startDate: 'Jul 2016',
    endDate: 'Oct 2025',
    note: 'Part-time alongside full-time roles until Dec 2024; full-time Jan–Oct 2025',
    bullets: [
      'Architected and scaled a value-investing SaaS platform from 0 to 1, growing to 100,000+ registered users with automated valuation engines, high-performance stock screeners, and comprehensive financial analytics for 5,000+ publicly listed companies.',
      'Designed a distributed data platform with scheduled ingestion pipelines, idempotent background workers, and resilient APIs — processing 1 million+ data points monthly across 5,000 listed companies, scaled from a 100-stock pilot to production-grade reliability with 99.9% data freshness.',
      'Built an AI-powered earnings report analyzer using Azure OpenAI and Semantic Kernel to parse long-form earnings PDFs into structured summaries, sentiment scores, and key financial metrics.',
    ],
    techStack: ['C#', 'ASP.NET Core', 'Azure App Services', 'Azure SQL', 'Azure OpenAI', 'Semantic Kernel'],
  },
  {
    id: 'entegral',
    title: 'Senior Tech Lead Software Engineer',
    company: 'Entegral',
    location: 'Remote — South Africa',
    startDate: 'Mar 2022',
    endDate: 'Dec 2024',
    bullets: [
      'Owned v1→v2 platform modernization; set technical vision, roadmap, and guardrails tied to SLOs and customer outcomes.',
      'Root-caused performance regressions: redesigned Redis cache keys/data shapes and DynamoDB access patterns, materially improving p95/p99 latencies.',
      'Led platform modernization to eliminate technical debt — evaluated and overhauled the technical architecture end-to-end while keeping a business-first approach, ensuring feature velocity and system reliability improved in parallel.',
    ],
    techStack: ['C#', '.NET 6', 'AWS Lambda', 'DynamoDB', 'Redis', 'React'],
  },
  {
    id: 'consultant',
    title: 'Principal Engineer & Architect (Consultant)',
    company: 'Multiple Clients',
    location: 'Remote',
    startDate: 'Jan 2018',
    endDate: 'Mar 2022',
    bullets: [
      'Delivered enterprise solutions across Saudi Arabia, USA, and India — including secure membership portals, backup services with data integrity guarantees, and scholarship matching engines.',
      'Led architecture and development using .NET Core, PostgreSQL, MongoDB, and cloud services across Azure and AWS.',
    ],
    techStack: ['C#', '.NET Core', 'React', 'AWS', 'Azure', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'early-career',
    title: 'Lead Engineer & Architect → Early Career',
    company: 'Cacawaa, IVP, Arxmind, Contata & Others',
    location: 'Remote & Delhi NCR',
    startDate: 'Jun 2007',
    endDate: 'Dec 2017',
    bullets: [
      'Defined technical strategy at Cacawaa (Kuwait): built a 3-app multi-merchant marketplace platform, led an 8-engineer team.',
      'Full-stack enterprise development across FinTech, E-Commerce, and EdTech using C#, ASP.NET, SQL Server, and Azure.',
    ],
    techStack: ['C#', 'ASP.NET', 'SQL Server', 'Azure'],
  },
];

export const skills: SkillCategory[] = [
  {
    id: 'ai-llm',
    name: 'AI & LLM Engineering',
    skills: [
      'RAG Systems',
      'LangGraph',
      'LangChain',
      'Claude API',
      'OpenAI API',
      'Prompt Engineering',
      'MCP Servers',
      'RAGAS Evaluation',
      'Embeddings & Vector Search',
      'Guardrails (NeMo, Presidio)',
    ],
  },
  {
    id: 'python',
    name: 'Python Ecosystem',
    skills: [
      'Python',
      'FastAPI',
      'Celery',
      'spaCy',
      'scikit-learn',
      'Pydantic',
      'asyncio',
    ],
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure & Data',
    skills: [
      'Docker',
      'PostgreSQL',
      'Redis',
      'Elasticsearch',
      'Qdrant',
      'MinIO',
      'OpenTelemetry',
      'Grafana',
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend',
    skills: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'WebSocket',
      'Vite',
    ],
  },
  {
    id: 'enterprise-cloud',
    name: 'Enterprise & Cloud',
    skills: [
      'C# / .NET',
      'Azure (App Services, Functions, SQL, OpenAI)',
      'AWS (Lambda, DynamoDB, S3)',
      'System Design',
      'Multi-Tenancy',
    ],
  },
  {
    id: 'practices',
    name: 'Engineering Practices',
    skills: [
      'Distributed Systems',
      'Observability & SRE',
      'CI/CD Pipelines',
      'Evaluation-Driven Development',
      'Technical Leadership',
      'Agile / Scrum',
    ],
  },
];

export const education: EducationData = {
  degree: 'Bachelor of Engineering',
  field: 'Information Technology',
  institution:
    'Netaji Subhas University of Technology (NSUT), formerly NSIT, Dwarka, Delhi',
  years: '2003 – 2007',
};

export const contact: ContactData = {
  email: 'rohitjain84@gmail.com',
  linkedIn: 'https://www.linkedin.com/in/rohitjaintech/',
  github: 'https://github.com/rohit-jain84',
};

export const WHATSAPP_URL = 'https://wa.me/919999766876?text=' + encodeURIComponent('Hi Rohit, I visited your portfolio and would like to discuss a project.');

export const testimonials: Testimonial[] = [
  {
    id: 'adriaan',
    quote:
      'Rohit is a highly skilled senior developer who takes great pride in his work. He is highly experienced in system architecture and can guide complex projects from conception to implementation. His deep understanding of software development, combined with his ability to manage technical teams, ensures that projects are delivered efficiently and with high quality.',
    name: 'Adriaan',
    company: 'Entegral Technologies',
    location: 'South Africa',
  },
  {
    id: 'jasmine',
    quote:
      'Rohit was an amazing addition to our team and highly skilled developer. He not only performed his projects with precision and dedication but he also contributed to the overall vision and strategy for our team. As a startup, Rohit is exactly what you need — highly skilled, creative, an excellent team member and truly committed to the success of the product and company.',
    name: 'Jasmine',
    company: 'GrantEd Inc.',
    location: 'USA',
  },
  {
    id: 'luis',
    quote:
      "Rohit is a fantastic web developer. He's got good business and soft skills which I admire. He's easy to work with and can articulate complex problems to business stakeholders. Technically he has the skills and capabilities to complete work on time and at the highest quality.",
    name: 'Luis',
    company: 'Nuleep Inc.',
    location: 'USA',
  },
  {
    id: 'mashal',
    quote:
      'More than just being competent in his work, which Rohit very much is, I value the ability to be trustworthy, have good team chemistry, and push through when things get tough. Rohit has gone from an employee to a partner and a friend. I value his ideas that contribute immensely to the success of the projects I work on with him.',
    name: 'Mashal',
    company: 'Cacawaa',
    location: 'Kuwait',
  },
];

export const services: ServiceArea[] = [
  {
    id: 'rag',
    title: 'RAG Systems & Semantic Search',
    description:
      'Production retrieval-augmented generation with hybrid search, reranking, evaluation frameworks, and multi-tenant isolation.',
    tags: ['Qdrant', 'Elasticsearch', 'RAGAS', 'Cohere'],
  },
  {
    id: 'agents',
    title: 'AI Agent Development',
    description:
      'Multi-tool agent orchestration with MCP servers, LangGraph workflows, cost-optimized model routing, guardrails, and human-in-the-loop approval.',
    tags: ['LangGraph', 'MCP', 'Claude', 'Tool Use'],
  },
  {
    id: 'document-ai',
    title: 'Document Intelligence',
    description:
      'End-to-end document processing: OCR extraction, classification, entity recognition, and semantic search with access control.',
    tags: ['OCR', 'NER', 'Classification', 'Elasticsearch'],
  },
  {
    id: 'llmops',
    title: 'LLMOps & AI Pipelines',
    description:
      'Prompt versioning, A/B testing, eval-gated CI/CD, observability, and cost optimization for AI applications in production.',
    tags: ['CI/CD', 'Evaluation', 'Observability', 'Caching'],
  },
];
