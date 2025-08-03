import type { Interval, Status } from '@/types/common';

/**
 * @description Defines the parameters for fetching historical global cryptocurrency market metrics.
 */
export interface GetGlobalMetricsQuotesHistoricalParams {
  /**
   * Timestamp (Unix or ISO 8601) to start returning quotes for. Optional, if not passed, we'll return quotes calculated in reverse from "time_end".
   */
  time_start?: string;
  /**
   * Timestamp (Unix or ISO 8601) to stop returning quotes for (inclusive). Optional, if not passed, we'll default to the current time. If no "time_start" is passed, we return quotes in reverse order starting from this time.
   */
  time_end?: string;
  /**
   * The number of interval periods to return results for. Optional, required if both "time_start" and "time_end" aren't supplied. The default is 10 items. The current query limit is 10000.
   * @default 10
   */
  count?: number;
  /**
   * Interval of time to return data points for.
   * @default "1d"
   */
  interval?: Interval;
  /**
   * By default market quotes are returned in USD. Optionally calculate market quotes in up to 3 other fiat currencies or cryptocurrencies.
   */
  convert?: string | string[];
  /**
   * Optionally calculate market quotes by CoinMarketCap ID instead of symbol.
   */
  convert_id?: string | string[];
  /**
   * Optionally specify a comma-separated list of supplemental data fields to return. Pass btc_dominance,eth_dominance,active_cryptocurrencies,active_exchanges,active_market_pairs,total_volume_24h,total_volume_24h_reported,altcoin_market_cap,altcoin_volume_24h,altcoin_volume_24h_reported,search_interval to include all auxiliary fields.
   */
  aux?: string | string[];
}

/**
 * @description Represents the quote data for global metrics in a specific currency.
 */
export interface GlobalMetricsQuote {
  total_market_cap: number;
  total_volume_24h: number;
  total_volume_24h_reported: number;
  altcoin_market_cap: number;
  altcoin_volume_24h: number;
  altcoin_volume_24h_reported: number;
  timestamp: string;
}

/**
 * @description Represents a single historical global metric data point.
 */
export interface GlobalMetricsHistoricalDataPoint {
  timestamp: string;
  btc_dominance: number;
  eth_dominance?: number;
  active_cryptocurrencies: number;
  active_exchanges: number;
  active_market_pairs: number;
  quote: Record<string, GlobalMetricsQuote>;
}

/**
 * @description The root interface for the global metrics quotes historical API response.
 */
export interface GlobalMetricsQuotesHistoricalResponse {
  data: {
    quotes: GlobalMetricsHistoricalDataPoint[];
  };
  status: Status;
}

/**
 * @description Defines the parameters for fetching the latest global cryptocurrency market metrics.
 */
export interface GetGlobalMetricsQuotesLatestParams {
  /**
   * Optionally calculate market quotes in up to 120 currencies at once by passing a comma-separated list of cryptocurrency or fiat currency symbols.
   */
  convert?: string | string[];
  /**
   * Optionally calculate market quotes by CoinMarketCap ID instead of symbol.
   */
  convert_id?: string | string[];
}

/**
 * @description Represents the quote data for latest global metrics in a specific currency.
 */
export interface GlobalMetricsLatestQuote {
  total_market_cap: number;
  total_volume_24h: number;
  total_volume_24h_reported: number;
  altcoin_volume_24h: number;
  altcoin_volume_24h_reported: number;
  altcoin_market_cap: number;
  defi_volume_24h: number;
  defi_volume_24h_reported: number;
  defi_24h_percentage_change: number;
  defi_market_cap: number;
  stablecoin_volume_24h: number;
  stablecoin_volume_24h_reported: number;
  stablecoin_24h_percentage_change: number;
  stablecoin_market_cap: number;
  derivatives_volume_24h: number;
  derivatives_volume_24h_reported: number;
  derivatives_24h_percentage_change: number;
  last_updated: string;
  total_market_cap_yesterday: number;
  total_volume_24h_yesterday: number;
  total_market_cap_yesterday_percentage_change: number;
  total_volume_24h_yesterday_percentage_change: number;
}

/**
 * @description Represents the latest global cryptocurrency market metrics.
 */
export interface GlobalMetricsLatestData {
  btc_dominance: number;
  eth_dominance: number;
  active_cryptocurrencies: number;
  total_cryptocurrencies: number;
  active_market_pairs: number;
  active_exchanges: number;
  total_exchanges: number;
  last_updated: string;
  quote: Record<string, GlobalMetricsLatestQuote>;
  eth_dominance_yesterday?: number;
  btc_dominance_yesterday?: number;
  eth_dominance_24h_percentage_change?: number;
  btc_dominance_24h_percentage_change?: number;
  defi_volume_24h?: number;
  defi_volume_24h_reported?: number;
  defi_market_cap?: number;
  defi_24h_percentage_change?: number;
  stablecoin_volume_24h?: number;
  stablecoin_volume_24h_reported?: number;
  stablecoin_market_cap?: number;
  stablecoin_24h_percentage_change?: number;
  derivatives_volume_24h?: number;
  derivatives_volume_24h_reported?: number;
  derivatives_24h_percentage_change?: number;
}

/**
 * @description The root interface for the global metrics quotes latest API response.
 */
export interface GlobalMetricsQuotesLatestResponse {
  data: GlobalMetricsLatestData;
  status: Status;
}
