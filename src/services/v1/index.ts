import type { CoinMarketCap } from '@/client';

import { Blockchain } from './blockchain';
import { Community } from './community';
import { Content } from './content';
import { Cryptocurrency } from './cryptocurrency';
import { Exchange } from './exchange';
import { FiatService } from './fiat';
import { GlobalMetrics } from './global-metrics';

export class V1Service {
  readonly #client: CoinMarketCap;
  public cryptocurrency: Cryptocurrency;
  public content: Content;
  public community: Community;
  public fiat: FiatService;
  public blockchain: Blockchain;
  public exchange: Exchange;
  public globalMetrics: GlobalMetrics;

  constructor(client: CoinMarketCap) {
    this.#client = client;
    this.cryptocurrency = new Cryptocurrency(this.#client);
    this.content = new Content(this.#client);
    this.community = new Community(this.#client);
    this.fiat = new FiatService(this.#client);
    this.blockchain = new Blockchain(this.#client);
    this.exchange = new Exchange(this.#client);
    this.globalMetrics = new GlobalMetrics(this.#client);
  }
}
