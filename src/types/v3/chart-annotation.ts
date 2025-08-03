import type { Status } from '@/types/common';

/**
 * @description Defines the parameters for fetching chart annotations.
 */
export interface GetChartAnnotationsParams {
  /** The target cryptocurrency slug (e.g., "bitcoin"). */
  target: string;
  /** The interval for the annotations. */
  interval: 'all' | '1D' | '7D' | '1M' | '3M' | '1Y';
  /** The language code for the annotations. Defaults to 'en'. */
  language?: string;
}

/**
 * @description Represents a single annotation item.
 */
export interface AnnotationListItem {
  id: number;
  title: string;
  description: string;
  eventTime: string;
  priority: number;
  readMoreUrl: string;
  target: string;
  type: 'News' | 'Milestone' | 'Listings';
}

/**
 * @description Represents the latest TL;DR annotation.
 */
export interface LatestTldr {
  content: string;
  preview: string;
  eventTime: string;
}

/**
 * @description The structure of the 'data' object in the chart annotation response.
 */
export interface ChartAnnotationData {
  annotationList: AnnotationListItem[];
  groupNum: number;
  latestTldr: LatestTldr;
}

/**
 * @description The root interface for the chart annotation API response.
 */
export interface ChartAnnotationResponse {
  data: ChartAnnotationData;
  status: Status;
}
