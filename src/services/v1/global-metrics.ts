import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type {
  GetGlobalMetricsQuotesHistoricalParams,
  GetGlobalMetricsQuotesLatestParams,
  GlobalMetricsQuotesHistoricalResponse,
  GlobalMetricsQuotesLatestResponse,
} from '@/types/v1';
import { noUndefined } from '@/utils/object';

export class GlobalMetrics {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Returns an interval of historical global cryptocurrency market metrics based on time and interval parameters.
   *
   * @param params - The parameters for the historical quotes request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getQuotesHistorical(
    params: GetGlobalMetricsQuotesHistoricalParams = {},
    options: RequestOptions = {}
  ): Promise<GlobalMetricsQuotesHistoricalResponse> {
    const defaultParams = {
      count: 10,
      interval: '1d',
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = noUndefined({
      ...combinedParams,
      convert: Array.isArray(combinedParams.convert)
        ? combinedParams.convert.join(',')
        : combinedParams.convert,
      convert_id: Array.isArray(combinedParams.convert_id)
        ? combinedParams.convert_id.join(',')
        : combinedParams.convert_id,
      aux: Array.isArray(combinedParams.aux) ? combinedParams.aux.join(',') : combinedParams.aux,
    });

    return this.#client.proRequest<GlobalMetricsQuotesHistoricalResponse>(
      'v1/global-metrics/quotes/historical',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns the latest global cryptocurrency market metrics.
   *
   * @param params - The parameters for the latest quotes request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getQuotesLatest(
    params: GetGlobalMetricsQuotesLatestParams = {},
    options: RequestOptions = {}
  ): Promise<GlobalMetricsQuotesLatestResponse> {
    const searchParams = noUndefined({
      ...params,
      convert: Array.isArray(params.convert) ? params.convert.join(',') : params.convert,
      convert_id: Array.isArray(params.convert_id)
        ? params.convert_id.join(',')
        : params.convert_id,
    });

    return this.#client.proRequest<GlobalMetricsQuotesLatestResponse>(
      'v1/global-metrics/quotes/latest',
      deepmerge({ searchParams }, options)
    );
  }
}
