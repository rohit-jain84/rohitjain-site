export interface HeroData {
  name: string;
  title: string;
  photoUrl: string;
  headline: string;
  availableForWork: boolean;
}

export interface SummaryData {
  paragraphs: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  caseStudySlug?: string;
  category: 'rag' | 'agents' | 'document-ai' | 'llmops' | 'code-review' | 'enterprise';
  highlights: string[];
  heroScreenshot?: string;
  screenshots?: { src: string; alt: string }[];
  scenario?: string;
  architectureOneLiner?: string;
}

export interface DesignPrinciple {
  id: string;
  title: string;
  description: string;
  evidence: string;
  projectId: string;
}

export interface Role {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  note?: string;
  bullets: string[];
  techStack: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface EducationData {
  degree: string;
  field: string;
  institution: string;
  years: string;
}

export interface ContactData {
  email: string;
  linkedIn: string;
  github: string;
  upwork?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  company: string;
  location: string;
}

export interface ServiceArea {
  id: string;
  title: string;
  description: string;
  tags: string[];
}
