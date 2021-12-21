//crud users and change role too
const router = require("express").Router();

const GetAllUserController = require("../controllers/user/GetAllUserController");
const CreateUserController = require("../controllers/user/CreateUserController");
const UpdateUserController = require("../controllers/user/UpdateUserController");
const DeleteUserController = require("../controllers/user/DeleteUserController");

//getAlluserData
router.get("/", GetAllUserController);

//add new user
router.post("/", CreateUserController);

//updateUserData
router.put("/", UpdateUserController);

//delete userData
router.delete("/", DeleteUserController);

module.exports = router;
