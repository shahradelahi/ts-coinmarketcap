import type { Status } from '@/types/common';

/**
 * @description Represents an asset associated with content.
 */
export interface ContentAsset {
  id: number;
  name: string;
  symbol: string;
  slug: string;
}

/**
 * @description Represents a single content object from the Content Latest API.
 */
export interface Content {
  cover: string;
  assets: ContentAsset[];
  created_at: string;
  released_at: string;
  title: string;
  subtitle: string;
  type: string;
  source_name: string;
  source_url: string;
}

/**
 * @description The root interface for the Content Latest API response.
 */
export interface ContentLatestResponse {
  data: Content[];
  status: Status;
}

/**
 * @description Defines the parameters for fetching the latest content.
 */
export interface GetContentLatestParams {
  /**
   * Optionally offset the start (1-based index) of the paginated list of items to return.
   */
  start?: number;
  /**
   * Optionally specify the number of results to return. Use this parameter and the "start" parameter to determine your own pagination size.
   */
  limit?: number;
  /**
   * Optionally pass a comma-separated list of CoinMarketCap cryptocurrency IDs. Example: "1,1027"
   */
  id?: string | number | number[];
  /**
   * Optionally pass a comma-separated list of cryptocurrency slugs. Example: "bitcoin,ethereum"
   */
  slug?: string | string[];
  /**
   * Optionally pass a comma-separated list of cryptocurrency symbols. Example: "BTC,ETH". Optionally pass "id" or "slug" or "symbol" is required for this request.
   */
  symbol?: string | string[];
  /**
   * Optionally specify a comma-separated list of supplemental data fields: news, community, or alexandria to filter news sources. Pass all or leave it blank to include all news types.
   */
  news_type?: 'all' | 'news' | 'community' | 'alexandria' | string | string[];
  /**
   * Optionally specify a comma-separated list of supplemental data fields: news, video, or audio to filter news's content. Pass all or leave it blank to include all content types.
   */
  content_type?: 'all' | 'news' | 'video' | 'audio' | string | string[];
  /**
   * Optionally pass a comma-separated list of categories. Example: "GameFi,NFT".
   */
  category?: string | string[];
  /**
   * Optionally pass a language code. Example: "en". If not specified the default value is "en".
   */
  language?: string;
}

/**
 * @description Represents an owner of a content post comment.
 */
export interface ContentPostCommentOwner {
  nickname: string;
  avatar_url: string;
}

/**
 * @description Represents a single comment of a CMC Community post.
 */
export interface ContentPostComment {
  post_id: string;
  owner: ContentPostCommentOwner;
  text_content: string;
  photos: string[];
  comment_count: string;
  like_count: string;
  post_time: string;
  language_code: string;
}

/**
 * @description The root interface for the Content Post Comments API response.
 */
export interface ContentPostCommentsResponse {
  data: ContentPostComment[];
  status: Status;
}

/**
 * @description Defines the parameters for fetching comments of a CMC Community post.
 */
export interface GetContentPostCommentsParams {
  /**
   * Required post ID. Example: 325670123
   */
  post_id: string;
}

/**
 * @description Represents the owner of a content post.
 */
export interface ContentPostOwner {
  nickname: string;
  avatar_url: string;
}

/**
 * @description Represents a cryptocurrency mentioned in a content post.
 */
export interface ContentPostCurrency {
  id: number;
  symbol: string;
  slug: string;
}

/**
 * @description Represents a single crypto-related post from the CMC Community.
 */
export interface ContentPost {
  post_id: string;
  comments_url: string;
  owner: ContentPostOwner;
  text_content: string;
  photos: string[];
  comment_count: string;
  like_count: string;
  post_time: string;
  currencies: ContentPostCurrency[];
  repost_count?: string;
  language_code: string;
}

/**
 * @description The root interface for the Content Latest Posts API response.
 */
export interface ContentLatestPostsResponse {
  data: {
    list: ContentPost[];
    last_score: string;
  };
  status: Status;
}

/**
 * @description Defines the parameters for fetching the latest crypto-related posts from the CMC Community.
 */
export interface GetContentLatestPostsParams {
  /**
   * Optional one cryptocurrency CoinMarketCap ID. Example: 1027
   */
  id?: string;
  /**
   * Alternatively pass one cryptocurrency slug. Example: "ethereum"
   */
  slug?: string;
  /**
   * Alternatively pass one cryptocurrency symbols. Example: "ETH"
   */
  symbol?: string;
  /**
   * Optional. The score is given in the response for finding next batch posts. Example: 1662903634322
   */
  last_score?: string;
}

/**
 * @description The root interface for the Content Top Posts API response.
 */
export interface ContentTopPostsResponse {
  data: {
    list: ContentPost[];
    last_score: string;
  };
  status: Status;
}

/**
 * @description Defines the parameters for fetching the top crypto-related posts from the CMC Community.
 */
export interface GetContentTopPostsParams {
  /**
   * Optional one cryptocurrency CoinMarketCap ID. Example: 1027
   */
  id?: string;
  /**
   * Alternatively pass one cryptocurrency slug. Example: "ethereum"
   */
  slug?: string;
  /**
   * Alternatively pass one cryptocurrency symbols. Example: "ETH"
   */
  symbol?: string;
  /**
   * Optional. The score is given in the response for finding next batch of related posts. Example: 38507.8865
   */
  last_score?: string;
}
