import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type {
  Cmc100HistoricalResponse,
  Cmc100LatestResponse,
  GetCmc100HistoricalParams,
} from '@/types/v3';
import { noUndefined } from '@/utils/object';

export class Cmc100Index {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Returns an interval of historic CoinMarketCap 100 Index values based on the interval parameter.
   *
   * @param params - The parameters for the historical request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getHistorical(
    params: GetCmc100HistoricalParams = {},
    options: RequestOptions = {}
  ): Promise<Cmc100HistoricalResponse> {
    const defaultParams = {
      count: '5',
      interval: 'daily',
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = noUndefined(combinedParams);

    return this.#client.proRequest<Cmc100HistoricalResponse>(
      'v3/index/cmc100-historical',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns the lastest CoinMarketCap 100 Index value, constituents, and constituent weights.
   *
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getLatest(options: RequestOptions = {}): Promise<Cmc100LatestResponse> {
    return this.#client.proRequest<Cmc100LatestResponse>('v3/index/cmc100-latest', options);
  }
}
