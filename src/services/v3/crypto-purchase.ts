import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type {
  GetPurchaseChannelsParams,
  GetPurchaseFlagsParams,
  PurchaseChannelsResponse,
  PurchaseFlagsResponse,
} from '@/types/v3';
import { noUndefined } from '@/utils/object';

export class CryptoPurchase {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Fetches purchase channels for a cryptocurrency.
   *
   * @param params - The parameters for the purchase channels request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response with purchase channels.
   */
  async getPurchaseChannels(
    params: GetPurchaseChannelsParams,
    options: RequestOptions = {}
  ): Promise<PurchaseChannelsResponse> {
    const defaultParams = {
      location: 'cdp',
      countryCode: 'GB',
      mediaType: 'desktop',
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = noUndefined(combinedParams);

    return this.#client.freeRequest<PurchaseChannelsResponse>(
      'data-api/v3/cryptocurrency/purchase/channel',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Fetches purchase flags for a list of cryptocurrencies.
   *
   * @param params - The parameters for the purchase flags request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response with purchase flags.
   */
  async getPurchaseFlags(
    params: GetPurchaseFlagsParams,
    options: RequestOptions = {}
  ): Promise<PurchaseFlagsResponse> {
    const defaultParams = {
      countryCode: 'GB',
      mediaType: 'desktop',
    };

    const combinedParams = { ...defaultParams, ...params };

    const body = noUndefined(combinedParams);

    return this.#client.freeRequest<PurchaseFlagsResponse>(
      'data-api/v3/cryptocurrency/purchase/flag',
      deepmerge({ method: 'POST', json: body }, options)
    );
  }
}
