import deepmerge from 'deepmerge';

import { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import {
  DEXOHLCVHistoricalResponse,
  DEXOHLCVLatestResponse,
  DEXQuotesLatestResponse,
  DEXTradesLatestResponse,
  GetDEXOHLCVHistoricalParams,
  GetDEXOHLCVLatestParams,
  GetDEXQuotesLatestParams,
  GetDEXTradesLatestParams,
} from '@/types/v4';
import { noUndefined } from '@/utils/object';

export class Pairs {
  readonly #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Returns historical OHLCV (Open, High, Low, Close, Volume) data along with market cap for any spot pairs using time interval parameters.
   *
   * @param {GetDEXOHLCVHistoricalParams} params - The parameters for the request.
   * @param {Options} options - Request options to override client defaults.
   * @returns {Promise<DEXOHLCVHistoricalResponse>} A promise that resolves with the historical OHLCV data.
   * @see https://coinmarketcap.com/api/documentation/v4/#operation/getV4DexPairsOhlcvHistorical
   */
  getOHLCVHistorical(
    params: GetDEXOHLCVHistoricalParams,
    options: RequestOptions = {}
  ): Promise<DEXOHLCVHistoricalResponse> {
    const searchParams = noUndefined({
      ...params,
      aux: Array.isArray(params.aux) ? params.aux.join(',') : params.aux,
    });

    return this.#client.proRequest(
      'v4/dex/pairs/ohlcv/historical',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns the latest OHLCV (Open, High, Low, Close, Volume) market values for one or more spot pairs for the current UTC day.
   *
   * @param {GetDEXOHLCVLatestParams} params - The parameters for the request.
   * @param {Options} options - Request options to override client defaults.
   * @returns {Promise<DEXOHLCVLatestResponse>} A promise that resolves with the latest OHLCV data.
   * @see https://coinmarketcap.com/api/documentation/v4/#operation/getV4DexPairsOhlcvLatest
   */
  getOHLCVLatest(
    params: GetDEXOHLCVLatestParams,
    options: RequestOptions = {}
  ): Promise<DEXOHLCVLatestResponse> {
    const searchParams = noUndefined({
      ...params,
      contract_address: Array.isArray(params.contract_address)
        ? params.contract_address.join(',')
        : params.contract_address,
      network_id: Array.isArray(params.network_id)
        ? params.network_id.join(',')
        : params.network_id,
      aux: Array.isArray(params.aux) ? params.aux.join(',') : params.aux,
    });

    return this.#client.proRequest(
      'v4/dex/pairs/ohlcv/latest',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns the latest market quote for 1 or more spot pairs.
   *
   * @param {GetDEXQuotesLatestParams} params - The parameters for the request.
   * @param {Options} options - Request options to override client defaults.
   * @returns {Promise<DEXQuotesLatestResponse>} A promise that resolves with the latest quotes data.
   * @see https://coinmarketcap.com/api/documentation/v4/#operation/getV4DexPairsQuotesLatest
   */
  getQuotesLatest(
    params: GetDEXQuotesLatestParams,
    options: RequestOptions = {}
  ): Promise<DEXQuotesLatestResponse> {
    const searchParams = noUndefined({
      ...params,
      contract_address: Array.isArray(params.contract_address)
        ? params.contract_address.join(',')
        : params.contract_address,
      network_id: Array.isArray(params.network_id)
        ? params.network_id.join(',')
        : params.network_id,
      aux: Array.isArray(params.aux) ? params.aux.join(',') : params.aux,
    });

    return this.#client.proRequest(
      'v4/dex/pairs/quotes/latest',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns up to the latest 100 trades for 1 spot pair.
   *
   * @param {GetDEXTradesLatestParams} params - The parameters for the request.
   * @param {Options} options - Request options to override client defaults.
   * @returns {Promise<DEXTradesLatestResponse>} A promise that resolves with the latest trades data.
   * @see https://coinmarketcap.com/api/documentation/v4/#operation/getV4DexPairsTradeLatest
   */
  getTradesLatest(
    params: GetDEXTradesLatestParams,
    options: RequestOptions = {}
  ): Promise<DEXTradesLatestResponse> {
    const searchParams = noUndefined({
      ...params,
      contract_address: Array.isArray(params.contract_address)
        ? params.contract_address.join(',')
        : params.contract_address,
      aux: Array.isArray(params.aux) ? params.aux.join(',') : params.aux,
    });

    return this.#client.proRequest(
      'v4/dex/pairs/trade/latest',
      deepmerge({ searchParams }, options)
    );
  }
}
