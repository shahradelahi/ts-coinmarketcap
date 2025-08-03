import type { Interval, Status } from '@/types/common';

/**
 * @description Represents a single OHLCV quote.
 */
export interface OHLCVQuote {
  time_open: string;
  time_close: string;
  quote: {
    [key: string]: {
      open: number;
      high: number;
      low: number;
      close: number;
      volume: number;
      market_cap: number;
      timestamp: string;
    };
  };
}

/**
 * @description Represents a cryptocurrency with its OHLCV data.
 */
export interface OHLCVCryptoCurrency {
  id: number;
  name: string;
  symbol: string;
  quotes: OHLCVQuote[];
}

/**
 * @description The root interface for the cryptocurrency latest OHLCV API response.
 */
export interface OHLCVLatestResponse {
  data: Record<string, OHLCVCryptoCurrency>;
  status: Status;
}

/**
 * @description The root interface for the cryptocurrency historical OHLCV API response.
 */
export interface OHLCVHistoricalResponse {
  data: Record<string, OHLCVCryptoCurrency>;
  status: Status;
}

/**
 * @description Defines the parameters for fetching the latest cryptocurrency OHLCV data.
 */
export interface GetOHLCVLatestParams {
  /**
   * One or more comma-separated cryptocurrency CoinMarketCap IDs. Example: "1,2"
   */
  id?: string | number | number[];
  /**
   * Alternatively pass one or more comma-separated cryptocurrency symbols. Example: "BTC,ETH".
   * At least one "id" or "symbol" is required for this request.
   */
  symbol?: string | string[];
  /**
   * Timestamp (Unix or ISO 8601) to return OHLCV data for.
   */
  time?: string;
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

/**
 * @description Defines the parameters for fetching historical cryptocurrency OHLCV data.
 */
export interface GetOHLCVHistoricalParams {
  /**
   * One or more comma-separated cryptocurrency CoinMarketCap IDs. Example: "1,2"
   */
  id?: string | number | number[];
  /**
   * Alternatively pass one or more comma-separated cryptocurrency symbols. Example: "BTC,ETH".
   * At least one "id" or "symbol" is required for this request.
   */
  symbol?: string | string[];
  /**
   * Timestamp (Unix or ISO 8601) to start returning OHLCV data for.
   */
  time_start?: string;
  /**
   * Timestamp (Unix or ISO 8601) to stop returning OHLCV data for (inclusive).
   */
  time_end?: string;
  /**
   * The number of interval periods to return results for.
   * @default 10
   */
  count?: number;
  /**
   * Interval of time to return data points for.
   * @default "daily"
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
   * Pass true to relax request validation rules.
   * @default true
   */
  skip_invalid?: boolean;
  /**
   * Optionally specify a comma-separated list of supplemental data fields to return.
   */
  aux?: string | string[];
}
