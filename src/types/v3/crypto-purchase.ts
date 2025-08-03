import type { Status } from '@/types/common';

/**
 * @description Defines the parameters for fetching purchase flags.
 */
export interface GetPurchaseFlagsParams {
  countryCode?: string;
  ids: number[];
  mediaType?: 'desktop' | 'mobile';
}

/**
 * @description The root interface for the purchase flags API response.
 */
export interface PurchaseFlagsResponse {
  data: number[];
  status: Status;
}
