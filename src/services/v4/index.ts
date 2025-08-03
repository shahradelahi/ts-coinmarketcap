import type { CoinMarketCap } from '@/client';

import { DEX } from './dex';

export class V4Service {
  readonly #client: CoinMarketCap;
  public dex: DEX;

  constructor(client: CoinMarketCap) {
    this.#client = client;
    this.dex = new DEX(this.#client);
  }
}
