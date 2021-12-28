const router = require("express").Router();

//crud product
const GetProductsController = require("../controllers/product/GetProductsController");
const GetOneProductController = require("../controllers/product/GetOneProductController");
const UpdateProductController = require("../controllers/product/UpdateProductController");
const CreateProductController = require("../controllers/product/CreateProductController");
const DeleteProductController = require("../controllers/product/DeleteProductController");

//getAll products
router.get("/", GetProductsController);

//getOne products
router.get("/:id", GetOneProductController);

//createProduct
router.post("/", CreateProductController);

//updateProduct info
router.put("/:id", UpdateProductController);

//DeleteProduct
router.delete("/:id", DeleteProductController);

module.exports = router;
