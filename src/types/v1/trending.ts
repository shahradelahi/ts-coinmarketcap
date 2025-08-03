import type { CryptoCurrency } from '@/types';
import type { Status } from '@/types/common';

/**
 * @description The root interface for the trending gainers/losers API response.
 */
export interface TrendingGainersLosersResponse {
  data: CryptoCurrency[];
  status: Status;
}

/**
 * @description The root interface for the trending latest API response.
 */
export interface TrendingLatestResponse {
  data: CryptoCurrency[];
  status: Status;
}

/**
 * @description The root interface for the trending most visited API response.
 */
export interface TrendingMostVisitedResponse {
  data: CryptoCurrency[];
  status: Status;
}

/**
 * @description Defines the parameters for fetching trending gainers and losers.
 */
export interface GetTrendingGainersLosersParams {
  /**
   * Optionally offset the start (1-based index) of the paginated list of items to return.
   * @default 1
   */
  start?: number;
  /**
   * Optionally specify the number of results to return.
   * @default 100
   */
  limit?: number;
  /**
   * Adjusts the overall window of time for the biggest gainers and losers.
   * @default "24h"
   */
  time_period?: '1h' | '24h' | '7d' | '30d';
  /**
   * Optionally calculate market quotes in up to 120 currencies at once.
   */
  convert?: string | string[];
  /**
   * Optionally calculate market quotes by CoinMarketCap ID instead of symbol.
   */
  convert_id?: string | string[];
  /**
   * What field to sort the list of cryptocurrencies by.
   * @default "percent_change_24h"
   */
  sort?: 'percent_change_24h';
  /**
   * The direction in which to order cryptocurrencies against the specified sort.
   */
  sort_dir?: 'asc' | 'desc';
}

/**
 * @description Defines the parameters for fetching the latest trending cryptocurrencies.
 */
export interface GetTrendingLatestParams {
  /**
   * Optionally offset the start (1-based index) of the paginated list of items to return.
   * @default 1
   */
  start?: number;
  /**
   * Optionally specify the number of results to return.
   * @default 100
   */
  limit?: number;
  /**
   * Adjusts the overall window of time for the latest trending coins.
   * @default "24h"
   */
  time_period?: '24h' | '7d' | '30d';
  /**
   * Optionally calculate market quotes in up to 120 currencies at once.
   */
  convert?: string | string[];
  /**
   * Optionally calculate market quotes by CoinMarketCap ID instead of symbol.
   */
  convert_id?: string | string[];
}

/**
 * @description Defines the parameters for fetching the most visited trending cryptocurrencies.
 */
export interface GetTrendingMostVisitedParams {
  /**
   * Optionally offset the start (1-based index) of the paginated list of items to return.
   * @default 1
   */
  start?: number;
  /**
   * Optionally specify the number of results to return.
   * @default 100
   */
  limit?: number;
  /**
   * Adjusts the overall window of time for most visited currencies.
   * @default "24h"
   */
  time_period?: '24h' | '7d' | '30d';
  /**
   * Optionally calculate market quotes in up to 120 currencies at once.
   */
  convert?: string | string[];
  /**
   * Optionally calculate market quotes by CoinMarketCap ID instead of symbol.
   */
  convert_id?: string | string[];
}
