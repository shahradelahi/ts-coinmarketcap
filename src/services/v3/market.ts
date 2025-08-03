import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type { GetMarketPairsParams, MarketPairsResponse } from '@/types/v3';
import { noUndefined } from '@/utils/object';

export class Market {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Fetches the latest market pairs for a given cryptocurrency.
   *
   * @param params - The parameters for the market pairs request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response with market pairs.
   */
  async getPairs(
    params: GetMarketPairsParams,
    options: RequestOptions = {}
  ): Promise<MarketPairsResponse> {
    const defaultParams = {
      start: 1,
      limit: 100,
      category: 'spot',
      centerType: 'all',
      sort: 'cmc_rank_advanced',
      direction: 'desc',
      spotUntracked: false,
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = noUndefined(combinedParams);

    return this.#client.freeRequest<MarketPairsResponse>(
      'data-api/v3/cryptocurrency/market-pairs/latest',
      deepmerge({ searchParams }, options)
    );
  }
}
