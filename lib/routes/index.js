const {
  statusController,
  getStatusController,
  createStatusController,
} = require("../controllers/statusController");

const { statusSchemaValidator } = require("../../lib/validator");

const statusRoute = (router) => {
  router.get("/status", statusController);
  router.get("/status/:orderId", getStatusController);
  router.post(
    "/status",
    statusSchemaValidator,
    createStatusController
  );
};

module.exports = { statusRoute };
