const mongoose = require("mongoose");
const urlConections = {
  urlProd:"mongodb+srv://darlan:Z8F2LnVrxVUXE7xP@cluster0.2ksju.mongodb.net/production?retryWrites=true&w=majority",
  urlTest:"mongodb+srv://darlan:Z8F2LnVrxVUXE7xP@cluster0.2ksju.mongodb.net/test?retryWrites=true&w=majority"
};

const conectDb = async (url) => {
  await mongoose.connect(urlConections[url]);
  console.log("Connected DB successfully to server");
  return;
};

const closeDb = async () => {
  await mongoose.connection.close();
  console.log("disconnect DB successfully to server");
  return;
};
const dropCollection = async (collection) => {
  mongoose.connection.db.dropCollection(collection);
  return;
};

module.exports = { conectDb, closeDb, dropCollection };
