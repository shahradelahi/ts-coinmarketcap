import type { CryptoAsset } from '@/types/common';

/**
 * @description Represents a single, structured cryptocurrency item from the web search results.
 */
export interface WebSearchCrypto extends CryptoAsset {
  type: number;
  rank: number;
  address: string[];
  search_score: number;
}

/**
 * @description Represents the processed response from the web search endpoint.
 */
export interface WebSearchResponse {
  data: WebSearchCrypto[];
  batch: string;
}

/**
 * @internal
 * @description Represents a raw value tuple from the web search API response.
 */
type WebSearchRawValue = [number, string, string, string, number, number, string[], number];

/**
 * @internal
 * @description Represents the raw, unprocessed JSON structure from the web-search.json endpoint.
 */
export interface WebSearchRawResponse {
  fields: string[];
  values: WebSearchRawValue[];
  batch: string;
}
