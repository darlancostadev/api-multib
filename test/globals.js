const {
  conectDb,
  closeDb,
  dropCollection,
} = require("../database/db");

before("Override database url and add default token", async () => {
  await conectDb("urlTest");
});

after("Remove tests database", async () => {
  await dropCollection("status");
  await closeDb();
});
