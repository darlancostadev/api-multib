const Status = require("../../lib/models/status");
const supertest = require("supertest");
const { assert } = require("chai");
const server = require("../../lib/server");
let app;

const ordemMock = {
  name: "Preparando pedido",
  orderId: "123abc",
  value: 100,
};

const getOrderbyId = {
  orderId: "123abc",
  value: 100,
  status: [
    {
      name: "Preparando pedido",
    },
  ],
};

describe("Get orders integration tests", async () => {
  before(async () => {
    app = await server.start();
    await new Status(ordemMock).save();
  });

  after(async () => {
    await server.stop();
  });

  it("Should return 200 when call route status", async () => {
    const { body } = await supertest(app)
      .get("/status")
      .set("Content-Type", "application/json")
      .expect(200);

    const [espect] = body;
    ordemMock.createdAt = espect.createdAt;
    assert.deepEqual(espect, ordemMock);
  });

  it("Should return 200 when call route status/orderId", async () => {
    const { body } = await supertest(app)
      .get("/status/123abc")
      .set("Content-Type", "application/json")
      .expect(200);

    getOrderbyId.createdAt = body.createdAt;
    getOrderbyId.status[0].createdAt = body.createdAt;
    assert.deepEqual(body, getOrderbyId);
  });
});
