import type { Options } from 'ky';

import type { CryptoAsset, Status } from './common';

/**
 * @description Configuration options for the CoinMarketCap client.
 */
export interface CoinMarketCapOptions {
  /**
   * Your API key.
   */
  apiKey?: string;
  /**
   * If true, uses the Pro API sandbox URL.
   * @default false
   */
  sandbox?: boolean;
  /**
   * Custom `ky` options to merge with the client's defaults.
   */
  kyOptions?: Options;
}

/**
 * @description Defines the parameters for fetching the news TL;DR list.
 */
export interface GetNewsTldrListParams {
  /** The URL slug of the cryptocurrency (e.g., "bitcoin", "chainlink"). */
  slug: string;
  /** The language code for the news. Defaults to 'en'. */
  languageCode?: string;
}

/**
 * @description Represents a single news item from the TL;DR list.
 */
export interface NewsTldrItem {
  id: string;
  title: string;
  content: string;
  sourceName: string;
  sourceUrl: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * @description The structure of the 'data' object in the news TL;DR response.
 */
export interface NewsTldrData {
  data: NewsTldrItem[];
  total: number;
}

/**
 * @description The root interface for the news TL;DR API response.
 */
export interface NewsTldrResponse {
  data: NewsTldrData;
  status: Status;
}

/**
 * @description Represents the information for a single audit.
 */
export interface AuditInfo {
  coinId: string;
  /**
   * @example "CertiK"
   */
  auditor: string;
  /**
   * @example 2
   */
  auditStatus: number;
  /**
   * The timestamp of the audit.
   * @example "2019-04-01T00:00:00.000Z"
   */
  auditTime?: string; // Optional as not present in all audit entries
  /**
   * @example "https://cmc.certik-skynet.com/redirect?project=tether"
   */
  reportUrl: string;
}

/**
 * @description Represents the market quote for a cryptocurrency in a specific currency (e.g., USD, USDT).
 */
export interface Quote {
  /**
   * The name of the currency for this quote.
   * @example "USD"
   */
  name: string;
  /**
   * The current price in the quote currency.
   * @example 106380.5449302134
   */
  price: number;
  /**
   * The trading volume in the last 24 hours.
   * @example 44512228359.413925
   */
  volume24h: number;
  /**
   * The trading volume in the last 7 days.
   * @example 338599015742.72375
   */
  volume7d: number;
  /**
   * The trading volume in the last 30 days.
   * @example 1362349112324.4238
   */
  volume30d: number;
  /**
   * The market capitalization.
   * @example 2115511069043.3606
   */
  marketCap: number;
  /**
   * The self-reported market capitalization.
   * @example 0
   */
  selfReportedMarketCap: number | null;
  /**
   * The percentage change in price over the last hour.
   * @example 0.17419056
   */
  percentChange1h: number;
  /**
   * The percentage change in price over the last 24 hours.
   * @example -0.55454818
   */
  percentChange24h: number;
  /**
   * The percentage change in price over the last 7 days.
   * @example 0.15861408
   */
  percentChange7d: number;
  /**
   * The percentage change in price over the last 30 days.
   * @example 1.53532285
   */
  percentChange30d: number;
  /**
   * The percentage change in price over the last 60 days.
   * @example 10.19849896
   */
  percentChange60d: number;
  /**
   * The percentage change in price over the last 90 days.
   * @example 27.26416059
   */
  percentChange90d: number;
  /**
   * The percentage change in price since the beginning of the year.
   * @example 12.6677
   */
  ytdPriceChangePercentage: number;
  /**
   * The percentage change in price over the last year.
   * @example 68.82363002
   */
  percentChange1y: number;
  /**
   * The fully diluted market cap.
   * @example 2233991443534.48
   */
  fullyDilluttedMarketCap: number;
  /**
   * Market cap calculated by total supply.
   * @example 2115511069043.3606
   */
  marketCapByTotalSupply: number;
  /**
   * The market dominance percentage.
   * @example 64.6622
   */
  dominance: number;
  /**
   * The turnover rate.
   * @example 0.02104089
   */
  turnover: number;
  /**
   * The last time the data was updated.
   * @example "2025-07-02T04:56:00.000Z"
   */
  lastUpdated: string;
}

/**
 * @description Represents a single cryptocurrency asset.
 */
export interface CryptoCurrency extends CryptoAsset {
  /**
   * The CoinMarketCap rank.
   * @example 1
   */
  cmcRank: number;
  /**
   * The number of market pairs available.
   * @example 12231
   */
  marketPairCount: number;
  /**
   * The number of coins in circulation.
   * @example 19886259
   */
  circulatingSupply: number;
  /**
   * The self-reported number of coins in circulation.
   * @example 0
   */
  selfReportedCirculatingSupply: number | null;
  /**
   * The total number of coins that will ever be created.
   * @example 19886259
   */
  totalSupply: number;
  /**
   * The maximum number of coins that can exist.
   * @example 21000000
   */
  maxSupply: number | null;
  /**
   * The all-time high price.
   * @example 111970.16811007993
   */
  ath: number;
  /**
   * The all-time low price.
   * @example 0.04864654
   */
  atl: number;
  /**
   * The highest price in the last 24 hours.
   * @example 107206.34908409294
   */
  high24h: number;
  /**
   * The lowest price in the last 24 hours.
   * @example 105157.39559598996
   */
  low24h: number;
  /**
   * Whether the asset is active (1 for true).
   * @example 1
   */
  isActive: number;
  /**
   * When the asset was first added.
   * @example "2010-07-13T00:00:00.000Z"
   */
  dateAdded: string;
  /**
   * An array of market quotes in different currencies.
   */
  quotes: Quote[];
  /**
   * Indicates if the asset has been audited.
   * @example false
   */
  isAudited: boolean;
  /**
   * A list of audit details.
   */
  auditInfoList: AuditInfo[];
  /**
   * @example [ 1 ]
   */
  badges: number[];
  /**
   * The last time the data was updated.
   * @example "2025-07-02T04:56:00.000Z"
   */
  lastUpdated: string;
}

/**
 * @description The structure of the 'data' object in the API response.
 */
export interface CoinMarketCapData {
  cryptoCurrencyList: CryptoCurrency[];
  /**
   * The total number of available cryptocurrencies.
   * @example "9493"
   */
  totalCount: string;
}

/**
 * @description The root interface for the entire CoinMarketCap API response.
 */
export interface GetCryptocurrencyListingResponse {
  data: CoinMarketCapData;
  status: Status;
}

export interface RequestOptions extends Options {
  responseType?: 'json' | 'text';
}
