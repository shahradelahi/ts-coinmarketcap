import { expect } from 'chai';

import { CoinMarketCap } from './client';

describe('CoinMarketCap Client', () => {
  it('should initialize and fetch from a public endpoint', async () => {
    const client = new CoinMarketCap();
    const response = await client.v3.cryptocurrency.getListing({ limit: 1 });

    expect(response).to.be.an('object');
    expect(response.status).to.be.an('object');
    expect(response.status.error_code).to.equal('0');
    expect(response.status.error_message).to.equal('SUCCESS');
    expect(response.data).to.be.an('object');
    expect(response.data.cryptoCurrencyList).to.be.an('array').with.lengthOf(1);
  });
});
