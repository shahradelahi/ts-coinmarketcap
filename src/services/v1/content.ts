import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type {
  ContentLatestPostsResponse,
  ContentLatestResponse,
  ContentPostCommentsResponse,
  ContentTopPostsResponse,
  GetContentLatestParams,
  GetContentLatestPostsParams,
  GetContentPostCommentsParams,
  GetContentTopPostsParams,
} from '@/types/v1';
import { noUndefined } from '@/utils/object';

export class Content {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Returns a paginated list of content pulled from CMC News/Headlines and Alexandria articles.
   *
   * @param params - The parameters for the content latest request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getContentLatest(
    params: GetContentLatestParams = {},
    options: RequestOptions = {}
  ): Promise<ContentLatestResponse> {
    const defaultParams = {
      start: 1,
      limit: 100,
      news_type: 'all',
      content_type: 'all',
      language: 'en',
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = noUndefined({
      id: Array.isArray(combinedParams.id) ? combinedParams.id.join(',') : combinedParams.id,
      slug: Array.isArray(combinedParams.slug)
        ? combinedParams.slug.join(',')
        : combinedParams.slug,
      symbol: Array.isArray(combinedParams.symbol)
        ? combinedParams.symbol.join(',')
        : combinedParams.symbol,
      news_type: Array.isArray(combinedParams.news_type)
        ? combinedParams.news_type.join(',')
        : combinedParams.news_type,
      content_type: Array.isArray(combinedParams.content_type)
        ? combinedParams.content_type.join(',')
        : combinedParams.content_type,
      category: Array.isArray(combinedParams.category)
        ? combinedParams.category.join(',')
        : combinedParams.category,
    });

    return this.#client.proRequest<ContentLatestResponse>(
      'v1/content/latest',
      deepmerge({ searchParams }, options)
    );
  }

  /**
   * Returns comments of the CMC Community post.
   *
   * @param params - The parameters for the content post comments request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getPostComments(
    params: GetContentPostCommentsParams,
    options: RequestOptions = {}
  ): Promise<ContentPostCommentsResponse> {
    return this.#client.proRequest<ContentPostCommentsResponse>(
      'v1/content/posts/comments',
      deepmerge({ searchParams: noUndefined(params) }, options)
    );
  }

  /**
   * Returns the latest crypto-related posts from the CMC Community.
   *
   * @param params - The parameters for the content latest posts request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getLatestPosts(
    params: GetContentLatestPostsParams = {},
    options: RequestOptions = {}
  ): Promise<ContentLatestPostsResponse> {
    return this.#client.proRequest<ContentLatestPostsResponse>(
      'v1/content/posts/latest',
      deepmerge({ searchParams: noUndefined(params) }, options)
    );
  }

  /**
   * Returns the top crypto-related posts from the CMC Community.
   *
   * @param params - The parameters for the content top posts request.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the API response.
   */
  async getTopPosts(
    params: GetContentTopPostsParams = {},
    options: RequestOptions = {}
  ): Promise<ContentTopPostsResponse> {
    return this.#client.proRequest<ContentTopPostsResponse>(
      'v1/content/posts/top',
      deepmerge({ searchParams: noUndefined(params) }, options)
    );
  }
}
