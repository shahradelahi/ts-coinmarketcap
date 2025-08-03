import deepmerge from 'deepmerge';

import type { CoinMarketCap } from '@/client';
import type { RequestOptions } from '@/types';
import type { FixedQuestionsResponse, GetFixedQuestionsParams } from '@/types/v3';
import { noUndefined } from '@/utils/object';

export class Chatbot {
  #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Fetches fixed questions for the chatbot.
   *
   * @param params - The parameters for the fixed questions request.
   * @param options - Request options to override client defaults.
   * @returns A Promise resolving to the fixed questions response.
   */
  async getFixedQuestions(
    params: GetFixedQuestionsParams,
    options: RequestOptions = {}
  ): Promise<FixedQuestionsResponse> {
    const { id, slug, langCode = 'en' } = params;
    const searchParams = noUndefined({ id, slug, langCode });

    return this.#client.freeRequest<FixedQuestionsResponse>(
      'chatbot/v3/question/fixed-question',
      deepmerge({ searchParams }, options)
    );
  }
}
