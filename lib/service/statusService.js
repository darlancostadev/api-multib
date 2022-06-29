const Status = require("../models/status");

const getAllOrder = async () => {
  const status = await Status.find({});
  if (!status) {
    return { error: status.error };
  }
  return { data: status };
};
const getStatusByOrderId = async (req, res) => {
  const status = await Status.find({ orderId: req.params.orderId });

  const allStatus = status.map((item) => {
    return { name: item.name, createdAt: item.createdAt };
  });

  const { orderId, value, createdAt, _id } = status[0];

  const newStatus = {
    _id,
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

const createStatus = async (req, res) => {
  const status = new Status({
    name: req.body.name,
    orderId: req.body.orderId,
    value: req.body.value,
  });
  const newStatus = await status.save();
  if (!newStatus) {
    return { error: status.error };
  }
  return newStatus;
};
module.exports = { getAllOrder, getStatusByOrderId, createStatus };
