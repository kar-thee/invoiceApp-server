const RoleCheck = (req, res, next) => {
  const { role } = req.userObj;
  try {
    if (!role) {
      return res
        .status(404)
        .send({ msg: "No userRole Available", type: "error" });
    }
    return role;
  } catch (e) {
    console.log(e.message, " err-inRoleCheckMiddleware");
    res.status(500).send({ msg: e.message, type: "error" });
  }
};

module.exports = RoleCheck;
