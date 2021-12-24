const { verifyToken } = require("../util/tokenFunc");

const AuthCheck = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  try {
    if (!tokenHeader) {
      return res.status(404).send({
        msg: "No tokenHeader available, route only for authorised user",
        type: "error",
      });
    }
    const token = tokenHeader.split(" ")[1];
    if (!token) {
      return res
        .status(404)
        .send({ msg: "token tampered, please sign in", type: "error" });
    }
    const payLoad = verifyToken(token);
    if (!payLoad || typeof payLoad === "string") {
      return res
        .status(401)
        .send({ msg: "Request denied, please sign in", type: "error" });
    }
    //used for private routes,saving data in request
    req.userObj = {
      email: payLoad.email,
      id: payLoad.id,
      name: payLoad.name,
      role: payLoad.role,
    };
    next();
  } catch (e) {
    console.log(e.message, " err-authCheckFunc");
    return res.status(500).send({ msg: e.message, type: "error" });
  }
};

module.exports = AuthCheck;
