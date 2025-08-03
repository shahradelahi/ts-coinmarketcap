import type { Status } from '@/types/common';

export interface GetAcademyArticleParams {
  slug: string;
}

export interface TableOfContentsItem {
  text: string;
  href: string;
}

export interface ArticleImage {
  original: string;
  optimized: string;
  thumbnail: string;
}

export interface ArticleDifficulty {
  level: number;
  label: string;
  slug: string;
  language: string;
}

export interface ArticleCategory {
  id: string;
  title: string;
  description?: string;
  language: string;
  slug: string;
  icon?: string;
}

export interface ArticleAuthor {
  name: string;
  bio_summary: string;
  slug: string;
  image: ArticleImage;
}

export interface ArticleAsset {
  id: number;
  name: string;
  symbol: string;
  slug: string;
}

export interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  meta: string;
  image: ArticleImage;
  language: string;
  created_at: string;
  updated_at: string;
  reading_time: number;
  categories: ArticleCategory[];
  author: ArticleAuthor;
}

export interface AcademyArticleData {
  id: string;
  legacy_id: number;
  title: string;
  slug: string;
  meta: string;
  visible: boolean;
  image: ArticleImage;
  content: string;
  disclaimer: string;
  language: string;
  created_at: string;
  updated_at: string;
  reading_time: number;
  likes: number;
  shares: number;
  srd: boolean;
  related: RelatedArticle[];
  available_languages: string[];
  difficulty: ArticleDifficulty;
  categories: ArticleCategory[];
  author: ArticleAuthor;
  assets: ArticleAsset[];
  tableOfContent: TableOfContentsItem[];
}

export interface GetAcademyArticleResponse {
  data: AcademyArticleData;
  status: Status;
}
