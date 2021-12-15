const jwt = require("jsonwebtoken");

const signToken = (data) => {
  return jwt.sign(data, process.env.TOKENSECRET);
};

const verifyToken = (string) => {
  try {
    const response = jwt.verify(string, process.env.TOKENSECRET);
    return response;
  } catch (e) {
    return e.message;
  }
};

module.exports = { signToken, verifyToken };
