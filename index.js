const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const dbConnectFunc = require("./db/dbIntegration");

const AuthRoute = require("./routes/AuthRoute");
const PrivateRoute = require("./routes/PrivateRoute");
const AuthCheck = require("./middlewares/AuthCheck");

app.use("/", (req, res) => {
  res.send({ msg: "appServer is available" });
});
app.use("/api/auth", AuthRoute);
app.use("/api/private", AuthCheck, PrivateRoute);

dbConnectFunc()
  .then(() =>
    app.listen(process.env.PORT || 4080, () => {
      console.log("AppServer Started");
    })
  )
  .catch((e) => console.log(e.message, " ERR-index.js"));
