import type { Interval, Status } from '@/types/common';

/**
 * @description Defines the parameters for fetching exchange assets.
 */
export interface GetExchangeAssetsParams {
  /**
   * A CoinMarketCap exchange ID.
   * @example "270"
   */
  id: string;
}

/**
 * @description Represents the platform information for an asset.
 */
export interface AssetPlatform {
  /**
   * The CoinMarketCap ID of the blockchain platform.
   * @example 1027
   */
  crypto_id: number;
  /**
   * The symbol of the blockchain platform.
   * @example "ETH"
   */
  symbol: string;
  /**
   * The name of the blockchain platform.
   * @example "Ethereum"
   */
  name: string;
}

/**
 * @description Represents the currency information for an asset.
 */
export interface AssetCurrency {
  /**
   * The CoinMarketCap ID of the currency.
   * @example 5117
   */
  crypto_id: number;
  /**
   * The price of the currency in USD.
   * @example 0.10241799413549
   */
  price_usd: number;
  /**
   * The symbol of the currency.
   * @example "OGN"
   */
  symbol: string;
  /**
   * The name of the currency.
   * @example "Origin Protocol"
   */
  name: string;
}

/**
 * @description Represents a single asset holding for an exchange.
 */
export interface ExchangeAsset {
  /**
   * The wallet address holding the asset.
   * @example "0x5a52e96bacdabb82fd05763e25335261b270efcb"
   */
  wallet_address: string;
  /**
   * The balance of the asset in the wallet.
   * @example 45000000
   */
  balance: number;
  /**
   * The platform the asset is on.
   */
  platform: AssetPlatform;
  /**
   * The currency details of the asset.
   */
  currency: AssetCurrency;
}

/**
 * @description The root interface for the exchange assets API response.
 */
export interface ExchangeAssetsResponse {
  data: ExchangeAsset[];
  status: Status;
}

/**
 * @description Defines the parameters for fetching exchange info.
 */
export interface GetExchangeInfoParams {
  /**
   * One or more comma-separated CoinMarketCap cryptocurrency exchange ids. Example: "1,2"
   */
  id?: string | number | number[];
  /**
   * Alternatively, one or more comma-separated exchange names in URL friendly shorthand "slug" format (all lowercase, spaces replaced with hyphens). Example: "binance,gdax". At least one "id" or "slug" is required.
   */
  slug?: string | string[];
  /**
   * Optionally specify a comma-separated list of supplemental data fields to return. Pass urls,logo,description,date_launched,notice,status to include all auxiliary fields.
   */
  aux?:
    | ('urls' | 'logo' | 'description' | 'date_launched' | 'notice' | 'status')
    | ('urls' | 'logo' | 'description' | 'date_launched' | 'notice' | 'status')[];
}

/**
 * @description An object containing various resource URLs for this exchange.
 */
export interface ExchangeUrls {
  website: string[];
  twitter: string[];
  blog: string[];
  chat: string[];
  fee: string[];
}

/**
 * @description Represents static metadata for an exchange.
 */
export interface ExchangeDetailedInfo {
  id: number;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  date_launched?: string;
  notice?: string;
  countries?: string[];
  fiats?: string[];
  tags?: string[] | null;
  type?: string;
  maker_fee?: number;
  taker_fee?: number;
  weekly_visits?: number;
  spot_volume_usd?: number;
  spot_volume_last_updated?: string;
  urls?: ExchangeUrls;
}

/**
 * @description The root interface for the exchange info API response.
 */
export interface ExchangeInfoResponse {
  data: Record<string, ExchangeDetailedInfo>;
  status: Status;
}

/**
 * @description Defines the parameters for fetching the CoinMarketCap ID map for exchanges.
 */
export interface GetExchangeMapParams {
  /**
   * Only active exchanges are returned by default. Pass inactive to get a list of exchanges that are no longer active. Pass untracked to get a list of exchanges that are registered but do not currently meet methodology requirements to have active markets tracked. You may pass one or more comma-separated values.
   * @default "active"
   */
  listing_status?: 'active' | 'inactive' | 'untracked' | string | string[];
  /**
   * Optionally pass a comma-separated list of exchange slugs (lowercase URL friendly shorthand name with spaces replaced with dashes) to return CoinMarketCap IDs for. If this option is passed, other options will be ignored.
   */
  slug?: string | string[];
  /**
   * Optionally offset the start (1-based index) of the paginated list of items to return.
   * @default 1
   */
  start?: number;
  /**
   * Optionally specify the number of results to return. Use this parameter and the "start" parameter to determine your own pagination size.
   */
  limit?: number;
  /**
   * What field to sort the list of exchanges by.
   * @default "id"
   */
  sort?: 'volume_24h' | 'id';
  /**
   * Optionally specify a comma-separated list of supplemental data fields to return. Pass first_historical_data,last_historical_data,is_active,status to include all auxiliary fields.
   */
  aux?:
    | ('first_historical_data' | 'last_historical_data' | 'is_active' | 'status')
    | ('first_historical_data' | 'last_historical_data' | 'is_active' | 'status')[];
  /**
   * Optionally include one fiat or cryptocurrency IDs to filter market pairs by. For example ?crypto_id=1 would only return exchanges that have BTC.
   */
  crypto_id?: string;
}

/**
 * @description Represents a single exchange mapping.
 */
export interface ExchangeMap {
  id: number;
  name: string;
  slug: string;
  is_active: 1 | 0;
  status: string;
  first_historical_data?: string;
  last_historical_data?: string;
}

/**
 * @description The root interface for the CoinMarketCap ID Map API response for exchanges.
 */
export interface ExchangeMapResponse {
  data: ExchangeMap[];
  status: Status;
}

/**
 * @description Defines the parameters for fetching the latest exchange listings.
 */
export interface GetExchangeListingsLatestParams {
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
   * What field to sort the list of exchanges by.
   * @default "volume_24h"
   */
  sort?: 'name' | 'volume_24h' | 'volume_24h_adjusted' | 'exchange_score';
  /**
   * The direction in which to order exchanges against the specified sort.
   */
  sort_dir?: 'asc' | 'desc';
  /**
   * The type of exchange markets to include in rankings. This field is deprecated. Please use "all" for accurate sorting.
   * @default "all"
   */
  market_type?: 'all' | 'fees' | 'no_fees';
  /**
   * The category for this exchange.
   * @default "all"
   */
  category?: 'all' | 'spot' | 'derivatives' | 'dex' | 'lending';
  /**
   * Optionally specify a comma-separated list of supplemental data fields to return. Pass num_market_pairs,traffic_score,rank,exchange_score,effective_liquidity_24h,date_launched,fiats to include all auxiliary fields.
   */
  aux?: string | string[];
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
 * @description Represents a market quote for an exchange in a specific currency.
 */
export interface ExchangeQuote {
  volume_24h: number;
  volume_24h_adjusted: number;
  volume_7d: number;
  volume_30d: number;
  percent_change_volume_24h: number;
  percent_change_volume_7d: number;
  percent_change_volume_30d: number;
  effective_liquidity_24h: number;
  derivative_volume_usd: number;
  spot_volume_usd: number;
}

/**
 * @description Represents a single exchange listing with its latest market data.
 */
export interface ExchangeListingLatest {
  id: number;
  name: string;
  slug: string;
  num_market_pairs: number;
  fiats: string[];
  traffic_score: number;
  rank: number;
  exchange_score: number | null;
  liquidity_score: number;
  last_updated: string;
  quote: Record<string, ExchangeQuote>;
}

/**
 * @description The root interface for the exchange listings latest API response.
 */
export interface ExchangeListingsLatestResponse {
  data: ExchangeListingLatest[];
  status: Status;
}

/**
 * @description Defines the parameters for fetching the latest market pairs for an exchange.
 */
export interface GetExchangeMarketPairsLatestParams {
  /**
   * A CoinMarketCap exchange ID. Example: "1"
   */
  id?: string;
  /**
   * Alternatively pass an exchange "slug" (URL friendly all lowercase shorthand version of name with spaces replaced with hyphens). Example: "binance". One "id" or "slug" is required.
   */
  slug?: string;
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
   * Optionally specify a comma-separated list of supplemental data fields to return. Pass num_market_pairs,category,fee_type,market_url,currency_name,currency_slug,price_quote,effective_liquidity,market_score,market_reputation to include all auxiliary fields.
   */
  aux?: string | string[];
  /**
   * Optionally include one or more comma-delimited fiat or cryptocurrency IDs to filter market pairs by. For example ?matched_id=2781 would only return BTC markets that matched: "BTC/USD" or "USD/BTC" for the requested exchange. This parameter cannot be used when matched_symbol is used.
   */
  matched_id?: string | string[];
  /**
   * Optionally include one or more comma-delimited fiat or cryptocurrency symbols to filter market pairs by. For example ?matched_symbol=USD would only return BTC markets that matched: "BTC/USD" or "USD/BTC" for the requested exchange. This parameter cannot be used when matched_id is used.
   */
  matched_symbol?: string | string[];
  /**
   * The category of trading this market falls under. Spot markets are the most common but options include derivatives and OTC.
   * @default "all"
   */
  category?: 'all' | 'spot' | 'derivatives' | 'otc' | 'futures' | 'perpetual';
  /**
   * The fee type the exchange enforces for this market.
   * @default "all"
   */
  fee_type?: 'all' | 'percentage' | 'no-fees' | 'transactional-mining' | 'unknown';
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
 * @description Represents the base or quote currency information for a market pair.
 */
export interface MarketPairCurrency {
  currency_id: number;
  currency_symbol: string;
  exchange_symbol: string;
  currency_type: string;
}

/**
 * @description Represents the exchange reported quote for a market pair.
 */
export interface ExchangeReportedQuote {
  price: number;
  volume_24h_base: number;
  volume_24h_quote: number;
  volume_percentage: number;
  last_updated: string;
}

/**
 * @description Represents a market quote for a market pair in a specific currency.
 */
export interface ExchangeMarketPairQuote {
  price: number;
  volume_24h: number;
  depth_negative_two: number;
  depth_positive_two: number;
  last_updated: string;
}

/**
 * @description Represents a single market pair for an exchange.
 */
export interface ExchangeMarketPair {
  market_id: number;
  market_pair: string;
  category: string;
  fee_type: string;
  outlier_detected: number;
  exclusions: string | null;
  market_pair_base: MarketPairCurrency;
  market_pair_quote: MarketPairCurrency;
  quote: {
    exchange_reported: ExchangeReportedQuote;
    [key: string]: ExchangeMarketPairQuote | ExchangeReportedQuote;
  };
}

/**
 * @description Represents the data for the latest market pairs response.
 */
export interface ExchangeMarketPairsLatestData {
  id: number;
  name: string;
  slug: string;
  num_market_pairs: number;
  volume_24h: number;
  market_pairs: ExchangeMarketPair[];
}

/**
 * @description The root interface for the exchange market pairs latest API response.
 */
export interface ExchangeMarketPairsLatestResponse {
  data: ExchangeMarketPairsLatestData;
  status: Status;
}

/**
 * @description Defines the parameters for fetching historical quotes for exchanges.
 */
export interface GetExchangeQuotesHistoricalParams {
  /**
   * One or more comma-separated exchange CoinMarketCap ids. Example: "24,270"
   */
  id?: string | number | number[];
  /**
   * Alternatively, one or more comma-separated exchange names in URL friendly shorthand "slug" format (all lowercase, spaces replaced with hyphens). Example: "binance,kraken". At least one "id" or "slug" is required.
   */
  slug?: string | string[];
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
}

/**
 * @description Represents a single historical quote for an exchange.
 */
export interface ExchangeHistoricalQuote {
  timestamp: string;
  quote: Record<
    string,
    {
      volume_24h: number;
      timestamp: string;
    }
  >;
  num_market_pairs: number;
}

/**
 * @description Represents an exchange with its historical quotes.
 */
export interface ExchangeHistoricalData {
  id: number;
  name: string;
  slug: string;
  quotes: ExchangeHistoricalQuote[];
}

/**
 * @description The root interface for the exchange quotes historical API response.
 */
export interface ExchangeQuotesHistoricalResponse {
  data: Record<string, ExchangeHistoricalData>;
  status: Status;
}

/**
 * @description Defines the parameters for fetching the latest quotes for exchanges.
 */
export interface GetExchangeQuotesLatestParams {
  /**
   * One or more comma-separated CoinMarketCap exchange IDs. Example: "1,2"
   */
  id?: string | number | number[];
  /**
   * Alternatively, pass a comma-separated list of exchange "slugs" (URL friendly all lowercase shorthand version of name with spaces replaced with hyphens). Example: "binance,gdax". At least one "id" or "slug" is required.
   */
  slug?: string | string[];
  /**
   * Optionally calculate market quotes in up to 120 currencies at once by passing a comma-separated list of cryptocurrency or fiat currency symbols.
   */
  convert?: string | string[];
  /**
   * Optionally calculate market quotes by CoinMarketCap ID instead of symbol.
   */
  convert_id?: string | string[];
  /**
   * Optionally specify a comma-separated list of supplemental data fields to return. Pass num_market_pairs,traffic_score,rank,exchange_score,liquidity_score,effective_liquidity_24h to include all auxiliary fields.
   */
  aux?: string | string[];
}

/**
 * @description Represents the latest quote data for an exchange.
 */
export interface ExchangeQuoteLatest {
  volume_24h: number;
  volume_24h_adjusted: number;
  volume_7d: number;
  volume_30d: number;
  percent_change_volume_24h: number;
  percent_change_volume_7d: number;
  percent_change_volume_30d: number;
  effective_liquidity_24h: number;
}

/**
 * @description Represents a single exchange with its latest quotes.
 */
export interface ExchangeLatestData {
  id: number;
  name: string;
  slug: string;
  num_coins: number;
  num_market_pairs: number;
  last_updated: string;
  traffic_score: number;
  rank: number;
  exchange_score: number | null;
  liquidity_score: number;
  quote: Record<string, ExchangeQuoteLatest>;
}

/**
 * @description The root interface for the exchange quotes latest API response.
 */
export interface ExchangeQuotesLatestResponse {
  data: Record<string, ExchangeLatestData>;
  status: Status;
}
