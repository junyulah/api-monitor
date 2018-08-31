const {httpRequest} = require('./util');

const checkApi = ({
  type = 'http',
  api,
  responseChecker = defaultHttpResponseChecker
}) => {
  const help = () => {
    switch (type) {
      case 'http':
        return httpRequest(api);
      default:
        throw new Error(`do not support ${type} type api check yet.`);
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
