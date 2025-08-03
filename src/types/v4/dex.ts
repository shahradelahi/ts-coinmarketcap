/**
 * @description Defines the parameters for fetching DEX listings info.
 */
export interface GetDEXListingsInfoParams {
  /**
   * One or more comma-separated CoinMarketCap cryptocurrency exchange ids.
   * @example "1,2"
   */
  id: string | number | number[];
  /**
   * Optionally specify a comma-separated list of supplemental data fields to return.
   * @example "urls,logo"
   */
  aux?:
    | ('urls' | 'logo' | 'description' | 'date_launched' | 'notice')
    | ('urls' | 'logo' | 'description' | 'date_launched' | 'notice')[];
}

/**
 * @description Defines the parameters for fetching DEX listings quotes.
 */
export interface GetDEXListingsQuotesParams {
  /**
   * Optionally offset the start (1-based index) of the paginated list of items to return.
   * @example "1"
   */
  start?: string;
  /**
   * Optionally specify the number of results to return.
   * @example "100"
   */
  limit?: string;
  /**
   * What field to sort the list of exchanges by.
   * @default "volume_24h"
   */
  sort?: 'name' | 'volume_24h' | 'market_share' | 'num_markets';
  /**
   * The direction in which to order exchanges against the specified sort.
   * @default "desc"
   */
  sort_dir?: 'asc' | 'desc';
  /**
   * The category for this exchange.
   * @default "all"
   */
  type?: 'all' | 'orderbook' | 'swap' | 'aggregator';
  /**
   * Optionally specify a comma-separated list of supplemental data fields to return.
   * @example "date_launched"
   */
  aux?: 'date_launched' | 'date_launched'[];
  /**
   * Optionally calculate market quotes in up to 30 currencies at once by passing a comma-separated list of cryptocurrency or fiat currency IDs.
   * @example "2781"
   */
  convert_id?: string | string[];
}

/**
 * @description Defines the parameters for fetching the DEX networks list.
 */
export interface GetDEXNetworksListParams {
  /**
   * Optionally offset the start (1-based index) of the paginated list of items to return.
   * @example "1"
   */
  start?: string;
  /**
   * Optionally specify the number of results to return.
   * @example "100"
   */
  limit?: string;
  /**
   * What field to sort the list of networks by.
   * @default "id"
   */
  sort?: 'id' | 'name';
  /**
   * The direction in which to order networks against the specified sort.
   * @default "desc"
   */
  sort_dir?: 'asc' | 'desc';
  /**
   * Optionally specify a comma-separated list of supplemental data fields to return.
   * @example "alternativeName,cryptocurrencyId"
   */
  aux?:
    | (
        | 'alternativeName'
        | 'cryptocurrencyId'
        | 'cryptocurrenySlug'
        | 'wrappedTokenId'
        | 'wrappedTokenSlug'
        | 'tokenExplorerUrl'
        | 'poolExplorerUrl'
        | 'transactionHashUrl'
      )
    | (
        | 'alternativeName'
        | 'cryptocurrencyId'
        | 'cryptocurrenySlug'
        | 'wrappedTokenId'
        | 'wrappedTokenSlug'
        | 'tokenExplorerUrl'
        | 'poolExplorerUrl'
        | 'transactionHashUrl'
      )[];
}

/**
 * @description An object containing various resource URLs for this exchange.
 */
export interface DEXUrls {
  /**
   * The official website URL.
   * @example ["https://uniswap.org/"]
   */
  website: string[];
  /**
   * The official Twitter profile URL.
   * @example ["https://twitter.com/Uniswap"]
   */
  twitter: string[];
  /**
   * The official blog URL.
   * @example ["https://uniswap.org/blog/"]
   */
  blog: string[];
  /**
   * The official chat/community URL (e.g., Discord, Telegram).
   * @example ["https://discord.gg/FCfyYyb"]
   */
  chat: string[];
  /**
   * The URL to the exchange's fee structure documentation.
   * @example ["https://uniswap.org/docs/v2/protocol-overview/fees/"]
   */
  fee: string[];
}

/**
 * @description Represents static metadata for a decentralised exchange.
 */
export interface DEXInfo {
  /**
   * The unique CoinMarketCap ID for this exchange.
   * @example 1
   */
  id: number;
  /**
   * The name of this exchange.
   * @example "Uniswap"
   */
  name: string;
  /**
   * The web URL friendly shorthand version of this exchange name.
   * @example "uniswap"
   */
  slug: string;
  /**
   * Current status of the DEX.
   * @example "active"
   */
  status: 'active' | 'inactive';
  /**
   * Timestamp (ISO 8601) of the date this exchange launched.
   * @example "2018-11-02T00:00:00.000Z"
   */
  date_launched?: string;
  /**
   * A CoinMarketCap supplied brief description of this DEX.
   * @example "A fully decentralized protocol for automated liquidity provision on Ethereum."
   */
  description?: string;
  /**
   * Link to a CoinMarketCap hosted logo png for this exchange.
   * @example "https://s2.coinmarketcap.com/static/img/exchanges/64x64/270.png"
   */
  logo?: string;
  /**
   * A Markdown formatted message outlining a condition impacting the exchange.
   * @example "This is a notice"
   */
  notice?: string;
  /**
   * An object containing various resource URLs for this exchange.
   */
  urls?: DEXUrls;
}

/**
 * @description Represents a market quote for a DEX in a specific currency.
 */
export interface DEXQuote {
  /**
   * The currency ID for this quote.
   * @example "2781"
   */
  convert_id: string;
  /**
   * Timestamp (ISO 8601) of the last time this quote was updated.
   * @example "2025-07-11T08:06:06Z"
   */
  last_updated: string;
  /**
   * The type of market for this quote.
   * @example "spot"
   */
  market_type: string;
  /**
   * The number of transactions in the last 24 hours.
   * @example 12345
   */
  num_transactions_24h: number;
  /**
   * The percentage change in volume over the last 24 hours.
   * @example 0.5
   */
  percent_change_volume_24h: number;
  /**
   * The trading volume in the last 24 hours for the quoted currency.
   * @example 1000000
   */
  volume_24h: number;
}

/**
 * @description Represents the latest aggregate market data for a DEX.
 */
export interface DEXLatest extends DEXInfo {
  /**
   * Timestamp (ISO 8601) of the last time this record was updated.
   * @example "2025-07-11T08:06:06Z"
   */
  last_updated: string;
  /**
   * Percentage of DEX market share based on volume.
   * @example 0.5
   */
  market_share: number;
  /**
   * The number of trading pairs actively tracked on this exchange.
   * @example "100"
   */
  num_market_pairs: string;
  /**
   * A map of market quotes in different currency conversions.
   */
  quote: DEXQuote[];
  /**
   * The type of DEX this exchange is.
   * @example "swap"
   */
  type: string;
}

/**
 * @description Represents a single DEX network.
 */
export interface DEXNetwork {
  /**
   * The unique CoinMarketCap ID for this network.
   * @example 1
   */
  id: number;
  /**
   * The name of this network.
   * @example "Ethereum"
   */
  name: string;
  /**
   * The slug of the network.
   * @example "ethereum"
   */
  network_slug: string;
  /**
   * The alternate name for this network.
   * @example "ETH"
   */
  alternativeName?: string;
  /**
   * The unique CoinMarketCap identifier for the cryptocurrency associated with this network.
   * @example "1027"
   */
  cryptocurrencyId?: string;
  /**
   * The slug (URL-friendly name) for the associated cryptocurrency.
   * @example "ethereum"
   */
  cryptocurrencySlug?: string;
  /**
   * The URL for exploring liquidity pools on this network.
   * @example "https://etherscan.io/address/"
   */
  poolExplorerUrl?: string;
  /**
   * The URL for exploring tokens on this network.
   * @example "https://etherscan.io/token/"
   */
  tokenExplorerUrl?: string;
  /**
   * The URL for exploring transaction hashes on this network.
   * @example "https://etherscan.io/tx/"
   */
  transactionHashUrl?: string;
  /**
   * The unique identifier for the wrapped token on this network.
   * @example "2781"
   */
  wrappedTokenId?: string;
  /**
   * The slug (URL-friendly name) for the wrapped token on this network.
   * @example "wrapped-bitcoin"
   */
  wrappedTokenSlug?: string;
}

/**
 * @description The root interface for the DEX listings info API response.
 */
export type DEXListingsInfoResponse = DEXInfo[];
/**
 * @description The root interface for the DEX listings quotes API response.
 */
export type DEXListingsQuotesResponse = DEXLatest[];
/**
 * @description The root interface for the DEX networks list API response.
 */
export type DEXNetworksListResponse = DEXNetwork[];
