import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type { ChartAnnotationResponse, GetChartAnnotationsParams } from '@/types/v3';
import { noUndefined } from '@/utils/object';

export class Chart {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Fetches chart annotations for a given cryptocurrency.
   *
   * @param params - The parameters for the chart annotations request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response with chart annotations.
   */
  async getAnnotations(
    params: GetChartAnnotationsParams,
    options: RequestOptions = {}
  ): Promise<ChartAnnotationResponse> {
    const defaultParams = {
      language: 'en',
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = noUndefined(combinedParams);

    return this.#client.freeRequest<ChartAnnotationResponse>(
      'data-api/v3/chart-annotation',
      deepmerge({ searchParams }, options)
    );
  }
}
