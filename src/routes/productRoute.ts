import express, { Response, Request, NextFunction } from "express";
import { createProductController, deleteProductController, getAllProductController, getProductbyIdController, putProductController } from "../controllers/productController";
import { middleWareAdmin, middleWareUser } from "../middleware/middleware";
const router = express.Router();

router.post("/",middleWareAdmin, createProductController);
router.put("/:id",putProductController);
router.get("/:id", getProductbyIdController);
router.get("/",middleWareUser,getAllProductController);
router.delete("/:id", deleteProductController);


export default router;
