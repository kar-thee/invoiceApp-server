const mongoose = require("mongoose");

const dbConnectFunc = async () => {
  try {
    await mongoose.connect(process.env.DBURI);
  } catch (e) {
    console.log(e.message, " ERR-dbintegration");
  }
};

module.exports = dbConnectFunc;
