import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type {
  CommunityTrendingTokensResponse,
  CommunityTrendingTopicsResponse,
  GetCommunityTrendingTokensParams,
  GetCommunityTrendingTopicsParams,
} from '@/types/v1';
import { noUndefined } from '@/utils/object';

export class Community {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Returns the latest trending tokens from the CMC Community.
   *
   * @param params - The parameters for the community trending tokens request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getTrendingTokens(
    params: GetCommunityTrendingTokensParams = {},
    options: RequestOptions = {}
  ): Promise<CommunityTrendingTokensResponse> {
    const defaultParams = {
      limit: 5,
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = noUndefined(combinedParams);

    return this.#client.proRequest<CommunityTrendingTokensResponse>(
      'v1/community/trending/token',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns the latest trending topics from the CMC Community.
   *
   * @param params - The parameters for the community trending topics request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getTrendingTopics(
    params: GetCommunityTrendingTopicsParams = {},
    options: RequestOptions = {}
  ): Promise<CommunityTrendingTopicsResponse> {
    const defaultParams = {
      limit: 5,
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = noUndefined(combinedParams);

    return this.#client.proRequest<CommunityTrendingTopicsResponse>(
      'v1/community/trending/topic',
      deepmerge({ searchParams }, options)
    );
  }
}
