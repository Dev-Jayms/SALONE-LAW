import { CONSTITUTION_OF_SIERRA_LEONE } from '../data/constitutionData';
import { SIERRA_LEONE_STATUTES } from '../data/statutesData';
import { SIERRA_LEONE_CASES } from '../data/caseLawData';
import { ConstitutionSection, Statute, LandmarkCase } from '../types/legal';

export interface SearchResult {
  type: 'constitution' | 'statute' | 'case';
  title: string;
  subtitle: string;
  snippet: string;
  id: string;
  data: ConstitutionSection | Statute | LandmarkCase;
}

export function searchLegalCorpus(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  // Search Constitution
  CONSTITUTION_OF_SIERRA_LEONE.forEach((chapter) => {
    chapter.sections.forEach((sec) => {
      if (
        sec.title.toLowerCase().includes(q) ||
        sec.sectionNumber.toLowerCase().includes(q) ||
        sec.content.toLowerCase().includes(q) ||
        sec.summary.toLowerCase().includes(q) ||
        sec.keyTakeaways.some((k) => k.toLowerCase().includes(q))
      ) {
        results.push({
          type: 'constitution',
          title: `Section ${sec.sectionNumber}: ${sec.title}`,
          subtitle: `1991 Constitution - Chapter ${chapter.roman} (${chapter.title})`,
          snippet: sec.summary || sec.content.slice(0, 150) + '...',
          id: sec.id,
          data: sec,
        });
      }
    });
  });

  // Search Statutes
  SIERRA_LEONE_STATUTES.forEach((statute) => {
    if (
      statute.title.toLowerCase().includes(q) ||
      statute.shortTitle.toLowerCase().includes(q) ||
      statute.overview.toLowerCase().includes(q) ||
      statute.tags.some((t) => t.toLowerCase().includes(q)) ||
      statute.sections.some(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.content.toLowerCase().includes(q) ||
          s.summary.toLowerCase().includes(q)
      )
    ) {
      results.push({
        type: 'statute',
        title: statute.title,
        subtitle: `${statute.category} Law • ${statute.actNumber}`,
        snippet: statute.overview.slice(0, 160) + '...',
        id: statute.id,
        data: statute,
      });
    }
  });

  // Search Cases
  SIERRA_LEONE_CASES.forEach((c) => {
    if (
      c.title.toLowerCase().includes(q) ||
      c.citation.toLowerCase().includes(q) ||
      c.areaOfLaw.toLowerCase().includes(q) ||
      c.facts.toLowerCase().includes(q) ||
      c.ratioDecidendi.toLowerCase().includes(q) ||
      c.holding.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'case',
        title: c.title,
        subtitle: `${c.court} (${c.year}) • ${c.citation}`,
        snippet: c.ratioDecidendi.slice(0, 160) + '...',
        id: c.id,
        data: c,
      });
    }
  });

  return results;
}
