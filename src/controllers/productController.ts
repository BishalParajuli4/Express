import {Request, Response} from "express";
import express from "express";
import products, { createProduct, deleteProductById, getAllProduct, getProductById, updateProductById } from "../models/product";

const router = express.Router();

export function createProductController ( req: Request, res: Response){
    const{name, price, description} = req.body

    if(!name || !price || !description){
        res.status(400).json({error: "Please provide appropriate data's"});
    };

    // if(!price){
    //     res.status(400).json({error: "Please Enter the appropriate price"})
    // }
const newProduct = createProduct ({
    name: name,
    price: price,
    description: description,
})
    res.status(200).json(newProduct);
    
};

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

export function getAllProductController(req:Request , res:Response){
    const product = getAllProduct();
    res.json(products);
};

export function putProductController (req: Request , res:Response){
    const productId = parseInt(req.params.id);

    // const product = products.find((p)=> p.id === productId );
    // if(!product){
    //     res.status(404).json({error : "No Product found"});
    // }
    const {name, price , description} = req.body;
    if(!name || !price || !description){
        res.status(400).json({error: "Please provide appropriate data's"});
    };
    const updatedProduct = updateProductById({
        id: productId,
        name: name,
        price: price,
        description: description,
    });
    if(!updateProductById){
        res.status(500).json({error : "Internal server error "});
    }
    res.status(200).json(updatedProduct);


};

export function getProductbyIdController (req: Request , res : Response){
    const productId = parseInt (req.params.id);
   const product = getProductById(productId);
    if(!product) {
        res.status(404).json({error : "No Product Found"});
    }
    res.status(200).json(product);
};

export function deleteProductController (req : Request , res : Response)
{
    const productId = parseInt(req.params.id);
    const deletedProduct = deleteProductById(productId);            //object na bhayeko bhayera direct dina milyo natra :/id dina partheo
    res.status(200).json("deletedProducts");

    if(!deletedProduct){
        res.status(404).json({error :" There is no data to delete"});
    }
};
