import { DOMParser } from '@xmldom/xmldom';
import deepmerge from 'deepmerge';
import type { Options } from 'ky';

import type { CoinMarketCap } from '@/client';
import { RequestOptions } from '@/types';
import {
  AboutSection,
  CryptocurrencyAboutResponse,
  GetAboutSectionParams,
  GetAcademyArticleParams,
  GetAcademyArticleResponse,
  GetGlossaryTermParams,
  GetWhitepaperSummaryParams,
  GlossaryTermResponse,
  WebExchange,
  WebExchangesRawResponse,
  WebExchangesResponse,
  WebSearchCrypto,
  WebSearchRawResponse,
  WebSearchResponse,
  WhitepaperCoinsResponse,
  WhitepaperSummaryResponse,
} from '@/types/web';
import { createSuccessStatus } from '@/utils/dummy';

export class WebService {
  readonly #client: CoinMarketCap;

  constructor(client: CoinMarketCap) {
    this.#client = client;
  }

  /**
   * Fetches the pre-generated list of all searchable crypto assets.
   * This endpoint is used to power the main search bar on the website.
   *
   * @param options - Request options to override client defaults.
   * @returns A Promise resolving to the processed search data.
   */
  async getWebSearchData(options: RequestOptions = {}): Promise<WebSearchResponse> {
    const url = 'https://s3.coinmarketcap.com/generated/core/crypto/web-search.json';

    const rawResponse = await this.#client.freeRequest<WebSearchRawResponse>(
      url,
      deepmerge({ prefixUrl: '' }, options)
    );

    const data = rawResponse.values.map(
      ([id, name, symbol, slug, type, rank, address, search_score]): WebSearchCrypto => ({
        id,
        name,
        symbol,
        slug,
        type,
        rank,
        address,
        search_score,
      })
    );

    return {
      data,
      batch: rawResponse.batch,
    };
  }

  /**
   * Fetches the summary of a cryptocurrency's whitepaper.
   *
   * @param params - The parameters for the whitepaper summary request.
   * @param options - Request options to override client defaults.
   * @returns A Promise resolving to the whitepaper summary.
   */
  async getWhitepaperSummary(
    params: GetWhitepaperSummaryParams,
    options: Options = {}
  ): Promise<WhitepaperSummaryResponse> {
    const { slug, language = 'en' } = params;
    const url = `https://s3.coinmarketcap.com/whitepaper/summaries/${slug}/${language}.json`;

    return this.#client.freeRequest<WhitepaperSummaryResponse>(
      url,
      deepmerge({ prefixUrl: '' }, options)
    );
  }

  /**
   * Fetches the list of coins that have a whitepaper summary.
   *
   * @param options - Request options to override client defaults.
   * @returns A Promise resolving to the list of coins with whitepaper summaries.
   */
  async getWhitepaperCoins(options: RequestOptions = {}): Promise<WhitepaperCoinsResponse> {
    const url = 'https://s3.coinmarketcap.com/whitepaper/summaries/coins.json';

    return this.#client.freeRequest<WhitepaperCoinsResponse>(
      url,
      deepmerge({ prefixUrl: '' }, options)
    );
  }

  /**
   * Fetches the __NEXT_DATA__ script tag from a given page.
   *
   * @param url - The URL of the page to fetch.
   * @param options - Request options to override client defaults.
   * @returns A Promise resolving to the parsed __NEXT_DATA__ object.
   * @internal
   */
  async #getNextData(url: string, options: RequestOptions = {}) {
    const response = await this.#client.freeRequest<string>(
      url,
      deepmerge({ responseType: 'text', prefixUrl: '' }, options)
    );

    const doc = new DOMParser().parseFromString(response, 'text/html');
    const nextDataScript = doc.getElementById('__NEXT_DATA__');
    const nextDataJson = nextDataScript?.textContent || '{}';
    const nextData = JSON.parse(nextDataJson);
    return nextData;
  }

  /**
   * Scrapes the "About" section from a cryptocurrency's page on CoinMarketCap.
   *
   * @param params - The parameters for the about section request.
   * @param options - Request options to override client defaults.
   * @returns A Promise resolving to the scraped about section data.
   */
  async getAboutSection(
    params: GetAboutSectionParams,
    options: RequestOptions = {}
  ): Promise<CryptocurrencyAboutResponse> {
    const { slug } = params;
    const url = `https://coinmarketcap.com/currencies/${slug}/`;
    const nextData = await this.#getNextData(url, options);

    const faqDescription = nextData.props.pageProps.cdpFaqData.faqDescription as {
      q: string;
      a: string;
      isQ: boolean;
    }[];

    const about = faqDescription.map(
      (item): AboutSection => ({
        title: item.q,
        content: item.a,
        isQuestion: item.isQ,
      })
    );

    return {
      data: about,
      status: createSuccessStatus(),
    };
  }

  /**
   * Scrapes an article from the CoinMarketCap Academy.
   *
   * @param params - The parameters for the academy article request.
   * @param options - Request options to override client defaults.
   * @returns A Promise resolving to the scraped article data.
   */
  async getAcademyArticle(
    params: GetAcademyArticleParams,
    options: RequestOptions = {}
  ): Promise<GetAcademyArticleResponse> {
    const { slug } = params;
    const url = `https://coinmarketcap.com/academy/article/${slug}`;
    const nextData = await this.#getNextData(url, options);
    const { article, tableOfContent } = nextData.props.pageProps;

    const author = article.author
      ? {
          ...article.author,
          image: article.author.image || { original: '', optimized: '', thumbnail: '' },
        }
      : null;

    return {
      data: {
        ...article,
        tableOfContent: tableOfContent.map((item: { label: string; slug: string }) => ({
          text: item.label,
          href: `#${item.slug}`,
        })),
        author,
        image: article.image || { original: '', optimized: '', thumbnail: '' },
        related: article.related || [],
        assets: article.assets || [],
        categories: article.categories || [],
        difficulty: article.difficulty || { level: 0, label: '', slug: '', language: '' },
      },
      status: createSuccessStatus(),
    };
  }

  /**
   * Scrapes a glossary term from a glossary page on CoinMarketCap Academy.
   *
   * @param params - The parameters for the glossary term request.
   * @param options - Request options to override client defaults.
   * @returns A Promise resolving to the scraped glossary term data.
   */
  async getGlossaryTerm(
    params: GetGlossaryTermParams,
    options: RequestOptions = {}
  ): Promise<GlossaryTermResponse> {
    const { slug } = params;
    const url = `https://coinmarketcap.com/academy/glossary/${slug}`;
    const nextData = await this.#getNextData(url, options);

    const { glossary } = nextData.props.pageProps;

    return {
      data: {
        id: glossary.id,
        title: glossary.title,
        slug: glossary.slug,
        meta: glossary.meta,
        excerpt: glossary.excerpt,
        content: glossary.content,
        author: glossary.author,
        created_at: glossary.created_at,
        updated_at: glossary.updated_at,
        related: glossary.related,
        available_languages: glossary.available_languages,
        difficulty: glossary.difficulty,
      },
      status: createSuccessStatus(),
    };
  }

  /**
   * Fetches the pre-generated list of all exchanges.
   *
   * @param options - Request options to override client defaults.
   * @returns A Promise resolving to the processed exchange data.
   */
  async getExchanges(options: RequestOptions = {}): Promise<WebExchangesResponse> {
    const url = 'https://s3.coinmarketcap.com/generated/core/exchange/exchanges.json';

    const rawResponse = await this.#client.freeRequest<WebExchangesRawResponse>(
      url,
      deepmerge({ prefixUrl: '' }, options)
    );

    const data = rawResponse.values.map(
      ([
        id,
        name,
        slug,
        is_active,
        status,
        rank,
        first_historical_data,
        last_historical_data,
      ]): WebExchange => ({
        id,
        name,
        slug,
        is_active,
        status,
        rank,
        first_historical_data,
        last_historical_data,
      })
    );

    return {
      data,
    };
  }
}
