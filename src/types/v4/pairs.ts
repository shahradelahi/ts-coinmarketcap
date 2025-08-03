/**
 * @description Defines the parameters for fetching historical OHLCV data for DEX pairs.
 */
export interface GetDEXOHLCVHistoricalParams {
  /**
   * One contract address.
   * @example "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640"
   */
  contract_address?: string;
  /**
   * One or more CoinMarketCap cryptocurrency network ids.
   * @example "1"
   */
  network_id?: string;
  /**
   * Alternatively, one network name in URL friendly shorthand "slug" format.
   * @example "ethereum"
   */
  network_slug?: string;
  /**
   * Time period to return OHLCV data for.
   * @default "daily"
   */
  time_period?: 'daily' | 'hourly' | '1m' | '5m' | '15m' | '4h';
  /**
   * Timestamp (Unix or ISO 8601) to start returning OHLCV time periods for.
   * @example "2018-09-19"
   */
  time_start?: string;
  /**
   * Timestamp (Unix or ISO 8601) to stop returning OHLCV time periods for (inclusive).
   * @example "2018-09-20"
   */
  time_end?: string;
  /**
   * Optionally limit the number of time periods to return results for.
   * @default 10
   */
  count?: string;
  /**
   * Optionally adjust the interval that "time_period" is sampled.
   * @default "daily"
   */
  interval?:
    | '1m'
    | '5m'
    | '15m'
    | '30m'
    | '1h'
    | '4h'
    | '8h'
    | '12h'
    | 'daily'
    | 'weekly'
    | 'monthly';
  /**
   * Optionally specify a comma-separated list of supplemental data fields to return.
   */
  aux?: string | string[];
  /**
   * Optionally calculate market quotes by CoinMarketCap ID instead of symbol.
   */
  convert_id?: string;
  /**
   * Pass true to relax request validation rules.
   */
  skip_invalid?: string;
  /**
   * Pass true to invert the order of a spot pair.
   */
  reverse_order?: string;
}

/**
 * @description Defines the parameters for fetching the latest OHLCV data for DEX pairs.
 */
export interface GetDEXOHLCVLatestParams {
  /**
   * One or more comma-separated contract addresses.
   * @example "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640"
   */
  contract_address?: string | string[];
  /**
   * One or more CoinMarketCap cryptocurrency network ids.
   * @example "1"
   */
  network_id?: string | string[];
  /**
   * Alternatively, one network name in URL friendly shorthand "slug" format.
   * @example "ethereum"
   */
  network_slug?: string;
  /**
   * Optionally specify a comma-separated list of supplemental data fields to return.
   */
  aux?: string | string[];
  /**
   * Optionally calculate market quotes by CoinMarketCap ID instead of symbol.
   */
  convert_id?: string;
  /**
   * Pass true to relax request validation rules.
   */
  skip_invalid?: string;
  /**
   * Pass true to invert the order of a spot pair.
   */
  reverse_order?: string;
}

/**
 * @description Defines the parameters for fetching the latest quotes for DEX pairs.
 */
export interface GetDEXQuotesLatestParams {
  /**
   * One or more comma-separated contract addresses.
   * @example "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640"
   */
  contract_address?: string | string[];
  /**
   * One or more CoinMarketCap cryptocurrency network ids.
   * @example "1"
   */
  network_id?: string | string[];
  /**
   * Alternatively, one network name in URL friendly shorthand "slug" format.
   * @example "ethereum"
   */
  network_slug?: string;
  /**
   * Optionally specify a comma-separated list of supplemental data fields to return.
   */
  aux?: string | string[];
  /**
   * Optionally calculate market quotes by CoinMarketCap ID instead of symbol.
   */
  convert_id?: string;
  /**
   * Pass true to relax request validation rules.
   */
  skip_invalid?: string;
  /**
   * Pass true to invert the order of a spot pair.
   */
  reverse_order?: string;
}

/**
 * @description Defines the parameters for fetching the latest trades for a DEX pair.
 */
export interface GetDEXTradesLatestParams {
  /**
   * One or more comma-separated contract addresses.
   * @example "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640"
   */
  contract_address?: string | string[];
  /**
   * One CoinMarketCap cryptocurrency network id.
   * @example "1"
   */
  network_id?: string;
  /**
   * Alternatively, one network name in URL friendly shorthand "slug" format.
   * @example "ethereum"
   */
  network_slug?: string;
  /**
   * Optionally specify a comma-separated list of supplemental data fields to return.
   */
  aux?:
    | ('transaction_hash' | 'blockchain_explorer_link')
    | ('transaction_hash' | 'blockchain_explorer_link')[];
  /**
   * Optionally calculate market quotes by CoinMarketCap ID instead of symbol.
   */
  convert_id?: string;
  /**
   * Pass true to relax request validation rules.
   */
  skip_invalid?: string;
  /**
   * Pass true to invert the order of a spot pair.
   */
  reverse_order?: string;
}

/**
 * @description Represents the security scan details from a third party.
 */
export interface DEXSecurityScanThirdParty {
  airdrop_scam: boolean;
  anti_whale: boolean;
  anti_whale_modifiable: boolean;
  blacklisted: boolean;
  can_take_back_ownership: boolean;
  cannot_buy: boolean;
  cannot_sell_all: boolean;
  external_call: boolean;
  hidden_owner: boolean;
  honeypot: boolean;
  in_dex: boolean;
  mintable: boolean;
  open_source: boolean;
  owner_change_balance: boolean;
  personal_slippage_modifiable: boolean;
  proxy: boolean;
  self_destruct: boolean;
  slippage_modifiable: boolean;
  trading_cool_down: boolean;
  transfer_pausable: boolean;
  true_token: boolean;
  trust_list: boolean;
  whitelisted: boolean;
}

/**
 * @description Represents the aggregated security scan results.
 */
export interface DEXSecurityScanAggregated {
  contract_verified: boolean;
  honeypot: boolean;
}

/**
 * @description Represents the security scan information for a DEX pair.
 */
export interface DEXSecurityScan {
  aggregated: DEXSecurityScanAggregated;
  third_party: DEXSecurityScanThirdParty;
}

/**
 * @description Represents the OHLCV quote for a specific conversion currency.
 */
export interface DEXOHLCVQuoteDetails {
  convert_id: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  last_updated: string;
  '24h_buy_volume': number;
  '24h_sell_volume': number;
}

/**
 * @description Represents a single OHLCV data point with quotes in different currencies.
 */
export interface DEXOHLCVQuote {
  time_open: string;
  time_close: string;
  quote: DEXOHLCVQuoteDetails[];
}

/**
 * @description Represents the latest quote for a specific conversion currency.
 */
export interface DEXQuoteLatestDetails {
  convert_id: string;
  price: number;
  volume_24h: number;
  last_updated: string;
  liquidity: number;
  price_by_quote_asset: number;
  fully_diluted_value: number;
  percent_change_price_1h: number;
  percent_change_price_24h: number;
  '24h_buy_volume': number;
  '24h_sell_volume': number;
}

/**
 * @description Represents the quote for a single trade in a specific currency.
 */
export interface DEXTradeQuote {
  convert_id: string;
  price: number;
  total: number;
  amount_base_asset: number;
  amount_quote_asset: number;
  price_by_quote_asset: number;
}

/**
 * @description Represents a single trade for a DEX pair.
 */
export interface DEXTrade {
  date: string;
  type: 'buy' | 'sell';
  transaction_hash?: string;
  blockchain_explorer_link?: string;
  quote: DEXTradeQuote[];
}

/**
 * @description Represents the base information for a DEX pair.
 */
export interface DEXPairBase {
  contract_address: string;
  name: string;
  base_asset_id: string;
  base_asset_symbol: string;
  base_asset_name: string;
  base_asset_contract_address: string;
  base_asset_ucid: string;
  quote_asset_id: string;
  quote_asset_symbol: string;
  quote_asset_name: string;
  quote_asset_contract_address: string;
  quote_asset_ucid: string;
  network_id: string;
  network_slug: string;
  dex_id: string;
  dex_slug: string;
  last_updated: string;
  created_at: string;
  date_launched: string;
  '24h_no_of_buys'?: number;
  '24h_no_of_sells'?: number;
  '24h_volume_quote_asset'?: number;
  buy_tax?: number;
  holders?: number;
  num_transactions_24h?: number;
  percent_pooled_base_asset?: number;
  pool_base_asset?: number;
  pool_created?: string;
  pool_quote_asset?: number;
  security_scan?: DEXSecurityScan[];
  sell_tax?: number;
  total_supply_base_asset?: number;
  total_supply_quote_asset?: number;
}

/**
 * @description Represents the historical OHLCV data for a DEX pair.
 */
export interface DEXOHLCVHistorical extends DEXPairBase {
  quotes: DEXOHLCVQuote[];
}

/**
 * @description Represents the latest OHLCV data for a DEX pair.
 */
export interface DEXOHLCVLatest extends DEXPairBase {
  quote: DEXOHLCVQuoteDetails[];
  time_close: string | null;
  time_open: string;
}

/**
 * @description Represents the latest quote data for a DEX pair.
 */
export interface DEXQuoteLatest extends DEXPairBase {
  quote: DEXQuoteLatestDetails[];
}

/**
 * @description Represents the latest trades for a DEX pair.
 */
export interface DEXTradesLatest extends DEXPairBase {
  trades: DEXTrade[];
}

/**
 * @description The root interface for the DEX historical OHLCV API response.
 */
export type DEXOHLCVHistoricalResponse = DEXOHLCVHistorical[];

/**
 * @description The root interface for the DEX latest OHLCV API response.
 */
export type DEXOHLCVLatestResponse = DEXOHLCVLatest[];

/**
 * @description The root interface for the DEX latest quotes API response.
 */
export type DEXQuotesLatestResponse = DEXQuoteLatest[];

/**
 * @description The root interface for the DEX latest trades API response.
 */
export type DEXTradesLatestResponse = DEXTradesLatest[];
