//crud users and change role too
const router = require("express").Router();

const GetAllUserController = require("../controllers/user/GetAllUserController");
const GetOneUserController = require("../controllers/user/GetOneUserController");
const CreateUserController = require("../controllers/user/CreateUserController");
const UpdateUserController = require("../controllers/user/UpdateUserController");
const DeleteUserController = require("../controllers/user/DeleteUserController");

//getAlluserData
router.get("/", GetAllUserController);

//getOneUserData
router.get("/:id", GetOneUserController);

//add new user
router.post("/", CreateUserController);

//updateUserData
router.put("/:id", UpdateUserController);

//delete userData
router.delete("/:email", DeleteUserController);

module.exports = router;
