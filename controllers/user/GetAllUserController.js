const User = require("../../model/userModel");

const GetAllUserController = async (req, res) => {
  try {
    const userArray = await User.find();
    const updatedArray = userArray.map((user) => {
      return {
        name: user.name,
        email: user.email,
        role: user.role,
        idVerified: user.idVerified,
        id: user._id,
      };
    });
    res.send({
      updatedArray,
      type: "success",
      msg: "All userData Fetched successfully",
    });
  } catch (e) {
    console.log(e.message, " err-in GetAllUserController");
    res.status(500).send({ msg: "e.message", type: "failed" });
  }
};

module.exports = GetAllUserController;
