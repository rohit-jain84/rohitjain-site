export interface ArticleSection {
  type: 'text' | 'code' | 'list' | 'heading' | 'callout';
  level?: 2 | 3;
  content: string;
  language?: string;
  filename?: string;
  items?: string[];
  ordered?: boolean;
  variant?: 'insight' | 'takeaway';
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  readingTime: string;
  publishDate: string;
  tags: string[];
  sections: ArticleSection[];
}

export const articles: Article[] = [
  {
    slug: 'enterprise-to-ai',
    title: 'From Enterprise Backend to AI Engineering: What Senior Developers Need to Know',
    subtitle: 'You spent a decade-plus building distributed systems. Now the industry asks you to build with LLMs. Here\'s the honest guide.',
    readingTime: '8 min read',
    publishDate: '2026-03-15',
    tags: ['Career', 'AI Engineering', 'RAG', 'Backend'],
    sections: [
      {
        type: 'heading',
        level: 2,
        content: 'The Question Every Senior Developer Is Asking',
      },
      {
        type: 'text',
        content: 'If you\'re a senior backend developer with 10+ years, you\'ve watched the AI wave with fascination and anxiety. LinkedIn full of "AI Engineer" postings. Clients asking about RAG pipelines. Three questions keep surfacing: Should I pivot? Can I? What transfers from my existing skillset?',
      },
      {
        type: 'text',
        content: 'I spent 17 years building enterprise backend systems \u2014 distributed architectures, database optimization, high-throughput APIs. Over the past year, I pivoted into AI engineering by building five production-grade projects. This article is the honest debrief \u2014 a practical map from someone who walked the trail.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'What Transfers Directly (Your Unfair Advantage)',
      },
      {
        type: 'text',
        content: 'Here\'s what nobody in the AI influencer space admits: most AI engineering is software engineering with a new set of APIs. Your decade-plus of building production systems transfers almost entirely.',
      },
      {
        type: 'heading',
        level: 3,
        content: 'System Design Thinking',
      },
      {
        type: 'text',
        content: 'A RAG system is a distributed system. You have a retriever, a reranker, and a generator with data flowing between components. You\'ve been designing these systems for years \u2014 the components have different names but the patterns are identical.',
      },
      {
        type: 'heading',
        level: 3,
        content: 'Production Engineering',
      },
      {
        type: 'text',
        content: 'AI systems are stochastic \u2014 the same input can produce different outputs. They need better observability, testing, and error handling than deterministic systems. Your production instincts for monitoring, alerting, graceful degradation, and structured logging are the moat that separates you from someone who just finished an LLM tutorial.',
      },
      {
        type: 'heading',
        level: 3,
        content: 'API Design',
      },
      {
        type: 'text',
        content: 'LLM providers, embedding services, and vector databases all expose HTTP APIs. You\'ve been designing and consuming these for years. The authentication patterns, rate limiting strategies, and retry logic are identical.',
      },
      {
        type: 'heading',
        level: 3,
        content: 'Database Skills',
      },
      {
        type: 'text',
        content: 'A vector database is a database with a different index type. HNSW instead of B-trees. Cosine similarity instead of equality predicates. The mental model of indexing, querying, and scaling transfers directly.',
      },
      {
        type: 'heading',
        level: 3,
        content: 'Async & Concurrent Programming',
      },
      {
        type: 'text',
        content: 'Agent loops, parallel tool execution, streaming responses, background processing \u2014 you\'ve done all of this with message queues, worker pools, and async frameworks. The patterns are the same; the libraries are different.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'What You Need to Learn (5 Core Ideas)',
      },
      {
        type: 'text',
        content: 'The AI-specific knowledge fits into five core concepts. None require a PhD or deep ML theory \u2014 this is applied engineering, not research.',
      },
      {
        type: 'heading',
        level: 3,
        content: '1. Embeddings and Vector Similarity',
      },
      {
        type: 'text',
        content: 'The core intuition: text is converted to vectors where similar meanings are close in space. Cosine similarity of 1.0 means identical meaning, 0.0 means unrelated. Key decisions: embedding model choice (all-MiniLM-L6-v2 for speed, text-embedding-3-large for quality), dimensionality (384/768/1536), and distance metric (cosine vs dot product).',
      },
      {
        type: 'heading',
        level: 3,
        content: '2. The RAG Pattern',
      },
      {
        type: 'text',
        content: 'Chunk your documents \u2192 Embed the chunks \u2192 Store in a vector database \u2192 Retrieve relevant chunks for a query \u2192 Generate an answer with an LLM using those chunks as context. This is the simplest useful AI application and the foundation for everything else.',
      },
      {
        type: 'heading',
        level: 3,
        content: '3. Prompt Engineering',
      },
      {
        type: 'text',
        content: 'System prompts set behavior boundaries. Chain-of-thought improves reasoning on complex tasks. Few-shot examples establish output format. Structured output (JSON mode) makes responses parseable by code. This is the closest thing to "programming" the LLM itself.',
      },
      {
        type: 'heading',
        level: 3,
        content: '4. Agents and Tool Use',
      },
      {
        type: 'text',
        content: 'The LLM becomes an orchestrator that decides which tools to call. Function calling: the model selects a tool and arguments, you execute the function, return the result, and the model continues reasoning. This is the pattern behind every AI assistant that can actually do things.',
      },
      {
        type: 'heading',
        level: 3,
        content: '5. Evaluation',
      },
      {
        type: 'text',
        content: 'RAGAS metrics are the standard: context recall (did retrieval find the right chunks?), context precision (is the retrieved context focused?), faithfulness (does the answer stick to the context?), answer relevance (does it address the question?). This is the moat \u2014 anyone can build a RAG pipeline, but knowing whether it works is what gets you hired.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Tech Stack That Got Me Hired',
      },
      {
        type: 'list',
        content: '',
        items: [
          'Python + FastAPI \u2014 async-native, the default for AI backends',
          'Vector databases \u2014 Qdrant (recommended), pgvector, Pinecone',
          'LLM providers \u2014 Anthropic Claude, OpenAI GPT-4',
          'Orchestration \u2014 LangGraph for agents, direct SDK calls for simple pipelines',
          'Evaluation \u2014 RAGAS for RAG metrics, custom domain-specific evals',
        ],
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Portfolio Strategy',
      },
      {
        type: 'text',
        content: 'Five projects showing clear progression from simple to complex. Each one builds on the last and demonstrates a new capability.',
      },
      {
        type: 'list',
        content: '',
        ordered: true,
        items: [
          'API wrapper with structured LLM output \u2014 proves you can integrate',
          'RAG system with quantified metrics \u2014 proves you can build and measure',
          'Agent with tool use \u2014 proves you can orchestrate',
          'Enterprise integration (multi-tenancy, document processing, audit logging) \u2014 proves you can handle production concerns',
          'LLMOps/evaluation pipeline \u2014 proves you think about the full lifecycle',
        ],
      },
      {
        type: 'callout',
        content: 'Each project should have measurable outcomes. \'Built a RAG system\' is forgettable. \'Built a RAG system that achieved 0.91 faithfulness across 56 evaluation questions\' gets the interview.',
        variant: 'takeaway',
      },
      {
        type: 'heading',
        level: 2,
        content: 'What I Wish I\'d Known',
      },
      {
        type: 'list',
        content: '',
        items: [
          'No PhD or ML theory needed \u2014 this is applied engineering, not research',
          'Evaluation is the moat \u2014 knowing if it works matters more than building it',
          'Your enterprise skills don\'t disappear \u2014 they\'re your second-half value proposition',
          'Build for real clients while learning \u2014 freelance platforms are the best classroom',
        ],
      },
      {
        type: 'text',
        content: 'The transition from enterprise backend to AI engineering is more accessible than it looks. It\'s not a complete career reset \u2014 it\'s pointing your systems thinking at a new problem domain. The tools are different but the engineering discipline is the same.',
      },
    ],
  },
  {
    slug: 'rag-beyond-basics',
    title: 'RAG Beyond the Basics: Hybrid Search, Reranking, and Evaluation in Production',
    subtitle: 'Moving past basic vector search into production-grade retrieval.',
    readingTime: '9 min read',
    publishDate: '2026-03-22',
    tags: ['RAG', 'Search', 'Evaluation', 'Python'],
    sections: [
      {
        type: 'heading',
        level: 2,
        content: 'Introduction',
      },
      {
        type: 'text',
        content: 'Most RAG tutorials stop at "embed your docs, search by cosine similarity, pass to LLM." This works for demos but fails in production where queries need both semantic understanding and exact-match precision. This article covers the three techniques that took my RAG system from demo-grade to 0.91 faithfulness in production: hybrid retrieval, reranking, and systematic evaluation.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Beyond Vector Search: Hybrid Retrieval',
      },
      {
        type: 'text',
        content: 'Pure vector search excels at semantic similarity \u2014 it knows "compensation package" and "salary structure" are related. But it struggles with exact terms: "ISO 27001" or "Section 4.2.1" need lexical precision that embedding models smooth over. BM25 handles exact terms perfectly but misses paraphrases.',
      },
      {
        type: 'text',
        content: 'The solution is running both in parallel and combining results with Reciprocal Rank Fusion (RRF). RRF merges ranked lists without requiring score normalization \u2014 important because BM25 scores and cosine similarity live on completely different scales.',
      },
      {
        type: 'code',
        content: 'async def hybrid_search(query: str, k: int = 20) -> list[Document]:\n    # Run dense + sparse search in parallel\n    dense, sparse = await asyncio.gather(\n        qdrant_client.search(query_embedding, limit=k),\n        redis_bm25.search(query, limit=k),\n    )\n    # Reciprocal Rank Fusion \u2014 no score normalization needed\n    fused = reciprocal_rank_fusion(dense, sparse, k=60)\n    # Cross-encoder reranking for precision\n    reranked = await reranker.rerank(query, fused[:k])\n    return reranked',
        language: 'python',
        filename: 'hybrid_search.py',
      },
      {
        type: 'callout',
        content: 'RRF doesn\'t require normalizing scores between retrievers \u2014 each system uses its native scoring. This is why it\'s preferred over linear score combination for hybrid search.',
        variant: 'insight',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Chunking Strategies That Actually Matter',
      },
      {
        type: 'heading',
        level: 3,
        content: 'Fixed-Size Chunking',
      },
      {
        type: 'text',
        content: 'The baseline approach. 512 tokens with 50-token overlap. Fast and predictable but splits at arbitrary boundaries with no regard for meaning \u2014 a paragraph might be cut in half, separating a claim from its evidence.',
      },
      {
        type: 'heading',
        level: 3,
        content: 'Semantic Chunking',
      },
      {
        type: 'text',
        content: 'Split at sentence boundaries where embedding similarity between consecutive sentences drops below a threshold (0.75). This produces topically coherent chunks where each covers one idea, not an arbitrary byte range. Boundaries align with actual topic shifts in the document.',
      },
      {
        type: 'heading',
        level: 3,
        content: 'Parent-Child Retrieval',
      },
      {
        type: 'text',
        content: 'Small children (256 tokens) are stored as retrieval targets for precision matching. But the full parent chunks (2048 tokens) are what gets passed to the LLM for generation. This gives you precise retrieval with rich context \u2014 the best of both worlds.',
      },
      {
        type: 'callout',
        content: 'Parent-child chunking was the single biggest quality improvement in my evaluation set. The LLM receives 8x more context per retrieved chunk, producing more complete and grounded answers.',
        variant: 'takeaway',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Reranking: The Precision Layer',
      },
      {
        type: 'text',
        content: 'After hybrid search, you have ~20 candidate chunks ranked by a combination of BM25 and vector similarity. But these first-stage retrievers are optimized for recall, not precision. Many candidates are tangentially related. Passing all of them to the LLM wastes tokens and introduces noise.',
      },
      {
        type: 'text',
        content: 'A cross-encoder (like Cohere Rerank v3.0) jointly encodes the query and each candidate, attending to fine-grained interactions. This is far more accurate than bi-encoder similarity. From 20 candidates, it selects the top 5 most relevant. With automatic fallback to a local CrossEncoder model if the API is unavailable \u2014 two layers of degradation, zero hard failures.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Evaluation: The Actual Moat',
      },
      {
        type: 'text',
        content: 'The RAGAS framework provides four complementary metrics that together give a complete picture of RAG quality.',
      },
      {
        type: 'list',
        content: '',
        items: [
          'Context Recall \u2014 did retrieval find the necessary chunks?',
          'Context Precision \u2014 is the retrieved context focused or noisy?',
          'Faithfulness \u2014 does the answer stick to the retrieved context, or hallucinate?',
          'Answer Relevance \u2014 does the answer actually address the question asked?',
        ],
      },
      {
        type: 'code',
        content: 'from ragas import evaluate\nfrom ragas.metrics import (\n    faithfulness, answer_relevancy,\n    context_precision, context_recall,\n)\n\nresult = evaluate(\n    dataset=eval_dataset,\n    metrics=[faithfulness, answer_relevancy,\n             context_precision, context_recall],\n)\nprint(result)\n# {\'faithfulness\': 0.91, \'answer_relevancy\': 0.84, ...}',
        language: 'python',
        filename: 'evaluation.py',
      },
      {
        type: 'callout',
        content: 'Build the evaluation set BEFORE tuning retrieval parameters. 56 questions across 5 difficulty categories. Every architectural change becomes measurable \u2014 no more tuning by vibes.',
        variant: 'takeaway',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Putting It All Together',
      },
      {
        type: 'text',
        content: 'The full production pipeline: embed the query \u2192 run hybrid search (dense + sparse via RRF) \u2192 rerank top candidates with a cross-encoder \u2192 pass the best chunks to the LLM with a structured prompt. Each layer is independently testable, and the evaluation framework quantifies the impact of every change.',
      },
      {
        type: 'text',
        content: 'Production RAG is not one technique \u2014 it\'s multiple techniques working together, each addressing a different failure mode, validated by a systematic evaluation framework. The total improvement from hybrid search + reranking + proper chunking compounds significantly over basic vector-only retrieval.',
      },
    ],
  },
  {
    slug: 'llmops-cicd',
    title: 'LLMOps: Building CI/CD Pipelines for AI Applications',
    subtitle: 'Treat prompts as code. Version them, test them, gate deployments on eval scores.',
    readingTime: '7 min read',
    publishDate: '2026-03-29',
    tags: ['LLMOps', 'CI/CD', 'Evaluation', 'DevOps'],
    sections: [
      {
        type: 'heading',
        level: 2,
        content: 'The Problem: Prompts Are Code',
      },
      {
        type: 'text',
        content: 'Your prompt is the most impactful parameter in an AI application. A single word change can shift accuracy by 10%. Yet most teams store prompts as string literals in source code, deploy them without testing, and have no way to roll back when quality degrades. LLMOps applies software engineering discipline to AI applications: version control, automated testing, gated deployments, observability, and cost optimization.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Prompt Versioning',
      },
      {
        type: 'text',
        content: 'Treat prompts as first-class artifacts, not string literals. Use Jinja2 templates with variable substitution, version them in the database, and support instant rollback to any previous version. Each prompt version is immutable once created \u2014 edits create new versions, never modify existing ones.',
      },
      {
        type: 'code',
        content: 'from jinja2 import Template\n\nSYSTEM_PROMPT = Template(\"\"\"\nYou are a {{ role }} assistant for {{ company }}.\nAnswer questions using ONLY the provided context.\nIf the answer is not in the context, say\n\"I don\'t have that information.\"\n\nContext: {{ context }}\n\"\"\")\n\nrendered = SYSTEM_PROMPT.render(\n    role=\"technical support\",\n    company=\"Acme Corp\",\n    context=retrieved_chunks,\n)',
        language: 'python',
        filename: 'prompt_versioning.py',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Evaluation Framework',
      },
      {
        type: 'heading',
        level: 3,
        content: 'LLM-as-Judge',
      },
      {
        type: 'text',
        content: 'Use a more capable model to evaluate a lesser model\'s output. Define scoring rubrics in the judge\'s prompt \u2014 accuracy (0-5), completeness (0-5), tone (0-5). Cheaper than human evaluation, more nuanced than programmatic metrics, and scales to thousands of test cases.',
      },
      {
        type: 'heading',
        level: 3,
        content: 'Programmatic Metrics',
      },
      {
        type: 'text',
        content: 'Token count, format validation, JSON schema compliance, response latency. These are fast, deterministic, and zero-cost. Use them as first-pass filters before more expensive evaluation methods.',
      },
      {
        type: 'heading',
        level: 3,
        content: 'Human Evaluation',
      },
      {
        type: 'text',
        content: 'For high-stakes decisions where automated metrics aren\'t sufficient. Sample-based with calibrated rubrics. The gold standard but expensive and slow \u2014 reserve for final validation, not continuous testing.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'A/B Testing Prompts',
      },
      {
        type: 'text',
        content: 'Run two prompt versions simultaneously with deterministic traffic splitting by user ID hash. This ensures each user always sees the same version (no flickering) and the split is reproducible. Declare winners with statistical rigor using Welch\'s t-test \u2014 not vibes, not anecdotes.',
      },
      {
        type: 'code',
        content: 'from scipy import stats\n\ndef is_significant(scores_a, scores_b, alpha=0.05):\n    \"\"\"Welch\'s t-test for unequal variances.\"\"\"\n    t_stat, p_value = stats.ttest_ind(\n        scores_a, scores_b, equal_var=False\n    )\n    return p_value < alpha, p_value',
        language: 'python',
        filename: 'ab_testing.py',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Eval-Gated Deployment',
      },
      {
        type: 'text',
        content: 'Quality gates that block deployment when eval scores drop below thresholds. The CI/CD pipeline runs the full evaluation suite against the new prompt version. If faithfulness drops below 0.85 or answer relevancy below 0.80, the deployment is automatically blocked. This is CI/CD for AI quality, not just code quality.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Cost Optimization',
      },
      {
        type: 'heading',
        level: 3,
        content: 'Token Accounting',
      },
      {
        type: 'text',
        content: 'Track token usage per feature, per model, per user. Without granular tracking, you can\'t identify which features are expensive or which users are outliers. Build this into every LLM call from day one.',
      },
      {
        type: 'heading',
        level: 3,
        content: 'Model Selection',
      },
      {
        type: 'text',
        content: 'Use smaller, cheaper models for routing and classification tasks. Use larger models only for complex reasoning. A well-designed routing layer can handle 40% of LLM calls at 3% of the cost.',
      },
      {
        type: 'heading',
        level: 3,
        content: 'Semantic Caching',
      },
      {
        type: 'text',
        content: 'Cache responses for semantically similar queries using a cosine similarity threshold. When a new query is close enough to a cached query, return the cached response. This produces dramatic cost reduction for repetitive workloads like customer support.',
      },
      {
        type: 'heading',
        level: 3,
        content: 'Canary Deployments',
      },
      {
        type: 'text',
        content: 'Roll out new prompt versions gradually: 10% \u2192 25% \u2192 50% \u2192 100%, with eval scores checked at each stage. If quality drops at any gate, the rollout halts and reverts automatically.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Observability',
      },
      {
        type: 'text',
        content: 'LangFuse for LLM-specific tracing (prompt \u2192 response \u2192 eval scores). OpenTelemetry for infrastructure metrics. Grafana dashboards combining both. Track latency per LLM call, token usage trends, eval score drift over time, and cost per feature. LLMOps is what separates AI demos from AI products.',
      },
    ],
  },
  {
    slug: 'building-mcp-servers',
    title: 'Building MCP Servers: A Practical Guide for Enterprise Tool Integration',
    subtitle: 'How to build standardized tool interfaces for AI agents using the Model Context Protocol.',
    readingTime: '7 min read',
    publishDate: '2026-04-05',
    tags: ['MCP', 'Agents', 'Enterprise', 'Tool Use'],
    sections: [
      {
        type: 'heading',
        level: 2,
        content: 'What Is MCP and Why It Matters',
      },
      {
        type: 'text',
        content: 'Every AI agent team builds custom tool integrations. The GitHub integration for Agent A is incompatible with Agent B. Each team reinvents authentication, error handling, and pagination patterns. There\'s no standard protocol \u2014 until MCP.',
      },
      {
        type: 'text',
        content: 'The Model Context Protocol standardizes tool integration for AI agents. Define your tools once with typed schemas, and any MCP-compatible agent can discover and use them. It\'s the same idea that REST APIs brought to web services \u2014 a common interface that eliminates per-integration boilerplate.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Building Your First MCP Server',
      },
      {
        type: 'text',
        content: 'Let\'s build a GitHub MCP server. Each tool has a name, description (which acts as a prompt for the LLM), and a typed input schema. The FastMCP library handles the protocol details.',
      },
      {
        type: 'code',
        content: 'from fastmcp import FastMCP\n\nmcp = FastMCP(\"github-server\")\n\n@mcp.tool()\nasync def list_pull_requests(\n    repo: str,\n    state: str = \"open\",\n    limit: int = 10,\n) -> list[dict]:\n    \"\"\"List pull requests for a repository.\"\"\"\n    return await github_client.get_prs(repo, state, limit)\n\n@mcp.tool()\nasync def get_pr_diff(\n    repo: str, pr_number: int\n) -> str:\n    \"\"\"Get the diff for a specific pull request.\"\"\"\n    return await github_client.get_diff(repo, pr_number)',
        language: 'python',
        filename: 'github_mcp.py',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Patterns for Enterprise MCP Servers',
      },
      {
        type: 'heading',
        level: 3,
        content: 'Authentication',
      },
      {
        type: 'text',
        content: 'Pass authentication tokens via server configuration, not per-tool arguments. This keeps tool definitions clean and security centralized. The MCP server reads credentials from environment variables or a secrets manager at startup.',
      },
      {
        type: 'heading',
        level: 3,
        content: 'Pagination',
      },
      {
        type: 'text',
        content: 'Return a page of results plus a total count. Let the agent decide whether to fetch more based on the task. Never dump thousands of results \u2014 the LLM context window is expensive and has hard limits.',
      },
      {
        type: 'heading',
        level: 3,
        content: 'Error Recovery',
      },
      {
        type: 'text',
        content: 'Return structured errors that the agent can reason about, not raw exception tracebacks. Include an error code, a human-readable message, and whether the operation is retryable. The agent can then decide to retry, skip, or ask the user for help.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Connecting MCP Servers to Your Agent',
      },
      {
        type: 'text',
        content: 'The MCP client discovers available tools from the server at connection time. These tool definitions are passed to the LLM as function calling schemas. The LLM selects which tools to call with what arguments, the client executes them against the MCP server, and results flow back into the conversation.',
      },
      {
        type: 'code',
        content: 'from fastmcp import Client\n\nasync with Client(\"github-server\") as client:\n    tools = await client.list_tools()\n    # Pass tools to LLM as function definitions\n    response = await llm.invoke(\n        messages=conversation,\n        tools=[t.to_openai_format() for t in tools],\n    )',
        language: 'python',
        filename: 'agent_connection.py',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Safety: Human-in-the-Loop for Write Operations',
      },
      {
        type: 'text',
        content: 'Read operations (list, get, search) are safe to auto-execute. Write operations (create, update, delete) need an approval gate. The pattern is straightforward: detect write operations by tool name prefix, pause execution, present the proposed action to the user, and wait for explicit approval.',
      },
      {
        type: 'text',
        content: 'The approval mechanism must be durable \u2014 the pending state should be checkpointed to a database, not held in memory. The user might take minutes to review a proposed action, and the server shouldn\'t hold open connections or in-memory state for that long. A 15-minute timeout auto-denies stale approvals to prevent zombie states.',
      },
      {
        type: 'callout',
        content: 'The approval gate must survive server restarts. Checkpoint to PostgreSQL, not memory. Users take minutes to review \u2014 your architecture should handle that gracefully.',
        variant: 'insight',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Lessons from Building 3 MCP Servers',
      },
      {
        type: 'list',
        content: '',
        items: [
          'Keep tools focused \u2014 one action per tool, not multi-purpose Swiss Army knives',
          'Return structured JSON with consistent schemas across all tools',
          'Write tool descriptions for LLMs \u2014 they\'re prompts, not documentation. Be specific about what the tool does and what it returns',
          'Test tools independently before connecting them to agents',
          'Monitor tool usage in production to identify which tools are actually useful vs. theoretical',
        ],
      },
      {
        type: 'text',
        content: 'MCP standardizes what every agent team was building ad-hoc. Build your tools once with typed schemas, and any MCP-compatible agent can use them. The protocol itself is simple \u2014 the real value is in the standardization and the patterns (auth, pagination, error handling, safety gates) that make tools production-ready.',
      },
    ],
  },
];
