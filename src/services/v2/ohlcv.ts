import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type {
  GetOHLCVHistoricalParams,
  GetOHLCVLatestParams,
  OHLCVHistoricalResponse,
  OHLCVLatestResponse,
} from '@/types/v2';
import { noUndefined } from '@/utils/object';

export class OHLCV {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Returns the latest OHLCV data for 1 or more cryptocurrencies.
   *
   * @param params - The parameters for the latest OHLCV request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getOHLCVLatest(
    params: GetOHLCVLatestParams,
    options: RequestOptions = {}
  ): Promise<OHLCVLatestResponse> {
    const defaultParams = {
      convert: 'USD',
      skip_invalid: true,
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = {
      id: Array.isArray(combinedParams.id) ? combinedParams.id.join(',') : combinedParams.id,
      symbol: Array.isArray(combinedParams.symbol)
        ? combinedParams.symbol.join(',')
        : combinedParams.symbol,
      time: combinedParams.time,
      convert: Array.isArray(combinedParams.convert)
        ? combinedParams.convert.join(',')
        : combinedParams.convert,
      convert_id: Array.isArray(combinedParams.convert_id)
        ? combinedParams.convert_id.join(',')
        : combinedParams.convert_id,
      skip_invalid: combinedParams.skip_invalid?.toString(),
    };

    return this.#client.proRequest<OHLCVLatestResponse>(
      'v2/cryptocurrency/ohlcv/latest',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns an interval of historic market quotes for any cryptocurrency based on time and interval parameters.
   *
   * @param params - The parameters for the historical OHLCV request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getOHLCVHistorical(
    params: GetOHLCVHistoricalParams,
    options: RequestOptions = {}
  ): Promise<OHLCVHistoricalResponse> {
    const defaultParams = {
      interval: 'daily',
      convert: 'USD',
      skip_invalid: true,
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = noUndefined({
      ...combinedParams,
      id: Array.isArray(combinedParams.id) ? combinedParams.id.join(',') : combinedParams.id,
      symbol: Array.isArray(combinedParams.symbol)
        ? combinedParams.symbol.join(',')
        : combinedParams.symbol,
      convert: Array.isArray(combinedParams.convert)
        ? combinedParams.convert.join(',')
        : combinedParams.convert,
      convert_id: Array.isArray(combinedParams.convert_id)
        ? combinedParams.convert_id.join(',')
        : combinedParams.convert_id,
      aux: Array.isArray(combinedParams.aux) ? combinedParams.aux.join(',') : combinedParams.aux,
    });

    return this.#client.proRequest<OHLCVHistoricalResponse>(
      'v2/cryptocurrency/ohlcv/historical',
      deepmerge({ searchParams }, options)
    );
  }
}
