import type { Status } from '@/types/common';

export interface GetFixedQuestionsParams {
  id: number | string;
  slug: string;
  langCode?: string;
}

export interface FixedQuestion {
  id: string;
  cryptoId: number;
  questionType: number;
  rawQuestion: string;
  icon: string;
}

export interface FixedQuestionsResponse {
  data: FixedQuestion[];
  status: Status;
}
