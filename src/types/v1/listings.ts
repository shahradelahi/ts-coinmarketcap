import type { CryptoCurrency } from '@/types';
import type { Status } from '@/types/common';

/**
 * @description The root interface for the cryptocurrency new listings API response.
 */
export interface ListingsNewResponse {
  data: CryptoCurrency[];
  status: Status;
}

/**
 * @description The root interface for the cryptocurrency historical listings API response.
 */
export interface ListingsHistoricalResponse {
  data: CryptoCurrency[];
  status: Status;
}

/**
 * @description The root interface for the cryptocurrency latest listings API response.
 */
export interface ListingsLatestResponse {
  data: CryptoCurrency[];
  status: Status;
}

/**
 * @description Defines the parameters for fetching the latest cryptocurrency listings.
 */
export interface GetListingsLatestParams {
  /**
   * Optionally offset the start (1-based index) of the paginated list of items to return.
   * @default 1
   */
  start?: number;
  /**
   * Optionally specify the number of results to return. Use this parameter and the "start" parameter to determine your own pagination size.
   * @default 100
   */
  limit?: number;
  /**
   * Optionally specify a threshold of minimum USD price to filter results by.
   */
  price_min?: number;
  /**
   * Optionally specify a threshold of maximum USD price to filter results by.
   */
  price_max?: number;
  /**
   * Optionally specify a threshold of minimum market cap to filter results by.
   */
  market_cap_min?: number;
  /**
   * Optionally specify a threshold of maximum market cap to filter results by.
   */
  market_cap_max?: number;
  /**
   * Optionally specify a threshold of minimum 24 hour USD volume to filter results by.
   */
  volume_24h_min?: number;
  /**
   * Optionally specify a threshold of maximum 24 hour USD volume to filter results by.
   */
  volume_24h_max?: number;
  /**
   * Optionally specify a threshold of minimum circulating supply to filter results by.
   */
  circulating_supply_min?: number;
  /**
   * Optionally specify a threshold of maximum circulating supply to filter results by.
   */
  circulating_supply_max?: number;
  /**
   * Optionally specify a threshold of minimum 24 hour percent change to filter results by.
   */
  percent_change_24h_min?: number;
  /**
   * Optionally specify a threshold of maximum 24 hour percent change to filter results by.
   */
  percent_change_24h_max?: number;
  /**
   * Optionally specify a threshold of minimum self reported circulating supply to filter results by.
   */
  self_reported_circulating_supply_min?: number;
  /**
   * Optionally specify a threshold of maximum self reported circulating supply to filter results by.
   */
  self_reported_circulating_supply_max?: number;
  /**
   * Optionally specify a threshold of minimum self reported market cap to filter results by.
   */
  self_reported_market_cap_min?: number;
  /**
   * Optionally specify a threshold of maximum self reported market cap to filter results by.
   */
  self_reported_market_cap_max?: number;
  /**
   * Optionally specify a threshold of minimum unlocked market cap to filter results by.
   */
  unlocked_market_cap_min?: number;
  /**
   * Optionally specify a threshold of maximum unlocked market cap to filter results by.
   */
  unlocked_market_cap_max?: number;
  /**
   * Optionally specify a threshold of minimum unlocked circulating supply to filter results by.
   */
  unlocked_circulating_supply_min?: number;
  /**
   * Optionally specify a threshold of maximum unlocked circulating supply to filter results by.
   */
  unlocked_circulating_supply_max?: number;
  /**
   * Optionally calculate market quotes in up to 120 currencies at once by passing a comma-separated list of cryptocurrency or fiat currency symbols.
   */
  convert?: string | string[];
  /**
   * Optionally calculate market quotes by CoinMarketCap ID instead of symbol.
   */
  convert_id?: string | string[];
  /**
   * What field to sort the list of cryptocurrencies by.
   * @default "market_cap"
   */
  sort?:
    | 'market_cap'
    | 'market_cap_strict'
    | 'name'
    | 'symbol'
    | 'date_added'
    | 'price'
    | 'circulating_supply'
    | 'total_supply'
    | 'max_supply'
    | 'num_market_pairs'
    | 'market_cap_by_total_supply_strict'
    | 'volume_24h'
    | 'volume_7d'
    | 'volume_30d'
    | 'percent_change_1h'
    | 'percent_change_24h'
    | 'percent_change_7d';
  /**
   * The direction in which to order cryptocurrencies against the specified sort.
   */
  sort_dir?: 'asc' | 'desc';
  /**
   * The type of cryptocurrency to include.
   * @default "all"
   */
  cryptocurrency_type?: 'all' | 'coins' | 'tokens';
  /**
   * The tag of cryptocurrency to include.
   * @default "all"
   */
  tag?: 'all' | 'defi' | 'filesharing';
  /**
   * Optionally specify a comma-separated list of supplemental data fields to return.
   */
  aux?: string | string[];
}

/**
 * @description Defines the parameters for fetching the latest cryptocurrency listings.
 */
export interface GetListingsNewParams {
  /**
   * Optionally offset the start (1-based index) of the paginated list of items to return.
   * @default 1
   */
  start?: number;
  /**
   * Optionally specify the number of results to return. Use this parameter and the "start" parameter to determine your own pagination size.
   * @default 100
   */
  limit?: number;
  /**
   * Optionally calculate market quotes in up to 120 currencies at once by passing a comma-separated list of cryptocurrency or fiat currency symbols.
   */
  convert?: string | string[];
  /**
   * Optionally calculate market quotes by CoinMarketCap ID instead of symbol.
   */
  convert_id?: string | string[];
  /**
   * The direction in which to order cryptocurrencies against the specified sort.
   */
  sort_dir?: 'asc' | 'desc';
}

/**
 * @description Defines the parameters for fetching historical cryptocurrency listings.
 */
export interface GetListingsHistoricalParams {
  /**
   * date (Unix or ISO 8601) to reference day of snapshot.
   */
  date: string;
  /**
   * Optionally offset the start (1-based index) of the paginated list of items to return.
   * @default 1
   */
  start?: number;
  /**
   * Optionally specify the number of results to return. Use this parameter and the "start" parameter to determine your own pagination size.
   * @default 100
   */
  limit?: number;
  /**
   * Optionally calculate market quotes in up to 120 currencies at once by passing a comma-separated list of cryptocurrency or fiat currency symbols.
   */
  convert?: string | string[];
  /**
   * Optionally calculate market quotes by CoinMarketCap ID instead of symbol.
   */
  convert_id?: string | string[];
  /**
   * What field to sort the list of cryptocurrencies by.
   * @default "cmc_rank"
   */
  sort?:
    | 'cmc_rank'
    | 'name'
    | 'symbol'
    | 'market_cap'
    | 'price'
    | 'circulating_supply'
    | 'total_supply'
    | 'max_supply'
    | 'num_market_pairs'
    | 'volume_24h'
    | 'percent_change_1h'
    | 'percent_change_24h'
    | 'percent_change_7d';
  /**
   * The direction in which to order cryptocurrencies against the specified sort.
   */
  sort_dir?: 'asc' | 'desc';
  /**
   * The type of cryptocurrency to include.
   * @default "all"
   */
  cryptocurrency_type?: 'all' | 'coins' | 'tokens';
  /**
   * Optionally specify a comma-separated list of supplemental data fields to return.
   */
  aux?: string | string[];
}
