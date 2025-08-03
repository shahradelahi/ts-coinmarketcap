import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type {
  FearAndGreedHistoricalParams,
  FearAndGreedHistoricalResponse,
  FearAndGreedLatestResponse,
} from '@/types/v3';
import { noUndefined } from '@/utils/object';

export class FearAndGreed {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Returns a paginated list of all CMC Crypto Fear and Greed values at 12am UTC time.
   *
   * @param params - The parameters for the historical request, such as start and limit.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getFearAndGreedHistorical(
    params: FearAndGreedHistoricalParams = {},
    options: RequestOptions = {}
  ): Promise<FearAndGreedHistoricalResponse> {
    const defaultParams = {
      start: 1,
      limit: 50,
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = noUndefined(combinedParams);

    return this.#client.freeRequest<FearAndGreedHistoricalResponse>(
      'data-api/v3/fear-and-greed/historical',
      deepmerge(
        {
          searchParams,
        },
        options
      )
    );
  }

  /**
   * Returns the lastest CMC Crypto Fear and Greed value.
   *
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getFearAndGreedLatest(options: RequestOptions = {}): Promise<FearAndGreedLatestResponse> {
    return this.#client.freeRequest<FearAndGreedLatestResponse>(
      'data-api/v3/fear-and-greed/latest',
      options
    );
  }
}
