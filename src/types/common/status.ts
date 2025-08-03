/**
 * @description The structure of the 'status' object in the API response.
 */
export interface Status {
  /**
   * Current timestamp on the server.
   * @example "2025-07-14T12:17:12.162Z"
   */
  timestamp: string;
  /**
   * An internal error code for the current error. If not 0, see the error message for details.
   * @example 0
   */
  error_code: number;
  /**
   * An error message to go along with the error code.
   * @example null
   */
  error_message: string | null;
  /**
   * Number of milliseconds taken to generate this response.
   * @example 34
   */
  elapsed: number;
  /**
   * The number of API credits this request used.
   * @example 1
   */
  credit_count: number;
  /**
   * A notice about this API endpoint.
   * @example null
   */
  notice?: string | null;
}
