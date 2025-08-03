import type { CryptoAsset, Status } from '@/types/common';

/**
 * @description Represents the price performance statistics for a cryptocurrency.
 */
export interface PricePerformanceStats extends CryptoAsset {
  price_performance: {
    [key: string]: {
      price: number;
      percent_change: number;
    };
  };
  last_updated: string;
}

/**
 * @description The root interface for the cryptocurrency price performance stats API response.
 */
export interface PricePerformanceStatsLatestResponse {
  data: Record<string, PricePerformanceStats>;
  status: Status;
}

/**
 * @description Defines the parameters for fetching the latest cryptocurrency price performance stats.
 */
export interface GetPricePerformanceStatsLatestParams {
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
