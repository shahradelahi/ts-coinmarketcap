/**
 * @description Represents the platform on which a cryptocurrency runs.
 */
export interface Platform {
  /**
   * The unique ID of the platform.
   * @example 1027
   */
  id: number;
  /**
   * The name of the platform.
   * @example "Ethereum"
   */
  name: string;
  /**
   * The trading symbol of the platform.
   * @example "ETH"
   */
  symbol: string;
  /**
   * The URL-friendly slug of the platform.
   * @example "ethereum"
   */
  slug: string;
  /**
   * The token address on the platform.
   * @example "0xdac17f958d2ee523a2206206994597c13d831ec7"
   */
  token_address: string;
}
