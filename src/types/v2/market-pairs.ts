import type { Status } from '@/types/common';

/**
 * @description Represents a single market pair.
 */
export interface MarketPairV2 {
  exchange: {
    id: number;
    name: string;
    slug: string;
  };
  market_id: string;
  market_url: string;
  category: string;
  fee_type: string;
  outlier: boolean;
  reported_volume_24h_adjusted: number;
  quote: {
    [key: string]: {
      price: number;
      volume_24h: number;
      volume_change_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_60d: number;
      percent_change_90d: number;
      market_cap: number;
      last_updated: string;
    };
  };
  last_updated: string;
}

/**
 * @description Represents a cryptocurrency with its market pairs.
 */
export interface MarketPairCryptoCurrency {
  id: number;
  name: string;
  symbol: string;
  num_market_pairs: number;
  market_pairs: MarketPairV2[];
}

/**
 * @description The root interface for the cryptocurrency latest market pairs API response.
 */
export interface MarketPairsLatestResponse {
  data: Record<string, MarketPairCryptoCurrency>;
  status: Status;
}

/**
 * @description Defines the parameters for fetching the latest cryptocurrency market pairs.
 */
export interface GetMarketPairsLatestParams {
  /**
   * One or more comma-separated cryptocurrency CoinMarketCap IDs. Example: "1,2"
   */
  id?: string | number | number[];
  /**
   * Alternatively pass a comma-separated list of cryptocurrency slugs. Example: "bitcoin,ethereum"
   */
  slug?: string | string[];
  /**
   * Alternatively pass one or more comma-separated cryptocurrency symbols. Example: "BTC,ETH".
   * At least one "id" or "slug" or "symbol" is required for this request.
   */
  symbol?: string | string[];
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
   * By default market quotes are returned in USD. Optionally calculate market quotes in up to 3 other fiat currencies or cryptocurrencies.
   */
  convert?: string | string[];
  /**
   * Optionally calculate market quotes by CoinMarketCap ID instead of symbol.
   */
  convert_id?: string | string[];
  /**
   * Pass true to relax request validation rules.
   * @default true
   */
  skip_invalid?: boolean;
}
