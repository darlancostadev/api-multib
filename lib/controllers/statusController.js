const {
  getAllOrder,
  getStatusByOrderId,
  createStatus,
} = require("../service/statusService");

const statusController = async (req, res) => {
  try {
    const { data, error } = await getAllOrder();
    if (error) {
      res.status(400).json({ message: error.message });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getStatusController = async (req, res) => {
const { orderId } = req.params;
  try {
    const { data, error } = await getStatusByOrderId(orderId);
    if (error) {
      res.status(400).json({ message: error.message });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const createStatusController = async (req, res) => {
  try {
    const { data, error } = await createStatus(req.body);
    res.status(201).json(data);

    if(error){
      res.status(400).json(error);
    }

  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  statusController,
  getStatusController,
  createStatusController,
};
