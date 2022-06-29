const {
  getAllOrder,
  getStatusByOrderId,
  createStatus,
} = require("../service/statusService");
const statusController = async (req, res) => {
  try {
    const { data, error } = await getAllOrder();
    if (error) {
      res.status(400).json({ message: status.message });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
const getStatusController = async (req, res) => {
  try {
    const { data, error } = await getStatusByOrderId(req);
    if (error) {
      res.status(400).json({ message: status.message });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const createStatusController = async (req, res) => {
  try {
    const newStatus = await createStatus(req);
    res.status(201).json(newStatus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  statusController,
  getStatusController,
  createStatusController,
};
