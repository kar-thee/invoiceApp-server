const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const dbConnectFunc = require("./db/dbIntegration");

const AuthRoute = require("./routes/AuthRoute");

app.use("/e", (req, res) => {
  res.send({ msg: "appServer is available" });
});

app.use("/api/auth", AuthRoute);

app.use("/api/private", (req, res) => {
  res.send({ msg: "private" });
});

dbConnectFunc()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("AppServer Started");
    });
  })
  .catch((e) => console.log(e.message, " ERR-index.js"));
