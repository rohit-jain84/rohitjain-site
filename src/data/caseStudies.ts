export interface CaseStudySection {
  type: 'text' | 'code' | 'metrics' | 'table' | 'callout';
  content: string;
  language?: string;
  filename?: string;
  metrics?: { value: string; label: string; context: string }[];
  rows?: string[][];
  variant?: 'insight' | 'takeaway';
}

export interface CaseStudyDecision {
  title: string;
  problem: string;
  solution: string;
  sections: CaseStudySection[];
  insight: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  readingTime: string;
  role: string;
  duration: string;
  githubUrl: string;
  screenshots?: ({ src: string; alt: string } | { light: string; dark: string; alt: string })[];
  scenarios?: { title: string; description: string }[];
  techStack: { layer: string; tech: string; purpose: string }[];
  problem: string[];
  architecture: string[];
  decisions: CaseStudyDecision[];
  results: { value: string; label: string; context: string }[];
  resultsSummary: string;
  lessons: { title: string; text: string }[];
}

export const caseStudies: CaseStudy[] = [
  // ─────────────────────────────────────────────────────────
  // CASE STUDY 1: RAG Platform
  // ─────────────────────────────────────────────────────────
  {
    slug: 'rag-platform',
    title: 'Building a Production Multi-Tenant RAG System',
    subtitle:
      'How I built a document Q&A platform with hybrid search, reranking, and automated evaluation',
    githubUrl: 'https://github.com/rohit-jain84/multi-tenant-rag-platform',
    screenshots: [
      { light: '/screenshots/rag-platform/dark/tenants.png', dark: '/screenshots/rag-platform/light/tenants.png', alt: 'Tenant management — 3 tenants with rate limits and green status' },
      { light: '/screenshots/rag-platform/dark/evaluation.png', dark: '/screenshots/rag-platform/light/evaluation.png', alt: 'RAGAS evaluation — Context Recall, Faithfulness, Answer Relevancy, Context Precision' },
    ],
    scenarios: [
      { title: 'HR Policy Search', description: 'HR uploads 200 policy documents. Employee asks "What is the parental leave policy for employees in India?" and gets a cited answer with page numbers in under 2 seconds.' },
      { title: 'Legal Discovery', description: 'Legal team searches across 1,000 contracts for specific clauses. Hybrid search catches both exact terms ("Section 4.2.1") and semantic matches ("termination conditions").' },
      { title: 'Technical Documentation', description: 'Engineering team queries internal specs. Parent-child retrieval returns precise matches while giving the LLM enough context to synthesize complete answers.' },
    ],
    readingTime: '10 min read',
    role: 'Principal Engineer',
    duration: '6 weeks',

    problem: [
      'Enterprise teams drown in documents. Contracts, policies, specs — the volume grows faster than anyone can read. Finding specific answers means either knowing exactly which document to open or spending hours manually searching through hundreds of files.',
      'I set four hard constraints from day one. First, hybrid search — keyword search misses semantic matches, but vector search misses exact terms like "ISO 27001" or specific clause numbers. You need both. Second, multi-tenancy with hard isolation — shared infrastructure is fine, shared data is not. Third, measurable answer quality — "it seems to work" is not engineering. Fourth, production operations — streaming responses, cost tracking per query, rate limiting, and structured logging.',
    ],

    architecture: [
      'Standard RAG with deliberate choices at every layer. Two pipelines — ingestion and query — share FastAPI, PostgreSQL, Redis, and Qdrant, all orchestrated via Docker Compose. The ingestion pipeline handles document upload, chunking (three strategies), embedding, and indexing. The query pipeline handles embedding, hybrid retrieval, reranking, and LLM generation with streaming.',
      'Every query returns the answer plus a full latency breakdown — embedding time, retrieval time, reranking time, and generation time in milliseconds — along with token usage, cost estimate, and citations with relevance scores. This observability is not optional; it is how you debug production issues and optimize costs.',
    ],

    decisions: [
      {
        title: 'Hybrid Search with Reciprocal Rank Fusion',
        problem:
          'Vector search misses exact terms like policy numbers and standard codes. BM25 keyword search misses semantic meaning. Neither alone is sufficient for enterprise document Q&A.',
        solution:
          'Dense retrieval from Qdrant (top-20 results) combined with sparse BM25 retrieval from Redis (top-20 results) via Reciprocal Rank Fusion with k=60. RRF assigns each document a score based on its rank position in each list, then merges by summing scores.',
        sections: [
          {
            type: 'code',
            language: 'python',
            filename: 'hybrid_search.py',
            content: `# RRF: score(doc) = sum(1 / (k + rank_i)) across all ranking lists
for rank, chunk in enumerate(dense_results, start=1):
    scores[cid] = scores.get(cid, 0.0) + 1.0 / (rrf_k + rank)
for rank, chunk in enumerate(sparse_results, start=1):
    scores[cid] = scores.get(cid, 0.0) + 1.0 / (rrf_k + rank)`,
          },
        ],
        insight:
          'BM25 tokenizer quality matters more than BM25 variant. Stop word removal + min token length = big precision gain.',
      },
      {
        title: 'Semantic Chunking with Parent-Child Retrieval',
        problem:
          'Fixed-size splits break at arbitrary boundaries, separating claims from their supporting evidence. The LLM receives fragments without enough context to synthesize accurate answers.',
        solution:
          'Three chunking strategies: fixed 512-token chunks for baseline, semantic chunking that splits at 0.75 cosine similarity drops between sentences, and parent-child chunking with 256-token children for retrieval precision and 2048-token parents for LLM context. When a child chunk matches, the full parent is sent to the LLM.',
        sections: [],
        insight:
          'Parent-child was the single biggest quality improvement — the LLM gets 8x more context per retrieved chunk without sacrificing retrieval precision.',
      },
      {
        title: 'Cohere Reranking with CrossEncoder Fallback',
        problem:
          'First-stage retrievers are optimized for recall, not precision. The top-20 candidates contain relevant documents but also noise that degrades answer quality.',
        solution:
          'Cohere Rerank v3.0 cross-encoder re-scores 20 candidates down to top 5. If Cohere is unavailable, falls back to a local ms-marco-MiniLM CrossEncoder model. Two layers of graceful degradation ensure zero hard failures.',
        sections: [
          {
            type: 'code',
            language: 'python',
            filename: 'reranker.py',
            content: `def rerank_with_fallback(query, chunks, top_n):
    if settings.RERANKER_TYPE == "cohere" and settings.COHERE_API_KEY:
        try:
            return CohereReranker().rerank(query, chunks, top_n)
        except Exception:
            logger.warning("cohere_unavailable_falling_back_to_cross_encoder")
    return CrossEncoderReranker().rerank(query, chunks, top_n)`,
          },
        ],
        insight:
          'Two layers of graceful degradation, zero hard failures.',
      },
      {
        title: 'Multi-Tenant Isolation',
        problem:
          'A shared collection with metadata filters is a security risk — one bug in a filter means data leaks between tenants.',
        solution:
          'Physical isolation at every layer: per-tenant Qdrant collections, separate Redis BM25 keys per tenant, and Argon2 API key hashing. No metadata filter is the last line of defense; isolation is structural.',
        sections: [],
        insight:
          'Cannot bolt on isolation after the fact — it shapes every data access pattern.',
      },
      {
        title: 'RAGAS Evaluation Pipeline',
        problem:
          '"How do I know if it works?" is the question that separates engineering from demos. You cannot tune a RAG system by vibes.',
        solution:
          '56-question evaluation set across 5 categories: factual recall, multi-hop reasoning, summarization, comparison, and adversarial questions. RAGAS metrics computed for every run: faithfulness, answer relevancy, context precision, and context recall. A/B comparison support lets you measure the impact of every change.',
        sections: [],
        insight:
          'Building the eval set before fine-tuning saved weeks of guesswork. Every change had immediate, measurable impact.',
      },
    ],

    results: [
      { value: '0.91', label: 'Faithfulness', context: 'RAGAS Score' },
      { value: '0.84', label: 'Answer Relevancy', context: 'RAGAS Score' },
      { value: '0.82', label: 'Context Precision', context: 'RAGAS Score' },
      { value: '0.87', label: 'Context Recall', context: 'RAGAS Score' },
      { value: '~1.8s', label: 'P95 Latency', context: 'End-to-end query' },
      { value: '+12%', label: 'Hybrid vs Dense', context: 'Context precision gain' },
      { value: '+18%', label: 'Reranking Impact', context: 'Relevance improvement' },
    ],

    resultsSummary:
      'Adding BM25 and RRF fusion is under 50 lines of code but closes the gap on exact-match queries. The reranking improvement cascades directly into answer quality.',

    lessons: [
      {
        title: 'Evaluation first, optimization second',
        text: '56-question eval set before tuning saved weeks. Could immediately see impact of every change.',
      },
      {
        title: 'Tokenization matters more than you think for BM25',
        text: 'Regex tokenizer with lowercasing, punctuation stripping, stop words = big improvement over naive whitespace.',
      },
      {
        title: 'Parent-child chunking was the single biggest quality improvement',
        text: '256-token children + 2048-token parents = largest faithfulness gain.',
      },
      {
        title: 'Multi-tenant isolation is an architecture decision, not a feature',
        text: 'Cannot bolt on after the fact; shapes every data access pattern.',
      },
    ],

    techStack: [
      { layer: 'Backend', tech: 'FastAPI + Uvicorn', purpose: 'Async API with SSE streaming' },
      { layer: 'Language', tech: 'Python 3.11+', purpose: 'Backend services and ML' },
      { layer: 'Frontend', tech: 'React 19 + TypeScript', purpose: 'Admin dashboard, query UI' },
      { layer: 'Vector DB', tech: 'Qdrant', purpose: 'Dense retrieval (384-dim)' },
      { layer: 'Embeddings', tech: 'all-MiniLM-L6-v2', purpose: 'Document and query embedding' },
      { layer: 'Sparse Search', tech: 'rank-bm25 + Redis', purpose: 'BM25 per tenant' },
      { layer: 'Reranking', tech: 'Cohere Rerank v3.0', purpose: 'With CrossEncoder fallback' },
      {
        layer: 'LLM',
        tech: 'OpenAI-compatible (gpt-4o-mini)',
        purpose: 'Answer generation',
      },
      {
        layer: 'Database',
        tech: 'PostgreSQL 16',
        purpose: 'Metadata, logs, eval results',
      },
      { layer: 'Cache', tech: 'Redis 7', purpose: 'Rate limiting, BM25 corpus' },
      { layer: 'Evaluation', tech: 'RAGAS', purpose: '4 metric types' },
      { layer: 'Infrastructure', tech: 'Docker Compose', purpose: 'Service orchestration' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // CASE STUDY 2: MCP Agent
  // ─────────────────────────────────────────────────────────
  {
    slug: 'mcp-agent',
    title: 'Enterprise AI Agents with MCP',
    subtitle:
      'LangGraph-based agent orchestrating 26 tools across three MCP servers, with multi-model cost optimization, parallel execution, and layered safety controls',
    githubUrl: 'https://github.com/rohit-jain84/enterprise-mcp-agent-system',
    screenshots: [
      { light: '/screenshots/mcp-agent/dark/chat.png', dark: '/screenshots/mcp-agent/light/chat.png', alt: 'Multi-tool orchestration with tool calls and ticket table' },
      { light: '/screenshots/mcp-agent/dark/approvals.png', dark: '/screenshots/mcp-agent/light/approvals.png', alt: 'Human-in-the-loop approval queue with pending requests' },
      { light: '/screenshots/mcp-agent/dark/history.png', dark: '/screenshots/mcp-agent/light/history.png', alt: 'Session history with 4 agent conversations' },
    ],
    scenarios: [
      { title: 'PM Morning Briefing', description: '"What happened over the weekend?" — agent pulls PRs merged, tickets closed, sprint velocity, and upcoming meetings into one consolidated summary.' },
      { title: 'Cross-Tool Investigation', description: '"Why is the payment feature delayed?" — connects failing CI run → PR that caused it → linked ticket → engineer who was out sick. Causal analysis across 3 tools.' },
      { title: 'Ticket Triage', description: '"Triage unassigned bugs" — triage sub-agent analyzes each ticket, suggests priority based on sprint context, presents batch for one-click approval.' },
    ],
    readingTime: '12 min read',
    role: 'Principal Engineer',
    duration: '4 weeks',

    problem: [
      'Teams context-switch across 5-10 tools daily. The core challenge is not individual tool access — it is cross-tool reasoning. Connecting a failing CI build to the PR that caused it, to the ticket it addresses, to the engineer who is out sick requires jumping between GitHub, Jira, and calendar. Each context switch costs minutes and drops context.',
      'Write operations need human approval. Security is non-negotiable — prompt injection, PII leakage, and topic drift are real attack vectors when an agent has access to real tools. Cost matters too — not every query needs a $15/M-token model when a $0.25/M model can classify intent just as accurately.',
      'All 3 MCP servers are self-contained for development and evaluation; no external API calls. The servers simulate realistic GitHub, Jira, and calendar data with enough complexity to stress-test the agent across multi-step, cross-tool scenarios.',
    ],

    architecture: [
      'LangGraph StateGraph with 9 nodes and conditional edges. Three MCP servers expose 26 tools total — GitHub (PRs, commits, diffs, reviews), Jira (tickets, transitions, comments), and Calendar (meetings, scheduling). React frontend communicates via WebSocket for streaming responses. PostgreSQL handles graph state checkpointing.',
      'Multi-model routing: Haiku ($0.25/M input) handles intent classification and routing — fast, cheap, and equally accurate for structured classification. Sonnet ($3/M input) handles planning and synthesis where reasoning quality matters. Cost is tracked at every LLM call with per-session and per-user aggregates.',
    ],

    decisions: [
      {
        title: 'Multi-Model Cost Optimization',
        problem:
          'Using the same model for all steps is wasteful. Routing is structured classification — it does not need the most capable model.',
        solution:
          'Haiku ($0.25/M input) for the router node, Sonnet ($3/M input) for planning and synthesis. A CostTracker class records token usage and cost at every LLM call, with per-session and per-user aggregates.',
        sections: [
          {
            type: 'code',
            language: 'python',
            filename: 'cost_tracking.py',
            content: `_HAIKU_INPUT_COST  = 0.25 / 1_000_000
_HAIKU_OUTPUT_COST = 1.25 / 1_000_000
_SONNET_INPUT_COST  = 3.0 / 1_000_000
_SONNET_OUTPUT_COST = 15.0 / 1_000_000`,
          },
        ],
        insight:
          'Routing = 40% of LLM calls but only ~3% of cost with Haiku.',
      },
      {
        title: 'Parallel Tool Execution with Dependency Awareness',
        problem:
          'Sequential execution of a 3-tool query triples latency. Users will not wait 9 seconds for three 3-second tool calls.',
        solution:
          'The planner outputs steps with a parallel_group field. Steps in the same group run concurrently via asyncio.gather(). Steps in later groups wait for earlier groups to complete.',
        sections: [
          {
            type: 'code',
            language: 'python',
            filename: 'parallel_execution.py',
            content: `# Steps with parallel groups
[
  {"step": 1, "tool": "list_pull_requests", "parallel_group": 1},
  {"step": 2, "tool": "list_tickets",        "parallel_group": 1},
  {"step": 3, "tool": "list_meetings",       "parallel_group": 1},
  {"step": 4, "tool": "get_pr_diff",         "parallel_group": 2},
]
# Tool executor runs each group concurrently
results = await asyncio.gather(*tasks)`,
          },
        ],
        insight:
          'Latency = max(any single call) instead of sum(all calls).',
      },
      {
        title: 'Human-in-the-Loop via Graph Interrupts',
        problem:
          'Seven write tools need human approval without breaking agent state or holding resources while waiting.',
        solution:
          'Write detection by tool name prefix — create_, update_, delete_, merge_, assign_, transition_, add_. LangGraph interrupt_before=["approval_gate"] freezes state. State checkpointed to PostgreSQL. 15-minute timeout auto-denies stale requests.',
        sections: [
          {
            type: 'code',
            language: 'python',
            filename: 'write_detection.py',
            content: `_WRITE_PREFIXES = (
    "create_", "update_", "delete_",
    "merge_",  "assign_", "transition_", "add_",
)
def is_write_tool(tool_name: str) -> bool:
    if tool_name in _WRITE_OVERRIDES:
        return _WRITE_OVERRIDES[tool_name]
    return any(tool_name.startswith(p) for p in _WRITE_PREFIXES)`,
          },
        ],
        insight:
          'Graph interrupts freeze state to PostgreSQL — no polling, no memory held, survives restart.',
      },
      {
        title: 'Guardrails: Defense in Depth',
        problem:
          'An enterprise agent with access to real tools is a high-value target for prompt injection, PII leakage, and topic drift.',
        solution:
          'Three layers of defense: (1) NeMo Guardrails input rails detect 35+ injection patterns, (2) output rails block credential and architecture leaks, (3) Microsoft Presidio PII detection covers 11 entity types. Each layer degrades gracefully — if NeMo is not installed, input passes through; Presidio is optional.',
        sections: [
          {
            type: 'code',
            language: 'python',
            filename: 'guardrails.py',
            content: `_REFUSAL_MARKERS = (
    "i'm sorry", "i cannot", "i can't",
    "this request is not allowed",
    "attempts to modify",
    "i've detected personally identifiable",
)`,
          },
        ],
        insight:
          'No single layer is sufficient. NeMo catches injection, Presidio catches PII, output rails catch leaks. Layered approach moved adversarial success from ~100% to ~5%.',
      },
      {
        title: 'Per-Step Error Recovery',
        problem:
          'One tool failure should not tank the entire response. A global retry counter causes cascading failure — one flaky tool consumes all retries.',
        solution:
          'A step_error_counts dictionary gives each step independent MAX_RETRIES=2. Exhausted steps are dropped and partial results are synthesized into the final response.',
        sections: [
          {
            type: 'code',
            language: 'python',
            filename: 'error_recovery.py',
            content: `for failed in failed_results:
    step_key = str(failed.get("step", 0))
    step_errors = step_error_counts.get(step_key, 0)
    if step_errors <= MAX_RETRIES:
        plan_step["status"] = "pending"
        retry_calls.append(plan_step)
    else:
        exhausted_steps.append(step_num)`,
          },
        ],
        insight:
          'Per-step tracking eliminates a class of failures where one flaky tool starves healthy tools of retries.',
      },
    ],

    results: [
      { value: '82%', label: 'Task Completion', context: '30-task eval suite' },
      { value: '3.2', label: 'Avg Tool Calls', context: 'Per query' },
      { value: '$0.04', label: 'Cost/Conversation', context: 'Multi-model routing' },
      { value: '45s', label: 'Median Approval', context: 'Human-in-the-loop' },
      { value: '95%', label: 'Guardrail Block Rate', context: 'Adversarial inputs' },
    ],

    resultsSummary:
      'Multi-model routing keeps cost under $0.05 for typical 3-4 tool queries. Direct-answer queries cost under $0.01 by skipping the Sonnet planner.',

    lessons: [
      {
        title: 'Multi-model routing is the easiest cost win',
        text: 'Haiku classifies intent as well as Sonnet for structured classification. Any multi-step agent using the same model for every step is leaving money on the table.',
      },
      {
        title: 'Graph interrupts beat polling for human-in-the-loop',
        text: 'State serialized to PostgreSQL, process releases all memory. No loop, no WebSocket kept alive. Survives restarts.',
      },
      {
        title: 'Per-step error tracking prevents cascading failures',
        text: 'step_error_counts dict was a small change that eliminated an entire class of frustrating failure modes.',
      },
      {
        title: 'Guardrails are not optional',
        text: 'Without them, trivial to get agent to create issues with arbitrary content. Layered approach (NeMo + Presidio + output rails) moved adversarial success from ~100% to ~5%.',
      },
      {
        title: 'Sub-agents worth the complexity for certain task shapes',
        text: 'Research/triage sub-agents with specialized prompts produce better results for complex multi-step tasks.',
      },
    ],

    techStack: [
      {
        layer: 'Agent Framework',
        tech: 'LangGraph',
        purpose: 'StateGraph, interrupts, AsyncPostgresSaver',
      },
      { layer: 'LLM', tech: 'Claude Sonnet + Haiku', purpose: 'Multi-model routing' },
      { layer: 'MCP Servers', tech: 'FastMCP (Python)', purpose: '3 servers, 26 tools' },
      { layer: 'Backend', tech: 'FastAPI, Python 3.12', purpose: 'REST + WebSocket' },
      {
        layer: 'Frontend',
        tech: 'React 18, TypeScript',
        purpose: 'Streaming chat, approval modal',
      },
      { layer: 'Input Safety', tech: 'NeMo Guardrails', purpose: '35+ injection patterns' },
      { layer: 'PII', tech: 'Microsoft Presidio', purpose: '11 entity types' },
      { layer: 'Database', tech: 'PostgreSQL 16', purpose: 'Checkpointing, persistence' },
      { layer: 'Cache', tech: 'Redis 7', purpose: 'Cost tracking, usage' },
      { layer: 'Infrastructure', tech: 'Docker Compose', purpose: 'All 6 services' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // CASE STUDY 3: Document Intelligence
  // ─────────────────────────────────────────────────────────
  {
    slug: 'document-intelligence',
    title: 'Enterprise Document Intelligence: From OCR to RAG Q&A',
    subtitle:
      'Multi-stage ML pipeline turning unstructured enterprise documents into searchable, classified, entity-rich intelligence',
    githubUrl: 'https://github.com/rohit-jain84/enterprise-document-intelligence-platform',
    screenshots: [
      { light: '/screenshots/document-intelligence/dark/entities.png', dark: '/screenshots/document-intelligence/light/entities.png', alt: 'Entity dashboard — 48 NER entities with pie charts and type distribution' },
      { light: '/screenshots/document-intelligence/dark/dashboard.png', dark: '/screenshots/document-intelligence/light/dashboard.png', alt: 'Dashboard — 12 documents, 3 collections, recent documents table' },
      { light: '/screenshots/document-intelligence/dark/collections.png', dark: '/screenshots/document-intelligence/light/collections.png', alt: 'Collections — Finance, Legal, HR with 4 documents each' },
    ],
    scenarios: [
      { title: 'Legal Contract Search', description: 'Upload 500 vendor contracts (mix of native PDFs and scans). System OCRs everything, extracts company names, dates, amounts, and enables search like "Find contracts with auto-renewal clauses expiring before Q3."' },
      { title: 'Finance Invoice Processing', description: 'Scanned invoices are OCRd, amounts and dates extracted and normalized, classified as "invoice," and indexed for range queries ("invoices over $10,000 from last quarter").' },
      { title: 'Compliance Audit', description: 'Compliance team filters by document type and date range to prepare audit packages. RBAC ensures only authorized users see sensitive collections.' },
    ],
    readingTime: '10 min read',
    role: 'Principal Engineer',
    duration: '5 weeks',

    problem: [
      'Enterprises accumulate thousands of documents — contracts, invoices, policies, technical specs — in varied formats: native PDFs, scanned PDFs, DOCX, XLSX, and photos of paper. The information is critical but inaccessible at scale.',
      'Keyword search fails for multiple reasons. Scanned documents have no text layer at all. Keyword matching misses semantic meaning — searching for "termination clause" will not find "conditions under which this agreement may be ended." Nobody knows what entities (companies, people, dates, monetary amounts) exist across the full corpus, making it impossible to answer questions like "which contracts expire in Q3?"',
      'Access control is needed from day one. Legal contracts should be invisible to marketing. HR policies should not be searchable by external contractors. Permission models must match how organizations actually structure document access.',
    ],

    architecture: [
      'A 7-stage asynchronous pipeline orchestrated via Celery: Extraction, Classification, Named Entity Recognition, Chunking, Embedding, Indexing, and Storage. Each stage retries with exponential backoff. Graceful degradation means a failed classification stage tags the document as "unknown" rather than blocking the pipeline.',
      'Storage is split by purpose: MinIO for original files (S3-compatible), PostgreSQL for metadata, entities, and pgvector embeddings, Elasticsearch for BM25 keyword search and kNN vector search, and Redis as Celery broker and intermediate data store.',
    ],

    decisions: [
      {
        title: 'Tiered OCR Pipeline',
        problem:
          'No single extraction tool handles all document formats reliably. Enterprise documents arrive as native PDFs, scanned PDFs, DOCX, XLSX, and even photos of paper.',
        solution:
          'Three-tier extraction: Tier 1 is Apache Tika for fast extraction from native PDFs and DOCX. Tier 2 is pdfplumber for scanned PDFs with better layout preservation. Tier 3 is Tesseract OCR as a last resort for image-only documents.',
        sections: [],
        insight:
          'Tika alone failed within the first week of processing real enterprise documents. Three tiers catch the vast majority without human intervention.',
      },
      {
        title: 'NER with Entity Normalization',
        problem:
          'The same date appears as "Jan 5, 2024" and "January 5th" and gets treated as different entities. "$2.5 billion" and "$2,500,000,000" are stored separately, making aggregation impossible.',
        solution:
          'spaCy en_core_web_sm for 11 entity types. Custom post-processing normalizes dates to ISO 8601 format and money to (amount, currency) tuples. Deduplication via set of (type, normalized_value) pairs.',
        sections: [],
        insight:
          'Raw NER is a solved problem. Making entities useful — normalizing, deduplicating, enabling range queries — is where the intelligence lives.',
      },
      {
        title: 'Trainable Document Classification',
        problem:
          'Documents need to be classified by type (contract, invoice, policy, spec) for filtering and routing, but a fixed rule-based system cannot adapt to new document types.',
        solution:
          'TF-IDF + LinearSVM classifier with 10 categories, using the first 5000 characters of each document, bigram features, and a 10K feature cap. Confidence scores via sigmoid of the SVM decision function. Returns "unknown" with 0.0 confidence when the model is unsure rather than forcing a prediction.',
        sections: [],
        insight:
          '"unknown" with 0.0 confidence is more valuable than a forced prediction — it is a natural training signal that tells you which documents need human labeling.',
      },
      {
        title: 'Elasticsearch Hybrid Search',
        problem:
          'Keyword search misses semantic meaning and vector search misses exact terms. Running two separate search engines doubles operational complexity.',
        solution:
          'BM25 via multi_match with text boosted 3x, headings boosted 2x, filenames included, and auto fuzziness. kNN search with 384-dim cosine similarity vectors using HNSW indexing. Score fusion with a slight semantic boost. Aggregations enable faceted filtering by document type, date range, and entities.',
        sections: [],
        insight:
          'A single Elasticsearch instance handles both search modes and shares filters, aggregations, and tooling. No separate vector DB needed.',
      },
      {
        title: 'Collection-Level RBAC',
        problem:
          'Document-level permissions would create 500K+ permission entries and become unmanageable. But no access control is not an option.',
        solution:
          'Three-tier permission hierarchy: manage (full control) > upload (add documents) > view (read only). Higher tiers include all lower permissions. Admin bypass for system operations. Permissions are at the collection level, not document level, which matches how organizations actually organize their documents.',
        sections: [],
        insight:
          'Collection-level granularity matches how organizations actually organize documents. It keeps the permission model manageable while providing meaningful access control.',
      },
    ],

    results: [
      { value: '12 docs/min', label: 'Processing', context: 'Typical native PDFs' },
      { value: '94%', label: 'OCR Accuracy', context: 'Scanned documents' },
      { value: '0.87', label: 'NER Precision', context: 'Test corpus' },
      { value: '0.91', label: 'Classification', context: '10-class F1' },
      { value: '+22%', label: 'nDCG@10 Gain', context: 'Hybrid vs keyword-only' },
      { value: '120ms', label: 'Search Latency', context: 'P95 response time' },
    ],

    resultsSummary:
      'Throughput varies with document complexity. Hybrid search improvement measured by comparing nDCG@10 of hybrid vs BM25-only on manually judged relevance queries.',

    lessons: [
      {
        title: 'Tiered extraction with fallbacks handles the real world',
        text: 'Tika alone was insufficient within the first week. Three-tier extraction catches the vast majority of documents without human intervention.',
      },
      {
        title: 'Entity normalization is where intelligence lives',
        text: 'Raw NER is a solved problem. Normalizing dates for range queries, money for thresholds, and deduplicating = structured data from labeled text.',
      },
      {
        title: 'Classification with confidence beats forced classification',
        text: '"unknown"/0.0 lets downstream systems decide their own threshold. Also serves as a natural training signal for human labeling.',
      },
      {
        title: 'Hybrid search beats either alone, Elasticsearch handles both natively',
        text: 'No separate vector DB needed. Score fusion consistently outperforms either search mode alone.',
      },
    ],

    techStack: [
      { layer: 'API', tech: 'FastAPI, Pydantic v2', purpose: 'Async endpoints' },
      { layer: 'Database', tech: 'PostgreSQL 16 + pgvector', purpose: 'Metadata, entities' },
      { layer: 'Search', tech: 'Elasticsearch 8.13', purpose: 'BM25 + kNN hybrid' },
      { layer: 'Task Queue', tech: 'Celery + Redis', purpose: 'Pipeline orchestration' },
      { layer: 'Object Storage', tech: 'MinIO', purpose: 'S3-compatible files' },
      { layer: 'OCR', tech: 'Tika, pdfplumber, Tesseract', purpose: 'Tiered extraction' },
      { layer: 'Embeddings', tech: 'all-MiniLM-L6-v2', purpose: '384-dim vectors' },
      {
        layer: 'Classification',
        tech: 'scikit-learn (TF-IDF + SVM)',
        purpose: 'Document typing',
      },
      { layer: 'NER', tech: 'spaCy (en_core_web_sm)', purpose: 'Entity extraction' },
      { layer: 'LLM', tech: 'Claude API', purpose: 'RAG Q&A responses' },
      { layer: 'Frontend', tech: 'React 18, TypeScript', purpose: 'Dashboard + search UI' },
      { layer: 'Auth', tech: 'JWT + Collection RBAC', purpose: 'Access control' },
      { layer: 'Infrastructure', tech: 'Docker Compose', purpose: 'Service orchestration' },
    ],
  },
];
