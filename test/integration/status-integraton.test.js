const server = require("../../lib/server");
const request = require("supertest");
const { assert } = require("chai");

describe("Status integration tests", () => {
  before(async () => {
    app = await server.start();
  });

  after(() => {
    server.stop();
  });

  it("Should return 200 when call route status", async () => {
    await request(app)
      .get("/status")
      .set("Content-Type", "application/json")
      .expect(200);
  });
  it("Should return 200 when call route status/orderId", async () => {
    await request(app)
      .get("/status/123abc")
      .set("Content-Type", "application/json")
      .expect(200);
  });
});
