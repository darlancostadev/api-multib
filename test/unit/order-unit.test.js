const Status = require("../../lib/models/status");
const { assert } = require("chai");
const { dropCollection } = require("../../database/db");
const {
  getAllOrder,
  getStatusByOrderId,
  createStatus,
} = require("../../lib/service/statusService");

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

describe("orders unit tests", () => {
  beforeEach(async () => {
    await new Status(ordemMock).save();
  });

  afterEach(async () => {
    await dropCollection("status");
  });

  it("Shold return all orders - getAllOrder", async () => {
    const { data } = await getAllOrder();
    ordemMock.createdAt = data[0]._doc.createdAt;
    assert.deepEqual(data[0]._doc, ordemMock);
  });

  it("Shold return only orders by id - getStatusByOrderId", async () => {
    const { data } = await getStatusByOrderId(ordemMock.orderId);

    getOrderbyId.createdAt = data.createdAt;
    getOrderbyId.status[0].createdAt = data.createdAt;

    assert.deepEqual(data, getOrderbyId);
  });

  it("Shold create to order - createStatus", async () => {
    const { data } = await createStatus(ordemMock);
    assert.deepEqual(data.name, ordemMock.name);
  });
});
