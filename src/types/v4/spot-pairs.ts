import type { DEXPairBase } from './pairs';

/**
 * @description Defines the parameters for fetching the latest DEX spot pairs.
 */
export interface GetDEXSpotPairsLatestParams {
  network_id?: string | string[];
  network_slug?: string | string[];
  dex_id?: string | string[];
  dex_slug?: string | string[];
  base_asset_id?: string | string[];
  base_asset_symbol?: string | string[];
  base_asset_contract_address?: string;
  base_asset_ucid?: string | string[];
  quote_asset_id?: string | string[];
  quote_asset_symbol?: string | string[];
  quote_asset_contract_address?: string;
  quote_asset_ucid?: string | string[];
  scroll_id?: string;
  limit?: string;
  liquidity_min?: string;
  liquidity_max?: string;
  volume_24h_min?: string;
  volume_24h_max?: string;
  no_of_transactions_24h_min?: string;
  no_of_transactions_24h_max?: string;
  percent_change_24h_min?: string;
  percent_change_24h_max?: string;
  sort?: 'volume_24h' | 'liquidity' | 'no_of_transactions_24h' | 'percent_change_24h';
  sort_dir?: 'asc' | 'desc';
  aux?: string | string[];
  reverse_order?: string;
  convert_id?: string;
}

/**
 * @description Represents the quote for a DEX spot pair in a specific currency.
 */
export interface DEXSpotPairQuote {
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
 * @description Represents a single active DEX spot pair with its latest market data.
 */
export interface DEXSpotPairLatest extends DEXPairBase {
  /**
   * A map of market quotes in different currency conversions.
   */
  quote: DEXSpotPairQuote[];
  /**
   * A unique identifier used to fetch the next batch of results.
   */
  scroll_id?: string;
}

/**
 * @description The root interface for the DEX spot pairs latest API response.
 */
export type DEXSpotPairsLatestResponse = DEXSpotPairLatest[];
