export interface GetWhitepaperSummaryParams {
  /**
   * The slug of the cryptocurrency (e.g., "bitcoin").
   */
  slug: string;
  /**
   * The language code for the summary.
   * @default 'en'
   */
  language?: string;
}

export interface WhitepaperSummarySection {
  tldr: string;
  technology: string;
  tokenomics: string;
  roadmap: string;
  team: string;
}

export interface WhitepaperSummaryResponse {
  beginner: WhitepaperSummarySection;
  intermediate: WhitepaperSummarySection;
  expert: WhitepaperSummarySection;
}

export interface WhitepaperCoin {
  symbol: string;
  name: string;
  id: number;
  slug: string;
  levels: ('beginner' | 'intermediate' | 'expert')[];
}

export type WhitepaperCoinsResponse = WhitepaperCoin[];
