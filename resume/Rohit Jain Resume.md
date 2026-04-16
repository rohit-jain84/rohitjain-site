# Rohit Jain

**AI Engineer | RAG Systems, LLM Agents & LLMOps | 17+ Years Enterprise Architecture**

rohitjain84@gmail.com | [LinkedIn](https://tinyurl.com/rohit9) | [GitHub](https://github.com/rohit-jain84) | [Portfolio](https://rohitjain.net)

---

## Summary

AI engineer with 17 years of enterprise backend experience. I build production-grade RAG systems, multi-tool AI agents, and document intelligence pipelines — with evaluation frameworks that prove they work. My enterprise background is the differentiator: multi-tenancy, fault tolerance, observability, and cost optimization are built into the architecture from day one.

---

## AI Portfolio Projects

### Multi-Tenant RAG Platform
*Python, FastAPI, Qdrant, PostgreSQL, Redis, React*

- Built a document Q&A platform with hybrid search (dense + BM25 via Reciprocal Rank Fusion), semantic chunking with parent-child retrieval, and Cohere reranking with CrossEncoder fallback
- Achieved 0.91 faithfulness and 0.87 context recall across a 56-question RAGAS evaluation set
- Implemented physical multi-tenant isolation (per-tenant Qdrant collections, separate Redis keys, Argon2 API key hashing)
- Hybrid search improved context precision by +12% over dense-only; reranking improved relevance by +18%

### Enterprise AI Agents with MCP
*LangGraph, Claude (Sonnet + Haiku), FastMCP, FastAPI, React, PostgreSQL, Redis*

- Architected a LangGraph agent orchestrating 26 tools across 3 MCP servers (GitHub, project management, calendar)
- Multi-model cost optimization: Haiku for routing ($0.04/conversation avg), Sonnet for reasoning — 40% of LLM calls at 3% of cost
- Human-in-the-loop via LangGraph graph interrupts with PostgreSQL checkpointing (durable, survives restarts)
- 3-layer guardrails (NeMo Guardrails + Presidio PII + output rails) achieving 95% adversarial block rate

### Document Intelligence Platform
*Python, FastAPI, Elasticsearch, PostgreSQL, Celery, MinIO, spaCy, scikit-learn*

- Built a 7-stage async pipeline: tiered OCR (Tika → pdfplumber → Tesseract), trainable classification (TF-IDF + SVM, 0.91 F1), NER with entity normalization
- Elasticsearch hybrid search (BM25 + kNN) improved nDCG@10 by +22% over keyword-only
- Collection-level RBAC with JWT authentication and hierarchical permissions

### LLMOps Platform
*Python, FastAPI, PostgreSQL, Redis, LangFuse, OpenTelemetry, Grafana*

- Prompt versioning with Jinja2 templates, LLM-as-judge evaluation, A/B testing with Welch's t-test significance
- Eval-gated CI/CD: deployments blocked if faithfulness drops below threshold
- Semantic caching for cost optimization, canary rollouts (10% → 25% → 50% → 100%)

---

## Professional Experience

### AI Engineer — Freelance & Portfolio | Oct 2025 – Present
Building production AI systems with measurable results. Focus: RAG, agents, document intelligence, LLMOps.

### CTO & Principal Architect — Investello | Jul 2016 – Oct 2025
Architected a value-investing SaaS platform (100,000+ users, ₹10 Lakh ARR). Distributed data platform processing 500K+ records with 99.9% freshness. AI-powered earnings analyzer using Azure OpenAI + Semantic Kernel.

### Senior Tech Lead — Entegral | Mar 2022 – Dec 2024
Led v1→v2 platform modernization on AWS. Redesigned Redis and DynamoDB access patterns, materially improving p95/p99 latencies. Prototyped AVM using XGBoost.

### Principal Engineer & Architect (Consultant) | Jan 2018 – Mar 2022
Delivered enterprise solutions across Saudi Arabia, USA, and India using .NET Core, PostgreSQL, MongoDB, and cloud services.

### Lead Engineer & Architect → Early Career | Jun 2007 – Dec 2017
Built multi-merchant marketplace (Cacawaa, Kuwait), led 8-engineer team. Full-stack enterprise development across FinTech, E-Commerce, and EdTech.

---

## Technical Skills

**AI & LLM:** RAG, LangGraph, LangChain, Claude API, OpenAI API, MCP Servers, RAGAS, Prompt Engineering, Guardrails (NeMo, Presidio)
**Python:** FastAPI, Celery, spaCy, scikit-learn, Pydantic, asyncio
**Infrastructure:** Docker, PostgreSQL, Redis, Elasticsearch, Qdrant, MinIO, OpenTelemetry, Grafana
**Frontend:** React, TypeScript, Tailwind CSS, WebSocket
**Enterprise:** C#/.NET, Azure, AWS, System Design, Multi-Tenancy, Observability

---

## Education

**Bachelor of Engineering — Information Technology**
Netaji Subhas University of Technology (NSUT), Delhi | 2003 – 2007
