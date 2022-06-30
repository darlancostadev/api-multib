const supertest = require("supertest");
const server = require("../../lib/server");

const { dropCollection } = require("../../database/db");

let app;

const ordemMock = {
  name: "Preparando pedido",
  orderId: "123abc",
  value: 100,
};

const ordemMockError = {
  orderId: "123abc",
  value: 100,
};

describe("Status integration tests", async() => {
  before(async () => {
    app = await server.start();
  });

  after(async () => {
    await server.stop();
  });

  afterEach(async () => {
    await dropCollection("status");
  });

  it("Should return 201 when creating an order", async () => {
    await supertest(app)
      .post("/status")
      .send(ordemMock)
      .set("Content-Type", "application/json")
      .expect(201);
  });

  it("Should return 400 if you don't create an order", async () => {
    await supertest(app)
      .post("/status")
      .send(ordemMockError)
      .set("Content-Type", "application/json")
      .expect(400);
  });
});
