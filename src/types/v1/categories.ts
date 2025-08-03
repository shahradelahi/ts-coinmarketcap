import type { CryptoCurrency } from '@/types';
import type { Status } from '@/types/common';

/**
 * @description Represents a single cryptocurrency category.
 */
export interface Category {
  /**
   * @example "605e2ce9d41eae1066535f7c"
   */
  id: string;
  /**
   * @example "A16Z Portfolio"
   */
  name: string;
  /**
   * @example "A16Z Portfolio"
   */
  title: string;
  /**
   * @example "A16Z Portfolio"
   */
  description: string;
  /**
   * @example 12
   */
  num_tokens: number;
  /**
   * @example 0.61305157
   */
  avg_price_change: number;
  /**
   * @example 29429241867.031097
   */
  market_cap: number;
  /**
   * @example 3.049044106496
   */
  market_cap_change: number;
  /**
   * @example 4103706600.0391645
   */
  volume: number;
  /**
   * @example -10.538325849854
   */
  volume_change: number;
  /**
   * @example 1616488708878
   */
  last_updated: number;
}

/**
 * @description Represents a single cryptocurrency category with a list of coins.
 */
export interface CategoryDetails extends Category {
  coins: CryptoCurrency[];
}

/**
 * @description The root interface for the cryptocurrency categories API response.
 */
export interface CategoriesResponse {
  data: Category[];
  status: Status;
}

/**
 * @description The root interface for the cryptocurrency category details API response.
 */
export interface CategoryDetailsResponse {
  data: CategoryDetails;
  status: Status;
}

/**
 * @description Defines the parameters for fetching cryptocurrency categories.
 */
export interface GetCategoriesParams {
  /**
   * Optionally offset the start (1-based index) of the paginated list of items to return.
   * @default 1
   */
  start?: number;
  /**
   * Optionally specify the number of results to return. Use this parameter and the "start" parameter to determine your own pagination size.
   * @default 5000
   */
  limit?: number;
  /**
   * Filtered categories by one or more comma-separated cryptocurrency CoinMarketCap IDs.
   * @example "1,2"
   */
  id?: string | number | number[];
  /**
   * Alternatively filter categories by a comma-separated list of cryptocurrency slugs.
   * @example "bitcoin,ethereum"
   */
  slug?: string | string[];
  /**
   * Alternatively filter categories one or more comma-separated cryptocurrency symbols.
   * @example "BTC,ETH"
   */
  symbol?: string | string[];
}

/**
 * @description Defines the parameters for fetching a single cryptocurrency category.
 */
export interface GetCategoryParams {
  /**
   * The Category ID. This can be found using the Categories API.
   */
  id: string;
  /**
   * Optionally offset the start (1-based index) of the paginated list of coins to return.
   * @default 1
   */
  start?: number;
  /**
   * Optionally specify the number of coins to return. Use this parameter and the "start" parameter to determine your own pagination size.
   * @default 100
   */
  limit?: number;
  /**
   * Optionally calculate market quotes in up to 120 currencies at once by passing a comma-separated list of cryptocurrency or fiat currency symbols.
   * Each additional convert option beyond the first requires an additional call credit.
   * A list of supported fiat options can be found here. Each conversion is returned in its own "quote" object.
   */
  convert?: string | string[];
  /**
   * Optionally calculate market quotes by CoinMarketCap ID instead of symbol.
   * This option is identical to convert outside of ID format. Ex: convert_id=1,2781 would replace convert=BTC,USD in your query.
   * This parameter cannot be used when convert is used.
   */
  convert_id?: string | string[];
}
