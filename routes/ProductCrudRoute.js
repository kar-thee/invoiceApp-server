const router = require("express").Router();

//crud product
const GetProductController = require("../controllers/product/GetProductController");
const UpdateProductController = require("../controllers/product/UpdateProductController");
const CreateProductController = require("../controllers/product/CreateProductController");
const DeleteProductController = require("../controllers/product/DeleteProductController");

//getAll products
router.get("/", GetProductController);

//createProduct
router.post("/", CreateProductController);

//updateProduct info
router.put("/", UpdateProductController);

//DeleteProduct
router.delete("/", DeleteProductController);

module.exports = router;
