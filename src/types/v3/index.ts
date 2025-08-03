import type { Status } from '@/types/common';
import type { GetExchangeMarketPairsLatestParams } from '@/types/v1';
import { CryptocurrencyQuote, GetQuotesLatestParams } from '@/types/v2';

export type * from './chart-annotation';
export type * from './chatbot';
export type * from './crypto-purchase';
export type * from './cryptocurrency';
export type * from './exchange-pair-info';
export type * from './exchange-market-pairs';
export type * from './fear-and-greed';
export type * from './market-pair';
export type * from './cmc100-index';
export type * from './news';

export type GetExchangeCryptoListingParams = Pick<
  GetExchangeMarketPairsLatestParams,
  'id' | 'slug' | 'limit' | 'start'
> &
  Pick<GetQuotesLatestParams, 'convert' | 'convert_id' | 'aux' | 'skip_invalid'>;

export interface GetExchangeCryptoListingResponse {
  data: CryptocurrencyQuote[];
  status: Status;
}
