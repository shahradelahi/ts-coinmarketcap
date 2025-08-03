import type { Status } from '@/types/common';

export interface GetNewsParams {
  cryptoId: number | string;
  mode?: 'top' | 'latest';
  language?: string;
}

export interface NewsAsset {
  coinId: number;
  name: string;
  type: 'coin' | 'token';
}

export interface NewsMeta {
  createdAt: string;
  follow: boolean;
  id: string;
  language: string;
  maxChar: number;
  releasedAt: string;
  sourceName: string;
  sourceUrl: string;
  status: string;
  subtitle: string;
  title: string;
  type: 'NEWS' | 'ALEXANDRIA';
  updatedAt: string;
  visibility: boolean;
  internalNews: boolean;
  content?: string;
}

export interface NewsArticle {
  assets: NewsAsset[];
  cover: string;
  createdAt: string;
  meta: NewsMeta;
  promotionTags: any[];
  slug: string;
  tags: string[];
  type: 'NEWS' | 'ALEXANDRIA';
}

export interface NewsData {
  dailyAnalysisLink: string;
  news: NewsArticle[];
}

export interface NewsResponse {
  data: NewsData;
  status: Status;
}
