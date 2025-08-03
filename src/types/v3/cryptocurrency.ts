import type { Status } from '@/types/common';

/**
 * @description Defines the parameters for fetching lightweight cryptocurrency details.
 */
export interface GetCryptocurrencyDetailLiteParams {
  /** The CoinMarketCap cryptocurrency ID. Example: 1975 */
  id: number | string;
}

/**
 * @description Represents lightweight statistics for a cryptocurrency.
 */
export interface CryptocurrencyStatisticsLite {
  price: number;
  priceChangePercentage24h: number;
  marketCap: number;
  circulatingSupply: number;
  totalSupply: number;
  rank: number;
}

/**
 * @description Represents lightweight details for a single cryptocurrency.
 */
export interface CryptocurrencyDetailLite {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  status: string;
  watchCount: string;
  volume: number;
  statistics: CryptocurrencyStatisticsLite;
}

/**
 * @description The root interface for the lightweight cryptocurrency detail API response.
 */
export interface CryptocurrencyDetailLiteResponse {
  data: CryptocurrencyDetailLite;
  status: Status;
}

/**
 * @description Defines the optional parameters for fetching a cryptocurrency listing.
 */
export interface GetCryptocurrencyListingParams {
  start?: number;
  limit?: number;
  sortBy?: 'rank' | 'name' | 'symbol' | 'date_added' | 'market_cap' | 'price' | 'volume_24h';
  sortType?: 'asc' | 'desc';
  /** A comma-separated list of currency symbols to convert to. e.g., 'USD,BTC' */
  convert?: string;
  cryptoType?: 'all' | 'coins' | 'tokens';
  tagType?: 'all' | 'defi' | 'nft' | 'stablecoin'; // Add other relevant tags as needed
  audited?: boolean;
  /** A comma-separated list of auxiliary data fields to include. */
  aux?: string;
}

/**
 * @description Defines the parameters for fetching purchase channels for a cryptocurrency.
 */
export interface GetPurchaseChannelsParams {
  cryptoId: number | string;
  location?: string;
  countryCode?: string;
  mediaType?: 'desktop' | 'mobile';
}

/**
 * @description Represents a single purchase channel.
 */
export interface PurchaseChannel {
  id: string;
  name: string;
  exchangeName: string;
  exchangeSlug: string;
  exchangeLogo?: string;
  purchaseLink: string;
  desc: string;
  exchangeId: number;
  exchangeType: number;
}

/**
 * @description The structure of the 'data' object in the purchase channels response.
 */
export interface PurchaseChannelsData {
  channels: PurchaseChannel[];
}

/**
 * @description The root interface for the purchase channels API response.
 */
export interface PurchaseChannelsResponse {
  data: PurchaseChannelsData;
  status: Status;
}
