import type { Status } from '@/types/common';

/**
 * @description Defines the parameters for fetching chart data for a cryptocurrency.
 */
export interface GetDetailChartParams {
  /**
   * @description The CoinMarketCap cryptocurrency ID.
   * @example 1
   * */
  id: number | string;
  /**
   * @description The time range for the chart data.
   * @example '1D'
   */
  range?: '1D' | '7D' | '1M' | '3M' | '1Y' | 'ALL';
  /**
   * @description The interval for chart data points. Not required for 'ALL' range.
   * @example '5m'
   */
  interval?: '5m' | '15m' | '30m' | '1h' | '3h' | '6h' | '12h' | '1d';
  /**
   * @description Timestamp (Unix) to start returning historical data for.
   * @example 1744200000
   */
  timeStart?: number | string;
  /**
   * @description Timestamp (Unix) to stop returning historical data for.
   * @example 1748901600
   */
  timeEnd?: number | string;
}

/**
 * @description Represents an annotation on the chart.
 */
export interface Annotation {
  /**
   * @description The unique ID of the annotation.
   * @example 1701
   */
  id: number;
  /**
   * @description The title of the annotation.
   * @example "James Wynn fully closes $1.2B BTC position on Hyperliquid."
   */
  title: string;
  /**
   * @description The description of the annotation.
   * @example ""
   */
  description: string;
  /**
   * @description The timestamp of the event.
   * @example "1748086260000"
   */
  eventTime: string;
  /**
   * @description The UTC timestamp of the event.
   * @example "2025-05-24T11:31:00.000Z"
   */
  eventUTCTime: string;
  /**
   * @description The priority of the annotation.
   * @example 5
   */
  priority: number;
  /**
   * @description The URL for more information.
   * @example "https://x.com/AggrNews/status/1926420884668940717"
   */
  readMoreUrl: string;
  /**
   * @description The type of the annotation.
   * @example "News"
   */
  type: string;
  /**
   * @description The type name of the annotation.
   * @example "Breaking News"
   */
  typeName: string;
}

/**
 * @description Represents a single data point in the chart.
 */
export interface ChartPoint {
  /** The timestamp of the data point (stringified unix). */
  s: string;
  /**
   * An array containing financial data for the point.
   * [price, volume, marketCap]
   */
  v: [number, number, number];
  /** Contains annotations if any for this point. */
  c: Record<string, unknown>;
  /** Annotations may be attached to a specific point. */
  annotations?: Annotation[];
}

/**
 * @description The structure of the 'data' object in the chart response.
 */
export interface DetailChartData {
  points: ChartPoint[];
  timeEnd?: string;
  chartCacheTime?: string;
}

/**
 * @description The root interface for the chart API response.
 */
export interface DetailChartResponse {
  data: DetailChartData;
  status: Status;
}
