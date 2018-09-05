const http = require('http');
const log = console.log.bind(console); // eslint-disable-line
const chalk = require('chalk');

const httpRequest = ({
  options,
  data = null
}) => {
  if (data !== null && !options.method) {
    options.method = 'POST';
  }

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      const response = {
        statusCode: res.statusCode,
        headers: res.headers
      };

      const chunks = [];
      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        response.body = chunks.join();
        resolve(response);
      });
    });

    req.on('error', (err) => {
      reject(err);
    });
    if (data !== null) {
      req.write(data);
    }
    req.end();
  });
};

const info = (title, txt) => {
  log(chalk.blue(`[${title}-${new Date().toLocaleString()}] ${txt}.`));
};

const infoErr = (title, txt) => {
  log(chalk.red(`[${title}-${new Date().toLocaleString()}] ${txt}.`));
};

module.exports = {
  httpRequest,
  info,
  infoErr
};
