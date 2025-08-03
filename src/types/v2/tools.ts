import type { Status } from '@/types/common';

/**
 * @description Defines the parameters for the Price Conversion v2 tool.
 */
export interface GetPriceConversionParams {
  /**
   * An amount of currency to convert. Example: 10.43
   */
  amount: number;
  /**
   * The CoinMarketCap currency ID of the base cryptocurrency or fiat to convert from. Example: "1"
   */
  id?: string;
  /**
   * Alternatively the currency symbol of the base cryptocurrency or fiat to convert from. Example: "BTC". One "id" or "symbol" is required.
   */
  symbol?: string;
  /**
   * Optional timestamp (Unix or ISO 8601) to reference historical pricing during conversion. If not passed, the current time will be used. If passed, we'll reference the closest historic values available for this conversion.
   */
  time?: string;
  /**
   * Pass up to 120 comma-separated fiat or cryptocurrency symbols to convert the source amount to.
   */
  convert?: string | string[];
  /**
   * Optionally calculate market quotes by CoinMarketCap ID instead of symbol.
   */
  convert_id?: string | string[];
}

/**
 * @description Represents the quote data for a price conversion in a specific currency.
 */
export interface PriceConversionQuote {
  price: number;
  last_updated: string;
}

/**
 * @description Represents the data for the Price Conversion v2 response.
 */
export interface PriceConversionData {
  symbol: string;
  id: string;
  name: string;
  amount: number;
  last_updated: string;
  quote: Record<string, PriceConversionQuote>;
}

/**
 * @description The root interface for the Price Conversion v2 API response.
 */
export interface PriceConversionResponse {
  data: PriceConversionData;
  status: Status;
}
