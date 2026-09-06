export interface ConstitutionSection {
  id: string;
  chapterNumber: number;
  chapterTitle: string;
  sectionNumber: string;
  title: string;
  content: string;
  summary: string;
  keyTakeaways: string[];
  relatedCases?: string[];
  relatedStatutes?: string[];
}

export interface ConstitutionChapter {
  number: number;
  roman: string;
  title: string;
  description: string;
  sections: ConstitutionSection[];
}

export interface StatuteSection {
  sectionNumber: string;
  title: string;
  content: string;
  summary: string;
}

export interface Statute {
  id: string;
  title: string;
  shortTitle: string;
  actNumber: string;
  year: number;
  category: 'Constitutional' | 'Criminal' | 'Commercial' | 'Land & Property' | 'Cyber & Tech' | 'Family & Human Rights' | 'Electoral' | 'Mining & Resources' | 'Judicial';
  overview: string;
  keyProvisions: string[];
  sections: StatuteSection[];
  tags: string[];
}

export interface LandmarkCase {
  id: string;
  citation: string;
  title: string;
  court: 'Supreme Court of Sierra Leone' | 'Court of Appeal' | 'High Court of Sierra Leone' | 'Special Court for Sierra Leone';
  year: number;
  judges?: string[];
  areaOfLaw: string;
  facts: string;
  legalIssues: string[];
  holding: string;
  ratioDecidendi: string;
  significance: string;
  relatedSections: string[];
}

export interface LegalTemplate {
  id: string;
  title: string;
  category: 'Court Pleadings' | 'Contracts & Agreements' | 'Notices & Letters' | 'Corporate' | 'Criminal Practice';
  description: string;
  fields: { key: string; label: string; placeholder: string; defaultValue?: string }[];
  templateText: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  citations?: {
    type: 'constitution' | 'statute' | 'case';
    title: string;
    section?: string;
    snippet: string;
  }[];
  similarCases?: {
    caseTitle: string;
    citation: string;
    year: number;
    summary: string;
    ratio: string;
  }[];
  followUpQuestions?: string[];
  isStreaming?: boolean;
}

export interface LegalBookmark {
  id: string;
  type: 'constitution' | 'statute' | 'case' | 'note';
  title: string;
  subtitle: string;
  content: string;
  savedAt: string;
  tags?: string[];
}
