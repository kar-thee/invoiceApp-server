const mongoose = require("mongoose");

const dbConnectFunc = async () => {
  try {
    await mongoose.connect(process.env.DBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (e) {
    console.log(e.message, " ERR-dbintegration");
  }
};

module.exports = dbConnectFunc;
