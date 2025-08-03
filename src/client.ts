import { randomBase36 } from '@se-oss/rand';
import deepmerge from 'deepmerge';
import ky, { Options, type KyInstance } from 'ky';

import { Status } from '@/types/common';

import {
  V1Service,
  V2Service,
  V3_1Service,
  V3_3Service,
  V3Service,
  V4Service,
  WebService,
} from './services';
import type { CoinMarketCapOptions, RequestOptions } from './types';

/**
 * A client for interacting with the CoinMarketCap API.
 * It encapsulates a pre-configured ky instance for making requests.
 */
export class CoinMarketCap {
  readonly #publicAPI: KyInstance;
  readonly #proAPI: KyInstance;

  public v1: V1Service;
  public v2: V2Service;
  public v3: V3Service;
  public v3_1: V3_1Service;
  public v3_3: V3_3Service;
  public v4: V4Service;
  public web: WebService;

  /**
   * Initializes the CoinMarketCap client with the specified configuration.
   * @param options - Configuration for the client, including API type and credentials.
   */
  constructor(options: CoinMarketCapOptions = {}) {
    const { apiKey, sandbox = false, kyOptions = {} } = options;

    const config: Options = {
      hooks: {
        beforeError: [
          async (error) => {
            const { response } = error;
            if (response && response.body) {
              const json = (await response.json()) as { status?: Status };
              error.name = 'CoinMarketCapAPIError';
              if (!json.status) return error;
              error.message = json.status.error_message || response.statusText;
            }
            return error;
          },
        ],
      },
    };

    this.#publicAPI = ky.create(
      deepmerge(
        {
          ...config,
          prefixUrl: 'https://api.coinmarketcap.com/',
          referrer: 'https://coinmarketcap.com/',
          credentials: 'include',
          headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:140.0) Gecko/20100101 Firefox/140.0',
            Accept: 'application/json;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Sec-GPC': '1',
            'x-request-id': randomBase36(32),
            Referrer: 'https://coinmarketcap.com/',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'cross-site',
            Priority: 'u=0, i',
          },
          method: 'GET',
          mode: 'cors',
        },
        kyOptions
      )
    );

    this.#proAPI = ky.create(
      deepmerge(
        {
          ...config,
          prefixUrl: sandbox
            ? 'https://sandbox-api.coinmarketcap.com/'
            : 'https://pro-api.coinmarketcap.com/',
          headers: {
            'X-CMC_PRO_API_KEY': sandbox ? 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c' : apiKey,
            Accept: 'application/json',
          },
        },
        kyOptions
      )
    );

    this.v1 = new V1Service(this);
    this.v2 = new V2Service(this);
    this.v3 = new V3Service(this);
    this.v3_1 = new V3_1Service(this);
    this.v3_3 = new V3_3Service(this);
    this.v4 = new V4Service(this);
    this.web = new WebService(this);
  }

  /**
   * Performs a request to a specified CoinMarketCap API endpoint.
   *
   * @template T The expected type of the JSON response.
   * @param endpoint - The API endpoint to request (e.g., 'cryptocurrency/listing').
   * @param options - Ky request options, such as searchParams or method.
   * @returns A Promise that resolves to the parsed JSON response.
   */
  async freeRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.#request('public', endpoint, options);
  }

  /**
   * Performs a request to a specified CoinMarketCap PRO API endpoint.
   *
   * @template T The expected type of the JSON response.
   * @param endpoint - The API endpoint to request (e.g., 'cryptocurrency/listing').
   * @param options - Ky request options, such as searchParams or method.
   * @returns A Promise that resolves to the parsed JSON response.
   */
  async proRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.#request('pro', endpoint, options);
  }

  /**
   * Internal method to perform a request to either the public or pro CoinMarketCap API endpoint.
   *
   * @template T The expected type of the response, which can be JSON or text.
   * @param type - The type of API to request ('pro' or 'public').
   * @param endpoint - The API endpoint to request (e.g., 'cryptocurrency/listing').
   * @param options - Ky request options, such as searchParams, method, or responseType.
   * @returns A Promise that resolves to the parsed JSON response or raw text.
   */
  async #request<T>(
    type: 'pro' | 'public',
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const request =
      type === 'pro' ? this.#proAPI(endpoint, options) : this.#publicAPI(endpoint, options);
    const response = await request;

    if (options.responseType === 'text') {
      return (await response.text()) as T;
    }

    return await response.json<T>();
  }
}
