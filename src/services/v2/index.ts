import type { CoinMarketCap } from '@/client';

import { Cryptocurrency } from './cryptocurrency';
import { MarketPairs } from './marketPairs';
import { OHLCV } from './ohlcv';
import { PricePerformance } from './pricePerformance';
import { Quotes } from './quotes';
import { Tools } from './tools';

export class V2Service {
  readonly #client: CoinMarketCap;
  public cryptocurrency: Cryptocurrency;
  public marketPairs: MarketPairs;
  public ohlcv: OHLCV;
  public pricePerformance: PricePerformance;
  public quotes: Quotes;
  public tools: Tools;

  constructor(client: CoinMarketCap) {
    this.#client = client;
    this.cryptocurrency = new Cryptocurrency(this.#client);
    this.marketPairs = new MarketPairs(this.#client);
    this.ohlcv = new OHLCV(this.#client);
    this.pricePerformance = new PricePerformance(this.#client);
    this.quotes = new Quotes(this.#client);
    this.tools = new Tools(this.#client);
  }
}
