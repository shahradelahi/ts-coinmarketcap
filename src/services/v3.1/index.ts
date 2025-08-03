import type { CoinMarketCap } from '@/client';

import { Cryptocurrency } from './cryptocurrency';

export class V3_1Service {
  readonly #client: CoinMarketCap;
  public cryptocurrency: Cryptocurrency;

  constructor(client: CoinMarketCap) {
    this.#client = client;
    this.cryptocurrency = new Cryptocurrency(this.#client);
  }
}
