import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { GetCryptocurrencyListingResponse, RequestOptions } from '@/types';
import type {
  CryptocurrencyDetailLiteResponse,
  GetCryptocurrencyDetailLiteParams,
  GetCryptocurrencyListingParams,
} from '@/types/v3';
import { noUndefined } from '@/utils/object';

export class Cryptocurrency {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Fetches a list of cryptocurrencies from the CoinMarketCap API.
   *
   * @param params - The parameters for the listing request, such as pagination and sorting.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getListing(
    params: GetCryptocurrencyListingParams = {},
    options: RequestOptions = {}
  ): Promise<GetCryptocurrencyListingResponse> {
    const defaultParams = {
      start: 1,
      limit: 100,
      sortBy: 'rank',
      sortType: 'desc',
      convert: 'USD,USDT',
      cryptoType: 'all',
      tagType: 'all',
      audited: false,
      aux: 'ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,max_supply,circulating_supply,total_supply,volume_7d,volume_30d,self_reported_circulating_supply,self_reported_market_cap',
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = noUndefined(combinedParams);

    return this.#client.freeRequest<GetCryptocurrencyListingResponse>(
      'data-api/v3/cryptocurrency/listing',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Fetches lightweight details for a given cryptocurrency.
   *
   * @param params - The parameters for the detail lite request, requiring an `id`.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response with lightweight cryptocurrency details.
   */
  async getDetailLite(
    params: GetCryptocurrencyDetailLiteParams,
    options: RequestOptions = {}
  ): Promise<CryptocurrencyDetailLiteResponse> {
    return this.#client.freeRequest<CryptocurrencyDetailLiteResponse>(
      'data-api/v3/cryptocurrency/detail/lite',
      deepmerge(
        {
          searchParams: { id: params.id },
        },
        options
      )
    );
  }
}
