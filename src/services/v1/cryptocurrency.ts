import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type {
  AirdropResponse,
  AirdropsResponse,
  CategoriesResponse,
  CategoryDetailsResponse,
  CryptocurrencyMapResponse,
  GetAirdropParams,
  GetAirdropsParams,
  GetCategoriesParams,
  GetCategoryParams,
  GetCryptocurrencyMapParams,
  GetListingsHistoricalParams,
  GetListingsLatestParams,
  GetListingsNewParams,
  GetTrendingGainersLosersParams,
  GetTrendingLatestParams,
  GetTrendingMostVisitedParams,
  ListingsHistoricalResponse,
  ListingsLatestResponse,
  ListingsNewResponse,
  TrendingGainersLosersResponse,
  TrendingLatestResponse,
  TrendingMostVisitedResponse,
} from '@/types/v1';
import { noUndefined } from '@/utils/object';

export class Cryptocurrency {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Returns a paginated list of all cryptocurrency airdrops.
   *
   * @param params - The parameters for the airdrops request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getAirdrops(
    params: GetAirdropsParams = {},
    options: RequestOptions = {}
  ): Promise<AirdropsResponse> {
    const defaultParams = {
      start: 1,
      limit: 100,
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = noUndefined(combinedParams);

    return this.#client.proRequest<AirdropsResponse>(
      'v1/cryptocurrency/airdrops',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns information about a single cryptocurrency airdrop.
   *
   * @param params - The parameters for the airdrop request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getAirdrop(
    params: GetAirdropParams,
    options: RequestOptions = {}
  ): Promise<AirdropResponse> {
    return this.#client.proRequest<AirdropResponse>(
      'v1/cryptocurrency/airdrop',
      deepmerge({ searchParams: { id: params.id } }, options)
    );
  }

  /**
   * Returns information about a single coin category available on CoinMarketCap.
   * Includes a paginated list of the cryptocurrency quotes and metadata for the category.
   *
   * @param params - The parameters for the category request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getCategory(
    params: GetCategoryParams,
    options: RequestOptions = {}
  ): Promise<CategoryDetailsResponse> {
    const defaultParams = {
      start: 1,
      limit: 100,
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
    });

    return this.#client.proRequest<CategoryDetailsResponse>(
      'v1/cryptocurrency/category',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Fetches information about all coin categories available on CoinMarketCap.
   *
   * @param params - The parameters for the categories request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getCategories(
    params: GetCategoriesParams = {},
    options: RequestOptions = {}
  ): Promise<CategoriesResponse> {
    const defaultParams = {
      start: 1,
      limit: 5000,
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
    });

    return this.#client.proRequest<CategoriesResponse>(
      'v1/cryptocurrency/categories',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns a mapping of all cryptocurrencies to unique CoinMarketCap ids.
   *
   * @param params - The parameters for the map request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getCryptocurrencyMap(
    params: GetCryptocurrencyMapParams,
    options: RequestOptions = {}
  ): Promise<CryptocurrencyMapResponse> {
    const defaultParams = {
      listing_status: 'active',
      start: 1,
      sort: 'id',
      aux: 'platform,first_historical_data,last_historical_data,is_active',
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = noUndefined({
      ...combinedParams,
      symbol: Array.isArray(combinedParams.symbol)
        ? combinedParams.symbol.join(',')
        : combinedParams.symbol,
      aux: Array.isArray(combinedParams.aux) ? combinedParams.aux.join(',') : combinedParams.aux,
    });

    return this.#client.proRequest<CryptocurrencyMapResponse>(
      'v1/cryptocurrency/map',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns a ranked and sorted list of all cryptocurrencies for a historical UTC date.
   *
   * @param params - The parameters for the historical listings request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getHistoricalListings(
    params: GetListingsHistoricalParams,
    options: RequestOptions = {}
  ): Promise<ListingsHistoricalResponse> {
    const defaultParams = {
      start: 1,
      limit: 100,
      sort: 'cmc_rank',
      cryptocurrency_type: 'all',
      aux: 'platform,tags,date_added,circulating_supply,total_supply,max_supply,cmc_rank,num_market_pairs',
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

    return this.#client.proRequest<ListingsHistoricalResponse>(
      'v1/cryptocurrency/listings/historical',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns a paginated list of most recently added cryptocurrencies.
   *
   * @param params - The parameters for the new listings request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getNewListings(
    params: GetListingsNewParams,
    options: RequestOptions = {}
  ): Promise<ListingsNewResponse> {
    const defaultParams = {
      start: 1,
      limit: 100,
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
    });

    return this.#client.proRequest<ListingsNewResponse>(
      'v1/cryptocurrency/listings/new',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns a paginated list of all active cryptocurrencies with latest market data.
   *
   * @param params - The parameters for the latest listings request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getListingsLatest(
    params: GetListingsLatestParams = {},
    options: RequestOptions = {}
  ): Promise<ListingsLatestResponse> {
    const defaultParams = {
      start: 1,
      limit: 100,
      sort: 'market_cap',
      cryptocurrency_type: 'all',
      tag: 'all',
      aux: 'num_market_pairs,cmc_rank,date_added,tags,platform,max_supply,circulating_supply,total_supply',
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

    return this.#client.proRequest<ListingsLatestResponse>(
      'v1/cryptocurrency/listings/latest',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns a paginated list of all trending cryptocurrencies, determined and sorted by the largest price gains or losses.
   *
   * @see https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyTrendingGainerslosers
   * @param params - The parameters for the trending gainers/losers request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getTrendingGainersLosers(
    params: GetTrendingGainersLosersParams,
    options: RequestOptions = {}
  ): Promise<TrendingGainersLosersResponse> {
    const defaultParams = {
      start: 1,
      limit: 100,
      time_period: '24h',
      sort: 'percent_change_24h',
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
    });

    return this.#client.proRequest<TrendingGainersLosersResponse>(
      'v1/cryptocurrency/trending/gainers-losers',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns a paginated list of all trending cryptocurrency market data, determined and sorted by CoinMarketCap search volume.
   *
   * @param params - The parameters for the trending latest request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getTrendingLatest(
    params: GetTrendingLatestParams,
    options: RequestOptions = {}
  ): Promise<TrendingLatestResponse> {
    const defaultParams = {
      start: 1,
      limit: 100,
      time_period: '24h',
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
    });

    return this.#client.proRequest<TrendingLatestResponse>(
      'v1/cryptocurrency/trending/latest',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns a paginated list of all trending cryptocurrency market data, determined and sorted by traffic to coin detail pages.
   *
   * @param params - The parameters for the trending most visited request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getTrendingMostVisited(
    params: GetTrendingMostVisitedParams,
    options: RequestOptions = {}
  ): Promise<TrendingMostVisitedResponse> {
    const defaultParams = {
      start: 1,
      limit: 100,
      time_period: '24h',
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
    });

    return this.#client.proRequest<TrendingMostVisitedResponse>(
      'v1/cryptocurrency/trending/most-visited',
      deepmerge({ searchParams }, options)
    );
  }
}
