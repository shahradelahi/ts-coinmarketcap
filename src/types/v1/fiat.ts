import type { Status } from '@/types/common';

/**
 * @description Represents a single fiat currency from the Fiat Map API.
 */
export interface FiatCurrency {
  id: number;
  name: string;
  sign: string;
  symbol: string;
}

/**
 * @description The root interface for the Fiat Map API response.
 */
export interface FiatMapResponse {
  data: FiatCurrency[];
  status: Status;
}

/**
 * @description Defines the parameters for fetching the fiat currency map.
 */
export interface GetFiatMapParams {
  /**
   * Optionally offset the start (1-based index) of the paginated list of items to return.
   */
  start?: number;
  /**
   * Optionally specify the number of results to return. Use this parameter and the "start" parameter to determine your own pagination size.
   */
  limit?: number;
  /**
   * What field to sort the list by.
   */
  sort?: 'name' | 'id';
  /**
   * Pass true to include precious metals.
   */
  include_metals?: boolean;
}
