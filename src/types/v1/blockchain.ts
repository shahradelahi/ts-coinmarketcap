import type { Status } from '@/types/common';

/**
 * @description Represents blockchain statistics for a single cryptocurrency.
 */
export interface BlockchainStatistics {
  id: number;
  slug: string;
  symbol: string;
  block_reward_static: number;
  consensus_mechanism: string;
  difficulty: string;
  hashrate_24h: string;
  pending_transactions: number;
  reduction_rate: string;
  total_blocks: number;
  total_transactions: string;
  tps_24h: number;
  first_block_timestamp: string;
}

/**
 * @description The root interface for the blockchain statistics API response.
 */
export interface BlockchainStatisticsLatestResponse {
  data: Record<string, BlockchainStatistics>;
  status: Status;
}

/**
 * @description Defines the parameters for fetching the latest blockchain statistics.
 */
export interface GetBlockchainStatisticsLatestParams {
  /**
   * One or more comma-separated cryptocurrency CoinMarketCap IDs to return blockchain data for.
   * Pass 1,2,1027 to request all currently supported blockchains.
   */
  id?: string | number | number[];
  /**
   * Alternatively pass one or more comma-separated cryptocurrency symbols.
   * Pass BTC,LTC,ETH to request all currently supported blockchains.
   */
  symbol?: string | string[];
  /**
   * Alternatively pass a comma-separated list of cryptocurrency slugs.
   * Pass bitcoin,litecoin,ethereum to request all currently supported blockchains.
   */
  slug?: string | string[];
}
