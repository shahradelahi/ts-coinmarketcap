import type { CryptoAsset, Status } from '@/types/common';

/**
 * @description Represents a single airdrop.
 */
export interface Airdrop {
  id: string;
  project_name: string;
  description: string;
  status: string;
  coin: Pick<CryptoAsset, 'id' | 'name' | 'slug' | 'symbol'>;
  start_date: string;
  end_date: string;
  total_prize: number;
  winner_count: number;
  link: string;
}

/**
 * @description The root interface for the cryptocurrency airdrops API response.
 */
export interface AirdropsResponse {
  data: Airdrop[];
  status: Status;
}

/**
 * @description The root interface for a single cryptocurrency airdrop API response.
 */
export interface AirdropResponse {
  data: Airdrop;
  status: Status;
}

/**
 * @description Defines the parameters for fetching cryptocurrency airdrops.
 */
export interface GetAirdropsParams {
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
   * Filter by airdrop status.
   */
  status?: 'active' | 'upcoming' | 'ended';
}

/**
 * @description Defines the parameters for fetching a single cryptocurrency airdrop.
 */
export interface GetAirdropParams {
  /**
   * The CoinMarketCap ID of the airdrop.
   */
  id: string;
}
