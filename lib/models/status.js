const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  orderId: { type: String, required: true },
  value: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("Status", statusSchema);
