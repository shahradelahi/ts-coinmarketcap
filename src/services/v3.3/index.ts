import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type { DetailChartResponse, GetDetailChartParams } from '@/types/v3.3';
import { noUndefined } from '@/utils/object';

export class V3_3Service {
  readonly #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Fetches chart data for a given cryptocurrency.
   *
   * @param params - The parameters for the chart data request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response with chart data.
   */
  async getDetailChart(
    params: GetDetailChartParams,
    options: RequestOptions = {}
  ): Promise<DetailChartResponse> {
    return this.#client.freeRequest<DetailChartResponse>(
      'data-api/v3.3/cryptocurrency/detail/chart',
      deepmerge({ searchParams: noUndefined(params) }, options)
    );
  }
}
