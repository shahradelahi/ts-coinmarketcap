import type { Status } from '@/types/common';

/**
 * @description Represents a trending token from the CMC Community.
 */
export interface CommunityTrendingToken {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  rank: number;
}

/**
 * @description The root interface for the Community Trending Tokens API response.
 */
export interface CommunityTrendingTokensResponse {
  data: CommunityTrendingToken[];
  status: Status;
}

/**
 * @description Defines the parameters for fetching trending tokens from the CMC Community.
 */
export interface GetCommunityTrendingTokensParams {
  /**
   * Optionally specify the number of results to return.
   */
  limit?: number;
}

/**
 * @description Represents a trending topic from the CMC Community.
 */
export interface CommunityTrendingTopic {
  rank: number;
  topic: string;
}

/**
 * @description The root interface for the Community Trending Topics API response.
 */
export interface CommunityTrendingTopicsResponse {
  data: CommunityTrendingTopic[];
  status: Status;
}

/**
 * @description Defines the parameters for fetching trending topics from the CMC Community.
 */
export interface GetCommunityTrendingTopicsParams {
  /**
   * Optionally specify the number of results to return.
   */
  limit?: number;
}
