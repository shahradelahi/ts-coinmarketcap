import type { Status } from '@/types/common';

/**
 * @description Defines the parameters for fetching market pairs for a cryptocurrency.
 */
export type GetMarketPairsParams = {
  start?: number;
  limit?: number;
  category?: 'spot' | 'derivatives' | 'otc';
  centerType?: 'all' | 'cex' | 'dex';
  sort?:
    | 'cmc_rank_advanced'
    | 'volume_24h'
    | 'price'
    | 'volume_24h_reported'
    | 'liquidity_score'
    | 'market_score';
  direction?: 'asc' | 'desc';
  spotUntracked?: boolean;
  exchangeIds?: number | string;
  quoteCurrencyId?: number | string;
} & (
  | {
      /** The URL slug of the cryptocurrency (e.g., "chainlink"). */
      slug: string;
      id?: never;
    }
  | {
      /** The CoinMarketCap currency ID. */
      id: number | string;
      slug?: never;
    }
);

/**
 * @description Represents the quote details within a market pair.
 */
export interface MarketPairQuote {
  id: string;
  price: number;
  volume24h: number;
  depthPositiveTwo: number;
  depthNegativeTwo: number;
  indexPrice: number;
}

/**
 * @description Represents a single market pair for a cryptocurrency.
 */
export interface MarketPairV3 {
  rank: number;
  exchangeId: number;
  exchangeName: string;
  exchangeSlug: string;
  exchangeNotice: string;
  marketId: number;
  marketPair: string;
  category: string;
  marketUrl: string;
  marketScore: string;
  marketReputation: number;
  baseSymbol: string;
  baseCurrencyId: number;
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
  reservesAvailable: number;
  porAuditStatus: number;
  volumePercent: number;
  indexPrice: number;
  isVerified: number;
  type: 'cex' | 'dex';
  centerType: 'cex' | 'dex';
  hideStarsMarket: number;
  quotes: MarketPairQuote[];
  // DEX specific fields
  platformId?: number;
  platformName?: string;
  pairContractAddress?: string;
  liquidity?: number;
  dexerUrl?: string;
  // Outlier fields
  outlierDetected: number;
  priceExcluded: number;
  volumeExcluded: number;
  outlierDisp: number;
  priceExDisp: number;
  volExDisp: number;
}

/**
 * @description Represents sub-information for a sponsored exchange.
 */
export interface SponsoredExchangeSubInfo {
  url: string;
  showMsg: string;
  supportCountries: string[];
  excludeCountries: string[];
  customOptions: string;
}

/**
 * @description Represents a sponsored exchange.
 */
export interface SponsoredExchange {
  eventId: number;
  customName: string;
  customLogo: string;
  subInfos: SponsoredExchangeSubInfo[];
  customOptions: string;
}

/**
 * @description The structure of the 'data' object in the market pairs response.
 */
export interface MarketPairsData {
  id: number;
  name: string;
  symbol: string;
  numMarketPairs: number;
  marketPairs: MarketPairV3[];
  sort: string;
  direction: string;
  sponsoredExchange: SponsoredExchange[];
}

/**
 * @description The root interface for the market pairs API response.
 */
export interface MarketPairsResponse {
  data: MarketPairsData;
  status: Status;
}
