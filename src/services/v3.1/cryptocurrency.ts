import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type {
  CryptocurrencyHistoricalResponse,
  GetCryptocurrencyHistoricalParams,
} from '@/types/v3.1';
import { noUndefined } from '@/utils/object';

export class Cryptocurrency {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Fetches historical data for a given cryptocurrency.
   *
   * @param params - The parameters for the historical data request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response with historical data.
   */
  async getHistorical(
    params: GetCryptocurrencyHistoricalParams,
    options: RequestOptions = {}
  ): Promise<CryptocurrencyHistoricalResponse> {
    const defaultParams = {
      interval: '1d',
      convertId: 2781,
    };

    const combinedParams = { ...defaultParams, ...params };

    return this.#client.freeRequest<CryptocurrencyHistoricalResponse>(
      'data-api/v3.1/cryptocurrency/historical',
      deepmerge({ searchParams: noUndefined(combinedParams) }, options)
    );
  }
}
