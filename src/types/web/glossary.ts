import type { Status } from '@/types/common';

/**
 * @description Defines the parameters for fetching a glossary term.
 */
export interface GetGlossaryTermParams {
  /** The URL slug of the glossary term (e.g., "abenomics"). */
  slug: string;
}

/**
 * @description Represents a related glossary term.
 */
export interface RelatedGlossaryTerm {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
}

/**
 * @description Represents the difficulty level of a glossary term.
 */
export interface GlossaryDifficulty {
  level: number;
  label: string;
  slug: string;
  language: string;
}

/**
 * @description Represents a single glossary term.
 */
export interface GlossaryTerm {
  id: string;
  title: string;
  slug: string;
  meta: string;
  excerpt: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
  related: RelatedGlossaryTerm[];
  available_languages: string[];
  difficulty: GlossaryDifficulty;
}

/**
 * @description The root interface for the glossary term API response.
 */
export interface GlossaryTermResponse {
  data: GlossaryTerm;
  status: Status;
}
