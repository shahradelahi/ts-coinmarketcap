/**
 * @description Represents common properties for a cryptocurrency asset.
 */
export interface CryptoAsset {
  /**
   * The unique ID of the cryptocurrency.
   * @example 1
   */
  id: number;
  /**
   * The name of the cryptocurrency.
   * @example "Bitcoin"
   */
  name: string;
  /**
   * The trading symbol.
   * @example "BTC"
   */
  symbol: string;
  /**
   * The URL-friendly slug.
   * @example "bitcoin"
   */
  slug: string;
}
