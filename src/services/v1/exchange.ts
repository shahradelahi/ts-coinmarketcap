import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type {
  ExchangeInfoResponse,
  ExchangeListingsLatestResponse,
  ExchangeMapResponse,
  ExchangeMarketPairsLatestResponse,
  ExchangeQuotesHistoricalResponse,
  ExchangeQuotesLatestResponse,
  GetExchangeInfoParams,
  GetExchangeListingsLatestParams,
  GetExchangeMapParams,
  GetExchangeMarketPairsLatestParams,
  GetExchangeQuotesHistoricalParams,
  GetExchangeQuotesLatestParams,
} from '@/types/v1';
import { noUndefined } from '@/utils/object';

export class Exchange {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Returns all static metadata for one or more exchanges.
   *
   * @param params - The parameters for the exchange info request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getInfo(
    params: GetExchangeInfoParams,
    options: RequestOptions = {}
  ): Promise<ExchangeInfoResponse> {
    const searchParams = noUndefined({
      ...params,
      id: Array.isArray(params.id) ? params.id.join(',') : params.id,
      slug: Array.isArray(params.slug) ? params.slug.join(',') : params.slug,
      aux: Array.isArray(params.aux) ? params.aux.join(',') : params.aux,
    });

    return this.#client.proRequest<ExchangeInfoResponse>(
      'v1/exchange/info',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns a paginated list of all active cryptocurrency exchanges by CoinMarketCap ID.
   *
   * @param params - The parameters for the exchange map request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getMap(
    params: GetExchangeMapParams = {},
    options: RequestOptions = {}
  ): Promise<ExchangeMapResponse> {
    const defaultParams = {
      listing_status: 'active',
      start: 1,
      sort: 'id',
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = noUndefined({
      ...combinedParams,
      listing_status: Array.isArray(combinedParams.listing_status)
        ? combinedParams.listing_status.join(',')
        : combinedParams.listing_status,
      slug: Array.isArray(combinedParams.slug)
        ? combinedParams.slug.join(',')
        : combinedParams.slug,
      aux: Array.isArray(combinedParams.aux) ? combinedParams.aux.join(',') : combinedParams.aux,
    });

    return this.#client.proRequest<ExchangeMapResponse>(
      'v1/exchange/map',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns a paginated list of all cryptocurrency exchanges including the latest aggregate market data for each exchange.
   *
   * @param params - The parameters for the latest listings request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getListingsLatest(
    params: GetExchangeListingsLatestParams = {},
    options: RequestOptions = {}
  ): Promise<ExchangeListingsLatestResponse> {
    const defaultParams = {
      start: 1,
      limit: 100,
      sort: 'volume_24h',
      category: 'all',
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = noUndefined({
      ...combinedParams,
      aux: Array.isArray(combinedParams.aux) ? combinedParams.aux.join(',') : combinedParams.aux,
      convert: Array.isArray(combinedParams.convert)
        ? combinedParams.convert.join(',')
        : combinedParams.convert,
      convert_id: Array.isArray(combinedParams.convert_id)
        ? combinedParams.convert_id.join(',')
        : combinedParams.convert_id,
    });

    return this.#client.proRequest<ExchangeListingsLatestResponse>(
      'v1/exchange/listings/latest',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns all active market pairs that CoinMarketCap tracks for a given exchange.
   *
   * @param params - The parameters for the latest market pairs request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getMarketPairsLatest(
    params: GetExchangeMarketPairsLatestParams,
    options: RequestOptions = {}
  ): Promise<ExchangeMarketPairsLatestResponse> {
    const defaultParams = {
      start: 1,
      limit: 100,
      category: 'all',
      fee_type: 'all',
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = noUndefined({
      ...combinedParams,
      aux: Array.isArray(combinedParams.aux) ? combinedParams.aux.join(',') : combinedParams.aux,
      matched_id: Array.isArray(combinedParams.matched_id)
        ? combinedParams.matched_id.join(',')
        : combinedParams.matched_id,
      matched_symbol: Array.isArray(combinedParams.matched_symbol)
        ? combinedParams.matched_symbol.join(',')
        : combinedParams.matched_symbol,
      convert: Array.isArray(combinedParams.convert)
        ? combinedParams.convert.join(',')
        : combinedParams.convert,
      convert_id: Array.isArray(combinedParams.convert_id)
        ? combinedParams.convert_id.join(',')
        : combinedParams.convert_id,
    });

    return this.#client.proRequest<ExchangeMarketPairsLatestResponse>(
      'v1/exchange/market-pairs/latest',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns an interval of historic quotes for any exchange based on time and interval parameters.
   *
   * @param params - The parameters for the historical quotes request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getQuotesHistorical(
    params: GetExchangeQuotesHistoricalParams,
    options: RequestOptions = {}
  ): Promise<ExchangeQuotesHistoricalResponse> {
    const defaultParams = {
      count: 10,
      interval: '5m',
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = noUndefined({
      ...combinedParams,
      id: Array.isArray(combinedParams.id) ? combinedParams.id.join(',') : combinedParams.id,
      slug: Array.isArray(combinedParams.slug)
        ? combinedParams.slug.join(',')
        : combinedParams.slug,
      convert: Array.isArray(combinedParams.convert)
        ? combinedParams.convert.join(',')
        : combinedParams.convert,
      convert_id: Array.isArray(combinedParams.convert_id)
        ? combinedParams.convert_id.join(',')
        : combinedParams.convert_id,
    });

    return this.#client.proRequest<ExchangeQuotesHistoricalResponse>(
      'v1/exchange/quotes/historical',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns the latest aggregate market data for 1 or more exchanges.
   *
   * @param params - The parameters for the latest quotes request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getQuotesLatest(
    params: GetExchangeQuotesLatestParams,
    options: RequestOptions = {}
  ): Promise<ExchangeQuotesLatestResponse> {
    const searchParams = noUndefined({
      ...params,
      id: Array.isArray(params.id) ? params.id.join(',') : params.id,
      slug: Array.isArray(params.slug) ? params.slug.join(',') : params.slug,
      aux: Array.isArray(params.aux) ? params.aux.join(',') : params.aux,
      convert: Array.isArray(params.convert) ? params.convert.join(',') : params.convert,
      convert_id: Array.isArray(params.convert_id)
        ? params.convert_id.join(',')
        : params.convert_id,
    });

    return this.#client.proRequest<ExchangeQuotesLatestResponse>(
      'v1/exchange/quotes/latest',
      deepmerge({ searchParams }, options)
    );
  }
}
