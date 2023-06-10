const express = require("express");
const bodyParser = require("body-parser");
const ApiRoutes = require("./routes/index.js");

const SetupAndStartServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", ApiRoutes);

  app.listen(3000, async () => {
    console.log("Started server on port 3000");
  });
};

SetupAndStartServer();
