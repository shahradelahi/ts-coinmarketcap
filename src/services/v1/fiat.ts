import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type { FiatMapResponse, GetFiatMapParams } from '@/types/v1';
import { noUndefined } from '@/utils/object';

export class FiatService {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Returns a mapping of all supported fiat currencies to unique CoinMarketCap ids.
   *
   * @param params - The parameters for the fiat map request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getMap(
    params: GetFiatMapParams = {},
    options: RequestOptions = {}
  ): Promise<FiatMapResponse> {
    const defaultParams = {
      start: 1,
      sort: 'id',
      include_metals: false,
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = noUndefined(combinedParams);

    return this.#client.proRequest<FiatMapResponse>(
      'v1/fiat/map',
      deepmerge({ searchParams }, options)
    );
  }
}
