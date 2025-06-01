import { Request,Response } from "express";
import { sqlUserModal } from "../sql_models/user-sql-models";


export const getUserController=async(req:Request,res:Response)=>{
    res.status(200).json(await sqlUserModal.getAllUser())
}

export const getUserByIdController=async(req:Request,res:Response)=>{
    const id=Number(req.params.id)
    const fromid=await sqlUserModal.getUserBYId(id)
    res.status(200).json(fromid)
}

export const createUsersController=async(req:Request,res:Response)=>{
    const{name,email}=req.body;
    const data=await sqlUserModal.createUser({name,email})
    res.status(200).json(data)
}

export const updateUserController=async(req:Request,res:Response)=>{
    const id=Number(req.params.id);
    const {name,email}=req.body
    
    const data=await sqlUserModal.UpdateUser(id,{name,email})
    res.status(200).json(data)

}
export const deleteUserController=async(req:Request,res:Response)=>{
const id=Number(req.params.id)
console.log(id)
await sqlUserModal.deleteUser(id)
res.status(200).json({message:"Deletd Successfuly"})

}