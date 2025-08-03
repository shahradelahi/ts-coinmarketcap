export interface WebExchange {
  id: number;
  name: string;
  slug: string;
  is_active: number;
  status: number;
  rank: number;
  first_historical_data: string;
  last_historical_data: string;
}

export interface WebExchangesRawResponse {
  fields: string[];
  values: [number, string, string, number, number, number, string, string][];
}

export interface WebExchangesResponse {
  data: WebExchange[];
}
