import { expect } from 'chai';

import { CoinMarketCap } from '../../client';

describe('WebService', () => {
  describe('getAboutSection', () => {
    it('should correctly parse the about section from __NEXT_DATA__', async () => {
      const client = new CoinMarketCap();
      const mockHtml = `
        <!DOCTYPE html>
        <html>
          <body>
            <script id="__NEXT_DATA__" type="application/json">
              {
                "props": {
                  "pageProps": {
                    "cdpFaqData": {
                      "faqDescription": [
                        { "q": "Question 1", "a": "Answer 1", "isQ": true },
                        { "q": "Question 2", "a": "Answer 2", "isQ": false }
                      ]
                    }
                  }
                }
              }
            </script>
          </body>
        </html>
      `;

      (client as any).freeRequest = async () => Promise.resolve(mockHtml);

      const aboutSection = await client.web.getAboutSection({ slug: 'testcoin' });

      expect(aboutSection.data).to.be.an('array').with.lengthOf(2);
      expect(aboutSection.data[0]).to.deep.equal({
        title: 'Question 1',
        content: 'Answer 1',
        isQuestion: true,
      });
      expect(aboutSection.data[1]).to.deep.equal({
        title: 'Question 2',
        content: 'Answer 2',
        isQuestion: false,
      });
    });

    it('should return an empty array if faqDescription is empty', async () => {
      const client = new CoinMarketCap();
      const mockHtml = `
        <!DOCTYPE html>
        <html>
          <body>
            <script id="__NEXT_DATA__" type="application/json">
              {
                "props": {
                  "pageProps": {
                    "cdpFaqData": {
                      "faqDescription": []
                    }
                  }
                }
              }
            </script>
          </body>
        </html>
      `;

      (client as any).freeRequest = async () => Promise.resolve(mockHtml);

      const aboutSection = await client.web.getAboutSection({ slug: 'testcoin' });

      expect(aboutSection.data).to.be.an('array').that.is.empty;
    });
  });
});
