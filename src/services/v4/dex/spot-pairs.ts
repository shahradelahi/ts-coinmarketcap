import deepmerge from 'deepmerge';

import { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type { DEXSpotPairsLatestResponse, GetDEXSpotPairsLatestParams } from '@/types/v4';
import { noUndefined } from '@/utils/object';

export class SpotPairs {
  readonly #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Returns a paginated list of all active dex spot pairs with latest market data.
   *
   * @param {GetDEXSpotPairsLatestParams} params - The parameters for the request.
   * @param {Options} options - Request options to override client defaults.
   * @returns {Promise<DEXSpotPairsLatestResponse>} A promise that resolves with the latest spot pairs data.
   * @see https://coinmarketcap.com/api/documentation/v4/#operation/getV4DexSpot-pairsLatest
   */
  getLatest(
    params: GetDEXSpotPairsLatestParams,
    options: RequestOptions = {}
  ): Promise<DEXSpotPairsLatestResponse> {
    const searchParams = noUndefined({
      ...params,
      network_id: Array.isArray(params.network_id)
        ? params.network_id.join(',')
        : params.network_id,
      network_slug: Array.isArray(params.network_slug)
        ? params.network_slug.join(',')
        : params.network_slug,
      dex_id: Array.isArray(params.dex_id) ? params.dex_id.join(',') : params.dex_id,
      dex_slug: Array.isArray(params.dex_slug) ? params.dex_slug.join(',') : params.dex_slug,
      base_asset_id: Array.isArray(params.base_asset_id)
        ? params.base_asset_id.join(',')
        : params.base_asset_id,
      base_asset_symbol: Array.isArray(params.base_asset_symbol)
        ? params.base_asset_symbol.join(',')
        : params.base_asset_symbol,
      base_asset_ucid: Array.isArray(params.base_asset_ucid)
        ? params.base_asset_ucid.join(',')
        : params.base_asset_ucid,
      quote_asset_id: Array.isArray(params.quote_asset_id)
        ? params.quote_asset_id.join(',')
        : params.quote_asset_id,
      quote_asset_symbol: Array.isArray(params.quote_asset_symbol)
        ? params.quote_asset_symbol.join(',')
        : params.quote_asset_symbol,
      quote_asset_ucid: Array.isArray(params.quote_asset_ucid)
        ? params.quote_asset_ucid.join(',')
        : params.quote_asset_ucid,
      aux: Array.isArray(params.aux) ? params.aux.join(',') : params.aux,
    });

    return this.#client.proRequest(
      'v4/dex/spot-pairs/latest',
      deepmerge({ searchParams }, options)
    );
  }
}
