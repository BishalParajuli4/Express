import express, { Response, Request, NextFunction } from "express";
import { createProductController, deleteProductController, getAllProductController, getProductbyIdController, updateProduct } from "../controllers/productController";
import { middleWareAdmin, middleWareUser } from "../middleware/middleware";
const router = express.Router();

router.post("/", createProductController);
router.put("/:id",updateProduct);
router.get("/:id", getProductbyIdController);
router.get("/",getAllProductController);
//router.get("/",middleWareUser,getAllProductController);

router.delete("/:id", deleteProductController);


export default router;
