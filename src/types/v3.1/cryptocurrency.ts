import type { Status } from '@/types/common';

/**
 * @description Defines the parameters for fetching historical cryptocurrency data.
 */
export interface GetCryptocurrencyHistoricalParams {
  /**
   * The CoinMarketCap cryptocurrency ID.
   * @example 1
   */
  id: number | string;
  /**
   * Timestamp (Unix) to start returning historical data for.
   * @example 1751896800
   */
  timeStart: number | string;
  /**
   * Interval of time to return data points for.
   * @example "3h"
   */
  interval?: '5m' | '15m' | '30m' | '1h' | '3h' | '6h' | '12h' | '1d';
  /**
   * The CoinMarketCap currency ID to convert market values to.
   * @example 2781
   */
  convertId?: number | string;
}

/**
 * @description Represents the quote data for a specific currency.
 */
export interface HistoricalQuoteData {
  /**
   * The name of the quote currency (as its ID).
   * @example "2781"
   */
  name: string;
  /**
   * The opening price for the interval.
   * @example 108258.0398266509
   */
  open: number;
  /**
   * The highest price during the interval.
   * @example 108645.8652506031
   */
  high: number;
  /**
   * The lowest price during the interval.
   * @example 107817.4035168132
   */
  low: number;
  /**
   * The closing price for the interval.
   * @example 107933.8402734771
   */
  close: number;
  /**
   * The trading volume during the interval.
   * @example 45097713414.89
   */
  volume: number;
  /**
   * The market capitalization at the end of the interval.
   * @example 2146582425002.96
   */
  marketCap: number;
  /**
   * The timestamp of the quote.
   * @example "2025-07-07T17:59:59.999Z"
   */
  timestamp: string;
}

/**
 * @description Represents a single historical data quote for a cryptocurrency.
 */
export interface HistoricalQuote {
  /**
   * The opening timestamp for the interval.
   * @example "2025-07-07T15:00:00.000Z"
   */
  timeOpen: string;
  /**
   * The closing timestamp for the interval.
   * @example "2025-07-07T17:59:59.999Z"
   */
  timeClose: string;
  /**
   * The timestamp of the highest price during the interval.
   * @example "2025-07-07T15:34:00.000Z"
   */
  timeHigh: string;
  /**
   * The timestamp of the lowest price during the interval.
   * @example "2025-07-07T17:07:00.000Z"
   */
  timeLow: string;
  quote: HistoricalQuoteData;
}

/**
 * @description The structure of the 'data' object in the historical cryptocurrency response.
 */
export interface CryptocurrencyHistoricalData {
  /**
   * The unique ID of the cryptocurrency.
   * @example 1
   */
  id: number;
  /**
   * The name of the cryptocurrency.
   * @example "Bitcoin"
   */
  name: string;
  /**
   * The trading symbol of the cryptocurrency.
   * @example "BTC"
   */
  symbol: string;
  /**
   * The end time of the data range as a Unix timestamp.
   * @example "1748185199"
   */
  timeEnd: string;
  /**
   * An array of historical quote objects.
   */
  quotes: HistoricalQuote[];
}

/**
 * @description The root interface for the historical cryptocurrency API response.
 */
export interface CryptocurrencyHistoricalResponse {
  data: CryptocurrencyHistoricalData;
  status: Status;
}
