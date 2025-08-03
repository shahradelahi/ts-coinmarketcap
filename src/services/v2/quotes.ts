import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type {
  GetQuotesHistoricalParams,
  GetQuotesLatestParams,
  QuotesHistoricalResponse,
  QuotesLatestResponse,
} from '@/types/v2';
import { createSuccessStatus } from '@/utils/dummy';
import { noUndefined } from '@/utils/object';
import { chunkedRequest, requiresChunkRequest } from '@/utils/request';

export class Quotes {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Returns the latest market quote for 1 or more cryptocurrencies.
   *
   * @param params - The parameters for the latest quotes request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getQuotesLatest(
    params: GetQuotesLatestParams,
    options: RequestOptions = {}
  ): Promise<QuotesLatestResponse> {
    const maxSize = 100;
    if (requiresChunkRequest(params, maxSize)) {
      return {
        data: await chunkedRequest(this, this.getQuotesLatest, params, options, maxSize),
        status: createSuccessStatus(),
      };
    }

    const defaultParams: GetQuotesLatestParams = {
      aux: 'num_market_pairs,cmc_rank,date_added,tags,platform,max_supply,circulating_supply,total_supply,market_cap_by_total_supply,volume_24h_reported,volume_7d,volume_7d_reported,volume_30d,volume_30d_reported,is_active,is_fiat',
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
      aux: Array.isArray(combinedParams.aux) ? combinedParams.aux.join(',') : combinedParams.aux,
    });

    return this.#client.proRequest<QuotesLatestResponse>(
      'v2/cryptocurrency/quotes/latest',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns an interval of historic market quotes for any cryptocurrency based on time and interval parameters.
   *
   * @param params - The parameters for the historical quotes request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getQuotesHistorical(
    params: GetQuotesHistoricalParams,
    options: RequestOptions = {}
  ): Promise<QuotesHistoricalResponse> {
    const defaultParams = {
      interval: '5m',
      aux: 'price,volume,market_cap,circulating_supply,total_supply,quote_timestamp,is_active,is_fiat',
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

    return this.#client.proRequest<QuotesHistoricalResponse>(
      'v2/cryptocurrency/quotes/historical',
      deepmerge({ searchParams }, options)
    );
  }
}
