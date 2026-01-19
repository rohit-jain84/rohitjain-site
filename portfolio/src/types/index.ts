export interface HeroData {
  name: string;
  title: string;
  photoUrl: string;
  headline: string;
}

export interface SummaryData {
  paragraphs: string[];
}

export interface Project {
  id: string;
  title: string;
  context: string;
  approach: string;
  outcome: string;
  architecturalInsight: string;
  techStack: string[];
  source: string;
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
}

export interface NavItem {
  label: string;
  href: string;
}
