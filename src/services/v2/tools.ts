import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type { GetPriceConversionParams, PriceConversionResponse } from '@/types/v2';
import { noUndefined } from '@/utils/object';

export class Tools {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Convert an amount of one cryptocurrency or fiat currency into one or more different currencies utilizing the latest market rate for each currency.
   *
   * @param params - The parameters for the Price Conversion request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getPriceConversion(
    params: GetPriceConversionParams,
    options: RequestOptions = {}
  ): Promise<PriceConversionResponse> {
    const searchParams = noUndefined({
      ...params,
      convert: Array.isArray(params.convert) ? params.convert.join(',') : params.convert,
      convert_id: Array.isArray(params.convert_id)
        ? params.convert_id.join(',')
        : params.convert_id,
    });

    return this.#client.proRequest<PriceConversionResponse>(
      'v2/tools/price-conversion',
      deepmerge({ searchParams }, options)
    );
  }
}
