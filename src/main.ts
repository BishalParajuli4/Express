
import express, {Request, Response, NextFunction} from "express";
import router from "../src/routes/productRoute";
import o_router from "../src/routes/orderRoute"
import userRouter from "./routes/userRoute";


const app = express();

const PORT = 3000;


app.use(express.json());
app.use("/orders",o_router);
app.use("/products", router);
app.use("/users",userRouter)



// const lock : string = "shyam";

// app.get('/',
//     (req : Request, res: Response, next: NextFunction)=>{
//         // res.send ("Hello From Middleware");
// const Lock = req.query.name;

//         if (lock === "ram"){
//             next();

//         }
//         else{
//            next({
//             message : "you are not ram",
//             status: 483,
//            })
//         }
//        // return;

//     },
//     (req: Request, res: Response)=>{
//     res.send("Hello World");
// });


app.listen(PORT,()=>{
    console.log(`Server is running : ${PORT}`);
});



app.use((error:any, req:Request, res:Response, next:NextFunction )=>{
    console.log ("error received",error);
    if(error.status === 404 || error.status === 403 || error.status === 400){
        res.status(error.status).json(error);
    }
    res.status(500).json({
        message : "Internal server error",
    });
    
});

export default app;