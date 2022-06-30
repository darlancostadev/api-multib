const Status = require("../models/status");

const getAllOrder = async () => {
  const status = await await Status.find(
    {},
    { name: 1, orderId: 1, value: 1, _id: 0, createdAt: 1 }
  ).sort({ createdAt: -1 });

  if (!status) {
    return { error: status.error };
  }
  return { data: status };
};

const getStatusByOrderId = async (getOrderId) => {
  const status = await Status.find(
    { orderId: getOrderId },
    { name: 1, orderId: 1, value: 1, _id: 0, createdAt: 1 }
  ).sort({ createdAt: -1 });

  const allStatus = status.map((item) => {
    return { name: item.name, createdAt: item.createdAt };
  });

  const { orderId, value, createdAt, _id } = status[0];

  const newStatus = {
    orderId,
    value,
    createdAt,
    status: allStatus,
  };

  if (!status) {
    return { error: status.error };
  }
  return { data: newStatus };
};

const createStatus = async (body) => {
  const { name, orderId, value } = body;
  const status = await new Status({
    name,
    orderId,
    value,
  }).save();

  if (!status) {
    return { error: status.error };
  }
  return { data: status };
};
module.exports = { getAllOrder, getStatusByOrderId, createStatus };
