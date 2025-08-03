import type { CoinMarketCap } from '@/client';

import { Chart } from './chart';
import { Chatbot } from './chatbot';
import { Cmc100Index } from './cmc100-index';
import { CryptoPurchase } from './crypto-purchase';
import { Cryptocurrency } from './cryptocurrency';
import { Exchange } from './exchange';
import { FearAndGreed } from './fear-and-greed';
import { Market } from './market';
import { News } from './news';

export class V3Service {
  public fearAndGreed: FearAndGreed;
  public cryptoPurchase: CryptoPurchase;
  public cmc100Index: Cmc100Index;
  public cryptocurrency: Cryptocurrency;
  public exchange: Exchange;
  public market: Market;
  public chart: Chart;
  public news: News;
  public chatbot: Chatbot;

  constructor(client: CoinMarketCap) {
    this.fearAndGreed = new FearAndGreed(client);
    this.cryptoPurchase = new CryptoPurchase(client);
    this.cmc100Index = new Cmc100Index(client);
    this.cryptocurrency = new Cryptocurrency(client);
    this.exchange = new Exchange(client);
    this.market = new Market(client);
    this.chart = new Chart(client);
    this.news = new News(client);
    this.chatbot = new Chatbot(client);
  }
}
