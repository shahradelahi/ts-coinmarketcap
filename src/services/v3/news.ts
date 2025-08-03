import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { GetNewsTldrListParams, NewsTldrResponse, RequestOptions } from '@/types';
import type { GetNewsParams, NewsResponse } from '@/types/v3';
import { noUndefined } from '@/utils/object';

export class News {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Fetches a "TL;DR" list of news for a given cryptocurrency slug.
   * Note: This endpoint often requires a valid CSRF token to be sent in the headers,
   * which may result in a `40110 csrf token reject` error if not provided.
   * You can use the `extendAPI` method to set the required token header.
   *
   * @param params - The parameters for the news list request.
   * @param options - Request options to override client defaults.
   * @returns A Promise resolving to the news list response.
   */
  async getTldrList(
    params: GetNewsTldrListParams,
    options: RequestOptions = {}
  ): Promise<NewsTldrResponse> {
    const body = {
      slug: params.slug,
      languageCode: params.languageCode || 'en',
    };

    return this.#client.proRequest<NewsTldrResponse>(
      'content/v3/news-tldr/list',
      deepmerge({ json: body }, options)
    );
  }

  /**
   * Fetches news articles for a given cryptocurrency.
   *
   * @param params - The parameters for the news request.
   * @param options - Request options to override client defaults.
   * @returns A Promise resolving to the news response.
   */
  async getNews(params: GetNewsParams, options: RequestOptions = {}): Promise<NewsResponse> {
    const { cryptoId, mode = 'top', language = 'en' } = params;
    const searchParams = noUndefined({ cryptoId, mode, language });

    return this.#client.freeRequest<NewsResponse>(
      'aggr/v3/news/cdp',
      deepmerge({ searchParams }, options)
    );
  }
}
