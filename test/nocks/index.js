const nock = require("nock");

const nockGetOrders = (options) => {
  const url = "http://localhost:4000";
  const path = '/status';

  return nock(url).get(path).reply(400, options.ordemMock);

};

const cleanAll = () => {
  nock.cleanAll();
};

module.exports = { nockGetOrders, cleanAll };