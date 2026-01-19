import type {
  HeroData,
  SummaryData,
  Project,
  Role,
  SkillCategory,
  EducationData,
  ContactData,
  NavItem,
} from '../types';

export const navigation: NavItem[] = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const hero: HeroData = {
  name: 'Rohit Jain',
  title: 'Engineering Leader & Architect — Distributed Systems, .NET',
  photoUrl: '/photo/Rohit Jain.jpg',
  headline:
    '17 years building scalable, distributed SaaS platforms across FinTech, E-Commerce, and Enterprise domains.',
};

export const summary: SummaryData = {
  paragraphs: [
    'Engineering leader and architect with 17 years of experience delivering highly scalable, distributed SaaS platforms across FinTech, E-Commerce, and Enterprise domains.',
    'Expertise in modernizing complex, high-throughput systems using .NET 8, C#, cloud-native patterns, and applied AI/ML on Azure and AWS, with a focus on improving performance, security, and reliability through SRE and DevOps principles.',
    'Proven ability to drive company-wide technical strategy, set architectural standards, mentor engineers at all levels, and partner across teams to align execution with business outcomes.',
  ],
};

export const projects: Project[] = [
  {
    id: 'platform-modernization',
    title: 'Platform Modernization & Performance Optimization',
    context:
      'Inherited a latency-plagued v1 platform with Redis misuse (scatter/gather, client-side joins) and DynamoDB anti-patterns (normalized multi-table reads, N-way joins in code).',
    approach:
      'Set technical vision and roadmap tied to SLOs. Redesigned Redis cache keys, data shapes, and TTL policies. Shifted DynamoDB from normalized tables to access-pattern-first single-table modeling with GSIs/LSIs.',
    outcome:
      'Materially improved p95/p99 latencies and system stability. Eliminated in-code joins and simplified hot paths. Protected feature velocity while de-risking delivery.',
    architecturalInsight:
      'Chose single-table DynamoDB over Aurora/Postgres — trading query flexibility for predictable latency at scale. Access patterns were well-defined; relational joins were not needed.',
    techStack: ['C#', '.NET 6', 'AWS Lambda', 'DynamoDB', 'Redis', 'CloudWatch'],
    source: 'Entegral (2022–2024)',
  },
  {
    id: 'investello-data-platform',
    title: 'Distributed Data Platform for Value Investing',
    context:
      'Needed to scale a manual 100-stock data pilot into automated daily/quarterly/annual loads processing 500K+ records from multiple provider APIs.',
    approach:
      'Designed scheduled ingestion pipelines with idempotent background workers and resilient APIs. Implemented scheduling, retries, and integrity checks.',
    outcome:
      '99.9% data freshness. Scaled to 50,000+ registered users and ₹10 Lakh ARR with automated valuation engines and high-performance stock screeners.',
    architecturalInsight:
      'Built for idempotency from day one — every pipeline step can be safely retried. This eliminated manual intervention and enabled aggressive retry policies without data corruption.',
    techStack: ['C#', 'ASP.NET Core', 'Azure App Services', 'Azure SQL', 'Azure Blob Storage'],
    source: 'Investello (2016–2025)',
  },
  {
    id: 'ai-earnings-analyzer',
    title: 'AI-Powered Earnings Report Analyzer',
    context:
      'Users needed qualitative context beyond raw quantitative data — earnings call PDFs contain valuable insights but are long and dense.',
    approach:
      'Built a pipeline using Azure Blob Storage for document ingestion, Azure Functions for processing, and Semantic Kernel to parse long-form earnings PDFs into structured summaries, sentiment, and key metrics.',
    outcome:
      'Provided users with digestible earnings insights, reducing manual analysis time. Demonstrated applied AI/ML in a real product feature.',
    architecturalInsight:
      'Used Semantic Kernel over raw OpenAI calls — the orchestration layer simplified prompt chaining and made the system easier to test and extend.',
    techStack: ['C#', 'Azure Functions', 'Azure Blob Storage', 'Azure OpenAI', 'Semantic Kernel'],
    source: 'Investello (2016–2025)',
  },
  {
    id: 'automated-valuation-model',
    title: 'Automated Valuation Model (AVM) Prototype',
    context:
      'Championed a data-driven initiative to predict property market values — proving feasibility of a new revenue stream.',
    approach:
      'Built a regression model prototype using XGBoost on property feature data (size, location, comparable sales) to predict market values.',
    outcome:
      'Proved technical feasibility of AVM as a product feature. Demonstrated ability to bridge engineering and product thinking.',
    architecturalInsight:
      'Started with XGBoost for interpretability and fast iteration over deep learning — stakeholders needed to understand why a property was valued at X, not just that it was.',
    techStack: ['Python', 'XGBoost', 'AWS'],
    source: 'Entegral (2022–2024)',
  },
];

export const experience: Role[] = [
  {
    id: 'entegral',
    title: 'Senior Tech Lead Software Engineer',
    company: 'Entegral',
    location: 'Remote - Knysna, South Africa',
    startDate: 'Mar 2022',
    endDate: 'Dec 2024',
    bullets: [
      'Owned the v1→v2 modernization of a latency-plagued platform; set the technical vision, roadmap, and guardrails tied to SLOs and customer outcomes.',
      'Partnered across engineering and product teams to lead cross-stack architecture (.NET 6 services on AWS); made critical, business-first trade-offs (e.g., DynamoDB vs. Aurora/Postgres) that protected feature velocity while de-risking delivery.',
      'Root-caused performance regressions: identified Redis misuse (scatter/gather, client-side joins) as the bottleneck; redesigned cache keys/data shapes and TTL policies, materially improving p95/p99 and stability.',
      'Repaired DynamoDB anti-patterns: shifted from normalized, multi-table reads to access-pattern-first single-table modeling (GSIs/LSIs) to eliminate N-way reads and in-code joins; simplified hot paths.',
      'Championed a data-driven product initiative to create an Automated Valuation Model (AVM); built a prototype using a regression model (e.g., XGBoost) on property feature data (size, location) to predict market values, proving the feasibility of a new potential revenue stream.',
    ],
    techStack: [
      'C#',
      '.NET 6',
      'React',
      'AWS Lambda',
      'API Gateway',
      'DynamoDB',
      'S3',
      'CloudWatch',
      'Redis',
    ],
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
      'Architected and scaled a value-investing SaaS platform from 0 to 1, achieving 50,000+ registered users and ₹10 Lakh ARR by building a differentiated product with automated valuation engines and high-performance stock screeners.',
      'Designed and evolved the distributed data platform with scheduled ingestion pipelines, idempotent background workers, and resilient APIs; scaled a manual 100-stock pilot into automated daily/quarterly/annual loads processing 500K+ records via provider APIs, with scheduling, retries, and integrity checks ensuring 99.9% data freshness.',
      'Built an AI-powered earnings report analyzer using Azure Blob Storage, Azure Functions, and Semantic Kernel to parse long-form earnings PDFs into structured summaries, sentiment, and key metrics, thus providing users with qualitative context beyond raw quantitative data.',
      "After leaving Entegral in Dec 2024, worked full-time on Investello from Jan–Oct 2025 to pursue product–market fit; when it did not reach the traction targets I'd set, I wrapped up active development and decided to return to a full-time staff/principal engineering role in a larger product organization.",
    ],
    techStack: [
      'C#',
      'ASP.NET Core',
      'Azure App Services',
      'Azure SQL',
      'Azure Blob Storage',
      'Azure OpenAI',
      'Semantic Kernel',
    ],
  },
  {
    id: 'consultant',
    title: 'Principal Engineer & Architect (Consultant)',
    company: 'Multiple Clients',
    location: 'Remote',
    startDate: 'Jan 2018',
    endDate: 'Mar 2022',
    bullets: [
      'Asharqiya Chamber of Commerce (Saudi Arabia): Architected and led the development of a secure membership portal using .NET Core and SQL Server, implementing configurable workflows, RBAC, and robust auditing to meet enterprise requirements.',
      'IDrive (USA) - Enterprise Backup Solution: Designed and built high-reliability backup/restore services in C# with MongoDB and AWS S3, engineering for data integrity with checksums, resumable uploads, and idempotent operations.',
      'GrantEd (USA) - Scholarship Matching Platform: Developed a sophisticated rules and matching engine in .NET with PostgreSQL, designing scalable schemas and asynchronous notification queues to handle complex eligibility logic.',
    ],
    techStack: ['C#', '.NET Core', 'React', 'AWS', 'Azure', 'PostgreSQL', 'MongoDB', 'SQL Server'],
  },
  {
    id: 'cacawaa',
    title: 'Lead Engineer & Architect',
    company: 'Cacawaa',
    location: 'Remote - Kuwait City, Kuwait',
    startDate: 'Apr 2014',
    endDate: 'Dec 2017',
    bullets: [
      'Defined technical strategy and system architecture; built a three-app platform (Customer UI, Shop Control Panel, Admin Console) to power a multi-merchant marketplace.',
      'Led backend and cloud architecture on Azure (C#, ASP.NET MVC, SQL Server; VMs/Cloud Services, Blob Storage, CDN); established code reviews and development standards for long-term maintainability.',
      'Drove execution as head of an 8-engineer team—ran Agile ceremonies, removed blockers, improved dev/deployment processes; partnered with CEO/marketing to prioritize the roadmap against business goals.',
    ],
    techStack: ['C#', 'ASP.NET MVC', 'SQL Server', 'Azure VMs', 'Azure Blob Storage', 'Azure CDN'],
  },
  {
    id: 'early-career',
    title: 'Early Career — Full-time Roles & Projects',
    company: 'IVP, Arxmind, Contata & Others',
    location: 'Delhi NCR',
    startDate: 'Jun 2007',
    endDate: 'Apr 2014',
    bullets: [
      'Full Time Roles: Associate Software Engineer (Indus Valley Partners, Jun 2007 – Jun 2008); Senior Software Engineer (Arxmind, Sep 2009 – Sep 2011); Senior System Analyst (Contata, Oct 2011 – Jun 2012).',
      'Worked across ASP.Net, C#, SQL Server, Azure on data-driven enterprise apps — database design, clean and maintainable code, unit testing, and performance tuning.',
      'Jul 2012 – Mar 2014: Independent Consultant — executed tech projects across EdTech, Insurance; built data models, APIs, and production-ready services and applications using C#, ASP.Net, SQL Server, Azure.',
    ],
    techStack: ['C#', 'ASP.NET', 'SQL Server', 'Azure'],
  },
];

export const skills: SkillCategory[] = [
  {
    id: 'leadership',
    name: 'Leadership & Strategy',
    skills: [
      'Technical Vision & Roadmaps',
      'Data-Driven Strategy',
      'Technical Prototyping',
      'Cross-functional Collaboration',
      'Product Partnership',
      'Mentoring Senior Engineers',
      'Agile/Scrum',
    ],
  },
  {
    id: 'architecture',
    name: 'Architecture & Systems',
    skills: [
      'Distributed Systems',
      'Cloud-Native Architecture',
      'Applied AI/ML',
      'System Modernization',
      'Microservices',
      'Event-Driven Design',
      'Performance Optimization',
    ],
  },
  {
    id: 'engineering',
    name: 'Engineering Excellence',
    skills: ['C#', '.NET 8', 'ASP.NET Core', 'Web API', 'React', 'Redux', 'TypeScript'],
  },
  {
    id: 'ai-ml',
    name: 'AI / Machine Learning',
    skills: [
      'Semantic Kernel',
      'LangChain',
      'Azure OpenAI',
      'Azure Cognitive Services',
      'AWS SageMaker',
      'Python (Scikit-learn)',
      'ML.NET',
      'NLP',
      'Regression Models',
    ],
  },
  {
    id: 'sre-devops',
    name: 'SRE & DevOps',
    skills: [
      'Observability (Monitoring, Logging, Tracing)',
      'SLOs/SLIs',
      'CI/CD Automation',
      'Infrastructure-as-Code (IaC)',
    ],
  },
  {
    id: 'cloud',
    name: 'Data & Cloud',
    skills: [
      'Azure App Service',
      'Azure Functions',
      'Azure SQL',
      'Cosmos DB',
      'Azure Blob Storage',
      'Azure Service Bus',
      'Azure Event Hubs',
      'AWS Lambda',
      'API Gateway',
      'DynamoDB',
      'S3',
      'SQL Server',
      'PostgreSQL',
      'MongoDB',
      'Redis',
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
  linkedIn: 'https://tinyurl.com/rohit9',
};
