import { Request, Response } from "express";
import express from "express";

import { SqlProductModel } from "../sql_models/product-sql-models";
import { NextFunction } from "express-serve-static-core";


const router = express.Router();

// export function createProductController(req: Request, res: Response) {
//   const { name, price, description } = req.body;

//   if (!name || !price || !description) {
//     res.status(400).json({ error: "Please provide appropriate data's" });
//   }

//   // if(!price){
//   //     res.status(400).json({error: "Please Enter the appropriate price"})
//   // }
//   const newProduct = createProduct({
//     name: name,
//     price: price,
//     description: description,
//   });
//   res.status(200).json(newProduct);
// }

// router.post("/products",( req: Request, res: Response)=>{
//     const{name, price, description} = req.body

//     if(!name || !price || !description){
//         res.status(400).json({error: "Please provide appropriate data's"});
//     };

//     // if(!price){
//     //     res.status(400).json({error: "Please Enter the appropriate price"})
//     // }

//     const newProduct = {
//         id: products.length + 1,
//         name: name,
//         price: price,
//         description: description,
//     };
//     products.push(newProduct);
//     res.status(200).json(newProduct);

// });


export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
//  const {name, price, description}= req.body;
  try {
    const product = await SqlProductModel.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const getAllProductController = async (req: Request, res: Response) => {
  const products = await SqlProductModel.getAll();
  res.json(products);
};

// export const putProductController= async(req: Request, res: Response) => {
//   const productId = parseInt(req.params.id);

//   // const product = products.find((p)=> p.id === productId );
//   // if(!product){
//   //     res.status(404).json({error : "No Product found"});
//   // }
//   const { name, price, description } = req.body;
//   if (!name || !price || !description) {
//     res.status(400).json({ error: "Please provide appropriate data's" });
//   }
//   const updatedProduct = await SqlProductModel.update({
//     id: productId,
//     name: name,
//     price: price,
//     description: description,
//   });
//   if (!updateProductById) {
//     res.status(500).json({ error: "Internal server error " });
//   }
//   res.status(200).json(updatedProduct);
// }

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  const product = SqlProductModel.getById(id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  try {
    const updated =await SqlProductModel.update(id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const getProductbyIdController = async(req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const products = await SqlProductModel.getById(productId);
  if (!products) {
    res.status(404).json({ error: "No Product Found" });
  }
  res.status(200).json(products);
}

export const deleteProductController= async(req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const deletedProduct = await SqlProductModel.delete(productId); //object na bhayeko bhayera direct dina milyo natra :/id dina partheo
  res.status(200).json(deletedProduct);

  if (!deletedProduct) {
    res.status(404).json({ error: " There is no data to delete" });
  }
}
