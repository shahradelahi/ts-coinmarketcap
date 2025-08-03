import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type { GetMarketPairsLatestParams, MarketPairsLatestResponse } from '@/types/v2';
import { noUndefined } from '@/utils/object';

export class MarketPairs {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Returns the latest market pairs for 1 or more cryptocurrencies.
   *
   * @param params - The parameters for the latest market pairs request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getMarketPairsLatest(
    params: GetMarketPairsLatestParams,
    options: RequestOptions = {}
  ): Promise<MarketPairsLatestResponse> {
    const defaultParams = {
      start: 1,
      limit: 100,
      skip_invalid: true,
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = noUndefined({
      ...combinedParams,
      id: Array.isArray(combinedParams.id) ? combinedParams.id.join(',') : combinedParams.id,
      slug: Array.isArray(combinedParams.slug)
        ? combinedParams.slug.join(',')
        : combinedParams.slug,
      symbol: Array.isArray(combinedParams.symbol)
        ? combinedParams.symbol.join(',')
        : combinedParams.symbol,
      convert: Array.isArray(combinedParams.convert)
        ? combinedParams.convert.join(',')
        : combinedParams.convert,
      convert_id: Array.isArray(combinedParams.convert_id)
        ? combinedParams.convert_id.join(',')
        : combinedParams.convert_id,
    });

    return this.#client.proRequest<MarketPairsLatestResponse>(
      'v2/cryptocurrency/market-pairs/latest',
      deepmerge({ searchParams }, options)
    );
  }
}
