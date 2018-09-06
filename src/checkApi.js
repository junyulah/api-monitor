const {
  httpRequest
} = require('./util');

const checkApi = ({
  type = 'http',
  api,
  apiSender,
  responseChecker = defaultHttpResponseChecker
}) => {
  const help = () => {
    switch (type) {
      case 'http':
        return httpRequest(api);
      default:
        if (!apiSender) {
          throw new Error('missing api sender.');
        } else {
          return apiSender(api);
        }
    }
  };

  return help().then((response) => {
    if (responseChecker) {
      return responseChecker(response, api);
    }
  });
};

const defaultHttpResponseChecker = (response) => {
  if (response.statusCode !== 200) {
    throw new Error(`response code is ${response.statusCode}. Response body is "${response.body}".`);
  }
};

module.exports = {
  checkApi
};
