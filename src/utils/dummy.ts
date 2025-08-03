import type { Status } from '@/types/common';

/**
 * Creates a default success status object.
 */
export function createSuccessStatus(status: Partial<Status> = {}): Status {
  return {
    timestamp: new Date().toISOString(),
    error_code: 0,
    error_message: 'SUCCESS',
    elapsed: 0,
    credit_count: 0,
    ...status,
  };
}
