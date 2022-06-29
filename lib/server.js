require("dotenv").config();
const express = require("express");
const pkg = require("../package.json");
const { statusRoute } = require("./routes");

const server = (() => {
  const port = 4000;
  const router = new express.Router();
  const app = express();

  const env = process.env.NODE_ENV;
  let serverProcess;

  const start = () =>
    new Promise((resolve) => {
      statusRoute(router);

      app.set("port", port);
      app.use(express.json());
      app.use("/", router);

      serverProcess = app.listen(port, () => {
        console.log(
          "------------------------------------------------------------------"
        );
        console.log(`${pkg.name} - Version: ${pkg.version}`);
        console.log(
          "------------------------------------------------------------------"
        );
        console.log(`ATTENTION, ${env} ENVIRONMENT!`);
        console.log(
          "------------------------------------------------------------------"
        );
        console.log(
          `Express server listening on port: ${serverProcess.address().port}`
        );
        console.log(
          "------------------------------------------------------------------"
        );

        return resolve(app);
      });
    });

  const stop = () =>
    new Promise((resolve, reject) => {
      if (serverProcess) {
        serverProcess.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve();
        });
      }
    });

  return {
    start,
    stop,
  };
})();

module.exports = server;
