import deepmerge from 'deepmerge';

import { CoinMarketCap } from '@/client';
import { RequestOptions } from '@/types';
import {
  DEXListingsInfoResponse,
  DEXListingsQuotesResponse,
  DEXNetworksListResponse,
  GetDEXListingsInfoParams,
  GetDEXListingsQuotesParams,
  GetDEXNetworksListParams,
} from '@/types/v4';
import { noUndefined } from '@/utils/object';

import { Pairs } from './pairs';
import { SpotPairs } from './spot-pairs';

export class DEX {
  readonly #client: CoinMarketCap;
  public pairs: Pairs;
  public spotPairs: SpotPairs;

  constructor(client: CoinMarketCap) {
    this.#client = client;
    this.pairs = new Pairs(this.#client);
    this.spotPairs = new SpotPairs(this.#client);
  }

  /**
   * Returns all static metadata for one or more decentralised exchanges.
   *
   * @param {GetDEXListingsInfoParams} params - The parameters for the request.
   * @param {Options} options - Request options to override client defaults.
   * @returns {Promise<DEXListingsInfoResponse>} A promise that resolves with the DEX listings info.
   * @see https://coinmarketcap.com/api/documentation/v4/#operation/getV4DexListingsInfo
   */
  getListingsInfo(
    params: GetDEXListingsInfoParams,
    options: RequestOptions = {}
  ): Promise<DEXListingsInfoResponse> {
    const searchParams = noUndefined({
      ...params,
      id: Array.isArray(params.id) ? params.id.join(',') : params.id,
      aux: Array.isArray(params.aux) ? params.aux.join(',') : params.aux,
    });

    return this.#client.proRequest('v4/dex/listings/info', deepmerge({ searchParams }, options));
  }

  /**
   * Returns a paginated list of all decentralised cryptocurrency exchanges including the latest aggregate market data for each exchange.
   *
   * @param {GetDEXListingsQuotesParams} params - The parameters for the request.
   * @param {Options} options - Request options to override client defaults.
   * @returns {Promise<DEXListingsQuotesResponse>} A promise that resolves with the DEX listings quotes.
   * @see https://coinmarketcap.com/api/documentation/v4/#operation/getV4DexListingsQuotes
   */
  getListingsQuotes(
    params: GetDEXListingsQuotesParams,
    options: RequestOptions = {}
  ): Promise<DEXListingsQuotesResponse> {
    const searchParams = noUndefined({
      ...params,
      aux: Array.isArray(params.aux) ? params.aux.join(',') : params.aux,
      convert_id: Array.isArray(params.convert_id)
        ? params.convert_id.join(',')
        : params.convert_id,
    });

    return this.#client.proRequest('v4/dex/listings/quotes', deepmerge({ searchParams }, options));
  }

  /**
   * Returns a list of all networks to unique CoinMarketCap ids.
   *
   * @param {GetDEXNetworksListParams} params - The parameters for the request.
   * @param {Options} options - Request options to override client defaults.
   * @returns {Promise<DEXNetworksListResponse>} A promise that resolves with the DEX networks list.
   * @see https://coinmarketcap.com/api/documentation/v4/#operation/getV4DexNetworksList
   */
  getNetworksList(
    params: GetDEXNetworksListParams,
    options: RequestOptions = {}
  ): Promise<DEXNetworksListResponse> {
    const searchParams = noUndefined({
      ...params,
      aux: Array.isArray(params.aux) ? params.aux.join(',') : params.aux,
    });

    return this.#client.proRequest('v4/dex/networks/list', deepmerge({ searchParams }, options));
  }
}
