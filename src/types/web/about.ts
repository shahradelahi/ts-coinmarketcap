import type { Status } from '@/types/common';

export interface GetAboutSectionParams {
  slug: string;
}

export interface AboutSection {
  title: string;
  content: string;
}

export type AboutData = AboutSection[];

export interface CryptocurrencyAboutResponse {
  data: AboutData;
  status: Status;
}
