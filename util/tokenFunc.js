const jwt = require("jsonwebtoken");

const signToken = (data) => {
  return jwt.sign(data, process.env.TOKENSECRET);
};

const verifyToken = (string) => {
  return jwt.verify(string, process.env.TOKENSECRET);
};

module.exports = { signToken, verifyToken };
