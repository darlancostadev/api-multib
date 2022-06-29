const mongoose = require("mongoose");

const url =
  "mongodb+srv://darlan:Z8F2LnVrxVUXE7xP@cluster0.2ksju.mongodb.net/production?retryWrites=true&w=majority";

const urlTest =
  "mongodb+srv://darlan:Z8F2LnVrxVUXE7xP@cluster0.2ksju.mongodb.net/test?retryWrites=true&w=majority";

const conectDb = async () => {
  await mongoose.connect(url);
  console.log("Connected successfully to server");
  return;
};
const conectDbTest = async () => {
  await mongoose.connect(urlTest);
  console.log("Connected successfully to server test");
  return;
};

const closeDb = async () => {
  await mongoose.connection.close();
  console.log("disconnect successfully to server");
  return;
};
const dropCollection = async (collection) => {
  mongoose.connection.db.dropCollection(collection);
  console.log("disconnect successfully to server");
  return;
};

module.exports = { conectDb, conectDbTest, closeDb, dropCollection };
