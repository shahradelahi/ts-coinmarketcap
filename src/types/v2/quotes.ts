import type { Interval, Platform, Status } from '@/types/common';

/**
 * @description Represents a single historical quote for a cryptocurrency.
 */
export interface HistoricalQuote {
  timestamp: string;
  quote: Record<
    string,
    {
      price: number;
      volume_24h: number;
      market_cap: number;
      circulating_supply: number;
      total_supply: number;
      timestamp: string;
    }
  >;
}

/**
 * @description Represents a cryptocurrency with its historical quotes.
 */
export interface HistoricalCryptoCurrency {
  id: number;
  name: string;
  symbol: string;
  is_active: number;
  is_fiat: number;
  quotes: HistoricalQuote[];
}

/**
 * @description Represents a tag associated with a cryptocurrency.
 */
export interface Tag {
  /**
   * The URL-friendly slug for the tag.
   * @example "mineable"
   */
  slug: string;
  /**
   * The name of the tag.
   * @example "Mineable"
   */
  name: string;
  /**
   * The category of the tag.
   * @example "OTHERS"
   */
  category: string;
}

/**
 * @description Represents the quote details for a cryptocurrency in a specific currency.
 */
export interface QuoteDetails {
  /**
   * The price of the cryptocurrency in the specified currency.
   * @example 121855.56495421189
   */
  price: number;
  /**
   * The 24-hour trading volume in the specified currency.
   * @example 111578284899.80972
   */
  volume_24h: number;
  /**
   * The 24-hour reported trading volume in the specified currency.
   * @example 405248038235.7917
   */
  volume_24h_reported: number;
  /**
   * The 7-day trading volume in the specified currency.
   * @example 338105093622.2435
   */
  volume_7d: number;
  /**
   * The 7-day reported trading volume in the specified currency.
   * @example 1069275164426.1049
   */
  volume_7d_reported: number;
  /**
   * The 30-day trading volume in the specified currency.
   * @example 1836839990803.5938
   */
  volume_30d: number;
  /**
   * The 30-day reported trading volume in the specified currency.
   * @example 7512838493519.507
   */
  volume_30d_reported: number;
  /**
   * The percentage change in volume over the last 24 hours.
   * @example 163.1208
   */
  volume_change_24h: number;
  /**
   * The percentage change in price over the last hour.
   * @example 0.22244157
   */
  percent_change_1h: number;
  /**
   * The percentage change in price over the last 24 hours.
   * @example 3.13859893
   */
  percent_change_24h: number;
  /**
   * The percentage change in price over the last 7 days.
   * @example 12.30572086
   */
  percent_change_7d: number;
  /**
   * The percentage change in price over the last 30 days.
   * @example 16.13522707
   */
  percent_change_30d: number;
  /**
   * The percentage change in price over the last 60 days.
   * @example 18.6213504
   */
  percent_change_60d: number;
  /**
   * The percentage change in price over the last 90 days.
   * @example 42.50428859
   */
  percent_change_90d: number;
  /**
   * The market capitalization in the specified currency.
   * @example 2423979046704.6875
   */
  market_cap: number;
  /**
   * The market capitalization dominance percentage.
   * @example 63.8593
   */
  market_cap_dominance: number;
  /**
   * The fully diluted market capitalization in the specified currency.
   * @example 2558966864038.45
   */
  fully_diluted_market_cap: number;
  /**
   * The market capitalization by total supply in the specified currency.
   * @example 2423979046704.6875
   */
  market_cap_by_total_supply: number;
  /**
   * The total value locked (TVL) in the specified currency, if available.
   * @example null
   */
  tvl: number | null;
  /**
   * The timestamp of the last update for this quote.
   * @example "2025-07-14T12:45:00.000Z"
   */
  last_updated: string;
}

/**
 * @description Represents a single cryptocurrency with its latest quote data.
 */
export interface CryptocurrencyQuote {
  /**
   * The unique CoinMarketCap ID for this cryptocurrency.
   * @example 1
   */
  id: number;
  /**
   * The name of this cryptocurrency.
   * @example "Bitcoin"
   */
  name: string;
  /**
   * The ticker symbol for this cryptocurrency.
   * @example "BTC"
   */
  symbol: string;
  /**
   * The URL-friendly slug for this cryptocurrency.
   * @example "bitcoin"
   */
  slug: string;
  /**
   * The number of market pairs available for this cryptocurrency.
   * @example 12254
   */
  num_market_pairs: number;
  /**
   * The timestamp (ISO 8601) of when this cryptocurrency was added.
   * @example "2010-07-13T00:00:00.000Z"
   */
  date_added: string;
  /**
   * An array of tags associated with this cryptocurrency.
   */
  tags: Tag[];
  /**
   * The maximum supply of this cryptocurrency.
   * @example 21000000
   */
  max_supply: number | null;
  /**
   * The number of coins in circulation.
   * @example 19892206
   */
  circulating_supply: number;
  /**
   * The total supply of this cryptocurrency.
   * @example 19892206
   */
  total_supply: number;
  /**
   * Whether the cryptocurrency is currently active.
   * @example 1
   */
  is_active: 1 | 0;
  /**
   * Whether the cryptocurrency has an infinite supply.
   * @example false
   */
  infinite_supply: boolean;
  /**
   * The platform this cryptocurrency runs on, if any.
   * @example null
   */
  platform: Platform | null;
  /**
   * The CoinMarketCap rank of this cryptocurrency.
   * @example 1
   */
  cmc_rank: number;
  /**
   * Whether the cryptocurrency is a fiat currency.
   * @example 0
   */
  is_fiat: 0 | 1;
  /**
   * The self-reported circulating supply, if available.
   * @example null
   */
  self_reported_circulating_supply: number | null;
  /**
   * The self-reported market capitalization, if available.
   * @example null
   */
  self_reported_market_cap: number | null;
  /**
   * The total value locked (TVL) ratio, if available.
   * @example null
   */
  tvl_ratio: number | null;
  /**
   * The timestamp of the last update for this cryptocurrency's data.
   * @example "2025-07-14T12:11:00.000Z"
   */
  last_updated: string;
  /**
   * A record of quotes in different currencies.
   */
  quote: Record<string, QuoteDetails>;
}

/**
 * @description The root interface for the cryptocurrency latest quotes API response.
 */
export interface QuotesLatestResponse {
  data: Record<string, CryptocurrencyQuote>;
  status: Status;
}

/**
 * @description The root interface for the cryptocurrency historical quotes API response.
 */
export interface QuotesHistoricalResponse {
  data: Record<string, HistoricalCryptoCurrency>;
  status: Status;
}

/**
 * @description Defines the parameters for fetching the latest cryptocurrency quotes.
 */
export interface GetQuotesLatestParams {
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
   * Optionally calculate market quotes in up to 120 currencies at once by passing a comma-separated list of cryptocurrency or fiat currency symbols.
   */
  convert?: string | string[];
  /**
   * Optionally calculate market quotes by CoinMarketCap ID instead of symbol.
   */
  convert_id?: string | string[];
  /**
   * Optionally specify a comma-separated list of supplemental data fields to return.
   */
  aux?: string | string[];
  /**
   * Pass true to relax request validation rules.
   * @default true
   */
  skip_invalid?: boolean;
}

/**
 * @description Defines the parameters for fetching historical cryptocurrency quotes.
 */
export interface GetQuotesHistoricalParams {
  /**
   * One or more comma-separated CoinMarketCap cryptocurrency IDs. Example: "1,2"
   */
  id?: string | number | number[];
  /**
   * Alternatively pass one or more comma-separated cryptocurrency symbols. Example: "BTC,ETH".
   * At least one "id" or "symbol" is required for this request.
   */
  symbol?: string | string[];
  /**
   * Timestamp (Unix or ISO 8601) to start returning quotes for. Optional, if not passed, we'll return quotes calculated in reverse from "time_end".
   */
  time_start?: string;
  /**
   * Timestamp (Unix or ISO 8601) to stop returning quotes for (inclusive). Optional, if not passed, we'll default to the current time.
   * If no "time_start" is passed, we return quotes in reverse order starting from this time.
   */
  time_end?: string;
  /**
   * The number of interval periods to return results for. Optional, required if both "time_start" and "time_end" aren't supplied.
   * @default 10
   */
  count?: number;
  /**
   * Interval of time to return data points for.
   * @default "5m"
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
   * Optionally specify a comma-separated list of supplemental data fields to return.
   */
  aux?: string | string[];
  /**
   * Pass true to relax request validation rules.
   * @default true
   */
  skip_invalid?: boolean;
}
