import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type {
  BlockchainStatisticsLatestResponse,
  GetBlockchainStatisticsLatestParams,
} from '@/types/v1';
import { noUndefined } from '@/utils/object';

export class Blockchain {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Returns the latest blockchain statistics data for one or more blockchains.
   *
   * @param params - The options for the request.
   * @param options - Request options to override client defaults.
   * @returns {Promise<BlockchainStatisticsLatestResponse>} A promise that resolves with the latest statistics.
   * @see https://coinmarketcap.com/api/documentation/v1/#operation/getV1BlockchainStatisticsLatest
   */
  latestStatistics(
    params: GetBlockchainStatisticsLatestParams,
    options: RequestOptions = {}
  ): Promise<BlockchainStatisticsLatestResponse> {
    return this.#client.proRequest(
      'v1/blockchain/statistics/latest',
      deepmerge({ searchParams: noUndefined(params) }, options)
    );
  }
}
