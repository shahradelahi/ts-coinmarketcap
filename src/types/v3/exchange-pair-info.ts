import type { Status } from '@/types/common';

/**
 * @description Defines the parameters for fetching exchange and market pair information.
 */
export interface GetExchangePairInfoParams {
  /** The URL slug of the cryptocurrency (e.g., "chainlink"). */
  slug: string;
}

/**
 * @description Basic information about a cryptocurrency, as seen in the exchange pair info response.
 */
export interface CryptoInfoBasic {
  id: number;
  symbol: string;
  slug: string;
  name: string;
}

/**
 * @description Information about a single exchange listing a cryptocurrency.
 */
export interface ExchangeInfo {
  exchangeId: number;
  name: string;
  marketPairNum: string;
  volume24h: string;
  volumePercent: string;
  liquidityScore: string;
  cryptoIds: number[];
}

/**
 * @description The structure of the 'data' object in the exchange pair info response.
 */
export interface ExchangePairInfoData {
  exchanges: ExchangeInfo[];
  cryptos: CryptoInfoBasic[];
}

/**
 * @description The root interface for the exchange pair info API response.
 */
export interface ExchangePairInfoResponse {
  data: ExchangePairInfoData;
  status: Status;
}
