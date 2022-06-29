const {
  statusController,
  getStatusController,
  createStatusController,
} = require("../controllers/statusController");

const statusRoute = (router) => {
  router.get("/status", statusController);
  router.get("/status/:orderId", getStatusController);
  router.post("/status", createStatusController);
};

module.exports = { statusRoute };
