import type { Status } from '@/types/common';

export interface GetExchangeMarketPairsLatestParams {
  /**
   * A CoinMarketCap exchange ID. Example: "1"
   */
  id?: string;
  /**
   * Alternatively pass an exchange "slug" (URL friendly all lowercase shorthand version of name with spaces replaced with hyphens). Example: "binance". One "id" or "slug" is required.
   */
  slug?: string;
  category?: 'spot' | 'derivatives' | 'otc';
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
   * The currency ID to quote prices in.
   * @example 825
   */
  quoteCurrencyId?: number;
}

export interface ExchangeMarketPairQuote {
  id: string;
  price: number;
  volume24h: number;
  depthPositiveTwo: number;
  depthNegativeTwo: number;
}

export interface ExchangeMarketPair {
  rank: number;
  exchangeId: number;
  exchangeName: string;
  exchangeSlug: string;
  outlierDetected: number;
  priceExcluded: number;
  volumeExcluded: number;
  outlierDisp: number;
  priceExDisp: number;
  volExDisp: number;
  marketId: number;
  marketPair: string;
  category: string;
  marketUrl: string;
  marketScore: string;
  marketReputation: number;
  baseSymbol: string;
  baseCurrencyId: number;
  baseCurrencyName: string;
  baseCurrencySlug: string;
  quoteSymbol: string;
  quoteCurrencyId: number;
  price: number;
  volumeUsd: number;
  effectiveLiquidity: number;
  lastUpdated: string;
  quote: number;
  volumeBase: number;
  volumeQuote: number;
  feeType: string;
  depthUsdNegativeTwo: number;
  depthUsdPositiveTwo: number;
  volumePercent: number;
  isVerified: number;
  quotes: ExchangeMarketPairQuote[];
  type: 'cex' | 'dex';
  hideStarsMarket: number;
}

export interface ExchangeMarketPairsQuote {
  id: string;
  derivativeVolume: number;
  spotVolume: number;
  totalVolume24h: number;
}

export interface ExchangeMarketPairsData {
  id: number;
  name: string;
  slug: string;
  numMarketPairs: number;
  marketPairs: ExchangeMarketPair[];
  sort: string;
  direction: string;
  quotes: ExchangeMarketPairsQuote[];
}

export interface ExchangeMarketPairsLatestResponse {
  data: ExchangeMarketPairsData;
  status: Status;
}
