import type { Status } from '@/types/common';

/**
 * @description Defines the parameters for fetching historical CoinMarketCap 100 Index values.
 */
export interface GetCmc100HistoricalParams {
  /**
   * Timestamp (Unix or ISO 8601) to start returning CoinMarketCap 100 Index data for. Optional, if not passed, we'll return quotes calculated in reverse from "time_end".
   */
  time_start?: string;
  /**
   * Timestamp (Unix or ISO 8601) to stop returning CoinMarketCap 100 Index data for (inclusive). Optional, if not passed, we'll default to the current time. If no "time_start" is passed, we return quotes in reverse order starting from this time.
   */
  time_end?: string;
  /**
   * The number of interval periods to return results for. Optional, required if both "time_start" and "time_end" aren't supplied. The default is 5 items. If "time_start" and "time_end" are supplied, the query limit is 10 and the count starts from "time_start".
   * @default 5
   */
  count?: string;
  /**
   * Optionally adjust the interval of data returned.Valid values:"5m","15m","daily".
   */
  interval?: '5m' | '15m' | 'daily';
}

/**
 * @description Represents a constituent of the CoinMarketCap 100 Index.
 */
export interface Cmc100Constituent {
  id: number;
  name: string;
  symbol: string;
  url: string;
  weight: number;
}

/**
 * @description Represents a single historical data point for the CoinMarketCap 100 Index.
 */
export interface Cmc100HistoricalData {
  constituents: Cmc100Constituent[];
  update_time: string;
  value: number;
}

/**
 * @description The root interface for the CoinMarketCap 100 Index historical API response.
 */
export interface Cmc100HistoricalResponse {
  data: Cmc100HistoricalData[];
  status: Status;
}

/**
 * @description Represents the latest CoinMarketCap 100 Index value.
 */
export interface Cmc100LatestData {
  constituents: Cmc100Constituent[];
  last_update: string;
  next_update: string;
  value: number;
  value_24h_percentage_change: number;
}

/**
 * @description The root interface for the CoinMarketCap 100 Index latest API response.
 */
export interface Cmc100LatestResponse {
  data: Cmc100LatestData;
  status: Status;
}
