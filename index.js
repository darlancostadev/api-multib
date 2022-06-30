const server = require("./lib/server");

const { conectDb, closeDb } = require("./database/db");

const shutdown = async () => {
  console.log("Gracefully shutdown in progress");
  await closeDb();
  await server.stop();
  process.exit(0);
};

process
  .on("SIGTERM", shutdown)
  .on("SIGINT", shutdown)
  .on("SIGHUP", shutdown)
  .on("uncaughtException", (err) => {
    console.log("uncaughtException caught the error: ", err);
    throw err;
  })
  .on("unhandledRejection", (err, promise) => {
    console.log(`Unhandled Rejection at: Promise ${promise} reason: ${err}`);
    throw err;
  })
  .on("exit", (code) => {
    console.log(`Node process exit with code: ${code}`);
  });

(async () => {
  try {
    await server.start();
    await conectDb("urlProd");
  } catch (err) {
    console.log("[APP] initialization failed", err);
    throw err;
  }
  console.log("[APP] initialized SUCCESSFULLY");
})();
