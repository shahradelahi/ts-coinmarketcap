import deepmerge from 'deepmerge';
import lodash from 'lodash';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type {
  ExchangeMarketPairsLatestResponse,
  ExchangePairInfoResponse,
  GetExchangeCryptoListingParams,
  GetExchangeCryptoListingResponse,
  GetExchangeMarketPairsLatestParams,
  GetExchangePairInfoParams,
} from '@/types/v3';
import { createSuccessStatus } from '@/utils/dummy';
import { noUndefined } from '@/utils/object';
import { pagedRequest } from '@/utils/request';

export class Exchange {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Fetches a list of cryptocurrencies available on a specific exchange.
   * This is a composite method that first fetches market pairs for the exchange
   * and then retrieves detailed information for each base cryptocurrency in those pairs.
   *
   * @param params - Parameters for fetching the exchange crypto listing.
   * @returns A promise that resolves to a map of cryptocurrency information objects.
   */
  async getCryptoListing(
    params: GetExchangeCryptoListingParams
  ): Promise<GetExchangeCryptoListingResponse> {
    const { id, slug, start, limit, ...listingPrams } = params;

    const marketPairs = await this.getMarketPairsLatest({
      id,
      slug,
      start,
      limit,
    }).then((r) => r.data.marketPairs);

    if (!marketPairs || marketPairs.length === 0) {
      return { data: [], status: createSuccessStatus() };
    }

    const cryptoIds = lodash
      .uniq(marketPairs.flatMap((c) => [c.baseCurrencyId, c.quoteCurrencyId]))
      .join(',');

    const quotes = await this.#client.v2.quotes
      .getQuotesLatest({ ...listingPrams, id: cryptoIds })
      .then((r) => r.data);

    return {
      data: Object.values(quotes),
      status: createSuccessStatus(),
    };
  }

  /**
   * Fetches exchange and market pair information for a given cryptocurrency.
   *
   * @param params - The parameters for the exchange pair info request, requiring a `slug`.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response with exchange pair info.
   */
  async getPairInfo(
    params: GetExchangePairInfoParams,
    options: RequestOptions = {}
  ): Promise<ExchangePairInfoResponse> {
    return this.#client.freeRequest<ExchangePairInfoResponse>(
      'data-api/v3/cryptocurrency/web/exchange-pair-info',
      deepmerge(
        {
          searchParams: { slug: params.slug },
        },
        options
      )
    );
  }

  /**
   * Fetches the latest market pairs for a given exchange.
   *
   * @param params - The parameters for the market pairs request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response with market pairs.
   */
  async getMarketPairsLatest(
    params: GetExchangeMarketPairsLatestParams,
    options: RequestOptions = {}
  ): Promise<ExchangeMarketPairsLatestResponse> {
    const maxSize = 500;
    if (params.limit && params.limit > maxSize) {
      return {
        data: await pagedRequest(
          this,
          this.getMarketPairsLatest,
          params,
          options,
          maxSize,
          'marketPairs'
        ),
        status: createSuccessStatus(),
      };
    }

    const defaultParams = {
      start: 1,
      limit: 50,
      category: 'spot',
    };

    const combinedParams = { ...defaultParams, ...params };
    const searchParams = noUndefined(combinedParams);

    return this.#client.freeRequest<ExchangeMarketPairsLatestResponse>(
      'data-api/v3/exchange/market-pairs/latest',
      deepmerge({ searchParams }, options)
    );
  }
}
