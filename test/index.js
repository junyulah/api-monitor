const {
  checkApi
} = require('..');
const http = require('http');
const assert = require('assert');

describe('index', () => {
  it('base', async () => {
    const server = http.createServer((req, res) => {
      res.write('ok');
      res.end();
    }).listen(7000);

    await checkApi({
      api: {
        options: {
          port: 7000
        }
      }
    });

    server.close();
  });

  it('base', (done) => {
    const server = http.createServer((req, res) => {
      res.statusCode = 500;
      res.end();
    }).listen(7000);

    checkApi({
      api: {
        options: {
          port: 7000
        }
      }
    }).catch(err => {
      assert(err.toString().indexOf('response code is 500') !== -1);
      server.close();
      done();
    });
  });
});
