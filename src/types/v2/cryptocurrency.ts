import type { Platform, Status } from '@/types/common';
import { Tag } from '@/types/v2';

/**
 * @description Defines the parameters for fetching cryptocurrency metadata.
 */
export interface GetCryptocurrencyInfoParams {
  /** One or more comma-separated CoinMarketCap cryptocurrency IDs. Example: "1,2" */
  id?: string | number | number[];
  /** Alternatively pass a comma-separated list of cryptocurrency slugs. Example: "bitcoin,ethereum" */
  slug?: string | string[];
  /** Alternatively pass one or more comma-separated cryptocurrency symbols. Example: "BTC,ETH" */
  symbol?: string | string[];
  /** Alternatively pass in a contract address. Example: "0xc40af1e4fecfa05ce6bab79dcd8b373d2e436c4e" */
  address?: string;
  /** Pass true to relax request validation rules. */
  skip_invalid?: boolean;
  /** Optionally specify a comma-separated list of supplemental data fields to return. */
  aux?:
    | string
    | Array<
        'urls' | 'logo' | 'description' | 'tags' | 'platform' | 'date_added' | 'notice' | 'status'
      >;
}

/**
 * @description Contains all static metadata available for a cryptocurrency.
 */
export interface CryptocurrencyInfo {
  urls: {
    website: string[];
    technical_doc: string[];
    twitter: string[];
    reddit: string[];
    message_board: string[];
    announcement: string[];
    chat: string[];
    explorer: string[];
    source_code: string[];
  };
  logo: string;
  id: number;
  name: string;
  symbol: string;
  slug: string;
  description: string;
  date_added: string;
  date_launched: string;
  tags: Tag[];
  platform: Platform | null;
  category: string;
  notice?: string;
  status?: string;
  contract_address?: {
    contract_address: string;
    platform: {
      name: string;
      coin: {
        id: string;
        name: string;
        symbol: string;
        slug: string;
      };
    };
  }[];
  self_reported_circulating_supply?: number | null;
  self_reported_market_cap?: number | null;
  self_reported_tags?: string[] | null;
  infinite_supply?: boolean;
}

/**
 * @description The root interface for the cryptocurrency info API response.
 */
export interface CryptocurrencyInfoResponse {
  data: Record<string, CryptocurrencyInfo>;
  status: Status;
}
