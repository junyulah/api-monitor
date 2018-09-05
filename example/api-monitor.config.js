const log = console.log; // eslint-disable-line

module.exports = {
  apis: [{
    api: {
      options: {
        host: 'some-fake-domain.com',
        port: '80',
        path: '/api/fake',
        headers: {
          cookie: 'a=123'
        }
      }
    },

    reporter: [{
      type: 'shell',
      cnt: 'ls'
    }, {
      type: 'http',
      cnt: (errMsg, monitorObj) => {
        return {
          options: {
            host: 'faketest.com',
            port: 80,
            path: '/api/report',
            headers: {
              'cache-control': 'no-cache',
            }
          },
          data: `${errMsg}, ${JSON.stringify(monitorObj)}.`
        };
      }
    }],

    period: 60 * 1000 // 60s
  }]
};
