import type { Platform, Status } from '@/types/common';

/**
 * @description Represents a single cryptocurrency mapping.
 */
export interface CryptocurrencyMap {
  /**
   * @example 1
   */
  id: number;
  /**
   * @example 1
   */
  rank: number;
  /**
   * @example "Bitcoin"
   */
  name: string;
  /**
   * @example "BTC"
   */
  symbol: string;
  /**
   * @example "bitcoin"
   */
  slug: string;
  /**
   * @example 1
   */
  is_active: 1 | 0;
  /**
   * @example "2013-04-28T18:47:21.000Z"
   */
  first_historical_data: string;
  /**
   * @example "2020-05-05T20:44:01.000Z"
   */
  last_historical_data: string;
  /**
   * The platform this cryptocurrency runs on.
   */
  platform: Platform | null;
}

/**
 * @description The root interface for the cryptocurrency map API response.
 */
export interface CryptocurrencyMapResponse {
  data: CryptocurrencyMap[];
  status: Status;
}

/**
 * @description Defines the parameters for fetching the cryptocurrency map.
 */
export interface GetCryptocurrencyMapParams {
  /**
   * Only active cryptocurrencies are returned by default.
   * @default "active"
   */
  listing_status?: 'active' | 'inactive' | 'untracked' | string;
  /**
   * Optionally offset the start (1-based index) of the paginated list of items to return.
   * @default 1
   */
  start?: number;
  /**
   * Optionally specify the number of results to return.
   */
  limit?: number;
  /**
   * What field to sort the list of cryptocurrencies by.
   * @default "id"
   */
  sort?: 'cmc_rank' | 'id';
  /**
   * Optionally pass a comma-separated list of cryptocurrency symbols to return CoinMarketCap IDs for.
   */
  symbol?: string | string[];
  /**
   * Optionally specify a comma-separated list of supplemental data fields to return.
   * @default "platform,first_historical_data,last_historical_data,is_active"
   */
  aux?: string | string[];
}
