import deepmerge from 'deepmerge';
import * as lodash from 'lodash-es';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type {
  CryptocurrencyInfo,
  CryptocurrencyInfoResponse,
  GetCryptocurrencyInfoParams,
  Tag,
} from '@/types/v2';
import { createSuccessStatus } from '@/utils/dummy';
import { noUndefined } from '@/utils/object';
import { chunkedRequest } from '@/utils/request';

export class Cryptocurrency {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Fetches metadata for one or more cryptocurrencies.
   * This endpoint is only available on the Pro API.
   *
   * @param params - The parameters for the info request, such as IDs, slugs, or symbols.
   * @param options - Request options to override client defaults.
   * @returns A Promise that resolves to the metadata API response.
   */
  async getInfo(
    params: GetCryptocurrencyInfoParams = {},
    options: RequestOptions = {}
  ): Promise<CryptocurrencyInfoResponse> {
    const maxSize = 500;
    if (
      (Array.isArray(params.id) && params.id.length > maxSize) ||
      (Array.isArray(params.slug) && params.slug.length > maxSize)
    ) {
      return {
        data: await chunkedRequest(this, this.getInfo, params, options, maxSize),
        status: createSuccessStatus(),
      };
    }

    const defaultParams = {
      aux: 'urls,logo,description,tags,platform,date_added,notice,status',
    };

    const combinedParams = { ...defaultParams, ...params };

    // Clean up params for the request to avoid sending undefined values
    const searchParams = noUndefined({
      ...combinedParams,
      id: Array.isArray(combinedParams.id) ? combinedParams.id.join(',') : combinedParams.id,
      slug: Array.isArray(combinedParams.slug)
        ? combinedParams.slug.join(',')
        : combinedParams.slug,
      symbol: Array.isArray(combinedParams.symbol)
        ? combinedParams.symbol.join(',')
        : combinedParams.symbol,
      aux: Array.isArray(combinedParams.aux) ? combinedParams.aux.join(',') : combinedParams.aux,
    });

    const response = await this.#client.proRequest<CryptocurrencyInfoResponse>(
      'v2/cryptocurrency/info',
      deepmerge({ searchParams }, options)
    );

    return {
      ...response,
      data: Object.fromEntries(
        Object.entries(response.data).map(([id, info]) => {
          const tags = (info as any).tags as string[];
          const tagNames = (info as any)['tag-names'] as string[];
          const tagGroups = (info as any)['tag-groups'] as string[];

          return [
            id,
            {
              ...lodash.omit(info, ['tag-names', 'tag-groups']),
              tags: tags
                ? tags.map(
                    (t, i): Tag => ({
                      slug: t,
                      name: tagNames[i]!,
                      category: tagGroups[i]!,
                    })
                  )
                : [],
            },
          ];
        })
      ) as Record<string, CryptocurrencyInfo>,
    };
  }
}
