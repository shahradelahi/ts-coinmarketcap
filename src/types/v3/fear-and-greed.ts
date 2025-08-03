import type { Status } from '@/types/common';

export interface FearAndGreedHistoricalParams {
  start?: number;
  limit?: number;
}

export interface FearAndGreedHistoricalData {
  timestamp: string;
  value: number;
  value_classification: string;
}

export interface FearAndGreedHistoricalResponse {
  data: FearAndGreedHistoricalData[];
  status: {
    timestamp: string;
    error_code: number;
    error_message: string;
    elapsed: number;
    credit_count: number;
    notice: string;
  };
}

/**
 * @description Represents the latest CMC Crypto Fear and Greed value.
 */
export interface FearAndGreedLatestData {
  value: number;
  value_classification: string;
  update_time: string;
}

/**
 * @description The root interface for the CMC Crypto Fear and Greed latest API response.
 */
export interface FearAndGreedLatestResponse {
  data: FearAndGreedLatestData;
  status: Status;
}
