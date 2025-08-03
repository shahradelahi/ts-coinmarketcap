<h1 align="center">
  <sup>ts-coinmarketcap</sup>
<br>
<a href="https://github.com/shahradelahi/ts-coinmarketcap/actions/workflows/ci.yml">
  <img src="https://github.com/shahradelahi/ts-coinmarketcap/actions/workflows/ci.yml/badge.svg" alt="CI">
</a>
<a href="https://www.npmjs.com/package/ts-coinmarketcap">
  <img src="https://img.shields.io/npm/v/ts-coinmarketcap.svg" alt="NPM Version">
</a>
<a href="/LICENSE">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat" alt="MIT License">
</a>
<a href="https://packagephobia.com/result?p=ts-coinmarketcap">
  <img src="https://packagephobia.com/badge?p=ts-coinmarketcap" alt="Install Size">
</a>
</h1>

<p align="center">
<i>ts-coinmarketcap</i> is a modern, lightweight, and fully-typed TypeScript client for the <a href="https://coinmarketcap.com">CoinMarketCap</a> API.
</p>

---

- [Installation](#-installation)
- [Usage](#-usage)
- [Supported Endpoints](#-supported-endpoints)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#license)

## 📦 Installation

```bash
npm install ts-coinmarketcap
```

<details>
<summary>Install using your favorite package manager</summary>

**pnpm**

```bash
pnpm install ts-coinmarketcap
```

**yarn**

```bash
yarn add ts-coinmarketcap
```

</details>

## 📖 Usage

### Basic Example (Pro API)

```typescript
import { CoinMarketCap } from 'ts-coinmarketcap';

// If you are using a Pro API endpoint, you need to provide an API key.
const client = new CoinMarketCap({ apiKey: 'YOUR_PRO_API_KEY' });

try {
  const response = await client.v2.quotes.getQuotesLatest({ symbol: 'BTC' });
  // The key for the data object is the cryptocurrency's CoinMarketCap ID.
  // Bitcoin's ID is 1.
  const btcData = response.data['1'];
  if (btcData && btcData.quote['USD']) {
    console.log(
      `The current price of Bitcoin is: $${btcData.quote['USD'].price.toFixed(2)}`
    );
  } else {
    console.log('Could not retrieve Bitcoin price data.');
  }
} catch (error) {
  console.error('Error fetching Bitcoin price:', error);
}
```

### Free Endpoint Example

Some endpoints do not require an API key.

```typescript
import { CoinMarketCap } from 'ts-coinmarketcap';

const client = new CoinMarketCap();

try {
  const listings = await client.v3.cryptocurrency.getListing({ limit: 5 });
  console.log('Top 5 Cryptocurrencies:');
  listings.data.cryptoCurrencyList.forEach((crypto) => {
    console.log(`${crypto.cmcRank}. ${crypto.name} (${crypto.symbol})`);
  });
} catch (error) {
  console.error('Error fetching listings:', error);
}
```

### Using Types

All response types from the API are exported and can be imported directly. This is useful for annotating your variables and function signatures. The types are organized by API version.

<!-- prettier-ignore -->
```typescript
// Example: V1 Types
import type { ListingsLatestResponse } from 'ts-coinmarketcap/types/v1';

// Example: V2 Types
import type { CryptocurrencyQuote, QuotesLatestResponse } from 'ts-coinmarketcap/types/v2';

// Example: V3 Types
import type { GetCryptocurrencyListingResponse } from 'ts-coinmarketcap/types/v3';
```

## ✨ Supported Endpoints

This library supports both Pro and Public API endpoints, organized by version.

<details>
<summary><strong>V1 Endpoints</strong></summary>

| Service             | Method Name                | HTTP Method | Endpoint                                     | API Type |
| :------------------ | :------------------------- | :---------- | :------------------------------------------- | :------- |
| `v1.blockchain`     | `latestStatistics`         | `GET`       | `/v1/blockchain/statistics/latest`           | Pro      |
| `v1.community`      | `getTrendingTokens`        | `GET`       | `/v1/community/trending/token`               | Pro      |
| `v1.community`      | `getTrendingTopics`        | `GET`       | `/v1/community/trending/topic`               | Pro      |
| `v1.content`        | `getContentLatest`         | `GET`       | `/v1/content/latest`                         | Pro      |
| `v1.content`        | `getPostComments`          | `GET`       | `/v1/content/posts/comments`                 | Pro      |
| `v1.content`        | `getLatestPosts`           | `GET`       | `/v1/content/posts/latest`                   | Pro      |
| `v1.content`        | `getTopPosts`              | `GET`       | `/v1/content/posts/top`                      | Pro      |
| `v1.cryptocurrency` | `getAirdrops`              | `GET`       | `/v1/cryptocurrency/airdrops`                | Pro      |
| `v1.cryptocurrency` | `getAirdrop`               | `GET`       | `/v1/cryptocurrency/airdrop`                 | Pro      |
| `v1.cryptocurrency` | `getCategory`              | `GET`       | `/v1/cryptocurrency/category`                | Pro      |
| `v1.cryptocurrency` | `getCategories`            | `GET`       | `/v1/cryptocurrency/categories`              | Pro      |
| `v1.cryptocurrency` | `getCryptocurrencyMap`     | `GET`       | `/v1/cryptocurrency/map`                     | Pro      |
| `v1.cryptocurrency` | `getHistoricalListings`    | `GET`       | `/v1/cryptocurrency/listings/historical`     | Pro      |
| `v1.cryptocurrency` | `getNewListings`           | `GET`       | `/v1/cryptocurrency/listings/new`            | Pro      |
| `v1.cryptocurrency` | `getListingsLatest`        | `GET`       | `/v1/cryptocurrency/listings/latest`         | Pro      |
| `v1.cryptocurrency` | `getTrendingGainersLosers` | `GET`       | `/v1/cryptocurrency/trending/gainers-losers` | Pro      |
| `v1.cryptocurrency` | `getTrendingLatest`        | `GET`       | `/v1/cryptocurrency/trending/latest`         | Pro      |
| `v1.cryptocurrency` | `getTrendingMostVisited`   | `GET`       | `/v1/cryptocurrency/trending/most-visited`   | Pro      |
| `v1.exchange`       | `getInfo`                  | `GET`       | `/v1/exchange/info`                          | Pro      |
| `v1.exchange`       | `getMap`                   | `GET`       | `/v1/exchange/map`                           | Pro      |
| `v1.exchange`       | `getListingsLatest`        | `GET`       | `/v1/exchange/listings/latest`               | Pro      |
| `v1.exchange`       | `getMarketPairsLatest`     | `GET`       | `/v1/exchange/market-pairs/latest`           | Pro      |
| `v1.exchange`       | `getQuotesHistorical`      | `GET`       | `/v1/exchange/quotes/historical`             | Pro      |
| `v1.exchange`       | `getQuotesLatest`          | `GET`       | `/v1/exchange/quotes/latest`                 | Pro      |
| `v1.fiat`           | `getMap`                   | `GET`       | `/v1/fiat/map`                               | Pro      |
| `v1.globalMetrics`  | `getQuotesHistorical`      | `GET`       | `/v1/global-metrics/quotes/historical`       | Pro      |
| `v1.globalMetrics`  | `getQuotesLatest`          | `GET`       | `/v1/global-metrics/quotes/latest`           | Pro      |

</details>

<details>
<summary><strong>V2 Endpoints</strong></summary>

| Service               | Method Name                      | HTTP Method | Endpoint                                            | API Type |
| :-------------------- | :------------------------------- | :---------- | :-------------------------------------------------- | :------- |
| `v2.cryptocurrency`   | `getInfo`                        | `GET`       | `/v2/cryptocurrency/info`                           | Pro      |
| `v2.marketPairs`      | `getMarketPairsLatest`           | `GET`       | `/v2/cryptocurrency/market-pairs/latest`            | Pro      |
| `v2.ohlcv`            | `getOHLCVLatest`                 | `GET`       | `/v2/cryptocurrency/ohlcv/latest`                   | Pro      |
| `v2.ohlcv`            | `getOHLCVHistorical`             | `GET`       | `/v2/cryptocurrency/ohlcv/historical`               | Pro      |
| `v2.pricePerformance` | `getPricePerformanceStatsLatest` | `GET`       | `/v2/cryptocurrency/price-performance-stats/latest` | Pro      |
| `v2.quotes`           | `getQuotesLatest`                | `GET`       | `/v2/cryptocurrency/quotes/latest`                  | Pro      |
| `v2.quotes`           | `getQuotesHistorical`            | `GET`       | `/v2/cryptocurrency/quotes/historical`              | Pro      |
| `v2.tools`            | `getPriceConversion`             | `GET`       | `/v2/tools/price-conversion`                        | Pro      |

</details>

<details>
<summary><strong>V3 Endpoints</strong></summary>

| Service             | Method Name                 | HTTP Method | Endpoint                                             | API Type |
| :------------------ | :-------------------------- | :---------- | :--------------------------------------------------- | :------- |
| `v3.chart`          | `getAnnotations`            | `GET`       | `/data-api/v3/chart-annotation`                      | Public   |
| `v3.chatbot`        | `getFixedQuestions`         | `GET`       | `/chatbot/v3/question/fixed-question`                | Public   |
| `v3.cmc100Index`    | `getHistorical`             | `GET`       | `/v3/index/cmc100-historical`                        | Pro      |
| `v3.cmc100Index`    | `getLatest`                 | `GET`       | `/v3/index/cmc100-latest`                            | Pro      |
| `v3.cryptoPurchase` | `getPurchaseChannels`       | `GET`       | `/data-api/v3/cryptocurrency/purchase/channel`       | Public   |
| `v3.cryptoPurchase` | `getPurchaseFlags`          | `POST`      | `/data-api/v3/cryptocurrency/purchase/flag`          | Public   |
| `v3.cryptocurrency` | `getListing`                | `GET`       | `/data-api/v3/cryptocurrency/listing`                | Public   |
| `v3.cryptocurrency` | `getDetailLite`             | `GET`       | `/data-api/v3/cryptocurrency/detail/lite`            | Public   |
| `v3.exchange`       | `getPairInfo`               | `GET`       | `/data-api/v3/cryptocurrency/web/exchange-pair-info` | Public   |
| `v3.exchange`       | `getMarketPairsLatest`      | `GET`       | `/data-api/v3/exchange/market-pairs/latest`          | Public   |
| `v3.fearAndGreed`   | `getFearAndGreedHistorical` | `GET`       | `/data-api/v3/fear-and-greed/historical`             | Public   |
| `v3.fearAndGreed`   | `getFearAndGreedLatest`     | `GET`       | `/data-api/v3/fear-and-greed/latest`                 | Public   |
| `v3.market`         | `getPairs`                  | `GET`       | `/data-api/v3/cryptocurrency/market-pairs/latest`    | Public   |
| `v3.news`           | `getTldrList`               | `POST`      | `/content/v3/news-tldr/list`                         | Public   |
| `v3.news`           | `getNews`                   | `GET`       | `/aggr/v3/news/cdp`                                  | Public   |

</details>

<details>
<summary><strong>V3.1 Endpoints</strong></summary>

| Service               | Method Name     | HTTP Method | Endpoint                                   | API Type |
| :-------------------- | :-------------- | :---------- | :----------------------------------------- | :------- |
| `v3.1.cryptocurrency` | `getHistorical` | `GET`       | `/data-api/v3.1/cryptocurrency/historical` | Public   |

</details>

<details>
<summary><strong>V3.3 Endpoints</strong></summary>

| Service | Method Name      | HTTP Method | Endpoint                                     | API Type |
| :------ | :--------------- | :---------- | :------------------------------------------- | :------- |
| `v3.3`  | `getDetailChart` | `GET`       | `/data-api/v3.3/cryptocurrency/detail/chart` | Public   |

</details>

<details>
<summary><strong>V4 Endpoints</strong></summary>

| Service            | Method Name          | HTTP Method | Endpoint                         | API Type |
| :----------------- | :------------------- | :---------- | :------------------------------- | :------- |
| `v4.dex`           | `getListingsInfo`    | `GET`       | `/v4/dex/listings/info`          | Pro      |
| `v4.dex`           | `getListingsQuotes`  | `GET`       | `/v4/dex/listings/quotes`        | Pro      |
| `v4.dex`           | `getNetworksList`    | `GET`       | `/v4/dex/networks/list`          | Pro      |
| `v4.dex.pairs`     | `getOHLCVHistorical` | `GET`       | `/v4/dex/pairs/ohlcv/historical` | Pro      |
| `v4.dex.pairs`     | `getOHLCVLatest`     | `GET`       | `/v4/dex/pairs/ohlcv/latest`     | Pro      |
| `v4.dex.pairs`     | `getQuotesLatest`    | `GET`       | `/v4/dex/pairs/quotes/latest`    | Pro      |
| `v4.dex.pairs`     | `getTradesLatest`    | `GET`       | `/v4/dex/pairs/trade/latest`     | Pro      |
| `v4.dex.spotPairs` | `getLatest`          | `GET`       | `/v4/dex/spot-pairs/latest`      | Pro      |

</details>

<details>
<summary><strong>Web Endpoints</strong></summary>

These endpoints scrape data directly from the CoinMarketCap website or their S3 buckets.

| Service | Method Name            | HTTP Method | Endpoint                                                                   | API Type |
| :------ | :--------------------- | :---------- | :------------------------------------------------------------------------- | :------- |
| `web`   | `getWebSearchData`     | `GET`       | `https://s3.coinmarketcap.com/generated/core/crypto/web-search.json`       | Public   |
| `web`   | `getWhitepaperSummary` | `GET`       | `https://s3.coinmarketcap.com/whitepaper/summaries/{slug}/{language}.json` | Public   |
| `web`   | `getWhitepaperCoins`   | `GET`       | `https://s3.coinmarketcap.com/whitepaper/summaries/coins.json`             | Public   |
| `web`   | `getAboutSection`      | `GET`       | `https://coinmarketcap.com/currencies/{slug}/`                             | Public   |
| `web`   | `getAcademyArticle`    | `GET`       | `https://coinmarketcap.com/academy/article/{slug}`                         | Public   |
| `web`   | `getGlossaryTerm`      | `GET`       | `https://coinmarketcap.com/academy/glossary/{slug}`                        | Public   |
| `web`   | `getExchanges`         | `GET`       | `https://s3.coinmarketcap.com/generated/core/exchange/exchanges.json`      | Public   |

</details>

## 📚 Documentation

For all configuration options, please see [the API docs](https://www.jsdocs.io/package/ts-coinmarketcap).

The official CoinMarketCap API documentation is available at [https://coinmarketcap.com/api/documentation/v1/](https://coinmarketcap.com/api/documentation/v1/). To get an API key, visit [https://coinmarketcap.com/api/](https://coinmarketcap.com/api/).

## 🤝 Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise issues on [GitHub](https://github.com/shahradelahi/ts-coinmarketcap)

Thanks again for your support, it is much appreciated! 🙏

## License

[MIT](/LICENSE) © [Shahrad Elahi](https://github.com/shahradelahi) and [contributors](https://github.com/shahradelahi/ts-coinmarketcap/graphs/contributors).

## Notice of Non-Affiliation and Disclaimer

We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with CoinMarketCap, or any of its subsidiaries or its affiliates. The official CoinMarketCap website can be found at https://coinmarketcap.com/.

The name CoinMarketCap as well as related names, marks, emblems and images are registered trademarks of their respective owners.
